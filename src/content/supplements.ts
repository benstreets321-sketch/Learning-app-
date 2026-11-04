// Content added to fill gaps found by the specification coverage check (see spec.ts).
// Each supplement is appended to an existing topic's lesson; NEW_TOPICS adds whole topics to a unit.
import type { Question, Topic } from './types';
import { mc, num, tf, txt, sort, cards, topic, examQ } from './dsl';

export interface Supplement {
  notes: string;
  keyPoints?: string[];
  questions?: Question[];
  flashcards?: { front: string; back: string }[];
}

export const SUPPLEMENTS: Record<string, Supplement> = {
  // ---------- Maths N5: product rule for counting; P6 frequency trees ----------
  'm-prob-basics': {
    notes: `
## Counting outcomes: the product rule
If there are **m** ways of doing one thing and **n** ways of doing another, there are **m × n** ways of doing both.

- 3 starters and 4 main courses: 3 × 4 = **12** different meals.
- A 4-digit PIN using 0-9 (digits can repeat): 10 × 10 × 10 × 10 = **10 000**.
- If digits **cannot** repeat: 10 × 9 × 8 × 7 = **5040**.

## Frequency trees
A frequency tree splits a total into groups, then splits each group again. The numbers on each pair of branches add up to the number they came from.

Example: 80 students. 35 walk to school, the rest don't. Of the walkers, 20 eat breakfast. Of the non-walkers, 30 eat breakfast.
- Non-walkers: 80 − 35 = 45. Walkers without breakfast: 35 − 20 = 15. Non-walkers without breakfast: 45 − 30 = 15.
- P(a student chosen at random walks and eats breakfast) = 20/80 = 1/4.
`,
    keyPoints: ['Product rule: m ways × n ways = m × n ways altogether', 'Frequency tree branches from one point add up to the number they split'],
    questions: [
      num('A café offers 4 sandwiches, 3 drinks and 2 snacks. How many different meal deals (one of each) are possible?', 24, '4 × 3 × 2 = 24 (product rule).', { d: 2 }),
      num('A code uses 3 letters from A-Z. Letters can repeat. How many codes are possible?', 17576, '26 × 26 × 26 = 17 576.', { d: 3 }),
      num('A 3-digit code uses the digits 1-9 with no digit repeated. How many codes are possible?', 504, '9 × 8 × 7 = 504.', { d: 3, tier: 'H' }),
      num('60 people: 25 are adults. 15 of the adults and 20 of the children like the film. How many children do NOT like the film?', 15, 'Children = 60 − 25 = 35. 35 − 20 = 15.', { d: 2 }),
    ],
    flashcards: [{ front: 'The product rule for counting', back: 'm ways for one choice and n ways for another gives m × n ways altogether.' }],
  },
  // ---------- Maths G7/G8 (Higher): negative scale factors and invariance ----------
  'm-geo-transform': {
    notes: `
## Enlargement with a negative scale factor (Higher)
With a **negative** scale factor the image is on the **opposite side** of the centre of enlargement and is **upside down** (rotated 180°).

Scale factor −2 from centre C: measure from C to each vertex, then go **twice as far in the opposite direction**.

## Invariant points (Higher)
An **invariant point** does not move under a transformation:
- Reflection: every point **on the mirror line** is invariant.
- Rotation: only the **centre of rotation** is invariant.
- Enlargement: only the **centre of enlargement** is invariant.
- Translation: **no** points are invariant.
`,
    keyPoints: ['Negative scale factor: image on the other side of the centre, upside down', 'Invariant points stay in the same place'],
    questions: [
      mc('Which points are invariant under a reflection?', ['Points on the mirror line', 'Only the origin', 'No points', 'Points furthest from the line'], 'Points on the mirror line map to themselves.', { d: 2, tier: 'H' }),
      mc('Point (2, 1) is enlarged with scale factor −3, centre (0, 0). Where is its image?', ['(−6, −3)', '(6, 3)', '(−2, −1)', '(6, −3)'], 'Multiply each coordinate by −3: (−6, −3).', { d: 3, tier: 'H' }),
      tf('A translation has no invariant points.', true, 'Every point moves by the same vector, so none stay still (unless the vector is zero).', { d: 2, tier: 'H' }),
    ],
  },
  // ---------- Maths A22 (Higher): quadratic inequalities ----------
  'm-alg-inequalities': {
    notes: `
## Quadratic inequalities (Higher)
1. Make one side zero and **factorise**.
2. Find the **critical values** (where it equals 0).
3. **Sketch** the parabola and read off where it is below (< 0) or above (> 0) the x-axis.

- x² − x − 6 < 0 → (x − 3)(x + 2) < 0 → between the roots: **−2 < x < 3**.
- x² ≥ 9 → x² − 9 ≥ 0 → outside the roots: **x ≤ −3 or x ≥ 3**.

A "less than zero" answer is one region **between** the roots; a "greater than zero" answer is **two** separate regions.
`,
    keyPoints: ['Quadratic inequality: factorise, find critical values, sketch, read off the region'],
    questions: [
      mc('Solve x² − x − 6 < 0', ['−2 < x < 3', 'x < −2 or x > 3', '−3 < x < 2', 'x < 3'], '(x − 3)(x + 2) < 0: the parabola is below the axis between the roots.', { d: 4, tier: 'H' }),
      mc('Solve x² ≥ 16', ['x ≤ −4 or x ≥ 4', '−4 ≤ x ≤ 4', 'x ≥ 4', 'x ≥ ±4'], 'x² − 16 ≥ 0 is above the axis outside the roots −4 and 4.', { d: 4, tier: 'H' }),
    ],
  },
  // ---------- Maths S1/S2: sampling and frequency polygons ----------
  'm-stat-charts': {
    notes: `
## Frequency polygons
Plot each frequency at the **midpoint** of its class, then join the points with **straight lines**. Useful for comparing two distributions on the same axes.

## Populations and samples
The **population** is everyone or everything you are interested in. A **sample** is part of it. A sample should be **random** and **large enough** to be representative; a small or biased sample can give misleading conclusions.
`,
    keyPoints: ['Frequency polygon: plot at class midpoints, join with straight lines', 'A sample should be random and large enough to represent the population'],
    questions: [
      mc('Where are the points of a frequency polygon plotted for the class 10 < x ≤ 20?', ['At x = 15', 'At x = 10', 'At x = 20', 'At the class width'], 'Points are plotted at the class midpoint.', { d: 1 }),
      mc('Why might asking 5 friends be a poor sample for "the favourite sport of students in the school"?', ['It is too small and not random, so it may not represent the school', 'It is too large', 'Friends always tell the truth', 'Samples must include teachers'], 'Small, non-random samples are often biased.', { d: 2 }),
    ],
  },
  // ---------- Biology 4.6.3: Mendel and speciation ----------
  'bio-evolution': {
    notes: `
## Gregor Mendel (Biology only)
In the mid-1800s Mendel, a monk, bred **pea plants** and recorded the characteristics of thousands of offspring. He concluded that characteristics are passed on in separate **"units"** (we now call them **genes**) and that some are **dominant** and some **recessive**.

His work was not recognised until after his death because:
- chromosomes, genes and DNA had not been discovered, so no one could explain how inheritance worked;
- he published in a little-known journal and was not a well-known scientist.

In the late 1800s chromosomes were observed; in the early 1900s genes were linked to chromosomes; in the mid-1900s the structure of DNA was worked out.

## Speciation (Biology only)
**Alfred Russel Wallace** independently proposed the theory of evolution by natural selection (published jointly with Darwin in 1858). He also worked on **warning colouration** and on **speciation**.

How a new species forms:
1. Two populations of a species become **isolated** (e.g. separated by a river, mountain range or sea).
2. Each population has **genetic variation** and lives in **different conditions**.
3. **Natural selection** favours different alleles in each population.
4. Over a long time they become so different that they can **no longer interbreed to produce fertile offspring** - they are now separate species.
`,
    keyPoints: ['Mendel: pea plants, inherited "units" (genes), dominant and recessive', 'Speciation: isolation → different selection → can no longer produce fertile offspring together'],
    questions: [
      mc('Why was Mendel\'s work not accepted during his lifetime?', ['Chromosomes and genes had not been discovered, so his ideas could not be explained', 'He used animals instead of plants', 'His results were proved wrong', 'He did not publish his work'], 'No one knew about genes or chromosomes, and he published in an obscure journal.', { d: 2 }),
      txt('Which scientist independently proposed natural selection alongside Darwin and studied speciation?', ['Wallace', 'Alfred Russel Wallace', 'Alfred Wallace'], 'Alfred Russel Wallace.', { d: 2 }),
      mc('What finally shows that two populations have become separate species?', ['They can no longer interbreed to produce fertile offspring', 'They look different', 'They live in different places', 'They eat different food'], 'The species definition is about producing fertile offspring.', { d: 2 }),
    ],
    flashcards: [
      { front: 'What did Mendel discover?', back: 'Characteristics are inherited in separate "units" (genes), some dominant and some recessive - from breeding pea plants.' },
      { front: 'Steps of speciation', back: 'Isolation → genetic variation → different natural selection in each population → can no longer interbreed to produce fertile offspring.' },
    ],
  },
  // ---------- Physics 4.6.1.5: seismic P and S waves ----------
  'phys-light-sound': {
    notes: `
## Seismic waves and the Earth's structure (Physics only)
Earthquakes produce two main types of seismic wave:
- **P-waves**: **longitudinal**, faster, travel through **solids and liquids**.
- **S-waves**: **transverse**, slower, travel through **solids only**.

S-waves are not detected on the opposite side of the Earth from an earthquake (the **S-wave shadow zone**), which is evidence that the **outer core is liquid**. P-waves refract at the boundaries inside the Earth, which also produces shadow zones and gives evidence for the size of the core.
`,
    keyPoints: ['P-waves: longitudinal, solids and liquids', 'S-waves: transverse, solids only - shadow zone shows the outer core is liquid'],
    questions: [
      sort('Sort the properties of seismic waves.', {
        'P-waves': ['Longitudinal', 'Travel through liquids', 'Faster'],
        'S-waves': ['Transverse', 'Solids only', 'Slower'],
      }, 'P = primary (push-pull, longitudinal); S = secondary (shake, transverse).', { d: 2 }),
      mc('What does the S-wave shadow zone tell us about the Earth?', ['The outer core is liquid', 'The crust is solid', 'The inner core is hot', 'The mantle is made of iron'], 'S-waves cannot travel through liquids.', { d: 3 }),
    ],
  },
  // ---------- Statistics: experimental design ----------
  'st-planning': {
    notes: `
## Designing experiments
- **Explanatory (independent) variable**: the one you change or choose.
- **Response (dependent) variable**: the one you measure.
- **Extraneous variables**: other factors that could affect the result - keep them constant (control them).
- **Control group**: a group that does not receive the treatment, for comparison.
- **Matched pairs**: pair people who are similar (e.g. age, ability) and give one of each pair the treatment.
- **Before-and-after**: measure the same people before and after the treatment.
- **Laboratory experiment** (controlled conditions), **field experiment** (real setting, less control) and **natural experiment** (the variable changes naturally, no control).
`,
    keyPoints: ['Explanatory variable is changed; response variable is measured', 'Control extraneous variables; use control groups, matched pairs or before-and-after designs'],
    questions: [
      mc('A study tests whether a new revision app improves test scores. The test score is the…', ['Response variable', 'Explanatory variable', 'Extraneous variable', 'Control group'], 'It is what is measured.', { d: 2 }),
      mc('Why use a control group?', ['To compare with the group that had the treatment', 'To make the sample bigger', 'To remove all variables', 'To save time'], 'A control group shows what happens without the treatment.', { d: 2 }),
    ],
  },
  // ---------- BTEC Enterprise C3: sources of support and finance ----------
  'ent-finance': {
    notes: `
## Sources of business support
- **Informal**: family and friends, previous colleagues - free, trusted, but may lack expert knowledge.
- **Professional**: accountants, solicitors, banks' business advisers - expert, but usually charge fees.
- **Voluntary and government**: gov.uk guidance, local Growth Hubs, Chambers of Commerce, trade associations, The King's Trust (for young people), mentors.

## Sources of finance
- **Internal**: owner's savings, retained profit, selling assets.
- **External**: bank loans, overdrafts, trade credit, crowdfunding, peer-to-peer lending, grants, business angels, venture capital, hire purchase and leasing.

Choose by the **amount** needed, **cost** (interest, fees, giving up ownership), **time** to repay and the **risk**.
`,
    keyPoints: ['Support can be informal, professional or from government/voluntary bodies', 'Choose finance by amount, cost, time and risk'],
    questions: [
      mc('Which source of support gives free advice but may not be expert?', ['Family and friends', 'An accountant', 'A solicitor', 'A bank business adviser'], 'Informal support is free but may lack specialist knowledge.', { d: 1 }),
      mc('A business angel provides finance in exchange for…', ['A share of the business (equity)', 'Interest only', 'Nothing', 'Free products'], 'Angels invest for a share of ownership and often give advice.', { d: 2 }),
    ],
  },
};

// ---------- English Language: Spoken Language endorsement (AQA 8700) ----------
export const NEW_TOPICS: Record<string, Topic[]> = {
  'el-skills': [
    topic({
      id: 'el-spoken', title: 'Spoken Language endorsement', summary: 'The presentation assessed by your teacher: Pass, Merit or Distinction.',
      notes: `
The Spoken Language endorsement is **reported separately** from your GCSE grade (Pass, Merit, Distinction or Not classified), but you must complete it.

## What you do
- Give a **presentation or speech** to an audience (often your class) on a topic you choose and research.
- **Respond to questions and feedback** from the audience.
- Use **Standard English** throughout.
- Your teacher assesses it; a sample of schools' presentations is filmed for moderation.

## The assessment objectives
- **AO7**: demonstrate presentation skills in a formal setting.
- **AO8**: listen and respond appropriately to spoken language, including questions and feedback.
- **AO9**: use spoken Standard English effectively.

## How to get a Distinction
- Pick a topic you can **argue or explain** with real substance - not just describe.
- **Structure** it: a hook, two or three clear points with evidence, a memorable ending.
- Use **notes or cue cards**, not a full script. Make eye contact and vary pace and tone.
- Prepare for **challenging questions** - think about counter-arguments in advance.
- Speak in **Standard English**: avoid slang and fillers ("like", "basically").
`,
      keyPoints: ['Reported separately: Pass, Merit, Distinction', 'Formal presentation + responding to questions + Standard English (AO7-AO9)', 'Use cue cards, a clear structure and prepare for challenging questions'],
      flashcards: cards([
        ['What grades are given for the Spoken Language endorsement?', 'Pass, Merit, Distinction (or Not classified) - separate from the GCSE grade.'],
        ['AO9 is about…', 'Using spoken Standard English effectively.'],
      ]),
      questions: [
        tf('The Spoken Language endorsement counts towards your 9-1 GCSE English Language grade.', false, 'It is reported separately as Pass, Merit or Distinction.', { d: 1 }),
        mc('Which helps most for a Distinction?', ['Using cue cards and responding confidently to challenging questions', 'Reading a full script word for word', 'Choosing a topic with nothing to argue about', 'Using lots of slang to sound natural'], 'Assessors look for formal presentation, purposeful responses to questions and Standard English.', { d: 2 }),
        sort('Sort into the assessment objective.', {
          AO7: ['Presenting in a formal setting'],
          AO8: ['Responding to questions and feedback'],
          AO9: ['Using spoken Standard English'],
        }, 'AO7 presenting, AO8 listening and responding, AO9 Standard English.', { d: 2 }),
      ],
      examQuestions: [
        examQ('Plan a 3-4 minute presentation on the statement: "Social media does more harm than good for teenagers." Write your opening, your three main points with evidence, two challenging questions you might be asked (with answers), and your ending.', 10, [
          'Level 3 (8-10): A purposeful, well-structured plan with a strong opening and ending, developed points with evidence, and thoughtful, well-prepared responses to challenging questions.',
          'Level 2 (4-7): A clear plan with relevant points and some evidence; prepared responses to questions.',
          'Level 1 (1-3): A simple plan with limited development.',
        ], { meta: 'Spoken Language endorsement - practice planning task', time: 15 }),
      ],
    }),
  ],
};
