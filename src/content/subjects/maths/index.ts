import type { Subject } from '../../types';
import { numberUnit } from './number';
import { algebraUnit } from './algebra';
import { ratioUnit } from './ratio';
import { geometryUnit } from './geometry';
import { probStatsUnit } from './probstats';

const subject: Subject = {
  id: 'maths',
  name: 'Maths',
  short: 'Maths',
  icon: '📐',
  color: '#2563eb',
  qualification: 'GCSE Mathematics (Edexcel 1MA1 / AQA 8300 / OCR J560)',
  boardNote: 'GCSE Maths content is **the same for every exam board** (set by the Department for Education) - only the style of questions differs slightly. Choose **Foundation** (grades 1-5) or **Higher** (grades 4-9) in Settings; higher-only topics are marked.',
  examNews: [
    'A **formulae sheet** is provided in every maths paper in **2027** (identical to 2026) and Ofqual confirmed in May 2026 it continues for **2028 onwards** for the current specification.',
    'The sheet does NOT include everything - see **Toolkit → Reference sheet** for exactly what is given and what you must memorise (e.g. area of a triangle, cylinder volume, angle facts, circle theorems, index laws).',
    '3 papers, 1 hour 30 minutes each, 80 marks each. **Paper 1 is non-calculator**; Papers 2 and 3 allow a calculator.',
    'AQA question papers from summer 2027 use a consistent tick-box format for all multiple-choice questions.',
    'The Curriculum and Assessment Review (2025) proposes changes for *future* GCSEs - nothing changes for 2027 or 2028 exams.',
  ],
  papers: [
    { name: 'Paper 1 (non-calculator)', time: '1 hour 30 minutes', marks: 80, weight: '33⅓%', content: 'Any topic from the whole specification. No calculator - fluency with written methods and number facts is essential.' },
    { name: 'Paper 2 (calculator)', time: '1 hour 30 minutes', marks: 80, weight: '33⅓%', content: 'Any topic. Use your calculator efficiently - but still show method.' },
    { name: 'Paper 3 (calculator)', time: '1 hour 30 minutes', marks: 80, weight: '33⅓%', content: 'Any topic. Similar to Paper 2.' },
  ],
  commandWords: [
    { word: 'Work out / Calculate', meaning: 'Find the answer. Show working - method marks are available even if the final answer is wrong.' },
    { word: 'Show that', meaning: 'The answer is given: you must show every step clearly to reach it. A missing step loses marks.' },
    { word: 'Write down', meaning: 'Little or no working needed - usually 1 mark.' },
    { word: 'Estimate', meaning: 'Round each number to 1 significant figure first, then calculate.' },
    { word: 'Give reasons', meaning: 'State the angle facts or rules you used, in words (e.g. "angles on a straight line add to 180°").' },
    { word: 'Prove', meaning: 'A logical argument that works for ALL cases (e.g. using n for any integer), not just examples.' },
    { word: 'Simplify / simplify fully', meaning: 'Collect like terms / cancel until it cannot be simplified any further.' },
    { word: 'Exact value', meaning: 'Leave in surd form or in terms of π - do not round.' },
    { word: 'Give your answer to 3 s.f. / 1 d.p.', meaning: 'Round only at the END; keep full calculator values during working.' },
  ],
  tools: ['reference'],
  strategies: [
    {
      title: 'Worked example → your turn → mixed practice',
      why: 'Studying a worked example, then immediately trying a similar one, is one of the best-evidenced ways to learn maths procedures (worked example effect; Sweller).',
      how: ['Open a topic\'s Worked examples, predict each step before revealing it.', 'Do the "Your turn" question straight away.', 'Then use Unlimited practice until you get 5 in a row right.'],
    },
    {
      title: 'Interleave topics - mixed sets beat blocks',
      why: 'In the exam, questions are mixed. Practising mixed sets trains you to recognise WHICH method a question needs (Rohrer & Taylor).',
      how: ['Once you know several topics, use "Mixed review" instead of single-topic quizzes.', 'Ask yourself first: "What topic is this?"'],
    },
    {
      title: 'Keep a mistakes log',
      why: 'Most lost marks in maths are repeated errors (signs, units, misreading).',
      how: ['Use the Fix-it list - it automatically keeps the questions you got wrong.', 'For each mistake, write WHY in My notes (e.g. "forgot to square the radius").'],
    },
    {
      title: 'Practise non-calculator fluency daily',
      why: 'One third of the marks are on Paper 1. Fast, accurate arithmetic frees working memory for problem-solving.',
      how: ['5 minutes a day of fractions, percentages and negatives (Unlimited practice).', 'Learn times tables to 12 × 12 and squares to 15², cubes to 5³.'],
    },
    {
      title: 'Past papers in the final term',
      why: 'Timed papers build stamina and exam technique (choosing which questions to do first).',
      how: ['From Easter of Year 11, do one timed paper a week from your board\'s website and mark it with the mark scheme.', 'Add every lost-mark topic to your plan.'],
    },
  ],
  stuck: [
    { problem: "I don't know where to start", fixes: ['Write down what you know (label diagrams, list the numbers with units).', 'Ask: what is the question asking for? What formula links what I have to what I want?', 'Try a simpler version with easy numbers to see the method.', 'Look at the marks: 1 mark = one step; 5 marks = several steps.'] },
    { problem: 'I keep getting the wrong answer', fixes: ['Check signs (−) and BIDMAS.', 'Check units (cm vs m, minutes vs hours).', 'Estimate first - is your answer sensible?', 'Substitute your answer back in to check (especially for equations).'] },
    { problem: "I don't understand a word problem", fixes: ['Underline the numbers and the key words (each, total, per, of, more than).', 'Draw a quick diagram or bar model.', 'Turn it into a calculation sentence: "I need ___ so I will ___".'] },
    { problem: 'Algebra makes no sense', fixes: ['A letter is just a number you don\'t know yet - try replacing it with a number.', 'Whatever you do to one side of an equation, do to the other.', 'Revisit: Expanding and factorising, then Solving equations.'] },
    { problem: 'I panic in the exam', fixes: ['Skip and come back - questions are roughly in order of difficulty.', 'Always write SOMETHING: method marks are available.', 'Use the formula sheet - but know what is NOT on it.'] },
  ],
  units: [numberUnit, algebraUnit, ratioUnit, geometryUnit, probStatsUnit],
};

export default subject;
