// Marking for auto-marked questions in mock exams, with exam-board style partial credit.
import type { QItem } from '../content/types';
import { checkNumber, checkText, isSpellingQ, parseCloze } from './answer';

export interface AutoAnswer {
  choice?: number;
  multi?: number[];
  text?: string;
  order?: string[];
  match?: Record<number, string>;
  blanks?: string[];
}

export interface AutoMark { got: number; max: number; correct: boolean; detail?: string }

/** Default marks for an auto-marked question in a mock paper */
export function defaultMarks(item: QItem): number {
  switch (item.type) {
    case 'multi': return Math.min(3, Math.max(1, item.answers.length));
    case 'match': return item.pairs.length >= 4 ? 3 : 2;
    case 'order': return item.items.length >= 4 ? 2 : 1;
    case 'cloze': return Math.min(3, parseCloze(item.text).blanks.length);
    case 'num': return item.generated ? Math.max(1, Math.min(4, item.d <= 1 ? 1 : item.d === 2 ? 2 : item.d <= 4 ? 3 : 4)) : 2;
    default: return 1;
  }
}

export function isAnswered(item: QItem, a: AutoAnswer | undefined): boolean {
  if (!a) return false;
  switch (item.type) {
    case 'mcq': case 'tf': return a.choice !== undefined && a.choice !== null;
    case 'multi': return !!a.multi?.length;
    case 'num': case 'text': return !!a.text?.trim();
    case 'order': return !!a.order?.length;
    case 'match': return Object.keys(a.match ?? {}).length > 0;
    case 'cloze': return (a.blanks ?? []).some((b) => b?.trim());
    default: return false;
  }
}

export function gradeAuto(item: QItem, a: AutoAnswer | undefined, max = defaultMarks(item)): AutoMark {
  if (!a || !isAnswered(item, a)) return { got: 0, max, correct: false, detail: 'Not answered.' };
  switch (item.type) {
    case 'mcq': {
      const ok = a.choice === item.answer;
      return { got: ok ? max : 0, max, correct: ok };
    }
    case 'tf': {
      const ok = (a.choice === 0) === item.answer; // choice 0 = True, 1 = False
      return { got: ok ? max : 0, max, correct: ok };
    }
    case 'multi': {
      // one mark per correct tick, minus one for each wrong tick (as exam boards do when too many boxes are ticked)
      const picked = new Set(a.multi);
      const right = item.answers.filter((x) => picked.has(x)).length;
      const wrong = [...picked].filter((x) => !item.answers.includes(x)).length;
      const raw = item.answers.length ? Math.round((right / item.answers.length) * max) : 0;
      const got = Math.max(0, Math.min(max, raw - wrong));
      return { got, max, correct: got === max, detail: got < max ? `${right} of ${item.answers.length} correct options chosen${wrong ? `, ${wrong} wrong` : ''}.` : undefined };
    }
    case 'num': {
      const r = checkNumber(a.text ?? '', item.answer, item.tol);
      return { got: r.ok ? max : 0, max, correct: r.ok, detail: r.ok ? undefined : r.close ? 'Very close – check rounding, units or place value.' : undefined };
    }
    case 'text': {
      const r = checkText(a.text ?? '', item.accept, isSpellingQ(item));
      return { got: r.ok ? max : 0, max, correct: r.ok };
    }
    case 'order': {
      const seq = a.order ?? [];
      const inPlace = seq.filter((s, i) => s === item.items[i]).length;
      const all = inPlace === item.items.length;
      const got = all ? max : max > 1 && inPlace >= Math.ceil(item.items.length / 2) ? max - 1 : 0;
      return { got, max, correct: all, detail: all ? undefined : `${inPlace} of ${item.items.length} in the right place.` };
    }
    case 'match': {
      const right = item.pairs.filter((p, i) => a.match?.[i] === p[1]).length;
      const got = Math.floor((right * max) / item.pairs.length);
      return { got, max, correct: right === item.pairs.length, detail: right === item.pairs.length ? undefined : `${right} of ${item.pairs.length} matched correctly.` };
    }
    case 'cloze': {
      const c = parseCloze(item.text);
      const right = c.blanks.filter((acc, i) => checkText(a.blanks?.[i] ?? '', acc).ok).length;
      const got = Math.floor((right * max) / c.blanks.length);
      return { got, max, correct: right === c.blanks.length, detail: right === c.blanks.length ? undefined : `${right} of ${c.blanks.length} gaps correct.` };
    }
    default:
      return { got: 0, max, correct: false };
  }
}

// ---------------- Written answers: mark from the mark scheme ----------------
// Level-marked schemes ("Level 3 (7-9 marks)") are best-fit: the student picks the level their answer fits, per component
// (e.g. content and technical accuracy, or the AO1-3 levels and SPaG), and earns the middle of that band - the
// examiners' standard starting point - which they can then adjust. Points-based schemes ("... (1)") earn one mark per
// point ticked. "Maximum N marks for answers that ..." lines cap the total when ticked.
export interface Band { comp: string; lo: number; hi: number }
const BAND_RE = /^(.*?)\bLevel (\d+) \((\d+)\s*[-–]\s*(\d+)(?: marks?)?\)/i;
const PERF_RE = /^(.*?)\b(High|Intermediate|Threshold) performance \((\d+)(?:\s*[-–]\s*(\d+))? marks?\)/i;
const comp = (s: string) => s.replace(/[\s–:.\-]+$/, '').trim().toLowerCase();
export function bandOf(line: string): Band | null {
  let m = BAND_RE.exec(line);
  if (m) return { comp: comp(m[1]) || 'main', lo: Number(m[3]), hi: Number(m[4]) };
  m = PERF_RE.exec(line);
  if (m) return { comp: comp(m[1]) || 'spag', lo: Number(m[3]), hi: m[4] ? Number(m[4]) : Number(m[3]) };
  return null;
}
export const capOf = (line: string): number | null => { const m = /^Maximum (\d+) marks? for /i.exec(line); return m ? Number(m[1]) : null; };
/** Guidance lines that are not themselves creditworthy points */
export const isInfoLine = (line: string) => /^(Indicative content|Valid |Example:|Max \d|For EACH)/i.test(line.trim());
export const isLevelledScheme = (scheme: string[]) => scheme.some((l) => bandOf(l) !== null);

export function schemeMark(scheme: string[], marks: number, ticks: number[]): number {
  const bands = scheme.map(bandOf);
  const ticked = [...new Set(ticks)].filter((k) => k >= 0 && k < scheme.length);
  if (!bands.some(Boolean)) {
    const points = scheme.filter((l) => !isInfoLine(l) && capOf(l) === null).length;
    const got = ticked.filter((k) => !isInfoLine(scheme[k]) && capOf(scheme[k]) === null).length;
    const raw = points >= marks ? got : Math.round((got / Math.max(1, points)) * marks);
    return Math.min(marks, raw);
  }
  const best = new Map<string, number>();
  for (const k of ticked) {
    const b = bands[k];
    if (b) best.set(b.comp, Math.max(best.get(b.comp) ?? 0, Math.ceil((b.lo + b.hi) / 2)));
  }
  let total = [...best.values()].reduce((a, b) => a + b, 0);
  for (const k of ticked) { const c = capOf(scheme[k]); if (c !== null) total = Math.min(total, c); }
  return Math.min(marks, total);
}

/** Toggle a tick; level lines behave like radio buttons within their component */
export function toggleTick(scheme: string[], ticks: number[], k: number): number[] {
  const cur = new Set(ticks);
  if (cur.has(k)) { cur.delete(k); return [...cur]; }
  const b = bandOf(scheme[k] ?? '');
  if (b) for (const j of [...cur]) { const o = bandOf(scheme[j] ?? ''); if (o && o.comp === b.comp) cur.delete(j); }
  cur.add(k);
  return [...cur].sort((a, c) => a - c);
}
