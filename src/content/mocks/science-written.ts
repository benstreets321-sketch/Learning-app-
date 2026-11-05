// Extra written questions for the science mock papers (AQA style). One marking point per mark unless levelled.
import type { ExamQuestion } from '../types';
import { examQ } from '../dsl';

const L6 = (indicative: string, focus: string): string[] => [
  `Level 3 (5-6 marks): A detailed and coherent ${focus}, with the key steps or ideas in a logical order and linked together.`,
  `Level 2 (3-4 marks): A ${focus} with several relevant points, mostly in a sensible order.`,
  'Level 1 (1-2 marks): Simple, relevant statements with little linking.',
  `Indicative content: ${indicative}`,
];

export const SCIENCE_WRITTEN: Record<string, ExamQuestion[]> = {
  // ===================== BIOLOGY PAPER 1 =====================
  'bio-cells': [
    examQ('Give two differences between a prokaryotic cell and a eukaryotic cell.', 2, ['Prokaryotic cells have no nucleus / DNA is free in the cytoplasm; eukaryotic cells have a nucleus (1)', 'Prokaryotic cells may have plasmids / are much smaller / have no mitochondria or chloroplasts (1)'], { meta: 'AQA Paper 1' }),
    examQ('Explain how a sperm cell is adapted to its function.', 3, ['A tail to swim to the egg (1)', 'Many mitochondria to release energy for swimming (1)', 'An acrosome containing enzymes to digest through the egg membrane / a nucleus with half the genetic information (1)'], { meta: 'AQA Paper 1' }),
  ],
  'bio-division': [
    examQ('Describe what happens during the cell cycle so that two identical cells are produced.', 4, ['The cell grows and increases the number of sub-cellular structures such as ribosomes and mitochondria (1)', 'The DNA replicates to form two copies of each chromosome (1)', 'Mitosis: one set of chromosomes is pulled to each end of the cell and the nucleus divides (1)', 'The cytoplasm and cell membrane divide to form two identical cells (1)'], { meta: 'AQA Paper 1' }),
    examQ('Give one advantage and one disadvantage of using embryonic stem cells to treat diseases.', 2, ['Advantage: can differentiate into any type of cell / could replace damaged cells (1)', 'Disadvantage: ethical or religious objections / risk of viral infection or rejection / may cause tumours (1)'], { meta: 'AQA Paper 1' }),
  ],
  'bio-transport': [
    examQ('A student puts potato cylinders into sugar solutions of different concentrations for 24 hours and records the percentage change in mass.\n\nExplain why the cylinder in the most concentrated solution decreased in mass.', 3, ['The solution outside was more concentrated than inside the potato cells (lower water potential outside) (1)', 'Water moved out of the cells by osmosis (1)', 'Across the partially permeable cell membrane (1)'], { meta: 'AQA Paper 1 · Required practical' }),
    examQ('Explain how the small intestine is adapted for the efficient absorption of digested food.', 4, ['Villi give a large surface area (1)', 'Microvilli further increase the surface area (1)', 'A good blood supply maintains a steep concentration gradient (1)', 'A thin wall / one cell thick gives a short diffusion distance (1)'], { meta: 'AQA Paper 1' }),
  ],
  'bio-digestion': [
    examQ('Describe how you could test a sample of food for the presence of starch, sugar and protein.', 6, L6('starch: add iodine solution, turns from orange-brown to blue-black; sugar: Benedict\'s solution, heat in a water bath at about 75 °C, turns from blue to green/yellow/brick red; protein: biuret reagent, turns from blue to purple/lilac; grind food with water and filter first; use separate samples for each test; safety (goggles, care with hot water).', 'method'), { meta: 'AQA Paper 1 · Required practical · 6-mark' }),
    examQ('Explain why amylase does not work in the stomach.', 2, ['The stomach contains hydrochloric acid / has a low pH (1)', 'The pH changes the shape of the active site so the enzyme is denatured / starch no longer fits (1)'], { meta: 'AQA Paper 1' }),
  ],
  'bio-heart': [
    examQ('Explain why the left ventricle has a thicker muscular wall than the right ventricle.', 2, ['The left ventricle pumps blood around the whole body (1)', 'so it needs to produce a higher pressure (the right ventricle only pumps to the nearby lungs) (1)'], { meta: 'AQA Paper 1' }),
    examQ('Coronary heart disease can be treated with stents or statins. Evaluate the use of these two treatments.', 6, L6('stents keep coronary arteries open so blood (oxygen) reaches heart muscle; effective immediately and long-lasting; but need surgery, risk of infection or blood clots; statins reduce blood cholesterol, slowing fatty deposits; no surgery needed; but must be taken long term, take time to work, side effects (e.g. liver problems); judgement depends on how severe the blockage is.', 'evaluation with a justified judgement'), { meta: 'AQA Paper 1 · 6-mark' }),
  ],
  'bio-health': [
    examQ('Describe the difference between a benign tumour and a malignant tumour.', 2, ['Benign tumours are contained in one area / usually within a membrane and do not invade other parts of the body (1)', 'Malignant tumours invade neighbouring tissues and spread to other parts of the body in the blood, forming secondary tumours (1)'], { meta: 'AQA Paper 1' }),
  ],
  'bio-pathogens': [
    examQ('Explain how antibiotics and painkillers are used differently to treat a bacterial infection.', 3, ['Antibiotics kill (infective) bacteria inside the body (1)', 'Painkillers only treat the symptoms / do not kill pathogens (1)', 'Antibiotics cannot kill viruses (so are not used for viral infections) (1)'], { meta: 'AQA Paper 1' }),
  ],
  'bio-immunity': [
    examQ('Explain how vaccination protects a person from a disease.', 4, ['A small quantity of dead or inactive pathogen is injected (1)', 'White blood cells (lymphocytes) are stimulated to produce antibodies (1)', 'Memory cells remain in the body (1)', 'If the real pathogen enters, antibodies are produced rapidly and in large numbers, so the person does not become ill (1)'], { meta: 'AQA Paper 1' }),
  ],
  'bio-photosynthesis': [
    examQ('A student investigates the effect of light intensity on the rate of photosynthesis of pondweed by counting bubbles. Explain why the rate stops increasing at high light intensities.', 3, ['Another factor becomes limiting (1)', 'such as carbon dioxide concentration or temperature (1)', 'so increasing light intensity no longer increases the rate (1)'], { meta: 'AQA Paper 1 · Required practical (Higher)' }),
    examQ('Describe how plants use the glucose produced in photosynthesis.', 4, ['For respiration (1)', 'Converted into insoluble starch for storage (1)', 'Used to produce fat or oil for storage (1)', 'Used to produce cellulose to strengthen cell walls / combined with nitrate ions to make amino acids for proteins (1)'], { meta: 'AQA Paper 1' }),
  ],
  'bio-respiration': [
    examQ('Explain why a person\'s breathing rate and heart rate stay high for a while after exercise.', 3, ['Anaerobic respiration during exercise produced lactic acid (1)', 'An oxygen debt builds up (1)', 'Extra oxygen is needed to react with / oxidise the lactic acid (converted back to glucose in the liver), and blood carries lactic acid away from muscles (1)'], { meta: 'AQA Paper 1 (Higher)' }),
  ],

  // ===================== BIOLOGY PAPER 2 =====================
  'bio-nervous': [
    examQ('Describe a method to investigate the effect of a factor on human reaction time.', 6, L6('ruler drop test: partner holds a ruler at zero above the open hand; drops without warning; catch it; record the distance; convert to reaction time using a table; repeat several times and calculate a mean; change one factor (e.g. caffeine, practice, distraction) and keep others the same (same hand, same person, same ruler, same starting position); compare results.', 'method'), { meta: 'AQA Paper 2 · Required practical · 6-mark' }),
    examQ('Explain the role of the iris in controlling the amount of light entering the eye in bright light.', 3, ['Circular muscles of the iris contract (1)', 'Radial muscles relax (1)', 'so the pupil gets smaller and less light enters (1)'], { meta: 'AQA Biology Paper 2 · Biology only' }),
  ],
  'bio-hormones': [
    examQ('Explain how the body responds when blood glucose concentration rises after a meal.', 4, ['The rise is detected by the pancreas (1)', 'The pancreas releases insulin into the blood (1)', 'Insulin causes glucose to move from the blood into cells (1)', 'In the liver and muscles excess glucose is converted to glycogen for storage (1)'], { meta: 'AQA Paper 2' }),
    examQ('Compare type 1 and type 2 diabetes.', 4, ['Type 1: the pancreas produces too little or no insulin (1)', 'Type 2: body cells no longer respond to insulin (1)', 'Type 1 is treated with insulin injections (1)', 'Type 2 is treated with a carbohydrate-controlled diet and exercise; obesity is a risk factor (1)'], { meta: 'AQA Paper 2' }),
  ],
  'bio-reproduction-h': [
    examQ('Give two advantages and two disadvantages of hormonal methods of contraception compared with barrier methods.', 4, ['Advantage: more effective at preventing pregnancy (if used correctly) (1)', 'Advantage: does not need to be used each time / long lasting (e.g. implant or injection) (1)', 'Disadvantage: possible side effects (e.g. mood changes, weight gain) (1)', 'Disadvantage: does not protect against sexually transmitted infections (1)'], { meta: 'AQA Paper 2' }),
  ],
  'bio-kidney': [
    examQ('Describe how the body responds when its core temperature rises too high.', 4, ['The thermoregulatory centre in the brain detects the increase (1)', 'Sweat glands produce more sweat, which evaporates and transfers energy from the skin (1)', 'Blood vessels supplying skin capillaries dilate (vasodilation) (1)', 'so more blood flows near the skin surface and more energy is transferred to the surroundings (1)'], { meta: 'AQA Paper 2' }),
  ],
  'bio-dna': [
    examQ('Explain why sexual reproduction produces variation in the offspring.', 3, ['Gametes are produced by meiosis, so each gamete is genetically different (1)', 'Fertilisation joins genetic information from two parents (1)', 'There is mixing of genetic information / a random combination of alleles (1)'], { meta: 'AQA Paper 2' }),
    examQ('Describe how a mutation in a gene can change the protein that is produced.', 3, ['A change in the base sequence of DNA (1)', 'changes the sequence of amino acids (1)', 'so the protein may fold into a different shape and not work, e.g. an enzyme\'s active site changes (1)'], { meta: 'AQA Biology Paper 2 · Biology only (Higher)' }),
  ],
  'bio-genetics': [
    examQ('Polydactyly is caused by a dominant allele (D). A father is heterozygous (Dd) and the mother does not have polydactyly (dd).\n\nUse a Punnett square to find the probability that their child will have polydactyly.', 3, ['Correct gametes: D and d from the father, d and d from the mother (1)', 'Offspring genotypes: Dd, Dd, dd, dd (1)', 'Probability = 0.5 / 50% / 1 in 2 (1)'], { meta: 'AQA Paper 2' }),
    examQ('Explain how sex is determined in humans.', 3, ['Ordinary human cells have 23 pairs of chromosomes; one pair are sex chromosomes (1)', 'Females have XX and males have XY (1)', 'Eggs all carry an X; sperm carry an X or a Y, so there is a 50% chance of a boy or a girl (1)'], { meta: 'AQA Paper 2' }),
  ],
  'bio-evolution': [
    examQ('Explain how bacteria can evolve to become resistant to antibiotics.', 4, ['Mutations occur at random in bacteria, some giving resistance (1)', 'When an antibiotic is used, non-resistant bacteria are killed (1)', 'Resistant bacteria survive and reproduce (1)', 'so the resistant strain spreads / the allele for resistance is passed on (1)'], { meta: 'AQA Paper 2' }),
    examQ('Describe the process of genetic engineering to produce bacteria that make human insulin.', 4, ['The human insulin gene is cut out using enzymes (1)', 'A plasmid is cut open with the same enzyme (1)', 'The gene is inserted into the plasmid (vector) (1)', 'The plasmid is put into bacteria, which multiply and produce insulin (1)'], { meta: 'AQA Paper 2 (Higher)' }),
  ],
  'bio-ecosystems': [
    examQ('Describe how a student could estimate the population of daisies on a school field using quadrats.', 6, L6('place quadrats at random (e.g. coordinates from a random number generator on a grid); count daisies in each quadrat; use many quadrats (e.g. 10 or more); calculate the mean number per quadrat; work out the area of the field; population = mean per quadrat × (field area ÷ quadrat area); explain why random sampling avoids bias.', 'method'), { meta: 'AQA Paper 2 · Required practical · 6-mark' }),
    examQ('Explain how a predator-prey cycle shows interdependence.', 3, ['When there is more prey, predators have more food so their numbers increase (1)', 'More predators eat more prey, so prey numbers fall (1)', 'Then predators have less food so their numbers fall, and the cycle repeats (predator peaks lag behind prey) (1)'], { meta: 'AQA Paper 2' }),
  ],
  'bio-biodiversity': [
    examQ('Describe two ways humans reduce biodiversity and two ways it can be protected.', 4, ['Reduce: deforestation / habitat destruction for farming or building (1)', 'Reduce: pollution (e.g. sewage, fertiliser, pesticides) / peat bog destruction (1)', 'Protect: breeding programmes for endangered species / protecting habitats (1)', 'Protect: reintroducing hedgerows and field margins / reducing deforestation and carbon emissions / recycling (1)'], { meta: 'AQA Paper 2' }),
  ],
  'bio-cycles': [
    examQ('Explain why the biomass at each trophic level is less than at the level below.', 3, ['Not all of the organism is eaten / some parts are not digested and are lost as faeces (1)', 'Some biomass is lost as carbon dioxide and water from respiration (1)', 'Some is lost in waste (urea); so only about 10% is transferred (1)'], { meta: 'AQA Biology Paper 2 · Biology only' }),
  ],

  // ===================== CHEMISTRY PAPER 1 =====================
  'chem-atoms': [
    examQ('An atom has 11 protons and a mass number of 23.\n\n(a) How many neutrons does it have?\n(b) Give its electronic structure.\n(c) Explain why isotopes of an element have the same chemical properties.', 4, ['12 neutrons (1)', '2, 8, 1 (1)', 'Isotopes have the same number of electrons (1)', 'in the outer shell / same electronic structure, and chemical reactions involve electrons (1)'], { meta: 'AQA Paper 1' }),
    examQ('Describe how to separate a mixture of salt and sand to obtain dry salt crystals.', 4, ['Add water and stir so the salt dissolves (1)', 'Filter to remove the sand (1)', 'Heat the filtrate to evaporate some of the water (1)', 'Leave to crystallise, then dry the crystals (1)'], { meta: 'AQA Paper 1' }),
  ],
  'chem-periodic': [
    examQ('Explain why the reactivity of the Group 1 elements increases down the group.', 3, ['The outer electron is further from the nucleus / more shells (1)', 'There is less attraction between the nucleus and the outer electron (more shielding) (1)', 'so the outer electron is lost more easily (1)'], { meta: 'AQA Paper 1' }),
    examQ('Chlorine water is added to potassium bromide solution.\n\n(a) Describe what you would see.\n(b) Explain why the reaction happens.', 3, ['The solution turns orange (brown) (1)', 'Chlorine is more reactive than bromine (1)', 'so chlorine displaces bromine from the solution (1)'], { meta: 'AQA Paper 1' }),
    examQ('Give two ways in which Mendeleev\'s periodic table was an improvement on earlier tables.', 2, ['He left gaps for elements not yet discovered (and predicted their properties) (1)', 'He changed the order of some elements (based on atomic weights) to put elements with similar properties in the same group (1)'], { meta: 'AQA Paper 1' }),
  ],
  'chem-bonding': [
    examQ('Describe what happens when magnesium reacts with oxygen to form magnesium oxide. Refer to electrons in your answer.', 4, ['Magnesium atoms lose two electrons (1)', 'Oxygen atoms gain two electrons (1)', 'forming Mg²⁺ and O²⁻ ions (1)', 'which are held together by strong electrostatic attraction (ionic bonding) (1)'], { meta: 'AQA Paper 1' }),
  ],
  'chem-structure': [
    examQ('Explain why graphite conducts electricity but diamond does not.', 3, ['In graphite each carbon atom forms three covalent bonds (1)', 'leaving one delocalised electron per atom that can move through the structure (1)', 'In diamond each carbon forms four bonds, so there are no free electrons (1)'], { meta: 'AQA Paper 1' }),
    examQ('Explain why metals are malleable.', 2, ['The atoms (ions) are arranged in layers (1)', 'which can slide over each other (1)'], { meta: 'AQA Paper 1' }),
  ],
  'chem-moles': [
    examQ('Magnesium reacts with hydrochloric acid: Mg + 2HCl → MgCl₂ + H₂\n\nCalculate the mass of hydrogen produced when 6.0 g of magnesium reacts completely. (Aᵣ: Mg = 24, H = 1)', 3, ['Moles of Mg = 6.0 ÷ 24 = 0.25 mol (1)', '1 : 1 ratio, so 0.25 mol of H₂ (1)', 'Mass = 0.25 × 2 = 0.5 g (1)'], { meta: 'AQA Paper 1 (Higher)' }),
  ],
  'chem-yield': [
    examQ('In an experiment the theoretical yield of a product was 40 g. The actual yield was 30 g.\n\n(a) Calculate the percentage yield.\n(b) Give two reasons why the yield is less than 100%.', 3, ['30 ÷ 40 × 100 = 75% (1)', 'Reason, e.g. the reaction may be reversible / not go to completion (1)', 'Reason, e.g. some product lost when separated / side reactions with other products (1)'], { meta: 'AQA Chemistry Paper 1 · Chemistry only' }),
    examQ('25.0 cm³ of sodium hydroxide solution is neutralised by 20.0 cm³ of 0.10 mol/dm³ hydrochloric acid. NaOH + HCl → NaCl + H₂O\n\nCalculate the concentration of the sodium hydroxide in mol/dm³.', 3, ['Moles HCl = 0.10 × 20.0/1000 = 0.0020 mol (1)', '1 : 1 so moles NaOH = 0.0020 mol (1)', 'Concentration = 0.0020 ÷ 0.0250 = 0.080 mol/dm³ (1)'], { meta: 'AQA Chemistry Paper 1 · Chemistry only (Higher)' }),
  ],
  'chem-reactivity': [
    examQ('Explain why aluminium is extracted by electrolysis rather than by reduction with carbon.', 2, ['Aluminium is more reactive than carbon (1)', 'so carbon cannot displace / reduce aluminium oxide (1)'], { meta: 'AQA Paper 1' }),
  ],
  'chem-acids': [
    examQ('Hydrochloric acid is a strong acid and ethanoic acid is a weak acid. Explain the difference.', 2, ['A strong acid is completely ionised in water (1)', 'A weak acid is only partially ionised in water (1)'], { meta: 'AQA Paper 1 (Higher)' }),
    examQ('Write a word equation and a balanced symbol equation for the reaction of zinc carbonate with sulfuric acid.', 3, ['zinc carbonate + sulfuric acid → zinc sulfate + water + carbon dioxide (1)', 'ZnCO₃ + H₂SO₄ → ZnSO₄ + H₂O + CO₂ (correct formulae) (1)', 'Balanced (1)'], { meta: 'AQA Paper 1' }),
  ],
  'chem-electrolysis': [
    examQ('Aqueous sodium chloride solution is electrolysed. Name the product at each electrode and explain why sodium is not produced at the cathode.', 4, ['Hydrogen at the cathode (negative electrode) (1)', 'Chlorine at the anode (positive electrode) (1)', 'Sodium is more reactive than hydrogen (1)', 'so hydrogen ions are discharged instead (1)'], { meta: 'AQA Paper 1' }),
    examQ('Write the half equation for the reaction at the anode when molten lead bromide is electrolysed, and explain whether it is oxidation or reduction.', 2, ['2Br⁻ → Br₂ + 2e⁻ (1)', 'Oxidation, because bromide ions lose electrons (1)'], { meta: 'AQA Paper 1 (Higher)' }),
  ],
  'chem-energychanges': [
    examQ('Describe a method to investigate how the temperature change of a neutralisation reaction depends on the volume of acid added.', 6, L6('polystyrene cup in a beaker (insulation); measure a fixed volume of sodium hydroxide with a measuring cylinder; record the starting temperature; add acid in 5 cm³ portions; stir and record the highest temperature after each addition; repeat; plot temperature against volume; keep concentrations the same; the maximum temperature shows the volume for neutralisation.', 'method'), { meta: 'AQA Paper 1 · Required practical · 6-mark' }),
  ],

  // ===================== CHEMISTRY PAPER 2 =====================
  'chem-rate': [
    examQ('A student measured the volume of gas produced when magnesium reacts with hydrochloric acid. In the first 30 seconds, 24 cm³ of gas was produced.\n\nCalculate the mean rate of reaction in cm³/s.', 2, ['24 ÷ 30 (1)', '= 0.8 cm³/s (1)'], { meta: 'AQA Paper 2' }),
    examQ('Explain why marble chips react faster with hydrochloric acid when they are crushed into a powder.', 2, ['The powder has a larger surface area (to volume ratio), so more particles are exposed to the acid (1)', 'so there are more frequent collisions (1)'], { meta: 'AQA Paper 2' }),
    examQ('A graph shows the volume of gas produced against time. Describe how the rate of reaction at 60 seconds can be found from the graph.', 2, ['Draw a tangent to the curve at 60 s (1)', 'Calculate the gradient of the tangent (change in volume ÷ change in time) (1)'], { meta: 'AQA Paper 2 · Higher' }),
    examQ('Explain, in terms of particles, why increasing the temperature increases the rate of a reaction.', 3, ['Particles move faster / have more energy (1)', 'so collide more often (1)', 'and more collisions have energy greater than the activation energy (more successful collisions) (1)'], { meta: 'AQA Paper 2' }),
    examQ('Describe how to investigate the effect of concentration on the rate of reaction between sodium thiosulfate and hydrochloric acid.', 6, L6('draw a cross on paper under a conical flask; add a measured volume of sodium thiosulfate; add hydrochloric acid and start a timer; time until the cross disappears (cloudy sulfur precipitate); repeat for different concentrations by diluting with water but keeping total volume the same; keep temperature and acid volume constant; repeat and calculate means; rate = 1/time.', 'method'), { meta: 'AQA Paper 2 · Required practical · 6-mark' }),
    examQ('Explain how a catalyst increases the rate of a reaction.', 2, ['It provides a different reaction pathway (1)', 'with a lower activation energy (1)'], { meta: 'AQA Paper 2' }),
  ],
  'chem-equilibrium': [
    examQ('What is meant by a dynamic equilibrium?', 2, ['The forward and reverse reactions happen at the same rate (1)', 'in a closed system, so the amounts/concentrations of reactants and products stay constant (1)'], { meta: 'AQA Paper 2' }),
    examQ('Ammonia is made in the reaction N₂ + 3H₂ ⇌ 2NH₃.\n\nPredict and explain the effect of increasing the pressure on the yield of ammonia.', 3, ['The yield of ammonia increases (1)', 'because the position of equilibrium shifts to the side with fewer molecules of gas (1)', 'there are 2 molecules on the right and 4 on the left (1)'], { meta: 'AQA Paper 2 · Higher' }),
    examQ('Hydrated copper sulfate (blue) is heated to form anhydrous copper sulfate (white) and water. This is a reversible reaction.\n\nDescribe what happens when water is added to anhydrous copper sulfate, and what this shows about the energy change.', 3, ['It turns from white to blue (1)', 'and the mixture gets hot / energy is released (1)', 'The same amount of energy is transferred in each direction (endothermic one way, exothermic the other) (1)'], { meta: 'AQA Paper 2' }),
  ],
  'chem-crude': [
    examQ('Write a balanced symbol equation for the complete combustion of propane, C₃H₈.', 2, ['C₃H₈ + O₂ → CO₂ + H₂O with correct formulae (1)', 'Balanced: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O (1)'], { meta: 'AQA Paper 2' }),
    examQ('Describe how cracking is carried out and explain why it is useful.', 4, ['Long-chain hydrocarbons are heated to vaporise them (1)', 'passed over a hot catalyst or mixed with steam at a very high temperature (1)', 'Produces shorter, more useful alkanes for fuels, which are in high demand (1)', 'and alkenes, used to make polymers (1)'], { meta: 'AQA Paper 2' }),
    examQ('Explain how the properties of hydrocarbons change as the molecules get bigger.', 3, ['Boiling point increases (1)', 'Viscosity increases (1)', 'Flammability decreases / harder to ignite (1)'], { meta: 'AQA Paper 2' }),
  ],
  'chem-organic2': [
    examQ('Ethanol can be produced by fermentation. Give the conditions needed and the equation for the reaction.', 3, ['Yeast (enzymes) in sugar solution, without oxygen (anaerobic) (1)', 'At a warm temperature of about 30-35 °C (1)', 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (1)'], { meta: 'AQA Chemistry Paper 2 · Chemistry only' }),
    examQ('Describe a test to show that a hydrocarbon is an alkene.', 2, ['Add bromine water (1)', 'It turns from orange to colourless (1)'], { meta: 'AQA Paper 2' }),
  ],
  'chem-tests': [
    examQ('Describe the tests for hydrogen, oxygen and carbon dioxide, and give the result of each test.', 3, ['Hydrogen: a lighted splint gives a squeaky pop (1)', 'Oxygen: a glowing splint relights (1)', 'Carbon dioxide: bubble through limewater, which turns milky/cloudy (1)'], { meta: 'AQA Paper 2' }),
    examQ('Describe the test for chlorine gas and give the result.', 2, ['Damp litmus paper (1)', 'is bleached / turns white (1)'], { meta: 'AQA Paper 2' }),
    examQ('A sample of aspirin melts between 120 °C and 128 °C. Pure aspirin melts at 136 °C.\n\nWhat does this tell you about the sample? Explain your answer.', 2, ['The sample is impure / is a mixture (1)', 'A pure substance melts at a single, specific temperature; impurities lower the melting point and make it melt over a range (1)'], { meta: 'AQA Paper 2' }),
    examQ('What is a formulation? Give one example.', 2, ['A mixture designed as a useful product, with each component in a measured quantity (1)', 'Example: paint, medicines, fuels, fertilisers, alloys, cleaning agents or foods (1)'], { meta: 'AQA Paper 2' }),
    examQ('A student uses paper chromatography to test whether a food colouring contains dye X. Describe how the student should carry out the experiment.', 6, L6('draw a start line in pencil (does not dissolve) near the bottom of the paper; put spots of the food colouring and dye X on the line; place in a beaker with solvent below the start line; cover/lid; allow the solvent to rise; remove and mark the solvent front; let it dry; compare spots: if a spot has the same Rf/height as dye X it contains X; calculate Rf = distance moved by spot ÷ distance moved by solvent.', 'method'), { meta: 'AQA Paper 2 · Required practical · 6-mark' }),
    examQ('Describe tests to identify the ions in a solution of iron(II) sulfate.', 4, ['Add sodium hydroxide solution (1)', 'A green precipitate shows iron(II) ions (1)', 'Add dilute hydrochloric acid then barium chloride solution (1)', 'A white precipitate shows sulfate ions (1)'], { meta: 'AQA Chemistry Paper 2 · Chemistry only' }),
    examQ('Give two advantages of instrumental methods of analysis compared with chemical tests.', 2, ['More accurate / sensitive – can detect very small amounts (1)', 'Faster / can be automated (1)'], { meta: 'AQA Chemistry Paper 2 · Chemistry only' }),
  ],
  'chem-atmosphere': [
    examQ('Give two possible effects of global climate change.', 2, ['First effect, e.g. rising sea levels causing flooding and coastal erosion / more frequent or severe storms (1)', 'Second effect, e.g. changes in the amount and pattern of rainfall / changes to food production / changes in the distribution of wildlife species (1)'], { meta: 'AQA Paper 2' }),
    examQ('Explain how burning some fossil fuels produces sulfur dioxide, and give one problem it causes.', 3, ['The fuel contains sulfur as an impurity (1)', 'which reacts with oxygen when the fuel is burned (1)', 'Sulfur dioxide causes acid rain / respiratory problems (1)'], { meta: 'AQA Paper 2' }),
    examQ('Describe how the Earth\'s early atmosphere changed to form the atmosphere today.', 6, L6('early volcanic activity released mainly carbon dioxide with water vapour, nitrogen and small amounts of methane and ammonia; water vapour condensed to form the oceans; carbon dioxide dissolved in the oceans and formed carbonate precipitates (sediments); algae and plants photosynthesised, using carbon dioxide and releasing oxygen; carbon locked up in sedimentary rocks and fossil fuels; today about 80% nitrogen, 20% oxygen and small proportions of carbon dioxide, water vapour and noble gases.', 'account'), { meta: 'AQA Paper 2 · 6-mark' }),
    examQ('Explain how carbon monoxide from car engines is produced and why it is dangerous.', 3, ['It is produced by incomplete combustion of fuel (not enough oxygen) (1)', 'It is toxic (1)', 'because it combines with haemoglobin and reduces the oxygen the blood can carry; it is colourless and odourless (1)'], { meta: 'AQA Paper 2' }),
  ],
  'chem-resources': [
    examQ('Describe how sea water can be made potable by distillation.', 3, ['Heat the sea water so the water boils/evaporates (1)', 'Cool the steam so it condenses into pure water (1)', 'The dissolved salts are left behind (1)'], { meta: 'AQA Paper 2' }),
    examQ('Fresh water from a reservoir is treated to make it safe to drink. Describe the two main stages in treating the water.', 2, ['Passing the water through filter beds to remove solids (1)', 'Sterilising it with chlorine, ozone or ultraviolet light to kill microbes (1)'], { meta: 'AQA Paper 2' }),
    examQ('Give two reasons why recycling aluminium is better than extracting new aluminium from its ore.', 2, ['Recycling uses much less energy than extracting aluminium by electrolysis (1)', 'It conserves the limited supply of ore / reduces mining and the waste sent to landfill (1)'], { meta: 'AQA Paper 2' }),
    examQ('Describe how a student could analyse a sample of water to find its pH and the mass of solids dissolved in it.', 6, L6('test the pH with universal indicator (compare with a colour chart) or a calibrated pH meter; weigh an empty evaporating basin; add a measured volume of the water sample; heat gently to evaporate the water; let it cool and reweigh; mass of dissolved solids = final mass − mass of basin; repeat and find a mean; distil the sample to purify it and check that the distilled water boils at 100 °C.', 'method'), { meta: 'AQA Paper 2 · Required practical · 6-mark' }),
    examQ('Describe how a life cycle assessment (LCA) is used to compare two products, and give one limitation of LCAs.', 4, ['Assess the use of raw materials (extraction and processing) (1)', 'Energy and resources used in manufacturing and packaging, and during use (1)', 'Disposal at the end of its life (and waste/pollution at each stage) (1)', 'Limitation: some values are estimates or subjective / can be biased or selective (1)'], { meta: 'AQA Paper 2' }),
    examQ('Explain why the Haber process uses a temperature of about 450 °C even though a lower temperature would give a higher yield.', 3, ['The forward reaction is exothermic, so a lower temperature would give a higher yield (1)', 'but the rate of reaction would be too slow (1)', '450 °C is a compromise between rate and yield (1)'], { meta: 'AQA Chemistry Paper 2 · Chemistry only' }),
  ],

  // ===================== PHYSICS PAPER 1 =====================
  'phys-stores': [
    examQ('A 0.5 kg ball is dropped from a height of 3.2 m. Ignore air resistance. Calculate the speed of the ball just before it hits the ground. (g = 9.8 N/kg)', 4, ['Eₚ = mgh = 0.5 × 9.8 × 3.2 = 15.68 J (1)', 'Eₖ gained = Eₚ lost = 15.68 J (1)', 'v² = 2Eₖ ÷ m = 2 × 15.68 ÷ 0.5 = 62.72 (1)', 'v = 7.9 m/s (1)'], { meta: 'AQA Paper 1 (Higher)' }),
  ],
  'phys-efficiency': [
    examQ('Describe a method to measure the specific heat capacity of a metal block.', 6, L6('measure the mass of the block with a balance; insert a heater and thermometer into holes in the block (oil in the thermometer hole for good contact); insulate the block; record starting temperature; switch on the heater with a joulemeter (or ammeter, voltmeter and stopwatch: E = VIt); record energy and temperature at intervals; calculate the temperature rise; c = ΔE ÷ (m Δθ); or plot a graph of temperature against energy; sources of error: energy lost to surroundings.', 'method'), { meta: 'AQA Paper 1 · Required practical · 6-mark' }),
    examQ('A motor transfers 1200 J of energy. 900 J is transferred usefully as kinetic energy. Calculate the efficiency and describe what happens to the rest of the energy.', 3, ['Efficiency = 900 ÷ 1200 = 0.75 or 75% (1)', 'The other 300 J is dissipated / wasted (1)', 'heating the motor and the surroundings (thermal energy store), or as sound (1)'], { meta: 'AQA Paper 1' }),
  ],
  'phys-resources': [
    examQ('Compare the use of wind turbines and gas-fired power stations to generate electricity.', 6, L6('wind: renewable, no CO₂ emissions while operating, no fuel costs, but unreliable (depends on wind), low output per turbine, visual and noise impact, high set-up cost; gas: reliable, output can be increased quickly to meet demand, relatively cheap, but non-renewable (will run out), releases CO₂ (global warming); gas used as backup for wind.', 'comparison'), { meta: 'AQA Paper 1 · 6-mark' }),
  ],
  'phys-circuits': [
    examQ('Describe how the resistance of a thermistor and of a light-dependent resistor (LDR) changes, and give one use of each.', 4, ['Thermistor: resistance decreases as temperature increases (1)', 'Use: thermostat / temperature sensor (1)', 'LDR: resistance decreases as light intensity increases (1)', 'Use: automatic night light / street lights (1)'], { meta: 'AQA Paper 1' }),
    examQ('A 6 Ω resistor and a 3 Ω resistor are connected in parallel to a 12 V battery. Calculate the current in each resistor and the total current.', 3, ['I = 12 ÷ 6 = 2 A (1)', 'I = 12 ÷ 3 = 4 A (1)', 'Total current = 6 A (1)'], { meta: 'AQA Paper 1' }),
    examQ('Describe how to investigate the I-V characteristic of a filament lamp.', 6, L6('circuit with a power supply, filament lamp, ammeter in series and voltmeter in parallel across the lamp, and a variable resistor; vary the resistance to change the current; record current and potential difference; reverse the connections to get negative values; repeat; plot a graph of I against V; the graph is a curve because resistance increases as the filament gets hotter.', 'method'), { meta: 'AQA Paper 1 · Required practical · 6-mark' }),
  ],
  'phys-mains': [
    examQ('An electric kettle has a power of 2.4 kW and is used for 3 minutes. Calculate the energy transferred and the current it draws from a 230 V supply.', 4, ['E = P t = 2400 × 180 (1)', '= 432 000 J (1)', 'I = P ÷ V = 2400 ÷ 230 (1)', '= 10.4 A (1)'], { meta: 'AQA Paper 1' }),
    examQ('Explain why electricity is transmitted through the National Grid at a very high potential difference.', 3, ['Step-up transformers increase the potential difference (1)', 'which reduces the current for the same power (1)', 'so less energy is lost heating the cables, making it more efficient (1)'], { meta: 'AQA Paper 1' }),
  ],
  'phys-particles': [
    examQ('Explain, in terms of particles, why the pressure of a gas in a sealed container increases when it is heated.', 3, ['The particles gain kinetic energy and move faster (1)', 'They collide with the walls more often (1)', 'and with more force, so the pressure increases (1)'], { meta: 'AQA Paper 1' }),
    examQ('Calculate the energy needed to melt 0.25 kg of ice at 0 °C. (Specific latent heat of fusion of ice = 334 000 J/kg)', 2, ['E = m L = 0.25 × 334 000 (1)', '= 83 500 J (1)'], { meta: 'AQA Paper 1' }),
  ],
  'phys-radiation': [
    examQ('Compare the properties of alpha, beta and gamma radiation.', 6, L6('alpha: helium nucleus, +2 charge, most ionising, stopped by paper or a few cm of air; beta: fast-moving electron, −1 charge, moderately ionising, stopped by a few mm of aluminium; gamma: electromagnetic wave, no charge, least ionising, most penetrating, reduced by thick lead or concrete.', 'comparison'), { meta: 'AQA Paper 1 · 6-mark' }),
    examQ('Explain the difference between contamination and irradiation.', 2, ['Contamination: unwanted presence of radioactive atoms on or in a material/person (1)', 'Irradiation: exposure to radiation from a source outside the object; the object does not become radioactive (1)'], { meta: 'AQA Paper 1' }),
  ],
  'phys-nuclear': [
    examQ('Compare nuclear fission and nuclear fusion.', 4, ['Fission: a large unstable nucleus splits into two smaller nuclei (1)', 'Fusion: two light nuclei join to form a heavier nucleus (1)', 'Both release energy (some mass is converted to energy) (1)', 'Fission is used in nuclear power stations; fusion happens in stars / needs very high temperature and pressure (1)'], { meta: 'AQA Physics Paper 1 · Physics only' }),
  ],

  // ===================== PHYSICS PAPER 2 =====================
  'phys-force-basics': [
    examQ('A person pushes a box with a force of 150 N across a floor for 4.0 m. Calculate the work done and describe what happens to the energy.', 3, ['W = F s = 150 × 4.0 (1)', '= 600 J (1)', 'Energy is transferred to the thermal store of the box and floor (friction) (1)'], { meta: 'AQA Paper 2' }),
  ],
  'phys-elastic': [
    examQ('Describe a method to investigate the relationship between force and extension for a spring.', 6, L6('clamp a spring vertically with a ruler next to it; measure the original length; add masses one at a time (e.g. 100 g = 1 N); measure the new length each time and calculate extension = new length − original length; read the ruler at eye level; repeat and take means; plot force against extension; a straight line through the origin shows they are directly proportional (Hooke\'s law) up to the limit of proportionality; safety: goggles, do not overstretch.', 'method'), { meta: 'AQA Paper 2 · Required practical · 6-mark' }),
    examQ('A spring has a spring constant of 40 N/m. Calculate the force needed to stretch it by 0.15 m and the elastic potential energy stored.', 4, ['F = k e = 40 × 0.15 (1)', '= 6 N (1)', 'Eₑ = ½ k e² = 0.5 × 40 × 0.15² (1)', '= 0.45 J (1)'], { meta: 'AQA Paper 2' }),
  ],
  'phys-motion': [
    examQ('Describe how a velocity-time graph can be used to find (a) the acceleration and (b) the distance travelled.', 2, ['Acceleration = gradient of the graph (1)', 'Distance = area under the graph (1)'], { meta: 'AQA Paper 2' }),
    examQ('Explain why a skydiver reaches a terminal velocity.', 4, ['At first weight is greater than air resistance, so the skydiver accelerates (1)', 'As speed increases, air resistance increases (1)', 'until air resistance equals weight (1)', 'so the resultant force is zero and the skydiver falls at a constant velocity (1)'], { meta: 'AQA Paper 2' }),
  ],
  'phys-newton': [
    examQ('Explain the factors that affect the stopping distance of a car.', 6, L6('stopping distance = thinking distance + braking distance; thinking distance increased by tiredness, alcohol, drugs, distractions (longer reaction time) and higher speed; braking distance increased by higher speed, wet or icy roads, worn tyres, worn brakes, greater mass; at higher speed both distances increase.', 'explanation'), { meta: 'AQA Paper 2 · 6-mark' }),
    examQ('A 1200 kg car travelling at 15 m/s collides with a wall and stops in 0.3 s. Calculate the momentum before the collision and the average force on the car.', 4, ['p = m v = 1200 × 15 = 18 000 kg m/s (1)', 'Change in momentum = 18 000 kg m/s (1)', 'F = change in momentum ÷ time = 18 000 ÷ 0.3 (1)', '= 60 000 N (1)'], { meta: 'AQA Paper 2 (Higher)' }),
  ],
  'phys-wave-props': [
    examQ('Describe the difference between transverse and longitudinal waves, and give an example of each.', 4, ['Transverse: oscillations are perpendicular to the direction of energy transfer (1)', 'Example: light / any EM wave / waves on water / S-waves (1)', 'Longitudinal: oscillations are parallel to the direction of energy transfer (compressions and rarefactions) (1)', 'Example: sound waves / P-waves (1)'], { meta: 'AQA Paper 2' }),
    examQ('Describe how to measure the speed of water waves in a ripple tank.', 6, L6('set up a ripple tank with a signal generator to make waves; use a lamp to project the wave pattern onto a screen; measure the wavelength by measuring across several waves (e.g. 10) and dividing; count the number of waves passing a point in 10 s to find frequency (or read from the generator); speed = frequency × wavelength; repeat and calculate a mean; a strobe can freeze the pattern.', 'method'), { meta: 'AQA Paper 2 · Required practical · 6-mark' }),
  ],
  'phys-em': [
    examQ('Explain why X-rays can be used to make images of bones.', 2, ['X-rays pass easily through soft tissue / flesh (are transmitted) (1)', 'but are absorbed by bone, so bones show up on the image (1)'], { meta: 'AQA Paper 2' }),
    examQ('Explain how radio waves can produce an alternating current in a receiver aerial.', 2, ['Radio waves are absorbed by the aerial (1)', 'causing electrons to oscillate, producing an alternating current with the same frequency as the wave (1)'], { meta: 'AQA Paper 2 (Higher)' }),
  ],
  'phys-light-sound': [
    examQ('Describe the difference between a convex lens and a concave lens, and how each affects parallel rays of light.', 3, ['A convex lens is thicker in the middle / converging (1)', 'It brings parallel rays together at the principal focus (1)', 'A concave lens is thinner in the middle and spreads parallel rays out (diverging) (1)'], { meta: 'AQA Physics Paper 2 · Physics only' }),
  ],
  'phys-magnetism': [
    examQ('Describe how to make an electromagnet and two ways to make it stronger.', 3, ['Wrap a coil of wire (solenoid) around an iron core and pass a current through it (1)', 'Increase the current (1)', 'Increase the number of turns on the coil (1)'], { meta: 'AQA Paper 2' }),
    examQ('A transformer has 200 turns on the primary coil and 50 turns on the secondary coil. The input potential difference is 240 V. Calculate the output potential difference and name the type of transformer.', 3, ['Vs = Vp × Ns ÷ Np = 240 × 50 ÷ 200 (1)', '= 60 V (1)', 'Step-down transformer (1)'], { meta: 'AQA Physics Paper 2 · Physics only (Higher)' }),
  ],
  'phys-space-topic': [
    examQ('Describe the life cycle of a star much more massive than the Sun.', 6, L6('nebula: cloud of dust and gas; gravity pulls it together to form a protostar; temperature rises and nuclear fusion of hydrogen begins; main sequence star – fusion pressure balances gravity; when hydrogen runs out it becomes a red supergiant; fuses heavier elements; explodes as a supernova, forming elements heavier than iron and spreading them through the universe; leaves a neutron star or, if massive enough, a black hole.', 'account'), { meta: 'AQA Physics Paper 2 · Physics only · 6-mark' }),
    examQ('Explain how red-shift provides evidence for the Big Bang theory.', 3, ['Light from distant galaxies is shifted towards the red end of the spectrum / wavelength increased (1)', 'so galaxies are moving away from us, and more distant galaxies are moving away faster (1)', 'This shows the universe is expanding, suggesting it began from a very small, hot, dense region (1)'], { meta: 'AQA Physics Paper 2 · Physics only' }),
  ],
};
