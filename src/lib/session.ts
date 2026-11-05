// The timed "Start session" engine: decides what to practise, question by question.
//
// Each pick comes from one of five sources, interleaved:
//   fix      - questions on the Fix-it list (wrong before) - they keep coming back until cleared twice
//   review   - questions whose spaced-repetition review is due (often served as a *similar* question)
//   similar  - topics answered correctly before whose topic review is due: a different question on the same idea
//   weak     - the weakest topics the student has started
//   new      - specification points not started yet, so nothing in the exam is missed
// Inside a session a wrong answer comes back after 3 questions, and a similar question on the same topic after 7.
import type { QItem, Subject } from '../content/types';
import {
  activeSubjects, getQuestion, makeGenerated, questionPool, randomGenerated, topicQuestions, visibleTopics, getTopic, type GenSnapshot,
} from '../content/registry';
import { effectiveTheta, level, mastery, newTopicState, pCorrect, pickNext } from './engine';
import { getProfile, getProgress, type Profile, type Progress } from './store';
import { uncovered } from './coverage';

export type Source = 'fix' | 'review' | 'similar' | 'weak' | 'new' | 'retry' | 'follow' | 'mixed';
export const SOURCE_LABEL: Record<Source, string> = {
  fix: 'Fix-it', review: 'Review', similar: 'Similar question', weak: 'Weak spot', new: 'New topic',
  retry: 'Try again', follow: 'Similar question', mixed: 'Practice',
};
export const SOURCE_HELP: Record<Source, string> = {
  fix: 'You got this wrong before. Get it right twice, on different days, to clear it.',
  review: 'Due for review – just before you would forget it.',
  similar: 'You answered this topic correctly before. A different question checks it has stuck.',
  weak: 'One of your weakest topics.',
  new: 'A part of the specification you have not started yet.',
  retry: 'You missed this a few questions ago. Have another go.',
  follow: 'A similar question to one you missed earlier.',
  mixed: 'Mixed practice.',
};

export interface Pick { item: QItem; source: Source }

const ROTATION: Source[] = ['fix', 'review', 'similar', 'weak', 'fix', 'new', 'review', 'weak', 'similar', 'fix', 'review', 'new'];
const MIN = 60_000;

function asItem(id: string, snapshot?: string): QItem | undefined {
  if (snapshot) { try { return makeGenerated(JSON.parse(snapshot) as GenSnapshot); } catch { return undefined; } }
  return getQuestion(id);
}

export class SessionEngine {
  readonly subjects: Subject[];
  private profile: Profile;
  private topicIds: string[];
  private pool: QItem[];
  private asked = new Set<string>();
  private askedTopicsTurn: string[] = [];
  private queue: { at: number; item: QItem; source: Source }[] = [];
  private turn = 0;
  private rot = 0;

  constructor(subjectIds: string[] | null) {
    this.profile = getProfile();
    const all = activeSubjects(this.profile);
    this.subjects = subjectIds?.length ? all.filter((s) => subjectIds.includes(s.id)) : all;
    if (!this.subjects.length) this.subjects = all;
    this.topicIds = this.subjects.flatMap((s) => visibleTopics(s, this.profile).map((t) => t.id));
    this.pool = questionPool(this.topicIds, this.profile).filter((q) => !q.ctx || q.subjectId === 'english-language');
  }

  /** Inside the session: after an answer, schedule a retry and a similar follow-up for anything wrong */
  answered(item: QItem, correct: boolean) {
    this.turn += 1;
    if (correct) return;
    if (!this.queue.some((q) => q.item.id === item.id && q.source === 'retry')) this.queue.push({ at: this.turn + 3, item, source: 'retry' });
    const similar = this.similarTo(item);
    if (similar) this.queue.push({ at: this.turn + 7, item: similar, source: 'follow' });
  }

  next(): Pick | undefined {
    const progress = getProgress();
    const now = Date.now();
    const due = this.queue.findIndex((q) => q.at <= this.turn);
    if (due >= 0) {
      const [q] = this.queue.splice(due, 1);
      return this.take(q.item, q.source);
    }
    for (let i = 0; i < ROTATION.length; i++) {
      const source = ROTATION[(this.rot + i) % ROTATION.length];
      const item = this.fromSource(source, progress, now);
      if (item) { this.rot = (this.rot + i + 1) % ROTATION.length; return this.take(item, source); }
    }
    const item = this.best(this.pool.filter((q) => !this.asked.has(q.id)), progress, now) ?? this.generatedFor(this.topicIds[Math.floor(Math.random() * this.topicIds.length)]);
    return item ? this.take(item, 'mixed') : undefined;
  }

  private take(item: QItem, source: Source): Pick {
    this.asked.add(item.id);
    this.askedTopicsTurn = [...this.askedTopicsTurn.slice(-2), item.topicId];
    return { item, source };
  }

  private recentTopic(t: string) { return this.askedTopicsTurn[this.askedTopicsTurn.length - 1] === t; }

  private best(cands: QItem[], progress: Progress, now: number): QItem | undefined {
    const varied = cands.filter((c) => !this.recentTopic(c.topicId));
    return pickNext(varied.length ? varied : cands, { now, srs: progress.items, topics: progress.topics, askedThisSession: this.asked, target: 0.72, rand: Math.random });
  }

  private generatedFor(topicId: string | undefined, harder = 0): QItem | undefined {
    if (!topicId) return undefined;
    const ts = getProgress().topics[topicId] ?? newTopicState();
    const theta = effectiveTheta(ts);
    let lvl = 1, bestDiff = Infinity;
    for (let d = 1; d <= 5; d++) { const diff = Math.abs(pCorrect(theta, d) - 0.72); if (diff < bestDiff) { bestDiff = diff; lvl = d; } }
    return randomGenerated(topicId, Math.max(1, Math.min(5, lvl + harder)), this.profile);
  }

  /** A different question testing the same idea: same generator with new numbers, or a sibling in the topic */
  similarTo(item: QItem): QItem | undefined {
    if (item.generated) {
      const [, g] = item.id.split(':');
      const fresh = makeGenerated({ g, s: Math.floor(Math.random() * 2 ** 31), l: item.d, t: item.topicId });
      if (fresh) return fresh;
    }
    const sib = topicQuestions(item.topicId).filter((q) => q.id !== item.id && !this.asked.has(q.id) && Math.abs(q.d - item.d) <= 1 && this.pool.includes(q));
    const sameType = sib.filter((q) => q.type === item.type);
    const list = sameType.length ? sameType : sib;
    if (list.length) return list[Math.floor(Math.random() * list.length)];
    return getTopic(item.topicId)?.topic.generators?.length ? this.generatedFor(item.topicId) : undefined;
  }

  private fromSource(source: Source, progress: Progress, now: number): QItem | undefined {
    const inScope = (t: string) => this.topicIds.includes(t);
    switch (source) {
      case 'fix': {
        const ms = Object.values(progress.mistakes)
          .filter((m) => inScope(m.topicId) && !this.asked.has(m.id) && now - m.at > 5 * MIN)
          .sort((a, b) => Number(b.confidentWrong) - Number(a.confidentWrong) || (a.wins ?? 0) - (b.wins ?? 0) || b.count - a.count || a.at - b.at);
        for (const m of ms) {
          if (this.recentTopic(m.topicId) && ms.length > 1) continue;
          const it = asItem(m.id, m.snapshot);
          if (it) return it;
        }
        return undefined;
      }
      case 'review': {
        const dueItems = this.pool
          .filter((q) => { const s = progress.items[q.id]; return s && s.seen > 0 && s.due <= now && !progress.mistakes[q.id] && !this.asked.has(q.id); })
          .sort((a, b) => progress.items[a.id]!.due - progress.items[b.id]!.due);
        const q = dueItems.find((x) => !this.recentTopic(x.topicId)) ?? dueItems[0];
        if (!q) return undefined;
        // half the time, check the idea with a similar question rather than the same one
        if (Math.random() < 0.5) { const s = this.similarTo(q); if (s) { this.asked.add(q.id); return s; } }
        return q;
      }
      case 'similar': {
        const dueTopics = Object.entries(progress.topicSrs ?? {})
          .filter(([t, s]) => inScope(t) && s.due <= now && s.right > 0 && !this.recentTopic(t))
          .sort((a, b) => a[1].due - b[1].due);
        for (const [t] of dueTopics) {
          const unseen = this.pool.filter((q) => q.topicId === t && !this.asked.has(q.id) && !progress.items[q.id]);
          const pick = unseen.length ? this.best(unseen, progress, now) : (getTopic(t)?.topic.generators?.length ? this.generatedFor(t, 1) : this.best(this.pool.filter((q) => q.topicId === t && !this.asked.has(q.id)), progress, now));
          if (pick) return pick;
        }
        return undefined;
      }
      case 'weak': {
        const weak = this.topicIds
          .filter((t) => (progress.topics[t]?.n ?? 0) > 0 && ['weak', 'developing'].includes(level(progress.topics[t], now)) && !this.recentTopic(t))
          .sort((a, b) => mastery(progress.topics[a], now) - mastery(progress.topics[b], now));
        for (const t of weak.slice(0, 3)) {
          const cands = this.pool.filter((q) => q.topicId === t && !this.asked.has(q.id));
          const pick = getTopic(t)?.topic.generators?.length && Math.random() < 0.4 ? this.generatedFor(t) : this.best(cands, progress, now);
          if (pick) return pick;
        }
        return undefined;
      }
      case 'new': {
        const gaps = uncovered(this.subjects, this.profile, progress, 6);
        for (const g of gaps) {
          if (!inScope(g.topicId) || this.recentTopic(g.topicId)) continue;
          const easy = this.pool.filter((q) => q.topicId === g.topicId && q.d <= 2 && !this.asked.has(q.id));
          const pick = easy[Math.floor(Math.random() * easy.length)] ?? this.generatedFor(g.topicId);
          if (pick) return pick;
        }
        return undefined;
      }
      default:
        return undefined;
    }
  }
}

export const SESSION_LENGTHS = [10, 15, 20, 30, 45, 60];

/** A one-line preview of what a session will focus on */
export function sessionPreview(subjectIds: string[] | null): { fix: number; due: number; weak: number; fresh: number } {
  const profile = getProfile();
  const progress = getProgress();
  const now = Date.now();
  const subjects = subjectIds?.length ? activeSubjects(profile).filter((s) => subjectIds.includes(s.id)) : activeSubjects(profile);
  const topics = new Set(subjects.flatMap((s) => visibleTopics(s, profile).map((t) => t.id)));
  const fix = Object.values(progress.mistakes).filter((m) => topics.has(m.topicId)).length;
  const due = Object.entries(progress.topicSrs ?? {}).filter(([t, s]) => topics.has(t) && s.due <= now).length;
  const weak = [...topics].filter((t) => ['weak', 'developing'].includes(level(progress.topics[t], now)) && (progress.topics[t]?.n ?? 0) > 0).length;
  const fresh = [...topics].filter((t) => !(progress.topics[t]?.n)).length;
  return { fix, due, weak, fresh };
}
