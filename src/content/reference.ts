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
  physics: `
In **2027** the full equation sheet (all of these) is provided. From **2028** it is still provided, but questions won't just ask you to copy an equation - so learn what each symbol and unit means.

## Paper 1
| Equation | Quantities (units) |
|---|---|
| Eₖ = ½mv² | kinetic energy (J), mass (kg), speed (m/s) |
| Eₑ = ½ke² | elastic PE (J), spring constant (N/m), extension (m) |
| Eₚ = mgh | GPE (J), mass (kg), g (N/kg), height (m) |
| ΔE = mcΔθ | energy (J), mass (kg), SHC (J/kg°C), temp change (°C) |
| P = E/t | power (W), energy (J), time (s) |
| P = W/t | power (W), work done (J), time (s) |
| efficiency = useful output ÷ total input | (energy or power) |
| Q = It | charge (C), current (A), time (s) |
| V = IR | p.d. (V), current (A), resistance (Ω) |
| P = VI | power (W) |
| P = I²R | power (W) |
| E = Pt | energy (J) |
| E = QV | energy (J), charge (C), p.d. (V) |
| ρ = m/V | density (kg/m³), mass (kg), volume (m³) |
| E = mL | energy (J), mass (kg), specific latent heat (J/kg) |
| pV = constant (Physics only) | pressure (Pa), volume (m³) |

## Paper 2
| Equation | Quantities (units) |
|---|---|
| W = mg | weight (N), mass (kg), g (N/kg) |
| W = Fs | work done (J), force (N), distance (m) |
| F = ke | force (N), spring constant (N/m), extension (m) |
| M = Fd (Physics only) | moment (Nm), force (N), perpendicular distance (m) |
| p = F/A | pressure (Pa), force (N), area (m²) |
| p = hρg (Physics only) | pressure (Pa), height (m), density (kg/m³), g |
| s = vt | distance (m), speed (m/s), time (s) |
| a = Δv/t | acceleration (m/s²), change in velocity (m/s), time (s) |
| v² − u² = 2as | final/initial velocity (m/s), acceleration, distance (m) |
| F = ma | force (N), mass (kg), acceleration (m/s²) |
| p = mv (Higher) | momentum (kg m/s) |
| F = mΔv/Δt (Higher, Physics only) | force (N) |
| v = fλ | wave speed (m/s), frequency (Hz), wavelength (m) |
| T = 1/f | period (s) |
| magnification = image height ÷ object height (Physics only) | |
| F = BIl (Higher) | force (N), magnetic flux density (T), current (A), length (m) |
| Vp/Vs = np/ns (Higher, Physics only) | transformer p.d.s and turns |
| VpIp = VsIs (Higher, Physics only) | |

## Must-know values
g = 9.8 N/kg · speed of EM waves 3 × 10⁸ m/s · UK mains 230 V, 50 Hz · speed of sound ~330 m/s
`,
  chemistry: `
You get a **periodic table**. Everything below must be learned.

## Common ions
| Positive | Negative |
|---|---|
| H⁺, Na⁺, K⁺, Li⁺, Ag⁺, NH₄⁺ | Cl⁻, Br⁻, I⁻, OH⁻, NO₃⁻ |
| Mg²⁺, Ca²⁺, Cu²⁺, Zn²⁺, Fe²⁺ | O²⁻, S²⁻, SO₄²⁻, CO₃²⁻ |
| Al³⁺, Fe³⁺ | |

## Reactivity series
K > Na > Li > Ca > Mg > **(C)** > Zn > Fe > **(H)** > Cu > Ag > Au

## Key formulae
| | |
|---|---|
| moles = mass ÷ Mᵣ (Higher) | concentration (g/dm³) = mass ÷ volume (dm³) |
| concentration (mol/dm³) = moles ÷ volume (dm³) | % yield = actual ÷ theoretical × 100 |
| atom economy = Mᵣ desired ÷ total Mᵣ reactants × 100 | Rf = distance by spot ÷ distance by solvent |
| mean rate = quantity ÷ time | 1 mol of gas = 24 dm³ at RTP (Higher) |

## Tests
| Test | Positive result |
|---|---|
| Hydrogen - lit splint | Squeaky pop |
| Oxygen - glowing splint | Relights |
| Carbon dioxide - limewater | Turns cloudy |
| Chlorine - damp litmus | Bleached white |
| Alkene - bromine water | Orange → colourless |
| Flame: Li⁺ / Na⁺ / K⁺ / Ca²⁺ / Cu²⁺ | Crimson / yellow / lilac / orange-red / green |
| NaOH: Cu²⁺ / Fe²⁺ / Fe³⁺ | Blue / green / brown precipitate |
| Halides (HNO₃ + AgNO₃): Cl⁻ / Br⁻ / I⁻ | White / cream / yellow precipitate |
| Sulfate (HCl + BaCl₂) | White precipitate |
| Carbonate (acid) | Fizzes; gas turns limewater cloudy |

## Salt rules
acid + metal → salt + hydrogen · acid + base → salt + water · acid + carbonate → salt + water + CO₂
`,
};
