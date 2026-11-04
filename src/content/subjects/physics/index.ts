import type { Subject } from '../../types';
import { physPaper1 } from './paper1';
import { physPaper2 } from './paper2';
import { SCIENCE_COMMAND_WORDS, SCIENCE_STRATEGIES, SCIENCE_STUCK } from '../science-shared';

const subject: Subject = {
  id: 'physics',
  name: 'Physics',
  short: 'Physics',
  icon: 'Ph',
  color: '#3B5BA9',
  qualification: 'AQA GCSE Physics (8463) - triple science',
  boardNote: 'Mapped to **AQA 8463** (separate Physics). Topics marked **Physics only** are not in Combined Science.',
  examNews: [
    '**2027**: the full **Physics Equations Sheet** - including the equations you would normally have to recall - is provided with both papers (same as 2026).',
    '**2028 onwards**: Ofqual confirmed the equation sheet continues, BUT exam boards must not set questions that can be answered just by copying from it - so standard "write down the equation that links..." questions will change. Know what each symbol means, its unit, and how to rearrange.',
    'Two papers, each **1 hour 45 minutes, 100 marks, 50%**. About **30%** of marks need maths.',
    'Required practical questions are worth at least 15% of marks.',
  ],
  papers: [
    { name: 'Paper 1', time: '1 hour 45 minutes', marks: 100, weight: '50%', content: 'Energy; Electricity; Particle model of matter; Atomic structure.' },
    { name: 'Paper 2', time: '1 hour 45 minutes', marks: 100, weight: '50%', content: 'Forces; Waves; Magnetism and electromagnetism; Space physics.' },
  ],
  commandWords: SCIENCE_COMMAND_WORDS,
  tools: ['reference', 'practicals'],
  strategies: [
    ...SCIENCE_STRATEGIES,
    { title: 'The 5-line method for every calculation', why: 'Physics calculations have method marks - a clear layout gets them even if you slip.', how: ['1) Equation  2) Values with units (convert first!)  3) Substitute  4) Rearrange  5) Answer + unit (+ sig figs).', 'Practise with Unlimited calculation practice until it\'s automatic.'] },
  ],
  stuck: SCIENCE_STUCK,
  units: [...physPaper1, ...physPaper2],
};

export default subject;
