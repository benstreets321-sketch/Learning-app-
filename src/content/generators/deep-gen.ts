// Questions from the deep fact banks. Each fact gives several forms - definition → term, term → definition,
// example → term, typed recall of the term - and each process gives "what comes next" and "what comes first".
// Wrong options come from the same topic (the most confusable ones) and never include a near-synonym of the answer.
import type { GeneratedQuestion, Generator } from '../types';
import type { DeepBank, DeepFact } from '../deep/types';
import { BIOLOGY_DEEP } from '../deep/biology';
import { CHEMISTRY_DEEP } from '../deep/chemistry';
import { PHYSICS_DEEP } from '../deep/physics';
import { IMEDIA_DEEP } from '../deep/imedia';
import { BUSINESS_DEEP } from '../deep/business';
import { ENGLISH_DEEP } from '../deep/english';
import { LITERATURE_DEEP } from '../deep/literature';
import { formOk } from './plausible';
import { mcq, typed, cap, pick } from './facts-kit';
import { shuffle } from '../../lib/util';

const BANKS: DeepBank[] = [BIOLOGY_DEEP, CHEMISTRY_DEEP, PHYSICS_DEEP, IMEDIA_DEEP, BUSINESS_DEEP, ENGLISH_DEEP, LITERATURE_DEEP];

// terms that must never be offered against each other: either could be argued to be right for the other's example
const NEAR: string[][] = [
  ['alliteration', 'sibilance'], ['imagery', 'sensory language', 'semantic field'], ['repetition', 'short sentence', 'listing'],
  ['pathetic fallacy', 'personification'], ['juxtaposition', 'oxymoron'], ['metaphor', 'imagery'],
  ['rhetorical question', 'direct address', 'inclusive pronouns', 'imperative', 'call to action'], ['emotive language', 'hyperbole'],
  ['simple sentence', 'fronted adverbial', 'short sentence'], ['complex sentence', 'subordinate clause', 'fronted adverbial'],
  ['soliloquy', 'aside', 'dramatic monologue'], ['tragic hero', 'hamartia', 'protagonist'], ['allegory', 'didactic'],
  ['statistic', 'expert opinion'], ['tone', 'viewpoint', 'perspective'], ['cyclical structure', 'circular narrative'],
  ['flashback', 'in medias res'], ['show, don\'t tell', 'characterisation'], ['first person', 'narrative perspective', 'third person'],
  ['creative roles', 'technical roles', 'senior roles'], ['libel', 'defamation', 'slander'], ['copyright', 'Creative Commons', 'fair dealing'],
  ['digital mood board', 'physical mood board', 'mood board'], ['online distribution', 'streaming'], ['primary research', 'focus group'],
  ['quality control', 'quality assurance'], ['merger', 'takeover', 'external growth'], ['profit', 'net profit'],
  ['enterprise', 'entrepreneur'], ['micro enterprise', 'SME'], ['raster image', 'JPG', 'PNG', 'GIF'], ['vector image', 'SVG'],
  ['resolution', 'DPI'], ['lossy compression', 'JPG', 'MP3'], ['lossless compression', 'PNG', 'WAV'], ['producer', 'production manager'], ['director', 'senior roles'],
  ['eukaryotic cell', 'specialised cell'], ['diffusion', 'osmosis'], ['nerve cell', 'sensory neurone', 'relay neurone', 'motor neurone'],
  ['metal', 'transition metals', 'alkali metals'], ['ion', 'ionic bonding'], ['oxidation', 'OIL RIG'], ['reduction', 'OIL RIG'],
  ['scalar', 'distance', 'speed'], ['vector', 'displacement', 'velocity'], ['gamma ray', 'gamma rays'], ['period', 'frequency'],
  ['exothermic', 'exothermic reaction'], ['endothermic reaction', 'bond breaking'], ['exothermic reaction', 'bond making'],
  ['acid', 'strong acid', 'weak acid'], ['alkanes', 'hydrocarbon'], ['element', 'atom'], ['white blood cell', 'phagocytosis', 'lymphocyte'],
  ['antibodies', 'monoclonal antibodies'], ['cuttings', 'tissue culture'], ['evolution', 'natural selection'],
];
const nearOf = new Map<string, Set<string>>();
for (const g of NEAR) for (const w of g) nearOf.set(w.toLowerCase(), new Set([...(nearOf.get(w.toLowerCase()) ?? []), ...g.map((x) => x.toLowerCase())]));
const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/s\b/g, '').trim();
/** a wrong option that could not be argued to be right */
const fair = (ans: DeepFact, other: DeepFact) => key(ans[0]) !== key(other[0]) && !nearOf.get(ans[0].toLowerCase())?.has(other[0].toLowerCase()) && key(ans[1]) !== key(other[1]);

const short = (t: string) => t.split(/\s+/).length <= 3 && !/[()'’=+×÷]/.test(t);
const why = (f: DeepFact) => [`**${cap(f[0])}**: ${f[1]}.${f[2] ? ` For example: ${f[2]}` : ''}`];

function factQ(rand: () => number, lvl: number, facts: readonly DeepFact[], others: readonly DeepFact[], noun = 'key term'): GeneratedQuestion {
  const f = pick(rand, facts);
  // for named things (characters, places, objects): people and places against people and places, objects against
  // objects ("the windmill" is never offered among the farmers)
  const thing = (x: DeepFact) => /^(the|a|an)\s/i.test(x[0]);
  const sameKind = noun === 'name' ? facts.filter((o) => thing(o) === thing(f)) : facts;
  const kinded = sameKind.filter((o) => fair(f, o)).length >= 3 ? sameKind : facts;
  // same-topic options are the most confusable and come first; a wider sample from the subject follows, so when the
  // topic's own terms differ in kind or form from the answer ("strong acid" against "metal + acid") the shared mcq
  // helper can find ones that match ("carbonate + acid", "alkali + acid")
  const own = shuffle(kinded.filter((o) => fair(f, o)), rand);
  // (never for a set text: a character or object from another book would be ruled out at once)
  const wider = noun === 'name' ? [] : shuffle(others.filter((o) => fair(f, o) && !own.includes(o)), rand).slice(0, 24);
  /** the topic's own options for one field, topped up from the subject only when too few of them match the answer's form */
  const opts = (field: 0 | 1, answer: string, list = own) => {
    const mine = list.map((o) => (field === 1 ? cap(o[1]) : o[0]));
    return mine.filter((o) => formOk(answer, o)).length >= 3 ? mine : [...mine, ...wider.map((o) => (field === 1 ? cap(o[1]) : o[0]))];
  };
  const pool = own.length >= 4 ? own : [...own, ...wider.slice(0, 6 - own.length)];
  const form = rand();
  if (lvl >= 4 && short(f[0]) && form < 0.35) {
    const start = f[0].slice(0, Math.min(3, Math.ceil(f[0].length / 3)));
    return typed(`Write the ${noun} for: **${f[1]}**. *(It starts "${start}…")*`, f[0], [f[0], f[0].replace(/-/g, ' '), f[0].replace(/^(the|a|an)\s+/i, '')], why(f), 4);
  }
  if (f[2] && form < 0.55) {
    const exPool = pool.filter((o) => !o[2] || o[2] !== f[2]);
    return mcq(rand, `Which ${noun} does this example show?\n\n> ${f[2]}`, f[0], opts(0, f[0], exPool), why(f), 3);
  }
  // a long definition among short ones would give itself away, so ask the other way round instead
  const longEnough = f[1].length <= 25 || pool.filter((o) => o[1].length * 1.45 >= f[1].length).length >= 2;
  // fewer than three wrong options of the answer's own form (a year among names): type it instead of guessing
  if (form < 0.78 || !longEnough) {
    if ([...own, ...wider].filter((o) => formOk(f[0], o[0])).length < 3) return typed(`Write the ${noun} for: **${f[1]}**. *(It starts "${f[0].replace(/^(the|a|an)\s+/i, '').slice(0, 2)}…")*`, f[0], [f[0], f[0].replace(/-/g, ' '), f[0].replace(/^(the|a|an)\s+/i, '')], why(f), 3);
    return mcq(rand, `Which ${noun} matches this description?\n\n> ${cap(f[1])}`, f[0], opts(0, f[0], pool), why(f), 2);
  }
  return mcq(rand, `Which description matches **${f[0]}**?`, cap(f[1]), opts(1, cap(f[1]), pool), why(f), 2);
}

function stepQ(rand: () => number, proc: { name: string; steps: string[] }): GeneratedQuestion {
  const s = proc.steps;
  const all = `The order: ${s.map((x, i) => `${i + 1}. ${x}`).join('; ')}.`;
  if (rand() < 0.25) return mcq(rand, `What is the **first** stage in ${proc.name}?`, cap(s[0]), s.slice(1).map(cap), [all], 2);
  const i = Math.floor(rand() * (s.length - 1));
  return mcq(rand, `In ${proc.name}, which stage comes **straight after** this one?\n\n> ${cap(s[i])}`, cap(s[i + 1]), s.filter((_, k) => k !== i && k !== i + 1).map(cap), [all], 3, ['Picture the whole process from start to finish.']);
}

const lengthCue = (q: GeneratedQuestion) => !!q.options && q.options[0].length > 25 && q.options[0].length > 1.4 * Math.max(...q.options.slice(1).map((o) => o.length));

export const DEEP_GENERATORS: Generator[] = [];
export const DEEP_TOPICS: Record<string, string[]> = {};
for (const bank of BANKS) {
  const everyFact = Object.values(bank).flatMap((t) => t.facts);
  for (const [topicId, t] of Object.entries(bank)) {
    const id = `dp-${topicId}`;
    const others = everyFact.filter((f) => !t.facts.includes(f));
    const procs = t.steps ?? [];
    // a topic with too few facts of its own borrows wrong options from the rest of the subject
    DEEP_GENERATORS.push({
      id, title: 'Key terms and processes',
      make: (rand, lvl) => {
        // re-pick (a few times) if the right answer would stand out as by far the longest option
        let q = procs.length && rand() < 0.22 ? stepQ(rand, pick(rand, procs)) : factQ(rand, lvl, t.facts, others, t.noun);
        for (let k = 0; k < 6 && lengthCue(q); k++) q = factQ(rand, lvl, t.facts, others, t.noun);
        return q;
      },
    });
    DEEP_TOPICS[topicId] = [id];
  }
}

/** how many facts and process steps the banks hold (for the README and tests) */
export const deepCounts = () => ({
  facts: BANKS.reduce((a, b) => a + Object.values(b).reduce((x, t) => x + t.facts.length, 0), 0),
  processes: BANKS.reduce((a, b) => a + Object.values(b).reduce((x, t) => x + (t.steps?.length ?? 0), 0), 0),
});
