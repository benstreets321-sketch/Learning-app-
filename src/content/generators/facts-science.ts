// Fact-table generators for Chemistry, Biology and Physics (AQA GCSE content). Each produces many different
// questions from one table, with wrong options taken from the same category so they are genuinely confusable.
import type { Generator, GeneratedQuestion } from '../types';
import { ELEMENTS, electronShells } from '../periodic';
import { cap, closest, mcq, numQ, pick, typed } from './facts-kit';
import { shuffle } from '../../lib/util';

const G = (id: string, title: string, make: Generator['make'], tier?: Generator['tier']): Generator => ({ id, title, make, tier });
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const sub = (n: number) => (n === 1 ? '' : String(n).split('').map((d) => SUB[Number(d)]).join(''));
const SUPD = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = (n: number) => (n === 1 ? '' : String(n).split('').map((d) => SUPD[Number(d)]).join(''));

// =========================== CHEMISTRY ===========================
const GCSE_Z = [...Array.from({ length: 20 }, (_, i) => i + 1), 26, 29, 30, 35, 47, 53, 79, 82];
const EL = ELEMENTS.filter((e) => GCSE_Z.includes(e.z));
const aqaGroup = (g: number) => (g <= 2 ? g : g >= 13 && g <= 17 ? g - 10 : g === 18 ? 0 : -1);
const groupName = (g: number) => (g === 0 ? 'Group 0' : `Group ${g}`);

const ISOTOPES: [string, number, number][] = [
  ['hydrogen', 1, 1], ['helium', 2, 4], ['lithium', 3, 7], ['beryllium', 4, 9], ['boron', 5, 11], ['carbon', 6, 12], ['carbon', 6, 14],
  ['nitrogen', 7, 14], ['oxygen', 8, 16], ['fluorine', 9, 19], ['neon', 10, 20], ['sodium', 11, 23], ['magnesium', 12, 24], ['aluminium', 13, 27],
  ['silicon', 14, 28], ['phosphorus', 15, 31], ['sulfur', 16, 32], ['chlorine', 17, 35], ['chlorine', 17, 37], ['argon', 18, 40], ['potassium', 19, 39],
  ['calcium', 20, 40], ['iron', 26, 56], ['copper', 29, 63], ['zinc', 30, 64], ['bromine', 35, 79], ['iodine', 53, 127], ['uranium', 92, 235], ['uranium', 92, 238],
];
const IONS_SIMPLE: [string, string, number, number][] = [ // name, symbol, Z, charge
  ['lithium', 'Li', 3, 1], ['sodium', 'Na', 11, 1], ['potassium', 'K', 19, 1], ['magnesium', 'Mg', 12, 2], ['calcium', 'Ca', 20, 2], ['aluminium', 'Al', 13, 3],
  ['oxygen', 'O', 8, -2], ['sulfur', 'S', 16, -2], ['fluorine', 'F', 9, -1], ['chlorine', 'Cl', 17, -1], ['bromine', 'Br', 35, -1], ['nitrogen', 'N', 7, -3],
];
const ionStr = (sym: string, charge: number) => `${sym}${sup(Math.abs(charge))}${charge > 0 ? '⁺' : '⁻'}`;

function elementQ(rand: () => number, lvl: number): GeneratedQuestion {
  const kind = pick(rand, ['symbol', 'name', 'group', 'shells', 'ion', 'family', 'particles', 'ionelectrons'] as const);
  if (kind === 'particles') {
    const [name, z, a] = pick(rand, ISOTOPES);
    const what = pick(rand, ['protons', 'neutrons', 'electrons'] as const);
    const ans = what === 'neutrons' ? a - z : z;
    return numQ(`An atom of ${name} has an atomic number of **${z}** and a mass number of **${a}**. How many **${what}** does it have?`, ans,
      [what === 'neutrons' ? `Neutrons = mass number − atomic number = ${a} − ${z} = ${ans}` : what === 'protons' ? `Protons = atomic number = ${z}` : `A neutral atom has the same number of electrons as protons: ${z}`],
      what === 'neutrons' ? 2 : 1, undefined, ['Atomic number = protons. Mass number = protons + neutrons.']);
  }
  if (kind === 'ionelectrons') {
    const [name, sym, z, c] = pick(rand, IONS_SIMPLE);
    const ans = z - c;
    return numQ(`How many **electrons** are in a **${ionStr(sym, c)}** ion (atomic number of ${name} = ${z})?`, ans,
      [`A neutral ${name} atom has ${z} electrons.`, c > 0 ? `A ${c}+ ion has LOST ${c} electron${c > 1 ? 's' : ''}: ${z} − ${c} = ${ans}` : `A ${-c}− ion has GAINED ${-c} electron${c < -1 ? 's' : ''}: ${z} + ${-c} = ${ans}`],
      3, undefined, ['Positive ions have lost electrons; negative ions have gained them.']);
  }
  const pool = kind === 'shells' ? EL.filter((e) => e.z <= 20) : kind === 'group' || kind === 'ion' ? EL.filter((e) => e.z > 1 && aqaGroup(e.group) >= 0 && (kind === 'group' || ([1, 2, 3, 5, 6, 7].includes(aqaGroup(e.group)) && ![4, 5, 82].includes(e.z)))) : kind === 'family' ? EL.filter((e) => [1, 17, 18].includes(e.group) && e.z > 1 || [26, 29].includes(e.z)) : EL;
  const e = pick(rand, pool);
  const name = e.name.toLowerCase();
  if (kind === 'symbol') {
    if (lvl >= 4) return typed(`Which element has the symbol **${e.sym}**? (type its name)`, name, [], [`${e.sym} is ${name} (atomic number ${e.z}).`], 3);
    const wrong = closest(rand, EL, e, (x) => (x.sym[0] === e.sym[0] || x.name[0] === e.sym[0] ? 0 : 2) + Math.abs(x.z - e.z) / 20).map((x) => x.sym);
    return mcq(rand, `What is the chemical symbol for **${name}**?`, e.sym, wrong, [`${cap(name)}: ${e.sym}.`, e.sym[0] !== e.name[0] ? `Its symbol comes from its Latin name - one to learn by heart.` : 'Symbols start with a capital letter; any second letter is lower case.'], 1);
  }
  if (kind === 'name') {
    const wrong = closest(rand, EL, e, (x) => (x.name[0] === e.sym[0] ? 0 : x.sym[0] === e.sym[0] ? 0.5 : 2) + Math.abs(x.z - e.z) / 20).map((x) => x.name.toLowerCase());
    return mcq(rand, `Which element has the symbol **${e.sym}**?`, name, wrong, [`${e.sym} is ${name}.`], 1);
  }
  if (kind === 'group') {
    const g = aqaGroup(e.group);
    const wrong = [g - 1, g + 1, g + 2, g - 2, 0, 1, 7].filter((x) => x >= 0 && x <= 7 && x !== g).map(groupName);
    return mcq(rand, `Which group of the periodic table is **${name}** in?`, groupName(g), wrong, [`${cap(name)} is in ${groupName(g)} (period ${e.period}).`, g === 0 ? 'Group 0 are the noble gases, with full outer shells.' : `Elements in Group ${g} have ${g} electron${g > 1 ? 's' : ''} in their outer shell.`], 2);
  }
  if (kind === 'shells') {
    const correct = electronShells(e.z)!;
    const parts = correct.split(', ').map(Number);
    const wrong = [electronShells(e.z + 1), electronShells(e.z - 1), electronShells(e.z + 2), parts.length > 1 ? [...parts].reverse().join(', ') : null, parts.length > 1 ? [parts[0] + 1, ...parts.slice(1, -1), parts[parts.length - 1] - 1].filter((n) => n > 0).join(', ') : `${e.z}, 1`]
      .filter((x): x is string => !!x && x !== correct);
    return mcq(rand, `What is the electronic structure of **${name}** (atomic number ${e.z})?`, correct, wrong, [`${e.z} electrons: up to 2 in the first shell, then up to 8 in the second and third.`, `${cap(name)}: ${correct}.`], 2);
  }
  if (kind === 'ion') {
    const g = aqaGroup(e.group);
    const c = g <= 3 ? g : g - 8;
    const right = ionStr(e.sym, c);
    const wrong = [ionStr(e.sym, -c), ionStr(e.sym, c > 0 ? c + 1 : c - 1), ionStr(e.sym, c > 0 ? Math.max(1, c - 1) : Math.min(-1, c + 1)), ionStr(e.sym, c > 0 ? c + 2 : c - 2)].filter((x) => x !== right);
    return mcq(rand, `Which ion does **${name}** form?`, right, wrong, [c > 0 ? `${cap(name)} is in Group ${g}: it LOSES ${c} outer electron${c > 1 ? 's' : ''} to get a full outer shell, forming ${right}.` : `${cap(name)} is in Group ${g}: it GAINS ${-c} electron${c < -1 ? 's' : ''} to fill its outer shell, forming ${right}.`], 2);
  }
  // family
  const fam = e.group === 1 ? 'an alkali metal' : e.group === 17 ? 'a halogen' : e.group === 18 ? 'a noble gas' : 'a transition metal';
  return mcq(rand, `Which family does **${name}** belong to?`, fam, ['an alkali metal', 'a halogen', 'a noble gas', 'a transition metal', 'an alkaline earth metal'], [`${cap(name)} is ${fam}${e.group === 1 ? ' (Group 1)' : e.group === 17 ? ' (Group 7)' : e.group === 18 ? ' (Group 0)' : ' (the central block)'}.`], 2);
}

// ---------- ionic formulae ----------
const CATIONS: [string, string, number, boolean][] = [
  ['sodium', 'Na', 1, false], ['potassium', 'K', 1, false], ['lithium', 'Li', 1, false], ['silver', 'Ag', 1, false], ['ammonium', 'NH₄', 1, true],
  ['magnesium', 'Mg', 2, false], ['calcium', 'Ca', 2, false], ['barium', 'Ba', 2, false], ['zinc', 'Zn', 2, false], ['copper(II)', 'Cu', 2, false],
  ['iron(II)', 'Fe', 2, false], ['iron(III)', 'Fe', 3, false], ['aluminium', 'Al', 3, false],
];
const ANIONS: [string, string, number, boolean][] = [
  ['chloride', 'Cl', 1, false], ['bromide', 'Br', 1, false], ['iodide', 'I', 1, false], ['fluoride', 'F', 1, false], ['hydroxide', 'OH', 1, true],
  ['nitrate', 'NO₃', 1, true], ['oxide', 'O', 2, false], ['sulfide', 'S', 2, false], ['sulfate', 'SO₄', 2, true], ['carbonate', 'CO₃', 2, true],
];
const NO_PAIR = new Set(['aluminium carbonate', 'ammonium hydroxide', 'silver hydroxide', 'iron(III) carbonate', 'ammonium oxide', 'ammonium sulfide', 'copper(II) iodide', 'ammonium fluoride']);
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const part = (sym: string, n: number, poly: boolean) => (poly && n > 1 ? `(${sym})${sub(n)}` : `${sym}${sub(n)}`);
function formulaOf(c: [string, string, number, boolean], a: [string, string, number, boolean]) {
  const l = (c[2] * a[2]) / gcd(c[2], a[2]);
  return { nc: l / c[2], na: l / a[2], text: part(c[1], l / c[2], c[3]) + part(a[1], l / a[2], a[3]) };
}
function formulaQ(rand: () => number): GeneratedQuestion {
  let c = pick(rand, CATIONS), a = pick(rand, ANIONS);
  for (let k = 0; k < 20 && NO_PAIR.has(`${c[0]} ${a[0]}`); k++) { c = pick(rand, CATIONS); a = pick(rand, ANIONS); }
  const name = `${c[0]} ${a[0]}`;
  const f = formulaOf(c, a);
  const why = [`${c[3] ? c[1] : ionStr(c[1], c[2])}${c[3] ? sup(c[2]) + '⁺' : ''} has a ${c[2]}+ charge and ${a[1]}${sup(a[2])}⁻ has a ${a[2]}− charge.`, `Balance the charges: ${f.nc} × (+${c[2]}) = ${f.na} × (−${a[2]}) → ${f.text}${a[3] && f.na > 1 ? ' (brackets show the whole ion is doubled/tripled)' : ''}.`];
  if (rand() < 0.65) {
    const wrong = [
      part(c[1], 1, c[3]) + part(a[1], 1, a[3]),
      part(c[1], f.na, c[3]) + part(a[1], f.nc, a[3]),
      c[3] || a[3] ? `${c[1]}${sub(f.nc)}${a[1]}${sub(f.na)}` : part(c[1], f.nc * 2, c[3]) + part(a[1], f.na * 2, a[3]),
      part(c[1], f.nc, c[3]) + part(a[1], f.na + 1, a[3]),
      part(c[1], a[2], c[3]) + part(a[1], c[2] + 1, a[3]),
      part(c[1], f.nc + 1, c[3]) + part(a[1], f.na, a[3]),
    ].filter((x) => x !== f.text);
    return mcq(rand, `What is the formula of **${name}**?`, f.text, wrong, why, 3, ['Write the charge on each ion, then use enough of each to make the total charge zero.']);
  }
  const sibling: Record<string, string> = { chloride: 'chlorine', bromide: 'bromine', iodide: 'iodine', fluoride: 'fluorine', oxide: 'oxygen', sulfide: 'sulfate', sulfate: 'sulfide', carbonate: 'hydrogencarbonate', nitrate: 'nitride', hydroxide: 'oxide' };
  const otherCat = c[0].startsWith('iron') ? (c[0] === 'iron(II)' ? 'iron(III)' : 'iron(II)') : c[0] === 'copper(II)' ? 'copper(I)' : CATIONS.find((x) => x[2] === c[2] && x[0] !== c[0])?.[0] ?? 'sodium';
  const wrong = [`${c[0]} ${sibling[a[0]]}`, `${otherCat} ${a[0]}`, `${c[0]} ${ANIONS.find((x) => x[2] === a[2] && x[0] !== a[0])?.[0]}`, `${otherCat} ${sibling[a[0]]}`];
  return mcq(rand, `What is the name of the compound **${f.text}**?`, name, wrong, [`${f.text} contains ${c[0]} ions and ${a[0]} ions: ${name}.`, a[3] ? `${a[1]} is the ${a[0]} ion.` : `A compound of a metal and one non-metal ends in **-ide** (e.g. chloride, not chlorine).`], 2);
}

// ---------- homologous series ----------
const STEM = ['meth', 'eth', 'prop', 'but', 'pent', 'hex'];
const alkane = (n: number) => ({ name: `${STEM[n - 1]}ane`, f: `C${sub(n)}H${sub(2 * n + 2)}` });
const alkene = (n: number) => ({ name: `${STEM[n - 1]}ene`, f: `C${sub(n)}H${sub(2 * n)}` });
const alcohol = (n: number) => ({ name: `${STEM[n - 1]}anol`, f: n === 1 ? 'CH₃OH' : `C${sub(n)}H${sub(2 * n + 1)}OH` });
const acid = (n: number) => ({ name: `${STEM[n - 1]}anoic acid`, f: n === 1 ? 'HCOOH' : n === 2 ? 'CH₃COOH' : `C${sub(n - 1)}H${sub(2 * n - 1)}COOH` });
function hydrocarbonQ(rand: () => number, lvl: number, withTriple: boolean): GeneratedQuestion {
  const series = withTriple ? pick(rand, ['alkane', 'alkene', 'alcohol', 'acid', 'alkane', 'alkene'] as const) : pick(rand, ['alkane', 'alkene'] as const);
  const n = series === 'alkene' ? 2 + Math.floor(rand() * 5) : series === 'alkane' ? 1 + Math.floor(rand() * 6) : 1 + Math.floor(rand() * 4);
  const mk = { alkane, alkene, alcohol, acid }[series];
  const c = mk(n);
  // every other compound in these series, closest first: same carbon number in another series, or one carbon more/less
  const all: { name: string; f: string; n: number; s: string }[] = [
    ...[1, 2, 3, 4, 5, 6].map((k) => ({ ...alkane(k), n: k, s: 'alkane' })),
    ...[2, 3, 4, 5, 6].map((k) => ({ ...alkene(k), n: k, s: 'alkene' })),
    ...(withTriple ? [1, 2, 3, 4].flatMap((k) => [{ ...alcohol(k), n: k, s: 'alcohol' }, { ...acid(k), n: k, s: 'acid' }]) : []),
  ];
  const others = all.filter((x) => x.f !== c.f).sort((x, y) => (Math.abs(x.n - n) + (x.s === series ? 0.3 : 0) + rand() * 0.2) - (Math.abs(y.n - n) + (y.s === series ? 0.3 : 0) + rand() * 0.2));
  const label = { alkane: 'alkanes', alkene: 'alkenes', alcohol: 'alcohols', acid: 'carboxylic acids' }[series];
  const gen = { alkane: 'CₙH₂ₙ₊₂', alkene: 'CₙH₂ₙ', alcohol: 'CₙH₂ₙ₊₁OH', acid: 'Cₙ₋₁H₂ₙ₋₁COOH' }[series];
  const why = [`${cap(c.name)} is in the ${label} (general formula ${gen}).`, `The prefix tells you the number of carbon atoms: meth 1, eth 2, prop 3, but 4, pent 5, hex 6.`];
  const t = rand();
  if (t < 0.4) {
    if (lvl >= 4 && series !== 'acid') return typed(`Give the molecular formula of **${c.name}**. (Type numbers normally, e.g. C3H8.)`, c.f.replace(/[₀-₉]/g, (d) => String(SUB.indexOf(d))), [c.f], why, 3);
    return mcq(rand, `What is the molecular formula of **${c.name}**?`, c.f, [...others.map((o) => o.f), series === 'alkane' ? `C${sub(n)}H${sub(2 * n)}` : `C${sub(n)}H${sub(2 * n + 2)}`, `C${sub(n)}H${sub(Math.max(2, 2 * n - 2))}`], why, 2);
  }
  if (t < 0.75) return mcq(rand, `Name the compound with the formula **${c.f}**.`, c.name, others.map((o) => o.name).concat([`${STEM[Math.min(5, n)]}${series === 'alkene' ? 'ene' : 'ane'}`]), why, 2);
  const seriesOpts = withTriple ? ['alkanes', 'alkenes', 'alcohols', 'carboxylic acids', 'esters'] : ['alkanes', 'alkenes', 'alcohols', 'polymers'];
  return mcq(rand, `Which homologous series does **${c.name}** (${c.f}) belong to?`, label, seriesOpts, why, 1);
}

// ---------- chemical tests ----------
const TESTS: { cat: string; thing: string; result: string; unique: boolean; triple?: boolean }[] = [
  { cat: 'gas', thing: 'hydrogen', result: 'a lighted splint burns with a squeaky pop', unique: true },
  { cat: 'gas', thing: 'oxygen', result: 'a glowing splint relights', unique: true },
  { cat: 'gas', thing: 'carbon dioxide', result: 'limewater turns milky (cloudy)', unique: true },
  { cat: 'gas', thing: 'chlorine', result: 'damp litmus paper is bleached white', unique: true },
  { cat: 'flame', thing: 'lithium ions (Li⁺)', result: 'a crimson flame', unique: true, triple: true },
  { cat: 'flame', thing: 'sodium ions (Na⁺)', result: 'a yellow flame', unique: true, triple: true },
  { cat: 'flame', thing: 'potassium ions (K⁺)', result: 'a lilac flame', unique: true, triple: true },
  { cat: 'flame', thing: 'calcium ions (Ca²⁺)', result: 'an orange-red flame', unique: true, triple: true },
  { cat: 'flame', thing: 'copper ions (Cu²⁺)', result: 'a green flame', unique: true, triple: true },
  { cat: 'hydroxide', thing: 'copper(II) ions (Cu²⁺)', result: 'a blue precipitate', unique: true, triple: true },
  { cat: 'hydroxide', thing: 'iron(II) ions (Fe²⁺)', result: 'a green precipitate', unique: true, triple: true },
  { cat: 'hydroxide', thing: 'iron(III) ions (Fe³⁺)', result: 'a brown precipitate', unique: true, triple: true },
  { cat: 'hydroxide', thing: 'aluminium ions (Al³⁺)', result: 'a white precipitate that dissolves in excess sodium hydroxide', unique: true, triple: true },
  { cat: 'hydroxide', thing: 'magnesium ions (Mg²⁺)', result: 'a white precipitate that does not dissolve in excess', unique: false, triple: true },
  { cat: 'halide', thing: 'chloride ions (Cl⁻)', result: 'a white precipitate', unique: true, triple: true },
  { cat: 'halide', thing: 'bromide ions (Br⁻)', result: 'a cream precipitate', unique: true, triple: true },
  { cat: 'halide', thing: 'iodide ions (I⁻)', result: 'a yellow precipitate', unique: true, triple: true },
];
const TEST_HOW: Record<string, string> = {
  gas: 'Gas tests', flame: 'Flame test: dip a clean nichrome wire loop in the sample and hold it in a blue Bunsen flame.',
  hydroxide: 'Add a few drops of sodium hydroxide solution.', halide: 'Add dilute nitric acid, then silver nitrate solution.',
};
function testsQ(rand: () => number): GeneratedQuestion {
  const t = pick(rand, TESTS);
  const same = TESTS.filter((x) => x.cat === t.cat && x !== t);
  const how = TEST_HOW[t.cat];
  const why = [t.cat === 'gas' ? `Test for ${t.thing}: ${t.result}.` : `${how} ${cap(t.thing)} give ${t.result}.`];
  const ask = t.cat === 'gas' ? `What is the positive result of the test for **${t.thing}**?` : t.cat === 'flame' ? `What colour flame do **${t.thing}** give in a flame test?` : t.cat === 'hydroxide' ? `What forms when sodium hydroxide solution is added to a solution containing **${t.thing}**?` : `What forms when dilute nitric acid and silver nitrate solution are added to a solution containing **${t.thing}**?`;
  if (rand() < 0.5 || !t.unique) return mcq(rand, ask, t.result, same.map((x) => x.result), why, 2);
  const askBack = t.cat === 'gas' ? `A gas is tested and **${t.result}**. Which gas is it?` : t.cat === 'flame' ? `A compound gives **${t.result}** in a flame test. Which ions does it contain?` : t.cat === 'hydroxide' ? `Sodium hydroxide solution is added to a solution and **${t.result}** forms. Which ions are present?` : `Dilute nitric acid and silver nitrate solution are added to a solution and **${t.result}** forms. Which ions are present?`;
  return mcq(rand, askBack, t.thing, same.filter((x) => x.unique || t.cat !== 'hydroxide').map((x) => x.thing), why, 2);
}

// ---------- salts ----------
const ACIDS: [string, string][] = [['hydrochloric acid', 'chloride'], ['sulfuric acid', 'sulfate'], ['nitric acid', 'nitrate']];
const REACTANTS: { name: string; metal: string; type: 'metal' | 'base' | 'carbonate'; noNitric?: boolean }[] = [
  { name: 'magnesium', metal: 'magnesium', type: 'metal', noNitric: true }, { name: 'zinc', metal: 'zinc', type: 'metal', noNitric: true }, { name: 'iron', metal: 'iron(II)', type: 'metal', noNitric: true },
  { name: 'copper(II) oxide', metal: 'copper(II)', type: 'base' }, { name: 'magnesium oxide', metal: 'magnesium', type: 'base' }, { name: 'zinc oxide', metal: 'zinc', type: 'base' },
  { name: 'sodium hydroxide', metal: 'sodium', type: 'base' }, { name: 'potassium hydroxide', metal: 'potassium', type: 'base' },
  { name: 'calcium carbonate', metal: 'calcium', type: 'carbonate' }, { name: 'copper(II) carbonate', metal: 'copper(II)', type: 'carbonate' }, { name: 'sodium carbonate', metal: 'sodium', type: 'carbonate' }, { name: 'magnesium carbonate', metal: 'magnesium', type: 'carbonate' },
];
function saltsQ(rand: () => number): GeneratedQuestion {
  const r = pick(rand, REACTANTS);
  const acids = r.noNitric ? ACIDS.slice(0, 2) : ACIDS;
  const [acidName, anion] = pick(rand, acids);
  const salt = `${r.metal} ${anion}`;
  const prods = { metal: `${salt} + hydrogen`, base: `${salt} + water`, carbonate: `${salt} + water + carbon dioxide` };
  const why = [`${cap(acidName)} makes ${anion} salts.`, r.type === 'metal' ? 'metal + acid → salt + hydrogen' : r.type === 'base' ? 'base (metal oxide or hydroxide) + acid → salt + water' : 'metal carbonate + acid → salt + water + carbon dioxide', `${cap(r.name)} + ${acidName} → ${prods[r.type]}`];
  if (rand() < 0.5) {
    const other = ACIDS.filter((a) => a[1] !== anion).map((a) => `${r.metal} ${a[1]}`);
    const err = anion === 'chloride' ? `${r.metal} chlorine` : anion === 'sulfate' ? `${r.metal} sulfide` : `${r.metal} nitride`;
    return mcq(rand, `Which salt is made when **${r.name}** reacts with **${acidName}**?`, salt, [err, ...other], why, 2);
  }
  const wrong = Object.entries(prods).filter(([k]) => k !== r.type).map(([, v]) => v).concat([`${salt} + oxygen`]);
  return mcq(rand, `What are the products when **${r.name}** reacts with **${acidName}**?`, prods[r.type], wrong, why, 2);
}

// ---------- reactivity ----------
const SERIES = ['potassium', 'sodium', 'lithium', 'calcium', 'magnesium', 'aluminium', 'zinc', 'iron', 'copper', 'silver', 'gold'];
function reactivityQ(rand: () => number): GeneratedQuestion {
  const t = rand();
  const seriesWhy = 'Reactivity series (most → least): potassium, sodium, lithium, calcium, magnesium, aluminium, (carbon), zinc, iron, (hydrogen), copper, silver, gold.';
  if (t < 0.35) {
    const four = shuffle(SERIES, rand).slice(0, 4);
    const most = four.reduce((a, b) => (SERIES.indexOf(a) < SERIES.indexOf(b) ? a : b));
    const least = four.reduce((a, b) => (SERIES.indexOf(a) > SERIES.indexOf(b) ? a : b));
    const askMost = rand() < 0.5;
    return mcq(rand, `Which of these metals is the **${askMost ? 'most' : 'least'}** reactive?`, askMost ? most : least, four.filter((x) => x !== (askMost ? most : least)), [seriesWhy], 2);
  }
  if (t < 0.7) {
    const target = pick(rand, [['copper', 'copper sulfate'], ['iron', 'iron sulfate'], ['silver', 'silver nitrate'], ['zinc', 'zinc sulfate']] as const);
    const ti = SERIES.indexOf(target[0]);
    const can = ['magnesium', 'zinc', 'iron', 'copper'].filter((m) => SERIES.indexOf(m) < ti);
    const cannot = ['copper', 'silver', 'gold', 'iron', 'zinc'].filter((m) => SERIES.indexOf(m) > ti);
    const ans = pick(rand, can);
    return mcq(rand, `Which metal would **displace ${target[0]}** from ${target[1]} solution?`, ans, [...cannot, target[0], ...(target[0] === 'silver' ? ['platinum'] : [])].filter((m) => m !== ans), [`A more reactive metal displaces a less reactive metal from a solution of its compound.`, `${cap(ans)} is more reactive than ${target[0]}, so it displaces it.`, seriesWhy], 2);
  }
  const m = pick(rand, [['potassium', 'electrolysis'], ['sodium', 'electrolysis'], ['calcium', 'electrolysis'], ['magnesium', 'electrolysis'], ['aluminium', 'electrolysis'], ['zinc', 'reduction with carbon'], ['iron', 'reduction with carbon'], ['copper', 'reduction with carbon'], ['gold', 'it is found as the uncombined element']] as const);
  return mcq(rand, `How is **${m[0]}** usually obtained from the Earth?`, m[1], ['electrolysis', 'reduction with carbon', 'it is found as the uncombined element', 'heating the ore in air', 'displacement using sodium'], [m[1] === 'electrolysis' ? `${cap(m[0])} is more reactive than carbon, so carbon cannot reduce its oxide: electrolysis is used.` : m[1] === 'reduction with carbon' ? `${cap(m[0])} is less reactive than carbon, so its oxide can be reduced by heating with carbon.` : 'Gold is so unreactive it is found as the metal itself.'], 2);
}

// ---------- electrolysis ----------
const ELECTROLYSIS: [string, string, string][] = [ // compound, cathode, anode
  ['molten lead bromide', 'lead', 'bromine'], ['molten sodium chloride', 'sodium', 'chlorine'], ['molten zinc chloride', 'zinc', 'chlorine'], ['molten aluminium oxide (in cryolite)', 'aluminium', 'oxygen'], ['molten potassium iodide', 'potassium', 'iodine'],
  ['sodium chloride solution', 'hydrogen', 'chlorine'], ['copper(II) sulfate solution', 'copper', 'oxygen'], ['copper(II) chloride solution', 'copper', 'chlorine'], ['potassium bromide solution', 'hydrogen', 'bromine'],
  ['sodium sulfate solution', 'hydrogen', 'oxygen'], ['dilute sulfuric acid', 'hydrogen', 'oxygen'], ['potassium iodide solution', 'hydrogen', 'iodine'], ['silver nitrate solution', 'silver', 'oxygen'],
];
function electrolysisQ(rand: () => number): GeneratedQuestion {
  const [cpd, cat, anode] = pick(rand, ELECTROLYSIS);
  const atCathode = rand() < 0.5;
  const aqueous = !cpd.startsWith('molten');
  const metal = cpd.replace(/^molten /, '').split(' ')[0].replace('(II)', '');
  const ans = atCathode ? cat : anode;
  const wrong = [atCathode ? anode : cat, 'hydrogen', 'oxygen', metal === 'dilute' ? 'sulfur' : metal, anode === 'oxygen' ? 'sulfur dioxide' : `${anode} ions`].filter((x) => x !== ans);
  const why = aqueous
    ? [`In solution, water also provides H⁺ and OH⁻ ions.`, `Cathode (−): ${cat === 'hydrogen' ? 'hydrogen forms because the metal is more reactive than hydrogen' : `${cat} forms because it is less reactive than hydrogen`}.`, `Anode (+): ${anode === 'oxygen' ? 'oxygen forms because there are no halide ions' : `${anode} forms because halide ions are present`}.`]
    : [`Molten ionic compounds: the metal forms at the cathode (−) and the non-metal at the anode (+).`, `Cathode: ${cat}. Anode: ${anode}.`];
  return mcq(rand, `During the electrolysis of **${cpd}**, what is produced at the **${atCathode ? 'cathode (negative electrode)' : 'anode (positive electrode)'}**?`, ans, wrong, why, 3);
}

// ---------- energy changes ----------
const REACTIONS: [string, boolean][] = [
  ['burning methane in a Bunsen burner', true], ['neutralising hydrochloric acid with sodium hydroxide', true], ['respiration in cells', true], ['the reaction in a self-heating can or hand warmer', true], ['adding zinc to copper sulfate solution (displacement)', true],
  ['the thermal decomposition of calcium carbonate', false], ['reacting citric acid with sodium hydrogencarbonate', false], ['photosynthesis', false], ['dissolving ammonium nitrate in water (a sports injury cold pack)', false],
];
function energyQ(rand: () => number): GeneratedQuestion {
  const [r, exo] = pick(rand, REACTIONS);
  const opts = ['exothermic – the surroundings get warmer', 'exothermic – the surroundings get colder', 'endothermic – the surroundings get colder', 'endothermic – the surroundings get warmer'];
  const ans = exo ? opts[0] : opts[2];
  return mcq(rand, `Is **${r}** exothermic or endothermic, and what happens to the temperature of the surroundings?`, ans, opts, [exo ? 'Exothermic reactions transfer energy TO the surroundings, so the temperature rises.' : 'Endothermic reactions take in energy FROM the surroundings, so the temperature falls.'], 2);
}

// ---------- atmosphere ----------
function atmosphereQ(rand: () => number): GeneratedQuestion {
  const t = rand();
  if (t < 0.35) {
    const [gas, ans] = pick(rand, [['nitrogen', 'about 80%'], ['oxygen', 'about 20%'], ['carbon dioxide', 'about 0.04%'], ['argon (and other noble gases)', 'just under 1%']] as const);
    return mcq(rand, `Approximately what percentage of the Earth's atmosphere today is **${gas}**?`, ans, ['about 80%', 'about 20%', 'about 0.04%', 'just under 1%', 'about 4%', 'about 50%'], ['Today: about 80% nitrogen, 20% oxygen, and small amounts of other gases including argon (~0.9%), carbon dioxide (~0.04%) and water vapour.'], 2);
  }
  if (t < 0.65) {
    const g = pick(rand, ['carbon dioxide', 'methane', 'water vapour']);
    return mcq(rand, 'Which of these is a **greenhouse gas**?', g, ['nitrogen', 'oxygen', 'argon', 'hydrogen'], ['Greenhouse gases (carbon dioxide, methane, water vapour) absorb infrared radiation emitted by the Earth, keeping it warm. Nitrogen, oxygen and argon do not.'], 1);
  }
  const P: [string, string][] = [
    ['carbon monoxide', 'incomplete combustion of fuels – a toxic, colourless and odourless gas'],
    ['soot (carbon particulates)', 'incomplete combustion – tiny solid particles of carbon'],
    ['sulfur dioxide', 'burning fuels that contain sulfur impurities'],
    ['oxides of nitrogen', 'nitrogen and oxygen from the air reacting at the high temperatures inside engines'],
  ];
  const [p, how] = pick(rand, P);
  return mcq(rand, `Which pollutant is produced by **${how}**?`, p, P.map((x) => x[0]).concat(['carbon dioxide']), [`${cap(p)}: ${how}.`, 'Effects: CO is toxic (stops blood carrying oxygen); particulates cause global dimming and lung damage; SO₂ and oxides of nitrogen cause acid rain and breathing problems.'], 2);
}

// =========================== BIOLOGY ===========================
const CELL: [string, string][] = [
  ['nucleus', 'contains genetic material that controls the activities of the cell'], ['cytoplasm', 'a gel where most of the cell\'s chemical reactions happen'],
  ['cell membrane', 'controls which substances enter and leave the cell'], ['mitochondria', 'where aerobic respiration releases energy'],
  ['ribosomes', 'where proteins are made (protein synthesis)'], ['chloroplasts', 'absorb light for photosynthesis'],
  ['permanent vacuole', 'filled with cell sap, keeping the cell rigid'], ['cell wall', 'made of cellulose; strengthens and supports the cell'],
  ['plasmids', 'small rings of DNA found in bacteria'],
];
function cellQ(rand: () => number, lvl: number): GeneratedQuestion {
  const t = rand();
  if (t < 0.25) {
    const ans = pick(rand, ['chloroplasts', 'permanent vacuole', 'cell wall']);
    return mcq(rand, 'Which of these is found in **plant cells but not animal cells**?', ans, ['nucleus', 'mitochondria', 'ribosomes', 'cell membrane', 'cytoplasm'], ['Plant cells have a cell wall, a permanent vacuole and chloroplasts as well as the parts animal cells have.'], 2);
  }
  if (t < 0.4) {
    const ans = pick(rand, ['plasmids', 'ribosomes', 'cell membrane', 'cytoplasm']);
    return mcq(rand, 'Which of these is found in a **bacterial (prokaryotic) cell**?', ans, ['nucleus', 'mitochondria', 'chloroplasts', 'permanent vacuole'], ['Bacteria have cytoplasm, a cell membrane, a cell wall, ribosomes, a single loop of DNA and often plasmids - but no nucleus, mitochondria or chloroplasts.'], 2);
  }
  const [name, fn] = pick(rand, CELL);
  if (t < 0.7) {
    if (lvl >= 4) return typed(`Which cell structure matches this description?\n\n> ${cap(fn)}`, name, name === 'mitochondria' ? ['mitochondrion'] : name === 'ribosomes' ? ['ribosome'] : name === 'chloroplasts' ? ['chloroplast'] : name === 'plasmids' ? ['plasmid'] : name === 'permanent vacuole' ? ['vacuole'] : [], [`The ${name} ${fn}.`], 3);
    return mcq(rand, `Which cell structure matches this description?\n\n> ${cap(fn)}`, name, CELL.filter((c) => c[0] !== name).map((c) => c[0]), [`The ${name} ${fn}.`], 1);
  }
  return mcq(rand, `What is the function of the **${name}**?`, fn, CELL.filter((c) => c[0] !== name).map((c) => c[1]), [`The ${name} ${fn}.`], 2);
}

const ENZ: [string, string, string, string][] = [ // enzyme, substrate, products, made in
  ['amylase', 'starch', 'sugars', 'the salivary glands, pancreas and small intestine'],
  ['protease', 'proteins', 'amino acids', 'the stomach, pancreas and small intestine'],
  ['lipase', 'lipids (fats and oils)', 'fatty acids and glycerol', 'the pancreas and small intestine'],
];
const FOODTEST: [string, string, string][] = [ // nutrient, reagent, positive result
  ['starch', 'iodine solution', 'orange-brown turns blue-black'],
  ['reducing sugars (e.g. glucose)', 'Benedict\'s solution, heated in a water bath', 'blue turns brick-red'],
  ['protein', 'Biuret reagent', 'blue turns purple'],
  ['lipids (fats and oils)', 'Sudan III stain', 'a red-stained oily layer forms on top'],
];
function digestionQ(rand: () => number): GeneratedQuestion {
  const t = rand();
  if (t < 0.45) {
    const e = pick(rand, ENZ);
    const k = rand();
    if (k < 0.34) return mcq(rand, `What does the enzyme **${e[0]}** break down?`, e[1], [...ENZ.filter((x) => x !== e).map((x) => x[1]), 'cellulose', 'glycogen'], [`${cap(e[0])} breaks down ${e[1]} into ${e[2]}. It is made in ${e[3]}.`], 1);
    if (k < 0.67) return mcq(rand, `What are the products when **${e[1]}** ${e[1].startsWith('lipids') || e[1] === 'proteins' ? 'are' : 'is'} digested?`, e[2], [...ENZ.filter((x) => x !== e).map((x) => x[2]), 'carbon dioxide and water', 'glycerol and amino acids'], [`${cap(e[0])}: ${e[1]} → ${e[2]}.`], 2);
    return mcq(rand, `Which enzyme digests **${e[1]}**?`, e[0], [...ENZ.filter((x) => x !== e).map((x) => x[0]), 'bile', e[0] === 'amylase' ? 'lactase' : 'carbohydrase'], [`${cap(e[0])} digests ${e[1]}. (Bile is not an enzyme: it emulsifies fats and neutralises stomach acid.)`], 1);
  }
  if (t < 0.55) return mcq(rand, 'What does **bile** do?', 'emulsifies fats and neutralises stomach acid', ['digests fats into fatty acids and glycerol', 'digests proteins in the stomach', 'kills bacteria in food', 'absorbs water in the large intestine'], ['Bile is made in the liver and stored in the gall bladder. It is alkaline (neutralises acid) and emulsifies fats into droplets, giving lipase a larger surface area. It is not an enzyme.'], 2);
  const f = pick(rand, FOODTEST);
  const k = rand();
  if (k < 0.34) return mcq(rand, `Which reagent is used to test for **${f[0]}**?`, f[1], FOODTEST.filter((x) => x !== f).map((x) => x[1]).concat(['limewater']), [`${cap(f[0])}: ${f[1]} – positive result: ${f[2]}.`], 1);
  if (k < 0.67) return mcq(rand, `What is the positive result of the test for **${f[0]}**?`, f[2], FOODTEST.filter((x) => x !== f).map((x) => x[2]).concat(['blue turns colourless']), [`${cap(f[1])}: ${f[2]}.`], 2);
  return mcq(rand, `A food sample is tested with **${f[1]}** and **${f[2]}**. What does the food contain?`, f[0], FOODTEST.filter((x) => x !== f).map((x) => x[0]).concat(['vitamin C']), [`${cap(f[1])} tests for ${f[0]}.`], 1);
}

const DISEASE: { d: string; type: string; spread: string; sign: string; control: string }[] = [
  { d: 'measles', type: 'a virus', spread: 'inhaling droplets from sneezes and coughs', sign: 'a fever and a red skin rash', control: 'vaccinating young children' },
  { d: 'HIV', type: 'a virus', spread: 'sexual contact or exchanging body fluids, e.g. sharing needles', sign: 'a flu-like illness at first; later it attacks the immune system', control: 'antiretroviral drugs' },
  { d: 'tobacco mosaic virus (TMV)', type: 'a virus', spread: 'contact between plants, e.g. on hands and tools', sign: 'a mosaic pattern of discoloured patches on leaves', control: 'removing infected plants and growing resistant varieties' },
  { d: 'salmonella food poisoning', type: 'a bacterium', spread: 'eating undercooked or contaminated food', sign: 'fever, abdominal cramps, vomiting and diarrhoea', control: 'vaccinating poultry and cooking food thoroughly' },
  { d: 'gonorrhoea', type: 'a bacterium', spread: 'unprotected sexual contact', sign: 'a thick yellow or green discharge and pain when urinating', control: 'antibiotics and using condoms' },
  { d: 'rose black spot', type: 'a fungus', spread: 'spores carried by wind and water', sign: 'purple or black spots on leaves, which turn yellow and drop early', control: 'fungicides and removing affected leaves' },
  { d: 'malaria', type: 'a protist', spread: 'mosquitoes (vectors) when they feed on blood', sign: 'recurring episodes of fever', control: 'mosquito nets and stopping mosquitoes breeding' },
];
function diseaseQ(rand: () => number): GeneratedQuestion {
  const x = pick(rand, DISEASE);
  const t = rand();
  const why = [`${cap(x.d)} is caused by ${x.type}. Spread: ${x.spread}. Signs: ${x.sign}. Controlled by: ${x.control}.`];
  if (t < 0.35) return mcq(rand, `What type of pathogen causes **${x.d}**?`, x.type, ['a virus', 'a bacterium', 'a fungus', 'a protist'], why, 1);
  if (t < 0.6) return mcq(rand, `Which disease causes **${x.sign}**?`, x.d, DISEASE.filter((y) => y !== x).map((y) => y.d), why, 2);
  if (t < 0.8) return mcq(rand, `How is **${x.d}** spread?`, x.spread, DISEASE.filter((y) => y !== x).map((y) => y.spread), why, 2);
  return mcq(rand, `How is **${x.d}** prevented or treated?`, x.control, DISEASE.filter((y) => y !== x).map((y) => y.control), why, 2);
}

const HORMONES: { h: string; gland: string; effect: string; higher?: boolean; triple?: boolean }[] = [
  { h: 'insulin', gland: 'pancreas', effect: 'lowers blood glucose by making cells take up glucose' },
  { h: 'glucagon', gland: 'pancreas', effect: 'raises blood glucose by converting glycogen back to glucose', higher: true },
  { h: 'adrenaline', gland: 'adrenal glands', effect: 'increases heart rate, preparing the body for "fight or flight"', higher: true },
  { h: 'thyroxine', gland: 'thyroid gland', effect: 'stimulates the basal metabolic rate', higher: true },
  { h: 'oestrogen', gland: 'ovaries', effect: 'causes the uterus lining to build up and controls female puberty' },
  { h: 'progesterone', gland: 'ovaries', effect: 'maintains the lining of the uterus' },
  { h: 'testosterone', gland: 'testes', effect: 'stimulates sperm production and male puberty' },
  { h: 'FSH', gland: 'pituitary gland', effect: 'causes eggs to mature in the ovaries' },
  { h: 'LH', gland: 'pituitary gland', effect: 'stimulates the release of an egg (ovulation)' },
];
const GLANDS = ['pancreas', 'adrenal glands', 'thyroid gland', 'pituitary gland', 'ovaries', 'testes'];
function hormoneQ(rand: () => number, lvl: number): GeneratedQuestion {
  // glucagon, adrenaline and thyroxine are Higher tier: only at harder levels
  const x = pick(rand, HORMONES.filter((h) => !h.higher || lvl >= 3));
  const why = [`${cap(x.h)} is made by the ${x.gland}. It ${x.effect}.`];
  const t = rand();
  if (t < 0.4) return mcq(rand, `Which gland produces **${x.h}**?`, x.gland, GLANDS, why, 1);
  if (t < 0.7) return mcq(rand, `What does **${x.h}** do?`, x.effect, HORMONES.filter((y) => y !== x).map((y) => y.effect), why, 2);
  return mcq(rand, `Which hormone **${x.effect}**?`, x.h, HORMONES.filter((y) => y !== x && y.gland === x.gland).map((y) => y.h).concat(HORMONES.filter((y) => y !== x && y.gland !== x.gland).map((y) => y.h)), why, 2);
}

const BLOOD: [string, string][] = [
  ['red blood cells', 'carry oxygen, using haemoglobin'], ['white blood cells', 'defend the body against pathogens'], ['platelets', 'help the blood to clot at a wound'], ['plasma', 'transports cells, glucose, carbon dioxide, urea and hormones'],
  ['arteries', 'carry blood away from the heart at high pressure'], ['veins', 'carry blood back to the heart and have valves'], ['capillaries', 'have walls one cell thick for exchanging substances'],
  ['the aorta', 'carries oxygenated blood from the left ventricle to the body'], ['the pulmonary artery', 'carries deoxygenated blood from the right ventricle to the lungs'],
  ['the pulmonary vein', 'carries oxygenated blood from the lungs to the left atrium'], ['the vena cava', 'carries deoxygenated blood from the body to the right atrium'], ['the coronary arteries', 'supply the heart muscle itself with oxygen'],
];
function bloodQ(rand: () => number): GeneratedQuestion {
  const i = Math.floor(rand() * BLOOD.length);
  const [n, fn] = BLOOD[i];
  const group = i < 4 ? BLOOD.slice(0, 4) : i < 7 ? BLOOD.slice(4, 7) : BLOOD.slice(7);
  const pool = [...group, ...BLOOD.filter((b) => !group.includes(b))];
  if (rand() < 0.5) return mcq(rand, `Which part of the blood or circulatory system matches this description?\n\n> ${cap(fn)}`, n, pool.filter((b) => b[0] !== n).map((b) => b[0]), [`${cap(n)} ${fn}.`], 2);
  return mcq(rand, `What is the role of **${n}**?`, fn, pool.filter((b) => b[0] !== n).map((b) => b[1]), [`${cap(n)} ${fn}.`], 2);
}

// genetic crosses
const TRAITS: { dom: string; rec: string; a: string; ctx: string; kid: string; how?: string }[] = [
  { dom: 'be tall', rec: 'be short', a: 'T', kid: 'an offspring plant', ctx: 'In pea plants, the allele for tall stems (T) is dominant to the allele for short stems (t).' },
  { dom: 'have purple flowers', rec: 'have white flowers', a: 'P', kid: 'an offspring plant', ctx: 'In a plant, the allele for purple flowers (P) is dominant to the allele for white flowers (p).' },
  { dom: 'be unaffected by cystic fibrosis', rec: 'have cystic fibrosis', a: 'F', kid: 'their child', how: 'have a child', ctx: 'Cystic fibrosis is caused by a recessive allele (f). The dominant allele (F) does not cause the disorder.' },
  { dom: 'have polydactyly (extra digits)', rec: 'have the usual number of digits', a: 'D', kid: 'their child', how: 'have a child', ctx: 'Polydactyly is caused by a dominant allele (D). The recessive allele (d) gives the usual number of fingers and toes.' },
];
function crossQ(rand: () => number, lvl: number): GeneratedQuestion {
  const tr = pick(rand, TRAITS);
  const A = tr.a, a = tr.a.toLowerCase();
  const gts = [`${A}${A}`, `${A}${a}`, `${a}${a}`];
  const p1 = pick(rand, gts.slice(0, 2)), p2 = pick(rand, gts.slice(1));
  const kids = [p1[0] + p2[0], p1[0] + p2[1], p1[1] + p2[0], p1[1] + p2[1]].map((g) => (g[0] === a && g[1] === A ? g[1] + g[0] : g));
  const ask = pick(rand, ['rec', 'dom', 'het'] as const);
  const count = kids.filter((g) => (ask === 'rec' ? g === a + a : ask === 'dom' ? g.includes(A) : g === A + a)).length;
  const pct = count * 25;
  const desc = ask === 'rec' ? tr.rec : ask === 'dom' ? tr.dom : 'be heterozygous';
  const why = [`Gametes: ${p1[0]} or ${p1[1]} from one parent, ${p2[0]} or ${p2[1]} from the other.`, `Punnett square offspring: ${kids.join(', ')}.`, `${count} out of 4 ${desc} → ${pct}%.`];
  const q = `${tr.ctx} ${tr.how ? `Two parents with genotypes **${p1}** and **${p2}** ${tr.how}.` : `Plants with genotypes **${p1}** and **${p2}** are crossed.`} What is the probability (as a percentage) that ${tr.kid} will ${desc}?`;
  if (lvl >= 3) return numQ(q, pct, why, 3, '%', ['Draw a Punnett square: one parent\'s alleles along the top, the other\'s down the side.']);
  return mcq(rand, q, `${pct}%`, ['0%', '25%', '50%', '75%', '100%'], why, 2);
}

const CHAINS = [['grass', 'rabbit', 'fox'], ['phytoplankton', 'zooplankton', 'small fish', 'seal'], ['oak leaves', 'caterpillar', 'blue tit', 'sparrowhawk'], ['grass', 'grasshopper', 'frog', 'snake', 'hawk'], ['seaweed', 'limpet', 'crab', 'gull'], ['algae', 'water flea', 'stickleback', 'pike']];
const ROLES = ['producer', 'primary consumer', 'secondary consumer', 'tertiary consumer', 'quaternary consumer'];
function chainQ(rand: () => number): GeneratedQuestion {
  const ch = pick(rand, CHAINS);
  const i = Math.floor(rand() * Math.min(ch.length, 4));
  const role = i === ch.length - 1 && rand() < 0.4 ? 'apex predator' : ROLES[i];
  const ans = ch[i];
  return mcq(rand, `In the food chain **${ch.join(' → ')}**, which organism is the **${role}**?`, ans, ch.filter((x) => x !== ans), [`${ch.map((x, k) => `${x} = ${ROLES[k]}`).join('; ')}.`, 'Arrows show the direction of energy (biomass) transfer.'], 1);
}

const RANKS = ['kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species'];
function classifyQ(rand: () => number): GeneratedQuestion {
  if (rand() < 0.4) {
    const [g, s, common] = pick(rand, [['Panthera', 'leo', 'lion'], ['Homo', 'sapiens', 'human'], ['Canis', 'lupus', 'grey wolf'], ['Quercus', 'robur', 'English oak'], ['Felis', 'catus', 'domestic cat']] as const);
    const part = rand() < 0.5;
    return mcq(rand, `The ${common} is named **${g} ${s}**. What does **${part ? g : s}** tell you?`, part ? 'its genus' : 'its species', ['its genus', 'its species', 'its family', 'its kingdom', 'its order'], ['The binomial system names organisms by genus (capital letter first) then species.'], 2);
  }
  const i = Math.floor(rand() * (RANKS.length - 1));
  const dir = rand() < 0.5;
  const j = dir ? i + 1 : Math.max(0, i - 1);
  if (dir || i === 0) return mcq(rand, `In the Linnaean system, which rank comes straight **after ${RANKS[i]}** (getting smaller)?`, RANKS[i + 1], RANKS.filter((r) => r !== RANKS[i + 1] && r !== RANKS[i]), [`Kingdom → phylum → class → order → family → genus → species.`], 2);
  return mcq(rand, `In the Linnaean system, which rank comes straight **before ${RANKS[i]}** (getting larger)?`, RANKS[j], RANKS.filter((r) => r !== RANKS[j] && r !== RANKS[i]), [`Kingdom → phylum → class → order → family → genus → species.`], 2);
}

function respirationQ(rand: () => number): GeneratedQuestion {
  const T = [['aerobic respiration', 'carbon dioxide and water'], ['anaerobic respiration in muscles', 'lactic acid'], ['anaerobic respiration in yeast (fermentation)', 'ethanol and carbon dioxide'], ['photosynthesis', 'glucose and oxygen']] as const;
  const x = pick(rand, T);
  if (rand() < 0.75) return mcq(rand, `What are the products of **${x[0]}**?`, x[1], [...T.filter((y) => y !== x).map((y) => y[1] as string), 'lactic acid and carbon dioxide'], ['Aerobic: glucose + oxygen → carbon dioxide + water. Anaerobic in muscles: glucose → lactic acid. In yeast and plant cells: glucose → ethanol + carbon dioxide. Photosynthesis: carbon dioxide + water → glucose + oxygen.'], 2);
  const u = pick(rand, [['make amino acids (with nitrate ions)', 'amino acids'], ['be stored in plants', 'starch'], ['strengthen cell walls', 'cellulose'], ['store energy in seeds', 'fats and oils']] as const);
  return mcq(rand, `Plants convert some of the glucose from photosynthesis to **${u[0]}**. What is it converted into?`, u[1], ['starch', 'cellulose', 'amino acids', 'fats and oils', 'glycogen'], ['Glucose is used for respiration, converted to starch (storage), cellulose (cell walls), fats and oils (storage), and combined with nitrate ions to make amino acids for proteins.'], 2);
}

function nervousQ(rand: () => number): GeneratedQuestion {
  const ARC = ['stimulus', 'receptor', 'sensory neurone', 'relay neurone', 'motor neurone', 'effector', 'response'];
  const t = rand();
  if (t < 0.45) {
    const i = Math.floor(rand() * (ARC.length - 1));
    return mcq(rand, `In a reflex arc, what comes straight **after the ${ARC[i]}**?`, ARC[i + 1], ARC.filter((_, k) => k !== i + 1 && k !== i), ['Stimulus → receptor → sensory neurone → relay neurone (in the spinal cord) → motor neurone → effector → response.'], 2);
  }
  if (t < 0.75) {
    const n = pick(rand, [['carries impulses from receptors to the central nervous system', 'sensory neurone'], ['carries impulses from the central nervous system to effectors', 'motor neurone'], ['passes impulses on inside the spinal cord', 'relay neurone'], ['is the gap between two neurones', 'synapse']] as const);
    return mcq(rand, `What **${n[0]}**?`, n[1], ['sensory neurone', 'motor neurone', 'relay neurone', 'synapse', 'receptor'], ['Sensory neurones carry impulses to the CNS, relay neurones pass them on in the CNS, motor neurones carry them to effectors. Chemicals diffuse across synapses.'], 2);
  }
  const b = pick(rand, [['cerebral cortex', 'consciousness, intelligence, memory and language'], ['cerebellum', 'coordinating muscle movement and balance'], ['medulla', 'unconscious activities such as heart rate and breathing']] as const);
  return mcq(rand, `Which part of the brain is responsible for **${b[1]}**?`, b[0], ['cerebral cortex', 'cerebellum', 'medulla', 'hypothalamus', 'pituitary gland'], ['Cerebral cortex: consciousness, intelligence, memory, language. Cerebellum: muscle coordination. Medulla: unconscious activities.'], 3);
}

function plantQ(rand: () => number): GeneratedQuestion {
  const P: [string, string][] = [
    ['xylem', 'transports water and mineral ions from the roots to the leaves'], ['phloem', 'transports dissolved sugars around the plant (translocation)'],
    ['stomata', 'let carbon dioxide in and oxygen and water vapour out of the leaf'], ['guard cells', 'open and close the stomata'],
    ['root hair cells', 'absorb water and mineral ions from the soil'], ['palisade mesophyll', 'carries out most of the photosynthesis in a leaf'], ['spongy mesophyll', 'has air spaces that let gases diffuse through the leaf'],
  ];
  if (rand() < 0.65) {
    const [n, fn] = pick(rand, P);
    return mcq(rand, `Which plant tissue or structure matches this description?\n\n> ${cap(fn)}`, n, P.filter((x) => x[0] !== n).map((x) => x[0]), [`${cap(n)}: ${fn}.`], 2);
  }
  const [f, eff] = pick(rand, [['the temperature', 'increases'], ['the light intensity', 'increases'], ['the air movement (wind)', 'increases'], ['the humidity', 'decreases']] as const);
  return mcq(rand, `What happens to the rate of **transpiration** if ${f} increases?`, `it ${eff}`, ['it increases', 'it decreases', 'it stays the same', 'it stops completely'], ['Transpiration is faster when it is warmer, brighter (stomata open) and windier, and slower when the air is humid (smaller concentration gradient).'], 2);
}

// =========================== PHYSICS ===========================
const UNITS: { q: string; u: string; cls: string; topics: string[] }[] = [
  { q: 'energy', u: 'joule (J)', cls: 'J', topics: ['energy'] }, { q: 'work done', u: 'joule (J)', cls: 'J', topics: ['energy', 'forces'] },
  { q: 'power', u: 'watt (W)', cls: 'W', topics: ['energy', 'elec'] }, { q: 'force', u: 'newton (N)', cls: 'N', topics: ['forces'] }, { q: 'weight', u: 'newton (N)', cls: 'N', topics: ['forces'] },
  { q: 'mass', u: 'kilogram (kg)', cls: 'kg', topics: ['forces', 'energy'] }, { q: 'current', u: 'ampere (A)', cls: 'A', topics: ['elec'] }, { q: 'potential difference', u: 'volt (V)', cls: 'V', topics: ['elec'] },
  { q: 'resistance', u: 'ohm (Ω)', cls: 'ohm', topics: ['elec'] }, { q: 'charge', u: 'coulomb (C)', cls: 'C', topics: ['elec'] }, { q: 'frequency', u: 'hertz (Hz)', cls: 'Hz', topics: ['waves'] },
  { q: 'wavelength', u: 'metre (m)', cls: 'm', topics: ['waves'] }, { q: 'time period', u: 'second (s)', cls: 's', topics: ['waves'] }, { q: 'speed', u: 'metres per second (m/s)', cls: 'm/s', topics: ['forces', 'waves'] },
  { q: 'acceleration', u: 'metres per second squared (m/s²)', cls: 'm/s2', topics: ['forces'] }, { q: 'momentum', u: 'kilogram metres per second (kg m/s)', cls: 'kgm/s', topics: ['forces'] },
  { q: 'density', u: 'kilograms per cubic metre (kg/m³)', cls: 'kg/m3', topics: ['particles'] }, { q: 'pressure', u: 'pascal (Pa)', cls: 'Pa', topics: ['forces', 'particles'] },
  { q: 'moment of a force', u: 'newton metre (N m)', cls: 'Nm', topics: ['forces'] }, { q: 'spring constant', u: 'newtons per metre (N/m)', cls: 'N/m', topics: ['forces', 'energy'] },
  { q: 'gravitational field strength', u: 'newtons per kilogram (N/kg)', cls: 'm/s2', topics: ['forces', 'energy'] },
  { q: 'specific heat capacity', u: 'joules per kilogram per degree Celsius (J/kg °C)', cls: 'shc', topics: ['energy', 'particles'] }, { q: 'specific latent heat', u: 'joules per kilogram (J/kg)', cls: 'J/kg', topics: ['particles'] },
  { q: 'magnetic flux density', u: 'tesla (T)', cls: 'T', topics: ['magnetism'] }, { q: 'activity of a radioactive source', u: 'becquerel (Bq)', cls: 'Bq', topics: ['radiation'] },
];
function unitsQ(rand: () => number, area: string): GeneratedQuestion {
  const inArea = UNITS.filter((u) => u.topics.includes(area));
  const x = pick(rand, inArea.length >= 3 ? inArea : UNITS);
  const others = [...inArea, ...UNITS].filter((u) => u.cls !== x.cls);
  const why = [`${cap(x.q)} is measured in ${x.u}.`];
  if (rand() < 0.6) return mcq(rand, `What is the unit of **${x.q}**?`, x.u, others.map((u) => u.u), why, 1);
  return mcq(rand, `Which quantity is measured in **${x.u}**?`, x.q, others.map((u) => u.q), why, 1);
}

const EQS: { e: string; words: string; links: string[]; wrong: string[]; area: string; higher?: boolean }[] = [
  { e: 'W = m g', words: 'weight = mass × gravitational field strength', links: ['weight', 'mass', 'gravitational field strength'], wrong: ['W = m ÷ g', 'm = W × g', 'W = g ÷ m'], area: 'forces' },
  { e: 'F = k e', words: 'force = spring constant × extension', links: ['force', 'spring constant', 'extension'], wrong: ['F = k ÷ e', 'k = F × e', 'F = e ÷ k'], area: 'forces' },
  { e: 'M = F d', words: 'moment = force × distance', links: ['moment', 'force', 'distance (perpendicular to the pivot)'], wrong: ['M = F ÷ d', 'F = M × d', 'M = d ÷ F'], area: 'forces' },
  { e: 'p = F ÷ A', words: 'pressure = force ÷ area', links: ['pressure', 'force', 'area'], wrong: ['p = F × A', 'p = A ÷ F', 'F = p ÷ A'], area: 'forces' },
  { e: 's = v t', words: 'distance = speed × time', links: ['distance', 'speed', 'time'], wrong: ['s = v ÷ t', 'v = s × t', 's = t ÷ v'], area: 'forces' },
  { e: 'a = Δv ÷ t', words: 'acceleration = change in velocity ÷ time taken', links: ['acceleration', 'change in velocity', 'time'], wrong: ['a = Δv × t', 'a = t ÷ Δv', 'Δv = a ÷ t'], area: 'forces' },
  { e: 'F = m a', words: 'resultant force = mass × acceleration', links: ['resultant force', 'mass', 'acceleration'], wrong: ['F = m ÷ a', 'a = F × m', 'F = a ÷ m'], area: 'forces' },
  { e: 'p = m v', words: 'momentum = mass × velocity', links: ['momentum', 'mass', 'velocity'], wrong: ['p = m ÷ v', 'v = p × m', 'p = ½ m v²'], area: 'forces', higher: true },
  { e: 'Eₖ = ½ m v²', words: 'kinetic energy = 0.5 × mass × speed²', links: ['kinetic energy', 'mass', 'speed'], wrong: ['Eₖ = m v²', 'Eₖ = ½ m² v', 'Eₖ = ½ m v'], area: 'energy' },
  { e: 'Eₚ = m g h', words: 'gravitational potential energy = mass × gravitational field strength × height', links: ['gravitational potential energy', 'mass', 'gravitational field strength', 'height'], wrong: ['Eₚ = m h ÷ g', 'Eₚ = ½ m g h', 'Eₚ = m g ÷ h'], area: 'energy' },
  { e: 'P = E ÷ t', words: 'power = energy transferred ÷ time', links: ['power', 'energy transferred', 'time'], wrong: ['P = E × t', 'P = t ÷ E', 'E = P ÷ t'], area: 'energy' },
  { e: 'W = F s', words: 'work done = force × distance (along the line of action)', links: ['work done', 'force', 'distance'], wrong: ['W = F ÷ s', 'F = W × s', 'W = s ÷ F'], area: 'energy' },
  { e: 'Q = I t', words: 'charge flow = current × time', links: ['charge flow', 'current', 'time'], wrong: ['Q = I ÷ t', 'I = Q × t', 'Q = t ÷ I'], area: 'elec' },
  { e: 'V = I R', words: 'potential difference = current × resistance', links: ['potential difference', 'current', 'resistance'], wrong: ['V = I ÷ R', 'I = V × R', 'R = V × I'], area: 'elec' },
  { e: 'P = V I', words: 'power = potential difference × current', links: ['power', 'potential difference', 'current'], wrong: ['P = V ÷ I', 'V = P × I', 'P = I ÷ V'], area: 'elec' },
  { e: 'P = I² R', words: 'power = current² × resistance', links: ['power', 'current', 'resistance'], wrong: ['P = I R²', 'P = I² ÷ R', 'P = I R'], area: 'elec' },
  { e: 'E = P t', words: 'energy transferred = power × time', links: ['energy transferred', 'power', 'time'], wrong: ['E = P ÷ t', 'P = E × t', 'E = t ÷ P'], area: 'elec' },
  { e: 'E = Q V', words: 'energy transferred = charge flow × potential difference', links: ['energy transferred', 'charge flow', 'potential difference'], wrong: ['E = Q ÷ V', 'Q = E × V', 'E = V ÷ Q'], area: 'elec' },
  { e: 'ρ = m ÷ V', words: 'density = mass ÷ volume', links: ['density', 'mass', 'volume'], wrong: ['ρ = m × V', 'ρ = V ÷ m', 'm = ρ ÷ V'], area: 'particles' },
  { e: 'v = f λ', words: 'wave speed = frequency × wavelength', links: ['wave speed', 'frequency', 'wavelength'], wrong: ['v = f ÷ λ', 'v = λ ÷ f', 'f = v × λ'], area: 'waves' },
];
function equationQ(rand: () => number, area: string): GeneratedQuestion {
  const pool = EQS.filter((e) => e.area === area);
  const x = pick(rand, pool.length ? pool : EQS);
  const why = [`${x.words}: ${x.e}.`, 'Check by rearranging: each form must give the same relationship.'];
  if (rand() < 0.6) return mcq(rand, `Which equation links **${x.links.slice(0, -1).join(', ')}** and **${x.links[x.links.length - 1]}**?`, x.e, x.wrong, why, 2);
  // never offer an equivalent quantity as a wrong answer (work done = energy transferred; weight is a force)
  const SAME: string[][] = [['work done', 'energy transferred'], ['weight', 'resultant force']];
  const twins = SAME.find((g) => g.includes(x.links[0])) ?? [x.links[0]];
  const others = EQS.filter((e) => e !== x && !twins.includes(e.links[0]));
  return mcq(rand, `Which quantity is calculated by **${x.words.split(' = ')[1]}**?`, x.links[0], [...new Set(others.map((e) => e.links[0]))], why, 2);
}

const EM = ['radio waves', 'microwaves', 'infrared', 'visible light', 'ultraviolet', 'X-rays', 'gamma rays'];
const EM_USE: Record<string, string> = {
  'radio waves': 'television and radio broadcasting', microwaves: 'satellite communications and cooking food', infrared: 'electrical heaters and thermal imaging cameras',
  'visible light': 'fibre optic communications', ultraviolet: 'energy-efficient lamps and sun tanning', 'X-rays': 'medical imaging of bones', 'gamma rays': 'sterilising surgical instruments',
};
function emQ(rand: () => number): GeneratedQuestion {
  const t = rand();
  const order = 'In order of increasing frequency (decreasing wavelength): radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma.';
  if (t < 0.45) {
    const four = shuffle(EM, rand).slice(0, 4);
    const ask = pick(rand, ['longest wavelength', 'shortest wavelength', 'highest frequency', 'lowest frequency'] as const);
    const hi = ask === 'shortest wavelength' || ask === 'highest frequency';
    const ans = four.reduce((a, b) => ((EM.indexOf(a) > EM.indexOf(b)) === hi ? a : b));
    return mcq(rand, `Which of these electromagnetic waves has the **${ask}**?`, ans, four.filter((x) => x !== ans), [order], 2);
  }
  if (t < 0.8) {
    const w = pick(rand, EM);
    return mcq(rand, `Which type of electromagnetic wave is used for **${EM_USE[w]}**?`, w, EM.filter((x) => x !== w), [`${cap(w)}: ${EM_USE[w]}.`], 2);
  }
  const ion = pick(rand, ['ultraviolet', 'X-rays', 'gamma rays']);
  return mcq(rand, 'Which of these is **ionising** radiation that can damage cells and DNA?', ion, ['radio waves', 'microwaves', 'infrared', 'visible light'], ['Ultraviolet, X-rays and gamma rays are ionising: they can cause mutations and cancer. UV also causes skin to age prematurely.'], 2);
}

const RAD: Record<string, { what: string; stop: string; ion: string }> = {
  alpha: { what: 'two protons and two neutrons (a helium nucleus)', stop: 'a sheet of paper or a few centimetres of air', ion: 'strongly ionising' },
  beta: { what: 'a high-speed electron emitted from the nucleus', stop: 'a few millimetres of aluminium', ion: 'moderately ionising' },
  gamma: { what: 'electromagnetic radiation from the nucleus', stop: 'several centimetres of lead or metres of concrete (only reduced)', ion: 'weakly ionising' },
};
const DECAYS: [string, number, number, 'alpha' | 'beta'][] = [['uranium', 238, 92, 'alpha'], ['radium', 226, 88, 'alpha'], ['polonium', 210, 84, 'alpha'], ['americium', 241, 95, 'alpha'], ['carbon', 14, 6, 'beta'], ['strontium', 90, 38, 'beta'], ['iodine', 131, 53, 'beta'], ['thorium', 234, 90, 'beta']];
function radiationQ(rand: () => number, lvl: number): GeneratedQuestion {
  const t = rand();
  if (t < 0.55) {
    const k = pick(rand, ['alpha', 'beta', 'gamma'] as const);
    const f = pick(rand, ['what', 'stop', 'ion'] as const);
    const why = [`Alpha: ${RAD.alpha.what}; stopped by ${RAD.alpha.stop}; ${RAD.alpha.ion}.`, `Beta: ${RAD.beta.what}; stopped by ${RAD.beta.stop}; ${RAD.beta.ion}.`, `Gamma: ${RAD.gamma.what}; ${RAD.gamma.stop}; ${RAD.gamma.ion}.`];
    if (rand() < 0.5) return mcq(rand, f === 'what' ? `What is **${k}** radiation?` : f === 'stop' ? `What will absorb (stop) **${k}** radiation?` : `How ionising is **${k}** radiation?`, RAD[k][f], Object.entries(RAD).filter(([n]) => n !== k).map(([, v]) => v[f]).concat(f === 'what' ? ['a neutron emitted from the nucleus'] : f === 'stop' ? ['a thin sheet of glass'] : ['not ionising at all']), why, 2);
    return mcq(rand, `Which type of radiation is **${RAD[k][f]}**?`, `${k}`, ['alpha', 'beta', 'gamma', 'neutron'], why, 2);
  }
  const [el, A, Z, mode] = pick(rand, DECAYS);
  const nA = mode === 'alpha' ? A - 4 : A, nZ = mode === 'alpha' ? Z - 2 : Z + 1;
  const what = rand() < 0.5 ? 'mass number' : 'atomic number';
  const ans = what === 'mass number' ? nA : nZ;
  const why = [mode === 'alpha' ? 'Alpha decay: the nucleus loses 2 protons and 2 neutrons → mass number − 4, atomic number − 2.' : 'Beta decay: a neutron turns into a proton and an electron is emitted → mass number unchanged, atomic number + 1.', `New nucleus: mass number ${nA}, atomic number ${nZ}.`];
  const q = `**${cap(el)}-${A}** (atomic number ${Z}) decays by **${mode}** emission. What is the **${what}** of the new nucleus?`;
  if (lvl >= 3) return numQ(q, ans, why, 3);
  const wrong = what === 'mass number' ? [A, A - 2, A + 1, A - 4, A + 4].filter((x) => x !== ans).map(String) : [Z, Z - 1, Z + 2, Z - 4, Z + 1, Z - 2].filter((x) => x !== ans).map(String);
  return mcq(rand, q, String(ans), wrong, why, 3);
}

function storesQ(rand: () => number): GeneratedQuestion {
  const S: [string, string, string][] = [ // scenario, decreases, increases
    ['A ball falls from a shelf (before it hits the floor).', 'gravitational potential', 'kinetic'],
    ['A ball is thrown straight up and is still rising.', 'kinetic', 'gravitational potential'],
    ['A moving car brakes to a stop.', 'kinetic', 'thermal'],
    ['A stretched catapult is released and the stone flies off.', 'elastic potential', 'kinetic'],
    ['A gas burner heats a pan of water.', 'chemical', 'thermal'],
    ['A person climbs a flight of stairs.', 'chemical', 'gravitational potential'],
    ['A battery-powered toy car speeds up.', 'chemical', 'kinetic'],
  ];
  const [sc, dec, inc] = pick(rand, S);
  const which = rand() < 0.5;
  return mcq(rand, `${sc} Which energy store **${which ? 'decreases' : 'increases'}** the most?`, `${which ? dec : inc}`, ['kinetic', 'gravitational potential', 'elastic potential', 'thermal', 'chemical', 'nuclear'].map((x) => x), [`Energy is transferred from the ${dec} store to the ${inc} store.`, 'Some energy is also dissipated to the thermal store of the surroundings.'], 2);
}

function circuitQ(rand: () => number): GeneratedQuestion {
  const SERIES = ['the current is the same through every component', 'the potential difference is shared between the components', 'the total resistance is the sum of the resistances'];
  const PARALLEL = ['the potential difference across each branch is the same', 'the total current is the sum of the currents in the branches', 'the total resistance is less than the smallest individual resistance'];
  const s = rand() < 0.5;
  return mcq(rand, `Which statement is true for components connected in **${s ? 'series' : 'parallel'}**?`, pick(rand, s ? SERIES : PARALLEL), s ? PARALLEL : SERIES, ['Series: same current; p.d. shared; R total = R₁ + R₂.', 'Parallel: same p.d. across each branch; currents add up; total R is less than the smallest resistor.'], 2);
}

export const FACT_SCIENCE_GENERATORS: Generator[] = [
  G('f-elements', 'Elements, symbols, groups and ions', (r, l) => elementQ(r, l)),
  G('f-formulae', 'Formulae of ionic compounds', (r) => formulaQ(r)),
  G('f-hydrocarbons', 'Alkanes and alkenes', (r, l) => hydrocarbonQ(r, l, false)),
  G('f-organic', 'Homologous series (alkanes, alkenes, alcohols, acids)', (r, l) => hydrocarbonQ(r, l, true)),
  G('f-chem-tests', 'Tests for gases and ions', (r) => testsQ(r)),
  G('f-salts', 'Making salts', (r) => saltsQ(r)),
  G('f-reactivity', 'Reactivity and extraction', (r) => reactivityQ(r)),
  G('f-electrolysis', 'Products of electrolysis', (r) => electrolysisQ(r)),
  G('f-energy-changes', 'Exothermic and endothermic', (r) => energyQ(r)),
  G('f-atmosphere', 'The atmosphere and pollutants', (r) => atmosphereQ(r)),
  G('f-cells', 'Cell structures', (r, l) => cellQ(r, l)),
  G('f-digestion', 'Enzymes, bile and food tests', (r) => digestionQ(r)),
  G('f-diseases', 'Communicable diseases', (r) => diseaseQ(r)),
  G('f-hormones', 'Hormones and glands', (r, l) => hormoneQ(r, l)),
  G('f-blood', 'Blood, vessels and the heart', (r) => bloodQ(r)),
  G('f-cross', 'Genetic crosses', (r, l) => crossQ(r, l)),
  G('f-food-chains', 'Food chains', (r) => chainQ(r)),
  G('f-classification', 'Classification', (r) => classifyQ(r)),
  G('f-respiration', 'Respiration and uses of glucose', (r) => respirationQ(r)),
  G('f-nervous', 'Reflexes, neurones and the brain', (r) => nervousQ(r)),
  G('f-plants', 'Plant tissues and transpiration', (r) => plantQ(r)),
  G('f-units-energy', 'Units (energy)', (r) => unitsQ(r, 'energy')),
  G('f-units-elec', 'Units (electricity)', (r) => unitsQ(r, 'elec')),
  G('f-units-forces', 'Units (forces and motion)', (r) => unitsQ(r, 'forces')),
  G('f-units-waves', 'Units (waves)', (r) => unitsQ(r, 'waves')),
  G('f-units-particles', 'Units (particles and density)', (r) => unitsQ(r, 'particles')),
  G('f-eq-energy', 'Equations to recall (energy)', (r) => equationQ(r, 'energy')),
  G('f-eq-elec', 'Equations to recall (electricity)', (r) => equationQ(r, 'elec')),
  G('f-eq-forces', 'Equations to recall (forces)', (r) => equationQ(r, 'forces')),
  G('f-eq-waves', 'Equations to recall (waves and density)', (r) => (r() < 0.5 ? equationQ(r, 'waves') : equationQ(r, 'particles'))),
  G('f-em', 'The electromagnetic spectrum', (r) => emQ(r)),
  G('f-radiation', 'Alpha, beta and gamma', (r, l) => radiationQ(r, l)),
  G('f-stores', 'Energy stores and transfers', (r) => storesQ(r)),
  G('f-circuits', 'Series and parallel rules', (r) => circuitQ(r)),
];

/** Which topics each fact generator belongs to */
export const FACT_SCIENCE_TOPICS: Record<string, string[]> = {
  'chem-atoms': ['f-elements'], 'chem-periodic': ['f-elements'], 'chem-bonding': ['f-formulae', 'f-elements'], 'chem-structure': ['f-formulae'],
  'chem-crude': ['f-hydrocarbons'], 'chem-organic2': ['f-organic'], 'chem-tests': ['f-chem-tests'], 'chem-acids': ['f-salts'], 'chem-reactivity': ['f-reactivity'],
  'chem-electrolysis': ['f-electrolysis'], 'chem-energychanges': ['f-energy-changes'], 'chem-atmosphere': ['f-atmosphere'],
  'bio-cells': ['f-cells'], 'bio-digestion': ['f-digestion'], 'bio-pathogens': ['f-diseases'], 'bio-immunity': ['f-diseases'], 'bio-hormones': ['f-hormones'],
  'bio-reproduction-h': ['f-hormones'], 'bio-heart': ['f-blood'], 'bio-transport': ['f-blood'], 'bio-genetics': ['f-cross'], 'bio-ecosystems': ['f-food-chains'],
  'bio-classification': ['f-classification'], 'bio-respiration': ['f-respiration'], 'bio-photosynthesis': ['f-respiration'], 'bio-nervous': ['f-nervous'], 'bio-plants': ['f-plants'],
  'phys-stores': ['f-stores', 'f-units-energy', 'f-eq-energy'], 'phys-efficiency': ['f-eq-energy'], 'phys-circuits': ['f-circuits', 'f-units-elec', 'f-eq-elec'], 'phys-mains': ['f-eq-elec', 'f-units-elec'],
  'phys-particles': ['f-units-particles', 'f-eq-waves'], 'phys-radiation': ['f-radiation'], 'phys-nuclear': ['f-radiation'], 'phys-force-basics': ['f-units-forces', 'f-eq-forces'],
  'phys-motion': ['f-eq-forces', 'f-units-forces'], 'phys-newton': ['f-eq-forces'], 'phys-moments': ['f-eq-forces'], 'phys-wave-props': ['f-units-waves', 'f-eq-waves'], 'phys-em': ['f-em'],
};

