// Shared helpers for fact-table generators: every question draws its wrong options from the SAME category as the
// answer (other elements, other enzymes, other units...), most confusable first, so options can't be ruled out by
// their look alone. Higher levels switch to typed recall, which can't be guessed.
import type { GeneratedQuestion } from '../types';
import { shuffle } from '../../lib/util';

const norm = (s: string) => s.replace(/[*_`]/g, '').trim().toLowerCase();

/**
 * Multiple choice with the answer first (the app shuffles). `wrong` is ordered most-confusable first: three are
 * taken from the first five (shuffled), so the same question doesn't always show the same distractors.
 */
export function mcq(rand: () => number, q: string, answer: string, wrong: string[], why: string[], d = 2, hints?: string[]): GeneratedQuestion {
  const pool = [...new Set(wrong.filter((w) => norm(w) !== norm(answer)))];
  const top = shuffle(pool.slice(0, 5), rand);
  const rest = shuffle(pool.slice(5), rand);
  const opts = [answer];
  for (const w of [...top, ...rest]) {
    if (opts.length >= 4) break;
    if (!opts.some((o) => norm(o) === norm(w))) opts.push(w);
  }
  if (opts.length < 3) throw new Error(`not enough distractors for: ${q}`);
  return { q, answer, options: opts, steps: why, d, hints };
}

/** Typed recall (tolerant of small spelling slips) */
export function typed(q: string, answer: string, accept: string[], why: string[], d = 3, hints?: string[]): GeneratedQuestion {
  return { q, answer, accept: [answer, ...accept], steps: why, d, hints };
}

/** Typed number */
export function numQ(q: string, answer: number, why: string[], d = 2, unit?: string, hints?: string[]): GeneratedQuestion {
  return { q, answer, unit, steps: why, d, hints };
}

/** Rows of a table other than `row`, sorted by a closeness score (lower = more confusable) with a little jitter */
export function closest<T>(rand: () => number, rows: readonly T[], row: T, score: (x: T) => number): T[] {
  return rows.filter((x) => x !== row).map((x) => ({ x, s: score(x) + rand() * 0.5 })).sort((a, b) => a.s - b.s).map((v) => v.x);
}

export const pick = <T,>(rand: () => number, arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)];
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** a/an */
export const an = (w: string) => (/^[aeiou]/i.test(w) ? `an ${w}` : `a ${w}`);
