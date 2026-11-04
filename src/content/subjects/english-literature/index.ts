import type { Subject } from '../../types';
import { skillsUnit } from './skills';
import { macbethUnit } from './macbeth';
import { romeoUnit } from './romeo';
import { carolUnit } from './carol';
import { jekyllUnit } from './jekyll';
import { inspectorUnit } from './inspector';
import { modernUnits } from './modern';
import { otherTextUnits } from './other-texts';
import { powerConflictUnit } from './power-conflict';
import { loveRelUnit } from './love-relationships';
import { worldsLivesUnit } from './worlds-lives';
import { unseenUnit } from './unseen';

const subject: Subject = {
  id: 'english-literature',
  name: 'English Literature',
  short: 'Eng Lit',
  icon: 'Li',
  color: '#6B4C8A',
  qualification: 'AQA GCSE English Literature (8702)',
  boardNote:
    'Mapped to **AQA 8702**, the most widely taken English Literature GCSE. Choose your school\'s set texts in **Settings** and only those appear. The essay skills, poetry and unseen sections work for any board (Edexcel, OCR and Eduqas also assess AO1-AO3 the same way).',
  boards: [{ value: 'aqa', label: 'AQA' }],
  examNews: [
    'You will sit the **current AQA 8702 specification** in both 2027 and 2028 - no new set texts are being introduced for these years.',
    'Three modern texts had their **last exam in 2024**: *The History Boys*, *The Curious Incident of the Dog in the Night-Time* and *Never Let Me Go*. Make sure you are not revising from an old guide for these.',
    'Newer texts (first examined 2025): *Princess & The Hustler*, *Leave Taking*, *My Name is Leon* and the **Worlds and Lives** poetry cluster.',
    'From **summer 2027** AQA uses a single left-aligned column for extracts, line numbers on the left and less bold/italic/capitals on question papers (accessibility changes, not content changes).',
    'It is a **closed-book** exam: you need quotations memorised. Use the Quote trainer in the Toolkit.',
    '**Spelling, punctuation and grammar** (AO4) is worth 4 marks on the Shakespeare question and 4 on the modern text question - 8 marks in total.',
  ],
  optionGroups: [
    {
      id: 'lit-shakespeare', label: 'Shakespeare play (Paper 1 Section A)',
      choices: [
        { value: 'macbeth', label: 'Macbeth' }, { value: 'romeo', label: 'Romeo and Juliet' },
        { value: 'tempest', label: 'The Tempest', deep: false }, { value: 'merchant', label: 'The Merchant of Venice', deep: false },
        { value: 'muchado', label: 'Much Ado About Nothing', deep: false }, { value: 'caesar', label: 'Julius Caesar', deep: false },
      ],
    },
    {
      id: 'lit-novel', label: '19th-century novel (Paper 1 Section B)',
      choices: [
        { value: 'acc', label: 'A Christmas Carol' }, { value: 'jekyll', label: 'Jekyll and Hyde' },
        { value: 'great-exp', label: 'Great Expectations', deep: false }, { value: 'jane-eyre', label: 'Jane Eyre', deep: false },
        { value: 'frankenstein', label: 'Frankenstein', deep: false }, { value: 'pride', label: 'Pride and Prejudice', deep: false },
        { value: 'sign-four', label: 'The Sign of Four', deep: false },
      ],
    },
    {
      id: 'lit-modern', label: 'Modern text (Paper 2 Section A)',
      choices: [
        { value: 'aic', label: 'An Inspector Calls' }, { value: 'blood', label: 'Blood Brothers' }, { value: 'lotf', label: 'Lord of the Flies' },
        { value: 'animal', label: 'Animal Farm' }, { value: 'dna', label: 'DNA', deep: false }, { value: 'honey', label: 'A Taste of Honey', deep: false },
        { value: 'leave', label: 'Leave Taking', deep: false }, { value: 'princess', label: 'Princess & The Hustler', deep: false },
        { value: 'tales', label: 'Telling Tales', deep: false }, { value: 'anita', label: 'Anita and Me', deep: false },
        { value: 'pigeon', label: 'Pigeon English', deep: false }, { value: 'leon', label: 'My Name is Leon', deep: false },
      ],
    },
    {
      id: 'lit-poetry', label: 'Poetry cluster (Paper 2 Section B)',
      choices: [
        { value: 'power-conflict', label: 'Power and Conflict' }, { value: 'love-rel', label: 'Love and Relationships' }, { value: 'worlds-lives', label: 'Worlds and Lives' },
      ],
    },
  ],
  papers: [
    {
      name: 'Paper 1: Shakespeare and the 19th-century novel', time: '1 hour 45 minutes', marks: 64, weight: '40% of GCSE',
      content: 'Two extract-based essays. Closed book.',
      sections: [
        { label: 'Section A: Shakespeare', detail: 'One question on your play: an extract, then the play as a whole. **30 marks + 4 SPaG**. About 50-55 minutes.' },
        { label: 'Section B: 19th-century novel', detail: 'One question on your novel: an extract, then the novel as a whole. **30 marks**. About 45-50 minutes.' },
      ],
    },
    {
      name: 'Paper 2: Modern texts and poetry', time: '2 hours 15 minutes', marks: 96, weight: '60% of GCSE',
      content: 'An essay on your modern text, a poetry comparison and two unseen poetry questions. Closed book (the anthology poem named in the question is printed).',
      sections: [
        { label: 'Section A: Modern text', detail: 'Choose ONE of two essay questions (no extract). **30 marks + 4 SPaG**. About 45 minutes.' },
        { label: 'Section B: Anthology poetry', detail: 'Compare the named poem (printed) with one other from your cluster (from memory). **30 marks**. About 45 minutes.' },
        { label: 'Section C: Unseen poetry', detail: 'Q27.1: analyse one unseen poem (**24 marks**, ~30 min). Q27.2: compare the methods in two unseen poems (**8 marks**, ~15 min).' },
      ],
    },
  ],
  commandWords: [
    { word: 'AO1', meaning: 'Read, understand and respond: a **critical, personal argument** with **well-chosen quotations** (references) to support it. (Both essays.)' },
    { word: 'AO2', meaning: 'Analyse the **language, form and structure** a writer uses to create meanings and effects, using subject terminology. (All questions.)' },
    { word: 'AO3', meaning: 'Show understanding of the relationship between texts and the **contexts** in which they were written. (Not unseen poetry.)' },
    { word: 'AO4', meaning: 'Spelling, punctuation, grammar and vocabulary. (Shakespeare and modern text only, 4 marks each.)' },
    { word: '"How does X present..."', meaning: 'Explore the writer\'s **methods** and **purposes**: what ideas they want us to think about and how they get us there.' },
    { word: '"How far..."', meaning: 'Weigh up: to what extent is it true? Consider alternatives and reach a judgement.' },
    { word: '"Starting with this extract..."', meaning: 'Analyse the extract closely first, then move to the **whole text**. Both are needed for the top band.' },
    { word: '"Compare"', meaning: 'Explore **similarities and differences** in ideas and methods, linking the two poems throughout.' },
  ],
  tools: ['quotes', 'essay', 'pastq'],
  strategies: [
    {
      title: 'Learn quotations little and often',
      why: 'It\'s a closed-book exam. Retrieval and spacing are the most reliable ways to make quotations stick (and short ones are easier to embed).',
      how: ['Learn 15-25 short, flexible quotations per text - single words and short phrases count!', 'Use the Quote trainer: words disappear until you can type it from memory.', 'For each quote, know: who/when, a key word to zoom in on, and 2 themes it links to.'],
    },
    {
      title: 'Revise by theme and character, not just plot',
      why: 'Questions are always about a character or theme across the whole text. Organising knowledge the same way makes it usable under pressure.',
      how: ['Make a one-page map for each main character and theme with quotes from the beginning, middle and end.', 'Practise tracking how an idea changes: start → turning point → ending.'],
    },
    {
      title: 'Plan more essays than you write',
      why: 'Planning trains the hardest skill - building an argument - and you can do five plans in the time of one essay.',
      how: ['Take any question from the past question tracker and plan it in 5 minutes: thesis + 3 points + quotes + context.', 'Write one full timed essay per week and mark it against the level descriptors.'],
    },
    {
      title: 'Zoom in on single words',
      why: 'Top-band answers analyse the effects of precise word choices and methods (AO2) rather than retelling the story.',
      how: ['For every quote, pick ONE word and explore its connotations.', 'Name the method only when it helps you explain the effect.'],
    },
    {
      title: 'Context = the writer\'s purpose',
      why: 'AO3 is rewarded when context explains WHY the writer made choices - not as a separate history paragraph.',
      how: ['Link every context point to a message: "Priestley, a socialist, uses Birling to mock capitalist complacency..."', 'Learn 5-6 big context ideas per text.'],
    },
  ],
  stuck: [
    { problem: "I don't know what to write about a quote", fixes: ['Ask: what does it literally say? What does ONE key word suggest (connotations)?', 'Ask: how might the audience/reader feel? Why would the writer want that?', 'Link it to a theme and to context: "This reflects..."'] },
    { problem: "I can't remember quotations", fixes: ['Use short ones: single words ("butcher", "Ignorance") still count.', 'Learn 3 quotes a day with the Quote trainer and revisit them in 2 and 7 days.', 'In the exam you can refer to a moment without quoting exactly ("when Macbeth sees the dagger...") - that still counts as a reference.'] },
    { problem: 'My essays just retell the story', fixes: ['Start every paragraph with an argument about the writer: "Dickens presents Scrooge as..." not "In Stave 1...".', 'Use "Shakespeare/Dickens/Priestley" as the subject of your sentences.', 'Every paragraph should answer "why did the writer do this?"'] },
    { problem: "I don't know how to start", fixes: ['Write a one-sentence thesis answering the question, mentioning the writer\'s purpose.', 'Begin with the extract (if there is one): the first strong quote you notice.', 'Use the Essay planner tool.'] },
    { problem: 'I run out of time', fixes: ['Spend ~5 minutes planning, then write 4-5 developed paragraphs rather than lots of short ones.', 'Practise timed essays: 50 minutes Shakespeare, 45 for the others.', 'Leave the unseen comparison (8 marks) to ~15 minutes - don\'t over-write it.'] },
  ],
  units: [
    skillsUnit,
    ...macbethUnit,
    ...romeoUnit,
    ...carolUnit,
    ...jekyllUnit,
    ...inspectorUnit,
    ...modernUnits,
    ...otherTextUnits,
    powerConflictUnit,
    loveRelUnit,
    worldsLivesUnit,
    unseenUnit,
  ],
};

export default subject;
