// Grade predictor and target-grade gap analysis.
//
// The prediction answers "if you sat this exam today, what would you probably get?". It combines:
//   - topic mastery for every topic on the course (the chance of getting a typical exam question right; topics not
//     started yet count as a low guess, because in the exam they would still have to be answered)
//   - marked mock papers for the subject (the best evidence, weighted most when there are some)
// The percentage is turned into a grade using approximate grade boundaries from recent years for that kind of
// paper, and shown as a range that narrows as more evidence comes in. It is an estimate, and says so.
import type { Subject, Topic } from '../content/types';
import { activeSubjects, visibleTopics } from '../content/registry';
import { level, mastery } from './engine';
import type { Profile, Progress } from './store';

export interface Scale { labels: string[]; /** minimum percentage for each label, lowest first */ mins: number[]; vocational?: boolean }

// Approximate boundaries (percentage of the total marks) from recent series. Real boundaries change every year.
const UNTIERED: Scale = { labels: ['U', '1', '2', '3', '4', '5', '6', '7', '8', '9'], mins: [0, 8, 17, 27, 38, 47, 56, 65, 73, 81] };
const HIGHER_MATHS: Scale = { labels: ['U', '3', '4', '5', '6', '7', '8', '9'], mins: [0, 11, 18, 29, 40, 51, 63, 75] };
const FOUND_MATHS: Scale = { labels: ['U', '1', '2', '3', '4', '5'], mins: [0, 11, 25, 40, 55, 70] };
const HIGHER_SCI: Scale = { labels: ['U', '3', '4', '5', '6', '7', '8', '9'], mins: [0, 15, 23, 33, 44, 55, 65, 76] };
const FOUND_SCI: Scale = { labels: ['U', '1', '2', '3', '4', '5'], mins: [0, 10, 22, 35, 49, 62] };
const VOCATIONAL: Scale = { labels: ['U', 'L1 Pass', 'L1 Merit', 'L1 Distinction', 'L2 Pass', 'L2 Merit', 'L2 Distinction', 'L2 Distinction*'], mins: [0, 20, 28, 36, 45, 58, 70, 82], vocational: true };

const SCIENCE = ['biology', 'chemistry', 'physics'];

export function scaleFor(subjectId: string, profile: Profile): Scale {
  const tier = profile.tiers[subjectId];
  if (subjectId === 'imedia' || (subjectId === 'business' && profile.options['business-course'] === 'btec')) return VOCATIONAL;
  if (subjectId === 'maths' || subjectId === 'statistics') return tier === 'F' ? FOUND_MATHS : HIGHER_MATHS;
  if (SCIENCE.includes(subjectId)) return tier === 'F' ? FOUND_SCI : HIGHER_SCI;
  return UNTIERED;
}

const gradeIndex = (scale: Scale, pct: number) => { let i = 0; for (let k = 0; k < scale.mins.length; k++) if (pct >= scale.mins[k]) i = k; return i; };
export const gradeAt = (scale: Scale, pct: number) => scale.labels[gradeIndex(scale, pct)];
/** short label for tight spaces: "L2 Distinction*" → "L2D*" */
export const shortGrade = (g: string) => g.replace(/^(L\d) (Pass|Merit|Distinction)(\*?)$/, (_, l: string, w: string, s: string) => `${l}${w[0]}${s}`);

/** a topic not started still earns a few marks in the exam (multiple choice, general knowledge) */
const UNSTARTED = 0.12;

export interface Prediction {
  subject: Subject;
  scale: Scale;
  pct: number;
  grade: string;
  low: string;
  high: string;
  /** 0..1, how much evidence the prediction rests on */
  confidence: number;
  answers: number;
  coverage: number;
  mocks: number;
  target?: string;
  /** percentage points needed to reach the target (0 when on or above it) */
  gap?: number;
  /** enough evidence to show a grade at all (about 20 answers, or a marked mock) */
  ready: boolean;
}

export function predictSubject(subject: Subject, profile: Profile, progress: Progress, now = Date.now()): Prediction {
  const scale = scaleFor(subject.id, profile);
  const topics = visibleTopics(subject, profile);
  let sum = 0, answers = 0, started = 0;
  for (const t of topics) {
    const ts = progress.topics[t.id];
    if (ts && ts.n > 0) { started++; answers += ts.n; sum += Math.max(UNSTARTED, mastery(ts, now)); } else sum += UNSTARTED;
  }
  const topicPct = topics.length ? (sum / topics.length) * 100 : 0;
  // marked mock papers for this subject (the tier taken matters for maths, statistics and the sciences)
  const tier = profile.tiers[subject.id];
  const mockPcts = Object.entries(progress.mocks ?? {})
    .filter(([id]) => id.startsWith(`${subject.id}-`) && (!tier || !/-(f|h)-t\d+$/.test(id) || id.includes(`-${tier.toLowerCase()}-t`)))
    .flatMap(([, list]) => list.filter((a) => a.status === 'marked' && a.max > 0 && a.score !== undefined))
    .sort((a, b) => (b.finished ?? 0) - (a.finished ?? 0))
    .slice(0, 3)
    .map((a) => (a.score! / a.max) * 100);
  const mockPct = mockPcts.length ? mockPcts.reduce((a, b) => a + b, 0) / mockPcts.length : undefined;
  const pct = mockPct === undefined ? topicPct : mockPct * Math.min(0.65, 0.35 + mockPcts.length * 0.1) + topicPct * (1 - Math.min(0.65, 0.35 + mockPcts.length * 0.1));
  const coverage = topics.length ? started / topics.length : 0;
  const confidence = Math.min(1, Math.min(1, answers / 250) * 0.55 + coverage * 0.25 + Math.min(1, mockPcts.length / 2) * 0.2);
  const half = 3 + 9 * (1 - confidence);
  const target = profile.targets?.[subject.id];
  const ti = target ? scale.labels.indexOf(target) : -1;
  const gap = ti > 0 ? Math.max(0, scale.mins[ti] - pct) : undefined;
  return {
    subject, scale, pct, grade: gradeAt(scale, pct), low: gradeAt(scale, Math.max(0, pct - half)), high: gradeAt(scale, Math.min(100, pct + half)),
    confidence, answers, coverage, mocks: mockPcts.length, target: ti > 0 ? target : undefined, gap, ready: answers >= 20 || mockPcts.length > 0,
  };
}

export function predictAll(profile: Profile, progress: Progress): Prediction[] {
  return activeSubjects(profile).map((s) => predictSubject(s, profile, progress));
}

export const rangeText = (p: Prediction) => (!p.ready ? '–' : p.low === p.high ? shortGrade(p.grade) : `${shortGrade(p.low)}–${shortGrade(p.high)}`);

export interface GapTopic { topic: Topic; mastery: number; /** percentage points of the whole subject this topic could add */ gain: number; why: string }

/**
 * Where the marks are: the topics that would add the most to the subject's percentage, favouring quick wins (topics
 * already started but not secure are faster to raise than brand-new ones). Used for the gap analysis and to steer
 * sessions towards the target grade.
 */
export function gapTopics(subject: Subject, profile: Profile, progress: Progress, n = 5, now = Date.now()): GapTopic[] {
  const topics = visibleTopics(subject, profile);
  const share = 100 / Math.max(1, topics.length);
  const scale = scaleFor(subject.id, profile);
  const target = profile.targets?.[subject.id];
  // aim each topic at the mastery the target grade needs (with some headroom), or at 75% with no target
  const ti = target ? scale.labels.indexOf(target) : -1;
  const aim = Math.min(0.95, Math.max(0.55, (ti > 0 ? scale.mins[ti] / 100 : 0.6) + 0.15));
  return topics
    .map((topic) => {
      const ts = progress.topics[topic.id];
      const m = ts && ts.n > 0 ? mastery(ts, now) : UNSTARTED;
      const lv = level(ts, now);
      const gain = Math.max(0, aim - m) * share;
      // quick wins first: started-but-shaky topics need less time per mark than new ones
      const speed = lv === 'weak' ? 1.3 : lv === 'developing' ? 1.5 : lv === 'new' ? 0.9 : 1;
      const why = lv === 'new' ? 'Not started. Learning it opens up new marks' : lv === 'weak' ? 'Started but weak. The quickest marks to win back' : lv === 'developing' ? 'Nearly there. A little practice secures it' : 'Keep it fresh';
      return { topic, mastery: m, gain, why, score: gain * speed };
    })
    .filter((g) => g.gain > 0.05)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(({ topic, mastery: m, gain, why }) => ({ topic, mastery: m, gain, why }));
}

/** Subject ids furthest below their target (biggest gap first) */
export function behindTarget(profile: Profile, progress: Progress): { id: string; gap: number }[] {
  return predictAll(profile, progress).filter((p) => (p.gap ?? 0) > 0).map((p) => ({ id: p.subject.id, gap: p.gap! })).sort((a, b) => b.gap - a.gap);
}
