// Questions built from a topic's own lesson notes, so every topic has many more questions on exactly what it
// teaches:
//   - key-term gaps: a sentence from the notes with one **bold** key term blanked out; the wrong options are other
//     key terms from the same topic or unit that don't appear in that sentence
//   - table rows: in a notes table with descriptive columns, "which row matches this cell?"; options are the other
//     rows of the same table, and a clue shared by two rows is never used
// Because the sentences and tables are the app's own lesson content, the right answer is always what was taught.
import type { GeneratedQuestion, Generator, Topic } from '../types';
import { mcq, cap } from './facts-kit';
import { shuffle } from '../../lib/util';

interface Gap { text: string; term: string }
const GENERIC = new Set('plot context ideas idea plan themes theme structure form language setting summary key example examples note tip why how what effect effects method methods purpose review feedback evidence answer remember top tip warning'.split(' '));
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
      const terms = [...s.matchAll(/\*\*([^*]{2,40})\*\*/g)].map((m) => m[1].trim());
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
        out.push({ text: blanked, term: t });
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
  const gaps = gapsFrom(topic.notes);
  const rows = rowsFrom(topic.notes);
  const ownTerms = [...new Set(gaps.map((g) => g.term))];
  if (gaps.length + rows.length < 3) return null;
  const gapQ = (rand: () => number): GeneratedQuestion | null => {
    if (!gaps.length) return null;
    const g = gaps[Math.floor(rand() * gaps.length)];
    const inSentence = norm(g.text);
    // the topic's own key terms first, then a random handful from the rest of the unit (no need to shuffle them all)
    const sample = Array.from({ length: Math.min(14, unitTerms.length) }, () => unitTerms[Math.floor(rand() * unitTerms.length)]);
    const wrong = [...shuffle(ownTerms, rand), ...sample]
      .filter((w) => norm(w) !== norm(g.term) && !inSentence.includes(norm(w)) && !norm(g.term).includes(norm(w)) && !norm(w).includes(norm(g.term)));
    if (new Set(wrong.map(norm)).size < 3) return null;
    return mcq(rand, `Complete this point from the lesson:\n\n> ${cap(g.text)}`, g.term, wrong, [`From the notes on **${topic.title}**: ${g.text.replace('_____', `**${g.term}**`)}`], 2, ['Think about which key term the rest of the sentence describes.']);
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
      // every attempt gave itself away: fall back to the plainest gap question
      return gapQ(rand) ?? rowQ(rand) ?? mcq(rand, `Which of these is a key term in **${topic.title}**?`, ownTerms[0] ?? topic.title, unitTerms, [topic.summary], 1);
    },
  };
}

/** all the bold key terms in a set of notes (used as wrong options across a unit) */
export const keyTerms = (notes: string) => [...new Set(gapsFrom(notes).map((g) => g.term))];
