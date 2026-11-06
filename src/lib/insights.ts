// Derived numbers for dashboards and recommendations.
import type { Subject, Topic } from '../content/types';
import { activeSubjects, topicQuestions, visibleTopics, getTopic } from '../content/registry';
import { level, mastery, type Level } from './engine';
import type { Profile, Progress } from './store';
import { hash } from './util';

export const cardId = (topicId: string, front: string) => `${topicId}#${hash(front)}`;

export interface SubjectStats {
  subject: Subject;
  topics: Topic[];
  mastery: number; // average over topics (unstarted count as 0)
  started: number;
  levels: Record<Level, number>;
  dueCards: number;
  dueQuestions: number;
  mistakes: number;
}

export function subjectStats(subject: Subject, profile: Profile, progress: Progress, now = Date.now()): SubjectStats {
  const topics = visibleTopics(subject, profile);
  const levels: Record<Level, number> = { new: 0, weak: 0, developing: 0, secure: 0, mastered: 0 };
  let sum = 0, started = 0, dueCards = 0, dueQuestions = 0;
  for (const t of topics) {
    const ts = progress.topics[t.id];
    const lv = level(ts, now);
    levels[lv]++;
    if (ts && ts.n > 0) started++;
    sum += mastery(ts, now);
    for (const c of t.flashcards) {
      const s = progress.cards[cardId(t.id, c.front)];
      if (s && s.due <= now) dueCards++;
    }
    for (const q of topicQuestions(t.id)) {
      const s = progress.items[q.id];
      if (s && s.due <= now) dueQuestions++;
    }
  }
  const mistakes = Object.values(progress.mistakes).filter((m) => m.subjectId === subject.id).length;
  return { subject, topics, mastery: topics.length ? sum / topics.length : 0, started, levels, dueCards, dueQuestions, mistakes };
}

export interface Recommendation {
  subject: Subject;
  topic: Topic;
  reason: string;
  action: 'learn' | 'quiz' | 'review' | 'exam';
  priority: number;
}

/** What should I do next? Weak + due + not started, spread across subjects */
export function recommendations(profile: Profile, progress: Progress, limit = 6, subjectId?: string | string[]): Recommendation[] {
  const now = Date.now();
  const recs: Recommendation[] = [];
  const only = subjectId === undefined ? null : Array.isArray(subjectId) ? subjectId : [subjectId];
  for (const subject of activeSubjects(profile)) {
    if (only && !only.includes(subject.id)) continue;
    visibleTopics(subject, profile).forEach((topic, idx) => {
      const ts = progress.topics[topic.id];
      const m = mastery(ts, now);
      const lv = level(ts, now);
      const dueQs = topicQuestions(topic.id).filter((q) => {
        const s = progress.items[q.id];
        return s && s.due <= now;
      }).length;
      let priority = 0;
      let reason = '';
      let action: Recommendation['action'] = 'quiz';
      if (lv === 'new') {
        priority = 0.5 - idx * 0.01; // earlier topics first
        reason = 'Not started yet';
        action = 'learn';
      } else if (lv === 'weak') {
        priority = 1.2 - m;
        reason = 'Needs work - your weakest area';
        action = ts?.notesRead ? 'quiz' : 'learn';
      } else if (dueQs > 0) {
        priority = 0.9 + Math.min(0.3, dueQs * 0.05);
        reason = `${dueQs} question${dueQs > 1 ? 's' : ''} due for review`;
        action = 'review';
      } else if (lv === 'developing') {
        priority = 0.8 - m * 0.3;
        reason = 'Developing - a bit more practice will secure it';
      } else if (lv === 'secure' && (topic.examQuestions?.length ?? 0) > 0 && !(ts?.exam?.length)) {
        priority = 0.45;
        reason = 'Secure - now try an exam-style question';
        action = 'exam';
      } else {
        priority = 0.1 * (1 - m);
        reason = 'Keep it fresh';
      }
      recs.push({ subject, topic, reason, action, priority });
    });
  }
  recs.sort((a, b) => b.priority - a.priority);
  // spread across subjects: at most 2 per subject in the top list
  const out: Recommendation[] = [];
  const per: Record<string, number> = {};
  for (const r of recs) {
    if ((per[r.subject.id] ?? 0) >= (subjectId ? 99 : 2)) continue;
    per[r.subject.id] = (per[r.subject.id] ?? 0) + 1;
    out.push(r);
    if (out.length >= limit) break;
  }
  return out;
}

export function dueCardCount(profile: Profile, progress: Progress, subjectIds?: string[]): number {
  const now = Date.now();
  let n = 0;
  for (const subject of activeSubjects(profile)) {
    if (subjectIds && !subjectIds.includes(subject.id)) continue;
    for (const t of visibleTopics(subject, profile)) {
      for (const c of t.flashcards) {
        const s = progress.cards[cardId(t.id, c.front)];
        if (s && s.due <= now) n++;
      }
    }
  }
  return n;
}

export function topicTitle(id: string): string {
  return getTopic(id)?.topic.title ?? id;
}

export function daysToExam(profile: Profile): number {
  const d = new Date(profile.firstExam + 'T09:00:00');
  return Math.max(0, Math.ceil((d.getTime() - Date.now()) / 86_400_000));
}
