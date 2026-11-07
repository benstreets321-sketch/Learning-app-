import type { Unit } from '../../types';
import { cards, mc, tf, num, txt, topic, examQ } from '../../dsl';

export const ratioUnit: Unit = {
  id: 'm-ratio', title: 'Ratio, proportion and rates of change', description: 'Around a quarter of Foundation marks - lots of real-life problem solving.',
  topics: [
    topic({
      id: 'm-rat-ratio', title: 'Ratio', summary: 'Simplifying, sharing in a ratio, ratio problems and linking ratio to fractions.',
      notes: `
- **Simplify** by dividing by the HCF: 12 : 18 = 2 : 3. Use the **same units** first (50p : £2 = 50 : 200 = 1 : 4).
- **Unit ratio** 1 : n - divide both by the first number.
- **Share £60 in the ratio 2 : 3** → 5 parts, 1 part = £12 → **£24 and £36**.
- **Given one share**: "ratio 3 : 5, the smaller share is £27" → 1 part = 9 → larger = £45, total = £72.
- **Given the difference**: "ratio 7 : 3, Ali gets £20 more" → 4 parts = £20 → 1 part = £5.
- **Ratio ↔ fraction**: boys : girls = 3 : 4 → boys are **3/7** of the class.
- Combining ratios: a : b = 2 : 3 and b : c = 4 : 5 → make b the same (12): **8 : 12 : 15**.

:::tip Bar models
Draw boxes for the parts - it makes "total", "one share" and "difference" questions clear.
:::
`,
      keyPoints: ['Same units before simplifying', 'Total parts → value of one part', 'Use the information given (total, one share or difference)', 'Ratio a : b → fractions a/(a+b) and b/(a+b)', 'Combine ratios by matching the shared term'],
      generators: ['m-ratio-share'],
      prerequisites: ['m-num-factors'],
      flashcards: cards([['Simplify 45 : 60', '3 : 4'], ['Red : blue = 2 : 5. What fraction is red?', '2/7'], ['Write 4 : 10 in the form 1 : n', '1 : 2.5']]),
      questions: [
        txt('Simplify 36 : 48 : 60', ['3 : 4 : 5', '3:4:5'], 'The highest common factor of 36, 48 and 60 is 12. Divide each part by 12: 3 : 4 : 5.', { d: 2 }),
        num('Share £84 in the ratio 3 : 4. How much is the larger share?', 48, '7 parts → 1 part = £12 → 4 × 12 = £48.', { d: 2, unit: '£' }),
        num('Cats : dogs = 5 : 2 at a shelter. There are 15 more cats than dogs. How many dogs?', 10, 'Difference = 3 parts = 15 → 1 part = 5 → dogs = 10.', { d: 3 }),
        mc('a : b = 3 : 4 and b : c = 2 : 5. Find a : b : c.', ['3 : 4 : 10', '3 : 4 : 5', '6 : 8 : 5', '3 : 2 : 5'], 'Double b : c to 4 : 10 so b matches.', { d: 4 }),
        tf('If boys : girls = 2 : 3, then 2/3 of the class are boys.', false, 'Boys are 2/5 (2 out of 5 parts).', { d: 2 }),
      ],
      workedExamples: [{ title: 'Ratio with a difference', problem: 'Amy and Ben share sweets in the ratio 5 : 3. Amy gets 18 more than Ben. How many sweets are there?', steps: ['Difference = 5 − 3 = 2 parts', '2 parts = 18 → 1 part = 9', 'Total = 8 parts = 72'], answer: '72 sweets', tryIt: 'Paint is mixed red : white = 2 : 7. There is 25 ml more white than red. How much paint in total?', tryAnswer: '5 parts = 25 → 1 part = 5 → 9 parts = 45 ml' }],
    }),
    topic({
      id: 'm-rat-proportion', title: 'Direct and inverse proportion', summary: 'Unitary method, recipes, best buys and proportion equations (Higher).',
      notes: `
## Direct proportion
As one doubles, so does the other. **Unitary method**: find 1, then scale.
> 5 pens cost £3.40 → 1 pen = 68p → 8 pens = **£5.44**
Recipes: multiply every ingredient by (people needed ÷ people in recipe).

## Inverse proportion
As one doubles, the other halves. 4 workers take 6 days → 1 worker takes 24 days → 3 workers take **8 days**.

## Proportion equations (Higher)
| Statement | Equation |
|---|---|
| y ∝ x | y = kx |
| y ∝ x² | y = kx² |
| y ∝ 1/x | y = k/x |
| y ∝ 1/√x | y = k/√x |
Use a given pair to find k, then use the formula.

## Graphs
Direct proportion: straight line **through the origin**. Inverse: reciprocal-shaped curve.
`,
      keyPoints: ['Unitary method: find one first', 'Direct: both scale the same way', 'Inverse: product stays constant', 'Proportion equations: find k first (Higher)', 'Direct proportion graph passes through (0, 0)'],
      generators: ['m-proportion', 'm-best-buy'],
      flashcards: cards([['y ∝ x² as an equation?', 'y = kx²'], ['What does a direct proportion graph look like?', 'A straight line through the origin.'], ['6 people take 4 days. How long for 8 people?', '3 days (6 × 4 = 24 person-days ÷ 8).']]),
      questions: [
        num('A recipe for 4 people uses 300 g of flour. How much flour for 10 people?', 750, '300 ÷ 4 × 10 = 750 g.', { d: 1, unit: 'g' }),
        num('It takes 6 machines 10 hours to do a job. How long would 4 machines take?', 15, '6 × 10 = 60 machine-hours ÷ 4 = 15 hours.', { d: 2, unit: 'hours' }),
        num('y is directly proportional to x². When x = 3, y = 36. Find y when x = 5.', 100, 'k = 36/9 = 4 → y = 4 × 25 = 100.', { d: 4, tier: 'H' }),
        mc('Which graph shows y directly proportional to x?', ['A straight line through the origin', 'A straight line with intercept 3', 'A curve getting closer to the axes', 'A horizontal line'], 'y = kx passes through (0, 0).', { d: 1 }),
      ],
    }),
    topic({
      id: 'm-rat-compound', title: 'Speed, density and pressure (compound measures)', summary: 'Using formula triangles, converting units and travel graphs.',
      notes: `
| Measure | Formula | Units |
|---|---|---|
| Speed | speed = distance ÷ time | km/h, m/s |
| Density | density = mass ÷ volume | g/cm³, kg/m³ |
| Pressure | pressure = force ÷ area | N/m² (Pa) |

:::warn These are NOT on the formulae sheet - learn them.
:::

## Time conversions
- 45 minutes = 45/60 = **0.75 hours**; 2 h 15 min = **2.25 h**. (Not 2.15!)
- km/h → m/s: × 1000 ÷ 3600 (e.g. 72 km/h = 20 m/s).

## Distance-time graphs
- Gradient = **speed**. Flat line = stationary.
## Velocity-time graphs (Higher)
- Gradient = **acceleration**. **Area under the graph = distance**.
`,
      keyPoints: ['speed = distance ÷ time', 'density = mass ÷ volume', 'pressure = force ÷ area', 'Minutes → hours: ÷ 60 (2 h 15 min = 2.25 h)', 'Distance-time gradient = speed; velocity-time area = distance'],
      generators: ['m-speed', 'm-density'],
      flashcards: cards([['Formula for density?', 'density = mass ÷ volume'], ['Formula for pressure?', 'pressure = force ÷ area'], ['1 h 36 min as a decimal of an hour?', '1.6 h'], ['What does the area under a velocity-time graph give?', 'Distance travelled.']]),
      questions: [
        num('A train travels 150 km in 1 hour 15 minutes. Find its average speed in km/h.', 120, '1 h 15 min = 1.25 h → 150 ÷ 1.25 = 120 km/h.', { d: 3, unit: 'km/h', h: ['15 minutes is 0.25 of an hour, not 0.15.'] }),
        num('A force of 600 N acts on an area of 2.5 m². Find the pressure in N/m².', 240, '600 ÷ 2.5 = 240.', { d: 2, unit: 'N/m²' }),
        num('Convert 54 km/h into m/s.', 15, '54 × 1000 ÷ 3600 = 15 m/s.', { d: 3, unit: 'm/s' }),
        tf('On a distance-time graph, a horizontal line means the object is moving at constant speed.', false, 'Horizontal = distance not changing = stationary.', { d: 2 }),
      ],
      examQuestions: [examQ('Metal A has density 8.9 g/cm³; metal B has density 2.7 g/cm³. 200 cm³ of A is mixed with 300 cm³ of B to make an alloy. Find the density of the alloy.', 4, ['M1: mass of A = 8.9 × 200 (= 1780 g)', 'M1: mass of B = 2.7 × 300 (= 810 g)', 'M1: total mass ÷ total volume = 2590 ÷ 500', 'A1: 5.18 g/cm³'], { meta: 'Calculator', time: 5 })],
    }),
    topic({
      id: 'm-rat-rates', title: 'Rates of change and gradients of curves', summary: 'Interpreting gradients, tangents and area under graphs (Higher).', tier: 'H',
      notes: `
- The **gradient** of a graph = rate of change (e.g. litres per minute, metres per second).
- For a **curve**, the gradient at a point is found by drawing a **tangent** and calculating its gradient.
- **Average rate of change** between two points = gradient of the chord joining them.
- **Area under a velocity-time graph** = distance. Estimate under a curve by splitting into **trapezia** (an under- or over-estimate depending on the curve's shape).
- Units of the gradient = y-units per x-unit.
`,
      keyPoints: ['Gradient = rate of change', 'Tangent for instantaneous rate', 'Chord for average rate', 'Area under v-t graph = distance', 'Trapezia to estimate area'],
      flashcards: cards([['How do you find the rate of change at a point on a curve?', 'Draw a tangent and find its gradient.'], ['Units of gradient of a distance (m) - time (s) graph?', 'm/s']]),
      questions: [
        mc('A velocity-time graph has velocity in m/s and time in s. What does its gradient show?', ['Acceleration in m/s²', 'Distance in m', 'Speed in m/s', 'Average speed in m/s'], 'Change in velocity ÷ time = acceleration.', { d: 3, tier: 'H' }),
        num('A car accelerates uniformly from 0 to 20 m/s in 8 s. How far does it travel in that time (area under the graph)?', 80, 'Triangle: ½ × 8 × 20 = 80 m.', { d: 3, tier: 'H', unit: 'm' }),
      ],
    }),
  ],
};
