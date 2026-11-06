// A coordinate grid the student taps to plot points (tap a point again to remove it). After checking, the correct
// points are shown in green and any wrong ones in red. Points can also be typed, e.g. "(2, 3) (-1, 4)".
import { useRef, useState } from 'react';
import type { PlotQ, Pt } from '../content/types';
import { Axes, scaler } from './Diagram';
import { ptText, samePt } from '../lib/plot';

export { checkPlot, ptText } from '../lib/plot';
const same = samePt;

export function PlotInput({ item, value, onChange, answered, wrong }: { item: PlotQ; value: Pt[]; onChange: (v: Pt[]) => void; answered: boolean; wrong: Pt[] }) {
  const g = item.grid;
  const snap = g.snap ?? 1;
  const { sx, sy, ix, iy, w, h } = scaler(g.x, g.y);
  const svg = useRef<SVGSVGElement>(null);
  const [typed, setTyped] = useState('');
  // a grid line at every point you can plot (numbers are thinned out automatically on long axes)
  const stepOf = (r: [number, number]) => (r[1] - r[0] > 30 ? 5 : snap);

  const tap = (e: React.PointerEvent<SVGSVGElement>) => {
    if (answered || !svg.current) return;
    const r = svg.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * w, py = ((e.clientY - r.top) / r.height) * h;
    const x = Math.round(ix(px) / snap) * snap, y = Math.round(iy(py) / snap) * snap;
    if (x < g.x[0] - 1e-9 || x > g.x[1] + 1e-9 || y < g.y[0] - 1e-9 || y > g.y[1] + 1e-9) return;
    const p: Pt = [Math.round(x * 1e6) / 1e6, Math.round(y * 1e6) / 1e6];
    onChange(value.some((q) => same(q, p)) ? value.filter((q) => !same(q, p)) : [...value, p]);
  };
  const addTyped = () => {
    const pts = [...typed.replace(/−/g, '-').matchAll(/\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?/g)].map((m) => [Number(m[1]), Number(m[2])] as Pt);
    if (pts.length) { onChange([...value, ...pts.filter((p) => !value.some((q) => same(p, q)))]); setTyped(''); }
  };
  const expected: Pt[] = answered ? (item.points ?? []) : [];

  return (
    <div className="plot">
      <svg ref={svg} viewBox={`0 0 ${w} ${h}`} className={`dg-svg plot-svg${answered ? '' : ' live'}`} onPointerDown={tap} role="application" aria-label={`Grid from x = ${g.x[0]} to ${g.x[1]} and y = ${g.y[0]} to ${g.y[1]}. Tap to plot a point.`}>
        <Axes x={g.x} y={g.y} stepX={stepOf(g.x)} stepY={stepOf(g.y)} xl={g.xl ?? 'x'} yl={g.yl ?? 'y'} />
        {item.given && item.given.length >= 3 && <polygon points={item.given.map((gp) => `${sx(gp.p[0])},${sy(gp.p[1])}`).join(' ')} className="dg-shape fill" />}
        {answered && item.given && item.given.length >= 3 && item.points && <polygon points={item.points.map((p) => `${sx(p[0])},${sy(p[1])}`).join(' ')} className="plot-image" />}
        {item.given?.map((gp, i) => <g key={`g${i}`}><circle cx={sx(gp.p[0])} cy={sy(gp.p[1])} r={4} className="dg-dot given" />{gp.label && <text x={sx(gp.p[0]) + 6} y={sy(gp.p[1]) - 6} className="dg-text">{gp.label}</text>}</g>)}
        {answered && item.line && <line x1={sx(g.x[0])} y1={sy(item.line.m * g.x[0] + item.line.c)} x2={sx(g.x[1])} y2={sy(item.line.m * g.x[1] + item.line.c)} className="dg-plot ok" />}
        {expected.map((p, i) => <circle key={`e${i}`} cx={sx(p[0])} cy={sy(p[1])} r={7} className="plot-expected" />)}
        {value.map((p, i) => {
          const bad = answered && wrong.some((q) => same(p, q));
          return <g key={`v${i}`}><line x1={sx(p[0]) - 5} y1={sy(p[1]) - 5} x2={sx(p[0]) + 5} y2={sy(p[1]) + 5} className={`plot-x${bad ? ' bad' : ''}`} /><line x1={sx(p[0]) - 5} y1={sy(p[1]) + 5} x2={sx(p[0]) + 5} y2={sy(p[1]) - 5} className={`plot-x${bad ? ' bad' : ''}`} /></g>;
        })}
      </svg>
      <div className="row gap wrap small plot-bar">
        <span className="muted">{value.length ? `Plotted: ${value.map(ptText).join(' ')}` : 'Tap the grid to plot a point. Tap it again to remove it.'}</span>
        {!answered && value.length > 0 && <button className="btn small ghost" onClick={() => onChange(value.slice(0, -1))}>Undo</button>}
      </div>
      {!answered && (
        <div className="row gap plot-type">
          <input className="answer-input small" value={typed} onChange={(e) => setTyped(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') addTyped(); }} placeholder="Or type points, e.g. (2, 3) (-1, 4)" aria-label="Type coordinates" autoComplete="off" spellCheck={false} />
          <button className="btn small" onClick={addTyped} disabled={!typed.trim()}>Add</button>
        </div>
      )}
    </div>
  );
}
