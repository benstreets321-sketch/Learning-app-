// Ambitious vocabulary practice: meanings, choosing the word, upgrading a plain word in a sentence, and spelling it.
// Wrong options never mean the same thing as the answer (no two "right" answers), checked by comparing meanings.
import type { GeneratedQuestion, Generator } from '../types';
import { VOCAB, VOCAB_CATS, type VocabCat, type Word } from '../vocab';
import { mcq } from './facts-kit';
import { shuffle } from '../../lib/util';

const G = (id: string, title: string, make: Generator['make']): Generator => ({ id, title, make });
const STOP = new Set('that this with from very something someone into your than make makes making there their have been what when which them they about over more most like much feel feeling being only just'.split(' '));
const stem = (w: string) => w.replace(/(ing|ed|es|s|ly)$/, '');
const keys = (v: Word) => new Set([...(`${v.def} ${v.plain}`.toLowerCase().match(/[a-z]{4,}/g) ?? [])].filter((w) => !STOP.has(w)).map(stem));
// near-synonyms that must never be offered against each other (either could be argued to be right)
const NEAR: string[][] = [
  ['imply', 'allude', 'connote', 'evoke', 'convey', 'foreshadow'], ['emphasise', 'accentuate', 'intensify', 'reinforce'], ['epitomise', 'encapsulate', 'symbolise'],
  ['critique', 'expose', 'condemn', 'scrutinise'], ['undermine', 'subvert'],
  ['ominous', 'foreboding', 'menacing', 'sinister', 'eerie', 'unnerving', 'malevolent'], ['serene', 'tranquil', 'idyllic'],
  ['melancholy', 'forlorn', 'desolate', 'bleak', 'despondent', 'wistful'], ['oppressive', 'stifling', 'claustrophobic', 'sweltering'],
  ['apprehensive', 'timid', 'vulnerable'], ['callous', 'malevolent', 'arrogant'], ['benevolent', 'compassionate'], ['tenacious', 'resolute', 'defiant'],
  ['exasperated', 'indignant', 'petulant'], ['luminous', 'lustrous', 'iridescent', 'resplendent', 'opulent'], ['dilapidated', 'ramshackle'],
  ['gaunt', 'pallid', 'wizened'], ['acrid', 'pungent', 'fetid', 'stench'], ['shrill', 'discordant', 'rasping', 'guttural', 'cacophony'],
  ['scurry', 'dart', 'flit', 'hurtle', 'careen', 'surge'], ['trudge', 'lumber', 'saunter', 'meander'], ['lurch', 'teeter', 'falter', 'recoil'],
  ['writhe', 'slither'], ['plummet', 'cascade'], ['imperative', 'crucial', 'paramount'], ['detrimental', 'catastrophic', 'deplorable', 'alarming', 'unacceptable'],
  ['compelling', 'irrefutable'], ['undeniably', 'unequivocally', 'inevitably'], ['plethora', 'myriad'], ['towering', 'cavernous'], ['murky', 'bleak'],
];
const nearOf = new Map<string, Set<string>>();
for (const g of NEAR) for (const w of g) nearOf.set(w, new Set([...(nearOf.get(w) ?? []), ...g]));
/** true when two words could not be mistaken for each other's meaning */
export const distinct = (a: Word, b: Word) => {
  if (a.w === b.w || nearOf.get(a.w)?.has(b.w)) return false;
  const ka = keys(a);
  for (const k of keys(b)) if (ka.has(k)) return false;
  return true;
};
const pickWord = (rand: () => number, cats?: VocabCat[]) => { const list = VOCAB.filter((v) => !cats || cats.includes(v.cat)); return list[Math.floor(rand() * list.length)]; };
const blank = (v: Word) => v.ex.replace(new RegExp(`\\b${v.w.slice(0, Math.max(4, v.w.length - 3))}[a-z]*`, 'i'), '_____');
const use = (v: Word) => `**${v.w}** (${v.pos === 'adj' ? 'adjective' : v.pos === 'adv' ? 'adverb' : v.pos}): ${v.def}. *${v.ex}*`;

function others(rand: () => number, ans: Word, sameCat: boolean): Word[] {
  const pool = VOCAB.filter((v) => v.pos === ans.pos && distinct(ans, v) && (sameCat ? v.cat === ans.cat : v.cat !== ans.cat));
  return shuffle(pool, rand);
}

function meaningQ(rand: () => number, cats?: VocabCat[]): GeneratedQuestion {
  const v = pickWord(rand, cats);
  const wrong = [...others(rand, v, true), ...others(rand, v, false)].map((x) => x.def);
  return mcq(rand, `What does **${v.w}** mean?`, v.def, wrong, [use(v), `Use it for: ${VOCAB_CATS[v.cat].use}`], 2);
}

function wordQ(rand: () => number, cats?: VocabCat[]): GeneratedQuestion {
  const v = pickWord(rand, cats);
  const wrong = [...others(rand, v, true), ...others(rand, v, false)].map((x) => x.w);
  return mcq(rand, `Which word means **"${v.def}"**?`, v.w, wrong, [use(v)], 2);
}

function upgradeQ(rand: () => number, cats?: VocabCat[]): GeneratedQuestion {
  const v = pickWord(rand, cats);
  const sentence = blank(v);
  if (!sentence.includes('_____')) return wordQ(rand, cats);
  // options from other groups, so only one of them means the plain word
  let wrong = others(rand, v, false).map((x) => x.w);
  if (wrong.length < 3) wrong = [...wrong, ...others(rand, v, true).map((x) => x.w)];
  return mcq(rand, `Upgrade the plain word **"${v.plain}"**. Which ambitious word fits the gap?\n\n> ${sentence}`, v.w, wrong, [use(v), `"${v.plain}" works, but **${v.w}** is more precise – it tells the reader exactly what kind.`], 2, ['Which option means the plain word in brackets?']);
}

function spellQ(rand: () => number, cats?: VocabCat[]): GeneratedQuestion {
  const v = pickWord(rand, cats);
  const start = v.w.slice(0, Math.min(3, Math.ceil(v.w.length / 3)));
  return { q: `Type the word that means **"${v.def}"**. It starts **${start}…** and has ${v.w.length} letters.`, answer: v.w, accept: [v.w], exact: true, steps: [use(v), `Spelling: ${v.w.split('').join(' ')}`], hints: [`It upgrades the plain word "${v.plain}".`], d: 3 };
}

const DESC: VocabCat[] = ['sight', 'senses', 'mood', 'movement', 'character'];
const ARG: VocabCat[] = ['argue'];
const AN: VocabCat[] = ['analyse'];

export const VOCAB_GENERATORS: Generator[] = [
  G('vb-meaning', 'Vocabulary: what does it mean?', (r) => meaningQ(r)),
  G('vb-word', 'Vocabulary: find the word', (r) => wordQ(r)),
  G('vb-upgrade', 'Vocabulary: upgrade the plain word', (r) => upgradeQ(r)),
  G('vb-spell', 'Vocabulary: spell it', (r) => spellQ(r)),
  G('vb-desc', 'Descriptive vocabulary', (r) => (r() < 0.5 ? upgradeQ(r, DESC) : r() < 0.5 ? meaningQ(r, DESC) : spellQ(r, DESC))),
  G('vb-argue', 'Persuasive vocabulary', (r) => (r() < 0.5 ? upgradeQ(r, ARG) : r() < 0.5 ? meaningQ(r, ARG) : wordQ(r, ARG))),
  G('vb-analyse', 'Analysis verbs', (r) => (r() < 0.5 ? meaningQ(r, AN) : wordQ(r, AN))),
];

export const VOCAB_TOPICS: Record<string, string[]> = {
  'el-vocab': ['vb-meaning', 'vb-word', 'vb-upgrade', 'vb-spell'],
  'el-p1q5': ['vb-desc'],
  'el-p2q5': ['vb-argue'],
  'el-methods': ['vb-analyse'],
  'el-p1q2': ['vb-analyse'],
  'lit-essay': ['vb-analyse'],
  'lit-terms': ['vb-analyse'],
};
