// Marking for plotting questions (shared by practice and mock exams).
import type { PlotQ, Pt } from '../content/types';

const fmt = (n: number) => String(Math.round(n * 100) / 100).replace('-', '−');
export const ptText = (p: Pt) => `(${fmt(p[0])}, ${fmt(p[1])})`;
export const samePt = (a: Pt, b: Pt) => Math.abs(a[0] - b[0]) < 1e-6 && Math.abs(a[1] - b[1]) < 1e-6;

export interface PlotMark { ok: boolean; detail?: string; wrong: Pt[]; right: number; need: number }

/** Mark a set of plotted points */
export function checkPlot(item: Pick<PlotQ, 'points' | 'line'>, plotted: Pt[]): PlotMark {
  if (item.points) {
    const missing = item.points.filter((p) => !plotted.some((q) => samePt(p, q)));
    const wrong = plotted.filter((q) => !item.points!.some((p) => samePt(p, q)));
    const ok = !missing.length && !wrong.length;
    const right = item.points.length - missing.length;
    return { ok, wrong, right, need: item.points.length, detail: ok ? undefined : `${right} of ${item.points.length} points right${wrong.length ? `; ${wrong.length} point${wrong.length === 1 ? ' is' : 's are'} in the wrong place` : ''}.` };
  }
  const l = item.line!;
  const on = (p: Pt) => Math.abs(l.m * p[0] + l.c - p[1]) < 1e-6;
  const wrong = plotted.filter((p) => !on(p));
  const good = plotted.filter(on).length;
  const need = l.min ?? 2;
  const ok = !wrong.length && good >= need;
  return { ok, wrong, right: Math.min(good, need), need, detail: ok ? undefined : wrong.length ? `${wrong.length} of your points ${wrong.length === 1 ? 'is' : 'are'} not on the line.` : `Plot at least ${need} points on the line.` };
}
