// Questions drawn with a diagram: angle facts, triangles, Pythagoras and trigonometry, circle theorems, areas,
// bar and pie charts, histograms, box plots, straight-line and quadratic graphs, distance-time and velocity-time
// graphs, and scatter graphs. Every diagram is generated from the same numbers as the question, so it always matches.
import type { Diagram, GeneratedQuestion, GeoShape, Generator, Pt } from '../types';
import { ri, pk, r, f } from './helpers';
import { mcq } from './facts-kit';
import { shuffle } from '../../lib/util';

const G = (id: string, title: string, make: Generator['make'], tier?: Generator['tier']): Generator => ({ id, title, make, tier });
const rad = (d: number) => (d * Math.PI) / 180;
const neg = (n: number) => (n < 0 ? `−${-n}` : String(n));

/** Scale and move points so the drawing fills a w×h box with a margin */
function fit(pts: Pt[], w = 320, h = 230, m = 36): (p: Pt) => Pt {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const k = Math.min((w - 2 * m) / (x1 - x0 || 1), (h - 2 * m) / (y1 - y0 || 1));
  const ox = (w - (x1 - x0) * k) / 2, oy = (h - (y1 - y0) * k) / 2;
  return (p) => [ox + (p[0] - x0) * k, oy + (p[1] - y0) * k];
}
const geo = (shapes: GeoShape[], alt: string, w = 320, h = 230): Diagram => ({ kind: 'geo', w, h, shapes, alt });
/** triangle with angles A at the left, B at the right (degrees); returns its corners A, B, C (C at the top) */
function triangle(A: number, B: number): [Pt, Pt, Pt] {
  const a: Pt = [0, 0], b: Pt = [10, 0];
  // C where the ray from A (angle A up from AB) meets the ray from B (angle B up from BA); y is down in SVG
  const tA = Math.tan(rad(A)), tB = Math.tan(rad(B));
  const x = (10 * tB) / (tA + tB), y = -x * tA;
  return [a, b, [x, y]];
}

// =========================== ANGLES ===========================
function triangleAngleQ(rand: () => number): GeneratedQuestion {
  const A = ri(rand, 35, 85), B = ri(rand, 30, Math.min(95, 150 - A)), C = 180 - A - B;
  const [a, b, c] = triangle(A, B).map(fit(triangle(A, B)));
  const ask = pk(rand, ['C', 'A', 'B'] as const);
  const lab = (k: 'A' | 'B' | 'C', v: number) => (k === ask ? 'x' : `${v}°`);
  const ans = ask === 'A' ? A : ask === 'B' ? B : C;
  const d = geo([
    { t: 'poly', pts: [a, b, c] },
    { t: 'angle', at: a, from: b, to: c, label: lab('A', A) },
    { t: 'angle', at: b, from: c, to: a, label: lab('B', B) },
    { t: 'angle', at: c, from: a, to: b, label: lab('C', C), r: 18 },
  ], `A triangle with angles ${ask === 'A' ? 'x' : `${A}°`}, ${ask === 'B' ? 'x' : `${B}°`} and ${ask === 'C' ? 'x' : `${C}°`}.`);
  const known = (['A', 'B', 'C'] as const).filter((k) => k !== ask).map((k) => (k === 'A' ? A : k === 'B' ? B : C));
  return { q: 'Find the size of angle **x**.', answer: ans, unit: '°', diagram: d, steps: ['Angles in a triangle add up to 180°.', `x = 180 − ${known[0]} − ${known[1]} = ${ans}°`], hints: ['What do the three angles of a triangle add up to?'], d: 1 };
}

function isoscelesQ(rand: () => number): GeneratedQuestion {
  const apex = 2 * ri(rand, 12, 60), base = (180 - apex) / 2;
  const pts = triangle(base, base);
  const [a, b, c] = pts.map(fit(pts));
  const askApex = rand() < 0.45;
  const d = geo([
    { t: 'poly', pts: [a, b, c] },
    { t: 'ticks', a, b: c }, { t: 'ticks', a: b, b: c },
    { t: 'angle', at: c, from: a, to: b, label: askApex ? 'x' : `${apex}°`, r: 20 },
    { t: 'angle', at: b, from: c, to: a, label: askApex ? `${base}°` : 'x' },
  ], `An isosceles triangle: the two sides from the top are equal (tick marks). ${askApex ? `A base angle is ${base}°; the top angle is x.` : `The top angle is ${apex}°; a base angle is x.`}`);
  return askApex
    ? { q: 'The triangle is isosceles. Find angle **x**.', answer: apex, unit: '°', diagram: d, steps: ['The two base angles of an isosceles triangle are equal (the tick marks show the equal sides).', `x = 180 − ${base} − ${base} = ${apex}°`], d: 2 }
    : { q: 'The triangle is isosceles. Find angle **x**.', answer: base, unit: '°', diagram: d, steps: ['The two base angles are equal.', `x = (180 − ${apex}) ÷ 2 = ${base}°`], hints: ['Which two angles are equal in an isosceles triangle?'], d: 2 };
}

function straightLineQ(rand: () => number): GeneratedQuestion {
  const O: Pt = [160, 150];
  const three = rand() < 0.5;
  const a = ri(rand, 25, three ? 70 : 140), b = three ? ri(rand, 20, 150 - a) : 0;
  const x = 180 - a - b;
  const ray = (deg: number): Pt => [O[0] + 110 * Math.cos(rad(deg)), O[1] - 110 * Math.sin(rad(deg))];
  const E: Pt = [290, 150], W: Pt = [30, 150];
  const r1 = ray(a), r2 = ray(a + b);
  const shapes: GeoShape[] = [{ t: 'line', a: W, b: E }, { t: 'line', a: O, b: r1 }, { t: 'angle', at: O, from: E, to: r1, label: `${a}°`, r: 26 }];
  if (three) shapes.push({ t: 'line', a: O, b: r2 }, { t: 'angle', at: O, from: r1, to: r2, label: `${b}°`, r: 34 }, { t: 'angle', at: O, from: r2, to: W, label: 'x', r: 26 });
  else shapes.push({ t: 'angle', at: O, from: r1, to: W, label: 'x', r: 26 });
  return { q: 'The angles meet on a straight line. Find **x**.', answer: x, unit: '°', diagram: geo(shapes, `Angles on a straight line: ${a}°${three ? `, ${b}°` : ''} and x.`, 320, 190), steps: ['Angles on a straight line add up to 180°.', `x = 180 − ${a}${three ? ` − ${b}` : ''} = ${x}°`], d: 1 };
}

function aroundPointQ(rand: () => number): GeneratedQuestion {
  const O: Pt = [160, 115];
  const a = ri(rand, 60, 120), b = ri(rand, 50, 110);
  // every angle stays under 180° so each arc is drawn on the right side
  const c = ri(rand, Math.max(40, 190 - a - b), Math.min(170, 320 - a - b));
  const x = 360 - a - b - c;
  const start = ri(rand, 0, 40);
  const dirs = [start, start + a, start + a + b, start + a + b + c];
  const ray = (deg: number): Pt => [O[0] + 95 * Math.cos(rad(deg)), O[1] - 95 * Math.sin(rad(deg))];
  const rs = dirs.map(ray);
  const labels = [`${a}°`, `${b}°`, `${c}°`, 'x'];
  const shapes: GeoShape[] = rs.map((p) => ({ t: 'line', a: O, b: p }) as GeoShape);
  for (let i = 0; i < 4; i++) shapes.push({ t: 'angle', at: O, from: rs[i], to: rs[(i + 1) % 4], label: labels[i], r: 24 });
  return { q: 'Four angles meet at a point. Find **x**.', answer: x, unit: '°', diagram: geo(shapes, `Four angles around a point: ${a}°, ${b}°, ${c}° and x.`), steps: ['Angles around a point add up to 360°.', `x = 360 − ${a} − ${b} − ${c} = ${x}°`], d: 2 };
}

/** Two parallel lines cut by a transversal. Positions: UR, UL, LL, LR at each crossing. */
function parallelQ(rand: () => number): GeneratedQuestion {
  const th = ri(rand, 48, 75);
  const val = (pos: string) => (pos === 'UR' || pos === 'LL' ? th : 180 - th);
  const combos: [string, string, string, string][] = [
    ['UR', 'UR', 'corresponding', 'Corresponding angles are equal.'], ['LL', 'LL', 'corresponding', 'Corresponding angles are equal.'],
    ['LR', 'UL', 'alternate', 'Alternate angles are equal.'], ['LL', 'UR', 'alternate', 'Alternate angles are equal.'],
    ['LR', 'UR', 'co-interior', 'Co-interior angles add up to 180°.'], ['LL', 'UL', 'co-interior', 'Co-interior angles add up to 180°.'],
    ['UR', 'LL', 'vertically opposite', 'Vertically opposite angles are equal.'],
  ];
  const [p1, p2, fact, why] = pk(rand, combos);
  const same = fact === 'vertically opposite';
  // the transversal rises to the right, so its lower crossing is further left
  const P: Pt = [170, 75], Q: Pt = [170 - 90 / Math.tan(rad(th)), 165];
  const dir: Pt = [Math.cos(rad(th)), -Math.sin(rad(th))];
  const L = 70;
  const rays = (X: Pt): Record<string, [Pt, Pt]> => {
    const E: Pt = [X[0] + 50, X[1]], W: Pt = [X[0] - 50, X[1]], U: Pt = [X[0] + dir[0] * 50, X[1] + dir[1] * 50], D: Pt = [X[0] - dir[0] * 50, X[1] - dir[1] * 50];
    return { UR: [E, U], UL: [U, W], LL: [W, D], LR: [D, E] };
  };
  const given = val(p1), x = val(p2);
  const second = same ? P : Q;
  const shapes: GeoShape[] = [
    { t: 'line', a: [20, P[1]], b: [300, P[1]] }, { t: 'line', a: [20, Q[1]], b: [300, Q[1]] },
    { t: 'arrows', a: [250, P[1]], b: [290, P[1]] }, { t: 'arrows', a: [250, Q[1]], b: [290, Q[1]] },
    { t: 'line', a: [P[0] + dir[0] * L, P[1] + dir[1] * L], b: [Q[0] - dir[0] * L, Q[1] - dir[1] * L] },
    { t: 'angle', at: P, from: rays(P)[p1][0], to: rays(P)[p1][1], label: `${given}°`, r: 22 },
    { t: 'angle', at: second, from: rays(second)[p2][0], to: rays(second)[p2][1], label: 'x', r: 22 },
  ];
  const d = geo(shapes, `Two parallel lines (marked with arrows) crossed by a straight line. One angle is ${given}°; angle x is ${fact === 'vertically opposite' ? 'vertically opposite it' : `the ${fact} angle`}.`, 320, 235);
  if (rand() < 0.3) {
    const reasons = ['Corresponding angles are equal', 'Alternate angles are equal', 'Co-interior angles add up to 180°', 'Vertically opposite angles are equal'];
    const ans = reasons.find((rr) => rr.toLowerCase().startsWith(fact.split(' ')[0].toLowerCase()))!;
    return { ...mcq(rand, `Angle x is **${x}°**. Which reason explains this?`, ans, reasons.filter((rr) => rr !== ans), [why, fact === 'co-interior' ? `x = 180 − ${given} = ${x}°` : `x = ${x}°`], 2), diagram: d };
  }
  return { q: 'Find angle **x**.', answer: x, unit: '°', diagram: d, steps: [why, fact === 'co-interior' ? `x = 180 − ${given} = ${x}°` : `x = ${x}°`], hints: ['Look for a Z (alternate), F (corresponding), C (co-interior) or X (vertically opposite) shape.'], d: 2 };
}

// =========================== TRIANGLES ===========================
function rightTriangle(a: number, b: number, labels: { a?: string; b?: string; c?: string; angle?: string }): Diagram {
  const pts: Pt[] = [[0, 0], [0, -a], [b * 1.0, 0]];
  const [P, Q, R] = pts.map(fit(pts));
  const shapes: GeoShape[] = [{ t: 'poly', pts: [P, Q, R] }, { t: 'right', at: P, from: Q, to: R }];
  if (labels.a) shapes.push({ t: 'side', a: P, b: Q, s: labels.a });
  if (labels.b) shapes.push({ t: 'side', a: P, b: R, s: labels.b });
  if (labels.c) shapes.push({ t: 'side', a: Q, b: R, s: labels.c });
  if (labels.angle) shapes.push({ t: 'angle', at: R, from: Q, to: P, label: labels.angle, r: 26 });
  return geo(shapes, `A right-angled triangle. Vertical side ${labels.a ?? 'unlabelled'}, base ${labels.b ?? 'unlabelled'}, sloping side (hypotenuse) ${labels.c ?? 'unlabelled'}${labels.angle ? `, angle at the right-hand corner ${labels.angle}` : ''}.`);
}

function pythagDiagramQ(rand: () => number): GeneratedQuestion {
  const a = ri(rand, 4, 15), b = ri(rand, 4, 18), c = Math.hypot(a, b);
  if (rand() < 0.55) return { q: 'Find the length **x**. Give your answer to 1 decimal place.', answer: r(c, 1), unit: 'cm', tol: 0.051, diagram: rightTriangle(a, b, { a: `${a} cm`, b: `${b} cm`, c: 'x' }), steps: ['x is the hypotenuse (opposite the right angle): add the squares.', `x² = ${a}² + ${b}² = ${a * a + b * b}`, `x = √${a * a + b * b} = ${r(c, 3)} cm`], d: 2 };
  const cc = Math.ceil(c) + ri(rand, 0, 4);
  const x = Math.sqrt(cc * cc - b * b);
  return { q: 'Find the length **x**. Give your answer to 1 decimal place.', answer: r(x, 1), unit: 'cm', tol: 0.051, diagram: rightTriangle(x, b, { a: 'x', b: `${b} cm`, c: `${cc} cm` }), steps: ['x is a shorter side: subtract the squares.', `x² = ${cc}² − ${b}² = ${cc * cc - b * b}`, `x = √${cc * cc - b * b} = ${r(x, 3)} cm`], hints: ['Is x the longest side (the hypotenuse) or a shorter side?'], d: 3 };
}

function trigDiagramQ(rand: () => number): GeneratedQuestion {
  const ang = ri(rand, 20, 70), hyp = ri(rand, 6, 20);
  const opp = hyp * Math.sin(rad(ang)), adj = hyp * Math.cos(rad(ang));
  const k = pk(rand, ['opp', 'adj', 'angle'] as const);
  if (k === 'opp') return { q: 'Find the length **x** (1 dp).', answer: r(opp, 1), unit: 'cm', tol: 0.051, diagram: rightTriangle(opp, adj, { a: 'x', c: `${hyp} cm`, angle: `${ang}°` }), steps: ['x is opposite the angle; the hypotenuse is given → SOH: sin θ = O/H', `x = ${hyp} × sin ${ang}° = ${r(opp, 3)} cm`], d: 3 };
  if (k === 'adj') return { q: 'Find the length **x** (1 dp).', answer: r(adj, 1), unit: 'cm', tol: 0.051, diagram: rightTriangle(opp, adj, { b: 'x', c: `${hyp} cm`, angle: `${ang}°` }), steps: ['x is next to the angle (adjacent); the hypotenuse is given → CAH: cos θ = A/H', `x = ${hyp} × cos ${ang}° = ${r(adj, 3)} cm`], d: 3 };
  const o = ri(rand, 3, 12), a2 = ri(rand, 4, 14);
  const th = (Math.atan(o / a2) * 180) / Math.PI;
  return { q: 'Find the angle **x** (1 dp).', answer: r(th, 1), unit: '°', tol: 0.051, diagram: rightTriangle(o, a2, { a: `${o} cm`, b: `${a2} cm`, angle: 'x' }), steps: ['Opposite and adjacent are given → TOA: tan x = O/A', `x = tan⁻¹(${o} ÷ ${a2}) = ${r(th, 3)}°`], hints: ['To find an angle use the inverse: shift + tan.'], d: 4 };
}

function areaDiagramQ(rand: () => number): GeneratedQuestion {
  const k = pk(rand, ['L', 'trap', 'tri'] as const);
  if (k === 'L') {
    const W = ri(rand, 8, 16), Hh = ri(rand, 7, 14), w = ri(rand, 3, W - 3), h = ri(rand, 3, Hh - 3);
    const pts: Pt[] = [[0, 0], [w, 0], [w, Hh - h], [W, Hh - h], [W, Hh], [0, Hh]];
    const T = fit(pts);
    const p = pts.map(T);
    const area = W * Hh - (W - w) * (Hh - h);
    return { q: 'Find the area of the shape. All lengths are in cm and all corners are right angles.', answer: area, unit: 'cm²', diagram: geo([{ t: 'poly', pts: p, fill: true }, { t: 'side', a: p[0], b: p[1], s: `${w}` }, { t: 'side', a: p[5], b: p[4], s: `${W}` }, { t: 'side', a: p[0], b: p[5], s: `${Hh}` }, { t: 'side', a: p[3], b: p[4], s: `${h}` }], `An L-shape: total width ${W} cm, total height ${Hh} cm, the top part is ${w} cm wide and the right part is ${h} cm tall.`), steps: [`Split into two rectangles: ${w} × ${Hh} = ${w * Hh} and ${W - w} × ${h} = ${(W - w) * h}`, `Total = ${w * Hh} + ${(W - w) * h} = ${area} cm²`], hints: ['Split the shape into two rectangles (work out any missing side first).'], d: 2 };
  }
  if (k === 'trap') {
    const a = ri(rand, 4, 10), b = a + ri(rand, 3, 8), h = ri(rand, 3, 9);
    const off = (b - a) / 2;
    const pts: Pt[] = [[0, h], [b, h], [b - off, 0], [off, 0]];
    const p = pts.map(fit(pts));
    return { q: 'Find the area of the trapezium.', answer: ((a + b) * h) / 2, unit: 'cm²', diagram: geo([{ t: 'poly', pts: p, fill: true }, { t: 'side', a: p[3], b: p[2], s: `${a} cm` }, { t: 'side', a: p[0], b: p[1], s: `${b} cm` }, { t: 'line', a: p[3], b: [p[3][0], p[0][1]], dash: true }, { t: 'text', p: [p[3][0] + 18, (p[3][1] + p[0][1]) / 2 + 4], s: `${h} cm` }], `A trapezium with parallel sides ${a} cm and ${b} cm and perpendicular height ${h} cm.`), steps: ['Area = ½(a + b)h', `= ½ × (${a} + ${b}) × ${h} = ${f(((a + b) * h) / 2)} cm²`], d: 2 };
  }
  const b = ri(rand, 5, 16), h = ri(rand, 4, 12), s = ri(rand, 1, b - 1);
  const pts: Pt[] = [[0, h], [b, h], [s, 0]];
  const p = pts.map(fit(pts));
  return { q: 'Find the area of the triangle.', answer: (b * h) / 2, unit: 'cm²', diagram: geo([{ t: 'poly', pts: p, fill: true }, { t: 'side', a: p[0], b: p[1], s: `${b} cm` }, { t: 'line', a: p[2], b: [p[2][0], p[0][1]], dash: true }, { t: 'text', p: [p[2][0] + 18, (p[2][1] + p[0][1]) / 2 + 4], s: `${h} cm` }], `A triangle with base ${b} cm and perpendicular height ${h} cm.`), steps: ['Area = ½ × base × perpendicular height', `= ½ × ${b} × ${h} = ${f((b * h) / 2)} cm²`], d: 1 };
}

function circleTheoremQ(rand: () => number): GeneratedQuestion {
  const C: Pt = [160, 118], R = 92;
  const on = (deg: number): Pt => [C[0] + R * Math.cos(rad(deg)), C[1] - R * Math.sin(rad(deg))];
  const k = pk(rand, ['centre', 'semicircle', 'cyclic', 'tangent'] as const);
  if (k === 'centre') {
    const inscribed = ri(rand, 25, 75);
    const A = on(210), B = on(210 + 2 * inscribed), P = on(90 + inscribed);
    const askCentre = rand() < 0.6;
    const d = geo([{ t: 'circle', c: C, r: R }, { t: 'dot', p: C, label: 'O', at: 's' }, { t: 'line', a: A, b: C }, { t: 'line', a: B, b: C }, { t: 'line', a: A, b: P }, { t: 'line', a: B, b: P },
      { t: 'dot', p: A, label: 'A', at: 'sw' }, { t: 'dot', p: B, label: 'B', at: 'se' }, { t: 'dot', p: P, label: 'C', at: 'n' },
      { t: 'angle', at: C, from: A, to: B, label: askCentre ? 'x' : `${2 * inscribed}°`, r: 20 }, { t: 'angle', at: P, from: A, to: B, label: askCentre ? `${inscribed}°` : 'x', r: 24 }],
    `A circle with centre O. A, B and C are on the circle. Angle ACB is ${askCentre ? `${inscribed}°` : 'x'} and angle AOB at the centre is ${askCentre ? 'x' : `${2 * inscribed}°`}.`);
    return askCentre
      ? { q: 'O is the centre of the circle. Find angle **x**.', answer: 2 * inscribed, unit: '°', diagram: d, steps: ['The angle at the centre is twice the angle at the circumference.', `x = 2 × ${inscribed} = ${2 * inscribed}°`], d: 3 }
      : { q: 'O is the centre of the circle. Find angle **x**.', answer: inscribed, unit: '°', diagram: d, steps: ['The angle at the centre is twice the angle at the circumference.', `x = ${2 * inscribed} ÷ 2 = ${inscribed}°`], d: 3 };
  }
  if (k === 'semicircle') {
    const a = ri(rand, 25, 65);
    // C sits at 2a° round from B, so the arc CB is 2a and angle CAB really is a
    const A = on(180), B = on(0), Pp = on(2 * a);
    const d = geo([{ t: 'circle', c: C, r: R }, { t: 'dot', p: C, label: 'O', at: 's' }, { t: 'line', a: A, b: B }, { t: 'line', a: A, b: Pp }, { t: 'line', a: B, b: Pp },
      { t: 'dot', p: A, label: 'A', at: 'w' }, { t: 'dot', p: B, label: 'B', at: 'e' }, { t: 'dot', p: Pp, label: 'C', at: 'n' },
      { t: 'angle', at: A, from: B, to: Pp, label: `${a}°`, r: 30 }, { t: 'angle', at: B, from: Pp, to: A, label: 'x', r: 28 }],
    `AB is a diameter of the circle with centre O. C is on the circle. Angle CAB is ${a}° and angle ABC is x.`);
    return { q: 'AB is a diameter and O is the centre. Find angle **x**.', answer: 90 - a, unit: '°', diagram: d, steps: ['The angle in a semicircle is 90°, so angle ACB = 90°.', `x = 180 − 90 − ${a} = ${90 - a}°`], hints: ['What is special about an angle drawn from a diameter to the circle?'], d: 3 };
  }
  if (k === 'cyclic') {
    const a = ri(rand, 60, 120);
    // arcs A→B 180−a, B→C a, C→D a, D→A 180−a: so angle A = a and angle C = 180 − a exactly
    const pts = [on(225), on(405 - a), on(405), on(405 + a)];
    const d = geo([{ t: 'circle', c: C, r: R }, { t: 'poly', pts },
      { t: 'dot', p: pts[0], label: 'A', at: 'sw' }, { t: 'dot', p: pts[1], label: 'B', at: 'se' }, { t: 'dot', p: pts[2], label: 'C', at: 'ne' }, { t: 'dot', p: pts[3], label: 'D', at: 'nw' },
      { t: 'angle', at: pts[0], from: pts[1], to: pts[3], label: `${a}°`, r: 24 }, { t: 'angle', at: pts[2], from: pts[3], to: pts[1], label: 'x', r: 24 }],
    `A cyclic quadrilateral ABCD (all four corners on the circle). Angle DAB is ${a}° and the opposite angle BCD is x.`);
    return { q: 'ABCD is a cyclic quadrilateral. Find angle **x**.', answer: 180 - a, unit: '°', diagram: d, steps: ['Opposite angles in a cyclic quadrilateral add up to 180°.', `x = 180 − ${a} = ${180 - a}°`], d: 3 };
  }
  // tangent at A (the bottom of a smaller circle); T is along the tangent so that angle AOT is exactly angO
  const angO = ri(rand, 25, 60);
  const O: Pt = [110, 95], R2 = 70;
  const A: Pt = [O[0], O[1] + R2], T: Pt = [O[0] + R2 * Math.tan(rad(angO)), O[1] + R2];
  const d = geo([{ t: 'circle', c: O, r: R2 }, { t: 'dot', p: O, label: 'O', at: 'n' }, { t: 'line', a: [20, A[1]], b: [305, A[1]] }, { t: 'line', a: O, b: A }, { t: 'line', a: O, b: T },
    { t: 'dot', p: A, label: 'A', at: 's' }, { t: 'dot', p: T, label: 'T', at: 's' }, { t: 'right', at: A, from: O, to: T },
    { t: 'angle', at: O, from: A, to: T, label: `${angO}°`, r: 22 }, { t: 'angle', at: T, from: O, to: A, label: 'x', r: 26 }],
  `A circle with centre O. The line through A and T is a tangent to the circle at A. Angle AOT is ${angO}° and angle ATO is x.`, 320, 200);
  return { q: 'TA is a tangent to the circle at A, and O is the centre. Find angle **x**.', answer: 90 - angO, unit: '°', diagram: d, steps: ['A tangent meets a radius at 90°, so angle OAT = 90°.', `x = 180 − 90 − ${angO} = ${90 - angO}°`], hints: ['What angle does a tangent make with the radius?'], d: 3 };
}

// =========================== CHARTS ===========================
const CATS = [['Football', 'Netball', 'Swimming', 'Tennis', 'Cricket'], ['Dog', 'Cat', 'Fish', 'Rabbit', 'Hamster'], ['Bus', 'Car', 'Walk', 'Cycle', 'Train'], ['Maths', 'English', 'Science', 'Art', 'History']];
const CTX = ['favourite sport', 'favourite pet', 'way of getting to school', 'favourite subject'];

function barQ(rand: () => number): GeneratedQuestion {
  const ci = ri(rand, 0, CATS.length - 1);
  const n = ri(rand, 4, 5);
  const labels = CATS[ci].slice(0, n);
  const values = labels.map(() => ri(rand, 2, 18));
  if (new Set(values).size < values.length) return barQ(rand);
  const d: Diagram = { kind: 'bar', labels, values, y: 'Frequency', alt: `Bar chart of ${CTX[ci]}: ${labels.map((l, i) => `${l} ${values[i]}`).join(', ')}.` };
  const k = rand();
  const [i, j] = shuffle([...labels.keys()], rand).slice(0, 2);
  if (k < 0.4) return { q: `The bar chart shows each student's ${CTX[ci]}. How many more chose **${labels[i]}** than **${labels[j]}**?`, answer: Math.abs(values[i] - values[j]), diagram: d, steps: [`${labels[i]}: ${values[i]}, ${labels[j]}: ${values[j]}`, `Difference = ${Math.abs(values[i] - values[j])}`], d: 1 } as GeneratedQuestion;
  if (k < 0.7) return { q: `The bar chart shows each student's ${CTX[ci]}. How many students were asked altogether?`, answer: values.reduce((a, b) => a + b, 0), diagram: d, steps: [`Add every bar: ${values.join(' + ')} = ${values.reduce((a, b) => a + b, 0)}`], d: 1 };
  const max = labels[values.indexOf(Math.max(...values))];
  return { ...mcq(rand, `The bar chart shows each student's ${CTX[ci]}. What is the **mode**?`, max, labels.filter((l) => l !== max), ['The mode is the most common answer – the tallest bar.', `Mode: ${max}`], 1), diagram: d };
}

function pieQ(rand: () => number): GeneratedQuestion {
  const ci = ri(rand, 0, CATS.length - 1);
  const total = pk(rand, [36, 60, 72, 90, 120, 180]);
  const per = 360 / total;
  const counts = [ri(rand, 2, total / 4), ri(rand, 2, total / 4), ri(rand, 2, total / 5)];
  const last = total - counts.reduce((a, b) => a + b, 0);
  if (last < 2) return pieQ(rand);
  const values = [...counts, last];
  const labels = CATS[ci].slice(0, 4);
  const d: Diagram = { kind: 'pie', labels, values, angles: true, alt: `Pie chart of ${CTX[ci]} for ${total} people: ${labels.map((l, i) => `${l} ${Math.round(values[i] * per)}°`).join(', ')}.` };
  const i = ri(rand, 0, 3);
  return { q: `The pie chart shows the ${CTX[ci]} of **${total} people**. How many chose **${labels[i]}**?`, answer: values[i], diagram: d, steps: [`Each person is 360 ÷ ${total} = ${f(per)}°`, `${labels[i]}: ${Math.round(values[i] * per)} ÷ ${f(per)} = ${values[i]} people`], hints: ['Work out how many degrees stand for one person.'], d: 2 };
}

function histogramQ(rand: () => number): GeneratedQuestion {
  const widths = pk(rand, [[10, 10, 20, 20, 40], [5, 5, 10, 20, 20], [20, 10, 10, 20, 40]]);
  const bounds = [0];
  for (const w of widths) bounds.push(bounds[bounds.length - 1] + w);
  // frequency densities chosen so every bar holds a whole number of people
  const fd = widths.map((w) => pk(rand, [0.2, 0.4, 0.5, 0.6, 0.8, 1, 1.2, 1.5].filter((v) => Math.abs(w * v - Math.round(w * v)) < 1e-9)));
  const freqs = widths.map((w, i) => Math.round(w * fd[i]));
  const d: Diagram = { kind: 'histogram', bounds, fd, x: 'Time (minutes)', alt: `Histogram of times in minutes with classes ${bounds.slice(0, -1).map((b, i) => `${b}–${bounds[i + 1]} (frequency density ${f(fd[i])})`).join(', ')}.` };
  const i = ri(rand, 0, widths.length - 1);
  if (rand() < 0.6) return { q: `The histogram shows how long people waited. How many people waited between **${bounds[i]} and ${bounds[i + 1]} minutes**?`, answer: r(freqs[i], 2), diagram: d, steps: ['Frequency = frequency density × class width', `${f(fd[i])} × ${widths[i]} = ${f(freqs[i])}`], hints: ['In a histogram the AREA of each bar is the frequency.'], d: 4 };
  return { q: 'The histogram shows how long people waited. How many people were in the survey altogether?', answer: r(freqs.reduce((a, b) => a + b, 0), 2), diagram: d, steps: ['Frequency of each bar = frequency density × class width', freqs.map((fq, k) => `${f(fd[k])} × ${widths[k]} = ${f(fq)}`).join('; '), `Total = ${f(freqs.reduce((a, b) => a + b, 0))}`], d: 4 };
}

function boxplotQ(rand: () => number): GeneratedQuestion {
  const box = () => { const mn = ri(rand, 2, 20), q1 = mn + ri(rand, 3, 12), md = q1 + ri(rand, 2, 10), q3 = md + ri(rand, 2, 12), mx = q3 + ri(rand, 3, 15); return [mn, q1, md, q3, mx] as [number, number, number, number, number]; };
  const two = rand() < 0.4;
  const A = box(), B = box();
  const top = Math.ceil(Math.max(A[4], two ? B[4] : 0, 10) / 10) * 10;
  const d: Diagram = { kind: 'boxplot', boxes: two ? [{ label: 'Group A', v: A }, { label: 'Group B', v: B }] : [{ v: A }], axis: [0, top, top <= 40 ? 2 : 5], x: 'Score', alt: two ? `Two box plots. Group A: min ${A[0]}, LQ ${A[1]}, median ${A[2]}, UQ ${A[3]}, max ${A[4]}. Group B: min ${B[0]}, LQ ${B[1]}, median ${B[2]}, UQ ${B[3]}, max ${B[4]}.` : `A box plot: min ${A[0]}, lower quartile ${A[1]}, median ${A[2]}, upper quartile ${A[3]}, max ${A[4]}.` };
  if (two) {
    const iA = A[3] - A[1], iB = B[3] - B[1];
    if (iA === iB) return boxplotQ(rand);
    const cons = iA < iB ? 'Group A' : 'Group B';
    return { ...mcq(rand, 'Which group\'s scores were **more consistent**?', cons, [cons === 'Group A' ? 'Group B' : 'Group A', 'The group with the higher median', 'They were equally consistent'], [`IQR of A = ${A[3]} − ${A[1]} = ${iA}; IQR of B = ${B[3]} − ${B[1]} = ${iB}`, `Smaller IQR = more consistent: ${cons}.`], 2), diagram: d };
  }
  const k = pk(rand, ['median', 'iqr', 'range'] as const);
  if (k === 'median') return { q: 'What is the **median** shown by the box plot?', answer: A[2], diagram: d, steps: ['The median is the line inside the box.', `Median = ${A[2]}`], d: 1 };
  if (k === 'iqr') return { q: 'Find the **interquartile range** shown by the box plot.', answer: A[3] - A[1], diagram: d, steps: ['IQR = upper quartile − lower quartile (the ends of the box)', `${A[3]} − ${A[1]} = ${A[3] - A[1]}`], hints: ['The box covers the middle half of the data.'], d: 2 };
  return { q: 'Find the **range** shown by the box plot.', answer: A[4] - A[0], diagram: d, steps: ['Range = maximum − minimum (the ends of the whiskers)', `${A[4]} − ${A[0]} = ${A[4] - A[0]}`], d: 1 };
}

function scatterQ(rand: () => number): GeneratedQuestion {
  const kind = pk(rand, ['positive', 'negative', 'none'] as const);
  const pts: { p: Pt }[] = [];
  for (let i = 0; i < 12; i++) {
    const x = ri(rand, 1, 19);
    const y = kind === 'positive' ? x * 0.9 + ri(rand, -3, 3) + 2 : kind === 'negative' ? 20 - x * 0.9 + ri(rand, -3, 3) : ri(rand, 2, 18);
    pts.push({ p: [x, Math.max(0.5, Math.min(19.5, y))] });
  }
  const d: Diagram = { kind: 'graph', x: [0, 20, 2], y: [0, 20, 2], xl: 'Hours of revision', yl: 'Test score', points: pts, alt: `A scatter graph of hours of revision against test score showing ${kind === 'none' ? 'no clear pattern' : `${kind} correlation`}.` };
  const ans = kind === 'none' ? 'No clear correlation' : `${kind[0].toUpperCase()}${kind.slice(1)} correlation`;
  return { ...mcq(rand, 'What type of correlation does the scatter graph show?', ans, ['Positive correlation', 'Negative correlation', 'No clear correlation', 'Proof revision causes scores'].filter((x) => x !== ans), [kind === 'positive' ? 'As one variable increases, so does the other.' : kind === 'negative' ? 'As one variable increases, the other decreases.' : 'The points show no clear pattern.', 'Correlation never proves causation.'], 1), diagram: d };
}

// =========================== GRAPHS ===========================
function lineGraphQ(rand: () => number): GeneratedQuestion {
  const m = pk(rand, [-3, -2, -1, 1, 2, 3, 0.5, -0.5]), c = ri(rand, -4, 4);
  const d: Diagram = { kind: 'graph', x: [-5, 5, 1], y: [-8, 8, 1], xl: 'x', yl: 'y', lines: [{ m, c }], alt: `A straight-line graph crossing the y-axis at ${c} with gradient ${m}.` };
  const k = pk(rand, ['grad', 'int', 'read'] as const);
  if (k === 'grad') return { q: 'Work out the **gradient** of the line.', answer: m, diagram: d, steps: ['Pick two points where the line crosses grid corners.', 'Gradient = change in y ÷ change in x', `= ${f(m)}${m < 0 ? ' (negative: the line slopes down)' : ''}`], hints: ['Up (or down) how many squares for each 1 square across?'], d: 3 };
  if (k === 'int') return { q: 'Where does the line cross the **y-axis**? Give the y-value.', answer: c, diagram: d, steps: ['The y-intercept is where x = 0.', `It crosses at y = ${neg(c)}`], d: 1 };
  const x0 = ri(rand, -3, 3);
  const y0 = m * x0 + c;
  if (Math.abs(y0) > 8) return lineGraphQ(rand);
  return { q: `Use the graph to find the value of **y when x = ${neg(x0)}**.`, answer: y0, tol: 0.26, diagram: d, steps: [`Go along to x = ${neg(x0)}, up or down to the line, then across to the y-axis.`, `y = ${f(y0)}`], d: 2 };
}

function quadGraphQ(rand: () => number): GeneratedQuestion {
  let p = ri(rand, -4, 2), q = p + ri(rand, 1, 6);
  if (q > 5) { q = 5; if (p >= q) p = q - 2; }
  const b = -(p + q), c = p * q;
  const vx = (p + q) / 2, vy = vx * vx + b * vx + c;
  const ymin = Math.min(-2, Math.floor(vy) - 1), ymax = Math.max(8, Math.ceil(c) + 1);
  if (ymax - ymin > 24) return quadGraphQ(rand);
  const d: Diagram = { kind: 'graph', x: [-5, 6, 1], y: [ymin, ymax, ymax - ymin > 14 ? 2 : 1], xl: 'x', yl: 'y', quads: [{ a: 1, b, c }], alt: `The graph of a quadratic curve crossing the x-axis at ${p} and ${q}, with its lowest point at (${f(vx)}, ${f(vy)}).` };
  const k = pk(rand, ['roots', 'yint', 'turn'] as const);
  if (k === 'roots') return { ...mcq(rand, 'Use the graph to solve **y = 0** (where the curve crosses the x-axis).', `x = ${neg(p)} and x = ${neg(q)}`, [`x = ${neg(-p)} and x = ${neg(-q)}`, `x = ${neg(c)} only`, `x = ${neg(p)} and x = ${neg(c)}`, `x = ${f(vx).replace('-', '−')} only`].filter((o, i, a) => a.indexOf(o) === i), ['The solutions of y = 0 are where the curve crosses the x-axis.', `x = ${neg(p)} and x = ${neg(q)}`], 2), diagram: d };
  if (k === 'yint') return { q: 'Use the graph: what is the value of **y when x = 0**?', answer: c, tol: 0.26, diagram: d, steps: ['Read where the curve crosses the y-axis.', `y = ${neg(c)}`], d: 2 };
  const F = (v: number) => f(v).replace('-', '−');
  const tp = (a: number, b2: number) => `(${F(a)}, ${F(b2)})`;
  return { ...mcq(rand, 'What are the coordinates of the **turning point** (the lowest point) of the curve?', tp(vx, vy), [tp(vy, vx), tp(-vx, vy), tp(vx, c), tp(0, c), tp(vx, -vy), tp(vx + 1, vy), tp(p, 0), tp(vx, vy + 1)], ['The turning point is where the curve changes direction.', `It is halfway between the roots: x = ${F(vx)}, and y = ${F(vy)} there.`], 3), diagram: d };
}

function dtGraphQ(rand: () => number): GeneratedQuestion {
  // times of 10, 20 or 25 s with distances in hundreds of metres keep every speed a whole number
  const t1 = pk(rand, [10, 20, 25]), d1 = ri(rand, 2, 6) * 100, stop = ri(rand, 1, 3) * 5, t3 = pk(rand, [10, 20, 25]);
  const pts: Pt[] = [[0, 0], [t1, d1], [t1 + stop, d1], [t1 + stop + t3, 0]];
  const xMax = Math.ceil((t1 + stop + t3) / 10) * 10, yMax = Math.ceil(d1 / 100) * 100 + 100;
  const d: Diagram = { kind: 'graph', x: [0, xMax, xMax > 40 ? 10 : 5], y: [0, yMax, 100], xl: 'Time (s)', yl: 'Distance (m)', poly: pts, alt: `A distance-time graph: ${d1} m in ${t1} s, stopped for ${stop} s, then back to the start in ${t3} s.` };
  const k = pk(rand, ['speed1', 'stop', 'speed3'] as const);
  if (k === 'speed1') return { q: 'The graph shows a journey. Work out the **speed** in the first part of the journey.', answer: r(d1 / t1, 2), unit: 'm/s', diagram: d, steps: ['Speed = gradient of a distance-time graph = distance ÷ time', `${d1} ÷ ${t1} = ${f(d1 / t1)} m/s`], d: 2 };
  if (k === 'stop') return { q: 'For how many seconds was the object **stationary**?', answer: stop, unit: 's', diagram: d, steps: ['Stationary = a flat (horizontal) section of a distance-time graph.', `From ${t1} s to ${t1 + stop} s: ${stop} s`], d: 1 };
  return { q: 'Work out the **speed** on the way back (the last part of the graph).', answer: r(d1 / t3, 2), unit: 'm/s', diagram: d, steps: [`It travels ${d1} m back in ${t3} s.`, `Speed = ${d1} ÷ ${t3} = ${f(d1 / t3)} m/s`], d: 2 };
}

function vtGraphQ(rand: () => number): GeneratedQuestion {
  // accelerations come out exact (no recurring decimals) and every corner sits on a grid line
  const v = ri(rand, 2, 8) * 2;
  const exact = (t: number) => (v * 100) % t === 0;
  const times = [2, 4, 6, 8, 10].filter(exact);
  const t1 = pk(rand, times), t2 = ri(rand, 1, 5) * 2, t3 = pk(rand, times);
  const pts: Pt[] = [[0, 0], [t1, v], [t1 + t2, v], [t1 + t2 + t3, 0]];
  const xMax = Math.ceil((t1 + t2 + t3) / 2) * 2 + 2, yMax = v + 4;
  const d: Diagram = { kind: 'graph', x: [0, xMax, 2], y: [0, yMax, 2], xl: 'Time (s)', yl: 'Velocity (m/s)', poly: pts, alt: `A velocity-time graph: speeds up to ${v} m/s in ${t1} s, steady for ${t2} s, then slows to a stop in ${t3} s.` };
  const k = pk(rand, ['acc', 'dist', 'dec'] as const);
  if (k === 'acc') return { q: 'Work out the **acceleration** in the first part of the journey.', answer: r(v / t1, 2), unit: 'm/s²', diagram: d, steps: ['Acceleration = gradient of a velocity-time graph', `${v} ÷ ${t1} = ${f(v / t1)} m/s²`], d: 3 };
  if (k === 'dec') return { q: 'Work out the **deceleration** at the end of the journey.', answer: r(v / t3, 2), unit: 'm/s²', diagram: d, steps: ['Deceleration = size of the (negative) gradient', `${v} ÷ ${t3} = ${f(v / t3)} m/s²`], d: 3 };
  const dist = 0.5 * t1 * v + t2 * v + 0.5 * t3 * v;
  return { q: 'Work out the **total distance** travelled.', answer: dist, unit: 'm', diagram: d, steps: ['Distance = area under a velocity-time graph', `½ × ${t1} × ${v} + ${t2} × ${v} + ½ × ${t3} × ${v} = ${f(dist)} m`], hints: ['Split the area into two triangles and a rectangle.'], d: 4 };
}

export const VISUAL_GENERATORS: Generator[] = [
  G('vz-triangle', 'Angles in a triangle (diagram)', (rr) => triangleAngleQ(rr)),
  G('vz-isosceles', 'Isosceles triangles (diagram)', (rr) => isoscelesQ(rr)),
  G('vz-line', 'Angles on a straight line (diagram)', (rr) => straightLineQ(rr)),
  G('vz-point', 'Angles around a point (diagram)', (rr) => aroundPointQ(rr)),
  G('vz-parallel', 'Angles in parallel lines (diagram)', (rr) => parallelQ(rr)),
  G('vz-pythag', "Pythagoras' theorem (diagram)", (rr) => pythagDiagramQ(rr)),
  G('vz-trig', 'Trigonometry (diagram)', (rr) => trigDiagramQ(rr)),
  G('vz-area', 'Areas of shapes (diagram)', (rr) => areaDiagramQ(rr)),
  G('vz-circle', 'Circle theorems (diagram)', (rr) => circleTheoremQ(rr), 'H'),
  G('vz-bar', 'Reading bar charts', (rr) => barQ(rr)),
  G('vz-pie', 'Reading pie charts', (rr) => pieQ(rr)),
  G('vz-histogram', 'Reading histograms', (rr) => histogramQ(rr), 'H'),
  G('vz-boxplot', 'Reading box plots', (rr) => boxplotQ(rr)),
  G('vz-boxplot-h', 'Reading box plots', (rr) => boxplotQ(rr), 'H'),
  G('vz-scatter', 'Scatter graphs (diagram)', (rr) => scatterQ(rr)),
  G('vz-line-graph', 'Reading straight-line graphs', (rr) => lineGraphQ(rr)),
  G('vz-quad-graph', 'Reading quadratic graphs', (rr) => quadGraphQ(rr)),
  G('vz-dt', 'Distance-time graphs', (rr) => dtGraphQ(rr)),
  G('vz-vt', 'Velocity-time graphs', (rr) => vtGraphQ(rr)),
];

export const VISUAL_TOPICS: Record<string, string[]> = {
  'm-geo-angles': ['vz-triangle', 'vz-isosceles', 'vz-line', 'vz-point', 'vz-parallel'],
  'm-geo-pythag': ['vz-pythag'],
  'm-geo-trig': ['vz-trig'],
  'm-geo-area': ['vz-area'],
  'm-geo-circles': ['vz-circle'],
  'm-stat-charts': ['vz-bar', 'vz-pie', 'vz-scatter', 'vz-histogram'],
  'm-stat-averages': ['vz-boxplot-h'],
  'm-alg-graphs': ['vz-line-graph'],
  'm-alg-quadratics': ['vz-quad-graph'],
  'm-alg-graphs2': ['vz-quad-graph'],
  'm-rat-compound': ['vz-dt'],
  'm-rat-rates': ['vz-dt'],
  'st-diagrams': ['vz-bar', 'vz-pie', 'vz-histogram'],
  'st-spread': ['vz-boxplot'],
  'st-correlation': ['vz-scatter'],
  'phys-motion': ['vz-dt', 'vz-vt'],
};
