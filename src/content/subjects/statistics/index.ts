import type { Subject, Unit } from '../../types';
import { cards, mc, multi, tf, num, topic, examQ, ord, match } from '../../dsl';

const units: Unit[] = [
  {
    id: 'st-collect', title: 'Planning and collecting data', description: 'The data handling cycle, data types, sampling and questionnaires.',
    topics: [
      topic({
        id: 'st-planning', title: 'The data handling cycle and types of data', summary: 'Hypotheses, planning, variables, and classifying data.',
        notes: `
## The statistical enquiry cycle
1. **Plan**: state a **hypothesis** (a testable statement, e.g. "Year 11 students spend more time on homework than Year 9 students"); decide what data, how much, how to collect it.
2. **Collect** data (primary or secondary).
3. **Process and represent** (tables, diagrams, calculations).
4. **Interpret and discuss** (draw conclusions; is the hypothesis supported?).
5. **Evaluate** (limitations, how to improve) → refine and repeat.

## Types of data
| Type | Meaning | Example |
|---|---|---|
| **Qualitative (categorical)** | Words/categories | Eye colour |
| **Ordinal** | Categories with an order | Survey ratings (poor / good / excellent) |
| **Quantitative - discrete** | Counted, exact values | Number of siblings |
| **Quantitative - continuous** | Measured, any value in a range | Height, time |
| **Bivariate** | Pairs of values for two variables | Height and arm span |
| **Raw data** | Data before processing | |

- **Primary** data: collected yourself (control, but time-consuming). **Secondary**: someone else's (cheap, may be unreliable/out of date).
- Variables: **explanatory (independent)** and **response (dependent)**; **extraneous** variables must be controlled.
- A **pilot study** tests the method on a small scale first to find problems.
`,
        keyPoints: ['Cycle: plan → collect → process → interpret → evaluate', 'A hypothesis is a testable statement', 'Qualitative vs quantitative; discrete vs continuous', 'Primary vs secondary data', 'Explanatory vs response variables; control extraneous ones', 'Pilot study tests the method'],
        flashcards: cards([['What is a hypothesis?', 'A testable statement about what you expect to find.'], ['Discrete vs continuous data?', 'Discrete can only take certain (counted) values; continuous can take any value in a range (measured).'], ['What is a pilot study?', 'A small-scale trial of an investigation to find and fix problems before the main study.'], ['What is an extraneous variable?', 'A variable that is not being investigated but could affect the results, so must be controlled.'], ['What is bivariate data?', 'Data with two variables measured for each item.']]),
        questions: [
          match('Classify each type of data.', [['Shoe size', 'Discrete'], ['Time to run 100 m', 'Continuous'], ['Favourite colour', 'Qualitative'], ['Hotel star rating', 'Ordinal']], 'Shoe sizes come in set values (even halves).', { d: 2 }),
          ord('Put the stages of the data handling cycle in order.', ['Plan and write a hypothesis', 'Collect data', 'Process and represent data', 'Interpret results', 'Evaluate'], 'Then refine and repeat.', { d: 1 }),
          tf('A hypothesis should be a question.', false, 'It is a statement that can be tested.', { d: 1 }),
        ],
      }),
      topic({
        id: 'st-sampling', title: 'Populations, sampling methods and bias', summary: 'Census vs sample, random, systematic, stratified, quota, cluster, convenience, and capture-recapture.',
        notes: `
- **Population**: everyone/everything in the group of interest. **Census**: data from the whole population (accurate but costly). **Sample**: part of the population (cheaper, quicker, but may be **biased**).
- **Sampling frame**: a list of the population to choose from.

| Method | How | ✓ / ✗ |
|---|---|---|
| **Simple random** | Every member has an equal chance (number them, random number generator) | Unbiased / needs a sampling frame |
| **Systematic** | Every kth item from a random start (k = population ÷ sample size) | Simple / may follow a pattern |
| **Stratified** | Sample each group in proportion to its size | Representative / needs group info |
| **Quota** | Interviewer fills quotas for groups (non-random) | Quick, no frame / interviewer bias |
| **Cluster** | Randomly choose whole groups (clusters) | Cheap for spread-out populations / less representative |
| **Convenience (opportunity)** | Whoever is available | Easy / very biased |
| **Self-selected** | Volunteers | Easy / biased (only keen people) |

**Stratified sample size** for a group = (group size ÷ population) × sample size.

**Capture-recapture (Petersen)**: N = Mn ÷ m (M marked first, n caught second, m marked in second). Assumptions: closed population, marks not lost, random mixing, equal chance of capture.
`,
        keyPoints: ['Census = whole population; sample = part', 'Random: equal chance; needs a sampling frame', 'Systematic: every kth item', 'Stratified: proportional groups', 'Quota and convenience are non-random → bias', 'Petersen N = Mn ÷ m'],
        generators: ['s-stratified', 's-capture'],
        flashcards: cards([['What is a sampling frame?', 'A list of all members of the population from which a sample is taken.'], ['Stratified sample formula?', '(Size of group ÷ population size) × sample size'], ['Difference between quota and stratified sampling?', 'Both use groups, but quota sampling is not random - the interviewer chooses who to ask.'], ['Petersen capture-recapture formula?', 'N = Mn ÷ m'], ['Advantage of a census?', 'Uses the whole population so it is completely representative (no sampling error).']]),
        questions: [
          mc('Which method gives every member of the population an equal chance of selection?', ['Simple random sampling', 'Quota sampling', 'Convenience sampling', 'Self-selected sampling'], 'Random = equal chance.', { d: 1 }),
          num('A school has 300 boys and 200 girls. A stratified sample of 50 is taken. How many girls?', 20, '200 ÷ 500 × 50 = 20.', { d: 2 }),
          num('40 fish are tagged. Later 50 are caught and 8 are tagged. Estimate the population.', 250, '40 × 50 ÷ 8 = 250.', { d: 2 }),
          tf('Systematic sampling chooses every kth item after a random start.', true, 'k = population size ÷ sample size.', { d: 1 }),
        ],
      }),
      topic({
        id: 'st-questionnaires', title: 'Questionnaires, interviews and experiments', summary: 'Designing good questions, avoiding bias, and types of experiment.',
        notes: `
## Good questionnaire questions
- Clear and relevant; **not leading** ("Don't you agree that...?" is leading).
- **Closed questions** with **response boxes** that **don't overlap** and **cover all options** (include "other"/"more than"), with a **time frame** ("per week").
- Open questions give detail but are hard to analyse.
- Sensitive questions (age, income) can use ranges; **anonymity** encourages honesty.

## Interviews
✓ Can explain questions, higher response rate ✗ interviewer bias, time-consuming, less anonymous.

## Experiments
- **Laboratory**: controlled conditions; easy to replicate but may be artificial.
- **Field**: real-world setting; more natural but harder to control.
- **Natural**: no control over the explanatory variable (it occurs naturally).
- Use **control groups** and **matched pairs** to compare fairly.

## Cleaning data
Remove or correct errors, missing values and impossible entries (e.g. age 300); check outliers.
`,
        keyPoints: ['Avoid leading questions', 'Non-overlapping, exhaustive response boxes with a time frame', 'Open vs closed questions', 'Lab, field and natural experiments', 'Control groups and matched pairs', 'Clean data before analysing'],
        flashcards: cards([['What is a leading question?', 'A question that encourages a particular answer.'], ['Two features of good response boxes?', 'No overlaps and cover all possible answers (plus a time frame).'], ['Lab vs field experiment?', 'Lab: controlled, artificial setting. Field: real-world, harder to control.'], ['What is data cleaning?', 'Identifying and correcting or removing errors and missing values before analysis.']]),
        questions: [
          mc('Which is a problem with these response boxes: 0-2 hours, 2-4 hours, 4-6 hours?', ['They overlap and miss "more than 6 hours", with no time frame', 'They are too detailed', 'They are open questions', 'There is no problem'], 'Where does exactly 2 go? What about 7 hours? Per day or week?', { d: 2 }),
          mc('"Don\'t you agree that school starts too early?" This question is...', ['Leading', 'Closed and fair', 'Open', 'Anonymous'], 'It pushes towards "yes".', { d: 1 }),
        ],
      }),
    ],
  },
  {
    id: 'st-process', title: 'Processing, representing and analysing data', description: 'Diagrams, averages, spread, outliers and skew.',
    topics: [
      topic({
        id: 'st-diagrams', title: 'Statistical diagrams', summary: 'Bar charts, pie charts, stem and leaf, population pyramids, choropleth maps, histograms, cumulative frequency and box plots.',
        notes: `
| Diagram | Best for |
|---|---|
| **Bar chart** (composite / multiple) | Comparing categories |
| **Pie chart** | Proportions of a whole (angle = f ÷ total × 360°); comparative pie charts use area ∝ total |
| **Stem and leaf** (back-to-back) | Small data sets - keeps raw data; easy median |
| **Population pyramid** | Age/gender structure |
| **Choropleth map** | Data by geographical region using shading |
| **Frequency polygon** | Comparing grouped distributions (plot at midpoints) |
| **Histogram** | Continuous grouped data; **frequency density = frequency ÷ class width**; area = frequency |
| **Cumulative frequency** | Estimating median, quartiles, percentiles (plot at upper class boundaries) |
| **Box plot** | Comparing medians and spread (min, LQ, median, UQ, max) |
| **Scatter diagram** | Bivariate data |

## Misleading diagrams
Look for: axes not starting at 0, uneven scales, 3D effects distorting size, missing labels, pictograms with unequal symbols.
`,
        keyPoints: ['Choose the diagram to suit the data', 'Pie: angle = f ÷ total × 360°', 'Histogram: frequency density = f ÷ class width', 'Cumulative frequency at upper boundaries', 'Box plot: five-number summary', 'Spot misleading graphs'],
        flashcards: cards([['Frequency density formula?', 'Frequency ÷ class width'], ['What does the area of a histogram bar represent?', 'The frequency.'], ['What is a choropleth map?', 'A map shaded to show data values in different regions.'], ['Where are points plotted on a cumulative frequency graph?', 'At the upper class boundaries.'], ['Five values shown on a box plot?', 'Minimum, lower quartile, median, upper quartile, maximum.']]),
        questions: [
          num('A histogram bar for 20 ≤ x < 50 has frequency density 4. What is the frequency?', 120, 'f = fd × width = 4 × 30 = 120.', { d: 3 }),
          mc('Which diagram is best for showing how unemployment rates vary across counties?', ['Choropleth map', 'Stem and leaf', 'Box plot', 'Frequency polygon'], 'Geographical data.', { d: 1 }),
          multi('Which features can make a graph misleading?', ['Vertical axis not starting at zero', 'Uneven scale', '3D effects'], ['A clear title', 'Labelled axes'], 'Distort the visual impression.', { d: 1 }),
        ],
      }),
      topic({
        id: 'st-averages', title: 'Averages', summary: 'Mean, median, mode; from tables and grouped data; weighted mean; choosing an average.',
        notes: `
- **Mean** = Σx ÷ n; from a table Σfx ÷ Σf; **estimated mean** for grouped data uses midpoints.
- **Median** = middle value (position (n + 1)/2); **mode** = most common.
- **Weighted mean** = Σ(weight × value) ÷ Σweights (e.g. coursework 40%, exam 60%).
- **Geometric mean** (Higher, Edexcel) = ⁿ√(x₁ × x₂ × ... × xₙ) - for growth rates.

| Average | ✓ | ✗ |
|---|---|---|
| Mean | Uses all values | Affected by outliers |
| Median | Not affected by outliers | Doesn't use all values |
| Mode | Works for qualitative data | May not exist or be unrepresentative |
`,
        keyPoints: ['Mean = Σx/n; table mean = Σfx/Σf', 'Grouped mean uses midpoints (estimate)', 'Median position (n + 1)/2', 'Weighted mean uses weights', 'Choose the average to suit the data'],
        generators: ['m-averages', 'm-freq-mean', 's-grouped-mean'],
        flashcards: cards([['Weighted mean formula?', 'Σ(weight × value) ÷ Σ(weights)'], ['Which average suits qualitative data?', 'The mode.'], ['Why is a grouped mean only an estimate?', 'Midpoints are used because the exact values are unknown.']]),
        questions: [
          num('Coursework (weight 40%) = 70, exam (weight 60%) = 55. Calculate the weighted mean.', 61, '0.4 × 70 + 0.6 × 55 = 28 + 33 = 61.', { d: 2 }),
          mc('Which average is most affected by an outlier?', ['Mean', 'Median', 'Mode', 'None'], 'Every value contributes to the mean.', { d: 1 }),
        ],
      }),
      topic({
        id: 'st-spread', title: 'Measures of spread, outliers and skewness', summary: 'Range, IQR, percentiles, standard deviation, outliers and skew.',
        notes: `
- **Range** = max − min (affected by outliers).
- **Quartiles**: LQ at (n + 1)/4, UQ at 3(n + 1)/4 (for listed data). **IQR = UQ − LQ** (middle 50%, not affected by outliers).
- **Interpercentile range**, e.g. 10th to 90th percentile; **interdecile range**.
- **Standard deviation** (σ): average distance from the mean - σ = √(Σx²/n − x̄²). Larger = more spread. (Calculator: statistics mode.)

## Outliers
- **Q1 − 1.5 × IQR** and **Q3 + 1.5 × IQR**.
- Or **mean ± 3 standard deviations** (for approximately normal data).
Check if an outlier is an **error** (remove) or **genuine** (keep but note).

## Skewness
| Shape | Order | Box plot |
|---|---|---|
| **Positive skew** (tail to the right) | mode < median < mean | Q3 − Q2 > Q2 − Q1 |
| **Symmetrical** | mode = median = mean | Equal |
| **Negative skew** (tail to the left) | mean < median < mode | Q2 − Q1 > Q3 − Q2 |
**Pearson's coefficient of skewness** (Higher) = 3(mean − median) ÷ standard deviation.

## Comparing data sets
Always compare **an average AND a measure of spread** in context, e.g. "Group A's median (24 min) was higher than Group B's (19 min), so A generally took longer; A's IQR was smaller (5 vs 9), so A's times were more consistent."
`,
        keyPoints: ['IQR = UQ − LQ; resistant to outliers', 'Standard deviation measures spread about the mean', 'Outliers: beyond Q1 − 1.5×IQR or Q3 + 1.5×IQR (or mean ± 3σ)', 'Positive skew: mean > median > mode', 'Pearson skewness = 3(mean − median) ÷ σ', 'Compare an average AND spread in context'],
        generators: ['s-quartiles', 's-std-dev', 's-outlier', 's-skew'],
        flashcards: cards([['IQR formula?', 'Upper quartile − lower quartile'], ['Outlier test using quartiles?', 'Below Q1 − 1.5×IQR or above Q3 + 1.5×IQR.'], ['In positively skewed data, which is largest: mean, median or mode?', 'The mean.'], ['What does a large standard deviation show?', 'The data are widely spread around the mean.'], ['How should you compare two distributions?', 'Compare an average and a measure of spread, in the context of the question.']]),
        questions: [
          num('Q1 = 20, Q3 = 32. What is the upper limit for outliers?', 50, 'IQR = 12 → 32 + 18 = 50.', { d: 3 }),
          mc('A distribution has mean 42, median 38, mode 35. What is its skew?', ['Positive', 'Negative', 'Symmetrical', 'Cannot tell'], 'Mean > median > mode.', { d: 2 }),
          mc('Which measure of spread is NOT affected by extreme values?', ['Interquartile range', 'Range', 'Standard deviation', 'Mean'], 'IQR uses the middle 50%.', { d: 2 }),
        ],
        examQuestions: [examQ('Two classes sat a test. Class A: median 62, IQR 10. Class B: median 58, IQR 22. Compare the distributions of marks.', 4, ['Compares averages: Class A had a higher median so generally scored higher', 'In context (marks)', 'Compares spread: Class A had a smaller IQR so marks were more consistent', 'In context'], { time: 4 })],
      }),
    ],
  },
  {
    id: 'st-relationships', title: 'Correlation, time series and index numbers', description: 'Bivariate data, trends over time and comparing values.',
    topics: [
      topic({
        id: 'st-correlation', title: 'Correlation and regression', summary: 'Scatter diagrams, correlation vs causation, lines of best fit, regression lines and Spearman\'s rank.',
        notes: `
- **Correlation**: positive, negative, none; strong or weak. **Correlation does not imply causation** - there may be a **third (lurking) variable**.
- **Line of best fit**: passes through the **mean point (x̄, ȳ)**.
- **Interpolation** (within data range) is reliable; **extrapolation** (outside) is not.
- **Regression line y = a + bx**: **b** = gradient (y increases by b for each 1 increase in x); **a** = value of y when x = 0 (may be meaningless in context).

## Spearman's rank correlation coefficient
**rₛ = 1 − 6Σd² ÷ n(n² − 1)**. Rank both variables; d = difference in ranks. Value from **−1** (perfect negative) to **+1** (perfect positive); 0 = no correlation. Measures agreement in **ranking** (monotonic).
**PMCC** (Pearson's product moment) measures **linear** correlation - interpret its value (calculator gives it).
`,
        keyPoints: ['Correlation ≠ causation', 'Line of best fit through (x̄, ȳ)', 'Interpolate, don\'t extrapolate', 'y = a + bx: b = gradient, a = intercept', 'Spearman\'s rₛ = 1 − 6Σd²/n(n² − 1)', 'Values range −1 to +1'],
        generators: ['s-spearman', 's-regression'],
        flashcards: cards([['Spearman\'s rank formula?', 'rₛ = 1 − 6Σd² ÷ n(n² − 1)'], ['What point should a line of best fit pass through?', 'The mean point (x̄, ȳ).'], ['What does "b" mean in y = a + bx?', 'The gradient - the change in y for each one-unit increase in x.'], ['Why is extrapolation unreliable?', 'The relationship may not continue outside the range of the data.'], ['What is a lurking variable?', 'A third variable that affects both variables, creating an apparent link.']]),
        questions: [
          mc('rₛ = −0.92 means...', ['Strong negative correlation between the rankings', 'Weak positive correlation', 'No correlation', 'Strong positive correlation'], 'Close to −1.', { d: 2 }),
          tf('Ice cream sales and drownings are positively correlated, so ice cream causes drowning.', false, 'Hot weather (a lurking variable) increases both.', { d: 1 }),
          num('Regression line y = 12 + 3.5x. Estimate y when x = 8.', 40, '12 + 3.5 × 8 = 40.', { d: 1 }),
        ],
      }),
      topic({
        id: 'st-timeseries', title: 'Time series and moving averages', summary: 'Trends, seasonal variation, moving averages and predictions.',
        notes: `
- A **time series** graph shows data over time; look for the **trend** (long-term direction) and **seasonal variation** (regular pattern, e.g. each quarter).
- **Moving average** (e.g. 4-point for quarterly data) smooths out seasonal variation to show the trend. Plot each moving average at the **middle** of its time period.
- **Seasonal variation** for a point = actual value − trend (moving average). **Mean seasonal variation** = average of these for the same season.
- **Prediction**: extend the trend line, then add the mean seasonal variation for that season.
`,
        keyPoints: ['Trend = long-term direction', 'Seasonal variation = regular repeating pattern', 'Moving averages smooth out seasonality', 'Plot moving averages at the midpoint', 'Prediction = trend estimate + mean seasonal variation'],
        generators: ['s-moving-avg'],
        flashcards: cards([['What does a moving average show?', 'The underlying trend with seasonal variation smoothed out.'], ['Seasonal variation formula?', 'Actual value − trend value (moving average).'], ['How do you predict a future value?', 'Read the trend line value and add the mean seasonal variation for that season.']]),
        questions: [
          num('Quarterly sales: 20, 35, 28, 41. Calculate the 4-point moving average.', 31, '(20 + 35 + 28 + 41) ÷ 4 = 31.', { d: 2 }),
          mc('Why use a 4-point moving average for quarterly data?', ['It covers a full year, cancelling out seasonal variation', 'It is easiest to calculate', 'It always increases', 'It shows outliers'], 'One value from each season.', { d: 3 }),
        ],
      }),
      topic({
        id: 'st-index', title: 'Index numbers and rates', summary: 'Simple and chain base index numbers, weighted indices, CPI/RPI, crude and standardised rates.',
        notes: `
- **Index number** = (value in current year ÷ value in base year) × 100. Base year = 100. Index 125 → 25% increase.
- **Chain base** index: compare each year with the **previous year** (×100) - shows year-on-year change.
- **Weighted index**: combine price indices with weights (importance), e.g. a shopping basket.
- **CPI / RPI**: measures of inflation using weighted baskets of goods; **GDP** measures output.
- **Crude rate** (e.g. birth/death rate per 1000) = (number ÷ population) × 1000.
- **Standardised rate** (Higher, Edexcel) adjusts for age structure, using a standard population - allows fair comparison between areas.
`,
        keyPoints: ['Index = current ÷ base × 100', 'Chain base compares with the previous year', 'Weighted index uses importance', 'CPI/RPI measure inflation', 'Crude rate per 1000 = number ÷ population × 1000', 'Standardised rates allow fair comparisons'],
        generators: ['s-index', 's-crude-rate'],
        flashcards: cards([['Index number formula?', '(Current value ÷ base value) × 100'], ['What is a chain base index?', 'Each year compared to the previous year rather than a fixed base year.'], ['Crude death rate formula?', '(Number of deaths ÷ population) × 1000'], ['Why use standardised rates?', 'To compare areas fairly by adjusting for different age structures.']]),
        questions: [
          num('A price rises from £4.00 (base year) to £4.60. Calculate the index number.', 115, '4.60 ÷ 4.00 × 100 = 115.', { d: 1 }),
          mc('An index number of 92 means...', ['An 8% decrease since the base year', 'A 92% increase', 'A 92% decrease', 'An 8% increase'], 'Below 100 = decrease.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'st-prob', title: 'Probability and distributions', description: 'Probability, risk, the binomial and normal distributions, and quality assurance.',
    topics: [
      topic({
        id: 'st-probability', title: 'Probability and risk', summary: 'Probability scale, expected frequency, Venn and tree diagrams, conditional probability and risk.',
        notes: `
- P(A) = favourable ÷ total; P(not A) = 1 − P(A); **expected frequency** = n × P(A).
- **Relative frequency** = estimate of probability from experiments; more trials → more reliable.
- **Mutually exclusive**: P(A or B) = P(A) + P(B). **Independent**: P(A and B) = P(A) × P(B).
- **Venn diagrams**, **two-way tables**, **tree diagrams** (multiply along branches; with/without replacement).
- **Conditional probability** (Higher): P(A | B) = P(A and B) ÷ P(B).
- **Risk**: absolute risk (probability) and relative risk (risk in one group ÷ risk in another).
`,
        keyPoints: ['P(not A) = 1 − P(A)', 'Expected = n × P', 'Mutually exclusive: add; independent: multiply', 'Trees: multiply along branches', 'P(A|B) = P(A and B) ÷ P(B)', 'Relative risk compares two groups'],
        generators: ['s-expected', 's-prob-tree', 'm-prob-basic', 'm-prob-indep'],
        flashcards: cards([['Expected frequency formula?', 'Number of trials × probability'], ['What does mutually exclusive mean?', 'The events cannot happen at the same time.'], ['Conditional probability formula?', 'P(A|B) = P(A and B) ÷ P(B)'], ['What is relative risk?', 'The risk in one group divided by the risk in another group.']]),
        questions: [
          num('P(defect) = 0.04. How many defects would you expect in 2500 items?', 100, '2500 × 0.04 = 100.', { d: 1 }),
          num('Smokers have a risk of 0.12 of a disease; non-smokers 0.03. Calculate the relative risk.', 4, '0.12 ÷ 0.03 = 4.', { d: 3 }),
        ],
      }),
      topic({
        id: 'st-distributions', title: 'The binomial and normal distributions', summary: 'Binomial probabilities, properties of the normal distribution and standardised scores (Higher).', tier: 'H',
        notes: `
## Binomial distribution
For a fixed number of **independent** trials (n), each with two outcomes and constant probability p.
P(X = r) = ⁿCᵣ pʳ (1 − p)ⁿ⁻ʳ. The coefficients come from **Pascal's triangle**.

## Normal distribution
- Bell-shaped, **symmetrical** about the mean; **mean = median = mode**.
- About **68%** of data within **1 SD** of the mean, **95%** within **2 SD**, **99.7%** within **3 SD**.
- Values beyond 3 SD can be treated as outliers.

## Standardised scores
**z = (value − mean) ÷ standard deviation**. Allows comparison across different data sets (e.g. a test with mean 50, SD 10 vs mean 60, SD 5).
`,
        keyPoints: ['Binomial: n independent trials, constant p', 'Normal: symmetrical, mean = median = mode', '68% / 95% / 99.7% within 1 / 2 / 3 SD', 'z = (x − mean) ÷ SD'],
        generators: ['s-binomial'],
        flashcards: cards([['What percentage of normal data lies within 2 standard deviations of the mean?', 'About 95%.'], ['Standardised score formula?', '(Value − mean) ÷ standard deviation'], ['Conditions for a binomial distribution?', 'Fixed number of independent trials, two outcomes, constant probability of success.']]),
        questions: [
          num('A test has mean 60 and SD 8. Calculate the standardised score for a mark of 72.', 1.5, '(72 − 60) ÷ 8 = 1.5.', { d: 3, tier: 'H' }),
          mc('About what percentage of normally distributed data lies within 1 SD of the mean?', ['68%', '95%', '99.7%', '50%'], 'The 68-95-99.7 rule.', { d: 2, tier: 'H' }),
        ],
      }),
      topic({
        id: 'st-quality', title: 'Quality assurance and control charts', summary: 'Control charts with target, warning and action limits (Edexcel).',
        notes: `
**Quality assurance** checks that products meet a target (e.g. bottle volume 500 ml).
- **Control chart**: sample means (or ranges) plotted over time against a **target value**.
- **Warning limits**: target ± 2 SD (of sample means). One point outside → take another sample.
- **Action limits**: target ± 3 SD. A point outside → **stop and adjust** the process.
- Look also for **trends** (several points steadily moving away from the target).
`,
        keyPoints: ['Control charts track sample means over time', 'Warning limits ±2 SD → resample', 'Action limits ±3 SD → stop and adjust', 'Watch for trends towards limits'],
        flashcards: cards([['What should happen if a sample mean is outside the action limits?', 'Stop the process and adjust the machinery.'], ['What are warning limits?', 'Lines usually at target ± 2 standard deviations; a point outside means take another sample.']]),
        questions: [
          mc('A sample mean falls between the warning and action limits. What should happen?', ['Take another sample immediately', 'Stop production', 'Do nothing ever', 'Change the target'], 'Resample to check.', { d: 2 }),
        ],
      }),
    ],
  },
];

const subject: Subject = {
  id: 'statistics',
  name: 'Statistics',
  short: 'Stats',
  icon: 'St',
  color: '#0F7A72',
  qualification: 'GCSE Statistics (Edexcel 1ST0 / AQA 8382)',
  boardNote: 'Content is mapped to both **Edexcel 1ST0** and **AQA 8382** (Foundation and Higher). A few topics (e.g. quality assurance, standardised rates, geometric mean) are Edexcel-specific - check your specification.',
  examNews: [
    'Current specifications continue for 2027 and 2028.',
    '**Edexcel 1ST0**: 2 papers, 1 hour 30 minutes each, 80 marks, 50% each. **AQA 8382**: 2 papers, 1 hour 45 minutes each, 80 marks, 50% each.',
    'A calculator is allowed in all papers - learn to use its statistics mode (mean, SD, regression).',
    'Formulae such as Spearman\'s rank and standard deviation are usually provided on the paper - but you must know how to use and interpret them.',
  ],
  papers: [
    { name: 'Paper 1', time: '1 h 30 (Edexcel) / 1 h 45 (AQA)', marks: 80, weight: '50%', content: 'Any content; includes planning, collecting, processing, interpreting and evaluating.' },
    { name: 'Paper 2', time: '1 h 30 (Edexcel) / 1 h 45 (AQA)', marks: 80, weight: '50%', content: 'Any content.' },
  ],
  commandWords: [
    { word: 'Compare', meaning: 'Compare an average AND a measure of spread, in context.' },
    { word: 'Interpret', meaning: 'Explain what a value or diagram means in the context of the question.' },
    { word: 'Criticise', meaning: 'Identify problems (bias, overlapping boxes, misleading scales) and say why.' },
    { word: 'Justify', meaning: 'Support your conclusion with statistical evidence.' },
    { word: 'Estimate', meaning: 'Use a diagram, sample or grouped data to give an approximate value.' },
  ],
  tools: ['reference'],
  strategies: [
    { title: 'Always answer in context', why: 'Most interpretation marks require you to refer to the situation (e.g. "times", "prices").', how: ['Include units and the context in every comparison.', 'Use "This suggests that..." with the real-world meaning.'] },
    { title: 'Drill the calculations with fresh numbers', why: 'Quartiles, standard deviation, Spearman\'s and moving averages need fluency.', how: ['Use Unlimited calculation practice daily for 10 minutes.', 'Learn your calculator\'s statistics mode.'] },
    { title: 'Learn the enquiry cycle language', why: 'Planning and evaluation questions reward precise vocabulary (bias, sampling frame, extraneous variables).', how: ['Use the flashcards for key terms.', 'Practise "suggest one improvement" questions.'] },
  ],
  stuck: [
    { problem: "I don't know which diagram to use", fixes: ['Categorical → bar/pie; grouped continuous → histogram/frequency polygon; comparing spread → box plots; two variables → scatter.'] },
    { problem: 'My comparisons lose marks', fixes: ['Write two sentences: one comparing an average, one comparing spread.', 'Add context and say what it means (e.g. "more consistent").'] },
    { problem: 'I mix up sampling methods', fixes: ['Random = equal chance; systematic = every kth; stratified = proportional groups; quota = fill groups non-randomly; cluster = random groups.'] },
  ],
  units,
};

export default subject;
