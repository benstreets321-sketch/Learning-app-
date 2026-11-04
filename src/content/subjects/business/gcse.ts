import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, topic, examQ, ord, match } from '../../dsl';

const EVAL = (points: string[]) => [
  'Level 3/4: knowledge applied to the case study throughout; developed chains of reasoning; balanced evaluation with a justified judgement',
  'Level 2: some application and analysis; limited evaluation',
  'Level 1: knowledge only, generic',
  ...points,
];
const GCSE = { group: 'business-course', value: 'gcse' };

export const gcseUnits: Unit[] = [
  {
    id: 'bus-world', title: 'Business in the real world', option: GCSE, description: 'Enterprise, ownership, aims, stakeholders, location and business plans.',
    topics: [
      topic({
        id: 'bus-enterprise', title: 'Enterprise, entrepreneurs and business aims', summary: 'Why businesses exist, risk and reward, entrepreneurs, aims and objectives.',
        notes: `
## Why businesses exist
To provide **goods** (physical) and **services** (non-physical) that meet customer **needs** (essential) and **wants**, and to add **value**.

## Entrepreneurs
People who take a **risk** to start a business, aiming for **rewards**.
- **Risks**: business failure, financial loss, lack of security, stress.
- **Rewards**: profit, independence, satisfaction/doing something they enjoy.
- Characteristics: **risk-taking, creativity, determination/resilience, initiative, hard work, good communication**.
- Ideas come from: changes in **technology**, changing customer wants, products becoming **obsolete**, original ideas, adapting existing products.

## Aims and objectives
- **Aims**: long-term goals. **Objectives**: measurable, **SMART** targets (Specific, Measurable, Achievable, Realistic, Time-bound).
- Financial: survival, profit, sales, market share, financial security.
- Non-financial: social objectives (helping the community), personal satisfaction, challenge, independence, control, ethical/environmental goals.
- Objectives **change** as a business grows (survival → growth/profit/market share) and due to the market, competition, technology, legislation.
`,
        keyPoints: ['Businesses provide goods/services that add value', 'Entrepreneurs balance risk and reward', 'Characteristics: risk-taker, creative, determined', 'Objectives should be SMART', 'Financial vs non-financial objectives', 'Objectives change as businesses grow'],
        flashcards: cards([['What does SMART stand for?', 'Specific, Measurable, Achievable, Realistic, Time-bound.'], ['Two risks of starting a business?', 'Financial loss and business failure (also lack of security).'], ['Give two non-financial objectives', 'Social objectives, personal satisfaction (also independence, challenge).'], ['What is "adding value"?', 'Increasing the worth of a product (branding, quality, convenience, USP) so customers pay more than the cost of inputs.']]),
        questions: [
          mc('Which is a non-financial objective?', ['Personal satisfaction', 'Increasing profit by 10%', 'Survival', 'Increasing market share'], 'Not measured in money.', { d: 1 }),
          mc('Why might a new business\'s main objective be survival?', ['It has few customers and limited cash, so it must avoid failure first', 'It already dominates the market', 'Survival is always the only objective', 'It has too much profit'], 'New businesses face high risk.', { d: 2 }),
          multi('Which are characteristics of successful entrepreneurs?', ['Willingness to take risks', 'Creativity', 'Resilience'], ['Avoiding all risk', 'Dislike of hard work'], 'Entrepreneurs embrace calculated risk.', { d: 1 }),
        ],
      }),
      topic({
        id: 'bus-ownership', title: 'Business ownership', summary: 'Sole traders, partnerships, Ltd, PLC, franchises, not-for-profit; limited and unlimited liability.',
        notes: `
| Type | Owners | Liability | ✓ | ✗ |
|---|---|---|---|---|
| **Sole trader** | One | **Unlimited** | Full control, keep all profit, easy to set up | Personal assets at risk, limited finance, long hours |
| **Partnership** | 2-20 (usually) | Unlimited | Shared skills and finance | Disagreements; shared profit; unlimited liability |
| **Private limited company (Ltd)** | Shareholders (shares sold privately) | **Limited** | Owners protected; easier to raise finance | Accounts published; can't sell shares publicly |
| **Public limited company (PLC)** | Shareholders (shares on the **stock exchange**) | Limited | Raise large amounts of finance | Risk of takeover; expensive to set up; must publish accounts |
| **Franchise** | Franchisee buys the right to use a franchisor's brand | (depends) | Established brand, support, lower risk | Fees/royalties, less control |
| **Not-for-profit / social enterprise** | | | Aims to help society; surplus reinvested | |

- **Unlimited liability**: owners are personally responsible for all business debts (could lose their house).
- **Limited liability**: owners can only lose what they invested; business is a separate legal entity (**incorporated**).
`,
        keyPoints: ['Sole traders and partners: unlimited liability', 'Ltd and PLC: limited liability (incorporated)', 'PLC shares sold on the stock exchange', 'Franchise: lower risk but fees and less control', 'Not-for-profit reinvests surplus'],
        flashcards: cards([['What is unlimited liability?', 'The owner is personally liable for all business debts - personal assets are at risk.'], ['What is limited liability?', 'Owners can only lose the amount they invested.'], ['Difference between Ltd and PLC?', 'Ltd shares are sold privately; PLC shares are sold publicly on the stock exchange.'], ['Franchisee vs franchisor?', 'The franchisor owns the brand; the franchisee buys the right to use it.']]),
        questions: [
          mc('Which type of business has unlimited liability?', ['Sole trader', 'Private limited company', 'Public limited company', 'All of them'], 'Sole traders are unincorporated.', { d: 1 }),
          tf('A PLC can sell shares to the general public.', true, 'Through the stock exchange.', { d: 1 }),
          mc('Which is an advantage of opening a franchise?', ['An established brand reduces risk', 'You keep all the profit', 'You have total control', 'There are no fees'], 'Customers already know the brand.', { d: 2 }),
        ],
        examQuestions: [examQ('Priya runs a successful café as a sole trader. She wants to open three more cafés. Evaluate whether she should change to a private limited company.', 9, EVAL(['Limited liability protects personal assets as risk grows', 'Easier to raise finance by selling shares to friends/family/investors', 'Loss of some control; profits shared with shareholders', 'Accounts must be published; more paperwork/costs', 'Justified recommendation linked to her expansion plans']), { meta: 'Evaluate (9 marks)', time: 11 })],
      }),
      topic({
        id: 'bus-stakeholders', title: 'Stakeholders, location and business plans', summary: 'Stakeholder interests and conflicts; factors affecting location; purpose of a business plan.',
        notes: `
## Stakeholders
Anyone affected by or interested in a business.
| Stakeholder | Main interest |
|---|---|
| **Owners/shareholders** | Profit, dividends, share price |
| **Employees** | Pay, job security, working conditions |
| **Customers** | Quality, low prices, good service |
| **Suppliers** | Regular orders, prompt payment |
| **Local community** | Jobs, low pollution/noise |
| **Government** | Taxes, jobs, following laws |

**Conflicts**: e.g. shareholders want lower costs (profit) vs employees want higher pay; expanding a factory creates jobs but increases traffic for local residents.

## Location factors
Proximity to **market/customers**, **labour** (skills, cost), **materials/suppliers**, **competitors**, costs (rent), infrastructure, government incentives; for online businesses, location matters less (but warehouse/delivery does).

## Business plans
Sets out the **idea, aims, market research, marketing, finance (forecasts), operations**. Purpose: helps to **get finance** (banks/investors), reduces risk by thinking things through, sets targets.
`,
        keyPoints: ['Stakeholders: owners, employees, customers, suppliers, community, government', 'Stakeholders\' objectives often conflict', 'Location: market, labour, materials, competitors, costs', 'Business plan helps raise finance and reduce risk'],
        flashcards: cards([['What is a stakeholder?', 'Any individual or group with an interest in, or affected by, a business.'], ['Main interest of shareholders?', 'Profit / dividends / rising share price.'], ['Purpose of a business plan?', 'To plan the business, reduce risk and persuade lenders/investors to provide finance.']]),
        questions: [
          match('Match the stakeholder to their main interest.', [['Employees', 'Job security and pay'], ['Customers', 'Quality and value'], ['Suppliers', 'Prompt payment and orders'], ['Government', 'Taxes and following the law']], 'Each stakeholder wants different things.', { d: 1 }),
          mc('A factory wants to extend its opening hours. Which stakeholders are most likely to object?', ['Local residents', 'Shareholders', 'The government', 'Suppliers'], 'Noise and traffic affect the community.', { d: 2 }),
        ],
      }),
      topic({
        id: 'bus-growth', title: 'Business growth and globalisation', summary: 'Organic and inorganic growth, economies of scale, globalisation and multinationals.',
        notes: `
## Methods of growth
- **Organic (internal)**: opening new stores, new products, new markets, e-commerce. ✓ low risk, keeps control ✗ slow.
- **Inorganic (external)**: **merger** (two businesses agree to join) or **takeover** (one buys another). ✓ fast, gain market share/skills ✗ culture clash, expensive, job losses.
  - **Horizontal** (same stage, competitor), **vertical** (supplier - backward; customer/retailer - forward), **conglomerate** (unrelated).

## Economies of scale
Average costs **fall** as output increases: **purchasing** (bulk buying discounts), **technical** (better machinery), **financial** (cheaper borrowing), **marketing**.
**Diseconomies of scale**: average costs rise when too big - poor communication, low motivation, coordination problems.

## Globalisation
Businesses trading and operating internationally. Opportunities: bigger markets, cheaper labour/materials. Threats: more competition, exchange rate risk, cultural differences.
**Multinationals** have operations in more than one country. **Tariffs** (taxes on imports) and **trade blocs** (free trade areas) affect trade.
`,
        keyPoints: ['Organic: internal, slow, low risk', 'Inorganic: mergers and takeovers - fast but risky', 'Horizontal, vertical, conglomerate integration', 'Economies of scale reduce average costs', 'Diseconomies: communication and motivation problems', 'Globalisation: bigger markets but more competition'],
        flashcards: cards([['Organic growth?', 'Growing internally, e.g. opening new branches or launching new products.'], ['Merger vs takeover?', 'A merger is an agreed joining of two firms; a takeover is one firm buying control of another.'], ['What is a purchasing economy of scale?', 'Lower unit costs from bulk-buying discounts.'], ['What is a diseconomy of scale?', 'Rising average costs when a business becomes too large (e.g. poor communication).'], ['What is a tariff?', 'A tax on imported goods.']]),
        questions: [
          mc('A supermarket buys a farm that supplies it. This is...', ['Backward vertical integration', 'Horizontal integration', 'Forward vertical integration', 'Organic growth'], 'Buying a supplier = backward vertical.', { d: 3 }),
          mc('Which is an economy of scale?', ['Bulk-buying discounts', 'Poor communication', 'Higher rent', 'More competitors'], 'Lower unit costs from purchasing power.', { d: 1 }),
          tf('Organic growth is usually faster than a takeover.', false, 'Organic growth is slower but less risky.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'bus-influences', title: 'Influences on business', option: GCSE, description: 'Technology, ethics, environment, the economy, legislation and competition.',
    topics: [
      topic({
        id: 'bus-external', title: 'External influences: technology, ethics, economy and law', summary: 'How technology, ethical/environmental concerns, economic climate and legislation affect businesses.',
        notes: `
## Technology
E-commerce, digital communication, social media marketing, automation. ✓ efficiency, wider market ✗ cost, training, cyber security.

## Ethical and environmental considerations
Fair pay, fair trade, sustainable sourcing, reducing pollution/waste. ✓ attract customers, good reputation, motivated staff ✗ **higher costs** (trade-off with profit).

## The economic climate
| Factor | Effect |
|---|---|
| **Interest rates** rise | Loans cost more; customers spend less (especially on credit); saving is more attractive |
| **Unemployment** rises | Lower spending; easier to recruit staff |
| **Inflation** | Rising costs and prices; wages may need to rise |
| **Consumer income** falls | Less demand for luxury goods |
| **Exchange rates** (SPICED: Strong Pound, Imports Cheaper, Exports Dearer) | Strong £ → imports cheaper, exports more expensive |

## Legislation
- **Employment law**: National Minimum/Living Wage, equality (Equality Act 2010), contracts, health and safety.
- **Consumer law** (Consumer Rights Act 2015): goods must be of satisfactory quality, fit for purpose, as described.
- Effects: costs of compliance; but fairness and protection.
`,
        keyPoints: ['Technology: efficiency and e-commerce vs cost', 'Ethics: reputation vs higher costs', 'Higher interest rates reduce spending and raise loan costs', 'SPICED: strong pound, imports cheaper, exports dearer', 'Employment and consumer law add costs but protect'],
        flashcards: cards([['What does SPICED stand for?', 'Strong Pound: Imports Cheaper, Exports Dearer.'], ['Effect of rising interest rates on a business?', 'Higher cost of loans; customers have less disposable income so demand falls.'], ['Three rights under the Consumer Rights Act?', 'Goods must be of satisfactory quality, fit for purpose and as described.'], ['Why might acting ethically reduce profit?', 'It often costs more (e.g. fair trade materials, higher wages).']]),
        questions: [
          mc('The pound strengthens against the euro. What happens to a UK firm exporting to France?', ['Its products become more expensive in France', 'Its products become cheaper in France', 'No effect', 'Its costs fall'], 'Exports dearer (SPICED).', { d: 3 }),
          mc('Interest rates fall. What is likely to happen?', ['Consumer spending and borrowing increase', 'Consumers save more', 'Loans become more expensive', 'Unemployment rises'], 'Borrowing is cheaper.', { d: 2 }),
          tf('Ethical behaviour always increases a business\'s costs and never benefits it.', false, 'It can attract customers and improve reputation, offsetting costs.', { d: 2 }),
        ],
        examQuestions: [examQ('A UK clothing retailer imports most of its stock from China. Analyse the impact of a fall in the value of the pound.', 6, ['Weak pound makes imports more expensive', 'Higher cost of stock / cost of sales', 'Either raise prices (may lose customers) or accept lower margins', 'Reduced profit', 'Could switch to UK suppliers', 'Chain of reasoning applied to the retailer'], { meta: 'Analyse (6 marks)', time: 7 })],
      }),
      topic({
        id: 'bus-competition', title: 'The competitive environment and risk', summary: 'Competition, market types, uncertainty and risk.',
        notes: `
- **Competition** forces businesses to: lower prices, improve quality, innovate, provide better service, add value (USP).
- **Market share** = firm's sales ÷ total market sales × 100.
- **Uncertainty and risk** come from changing customer tastes, new competitors, the economy, legislation, technology. Businesses manage risk with research, planning, insurance and diversification.
- **USP** (unique selling point): what makes a product different from competitors.
`,
        keyPoints: ['Competition drives lower prices and better quality', 'Market share formula', 'USP differentiates products', 'Risks: tastes, competitors, economy, law, technology'],
        generators: ['bus-market-share'],
        flashcards: cards([['What is a USP?', 'Unique selling point - a feature that makes a product different from rivals.'], ['Market share formula?', 'Firm\'s sales ÷ total market sales × 100']]),
        questions: [
          num('A firm sells £2m in a market worth £16m. Calculate its market share (%).', 12.5, '2 ÷ 16 × 100 = 12.5%.', { d: 2, unit: '%' }),
          multi('How might a business respond to a new competitor?', ['Lower prices', 'Improve quality', 'Increase promotion'], ['Stop advertising', 'Reduce customer service'], 'Responses to protect market share.', { d: 1 }),
        ],
      }),
    ],
  },
  {
    id: 'bus-operations', title: 'Business operations', option: GCSE, description: 'Production, quality, procurement and customer service.',
    topics: [
      topic({
        id: 'bus-ops', title: 'Production, quality and the supply chain', summary: 'Job, batch and flow production; lean production; quality control vs assurance; suppliers; customer service.',
        notes: `
## Production methods
| Method | Description | Example | ✓ / ✗ |
|---|---|---|---|
| **Job** | One-off, made to order | Wedding cake, bespoke suit | High quality, high price / slow, skilled labour |
| **Batch** | Groups of identical items | Bakery bread batches | Some flexibility / downtime between batches |
| **Flow** | Continuous mass production | Cars, cans of drink | Low unit cost, automation / inflexible, high set-up cost |

## Lean production and stock
- **Just in time (JIT)**: stock arrives exactly when needed - less storage cost and waste, but reliant on suppliers.
- **Just in case (JIC)**: hold buffer stock - can meet sudden demand, but storage costs and risk of waste.
- Bar gate stock graphs: maximum, re-order level, re-order quantity, lead time, buffer stock.

## Technology in production
Automation, robotics, CAD/CAM: ✓ efficiency, consistency ✗ cost, job losses, maintenance.

## Procurement
Choosing suppliers: **quality, price, reliability, delivery speed, payment terms (credit), flexibility, ethics**. Supply chain = suppliers → producer → distributor → retailer → customer.

## Quality
- **Quality control**: inspecting products at the end - finds faults (but waste).
- **Quality assurance**: building quality into every stage; staff responsible (e.g. **TQM - total quality management**).
- Good quality → reputation, repeat customers, can charge more; poor quality → returns, complaints, lost sales.

## Customer service
Product knowledge, friendly staff, after-sales service, online reviews. Good service builds **loyalty** and a competitive advantage.
`,
        keyPoints: ['Job, batch and flow production', 'JIT reduces stock costs but depends on suppliers', 'Bar gate stock graph: re-order level, lead time, buffer', 'Choose suppliers on quality, price, reliability', 'QC inspects at the end; QA builds quality in', 'Good customer service builds loyalty'],
        flashcards: cards([['What is batch production?', 'Making groups of identical products together before switching to a different batch.'], ['What is just-in-time stock control?', 'Stock is delivered only when needed, minimising stock held.'], ['Quality control vs quality assurance?', 'QC inspects finished products for faults; QA prevents faults by checking quality at every stage.'], ['What is TQM?', 'Total quality management - everyone in the organisation is responsible for quality.'], ['What is lead time?', 'The time between ordering stock and it arriving.']]),
        questions: [
          mc('A car manufacturer making thousands of identical cars uses...', ['Flow production', 'Job production', 'Batch production', 'Craft production'], 'Continuous mass production.', { d: 1 }),
          mc('What is a disadvantage of just-in-time stock control?', ['If a supplier is late, production may stop', 'High storage costs', 'Stock becomes out of date', 'Too much cash tied up in stock'], 'No buffer stock.', { d: 2 }),
          tf('Quality assurance only checks products at the end of production.', false, 'That is quality control. QA checks throughout.', { d: 2 }),
        ],
        examQuestions: [examQ('A bakery currently holds large amounts of stock just in case. Evaluate whether it should move to just-in-time stock control.', 9, EVAL(['JIT reduces storage costs and waste of perishable stock', 'Frees up cash previously tied up in stock', 'Relies on reliable local suppliers delivering frequently', 'Risk of running out if demand suddenly increases', 'Loss of bulk-buying discounts', 'Justified judgement for a bakery with perishable goods']), { meta: 'Evaluate (9 marks)', time: 11 })],
      }),
    ],
  },
  {
    id: 'bus-hrm', title: 'Human resources', option: GCSE, description: 'Structures, recruitment, training and motivation.',
    topics: [
      topic({
        id: 'bus-hr', title: 'Organisation, recruitment, training and motivation', summary: 'Organisational structures, recruitment and selection, training, contracts and motivation.',
        notes: `
## Organisational structure
- **Hierarchy**, **chain of command** (line of authority), **span of control** (number of direct subordinates).
- **Tall** structure: many layers, narrow spans → slow communication, more promotion opportunities.
- **Flat** structure: few layers, wide spans → faster communication, more responsibility, less supervision.
- **Centralised** (decisions at the top) vs **decentralised** (decisions delegated to branches/staff).

## Recruitment and selection
- **Job description** (duties of the role) and **person specification** (skills/qualities needed).
- **Internal** recruitment (promote existing staff: cheaper, known, motivating) vs **external** (new ideas, wider pool, but costly and slower).
- Selection: application forms, CVs, interviews, tests, references.

## Contracts
Full-time, part-time, **zero-hours** (no guaranteed hours - flexible but insecure), temporary, freelance.

## Training
- **Induction** (introduce new staff), **on-the-job** (learning while working - cheap, relevant), **off-the-job** (courses - specialist, but costly and time away).
- Benefits: skills, productivity, motivation, retention.

## Motivation
- **Financial**: pay (salary/wages), **bonuses**, **commission**, **profit sharing**, fringe benefits (company car, discounts).
- **Non-financial**: praise, **job rotation**, **job enrichment** (more responsibility), **autonomy**, promotion, training, flexible hours.
- Motivated staff → higher productivity, better quality and service, lower **staff turnover** and absence.
`,
        keyPoints: ['Tall vs flat structures; span of control', 'Centralised vs decentralised decisions', 'Job description vs person specification', 'Internal vs external recruitment', 'On-the-job vs off-the-job training', 'Financial and non-financial motivation', 'Motivation reduces staff turnover'],
        flashcards: cards([['What is span of control?', 'The number of subordinates a manager is directly responsible for.'], ['Job description vs person specification?', 'Job description = duties of the job; person specification = skills and qualities required.'], ['What is a zero-hours contract?', 'A contract with no guaranteed minimum hours.'], ['Give two non-financial motivators', 'Praise, job rotation, job enrichment, autonomy, promotion.'], ['Advantage of a flat structure?', 'Faster communication and more empowered staff.']]),
        questions: [
          mc('Which is a feature of a tall organisational structure?', ['Narrow spans of control and many layers', 'Wide spans of control', 'Few managers', 'Very fast communication'], 'Tall = many levels.', { d: 2 }),
          mc('Which is a financial method of motivation?', ['Commission', 'Job rotation', 'Praise', 'Job enrichment'], 'Commission = pay linked to sales.', { d: 1 }),
          match('Match the term to its meaning.', [['Induction', 'Training for new starters'], ['Job enrichment', 'Giving more responsibility'], ['Commission', 'Pay based on sales'], ['Delegation', 'Passing authority down the hierarchy']], 'Key HR vocabulary.', { d: 2 }),
          tf('Internal recruitment brings more new ideas into a business than external recruitment.', false, 'External recruitment brings new ideas; internal is cheaper and motivating.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'bus-marketing', title: 'Marketing', option: GCSE, description: 'Market research, segmentation and the marketing mix.',
    topics: [
      topic({
        id: 'bus-research', title: 'Market research and segmentation', summary: 'Primary and secondary research, qualitative/quantitative data, sampling and segmentation.',
        notes: `
## Why research?
Identify customer needs, understand competitors, reduce **risk**, inform marketing-mix decisions.

| Primary (field) | Secondary (desk) |
|---|---|
| Surveys, questionnaires, interviews, focus groups, observation, test marketing | Internet, government statistics, market reports (e.g. Mintel), competitor websites, newspapers |
| Specific and up to date - but costly and time-consuming | Cheap and quick - but may be out of date or not specific |

- **Quantitative** (numbers) vs **qualitative** (opinions, reasons).
- **Sample**: a group representing the target market; bigger and more representative = more reliable.
- **Social media** for research: quick, cheap feedback and trends.

## Market segmentation
Dividing the market into groups by **age, gender, income, location, lifestyle, occupation**. Allows targeted products and promotion.
A **market map** plots products on two axes (e.g. price vs quality) to find **gaps in the market**.
`,
        keyPoints: ['Research reduces risk', 'Primary: specific but costly; secondary: cheap but less specific', 'Qualitative vs quantitative', 'Segmentation by demographics/lifestyle', 'Market maps reveal gaps'],
        flashcards: cards([['What is a market map?', 'A diagram plotting brands on two dimensions (e.g. price and quality) to show positioning and gaps.'], ['Disadvantage of secondary research?', 'May be out of date or not specific to the business\'s needs.'], ['What is segmentation?', 'Dividing a market into groups of customers with similar characteristics.']]),
        questions: [
          mc('Which is primary research?', ['A questionnaire given to customers', 'Government statistics', 'A Mintel report', 'A newspaper article'], 'Primary = collected first-hand.', { d: 1 }),
          mc('Why do businesses segment markets?', ['To target products and promotion at specific customer groups', 'To increase costs', 'To avoid competitors', 'To set up as a PLC'], 'Better targeting = more effective marketing.', { d: 1 }),
        ],
      }),
      topic({
        id: 'bus-mix', title: 'The marketing mix (4Ps)', summary: 'Product (life cycle, Boston matrix), price, promotion and place - and how they work together.',
        notes: `
## Product
- **Design mix**: function, aesthetics (appearance), cost.
- **Product life cycle**: development → **introduction** → **growth** → **maturity** → **decline**. **Extension strategies**: new features, new markets, rebranding, price cuts, promotion.
- **Boston matrix**: market share vs market growth - **stars** (high/high), **cash cows** (high share, low growth - fund others), **question marks** (low share, high growth), **dogs** (low/low). A balanced **product portfolio**.
- **Branding** builds loyalty and allows premium prices.

## Price
| Strategy | When |
|---|---|
| **Penetration** | Low price to enter a market and gain share |
| **Skimming (premium)** | High price for new, unique/tech products |
| **Competitive** | Similar to rivals |
| **Cost-plus** | Cost + a mark-up |
| **Promotional** | Temporary discounts, BOGOF |
Influences: costs, competition, target market, product life cycle stage, technology (price comparison).

## Promotion
Advertising (TV, social media, print, billboards), **sales promotions** (discounts, free samples, competitions), **public relations** (press releases, sponsorship), **branding**, **social media** and influencer marketing, viral marketing, email. Choose by target market, budget and product.

## Place
Channels: **direct** (manufacturer → consumer, e.g. online), via **retailers**, via **wholesalers**. **E-commerce** and **m-commerce** (mobile). Physical shops vs online: experience vs convenience/reach.

## An integrated mix
The 4Ps must be consistent: a premium product needs a premium price, upmarket promotion and exclusive places.
`,
        keyPoints: ['PLC: introduction, growth, maturity, decline (+ extension strategies)', 'Boston matrix: stars, cash cows, question marks, dogs', 'Price: penetration, skimming, competitive, cost-plus', 'Promotion: advertising, sales promotion, PR, social media', 'Place: direct, retailer, wholesaler, e-commerce', 'The 4Ps must be consistent'],
        flashcards: cards([['Stages of the product life cycle?', 'Development, introduction, growth, maturity, decline.'], ['What is an extension strategy?', 'Action to lengthen a product\'s life cycle (new features, new markets, rebranding).'], ['What is a cash cow?', 'A product with high market share in a low-growth market - generates cash.'], ['Penetration pricing?', 'Setting a low initial price to gain market share quickly.'], ['Price skimming?', 'Setting a high initial price for a new or unique product.'], ['What is the design mix?', 'Function, aesthetics and cost.']]),
        questions: [
          ord('Put the product life cycle stages in order.', ['Development', 'Introduction', 'Growth', 'Maturity', 'Decline'], 'Sales peak at maturity.', { d: 1 }),
          mc('A new games console is launched at a high price. This is...', ['Price skimming', 'Penetration pricing', 'Competitive pricing', 'Cost-plus pricing'], 'High initial price for an innovative product.', { d: 1 }),
          mc('In the Boston matrix, a product with low market share in a fast-growing market is a...', ['Question mark', 'Cash cow', 'Star', 'Dog'], 'Uncertain future.', { d: 2 }),
          tf('A luxury watch brand should sell through discount supermarkets to reach more customers.', false, 'This would clash with the premium image - the mix must be consistent.', { d: 2 }),
        ],
        examQuestions: [examQ('A small company is launching a new range of vegan protein bars aimed at 18-30 year olds who go to the gym. Recommend a pricing and promotion strategy. Justify your answer.', 12, EVAL(['Pricing options: penetration to win share vs premium for a healthy/ethical product', 'Consider competitors and costs', 'Promotion: social media/influencers suit 18-30 gym-goers', 'Sales promotions/free samples at gyms', 'Budget limitations of a small company', 'Integrated mix and justified recommendation']), { meta: 'Justify (12 marks)', time: 15 })],
      }),
    ],
  },
  {
    id: 'bus-finance', title: 'Finance', option: GCSE, description: 'Sources of finance, costs, break-even, cash flow and financial performance.',
    topics: [
      topic({
        id: 'bus-sources', title: 'Sources of finance', summary: 'Internal and external, short- and long-term sources and how to choose.',
        notes: `
| Source | Type | Notes |
|---|---|---|
| **Retained profit** | Internal | No interest; only for established profitable firms |
| **Sale of assets** | Internal | One-off; lose the asset |
| **Owner's savings** | Internal | No interest; personal risk |
| **Bank loan** | External, long-term | Fixed repayments + **interest**; may need collateral |
| **Overdraft** | External, short-term | Flexible; high interest; can be withdrawn |
| **Share capital** | External, long-term (Ltd/PLC) | No repayment; lose some control; dividends |
| **Venture capital** | External | Investors take a share; advice; for high-growth start-ups |
| **Crowdfunding** | External | Many small investors online; also marketing; may not reach target |
| **Trade credit** | External, short-term | Pay suppliers later (e.g. 30 days) |
| **Government grants** | External | No repayment; conditions; competitive |

**Choosing**: amount needed, cost (interest), how long for, type of business (Ltd can sell shares), risk, control.
`,
        keyPoints: ['Internal: retained profit, owner\'s savings, sale of assets', 'Overdraft for short-term; loan for long-term', 'Shares: no repayment but lose control', 'Crowdfunding and venture capital for start-ups', 'Trade credit = pay suppliers later', 'Choose by amount, cost, time, control'],
        generators: ['bus-interest'],
        flashcards: cards([['What is an overdraft?', 'Short-term borrowing allowing a business to spend more than is in its bank account, up to a limit.'], ['What is trade credit?', 'Buying from suppliers now and paying later (e.g. 30 days).'], ['Advantage of share capital?', 'It doesn\'t need to be repaid and no interest is paid.'], ['What is crowdfunding?', 'Raising small amounts of money from many people, usually online.'], ['What is retained profit?', 'Profit kept in the business rather than paid to owners.']]),
        questions: [
          mc('Which is the best source of finance for a short-term cash shortage?', ['Overdraft', 'Share capital', 'Mortgage', 'Selling the factory'], 'Overdrafts are flexible and short-term.', { d: 1 }),
          mc('Which source is only available to limited companies?', ['Selling shares', 'Bank loan', 'Owner\'s savings', 'Trade credit'], 'Sole traders can\'t issue shares.', { d: 2 }),
          tf('Retained profit is an external source of finance.', false, 'It comes from within the business - internal.', { d: 1 }),
        ],
      }),
      topic({
        id: 'bus-costs', title: 'Revenue, costs, profit and break-even', summary: 'Calculations, break-even charts and margin of safety.',
        notes: `
| Formula | |
|---|---|
| **Revenue** = price × quantity sold | |
| **Total costs** = fixed costs + variable costs | |
| **Variable costs** = variable cost per unit × output | |
| **Profit** = total revenue − total costs | |
| **Contribution per unit** = price − variable cost per unit | |
| **Break-even output** = fixed costs ÷ contribution per unit | |
| **Margin of safety** = actual output − break-even output | |
| **Interest (%)** = (total repayment − borrowed) ÷ borrowed × 100 | |

- **Fixed costs** don't change with output (rent, salaries, insurance). **Variable costs** do (raw materials, packaging).
- **Break-even chart**: fixed cost line (horizontal), total cost line (starts at fixed costs), revenue line (from origin). Break-even where TR = TC; loss below, profit above.
- Changes: higher price → break-even falls; higher costs → break-even rises.
- Limitations: assumes all output sold at one price; costs may not be linear; only as accurate as the data.
`,
        keyPoints: ['Revenue = price × quantity', 'Total costs = fixed + variable', 'Break-even = fixed costs ÷ (price − variable cost per unit)', 'Margin of safety = actual − break-even output', 'Break-even chart: TR = TC', 'Higher price lowers break-even; higher costs raise it'],
        generators: ['bus-revenue', 'bus-costs', 'bus-profit', 'bus-breakeven', 'bus-mos', 'bus-unit-cost'],
        flashcards: cards([['Break-even formula?', 'Fixed costs ÷ (selling price − variable cost per unit)'], ['Margin of safety?', 'Actual sales − break-even output.'], ['Give two fixed costs', 'Rent, salaries, insurance, loan repayments.'], ['Give two variable costs', 'Raw materials, packaging, piece-rate wages.'], ['What happens to break-even if the selling price rises?', 'It falls (fewer units needed).']]),
        questions: [
          num('Fixed costs £12,000; price £15; variable cost per unit £7. Calculate break-even output.', 1500, 'Contribution = £8 → 12,000 ÷ 8 = 1,500 units.', { d: 2, unit: 'units' }),
          num('A business sells 800 units at £25 each. Fixed costs are £6,000 and variable cost is £12 per unit. Calculate profit.', 4400, 'Revenue £20,000 − (6,000 + 9,600) = £4,400.', { d: 2, unit: '£' }),
          mc('On a break-even chart, where does the total cost line start?', ['At the level of fixed costs on the y-axis', 'At the origin', 'At the break-even point', 'At maximum output'], 'Even with zero output, fixed costs must be paid.', { d: 2 }),
          tf('If variable costs per unit rise, break-even output falls.', false, 'Contribution falls, so more units are needed to break even.', { d: 3 }),
        ],
        workedExamples: [{ title: 'Break-even and margin of safety', problem: 'A café\'s fixed costs are £4,800 per month. Each meal sells for £10 with variable costs of £4. It sells 1,000 meals a month. Find the break-even output and margin of safety.', steps: ['Contribution per unit = £10 − £4 = £6', 'Break-even = £4,800 ÷ £6 = 800 meals', 'Margin of safety = 1,000 − 800 = 200 meals'], answer: 'Break-even 800 meals; margin of safety 200 meals', tryIt: 'Fixed costs £9,000, price £20, variable cost £11. Break-even?', tryAnswer: '9,000 ÷ 9 = 1,000 units' }],
      }),
      topic({
        id: 'bus-cash', title: 'Cash flow', summary: 'Cash flow forecasts, cash vs profit, and solving cash-flow problems.',
        notes: `
- **Cash inflows** (sales, loans, capital) and **outflows** (wages, rent, materials).
- **Net cash flow** = inflows − outflows.
- **Closing balance** = opening balance + net cash flow (becomes next month's opening balance).

| | Jan | Feb |
|---|---|---|
| Total inflows | 5,000 | 4,000 |
| Total outflows | 4,200 | 4,500 |
| Net cash flow | 800 | (500) |
| Opening balance | 1,000 | 1,800 |
| Closing balance | 1,800 | 1,300 |

- **Cash ≠ profit**: a business can be profitable but run out of cash (e.g. customers pay late, stock bought in advance).
- **Improving cash flow**: overdraft, delay payments to suppliers (trade credit), chase customers to pay sooner, reduce stock, sell unused assets, cut costs.
- Why forecast? Spot shortfalls early, plan borrowing, show lenders.
`,
        keyPoints: ['Net cash flow = inflows − outflows', 'Closing = opening + net cash flow', 'Profitable firms can still run out of cash', 'Fixes: overdraft, chase debtors, delay creditors, cut stock'],
        generators: ['bus-cashflow'],
        flashcards: cards([['Net cash flow formula?', 'Cash inflows − cash outflows'], ['Closing balance formula?', 'Opening balance + net cash flow'], ['Why can a profitable business fail?', 'It can run out of cash if money comes in later than it goes out.'], ['Two ways to improve cash flow?', 'Arrange an overdraft; ask customers to pay sooner (also delay paying suppliers, reduce stock).']]),
        questions: [
          num('Opening balance £2,000; inflows £6,500; outflows £7,300. Calculate the closing balance.', 1200, '2,000 + (6,500 − 7,300) = £1,200.', { d: 1, unit: '£' }),
          tf('A business making a profit can never have cash-flow problems.', false, 'Timing of payments matters - profit is not cash.', { d: 2 }),
          mc('Which would improve cash flow in the short term?', ['Asking customers to pay sooner', 'Buying more stock', 'Paying suppliers early', 'Offering customers longer credit'], 'Brings cash in faster.', { d: 2 }),
        ],
      }),
      topic({
        id: 'bus-performance', title: 'Financial statements and ratios', summary: 'Income statement, statement of financial position, profit margins and ARR.',
        notes: `
## Income statement (profit and loss)
Revenue − **cost of sales** = **gross profit**. Gross profit − **expenses** (overheads) = **operating/net profit**.

## Statement of financial position (balance sheet)
Assets (non-current: buildings, machinery; current: stock, cash, receivables) minus liabilities (current: overdraft, payables; non-current: long-term loans) = **net assets**, balanced by **capital/equity**.

## Ratios
| Ratio | Formula |
|---|---|
| **Gross profit margin** | gross profit ÷ revenue × 100 |
| **Net profit margin** | net profit ÷ revenue × 100 |
| **Average rate of return (ARR)** | average annual profit ÷ cost of investment × 100 |

Higher margins = more efficient at turning sales into profit. Compare with previous years and competitors.
`,
        keyPoints: ['Gross profit = revenue − cost of sales', 'Net profit = gross profit − expenses', 'Balance sheet: assets − liabilities = net assets = equity', 'GPM and NPM formulas', 'ARR = average annual profit ÷ investment × 100'],
        generators: ['bus-gpm', 'bus-npm', 'bus-arr', 'bus-pct-change'],
        flashcards: cards([['Gross profit formula?', 'Revenue − cost of sales'], ['Net profit margin formula?', 'Net profit ÷ revenue × 100'], ['ARR formula?', 'Average annual profit ÷ cost of investment × 100'], ['Current asset examples?', 'Cash, stock (inventory), trade receivables.']]),
        questions: [
          num('Revenue £80,000; cost of sales £50,000. Calculate the gross profit margin.', 37.5, '30,000 ÷ 80,000 × 100 = 37.5%.', { d: 2, unit: '%' }),
          num('A machine costs £20,000 and generates total returns of £30,000 over 5 years. Calculate the average rate of return (ARR).', 10, 'Total profit = 30,000 − 20,000 = £10,000; average per year = 10,000 ÷ 5 = £2,000; ARR = 2,000 ÷ 20,000 × 100 = 10%.', { d: 4, unit: '%' }),
          mc('Which appears on the statement of financial position?', ['Assets and liabilities', 'Revenue and cost of sales', 'Gross profit margin', 'Break-even output'], 'It shows what the business owns and owes.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'bus-exam-gcse', title: 'GCSE Business exam technique', option: GCSE, description: 'How to answer each question type.',
    topics: [
      topic({
        id: 'bus-technique', title: 'Answering calculate, explain, analyse and evaluate questions', summary: 'Mark allocations, application to the case study and building chains of reasoning.',
        notes: `
## Skills (AQA & Edexcel)
- **AO1 Knowledge** - what it is.
- **AO2 Application** - use the **case study** (names, numbers, products).
- **AO3 Analysis/Evaluation** - chains of reasoning; weigh up; justify a judgement.

## Question types
| Type | Approach |
|---|---|
| **Calculate** | Show the formula and working; include units (£, %) |
| **Explain** (2-3 marks) | Point + "which means that..." + link to the business |
| **Analyse** (6 marks) | Develop chains: because → which leads to → so... applied to the context |
| **Evaluate / Justify / Recommend** (9-12 marks) | Both sides analysed, then a **judgement**: what's most important, and **it depends on...** |

## Chain of reasoning example
"If Café Bloom uses social media advertising, **it can target** 18-30 year olds cheaply, **which means** more young customers will hear about the new menu, **leading to** higher footfall at lunchtime, **so** revenue should rise **without** the high cost of print adverts."

## Conclusion formula
Make a decision → give the main reason → acknowledge the key factor it depends on.
`,
        keyPoints: ['Always apply to the case study', 'Show working in calculations', 'Explain = point + consequence + context', 'Analyse = developed chains of reasoning', 'Evaluate = both sides + justified judgement + "it depends"'],
        flashcards: cards([['What does "application" mean in Business exams?', 'Using the specific context of the case study (names, products, numbers) in your answer.'], ['What is a chain of reasoning?', 'A linked series of consequences: because → which means → leading to → so.'], ['What makes a strong evaluation?', 'Weighing both sides and reaching a justified judgement, considering what it depends on.']]),
        questions: [
          mc('Which sentence shows application?', ['Because Joe\'s Bikes sells to cyclists in a small town, a local radio advert would reach its customers.', 'Advertising increases sales.', 'Radio adverts are a type of promotion.', 'Businesses should advertise.'], 'It uses the case study\'s context.', { d: 2 }),
          tf('A 12-mark evaluation question needs a final judgement.', true, 'Without a justified conclusion you can\'t reach the top level.', { d: 1 }),
        ],
      }),
    ],
  },
];

