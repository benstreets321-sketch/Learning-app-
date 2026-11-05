import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, topic, examQ, ord, match } from '../../dsl';

const SIX = (points: string[]) => [
  'Level 3 (5-6): detailed, coherent, logically sequenced answer using correct terms',
  'Level 2 (3-4): several relevant points with some linking',
  'Level 1 (1-2): simple relevant statements',
  ...points,
];

export const physPaper1: Unit[] = [
  {
    id: 'phys-energy', title: 'Energy', description: 'Paper 1 · energy stores, transfers, efficiency and resources.',
    topics: [
      topic({
        id: 'phys-stores', title: 'Energy stores, work and power', summary: 'Energy stores and transfers; kinetic, gravitational and elastic energy; power.',
        notes: `
## Energy stores
Kinetic, gravitational potential, elastic potential, thermal (internal), chemical, magnetic, electrostatic, nuclear.
Energy is **transferred** between stores by: **mechanical work** (forces), **electrical work** (current), **heating**, **radiation** (light, sound).

**Conservation of energy**: energy cannot be created or destroyed - only transferred, stored or **dissipated**. In a **closed system** total energy stays the same.

## Key equations
| Equation | Symbols |
|---|---|
| **Eₖ = ½ m v²** | kinetic energy (J), mass (kg), speed (m/s) |
| **Eₚ = m g h** | GPE (J), g = 9.8 N/kg, height (m) |
| **Eₑ = ½ k e²** | elastic PE (J), spring constant (N/m), extension (m) |
| **P = E ÷ t** and **P = W ÷ t** | power (W), energy/work (J), time (s) |
| **W = F s** | work done (J), force (N), distance (m) |

**Power** = rate of energy transfer. 1 watt = 1 joule per second. Two motors lifting the same load: the more powerful one does it faster.

:::exam Equation sheet
In 2027 you get the full physics equation sheet (including these). From 2028 you'll still get it, but questions won't simply ask you to copy an equation - so know what each symbol means and how to rearrange.
:::

:::example Falling object
A 2 kg ball falls 5 m. GPE lost = 2 × 9.8 × 5 = 98 J → if no air resistance, KE gained = 98 J → ½ × 2 × v² = 98 → v = 9.9 m/s.
:::
`,
        keyPoints: ['Eight energy stores; four transfer pathways', 'Energy is conserved - only transferred or dissipated', 'Eₖ = ½mv²; Eₚ = mgh; Eₑ = ½ke²', 'Power = energy ÷ time (W = J/s)', 'Work done = force × distance'],
        generators: ['p-ke', 'p-gpe', 'p-power', 'p-work', 'p-spring', 'p-spot-equation'],
        misconceptions: [{ wrong: 'Energy is used up.', right: 'Energy is never used up - it is transferred, usually ending up dissipated as thermal energy in the surroundings.' }],
        flashcards: cards([['Kinetic energy equation?', 'Eₖ = ½mv²'], ['GPE equation?', 'Eₚ = mgh'], ['Elastic potential energy equation?', 'Eₑ = ½ke²'], ['What is power?', 'The rate of energy transfer (or work done): P = E/t.'], ['1 watt = ?', '1 joule per second'], ['State the principle of conservation of energy', 'Energy cannot be created or destroyed, only transferred usefully, stored or dissipated.']]),
        questions: [
          num('A 60 kg runner moves at 5 m/s. Calculate their kinetic energy.', 750, '½ × 60 × 25 = 750 J.', { d: 2, unit: 'J', h: ['Square the speed first.'] }),
          num('A 2 kg book is lifted 1.5 m. Calculate the GPE gained (g = 9.8 N/kg).', 29.4, '2 × 9.8 × 1.5 = 29.4 J.', { d: 1, unit: 'J' }),
          mc('A ball is dropped. Which energy transfer happens as it falls (ignoring air resistance)?', ['Gravitational potential → kinetic', 'Kinetic → gravitational potential', 'Chemical → kinetic', 'Thermal → kinetic'], 'It loses height and gains speed.', { d: 1 }),
          num('A motor transfers 3600 J in 2 minutes. What is its power?', 30, '3600 ÷ 120 = 30 W.', { d: 3, unit: 'W', h: ['Convert minutes to seconds.'] }),
          tf('If the speed of a car doubles, its kinetic energy doubles.', false, 'KE ∝ v², so it quadruples.', { d: 3 }),
        ],
        workedExamples: [{ title: 'GPE to KE', problem: 'A 0.5 kg ball is dropped from 20 m. Calculate its speed just before it hits the ground (ignore air resistance).', steps: ['GPE = mgh = 0.5 × 9.8 × 20 = 98 J', 'KE gained = 98 J', '½ × 0.5 × v² = 98 → v² = 392', 'v = 19.8 m/s'], answer: '19.8 m/s', tryIt: 'A 3 kg mass falls 5 m. Find its speed at the bottom.', tryAnswer: 'GPE = 147 J → v = √(2 × 147 ÷ 3) = 9.9 m/s' }],
      }),
      topic({
        id: 'phys-efficiency', title: 'Efficiency, specific heat capacity and insulation', summary: 'Dissipation, efficiency, specific heat capacity practical and reducing energy loss.', tags: ['Required practical'],
        notes: `
## Efficiency
**Efficiency = useful output energy (or power) ÷ total input energy (or power)**. Can be a decimal or × 100 for %. Never more than 1 (100%).
Wasted energy is usually **dissipated** as thermal energy to the surroundings. Reduce it with **lubrication** (less friction) and **thermal insulation**.

## Specific heat capacity
The energy needed to raise **1 kg** of a substance by **1°C**.
**ΔE = m c Δθ** (J, kg, J/kg°C, °C). Water has a high SHC (4200 J/kg°C).

:::exam Required practical: specific heat capacity
Heat a metal block (known mass) with an immersion heater; insulate it; measure temperature rise with a thermometer and energy with a joulemeter (or P × t). c = ΔE ÷ (m × Δθ). Answers are usually too high because energy is lost to the surroundings.
:::

## Thermal insulation
- **Thermal conductivity**: higher = faster energy transfer by conduction.
- Reduce heat loss from homes: **thicker walls**, walls of **lower thermal conductivity**, loft insulation, cavity walls, double glazing.

:::exam Required practical (Physics only): thermal insulation
Compare how fast hot water in beakers cools with different insulating materials or thicknesses.
:::
`,
        keyPoints: ['Efficiency = useful ÷ total', 'Wasted energy is dissipated (thermal)', 'Lubrication and insulation reduce waste', 'ΔE = mcΔθ', 'SHC: energy to raise 1 kg by 1°C', 'Lower thermal conductivity = better insulator'],
        generators: ['p-efficiency', 'p-shc'],
        flashcards: cards([['Efficiency equation?', 'useful output ÷ total input'], ['Define specific heat capacity', 'The energy needed to raise the temperature of 1 kg of a substance by 1°C.'], ['Equation for SHC?', 'ΔE = mcΔθ'], ['Two ways to reduce unwanted energy transfer?', 'Lubrication; thermal insulation.'], ['What does high thermal conductivity mean?', 'Energy is transferred quickly by conduction.']]),
        questions: [
          num('A kettle uses 2000 J and transfers 1700 J usefully. What is its efficiency as a percentage?', 85, '1700 ÷ 2000 × 100 = 85%.', { d: 1, unit: '%' }),
          num('How much energy is needed to heat 2 kg of water by 10°C? (c = 4200 J/kg°C)', 84000, '2 × 4200 × 10 = 84 000 J.', { d: 2, unit: 'J' }),
          mc('In the SHC practical, why is the measured value usually higher than the true value?', ['Some energy is lost to the surroundings, so more energy is supplied than heats the block', 'The thermometer reads too low because it is faulty or badly placed', 'The block is too heavy for the heater to warm all the way through', 'The heater is more than 100% efficient when it is first switched on'], 'Insulating the block reduces this error.', { d: 3 }),
          tf('A material with a high thermal conductivity is a good insulator.', false, 'Good insulators have LOW thermal conductivity.', { d: 1 }),
        ],
        examQuestions: [examQ('Describe how you would determine the specific heat capacity of a metal block.', 6, SIX(['Measure mass of the block with a balance', 'Insert immersion heater and thermometer; insulate the block', 'Record starting temperature', 'Switch on; measure energy with joulemeter (or V, I, t)', 'Record temperature rise after a set time', 'Calculate c = ΔE ÷ (mΔθ)']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
      topic({
        id: 'phys-resources', title: 'National and global energy resources', summary: 'Renewable and non-renewable resources, their uses and impacts.',
        notes: `
| Resource | Renewable? | Reliable? | Environmental impact |
|---|---|---|---|
| Fossil fuels (coal, oil, gas) | ✗ | ✓ (on demand) | CO₂ → climate change; SO₂ → acid rain |
| Nuclear | ✗ | ✓ | No CO₂ in use; radioactive waste; risk of accidents |
| Wind | ✓ | ✗ (weather) | Visual/noise; no CO₂ in use |
| Solar | ✓ | ✗ (daytime, weather) | Little; manufacture uses resources |
| Hydroelectric | ✓ | ✓ | Flooding valleys, habitats lost |
| Tidal | ✓ | ✓ (predictable) | Affects estuary habitats; few sites |
| Wave | ✓ | ✗ | Hazard to boats; few sites |
| Geothermal | ✓ | ✓ | Only in volcanic areas |
| Bio-fuel | ✓ | ✓ | Land use; carbon-neutral in theory |

**Uses**: transport (mainly fossil fuels), electricity generation, heating.
**Trends**: the UK is moving away from coal towards renewables. Issues: cost, reliability, public opinion, politics.
`,
        keyPoints: ['Renewable: replenished as used', 'Fossil fuels: reliable but produce CO₂', 'Nuclear: no CO₂, radioactive waste', 'Wind/solar: weather-dependent', 'Tidal predictable; hydro floods valleys'],
        flashcards: cards([['What is a renewable resource?', 'One that is (or can be) replenished as it is used.'], ['Advantage of nuclear power?', 'No CO₂ emitted during generation; reliable.'], ['Disadvantage of wind power?', 'Unreliable - depends on the weather; visual/noise pollution.'], ['Why is tidal power reliable?', 'Tides are predictable.']]),
        questions: [
          multi('Which are renewable resources?', ['Wind', 'Solar', 'Tidal', 'Hydroelectric'], ['Coal', 'Natural gas', 'Uranium'], 'Renewables are replenished.', { d: 1 }),
          mc('Which resource is renewable AND reliable?', ['Hydroelectric', 'Wind', 'Solar', 'Oil'], 'Hydro can be switched on when needed.', { d: 2 }),
        ],
        examQuestions: [examQ('Evaluate replacing a coal-fired power station with a wind farm.', 6, SIX(['Wind is renewable; coal is non-renewable', 'Wind: no CO₂ in operation - reduces climate change; coal releases CO₂ and SO₂', 'Wind is unreliable - not on demand; coal is reliable', 'Wind farms take up large areas; visual/noise impact', 'Wind has low running costs but high set-up cost', 'Justified conclusion']), { meta: '6-mark evaluate', time: 7 })],
      }),
    ],
  },
  {
    id: 'phys-elec', title: 'Electricity', description: 'Paper 1 · circuits, resistance, mains electricity and static.',
    topics: [
      topic({
        id: 'phys-circuits', title: 'Current, potential difference and resistance', summary: 'Circuit symbols, V = IR, I-V characteristics, series and parallel circuits.', tags: ['Required practical'],
        notes: `
- **Current (I)**: rate of flow of charge. **Q = I t** (C, A, s). Measured with an **ammeter in series**.
- **Potential difference (V)**: energy transferred per unit charge. Measured with a **voltmeter in parallel**.
- **Resistance (R)**: **V = I R** (V, A, Ω).

## I-V characteristics
| Component | Graph | Why |
|---|---|---|
| **Ohmic resistor** (constant temperature) | Straight line through origin | Constant resistance |
| **Filament lamp** | Curve flattening | Gets hotter → resistance **increases** |
| **Diode** | Current flows one way only | Very high resistance in reverse |

- **Thermistor**: resistance **decreases** as temperature **increases** (thermostats).
- **LDR**: resistance **decreases** as light intensity **increases** (night lights).

## Series vs parallel
| | Series | Parallel |
|---|---|---|
| Current | Same everywhere | Splits between branches (adds up) |
| p.d. | Shared between components | Same across each branch |
| Resistance | R_total = R₁ + R₂ | Total is **less** than the smallest resistor |

:::exam Required practicals
- **Resistance of a wire**: measure V and I for different lengths → R = V/I → R ∝ length.
- **I-V characteristics**: use a variable resistor to change current; record V and I for resistor, lamp, diode (reverse too).
:::
`,
        keyPoints: ['Q = It', 'V = IR', 'Ammeter in series, voltmeter in parallel', 'Filament lamp resistance increases as it heats', 'Diode: one direction only', 'Thermistor: R falls as temperature rises; LDR: R falls in light', 'Series: current same, p.d. shared; parallel: p.d. same, current splits'],
        generators: ['p-charge', 'p-ohm'],
        flashcards: cards([['Equation linking charge, current and time?', 'Q = It'], ['Equation linking p.d., current and resistance?', 'V = IR'], ['How does a thermistor\'s resistance change as it gets hotter?', 'It decreases.'], ['How does an LDR\'s resistance change in bright light?', 'It decreases.'], ['Current in a series circuit?', 'The same through every component.'], ['Total resistance of 3 Ω and 6 Ω in series?', '9 Ω'], ['Why does a filament lamp\'s resistance increase?', 'As it gets hotter, ions vibrate more and collide with electrons more.']]),
        questions: [
          num('A current of 0.5 A flows through a 12 Ω resistor. Calculate the p.d.', 6, 'V = 0.5 × 12 = 6 V.', { d: 1, unit: 'V' }),
          mc('What happens to the resistance of an LDR as light intensity increases?', ['It decreases', 'It increases', 'It stays the same', 'It becomes zero'], 'LDRs are used in automatic night lights.', { d: 1 }),
          mc('Two identical lamps are connected in parallel to a 6 V battery. What is the p.d. across each?', ['6 V', '3 V', '12 V', '0 V'], 'In parallel each branch gets the full p.d.', { d: 2 }),
          tf('Adding a resistor in parallel increases the total resistance.', false, 'It decreases total resistance - there are more paths for current.', { d: 3 }),
          match('Match the component to its behaviour.', [['Diode', 'Current flows in one direction only'], ['Filament lamp', 'Resistance rises as it heats up'], ['Thermistor', 'Resistance falls as temperature rises'], ['Ohmic resistor', 'Constant resistance at constant temperature']], 'I-V characteristics.', { d: 2 }),
        ],
        examQuestions: [examQ('Describe how you would investigate how the length of a wire affects its resistance.', 6, SIX(['Connect wire to a power supply with ammeter in series and voltmeter in parallel', 'Use crocodile clips at measured lengths along a metre ruler', 'Record V and I for each length', 'Calculate R = V ÷ I', 'Use a low current / switch off between readings to avoid heating', 'Plot R against length; repeat for mean']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
      topic({
        id: 'phys-mains', title: 'Mains electricity, power and the National Grid', summary: 'AC/DC, plug wiring, electrical power and energy, the National Grid.',
        notes: `
- **DC**: one direction (cells, batteries). **AC**: changes direction. UK mains: **230 V, 50 Hz** AC.

## Three-core cable
| Wire | Colour | Role |
|---|---|---|
| Live | **Brown** | Carries the 230 V |
| Neutral | **Blue** | Completes the circuit, ~0 V |
| Earth | **Green and yellow** | Safety - stops the casing becoming live |
Touching the live wire is dangerous even if the switch is off - a large p.d. across your body drives a current through you.

## Power and energy
| Equation | |
|---|---|
| **P = V I** | power (W), p.d. (V), current (A) |
| **P = I² R** | |
| **E = P t** | energy (J), power (W), time (s) |
| **E = Q V** | energy (J), charge (C), p.d. (V) |

## The National Grid
Power stations → **step-up transformers** (very high p.d., e.g. 400 000 V, **low current** → **less energy lost as heat** in cables) → transmission cables → **step-down transformers** → homes (230 V).
`,
        keyPoints: ['UK mains: 230 V, 50 Hz AC', 'Live brown, neutral blue, earth green/yellow', 'P = VI; P = I²R; E = Pt; E = QV', 'Step-up transformers reduce current → less energy wasted', 'Step-down for safe use in homes'],
        generators: ['p-elec-power', 'p-energy-elec'],
        flashcards: cards([['UK mains supply?', '230 V AC at 50 Hz.'], ['Colour of the live wire?', 'Brown.'], ['Purpose of the earth wire?', 'Safety - carries current to earth if the casing becomes live.'], ['Why is electricity transmitted at high p.d.?', 'Lower current → less energy lost by heating in the cables.'], ['Equation for electrical power?', 'P = VI (or P = I²R)']]),
        questions: [
          num('A 230 V heater draws 10 A. Calculate its power.', 2300, '230 × 10 = 2300 W.', { d: 1, unit: 'W' }),
          mc('What colour is the neutral wire?', ['Blue', 'Brown', 'Green and yellow', 'Red'], 'Neutral = blue.', { d: 1 }),
          mc('Why do step-up transformers make the National Grid efficient?', ['They increase p.d. so current is lower and less energy is lost as heat', 'They increase the current so more energy reaches homes', 'They generate the electricity at the power station', 'They reduce the p.d. so it is safe to use in homes'], 'Power loss in cables ∝ I².', { d: 3 }),
          num('A 2 kW kettle is used for 3 minutes. How many joules are transferred?', 360000, '2000 × 180 = 360 000 J.', { d: 3, unit: 'J' }),
        ],
      }),
      topic({
        id: 'phys-static', title: 'Static electricity and electric fields', summary: 'Charging by friction, sparks and electric fields (Physics only).', tags: ['Physics only'],
        notes: `
- Rubbing insulators transfers **electrons** (only electrons move!). The object gaining electrons becomes **negative**; losing electrons → **positive**.
- **Like charges repel, opposite charges attract** (non-contact force).
- A **spark** happens when the p.d. is high enough for charge to jump through the air.
- **Electric field**: around a charged object; stronger closer to it. Field lines point **away from positive**, towards negative.
`,
        keyPoints: ['Only electrons move when charging by friction', 'Gaining electrons → negative', 'Like charges repel; opposites attract', 'Sparks when p.d. is high enough', 'Field strength decreases with distance'],
        flashcards: cards([['What moves when an insulator is charged by rubbing?', 'Electrons.'], ['A polythene rod gains electrons. What is its charge?', 'Negative.'], ['Direction of electric field lines?', 'From positive to negative.']]),
        questions: [
          tf('When a balloon is rubbed, positive charges move onto it.', false, 'Only electrons (negative) move.', { d: 2 }),
          mc('Two negatively charged rods are brought close. They...', ['Repel', 'Attract', 'Do nothing', 'Become neutral'], 'Like charges repel.', { d: 1 }),
        ],
      }),
    ],
  },
  {
    id: 'phys-particle', title: 'Particle model of matter', description: 'Paper 1 · density, states of matter, internal energy and gas pressure.',
    topics: [
      topic({
        id: 'phys-particles', title: 'Density, states and internal energy', summary: 'Density practical, changes of state, internal energy, latent heat and gas pressure.', tags: ['Required practical'],
        notes: `
## Density
**ρ = m ÷ V** (kg/m³ or g/cm³). Solids are usually densest (particles close, regular); gases least dense.

:::exam Required practical: density
- **Regular solid**: measure dimensions (ruler) → V; mass (balance).
- **Irregular solid**: **displacement** - volume of water displaced in a eureka can / measuring cylinder.
- **Liquid**: mass of measuring cylinder with and without liquid; read volume at the bottom of the meniscus.
:::

## Internal energy and changes of state
- **Internal energy** = total kinetic + potential energy of all particles.
- Heating either **raises the temperature** OR **changes state** (not both at once).
- Changes of state are **physical** and reversible; mass is conserved.
- **Specific latent heat**: energy to change the state of 1 kg **without a temperature change**. **E = m L**. Fusion (melting) and vaporisation (boiling).
- Heating graphs have **flat sections** during changes of state.

## Gas pressure
Gas particles move randomly; collisions with walls cause **pressure**.
- At constant volume, **higher temperature → faster particles → more frequent, harder collisions → higher pressure**.
- (Physics only) At constant temperature, **pV = constant** (compress a gas → pressure rises). Doing work on a gas (pumping a tyre) increases its temperature.
`,
        keyPoints: ['ρ = m ÷ V', 'Displacement for irregular objects', 'Internal energy = KE + PE of particles', 'State changes: temperature constant', 'E = mL (specific latent heat)', 'Hotter gas → faster particles → higher pressure', 'pV = constant (Physics only)'],
        generators: ['p-density', 'p-latent'],
        flashcards: cards([['Density equation?', 'ρ = m ÷ V'], ['What is internal energy?', 'The total kinetic and potential energy of all the particles in a system.'], ['Define specific latent heat', 'Energy needed to change the state of 1 kg of a substance with no change in temperature.'], ['Why does a heating graph go flat?', 'Energy is breaking bonds/changing state rather than raising temperature.'], ['How do you find the volume of an irregular object?', 'Displacement of water (eureka can or measuring cylinder).']]),
        questions: [
          num('A stone has mass 120 g and displaces 40 cm³ of water. Find its density in g/cm³.', 3, '120 ÷ 40 = 3 g/cm³.', { d: 1, unit: 'g/cm³' }),
          mc('What happens to the temperature of ice while it is melting?', ['It stays the same', 'It rises steadily', 'It falls', 'It rises then falls'], 'Energy goes into breaking bonds (latent heat).', { d: 2 }),
          mc('Why does gas pressure in a sealed can increase when heated?', ['Particles move faster and hit the walls more often and with more force', 'The particles get bigger, so they take up more space', 'More particles are made as the gas gets hotter', 'The can shrinks slightly, so there is less space'], 'Kinetic theory of gases.', { d: 2 }),
          num('How much energy is needed to melt 0.5 kg of ice? (L = 334 000 J/kg)', 167000, '0.5 × 334 000 = 167 000 J.', { d: 2, unit: 'J' }),
        ],
      }),
    ],
  },
  {
    id: 'phys-atomic', title: 'Atomic structure and radioactivity', description: 'Paper 1 · the atom, radiation, half-life, fission and fusion.',
    topics: [
      topic({
        id: 'phys-radiation', title: 'Radioactive decay and half-life', summary: 'Alpha, beta, gamma, decay equations, half-life, contamination and irradiation.',
        notes: `
## The atom
Nucleus (protons + neutrons) radius ~1/10 000 of the atom. History: plum pudding → **Rutherford alpha scattering** → nuclear model → Bohr shells → Chadwick neutron.
Electrons can move to higher shells by absorbing EM radiation, and fall back emitting it. Atoms losing electrons become **ions**.

## Nuclear radiation
| Type | What it is | Ionising | Penetration | Stopped by | Range in air |
|---|---|---|---|---|---|
| **Alpha (α)** | 2 protons + 2 neutrons (helium nucleus) | **Strongly** | Low | **Paper**/skin | ~5 cm |
| **Beta (β)** | Fast electron from the nucleus | Moderate | Medium | ~3 mm **aluminium** | ~1 m |
| **Gamma (γ)** | EM wave | Weakly | High | Thick **lead**/concrete | Very far |
| Neutron | | | | | |

## Decay equations
- Alpha: mass number **−4**, atomic number **−2**: ²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He
- Beta: mass number unchanged, atomic number **+1** (a neutron becomes a proton): ¹⁴₆C → ¹⁴₇N + ⁰₋₁e
- Gamma: no change in mass or atomic number.

## Half-life
The time for the **number of unstable nuclei** (or the **activity**) to halve. Decay is **random**. Activity measured in **becquerels (Bq)** with a Geiger-Müller tube.

## Contamination vs irradiation
- **Irradiation**: exposure to radiation from an outside source - you don't become radioactive.
- **Contamination**: radioactive atoms get onto or into you - more dangerous (especially alpha inside the body).
- Precautions: gloves, tongs, shielding, minimise time, keep distance.
`,
        keyPoints: ['Alpha: helium nucleus, most ionising, stopped by paper', 'Beta: electron, stopped by aluminium', 'Gamma: EM wave, needs thick lead', 'Alpha: −4 mass, −2 atomic number; beta: atomic number +1', 'Half-life: time for activity to halve', 'Contamination is worse than irradiation'],
        generators: ['p-halflife'],
        flashcards: cards([['What is an alpha particle?', '2 protons and 2 neutrons (a helium nucleus).'], ['What stops beta radiation?', 'A few mm of aluminium.'], ['Most ionising type of radiation?', 'Alpha.'], ['Define half-life', 'The time taken for the number of radioactive nuclei (or the activity) to halve.'], ['Difference between contamination and irradiation?', 'Contamination: radioactive material gets on/in the body. Irradiation: exposed to radiation from outside; you don\'t become radioactive.'], ['Unit of activity?', 'Becquerel (Bq).']]),
        questions: [
          mc('Which radiation is stopped by a sheet of paper?', ['Alpha', 'Beta', 'Gamma', 'All of them'], 'Alpha has very low penetration.', { d: 1 }),
          num('A radioactive source has an activity of 1600 Bq and a half-life of 3 days. What is its activity after 9 days?', 200, '9 ÷ 3 = 3 half-lives: 1600 → 800 → 400 → 200.', { d: 2, unit: 'Bq' }),
          mc('In beta decay, what happens to the atomic number?', ['Increases by 1', 'Decreases by 2', 'Stays the same', 'Decreases by 1'], 'A neutron changes into a proton.', { d: 3 }),
          tf('Being irradiated by gamma rays makes you radioactive.', false, 'Irradiation does not make objects radioactive.', { d: 2 }),
          num('Uranium-238 (atomic number 92) emits an alpha particle. What is the mass number of the new nucleus?', 234, '238 − 4 = 234 (atomic number 90).', { d: 3 }),
        ],
      }),
      topic({
        id: 'phys-nuclear', title: 'Uses of radiation, fission and fusion', summary: 'Background radiation, medical uses, nuclear fission and fusion (Physics only).', tags: ['Physics only'],
        notes: `
## Background radiation
Natural: rocks (radon gas), cosmic rays. Man-made: fallout from weapons tests, nuclear accidents, medical X-rays. **Dose** measured in **sieverts (Sv)**.

## Medical uses
- **Tracers**: gamma emitters with short half-lives (e.g. technetium-99) - can be detected outside the body, decay quickly.
- **Radiotherapy**: gamma beams or implants to kill cancer cells.
Risks must be weighed against benefits.

## Nuclear fission
A **neutron** is absorbed by uranium-235 or plutonium-239 → nucleus splits into **two smaller nuclei** + **2-3 neutrons** + gamma + energy. Neutrons cause further fission → **chain reaction**. In reactors, **control rods** absorb neutrons; the **moderator** slows them.

## Nuclear fusion
Two light nuclei (e.g. hydrogen) join to form a heavier nucleus; some mass converts to energy. Powers the **Sun**. Needs huge temperatures and pressures - not yet practical on Earth.
`,
        keyPoints: ['Background radiation: radon, cosmic rays, medical', 'Tracers: short half-life gamma emitters', 'Fission: neutron splits U-235 → chain reaction', 'Control rods absorb neutrons', 'Fusion: light nuclei join - powers stars'],
        flashcards: cards([['What is nuclear fission?', 'The splitting of a large, unstable nucleus (e.g. U-235) after absorbing a neutron, releasing energy and more neutrons.'], ['What is nuclear fusion?', 'Joining two light nuclei to form a heavier nucleus, releasing energy.'], ['Why do medical tracers use gamma emitters with short half-lives?', 'Gamma can be detected outside the body and is weakly ionising; a short half-life limits the dose.'], ['Purpose of control rods?', 'To absorb neutrons and control the rate of the chain reaction.']]),
        questions: [
          mc('What happens in nuclear fusion?', ['Two light nuclei join together', 'A heavy nucleus splits', 'An electron is emitted', 'A neutron decays'], 'Fusion powers the Sun.', { d: 1 }),
          ord('Put the steps of a fission chain reaction in order.', ['A neutron is absorbed by a uranium-235 nucleus', 'The nucleus becomes unstable and splits', 'Two smaller nuclei and 2-3 neutrons are released with energy', 'The neutrons are absorbed by more uranium nuclei'], 'This repeats - a chain reaction.', { d: 2 }),
          tf('Fusion reactors are widely used to generate electricity today.', false, 'Fusion requires extreme temperatures and pressures - not yet practical.', { d: 2 }),
        ],
      }),
    ],
  },
];

