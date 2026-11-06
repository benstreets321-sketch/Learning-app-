import type { Unit } from '../../types';
import { cards, mc, tf, ord, topic, examQ, multi } from '../../dsl';

const ADLESTROP = `> **Adlestrop** - Edward Thomas (1917)
>
> Yes. I remember Adlestrop—
> The name, because one afternoon
> Of heat the express-train drew up there
> Unwontedly. It was late June.
>
> The steam hissed. Someone cleared his throat.
> No one left and no one came
> On the bare platform. What I saw
> Was Adlestrop—only the name
>
> And willows, willow-herb, and grass,
> And meadowsweet, and haycocks dry,
> No whit less still and lonely fair
> Than the high cloudlets in the sky.
>
> And for that minute a blackbird sang
> Close by, and round him, mistier,
> Farther and farther, all the birds
> Of Oxfordshire and Gloucestershire.`;

const WESTMINSTER = `> **Composed upon Westminster Bridge, September 3, 1802** - William Wordsworth
>
> Earth has not anything to show more fair:
> Dull would he be of soul who could pass by
> A sight so touching in its majesty:
> This City now doth, like a garment, wear
> The beauty of the morning; silent, bare,
> Ships, towers, domes, theatres, and temples lie
> Open unto the fields, and to the sky;
> All bright and glittering in the smokeless air.
> Never did sun more beautifully steep
> In his first splendour, valley, rock, or hill;
> Ne'er saw I, never felt, a calm so deep!
> The river glideth at his own sweet will:
> Dear God! the very houses seem asleep;
> And all that mighty heart is lying still!`;

export const unseenUnit: Unit = {
  id: 'unseen', title: 'Unseen poetry (Paper 2 Section C)',
  description: 'Analyse a poem you have never seen (24 marks) and compare methods in two (8 marks).',
  topics: [
    topic({
      id: 'unseen-method', title: 'How to tackle unseen poetry', summary: 'A reliable method for Q27.1 (24 marks) and Q27.2 (8 marks).',
      notes: `
## The questions
- **27.1 (24 marks, ~30 min)**: "In [poem], how does the poet present [idea]?" - AO1 + AO2.
- **27.2 (8 marks, ~15 min)**: "What are the **similarities and/or differences** between the **methods** the poets use to present [idea]?" - **AO2 only**: it's about *methods*, not content.

## A method: read three times
1. **Read 1 - the gist**: who is speaking, to whom, about what? What's the mood? Read the title carefully.
2. **Read 2 - annotate**: underline 5-6 striking words/images; note the **shift** (volta) - where does the tone change?
3. **Read 3 - the big idea**: what is the poet saying about the focus in the question?

## What to write about (SMILE-style checklist)
| | Look for |
|---|---|
| **Structure** | Opening and ending, shifts, stanza lengths, line breaks, enjambment, caesura, repetition, cyclical structure |
| **Meaning** | Literal meaning → deeper meaning → message |
| **Imagery** | Metaphor, simile, personification, symbolism, sensory details |
| **Language** | Word choice and connotations, tone, verbs, contrast, sound (sibilance, alliteration) |
| **Effect** | How it makes the reader think/feel - and why the poet wants that |

## Q27.1 structure
- **Intro**: one sentence on the poem's big idea linked to the question.
- **3-4 paragraphs** moving through the poem (beginning → shift → ending), each zooming in on methods.
- **Tentative language**: *perhaps, could suggest, it seems*.

## Q27.2 structure (methods only)
- Two or three comparisons: e.g. **both** use nature imagery but **whereas** poem A uses it to... poem B...; **form** (sonnet vs free verse); **endings**.
- Don't re-analyse the first poem at length - focus on the comparison.

:::warn Context isn't rewarded here
AO3 isn't assessed on unseen poetry, so don't guess about the poet's life.
:::

## Past unseen poems (AQA)
2017 'Autumn' / 'Today' (seasons) · 2018 'On Aging' (growing old) · 2019 'The Richest Poor Man in the Valley' / 'Nobody' (how to live) · 2023 'Scaffolding' / 'Yours' (romantic relationships) · 2024 'The washing never gets done' / 'A Day in Autumn' (daily life and nature) · 2025 'Table' / 'Like a Beacon' (home and family).
`,
      keyPoints: ['27.1: 24 marks, ~30 minutes, AO1 + AO2', '27.2: 8 marks, ~15 minutes, AO2 METHODS only', 'Read three times: gist, annotate, big idea', 'Find the shift/volta', 'Move through the poem: opening → shift → ending', 'No context marks - don\'t guess biography'],
      flashcards: cards([
        ['How many marks is 27.1?', '24 marks - about 30 minutes.'],
        ['How many marks is 27.2?', '8 marks - about 15 minutes. Compare METHODS only.'],
        ['Is context (AO3) assessed on unseen poetry?', 'No - only AO1 and AO2 (27.2 is AO2 only).'],
        ['What is a volta?', 'A turning point or shift in tone/argument in a poem.'],
        ['What should 27.2 focus on?', 'Similarities and/or differences in the METHODS poets use (language, form, structure).'],
      ]),
      questions: [
        mc('What does 27.2 assess?', ['Comparison of methods (AO2)', 'Comparison of context (AO3)', 'Spelling and grammar (AO4)', 'Personal response (AO1 only)'], 'It\'s about how the poets write, not just what they say.', { d: 1 }),
        ord('Put the reading method in order.', ['Read for gist: speaker, situation, mood', 'Annotate striking words and the shift', 'Decide the big idea linked to the question', 'Write, moving through the poem'], 'Three reads, then write.', { d: 1 }),
        tf('You should write about the poet\'s biography in 27.1 to gain context marks.', false, 'There are no AO3 marks for unseen poetry.'),
        multi('Which of these are "methods"?', ['Enjambment', 'Personification', 'A cyclical structure'], ['The poet\'s age', 'Your opinion of the topic'], 'Methods = language, form and structure choices.', { d: 2 }),
        mc('How long should you spend on 27.2?', ['About 15 minutes', 'About 30 minutes', 'About 5 minutes', 'About 45 minutes'], 'It\'s only 8 marks - be concise and comparative.', { d: 1 }),
      ],
      examQuestions: [
        examQ(`${ADLESTROP}\n\n**27.1** In 'Adlestrop', how does the poet present the speaker's feelings about a moment of stillness?`, 24, [
          'Level 6 (21-24): critical, exploratory response; judicious references; analysis of methods and effects',
          'Explores the conversational opening ("Yes. I remember...") and the significance of memory',
          'Analyses the stillness: short sentences, "No one left and no one came", the "bare platform"',
          'Analyses the list of nature (willows, willow-herb, meadowsweet) and the shift from the name to the landscape',
          'Explores the final stanza\'s widening perspective: one blackbird → "all the birds" - "Farther and farther"',
          'Considers deeper meanings (a moment of peace; possibly written during WW1 - but no context marks needed)',
        ], { meta: 'Paper 2 Section C · practice', time: 30, model: 'Thomas presents the moment of stillness as quietly profound - an ordinary, accidental pause that the speaker\'s memory has transformed into something almost timeless.\n\nThe poem opens conversationally, "Yes. I remember Adlestrop—", as if answering a question, which makes the memory feel personal and treasured. The dash suggests the speaker pausing to recall, and the name itself becomes significant...\n\nIn the second stanza, Thomas uses short, simple sentences - "The steam hissed. Someone cleared his throat." - to recreate the hush of the stopped train: tiny sounds are noticeable only because everything else is silent...\n\nThe final stanza widens outward: "a blackbird sang / Close by, and round him, mistier, / Farther and farther, all the birds / Of Oxfordshire and Gloucestershire." The enjambment carries the reader outward like the spreading birdsong...' }),
        examQ(`${WESTMINSTER}\n\n**27.2** In both 'Composed upon Westminster Bridge' and 'Adlestrop' the speakers describe a moment of stillness. What are the similarities and/or differences between the methods the poets use to present these moments?`, 8, [
          'Compares form: Wordsworth\'s Petrarchan sonnet (controlled, celebratory) vs Thomas\'s regular quatrains with conversational voice',
          'Compares imagery: city personified ("mighty heart is lying still", "like a garment") vs natural lists in Adlestrop',
          'Compares tone: exclamatory awe ("Dear God!") vs understated, reflective calm',
          'Compares structure: both widen out - city to "fields... sky"; blackbird to "all the birds"',
          'Uses comparative connectives and focuses on METHODS',
        ], { meta: 'Paper 2 Section C · practice', time: 15 }),
      ],
    }),
  ],
};
