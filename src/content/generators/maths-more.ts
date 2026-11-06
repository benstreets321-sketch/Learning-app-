// More Maths question templates, aimed at the topics that had the fewest question shapes. Each generator mixes
// several kinds of question (calculation, reasoning, "which is right?"), and multiple-choice options are the slips
// students really make (sign errors, half-simplified answers, the wrong rule), so they can't be guessed.
import type { Generator, GeneratedQuestion } from '../types';
import { gcd } from '../../lib/util';
import { ri, pk, nz, r, f, frac, fstr, facc, sup, money, comma } from './helpers';
import { mcq } from './facts-kit';

const G = (id: string, title: string, make: Generator['make'], tier?: Generator['tier']): Generator => ({ id, title, make, tier });
const neg = (n: number) => (n < 0 ? `−${-n}` : String(n));
/** "+ 3" / "− 3" */
const pm = (n: number) => (n < 0 ? ` − ${-n}` : ` + ${n}`);
const cx = (n: number, v = 'x') => (n === 1 ? v : n === -1 ? `−${v}` : `${neg(n)}${v}`);
const lin = (m: number, c: number, v = 'x') => (m === 0 ? neg(c) : `${cx(m, v)}${c === 0 ? '' : pm(c)}`);
const fmt = (x: number) => f(x, 6).replace('-', '−');
const ord = (n: number) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`;
const surd = (k: number, n: number) => (k === 1 ? `√${n}` : `${k}√${n}`);
const surdAccept = (k: number, n: number) => [surd(k, n), `${k}√${n}`, `${k}root${n}`, `${k} root ${n}`, `${k}sqrt${n}`, `${k}sqrt(${n})`, `${k}√(${n})`];
const rad = (d: number) => (d * Math.PI) / 180;

// =========================== NUMBER ===========================
function estimateQ(rand: () => number): GeneratedQuestion {
  const a = ri(rand, 2, 9) * 10 + pk(rand, [1, 2, 3, 7, 8]) + pk(rand, [0.1, 0.3, 0.6, 0.8]);
  const b = ri(rand, 2, 9) + pk(rand, [0.1, 0.2, 0.8, 0.9]);
  const [c, cr] = pk(rand, [[0.48, 0.5], [0.52, 0.5], [1.9, 2], [2.1, 2], [4.8, 5], [5.2, 5], [19.6, 20], [20.3, 20]] as const);
  const ar = Math.round(a / 10) * 10, br = Math.round(b);
  const est = r((ar * br) / cr, 4);
  return {
    q: `By rounding each number to **1 significant figure**, estimate\n\n**${f(a)} × ${f(b)} ÷ ${c}**`,
    answer: est,
    steps: [`${f(a)} ≈ ${ar}, ${f(b)} ≈ ${br}, ${c} ≈ ${cr}`, `${ar} × ${br} = ${ar * br}`, `${ar * br} ÷ ${cr} = ${fmt(est)}`, cr < 1 ? 'Dividing by a number less than 1 makes the answer bigger.' : 'Check: the estimate should be close to the real answer.'],
    hints: ['Round each number to its first non-zero digit, then calculate.'], d: 2,
  };
}

function errorIntervalQ(rand: () => number): GeneratedQuestion {
  const kind = pk(rand, ['1 dp', 'nearest 10', 'nearest whole number', '2 dp', 'nearest 100']);
  const unitOf: Record<string, number> = { '1 dp': 0.1, 'nearest 10': 10, 'nearest whole number': 1, '2 dp': 0.01, 'nearest 100': 100 };
  const u = unitOf[kind];
  const v = kind === '1 dp' ? r(ri(rand, 21, 199) / 10, 1) : kind === '2 dp' ? r(ri(rand, 101, 999) / 100, 2) : ri(rand, 3, 60) * u;
  const L = r(v - u / 2, 4), U = r(v + u / 2, 4);
  const shown = kind === '1 dp' ? v.toFixed(1) : kind === '2 dp' ? v.toFixed(2) : String(v);
  const trunc = (kind === '1 dp' || kind === 'nearest whole number') && rand() < 0.3;
  const name = pk(rand, [['l', 'The length of a rod', 'cm'], ['m', 'The mass of a parcel', 'kg'], ['t', 'A race time', 's'], ['h', 'The height of a plant', 'cm']] as const);
  const how = kind === '1 dp' ? 'correct to 1 decimal place' : kind === '2 dp' ? 'correct to 2 decimal places' : `to the ${kind}`;
  const iv = (a: number, s1: string, s2: string, b: number) => `${fmt(a)} ${s1} ${name[0]} ${s2} ${fmt(b)}`;
  if (trunc) {
    const right = iv(v, '≤', '<', r(v + u, 4));
    return mcq(rand, `${name[1]}, ${name[0]} ${name[2]}, is **${shown} ${name[2]}** when **truncated** ${kind === '1 dp' ? 'to 1 decimal place' : 'to a whole number'}. Which is the error interval?`, right,
      [iv(L, '≤', '<', U), iv(v, '<', '≤', r(v + u, 4)), iv(r(v - u, 4), '<', '≤', v), iv(v, '≤', '≤', r(v + u, 4))],
      ['Truncating just chops off the digits, so the value could be anything from the number itself up to (but not including) the next step.', `Error interval: ${right}`], 3);
  }
  const right = iv(L, '≤', '<', U);
  return mcq(rand, `${name[1]}, ${name[0]} ${name[2]}, is **${shown} ${name[2]}** ${how}. Which is the error interval for ${name[0]}?`, right,
    [iv(L, '<', '≤', U), iv(L, '≤', '≤', U), iv(r(v - u, 4), '≤', '<', r(v + u, 4)), iv(v, '≤', '<', U)],
    [`Half of the rounding step (${fmt(u)}) is ${fmt(u / 2)}.`, `Lower bound ${shown} − ${fmt(u / 2)} = ${fmt(L)} (included: ≤); upper bound ${shown} + ${fmt(u / 2)} = ${fmt(U)} (not included: <, because it would round up).`], 3,
    ['The lower bound is included; the upper bound is not.']);
}

function recurringQ(rand: () => number): GeneratedQuestion {
  if (rand() < 0.55) {
    let ab = ri(rand, 1, 98);
    while (ab % 11 === 0) ab = ri(rand, 1, 98);
    const s = String(ab).padStart(2, '0');
    const res = frac(ab, 99);
    return { q: `Write **0.${s}${s}${s}…** (the digits **${s}** repeat) as a fraction in its simplest form.`, answer: fstr(res), accept: facc(res), steps: [`Let x = 0.${s}${s}…`, `100x = ${s}.${s}${s}…`, `100x − x = 99x = ${ab}`, `x = ${ab}/99${fstr(res) !== `${ab}/99` ? ` = ${fstr(res)}` : ''}`], hints: ['Two digits repeat, so multiply by 100 and subtract.'], d: 4 };
  }
  const a = ri(rand, 1, 9);
  let b = ri(rand, 0, 9);
  while (b === a) b = ri(rand, 0, 9);
  const res = frac(10 * a + b - a, 90);
  return { q: `Write **0.${a}${b}${b}${b}…** (only the **${b}** repeats) as a fraction in its simplest form.`, answer: fstr(res), accept: facc(res), steps: [`Let x = 0.${a}${b}${b}…`, `10x = ${a}.${b}${b}…  and  100x = ${a}${b}.${b}${b}…`, `100x − 10x = 90x = ${10 * a + b} − ${a} = ${10 * a + b - a}`, `x = ${10 * a + b - a}/90 = ${fstr(res)}`], hints: ['Get the repeating part lined up after the decimal point in two multiples of x, then subtract.'], d: 5 };
}

function fdpOrderQ(rand: () => number): GeneratedQuestion {
  for (;;) {
    const base = ri(rand, 25, 85) / 100;
    const d = pk(rand, [3, 6, 7, 8, 9, 11, 12, 16]);
    const n = Math.max(1, Math.round(base * d));
    const fv = n / d;
    const dec = r(fv + pk(rand, [-0.03, -0.02, 0.02, 0.03, -0.012, 0.012]), 3);
    const pct = r((fv + pk(rand, [-0.025, -0.015, 0.015, 0.025])) * 100, 1);
    const dec2 = r(fv + pk(rand, [-0.006, 0.006, -0.04, 0.04]), 2);
    const items: [string, number][] = [[fstr(frac(n, d)), fv], [String(dec), dec], [`${pct}%`, pct / 100], [String(dec2), dec2]];
    const vals = items.map((i) => i[1]).sort((x, y) => x - y);
    if (vals.some((v, i) => i > 0 && v - vals[i - 1] < 0.003) || fv >= 1 || n >= d) continue;
    const largest = rand() < 0.5;
    const pick = [...items].sort((x, y) => (largest ? y[1] - x[1] : x[1] - y[1]))[0];
    return mcq(rand, `Which of these is the **${largest ? 'largest' : 'smallest'}**?`, pick[0], items.filter((i) => i !== pick).map((i) => i[0]),
      [`Write them all as decimals: ${items.map(([s, v]) => `${s} = ${r(v, 4)}`).join(', ')}.`, `The ${largest ? 'largest' : 'smallest'} is ${pick[0]}.`], 2, ['Convert every number to a decimal (to 3 or 4 dp) before comparing.']);
  }
}

function hcfLcmWordQ(rand: () => number): GeneratedQuestion {
  if (rand() < 0.5) {
    const g = pk(rand, [2, 3, 4, 5, 6]);
    const a = g * pk(rand, [2, 3, 4, 5]), b = g * pk(rand, [3, 5, 7]);
    const l = (a * b) / gcd(a, b);
    if (l > 180 || a === b) return hcfLcmWordQ(rand);
    return { q: `Bus A leaves the station every **${a} minutes** and bus B every **${b} minutes**. They both leave at 9:00 am. After how many minutes will they **next leave together**?`, answer: l, unit: 'minutes', steps: [`Multiples of ${a}: ${Array.from({ length: Math.min(8, l / a) }, (_, i) => a * (i + 1)).join(', ')}…`, `Multiples of ${b}: ${Array.from({ length: Math.min(8, l / b) }, (_, i) => b * (i + 1)).join(', ')}…`, `The lowest common multiple is ${l}, so after ${l} minutes.`], hints: ['"Next time together" means the LOWEST COMMON MULTIPLE.'], d: 3 };
  }
  const g = pk(rand, [4, 6, 8, 9, 12, 15]);
  const p = pk(rand, [2, 3, 5]), q = pk(rand, [3, 4, 7]);
  if (p === q) return hcfLcmWordQ(rand);
  const a = g * p, b = g * q;
  return { q: `**${a} apples** and **${b} oranges** are packed into identical bags, with nothing left over. What is the **largest number of bags** that can be made?`, answer: g, unit: 'bags', steps: [`The number of bags must divide both ${a} and ${b}.`, `HCF(${a}, ${b}) = ${g}`, `So ${g} bags, each with ${p} apples and ${q} oranges.`], hints: ['"Largest number that divides both" means the HIGHEST COMMON FACTOR.'], d: 3 };
}

const PRIMES = [41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113];
const LOOK_PRIME = [51, 57, 87, 91, 119, 133, 111, 117, 69, 39, 93, 77, 49, 121, 143, 161, 187, 203, 217, 247];
function numberTypesQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.4) {
    const p = pk(rand, PRIMES);
    const why = LOOK_PRIME.slice(0, 6).map((c) => { const fs = [3, 7, 11, 13, 17, 19].find((x) => c % x === 0)!; return `${c} = ${fs} × ${c / fs}`; });
    return mcq(rand, 'Which of these is a **prime number**?', String(p), LOOK_PRIME.map(String), [`${p} has no factors other than 1 and itself.`, `The others only look prime: ${why.slice(0, 3).join('; ')}.`], 3, ['Test dividing by 3, 7, 11 and 13 - not just 2 and 5.']);
  }
  if (k < 0.7) {
    const c = pk(rand, [8, 27, 64, 125, 216, 343, 512, 729, 1000]);
    return mcq(rand, 'Which of these is a **cube number**?', String(c), ['16', '36', '81', '100', '144', '32', '48', '200', '256', '400', '900'], [`${c} = ${Math.round(Math.cbrt(c))}³.`, 'Square numbers such as 16, 36 and 81 are not cube numbers (except special ones like 64 = 8² = 4³).'], 2);
  }
  const n = pk(rand, [36, 48, 60, 72, 84, 90, 96, 120]);
  const factors = Array.from({ length: n }, (_, i) => i + 1).filter((x) => n % x === 0 && x > 1 && x < n);
  // a non-factor that shares a factor with n, so it can't be ruled out at a glance (e.g. 9 or 16 for 120)
  const nonFactor = pk(rand, Array.from({ length: n }, (_, i) => i + 6).filter((x) => x <= n / 2 && n % x !== 0 && gcd(x, n) > 1));
  return mcq(rand, `Which of these is **not** a factor of **${n}**?`, String(nonFactor), factors.filter((x) => x > 2).map(String), [`${n} ÷ ${nonFactor} = ${r(n / nonFactor, 3)}, which is not a whole number.`, `Factors of ${n}: 1, ${factors.join(', ')}, ${n}.`], 2);
}

function mixedFracQ(rand: () => number): GeneratedQuestion {
  const w1 = ri(rand, 1, 4), w2 = ri(rand, 1, 3), d1 = pk(rand, [2, 3, 4, 5, 6]), d2 = pk(rand, [3, 4, 5, 8]);
  let n1 = ri(rand, 1, d1 - 1), n2 = ri(rand, 1, d2 - 1);
  while (gcd(n1, d1) !== 1) n1 = ri(rand, 1, d1 - 1);
  while (gcd(n2, d2) !== 1) n2 = ri(rand, 1, d2 - 1);
  const A = frac(w1 * d1 + n1, d1), B = frac(w2 * d2 + n2, d2);
  let op = pk(rand, ['+', '−', '×']);
  if (op === '−' && A.n * B.d === B.n * A.d) op = '+';
  let res = op === '+' ? frac(A.n * B.d + B.n * A.d, A.d * B.d) : op === '−' ? frac(A.n * B.d - B.n * A.d, A.d * B.d) : frac(A.n * B.n, A.d * B.d);
  let [a, b] = [`${w1} ${n1}/${d1}`, `${w2} ${n2}/${d2}`];
  if (op === '−' && res.n <= 0) { res = frac(-res.n, res.d); [a, b] = [b, a]; }
  const mixedStr = facc(res).find((s) => s.includes(' ')) ?? fstr(res);
  return { q: `Work out **${a} ${op} ${b}**. Give your answer in its simplest form (as a mixed number if it is more than 1).`, answer: mixedStr, accept: facc(res), steps: [`Convert to improper fractions: ${w1} ${n1}/${d1} = ${fstr(A)}, ${w2} ${n2}/${d2} = ${fstr(B)}`, op === '×' ? `Multiply tops and bottoms: ${fstr(res)}` : `Use a common denominator, then ${op === '+' ? 'add' : 'subtract'}: ${fstr(res)}`, `As a mixed number: ${mixedStr}`], hints: ['Turn mixed numbers into improper (top-heavy) fractions first.'], d: 3 };
}

function fracProblemQ(rand: () => number): GeneratedQuestion {
  const a = pk(rand, [3, 4, 5, 6]), b = pk(rand, [3, 4, 5]);
  const what = pk(rand, [['', 'rent', 'food'], ['', 'a phone', 'clothes'], ['', 'travel', 'books']] as const);
  const left = frac((a - 1) * (b - 1), a * b);
  if (rand() < 0.5) {
    return mcq(rand, `Sam spends **1/${a}** of their money on ${what[1]} and then **1/${b} of what is left** on ${what[2]}. What fraction of the money is left?`, fstr(left),
      [fstr(frac(a * b - a - b, a * b)), fstr(frac(1, a * b)), fstr(frac((a - 1) * b - a, a * b)), fstr(frac(b - 1, b))].filter((x) => x !== fstr(left) && !x.startsWith('-') && x !== '0'),
      [`After ${what[1]}: ${a - 1}/${a} is left.`, `${what[2]} uses 1/${b} of that, so ${b - 1}/${b} of it is left: ${a - 1}/${a} × ${b - 1}/${b} = ${fstr(left)}.`, `Trap: 1 − 1/${a} − 1/${b} treats the second fraction as a fraction of the WHOLE amount.`], 4);
  }
  const N = a * b * ri(rand, 2, 12);
  return { q: `Sam has **£${N}**. They spend **1/${a}** of it on ${what[1]} and then **1/${b} of the remainder** on ${what[2]}. How much money is left?`, answer: (N * (a - 1) * (b - 1)) / (a * b), unit: '£', steps: [`1/${a} of £${N} = £${N / a}, leaving £${N - N / a}`, `1/${b} of £${N - N / a} = £${(N - N / a) / b}`, `Left: £${N - N / a} − £${(N - N / a) / b} = £${(N * (a - 1) * (b - 1)) / (a * b)}`], d: 3 };
}

function simpleInterestQ(rand: () => number): GeneratedQuestion {
  const P = ri(rand, 4, 40) * 250, rate = pk(rand, [2, 2.5, 3, 4, 5, 6]), n = ri(rand, 2, 6);
  if (rand() < 0.5) {
    const I = r((P * rate * n) / 100, 2);
    return { q: `£${comma(P)} is invested at **${rate}% simple interest** per year. How much **interest** is earned in **${n} years**?`, answer: I, unit: '£', tol: 0.011, steps: [`Interest each year = ${rate}% of £${comma(P)} = ${money((P * rate) / 100)}`, `${n} years: ${money((P * rate) / 100)} × ${n} = ${money(I)}`, 'Simple interest is the same every year; compound interest grows because interest earns interest.'], d: 2 };
  }
  const simple = P * (1 + (rate * n) / 100), comp = P * (1 + rate / 100) ** n;
  return { q: `£${comma(P)} is invested for **${n} years** at **${rate}%** per year. How much **more** would it be worth with **compound** interest than with **simple** interest? (nearest penny)`, answer: r(comp - simple, 2), unit: '£', tol: 0.011, steps: [`Simple: £${comma(P)} + ${n} × ${rate}% = ${money(simple)}`, `Compound: £${comma(P)} × ${f(1 + rate / 100)}^${n} = ${money(comp)}`, `Difference = ${money(comp - simple)}`], d: 4 };
}

function multiplierQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  const p = pk(rand, [3, 4, 6, 7, 8, 12, 15, 17, 35]);
  if (k < 0.45) {
    const up = rand() < 0.5;
    const m = up ? r(1 + p / 100, 2) : r(1 - p / 100, 2);
    const d = p / 100;
    return mcq(rand, `What do you multiply by to **${up ? 'increase' : 'decrease'}** an amount by **${p}%**?`, f(m),
      up ? [f(d), f(r(1 + p / 10, 2)), f(r(1 - d, 2)), String(p)] : [f(r(1 + d, 2)), f(d), f(r(1 - p / 1000, 3)), f(r(p / 10, 2))],
      [`${up ? '100% + ' : '100% − '}${p}% = ${up ? 100 + p : 100 - p}% = ${f(m)}`, `Multiplying by ${f(d)} would only give the ${p}% itself, not the new amount.`], 2);
  }
  const a = pk(rand, [5, 8, 10, 12, 20, 25]), b = pk(rand, [5, 10, 15, 20]);
  const m = (1 + a / 100) * (1 - b / 100);
  if (k < 0.75) return { q: `A price is **increased by ${a}%** and then the new price is **decreased by ${b}%**. What single multiplier has the same effect?`, answer: r(m, 4), steps: [`× ${f(1 + a / 100)} then × ${f(1 - b / 100)}`, `${f(1 + a / 100)} × ${f(1 - b / 100)} = ${f(m)}`, a === b ? 'Note it is NOT 1: the decrease is taken from a bigger amount.' : `${m > 1 ? 'Overall increase' : 'Overall decrease'} of ${f(Math.abs(m - 1) * 100)}%.`], d: 4 };
  return { q: `A price is **increased by ${a}%** and then **decreased by ${b}%**. What is the **overall percentage change**? (Give a decrease as a negative number.)`, answer: r((m - 1) * 100, 2), unit: '%', tol: 0.006, steps: [`Multiplier = ${f(1 + a / 100)} × ${f(1 - b / 100)} = ${f(m)}`, `Change = (${f(m)} − 1) × 100 = ${f((m - 1) * 100)}%`, `It is not ${a} − ${b} = ${a - b}%: the second change is a percentage of a different amount.`], d: 4 };
}

function halfLifeQ(rand: () => number): GeneratedQuestion {
  const dep = rand() < 0.6;
  const rate = pk(rand, dep ? [8, 10, 12, 15, 18, 20, 25] : [4, 5, 6, 8, 10, 12]);
  const m = dep ? 1 - rate / 100 : 1 + rate / 100;
  let n = 0, v = 1;
  while (dep ? v >= 0.5 : v < 2) { v *= m; n++; }
  const P = ri(rand, 6, 40) * 1000;
  const vals = Array.from({ length: n + 1 }, (_, i) => `${i}: £${comma(Math.round(P * m ** i))}`);
  return { q: dep ? `A machine worth **£${comma(P)}** loses **${rate}%** of its value each year. After how many **whole years** will it first be worth **less than half** of its original value?` : `£${comma(P)} is invested at **${rate}%** compound interest. After how many **whole years** will it first be worth **at least double**?`, answer: n, unit: 'years', steps: [`Multiplier = ${f(m)} each year`, `Year-by-year: ${vals.slice(Math.max(0, n - 2)).join('; ')}`, `First passes ${dep ? 'half' : 'double'} after year ${n}.`], hints: ['Keep multiplying by the multiplier (use the ANS key) and count the years.'], d: 4 };
}

function surdOpsQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.2) {
    const b = pk(rand, [2, 3, 5, 6, 7]), a = ri(rand, 2, 5), c = ri(rand, 2, 6);
    return { q: `Work out **${a}√${b} × ${c}√${b}**.`, answer: a * c * b, steps: [`Multiply the whole numbers: ${a} × ${c} = ${a * c}`, `√${b} × √${b} = ${b}`, `${a * c} × ${b} = ${a * c * b}`], d: 4 };
  }
  if (k < 0.45) {
    const n = pk(rand, [2, 3, 5, 6, 7]), k1 = ri(rand, 2, 4), k2 = ri(rand, 2, 5);
    const op = rand() < 0.6 ? '+' : '−';
    if (op === '−' && k1 === k2) return surdOpsQ(rand);
    const [big, small] = op === '−' ? [Math.max(k1, k2), Math.min(k1, k2)] : [k1, k2];
    const res = op === '+' ? big + small : big - small;
    return { q: `Simplify **√${big * big * n} ${op} √${small * small * n}**. Give your answer in the form a√b.`, answer: surd(res, n), accept: surdAccept(res, n), steps: [`√${big * big * n} = √${big * big} × √${n} = ${big}√${n}`, `√${small * small * n} = ${small}√${n}`, `${big}√${n} ${op} ${small}√${n} = ${surd(res, n)}`], hints: ['Simplify each surd first, then collect like surds (like terms).'], d: 4 };
  }
  if (k < 0.7) {
    const n = pk(rand, [2, 3, 5, 6, 7]), m = ri(rand, 2, 5);
    return { q: `Rationalise the denominator: write **${m * n}/√${n}** in the form a√b.`, answer: surd(m, n), accept: surdAccept(m, n), steps: [`Multiply top and bottom by √${n}: ${m * n}√${n} / ${n}`, `${m * n} ÷ ${n} = ${m}, so ${surd(m, n)}`], hints: ['Multiply the top and bottom by the surd on the bottom.'], d: 5 };
  }
  const p = ri(rand, 2, 7), q = pk(rand, [2, 3, 5, 6, 7, 10, 11]);
  return { q: `Expand and simplify **(${p} + √${q})(${p} − √${q})**.`, answer: p * p - q, steps: [`(a + b)(a − b) = a² − b²`, `${p}² − (√${q})² = ${p * p} − ${q} = ${p * p - q}`, 'The surd terms cancel out.'], d: 4 };
}

const FRAC_POWERS: [number, number, number, number][] = [
  [8, 2, 3, 4], [27, 2, 3, 9], [16, 3, 4, 8], [32, 2, 5, 4], [64, 2, 3, 16], [125, 2, 3, 25], [81, 3, 4, 27], [4, 3, 2, 8], [9, 3, 2, 27], [25, 3, 2, 125], [36, 1, 2, 6], [1000, 2, 3, 100],
];
function fracIndexQ(rand: () => number): GeneratedQuestion {
  const [b, p, q, v] = pk(rand, FRAC_POWERS);
  const root = Math.round(b ** (1 / q));
  if (rand() < 0.5) {
    return { q: `Evaluate **${b}^(${p}/${q})** (${b} to the power ${p}/${q}).`, answer: v, steps: [`The denominator ${q} means the ${q === 2 ? 'square' : q === 3 ? 'cube' : `${ord(q)}`} root: ${q === 2 ? '√' : `${q}√`}${b} = ${root}`, `The numerator ${p} means the power: ${root}${sup(p)} = ${v}`], hints: ['Root first (the bottom number), then the power (the top number).'], d: 4 };
  }
  return mcq(rand, `What is **${b}^(−${p}/${q})** (${b} to the power −${p}/${q})?`, `1/${v}`, [`−${v}`, `${v}`, `−1/${v}`, `1/${root}`, `${root}`].filter((x) => x !== `1/${v}`),
    [`The negative power means "one over": 1 / ${b}^(${p}/${q})`, `${b}^(${p}/${q}) = ${root}${sup(p)} = ${v}, so the answer is 1/${v}.`, 'A negative power never makes the answer negative.'], 5);
}

function standardCalcQ(rand: () => number): GeneratedQuestion {
  const a = pk(rand, [1.5, 2, 2.5, 3, 4, 4.5, 6, 7.5, 8]), b = pk(rand, [2, 3, 4, 5, 6]);
  const m = ri(rand, 2, 9), n = rand() < 0.3 ? -ri(rand, 2, 6) : ri(rand, 2, 7);
  let mant = a * b, e = m + n;
  if (mant >= 10) { mant /= 10; e += 1; }
  const sfStr = (x: number, p: number) => `${f(x)} × 10${sup(p)}`;
  if (rand() < 0.6) {
    return mcq(rand, `Work out **(${f(a)} × 10${sup(m)}) × (${b} × 10${sup(n)})**. Give your answer in standard form.`, sfStr(mant, e),
      [sfStr(a * b, m + n), sfStr(mant, e - 1), sfStr(mant, m * n), sfStr(a + b, m + n), sfStr(mant, e + 1)].filter((x) => x !== sfStr(mant, e)),
      [`Multiply the numbers: ${f(a)} × ${b} = ${f(a * b)}`, `Add the powers: 10${sup(m)} × 10${sup(n)} = 10${sup(m + n)}`, a * b >= 10 ? `${f(a * b)} × 10${sup(m + n)} is not standard form (the first number must be from 1 to less than 10): ${sfStr(mant, e)}` : `Answer: ${sfStr(mant, e)}`], 3);
  }
  const nums = [ri(rand, 11, 99) / 10, ri(rand, 11, 99) / 10, ri(rand, 11, 99) / 10, ri(rand, 11, 99) / 10];
  const pows = [m, m, m - 1, m + 1];
  const items = nums.map((x, i) => [sfStr(x, pows[i]), x * 10 ** pows[i]] as [string, number]);
  if (new Set(items.map((i) => i[1])).size < 4) return standardCalcQ(rand);
  const big = [...items].sort((x, y) => y[1] - x[1])[0];
  return mcq(rand, 'Which of these numbers is the **largest**?', big[0], items.filter((i) => i !== big).map((i) => i[0]), ['Compare the powers of 10 first; only if they are equal compare the first numbers.', `Largest: ${big[0]}`], 2);
}

function money2Q(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['vat', 'vat-back', 'wage', 'exchange', 'exchange-back', 'sale', 'bill']);
  if (k === 'vat') { const p = ri(rand, 12, 480) + pk(rand, [0, 0.5, 0.25, 0.99]); return { q: `A TV costs **${money(p)}** before VAT. VAT is charged at **20%**. What is the price including VAT?`, answer: r(p * 1.2, 2), unit: '£', tol: 0.011, steps: [`Price × 1.2 = ${money(p)} × 1.2 = ${money(p * 1.2)}`], d: 2 }; }
  if (k === 'vat-back') { const p = ri(rand, 10, 400) * 1.5; return { q: `A bike costs **${money(p * 1.2)}** including 20% VAT. What was the price **before** VAT?`, answer: r(p, 2), unit: '£', tol: 0.011, steps: [`Including VAT = 120% of the original`, `Original = ${money(p * 1.2)} ÷ 1.2 = ${money(p)}`, `Trap: taking 20% off ${money(p * 1.2)} gives ${money(p * 1.2 * 0.8)}, which is wrong.`], d: 3 }; }
  if (k === 'wage') { const rate = pk(rand, [10.5, 11.44, 12, 12.21, 12.6, 13.5]), h = ri(rand, 30, 38), o = ri(rand, 2, 8); const pay = rate * h + rate * 1.5 * o; return { q: `Jo is paid **${money(rate)} per hour** for a ${h}-hour week, and **time and a half** for overtime. One week Jo works **${h + o} hours**. How much is Jo paid?`, answer: r(pay, 2), unit: '£', tol: 0.011, steps: [`Basic: ${h} × ${money(rate)} = ${money(rate * h)}`, `Overtime rate: ${money(rate)} × 1.5 = ${money(rate * 1.5)}`, `Overtime: ${o} × ${money(rate * 1.5)} = ${money(rate * 1.5 * o)}`, `Total = ${money(pay)}`], d: 3 }; }
  if (k === 'exchange') { const rate = pk(rand, [1.14, 1.16, 1.18, 1.25, 1.27]), cur = rate < 1.2 ? '€' : '$', n = ri(rand, 8, 60) * 10; return { q: `The exchange rate is **£1 = ${cur}${rate}**. How many ${cur === '€' ? 'euros' : 'dollars'} do you get for **£${n}**?`, answer: r(n * rate, 2), unit: cur, tol: 0.011, steps: [`Pounds → ${cur}: multiply by ${rate}`, `${n} × ${rate} = ${cur}${f(n * rate)}`], d: 2 }; }
  if (k === 'exchange-back') { const rate = pk(rand, [1.14, 1.16, 1.18, 1.25]), n = ri(rand, 10, 90) * 5; return { q: `The exchange rate is **£1 = €${rate}**. A souvenir costs **€${n}**. How much is that in pounds? (nearest penny)`, answer: r(n / rate, 2), unit: '£', tol: 0.011, steps: [`€ → £: DIVIDE by ${rate}`, `${n} ÷ ${rate} = ${money(n / rate)}`, 'Check: the number of pounds should be smaller than the number of euros.'], d: 3 }; }
  if (k === 'sale') { const p = ri(rand, 8, 60) * 5, a = pk(rand, [10, 20, 25]), b = pk(rand, [10, 15, 20]); const v = p * (1 - a / 100) * (1 - b / 100); return { q: `A coat costs **£${p}**. In a sale it is reduced by **${a}%**, and then a further **${b}%** is taken off the sale price. What is the final price?`, answer: r(v, 2), unit: '£', tol: 0.011, steps: [`£${p} × ${f(1 - a / 100)} = ${money(p * (1 - a / 100))}`, `× ${f(1 - b / 100)} = ${money(v)}`, `This is NOT the same as ${a + b}% off (${money(p * (1 - (a + b) / 100))}).`], d: 3 }; }
  const days = pk(rand, [30, 31, 90, 92]), sc = pk(rand, [45, 52.5, 60.1]), units = ri(rand, 120, 900), up = pk(rand, [24.5, 27.03, 28.6]);
  const total = (days * sc + units * up) / 100;
  return { q: `An electricity bill has a standing charge of **${sc}p per day** for **${days} days**, plus **${units} units** at **${up}p per unit**. What is the total bill?`, answer: r(total, 2), unit: '£', tol: 0.011, steps: [`Standing charge: ${days} × ${sc}p = ${f(days * sc)}p`, `Units: ${units} × ${up}p = ${f(units * up)}p`, `Total = ${f(days * sc + units * up)}p = ${money(total)}`], hints: ['Work in pence, then divide by 100 for pounds.'], d: 3 };
}

// =========================== ALGEBRA ===========================
function factoriseMcq(rand: () => number): GeneratedQuestion {
  const g = pk(rand, [2, 3, 4, 5, 6]), p = ri(rand, 1, 5), q = ri(rand, 1, 7);
  if (gcd(p, q) !== 1) return factoriseMcq(rand);
  const A = g * p, B = g * q;
  const right = `${g}x(${cx(p)} + ${q})`;
  const qx = cx(q);
  return mcq(rand, `Factorise fully: **${A}x² + ${B}x**`, right, [`${g}(${cx(p, 'x²')} + ${qx})`, `x(${A}x + ${B})`, `${g}x(${cx(p)} + ${B})`, `${g}x²(${p} + ${qx})`, `${A}x(x + ${B})`], [`Highest common factor of ${A}x² and ${B}x is ${g}x.`, `${A}x² ÷ ${g}x = ${cx(p)}, ${B}x ÷ ${g}x = ${q}`, `So ${right}. "Fully" means take out ALL common factors - numbers and letters.`], 2);
}

function collectQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.5) {
    const a = ri(rand, 3, 9), c = ri(rand, 1, a - 1), b = ri(rand, 1, 8), d = ri(rand, 1, 8);
    const right = `${cx(a - c, 'p')} + ${cx(b + d, 'q')}`;
    return mcq(rand, `Simplify **${a}p + ${b}q − ${c}p + ${d}q**`, right, [`${cx(a + c, 'p')} + ${cx(b + d, 'q')}`, ...(b !== d ? [`${cx(a - c, 'p')} ${b > d ? '+' : '−'} ${cx(Math.abs(b - d), 'q')}`] : []), `${a - c + b + d}pq`, `${cx(a - c, 'p')} − ${cx(b + d, 'q')}`],
      [`p terms: ${a}p − ${c}p = ${cx(a - c, 'p')}`, `q terms: ${b}q + ${d}q = ${cx(b + d, 'q')}`, 'The sign in front of a term belongs to that term (−' + c + 'p).'], 1);
  }
  if (k < 0.75) {
    const a = ri(rand, 2, 7), b = ri(rand, 2, 6);
    return mcq(rand, `Simplify **${a}x × ${b}y**`, `${a * b}xy`, [`${a + b}xy`, `${a * b}x + y`, `${a}${b}xy`, `${a * b}x²y`], [`Multiply the numbers: ${a} × ${b} = ${a * b}`, `Multiply the letters: x × y = xy`], 1);
  }
  const a = ri(rand, 2, 6), b = ri(rand, 2, 5);
  return mcq(rand, `Simplify **${a * b}a²b ÷ ${b}ab**`, `${a}a`, [`${a}ab`, `${a}a²`, `${a * b - b}a`, `${a}`], [`Numbers: ${a * b} ÷ ${b} = ${a}`, 'a² ÷ a = a, and b ÷ b = 1', `Answer: ${a}a`], 2);
}

function equationsQ(rand: () => number, lvl: number): GeneratedQuestion {
  const x0 = nz(rand, -6, 12);
  const k = rand();
  if (k < 0.45 || lvl >= 3) {
    const a = ri(rand, 2, 6), b = nz(rand, -5, 9);
    let c = ri(rand, 1, 7);
    if (c === a) c += 1;
    const d = a * (x0 + b) - c * x0;
    if (d === 0) return equationsQ(rand, lvl);
    return { q: `Solve **${a}(x${pm(b)}) = ${cx(c)}${pm(d)}**`, answer: x0, steps: [`Expand: ${cx(a)}${pm(a * b)} = ${cx(c)}${pm(d)}`, `${a > c ? `Subtract ${cx(c)}` : `Subtract ${cx(a)}`} from both sides: ${a > c ? `${cx(a - c)}${pm(a * b)} = ${d}` : `${a * b} = ${cx(c - a)}${pm(d)}`}`, a > c ? `${cx(a - c)} = ${d - a * b} → x = ${x0}` : `${a * b - d} = ${cx(c - a)} → x = ${x0}`], hints: ['Expand the bracket, then get the x terms on one side.'], d: 3 };
  }
  if (k < 0.75) {
    const a = ri(rand, 2, 6), b = nz(rand, -6, 8), c = nz(rand, -5, 9), x = a * c - b;
    return { q: `Solve **(x${pm(b)}) ÷ ${a} = ${neg(c)}**`, answer: x, steps: [`Multiply both sides by ${a}: x${pm(b)} = ${neg(a * c)}`, `${b > 0 ? 'Subtract' : 'Add'} ${Math.abs(b)}: x = ${neg(x)}`], hints: ['Undo the division first by multiplying both sides.'], d: 2 };
  }
  const a = ri(rand, 2, 5), b = nz(rand, -6, 9), c = r(x0 / a + b, 4);
  return { q: `Solve **x/${a}${pm(b)} = ${fmt(c)}**`, answer: x0, steps: [`${b > 0 ? 'Subtract' : 'Add'} ${Math.abs(b)}: x/${a} = ${fmt(c - b)}`, `Multiply by ${a}: x = ${x0}`], d: 2 };
}

function formEquationQ(rand: () => number): GeneratedQuestion {
  if (rand() < 0.55) {
    const k = ri(rand, 2, 3), x0 = ri(rand, 15, 40), m = 180 - (2 + k) * x0;
    if (m <= 0 || m > 60) return formEquationQ(rand);
    const askLargest = rand() < 0.4;
    const angles = [x0, k * x0, x0 + m];
    return { q: `The angles of a triangle are **x**, **${k}x** and **x + ${m}** (in degrees). ${askLargest ? 'Find the size of the **largest** angle.' : 'Find **x**.'}`, answer: askLargest ? Math.max(...angles) : x0, unit: '°', steps: [`Angles in a triangle add up to 180°: x + ${k}x + x + ${m} = 180`, `${2 + k}x + ${m} = 180 → ${2 + k}x = ${180 - m} → x = ${x0}`, `Angles: ${angles.join('°, ')}°${askLargest ? ` - largest is ${Math.max(...angles)}°` : ''}`], d: 3 };
  }
  const x0 = ri(rand, 3, 15), a = ri(rand, 2, 4), c = ri(rand, 1, Math.max(1, x0 - 1));
  let b = ri(rand, 1, 6);
  if (b === c) b += 1;
  const P = 2 * (a * x0 + b + x0 - c);
  return { q: `A rectangle has length **(${a}x + ${b}) cm** and width **(x − ${c}) cm**. Its perimeter is **${P} cm**. Find **x**.`, answer: x0, steps: [`Perimeter = 2 × (length + width) = 2(${a}x + ${b} + x − ${c}) = ${2 * (a + 1)}x${pm(2 * (b - c))}`, `${2 * (a + 1)}x${pm(2 * (b - c))} = ${P} → ${2 * (a + 1)}x = ${P - 2 * (b - c)}`, `x = ${x0}`], d: 3 };
}

function inequalityIntQ(rand: () => number): GeneratedQuestion {
  const b = ri(rand, 1, 3), c = nz(rand, -4, 5);
  const lo = ri(rand, -3, 1), hi = lo + ri(rand, 2, 4);
  // integers n with lo <= n <= hi; build lo-side strict inequality and hi-side inclusive
  const A = b * (lo - 1) + c + (b > 1 ? ri(rand, 0, b - 1) : 0); // A < bn + c means n > (A - c)/b
  const D = b * hi + c;
  const sols: number[] = [];
  for (let n = -20; n <= 20; n++) if (A < b * n + c && b * n + c <= D) sols.push(n);
  if (sols.length < 2) return inequalityIntQ(rand);
  const show = (xs: number[]) => xs.map(neg).join(', ');
  const s0 = sols[0], s1 = sols[sols.length - 1];
  const range = (a: number, z: number) => Array.from({ length: z - a + 1 }, (_, i) => a + i);
  return mcq(rand, `List all the **integers** n that satisfy **${neg(A)} < ${cx(b, 'n')}${pm(c)} ≤ ${neg(D)}**`, show(sols),
    [show(range(s0 - 1, s1)), show(range(s0, s1 - 1)), show(range(s0 + 1, s1 + 1)), show(range(s0 - 1, s1 - 1))].filter((x) => x !== show(sols) && x.length),
    [`${c > 0 ? 'Subtract' : 'Add'} ${Math.abs(c)}: ${neg(A - c)} < ${cx(b, 'n')} ≤ ${neg(D - c)}`, b > 1 ? `Divide by ${b}: ${fmt((A - c) / b)} < n ≤ ${fmt((D - c) / b)}` : `So ${neg(A - c)} < n ≤ ${neg(D - c)}`, `< means the end value is NOT included; ≤ means it is. Integers: ${show(sols)}.`], 3);
}

function sequencesQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  const a = nz(rand, -5, 12), d = nz(rand, -4, 7);
  const terms = (n: number) => Array.from({ length: n }, (_, i) => a + i * d);
  if (k < 0.3) {
    const n = pk(rand, [10, 20, 25, 50, 100]);
    return { q: `The sequence **${terms(4).map(neg).join(', ')}, …** continues in the same way. Find the **${ord(n)} term**.`, answer: a + (n - 1) * d, steps: [`Common difference d = ${neg(d)}; nth term = ${lin(d, a - d, 'n')}`, `${ord(n)} term = ${d} × ${n}${pm(a - d)} = ${a + (n - 1) * d}`], hints: ['nth term = (difference) × n + (first term − difference).'], d: 2 };
  }
  if (k < 0.5) {
    const kk = ri(rand, 8, 40), val = a + (kk - 1) * d;
    return { q: `The sequence **${terms(4).map(neg).join(', ')}, …** continues in the same way. Which term is equal to **${neg(val)}**?`, answer: kk, steps: [`nth term = ${lin(d, a - d, 'n')}`, `${lin(d, a - d, 'n')} = ${val} → ${cx(d, 'n')} = ${val - (a - d)} → n = ${kk}`, `It is the ${ord(kk)} term.`], d: 3 };
  }
  {
    const s = pk(rand, [2, 3, 5]), m = pk(rand, [2, 3]), g = [s, s * m, s * m * m, s * m * m * m];
    if (rand() < 0.5) return { q: `Find the next term of the **geometric** sequence **${g.join(', ')}, …**`, answer: s * m ** 4, steps: [`Each term is multiplied by ${m}`, `${g[3]} × ${m} = ${s * m ** 4}`], d: 2 };
    const f1 = ri(rand, 1, 5), f2 = ri(rand, 2, 7), fib = [f1, f2, f1 + f2, f1 + 2 * f2, 2 * f1 + 3 * f2];
    return { q: `Each term of this sequence is the **sum of the two terms before it**: **${fib.slice(0, 4).join(', ')}, …** Find the **next** term.`, answer: fib[4], steps: [`${fib[2]} + ${fib[3]} = ${fib[4]}`, 'This is a Fibonacci-type sequence.'], d: 1 };
  }
}

function quadSeqQ(rand: () => number): GeneratedQuestion {
  const A2 = ri(rand, 1, 3), B2 = nz(rand, -3, 3), C2 = ri(rand, -4, 6);
  const t = (n: number) => A2 * n * n + B2 * n + C2;
  const ex = (aa: number, bb: number, cc: number) => `${aa === 1 ? 'n²' : `${aa}n²`}${bb === 0 ? '' : bb === 1 ? ' + n' : bb === -1 ? ' − n' : pm(bb) + 'n'}${cc === 0 ? '' : pm(cc)}`;
  return mcq(rand, `Find the nth term of the **quadratic** sequence **${[1, 2, 3, 4, 5].map((n) => neg(t(n))).join(', ')}, …**`, ex(A2, B2, C2),
    [ex(A2 * 2, B2, C2 - A2), ex(A2, -B2, C2 + 2 * B2), ex(A2 + 1, B2 - 3, C2 + 2), ex(A2, B2 + 1, C2 - 1), ex(2 * A2, B2 - 3 * A2, C2 + A2)].filter((e, i, arr) => arr.indexOf(e) === i),
    [`First differences: ${[1, 2, 3, 4].map((n) => t(n + 1) - t(n)).join(', ')}; second difference: ${2 * A2}`, `Half the second difference = ${A2}, so it starts ${A2 === 1 ? 'n²' : `${A2}n²`}`, `Subtract ${A2 === 1 ? 'n²' : `${A2}n²`} and find the linear part: ${ex(A2, B2, C2)}`, 'Check: substitute n = 1 and n = 2.'], 5);
}

function lineEqQ(rand: () => number): GeneratedQuestion {
  const m = nz(rand, -4, 5), x1 = ri(rand, -3, 4), dx = ri(rand, 1, 4), c = nz(rand, -6, 8);
  const y1 = m * x1 + c, x2 = x1 + dx, y2 = m * x2 + c;
  const eq = (mm: number, cc: number) => `y = ${lin(mm, cc)}`;
  const k = rand();
  if (k < 0.45) {
    return mcq(rand, `Find the equation of the straight line through **(${neg(x1)}, ${neg(y1)})** and **(${neg(x2)}, ${neg(y2)})**.`, eq(m, c),
      [eq(m, -c), eq(c === m ? m + 1 : c, m), eq(-m, y1 + m * x1), eq(m, y1), eq(m, c + m)].filter((e) => e !== eq(m, c)),
      [`Gradient = change in y ÷ change in x = (${neg(y2)} − ${neg(y1)}) ÷ (${neg(x2)} − ${neg(x1)}) = ${y2 - y1} ÷ ${dx} = ${m}`, `y = ${cx(m)} + c; substitute (${neg(x1)}, ${neg(y1)}): ${y1} = ${m * x1} + c → c = ${c}`, `Equation: ${eq(m, c)}`], 4);
  }
  {
    const px = ri(rand, -3, 4), py = ri(rand, -5, 8), cc = py - m * px;
    return mcq(rand, `Find the equation of the line **parallel** to **y = ${lin(m, c)}** that passes through **(${neg(px)}, ${neg(py)})**.`, eq(m, cc),
      [eq(m, c), eq(-m, py + m * px), eq(m, py), eq(m, -cc)].filter((e) => e !== eq(m, cc)),
      [`Parallel lines have the SAME gradient: ${m}`, `${py} = ${m} × ${neg(px)} + c → c = ${cc}`, `Equation: ${eq(m, cc)}`], 3);
  }
}

function perpQ(rand: () => number): GeneratedQuestion {
  const mm = pk(rand, [2, 3, 4, 5, -2, -3, -4]);
  const perp = mm > 0 ? `−1/${mm}` : `1/${-mm}`;
  return mcq(rand, `A line has gradient **${neg(mm)}**. What is the gradient of a line **perpendicular** to it?`, perp, [neg(-mm), mm > 0 ? `1/${mm}` : `−1/${-mm}`, neg(mm)],
    ['Perpendicular gradients multiply to −1: m₁ × m₂ = −1.', `So the perpendicular gradient is −1 ÷ ${neg(mm)} = ${perp} ("flip and change the sign").`], 4);
}

function midpointQ(rand: () => number): GeneratedQuestion {
  const x1 = ri(rand, -6, 6), y1 = ri(rand, -6, 6);
  const x2 = x1 + 2 * nz(rand, -5, 5), y2 = y1 + 2 * nz(rand, -5, 5);
  const P = (a: number, b: number) => `(${neg(a)}, ${neg(b)})`;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  return mcq(rand, `A is **${P(x1, y1)}** and B is **${P(x2, y2)}**. Find the **midpoint** of AB.`, P(mx, my),
    [P((x2 - x1) / 2, (y2 - y1) / 2), P(my, mx), P(x1 + x2, y1 + y2), P(mx, -my), P((x1 - x2) / 2 + x2, (y2 - y1) / 2 + y2)].filter((p) => p !== P(mx, my)),
    [`Midpoint = (average of the x-coordinates, average of the y-coordinates)`, `x: (${neg(x1)} + ${neg(x2)}) ÷ 2 = ${neg(mx)};  y: (${neg(y1)} + ${neg(y2)}) ÷ 2 = ${neg(my)}`], 2);
}

function simWordQ(rand: () => number): GeneratedQuestion {
  if (rand() < 0.6) {
    const A = ri(rand, 8, 16) + pk(rand, [0, 0.5]), C = ri(rand, 4, Math.floor(A) - 1) + pk(rand, [0, 0.5]);
    const a1 = ri(rand, 1, 3), c1 = ri(rand, 2, 4), a2 = ri(rand, 2, 4), c2 = ri(rand, 1, 3);
    if (a1 * c2 === a2 * c1) return simWordQ(rand);
    const askAdult = rand() < 0.5;
    return { q: `**${a1} adult** ticket${a1 > 1 ? 's' : ''} and **${c1} child** tickets cost **${money(a1 * A + c1 * C)}**. **${a2} adult** tickets and **${c2} child** ticket${c2 > 1 ? 's' : ''} cost **${money(a2 * A + c2 * C)}**. Find the cost of one **${askAdult ? 'adult' : 'child'}** ticket.`, answer: askAdult ? A : C, unit: '£', tol: 0.011, steps: [`${a1}a + ${c1}c = ${f(a1 * A + c1 * C)} and ${a2}a + ${c2}c = ${f(a2 * A + c2 * C)}`, 'Make the coefficients of one letter the same, then subtract to eliminate it.', `a = ${money(A)}, c = ${money(C)}`], d: 4 };
  }
  const x = ri(rand, 5, 40), y = ri(rand, 1, x - 1);
  return { q: `Two numbers have a **sum of ${x + y}** and a **difference of ${x - y}**. Find the **larger** number.`, answer: x, steps: [`x + y = ${x + y} and x − y = ${x - y}`, `Add the equations: 2x = ${2 * x} → x = ${x}`, `y = ${y}`], d: 2 };
}

function quadRootsQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.5) {
    let p = nz(rand, -7, 7), q = nz(rand, -7, 7);
    if (p === q) q = p + 1 === 0 ? p + 2 : p + 1;
    const b = -(p + q), c = p * q;
    const sol = (u: number, v: number) => `x = ${neg(Math.min(u, v))} or x = ${neg(Math.max(u, v))}`;
    return mcq(rand, `Solve **x²${b === 0 ? '' : b === 1 ? ' + x' : b === -1 ? ' − x' : pm(b) + 'x'}${pm(c)} = 0**`, sol(p, q),
      [sol(-p, -q), sol(p, -q), sol(-p, q), `x = ${neg(c)} or x = ${neg(b)}`].filter((s, i, arr) => s !== sol(p, q) && arr.indexOf(s) === i),
      [`Find two numbers that multiply to ${c} and add to ${b}: ${neg(-p)} and ${neg(-q)}`, `(x${pm(-p)})(x${pm(-q)}) = 0`, `Each bracket = 0 → ${sol(p, q)} (the signs flip!)`], 3, ['Factorise first, then set each bracket equal to zero.']);
  }
  const n = ri(rand, 2, 12);
  return mcq(rand, `Factorise **x² − ${n * n}**`, `(x + ${n})(x − ${n})`, [`(x − ${n})²`, `(x + ${n})²`, `x(x − ${n * n})`, `(x − ${n * n})(x + 1)`], [`x² − ${n * n} is a difference of two squares: x² − ${n}²`, `a² − b² = (a + b)(a − b), so (x + ${n})(x − ${n})`, 'Check by expanding: the x terms cancel.'], 3);
}

function completeSquareQ(rand: () => number): GeneratedQuestion {
  const p = nz(rand, -6, 6), q = ri(rand, -10, 15);
  const k = q - p * p;
  const form = (a: number, b: number) => `(x${pm(a)})²${b === 0 ? '' : pm(b)}`;
  const expr = `x²${pm(2 * p).replace(/(\d+)$/, '$1x')}${q === 0 ? '' : pm(q)}`;
  if (rand() < 0.6) {
    return mcq(rand, `Write **${expr}** in the form (x + a)² + b.`, form(p, k), [form(2 * p, q - 4 * p * p), form(p, q + p * p), form(-p, k), form(p, q), form(p, k - p)].filter((x, i, arr) => x !== form(p, k) && arr.indexOf(x) === i),
      [`Halve the x coefficient: ${neg(2 * p)} ÷ 2 = ${neg(p)}, so (x${pm(p)})²`, `(x${pm(p)})² = x²${pm(2 * p)}x + ${p * p}, so subtract ${p * p} to get back to the original`, `${neg(q)} − ${p * p} = ${neg(k)}: ${form(p, k)}`], 5);
  }
  const P = (a: number, b: number) => `(${neg(a)}, ${neg(b)})`;
  return mcq(rand, `The curve **y = ${expr}** can be written as y = ${form(p, k)}. What are the coordinates of its **turning point**?`, P(-p, k), [P(p, k), P(-p, -k), P(k, -p), P(-p, q)].filter((x, i, arr) => x !== P(-p, k) && arr.indexOf(x) === i),
    [`y = (x${pm(p)})²${pm(k)} is smallest when the bracket is 0, i.e. x = ${neg(-p)}`, `Then y = ${k}, so the turning point is ${P(-p, k)}`, 'The sign of a flips for the x-coordinate; b stays the same.'], 5);
}

function functionsQ(rand: () => number): GeneratedQuestion {
  const a = nz(rand, -4, 5), b = nz(rand, -6, 8), c = ri(rand, -5, 5);
  const fx = (x: number) => a * x + b, gx = (x: number) => x * x + c;
  const k = pk(rand, ['fg', 'gf', 'inv', 'f']);
  const n = ri(rand, -4, 5);
  const fs = `f(x) = ${lin(a, b)}`, gs = `g(x) = x²${c === 0 ? '' : pm(c)}`;
  if (k === 'fg') return { q: `${fs} and ${gs}. Find **fg(${neg(n)})**.`, answer: fx(gx(n)), steps: [`fg(x) means do g first, then f.`, `g(${neg(n)}) = ${neg(n)}²${c === 0 ? '' : pm(c)} = ${gx(n)}`, `f(${gx(n)}) = ${a} × ${neg(gx(n))}${pm(b)} = ${fx(gx(n))}`], hints: ['fg(x) = f(g(x)): the function nearest x is done first.'], d: 4 };
  if (k === 'gf') return { q: `${fs} and ${gs}. Find **gf(${neg(n)})**.`, answer: gx(fx(n)), steps: ['gf(x) means do f first, then g.', `f(${neg(n)}) = ${fx(n)}`, `g(${neg(fx(n))}) = ${neg(fx(n))}²${c === 0 ? '' : pm(c)} = ${gx(fx(n))}`], d: 4 };
  if (k === 'inv') { const y = fx(n); return { q: `${fs}. Find **f⁻¹(${neg(y)})**.`, answer: n, steps: [`Let y = ${lin(a, b)} and rearrange: x = (y${pm(-b)}) ÷ ${neg(a)}`, `f⁻¹(${neg(y)}) = (${neg(y)}${pm(-b)}) ÷ ${neg(a)} = ${neg(n)}`, `Check: f(${neg(n)}) = ${y}`], hints: ['The inverse undoes f: reverse the operations in reverse order.'], d: 4 }; }
  return { q: `${fs}. Find **f(${neg(n)})**.`, answer: fx(n), steps: [`Substitute x = ${neg(n)}: ${a} × ${neg(n)}${pm(b)} = ${fx(n)}`], d: 2 };
}

function iterationQ(rand: () => number): GeneratedQuestion {
  const A = ri(rand, 3, 12), B = ri(rand, 1, 6);
  const x0 = ri(rand, 1, 3);
  const g = (x: number) => Math.cbrt(A + B * x);
  const x1 = g(x0), x2 = g(x1), x3 = g(x2);
  const ask = rand() < 0.5 ? 2 : 3;
  return { q: `Use the iteration formula **xₙ₊₁ = ∛(${A} + ${B === 1 ? '' : B}xₙ)** with **x₀ = ${x0}** to find **x${ask === 2 ? '₂' : '₃'}**, correct to 3 decimal places.`, answer: r(ask === 2 ? x2 : x3, 3), tol: 0.0006, steps: [`x₁ = ∛(${A} + ${B} × ${x0}) = ${r(x1, 6)}`, `x₂ = ∛(${A} + ${B} × ${r(x1, 6)}) = ${r(x2, 6)}`, ...(ask === 3 ? [`x₃ = ∛(${A} + ${B} × ${r(x2, 6)}) = ${r(x3, 6)}`] : []), `To 3 dp: ${r(ask === 2 ? x2 : x3, 3).toFixed(3)}`, 'Tip: type the formula once using ANS, then keep pressing = .'], d: 4 };
}

function formulaSubQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['suvat', 'triangle', 'speed', 'celsius']);
  if (k === 'suvat') { const u = ri(rand, 0, 12), a = ri(rand, 2, 6), t = ri(rand, 2, 9), v = u + a * t; return { q: `Use **v = u + at** to find **t** when v = ${v}, u = ${u} and a = ${a}.`, answer: t, steps: [`Rearrange: t = (v − u) ÷ a`, `t = (${v} − ${u}) ÷ ${a} = ${t}`], d: 2 }; }
  if (k === 'triangle') { const b = ri(rand, 3, 15), h = ri(rand, 2, 14); return { q: `Use **A = ½bh** to find **h** when A = ${f((b * h) / 2)} and b = ${b}.`, answer: h, steps: [`Rearrange: h = 2A ÷ b`, `h = 2 × ${f((b * h) / 2)} ÷ ${b} = ${h}`], d: 2 }; }
  if (k === 'speed') { const s = ri(rand, 3, 12) * 5, t = pk(rand, [2, 3, 4, 5]); return { q: `Use **s = d/t** to find **d** when s = ${s} and t = ${t}.`, answer: s * t, steps: [`Rearrange: d = s × t = ${s} × ${t} = ${s * t}`], d: 1 }; }
  const C = ri(rand, -2, 8) * 5, F = (9 * C) / 5 + 32;
  return { q: `Use **F = 9C/5 + 32** to find **C** when F = ${F}.`, answer: C, steps: [`Subtract 32: ${F} − 32 = ${F - 32}`, `Multiply by 5 and divide by 9: C = ${F - 32} × 5 ÷ 9 = ${C}`], d: 3 };
}

// =========================== RATIO & PROPORTION ===========================
function ratio2Q(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['simplify', 'fraction', 'difference', 'combine', 'given']);
  const a = ri(rand, 1, 7), b = ri(rand, 2, 9);
  if (gcd(a, b) !== 1 || a === b) return ratio2Q(rand);
  if (k === 'simplify') { const m = ri(rand, 3, 12); const g2 = m % 2 === 0 ? 2 : m % 3 === 0 ? 3 : 1; return mcq(rand, `Write the ratio **${a * m} : ${b * m}** in its simplest form.`, `${a} : ${b}`, [`${(a * m) / g2} : ${(b * m) / g2}`, `${b} : ${a}`, `${a * m - b * m < 0 ? b - a : a - b} : ${a + b}`, `1 : ${f(b / a)}`].filter((x) => x !== `${a} : ${b}` && !x.startsWith('0')), [`HCF of ${a * m} and ${b * m} is ${m}`, `Divide both by ${m}: ${a} : ${b}`], 1); }
  if (k === 'fraction') { return mcq(rand, `The ratio of boys to girls in a club is **${a} : ${b}**. What **fraction** of the club are girls?`, fstr(frac(b, a + b)), [fstr(frac(b, a)), fstr(frac(a, a + b)), fstr(frac(a, b)), `${a + b}/${b}`].filter((x) => x !== fstr(frac(b, a + b))), [`Total parts = ${a} + ${b} = ${a + b}`, `Girls are ${b} of the ${a + b} parts: ${fstr(frac(b, a + b))}`, `${b}/${a} would compare girls with BOYS, not with the whole club.`], 2); }
  if (k === 'difference') { const part = ri(rand, 3, 20); const big = Math.max(a, b), small = Math.min(a, b); return { q: `Money is shared between Amy and Ben in the ratio **${big} : ${small}**. Amy gets **£${(big - small) * part} more** than Ben. How much money was shared **in total**?`, answer: (big + small) * part, unit: '£', steps: [`Difference in parts = ${big} − ${small} = ${big - small}`, `${big - small} parts = £${(big - small) * part}, so 1 part = £${part}`, `Total = ${big + small} parts = £${(big + small) * part}`], d: 4 }; }
  if (k === 'combine') {
    const p2 = ri(rand, 2, 6), q2 = ri(rand, 1, 7);
    if (gcd(p2, q2) !== 1 || p2 === b) return ratio2Q(rand);
    const L = (b * p2) / gcd(b, p2);
    const tri = [(a * L) / b, L, (q2 * L) / p2];
    const g3 = gcd(gcd(tri[0], tri[1]), tri[2]);
    const show = (t: number[]) => t.join(' : ');
    const right = show(tri.map((x) => x / g3));
    const same = (t: number[]) => t[0] * tri[1] === t[1] * tri[0] && t[1] * tri[2] === t[2] * tri[1];
    const wrong = [[a, b, q2], [a, b + p2, q2], [a, p2, q2], [a * p2, b, q2 * b]].filter((t) => !same(t)).map(show);
    return mcq(rand, `**A : B = ${a} : ${b}** and **B : C = ${p2} : ${q2}**. Write **A : B : C** in its simplest form.`, right, wrong, [`Make B the same in both ratios: LCM of ${b} and ${p2} is ${L}`, `A : B = ${(a * L) / b} : ${L} (× ${L / b}); B : C = ${L} : ${(q2 * L) / p2} (× ${L / p2})`, `A : B : C = ${show(tri)}${g3 > 1 ? ` = ${right}` : ''}`], 4);
  }
  const x = a * ri(rand, 2, 9);
  return { q: `**x : y = ${a} : ${b}**. If **x = ${x}**, find **y**.`, answer: (x / a) * b, steps: [`${x} ÷ ${a} = ${x / a} (one part)`, `y = ${b} × ${x / a} = ${(x / a) * b}`], d: 2 };
}

function proportion2Q(rand: () => number): GeneratedQuestion {
  if (rand() < 0.5) {
    const n = pk(rand, [4, 6, 8]), m = pk(rand, [3, 5, 10, 12, 14]), g = ri(rand, 3, 12) * n * 5;
    if (m === n) return proportion2Q(rand);
    const ing = pk(rand, ['flour', 'sugar', 'butter', 'rice']);
    return { q: `A recipe for **${n} people** uses **${g} g of ${ing}**. How much ${ing} is needed for **${m} people**?`, answer: r((g / n) * m, 2), unit: 'g', steps: [`For 1 person: ${g} ÷ ${n} = ${f(g / n)} g`, `For ${m} people: ${f(g / n)} × ${m} = ${f((g / n) * m)} g`], d: 2 };
  }
  const w = pk(rand, [2, 3, 4, 6]), d = pk(rand, [6, 8, 12, 15, 18, 24]), w2 = pk(rand, [3, 4, 6, 8, 9, 12]);
  if (w2 === w || (w * d) % w2 !== 0) return proportion2Q(rand);
  return { q: `**${w} builders** take **${d} days** to build a wall. How long would **${w2} builders** take, working at the same rate?`, answer: (w * d) / w2, unit: 'days', steps: [`This is INVERSE proportion: more builders → fewer days.`, `Total work = ${w} × ${d} = ${w * d} builder-days`, `${w * d} ÷ ${w2} = ${(w * d) / w2} days`], hints: ['Will more workers take more time or less time?'], d: 3 };
}

function unitsQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['kmh-ms', 'ms-kmh', 'area', 'vol', 'litre']);
  if (k === 'kmh-ms') { const v = pk(rand, [18, 36, 54, 72, 90, 108, 126]); return { q: `Convert **${v} km/h** to **m/s**.`, answer: v / 3.6, unit: 'm/s', steps: [`${v} km/h = ${v * 1000} m per 3600 s`, `${v * 1000} ÷ 3600 = ${v / 3.6} m/s`], d: 3 }; }
  if (k === 'ms-kmh') { const v = ri(rand, 2, 40); return { q: `Convert **${v} m/s** to **km/h**.`, answer: r(v * 3.6, 2), unit: 'km/h', steps: [`${v} m/s = ${v * 3600} m per hour`, `${v * 3600} m = ${f(v * 3.6)} km, so ${f(v * 3.6)} km/h`], d: 3 }; }
  if (k === 'area') { const m2 = pk(rand, [1.5, 2, 2.4, 3.5, 0.6, 12]); return mcq(rand, `Convert **${m2} m²** to **cm²**.`, comma(m2 * 10000), [comma(m2 * 100), comma(m2 * 1000), comma(m2 * 1000000), comma(m2 * 200)], ['1 m = 100 cm, so 1 m² = 100 × 100 = 10,000 cm²', `${m2} × 10,000 = ${comma(m2 * 10000)} cm²`], 3); }
  if (k === 'vol') { const cm3 = pk(rand, [2500, 750, 1200, 4000, 350]); return mcq(rand, `How many **litres** is **${comma(cm3)} cm³**?`, f(cm3 / 1000), [f(cm3 / 100), f(cm3 / 10), f(cm3 / 10000), comma(cm3 * 1000)], ['1 litre = 1000 cm³', `${comma(cm3)} ÷ 1000 = ${f(cm3 / 1000)} litres`], 2); }
  const [a, b, c] = [ri(rand, 20, 80), ri(rand, 10, 50), ri(rand, 10, 40)];
  return { q: `A fish tank is a cuboid **${a} cm × ${b} cm × ${c} cm**. How many **litres** of water does it hold when full?`, answer: (a * b * c) / 1000, unit: 'litres', steps: [`Volume = ${a} × ${b} × ${c} = ${comma(a * b * c)} cm³`, `1 litre = 1000 cm³, so ${comma(a * b * c)} ÷ 1000 = ${f((a * b * c) / 1000)} litres`], d: 3 };
}

function pressureQ(rand: () => number): GeneratedQuestion {
  const F = ri(rand, 2, 60) * 10, A = pk(rand, [0.2, 0.25, 0.5, 2, 4, 5]);
  const P = F / A;
  const k = pk(rand, ['P', 'F', 'A']);
  if (k === 'P') return { q: `A force of **${F} N** acts on an area of **${A} m²**. Find the **pressure**.`, answer: r(P, 2), unit: 'N/m²', steps: [`Pressure = force ÷ area = ${F} ÷ ${A} = ${f(P)} N/m²`], d: 2 };
  if (k === 'F') return { q: `The pressure on an area of **${A} m²** is **${f(P)} N/m²**. Find the **force**.`, answer: F, unit: 'N', steps: [`Force = pressure × area = ${f(P)} × ${A} = ${F} N`], d: 2 };
  return { q: `A force of **${F} N** produces a pressure of **${f(P)} N/m²**. Find the **area**.`, answer: A, unit: 'm²', steps: [`Area = force ÷ pressure = ${F} ÷ ${f(P)} = ${A} m²`], d: 3 };
}

function graphRatesQ(rand: () => number): GeneratedQuestion {
  const u = ri(rand, 0, 8), v = u + ri(rand, 4, 20), t = ri(rand, 2, 10);
  if (rand() < 0.5) return { q: `A velocity-time graph is a straight line from **${u} m/s** to **${v} m/s** over **${t} seconds**. What is the **acceleration**?`, answer: r((v - u) / t, 2), unit: 'm/s²', steps: [`Acceleration = gradient = change in velocity ÷ time`, `(${v} − ${u}) ÷ ${t} = ${f((v - u) / t)} m/s²`], d: 3 };
  return { q: `A velocity-time graph is a straight line from **${u} m/s** to **${v} m/s** over **${t} seconds**. How far does the object travel in that time?`, answer: ((u + v) / 2) * t, unit: 'm', steps: ['Distance = area under the velocity-time graph', `The area is a trapezium: ½ × (${u} + ${v}) × ${t} = ${f(((u + v) / 2) * t)} m`], hints: ['Distance is the AREA under a velocity-time graph; acceleration is the GRADIENT.'], d: 4 };
}

// =========================== GEOMETRY ===========================
function angleFactsQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['line', 'point', 'iso-base', 'iso-apex', 'co-interior', 'alternate', 'exterior']);
  if (k === 'line') { const a = ri(rand, 20, 160), b = ri(rand, 5, 175 - a); return { q: `Three angles lie on a straight line: **${a}°**, **${b}°** and **x**. Find **x**.`, answer: 180 - a - b, unit: '°', steps: ['Angles on a straight line add up to 180°', `x = 180 − ${a} − ${b} = ${180 - a - b}°`], d: 1 }; }
  if (k === 'point') { const a = ri(rand, 40, 150), b = ri(rand, 30, 130), c = ri(rand, 20, Math.max(25, 340 - a - b)); if (a + b + c >= 355) return angleFactsQ(rand); return { q: `Four angles meet at a point: **${a}°**, **${b}°**, **${c}°** and **y**. Find **y**.`, answer: 360 - a - b - c, unit: '°', steps: ['Angles around a point add up to 360°', `y = 360 − ${a} − ${b} − ${c} = ${360 - a - b - c}°`], d: 1 }; }
  if (k === 'iso-base') { const apex = 2 * ri(rand, 10, 70); return { q: `An isosceles triangle has a **${apex}°** angle between its two equal sides. Find each of the other two angles.`, answer: (180 - apex) / 2, unit: '°', steps: ['The two base angles are equal.', `(180 − ${apex}) ÷ 2 = ${(180 - apex) / 2}°`], d: 2 }; }
  if (k === 'iso-apex') { const base = ri(rand, 30, 80); return { q: `In an isosceles triangle, the two **equal angles** are each **${base}°**. Find the third angle.`, answer: 180 - 2 * base, unit: '°', steps: [`180 − 2 × ${base} = ${180 - 2 * base}°`], d: 1 }; }
  if (k === 'co-interior') { const a = ri(rand, 40, 140); return { q: `Angles **p** and **q** are **co-interior** angles between two parallel lines. p = **${a}°**. Find **q**.`, answer: 180 - a, unit: '°', steps: ['Co-interior (allied) angles add up to 180° - they are NOT equal.', `q = 180 − ${a} = ${180 - a}°`], hints: ['Co-interior angles make a C (or U) shape.'], d: 2 }; }
  if (k === 'alternate') {
    const pair = pk(rand, [['alternate', 'equal', 'Z'], ['corresponding', 'equal', 'F'], ['vertically opposite', 'equal', 'X'], ['co-interior', 'add up to 180°', 'C']] as const);
    const ans = pair[1] === 'equal' ? 'They are equal' : 'They add up to 180°';
    return mcq(rand, `Which statement about **${pair[0]}** angles (on parallel lines) is true?`, ans, ['They are equal', 'They add up to 180°', 'They add up to 360°', 'They add up to 90°'].filter((x) => x !== ans), [`${pair[0].charAt(0).toUpperCase()}${pair[0].slice(1)} angles (${pair[2]} shape) ${pair[1]}.`, 'Alternate (Z), corresponding (F) and vertically opposite (X) angles are equal; co-interior (C) angles add to 180°.'], 2);
  }
  const a = ri(rand, 30, 80), b = ri(rand, 30, 80);
  return { q: `A triangle has interior angles **${a}°** and **${b}°**. Find the **exterior angle** at the third vertex.`, answer: a + b, unit: '°', steps: ['The exterior angle of a triangle equals the sum of the two opposite interior angles.', `${a} + ${b} = ${a + b}°`, `(Check: third angle = ${180 - a - b}°, and 180 − ${180 - a - b} = ${a + b}°)`], d: 3 };
}

function bearingsQ(rand: () => number): GeneratedQuestion {
  let t = ri(rand, 5, 355);
  if (t === 180) t = 181;
  const back = t < 180 ? t + 180 : t - 180;
  const b3 = (x: number) => String(x).padStart(3, '0');
  return { q: `The bearing of B from A is **${b3(t)}°**. Find the **bearing of A from B**.`, answer: back, unit: '°', steps: ['Back bearings differ by 180°.', t < 180 ? `${b3(t)}° + 180° = ${b3(back)}°` : `${b3(t)}° − 180° = ${b3(back)}°`, 'Bearings are measured clockwise from North and written with 3 figures.'], hints: ['Draw North lines at both points; the angles between them are co-interior.'], d: 3 };
}

function compoundAreaQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['L', 'semi-area', 'semi-perim', 'ring']);
  if (k === 'L') { const a = ri(rand, 8, 20), b = ri(rand, 6, 16), c = ri(rand, 2, a - 3), d = ri(rand, 2, b - 3); return { q: `An L-shape is made by cutting a **${c} cm × ${d} cm** rectangle from the corner of a **${a} cm × ${b} cm** rectangle. Find the area of the L-shape.`, answer: a * b - c * d, unit: 'cm²', steps: [`Large rectangle: ${a} × ${b} = ${a * b} cm²`, `Cut-out: ${c} × ${d} = ${c * d} cm²`, `L-shape: ${a * b} − ${c * d} = ${a * b - c * d} cm²`], d: 2 }; }
  const rr = ri(rand, 2, 12);
  if (k === 'semi-area') return { q: `Find the area of a **semicircle** with diameter **${2 * rr} cm** (1 dp).`, answer: r((Math.PI * rr * rr) / 2, 1), unit: 'cm²', tol: 0.051, steps: [`Radius = ${rr} cm`, `Semicircle = ½ × π × ${rr}² = ${r((Math.PI * rr * rr) / 2, 3)}`], hints: ['Halve the diameter to get the radius, then halve the circle area.'], d: 3 };
  if (k === 'semi-perim') return { q: `Find the **perimeter** of a **semicircle** with radius **${rr} cm** (1 dp).`, answer: r(Math.PI * rr + 2 * rr, 1), unit: 'cm', tol: 0.051, steps: [`Curved part = ½ × 2π × ${rr} = ${r(Math.PI * rr, 3)} cm`, `Plus the straight diameter: ${2 * rr} cm`, `Perimeter = ${r(Math.PI * rr + 2 * rr, 3)} cm`], hints: ['Don\'t forget the straight edge (the diameter).'], d: 4 };
  const R = rr + ri(rand, 1, 6);
  return { q: `A ring is the region between two circles with the same centre, of radii **${R} cm** and **${rr} cm**. Find its area (1 dp).`, answer: r(Math.PI * (R * R - rr * rr), 1), unit: 'cm²', tol: 0.051, steps: [`Big circle − small circle = π × ${R}² − π × ${rr}²`, `= π × ${R * R - rr * rr} = ${r(Math.PI * (R * R - rr * rr), 3)} cm²`], d: 3 };
}

function volume2Q(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['sphere', 'cone', 'pyramid', 'sa-cuboid', 'sa-cyl']);
  const a = ri(rand, 2, 10), b = ri(rand, 2, 12), c = ri(rand, 2, 15);
  if (k === 'sphere') return { q: `Find the volume of a sphere with radius **${a} cm** (1 dp). (V = 4/3 πr³)`, answer: r((4 / 3) * Math.PI * a ** 3, 1), unit: 'cm³', tol: 0.051, steps: [`V = 4/3 × π × ${a}³ = 4/3 × π × ${a ** 3}`, `= ${r((4 / 3) * Math.PI * a ** 3, 3)} cm³`], d: 3 };
  if (k === 'cone') return { q: `Find the volume of a cone with radius **${a} cm** and perpendicular height **${c} cm** (1 dp). (V = ⅓πr²h)`, answer: r((Math.PI * a * a * c) / 3, 1), unit: 'cm³', tol: 0.051, steps: [`V = ⅓ × π × ${a}² × ${c}`, `= ${r((Math.PI * a * a * c) / 3, 3)} cm³`], d: 3 };
  if (k === 'pyramid') return { q: `A pyramid has a rectangular base **${a} cm × ${b} cm** and a perpendicular height of **${3 * c} cm**. Find its volume.`, answer: a * b * c, unit: 'cm³', steps: [`Base area = ${a} × ${b} = ${a * b} cm²`, `V = ⅓ × base area × height = ⅓ × ${a * b} × ${3 * c} = ${a * b * c} cm³`], d: 3 };
  if (k === 'sa-cuboid') return { q: `Find the **total surface area** of a cuboid **${a} cm × ${b} cm × ${c} cm**.`, answer: 2 * (a * b + b * c + a * c), unit: 'cm²', steps: [`Three pairs of faces: ${a}×${b} = ${a * b}, ${b}×${c} = ${b * c}, ${a}×${c} = ${a * c}`, `2 × (${a * b} + ${b * c} + ${a * c}) = ${2 * (a * b + b * c + a * c)} cm²`], hints: ['A cuboid has 6 faces in 3 matching pairs.'], d: 3 };
  return { q: `Find the **total surface area** of a closed cylinder with radius **${a} cm** and height **${c} cm** (1 dp).`, answer: r(2 * Math.PI * a * a + 2 * Math.PI * a * c, 1), unit: 'cm²', tol: 0.051, steps: [`Two circles: 2 × π × ${a}² = ${r(2 * Math.PI * a * a, 3)}`, `Curved surface: 2π × ${a} × ${c} = ${r(2 * Math.PI * a * c, 3)}`, `Total = ${r(2 * Math.PI * a * a + 2 * Math.PI * a * c, 3)} cm²`], d: 4 };
}

function pythagAppsQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['ladder', 'diagonal', 'coords', 'check', 'iso']);
  if (k === 'ladder') { const [a, , c] = pk(rand, [[3, 4, 5], [5, 12, 13], [6, 8, 10], [7, 24, 25], [8, 15, 17]] as const); const s = pk(rand, [0.5, 1]); return { q: `A **${f(c * s)} m** ladder leans against a vertical wall. Its foot is **${f(a * s)} m** from the wall. How high up the wall does it reach?`, answer: r(Math.sqrt((c * s) ** 2 - (a * s) ** 2), 2), unit: 'm', tol: 0.006, steps: ['The ladder is the hypotenuse.', `h² = ${f(c * s)}² − ${f(a * s)}² = ${f((c * s) ** 2)} − ${f((a * s) ** 2)} = ${f((c * s) ** 2 - (a * s) ** 2)}`, `h = ${f(Math.sqrt((c * s) ** 2 - (a * s) ** 2))} m`], d: 3 }; }
  if (k === 'diagonal') { const a = ri(rand, 3, 20), b = ri(rand, 3, 20); return { q: `Find the length of the diagonal of a rectangle **${a} cm by ${b} cm** (1 dp).`, answer: r(Math.hypot(a, b), 1), unit: 'cm', tol: 0.051, steps: [`d² = ${a}² + ${b}² = ${a * a + b * b}`, `d = √${a * a + b * b} = ${r(Math.hypot(a, b), 3)} cm`], d: 2 }; }
  if (k === 'coords') { const x1 = ri(rand, -5, 5), y1 = ri(rand, -5, 5), x2 = x1 + nz(rand, -7, 7), y2 = y1 + nz(rand, -7, 7); const d = Math.hypot(x2 - x1, y2 - y1); return { q: `Find the distance between **(${neg(x1)}, ${neg(y1)})** and **(${neg(x2)}, ${neg(y2)})** (1 dp).`, answer: r(d, 1), tol: 0.051, steps: [`Horizontal distance = ${Math.abs(x2 - x1)}, vertical distance = ${Math.abs(y2 - y1)}`, `d = √(${Math.abs(x2 - x1)}² + ${Math.abs(y2 - y1)}²) = √${(x2 - x1) ** 2 + (y2 - y1) ** 2} = ${r(d, 3)}`], d: 3 }; }
  if (k === 'iso') { const half = ri(rand, 3, 9), side = half + ri(rand, 2, 8); return { q: `An isosceles triangle has two sides of **${side} cm** and a base of **${2 * half} cm**. Find its **perpendicular height** (1 dp).`, answer: r(Math.sqrt(side * side - half * half), 1), unit: 'cm', tol: 0.051, steps: [`The height splits the base in half: ${half} cm`, `h² = ${side}² − ${half}² = ${side * side - half * half}`, `h = ${r(Math.sqrt(side * side - half * half), 3)} cm`], d: 3 }; }
  const right = rand() < 0.5;
  const [a, b, c] = right ? pk(rand, [[5, 12, 13], [8, 15, 17], [9, 40, 41], [20, 21, 29], [12, 35, 37]] as const) : pk(rand, [[6, 9, 11], [7, 10, 12], [5, 11, 12], [9, 12, 16], [10, 13, 17]] as const);
  return mcq(rand, `A triangle has sides **${a} cm, ${b} cm and ${c} cm**. Is it right-angled?`, right ? `Yes, because ${a}² + ${b}² = ${c}²` : `No, because ${a}² + ${b}² ≠ ${c}²`, right ? [`No, because ${a}² + ${b}² ≠ ${c}²`, `No, because ${a} + ${b} ≠ ${c}`, `Yes, because ${a} + ${b} > ${c}`] : [`Yes, because ${a}² + ${b}² = ${c}²`, `Yes, because ${a} + ${b} > ${c}`, `No, because ${a} + ${b} ≠ ${c}`],
    [`${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}; ${c}² = ${c * c}`, right ? 'Equal, so Pythagoras works: it IS right-angled.' : 'Not equal, so it is NOT right-angled.'], 3);
}

const EXACT: [string, string][] = [['sin 30°', '1/2'], ['cos 60°', '1/2'], ['sin 60°', '√3/2'], ['cos 30°', '√3/2'], ['tan 45°', '1'], ['sin 45°', '1/√2'], ['cos 45°', '1/√2'], ['tan 30°', '1/√3'], ['tan 60°', '√3'], ['sin 90°', '1'], ['cos 0°', '1'], ['sin 0°', '0'], ['cos 90°', '0'], ['tan 0°', '0']];
function trig2Q(rand: () => number): GeneratedQuestion {
  if (rand() < 0.55) {
    const [e, v] = pk(rand, EXACT);
    const vals = ['0', '1/2', '1/√2', '√3/2', '1', '√3', '1/√3'];
    return mcq(rand, `What is the **exact value** of **${e}**?`, v, vals.filter((x) => x !== v), [`${e} = ${v}`, 'Learn: sin 30 = cos 60 = ½, sin 60 = cos 30 = √3/2, sin 45 = cos 45 = 1/√2, tan 45 = 1, tan 30 = 1/√3, tan 60 = √3.'], 3);
  }
  const d = ri(rand, 10, 80), ang = ri(rand, 15, 65);
  return { q: `From a point **${d} m** from the base of a tower, the **angle of elevation** to the top is **${ang}°**. Find the height of the tower (1 dp).`, answer: r(d * Math.tan(rad(ang)), 1), unit: 'm', tol: 0.051, steps: ['Opposite = height, adjacent = distance → TOA', `h = ${d} × tan ${ang}° = ${r(d * Math.tan(rad(ang)), 3)} m`], hints: ['Angle of elevation is measured UP from the horizontal.'], d: 3 };
}

function sineRuleQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.4) {
    const A = ri(rand, 30, 80), B = ri(rand, 30, 80), a = ri(rand, 5, 20);
    if (A + B >= 170) return sineRuleQ(rand);
    const b = (a * Math.sin(rad(B))) / Math.sin(rad(A));
    return { q: `In triangle ABC, angle A = **${A}°**, angle B = **${B}°** and side a = **${a} cm**. Find side **b** (1 dp).`, answer: r(b, 1), unit: 'cm', tol: 0.051, steps: ['A side and its opposite angle are known → sine rule', `b / sin ${B}° = ${a} / sin ${A}°`, `b = ${a} × sin ${B}° ÷ sin ${A}° = ${r(b, 3)} cm`], d: 4 };
  }
  if (k < 0.7) {
    const A = ri(rand, 40, 100), a = ri(rand, 10, 20), b = ri(rand, 4, a - 1);
    const B = (Math.asin((b * Math.sin(rad(A))) / a) * 180) / Math.PI;
    return { q: `In triangle ABC, side a = **${a} cm**, side b = **${b} cm** and angle A = **${A}°**. Find angle **B** (1 dp).`, answer: r(B, 1), unit: '°', tol: 0.051, steps: [`sin B / ${b} = sin ${A}° / ${a}`, `sin B = ${b} × sin ${A}° ÷ ${a} = ${r(Math.sin(rad(B)), 4)}`, `B = sin⁻¹(${r(Math.sin(rad(B)), 4)}) = ${r(B, 3)}°`], d: 5 };
  }
  for (;;) {
    const a = ri(rand, 4, 15), b = ri(rand, 4, 15), c = ri(rand, 4, 15);
    if (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1) continue;
    const C = (Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180) / Math.PI;
    return { q: `A triangle has sides **a = ${a} cm**, **b = ${b} cm** and **c = ${c} cm**. Find angle **C** (opposite side c) to 1 dp.`, answer: r(C, 1), unit: '°', tol: 0.051, steps: ['Three sides known → cosine rule for an angle', `cos C = (a² + b² − c²) ÷ 2ab = (${a * a} + ${b * b} − ${c * c}) ÷ ${2 * a * b} = ${r((a * a + b * b - c * c) / (2 * a * b), 4)}`, `C = cos⁻¹(…) = ${r(C, 3)}°`], d: 5 };
  }
}

function similarQ(rand: () => number): GeneratedQuestion {
  const k = ri(rand, 2, 4) * pk(rand, [1, 1.5]), s = ri(rand, 3, 12);
  if (rand() < 0.5) return { q: `Two triangles are **similar**. A side of **${s} cm** on the small triangle matches a side of **${f(s * k)} cm** on the large one. Another side on the small triangle is **${s + 2} cm**. Find the matching side on the large triangle.`, answer: r((s + 2) * k, 2), unit: 'cm', steps: [`Scale factor = ${f(s * k)} ÷ ${s} = ${f(k)}`, `${s + 2} × ${f(k)} = ${f((s + 2) * k)} cm`], d: 3 };
  let t = ri(rand, 3, 12);
  if (t === s) t += 1;
  return { q: `Two similar triangles: a side of **${f(s * k)} cm** on the large one matches **${s} cm** on the small one. A different side on the large triangle is **${f(t * k)} cm**. Find the matching side on the small triangle.`, answer: t, unit: 'cm', steps: [`Scale factor (small → large) = ${f(s * k)} ÷ ${s} = ${f(k)}`, `${f(t * k)} ÷ ${f(k)} = ${t} cm`, 'Going from large to small, DIVIDE by the scale factor.'], d: 3 };
}

function similarAVQ(rand: () => number): GeneratedQuestion {
  const k = ri(rand, 2, 4), A = ri(rand, 3, 20);
  if (rand() < 0.5) return mcq(rand, `Shape B is an enlargement of shape A with **length scale factor ${k}**. Shape A has area **${A} cm²**. What is the area of shape B?`, `${A * k * k} cm²`, [`${A * k} cm²`, `${A * k * k * k} cm²`, `${A * 2 * k} cm²`, `${A + k * k} cm²`], [`Area scale factor = (length scale factor)² = ${k}² = ${k * k}`, `${A} × ${k * k} = ${A * k * k} cm²`], 4);
  return mcq(rand, `Two similar solids have **length scale factor ${k}**. The smaller has volume **${A} cm³**. What is the volume of the larger?`, `${A * k ** 3} cm³`, [`${A * k} cm³`, `${A * k * k} cm³`, `${A * 3 * k} cm³`, `${A + k ** 3} cm³`], [`Volume scale factor = ${k}³ = ${k ** 3}`, `${A} × ${k ** 3} = ${A * k ** 3} cm³`], 5);
}

const CIRCLE_PARTS: [string, string][] = [
  ['the radius', 'a straight line from the centre to the edge of the circle'],
  ['the diameter', 'a straight line from edge to edge through the centre'],
  ['a chord', 'a straight line joining two points on the circle that does not have to pass through the centre'],
  ['a tangent', 'a straight line outside the circle that touches it at exactly one point'],
  ['an arc', 'part of the circumference'],
  ['a sector', 'a "pizza slice" region between two radii and an arc'],
  ['a segment', 'the region between a chord and an arc'],
  ['the circumference', 'the whole distance around the edge of the circle'],
];
function circlePartsQ(rand: () => number): GeneratedQuestion {
  const [name, desc] = pk(rand, CIRCLE_PARTS);
  if (rand() < 0.5) return mcq(rand, `Which part of a circle is this?\n\n> ${desc.charAt(0).toUpperCase()}${desc.slice(1)}`, name, CIRCLE_PARTS.filter((p) => p[0] !== name).map((p) => p[0]), [`${name.charAt(0).toUpperCase()}${name.slice(1)}: ${desc}.`, 'Sector = between two radii; segment = between a chord and an arc.'], 1);
  return mcq(rand, `What is **${name}** of a circle?`, desc, CIRCLE_PARTS.filter((p) => p[0] !== name).map((p) => p[1]), [`${name.charAt(0).toUpperCase()}${name.slice(1)}: ${desc}.`], 1);
}

function scaleQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.5) {
    const s = pk(rand, [25000, 50000, 10000, 20000, 100000]), cm = ri(rand, 2, 18) + pk(rand, [0, 0.5]);
    return { q: `A map has a scale of **1 : ${comma(s)}**. Two towns are **${f(cm)} cm** apart on the map. How far apart are they in real life, in **km**?`, answer: r((cm * s) / 100000, 3), unit: 'km', steps: [`Real distance = ${f(cm)} × ${comma(s)} = ${comma(cm * s)} cm`, `÷ 100 = ${comma((cm * s) / 100)} m; ÷ 1000 = ${f((cm * s) / 100000)} km`], hints: ['100 cm = 1 m and 1000 m = 1 km, so divide cm by 100,000 for km.'], d: 3 };
  }
  const m = pk(rand, [2, 5, 10, 20]), real = m * (ri(rand, 2, 14) + pk(rand, [0, 0.5]));
  return { q: `A scale drawing uses **1 cm to represent ${m} m**. A wall is **${f(real)} m** long. How long is it on the drawing?`, answer: r(real / m, 2), unit: 'cm', steps: [`${f(real)} ÷ ${m} = ${f(real / m)} cm`], d: 2 };
}

// =========================== PROBABILITY & STATISTICS ===========================
function probMoreQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['missing', 'expected', 'relative', 'x2x']);
  if (k === 'missing') { const ps = [ri(rand, 5, 30), ri(rand, 5, 30), ri(rand, 5, 25)].map((x) => x / 100); const rest = r(1 - ps[0] - ps[1] - ps[2], 2); if (rest <= 0) return probMoreQ(rand); return { q: `A spinner can land on red, blue, green or yellow. P(red) = ${ps[0]}, P(blue) = ${ps[1]}, P(green) = ${ps[2]}. Find **P(yellow)**.`, answer: rest, steps: [`Probabilities add up to 1`, `P(yellow) = 1 − ${ps[0]} − ${ps[1]} − ${ps[2]} = ${rest}`], d: 1 }; }
  if (k === 'expected') { const p = pk(rand, [0.15, 0.2, 0.25, 0.35, 0.4, 0.05]), n = pk(rand, [60, 80, 120, 200, 300, 500]); return { q: `The probability that a biased coin lands on heads is **${p}**. It is thrown **${n} times**. How many heads would you **expect**?`, answer: r(p * n, 2), steps: [`Expected frequency = probability × number of trials = ${p} × ${n} = ${f(p * n)}`], d: 1 }; }
  if (k === 'relative') { const n = pk(rand, [40, 50, 80, 100, 200]), x = ri(rand, 5, n - 5); return { q: `A drawing pin is dropped **${n} times** and lands point up **${x} times**. What is the **relative frequency** of landing point up? (decimal)`, answer: r(x / n, 4), steps: [`Relative frequency = ${x} ÷ ${n} = ${f(x / n)}`, 'More trials give a more reliable estimate of the probability.'], d: 2 }; }
  const known = ri(rand, 1, 4) / 10;
  const x = r((1 - known) / 3, 4);
  return { q: `A bag holds red, blue and green counters. P(red) = **${known}**. P(green) is **twice** P(blue). Find **P(blue)** (to 4 dp if needed).`, answer: x, tol: 0.0001, steps: [`Let P(blue) = x, so P(green) = 2x`, `${known} + x + 2x = 1 → 3x = ${f(1 - known)}`, `x = ${f(x)}`], d: 3 };
}

function twoDiceQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['sum', 'double', 'product-even', 'sum-over']);
  const all: [number, number][] = [];
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) all.push([a, b]);
  let n = 0, label = '';
  if (k === 'sum') { const s = ri(rand, 3, 11); n = all.filter(([a, b]) => a + b === s).length; label = `the total is ${s}`; }
  else if (k === 'double') { n = 6; label = 'a double (both dice the same)'; }
  else if (k === 'product-even') { n = all.filter(([a, b]) => (a * b) % 2 === 0).length; label = 'the product of the scores is even'; }
  else { const s = ri(rand, 7, 10); n = all.filter(([a, b]) => a + b > s).length; label = `the total is more than ${s}`; }
  const res = frac(n, 36);
  return { q: `Two fair six-sided dice are rolled. Find the probability that **${label}**. Give your answer as a fraction.`, answer: fstr(res), accept: [...facc(res), `${n}/36`], steps: ['There are 6 × 6 = 36 equally likely outcomes (draw a sample space grid).', `Outcomes where ${label}: ${n}`, `P = ${n}/36${fstr(res) !== `${n}/36` ? ` = ${fstr(res)}` : ''}`], hints: ['Make a 6 × 6 grid of all the outcomes.'], d: 3 };
}

function vennQ(rand: () => number): GeneratedQuestion {
  const a = ri(rand, 3, 15), both = ri(rand, 2, 10), b = ri(rand, 3, 15), none = ri(rand, 1, 10);
  const N = a + b + both + none;
  const k = pk(rand, ['union', 'A', 'only', 'neither']);
  const ctx = `In a class of **${N}** students, **${a + both}** study French, **${b + both}** study Spanish and **${both}** study both.`;
  const ans = k === 'union' ? a + b + both : k === 'A' ? a + both : k === 'only' ? a : none;
  const label = k === 'union' ? 'study French or Spanish (or both)' : k === 'A' ? 'study French' : k === 'only' ? 'study French but not Spanish' : 'study neither language';
  const res = frac(ans, N);
  return { q: `${ctx} A student is picked at random. Find the probability that they **${label}**.`, answer: fstr(res), accept: [...facc(res), `${ans}/${N}`], steps: [`Fill the Venn diagram from the middle: both = ${both}, French only = ${a + both} − ${both} = ${a}, Spanish only = ${b + both} − ${both} = ${b}`, `Neither = ${N} − ${a} − ${both} − ${b} = ${none}`, `${label}: ${ans} students, so P = ${ans}/${N}${fstr(res) !== `${ans}/${N}` ? ` = ${fstr(res)}` : ''}`], hints: ['Start with the overlap (both) and work outwards.'], d: 3 };
}

function vennCondQ(rand: () => number): GeneratedQuestion {
  const a = ri(rand, 3, 15), both = ri(rand, 2, 10), b = ri(rand, 3, 15), none = ri(rand, 1, 10);
  const N = a + b + both + none;
  const res = frac(both, b + both);
  return { q: `In a group of **${N}** people, **${a + both}** own a cat, **${b + both}** own a dog and **${both}** own both. A dog owner is picked at random. Find the probability that they **also own a cat**.`, answer: fstr(res), accept: [...facc(res), `${both}/${b + both}`], steps: ['"Given they own a dog" means only count dog owners: the new total is ' + (b + both), `Dog owners who also own a cat: ${both}`, `P(cat | dog) = ${both}/${b + both}${fstr(res) !== `${both}/${b + both}` ? ` = ${fstr(res)}` : ''}`, `Not ${both}/${N}: that is P(cat AND dog) for anyone in the group.`], d: 5 };
}

function treeRepQ(rand: () => number): GeneratedQuestion {
  const red = ri(rand, 2, 7), blue = ri(rand, 2, 7), t = red + blue;
  const k = pk(rand, ['both', 'atleast', 'onefeach']);
  const pr = frac(red, t);
  if (k === 'both') { const res = frac(red * red, t * t); return { q: `A bag has **${red} red** and **${blue} blue** balls. A ball is taken, **replaced**, and a second ball is taken. Find **P(both red)**.`, answer: fstr(res), accept: [...facc(res), `${red * red}/${t * t}`], steps: [`With replacement, the probabilities stay the same: P(red) = ${fstr(pr)} each time`, `${red}/${t} × ${red}/${t} = ${red * red}/${t * t}${fstr(res) !== `${red * red}/${t * t}` ? ` = ${fstr(res)}` : ''}`], d: 3 }; }
  if (k === 'atleast') { const res = frac(t * t - blue * blue, t * t); return { q: `A bag has **${red} red** and **${blue} blue** balls. A ball is taken, **replaced**, and a second is taken. Find **P(at least one red)**.`, answer: fstr(res), accept: [...facc(res), `${t * t - blue * blue}/${t * t}`], steps: ['At least one red = 1 − P(no reds) = 1 − P(both blue)', `P(both blue) = ${blue}/${t} × ${blue}/${t} = ${blue * blue}/${t * t}`, `1 − ${blue * blue}/${t * t} = ${fstr(res)}`], d: 4 }; }
  const res = frac(2 * red * blue, t * t);
  return { q: `A bag has **${red} red** and **${blue} blue** balls. A ball is taken, **replaced**, and a second is taken. Find **P(one of each colour)**.`, answer: fstr(res), accept: [...facc(res), `${2 * red * blue}/${t * t}`], steps: [`Red then blue: ${red}/${t} × ${blue}/${t} = ${red * blue}/${t * t}`, `Blue then red: ${blue}/${t} × ${red}/${t} = ${red * blue}/${t * t}`, `Add (either order): ${2 * red * blue}/${t * t}${fstr(res) !== `${2 * red * blue}/${t * t}` ? ` = ${fstr(res)}` : ''}`], hints: ['There are TWO ways to get one of each - add both branches.'], d: 4 };
}

function avgReverseQ(rand: () => number): GeneratedQuestion {
  if (rand() < 0.5) {
    const n = ri(rand, 4, 9), m = ri(rand, 10, 40), add = ri(rand, 1, 30), m2 = (n * m + add) / (n + 1);
    if (m2 % 1 !== 0) return avgReverseQ(rand);
    return { q: `The mean of **${n} numbers** is **${m}**. When one more number is added, the mean becomes **${m2}**. What number was added?`, answer: add, steps: [`Total of ${n} numbers = ${n} × ${m} = ${n * m}`, `Total of ${n + 1} numbers = ${n + 1} × ${m2} = ${(n + 1) * m2}`, `Added number = ${(n + 1) * m2} − ${n * m} = ${add}`], hints: ['Work with TOTALS: total = mean × how many.'], d: 4 };
  }
  const n1 = ri(rand, 10, 30), m1 = ri(rand, 40, 80), n2 = ri(rand, 10, 30), m2 = ri(rand, 40, 80);
  const tot = (n1 * m1 + n2 * m2) / (n1 + n2);
  return { q: `Class A has **${n1} students** with a mean test score of **${m1}**. Class B has **${n2} students** with a mean of **${m2}**. Find the mean score of **all ${n1 + n2} students** (2 dp).`, answer: r(tot, 2), tol: 0.006, steps: [`Total A = ${n1} × ${m1} = ${n1 * m1}; total B = ${n2} × ${m2} = ${n2 * m2}`, `Overall mean = ${n1 * m1 + n2 * m2} ÷ ${n1 + n2} = ${r(tot, 4)}`, `Not (${m1} + ${m2}) ÷ 2 = ${(m1 + m2) / 2}: the classes are different sizes.`], d: 4 };
}

function groupedClassQ(rand: () => number): GeneratedQuestion {
  const w = pk(rand, [5, 10, 20]), start = pk(rand, [0, 10, 20]);
  const fs = Array.from({ length: 5 }, () => ri(rand, 2, 18));
  if (new Set(fs).size < 5) return groupedClassQ(rand);
  const cls = fs.map((_, i) => `${start + i * w} ≤ t < ${start + (i + 1) * w}`);
  const table = `| Time, t (min) | Frequency |\n|---|---|\n${cls.map((c, i) => `| ${c} | ${fs[i]} |`).join('\n')}`;
  if (rand() < 0.5) {
    const mi = fs.indexOf(Math.max(...fs));
    return mcq(rand, `What is the **modal class**?\n\n${table}`, cls[mi], cls.filter((_, i) => i !== mi), [`The modal class has the highest frequency: ${Math.max(...fs)}`, `So ${cls[mi]}`], 2);
  }
  const N = fs.reduce((a, b) => a + b, 0), pos = (N + 1) / 2;
  let cum = 0, mi = 0;
  for (let i = 0; i < fs.length; i++) { cum += fs[i]; if (cum >= pos) { mi = i; break; } }
  const modal = fs.indexOf(Math.max(...fs));
  return mcq(rand, `Which class contains the **median**?\n\n${table}`, cls[mi], [...cls.filter((_, i) => i !== mi && i === modal), ...cls.filter((_, i) => i !== mi && i !== modal)], [`Total frequency = ${N}, so the median is the ${f(pos)}th value`, `Running totals: ${fs.map((_, i) => fs.slice(0, i + 1).reduce((a, b) => a + b, 0)).join(', ')}`, `The ${f(pos)}th value falls in ${cls[mi]}`, 'The median class is not always the modal class.'], 3);
}

function pieQ(rand: () => number): GeneratedQuestion {
  const tot = pk(rand, [30, 36, 40, 60, 72, 90, 120, 180]);
  const n = ri(rand, 2, tot / 3);
  if (rand() < 0.5) return { q: `In a survey of **${tot} people**, **${n}** chose football. What angle should football have in a **pie chart**?`, answer: r((n / tot) * 360, 2), unit: '°', steps: [`Each person = 360 ÷ ${tot} = ${f(360 / tot)}°`, `${n} × ${f(360 / tot)} = ${f((n / tot) * 360)}°`], d: 2 };
  const ang = r((n / tot) * 360, 2);
  return { q: `A pie chart shows the results of a survey of **${tot} people**. The sector for "tennis" has an angle of **${f(ang)}°**. How many people chose tennis?`, answer: n, steps: [`Each person = 360 ÷ ${tot} = ${f(360 / tot)}°`, `${f(ang)} ÷ ${f(360 / tot)} = ${n} people`], d: 3 };
}

const SCATTER: [string, string][] = [
  ['As the temperature rises, more ice creams are sold', 'positive correlation'],
  ['The older a car is, the lower its value', 'negative correlation'],
  ['Shoe size and score in a maths test', 'no correlation'],
  ['The more hours of revision, the higher the test mark', 'positive correlation'],
  ['The higher up a mountain, the lower the temperature', 'negative correlation'],
  ['House number and height of the person living there', 'no correlation'],
  ['The longer a candle burns, the shorter it gets', 'negative correlation'],
  ['Height and arm span of adults', 'positive correlation'],
];
function scatterQ(rand: () => number): GeneratedQuestion {
  if (rand() < 0.65) {
    const [s, c] = pk(rand, SCATTER);
    return mcq(rand, `What type of correlation would you expect?\n\n> ${s}.`, c, ['positive correlation', 'negative correlation', 'no correlation', 'it shows one causes the other'].filter((x) => x !== c), [`${s}: ${c}.`, 'Positive: both increase together. Negative: one increases as the other decreases. Correlation does not prove causation.'], 1);
  }
  const facts: [string, string, string[]][] = [
    ['Why is a prediction made by extrapolation less reliable?', 'It is outside the range of the data, so the pattern may not continue', ['It uses a line of best fit, which never passes through the points', 'It is inside the range of the data, so it repeats a known value', 'It includes the outliers, which always make predictions too high']],
    ['What is an outlier on a scatter graph?', 'A point that does not fit the general pattern of the data', ['The point that is furthest to the right on the x-axis', 'Any point that lies exactly on the line of best fit', 'The point with the largest y-value on the whole graph']],
    ['Two variables show strong positive correlation. What can you conclude?', 'They tend to increase together, but one does not necessarily cause the other', ['An increase in the first variable is what causes the second to increase', 'The two variables have exactly the same value for every single data point', 'There is no link between them, because correlation only shows chance patterns']],
  ];
  const [q, a, w] = pk(rand, facts);
  return mcq(rand, q, a, w, [a + '.'], 2);
}

export const MATHS_MORE_GENERATORS: Generator[] = [
  G('mm-estimate', 'Estimating by rounding to 1 sf', (r_) => estimateQ(r_)),
  G('mm-error-interval', 'Error intervals and truncation', (r_) => errorIntervalQ(r_)),
  G('mm-recurring', 'Recurring decimals to fractions', (r_) => recurringQ(r_), 'H'),
  G('mm-fdp-order', 'Ordering fractions, decimals and percentages', (r_) => fdpOrderQ(r_)),
  G('mm-hcf-lcm-word', 'HCF and LCM problems', (r_) => hcfLcmWordQ(r_)),
  G('mm-number-types', 'Primes, cubes and factors', (r_) => numberTypesQ(r_)),
  G('mm-mixed-frac', 'Mixed number calculations', (r_) => mixedFracQ(r_)),
  G('mm-frac-problem', 'Fraction problems', (r_) => fracProblemQ(r_)),
  G('mm-simple-interest', 'Simple and compound interest', (r_) => simpleInterestQ(r_)),
  G('mm-multiplier', 'Percentage multipliers', (r_) => multiplierQ(r_)),
  G('mm-years', 'Growth and decay over time', (r_) => halfLifeQ(r_)),
  G('mm-surd-ops', 'Calculating with surds', (r_) => surdOpsQ(r_), 'H'),
  G('mm-frac-index', 'Fractional and negative indices', (r_) => fracIndexQ(r_), 'H'),
  G('mm-standard-calc', 'Calculating with standard form', (r_) => standardCalcQ(r_)),
  G('mm-money', 'VAT, wages, exchange rates and bills', (r_) => money2Q(r_)),
  G('mm-factorise', 'Factorising fully', (r_) => factoriseMcq(r_)),
  G('mm-collect', 'Simplifying expressions', (r_) => collectQ(r_)),
  G('mm-equations', 'Equations with brackets and fractions', (r_, l) => equationsQ(r_, l)),
  G('mm-form-eq', 'Forming and solving equations', (r_) => formEquationQ(r_)),
  G('mm-ineq-int', 'Integers satisfying inequalities', (r_) => inequalityIntQ(r_)),
  G('mm-sequences', 'Sequences: terms, geometric and Fibonacci', (r_) => sequencesQ(r_)),
  G('mm-quad-seq', 'nth term of quadratic sequences', (r_) => quadSeqQ(r_), 'H'),
  G('mm-line-eq', 'Equations of lines, parallel and perpendicular', (r_) => lineEqQ(r_)),
  G('mm-perp', 'Perpendicular gradients', (r_) => perpQ(r_), 'H'),
  G('mm-midpoint', 'Midpoints', (r_) => midpointQ(r_)),
  G('mm-sim-word', 'Simultaneous equation problems', (r_) => simWordQ(r_)),
  G('mm-quad-roots', 'Solving quadratics and difference of two squares', (r_) => quadRootsQ(r_)),
  G('mm-complete-square', 'Completing the square and turning points', (r_) => completeSquareQ(r_), 'H'),
  G('mm-functions', 'Composite and inverse functions', (r_) => functionsQ(r_), 'H'),
  G('mm-iteration', 'Iteration', (r_) => iterationQ(r_), 'H'),
  G('mm-formula-sub', 'Using and rearranging formulae', (r_) => formulaSubQ(r_)),
  G('mm-ratio', 'Ratio problems', (r_) => ratio2Q(r_)),
  G('mm-proportion', 'Recipes and inverse proportion', (r_) => proportion2Q(r_)),
  G('mm-units', 'Converting units, areas and volumes', (r_) => unitsQ(r_)),
  G('mm-pressure', 'Pressure', (r_) => pressureQ(r_)),
  G('mm-graph-rates', 'Gradients and areas of velocity-time graphs', (r_) => graphRatesQ(r_), 'H'),
  G('mm-angle-facts', 'Angle facts and parallel lines', (r_) => angleFactsQ(r_)),
  G('mm-bearings', 'Back bearings', (r_) => bearingsQ(r_)),
  G('mm-compound-area', 'Compound shapes and semicircles', (r_) => compoundAreaQ(r_)),
  G('mm-volume', 'Spheres, cones, pyramids and surface area', (r_) => volume2Q(r_)),
  G('mm-pythag-apps', "Pythagoras' theorem in context", (r_) => pythagAppsQ(r_)),
  G('mm-trig', 'Exact trig values and angles of elevation', (r_) => trig2Q(r_)),
  G('mm-sine-rule', 'Sine rule and cosine rule for angles', (r_) => sineRuleQ(r_), 'H'),
  G('mm-similar', 'Similar shapes: lengths', (r_) => similarQ(r_)),
  G('mm-similar-av', 'Similar shapes: areas and volumes', (r_) => similarAVQ(r_), 'H'),
  G('mm-circle-parts', 'Parts of a circle', (r_) => circlePartsQ(r_)),
  G('mm-scale', 'Maps and scale drawings', (r_) => scaleQ(r_)),
  G('mm-prob', 'Probability: missing values, expected and relative frequency', (r_) => probMoreQ(r_)),
  G('mm-two-dice', 'Sample spaces: two dice', (r_) => twoDiceQ(r_)),
  G('mm-venn', 'Venn diagrams', (r_) => vennQ(r_)),
  G('mm-venn-cond', 'Conditional probability from Venn diagrams', (r_) => vennCondQ(r_), 'H'),
  G('mm-tree-rep', 'Tree diagrams with replacement', (r_) => treeRepQ(r_)),
  G('mm-avg-reverse', 'Missing values and combined means', (r_) => avgReverseQ(r_)),
  G('mm-grouped-class', 'Modal class and median class', (r_) => groupedClassQ(r_)),
  G('mm-pie', 'Pie chart angles', (r_) => pieQ(r_)),
  G('mm-scatter', 'Scatter graphs and correlation', (r_) => scatterQ(r_)),
];

export const MATHS_MORE_TOPICS: Record<string, string[]> = {
  'm-num-basics': ['mm-estimate', 'mm-number-types'],
  'm-num-factors': ['mm-hcf-lcm-word', 'mm-number-types'],
  'm-num-fractions': ['mm-mixed-frac', 'mm-frac-problem'],
  'm-num-fdp': ['mm-fdp-order', 'mm-recurring'],
  'm-num-percent': ['mm-multiplier'],
  'm-num-growth': ['mm-simple-interest', 'mm-multiplier', 'mm-years'],
  'm-num-indices': ['mm-frac-index'],
  'm-num-standard': ['mm-standard-calc'],
  'm-num-rounding': ['mm-estimate', 'mm-error-interval'],
  'm-num-surds': ['mm-surd-ops'],
  'm-num-money': ['mm-money', 'mm-simple-interest'],
  'm-alg-basics': ['mm-factorise', 'mm-collect'],
  'm-alg-quad-expand': ['mm-quad-roots'],
  'm-alg-equations': ['mm-equations', 'mm-form-eq'],
  'm-alg-rearrange': ['mm-formula-sub'],
  'm-alg-inequalities': ['mm-ineq-int'],
  'm-alg-sequences': ['mm-sequences', 'mm-quad-seq'],
  'm-alg-graphs': ['mm-line-eq', 'mm-midpoint', 'mm-perp'],
  'm-alg-simultaneous': ['mm-sim-word'],
  'm-alg-quadratics': ['mm-quad-roots', 'mm-complete-square'],
  'm-alg-graphs2': ['mm-complete-square'],
  'm-alg-functions': ['mm-functions', 'mm-iteration'],
  'm-rat-ratio': ['mm-ratio'],
  'm-rat-proportion': ['mm-proportion'],
  'm-rat-compound': ['mm-units', 'mm-pressure'],
  'm-rat-rates': ['mm-graph-rates'],
  'm-geo-angles': ['mm-angle-facts', 'mm-bearings', 'mm-form-eq'],
  'm-geo-area': ['mm-compound-area', 'mm-circle-parts'],
  'm-geo-volume': ['mm-volume', 'mm-units'],
  'm-geo-pythag': ['mm-pythag-apps'],
  'm-geo-trig': ['mm-trig'],
  'm-geo-sincos': ['mm-sine-rule'],
  'm-geo-transform': ['mm-similar', 'mm-similar-av'],
  'm-geo-construct': ['mm-scale', 'mm-bearings'],
  'm-prob-basics': ['mm-prob', 'mm-two-dice'],
  'm-prob-combined': ['mm-venn', 'mm-venn-cond', 'mm-tree-rep', 'mm-two-dice'],
  'm-stat-averages': ['mm-avg-reverse', 'mm-grouped-class'],
  'm-stat-charts': ['mm-pie', 'mm-scatter'],
  // GCSE Statistics shares the same skills
  'st-averages': ['mm-avg-reverse', 'mm-grouped-class'],
  'st-diagrams': ['mm-pie'],
  'st-correlation': ['mm-scatter'],
  'st-probability': ['mm-venn', 'mm-two-dice', 'mm-venn-cond'],
};
