// Questions built from a topic's own lesson notes, so every topic has many more questions on exactly what it
// teaches:
//   - key-term gaps: a sentence from the notes with one **bold** key term blanked out; the wrong options are other
//     key terms from the same topic or unit that don't appear in that sentence
//   - table rows: in a notes table with descriptive columns, "which row matches this cell?"; options are the other
//     rows of the same table, and a clue shared by two rows is never used
// Because the sentences and tables are the app's own lesson content, the right answer is always what was taught.
import type { GeneratedQuestion, Generator, Topic } from '../types';
import { mcq, cap, typed } from './facts-kit';
import { shuffle } from '../../lib/util';
import { harmonise, pickPlausible } from './plausible';

// every topic's notes, so a capitalised word can be checked against how the course normally writes it (an ordinary
// word such as "Plasma" at the start of a bullet is lowercased when it fills a gap mid-sentence; a name stays), and
// so each word's usual part of speech can be read from how the notes use it (after "the" it is a noun, after "to" a
// verb, after "is" or "very" an adjective)
const ALL_NOTES: string[] = [];
/** key terms the notes quote (lines of poems, words from a text), so quotations are only offered against quotations */
const QUOTED = new Set<string>();
let lowerWords: Set<string> | null = null;
let midCaps: Set<string> | null = null;
type Pos = 'n' | 'v' | 'a' | 'adv' | '?';
let lex: Map<string, { n: number; v: number; a: number }> | null = null;
const DET = new Set('the a an this that these those its their his her our your each every any no some another of'.split(' '));
const MODAL = new Set('to can will must should may might could would cannot'.split(' '));
const COP = new Set('is are was were be been being very more most less too so become becomes seem seems quite fairly'.split(' '));
const NOT_ADV = new Set('family supply assembly monopoly rally reply ally italy july anomaly melancholy holy jelly belly bully'.split(' '));
const SUBJ = new Set('it he she they we you i who which'.split(' '));
const AFTER_NOUN = new Set('of is are was were has have'.split(' '));
function learnWords() {
  lowerWords = new Set();
  midCaps = new Set();
  lex = new Map();
  const bump = (w: string, k: 'n' | 'v' | 'a') => { const e = lex!.get(w) ?? { n: 0, v: 0, a: 0 }; e[k]++; lex!.set(w, e); };
  for (const n of ALL_NOTES) {
    for (const m of n.matchAll(/(?<=[a-z,;] )([a-z][a-z'-]+)/g)) lowerWords.add(m[1]);
    for (const m of n.matchAll(/(?<=[a-z,;] (?:\*\*)?)(\p{Lu}[\p{Ll}'-]+)/gu)) midCaps.add(m[1].toLowerCase());
    const toks = n.toLowerCase().replace(/\*\*|__|`/g, '').split(/[^a-z'-]+/).filter(Boolean);
    for (let i = 1; i < toks.length; i++) {
      const prev = toks[i - 1], w = toks[i], next = toks[i + 1] ?? '';
      const content = next && !DET.has(next) && !MODAL.has(next) && !COP.has(next) && !AFTER_NOUN.has(next) && !SUBJ.has(next) && next.length > 2;
      // "the anaerobic respiration": a word between "the" and a noun with an adjective ending is an adjective
      if (DET.has(prev)) bump(w, content && /(ic|al|ous|ive|ful|less|able|ible|ary|ar)$/.test(w) ? 'a' : 'n'); else if (MODAL.has(prev) || SUBJ.has(prev)) bump(w, 'v'); else if (COP.has(prev)) bump(w, 'a');
      if (next === 'than') bump(w, 'a');
      if (AFTER_NOUN.has(next) && !DET.has(w) && !SUBJ.has(w)) bump(w, 'n');
    }
  }
}
/** a single word's usual part of speech in the course's notes ('?' when there is too little to go on) */
function posOf(word: string, depth = 0): Pos {
  if (!lex) learnWords();
  const w = word.toLowerCase();
  if (FUNCTION.has(w)) return '?';
  if (/ly$/.test(w) && w.length > 4 && !NOT_ADV.has(w)) return 'adv';
  if (/ing$/.test(w) && w.length > 5) return 'v';
  if (/[^e]ed$/.test(w) && w.length > 5) { const x = lex!.get(w); if (!x || x.v + x.a >= x.n) return 'v'; }
  const e = lex!.get(w);
  if (e) {
    const tot = e.n + e.v + e.a;
    const best = Math.max(e.n, e.v, e.a);
    if (tot >= 2 && best / tot >= 0.6) return best === e.n ? 'n' : best === e.v ? 'v' : 'a';
  }
  if (/(tion|sion|ment|ness|ity|ism|ance|ence|ure|ogy|ist|ia|um|is)s?$/.test(w)) return 'n';
  if (/(ive|ous|ful|less|able|ible|ical|ural|ional|ntal|ial|ual|ic)$/.test(w)) return 'a';
  if (/(ise|ize|ify)$/.test(w)) return 'v';
  if (/(ier|([bdgmnpt])\2er)$/.test(w) || COMPARATIVE.has(w)) return 'a';
  // a plural noun or a verb ending in -s: go by the word without it
  if (depth === 0 && /[^s]s$/.test(w) && w.length > 4) {
    const base = posOf(w.replace(/(ches|shes|sses|xes)$/, (m) => m.slice(0, -2)).replace(/s$/, ''), 1);
    if (base !== '?') return base;
  }
  return e && e.n > 0 && e.n >= e.v && e.n >= e.a ? 'n' : '?';
}
const COMPARATIVE = new Set('thicker wider longer shorter higher lower faster slower stronger weaker smaller larger greater lighter colder warmer deeper steeper louder quieter darker brighter cheaper dearer older younger newer richer poorer safer harder softer weaker tighter looser closer further nearer'.split(' '));
/** words that are never good blanks: their wrong options could only be other small words */
const FUNCTION = new Set('between within without across through why how what when where which who whom whose its it\'s not and or but if then than both each all none some any this that these those there their they them his her our your from into onto over under above below about after before during until since also only just very more most less least'.split(' '));
const oneWord = (s: string) => !/\s/.test(s.trim());
const pluralWord = (w: string) => /[^su']s$/.test(w.toLowerCase()) && w.length > 3;
/** a name (person, place, event): every word capitalised, or a word the notes capitalise mid-sentence and never write in lowercase */
const isName = (s: string) => {
  const ws = s.trim().split(/\s+/);
  if (ws.length > 1 && ws.filter((w) => w.length > 3).every((w) => /^[A-Z]/.test(w)) && /^[A-Z]/.test(ws[0])) return true;
  const w = ws[0].replace(/[^\p{L}'-]/gu, '');
  if (!/^\p{Lu}\p{Ll}/u.test(w)) return false;
  if (!lowerWords) learnWords();
  return !lowerWords!.has(w.toLowerCase()) && midCaps!.has(w.toLowerCase());
};
const firstWord = (s: string) => s.trim().split(/\s+/)[0].replace(/[^A-Za-z'-]/g, '');
const lastWord = (s: string) => { const w = s.trim().split(/\s+/); return (w[w.length - 1] ?? '').replace(/[^A-Za-z'-]/g, ''); };
const YEAR = /\b(1[0-9]{3}|20[0-9]{2})\b/;
/** whether a candidate fits the same grammatical slot as the missing term */
function fitsSlot(answer: string, cand: string, prev: string, quoted: Set<string>): boolean {
  if (isName(answer) !== isName(cand)) return false;
  // a quotation is offered against other quotations; a term against other terms
  if (quoted.has(norm(answer)) !== quoted.has(norm(cand))) return false;
  if (oneWord(cand) && FUNCTION.has(cand.toLowerCase())) return false;
  if (YEAR.test(answer) !== YEAR.test(cand)) return false;
  const need: Pos = DET.has(prev) ? 'n' : MODAL.has(prev) ? 'v' : '?';
  const nounish = (p: Pos) => p === 'n' || p === '?';
  if (oneWord(answer)) {
    const pa = posOf(answer);
    const want = need !== '?' ? need : pa;
    if (oneWord(cand)) {
      const pc = posOf(cand);
      if (nounish(want) ? !nounish(pc) : pc !== want) return false;
      if (nounish(want) && pluralWord(answer) !== pluralWord(cand)) return false;
    } else if (!nounish(want) || posOf(firstWord(cand)) === 'v' || posOf(lastWord(cand)) === 'v') return false;
  } else {
    // phrases: a verb phrase ("zooms in", "treating cancer", "peer reviewed") only against verb phrases
    const verbish = (x: string) => posOf(firstWord(x)) === 'v' || posOf(lastWord(x)) === 'v';
    if (verbish(answer) !== verbish(cand)) return false;
    if (oneWord(cand) && need === 'v' && posOf(cand) !== 'v') return false;
  }
  return true;
}

interface Gap { text: string; term: string; quoted: boolean }
const GENERIC = new Set('plot context ideas idea plan themes theme structure form language setting summary key example examples note tip why how what effect effects method methods purpose review feedback evidence answer remember top tip warning issues issue uses use advantages disadvantages benefits drawbacks problems causes consequences factors features types reasons solutions limitations risks evaluation definition process steps stages pros cons impact impacts results result aim aims overview background exam marks'.split(' '));
interface Row { table: string; ask: string; clueCol: string; answer: string; clue: string; options: string[] }

const strip = (s: string) => s.replace(/\*\*|__|`/g, '').replace(/(?<![a-z])\*(?!\s)|(?<!\s)\*(?![a-z])/gi, '').replace(/\[(.+?)\]\(.+?\)/g, '$1').replace(/\s+/g, ' ').trim();
const norm = (s: string) => strip(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** sentences (or list items) holding at least one short bold key term */
function gapsFrom(notes: string): Gap[] {
  const out: Gap[] = [];
  let inBlock = false;
  for (const raw of notes.split('\n')) {
    const line = raw.trim();
    if (line.startsWith(':::')) { inBlock = !inBlock && line.length > 3; continue; }
    if (inBlock || !line || /^(#|\||>|```|!\[)/.test(line)) continue;
    const body = line.replace(/^([-*+]|\d+\.)\s+/, '');
    // split long paragraphs into sentences, keeping bold spans intact
    const sentences = body.length > 220 ? body.split(/(?<=[.!?])\s+(?=[A-Z*])/) : [body];
    for (const s of sentences) {
      const plain = strip(s);
      if (plain.length < 28 || plain.length > 230) continue;
      const terms = [...s.matchAll(/(?<![A-Za-z])\*\*([^*]{2,40})\*\*(?![A-Za-z])/g)].map((m) => m[1].trim());
      for (const term of terms) {
        const t = strip(term);
        if (t.split(/\s+/).length > 6) continue;
        // fragments from unusual bold markup, and generic labels like "Plot:" or "Context:", make poor questions
        if (!/^[\p{L}\p{N}"'“‘(£$−-]/u.test(t) || /[,=−+(]\s*$/.test(t) || /^[,;:.]/.test(t)) continue;
        if (GENERIC.has(t.toLowerCase()) && new RegExp(`^\\**${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\**\\s*:`).test(s.trim())) continue;
        // the term must occur once in the sentence, and the rest of the sentence must carry enough meaning
        const blanked = strip(s.replace(`**${term}**`, '\u0000')).replace('\u0000', '_____');
        if ((blanked.match(/_____/g) ?? []).length !== 1) continue;
        if (blanked.replace('_____', '').replace(/[^a-z]/gi, '').length < 18) continue;
        if (norm(blanked).includes(norm(t))) continue;
        // a blank needs a real word or name: no fragments of mnemonics ("Ti" from TiPToP) or lone letters
        if (t.replace(/[^A-Za-z]/g, '').length < 3 && !/^[A-Z0-9]{2,}$/.test(t)) continue;
        if (FUNCTION.has(t.toLowerCase()) || /^(and|or|but|of|with|by|for|in|on|at|as)\s/i.test(t)) continue;
        out.push({ text: blanked, term: t, quoted: /["“‘']_____["”’']/.test(blanked) });
      }
    }
  }
  return out;
}

function splitRow(line: string) { return line.trim().replace(/^\||\|$/g, '').split('|').map((c) => strip(c)); }

/** table rows usable as "which row matches?" questions */
function rowsFrom(notes: string): Row[] {
  const out: Row[] = [];
  const lines = notes.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*\|/.test(lines[i]) || !/^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? '')) continue;
    const head = splitRow(lines[i]);
    const body: string[][] = [];
    let j = i + 2;
    for (; j < lines.length && /^\s*\|/.test(lines[j]); j++) body.push(splitRow(lines[j]));
    i = j;
    if (head.length < 2 || body.length < 4 || body.some((r) => r.length !== head.length)) continue;
    const keys = body.map((r) => r[0]);
    if (new Set(keys.map(norm)).size !== keys.length || keys.some((k) => !k || k.length > 45)) continue;
    // two-column tables only when the second column describes the first (not two lists side by side)
    const avg = (c: number) => body.reduce((a, r) => a + r[c].length, 0) / body.length;
    if (head.length === 2 && !(avg(1) > 20 && avg(1) >= 1.8 * avg(0))) continue;
    for (let c = 1; c < head.length; c++) {
      const col = body.map((r) => r[c]);
      for (let k = 0; k < body.length; k++) {
        const clue = col[k];
        if (!clue || clue.length < 4 || clue === '-' || col.filter((x) => norm(x) === norm(clue)).length > 1) continue;
        if (norm(clue).includes(norm(keys[k]))) continue;
        out.push({ table: head.join(' / '), ask: head[0] || 'item', clueCol: head[c] || 'detail', answer: keys[k], clue, options: keys.filter((_, x) => x !== k) });
      }
    }
  }
  return out;
}

const lengthCue = (q: GeneratedQuestion) => !!q.options && q.options[0].length > 25 && q.options[0].length > 1.4 * Math.max(...q.options.slice(1).map((o) => o.length));

/** A notes generator for one topic, or null when its notes give too little to ask about */
export function notesGenerator(topic: Topic, unitTerms: string[]): Generator | null {
  ALL_NOTES.push(topic.notes);
  const gaps = gapsFrom(topic.notes);
  for (const g of gaps) if (g.quoted) QUOTED.add(norm(g.term));
  const rows = rowsFrom(topic.notes);
  const ownTerms = [...new Set(gaps.map((g) => g.term))];
  if (gaps.length + rows.length < 3) return null;
  const gapQ = (rand: () => number, relaxed = false): GeneratedQuestion | null => {
    if (!gaps.length) return null;
    const g = gaps[Math.floor(rand() * gaps.length)];
    const inSentence = norm(g.text);
    // wrong options: key terms of the same kind and form as the missing one (the topic's own terms count as closer),
    // none that already appears in the sentence; with fewer than three good ones, ask a different question
    const own = new Set(ownTerms.map(norm));
    const prev = (g.text.split('_____')[0].toLowerCase().match(/([a-z']+)\W*$/)?.[1]) ?? '';
    const notGeneric = (w: string) => !GENERIC.has(norm(w));
    const sentWords = new Set(norm(g.text).split(' ').filter((w) => w.length > 3));
    const slashes = (x: string) => (x.match(/\//g) ?? []).length >= 2;
    const pool = [...shuffle(ownTerms, rand), ...unitTerms].filter((w) => !inSentence.includes(norm(w)) && fitsSlot(g.term, w, prev, QUOTED)
      && notGeneric(w) && slashes(w) === slashes(g.term) && !(isName(w) && norm(w).split(' ').some((x) => sentWords.has(x))));
    const wrong = pickPlausible(g.term, pool, 3, rand, relaxed ? -6 : 0.5, (c) => (own.has(norm(c)) ? 1 : 0));
    if (!wrong) return null;
    // the options read as they would in the sentence: capitalised at the start, lowercase mid-sentence (except names)
    const atStart = /(^|[.!?:]\s+|·\s+)_____/.test(g.text.trim());
    const opts = harmonise([g.term, ...wrong], atStart ? 'sentence' : 'mid', (o) => !isName(o));
    return { q: `Complete this point from the lesson:\n\n> ${cap(g.text)}`, answer: opts[0], options: opts, steps: [`From the notes on **${topic.title}**: ${g.text.replace('_____', `**${g.term}**`)}`], d: 2, hints: ['Think about which key term the rest of the sentence describes.'] };
  };
  const rowQ = (rand: () => number): GeneratedQuestion | null => {
    if (!rows.length) return null;
    const r = rows[Math.floor(rand() * rows.length)];
    return mcq(rand, `In the lesson's table (${r.table}), which **${r.ask.toLowerCase()}** matches this entry in the "${r.clueCol}" column?\n\n> ${r.clue}`, r.answer, r.options, [`${cap(r.answer)} – ${r.clueCol.toLowerCase()}: ${r.clue}.`], 2);
  };
  return {
    id: `nt-${topic.id}`,
    title: `From the lesson: ${topic.title}`,
    make: (rand) => {
      for (let k = 0; k < 8; k++) {
        const q = rows.length && (!gaps.length || rand() < Math.min(0.5, rows.length / (rows.length + gaps.length))) ? rowQ(rand) : gapQ(rand);
        if (q && !lengthCue(q)) return q;
      }
      // no convincing question this time: try harder before falling back to the table
      for (let k = 0; k < 12; k++) { const q = gapQ(rand); if (q) return q; }
      for (let k = 0; k < 12; k++) { const q = rowQ(rand) ?? gapQ(rand, true); if (q) return q; }
      // no set of options here would be convincing, so the student types the missing term (which can't be guessed)
      if (gaps.length) {
        const g = gaps[Math.floor(rand() * gaps.length)];
        return typed(`Complete this point from the lesson (type the missing term):\n\n> ${cap(g.text)}`, g.term, [], [`From the notes on **${topic.title}**: ${g.text.replace('_____', `**${g.term}**`)}`], 3, [`It starts with "${g.term.slice(0, 2)}".`]);
      }
      return mcq(rand, `Which of these is a key term in **${topic.title}**?`, ownTerms[0] ?? topic.title, unitTerms.filter((t) => !ownTerms.includes(t)), [topic.summary], 1);
    },
  };
}

/** all the bold key terms in a set of notes (used as wrong options across a unit) */
export const _posOf = (w: string) => posOf(w);
export const keyTerms = (notes: string) => [...new Set(gapsFrom(notes).map((g) => g.term))];
