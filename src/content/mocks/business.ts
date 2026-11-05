// GCSE Business (AQA 8132 structure; Edexcel 1BS0 papers have the same length and marks) and
// BTEC Tech Award in Enterprise Component 3 practice papers. All businesses and case studies were written for this app.
// Every calculation answer below has been worked through; the working is in the mark scheme.
import type { ExamQuestion } from '../types';
import { examQ } from '../dsl';
import { assemble, newPools, type Pools } from './build';
import type { MockPaper, MockSection, MockTest, WrittenQ } from './types';

const w = (n: string, eq: ExamQuestion, topicId: string, lines?: number): WrittenQ => ({ kind: 'written', n, marks: eq.marks, eq, topicId, lines: lines ?? Math.max(4, eq.marks * 2) });

const A6 = (ind: string) => [
  'Level 3 (5-6 marks): detailed, accurate knowledge applied effectively to the business; well-developed analysis with clear chains of reasoning (cause → effect → consequence for the business).',
  'Level 2 (3-4 marks): accurate knowledge applied to the business; some developed analysis.',
  'Level 1 (1-2 marks): limited knowledge; little application; simple or no analysis.',
  `Indicative content: ${ind}`,
];
const A9 = (ind: string) => [
  'Level 3 (7-9 marks): detailed knowledge; well-developed application to the case study; well-developed analysis of both sides; a well-justified judgement that follows from the analysis.',
  'Level 2 (4-6 marks): accurate knowledge applied to the case study; some analysis; a judgement with some justification.',
  'Level 1 (1-3 marks): limited knowledge and application; little analysis; an unsupported judgement.',
  `Indicative content: ${ind}`,
];
const A12 = (ind: string) => [
  'Level 4 (10-12 marks): detailed knowledge and understanding; well-developed application throughout; well-developed analysis of the options using evidence from the case study; a fully justified recommendation that weighs up the most important factors.',
  'Level 3 (7-9 marks): good knowledge applied to the case study; developed analysis; a justified recommendation.',
  'Level 2 (4-6 marks): some knowledge applied to the case study; some analysis; a recommendation with limited support.',
  'Level 1 (1-3 marks): limited knowledge and application; an unsupported recommendation.',
  `Indicative content: ${ind}`,
];
const pts = (lines: string[]) => lines;

interface CaseQ { marks: number; q: string; ms: string[]; topic: string }
interface Case { name: string; text: string; qs: CaseQ[] }

function caseSection(title: string, c: Case, num: string): MockSection {
  return {
    title: `${title}: ${c.name}`,
    intro: 'Read the case study, then answer all the questions in this section.',
    source: c.text,
    questions: c.qs.map((x, i) => w(`${num}.${i + 1}`, examQ(x.q, x.marks, x.ms, { meta: x.marks <= 4 ? 'AO1, AO2' : x.marks === 6 ? 'Analyse · AO2, AO3a' : 'Evaluate · AO2, AO3a, AO3b', time: Math.round(x.marks * 1.2) }), x.topic)),
  };
}

// ---------------- Paper 1: Influences of operations and HRM on business activity ----------------
const P1_CASES: [Case, Case][] = [
  [
    {
      name: 'Brew & Bloom',
      text: `**Brew & Bloom** is a partnership owned by Amira and Josh. It is a café that also sells flowers and plants, in a busy market town. Revenue grew from **£150 000** in 2024 to **£180 000** in 2025. The partners share profits equally.

Amira and Josh want to open a second shop in a nearby city. They would need around £60 000 and three new members of staff. Their bank has suggested that they become a **private limited company** before borrowing. Josh is worried about losing control and about the extra paperwork.

Most of their customers are local families and office workers. A large coffee chain has recently opened a branch on the same street.`,
      qs: [
        { marks: 2, q: 'State **two** features of a partnership.', ms: pts(['Two or more owners (usually up to 20) (1)', 'Unlimited liability for the partners / profits shared as agreed in the deed of partnership / owners share decision-making / not a separate legal entity (1)']), topic: 'bus-ownership' },
        { marks: 2, q: 'Explain **one** reason why a business might choose a location close to its customers.', ms: pts(['Reason, e.g. convenient for customers / more passing trade (1)', 'Developed, e.g. so sales and revenue are higher than in a cheaper, out-of-town site (1)']), topic: 'bus-enterprise' },
        { marks: 3, q: 'Calculate the percentage increase in Brew & Bloom\'s revenue from 2024 to 2025. Show your working.', ms: pts(['Increase = £180 000 − £150 000 = £30 000 (1)', '£30 000 ÷ £150 000 × 100 (1)', '= 20% (1)']), topic: 'bus-growth' },
        { marks: 6, q: 'Analyse the impact on Brew & Bloom of the large coffee chain opening on the same street.', ms: A6('Loss of customers to the chain\'s lower prices and brand recognition → lower revenue; may need to cut prices, reducing profit margins; Brew & Bloom can differentiate - flowers and plants, local, personal service; office workers may switch for speed/loyalty cards; the chain may attract more footfall to the street, benefiting Brew & Bloom.'), topic: 'bus-competition' },
        { marks: 9, q: 'Amira and Josh are deciding whether to become a private limited company. Evaluate whether this is the right decision for Brew & Bloom.', ms: A9('For: limited liability protects the partners\' personal assets if the expansion fails; easier to raise the £60 000 (the bank suggested it; can sell shares to family/friends); more credibility with suppliers. Against: Josh\'s concern - selling shares means sharing control; accounts are published and there is more paperwork and cost; profits taxed as corporation tax. Judgement: likely worth it because of the size of the borrowing and risk, if shares are kept between the two owners.'), topic: 'bus-ownership' },
        { marks: 12, q: 'Brew & Bloom needs three new members of staff for the second shop. Should it recruit internally (promote current staff) or externally? Justify your answer.', ms: A12('Internal: staff already know the products, standards and customers; quicker and cheaper; motivating for promoted staff; but creates vacancies at the first shop and no new ideas. External: wider pool of candidates and fresh ideas; can find experienced staff for a city location; but costly (advertising, interviews), slower and riskier; induction training needed. A balanced recommendation, e.g. promote one experienced employee to manage the new shop and recruit two externally.'), topic: 'bus-hr' },
      ],
    },
    {
      name: 'Fenwick Bikes Ltd',
      text: `**Fenwick Bikes Ltd** makes bicycles in a factory in the Midlands. Each bike is assembled by a team of workers using **batch production**: a batch of one model is made before the line is changed for the next.

| Fenwick Bikes, 2025 | |
|---|---|
| Bikes produced | 12 000 |
| Bikes rejected by quality control | 480 |
| Production workers | 40 |

Fenwick buys frames from a supplier in Taiwan. Deliveries take six weeks, so the factory holds large stocks of frames. The operations manager wants to move to **just-in-time (JIT)** stock control using a UK supplier that charges 15% more per frame but can deliver within two days.

The managing director also wants to introduce **total quality management (TQM)** to reduce the number of faulty bikes.`,
      qs: [
        { marks: 2, q: 'Calculate the percentage of bikes rejected by quality control in 2025. Show your working.', ms: pts(['480 ÷ 12 000 × 100 (1)', '= 4% (1)']), topic: 'bus-ops' },
        { marks: 3, q: 'Calculate the labour productivity of Fenwick\'s production workers in 2025 (output per worker). Show your working.', ms: pts(['Labour productivity = output ÷ number of workers (1)', '12 000 ÷ 40 (1)', '= 300 bikes per worker (1)']), topic: 'bus-ops' },
        { marks: 4, q: 'Explain **two** benefits to Fenwick Bikes of using batch production.', ms: pts(['Benefit, e.g. can make different models to meet different customer needs (1)', 'Developed, e.g. so Fenwick can offer a range of bikes and reach more market segments (1)', 'Benefit, e.g. lower unit costs than job production because each batch uses the same process (1)', 'Developed, e.g. allowing more competitive prices or higher profit margins (1)']), topic: 'bus-ops' },
        { marks: 6, q: 'Analyse **one** advantage and **one** disadvantage to Fenwick Bikes of moving to just-in-time stock control.', ms: A6('Advantage: less money tied up in stocks of frames → better cash flow; less storage space; less risk of stock becoming obsolete. Disadvantage: the UK supplier charges 15% more → higher costs per bike and lower margins or higher prices; relies on reliable two-day deliveries - production stops if late; less able to meet sudden increases in demand.'), topic: 'bus-ops' },
        { marks: 9, q: 'Evaluate whether introducing total quality management (TQM) will reduce the number of faulty bikes.', ms: A9('TQM makes every worker responsible for quality at every stage; teams can check their own work, reducing the 4% rejection rate; fewer faulty bikes saves waste and protects reputation. But it requires training and a culture change - costly and slow; workers may resist; still needs quality checks of supplier frames; benefits depend on staff motivation. Judgement.'), topic: 'bus-ops' },
        { marks: 12, q: 'Fenwick Bikes is considering two options: **Option 1:** switch to the UK supplier and use JIT. **Option 2:** keep the Taiwanese supplier and invest in TQM. Which option should Fenwick choose? Justify your answer.', ms: A12('Option 1: lower stock-holding costs and better cash flow, faster response to demand, lower environmental impact of shipping, but 15% higher frame cost and supply risk. Option 2: lower purchase cost; TQM tackles the 4% faults, improving reputation and reducing waste; but large stocks tie up cash and six-week deliveries make it slow to respond. Recommendation with justification - e.g. depends on how much stock-holding costs, whether rejection is caused by frames or assembly, and the importance of quality to customers.'), topic: 'bus-ops' },
      ],
    },
  ],
  [
    {
      name: 'Tidy Paws',
      text: `Kezia runs **Tidy Paws**, a dog-grooming business, as a **sole trader** from a converted garage at her home. She charges **£45 per groom** and completes an average of **15 grooms per week**. She works 48 weeks a year.

Demand has grown and Kezia now turns away about five customers a week. She is thinking of employing an **apprentice** who would be trained on the job and paid at least the National Minimum Wage for apprentices. Kezia has never employed anyone before and is worried about the extra responsibilities of being an employer.

Kezia's customers book through her social media page. Many leave reviews praising her care for nervous dogs.`,
      qs: [
        { marks: 2, q: 'Explain **one** reason why Kezia may have chosen to be a sole trader.', ms: pts(['Reason, e.g. easy and cheap to set up / she keeps all the profit / she has full control (1)', 'Developed in context, e.g. so she can make all decisions about how she cares for dogs (1)']), topic: 'bus-ownership' },
        { marks: 2, q: 'State **two** legal responsibilities Kezia would have as an employer.', ms: pts(['Any two of: pay at least the National Minimum Wage/apprentice rate (1)', 'provide a safe working environment (health and safety) / not discriminate (Equality Act) / provide a contract of employment / holiday pay (1)']), topic: 'bus-hr' },
        { marks: 3, q: 'Calculate Tidy Paws\' annual revenue. Show your working.', ms: pts(['Revenue = price × quantity (1)', '£45 × 15 × 48 (1)', '= £32 400 (1)']), topic: 'bus-enterprise' },
        { marks: 6, q: 'Analyse how on-the-job training could benefit Tidy Paws.', ms: A6('The apprentice learns Kezia\'s methods with real dogs, including caring for nervous dogs → service quality maintained; cheaper than off-the-job courses; the apprentice is productive while learning, so Kezia can take the five extra bookings a week (about £225 a week more revenue); but training takes Kezia\'s time, reducing her own grooms at first.'), topic: 'bus-hr' },
        { marks: 9, q: 'Evaluate whether Kezia should employ an apprentice.', ms: A9('For: meets unmet demand - five extra grooms a week (£225) could cover wages; builds capacity for growth; low wage at first. Against: legal responsibilities and costs (wages, National Insurance contributions for older apprentices, insurance, holiday pay); risk to reputation if quality falls; limited space in the garage; Kezia\'s time spent training. Judgement.'), topic: 'bus-hr' },
        { marks: 12, q: 'Kezia could either **raise her price** to £55 per groom or **employ an apprentice** to meet the extra demand. Recommend which option she should choose. Justify your answer.', ms: A12('Raise price: demand exceeds supply and reviews show loyal customers, so demand may be price inelastic; £10 more on 15 grooms = £150 extra a week with no extra cost or workload; but may lose some customers to competitors. Apprentice: serves more customers, growth and long-term capacity; but costs, legal duties and risk to quality. Recommendation with justification - e.g. a smaller price rise now, then an apprentice once demand is confirmed.'), topic: 'bus-growth' },
      ],
    },
    {
      name: 'Coastline Hotels plc',
      text: `**Coastline Hotels plc** owns 28 hotels in seaside towns. It has a **tall organisational structure** with seven levels of hierarchy, from the head office directors down to front-desk and housekeeping staff.

Last year an average of **150 staff** worked at its largest hotel, and **30** of them left. Exit interviews showed that many staff felt they had no say in decisions and saw no chance of promotion. Customer reviews have fallen from 4.5 to 3.8 stars, with complaints about slow service.

The directors are considering two changes: **delayering** to a flatter structure, and introducing a **staff bonus scheme** linked to customer review scores.`,
      qs: [
        { marks: 2, q: 'Calculate the staff turnover at Coastline\'s largest hotel last year. (Staff turnover = number of staff leaving ÷ average number of staff × 100)', ms: pts(['30 ÷ 150 × 100 (1)', '= 20% (1)']), topic: 'bus-hr' },
        { marks: 3, q: 'Explain **one** disadvantage to Coastline Hotels of a tall organisational structure.', ms: pts(['Disadvantage, e.g. slow communication / decision-making through many layers (1)', 'Developed, e.g. front-desk staff must wait for approval to solve guests\' problems (1)', 'Consequence in context, e.g. slow service and falling review scores (1)']), topic: 'bus-hr' },
        { marks: 4, q: 'Explain **two** costs to Coastline Hotels of high staff turnover.', ms: pts(['Cost, e.g. recruitment costs - advertising and interviewing replacements (1)', 'Developed, e.g. 30 replacements a year at one hotel adds up to a large cost (1)', 'Cost, e.g. training new staff / lower productivity while they learn (1)', 'Developed, e.g. leading to slower service and poorer reviews (1)']), topic: 'bus-hr' },
        { marks: 6, q: 'Analyse how delayering could improve customer service at Coastline Hotels.', ms: A6('Fewer layers → faster communication and decisions; staff given more authority (empowerment) can solve guests\' problems quickly; more responsibility motivates staff, reducing turnover; saves salary costs of managers; but wider spans of control may overload managers and reduce promotion opportunities further.'), topic: 'bus-hr' },
        { marks: 9, q: 'Evaluate whether a bonus scheme linked to customer review scores would motivate Coastline\'s staff.', ms: A9('Financial incentive gives a clear target linked to service; rewards good performance; could lift reviews from 3.8 stars. But exit interviews show the problem is lack of say and promotion (non-financial factors - Herzberg/Maslow); reviews depend on factors staff cannot control (weather, building condition); team bonus may be unfair; cost. Judgement.'), topic: 'bus-hr' },
        { marks: 12, q: 'Recommend whether Coastline Hotels should introduce **delayering** or the **bonus scheme** to improve customer service. Justify your answer.', ms: A12('Delayering tackles the causes in the exit interviews - no say in decisions, slow service - and cuts costs; but disruption, redundancies and fewer promotion opportunities. Bonus scheme: quick to introduce and directly linked to reviews; but money may not fix lack of involvement, costs rise and may encourage short-term behaviour. Recommendation using evidence: 20% turnover, review fall, exit interview results.'), topic: 'bus-hr' },
      ],
    },
  ],
  [
    {
      name: 'GreenCrate',
      text: `**GreenCrate** is a start-up that delivers weekly boxes of fruit and vegetables from local farms. It was set up in 2023 by two friends who took a big financial risk, using their savings and a £20 000 bank loan.

GreenCrate has **2 400 subscribers** who pay £18 a week. Last year **360** subscribers cancelled. GreenCrate's main aim is **survival**, but the owners also want to reduce food waste and support local farmers.

The Bank of England has recently **raised interest rates**. GreenCrate's loan has a variable interest rate. Some customers have said they are cutting back on spending.`,
      qs: [
        { marks: 2, q: 'State **two** reasons why people start their own business.', ms: pts(['First valid point from: to make a profit / to be their own boss / to follow an interest or passion / to meet a need (gap in the market) / for flexibility (1)', 'Second, different valid point (1)']), topic: 'bus-enterprise' },
        { marks: 2, q: 'Calculate the percentage of GreenCrate\'s subscribers who cancelled last year. Show your working.', ms: pts(['360 ÷ 2 400 × 100 (1)', '= 15% (1)']), topic: 'bus-growth' },
        { marks: 3, q: 'Explain **one** way in which the aims of GreenCrate\'s owners might conflict with the aims of local farmers.', ms: pts(['Farmers want high prices for their produce (1)', 'GreenCrate wants to keep costs low to survive and make a profit (1)', 'So there may be conflict over the prices paid for fruit and vegetables (1)']), topic: 'bus-stakeholders' },
        { marks: 6, q: 'Analyse the likely impact of the rise in interest rates on GreenCrate.', ms: A6('Variable-rate loan → higher repayments → higher costs and lower profit or cash flow problems; customers with mortgages and loans have less disposable income → may cancel weekly boxes seen as a luxury → falling revenue; saving becomes more attractive; but loyal ethical customers may continue.'), topic: 'bus-external' },
        { marks: 9, q: 'Evaluate whether GreenCrate\'s main aim should be survival rather than reducing food waste.', ms: A9('Survival: a young business with a loan and 15% cancellations needs to cover costs first; without survival it cannot achieve ethical aims. Food waste: it is part of the brand and a reason customers subscribe (USP); ethical aims can attract loyal customers and good publicity. Judgement: the aims support each other, but survival must come first in the short term.'), topic: 'bus-enterprise' },
        { marks: 12, q: 'GreenCrate could either **cut its weekly price to £15** or **add a cheaper half-size box** to keep subscribers. Recommend which option it should choose. Justify your answer.', ms: A12('Price cut: may keep price-sensitive customers when incomes are squeezed, but cuts revenue per box by about 17% for all 2 400 subscribers (about £7 200 a week) and may harm the premium, ethical image. Half-size box: keeps customers who would otherwise cancel while full-price customers continue; adds choice; but packing costs and possible switching from full boxes. Recommendation, using the 15% cancellation rate and interest rate rise.'), topic: 'bus-competition' },
      ],
    },
    {
      name: 'Hartley Furniture Ltd',
      text: `**Hartley Furniture Ltd** makes wooden tables and chairs. It currently employs 60 skilled workers and is **labour intensive**. The directors are considering investing in automated cutting and assembly machines.

| | Now | With automation |
|---|---|---|
| Fixed costs per year | £200 000 | £350 000 |
| Variable cost per item | £30 | £20 |
| Output per year (items) | 10 000 | 20 000 |
| Workers needed | 60 | 35 |

The trade union is worried about **redundancies**. Some customers buy from Hartley because its furniture is "hand-finished".`,
      qs: [
        { marks: 2, q: 'Calculate Hartley\'s current average cost per item. Show your working.', ms: pts(['Total costs = £200 000 + (£30 × 10 000) = £500 000 (1)', '£500 000 ÷ 10 000 = £50 per item (1)']), topic: 'bus-ops' },
        { marks: 3, q: 'Calculate Hartley\'s average cost per item with automation. Show your working.', ms: pts(['Total costs = £350 000 + (£20 × 20 000) (1)', '= £750 000 (1)', '£750 000 ÷ 20 000 = £37.50 per item (1)']), topic: 'bus-ops' },
        { marks: 4, q: 'Explain **two** economies of scale Hartley could benefit from if it grows.', ms: pts(['Economy, e.g. purchasing economies - bulk-buying wood at a discount (1)', 'Developed in context (1)', 'Economy, e.g. technical economies - automated machines spread over more output, lowering unit costs (1)', 'Developed, e.g. average cost falls from £50 to £37.50 (1)']), topic: 'bus-growth' },
        { marks: 6, q: 'Analyse the effect of making 25 workers redundant on the remaining staff at Hartley.', ms: A6('Remaining staff may feel insecure and demotivated → lower productivity and higher staff turnover; loss of skills and experience; workers may need retraining to operate machines - could be motivating; union action could disrupt production; communication and consultation reduce the impact.'), topic: 'bus-hr' },
        { marks: 9, q: 'Evaluate whether Hartley should become capital intensive.', ms: A9('For: average cost falls from £50 to £37.50; output doubles to 20 000; consistent quality; can compete on price. Against: fixed costs rise to £350 000 - risky if demand does not double; loss of the "hand-finished" USP and image; redundancies and union conflict; ethical issues; need to sell twice as many items. Judgement.'), topic: 'bus-ops' },
        { marks: 12, q: 'Hartley\'s directors must decide between **automating production** and **staying labour intensive and charging premium prices for hand-finished furniture**. Recommend which option they should choose. Justify your answer.', ms: A12('Automation: lower unit costs, higher output and potential for growth; but £150 000 more fixed costs, needs demand to double, redundancies and possible damage to reputation. Premium hand-finished: protects USP, skilled jobs and brand; higher prices and margins; but lower output, higher unit cost and competition from cheaper manufacturers. Recommendation using the data and stakeholder views (customers, union, owners).'), topic: 'bus-ops' },
      ],
    },
  ],
];

// ---------------- Paper 2: Influences of marketing and finance on business activity ----------------
const P2_CASES: [Case, Case][] = [
  [
    {
      name: 'Spark Juice',
      text: `**Spark Juice** makes sparkling fruit drinks with no added sugar. Last year its sales were **£1.2 million** in a UK market for sugar-free soft drinks worth **£30 million**.

Before launching a new flavour, Spark Juice carried out **primary market research** - an online survey of 500 people and two focus groups. It also used **secondary research** from a market report, which said the market is growing by 8% a year.

Spark Juice's original flavour is now in the **maturity** stage of its product life cycle. The marketing manager wants to use **social media influencers** to promote the new flavour to 16-24 year olds.`,
      qs: [
        { marks: 2, q: 'Calculate Spark Juice\'s market share. Show your working.', ms: pts(['£1.2 million ÷ £30 million × 100 (1)', '= 4% (1)']), topic: 'bus-research' },
        { marks: 2, q: 'State **two** methods of primary market research.', ms: pts(['First valid point from: questionnaires/surveys, focus groups, interviews, observation, test marketing/product trials (1)', 'Second, different valid point (1)']), topic: 'bus-research' },
        { marks: 3, q: 'Explain **one** benefit to Spark Juice of using secondary market research.', ms: pts(['Benefit, e.g. quick and cheap to obtain / shows market size and trends (1)', 'Applied, e.g. the report shows the market is growing by 8% a year (1)', 'Consequence, e.g. gives confidence that a new flavour will have demand (1)']), topic: 'bus-research' },
        { marks: 6, q: 'Analyse how Spark Juice could use extension strategies for its original flavour.', ms: A6('Original flavour is in maturity - sales may soon decline; extension strategies: new packaging/sizes, new target markets (e.g. sports clubs), price promotions, new advertising; these extend the life cycle and maintain revenue; costs and risk of cannibalisation by the new flavour.'), topic: 'bus-mix' },
        { marks: 9, q: 'Evaluate whether using social media influencers is the best way to promote the new flavour.', ms: A9('For: reaches 16-24 year olds who use social media; trusted, relatable endorsements; content can be shared; measurable. Against: costs of popular influencers; risk to reputation if an influencer behaves badly; advertising rules (must label as ads); audience may not match; other methods - sampling, sponsorship, in-store promotions. Judgement.'), topic: 'bus-mix' },
        { marks: 12, q: 'Spark Juice could either **launch the new flavour nationally** straight away or **test it in one region first**. Recommend which option it should choose. Justify your answer.', ms: A12('National: gains first-mover advantage in a growing market (8% a year), economies of scale in production and promotion; but high risk and cost if the flavour fails. Test region: reduces risk and allows changes based on real sales; but slower, competitors may copy, and results may not reflect the whole UK. Recommendation using market share (4%) and the research already done (survey of 500, focus groups).'), topic: 'bus-research' },
      ],
    },
    {
      name: 'Lakeside Café',
      text: `**Lakeside Café** is a private limited company that runs a café beside a lake in a country park. The owners are thinking about opening a second café.

| Lakeside Café, per month | |
|---|---|
| Average spend per customer | £6.50 |
| Variable cost per customer | £2.50 |
| Fixed costs | £12 000 |
| Customers | 4 000 |

The second café would cost **£80 000** to fit out. The owners could use **retained profit** of £30 000 and a **bank loan** for the rest, or sell shares to a new investor. The park owner has announced that rent will rise by £2 000 a month next year.`,
      qs: [
        { marks: 2, q: 'Calculate Lakeside Café\'s monthly profit. Show your working.', ms: pts(['Revenue £6.50 × 4 000 = £26 000; total costs £12 000 + (£2.50 × 4 000) = £22 000 (1)', 'Profit = £26 000 − £22 000 = £4 000 (1)']), topic: 'bus-costs' },
        { marks: 3, q: 'Calculate the number of customers Lakeside Café needs each month to break even. Show your working.', ms: pts(['Contribution per customer = £6.50 − £2.50 = £4 (1)', 'Break-even = £12 000 ÷ £4 (1)', '= 3 000 customers (1)']), topic: 'bus-costs' },
        { marks: 4, q: 'Explain **two** sources of finance Lakeside Café could use for the second café.', ms: pts(['Source, e.g. retained profit (1)', 'Developed, e.g. no interest to pay, but only £30 000 is available (1)', 'Source, e.g. bank loan / share capital (1)', 'Developed, e.g. a loan must be repaid with interest; selling shares means giving up some ownership and control (1)']), topic: 'bus-sources' },
        { marks: 6, q: 'Analyse the effect of the £2 000 monthly rent increase on Lakeside Café\'s break-even point and margin of safety.', ms: A6('Fixed costs rise to £14 000 → break-even = £14 000 ÷ £4 = 3 500 customers (up from 3 000); margin of safety falls from 1 000 to 500 customers; profit falls from £4 000 to £2 000 a month; more risk if customer numbers fall (e.g. bad weather); could raise prices or cut variable costs to compensate.'), topic: 'bus-costs' },
        { marks: 9, q: 'Evaluate whether Lakeside Café should use a bank loan or sell shares to finance the rest of the £80 000.', ms: A9('Bank loan (£50 000): owners keep control; fixed repayments with interest - risky now profit is falling to £2 000 a month after the rent rise. Shares: no repayments or interest; investor may bring expertise; but owners give up some control and share future profits. Judgement using the reduced profit and risk.'), topic: 'bus-sources' },
        { marks: 12, q: 'Recommend whether Lakeside Café should **open the second café** next year or **wait**. Justify your answer.', ms: A12('Open: growth, economies of scale, spreads risk across two sites, uses retained profit; but £80 000 investment at a time when the rent rise halves monthly profit, increases break-even to 3 500 and reduces the margin of safety; loan repayments add to fixed costs. Wait: reduce risk, review prices, rebuild profit; but competitors may take the opportunity. Recommendation with justification using the calculations.'), topic: 'bus-performance' },
      ],
    },
  ],
  [
    {
      name: 'PixelPlay',
      text: `**PixelPlay** designs and sells gaming headsets. Its best-selling headset sells for **£40**, and the cost of making and delivering each one is **£22**.

PixelPlay sells mainly through its own **website**, but a national electronics retailer has offered to stock its headsets in 300 stores if PixelPlay accepts a lower price of £30 per headset from the retailer.

A competitor has just launched a similar headset at £35. PixelPlay is considering a **price-skimming** strategy for its next, more advanced headset.`,
      qs: [
        { marks: 2, q: 'Calculate the gross profit per headset sold through PixelPlay\'s website. Show your working.', ms: pts(['£40 − £22 (1)', '= £18 (1)']), topic: 'bus-performance' },
        { marks: 2, q: 'Calculate the gross profit margin on each headset sold through the website. Show your working.', ms: pts(['£18 ÷ £40 × 100 (1)', '= 45% (1)']), topic: 'bus-performance' },
        { marks: 3, q: 'Explain **one** advantage to PixelPlay of price skimming for its new headset.', ms: pts(['High initial price (1)', 'Gains high profit margins from early adopters/keen gamers who will pay more for new technology (1)', 'Helps recover development costs quickly / creates a premium image (1)']), topic: 'bus-mix' },
        { marks: 6, q: 'Analyse the impact on PixelPlay of the competitor\'s headset launched at £35.', ms: A6('Customers may switch to the cheaper headset → falling sales and revenue; PixelPlay may cut its price, reducing its £18 gross profit per unit; or differentiate (quality, design, brand, gamer reviews) to justify £40; may increase promotion costs.'), topic: 'bus-competition' },
        { marks: 9, q: 'Evaluate whether PixelPlay should accept the retailer\'s offer.', ms: A9('For: 300 stores - much greater distribution and brand awareness; higher sales volume; reach customers who prefer to try in store. Against: gross profit falls from £18 to £8 per headset (£30 − £22); less control over display and price; retailer may demand discounts later; website sales may fall. Judgement - depends on extra volume.'), topic: 'bus-mix' },
        { marks: 12, q: 'Recommend whether PixelPlay should **cut the price of its best-selling headset to £35** or **keep the price at £40 and increase promotion**. Justify your answer.', ms: A12('Price cut: matches the competitor; may protect volume; but gross profit falls to £13 (37% margin) and may start a price war; damages premium image. Keep price + promotion: protects margin; emphasises quality, reviews, influencers; but promotion costs and risk of losing price-sensitive customers. Recommendation using the figures and the market.'), topic: 'bus-mix' },
      ],
    },
    {
      name: 'Oakwood Bakery',
      text: `**Oakwood Bakery** is a family bakery. Its cash-flow forecast for the first three months of next year is below.

| | January | February | March |
|---|---|---|---|
| **Cash inflows** – sales | £8 000 | £7 500 | £9 000 |
| **Cash outflows** – ingredients | £3 000 | £3 000 | £3 500 |
| Wages | £4 000 | £4 000 | £4 000 |
| Rent | £1 500 | £1 500 | £1 500 |
| New oven | – | £2 500 | – |
| **Opening balance** | £2 000 | ? | ? |

Last year Oakwood's revenue was £100 000, its cost of sales was £40 000 and its net profit was £12 000. The bakery's bank has offered an **overdraft** facility.`,
      qs: [
        { marks: 2, q: 'Calculate Oakwood Bakery\'s net cash flow for January. Show your working.', ms: pts(['Outflows = £3 000 + £4 000 + £1 500 = £8 500 (1)', 'Net cash flow = £8 000 − £8 500 = −£500 (1)']), topic: 'bus-cash' },
        { marks: 3, q: 'Calculate Oakwood Bakery\'s closing balance at the end of February. Show your working.', ms: pts(['January closing balance = £2 000 − £500 = £1 500 (opening balance for February) (1)', 'February net cash flow = £7 500 − (£3 000 + £4 000 + £1 500 + £2 500) = −£3 500 (1)', 'Closing balance = £1 500 − £3 500 = −£2 000 (1)']), topic: 'bus-cash' },
        { marks: 4, q: 'Calculate Oakwood Bakery\'s gross profit margin and net profit margin for last year. Show your working.', ms: pts(['Gross profit = £100 000 − £40 000 = £60 000 (1)', 'Gross profit margin = £60 000 ÷ £100 000 × 100 = 60% (1)', 'Net profit margin = £12 000 ÷ £100 000 × 100 (1)', '= 12% (1)']), topic: 'bus-performance' },
        { marks: 6, q: 'Analyse **two** ways Oakwood Bakery could improve its cash flow in February.', ms: A6('Delay buying the oven to a later month → removes £2 500 outflow and avoids a negative balance; negotiate longer credit with ingredient suppliers; lease the oven instead of buying; increase sales with promotions (e.g. Valentine\'s Day); each has drawbacks - old oven may break, suppliers may refuse, promotions cost money.'), topic: 'bus-cash' },
        { marks: 9, q: 'Evaluate whether an overdraft is the best way for Oakwood Bakery to cover its negative cash balance.', ms: A9('Overdraft: flexible, quick, only pay interest on what is used; suitable for a short-term problem - the shortfall is £2 000 in February and March. But high interest rates; the bank can withdraw it; the problem lasts more than one month (March net cash flow is zero, so the balance stays at −£2 000). Alternatives: a short-term loan, owners\' funds, delaying the oven. Judgement.'), topic: 'bus-sources' },
        { marks: 12, q: 'Oakwood Bakery wants to increase its profit. It could either **start a delivery service to local cafés** or **reduce costs by buying cheaper ingredients**. Recommend which option it should choose. Justify your answer.', ms: A12('Delivery service: new revenue stream, uses spare capacity; but needs a van and driver - extra costs and cash outflows when cash flow is already negative. Cheaper ingredients: improves the 60% gross margin and 12% net margin immediately; but risk to quality and reputation - customers may go elsewhere. Recommendation using the cash-flow forecast and profit margins.'), topic: 'bus-performance' },
      ],
    },
  ],
  [
    {
      name: 'Northern Threads',
      text: `**Northern Threads** is a clothing retailer with 45 high-street shops. Its sales fell from **£2.5 million** to **£2.2 million** last year as more customers bought online from competitors.

A newspaper report claimed that one of Northern Threads' overseas suppliers pays very low wages. The company is considering switching to **ethically certified suppliers**, which would increase its costs by 10%.

The marketing director wants to change the **marketing mix** by launching a website with free next-day delivery and closing 10 of the least profitable shops.`,
      qs: [
        { marks: 2, q: 'Calculate the percentage change in Northern Threads\' sales last year. Show your working.', ms: pts(['(£2.2m − £2.5m) ÷ £2.5m × 100 (1)', '= −12% (a 12% fall) (1)']), topic: 'bus-performance' },
        { marks: 2, q: 'State **two** elements of the marketing mix.', ms: pts(['First valid point from: product, price, promotion, place (1)', 'Second, different valid point (1)']), topic: 'bus-mix' },
        { marks: 3, q: 'Explain **one** way in which e-commerce has affected high-street retailers such as Northern Threads.', ms: pts(['Customers can compare prices and buy online at any time (1)', 'Competition from online retailers with lower costs (no shop rents) (1)', 'So high-street sales fall - as at Northern Threads, down 12% (1)']), topic: 'bus-external' },
        { marks: 6, q: 'Analyse how the newspaper report could affect Northern Threads.', ms: A6('Damaged reputation → ethically minded customers boycott or switch → falling sales; social media spreads the story; pressure groups; may need to change suppliers (10% higher costs) or audit suppliers; staff morale; but could respond positively and gain good publicity.'), topic: 'bus-stakeholders' },
        { marks: 9, q: 'Evaluate whether Northern Threads should switch to ethically certified suppliers.', ms: A9('For: protects reputation after the report; attracts ethical consumers; can be used in promotion; reduces risk of future scandals. Against: costs up 10% → lower profit margins or higher prices when sales are already falling 12%; customers may not pay more; competitors may undercut. Judgement.'), topic: 'bus-stakeholders' },
        { marks: 12, q: 'Recommend whether Northern Threads should go ahead with the marketing director\'s plan (website with free next-day delivery and closing 10 shops). Justify your answer.', ms: A12('For: follows customers online; wider reach; closing loss-making shops cuts costs (rent, wages); free next-day delivery competes with online rivals. Against: website and delivery costs; free delivery reduces margins; redundancies; less high-street presence; returns are costly; competitors are established online. Recommendation using the 12% fall in sales and the ethical issue.'), topic: 'bus-mix' },
      ],
    },
    {
      name: 'Pedal Power Gyms',
      text: `**Pedal Power Gyms** runs four gyms. It is considering opening a new **spin studio** at its largest gym, which would cost **£60 000**.

| Year | Expected extra income from the spin studio |
|---|---|
| 1 | £12 000 |
| 2 | £16 000 |
| 3 | £18 000 |
| 4 | £20 000 |
| 5 | £24 000 |

Last year Pedal Power's revenue was **£400 000** and its net profit was **£40 000**. The directors normally only invest if a project's average rate of return (ARR) is at least **8%**.`,
      qs: [
        { marks: 2, q: 'Calculate Pedal Power\'s net profit margin last year. Show your working.', ms: pts(['£40 000 ÷ £400 000 × 100 (1)', '= 10% (1)']), topic: 'bus-performance' },
        { marks: 3, q: 'Calculate the average rate of return (ARR) for the spin studio over five years. Show your working.', ms: pts(['Total income = £90 000; total profit = £90 000 − £60 000 = £30 000 (1)', 'Average annual profit = £30 000 ÷ 5 = £6 000 (1)', 'ARR = £6 000 ÷ £60 000 × 100 = 10% (1)']), topic: 'bus-performance' },
        { marks: 4, q: 'Explain **two** limitations of using ARR to make the investment decision.', ms: pts(['Limitation, e.g. income figures are forecasts and may be wrong (1)', 'Developed, e.g. demand for spin classes may fall if trends change (1)', 'Limitation, e.g. ignores the timing of returns / qualitative factors (1)', 'Developed, e.g. most of the income comes in later years, which is less certain (1)']), topic: 'bus-performance' },
        { marks: 6, q: 'Analyse how Pedal Power could use promotion to attract customers to the spin studio.', ms: A6('Free trial classes for existing members; social media and local influencers; referral discounts; partnerships with local businesses; promotions build awareness and early income in year 1 when income is lowest (£12 000); costs of promotion reduce profit.'), topic: 'bus-mix' },
        { marks: 9, q: 'Evaluate whether Pedal Power should finance the spin studio with a bank loan.', ms: A9('For: £60 000 is a large sum; keeps control; ARR (10%) above typical loan interest rates may cover costs. Against: repayments and interest reduce profit; risk if income falls short; alternatives - retained profit (net profit £40 000 a year), leasing equipment, share capital. Judgement.'), topic: 'bus-sources' },
        { marks: 12, q: 'Recommend whether Pedal Power should invest in the spin studio. Justify your answer.', ms: A12('For: ARR of 10% exceeds the 8% target; income rises each year; increases membership and use of space; diversifies services. Against: forecasts may be optimistic; the trend may fade; competitors; £60 000 is 1.5 times last year\'s net profit, so risk is significant; opportunity cost of other investments. Recommendation using the ARR and profit data.'), topic: 'bus-performance' },
      ],
    },
  ],
];

const P1_TOPICS = ['bus-enterprise', 'bus-ownership', 'bus-stakeholders', 'bus-growth', 'bus-external', 'bus-competition', 'bus-ops', 'bus-hr'];
const P2_TOPICS = ['bus-enterprise', 'bus-stakeholders', 'bus-external', 'bus-competition', 'bus-research', 'bus-mix', 'bus-sources', 'bus-costs', 'bus-cash', 'bus-performance'];

function sectionA(key: string, topics: string[], pools: Pools): MockSection {
  const a = assemble({ key, topics, marks: 20, writtenShare: 0.2, genShare: 0.2, maxWritten: 4, numbering: 'plain', pools, types: ['mcq', 'multi', 'num', 'tf'] });
  a.questions.forEach((q, i) => { q.n = `01.${i + 1}`; });
  return { ...a, title: 'Section A', intro: 'Answer all questions in this section. Multiple-choice questions are worth 1 mark each. You should spend about 20 minutes on this section.' };
}

function gcseTests(paper: 1 | 2): () => MockTest[] {
  let v: MockTest[] | null = null;
  return () => (v ??= (() => {
    const pools = newPools();
    const cases = paper === 1 ? P1_CASES : P2_CASES;
    return ([0, 1, 2] as const).map((t) => ({
      id: `business-p${paper}-t${t + 1}`, paperId: `business-p${paper}`, n: (t + 1) as 1 | 2 | 3, title: `Practice paper ${t + 1}`,
      focus: `Case studies: ${cases[t][0].name} and ${cases[t][1].name}.`,
      sections: [
        sectionA(`business-p${paper}-t${t + 1}-a`, paper === 1 ? P1_TOPICS : P2_TOPICS, pools),
        caseSection('Section B', cases[t][0], '02'),
        caseSection('Section C', cases[t][1], '03'),
      ],
    }));
  })());
}

// ---------------- BTEC Tech Award in Enterprise: Component 3 ----------------
const BTEC: { scenario: string; promo: CaseQ[]; fin: CaseQ[] }[] = [
  {
    scenario: `**Scenario: Hive Candles**\n\nMaya runs **Hive Candles**, making hand-poured soy candles in recycled glass jars. She sells at craft markets and through an online shop. Her target market is people aged 25-45 who care about the environment.\n\n| Hive Candles, one month | |\n|---|---|\n| Selling price per candle | £15 |\n| Variable cost per candle | £6 |\n| Fixed costs (rent of unit, website, insurance) | £1 800 |\n| Candles sold | 300 |`,
    promo: [
      { marks: 2, q: 'Identify **two** methods of sales promotion Hive Candles could use.', ms: pts(['First valid point from: discounts/price reductions, buy one get one free, free samples, loyalty schemes, competitions, free gift with purchase (1)', 'Second, different valid point (1)']), topic: 'ent-promotion' },
      { marks: 4, q: 'Explain **two** ways Hive Candles could target its market segment of people aged 25-45 who care about the environment.', ms: pts(['Way, e.g. social media advertising targeted by age and interests (1)', 'Developed, e.g. so promotion reaches eco-conscious buyers without wasting money (1)', 'Way, e.g. stress recycled jars and soy wax in promotional messages / sell at eco events (1)', 'Developed, e.g. matching the values of the segment builds loyalty (1)']), topic: 'ent-promotion' },
      { marks: 6, q: 'Discuss the benefits and drawbacks to Hive Candles of using social media to promote its products.', ms: A6('Benefits: low cost, reaches the 25-45 target market, visual products suit photos and videos, customers can share and review; two-way communication. Drawbacks: time-consuming, negative comments spread quickly, competition for attention, may need paid ads to reach people.'), topic: 'ent-promotion' },
      { marks: 8, q: 'Maya is deciding whether to advertise in a local magazine or pay for a stall at a large regional eco-fair. Assess which option would be more effective for Hive Candles.', ms: [
        'Level 3 (6-8 marks): balanced assessment of both options, applied to Hive Candles and its target market, leading to a supported conclusion.',
        'Level 2 (3-5 marks): some assessment of one or both options, with some application.',
        'Level 1 (1-2 marks): limited knowledge of the options; little application.',
        'Indicative content: magazine - wider local reach, lasting, but costly, may not reach the target segment, no chance to smell/try the product. Eco-fair - targeted audience, customers can try products and buy immediately, direct feedback; stall fee, time away, one-off event. Conclusion.',
      ], topic: 'ent-promotion' },
    ],
    fin: [
      { marks: 2, q: 'Calculate Hive Candles\' total revenue for the month. Show your working.', ms: pts(['£15 × 300 (1)', '= £4 500 (1)']), topic: 'ent-finance' },
      { marks: 4, q: 'Calculate Hive Candles\' profit for the month. Show your working.', ms: pts(['Total variable costs = £6 × 300 = £1 800 (1)', 'Total costs = £1 800 + £1 800 = £3 600 (1)', 'Profit = £4 500 − £3 600 (1)', '= £900 (1)']), topic: 'ent-finance' },
      { marks: 6, q: 'Calculate the break-even number of candles per month, and explain what the result means for Hive Candles.', ms: pts(['Contribution per candle = £15 − £6 = £9 (1)', 'Break-even = £1 800 ÷ £9 (1)', '= 200 candles (1)', 'Margin of safety = 300 − 200 = 100 candles (1)', 'Explains that Maya must sell 200 candles a month to cover all costs (1)', 'Explains that sales can fall by 100 candles before she makes a loss / this is a reasonable buffer (1)']), topic: 'ent-finance' },
      { marks: 8, q: 'Maya wants to buy a £3 000 wax-melting machine. Assess whether she should use a **bank loan** or **her own savings**.', ms: [
        'Level 3 (6-8 marks): balanced assessment of both sources applied to Hive Candles, leading to a supported conclusion.',
        'Level 2 (3-5 marks): some assessment of one or both sources.',
        'Level 1 (1-2 marks): limited knowledge of the sources.',
        'Indicative content: own savings - no interest or repayments, quick, but personal risk and less money for emergencies; bank loan - keeps savings, spreads cost, but interest and fixed repayments (monthly profit is £900); may need a business plan. Conclusion.',
      ], topic: 'ent-finance' },
    ],
  },
  {
    scenario: `**Scenario: FitFuel Smoothies**\n\nDan and Priya own **FitFuel Smoothies**, a smoothie bar inside a leisure centre. Most customers are gym users and families after swimming lessons. They want to increase sales on weekday mornings, which are quiet.\n\n| FitFuel cash-flow forecast | April | May |\n|---|---|---|\n| Opening balance | £1 200 | ? |\n| Cash inflows (sales) | £5 000 | £5 400 |\n| Cash outflows: stock | £2 000 | £2 200 |\n| Cash outflows: wages | £2 400 | £2 400 |\n| Cash outflows: rent | £900 | £900 |`,
    promo: [
      { marks: 2, q: 'Identify **two** elements of the promotional mix.', ms: pts(['First valid point from: advertising, sales promotion, personal selling, public relations, direct marketing / sponsorship (1)', 'Second, different valid point (1)']), topic: 'ent-promotion' },
      { marks: 4, q: 'Explain **two** reasons why FitFuel should segment its market.', ms: pts(['Reason, e.g. different groups (gym users, families) want different products (1)', 'Developed, e.g. protein smoothies for gym users, smaller cheaper ones for children (1)', 'Reason, e.g. promotion can be targeted more cheaply (1)', 'Developed, e.g. posters in the gym changing rooms for weekday morning users (1)']), topic: 'ent-market' },
      { marks: 6, q: 'Discuss how FitFuel could use sales promotions to increase sales on quiet weekday mornings.', ms: A6('Happy-hour discounts before 11am; loyalty cards (e.g. 10th smoothie free) for regular gym users; bundles with leisure-centre classes; free samples; these increase footfall at quiet times and build habits; but discounts reduce profit per sale and may only shift customers from busier times.'), topic: 'ent-promotion' },
      { marks: 8, q: 'Assess whether FitFuel should use **personal selling** (staff recommending products) or **public relations** (e.g. sponsoring a local fun run) to increase sales.', ms: [
        'Level 3 (6-8 marks): balanced assessment of both methods applied to FitFuel, with a supported conclusion.',
        'Level 2 (3-5 marks): some assessment of one or both methods.',
        'Level 1 (1-2 marks): limited knowledge.',
        'Indicative content: personal selling - staff can upsell (extra protein, larger sizes), builds relationships, low cost but depends on staff skill and training. PR - raises community profile and links to health image, reaches new customers; but cost, indirect effect on sales, hard to measure. Conclusion.',
      ], topic: 'ent-promotion' },
    ],
    fin: [
      { marks: 2, q: 'Calculate FitFuel\'s net cash flow for April. Show your working.', ms: pts(['Outflows = £2 000 + £2 400 + £900 = £5 300 (1)', 'Net cash flow = £5 000 − £5 300 = −£300 (1)']), topic: 'ent-documents' },
      { marks: 4, q: 'Calculate FitFuel\'s closing balance for May. Show your working.', ms: pts(['April closing balance = £1 200 − £300 = £900 (1)', 'May outflows = £2 200 + £2 400 + £900 = £5 500 (1)', 'May net cash flow = £5 400 − £5 500 = −£100 (1)', 'May closing balance = £900 − £100 = £800 (1)']), topic: 'ent-documents' },
      { marks: 6, q: 'Explain **three** ways FitFuel could improve its cash flow.', ms: pts(['Way, e.g. negotiate longer payment terms with stock suppliers (1)', 'Developed (1)', 'Way, e.g. reduce stock waste / order smaller quantities more often (1)', 'Developed (1)', 'Way, e.g. increase sales at quiet times / raise prices (1)', 'Developed (1)']), topic: 'ent-finance' },
      { marks: 8, q: 'Assess the importance of cash-flow forecasting for a small business such as FitFuel.', ms: [
        'Level 3 (6-8 marks): balanced assessment applied to FitFuel, with a supported conclusion.',
        'Level 2 (3-5 marks): some assessment with some application.',
        'Level 1 (1-2 marks): limited knowledge.',
        'Indicative content: identifies negative net cash flow (−£300 in April, −£100 in May) before it happens; plan an overdraft or cut costs in time; needed to get bank loans; helps plan stock purchases. Limits: forecasts are estimates - sales depend on leisure centre visitors and seasons; time to prepare. Conclusion.',
      ], topic: 'ent-documents' },
    ],
  },
  {
    scenario: `**Scenario: Byte Repair**\n\nOllie runs **Byte Repair**, a phone and laptop repair service. He works from a small shop and also offers a collection service for local businesses.\n\n| Byte Repair, last year | |\n|---|---|\n| Sales revenue | £60 000 |\n| Cost of sales (parts) | £21 000 |\n| Expenses (rent, wages, van, advertising) | £27 000 |`,
    promo: [
      { marks: 2, q: 'Identify **two** factors that influence the choice of promotional methods for a small business.', ms: pts(['First valid factor from: cost/budget, target market, the nature of the product, competitors\' promotion, the stage of the product life cycle, size of the business (1)', 'Second, different valid factor (1)']), topic: 'ent-promotion' },
      { marks: 4, q: 'Explain **two** benefits to Byte Repair of having a strong brand.', ms: pts(['Benefit, e.g. customers recognise and trust the business (1)', 'Developed, e.g. important when handing over expensive devices (1)', 'Benefit, e.g. can charge higher prices than unknown competitors (1)', 'Developed, e.g. improving profit margins (1)']), topic: 'ent-promotion' },
      { marks: 6, q: 'Discuss how Byte Repair could use direct marketing to attract more business customers.', ms: A6('Emails or letters to local businesses offering the collection service; targeted offers (e.g. a contract for regular servicing); personal and measurable; but can be seen as junk mail, data protection rules (UK GDPR), needs a contact list.'), topic: 'ent-promotion' },
      { marks: 8, q: 'Assess whether Byte Repair should spend its promotion budget on **online reviews and search advertising** or **leaflets delivered to local homes**.', ms: [
        'Level 3 (6-8 marks): balanced assessment of both options applied to Byte Repair, with a supported conclusion.',
        'Level 2 (3-5 marks): some assessment of one or both options.',
        'Level 1 (1-2 marks): limited knowledge.',
        'Indicative content: search ads and reviews - customers with broken devices search online urgently; pay-per-click is measurable; reviews build trust; but competition for keywords and negative reviews. Leaflets - reach local homes, cheap to print, but often ignored and not there when a device breaks. Conclusion.',
      ], topic: 'ent-promotion' },
    ],
    fin: [
      { marks: 2, q: 'Calculate Byte Repair\'s gross profit for last year. Show your working.', ms: pts(['£60 000 − £21 000 (1)', '= £39 000 (1)']), topic: 'ent-documents' },
      { marks: 4, q: 'Calculate Byte Repair\'s net profit and net profit margin for last year. Show your working.', ms: pts(['Net profit = £39 000 − £27 000 (1)', '= £12 000 (1)', 'Net profit margin = £12 000 ÷ £60 000 × 100 (1)', '= 20% (1)']), topic: 'ent-documents' },
      { marks: 6, q: 'Explain **three** ways Byte Repair could improve its profitability.', ms: pts(['Way, e.g. raise repair prices (1)', 'Developed, e.g. if customers value fast, trusted service (1)', 'Way, e.g. find cheaper suppliers of parts to reduce cost of sales (1)', 'Developed, e.g. but quality must be maintained (1)', 'Way, e.g. reduce expenses such as van costs by grouping collections (1)', 'Developed (1)']), topic: 'ent-finance' },
      { marks: 8, q: 'Ollie needs £8 000 to open a second shop. Assess whether he should use **crowdfunding** or a **bank loan**.', ms: [
        'Level 3 (6-8 marks): balanced assessment of both sources applied to Byte Repair, with a supported conclusion.',
        'Level 2 (3-5 marks): some assessment of one or both sources.',
        'Level 1 (1-2 marks): limited knowledge.',
        'Indicative content: crowdfunding - no interest, builds publicity and a customer base, but may not reach the target, rewards must be provided, ideas exposed to competitors. Bank loan - certain amount, keeps control, net profit £12 000 a year could cover repayments, but interest and security needed. Conclusion.',
      ], topic: 'ent-finance' },
    ],
  },
];

function btecTests(): MockTest[] {
  const pools = newPools();
  return ([0, 1, 2] as const).map((t) => {
    const b = BTEC[t];
    const a = assemble({ key: `btec-c3-t${t + 1}-a`, topics: ['ent-promotion', 'ent-market', 'ent-types'], marks: 10, writtenShare: 0, genShare: 0, numbering: 'plain', pools, types: ['mcq', 'multi', 'tf'] });
    const f = assemble({ key: `btec-c3-t${t + 1}-b`, topics: ['ent-finance', 'ent-documents'], marks: 10, writtenShare: 0, genShare: 0, numbering: 'plain', pools, types: ['mcq', 'multi', 'tf', 'num'] });
    a.questions.forEach((q, i) => { q.n = `1.${i + 1}`; });
    f.questions.forEach((q, i) => { q.n = `3.${i + 1}`; });
    return {
      id: `business-btec-c3-t${t + 1}`, paperId: 'business-btec-c3', n: (t + 1) as 1 | 2 | 3, title: `Practice paper ${t + 1}`,
      focus: b.scenario.split('\n')[0].replace(/\*/g, ''),
      sections: [
        { title: 'Section A: Promotion', intro: 'Answer all questions. Questions 1.1 onwards are worth 1 mark each.', questions: a.questions },
        { title: 'Section A (continued): Promotion – scenario questions', intro: 'Read the scenario, then answer all questions.', source: b.scenario, questions: b.promo.map((x, i) => w(`2.${i + 1}`, examQ(x.q, x.marks, x.ms, { time: Math.round(x.marks * 1.8) }), x.topic)) },
        { title: 'Section B: Finance', intro: 'Answer all questions. You may use a calculator.', questions: f.questions },
        { title: 'Section B (continued): Finance – scenario questions', intro: 'Use the scenario at the start of the paper.', source: b.scenario, questions: b.fin.map((x, i) => w(`4.${i + 1}`, examQ(x.q, x.marks, x.ms, { time: Math.round(x.marks * 1.8) }), x.topic)) },
      ],
    };
  });
}

const gcse = { group: 'business-course', value: 'gcse' };
const btec = { group: 'business-course', value: 'btec' };
const memo = (f: () => MockTest[]) => { let v: MockTest[] | null = null; return () => (v ??= f()); };

export const BUSINESS_PAPERS: MockPaper[] = [
  {
    id: 'business-p1', subjectId: 'business', option: gcse, title: 'Paper 1: Influences of operations and HRM on business activity', board: 'AQA 8132/1-style (Edexcel 1BS0/01 is the same length and total)',
    mins: 105, marks: 90, tools: ['calc', 'working'],
    info: ['Time allowed: 1 hour 45 minutes. Total marks: 90.', 'Section A: multiple-choice and short-answer questions (20 marks). Sections B and C: case studies (34 and 36 marks).', 'You may use a calculator. Formulae are not given - you must learn them.', 'Show your working in calculations.'],
    tests: gcseTests(1),
  },
  {
    id: 'business-p2', subjectId: 'business', option: gcse, title: 'Paper 2: Influences of marketing and finance on business activity', board: 'AQA 8132/2-style (Edexcel 1BS0/02 is the same length and total)',
    mins: 105, marks: 90, tools: ['calc', 'working'],
    info: ['Time allowed: 1 hour 45 minutes. Total marks: 90.', 'Section A: multiple-choice and short-answer questions (20 marks). Sections B and C: case studies (34 and 36 marks).', 'You may use a calculator. Formulae are not given - you must learn them.', 'Show your working in calculations.'],
    tests: gcseTests(2),
  },
  {
    id: 'business-btec-c3', subjectId: 'business', option: btec, title: 'Component 3: Promotion and finance for enterprise', board: 'Pearson BTEC Tech Award in Enterprise Component 3-style',
    mins: 120, marks: 60, tools: ['calc', 'working'],
    info: ['Time: 2 hours. Total marks: 60.', 'Section A: promotion (30 marks). Section B: finance (30 marks).', 'You may use a calculator. Show your working.', 'Check the exact paper format with your teacher - Pearson\'s question styles vary slightly from series to series.'],
    tests: memo(btecTests),
  },
];
