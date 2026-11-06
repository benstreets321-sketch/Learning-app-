import { describe, expect, it, vi } from 'vitest';
import { defaultProfile, type Progress } from '../src/lib/store';
import { getSubject } from '../src/content/registry';
import { gapTopics, gradeAt, predictSubject, rangeText, scaleFor, shortGrade } from '../src/lib/predict';
import { lessonChunks, pickLearnTopic } from '../src/lib/learn';
import { VOCAB } from '../src/content/vocab';
import { GENERATORS } from '../src/content/generators';
import { distinct } from '../src/content/generators/vocab-gen';
import { mulberry32 } from '../src/lib/util';
import { skillOf, weakSkills } from '../src/lib/skills';

const empty = (): Progress => ({ v: 1, items: {}, cards: {}, topics: {}, mistakes: {}, days: {}, xp: 0, essays: {}, notes: {} });
const profile = () => ({ ...defaultProfile(), onboarded: true });
const maths = () => getSubject('maths')!;
const allTopics = (id: string) => getSubject(id)!.units.flatMap((u) => u.topics);
const strong = (n = 12) => ({ theta: 3, n, last: Date.now() });

describe('grade predictor', () => {
  it('uses the right grade scale for each kind of course', () => {
    const p = profile();
    expect(scaleFor('maths', p).labels).toContain('9');
    expect(scaleFor('maths', { ...p, tiers: { ...p.tiers, maths: 'F' } }).labels.at(-1)).toBe('5');
    expect(scaleFor('imedia', p).vocational).toBe(true);
    expect(scaleFor('business', { ...p, options: { ...p.options, 'business-course': 'btec' } }).vocational).toBe(true);
    expect(scaleFor('history', p).labels.at(-1)).toBe('9');
    expect(shortGrade('L2 Distinction*')).toBe('L2D*');
    expect(gradeAt(scaleFor('history', p), 0)).toBe('U');
  });

  it('starts low with a wide range, and rises with mastery', () => {
    const p = profile();
    const none = predictSubject(maths(), p, empty());
    expect(['U', '3', '4']).toContain(none.grade);
    expect(none.confidence).toBeLessThan(0.2);
    const pr = empty();
    for (const t of allTopics('maths')) pr.topics[t.id] = strong(20);
    const good = predictSubject(maths(), p, pr);
    expect(Number(good.grade)).toBeGreaterThanOrEqual(8);
    expect(good.pct).toBeGreaterThan(none.pct);
    expect(rangeText(good)).toMatch(/\d/);
  });

  it('counts marked mock papers for the tier taken', () => {
    const p = profile();
    const pr = empty();
    pr.mocks = { 'maths-p1-h-t1': [{ id: 'a', testId: 'maths-p1-h-t1', started: 1, remaining: 0, status: 'marked', finished: 2, answers: {}, marks: {}, ticks: {}, score: 64, max: 80 }] };
    const withMock = predictSubject(maths(), p, pr);
    expect(withMock.mocks).toBe(1);
    expect(withMock.pct).toBeGreaterThan(predictSubject(maths(), p, empty()).pct + 20);
    // a Foundation mock does not count when the student takes Higher
    pr.mocks = { 'maths-p1-f-t1': pr.mocks['maths-p1-h-t1'] };
    expect(predictSubject(maths(), p, pr).mocks).toBe(0);
  });

  it('works out the gap to a target grade and where the marks are', () => {
    const p = { ...profile(), targets: { maths: '7' } };
    const pr = empty();
    const ts = allTopics('maths');
    pr.topics[ts[3].id] = { theta: -2, n: 6, last: Date.now() };
    const pred = predictSubject(maths(), p, pr);
    expect(pred.target).toBe('7');
    expect(pred.gap).toBeGreaterThan(0);
    const gaps = gapTopics(maths(), p, pr, 5);
    expect(gaps.length).toBe(5);
    // a started-but-weak topic is the quickest win
    expect(gaps[0].topic.id).toBe(ts[3].id);
    for (const t of ts) pr.topics[t.id] = strong(20);
    expect(predictSubject(maths(), p, pr).gap).toBe(0);
  });
});

describe('Learn picks the next topic', () => {
  it('goes through the course in order, then relearns what was found hard', () => {
    const p = profile();
    const pr = empty();
    const first = pickLearnTopic(p, pr, ['history']);
    expect(first?.subject.id).toBe('history');
    const ordered = getSubject('history')!.units.flatMap((u) => u.topics);
    expect(ordered.map((t) => t.id)).toContain(first!.topic.id);
    // after learning it, the next one comes
    pr.topics[first!.topic.id] = { theta: 0, n: 5, last: Date.now(), notesRead: Date.now() };
    expect(pickLearnTopic(p, pr, ['history'])!.topic.id).not.toBe(first!.topic.id);
    // a topic answered badly and never taught comes first
    const hard = ordered[5].id;
    pr.topics[hard] = { theta: -3, n: 6, last: Date.now() };
    const again = pickLearnTopic(p, pr, ['history'])!;
    expect(again.topic.id).toBe(hard);
    expect(again.reason).toMatch(/hard/);
  });

  it('lets Higher-only topics wait when the target is grade 5 or below', () => {
    const p = { ...profile(), targets: { maths: '4' } };
    const pick = pickLearnTopic(p, empty(), ['maths'])!;
    expect(pick.topic.tier).not.toBe('H');
  });

  it('splits notes into a few short lesson chunks without losing anything', () => {
    for (const t of allTopics('biology').slice(0, 12)) {
      const chunks = lessonChunks(t.notes);
      expect(chunks.length).toBeGreaterThan(0);
      expect(chunks.length).toBeLessThanOrEqual(6);
      expect(chunks.join('\n\n').replace(/\s+/g, ' ')).toBe(t.notes.trim().replace(/\s+/g, ' '));
    }
  });
});

describe('question kinds (skills)', () => {
  it('knows diagrams, typed algebra and plotting apart', () => {
    expect(skillOf({ type: 'num', diagram: {} })).toBe('diagram');
    expect(skillOf({ type: 'algebra' })).toBe('algebra');
    expect(skillOf({ type: 'plot' })).toBe('plot');
    const w = weakSkills({ 'maths|algebra': { n: 10, c: 3 }, 'maths|calc': { n: 10, c: 9 }, 'history|recall': { n: 10, c: 1 } }, ['maths']);
    expect(w.map((x) => x.skill)).toEqual(['algebra', 'calc']);
  });
});

describe('ambitious vocabulary', () => {
  it('has a big, unique word bank with meanings and examples that use the word', () => {
    expect(VOCAB.length).toBeGreaterThanOrEqual(120);
    expect(new Set(VOCAB.map((v) => v.w)).size).toBe(VOCAB.length);
    for (const v of VOCAB) {
      expect(v.def.length, v.w).toBeGreaterThan(8);
      expect(v.ex.toLowerCase(), v.w).toContain(v.w.slice(0, Math.max(4, v.w.length - 3)));
    }
    const topic = getSubject('english-language')!.units.flatMap((u) => u.topics).find((t) => t.id === 'el-vocab');
    expect(topic?.flashcards.length).toBe(VOCAB.length);
  });

  it('never offers a near-synonym as a wrong answer', () => {
    const byWord = new Map(VOCAB.map((v) => [v.w, v]));
    const byDef = new Map(VOCAB.map((v) => [v.def, v]));
    for (const id of ['vb-meaning', 'vb-word', 'vb-upgrade', 'vb-desc', 'vb-argue', 'vb-analyse']) {
      for (let s = 1; s <= 150; s++) {
        const q = GENERATORS[id].make(mulberry32(s * 31 + 7), 3);
        if (!q.options) continue;
        const words = q.options.map((o) => byWord.get(o) ?? byDef.get(o));
        expect(words.every(Boolean), `${id} ${s}`).toBe(true);
        for (const w of words.slice(1)) expect(distinct(words[0]!, w!), `${id} ${s}: ${words[0]!.w} vs ${w!.w}`).toBe(true);
      }
    }
  });
});

// the session engine reads the saved store, so it gets its own in-memory storage
describe('session engine', () => {
  it('steers towards weak question kinds and target-grade topics, and plans card bursts', async () => {
    const mem = new Map<string, string>();
    (globalThis as unknown as { localStorage: unknown }).localStorage = { getItem: (k: string) => mem.get(k) ?? null, setItem: (k: string, v: string) => void mem.set(k, v), removeItem: (k: string) => void mem.delete(k), clear: () => mem.clear() };
    vi.resetModules();
    const store = await import('../src/lib/store');
    const { SessionEngine } = await import('../src/lib/session');
    store.updateProfile({ onboarded: true, targets: { maths: '7' } });
    const ts = allTopics('maths').filter((t) => !t.tier && t.id.startsWith('m-alg'));
    for (const t of ts.slice(0, 6)) for (let k = 0; k < 4; k++) store.recordAnswer({ id: `${t.id}-x${k}`, topicId: t.id, subjectId: 'maths', d: 2, correct: k % 2 === 0, hints: 0, skill: 'algebra' });
    const e = new SessionEngine(['maths']);
    const sources = new Set<string>();
    let lessons = 0, explains = 0;
    for (let i = 0; i < 40; i++) {
      const p = e.next();
      expect(p, `pick ${i}`).toBeTruthy();
      expect(p!.item.subjectId).toBe('maths');
      sources.add(p!.source);
      if (p!.lesson) lessons++;
      if (p!.explain) { explains++; expect(['mcq', 'tf', 'multi']).toContain(p!.item.type); }
      e.answered(p!.item, i % 3 !== 0);
    }
    expect(sources.has('target')).toBe(true);
    // typed algebra is this student's weak kind of question, so it gets its own practice
    expect(sources.has('skill')).toBe(true);
    // a wrong answer comes back a few questions later in the same session
    expect(sources.has('retry')).toBe(true);
    expect(lessons).toBeGreaterThan(0);
    expect(explains).toBeLessThan(20);
    expect(Array.isArray(e.dueCards())).toBe(true);
  });
});
