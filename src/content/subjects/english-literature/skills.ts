import type { Unit } from '../../types';
import { cards, mc, multi, ord, tf, topic, match, examQ } from '../../dsl';

export const skillsUnit: Unit = {
  id: 'lit-skills',
  title: 'Essay skills: how to get a top grade',
  description: 'Applies to every text. Learn these first - they turn knowledge into marks.',
  topics: [
    topic({
      id: 'lit-aos',
      title: 'How you are marked (AOs and levels)',
      summary: 'What examiners reward, and what a grade 9 answer actually looks like.',
      notes: `
## The four Assessment Objectives

| AO | What it means | Where |
|---|---|---|
| **AO1** | A personal, critical **argument** that answers the question, supported by well-chosen **references/quotations** | All essays |
| **AO2** | **Analysis** of language, form and structure and their **effects**, using subject terminology where it helps | All questions |
| **AO3** | **Context**: how the time, society and writer's beliefs shaped the text | All set texts (not unseen) |
| **AO4** | Spelling, punctuation, grammar, vocabulary | Shakespeare + modern text (4 marks each) |

## The mark scheme levels (AQA, 30-mark essays)

| Level | Marks | Key words examiners use |
|---|---|---|
| 6 | 26-30 | **Convincing, critical** exploration; **judicious** references; analysis of writer's methods; **exploratory** context |
| 5 | 21-25 | **Thoughtful, developed** response; apt references; examination of methods; thoughtful context |
| 4 | 16-20 | **Clear, explained** response; effective references; clear explanation of methods; clear context |
| 3 | 11-15 | Some explained response; references to support; some understanding of methods |
| 2 | 6-10 | Supported, relevant comments; some awareness of methods |
| 1 | 1-5 | Simple, explicit comments |

:::key What moves you up the levels
- **Argument over story.** Every paragraph makes a point about what the writer is doing and why.
- **Precision.** Short, embedded quotations; zoom in on single words.
- **Methods + effects.** Not "this is a metaphor" but what the metaphor makes us think or feel.
- **Writer's purpose.** Treat the text as something *constructed* to make the audience think.
- **Whole text.** Track how ideas develop from beginning to end.
:::

:::exam Spelling, punctuation and grammar (AO4)
4 marks for "consistent accuracy" and a "wide range of vocabulary and sentence structures". Easy marks: spell the **characters' names and the writer's name** correctly, use capital letters for titles, and put titles in quotation marks ('Macbeth').
:::
`,
      simpler: `Think of the examiner as asking four questions: **What's your argument?** (AO1) **How does the writer do it?** (AO2) **Why did they write it then?** (AO3) **Can you write accurately?** (AO4). The top band is about being *convincing* - you sound like you're making a case, not listing features.`,
      keyPoints: [
        'AO1 = argument + references; AO2 = methods & effects; AO3 = context; AO4 = SPaG',
        'Level 6 words: convincing, critical, judicious, exploratory',
        'AO4 is worth 4 marks on the Shakespeare and the modern text questions',
        'Write about the writer\'s purpose, not just what happens',
        'Cover the extract AND the whole text when there is an extract',
      ],
      flashcards: cards([
        ['What is AO1?', 'A personal, critical response/argument supported by references and quotations.'],
        ['What is AO2?', 'Analysis of the writer\'s methods (language, form, structure) and their effects, using relevant terminology.'],
        ['What is AO3?', 'Understanding of the relationship between the text and its context (when written, the writer\'s beliefs, how audiences respond).'],
        ['What is AO4 and where is it assessed?', 'Spelling, punctuation, grammar and vocabulary - 4 marks on the Shakespeare question and 4 on the modern text question.'],
        ['Level 6 key words?', 'Convincing, critical exploration; judicious references; analysis of methods; exploration of context.'],
        ['"Judicious" quotations means...', 'Carefully chosen, precise, short and relevant - not long chunks.'],
      ]),
      questions: [
        mc('Which Assessment Objective rewards analysing the effects of a writer\'s word choices?', ['AO2', 'AO1', 'AO3', 'AO4'], 'AO2 is language, form and structure - HOW meanings are made.'),
        mc('Which answer sounds most like Level 6?', ['"Dickens constructs Scrooge as a warning: his isolation is self-inflicted, which forces a Victorian reader to confront their own indifference."', '"Scrooge is a mean man at the start of the novella and nice at the end, which shows that he changes a lot."', '"In Stave 1 Scrooge says \'Bah! Humbug!\', which is a word Dickens uses to show the reader that he is grumpy."', '"Dickens uses lots of different techniques like adjectives and similes to describe Scrooge really well."'], 'It is an argument about the writer\'s purpose (critical, convincing), not a description of the plot.', { d: 2 }),
        tf('AO3 (context) is assessed on the unseen poetry questions.', false, 'Unseen poetry assesses AO1 and AO2 only - you can\'t be expected to know the context of a poem you\'ve never seen.'),
        tf('You get AO4 (SPaG) marks on the 19th-century novel question.', false, 'AO4 is on Shakespeare (Paper 1 Section A) and the modern text (Paper 2 Section A) only.'),
        multi('Which of these help you reach the top levels?', ['Short embedded quotations', 'Exploring alternative interpretations', 'Linking context to the writer\'s purpose'], ['Retelling the plot in order', 'Listing as many techniques as possible', 'A separate paragraph of historical facts'], 'Examiners reward argument, precision and purpose - not narrative or feature-spotting.', { d: 2 }),
        match('Match the level to its key word.', [['Level 6', 'Convincing, critical'], ['Level 5', 'Thoughtful, developed'], ['Level 4', 'Clear, explained'], ['Level 2', 'Supported, relevant']], 'Each level adds sophistication: clear → thoughtful → convincing.', { d: 2 }),
        mc('How many marks is AO4 worth across the whole GCSE?', ['8', '4', '12', '16'], '4 on the Shakespeare question + 4 on the modern text question.', { d: 1 }),
      ],
    }),
    topic({
      id: 'lit-essay',
      title: 'Writing a top-band essay',
      summary: 'Thesis, paragraph structure, embedding quotations, zooming in and alternative readings.',
      notes: `
## 1. Plan (5 minutes)
1. Underline the **focus** of the question (e.g. "Lady Macbeth as a *strong female character*").
2. Write a **thesis**: your overall answer in 1-2 sentences, including the writer's purpose.
3. Choose **3-4 points** that move through the text (beginning → middle → end).
4. Jot 1-2 quotes and a context idea for each.

## 2. The thesis
A thesis is an **arguable** claim, not a fact.

> ✗ "Shakespeare presents Lady Macbeth in lots of ways."
> ✓ "Shakespeare presents Lady Macbeth's strength as a performance: she must reject her femininity to gain power, and her collapse suggests that, to a Jacobean audience, such defiance of the natural order was unsustainable."

## 3. A strong paragraph (one method: "What - How - Why")
- **What**: a topic sentence that makes a point about an idea (link to the question).
- **How**: a short, **embedded** quotation, then zoom in on a word or method and explore its effects (more than one interpretation if possible).
- **Why**: the writer's purpose / context / effect on the audience.

> Shakespeare initially presents Lady Macbeth's strength as unnatural. Her command to the spirits to "**unsex me here**" is an imperative that shows her taking control, yet the verb "unsex" suggests she believes power and womanhood are incompatible. To a Jacobean audience, who saw women as naturally subordinate, this invocation of evil would be alarming, aligning her with the witches and foreshadowing her downfall.

## 4. Embedding quotations
Weave quotes into your own sentence so it still makes sense:
- ✓ Scrooge is described as "**solitary as an oyster**", suggesting...
- ✗ Scrooge is lonely. "Solitary as an oyster." This shows...

## 5. Zooming in and alternatives
- Pick **one word** and explore its connotations: *"oyster" - hard shell, closed, but may contain a pearl: perhaps Dickens hints that goodness is hidden inside Scrooge.*
- Use tentative, exploratory language: *perhaps, could suggest, alternatively, on one level... yet on another*.

## 6. Context that counts
Context should explain **why** the writer made a choice. Weave it in: *"Writing in 1945, Priestley uses Birling's confident predictions to..."*

## 7. Conclusion
Return to the **big idea** and the writer's purpose - what does the text want us to learn?

:::tip Useful phrases
- *X is presented as...* · *This could suggest...* · *Alternatively...* · *The verb/noun/adjective "..." connotes...*
- *By the end of the play...* · *This mirrors/contrasts with...* · *Shakespeare's purpose may be to...*
:::
`,
      simpler: `Imagine you're a lawyer. Your **thesis** is your case ("the writer shows X because Y"). Each paragraph is a piece of **evidence** (a quote), which you **examine closely** (zoom in on a word), then explain how it proves your case (the writer's purpose). The examiner is the jury.`,
      keyPoints: [
        'Plan for about 5 minutes: focus, thesis, 3-4 points across the text',
        'A thesis is an arguable claim that includes the writer\'s purpose',
        'Paragraph: What (point) - How (quote + zoom) - Why (purpose/context)',
        'Embed short quotations in your own sentences',
        'Zoom in on single words and offer alternative interpretations',
        'Track how ideas develop from beginning to end',
        'Conclude with the writer\'s message',
      ],
      flashcards: cards([
        ['What is a thesis statement?', 'Your overall argument in 1-2 sentences, answering the question and mentioning the writer\'s purpose.'],
        ['What does "embedding" a quote mean?', 'Weaving a short quotation into your own sentence so it reads smoothly.'],
        ['Three tentative phrases for exploring meaning', '"This could suggest...", "Perhaps...", "Alternatively..."'],
        ['What should context do in an essay?', 'Explain WHY the writer made choices - their purpose and how audiences of the time might respond.'],
        ['What - How - Why stands for...', 'What = the point; How = quotation + analysis of method; Why = the writer\'s purpose/context.'],
      ]),
      questions: [
        mc('Which is the best thesis for "How does Priestley present responsibility?"', ['Priestley uses the Inspector to expose the Birlings\' refusal of responsibility, urging a 1945 audience to build a fairer society.', 'An Inspector Calls is a play about responsibility and the Inspector shows this to the family.', 'There are many characters who are responsible and irresponsible, such as Sheila and Mr Birling.', 'Priestley was born in 1894 in Bradford and wrote the play in 1945, after the war ended.'], 'It is arguable, answers the question and includes Priestley\'s purpose.', { d: 2 }),
        mc('Which quotation is best embedded?', ['Lady Macbeth wants to be filled with "direst cruelty", showing...', 'Lady Macbeth is cruel. "Fill me from the crown to the toe top-full of direst cruelty."', 'Lady Macbeth says this quote: "direst cruelty", which shows...', '"Fill me... top-full of direst cruelty" is a quote showing...'], 'It is short and woven into the sentence.', { d: 1 }),
        ord('Put the parts of a strong analytical paragraph in order.', ['Topic sentence making a point about the question', 'Short embedded quotation', 'Zoom in on a key word and its effect', 'Writer\'s purpose / context link'], 'What → How → Why.', { d: 2 }),
        tf('A top-band essay should retell the plot in order so the examiner knows you\'ve read it.', false, 'Retelling earns low marks. The examiner knows the story; they want your argument about the writer\'s choices.'),
        mc('Which sentence best links context to purpose?', ['Writing for a Victorian middle-class audience, Dickens uses the Cratchits to challenge the idea that the poor were idle.', 'The Victorian era lasted from 1837 to 1901, when Queen Victoria was on the throne.', 'Dickens was poor when he was little and had to work in a blacking factory.', 'In the olden days people were poor and there were workhouses in every town.'], 'Context should explain why the writer made a choice.', { d: 2 }),
        multi('Which words or phrases help you explore alternative interpretations?', ['Alternatively', 'Perhaps', 'On another level'], ['Firstly', 'In conclusion', 'This proves that'], 'Tentative, exploratory language signals critical thinking.', { d: 2 }),
      ],
      examQuestions: [
        examQ('Plan (don\'t write) an answer to: **"How does the writer of your 19th-century novel present the importance of family?"** Write your thesis and three paragraph points with one quotation each.', 8, [
          'Thesis answers the question and mentions the writer\'s purpose',
          'Point 1 is an argument about the writer\'s methods, not plot',
          'Points move through the text (beginning / middle / end)',
          'Each point has a short, relevant quotation',
          'At least one point zooms in on a single word',
          'At least one context idea is linked to purpose',
          'An alternative interpretation is suggested',
          'Conclusion idea returns to the writer\'s message',
        ], { meta: 'Planning practice', time: 8, guidance: ['Spend no more than 8 minutes - this is about the skeleton of an argument.'] }),
      ],
    }),
    topic({
      id: 'lit-extract',
      title: 'Answering extract questions (Paper 1)',
      summary: 'How to use the extract and then move to the whole text for Shakespeare and the 19th-century novel.',
      notes: `
## The question format
> *Starting with this extract, explore how Dickens presents the importance of kindness in A Christmas Carol.*
> Write about: • how Dickens presents ... in this extract • how Dickens presents ... in the novel as a whole.

You **must** cover both bullet points. There is no fixed split, but a good guide is about **40% extract / 60% whole text**, moving between them.

## Step by step (about 50 minutes)
1. **Read the question first**, underline the focus.
2. **Read the extract** with the focus in mind. Annotate 4-6 key words/methods.
3. **Plan**: decide your thesis. Where does this moment sit in the text? What comes **before** and **after**?
4. **Write**: start with the extract (2 paragraphs), then move outwards to 2-3 other moments (beginning, middle, end) from memory.
5. Finish with the writer's purpose.

## Using the extract well
- Quote **precisely** - you have the words in front of you, so zoom in on single words.
- Comment on **structure**: Where in the play/novel is this? What has just happened? How does the scene/extract build?
- For Shakespeare: **verse vs prose**, **soliloquy**, stage directions, rhyming couplets, dramatic irony.

## The whole text
- Choose moments that show **development or contrast** (how the idea changes).
- You don't need exact quotes from memory for every point - **references to moments** count.

:::warn Common mistakes
- Only writing about the extract (caps you around Level 3).
- Writing about the whole text but ignoring the extract.
- Spending 30 minutes on Shakespeare and rushing the novel. Split your time.
:::
`,
      keyPoints: [
        'Cover the extract AND the whole text - both bullets',
        'Roughly 40% extract, 60% whole text works well',
        'Annotate 4-6 key words in the extract before writing',
        'Place the extract in the story: what happens before and after?',
        'Choose whole-text moments that show development or contrast',
        'References to moments count even without exact quotes',
      ],
      flashcards: cards([
        ['How long should you spend on each Paper 1 question?', 'About 50-55 minutes on Shakespeare and 45-50 on the novel (1 h 45 total).'],
        ['Must you write about the whole text on Paper 1?', 'Yes - both bullet points (extract and whole text) are required for higher levels.'],
        ['What is a soliloquy?', 'A speech where a character alone on stage speaks their thoughts aloud to the audience.'],
        ['Why does placing the extract in the plot help?', 'It lets you analyse structure: how the moment develops ideas from earlier and foreshadows later events.'],
      ]),
      questions: [
        mc('What happens if you only write about the extract?', ['You limit your mark - the whole text is required too', 'You can still reach the top band if the analysis is detailed', 'You gain extra marks for staying focused', 'You lose only the marks for context'], 'Both bullets are part of the task; ignoring the whole text caps your level.'),
        mc('Roughly how should you balance extract vs whole text?', ['About 40% extract / 60% whole text', 'About 80% extract / 20% whole text', 'About 10% extract / 90% whole text', 'Half each, in two separate sections'], 'There is no fixed rule, but most strong answers move from the extract out to the whole text.'),
        tf('You must quote word-for-word every time you refer to a moment outside the extract.', false, 'Clear references to moments ("when Scrooge sees his own grave...") still count as textual references.'),
        ord('Put these exam steps in a sensible order.', ['Read the question and underline the focus', 'Read and annotate the extract', 'Plan a thesis and whole-text moments', 'Write: extract first, then whole text', 'Conclude with the writer\'s purpose'], 'Question → extract → plan → write → purpose.', { d: 2 }),
      ],
    }),
    topic({
      id: 'lit-terms',
      title: 'Literary and dramatic terminology',
      summary: 'The terms that let you talk precisely about methods - and how to use them well.',
      notes: `
Use terminology to **sharpen** analysis, never instead of it. "The **pathetic fallacy** of the fog *mirrors the moral confusion*..." is good; "There is pathetic fallacy" alone gets nothing.

## Language
| Term | Meaning |
|---|---|
| Imagery | Descriptive language that creates pictures in the reader's mind |
| Metaphor / simile | Direct comparison / comparison using *like* or *as* |
| Personification | Giving human qualities to non-human things |
| Pathetic fallacy | Weather or setting reflecting mood |
| Semantic field | A group of words linked by a topic (e.g. violence, religion) |
| Connotation | Ideas or feelings a word suggests beyond its literal meaning |
| Juxtaposition | Placing contrasting ideas side by side |
| Oxymoron | Contradictory words together ("brawling love") |
| Motif | A recurring image or idea (blood in *Macbeth*) |
| Symbolism | An object representing a bigger idea |
| Irony | Saying the opposite of what is meant / outcome opposite to expectation |
| Hyperbole | Exaggeration for effect |
| Sibilance / alliteration | Repeated *s* sounds / repeated initial consonants |
| Imperative | A command ("Look like th' innocent flower") |
| Rhetorical question | A question asked for effect |

## Drama
| Term | Meaning |
|---|---|
| Dramatic irony | The audience knows something characters don't |
| Soliloquy / aside | Speech alone on stage / brief remark to the audience |
| Blank verse | Unrhymed iambic pentameter - used by noble characters in Shakespeare |
| Prose (in Shakespeare) | Lower-status characters, madness (Lady Macbeth sleepwalking) or informality |
| Rhyming couplet | Two rhyming lines, often ending a scene |
| Stage directions | Instructions for performance - vital in *An Inspector Calls* |
| Foreshadowing | Hints of what is to come |
| Tragic hero / hamartia | A noble protagonist with a fatal flaw (Macbeth's ambition) |
| Catharsis | The release of emotion an audience feels at a tragedy's end |

## Structure and form
| Term | Meaning |
|---|---|
| Cyclical structure | Ending returns to the beginning |
| Narrative perspective | Who tells the story (first/third person, omniscient) |
| Novella / allegory | Short novel / story with a hidden political or moral meaning |
| Volta | A turning point (especially in a sonnet) |
| Enjambment / caesura | Line runs on / pause mid-line |
| Iambic pentameter | Ten syllables, five unstressed-stressed beats |
`,
      keyPoints: ['Terminology must be followed by an effect', 'Dramatic irony = audience knows more than characters', 'Blank verse for nobility, prose for lower status/madness', 'Pathetic fallacy = weather mirrors mood', 'A motif is a recurring image or idea', 'Hamartia = the tragic hero\'s fatal flaw'],
      flashcards: cards([
        ['Dramatic irony', 'When the audience knows something a character does not.'],
        ['Pathetic fallacy', 'When weather or setting reflects the mood or events.'],
        ['Semantic field', 'A group of words related by topic (e.g. a semantic field of violence).'],
        ['Juxtaposition', 'Placing two contrasting things side by side to highlight differences.'],
        ['Oxymoron', 'Two contradictory words together, e.g. "loving hate".'],
        ['Motif', 'A recurring image, symbol or idea in a text.'],
        ['Soliloquy', 'A speech in which a character alone on stage reveals their thoughts.'],
        ['Blank verse', 'Unrhymed iambic pentameter.'],
        ['Iambic pentameter', 'A line of ten syllables in five da-DUM beats.'],
        ['Hamartia', 'The fatal flaw of a tragic hero.'],
        ['Catharsis', 'The release of pity and fear felt by an audience at the end of a tragedy.'],
        ['Allegory', 'A story with a hidden moral or political meaning (e.g. Animal Farm).'],
        ['Cyclical structure', 'When the ending mirrors or returns to the opening.'],
        ['Foreshadowing', 'Hints or warnings of what will happen later.'],
        ['Caesura', 'A pause in the middle of a line of poetry, usually created by punctuation.'],
        ['Enjambment', 'When a sentence runs over from one line of poetry to the next without punctuation.'],
        ['Volta', 'A turning point in a poem, especially a sonnet.'],
        ['Connotation', 'An idea or feeling a word suggests beyond its literal meaning.'],
      ]),
      questions: [
        mc('"The audience knows Macbeth plans to kill Duncan, but Duncan does not." This is...', ['Dramatic irony', 'Pathetic fallacy', 'A soliloquy', 'Foreshadowing'], 'Dramatic irony: the audience knows more than the character.', { d: 1 }),
        mc('Storms on the night of Duncan\'s murder reflect the disorder caused. This is...', ['Pathetic fallacy', 'Oxymoron', 'Juxtaposition', 'Caesura'], 'Weather mirroring events/mood = pathetic fallacy.', { d: 1 }),
        mc('"O brawling love! O loving hate!" contains...', ['Oxymorons', 'Similes', 'Rhyming couplets', 'Sibilance'], 'Contradictory pairings = oxymoron.', { d: 1 }),
        match('Match the term to its definition.', [['Enjambment', 'A sentence running over a line break'], ['Caesura', 'A pause mid-line'], ['Volta', 'A turning point in a poem'], ['Motif', 'A recurring image or idea']], 'Key structural terms for poetry.', { d: 2 }),
        mc('Why does Lady Macbeth speak in prose in the sleepwalking scene (Act 5 Scene 1)?', ['To show her mind has broken down', 'Because she is lower class', 'Because she is speaking to a servant', 'To show she is calm and in control'], 'She speaks in verse when in control; prose here reflects mental collapse.', { d: 3 }),
        tf('Simply naming a technique ("this is a metaphor") earns AO2 marks on its own.', false, 'You must explain the effect of the method on meaning or the reader.'),
        mc('A "semantic field" is...', ['A group of words linked by a common topic', 'A word that sounds like the thing it describes', 'A repeated image or idea across a whole text', 'The setting where most of the action takes place'], 'E.g. a semantic field of darkness: "black", "night", "smoke".'),
      ],
    }),
  ],
};
