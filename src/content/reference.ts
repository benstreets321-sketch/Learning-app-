// Reference sheets (Markdown) per subject: formulae, equations, must-learn facts.
export const REFERENCE: Record<string, string> = {
  maths: `
## ✅ Given on the formulae sheet (2027 and 2028)
**Foundation and Higher**
| Formula | |
|---|---|
| Area of a trapezium | ½(a + b)h |
| Volume of a prism | area of cross-section × length |
| Circle | circumference = 2πr = πd; area = πr² |
| Pythagoras | a² + b² = c² |
| Right-angled trigonometry | sin = opp/hyp, cos = adj/hyp, tan = opp/adj |
| Compound interest | P(1 + r/100)ⁿ |
| Probability | P(A or B) = P(A) + P(B) − P(A and B) |

**Higher only (also given)**
| Formula | |
|---|---|
| Quadratic formula | x = (−b ± √(b² − 4ac)) / 2a |
| Sine rule | a/sin A = b/sin B = c/sin C |
| Cosine rule | a² = b² + c² − 2bc cos A |
| Area of a triangle | ½ab sin C |
| Probability | P(A and B) = P(A given B) × P(B) |

## ❌ NOT on the sheet - you must memorise
| Topic | Formula / fact |
|---|---|
| Area | rectangle l × w; triangle ½bh; parallelogram bh |
| Volume | cuboid lwh; cylinder πr²h; pyramid ⅓ × base × h (cone/sphere formulae are given in the question when needed) |
| Circles | arc = θ/360 × 2πr; sector = θ/360 × πr² |
| Angles | triangle 180°, quadrilateral 360°, straight line 180°, point 360°; polygon interior sum (n − 2) × 180°; exterior sum 360° |
| Parallel lines | alternate equal, corresponding equal, co-interior add to 180° |
| Circle theorems (H) | all 8 (see the Circle theorems topic) |
| Similarity | lengths × k, areas × k², volumes × k³ |
| Exact trig values | sin/cos/tan of 0°, 30°, 45°, 60°, 90° |
| Straight lines | y = mx + c; gradient = Δy/Δx; parallel same m; perpendicular m₁m₂ = −1 (H) |
| Circle equation (H) | x² + y² = r² |
| Index laws | aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁰ = 1; a⁻ⁿ = 1/aⁿ; a^(1/n) = ⁿ√a |
| Difference of two squares | a² − b² = (a + b)(a − b) |
| Compound measures | speed = d/t; density = m/V; pressure = F/A |
| Percentages | % change = change/original × 100; reverse % = new ÷ multiplier; simple interest |
| Proportion | y = kx, y = k/x, y = kx² ... |
| Probability | outcomes sum to 1; independent: P(A) × P(B) |
| Statistics | mean from table Σfx/Σf; IQR = UQ − LQ; frequency density = f ÷ class width |

## Useful numbers
Squares to 15² = 225 · Cubes 2³ = 8, 3³ = 27, 4³ = 64, 5³ = 125, 10³ = 1000 · Primes to 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47
`,
};
