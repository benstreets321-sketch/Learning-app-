// Central index of all subjects, topics and questions, plus profile-aware filtering.
import type { GeneratedQuestion, QItem, Question, Subject, Topic, Unit } from './types';
import type { Profile } from '../lib/store';
import { hash, mulberry32 } from '../lib/util';
import { GENERATORS } from './generators';

import englishLanguage from './subjects/english-language';
import englishLiterature from './subjects/english-literature';
import maths from './subjects/maths';
import biology from './subjects/biology';
import chemistry from './subjects/chemistry';
import physics from './subjects/physics';
import imedia from './subjects/imedia';
import business from './subjects/business';
import history from './subjects/history';
import statistics from './subjects/statistics';

export const SUBJECTS: Subject[] = [
  englishLanguage, englishLiterature, maths, biology, chemistry, physics, imedia, business, history, statistics,
];

export interface TopicRef {
  subject: Subject;
  unit: Unit;
  topic: Topic;
}

const topicMap = new Map<string, TopicRef>();
const questionMap = new Map<string, QItem>();
const questionsByTopic = new Map<string, QItem[]>();

// ---------- Derived practice from quotes and timelines ----------
const stripEnd = (s: string) => s.replace(/[.,;:!?’'"“”—–-]+$/g, '').trim();

function deriveQuestions(topic: Topic, speakers: string[]): Question[] {
  const out: Question[] = [];
  for (const qt of topic.quotes ?? []) {
    const words = qt.text.split(/\s+/);
    if (words.length >= 5) {
      const lastN = stripEnd(words[words.length - 1]).length >= 4 ? 1 : 2;
      const answer = stripEnd(words.slice(-lastN).join(' '));
      const start = words.slice(0, -lastN).join(' ');
      out.push({ type: 'text', q: `Complete the quotation${qt.who ? ` (${qt.who})` : ''}: “${start} …”`, accept: [answer], why: `“${qt.text}”${qt.where ? ` (${qt.where})` : ''}\n\n${qt.analysis}`, d: 2 });
    }
    if (qt.who) {
      const others = speakers.filter((s) => s !== qt.who);
      if (others.length >= 2) {
        const off = qt.text.length % others.length;
        const pickOthers = [...new Set([others[off], others[(off + 1) % others.length], others[(off + 2) % others.length]])];
        out.push({ type: 'mcq', q: `Which character, speaker or poem is this quotation from? “${qt.text}”`, options: [qt.who, ...pickOthers], answer: 0, why: qt.analysis, d: 2 });
      }
    }
  }
  const tl = topic.timeline ?? [];
  if (tl.length >= 4) {
    for (let i = 0; i + 4 <= tl.length; i += 4) {
      out.push({ type: 'order', q: 'Put these events in chronological order (earliest first).', items: tl.slice(i, i + 4).map((e) => e.event), why: tl.slice(i, i + 4).map((e) => `**${e.date}**: ${e.event}`).join('  \n'), d: 3 });
    }
    const dates = [...new Set(tl.map((e) => e.date))];
    tl.slice(0, 8).forEach((e, i) => {
      const wrong = dates.filter((d) => d !== e.date);
      if (wrong.length < 3) return;
      const w = [wrong[(i + 1) % wrong.length], wrong[(i + 3) % wrong.length], wrong[(i + 5) % wrong.length]];
      const opts = [...new Set([e.date, ...w])];
      if (opts.length >= 3) out.push({ type: 'mcq', q: `When did this happen? **${e.event}**`, options: opts, answer: 0, why: `${e.date}: ${e.event}`, d: 2 });
    });
  }
  return out;
}

function deriveCards(topic: Topic) {
  const cardsOut = (topic.quotes ?? []).map((qt) => ({
    front: `“${qt.text}”\n\n*Who / where - and what does it show?*`,
    back: `**${[qt.who, qt.where].filter(Boolean).join(', ') || 'Key quote'}**\n\n${qt.analysis}`,
  }));
  return cardsOut;
}

for (const subject of SUBJECTS) {
  const speakers = [...new Set(subject.units.flatMap((u) => u.topics.flatMap((t) => (t.quotes ?? []).map((q) => q.who).filter((w): w is string => !!w))))];
  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      topicMap.set(topic.id, { subject, unit, topic });
      // per-text speakers make better distractors: prefer speakers from the same unit
      const unitSpeakers = [...new Set(unit.topics.flatMap((t) => (t.quotes ?? []).map((q) => q.who).filter((w): w is string => !!w)))];
      const derived = deriveQuestions(topic, unitSpeakers.length >= 4 ? unitSpeakers : speakers);
      if (derived.length && !topic.questions.some((q) => (q as { derived?: boolean }).derived)) {
        topic.questions = [...topic.questions, ...derived.map((d) => ({ ...d, derived: true }))];
        topic.flashcards = [...topic.flashcards, ...deriveCards(topic)];
      }
      const seen = new Set<string>();
      const items: QItem[] = topic.questions.map((q, i) => {
        const text = 'q' in q && q.q ? q.q : q.type === 'cloze' ? q.text : String(i);
        let id = `${topic.id}:${hash(text)}`;
        if (seen.has(id)) id = `${id}-${i}`;
        seen.add(id);
        const item = { ...q, id, topicId: topic.id, subjectId: subject.id } as QItem;
        questionMap.set(id, item);
        return item;
      });
      questionsByTopic.set(topic.id, items);
    }
  }
}

export const getSubject = (id: string) => SUBJECTS.find((s) => s.id === id);
export const getTopic = (id: string) => topicMap.get(id);
export const getQuestion = (id: string) => questionMap.get(id);
export const topicQuestions = (topicId: string) => questionsByTopic.get(topicId) ?? [];
export const allTopicRefs = () => [...topicMap.values()];

/** Is this unit relevant to the student's chosen options (set texts, history units, course)? */
export function unitVisible(unit: Unit, profile: Profile): boolean {
  if (!unit.option) return true;
  if (profile.showAllOptions) return true;
  const { group, value } = unit.option;
  const chosen = profile.options[group];
  const multi = profile.multiOptions[group];
  if (multi && multi.length) return multi.includes(value);
  if (chosen === undefined) return true;
  if (chosen === 'all' || chosen === 'both') return true;
  return chosen === value || value === 'all';
}

export function tierOk(t: { tier?: string }, subjectId: string, profile: Profile): boolean {
  if (!t.tier || t.tier === 'both' || t.tier === 'F') return true;
  return (profile.tiers[subjectId] ?? 'H') === 'H';
}

export function visibleUnits(subject: Subject, profile: Profile): Unit[] {
  return subject.units
    .filter((u) => unitVisible(u, profile))
    .map((u) => ({ ...u, topics: u.topics.filter((t) => tierOk(t, subject.id, profile)) }))
    .filter((u) => u.topics.length > 0);
}

export function visibleTopics(subject: Subject, profile: Profile): Topic[] {
  return visibleUnits(subject, profile).flatMap((u) => u.topics);
}

export function activeSubjects(profile: Profile): Subject[] {
  return SUBJECTS.filter((s) => profile.subjects.includes(s.id));
}

export function questionPool(topicIds: string[], profile: Profile): QItem[] {
  return topicIds.flatMap((tid) => {
    const ref = topicMap.get(tid);
    if (!ref) return [];
    return topicQuestions(tid).filter((q) => tierOk(q, ref.subject.id, profile));
  });
}

// ---------- Generated (procedural) questions ----------

export interface GenSnapshot {
  g: string;
  s: number;
  l: number;
  t: string;
}

export function generatedToQuestion(gq: GeneratedQuestion): Question {
  const why = gq.steps.join('\n\n');
  if (gq.options && gq.options.length) {
    return { type: 'mcq', q: gq.q, options: gq.options, answer: 0, why, hints: gq.hints, d: gq.d };
  }
  if (typeof gq.answer === 'number') {
    return { type: 'num', q: gq.q, answer: gq.answer, tol: gq.tol, unit: gq.unit, steps: gq.steps, why, hints: gq.hints, d: gq.d };
  }
  return { type: 'text', q: gq.q, accept: gq.accept ?? [String(gq.answer)], steps: gq.steps, why, hints: gq.hints, d: gq.d };
}

export function makeGenerated(snap: GenSnapshot): QItem | undefined {
  const gen = GENERATORS[snap.g];
  const ref = topicMap.get(snap.t);
  if (!gen || !ref) return undefined;
  try {
    const gq = gen.make(mulberry32(snap.s), snap.l);
    const q = generatedToQuestion(gq);
    return { ...q, id: `gen:${snap.g}:${snap.s}`, topicId: snap.t, subjectId: ref.subject.id, generated: true } as QItem;
  } catch {
    return undefined;
  }
}

export function randomGenerated(topicId: string, level: number, profile: Profile, rand = Math.random): QItem | undefined {
  const ref = topicMap.get(topicId);
  if (!ref?.topic.generators?.length) return undefined;
  const ids = ref.topic.generators.filter((g) => GENERATORS[g] && tierOk(GENERATORS[g], ref.subject.id, profile));
  if (!ids.length) return undefined;
  const g = ids[Math.floor(rand() * ids.length)];
  const s = Math.floor(rand() * 2 ** 31);
  return makeGenerated({ g, s, l: level, t: topicId });
}

export const totalCounts = () => {
  let topics = 0, questions = 0, cards = 0, exam = 0, generators = 0;
  for (const { topic } of topicMap.values()) {
    topics++;
    questions += topic.questions.length;
    cards += topic.flashcards.length;
    exam += topic.examQuestions?.length ?? 0;
    generators += topic.generators?.length ?? 0;
  }
  return { topics, questions, cards, exam, generators, generatorTypes: Object.keys(GENERATORS).length };
};

/** A similar but easier question on the same topic (used after a wrong answer and in rescue sessions) */
export function easierQuestion(item: { id: string; topicId: string; d: number }, profile: Profile, exclude: Set<string> = new Set()): QItem | undefined {
  const ref = topicMap.get(item.topicId);
  if (!ref) return undefined;
  const target = Math.max(1, item.d - 1);
  const pool = topicQuestions(item.topicId).filter((q) => q.id !== item.id && !exclude.has(q.id) && tierOk(q, ref.subject.id, profile));
  const easier = pool.filter((q) => q.d <= target);
  if (ref.topic.generators?.length && (item.id.startsWith('gen:') || !easier.length)) {
    const g = randomGenerated(item.topicId, target, profile);
    if (g) return g;
  }
  const list = easier.length ? easier : pool.filter((q) => q.d <= item.d);
  if (!list.length) return undefined;
  list.sort((a, b) => a.d - b.d);
  const lowest = list.filter((q) => q.d === list[0].d);
  return lowest[Math.floor(Math.random() * lowest.length)];
}

/** Easiest questions for a topic, for "back to basics" practice */
export function easyQuestions(topicId: string, profile: Profile, n = 3): QItem[] {
  const ref = topicMap.get(topicId);
  if (!ref) return [];
  const out: QItem[] = [];
  const pool = topicQuestions(topicId).filter((q) => tierOk(q, ref.subject.id, profile)).sort((a, b) => a.d - b.d || Math.random() - 0.5);
  const gens = ref.topic.generators?.length ?? 0;
  for (let i = 0; out.length < n && i < n * 3; i++) {
    if (gens && (i % 2 === 1 || !pool.length)) {
      const g = randomGenerated(topicId, 1, profile);
      if (g) { out.push(g); continue; }
    }
    const q = pool.shift();
    if (q) out.push(q);
  }
  return out;
}
