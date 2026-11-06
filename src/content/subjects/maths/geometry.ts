import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, topic, examQ, match } from '../../dsl';

export const geometryUnit: Unit = {
  id: 'm-geometry', title: 'Geometry and measures', description: 'Angles, shapes, area and volume, Pythagoras, trigonometry, transformations and vectors.',
  topics: [
    topic({
      id: 'm-geo-angles', title: 'Angles, parallel lines and polygons', summary: 'Angle facts with reasons, parallel lines, interior/exterior angles and bearings.',
      notes: `
## Angle facts (learn the reasons!)
- Angles on a **straight line** add to **180°**; around a **point** to **360°**.
- **Vertically opposite** angles are equal.
- Angles in a **triangle** add to **180°**; in a **quadrilateral** to **360°**.
- Isosceles triangle: base angles are equal.

## Parallel lines
- **Alternate** angles are equal (Z shape).
- **Corresponding** angles are equal (F shape).
- **Co-interior** (allied) angles add to 180° (C/U shape).

## Polygons
- Sum of interior angles = **(n − 2) × 180°**.
- **Exterior angles** of any polygon add to **360°**. Regular: each exterior = 360 ÷ n.
- Interior + exterior = 180°.

## Bearings
Measured **clockwise from North**, always **3 figures** (e.g. 045°). Back bearing = bearing ± 180°.

:::exam "Give reasons"
Write the fact in words: "Alternate angles are equal", not "Z angles".
:::
`,
      keyPoints: ['Straight line 180°, point 360°, triangle 180°, quadrilateral 360°', 'Alternate equal, corresponding equal, co-interior sum to 180°', 'Interior sum = (n − 2) × 180°', 'Exterior angles sum to 360°', 'Bearings: clockwise from North, 3 figures'],
      generators: ['m-angles'],
      flashcards: cards([['Sum of interior angles of a hexagon?', '720°'], ['Each exterior angle of a regular octagon?', '45°'], ['Alternate angles are...', 'Equal (Z-shape).'], ['Co-interior angles...', 'Add up to 180°.'], ['Bearing of A from B is 070°. Bearing of B from A?', '250°']]),
      questions: [
        num('Two angles of a triangle are 47° and 68°. Find the third angle.', 65, '180 − 47 − 68 = 65.', { d: 1, unit: '°' }),
        num('Find the size of each interior angle of a regular decagon (10 sides).', 144, 'Exterior = 36°; interior = 180 − 36 = 144°.', { d: 3, unit: '°' }),
        mc('Which reason explains why two angles in a Z-shape between parallel lines are equal?', ['Alternate angles are equal', 'Corresponding angles are equal', 'Co-interior angles add to 180°', 'Vertically opposite angles are equal'], 'Z-shape = alternate.', { d: 1 }),
        num('A regular polygon has exterior angles of 24°. How many sides does it have?', 15, '360 ÷ 24 = 15.', { d: 2 }),
        num('The bearing of B from A is 125°. What is the bearing of A from B?', 305, '125 + 180 = 305°.', { d: 3, unit: '°' }),
      ],
    }),
    topic({
      id: 'm-geo-area', title: 'Perimeter, area and circles', summary: '2D shapes, compound shapes, circles, arcs and sectors.',
      notes: `
| Shape | Area | On formula sheet? |
|---|---|---|
| Rectangle | l × w | ✗ learn |
| Triangle | ½ × b × h | ✗ learn |
| Parallelogram | b × h (perpendicular) | ✗ learn |
| Trapezium | ½(a + b)h | ✓ |
| Circle | πr² | ✓ |
| Circumference | πd = 2πr | ✓ |
| Sector | (θ/360) × πr² | ✗ learn |
| Arc length | (θ/360) × 2πr | ✗ learn |

- **Compound shapes**: split into rectangles/triangles, add (or subtract cut-outs).
- **Units**: area in cm², m²... 1 m² = 10 000 cm² (100 × 100!).
- **Exact answers**: leave in terms of π (e.g. 25π cm²).
- **Perimeter of a sector** = arc + 2 radii.
`,
      keyPoints: ['Triangle = ½bh (perpendicular height)', 'Trapezium = ½(a + b)h - on the sheet', 'Circle area πr², circumference πd', 'Sector = θ/360 of the circle', '1 m² = 10 000 cm²'],
      generators: ['m-area', 'm-circle', 'm-arc-sector'],
      flashcards: cards([['Area of a parallelogram?', 'base × perpendicular height'], ['Arc length formula?', '(θ/360) × 2πr'], ['Area of a circle of diameter 10 cm, in terms of π?', '25π cm²'], ['How many cm² in 1 m²?', '10 000']]),
      questions: [
        num('Find the area of a trapezium with parallel sides 6 cm and 10 cm and height 5 cm.', 40, '½ × (6 + 10) × 5 = 40.', { d: 2, unit: 'cm²' }),
        num('Find the circumference of a circle with radius 7 cm, to 1 d.p.', 44, '2 × π × 7 = 43.98...', { d: 2, unit: 'cm', tol: 0.05 }),
        mc('The area of a circle is 36π cm². What is its radius?', ['6 cm', '18 cm', '36 cm', '12 cm'], 'πr² = 36π → r = 6.', { d: 2 }),
        num('Find the area of a sector with radius 10 cm and angle 72°, to 1 d.p.', 62.8, '72/360 × π × 100 = 62.83.', { d: 3, unit: 'cm²', tol: 0.06 }),
        tf('1 m² = 100 cm².', false, '1 m² = 100 cm × 100 cm = 10 000 cm².', { d: 2 }),
      ],
      workedExamples: [{ title: 'Perimeter of a semicircle shape', problem: 'Find the perimeter of a semicircle with diameter 12 cm (1 d.p.).', steps: ['Curved part = ½ × π × 12 = 18.849...', 'Add the diameter: 18.849 + 12', '= 30.8 cm'], answer: '30.8 cm', tryIt: 'Find the perimeter of a quarter circle of radius 8 cm (1 d.p.).', tryAnswer: '¼ × 2π × 8 + 16 = 12.566 + 16 = 28.6 cm' }],
    }),
    topic({
      id: 'm-geo-volume', title: 'Volume and surface area', summary: 'Prisms, cylinders, cones, spheres and pyramids; surface area and units.',
      notes: `
- **Prism**: volume = area of cross-section × length (on the sheet).
- **Cuboid**: l × w × h. **Cylinder**: πr²h (✗ learn).
- **Pyramid**: ⅓ × base area × height. **Cone**: ⅓πr²h. **Sphere**: ⁴⁄₃πr³ (these are given in the question if needed).
- **Surface area**: add up the area of every face (draw the net). Cylinder: 2πr² + 2πrh. Sphere: 4πr². Cone curved surface: πrl.
- **Units**: 1 m³ = 1 000 000 cm³; 1 litre = 1000 cm³.
- **Frustum** (Higher): big cone − small cone.
`,
      keyPoints: ['Prism volume = cross-section × length', 'Cylinder = πr²h', 'Pyramid/cone = ⅓ × base × height', 'Surface area = total area of all faces', '1 litre = 1000 cm³'],
      generators: ['m-volume'],
      prerequisites: ['m-geo-area'],
      flashcards: cards([['Volume of a cylinder?', 'πr²h'], ['Volume of a pyramid?', '⅓ × base area × height'], ['Surface area of a cylinder?', '2πr² + 2πrh'], ['1 litre = ? cm³', '1000 cm³']]),
      questions: [
        num('Find the volume of a cuboid 5 cm by 4 cm by 12 cm.', 240, '5 × 4 × 12 = 240.', { d: 1, unit: 'cm³' }),
        num('Find the surface area of a cube with side 6 cm.', 216, '6 faces × 36 = 216.', { d: 2, unit: 'cm²' }),
        num('A cylinder has radius 3 cm and height 10 cm. Find its volume to 1 d.p.', 282.7, 'π × 9 × 10 = 282.74.', { d: 3, unit: 'cm³', tol: 0.06 }),
        num('A square-based pyramid has base 6 cm and height 10 cm. Find its volume.', 120, '⅓ × 36 × 10 = 120.', { d: 3, unit: 'cm³' }),
      ],
    }),
    topic({
      id: 'm-geo-pythag', title: "Pythagoras' theorem", summary: 'Finding sides in right-angled triangles, 2D and 3D (Higher).',
      notes: `
**a² + b² = c²** where c is the **hypotenuse** (longest side, opposite the right angle). On the formula sheet.

- Finding the **hypotenuse**: square, **add**, square root.
- Finding a **shorter side**: square, **subtract**, square root.
- **Length of a line segment** between two coordinates: Pythagoras with the differences in x and y.
- **3D (Higher)**: diagonal of a cuboid = √(a² + b² + c²).
- **Pythagorean triples**: 3-4-5, 5-12-13, 8-15-17 (and multiples, e.g. 6-8-10).

:::tip Sanity check
The hypotenuse must be the longest side. If your "shorter side" is longer, you added instead of subtracted.
:::
`,
      keyPoints: ['a² + b² = c² (c = hypotenuse)', 'Hypotenuse: add; shorter side: subtract', 'Distance between points uses Pythagoras', '3D diagonal = √(a² + b² + c²)'],
      generators: ['m-pythag'],
      flashcards: cards([['Pythagoras\' theorem?', 'a² + b² = c²'], ['Name two Pythagorean triples', '3, 4, 5 and 5, 12, 13'], ['Distance between (1, 2) and (4, 6)?', '√(9 + 16) = 5']]),
      questions: [
        num('The shorter sides of a right-angled triangle are 9 cm and 12 cm. Find the hypotenuse.', 15, '81 + 144 = 225 → 15.', { d: 1, unit: 'cm' }),
        num('A ladder 5 m long leans against a wall with its foot 1.4 m from the wall. How high up the wall does it reach?', 4.8, '25 − 1.96 = 23.04 → 4.8 m.', { d: 3, unit: 'm' }),
        num('Find the distance between (−2, 1) and (4, 9).', 10, '√(6² + 8²) = 10.', { d: 3 }),
        num('Find the length of the diagonal of a 3 cm × 4 cm × 12 cm cuboid.', 13, '√(9 + 16 + 144) = 13.', { d: 4, tier: 'H', unit: 'cm' }),
      ],
    }),
    topic({
      id: 'm-geo-trig', title: 'Trigonometry (SOHCAHTOA) and exact values', summary: 'Finding sides and angles in right-angled triangles; exact trig values.',
      notes: `
Label the sides from the angle θ: **O**pposite, **A**djacent, **H**ypotenuse.

| | |
|---|---|
| **SOH** | sin θ = O/H |
| **CAH** | cos θ = A/H |
| **TOA** | tan θ = O/A |

1. Label the sides. 2. Choose the ratio using the two sides involved. 3. Substitute. 4. Rearrange.
- Finding an **angle**: use the inverse (sin⁻¹, cos⁻¹, tan⁻¹).
- Calculator in **degrees** mode!

## Exact values (learn - not on the sheet; Paper 1)
| | 0° | 30° | 45° | 60° | 90° |
|---|---|---|---|---|---|
| sin | 0 | 1/2 | √2/2 | √3/2 | 1 |
| cos | 1 | √3/2 | √2/2 | 1/2 | 0 |
| tan | 0 | √3/3 | 1 | √3 | - |

Angles of **elevation** (looking up) and **depression** (looking down) are measured from the horizontal.
`,
      keyPoints: ['SOH CAH TOA', 'Label O, A, H from the angle', 'Inverse functions to find angles', 'Calculator in degrees', 'Learn exact values for 0°, 30°, 45°, 60°, 90°'],
      generators: ['m-trig'],
      prerequisites: ['m-geo-pythag'],
      flashcards: cards([['sin 30° = ?', '1/2'], ['cos 60° = ?', '1/2'], ['tan 45° = ?', '1'], ['sin 60° = ?', '√3/2'], ['What does SOHCAHTOA stand for?', 'sin = O/H, cos = A/H, tan = O/A']]),
      questions: [
        mc('Which ratio do you use if you know the hypotenuse and want the opposite?', ['sin', 'cos', 'tan', 'Pythagoras'], 'O and H → SOH.', { d: 1 }),
        num('Find x if sin 30° = x/16.', 8, 'sin 30° = 0.5 → x = 8.', { d: 2 }),
        num('A ramp rises 1.2 m over a horizontal distance of 4 m. Find the angle of the ramp to 1 d.p.', 16.7, 'tan θ = 1.2/4 → θ = 16.7°.', { d: 3, unit: '°', tol: 0.06 }),
        match('Match the exact values.', [['sin 30°', '1/2'], ['tan 45°', '1'], ['cos 30°', '√3/2'], ['tan 60°', '√3']], 'Learn these for the non-calculator paper.', { d: 3 }),
      ],
    }),
    topic({
      id: 'm-geo-sincos', title: 'Sine rule, cosine rule and 3D trigonometry', summary: 'Non-right-angled triangles and area = ½ab sin C (Higher).', tier: 'H',
      notes: `
All three formulae are **on the Higher formula sheet** - but you must know **when** to use each.

| Use | When you know... |
|---|---|
| **Sine rule**: a/sin A = b/sin B | a side and its opposite angle, plus one more |
| **Cosine rule**: a² = b² + c² − 2bc cos A | two sides and the angle between them (find the 3rd side), or all three sides (find an angle) |
| **Area** = ½ab sin C | two sides and the included angle |

- Cosine rule for an angle: cos A = (b² + c² − a²) / 2bc.
- **Ambiguous case** of the sine rule: sin gives an acute angle; the obtuse alternative is 180° − θ.
- **3D**: find a 2D right-angled triangle inside the shape (e.g. angle between a diagonal and a base).
`,
      keyPoints: ['Sine rule: opposite pairs', 'Cosine rule: 2 sides + included angle, or 3 sides', 'Area = ½ab sin C', 'Formulas on the sheet - choose correctly'],
      generators: ['m-sine-cosine'],
      flashcards: cards([['Cosine rule?', 'a² = b² + c² − 2bc cos A'], ['When do you use the sine rule?', 'When you have a side and its opposite angle.'], ['Area of a triangle using trig?', '½ab sin C']]),
      questions: [
        mc('You know two sides and the angle between them and want the third side. Which rule?', ['Cosine rule', 'Sine rule', 'SOHCAHTOA', 'Pythagoras'], 'SAS → cosine rule.', { d: 3, tier: 'H' }),
        num('Find the area of a triangle with sides 8 cm and 11 cm and included angle 30°.', 22, '½ × 8 × 11 × 0.5 = 22.', { d: 3, tier: 'H', unit: 'cm²' }),
      ],
      examQuestions: [examQ('In triangle ABC, AB = 9 cm, AC = 7 cm and angle BAC = 50°. (a) Find BC. (b) Find angle ABC. Give answers to 3 s.f.', 5, ['M1: BC² = 9² + 7² − 2×9×7×cos 50°', 'A1: BC = 7.00 cm (6.997...)', 'M1: sin B / 7 = sin 50° / 6.997', 'M1: B = sin⁻¹(...)', 'A1: 50.0°'], { meta: 'Higher · calculator', time: 6 })],
    }),
    topic({
      id: 'm-geo-circles', title: 'Circle theorems', summary: 'The circle theorems and how to give reasons (Higher).', tier: 'H',
      notes: `
| Theorem | |
|---|---|
| Angle at the **centre** is **twice** the angle at the circumference | (same arc) |
| Angle in a **semicircle** is **90°** | |
| Angles in the **same segment** are **equal** | ("bow-tie") |
| Opposite angles of a **cyclic quadrilateral** add to **180°** | |
| Tangent and radius meet at **90°** | |
| Two **tangents** from a point are **equal** in length | |
| **Alternate segment theorem**: angle between tangent and chord = angle in the alternate segment | |
| The perpendicular from the centre to a chord **bisects** the chord | |

:::exam Reasons
Write the theorem in full: "Opposite angles in a cyclic quadrilateral add up to 180°". Look for **isosceles triangles** made by two radii.
:::
`,
      keyPoints: ['Centre angle = 2 × circumference angle', 'Semicircle angle = 90°', 'Same segment angles equal', 'Cyclic quadrilateral opposite angles = 180°', 'Tangent ⟂ radius', 'Alternate segment theorem', 'Two radii make an isosceles triangle'],
      flashcards: cards([['Angle in a semicircle?', '90°'], ['Opposite angles in a cyclic quadrilateral?', 'Add to 180°.'], ['Angle between tangent and radius?', '90°'], ['Alternate segment theorem?', 'The angle between a tangent and a chord equals the angle in the alternate segment.']]),
      questions: [
        num('The angle at the circumference is 38°. What is the angle at the centre subtended by the same arc?', 76, 'Double: 76°.', { d: 2, tier: 'H', unit: '°' }),
        num('In a cyclic quadrilateral, one angle is 112°. Find the opposite angle.', 68, '180 − 112 = 68°.', { d: 2, tier: 'H', unit: '°' }),
        multi('Which are true circle theorems?', ['The angle in a semicircle is 90°', 'Tangents from an external point are equal in length'], ['Opposite angles of any quadrilateral add to 180°', 'All angles at the circumference are 90°'], 'Only cyclic quadrilaterals have that property.', { d: 3, tier: 'H' }),
      ],
    }),
    topic({
      id: 'm-geo-transform', title: 'Transformations, congruence and similarity', summary: 'Reflections, rotations, translations, enlargements; congruent triangles and similar shapes.',
      notes: `
## Describing transformations (give ALL details)
| Transformation | Details needed |
|---|---|
| Reflection | the mirror line (e.g. y = x) |
| Rotation | angle, direction, centre |
| Translation | column vector (x over y) |
| Enlargement | scale factor, centre |

- Scale factor **fractional** → smaller; **negative** (Higher) → image is on the other side of the centre, upside down.

## Congruent triangles (identical) - conditions
**SSS, SAS, ASA (or AAS), RHS**.

## Similar shapes (same shape, different size)
- Length scale factor **k** → area factor **k²** → volume factor **k³** (Higher).
> Two similar cylinders with heights 4 cm and 12 cm: k = 3 → areas × 9 → volumes × 27.
`,
      keyPoints: ['Reflection: line; rotation: angle, direction, centre; translation: vector; enlargement: SF, centre', 'Congruence: SSS, SAS, ASA, RHS', 'Similar: lengths × k, area × k², volume × k³'],
      flashcards: cards([['What details describe a rotation?', 'Angle, direction (clockwise/anticlockwise) and centre.'], ['Conditions for congruent triangles?', 'SSS, SAS, ASA, RHS'], ['Length SF 2 → volume SF?', '8']]),
      questions: [
        mc('Which description of a rotation is complete?', ['90° clockwise about (0, 0)', '90° clockwise', 'Rotation about (0, 0)', 'A quarter turn about (0, 0)'], 'Angle, direction and centre are all needed.', { d: 1 }),
        num('Two similar shapes have lengths in ratio 1 : 3. The smaller has area 5 cm². Find the larger area.', 45, 'Area factor = 3² = 9 → 45.', { d: 3, unit: 'cm²' }),
        num('Two similar solids have volumes 16 cm³ and 128 cm³. What is the length scale factor?', 2, 'Volume factor 8 → ∛8 = 2.', { d: 4, tier: 'H' }),
        tf('AAA (three equal angles) proves two triangles are congruent.', false, 'It proves they are similar, not necessarily the same size.', { d: 3 }),
      ],
    }),
    topic({
      id: 'm-geo-vectors', title: 'Vectors', summary: 'Column vectors, vector arithmetic and geometric proof (Higher).', tier: 'H',
      notes: `
- A vector has **size and direction**. Column vector (3, −2) means 3 right, 2 down.
- Add/subtract components; multiply by a scalar: 2(3, −2) = (6, −4).
- Going **backwards** along a vector makes it negative: if AB = **a**, then BA = −**a**.
- **Route method**: to find XY, go along known vectors from X to Y.
- **Parallel** vectors are scalar multiples: 2**a** + 4**b** = 2(**a** + 2**b**).
- **Collinear** points: AB parallel to BC and they share point B.
- Midpoint M of AB: AM = ½ AB.
`,
      keyPoints: ['Backwards = negative vector', 'Find routes using known vectors', 'Parallel = scalar multiple', 'Collinear = parallel + shared point', 'Midpoint = ½ of the vector'],
      flashcards: cards([['How do you show two vectors are parallel?', 'Show one is a scalar multiple of the other.'], ['If AB = a, what is BA?', '−a']]),
      questions: [
        mc('OA = a, OB = b. What is AB?', ['b − a', 'a − b', 'a + b', '−a − b'], 'A → O → B: −a + b.', { d: 3, tier: 'H' }),
        tf('The vectors 3a − 6b and a − 2b are parallel.', true, '3a − 6b = 3(a − 2b).', { d: 3, tier: 'H' }),
      ],
    }),
    topic({
      id: 'm-geo-construct', title: 'Constructions, loci, plans and scale drawings', summary: 'Using compasses and a ruler; loci; plans and elevations; maps and scales.',
      notes: `
## Constructions (leave construction arcs visible!)
- **Perpendicular bisector** of a line: compasses from each end (same radius, more than half), join the crossings.
- **Angle bisector**: arc from the vertex, then equal arcs from where it crosses each arm.
- **Perpendicular from a point** to a line; triangles from 3 sides (SSS).

## Loci
| Description | Locus |
|---|---|
| Fixed distance from a point | Circle |
| Fixed distance from a line | Parallel lines with semicircular ends |
| Equidistant from two points | Perpendicular bisector |
| Equidistant from two lines | Angle bisector |

## Scale drawings and maps
Scale 1 : 50 000 → 1 cm on the map = 50 000 cm = **500 m**.

## Plans and elevations
Plan = view from above; front and side elevations = views from front and side.
`,
      keyPoints: ['Leave construction arcs', 'Equidistant from 2 points = perpendicular bisector', 'Equidistant from 2 lines = angle bisector', 'Map scale: convert cm to m/km carefully', 'Plan = from above'],
      flashcards: cards([['Locus of points equidistant from two points?', 'The perpendicular bisector of the line joining them.'], ['On a 1 : 25 000 map, 4 cm represents?', '100 000 cm = 1 km'], ['What is a plan view?', 'The view from directly above.']]),
      questions: [
        mc('Which construction gives points equidistant from two lines?', ['Angle bisector', 'Perpendicular bisector', 'Perpendicular from a point', 'Arc centred where the lines meet'], 'Equidistant from lines → bisect the angle between them.', { d: 2 }),
        num('A map has scale 1 : 50 000. Two towns are 7 cm apart on the map. How far apart are they in km?', 3.5, '7 × 50 000 = 350 000 cm = 3.5 km.', { d: 3, unit: 'km' }),
      ],
    }),
  ],
};
