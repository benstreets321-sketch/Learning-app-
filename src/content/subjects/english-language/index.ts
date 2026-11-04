import type { Subject } from '../../types';
import { paper1Unit, paper2Unit, skillsUnitLang } from './units';

const subject: Subject = {
  id: 'english-language',
  name: 'English Language',
  short: 'Eng Lang',
  icon: 'El',
  color: '#2F5D8A',
  qualification: 'AQA GCSE English Language (8700)',
  boardNote: 'Mapped to **AQA 8700**. The reading and writing skills transfer to Edexcel, OCR and Eduqas, but the question numbers and marks differ. There are **no set texts** - every source is unseen, so this subject is about skills you practise.',
  examNews: [
    'You sit the current AQA 8700 specification in 2027 and 2028 - same paper structure.',
    'From **summer 2027**, AQA papers use a **consistent tick-box format** for multiple-choice style questions (affects Paper 2 Q1 "choose four true statements"), a single left-aligned column for sources and **line numbers on the left**.',
    'Spoken Language is a separate endorsement (Pass/Merit/Distinction) assessed by your teacher - it doesn\'t count towards the grade.',
    'Both papers are worth 50%: half reading, half writing. **Writing is 50% of the whole GCSE** - practise it as much as reading.',
  ],
  papers: [
    {
      name: 'Paper 1: Explorations in creative reading and writing', time: '1 hour 45 minutes', marks: 80, weight: '50%',
      content: 'One unseen 20th- or 21st-century fiction extract, then a piece of descriptive or narrative writing.',
      sections: [
        { label: 'Q1 (4 marks, ~5 min)', detail: 'List four things from a given section. AO1.' },
        { label: 'Q2 (8 marks, ~10 min)', detail: 'How does the writer use **language**? AO2.' },
        { label: 'Q3 (8 marks, ~10 min)', detail: 'How has the writer **structured** the text? AO2.' },
        { label: 'Q4 (20 marks, ~25 min)', detail: 'Evaluate a statement about the text - **to what extent do you agree?** AO4.' },
        { label: 'Q5 (40 marks, ~45 min)', detail: 'Descriptive OR narrative writing. AO5 content/organisation (24) + AO6 technical accuracy (16).' },
      ],
    },
    {
      name: 'Paper 2: Writers\' viewpoints and perspectives', time: '1 hour 45 minutes', marks: 80, weight: '50%',
      content: 'Two linked non-fiction/literary non-fiction sources (one 19th century, one 20th/21st century), then writing to present a viewpoint.',
      sections: [
        { label: 'Q1 (4 marks, ~5 min)', detail: 'Choose four TRUE statements about Source A. AO1.' },
        { label: 'Q2 (8 marks, ~8 min)', detail: '**Summary** of differences/similarities between both sources. AO1.' },
        { label: 'Q3 (12 marks, ~12 min)', detail: 'How does the writer use **language**? (one source) AO2.' },
        { label: 'Q4 (16 marks, ~20 min)', detail: '**Compare** the writers\' perspectives AND methods. AO3.' },
        { label: 'Q5 (40 marks, ~45 min)', detail: 'Write an article, letter, speech, essay or leaflet giving your viewpoint. AO5 (24) + AO6 (16).' },
      ],
    },
  ],
  commandWords: [
    { word: 'AO1', meaning: 'Identify and interpret information and ideas; select and **synthesise** evidence from different texts.' },
    { word: 'AO2', meaning: 'Explain, comment on and analyse how writers use **language and structure** to achieve effects, using subject terminology.' },
    { word: 'AO3', meaning: '**Compare** writers\' ideas and perspectives, and how they are conveyed, across two texts.' },
    { word: 'AO4', meaning: '**Evaluate** texts critically and support with textual references.' },
    { word: 'AO5', meaning: 'Communicate clearly, effectively and imaginatively, adapting tone, style and register for **purpose and audience**; organise ideas with structural features.' },
    { word: 'AO6', meaning: 'A range of **vocabulary and sentence structures**, with accurate spelling and punctuation.' },
    { word: 'Synthesise', meaning: 'Bring together information from both sources to make a combined point.' },
    { word: 'Perspective', meaning: 'The writer\'s point of view, attitude or feelings about the topic.' },
  ],
  tools: ['essay'],
  strategies: [
    { title: 'Practise each question type separately, then in full papers', why: 'Each question tests a different skill; isolated practice with feedback builds each one (deliberate practice).', how: ['Use the question guides: learn the method, try the practice question, compare with the model.', 'Then do full timed papers from AQA\'s website in Year 11.'] },
    { title: 'Read widely - especially quality non-fiction and 19th-century writing', why: 'Vocabulary and familiarity with older styles make unseen texts much easier.', how: ['Read one article a day (broadsheet newspapers, long-form journalism).', 'Read a page of Dickens, Brontë or Victorian journalism each week; look up unfamiliar words.'] },
    { title: 'Build a writing toolkit, not memorised essays', why: 'You can\'t predict the task, but you can master openings, structures and techniques that work for any task.', how: ['Collect ambitious vocabulary in My notes.', 'Practise 10-minute plans for lots of prompts.', 'Rewrite paragraphs to improve them - redrafting teaches more than writing new pieces.'] },
    { title: 'Spend real time on accuracy (AO6 = 32 marks)', why: '16 marks per paper are for technical accuracy - many students lose easy marks through comma splices and missing apostrophes.', how: ['Do the SPaG topic quizzes until you score 90%+.', 'Leave 5 minutes to proofread every piece of writing.'] },
    { title: 'Timing is a skill', why: 'Running out of time on Q5 throws away up to 40 marks.', how: ['Follow "a mark a minute" roughly; start Q5 with 50 minutes left.', 'Practise timed sections with the exam timer.'] },
  ],
  stuck: [
    { problem: "I don't understand the extract", fixes: ['Read the introduction above the source - it tells you who, where and when.', 'Read it twice: once for the story, once with the question in mind.', 'Focus on the lines the question points you to.', 'You don\'t need every word - work out unfamiliar words from context.'] },
    { problem: "I don't know what to say about a quotation", fixes: ['Pick ONE word. What does it make you picture or feel?', 'What does it suggest about the character/place/writer\'s view?', 'Why might the writer want the reader to feel this?'] },
    { problem: 'Structure questions confuse me', fixes: ['Think like a film camera: where does the focus start, shift and end?', 'Use the beginning-middle-end approach.', 'Ask "why here?" for each shift.'] },
    { problem: 'My creative writing is boring', fixes: ['Write about a small moment in detail rather than a whole adventure.', 'Use the five senses and one strong extended image.', 'Vary sentence lengths - a one-word sentence can be powerful.', 'Plan a structure: e.g. zoom in → flashback → return.'] },
    { problem: "I can't think of arguments for Q5", fixes: ['Use PESTLE: Political, Economic, Social, Technological, Legal, Environmental angles.', 'Think: who is affected? Students, parents, teachers, society?', 'Use an anecdote, a statistic (you may invent plausible ones) and a counter-argument.'] },
  ],
  units: [skillsUnitLang, paper1Unit, paper2Unit],
};

export default subject;
