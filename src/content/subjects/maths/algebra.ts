import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, txt, topic, examQ, ord } from '../../dsl';

export const algebraUnit: Unit = {
  id: 'm-algebra', title: 'Algebra', description: 'About a third of Foundation marks and over a third of Higher.',
  topics: [
    topic({
      id: 'm-alg-basics', title: 'Algebraic notation, simplifying and substitution', summary: 'Collecting like terms, expanding single brackets, factorising and substitution.',
      notes: `
- **Like terms** have the same letters and powers: 3x + 5x = 8x; but 3x + 5x² can't be combined.
- 4 × a × b = 4ab; a × a = a²; 3a × 2a = 6a².
- **Expand** a single bracket: multiply everything inside. 3(2x − 5) = 6x − 15; −2(x − 4) = −2x + 8.
- **Factorise** (opposite of expand): take out the HCF. 12x + 18 = **6(2x + 3)**; 5x² − 15x = **5x(x − 3)**.
- **Substitute**: replace letters with numbers, using brackets for negatives. If a = −3: a² = (−3)² = 9.

## Key vocabulary
| Word | Meaning | Example |
|---|---|---|
| Expression | No equals sign | 3x + 2 |
| Equation | Has = and can be solved | 3x + 2 = 11 |
| Formula | Links variables | A = πr² |
| Identity | True for all values (≡) | 2(x + 1) ≡ 2x + 2 |
`,
      keyPoints: ['Only collect like terms', 'Expand: multiply every term inside', 'Factorise: take out the HCF (number and letters)', 'Use brackets when substituting negatives', 'Expression vs equation vs formula vs identity'],
      misconceptions: [{ wrong: '−2(x − 4) = −2x − 8', right: '−2 × −4 = +8, so −2x + 8.' }, { wrong: 'If a = −3, a² = −9', right: '(−3)² = 9.' }],
      generators: ['m-substitute', 'm-expand'],
      prerequisites: ['m-num-basics'],
      flashcards: cards([['Expand 4(3x − 2)', '12x − 8'], ['Factorise fully 8x² + 12x', '4x(2x + 3)'], ['What symbol shows an identity?', '≡'], ['Simplify 3a × 4b', '12ab']]),
      questions: [
        mc('Simplify 5x + 3y − 2x + y', ['3x + 4y', '7xy', '3x + 3y', '8x + 4y'], '5x − 2x = 3x; 3y + y = 4y.', { d: 1 }),
        mc('Factorise fully 6x² − 9x', ['3x(2x − 3)', '3(2x² − 3x)', 'x(6x − 9)', '6x(x − 9)'], 'HCF of 6x² and 9x is 3x.', { d: 2, fb: { 1: 'Not fully: you can also take out x.', 2: 'Not fully: you can also take out 3.' } }),
        num('If p = 4 and q = −2, work out 3p² − 5q', 58, '3 × 16 − 5 × (−2) = 48 + 10 = 58.', { d: 2 }),
        multi('Which are identities (true for all x)?', ['2(x + 3) ≡ 2x + 6', 'x + x ≡ 2x'], ['3x = 12', 'x² = 4x'], 'Identities are always true; equations are true for specific values.', { d: 3 }),
      ],
      workedExamples: [{ title: 'Expand and simplify', problem: 'Expand and simplify 3(2x + 5) − 2(x − 4).', steps: ['3(2x + 5) = 6x + 15', '−2(x − 4) = −2x + 8', '6x + 15 − 2x + 8', '= 4x + 23'], answer: '4x + 23', tryIt: 'Expand and simplify 5(x − 2) − 3(2x + 1).', tryAnswer: '5x − 10 − 6x − 3 = −x − 13' }],
    }),
    topic({
      id: 'm-alg-quad-expand', title: 'Double brackets and factorising quadratics', summary: 'Expanding (x + a)(x + b), factorising x² + bx + c, difference of two squares, ax² + bx + c (Higher).',
      notes: `
## Expanding double brackets
Every term × every term (FOIL or a grid):
> (x + 3)(x − 5) = x² − 5x + 3x − 15 = **x² − 2x − 15**

Squares: (x + 4)² = (x + 4)(x + 4) = **x² + 8x + 16** (not x² + 16!)

## Factorising x² + bx + c
Find two numbers that **multiply to c** and **add to b**.
> x² + 7x + 12: 3 × 4 = 12, 3 + 4 = 7 → **(x + 3)(x + 4)**
> x² − x − 20: −5 × 4 = −20, −5 + 4 = −1 → **(x − 5)(x + 4)**

## Difference of two squares
**a² − b² = (a + b)(a − b)**: x² − 49 = (x + 7)(x − 7).

## Higher: ax² + bx + c
2x² + 7x + 3: multiply a × c = 6; find numbers × to 6 and + to 7: 6 and 1 → 2x² + 6x + x + 3 → 2x(x + 3) + 1(x + 3) = **(2x + 1)(x + 3)**.

Expanding triple brackets (Higher): expand two first, then multiply by the third.
`,
      keyPoints: ['Expand: every term × every term', '(x + a)² ≠ x² + a²', 'Factorise: multiply to c, add to b', 'a² − b² = (a + b)(a − b)', 'ax² + bx + c: split the middle term (Higher)'],
      misconceptions: [{ wrong: '(x + 5)² = x² + 25', right: '(x + 5)(x + 5) = x² + 10x + 25.' }],
      generators: ['m-expand-double', 'm-factorise-quad', 'm-spot-expand'],
      prerequisites: ['m-alg-basics'],
      flashcards: cards([['Expand (x + 4)²', 'x² + 8x + 16'], ['Factorise x² − 9', '(x + 3)(x − 3)'], ['Factorise x² + 5x + 6', '(x + 2)(x + 3)'], ['Difference of two squares', 'a² − b² = (a + b)(a − b)']]),
      questions: [
        mc('Expand (x − 3)²', ['x² − 6x + 9', 'x² + 9', 'x² − 9', 'x² − 3x + 9'], '(x − 3)(x − 3) = x² − 3x − 3x + 9.', { d: 2, fb: { 1: 'You only squared each term - expand the full double bracket.' } }),
        mc('Factorise x² − 2x − 24', ['(x − 6)(x + 4)', '(x + 6)(x − 4)', '(x − 8)(x + 3)', '(x − 12)(x + 2)'], '−6 × 4 = −24 and −6 + 4 = −2.', { d: 3 }),
        mc('Factorise 4x² − 25', ['(2x + 5)(2x − 5)', '(4x + 5)(x − 5)', '(2x − 5)²', '4(x² − 25)'], 'Difference of two squares: (2x)² − 5².', { d: 3 }),
        mc('Factorise 3x² + 10x + 8', ['(3x + 4)(x + 2)', '(3x + 8)(x + 1)', '(3x + 2)(x + 4)', '(x + 4)(x + 2)'], 'Check: (3x + 4)(x + 2) = 3x² + 6x + 4x + 8.', { d: 4, tier: 'H' }),
      ],
      workedExamples: [{ title: 'Factorising a quadratic', problem: 'Factorise x² + 2x − 15.', steps: ['Need two numbers: product −15, sum +2', 'Factor pairs of −15: (1, −15), (−1, 15), (3, −5), (−3, 5)', '−3 + 5 = 2 ✓', '(x − 3)(x + 5)'], answer: '(x − 3)(x + 5)', tryIt: 'Factorise x² − 8x + 12.', tryAnswer: '(x − 2)(x − 6)' }],
    }),
    topic({
      id: 'm-alg-equations', title: 'Solving linear equations', summary: 'One-step to multi-step equations, brackets, unknowns on both sides and fractions.',
      notes: `
Do the **same thing to both sides** to get x alone (use inverse operations).

> 5x − 7 = 18 → 5x = 25 → **x = 5**
> 3(x + 4) = 2x + 19 → 3x + 12 = 2x + 19 → **x = 7**
> (2x + 1)/3 = 5 → 2x + 1 = 15 → **x = 7**
> (x + 2)/3 + (x − 1)/4 = 3 → multiply everything by 12: 4(x + 2) + 3(x − 1) = 36 → 7x + 5 = 36 → **x = 31/7**

**Unknowns on both sides**: move the smaller x term (avoids negatives).

**Forming equations** from words or shapes: e.g. the angles in a triangle are x, 2x and x + 20 → 4x + 20 = 180 → x = 40.

✔ Check by substituting back.
`,
      keyPoints: ['Same operation to both sides', 'Expand brackets first', 'Move the smaller x term', 'Clear fractions by multiplying by the denominator(s)', 'Check by substituting'],
      generators: ['m-linear-eq', 'm-spot-linear'],
      prerequisites: ['m-alg-basics'],
      flashcards: cards([['Solve 4x + 3 = 23', 'x = 5'], ['First step for (x − 3)/5 = 2?', 'Multiply both sides by 5.']]),
      questions: [
        num('Solve 7x + 4 = 3x + 24', 5, '4x = 20 → x = 5.', { d: 2 }),
        num('Solve 4(2x − 3) = 20', 4, '8x − 12 = 20 → 8x = 32 → x = 4.', { d: 2 }),
        num('Solve (3x − 2)/4 = 4', 6, '3x − 2 = 16 → x = 6.', { d: 3 }),
        num('The angles of a triangle are x, 3x and 2x + 30. Find x.', 25, '6x + 30 = 180 → x = 25.', { d: 3, h: ['Angles in a triangle add to 180°.'] }),
        num('Solve 5 − 2x = 11', -3, '−2x = 6 → x = −3.', { d: 2 }),
      ],
      workedExamples: [{ title: 'Forming and solving', problem: 'A rectangle has length 2x + 3 and width x. Its perimeter is 48 cm. Find x.', steps: ['Perimeter = 2(2x + 3) + 2x', '= 4x + 6 + 2x = 6x + 6', '6x + 6 = 48 → 6x = 42', 'x = 7'], answer: 'x = 7', tryIt: 'The perimeter of a square with side 3x − 1 is 44. Find x.', tryAnswer: '4(3x − 1) = 44 → 12x = 48 → x = 4' }],
    }),
    topic({
      id: 'm-alg-rearrange', title: 'Rearranging formulae', summary: 'Changing the subject, including when the subject appears twice (Higher).',
      notes: `
Treat it like solving an equation - undo operations in reverse order.

> Make **u** the subject of v = u + at → **u = v − at**
> Make **r** the subject of A = πr² → r² = A/π → **r = √(A/π)**
> Make **x** the subject of y = (3x − 2)/5 → 5y = 3x − 2 → **x = (5y + 2)/3**

## Subject appears twice (Higher)
Collect the subject terms on one side, **factorise**, then divide.
> Make x the subject of ax + b = cx + d → ax − cx = d − b → x(a − c) = d − b → **x = (d − b)/(a − c)**
`,
      keyPoints: ['Undo operations in reverse order', 'Square root to undo a square', 'Subject twice: collect, factorise, divide'],
      flashcards: cards([['Make t the subject: v = u + at', 't = (v − u)/a'], ['Make h the subject: V = πr²h', 'h = V/(πr²)']]),
      questions: [
        mc('Make x the subject of y = 4x − 7', ['x = (y + 7)/4', 'x = y/4 + 7', 'x = 4y + 7', 'x = (y − 7)/4'], 'Add 7 then divide by 4.', { d: 2 }),
        mc('Make r the subject of V = (4/3)πr³', ['r = ∛(3V/(4π))', 'r = 3V/(4π)', 'r = √(3V/4π)', 'r = ∛(4V/3π)'], 'Multiply by 3, divide by 4π, then cube root.', { d: 4, tier: 'H' }),
        mc('Make x the subject of 3x + a = bx + 5', ['x = (5 − a)/(3 − b)', 'x = (5 + a)/(3 + b)', 'x = 5 − a − 3 + b', 'x = (a − 5)/(3 − b)'], '3x − bx = 5 − a → x(3 − b) = 5 − a.', { d: 5, tier: 'H' }),
      ],
    }),
    topic({
      id: 'm-alg-inequalities', title: 'Inequalities', summary: 'Number lines, solving inequalities, integer solutions and regions (Higher).',
      notes: `
Symbols: < less than, ≤ less than or equal to, > greater than, ≥ greater than or equal to.

- Number line: **open circle** for < or >, **filled circle** for ≤ or ≥.
- Solve like an equation: 3x − 4 > 11 → 3x > 15 → **x > 5**.
- ⚠️ **Multiplying or dividing by a negative flips the sign**: −2x < 8 → x > −4.
- Double inequality: −3 < 2x + 1 ≤ 9 → −4 < 2x ≤ 8 → **−2 < x ≤ 4**. Integer solutions: −1, 0, 1, 2, 3, 4.

## Regions (Higher)
Draw the boundary lines (solid for ≤/≥, dashed for </>) and shade the region that satisfies all inequalities.
`,
      keyPoints: ['Open circle for < >, filled for ≤ ≥', 'Solve like an equation', 'Flip the sign when × or ÷ by a negative', 'List integers carefully at the boundaries'],
      generators: ['m-inequality'],
      flashcards: cards([['When does the inequality sign flip?', 'When multiplying or dividing both sides by a negative number.'], ['Integers satisfying −2 < n ≤ 3?', '−1, 0, 1, 2, 3']]),
      questions: [
        txt('Solve 5x + 2 ≤ 27. (type e.g. x <= 5)', ['x <= 5', 'x≤5', 'x ≤ 5'], '5x ≤ 25 → x ≤ 5.', { d: 2 }),
        multi('Which integers satisfy −3 ≤ n < 2?', ['−3', '−2', '−1', '0', '1'], ['2', '−4'], '−3 is included (≤); 2 is not (<).', { d: 2 }),
        txt('Solve 4 − 3x > 13. (type e.g. x < 2)', ['x < -3', 'x<-3', 'x < −3'], '−3x > 9 → divide by −3 and flip: x < −3.', { d: 4 }),
      ],
    }),
    topic({
      id: 'm-alg-sequences', title: 'Sequences', summary: 'Term-to-term, nth term of linear sequences, geometric, Fibonacci and quadratic sequences (Higher).',
      notes: `
## Linear (arithmetic) sequences
nth term = **dn + c** where d = common difference.
> 5, 8, 11, 14... d = 3 → 3n, compare 3, 6, 9 → add 2 → **3n + 2**

Is 100 in the sequence? 3n + 2 = 100 → n = 32.67 → **no** (not a whole number).

## Other sequences
- **Geometric**: multiply by the same number (2, 6, 18, 54 - ratio 3). Higher: may involve surds or fractions.
- **Fibonacci-type**: add the previous two (1, 1, 2, 3, 5, 8).
- **Square / cube / triangular numbers**: 1, 4, 9, 16 / 1, 8, 27 / 1, 3, 6, 10.

## Quadratic nth term (Higher)
Second difference constant → **an² + bn + c** with a = (second difference) ÷ 2.
> 4, 9, 16, 25... differences 5, 7, 9; second difference 2 → a = 1 → n²; subtract: 4−1, 9−4, 16−9 = 3, 5, 7 → 2n + 1 → **n² + 2n + 1**
`,
      keyPoints: ['Linear nth term = dn + c', 'Check membership: solve nth term = value; integer n?', 'Geometric: constant ratio', 'Quadratic: a = second difference ÷ 2 (Higher)'],
      generators: ['m-nth-term'],
      flashcards: cards([['nth term of 7, 11, 15, 19?', '4n + 3'], ['First 5 triangular numbers?', '1, 3, 6, 10, 15'], ['How to find "a" in a quadratic sequence?', 'Halve the second difference.']]),
      questions: [
        txt('Find the nth term of 2, 9, 16, 23, ...', ['7n - 5', '7n−5', '7n-5'], 'd = 7; 7n gives 7, 14...; subtract 5.', { d: 2 }),
        tf('77 is a term in the sequence with nth term 4n + 3.', false, '4n + 3 = 77 → n = 18.5, not an integer.', { d: 3 }),
        num('What is the next term of the geometric sequence 3, 12, 48, ...?', 192, 'Multiply by 4: 48 × 4 = 192.', { d: 1 }),
        txt('Find the nth term of 2, 8, 18, 32, ...', ['2n^2', '2n²', '2n2'], 'Second difference 4 → 2n²; check 2, 8, 18, 32 ✓.', { d: 4, tier: 'H' }),
      ],
    }),
    topic({
      id: 'm-alg-graphs', title: 'Straight-line graphs', summary: 'y = mx + c, gradient, intercepts, parallel and perpendicular lines.',
      notes: `
**y = mx + c**: m = gradient (steepness), c = y-intercept.

- Gradient = **change in y ÷ change in x** ("rise over run").
- Rearrange to y = ... first: 2y + 4x = 6 → y = −2x + 3 → gradient −2, intercept 3.
- **Parallel** lines have the **same gradient**.
- **Perpendicular** (Higher): gradients multiply to **−1** (negative reciprocal): gradient 2 → perpendicular −1/2.
- Equation through two points: find m, then substitute a point to find c.
- **Midpoint** = (average of x, average of y).
- Horizontal line: y = k; vertical: x = k.

:::example Finding the equation
Through (1, 5) and (3, 11): m = (11 − 5)/(3 − 1) = 3. 5 = 3(1) + c → c = 2. **y = 3x + 2**.
:::
`,
      keyPoints: ['y = mx + c', 'Gradient = Δy ÷ Δx', 'Parallel: same gradient', 'Perpendicular: m₁ × m₂ = −1 (Higher)', 'Rearrange to y = ... before reading m and c'],
      generators: ['m-gradient'],
      flashcards: cards([['Gradient and intercept of y = 4 − 2x?', 'Gradient −2, intercept 4.'], ['Perpendicular gradient to 3?', '−1/3'], ['Equation of a horizontal line through (2, 5)?', 'y = 5']]),
      questions: [
        mc('What is the gradient of 3y = 6x − 9?', ['2', '6', '−9', '−3'], 'y = 2x − 3.', { d: 2, fb: { 1: 'Divide everything by 3 first.' } }),
        mc('Which line is parallel to y = 5x + 1?', ['y = 5x − 3', 'y = −5x + 1', 'y = x + 5', 'y = −x/5'], 'Same gradient, 5.', { d: 1 }),
        mc('Which line is perpendicular to y = 2x + 7?', ['y = −½x + 3', 'y = 2x − 7', 'y = −2x + 7', 'y = ½x'], 'Negative reciprocal of 2 is −½.', { d: 3, tier: 'H' }),
        txt('Find the midpoint of (2, 7) and (8, −1). Type as (x, y).', ['(5, 3)', '(5,3)', '5,3'], '((2+8)/2, (7−1)/2) = (5, 3).', { d: 2 }),
      ],
    }),
    topic({
      id: 'm-alg-simultaneous', title: 'Simultaneous equations', summary: 'Elimination and substitution; linear and quadratic pairs (Higher).',
      notes: `
## Elimination
> 3x + 2y = 16 and 5x − 2y = 8 → **add**: 8x = 24 → x = 3 → 9 + 2y = 16 → y = 3.5

If no coefficients match, multiply one or both equations first.
- **Same signs → subtract**, **different signs → add** (for the matching letter).

## Substitution
Useful when one equation is "y = ...". Substitute into the other.

## Linear + quadratic (Higher)
> y = x + 1 and x² + y² = 13 → x² + (x + 1)² = 13 → 2x² + 2x − 12 = 0 → x² + x − 6 = 0 → (x + 3)(x − 2) = 0 → x = −3, y = −2 or x = 2, y = 3

Graphically, solutions are the **intersection points** of the graphs.

**Forming them from words**: "3 apples and 2 bananas cost £1.80; 1 apple and 4 bananas cost £1.60..."
`,
      keyPoints: ['Match coefficients, then add or subtract', 'Same signs subtract, different signs add', 'Substitute back to find the other letter', 'Linear + quadratic: substitute and solve the quadratic (Higher)', 'Solutions = intersection points'],
      generators: ['m-sim-eq'],
      prerequisites: ['m-alg-equations'],
      flashcards: cards([['When do you add equations in elimination?', 'When the matched coefficients have different signs.'], ['Graphical meaning of simultaneous solutions?', 'The coordinates where the lines/curves intersect.']]),
      questions: [
        num('Solve x + y = 10 and x − y = 4. What is x?', 7, 'Add: 2x = 14 → x = 7 (y = 3).', { d: 2 }),
        num('Solve 2x + 3y = 13 and 4x − y = 5. What is y?', 3, 'Double eq1: 4x + 6y = 26; subtract eq2: 7y = 21 → y = 3.', { d: 4 }),
        num('2 adult tickets and 3 child tickets cost £36. 1 adult and 2 child tickets cost £21. Find the cost of an adult ticket in £.', 9, '2a + 3c = 36; 2a + 4c = 42 → c = 6 → a = 9.', { d: 4, unit: '£' }),
      ],
      workedExamples: [{ title: 'Elimination with multiplying', problem: 'Solve 3x + 4y = 18 and 2x + 3y = 13.', steps: ['×2: 6x + 8y = 36; ×3: 6x + 9y = 39', 'Subtract: y = 3', '3x + 12 = 18 → x = 2', 'Check in eq2: 4 + 9 = 13 ✓'], answer: 'x = 2, y = 3', tryIt: 'Solve 5x + 2y = 20 and 3x − 4y = 25.', tryAnswer: 'x = 5, y = −2.5' }],
    }),
    topic({
      id: 'm-alg-quadratics', title: 'Solving quadratic equations', summary: 'Factorising, the quadratic formula and completing the square (Higher).',
      notes: `
Rearrange to **= 0** first.

## By factorising
x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → **x = 2 or x = 3**.

## Quadratic formula (on the formulae sheet, Higher)
**x = (−b ± √(b² − 4ac)) ÷ 2a**
- The **discriminant** b² − 4ac: > 0 two roots, = 0 one root, < 0 no real roots.

## Completing the square (Higher)
x² + 6x − 7 = (x + 3)² − 9 − 7 = **(x + 3)² − 16**
- Solve: (x + 3)² = 16 → x + 3 = ±4 → x = 1 or −7.
- **Turning point** of y = (x + p)² + q is **(−p, q)**: here (−3, −16).

## Graphs
The **roots** are where y = ax² + bx + c crosses the x-axis.
`,
      keyPoints: ['Make it = 0 first', 'Factorise → each bracket = 0', 'Quadratic formula is on the sheet (Higher)', 'Discriminant tells how many roots', 'Completed square (x + p)² + q → turning point (−p, q)'],
      generators: ['m-quad-formula', 'm-factorise-quad'],
      prerequisites: ['m-alg-quad-expand'],
      flashcards: cards([['Quadratic formula?', 'x = (−b ± √(b² − 4ac)) / 2a'], ['What does b² − 4ac < 0 mean?', 'No real solutions.'], ['Turning point of y = (x − 2)² + 5?', '(2, 5)']]),
      questions: [
        txt('Solve x² + x − 12 = 0. Type both answers separated by a comma, smaller first.', ['-4, 3', '-4,3', 'x=-4, x=3', '−4, 3', '-4 and 3', '-4 or 3', 'x = -4 or x = 3', '3, -4', '3 and -4'], '(x + 4)(x − 3) = 0 → x = −4 or 3.', { d: 3 }),
        mc('Write x² − 8x + 3 in the form (x + p)² + q', ['(x − 4)² − 13', '(x − 4)² + 3', '(x − 8)² + 3', '(x + 4)² − 13'], '(x − 4)² = x² − 8x + 16, so subtract 13.', { d: 4, tier: 'H' }),
        mc('How many real roots does x² + 2x + 5 = 0 have?', ['None', 'One', 'Two', 'Infinitely many'], 'b² − 4ac = 4 − 20 = −16 < 0.', { d: 4, tier: 'H' }),
      ],
      examQuestions: [examQ('Solve 2x² − 3x − 7 = 0. Give your answers to 2 decimal places.', 3, ['M1: correct substitution into the quadratic formula: (3 ± √(9 + 56)) / 4', 'M1: √65 evaluated or correct partial evaluation', 'A1: x = 2.77 and x = −1.27'], { meta: 'Higher · calculator', time: 4 })],
    }),
    topic({
      id: 'm-alg-graphs2', title: 'Other graphs and transformations', summary: 'Quadratic, cubic, reciprocal and exponential graphs; graph transformations; equation of a circle (Higher).',
      notes: `
| Graph | Shape |
|---|---|
| y = x² | U-shaped parabola (∩ if negative x²) |
| y = x³ | S-shaped cubic |
| y = 1/x | Reciprocal: two curves, asymptotes on the axes |
| y = kˣ | Exponential growth (k > 1) |
| x² + y² = r² | Circle, centre (0, 0), radius r (Higher) |

## Using graphs to solve equations
Roots of f(x) = 0 are the x-intercepts. To solve x² − 3 = x, find where y = x² − 3 meets y = x.

## Transformations (Higher)
| Change | Effect |
|---|---|
| y = f(x) + a | Up a |
| y = f(x + a) | **Left** a (opposite!) |
| y = −f(x) | Reflect in x-axis |
| y = f(−x) | Reflect in y-axis |

**Tangent to a circle** at a point is perpendicular to the radius.
`,
      keyPoints: ['Recognise quadratic, cubic, reciprocal, exponential shapes', 'Roots = x-intercepts', 'f(x) + a moves up; f(x + a) moves LEFT', '−f(x) reflects in x-axis; f(−x) in y-axis', 'x² + y² = r²: circle centre origin'],
      tier: 'H',
      flashcards: cards([['What does y = f(x − 3) do?', 'Translates the graph 3 units right.'], ['Radius of x² + y² = 49?', '7'], ['Shape of y = 1/x?', 'Reciprocal - two branches with asymptotes on the axes.']]),
      questions: [
        mc('y = f(x) is transformed to y = f(x + 2). Describe the transformation.', ['Translation 2 left', 'Translation 2 right', 'Translation 2 up', 'Reflection in the y-axis'], 'Inside the bracket works in the opposite direction.', { d: 3, tier: 'H' }),
        mc('Which equation is a circle of radius 5 centred at the origin?', ['x² + y² = 25', 'x² + y² = 5', 'y = x² + 5', 'x + y = 25'], 'r² = 25.', { d: 2, tier: 'H' }),
        mc('Which graph has asymptotes on both axes?', ['y = 1/x', 'y = x²', 'y = x³', 'y = 2ˣ'], 'The reciprocal graph never touches the axes.', { d: 2, tier: 'H' }),
      ],
    }),
    topic({
      id: 'm-alg-functions', title: 'Functions, iteration and proof', summary: 'Function notation, composite and inverse functions, iteration and algebraic proof (Higher).', tier: 'H',
      notes: `
## Functions
f(x) = 3x − 2 → f(4) = 10.
- **Composite** fg(x) means do g **first**, then f. If g(x) = x², fg(x) = 3x² − 2.
- **Inverse** f⁻¹(x): swap x and y and rearrange: y = 3x − 2 → x = (y + 2)/3 → f⁻¹(x) = (x + 2)/3.

## Iteration
x_(n+1) = ∛(5 − 2xₙ) with x₀ = 1: x₁ = ∛3 = 1.442..., keep pressing = on your calculator. Use **ANS**.

## Algebraic proof
- Even: **2n**; odd: **2n + 1**; consecutive: n, n + 1; multiple of 3: 3n.
> Prove the sum of three consecutive integers is a multiple of 3: n + (n + 1) + (n + 2) = 3n + 3 = **3(n + 1)** ✓
- "Show" for all n - examples are NOT a proof.
`,
      keyPoints: ['fg(x): apply g first', 'Inverse: swap x and y, rearrange', 'Iterate with ANS on the calculator', 'Proof: even 2n, odd 2n + 1, factorise to show multiples'],
      flashcards: cards([['f(x) = 2x + 1, g(x) = x². Find fg(3).', 'g(3) = 9, f(9) = 19.'], ['Inverse of f(x) = 5x − 4?', 'f⁻¹(x) = (x + 4)/5'], ['Algebraic expression for any odd number?', '2n + 1']]),
      questions: [
        num('f(x) = 4x − 1 and g(x) = x + 3. Find fg(2).', 19, 'g(2) = 5; f(5) = 19.', { d: 3, tier: 'H' }),
        mc('Find f⁻¹(x) if f(x) = (x − 6)/2', ['2x + 6', '2x − 6', '(x + 6)/2', 'x/2 + 6'], 'y = (x − 6)/2 → x = 2y + 6.', { d: 4, tier: 'H' }),
        ord('Put the steps of a proof that (2n + 1)² − (2n − 1)² is a multiple of 8 in order.', ['Expand: 4n² + 4n + 1 − (4n² − 4n + 1)', 'Simplify: 8n', '8n = 8 × n', 'So it is always a multiple of 8'], 'Expand, simplify, factorise, conclude.', { d: 4, tier: 'H' }),
      ],
    }),
  ],
};
