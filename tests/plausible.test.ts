// Every multiple-choice option should be believable: no option can be ruled out by its form (a number among words,
// a different unit, a sentence among single terms, a capitalised option among lowercase ones, a full stop on some
// only), only by knowing the answer.
import { describe, expect, it } from 'vitest';
import { GENERATORS } from '../src/content/generators';
import { allTopicRefs, topicQuestions } from '../src/content/registry';
import { formGiveaway, formOk, harmonise, kindScore, numberParts, pickPlausible } from '../src/content/generators/plausible';
import { mulberry32 } from '../src/lib/util';

describe('plausible wrong answers: the rules', () => {
  it('rules out options that differ in kind or form', () => {
    expect(formOk('12 marks', 'Yours faithfully')).toBe(false); // a number among words
    expect(formOk('9.8 N/kg', '9.8 kg')).toBe(false); // a different unit
    expect(formOk('lungs', 'the lungs and the pulmonary arteries carry blood')).toBe(false); // a sentence among terms
    expect(formOk('arteries', 'pulmonary arteries')).toBe(false); // both could be right
    expect(formOk('supernovae', 'supernova')).toBe(false); // the same word, singular and plural
    expect(formOk('DNA', 'enzyme')).toBe(false); // an acronym among words
    expect(formOk('1066', 'the Normans')).toBe(false); // a year among names
    expect(formOk('more marks (12)', 'four true statements')).toBe(false); // a bracketed detail on one only
    expect(formOk('Benedict\'s test', 'biuret test')).toBe(true);
    expect(formOk('45 N', '4.5 N')).toBe(true);
  });

  it('reads numbers the way students write them', () => {
    expect(numberParts('about 80%')).toMatchObject({ unit: '%' });
    expect(numberParts('5/8')).toMatchObject({ n: 5, unit: '' });
    expect(numberParts('2.4 × 10⁹')).toMatchObject({ unit: '' });
    expect(numberParts('1860-61')).toMatchObject({ n: 1860, unit: '' });
    expect(numberParts('15,000')).toMatchObject({ n: 15000, unit: '' });
    expect(numberParts('5 - The End of It')).toBeNull();
    expect(numberParts('1886, late Victorian London')).toBeNull();
  });

  it('prefers options of the same kind (same head word, same case, similar length)', () => {
    expect(kindScore('Benedict\'s test', 'iodine test')).toBeGreaterThan(kindScore('Benedict\'s test', 'optimum pH'));
    const pool = ['optimum pH', 'iodine test', 'biuret test', 'active site', 'ethanol emulsion test', 'denatured'];
    const picked = pickPlausible('Benedict\'s test', pool, 3, mulberry32(4), 0.5)!;
    expect(picked.sort()).toEqual(['biuret test', 'ethanol emulsion test', 'iodine test']);
    expect(pickPlausible('Benedict\'s test', ['optimum pH', 'denatured'], 3, mulberry32(4))).toBeNull();
  });

  it('evens out capitals and full stops only when the options are mixed', () => {
    expect(harmonise(['Benedict\'s test', 'biuret test', 'iodine test'])).toEqual(['Benedict\'s test', 'Biuret test', 'Iodine test']);
    expect(harmonise(['kg', 'N', 'm/s'])).toEqual(['kg', 'N', 'm/s']);
    expect(harmonise(['lungs', 'Plasma', 'aorta'], 'mid', () => true)).toEqual(['lungs', 'plasma', 'aorta']);
    expect(harmonise(['A comparison using like.', 'A comparison saying one thing IS another', 'Giving human qualities.'])).toEqual(['A comparison using like', 'A comparison saying one thing IS another', 'Giving human qualities']);
  });
});

describe('plausible wrong answers: the whole question bank', () => {
  // two known exceptions: a poem whose real title is lowercase ("pot"), and a deliberately incomplete rotation
  const ALLOWED = /^(wl-jewellery|m-geo-transform):/;

  it('no written or derived multiple-choice question has a form giveaway', () => {
    const bad: string[] = [];
    let n = 0;
    for (const ref of allTopicRefs()) for (const q of topicQuestions(ref.topic.id)) {
      if (q.type !== 'mcq') continue;
      n++;
      const g = formGiveaway(q.options, q.answer);
      if (g && !ALLOWED.test(q.id)) bad.push(`${q.id}: ${g}`);
      expect(q.options.some((o) => /\b(all|none|both) of (the|these) (above|options)\b/i.test(o)), q.id).toBe(false);
      expect(new Set(q.options.map((o) => o.trim().toLowerCase())).size, q.id).toBe(q.options.length);
    }
    expect(n).toBeGreaterThan(1000);
    expect(bad, bad.slice(0, 10).join('\n')).toEqual([]);
  }, 60_000);

  it('questions made from flashcards offer definitions against definitions, never answers to other questions', () => {
    for (const ref of allTopicRefs()) for (const q of topicQuestions(ref.topic.id)) {
      if (q.type !== 'mcq' || !(q as { derived?: boolean }).derived || (q as { fromQuotes?: boolean }).fromQuotes) continue;
      expect(q.q, q.id).not.toMatch(/^(why|how|who does|when did|where did|difference|advantage|stages|purpose|function)\b/i);
    }
  }, 60_000);

  it('a poem never appears twice in one question under two names', () => {
    const canon = (t: string) => t.toLowerCase().replace(/^(the|extract from( the)?)\s+/, '').replace(/[^a-z0-9]/g, '');
    for (const ref of allTopicRefs()) for (const q of topicQuestions(ref.topic.id)) {
      if (q.type !== 'mcq' || !/strong comparison/.test(q.q)) continue;
      expect(new Set(q.options.map(canon)).size, q.id).toBe(q.options.length);
    }
  });
});

describe('plausible wrong answers: generated questions', () => {
  it('generated multiple choice almost never gives itself away by form', () => {
    const fam = new Map<string, { n: number; bad: string[] }>();
    for (const [id, g] of Object.entries(GENERATORS)) {
      const pre = id.split('-')[0];
      for (let seed = 1; seed <= 15; seed++) {
        const q = g.make(mulberry32(seed * 7919 + 3), (seed % 5) + 1);
        if (!q.options) continue;
        const r = fam.get(pre) ?? { n: 0, bad: [] };
        fam.set(pre, r);
        r.n++;
        const gv = formGiveaway(q.options, q.options.indexOf(String(q.answer)));
        if (gv) r.bad.push(`${id}: ${gv}`);
      }
    }
    let n = 0, bad = 0;
    for (const [pre, r] of fam) {
      n += r.n; bad += r.bad.length;
      // ordering questions mix fractions, decimals and percentages on purpose; everything else stays under 2%
      expect(r.bad.length / r.n, `${pre}: ${r.bad.slice(0, 3).join('\n')}`).toBeLessThanOrEqual(pre === 'mm' ? 0.03 : 0.02);
    }
    expect(bad / n).toBeLessThan(0.01);
  }, 120_000);

  it('gap questions from the notes never blank a small word or offer a heading as an answer', () => {
    const FUNCTION = /^(between|within|why|how|what|its|it's|not|and|or|but|issues|uses|advantages|disadvantages|examples)$/i;
    for (const [id, g] of Object.entries(GENERATORS)) {
      if (!id.startsWith('nt-')) continue;
      for (let seed = 1; seed <= 6; seed++) {
        const q = g.make(mulberry32(seed * 31 + 7), 2);
        if (!q.options || !/Complete this point/.test(q.q)) continue;
        q.options.forEach((o) => expect(o, `${id}: ${q.q.slice(0, 80)}`).not.toMatch(FUNCTION));
      }
    }
  }, 120_000);
});
