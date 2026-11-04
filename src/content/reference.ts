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
  business: `
Formulas are **not** given in the exam - learn them.

| Measure | Formula |
|---|---|
| Revenue | selling price × quantity sold |
| Total costs | fixed costs + variable costs |
| Variable costs | variable cost per unit × output |
| Profit / loss | total revenue − total costs |
| Gross profit | revenue − cost of sales |
| Net (operating) profit | gross profit − other operating expenses |
| Contribution per unit | selling price − variable cost per unit |
| Break-even output | fixed costs ÷ contribution per unit |
| Margin of safety | actual sales − break-even sales |
| Net cash flow | cash inflows − cash outflows |
| Closing balance | opening balance + net cash flow |
| Gross profit margin | gross profit ÷ revenue × 100 |
| Net profit margin | net profit ÷ revenue × 100 |
| Average rate of return | average annual profit ÷ cost of investment × 100 |
| Interest (%) on a loan | (total repayment − borrowed) ÷ borrowed × 100 |
| Market share | firm's sales ÷ total market sales × 100 |
| Percentage change | change ÷ original × 100 |
| Average (unit) cost | total cost ÷ output |
| Current ratio (BTEC) | current assets ÷ current liabilities |
| Liquid capital / acid test (BTEC) | (current assets − inventory) ÷ current liabilities |

## Must-know models
4Ps (product, price, promotion, place) · product life cycle · Boston matrix · SMART objectives · PEST and SWOT (BTEC) · job/batch/flow production · JIT vs JIC
`,
  statistics: `
## Averages and spread
| | |
|---|---|
| Mean | Σx ÷ n · from a table Σfx ÷ Σf · grouped: use midpoints |
| Median position | (n + 1) ÷ 2 |
| Quartile positions (listed data) | LQ (n + 1) ÷ 4 · UQ 3(n + 1) ÷ 4 |
| IQR | UQ − LQ |
| Standard deviation | σ = √(Σx²/n − x̄²) or √(Σfx²/Σf − x̄²) |
| Outliers | < Q1 − 1.5 × IQR or > Q3 + 1.5 × IQR; or mean ± 3σ |
| Pearson's skewness | 3(mean − median) ÷ σ |
| Weighted mean | Σwx ÷ Σw |

## Diagrams
Pie angle = f ÷ total × 360° · Frequency density = f ÷ class width · Cumulative frequency at upper class boundaries

## Correlation and time series
| | |
|---|---|
| Spearman's rank | rₛ = 1 − 6Σd² ÷ n(n² − 1) |
| Regression line | y = a + bx (b = gradient; line passes through (x̄, ȳ)) |
| Seasonal variation | actual − moving average (trend) |

## Indices, rates and sampling
| | |
|---|---|
| Index number | current ÷ base × 100 |
| Crude rate | number ÷ population × 1000 |
| Stratified sample | group size ÷ population × sample size |
| Petersen estimate | N = Mn ÷ m |

## Probability and distributions
P(not A) = 1 − P(A) · expected frequency = nP · P(A|B) = P(A and B) ÷ P(B) · binomial P(X = r) = ⁿCᵣ pʳ(1 − p)ⁿ⁻ʳ · normal: 68% / 95% / 99.7% within 1 / 2 / 3 SD · z = (x − mean) ÷ SD
`,
  imedia: `
## File size calculations
| | |
|---|---|
| Bitmap image size (bits) | width (px) × height (px) × colour depth (bits) |
| Audio size (bits) | sample rate (Hz) × bit depth × channels × seconds |
| Bits → bytes | ÷ 8 · bytes → KB ÷ 1024 · KB → MB ÷ 1024 |
| Number of colours | 2^colour depth (e.g. 24-bit = 16 777 216) |
| Pixels for print | inches × DPI |
| Frames in a video | frames per second × seconds |

## File formats
| Format | Type | Compression | Typical use |
|---|---|---|---|
| JPEG | Bitmap | Lossy | Web photos |
| PNG | Bitmap | Lossless, transparency | Web graphics, logos |
| GIF | Bitmap | Lossless, 256 colours, animation | Simple animations |
| TIFF | Bitmap | Lossless | High-quality print |
| PSD | Bitmap (layers) | - | Editing only |
| SVG / AI / EPS | Vector | - | Logos, scalable graphics |
| PDF | Document | - | Print-ready documents |
| WAV / AIFF | Audio | Uncompressed | Editing, high quality |
| MP3 / AAC | Audio | Lossy | Streaming, portable |
| FLAC | Audio | Lossless | Archiving |
| MP4 (H.264) | Video | Lossy | Web, most devices |
| MOV / AVI / WMV | Video | Varies | Editing / platform-specific |

## Key values
Screen 72 PPI · Print 300 DPI · RGB = screen · CMYK = print · Full HD 1920 × 1080 · 16:9 aspect ratio · CD audio 44.1 kHz, 16-bit, stereo

## Regulators and ratings
BBFC (films: U, PG, 12A/12, 15, 18, R18) · PEGI (games: 3, 7, 12, 16, 18) · Ofcom (broadcast) · ASA (advertising) · IPSO (press)
`,
};
