import { describe, expect, it } from 'vitest';
import { evaluate, formatResult } from '../src/lib/calc';
import { ELEMENTS, electronShells } from '../src/content/periodic';

describe('calculator', () => {
  it('follows BIDMAS', () => {
    expect(evaluate('2+3×4')).toBe(14);
    expect(evaluate('(2+3)×4')).toBe(20);
    expect(evaluate('2^3^2')).toBe(512);
    expect(evaluate('-3²')).toBe(-9);
    expect(evaluate('10÷4')).toBe(2.5);
  });
  it('handles functions, constants and implicit multiplication', () => {
    expect(evaluate('sin(30)')).toBeCloseTo(0.5, 12);
    expect(evaluate('tan(45)')).toBeCloseTo(1, 12);
    expect(evaluate('asin(0.5)')).toBeCloseTo(30, 9);
    expect(evaluate('√(16)')).toBe(4);
    expect(evaluate('∛(27)')).toBeCloseTo(3, 12);
    expect(evaluate('2π')).toBeCloseTo(2 * Math.PI, 12);
    expect(evaluate('3(4+1)')).toBe(15);
    expect(evaluate('Ans×2', 21)).toBe(42);
    expect(evaluate('50%×80')).toBe(40);
    expect(evaluate('3×10^8')).toBe(3e8);
  });
  it('reports errors instead of crashing', () => {
    expect(() => evaluate('5÷0')).toThrow();
    expect(() => evaluate('2+')).toThrow();
    expect(() => evaluate('2$3')).toThrow();
  });
  it('formats results', () => {
    expect(formatResult(0.1 + 0.2)).toBe('0.3');
    expect(formatResult(6.02e23)).toBe('6.02 × 10^23');
  });
});

describe('periodic table', () => {
  it('places elements in the right group and period', () => {
    const by = (s: string) => ELEMENTS.find((e) => e.sym === s)!;
    expect(by('Na')).toMatchObject({ group: 1, period: 3, ar: 23 });
    expect(by('Cl')).toMatchObject({ group: 17, period: 3, ar: 35.5 });
    expect(by('Fe')).toMatchObject({ group: 8, period: 4 });
    expect(by('Au')).toMatchObject({ group: 11, period: 6 });
    expect(by('Rn')).toMatchObject({ group: 18, period: 6 });
    const cells = new Set(ELEMENTS.map((e) => `${e.group},${e.period}`));
    expect(cells.size).toBe(ELEMENTS.length);
  });
  it('gives GCSE electron arrangements', () => {
    expect(electronShells(11)).toBe('2, 8, 1');
    expect(electronShells(20)).toBe('2, 8, 8, 2');
  });
});
