// AQA GCSE English Language (8700) practice papers. All sources were written for this app.
import type { ExamQuestion, QItem } from '../types';
import { examQ } from '../dsl';
import type { MockPaper, MockTest } from './types';

const MS = {
  q2: (ind: string, l4 = 'Level 4 (7-8 marks): Shows detailed and perceptive analysis of the effects of the writer\'s choices of language; selects a judicious range of textual detail; makes sophisticated and accurate use of subject terminology.') => [
    l4,
    'Level 3 (5-6 marks): Shows clear understanding of language; explains clearly the effects of the writer\'s choices; selects a range of relevant textual detail; makes clear and accurate use of subject terminology.',
    'Level 2 (3-4 marks): Shows some understanding of language; attempts to comment on the effect of language; selects some appropriate textual detail; makes some use of subject terminology, mainly appropriately.',
    'Level 1 (1-2 marks): Shows simple awareness of language; offers simple comment on the effect of language; selects simple references or textual details; makes simple use of subject terminology, not always appropriately.',
    `Indicative content: ${ind}`,
  ],
  q3: (ind: string) => [
    'Level 4 (7-8 marks): Shows detailed and perceptive analysis of the effects of the writer\'s choices of structural features; selects a judicious range of examples; makes sophisticated and accurate use of subject terminology.',
    'Level 3 (5-6 marks): Shows clear understanding of structural features; explains clearly the effects of the writer\'s choices; selects a range of relevant examples; makes clear and accurate use of subject terminology.',
    'Level 2 (3-4 marks): Shows some understanding of structural features; attempts to comment on their effect; selects some appropriate examples; makes some use of subject terminology.',
    'Level 1 (1-2 marks): Shows simple awareness of structural features; offers simple comment; selects simple examples.',
    `Indicative content: ${ind}`,
  ],
  q4: (ind: string) => [
    'Level 4 (16-20 marks): Critical, perceptive and detailed evaluation; shows perceptive understanding of the writer\'s methods; selects a judicious range of quotations; develops a convincing and critical response to the focus of the statement.',
    'Level 3 (11-15 marks): Clear and relevant evaluation; shows clear understanding of the writer\'s methods; selects a range of relevant quotations; makes a clear and relevant response to the focus of the statement.',
    'Level 2 (6-10 marks): Some evaluation; shows some understanding of the writer\'s methods; selects some appropriate quotations; makes some response to the statement.',
    'Level 1 (1-5 marks): Simple, limited evaluation; shows limited understanding of methods; selects simple references; makes a simple, limited response to the statement.',
    `Indicative content: ${ind}`,
  ],
  writing: (ind: string) => [
    'Content and organisation – Level 4 (19-24 marks): communication is convincing and compelling; tone, style and register are assured and matched to purpose and audience; extensive and ambitious vocabulary with sustained crafting of linguistic devices; varied and inventive structural features; fluently linked paragraphs with seamlessly integrated discourse markers.',
    'Content and organisation – Level 3 (13-18 marks): communication is consistently clear and effective; tone, style and register are matched to purpose and audience; increasingly sophisticated vocabulary and phrasing; effective use of structural features; coherent paragraphs with integrated discourse markers.',
    'Content and organisation – Level 2 (7-12 marks): communication is mostly successful; some sustained attempt to match purpose and audience; vocabulary clearly chosen for effect; some use of structural features; paragraphs with some discourse markers.',
    'Content and organisation – Level 1 (1-6 marks): communication is simple, with limited awareness of purpose and audience; simple vocabulary; random paragraph structure.',
    'Technical accuracy – Level 4 (13-16 marks): sentence demarcation is consistently secure and accurate; a wide range of punctuation used with a high level of accuracy; a full range of sentence forms for effect; Standard English used consistently with secure control of complex grammar; high accuracy in spelling, including ambitious vocabulary.',
    'Technical accuracy – Level 3 (9-12 marks): sentence demarcation is mostly secure and mostly accurate; a range of punctuation, mostly successful; a variety of sentence forms for effect; mostly Standard English with control of agreement; generally accurate spelling, including complex words.',
    'Technical accuracy – Level 2 (5-8 marks): sentence demarcation is mostly secure; some control of a range of punctuation; attempts a variety of sentence forms; some use of Standard English; some accurate spelling of more complex words.',
    'Technical accuracy – Level 1 (1-4 marks): occasional use of sentence demarcation; some evidence of conscious punctuation; a simple range of sentence forms; occasional Standard English; accurate basic spelling.',
    `Indicative content: ${ind}`,
  ],

  q2p2: (ind: string) => [
    'Level 4 (7-8 marks): Shows perceptive synthesis and interpretation of both texts; makes perceptive inferences from both texts; selects judicious quotations from both texts; shows perceptive differences between texts.',
    'Level 3 (5-6 marks): Shows clear synthesis and interpretation of both texts; makes clear inferences from both texts; selects clear, relevant quotations from both texts; shows clear differences between texts.',
    'Level 2 (3-4 marks): Shows some interpretation from one or both texts; attempts some inference; selects some appropriate textual detail; shows some difference between texts.',
    'Level 1 (1-2 marks): Shows simple awareness from one or both texts; offers paraphrase rather than inference; makes simple references; shows simple difference.',
    `Indicative content: ${ind}`,
  ],
  q3p2: (ind: string) => [
    'Level 4 (10-12 marks): Shows detailed and perceptive analysis of the effects of the writer\'s choices of language; selects a judicious range of textual detail; makes sophisticated and accurate use of subject terminology.',
    'Level 3 (7-9 marks): Shows clear understanding of language; explains clearly the effects of the writer\'s choices of language; selects a range of relevant textual detail; makes clear and accurate use of subject terminology.',
    'Level 2 (4-6 marks): Shows some understanding of language; attempts to comment on the effect of language; selects some appropriate textual detail; makes some use of subject terminology.',
    'Level 1 (1-3 marks): Shows simple awareness of language; offers simple comment; selects simple references.',
    `Indicative content: ${ind}`,
  ],
  q4p2: (ind: string) => [
    'Level 4 (13-16 marks): Compares ideas and perspectives in a perceptive way; analyses how writers\' methods are used; selects a range of judicious supporting detail from both texts; shows a detailed understanding of the different ideas and perspectives in both texts.',
    'Level 3 (9-12 marks): Compares ideas and perspectives in a clear and relevant way; explains clearly how writers\' methods are used; selects relevant detail to support from both texts; shows a clear understanding of the different ideas and perspectives.',
    'Level 2 (5-8 marks): Attempts to compare ideas and perspectives; makes some comment on how writers\' methods are used; selects some appropriate detail from one or both texts.',
    'Level 1 (1-4 marks): Makes simple cross-reference of ideas and perspectives; makes simple identification of writers\' methods; simple references from one or both texts.',
    `Indicative content: ${ind}`,
  ],
};

const P1_INFO = ['Time allowed: 1 hour 45 minutes. Total marks: 80.', 'Section A: Reading – answer all questions (40 marks). Section B: Writing – 40 marks.', 'You are advised to spend about 15 minutes reading the source and all five questions, and about 45 minutes on Section B.', 'You will be assessed on the quality of your reading in Section A and on the quality of your writing in Section B.', 'No dictionaries or other equipment.'];
const P2_INFO = ['Time allowed: 1 hour 45 minutes. Total marks: 80.', 'Section A: Reading – answer all questions (40 marks). Section B: Writing – 40 marks.', 'You are advised to spend about 15 minutes reading the sources and all five questions, and about 45 minutes on Section B.', 'No dictionaries or other equipment.'];

const w = (n: string, eq: ExamQuestion, lines = 12) => ({ kind: 'written' as const, n, marks: eq.marks, eq, topicId: '', lines });

// ---------------- Paper 1 sources ----------------
const P1_SOURCES = [
  `> *This extract is from the opening of a novel. Tomasz, aged fourteen, has just arrived in a town in the north of England with his mother.* (Practice source written for this app.)
>
> **1** The train gave a long sigh and stopped, as though it, too, was tired of travelling. Tomasz pressed his forehead to the window. Outside, the platform was a thin strip of orange light, and beyond it the dark pressed close, thick and patient. Snow was falling – not the soft, storybook kind, but small hard flakes that ticked against the glass like fingernails.
>
> **2** His mother was already standing, wrestling their two suitcases down from the rack. One of them had a broken wheel and limped behind her as she dragged it towards the door. She did not look back to see if he was following. She never did. She simply trusted that he would be there, the way the moon trusts the tide.
>
> **3** The cold hit him like a slap. It found the gap between his scarf and his collar, the holes in his gloves, the thin soles of his trainers. A single guard in a fluorescent jacket stood by the exit, stamping his feet. "Last one tonight," he said, to nobody in particular. "You're lucky." Tomasz did not feel lucky.
>
> **4** They walked. The town unfolded in pieces: a closed bakery with a hand-written sign in the window; a chip shop glowing gold, its windows steamed blind; terraced houses shoulder to shoulder, as if they were huddling together for warmth. Somewhere a dog barked twice and then thought better of it. Their footprints followed them, dark and sharp, and were softened almost at once by the falling snow.
>
> **5** Number 42 was at the end of a street that sloped so steeply that the houses seemed to be climbing it. His mother stopped, checked the scrap of paper in her hand, and looked up. Tomasz looked too. The house was narrow and grey, with a green door that had been painted once, long ago, and then forgotten. But in the upstairs window, someone had left a lamp on. Its light lay on the snow below like a small, square blanket.
>
> **6** "Here," said his mother quietly, and for the first time that night she smiled. Tomasz pushed his frozen hands deeper into his pockets. Here, he thought. He tried the word out the way you might test ice on a pond – carefully, putting his weight on it a little at a time.`,
  `> *This extract is from the middle of a short story. Mrs Okafor runs a fabric stall in a covered market. A storm is approaching.* (Practice source written for this app.)
>
> **1** By three o'clock the sky over the market had turned the colour of a bruise. Mrs Okafor noticed it before anyone else did. She noticed most things. She had run the fabric stall under the iron arches for twenty-two years, and in that time she had learned to read the weather the way other people read newspapers.
>
> **2** Her stall was a riot in a grey place. Bolts of cloth leaned against each other like gossiping friends: wax prints in fierce oranges and electric blues, a roll of yellow silk that shone like warm butter, lace as white and delicate as frost on a window. Customers who came in to escape the drizzle often stopped without meaning to, their hands reaching out to touch before their minds had decided anything at all.
>
> **3** "You'll get wet going home," she told the young man who was fingering the silk. "Take an umbrella, not that thin jacket." He laughed, but he bought two metres, and she wrapped them in brown paper with the brisk, tender folds of someone dressing a child.
>
> **4** Then the rain came. It did not start; it arrived, all at once, hammering on the glass roof until the whole market rang like the inside of a drum. Traders shouted to each other. Plastic sheets were dragged over tables. The fishmonger's radio was drowned out mid-song.
>
> **5** Mrs Okafor did not hurry. She pulled the canvas over the front of her stall, tied each corner with the same knot her mother had taught her, and sat down on her folding stool. Water was finding its way through a crack in the arch above and dripping steadily onto the concrete, a slow clock counting something only it understood.
>
> **6** When the noise finally softened, she looked out across the empty aisles. The market seemed smaller now, and older, its colours washed down to the bare bones of iron and stone. Only her stall still glowed. She smoothed the edge of the yellow silk with one finger, and waited, as she always did, for the people to come back.`,
  `> *This extract is from the opening of a novel. Leah lives with her family on the fourteenth floor of a tower block.* (Practice source written for this app.)
>
> **1** The lights went out at exactly 7.14pm. Leah knew because she was looking at the clock on the oven, waiting for the pasta, and then the clock was simply gone, swallowed along with everything else. The fridge stopped humming. The television died mid-sentence. For a moment the whole flat held its breath.
>
> **2** Then her little brother screamed, and the silence broke into pieces.
>
> **3** "It's just a power cut," Mum said, in the voice she used for spiders and thunderstorms. Her phone torch flicked on, a cold white circle that made all their faces look like masks. Through the window, the city had changed. Whole streets had vanished. Where there should have been a necklace of orange streetlamps there was only darkness, and above it, more stars than Leah had ever seen from the fourteenth floor.
>
> **4** It was Leah who thought of Mr Hussain. He lived on the eighth floor, alone, and he couldn't manage the stairs since his fall. The lift would be dead. His flat would be dark. "I'll go," she said, before anyone could tell her not to, and she took the big torch from the drawer under the sink.
>
> **5** The stairwell was a different country. Her footsteps echoed down and down, as if someone was following her a few steps behind. The torch beam slid over graffiti she had never noticed in daylight, over a child's lost shoe, over the dull gleam of the metal handrail, cold and slightly sticky under her palm. Thirteen. Twelve. Eleven. She counted the floors out loud to keep herself company.
>
> **6** On the eighth floor she knocked three times. Nothing. Then, slowly, the shuffle of slippers, the rattle of the chain, and Mr Hussain's face appeared in the gap, lit from below by a single birthday candle stuck in a saucer. "Ah," he said, and his whole face softened. "I wondered who would come." He stepped back to let her in, and the small flame bowed, and straightened, and held.`,
];

const P1_Q = [
  {
    q1: ['his forehead pressed to the window', 'the platform was a thin strip of orange light', 'it was dark beyond the platform', 'snow was falling / small hard flakes', 'the snow ticked against the glass', 'his mother was standing / lifting down suitcases', 'there were two suitcases / one had a broken wheel', 'his mother did not look back'],
    q1focus: 'the arrival of the train and Tomasz\'s journey',
    q2para: 4, q2focus: 'the town',
    q2ind: 'personification of houses "shoulder to shoulder… huddling together for warmth" suggests a close-knit but cold, struggling place; the list structure of "a closed bakery… a chip shop… terraced houses" shows the town revealed "in pieces" as Tomasz walks; contrast of the glowing chip shop "glowing gold" with the cold dark; the dog that "thought better of it" (humour, personification) adds to the hush; footprints "softened almost at once" – sense of impermanence, of being new and unnoticed.',
    q3ind: 'opens inside the train (enclosed, waiting) then moves outside onto the platform – the cold as a shock; focus shifts from Tomasz to his mother and their relationship; journey structure through the town in a sequence of images; narrowing focus to Number 42 and the lamp in the window – from darkness to light; ends with the word "Here" and the ice simile – tentative hope, a cyclical return to Tomasz\'s feelings; short paragraph 3 ending "Tomasz did not feel lucky" contrasts with the hopeful ending.',
    q4from: 5, q4statement: 'This part of the story, where Tomasz and his mother reach the house, shows that their new life is going to be hard, but there is also a sense of hope.',
    q4ind: 'the house is "narrow and grey" with a "forgotten" door – neglect and hardship; but the lamp "left on" by "someone" suggests welcome and care; the simile "like a small, square blanket" brings warmth and comfort; his mother smiling "for the first time that night" – relief and hope; Tomasz is cautious: "test ice on a pond… a little at a time" – hope that is fragile; evaluate how far the hope outweighs the hardship.',
    q5: 'Your local council is running a creative writing competition called "Arrivals".\n\n**Either:** Write a description of a place at night, as suggested by this picture: *a quiet street of terraced houses in falling snow, with one lit window.*\n\n**Or:** Write the opening part of a story about someone arriving somewhere new.\n\n*(24 marks for content and organisation, 16 marks for technical accuracy)*',
  },
  {
    q1: ['by three o\'clock the sky had turned the colour of a bruise', 'Mrs Okafor noticed the sky before anyone else', 'she notices most things', 'she had run the stall for twenty-two years', 'the stall is under the iron arches / in a covered market', 'she can read the weather', 'the cloth includes wax prints / yellow silk / lace', 'customers stopped to touch the fabric'],
    q1focus: 'Mrs Okafor and her stall',
    q2para: 2, q2focus: 'the fabric stall',
    q2ind: 'metaphor "a riot in a grey place" – contrast of colour and energy with the dull market; simile "like gossiping friends" personifies the cloth as lively and sociable; colour adjectives "fierce oranges", "electric blues" suggest power and vibrancy; sensory similes "like warm butter" and "white and delicate as frost" appeal to touch and sight; "hands reaching out to touch before their minds had decided" – the stall\'s irresistible attraction.',
    q3ind: 'opens with the sky and the threat of the storm, then narrows to Mrs Okafor\'s experience; paragraph 2 slows down to describe the stall in detail; a small human interaction (the young man) shows her character; sudden shift in paragraph 4 – the storm "arrived" – noise and chaos; contrast with her calm in paragraph 5; ending zooms out over the empty market then back to her stall still glowing – cyclical structure ("waited… for the people to come back").',
    q4from: 4, q4statement: 'In the second half of this extract, the writer makes Mrs Okafor seem calm and strong, unlike everyone else in the market.',
    q4ind: 'contrast between the noisy panic of traders ("shouted", "dragged") and her deliberate actions; "did not hurry"; tying each corner "with the same knot her mother had taught her" – tradition, continuity, strength; the drip as "a slow clock" – patience and time passing; the market "washed down to the bare bones" while "only her stall still glowed" – she is the source of colour and life; she "waited, as she always did" – resilience; evaluate: perhaps also loneliness or stubbornness.',
    q5: 'You have been asked to write a piece for a creative writing anthology on the theme of "Weather".\n\n**Either:** Write a description of a busy place as a storm begins, as suggested by this picture: *a covered market with rain streaming down a glass roof.*\n\n**Or:** Write a story in which a change in the weather is important.\n\n*(24 marks for content and organisation, 16 marks for technical accuracy)*',
  },
  {
    q1: ['the lights went out at 7.14pm', 'Leah was looking at the clock on the oven', 'she was waiting for the pasta', 'the oven clock went out / disappeared', 'the fridge stopped humming', 'the television died / went off mid-sentence', 'the flat went silent', 'her little brother screamed'],
    q1focus: 'what happened when the lights went out',
    q2para: 5, q2focus: 'the stairwell',
    q2ind: 'metaphor "a different country" – unfamiliar and alien; the echo "as if someone was following her" creates fear; the torch beam "slid" over details (graffiti, "a child\'s lost shoe") – unsettling, abandoned objects; tactile description "cold and slightly sticky" adds discomfort; minor sentences "Thirteen. Twelve. Eleven." build tension and show her counting to stay brave.',
    q3ind: 'opens with a precise time and a sudden event – immediate hook; one-line paragraph 2 marks the break from silence to panic; widening focus to the city through the window – the strange beauty of the stars; turning point in paragraph 4 when Leah thinks of Mr Hussain; journey down the stairwell builds tension; ending in a small, warm space lit by a single candle – resolution and connection; the final image of the flame that "held" echoes Leah\'s courage.',
    q4from: 4, q4statement: 'In the second half of the extract, the writer presents Leah as brave and caring, and the ending is moving.',
    q4ind: 'she volunteers "before anyone could tell her not to" – decisive; concern for a vulnerable neighbour; the frightening stairwell emphasises her courage; counting aloud reveals fear she overcomes; Mr Hussain\'s line "I wondered who would come" – loneliness and gratitude; the candle that "bowed, and straightened, and held" – symbol of resilience and hope; evaluate how far it is moving.',
    q5: 'A youth magazine is publishing creative writing with the title "In the Dark".\n\n**Either:** Write a description of a city at night, as suggested by this picture: *a tower block against a starry sky, with most of the windows dark.*\n\n**Or:** Write a story about a time when someone helps a stranger.\n\n*(24 marks for content and organisation, 16 marks for technical accuracy)*',
  },
];

function p1Test(i: number): MockTest {
  const s = P1_SOURCES[i];
  const q = P1_Q[i];
  const q1 = examQ(`Read again the first part of the source, **paragraphs 1 and 2**.\n\nList **four** things about ${q.q1focus} from this part of the source.`, 4, [...q.q1.map((x) => `Any one of: ${x} (1)`), 'Max 4 marks. Answers must come from paragraphs 1 and 2. Quotation or paraphrase both earn the mark.'], { meta: 'Question 1 · AO1', time: 5 });
  const q2 = examQ(`Look in detail at **paragraph ${q.q2para}** of the source.\n\nHow does the writer use language here to describe ${q.q2focus}?\n\nYou could include the writer's choice of:\n- words and phrases\n- language features and techniques\n- sentence forms.`, 8, MS.q2(q.q2ind), { meta: 'Question 2 · AO2', time: 10 });
  const q3 = examQ('You now need to think about the **whole** of the source.\n\nHow has the writer structured the text to interest you as a reader?\n\nYou could write about:\n- what the writer focuses your attention on at the beginning\n- how and why the writer changes this focus as the source develops\n- any other structural features that interest you.', 8, MS.q3(q.q3ind), { meta: 'Question 3 · AO2', time: 10 });
  const q4 = examQ(`Focus this part of your answer on the second half of the source, from **paragraph ${q.q4from} to the end**.\n\nA student said, "${q.q4statement}"\n\nTo what extent do you agree?\n\nIn your response, you could:\n- consider your own impressions\n- evaluate how the writer creates these impressions\n- support your response with references to the text.`, 20, MS.q4(q.q4ind), { meta: 'Question 4 · AO4', time: 25 });
  const q5 = examQ(q.q5, 40, MS.writing('a clear structure (e.g. zoom in/out, flashback, cyclical ending); sensory description and controlled imagery; varied sentence lengths for effect; precise vocabulary; a convincing narrative voice for the story option; accurate paragraphing and a range of punctuation.'), { meta: 'Question 5 · AO5 (24) and AO6 (16)', time: 45 });
  return {
    id: `english-language-p1-t${i + 1}`, paperId: 'english-language-p1', n: (i + 1) as 1 | 2 | 3, title: `Practice paper ${i + 1}`,
    focus: ['Opening of a novel: arriving somewhere new.', 'A description-heavy extract with a sudden change.', 'A tense opening with a strong central character.'][i],
    sections: [
      { title: 'Section A: Reading', intro: 'Answer all questions in this section. You are advised to spend about 45 minutes on this section.', source: s, questions: [w('1', q1, 6), w('2', q2), w('3', q3), w('4', q4, 20)] },
      { title: 'Section B: Writing', intro: 'You are advised to spend about 45 minutes on this section. Write in full sentences. Plan your answer. You are reminded of the need to plan your answer and leave enough time to check it.', questions: [w('5', q5, 30)] },
    ],
  };
}

// ---------------- Paper 2 sources ----------------
const P2 = [
  {
    theme: 'holidays',
    a: `> **Source A** – from a travel blog, 2024 (practice source written for this app)
>
> **1** I had been promised paradise. The website said so, in large turquoise letters: "Your Paradise Awaits!" What awaited me, after a 4am alarm, a two-hour queue at security and a flight spent with a stranger's elbow in my ribs, was a hotel that looked nothing like its photographs.
>
> **2** The "sea view" was real, technically. If you stood on the left-hand end of the balcony and leaned out at a dangerous angle, you could see a triangle of blue between a car park and a building site. The "infinity pool" was infinite only in the sense that the queue for a sunbed never seemed to end.
>
> **3** I want to be fair. The staff were kind and overworked. The food was hot, plentiful and almost entirely beige. And on the third evening, walking away from the hotel strip along a dusty road, I found a tiny family restaurant where an old man grilled sardines over charcoal and his granddaughter translated the menu with enormous patience. That evening, under a string of mismatched lights, I finally understood why people travel.
>
> **4** But it made me wonder. How much of our holiday is the place itself, and how much is the expensive fantasy we are sold before we go? I spent a fortune to sit in a queue. The best hour of my week cost eight euros and was nowhere near the brochure.`,
    b: `> **Source B** – adapted from a letter written in 1851, describing a day trip from London to Brighton by the new railway (practice source written for this app)
>
> **1** My dear Sister – You will scarcely credit it, but yesterday I breakfasted in London and dined beside the sea. The railway has done what a thousand years of horses could not. We were carried fifty miles in less than two hours, at such a speed that the hedges seemed to run past the window like frightened sheep.
>
> **2** The carriage was crowded with every sort of person – clerks and their wives, a curate with three solemn daughters, a party of tradesmen who sang the whole way. I confess I found their merriment loud, but there was a kind of happiness in it that I had not seen in the city for many months.
>
> **3** And then, the sea! I had imagined it grey and sullen, like the river at home, but it was the most astonishing blue, and the air was so clean and sharp that I felt my lungs had been washed. Children ran shrieking at the edge of the waves. Elderly gentlemen rolled up their trousers with great dignity and stood in the shallows, looking surprised at themselves.
>
> **4** It is said by some that these excursions encourage idleness and disorder among the working people. I cannot agree. I saw nothing but honest pleasure, and I returned to London tired, sunburned and, I think, a better woman for having seen something so much larger than myself.`,
    q1: { t: ['The writer had to get up at 4am.', 'The writer queued for two hours at security.', 'The hotel looked different from its photographs.', 'The sea could only be seen from one end of the balcony.'], f: ['The writer flew first class.', 'The hotel had a view across the whole bay.', 'There were plenty of free sunbeds by the pool.', 'The writer stayed at the hotel for one night.'] },
    q2: 'Use details from **both** sources. Write a summary of the differences between the writers\' experiences of their trips.',
    q2ind: 'Source A: disappointment – reality did not match the advertising ("nothing like its photographs"), crowded and queued, expensive; Source B: delight and wonder – the journey itself is thrilling, the sea exceeds expectations; A\'s best moment was small and unplanned, B\'s whole day was joyful; A is cynical about the holiday industry, B defends excursions as "honest pleasure"; inferences about expectations and attitudes.',
    q3: 'You now need to refer **only** to Source B, the letter from 1851.\n\nHow does the writer use language to describe her day at the seaside?',
    q3ind: 'exclamation "And then, the sea!" conveys excitement; simile "hedges seemed to run past the window like frightened sheep" – speed and novelty; contrast of expectation "grey and sullen" with "the most astonishing blue"; metaphor "my lungs had been washed" – freshness, renewal; humorous image of elderly gentlemen "looking surprised at themselves"; direct address "My dear Sister" and personal tone; final reflection "something so much larger than myself" – awe.',
    q4: 'For this question, you need to refer to the **whole of Source A**, together with the **whole of Source B**.\n\nCompare how the writers convey their different attitudes to travel.\n\nIn your answer, you could:\n- compare their different attitudes\n- compare the methods the writers use to convey their attitudes\n- support your response with references to both texts.',
    q4ind: 'A: sarcastic, critical tone (quotation marks around "sea view", "infinity pool"), humour, rhetorical questions, short final sentence contrasting cost; attitude: holidays are an expensive fantasy, but genuine experiences are valuable; B: enthusiastic, wondering tone, exclamation, vivid imagery, defends the railway excursions against critics; attitude: travel broadens the mind and gives honest pleasure; both value simple, genuine moments; structure: A builds to a reflective question, B builds to a moral conclusion.',
    q5: '"Holidays abroad are a waste of money. Young people would learn more by exploring their own country."\n\nWrite an article for a travel magazine in which you argue your point of view on this statement.\n\n*(24 marks for content and organisation, 16 marks for technical accuracy)*',
  },
  {
    theme: 'school',
    a: `> **Source A** – from a newspaper opinion column, 2025 (practice source written for this app)
>
> **1** Every May, a strange silence settles over my house. My daughter, usually a whirlwind of music and arguments and half-eaten toast, becomes a ghost who drifts between her bedroom and the fridge, muttering formulae. She is sixteen, and she is sitting her GCSEs.
>
> **2** She will sit more than thirty exams in six weeks. Some will last two hours. In each one, everything she has learned since she was fourteen must be poured onto paper in silence, under a ticking clock, with no second chances. If she is ill, or anxious, or simply has a bad morning, the paper does not care.
>
> **3** I am not against exams. I passed plenty, and some of the panic did me good. But I watch my daughter and her friends and I see a generation who have been taught that their worth is a number. They know their predicted grades better than their own hobbies.
>
> **4** Learning should open doors. At the moment, for too many young people, it feels like a corridor with one exit and a timer above it.`,
    b: `> **Source B** – adapted from a report written in 1862 by a visitor to a "ragged school", a free school for very poor children in London (practice source written for this app)
>
> **1** The school occupies two rooms above a stable, and the smell of the horses rises through the boards. Upon my arrival I found some sixty children crowded upon benches, many of them without shoes, several so thin that their elbows stood out like the knuckles of an old man.
>
> **2** Yet I have seldom seen such eagerness. When the master held up a picture of an elephant, a hundred eyes followed it as though it were a lantern in a dark lane. A small boy, who I learned sold matches in the street until midnight, read aloud from his primer with a slowness that was almost painful, and when he reached the end of the line his face shone with a triumph I would not have exchanged for a fortune.
>
> **3** The master told me that many attend only when hunger permits. A boy who has earned no money cannot eat, and a boy who cannot eat will not long sit still to learn his letters. For this reason the school provides bread at noon, and I believe it is the bread, as much as the lessons, that keeps these rooms so full.
>
> **4** I left with the conviction that learning is not a luxury for the comfortable classes. It is a ladder; and these ragged children are reaching for it with both hands.`,
    q1: { t: ['The writer\'s daughter is sixteen.', 'The daughter becomes quiet during the exam season.', 'The daughter mutters formulae.', 'The daughter is sitting her GCSEs in May.'], f: ['The daughter enjoys exam season.', 'The daughter is fourteen years old.', 'The house is noisier than usual in May.', 'The daughter has already finished her exams.'] },
    q2: 'Use details from **both** sources. Write a summary of the differences between the attitudes of the young people in the two sources towards learning.',
    q2ind: 'Source A: the daughter and friends are anxious, exhausted ("a ghost"), see learning as pressure and a number; Source B: the ragged children are eager, excited ("a hundred eyes followed it"), see learning as triumph and opportunity; A: learning is compulsory and high-stakes; B: learning is a privilege competing with survival (hunger, work); inferences: abundance vs scarcity changes how learning is valued.',
    q3: 'You now need to refer **only** to Source B, the report from 1862.\n\nHow does the writer use language to describe the children and their school?',
    q3ind: 'sensory detail "the smell of the horses rises through the boards" – poverty; simile "elbows stood out like the knuckles of an old man" – malnutrition, children aged by hardship; simile "as though it were a lantern in a dark lane" – learning as light and hope; contrast between the boy\'s hard life ("sold matches… until midnight") and his "triumph"; metaphor "learning… is a ladder" – social mobility; "reaching for it with both hands" – desperation and determination.',
    q4: 'For this question, you need to refer to the **whole of Source A**, together with the **whole of Source B**.\n\nCompare how the writers convey their different perspectives on education.\n\nIn your answer, you could:\n- compare their different perspectives\n- compare the methods the writers use to convey their perspectives\n- support your response with references to both texts.',
    q4ind: 'A: critical of the modern exam system – pressure reduces young people to grades; personal, parental viewpoint; metaphors ("a ghost", "a corridor with one exit and a timer"), statistics ("more than thirty exams in six weeks"), balanced concession ("I am not against exams"); B: education is a precious opportunity for the poor, a ladder out of poverty; observational report; similes, anecdote of the match-seller, practical concerns (bread); both see education as potentially opening doors but A fears it has narrowed, B sees it as liberating.',
    q5: '"Exams are an unfair way to judge what young people have learned."\n\nWrite a speech for a school debate in which you argue your point of view on this statement.\n\n*(24 marks for content and organisation, 16 marks for technical accuracy)*',
  },
  {
    theme: 'city air',
    a: `> **Source A** – from a magazine article about cycling in a city, 2023 (practice source written for this app)
>
> **1** At 8.05am on the ring road, the air has a taste. It is metallic and faintly sweet, like licking a battery. I know this because I cycle through it every morning, wedged between a bus that breathes hot diesel on my ankles and a delivery van whose driver has never once used his indicator.
>
> **2** Cycling, I am told, is good for me. My heart, my lungs, my mental health, the planet. And I believe it. But I also own a pollution mask, and when I take it off at the end of my journey the white filter has turned the colour of weak tea.
>
> **3** Here is the strange thing. When the roads closed for a marathon last spring, the city became somewhere I didn't recognise. Children cycled down the middle of the high street. You could hear birds. An old couple sat on a bench outside the bank and simply talked, without shouting.
>
> **4** That city exists. It is underneath this one, waiting. We only have to decide that we want it more than we want to drive two streets to buy a pint of milk.`,
    b: `> **Source B** – adapted from a description of a London fog, written in 1880 (practice source written for this app)
>
> **1** The fog came down upon London on Tuesday morning and did not lift for three days. It was not the white, wholesome mist of the countryside, but a thick yellow vapour, the colour of pea soup, which crept into every street and court and found its way beneath every door.
>
> **2** At noon the gas lamps were lit in the shops, and still a man could not see his own hand at arm's length. Cabs crawled through Piccadilly with boys running ahead carrying flaming torches. Twice I heard a crash and a cry somewhere ahead of me, and once I walked straight into a lamp-post with such force that I was obliged to apologise to it.
>
> **3** The fog has a smell – of soot and sulphur and something rotten – and a taste that remains in the throat for days. The physicians say it carries off the old and the weak by the hundred. The newspapers grumble; the gentlemen of Parliament grumble; and the chimneys of a million homes and a thousand factories continue to pour forth their black breath, as if they had never heard of the matter.
>
> **4** We are a great city, the greatest in the world, so we are told. But I wonder what greatness is worth, if we cannot see across the street, nor breathe without coughing.`,
    q1: { t: ['The writer cycles on the ring road in the morning.', 'The air on the ring road has a metallic taste.', 'The writer cycles next to a bus.', 'The delivery van driver does not use his indicator.'], f: ['The writer drives to work.', 'The air on the ring road tastes fresh.', 'The writer cycles in the evening.', 'The bus driver is very careful.'] },
    q2: 'Use details from **both** sources. Write a summary of the differences between the causes and effects of air pollution in the two cities.',
    q2ind: 'Source A: pollution from traffic – buses, vans, cars; effects: taste, dirty mask filter, but invisible and everyday; Source B: pollution from coal fires and factory chimneys; effects: thick yellow fog, can\'t see, accidents, deaths of the old and weak; A: pollution can be seen to lift when roads close; B: nobody acts – "as if they had never heard of the matter"; inferences about how visible and how deadly pollution is.',
    q3: 'You now need to refer **only** to Source B, the description from 1880.\n\nHow does the writer use language to describe the fog?',
    q3ind: 'contrast "not the white, wholesome mist… but a thick yellow vapour"; simile/colour "the colour of pea soup"; personification "crept… found its way beneath every door" – invasive, threatening; vivid images of cabs and torches – chaos; humour "obliged to apologise to it" – absurdity; sensory triplet "soot and sulphur and something rotten"; metaphor "black breath" of chimneys; repetition "grumble… grumble" – inaction; rhetorical reflection on "greatness".',
    q4: 'For this question, you need to refer to the **whole of Source A**, together with the **whole of Source B**.\n\nCompare how the writers convey their attitudes to pollution in their cities.\n\nIn your answer, you could:\n- compare their different attitudes\n- compare the methods the writers use to convey their attitudes\n- support your response with references to both texts.',
    q4ind: 'both are critical and frustrated; A: personal, humorous but persuasive, focuses on hope – a better city "underneath this one, waiting", call to action; B: observational, ironic and despairing about inaction, questions the cost of "greatness"; methods: A uses similes ("like licking a battery"), contrast with the marathon day, direct appeal to the reader; B uses vivid sensory description, personification, irony and a rhetorical question; A optimistic that change is possible, B more pessimistic.',
    q5: '"Cars should be banned from all city and town centres."\n\nWrite a letter to your local newspaper in which you argue your point of view on this statement.\n\n*(24 marks for content and organisation, 16 marks for technical accuracy)*',
  },
];

function multiQ(id: string, statements: { t: string[]; f: string[] }): QItem {
  // shuffled deterministically by the mock input; the true statements are listed first
  return { type: 'multi', q: 'Read again the first part of **Source A, paragraphs 1 and 2**.\n\nChoose **four** statements below which are true.', options: [...statements.t, ...statements.f], answers: [0, 1, 2, 3], why: `The four true statements are:\n${statements.t.map((x) => `- ${x}`).join('\n')}`, d: 1, id, topicId: 'el-p2q1q2', subjectId: 'english-language' } as QItem;
}

function p2Test(i: number): MockTest {
  const p = P2[i];
  const q2 = examQ(p.q2, 8, MS.q2p2(p.q2ind), { meta: 'Question 2 · AO1', time: 8 });
  const q3 = examQ(p.q3, 12, MS.q3p2(p.q3ind), { meta: 'Question 3 · AO2', time: 12 });
  const q4 = examQ(p.q4, 16, MS.q4p2(p.q4ind), { meta: 'Question 4 · AO3', time: 20 });
  const q5 = examQ(p.q5, 40, MS.writing('clear viewpoint from the start; form conventions (article headline and engaging opening; speech direct address and rhetorical devices; letter salutation and formal sign-off); developed arguments with varied evidence (anecdote, statistics, expert opinion); counter-argument acknowledged and rebutted; powerful conclusion; accurate, varied punctuation and sentence forms.'), { meta: 'Question 5 · AO5 (24) and AO6 (16)', time: 45 });
  return {
    id: `english-language-p2-t${i + 1}`, paperId: 'english-language-p2', n: (i + 1) as 1 | 2 | 3, title: `Practice paper ${i + 1}`,
    focus: `Theme: ${p.theme} – a 21st-century source paired with a 19th-century source.`,
    sections: [
      { title: 'Section A: Reading', intro: 'Answer all questions in this section. You are advised to spend about 45 minutes on this section.', source: `${p.a}\n\n${p.b}`, questions: [{ kind: 'auto', n: '1', marks: 4, item: multiQ(`el-mock-p2-${i}-q1`, p.q1) }, w('2', q2), w('3', q3), w('4', q4, 18)] },
      { title: 'Section B: Writing', intro: 'You are advised to spend about 45 minutes on this section. Write in full sentences. You are reminded of the need to plan your answer and leave enough time to check it.', questions: [w('5', q5, 30)] },
    ],
  };
}

const fix = (t: MockTest, topics: string[]): MockTest => ({ ...t, sections: t.sections.map((s) => ({ ...s, questions: s.questions.map((q, k) => (q.kind === 'written' ? { ...q, topicId: topics[k] ?? topics[topics.length - 1] } : q)) })) });

export const ENGLISH_LANGUAGE_PAPERS: MockPaper[] = [
  {
    id: 'english-language-p1', subjectId: 'english-language', title: 'Paper 1: Explorations in creative reading and writing', board: 'AQA 8700/1-style',
    mins: 105, marks: 80, tools: ['working'], info: P1_INFO,
    tests: () => [0, 1, 2].map((i) => fix(p1Test(i), ['el-p1q1', 'el-p1q2', 'el-p1q3', 'el-p1q4', 'el-p1q5'])),
  },
  {
    id: 'english-language-p2', subjectId: 'english-language', title: 'Paper 2: Writers\' viewpoints and perspectives', board: 'AQA 8700/2-style',
    mins: 105, marks: 80, tools: ['working'], info: P2_INFO,
    tests: () => [0, 1, 2].map((i) => {
      const t = p2Test(i);
      return { ...t, sections: t.sections.map((s) => ({ ...s, questions: s.questions.map((q) => (q.kind === 'written' ? { ...q, topicId: ({ '2': 'el-p2q1q2', '3': 'el-p2q3', '4': 'el-p2q4', '5': 'el-p2q5' } as Record<string, string>)[q.n] } : q)) })) };
    }),
  },
];
