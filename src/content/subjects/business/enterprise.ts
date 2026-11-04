import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, topic, examQ, ord, match } from '../../dsl';

const BTEC = { group: 'business-course', value: 'btec' };

export const enterpriseUnits: Unit[] = [
  {
    id: 'ent-c1', title: 'Enterprise C1: Exploring enterprises', option: BTEC, description: 'BTEC Tech Award in Enterprise · internally assessed.',
    topics: [
      topic({
        id: 'ent-types', title: 'Types of enterprise, aims and entrepreneurs', summary: 'SMEs, ownership, aims, and the skills and characteristics of entrepreneurs.',
        notes: `
## Size (by number of employees)
**Micro** (0-9), **small** (10-49), **medium** (50-249) = **SMEs**. Large: 250+.

## Types
Goods vs services; online vs physical; **sole traders, partnerships, private limited companies**, **social enterprises** (profit reinvested for a social cause), franchises.

## Aims
Financial (survive, break even, make profit, grow) and non-financial (social/ethical aims, customer satisfaction, personal satisfaction).

## Entrepreneurs
- **Characteristics**: risk-taker, determined, creative, resilient, motivated, confident.
- **Skills**: planning, communication, problem-solving, negotiation, financial literacy, decision-making, time management, leadership.
- **Reasons for success/failure**: meeting customer needs, competition, finance, management, external factors.
`,
        keyPoints: ['Micro 0-9, small 10-49, medium 50-249 employees', 'Social enterprises reinvest profit for social aims', 'Financial and non-financial aims', 'Entrepreneur characteristics vs skills', 'Success depends on customers, competition, finance'],
        flashcards: cards([['What is an SME?', 'A small or medium-sized enterprise - fewer than 250 employees.'], ['How many employees does a micro business have?', '0-9.'], ['What is a social enterprise?', 'A business with social or environmental aims that reinvests its profits for that purpose.'], ['Characteristic vs skill?', 'A characteristic is a personal trait (e.g. determination); a skill can be learned (e.g. negotiation).']]),
        questions: [
          mc('A business with 35 employees is...', ['Small', 'Micro', 'Medium', 'Large'], '10-49 employees = small.', { d: 1 }),
          multi('Which are SKILLS (rather than characteristics) of an entrepreneur?', ['Negotiation', 'Financial planning', 'Communication'], ['Being naturally confident', 'Determination'], 'Skills can be learned and developed.', { d: 2 }),
        ],
      }),
      topic({
        id: 'ent-market', title: 'Customers, market research and competition', summary: 'Customer needs, research methods, competitors, PEST and SWOT.',
        notes: `
## Customer needs
Price, quality, choice, convenience, customer service; **customer satisfaction and loyalty**. Enterprises anticipate needs (research) and meet them.

## Market research
Primary (surveys, interviews, observation, focus groups, trials) and secondary (internet, government stats, market reports, competitors' websites). **Qualitative** vs **quantitative**; reliability depends on sample size and bias.

## Competition
Compare competitors on price, quality, location, service, USP.

## PEST analysis (external factors)
**P**olitical (laws, taxes), **E**conomic (interest rates, unemployment), **S**ocial (trends, demographics), **T**echnological (online selling, apps).

## SWOT analysis
**S**trengths and **W**eaknesses (internal), **O**pportunities and **T**hreats (external). Used to plan and decide.
`,
        keyPoints: ['Meet customer needs → satisfaction and loyalty', 'Primary vs secondary; qualitative vs quantitative', 'PEST = external factors', 'SWOT: S/W internal, O/T external', 'Compare competitors on price, quality, USP'],
        flashcards: cards([['What does PEST stand for?', 'Political, Economic, Social, Technological.'], ['What does SWOT stand for?', 'Strengths, Weaknesses, Opportunities, Threats.'], ['Which parts of SWOT are internal?', 'Strengths and weaknesses.']]),
        questions: [
          mc('A new competitor opening nearby is a...', ['Threat', 'Weakness', 'Strength', 'Opportunity'], 'External and negative = threat.', { d: 1 }),
          match('Match the factor to the PEST category.', [['New minimum wage law', 'Political'], ['Rising interest rates', 'Economic'], ['Growing interest in veganism', 'Social'], ['More people shopping by app', 'Technological']], 'PEST analysis.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'ent-c2', title: 'Enterprise C2: Planning for and pitching an enterprise activity', option: BTEC, description: 'Internally assessed: plan and pitch your own micro-enterprise idea.',
    topics: [
      topic({
        id: 'ent-pitch', title: 'Planning, pitching and reviewing', summary: 'Choosing an idea, planning resources and finance, pitching skills and reviewing feedback.',
        notes: `
## Plan
- **Ideas**: generate (mind maps), then choose using research and feasibility.
- **Plan**: aims, target market, **marketing mix**, **resources** (physical, human, financial), legal and safety issues, **costs and pricing**, **break-even**, risks and contingencies, timescales.

## Pitch
- **Presentation skills**: clear structure (hook → idea → market → finances → ask), confident delivery, eye contact, pace, visual aids, answering questions.
- Adapt to your audience (e.g. investors care about profit and risk).

## Review
Collect **feedback** from your audience, reflect on your **pitch** and your **plan**, and recommend improvements. Use specific evidence, not "it went well".
`,
        keyPoints: ['Plan: aims, market, 4Ps, resources, finance, risks', 'Include costs, pricing and break-even', 'Pitch: structure, delivery, visual aids, questions', 'Review using feedback and evidence'],
        flashcards: cards([['What should a pitch include?', 'The idea, target market, how it meets needs, marketing, finances (costs, price, break-even) and what you\'re asking for.'], ['Why get feedback after a pitch?', 'To evaluate strengths and weaknesses and plan improvements.']]),
        questions: [
          ord('Put a strong pitch structure in order.', ['Hook to grab attention', 'Explain the idea and the customer need', 'Show market research and finances', 'Answer questions and close'], 'Logical and persuasive.', { d: 1 }),
          tf('A review of your pitch should only describe what went well.', false, 'Reviews must evaluate weaknesses and suggest improvements.', { d: 1 }),
        ],
      }),
    ],
  },
  {
    id: 'ent-c3', title: 'Enterprise C3: Promotion and finance for enterprise (exam)', option: BTEC, description: 'Externally assessed exam: promotion, financial documents, payments, profit, break-even, cash flow, statements and ratios.',
    topics: [
      topic({
        id: 'ent-promotion', title: 'Promotion and targeting', summary: 'Elements of the promotional mix, targeting and choosing methods.',
        notes: `
## Promotional mix
- **Advertising**: social media, websites, TV, radio, print, posters, leaflets.
- **Sales promotion**: discounts, BOGOF, coupons, loyalty schemes, free samples, competitions.
- **Personal selling**: face-to-face, demonstrations.
- **Public relations**: press releases, sponsorship, events, celebrity endorsement.
- **Direct marketing**: emails, mailshots, text messages.

## Targeting and segmentation
Segment by demographics (age, gender, income), geographics, psychographics (lifestyle, values), behaviour (usage, loyalty).

## Choosing promotion
Size and budget of the enterprise, target market, product type and stage of life cycle, competitors\' methods.
`,
        keyPoints: ['Advertising, sales promotion, personal selling, PR, direct marketing', 'Segment: demographic, geographic, psychographic, behavioural', 'Choose by budget, target market, product, competitors'],
        flashcards: cards([['Five elements of the promotional mix?', 'Advertising, sales promotion, personal selling, public relations, direct marketing.'], ['What is psychographic segmentation?', 'Grouping customers by lifestyle, attitudes, values or interests.']]),
        questions: [
          mc('A local gym offers a free first week. This is...', ['Sales promotion', 'Public relations', 'Personal selling', 'Advertising'], 'An incentive to buy.', { d: 1 }),
        ],
      }),
      topic({
        id: 'ent-documents', title: 'Financial documents and payment methods', summary: 'Purchase orders, delivery notes, invoices, credit notes, statements of account, receipts and payment methods.',
        notes: `
## Financial documents (in order)
1. **Purchase order** - buyer orders goods from a supplier.
2. **Delivery note** - comes with the goods; buyer checks and signs.
3. **Invoice** - supplier requests payment (amount, VAT, terms).
4. **Credit note** - reduces the amount owed (e.g. faulty/returned goods).
5. **Statement of account** - summary of transactions and the balance owed over a period.
6. **Receipt** - proof of payment.

## Payment methods
| Method | ✓ | ✗ |
|---|---|---|
| Cash | Immediate, no fees | Theft risk, no record |
| Debit card | Instant, secure | Card fees for business |
| Credit card | Customer pays later | Higher fees for business |
| Contactless / mobile | Fast | Limits; fees |
| Direct debit / bank transfer (BACS) | Regular payments automated | Need set-up |
| Online (e.g. PayPal) | Convenient online | Fees |
| Credit / BNPL (buy now pay later) | Encourages sales | Risk of late payment |
`,
        keyPoints: ['Purchase order → delivery note → invoice → (credit note) → statement → receipt', 'Invoice requests payment', 'Credit note reduces amount owed', 'Payment methods have costs and benefits'],
        flashcards: cards([['Purpose of an invoice?', 'Requests payment for goods/services supplied.'], ['Purpose of a credit note?', 'Reduces the amount owed, e.g. for returned or faulty goods.'], ['Purpose of a delivery note?', 'Lists goods delivered so the buyer can check them.'], ['Purpose of a statement of account?', 'Summarises all transactions and the balance owed over a period.']]),
        questions: [
          ord('Put the financial documents in the order they are usually used.', ['Purchase order', 'Delivery note', 'Invoice', 'Statement of account', 'Receipt'], 'Order → delivery → bill → summary → proof.', { d: 2 }),
          mc('Some delivered goods were damaged and returned. Which document does the supplier send?', ['Credit note', 'Purchase order', 'Receipt', 'Delivery note'], 'Credit note reduces the amount owed.', { d: 1 }),
        ],
      }),
      topic({
        id: 'ent-finance', title: 'Profit, break-even, cash flow and statements', summary: 'Revenue, costs, profit, break-even, cash flow forecasts, statements and ratios.',
        notes: `
## Key formulas
| | |
|---|---|
| Revenue = selling price × units sold | Total costs = fixed + variable |
| Gross profit = revenue − cost of sales | Net profit = gross profit − expenses |
| Break-even (units) = fixed costs ÷ (selling price − variable cost per unit) | Margin of safety = actual sales − break-even |
| Net cash flow = inflows − outflows | Closing balance = opening + net cash flow |

## Financial statements
- **Statement of comprehensive income** (income statement): revenue, cost of sales, gross profit, expenses, net profit.
- **Statement of financial position**: non-current assets, current assets, current liabilities, non-current liabilities, net assets, capital.

## Ratios
| Ratio | Formula | Meaning |
|---|---|---|
| Gross profit margin | GP ÷ revenue × 100 | Profitability of trading |
| Net profit margin | NP ÷ revenue × 100 | Overall profitability |
| **Current ratio** (liquidity) | current assets ÷ current liabilities | Ideal around 1.5-2 : 1 |
| **Liquid capital ratio (acid test)** | (current assets − inventory) ÷ current liabilities | Ideal around 1 : 1 |

## Sources of finance
Owner's capital, retained profit, loans, overdraft, trade credit, crowdfunding, grants, leasing/hire purchase, venture capital/business angels.
`,
        keyPoints: ['Revenue, costs and profit formulas', 'Break-even = FC ÷ (P − VC)', 'Closing = opening + net cash flow', 'Current ratio = CA ÷ CL (~1.5-2)', 'Acid test = (CA − stock) ÷ CL (~1)', 'GPM and NPM measure profitability'],
        generators: ['bus-revenue', 'bus-costs', 'bus-profit', 'bus-breakeven', 'bus-mos', 'bus-cashflow', 'bus-gpm', 'bus-npm'],
        flashcards: cards([['Current ratio formula?', 'Current assets ÷ current liabilities'], ['Acid test (liquid capital) ratio formula?', '(Current assets − inventory) ÷ current liabilities'], ['Ideal current ratio?', 'About 1.5 : 1 to 2 : 1'], ['Statement of comprehensive income shows...', 'Revenue, costs and profit over a period.']]),
        questions: [
          num('Current assets £30,000 (including £12,000 inventory); current liabilities £15,000. Calculate the acid test ratio.', 1.2, '(30,000 − 12,000) ÷ 15,000 = 1.2.', { d: 3 }),
          num('Current assets £24,000; current liabilities £12,000. Calculate the current ratio.', 2, '24,000 ÷ 12,000 = 2 : 1.', { d: 2 }),
          tf('An acid test ratio of 0.4 suggests the business could struggle to pay short-term debts.', true, 'Below about 1 means liquid assets don\'t cover short-term liabilities.', { d: 3 }),
        ],
        examQuestions: [examQ('A micro-enterprise selling handmade candles has a cash-flow forecast showing a negative closing balance in November and December. Assess two ways it could improve its cash flow.', 8, ['Option 1 explained (e.g. arrange an overdraft) with impact and drawback (interest)', 'Option 2 explained (e.g. ask customers for deposits / reduce stock purchases)', 'Applied to a candle business and seasonal demand', 'Balanced assessment and justified conclusion'], { meta: 'Component 3 style', time: 10 })],
      }),
    ],
  },
];

