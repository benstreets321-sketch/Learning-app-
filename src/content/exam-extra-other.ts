// Extra exam-style questions for Business/Enterprise, Statistics, Creative iMedia, History and English Language,
// with mark schemes written in the style of the exam boards (points-based or levels-based).
import type { ExamQuestion } from './types';
import { examQ } from './dsl';
import { P1_SOURCE } from './subjects/english-language/units';

const EXPLAIN3 = (point: string, app: string, chain: string) => [
  `Knowledge: ${point} (1)`,
  `Application/development: ${app} (1)`,
  `Analysis: ${chain} (1)`,
];

export const EXAM_OTHER: Record<string, ExamQuestion[]> = {
  // ================= BUSINESS (Edexcel 1BS0 style) =================
  'bus-enterprise': [
    examQ('Explain one risk an entrepreneur takes when starting a new business.', 3, EXPLAIN3(
      'identifies a risk, e.g. financial loss / business failure / loss of security',
      'develops it, e.g. they may invest their own savings which could be lost if the business fails',
      'explains a consequence, e.g. so they could be left in debt or without a regular income',
    ), { meta: 'Edexcel Paper 1 · Explain (3 marks)', guidance: ['3-mark "explain" = a point, then "this means that…", then "which leads to…".'] }),
  ],
  'bus-stakeholders': [
    examQ('Northfield Bakery plans to open a larger factory on the edge of a village.\n\nAnalyse the impact of this decision on local residents.', 6, [
      'Level 3 (5-6 marks): Accurate knowledge of stakeholders, applied well to Northfield Bakery and the village, with developed chains of reasoning showing both benefits and drawbacks for residents.',
      'Level 2 (3-4 marks): Some knowledge applied to the context, with some chains of reasoning, possibly one-sided.',
      'Level 1 (1-2 marks): Limited knowledge, little application, generic or listed points.',
      'Indicative content: more local jobs and income, which may be spent in other village businesses; more traffic, noise and lorries, reducing quality of life; possible pollution or smells; pressure on roads and parking; may change the character of the village; residents could object to planning permission.',
    ], { meta: 'Edexcel Paper 1 · Analyse (6 marks)' }),
  ],
  'bus-growth': [
    examQ('FitBox runs 8 gyms in the north of England. It wants to grow.\n\nOption 1: open 4 new gyms itself (organic growth).\nOption 2: take over a rival chain of 10 gyms (external growth).\n\nJustify which one of these options FitBox should choose.', 9, [
      'Level 3 (7-9 marks): Accurate knowledge of both methods of growth; well applied to FitBox; developed chains of reasoning about both options; a justified decision that weighs up the options (e.g. "it depends on…").',
      'Level 2 (4-6 marks): Some knowledge applied to FitBox, with some chains of reasoning; a decision with some support.',
      'Level 1 (1-3 marks): Limited knowledge, generic, with little or no justification.',
      'Indicative content: Option 1 - lower risk, keeps control and brand consistent, cheaper per site, but slower and may not gain market share quickly. Option 2 - rapid growth, instantly gains customers, staff and locations, removes a competitor, but expensive (may need a loan), possible culture clashes, different standards, risk of diseconomies of scale.',
    ], { meta: 'Edexcel Paper 1 · Justify (9 marks)', guidance: ['Analyse both options before deciding.', 'Finish with a clear decision and the deciding factor.'] }),
  ],
  'bus-competition': [
    examQ('A large supermarket chain opens a store next to Patel\'s, a small independent convenience shop.\n\nAnalyse the impact of this new competition on Patel\'s.', 6, [
      'Level 3 (5-6 marks): Accurate knowledge of competition, applied to Patel\'s, with developed chains of reasoning (e.g. effect on price, sales and profit) and some balance.',
      'Level 2 (3-4 marks): Some application and some chains of reasoning.',
      'Level 1 (1-3 marks): Limited knowledge, generic points.',
      'Indicative content: customers may switch to lower prices and wider range, so sales and revenue fall; Patel\'s may have to cut prices, reducing profit margins; may need to differentiate - longer opening hours, personal service, local or specialist products, delivery; could increase footfall in the area, bringing some new customers.',
    ], { meta: 'Edexcel Paper 1 · Analyse (6 marks)' }),
  ],
  'bus-hr': [
    examQ('Explain one benefit to a business of using on-the-job training.', 3, EXPLAIN3(
      'identifies a benefit, e.g. it is cheaper than off-the-job training',
      'develops it, e.g. staff learn while still working so production continues and no course fees are paid',
      'explains a consequence, e.g. so costs are kept low and profit is higher / staff learn the business\'s own methods',
    ), { meta: 'Edexcel Paper 2 · Explain (3 marks)' }),
  ],
  'bus-research': [
    examQ('Explain one disadvantage of using social media to carry out market research.', 3, EXPLAIN3(
      'identifies a disadvantage, e.g. the sample may not be representative',
      'develops it, e.g. responses mainly come from younger, active users or people who already like the brand',
      'explains a consequence, e.g. so the results could be biased and lead to poor decisions',
    ), { meta: 'Edexcel Paper 1 · Explain (3 marks)' }),
  ],
  'bus-sources': [
    examQ('Mia wants £20 000 to open a mobile coffee van.\n\nOption 1: a bank loan.\nOption 2: crowdfunding.\n\nJustify which one of these options Mia should choose.', 9, [
      'Level 3 (7-9 marks): Accurate knowledge of both sources; well applied to Mia\'s coffee van; developed chains of reasoning on both; a justified decision weighing up the options.',
      'Level 2 (4-6 marks): Some knowledge and application with some chains of reasoning; decision partly supported.',
      'Level 1 (1-3 marks): Limited knowledge; generic; little justification.',
      'Indicative content: bank loan - money received quickly and Mia keeps ownership, but interest must be paid, repayments affect cash flow, may need security and a business plan; crowdfunding - no interest/repayments if reward-based, gives publicity and tests demand, but may not reach the target, takes time, rewards cost money, idea can be copied.',
    ], { meta: 'Edexcel Paper 1 · Justify (9 marks)' }),
  ],
  'bus-costs': [
    examQ('A business sells phone cases for £12 each. The variable cost of each case is £7. Fixed costs are £15 000 per year.\n\n(a) Calculate the break-even level of output.\n\n(b) Calculate the profit if 4 000 cases are sold.', 4, [
      'Contribution per unit = 12 − 7 = £5 (1)',
      'Break-even = 15 000 ÷ 5 = 3 000 cases (1)',
      'Total revenue 48 000 − total costs (15 000 + 28 000 = 43 000) (1)',
      'Profit = £5 000 (1)',
    ], { meta: 'Edexcel Paper 1 · Calculate' }),
  ],
  'bus-cash': [
    examQ('In March a business has an opening balance of £2 500. Cash inflows are £8 000 and cash outflows are £9 200.\n\nCalculate (a) the net cash flow and (b) the closing balance for March.', 2, [
      'Net cash flow = 8 000 − 9 200 = −£1 200 (1)',
      'Closing balance = 2 500 − 1 200 = £1 300 (1)',
    ], { meta: 'Edexcel Paper 1 · Calculate' }),
  ],
  'bus-performance': [
    examQ('A business had revenue of £80 000, cost of sales of £32 000 and a net profit of £12 000.\n\nCalculate (a) the gross profit margin and (b) the net profit margin.', 4, [
      'Gross profit = 80 000 − 32 000 = £48 000 (1)',
      'Gross profit margin = 48 000 ÷ 80 000 × 100 = 60% (1)',
      'Net profit margin = 12 000 ÷ 80 000 × 100 (1)',
      '= 15% (1)',
    ], { meta: 'Edexcel Paper 2 · Calculate' }),
  ],
  'bus-technique': [
    examQ('Northfield Bikes makes bicycles in the UK. It is considering moving production to a factory overseas where wages are 40% lower.\n\nEvaluate whether Northfield Bikes should move production overseas. You should use the information provided as well as your knowledge of business.', 12, [
      'Level 4 (10-12 marks): Accurate, detailed knowledge; well-developed chains of reasoning; a balanced assessment of both sides applied to Northfield Bikes; a fully justified conclusion that says what it depends on.',
      'Level 3 (7-9 marks): Accurate knowledge; developed reasoning on both sides with good application; a conclusion with some justification.',
      'Level 2 (4-6 marks): Some knowledge and application; some reasoning, possibly one-sided; a weak conclusion.',
      'Level 1 (1-3 marks): Limited knowledge; generic points; no real conclusion.',
      'Indicative content: lower wage costs reduce cost per unit, allowing lower prices or higher profit margins; but transport costs, delivery times and exchange-rate risk rise; quality control and communication are harder; "Made in Britain" image and ethical reputation could suffer; redundancy costs and impact on UK staff; depends on the size of the saving versus extra costs and how customers react.',
    ], { meta: 'Edexcel Paper 2 · Evaluate (12 marks)', guidance: ['Two developed arguments each side, then a conclusion with a "depends on".'] }),
  ],
  'ent-types': [
    examQ('Explain two characteristics an entrepreneur needs when starting a micro-enterprise.', 4, [
      'Identifies a characteristic, e.g. determination/resilience (1)',
      'Explains it, e.g. needed to keep going when sales are slow or setbacks happen (1)',
      'Identifies a second characteristic, e.g. creativity/risk-taking/communication (1)',
      'Explains it, e.g. creativity helps develop a product that stands out from competitors (1)',
    ], { meta: 'BTEC Enterprise Component 3 style' }),
  ],
  'ent-market': [
    examQ('Assess the usefulness of a SWOT analysis for a new mobile dog-grooming business.', 6, [
      'Level 3 (5-6 marks): Clear understanding of SWOT; applied to the dog-grooming business; balanced assessment of benefits and limitations; supported judgement.',
      'Level 2 (3-4 marks): Some understanding with some application; limited balance.',
      'Level 1 (1-2 marks): Basic or generic points.',
      'Indicative content: helps identify strengths (e.g. convenience) and weaknesses (e.g. limited capacity); spots opportunities (busy dog owners) and threats (competitors, cost of fuel); helps plan strategy; but it is a snapshot, can be subjective, does not rank factors, and needs research to be accurate.',
    ], { meta: 'BTEC Enterprise Component 3 style' }),
  ],
  'ent-promotion': [
    examQ('Justify one method of promotion that a new mobile dog-grooming business should use.', 6, [
      'Level 3 (5-6 marks): A suitable method chosen and fully justified with reference to the target market, cost and reach; considers at least one drawback.',
      'Level 2 (3-4 marks): A suitable method with some justification linked to the business.',
      'Level 1 (1-2 marks): A method identified with little or generic justification.',
      'Indicative content: social media (local groups, before/after photos) - cheap, targeted at local dog owners, shareable, but needs time and regular posting; leaflets at vets/pet shops - very targeted locally but low response rate; sales promotion (first groom half price) - encourages trial but reduces revenue.',
    ], { meta: 'BTEC Enterprise Component 3 style' }),
  ],
  'ent-documents': [
    examQ('Explain the purpose of (a) a purchase order and (b) a credit note.', 4, [
      'Purchase order: sent by the buyer to the supplier to order goods (1)',
      'It states what is ordered, quantities and agreed prices, acting as a record (1)',
      'Credit note: sent by the supplier to the buyer (1)',
      'to reduce the amount owed, e.g. when goods are faulty, returned or overcharged (1)',
    ], { meta: 'BTEC Enterprise Component 3 style' }),
  ],

  // ================= STATISTICS (Edexcel 1ST0 style) =================
  'st-planning': [
    examQ('Leah wants to investigate whether boys spend more time gaming than girls in her school.\n\n(a) Write a suitable hypothesis.\n\n(b) Describe how she could collect the data she needs.\n\n(c) Give one problem she might have with the accuracy of her data.', 4, [
      'Hypothesis that is testable, e.g. "Boys in my school spend more time gaming per week than girls" (1)',
      'Collect primary data with a questionnaire about time spent gaming (1)',
      'Use a suitable sample, e.g. a stratified sample by gender (or year group) of a stated size (1)',
      'Problem, e.g. students may not remember accurately / may exaggerate or under-report (1)',
    ], { meta: 'Edexcel GCSE Statistics style' }),
  ],
  'st-sampling': [
    examQ('A school has 1000 students: Year 7 220, Year 8 200, Year 9 180, Year 10 200 and Year 11 200.\n\nA stratified sample of 50 students is taken by year group.\n\n(a) How many Year 9 students should be in the sample?\n\n(b) Give one advantage of a stratified sample.', 3, [
      '180 ÷ 1000 × 50 (1)',
      '= 9 (1)',
      'Advantage: the sample is representative of each year group / reflects the proportions in the population (1)',
    ], { meta: 'Edexcel GCSE Statistics style' }),
  ],
  'st-questionnaires': [
    examQ('This question is from a survey:\n\n"Don\'t you agree that the canteen food is too expensive?"   Yes ☐   No ☐\n\n(a) Give two criticisms of this question.\n\n(b) Write an improved question with response boxes.', 4, [
      'Criticism 1: it is a leading question / biased (1)',
      'Criticism 2: no option for "don\'t know" or a range of opinions / no time frame or definition of "expensive" (1)',
      'Improved question that is not leading, e.g. "How would you rate the price of canteen food?" (1)',
      'Suitable, non-overlapping, exhaustive response boxes, e.g. Very cheap / Cheap / About right / Expensive / Very expensive (1)',
    ], { meta: 'Edexcel GCSE Statistics style' }),
  ],
  'st-diagrams': [
    examQ('A histogram shows journey times.\n\n(a) The class 20 < t ≤ 30 has a frequency of 24. Calculate its frequency density.\n\n(b) The class 30 < t ≤ 50 has a frequency density of 1.5. Calculate its frequency.', 3, [
      'Frequency density = frequency ÷ class width (1)',
      '24 ÷ 10 = 2.4 (1)',
      '1.5 × 20 = 30 (1)',
    ], { meta: 'Edexcel GCSE Statistics · Higher tier' }),
  ],
  'st-averages': [
    examQ('The prices of five houses on a street are:\n\n£180 000   £195 000   £210 000   £205 000   £820 000\n\n(a) Calculate the mean price.\n\n(b) Find the median price.\n\n(c) Which average better represents a typical house price on the street? Give a reason.', 4, [
      'Sum ÷ 5 = 1 610 000 ÷ 5 (1)',
      'Mean = £322 000 (1)',
      'Median = £205 000 (1)',
      'Median, because the mean is distorted by the extreme value (outlier) of £820 000 (1)',
    ], { meta: 'Edexcel GCSE Statistics style' }),
  ],
  'st-correlation': [
    examQ('Two judges rank 6 cakes. For their rankings, Σd² = 12.\n\n(a) Calculate Spearman\'s rank correlation coefficient. (rₛ = 1 − 6Σd² / (n(n² − 1)))\n\n(b) Interpret your answer in context.', 4, [
      '1 − (6 × 12) ÷ (6 × 35) (1)',
      'rₛ = 0.657 (accept 0.66) (1)',
      'Positive correlation (moderate/fairly strong) (1)',
      'The judges broadly agree in their rankings of the cakes (1)',
    ], { meta: 'Edexcel GCSE Statistics · Higher tier' }),
  ],
  'st-timeseries': [
    examQ('Quarterly sales (in £000) are:\n\n2023 Q1 40, Q2 52, Q3 61, Q4 47\n2024 Q1 44, Q2 56, Q3 65, Q4 51\n\n(a) Calculate the first two 4-point moving averages.\n\n(b) Describe the trend.', 3, [
      '(40 + 52 + 61 + 47) ÷ 4 = 50 (1)',
      '(52 + 61 + 47 + 44) ÷ 4 = 51 (1)',
      'The trend is increasing (sales rising slowly over time) (1)',
    ], { meta: 'Edexcel GCSE Statistics style' }),
  ],
  'st-index': [
    examQ('A loaf of bread cost £2.40 in 2020 and £2.76 in 2024.\n\n(a) Calculate the index number for 2024 using 2020 as the base year.\n\n(b) What does this index number tell you?', 3, [
      '2.76 ÷ 2.40 × 100 (1)',
      '= 115 (1)',
      'The price has increased by 15% since 2020 (1)',
    ], { meta: 'Edexcel GCSE Statistics style' }),
  ],
  'st-probability': [
    examQ('Events A and B are independent. P(A) = 0.4 and P(B) = 0.5.\n\n(a) Find P(A and B).\n\n(b) Find P(A or B).', 3, [
      'P(A and B) = 0.4 × 0.5 = 0.2 (1)',
      'P(A or B) = 0.4 + 0.5 − 0.2 (1)',
      '= 0.7 (1)',
    ], { meta: 'Edexcel GCSE Statistics style' }),
  ],
  'st-distributions': [
    examQ('(a) X ~ B(5, 0.3). Calculate P(X = 2).\n\n(b) Test scores have mean 60 and standard deviation 8. Calculate the standardised score for a mark of 72.', 5, [
      '⁵C₂ = 10 (1)',
      '10 × 0.3² × 0.7³ (1)',
      '= 0.3087 (1)',
      '(72 − 60) ÷ 8 (1)',
      '= 1.5 (1)',
    ], { meta: 'Edexcel GCSE Statistics · Higher tier' }),
  ],
  'st-quality': [
    examQ('A machine fills bags with a target mass of 500 g. The warning limits are 495 g and 505 g. The action limits are 492 g and 508 g.\n\nThe next two sample means are 506 g and then 509 g. What should happen after each sample? Give reasons.', 3, [
      '506 g is between the warning and action limits, so take another sample straight away (1)',
      '509 g is above the upper action limit (1)',
      'so stop the machine and reset/adjust it (1)',
    ], { meta: 'Edexcel GCSE Statistics style' }),
  ],

  // ================= CREATIVE iMEDIA (OCR R093 style) =================
  'im-sectors': [
    examQ('Identify two traditional media sectors and one new media sector. For each, give one product it makes.', 3, [
      'Traditional sector with product, e.g. film - feature film; television - soap opera; radio - podcast/show; print publishing - magazine (1)',
      'A second traditional sector with product (1)',
      'New media sector with product, e.g. computer games - mobile game; interactive media - website/app; digital publishing - e-book (1)',
    ], { meta: 'OCR Creative iMedia R093' }),
  ],
  'im-roles': [
    examQ('(a) Describe the role of a director.\n\n(b) Explain why a sound engineer is needed during filming.', 4, [
      'Director: has the creative vision for the product (1)',
      'and directs the actors and crew to achieve it during production (1)',
      'Sound engineer: records and monitors audio quality on set (1)',
      'so that dialogue is clear and background noise is controlled, avoiding costly re-recording later (1)',
    ], { meta: 'OCR Creative iMedia R093' }),
  ],
  'im-purpose': [
    examQ('A client wants a poster to advertise a music festival for 16-21 year olds.\n\nExplain how the style and layout of the poster should be designed to suit the target audience.', 4, [
      'Style point, e.g. bold, bright colour scheme / modern fonts that appeal to young people (1)',
      'Justified, e.g. so it stands out on social media or a noticeboard and feels exciting (1)',
      'Layout point, e.g. clear visual hierarchy with the festival name and line-up largest (1)',
      'Justified, e.g. so key information (date, venue, price, QR code to buy tickets) is quick to read (1)',
    ], { meta: 'OCR Creative iMedia R093' }),
  ],
  'im-workplans': [
    examQ('(a) Identify two components of a work plan.\n\n(b) Explain why a work plan should include contingency time.', 4, [
      'Component, e.g. tasks/activities, timescales, milestones, workflow, resources (1)',
      'A second component (1)',
      'Contingency is extra time allowed in case something goes wrong (e.g. illness, equipment failure, bad weather) (1)',
      'so the final deadline can still be met (1)',
    ], { meta: 'OCR Creative iMedia R093' }),
  ],
  'im-ideas': [
    examQ('Compare a mind map and a mood board as documents used to generate ideas for a new product.', 4, [
      'Mind map: a central idea with branches/sub-branches developing ideas (1)',
      'Useful to explore and connect many ideas quickly, mainly in words (1)',
      'Mood board: a collection of images, colours, fonts and textures (1)',
      'Useful to show the look and feel / visual style of the product to a client (1)',
    ], { meta: 'OCR Creative iMedia R093' }),
  ],
  'im-distribution': [
    examQ('A studio is releasing a new game. Discuss the advantages and disadvantages of distributing it online (download) rather than on physical media.', 9, [
      'Level 3 (7-9 marks): Thorough discussion of a range of advantages and disadvantages, well applied to the game, with accurate terminology and a supported conclusion.',
      'Level 2 (4-6 marks): Sound discussion of some advantages and disadvantages with some application.',
      'Level 1 (1-3 marks): Basic points, mostly listed, with little development.',
      'Indicative content: online - instant global access, no manufacturing or shipping costs, easy updates/patches, data on players, but needs internet/storage space, platform fees, piracy risk, crowded store; physical - collectable, can be sold second hand or gifted, no download needed, shop visibility, but production and distribution costs, slower, stock risk.',
    ], { meta: 'OCR Creative iMedia R093 · extended response' }),
  ],

  // ================= HISTORY: Medicine =================
  'ed-med-medieval': [
    examQ('Explain one way in which ideas about the cause of disease in the 1750s-1900 were different from ideas in the medieval period (c1250-c1500).', 4, [
      'Level 2 (3-4 marks): A developed explanation of a valid difference, supported by accurate and relevant knowledge from both periods.',
      'Level 1 (1-2 marks): A simple or general statement of difference with limited supporting knowledge.',
      'Indicative content: medieval ideas based on the Four Humours, miasma and God/astrology, whereas by the later 19th century germ theory (Pasteur 1861, Koch identifying specific bacteria) showed that specific microbes cause specific diseases.',
    ], { meta: 'Edexcel Paper 1 · Explain one way (4 marks)' }),
  ],
  'ed-med-renaissance': [
    examQ('Explain why there was little change in the treatment of disease during the Renaissance period (c1500-c1700).\n\nYou may use: the work of Thomas Sydenham; the Royal Society.\nYou must also use information of your own.', 12, [
      'Level 4 (10-12 marks): An analytical explanation directed consistently at the question, with accurate and detailed knowledge, including at least one point beyond the stimulus. Clear line of reasoning.',
      'Level 3 (7-9 marks): An explanation showing some analysis, mainly directed at the question, with accurate and relevant knowledge.',
      'Level 2 (4-6 marks): A simple or generalised explanation with some accurate knowledge.',
      'Level 1 (1-3 marks): A simple answer with limited knowledge.',
      'Indicative content: new ideas (Vesalius, Harvey) changed understanding of anatomy but not treatment; Sydenham observed symptoms but cause still unknown, so treatments stayed humoral (bleeding, purging); Royal Society spread ideas but most doctors were trained conservatively; most people still used apothecaries, wise women and remedies; the Church\'s influence declined but tradition and lack of technology (e.g. microscopes not yet linked to disease) slowed change.',
      'Maximum 8 marks if no information beyond the stimulus points.',
    ], { meta: 'Edexcel Paper 1 · Explain why (12 marks)', time: 16 }),
  ],
  'ed-med-c18-19': [
    examQ('Explain why there was rapid progress in surgery in the second half of the 19th century.\n\nYou may use: anaesthetics; Lister\'s use of carbolic acid.\nYou must also use information of your own.', 12, [
      'Level 4 (10-12 marks): An analytical explanation directed consistently at the question, with accurate and detailed knowledge, including at least one point beyond the stimulus.',
      'Level 3 (7-9 marks): An explanation showing some analysis, with accurate and relevant knowledge.',
      'Level 2 (4-6 marks): A simple or generalised explanation with some accurate knowledge.',
      'Level 1 (1-3 marks): A simple answer with limited knowledge.',
      'Indicative content: chloroform (Simpson, 1847) removed pain so surgeons could take longer and attempt deeper operations, though early on this increased infection; Lister (1867) used carbolic acid spray to reduce infection, inspired by Pasteur\'s germ theory; aseptic surgery later (sterilised instruments, gowns, rubber gloves from 1890); the role of individuals, science and communication; resistance from some surgeons slowed progress at first.',
      'Maximum 8 marks if no information beyond the stimulus points.',
    ], { meta: 'Edexcel Paper 1 · Explain why (12 marks)', time: 16 }),
  ],
  'aqa-med-medieval': [
    examQ('Compare the response to the Black Death (1348) with the response to the Great Plague (1665). In what ways were they similar? Explain your answer with reference to both.', 8, [
      'Level 4 (7-8 marks): A complex explanation of similarities, supported by detailed, accurate knowledge of both events, showing understanding of the factors involved.',
      'Level 3 (5-6 marks): A developed explanation of similarity, supported by relevant knowledge of both.',
      'Level 2 (3-4 marks): A simple explanation of similarity with some knowledge.',
      'Level 1 (1-2 marks): Basic answer, identifying a similarity with limited knowledge.',
      'Indicative content: both blamed miasma and God; both used prayer, flagellation/fasting or religious responses; both tried to clean streets or remove bad smells (sweet herbs, fires); both had quarantine-style measures (1665 more organised: houses shut up with red crosses, searchers, plague orders by local government); no understanding of the real cause (fleas on rats) in either.',
    ], { meta: 'AQA Paper 2 · Compare (8 marks)' }),
  ],
  'aqa-med-renaissance': [
    examQ('Explain the significance of Andreas Vesalius for the development of medicine.', 8, [
      'Level 4 (7-8 marks): A complex explanation of significance, both at the time and in the long term, supported by detailed, accurate knowledge.',
      'Level 3 (5-6 marks): A developed explanation of significance with relevant knowledge.',
      'Level 2 (3-4 marks): A simple explanation of significance with some knowledge.',
      'Level 1 (1-2 marks): Basic description of what Vesalius did.',
      'Indicative content: dissected human bodies himself; "On the Fabric of the Human Body" (1543) with accurate illustrations, spread by the printing press; showed Galen made mistakes (e.g. the jawbone, the septum of the heart); encouraged others to question Galen and observe for themselves (Harvey); in the short term little effect on treatment, but long-term significance for anatomy and the scientific method.',
    ], { meta: 'AQA Paper 2 · Significance (8 marks)' }),
  ],
  'aqa-med-c18-19': [
    examQ('Explain the significance of Edward Jenner\'s work on vaccination.', 8, [
      'Level 4 (7-8 marks): A complex explanation of significance, at the time and in the long term, supported by detailed, accurate knowledge.',
      'Level 3 (5-6 marks): A developed explanation of significance with relevant knowledge.',
      'Level 2 (3-4 marks): A simple explanation with some knowledge.',
      'Level 1 (1-2 marks): Basic description of Jenner\'s work.',
      'Indicative content: 1796 experiment using cowpox on James Phipps; published 1798; safer than inoculation; opposition (Royal Society, inoculators, religious objections, fear of using animal material); Jenner could not explain how it worked; government grants and vaccination made free in 1840 and compulsory in 1853; smallpox deaths fell; long-term - Pasteur built on it with new vaccines; smallpox eradicated worldwide by 1980.',
    ], { meta: 'AQA Paper 2 · Significance (8 marks)' }),
  ],
  'aqa-ger-kaiser': [
    examQ('Describe two problems Kaiser Wilhelm II faced in governing Germany before the First World War.', 4, [
      'Level 2 (3-4 marks): Two problems identified and each supported with relevant, specific knowledge.',
      'Level 1 (1-2 marks): One or two problems identified with limited detail.',
      'Indicative content: growth of the Social Democratic Party (SPD) - the largest party in the Reichstag by 1912; industrialisation creating a large working class demanding better conditions; the Reichstag\'s control over the budget; Prussian militarism and the cost of the naval race (Navy Laws) needing taxes; the Zabern Affair (1913).',
    ], { meta: 'AQA Paper 1 · Describe (4 marks)' }),
  ],

  // ================= ENGLISH LANGUAGE =================
  'el-p1q1': [
    examQ(`Read again paragraphs 1 and 2 of the source below.\n\nList **four** things from this part of the text about the sea.\n\n${P1_SOURCE}`, 4, [
      'Any four, 1 mark each: it had been lazy (earlier) (1)',
      'it had been glittering / glittering in the sun (1)',
      'it stretched itself in the sun like a cat (1)',
      'it had changed (as the light thinned) (1)',
      'a wave struck the base of the rocks (1)',
      'the wave sounded like a door slamming (1)',
      'it sent up cold spray / spray leapt up (1)',
      'Max 4 marks. Do not credit points from outside paragraphs 1 and 2.',
    ], { meta: 'AQA Paper 1 Question 1 (4 marks)', time: 5, guidance: ['Only use paragraphs 1 and 2.', 'Short quotations or paraphrases both earn the mark.'] }),
  ],
};
