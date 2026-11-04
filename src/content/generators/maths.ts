import type { Generator } from '../types';
import { gcd } from '../../lib/util';
import { ri, pk, nz, r, f, sf, sgn, coef, term, frac, fstr, facc, options, primeFactors, money, comma, sup } from './helpers';

const G = (id: string, title: string, make: Generator['make'], tier?: Generator['tier']): Generator => ({ id, title, make, tier });

export const MATHS_GENERATORS: Generator[] = [
  // ---------------- NUMBER ----------------
  G('m-bidmas', 'Order of operations', (rand, lvl) => {
    const a = ri(rand, 2, 12), b = ri(rand, 2, 9), c = ri(rand, 2, 9), d = ri(rand, 1, 20);
    const forms = [
      { q: `${a} + ${b} × ${c}`, v: a + b * c, s: [`Multiplication before addition: ${b} × ${c} = ${b * c}`, `${a} + ${b * c} = ${a + b * c}`] },
      { q: `(${a} + ${b}) × ${c} − ${d}`, v: (a + b) * c - d, s: [`Brackets first: ${a} + ${b} = ${a + b}`, `Then multiply: ${a + b} × ${c} = ${(a + b) * c}`, `Then subtract: ${(a + b) * c} − ${d} = ${(a + b) * c - d}`] },
      { q: `${a}² − ${b} × ${c}`, v: a * a - b * c, s: [`Indices: ${a}² = ${a * a}`, `Multiply: ${b} × ${c} = ${b * c}`, `${a * a} − ${b * c} = ${a * a - b * c}`] },
      { q: `${a * c} ÷ ${c} + ${b}²`, v: a + b * b, s: [`Indices: ${b}² = ${b * b}`, `Divide: ${a * c} ÷ ${c} = ${a}`, `${a} + ${b * b} = ${a + b * b}`] },
    ];
    const fm = forms[Math.min(forms.length - 1, Math.floor(rand() * Math.min(forms.length, lvl + 1)))];
    return { q: `Work out **${fm.q}**`, answer: fm.v, steps: [...fm.s, 'Remember BIDMAS: Brackets, Indices, Division/Multiplication (left to right), Addition/Subtraction (left to right).'], hints: ['Which operation comes first in BIDMAS?'], d: Math.min(3, lvl) };
  }),
  G('m-negatives', 'Negative numbers', (rand, lvl) => {
    const a = nz(rand, -12, 12), b = nz(rand, -12, 12);
    const op = pk(rand, lvl <= 1 ? ['+', '−'] : ['+', '−', '×', '÷']);
    let v = 0; let q = ''; const steps: string[] = [];
    if (op === '+') { v = a + b; q = `${a} + (${b})`; steps.push(b < 0 ? `Adding a negative is the same as subtracting: ${a} − ${-b}` : `Count on ${b} from ${a}`); }
    if (op === '−') { v = a - b; q = `${a} − (${b})`; steps.push(b < 0 ? `Subtracting a negative is the same as adding: ${a} + ${-b}` : `Count back ${b} from ${a}`); }
    if (op === '×') { v = a * b; q = `${a} × (${b})`; steps.push(`${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)}`, `Signs: ${(a < 0) === (b < 0) ? 'same signs → positive' : 'different signs → negative'}`); }
    if (op === '÷') { const p = a * b; v = a; q = `${p} ÷ (${b})`; steps.push(`${Math.abs(p)} ÷ ${Math.abs(b)} = ${Math.abs(a)}`, `Signs: ${(p < 0) === (b < 0) ? 'same signs → positive' : 'different signs → negative'}`); }
    steps.push(`Answer: ${v}`);
    return { q: `Work out **${q}**`, answer: v, steps, d: Math.min(2, lvl) };
  }),
  G('m-frac-add', 'Adding & subtracting fractions', (rand, lvl) => {
    const d1 = ri(rand, 2, 9), d2 = ri(rand, 2, 9), n1 = ri(rand, 1, d1 - 1 || 1), n2 = ri(rand, 1, d2 - 1 || 1);
    const sub = lvl >= 3 && rand() < 0.5;
    const lcm = (d1 * d2) / gcd(d1, d2);
    const a = n1 * (lcm / d1), b = n2 * (lcm / d2);
    const res = frac(sub ? a - b : a + b, lcm);
    return {
      q: `Work out **${n1}/${d1} ${sub ? '−' : '+'} ${n2}/${d2}**. Give your answer as a fraction in its simplest form.`,
      answer: fstr(res), accept: facc(res),
      steps: [`Common denominator: LCM of ${d1} and ${d2} is ${lcm}`, `${n1}/${d1} = ${a}/${lcm} and ${n2}/${d2} = ${b}/${lcm}`, `${a} ${sub ? '−' : '+'} ${b} = ${sub ? a - b : a + b}, so ${sub ? a - b : a + b}/${lcm}`, `Simplify: ${fstr(res)}`],
      hints: ['You can only add/subtract fractions with the SAME denominator.', `Find a number both ${d1} and ${d2} go into.`], d: 2,
    };
  }),
  G('m-frac-mul', 'Multiplying & dividing fractions', (rand) => {
    const d1 = ri(rand, 2, 9), d2 = ri(rand, 2, 9), n1 = ri(rand, 1, 8), n2 = ri(rand, 1, 8);
    const div = rand() < 0.5;
    const res = div ? frac(n1 * d2, d1 * n2) : frac(n1 * n2, d1 * d2);
    return {
      q: `Work out **${n1}/${d1} ${div ? '÷' : '×'} ${n2}/${d2}**. Give your answer in its simplest form.`,
      answer: fstr(res), accept: facc(res),
      steps: div
        ? [`Keep, Change, Flip: ${n1}/${d1} × ${d2}/${n2}`, `Multiply tops and bottoms: ${n1 * d2}/${d1 * n2}`, `Simplify: ${fstr(res)}`]
        : [`Multiply numerators: ${n1} × ${n2} = ${n1 * n2}`, `Multiply denominators: ${d1} × ${d2} = ${d1 * d2}`, `Simplify ${n1 * n2}/${d1 * d2} = ${fstr(res)}`],
      hints: [div ? 'Dividing by a fraction = multiplying by its reciprocal (flip it).' : 'Multiply the tops, multiply the bottoms.'], d: 2,
    };
  }),
  G('m-frac-of', 'Fraction of an amount', (rand) => {
    const d = ri(rand, 2, 9), n = ri(rand, 1, d - 1), unit = ri(rand, 3, 40), amt = d * unit;
    return { q: `Find **${n}/${d} of ${amt}**.`, answer: n * unit, steps: [`Divide by the denominator: ${amt} ÷ ${d} = ${unit}`, `Multiply by the numerator: ${unit} × ${n} = ${n * unit}`], hints: ['Divide by the bottom, times by the top.'], d: 1 };
  }),
  G('m-pct-of', 'Percentage of an amount', (rand, lvl) => {
    const p = lvl <= 2 ? pk(rand, [10, 20, 25, 50, 75, 5, 15, 30]) : pk(rand, [12, 17.5, 35, 62, 8, 3.5, 115]);
    const amt = lvl <= 2 ? ri(rand, 2, 40) * 10 : ri(rand, 20, 900);
    const v = r((p / 100) * amt, 2);
    return { q: `Work out **${p}% of ${amt}**.`, answer: v, steps: [`${p}% = ${p}/100 = ${p / 100}`, `${p / 100} × ${amt} = ${v}`], hints: ['Find 1% (divide by 100) or 10% first and build up, or multiply by the decimal.'], d: lvl <= 2 ? 1 : 2 };
  }),
  G('m-pct-change', 'Percentage increase & decrease', (rand, lvl) => {
    const p = pk(rand, [5, 10, 12, 15, 20, 25, 30, 35, 40]);
    const amt = ri(rand, 4, 80) * 5;
    const up = rand() < 0.5;
    const m = up ? 1 + p / 100 : 1 - p / 100;
    const v = r(amt * m, 2);
    return {
      q: `${up ? 'Increase' : 'Decrease'} **£${amt}** by **${p}%**.`, answer: v, unit: '£',
      steps: [`Multiplier = 1 ${up ? '+' : '−'} ${p / 100} = ${r(m, 2)}`, `£${amt} × ${r(m, 2)} = £${f(v)}`],
      hints: ['Use a multiplier: increase by 15% → × 1.15, decrease by 15% → × 0.85.'], d: Math.min(3, lvl),
    };
  }),
  G('m-pct-diff', 'Percentage change between values', (rand) => {
    const old = ri(rand, 20, 400);
    const pct = pk(rand, [-40, -25, -20, -15, -10, 5, 10, 12, 20, 25, 30, 50]);
    const nw = r(old * (1 + pct / 100), 2);
    return {
      q: `A price changes from £${old} to £${f(nw)}. Work out the **percentage change**. (Use − for a decrease.)`, answer: pct, unit: '%', tol: 0.05,
      steps: [`Change = new − original = ${f(nw)} − ${old} = ${f(nw - old)}`, `Percentage change = change ÷ original × 100 = ${f(nw - old)} ÷ ${old} × 100 = ${pct}%`],
      hints: ['Percentage change = (change ÷ ORIGINAL) × 100.'], d: 3,
    };
  }),
  G('m-reverse-pct', 'Reverse percentages', (rand) => {
    const orig = ri(rand, 4, 60) * 10, p = pk(rand, [10, 15, 20, 25, 30, 40]);
    const up = rand() < 0.5;
    const nw = r(orig * (up ? 1 + p / 100 : 1 - p / 100), 2);
    return {
      q: `After a ${p}% ${up ? 'increase' : 'reduction'}, a price is **£${f(nw)}**. What was the original price?`, answer: orig, unit: '£',
      steps: [`£${f(nw)} represents ${up ? 100 + p : 100 - p}% of the original`, `Multiplier = ${r(up ? 1 + p / 100 : 1 - p / 100, 2)}`, `Original = ${f(nw)} ÷ ${r(up ? 1 + p / 100 : 1 - p / 100, 2)} = £${orig}`],
      hints: ['Do NOT take the percentage off the new price - the percentage is of the ORIGINAL.', 'Divide by the multiplier.'], d: 4,
    };
  }),
  G('m-compound', 'Compound interest & depreciation', (rand, lvl) => {
    const P = ri(rand, 5, 50) * 100, rate = pk(rand, [2, 3, 4, 5, 8, 10, 12, 15]), n = ri(rand, 2, lvl >= 4 ? 8 : 4);
    const dep = rand() < 0.4;
    const m = dep ? 1 - rate / 100 : 1 + rate / 100;
    const v = r(P * m ** n, 2);
    return {
      q: dep ? `A car worth **£${comma(P)}** depreciates by **${rate}%** per year. Find its value after **${n} years**, to the nearest penny.` : `£${comma(P)} is invested at **${rate}%** compound interest per year. Find the total after **${n} years**, to the nearest penny.`,
      answer: v, unit: '£', tol: 0.011,
      steps: [`Multiplier = ${r(m, 2)}`, `Value = ${P} × ${r(m, 2)}^${n}`, `= £${v.toFixed(2)}`],
      hints: ['Compound: multiply by the multiplier once for every year: × multiplierⁿ.'], d: 3,
    };
  }),
  G('m-hcf-lcm', 'HCF and LCM', (rand) => {
    const g = pk(rand, [2, 3, 4, 5, 6, 8, 12]);
    let a = g * ri(rand, 2, 9), b = g * ri(rand, 2, 9);
    if (a === b) b += g;
    const h = gcd(a, b), l = (a * b) / h;
    const isH = rand() < 0.5;
    return {
      q: `Find the **${isH ? 'highest common factor (HCF)' : 'lowest common multiple (LCM)'}** of ${a} and ${b}.`, answer: isH ? h : l,
      steps: [`Prime factors: ${a} = ${primeFactors(a).join(' × ')}, ${b} = ${primeFactors(b).join(' × ')}`, isH ? `HCF = product of the shared prime factors = ${h}` : `LCM = HCF × (rest) = ${a} × ${b} ÷ ${h} = ${l}`],
      hints: [isH ? 'Biggest number that divides into both.' : 'Smallest number both go into - list multiples or use a Venn diagram of prime factors.'], d: 2,
    };
  }),
  G('m-prime-factors', 'Product of prime factors', (rand) => {
    const ps = [2, 2, 3, 5, 7];
    let n = 1; const used: number[] = [];
    const k = ri(rand, 3, 5);
    for (let i = 0; i < k; i++) { const p = pk(rand, ps); n *= p; used.push(p); }
    if (n < 12) n *= 6;
    const fs = primeFactors(n);
    const counts = new Map<number, number>();
    fs.forEach((p) => counts.set(p, (counts.get(p) ?? 0) + 1));
    const idx = [...counts.entries()].map(([p, c]) => (c > 1 ? `${p}^${c}` : `${p}`)).join(' × ');
    const idxSup = [...counts.entries()].map(([p, c]) => (c > 1 ? `${p}${sup(c)}` : `${p}`)).join(' × ');
    return {
      q: `Write **${n}** as a product of its prime factors. (Type e.g. 2^3 × 5 or 2×2×2×5)`, answer: idx,
      accept: [idx, fs.join(' × '), idx.replace(/ × /g, 'x'), fs.join('x'), idxSup],
      steps: [`Use a factor tree: keep dividing by primes (2, 3, 5, 7...)`, `${n} = ${fs.join(' × ')}`, `In index form: ${idxSup}`],
      hints: ['Start by dividing by 2 as many times as you can, then 3, then 5...'], d: 2,
    };
  }),
  G('m-standard-form', 'Standard form', (rand, lvl) => {
    const mant = r(ri(rand, 11, 99) / 10, 1), pw = nz(rand, -6, 8);
    const val = mant * 10 ** pw;
    if (lvl <= 2) {
      const ord = pw >= 0 ? comma(r(val, 0)) : val.toFixed(-pw + 1).replace(/0+$/, '');
      return { q: `Write **${ord}** in standard form. (Type e.g. 3.2 x 10^5)`, answer: `${mant} x 10^${pw}`, accept: [`${mant}x10^${pw}`, `${mant}×10^${pw}`, `${mant} × 10^${pw}`, `${mant}*10^${pw}`, `${mant}e${pw}`], steps: [`Move the decimal point so there is one non-zero digit before it: ${mant}`, `It moved ${Math.abs(pw)} places ${pw >= 0 ? 'left (big number → positive power)' : 'right (small number → negative power)'}`, `${mant} × 10${sup(pw)}`], hints: ['Standard form is A × 10ⁿ where 1 ≤ A < 10.'], d: 2 };
    }
    const a = r(ri(rand, 11, 50) / 10, 1), b = r(ri(rand, 11, 50) / 10, 1), p1 = ri(rand, 2, 6), p2 = ri(rand, 2, 6);
    const prod = a * b * 10 ** (p1 + p2);
    return { q: `Work out **(${a} × 10${sup(p1)}) × (${b} × 10${sup(p2)})**. Give the ordinary number or standard form.`, answer: prod, tol: Math.abs(prod) * 1e-6, steps: [`Multiply the numbers: ${a} × ${b} = ${r(a * b, 4)}`, `Add the powers: 10${sup(p1)} × 10${sup(p2)} = 10${sup(p1 + p2)}`, `${r(a * b, 4)} × 10${sup(p1 + p2)}${a * b >= 10 ? ` = ${r((a * b) / 10, 4)} × 10${sup(p1 + p2 + 1)}` : ''}`], hints: ['Multiply the front numbers, add the powers of 10, then make sure the front number is between 1 and 10.'], d: 3 };
  }),
  G('m-rounding', 'Rounding (dp & sf)', (rand) => {
    const x = r(rand() * 10 ** ri(rand, 0, 4) + rand(), 5);
    const useSf = rand() < 0.5, n = ri(rand, 1, 3);
    const v = useSf ? sf(x, n) : r(x, n);
    return { q: `Round **${x}** to **${n} ${useSf ? 'significant figure' : 'decimal place'}${n > 1 ? 's' : ''}**.`, answer: r(v, 6), tol: 1e-9, steps: [useSf ? `Count ${n} significant figures from the first non-zero digit.` : `Count ${n} digits after the decimal point.`, 'Look at the next digit: 5 or more → round up, 4 or less → round down.', `Answer: ${r(v, 6)}`], d: 1 };
  }),
  G('m-bounds', 'Upper & lower bounds', (rand) => {
    const unit = pk(rand, [1, 0.1, 10, 0.5]);
    const x = unit === 0.1 ? r(ri(rand, 20, 99) / 10, 1) : unit === 10 ? ri(rand, 5, 90) * 10 : unit === 0.5 ? ri(rand, 4, 30) + 0.5 : ri(rand, 5, 90);
    const label = unit === 1 ? 'nearest whole number' : unit === 0.1 ? '1 decimal place' : unit === 10 ? 'nearest 10' : 'nearest 0.5';
    const upper = rand() < 0.5;
    const v = r(x + (upper ? unit / 2 : -unit / 2), 4);
    return { q: `A length is **${x} cm** to the ${label}. Write down the **${upper ? 'upper' : 'lower'} bound**.`, answer: v, unit: 'cm', steps: [`Half the unit of rounding: ${unit} ÷ 2 = ${unit / 2}`, `${upper ? 'Upper' : 'Lower'} bound = ${x} ${upper ? '+' : '−'} ${unit / 2} = ${v}`], hints: ['Bounds are half a unit either side.'], d: 3 };
  }, 'H'),
  G('m-indices', 'Laws of indices', (rand, lvl) => {
    const a = ri(rand, 2, 9), b = ri(rand, 2, 9);
    const t = pk(rand, lvl >= 3 ? ['mul', 'div', 'pow', 'neg', 'frac'] : ['mul', 'div', 'pow']);
    if (t === 'mul') return { q: `Simplify **x${sup(a)} × x${sup(b)}**. What is the power?`, answer: a + b, steps: [`Multiplying → ADD the powers: ${a} + ${b} = ${a + b}`, `x${sup(a + b)}`], d: 1 };
    if (t === 'div') return { q: `Simplify **x${sup(a + b)} ÷ x${sup(b)}**. What is the power?`, answer: a, steps: [`Dividing → SUBTRACT the powers: ${a + b} − ${b} = ${a}`], d: 1 };
    if (t === 'pow') return { q: `Simplify **(x${sup(a)})${sup(b)}**. What is the power?`, answer: a * b, steps: [`Power of a power → MULTIPLY: ${a} × ${b} = ${a * b}`], d: 2 };
    if (t === 'neg') { const base = ri(rand, 2, 5), p = ri(rand, 1, 3); const res = frac(1, base ** p); return { q: `Evaluate **${base}${sup(-p)}** as a fraction.`, answer: fstr(res), accept: facc(res), steps: [`A negative power means reciprocal: ${base}${sup(-p)} = 1/${base}${sup(p)}`, `= 1/${base ** p}`], d: 3 }; }
    const root = pk(rand, [4, 8, 9, 16, 25, 27, 64, 81, 125]);
    const n = [4, 9, 16, 25, 81].includes(root) ? 2 : 3;
    const base = Math.round(root ** (1 / n));
    return { q: `Evaluate **${root}^(1/${n})** (that is ${root} to the power 1/${n}).`, answer: base, steps: [`Power 1/${n} means the ${n === 2 ? 'square' : 'cube'} root`, `${n === 2 ? '√' : '∛'}${root} = ${base}`], d: 4 };
  }),
  G('m-surds', 'Simplifying surds', (rand) => {
    const sq = pk(rand, [4, 9, 16, 25, 36]), rest = pk(rand, [2, 3, 5, 6, 7]);
    const n = sq * rest, k = Math.sqrt(sq);
    return { q: `Simplify **√${n}** fully. (Type e.g. 3√2 as 3√2 or 3root2)`, answer: `${k}√${rest}`, accept: [`${k}√${rest}`, `${k}root${rest}`, `${k} root ${rest}`, `${k}sqrt${rest}`, `${k}sqrt(${rest})`], steps: [`Find the largest square factor of ${n}: ${sq}`, `√${n} = √${sq} × √${rest} = ${k}√${rest}`], hints: ['Look for square numbers (4, 9, 16, 25, 36...) that divide into it.'], d: 4 };
  }, 'H'),
  // ---------------- ALGEBRA ----------------
  G('m-substitute', 'Substitution', (rand, lvl) => {
    const a = nz(rand, -5, 6), b = nz(rand, -5, 6), p = ri(rand, 2, 5), q = nz(rand, -4, 6);
    const forms = [
      { e: `${p}a + ${q < 0 ? `(${q})` : q}b`, v: p * a + q * b },
      { e: `a² + ${p}b`, v: a * a + p * b },
      { e: `${p}a² − b`, v: p * a * a - b },
      { e: `ab + ${p}`, v: a * b + p },
    ];
    const fm = forms[Math.floor(rand() * Math.min(forms.length, lvl + 1))];
    return { q: `If **a = ${a}** and **b = ${b}**, work out **${fm.e}**.`, answer: fm.v, steps: [`Replace a with (${a}) and b with (${b}) - use brackets for negatives`, `Answer = ${fm.v}`], hints: ['Put negative numbers in brackets, e.g. (−3)² = 9.'], d: Math.min(3, lvl) };
  }),
  G('m-expand', 'Expanding single brackets', (rand) => {
    const a = nz(rand, -6, 7), b = nz(rand, 1, 9), c = nz(rand, -9, 9);
    const correct = `${coef(a * b)} ${sgn(a * c)}`.replace('+ -', '− ');
    const wrong1 = `${coef(a * b)} ${sgn(c)}`; // only multiplied first term
    const wrong2 = `${coef(a * b)} ${sgn(-a * c)}`; // sign error
    const wrong3 = `${coef(a + b)} ${sgn(a + c)}`; // added instead
    return { q: `Expand **${a}(${coef(b)} ${sgn(c)})**`, answer: correct, options: options(correct, [wrong1, wrong2, wrong3], rand), steps: [`Multiply EVERY term inside by ${a}`, `${a} × ${coef(b)} = ${coef(a * b)}`, `${a} × ${c} = ${a * c}`, `= ${correct}`], hints: ['The number outside multiplies BOTH terms inside.', 'Watch the signs: negative × negative = positive.'], d: 2 };
  }),
  G('m-expand-double', 'Expanding double brackets', (rand) => {
    const a = nz(rand, -7, 7), b = nz(rand, -7, 7);
    const s = a + b, p = a * b;
    const show = (x: number, y: number) => `x²${x === 0 ? '' : term(x)}${y === 0 ? '' : ' ' + sgn(y)}`;
    const correct = show(s, p);
    return {
      q: `Expand and simplify **(x ${sgn(a)})(x ${sgn(b)})**`, answer: correct,
      options: options(correct, [show(p, s), `x² ${sgn(p)}`, show(s, -p), show(a * b, a + b)], rand, () => show(s + nz(rand, -2, 2), p)),
      steps: [`FOIL / grid: x × x = x², x × ${b} = ${coef(b)}, ${a} × x = ${coef(a)}, ${a} × ${b} = ${p}`, `Collect the x terms: ${coef(a)} ${sgn(b)}x = ${coef(s)}`, `= ${correct}`],
      hints: ['Every term in the first bracket multiplies every term in the second (4 multiplications).'], d: 3,
    };
  }),
  G('m-factorise-quad', 'Factorising quadratics', (rand) => {
    const a = nz(rand, -8, 8), b = nz(rand, -8, 8);
    const s = a + b, p = a * b;
    const expr = `x²${s === 0 ? '' : term(s)} ${sgn(p)}`;
    const show = (x: number, y: number) => `(x ${sgn(x)})(x ${sgn(y)})`;
    const correct = show(a, b);
    return {
      q: `Factorise **${expr}**`, answer: correct,
      options: options(correct, [show(-a, -b), show(a, -b), show(s, p)], rand, () => show(a + 1, b - 1)),
      steps: [`Find two numbers that MULTIPLY to ${p} and ADD to ${s}`, `${a} and ${b}: ${a} × ${b} = ${p}, ${a} + ${b} = ${s}`, `= ${correct}`],
      hints: [`Two numbers that multiply to give ${p}...`, `...and add to give ${s}.`], d: 3,
    };
  }),
  G('m-linear-eq', 'Solving linear equations', (rand, lvl) => {
    const x = nz(rand, -9, 12), a = ri(rand, 2, 9), b = nz(rand, -15, 15);
    if (lvl <= 2) {
      const c = a * x + b;
      return { q: `Solve **${a}x ${sgn(b)} = ${c}**`, answer: x, steps: [`${b > 0 ? 'Subtract' : 'Add'} ${Math.abs(b)} both sides: ${a}x = ${c - b}`, `Divide by ${a}: x = ${x}`], hints: ['Do the inverse operation to both sides - undo the + or − first.'], d: 2 };
    }
    const c = ri(rand, 1, a - 1 > 0 ? a - 1 : 1), d = a * x + b - c * x;
    return { q: `Solve **${a}x ${sgn(b)} = ${coef(c)} ${sgn(d)}**`, answer: x, steps: [`Get x terms on one side: ${a}x − ${coef(c)} = ${a - c}x`, `Numbers on the other: ${d} − ${b} = ${d - b}`, `${a - c}x = ${d - b} → x = ${x}`], hints: ['Subtract the smaller x term from both sides first.'], d: 3 };
  }),
  G('m-sim-eq', 'Simultaneous equations', (rand) => {
    const x = nz(rand, -6, 8), y = nz(rand, -6, 8);
    const a1 = ri(rand, 1, 5), b1 = ri(rand, 1, 5), a2 = ri(rand, 1, 5), b2 = nz(rand, -5, 5);
    if (a1 * b2 === a2 * b1) return MATHS_GENERATORS.find((g) => g.id === 'm-linear-eq')!.make(rand, 3);
    const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
    return {
      q: `Solve the simultaneous equations:\n\n**${coef(a1)} ${term(b1, 'y').trim()} = ${c1}**  \n**${coef(a2)} ${term(b2, 'y').trim()} = ${c2}**\n\nWhat is the value of **x**?`,
      answer: x,
      steps: [`Make the coefficients of y the same: multiply eq1 by ${Math.abs(b2)} and eq2 by ${b1}`, `Eliminate y by ${b2 > 0 ? 'subtracting' : 'adding'} the equations`, `x = ${x}`, `Substitute back: y = ${y}`, `Check: ${a1}(${x}) + ${b1}(${y}) = ${c1} ✓`],
      hints: ['Make one letter have the same coefficient in both equations, then add or subtract to eliminate it.'], d: 4,
    };
  }),
  G('m-quad-formula', 'Quadratic formula', (rand) => {
    let a = ri(rand, 1, 4), b = nz(rand, -9, 9), c = nz(rand, -9, 9);
    if (b * b - 4 * a * c <= 0) { c = -Math.abs(c); a = Math.abs(a); }
    const disc = b * b - 4 * a * c;
    const x1 = (-b + Math.sqrt(disc)) / (2 * a), x2 = (-b - Math.sqrt(disc)) / (2 * a);
    const big = Math.max(x1, x2);
    return {
      q: `Solve **${coef(a, 'x²')}${term(b)} ${sgn(c)} = 0**. Give the **larger** solution to 2 decimal places.`, answer: r(big, 2), tol: 0.006,
      steps: [`a = ${a}, b = ${b}, c = ${c}`, `x = (−b ± √(b² − 4ac)) ÷ 2a = (${-b} ± √${disc}) ÷ ${2 * a}`, `x = ${r(x1, 2)} or x = ${r(x2, 2)}`],
      hints: ['Write down a, b and c first - including their signs.', 'Calculate b² − 4ac separately.'], d: 4,
    };
  }, 'H'),
  G('m-nth-term', 'nth term of a linear sequence', (rand) => {
    const d = nz(rand, -6, 8), c = ri(rand, -10, 12);
    const seq = [1, 2, 3, 4, 5].map((n) => d * n + c);
    const ans = `${coef(d, 'n')}${c === 0 ? '' : ' ' + sgn(c)}`;
    const alt = c === 0 ? ans : `${c} ${d < 0 ? '−' : '+'} ${coef(Math.abs(d), 'n')}`;
    return { q: `Find the **nth term** of: ${seq.join(', ')}, ...`, answer: ans, accept: [ans, ans.replace(/ /g, ''), alt, ans.replace('−', '-'), alt.replace('−', '-')], steps: [`Common difference = ${d} → ${coef(d, 'n')}`, `Compare with the ${d}n sequence: ${[1, 2, 3].map((n) => d * n).join(', ')}...`, `Adjust by ${c}: nth term = ${ans}`], hints: ['The difference between terms goes in front of n.'], d: 2 };
  }),
  G('m-gradient', 'Gradient & equation of a line', (rand, lvl) => {
    const m = nz(rand, -5, 5), c = ri(rand, -8, 8), x1 = ri(rand, -5, 2), x2 = x1 + ri(rand, 1, 6);
    const y1 = m * x1 + c, y2 = m * x2 + c;
    if (lvl <= 3) return { q: `Find the **gradient** of the line through (${x1}, ${y1}) and (${x2}, ${y2}).`, answer: m, steps: [`Gradient = change in y ÷ change in x`, `= (${y2} − ${y1}) ÷ (${x2} − ${x1}) = ${y2 - y1} ÷ ${x2 - x1} = ${m}`], hints: ['Rise over run.'], d: 2 };
    return { q: `A line passes through (${x1}, ${y1}) and (${x2}, ${y2}). Find its **y-intercept** c in y = mx + c.`, answer: c, steps: [`m = ${y2 - y1} ÷ ${x2 - x1} = ${m}`, `Substitute (${x1}, ${y1}): ${y1} = ${m}×${x1} + c`, `c = ${c}`], d: 3 };
  }),
  G('m-inequality', 'Solving inequalities', (rand) => {
    const x = nz(rand, -6, 10), a = ri(rand, 2, 7), b = nz(rand, -12, 12);
    const sym = pk(rand, ['>', '<', '≥', '≤']);
    const ascii = sym === '≥' ? '>=' : sym === '≤' ? '<=' : sym;
    return { q: `Solve **${a}x ${sgn(b)} ${sym} ${a * x + b}**. (Type e.g. x ${ascii} 3)`, answer: `x ${sym} ${x}`, accept: [`x${sym}${x}`, `x${ascii}${x}`, `x ${ascii} ${x}`], steps: [`Treat it like an equation: ${a}x ${sym} ${a * x}`, `x ${sym} ${x}`, 'Only flip the sign if you multiply or divide by a negative.'], d: 2 };
  }),
  // ---------------- RATIO & PROPORTION ----------------
  G('m-ratio-share', 'Sharing in a ratio', (rand) => {
    const a = ri(rand, 1, 7), b = ri(rand, 1, 7), part = ri(rand, 3, 25), total = (a + b) * part;
    const first = rand() < 0.5;
    return { q: `Share **£${total}** in the ratio **${a} : ${b}**. How much is the ${first ? 'first' : 'second'} share?`, answer: (first ? a : b) * part, unit: '£', steps: [`Total parts = ${a} + ${b} = ${a + b}`, `One part = ${total} ÷ ${a + b} = £${part}`, `${first ? a : b} parts = £${(first ? a : b) * part}`], hints: ['Add the ratio to find the total number of parts.'], d: 2 };
  }),
  G('m-best-buy', 'Best buy (unit price)', (rand) => {
    const g1 = pk(rand, [200, 250, 400, 500]), g2 = pk(rand, [300, 600, 750, 1000]);
    const p1 = r(ri(rand, 80, 300) / 100, 2), unit1 = p1 / g1;
    const p2 = r(unit1 * g2 * (rand() < 0.5 ? 0.9 : 1.1), 2);
    const better = p1 / g1 < p2 / g2 ? 'A' : 'B';
    return { q: `Pack A: ${g1} g for £${p1.toFixed(2)}. Pack B: ${g2} g for £${p2.toFixed(2)}. Which is **better value**?`, answer: `Pack ${better}`, options: [`Pack ${better}`, `Pack ${better === 'A' ? 'B' : 'A'}`, 'They are the same value'], steps: [`A: ${p1.toFixed(2)} ÷ ${g1} = £${(p1 / g1).toFixed(5)} per g`, `B: ${p2.toFixed(2)} ÷ ${g2} = £${(p2 / g2).toFixed(5)} per g`, `Lower cost per gram = better value: Pack ${better}`], hints: ['Find the cost of 1 g (or 100 g) for each.'], d: 2 };
  }),
  G('m-speed', 'Speed, distance, time', (rand, lvl) => {
    const s = ri(rand, 3, 14) * 5, t = pk(rand, [0.5, 1.5, 2, 2.5, 3, 0.25, 0.75]), d = s * t;
    const ask = pk(rand, ['s', 'd', 't']);
    if (ask === 's') return { q: `A car travels **${d} km** in **${t * 60} minutes**. Find its average speed in km/h.`, answer: s, unit: 'km/h', steps: [`Convert time to hours: ${t * 60} min = ${t} h`, `Speed = distance ÷ time = ${d} ÷ ${t} = ${s} km/h`], hints: ['Time must be in HOURS for km/h.'], d: Math.min(3, lvl + 1) };
    if (ask === 'd') return { q: `A cyclist rides at **${s} km/h** for **${t} hours**. How far do they go?`, answer: d, unit: 'km', steps: [`Distance = speed × time = ${s} × ${t} = ${d} km`], d: 1 };
    return { q: `How long does it take to travel **${d} km** at **${s} km/h**? Give your answer in **minutes**.`, answer: t * 60, unit: 'min', steps: [`Time = distance ÷ speed = ${d} ÷ ${s} = ${t} h`, `${t} h × 60 = ${t * 60} min`], d: 3 };
  }),
  G('m-density', 'Density, mass, volume', (rand) => {
    const dens = pk(rand, [0.8, 1.2, 2.5, 7.8, 8.9, 11.3, 19.3]), v = ri(rand, 2, 60), m = r(dens * v, 2);
    const ask = pk(rand, ['d', 'm', 'v']);
    if (ask === 'd') return { q: `An object has mass **${m} g** and volume **${v} cm³**. Find its density.`, answer: dens, unit: 'g/cm³', steps: [`Density = mass ÷ volume = ${m} ÷ ${v} = ${dens} g/cm³`], d: 2 };
    if (ask === 'm') return { q: `A metal has density **${dens} g/cm³**. Find the mass of **${v} cm³**.`, answer: m, unit: 'g', steps: [`Mass = density × volume = ${dens} × ${v} = ${m} g`], d: 2 };
    return { q: `A block of density **${dens} g/cm³** has mass **${m} g**. Find its volume.`, answer: v, unit: 'cm³', steps: [`Volume = mass ÷ density = ${m} ÷ ${dens} = ${v} cm³`], d: 2 };
  }),
  G('m-proportion', 'Direct & inverse proportion', (rand) => {
    const k = ri(rand, 2, 6), x1 = ri(rand, 2, 5), x2 = ri(rand, 3, 8);
    const t = pk(rand, ['sq', 'inv']);
    if (t === 'sq') return { q: `y is directly proportional to x². When x = ${x1}, y = ${k * x1 * x1}. Find y when **x = ${x2}**.`, answer: k * x2 * x2, steps: [`y = kx²`, `${k * x1 * x1} = k × ${x1 * x1} → k = ${k}`, `y = ${k} × ${x2}² = ${k * x2 * x2}`], hints: ['Write the formula with k, then use the given pair to find k.'], d: 4 };
    const y1 = k * 12 / x1;
    return { q: `y is inversely proportional to x. When x = ${x1}, y = ${f(y1)}. Find y when **x = ${x2}**.`, answer: r(k * 12 / x2, 3), tol: 0.01, steps: [`y = k/x`, `k = y × x = ${f(y1)} × ${x1} = ${k * 12}`, `y = ${k * 12} ÷ ${x2} = ${f(k * 12 / x2, 3)}`], d: 4 };
  }, 'H'),
  // ---------------- GEOMETRY ----------------
  G('m-area', 'Area of 2D shapes', (rand) => {
    const a = ri(rand, 3, 20), b = ri(rand, 3, 20), h = ri(rand, 2, 15);
    const shape = pk(rand, ['rectangle', 'triangle', 'parallelogram', 'trapezium']);
    if (shape === 'rectangle') return { q: `Find the area of a rectangle **${a} cm by ${b} cm**.`, answer: a * b, unit: 'cm²', steps: [`Area = length × width = ${a} × ${b} = ${a * b} cm²`], d: 1 };
    if (shape === 'triangle') return { q: `Find the area of a triangle with base **${a} cm** and perpendicular height **${h} cm**.`, answer: (a * h) / 2, unit: 'cm²', steps: [`Area = ½ × base × height = ½ × ${a} × ${h} = ${(a * h) / 2} cm²`], hints: ['Don\'t forget the ½!'], d: 1 };
    if (shape === 'parallelogram') return { q: `Find the area of a parallelogram with base **${a} cm** and perpendicular height **${h} cm**.`, answer: a * h, unit: 'cm²', steps: [`Area = base × perpendicular height = ${a} × ${h} = ${a * h} cm²`], d: 2 };
    return { q: `Find the area of a trapezium with parallel sides **${a} cm** and **${b} cm** and height **${h} cm**.`, answer: ((a + b) * h) / 2, unit: 'cm²', steps: [`Area = ½(a + b)h = ½ × (${a} + ${b}) × ${h} = ${((a + b) * h) / 2} cm²`], hints: ['Trapezium area = half the sum of the parallel sides × height (on the formula sheet? No - learn it!).'], d: 2 };
  }),
  G('m-circle', 'Circles: circumference & area', (rand) => {
    const rad = ri(rand, 2, 15);
    const useD = rand() < 0.4;
    const area = rand() < 0.5;
    const v = area ? Math.PI * rad * rad : 2 * Math.PI * rad;
    return { q: `A circle has ${useD ? `diameter **${2 * rad} cm**` : `radius **${rad} cm**`}. Find its **${area ? 'area' : 'circumference'}** to 1 decimal place.`, answer: r(v, 1), unit: area ? 'cm²' : 'cm', tol: 0.051, steps: [useD ? `Radius = diameter ÷ 2 = ${rad} cm` : `Radius = ${rad} cm`, area ? `Area = πr² = π × ${rad}² = ${r(v, 3)}` : `Circumference = 2πr (or πd) = ${r(v, 3)}`, `= ${r(v, 1)} ${area ? 'cm²' : 'cm'}`], hints: [area ? 'Area = πr² - square the RADIUS, not the diameter.' : 'Circumference = π × diameter.'], d: 2 };
  }),
  G('m-volume', 'Volume of prisms & cylinders', (rand) => {
    const t = pk(rand, ['cuboid', 'cylinder', 'tri-prism']);
    const a = ri(rand, 2, 12), b = ri(rand, 2, 12), c = ri(rand, 2, 15);
    if (t === 'cuboid') return { q: `Find the volume of a cuboid **${a} cm × ${b} cm × ${c} cm**.`, answer: a * b * c, unit: 'cm³', steps: [`V = l × w × h = ${a * b * c} cm³`], d: 1 };
    if (t === 'cylinder') { const v = Math.PI * a * a * c; return { q: `Find the volume of a cylinder with radius **${a} cm** and height **${c} cm**, to 1 dp.`, answer: r(v, 1), unit: 'cm³', tol: 0.051, steps: [`V = πr²h = π × ${a}² × ${c} = ${r(v, 3)}`, `= ${r(v, 1)} cm³`], d: 3 }; }
    return { q: `A triangular prism has a triangular cross-section with base **${a} cm** and height **${b} cm**, and length **${c} cm**. Find its volume.`, answer: (a * b * c) / 2, unit: 'cm³', steps: [`Cross-section area = ½ × ${a} × ${b} = ${(a * b) / 2} cm²`, `Volume = area × length = ${(a * b) / 2} × ${c} = ${(a * b * c) / 2} cm³`], d: 3 };
  }),
  G('m-pythag', "Pythagoras' theorem", (rand) => {
    const triples = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [7, 24, 25], [9, 12, 15]];
    const nice = rand() < 0.5;
    let a: number, b: number, c: number;
    if (nice) [a, b, c] = pk(rand, triples); else { a = ri(rand, 3, 15); b = ri(rand, 3, 15); c = Math.sqrt(a * a + b * b); }
    const short = rand() < 0.4;
    if (short) return { q: `A right-angled triangle has hypotenuse **${r(c, 2)} cm** and one side **${a} cm**. Find the other side${nice ? '' : ' to 1 dp'}.`, answer: r(b, 1), unit: 'cm', tol: 0.051, steps: [`Shorter side: b² = c² − a²`, `b² = ${r(c * c, 2)} − ${a * a} = ${r(c * c - a * a, 2)}`, `b = √${r(c * c - a * a, 2)} = ${r(b, 1)} cm`], hints: ['To find a SHORTER side, SUBTRACT.'], d: 3 };
    return { q: `A right-angled triangle has shorter sides **${a} cm** and **${b} cm**. Find the hypotenuse${nice ? '' : ' to 1 dp'}.`, answer: r(c, 1), unit: 'cm', tol: 0.051, steps: [`c² = a² + b² = ${a * a} + ${b * b} = ${a * a + b * b}`, `c = √${a * a + b * b} = ${r(c, 1)} cm`], hints: ['Hypotenuse (longest side): ADD the squares then square-root.'], d: 2 };
  }),
  G('m-trig', 'Trigonometry (SOHCAHTOA)', (rand) => {
    const ang = ri(rand, 15, 75), side = ri(rand, 4, 25);
    const rad = (ang * Math.PI) / 180;
    const t = pk(rand, ['opp-from-hyp', 'adj-from-hyp', 'opp-from-adj', 'angle']);
    if (t === 'opp-from-hyp') return { q: `In a right-angled triangle the hypotenuse is **${side} cm** and one angle is **${ang}°**. Find the side **opposite** the angle (1 dp).`, answer: r(side * Math.sin(rad), 1), unit: 'cm', tol: 0.051, steps: ['O and H → SOH: sin θ = O/H', `O = H × sin θ = ${side} × sin ${ang}° = ${r(side * Math.sin(rad), 3)}`], hints: ['Label the sides O, A, H from the angle. Which two do you have/need?'], d: 3 };
    if (t === 'adj-from-hyp') return { q: `Hypotenuse **${side} cm**, angle **${ang}°**. Find the side **adjacent** to the angle (1 dp).`, answer: r(side * Math.cos(rad), 1), unit: 'cm', tol: 0.051, steps: ['A and H → CAH: cos θ = A/H', `A = ${side} × cos ${ang}° = ${r(side * Math.cos(rad), 3)}`], d: 3 };
    if (t === 'opp-from-adj') return { q: `The side adjacent to a **${ang}°** angle is **${side} cm**. Find the opposite side (1 dp).`, answer: r(side * Math.tan(rad), 1), unit: 'cm', tol: 0.051, steps: ['O and A → TOA: tan θ = O/A', `O = ${side} × tan ${ang}° = ${r(side * Math.tan(rad), 3)}`], d: 3 };
    const o = ri(rand, 3, 15), h = o + ri(rand, 2, 12);
    const a = (Math.asin(o / h) * 180) / Math.PI;
    return { q: `A right-angled triangle has opposite side **${o} cm** and hypotenuse **${h} cm**. Find the angle (1 dp).`, answer: r(a, 1), unit: '°', tol: 0.051, steps: ['O and H → sin θ = O/H', `θ = sin⁻¹(${o}/${h}) = ${r(a, 2)}°`], hints: ['To find an ANGLE use the inverse function (shift + sin).'], d: 4 };
  }),
  G('m-angles', 'Angles in polygons', (rand) => {
    const n = pk(rand, [5, 6, 8, 9, 10, 12, 15, 18, 20]);
    const t = pk(rand, ['interior', 'exterior', 'sum', 'sides']);
    if (t === 'interior') return { q: `Find the size of **one interior angle** of a regular polygon with **${n} sides**.`, answer: r(180 - 360 / n, 2), unit: '°', steps: [`Exterior angle = 360 ÷ ${n} = ${r(360 / n, 2)}°`, `Interior = 180 − ${r(360 / n, 2)} = ${r(180 - 360 / n, 2)}°`], d: 3 };
    if (t === 'exterior') return { q: `Find the **exterior angle** of a regular ${n}-sided polygon.`, answer: r(360 / n, 2), unit: '°', steps: [`Exterior angles add to 360°: 360 ÷ ${n} = ${r(360 / n, 2)}°`], d: 2 };
    if (t === 'sum') return { q: `Find the **sum of the interior angles** of a polygon with **${n} sides**.`, answer: (n - 2) * 180, unit: '°', steps: [`Sum = (n − 2) × 180 = ${n - 2} × 180 = ${(n - 2) * 180}°`], d: 2 };
    return { q: `Each exterior angle of a regular polygon is **${r(360 / n, 2)}°**. How many sides does it have?`, answer: n, steps: [`n = 360 ÷ exterior angle = 360 ÷ ${r(360 / n, 2)} = ${n}`], d: 3 };
  }),
  G('m-sine-cosine', 'Sine & cosine rules', (rand) => {
    const b = ri(rand, 5, 15), c = ri(rand, 5, 15), A = ri(rand, 30, 120);
    const a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos((A * Math.PI) / 180));
    if (rand() < 0.5) return { q: `In triangle ABC, b = ${b} cm, c = ${c} cm and angle A = ${A}°. Find side **a** (1 dp).`, answer: r(a, 1), unit: 'cm', tol: 0.051, steps: ['Two sides and the included angle → cosine rule', `a² = b² + c² − 2bc cos A = ${b * b} + ${c * c} − 2×${b}×${c}×cos ${A}°`, `a² = ${r(a * a, 3)} → a = ${r(a, 2)}`], d: 4 };
    const area = 0.5 * b * c * Math.sin((A * Math.PI) / 180);
    return { q: `Find the **area** of a triangle with sides ${b} cm and ${c} cm and included angle ${A}° (1 dp).`, answer: r(area, 1), unit: 'cm²', tol: 0.051, steps: [`Area = ½ab sin C = ½ × ${b} × ${c} × sin ${A}°`, `= ${r(area, 2)} cm²`], d: 4 };
  }, 'H'),
  G('m-arc-sector', 'Arcs & sectors', (rand) => {
    const rad = ri(rand, 3, 15), ang = pk(rand, [30, 40, 45, 60, 72, 90, 120, 135, 150, 210, 270]);
    const area = rand() < 0.5;
    const v = area ? (ang / 360) * Math.PI * rad * rad : (ang / 360) * 2 * Math.PI * rad;
    return { q: `A sector has radius **${rad} cm** and angle **${ang}°**. Find its **${area ? 'area' : 'arc length'}** (1 dp).`, answer: r(v, 1), unit: area ? 'cm²' : 'cm', tol: 0.051, steps: [`Fraction of the circle = ${ang}/360`, area ? `Area = ${ang}/360 × π × ${rad}² = ${r(v, 3)}` : `Arc = ${ang}/360 × 2π × ${rad} = ${r(v, 3)}`], d: 3 };
  }, 'H'),
  // ---------------- PROBABILITY & STATISTICS ----------------
  G('m-prob-basic', 'Basic probability', (rand) => {
    const red = ri(rand, 1, 9), blue = ri(rand, 1, 9), green = ri(rand, 1, 9), tot = red + blue + green;
    const t = pk(rand, ['red', 'not-blue', 'green-or-red']);
    const n = t === 'red' ? red : t === 'not-blue' ? red + green : green + red;
    const res = frac(n, tot);
    const label = t === 'red' ? 'red' : t === 'not-blue' ? 'not blue' : 'green or red';
    return { q: `A bag has ${red} red, ${blue} blue and ${green} green counters. One is picked at random. Find **P(${label})** as a fraction.`, answer: fstr(res), accept: [...facc(res), `${n}/${tot}`], steps: [`Total = ${tot}`, `Favourable outcomes = ${n}`, `P = ${n}/${tot}${fstr(res) !== `${n}/${tot}` ? ` = ${fstr(res)}` : ''}`], d: 1 };
  }),
  G('m-prob-indep', 'Independent events (AND / OR)', (rand) => {
    const p = pk(rand, [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]), q = pk(rand, [0.1, 0.25, 0.4, 0.5, 0.6, 0.75, 0.9]);
    const t = pk(rand, ['and', 'neither', 'atleast']);
    if (t === 'and') return { q: `P(A) = ${p} and P(B) = ${q}. A and B are independent. Find **P(A and B)**.`, answer: r(p * q, 4), steps: [`AND → multiply: ${p} × ${q} = ${r(p * q, 4)}`], d: 2 };
    if (t === 'neither') return { q: `P(A) = ${p}, P(B) = ${q}, independent. Find **P(neither A nor B)**.`, answer: r((1 - p) * (1 - q), 4), steps: [`P(not A) = ${r(1 - p, 2)}, P(not B) = ${r(1 - q, 2)}`, `Neither = ${r(1 - p, 2)} × ${r(1 - q, 2)} = ${r((1 - p) * (1 - q), 4)}`], d: 3 };
    return { q: `P(A) = ${p}, P(B) = ${q}, independent. Find **P(at least one of A or B)**.`, answer: r(1 - (1 - p) * (1 - q), 4), steps: ['At least one = 1 − P(neither)', `= 1 − ${r(1 - p, 2)} × ${r(1 - q, 2)} = ${r(1 - (1 - p) * (1 - q), 4)}`], d: 4 };
  }),
  G('m-averages', 'Mean, median, mode, range', (rand) => {
    const n = ri(rand, 5, 9);
    const data = Array.from({ length: n }, () => ri(rand, 1, 30));
    const sorted = [...data].sort((a, b) => a - b);
    const t = pk(rand, ['mean', 'median', 'range']);
    if (t === 'mean') { const s = data.reduce((a, b) => a + b, 0); return { q: `Find the **mean** of: ${data.join(', ')} (to 2 dp if needed).`, answer: r(s / n, 2), tol: 0.006, steps: [`Total = ${s}`, `Mean = ${s} ÷ ${n} = ${r(s / n, 2)}`], d: 1 }; }
    if (t === 'median') { const med = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2; return { q: `Find the **median** of: ${data.join(', ')}`, answer: med, steps: [`Order them: ${sorted.join(', ')}`, `Middle position = (n + 1) ÷ 2 = ${(n + 1) / 2}`, `Median = ${med}`], hints: ['Put the numbers in ORDER first.'], d: 2 }; }
    return { q: `Find the **range** of: ${data.join(', ')}`, answer: sorted[n - 1] - sorted[0], steps: [`Range = largest − smallest = ${sorted[n - 1]} − ${sorted[0]} = ${sorted[n - 1] - sorted[0]}`], d: 1 };
  }),
  G('m-freq-mean', 'Mean from a frequency table', (rand) => {
    const xs = [0, 1, 2, 3, 4, 5].slice(0, ri(rand, 4, 6));
    const fs = xs.map(() => ri(rand, 1, 12));
    const tot = fs.reduce((a, b) => a + b, 0), fx = xs.reduce((a, x, i) => a + x * fs[i], 0);
    const table = `| Number of pets | ${xs.join(' | ')} |\n|---|${xs.map(() => '---').join('|')}|\n| Frequency | ${fs.join(' | ')} |`;
    return { q: `Find the **mean** number of pets (2 dp).\n\n${table}`, answer: r(fx / tot, 2), tol: 0.006, steps: [`Σfx = ${xs.map((x, i) => `${x}×${fs[i]}`).join(' + ')} = ${fx}`, `Σf = ${tot}`, `Mean = ${fx} ÷ ${tot} = ${r(fx / tot, 2)}`], hints: ['Multiply each value by its frequency, add them up, divide by the total frequency.'], d: 3 };
  }),
  G('m-money', 'Money problems', (rand) => {
    const items = ri(rand, 2, 6), price = r(ri(rand, 45, 499) / 100, 2), paid = Math.ceil((items * price) / 10) * 10;
    return { q: `${items} items cost ${money(price)} each. You pay with **£${paid}**. How much change do you get?`, answer: r(paid - items * price, 2), unit: '£', steps: [`Total = ${items} × ${money(price)} = ${money(items * price)}`, `Change = £${paid} − ${money(items * price)} = ${money(paid - items * price)}`], d: 1 };
  }),
];
