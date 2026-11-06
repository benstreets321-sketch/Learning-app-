// Shared helpers for fact-table generators: every question draws its wrong options from the SAME category as the
// answer (other elements, other enzymes, other units...), most confusable first, so options can't be ruled out by
// their look alone. Higher levels switch to typed recall, which can't be guessed.
import type { GeneratedQuestion } from '../types';
import { formOk, harmonise, kindScore } from './plausible';

const norm = (s: string) => s.replace(/[*_`]/g, '').trim().toLowerCase();

/**
 * Multiple choice with the answer first (the app shuffles). `wrong` is ordered most-confusable first; three are
 * chosen favouring the most confusable ones of a similar length to the answer, with some randomness so the same
 * question doesn't always show the same distractors.
 */
export function mcq(rand: () => number, q: string, answer: string, wrong: string[], why: string[], d = 2, hints?: string[]): GeneratedQuestion {
  const all = [...new Set(wrong.filter((w) => norm(w) !== norm(answer)))];
  // wrong options of the same kind and form as the answer (no number among words, no different unit, no sentence among
  // single terms), whenever there are enough of them; a deliberately mixed set (0.6 vs 5/8 vs 62%) keeps its mix
  const same = all.filter((w) => formOk(answer, w));
  const pool = same.length >= 3 ? same : all;
  // Most confusable first - but the right answer must not stand out as the longest (or shortest) option, so among the
  // closest candidates prefer ones of a similar length, with a little randomness so the same set doesn't always appear.
  const L = Math.max(answer.length, 8);
  const lenGap = (w: string) => Math.abs(w.length - answer.length) / L;
  const scored = pool.map((w, i) => ({ w, s: Math.min(i, 8) * 0.3 + lenGap(w) * 6 - Math.max(-3, Math.min(4, kindScore(answer, w))) * 0.35 + rand() * 1.5 }));
  scored.sort((a, b) => a.s - b.s);
  const opts = [answer];
  for (const { w } of scored) {
    if (opts.length >= 4) break;
    if (!opts.some((o) => norm(o) === norm(w))) opts.push(w);
  }
  if (opts.length < 3) throw new Error(`not enough distractors for: ${q}`);
  // the same capitals and end punctuation for every option, so none stands out
  const even = harmonise(opts);
  return { q, answer: even[0], options: even, steps: why, d, hints };
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
