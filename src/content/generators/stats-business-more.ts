// More question templates for GCSE Statistics and GCSE Business / BTEC Enterprise, built from what each lesson
// teaches: time series, the normal distribution, index numbers, correlation, sampling, quality control, spread;
// cash flow, financial statements, sources of finance, competition and market research.
import type { Generator, GeneratedQuestion } from '../types';
import { ri, pk, r, f, comma, money } from './helpers';
import { mcq } from './facts-kit';
import { shuffle } from '../../lib/util';

const G = (id: string, title: string, make: Generator['make'], tier?: Generator['tier']): Generator => ({ id, title, make, tier });
const fmt = (x: number) => f(x, 4).replace('-', '−');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const gbp = (x: number) => (x < 0 ? `(£${comma(-x)})` : `£${comma(x)}`);

// =========================== STATISTICS ===========================
function timeSeriesQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['ma3', 'sv', 'predict', 'facts']);
  if (k === 'ma3') {
    const xs = Array.from({ length: 6 }, () => ri(rand, 10, 60));
    const i = ri(rand, 0, 3);
    const ma = (xs[i] + xs[i + 1] + xs[i + 2]) / 3;
    return { q: `Monthly sales were **${xs.join(', ')}**. Calculate the **3-point moving average** for months ${i + 1} to ${i + 3} (2 dp).`, answer: r(ma, 2), tol: 0.006, steps: [`(${xs[i]} + ${xs[i + 1]} + ${xs[i + 2]}) ÷ 3 = ${xs[i] + xs[i + 1] + xs[i + 2]} ÷ 3 = ${fmt(ma)}`, 'Plot it at the middle month of the three (month ' + (i + 2) + ').'], d: 2 };
  }
  if (k === 'sv') {
    const trend = ri(rand, 40, 120) + pk(rand, [0, 0.25, 0.5, 0.75]), actual = ri(rand, 30, 140);
    return { q: `In quarter 3 the actual sales were **${actual}** and the trend (moving average) value was **${trend}**. Calculate the **seasonal variation** for quarter 3.`, answer: r(actual - trend, 2), steps: ['Seasonal variation = actual value − trend value', `${actual} − ${trend} = ${fmt(actual - trend)}`, actual < trend ? 'Negative: this season is usually below the trend.' : 'Positive: this season is usually above the trend.'], d: 3 };
  }
  if (k === 'predict') {
    const tv = ri(rand, 60, 200), msv = ri(rand, -25, 25);
    return { q: `The trend line gives an estimate of **${tv}** for next year's quarter 1. The mean seasonal variation for quarter 1 is **${msv < 0 ? '−' : '+'}${Math.abs(msv)}**. Predict the actual value for next year's quarter 1.`, answer: tv + msv, steps: ['Prediction = trend estimate + mean seasonal variation', `${tv} ${msv < 0 ? '−' : '+'} ${Math.abs(msv)} = ${tv + msv}`], d: 3 };
  }
  const facts: [string, string, string[]][] = [
    ['Where should a moving average be plotted?', 'At the middle of the time periods it covers', ['At the end of the time periods it covers', 'At the start of the time periods it covers', 'At the highest value in the time periods']],
    ['Why is a 4-point moving average used for quarterly data?', 'Each average covers a whole year, so the seasonal pattern cancels out', ['It is quicker to calculate than a 3-point moving average', 'It always gives a straight trend line', 'It removes any outliers from the data']],
    ['What does the trend of a time series show?', 'The general long-term direction of the data', ['The regular pattern that repeats each year', 'The biggest single change between two points', 'The average of the first and last values']],
    ['What is seasonal variation?', 'A regular pattern that repeats over a fixed period, such as each quarter', ['A one-off change caused by an unusual event', 'The long-term upward or downward movement', 'The difference between the highest and lowest values']],
  ];
  const [q, a, w] = pk(rand, facts);
  return mcq(rand, q, a, w, [a + '.'], 2);
}

function normalQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['rule', 'tail', 'z', 'compare', 'shape']);
  const mean = ri(rand, 40, 80), sd = ri(rand, 4, 12);
  if (k === 'rule') {
    const n = pk(rand, [1, 2, 3]);
    const pct = { 1: '68%', 2: '95%', 3: '99.7%' }[n]!;
    return mcq(rand, `Test scores are normally distributed with mean **${mean}** and standard deviation **${sd}**. About what percentage of scores lie between **${mean - n * sd}** and **${mean + n * sd}**?`, pct, ['68%', '95%', '99.7%', '50%', '34%', '47.5%'].filter((x) => x !== pct), [`${mean - n * sd} to ${mean + n * sd} is the mean ± ${n} standard deviation${n > 1 ? 's' : ''}.`, 'About 68% lie within 1 SD, 95% within 2 SD and 99.7% within 3 SD.'], 3);
  }
  if (k === 'tail') {
    const opts: [string, string, string][] = [[`above ${mean + 2 * sd}`, '2.5%', 'Outside ±2 SD is 5%, split equally between the two tails: 2.5% above.'], [`between ${mean} and ${mean + sd}`, '34%', 'Half of the 68% within ±1 SD.'], [`below ${mean - sd}`, '16%', 'Outside ±1 SD is 32%; half of that (16%) is below.'], [`between ${mean} and ${mean + 2 * sd}`, '47.5%', 'Half of the 95% within ±2 SD.']];
    const [range, ans, why] = pk(rand, opts);
    return mcq(rand, `Heights are normally distributed with mean **${mean} cm** and standard deviation **${sd} cm**. About what percentage are **${range} cm**?`, ans, ['2.5%', '34%', '16%', '47.5%', '5%', '68%', '95%'].filter((x) => x !== ans), [why, 'Use 68% within 1 SD and 95% within 2 SD, and the symmetry of the curve.'], 4);
  }
  if (k === 'z') {
    const x = mean + pk(rand, [-2, -1.5, -1, -0.5, 0.5, 1, 1.25, 1.5, 2, 2.5]) * sd;
    return { q: `A test has mean **${mean}** and standard deviation **${sd}**. Calculate the **standardised score** for a mark of **${fmt(x)}**.`, answer: r((x - mean) / sd, 2), steps: ['Standardised score = (value − mean) ÷ standard deviation', `(${fmt(x)} − ${mean}) ÷ ${sd} = ${fmt((x - mean) / sd)}`], d: 3 };
  }
  if (k === 'compare') {
    const m2 = ri(rand, 40, 80), s2 = ri(rand, 4, 12);
    const za = pk(rand, [0.5, 1, 1.5, 2]), zb = pk(rand, [0.25, 0.75, 1.25, 1.75]);
    const xa = mean + za * sd, xb = m2 + zb * s2;
    const better = za > zb ? 'Maths' : 'English';
    return mcq(rand, `Asha scored **${fmt(xa)}** in Maths (mean ${mean}, SD ${sd}) and **${fmt(xb)}** in English (mean ${m2}, SD ${s2}). In which subject did she do **better compared with the other students**?`, better, [better === 'Maths' ? 'English' : 'Maths', 'They are exactly equal', 'You cannot compare different tests'], [`Maths: (${fmt(xa)} − ${mean}) ÷ ${sd} = ${za}`, `English: (${fmt(xb)} − ${m2}) ÷ ${s2} = ${zb}`, `The higher standardised score is ${better}: compare z-scores, not raw marks.`], 4);
  }
  const facts: [string, string, string[]][] = [
    ['Which is true for a normal distribution?', 'It is symmetrical, and the mean = median = mode', ['The mean is always greater than the median', 'It has a long tail to the right', 'Half of the data lies within one standard deviation']],
    ['Which is a condition for using a binomial distribution?', 'A fixed number of independent trials, each with the same probability of success', ['The number of trials can keep increasing until a success', 'Each trial has three or more possible outcomes', 'The probability of success changes after each trial']],
    ['A value is more than 3 standard deviations from the mean of a normal distribution. It is probably…', 'an outlier', ['the median', 'a typical value', 'within the interquartile range']],
  ];
  const [q, a, w] = pk(rand, facts);
  return mcq(rand, q, a, w, [cap(a) + '.'], 3);
}

function skewQ(rand: () => number): GeneratedQuestion {
  if (rand() < 0.5) {
    const shape = pk(rand, ['positive skew', 'negative skew', 'symmetrical'] as const);
    const base = ri(rand, 20, 60);
    const [mode, median, mean] = shape === 'positive skew' ? [base, base + ri(rand, 2, 5), base + ri(rand, 7, 12)] : shape === 'negative skew' ? [base + ri(rand, 7, 12), base + ri(rand, 2, 5), base] : [base, base, base];
    return mcq(rand, `A data set has **mean ${mean}**, **median ${median}** and **mode ${mode}**. What is its shape?`, shape, ['positive skew', 'negative skew', 'symmetrical', 'bimodal'].filter((x) => x !== shape), [shape === 'positive skew' ? 'mode < median < mean: the tail (and the mean) is pulled to the right → positive skew.' : shape === 'negative skew' ? 'mean < median < mode: the tail is to the left → negative skew.' : 'mean = median = mode → symmetrical.'], 3);
  }
  const q1 = ri(rand, 10, 30), q2 = q1 + ri(rand, 3, 10), q3 = q2 + ri(rand, 3, 10);
  const shape = q3 - q2 > q2 - q1 ? 'positive skew' : q3 - q2 < q2 - q1 ? 'negative skew' : 'symmetrical';
  return mcq(rand, `A box plot has **lower quartile ${q1}**, **median ${q2}** and **upper quartile ${q3}**. What does this suggest about the skew?`, shape, ['positive skew', 'negative skew', 'symmetrical', 'no skew can be found from quartiles'].filter((x) => x !== shape), [`Q2 − Q1 = ${q2 - q1}; Q3 − Q2 = ${q3 - q2}`, shape === 'positive skew' ? 'Upper half of the box is longer → positive skew.' : shape === 'negative skew' ? 'Lower half of the box is longer → negative skew.' : 'Both halves equal → symmetrical.'], 3);
}

function spreadQ(rand: () => number): GeneratedQuestion {
  const min = ri(rand, 2, 20), q1 = min + ri(rand, 3, 12), med = q1 + ri(rand, 2, 10), q3 = med + ri(rand, 2, 12), max = q3 + ri(rand, 3, 30);
  const iqr = q3 - q1;
  const k = pk(rand, ['iqr', 'fence', 'outlier', 'compare']);
  const five = `minimum ${min}, lower quartile ${q1}, median ${med}, upper quartile ${q3}, maximum ${max}`;
  if (k === 'iqr') return { q: `A box plot shows: **${five}**. Find the **interquartile range**.`, answer: iqr, steps: [`IQR = upper quartile − lower quartile = ${q3} − ${q1} = ${iqr}`, `(The range would be ${max} − ${min} = ${max - min}.)`], d: 1 };
  if (k === 'fence') return { q: `Data has **lower quartile ${q1}** and **upper quartile ${q3}**. Above what value would a data point count as an **outlier** (Q3 + 1.5 × IQR)?`, answer: r(q3 + 1.5 * iqr, 2), steps: [`IQR = ${q3} − ${q1} = ${iqr}`, `1.5 × ${iqr} = ${fmt(1.5 * iqr)}`, `${q3} + ${fmt(1.5 * iqr)} = ${fmt(q3 + 1.5 * iqr)}`], d: 3 };
  if (k === 'outlier') {
    const fence = q3 + 1.5 * iqr;
    const isOut = max > fence;
    return mcq(rand, `A box plot shows: **${five}**. Using Q3 + 1.5 × IQR, is the maximum value an **outlier**?`, isOut ? `Yes, because ${max} > ${fmt(fence)}` : `No, because ${max} < ${fmt(fence)}`, isOut ? [`No, because ${max} < ${fmt(fence)}`, `No, because ${max} < ${q3 + iqr}`, `Yes, because ${max} > ${q3}`] : [`Yes, because ${max} > ${fmt(fence)}`, `Yes, because ${max} > ${q3}`, `Yes, because ${max} is more than double the median`],
      [`IQR = ${iqr}; Q3 + 1.5 × IQR = ${q3} + ${fmt(1.5 * iqr)} = ${fmt(fence)}`, `${max} is ${isOut ? 'above' : 'below'} ${fmt(fence)}, so it is ${isOut ? '' : 'not '}an outlier.`], 3);
  }
  const iqr2 = iqr + pk(rand, [-3, -2, 2, 3, 5]);
  const fewer = iqr < iqr2 ? 'Group A' : 'Group B';
  return mcq(rand, `Group A's times have an IQR of **${iqr} s**; group B's have an IQR of **${iqr2} s**. Which group's times are **more consistent**?`, fewer, [fewer === 'Group A' ? 'Group B' : 'Group A', 'The group with the higher median', 'You cannot tell from the IQR'], [`Smaller IQR = less spread in the middle 50% = more consistent: ${fewer}.`], 2);
}

function indexQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['chain', 'weighted', 'price', 'meaning']);
  if (k === 'chain') {
    const p = [ri(rand, 200, 400)];
    for (let i = 0; i < 3; i++) p.push(r(p[i] * (1 + pk(rand, [-0.04, 0.02, 0.03, 0.05, 0.08]))));
    const y = ri(rand, 1, 3);
    return { q: `The price of a season ticket was **${p.map((x) => money(x)).join(', ')}** in four consecutive years. Calculate the **chain base index** for year ${y + 1} (1 dp).`, answer: r((p[y] / p[y - 1]) * 100, 1), tol: 0.051, steps: ['Chain base index compares each year with the year BEFORE it.', `${money(p[y])} ÷ ${money(p[y - 1])} × 100 = ${fmt((p[y] / p[y - 1]) * 100)}`], d: 3 };
  }
  if (k === 'weighted') {
    const i1 = ri(rand, 98, 130), i2 = ri(rand, 95, 125), w1 = ri(rand, 2, 8), w2 = ri(rand, 2, 8);
    const wi = (i1 * w1 + i2 * w2) / (w1 + w2);
    return { q: `In a shopping basket, food has a price index of **${i1}** (weight **${w1}**) and travel has a price index of **${i2}** (weight **${w2}**). Calculate the **weighted index** (1 dp).`, answer: r(wi, 1), tol: 0.051, steps: [`Weighted index = Σ(index × weight) ÷ Σweights`, `(${i1} × ${w1} + ${i2} × ${w2}) ÷ (${w1} + ${w2}) = ${i1 * w1 + i2 * w2} ÷ ${w1 + w2} = ${fmt(wi)}`], d: 4 };
  }
  if (k === 'price') {
    const base = ri(rand, 2, 40) * 0.5 + 1, idx = ri(rand, 85, 140);
    return { q: `A bus fare cost **${money(base)}** in the base year. Its index number this year is **${idx}**. What is the fare this year?`, answer: r((base * idx) / 100, 2), unit: '£', tol: 0.011, steps: [`Index = current ÷ base × 100, so current = base × index ÷ 100`, `${money(base)} × ${idx} ÷ 100 = ${money((base * idx) / 100)}`], d: 3 };
  }
  const idx = ri(rand, 80, 130);
  if (idx === 100) return indexQ(rand);
  const ans = idx > 100 ? `A ${idx - 100}% increase since the base year` : `A ${100 - idx}% decrease since the base year`;
  return mcq(rand, `An index number is **${idx}**. What does this mean?`, ans, [idx > 100 ? `A ${idx}% increase since the base year` : `A ${idx}% decrease since the base year`, idx > 100 ? `A ${idx - 100}% decrease since the base year` : `A ${100 - idx}% increase since the base year`, `A ${Math.abs(idx - 100)}% increase since last year`], ['The base year is 100.', `${idx} − 100 = ${idx - 100}, so ${ans.toLowerCase()}.`], 2);
}

function correlationQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['value', 'value', 'regress', 'gradient', 'lurk']);
  if (k === 'value') {
    const v = pk(rand, [-0.95, -0.82, -0.28, -0.06, 0.04, 0.3, 0.78, 0.93]);
    const ans = Math.abs(v) < 0.2 ? 'Little or no correlation' : `${Math.abs(v) >= 0.7 ? 'Strong' : 'Weak'} ${v > 0 ? 'positive' : 'negative'} correlation`;
    return mcq(rand, `Spearman's rank correlation coefficient for two variables is **${fmt(v)}**. How should it be interpreted?`, ans, ['Strong positive correlation', 'Weak positive correlation', 'Strong negative correlation', 'Weak negative correlation', 'Little or no correlation'].filter((x) => x !== ans), ['Close to +1 or −1 = strong; close to 0 = little or no correlation. The sign gives the direction.', `${fmt(v)} → ${ans.toLowerCase()}.`], 2);
  }
  if (k === 'regress') {
    const a = ri(rand, 5, 40), b = pk(rand, [0.5, 1.2, 1.5, 2, 2.5, 3, 4.5]), lo = ri(rand, 5, 15), hi = lo + ri(rand, 10, 30), x = ri(rand, lo + 1, hi - 1);
    return { q: `The regression line for data with x from ${lo} to ${hi} is **y = ${a} + ${b}x**. Estimate **y** when **x = ${x}**.`, answer: r(a + b * x, 2), steps: [`y = ${a} + ${b} × ${x} = ${fmt(a + b * x)}`, `x = ${x} is inside the data range (interpolation), so the estimate is reliable.`], d: 2 };
  }
  if (k === 'gradient') {
    const a = ri(rand, 5, 40), b = pk(rand, [0.5, 1.5, 2, 3.2, 4]);
    return mcq(rand, `The regression line for **ice creams sold (y)** against **temperature in °C (x)** is **y = ${a} + ${b}x**. What does **${b}** tell you?`, `About ${b} more ice creams are sold for each 1 °C rise in temperature`, [`About ${a} more ice creams are sold for each 1 °C rise`, `${b} ice creams are sold when the temperature is 0 °C`, `The temperature rises ${b} °C for every ice cream sold`], ['In y = a + bx, b is the gradient: the change in y for each increase of 1 in x.', `a (${a}) is the value of y when x = 0.`], 3);
  }
  const ex = pk(rand, [['ice cream sales', 'drownings', 'hot weather'], ['number of fire engines at a fire', 'damage caused', 'the size of the fire'], ['shoe size', 'reading ability in children', 'age']] as const);
  return mcq(rand, `There is strong positive correlation between **${ex[0]}** and **${ex[1]}**. What is the best explanation?`, `Both are probably linked to a third variable, such as ${ex[2]}`, [`An increase in ${ex[0]} directly causes more ${ex[1]}`, `An increase in ${ex[1]} directly causes more ${ex[0]}`, 'The data must contain a mistake, as these cannot be linked'], ['Correlation does not prove causation.', `A lurking (third) variable - ${ex[2]} - can make both increase together.`], 3);
}

const SAMPLING: [string, string][] = [
  ['simple random sampling', 'every member of the population has an equal chance of being chosen, e.g. using random numbers'],
  ['systematic sampling', 'choosing every kth member of a list after a random start'],
  ['stratified sampling', 'sampling each group in proportion to its size in the population'],
  ['quota sampling', 'an interviewer chooses people until they have a set number from each group'],
  ['cluster sampling', 'randomly choosing a few whole groups, such as schools, and sampling everyone in them'],
  ['convenience sampling', 'choosing whoever is easiest to reach, such as people walking past'],
  ['self-selected sampling', 'people volunteer to take part, such as replying to an online poll'],
];
function samplingQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.45) {
    const [name, desc] = pk(rand, SAMPLING);
    return mcq(rand, `Which sampling method is this?\n\n> ${cap(desc)}.`, cap(name), SAMPLING.filter((s) => s[0] !== name).map((s) => cap(s[0])), [`${cap(name)}: ${desc}.`, 'Random, systematic, stratified and cluster use chance; quota, convenience and self-selected do not, so they risk bias.'], 2);
  }
  if (k < 0.7) {
    const n = pk(rand, [20, 25, 40, 50, 60]), N = n * pk(rand, [8, 10, 12, 15, 20, 25]);
    return { q: `A school wants a **systematic sample** of **${n}** students from a list of **${comma(N)}**. What should the interval between chosen students be?`, answer: N / n, steps: [`k = population ÷ sample size = ${comma(N)} ÷ ${n} = ${N / n}`, `Pick a random start from 1 to ${N / n}, then every ${N / n}th student.`], d: 2 };
  }
  const facts: [string, string, string[]][] = [
    ['Why might a convenience sample be biased?', 'It only includes people who are easy to reach, who may not represent everyone', ['It is usually far too large to analyse, so results are rounded too much', 'Every member of the population has an equal chance of being chosen', 'It needs a complete list of the population, which is often out of date']],
    ['What is a sampling frame?', 'A list of every member of the population that the sample is chosen from', ['The number of people who must be in the sample for it to be fair', 'The set of questions that will be asked in the survey or interview', 'A diagram or chart that shows the results of the sample at the end']],
    ['What is an advantage of a census over a sample?', 'It includes the whole population, so it is not affected by sampling bias', ['It is quicker and cheaper to carry out than taking a sample of people', 'It is easier to analyse because there is much less data to work with', 'It needs far less planning, since everyone is included automatically']],
    ['Which sampling method needs information about the size of each group in the population?', 'Stratified sampling', ['Simple random sampling', 'Convenience sampling', 'Self-selected sampling']],
  ];
  const [q, a, w] = pk(rand, facts);
  return mcq(rand, q, a, w, [a + '.'], 2);
}

function controlQ(rand: () => number): GeneratedQuestion {
  const target = pk(rand, [250, 330, 500, 750, 1000]), sd = pk(rand, [1.5, 2, 2.5, 3, 4]);
  const k = pk(rand, ['uwl', 'lal', 'action']);
  if (k === 'uwl') return { q: `Bottles are filled to a target of **${target} ml**. The standard deviation of sample means is **${sd} ml**. Find the **upper warning limit**.`, answer: target + 2 * sd, unit: 'ml', steps: ['Warning limits = target ± 2 standard deviations', `${target} + 2 × ${sd} = ${fmt(target + 2 * sd)} ml`], d: 3 };
  if (k === 'lal') return { q: `Bottles are filled to a target of **${target} ml**. The standard deviation of sample means is **${sd} ml**. Find the **lower action limit**.`, answer: target - 3 * sd, unit: 'ml', steps: ['Action limits = target ± 3 standard deviations', `${target} − 3 × ${sd} = ${fmt(target - 3 * sd)} ml`], d: 3 };
  const mean = target + pk(rand, [-3.5, -2.5, 2.5, 3.5]) * sd;
  const outsideAction = Math.abs(mean - target) > 3 * sd;
  const ans = outsideAction ? 'Stop the machine and adjust it' : 'Take another sample straight away';
  return mcq(rand, `Target **${target} ml**, standard deviation of sample means **${sd} ml**. A sample mean of **${fmt(mean)} ml** is recorded. What should happen?`, ans, ['Stop the machine and adjust it', 'Take another sample straight away', 'Carry on with no action', 'Change the target value'].filter((x) => x !== ans), [`Warning limits: ${fmt(target - 2 * sd)} and ${fmt(target + 2 * sd)}; action limits: ${fmt(target - 3 * sd)} and ${fmt(target + 3 * sd)}.`, outsideAction ? 'The mean is outside the action limits → stop and adjust.' : 'The mean is between the warning and action limits → resample to check.'], 3);
}

const DATA_TYPES: Record<string, string[]> = {
  'continuous data': ['the time taken to run 100 m', 'the mass of a newborn baby', 'the height of a sunflower', 'the temperature at noon'],
  'discrete data': ['the number of goals scored in a match', 'the number of pets a family owns', 'shoe size', 'the number of cars in a car park'],
  'qualitative (categorical) data': ['favourite colour', 'type of pet', 'eye colour', 'the make of a car'],
};
function dataTypeQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.6) {
    const kinds = Object.keys(DATA_TYPES);
    const kind = pk(rand, kinds);
    const ans = pk(rand, DATA_TYPES[kind]);
    return mcq(rand, `Which of these is **${kind}**?`, cap(ans), kinds.filter((x) => x !== kind).flatMap((x) => DATA_TYPES[x]).map(cap), [`${cap(ans)}: ${kind}.`, 'Continuous data is measured (any value in a range); discrete data is counted (separate values); qualitative data is described in words.'], 2);
  }
  const facts: [string, string, string[]][] = [
    ['What is the main purpose of a pilot study?', 'To test the method on a small scale and fix problems before the real investigation', ['To collect all of the data needed for the investigation in one go, saving time', 'To prove that the hypothesis is correct before any real data is collected', 'To decide which type of graph will be drawn once the results are in']],
    ['Which of these is primary data?', 'Results of a survey you carry out yourself', ['Population figures from a government website', 'A table of results printed in a newspaper', 'Data taken from a published research report']],
    ['What is a hypothesis?', 'A statement that can be tested using data', ['A question that is asked in a questionnaire', 'The conclusion written at the end of a study', 'A graph that summarises all of the results']],
    ['What does bivariate data mean?', 'Data with two variables for each item, such as height and arm span', ['Data with only two possible values for each item, such as yes and no', 'Data that has been collected on two different days and then combined', 'Data that has been rounded twice, so it is less accurate than before']],
  ];
  const [q, a, w] = pk(rand, facts);
  return mcq(rand, q, a, w, [a + '.'], 2);
}

function twoWayQ(rand: () => number): GeneratedQuestion {
  const a = ri(rand, 5, 30), b = ri(rand, 5, 30), c = ri(rand, 5, 30), d = ri(rand, 5, 30);
  const N = a + b + c + d;
  const table = `| | Walk | Bus | Total |\n|---|---|---|---|\n| Year 10 | ${a} | ${b} | ${a + b} |\n| Year 11 | ${c} | ${d} | ${c + d} |\n| Total | ${a + c} | ${b + d} | ${N} |`;
  const k = pk(rand, ['cond', 'joint', 'risk']);
  if (k === 'cond') return { q: `How students travel to school:\n\n${table}\n\nA **Year 11** student is chosen at random. Find the probability that they **walk** (as a fraction).`, answer: simp(c, c + d), accept: [`${c}/${c + d}`, simp(c, c + d)], steps: ['Only look at the Year 11 row: total ' + (c + d), `Year 11 walkers: ${c}`, `P = ${c}/${c + d}${simp(c, c + d) !== `${c}/${c + d}` ? ` = ${simp(c, c + d)}` : ''}`, `Not ${c}/${N}: that is P(Year 11 AND walk) for any student.`], d: 3 };
  if (k === 'joint') return { q: `How students travel to school:\n\n${table}\n\nA student is chosen at random from all ${N}. Find the probability that they are in **Year 10 and take the bus** (as a fraction).`, answer: simp(b, N), accept: [`${b}/${N}`, simp(b, N)], steps: [`Year 10 bus users: ${b} out of ${N}`, `P = ${b}/${N}${simp(b, N) !== `${b}/${N}` ? ` = ${simp(b, N)}` : ''}`], d: 2 };
  const r1 = ri(rand, 2, 12) / 100, mult = pk(rand, [1.5, 2, 2.5, 3, 4]);
  return { q: `In a study, the risk of an illness is **${fmt(r1 * mult)}** for people who do not exercise and **${fmt(r1)}** for people who do. Calculate the **relative risk** for people who do not exercise.`, answer: mult, steps: ['Relative risk = risk in one group ÷ risk in the other group', `${fmt(r1 * mult)} ÷ ${fmt(r1)} = ${mult}`, `They are ${mult} times as likely to get the illness.`], d: 3 };
}
const gcdN = (x: number, y: number): number => (y ? gcdN(y, x % y) : x);
const simp = (n: number, d: number) => { const g = gcdN(n, d); return `${n / g}/${d / g}`; };

// =========================== BUSINESS ===========================
function cashFlowQ(rand: () => number): GeneratedQuestion {
  const open = ri(rand, -20, 60) * 100, inflow = ri(rand, 30, 120) * 100, outflow = ri(rand, 30, 130) * 100;
  const net = inflow - outflow, close = open + net;
  const k = pk(rand, ['net', 'close', 'open', 'meaning', 'fix']);
  const table = `| | £ |\n|---|---|\n| Total inflows | ${comma(inflow)} |\n| Total outflows | ${comma(outflow)} |\n| Net cash flow | ? |\n| Opening balance | ${gbp(open)} |\n| Closing balance | ? |`;
  if (k === 'net') return { q: `Cash flow forecast for March:\n\n${table}\n\nCalculate the **net cash flow** for March. (Give a negative value with a minus sign.)`, answer: net, unit: '£', steps: ['Net cash flow = total inflows − total outflows', `${comma(inflow)} − ${comma(outflow)} = ${gbp(net)}`, 'Figures in brackets are negative.'], d: 1 };
  if (k === 'close') return { q: `Cash flow forecast for March:\n\n${table}\n\nCalculate the **closing balance** for March. (Give a negative value with a minus sign.)`, answer: close, unit: '£', steps: [`Net cash flow = ${comma(inflow)} − ${comma(outflow)} = ${gbp(net)}`, `Closing balance = opening balance + net cash flow = ${gbp(open)} + ${gbp(net)} = ${gbp(close)}`, "The closing balance becomes next month's opening balance."], d: 2 };
  if (k === 'open') return { q: `In April a business has a net cash flow of **${gbp(net)}** and a closing balance of **${gbp(close)}**. What was its **opening balance**? (Give a negative value with a minus sign.)`, answer: open, unit: '£', steps: ['Closing = opening + net cash flow, so opening = closing − net cash flow', `${gbp(close)} − ${gbp(net)} = ${gbp(open)}`], d: 3 };
  if (k === 'meaning') {
    return mcq(rand, 'A cash flow forecast shows a **negative closing balance** next month. What does this mean?', 'The business will run out of cash and may need an overdraft', ['The business is making a loss on every product that it sells', 'The business will definitely have to close down next month', 'Sales revenue will fall next month compared with this month'], ['A negative closing balance means more cash is going out than the business has available.', 'It is about CASH, not profit: a profitable business can still run short of cash (e.g. customers paying late).'], 3);
  }
  return mcq(rand, 'Which action would most directly **improve a business\'s cash flow** in the short term?', 'Asking customers to pay sooner', ['Buying new machinery with cash', 'Paying suppliers earlier than needed', 'Holding more stock in the warehouse'], ['Getting cash in sooner (or paying out later) improves cash flow.', 'Buying machinery, paying early or holding more stock all take cash OUT of the business.'], 2);
}

function incomeQ(rand: () => number): GeneratedQuestion {
  const rev = ri(rand, 50, 400) * 1000, cos = Math.round(rev * pk(rand, [0.35, 0.4, 0.45, 0.5, 0.6])), exp = Math.round((rev - cos) * pk(rand, [0.3, 0.5, 0.6, 0.7, 0.8]));
  const gp = rev - cos, np = gp - exp;
  const k = pk(rand, ['gp', 'np', 'gpm', 'npm', 'arr', 'interpret']);
  if (k === 'gp') return { q: `A business has revenue of **£${comma(rev)}** and cost of sales of **£${comma(cos)}**. Calculate its **gross profit**.`, answer: gp, unit: '£', steps: [`Gross profit = revenue − cost of sales = £${comma(rev)} − £${comma(cos)} = £${comma(gp)}`], d: 1 };
  if (k === 'np') return { q: `A business has revenue of **£${comma(rev)}**, cost of sales of **£${comma(cos)}** and expenses of **£${comma(exp)}**. Calculate its **net profit**.`, answer: np, unit: '£', steps: [`Gross profit = £${comma(rev)} − £${comma(cos)} = £${comma(gp)}`, `Net profit = gross profit − expenses = £${comma(gp)} − £${comma(exp)} = £${comma(np)}`], hints: ['Find gross profit first, then take off the expenses (overheads).'], d: 2 };
  if (k === 'gpm') return { q: `Revenue **£${comma(rev)}**, cost of sales **£${comma(cos)}**. Calculate the **gross profit margin** (1 dp).`, answer: r((gp / rev) * 100, 1), unit: '%', tol: 0.051, steps: [`Gross profit = £${comma(gp)}`, `GPM = gross profit ÷ revenue × 100 = ${comma(gp)} ÷ ${comma(rev)} × 100 = ${fmt((gp / rev) * 100)}%`], d: 2 };
  if (k === 'npm') return { q: `Revenue **£${comma(rev)}**, cost of sales **£${comma(cos)}**, expenses **£${comma(exp)}**. Calculate the **net profit margin** (1 dp).`, answer: r((np / rev) * 100, 1), unit: '%', tol: 0.051, steps: [`Net profit = £${comma(rev)} − £${comma(cos)} − £${comma(exp)} = £${comma(np)}`, `NPM = ${comma(np)} ÷ ${comma(rev)} × 100 = ${fmt((np / rev) * 100)}%`], d: 3 };
  if (k === 'arr') {
    const inv = ri(rand, 4, 40) * 5000, years = pk(rand, [3, 4, 5]), total = Math.round(inv * (1 + pk(rand, [0.3, 0.45, 0.6, 0.75])) / 1000) * 1000;
    const avg = (total - inv) / years;
    return { q: `A machine costs **£${comma(inv)}**. Over **${years} years** it brings in a total profit of **£${comma(total)}** (before taking off its cost). Calculate the **average rate of return** (1 dp).`, answer: r((avg / inv) * 100, 1), unit: '%', tol: 0.051, steps: [`Net return = £${comma(total)} − £${comma(inv)} = £${comma(total - inv)}`, `Average annual profit = £${comma(total - inv)} ÷ ${years} = £${comma(r(avg, 2))}`, `ARR = ${comma(r(avg, 2))} ÷ ${comma(inv)} × 100 = ${fmt((avg / inv) * 100)}%`], hints: ['Take off the cost of the investment BEFORE averaging.'], d: 4 };
  }
  return mcq(rand, 'A business\'s **gross profit margin** stayed the same, but its **net profit margin** fell. What is the most likely reason?', 'Its expenses (overheads) increased', ['Its cost of sales increased', 'Its selling prices fell', 'It sold fewer products'], ['Gross profit margin uses cost of sales; net profit margin also takes off expenses.', 'If GPM is unchanged but NPM fell, the difference must come from higher expenses such as rent or salaries.'], 4);
}

const FINANCE: [string, string, string[]][] = [
  ['A shop needs £800 for two weeks to pay a supplier before customers pay their bills.', 'An overdraft', ['Share capital', 'A 10-year bank loan', 'Venture capital']],
  ['A large public limited company wants to raise £20 million to open new stores without taking on debt.', 'Issuing new shares', ['An overdraft', 'Trade credit', "The owner's savings"]],
  ['A profitable, established business wants to pay for new equipment without borrowing or giving up any ownership.', 'Retained profit', ['A bank loan', 'Issuing new shares', 'Venture capital']],
  ['A fast-growing tech start-up wants a large investment plus expert advice, and will give up a share of the business.', 'Venture capital', ['An overdraft', 'Trade credit', 'Retained profit']],
  ['A café wants to buy stock now and pay the supplier in 30 days.', 'Trade credit', ['A bank loan', 'Share capital', 'Crowdfunding']],
  ['A new business with an unusual product wants money from many members of the public, and wants publicity too.', 'Crowdfunding', ['An overdraft', 'Retained profit', 'Trade credit']],
  ['A sole trader needs £15,000 to buy a van and wants to repay it in fixed monthly amounts over 5 years.', 'A bank loan', ['An overdraft', 'Share capital', 'Trade credit']],
];
function financeQ(rand: () => number): GeneratedQuestion {
  if (rand() < 0.7) {
    const [sit, ans, wrong] = pk(rand, FINANCE);
    return mcq(rand, `Which source of finance is **most suitable**?\n\n> ${sit}`, ans, shuffle(wrong, rand), [`${ans} best fits: ${sit.charAt(0).toLowerCase()}${sit.slice(1)}`, 'Match the source to the amount, how long it is needed for, the cost (interest) and whether the owners will give up control.'], 3);
  }
  const P = ri(rand, 4, 40) * 1000, rate = pk(rand, [4, 5, 6, 7.5, 8, 9]), years = pk(rand, [2, 3, 4, 5]);
  const total = P * (1 + (rate * years) / 100);
  return { q: `A business borrows **£${comma(P)}** at **${rate}%** interest per year (simple interest) over **${years} years**. What is the **total amount** it must repay?`, answer: r(total, 2), unit: '£', tol: 0.011, steps: [`Interest per year = ${rate}% of £${comma(P)} = ${money((P * rate) / 100)}`, `Total interest = ${money((P * rate) / 100)} × ${years} = ${money((P * rate * years) / 100)}`, `Total repaid = £${comma(P)} + ${money((P * rate * years) / 100)} = ${money(total)}`], d: 3 };
}

function competitionQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.35) {
    const total = ri(rand, 20, 200), firm = r(total * pk(rand, [0.05, 0.08, 0.125, 0.15, 0.2, 0.25, 0.3]), 2), growth = pk(rand, [5, 10, 20]);
    const newFirm = firm * (1 + growth / 100);
    return { q: `A firm's sales are **£${f(firm)}m** in a market worth **£${total}m**. Next year its sales grow by **${growth}%** but the whole market stays the same size. What will its **market share** be (1 dp)?`, answer: r((newFirm / total) * 100, 1), unit: '%', tol: 0.051, steps: [`New sales = £${f(firm)}m × ${f(1 + growth / 100)} = £${fmt(newFirm)}m`, `Market share = ${fmt(newFirm)} ÷ ${total} × 100 = ${fmt((newFirm / total) * 100)}%`], d: 3 };
  }
  const facts: [string, string, string[]][] = [
    ['A new competitor opens nearby with lower prices. Which response is most likely to protect market share without cutting prices?', 'Improving customer service and promoting the business\'s USP', ['Reducing the quality of the product to bring its costs down', 'Stopping all advertising so that the money can be saved', 'Raising prices so that the products look more exclusive']],
    ['What is a USP?', 'A feature that makes a product different from its competitors', ['The lowest price that any business charges in the market', 'The total number of products that the business sells a year', 'A legal requirement that must be met before selling a product']],
    ['Which is an example of uncertainty caused by the economy?', 'A rise in interest rates increases the cost of a business\'s loan', ['A business decides to choose a new logo for its website', 'A manager trains new staff in how to use the till', 'A business moves to a bigger office that it has planned for']],
    ['How does strong competition usually benefit customers?', 'Lower prices, better quality and more choice', ['Higher prices but a wider range of products', 'Less choice but more advertising to compare', 'Businesses no longer need to keep innovating']],
    ['Which is a way a business can reduce risk?', 'Carrying out market research before launching a product', ['Spending all of its cash on developing one new product', 'Ignoring what competitors are doing to stay focused', 'Cancelling its insurance so that its costs are lower']],
  ];
  const [q, a, w] = pk(rand, facts);
  return mcq(rand, q, a, w, [a + '.'], 2);
}

const RESEARCH: Record<string, string[]> = {
  'primary research': ['a questionnaire handed out to customers', 'a focus group discussing a new flavour', 'observing how shoppers move around a store', 'test marketing a product in one town'],
  'secondary research': ['government population statistics', 'a published market report (e.g. Mintel)', 'a competitor\'s website', 'a newspaper article about the market'],
};
const SEGMENTS: [string, string][] = [
  ['age', 'a toy company targeting children aged 3 to 5'],
  ['income', 'a car maker launching a luxury model for high earners'],
  ['location', 'a coat company selling thicker coats in Scotland than in Cornwall'],
  ['gender', 'a razor brand designed and advertised for women'],
  ['lifestyle', 'a gym chain targeting people who want a healthy, active life'],
];
function researchQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.4) {
    const kind = pk(rand, Object.keys(RESEARCH));
    const other = Object.keys(RESEARCH).find((x) => x !== kind)!;
    return mcq(rand, `Which of these is **${kind}**?`, cap(pk(rand, RESEARCH[kind])), RESEARCH[other].map(cap), ['Primary (field) research is collected first-hand by the business; secondary (desk) research already exists.'], 1);
  }
  if (k < 0.7) {
    const [base, ex] = pk(rand, SEGMENTS);
    return mcq(rand, `How is this market being segmented?\n\n> ${cap(ex)}.`, cap(base), SEGMENTS.filter((s) => s[0] !== base).map((s) => cap(s[0])), [`${cap(ex)}: segmented by ${base}.`, 'Common ways to segment: age, gender, income, location, lifestyle, occupation.'], 2);
  }
  const facts: [string, string, string[]][] = [
    ['Which is quantitative data?', '62% of customers would buy the product again', ['Customers said the packaging felt "cheap"', 'A focus group discussed why they like the brand', 'Comments left in a suggestion box']],
    ['Which is qualitative data?', 'Customers explaining why they prefer a rival brand', ['The number of products sold each week', 'The percentage of customers aged under 25', 'Average spend per customer']],
    ['What is a disadvantage of primary research?', 'It can be expensive and time-consuming to collect', ['It is likely to be out of date', 'It was collected for a different purpose', 'Competitors can easily read it']],
    ['What does a market map help a business find?', 'A gap in the market', ['Its break-even point', 'Its cash flow problems', 'The best location for a factory']],
  ];
  const [q, a, w] = pk(rand, facts);
  return mcq(rand, q, a, w, [a + '.'], 2);
}

export const STATS_BUSINESS_GENERATORS: Generator[] = [
  G('sb-timeseries', 'Moving averages, seasonal variation and predictions', (r_) => timeSeriesQ(r_)),
  G('sb-normal', 'The normal distribution and standardised scores', (r_) => normalQ(r_), 'H'),
  G('sb-skew', 'Skewness from averages and box plots', (r_) => skewQ(r_)),
  G('sb-spread', 'IQR, outliers and consistency', (r_) => spreadQ(r_)),
  G('sb-index', 'Chain base and weighted index numbers', (r_) => indexQ(r_)),
  G('sb-correlation', 'Interpreting correlation and regression lines', (r_) => correlationQ(r_)),
  G('sb-sampling', 'Sampling methods and systematic samples', (r_) => samplingQ(r_)),
  G('sb-control', 'Control chart limits and actions', (r_) => controlQ(r_)),
  G('sb-data', 'Types of data and planning', (r_) => dataTypeQ(r_)),
  G('sb-two-way', 'Two-way tables and relative risk', (r_) => twoWayQ(r_)),
  G('sb-cashflow', 'Cash flow forecasts', (r_) => cashFlowQ(r_)),
  G('sb-income', 'Income statements, margins and ARR', (r_) => incomeQ(r_)),
  G('sb-finance', 'Choosing a source of finance', (r_) => financeQ(r_)),
  G('sb-competition', 'Competition, market share and risk', (r_) => competitionQ(r_)),
  G('sb-research', 'Market research and segmentation', (r_) => researchQ(r_)),
];

export const STATS_BUSINESS_TOPICS: Record<string, string[]> = {
  'st-timeseries': ['sb-timeseries'],
  'st-distributions': ['sb-normal'],
  'st-spread': ['sb-skew', 'sb-spread'],
  'st-index': ['sb-index'],
  'st-correlation': ['sb-correlation'],
  'st-sampling': ['sb-sampling'],
  'st-quality': ['sb-control'],
  'st-planning': ['sb-data'],
  'st-probability': ['sb-two-way'],
  'bus-cash': ['sb-cashflow'],
  'ent-finance': ['sb-cashflow'],
  'bus-performance': ['sb-income'],
  'bus-sources': ['sb-finance'],
  'bus-competition': ['sb-competition'],
  'ent-market': ['sb-research', 'sb-competition'],
  'bus-research': ['sb-research'],
};
