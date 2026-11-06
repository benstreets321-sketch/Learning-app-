import { describe, expect, it } from 'vitest';
import { askedDp, formatAnswer } from '../src/lib/answer';
import { GENERATORS } from '../src/content/generators';
import { generatedToQuestion } from '../src/content/registry';
import { mulberry32 } from '../src/lib/util';

describe('answers are shown to the decimal places the question asks for', () => {
  it('reads the dp a question asks for', () => {
    expect(askedDp('Calculate the Rf value (2 dp).')).toBe(2);
    expect(askedDp('Give your answer to 1 decimal place.')).toBe(1);
    expect(askedDp('Give your answer to two decimal places.')).toBe(2);
    expect(askedDp('Work out 3 + 4')).toBeNull();
    expect(formatAnswer(0.8, 'Rf value (2 dp)')).toBe('0.80');
    expect(formatAnswer(12, 'to 1 decimal place')).toBe('12.0');
    expect(formatAnswer(1200, 'How many?')).toBe('1,200');
  });

  it('worked steps of generated questions use the same rounding', () => {
    const g = GENERATORS['c-rf'];
    for (let s = 1; s <= 200; s++) {
      const q = generatedToQuestion(g.make(mulberry32(s), 3));
      if (q.type !== 'num') continue;
      const want = q.answer.toFixed(2);
      expect(q.why, q.q).toContain(`= ${want}`);
    }
  });
});

describe('money answers are shown in pounds and pence', () => {
  it('formats currency before the number with 2 dp when not whole', async () => {
    const { answerWithUnit } = await import('../src/lib/answer');
    expect(answerWithUnit(1650, 'How much interest?', '£')).toBe('£1,650');
    expect(answerWithUnit(546.1, 'How many dollars?', '$')).toBe('$546.10');
    expect(answerWithUnit(4.5, 'Find the length', 'cm')).toBe('4.5 cm');
    expect(answerWithUnit(0.8, 'Rf value (2 dp)')).toBe('0.80');
  });
});

describe('spelling questions mark the spelling exactly', () => {
  it('forgives a typo normally but not when spelling is being tested', async () => {
    const { checkText, isSpellingQ } = await import('../src/lib/answer');
    expect(checkText('definately', ['definitely']).ok).toBe(true);
    expect(checkText('definately', ['definitely'], true).ok).toBe(false);
    expect(checkText('definitely', ['definitely'], true).ok).toBe(true);
    expect(isSpellingQ({ q: 'Correct the spelling: "definately"' })).toBe(true);
    expect(isSpellingQ({ q: 'Name the process plants use to make glucose.' })).toBe(false);
  });
});
