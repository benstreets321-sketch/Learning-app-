// The adaptive learning engine.
//  - Spaced repetition (SM-2 style) decides WHEN each question/flashcard comes back.
//  - A per-topic ability estimate (Elo / 1-parameter IRT style) decides HOW HARD the next question should be.
//  - Confidence ratings + hints feed in, so lucky guesses and confident mistakes are treated differently.
import { DAY, clamp } from './util';

export type Grade = 0 | 1 | 2 | 3; // again, hard, good, easy
export type Confidence = 'sure' | 'unsure' | 'guess';

export interface SrsState {
  ease: number;
  ivl: number; // days
  due: number; // epoch ms
  reps: number;
  lapses: number;
  last: number;
  seen: number;
  right: number;
  lastWrong?: boolean;
}

export const newSrs = (): SrsState => ({ ease: 2.5, ivl: 0, due: 0, reps: 0, lapses: 0, last: 0, seen: 0, right: 0 });

const MIN = 60_000;

/** SM-2 variant. Returns a NEW state. */
export function schedule(prev: SrsState | undefined, grade: Grade, now = Date.now()): SrsState {
  const s: SrsState = { ...(prev ?? newSrs()) };
  s.seen += 1;
  s.last = now;
  if (grade === 0) {
    s.lapses += 1;
    s.reps = 0;
    s.ease = Math.max(1.3, s.ease - 0.2);
    s.ivl = 0;
    s.due = now + 10 * MIN; // relearn soon
    s.lastWrong = true;
    return s;
  }
  s.right += 1;
  s.lastWrong = false;
  if (grade === 1) {
    s.ease = Math.max(1.3, s.ease - 0.15);
    s.ivl = s.reps === 0 ? 1 : Math.max(1, Math.round(s.ivl * 1.2));
  } else if (grade === 2) {
    s.ivl = s.reps === 0 ? 1 : s.reps === 1 ? 3 : Math.round(s.ivl * s.ease);
  } else {
    s.ease = s.ease + 0.15;
    s.ivl = s.reps === 0 ? 3 : Math.round(Math.max(s.ivl, 1) * s.ease * 1.3);
  }
  s.ivl = Math.min(s.ivl, 120);
  s.reps += 1;
  // small fuzz so reviews don't all land on the same day
  const fuzz = s.ivl >= 3 ? Math.round((Math.random() - 0.5) * s.ivl * 0.1) : 0;
  s.due = now + (s.ivl + fuzz) * DAY;
  return s;
}

/** Turn a question outcome into an SRS grade */
export function gradeFromOutcome(correct: boolean, conf: Confidence | undefined, hintsUsed: number): Grade {
  if (!correct) return 0;
  if (hintsUsed > 0 || conf === 'guess') return 1;
  if (conf === 'unsure') return 1;
  return conf === 'sure' ? 3 : 2;
}

// ---------- Ability / mastery ----------

export interface TopicState {
  theta: number; // ability estimate
  n: number; // answers counted
  last: number; // last practice time
  notesRead?: number; // timestamp
  blurt?: number[]; // blurting self-check percentages
  exam?: { id: string; score: number; max: number; at: number }[];
  recent?: number[]; // last few outcomes 0..1 for trend
}

export const newTopicState = (): TopicState => ({ theta: -0.5, n: 0, last: 0 });

/** Map authored difficulty 1..5 to an IRT difficulty */
export const difficultyB = (d: number) => (clamp(d, 1, 5) - 3) * 0.8;

export const pCorrect = (theta: number, d: number) => 1 / (1 + Math.exp(-(theta - difficultyB(d))));

/**
 * Score in [0,1]: 1 = right unaided & confident, 0 = wrong.
 * Hints and guesses earn partial credit so the estimate is honest.
 */
export function outcomeScore(correct: boolean, conf: Confidence | undefined, hintsUsed: number): number {
  if (!correct) return 0;
  let s = 1;
  if (conf === 'guess') s = 0.6;
  else if (conf === 'unsure') s = 0.85;
  s -= Math.min(0.45, hintsUsed * 0.15);
  return clamp(s, 0.2, 1);
}

export function updateAbility(prev: TopicState | undefined, d: number, score: number, now = Date.now()): TopicState {
  const t: TopicState = { ...(prev ?? newTopicState()) };
  const p = pCorrect(effectiveTheta(t, now), d);
  const k = Math.max(0.25, 0.9 / Math.sqrt(1 + t.n / 4));
  t.theta = clamp(effectiveTheta(t, now) + k * (score - p), -3.5, 3.5);
  t.n += 1;
  t.last = now;
  t.recent = [...(t.recent ?? []), score].slice(-10);
  return t;
}

/** Gentle forgetting curve: ability drifts down if a topic is left untouched */
export function effectiveTheta(t: TopicState, now = Date.now()): number {
  if (!t.last) return t.theta;
  const days = Math.max(0, (now - t.last) / DAY);
  const decay = Math.min(0.8, 0.06 * Math.sqrt(days));
  return t.theta - decay;
}

/** Mastery 0..1 = chance of getting a typical (difficulty 3) exam question right now */
export function mastery(t: TopicState | undefined, now = Date.now()): number {
  if (!t || t.n === 0) return 0;
  // blend in self-marked exam and blurting performance
  let m = pCorrect(effectiveTheta(t, now), 3);
  const extra: number[] = [];
  if (t.blurt?.length) extra.push(t.blurt[t.blurt.length - 1] / 100);
  if (t.exam?.length) {
    const last = t.exam.slice(-3);
    extra.push(last.reduce((a, e) => a + e.score / e.max, 0) / last.length);
  }
  if (extra.length) m = m * 0.75 + (extra.reduce((a, b) => a + b, 0) / extra.length) * 0.25;
  // confidence in estimate grows with evidence
  const evidence = Math.min(1, t.n / 6);
  return m * evidence + 0.15 * (1 - evidence) * (t.n > 0 ? 1 : 0);
}

export type Level = 'new' | 'weak' | 'developing' | 'secure' | 'mastered';

export function level(t: TopicState | undefined, now = Date.now()): Level {
  if (!t || t.n === 0) return 'new';
  const m = mastery(t, now);
  if (m < 0.4) return 'weak';
  if (m < 0.6) return 'developing';
  if (m < 0.8) return 'secure';
  return 'mastered';
}

export const LEVEL_LABEL: Record<Level, string> = {
  new: 'Not started',
  weak: 'Needs work',
  developing: 'Developing',
  secure: 'Secure',
  mastered: 'Mastered',
};

// ---------- Adaptive selection ----------

export interface Candidate {
  id: string;
  topicId: string;
  d: number;
  generated?: boolean;
}

export interface SelectContext {
  now: number;
  srs: Record<string, SrsState | undefined>;
  topics: Record<string, TopicState | undefined>;
  /** ids already asked this session (avoid repeats) */
  askedThisSession: Set<string>;
  /** target probability of success: ~0.7 is the "desirable difficulty" sweet spot */
  target: number;
  rand: () => number;
}

export function scoreCandidate(c: Candidate, ctx: SelectContext): number {
  const t = ctx.topics[c.topicId];
  const theta = t ? effectiveTheta(t, ctx.now) : newTopicState().theta;
  const p = pCorrect(theta, c.d);
  let score = -Math.abs(p - ctx.target) * 4; // difficulty fit
  const s = ctx.srs[c.id];
  if (ctx.askedThisSession.has(c.id)) score -= 10;
  if (!s || s.seen === 0) score += 0.8; // fresh material
  else if (s.due <= ctx.now) score += s.lastWrong ? 3 : 2; // due review (mistakes first)
  else score -= 1.5; // not due yet
  // weaker topics get a nudge so practice flows to where it's needed
  if (t && t.n > 0) score += (1 - pCorrect(theta, 3)) * 1.2;
  score += ctx.rand() * 0.8; // variety
  return score;
}

export function pickNext<T extends Candidate>(pool: T[], ctx: SelectContext): T | undefined {
  let best: T | undefined;
  let bestScore = -Infinity;
  for (const c of pool) {
    const sc = scoreCandidate(c, ctx);
    if (sc > bestScore) {
      bestScore = sc;
      best = c;
    }
  }
  return best;
}

/** Choose a target success rate from the recent run of answers in this session */
export function adaptTarget(recent: boolean[]): { target: number; mode: 'support' | 'normal' | 'stretch' } {
  const last3 = recent.slice(-3);
  const last2 = recent.slice(-2);
  if (last2.length === 2 && last2.every((x) => !x)) return { target: 0.88, mode: 'support' };
  if (last3.length === 3 && last3.every((x) => x)) return { target: 0.58, mode: 'stretch' };
  return { target: 0.72, mode: 'normal' };
}
