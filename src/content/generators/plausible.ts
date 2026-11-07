// Plausible wrong answers.
//
// A multiple-choice question only tests knowledge when every option could be right to someone who does not know the
// answer. Options that differ in kind or form give the answer away: a number among words, a sentence among single
// terms, a capitalised name among lowercase terms, "optimum pH" offered as a food test, a different unit, a much longer
// option. This module picks wrong answers of the same kind and shape as the right one, and evens out the surface
// (capitals, full stops) so no option stands out.
//
//   kindScore(answer, candidate)    how alike two options are in kind and form (higher is more alike)
//   formOk(answer, candidate)       hard rules: a candidate that fails can be ruled out by its form alone
//   pickPlausible(answer, pool, n)  the n most alike candidates (with some variety), or null if there are not enough
//   harmonise(options, answer)      the same capitalisation and end punctuation for every option
//
// The rules are deliberately about form, not meaning: meaning comes from where the candidates are drawn (the same
// table column, the same topic's key terms, the same kind of fact).

/** remembers a pure text function's answers: the same option text is checked thousands of times at start-up */
function memo<T>(fn: (s: string) => T): (s: string) => T {
  const cache = new Map<string, T>();
  return (s: string) => {
    let v = cache.get(s);
    if (v === undefined && !cache.has(s)) {
      if (cache.size > 40_000) cache.clear();
      v = fn(s);
      cache.set(s, v);
    }
    return v as T;
  };
}
const strip = memo((s: string) => String(s ?? '').replace(/\*\*|__|`/g, '').replace(/\s+/g, ' ').trim());
const norm = memo((s: string) => strip(s).toLowerCase().replace(/[^a-z0-9%£.]+/g, ' ').trim());
const wordsOf = memo((s: string) => strip(s).split(' ').filter(Boolean));

const NUM = /^([−\-+]?[£$€]?\s?\d(?:\d|,(?=\d{3}))*(?:\.\d+)?)\s*(.*)$/;
/** a number, optionally with a unit: "12", "£3.40", "45%", "9.8 N/kg", "1066" */
export const numberParts = memo(numberPartsOf);
function numberPartsOf(s: string): { n: number; unit: string } | null {
  // "about 80%", "just under 1%": the qualifier is part of the wording, not the kind of answer
  let t = strip(s).replace(/^(about|around|roughly|approximately|approx\.|nearly|almost|just (?:under|over)|over|under|less than|more than|~|≈)\s*/i, '');
  // fractions, standard form and ranges are numbers too: 5/8, 2.4 × 10⁹, 1-5, 1577-80
  t = t.replace(/^([−\-+]?\d+)\/(\d+)(?=\s|$)/, '$1').replace(/^([−\-+]?\d[\d,]*(?:\.\d+)?)\s*×\s*10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/, '$1').replace(/^(\d[\d,]*(?:\.\d+)?)\s*[–-]\s*\d[\d,.]*(?=\s|$)/, '$1');
  // a list of numbers ("0, 1, 2, 3") is a number too
  if (/^[−\-+]?\d[\d.]*(\s*,\s+[−\-+]?\d[\d.]*)+$/.test(t)) return { n: Number(t.split(',')[0].replace('−', '-')), unit: 'list' };
  const m = t.match(NUM);
  if (!m) return null;
  const unit = m[2].trim();
  // "12 marks" is a number with a unit; "1 million men" too; "3 key reasons why..." is a phrase, and so is a numbered
  // label such as "5 - The End of It"
  if (unit && (unit.split(' ').length > 3 || /[.!?]$/.test(unit) || /^[–-]\s/.test(unit) || /^[,;:]/.test(unit))) return null;
  return { n: Number(m[1].replace(/[^\d.\-]/g, '').replace('−', '-')), unit: unit.toLowerCase().replace(/^million\b/, '×1e6') };
}
/** words that must keep their lowercase: units and maths functions */
const UNITISH = /^(kg|g|mg|km|m|cm|mm|nm|s|ms|ml|l|j|kj|w|kw|kwh|n|pa|kpa|v|a|hz|mol|dm|sin|cos|tan|log|ln|ph|e\.g\.|i\.e\.)$/i;
const isYear = memo((s: string) => /^(1[0-9]{3}|20[0-9]{2})(s|\s?(BC|AD|CE|BCE))?$/.test(strip(s).replace(/[–-]\d{2,4}$/, '')));
const isAcronym = (w: string) => /^[A-Z0-9₀-₉]{2,}(\/[A-Z0-9₀-₉]{2,})*s?$/.test(w) && /[A-Z]/.test(w);
const isFormula = memo((s: string) => /[=+→⇌×÷^²³√≠≈<>≤≥]|\b[A-Z][a-z]?\d|\d[A-Z]/.test(strip(s)));

/** "U" capitalised, "l" lowercase, "x" neither (numbers, symbols, acronyms, internal capitals such as pH or mRNA) */
export const caseClass = memo(caseClassOf);
function caseClassOf(s: string): 'U' | 'l' | 'x' {
  const w = wordsOf(s)[0] ?? '';
  if (!/^[A-Za-z]/.test(w) || isAcronym(w) || /^[A-Z]-/.test(w) || /^[a-z]+[A-Z]/.test(w) || (w.length === 1 && wordsOf(s).length === 1) || UNITISH.test(w) || isFormula(s)) return 'x';
  return /^[A-Z]/.test(w) ? 'U' : 'l';
}
/** every word after the first capitalised: "Human Genome Project", "Ghost of Christmas Present" */
const titleCase = memo((s: string) => {
  const w = wordsOf(s).slice(1).filter((x) => x.length > 3);
  return w.length > 0 && w.every((x) => /^[A-Z]/.test(x));
});
/** the words without plural endings (supernovae / supernova, nuclei / nucleus, cells / cell) */
const stem = memo((s: string) => wordsOf(norm(s)).map((w) => w.replace(/(ae|a|i|us|es|s)$/, '')).join(' '));
const head = memo((s: string) => { const w = wordsOf(norm(s)); const h = w[w.length - 1] ?? ''; return h.replace(/(ies)$/, 'y').replace(/(?<!s)s$/, ''); });
const plural = memo((s: string) => { const w = wordsOf(norm(s)); const h = w[w.length - 1] ?? ''; return /[^su]s$/.test(h) && h.length > 3; });
const SUFFIX: [RegExp, string][] = [
  [/(tion|sion|ment|ness|ity|ance|ence|ism|ship|hood|age)$/, 'noun'], [/(ly)$/, 'adv'], [/(ive|ous|ful|less|able|ible|ic|al|ary)$/, 'adj'],
  [/(ise|ize|ify|ate|ed)$/, 'verb'], [/(ing)$/, 'ing'],
];
const suffixClass = memo((s: string) => { const w = wordsOf(norm(s)); if (w.length !== 1) return ''; return SUFFIX.find(([r]) => r.test(w[0]))?.[1] ?? ''; });
const endsSentence = (s: string) => /[.!?]["”')]*$/.test(strip(s));
const startsWithArticle = (s: string) => /^(a|an|the)\s/i.test(strip(s));
const startsWithTo = (s: string) => /^to\s/i.test(strip(s));
const startsWithBecause = (s: string) => /^because\s/i.test(strip(s));

/** Hard rules: a candidate failing any of these could be ruled out from its form alone */
export function formOk(answer: string, cand: string): boolean {
  const a = strip(answer), c = strip(cand);
  if (!c || norm(c) === norm(a) || stem(c) === stem(a)) return false;
  // one containing the other could both be right ("arteries" / "pulmonary arteries")
  const na = ` ${norm(a)} `, nc = ` ${norm(c)} `;
  if (na.length > 3 && nc.length > 3 && (na.includes(nc) || nc.includes(na))) return false;
  const pa = numberParts(a), pc = numberParts(c);
  if (!!pa !== !!pc) return false;
  if (pa && pc && pa.unit !== pc.unit) return false;
  if (isYear(a) !== isYear(c)) return false;
  if (isFormula(a) !== isFormula(c)) return false;
  const wa = wordsOf(a).length, wc = wordsOf(c).length;
  if (wa <= 2 && wc > wa + 2) return false;
  if (wc <= 2 && wa > wc + 2) return false;
  if ((wa >= 3 || wc >= 3) && (wa / wc > 2.5 || wc / wa > 2.5)) return false;
  const la = a.length, lc = c.length;
  if (la > 14 && (lc > la * 2 || lc < la * 0.45)) return false;
  const acA = wa === 1 && isAcronym(a), acC = wc === 1 && isAcronym(c);
  if (acA !== acC) return false;
  if (wa >= 4 && endsSentence(a) !== endsSentence(c)) return false;
  if (startsWithTo(a) !== startsWithTo(c) && (wa >= 3 || wc >= 3)) return false;
  // a bracketed detail on one option only ("more marks (12)") marks it out
  if (/\(.+\)/.test(a) !== /\(.+\)/.test(c)) return false;
  if (startsWithBecause(a) !== startsWithBecause(c) && (wa >= 3 || wc >= 3)) return false;
  return true;
}

/** How alike two options are in kind and form */
export function kindScore(answer: string, cand: string): number {
  const a = strip(answer), c = strip(cand);
  let s = 0;
  const wa = wordsOf(a).length, wc = wordsOf(c).length;
  if (head(a) && head(a) === head(c) && wa > 1 && wc > 1) s += 4;
  else if (head(a) === head(c)) s += 1;
  if (wa > 1 && wc > 1 && wordsOf(norm(a))[0] === wordsOf(norm(c))[0]) s += 1.5;
  if (plural(a) === plural(c)) s += 1;
  const ca = caseClass(a), cc = caseClass(c);
  if (ca === cc) s += 1.5;
  if (wa > 1 && wc > 1) s += titleCase(a) === titleCase(c) ? 2 : -2;
  s += wa === wc ? 1 : -0.6 * Math.abs(wa - wc);
  s -= 1.6 * Math.abs(Math.log((c.length + 2) / (a.length + 2)));
  const sa = suffixClass(a), sc = suffixClass(c);
  if (sa && sc) s += sa === sc ? 1.2 : -1.2;
  if (startsWithArticle(a) === startsWithArticle(c)) s += 0.5;
  if (/\d/.test(a) === /\d/.test(c)) s += 1;
  if (/[()]/.test(a) !== /[()]/.test(c)) s -= 1;
  const pa = numberParts(a), pc = numberParts(c);
  if (pa && pc && pa.n && pc.n) s += Math.max(-2, 1.5 - Math.abs(Math.log10(Math.abs(pc.n) / Math.abs(pa.n))) * 2);
  return s;
}

/**
 * The n candidates most like the answer in kind and form, in a random order. Candidates earlier in the pool count as
 * closer (callers put the same topic or table first). Returns null when fewer than n pass the hard rules, or when the
 * nth best is still a poor match (score below `min`), so the caller can choose another question instead.
 */
export function pickPlausible(answer: string, pool: string[], n: number, rand: () => number, min = -1.5, near?: (c: string) => number): string[] | null {
  const seen = new Set<string>([norm(answer)]);
  const scored: { c: string; s: number }[] = [];
  pool.forEach((c, i) => {
    const k = norm(c);
    if (!k || seen.has(k) || !formOk(answer, c)) return;
    seen.add(k);
    scored.push({ c, s: kindScore(answer, c) + (near ? near(c) : 0) - Math.min(1.5, i / Math.max(8, pool.length) * 1.5) + rand() * 1.2 });
  });
  scored.sort((x, y) => y.s - x.s);
  const out: string[] = [];
  for (const x of scored) {
    if (out.length === n) break;
    if (x.s < min) break;
    // no two wrong options that contain each other either
    if (out.some((o) => { const a = ` ${norm(o)} `, b = ` ${norm(x.c)} `; return a.includes(b) || b.includes(a); })) continue;
    out.push(x.c);
  }
  return out.length === n ? out : null;
}

const capFirst = (s: string) => s.replace(/^(\W*)(\p{Ll})/u, (_, p: string, c: string) => p + c.toUpperCase());
const lowFirst = (s: string) => s.replace(/^(\W*)(\p{Lu})(?=\p{Ll})/u, (_, p: string, c: string) => p + c.toLowerCase());

/**
 * The same surface for every option: all start with a capital, or (for words filling a gap mid-sentence) all start
 * lowercase unless they are names or acronyms; and either all end with a full stop or none do. `canLower` says whether
 * a capitalised option is an ordinary term (so it can be lowercased) rather than a name.
 */
export function harmonise(options: string[], mode: 'sentence' | 'mid' = 'sentence', canLower?: (option: string) => boolean): string[] {
  let out = options.map((o) => o.trim());
  const termish = out.every((o) => wordsOf(o).length <= 8 && !isFormula(o) && !numberParts(o));
  const classes = new Set(out.map(caseClass).filter((c) => c !== 'x'));
  if (termish && classes.size > 1) {
    if (mode === 'sentence') out = out.map((o) => (caseClass(o) === 'l' && !UNITISH.test(wordsOf(o)[0] ?? '') ? capFirst(o) : o));
    else out = out.map((o) => (caseClass(o) === 'U' && !titleCase(o) && (canLower ? canLower(o) : false) ? lowFirst(o) : o));
  }
  const stops = out.filter((o) => /\.$/.test(strip(o)) && !/\.\.\.$|\be\.g\.$|\betc\.$/.test(strip(o))).length;
  if (stops && stops < out.length) out = out.map((o) => o.replace(/(?<!\.\.)(?<!\be\.g)(?<!\betc)\.\s*$/, ''));
  return out;
}

/** True when an option list has a form giveaway (used by the tests) */
export function formGiveaway(options: string[], answer: number): string | null {
  const a = options[answer];
  const algebra = (o: string) => isFormula(o) || /[a-z]\s*[+−-]\s*\d|\d[a-z]\b|√|[a-z]²/.test(strip(o));
  if (!options.some(algebra)) {
    for (const [i, o] of options.entries()) {
      if (i === answer) continue;
      const pa = numberParts(a), po = numberParts(o);
      if (!!pa !== !!po) return `number among words: "${strip(a)}" / "${strip(o)}"`;
      const u = (x: string) => (x === '%' ? '' : x);
      if (pa && po && u(pa.unit) !== u(po.unit)) return `different units: "${strip(a)}" / "${strip(o)}"`;
    }
  }
  const termy = options.every((o) => wordsOf(o).length <= 5 && !/[.;:?!]$/.test(strip(o)));
  if (termy) {
    const cls = options.map(caseClass).filter((c) => c !== 'x');
    if (new Set(cls).size > 1) return `mixed capitals: ${options.map(strip).join(' | ')}`;
  }
  const ends = options.map((o) => /[^.]\.$/.test(strip(o)));
  if (ends.some(Boolean) && !ends.every(Boolean) && wordsOf(a).length > 3 && !options.some((o) => /\.\.\.$|…$/.test(strip(o)))) return `mixed full stops: ${options.map(strip).join(' | ')}`;
  return null;
}

/** "2.6" as "Act 2, Scene 6" (and "5.3" as "Act 5, Scene 3"); anything else unchanged */
export const actScene = (d: string) => (/^\d+\.\d+$/.test(d.trim()) ? `Act ${d.trim().split('.')[0]}, Scene ${d.trim().split('.')[1]}` : d);
/** a question's answer and options relabelled the same way */
export function relabel<T extends { answer?: unknown; options?: string[] }>(q: T, f: (s: string) => string): T {
  const options = q.options?.map(f);
  // two options that become the same would make the question ambiguous: keep the original labels then
  if (options && new Set(options).size !== options.length) return q;
  return { ...q, answer: typeof q.answer === 'string' ? f(q.answer) : q.answer, options };
}
