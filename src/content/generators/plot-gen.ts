// Plotting on a grid: the student taps the grid (or types coordinates) to plot points, draw a straight line from its
// equation or a table of values, plot a curve from a table, or transform a shape. Marked point by point.
import type { GeneratedQuestion, Generator, Pt } from '../types';
import { ri, pk, nz } from './helpers';

const G = (id: string, title: string, make: Generator['make'], tier?: Generator['tier']): Generator => ({ id, title, make, tier });
const n = (v: number) => (v < 0 ? `−${-v}` : String(v));
const pt = (p: Pt) => `(${n(p[0])}, ${n(p[1])})`;
const term = (m: number, c: number) => `${m === 1 ? '' : m === -1 ? '−' : n(m)}x${c === 0 ? '' : c < 0 ? ` − ${-c}` : ` + ${c}`}`;
type Grid = NonNullable<GeneratedQuestion['plot']>['grid'];
/** twice the triangle's area: small values mean a thin sliver that is hard to see */
const area2 = (t: Pt[]) => Math.abs((t[1][0] - t[0][0]) * (t[2][1] - t[0][1]) - (t[2][0] - t[0][0]) * (t[1][1] - t[0][1]));
const P = (q: string, grid: Grid, rest: Omit<NonNullable<GeneratedQuestion['plot']>, 'grid'>, steps: string[], d: number, hints?: string[]): GeneratedQuestion =>
  ({ q, answer: rest.points ? rest.points.map(pt).join(' ') : `${rest.line!.min ?? 2} points on y = ${term(rest.line!.m, rest.line!.c)}`, plot: { grid, ...rest }, steps, d, hints });

function plotPoints(rand: () => number): GeneratedQuestion {
  const count = rand() < 0.5 ? 3 : 2;
  const pts: Pt[] = [];
  while (pts.length < count) {
    const p: Pt = [ri(rand, -5, 5), ri(rand, -5, 5)];
    if (!pts.some((q) => q[0] === p[0] && q[1] === p[1]) && p[0] !== p[1]) pts.push(p);
  }
  return P(`Plot the points **${pts.map(pt).join(', ')}** on the grid.`, { x: [-6, 6], y: [-6, 6] }, { points: pts },
    ['The first number is x (across), the second is y (up or down): "along the corridor, then up the stairs".', ...pts.map((p) => `${pt(p)}: ${p[0] >= 0 ? 'right' : 'left'} ${Math.abs(p[0])}, ${p[1] >= 0 ? 'up' : 'down'} ${Math.abs(p[1])}`)], 1,
    ['Across first (x), then up or down (y).']);
}

function lineFromTable(rand: () => number): GeneratedQuestion {
  const m = pk(rand, [1, 2, 3, -1, -2]), c = ri(rand, -3, 3);
  const xs = [-2, -1, 0, 1, 2].filter((x) => Math.abs(m * x + c) <= 8);
  const points = xs.map((x) => [x, m * x + c] as Pt);
  return P(`Complete a table of values for **y = ${term(m, c)}** for x = ${xs.map(n).join(', ')}, then plot all ${xs.length} points.`, { x: [-3, 3], y: [-8, 8] }, { points },
    ['Substitute each x value into the equation.', ...points.map((p) => `x = ${n(p[0])}: y = ${n(m)} × ${n(p[0])} ${c < 0 ? `− ${-c}` : `+ ${c}`} = ${n(p[1])}`), 'The points should make a straight line.'], 2,
    ['Work out y for each value of x, then plot (x, y).']);
}

function drawLine(rand: () => number): GeneratedQuestion {
  const m = pk(rand, [1, 2, -1, -2, 3, 0.5]), c = ri(rand, -4, 4);
  const xRange: [number, number] = [-5, 5];
  return P(`Draw the line **y = ${term(m, c)}** by plotting **at least 3 points** on it.`, { x: xRange, y: [-6, 6] }, { line: { m, c, min: 3 } },
    [`The line crosses the y-axis at ${n(c)} (the y-intercept).`, `Its gradient is ${n(m)}: for every 1 across, ${Math.abs(m)} ${m > 0 ? 'up' : 'down'}.`, `For example: ${[0, 2, -2].map((x) => pt([x, m * x + c])).join(', ')}`], 2,
    ['Start at the y-intercept, then use the gradient to find more points.']);
}

function quadFromTable(rand: () => number): GeneratedQuestion {
  const b = pk(rand, [0, -2, 2, -1, 1]), c = ri(rand, -4, 1);
  const xs = [-3, -2, -1, 0, 1, 2, 3].filter((x) => { const y = x * x + b * x + c; return y >= -6 && y <= 12; });
  const points = xs.map((x) => [x, x * x + b * x + c] as Pt);
  const eq = `x²${b === 0 ? '' : b < 0 ? ` − ${b === -1 ? '' : -b}x` : ` + ${b === 1 ? '' : b}x`}${c === 0 ? '' : c < 0 ? ` − ${-c}` : ` + ${c}`}`;
  return P(`For **y = ${eq}**, work out y for x = ${xs.map(n).join(', ')} and plot the points.`, { x: [-4, 4], y: [-6, 12] }, { points },
    ['Substitute each value of x. Remember a negative number squared is positive.', ...points.map((p) => `x = ${n(p[0])}: y = ${n(p[1])}`), 'Join them with a smooth U-shaped curve (not straight lines).'], 3,
    ['(−2)² = 4, not −4.']);
}

function reflect(rand: () => number): GeneratedQuestion {
  const kind = pk(rand, ['y', 'x'] as const);
  // the triangle sits wholly on one side of the mirror line, so the image never overlaps it
  const tri: Pt[] = [];
  while (tri.length < 3) {
    const p: Pt = kind === 'y' ? [ri(rand, 1, 5), ri(rand, -4, 5)] : [ri(rand, -4, 5), ri(rand, 1, 5)];
    if (!tri.some((q) => q[0] === p[0] && q[1] === p[1])) tri.push(p);
  }
  if (area2(tri) < 6) return reflect(rand);
  const img = tri.map((p) => (kind === 'y' ? [-p[0], p[1]] : [p[0], -p[1]]) as Pt);
  return P(`Triangle A has corners at ${tri.map(pt).join(', ')} (shown). **Reflect it in the ${kind}-axis**: plot the three corners of the image.`, { x: [-6, 6], y: [-6, 6] },
    { points: img, given: tri.map((p, i) => ({ p, label: i === 0 ? 'A' : undefined })) },
    [kind === 'y' ? 'Reflecting in the y-axis: x changes sign, y stays the same.' : 'Reflecting in the x-axis: y changes sign, x stays the same.', ...tri.map((p, i) => `${pt(p)} → ${pt(img[i])}`)], 2,
    ['Each corner ends up the same distance from the mirror line, on the other side.']);
}

function translate(rand: () => number): GeneratedQuestion {
  const tri: Pt[] = [];
  while (tri.length < 3) {
    const p: Pt = [ri(rand, -4, 1), ri(rand, -3, 2)];
    if (!tri.some((q) => q[0] === p[0] && q[1] === p[1])) tri.push(p);
  }
  if (area2(tri) < 6) return translate(rand);
  const dx = nz(rand, -2, 4), dy = nz(rand, -2, 3);
  const img = tri.map((p) => [p[0] + dx, p[1] + dy] as Pt);
  if (img.some((p) => Math.abs(p[0]) > 6 || Math.abs(p[1]) > 6)) return translate(rand);
  return P(`Translate the triangle (shown) by the vector **(${n(dx)}, ${n(dy)})** – that is ${Math.abs(dx)} ${dx > 0 ? 'right' : 'left'} and ${Math.abs(dy)} ${dy > 0 ? 'up' : 'down'}. Plot the three corners of the image.`, { x: [-6, 6], y: [-6, 6] },
    { points: img, given: tri.map((p) => ({ p })) },
    [`Add ${n(dx)} to every x and ${n(dy)} to every y.`, ...tri.map((p, i) => `${pt(p)} → ${pt(img[i])}`)], 2,
    ['The top number of the vector moves across, the bottom number moves up or down.']);
}

function scatterPlot(rand: () => number): GeneratedQuestion {
  const base = ri(rand, 2, 5);
  const rows = Array.from({ length: 4 }, (_, i) => [base + i * 2 + ri(rand, 0, 1), ri(rand, 2, 4) + i * 3] as Pt);
  if (new Set(rows.map((p) => p[0])).size < rows.length) return scatterPlot(rand);
  return P(`The table shows hours of revision and test scores: ${rows.map((p) => `${p[0]} h → ${p[1]}`).join('; ')}. **Plot these as a scatter graph.**`, { x: [0, 14], y: [0, 16], xl: 'Hours', yl: 'Score' }, { points: rows },
    ['Each row of the table is one point: (hours, score).', ...rows.map((p) => pt(p)), 'Do NOT join the points – that would not be a scatter graph.'], 1);
}

export const PLOT_GENERATORS: Generator[] = [
  G('pl-points', 'Plotting coordinates', (rr) => plotPoints(rr)),
  G('pl-table', 'Plotting a line from a table', (rr) => lineFromTable(rr)),
  G('pl-line', 'Drawing a straight line', (rr) => drawLine(rr)),
  G('pl-quad', 'Plotting a quadratic', (rr) => quadFromTable(rr)),
  G('pl-reflect', 'Reflections on a grid', (rr) => reflect(rr)),
  G('pl-translate', 'Translations on a grid', (rr) => translate(rr)),
  G('pl-scatter', 'Plotting a scatter graph', (rr) => scatterPlot(rr)),
];

export const PLOT_TOPICS: Record<string, string[]> = {
  'm-alg-graphs': ['pl-points', 'pl-table', 'pl-line'],
  'm-alg-quadratics': ['pl-quad'],
  'm-alg-graphs2': ['pl-quad'],
  'm-geo-transform': ['pl-reflect', 'pl-translate'],
  'm-stat-charts': ['pl-scatter'],
  'st-correlation': ['pl-scatter'],
};
