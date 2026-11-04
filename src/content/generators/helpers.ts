import { gcd } from '../../lib/util';

export const ri = (rand: () => number, min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;
export const pk = <T,>(rand: () => number, arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)];
export const nz = (rand: () => number, min: number, max: number) => {
  let x = 0;
  while (x === 0) x = ri(rand, min, max);
  return x;
};

/** Round to dp and drop trailing zeros */
export const r = (x: number, dp = 2) => Math.round((x + Number.EPSILON) * 10 ** dp) / 10 ** dp;
export const f = (x: number, dp = 4) => {
  const v = r(x, dp);
  return Object.is(v, -0) ? '0' : String(v);
};

/** Round to significant figures */
export const sf = (x: number, n: number) => {
  if (x === 0) return 0;
  const p = Math.floor(Math.log10(Math.abs(x))) - n + 1;
  return Math.round(x / 10 ** p) * 10 ** p;
};

/** "+ 3" / "- 3" for writing expressions */
export const sgn = (n: number) => (n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`);
/** coefficient display: 1x -> x, -1x -> -x */
export const coef = (n: number, v = 'x') => (n === 1 ? v : n === -1 ? `-${v}` : `${n}${v}`);
export const term = (n: number, v = 'x') => (n < 0 ? ` − ${coef(-n, v)}` : ` + ${coef(n, v)}`);

export interface Frac { n: number; d: number }
export const frac = (n: number, d: number): Frac => {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
};
export const fstr = (fr: Frac) => (fr.d === 1 ? String(fr.n) : `${fr.n}/${fr.d}`);
export const mixed = (fr: Frac) => {
  if (fr.d === 1 || Math.abs(fr.n) < fr.d) return fstr(fr);
  const w = Math.trunc(fr.n / fr.d);
  const rem = Math.abs(fr.n % fr.d);
  return `${w} ${rem}/${fr.d}`;
};
/** accepted strings for a fraction answer */
export const facc = (fr: Frac) => {
  const out = [fstr(fr), mixed(fr)];
  return [...new Set(out)];
};

/** Build 4 unique MCQ options with the correct one first */
export function options(correct: string, wrongs: string[], _rand: () => number, filler?: () => string): string[] {
  const set = new Set<string>([correct]);
  for (const w of wrongs) if (w !== correct) set.add(w);
  let guard = 0;
  while (set.size < 4 && filler && guard++ < 30) set.add(filler());
  return [...set].slice(0, 4);
}

export const sup = (n: number | string) => String(n).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹⁻'['0123456789-'.indexOf(c)] ?? c).join('');

export function primeFactors(n: number): number[] {
  const out: number[] = [];
  let x = n;
  for (let p = 2; p * p <= x; p++) while (x % p === 0) { out.push(p); x /= p; }
  if (x > 1) out.push(x);
  return out;
}

export const money = (x: number) => `£${x.toFixed(2)}`;
export const comma = (x: number) => x.toLocaleString('en-GB');
