// Fact-table generators for Business, BTEC Enterprise, Creative iMedia and English Language. Wrong options are
// always other members of the same category (other pricing strategies, other file formats, other techniques...).
import type { Generator, GeneratedQuestion } from '../types';
import { cap, mcq, pick } from './facts-kit';

const G = (id: string, title: string, make: Generator['make']): Generator => ({ id, title, make });

/** A two-way table: ask "which X is described by Y?" or "what is X?" with same-table distractors */
function table(rand: () => number, rows: readonly (readonly [string, string])[], noun: string, askDesc: (term: string) => string, why = (t: string, d: string) => `${cap(t)}: ${d}.`, d = 2): GeneratedQuestion {
  const [term, desc] = pick(rand, rows);
  if (rand() < 0.55) return mcq(rand, `Which ${noun} matches this description?\n\n> ${cap(desc)}`, term, rows.filter((r) => r[0] !== term).map((r) => r[0]), [why(term, desc)], d);
  return mcq(rand, askDesc(term), desc, rows.filter((r) => r[0] !== term).map((r) => r[1]), [why(term, desc)], d);
}

/** "Which of these is an example of A?" one from A, three from the other groups */
function classify(rand: () => number, groups: Record<string, string[]>, label: (g: string) => string, explain: string, d = 2): GeneratedQuestion {
  const names = Object.keys(groups);
  const g = pick(rand, names);
  const ans = pick(rand, groups[g]);
  const wrong = names.filter((n) => n !== g).flatMap((n) => groups[n]);
  return mcq(rand, `Which of these is ${label(g)}?`, ans, wrong, [explain, `${cap(ans)}: ${g}.`], d);
}

// ---------------- Business ----------------
const PRICING = [
  ['price skimming', 'setting a high price when a new product is launched, then lowering it later'],
  ['penetration pricing', 'setting a low price to win market share quickly, then raising it'],
  ['competitive pricing', 'setting a price close to competitors\' prices'],
  ['cost-plus pricing', 'adding a percentage mark-up to the cost of making each product'],
  ['psychological pricing', 'setting prices just below a round number, such as £9.99'],
  ['promotional pricing', 'temporarily reducing the price to boost sales'],
] as const;
const PROMO = [
  ['advertising', 'paying to put a message in media such as TV, posters or social media'],
  ['sales promotion', 'short-term incentives such as "buy one get one free" or discount codes'],
  ['sponsorship', 'paying to have the brand linked with an event, team or programme'],
  ['public relations', 'gaining free, positive media coverage, e.g. through a press release'],
  ['product placement', 'paying for a product to appear in a film or TV programme'],
  ['direct marketing', 'sending messages straight to individual customers, e.g. targeted emails'],
] as const;
const OWNERSHIP = [
  ['sole trader', 'one owner who has unlimited liability'],
  ['partnership', 'two or more owners who share the profits, usually with unlimited liability'],
  ['private limited company (Ltd)', 'owned by shareholders, but shares cannot be sold to the general public'],
  ['public limited company (plc)', 'shares can be bought and sold by the public on the stock exchange'],
  ['franchise', 'a business that pays to use another firm\'s brand name and business model'],
  ['social enterprise', 'a business that reinvests its profits to achieve social or environmental aims'],
] as const;
const PRODUCTION = [
  ['job production', 'one-off products made to each customer\'s exact requirements'],
  ['batch production', 'groups of identical products made together before switching to a different product'],
  ['flow production', 'continuous production of large numbers of identical products on a production line'],
  ['just-in-time (JIT)', 'stock arrives only when it is needed, so little stock is held'],
  ['just-in-case (JIC)', 'large buffer stocks are kept in case of unexpected demand or supply problems'],
] as const;
const STAKE = [
  ['shareholders', 'high profits, dividends and a rising share price'],
  ['employees', 'job security, good pay and good working conditions'],
  ['customers', 'good-quality products at fair prices'],
  ['suppliers', 'regular orders and being paid on time'],
  ['the local community', 'local jobs and little pollution, noise or traffic'],
  ['the government', 'tax revenue, employment and businesses obeying the law'],
] as const;
const MOTIVATION = [
  ['commission', 'a payment for each sale an employee makes'],
  ['a bonus', 'a one-off extra payment for meeting a target'],
  ['piece rate', 'pay based on the number of items an employee produces'],
  ['profit sharing', 'staff receive a share of the business\'s profits'],
  ['job rotation', 'employees move between different tasks to reduce boredom'],
  ['job enrichment', 'giving employees more responsibility and more challenging work'],
  ['job enlargement', 'giving employees extra tasks at the same level'],
  ['flexible working', 'letting employees choose some of their working hours'],
] as const;
const TRAINING = [
  ['induction training', 'introduces new employees to the business, its rules and their colleagues'],
  ['on-the-job training', 'learning while doing the job, e.g. shadowing an experienced employee'],
  ['off-the-job training', 'training away from the workplace, e.g. a college course'],
  ['internal recruitment', 'filling a vacancy with someone who already works for the business'],
  ['external recruitment', 'filling a vacancy with someone from outside the business'],
] as const;
const ECONOMY = [
  ['interest rates rise', 'borrowing becomes more expensive and consumers tend to spend less'],
  ['unemployment rises', 'consumer incomes fall, so demand for luxury products falls'],
  ['the value of the pound rises', 'imports become cheaper and exports become more expensive'],
  ['consumer incomes rise', 'demand for luxury products increases'],
  ['the National Minimum Wage rises', 'labour costs rise for businesses with low-paid staff'],
  ['inflation rises', 'costs of materials rise and customers\' money buys less'],
] as const;
const GROWTH = [
  ['organic growth', 'growing by opening new branches, launching new products or entering new markets'],
  ['a merger', 'two businesses agree to join together to form one business'],
  ['a takeover', 'one business buys a controlling share of another business'],
  ['horizontal integration', 'joining with a business at the same stage of production in the same industry'],
  ['backward vertical integration', 'joining with a supplier'],
  ['forward vertical integration', 'joining with a business closer to the customer, such as a retailer'],
] as const;
const FINANCE = {
  'an internal source of finance': ['retained profit', 'selling unwanted assets', 'the owner\'s own savings'],
  'an external source of finance': ['a bank loan', 'an overdraft', 'issuing new shares', 'crowdfunding', 'trade credit', 'a loan from family and friends'],
};
const RESEARCH = {
  'primary research': ['a questionnaire', 'a focus group', 'observing shoppers in store', 'a telephone interview', 'a product trial (test marketing)'],
  'secondary research': ['government statistics', 'a published market report', 'competitors\' websites', 'newspaper articles', 'internet research'],
};

// ---------------- BTEC Enterprise ----------------
const ENT_DOCS = [
  ['purchase order', 'sent by a business to a supplier to order goods'],
  ['delivery note', 'sent with the goods so the buyer can check what has arrived'],
  ['invoice', 'requests payment for goods or services that have been supplied'],
  ['credit note', 'issued when goods are returned or the buyer has been overcharged'],
  ['statement of account', 'a summary of all transactions with a customer over a period'],
  ['receipt', 'proof that payment has been made'],
] as const;
const ENT_PAY = [
  ['cash (notes and coins)', 'immediate payment with no fees, but it can be lost or stolen'],
  ['debit card payment', 'money is taken straight from the customer\'s bank account'],
  ['credit card payment', 'the customer borrows money and pays the card company back later'],
  ['direct debit arrangement', 'regular payments that the business collects from the customer\'s account'],
  ['contactless or mobile payment', 'quick tap-to-pay using a card, phone or watch'],
] as const;

// ---------------- iMedia ----------------
const FILES = [
  ['JPEG', 'image', 'a compressed (lossy) image format, good for photographs on websites'],
  ['PNG', 'image', 'a lossless image format that supports transparency'],
  ['GIF', 'image', 'an image format limited to 256 colours that supports simple animation'],
  ['TIFF', 'image', 'a high-quality image format often used for printing'],
  ['BMP', 'image', 'an uncompressed bitmap image format with large file sizes'],
  ['SVG', 'image', 'a vector format that scales to any size without losing quality'],
  ['PSD', 'image', 'a Photoshop project file that keeps all the layers'],
  ['MP3', 'audio', 'a compressed (lossy) audio format with small file sizes'],
  ['WAV', 'audio', 'an uncompressed audio format with high quality and large files'],
  ['MP4', 'video', 'a widely used compressed video format, good for streaming and social media'],
  ['MOV', 'video', 'Apple QuickTime\'s video format'],
  ['PDF', 'document', 'keeps the layout of a document the same on any device'],
] as const;
const IM_LAW = [
  ['copyright', 'using a song in a video without the permission of the person who owns it'],
  ['data protection (UK GDPR)', 'storing customers\' names and email addresses collected in a competition'],
  ['defamation (libel)', 'a blog post that falsely claims a local café gives people food poisoning'],
  ['privacy and consent (release forms)', 'filming identifiable members of the public for an advert'],
  ['trademarks', 'putting another company\'s logo on your own product'],
  ['PEGI age ratings', 'giving a new video game an age rating for sale in the UK and Europe'],
  ['BBFC classification', 'giving a film an age rating before it is shown in UK cinemas'],
  ['the ASA (Advertising Standards Authority)', 'an advert that makes misleading claims about a product'],
  ['health and safety (risk assessment)', 'checking a location for hazards before filming there'],
] as const;
const IM_DOCS = [
  ['mind map', 'generating and linking initial ideas around a central theme'],
  ['mood board', 'a collection of images, colours and textures that shows the intended look and feel'],
  ['storyboard', 'a sequence of sketches showing each shot or scene, with timings and camera directions'],
  ['script', 'the dialogue and directions for the actors and crew'],
  ['visualisation diagram', 'an annotated sketch of the layout of a still image such as a poster'],
  ['wireframe', 'a basic layout of a web page or app screen showing where each element goes'],
  ['flowchart', 'the sequence of steps or decisions, e.g. how a user moves through an interactive product'],
  ['work plan', 'the tasks, timescales, milestones and contingency time for a project'],
  ['asset log', 'a record of every asset used, where it came from and its copyright status'],
  ['recce', 'a visit to a location before filming to check it is suitable'],
] as const;
const IM_SHOTS = [
  ['extreme close-up', 'shows a tiny detail, such as a character\'s eyes, to build intensity'],
  ['close-up', 'shows a character\'s face to reveal their emotions'],
  ['medium shot', 'shows a person from the waist up, often used for conversations'],
  ['long shot', 'shows a whole person and their surroundings'],
  ['establishing shot', 'shows where the scene takes place at the start of a scene'],
  ['high-angle shot', 'looks down on the subject, making them seem weak or vulnerable'],
  ['low-angle shot', 'looks up at the subject, making them seem powerful'],
  ['point-of-view shot', 'shows exactly what a character sees'],
  ['pan', 'the camera turns horizontally from a fixed position'],
  ['tilt', 'the camera turns up or down from a fixed position'],
  ['tracking shot', 'the camera moves alongside the subject as it moves'],
] as const;
const IM_ROLES = [
  ['director', 'has the creative vision and directs the actors and crew'],
  ['producer', 'manages the budget, schedule and resources for the whole project'],
  ['scriptwriter', 'writes the dialogue and directions'],
  ['camera operator', 'operates the camera to capture the shots'],
  ['editor', 'assembles the footage and adds transitions and effects in post-production'],
  ['sound engineer', 'records, mixes and balances the audio'],
  ['graphic designer', 'creates visual assets such as logos, layouts and posters'],
  ['web developer', 'builds and codes the website'],
] as const;

// ---------------- English Language: identify the technique ----------------
// Each example uses one technique clearly; its wrong options are techniques it definitely does NOT contain.
const TECH: [string, string, string[]][] = [
  ['The classroom was a zoo by the time the supply teacher arrived.', 'metaphor', ['simile', 'personification', 'onomatopoeia', 'alliteration']],
  ['Her voice was as sharp as broken glass.', 'simile', ['metaphor', 'personification', 'hyperbole', 'oxymoron']],
  ['The old house groaned and sighed in the wind.', 'personification', ['simile', 'oxymoron', 'rhetorical question', 'alliteration']],
  ['Crash! The plates hit the floor and the dog yelped.', 'onomatopoeia', ['simile', 'metaphor', 'oxymoron', 'rhetorical question']],
  ['Silent snow settled softly on the sleeping street.', 'sibilance', ['onomatopoeia', 'metaphor', 'rhetorical question', 'juxtaposition']],
  ['Big, bold and beautifully built, the bridge dominated the bay.', 'alliteration', ['simile', 'oxymoron', 'rhetorical question', 'onomatopoeia']],
  ['I\'ve told you a million times to tidy your room.', 'hyperbole', ['simile', 'oxymoron', 'onomatopoeia', 'sibilance']],
  ['It was a deafening silence.', 'oxymoron', ['simile', 'onomatopoeia', 'alliteration', 'rhetorical question']],
  ['Can we really afford to ignore the warning signs any longer?', 'rhetorical question', ['simile', 'metaphor', 'onomatopoeia', 'oxymoron']],
  ['The plan is simple, cheap and effective.', 'triplet (rule of three)', ['simile', 'oxymoron', 'onomatopoeia', 'rhetorical question']],
  ['As the funeral procession passed, children laughed in the playground next door.', 'juxtaposition', ['simile', 'onomatopoeia', 'oxymoron', 'rhetorical question']],
  ['Dark clouds gathered over the town as the news of the disaster spread.', 'pathetic fallacy', ['simile', 'oxymoron', 'rhetorical question', 'onomatopoeia']],
  ['The soldiers advanced; shells exploded; the trenches were a battlefield of mud.', 'semantic field', ['simile', 'oxymoron', 'rhetorical question', 'onomatopoeia']],
  ['You deserve better. You deserve a safer town.', 'direct address', ['simile', 'oxymoron', 'onomatopoeia', 'pathetic fallacy']],
  ['Act now. Sign the petition today.', 'imperative', ['simile', 'oxymoron', 'onomatopoeia', 'pathetic fallacy']],
  ['Over 70% of teenagers say they feel tired at school.', 'statistic', ['anecdote', 'simile', 'oxymoron', 'onomatopoeia']],
  ['Last summer, my neighbour waited four hours in A&E with a broken arm.', 'anecdote', ['statistic', 'simile', 'oxymoron', 'onomatopoeia']],
  ['Dr Patel, a leading sleep scientist, says schools start too early.', 'expert opinion', ['anecdote', 'statistic', 'simile', 'onomatopoeia']],
  ['We will not give up. We will not give in. We will not be silenced.', 'repetition (anaphora)', ['simile', 'oxymoron', 'onomatopoeia', 'pathetic fallacy']],
  ['Innocent children are left cold, hungry and terrified.', 'emotive language', ['simile', 'statistic', 'onomatopoeia', 'oxymoron']],
  ['Some say homework is pointless. They are wrong.', 'counter-argument', ['simile', 'onomatopoeia', 'oxymoron', 'pathetic fallacy']],
  ['Run.', 'one-word (minor) sentence', ['complex sentence', 'compound sentence', 'simile', 'oxymoron']],
  ['Although the rain had stopped, the streets were still flooded.', 'complex sentence', ['simple sentence', 'minor sentence', 'simile', 'rhetorical question']],
  ['The wind howled and the rain lashed the windows.', 'compound sentence', ['simple sentence', 'minor sentence', 'oxymoron', 'rhetorical question']],
  ['Time is a thief.', 'metaphor', ['simile', 'oxymoron', 'onomatopoeia', 'rhetorical question']],
  ['He moved like a ghost through the crowd.', 'simile', ['metaphor', 'oxymoron', 'onomatopoeia', 'rhetorical question']],
  ['The sun smiled down on the picnic.', 'personification', ['simile', 'oxymoron', 'onomatopoeia', 'statistic']],
];

function techQ(rand: () => number): GeneratedQuestion {
  const [ex, ans, wrong] = pick(rand, TECH);
  return mcq(rand, `Which technique is used here?\n\n> ${ex}`, ans, wrong, [`This is ${/^[aeiou]/i.test(ans) ? 'an' : 'a'} **${ans}**.`, 'In the exam, name the technique AND explain its effect on the reader - the effect earns the marks.'], 2);
}

export const FACT_OTHER_GENERATORS: Generator[] = [
  G('f-bus-pricing', 'Pricing strategies', (r) => table(r, PRICING, 'pricing strategy', (t) => `What is **${t}**?`)),
  G('f-bus-promo', 'Methods of promotion', (r) => table(r, PROMO, 'method of promotion', (t) => `What is meant by **${t}**?`)),
  G('f-bus-ownership', 'Types of business ownership', (r) => table(r, OWNERSHIP, 'type of business ownership', (t) => `Which statement describes a **${t}**?`)),
  G('f-bus-production', 'Production methods and stock control', (r) => table(r, PRODUCTION, 'production or stock control method', (t) => `What is **${t}**?`)),
  G('f-bus-stakeholders', 'Stakeholders\' objectives', (r) => table(r, STAKE, 'stakeholder group (by its main objective)', (t) => `What do **${t}** mainly want from a business?`)),
  G('f-bus-motivation', 'Motivation and pay', (r) => table(r, MOTIVATION, 'method of motivation or pay', (t) => `What is **${t}**?`)),
  G('f-bus-training', 'Training and recruitment', (r) => table(r, TRAINING, 'type of training or recruitment', (t) => `What is **${t}**?`)),
  G('f-bus-economy', 'Effects of the economy', (r) => table(r, ECONOMY, 'change in the economy (by its likely effect)', (t) => `What is the most likely effect on businesses if **${t}**?`)),
  G('f-bus-growth', 'Methods of growth', (r) => table(r, GROWTH, 'method of growth', (t) => `What is **${t}**?`)),
  G('f-bus-finance', 'Internal and external finance', (r) => classify(r, FINANCE, (g) => g, 'Internal finance comes from inside the business (profits, assets, owner\'s money); external finance comes from outside (banks, investors, suppliers, the public).')),
  G('f-bus-research', 'Primary and secondary research', (r) => classify(r, RESEARCH, (g) => `an example of ${g}`, 'Primary research is new data collected first-hand for a purpose; secondary research uses data that already exists.')),
  G('f-ent-docs', 'Financial documents', (r) => table(r, ENT_DOCS, 'financial document', (t) => `What is the purpose of a **${t}**?`)),
  G('f-ent-pay', 'Payment methods', (r) => table(r, ENT_PAY, 'payment method', (t) => `Which statement describes **${t}**?`)),
  G('f-im-files', 'File formats', (r) => {
    const [f, kind, desc] = pick(r, FILES);
    const same = FILES.filter((x) => x[1] === kind && x[0] !== f);
    const others = FILES.filter((x) => x[1] !== kind && x[0] !== f);
    if (r() < 0.55) return mcq(r, `Which file format is **${desc}**?`, f, [...same, ...others].map((x) => x[0]), [`${f}: ${desc}.`], 2);
    return mcq(r, `Which statement describes the **${f}** file format?`, desc, [...same, ...others].map((x) => x[2]), [`${f}: ${desc}.`], 2);
  }),
  G('f-im-legal', 'Legal issues in media', (r) => table(r, IM_LAW, 'legal issue or regulation (for this situation)', (t) => `Which situation involves **${t}**?`, (t, d) => `${cap(d)} → ${t}.`)),
  G('f-im-docs', 'Planning documents', (r) => table(r, IM_DOCS, 'planning document', (t) => `What does a **${t}** show or do?`)),
  G('f-im-shots', 'Camera shots and movement', (r) => table(r, IM_SHOTS, 'camera shot or movement', (t) => `What does a **${t}** do?`)),
  G('f-im-roles', 'Job roles', (r) => table(r, IM_ROLES, 'job role', (t) => `What does a **${t}** do?`)),
  G('f-el-techniques', 'Identify the technique', (r) => techQ(r)),
];

export const FACT_OTHER_TOPICS: Record<string, string[]> = {
  'bus-mix': ['f-bus-pricing', 'f-bus-promo'], 'bus-ownership': ['f-bus-ownership'], 'bus-ops': ['f-bus-production'], 'bus-stakeholders': ['f-bus-stakeholders'],
  'bus-hr': ['f-bus-motivation', 'f-bus-training'], 'bus-external': ['f-bus-economy'], 'bus-growth': ['f-bus-growth'], 'bus-sources': ['f-bus-finance'], 'bus-research': ['f-bus-research'],
  'ent-promotion': ['f-bus-promo'], 'ent-documents': ['f-ent-docs', 'f-ent-pay'], 'ent-finance': ['f-bus-finance'], 'ent-market': ['f-bus-research', 'f-bus-pricing'], 'ent-types': ['f-bus-ownership'],
  'im-files': ['f-im-files'], 'im-legal': ['f-im-legal'], 'im-planning': ['f-im-docs'], 'im-codes': ['f-im-shots'], 'im-roles': ['f-im-roles'], 'im-ideas': ['f-im-docs'], 'im-workplans': ['f-im-docs'],
  'el-methods': ['f-el-techniques'], 'el-p1q2': ['f-el-techniques'], 'el-p2q3': ['f-el-techniques'], 'el-p2q5': ['f-el-techniques'], 'lit-terms': ['f-el-techniques'],
};
