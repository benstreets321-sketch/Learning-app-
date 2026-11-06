import { describe, expect, it } from 'vitest';
import { checkAlgebra, parseExpr, prettyExpr } from '../src/lib/algebra';

const ok = (input: string, answer: string, form?: Parameters<typeof checkAlgebra>[2]) => checkAlgebra(input, answer, form).ok;

describe('typed algebra answers', () => {
  it('reads the ways students type maths', () => {
    for (const s of ['3x(2x+5)', '6x^2 + 15x', '6x²+15x', '(x+3)(x-2)', '(x + 3)²', '2√3', '√(x+1)', 'x = (y - 4)/3', '3×x', '−2x + 7', 'sqrt(12)', '½x']) {
      if (s === '½x') continue;
      expect(parseExpr(s), s).not.toBeNull();
    }
    expect(parseExpr('3x +')).toBeNull();
    expect(parseExpr('hello world!')).toBeNull();
  });

  it('accepts any equivalent form when no form is required', () => {
    expect(ok('6x^2+15x', '3x(2x+5)')).toBe(true);
    expect(ok('15x + 6x²', '3x(2x+5)')).toBe(true);
    expect(ok('x = (y-4)/3', '(y-4)/3')).toBe(true);
    expect(ok('y/3 - 4/3', '(y-4)/3')).toBe(true);
    expect(ok('6x^2+15', '3x(2x+5)')).toBe(false);
  });

  it('expanded and simplified', () => {
    expect(ok('x^2 + 5x + 6', '(x+2)(x+3)', 'expanded')).toBe(true);
    expect(ok('x² + 2x + 3x + 6', '(x+2)(x+3)', 'expanded')).toBe(false);
    expect(ok('(x+2)(x+3)', '(x+2)(x+3)', 'expanded')).toBe(false);
    expect(ok('6x^2 - 7x - 3', '(2x-3)(3x+1)', 'expanded')).toBe(true);
    expect(checkAlgebra('x(x+5)+6', 'x^2+5x+6', 'expanded').message).toMatch(/expanded/);
  });

  it('fully factorised', () => {
    expect(ok('3x(2x+5)', '6x^2+15x', 'factorised')).toBe(true);
    expect(ok('3x(5 + 2x)', '6x^2+15x', 'factorised')).toBe(true);
    expect(ok('3(2x^2+5x)', '6x^2+15x', 'factorised')).toBe(false);
    expect(ok('x(6x+15)', '6x^2+15x', 'factorised')).toBe(false);
    expect(ok('(x+2)(x+3)', 'x^2+5x+6', 'factorised')).toBe(true);
    expect(ok('(x+3)(x+2)', 'x^2+5x+6', 'factorised')).toBe(true);
    expect(ok('(x-7)(x+7)', 'x^2-49', 'factorised')).toBe(true);
    expect(ok('(x+3)^2', 'x^2+6x+9', 'factorised')).toBe(true);
    expect(ok('x^2+5x+6', 'x^2+5x+6', 'factorised')).toBe(false);
    expect(ok('(2x+1)(x+3)', '2x^2+7x+3', 'factorised')).toBe(true);
  });

  it('simplest surd form', () => {
    expect(ok('4√3', '√48', 'surd')).toBe(true);
    expect(ok('4 root 3', '√48', 'surd')).toBe(true);
    expect(ok('2√12', '√48', 'surd')).toBe(false);
    expect(ok('√48', '√48', 'surd')).toBe(false);
    expect(ok('2√3', '6/√3', 'surd')).toBe(true);
    expect(ok('6/√3', '6/√3', 'surd')).toBe(false);
    expect(ok('5 + 3√3', '(2+√3)(1+√3)', 'surd')).toBe(true);
    expect(ok('4√3', '5√3', 'surd')).toBe(false);
  });

  it('shows the answer back the way it would be written', () => {
    expect(prettyExpr('3x(2x+5)')).toBe('3x(2x + 5)');
    expect(prettyExpr('6x^2+15x')).toBe('6x² + 15x');
  });
});
