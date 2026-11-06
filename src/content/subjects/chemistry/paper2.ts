import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, txt, topic, examQ, ord, match } from '../../dsl';

const SIX = (points: string[]) => [
  'Level 3 (5-6): detailed, coherent, logically sequenced answer using correct terms',
  'Level 2 (3-4): several relevant points with some linking',
  'Level 1 (1-2): simple relevant statements',
  ...points,
];

export const chemPaper2: Unit[] = [
  {
    id: 'chem-rates', title: 'Rates of reaction and equilibrium', description: 'Paper 2 · collision theory, catalysts, reversible reactions.',
    topics: [
      topic({
        id: 'chem-rate', title: 'Rates of reaction', summary: 'Measuring rate, collision theory, factors affecting rate and catalysts.', tags: ['Required practical'],
        notes: `
**Mean rate = quantity of reactant used (or product formed) ÷ time** (e.g. cm³/s or g/s). Higher: rate at a point = gradient of a **tangent**; mol/s.

## Collision theory
Reactions happen when particles **collide** with at least the **activation energy**. Rate increases with **more frequent successful collisions**.

| Factor | Effect | Why |
|---|---|---|
| **Temperature** ↑ | Faster | Particles move faster → more frequent collisions AND more have ≥ activation energy |
| **Concentration / pressure** ↑ | Faster | More particles in the same volume → more frequent collisions |
| **Surface area** ↑ (smaller pieces) | Faster | More particles exposed → more frequent collisions |
| **Catalyst** | Faster | Provides a pathway with **lower activation energy**; not used up |

## Required practical
- **Disappearing cross**: sodium thiosulfate + hydrochloric acid → cloudy sulfur precipitate; time how long until the cross disappears at different concentrations.
- **Gas collection**: measure volume of gas (gas syringe) every 10 s, e.g. magnesium + HCl.

Graphs: steeper = faster; levels off when a reactant is used up. Same amount of reactant → same final volume.
`,
        keyPoints: ['Rate = amount ÷ time', 'Collisions with enough energy (activation energy)', 'Temperature: faster particles AND more energetic collisions', 'Concentration, pressure, surface area: more frequent collisions', 'Catalyst lowers activation energy, not used up', 'Disappearing cross and gas syringe practicals'],
        generators: ['c-rate'],
        misconceptions: [{ wrong: 'Higher temperature just makes particles collide more.', right: 'It also means a greater proportion of collisions have energy ≥ activation energy - the main reason.' }],
        flashcards: cards([['Collision theory?', 'Particles must collide with at least the activation energy to react.'], ['How does a catalyst work?', 'Provides an alternative pathway with a lower activation energy.'], ['Why does a powder react faster than a lump?', 'Larger surface area → more frequent collisions.'], ['How do you find the rate at a specific time on a graph?', 'Draw a tangent and calculate its gradient.']]),
        questions: [
          mc('Why does increasing concentration increase rate?', ['More particles in the same volume, so more frequent collisions', 'The particles move faster, so they collide with more energy', 'The activation energy is lowered, so more collisions succeed', 'The particles become larger, so they are easier to hit'], 'Frequency of collisions increases.', { d: 2 }),
          mc('Which change would NOT increase the rate of reaction between marble chips and acid?', ['Using larger marble chips', 'Warming the acid', 'Using more concentrated acid', 'Crushing the chips'], 'Larger chips = smaller surface area.', { d: 2 }),
          num('40 cm³ of gas is produced in 20 s. Calculate the mean rate in cm³/s.', 2, '40 ÷ 20 = 2 cm³/s.', { d: 1, unit: 'cm³/s' }),
          tf('A catalyst is used up during a reaction.', false, 'Catalysts are not used up and are chemically unchanged.', { d: 1 }),
        ],
        examQuestions: [examQ('Describe how you could investigate the effect of concentration on the rate of reaction between sodium thiosulfate and hydrochloric acid.', 6, SIX(['Draw a cross on paper; place conical flask on it', 'Add a measured volume of sodium thiosulfate of a set concentration', 'Add a fixed volume of HCl and start the timer', 'Time until the cross can no longer be seen', 'Repeat with different concentrations (dilute with water, same total volume)', 'Keep temperature and volumes constant; repeat for means']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
      topic({
        id: 'chem-equilibrium', title: 'Reversible reactions and equilibrium', summary: 'Reversible reactions, dynamic equilibrium and Le Chatelier\'s principle (Higher).',
        notes: `
**Reversible reaction**: A + B ⇌ C + D. If one direction is exothermic, the reverse is endothermic by the same amount.
> Hydrated copper sulfate (blue) ⇌ anhydrous copper sulfate (white) + water - endothermic forwards.

**Dynamic equilibrium** (in a **closed system**): forward and reverse rates are **equal**; concentrations stay **constant**.

## Le Chatelier's principle (Higher)
If conditions change, the equilibrium **shifts to counteract** the change.
| Change | Shift |
|---|---|
| Increase temperature | Towards the **endothermic** direction |
| Increase pressure (gases) | Towards **fewer molecules** of gas |
| Increase concentration of a reactant | Towards the products |

Example: N₂ + 3H₂ ⇌ 2NH₃ (exothermic forwards). Higher pressure → more NH₃ (4 molecules → 2). Lower temperature → more NH₃ but slower.
`,
        keyPoints: ['⇌ means reversible', 'Exothermic one way, endothermic the other', 'Dynamic equilibrium: equal rates in a closed system', 'Higher temperature favours endothermic direction', 'Higher pressure favours fewer gas molecules'],
        flashcards: cards([['What is dynamic equilibrium?', 'Forward and reverse reactions occur at the same rate, so concentrations stay constant (closed system).'], ['Le Chatelier\'s principle?', 'If a system at equilibrium is changed, the position shifts to counteract the change.'], ['Effect of increasing pressure on N₂ + 3H₂ ⇌ 2NH₃?', 'Shifts right - fewer gas molecules - more ammonia.']]),
        questions: [
          mc('In a reversible reaction the forward reaction is exothermic. What is the reverse?', ['Endothermic by the same amount', 'Exothermic by the same amount', 'Endothermic by a smaller amount', 'Exothermic by a smaller amount'], 'Energy changes are equal and opposite.', { d: 2 }),
          mc('For 2SO₂ + O₂ ⇌ 2SO₃, what happens if pressure is increased?', ['More SO₃ forms', 'Less SO₃ forms', 'No change to the amount of SO₃', 'The rate falls but the yield is unchanged'], '3 gas molecules → 2: shifts to the side with fewer.', { d: 4, tier: 'H' }),
          tf('Equilibrium can only be reached in a closed system.', true, 'Otherwise products escape.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'chem-organic', title: 'Organic chemistry', description: 'Paper 2 · crude oil, hydrocarbons, alkenes, alcohols, acids and polymers.',
    topics: [
      topic({
        id: 'chem-crude', title: 'Crude oil, alkanes and cracking', summary: 'Hydrocarbons, fractional distillation, combustion and cracking.',
        notes: `
**Crude oil**: a finite resource formed from ancient plankton; a mixture of **hydrocarbons** (mostly alkanes).

## Alkanes: CₙH₂ₙ₊₂ (saturated - single bonds)
Methane CH₄, ethane C₂H₆, propane C₃H₈, butane C₄H₁₀ ("Mice Eat Peanut Butter").

## Fractional distillation
Heat crude oil → vapour rises up a column that is **hot at the bottom, cool at the top**; fractions condense at their boiling points.
| Longer chains → | |
|---|---|
| Higher boiling point | |
| More **viscous** (thick) | |
| Less **flammable** | |
Fractions (top → bottom): refinery gases, petrol, kerosene, diesel, heavy fuel oil, bitumen.

## Combustion
- Complete: hydrocarbon + oxygen → **carbon dioxide + water**.
- Incomplete (limited O₂): carbon monoxide (toxic) and soot.

## Cracking
Breaking long-chain alkanes into **shorter, more useful alkanes + alkenes**. **Catalytic** (hot catalyst) or **steam** cracking. Meets demand for petrol; alkenes make polymers.
> C₁₀H₂₂ → C₈H₁₈ + C₂H₄

**Test for alkenes**: **bromine water** turns from orange to **colourless**.
`,
        keyPoints: ['Alkanes CₙH₂ₙ₊₂, saturated', 'Fractional distillation by boiling point', 'Longer chain: higher bp, more viscous, less flammable', 'Complete combustion → CO₂ + H₂O', 'Cracking: long → short alkanes + alkenes', 'Bromine water: orange → colourless with alkenes'],
        flashcards: cards([['General formula of alkanes?', 'CₙH₂ₙ₊₂'], ['First four alkanes?', 'Methane, ethane, propane, butane.'], ['What is cracking?', 'Breaking long-chain hydrocarbons into shorter, more useful ones (alkanes + alkenes).'], ['Test for an alkene?', 'Bromine water decolourises (orange → colourless).'], ['Products of complete combustion of a hydrocarbon?', 'Carbon dioxide and water.']]),
        questions: [
          txt('What is the formula of the alkane with 5 carbon atoms?', ['C5H12', 'C₅H₁₂'], 'CₙH₂ₙ₊₂ → C₅H₁₂ (pentane).', { d: 2 }),
          mc('How do long-chain hydrocarbons compare to short-chain ones?', ['Higher boiling point and more viscous', 'More flammable and less viscous', 'Lower boiling point and more viscous', 'Lower boiling point and less viscous'], 'Stronger intermolecular forces.', { d: 2 }),
          mc('Why is cracking carried out?', ['To meet demand for shorter chains like petrol and to make alkenes for polymers', 'To turn short-chain alkanes back into crude oil for storage', 'To join short molecules into longer chains for fuel oil', 'To remove sulfur so the fuels do not cause acid rain'], 'Supply vs demand.', { d: 2 }),
          tf('Alkanes decolourise bromine water.', false, 'Only alkenes (with a C=C double bond) do.', { d: 2 }),
        ],
      }),
      topic({
        id: 'chem-organic2', title: 'Alkenes, alcohols, carboxylic acids and polymers', summary: 'Functional groups and their reactions; addition and condensation polymers (Chemistry only).', tags: ['Chemistry only'],
        notes: `
| Family | Functional group | Example | Key reactions |
|---|---|---|---|
| **Alkenes** CₙH₂ₙ | C=C | Ethene C₂H₄ | Addition with H₂ (Ni catalyst), H₂O (steam → alcohol), halogens |
| **Alcohols** | –OH | Ethanol C₂H₅OH | Burn; + sodium → hydrogen; oxidised to carboxylic acids; fuels, solvents |
| **Carboxylic acids** | –COOH | Ethanoic acid CH₃COOH | Weak acids; + carbonates → CO₂; + alcohol → **ester** (acid catalyst) |
| **Esters** | –COO– | Ethyl ethanoate | Fruity smells - perfumes, flavourings |

**Fermentation**: sugar → ethanol + CO₂ using yeast (anaerobic, ~30°C).

## Polymers
- **Addition polymerisation**: many alkene monomers join; the C=C opens. Ethene → poly(ethene). Only one product.
- **Condensation polymerisation** (Higher): monomers with **two functional groups** join and a **small molecule** (usually water) is lost - e.g. polyesters (diol + dicarboxylic acid).
- **Natural polymers**: proteins (amino acids), starch and cellulose (glucose), **DNA** (nucleotides - two strands, double helix).
`,
        keyPoints: ['Alkenes CₙH₂ₙ - addition reactions', 'Alcohols –OH; carboxylic acids –COOH', 'Acid + alcohol → ester + water', 'Addition polymers: one product', 'Condensation polymers lose water (Higher)', 'DNA, proteins, starch are natural polymers'],
        flashcards: cards([['Functional group of alcohols?', '–OH'], ['Functional group of carboxylic acids?', '–COOH'], ['What is formed when an alcohol reacts with a carboxylic acid?', 'An ester and water.'], ['Monomer of poly(ethene)?', 'Ethene'], ['What is lost in condensation polymerisation?', 'A small molecule, usually water.']]),
        questions: [
          mc('What is made when ethene reacts with steam?', ['Ethanol', 'Ethane', 'Ethanoic acid', 'Poly(ethene)'], 'Hydration of an alkene gives an alcohol.', { d: 2 }),
          mc('What type of polymerisation produces water as well as the polymer?', ['Condensation', 'Addition', 'Hydration', 'Combustion'], 'A small molecule is eliminated.', { d: 3, tier: 'H' }),
          match('Match the compound to its family.', [['Propanol', 'Alcohol'], ['Propene', 'Alkene'], ['Propanoic acid', 'Carboxylic acid'], ['Ethyl ethanoate', 'Ester']], 'Recognise the endings: -ol, -ene, -oic acid, -oate.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'chem-analysis', title: 'Chemical analysis', description: 'Paper 2 · purity, chromatography, gas tests and identifying ions.',
    topics: [
      topic({
        id: 'chem-tests', title: 'Purity, chromatography and chemical tests', summary: 'Pure substances and formulations, chromatography, gas tests and ion tests (Chemistry only).', tags: ['Required practical'],
        notes: `
- **Pure** (chemistry): a single element or compound - melts/boils at a **specific temperature**. Impurities lower the melting point and widen its range.
- **Formulation**: a mixture designed for a purpose (paints, medicines, fertilisers, alloys).

## Chromatography (required practical)
Pencil baseline above the solvent level; spots of ink; solvent moves up the paper. **Rf = distance moved by substance ÷ distance moved by solvent**. Pure substances give **one spot**.

## Gas tests
| Gas | Test | Result |
|---|---|---|
| Hydrogen | Burning splint | **Squeaky pop** |
| Oxygen | Glowing splint | **Relights** |
| Carbon dioxide | Limewater | **Cloudy** |
| Chlorine | Damp litmus paper | **Bleached** white |

## Identifying ions (Chemistry only - required practical)
| Test | Result |
|---|---|
| **Flame test**: Li⁺ crimson, Na⁺ **yellow**, K⁺ lilac, Ca²⁺ orange-red, Cu²⁺ green | |
| **Sodium hydroxide**: Cu²⁺ **blue** ppt, Fe²⁺ **green** ppt, Fe³⁺ **brown** ppt; Al³⁺/Ca²⁺/Mg²⁺ white ppt (Al³⁺ dissolves in excess) | |
| **Carbonates**: add acid → CO₂ (limewater cloudy) | |
| **Halides**: nitric acid + silver nitrate → Cl⁻ **white**, Br⁻ **cream**, I⁻ **yellow** ppt | |
| **Sulfates**: HCl + barium chloride → **white** ppt | |

**Instrumental methods** (flame emission spectroscopy): accurate, sensitive, fast, small samples.
`,
        keyPoints: ['Pure substances have sharp melting points', 'Rf = substance distance ÷ solvent distance', 'H₂ pop, O₂ relights, CO₂ limewater cloudy, Cl₂ bleaches litmus', 'Flame colours: Li crimson, Na yellow, K lilac, Ca orange-red, Cu green', 'NaOH: Cu²⁺ blue, Fe²⁺ green, Fe³⁺ brown', 'Halides with AgNO₃: white, cream, yellow'],
        generators: ['c-rf'],
        flashcards: cards([['Test for chlorine?', 'Damp litmus paper is bleached.'], ['Test for carbon dioxide?', 'Limewater turns cloudy (milky).'], ['Flame colour of potassium?', 'Lilac.'], ['Precipitate colour of Fe³⁺ with NaOH?', 'Brown (orange-brown).'], ['Silver nitrate test result for bromide?', 'Cream precipitate.'], ['Why is the chromatography baseline drawn in pencil?', 'Pencil won\'t dissolve in the solvent and run.']]),
        questions: [
          match('Match the gas to its test result.', [['Hydrogen', 'Squeaky pop'], ['Oxygen', 'Relights glowing splint'], ['Carbon dioxide', 'Limewater turns cloudy'], ['Chlorine', 'Bleaches damp litmus']], 'The four gas tests.', { d: 1 }),
          mc('A compound gives a yellow flame and a cream precipitate with acidified silver nitrate. What is it?', ['Sodium bromide', 'Potassium chloride', 'Sodium iodide', 'Lithium bromide'], 'Yellow flame = Na⁺; cream = Br⁻.', { d: 3, tier: 'H' }),
          num('A spot moves 3.6 cm and the solvent 9.0 cm. Find the Rf value.', 0.4, '3.6 ÷ 9.0 = 0.4.', { d: 2 }),
          tf('A pure substance melts over a wide range of temperatures.', false, 'Pure substances melt at one sharp temperature.', { d: 2 }),
        ],
        examQuestions: [examQ('Describe how to use paper chromatography to find out whether a food colouring contains a banned dye.', 6, SIX(['Draw a pencil baseline on chromatography paper', 'Spot the food colouring and the known dyes on the line', 'Place in solvent with the baseline above the solvent level', 'Let solvent rise; remove and mark the solvent front', 'Compare spots/Rf values with the banned dye', 'A matching spot at the same height/Rf indicates the dye is present']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
    ],
  },
  {
    id: 'chem-atmos', title: 'Chemistry of the atmosphere and using resources', description: 'Paper 2 · the atmosphere, climate change, pollution, water and sustainability.',
    topics: [
      topic({
        id: 'chem-atmosphere', title: 'The atmosphere and climate change', summary: 'Evolution of the atmosphere, greenhouse gases, climate change, carbon footprint and pollutants.',
        notes: `
## Today's atmosphere
~**80% nitrogen**, ~**20% oxygen**, small amounts of argon, CO₂ and water vapour.

## How it evolved
1. Early: volcanoes released mainly **CO₂** (plus water vapour, nitrogen, small amounts of methane and ammonia). Water vapour condensed → **oceans**.
2. CO₂ dissolved in oceans → carbonates → **sedimentary rocks**; also locked in fossil fuels.
3. **Algae and plants** photosynthesised → **oxygen** increased (~2.7 billion years ago).

## Greenhouse effect
CO₂, **methane** and water vapour absorb **long-wavelength (infrared)** radiation emitted by Earth and re-radiate it, keeping Earth warm.
- Human activities increase CO₂ (burning fossil fuels, deforestation) and methane (cattle, rice fields, landfill).
- Effects of **climate change**: rising sea levels, more extreme weather, changes to food production and species distribution.
- **Carbon footprint**: total greenhouse gases emitted over a product's/activity's life cycle. Reduce by renewables, energy efficiency, carbon capture.

## Atmospheric pollutants
| Pollutant | Source | Effect |
|---|---|---|
| Carbon monoxide | Incomplete combustion | Toxic - binds to haemoglobin; colourless, odourless |
| Soot (carbon particulates) | Incomplete combustion | Global dimming, lung damage |
| Sulfur dioxide | Sulfur impurities in fuels | **Acid rain**, respiratory problems |
| Nitrogen oxides | Nitrogen + oxygen at high temperature in engines | Acid rain, respiratory problems |
`,
        keyPoints: ['Atmosphere ~80% N₂, ~20% O₂', 'Early atmosphere mainly CO₂ from volcanoes', 'Oxygen from photosynthesis (algae, plants)', 'Greenhouse gases: CO₂, CH₄, H₂O absorb infrared', 'CO toxic; SO₂ and NOₓ cause acid rain; soot causes global dimming'],
        flashcards: cards([['Composition of today\'s atmosphere?', 'About 80% nitrogen, 20% oxygen, small amounts of other gases.'], ['Where did the oxygen come from?', 'Photosynthesis by algae and plants.'], ['Name three greenhouse gases', 'Carbon dioxide, methane, water vapour.'], ['Why is carbon monoxide dangerous?', 'It binds to haemoglobin, reducing oxygen transport; it\'s colourless and odourless.'], ['What causes acid rain?', 'Sulfur dioxide and nitrogen oxides dissolving in rainwater.']]),
        questions: [
          mc('Where did most of the early atmosphere\'s carbon dioxide go?', ['Dissolved in oceans and locked in rocks and fossil fuels', 'It escaped into space as the Earth cooled down', 'It was turned into nitrogen by volcanic activity', 'It was used up by animals breathing it in'], 'Carbonates, sedimentary rocks and fossil fuels.', { d: 2 }),
          mc('Which pollutant causes global dimming?', ['Soot (particulates)', 'Carbon dioxide', 'Methane', 'Nitrogen oxides'], 'Particulates reflect sunlight.', { d: 2 }),
          multi('Which human activities increase greenhouse gases?', ['Burning fossil fuels', 'Cattle farming', 'Deforestation', 'Landfill'], ['Planting forests'], 'CO₂ and methane sources.', { d: 1 }),
        ],
        examQuestions: [examQ('Describe how the composition of the Earth\'s atmosphere has changed from the early atmosphere to today.', 6, SIX(['Early atmosphere mainly CO₂ from volcanic activity, little/no oxygen', 'Water vapour condensed to form oceans', 'CO₂ dissolved in oceans; formed carbonate precipitates/sedimentary rocks', 'Algae and plants photosynthesised, reducing CO₂ and increasing O₂', 'CO₂ locked in fossil fuels', 'Now about 80% N₂, 20% O₂']), { meta: '6-mark describe', time: 7 })],
      }),
      topic({
        id: 'chem-resources', title: 'Using resources: water, LCA, recycling and materials', summary: 'Potable water, waste water, life cycle assessments, recycling, alternative extraction; corrosion, alloys, Haber process and fertilisers (Chemistry only).', tags: ['Required practical'],
        notes: `
**Sustainable development** meets today's needs without compromising future generations.

## Potable water (safe to drink - not pure)
UK: rainwater → **filtration** (filter beds) → **sterilisation** (chlorine, ozone or UV). Where fresh water is scarce: **desalination** (distillation or reverse osmosis) - needs a lot of energy.
**Waste water**: screening → sedimentation → sludge digested anaerobically → effluent treated aerobically.

**Required practical**: analyse and purify water - test pH, evaporate to find dissolved solids, distil to purify.

## Life cycle assessment (LCA)
Assesses environmental impact at each stage: raw materials, manufacture, use, disposal. Some values (pollution effects) are hard to quantify → can be biased.

## Reduce, reuse, recycle
Metals, glass and plastics can be recycled - saves energy and resources.

## Alternative metal extraction (Higher)
**Phytomining** (plants absorb copper → burn → ash) and **bioleaching** (bacteria produce leachate solutions) - for low-grade ores.

## Chemistry only
- **Corrosion**: rusting needs **oxygen and water**. Prevent with barriers (paint, oil) or **sacrificial protection**/galvanising (zinc corrodes first).
- **Alloys**: bronze (copper + tin), brass (copper + zinc), steel (iron + carbon), gold alloys measured in carats (24 = pure).
- **Ceramics, polymers, composites** (e.g. fibreglass, carbon fibre). Thermosoftening vs thermosetting polymers.
- **Haber process**: N₂ + 3H₂ ⇌ 2NH₃; **450°C, 200 atm, iron catalyst** - a compromise between rate and yield. Unreacted gases recycled.
- **NPK fertilisers**: nitrogen, phosphorus, potassium compounds for plant growth.
`,
        keyPoints: ['Potable ≠ pure', 'Filter, then sterilise (chlorine/ozone/UV)', 'Desalination uses lots of energy', 'LCA: raw materials → manufacture → use → disposal', 'Phytomining and bioleaching (Higher)', 'Haber: 450°C, 200 atm, iron catalyst (Chem only)', 'Rust needs water and oxygen (Chem only)'],
        flashcards: cards([['What is potable water?', 'Water that is safe to drink (low levels of dissolved substances and microbes).'], ['How is UK drinking water sterilised?', 'Chlorine, ozone or ultraviolet light.'], ['Stages of a life cycle assessment?', 'Extracting raw materials, manufacturing/packaging, use, disposal.'], ['Conditions for the Haber process?', '450°C, 200 atmospheres, iron catalyst.'], ['What is phytomining?', 'Growing plants that absorb metal compounds, then burning them to extract the metal from the ash.'], ['What does rusting need?', 'Oxygen and water.']]),
        questions: [
          mc('Why is desalination not widely used in the UK?', ['It requires large amounts of energy', 'The water it produces is still too salty to drink', 'It produces toxic chlorine gas as a waste product', 'UK sea water contains too many microbes to treat'], 'The UK has enough fresh water; desalination is energy-expensive.', { d: 2 }),
          ord('Put the stages of a life cycle assessment in order.', ['Extracting and processing raw materials', 'Manufacturing and packaging', 'Use and operation', 'Disposal at end of life'], 'Cradle to grave.', { d: 1 }),
          tf('Potable water is pure water.', false, 'It contains dissolved substances - it is safe to drink, not chemically pure.', { d: 2 }),
          mc('Why is 450°C used in the Haber process even though a lower temperature gives a higher yield?', ['It is a compromise - lower temperatures make the rate too slow', 'The iron catalyst melts at temperatures below 450 °C', 'Ammonia only forms at temperatures above 450 °C', 'Higher temperatures make heating the gases cheaper'], 'Rate vs yield compromise.', { d: 4, tier: 'H' }),
        ],
      }),
    ],
  },
];
