import type { Question, Quote, Topic, PastQuestion } from '../../types';
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

export function poem(p: PoemSpec, cluster: string): Topic {
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
