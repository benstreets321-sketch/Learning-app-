import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, txt, topic, examQ, ord, match, cloze } from '../../dsl';

const SIX = (points: string[]) => [
  'Level 3 (5-6): detailed, coherent, logically linked explanation using correct scientific terms',
  'Level 2 (3-4): several relevant points with some linking',
  'Level 1 (1-2): simple relevant statements',
  ...points,
];

export const bioPaper1: Unit[] = [
  {
    id: 'bio-cell', title: 'Cell biology', description: 'Paper 1 · cell structure, division, transport and microscopy.',
    topics: [
      topic({
        id: 'bio-cells', title: 'Cell structure and microscopy', summary: 'Eukaryotic vs prokaryotic cells, organelles, specialised cells, microscopes and magnification.', tags: ['Required practical'],
        notes: `
## Eukaryotic cells (animal and plant)
| Part | Function | Animal | Plant |
|---|---|---|---|
| Nucleus | Contains genetic material (DNA), controls the cell | ✓ | ✓ |
| Cytoplasm | Where most chemical reactions happen (enzymes) | ✓ | ✓ |
| Cell membrane | Controls what enters and leaves | ✓ | ✓ |
| Mitochondria | Site of **aerobic respiration** - releases energy | ✓ | ✓ |
| Ribosomes | **Protein synthesis** | ✓ | ✓ |
| Chloroplasts | **Photosynthesis** (contain chlorophyll) | ✗ | ✓ |
| Cell wall (cellulose) | Strengthens and supports | ✗ | ✓ |
| Permanent vacuole | Filled with cell sap; keeps the cell rigid | ✗ | ✓ |

## Prokaryotic cells (bacteria)
Much smaller; **no nucleus** - DNA is a single loop in the cytoplasm, plus small rings called **plasmids**. Have a cell wall (not cellulose), may have a flagellum.

## Specialised cells
| Cell | Adaptation |
|---|---|
| Sperm | Tail to swim; many mitochondria; acrosome with enzymes |
| Nerve | Long axon; branched dendrites to connect |
| Muscle | Many mitochondria; protein fibres that contract |
| Root hair | Large surface area for water/mineral absorption; no chloroplasts |
| Xylem | Dead cells, hollow tubes, lignin-strengthened - carry water |
| Phloem | Sieve plates; companion cells provide energy - carry sugars |

**Differentiation**: cells become specialised. Most animal cells differentiate early; many plant cells can differentiate throughout life.

## Microscopy
- **Light microscope**: cheap, living cells, magnification up to ~×2000.
- **Electron microscope**: much higher **magnification and resolution** (see ribosomes, mitochondria detail) - but expensive and specimens must be dead.
- **Magnification = image size ÷ real size** (learn - not on any sheet).
- Units: 1 mm = 1000 µm; 1 µm = 1000 nm.

:::exam Required practical: using a light microscope
Place a thin specimen on a slide, add stain (e.g. iodine for onion cells), add a coverslip at an angle (avoid air bubbles). Start on the lowest power objective, focus with the coarse then fine focus. Draw clear labelled lines, no shading; include magnification.
:::
`,
        keyPoints: ['Animal: nucleus, cytoplasm, membrane, mitochondria, ribosomes', 'Plants also: chloroplasts, cellulose cell wall, permanent vacuole', 'Bacteria: no nucleus, DNA loop + plasmids', 'Specialised cells are adapted to their function', 'Electron microscopes: higher magnification and resolution', 'Magnification = image ÷ real (same units!)'],
        generators: ['b-magnification', 'b-sf'],
        misconceptions: [{ wrong: 'Plant cells don\'t have mitochondria because they photosynthesise.', right: 'Plant cells DO have mitochondria - they respire too.' }, { wrong: 'Bacteria have a nucleus.', right: 'Prokaryotes have no nucleus - their DNA is free in the cytoplasm.' }],
        flashcards: cards([['Function of mitochondria?', 'Site of aerobic respiration - releasing energy.'], ['Function of ribosomes?', 'Protein synthesis.'], ['Three structures only in plant cells?', 'Chloroplasts, cellulose cell wall, permanent vacuole.'], ['What are plasmids?', 'Small rings of DNA found in bacterial (prokaryotic) cells.'], ['Magnification formula?', 'magnification = image size ÷ real size'], ['1 mm = ? µm', '1000 µm'], ['Advantage of electron microscopes?', 'Higher magnification and resolution - can see subcellular structures.'], ['What is differentiation?', 'The process by which cells become specialised.']]),
        questions: [
          mc('Which structure is found in plant cells but NOT animal cells?', ['Chloroplast', 'Mitochondrion', 'Ribosome', 'Cell membrane'], 'Chloroplasts carry out photosynthesis.', { d: 1 }),
          mc('Where is the genetic material in a bacterial cell?', ['A single DNA loop in the cytoplasm, plus plasmids', 'In a nucleus surrounded by a nuclear membrane', 'In the mitochondria and the chloroplasts', 'Stored in the cell wall, with no plasmids'], 'Prokaryotes have no nucleus.', { d: 2 }),
          match('Match the specialised cell to an adaptation.', [['Sperm cell', 'Tail for swimming'], ['Root hair cell', 'Large surface area'], ['Nerve cell', 'Long axon'], ['Muscle cell', 'Many mitochondria and contractile fibres']], 'Structure fits function.', { d: 2 }),
          num('An image is 25 mm long. The real object is 0.05 mm. What is the magnification?', 500, '25 ÷ 0.05 = ×500.', { d: 2, unit: '×' }),
          tf('Electron microscopes can be used to look at living cells.', false, 'Specimens must be dead (prepared in a vacuum).', { d: 2 }),
          multi('Which are good practice when drawing from a microscope?', ['Use clear, unbroken lines', 'Label with straight ruled lines', 'Include the magnification'], ['Shade the cells in', 'Draw every cell in the field of view'], 'Biological drawings must be clear and labelled.', { d: 2 }),
        ],
        examQuestions: [examQ('Describe how you would prepare a slide of onion cells and use a light microscope to observe them.', 6, SIX(['Peel thin layer of onion epidermis with forceps', 'Place on slide, add a drop of iodine stain', 'Lower coverslip at an angle with a mounted needle to avoid air bubbles', 'Start with lowest power objective lens', 'Use coarse focus then fine focus', 'Increase magnification and refocus']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
      topic({
        id: 'bio-division', title: 'Cell division and stem cells', summary: 'Chromosomes, the cell cycle and mitosis, stem cells and their uses.',
        notes: `
## Chromosomes
The nucleus contains **chromosomes** made of **DNA**; genes are sections of DNA. Body cells have chromosomes in **pairs** (46 in humans = 23 pairs).

## The cell cycle
1. **Growth**: cell grows, more subcellular structures (ribosomes, mitochondria) are made; **DNA replicates** (chromosomes copy).
2. **Mitosis**: one set of chromosomes pulled to each end; nucleus divides.
3. **Cytokinesis**: cytoplasm and membrane divide → **two identical daughter cells**.

Mitosis is for **growth, repair** and **asexual reproduction**.

## Stem cells
Undifferentiated cells that can divide and become other types of cell.
| Source | Can become |
|---|---|
| **Embryonic** stem cells | Almost any cell type |
| **Adult** stem cells (bone marrow) | Limited types (e.g. blood cells) |
| **Meristem** (plant tips) | Any plant cell, throughout life |

- **Uses**: treating diabetes, paralysis; **therapeutic cloning** (embryo with the patient's own genes → no rejection). Plant meristems clone rare plants or crops.
- **Issues**: ethical/religious objections to using embryos; risk of transferring viral infection; cells may become cancerous.
`,
        keyPoints: ['Humans: 46 chromosomes (23 pairs)', 'Cell cycle: growth + DNA copying → mitosis → cytokinesis', 'Mitosis makes two identical cells (growth, repair)', 'Embryonic stem cells can become any cell', 'Adult bone marrow stem cells: limited types', 'Meristems in plants', 'Therapeutic cloning avoids rejection'],
        flashcards: cards([['What is a gene?', 'A small section of DNA on a chromosome that codes for a protein.'], ['Purpose of mitosis?', 'Growth, repair and asexual reproduction.'], ['What is a stem cell?', 'An undifferentiated cell that can divide and differentiate into other cell types.'], ['Where are plant stem cells found?', 'Meristem tissue (root and shoot tips).'], ['What is therapeutic cloning?', 'Producing an embryo with the same genes as the patient so its stem cells won\'t be rejected.']]),
        questions: [
          ord('Put the stages of the cell cycle in order.', ['Cell grows and DNA replicates', 'Chromosomes are pulled to each end of the cell', 'Nucleus divides', 'Cytoplasm and membrane divide to form two cells'], 'Growth → mitosis → cytokinesis.', { d: 2 }),
          mc('How do the two cells produced by mitosis compare to the parent cell?', ['Genetically identical', 'Half the chromosomes', 'Genetically different', 'Twice the chromosomes'], 'Mitosis produces identical diploid cells.', { d: 1 }),
          mc('Which is an advantage of therapeutic cloning?', ['Stem cells won\'t be rejected by the patient', 'It is cheap and quick', 'There are no ethical issues', 'It uses adult cells only'], 'The cells have the patient\'s own genes.', { d: 2 }),
          tf('Adult stem cells from bone marrow can form any type of human cell.', false, 'Adult stem cells can only form a limited range (e.g. blood cells).', { d: 2 }),
        ],
        examQuestions: [examQ('Evaluate the use of embryonic stem cells to treat medical conditions.', 6, SIX(['Can differentiate into any cell type - could treat diabetes, paralysis', 'Therapeutic cloning reduces rejection', 'Ethical/religious objections - embryo destroyed / potential life', 'Risk of viral infection transfer', 'Risk of uncontrolled division (cancer)', 'Reasoned conclusion']), { meta: '6-mark evaluate', time: 7 })],
      }),
      topic({
        id: 'bio-transport', title: 'Diffusion, osmosis and active transport', summary: 'How substances move in and out of cells, and surface area to volume ratio.', tags: ['Required practical'],
        notes: `
| Process | Movement | Energy? | Example |
|---|---|---|---|
| **Diffusion** | Particles from **high → low concentration** | No (passive) | O₂ into blood in lungs; CO₂ into leaves; urea from cells to blood |
| **Osmosis** | **Water** from a **dilute** to a **more concentrated** solution through a **partially permeable membrane** | No | Water into root hair cells |
| **Active transport** | Substances from **low → high** concentration (against the gradient) | **Yes** - energy from respiration | Mineral ions into root hairs; glucose into gut cells |

**Rate of diffusion increases with**: a bigger concentration gradient, higher temperature, larger surface area.

## Surface area : volume
Larger organisms have a **smaller SA:V ratio**, so they need exchange surfaces and transport systems. Good exchange surfaces have: a **large surface area**, **thin** membrane (short diffusion path), **good blood supply** and **ventilation** (keeps gradient steep). E.g. alveoli, villi, gills, leaves.

:::exam Required practical: osmosis in potato
Cut equal potato cylinders, record mass, place in sugar solutions of different concentrations for the same time, blot dry, re-weigh, calculate **% change in mass**. Plot % change against concentration; where the line crosses zero = concentration equal to the potato's cell sap.
- Independent: sugar concentration. Dependent: % change in mass. Control: size, time, temperature, potato type.
:::
`,
        keyPoints: ['Diffusion: high → low, passive', 'Osmosis: water, dilute → concentrated, partially permeable membrane', 'Active transport: low → high, needs energy', 'Factors: concentration gradient, temperature, surface area', 'Exchange surfaces: large area, thin, blood supply, ventilation', 'Osmosis practical: % change in mass'],
        generators: ['b-pct-change'],
        misconceptions: [{ wrong: 'In osmosis, the sugar moves into the cell.', right: 'Only WATER moves in osmosis; the solute can\'t cross the membrane.' }],
        flashcards: cards([['Define diffusion', 'The net movement of particles from an area of higher concentration to an area of lower concentration.'], ['Define osmosis', 'The diffusion of water from a dilute solution to a more concentrated solution through a partially permeable membrane.'], ['Define active transport', 'Movement of substances from a dilute to a more concentrated solution (against the gradient), using energy from respiration.'], ['Four features of a good exchange surface?', 'Large surface area, thin membrane, good blood supply, ventilated.']]),
        questions: [
          mc('Which process needs energy from respiration?', ['Active transport', 'Diffusion', 'Osmosis', 'All of them'], 'Active transport moves substances against a concentration gradient.', { d: 1 }),
          mc('A potato cylinder gains mass in a sugar solution. What does this tell you?', ['The solution was more dilute than the cell sap', 'The solution was more concentrated', 'Sugar moved into the potato', 'Active transport occurred'], 'Water moved in by osmosis from the more dilute solution.', { d: 3 }),
          cloze('Root hair cells absorb mineral ions by {{active transport}} because the concentration of ions in the soil is {{lower}} than inside the cell.', 'Moving against the gradient needs energy.', { d: 3 }),
          num('A potato piece goes from 2.50 g to 2.20 g. Calculate the percentage change in mass.', -12, '(2.20 − 2.50) ÷ 2.50 × 100 = −12%.', { d: 3, unit: '%' }),
          tf('A larger organism has a larger surface area to volume ratio.', false, 'SA:V decreases as size increases - so large organisms need specialised exchange surfaces.', { d: 3 }),
        ],
        examQuestions: [examQ('Describe how you would investigate the effect of sugar concentration on the mass of potato cylinders.', 6, SIX(['Cut cylinders of equal length/diameter with a cork borer', 'Measure initial mass with a balance', 'Place in a range of sugar concentrations (e.g. 0-1.0 M)', 'Leave for the same time at the same temperature', 'Blot dry and reweigh', 'Calculate % change in mass; repeat and find mean']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
      topic({
        id: 'bio-microbes', title: 'Culturing microorganisms', summary: 'Binary fission, aseptic technique and the antibiotic disc practical (Biology only).', tags: ['Required practical', 'Biology only'],
        notes: `
- Bacteria reproduce by **binary fission** - as often as every 20 minutes in good conditions.
- Number of bacteria = initial × 2^(number of divisions). Use standard form for big answers.
- Grown in **nutrient broth** or on **agar gel** plates.

## Aseptic technique
- Sterilise Petri dishes and agar before use (autoclave) - kills unwanted microbes.
- Pass the **inoculating loop through a flame**.
- Lift the lid only slightly; **tape the lid** (not all the way round) and store **upside down** (condensation doesn't drop on the culture).
- Incubate at **25°C** in school labs (reduces the chance of growing human pathogens).

## Required practical: effect of antiseptics/antibiotics
Spread bacteria on agar, add paper discs soaked in different antiseptics (and a control disc soaked in sterile water). After incubation measure the **clear zone (zone of inhibition)**.
- Area of clear zone = **πr²**. Bigger zone = more effective.
`,
        keyPoints: ['Binary fission: bacteria double each generation', 'Aseptic technique prevents contamination', 'Incubate at 25°C in schools', 'Tape lid, store upside down', 'Zone of inhibition area = πr²', 'Use a control disc'],
        flashcards: cards([['How do bacteria reproduce?', 'Binary fission - splitting into two.'], ['Why incubate at 25°C in schools?', 'To reduce the chance of growing pathogens harmful to humans.'], ['Why pass the inoculating loop through a flame?', 'To sterilise it and kill unwanted microorganisms.'], ['How do you calculate the area of a clear zone?', 'πr² (measure the diameter and halve it).']]),
        questions: [
          num('A bacterium divides every 20 minutes. How many bacteria after 2 hours, starting from one?', 64, '6 divisions: 2⁶ = 64.', { d: 3 }),
          mc('Why is the Petri dish lid taped but not sealed all the way round?', ['So oxygen can get in and anaerobic pathogens don\'t grow', 'So the lid cannot fall off when the dish is turned over', 'So that the lid can be opened easily to check growth', 'So the dish stays warm enough for bacteria to grow'], 'Sealing could encourage harmful anaerobic bacteria.', { d: 3 }),
          num('A clear zone has a diameter of 12 mm. Calculate its area to the nearest mm².', 113, 'r = 6: π × 36 = 113.1 mm².', { d: 3, unit: 'mm²', tol: 0.5 }),
        ],
      }),
    ],
  },
  {
    id: 'bio-org', title: 'Organisation', description: 'Paper 1 · digestion, the heart and blood, disease and plant organs.',
    topics: [
      topic({
        id: 'bio-digestion', title: 'Digestion and enzymes', summary: 'Levels of organisation, the digestive system, enzymes and food tests.', tags: ['Required practical'],
        notes: `
**Cells → tissues → organs → organ systems → organism.**

## Enzymes
Biological **catalysts** (proteins) that speed up reactions. Each has an **active site** with a specific shape - **lock and key**: only the matching **substrate** fits.
- Too hot or wrong pH → active site changes shape → **denatured** (substrate no longer fits).
- Optimum temperature ~37°C for human enzymes.

| Enzyme | Breaks down | Into | Made in |
|---|---|---|---|
| **Amylase** (carbohydrase) | Starch | Sugars (maltose) | Salivary glands, pancreas, small intestine |
| **Protease** (e.g. pepsin) | Proteins | Amino acids | Stomach, pancreas, small intestine |
| **Lipase** | Lipids (fats) | Fatty acids + glycerol | Pancreas, small intestine |

**Bile** (made in the liver, stored in the gall bladder): **neutralises stomach acid** (alkaline) and **emulsifies fats** (bigger surface area for lipase).

## Food tests (required practical)
| Test | Reagent | Positive result |
|---|---|---|
| Starch | Iodine | Orange → **blue-black** |
| Reducing sugar | Benedict's + heat | Blue → **brick red** (green/yellow for less) |
| Protein | Biuret | Blue → **purple** |
| Lipids | Ethanol (or Sudan III) | **Cloudy white emulsion** (red layer) |

## Required practical: effect of pH on amylase
Mix amylase + starch at different pH buffers; take a drop every 30 s onto iodine in a spotting tile; record time until iodine stays orange (no starch left). Rate = 1/time.
`,
        keyPoints: ['Enzymes are biological catalysts (proteins)', 'Lock and key: substrate fits active site', 'Denatured = active site changes shape', 'Amylase: starch → sugars; protease: proteins → amino acids; lipase: lipids → fatty acids + glycerol', 'Bile neutralises acid and emulsifies fats', 'Food tests: iodine, Benedict\'s, Biuret, ethanol'],
        generators: ['b-rate'],
        misconceptions: [{ wrong: 'Enzymes are killed at high temperatures.', right: 'Enzymes aren\'t alive - they are DENATURED (the active site changes shape).' }],
        flashcards: cards([['What is an enzyme?', 'A biological catalyst - a protein that speeds up reactions without being used up.'], ['What does lipase produce?', 'Fatty acids and glycerol.'], ['Two roles of bile?', 'Neutralises stomach acid; emulsifies fats to increase surface area.'], ['Test for protein?', 'Biuret reagent: blue → purple.'], ['Test for starch?', 'Iodine: orange-brown → blue-black.'], ['What does denatured mean?', 'The active site has changed shape so the substrate no longer fits.']]),
        questions: [
          mc('What happens to an enzyme at a very high temperature?', ['Its active site changes shape and it is denatured', 'It dies, like the cells that made it', 'It works faster and faster with no limit', 'Its active site gets bigger and fits more substrate'], 'Bonds holding the shape break.', { d: 2 }),
          match('Match the food test to its positive result.', [['Iodine', 'Blue-black'], ['Benedict\'s', 'Brick red'], ['Biuret', 'Purple'], ['Ethanol', 'Cloudy emulsion']], 'Learn all four.', { d: 2 }),
          mc('Where is bile made?', ['The liver', 'The gall bladder', 'The pancreas', 'The stomach'], 'Made in the liver, stored in the gall bladder.', { d: 2, fb: { 1: 'It is STORED there.' } }),
          txt('Which enzyme breaks down starch?', ['amylase', 'carbohydrase'], 'Amylase is a carbohydrase.', { d: 1 }),
          num('In the amylase practical, starch was fully digested after 40 s. What is the rate (1/t) in s⁻¹?', 0.025, '1 ÷ 40 = 0.025.', { d: 2 }),
        ],
        examQuestions: [examQ('Explain how the structure of an enzyme allows it to break down a specific substrate, and why enzymes stop working at high temperatures.', 4, ['Active site has a specific shape', 'Substrate is complementary / fits (lock and key)', 'High temperature changes the shape of the active site', 'Substrate no longer fits - enzyme denatured'], { time: 4 })],
      }),
      topic({
        id: 'bio-heart', title: 'The heart, blood and blood vessels', summary: 'Double circulation, heart structure, arteries/veins/capillaries, blood components and coronary heart disease.',
        notes: `
## Double circulation
Blood passes through the heart **twice** per circuit: right side → **lungs** (pulmonary); left side → **body**.

## The heart
- Blood enters the **atria**, is pumped to the **ventricles**, then out. **Valves** prevent backflow.
- Right: vena cava → right atrium → right ventricle → **pulmonary artery** → lungs.
- Left: **pulmonary vein** → left atrium → left ventricle → **aorta** → body.
- Left ventricle wall is **thicker** (pumps to the whole body).
- **Pacemaker**: cells in the right atrium control heart rate; artificial pacemakers fix irregular rhythms.
- **Coronary arteries** supply the heart muscle with oxygen.

## Vessels
| Vessel | Structure | Why |
|---|---|---|
| Artery | Thick muscular, elastic walls; narrow lumen | High pressure from the heart |
| Vein | Thin walls, large lumen, **valves** | Low pressure; prevent backflow |
| Capillary | **One cell thick** | Short diffusion distance for exchange |

## Blood
**Plasma** (carries everything), **red blood cells** (haemoglobin, no nucleus, biconcave), **white blood cells** (immunity), **platelets** (clotting).

## Coronary heart disease
Fatty deposits narrow coronary arteries → less oxygen to heart muscle.
- **Stents** (open the artery), **statins** (lower cholesterol - but side effects, must be taken long-term), transplants, artificial hearts, replacement valves (mechanical or biological).
`,
        keyPoints: ['Double circulation: lungs and body', 'Right side → lungs; left side → body', 'Left ventricle has the thickest wall', 'Arteries: thick, elastic; veins: valves; capillaries: one cell thick', 'Red cells: haemoglobin, no nucleus, biconcave', 'CHD treated with stents and statins'],
        flashcards: cards([['Which blood vessel carries blood from the heart to the lungs?', 'The pulmonary artery.'], ['Which blood vessel carries oxygenated blood to the body?', 'The aorta.'], ['Why do veins have valves?', 'To prevent backflow of blood at low pressure.'], ['Why are capillaries one cell thick?', 'Short diffusion distance for exchange of substances.'], ['What are statins?', 'Drugs that reduce blood cholesterol, slowing fatty deposits.'], ['Where is the natural pacemaker?', 'In the wall of the right atrium.']]),
        questions: [
          ord('Put the path of blood through the right side of the heart in order.', ['Vena cava', 'Right atrium', 'Right ventricle', 'Pulmonary artery'], 'Deoxygenated blood goes to the lungs.', { d: 2 }),
          mc('Why is the left ventricle wall thicker than the right?', ['It pumps blood around the whole body at higher pressure', 'It holds a larger volume of blood than the right side', 'It receives deoxygenated blood from the whole body', 'It has more valves to stop blood flowing backwards'], 'More force needed for the body circuit.', { d: 2 }),
          mc('Which feature helps red blood cells carry oxygen?', ['Haemoglobin and no nucleus', 'A large nucleus', 'Thick cell wall', 'Many mitochondria'], 'More room for haemoglobin; biconcave shape increases surface area.', { d: 1 }),
          tf('Statins are used to widen narrowed arteries.', false, 'Stents widen arteries; statins lower cholesterol.', { d: 2 }),
        ],
        examQuestions: [examQ('Compare the use of stents and statins to treat coronary heart disease.', 6, SIX(['Stent: mesh tube keeps artery open; immediate effect', 'Stent: requires surgery - risk of infection, blood clots', 'Statins: reduce cholesterol, slowing build-up; no surgery', 'Statins: must be taken long term; side effects; slower effect', 'Statins can be preventative', 'Comparative conclusion']), { meta: '6-mark compare', time: 7 })],
      }),
      topic({
        id: 'bio-health', title: 'Health, disease and cancer', summary: 'Communicable vs non-communicable disease, risk factors and cancer.',
        notes: `
- **Health** = physical and mental wellbeing, not just absence of disease.
- **Communicable** diseases are caused by pathogens and can spread; **non-communicable** diseases cannot (e.g. heart disease, diabetes type 2).
- Diseases can interact: a weakened immune system (e.g. HIV) increases infections; viruses can trigger cancers; immune reactions can trigger allergies.

## Risk factors
| Risk factor | Disease |
|---|---|
| Diet, lack of exercise, obesity | Type 2 diabetes, cardiovascular disease |
| Smoking | Lung disease, lung cancer, cardiovascular disease |
| Alcohol | Liver disease, brain function |
| Carcinogens (ionising radiation) | Cancer |
| Smoking/alcohol in pregnancy | Harm to the unborn baby |

**Correlation is not causation** - a causal mechanism must be shown.

## Cancer
Uncontrolled cell division → **tumour**.
- **Benign**: contained in one area, doesn't invade other tissue.
- **Malignant**: invades neighbouring tissue and spreads in the **blood** to form **secondary tumours**.
`,
        keyPoints: ['Communicable = caused by pathogens', 'Risk factors increase likelihood of disease', 'Smoking, diet, alcohol, carcinogens', 'Benign tumours stay put; malignant spread via blood', 'Correlation ≠ causation'],
        flashcards: cards([['Difference between benign and malignant tumours?', 'Benign stay in one place; malignant invade tissue and spread via the blood.'], ['Name a non-communicable disease', 'e.g. coronary heart disease, type 2 diabetes, cancer.'], ['What is a carcinogen?', 'A substance or factor that increases the risk of cancer (e.g. ionising radiation, tobacco smoke).']]),
        questions: [
          mc('Which tumour type spreads to other parts of the body?', ['Malignant', 'Benign', 'Both', 'Neither'], 'Malignant cells break off and travel in the blood.', { d: 1 }),
          multi('Which are non-communicable diseases?', ['Type 2 diabetes', 'Lung cancer', 'Coronary heart disease'], ['Measles', 'Malaria', 'Salmonella'], 'Non-communicable diseases are not caused by pathogens.', { d: 1 }),
          tf('If two factors are correlated, one must cause the other.', false, 'Correlation shows a link; a causal mechanism must be proven separately.', { d: 2 }),
        ],
      }),
      topic({
        id: 'bio-plants', title: 'Plant tissues, transpiration and translocation', summary: 'Leaf structure, xylem and phloem, transpiration and stomata.',
        notes: `
## Leaf tissues
- **Epidermis** (waxy cuticle - reduces water loss), **palisade mesophyll** (many chloroplasts - most photosynthesis), **spongy mesophyll** (air spaces - gas diffusion), **xylem and phloem**, **guard cells** around **stomata**, **meristem** (growth).

## Transport
| | Xylem | Phloem |
|---|---|---|
| Carries | Water and mineral ions | Dissolved sugars |
| Direction | Up from roots | Up and down |
| Process | **Transpiration** stream | **Translocation** |
| Structure | Dead cells, hollow, lignin | Living cells with sieve plates |

## Transpiration
Water evaporates from leaves through **stomata**, pulling water up the xylem.
**Rate increases** with: higher **temperature**, higher **light intensity** (stomata open), more **air movement**, **lower humidity**.
Measured with a **potometer** (rate of water uptake).

**Guard cells** open stomata when turgid (in light) and close when flaccid - reducing water loss.
`,
        keyPoints: ['Palisade: most photosynthesis; spongy: gas exchange', 'Xylem: water up (transpiration); phloem: sugars both ways (translocation)', 'Transpiration faster: hot, bright, windy, dry', 'Guard cells control stomata', 'Potometer measures water uptake'],
        flashcards: cards([['What does phloem transport?', 'Dissolved sugars (translocation), up and down the plant.'], ['What does xylem transport?', 'Water and mineral ions from roots to leaves.'], ['Four factors increasing transpiration rate?', 'Higher temperature, light intensity, air movement; lower humidity.'], ['Function of guard cells?', 'Open and close stomata to control gas exchange and water loss.']]),
        questions: [
          mc('Which conditions give the fastest transpiration?', ['Hot, dry, windy and bright', 'Cold, humid and still', 'Dark and humid', 'Cold and dark'], 'Evaporation and diffusion are fastest; stomata open in light.', { d: 2 }),
          mc('What is translocation?', ['Movement of sugars through phloem', 'Movement of water through xylem', 'Loss of water from leaves', 'Absorption of minerals'], 'Translocation = phloem transport of sugars.', { d: 1 }),
          tf('Xylem tubes are made of living cells.', false, 'Xylem is dead, hollow, lignified cells.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'bio-infection', title: 'Infection and response', description: 'Paper 1 · pathogens, the immune system, vaccines and drugs.',
    topics: [
      topic({
        id: 'bio-pathogens', title: 'Pathogens and communicable diseases', summary: 'Viruses, bacteria, fungi and protists - examples, spread and prevention.',
        notes: `
Pathogens: **viruses**, **bacteria**, **fungi**, **protists**. Spread by air (droplets), water, direct contact, vectors.

| Disease | Pathogen | Spread | Symptoms / notes | Control |
|---|---|---|---|---|
| **Measles** | Virus | Droplets (sneezes/coughs) | Fever, red rash; can be fatal | Vaccination |
| **HIV** | Virus | Sexual contact, body fluids | Flu-like, then attacks immune cells → AIDS | Antiretroviral drugs |
| **Tobacco mosaic virus** | Virus (plants) | Contact | Mosaic pattern on leaves → less photosynthesis | Remove infected plants |
| **Salmonella** | Bacterium | Contaminated food | Fever, vomiting, diarrhoea (toxins) | Vaccinate poultry, cook food |
| **Gonorrhoea** | Bacterium | Sexual contact | Discharge, pain urinating | Antibiotics (resistance!), condoms |
| **Rose black spot** | Fungus | Spores in water/wind | Black spots, leaves fall | Fungicide, remove leaves |
| **Malaria** | Protist | **Mosquito vector** | Recurrent fever | Nets, insecticide, prevent breeding |

**Bacteria** may produce **toxins**; **viruses** live inside cells and replicate, bursting them.

Preventing spread: hygiene, isolating infected individuals, destroying vectors, vaccination.
`,
        keyPoints: ['Four pathogen types: virus, bacterium, fungus, protist', 'Measles, HIV, TMV = viruses', 'Salmonella, gonorrhoea = bacteria', 'Rose black spot = fungus; malaria = protist (mosquito vector)', 'Bacteria release toxins; viruses replicate inside cells', 'Control: hygiene, isolation, vectors, vaccination'],
        flashcards: cards([['What type of pathogen causes malaria?', 'A protist, spread by mosquitoes (vectors).'], ['How is measles spread?', 'Droplets from sneezes and coughs.'], ['What does TMV do to plants?', 'Causes a mosaic pattern on leaves - less chlorophyll so less photosynthesis.'], ['How do bacteria make us ill?', 'They produce toxins that damage tissues.'], ['How is gonorrhoea treated?', 'Antibiotics - but resistant strains are increasing.']]),
        questions: [
          match('Match the disease to its pathogen type.', [['Measles', 'Virus'], ['Salmonella', 'Bacterium'], ['Rose black spot', 'Fungus'], ['Malaria', 'Protist']], 'Learn one example of each type.', { d: 2 }),
          mc('How is malaria spread?', ['By mosquitoes (vectors)', 'By droplets in the air', 'In contaminated food', 'By touching infected leaves'], 'Mosquitoes carry the protist between people.', { d: 1 }),
          tf('Antibiotics can be used to treat HIV.', false, 'HIV is a virus; antibiotics only kill bacteria. HIV is treated with antiretroviral drugs.', { d: 2 }),
        ],
      }),
      topic({
        id: 'bio-immunity', title: 'Human defences, vaccination and drugs', summary: 'Non-specific defences, white blood cells, vaccines, antibiotics, painkillers and drug testing.',
        notes: `
## Non-specific defences
Skin (barrier), nose hairs and mucus, trachea/bronchi **cilia** and mucus, stomach **acid** (kills pathogens).

## White blood cells
1. **Phagocytosis** - engulf and digest pathogens.
2. Produce **antibodies** - specific to an antigen; clump pathogens.
3. Produce **antitoxins** - neutralise toxins.

## Vaccination
A dead/inactive pathogen is injected → white blood cells make antibodies and **memory cells** → if the real pathogen enters, antibodies are made **faster and in greater numbers**. **Herd immunity**: if most are vaccinated, spread is reduced.

## Drugs
- **Antibiotics** (e.g. penicillin) kill **bacteria** - not viruses. Overuse → **antibiotic resistance** (e.g. MRSA).
- **Painkillers** treat symptoms, not the cause.
- Drug origins: digitalis (foxgloves), aspirin (willow), penicillin (Alexander Fleming, mould).

## Drug development
1. **Preclinical**: lab tests on cells and tissues, then animals - toxicity, efficacy, dose.
2. **Clinical trials**: low doses on healthy volunteers (safety), then patients (optimum dose).
3. **Double-blind** trial with a **placebo** - neither patient nor doctor knows who has the drug (removes bias). Results **peer reviewed**.
`,
        keyPoints: ['Non-specific: skin, cilia, mucus, stomach acid', 'White blood cells: phagocytosis, antibodies, antitoxins', 'Vaccines trigger memory cells', 'Antibiotics kill bacteria only; resistance from overuse', 'Trials: preclinical → healthy volunteers → patients', 'Double-blind with placebo; peer review'],
        flashcards: cards([['Three ways white blood cells defend us?', 'Phagocytosis, producing antibodies, producing antitoxins.'], ['How does a vaccine work?', 'An inactive pathogen triggers antibody and memory cell production, so the response to the real pathogen is faster and greater.'], ['Why can\'t antibiotics treat colds?', 'Colds are caused by viruses, which live inside cells - antibiotics only kill bacteria.'], ['What is a double-blind trial?', 'Neither the patients nor the doctors know who receives the drug or the placebo.'], ['Who discovered penicillin?', 'Alexander Fleming (1928), from Penicillium mould.']]),
        questions: [
          mc('What does a vaccine contain?', ['A dead or inactive form of the pathogen', 'Antibiotics that kill the pathogen', 'Ready-made antibodies only', 'White blood cells from a donor'], 'It triggers an immune response without causing disease.', { d: 1 }),
          mc('Why is a placebo used in drug trials?', ['To compare the effect of the drug with no drug, removing the psychological effect', 'To make the trial cheaper by using fewer real tablets', 'To test whether the drug is toxic before animal trials', 'To increase the dose given to patients who need it most'], 'A placebo controls for the placebo effect.', { d: 2 }),
          ord('Put the stages of drug development in order.', ['Tested on cells and tissues', 'Tested on animals', 'Low dose on healthy volunteers', 'Tested on patients to find optimum dose'], 'Preclinical then clinical.', { d: 2 }),
          tf('Painkillers kill pathogens.', false, 'They only relieve symptoms.', { d: 1 }),
        ],
        examQuestions: [examQ('Explain how antibiotic-resistant bacteria such as MRSA develop and spread.', 5, ['Random mutation in bacterial DNA', 'Some bacteria become resistant to the antibiotic', 'Antibiotic kills non-resistant bacteria', 'Resistant bacteria survive and reproduce (binary fission)', 'Resistant population increases / spreads as no effective treatment'], { time: 5 })],
      }),
      topic({
        id: 'bio-mab', title: 'Monoclonal antibodies and plant disease', summary: 'Producing and using monoclonal antibodies; plant diseases and defences (Biology only, MAbs Higher).', tags: ['Biology only'],
        notes: `
## Monoclonal antibodies (Higher)
1. Mouse injected with an antigen → **lymphocytes** make the specific antibody.
2. Lymphocytes are fused with **tumour (myeloma) cells** → **hybridoma** cell (divides rapidly and makes the antibody).
3. Hybridomas are cloned → lots of identical antibodies.

**Uses**: pregnancy tests (detect hCG), diagnosis, measuring hormones, locating clots/cancer cells, **treating cancer** (carrying drugs/radioactive substances to cancer cells).
**Problems**: more side effects than expected; expensive.

## Plant diseases
Detected by stunted growth, spots, decay, growths, malformed stems, discoloration, pests.
- **Nitrate deficiency** → stunted growth (proteins). **Magnesium deficiency** → chlorosis (chlorophyll).
- Identify by reference books, lab testing, testing kits with monoclonal antibodies.

## Plant defences
- **Physical**: cellulose walls, waxy cuticle, bark.
- **Chemical**: antibacterial chemicals, poisons.
- **Mechanical**: thorns, hairs, drooping/curling leaves, mimicry.
`,
        keyPoints: ['Hybridoma = lymphocyte + tumour cell', 'Monoclonal antibodies are identical and specific', 'Uses: pregnancy tests, diagnosis, cancer treatment', 'Nitrate deficiency: stunted growth; magnesium: chlorosis', 'Plant defences: physical, chemical, mechanical'],
        flashcards: cards([['What is a hybridoma?', 'A cell made by fusing a lymphocyte with a tumour cell; it divides and makes one type of antibody.'], ['What causes chlorosis?', 'Magnesium ion deficiency (less chlorophyll).'], ['One use of monoclonal antibodies?', 'Pregnancy tests, diagnosis, or targeting drugs to cancer cells.']]),
        questions: [
          mc('Which cells are fused to make a hybridoma?', ['Lymphocyte and tumour cell', 'Red blood cell and lymphocyte', 'Sperm and egg', 'Phagocyte and platelet'], 'Lymphocytes make antibodies; tumour cells divide quickly.', { d: 3, tier: 'H' }),
          mc('A plant has yellow leaves (chlorosis). Which ion is likely deficient?', ['Magnesium', 'Nitrate', 'Potassium', 'Calcium'], 'Magnesium is needed to make chlorophyll.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'bio-energy', title: 'Bioenergetics', description: 'Paper 1 · photosynthesis and respiration.',
    topics: [
      topic({
        id: 'bio-photosynthesis', title: 'Photosynthesis', summary: 'The equation, limiting factors, uses of glucose and the light intensity practical.', tags: ['Required practical'],
        notes: `
**carbon dioxide + water → glucose + oxygen** (light, chlorophyll)
**6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂**

It is **endothermic** - energy is transferred from light.

## Limiting factors
The rate is limited by whichever is in shortest supply: **light intensity**, **CO₂ concentration**, **temperature**, amount of **chlorophyll**.
- Graph plateaus when another factor becomes limiting.
- Too high a temperature **denatures** enzymes.
- Greenhouses control these factors (heaters, lamps, paraffin burners for CO₂) - but extra cost must be balanced against extra yield.

## Inverse square law (Higher)
Light intensity ∝ 1 / distance². Halving the distance → **4×** the light intensity.

## Uses of glucose
Respiration; converted to **starch** (storage), **fats/oils** (storage), **cellulose** (cell walls); combined with nitrate ions to make **amino acids → proteins**.

:::exam Required practical: light intensity and pondweed
Place pondweed (Elodea) at different distances from a lamp; count bubbles of oxygen per minute (or collect gas volume). Keep CO₂ (sodium hydrogencarbonate) and temperature constant (heat shield/water bath).
:::
`,
        keyPoints: ['6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', 'Endothermic - needs light', 'Limiting factors: light, CO₂, temperature, chlorophyll', 'Inverse square law: intensity ∝ 1/d² (Higher)', 'Glucose → starch, cellulose, fats, proteins, respiration', 'Pondweed practical: count bubbles'],
        misconceptions: [{ wrong: 'Plants photosynthesise instead of respiring.', right: 'Plants respire all the time; they photosynthesise only in the light.' }],
        flashcards: cards([['Word equation for photosynthesis?', 'carbon dioxide + water → glucose + oxygen'], ['Balanced symbol equation for photosynthesis?', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂'], ['Four limiting factors of photosynthesis?', 'Light intensity, CO₂ concentration, temperature, amount of chlorophyll.'], ['Inverse square law for light?', 'Light intensity is inversely proportional to the square of the distance.'], ['Why is photosynthesis endothermic?', 'Energy is transferred from the environment (light) to the chloroplasts.']]),
        questions: [
          mc('In the pondweed experiment, how is CO₂ kept constant?', ['Add sodium hydrogencarbonate to the water', 'Place a heat shield between the lamp and the pondweed', 'Keep the lamp at the same distance each time', 'Count the bubbles for one minute each time'], 'Sodium hydrogencarbonate releases CO₂.', { d: 3 }),
          mc('The rate of photosynthesis stops increasing as light increases. Why?', ['Another factor such as CO₂ or temperature is now limiting', 'The plant has died from too much light', 'Light is no longer needed once glucose is made', 'The chlorophyll has been broken down by heat'], 'Plateau = a different limiting factor.', { d: 2 }),
          num('A lamp is moved from 20 cm to 10 cm from a plant. By what factor does light intensity increase?', 4, 'Half the distance → (2)² = 4 times.', { d: 4, tier: 'H' }),
          multi('What can plants use glucose for?', ['Making cellulose', 'Respiration', 'Storing as starch', 'Making proteins (with nitrates)'], ['Making chlorophyll from nothing', 'Producing oxygen gas for respiration'], 'Glucose has many uses.', { d: 2 }),
        ],
        examQuestions: [examQ('Describe how you would investigate the effect of light intensity on the rate of photosynthesis in pondweed.', 6, SIX(['Place pondweed in a boiling tube of water with sodium hydrogencarbonate', 'Place lamp at a measured distance (e.g. 10 cm)', 'Leave to acclimatise, then count bubbles per minute', 'Repeat at different distances (e.g. 20, 30, 40 cm)', 'Control temperature (water bath/heat shield) and CO₂', 'Repeat and calculate a mean']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
      topic({
        id: 'bio-respiration', title: 'Respiration and metabolism', summary: 'Aerobic and anaerobic respiration, exercise, oxygen debt and metabolism.',
        notes: `
Respiration is an **exothermic** reaction in every living cell that releases energy (not "makes" energy!).

## Aerobic (with oxygen) - in mitochondria
**glucose + oxygen → carbon dioxide + water**
**C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O**

## Anaerobic (without oxygen)
- **Muscles**: glucose → **lactic acid** (much less energy released).
- **Plants and yeast**: glucose → **ethanol + carbon dioxide** = **fermentation** (used for bread and alcohol).

## Exercise
Heart rate, breathing rate and breath volume increase to supply more O₂ and remove CO₂. In vigorous exercise muscles respire anaerobically → lactic acid → muscle **fatigue**.
**Oxygen debt** (Higher): extra oxygen needed after exercise to react with lactic acid. Lactic acid is carried to the **liver** and converted back to glucose.

## Metabolism
The sum of all reactions in a cell or body: e.g. glucose → starch/glycogen/cellulose; lipids from fatty acids + glycerol; amino acids → proteins; **urea** made from excess protein; respiration.
`,
        keyPoints: ['Respiration releases energy (exothermic)', 'Aerobic: glucose + oxygen → CO₂ + water', 'Anaerobic in muscles → lactic acid', 'Yeast/plants → ethanol + CO₂ (fermentation)', 'Oxygen debt: O₂ to break down lactic acid (Higher)', 'Metabolism = sum of all reactions'],
        flashcards: cards([['Word equation for aerobic respiration?', 'glucose + oxygen → carbon dioxide + water'], ['Products of anaerobic respiration in muscles?', 'Lactic acid.'], ['Products of anaerobic respiration in yeast?', 'Ethanol and carbon dioxide (fermentation).'], ['What is oxygen debt?', 'The amount of extra oxygen needed after exercise to react with accumulated lactic acid.'], ['Where does aerobic respiration take place?', 'In the mitochondria.']]),
        questions: [
          mc('Which releases more energy per glucose molecule?', ['Aerobic respiration', 'Anaerobic respiration', 'They are equal', 'Fermentation'], 'Glucose is fully oxidised in aerobic respiration.', { d: 1 }),
          txt('Name the substance produced by anaerobic respiration in human muscles.', ['lactic acid'], 'It causes muscle fatigue.', { d: 1 }),
          mc('Where is lactic acid converted back to glucose?', ['The liver', 'The lungs', 'The heart', 'The kidneys'], 'Blood carries lactic acid to the liver.', { d: 3, tier: 'H' }),
          tf('Respiration produces energy.', false, 'Energy cannot be produced - respiration RELEASES energy stored in glucose.', { d: 2 }),
        ],
      }),
    ],
  },
];
