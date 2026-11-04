// Compact authoring helpers. Convention: for multiple choice the CORRECT option is written first;
// the quiz UI shuffles options so position never gives the answer away.
import type {
  ClozeQ, ExamQuestion, Flashcard, MatchQ, McqQ, MultiQ, NumQ, OrderQ, TextQ, TfQ, Topic, Quote, Tier,
} from './types';

interface Opts {
  h?: string[];
  d?: number;
  tier?: Tier;
  fb?: Record<number, string>;
}

const base = (why: string, o: Opts = {}) => ({ why, hints: o.h, d: o.d ?? 2, tier: o.tier });

/** Multiple choice. options[0] is the correct answer. */
export const mc = (q: string, options: string[], why: string, o: Opts = {}): McqQ => ({
  type: 'mcq', q, options, answer: 0, fb: o.fb, ...base(why, o),
});

/** Multiple choice where you specify the answer index explicitly (for ordered options like numbers). */
export const mcAt = (q: string, options: string[], answer: number, why: string, o: Opts = {}): McqQ => ({
  type: 'mcq', q, options, answer, fb: o.fb, ...base(why, o),
});

/** Select all that apply. `correct` lists the correct options, `wrong` the distractors. */
export const multi = (q: string, correct: string[], wrong: string[], why: string, o: Opts = {}): MultiQ => ({
  type: 'multi', q, options: [...correct, ...wrong], answers: correct.map((_, i) => i), ...base(why, o),
});

export const tf = (q: string, answer: boolean, why: string, o: Opts = {}): TfQ => ({
  type: 'tf', q, answer, ...base(why, o),
});

export const num = (
  q: string, answer: number, why: string,
  o: Opts & { tol?: number; unit?: string; steps?: string[] } = {},
): NumQ => ({ type: 'num', q, answer, tol: o.tol, unit: o.unit, steps: o.steps, ...base(why, o) });

export const txt = (q: string, accept: string[], why: string, o: Opts & { steps?: string[] } = {}): TextQ => ({
  type: 'text', q, accept, steps: o.steps, ...base(why, o),
});

/** Put in order. Items are written in the correct order. */
export const ord = (q: string, items: string[], why: string, o: Opts = {}): OrderQ => ({
  type: 'order', q, items, ...base(why, o),
});

export const match = (q: string, pairs: [string, string][], why: string, o: Opts = {}): MatchQ => ({
  type: 'match', q, pairs, ...base(why, o),
});

/** Fill the gaps: "The {{nucleus}} contains {{DNA|genetic material}}" */
export const cloze = (text: string, why: string, o: Opts & { q?: string } = {}): ClozeQ => ({
  type: 'cloze', text, q: o.q, ...base(why, o),
});

/** Flashcards from [front, back] pairs */
export const cards = (pairs: [string, string][]): Flashcard[] => pairs.map(([front, back]) => ({ front, back }));

export const quote = (text: string, analysis: string, o: { who?: string; where?: string; themes?: string[] } = {}): Quote => ({
  text, analysis, ...o,
});

export const examQ = (q: string, marks: number, markScheme: string[], o: Partial<ExamQuestion> = {}): ExamQuestion => ({
  q, marks, markScheme, ...o,
});

/** Build a topic with sensible defaults */
export const topic = (t: Omit<Topic, 'flashcards' | 'questions' | 'keyPoints'> & Partial<Pick<Topic, 'flashcards' | 'questions' | 'keyPoints'>>): Topic => ({
  flashcards: [],
  questions: [],
  keyPoints: [],
  ...t,
});
