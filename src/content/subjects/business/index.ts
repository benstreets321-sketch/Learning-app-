import type { Subject } from '../../types';
import { gcseUnits } from './gcse';
import { enterpriseUnits } from './enterprise';

const subject: Subject = {
  id: 'business',
  name: 'Business / Enterprise',
  short: 'Business',
  icon: 'Bu',
  color: '#8A6A1F',
  qualification: 'GCSE Business (AQA 8132 / Edexcel 1BS0) · BTEC Tech Award in Enterprise',
  boardNote: 'Choose **GCSE Business**, **BTEC Enterprise** or **both** in Settings. GCSE content is board-neutral (AQA and Edexcel cover the same ideas: enterprise, operations, people, marketing and finance). The finance calculations are shared.',
  examNews: [
    'GCSE Business: **2 papers, 1 hour 45 minutes each, 90 marks each, 50% each** (AQA and Edexcel). Mix of multiple choice, short answer, calculations and extended case-study questions.',
    'You need a calculator. Formulas are **not** given - learn them (see Toolkit → Reference sheet).',
    'AQA papers from summer 2027 use a consistent tick-box format for multiple-choice questions.',
    'BTEC Tech Award in Enterprise: Components 1 and 2 are internally assessed; **Component 3 (Promotion and finance for enterprise) is an external exam**.',
  ],
  optionGroups: [
    {
      id: 'business-course', label: 'Which course do you take?',
      choices: [{ value: 'gcse', label: 'GCSE Business' }, { value: 'btec', label: 'BTEC Tech Award in Enterprise' }, { value: 'both', label: 'Both / not sure' }],
    },
  ],
  papers: [
    { name: 'GCSE Paper 1', time: '1 hour 45 minutes', marks: 90, weight: '50%', content: 'AQA: Influences of operations and HRM on business activity. Edexcel: Theme 1 Investigating small business. Includes business in the real world and influences on business.' },
    { name: 'GCSE Paper 2', time: '1 hour 45 minutes', marks: 90, weight: '50%', content: 'AQA: Influences of marketing and finance on business activity. Edexcel: Theme 2 Building a business.' },
    { name: 'BTEC Enterprise Component 3 (exam)', time: 'See your teacher (external exam)', marks: 'Externally set', weight: '40% of the Tech Award', content: 'Promotion and finance for enterprise: promotional mix, targeting, financial documents, payment methods, profit, break-even, cash flow, statements, ratios and sources of finance.' },
  ],
  commandWords: [
    { word: 'State / Identify / Give', meaning: 'Short answer, 1 mark - no explanation needed.' },
    { word: 'Define', meaning: 'Give the meaning of a business term.' },
    { word: 'Calculate', meaning: 'Use a formula; show working; include units.' },
    { word: 'Explain', meaning: 'A point + a developed consequence ("which means that..."), linked to the business.' },
    { word: 'Analyse', meaning: 'Develop chains of reasoning applied to the case study.' },
    { word: 'Evaluate / Justify / Recommend', meaning: 'Weigh up both sides and reach a supported judgement ("it depends on...").' },
    { word: 'Discuss', meaning: 'Explore the issue from different angles.' },
  ],
  tools: ['reference'],
  strategies: [
    { title: 'Learn formulas, then drill calculations', why: 'Calculations are reliable marks and appear every year.', how: ['Learn formulas with the flashcards and Reference sheet.', 'Use Unlimited calculation practice for break-even, cash flow, margins, ARR and interest.'] },
    { title: 'Always use the case study', why: 'Application (AO2) is a third of the marks - generic answers are capped.', how: ['Highlight names, products, numbers and problems in the case study.', 'Mention the business by name in every paragraph.'] },
    { title: 'Practise building chains of reasoning', why: 'Analysis marks need developed, linked consequences.', how: ['Use connectives: "which means", "leading to", "as a result", "therefore".', 'Aim for at least 3 links per point in 6+ mark questions.'] },
    { title: 'Follow the news', why: 'Real examples (interest rates, inflation, retailers closing) make evaluation sharper and help you understand concepts.', how: ['Read one business story a week and link it to a topic.'] },
  ],
  stuck: [
    { problem: "I don't know which formula to use", fixes: ['Identify what you\'re finding (profit? break-even? margin?).', 'Check the Reference sheet in the Toolkit.', 'Write the formula in words before substituting numbers.'] },
    { problem: 'My long answers are too generic', fixes: ['Every paragraph: point → apply to the business → consequence → consequence.', 'Use figures from the case study.', 'End with "Overall... because... however it depends on..."'] },
    { problem: 'I mix up cash and profit', fixes: ['Profit = revenue − costs over a period. Cash = money actually in the bank right now.', 'A firm selling on credit can be profitable but short of cash.'] },
  ],
  units: [...gcseUnits, ...enterpriseUnits],
};

export default subject;
