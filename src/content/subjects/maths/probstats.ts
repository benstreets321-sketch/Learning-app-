import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, txt, topic, examQ } from '../../dsl';

export const probStatsUnit: Unit = {
  id: 'm-probstats', title: 'Probability and statistics', description: 'Probability, averages, charts and data - often accessible marks.',
  topics: [
    topic({
      id: 'm-prob-basics', title: 'Probability basics', summary: 'Probability scale, P(not A), expected outcomes, relative frequency and sample spaces.',
      notes: `
- Probability is between **0** (impossible) and **1** (certain). Write as a fraction, decimal or %.
- P(event) = number of favourable outcomes ÷ total outcomes (if equally likely).
- **P(not A) = 1 − P(A)**. All probabilities in a table add to 1.
- **Expected number** = probability × number of trials.
- **Relative frequency** = frequency ÷ total trials - an **estimate** of probability; more trials → more reliable.
- **Sample space diagrams** list all outcomes (e.g. two dice → 36 outcomes).
- **Fair** vs **biased**: compare relative frequency with theoretical probability.
`,
      keyPoints: ['0 ≤ P ≤ 1', 'P(not A) = 1 − P(A)', 'Probabilities of all outcomes add to 1', 'Expected = P × trials', 'Relative frequency improves with more trials'],
      generators: ['m-prob-basic'],
      flashcards: cards([['P(not A) = ?', '1 − P(A)'], ['Expected frequency formula?', 'Probability × number of trials'], ['How many outcomes when two dice are rolled?', '36']]),
      questions: [
        num('P(rain) = 0.35. What is P(no rain)?', 0.65, '1 − 0.35 = 0.65.', { d: 1 }),
        num('A biased coin lands heads with probability 0.6. How many heads would you expect in 250 throws?', 150, '0.6 × 250 = 150.', { d: 1 }),
        txt('Two fair dice are rolled and the scores added. What is P(total = 7)? Give a fraction in simplest form.', ['1/6', '6/36'], '6 ways out of 36 = 1/6.', { d: 3 }),
        num('In a table, P(red) = 0.2, P(blue) = 0.35, P(green) = x and P(yellow) = 2x. Find x.', 0.15, '0.55 + 3x = 1 → x = 0.15.', { d: 3 }),
        tf('A dice landed on 6 in 9 out of 20 throws, so it is definitely biased.', false, '20 throws is a small sample; it might be biased - more trials are needed.', { d: 2 }),
      ],
    }),
    topic({
      id: 'm-prob-combined', title: 'Combined events: trees and Venn diagrams', summary: 'AND/OR rules, tree diagrams, Venn diagrams and conditional probability.',
      notes: `
- **AND** (independent): multiply. P(A and B) = P(A) × P(B).
- **OR** (mutually exclusive): add. P(A or B) = P(A) + P(B).
- General: P(A or B) = P(A) + P(B) − P(A and B) (on the formula sheet).

## Tree diagrams
Multiply **along** branches; add **between** final outcomes. Each pair of branches adds to 1.
- **Without replacement** (e.g. sweets): the second set of probabilities changes (one fewer on top and bottom).

## Venn diagrams and set notation
- A ∩ B = **intersection** (both); A ∪ B = **union** (either or both); A′ = **not A**; ξ = universal set.
- Fill in from the middle outwards.

## Conditional probability (Higher)
P(A given B) = P(A and B) ÷ P(B). From a Venn diagram or two-way table: restrict to the "given" group.
`,
      keyPoints: ['AND → multiply; OR → add (mutually exclusive)', 'Tree: multiply along, add between', 'Without replacement: change the second fractions', '∩ intersection, ∪ union, A′ complement', 'Conditional: divide by the "given" total (Higher)'],
      generators: ['m-prob-indep', 's-prob-tree'],
      prerequisites: ['m-prob-basics'],
      flashcards: cards([['What does A ∩ B mean?', 'A and B - the intersection.'], ['What does A ∪ B mean?', 'A or B (or both) - the union.'], ['Rule for independent events A and B?', 'P(A and B) = P(A) × P(B)'], ['P(A given B) = ?', 'P(A and B) ÷ P(B)']]),
      questions: [
        num('P(A) = 0.3 and P(B) = 0.5, independent. Find P(A and B).', 0.15, '0.3 × 0.5 = 0.15.', { d: 2 }),
        txt('A bag has 4 red and 6 blue balls. Two are taken without replacement. Find P(both blue) as a fraction in simplest form.', ['1/3', '30/90'], '6/10 × 5/9 = 30/90 = 1/3.', { d: 4 }),
        mc('In a class of 30, 18 study French, 12 study Spanish and 5 study both. How many study neither?', ['5', '0', '7', '10'], '18 + 12 − 5 = 25 study at least one → 30 − 25 = 5.', { d: 3 }),
        txt('Of 50 students, 20 play football; of these, 8 also play tennis. A footballer is picked at random. Find P(plays tennis | plays football).', ['2/5', '8/20', '0.4'], 'Restrict to footballers: 8/20 = 2/5.', { d: 4, tier: 'H' }),
      ],
      examQuestions: [examQ('A bag contains 5 red and 3 green counters. Two counters are taken at random without replacement. Work out the probability that they are **different colours**.', 3, ['M1: 5/8 × 3/7 or 3/8 × 5/7', 'M1: adds both: 15/56 + 15/56', 'A1: 30/56 = 15/28'], { meta: 'Higher · tree diagram', time: 4 })],
    }),
    topic({
      id: 'm-stat-averages', title: 'Averages and spread', summary: 'Mean, median, mode, range; frequency tables and grouped data.',
      notes: `
| Measure | How |
|---|---|
| Mean | total ÷ number of values |
| Median | middle value when ordered (position (n + 1)/2) |
| Mode | most common |
| Range | largest − smallest (spread) |

## Frequency tables
Mean = Σ(f × x) ÷ Σf.

## Grouped data
- **Estimated mean**: use **midpoints**: Σ(f × midpoint) ÷ Σf. (It's an estimate because we don't know exact values.)
- **Modal class**: the class with the highest frequency.
- **Median class**: the class containing the (n + 1)/2-th value.

## Which average?
- Mean uses all values but is affected by **outliers**.
- Median is not affected by extreme values.
- Mode works for non-numerical data.

**Comparing distributions**: always compare an **average** AND a measure of **spread**, in context.
`,
      keyPoints: ['Mean = total ÷ count', 'Median: order first, position (n + 1)/2', 'Frequency table mean = Σfx ÷ Σf', 'Grouped: use midpoints → estimate', 'Compare an average AND the spread, in context'],
      generators: ['m-averages', 'm-freq-mean', 's-grouped-mean'],
      flashcards: cards([['Why is a grouped mean an estimate?', 'Because midpoints are used - the exact values are unknown.'], ['Which average is not affected by outliers?', 'The median.'], ['What two things should you compare between two data sets?', 'An average and a measure of spread (range/IQR).']]),
      questions: [
        num('The mean of 5 numbers is 12. Four of them are 10, 15, 8 and 14. Find the fifth.', 13, 'Total = 60; 60 − 47 = 13.', { d: 3 }),
        num('Find the median of 3, 9, 4, 12, 7, 5', 6, 'Ordered: 3, 4, 5, 7, 9, 12 → (5 + 7)/2 = 6.', { d: 2 }),
        mc('Which average is best for house prices where one mansion costs £5 million?', ['Median', 'Mean', 'Mode', 'Midpoint of the highest and lowest'], 'The median is not distorted by the extreme value.', { d: 2 }),
      ],
    }),
    topic({
      id: 'm-stat-charts', title: 'Charts and graphs', summary: 'Bar charts, pie charts, scatter graphs and correlation; cumulative frequency, box plots and histograms (Higher).',
      notes: `
## Pie charts
Angle = frequency ÷ total × 360°.

## Scatter graphs
- **Correlation**: positive, negative or none. Correlation ≠ causation.
- **Line of best fit**: use for estimates **within** the data range (interpolation). Extrapolation is unreliable.
- An **outlier** doesn't fit the pattern.

## Time series
Look for trend and seasonal patterns.

## Higher: cumulative frequency and box plots
- Plot at **upper class boundaries**; join with a smooth curve.
- Median at n/2, LQ at n/4, UQ at 3n/4. **IQR = UQ − LQ**.
- **Box plot**: min, LQ, median, UQ, max. Compare medians and IQRs.

## Higher: histograms (unequal class widths)
**Frequency density = frequency ÷ class width**. The **area** of each bar = frequency.
`,
      keyPoints: ['Pie angle = f ÷ total × 360°', 'Correlation does not prove causation', 'Interpolate, don\'t extrapolate', 'IQR = UQ − LQ (Higher)', 'Frequency density = frequency ÷ class width (Higher)'],
      flashcards: cards([['Frequency density formula?', 'frequency ÷ class width'], ['What does a box plot show?', 'Minimum, lower quartile, median, upper quartile, maximum.'], ['Why is extrapolation unreliable?', 'The pattern may not continue outside the range of the data.']]),
      questions: [
        num('In a survey of 60 people, 15 chose blue. What angle is blue on a pie chart?', 90, '15/60 × 360 = 90°.', { d: 1, unit: '°' }),
        mc('Taller people tend to have bigger shoe sizes. This is...', ['Positive correlation', 'Negative correlation', 'No correlation', 'Perfect positive correlation'], 'Both increase together.', { d: 1 }),
        num('A class 10 ≤ t < 30 has frequency 40. What is the frequency density?', 2, '40 ÷ 20 = 2.', { d: 3, tier: 'H' }),
        multi('Which statements about lines of best fit are true?', ['They can be used to estimate values within the data range', 'They should follow the trend of the points'], ['They must pass through the origin', 'They prove one variable causes the other'], 'Use for interpolation; correlation isn\'t causation.', { d: 2 }),
        tf('On a cumulative frequency graph, points are plotted at the midpoint of each class.', false, 'They are plotted at the upper class boundary.', { d: 3, tier: 'H' }),
      ],
    }),
  ],
};
