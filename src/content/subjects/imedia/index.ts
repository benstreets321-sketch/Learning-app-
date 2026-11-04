import type { Subject } from '../../types';
import { r093Units, neaUnits } from './units';

const subject: Subject = {
  id: 'imedia',
  name: 'Creative iMedia (Interactive Media)',
  short: 'iMedia',
  icon: '🎬',
  color: '#db2777',
  qualification: 'OCR Cambridge National in Creative iMedia (J834) - Level 1/2',
  boardNote: 'There is no GCSE called "Interactive Media" - most schools teach **OCR Cambridge National Creative iMedia (J834)**, a GCSE-equivalent Level 1/2 qualification. It includes an optional unit on **interactive digital media (R097)**. If your course is different, ask your teacher which units you take.',
  examNews: [
    'J834 (first taught 2022) continues for 2027 and 2028 exams.',
    '**R093 exam: 1 hour 30 minutes, 70 marks, 40%** of the qualification - sat in **January or June**. It is the only exam.',
    '**R094** (Visual identity and digital graphics, 25%) and one optional unit (35%) are NEA - set assignments done in class and moderated by OCR.',
    'Grades are Level 1 Pass/Merit/Distinction and Level 2 Pass/Merit/Distinction/Distinction*.',
    'The exam is scenario-based: you apply knowledge to a client brief, so practise linking every answer to the context.',
  ],
  optionGroups: [
    {
      id: 'imedia-optional', label: 'Optional NEA unit (35%)',
      choices: [
        { value: 'r097', label: 'R097 Interactive digital media' },
        { value: 'r095', label: 'R095 Characters and comics', deep: false },
        { value: 'r096', label: 'R096 Animation with audio', deep: false },
        { value: 'r098', label: 'R098 Visual imaging', deep: false },
        { value: 'r099', label: 'R099 Digital games', deep: false },
      ],
    },
  ],
  papers: [
    {
      name: 'R093: Creative iMedia in the media industry (exam)', time: '1 hour 30 minutes', marks: 70, weight: '40%',
      content: 'Written exam on the media industry, factors influencing product design, pre-production planning and distribution. Mix of short, applied and extended-response questions set around scenarios.',
      sections: [
        { label: 'Topic area 1', detail: 'The media industry - sectors, products and job roles' },
        { label: 'Topic area 2', detail: 'Factors influencing product design - purpose, client requirements, audiences, research, media codes' },
        { label: 'Topic area 3', detail: 'Pre-production planning - work plans, mind maps, mood boards, scripts, storyboards, visualisation diagrams, legal issues' },
        { label: 'Topic area 4', detail: 'Distribution considerations - platforms, file formats and properties, compression' },
      ],
    },
    { name: 'R094: Visual identity and digital graphics (NEA)', time: 'About 10-12 hours of supervised work', marks: 80, weight: '25%', content: 'Plan, create and review a visual identity and digital graphic for a client brief set by OCR.' },
    { name: 'Optional NEA unit (R095-R099)', time: 'About 15-17 hours', marks: 80, weight: '35%', content: 'Plan, create and review a media product (e.g. interactive digital media) for a set brief.' },
  ],
  commandWords: [
    { word: 'Identify / State', meaning: 'Give a short fact or example - 1 mark each.' },
    { word: 'Describe', meaning: 'Give the features or characteristics - a developed point.' },
    { word: 'Explain', meaning: 'Give reasons/how and why - "...because..." / "...so that...". Link to the scenario.' },
    { word: 'Discuss', meaning: 'Consider different aspects/viewpoints in detail - extended answer.' },
    { word: 'Evaluate', meaning: 'Weigh up strengths and weaknesses and reach a justified judgement.' },
    { word: 'Justify', meaning: 'Give evidence or reasons to support your choice, linked to the client/audience.' },
  ],
  tools: ['reference'],
  strategies: [
    { title: 'Always apply to the scenario', why: 'R093 rewards applying knowledge to the client and audience given; generic answers cap your marks.', how: ['Underline the client, product, audience and purpose in each scenario.', 'Finish explanations with "...which suits [audience] because..."'] },
    { title: 'Learn pre-production documents by drawing them', why: 'You may be asked to complete or critique a storyboard, mind map or visualisation diagram - recognising their conventions earns marks.', how: ['Sketch each document from memory with its conventions labelled.', 'Use the flashcards for purpose / content / conventions.'] },
    { title: 'Master file formats with a table', why: 'File formats and properties are reliable marks every series.', how: ['Learn format → type → compression → typical use.', 'Practise file-size calculations with the generators.'] },
    { title: 'Practise extended answers', why: 'Longer questions are marked by levels on quality of discussion.', how: ['Plan 3 points, each with explanation + example + link to the scenario.', 'Include both advantages and disadvantages for "discuss/evaluate".'] },
  ],
  stuck: [
    { problem: "I don't know how to answer a scenario question", fixes: ['Identify: who is the client, who is the audience, what is the product and its purpose?', 'Choose a feature and explain WHY it suits that audience.', 'Use the client\'s own words from the brief.'] },
    { problem: 'I mix up the pre-production documents', fixes: ['Mind map = ideas; mood board = look and feel; visualisation diagram = layout of a still image; storyboard = sequence of shots; script = words/directions; flow chart = navigation/process; wireframe = webpage/app layout; asset log = list of assets and their sources/permissions.'] },
    { problem: 'Legal issues are confusing', fixes: ['Copyright = protects creative work automatically; trademark = protects logos/brand names (registered ®); defamation = damaging false statements (libel written, slander spoken); privacy = permission to film/publish people; data protection = personal data.'] },
    { problem: "My NEA isn't going well", fixes: ['Re-read the assignment brief and the marking criteria for each topic area.', 'Keep an asset log as you go - you must show sources and permissions.', 'Your teacher can give general guidance but not detailed corrections - plan time for reviewing your own work.'] },
  ],
  units: [...r093Units, ...neaUnits],
};

export default subject;
