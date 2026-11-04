import type { Subject } from '../../types';
import { chemPaper1 } from './paper1';
import { chemPaper2 } from './paper2';
import { SCIENCE_COMMAND_WORDS, SCIENCE_STRATEGIES, SCIENCE_STUCK } from '../science-shared';

const subject: Subject = {
  id: 'chemistry',
  name: 'Chemistry',
  short: 'Chemistry',
  icon: '⚗️',
  color: '#ea580c',
  qualification: 'AQA GCSE Chemistry (8462) - triple science',
  boardNote: 'Mapped to **AQA 8462** (separate Chemistry). Topics marked **Chemistry only** are not in Combined Science. You are given a **periodic table** in the exam - but not the reactivity series, tests or formulas.',
  examNews: [
    'You will sit the current AQA 8462 specification in 2027 and 2028.',
    'Two papers, each **1 hour 45 minutes, 100 marks, 50%**. Foundation or Higher.',
    'Around **20%** of marks require maths skills (moles, Rf, rates, percentage yield).',
    'Required practical questions are worth at least 15% of marks.',
    'From summer 2027 AQA uses a consistent tick-box format for multiple-choice questions.',
  ],
  papers: [
    { name: 'Paper 1', time: '1 hour 45 minutes', marks: 100, weight: '50%', content: 'Atomic structure and the periodic table; Bonding, structure and properties; Quantitative chemistry; Chemical changes; Energy changes.' },
    { name: 'Paper 2', time: '1 hour 45 minutes', marks: 100, weight: '50%', content: 'Rates and equilibrium; Organic chemistry; Chemical analysis; Chemistry of the atmosphere; Using resources. (Draws on Paper 1 knowledge too.)' },
  ],
  commandWords: SCIENCE_COMMAND_WORDS,
  tools: ['reference', 'practicals'],
  strategies: [
    ...SCIENCE_STRATEGIES,
    { title: 'Learn the tests and colours as a set', why: 'Chemical tests are easy marks if memorised exactly (e.g. "cloudy" not "bubbles").', how: ['Use the flashcards for gas tests, flame tests and precipitate colours daily for a week.', 'Make a one-page table and blurt it from memory.'] },
  ],
  stuck: SCIENCE_STUCK,
  units: [...chemPaper1, ...chemPaper2],
};

export default subject;
