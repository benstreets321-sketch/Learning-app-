import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, topic, examQ, ord, match } from '../../dsl';

const SIX = (points: string[]) => [
  'Level 3 (5-6): detailed, coherent, logically sequenced answer using correct terms',
  'Level 2 (3-4): several relevant points with some linking',
  'Level 1 (1-2): simple relevant statements',
  ...points,
];

export const physPaper2: Unit[] = [
  {
    id: 'phys-forces', title: 'Forces', description: 'Paper 2 · forces, motion, Newton\'s laws, momentum, moments and pressure.',
    topics: [
      topic({
        id: 'phys-force-basics', title: 'Forces, weight, resultant forces and work', summary: 'Scalars and vectors, contact/non-contact forces, weight, resultant forces and free-body diagrams.',
        notes: `
- **Scalar**: magnitude only (speed, distance, mass, energy, time). **Vector**: magnitude **and direction** (velocity, displacement, force, acceleration, momentum).
- **Contact forces**: friction, air resistance, tension, normal contact. **Non-contact**: gravity, magnetic, electrostatic.

## Weight
**W = m g** (N, kg, N/kg). Mass is the amount of matter (same everywhere); weight is a force (changes with g). g = 9.8 N/kg on Earth. Measured with a newtonmeter. Weight acts at the **centre of mass**.

## Resultant force
The single force that has the same effect as all the forces acting. Forces in the same direction add; opposite directions subtract.
- Resultant force **zero** → object is stationary or moves at **constant velocity**.
- **Free-body diagrams** show all forces as arrows.
- Higher: resolve forces into components; scale drawings of vectors.

## Work done
**W = F s** - when a force moves an object. 1 J = 1 N m. Work against friction causes heating.
`,
        keyPoints: ['Scalar: size only; vector: size + direction', 'Contact vs non-contact forces', 'W = mg; mass ≠ weight', 'Resultant zero → stationary or constant velocity', 'Work done = force × distance'],
        generators: ['p-weight', 'p-work'],
        flashcards: cards([['Difference between scalar and vector?', 'A vector has direction as well as magnitude.'], ['Give three vectors', 'Velocity, force, displacement (also acceleration, momentum).'], ['Weight equation?', 'W = mg'], ['What is a resultant force?', 'A single force with the same effect as all the forces acting together.'], ['1 joule = ?', '1 newton metre (1 N m).']]),
        questions: [
          multi('Which are vector quantities?', ['Velocity', 'Force', 'Acceleration'], ['Speed', 'Mass', 'Energy'], 'Vectors have direction.', { d: 1 }),
          num('Forces of 50 N right and 30 N left act on a box. What is the resultant force (to the right)?', 20, '50 − 30 = 20 N right.', { d: 1, unit: 'N' }),
          num('A 70 kg astronaut is on the Moon (g = 1.6 N/kg). Calculate their weight.', 112, '70 × 1.6 = 112 N.', { d: 1, unit: 'N' }),
          tf('If the resultant force on a moving car is zero, the car will slow down and stop.', false, 'It continues at constant velocity (Newton\'s first law).', { d: 2 }),
        ],
      }),
      topic({
        id: 'phys-elastic', title: 'Elasticity and Hooke\'s law', summary: 'Elastic and inelastic deformation, F = ke and the spring practical.', tags: ['Required practical'],
        notes: `
- **Elastic deformation**: returns to original shape when forces removed. **Inelastic**: permanently changed.
- More than one force is needed to stretch, compress or bend.
- **Hooke's law**: **F = k e** - extension is **directly proportional** to force up to the **limit of proportionality**.
- Spring constant k (N/m): stiffer spring = bigger k.
- Elastic potential energy: **Eₑ = ½ k e²** (when not beyond the limit of proportionality).

:::exam Required practical: spring extension
Hang a spring from a clamp next to a metre rule; add masses one at a time (100 g = ~1 N); measure the extension each time (use a pointer, read at eye level). Plot force vs extension - straight line through origin; gradient = k. Beyond the limit of proportionality the line curves.
:::
`,
        keyPoints: ['Elastic vs inelastic deformation', 'F = ke up to the limit of proportionality', 'Gradient of force-extension graph = k', 'Eₑ = ½ke²', 'Measure extension, not total length'],
        generators: ['p-spring'],
        flashcards: cards([['Hooke\'s law?', 'Force is directly proportional to extension up to the limit of proportionality: F = ke.'], ['What is elastic deformation?', 'When an object returns to its original shape after the force is removed.'], ['How do you find k from a force-extension graph?', 'The gradient of the straight-line section.']]),
        questions: [
          num('A spring with k = 40 N/m is stretched by 0.15 m. What force is applied?', 6, '40 × 0.15 = 6 N.', { d: 1, unit: 'N' }),
          mc('In the spring practical, why is extension used rather than length?', ['Hooke\'s law relates force to the change in length', 'The total length is too hard to measure accurately', 'Extension is always bigger, so it is easier to read', 'It makes no difference which one you plot on the graph'], 'Extension = stretched length − original length.', { d: 2 }),
          num('A force of 5 N stretches a spring from 20 cm to 30 cm. Calculate k in N/m.', 50, 'e = 0.10 m → k = 5 ÷ 0.1 = 50 N/m.', { d: 3, unit: 'N/m', h: ['Convert cm to m.'] }),
        ],
        examQuestions: [examQ('Describe how you would investigate the relationship between force and extension for a spring.', 6, SIX(['Clamp spring above a metre rule; record original length', 'Add masses one at a time (known weight)', 'Measure new length; calculate extension each time', 'Read at eye level / use a pointer to reduce parallax', 'Plot force against extension', 'Straight line through origin shows F ∝ e; gradient = k']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
      topic({
        id: 'phys-motion', title: 'Describing motion', summary: 'Distance, displacement, speed, velocity, acceleration, motion graphs and v² − u² = 2as.',
        notes: `
- **Speed = distance ÷ time** (v = s/t). Typical speeds: walking 1.5 m/s, running 3 m/s, cycling 6 m/s, sound 330 m/s.
- **Velocity** = speed in a given direction. An object moving in a circle at constant speed has changing velocity.
- **Acceleration a = Δv ÷ t** (m/s²). Deceleration = negative acceleration. g ≈ 9.8 m/s² for falling objects.
- **v² − u² = 2 a s** (uniform acceleration).

## Graphs
| Graph | Gradient | Area under |
|---|---|---|
| Distance-time | **Speed** | - |
| Velocity-time | **Acceleration** | **Distance travelled** |

Higher: speed at a point on a curved distance-time graph = gradient of a tangent.

## Terminal velocity
A falling object accelerates; air resistance increases with speed until it **equals weight** → resultant force zero → **terminal velocity**. A parachute increases air resistance → lower terminal velocity.
`,
        keyPoints: ['Speed = distance ÷ time', 'Velocity is speed with direction', 'a = Δv ÷ t', 'v² − u² = 2as', 'D-t gradient = speed; v-t gradient = acceleration; v-t area = distance', 'Terminal velocity when drag = weight'],
        generators: ['p-speed', 'p-accel', 'p-suvat'],
        flashcards: cards([['Acceleration equation?', 'a = Δv ÷ t'], ['What does the area under a velocity-time graph show?', 'The distance travelled.'], ['What does the gradient of a distance-time graph show?', 'Speed.'], ['What is terminal velocity?', 'The constant maximum velocity reached when air resistance equals weight.'], ['Typical walking speed?', 'About 1.5 m/s.']]),
        questions: [
          num('A car accelerates from 10 m/s to 30 m/s in 5 s. Calculate its acceleration.', 4, '(30 − 10) ÷ 5 = 4 m/s².', { d: 1, unit: 'm/s²' }),
          mc('On a velocity-time graph, a horizontal line means...', ['Constant velocity', 'Stationary', 'Constant acceleration', 'Slowing down'], 'Zero gradient = zero acceleration.', { d: 2, fb: { 1: 'That is a horizontal line on a DISTANCE-time graph.' } }),
          tf('An object moving in a circle at constant speed has constant velocity.', false, 'Its direction changes, so velocity changes.', { d: 3 }),
          ord('Put the stages of a skydiver\'s fall in order.', ['Accelerates - weight greater than air resistance', 'Air resistance increases with speed', 'Reaches terminal velocity - forces balanced', 'Opens parachute - decelerates', 'Reaches a new, lower terminal velocity'], 'Forces change as speed changes.', { d: 3 }),
        ],
      }),
      topic({
        id: 'phys-newton', title: 'Newton\'s laws, stopping distances and momentum', summary: 'Newton\'s three laws, the acceleration practical, braking and momentum (Higher).', tags: ['Required practical'],
        notes: `
## Newton's laws
1. **First**: if the resultant force is zero, an object stays at rest or moves at constant velocity. **Inertia** = tendency to stay at rest or uniform motion.
2. **Second**: **F = m a** - acceleration is proportional to resultant force and inversely proportional to mass. (Higher: inertial mass = F/a.)
3. **Third**: when two objects interact, they exert **equal and opposite** forces on each other (same type of force, different objects).

:::exam Required practical: force and acceleration
Trolley on a bench pulled by a hanging mass over a pulley; measure acceleration with light gates (or timing marked distances). Vary force (move masses from trolley to hanger to keep total mass constant) or vary mass.
:::

## Stopping distance = thinking distance + braking distance
- **Thinking distance** increases with **reaction time** (tiredness, drugs, alcohol, distractions) and speed.
- **Braking distance** increases with **speed**, poor road conditions (wet, icy), worn tyres/brakes.
- Typical reaction time 0.2-0.9 s. Doubling speed roughly **quadruples** braking distance (KE ∝ v²).
- Large decelerations can cause injury; brakes can overheat.

## Momentum (Higher)
**p = m v** (kg m/s). In a closed system, **momentum is conserved** (total before = total after).
- Force = rate of change of momentum: F = m Δv / Δt. Safety features (airbags, crumple zones, seat belts) **increase the time** of the collision → smaller force.
`,
        keyPoints: ['1st law: no resultant force → no change in motion', 'F = ma', '3rd law: equal and opposite forces on different objects', 'Stopping = thinking + braking distance', 'Reaction time factors: tiredness, drugs, alcohol, distraction', 'p = mv; momentum conserved (Higher)', 'Safety features increase collision time → less force'],
        generators: ['p-newton2', 'p-momentum'],
        flashcards: cards([['Newton\'s second law equation?', 'F = ma'], ['Newton\'s third law?', 'When two objects interact, they exert equal and opposite forces on each other.'], ['Stopping distance = ?', 'Thinking distance + braking distance'], ['Factors increasing braking distance?', 'Higher speed, wet/icy roads, worn brakes or tyres.'], ['Momentum equation?', 'p = mv'], ['How do airbags reduce injury?', 'They increase the time taken to stop, reducing the rate of change of momentum and so the force.']]),
        questions: [
          num('A resultant force of 1500 N acts on a 1000 kg car. Find its acceleration.', 1.5, '1500 ÷ 1000 = 1.5 m/s².', { d: 1, unit: 'm/s²' }),
          multi('Which increase THINKING distance?', ['Tiredness', 'Drinking alcohol', 'Using a phone', 'Higher speed'], ['Icy roads', 'Worn brakes'], 'Thinking distance depends on reaction time and speed.', { d: 2 }),
          num('A 2 kg trolley at 3 m/s collides and sticks to a stationary 1 kg trolley. What is their speed afterwards?', 2, 'Momentum before = 6; after: 3v = 6 → v = 2 m/s.', { d: 4, tier: 'H', unit: 'm/s' }),
          mc('A book rests on a table. The Earth pulls the book down. What is the Newton\'s third law pair?', ['The book pulls the Earth up', 'The table pushes the book up', 'The book pushes down on the table', 'The Earth pushes the table up'], 'Same type of force (gravity), acting on the other object.', { d: 4 }),
        ],
        examQuestions: [examQ('Explain how a car\'s crumple zone reduces the risk of injury in a crash.', 4, ['Crumple zone increases the time taken for the car to stop', 'Same change in momentum (Higher)', 'Rate of change of momentum is smaller', 'So the force on passengers is smaller'], { time: 4 })],
      }),
      topic({
        id: 'phys-moments', title: 'Moments, levers, gears and pressure in fluids', summary: 'Moments, the principle of moments, levers and gears; pressure in liquids and upthrust (Physics only).', tags: ['Physics only'],
        notes: `
## Moments
**M = F d** (Nm, N, perpendicular distance from pivot in m).
**Principle of moments**: if balanced, total clockwise moment = total anticlockwise moment.
**Levers** and **gears** transmit the rotational effect of forces - a small force at a large distance gives a big moment.

## Pressure
- **p = F ÷ A** (Pa = N/m²).
- In a liquid: **p = h ρ g** - pressure increases with depth and density.
- **Upthrust**: water pressure is greater at the bottom of an object than the top → resultant upwards force. An object **floats** if upthrust = weight before it is fully submerged (less dense than the liquid).
- **Atmospheric pressure** decreases with height (fewer air molecules above).
`,
        keyPoints: ['M = Fd (perpendicular distance)', 'Balanced: clockwise = anticlockwise moments', 'p = F ÷ A', 'Liquid pressure p = hρg increases with depth', 'Upthrust from pressure difference', 'Atmospheric pressure falls with altitude'],
        generators: ['p-moment', 'p-pressure'],
        flashcards: cards([['Moment equation?', 'M = Fd'], ['Principle of moments?', 'For a balanced object, total clockwise moment = total anticlockwise moment.'], ['Pressure in a liquid equation?', 'p = hρg'], ['Why does a ship float?', 'Upthrust equals its weight (it displaces its own weight of water).']]),
        questions: [
          num('A 20 N force acts 0.4 m from a pivot. Calculate the moment.', 8, '20 × 0.4 = 8 Nm.', { d: 1, unit: 'Nm' }),
          num('A seesaw balances. A 400 N child sits 1.5 m from the pivot. How far from the pivot must a 600 N adult sit?', 1, '400 × 1.5 = 600 × d → d = 1 m.', { d: 3, unit: 'm' }),
          tf('Pressure in a liquid decreases with depth.', false, 'It increases with depth: p = hρg.', { d: 1 }),
        ],
      }),
    ],
  },
  {
    id: 'phys-waves', title: 'Waves', description: 'Paper 2 · wave properties, EM spectrum, light, lenses and sound.',
    topics: [
      topic({
        id: 'phys-wave-props', title: 'Properties of waves', summary: 'Transverse vs longitudinal, amplitude, wavelength, frequency, v = fλ and the ripple tank practical.', tags: ['Required practical'],
        notes: `
Waves **transfer energy** (and information) **without transferring matter**.

| Transverse | Longitudinal |
|---|---|
| Oscillations **perpendicular** to energy transfer | Oscillations **parallel** to energy transfer |
| Light and all EM waves, water ripples, S-waves | **Sound**, P-waves |
| Peaks and troughs | Compressions and rarefactions |

- **Amplitude**: maximum displacement from rest. **Wavelength (λ)**: distance from one point to the same point on the next wave. **Frequency (f)**: waves per second (Hz). **Period** T = 1 ÷ f.
- **Wave speed v = f λ**.

:::exam Required practical: waves
- **Ripple tank**: measure wavelength (several waves with a ruler/strobe), frequency (count waves passing a point in 10 s) → v = fλ.
- **Waves on a string**: vibration generator; measure λ of the standing wave; f from the signal generator.
:::

Speed of sound in air: echo method or two microphones.
`,
        keyPoints: ['Waves transfer energy, not matter', 'Transverse: perpendicular (EM, water)', 'Longitudinal: parallel (sound)', 'v = fλ; T = 1/f', 'Ripple tank and string practicals'],
        generators: ['p-wave', 'p-period'],
        flashcards: cards([['Wave speed equation?', 'v = fλ'], ['Define frequency', 'Number of waves passing a point per second (Hz).'], ['Example of a longitudinal wave?', 'Sound.'], ['Define amplitude', 'The maximum displacement of a point on a wave from its rest position.'], ['Period equation?', 'T = 1 ÷ f']]),
        questions: [
          num('A wave has frequency 50 Hz and wavelength 4 m. Calculate its speed.', 200, '50 × 4 = 200 m/s.', { d: 1, unit: 'm/s' }),
          mc('In a longitudinal wave, the oscillations are...', ['Parallel to the direction of energy transfer', 'Perpendicular to the direction of energy transfer', 'At 45° to the direction of energy transfer', 'In circles around the direction of energy transfer'], 'Sound waves are longitudinal.', { d: 1 }),
          tf('Water waves carry the water along with them across the sea.', false, 'Waves transfer energy, not the water itself (a floating duck bobs up and down).', { d: 2 }),
          num('Sound travels at 340 m/s. A note has a wavelength of 0.85 m. What is its frequency?', 400, 'f = 340 ÷ 0.85 = 400 Hz.', { d: 3, unit: 'Hz' }),
        ],
        examQuestions: [examQ('Describe how you would use a ripple tank to measure the speed of water waves.', 6, SIX(['Set up ripple tank with a vibrating bar/motor and a lamp above to project waves onto paper', 'Measure across several wavelengths with a ruler and divide (or use a strobe)', 'Count waves passing a point in a set time (e.g. 10 s) for frequency', 'Calculate speed v = fλ', 'Repeat and take a mean', 'Use a video/photo to freeze the image for accuracy']), { meta: 'Required practical · 6-mark', time: 7 })],
      }),
      topic({
        id: 'phys-em', title: 'The electromagnetic spectrum', summary: 'Order, properties, uses and dangers of EM waves; infrared practical.', tags: ['Required practical'],
        notes: `
All EM waves are **transverse** and travel at the **same speed in a vacuum** (3 × 10⁸ m/s).

| Wave (long λ → short λ) | Uses | Dangers |
|---|---|---|
| **Radio** | TV, radio, communications | - |
| **Microwaves** | Satellite communication, cooking | Internal heating |
| **Infrared** | Heaters, cooking, thermal cameras, remote controls | Burns |
| **Visible** | Fibre optics, photography | - |
| **Ultraviolet** | Energy-efficient lamps, sun tanning, security marking | Skin ageing, **skin cancer**, eye damage |
| **X-rays** | Medical imaging, airport security | **Ionising** - mutate cells, cancer |
| **Gamma** | Sterilising, cancer treatment | **Ionising** - cancer |

"**R**abbits **M**ate **I**n **V**ery **U**nusual e**X**pensive **G**ardens". Frequency and energy **increase** towards gamma.

Radio waves can be produced by oscillations in electrical circuits and absorbed to create an alternating current (Higher).

**Refraction**: waves change speed and direction at a boundary. Bends **towards the normal** when slowing down (e.g. air → glass).

:::exam Required practical: infrared radiation (Leslie cube)
Measure IR emitted from different surfaces of a hot cube with an IR detector at equal distances: **matt black** emits most, **shiny silver** least.
:::
`,
        keyPoints: ['All EM waves: transverse, same speed in a vacuum', 'Order: radio, micro, IR, visible, UV, X-ray, gamma', 'Frequency and energy increase towards gamma', 'UV, X-rays, gamma can cause cancer (ionising)', 'Matt black is the best emitter/absorber of IR', 'Refraction: change of speed at a boundary'],
        flashcards: cards([['Order of the EM spectrum (long to short wavelength)?', 'Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.'], ['Which EM waves are ionising?', 'Ultraviolet (high frequency), X-rays and gamma rays.'], ['Use of microwaves?', 'Satellite communications and cooking.'], ['Which surface emits most infrared?', 'Matt black.'], ['Speed of EM waves in a vacuum?', '3 × 10⁸ m/s']]),
        questions: [
          ord('Put these EM waves in order of increasing frequency.', ['Radio', 'Microwaves', 'Infrared', 'Visible light', 'Ultraviolet', 'X-rays'], 'Frequency increases as wavelength decreases.', { d: 2 }),
          mc('Which EM wave is used in thermal imaging cameras?', ['Infrared', 'Ultraviolet', 'X-rays', 'Radio'], 'Warm objects emit more infrared.', { d: 1 }),
          match('Match the wave to a use.', [['X-rays', 'Medical imaging of bones'], ['Gamma', 'Sterilising surgical equipment'], ['Ultraviolet', 'Security marking'], ['Microwaves', 'Satellite communication']], 'Uses depend on properties.', { d: 2 }),
          tf('All electromagnetic waves travel at the same speed in a vacuum.', true, '3 × 10⁸ m/s.', { d: 1 }),
        ],
      }),
      topic({
        id: 'phys-light-sound', title: 'Light, lenses, sound and ultrasound', summary: 'Reflection, refraction, lenses, colour, black bodies, sound, ultrasound and seismic waves (Physics only).', tags: ['Physics only', 'Required practical'],
        notes: `
## Reflection and refraction
- **Law of reflection**: angle of incidence = angle of reflection (measured from the normal).
- Specular (smooth surface) vs diffuse (rough) reflection.
- **Required practical**: ray box and glass block - measure angles of incidence and refraction.

## Lenses
- **Convex** (converging): brings rays to a **principal focus**; magnifying glass; real or virtual images.
- **Concave** (diverging): spreads rays out; virtual images.
- **Magnification = image height ÷ object height**.

## Visible light and colour
Colour depends on which wavelengths are **reflected**; others are absorbed. Filters transmit only their own colour.

## Black body radiation
All objects emit and absorb IR. A **perfect black body** absorbs all radiation. Hotter objects emit more radiation at shorter wavelengths. Earth's temperature depends on the balance of radiation absorbed and emitted.

## Sound and ultrasound
- Human hearing **20 Hz - 20 kHz**. **Ultrasound** > 20 kHz: partially reflected at boundaries → medical scans, detecting flaws, echo sounding (distance = speed × time ÷ 2).
- **Seismic waves**: **P-waves** (longitudinal, through solids and liquids), **S-waves** (transverse, solids only) → the **S-wave shadow zone** shows Earth's outer core is **liquid**.
`,
        keyPoints: ['Angle of incidence = angle of reflection', 'Convex lens converges; concave diverges', 'Magnification = image height ÷ object height', 'Colour = wavelengths reflected', 'Ultrasound > 20 kHz; echo distance = speed × time ÷ 2', 'S-waves can\'t pass through liquid → liquid outer core'],
        flashcards: cards([['Range of human hearing?', '20 Hz to 20 000 Hz.'], ['What is ultrasound?', 'Sound with a frequency above 20 kHz.'], ['Why does a red object look red?', 'It reflects red light and absorbs other colours.'], ['What do S-waves tell us about the Earth?', 'They cannot travel through liquid, so the outer core must be liquid.'], ['What is a perfect black body?', 'An object that absorbs all the radiation incident on it.']]),
        questions: [
          num('An ultrasound pulse returns after 0.0002 s in tissue where sound travels at 1500 m/s. How deep is the boundary?', 0.15, '1500 × 0.0002 ÷ 2 = 0.15 m.', { d: 3, unit: 'm', h: ['The pulse travels there AND back.'] }),
          mc('Which seismic waves cannot travel through liquids?', ['S-waves', 'P-waves', 'Surface waves', 'Both S-waves and P-waves'], 'S-waves are transverse.', { d: 2 }),
          tf('A blue filter lets through all colours except blue.', false, 'A blue filter transmits only blue light.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'phys-magnet', title: 'Magnetism and electromagnetism', description: 'Paper 2 · magnets, electromagnets, the motor effect and induction.',
    topics: [
      topic({
        id: 'phys-magnetism', title: 'Magnets, electromagnets and the motor effect', summary: 'Magnetic fields, induced magnets, electromagnets, F = BIl, motors, generators and transformers (Physics only parts).',
        notes: `
## Magnets
- Like poles repel, unlike attract. Field lines go **from north to south**; strongest at the poles.
- **Permanent** magnets have their own field; **induced** magnets become magnetic in a field (always attraction) and lose it when removed. Magnetic materials: iron, steel, nickel, cobalt.
- A **compass** points along field lines; Earth's core makes a magnetic field.

## Electromagnetism
- A current in a wire creates a circular magnetic field (right-hand grip rule). A **solenoid** (coil) concentrates it; an **iron core** makes it stronger - an **electromagnet** (can be switched off). Uses: relays, scrap yard cranes, door locks.

## Motor effect (Higher)
A current-carrying wire in a magnetic field experiences a force: **F = B I l**. Direction by **Fleming's left-hand rule** (thuMb = Motion, First finger = Field, seCond finger = Current). **Electric motors**: forces on a coil in a field → rotation; a split-ring commutator reverses current each half turn. **Loudspeakers** use the motor effect.

## Physics only: induced potential (Higher)
- Moving a wire or changing the field around a conductor **induces a p.d.** (generator effect). **Alternators** (AC) and **dynamos** (DC). Microphones use it.
- **Transformers**: AC in the primary coil → changing field in the iron core → induced p.d. in the secondary. **Vp/Vs = np/ns**; for 100% efficiency Vp Ip = Vs Is.
`,
        keyPoints: ['Field lines N → S', 'Induced magnets always attract', 'Electromagnet: coil + current (+ iron core)', 'F = BIl; Fleming\'s left-hand rule (Higher)', 'Motors use the motor effect', 'Generator effect: induced p.d. (Physics only, Higher)', 'Transformers: Vp/Vs = np/ns'],
        generators: ['p-motor', 'p-transformer'],
        flashcards: cards([['Direction of magnetic field lines?', 'From north pole to south pole.'], ['What is an induced magnet?', 'A material that becomes magnetic when placed in a magnetic field; it always attracts.'], ['How can you increase the strength of an electromagnet?', 'More turns on the coil, more current, add an iron core.'], ['Fleming\'s left-hand rule?', 'Thumb = motion (force), first finger = field, second finger = current.'], ['Transformer equation?', 'Vp/Vs = np/ns']]),
        questions: [
          multi('Which increase the strength of an electromagnet?', ['More turns of wire', 'Larger current', 'An iron core'], ['A copper core', 'Fewer turns'], 'Iron is a magnetic material.', { d: 2 }),
          num('A 0.2 m wire carries 3 A at right angles to a 0.5 T field. Calculate the force.', 0.3, '0.5 × 3 × 0.2 = 0.3 N.', { d: 3, tier: 'H', unit: 'N' }),
          num('A transformer has 100 primary turns and 2000 secondary turns. The primary p.d. is 12 V. Calculate the secondary p.d.', 240, '12 × 2000 ÷ 100 = 240 V (step-up).', { d: 4, tier: 'H', unit: 'V' }),
          tf('An induced magnet can repel a permanent magnet.', false, 'Induced magnetism always causes attraction.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'phys-space', title: 'Space physics', description: 'Paper 2 · solar system, stars, orbits and the expanding universe (Physics only).',
    topics: [
      topic({
        id: 'phys-space-topic', title: 'Stars, orbits and the Big Bang', summary: 'The solar system, life cycle of stars, orbital motion, red-shift and the Big Bang (Physics only).', tags: ['Physics only'],
        notes: `
## Solar system
One star (the Sun), 8 planets, dwarf planets, moons, asteroids, comets - part of the **Milky Way** galaxy. Formed from a **nebula** (dust and gas) pulled together by gravity.

## Life cycle of stars
- **Nebula** → **protostar** (gravity, temperature rises) → **main sequence** star (**fusion** of hydrogen; outward pressure from fusion balances inward gravity).
- Sun-sized: → **red giant** → **white dwarf** → **black dwarf**.
- Much bigger: → **red supergiant** → **supernova** → **neutron star** or **black hole**.
- Fusion makes elements up to **iron**; heavier elements form in **supernovae** and are spread through the universe.

## Orbits
Gravity provides the force for circular orbits. Velocity changes (direction) but speed is constant. (Higher) Smaller orbit → must move faster to stay in orbit.

## Red-shift and the Big Bang
Light from distant galaxies is **red-shifted** (wavelengths stretched) → galaxies are moving **away**; further galaxies move **faster** → the universe is **expanding** → evidence for the **Big Bang** (everything began from a very small, hot, dense region). Also: the **CMBR** (cosmic microwave background radiation). Unknowns: **dark matter** and **dark energy**.
`,
        keyPoints: ['Nebula → protostar → main sequence (fusion balances gravity)', 'Sun → red giant → white dwarf', 'Massive stars → supernova → neutron star or black hole', 'Elements heavier than iron made in supernovae', 'Red-shift: galaxies moving away; further = faster', 'Big Bang evidence: red-shift and CMBR'],
        flashcards: cards([['What keeps a main sequence star stable?', 'Outward pressure from fusion balances the inward force of gravity.'], ['What will the Sun become?', 'Red giant → white dwarf → black dwarf.'], ['What is red-shift?', 'An increase in the observed wavelength of light from galaxies moving away from us.'], ['Two pieces of evidence for the Big Bang?', 'Red-shift of galaxies and the cosmic microwave background radiation.'], ['Where are elements heavier than iron made?', 'In supernovae.']]),
        questions: [
          ord('Put the life cycle of a Sun-sized star in order.', ['Nebula', 'Protostar', 'Main sequence star', 'Red giant', 'White dwarf'], 'Large stars instead become red supergiants and explode as supernovae.', { d: 2 }),
          mc('What does red-shift tell us about distant galaxies?', ['They are moving away from us', 'They are moving towards us', 'They are getting cooler', 'They are not rotating'], 'Wavelength stretched → receding.', { d: 1 }),
          tf('More distant galaxies show greater red-shift.', true, 'They are moving away faster - evidence the universe is expanding.', { d: 2 }),
        ],
        examQuestions: [examQ('Describe the life cycle of a star much more massive than the Sun.', 6, SIX(['Dust and gas (nebula) pulled together by gravity → protostar', 'Temperature rises until hydrogen fusion begins', 'Main sequence: fusion pressure balances gravity', 'Hydrogen runs out → expands into a red supergiant', 'Explodes as a supernova (heavy elements made and spread)', 'Leaves a neutron star or a black hole']), { meta: '6-mark describe', time: 7 })],
      }),
    ],
  },
];
