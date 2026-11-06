// Unlimited written exam practice: exam-style prompts built from each topic's own content, with level-based mark
// schemes in the style of the board. They are practice prompts (not real past papers) and never appear in mocks.
//   English Language - descriptive, narrative and viewpoint writing tasks (Paper 1 Q5, Paper 2 Q5)
//   English Literature - essay questions on characters, themes and poems, some starting from a key quotation
//   History - describe two features, explain the importance, narrative account, how far do you agree
//   Business / Enterprise - explain, analyse and evaluate a decision in an original business context
//   Creative iMedia - explain planning documents and legal issues for a client and product
//   Sciences - describe a process or practical (marked on its steps), and explain a key term with an example
import type { ExamQuestion, Subject, Topic, Unit } from './types';
import { getTopic } from './registry';
import { BIOLOGY_DEEP } from './deep/biology';
import { CHEMISTRY_DEEP } from './deep/chemistry';
import { PHYSICS_DEEP } from './deep/physics';
import { IMEDIA_DEEP } from './deep/imedia';
import type { DeepBank } from './deep/types';

const SCI: Record<string, DeepBank> = { biology: BIOLOGY_DEEP, chemistry: CHEMISTRY_DEEP, physics: PHYSICS_DEEP };
const Q = (q: string, marks: number, markScheme: string[], meta: string, guidance?: string[], time?: number): ExamQuestion => ({ q, marks, markScheme, meta: `Practice prompt · ${meta}`, guidance, time: time ?? Math.round(marks * 1.2) });

// ---------------- English Language ----------------
const SCENES = [
  'a busy train station at rush hour', 'a beach the morning after a storm', 'an abandoned fairground in winter', 'a city street during a power cut',
  'a market just before it closes', 'a forest at dawn', 'a school corridor after everyone has gone home', 'a hospital waiting room at night',
  'a mountain village in heavy snow', 'a crowded festival as a thunderstorm begins', 'an old library that nobody visits', 'a harbour at sunset',
  'a motorway service station at 3 a.m.', 'a garden in the middle of a heatwave', 'a football stadium after the final whistle', 'a derelict house on a hill',
  'a bustling kitchen in a restaurant', 'a frozen lake', 'a village fête', 'an airport departure lounge during a long delay',
];
const STORIES = [
  'a story about a journey that does not go to plan', 'a story that begins with a knock at the door', 'a story about a secret that is finally revealed',
  'a story set in a place you once knew well', 'a story about someone who has to make a difficult choice', 'the opening part of a story about a stranger arriving in a small town',
  'a story with the title "The Last Message"', 'a story about getting lost', 'a story that ends with the words "...and nothing was ever the same again."',
  'a story about a rivalry between two friends', 'the opening of a story set during a storm', 'a story about finding something that should not be there',
  'a story about a day when everything changed', 'a story told by an object that has seen many years', 'a story about a promise that is broken',
];
const VIEWS: [string, string][] = [
  ['"Young people today spend far too much time on their phones. Schools should ban them completely."', 'an article for a broadsheet newspaper'],
  ['"Homework is a waste of time and should be scrapped."', 'a letter to your headteacher'],
  ['"Zoos are cruel and have no place in the modern world."', 'an article for a magazine'],
  ['"Everyone should have to do a year of volunteering after leaving school."', 'a speech to be delivered to your year group'],
  ['"Fast fashion is destroying the planet, and we are all to blame."', 'a blog post'],
  ['"Celebrities have a duty to be good role models."', 'an article for a newspaper'],
  ['"The voting age should be lowered to sixteen."', 'a letter to your local MP'],
  ['"Exams are not the best way to judge what young people can do."', 'a speech for a debate'],
  ['"Cars should be banned from all town and city centres."', 'an article for your local newspaper'],
  ['"Travel broadens the mind, but tourism is ruining the places we love."', 'a travel magazine article'],
  ['"Professional footballers are paid far too much money."', 'a newspaper article'],
  ['"Reality television does more harm than good."', 'an article for a website aimed at teenagers'],
  ['"Every school should start at 10 a.m. so that teenagers can sleep."', 'a letter to the governors of your school'],
  ['"We should stop eating meat to protect the environment."', 'a speech to a youth conference'],
  ['"Social media has made us lonelier than ever."', 'a broadsheet article'],
];
const WRITING_SCHEME = [
  'Content and organisation (24 marks): Level 4 (19-24) compelling, convincing communication; register assuredly matched to purpose and audience; extensive, ambitious vocabulary; fluently linked paragraphs and inventive structure',
  'Level 3 (13-18): consistent, clear communication; register clearly matched; increasingly sophisticated vocabulary and phrasing; coherent paragraphs with integrated discourse markers',
  'Level 2 (7-12): some success; attempts to match register; vocabulary chosen for effect; some use of paragraphs and linking',
  'Technical accuracy (16 marks): Level 4 (13-16) sentence demarcation consistently secure; wide range of punctuation used with a high level of accuracy; full range of sentence forms for effect; high accuracy in spelling, including ambitious vocabulary',
  'Level 3 (9-12): sentence demarcation mostly secure; range of punctuation mostly successful; variety of sentence forms; generally accurate spelling',
];
function englishLanguage(topic: Topic): ExamQuestion[] {
  const out: ExamQuestion[] = [];
  const desc = () => SCENES.map((s) => Q(`Write a description suggested by this scene: **${s}**.\n\n*(24 marks for content and organisation, 16 marks for technical accuracy)*`, 40, WRITING_SCHEME, 'AQA Paper 1 Q5 style', ['Plan for 5 minutes: zoom in from the wide view to small details, and back out again.', 'Use all five senses and one or two precise images – not a list of similes.', 'Vary sentence openings and lengths; leave 5 minutes to check SPaG.'], 45));
  const story = () => STORIES.map((s) => Q(`Write **${s}**.\n\n*(24 marks for content and organisation, 16 marks for technical accuracy)*`, 40, WRITING_SCHEME, 'AQA Paper 1 Q5 style', ['Keep to a few characters and one main event – a story you can finish well.', 'Plan an ending first, then a hook opening, a build-up and a turning point.', 'Show feelings through actions and details; check SPaG at the end.'], 45));
  const view = () => VIEWS.map(([s, form]) => Q(`${s}\n\nWrite **${form}** in which you explain your point of view on this statement.\n\n*(24 marks for content and organisation, 16 marks for technical accuracy)*`, 40, WRITING_SCHEME, 'AQA Paper 2 Q5 style', ['Decide your view, then plan 4–5 points, including a counter-argument you dismiss.', `Use the conventions of ${form.replace(/^an? /, 'a ')} (e.g. headline, greeting, or address to the audience).`, 'Use facts, anecdotes, rhetorical questions and a strong ending that calls for action.'], 45));
  if (topic.id === 'el-p2q5') out.push(...view());
  else if (topic.id === 'el-p1q5') out.push(...desc(), ...story());
  else if (/^el-(spag|vocab)$/.test(topic.id)) out.push(...desc().filter((_, i) => i % 2 === 0), ...view().filter((_, i) => i % 2 === 0));
  return out;
}

// ---------------- English Literature ----------------
const LIT_SCHEME = [
  'Level 6 (26-30): critical, exploratory response; judicious, precise references; analysis of the writer\'s methods with subject terminology; exploration of context linked to ideas',
  'Level 5 (21-25): thoughtful, developed response; apt references integrated into interpretation; examination of methods; thoughtful consideration of context',
  'Level 4 (16-20): clear, explained response; effective references; clear explanation of methods and their effects; clear links to context',
  'Level 3 (11-15): some explained response; references used to support; some explanation of methods; some understanding of context',
  'AO4 (4 marks, Shakespeare and modern texts): accurate spelling, punctuation and grammar, with a range of vocabulary',
];
function literature(topic: Topic, unit: Unit): ExamQuestion[] {
  const out: ExamQuestion[] = [];
  const poetry = /^(pc|lr|wl)$/.test(unit.id);
  const skip = /overview|context|exam|technique|how to|answering|terms|aos|essay|extract|unseen/i.test(`${topic.id} ${topic.title}`);
  const themes = [...new Set((topic.quotes ?? []).flatMap((q) => q.themes ?? []))].slice(0, 6);
  const indicative = (extra: string[] = []) => [...LIT_SCHEME, ...topic.keyPoints.slice(0, 3).map((k) => `Indicative: ${k.replace(/\*\*/g, '')}`), ...extra];
  if (poetry && !skip) {
    for (const th of themes.length ? themes : ['conflict', 'power', 'identity']) {
      out.push(Q(`Compare how poets present **${th}** in "${topic.title}" and in **one** other poem from *${unit.title}*.`, 30, indicative(['Comparison is sustained: similarities and differences in ideas and methods']), 'AQA Paper 2 Section B style', ['Choose the second poem for a clear point of comparison.', 'Write about both poems in every paragraph: idea → method → effect → context.'], 45));
    }
    return out;
  }
  // theme topics give one essay per theme; character topics one per character; plot, context and overview topics
  // rely on their quotations instead
  const title = topic.title.replace(/\s*\((character|play|novel)\)\s*/i, '');
  const listOf = (t: string) => t.split(/,|\band\b/).map((x) => x.trim()).filter((x) => x && !/context|past questions|exam/i.test(x));
  if (/^themes?\b/i.test(title) && title.includes(':')) {
    for (const th of listOf(title.split(':')[1])) out.push(Q(`How does the writer present ideas about **${th}** in *${unit.title}*?\n\nWrite about the text as a whole and the writer's methods.`, 30, indicative(), 'AQA Literature essay style', ['Plan 3–4 points that trace the idea through the whole text.', 'Each paragraph: a precise reference, the method, its effect, and a link to context.'], 45));
  } else if (!skip && !/plot|structure|overview|themes|symbols|allegory/i.test(title)) {
    for (const who of listOf(title)) out.push(Q(`How does the writer present the character of **${who}** in *${unit.title}*?\n\nWrite about the text as a whole and the writer's methods.`, 30, indicative(), 'AQA Literature essay style', ['Track how the character changes across the text.', 'Each paragraph: a precise reference, the method, its effect, and a link to the writer\'s purpose and context.'], 45));
  }
  for (const qt of (topic.quotes ?? []).slice(0, 8)) {
    const th = qt.themes?.[0];
    if (!th) continue;
    out.push(Q(`Starting with the quotation "${qt.text}"${qt.who ? ` (${qt.who})` : ''}, explore how the writer presents **${th}** in *${unit.title}*.`, 30, indicative([`Indicative: ${qt.analysis.replace(/\*\*/g, '')}`]), 'AQA Literature essay style', ['Analyse the quotation closely first, then move to other parts of the text.'], 45));
  }
  return out;
}

// ---------------- History ----------------
const HIST_LEVELS_16 = ['Level 4 (13-16): complex explanation, sustained judgement; precise, well-selected knowledge', 'Level 3 (9-12): developed explanation of more than one factor; judgement with some justification', 'Level 2 (5-8): simple explanation; some accurate knowledge', 'Considers the stated factor AND at least one other', 'Reaches a clear, justified conclusion'];
function history(topic: Topic, unit: Unit, unitEvents: { date: string; event: string; title: string }[]): ExamQuestion[] {
  const out: ExamQuestion[] = [];
  if (/technique|answering|sources|interpretation/i.test(`${topic.id} ${topic.title}`)) return out;
  const ev = topic.timeline ?? [];
  const kp = topic.keyPoints.slice(0, 4).map((k) => `Indicative: ${k.replace(/\*\*/g, '')}`);
  out.push(Q(`Describe **two** features of ${lower(topic.title)}.`, 4, ['Feature 1 identified (1)', 'Supporting information for feature 1 (1)', 'Feature 2 identified (1)', 'Supporting information for feature 2 (1)', ...kp], 'Edexcel/AQA "describe two features" style', ['Two separate features; give a specific detail for each – dates, names, numbers.'], 5));
  for (const e of ev) {
    out.push(Q(`Explain the importance of **${tidy(e.event)}** (${e.date}) for ${lower(topic.title)}.`, 8, ['Level 3 (6-8): analytical explanation of importance, showing consequences', 'Level 2 (3-5): simple explanation with some accurate knowledge', 'Explains what changed as a result', 'Links to the wider period', ...kp], 'Edexcel "explain the importance" style', ['Say what happened, then what it LED TO – short term and long term.'], 10));
    out.push(Q(`"${cap(tidy(e.event))} (${e.date}) was the most important turning point in ${lower(unit.title)}."\n\nHow far do you agree? Explain your answer.`, 16, [...HIST_LEVELS_16, ...unitEvents.filter((u) => u.event !== e.event).slice(0, 3).map((u) => `Alternative turning point: ${tidy(u.event)} (${u.date})`)], 'Edexcel/AQA "how far do you agree" style', ['Argue for the stated event, then against with at least one other turning point, then judge.'], 20));
  }
  if (ev.length >= 2) {
    const pair = ev.slice(0, 2).map((e) => tidy(e.event)).join('; ');
    out.push(Q(`Write a narrative account analysing the key events of ${lower(topic.title)}.\n\nYou may use the following in your answer: ${pair}. You must also use information of your own.`, 8, ['Level 3 (6-8): analytical narrative showing how events led to one another', 'Organised, logical sequence of events', 'Accurate, relevant knowledge beyond the stimulus points', ...kp], 'Edexcel "narrative account" style', ['Use connectives of consequence: "this led to", "as a result", "which meant".'], 10));
  }
  return out;
}

// ---------------- Business / Enterprise ----------------
const BUSINESSES = [
  'Fresh Crust, a family bakery in Leeds', 'PedalPower, a bicycle repair shop', 'Glow, a small online skincare brand', 'Byte Size, a mobile phone repair start-up',
  'Harbour View, an independent hotel in Cornwall', 'GreenBox, a vegetable delivery service', 'Stitch & Co, a clothing manufacturer', 'Kickstart Gym, a fitness centre',
  'Paws Café, a dog-friendly coffee shop', 'BrightSpark, an electrical contractor', 'Peak Outdoors, a camping equipment retailer', 'Little Learners, a private nursery',
];
const DECISIONS: Record<string, string[]> = {
  'bus-enterprise': ['set SMART objectives for its first year', 'aim for growth rather than survival in its second year'],
  'bus-ownership': ['change from a sole trader to a private limited company', 'become a franchise of a national chain'],
  'bus-stakeholders': ['move to a cheaper location out of town', 'open late to meet customer demand, despite neighbours\' complaints'],
  'bus-growth': ['grow by opening a second branch (organic growth)', 'take over a smaller competitor'],
  'bus-external': ['switch to fully recyclable packaging even though it costs more', 'start selling online through its own website'],
  'bus-competition': ['cut prices after a large competitor opened nearby', 'develop a unique selling point to stand out'],
  'bus-ops': ['switch to just-in-time stock control', 'move from job production to batch production', 'introduce quality assurance at every stage'],
  'bus-hr': ['introduce a staff bonus scheme', 'remove a layer of management', 'spend more on staff training'],
  'bus-research': ['carry out primary market research before launching a new product', 'target a new market segment of older customers'],
  'bus-mix': ['use penetration pricing for its new product', 'spend more on social media promotion', 'use an extension strategy for its best-selling product'],
  'bus-sources': ['fund its expansion with a bank loan', 'raise finance through crowdfunding', 'use retained profit to buy new equipment'],
  'bus-costs': ['raise its prices to increase its margin of safety', 'reduce variable costs by changing supplier'],
  'bus-cash': ['offer customers 60 days\' trade credit', 'arrange an overdraft to cover a cash-flow shortfall'],
  'bus-performance': ['improve its net profit margin by cutting costs', 'invest in new equipment with an ARR of 12%'],
  'ent-promotion': ['use influencer marketing to reach younger customers', 'spend its promotion budget on leaflets rather than online adverts'],
  'ent-market': ['charge a premium price because of its quality', 'carry out a survey of local customers'],
  'ent-finance': ['lower its break-even point by reducing fixed costs', 'take out a loan to buy stock'],
  'ent-pitch': ['pitch its idea to investors before launching'],
  'ent-types': ['stay a micro enterprise rather than expanding'],
};
const BUS_EVAL = ['Level 3 (7-9): detailed knowledge applied to the business context; developed chains of reasoning on both sides; justified judgement', 'Level 2 (4-6): sound knowledge applied; some developed reasoning; some attempt at a judgement', 'Level 1 (1-3): limited knowledge and application', 'Uses the business context throughout', 'Concludes with a judgement that answers "should they?" and says what it depends on'];
function business(topic: Topic, n: number): ExamQuestion[] {
  const ds = DECISIONS[topic.id];
  if (!ds) return [];
  const out: ExamQuestion[] = [];
  BUSINESSES.forEach((biz, i) => {
    const d = ds[(i + n) % ds.length];
    out.push(Q(`${biz}, is considering whether to **${d}**.\n\nEvaluate whether ${biz.split(',')[0]} should do this. You should use the information provided as well as your knowledge of business.`, 9, BUS_EVAL, 'GCSE Business "evaluate" style', ['Advantage → because → which means (in this context).', 'Disadvantage → because → which means.', 'Judgement: yes/no, the deciding factor, and "it depends on…".'], 11));
    out.push(Q(`Analyse the impact on ${biz.split(',')[0]} of deciding to **${d}**.`, 6, ['Level 2 (4-6): developed chains of reasoning applied to the business', 'Level 1 (1-3): simple statements of impact', 'Shows a positive or negative effect on costs, revenue, customers or staff', 'Uses the context of the business'], 'GCSE Business "analyse" style', ['One impact, developed with at least two linked "which means" steps.'], 7));
  });
  return out;
}

// ---------------- Creative iMedia ----------------
const PRODUCTS = ['a promotional video for a new skate park', 'a website for a local theatre', 'an app for a museum', 'a poster campaign for a music festival', 'a short animated advert for a cereal brand', 'a podcast for a sports club', 'a magazine cover for a gaming magazine', 'a digital game for primary school children'];
function imedia(topic: Topic): ExamQuestion[] {
  const facts = IMEDIA_DEEP[topic.id]?.facts ?? [];
  if (!facts.length || /guide/.test(topic.id)) return [];
  const out: ExamQuestion[] = [];
  facts.forEach(([term, def, ex], i) => {
    const product = PRODUCTS[i % PRODUCTS.length];
    out.push(Q(`A media company is producing **${product}**. Explain how **${term}** would be relevant when creating this product.`, 4, [`Knowledge: ${term} – ${def} (1)`, 'Applied to the product and its client or audience (1)', 'Developed explanation of why it matters for this product (1)', 'Further development or example (1)', ...(ex ? [`Indicative example: ${ex}`] : [])], 'OCR R093 "explain" style', ['Define it, then apply it to THIS product – generic answers lose marks.'], 5));
  });
  return out;
}

// ---------------- Sciences ----------------
function science(topic: Topic, subject: Subject): ExamQuestion[] {
  const bank = SCI[subject.id]?.[topic.id];
  if (!bank) return [];
  const out: ExamQuestion[] = [];
  for (const p of bank.steps ?? []) {
    out.push(Q(`Describe ${p.name}.`, 6, ['Level 3 (5-6): a coherent, logically ordered description covering the key steps', 'Level 2 (3-4): most steps, mostly in order', 'Level 1 (1-2): a few relevant steps', ...p.steps.map((s, i) => `Step ${i + 1}: ${s}`)], 'AQA 6-mark "describe" style', ['Write the steps in order as numbered points or connected sentences.'], 7));
  }
  for (const [term, def, ex] of bank.facts) {
    out.push(Q(`Explain what is meant by **${term}**${ex ? ' and give an example' : ''}.`, ex ? 2 : 1, [`${def} (1)`, ...(ex ? [`Example: ${ex} (1)`] : [])], 'AQA short-answer style', undefined, 2));
  }
  return out;
}

/** "The Cold War" → "the Cold War"; other titles start with a name or a proper noun, so they keep their capital */
const lower = (s: string) => (/^(The|A|An)\s/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const tidy = (s: string) => s.replace(/\*\*/g, '').replace(/[.:;]\s*$/, '');

const cache = new Map<string, ExamQuestion[]>();
/** All practice prompts for a topic (stable order) */
export function practicePrompts(topicId: string): ExamQuestion[] {
  if (cache.has(topicId)) return cache.get(topicId)!;
  const ref = getTopic(topicId);
  let list: ExamQuestion[] = [];
  if (ref) {
    const { subject, unit, topic } = ref;
    const unitEvents = unit.topics.flatMap((t) => (t.timeline ?? []).map((e) => ({ ...e, title: t.title })));
    switch (subject.id) {
      case 'english-language': list = englishLanguage(topic); break;
      case 'english-literature': list = literature(topic, unit); break;
      case 'history': list = history(topic, unit, unitEvents); break;
      case 'business': list = business(topic, 0); break;
      case 'imedia': list = imedia(topic); break;
      case 'biology': case 'chemistry': case 'physics': list = science(topic, subject); break;
      default: list = [];
    }
  }
  cache.set(topicId, list);
  return list;
}
export const practicePrompt = (topicId: string, n: number): ExamQuestion | undefined => {
  const list = practicePrompts(topicId);
  return list.length ? list[((n % list.length) + list.length) % list.length] : undefined;
};
