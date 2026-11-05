// Which equipment a question needs. Every practice mode shows only the tools that help with the question in front
// of the student: a calculator and working pad for calculations, the periodic table for chemistry about elements,
// atoms and formulae, and the formula / equation sheet where the question uses one of its formulae.
import type { ExamQuestion, QItem } from '../content/types';
import { ELEMENTS } from '../content/periodic';

export type Equipment = 'tutor' | 'calc' | 'table' | 'formula' | 'working';

const QUANT = new Set(['maths', 'statistics', 'chemistry', 'physics', 'biology', 'business', 'imedia']);
const SHEETS = new Set(['maths', 'physics', 'chemistry', 'business', 'statistics', 'imedia']);

const ELEMENT_RE = new RegExp(`\\b(${ELEMENTS.filter((e) => e.z <= 92).map((e) => e.name.toLowerCase()).join('|')})\\b`, 'i');
const CHEM_RE = /\b(atoms?|atomic|ions?|ionic|electrons?|protons?|neutrons?|isotopes?|elements?|periodic|groups? [0-7]|group|period \d|metals?|non-metals?|halogens?|noble gas(es)?|alkali metals?|transition metals?|relative (formula|atomic) mass|M[ᵣr]\b|A[ᵣr]\b|moles?|formulae?|compounds?|bonds?|bonding|covalent|metallic|charges?|shells?|reactivity|displace\w*|electrolysis|mass number|oxidation|oxidised|reduction|reduced|precipitate|salts?|half equation|equation)\b/i;
// chemical formulae such as H2O, CO₂, NaCl, Ca(OH)2, SO4 2-
const FORMULA_RE = /\b(?:[A-Z][a-z]?(?:[\d₀-₉]+)?){2,}\b|\b[A-Z][a-z]?[\d₀-₉]+\b|\([A-Z][a-z]?[A-Z]?\)[\d₀-₉]/;
const CALC_WORDS = /\b(calculate|work out|how many|how much|find the|determine|estimate|percentage|per ?cent|ratio|mean|median|total|average|rate|magnification|efficiency|gradient|area|volume|probability|interest|profit|revenue|cost|margin|break-?even|file size)\b|%|£|\d\s*[×x÷+\-−*/^=]\s*\d/i;
const MATHS_SHEET = /\b(area|volume|surface|circumference|radius|diameter|circles?|sector|arc|trapezium|prism|cylinder|cone|sphere|pyramid|pythag\w*|hypotenuse|sin|cos|tan|sine|cosine|trig\w*|elevation|depression|bearing|quadratic formula|compound interest|depreciat\w*|probability|speed|density|pressure)\b|P\(/i;
const CHEM_SHEET = /\b(moles?|M[ᵣr]|relative formula mass|concentration|yield|atom economy|R[f]|rate|volume of gas|titration|bond energ\w*|percentage by mass)\b/i;
const BUS_SHEET = /\b(profit|revenue|break-?even|margin|average rate of return|ARR|cash ?flow|interest|costs?|contribution|market share|turnover|percentage change)\b/i;
const STATS_SHEET = /\b(mean|median|mode|range|quartile|IQR|standard deviation|frequency density|correlation|index number|probability|weighted|moving average|spearman|sample)\b/i;

/** Equipment for any question text in a subject. `calc` forces the calculator (typed numeric answers). */
export function equipmentFor(subjectId: string, text: string, opts: { numeric?: boolean } = {}): Equipment[] {
  const out: Equipment[] = ['tutor'];
  const hasNum = /\d/.test(text);
  const calc = QUANT.has(subjectId) && (!!opts.numeric || (hasNum && CALC_WORDS.test(text)));
  if (calc) out.push('calc');
  if (subjectId === 'chemistry' && (ELEMENT_RE.test(text) || CHEM_RE.test(text) || FORMULA_RE.test(text))) out.push('table');
  if (SHEETS.has(subjectId)) {
    const sheet =
      subjectId === 'maths' ? MATHS_SHEET.test(text) :
      subjectId === 'physics' ? calc || /\bequation\b/i.test(text) :
      subjectId === 'chemistry' ? calc && CHEM_SHEET.test(text) :
      subjectId === 'business' ? (calc || hasNum) && BUS_SHEET.test(text) :
      subjectId === 'statistics' ? STATS_SHEET.test(text) && (calc || hasNum) :
      subjectId === 'imedia' ? calc : false;
    if (sheet) out.push('formula');
  }
  if (calc) out.push('working');
  return out;
}

const itemText = (q: QItem): string => {
  const parts: string[] = [q.ctx ?? ''];
  if ('q' in q && q.q) parts.push(q.q);
  if (q.type === 'cloze') parts.push(q.text);
  if (q.type === 'mcq' || q.type === 'multi') parts.push(q.options.join(' '));
  if (q.type === 'spot') parts.push(q.steps.join(' '));
  return parts.join(' ');
};

export function equipmentForQuestion(q: QItem): Equipment[] {
  return equipmentFor(q.subjectId, itemText(q), { numeric: q.type === 'num' || (q.type === 'spot' && QUANT.has(q.subjectId)) });
}

export function equipmentForExam(subjectId: string, eq: ExamQuestion): Equipment[] {
  const text = `${eq.q} ${eq.markScheme.join(' ')}`;
  const tools = equipmentFor(subjectId, text);
  // long written answers always get a planning pad
  return tools.includes('working') ? tools : [...tools, 'working'];
}
