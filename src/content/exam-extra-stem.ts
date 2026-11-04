// Extra exam-style questions for Maths and the sciences, with mark schemes in exam-board style.
// Maths: M = method mark, A = accuracy mark (depends on the M mark), B = independent mark.
// Science: one mark per marking point unless a levels-based scheme is shown.
import type { ExamQuestion } from './types';
import { examQ } from './dsl';

const NC = 'Non-calculator';
const C = 'Calculator allowed';
const H = 'Higher tier';

export const EXAM_STEM: Record<string, ExamQuestion[]> = {
  // ================= MATHS =================
  'm-num-factors': [
    examQ('(a) Write 180 as a product of its prime factors. Give your answer in index form.\n\n(b) Find the highest common factor (HCF) of 180 and 84.', 4, [
      'M1 Correct method for 180: factor tree or repeated division with at least two correct steps',
      'A1 2² × 3² × 5',
      'M1 84 = 2² × 3 × 7, or a Venn diagram / list of factors of both numbers',
      'A1 HCF = 12',
    ], { meta: NC, model: '(a) 180 = 2 × 90 = 2 × 2 × 45 = 2 × 2 × 3 × 15 = 2 × 2 × 3 × 3 × 5 = **2² × 3² × 5**\n\n(b) 84 = 2² × 3 × 7. Common prime factors: 2² × 3 = **12**' }),
  ],
  'm-num-fractions': [
    examQ('Work out 3¼ − 1⅚\n\nGive your answer as a mixed number in its simplest form.', 3, [
      'M1 Converts to improper fractions 13/4 and 11/6 (or subtracts whole numbers and fractions separately)',
      'M1 Correct common denominator, e.g. 39/12 − 22/12',
      'A1 1 5/12',
    ], { meta: NC, model: '13/4 − 11/6 = 39/12 − 22/12 = 17/12 = **1 5/12**' }),
  ],
  'm-num-fdp': [
    examQ('Write these numbers in order of size. Start with the smallest.\n\n0.35   3/8   36%   0.3̇ (0.333…)', 2, [
      'M1 Converts at least three to the same form, e.g. 0.35, 0.375, 0.36, 0.333…',
      'A1 0.3̇, 0.35, 36%, 3/8',
    ], { meta: NC }),
  ],
  'm-num-growth': [
    examQ('Asha invests £4000 in a savings account paying 3.5% compound interest per year.\n\nWork out the value of her investment after 3 years. Give your answer to the nearest penny.', 3, [
      'M1 Uses a multiplier of 1.035 (or finds 3.5% of 4000 = 140 for year 1)',
      'M1 4000 × 1.035³ (or three correct years of interest)',
      'A1 £4434.87',
    ], { meta: C, model: '4000 × 1.035³ = 4000 × 1.108717… = **£4434.87**' }),
  ],
  'm-num-indices': [
    examQ('(a) Simplify fully (3x²y)³\n\n(b) Work out the value of 8^(−2/3)', 4, [
      'B1 27 as the coefficient',
      'B1 x⁶y³',
      'M1 Cube root of 8 = 2, or 8^(2/3) = 4, or reciprocal shown',
      'A1 1/4',
    ], { meta: `${NC} · ${H}`, model: '(a) **27x⁶y³**\n\n(b) 8^(2/3) = (∛8)² = 2² = 4, so 8^(−2/3) = **1/4**' }),
  ],
  'm-num-standard': [
    examQ('Work out (4.2 × 10⁵) × (3 × 10⁻²)\n\nGive your answer in standard form.', 2, [
      'M1 12.6 × 10³ or 12 600',
      'A1 1.26 × 10⁴',
    ], { meta: NC }),
  ],
  'm-num-rounding': [
    examQ('(a) Use suitable approximations to estimate the value of (48.7 × 3.12) ÷ 0.523\n\n(b) The length of a pencil is 6.4 cm, correct to 1 decimal place. Write down the error interval for the length L.', 5, [
      'M1 Rounds at least two numbers correctly to 1 s.f.: 50, 3, 0.5',
      'M1 150 ÷ 0.5',
      'A1 300',
      'B1 6.35 ≤ L (lower bound)',
      'B1 L < 6.45 (upper bound, strict inequality)',
    ], { meta: NC }),
  ],
  'm-num-surds': [
    examQ('(a) Simplify √48 + √27\n\n(b) Rationalise the denominator and simplify 6/√3', 4, [
      'M1 √48 = 4√3 or √27 = 3√3',
      'A1 7√3',
      'M1 Multiplies numerator and denominator by √3: 6√3/3',
      'A1 2√3',
    ], { meta: `${NC} · ${H}` }),
  ],
  'm-num-money': [
    examQ('Pack A has 6 rolls for £2.70. Pack B has 9 rolls for £3.96.\n\nWhich pack is better value for money? You must show your working.', 3, [
      'M1 2.70 ÷ 6 = 0.45 (45p per roll) or an equivalent comparison (e.g. cost of 18 rolls)',
      'M1 3.96 ÷ 9 = 0.44 (44p per roll)',
      'A1 Pack B, with correct figures for both',
    ], { meta: NC }),
  ],
  'm-alg-basics': [
    examQ('(a) Expand and simplify 3(2x − 5) − 2(x − 4)\n\n(b) Factorise fully 12x²y − 18xy²', 4, [
      'M1 Expands at least one bracket correctly (6x − 15 or −2x + 8)',
      'A1 4x − 7',
      'M1 Takes out a correct common factor, e.g. 6x(2xy − 3y²) or 3xy(4x − 6y)',
      'A1 6xy(2x − 3y)',
    ], { meta: NC }),
  ],
  'm-alg-quad-expand': [
    examQ('(a) Factorise x² − 2x − 15\n\n(b) Hence solve x² − 2x − 15 = 0', 3, [
      'M1 (x ± 5)(x ± 3)',
      'A1 (x − 5)(x + 3)',
      'B1 x = 5 and x = −3 (follow through from their factors)',
    ], { meta: NC }),
  ],
  'm-alg-equations': [
    examQ('Solve 5(x − 3) = 2x + 9', 3, [
      'M1 Expands correctly: 5x − 15',
      'M1 Collects terms correctly, e.g. 3x = 24',
      'A1 x = 8',
    ], { meta: NC }),
    examQ('Solve (2x + 1)/3 − (x − 2)/4 = 2', 4, [
      'M1 Multiplies through by 12 (or a common denominator): 4(2x + 1) − 3(x − 2) = 24',
      'M1 Expands correctly: 8x + 4 − 3x + 6 = 24',
      'M1 Collects terms: 5x = 14',
      'A1 x = 14/5 or 2.8',
    ], { meta: NC }),
  ],
  'm-alg-rearrange': [
    examQ('Make x the subject of y = (3x + 2)/(x − 1)', 4, [
      'M1 Multiplies both sides by (x − 1): y(x − 1) = 3x + 2',
      'M1 Expands and collects x terms on one side: xy − 3x = y + 2',
      'M1 Factorises: x(y − 3) = y + 2',
      'A1 x = (y + 2)/(y − 3)',
    ], { meta: H }),
  ],
  'm-alg-inequalities': [
    examQ('(a) Solve 3x + 7 < 22\n\n(b) n is an integer. List all the values of n such that −3 < 2n ≤ 6', 4, [
      'M1 3x < 15',
      'A1 x < 5',
      'M1 −1.5 < n ≤ 3',
      'A1 −1, 0, 1, 2, 3',
    ], { meta: NC }),
  ],
  'm-alg-sequences': [
    examQ('Here are the first four terms of an arithmetic sequence: 5, 9, 13, 17\n\n(a) Find an expression for the nth term.\n\n(b) Is 101 a term of the sequence? Give a reason for your answer.', 4, [
      'B1 4n',
      'B1 + 1 (giving 4n + 1)',
      'M1 Sets 4n + 1 = 101 or continues the sequence correctly',
      'A1 Yes, it is the 25th term (n = 25 is a whole number)',
    ], { meta: NC }),
  ],
  'm-alg-graphs': [
    examQ('A straight line passes through the points (1, 5) and (3, 11).\n\nFind the equation of the line.', 3, [
      'M1 Gradient = (11 − 5) ÷ (3 − 1) = 3',
      'M1 Substitutes a point to find c, e.g. 5 = 3 × 1 + c',
      'A1 y = 3x + 2',
    ], { meta: NC }),
  ],
  'm-alg-simultaneous': [
    examQ('Solve the simultaneous equations\n\n3x + 2y = 16\n\n5x − 2y = 8', 3, [
      'M1 Correct method to eliminate one variable, e.g. adding: 8x = 24',
      'M1 Substitutes their x into one equation, e.g. 9 + 2y = 16',
      'A1 x = 3, y = 3.5',
    ], { meta: NC }),
  ],
  'm-alg-quadratics': [
    examQ('Solve 2x² + 5x − 4 = 0\n\nGive your solutions correct to 2 decimal places.', 3, [
      'M1 Correct substitution into the quadratic formula: (−5 ± √(5² − 4 × 2 × (−4))) / (2 × 2)',
      'M1 Simplifies the discriminant to √57',
      'A1 x = 0.64 and x = −3.14',
    ], { meta: `${C} · ${H}`, model: 'x = (−5 ± √(25 + 32)) / 4 = (−5 ± √57) / 4\n\nx = **0.64** or x = **−3.14** (2 d.p.)' }),
  ],
  'm-alg-functions': [
    examQ('f(x) = 2x + 3 and g(x) = x²\n\n(a) Find fg(3)\n\n(b) Find f⁻¹(x)', 4, [
      'M1 g(3) = 9',
      'A1 fg(3) = 21',
      'M1 Writes y = 2x + 3 and rearranges to x = (y − 3)/2 (or swaps x and y)',
      'A1 f⁻¹(x) = (x − 3)/2',
    ], { meta: `${NC} · ${H}` }),
  ],
  'm-alg-graphs2': [
    examQ('The point P(3, 4) lies on the circle x² + y² = 25.\n\nFind the equation of the tangent to the circle at P.', 3, [
      'M1 Gradient of the radius OP = 4/3',
      'M1 Gradient of the tangent = −3/4 (negative reciprocal)',
      'A1 y = −¾x + 25/4 (or 3x + 4y = 25, or any equivalent)',
    ], { meta: `${NC} · ${H}` }),
  ],
  'm-rat-ratio': [
    examQ('In a school club, the ratio of boys to girls is 3 : 5.\n\nThere are 24 more girls than boys. How many students are in the club?', 3, [
      'M1 Difference of 2 parts = 24',
      'M1 One part = 12',
      'A1 96',
    ], { meta: NC }),
  ],
  'm-rat-proportion': [
    examQ('y is inversely proportional to x².\n\nWhen x = 4, y = 5. Find the value of y when x = 10.', 3, [
      'M1 y = k/x²',
      'M1 k = 80',
      'A1 y = 0.8',
    ], { meta: H }),
  ],
  'm-rat-compound': [
    examQ('A car travels 156 km in 2 hours 24 minutes.\n\nWork out its average speed in km/h.', 3, [
      'M1 2 hours 24 minutes = 2.4 hours (or 144 minutes)',
      'M1 156 ÷ 2.4 (or 156 ÷ 144 × 60)',
      'A1 65 km/h',
    ], { meta: C }),
  ],
  'm-rat-rates': [
    examQ('A tank holds 0.9 m³ of water. Water flows out at 12 litres per minute.\n\nHow long does it take to empty the tank? Give your answer in hours and minutes. (1 m³ = 1000 litres)', 3, [
      'M1 0.9 m³ = 900 litres',
      'M1 900 ÷ 12 = 75 minutes',
      'A1 1 hour 15 minutes',
    ], { meta: C }),
  ],
  'm-geo-angles': [
    examQ('The interior angle of a regular polygon is 156°.\n\nHow many sides does the polygon have?', 3, [
      'M1 Exterior angle = 180 − 156 = 24°',
      'M1 360 ÷ 24',
      'A1 15',
    ], { meta: NC }),
  ],
  'm-geo-area': [
    examQ('A semicircle has a diameter of 10 cm.\n\nWork out the perimeter of the semicircle. Give your answer correct to 1 decimal place.', 3, [
      'M1 π × 10 ÷ 2 (curved part = 15.7…)',
      'M1 Adds the diameter: 15.7… + 10',
      'A1 25.7 cm',
    ], { meta: C }),
  ],
  'm-geo-volume': [
    examQ('A cylinder has radius 4 cm and height 9 cm.\n\nWork out its volume. Give your answer correct to 1 decimal place.', 2, [
      'M1 π × 4² × 9',
      'A1 452.4 cm³',
    ], { meta: C }),
  ],
  'm-geo-pythag': [
    examQ('A ladder 6.5 m long leans against a vertical wall. The foot of the ladder is 2.5 m from the wall on horizontal ground.\n\nHow far up the wall does the ladder reach?', 3, [
      'M1 6.5² − 2.5² (= 42.25 − 6.25)',
      'M1 √36',
      'A1 6 m',
    ], { meta: C }),
  ],
  'm-geo-trig': [
    examQ('In a right-angled triangle the hypotenuse is 12 cm. One angle is 35°.\n\nWork out the length of the side opposite the 35° angle. Give your answer to 3 significant figures.', 3, [
      'M1 sin 35° = x/12',
      'M1 x = 12 × sin 35°',
      'A1 6.88 cm',
    ], { meta: C }),
  ],
  'm-geo-sincos': [
    examQ('In triangle ABC, BC = 8 cm, AC = 11 cm and angle ACB = 52°.\n\nWork out the length of AB. Give your answer to 3 significant figures.', 3, [
      'M1 AB² = 8² + 11² − 2 × 8 × 11 × cos 52°',
      'M1 AB² = 76.6…',
      'A1 8.75 cm',
    ], { meta: `${C} · ${H}` }),
  ],
  'm-geo-circles': [
    examQ('A, B and C are points on a circle with centre O. Angle ABC = 34°, where B is on the circumference and A and C are on the same arc.\n\nFind the size of angle AOC. Give a reason for your answer.', 2, [
      'B1 68°',
      'B1 The angle at the centre is twice the angle at the circumference',
    ], { meta: H }),
  ],
  'm-geo-transform': [
    examQ('Triangle T has vertices at (1, 1), (3, 1) and (1, 2).\n\nT is enlarged by scale factor 2, centre (0, 0), to give triangle U. Write down the coordinates of the vertices of U.', 2, [
      'M1 At least two vertices correct',
      'A1 (2, 2), (6, 2) and (2, 4)',
    ], { meta: NC }),
  ],
  'm-geo-vectors': [
    examQ('a = (3, −2) and b = (−1, 4) as column vectors.\n\nWork out 2a − 3b as a column vector.', 2, [
      'M1 2a = (6, −4) or 3b = (−3, 12)',
      'A1 (9, −16)',
    ], { meta: NC }),
  ],
  'm-prob-basics': [
    examQ('A spinner can land on red, blue or green.\n\nP(red) = 0.35 and P(blue) = 0.4.\n\n(a) Work out P(green).\n\n(b) The spinner is spun 200 times. Work out an estimate for the number of times it lands on green.', 3, [
      'M1 1 − (0.35 + 0.4)',
      'A1 0.25',
      'B1 50 (follow through 200 × their P(green))',
    ], { meta: NC }),
  ],
  'm-prob-combined': [
    examQ('A bag contains 4 red counters and 6 blue counters. Two counters are taken at random without replacement.\n\nWork out the probability that both counters are the same colour.', 4, [
      'M1 4/10 × 3/9 (both red)',
      'M1 6/10 × 5/9 (both blue)',
      'M1 Adds their two products',
      'A1 42/90 = 7/15',
    ], { meta: H }),
  ],
  'm-stat-averages': [
    examQ('The table shows the times taken by 20 students to finish a puzzle.\n\n| Time t (minutes) | Frequency |\n|---|---|\n| 0 < t ≤ 10 | 4 |\n| 10 < t ≤ 20 | 8 |\n| 20 < t ≤ 30 | 6 |\n| 30 < t ≤ 40 | 2 |\n\nWork out an estimate for the mean time.', 4, [
      'M1 Uses midpoints 5, 15, 25, 35',
      'M1 Multiplies midpoints by frequencies: 20, 120, 150, 70',
      'M1 Σfx ÷ Σf = 360 ÷ 20',
      'A1 18 minutes',
    ], { meta: C }),
  ],
  'm-stat-charts': [
    examQ('In a survey, 60 people were asked their favourite sport. 18 chose football.\n\nWork out the angle for football in a pie chart.', 2, [
      'M1 18/60 × 360 (or 360 ÷ 60 = 6° per person)',
      'A1 108°',
    ], { meta: NC }),
  ],

  // ================= BIOLOGY =================
  'bio-cells': [
    examQ('A student views a cheek cell under a microscope. In the drawing the cell is 12 mm wide. The magnification is ×400.\n\nCalculate the real width of the cell in micrometres (µm).', 3, [
      'Real size = image size ÷ magnification (1)',
      '12 ÷ 400 = 0.03 mm (1)',
      '= 30 µm (1)',
    ], { meta: 'AQA Paper 1 style', model: 'real size = 12 ÷ 400 = 0.03 mm = 0.03 × 1000 = **30 µm**' }),
  ],
  'bio-microbes': [
    examQ('Describe how a student should prepare an uncontaminated culture of bacteria on an agar plate.', 4, [
      'Sterilise the Petri dish and agar before use (e.g. in an autoclave) (1)',
      'Sterilise the inoculating loop by passing it through a Bunsen flame (and let it cool) (1)',
      'Lift the lid only slightly / work near a Bunsen flame to reduce microbes falling in (1)',
      'Secure the lid with two pieces of tape, not sealed all round, and store upside down (1)',
      'Incubate at no higher than 25 °C (to avoid growing pathogens) (1)',
      'Max 4 marks',
    ], { meta: 'AQA Biology Paper 1 · Biology only' }),
  ],
  'bio-health': [
    examQ('Explain the difference between a communicable disease and a non-communicable disease. Give one example of each.', 3, [
      'Communicable diseases are caused by pathogens and can be spread between people or animals (1)',
      'Non-communicable diseases are not caused by pathogens / cannot be passed from person to person (1)',
      'Correct examples of both, e.g. measles/HIV/salmonella and coronary heart disease/type 2 diabetes/cancer (1)',
    ], { meta: 'AQA Paper 1 style' }),
  ],
  'bio-plants': [
    examQ('Explain how an increase in temperature and an increase in wind speed affect the rate of transpiration.', 4, [
      'Higher temperature increases the rate of transpiration (1)',
      'Water molecules have more kinetic energy so evaporate and diffuse out of the stomata faster (1)',
      'Wind increases the rate of transpiration (1)',
      'Wind removes water vapour from around the leaf, keeping a steep concentration gradient for diffusion (1)',
    ], { meta: 'AQA Paper 1 style' }),
  ],
  'bio-pathogens': [
    examQ('Measles is a viral disease. Describe how measles is spread and two ways its spread can be reduced.', 3, [
      'Spread by inhaling droplets from an infected person\'s sneezes or coughs (1)',
      'Vaccination (of young children) (1)',
      'Isolating infected people (1)',
    ], { meta: 'AQA Paper 1 style' }),
  ],
  'bio-mab': [
    examQ('Describe how monoclonal antibodies are produced.', 4, [
      'A mouse is injected with the chosen antigen (1)',
      'Lymphocytes that make the specific antibody are collected from the mouse (1)',
      'The lymphocytes are combined with a tumour (myeloma) cell to make a hybridoma cell (1)',
      'The hybridoma cell divides/is cloned to make many identical cells that produce the antibody, which is collected and purified (1)',
    ], { meta: 'AQA Biology Paper 1 · Biology only' }),
  ],
  'bio-respiration': [
    examQ('Compare aerobic respiration and anaerobic respiration in human muscle cells.', 4, [
      'Aerobic uses oxygen; anaerobic does not (1)',
      'Aerobic produces carbon dioxide and water; anaerobic produces lactic acid (1)',
      'Aerobic transfers much more energy per glucose molecule (1)',
      'Anaerobic leads to an oxygen debt that must be repaid after exercise (1)',
    ], { meta: 'AQA Paper 1 style', guidance: ['"Compare" means give similarities or differences - each point should mention BOTH types.'] }),
  ],
  'bio-nervous': [
    examQ('Explain why a reflex action is faster than a voluntary (conscious) response.', 3, [
      'The impulse does not pass through the conscious part of the brain (1)',
      'It passes through a relay neurone in the spinal cord (or unconscious part of the brain) (1)',
      'Fewer neurones/synapses, so the pathway is shorter (1)',
    ], { meta: 'AQA Paper 2 style' }),
  ],
  'bio-reproduction-h': [
    examQ('Describe the roles of FSH and LH in the menstrual cycle.', 4, [
      'FSH is released by the pituitary gland (1)',
      'FSH causes an egg to mature in the ovary (1)',
      'FSH stimulates the ovaries to produce oestrogen (1)',
      'LH (from the pituitary) stimulates ovulation / release of the egg (1)',
    ], { meta: 'AQA Paper 2 · Higher tier' }),
  ],
  'bio-kidney': [
    examQ('A person has been exercising on a hot day and has lost a lot of water by sweating. Explain how the body reduces the amount of water lost in urine.', 4, [
      'The brain/hypothalamus detects that blood water concentration is too low (1)',
      'The pituitary gland releases more ADH into the blood (1)',
      'ADH makes the kidney tubules more permeable to water (1)',
      'More water is reabsorbed into the blood, so a smaller volume of concentrated urine is produced (1)',
    ], { meta: 'AQA Biology Paper 2 · Biology only (Higher)' }),
  ],
  'bio-dna': [
    examQ('Describe the structure of DNA.', 3, [
      'A polymer made of two strands (1)',
      'Forming a double helix (1)',
      'Made of repeating nucleotide units: a sugar, a phosphate and one of four bases (A, T, C, G) (1)',
      'Complementary base pairs: A with T, C with G (1)',
      'Max 3 marks',
    ], { meta: 'AQA Paper 2 style' }),
  ],
  'bio-genetics': [
    examQ('Cystic fibrosis is caused by a recessive allele (f). Two parents are both carriers (Ff).\n\nUse a Punnett square to work out the probability that their child will have cystic fibrosis.', 4, [
      'Correct gametes for both parents: F and f (1)',
      'Correct Punnett square offspring: FF, Ff, Ff, ff (1)',
      'Identifies ff as the genotype with cystic fibrosis (1)',
      'Probability = 1/4, 0.25, 25% or 1 in 4 (1)',
    ], { meta: 'AQA Paper 2 style', guidance: ['Do not write "1 : 3" as a probability - that is a ratio.'] }),
  ],
  'bio-classification': [
    examQ('Carl Woese proposed the three-domain system of classification. Name the three domains and explain why the system was introduced.', 3, [
      'Archaea, Bacteria and Eukaryota (all three for 1 mark) (1)',
      'New evidence from chemical analysis / microscopes (1)',
      'Showed archaea are a separate group from true bacteria (organisms previously thought to be bacteria are very different) (1)',
    ], { meta: 'AQA Paper 2 style' }),
  ],
  'bio-cycles': [
    examQ('Describe how carbon from the carbon dioxide in the air becomes part of an animal\'s body and is then returned to the air.', 6, [
      'Level 3 (5-6 marks): A clear, detailed and logically ordered account covering photosynthesis, feeding, respiration and decay, linked into a cycle.',
      'Level 2 (3-4 marks): Several relevant stages described, mostly in a logical order, with some links between them.',
      'Level 1 (1-2 marks): Simple relevant statements with little linking.',
      'Indicative content: plants absorb CO₂ for photosynthesis; carbon becomes glucose/carbohydrates/proteins in the plant; animals eat plants; carbon becomes part of animal tissues; animals respire, releasing CO₂; dead animals and waste are decayed by microorganisms (decomposers), which respire and release CO₂; combustion of fossil fuels releases CO₂.',
    ], { meta: 'AQA Paper 2 · 6-mark extended response' }),
  ],

  // ================= CHEMISTRY =================
  'chem-atoms': [
    examQ('Describe how the plum pudding model of the atom was replaced by the nuclear model.', 4, [
      'The plum pudding model: a ball of positive charge with negative electrons embedded in it (1)',
      'Alpha particles were fired at thin gold foil (Rutherford/Geiger/Marsden) (1)',
      'Most particles passed straight through, so most of the atom is empty space (1)',
      'Some were deflected or bounced back, so the mass and positive charge are concentrated in a small nucleus (1)',
    ], { meta: 'AQA Paper 1 style' }),
  ],
  'chem-bonding': [
    examQ('Explain why sodium chloride has a high melting point.', 3, [
      'Sodium chloride has a giant ionic lattice (1)',
      'There are strong electrostatic forces of attraction between oppositely charged ions (1)',
      'A lot of energy is needed to overcome these forces (1)',
    ], { meta: 'AQA Paper 1 style', guidance: ['Do not mention "intermolecular forces" or "covalent bonds" - sodium chloride is ionic.'] }),
  ],
  'chem-moles': [
    examQ('Calcium carbonate decomposes when heated:\n\nCaCO₃ → CaO + CO₂\n\nCalculate the mass of calcium oxide made from 25 g of calcium carbonate.\n\nRelative atomic masses (Aᵣ): Ca = 40, C = 12, O = 16', 4, [
      'Mᵣ CaCO₃ = 100 and Mᵣ CaO = 56 (1)',
      'Moles of CaCO₃ = 25 ÷ 100 = 0.25 mol (1)',
      '1 : 1 ratio, so 0.25 mol of CaO (1)',
      'Mass = 0.25 × 56 = 14 g (1)',
    ], { meta: 'AQA Paper 1 · Higher tier', model: 'Mᵣ(CaCO₃) = 40 + 12 + 3 × 16 = 100; Mᵣ(CaO) = 56\n\nmoles CaCO₃ = 25 ÷ 100 = 0.25 → 0.25 mol CaO → 0.25 × 56 = **14 g**' }),
  ],
  'chem-reactivity': [
    examQ('Zinc is added to copper sulfate solution.\n\n(a) Explain why a reaction happens.\n\n(b) Write the ionic equation for the reaction.\n\n(c) Explain which species is oxidised.', 4, [
      'Zinc is more reactive than copper, so it displaces copper (1)',
      'Zn + Cu²⁺ → Zn²⁺ + Cu (1)',
      'Zinc is oxidised (1)',
      'because it loses electrons (Zn → Zn²⁺ + 2e⁻) (1)',
    ], { meta: 'AQA Paper 1 · Higher tier' }),
  ],
  'chem-acids': [
    examQ('Describe how to make a pure, dry sample of copper sulfate crystals from copper oxide and dilute sulfuric acid.', 6, [
      'Level 3 (5-6 marks): A coherent method in a logical order that would produce pure, dry crystals, including excess base, filtration, evaporation and crystallisation.',
      'Level 2 (3-4 marks): Most key steps described, possibly with minor omissions or slightly out of order.',
      'Level 1 (1-2 marks): Some relevant steps, but the method would not produce crystals.',
      'Indicative content: warm the dilute sulfuric acid; add copper oxide a spatula at a time, stirring, until no more reacts (excess); filter to remove the unreacted copper oxide; heat the filtrate in an evaporating basin to evaporate some water; leave to cool and crystallise; pat the crystals dry with filter paper.',
    ], { meta: 'AQA Paper 1 · Required practical · 6-mark extended response' }),
  ],
  'chem-energychanges': [
    examQ('Hydrogen reacts with chlorine: H–H + Cl–Cl → 2 H–Cl\n\nBond energies (kJ/mol): H–H 436, Cl–Cl 243, H–Cl 432\n\nCalculate the overall energy change and state whether the reaction is exothermic or endothermic.', 4, [
      'Energy to break bonds = 436 + 243 = 679 kJ/mol (1)',
      'Energy released making bonds = 2 × 432 = 864 kJ/mol (1)',
      'Energy change = 679 − 864 = −185 kJ/mol (1)',
      'Exothermic, because more energy is released making bonds than is used breaking them (1)',
    ], { meta: 'AQA Paper 1 · Higher tier' }),
  ],
  'chem-equilibrium': [
    examQ('The Haber process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g). The forward reaction is exothermic.\n\nExplain the effect on the yield of ammonia of (a) increasing the pressure and (b) increasing the temperature.', 4, [
      '(a) Yield increases (1)',
      'because the equilibrium shifts to the side with fewer molecules of gas (4 → 2) (1)',
      '(b) Yield decreases (1)',
      'because the equilibrium shifts in the endothermic (backward) direction (1)',
    ], { meta: 'AQA Paper 2 · Higher tier' }),
  ],
  'chem-crude': [
    examQ('Describe how crude oil is separated into fractions by fractional distillation.', 4, [
      'Crude oil is heated and evaporated/vaporised (1)',
      'The column is hot at the bottom and cooler at the top (temperature gradient) (1)',
      'Vapours rise and condense at different heights according to their boiling points (1)',
      'Larger molecules with higher boiling points condense near the bottom; smaller ones near the top (1)',
    ], { meta: 'AQA Paper 2 style' }),
  ],
  'chem-organic2': [
    examQ('Compare addition polymerisation and condensation polymerisation.', 4, [
      'Addition polymers form from monomers with a C=C double bond (alkenes) (1)',
      'Condensation polymers form from monomers with two functional groups (e.g. a diol and a dicarboxylic acid) (1)',
      'Addition polymerisation forms only one product (the polymer) (1)',
      'Condensation polymerisation also produces a small molecule such as water (1)',
    ], { meta: 'AQA Chemistry Paper 2 · Chemistry only' }),
  ],
  'chem-resources': [
    examQ('Describe how fresh water from a lake or river is made into potable (drinking) water in the UK.', 3, [
      'Choose a suitable source of fresh water (1)',
      'Pass it through filter beds to remove solids (1)',
      'Sterilise it, e.g. with chlorine, ozone or ultraviolet light, to kill microbes (1)',
    ], { meta: 'AQA Paper 2 style' }),
  ],

  // ================= PHYSICS =================
  'phys-stores': [
    examQ('A crane lifts a 250 kg load through a height of 12 m in 20 s.\n\n(a) Calculate the gain in gravitational potential energy. (g = 9.8 N/kg)\n\n(b) Calculate the useful power output of the crane.', 4, [
      'Eₚ = m g h = 250 × 9.8 × 12 (1)',
      '= 29 400 J (1)',
      'P = E ÷ t = 29 400 ÷ 20 (1)',
      '= 1470 W (allow follow-through from (a)) (1)',
    ], { meta: 'AQA Paper 1 style' }),
  ],
  'phys-mains': [
    examQ('Describe the functions of the live, neutral and earth wires in a three-core cable.', 3, [
      'Live (brown) carries the alternating potential difference (about 230 V) from the supply (1)',
      'Neutral (blue) completes the circuit and is at or close to 0 V (1)',
      'Earth (green and yellow) is a safety wire that only carries current if there is a fault, preventing the casing becoming live (1)',
    ], { meta: 'AQA Paper 1 style' }),
  ],
  'phys-static': [
    examQ('A student rubs a polythene rod with a cloth and the rod becomes negatively charged. Explain why.', 3, [
      'Friction transfers electrons (1)',
      'Electrons move from the cloth to the rod (1)',
      'The rod has gained electrons, which are negative, so it is negatively charged (and the cloth becomes positive) (1)',
    ], { meta: 'AQA Physics Paper 1 · Physics only', guidance: ['Only electrons move - never write that "positive charges" move.'] }),
  ],
  'phys-particles': [
    examQ('Describe a method to find the density of an irregularly shaped stone.', 4, [
      'Measure the mass with a balance (1)',
      'Fill a displacement (eureka) can with water to the spout (1)',
      'Lower in the stone and measure the volume of water displaced with a measuring cylinder (= volume of the stone) (1)',
      'Density = mass ÷ volume (1)',
    ], { meta: 'AQA Paper 1 · Required practical' }),
  ],
  'phys-radiation': [
    examQ('A radioactive isotope has a half-life of 6 hours. A sample has an activity of 800 Bq.\n\nCalculate the activity after 24 hours.', 3, [
      '24 ÷ 6 = 4 half-lives (1)',
      '800 → 400 → 200 → 100 → 50 (1)',
      '50 Bq (1)',
    ], { meta: 'AQA Paper 1 style' }),
  ],
  'phys-nuclear': [
    examQ('Describe what happens during nuclear fission and how a chain reaction occurs.', 4, [
      'A neutron is absorbed by a large nucleus such as uranium-235 (1)',
      'The nucleus becomes unstable and splits into two smaller nuclei (daughter nuclei) (1)',
      'Two or three neutrons are released, along with energy/gamma radiation (1)',
      'These neutrons can be absorbed by other uranium nuclei, causing further fissions - a chain reaction (1)',
    ], { meta: 'AQA Physics Paper 1 · Physics only' }),
  ],
  'phys-force-basics': [
    examQ('A box of mass 15 kg is pulled across the floor with a force of 60 N. The friction force is 24 N.\n\n(a) Calculate the resultant force.\n\n(b) Calculate the acceleration of the box.\n\n(c) Calculate the weight of the box. (g = 9.8 N/kg)', 4, [
      'Resultant force = 60 − 24 = 36 N (1)',
      'a = F ÷ m = 36 ÷ 15 (1)',
      '= 2.4 m/s² (1)',
      'W = m g = 15 × 9.8 = 147 N (1)',
    ], { meta: 'AQA Paper 2 style' }),
  ],
  'phys-motion': [
    examQ('A car accelerates uniformly from rest to 24 m/s over a distance of 96 m.\n\nCalculate the acceleration of the car.', 3, [
      'v² − u² = 2 a s (equation selected from the sheet) (1)',
      '24² − 0² = 2 × a × 96, so 576 = 192 a (1)',
      'a = 3 m/s² (1)',
    ], { meta: 'AQA Paper 2 style' }),
  ],
  'phys-moments': [
    examQ('A uniform plank is balanced on a pivot at its centre. A child weighing 300 N sits 2.0 m from the pivot. How far from the pivot on the other side must a child weighing 400 N sit to balance the plank?', 3, [
      'Clockwise moment = anticlockwise moment (principle of moments) (1)',
      '300 × 2.0 = 400 × d (1)',
      'd = 1.5 m (1)',
    ], { meta: 'AQA Physics Paper 2 · Physics only' }),
  ],
  'phys-em': [
    examQ('Give one use and one danger of (a) microwaves and (b) ultraviolet.', 4, [
      'Microwaves: use, e.g. cooking food or satellite communications (1)',
      'Microwaves: danger, e.g. internal heating of body tissue (1)',
      'Ultraviolet: use, e.g. energy-efficient lamps, sun tanning, detecting forged banknotes (1)',
      'Ultraviolet: danger, e.g. skin to age prematurely or increased risk of skin cancer (1)',
    ], { meta: 'AQA Paper 2 style' }),
  ],
  'phys-wave-props': [
    examQ('A water wave has a frequency of 2.5 Hz and a wavelength of 0.8 m.\n\nCalculate the wave speed, and the time for one complete wave to pass a point.', 3, [
      'v = f λ = 2.5 × 0.8 (1)',
      '= 2.0 m/s (1)',
      'T = 1 ÷ f = 0.4 s (1)',
    ], { meta: 'AQA Paper 2 style' }),
  ],
  'phys-light-sound': [
    examQ('Explain how ultrasound is used to produce an image of an unborn baby.', 3, [
      'Ultrasound waves are partially reflected at a boundary between two different media/tissues (1)',
      'The time taken for the reflections (echoes) to return is measured (1)',
      'This is used to calculate how far away the boundary is, building up an image (1)',
    ], { meta: 'AQA Physics Paper 2 · Physics only' }),
  ],
  'phys-magnetism': [
    examQ('A wire 0.25 m long carries a current of 4.0 A at right angles to a magnetic field of flux density 0.12 T.\n\nCalculate the force on the wire, and give one way to increase the force.', 3, [
      'F = B I l = 0.12 × 4.0 × 0.25 (1)',
      '= 0.12 N (1)',
      'Increase the current, or use a stronger magnet/flux density, or a longer length of wire in the field (1)',
    ], { meta: 'AQA Paper 2 · Higher tier' }),
  ],
};
