// "Learn": the app picks the next thing to learn and turns a topic into a short guided lesson.
//
// The topic is chosen from today's subject:
//   1. a topic the student has found hard and hasn't been taught properly yet (notes never read) - relearn it
//   2. the next topic in course order, favouring those that add most towards the target grade (the gap analysis);
//      when the target is grade 5 or below, Higher-only topics wait until the core ones are done
//   3. once every topic is started: the weakest one
// A lesson is a pre-test (guessing first makes the lesson stick), the notes in short chunks each followed by a quick
// question, a worked example, adaptive practice, then the topic's flashcards. Everything feeds the same reviews,
// Fix-it list and progress as the rest of the app, so the 30-minute session brings it back at the right time.
import type { QItem, Subject, Topic, Unit } from '../content/types';
import { activeSubjects, questionPool, randomGenerated, visibleUnits } from '../content/registry';
import { level, mastery } from './engine';
import { gapTopics, scaleFor } from './predict';
import type { Profile, Progress } from './store';

export interface LearnChoice { subject: Subject; unit: Unit; topic: Topic; reason: string }

export function pickLearnTopic(profile: Profile, progress: Progress, subjectIds?: string[] | null, skip: string[] = [], now = Date.now(), relearnFirst = false): LearnChoice | undefined {
  const subjects = activeSubjects(profile).filter((s) => !subjectIds?.length || subjectIds.includes(s.id));
  const ordered: { subject: Subject; unit: Unit; topic: Topic; idx: number }[] = [];
  for (const subject of subjects) {
    let idx = 0;
    for (const unit of visibleUnits(subject, profile)) for (const topic of unit.topics) {
      if (topic.tier === 'H' && profile.tiers[subject.id] === 'F') continue;
      if (!skip.includes(topic.id)) ordered.push({ subject, unit, topic, idx: idx++ });
    }
  }
  if (!ordered.length) return undefined;
  // 0) exam season: re-teach the topic worth the most marks among those already started
  if (relearnFirst) {
    const started = ordered.filter(({ topic }) => (progress.topics[topic.id]?.n ?? 0) > 0);
    const gains = new Map(subjects.flatMap((s) => gapTopics(s, profile, progress, 30, now).map((g) => [g.topic.id, g.gain] as const)));
    const best = started.filter((c) => gains.has(c.topic.id)).sort((a, b) => (gains.get(b.topic.id) ?? 0) - (gains.get(a.topic.id) ?? 0))[0];
    if (best) return { ...best, reason: 'Exams are close, so Learn re-teaches the topic that would add the most marks.' };
  }
  // 1) struggled with, never properly taught
  const relearn = ordered
    .filter(({ topic }) => { const ts = progress.topics[topic.id]; return ts && ts.n >= 2 && !ts.notesRead && level(ts, now) === 'weak'; })
    .sort((a, b) => mastery(progress.topics[a.topic.id], now) - mastery(progress.topics[b.topic.id], now))[0];
  if (relearn) return { ...relearn, reason: 'You have found this topic hard – here is the lesson, then practice.' };
  // 2) new topics: course order, nudged towards the target grade
  const fresh = ordered.filter(({ topic }) => !(progress.topics[topic.id]?.n) && !progress.topics[topic.id]?.notesRead);
  if (fresh.length) {
    const gain = new Map<string, number>();
    for (const s of subjects) gapTopics(s, profile, progress, 12, now).forEach((g, i) => gain.set(g.topic.id, 12 - i));
    const modestTarget = (s: Subject) => {
      const t = profile.targets?.[s.id];
      const scale = scaleFor(s.id, profile);
      const i = t ? scale.labels.indexOf(t) : -1;
      return i > 0 && !scale.vocational && Number(t) <= 5;
    };
    const score = (c: (typeof fresh)[number]) => c.idx - (gain.get(c.topic.id) ?? 0) * 0.15 + (c.topic.tier === 'H' && modestTarget(c.subject) ? 100 : 0);
    const best = [...fresh].sort((a, b) => score(a) - score(b))[0];
    const target = profile.targets?.[best.subject.id];
    return { ...best, reason: target ? `Next in your course, and part of the way to your target of ${target} in ${best.subject.short}.` : `Next in your ${best.subject.short} course.` };
  }
  // 3) everything started: the weakest
  const weakest = [...ordered].sort((a, b) => mastery(progress.topics[a.topic.id], now) - mastery(progress.topics[b.topic.id], now))[0];
  return { ...weakest, reason: 'Every topic is started – this is your weakest, so it gets a full lesson again.' };
}

/** The notes as short lesson chunks: split at headings, joined up so each chunk is a sensible size (2–4 chunks) */
export function lessonChunks(notes: string): string[] {
  const text = notes.trim();
  if (!text) return [];
  let parts = text.split(/\n(?=##\s)/).map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2) parts = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const wordsOf = (s: string) => s.split(/\s+/).length;
  const total = parts.reduce((a, p) => a + wordsOf(p), 0);
  const target = Math.max(60, Math.ceil(total / Math.min(4, Math.max(1, Math.round(total / 70)))));
  const out: string[] = [];
  let cur = '';
  for (const p of parts) {
    if (cur && wordsOf(cur) + wordsOf(p) > target * 1.25) { out.push(cur); cur = p; } else cur = cur ? `${cur}\n\n${p}` : p;
  }
  if (cur) out.push(cur);
  return out;
}

/** Questions to use in a lesson, easiest first, avoiding long source-based ones */
export function lessonQuestions(topicId: string, profile: Profile): QItem[] {
  return questionPool([topicId], profile).filter((q) => !q.ctx && q.type !== 'spot').sort((a, b) => a.d - b.d);
}

/** One practice question near the given difficulty: a generator's fresh numbers or a bank question not yet used */
export function practiceQuestion(topicId: string, d: number, profile: Profile, used: Set<string>, preferGen: boolean): QItem | undefined {
  const bank = lessonQuestions(topicId, profile).filter((q) => !used.has(q.id));
  const near = bank.filter((q) => Math.abs(q.d - d) <= 1);
  const gen = preferGen || !near.length ? randomGenerated(topicId, d, profile) : undefined;
  if (gen && !used.has(gen.id)) return gen;
  const list = near.length ? near : bank;
  return list.length ? list[Math.floor(Math.random() * Math.min(3, list.length))] : randomGenerated(topicId, d, profile);
}
