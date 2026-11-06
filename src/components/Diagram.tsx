// Draws a question's diagram as SVG: geometry (angles, triangles, circles), bar and pie charts, histograms, box plots
// and graphs. Colours come from the theme, so diagrams work in light and dark mode. Every diagram has alt text.
import { useId } from 'react';
import type { Diagram, GeoShape, Pt } from '../content/types';

const W = 340, H = 260, M = { l: 40, r: 14, t: 28, b: 36 };
const fmt = (n: number) => (Math.abs(n - Math.round(n)) < 1e-9 ? String(Math.round(n)) : String(Math.round(n * 100) / 100)).replace('-', '−');

/** maps data coordinates to the plotting area */
export function scaler(x: [number, number], y: [number, number], w = W, h = H) {
  const sx = (v: number) => M.l + ((v - x[0]) / (x[1] - x[0])) * (w - M.l - M.r);
  const sy = (v: number) => h - M.b - ((v - y[0]) / (y[1] - y[0])) * (h - M.t - M.b);
  const ix = (px: number) => x[0] + ((px - M.l) / (w - M.l - M.r)) * (x[1] - x[0]);
  const iy = (py: number) => y[0] + ((h - M.b - py) / (h - M.t - M.b)) * (y[1] - y[0]);
  return { sx, sy, ix, iy, w, h };
}

/** Axes with a light grid, numbered ticks and labels */
export function Axes({ x, y, xl, yl, stepX, stepY, noXTicks }: { x: [number, number]; y: [number, number]; xl?: string; yl?: string; stepX: number; stepY: number; noXTicks?: boolean }) {
  const { sx, sy } = scaler(x, y);
  const xs: number[] = [], ys: number[] = [];
  for (let v = Math.ceil(x[0] / stepX) * stepX; v <= x[1] + 1e-9; v += stepX) xs.push(Math.round(v * 1e6) / 1e6);
  for (let v = Math.ceil(y[0] / stepY) * stepY; v <= y[1] + 1e-9; v += stepY) ys.push(Math.round(v * 1e6) / 1e6);
  const labelEvery = (n: number) => Math.max(1, Math.ceil(n / 12));
  const ax = x[0] <= 0 && x[1] >= 0 ? sx(0) : sx(x[0]);
  const ay = y[0] <= 0 && y[1] >= 0 ? sy(0) : sy(y[0]);
  return (
    <g>
      {xs.map((v) => <line key={`gx${v}`} x1={sx(v)} x2={sx(v)} y1={sy(y[0])} y2={sy(y[1])} className="dg-grid" />)}
      {ys.map((v) => <line key={`gy${v}`} y1={sy(v)} y2={sy(v)} x1={sx(x[0])} x2={sx(x[1])} className="dg-grid" />)}
      <line x1={sx(x[0])} x2={sx(x[1])} y1={ay} y2={ay} className="dg-axis" />
      <line y1={sy(y[0])} y2={sy(y[1])} x1={ax} x2={ax} className="dg-axis" />
      {!noXTicks && xs.filter((_, i) => i % labelEvery(xs.length) === 0).map((v) => <text key={`tx${v}`} x={sx(v)} y={ay + 13} className="dg-tick" textAnchor="middle">{fmt(v)}</text>)}
      {ys.filter((_, i) => i % labelEvery(ys.length) === 0).map((v) => (v === 0 && x[0] <= 0 && x[1] >= 0 ? null : <text key={`ty${v}`} x={ax - 5} y={sy(v) + 4} className="dg-tick" textAnchor="end">{fmt(v)}</text>))}
      {xl && <text x={sx(x[1])} y={H - 4} className="dg-label" textAnchor="end">{xl}</text>}
      {yl && <text x={4} y={14} className="dg-label">{yl}</text>}
    </g>
  );
}

const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
const len = (v: Pt) => Math.hypot(v[0], v[1]) || 1;
const unit = (v: Pt): Pt => [v[0] / len(v), v[1] / len(v)];

function Geo({ w, h, shapes }: { w: number; h: number; shapes: GeoShape[] }) {
  const centroid: Pt = (() => {
    const pts = shapes.flatMap((s) => (s.t === 'poly' ? s.pts : []));
    return pts.length ? [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length] : [w / 2, h / 2];
  })();
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="dg-svg" aria-hidden="true">
      {shapes.map((s, i) => {
        switch (s.t) {
          case 'poly': return <polygon key={i} points={s.pts.map((p) => p.join(',')).join(' ')} className={s.fill ? 'dg-shape fill' : 'dg-shape'} />;
          case 'line': return <line key={i} x1={s.a[0]} y1={s.a[1]} x2={s.b[0]} y2={s.b[1]} className={`dg-line${s.dash ? ' dash' : ''}${s.thin ? ' thin' : ''}`} />;
          case 'circle': return <circle key={i} cx={s.c[0]} cy={s.c[1]} r={s.r} className="dg-shape" />;
          case 'dot': {
            const off: Record<string, Pt> = { n: [0, -9], s: [0, 16], e: [9, 4], w: [-9, 4], ne: [8, -7], nw: [-8, -7], se: [8, 15], sw: [-8, 15] };
            const o = off[s.at ?? 'n'];
            const anchor = (s.at ?? 'n').includes('e') ? 'start' : (s.at ?? 'n').includes('w') ? 'end' : 'middle';
            return <g key={i}><circle cx={s.p[0]} cy={s.p[1]} r={2.6} className="dg-dot" />{s.label && <text x={s.p[0] + o[0]} y={s.p[1] + o[1]} className="dg-text" textAnchor={anchor}>{s.label}</text>}</g>;
          }
          case 'text': return <text key={i} x={s.p[0]} y={s.p[1]} className="dg-text" fontSize={s.size ?? 13} textAnchor="middle">{s.s}</text>;
          case 'angle': {
            const r = s.r ?? 22;
            const u1 = unit(sub(s.from, s.at)), u2 = unit(sub(s.to, s.at));
            const p1: Pt = [s.at[0] + u1[0] * r, s.at[1] + u1[1] * r], p2: Pt = [s.at[0] + u2[0] * r, s.at[1] + u2[1] * r];
            const cross = u1[0] * u2[1] - u1[1] * u2[0];
            const ang = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1])));
            const mid = unit([u1[0] + u2[0], u1[1] + u2[1]]);
            const lr = r + 13 + (ang < 0.6 ? 10 : 0);
            return (
              <g key={i}>
                <path d={`M ${p1[0]} ${p1[1]} A ${r} ${r} 0 0 ${cross > 0 ? 1 : 0} ${p2[0]} ${p2[1]}`} className="dg-arc" />
                {s.label && <text x={s.at[0] + mid[0] * lr} y={s.at[1] + mid[1] * lr + 4} className="dg-text angle" textAnchor="middle">{s.label}</text>}
              </g>
            );
          }
          case 'right': {
            const k = 11, u1 = unit(sub(s.from, s.at)), u2 = unit(sub(s.to, s.at));
            const a: Pt = [s.at[0] + u1[0] * k, s.at[1] + u1[1] * k], c: Pt = [s.at[0] + u2[0] * k, s.at[1] + u2[1] * k];
            const b: Pt = [a[0] + u2[0] * k, a[1] + u2[1] * k];
            return <polyline key={i} points={`${a.join(',')} ${b.join(',')} ${c.join(',')}`} className="dg-arc" />;
          }
          case 'ticks': case 'arrows': {
            const n = s.n ?? 1, m: Pt = [(s.a[0] + s.b[0]) / 2, (s.a[1] + s.b[1]) / 2], u = unit(sub(s.b, s.a)), nrm: Pt = [-u[1], u[0]];
            return (
              <g key={i}>
                {Array.from({ length: n }, (_, j) => {
                  const off = (j - (n - 1) / 2) * 6;
                  const c: Pt = [m[0] + u[0] * off, m[1] + u[1] * off];
                  if (s.t === 'ticks') return <line key={j} x1={c[0] + nrm[0] * 6} y1={c[1] + nrm[1] * 6} x2={c[0] - nrm[0] * 6} y2={c[1] - nrm[1] * 6} className="dg-line" />;
                  return <polyline key={j} points={`${c[0] - u[0] * 6 + nrm[0] * 5},${c[1] - u[1] * 6 + nrm[1] * 5} ${c[0]},${c[1]} ${c[0] - u[0] * 6 - nrm[0] * 5},${c[1] - u[1] * 6 - nrm[1] * 5}`} className="dg-line" fill="none" />;
                })}
              </g>
            );
          }
          case 'side': {
            const m: Pt = [(s.a[0] + s.b[0]) / 2, (s.a[1] + s.b[1]) / 2], u = unit(sub(s.b, s.a));
            let nrm: Pt = [-u[1], u[0]];
            // put the label on the outside of the shape unless told otherwise
            const toC = sub(centroid, m);
            if ((s.side ?? 0) === 0 ? nrm[0] * toC[0] + nrm[1] * toC[1] > 0 : s.side === -1) nrm = [-nrm[0], -nrm[1]];
            const anchor = nrm[0] > 0.6 ? 'start' : nrm[0] < -0.6 ? 'end' : 'middle';
            const gap = anchor === 'middle' ? 14 : 8;
            return <text key={i} x={m[0] + nrm[0] * gap} y={m[1] + nrm[1] * gap + 4} className="dg-text" textAnchor={anchor}>{s.s}</text>;
          }
        }
        return null;
      })}
    </svg>
  );
}

function Graph({ d }: { d: Extract<Diagram, { kind: 'graph' }> }) {
  const { sx, sy } = scaler([d.x[0], d.x[1]], [d.y[0], d.y[1]]);
  const clipId = `clip${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const curve = (f: (x: number) => number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) { const x = d.x[0] + ((d.x[1] - d.x[0]) * i) / 120; pts.push(`${sx(x)},${sy(f(x))}`); }
    return pts.join(' ');
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="dg-svg" aria-hidden="true">
      <defs><clipPath id={clipId}><rect x={sx(d.x[0])} y={sy(d.y[1])} width={sx(d.x[1]) - sx(d.x[0])} height={sy(d.y[0]) - sy(d.y[1])} /></clipPath></defs>
      <Axes x={[d.x[0], d.x[1]]} y={[d.y[0], d.y[1]]} stepX={d.x[2]} stepY={d.y[2]} xl={d.xl} yl={d.yl} />
      <g clipPath={`url(#${clipId})`}>
        {d.lines?.map((l, i) => <polyline key={`l${i}`} points={curve((x) => l.m * x + l.c)} className="dg-plot" />)}
        {d.quads?.map((q, i) => <polyline key={`q${i}`} points={curve((x) => q.a * x * x + q.b * x + q.c)} className="dg-plot" />)}
        {d.poly && <polyline points={d.poly.map((p) => `${sx(p[0])},${sy(p[1])}`).join(' ')} className="dg-plot" />}
      </g>
      {d.lines?.map((l, i) => l.label && <text key={`ll${i}`} x={sx(d.x[1]) - 4} y={sy(Math.max(d.y[0], Math.min(d.y[1], l.m * d.x[1] + l.c))) - 6} className="dg-text" textAnchor="end">{l.label}</text>)}
      {d.points?.map((pt, i) => <g key={`p${i}`}><circle cx={sx(pt.p[0])} cy={sy(pt.p[1])} r={3.4} className="dg-dot" />{pt.label && <text x={sx(pt.p[0]) + 6} y={sy(pt.p[1]) - 6} className="dg-text">{pt.label}</text>}</g>)}
    </svg>
  );
}

function Bars({ d }: { d: Extract<Diagram, { kind: 'bar' }> }) {
  const max = Math.max(...d.values);
  const step = d.step ?? (max <= 10 ? 1 : max <= 20 ? 2 : max <= 50 ? 5 : max <= 100 ? 10 : 20);
  const top = Math.ceil(max / step) * step;
  const { sx, sy } = scaler([0, d.labels.length], [0, top]);
  const bw = (sx(1) - sx(0)) * 0.62;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="dg-svg" aria-hidden="true">
      <Axes x={[0, d.labels.length]} y={[0, top]} stepX={d.labels.length} stepY={step} yl={d.y} noXTicks />
      {d.values.map((v, i) => <rect key={i} x={sx(i + 0.5) - bw / 2} y={sy(v)} width={bw} height={sy(0) - sy(v)} className="dg-bar" />)}
      {d.labels.map((l, i) => <text key={`l${i}`} x={sx(i + 0.5)} y={sy(0) + 14} className="dg-tick" textAnchor="middle">{l}</text>)}
      {d.x && <text x={W - M.r} y={H - 4} className="dg-label" textAnchor="end">{d.x}</text>}
    </svg>
  );
}

function Histogram({ d }: { d: Extract<Diagram, { kind: 'histogram' }> }) {
  const lo = d.bounds[0], hi = d.bounds[d.bounds.length - 1];
  const max = Math.max(...d.fd);
  const step = max <= 2 ? 0.2 : max <= 5 ? 0.5 : max <= 10 ? 1 : max <= 20 ? 2 : 5;
  const top = Math.ceil(max / step) * step;
  const span = hi - lo;
  const xStep = span <= 20 ? 2 : span <= 50 ? 5 : span <= 100 ? 10 : 20;
  const { sx, sy } = scaler([lo, hi], [0, top]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="dg-svg" aria-hidden="true">
      <Axes x={[lo, hi]} y={[0, top]} stepX={xStep} stepY={step} yl="Frequency density" xl={d.x} />
      {d.fd.map((f, i) => <rect key={i} x={sx(d.bounds[i])} y={sy(f)} width={sx(d.bounds[i + 1]) - sx(d.bounds[i])} height={sy(0) - sy(f)} className="dg-bar" />)}
    </svg>
  );
}

function Boxes({ d }: { d: Extract<Diagram, { kind: 'boxplot' }> }) {
  const n = d.boxes.length;
  const { sx } = scaler([d.axis[0], d.axis[1]], [0, 1]);
  const rowH = (H - M.t - M.b) / n;
  const ticks: number[] = [];
  for (let v = d.axis[0]; v <= d.axis[1] + 1e-9; v += d.axis[2]) ticks.push(Math.round(v * 1e6) / 1e6);
  const base = H - M.b;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="dg-svg" aria-hidden="true">
      {ticks.map((v) => <line key={`g${v}`} x1={sx(v)} x2={sx(v)} y1={M.t} y2={base} className="dg-grid" />)}
      <line x1={sx(d.axis[0])} x2={sx(d.axis[1])} y1={base} y2={base} className="dg-axis" />
      {ticks.map((v, i) => (i % Math.max(1, Math.ceil(ticks.length / 12)) === 0 ? <text key={`t${v}`} x={sx(v)} y={base + 14} className="dg-tick" textAnchor="middle">{fmt(v)}</text> : null))}
      {d.x && <text x={W - M.r} y={H - 4} className="dg-label" textAnchor="end">{d.x}</text>}
      {d.boxes.map((b, i) => {
        const cy = M.t + rowH * (i + 0.5), bh = Math.min(34, rowH * 0.5);
        const [mn, q1, md, q3, mx] = b.v;
        return (
          <g key={i}>
            {b.label && <text x={4} y={cy - bh / 2 - 4} className="dg-text">{b.label}</text>}
            <line x1={sx(mn)} x2={sx(q1)} y1={cy} y2={cy} className="dg-line" />
            <line x1={sx(q3)} x2={sx(mx)} y1={cy} y2={cy} className="dg-line" />
            <line x1={sx(mn)} x2={sx(mn)} y1={cy - bh / 3} y2={cy + bh / 3} className="dg-line" />
            <line x1={sx(mx)} x2={sx(mx)} y1={cy - bh / 3} y2={cy + bh / 3} className="dg-line" />
            <rect x={sx(q1)} y={cy - bh / 2} width={sx(q3) - sx(q1)} height={bh} className="dg-box" />
            <line x1={sx(md)} x2={sx(md)} y1={cy - bh / 2} y2={cy + bh / 2} className="dg-line strong" />
          </g>
        );
      })}
    </svg>
  );
}

function Pie({ d }: { d: Extract<Diagram, { kind: 'pie' }> }) {
  const total = d.values.reduce((a, b) => a + b, 0);
  const cx = 120, cy = H / 2, r = 100;
  let a0 = -Math.PI / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="dg-svg" aria-hidden="true">
      {d.values.map((v, i) => {
        const a1 = a0 + (v / total) * Math.PI * 2;
        const p0: Pt = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1: Pt = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
        const mid = (a0 + a1) / 2;
        const deg = Math.round((v / total) * 360);
        const el = (
          <g key={i}>
            <path d={`M ${cx} ${cy} L ${p0[0]} ${p0[1]} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p1[0]} ${p1[1]} Z`} className={`dg-slice s${i % 6}`} />
            {d.angles && <text x={cx + r * 0.62 * Math.cos(mid)} y={cy + r * 0.62 * Math.sin(mid) + 4} className="dg-text" textAnchor="middle">{deg}°</text>}
          </g>
        );
        a0 = a1;
        return el;
      })}
      {d.labels.map((l, i) => <g key={`k${i}`}><rect x={238} y={30 + i * 22} width={12} height={12} className={`dg-slice s${i % 6}`} /><text x={256} y={41 + i * 22} className="dg-text">{l}</text></g>)}
    </svg>
  );
}

export function DiagramView({ d }: { d: Diagram }) {
  return (
    <figure className="diagram" role="img" aria-label={d.alt}>
      {d.kind === 'geo' && <Geo w={d.w} h={d.h} shapes={d.shapes} />}
      {d.kind === 'graph' && <Graph d={d} />}
      {d.kind === 'bar' && <Bars d={d} />}
      {d.kind === 'histogram' && <Histogram d={d} />}
      {d.kind === 'boxplot' && <Boxes d={d} />}
      {d.kind === 'pie' && <Pie d={d} />}
      <figcaption className="sr-only">{d.alt}</figcaption>
      {d.kind === 'geo' && <span className="muted small dg-note">Diagram not accurately drawn</span>}
    </figure>
  );
}
