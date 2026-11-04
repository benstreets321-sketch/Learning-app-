import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, txt, topic, examQ, ord, match, cloze } from '../../dsl';

const SIX = (points: string[]) => [
  'Level 3 (5-6): detailed, coherent, logically sequenced answer using correct terms',
  'Level 2 (3-4): several relevant points with some linking',
  'Level 1 (1-2): simple relevant statements',
  ...points,
];

export const chemPaper1: Unit[] = [
  {
    id: 'chem-atomic', title: 'Atomic structure and the periodic table', description: 'Paper 1 · atoms, isotopes, electron shells, groups 1, 7 and 0.',
    topics: [
      topic({
        id: 'chem-atoms', title: 'Atoms, elements, compounds and mixtures', summary: 'Subatomic particles, isotopes, electronic structure, separating mixtures and the history of the atom.',
        notes: `
- **Element**: one type of atom. **Compound**: two or more elements chemically bonded in fixed proportions. **Mixture**: not chemically combined - can be separated physically.

## Separating mixtures
| Method | Separates |
|---|---|
| Filtration | Insoluble solid from liquid |
| Crystallisation | Soluble solid from solution |
| Simple distillation | Liquid from solution (e.g. water from salt water) |
| Fractional distillation | Liquids with different boiling points |
| Chromatography | Soluble substances (dyes) |

## Subatomic particles
| Particle | Relative mass | Charge | Where |
|---|---|---|---|
| Proton | 1 | +1 | Nucleus |
| Neutron | 1 | 0 | Nucleus |
| Electron | very small (~1/1840) | −1 | Shells |

- **Atomic number** = protons (= electrons in an atom). **Mass number** = protons + neutrons.
- **Isotopes**: same element, same protons, **different neutrons**.
- **Relative atomic mass** = weighted mean of isotopes: Cl: (35 × 75 + 37 × 25) ÷ 100 = **35.5**.
- Atom radius ~0.1 nm (1 × 10⁻¹⁰ m); nucleus ~1/10 000 of that.

## Electron shells
2, 8, 8 ... e.g. sodium (11): **2, 8, 1**; chlorine (17): **2, 8, 7**.

## History of the atom
Dalton (solid spheres) → **Thomson** (electron, **plum pudding** model) → **Rutherford** (alpha scattering: mass concentrated in a small positive **nucleus**) → **Bohr** (electrons in shells) → **Chadwick** (neutron, 1932).
`,
        keyPoints: ['Element/compound/mixture definitions', 'Proton +1 mass 1; neutron 0 mass 1; electron −1 tiny mass', 'Atomic number = protons; mass number = protons + neutrons', 'Isotopes: different neutrons', 'Shells fill 2, 8, 8', 'Thomson → Rutherford → Bohr → Chadwick'],
        generators: ['c-subatomic'],
        flashcards: cards([['What is an isotope?', 'Atoms of the same element with the same number of protons but different numbers of neutrons.'], ['What did the alpha scattering experiment show?', 'Mass is concentrated in a tiny, positively charged nucleus; most of the atom is empty space.'], ['Who discovered the neutron?', 'James Chadwick (1932).'], ['Electronic structure of magnesium (12)?', '2, 8, 2'], ['Charge and mass of an electron?', '−1, very small (about 1/1840 of a proton).'], ['How do you separate ink dyes?', 'Chromatography.']]),
        questions: [
          mc('An atom has 17 protons and 18 neutrons. What is its mass number?', ['35', '17', '18', '1'], '17 + 18 = 35.', { d: 1 }),
          mc('What did Rutherford\'s alpha scattering experiment disprove?', ['The plum pudding model', 'The existence of electrons', 'The nuclear model', 'Bohr\'s shells'], 'Some alpha particles bounced back → a dense nucleus.', { d: 2 }),
          num('Copper is 69% ⁶³Cu and 31% ⁶⁵Cu. Calculate the relative atomic mass to 1 d.p.', 63.6, '(63 × 69 + 65 × 31) ÷ 100 = 63.62.', { d: 3, tol: 0.05 }),
          txt('Write the electronic structure of aluminium (atomic number 13).', ['2,8,3', '2, 8, 3', '2.8.3'], '2 + 8 + 3 = 13.', { d: 2 }),
          match('Match the mixture to the separation method.', [['Sand and water', 'Filtration'], ['Salt from salt solution', 'Crystallisation'], ['Ethanol and water', 'Fractional distillation'], ['Coloured inks', 'Chromatography']], 'Choose by the properties of the substances.', { d: 2 }),
          ord('Put the models of the atom in historical order.', ['Solid spheres (Dalton)', 'Plum pudding (Thomson)', 'Nuclear model (Rutherford)', 'Electron shells (Bohr)'], 'Each model was replaced by new evidence.', { d: 2 }),
        ],
      }),
      topic({
        id: 'chem-periodic', title: 'The periodic table: groups 1, 7, 0 and transition metals', summary: 'Mendeleev, metals vs non-metals, alkali metals, halogens, noble gases.',
        notes: `
## Development
**Mendeleev** (1869) ordered by atomic weight but **left gaps** for undiscovered elements and swapped some to fit properties - his predictions were later confirmed. Discovery of isotopes explained the anomalies. Modern table: ordered by **atomic number**.

- **Groups** = same number of outer electrons → similar properties. **Periods** = number of shells.
- **Metals** (left) form **positive ions**; non-metals (right) don't.

## Group 1 - alkali metals (1 outer electron)
React with water → **metal hydroxide + hydrogen** (fizz). **More reactive down the group**: outer electron further from the nucleus, more shielding → lost more easily.
Li: fizzes · Na: melts into a ball, moves · K: lilac flame.

## Group 7 - halogens (7 outer electrons)
Diatomic (F₂, Cl₂, Br₂, I₂). **Less reactive down the group** (harder to gain an electron - further from nucleus). Melting/boiling points increase down the group.
**Displacement**: a more reactive halogen displaces a less reactive one from its salt: Cl₂ + 2KBr → 2KCl + Br₂.

## Group 0 - noble gases
Full outer shell → **unreactive**; boiling points increase down the group.

## Transition metals (Chemistry only)
Compared to group 1: higher melting points, denser, stronger, less reactive; **ions with different charges** (Fe²⁺, Fe³⁺); **coloured compounds**; **catalysts** (iron in the Haber process).
`,
        keyPoints: ['Mendeleev left gaps and predicted elements', 'Group number = outer electrons', 'Group 1: more reactive down; metal + water → hydroxide + hydrogen', 'Group 7: less reactive down; displacement reactions', 'Group 0: full outer shell - inert', 'Transition metals: coloured compounds, catalysts, various ions'],
        flashcards: cards([['Why did Mendeleev leave gaps?', 'For elements not yet discovered - he predicted their properties.'], ['Why does reactivity increase down group 1?', 'The outer electron is further from the nucleus and more shielded, so it is lost more easily.'], ['Why does reactivity decrease down group 7?', 'The outer shell is further from the nucleus so it is harder to attract/gain an electron.'], ['Product of sodium + water?', 'Sodium hydroxide + hydrogen.'], ['Why are noble gases unreactive?', 'They have a full outer shell of electrons.'], ['Properties of transition metal compounds?', 'Often coloured; metals form ions with different charges; good catalysts.']]),
        questions: [
          mc('Which halogen is most reactive?', ['Fluorine', 'Chlorine', 'Bromine', 'Iodine'], 'Reactivity decreases down group 7.', { d: 1 }),
          mc('What gas is produced when potassium reacts with water?', ['Hydrogen', 'Oxygen', 'Chlorine', 'Carbon dioxide'], 'Metal + water → metal hydroxide + hydrogen.', { d: 1 }),
          tf('Iodine will displace chlorine from potassium chloride solution.', false, 'Only a more reactive halogen displaces a less reactive one; iodine is less reactive than chlorine.', { d: 2 }),
          mc('Why are elements in the same group similar?', ['Same number of outer-shell electrons', 'Same number of shells', 'Same mass', 'Same number of neutrons'], 'Outer electrons determine chemical behaviour.', { d: 1 }),
        ],
        examQuestions: [examQ('Explain why potassium is more reactive than sodium.', 3, ['Potassium\'s outer electron is in a shell further from the nucleus', 'More shielding / weaker attraction to the nucleus', 'So the outer electron is lost more easily'], { time: 3 })],
      }),
    ],
  },
  {
    id: 'chem-bond', title: 'Bonding, structure and properties', description: 'Paper 1 · ionic, covalent and metallic bonding; structures and their properties.',
    topics: [
      topic({
        id: 'chem-bonding', title: 'Ionic, covalent and metallic bonding', summary: 'How atoms bond and how to draw dot-and-cross diagrams.',
        notes: `
| Bond | Between | How |
|---|---|---|
| **Ionic** | Metal + non-metal | Electrons **transferred** → oppositely charged ions held by **electrostatic attraction** |
| **Covalent** | Non-metals | **Shared pairs** of electrons |
| **Metallic** | Metals | Positive ions in a sea of **delocalised electrons** |

## Ions
- Group 1 → 1+, group 2 → 2+, group 6 → 2−, group 7 → 1−.
- NaCl: Na (2,8,1) loses 1 → Na⁺ [2,8]; Cl (2,8,7) gains 1 → Cl⁻ [2,8,8].
- Formula: balance charges. Mg²⁺ and Cl⁻ → **MgCl₂**.

## Covalent examples
H₂ (single bond), Cl₂, H₂O, NH₃, CH₄, O₂ (**double** bond), N₂ (triple), CO₂ (two double bonds).

Dot-and-cross diagrams show where electrons came from but not 3D shape; ball-and-stick shows 3D shape but not electrons.
`,
        keyPoints: ['Ionic: transfer, metal + non-metal', 'Covalent: sharing, non-metals', 'Metallic: delocalised electrons', 'Group 1 → +1, group 7 → −1', 'Formula balances charges'],
        flashcards: cards([['What is an ionic bond?', 'Electrostatic attraction between oppositely charged ions formed by electron transfer.'], ['What is a covalent bond?', 'A shared pair of electrons between two non-metal atoms.'], ['Describe metallic bonding', 'Positive metal ions in a sea of delocalised electrons, held by electrostatic attraction.'], ['Charge on an oxide ion?', '2− (O²⁻)'], ['Formula of aluminium oxide?', 'Al₂O₃']]),
        questions: [
          mc('What type of bonding is in magnesium oxide?', ['Ionic', 'Covalent', 'Metallic', 'None'], 'Metal + non-metal.', { d: 1 }),
          txt('Write the formula of calcium chloride (Ca²⁺, Cl⁻).', ['CaCl2', 'CaCl₂'], 'Two Cl⁻ balance one Ca²⁺.', { d: 2 }),
          mc('How many covalent bonds does carbon form in methane, CH₄?', ['4', '1', '2', '3'], 'Carbon has 4 outer electrons and shares each.', { d: 1 }),
          tf('In ionic bonding electrons are shared between atoms.', false, 'Electrons are transferred; sharing is covalent.', { d: 1 }),
        ],
      }),
      topic({
        id: 'chem-structure', title: 'Structures and properties', summary: 'States of matter, giant ionic/covalent/metallic structures, simple molecules, carbon allotropes, polymers and nanoparticles.',
        notes: `
## States of matter
Solid ⇌ liquid (melting/freezing) ⇌ gas (boiling/condensing). Higher melting point = stronger forces between particles.

| Structure | Example | Melting point | Conducts? | Why |
|---|---|---|---|---|
| **Giant ionic lattice** | NaCl | High | Only when **molten or dissolved** | Strong electrostatic forces in all directions; ions free to move when liquid |
| **Simple molecular** | H₂O, CO₂, CH₄ | Low | No | Weak **intermolecular forces** (not the covalent bonds) are overcome |
| **Giant covalent** | Diamond, graphite, silicon dioxide | Very high | Graphite yes, diamond no | Many strong covalent bonds must break |
| **Metallic** | Copper | High | Yes | Delocalised electrons carry charge |

## Carbon
- **Diamond**: each C bonded to 4 others - very hard, no free electrons.
- **Graphite**: layers of hexagons, each C bonded to 3 → **delocalised electron** (conducts); layers **slide** (soft, lubricant).
- **Graphene**: single layer of graphite - strong, conducts.
- **Fullerenes** (e.g. **C₆₀** buckminsterfullerene, **nanotubes**): drug delivery, lubricants, catalysts.

## Alloys
Mixtures of metals: different-sized atoms **distort the layers** so they can't slide → **harder** than pure metals.

## Polymers
Long chains joined by strong covalent bonds; intermolecular forces between chains are relatively strong → solid at room temperature.

## Nanoparticles (Chemistry only)
1-100 nm; **huge surface area to volume ratio** → good catalysts; uses in sun cream, medicine, cosmetics. Risks: may be toxic, enter cells.
`,
        keyPoints: ['Ionic: high mp, conducts when molten/dissolved', 'Simple molecular: low mp - weak intermolecular forces', 'Giant covalent: very high mp', 'Graphite conducts (delocalised electrons) and is slippery', 'Alloys are harder - distorted layers', 'Nanoparticles: large surface area to volume'],
        flashcards: cards([['Why does ionic compound conduct only when molten or dissolved?', 'The ions are free to move and carry charge.'], ['Why do simple molecular substances have low melting points?', 'Only weak intermolecular forces need to be overcome, not covalent bonds.'], ['Why does graphite conduct electricity?', 'Each carbon has one delocalised electron that can move through the structure.'], ['Why are alloys harder than pure metals?', 'Different-sized atoms distort the layers so they can\'t slide over each other.'], ['What size are nanoparticles?', '1-100 nm.']]),
        questions: [
          mc('Why does sodium chloride have a high melting point?', ['Strong electrostatic forces between ions in a giant lattice', 'Weak intermolecular forces', 'It contains delocalised electrons', 'It is a simple molecule'], 'Lots of energy needed to overcome strong ionic bonds.', { d: 2 }),
          mc('Why is graphite soft and slippery?', ['Layers are held by weak forces so they slide', 'It has no covalent bonds', 'It is a metal', 'It contains ions'], 'Strong bonds within layers, weak between layers.', { d: 2 }),
          tf('When water boils, the covalent bonds within water molecules break.', false, 'Only the weak intermolecular forces are overcome.', { d: 3 }),
          multi('Which substances conduct electricity as solids?', ['Copper', 'Graphite'], ['Diamond', 'Solid sodium chloride', 'Sulfur'], 'Need free electrons (or mobile ions).', { d: 2 }),
        ],
        examQuestions: [examQ('Diamond and graphite are both forms of carbon. Explain why graphite conducts electricity but diamond does not, and why both have very high melting points.', 5, ['Both are giant covalent structures', 'Many strong covalent bonds must be broken → high melting points', 'In diamond each carbon forms 4 bonds → no free electrons', 'In graphite each carbon forms 3 bonds', 'One delocalised electron per carbon can move and carry charge'], { time: 5 })],
      }),
    ],
  },
  {
    id: 'chem-quant', title: 'Quantitative chemistry', description: 'Paper 1 · conservation of mass, moles, yield and concentration.',
    topics: [
      topic({
        id: 'chem-moles', title: 'Mass, moles and equations', summary: 'Conservation of mass, Mr, balancing equations, moles and reacting masses.',
        notes: `
## Conservation of mass
No atoms are lost or made. If mass seems to change, a **gas** has escaped (decrease) or been absorbed from the air (increase).

## Balancing equations
Change the big numbers in front, never the formulae: **2H₂ + O₂ → 2H₂O**. State symbols (s), (l), (g), (aq).

## Relative formula mass (Mᵣ)
Sum of Aᵣ: CO₂ = 12 + 16 × 2 = **44**.

## Moles (Higher)
- 1 mole = **6.02 × 10²³** particles (Avogadro constant).
- **moles = mass ÷ Mᵣ**
- **Reacting masses**: use the equation's ratio.
> 2Mg + O₂ → 2MgO. 12 g Mg = 0.5 mol → 0.5 mol MgO → 0.5 × 40 = **20 g**.
- **Limiting reactant**: the one that runs out first and limits the product.

## Concentration
**g/dm³ = mass (g) ÷ volume (dm³)**; 1 dm³ = 1000 cm³.
`,
        keyPoints: ['Mass is conserved; gas escaping explains apparent loss', 'Balance with big numbers only', 'Mᵣ = sum of Aᵣ', 'moles = mass ÷ Mᵣ (Higher)', 'Avogadro constant 6.02 × 10²³', 'Concentration g/dm³ = mass ÷ volume'],
        generators: ['c-mr', 'c-moles', 'c-conc', 'c-pct-mass'],
        flashcards: cards([['Formula linking moles, mass and Mr?', 'moles = mass ÷ Mᵣ'], ['Value of the Avogadro constant?', '6.02 × 10²³ per mole'], ['Why might mass decrease when metal carbonate is heated in an open tube?', 'Carbon dioxide gas escapes.'], ['Convert 250 cm³ to dm³', '0.25 dm³'], ['What is a limiting reactant?', 'The reactant that is completely used up, limiting the amount of product.']]),
        questions: [
          num('Calculate the Mᵣ of H₂SO₄ (H = 1, S = 32, O = 16).', 98, '2 + 32 + 64 = 98.', { d: 1 }),
          txt('Balance: __ Na + Cl₂ → __ NaCl. What number goes in front of Na?', ['2'], '2Na + Cl₂ → 2NaCl.', { d: 2 }),
          num('How many moles in 88 g of CO₂ (Mᵣ 44)?', 2, '88 ÷ 44 = 2 mol.', { d: 2, tier: 'H', unit: 'mol' }),
          num('What mass of MgO is made from 6 g of magnesium? 2Mg + O₂ → 2MgO (Mg = 24, MgO = 40)', 10, '6 ÷ 24 = 0.25 mol Mg → 0.25 mol MgO → 0.25 × 40 = 10 g.', { d: 4, tier: 'H', unit: 'g' }),
          mc('Magnesium ribbon is heated in a crucible and gains mass. Why?', ['It combines with oxygen from the air', 'Atoms are created', 'Heat has mass', 'It absorbs water'], 'The oxide contains oxygen atoms from the air.', { d: 2 }),
        ],
      }),
      topic({
        id: 'chem-yield', title: 'Yield, atom economy, titration and gas volumes', summary: 'Percentage yield, atom economy, concentration in mol/dm³, titrations and gas volumes (Chemistry only, Higher parts).', tags: ['Chemistry only', 'Required practical'],
        notes: `
## Percentage yield (Chemistry only)
**% yield = actual mass ÷ theoretical maximum mass × 100**. Below 100% because: reaction may not go to completion (reversible), product lost when separated, side reactions.

## Atom economy (Chemistry only)
**Atom economy = Mᵣ of desired product ÷ total Mᵣ of all reactants × 100**. High atom economy = less waste, more sustainable.

## Concentration in mol/dm³ (Higher)
**concentration (mol/dm³) = moles ÷ volume (dm³)**

## Titration (required practical, Chemistry only)
1. Pipette 25.0 cm³ of alkali into a conical flask; add indicator (e.g. phenolphthalein or methyl orange).
2. Add acid from a **burette** until the indicator just changes colour (end point); swirl.
3. Record volume; repeat until **concordant** results (within 0.10 cm³); take a mean.
**Calculation**: moles of known solution → use the ratio → concentration of the unknown.

## Gas volumes (Higher, Chemistry only)
1 mole of any gas at room temperature and pressure occupies **24 dm³**.
`,
        keyPoints: ['% yield = actual ÷ theoretical × 100', 'Atom economy = desired Mᵣ ÷ total reactant Mᵣ × 100', 'mol/dm³ = moles ÷ dm³', 'Titration: pipette, burette, indicator, concordant results', '1 mol gas = 24 dm³ at RTP'],
        generators: ['c-yield', 'c-atom-economy', 'c-titration', 'c-gas-vol'],
        flashcards: cards([['Why is percentage yield rarely 100%?', 'Reversible reactions, product lost during separation, side reactions.'], ['What are concordant titres?', 'Results within 0.10 cm³ of each other.'], ['Volume of 1 mole of gas at RTP?', '24 dm³'], ['Why is high atom economy good?', 'Less waste, more sustainable and economical.']]),
        questions: [
          num('Theoretical yield 40 g, actual 30 g. Find % yield.', 75, '30 ÷ 40 × 100 = 75%.', { d: 1, unit: '%' }),
          mc('Which piece of apparatus measures exactly 25.0 cm³ of alkali in a titration?', ['Pipette', 'Burette', 'Measuring cylinder', 'Beaker'], 'A volumetric pipette measures a fixed volume accurately.', { d: 2 }),
          num('0.2 mol of a solute is dissolved in 500 cm³. What is the concentration in mol/dm³?', 0.4, '0.2 ÷ 0.5 = 0.4.', { d: 3, tier: 'H' }),
        ],
        examQuestions: [examQ('Describe how to carry out a titration to find the volume of hydrochloric acid needed to neutralise 25.0 cm³ of sodium hydroxide solution.', 6, SIX(['Use a pipette (with filler) to measure 25.0 cm³ NaOH into a conical flask', 'Add a few drops of indicator', 'Fill burette with acid, record start reading', 'Add acid, swirling, dropwise near the end point', 'Stop at the colour change; record the final reading', 'Repeat until concordant results; calculate mean titre']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
    ],
  },
  {
    id: 'chem-changes', title: 'Chemical changes', description: 'Paper 1 · reactivity, acids and salts, electrolysis.',
    topics: [
      topic({
        id: 'chem-reactivity', title: 'Reactivity series and extracting metals', summary: 'Metal reactions, oxidation and reduction, displacement and extraction by carbon.',
        notes: `
**Reactivity series** (most → least): **potassium, sodium, lithium, calcium, magnesium, (carbon), zinc, iron, (hydrogen), copper**, silver, gold.

- Metals react with acids → **salt + hydrogen**. More reactive = more vigorous.
- **Displacement**: a more reactive metal displaces a less reactive one from its compound: Mg + CuSO₄ → MgSO₄ + Cu.

## Oxidation and reduction
- **Oxidation** = gain of oxygen; **reduction** = loss of oxygen.
- Higher: in terms of electrons - **OIL RIG**: Oxidation Is Loss, Reduction Is Gain (of electrons).

## Extraction
- Metals **less reactive than carbon** (zinc, iron, copper) are extracted by **reduction with carbon**: 2Fe₂O₃ + 3C → 4Fe + 3CO₂.
- Metals **more reactive than carbon** (e.g. aluminium) need **electrolysis** - expensive.
- Gold is found as the uncombined element.

## Ionic equations (Higher)
Mg + Cu²⁺ → Mg²⁺ + Cu (spectator ions left out).
`,
        keyPoints: ['Reactivity series K Na Li Ca Mg C Zn Fe H Cu', 'Metal + acid → salt + hydrogen', 'More reactive metals displace less reactive ones', 'Oxidation = gain O / lose electrons; reduction = lose O / gain electrons', 'Below carbon: reduce with carbon; above carbon: electrolysis'],
        flashcards: cards([['What does OIL RIG stand for?', 'Oxidation Is Loss, Reduction Is Gain (of electrons).'], ['How is iron extracted?', 'Reduction of iron oxide with carbon in a blast furnace.'], ['Why is aluminium extracted by electrolysis?', 'It is more reactive than carbon.'], ['Products of zinc + hydrochloric acid?', 'Zinc chloride + hydrogen.']]),
        questions: [
          mc('Which metal can be extracted by heating its oxide with carbon?', ['Iron', 'Aluminium', 'Sodium', 'Magnesium'], 'Iron is below carbon in the reactivity series.', { d: 1 }),
          tf('Copper will displace magnesium from magnesium sulfate solution.', false, 'Copper is less reactive than magnesium.', { d: 1 }),
          mc('In Mg + Cu²⁺ → Mg²⁺ + Cu, which species is oxidised?', ['Mg', 'Cu²⁺', 'Cu', 'Mg²⁺'], 'Mg loses electrons (OIL).', { d: 4, tier: 'H' }),
          ord('Put these metals in order of reactivity, most reactive first.', ['Potassium', 'Magnesium', 'Zinc', 'Copper'], 'K > Mg > Zn > Cu.', { d: 2 }),
        ],
      }),
      topic({
        id: 'chem-acids', title: 'Acids, alkalis and salts', summary: 'Neutralisation, making salts, pH and strong vs weak acids.', tags: ['Required practical'],
        notes: `
- **Acids** produce **H⁺** ions in water; **alkalis** produce **OH⁻** ions. pH < 7 acid, 7 neutral, > 7 alkaline.
- **Neutralisation**: **H⁺ + OH⁻ → H₂O**.

## Making salts
| Reaction | Products |
|---|---|
| Acid + metal | Salt + hydrogen |
| Acid + metal oxide/hydroxide (base) | Salt + water |
| Acid + metal carbonate | Salt + water + carbon dioxide |

**Naming**: hydrochloric → chloride; sulfuric → sulfate; nitric → nitrate.

## Required practical: making a soluble salt (e.g. copper sulfate)
1. Warm dilute sulfuric acid; add **excess** copper oxide until no more dissolves.
2. **Filter** to remove excess solid.
3. Heat the filtrate gently to evaporate some water, then leave to **crystallise**.

## Strong and weak acids (Higher)
- **Strong** acids **fully ionise** in water (HCl, H₂SO₄, HNO₃); **weak** acids **partially ionise** (ethanoic, citric).
- Concentration ≠ strength. A **decrease of 1 pH unit = 10× more H⁺** ions.
`,
        keyPoints: ['Acids → H⁺; alkalis → OH⁻', 'H⁺ + OH⁻ → H₂O', 'Acid + carbonate → salt + water + CO₂', 'Salt practical: excess base, filter, crystallise', 'Strong acids fully ionise (Higher)', '1 pH unit = 10× H⁺ concentration'],
        flashcards: cards([['Ionic equation for neutralisation?', 'H⁺(aq) + OH⁻(aq) → H₂O(l)'], ['Salt from nitric acid + sodium hydroxide?', 'Sodium nitrate (+ water).'], ['Why add excess metal oxide when making a salt?', 'To make sure all the acid has reacted.'], ['Difference between strong and weak acid?', 'Strong acids fully ionise in water; weak acids only partially ionise.']]),
        questions: [
          mc('What are the products of calcium carbonate + hydrochloric acid?', ['Calcium chloride + water + carbon dioxide', 'Calcium chloride + hydrogen', 'Calcium oxide + water', 'Calcium hydroxide + CO₂'], 'Carbonate + acid → salt + water + CO₂.', { d: 2 }),
          txt('Name the salt formed when zinc oxide reacts with sulfuric acid.', ['zinc sulfate', 'zinc sulphate'], 'Sulfuric acid → sulfates.', { d: 1 }),
          ord('Put the steps to make copper sulfate crystals in order.', ['Add excess copper oxide to warm sulfuric acid', 'Filter off the excess copper oxide', 'Heat the solution to evaporate some water', 'Leave to crystallise'], 'Excess → filter → evaporate → crystallise.', { d: 2 }),
          num('pH falls from 4 to 2. By what factor has the H⁺ concentration increased?', 100, 'Each pH unit is ×10: 10 × 10 = 100.', { d: 4, tier: 'H' }),
        ],
      }),
      topic({
        id: 'chem-electrolysis', title: 'Electrolysis', summary: 'Electrolysis of molten and aqueous compounds, aluminium extraction and half equations.', tags: ['Required practical'],
        notes: `
**Electrolysis**: using electricity to break down an ionic compound that is **molten or dissolved** (ions free to move).
- Positive ions → **cathode** (−); negative ions → **anode** (+). ("PANIC": Positive Anode, Negative Is Cathode.)

## Molten compounds
Lead bromide → **lead** at the cathode, **bromine** at the anode.

## Aqueous solutions (water provides H⁺ and OH⁻)
- **Cathode**: **hydrogen** is produced unless the metal is **less reactive than hydrogen** (e.g. copper → copper).
- **Anode**: **oxygen** is produced, unless the solution contains **halide ions** → halogen (chlorine, bromine, iodine).
> Brine (NaCl(aq)) → H₂ at cathode, Cl₂ at anode, NaOH left in solution.

## Aluminium extraction
Aluminium oxide dissolved in molten **cryolite** (lowers melting point → saves energy). Al at cathode; oxygen at the **carbon anodes**, which react to form CO₂ and must be **replaced**.

## Half equations (Higher)
Cathode: Cu²⁺ + 2e⁻ → Cu (reduction). Anode: 2Cl⁻ → Cl₂ + 2e⁻ (oxidation).
`,
        keyPoints: ['Ions must be free to move (molten or aqueous)', 'Cations to cathode (−), anions to anode (+)', 'Aqueous cathode: hydrogen unless metal less reactive than H', 'Aqueous anode: oxygen unless halide present', 'Al₂O₃ in cryolite; carbon anodes replaced', 'Cathode = reduction; anode = oxidation'],
        flashcards: cards([['Where do positive ions go in electrolysis?', 'To the cathode (negative electrode).'], ['Products of electrolysis of brine?', 'Hydrogen (cathode), chlorine (anode), sodium hydroxide solution.'], ['Why is cryolite used?', 'To lower the melting point of aluminium oxide, saving energy.'], ['Why must carbon anodes be replaced?', 'Oxygen reacts with the carbon to make CO₂.'], ['Half equation at the cathode for copper?', 'Cu²⁺ + 2e⁻ → Cu']]),
        questions: [
          mc('Which product forms at the cathode in the electrolysis of copper sulfate solution?', ['Copper', 'Hydrogen', 'Oxygen', 'Sulfur'], 'Copper is less reactive than hydrogen.', { d: 2 }),
          mc('Which product forms at the anode in the electrolysis of sodium sulfate solution?', ['Oxygen', 'Sodium', 'Sulfur', 'Hydrogen'], 'No halide present → oxygen.', { d: 3 }),
          tf('Solid sodium chloride can be electrolysed.', false, 'The ions must be free to move - molten or dissolved.', { d: 1 }),
          cloze('At the anode, chloride ions {{lose}} electrons and are {{oxidised}} to form chlorine gas.', 'OIL: oxidation is loss.', { d: 3, tier: 'H' }),
        ],
        examQuestions: [examQ('Aluminium is extracted by electrolysis of aluminium oxide dissolved in molten cryolite. Explain why the process is expensive and why the anodes need replacing.', 4, ['Large amounts of electricity / energy needed', 'High temperature needed to melt (even with cryolite)', 'Oxygen forms at the carbon anode', 'Reacts with carbon to form CO₂ so anode wears away'], { time: 4 })],
      }),
    ],
  },
  {
    id: 'chem-energy', title: 'Energy changes', description: 'Paper 1 · exothermic and endothermic reactions, bond energies, cells.',
    topics: [
      topic({
        id: 'chem-energychanges', title: 'Exothermic, endothermic and bond energies', summary: 'Temperature changes, reaction profiles, bond energy calculations and cells (Chemistry only).', tags: ['Required practical'],
        notes: `
| | Exothermic | Endothermic |
|---|---|---|
| Energy | Transferred **to** surroundings | Taken **from** surroundings |
| Temperature of surroundings | Rises | Falls |
| Examples | Combustion, neutralisation, most oxidation, hand warmers | Thermal decomposition, citric acid + sodium hydrogencarbonate, sports injury packs, photosynthesis |

## Reaction profiles
Products **lower** than reactants = exothermic; **higher** = endothermic. **Activation energy** = minimum energy needed for particles to react (the hump).

## Bond energies (Higher)
**Breaking bonds = endothermic** (energy in); **making bonds = exothermic** (energy out).
**ΔH = bonds broken − bonds made**. Negative → exothermic.

## Required practical: temperature changes
Mix solutions in a **polystyrene cup** with a lid (insulation), measure the temperature change with a thermometer; vary the amount of one reactant.

## Chemical cells and fuel cells (Chemistry only)
- A **cell** has two different metals in an electrolyte; bigger difference in reactivity → bigger voltage. Non-rechargeable cells stop when a reactant is used up.
- **Hydrogen fuel cell**: hydrogen + oxygen → water; produces electricity. Pros: only water produced, no recharging; cons: hydrogen is flammable and hard to store, often made using fossil fuels.
`,
        keyPoints: ['Exothermic: temperature rises; endothermic: falls', 'Activation energy = minimum energy to react', 'Breaking bonds takes in energy; making releases it', 'ΔH = broken − made (Higher)', 'Polystyrene cup practical', 'Fuel cell: H₂ + O₂ → H₂O (Chem only)'],
        generators: ['c-bond-energy'],
        flashcards: cards([['Define activation energy', 'The minimum energy that particles must have to react.'], ['Is bond breaking exothermic or endothermic?', 'Endothermic.'], ['Two examples of exothermic reactions?', 'Combustion and neutralisation.'], ['Why use a polystyrene cup in the temperature change practical?', 'Insulator - reduces energy transfer to the surroundings.'], ['What is produced in a hydrogen fuel cell?', 'Water (and electricity).']]),
        questions: [
          mc('The temperature of a solution falls during a reaction. The reaction is...', ['Endothermic', 'Exothermic', 'Neutral', 'Combustion'], 'Energy is taken in from the surroundings.', { d: 1 }),
          mc('On a reaction profile, what is the energy from reactants up to the peak called?', ['Activation energy', 'Overall energy change', 'Bond energy', 'Enthalpy of products'], 'Activation energy.', { d: 1 }),
          num('Bonds broken total 2648 kJ/mol; bonds made total 3466 kJ/mol. Calculate ΔH.', -818, '2648 − 3466 = −818 kJ/mol (exothermic).', { d: 3, tier: 'H', unit: 'kJ/mol' }),
          tf('Thermal decomposition is exothermic.', false, 'It requires heat - endothermic.', { d: 2 }),
        ],
      }),
    ],
  },
];
