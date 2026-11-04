import type { Subject, Unit } from '../../types';
import { cards, mc, tf, topic, match } from '../../dsl';
import { medicineTopics } from './medicine';
import { germanyTopics } from './germany';
import { elizabethTopics } from './elizabeth';
import { coldWarTopics, conflictTopics } from './coldwar';

const ED = (value = 'edexcel') => ({ group: 'history-board', value });

const edexcelTechnique = topic({
  id: 'hist-ed-technique', title: 'Edexcel exam technique: every question type', summary: 'How to answer describe, explain why, how far, inference, usefulness and interpretation questions.',
  notes: `
## Paper 1: Thematic study + historic environment (Medicine + Western Front) · 1h15 · 52 marks · 30%
| Q | Marks | Method |
|---|---|---|
| 1 Describe two features (WF) | 4 | Two features, each with a supporting detail |
| 2a How useful are Sources B and C (WF) | 8 | Content + provenance (NOP) + own knowledge, for BOTH sources |
| 2b How could you follow up Source B | 4 | Detail → question → type of source → how it helps |
| 3 Explain one way X was similar/different | 4 | One comparison, supported for both periods |
| 4 Explain why | 12 | 3 developed paragraphs (2 stimulus + 1 own) with causation |
| 5/6 "How far do you agree?" | 16 + 4 SPaG | Both sides, own knowledge beyond stimulus, criteria-based judgement |

## Paper 2: Period study (Cold War) + British depth (Elizabeth) · 1h45 · 64 marks · 40%
| Q | Marks | Method |
|---|---|---|
| Period Q1 Explain two consequences | 8 | Two consequences, each explained with knowledge |
| Period Q2 Narrative account | 8 | Analytical narrative - events in order, showing how one led to another |
| Period Q3 Explain the importance of two... | 16 | Importance for the wider story, for TWO chosen events |
| Depth Q1 Describe two features | 4 | Feature + detail × 2 |
| Depth Q2 Explain why | 12 | As Paper 1 Q4 |
| Depth Q3 How far do you agree? | 16 | Balanced, judged |

## Paper 3: Modern depth (Weimar and Nazi Germany) · 1h20 · 52 marks · 30%
| Q | Marks | Method |
|---|---|---|
| 1 Give two inferences from Source A | 4 | "What I can infer..." + "Details that tell me..." × 2 |
| 2 Explain why | 12 | 3 developed causes |
| 3a How useful are Sources B and C | 8 | Content + provenance + own knowledge |
| 3b Main difference between Interpretations 1 and 2 | 4 | State the difference with a detail from each |
| 3c Suggest one reason why they differ | 4 | Different sources used / different focus / different emphasis |
| 3d How far do you agree with Interpretation 2? | 16 + 4 SPaG | Use both interpretations + context; reach a judgement |

:::key Source usefulness - NOP
**N**ature (diary, speech, photo), **O**rigin (who, when), **P**urpose (why made) - and how these affect usefulness *for this enquiry*. Always add **own knowledge** to test the content.
:::
`,
  keyPoints: ['Describe: two features + details', 'Explain why: 3 developed causes', 'How far: both sides + judgement with criteria', 'Usefulness: content + NOP + own knowledge', 'Interpretations: difference, reason for difference, how far you agree', 'Narrative: events linked in sequence'],
  flashcards: cards([['What does NOP stand for?', 'Nature, Origin, Purpose - used to evaluate a source\'s provenance.'], ['How many marks is an Edexcel "explain why" question?', '12'], ['What must you include in a "how far do you agree" answer?', 'Both sides, knowledge beyond the stimulus points, and a justified judgement.'], ['How do you answer a "follow up" question?', 'Detail I would follow up → question I would ask → type of source → how it would help.']]),
  questions: [
    mc('How many marks is the Edexcel "how far do you agree" essay on Paper 1?', ['16 + 4 SPaG', '12', '8', '4'], 'Plus 4 marks for SPaG.', { d: 1 }),
    match('Match the question to its method.', [['Describe two features', 'Feature + supporting detail × 2'], ['Explain why', 'Three developed causes'], ['How useful', 'Content + provenance + own knowledge'], ['Narrative account', 'Linked sequence of events']], 'Know the technique for each.', { d: 2 }),
    tf('In a 12-mark "explain why", you should only use the two stimulus points given.', false, 'Use them, but add at least one point of your own for the top level.', { d: 2 }),
  ],
});

const aqaTechnique = topic({
  id: 'hist-aqa-technique', title: 'AQA exam technique: every question type', summary: 'Interpretations, source utility, account, importance and essay questions for AQA 8145.',
  notes: `
## Paper 1 (2 hours, 84 marks, 50%)
**Section A - Period study (Germany 1890-1945)**
| Q | Marks | Method |
|---|---|---|
| 1 How does Interpretation B differ from Interpretation A? | 4 | Difference in content, with detail from both |
| 2 Why might the authors have different interpretations? | 4 | Provenance - who wrote them, when, why, what they knew |
| 3 Which interpretation is more convincing? | 8 | Test BOTH against your own knowledge; judge |
| 4 Describe two... | 4 | Two points with detail |
| 5 In what ways were the lives of... affected? | 8 | Explain the changes with precise knowledge |
| 6 Which was more important: X or Y? | 12 | Explain both; justify which mattered more |

**Section B - Wider world depth (Conflict and tension 1918-39)**
| Q | Marks | Method |
|---|---|---|
| 1 Source A supports/opposes... How do you know? | 4 | Content + provenance + own knowledge |
| 2 How useful are Sources B and C? | 12 | Content + provenance + context, both sources |
| 3 Write an account of... | 8 | Analytical narrative of causation/consequence |
| 4 "Statement" - how far do you agree? | 16 + 4 SPaG | Balanced essay with substantiated judgement |

## Paper 2 (2 hours, 84 marks, 50%)
**Section A - Thematic (Health and the people)**: Q1 How useful is Source A? (8); Q2 Explain the significance of... (8); Q3 Explain two ways in which X and Y were similar (8); Q4 Has [factor] been the main factor...? (16 + 4 SPaG).
**Section B - British depth (Elizabethan England)**: Q1 How convincing is Interpretation A? (8); Q2 Explain what was important about... (8); Q3 Write an account... (8); Q4 Historic environment essay on the **specified site** (16).

:::warn The historic environment changes every year
AQA names a different Elizabethan site each year. Your teacher will tell you the site for your exam year - learn its features and how it reflects Elizabethan society.
:::
`,
  keyPoints: ['Interpretations: difference, reason, which is more convincing', 'Utility: content + provenance + context', 'Account: analytical narrative', 'Which more important: explain both, justify', 'Essays: 16 marks + 4 SPaG', 'Historic environment site changes yearly'],
  flashcards: cards([['How do you judge which interpretation is more convincing?', 'Test each against your own knowledge of the context, then make a judgement.'], ['How many marks is an AQA 16-mark essay plus SPaG?', '16 + 4 = 20.'], ['What changes every year in AQA Paper 2 Section B?', 'The historic environment site for the Elizabethan England essay.']]),
  questions: [
    mc('In AQA "which interpretation is more convincing", what should you use to test the interpretations?', ['Your own contextual knowledge', 'Only the author\'s name', 'The length of each interpretation', 'Nothing - just give your opinion'], 'Evidence-based judgement.', { d: 2 }),
    tf('The AQA historic environment site is the same every year.', false, 'It changes - check with your teacher.', { d: 1 }),
  ],
});

const units: Unit[] = [
  { id: 'hist-ed-tech', title: 'Edexcel: exam technique', option: ED(), topics: [edexcelTechnique] },
  { id: 'hist-ed-med', title: 'Edexcel Paper 1: Medicine in Britain c1250-present & the Western Front', option: ED(), topics: medicineTopics('ed', 'edexcel') },
  { id: 'hist-ed-cw', title: 'Edexcel Paper 2: Superpower relations and the Cold War 1941-91', option: ED(), topics: coldWarTopics('ed') },
  { id: 'hist-ed-eliz', title: 'Edexcel Paper 2: Early Elizabethan England 1558-88', option: ED(), topics: elizabethTopics('ed', 'edexcel') },
  { id: 'hist-ed-ger', title: 'Edexcel Paper 3: Weimar and Nazi Germany 1918-39', option: ED(), topics: germanyTopics('ed', 'edexcel') },
  { id: 'hist-aqa-tech', title: 'AQA: exam technique', option: ED('aqa'), topics: [aqaTechnique] },
  { id: 'hist-aqa-ger', title: 'AQA Paper 1A: Germany 1890-1945 - Democracy and dictatorship', option: ED('aqa'), topics: germanyTopics('aqa', 'aqa') },
  { id: 'hist-aqa-ct', title: 'AQA Paper 1B: Conflict and tension 1918-1939', option: ED('aqa'), topics: conflictTopics('aqa') },
  { id: 'hist-aqa-health', title: 'AQA Paper 2A: Britain - Health and the people c1000-present', option: ED('aqa'), topics: medicineTopics('aqa', 'aqa') },
  { id: 'hist-aqa-eliz', title: 'AQA Paper 2B: Elizabethan England c1568-1603', option: ED('aqa'), topics: elizabethTopics('aqa', 'aqa') },
];

const subject: Subject = {
  id: 'history',
  name: 'History',
  short: 'History',
  icon: '🏛️',
  color: '#9a3412',
  qualification: 'GCSE History (Edexcel 1HI0 or AQA 8145)',
  boardNote: 'History options vary a lot between schools. This app covers the **most popular options**: **Edexcel** (Medicine & the Western Front, Cold War, Early Elizabethan England, Weimar & Nazi Germany) and **AQA** (Germany 1890-1945, Conflict & tension 1918-39, Health and the people, Elizabethan England). Pick your board in Settings. If your school studies different units, the exam technique guides still apply.',
  examNews: [
    'Current specifications continue for 2027 and 2028 exams.',
    'Edexcel: 3 papers (1h15 / 1h45 / 1h20). AQA: 2 papers (2 hours each).',
    'SPaG is worth extra marks on the long essays - write accurately and use historical terms.',
    'AQA: the **historic environment site** for Elizabethan England changes each year - check which site is set for your exam year.',
    'AQA papers from summer 2027 use consistent tick-box formats and left-aligned sources.',
  ],
  optionGroups: [{ id: 'history-board', label: 'Your History exam board', choices: [{ value: 'edexcel', label: 'Edexcel (1HI0)' }, { value: 'aqa', label: 'AQA (8145)' }] }],
  papers: [
    { name: 'Edexcel Paper 1: Thematic study + historic environment', time: '1 hour 15 minutes', marks: 52, weight: '30%', content: 'Medicine in Britain c1250-present; the British sector of the Western Front 1914-18.' },
    { name: 'Edexcel Paper 2: Period study + British depth', time: '1 hour 45 minutes', marks: 64, weight: '40%', content: 'Superpower relations and the Cold War 1941-91; Early Elizabethan England 1558-88.' },
    { name: 'Edexcel Paper 3: Modern depth study', time: '1 hour 20 minutes', marks: 52, weight: '30%', content: 'Weimar and Nazi Germany 1918-39.' },
    { name: 'AQA Paper 1: Understanding the modern world', time: '2 hours', marks: 84, weight: '50%', content: 'Germany 1890-1945; Conflict and tension 1918-1939.' },
    { name: 'AQA Paper 2: Shaping the nation', time: '2 hours', marks: 84, weight: '50%', content: 'Britain: Health and the people c1000-present; Elizabethan England c1568-1603 (with historic environment).' },
  ],
  commandWords: [
    { word: 'Describe', meaning: 'Give features/characteristics with specific detail.' },
    { word: 'Explain why', meaning: 'Give reasons (causes) and show HOW each led to the outcome.' },
    { word: 'How far do you agree', meaning: 'Weigh the statement against other factors; reach a justified judgement.' },
    { word: 'How useful', meaning: 'Judge the source\'s value for a specific enquiry using content, provenance and context.' },
    { word: 'Interpretation', meaning: 'A historian\'s or later writer\'s view of the past - compare, explain differences, evaluate.' },
    { word: 'Significance / importance', meaning: 'How far something mattered: impact at the time, long-term, on people, on later events.' },
    { word: 'Narrative / account', meaning: 'Tell the story analytically - show how one event led to the next.' },
  ],
  tools: ['timeline', 'essay'],
  strategies: [
    { title: 'Build timelines and learn dates in clusters', why: 'Chronology underpins every History answer, and dates are easy marks once secure.', how: ['Use the Master timeline and ordering questions.', 'Learn 3-5 key dates per topic with flashcards; revisit them weekly.'] },
    { title: 'Learn knowledge as causes and consequences', why: 'Questions ask why things happened and what they led to - knowledge stored as chains is easier to use.', how: ['For each event, write "Because... → This led to... → which meant..."', 'Practise explaining links between factors (e.g. war and science in medicine).'] },
    { title: 'Practise each question type with the mark scheme', why: 'Each question has a specific structure; knowing it is worth many marks.', how: ['Use the Exam technique guide for your board.', 'Plan 12- and 16-mark answers in 5 minutes; write one in full each week.'] },
    { title: 'Specific factual detail', why: 'Top levels need precise, accurate knowledge - names, dates, statistics.', how: ['Add a specific example to every point (e.g. "6 million unemployed by 1932").', 'Use the flashcards to build a bank of precise details.'] },
  ],
  stuck: [
    { problem: 'I forget the order of events', fixes: ['Use the Timeline tab and ordering questions.', 'Make a visual timeline on one page and link causes with arrows.'] },
    { problem: 'My essays describe rather than explain', fixes: ['Start each paragraph with the argument: "One reason X happened was..."', 'Use "This meant that..." and "As a result..." to show causation.', 'End each paragraph by linking back to the question.'] },
    { problem: "I don't know how to judge a source", fixes: ['Content: what does it tell me about the enquiry?', 'Provenance: who made it, when, why (NOP) - how does that affect it?', 'Context: does my own knowledge support or challenge it?'] },
    { problem: "I can't reach a judgement", fixes: ['Decide which factor had the BIGGEST impact or was a pre-condition for others.', 'Use a criterion: "most important because without it...".', 'It\'s fine to say "partly" - but explain why.'] },
  ],
  units,
};

export default subject;
