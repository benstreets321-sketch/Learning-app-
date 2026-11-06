import { describe, expect, it } from 'vitest';
import { adaptTarget, gradeFromOutcome, level, mastery, newTopicState, pCorrect, pickNext, schedule, updateAbility } from '../src/lib/engine';
import { checkNumber, checkText, parseCloze, parseNumber } from '../src/lib/answer';
import { ALL_GENERATORS } from '../src/content/generators';
import { mulberry32 } from '../src/lib/util';

describe('spaced repetition', () => {
  it('grows the interval with successful reviews', () => {
    let s = schedule(undefined, 2, 0);
    expect(s.ivl).toBe(1);
    s = schedule(s, 2, 1);
    expect(s.ivl).toBe(3);
    s = schedule(s, 2, 2);
    expect(s.ivl).toBeGreaterThan(5);
  });
  it('resets on a lapse and reduces ease', () => {
    let s = schedule(undefined, 3, 0);
    s = schedule(s, 0, 1);
    expect(s.ivl).toBe(0);
    expect(s.lapses).toBe(1);
    expect(s.ease).toBeLessThan(2.65);
    expect(s.lastWrong).toBe(true);
  });
  it('treats guesses and hints as Hard', () => {
    expect(gradeFromOutcome(true, 'guess', 0)).toBe(1);
    expect(gradeFromOutcome(true, 'sure', 1)).toBe(1);
    expect(gradeFromOutcome(true, 'sure', 0)).toBe(3);
    expect(gradeFromOutcome(false, 'sure', 0)).toBe(0);
  });
});

describe('ability and mastery', () => {
  it('rises with correct answers and falls with wrong ones', () => {
    let t = newTopicState();
    const start = t.theta;
    for (let i = 0; i < 6; i++) t = updateAbility(t, 3, 1, 1000);
    expect(t.theta).toBeGreaterThan(start);
    const high = t.theta;
    for (let i = 0; i < 6; i++) t = updateAbility(t, 3, 0, 1000);
    expect(t.theta).toBeLessThan(high);
  });
  it('harder questions are less likely to be answered correctly', () => {
    expect(pCorrect(0, 5)).toBeLessThan(pCorrect(0, 1));
  });
  it('reports levels', () => {
    expect(level(undefined)).toBe('new');
    let t = newTopicState();
    for (let i = 0; i < 12; i++) t = updateAbility(t, 4, 1, Date.now());
    expect(['secure', 'mastered']).toContain(level(t));
    expect(mastery(t)).toBeGreaterThan(0.6);
  });
  it('adapts target difficulty to the recent run', () => {
    expect(adaptTarget([true, false, false]).mode).toBe('support');
    expect(adaptTarget([true, true, true]).mode).toBe('stretch');
    expect(adaptTarget([true, false]).mode).toBe('normal');
  });
  it('prefers due mistakes over material not yet due', () => {
    const now = Date.now();
    const pool = [{ id: 'a', topicId: 't', d: 3 }, { id: 'b', topicId: 't', d: 3 }];
    const srs = { a: { ...schedule(undefined, 2, now - 1e10), due: now + 1e9 }, b: { ...schedule(undefined, 0, now - 1e10), due: now - 1 } };
    const pick = pickNext(pool, { now, srs, topics: {}, askedThisSession: new Set(), target: 0.7, rand: () => 0 });
    expect(pick?.id).toBe('b');
  });
});

describe('answer checking', () => {
  it('parses numbers in many formats', () => {
    expect(parseNumber('3/4')).toBe(0.75);
    expect(parseNumber('2 1/2')).toBe(2.5);
    expect(parseNumber('£1,200')).toBe(1200);
    expect(parseNumber('3.2 x 10^4')).toBe(32000);
    expect(parseNumber('45%')).toBe(45);
    expect(parseNumber('12 cm')).toBe(12);
    expect(parseNumber('-0.5')).toBe(-0.5);
    expect(parseNumber('hello')).toBeNull();
  });
  it('checks numbers with tolerance and flags power-of-ten slips', () => {
    expect(checkNumber('12.5', 12.5).ok).toBe(true);
    expect(checkNumber('12.49', 12.5, 0.05).ok).toBe(true);
    expect(checkNumber('125', 12.5).close).toBe(true);
  });
  it('accepts small typos in text answers but not in short words', () => {
    expect(checkText('mitocondria', ['mitochondria']).ok).toBe(true);
    expect(checkText('The Nucleus', ['nucleus']).ok).toBe(true);
    expect(checkText('cat', ['bat']).ok).toBe(false);
    expect(checkText('x ≥ 3', ['x >= 3']).ok).toBe(true);
  });
  it('parses cloze blanks with alternatives', () => {
    const c = parseCloze('The {{nucleus}} contains {{DNA|genetic material}}.');
    expect(c.blanks).toEqual([['nucleus'], ['DNA', 'genetic material']]);
    expect(c.parts.length).toBe(3);
  });
});

describe('question generators', () => {
  it('every generator produces valid, answerable questions across many seeds and levels', () => {
    for (const g of ALL_GENERATORS) {
      for (let seed = 1; seed <= 60; seed++) {
        const lvl = (seed % 5) + 1;
        const q = g.make(mulberry32(seed * 7919 + g.id.length), lvl);
        const ctx = `${g.id} seed ${seed}`;
        expect(q.q, ctx).toBeTruthy();
        expect(q.q, ctx).not.toMatch(/NaN|undefined|Infinity/);
        expect(q.steps.length, ctx).toBeGreaterThan(0);
        q.steps.forEach((s) => expect(s, ctx).not.toMatch(/NaN|undefined|Infinity/));
        if (typeof q.answer === 'number') expect(Number.isFinite(q.answer), ctx).toBe(true);
        else expect(String(q.answer).length, ctx).toBeGreaterThan(0);
        if (q.options) {
          expect(q.options[0], ctx).toBe(String(q.answer));
          expect(new Set(q.options).size, ctx).toBe(q.options.length);
          expect(q.options.length, ctx).toBeGreaterThanOrEqual(2);
        }
        if (q.spot) {
          expect(q.spot.lines.length, ctx).toBeGreaterThanOrEqual(3);
          expect(q.spot.lines[q.spot.wrong], ctx).not.toBe(q.spot.fix);
          q.spot.lines.forEach((l) => expect(l, ctx).not.toMatch(/NaN|undefined|Infinity/));
        }
        if (q.accept) expect(checkText(String(q.answer), q.accept).ok, ctx).toBe(true);
        if (typeof q.answer === 'number') expect(checkNumber(String(q.answer), q.answer, q.tol).ok, ctx).toBe(true);
      }
    }
  }, 60_000);
});
