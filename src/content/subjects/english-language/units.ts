import type { Unit } from '../../types';
import { cards, mc, multi, tf, txt, topic, examQ, ord, match, cloze } from '../../dsl';

// Practice sources are ORIGINAL texts written for this app (no copyrighted extracts).
export const P1_SOURCE = `> *This extract is from the opening of a short story. Mara, a teenager, has been exploring the rocks below a lighthouse where her father works.* (Practice source written for this app.)
>
> **1** Mara had not meant to stay so long on the rocks. When she had climbed down that afternoon, the sea had been a lazy, glittering thing, stretching itself in the sun like a cat. Now, as the light thinned, it had changed its mind.
>
> **2** The first wave struck the base of the rocks with a sound like a door slamming in an empty house. Spray leapt up, cold and needling, and the wind snatched it sideways into her face. She tasted salt. Somewhere behind her, the gulls that had been squabbling over the remains of her sandwich rose screaming into the bruised sky and were gone.
>
> **3** She turned. The path back to the cliff was a thin grey ribbon, already slick and darkening. Above it, the lighthouse stood on its headland, white and patient, its lamp not yet lit. Her father would be climbing the iron staircase now, counting the steps under his breath the way he always did - one hundred and twelve - his boots ringing on every one.
>
> **4** Mara began to climb. Her fingers found the old familiar holds, but the rock was wet now, and twice her foot skidded. The wind pushed at her back, then pulled at her coat, as though it could not decide whether to help her or to throw her down. Below, the sea gathered itself, drew back with a long hiss across the shingle, and hurled itself forward again.
>
> **5** Halfway up, she stopped. A light had blossomed above her - one sweeping arm of gold that passed over the water, over the rocks, over her upturned face, and moved on into the darkness. Then it came again. And again. Steady. Certain. Like a heartbeat.
>
> **6** She was not alone. She had never been alone. Mara set her jaw and climbed towards the light.`;

const P2_SOURCE_A = `> **Source A** - from a newspaper column, 21st century (practice source written for this app)
>
> When I was eleven, my summer holidays had one rule: be home when the streetlights come on. Between breakfast and dusk my friends and I were explorers, den-builders and champions of tournaments played with a half-flat football on the patch of grass behind the garages. Nobody knew exactly where we were, and nobody seemed to mind.
>
> Today I watch my own children through a kitchen window. Their world is a garden, a screen and a carefully timetabled list of clubs. They are safe, busy and, I suspect, rather lonely. When I suggested my daughter walk to the corner shop alone, a neighbour looked at me as if I had suggested she juggle knives.
>
> I do not want to pretend the past was perfect. We fell out of trees, we got lost, and once my brother needed six stitches after an ambitious bike jump. But I wonder whether, in trying to protect our children from every scraped knee, we have taken away something harder to measure: the chance to be bored, to be brave, and to come home with a story of their own.`;

const P2_SOURCE_B = `> **Source B** - a letter to a newspaper, written in the style of the early 19th century (practice source written for this app; set in 1831, before the Factory Act of 1833)
>
> Sir, - I have lately returned from the manufacturing districts, and I cannot keep silent upon what I there beheld. At half past five o'clock in the morning, while the frost yet lay upon the cobbles, I observed a procession of children, some not above eight years of age, hurrying towards the mill gates. Their faces were pale and pinched; their clogs clattered upon the stones like the ticking of some dreadful clock.
>
> I followed them within. The din of the machinery was so prodigious that I could not hear my own voice. These little creatures are set to mend the broken threads and to crawl beneath the frames while the engines are in motion, and should one of them falter, the overseer's strap is ready. One child, a girl of perhaps ten, told me she had not seen the sun upon a weekday since the autumn.
>
> I put it to you, Sir, whether a nation which boasts so loudly of its wealth and its Christianity can permit such things to continue. Every yard of cloth that leaves those mills is woven, in part, from the stolen childhood of the poor.`;

const P2_ALL = `${P2_SOURCE_A}\n\n${P2_SOURCE_B}`;

export const skillsUnitLang: Unit = {
  id: 'el-skills', title: 'Core skills: methods, structure and accuracy', description: 'The toolkit you use in every question.',
  topics: [
    topic({
      id: 'el-methods', title: 'Language and structural methods', summary: 'The terminology for analysing language and structure - and how to use it.',
      notes: `
## Language methods
| Method | Example | Typical effect |
|---|---|---|
| **Simile / metaphor** | "the sea... like a cat" / "a thin grey ribbon" | Creates a vivid image; reveals attitude |
| **Personification** | "it had changed its mind" | Makes nature feel alive, threatening or friendly |
| **Semantic field** | slamming, needling, snatched | Builds a mood (e.g. violence) across a passage |
| **Sensory language** | "She tasted salt" | Immerses the reader |
| **Onomatopoeia / sibilance** | "a long hiss across the shingle" | Recreates sound |
| **Word classes** | verbs ("hurled"), adjectives ("bruised"), adverbs | Zoom in on one precise word |
| **Sentence forms** | Short: "Steady. Certain." / long, listing sentences | Tension, emphasis, pace |
| **Rhetorical question** | "Can such things continue?" | Makes the reader think/agree |
| **Hyperbole** | "prodigious din" | Emphasis |
| **Direct address / pronouns** | "you", "we" | Involves the reader |
| **Contrast / juxtaposition** | safe vs lonely | Highlights ideas |

## Structural methods (Paper 1 Q3)
| Method | Ask |
|---|---|
| **Opening focus** | What do we see first? Why start here? |
| **Shifts in focus** | From setting → character → memory → action? |
| **Zoom in / zoom out** | Wide setting then a close detail (like a camera) |
| **Flashback / time shift** | Why move back in time here? |
| **Repetition / motifs** | "the light" returning |
| **Paragraph and sentence length** | One-line paragraphs for impact |
| **Climax / turning point / resolution** | Where does tension peak or change? |
| **Ending** | Cyclical? Open? Resolved? |

:::key The golden rule
Never just name a method. **Quote → identify the method → zoom in on a word → explain the effect on the reader → link to the writer's purpose.**
:::
`,
      keyPoints: ['Always explain the EFFECT of a method', 'Zoom in on single words and their connotations', 'Sentence forms are a language feature (Q2) - structure is the whole-text shape (Q3)', 'Structure: opening, shifts, zoom, time, repetition, ending'],
      flashcards: cards([
        ['Simile', 'A comparison using "like" or "as".'], ['Metaphor', 'A comparison saying one thing IS another.'], ['Personification', 'Giving human qualities to something non-human.'],
        ['Semantic field', 'A group of words linked by topic, building a mood.'], ['Sibilance', 'Repeated "s" sounds - can create a hissing, soft or sinister effect.'],
        ['Juxtaposition', 'Placing contrasting ideas close together.'], ['Hyperbole', 'Deliberate exaggeration.'], ['Anaphora', 'Repetition of a word/phrase at the start of successive clauses.'],
        ['Triplet (rule of three)', 'A list of three for emphasis and rhythm.'], ['Minor sentence', 'A sentence without a main verb, e.g. "Steady. Certain."'],
        ['Shift in focus (structure)', 'When the writer moves attention to a different place, person, time or idea.'], ['Cyclical structure', 'The ending returns to an idea from the opening.'],
        ['Foreshadowing', 'Hints at what will happen later.'], ['Pathetic fallacy', 'Weather reflecting mood.'],
      ]),
      questions: [
        mc('"The wind pushed at her back, then pulled at her coat." This is mainly...', ['Personification', 'Simile', 'Onomatopoeia', 'Rhetorical question'], 'The wind is given human actions (pushing, pulling).', { d: 1, ctx: P1_SOURCE }),
        mc('Which is a STRUCTURAL feature (Paper 1 Q3)?', ['A shift in focus from the sea to the lighthouse', 'The adjective "bruised" describing the sky', 'A simile comparing the waves to wolves', 'Alliteration in "salt-stung shore"'], 'Structure is about the order and shape of the whole text.', { d: 2 }),
        match('Match the method to the example.', [['Simile', '"like a heartbeat"'], ['Metaphor', '"a thin grey ribbon"'], ['Minor sentence', '"Steady. Certain."'], ['Onomatopoeia', '"hiss"']], 'All from the Paper 1 practice extract.', { d: 2, ctx: P1_SOURCE }),
        tf('Naming lots of techniques is the best way to get high marks.', false, 'Examiners reward analysis of effects, not feature-spotting.', { d: 1 }),
      ],
    }),
    topic({
      id: 'el-spag', title: 'Technical accuracy: punctuation, grammar and spelling', summary: 'Winning the 32 AO6 marks: sentence demarcation, apostrophes, commas, semicolons, homophones and paragraphing.',
      notes: `
AO6 is **16 marks per paper (32 total)** - a fifth of the GCSE.

## Sentence demarcation (the biggest issue)
A **comma splice** joins two full sentences with a comma: ✗ *It was late, she ran home.* Fix with a full stop, semicolon or conjunction: ✓ *It was late, so she ran home.* / *It was late; she ran home.*

## Apostrophes
- **Omission**: don't, it's (= it is), they're, you're.
- **Possession**: the girl's coat (one girl), the girls' coats (more than one), the children's toys.
- ⚠️ **its** (belonging to it) has NO apostrophe. **it's** = it is / it has.

## Commas
After a fronted adverbial (*Halfway up, she stopped.*), in lists, around extra information (*Mara, who was fifteen, ...*).

## Semicolons and colons
- **Semicolon**: links two closely related sentences; separates complex list items.
- **Colon**: introduces a list, explanation or example: *one rule: be home by dark.*

## Dashes, brackets, ellipsis
For extra information or a dramatic pause - use sparingly.

## Commonly confused words
| | |
|---|---|
| there / their / they're | place / belonging / they are |
| your / you're | belonging / you are |
| to / too / two | direction / also, excessive / 2 |
| affect / effect | verb / noun (usually) |
| practice / practise | noun / verb (UK) |
| where / were / wear | place / past of "are" / clothes |
| lose / loose | misplace / not tight |
| of (not "have") | ✗ should of → ✓ should **have** |

## Paragraphing - TiPToP
New paragraph for a change of **Ti**me, **P**lace, **To**pic or **P**erson (speaker).

## Sentence variety (for top-band AO6)
Simple, compound, complex; start sentences in different ways (with a verb, adverb, preposition, -ed/-ing word); use short sentences for impact.
`,
      keyPoints: ['Avoid comma splices', 'its (possession) vs it\'s (it is)', 'Possessive apostrophe: girl\'s (one), girls\' (many)', 'Semicolon joins related sentences; colon introduces', '"should have", never "should of"', 'TiPToP for paragraphs', 'Vary sentence openings and lengths'],
      flashcards: cards([['What is a comma splice?', 'Joining two complete sentences with only a comma.'], ['its or it\'s: "The dog wagged ___ tail"?', 'its'], ['When do you use a semicolon?', 'To join two closely related independent clauses, or separate items in a complex list.'], ['What does TiPToP stand for?', 'New paragraph for a change of Time, Place, Topic or Person.'], ['affect or effect: "The weather will ___ the match"?', 'affect (verb)'], ['practice or practise: "I need to ___ the piano"?', 'practise (verb)']]),
      questions: [
        mc('Which sentence is correctly punctuated?', ['The storm was coming; Mara began to climb.', 'The storm was coming, Mara began to climb.', 'The storm was coming Mara began to climb.', 'The storm, was coming Mara began to climb.'], 'A semicolon can join two related sentences; a comma alone is a splice.', { d: 2, fb: { 1: 'This is a comma splice.' } }),
        mc('Which is correct?', ['The children\'s coats were wet.', 'The childrens\' coats were wet.', 'The childrens coats were wet.', 'The children\'s\' coats were wet.'], '"Children" is already plural, so add \'s.', { d: 2 }),
        cloze('{{They\'re|They are}} going to leave {{their}} bags over {{there}}.', 'they\'re = they are; their = belonging; there = place.', { d: 1 }),
        tf('"I should of revised" is correct.', false, 'It should be "should have" (or "should\'ve").', { d: 1 }),
        txt('Correct the spelling: "definately"', ['definitely'], 'Think of "finite" inside it: de-FINITE-ly.', { d: 1 }),
        multi('Which are reasons to start a new paragraph?', ['A change of time', 'A new speaker', 'A change of place', 'A new topic'], ['A long word', 'Every three sentences'], 'TiPToP.', { d: 1 }),
      ],
    }),
  ],
};

const P1_LEVELS_8 = [
  'Level 4 (7-8): perceptive, detailed analysis; judicious quotations; sophisticated, accurate terminology',
  'Level 3 (5-6): clear explanation of effects; relevant quotations; accurate terminology',
  'Level 2 (3-4): some understanding and comment; some terminology',
  'Level 1 (1-2): simple comments',
];

export const paper1Unit: Unit = {
  id: 'el-p1', title: 'Paper 1: Explorations in creative reading and writing', description: 'One unseen fiction extract + descriptive or narrative writing.',
  topics: [
    topic({
      id: 'el-p1q1', title: 'Paper 1 Q1: listing information (4 marks)', summary: 'Find four explicit facts from the right lines - quickly.',
      notes: `
> *Read again the first part of the source, from lines 1 to 4. List four things about...*

- **Only use the lines given** - anything outside scores 0.
- Four short, separate points. Short quotations or your own words.
- Must be **true** and **explicit** (stated, not inferred).
- Spend no more than **5 minutes**.

${P1_SOURCE}

**Example**: *List four things about the sea from paragraphs 1-2.* → It had been lazy and glittering; it was stretching in the sun; it had changed (became rough); its first wave struck the base of the rocks; it threw spray up.
`,
      keyPoints: ['Only the lines given', 'Four separate true facts', 'Short quotes or paraphrase', 'No analysis needed', '~5 minutes'],
      flashcards: cards([['How many marks is P1 Q1?', '4 marks - list four things.'], ['What happens if you use information from outside the given lines?', 'It doesn\'t score.']]),
      questions: [
        multi('From paragraphs 1-2 of the practice source, which are TRUE things about the sea?', ['Earlier it was lazy and glittering', 'A wave struck the base of the rocks', 'It sent up cold spray'], ['It was frozen', 'It was miles away from Mara'], 'Stick to what is explicitly stated in the lines.', { d: 1, ctx: P1_SOURCE }),
        tf('For Q1 you should analyse the writer\'s language.', false, 'Q1 is retrieval only (AO1).', { d: 1 }),
      ],
    }),
    topic({
      id: 'el-p1q2', title: 'Paper 1 Q2: language analysis (8 marks)', summary: 'How does the writer use language to describe...?',
      notes: `
> *Look in detail at paragraph 2. How does the writer use language to describe the weather?* You could include the writer's choice of: words and phrases; language features and techniques; sentence forms. [8 marks]

## Method (~10 minutes, 2-3 paragraphs)
1. Underline 3-4 rich quotations in the given lines.
2. For each: **quote → method → zoom in on a word → effect on the reader**.
3. Comment on **sentence forms** at least once.

## Model paragraph
The writer presents the weather as aggressive. The simile "a sound like a door slamming in an empty house" compares the wave to a violent, echoing noise; "slamming" suggests sudden anger, while "empty house" adds loneliness, making the reader feel how isolated Mara is. The verbs "snatched" and "needling" continue a semantic field of attack, as if the weather is deliberately hurting her. The short sentence "She tasted salt." slows the pace and puts us inside her senses, making the danger immediate.

${P1_SOURCE}
`,
      keyPoints: ['Only use the lines given', 'Quote → method → zoom → effect', 'Comment on sentence forms', '2-3 developed paragraphs, ~10 minutes'],
      flashcards: cards([['Three things Q2 suggests you could write about?', 'Words and phrases; language features and techniques; sentence forms.'], ['How long on P1 Q2?', 'About 10 minutes.']]),
      questions: [
        mc('In "the gulls... rose screaming into the bruised sky", what does "bruised" suggest?', ['The sky is dark, purple and hurt - the weather feels violent', 'The sky is clearing and calm after the storm has passed', 'The gulls have been injured by the force of the wind', 'The sky is bright orange because the sun is setting'], 'Personification/metaphor: a bruise is dark and caused by violence.', { d: 2, ctx: P1_SOURCE }),
        mc('What is the effect of the short sentence "She tasted salt."?', ['It slows the pace and immerses us in Mara\'s senses', 'It speeds up the pace to show the storm getting worse', 'It shows she is hungry and has not eaten all day', 'It sums up the whole extract in one simple idea'], 'Short sentences create focus and immediacy.', { d: 2, ctx: P1_SOURCE }),
      ],
      examQuestions: [examQ(`${P1_SOURCE}\n\n**Q2.** Look in detail at **paragraph 4**. How does the writer use language to describe Mara\'s climb? You could include the writer\'s choice of: words and phrases; language features and techniques; sentence forms.`, 8, [
        ...P1_LEVELS_8,
        'Analyses personification of the wind ("pushed... pulled... could not decide whether to help her or to throw her down")',
        'Comments on verbs for the sea ("gathered itself", "hurled") - deliberate, threatening',
        'Considers sibilance/onomatopoeia "long hiss across the shingle"',
        'Comments on sentence forms (e.g. long, building sentence mirrors the sea\'s movement)',
      ], { meta: 'Paper 1 Q2', time: 10 })],
    }),
    topic({
      id: 'el-p1q3', title: 'Paper 1 Q3: structure (8 marks)', summary: 'How has the writer structured the text to interest you as a reader?',
      notes: `
> *You now need to think about the whole of the source. How has the writer structured the text to interest you as a reader?* You could write about: what the writer focuses your attention on at the beginning; how and why the writer changes this focus as the source develops; any other structural features that interest you. [8 marks]

## Method: beginning - middle - end
- **Beginning**: what do we see first? (setting, character, mood) and **why**?
- **Middle**: where does the **focus shift** and why? (e.g. from the sea → the path → her father's routine → the climb)
- **End**: how does it finish? Resolved, open, cyclical? Why end there?
- Use **structural** terminology: shift, zoom, flashback, contrast, climax, repetition, single-line paragraph.

:::warn Don't do language analysis here
Single words and similes belong in Q2. Q3 is about **order, focus and shape**.
:::

## Model paragraph
At the start the writer focuses on the sea's change from "lazy" to threatening, creating an immediate turning point that hooks the reader with a sense of danger. The focus then **shifts** in paragraph 3 to the lighthouse and her father's routine, slowing the pace and giving us a moment of safety that contrasts with Mara's isolation below. The writer then **zooms in** on Mara's hands and feet as she climbs, building tension, before the **climax** in paragraph 5 when the light appears. The final one-line-style paragraph "She was not alone" provides a hopeful resolution, linking back to her father's presence in paragraph 3.

${P1_SOURCE}
`,
      keyPoints: ['Whole text: beginning, shifts, end', 'Explain WHY each structural choice interests the reader', 'Use structural terms: shift, zoom, contrast, climax, resolution', 'Don\'t analyse single words - that\'s Q2'],
      flashcards: cards([['What three things does P1 Q3 suggest?', 'Focus at the beginning; how and why focus changes; other structural features.'], ['Give four structural features', 'Shift in focus, flashback, zooming in, repetition, one-line paragraph, cyclical ending, climax.']]),
      questions: [
        ord('Put the focus of the practice extract in order.', ['The sea changing from calm to rough', 'The waves and spray hitting the rocks', 'The lighthouse and her father climbing the stairs', 'Mara climbing the slippery rocks', 'The lighthouse beam sweeping over her'], 'Tracking the shifts in focus is the key to Q3.', { d: 2, ctx: P1_SOURCE }),
        mc('Why might the writer shift focus to her father counting the stairs in paragraph 3?', ['To slow the pace and introduce safety/connection, contrasting her danger', 'To speed up the action and show the storm getting worse', 'To introduce a new threat that will harm Mara later', 'To end the extract with a flashback to her childhood'], 'A shift creates contrast and sets up the ending.', { d: 3, ctx: P1_SOURCE }),
      ],
      examQuestions: [examQ(`${P1_SOURCE}\n\n**Q3.** You now need to think about the **whole** of the source. How has the writer structured the text to interest you as a reader?`, 8, [
        ...P1_LEVELS_8,
        'Opening: immediate change in the sea - a hook / turning point',
        'Shift to the lighthouse and father - contrast between danger and safety',
        'Zoom in on the climb; building tension',
        'Climax: the light appearing; repetition "again. And again."',
        'Ending: resolution / links back to father - cyclical connection',
      ], { meta: 'Paper 1 Q3', time: 10 })],
    }),
    topic({
      id: 'el-p1q4', title: 'Paper 1 Q4: evaluation (20 marks)', summary: 'Evaluate a statement: to what extent do you agree?',
      notes: `
> *Focus this part of your answer on the second half of the source. A student said, "In this part of the story, the writer makes the danger feel very real, but by the end the reader feels completely reassured." To what extent do you agree?* In your response, you could: consider your own impressions of...; evaluate how the writer creates these impressions; support your response with references to the text. [20 marks]

## Method (~25 minutes)
1. Decide how far you agree (you can partly agree).
2. Write 3-4 paragraphs, each: **your view → evidence → how the writer creates it (methods) → effect/evaluation**.
3. Use evaluative language: *the writer successfully..., convincingly..., I agree because..., however...*.
4. Cover **both parts** of the statement.

| Level | Marks | Key words |
|---|---|---|
| 4 | 16-20 | **Critical, convincing** evaluation; perceptive analysis of methods; judicious quotes |
| 3 | 11-15 | **Clear, relevant** evaluation; clear explanation of methods |
| 2 | 6-10 | Some evaluation; some comment on methods |
| 1 | 1-5 | Simple, limited |
`,
      keyPoints: ['Take a clear stance: agree, disagree or partly', 'Address every part of the statement', 'Evaluate HOW the writer creates the effect', 'Use evaluative language', 'Focus on the lines specified', '~25 minutes'],
      flashcards: cards([['How many marks is P1 Q4?', '20 marks - about 25 minutes.'], ['What skill does P1 Q4 test?', 'AO4 - evaluating texts critically, supported by references.']]),
      questions: [
        mc('Which opening is strongest for a Q4 answer?', ['I largely agree: the writer makes the danger vivid through the hostile wind, yet the reassurance at the end feels earned rather than complete.', 'I agree with the student because the writer uses lots of techniques to make it exciting.', 'The story is about a girl called Mara who is in a lighthouse during a storm at night.', 'The writer uses a simile, a metaphor and personification to describe the wind and the sea.'], 'It takes a nuanced position and links to methods.', { d: 2 }),
        tf('In Q4 you only need to write about the writer\'s methods, not your own view.', false, 'You need your evaluative view AND how the writer creates the effects.', { d: 2 }),
      ],
      examQuestions: [examQ(`${P1_SOURCE}\n\n**Q4.** Focus on **paragraphs 4 to 6**. A student said, "In this part of the story, the writer makes the danger feel very real, but by the end the reader feels completely reassured." To what extent do you agree?`, 20, [
        'Level 4 (16-20): critical, convincing evaluation of the statement; perceptive analysis of methods; judicious references',
        'Level 3 (11-15): clear, relevant evaluation; clear explanation of methods',
        'Evaluates danger: slippery rock "twice her foot skidded", personified wind, violent sea verbs "hurled"',
        'Evaluates reassurance: light "blossomed", "Steady. Certain. Like a heartbeat."',
        'Considers how far reassurance is complete: she must still climb; "set her jaw" shows determination not safety',
        'Uses evaluative language and covers both halves of the statement',
      ], { meta: 'Paper 1 Q4', time: 25, model: 'I mostly agree that the writer makes the danger feel real, but I think the reassurance at the end is more about Mara\'s courage than complete safety.\n\nThe writer makes the danger convincing by turning the weather into an unpredictable opponent. The wind "pushed at her back, then pulled at her coat, as though it could not decide whether to help her or to throw her down" - the personification suggests it is toying with her, and the long, see-sawing sentence mirrors her being pushed off balance, so the reader feels her vulnerability...\n\nHowever, the writer shifts the mood dramatically when "a light had blossomed above her". The verb "blossomed" is gentle and natural, contrasting with the violent "hurled" of the sea...\n\nYet I would not say the reader is completely reassured. The final sentence, "Mara set her jaw and climbed towards the light", reminds us that she is still halfway up a wet cliff...' })],
    }),
    topic({
      id: 'el-p1q5', title: 'Paper 1 Q5: descriptive and narrative writing (40 marks)', summary: 'Plan, structure and craft a top-band piece of creative writing.',
      notes: `
You choose **one** task: usually a **description** suggested by a picture, OR a **story** (sometimes "the opening of a story").

## Marks
- **AO5 (24)**: content and organisation - compelling, crafted, ambitious vocabulary, varied structural features, matched to purpose.
- **AO6 (16)**: sentence variety, punctuation range, spelling, vocabulary.

## Plan for 5-10 minutes
**Description - try a "camera" structure**:
1. Wide shot (the whole scene, weather, time)
2. Zoom in on a detail (a person, an object)
3. Shift (sound, a memory, a change in time - e.g. an hour later)
4. Zoom out / return to the opening image changed (cyclical)

**Narrative - keep it small**: one character, one setting, one key moment. **Show, don't tell**. Possible structures: start *in medias res*, flashback, a turning point, an ending that echoes the opening.

## Crafting techniques
- Precise verbs and nouns over piles of adjectives ("the gate *groaned*").
- An **extended metaphor** (the city as a sleeping animal).
- **Sensory** detail beyond sight: sound, smell, touch, taste.
- **Sentence variety**: a one-word sentence; a long, rolling sentence; starting with a verb ("Gripping the rail, ...").
- **Punctuation range**: semicolon, colon, dash, ellipsis (sparingly), parentheses.
- Paragraphs of varied length - a one-line paragraph for impact.

:::warn Avoid
Clichés ("it was all a dream"), too much dialogue, too much action and not enough description, rushing the ending, and run-out-of-time stories.
:::

## Top-band opening example
> *The market woke before the town did. Shutters rattled upwards like startled birds; somewhere a radio coughed into life; and the air, still cold enough to sting, began to fill with the smell of oranges and diesel.*
`,
      keyPoints: ['AO5 24 + AO6 16 = 40 marks', 'Plan 5-10 minutes; write ~45 minutes; proofread 5', 'Description: camera structure (wide → zoom → shift → return)', 'Narrative: small moment, show don\'t tell, crafted ending', 'Ambitious vocabulary, sentence variety, punctuation range', 'Avoid clichés and too much dialogue'],
      flashcards: cards([['How are P1 Q5 marks split?', 'AO5 content/organisation 24; AO6 technical accuracy 16.'], ['What does "show, don\'t tell" mean?', 'Reveal feelings through actions, details and senses rather than stating them ("her hands shook" not "she was scared").'], ['Give a structure for a descriptive piece', 'Wide shot → zoom in on detail → shift in time/sense → return to the opening, changed.'], ['What is in medias res?', 'Starting in the middle of the action.']]),
      questions: [
        mc('Which sentence best "shows" rather than "tells" fear?', ['Her fingers whitened around the rail as the floor tilted beneath her.', 'She was more frightened than she had ever been in her whole life.', 'Fear filled her completely as she stood there, scared and alone.', 'She felt terrified and wanted the storm to end as soon as it could.'], 'Physical detail lets the reader infer the emotion.', { d: 1 }),
        mc('Which is the best advice for a narrative in 45 minutes?', ['Focus on one small moment in detail', 'Cover a whole lifetime', 'Use mostly dialogue', 'Include as many characters as possible'], 'Depth beats breadth.', { d: 1 }),
        multi('Which help reach the top band for AO6?', ['Varied sentence openings', 'A range of punctuation used accurately', 'Ambitious vocabulary spelled correctly'], ['Only short sentences', 'Lots of exclamation marks!!!'], 'Variety + accuracy.', { d: 2 }),
      ],
      examQuestions: [
        examQ('**Q5.** Your school is producing a creative writing anthology. **Either**: Write a description of a busy railway station at night. **Or**: Write a story about a moment when everything changed.\n\n*(24 marks for content and organisation; 16 marks for technical accuracy)*', 40, [
          'AO5 Level 4 (19-24): compelling, convincing communication; extensive, ambitious vocabulary; varied, inventive structural features; fluent paragraphs',
          'AO5 Level 3 (13-18): consistent, clear communication; increasingly sophisticated vocabulary; effective structure',
          'Uses a deliberate structure (e.g. zoom/cyclical/flashback)',
          'Uses sensory detail and at least one extended image',
          'AO6 Level 4 (13-16): consistently secure sentence demarcation; wide range of punctuation; full range of sentence forms; high accuracy in spelling incl. ambitious words',
          'Proofread for comma splices, apostrophes and homophones',
        ], { meta: 'Paper 1 Q5', time: 45, guidance: ['Plan for 5-10 minutes. Choose the task you can CRAFT, not the one with the most "plot".', 'Aim for 4-6 well-developed paragraphs.', 'Save 5 minutes to proofread.'] }),
      ],
    }),
  ],
};

export const paper2Unit: Unit = {
  id: 'el-p2', title: 'Paper 2: Writers\' viewpoints and perspectives', description: 'Two non-fiction sources (19th century + modern) + writing to present a viewpoint.',
  topics: [
    topic({
      id: 'el-p2q1q2', title: 'Paper 2 Q1 and Q2: true statements and summary (4 + 8 marks)', summary: 'Choose four true statements; summarise differences between the sources.',
      notes: `
## Q1 (4 marks, ~5 min)
Choose **four true statements** from eight about a section of Source A. From 2027, AQA uses a **consistent tick-box format**. Read the lines carefully - some statements are partly true.

## Q2 (8 marks, ~8-10 min): summary
> *You need to refer to Source A and Source B for this question. Use details from both sources. Write a summary of the differences between [the children's experiences].*

- **Synthesise**: make **inferences** about each source and link them.
- Each paragraph: **Source A point + quote + inference** → **Source B point + quote + inference** with a comparative connective (*whereas, however, in contrast*).
- **No language analysis** - this is about *what*, not *how*.

**Model**: In Source A, the writer's childhood was free: "nobody knew exactly where we were", implying children were trusted to explore. In contrast, the children in Source B have no freedom at all: they "had not seen the sun upon a weekday", suggesting their whole lives are controlled by work.

${P2_ALL}
`,
      keyPoints: ['Q1: four true statements, only from the lines given', 'Q2: synthesise both sources', 'Q2: point + quote + inference for each source', 'Use comparative connectives', 'No language analysis in Q2'],
      flashcards: cards([['What does "synthesise" mean?', 'Combine information from two sources into one point.'], ['What does P2 Q2 test?', 'AO1 - summarising and inferring differences/similarities across two sources.'], ['Should you analyse language in P2 Q2?', 'No - focus on content and inferences.']]),
      questions: [
        multi('From the practice Source A, which statements are TRUE?', ['The writer had to be home when the streetlights came on', 'The writer\'s brother needed stitches', 'A neighbour disapproved of the daughter walking alone', 'The writer suspects her children are rather lonely'], ['The writer\'s children play outside all day', 'The writer says the past was perfect'], 'Read precisely - the writer explicitly says she doesn\'t want to pretend the past was perfect.', { d: 2, ctx: P2_SOURCE_A }),
        mc('Which is the best Q2 sentence?', ['Whereas the writer of Source A roamed freely, the children in Source B are trapped by long hours, suggesting childhood depended on wealth.', 'Source B uses a simile "like the ticking of some dreadful clock" to describe the machines.', 'Both sources are about children, and both writers describe what children did all day long.', 'Source A was written recently, whereas Source B was written in the nineteenth century.'], 'It synthesises and infers; the simile example is language analysis (Q3).', { d: 2, ctx: P2_ALL }),
      ],
      examQuestions: [examQ(`${P2_ALL}\n\n**Q2.** You need to refer to Source A and Source B. Use details from **both** sources. Write a summary of the differences between the children\'s experiences.`, 8, [
        'Level 4 (7-8): perceptive inferences from both texts; judicious references; perceptive differences',
        'Freedom/trust (A) vs control and exhaustion (B)',
        'Play and adventure (A) vs labour and danger (B)',
        'Risk in A is minor (stitches) vs serious harm and punishment in B (machinery, the strap)',
        'Modern children in A are safe but lonely - a different kind of loss',
      ], { meta: 'Paper 2 Q2', time: 9 })],
    }),
    topic({
      id: 'el-p2q3', title: 'Paper 2 Q3: language analysis (12 marks)', summary: 'How does the writer use language to...? (one source, often the 19th-century one)',
      notes: `
> *You now need to refer only to Source B. How does the writer use language to describe the children and the mill?* [12 marks]

Same skill as Paper 1 Q2 but **more marks (12)**, so write **3 developed paragraphs** (~12-15 minutes) and consider the **writer's viewpoint/purpose**.

## Tackling 19th-century texts
- Long sentences, formal vocabulary ("prodigious", "beheld") - read for meaning first.
- Writers often aim to **persuade** or **shock** their readers - link methods to that purpose.

## Model paragraph
The writer presents the children as small and helpless to provoke the reader's pity. The noun phrase "these little creatures" emphasises their size and vulnerability, while "creatures" suggests they are treated as less than human by the mill. The simile "their clogs clattered upon the stones like the ticking of some dreadful clock" combines harsh, onomatopoeic sounds with the image of a clock, implying that their lives are ruled by time and work - "dreadful" making it ominous, as if counting down their childhood.

${P2_SOURCE_B}
`,
      keyPoints: ['One source only', '3 developed paragraphs, ~12-15 minutes', 'Quote → method → zoom → effect → writer\'s purpose', 'Read 19th-century texts for meaning first'],
      flashcards: cards([['How many marks is P2 Q3?', '12'], ['What does "prodigious" mean?', 'Enormous / remarkably great.'], ['Why do 19th-century writers often use emotive language?', 'To persuade readers or provoke them to act (e.g. reform).']]),
      questions: [
        mc('In Source B, what does "stolen childhood of the poor" suggest?', ['Children\'s childhoods have been unfairly taken from them for profit', 'Poor children were stealing goods from the mill to survive', 'Childhood was a luxury the poor chose to give up willingly', 'The poor had forgotten what their own childhoods were like'], 'Metaphor of theft - a moral accusation against the mill owners and nation.', { d: 2, ctx: P2_SOURCE_B }),
        mc('What is the effect of the rhetorical question in the final paragraph?', ['It challenges readers to feel responsible and demand change', 'It asks readers for information the writer does not have', 'It shows the writer is unsure of their own argument', 'It creates a calm, neutral tone to end the article'], 'It appeals to national pride and Christian values to shame readers.', { d: 2, ctx: P2_SOURCE_B }),
      ],
      examQuestions: [examQ(`${P2_SOURCE_B}\n\n**Q3.** You now need to refer **only** to Source B. How does the writer use language to describe the children and the mill?`, 12, [
        'Level 4 (10-12): perceptive, detailed analysis of language; judicious quotes; sophisticated terminology',
        'Level 3 (7-9): clear explanation of effects; relevant quotes; accurate terminology',
        'Analyses "pale and pinched", "little creatures", "procession of children"',
        'Analyses simile of clogs "like the ticking of some dreadful clock"',
        'Analyses hyperbole "din... so prodigious" and the threat of "the overseer\'s strap"',
        'Links to the writer\'s purpose: outrage, persuading the reader',
      ], { meta: 'Paper 2 Q3', time: 13 })],
    }),
    topic({
      id: 'el-p2q4', title: 'Paper 2 Q4: comparing perspectives (16 marks)', summary: 'Compare how the writers convey their different perspectives - ideas AND methods.',
      notes: `
> *For this question, you need to refer to the whole of Source A, together with the whole of Source B. Compare how the writers convey their different perspectives on childhood.* In your answer, you could: compare their different perspectives; compare the methods the writers use to convey their perspectives; support your response with references to both texts. [16 marks]

## Method (~20 minutes)
- **Overview first**: one sentence summarising each writer's perspective.
- 3 comparative paragraphs: **perspective** (what they think/feel) + **methods** (how they show it) for BOTH sources, linked with connectives.
- Consider **tone** (nostalgic, outraged), **structure** (where the argument turns), **audience/purpose**.

## Model overview
Both writers believe children are losing something precious, but whereas the modern columnist feels a gentle, nostalgic regret that over-protection has made childhood "safe" but "lonely", the 19th-century writer is outraged that poverty and greed have destroyed childhood altogether.
`,
      keyPoints: ['Whole of both sources', 'Compare perspectives AND methods', 'Start with an overview', 'Comment on tone, structure, purpose', 'Comparative connectives in every paragraph'],
      flashcards: cards([['What does P2 Q4 test?', 'AO3 - comparing writers\' ideas and perspectives and how they are conveyed.'], ['Name three things to compare in Q4', 'Perspectives/attitudes, methods (language/structure), tone.']]),
      questions: [
        mc('Which word best describes the tone of Source A?', ['Nostalgic and reflective', 'Furious and outraged', 'Neutral and scientific', 'Bitter and resentful'], 'The writer looks back fondly and wonders gently.', { d: 2, ctx: P2_SOURCE_A }),
        mc('Which word best describes the tone of Source B?', ['Outraged and accusatory', 'Nostalgic and reflective', 'Light-hearted and playful', 'Uncertain and hesitant'], 'He condemns the nation and mill owners.', { d: 1, ctx: P2_SOURCE_B }),
      ],
      examQuestions: [examQ(`${P2_ALL}\n\n**Q4.** Refer to the **whole** of Source A and the **whole** of Source B. Compare how the writers convey their different perspectives on childhood.`, 16, [
        'Level 4 (13-16): perceptive comparison of perspectives; analysis of methods across both texts; judicious references',
        'Level 3 (9-12): clear comparison; explains methods; relevant references',
        'Compares A\'s nostalgia/gentle concern with B\'s moral outrage',
        'Compares methods: anecdote and humour in A vs emotive description and rhetorical question in B',
        'Compares structure: A moves past → present → reflective question; B moves observation → inside mill → accusation',
        'Comments on audience and purpose',
      ], { meta: 'Paper 2 Q4', time: 20 })],
    }),
    topic({
      id: 'el-p2q5', title: 'Paper 2 Q5: writing to present a viewpoint (40 marks)', summary: 'Articles, letters, speeches, essays and leaflets that argue and persuade.',
      notes: `
> *"Children today are wrapped in cotton wool. They should be given more freedom to take risks." Write an article for a newspaper in which you explain your point of view on this statement.* [40 marks: AO5 24, AO6 16]

## Form conventions
| Form | Features |
|---|---|
| **Article** | Headline, (strapline), engaging opening, paragraphs, conclusion |
| **Letter** | Address/date, "Dear Sir/Madam" (Yours faithfully) or named (Yours sincerely), formal |
| **Speech** | Address the audience ("Good morning, everyone"), direct address, rhetorical questions, memorable ending |
| **Essay** | Formal, balanced but clear viewpoint, no headline |
| **Leaflet** | Title, subheadings, direct address, clear advice |

## A strong structure
1. **Hook**: anecdote, shocking (plausible) statistic, vivid image or rhetorical question.
2. **Your clear position**.
3. 3-4 paragraphs of developed argument - each with evidence (anecdote, expert, statistic, example).
4. **Counter-argument and rebuttal** ("Some will argue... yet...").
5. **Powerful conclusion**: return to the opening image; call to action.

## Persuasive techniques - DAFOREST
**D**irect address · **A**necdote · **F**acts · **O**pinions · **R**hetorical questions · **E**motive language · **S**tatistics · **T**riplets - plus irony, humour, hyperbole, inclusive pronouns ("we").

:::tip Tone
Match register to audience. A broadsheet article can be witty but should stay controlled and sophisticated. Use **discourse markers** (Furthermore, Admittedly, Ultimately) to guide the reader.
:::
`,
      keyPoints: ['Follow the form\'s conventions', 'Hook → position → developed arguments → counter-argument → conclusion', 'DAFOREST techniques - used with control, not as a checklist', 'Match tone and register to audience', 'Discourse markers for cohesion', 'AO6 accuracy: proofread'],
      flashcards: cards([['What does DAFOREST stand for?', 'Direct address, Anecdote, Facts, Opinions, Rhetorical questions, Emotive language, Statistics, Triplets.'], ['How do you sign off a letter that starts "Dear Sir/Madam"?', 'Yours faithfully.'], ['What is a counter-argument?', 'An opposing view you acknowledge and then rebut, making your argument stronger.'], ['Give three discourse markers', 'Furthermore, However, Ultimately (also: Admittedly, Consequently, In contrast).']]),
      questions: [
        mc('Which is the most effective opening for a newspaper article?', ['Last summer, my nine-year-old asked if she could cycle to her friend\'s house. I said no. I have regretted it ever since.', 'In this article I will be talking about whether children should be allowed out alone.', 'Should children be allowed out alone? This is a question that many parents ask.', 'There are many arguments for and against letting children go out on their own.'], 'An anecdote hooks the reader and sets up the argument.', { d: 1 }),
        match('Match the form to a convention.', [['Letter', 'Yours sincerely / faithfully'], ['Article', 'Headline'], ['Speech', 'Addresses a live audience'], ['Leaflet', 'Subheadings']], 'Form matters for AO5.', { d: 1 }),
        tf('A counter-argument weakens your piece.', false, 'Acknowledging and rebutting it makes your argument more convincing.', { d: 2 }),
      ],
      examQuestions: [examQ('**Q5.** "Children today are wrapped in cotton wool. They should be given more freedom to take risks." Write an **article for a broadsheet newspaper** in which you explain your point of view on this statement.\n\n*(24 marks for content and organisation; 16 marks for technical accuracy)*', 40, [
        'AO5 Level 4 (19-24): compelling, convincing; tone, style and register assuredly matched to audience; extensive, ambitious vocabulary; fluently linked, varied paragraphs',
        'Article conventions: headline, engaging opening, clear viewpoint',
        'Developed arguments with varied evidence (anecdote, example, statistic)',
        'Counter-argument acknowledged and rebutted',
        'Powerful conclusion (call to action / cyclical)',
        'AO6 Level 4 (13-16): secure demarcation, wide punctuation range, varied sentences, accurate spelling',
      ], { meta: 'Paper 2 Q5', time: 45, guidance: ['Plan 5 minutes: position, 3 arguments + evidence, counter-argument, ending.', 'Write ~4-6 paragraphs.', 'Proofread for 5 minutes.'] })],
    }),
  ],
};

