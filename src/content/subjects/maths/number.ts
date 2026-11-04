import type { Unit } from '../../types';
import { cards, mc, mcAt, multi, tf, num, txt, topic, examQ, match } from '../../dsl';

export const numberUnit: Unit = {
  id: 'm-number', title: 'Number', description: 'The foundation for everything else - and a big part of Paper 1 (non-calculator).',
  topics: [
    topic({
      id: 'm-num-basics', title: 'Place value, negatives and order of operations', summary: 'BIDMAS, negative numbers, place value and written methods.',
      notes: `
## Order of operations - BIDMAS
**B**rackets → **I**ndices → **D**ivision and **M**ultiplication (left to right) → **A**ddition and **S**ubtraction (left to right).

> 3 + 4 × 2 = 3 + 8 = **11** (not 14)
> (3 + 4) × 2 = **14**
> 20 − 6 + 2 = **16** (left to right, not 12)

## Negative numbers
- Adding a negative = subtracting: 5 + (−3) = 2
- Subtracting a negative = adding: 5 − (−3) = 8
- × or ÷: **same signs → positive, different signs → negative**: (−4) × (−3) = 12; (−12) ÷ 3 = −4

## Place value and written methods
- Multiplying by 10, 100, 1000 moves digits left; dividing moves them right.
- Long multiplication (column or grid) and short/long division ("bus stop") must be secure for Paper 1.
- Dividing by a decimal: make the divisor whole. 4.8 ÷ 0.6 = 48 ÷ 6 = 8.

:::tip Calculator tip
Use brackets on your calculator exactly as written. For a fraction like (12 + 6) ÷ 3, type the brackets!
:::
`,
      keyPoints: ['BIDMAS: brackets, indices, ÷×, +− (left to right)', 'Subtracting a negative = adding', 'Same signs multiply/divide to positive', 'Make the divisor whole when dividing by a decimal'],
      misconceptions: [
        { wrong: '"BIDMAS means always do division before multiplication."', right: 'Division and multiplication have equal priority - work left to right. Same for addition and subtraction.' },
        { wrong: '"Two negatives always make a positive."', right: 'Only when multiplying or dividing. −3 + −4 = −7.' },
      ],
      generators: ['m-bidmas', 'm-negatives'],
      flashcards: cards([
        ['What does BIDMAS stand for?', 'Brackets, Indices, Division/Multiplication, Addition/Subtraction.'],
        ['(−6) × (−4) = ?', '24 (same signs → positive).'],
        ['7 − (−5) = ?', '12 (subtracting a negative = adding).'],
        ['4.8 ÷ 0.6 = ?', '8 (multiply both by 10: 48 ÷ 6).'],
      ]),
      questions: [
        num('Work out 5 + 3 × 4', 17, 'Multiply first: 3 × 4 = 12, then 5 + 12 = 17.', { d: 1, h: ['Which comes first in BIDMAS: + or ×?'] }),
        num('Work out 20 − 8 + 3', 15, 'Left to right: 20 − 8 = 12, then 12 + 3 = 15.', { d: 2, h: ['Addition and subtraction are equal priority.'] }),
        num('The temperature is −4°C and falls by 7°C. What is the new temperature?', -11, '−4 − 7 = −11°C.', { d: 1, unit: '°C' }),
        num('Work out 3.6 ÷ 0.04', 90, 'Multiply both by 100: 360 ÷ 4 = 90.', { d: 3, h: ['Make the number you divide by a whole number.'] }),
        mc('Which calculation gives 26?', ['2 + 4 × 6', '(2 + 4) × 6', '2 × 4 + 6', '2 + 4 + 6'], '2 + 24 = 26.', { d: 1 }),
        num('Work out 15 × 24 without a calculator.', 360, '15 × 24 = 15 × 20 + 15 × 4 = 300 + 60 = 360.', { d: 2 }),
      ],
      workedExamples: [
        { title: 'Order of operations', problem: 'Work out **4 + 2 × (7 − 3)²**', steps: ['Brackets: 7 − 3 = 4', 'Indices: 4² = 16', 'Multiplication: 2 × 16 = 32', 'Addition: 4 + 32 = 36'], answer: '36', tryIt: 'Work out 10 − 3 × 2²', tryAnswer: '10 − 3 × 4 = 10 − 12 = −2' },
      ],
    }),
    topic({
      id: 'm-num-factors', title: 'Factors, multiples and primes', summary: 'HCF, LCM, prime factor decomposition and Venn diagrams.',
      notes: `
- **Factor**: divides exactly into a number (factors of 12: 1, 2, 3, 4, 6, 12).
- **Multiple**: in the times table (multiples of 6: 6, 12, 18...).
- **Prime**: exactly two factors (1 and itself): 2, 3, 5, 7, 11, 13, 17, 19, 23, 29... **1 is not prime**; **2 is the only even prime**.

## Prime factor decomposition
Use a factor tree: 60 → 2 × 30 → 2 × 2 × 15 → 2 × 2 × 3 × 5 = **2² × 3 × 5**.

## HCF and LCM using prime factors
72 = 2³ × 3², 60 = 2² × 3 × 5
- **HCF** = shared primes, lowest powers: 2² × 3 = **12**
- **LCM** = all primes, highest powers: 2³ × 3² × 5 = **360**

A **Venn diagram**: put shared factors in the middle. HCF = product of the middle; LCM = product of everything.

:::exam Spotting LCM/HCF in words
"When will they next happen at the same time?" → **LCM**. "Largest equal groups/packs" → **HCF**.
:::
`,
      keyPoints: ['1 is not prime; 2 is the only even prime', 'Prime factor tree → index form', 'HCF = shared primes (lowest powers)', 'LCM = all primes (highest powers)', '"Same time again" = LCM; "largest group" = HCF'],
      generators: ['m-hcf-lcm', 'm-prime-factors'],
      flashcards: cards([
        ['Is 1 a prime number?', 'No - a prime has exactly two factors.'],
        ['Primes under 30?', '2, 3, 5, 7, 11, 13, 17, 19, 23, 29.'],
        ['How to find the HCF from prime factors?', 'Multiply the shared prime factors (lowest powers).'],
        ['How to find the LCM from prime factors?', 'Multiply all prime factors using the highest power of each.'],
      ]),
      questions: [
        multi('Which of these are prime?', ['2', '17', '29'], ['1', '9', '21', '27'], '9 = 3×3, 21 = 3×7, 27 = 3³ and 1 has only one factor.', { d: 1 }),
        num('Buses leave every 12 minutes and trains every 18 minutes. Both leave at 9:00. After how many minutes do they next leave together?', 36, 'LCM of 12 and 18 = 36.', { d: 2, h: ['"Next at the same time" means lowest common multiple.'] }),
        num('Find the HCF of 48 and 180.', 12, '48 = 2⁴×3, 180 = 2²×3²×5 → HCF = 2²×3 = 12.', { d: 3 }),
        tf('The LCM of two numbers is always bigger than or equal to both numbers.', true, 'It is a multiple of each, so at least as big as the larger one.', { d: 2 }),
        mc('Which is 90 as a product of prime factors?', ['2 × 3² × 5', '2 × 45', '9 × 10', '2 × 3 × 15'], 'All factors must be prime: 90 = 2 × 3 × 3 × 5.', { d: 2, fb: { 1: '45 is not prime.', 2: '9 and 10 are not prime.', 3: '15 is not prime.' } }),
      ],
      workedExamples: [{ title: 'HCF and LCM with a Venn diagram', problem: 'Find the HCF and LCM of 84 and 120.', steps: ['84 = 2 × 2 × 3 × 7 = 2² × 3 × 7', '120 = 2 × 2 × 2 × 3 × 5 = 2³ × 3 × 5', 'Shared: 2, 2, 3 → HCF = 12', 'All with highest powers: 2³ × 3 × 5 × 7 = 840'], answer: 'HCF = 12, LCM = 840', tryIt: 'Find the HCF and LCM of 36 and 60.', tryAnswer: 'HCF 12, LCM 180' }],
    }),
    topic({
      id: 'm-num-fractions', title: 'Fractions', summary: 'Equivalent fractions and the four operations, including mixed numbers.',
      notes: `
## Adding and subtracting
Make the **denominators the same**, then add/subtract the numerators.
> 2/3 + 1/4 = 8/12 + 3/12 = **11/12**

## Multiplying
Multiply tops, multiply bottoms (cancel first if you can).
> 3/4 × 2/9 = 6/36 = **1/6**

## Dividing: Keep, Change, Flip
> 3/5 ÷ 2/7 = 3/5 × 7/2 = **21/10 = 2 1/10**

## Mixed numbers
Convert to improper fractions first: 2 3/4 = 11/4.
> 2 3/4 × 1 1/3 = 11/4 × 4/3 = 44/12 = **11/3 = 3 2/3**

## Fraction of an amount
Divide by the denominator, multiply by the numerator: 3/8 of 64 = 64 ÷ 8 × 3 = **24**.
`,
      keyPoints: ['Add/subtract: common denominator', 'Multiply: tops × tops, bottoms × bottoms', 'Divide: Keep, Change, Flip', 'Mixed numbers → improper first', 'Of an amount: ÷ bottom, × top'],
      misconceptions: [{ wrong: '1/2 + 1/3 = 2/5', right: 'You cannot add denominators. 1/2 + 1/3 = 3/6 + 2/6 = 5/6.' }],
      generators: ['m-frac-add', 'm-frac-mul', 'm-frac-of'],
      flashcards: cards([['How do you divide fractions?', 'Keep the first, change ÷ to ×, flip the second.'], ['Convert 3 2/5 to an improper fraction', '17/5'], ['Simplify 18/24', '3/4']]),
      questions: [
        mc('What is 1/2 + 1/3?', ['5/6', '2/5', '2/6', '1/5'], '3/6 + 2/6 = 5/6.', { d: 1, fb: { 1: 'You added tops and bottoms - denominators must be made the same first.' } }),
        txt('Work out 2/3 × 9/10, in simplest form.', ['3/5'], '18/30 = 3/5.', { d: 2 }),
        txt('Work out 1 1/2 ÷ 3/4. Give your answer as a whole number or fraction.', ['2', '2/1'], '3/2 × 4/3 = 12/6 = 2.', { d: 3 }),
        num('Find 5/6 of 72.', 60, '72 ÷ 6 = 12; 12 × 5 = 60.', { d: 1 }),
        tf('Multiplying by a fraction less than 1 makes a positive number smaller.', true, 'e.g. 10 × 1/2 = 5.', { d: 2 }),
      ],
      workedExamples: [{ title: 'Mixed number subtraction', problem: 'Work out 3 1/4 − 1 2/3.', steps: ['Improper: 13/4 − 5/3', 'Common denominator 12: 39/12 − 20/12', '= 19/12', '= 1 7/12'], answer: '1 7/12', tryIt: 'Work out 2 1/2 + 1 3/5.', tryAnswer: '5/2 + 8/5 = 25/10 + 16/10 = 41/10 = 4 1/10' }],
    }),
    topic({
      id: 'm-num-fdp', title: 'Fractions, decimals and percentages', summary: 'Converting between forms, ordering, and recurring decimals.',
      notes: `
| Fraction | Decimal | Percentage |
|---|---|---|
| 1/2 | 0.5 | 50% |
| 1/4 | 0.25 | 25% |
| 3/4 | 0.75 | 75% |
| 1/5 | 0.2 | 20% |
| 1/8 | 0.125 | 12.5% |
| 1/3 | 0.333... | 33⅓% |
| 1/10 | 0.1 | 10% |

- Fraction → decimal: divide top by bottom.
- Decimal → percentage: × 100.
- To **order**, convert everything to decimals.

## Recurring decimals → fractions (Higher)
Let x = 0.363636... (36 recurring)
- 100x = 36.363636...
- 100x − x = 36 → 99x = 36 → x = 36/99 = **4/11**

For 0.4777... (7 recurring): 100x = 47.77..., 10x = 4.77... → 90x = 43 → x = **43/90**.

A fraction in its simplest form gives a **terminating** decimal only if the denominator's prime factors are just 2s and 5s.
`,
      keyPoints: ['Learn the common equivalents', 'To order: convert to decimals', '% = decimal × 100', 'Recurring → fraction: multiply by 10ⁿ and subtract (Higher)', 'Terminating if denominator has only prime factors 2 and 5'],
      flashcards: cards([['1/8 as a decimal and %?', '0.125 = 12.5%'], ['0.333... as a fraction?', '1/3'], ['Why does 3/40 terminate?', '40 = 2³ × 5 - only 2s and 5s.'], ['0.09 as a percentage?', '9%']]),
      questions: [
        mcAt('Which is largest?', ['0.6', '5/8', '62%', '0.059'], 1, '5/8 = 0.625 > 0.62 > 0.6 > 0.059.', { d: 2 }),
        num('Write 7/20 as a percentage.', 35, '7/20 = 35/100 = 35%.', { d: 1, unit: '%' }),
        txt('Write 0.454545... as a fraction in its simplest form.', ['5/11'], '100x − x = 45 → 99x = 45 → 45/99 = 5/11.', { d: 4, tier: 'H', h: ['Two digits repeat - so multiply by 100.'] }),
        tf('3/7 is a terminating decimal.', false, '7 is not 2 or 5, so it recurs: 0.428571...', { d: 3, tier: 'H' }),
        match('Match the equivalents.', [['1/4', '25%'], ['0.2', '1/5'], ['3/8', '0.375'], ['1.5', '150%']], 'Common equivalents to memorise.', { d: 2 }),
      ],
    }),
    topic({
      id: 'm-num-percent', title: 'Percentages', summary: 'Percentage of amounts, increase/decrease, percentage change and reverse percentages.',
      notes: `
## Percentage of an amount
- Non-calculator: build from 10% (÷10), 5% (half of 10%), 1% (÷100). 35% of 80 = 24 + 4 = 28.
- Calculator: multiply by the decimal: 17.5% of 240 = 0.175 × 240 = 42.

## Increase/decrease with a multiplier
Increase by 15% → × **1.15**; decrease by 15% → × **0.85**.

## Percentage change
**% change = (change ÷ original) × 100**
> £40 → £46: change 6, 6/40 × 100 = **15% increase**.

## Reverse percentages (finding the original)
After a 20% increase, a price is £96. Original = 96 ÷ **1.2** = **£80**.
⚠️ Don't take 20% of £96 - the 20% was of the original.

## Simple vs compound interest
- **Simple**: same interest each year. £500 at 4% for 3 years: 20 × 3 = £60 interest.
- **Compound**: interest on interest: 500 × 1.04³ = £562.43 (see Growth and decay).
`,
      keyPoints: ['Multiplier: +15% = ×1.15, −15% = ×0.85', '% change = change ÷ original × 100', 'Reverse %: divide by the multiplier', 'Simple interest = same each year'],
      misconceptions: [
        { wrong: 'A 20% increase then 20% decrease returns to the original.', right: '100 × 1.2 × 0.8 = 96 - you end up lower, because the 20% decrease is of a bigger number.' },
        { wrong: 'To reverse a 20% increase, subtract 20% of the new price.', right: 'Divide the new price by 1.2.' },
      ],
      generators: ['m-pct-of', 'm-pct-change', 'm-pct-diff', 'm-reverse-pct', 'm-spot-percent'],
      flashcards: cards([['Multiplier for a 7% increase?', '1.07'], ['Multiplier for a 30% decrease?', '0.7'], ['Formula for percentage change?', 'change ÷ original × 100'], ['How do you find an original amount after a % increase?', 'Divide by the multiplier.']]),
      questions: [
        num('Find 35% of 260 (non-calculator).', 91, '10% = 26, 30% = 78, 5% = 13 → 91.', { d: 2 }),
        num('A jacket costs £60 and is reduced by 15%. What is the sale price?', 51, '60 × 0.85 = £51.', { d: 2, unit: '£' }),
        num('A house rises in value from £200,000 to £230,000. What is the percentage increase?', 15, '30,000 ÷ 200,000 × 100 = 15%.', { d: 2, unit: '%' }),
        num('After a 25% reduction a TV costs £360. What was the original price?', 480, '360 ÷ 0.75 = £480.', { d: 3, unit: '£', h: ['£360 is 75% of the original.'] }),
        tf('Increasing by 10% and then decreasing by 10% gives the original amount.', false, '× 1.1 × 0.9 = × 0.99 - a 1% decrease overall.', { d: 3 }),
      ],
      workedExamples: [{ title: 'Reverse percentage', problem: 'A salary rose by 4% to £27,040. What was it before?', steps: ['New salary = 104% of the old', 'Multiplier = 1.04', '£27,040 ÷ 1.04 = £26,000'], answer: '£26,000', tryIt: 'After a 30% discount a coat costs £84. Find the original price.', tryAnswer: '84 ÷ 0.7 = £120' }],
      examQuestions: [examQ('Shop A sells a phone for £320 with 15% off. Shop B sells it for £300 plus VAT at 20%, then 25% off. Which shop is cheaper, and by how much?', 4, ['M1: 320 × 0.85 (= £272)', 'M1: 300 × 1.2 (= £360)', 'M1: 360 × 0.75 (= £270)', 'A1: Shop B by £2'], { meta: 'Calculator · problem solving', time: 5 })],
    }),
    topic({
      id: 'm-num-growth', title: 'Compound interest, growth and decay', summary: 'Repeated percentage change with multipliers and powers.',
      notes: `
**Compound**: the percentage is applied to the new amount each time.
**Value = original × multiplierⁿ**

- Compound interest 3% for 5 years: × 1.03⁵
- Depreciation 12% a year for 4 years: × 0.88⁴
- Population growth, bacteria, radioactive decay all use the same idea.

The formula on the sheet: **Total accrued = P(1 + r/100)ⁿ**.

> £2000 at 5% compound interest for 3 years: 2000 × 1.05³ = **£2315.25**

**Finding n by trial**: when does £1000 at 6% double? Try 1.06¹¹ = 1.898, 1.06¹² = 2.012 → **12 years**.
`,
      keyPoints: ['Value = original × multiplierⁿ', 'Growth multiplier > 1, decay < 1', 'Compound interest formula is on the sheet', 'Find n by trial and improvement'],
      generators: ['m-compound'],
      flashcards: cards([['Formula for compound interest?', 'P(1 + r/100)ⁿ - given on the formulae sheet.'], ['Depreciation 20% per year multiplier?', '0.8']]),
      questions: [
        num('£5000 is invested at 2% compound interest. How much is there after 3 years? (to the nearest penny)', 5306.04, '5000 × 1.02³ = 5306.04.', { d: 3, unit: '£', tol: 0.01 }),
        num('A car worth £12,000 loses 15% of its value each year. What is it worth after 2 years?', 8670, '12000 × 0.85² = 8670.', { d: 3, unit: '£' }),
        mc('Which calculation gives the value after 6 years of 4% annual compound growth on £800?', ['800 × 1.04⁶', '800 × 1.24', '800 × 0.04 × 6', '800 × 1.4⁶'], 'Multiplier 1.04, applied 6 times.', { d: 2, fb: { 1: 'That is simple interest (24%).', 2: 'That is only the simple interest.' } }),
      ],
    }),
    topic({
      id: 'm-num-indices', title: 'Powers, roots and laws of indices', summary: 'Squares, cubes, roots and the index laws (incl. negative and fractional powers).',
      notes: `
- Learn squares to 15² (225) and cubes 1³, 2³, 3³, 4³, 5³, 10³.

## Index laws
| Law | Example |
|---|---|
| aᵐ × aⁿ = aᵐ⁺ⁿ | 3⁴ × 3² = 3⁶ |
| aᵐ ÷ aⁿ = aᵐ⁻ⁿ | 5⁷ ÷ 5³ = 5⁴ |
| (aᵐ)ⁿ = aᵐⁿ | (2³)⁴ = 2¹² |
| a⁰ = 1 | 7⁰ = 1 |
| a⁻ⁿ = 1/aⁿ | 2⁻³ = 1/8 |
| a^(1/n) = ⁿ√a | 27^(1/3) = 3 |
| a^(m/n) = (ⁿ√a)ᵐ | 8^(2/3) = 2² = 4 |

:::tip Fractional powers
Do the **root first** (bottom number), then the **power** (top number). 16^(3/4) = (⁴√16)³ = 2³ = 8.
:::
`,
      keyPoints: ['Multiply → add powers', 'Divide → subtract powers', 'Power of a power → multiply', 'Anything⁰ = 1', 'Negative power = reciprocal', 'Fractional power = root (then power)'],
      misconceptions: [{ wrong: '3² × 3⁴ = 9⁶', right: 'The base stays the same: 3⁶.' }, { wrong: '2⁻³ = −8', right: 'A negative power means reciprocal: 1/8.' }],
      generators: ['m-indices'],
      flashcards: cards([['aᵐ × aⁿ = ?', 'aᵐ⁺ⁿ'], ['(aᵐ)ⁿ = ?', 'aᵐⁿ'], ['a⁰ = ?', '1'], ['5⁻² = ?', '1/25'], ['64^(1/3) = ?', '4'], ['13² = ?', '169']]),
      questions: [
        num('Write 7³ × 7⁵ ÷ 7² as a power of 7. What is the power?', 6, '3 + 5 − 2 = 6.', { d: 2 }),
        txt('Evaluate 4⁻² as a fraction.', ['1/16'], '4⁻² = 1/4² = 1/16.', { d: 3, tier: 'H' }),
        num('Evaluate 27^(2/3).', 9, '∛27 = 3, then 3² = 9.', { d: 4, tier: 'H', h: ['Root first (the 3), then power (the 2).'] }),
        tf('Any non-zero number to the power 0 is 0.', false, 'It is 1.', { d: 1 }),
        num('Work out √144 + 2³', 20, '12 + 8 = 20.', { d: 1 }),
      ],
    }),
    topic({
      id: 'm-num-standard', title: 'Standard form', summary: 'Writing very big and very small numbers as A × 10ⁿ and calculating with them.',
      notes: `
**A × 10ⁿ** where **1 ≤ A < 10** and n is an integer.

- 4 500 000 = 4.5 × 10⁶
- 0.00032 = 3.2 × 10⁻⁴ (small numbers → negative powers)

## Calculating
- **Multiply**: multiply the numbers, add the powers: (3 × 10⁴)(4 × 10⁵) = 12 × 10⁹ = **1.2 × 10¹⁰** (re-adjust!).
- **Divide**: divide the numbers, subtract the powers.
- **Add/subtract**: convert to ordinary numbers (or same power) first.

On a calculator use the ×10ˣ button.
`,
      keyPoints: ['A × 10ⁿ with 1 ≤ A < 10', 'Small numbers → negative powers', 'Multiply: add powers; divide: subtract powers', 'Re-adjust so A is between 1 and 10'],
      generators: ['m-standard-form'],
      flashcards: cards([['Write 52 000 in standard form', '5.2 × 10⁴'], ['Write 0.006 in standard form', '6 × 10⁻³'], ['Is 12 × 10⁵ in standard form?', 'No - it should be 1.2 × 10⁶.']]),
      questions: [
        mc('Which is 0.00045 in standard form?', ['4.5 × 10⁻⁴', '4.5 × 10⁴', '45 × 10⁻⁵', '4.5 × 10⁻⁵'], 'Move the point 4 places right → 10⁻⁴.', { d: 2, fb: { 2: '45 is not between 1 and 10.' } }),
        mc('Work out (6 × 10³) × (4 × 10⁵) in standard form.', ['2.4 × 10⁹', '24 × 10⁸', '2.4 × 10⁸', '10 × 10⁸'], '24 × 10⁸ = 2.4 × 10⁹.', { d: 3 }),
        num('Write 3.07 × 10⁵ as an ordinary number.', 307000, 'Move the point 5 places right.', { d: 1 }),
      ],
    }),
    topic({
      id: 'm-num-rounding', title: 'Rounding, estimation and bounds', summary: 'Decimal places, significant figures, estimating, error intervals and bounds.',
      notes: `
- **Decimal places**: count digits after the point.
- **Significant figures**: count from the first non-zero digit. 0.004 57 to 2 s.f. = 0.0046; 34 682 to 2 s.f. = 35 000.
- **Estimate**: round every number to **1 s.f.** first. 48.7 × 3.2 / 0.49 ≈ 50 × 3 / 0.5 = 300.

## Error intervals
A length is 7.4 cm to 1 d.p. → **7.35 ≤ L < 7.45**. (Half the unit either side; upper bound uses "<".)

Truncation: 7.4 truncated to 1 d.p. → 7.4 ≤ L < 7.5.

## Bounds calculations (Higher)
| To find the maximum of... | use |
|---|---|
| a + b, a × b | upper + upper, upper × upper |
| a − b | upper − **lower** |
| a ÷ b | upper ÷ **lower** |
`,
      keyPoints: ['s.f. count from first non-zero digit', 'Estimate: round to 1 s.f.', 'Error interval: ± half a unit', 'Max of a ÷ b = UB ÷ LB', 'Max of a − b = UB − LB'],
      generators: ['m-rounding', 'm-bounds'],
      flashcards: cards([['Round 0.03462 to 2 s.f.', '0.035'], ['A mass is 60 kg to the nearest 10 kg. Error interval?', '55 ≤ m < 65'], ['Max value of a ÷ b?', 'Upper bound of a ÷ lower bound of b.']]),
      questions: [
        num('Estimate 61.2 × 9.87 ÷ 0.197 by rounding to 1 s.f.', 3000, '60 × 10 ÷ 0.2 = 600 ÷ 0.2 = 3000.', { d: 2 }),
        mc('x = 4.6 rounded to 1 d.p. What is the error interval?', ['4.55 ≤ x < 4.65', '4.5 ≤ x < 4.7', '4.55 < x ≤ 4.65', '4.6 ≤ x < 4.7'], 'Half of 0.1 = 0.05 either side.', { d: 3 }),
        num('a = 20 (nearest 10), b = 4 (nearest whole). Find the upper bound of a ÷ b, to 2 d.p.', 7.14, 'UB of a = 25, LB of b = 3.5 → 25 ÷ 3.5 = 7.142... = 7.14.', { d: 5, tier: 'H', tol: 0.006, h: ['To make a division as big as possible: biggest ÷ smallest.'] }),
      ],
    }),
    topic({
      id: 'm-num-surds', title: 'Surds', summary: 'Simplifying, multiplying and rationalising surds.', tier: 'H',
      notes: `
A **surd** is an irrational root like √2. Leave answers in surd form when asked for an **exact** value.

- √a × √b = √(ab)
- √(a/b) = √a / √b
- **Simplify** using square factors: √50 = √25 × √2 = **5√2**
- Add like surds: 3√2 + 5√2 = 8√2
- Expand brackets: (2 + √3)(1 − √3) = 2 − 2√3 + √3 − 3 = **−1 − √3**

## Rationalising the denominator
- 6/√3 = 6√3/3 = **2√3** (multiply top and bottom by √3)
- 1/(3 + √2): multiply by (3 − √2)/(3 − √2) → (3 − √2)/(9 − 2) = **(3 − √2)/7**
`,
      keyPoints: ['√a × √b = √ab', 'Simplify using the largest square factor', 'Only like surds can be added', 'Rationalise: multiply by √b or by the conjugate'],
      generators: ['m-surds'],
      flashcards: cards([['Simplify √72', '6√2'], ['Rationalise 10/√5', '2√5'], ['(√3)² = ?', '3']]),
      questions: [
        mc('Simplify √48', ['4√3', '2√12', '16√3', '3√4'], '48 = 16 × 3, √16 = 4.', { d: 3 }),
        mc('Rationalise 8/√2', ['4√2', '8√2', '√2/8', '2√8'], '8√2/2 = 4√2.', { d: 4 }),
        num('Expand (√5 + 1)(√5 − 1)', 4, 'Difference of two squares: 5 − 1 = 4.', { d: 4 }),
      ],
    }),
    topic({
      id: 'm-num-money', title: 'Money, best buys and financial maths', summary: 'Bills, wages, tax, exchange rates and value for money.',
      notes: `
- **Best buy**: compare **unit prices** (price per gram/ml) or how much you get per £1.
- **Exchange rates**: £1 = €1.15 → £80 = 80 × 1.15 = €92; €46 = 46 ÷ 1.15 = £40.
- **VAT** (20%): × 1.2. **Income tax**: tax only applies above the personal allowance.
- **Wages**: overtime at "time and a half" = 1.5 × hourly rate.
- Always give money to 2 decimal places (£4.50 not £4.5).
`,
      keyPoints: ['Best buy: compare unit price', 'Exchange: multiply one way, divide the other', 'VAT 20% → × 1.2', 'Money to 2 d.p.'],
      generators: ['m-money', 'm-best-buy'],
      flashcards: cards([['What does "time and a half" mean?', '1.5 × the normal hourly rate.'], ['£1 = $1.25. How many £ is $50?', '£40 (50 ÷ 1.25).']]),
      questions: [
        num('£1 = €1.16. Convert £250 to euros.', 290, '250 × 1.16 = €290.', { d: 1, unit: '€' }),
        num('Sam earns £11.40 per hour, with overtime at time and a half. How much for 3 hours of overtime?', 51.3, '11.40 × 1.5 × 3 = £51.30.', { d: 2, unit: '£' }),
        mc('A 500 g pack costs £2.40 and a 750 g pack costs £3.45. Which is better value?', ['750 g pack', '500 g pack', 'Same value', 'Cannot tell'], '500 g: 0.48p/g; 750 g: 0.46p/g.', { d: 2 }),
      ],
    }),
  ],
};
