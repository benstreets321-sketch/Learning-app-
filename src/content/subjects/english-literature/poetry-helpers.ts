import type { Generator, Question, Quote, Topic, PastQuestion, Unit } from '../../types';
import { relabel } from '../../generators/plausible';
import { mcq, pick } from '../../generators/facts-kit';
import { shuffle } from '../../../lib/util';
import { topic, mc, examQ } from '../../dsl';

export interface PoemSpec {
  id: string;
  title: string;
  poet: string;
  date: string;
  about: string;
  context: string;
  form: string;
  language: string;
  themes: string[];
  compare: [string, string][];
  quotes: Quote[];
  questions?: Question[];
  past?: PastQuestion[];
  copyrightNote?: boolean;
}

const SPECS = new Map<string, PoemSpec>();
/**
 * Long titles are shown in their usual short form in answer options ("Sonnet 29", "The Prelude: Stealing the Boat",
 * no trailing year), so the right answer doesn't stand out by its length.
 */
const optTitle = (t: string) => {
  let s = t.length > 25 ? t.replace(/\s+-\s+'.*'$/, '') : t;
  if (s.length > 40) s = s.replace(/^Extract from /, '').replace(/,\s*\d{4}$/, '');
  return s;
};

/**
 * After a cluster is built: make "Who wrote...?" offer other poets from the SAME cluster and era, and make the
 * comparison question name the reason and offer other poems from the cluster - so neither can be guessed.
 */
export function finishCluster(unit: Unit): Generator[] {
  const specs = unit.topics.map((t) => SPECS.get(t.id)).filter((x): x is PoemSpec => !!x);
  if (specs.length < 5) return [];
  const yr = (d: string) => Number(/\d{4}/.exec(d)?.[0] ?? 2015);
  // comparisons name poems informally ("Charge of the Light Brigade"): use each poem's exact title, so a poem can never
  // appear twice in one question under two names (and be both right and wrong)
  const canon = (t: string) => t.toLowerCase().replace(/^(the|extract from( the)?)\s+/, '').replace(/[^a-z0-9]/g, '');
  for (const p of specs) p.compare = p.compare.map(([t, w]) => [specs.find((x) => canon(x.title) === canon(t))?.title ?? t, w]);
  for (const p of specs) {
    const t = unit.topics.find((x) => x.id === p.id)!;
    const poets = [...new Set(specs.filter((x) => x.poet !== p.poet).map((x) => x.poet))]
      .sort((a, b) => Math.abs(yr(specs.find((x) => x.poet === a)!.date) - yr(p.date)) - Math.abs(yr(specs.find((x) => x.poet === b)!.date) - yr(p.date)));
    const listed = new Set(p.compare.map((c) => c[0]));
    const rot = p.title.length % Math.max(1, specs.length);
    const others = [...specs.slice(rot), ...specs.slice(0, rot)].filter((x) => x.id !== p.id && !listed.has(x.title)).map((x) => x.title);
    t.questions = t.questions.map((q) => {
      if (q.type !== 'mcq') return q;
      if (q.q.startsWith('Who wrote') && poets.length >= 3) return { ...q, options: [p.poet, ...poets.slice(0, 3)] };
      if (q.q.startsWith('Which poem is a strong comparison') && others.length >= 3) {
        const [title, why] = p.compare[0];
        // titles of a similar length, so the answer doesn't stand out
        const alike = [...others].sort((a, b) => Math.abs(a.length - title.length) - Math.abs(b.length - title.length));
        return { ...q, q: `Which poem from the cluster is a strong comparison for '${p.title}' for this reason: *${why}*`, options: [title, ...alike.slice(0, 3)] };
      }
      return q;
    });
  }
  return specs.map((p) => poemGenerator(p, specs));
}

/** Endless questions about one poem, with every wrong option taken from another poem in the same cluster */
function poemGenerator(p: PoemSpec, specs: PoemSpec[]): Generator {
  const others = specs.filter((x) => x.id !== p.id);
  const yr = (d: string) => Number(/\d{4}/.exec(d)?.[0] ?? 2015);
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const surname = p.poet.split(/\s+/).pop() ?? p.poet;
  // hide the title and the poet (full name, then surname) so the answer isn't given away
  const redact = (s: string) => {
    const r = s.replace(new RegExp(esc(p.title), 'gi'), 'this poem').replace(new RegExp(esc(p.poet), 'g'), 'the poet').replace(new RegExp(`\\b${esc(surname)}('s)?\\b`, 'g'), (m: string, s1: string | undefined, off: number, str: string) =>
      // leave another person with the same surname alone (e.g. Robert Browning)
      /[A-Z][a-z]+ $/.test(str.slice(Math.max(0, off - 24), off)) ? m : s1 ? "the poet's" : 'the poet');
    return r.replace(/^(\W*)([a-z])/, (_m, pre, c) => pre + c.toUpperCase());
  };
  // poems sharing a theme are the most confusable
  const near = (x: PoemSpec) => (x.themes.some((t) => p.themes.includes(t)) ? 0 : 1);
  const listed = new Set(p.compare.map((c) => c[0]));
  const onlyPoemByPoet = specs.filter((x) => x.poet === p.poet).length === 1;
  const datedOthers = [...new Set(others.map((x) => x.date).filter((d) => d !== p.date && /\d{4}/.test(d)))];
  return {
    id: `pm-${p.id}`, title: `Know the poem: ${p.title}`,
    make: (rand) => {
      const why = [`**${p.title}** – ${p.poet} (${p.date})`, p.about];
      const kinds = [
        'about', 'context', 'form', 'poet', 'themes', 'context-rev', 'form-rev',
        ...(p.compare.length ? ['compare', 'compare-rev'] : []),
        ...(onlyPoemByPoet ? ['poet-rev'] : []),
        ...(datedOthers.length >= 3 && /\d{4}/.test(p.date) ? ['date'] : []),
      ];
      const k = pick(rand, kinds);
      const ranked = shuffle(others, rand).sort((a, b) => near(a) - near(b));
      const titleOf = (x: PoemSpec) => optTitle(x.title);
      if (k === 'context-rev') return mcq(rand, `Which poem from the cluster does this context belong to?\n\n> ${redact(p.context)}`, titleOf(p), ranked.map(titleOf), [`${p.title} (${p.poet}): ${p.context}`], 3);
      if (k === 'form-rev') return mcq(rand, `Which poem from the cluster has this form and structure?\n\n> ${redact(p.form)}`, titleOf(p), ranked.filter((x) => x.form !== p.form).map(titleOf), [`${p.title}: ${p.form}`], 3);
      if (k === 'poet-rev') return mcq(rand, `Which poem in the cluster is by **${p.poet}**?`, titleOf(p), ranked.filter((x) => x.poet !== p.poet).map(titleOf), why, 1);
      if (k === 'date') {
        const y = Number(/\d{4}/.exec(p.date)![0]);
        const nearDates = [...datedOthers].sort((a, b) => Math.abs(yr(a) - y) - Math.abs(yr(b) - y));
        // just the year on every option: a note in brackets on some ("1794 (Songs of Experience)") would mark them out
        return relabel(mcq(rand, `When was **${p.title}** (${p.poet}) written or published?`, p.date, nearDates, [`${p.title}: ${p.date}.`, 'Knowing the date helps you link the poem to its context (AO3).'], 3), (d) => d.replace(/\s*\(.*\)\s*$/, '').replace(/^\D+(?=\d{4})/, '').replace(/^(\d{4})\s*[–-]\s*\d{2,4}$/, '$1'));
      }
      if (k === 'compare-rev') {
        const [title, reason] = pick(rand, p.compare);
        const wrong = ranked.filter((x) => x.title !== title && !listed.has(x.title)).map(titleOf);
        if (wrong.length >= 2) return mcq(rand, `Which poem is a strong comparison for **${p.title}** for this reason?\n\n> ${reason}`, optTitle(title), wrong, [`${p.title} and ${title}: ${reason}`], 3);
      }
      if (k === 'about') return mcq(rand, `Which poem from the cluster is this?\n\n> ${redact(p.about)}`, optTitle(p.title), ranked.map((x) => optTitle(x.title)), why, 2);
      if (k === 'context') return mcq(rand, `Which piece of context belongs to **${p.title}**?`, p.context, ranked.map((x) => x.context), [`${p.title}: ${p.context}`], 3);
      if (k === 'form') return mcq(rand, `Which description of form and structure fits **${p.title}**?`, p.form, ranked.filter((x) => x.form !== p.form).map((x) => x.form), [`${p.title}: ${p.form}`], 3);
      if (k === 'poet') return mcq(rand, `Who wrote **${p.title}**?`, p.poet, [...new Set(others.filter((x) => x.poet !== p.poet).sort((a, b) => Math.abs(yr(a.date) - yr(p.date)) - Math.abs(yr(b.date) - yr(p.date))).map((x) => x.poet))], why, 1);
      if (k === 'themes') {
        const right = p.themes.slice(0, 2).join(' and ');
        const wrong = others.filter((x) => !x.themes.some((t) => p.themes.includes(t))).map((x) => x.themes.slice(0, 2).join(' and '));
        if (wrong.length >= 2) return mcq(rand, `Which two themes are central to **${p.title}**?`, right, wrong, [`${p.title}: ${p.themes.join(', ')}.`], 2);
        return mcq(rand, `Which poem from the cluster is this?\n\n> ${redact(p.about)}`, optTitle(p.title), ranked.map((x) => optTitle(x.title)), why, 2);
      }
      if (!p.compare.length) return mcq(rand, `Which poem from the cluster is this?\n\n> ${redact(p.about)}`, titleOf(p), ranked.map(titleOf), why, 2);
      const [title, reason] = pick(rand, p.compare);
      const reasons = others.flatMap((x) => x.compare.filter((c) => c[0] !== p.title && c[0] !== title).map((c) => c[1]));
      return mcq(rand, `**${p.title}** is often compared with **${title}**. What is the reason?`, reason, shuffle(reasons, rand), [`${p.title} and ${title}: ${reason}`], 3);
    },
  };
}

export function poem(p: PoemSpec, cluster: string): Topic {
  SPECS.set(p.id, p);
  const notes = `
**${p.poet}** · ${p.date}${p.copyrightNote ? ' · *in copyright - read it in your printed anthology*' : ''}

## What it's about
${p.about}

## Context
${p.context}

## Form and structure
${p.form}

## Language
${p.language}

## Themes
${p.themes.map((t) => `\`${t}\``).join(' · ')}

## Best poems to compare with
| Poem | Why |
|---|---|
${p.compare.map(([poemTitle, why]) => `| ${poemTitle} | ${why} |`).join('\n')}
`;
  const baseQs: Question[] = [
    mc(`Who wrote '${p.title}'?`, [p.poet, ...['Simon Armitage', 'Carol Ann Duffy', 'Seamus Heaney', 'William Blake', 'Percy Bysshe Shelley', 'Wilfred Owen', 'Robert Browning', 'Imtiaz Dharker'].filter((x) => x !== p.poet).slice(0, 3)], `'${p.title}' is by ${p.poet} (${p.date}).`, { d: 1 }),
    mc(`Which poem is a strong comparison for '${p.title}'?`, [p.compare[0][0], 'A poem from a different cluster', 'Any Shakespeare sonnet', 'The unseen poem'], `${p.compare[0][0]}: ${p.compare[0][1]}`, { d: 2 }),
  ];
  return topic({
    id: p.id,
    title: `'${p.title}'`,
    summary: `${p.poet}: ${p.themes.slice(0, 3).join(', ')}`,
    notes,
    keyPoints: [
      `Poet and date: ${p.poet}, ${p.date}`,
      `Main themes: ${p.themes.join(', ')}`,
      `Key comparison: ${p.compare[0][0]}`,
      ...p.quotes.slice(0, 3).map((q) => `Quote: "${q.text}"`),
    ],
    quotes: p.quotes,
    questions: [...baseQs, ...(p.questions ?? [])],
    pastQuestions: p.past,
    flashcards: [
      { front: `'${p.title}' - who, when and what is it about?`, back: `${p.poet} (${p.date}). ${p.about.split('. ')[0]}.` },
      { front: `'${p.title}' - form and structure?`, back: p.form.split('\n')[0].replace(/^- /, '') },
      { front: `'${p.title}' - what to compare it with?`, back: p.compare.map(([a, b]) => `${a}: ${b}`).join('\n\n') },
    ],
    examQuestions: [
      examQ(`Compare how poets present ${p.themes[0]} in '${p.title}' and in **one** other poem from '${cluster}'.`, 30, [
        'Level 6: convincing, critical comparison throughout - links ideas AND methods',
        'Judicious quotations from BOTH poems (the other from memory)',
        'Analysis of language, form and structure with effects',
        'Context used to explain the poets\' purposes',
        'Discusses similarities and differences (not two separate essays)',
        'Clear argument about the theme in the question',
      ], { meta: 'Paper 2 Section B · practice', time: 45, guidance: ['Choose your second poem in the first 2 minutes - pick one with a clear similarity AND difference.', 'Use comparative connectives in every paragraph: similarly, whereas, in contrast, both.', 'Aim for 4 comparative paragraphs: ideas → language → form/structure → endings/purpose.'] }),
    ],
    tags: [cluster],
  });
}
