// Typed algebra: the student writes the expression themselves (with the maths keyboard) and it is marked by checking
// it is equal to the answer for many values of the letters, plus the form the question asks for (fully factorised,
// expanded and simplified, or simplest surd form). Any equivalent correct answer gets the marks.
import type { GeneratedQuestion, Generator } from '../types';
import { ri, pk, nz } from './helpers';

const G = (id: string, title: string, make: Generator['make'], tier?: Generator['tier']): Generator => ({ id, title, make, tier });
type Form = NonNullable<GeneratedQuestion['algebra']>['form'];
const A = (q: string, answer: string, form: Form, steps: string[], d: number, hints?: string[]): GeneratedQuestion => ({ q, answer, algebra: { form }, steps, d, hints });

/** a·v written properly: 1x → x, −1x → −x */
const c = (n: number, v = 'x') => (v === '' ? String(n) : n === 1 ? v : n === -1 ? `−${v}` : `${n < 0 ? '−' : ''}${Math.abs(n)}${v}`);
/** + 3x / − 3x for the second and later terms */
const t = (n: number, v = 'x') => (n === 0 ? '' : n < 0 ? ` − ${c(-n, v)}` : ` + ${c(n, v)}`);
/** typed (ASCII) version for the answer key the checker reads */
const k = (s: string) => s.replace(/−/g, '-').replace(/²/g, '^2').replace(/³/g, '^3').replace(/\s+/g, '');
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const LET = ['x', 'y', 'a', 'n'];

function expandSingle(rand: () => number): GeneratedQuestion {
  const v = pk(rand, LET);
  const a = nz(rand, -6, 9), b = nz(rand, 1, 7), cc = nz(rand, -9, 9);
  const out = rand() < 0.4 ? v : '';
  if (!out && Math.abs(a) === 1) return expandSingle(rand);
  const outer = out ? `${c(a, v)}` : String(a);
  const inner = `${c(b, v)}${t(cc, '')}`;
  const res = out ? `${c(a * b, `${v}²`)}${t(a * cc, v)}` : `${c(a * b, v)}${t(a * cc, '')}`;
  const shown = a < 0 ? `−${out ? c(-a, v) : -a}(${inner})` : `${outer}(${inner})`;
  return A(`Expand and simplify **${shown}**`, k(res), 'expanded', [`Multiply everything inside the bracket by ${a < 0 ? `−${out ? c(-a, v) : -a}` : outer}.`, `= ${res}`], 1, ['Multiply the term outside by EACH term inside – watch the signs.']);
}

function expandTwoBrackets(rand: () => number): GeneratedQuestion {
  // a(x + b) + c(x + d), simplify
  const a = nz(rand, 2, 6), b = nz(rand, -7, 7), cc = nz(rand, -5, 5), d = nz(rand, -7, 7);
  const xs = a + cc, n = a * b + cc * d;
  if (xs === 0) return expandTwoBrackets(rand);
  const res = `${c(xs)}${t(n, '')}`;
  const second = cc < 0 ? ` − ${-cc === 1 ? '' : -cc}(x${t(d, '')})` : ` + ${cc === 1 ? '' : cc}(x${t(d, '')})`;
  return A(`Expand and simplify **${a}(x${t(b, '')})${second}**`, k(res), 'expanded', [`${a}(x${t(b, '')}) = ${c(a)}${t(a * b, '')}`, `${cc < 0 ? '−' : ''}${Math.abs(cc)}(x${t(d, '')}) = ${c(cc)}${t(cc * d, '')}`, `Collect like terms: ${res}`], 2, ['Expand each bracket, then collect the x terms and the number terms.']);
}

function expandDouble(rand: () => number): GeneratedQuestion {
  const hard = rand() < 0.35;
  const p = hard ? ri(rand, 2, 3) : 1, a = nz(rand, -8, 8), q = hard && rand() < 0.5 ? ri(rand, 2, 3) : 1, b = nz(rand, -8, 8);
  const sq = rand() < 0.2 && !hard;
  const B = sq ? a : b, Q = sq ? p : q;
  const x2 = p * Q, x1 = p * B + a * Q, x0 = a * B;
  const br = (m: number, n: number) => `(${c(m)}${t(n, '')})`;
  const shown = sq ? `${br(p, a)}²` : `${br(p, a)}${br(Q, B)}`;
  const res = `${c(x2, 'x²')}${t(x1)}${t(x0, '')}`;
  return A(`Expand and simplify **${shown}**`, k(res), 'expanded', [sq ? `${shown} means ${br(p, a)}${br(p, a)}` : 'Multiply each term in the first bracket by each term in the second (FOIL).', `= ${c(x2, 'x²')}${t(p * B)}${t(a * Q)}${t(x0, '')}`, `= ${res}`], hard ? 3 : 2, sq ? ['A square bracket means the bracket times itself – not just squaring each term.'] : ['Four multiplications: First, Outside, Inside, Last.']);
}

function factoriseCommon(rand: () => number): GeneratedQuestion {
  const v = pk(rand, LET);
  const g = ri(rand, 2, 6), useV = rand() < 0.55;
  let m = nz(rand, 1, 7), n = nz(rand, -9, 9);
  if (gcd(m, n) !== 1) { m = 1; }
  const outer = useV ? c(g, v) : String(g);
  // expression: g·v·(m v + n) or g(m v + n)
  const e = useV ? `${c(g * m, `${v}²`)}${t(g * n, v)}` : `${c(g * m, v)}${t(g * n, '')}`;
  const inner = `${c(m, v)}${t(n, '')}`;
  return A(`Factorise fully **${e}**`, k(`${outer}(${inner})`), 'factorised', [`The highest common factor is ${outer}.`, `${e} = ${outer}(${inner})`], 2, ['Find the biggest number AND letter that go into every term.']);
}

function factoriseQuad(rand: () => number): GeneratedQuestion {
  const p = nz(rand, -9, 9), q = nz(rand, -9, 9);
  const b = p + q, cc = p * q;
  if (b === 0) return factoriseQuad(rand);
  const e = `x²${t(b)}${t(cc, '')}`;
  const f1 = `(x${t(p, '')})`, f2 = `(x${t(q, '')})`;
  return A(`Factorise **${e}**`, k(`${f1}${f2}`), 'factorised', [`Find two numbers that multiply to ${cc} and add to ${b}: ${p} and ${q}.`, `${e} = ${f1}${f2}`], 2, [`Which two numbers multiply to make ${cc} and add to make ${b}?`]);
}

function factoriseDots(rand: () => number): GeneratedQuestion {
  const a = ri(rand, 1, 3), b = ri(rand, 1, 12);
  const v = pk(rand, ['x', 'y']);
  if (gcd(a, b) !== 1) return factoriseDots(rand);
  const e = `${c(a * a, `${v}²`)} − ${b * b}`;
  const term = c(a, v);
  return A(`Factorise **${e}**`, k(`(${term} + ${b})(${term} − ${b})`), 'factorised', [`This is the difference of two squares: (${term})² − ${b}²`, `= (${term} + ${b})(${term} − ${b})`], 3, ['a² − b² = (a + b)(a − b)']);
}

function factoriseHardQuad(rand: () => number): GeneratedQuestion {
  const a = ri(rand, 2, 3), p = nz(rand, -5, 5), q = nz(rand, -6, 6);
  // (a x + p)(x + q) = a x² + (a q + p) x + p q, with gcd(a, p) = 1 so it is fully factorised
  if (gcd(a, p) !== 1) return factoriseHardQuad(rand);
  const b = a * q + p, cc = p * q;
  if (b === 0) return factoriseHardQuad(rand);
  const e = `${a}x²${t(b)}${t(cc, '')}`;
  return A(`Factorise **${e}**`, k(`(${a}x${t(p, '')})(x${t(q, '')})`), 'factorised', [`Look for numbers multiplying to ${a} × ${cc} = ${a * cc} and adding to ${b}.`, `${e} = (${a}x${t(p, '')})(x${t(q, '')})`], 4, ['Split the middle term, then factorise in pairs.']);
}

function simplifyCollect(rand: () => number): GeneratedQuestion {
  const [u, w] = pk(rand, [['x', 'y'], ['a', 'b'], ['m', 'n']]);
  const a = nz(rand, -6, 9), b = nz(rand, -6, 9), cc = nz(rand, -6, 9), d = nz(rand, -6, 9);
  const xs = a + cc, ys = b + d;
  if (xs === 0 || ys === 0) return simplifyCollect(rand);
  const e = `${c(a, u)}${t(b, w)}${t(cc, u)}${t(d, w)}`;
  const res = `${c(xs, u)}${t(ys, w)}`;
  return A(`Simplify **${e}**`, k(res), 'expanded', [`Collect the ${u} terms: ${a} + ${cc} = ${xs}`, `Collect the ${w} terms: ${b} + ${d} = ${ys}`, `= ${res}`], 1, ['Only like terms (the same letter) can be added together.']);
}

function simplifyIndices(rand: () => number): GeneratedQuestion {
  const v = pk(rand, ['x', 'a', 'y']);
  const kind = pk(rand, ['mul', 'div', 'pow'] as const);
  const sup = (n: number) => String(n).split('').map((ch) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(ch)]).join('');
  if (kind === 'mul') {
    const a = ri(rand, 2, 6), b = ri(rand, 2, 5), m = ri(rand, 2, 6), n = ri(rand, 2, 6);
    return A(`Simplify **${a}${v}${sup(m)} × ${b}${v}${sup(n)}**`, `${a * b}${v}^${m + n}`, 'expanded', ['Multiply the numbers, ADD the powers.', `${a} × ${b} = ${a * b}; ${m} + ${n} = ${m + n}`, `= ${a * b}${v}${sup(m + n)}`], 2);
  }
  if (kind === 'div') {
    const b = ri(rand, 2, 5), a = b * ri(rand, 2, 5), n = ri(rand, 2, 5), m = n + ri(rand, 1, 6);
    return A(`Simplify **${a}${v}${sup(m)} ÷ ${b}${v}${sup(n)}**`, `${a / b}${v}^${m - n}`, 'expanded', ['Divide the numbers, SUBTRACT the powers.', `${a} ÷ ${b} = ${a / b}; ${m} − ${n} = ${m - n}`, `= ${a / b}${v}${m - n === 1 ? '' : sup(m - n)}`], 2);
  }
  const a = ri(rand, 2, 4), m = ri(rand, 2, 5), p = ri(rand, 2, 3);
  return A(`Simplify **(${a}${v}${sup(m)})${sup(p)}**`, `${a ** p}${v}^${m * p}`, 'expanded', ['Raise the number to the power, MULTIPLY the powers.', `${a}${sup(p)} = ${a ** p}; ${m} × ${p} = ${m * p}`, `= ${a ** p}${v}${sup(m * p)}`], 3, ['Everything inside the bracket is raised to the power – including the number.']);
}

function surdSimplify(rand: () => number): GeneratedQuestion {
  const kind = pk(rand, ['root', 'add', 'rationalise', 'expand'] as const);
  const base = pk(rand, [2, 3, 5, 6, 7]);
  if (kind === 'root') {
    const m = ri(rand, 2, 6);
    return A(`Write **√${m * m * base}** in the form a√b, where b is as small as possible.`, `${m}√${base}`, 'surd', [`${m * m * base} = ${m * m} × ${base}`, `√${m * m * base} = √${m * m} × √${base} = ${m}√${base}`], 3, ['Look for the biggest square number that is a factor.']);
  }
  if (kind === 'add') {
    const p = ri(rand, 1, 4), q = ri(rand, 2, 5);
    return A(`Simplify **√${p * p * base} + √${q * q * base}**`, `${p + q}√${base}`, 'surd', [`√${p * p * base} = ${p === 1 ? '' : p}√${base} and √${q * q * base} = ${q}√${base}`, `${p === 1 ? '' : p}√${base} + ${q}√${base} = ${p + q}√${base}`], 4, ['Simplify each surd first so they have the same number under the root.']);
  }
  if (kind === 'rationalise') {
    const a = base * ri(rand, 1, 4);
    const coeff = a / base;
    return A(`Rationalise the denominator and simplify **${a}/√${base}**`, coeff === 1 ? `√${base}` : `${coeff}√${base}`, 'surd', [`Multiply top and bottom by √${base}: ${a}√${base} / ${base}`, `= ${coeff === 1 ? '' : coeff}√${base}`], 4, ['Multiply the top and the bottom by the surd on the bottom.']);
  }
  const a = ri(rand, 1, 5), b = ri(rand, 1, 4);
  // (a + √base)(b + √base) = ab + (a + b)√base + base
  const whole = a * b + base;
  return A(`Expand and simplify **(${a} + √${base})(${b} + √${base})**`, `${whole} + ${a + b}√${base}`, 'surd', ['Multiply out all four pairs.', `${a * b} + ${a}√${base} + ${b}√${base} + ${base}`, `= ${whole} + ${a + b}√${base}`], 4, [`√${base} × √${base} = ${base}`]);
}

function rearrange(rand: () => number): GeneratedQuestion {
  const kind = pk(rand, ['lin', 'div', 'sq', 'bracket'] as const);
  if (kind === 'lin') {
    const a = ri(rand, 2, 9), b = nz(rand, -12, 12);
    return A(`Make **x** the subject of **y = ${a}x${t(b, '')}**`, `(y${t(-b, '')})/${a}`, 'any', [`${b < 0 ? 'Add' : 'Subtract'} ${Math.abs(b)} on both sides: y${t(-b, '')} = ${a}x`, `Divide by ${a}: x = (y${t(-b, '')}) ÷ ${a}`], 2, ['Undo the operations in reverse order.']);
  }
  if (kind === 'div') {
    const a = ri(rand, 2, 6), b = ri(rand, 1, 9);
    return A(`Make **x** the subject of **y = x/${a} + ${b}**`, `${a}(y − ${b})`, 'any', [`Subtract ${b}: y − ${b} = x/${a}`, `Multiply by ${a}: x = ${a}(y − ${b})`], 2);
  }
  if (kind === 'sq') {
    const a = ri(rand, 2, 5);
    return A(`Make **r** the subject of **A = ${a}r²**`, `√(A/${a})`, 'any', [`Divide by ${a}: r² = A/${a}`, `Square root: r = √(A/${a})`], 3, ['Undo the square last, with a square root.']);
  }
  const a = ri(rand, 2, 6), b = ri(rand, 1, 8);
  return A(`Make **x** the subject of **y = ${a}(x + ${b})**`, `y/${a} − ${b}`, 'any', [`Divide by ${a}: y/${a} = x + ${b}`, `Subtract ${b}: x = y/${a} − ${b}`], 2);
}

function nthTerm(rand: () => number): GeneratedQuestion {
  const d = nz(rand, -5, 8), a = ri(rand, -6, 12);
  const terms = [0, 1, 2, 3, 4].map((i) => a + d * i);
  const c0 = a - d;
  const res = `${c(d, 'n')}${t(c0, '')}`;
  return A(`Find an expression for the **nth term** of the sequence: ${terms.join(', ').replace(/-/g, '−')}, …`, k(res), 'any', [`The terms go up by ${d} each time, so start with ${c(d, 'n')}.`, `${c(d, 'n')} when n = 1 gives ${d}; the first term is ${a}, so adjust by ${c0 >= 0 ? '+' : '−'}${Math.abs(c0)}.`, `nth term = ${res}`], 2, ['The difference between terms tells you the number in front of n.']);
}

function formExpression(rand: () => number): GeneratedQuestion {
  const kind = pk(rand, ['perim', 'cost', 'age'] as const);
  if (kind === 'perim') {
    const a = ri(rand, 2, 5), b = ri(rand, 1, 9);
    return A(`A rectangle has length **${a}x + ${b}** cm and width **x** cm. Write an expression, in its simplest form, for its **perimeter**.`, `${2 * a + 2}x + ${2 * b}`, 'expanded', ['Perimeter = 2 × length + 2 × width', `= 2(${a}x + ${b}) + 2x = ${2 * a}x + ${2 * b} + 2x`, `= ${2 * a + 2}x + ${2 * b}`], 2);
  }
  if (kind === 'cost') {
    const p = ri(rand, 2, 9), q = ri(rand, 2, 6);
    return A(`Pens cost **p** pence each and rulers cost **r** pence each. Write an expression for the cost, in pence, of **${p} pens and ${q} rulers**.`, `${p}p + ${q}r`, 'expanded', [`${p} pens cost ${p}p and ${q} rulers cost ${q}r.`, `Total = ${p}p + ${q}r`], 1);
  }
  const a = ri(rand, 2, 9), m = ri(rand, 2, 4);
  return A(`Sam is **x** years old. Ali is **${a} years older** than Sam, and Jo is **${m} times as old as Ali**. Write an expression for Jo's age, as simply as possible.`, `${m}x + ${m * a}`, 'any', [`Ali = x + ${a}`, `Jo = ${m}(x + ${a}) = ${m}x + ${m * a}`], 2);
}

export const ALGEBRA_GENERATORS: Generator[] = [
  G('al-expand', 'Typed algebra: expanding a bracket', (rr) => expandSingle(rr)),
  G('al-expand-two', 'Typed algebra: expand two brackets and simplify', (rr) => expandTwoBrackets(rr)),
  G('al-expand-double', 'Typed algebra: double brackets', (rr) => expandDouble(rr)),
  G('al-factorise', 'Typed algebra: factorising', (rr) => factoriseCommon(rr)),
  G('al-factorise-quad', 'Typed algebra: factorising quadratics', (rr) => factoriseQuad(rr)),
  G('al-dots', 'Typed algebra: difference of two squares', (rr) => factoriseDots(rr)),
  G('al-factorise-hard', 'Typed algebra: harder quadratics', (rr) => factoriseHardQuad(rr), 'H'),
  G('al-collect', 'Typed algebra: collecting like terms', (rr) => simplifyCollect(rr)),
  G('al-indices', 'Typed algebra: laws of indices', (rr) => simplifyIndices(rr)),
  G('al-surds', 'Typed algebra: surds', (rr) => surdSimplify(rr), 'H'),
  G('al-rearrange', 'Typed algebra: changing the subject', (rr) => rearrange(rr)),
  G('al-nth', 'Typed algebra: nth term', (rr) => nthTerm(rr)),
  G('al-form', 'Typed algebra: writing expressions', (rr) => formExpression(rr)),
];

export const ALGEBRA_TOPICS: Record<string, string[]> = {
  'm-alg-basics': ['al-expand', 'al-expand-two', 'al-factorise', 'al-collect', 'al-form'],
  'm-alg-quad-expand': ['al-expand-double', 'al-factorise-quad', 'al-dots', 'al-factorise-hard'],
  'm-alg-quadratics': ['al-factorise-quad'],
  'm-alg-rearrange': ['al-rearrange'],
  'm-alg-sequences': ['al-nth'],
  'm-num-indices': ['al-indices'],
  'm-num-surds': ['al-surds'],
};
