// More fact-table generators for topics that had few questions: Maths, Biology, Chemistry, Physics, Statistics,
// Creative iMedia, English Language, Business and History exam technique. Wrong options are always the same kind
// of thing as the answer (other theorems, other processes, other question types...).
import type { Generator, GeneratedQuestion } from '../types';
import { cap, mcq, numQ, pick } from './facts-kit';
import { shuffle } from '../../lib/util';

const G = (id: string, title: string, make: Generator['make'], tier?: Generator['tier']): Generator => ({ id, title, make, tier });
type Row = readonly [string, string];
/** two-way table question with same-table distractors */
function tbl(rand: () => number, rows: readonly Row[], noun: string, back: (t: string) => string, d = 2, fwd?: (desc: string) => string): GeneratedQuestion {
  const [t, desc] = pick(rand, rows);
  const why = [`${cap(t)}: ${desc}.`];
  if (rand() < 0.55) return mcq(rand, fwd ? fwd(desc) : `Which ${noun} matches this description?\n\n> ${cap(desc)}`, t, rows.filter((r) => r[0] !== t).map((r) => r[0]), why, d);
  return mcq(rand, back(t), desc, rows.filter((r) => r[0] !== t).map((r) => r[1]), why, d);
}
/** "Which of these is an example of X?" across groups */
function grp(rand: () => number, groups: Record<string, string[]>, ask: (g: string) => string, explain: string, d = 2): GeneratedQuestion {
  const names = Object.keys(groups);
  const g = pick(rand, names);
  const ans = pick(rand, groups[g]);
  return mcq(rand, ask(g), ans, names.filter((n) => n !== g).flatMap((n) => groups[n]), [explain, `${cap(ans)}: ${g}.`], d);
}
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const neg = (n: number) => (n < 0 ? `−${-n}` : String(n));

// =========================== MATHS ===========================
function fdpQ(rand: () => number, lvl: number): GeneratedQuestion {
  const dens = [2, 4, 5, 8, 10, 20, 25, 40, 50];
  const d = pick(rand, dens);
  let n = 1 + Math.floor(rand() * (d - 1));
  const g = gcd(n, d);
  const fn = n / g, fd = d / g;
  n = fn;
  const dec = n / fd;
  const pct = Math.round(dec * 10000) / 100;
  const t = rand();
  if (t < 0.34) return numQ(`Write **${fn}/${fd}** as a decimal.`, dec, [`${fn} ÷ ${fd} = ${dec}`], lvl >= 3 ? 2 : 1, undefined, ['Divide the numerator by the denominator.']);
  if (t < 0.67) return numQ(`Write **${dec}** as a percentage.`, pct, [`${dec} × 100 = ${pct}%`], 1, '%', ['Multiply by 100.']);
  const wrong = [`${fd}/${fn}`, `${fn}/${fd * 10}`, `${pct}/10`, `${fn + 1}/${fd}`, `1/${Math.round(100 / pct)}`].filter((x) => x !== `${fn}/${fd}` && !x.includes('Infinity'));
  return mcq(rand, `Write **${pct}%** as a fraction in its simplest form.`, `${fn}/${fd}`, wrong, [`${pct}% = ${pct}/100 = ${fn}/${fd} (divide top and bottom by ${100 / fd === Math.round(100 / fd) ? 100 / fd : 'the HCF'})`.replace('= 1/1', '')], 2);
}
const REARR: [string, string, string, string[]][] = [ // formula, subject, answer, wrong
  ['y = mx + c', 'x', 'x = (y − c) ÷ m', ['x = y ÷ m − c', 'x = (y + c) ÷ m', 'x = m(y − c)']],
  ['v = u + at', 'a', 'a = (v − u) ÷ t', ['a = v − u ÷ t', 'a = (v + u) ÷ t', 'a = t(v − u)']],
  ['v = u + at', 't', 't = (v − u) ÷ a', ['t = v ÷ a − u', 't = (v + u) ÷ a', 't = a(v − u)']],
  ['A = πr²', 'r', 'r = √(A ÷ π)', ['r = A ÷ π²', 'r = √A ÷ π²', 'r = (A ÷ π)²']],
  ['P = 2(l + w)', 'w', 'w = P ÷ 2 − l', ['w = P − 2l', 'w = (P − l) ÷ 2', 'w = 2P − l']],
  ['s = d ÷ t', 't', 't = d ÷ s', ['t = s ÷ d', 't = d × s', 't = s − d']],
  ['A = ½bh', 'h', 'h = 2A ÷ b', ['h = A ÷ 2b', 'h = 2b ÷ A', 'h = A − ½b']],
  ['C = 2πr', 'r', 'r = C ÷ 2π', ['r = 2πC', 'r = C − 2π', 'r = 2C ÷ π']],
  ['y = 3x − 7', 'x', 'x = (y + 7) ÷ 3', ['x = (y − 7) ÷ 3', 'x = y ÷ 3 + 7', 'x = 3(y + 7)']],
  ['E = ½mv²', 'v', 'v = √(2E ÷ m)', ['v = √(E ÷ 2m)', 'v = 2E ÷ m', 'v = (2E ÷ m)²']],
  ['F = 9C ÷ 5 + 32', 'C', 'C = 5(F − 32) ÷ 9', ['C = 5F ÷ 9 − 32', 'C = 9(F − 32) ÷ 5', 'C = (F + 32) × 5 ÷ 9']],
];
function rearrangeQ(rand: () => number): GeneratedQuestion {
  const [f, v, ans, wrong] = pick(rand, REARR);
  return mcq(rand, `Make **${v}** the subject of **${f}**.`, ans, wrong, [`Undo the operations on ${v} in reverse order, doing the same to both sides: ${ans}.`], 3, ['Use inverse operations: undo + and − first, then × and ÷, then powers.']);
}
const THEOREMS: Row[] = [
  ['the angle at the centre theorem', 'the angle at the centre is twice the angle at the circumference from the same arc'],
  ['the angle in a semicircle theorem', 'an angle drawn from the ends of a diameter to the circumference is 90°'],
  ['angles in the same segment', 'angles drawn from the same chord in the same segment are equal'],
  ['the cyclic quadrilateral theorem', 'opposite angles of a cyclic quadrilateral add up to 180°'],
  ['the tangent–radius theorem', 'a tangent meets a radius at 90°'],
  ['the two tangents theorem', 'two tangents from the same point outside a circle are equal in length'],
  ['the chord bisector theorem', 'the perpendicular from the centre to a chord bisects the chord'],
  ['the alternate segment theorem', 'the angle between a tangent and a chord equals the angle in the alternate segment'],
];
function circleQ(rand: () => number): GeneratedQuestion {
  const t = rand();
  if (t < 0.5) return tbl(rand, THEOREMS, 'circle theorem', (x) => `What does **${x}** say?`, 3);
  const k = pick(rand, ['centre', 'cyclic', 'semi'] as const);
  if (k === 'centre') { const a = 20 + Math.floor(rand() * 60); return numQ(`The angle at the circumference subtended by an arc is **${a}°**. What is the angle at the centre subtended by the same arc?`, 2 * a, [`The angle at the centre is twice the angle at the circumference: 2 × ${a}° = ${2 * a}°.`], 2, '°'); }
  if (k === 'cyclic') { const a = 60 + Math.floor(rand() * 80); return numQ(`In a cyclic quadrilateral, one angle is **${a}°**. What is the opposite angle?`, 180 - a, [`Opposite angles in a cyclic quadrilateral add up to 180°: 180° − ${a}° = ${180 - a}°.`], 2, '°'); }
  const a = 20 + Math.floor(rand() * 50);
  return numQ(`AB is a diameter of a circle and C is on the circumference. Angle CAB = **${a}°**. Find angle CBA.`, 90 - a, ['The angle in a semicircle is 90°, so angle ACB = 90°.', `Angles in a triangle add to 180°: 180° − 90° − ${a}° = ${90 - a}°.`], 3, '°');
}
function vectorQ(rand: () => number): GeneratedQuestion {
  const r = () => Math.floor(rand() * 13) - 6;
  const a = [r(), r()], b = [r(), r()];
  const k = 2 + Math.floor(rand() * 2), m = 1 + Math.floor(rand() * 2);
  const vec = (x: number[]) => `(${neg(x[0])}, ${neg(x[1])})`;
  if (rand() < 0.25) {
    const [x, y] = pick(rand, [[3, 4], [5, 12], [6, 8], [8, 15], [9, 12]]);
    return numQ(`Find the magnitude of the vector **(${x}, ${y})**.`, Math.hypot(x, y), [`|v| = √(${x}² + ${y}²) = √${x * x + y * y} = ${Math.hypot(x, y)}`], 2);
  }
  const sub = rand() < 0.5;
  const ans = [k * a[0] + (sub ? -m : m) * b[0], k * a[1] + (sub ? -m : m) * b[1]];
  const expr = `${k}**a** ${sub ? '−' : '+'} ${m === 1 ? '' : m}**b**`;
  const wrong = [
    [k * a[0] + (sub ? m : -m) * b[0], k * a[1] + (sub ? m : -m) * b[1]], [a[0] + (sub ? -m : m) * b[0], a[1] + (sub ? -m : m) * b[1]],
    [ans[1], ans[0]], [ans[0], -ans[1]], [-ans[0], ans[1]],
  ].map(vec);
  return mcq(rand, `**a** = ${vec(a)} and **b** = ${vec(b)} (written as (x, y) column vectors). Find ${expr}.`, vec(ans), wrong, [`${k}**a** = ${vec([k * a[0], k * a[1]])}; ${m === 1 ? '' : m}**b** = ${vec([m * b[0], m * b[1]])}.`, `${sub ? 'Subtract' : 'Add'} the top numbers and the bottom numbers separately: ${vec(ans)}.`], 2);
}
const TRANSFORM: Row[] = [
  ['a rotation', 'needs an angle, a direction and a centre of rotation'],
  ['a reflection', 'needs the equation of the mirror line, e.g. y = x'],
  ['a translation', 'needs a column vector showing the movement'],
  ['an enlargement', 'needs a scale factor and a centre of enlargement'],
];
function transformQ(rand: () => number): GeneratedQuestion {
  const t = rand();
  if (t < 0.6) return tbl(rand, TRANSFORM, 'transformation', (x) => `To describe **${x}** fully, what do you need to give?`, 2);
  if (t < 0.8) return mcq(rand, 'Which transformation does **not** always produce a congruent image?', 'enlargement', ['rotation', 'reflection', 'translation'], ['Rotations, reflections and translations keep the same shape and size (congruent). An enlargement changes the size, so the image is similar, not congruent.'], 2);
  const sf = pick(rand, ['½', '3', '−1', '2']);
  const eff: Record<string, string> = { '½': 'the image is half the size, and twice as close to the centre', '3': 'the image is three times as big, and three times as far from the centre', '−1': 'the image is the same size, but inverted on the opposite side of the centre', '2': 'the image is twice as big, and twice as far from the centre' };
  return mcq(rand, `A shape is enlarged by scale factor **${sf}**. What happens?`, eff[sf], Object.entries(eff).filter(([k]) => k !== sf).map(([, v]) => v), [`Scale factor ${sf}: ${eff[sf]}.`], sf === '−1' ? 4 : 2);
}
const GRAD: Row[] = [
  ['the gradient of a distance–time graph', 'the speed'], ['the gradient of a velocity–time graph', 'the acceleration'],
  ['the area under a velocity–time graph', 'the distance travelled'], ['a horizontal line on a distance–time graph', 'the object is stationary'],
  ['a horizontal line on a velocity–time graph', 'the object moves at a constant velocity'], ['the gradient of a tangent to a curve', 'the rate of change at that point'],
];
const LOCI: Row[] = [
  ['the perpendicular bisector of AB', 'points that are the same distance from A and B'], ['a circle centred on P', 'points a fixed distance from a point P'],
  ['the bisector of the angle between two lines', 'points the same distance from two intersecting lines'], ['two parallel lines with semicircular ends', 'points a fixed distance from a line segment'],
];
const GRAPHS: Row[] = [
  ['y = x²', 'a U-shaped parabola symmetrical about the y-axis'], ['y = x³', 'an S-shaped cubic curve through the origin'], ['y = 1/x', 'a reciprocal curve in two parts that never touches the axes'],
  ['y = 2ˣ', 'an exponential curve that grows ever more steeply and passes through (0, 1)'], ['y = sin x', 'a wave that repeats every 360° between −1 and 1'], ['x² + y² = 25', 'a circle with centre (0, 0) and radius 5'],
  ['y = f(x) + 3', 'the graph of y = f(x) moved up 3'], ['y = f(x + 3)', 'the graph of y = f(x) moved left 3'], ['y = −f(x)', 'the graph of y = f(x) reflected in the x-axis'], ['y = f(−x)', 'the graph of y = f(x) reflected in the y-axis'],
];
function functionsQ(rand: () => number, lvl: number): GeneratedQuestion {
  const a = 2 + Math.floor(rand() * 4), b = 1 + Math.floor(rand() * 7), x = 1 + Math.floor(rand() * 5);
  const f = (v: number) => a * v + b, g = (v: number) => v * v;
  const t = rand();
  if (t < 0.4) return numQ(`f(x) = ${a}x + ${b} and g(x) = x². Find **fg(${x})**.`, f(g(x)), [`g(${x}) = ${g(x)}`, `f(${g(x)}) = ${a} × ${g(x)} + ${b} = ${f(g(x))}`, 'fg(x) means do g first, then f.'], 3);
  if (t < 0.7) return numQ(`f(x) = ${a}x + ${b} and g(x) = x². Find **gf(${x})**.`, g(f(x)), [`f(${x}) = ${f(x)}`, `g(${f(x)}) = ${f(x)}² = ${g(f(x))}`, 'gf(x) means do f first, then g.'], 3);
  return mcq(rand, `f(x) = ${a}x + ${b}. Find **f⁻¹(x)**.`, `(x − ${b}) ÷ ${a}`, [`(x + ${b}) ÷ ${a}`, `x ÷ ${a} − ${b}`, `${a}x − ${b}`, `1 ÷ (${a}x + ${b})`], [`Write y = ${a}x + ${b}, swap to make x the subject: x = (y − ${b}) ÷ ${a}, so f⁻¹(x) = (x − ${b}) ÷ ${a}.`], lvl >= 4 ? 4 : 3);
}
const CHARTS: Row[] = [
  ['a pie chart', 'showing how a whole is split into proportions'], ['a histogram', 'showing grouped continuous data with unequal class widths'],
  ['a scatter graph', 'showing whether two numerical variables are related'], ['a time-series (line) graph', 'showing how a value changes over time'],
  ['a box plot', 'comparing the median, quartiles and range of two distributions'], ['a cumulative frequency graph', 'estimating the median and quartiles of grouped data'],
  ['a bar chart', 'comparing frequencies of separate (categorical) groups'], ['a stem-and-leaf diagram', 'showing every individual value while ordering the data'],
];

// =========================== BIOLOGY ===========================
const CYCLE: Row[] = [
  ['photosynthesis', 'removes carbon dioxide from the air'], ['respiration', 'releases carbon dioxide into the air from living organisms'],
  ['combustion', 'releases carbon dioxide when fuels are burned'], ['decomposition', 'microorganisms break down dead material, releasing carbon dioxide and mineral ions'],
  ['feeding', 'passes carbon compounds along a food chain'], ['evaporation', 'turns water from seas and lakes into water vapour'],
  ['transpiration', 'water vapour is lost from the leaves of plants'], ['condensation', 'water vapour cools to form clouds'], ['precipitation', 'water falls as rain, snow or hail'],
];
const ASEPTIC: Row[] = [
  ['passing the inoculating loop through a Bunsen flame', 'kills microorganisms on the loop'],
  ['taping the lid on with two strips, not sealing it all round', 'lets oxygen in, so harmful anaerobic bacteria don\'t grow'],
  ['storing the dish upside down', 'stops drops of condensation falling onto the culture'],
  ['incubating at no more than 25 °C in schools', 'reduces the chance of harmful pathogens growing'],
  ['sterilising the Petri dish and agar before use', 'kills any unwanted microorganisms already present'],
];
function microbeQ(rand: () => number, lvl: number): GeneratedQuestion {
  if (rand() < 0.55) return tbl(rand, ASEPTIC, 'aseptic step', (x) => `Why do you use this step: **${x}**?`, 2, (d) => `Which aseptic step is done because it **${d}**?`);
  const m = pick(rand, [20, 30, 15]), h = pick(rand, [1, 2, 3]);
  const gens = (h * 60) / m;
  const start = pick(rand, [1, 10, 100]);
  return numQ(`A bacterium divides every **${m} minutes**. Starting with ${start} bacteri${start === 1 ? 'um' : 'a'}, how many will there be after **${h} hour${h > 1 ? 's' : ''}**?`, start * 2 ** gens, [`${h * 60} ÷ ${m} = ${gens} divisions`, `${start} × 2^${gens} = ${start * 2 ** gens}`], lvl >= 3 ? 3 : 2);
}
const HEALTH = {
  'a communicable disease': ['measles', 'malaria', 'tuberculosis', 'influenza', 'gonorrhoea'],
  'a non-communicable disease': ['type 2 diabetes', 'coronary heart disease', 'lung cancer', 'liver cirrhosis', 'asthma'],
};
const RISK: Row[] = [
  ['smoking', 'lung disease and lung cancer'], ['obesity', 'type 2 diabetes'], ['drinking too much alcohol', 'liver disease (cirrhosis)'],
  ['exposure to ionising radiation', 'cancer from DNA damage'], ['a diet high in saturated fat', 'coronary heart disease'],
];
const DIVISION = {
  'a feature of mitosis': ['produces two genetically identical cells', 'used for growth and repair', 'happens in body cells', 'cells keep the full number of chromosomes'],
  'a feature of meiosis': ['produces four genetically different cells', 'produces gametes', 'happens in the ovaries and testes', 'halves the number of chromosomes'],
};
const STEM: Row[] = [
  ['embryonic stem cells', 'can differentiate into almost any type of human cell'], ['adult bone marrow stem cells', 'can form many types of cell, including blood cells'],
  ['meristem tissue in plants', 'can differentiate into any type of plant cell throughout the plant\'s life'],
];
const DNA: Row[] = [
  ['DNA', 'a polymer made of two strands forming a double helix'], ['a gene', 'a small section of DNA that codes for a particular protein'],
  ['the genome', 'the entire genetic material of an organism'], ['a chromosome', 'a long coiled molecule of DNA found in the nucleus'],
  ['a gamete', 'a sex cell (sperm or egg) with half the number of chromosomes'], ['an allele', 'a different version of the same gene'],
];
const EVOLUTION: Row[] = [
  ['natural selection', 'individuals with characteristics best suited to the environment survive, breed and pass on their alleles'],
  ['evolution', 'a change in the inherited characteristics of a population over time through natural selection'],
  ['a mutation', 'a random change in DNA that can create a new variant of a characteristic'],
  ['selective breeding', 'humans choose parents with desired characteristics and breed them over many generations'],
  ['genetic engineering', 'a gene from one organism is cut out with enzymes and inserted into the genome of another'],
  ['a species', 'organisms so similar that they can breed together to produce fertile offspring'],
  ['speciation', 'two populations become so different that they can no longer interbreed to produce fertile offspring'],
  ['extinction', 'there are no remaining individuals of a species still alive'],
  ['a fossil', 'the preserved remains or traces of an organism from many thousands of years ago'],
  ['tissue culture', 'small groups of cells from part of a plant are used to grow identical new plants'],
  ['taking cuttings', 'a gardener grows a new identical plant from a piece of stem of a parent plant'],
  ['embryo transplants', 'cells are split apart from an early embryo and the identical embryos are put into host mothers'],
  ['adult cell cloning', 'the nucleus of a body cell is put into an egg cell whose nucleus has been removed, then given an electric shock'],
  ['inbreeding', 'breeding closely related individuals, which reduces variation and can cause inherited defects'],
  ['antibiotic resistance', 'bacteria with a mutation survive treatment and reproduce, so the resistant strain spreads'],
];
const HOMEO: Row[] = [
  ['sweating', 'cools the body as sweat evaporates from the skin'], ['vasodilation', 'blood vessels near the skin widen, so more heat is lost'],
  ['vasoconstriction', 'blood vessels near the skin narrow, so less heat is lost'], ['shivering', 'muscles contract rapidly, releasing heat from respiration'],
  ['ADH', 'makes the kidney tubules reabsorb more water'], ['auxin', 'causes shoots to grow towards light (phototropism)'],
  ['gibberellins', 'start seed germination'], ['ethene', 'controls cell division and fruit ripening'],
];
const PLANTDEF: Row[] = [
  ['nitrate deficiency', 'stunted growth, because nitrates are needed to make proteins'], ['magnesium deficiency', 'chlorosis (yellow leaves), because magnesium is needed to make chlorophyll'],
  ['aphids', 'insects that feed on plant sap and can carry pathogens'], ['a waxy cuticle and cellulose cell walls', 'physical defences that stop pathogens entering'],
  ['thorns and leaves that droop when touched', 'mechanical defences against animals'], ['antibacterial chemicals and poisons', 'chemical defences produced by plants'],
];
const MAB: Row[] = [
  ['pregnancy testing kits', 'monoclonal antibodies bind to the hormone HCG found in urine'], ['diagnosing diseases in the lab', 'antibodies detect specific pathogens or molecules in the blood'],
  ['locating cancer cells or blood clots', 'antibodies carrying a radioactive or fluorescent marker bind to them'], ['treating some types of cancer', 'antibodies carry a drug or toxin directly to the cancer cells'],
];
const BIODIV: Row[] = [
  ['destroying peat bogs for compost', 'releases carbon dioxide as the peat decays or is burned'], ['large-scale deforestation', 'reduces biodiversity and the removal of carbon dioxide by photosynthesis'],
  ['captive breeding programmes', 'help protect endangered species from extinction'], ['replanting hedgerows and field margins', 'provides habitats so more species can live on farmland'],
  ['recycling more household waste', 'reduces the amount of waste sent to landfill'], ['global warming and climate change', 'can change the distribution of species as habitats shift'],
];

// =========================== CHEMISTRY ===========================
const EQUIL: { eq: string; exoFwd: boolean; left: number; right: number }[] = [
  { eq: 'N₂ + 3H₂ ⇌ 2NH₃ (forward reaction exothermic)', exoFwd: true, left: 4, right: 2 },
  { eq: '2SO₂ + O₂ ⇌ 2SO₃ (forward reaction exothermic)', exoFwd: true, left: 3, right: 2 },
  { eq: 'N₂O₄ ⇌ 2NO₂ (forward reaction endothermic)', exoFwd: false, left: 1, right: 2 },
  { eq: 'CO + 2H₂ ⇌ CH₃OH (forward reaction exothermic)', exoFwd: true, left: 3, right: 1 },
  { eq: 'H₂ + I₂ ⇌ 2HI (forward reaction exothermic)', exoFwd: true, left: 2, right: 2 },
  { eq: 'CaCO₃ ⇌ CaO + CO₂ (forward reaction endothermic; only CO₂ is a gas)', exoFwd: false, left: 0, right: 1 },
];
function equilibriumQ(rand: () => number): GeneratedQuestion {
  const r = pick(rand, EQUIL);
  const change = pick(rand, ['increase the temperature', 'decrease the temperature', 'increase the pressure', 'decrease the pressure', 'add a catalyst'] as const);
  const R = 'the equilibrium shifts right (more products)', L = 'the equilibrium shifts left (more reactants)', N = 'the position of equilibrium does not change';
  let ans = N;
  let why = '';
  if (change.includes('temperature')) {
    const up = change.startsWith('increase');
    const endoDir = r.exoFwd ? L : R; // raising T favours the endothermic direction
    ans = up ? endoDir : (endoDir === L ? R : L);
    why = `${up ? 'Raising' : 'Lowering'} the temperature favours the ${up ? 'endothermic' : 'exothermic'} direction, which is the ${r.exoFwd === up ? 'reverse' : 'forward'} reaction here.`;
  } else if (change.includes('pressure')) {
    const up = change.startsWith('increase');
    if (r.left === r.right) { ans = N; why = 'There are the same number of gas molecules on each side, so pressure has no effect on the position.'; }
    else { const fewer = r.right < r.left ? R : L; ans = up ? fewer : (fewer === R ? L : R); why = `${up ? 'Higher' : 'Lower'} pressure favours the side with ${up ? 'fewer' : 'more'} gas molecules (${r.left} on the left, ${r.right} on the right).`; }
  } else why = 'A catalyst speeds up the forward and reverse reactions equally, so equilibrium is reached faster but its position does not change.';
  return mcq(rand, `For the reaction **${r.eq}**, what happens if you **${change}**?`, ans, [R, L, N, 'the reaction stops completely'], [why, 'Le Chatelier\'s principle: the system shifts to oppose the change.'], 4);
}
const RESOURCES: Row[] = [
  ['filtration then sterilisation', 'how fresh water from reservoirs is made potable'], ['distillation or reverse osmosis', 'how sea water can be desalinated'],
  ['phytomining', 'plants absorb metal compounds from soil, then are burned to give an ash containing the metal'], ['bioleaching', 'bacteria produce leachate solutions that contain metal compounds'],
  ['galvanising', 'coating iron with a layer of zinc to stop it rusting'], ['sacrificial protection', 'attaching a more reactive metal that corrodes instead of the iron'],
  ['a life cycle assessment', 'assesses the environmental impact of a product from raw materials to disposal'], ['the Haber process', 'makes ammonia from nitrogen and hydrogen at about 450 °C and 200 atmospheres with an iron catalyst'],
];
const ALLOYS: Row[] = [
  ['bronze', 'an alloy of copper and tin'], ['brass', 'an alloy of copper and zinc'], ['steel', 'an alloy of iron with carbon (and sometimes other metals)'],
  ['soda-lime glass', 'made by heating sand, sodium carbonate and limestone'], ['borosilicate glass', 'made from sand and boron trioxide, with a higher melting point'],
  ['a thermosetting polymer', 'does not melt when heated because of cross-links between chains'], ['a thermosoftening polymer', 'melts when heated because there are no cross-links'],
  ['a composite', 'a reinforcement material embedded in a matrix or binder'],
];

// =========================== PHYSICS ===========================
const STATIC: Row[] = [
  ['two positive charges', 'repel each other'], ['a positive and a negative charge', 'attract each other'],
  ['rubbing a polythene rod with a cloth', 'transfers electrons to the rod, giving it a negative charge'], ['rubbing an acetate rod with a cloth', 'transfers electrons from the rod, giving it a positive charge'],
  ['a large potential difference between objects', 'can make a spark jump across the gap'], ['electric field lines', 'point away from positive charges and towards negative charges'],
];
const ENERGY_RES = {
  'renewable': ['wind', 'solar', 'hydroelectricity', 'tidal', 'geothermal', 'biofuel', 'wave power'],
  'non-renewable': ['coal', 'oil', 'natural gas', 'nuclear fuel'],
};
const RES_FEATURE: Row[] = [
  ['wind turbines', 'renewable but unreliable because they only work when it is windy'], ['solar cells', 'renewable but produce no electricity at night'],
  ['tidal barrages', 'renewable and predictable, but can damage estuary habitats'], ['nuclear power', 'releases no carbon dioxide, but produces radioactive waste'],
  ['coal-fired power stations', 'reliable, but release carbon dioxide and sulfur dioxide'], ['hydroelectric dams', 'reliable and quick to respond, but flood valleys to build'],
  ['geothermal power', 'reliable, but only possible in volcanic areas'],
];
const STAR_SUN = ['nebula', 'protostar', 'main sequence star', 'red giant', 'white dwarf', 'black dwarf'];
const STAR_BIG = ['nebula', 'protostar', 'main sequence star', 'red supergiant', 'supernova', 'neutron star or black hole'];
function spaceQ(rand: () => number): GeneratedQuestion {
  const t = rand();
  if (t < 0.6) {
    const big = rand() < 0.5;
    const seq = big ? STAR_BIG : STAR_SUN;
    const i = 1 + Math.floor(rand() * (seq.length - 2));
    const all = [...new Set([...STAR_SUN, ...STAR_BIG])];
    return mcq(rand, `For a star ${big ? 'much more massive than the Sun' : 'about the same size as the Sun'}, what comes straight after the **${seq[i]}** stage?`, seq[i + 1], all.filter((x) => x !== seq[i + 1] && x !== seq[i]), [`Sun-sized: ${STAR_SUN.join(' → ')}.`, `Massive: ${STAR_BIG.join(' → ')}.`], 3);
  }
  const R: Row[] = [
    ['red-shift', 'light from distant galaxies is shifted to longer wavelengths, showing they are moving away'], ['the Big Bang theory', 'the universe began from a very small, extremely hot and dense region'],
    ['dark matter and dark energy', 'are still not understood, so there is much about the universe we do not know'], ['fusion', 'joins light nuclei in a star\'s core, releasing energy'],
    ['an orbit', 'is maintained because gravity provides the force towards the centre of the circle'],
  ];
  return tbl(rand, R, 'idea', (x) => `What is meant by **${x}**?`, 3);
}
const WAVES2: Row[] = [
  ['sound waves', 'longitudinal waves that cannot travel through a vacuum'], ['light waves', 'transverse waves that can travel through a vacuum'],
  ['ultrasound', 'sound with a frequency above 20 000 Hz, used in medical scans'], ['P-waves', 'longitudinal seismic waves that travel through solids and liquids'],
  ['S-waves', 'transverse seismic waves that only travel through solids'], ['a convex lens', 'makes parallel rays converge to a principal focus'],
  ['a concave lens', 'makes parallel rays spread out (diverge)'], ['a red filter', 'transmits red light and absorbs the other colours'],
];

// =========================== STATISTICS ===========================
const DATA = {
  'qualitative data': ['eye colour', 'favourite subject', 'type of pet', 'car make'],
  'discrete quantitative data': ['number of siblings', 'shoe size', 'goals scored in a match', 'number of cars in a car park'],
  'continuous quantitative data': ['height', 'time taken to run 100 m', 'mass of a parcel', 'temperature'],
};
const QPROB: Row[] = [
  ['"Don\'t you agree that the canteen food is terrible?"', 'a leading question that pushes people towards one answer'],
  ['response boxes 0–2, 2–4, 4–6', 'boxes that overlap and do not cover every possible answer'],
  ['"How much do you earn?"', 'too personal, so people may refuse or not answer honestly'],
  ['"Do you exercise often?"', 'too vague, because "often" means different things to different people'],
  ['asking only people at a gym how fit they are', 'a biased sample that does not represent the population'],
];
const QC: Row[] = [
  ['a sample mean inside the warning limits', 'carry on - the process is working correctly'],
  ['a sample mean between the warning and action limits', 'take another sample straight away'],
  ['a sample mean outside the action limits', 'stop the process and reset the machine'],
];

// =========================== CREATIVE iMEDIA ===========================
const PLATFORMS: Row[] = [
  ['a website (in any browser)', 'can be updated instantly and reached by anyone with internet access'], ['a mobile app (phone or tablet)', 'can use device features such as GPS and notifications'],
  ['social media platforms', 'lets audiences share and comment on content quickly'], ['a self-service kiosk', 'an interactive screen in a public place that needs no personal device'],
  ['print (magazines and leaflets)', 'a physical product that needs no screen or power'], ['broadcast television channels', 'reaches a mass audience at a scheduled time'],
  ['a DVD or Blu-ray', 'a physical disc that can be used without internet access'], ['online streaming services', 'on-demand video or audio delivered over the internet'],
];
const PURPOSE: Row[] = [
  ['to inform', 'a news website reporting local events'], ['to educate', 'a revision app that teaches times tables'], ['to entertain', 'a comedy podcast'],
  ['to promote', 'a poster advertising a music festival'], ['to influence', 'a charity video persuading people to donate'],
];
const SEGMENT: Row[] = [
  ['age', 'grouping audiences into children, teenagers, adults or older people'], ['gender', 'grouping audiences as male, female or non-binary'],
  ['location', 'grouping audiences by where they live, such as town or country'], ['income', 'grouping audiences by how much they earn'],
  ['occupation', 'grouping audiences by their job'], ['interests and lifestyle', 'grouping audiences by hobbies and values, such as gamers or vegans'],
];
const SECTORS = {
  'a traditional media product': ['a printed newspaper', 'a radio programme', 'a feature film shown in cinemas', 'a broadcast TV series'],
  'a new (digital) media product': ['a mobile game', 'a website', 'a podcast', 'a social media campaign'],
};
const IM_UNITS: Row[] = [
  ['a logo', 'a symbol or design that identifies a brand (R094 visual identity)'], ['a colour palette', 'the set of colours a brand uses consistently'],
  ['typography', 'the fonts and style of text a product uses'], ['a panel', 'one frame of a comic, showing a moment in the story (R095)'],
  ['a gutter', 'the gap between comic panels'], ['a speech balloon', 'shows what a comic character says'],
  ['frame rate', 'the number of frames shown each second in an animation (R096)'], ['onion skinning', 'showing faint previous frames to help draw the next one'],
  ['tweening', 'software creating the frames between two keyframes'], ['a hotspot', 'an area of an interactive product that does something when clicked (R097)'],
  ['a navigation bar', 'a set of links that lets users move around an interactive product'], ['aperture', 'the size of the opening in a camera lens, affecting depth of field (R098)'],
  ['shutter speed', 'how long the camera sensor is exposed to light'], ['the rule of thirds', 'placing key subjects along imaginary lines that divide an image into thirds'],
  ['a HUD (head-up display)', 'on-screen information in a game such as health and score (R099)'], ['an NPC', 'a game character controlled by the computer, not the player'],
];

// =========================== ENGLISH LANGUAGE ===========================
const EL_QS: { id: string; q: string; marks: number; mins: string; task: string }[] = [
  { id: 'P1 Q1', q: 'Paper 1 Question 1', marks: 4, mins: 'about 5 minutes', task: 'list four things from a specific part of the source' },
  { id: 'P1 Q2', q: 'Paper 1 Question 2', marks: 8, mins: 'about 10 minutes', task: 'analyse how the writer uses language in one paragraph' },
  { id: 'P1 Q3', q: 'Paper 1 Question 3', marks: 8, mins: 'about 10 minutes', task: 'analyse how the whole source is structured' },
  { id: 'P1 Q4', q: 'Paper 1 Question 4', marks: 20, mins: 'about 25 minutes', task: 'evaluate a statement about the second half of the source' },
  { id: 'P1 Q5', q: 'Paper 1 Question 5', marks: 40, mins: 'about 45 minutes', task: 'write a description or a story' },
  { id: 'P2 Q1', q: 'Paper 2 Question 1', marks: 4, mins: 'about 5 minutes', task: 'choose four true statements about part of Source A' },
  { id: 'P2 Q2', q: 'Paper 2 Question 2', marks: 8, mins: 'about 8 minutes', task: 'summarise the differences between both sources' },
  { id: 'P2 Q3', q: 'Paper 2 Question 3', marks: 12, mins: 'about 12 minutes', task: 'analyse how the writer uses language in one source' },
  { id: 'P2 Q4', q: 'Paper 2 Question 4', marks: 16, mins: 'about 20 minutes', task: 'compare the writers\' perspectives and methods across both sources' },
  { id: 'P2 Q5', q: 'Paper 2 Question 5', marks: 40, mins: 'about 45 minutes', task: 'write to present a viewpoint, e.g. an article, letter or speech' },
];
function elExamQ(rand: () => number): GeneratedQuestion {
  const x = pick(rand, EL_QS);
  const t = rand();
  const why = [`${x.q}: ${x.task} – ${x.marks} marks, ${x.mins}.`];
  if (t < 0.4) return mcq(rand, `Which AQA English Language question asks you to **${x.task}**?`, x.q, shuffle(EL_QS.filter((y) => y !== x), rand).sort((a, b) => Math.abs(a.marks - x.marks) - Math.abs(b.marks - x.marks)).map((y) => y.q), why, 2);
  if (t < 0.75) return mcq(rand, `How many marks is **${x.q}** worth?`, `${x.marks} marks`, ['4 marks', '8 marks', '12 marks', '16 marks', '20 marks', '24 marks', '40 marks'].filter((m) => m !== `${x.marks} marks`).sort((a, b) => Math.abs(parseInt(a, 10) - x.marks) - Math.abs(parseInt(b, 10) - x.marks)), why, 1);
  return mcq(rand, `Roughly how long should you spend on **${x.q}**?`, x.mins, ['about 5 minutes', 'about 10 minutes', 'about 20 minutes', 'about 25 minutes', 'about 45 minutes', 'about 60 minutes'].filter((m) => m !== x.mins), why, 1);
}
const EL_FEATURES = {
  'a structural feature': ['a shift in focus from the setting to a character', 'a flashback to an earlier time', 'a one-sentence paragraph', 'a cyclical ending that returns to the opening', 'a change of perspective', 'zooming in on a small detail'],
  'a language feature': ['a metaphor describing the sea', 'a simile comparing the wind to an animal', 'the adjective "brittle"', 'personification of the house', 'a semantic field of war', 'alliteration in the first line'],
};

// =========================== BUSINESS, HISTORY TECHNIQUE ===========================
const COMMAND: Row[] = [
  ['state / identify', 'give a short fact or example for 1 mark, with no explanation'], ['explain', 'give a point and develop it with a reason or consequence'],
  ['calculate', 'work out a numerical answer, showing your working'], ['analyse', 'develop a chain of reasoning, applied to the business in the case study'],
  ['evaluate', 'weigh up both sides and reach a justified judgement'], ['justify / recommend', 'choose an option and support the choice with evidence from the case study'],
];
const AIMS: Row[] = [
  ['survival', 'avoiding failure in the first months of trading'], ['profit', 'earning more revenue than costs'], ['growth', 'increasing the size of the business, e.g. more outlets or staff'],
  ['market share', 'increasing the percentage of total market sales the business has'], ['financial security', 'the owner earning enough to be comfortable and secure'], ['social objectives', 'helping the community or the environment, not just making money'],
];
const PITCH: Row[] = [
  ['the business idea', 'what the product or service is and who it is for'], ['the unique selling point (USP)', 'what makes the idea different from competitors'],
  ['the costs and pricing', 'how much it costs to make and how much customers will pay'], ['the target market', 'the group of customers the business aims at'],
  ['a review of the pitch', 'reflecting on feedback and what to improve next time'], ['visual aids', 'slides, samples or prototypes that help the audience understand'],
];
const HIST_Q: Row[] = [
  ['describe two features', 'two features, each with a specific supporting detail (4 marks)'], ['explain why', 'three developed causes with precise knowledge, including one of your own (12 marks)'],
  ['how far do you agree', 'both sides, knowledge beyond the stimulus and a justified judgement (16 marks + SPaG)'], ['how useful are the sources', 'content, provenance and your own contextual knowledge for each source'],
  ['write a narrative account', 'events in order, showing how each led to the next'], ['how convincing is the interpretation', 'test what it says against your own knowledge, then make a judgement'],
  ['explain the significance', 'short- and long-term importance of the event or development'],
];

export const FACT_MORE_GENERATORS: Generator[] = [
  G('f-fdp', 'Fractions, decimals and percentages', (r, l) => fdpQ(r, l)),
  G('f-rearrange', 'Rearranging formulae', (r) => rearrangeQ(r)),
  G('f-circle-thm', 'Circle theorems', (r) => circleQ(r), 'H'),
  G('f-vectors', 'Column vectors', (r) => vectorQ(r)),
  G('f-transform', 'Describing transformations', (r) => transformQ(r)),
  G('f-gradients', 'Gradients and areas on graphs', (r) => tbl(r, GRAD, 'graph feature', (x) => `What does **${x}** represent?`, 2, (d) => `Which feature of a graph tells you **${d}**?`)),
  G('f-loci', 'Loci', (r) => tbl(r, LOCI, 'locus', (x) => `Which points does **${x}** show?`, 2, (d) => `Which locus shows **${d}**?`)),
  G('f-graph-shapes', 'Shapes and transformations of graphs', (r) => tbl(r, GRAPHS, 'equation', (x) => `What does the graph of **${x}** look like?`, 3)),
  G('f-functions', 'Composite and inverse functions', (r, l) => functionsQ(r, l), 'H'),
  G('f-charts', 'Choosing a chart', (r) => tbl(r, CHARTS, 'chart', (x) => `What is **${x}** best used for?`, 2, (d) => `Which chart is best for **${d}**?`)),
  G('f-cycles', 'The carbon and water cycles', (r) => tbl(r, CYCLE, 'process', (x) => `What happens in **${x}** in the carbon or water cycle?`, 2)),
  G('f-microbes', 'Culturing microorganisms', (r, l) => microbeQ(r, l)),
  G('f-health', 'Communicable, non-communicable and risk factors', (r) => (r() < 0.45 ? grp(r, HEALTH, (g) => `Which of these is **${g}**?`, 'Communicable diseases are caused by pathogens and can spread; non-communicable diseases cannot be passed between people.') : tbl(r, RISK, 'risk factor', (x) => `Which disease is **${x}** a risk factor for?`, 2, (d) => `Which risk factor is most strongly linked to **${d}**?`))),
  G('f-division', 'Mitosis, meiosis and stem cells', (r) => (r() < 0.6 ? grp(r, DIVISION, (g) => `Which of these is **${g}**?`, 'Mitosis: 2 identical cells for growth and repair. Meiosis: 4 genetically different gametes with half the chromosomes.') : tbl(r, STEM, 'source of stem cells', (x) => `What can **${x}** do?`, 2, (d) => `Which stem cells **${d}**?`))),
  G('f-dna', 'DNA and genetic terms', (r) => tbl(r, DNA, 'term', (x) => `What is **${x}**?`, 2)),
  G('f-evolution', 'Evolution, breeding and cloning', (r) => tbl(r, EVOLUTION, 'term', (x) => `Which description matches **${x}**?`, 2)),
  G('f-homeostasis', 'Temperature control and plant hormones', (r) => tbl(r, HOMEO, 'response or hormone', (x) => `What does **${x}** do?`, 2)),
  G('f-plant-health', 'Plant disease, deficiencies and defences', (r) => tbl(r, PLANTDEF, 'cause or defence', (x) => `What is the effect or role of **${x}**?`, 2)),
  G('f-mab', 'Uses of monoclonal antibodies', (r) => tbl(r, MAB, 'use of monoclonal antibodies', (x) => `How are monoclonal antibodies used in **${x}**?`, 3)),
  G('f-biodiversity', 'Human impact on biodiversity', (r) => tbl(r, BIODIV, 'human activity or programme', (x) => `What is the effect of **${x}**?`, 2)),
  G('f-equilibrium', 'Predicting shifts in equilibrium', (r) => equilibriumQ(r), 'H'),
  G('f-resources', 'Using resources', (r) => tbl(r, RESOURCES, 'process or method', (x) => `What is **${x}**?`, 2)),
  G('f-materials', 'Alloys, glass, polymers and composites', (r) => tbl(r, ALLOYS, 'material', (x) => `Which statement describes **${x}**?`, 2)),
  G('f-static', 'Static electricity', (r) => tbl(r, STATIC, 'situation', (x) => `What happens with **${x}**?`, 2)),
  G('f-energy-res', 'Energy resources', (r) => (r() < 0.4 ? grp(r, ENERGY_RES, (g) => `Which of these is a **${g}** energy resource?`, 'Renewable resources will not run out (they are replenished); non-renewable resources will run out.') : tbl(r, RES_FEATURE, 'energy resource', (x) => `Which statement best describes **${x}**?`, 2))),
  G('f-space', 'Stars and the universe', (r) => spaceQ(r)),
  G('f-waves2', 'Sound, light, seismic waves and lenses', (r) => tbl(r, WAVES2, 'wave or lens', (x) => `Which statement describes **${x}**?`, 2)),
  G('f-st-data', 'Types of data', (r) => grp(r, DATA, (g) => `Which of these is **${g}**?`, 'Qualitative data are words or categories. Discrete data are counted; continuous data are measured.')),
  G('f-st-questionnaire', 'Problems with questionnaires', (r) => tbl(r, QPROB, 'example', (x) => `What is the problem with **${x}**?`, 2, (d) => `Which of these has this problem: **${d}**?`)),
  G('f-st-quality', 'Control charts', (r) => tbl(r, QC, 'control chart situation', (x) => `On a control chart, what should happen with **${x}**?`, 2, (d) => `On a control chart, when should you **${d}**?`)),
  G('f-im-platforms', 'Distribution platforms', (r) => tbl(r, PLATFORMS, 'distribution platform', (x) => `What is a key feature of **${x}**?`, 2)),
  G('f-im-purpose', 'Purposes of media products', (r) => tbl(r, PURPOSE, 'purpose', (x) => `Which product has the main purpose **${x}**?`, 1)),
  G('f-im-segment', 'Audience segmentation', (r) => tbl(r, SEGMENT, 'audience category', (x) => `What is segmentation by **${x}**?`, 1)),
  G('f-im-sectors', 'Traditional and new media', (r) => grp(r, SECTORS, (g) => `Which of these is **${g}**?`, 'Traditional media: print, broadcast and film. New media: digital and online products.', 1)),
  G('f-im-units', 'Optional unit terms (R094-R099)', (r) => tbl(r, IM_UNITS, 'term', (x) => `What is **${x}**?`, 2)),
  G('f-el-exam', 'English Language questions: marks, timing and tasks', (r) => elExamQ(r)),
  G('f-el-structure', 'Structure or language?', (r) => grp(r, EL_FEATURES, (g) => `Which of these is **${g}**?`, 'Structure is how the whole text is organised (focus, order, paragraphing, openings and endings). Language is word-level choices.')),
  G('f-bus-command', 'Command words', (r) => tbl(r, COMMAND, 'command word', (x) => `What does a **"${x}"** question want?`, 1)),
  G('f-bus-aims', 'Business aims', (r) => tbl(r, AIMS, 'business aim', (x) => `What is meant by the aim of **${x}**?`, 1)),
  G('f-ent-pitch', 'Planning and reviewing a pitch', (r) => tbl(r, PITCH, 'part of a pitch', (x) => `In a business pitch, what does **${x}** cover?`, 1)),
  G('f-hist-technique', 'History question types', (r) => tbl(r, HIST_Q, 'question type', (x) => `What does a **"${x}"** question need?`, 2)),
];

export const FACT_MORE_TOPICS: Record<string, string[]> = {
  'm-num-fdp': ['f-fdp'], 'm-alg-rearrange': ['f-rearrange'], 'm-geo-circles': ['f-circle-thm'], 'm-geo-vectors': ['f-vectors'], 'm-geo-transform': ['f-transform'],
  'm-rat-rates': ['f-gradients'], 'm-geo-construct': ['f-loci'], 'm-alg-graphs2': ['f-graph-shapes'], 'm-alg-functions': ['f-functions'], 'm-stat-charts': ['f-charts'],
  'bio-cycles': ['f-cycles'], 'bio-microbes': ['f-microbes'], 'bio-health': ['f-health'], 'bio-division': ['f-division'], 'bio-dna': ['f-dna'], 'bio-evolution': ['f-evolution'], 'bio-kidney': ['f-homeostasis'],
  'bio-mab': ['f-mab', 'f-plant-health'], 'bio-biodiversity': ['f-biodiversity'], 'chem-equilibrium': ['f-equilibrium'], 'chem-resources': ['f-resources', 'f-materials'],
  'phys-static': ['f-static'], 'phys-resources': ['f-energy-res'], 'phys-space-topic': ['f-space'], 'phys-light-sound': ['f-waves2'],
  'st-planning': ['f-st-data'], 'st-questionnaires': ['f-st-questionnaire'], 'st-quality': ['f-st-quality'], 'st-diagrams': ['f-charts'],
  'im-distribution': ['f-im-platforms'], 'im-purpose': ['f-im-purpose'], 'im-audience': ['f-im-segment'], 'im-sectors': ['f-im-sectors'],
  'im-r094-guide': ['f-im-units'], 'im-r095-guide': ['f-im-units'], 'im-r096-guide': ['f-im-units'], 'im-r097-guide': ['f-im-units'], 'im-r098-guide': ['f-im-units'], 'im-r099-guide': ['f-im-units'],
  'el-p1q1': ['f-el-exam'], 'el-p1q2': ['f-el-exam'], 'el-p1q3': ['f-el-exam', 'f-el-structure'], 'el-p1q4': ['f-el-exam'], 'el-p1q5': ['f-el-exam'],
  'el-p2q1q2': ['f-el-exam'], 'el-p2q3': ['f-el-exam'], 'el-p2q4': ['f-el-exam'], 'el-p2q5': ['f-el-exam'], 'el-methods': ['f-el-structure'],
  'bus-technique': ['f-bus-command'], 'bus-enterprise': ['f-bus-aims'], 'ent-pitch': ['f-ent-pitch'], 'hist-ed-technique': ['f-hist-technique'], 'hist-aqa-technique': ['f-hist-technique'],
};
