import type { Subject } from '../../types';
import { bioPaper1 } from './paper1';
import { bioPaper2 } from './paper2';
import { SCIENCE_COMMAND_WORDS, SCIENCE_STRATEGIES, SCIENCE_STUCK } from '../science-shared';

const subject: Subject = {
  id: 'biology',
  name: 'Biology',
  short: 'Biology',
  icon: 'Bi',
  color: '#2E7D4F',
  qualification: 'AQA GCSE Biology (8461) - triple science',
  boardNote: 'Mapped to **AQA 8461** (separate Biology). Topics marked **Biology only** are not in Combined Science. Edexcel and OCR cover very similar content, but required practicals differ.',
  examNews: [
    'You will sit the current AQA 8461 specification in 2027 and 2028.',
    'Two papers, each **1 hour 45 minutes, 100 marks, 50%**. Foundation (grades 1-5) or Higher (4-9).',
    'Questions on the **required practicals** are worth at least 15% of the marks.',
    'Biology has no equation sheet - learn magnification = image ÷ real.',
    'From summer 2027 AQA uses a consistent **tick-box** format for all multiple-choice questions.',
  ],
  papers: [
    { name: 'Paper 1', time: '1 hour 45 minutes', marks: 100, weight: '50%', content: 'Cell biology; Organisation; Infection and response; Bioenergetics.' },
    { name: 'Paper 2', time: '1 hour 45 minutes', marks: 100, weight: '50%', content: 'Homeostasis and response; Inheritance, variation and evolution; Ecology.' },
  ],
  commandWords: SCIENCE_COMMAND_WORDS,
  tools: ['practicals'],
  strategies: [
    ...SCIENCE_STRATEGIES,
    { title: 'Learn processes as sequences', why: 'Many biology marks are for describing processes in the correct order (reflex arc, natural selection, cell cycle, vaccination).', how: ['Use the ordering questions - they are built for this.', 'Draw flow charts from memory, then check.'] },
  ],
  stuck: SCIENCE_STUCK,
  units: [...bioPaper1, ...bioPaper2],
};

export default subject;
