// Extra question formats added across subjects: sort into groups, tap the words, spot the mistake.
// Keyed by topic id; merged into each topic by the registry.
import type { Question } from './types';
import { sort, pick, spot, ord } from './dsl';

export const EXTRA: Record<string, Question[]> = {
  // ---------------- English Language ----------------
  'el-methods': [
    pick('Tap the **two** similes.', 'The fog crept in [[like a slow grey tide]], swallowing the harbour. Gulls hung above the water, silent, and the lighthouse blinked [[as nervously as a cornered animal]].', 'Similes compare using "like" or "as". "Swallowing" is personification, not a simile.', { d: 2 }),
    pick('Tap the **verb** that personifies the wind.', 'All night the wind [[clawed]] at the shutters and the rain drummed on the roof.', '"Clawed" gives the wind an animal/human action. "Drummed" is closer to onomatopoeia and describes the rain.', { d: 2 }),
    sort('Sort these into language or structure.', {
      Language: ['A metaphor in paragraph 2', 'The semantic field of war', 'The adjective "brittle"'],
      Structure: ['A shift in focus from outside to inside', 'A one-line paragraph', 'Ending where the extract began (cyclical)'],
    }, 'Language = word-level choices. Structure = how the whole text is organised: openings, shifts in focus, paragraphing, endings.', { d: 2 }),
  ],
  'el-spag': [
    pick('Tap the word that needs an apostrophe.', 'The [[dogs]] lead was tangled around the lamppost again.', 'The lead belongs to the dog, so it should be "dog\'s".', { d: 2 }),
    spot('Which sentence contains the comma splice?', ['The storm had passed.', 'The streets were quiet, nobody wanted to go out.', 'Although it was late, the café was still open.', 'She waited; the bus never came.'], 1, 'The streets were quiet. Nobody wanted to go out.', 'Two complete sentences joined only by a comma is a comma splice. Use a full stop, a semicolon or a conjunction.', { d: 2 }),
    sort('Sort the words by spelling.', {
      Correct: ['definitely', 'separate', 'necessary', 'business'],
      Incorrect: ['definately', 'seperate', 'neccessary', 'buisness'],
    }, 'These are among the most commonly misspelt words in GCSE writing.', { d: 1 }),
  ],
  'el-p2q5': [
    sort('Sort these openings by purpose.', {
      Argue: ['"It is time we stopped pretending zoos are about conservation."', '"Homework should be scrapped - and here is why."'],
      Describe: ['"The station hummed with a thousand small arrivals."', '"Frost had stitched the field into a stiff white sheet."'],
    }, 'Argue = a clear viewpoint from the first line. Describe = sensory detail and imagery.', { d: 1 }),
  ],

  // ---------------- English Literature ----------------
  'lit-terms': [
    sort('Sort the terms: language, form or structure?', {
      Language: ['Imagery', 'Semantic field', 'Pathetic fallacy'],
      Form: ['Sonnet', 'Dramatic monologue', 'Tragedy'],
      Structure: ['Enjambment', 'Volta', 'Cyclical ending'],
    }, 'Form = the type of text. Structure = how it is arranged and develops. Language = word choices and images.', { d: 3 }),
  ],
  'mac-themes': [
    sort('Who says it?', {
      Macbeth: ['"Is this a dagger which I see before me"', '"I have supped full with horrors"', '"full of scorpions is my mind"'],
      'Lady Macbeth': ['"unsex me here"', '"look like th\' innocent flower, / But be the serpent under\'t"', '"Out, damned spot!"'],
    }, 'Learn who says each key quote - examiners expect you to attribute evidence correctly.', { d: 2 }),
  ],
  'acc-themes': [
    sort('Sort the moments by stave.', {
      'Stave 1': ['Scrooge refuses to give to the charity collectors', 'Marley\'s ghost appears'],
      'Stave 3': ['The Cratchits\' Christmas dinner', 'Ignorance and Want'],
      'Stave 5': ['Scrooge buys the prize turkey', 'Scrooge raises Bob\'s salary'],
    }, 'Knowing where moments fall helps you track Scrooge\'s transformation across the novella.', { d: 2 }),
  ],
  'aic-themes': [
    sort('Sort by the character it describes.', {
      'Mr Birling': ['"a hard-headed, practical man of business"', 'Dismisses the Titanic as "unsinkable"'],
      Sheila: ['"I\'ll never, never do it again"', 'Changes most and sides with the Inspector'],
      'Mrs Birling': ['Refuses Eva help at the charity committee', 'Blames "the father of the child"'],
    }, 'Priestley contrasts the older Birlings, who refuse to change, with Sheila and Eric, who accept responsibility.', { d: 2 }),
  ],

  // ---------------- Maths ----------------
  'm-alg-equations': [
    spot('Find the mistake in this solution of 3x + 5 = 20.', ['3x + 5 = 20', '3x = 25', 'x = 25 ÷ 3', 'x = 8.33'], 1, '3x = 15', 'Subtracting 5 from both sides gives 3x = 15, so x = 5. Adding instead of subtracting is a very common slip.', { d: 2 }),
    spot('Find the mistake in solving 2(x − 3) = 10.', ['2(x − 3) = 10', '2x − 3 = 10', '2x = 13', 'x = 6.5'], 1, '2x − 6 = 10', 'Multiply BOTH terms in the bracket: 2 × −3 = −6. Then 2x = 16, x = 8.', { d: 2 }),
  ],
  'm-alg-quad-expand': [
    spot('Find the mistake in expanding (x + 4)².', ['(x + 4)² = (x + 4)(x + 4)', '= x² + 4x + 4x + 16', '= x² + 8x + 8'], 2, '= x² + 8x + 16', '4 × 4 = 16, not 8. (x + 4)² = x² + 8x + 16.', { d: 2 }),
  ],
  'm-num-percent': [
    spot('A £60 jumper is reduced by 15%. Find the mistake.', ['15% of 60 = 0.15 × 60', '= 9', 'New price = 60 + 9', '= £69'], 2, 'New price = 60 − 9 = £51', 'A reduction means subtract. Or use a multiplier: 60 × 0.85 = £51.', { d: 1 }),
    sort('Sort the multipliers.', {
      Increase: ['× 1.2', '× 1.05', '× 1.175'],
      Decrease: ['× 0.8', '× 0.95', '× 0.35'],
    }, 'A multiplier above 1 increases; below 1 decreases. × 0.35 is a 65% decrease.', { d: 2 }),
  ],
  'm-geo-pythag': [
    spot('Find the hypotenuse when the shorter sides are 6 cm and 8 cm. Find the mistake.', ['c² = a² + b²', 'c² = 6² + 8²', 'c² = 12 + 16 = 28', 'c = √28 = 5.29 cm'], 2, 'c² = 36 + 64 = 100, so c = 10 cm', '6² means 6 × 6 = 36, not 6 × 2. Also check: the hypotenuse must be the longest side - 5.29 is shorter than 8, a warning sign.', { d: 2 }),
  ],
  'm-geo-angles': [
    sort('Sort the angle facts.', {
      'Equal angles': ['Alternate angles', 'Corresponding angles', 'Vertically opposite angles'],
      'Add to 180°': ['Co-interior (allied) angles', 'Angles on a straight line', 'Angles in a triangle'],
    }, 'Give the correct reason name in exams - "Z angles" and "F angles" do not get the mark.', { d: 2 }),
  ],
  'm-prob-basics': [
    spot('A bag has 3 red and 5 blue counters. Find the mistake.', ['Total counters = 3 + 5 = 8', 'P(red) = 3/8', 'P(not red) = 1 − 3/8', 'P(not red) = 3/5'], 3, 'P(not red) = 5/8', '1 − 3/8 = 5/8. The denominator stays as the total number of counters.', { d: 1 }),
  ],
  'm-stat-averages': [
    spot('Find the median of 7, 2, 9, 4, 5. Find the mistake.', ['Values: 7, 2, 9, 4, 5', 'Middle value of the list is 9', 'Median = 9'], 1, 'Order first: 2, 4, 5, 7, 9 - the middle value is 5', 'Always put the data in order before finding the median.', { d: 1 }),
  ],
  'm-num-indices': [
    sort('True or false? Sort them.', {
      True: ['a³ × a⁴ = a⁷', '(a²)³ = a⁶', 'a⁰ = 1', 'a⁻¹ = 1/a'],
      False: ['a³ × a⁴ = a¹²', '(a²)³ = a⁵', 'a⁰ = 0', 'a⁻¹ = −a'],
    }, 'Multiply → add powers. Power of a power → multiply. Anything to the power 0 is 1. Negative power → reciprocal.', { d: 2 }),
  ],

  // ---------------- Biology ----------------
  'bio-cells': [
    sort('Sort the cell parts.', {
      'Animal and plant cells': ['Nucleus', 'Cell membrane', 'Mitochondria', 'Ribosomes'],
      'Plant cells only': ['Cell wall', 'Chloroplasts', 'Permanent vacuole'],
    }, 'Plant cells have everything animal cells have, plus a cellulose cell wall, chloroplasts and a permanent vacuole.', { d: 1 }),
    sort('Prokaryotic or eukaryotic?', {
      Prokaryotic: ['Bacterium', 'Has plasmids', 'DNA in a single loop'],
      Eukaryotic: ['Human cheek cell', 'Yeast', 'DNA inside a nucleus'],
    }, 'Prokaryotes (bacteria) have no nucleus; their DNA is a single loop plus plasmids.', { d: 2 }),
  ],
  'bio-transport': [
    sort('Which process?', {
      Diffusion: ['Oxygen moving into the blood in the lungs', 'Carbon dioxide entering a leaf'],
      Osmosis: ['Water entering a root hair cell', 'Plant cell becoming turgid'],
      'Active transport': ['Mineral ions into root hair cells', 'Glucose absorbed from the gut when its concentration is low'],
    }, 'Active transport needs energy from respiration and moves substances against a concentration gradient.', { d: 2 }),
  ],
  'bio-pathogens': [
    sort('Sort the diseases by pathogen.', {
      Virus: ['Measles', 'HIV', 'Tobacco mosaic virus'],
      Bacterium: ['Salmonella', 'Gonorrhoea'],
      'Fungus or protist': ['Rose black spot', 'Malaria'],
    }, 'Rose black spot is a fungus; malaria is a protist carried by mosquitoes.', { d: 2 }),
  ],
  'bio-photosynthesis': [
    spot('Find the mistake in this photosynthesis description.', ['Photosynthesis takes place in chloroplasts.', 'It is an exothermic reaction.', 'Carbon dioxide + water → glucose + oxygen', 'Light is needed as the energy source.'], 1, 'It is an endothermic reaction - energy is taken in from light.', 'Photosynthesis absorbs light energy, so it is endothermic. Respiration is exothermic.', { d: 2 }),
  ],
  'bio-nervous': [
    ord('Put the reflex arc in order.', ['Stimulus', 'Receptor', 'Sensory neurone', 'Relay neurone', 'Motor neurone', 'Effector', 'Response'] , 'The relay neurone is in the spinal cord - the brain is bypassed, which makes reflexes fast.', { d: 2 }),
  ],

  // ---------------- Chemistry ----------------
  'chem-bonding': [
    sort('Sort by type of bonding.', {
      Ionic: ['Sodium chloride', 'Magnesium oxide'],
      Covalent: ['Water', 'Methane', 'Diamond'],
      Metallic: ['Copper', 'Iron'],
    }, 'Metal + non-metal → ionic. Non-metals only → covalent. Metals only → metallic.', { d: 2 }),
  ],
  'chem-periodic': [
    sort('Sort the elements into their groups.', {
      'Group 1': ['Lithium', 'Sodium', 'Potassium'],
      'Group 7': ['Fluorine', 'Chlorine', 'Bromine'],
      'Group 0': ['Helium', 'Neon', 'Argon'],
    }, 'Use the periodic table in the toolbar to check. Group 1 = alkali metals, Group 7 = halogens, Group 0 = noble gases.', { d: 1 }),
  ],
  'chem-moles': [
    spot('Find the mistake: number of moles in 22 g of CO₂ (C = 12, O = 16).', ['Mr of CO₂ = 12 + 16', '= 28', 'moles = mass ÷ Mr = 22 ÷ 28', '= 0.79 mol'], 0, 'Mr of CO₂ = 12 + (2 × 16) = 44, so moles = 22 ÷ 44 = 0.5 mol', 'The subscript 2 means two oxygen atoms. Always multiply each Ar by the number of atoms.', { d: 2 }),
  ],
  'chem-tests': [
    sort('Match each test to its gas.', {
      Hydrogen: ['Squeaky pop with a lighted splint'],
      Oxygen: ['Relights a glowing splint'],
      'Carbon dioxide': ['Turns limewater milky'],
      Chlorine: ['Bleaches damp litmus paper white'],
    }, 'These four gas tests come up almost every year.', { d: 1 }),
  ],
  'chem-energychanges': [
    sort('Exothermic or endothermic?', {
      Exothermic: ['Combustion', 'Neutralisation', 'Respiration', 'Hand warmers'],
      Endothermic: ['Thermal decomposition', 'Photosynthesis', 'Sports injury cold packs'],
    }, 'Exothermic reactions give out energy (temperature rises); endothermic take it in (temperature falls).', { d: 2 }),
  ],

  // ---------------- Physics ----------------
  'phys-stores': [
    spot('A 2 kg ball moves at 3 m/s. Find the mistake in the kinetic energy.', ['Eₖ = ½mv²', 'Eₖ = 0.5 × 2 × 3', 'Eₖ = 3 J'], 1, 'Eₖ = 0.5 × 2 × 3² = 9 J', 'The speed must be squared: 3² = 9.', { d: 2 }),
    sort('Sort into scalar or vector.', {
      Scalar: ['Speed', 'Distance', 'Mass', 'Energy'],
      Vector: ['Velocity', 'Displacement', 'Force', 'Weight'],
    }, 'Vectors have a direction as well as a size.', { d: 1 }),
  ],
  'phys-resources': [
    sort('Renewable or non-renewable?', {
      Renewable: ['Wind', 'Solar', 'Hydroelectric', 'Geothermal', 'Bio-fuel'],
      'Non-renewable': ['Coal', 'Oil', 'Natural gas', 'Nuclear fuel'],
    }, 'Renewable resources are replenished as they are used. Nuclear fuel (uranium) will run out.', { d: 1 }),
  ],
  'phys-circuits': [
    spot('Two 6 Ω resistors are in series with a 12 V battery. Find the mistake.', ['Total resistance = 6 + 6 = 12 Ω', 'I = V ÷ R', 'I = 12 × 12', 'I = 144 A'], 2, 'I = 12 ÷ 12 = 1 A', 'V = IR rearranges to I = V ÷ R. 144 A would melt the wires - always sense-check.', { d: 2 }),
  ],
  'phys-em': [
    ord('Order the electromagnetic spectrum from longest to shortest wavelength.', ['Radio waves', 'Microwaves', 'Infrared', 'Visible light', 'Ultraviolet', 'X-rays', 'Gamma rays'], '"Rich Men In Vegas Use eXpensive Gadgets". Frequency and energy increase in the same order.', { d: 2 }),
  ],
  'phys-radiation': [
    sort('Sort the properties.', {
      Alpha: ['Stopped by paper', 'Most ionising', 'A helium nucleus'],
      Beta: ['Stopped by a few mm of aluminium', 'A fast electron'],
      Gamma: ['Reduced by thick lead', 'An electromagnetic wave'],
    }, 'Penetration increases alpha → beta → gamma; ionising power decreases in the same order.', { d: 2 }),
  ],

  // ---------------- Business ----------------
  'bus-costs': [
    sort('Fixed or variable costs?', {
      Fixed: ['Rent', 'Salaries', 'Insurance', 'Loan repayments'],
      Variable: ['Raw materials', 'Packaging', 'Hourly wages for production', 'Delivery costs per order'],
    }, 'Fixed costs do not change with output; variable costs rise as output rises.', { d: 1 }),
    spot('Find the mistake: price £5, variable cost £3, fixed costs £1,000.', ['Contribution per unit = 5 − 3 = £2', 'Break-even = fixed costs ÷ contribution', '= 1,000 ÷ 5', '= 200 units'], 2, '= 1,000 ÷ 2 = 500 units', 'Divide by the contribution per unit, not the selling price.', { d: 2 }),
  ],
  'bus-sources': [
    sort('Internal or external source of finance?', {
      Internal: ['Retained profit', 'Selling assets', "Owner's savings"],
      External: ['Bank loan', 'Overdraft', 'Crowdfunding', 'Share issue'],
    }, 'Internal finance comes from within the business; external comes from outside it.', { d: 1 }),
  ],
  'bus-stakeholders': [
    sort('Internal or external stakeholder?', {
      Internal: ['Employees', 'Managers', 'Owners/shareholders'],
      External: ['Customers', 'Suppliers', 'Local community', 'Government'],
    }, 'Internal stakeholders are inside the business; external ones are affected from outside.', { d: 1 }),
  ],
  'bus-research': [
    sort('Primary or secondary research?', {
      Primary: ['Questionnaire', 'Focus group', 'Observation', 'Interview'],
      Secondary: ['Government statistics', 'Newspaper articles', 'Competitor websites', 'Market research reports'],
    }, 'Primary research is collected first-hand for a specific purpose; secondary already exists.', { d: 1 }),
  ],

  // ---------------- iMedia ----------------
  'im-files': [
    sort('Sort the file formats.', {
      Image: ['JPG', 'PNG', 'TIFF'],
      Audio: ['MP3', 'WAV', 'AAC'],
      Video: ['MP4', 'MOV', 'AVI'],
    }, 'Know at least two formats for each type, and whether they are lossy or lossless.', { d: 1 }),
    sort('Lossy or lossless?', {
      Lossy: ['JPG', 'MP3', 'MP4 (H.264)'],
      Lossless: ['PNG', 'WAV', 'TIFF'],
    }, 'Lossy compression removes data permanently to make files smaller; lossless keeps every bit.', { d: 2 }),
  ],
  'im-legal': [
    sort('Which law or regulation?', {
      Copyright: ['Using a song in your video without permission', 'Copying a photographer\'s image'],
      'Data protection': ['Storing customers\' email addresses', 'Collecting names in a survey'],
      Privacy: ['Filming people in their homes without consent'],
    }, 'Copyright protects creative work; the Data Protection Act / UK GDPR protects personal data.', { d: 2 }),
  ],

  // ---------------- History ----------------
  'ed-med-medieval': [
    sort('Natural or supernatural explanation of disease?', {
      Natural: ['Imbalance of the Four Humours', 'Miasma (bad air)', 'Theory of Opposites'],
      Supernatural: ['Punishment from God for sin', 'Movement of the planets (astrology)'],
    }, 'Medieval people mixed natural and supernatural ideas - the Church supported both Galen and religious explanations.', { d: 2 }),
  ],
  'aqa-med-medieval': [
    sort('Natural or supernatural explanation of disease?', {
      Natural: ['Imbalance of the Four Humours', 'Miasma (bad air)', 'Theory of Opposites'],
      Supernatural: ['Punishment from God for sin', 'Movement of the planets (astrology)'],
    }, 'Medieval people mixed natural and supernatural ideas - the Church supported both Galen and religious explanations.', { d: 2 }),
  ],
  'hist-ed-technique': [
    pick('Tap the **provenance** details you would use to judge this source\'s utility.', 'A [[poster]] produced by the [[Nazi Propaganda Ministry]] in [[1936]], showing a smiling family in front of a new house.', 'Provenance = nature (poster), origin (who made it), purpose and date. These tell you why it may be one-sided but useful for showing what the Nazis wanted people to believe.', { d: 3 }),
  ],
  'aqa-ger-weimar': [
    sort('Sort the events by year.', {
      '1919': ['Treaty of Versailles signed', 'Spartacist Uprising'],
      '1923': ['Hyperinflation peaks', 'Munich Putsch', 'Ruhr occupied'],
      '1924-29': ['Dawes Plan', 'Locarno Pact', 'Young Plan'],
    }, 'Weimar\'s years: crisis (1919-23), recovery under Stresemann (1924-29), then the Depression.', { d: 3 }),
  ],
  'ed-ger-weimar': [
    sort('Sort the events by year.', {
      '1919': ['Treaty of Versailles signed', 'Spartacist Uprising'],
      '1923': ['Hyperinflation peaks', 'Munich Putsch', 'Ruhr occupied'],
      '1924-29': ['Dawes Plan', 'Locarno Pact', 'Young Plan'],
    }, 'Weimar\'s years: crisis (1919-23), recovery under Stresemann (1924-29), then the Depression.', { d: 3 }),
  ],

  // ---------------- Statistics ----------------
  'st-planning': [
    sort('Sort the data types.', {
      'Qualitative': ['Eye colour', 'Favourite sport', 'Type of car'],
      'Discrete': ['Number of siblings', 'Goals scored', 'Shoe size'],
      'Continuous': ['Height', 'Time to run 100 m', 'Mass'],
    }, 'Discrete data takes exact values (counted); continuous data can take any value in a range (measured). Shoe size is discrete - it only takes set values.', { d: 2 }),
  ],
  'st-sampling': [
    spot('A school has 600 boys and 400 girls. Find the mistake in a stratified sample of 50.', ['Total = 1000', 'Boys: 600 ÷ 1000 × 50 = 30', 'Girls: 400 ÷ 600 × 50 = 33', 'Sample = 30 boys and 33 girls'], 2, 'Girls: 400 ÷ 1000 × 50 = 20', 'Each stratum is divided by the TOTAL population. Check: 30 + 20 = 50.', { d: 2 }),
  ],
  'st-correlation': [
    sort('Sort by type of correlation.', {
      Positive: ['Height and shoe size', 'Hours revised and test score'],
      Negative: ['Age of a car and its value', 'Temperature and hot drink sales'],
      None: ['Shoe size and IQ', 'House number and height'],
    }, 'Correlation does not prove causation - but it does describe the pattern.', { d: 1 }),
  ],
};
