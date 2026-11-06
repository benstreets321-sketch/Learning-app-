import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, txt, topic, examQ, ord, match } from '../../dsl';

const SIX = (points: string[]) => [
  'Level 3 (5-6): detailed, coherent, logically linked explanation using correct scientific terms',
  'Level 2 (3-4): several relevant points with some linking',
  'Level 1 (1-2): simple relevant statements',
  ...points,
];

export const bioPaper2: Unit[] = [
  {
    id: 'bio-homeo', title: 'Homeostasis and response', description: 'Paper 2 · the nervous system, hormones and control.',
    topics: [
      topic({
        id: 'bio-nervous', title: 'The nervous system, reflexes, brain and eye', summary: 'Neurones, reflex arcs, the reaction time practical, and (Biology only) the brain and eye.', tags: ['Required practical'],
        notes: `
**Homeostasis**: regulating internal conditions (body temperature, blood glucose, water levels) for optimum enzyme action and cell function. Control systems: **receptors → coordination centre (brain, spinal cord, pancreas) → effectors** (muscles or glands).

## Nervous system
Stimulus → receptor → **sensory neurone** → CNS → **motor neurone** → effector → response. Fast, short-lasting, electrical impulses.

## Reflex arc (automatic, rapid, no conscious thought)
Stimulus → receptor → sensory neurone → **relay neurone** (spinal cord) → motor neurone → effector.
**Synapse**: gap between neurones - a chemical (neurotransmitter) **diffuses** across.

## Required practical: reaction time
Ruler drop test: partner drops a ruler, you catch it; record distance → convert to time with a table. Repeat; investigate a factor (e.g. caffeine). Control: same hand, same person dropping, no warning.

## The brain (Biology only)
**Cerebral cortex** (consciousness, intelligence, memory, language), **cerebellum** (muscle coordination, balance), **medulla** (unconscious activities - heart rate, breathing). Studied using MRI scans, patients with brain damage, electrical stimulation. Hard to treat: complex, delicate, easily damaged.

## The eye (Biology only)
| Part | Function |
|---|---|
| Cornea | Refracts light |
| Iris | Controls pupil size (light levels) |
| Lens | Focuses light on the retina |
| Retina | Light receptors (rods and cones) |
| Ciliary muscles + suspensory ligaments | Change lens shape (**accommodation**) |
| Optic nerve | Carries impulses to the brain |

- **Near object**: ciliary muscles contract, ligaments slacken, lens **thicker** (more refraction).
- **Far object**: ciliary muscles relax, ligaments tighten, lens **thinner**.
- **Myopia** (short-sighted) - concave lens; **hyperopia** (long-sighted) - convex lens.
`,
        keyPoints: ['Receptor → coordination centre → effector', 'Reflex arc: sensory → relay → motor neurone', 'Synapse: neurotransmitter diffuses across the gap', 'Reflexes are automatic and rapid', 'Brain: cortex, cerebellum, medulla (Bio only)', 'Accommodation: lens thicker for near objects (Bio only)'],
        flashcards: cards([['Path of a reflex arc?', 'Stimulus → receptor → sensory neurone → relay neurone → motor neurone → effector → response.'], ['What happens at a synapse?', 'A chemical neurotransmitter diffuses across the gap to trigger an impulse in the next neurone.'], ['Function of the cerebellum?', 'Coordinates muscle activity and balance.'], ['Function of the medulla?', 'Controls unconscious activities like heart rate and breathing.'], ['Function of the iris?', 'Controls the size of the pupil and so how much light enters.'], ['How does the eye focus on a near object?', 'Ciliary muscles contract, suspensory ligaments slacken, lens becomes thicker.']]),
        questions: [
          ord('Put a reflex arc in order.', ['Receptor detects stimulus', 'Sensory neurone', 'Relay neurone in spinal cord', 'Motor neurone', 'Effector (muscle) responds'], 'Reflexes bypass conscious thought.', { d: 2 }),
          mc('What crosses a synapse?', ['A chemical neurotransmitter', 'An electrical impulse', 'A hormone', 'An enzyme'], 'The impulse is converted to a chemical signal.', { d: 2 }),
          mc('Which part of the brain coordinates balance?', ['Cerebellum', 'Medulla', 'Cerebral cortex', 'Hypothalamus'], 'Cerebellum = coordination.', { d: 2 }),
          tf('When looking at a distant object the lens becomes thicker.', false, 'For distant objects the lens is thinner (ciliary muscles relax).', { d: 3 }),
        ],
      }),
      topic({
        id: 'bio-hormones', title: 'Hormones, blood glucose and diabetes', summary: 'The endocrine system, insulin and glucagon, type 1 and type 2 diabetes.',
        notes: `
**Hormones**: chemicals secreted by **glands** into the **blood**, carried to target organs. Slower but longer-lasting than nerves.

| Gland | Hormone |
|---|---|
| **Pituitary** ("master gland") | FSH, LH, ADH, TSH, growth hormone |
| Pancreas | Insulin, glucagon |
| Thyroid | Thyroxine |
| Adrenal | Adrenaline |
| Ovaries / testes | Oestrogen, progesterone / testosterone |

## Blood glucose
- Too high (after a meal) → pancreas releases **insulin** → cells take up glucose; liver and muscles store it as **glycogen**.
- Too low (Higher) → pancreas releases **glucagon** → glycogen converted back to glucose. This is **negative feedback**.

## Diabetes
| | Type 1 | Type 2 |
|---|---|---|
| Cause | Pancreas makes **too little insulin** | Body cells **no longer respond** to insulin |
| Treatment | **Insulin injections** | Carbohydrate-controlled diet, exercise (and medication) |
| Risk factor | Usually starts in childhood | **Obesity** |

## Adrenaline and thyroxine (Higher)
- **Adrenaline**: "fight or flight" - increases heart rate, more O₂ and glucose to muscles.
- **Thyroxine**: controls basal metabolic rate; controlled by **negative feedback** with TSH.
`,
        keyPoints: ['Hormones travel in the blood from glands', 'Pituitary = master gland', 'Insulin lowers blood glucose (glucose → glycogen)', 'Glucagon raises it (Higher) - negative feedback', 'Type 1: no insulin made; Type 2: cells don\'t respond', 'Adrenaline: fight or flight; thyroxine: metabolic rate'],
        flashcards: cards([['Which hormone lowers blood glucose?', 'Insulin, from the pancreas.'], ['What is glycogen?', 'The storage form of glucose in the liver and muscles.'], ['Difference between type 1 and type 2 diabetes?', 'Type 1: pancreas produces too little insulin. Type 2: body cells stop responding to insulin.'], ['Why is the pituitary called the master gland?', 'It secretes hormones that control other glands.'], ['What is negative feedback?', 'A change triggers a response that reverses the change, returning conditions to normal.']]),
        questions: [
          mc('What happens when blood glucose rises after a meal?', ['Insulin is released and glucose is stored as glycogen', 'Glucagon is released and glycogen becomes glucose', 'Adrenaline is released and heart rate increases', 'The kidneys remove the extra glucose in urine'], 'Insulin brings glucose down.', { d: 1 }),
          mc('What is the main treatment for type 1 diabetes?', ['Insulin injections', 'Glucagon injections', 'A carbohydrate-controlled diet only', 'Adrenaline injections'], 'The pancreas doesn\'t make enough insulin.', { d: 1 }),
          mc('Which hormone increases heart rate in a frightening situation?', ['Adrenaline', 'Insulin', 'Thyroxine', 'Oestrogen'], 'Fight-or-flight response.', { d: 2 }),
          tf('Hormonal responses are generally faster than nervous responses.', false, 'Nervous responses are faster; hormonal effects last longer.', { d: 1 }),
        ],
        examQuestions: [examQ('Explain how blood glucose concentration is controlled after a meal and between meals.', 6, SIX(['Pancreas monitors blood glucose', 'High glucose → insulin released into blood', 'Glucose moves into cells; liver/muscles convert glucose to glycogen', 'Low glucose → glucagon released (Higher)', 'Glycogen converted back to glucose and released into blood', 'Negative feedback keeps level in normal range']), { meta: '6-mark explain', time: 7 })],
      }),
      topic({
        id: 'bio-reproduction-h', title: 'Reproductive hormones, contraception and fertility', summary: 'The menstrual cycle, contraception and IVF.',
        notes: `
## Hormones of the menstrual cycle
| Hormone | Made in | Effect |
|---|---|---|
| **FSH** | Pituitary | Causes an egg to mature in the ovary; stimulates oestrogen |
| **Oestrogen** | Ovaries | Thickens the uterus lining; inhibits FSH; stimulates LH (Higher) |
| **LH** | Pituitary | Triggers **ovulation** (egg release) ~day 14 |
| **Progesterone** | Ovaries | Maintains the uterus lining; inhibits FSH and LH |

**Testosterone** (testes) stimulates sperm production.

## Contraception
- **Hormonal**: pill (oestrogen/progesterone inhibit FSH so no eggs mature), patch, implant, injection.
- **Barrier**: condoms, diaphragm (also condoms prevent STIs).
- IUD, spermicides, abstinence around ovulation, sterilisation.

## Infertility treatment (Higher)
- **FSH and LH** given as fertility drugs.
- **IVF**: FSH/LH to mature several eggs → eggs collected and fertilised in a lab → embryos inserted into the uterus.
- Issues: emotionally and physically stressful, low success rates, multiple births risk, ethical concerns about unused embryos.
`,
        keyPoints: ['FSH: matures egg; LH: triggers ovulation', 'Oestrogen: thickens lining; progesterone: maintains it', 'Pill uses hormones to inhibit FSH', 'Barrier methods also protect against STIs', 'IVF: FSH/LH, lab fertilisation, embryo transfer (Higher)'],
        flashcards: cards([['Which hormone causes ovulation?', 'LH (luteinising hormone).'], ['Which hormone causes an egg to mature?', 'FSH (follicle stimulating hormone).'], ['How does the contraceptive pill work?', 'Oestrogen/progesterone inhibit FSH so no eggs mature.'], ['What is IVF?', 'In vitro fertilisation - eggs fertilised outside the body and embryos placed in the uterus.']]),
        questions: [
          match('Match the hormone to its role.', [['FSH', 'Egg matures'], ['LH', 'Ovulation'], ['Oestrogen', 'Thickens uterus lining'], ['Progesterone', 'Maintains uterus lining']], 'Learn all four menstrual hormones.', { d: 3 }),
          mc('Which contraceptive also protects against sexually transmitted infections?', ['Condom', 'Pill', 'Implant', 'IUD'], 'Only barrier methods like condoms prevent STIs.', { d: 1 }),
        ],
      }),
      topic({
        id: 'bio-kidney', title: 'Temperature control, the kidney and plant hormones', summary: 'Thermoregulation, kidney function and ADH, dialysis, auxins and tropisms (Biology only).', tags: ['Biology only', 'Required practical'],
        notes: `
## Thermoregulation
The **thermoregulatory centre** in the brain monitors blood temperature.
- **Too hot**: sweating; **vasodilation** (blood vessels near the skin widen → more heat lost).
- **Too cold**: shivering (muscles respire → heat); **vasoconstriction**; sweating stops.

## Kidneys
Filter the blood; **reabsorb** all glucose, some ions and the right amount of water; produce **urine** (urea, excess water and ions).
- **Urea** is made in the liver from excess amino acids (**deamination**).
- **ADH** (from the pituitary) makes kidney tubules more permeable → more water reabsorbed → concentrated urine (negative feedback).
- **Kidney failure**: **dialysis** (partially permeable membrane; dialysis fluid has the same glucose and ion concentration as healthy blood) or **transplant** (risk of rejection - immunosuppressants).

## Plant hormones
- **Auxin**: unequal distribution causes **phototropism** (towards light - auxin moves to the shaded side, cells elongate more) and **gravitropism** (roots grow down).
- **Gibberellins**: seed germination; **ethene**: fruit ripening.
- **Uses**: weedkillers, rooting powder (auxins), ending seed dormancy (gibberellins), controlling ripening (ethene).

:::exam Required practical: light and seedling growth
Grow cress seedlings with light from one side vs all round; measure growth/direction over several days.
:::
`,
        keyPoints: ['Too hot: sweat, vasodilation; too cold: shiver, vasoconstriction', 'Kidneys filter and selectively reabsorb', 'ADH increases water reabsorption', 'Dialysis vs transplant', 'Auxin: phototropism and gravitropism', 'Gibberellins: germination; ethene: ripening'],
        flashcards: cards([['What is vasodilation?', 'Widening of blood vessels near the skin to lose more heat.'], ['What does ADH do?', 'Increases water reabsorption in the kidney, producing concentrated urine.'], ['How is urea made?', 'In the liver, by deamination of excess amino acids.'], ['What causes phototropism?', 'Auxin collects on the shaded side, making cells there elongate more so the shoot bends towards light.'], ['Use of ethene?', 'Controls fruit ripening.']]),
        questions: [
          mc('What happens to blood vessels in the skin when you are too hot?', ['They dilate (vasodilation)', 'They constrict (vasoconstriction)', 'They move closer to the skin surface', 'They close so less blood reaches the skin'], 'More blood flows near the surface to lose heat.', { d: 2 }),
          mc('Why does dialysis fluid contain glucose at the same concentration as blood plasma?', ['So glucose is not lost from the blood by diffusion', 'To give the patient energy during treatment', 'To help remove urea from the blood faster', 'To kill any bacteria in the dialysis machine'], 'No concentration gradient for glucose.', { d: 3 }),
          tf('Auxin makes cells on the shaded side of a shoot grow less.', false, 'It makes them elongate MORE, so the shoot bends towards light.', { d: 3 }),
        ],
      }),
    ],
  },
  {
    id: 'bio-inherit', title: 'Inheritance, variation and evolution', description: 'Paper 2 · DNA, genetics, evolution and classification.',
    topics: [
      topic({
        id: 'bio-dna', title: 'Reproduction, meiosis and DNA', summary: 'Sexual vs asexual reproduction, meiosis, DNA structure and (Biology only) protein synthesis.',
        notes: `
## Sexual vs asexual reproduction
| Sexual | Asexual |
|---|---|
| Two parents, gametes fuse (fertilisation) | One parent, no gametes |
| **Variation** in offspring | Offspring are **clones** |
| Meiosis | Mitosis |

## Meiosis (makes gametes)
The cell copies its DNA then divides **twice** → **four** gametes, each with **half** the chromosomes (23 in humans), all **genetically different**. At fertilisation the full number (46) is restored.

## DNA
- A **polymer** of two strands in a **double helix**.
- A **gene** codes for a sequence of amino acids → a specific **protein**.
- The **genome** is all the genetic material of an organism. The **Human Genome Project** helps find disease genes, understand inherited disorders and trace human migration.

## Biology only: DNA structure and protein synthesis
- DNA is made of **nucleotides**: a sugar, a phosphate and one of four **bases** (A, T, C, G). **A pairs with T, C pairs with G** (complementary).
- **Three bases code for one amino acid**.
- Protein synthesis (Higher): DNA → **mRNA** (transcription in the nucleus) → **ribosome** reads it, **tRNA** brings amino acids → protein folds into a specific shape.
- Mutations change the base sequence - most have no effect; some alter the protein's shape (e.g. an enzyme's active site).
`,
        keyPoints: ['Sexual: variation; asexual: clones', 'Meiosis: 4 different gametes with half the chromosomes', 'DNA: double helix polymer', 'Gene codes for a protein', 'A-T and C-G base pairing (Bio only)', '3 bases = 1 amino acid (Bio only)'],
        flashcards: cards([['How many cells does meiosis produce?', 'Four genetically different gametes.'], ['How many chromosomes in a human gamete?', '23'], ['What is a genome?', 'The entire genetic material of an organism.'], ['Which bases pair in DNA?', 'A with T, C with G.'], ['How many bases code for one amino acid?', 'Three.']]),
        questions: [
          mc('Which process produces gametes?', ['Meiosis', 'Mitosis', 'Fertilisation', 'Binary fission'], 'Meiosis halves the chromosome number.', { d: 1 }),
          mc('In DNA, adenine (A) always pairs with...', ['Thymine (T)', 'Guanine (G)', 'Cytosine (C)', 'Uracil (U)'], 'Complementary base pairing.', { d: 2 }),
          tf('Asexual reproduction produces genetic variation.', false, 'Asexual offspring are genetically identical clones.', { d: 1 }),
        ],
      }),
      topic({
        id: 'bio-genetics', title: 'Genetic inheritance and disorders', summary: 'Alleles, genotype/phenotype, Punnett squares, inherited disorders and sex determination.',
        notes: `
| Term | Meaning |
|---|---|
| Allele | A version of a gene |
| Dominant | Expressed if one copy is present (capital letter, e.g. B) |
| Recessive | Only expressed if two copies (bb) |
| Homozygous | Two identical alleles (BB or bb) |
| Heterozygous | Two different alleles (Bb) |
| Genotype | The alleles present |
| Phenotype | The characteristic shown |

## Punnett squares
Bb × Bb → BB : Bb : Bb : bb → **3 : 1** dominant : recessive (25% chance of bb).

## Inherited disorders
- **Polydactyly** (extra fingers/toes) - **dominant** allele.
- **Cystic fibrosis** (thick mucus) - **recessive** allele; carriers (Ff) are unaffected.
- **Embryo screening**: ethical, economic and social issues.

## Sex determination
Women **XX**, men **XY**. Each pregnancy has a **50%** chance of a boy.
`,
        keyPoints: ['Dominant shown with one copy; recessive needs two', 'Homozygous = same alleles; heterozygous = different', 'Genotype = alleles; phenotype = characteristic', 'Aa × Aa → 3 : 1 ratio', 'Polydactyly dominant; cystic fibrosis recessive', 'XX female, XY male - 50% chance each'],
        generators: ['b-punnett'],
        flashcards: cards([['What is an allele?', 'A different version of the same gene.'], ['Define heterozygous', 'Having two different alleles of a gene (e.g. Bb).'], ['Is cystic fibrosis dominant or recessive?', 'Recessive.'], ['Is polydactyly dominant or recessive?', 'Dominant.'], ['Sex chromosomes of a male?', 'XY']]),
        questions: [
          mc('Two carriers of cystic fibrosis (Ff) have a child. What is the probability the child has cystic fibrosis?', ['25%', '50%', '75%', '0%'], 'Ff × Ff → FF, Ff, Ff, ff - 1 in 4.', { d: 2 }),
          mc('What is the phenotype?', ['The physical characteristic shown', 'The combination of alleles present', 'A section of DNA that codes for a protein', 'An allele that is always expressed'], 'Phenotype = characteristic; genotype = alleles.', { d: 1 }),
          txt('What is the genotype of someone homozygous recessive for allele "t"?', ['tt'], 'Two recessive alleles.', { d: 1 }),
          num('What is the percentage chance that a baby will be a girl?', 50, 'XX × XY → 2 XX : 2 XY.', { d: 1, unit: '%' }),
        ],
      }),
      topic({
        id: 'bio-evolution', title: 'Variation, evolution and genetic technologies', summary: 'Natural selection, Darwin, selective breeding, genetic engineering, cloning, fossils and resistance.',
        notes: `
## Variation
Caused by **genes**, the **environment**, or both. **Mutations** create new variants - most have no effect; rarely one is advantageous.

## Natural selection (Darwin)
1. Variation exists in a population.
2. Individuals best suited to the environment are more likely to **survive and reproduce**.
3. They pass on the advantageous **alleles** to offspring.
4. Over many generations the population changes → **evolution**. If populations become so different they can't interbreed → **new species**.

**Evidence**: fossils, antibiotic resistance in bacteria. **Darwin** (*On the Origin of Species*, 1859) faced opposition (religion, insufficient evidence, no knowledge of genes). **Wallace** independently developed natural selection (warning colouration). **Lamarck**'s incorrect idea: acquired characteristics are inherited.

## Selective breeding
Humans choose parents with desired traits, breed them, repeat over generations (e.g. disease-resistant crops, docile dogs). Risk: **inbreeding** → disease, less variation.

## Genetic engineering
Gene cut out with **enzymes**, inserted into a **vector** (plasmid or virus), transferred into a cell (e.g. bacteria making human **insulin**; GM crops resistant to pests). Concerns: effects on wild populations, human health.

## Cloning (Biology only)
Tissue culture, cuttings, embryo transplants, **adult cell cloning** (Dolly the sheep: nucleus from body cell into an enucleated egg, electric shock, implanted).

## Fossils and extinction
Fossils form from hard parts, mineral replacement, or preservation (ice, amber). The record is incomplete. Extinction causes: new predators/diseases, environmental change, catastrophic events.

## Resistant bacteria
Mutations → resistance → survive antibiotics → reproduce. Reduce by: only prescribing antibiotics when needed, finishing courses, hygiene in hospitals, restricting use in farming.
`,
        keyPoints: ['Variation: genes + environment; mutations', 'Natural selection: variation → survival → reproduce → pass on alleles', 'Darwin 1859; Wallace; Lamarck (wrong)', 'Selective breeding risks inbreeding', 'Genetic engineering uses vectors (plasmids)', 'Fossils are evidence but incomplete', 'Antibiotic resistance is evolution in action'],
        flashcards: cards([['Who proposed evolution by natural selection?', 'Charles Darwin (with Alfred Russel Wallace).'], ['What is selective breeding?', 'Humans choosing parents with desired characteristics to breed over many generations.'], ['What is a vector in genetic engineering?', 'Something used to transfer a gene into a cell - e.g. a plasmid or virus.'], ['Why is the fossil record incomplete?', 'Many early organisms were soft-bodied; fossils were destroyed by geological activity; few conditions allow fossilisation.'], ['What is a species?', 'Organisms that can interbreed to produce fertile offspring.']]),
        questions: [
          ord('Put the steps of natural selection in order.', ['Variation exists due to mutations', 'Best-adapted individuals survive', 'They reproduce and pass on their alleles', 'The allele becomes more common over generations'], 'Darwin\'s theory.', { d: 2 }),
          mc('Why did many people reject Darwin\'s theory at first?', ['It challenged the idea that God created all life, and there was little evidence then', 'It said characteristics developed during a lifetime are passed on to offspring', 'He had collected evidence only from plants, so it could not apply to animals', 'Other scientists\' experiments showed it was wrong straight away'], 'Religious views and limited evidence (no knowledge of genes).', { d: 2 }),
          multi('Which reduce the development of antibiotic resistance?', ['Not prescribing antibiotics for viral infections', 'Finishing the full course', 'Restricting agricultural use'], ['Taking antibiotics for a cold', 'Stopping when you feel better'], 'Unnecessary or incomplete use selects resistant bacteria.', { d: 2 }),
          tf('Lamarck\'s idea that characteristics acquired in life are inherited is accepted today.', false, 'Lamarck\'s theory was rejected; inheritance is through genes.', { d: 2 }),
        ],
        examQuestions: [examQ('Describe how bacteria can be genetically engineered to produce human insulin.', 4, ['Gene for insulin cut out of human DNA using enzymes', 'Plasmid cut open with the same enzyme', 'Gene inserted into the plasmid (vector)', 'Plasmid inserted into bacteria which multiply and produce insulin'], { time: 5 })],
      }),
      topic({
        id: 'bio-classification', title: 'Classification', summary: 'Linnaean system, binomial names and the three-domain system.',
        notes: `
**Linnaeus** classified organisms by structure: **kingdom, phylum, class, order, family, genus, species** ("King Philip Came Over For Good Soup").
- **Binomial name**: *Genus species*, e.g. *Homo sapiens*.
- **Carl Woese** (1990) proposed the **three-domain system** using chemical analysis: **Archaea** (primitive bacteria in extreme environments), **Bacteria**, **Eukaryota**.
- **Evolutionary trees** show how organisms are related, based on current and fossil evidence.
`,
        keyPoints: ['Kingdom → phylum → class → order → family → genus → species', 'Binomial name = Genus species', 'Three domains: Archaea, Bacteria, Eukaryota (Woese)', 'Evolutionary trees show common ancestors'],
        flashcards: cards([['Order of classification levels?', 'Kingdom, phylum, class, order, family, genus, species.'], ['What are the three domains?', 'Archaea, Bacteria, Eukaryota.'], ['What is the binomial name for humans?', 'Homo sapiens.']]),
        questions: [
          ord('Put the classification levels in order from largest to smallest.', ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'], '"King Philip Came Over For Good Soup".', { d: 2 }),
          mc('Who proposed the three-domain system?', ['Carl Woese', 'Carl Linnaeus', 'Charles Darwin', 'Gregor Mendel'], 'Based on chemical (RNA) analysis.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'bio-ecology', title: 'Ecology', description: 'Paper 2 · ecosystems, cycles and human impact.',
    topics: [
      topic({
        id: 'bio-ecosystems', title: 'Ecosystems, adaptations and sampling', summary: 'Communities, abiotic and biotic factors, adaptations, food chains and the quadrat practical.', tags: ['Required practical'],
        notes: `
| Term | Meaning |
|---|---|
| Habitat | Where an organism lives |
| Population | All organisms of one species in an area |
| Community | All populations in a habitat |
| Ecosystem | Community + non-living (abiotic) parts |
| Interdependence | Species depend on each other (food, pollination, shelter) |

**Competition**: animals for food, mates, territory; plants for light, space, water, minerals.

- **Abiotic factors**: light intensity, temperature, moisture, soil pH and minerals, wind, CO₂, O₂ (aquatic).
- **Biotic factors**: food availability, new predators, new pathogens, competition.

## Adaptations
Structural (thick fur), behavioural (migration), functional (camels producing little urine). **Extremophiles** live in extreme conditions (hot springs, high salt).

## Food chains
Producer (photosynthesis) → primary consumer → secondary consumer... **Predator-prey cycles**: prey numbers rise then predator numbers rise (lag), and so on.

:::exam Required practical: quadrats
- **Random sampling** (random coordinates) to estimate population: mean per quadrat × (total area ÷ quadrat area).
- **Transect**: place quadrats at intervals along a line to show how distribution changes (e.g. with distance from a tree).
:::
`,
        keyPoints: ['Population, community, ecosystem definitions', 'Abiotic = non-living factors; biotic = living', 'Plants compete for light, space, water, minerals', 'Adaptations: structural, behavioural, functional', 'Predator-prey cycles lag', 'Quadrat estimate = mean × total area ÷ quadrat area'],
        generators: ['b-quadrat'],
        flashcards: cards([['What is a community?', 'All the populations of different species living in a habitat.'], ['Give three abiotic factors', 'Light intensity, temperature, moisture levels (also soil pH, wind, CO₂).'], ['What is an extremophile?', 'An organism adapted to live in extreme conditions.'], ['What is a transect used for?', 'Showing how the distribution of organisms changes across an area.']]),
        questions: [
          multi('Which are abiotic factors?', ['Light intensity', 'Soil pH', 'Temperature'], ['Predators', 'Disease', 'Competition'], 'Abiotic = non-living.', { d: 1 }),
          mc('Why are quadrats placed at random?', ['To avoid bias and get a representative sample', 'To make sure every species in the area is found', 'So that no part of the area is counted twice', 'To make the sample size big enough to be valid'], 'Random placement removes sampling bias.', { d: 2 }),
          num('A mean of 3.5 buttercups per 1 m² quadrat is found in a 400 m² field. Estimate the population.', 1400, '3.5 × 400 = 1400.', { d: 2 }),
          mc('In a predator-prey cycle, which rises first?', ['The prey population', 'The predator population', 'Both at exactly the same time', 'Whichever population is smaller'], 'More prey → more food → predators increase afterwards.', { d: 2 }),
        ],
        examQuestions: [examQ('Describe how you would use a transect and quadrats to investigate how the distribution of daisies changes from a hedge into an open field.', 6, SIX(['Lay a tape measure from the hedge into the field', 'Place a quadrat at regular intervals (e.g. every 2 m)', 'Count daisies (or % cover) in each quadrat', 'Measure an abiotic factor at each point (e.g. light meter)', 'Repeat with more transects', 'Plot number against distance']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
      topic({
        id: 'bio-cycles', title: 'Cycles and decomposition', summary: 'The carbon and water cycles, decomposers and (Biology only) the decay practical and trophic levels.', tags: ['Biology only'],
        notes: `
## Carbon cycle
- CO₂ removed from the air by **photosynthesis**.
- Returned by **respiration** (plants, animals, decomposers) and **combustion** (fossil fuels).
- **Decomposers** (bacteria, fungi) break down dead organisms and waste, returning carbon to the air and **mineral ions** to the soil.

## Water cycle
Evaporation → condensation → precipitation; transpiration from plants; provides fresh water for plants and animals.

## Decomposition (Biology only)
Rate depends on **temperature, water and oxygen**. Compost: gardeners provide warm, moist, aerated conditions. **Anaerobic** decay produces **methane** (biogas).
Required practical: effect of temperature on decay (milk + lipase: pH falls as fatty acids form - measured with indicator).

## Trophic levels and biomass (Biology only)
Only ~10% of biomass is transferred to the next level - lost as respiration, egestion (faeces), excretion (urea, CO₂). That's why food chains are short. **Pyramids of biomass**.
Efficiency = (biomass at higher level ÷ biomass at lower level) × 100.
`,
        keyPoints: ['Photosynthesis removes CO₂; respiration and combustion return it', 'Decomposers recycle carbon and minerals', 'Decay needs warmth, moisture, oxygen', 'Anaerobic decay → methane (biogas)', 'Only ~10% biomass transfers between trophic levels'],
        flashcards: cards([['Which process removes CO₂ from the atmosphere?', 'Photosynthesis.'], ['What do decomposers do?', 'Break down dead organisms, releasing CO₂ by respiration and returning mineral ions to the soil.'], ['Three factors affecting decay rate?', 'Temperature, water availability and oxygen availability.'], ['Why are food chains rarely longer than 5 links?', 'Too much biomass/energy is lost at each level (respiration, waste).']]),
        questions: [
          mc('Which process returns carbon to the atmosphere?', ['Respiration', 'Photosynthesis', 'Fossilisation', 'Transpiration'], 'Respiration releases CO₂.', { d: 1 }),
          num('A trophic level has 1000 kg of biomass and the next has 120 kg. Calculate the efficiency of transfer.', 12, '120 ÷ 1000 × 100 = 12%.', { d: 2, unit: '%' }),
          tf('Compost heaps decay fastest when cold and dry.', false, 'Warm, moist, aerated conditions speed up decomposers.', { d: 1 }),
        ],
      }),
      topic({
        id: 'bio-biodiversity', title: 'Biodiversity and human impact', summary: 'Waste, land use, deforestation, global warming, conservation and food security.',
        notes: `
**Biodiversity**: the variety of all species in an ecosystem. High biodiversity makes ecosystems **stable** (less dependent on one species).

## Human impact
- **Population growth** and higher living standards → more resources used and more **waste**.
- **Pollution**: water (sewage, fertiliser, toxic chemicals), air (smoke, acidic gases → acid rain), land (landfill, toxic chemicals).
- **Land use**: building, quarrying, farming, dumping waste; **peat bogs** destroyed for compost (releases CO₂, reduces habitats).
- **Deforestation** (for cattle, rice, biofuels): less biodiversity, less CO₂ absorbed, more released (burning).
- **Global warming**: rising CO₂ and methane → climate change → loss of habitats, species migration, changes in distribution.

## Maintaining biodiversity
Breeding programmes, protecting/regenerating rare habitats, hedgerows and field margins, reducing deforestation and carbon emissions, recycling.

## Food security (Biology only)
Threats: rising population, changing diets, new pests/pathogens, climate change, cost of farming, conflicts. Solutions: sustainable fishing (quotas, net size), **mycoprotein** from fungi, GM crops, efficient farming (but ethical issues).
`,
        keyPoints: ['Biodiversity = variety of species; makes ecosystems stable', 'Pollution of water, air, land', 'Deforestation reduces biodiversity and increases CO₂', 'Peat bog destruction releases CO₂', 'Conservation: breeding programmes, hedgerows, habitat protection', 'Food security: sustainable fishing, mycoprotein (Bio only)'],
        flashcards: cards([['What is biodiversity?', 'The variety of all the different species of organisms in an ecosystem.'], ['Two effects of deforestation?', 'Reduced biodiversity; more CO₂ in the atmosphere (less photosynthesis + burning).'], ['Why is destroying peat bogs harmful?', 'Releases stored carbon as CO₂ and destroys habitats.'], ['What is mycoprotein?', 'Protein-rich food made from the fungus Fusarium, grown in fermenters.']]),
        questions: [
          multi('Which help maintain biodiversity?', ['Breeding programmes for endangered species', 'Planting hedgerows', 'Protecting rare habitats'], ['Increasing deforestation', 'Draining peat bogs'], 'Conservation measures protect species and habitats.', { d: 1 }),
          mc('Why does deforestation increase atmospheric CO₂?', ['Fewer trees photosynthesise and burning releases CO₂', 'The cut trees start respiring faster than before', 'The bare soil absorbs more oxygen from the air', 'Cutting trees lowers the temperature of the air'], 'Two effects combine.', { d: 2 }),
        ],
        examQuestions: [examQ('Evaluate the use of tropical forest land to grow crops for biofuels.', 6, SIX(['Biofuels are renewable / reduce fossil fuel use', 'Crops absorb CO₂ as they grow', 'Deforestation reduces biodiversity / habitats destroyed', 'Burning/decay of cleared trees releases CO₂', 'Less land for food crops - food security', 'Justified conclusion']), { meta: '6-mark evaluate', time: 7 })],
      }),
    ],
  },
];
