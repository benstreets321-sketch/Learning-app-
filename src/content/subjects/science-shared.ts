import type { Strategy, StuckTip } from '../types';

export const SCIENCE_COMMAND_WORDS = [
  { word: 'State / Give / Name', meaning: 'A short answer - a fact, a word or a phrase. No explanation needed.' },
  { word: 'Describe', meaning: 'Say what happens or what something is like (e.g. the trend in a graph, with data). No "why" needed.' },
  { word: 'Explain', meaning: 'Give the REASONS why something happens - use "because" and link cause to effect using science ideas.' },
  { word: 'Compare', meaning: 'Give similarities AND/OR differences - use comparative words (both, whereas, higher than).' },
  { word: 'Evaluate', meaning: 'Give advantages AND disadvantages (or evidence for and against), then a justified conclusion.' },
  { word: 'Suggest', meaning: 'Apply your knowledge to an unfamiliar situation - there may be more than one right answer.' },
  { word: 'Calculate', meaning: 'Use numbers to find an answer. Show working, include units, round sensibly.' },
  { word: 'Determine', meaning: 'Use the data/graph given to work out an answer.' },
  { word: 'Plan / Design', meaning: 'Write a method: equipment, independent/dependent/control variables, steps, repeats, safety.' },
  { word: 'Justify', meaning: 'Use evidence from the information given to support your answer.' },
];

export const SCIENCE_STRATEGIES: Strategy[] = [
  {
    title: 'Retrieval practice with flashcards and quizzes',
    why: 'Science GCSEs test a huge amount of factual recall. Testing yourself is far more effective than re-reading notes (Roediger & Karpicke, 2006).',
    how: ['Review due flashcards daily - definitions and equations.', 'After each lesson, do a quick quiz on that topic the same day.', 'Re-test topics after 1 week and 1 month (the Planner does this).'],
  },
  {
    title: 'Master the required practicals',
    why: 'At least 15% of the marks are about practical skills - and questions on the required practicals come up every year.',
    how: ['For each practical learn: aim, method, independent/dependent/control variables, risks, and how to improve accuracy.', 'Practise the "Plan an investigation" 6-mark question.', 'Use the Required practicals list in the Toolkit.'],
  },
  {
    title: 'Practise 6-mark extended responses with mark schemes',
    why: 'Long answers are marked on levels of logical, linked explanation - this is a skill that improves with deliberate practice.',
    how: ['Plan with bullet points in the right ORDER first.', 'Use key scientific words; link each point with "so" or "which means".', 'Self-mark against the indicative content in Exam questions.'],
  },
  {
    title: 'Equations: learn, rearrange, practise',
    why: 'Maths-based questions make up a large share of marks (around 10% in Biology, 20% in Chemistry and 30% in Physics).',
    how: ['Use the Unlimited calculation practice until you are fast and accurate.', 'Write the equation, substitute with units, then rearrange.', 'Watch unit conversions (g → kg, cm³ → dm³, minutes → seconds).'],
  },
  {
    title: 'Draw it: dual coding for processes',
    why: 'Combining diagrams with words gives two routes to recall - excellent for cycles, processes and structures.',
    how: ['Sketch and label diagrams from memory (cells, the heart, the eye, circuits, apparatus).', 'Turn processes into flow charts (e.g. how a vaccine works).', 'Check against your notes and redraw what you got wrong.'],
  },
];

export const SCIENCE_STUCK: StuckTip[] = [
  { problem: "I don't know how to start an 'explain' question", fixes: ['Find the key scientific idea the question is about (e.g. osmosis, energy transfer).', 'Write: what happens → because... → so...', 'Use the marks as a guide: 3 marks ≈ 3 linked points.'] },
  { problem: 'I get calculation questions wrong', fixes: ['Write the equation first, then substitute numbers with units.', 'Convert units BEFORE substituting.', 'Check the answer is sensible (a person running at 300 m/s isn\'t!).', 'Use the equation sheet - but learn which equations are NOT on it.'] },
  { problem: "I can't read the graph/table question", fixes: ['Read the axis labels and units first.', 'Describe the trend, then quote data with units.', 'For "explain the trend", link the trend to a scientific reason.'] },
  { problem: 'I mix up similar words', fixes: ['Make flashcards of easily confused pairs (e.g. mitosis vs meiosis; independent vs dependent variable).', 'Use the Glossary in the Toolkit.'] },
  { problem: 'The question is about something I\'ve never seen', fixes: ['Don\'t panic - it\'s testing a principle you DO know, in a new context.', 'Ask: what topic does this link to?', 'Use the information given - it often contains clues.'] },
];
