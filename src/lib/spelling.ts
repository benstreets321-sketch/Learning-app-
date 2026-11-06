// Spelling help AFTER answering. While a student types, nothing is underlined (as in the real exam); once they
// submit, likely misspellings are pointed out with the correct spelling. The dictionary is every word in the app's
// own lessons, flashcards, questions and mark schemes - the words students need for their GCSEs - plus a list of
// words students commonly misspell. Words the app doesn't know at all (names, rare words) are left alone.
import { SUBJECTS } from '../content/registry';
import { SPELLINGS } from '../content/generators/english-more';
/** edit distance where swapping two neighbouring letters counts as one slip (recieve → receive) */
function osa(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (Math.abs(m - n) > 2) return 9;
  const d: number[][] = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[m][n];
}

/** the classic slips: ie/ei, a doubled or missing double letter, two letters swapped */
function patternFix(w: string, ok: (x: string) => boolean): string | null {
  const tries: string[] = [];
  for (let i = 0; i < w.length - 1; i++) {
    if (w.slice(i, i + 2) === 'ie') tries.push(w.slice(0, i) + 'ei' + w.slice(i + 2));
    if (w.slice(i, i + 2) === 'ei') tries.push(w.slice(0, i) + 'ie' + w.slice(i + 2));
    if (w[i] === w[i + 1]) tries.push(w.slice(0, i) + w.slice(i + 1));
    tries.push(w.slice(0, i) + w[i + 1] + w[i] + w.slice(i + 2));
  }
  for (let i = 0; i < w.length; i++) if (/[a-z]/.test(w[i])) tries.push(w.slice(0, i + 1) + w[i] + w.slice(i + 1));
  return tries.find((t) => t !== w && ok(t)) ?? null;
}

let vocab: Set<string> | null = null;
let byLen: Map<number, string[]> | null = null;
let common: Map<string, string> | null = null;
/** everyday English (British) words, loaded on first use - so correct words are never flagged */
let dict: Set<string> | null = null;
let dictLoading: Promise<void> | null = null;

export function ensureDictionary(): Promise<void> {
  if (dict) return Promise.resolve();
  dictLoading ??= import('../content/wordlist').then((m) => {
    dict = new Set(m.WORDS.split('\n'));
    byLen = null; // rebuild the candidate index with the new words
  });
  return dictLoading;
}
export const dictionaryReady = () => !!dict;

const WORD = /[A-Za-z][A-Za-z'’-]*[A-Za-z]|[A-Za-z]/g;
const clean = (w: string) => w.toLowerCase().replace(/[’]/g, "'").replace(/^'+|'+$/g, '');

function add(set: Set<string>, text: string | undefined) {
  if (!text) return;
  for (const m of text.match(WORD) ?? []) {
    const w = clean(m);
    if (w.length >= 2) { set.add(w); if (w.endsWith("'s")) set.add(w.slice(0, -2)); }
  }
}

function index() {
  if (byLen) return;
  byLen = new Map();
  for (const w of new Set([...vocab!, ...(dict ?? [])])) {
    if (w.length < 4 || /[-']/.test(w)) continue;
    const l = w.length;
    if (!byLen.has(l)) byLen.set(l, []);
    byLen.get(l)!.push(w);
  }
}

function build() {
  if (vocab) { index(); return; }
  const set = new Set<string>();
  for (const s of SUBJECTS) {
    add(set, s.name);
    for (const u of s.units) {
      add(set, u.title);
      for (const t of u.topics) {
        add(set, t.title); add(set, t.summary); add(set, t.notes); add(set, t.simpler);
        t.keyPoints.forEach((k) => add(set, k));
        for (const c of t.flashcards) { add(set, c.front); add(set, c.back); }
        for (const q of t.questions) {
          const r = q as unknown as Record<string, unknown>;
          for (const v of Object.values(r)) {
            if (typeof v === 'string') add(set, v);
            else if (Array.isArray(v)) v.forEach((x) => { if (typeof x === 'string') add(set, x); else if (Array.isArray(x)) x.forEach((y) => typeof y === 'string' && add(set, y)); });
          }
        }
        for (const e of t.examQuestions ?? []) { add(set, e.q); e.markScheme.forEach((m) => add(set, m)); add(set, e.model); }
        for (const q of t.quotes ?? []) { add(set, q.text); add(set, q.analysis); }
      }
    }
  }
  // everyday words that may not appear in lessons
  add(set, 'i a an the and but or so because although however therefore whereas while when where which who whom whose why how what this that these those there their they they\'re we our us you your you\'re he she it its it\'s his her him them me my mine was were is are be been being have has had do does did done would could should might must can will shall not no yes very really also too then than into onto upon about above below between through during before after again always never often sometimes usually perhaps maybe probably definitely certainly clearly suggests shows shown showing implies imply makes made make made writer reader audience character characters quote quotation evidence example examples explain explains explained describe describes described compare contrast similar different difference effect effects affect affects language structure form theme themes context paragraph sentence sentences word words phrase phrases');
  vocab = set;
  common = new Map();
  for (const [right, wrongs] of SPELLINGS) for (const w of wrongs) common.set(w.toLowerCase(), right);
  index();
  for (const [w, r] of [['wensday', 'Wednesday'], ['wendsday', 'Wednesday'], ['febuary', 'February'], ['libary', 'library'], ['probaly', 'probably'], ['goverment', 'government'], ['alot', 'a lot'], ['should of', 'should have'], ['could of', 'could have'], ['would of', 'would have'], ['definately', 'definitely'], ['seperate', 'separate'], ['wich', 'which'], ['becuase', 'because'], ['beacuse', 'because'], ['thier', 'their'], ['untill', 'until'], ['wierd', 'weird'], ['recieve', 'receive'], ['belive', 'believe'], ['beleive', 'believe'], ['writen', 'written'], ['occured', 'occurred'], ['begining', 'beginning'], ['tommorow', 'tomorrow'], ['arguement', 'argument'], ['shakespear', 'Shakespeare'], ['similie', 'simile'], ['onomatopia', 'onomatopoeia'], ['alliterration', 'alliteration'], ['metafor', 'metaphor'], ['personificaton', 'personification'], ['photosythesis', 'photosynthesis'], ['equasion', 'equation']] as const) common.set(w, r);
}

const INFLECTIONS = ['s', 'es', 'ed', 'd', 'ing', 'ly'];
const SUFFIXES = ['s', 'es', 'ed', 'd', 'ing', 'er', 'ers', 'est', 'ly', 'ness', 'ment', 'ments', 'ful', 'less', 'able', 'ion', 'ions', 'ity', 'al', 'ally', 'ise', 'ised', 'ize', 'ized', 'ism', 'ist', 'ists', 'ive'];
/** a word counts as known if it, its stem (jumped → jump, making → make, studies → study) or a longer form of it is in the dictionary */
function known(w: string): boolean {
  const v = { has: (x: string) => vocab!.has(x) || !!dict?.has(x) };
  if (v.has(w)) return true;
  if (w.endsWith("'s") && v.has(w.slice(0, -2))) return true;
  // a longer form of the word is known, so this is its base form (skateboard ← skateboarding)
  for (const suf of SUFFIXES) if (v.has(w + suf)) return true;
  // regular inflections only (jumped → jump, making → make, studies → study, stopping → stop); "inspecter" is not inspect + er
  for (const suf of INFLECTIONS) {
    if (!w.endsWith(suf) || w.length - suf.length < 3) continue;
    const stem = w.slice(0, -suf.length);
    if (v.has(stem) || v.has(stem + 'e') || (stem.endsWith('i') && v.has(stem.slice(0, -1) + 'y'))) return true;
    // consonant doubling only after a single short vowel, and never w, x or y (stop → stopping, travel → travelled)
    if (/([b-df-hj-np-tvz])\1$/.test(stem) && /[aeiou]/.test(stem[stem.length - 3] ?? '') && !/[aeiou]/.test(stem[stem.length - 4] ?? '') && v.has(stem.slice(0, -1))) return true;
  }
  if (w.startsWith('un') || w.startsWith('re') || w.startsWith('dis') || w.startsWith('mis') || w.startsWith('pre')) {
    const rest = w.replace(/^(un|re|dis|mis|pre)/, '');
    if (rest.length >= 4 && v.has(rest)) return true;
  }
  return false;
}

export interface SpellNote { word: string; suggestion: string }

/** Likely misspellings in a piece of writing, each with the correct spelling (at most `limit`, each word once) */
export function spellingNotes(text: string, limit = 12): SpellNote[] {
  if (!text || !text.trim()) return [];
  build();
  const out: SpellNote[] = [];
  const seen = new Set<string>();
  // "should of" style errors first
  for (const m of text.toLowerCase().matchAll(/\b(should|could|would|must) of\b/g)) {
    const k = m[0];
    if (!seen.has(k)) { seen.add(k); out.push({ word: k, suggestion: `${m[1]} have` }); }
  }
  for (const m of text.match(WORD) ?? []) {
    if (out.length >= limit) break;
    const raw = m.replace(/[’]/g, "'");
    const w = clean(raw);
    if (seen.has(w) || w.length < 3) continue;
    seen.add(w);
    const listed = common!.get(w);
    if (listed) { out.push({ word: raw, suggestion: matchCase(raw, listed) }); continue; }
    if (known(w) || /\d/.test(w) || w.includes('-') || w.includes("'")) continue;
    // without the everyday dictionary we can't be sure a word is wrong, so only the known-misspellings list is used
    if (!dict) continue;
    // only fairly long words are checked against near-misses: short words have too many real neighbours
    const maxD = w.length >= 11 ? 2 : w.length >= 5 ? 1 : 0;
    if (!maxD) continue;
    // a capitalised word is probably a name: only correct it towards a name or term the course itself uses
    const isName = /^[A-Z]/.test(raw);
    const inCourse = (x: string) => vocab!.has(x);
    const pat = patternFix(w, isName ? inCourse : (x) => inCourse(x) || !!dict!.has(x));
    if (pat) { out.push({ word: raw, suggestion: matchCase(raw, pat) }); continue; }
    let best = '', bestD = maxD + 1;
    for (let l = w.length - maxD; l <= w.length + maxD; l++) {
      for (const cand of byLen!.get(l) ?? []) {
        if (cand[0] !== w[0] && maxD === 1) continue;
        // a near miss is only suggested towards a word the course itself uses (key terms, names, everyday words in
        // the lessons) - so a rare but real word is never "corrected" to a different everyday word
        if (!inCourse(cand)) continue;
        const d = osa(w, cand);
        if (d < bestD || (d === bestD && cand.length === w.length && best.length !== w.length)) { best = cand; bestD = d; if (d === 1 && cand.length === w.length) break; }
      }
    }
    if (best && bestD <= maxD && (!isName || vocab!.has(best))) out.push({ word: raw, suggestion: matchCase(raw, best) });
  }
  return out.slice(0, limit);
}

const matchCase = (orig: string, fix: string) => (/^[A-Z]/.test(orig) ? fix.charAt(0).toUpperCase() + fix.slice(1) : fix);

/** Warm the dictionaries in the background so the first check after answering is instant */
export function prepareSpelling() { void ensureDictionary().then(() => build()); }
