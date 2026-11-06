import { describe, expect, it } from 'vitest';
import { GENERATORS } from '../src/content/generators';
import { SUBJECTS, makeGenerated, topicQuestions } from '../src/content/registry';
import { mulberry32 } from '../src/lib/util';
import { checkNumber, checkText } from '../src/lib/answer';
import { equipmentFor, equipmentForQuestion } from '../src/lib/equipment';
import { FACT_TOPICS } from '../src/content/generators';
import { checkAlgebra, prettyExpr } from '../src/lib/algebra';
import { checkPlot } from '../src/components/PlotInput';

describe('fact-table and per-topic generators', () => {
  it('every generator (including per-topic timeline and quotation ones) makes valid, fair questions', () => {
    const ids = Object.keys(GENERATORS);
    expect(ids.filter((i) => i.startsWith('tl-')).length).toBeGreaterThan(30);
    expect(ids.filter((i) => i.startsWith('qt-')).length).toBeGreaterThan(30);
    for (const [id, g] of Object.entries(GENERATORS)) {
      if (!/^(f-|tl-|qt-|pm-|lo-|mm-|sb-|em-|vz-|al-|pl-|vb-)/.test(id)) continue;
      for (let seed = 1; seed <= 120; seed++) {
        const lvl = (seed % 5) + 1;
        const q = g.make(mulberry32(seed * 104729 + id.length), lvl);
        const ctx = `${id} seed ${seed}: ${q.q.slice(0, 80)}`;
        expect(q.q, ctx).not.toMatch(/undefined|\bNaN\b|\bnull\b|\[object/);
        expect(q.steps.length, ctx).toBeGreaterThan(0);
        q.steps.forEach((s) => expect(s, ctx).not.toMatch(/undefined|\bNaN\b/));
        if (q.options) {
          expect(q.options[0], ctx).toBe(String(q.answer));
          expect(q.options.length, ctx).toBeGreaterThanOrEqual(3);
          expect(new Set(q.options.map((o) => o.toLowerCase())).size, ctx).toBe(q.options.length);
          q.options.forEach((o) => expect(o, ctx).not.toMatch(/undefined|\bNaN\b/));
        }
        if (q.accept) expect(checkText(String(q.answer), q.accept, q.exact).ok, ctx).toBe(true);
        if (typeof q.answer === 'number' && !q.plot) expect(checkNumber(String(q.answer), q.answer, q.tol).ok, ctx).toBe(true);
        if (q.algebra) {
          // the answer key reads, marks itself right in the required form, and still marks right when shown back pretty
          expect(checkAlgebra(String(q.answer), String(q.answer), q.algebra.form).ok, ctx).toBe(true);
          expect(checkAlgebra(prettyExpr(String(q.answer)), String(q.answer), q.algebra.form).ok, ctx).toBe(true);
        }
        if (q.plot) {
          const g = q.plot.grid, inGrid = (p: [number, number]) => p[0] >= g.x[0] && p[0] <= g.x[1] && p[1] >= g.y[0] && p[1] <= g.y[1];
          if (q.plot.points) {
            q.plot.points.forEach((p) => expect(inGrid(p), `${ctx} ${p}`).toBe(true));
            expect(new Set(q.plot.points.map((p) => p.join())).size, ctx).toBe(q.plot.points.length);
            expect(checkPlot(q.plot, q.plot.points).ok, ctx).toBe(true);
            expect(checkPlot(q.plot, q.plot.points.slice(1)).ok, ctx).toBe(false);
          } else {
            const l = q.plot.line!;
            const on: [number, number][] = [];
            for (let x = g.x[0]; x <= g.x[1]; x++) { const y = l.m * x + l.c; if (Number.isInteger(y) && y >= g.y[0] && y <= g.y[1]) on.push([x, y]); }
            expect(on.length, ctx).toBeGreaterThanOrEqual(l.min ?? 2);
            expect(checkPlot(q.plot, on).ok, ctx).toBe(true);
          }
        }
        if (q.diagram) expect(q.diagram.alt.length, ctx).toBeGreaterThan(10);
        if (q.diagram) expect(JSON.stringify(q.diagram), ctx).not.toMatch(/NaN|null|undefined|Infinity/);
      }
    }
  });

  it('attaches generators to real topics, so nearly every knowledge topic now has fresh questions', () => {
    const topicIds = new Set(SUBJECTS.flatMap((s) => s.units.flatMap((u) => u.topics.map((t) => t.id))));
    for (const t of Object.keys(FACT_TOPICS)) expect(topicIds.has(t), t).toBe(true);
    for (const s of ['biology', 'chemistry', 'physics', 'history']) {
      const topics = SUBJECTS.find((x) => x.id === s)!.units.flatMap((u) => u.topics);
      const withGen = topics.filter((t) => (t.generators ?? []).length > 0).length;
      expect(withGen / topics.length, s).toBeGreaterThan(0.6);
    }
  });

  it('every Literature text, however short its notes, now has its own varied questions', () => {
    const lit = SUBJECTS.find((x) => x.id === 'english-literature')!;
    for (const u of lit.units) for (const t of u.topics.filter((x) => x.id.endsWith('-overview'))) {
      expect((t.generators ?? []).length, t.id).toBeGreaterThan(0);
    }
  });

  it('generated questions rebuild exactly from their snapshot (so mistakes on them can come back)', () => {
    for (const s of SUBJECTS) for (const u of s.units) for (const t of u.topics) {
      for (const g of (t.generators ?? []).filter((x) => /^(f-|tl-|qt-|pm-|lo-|mm-|sb-|em-|vz-|al-|pl-|vb-)/.test(x)).slice(0, 2)) {
        const a = makeGenerated({ g, s: 12345, l: 3, t: t.id });
        const b = makeGenerated({ g, s: 12345, l: 3, t: t.id });
        expect(a, `${t.id} ${g}`).toBeTruthy();
        expect(JSON.stringify(a)).toBe(JSON.stringify(b));
      }
    }
  });
});

describe('equipment for each question', () => {
  it('shows only the tools a question needs', () => {
    expect(equipmentFor('chemistry', 'Calculate the relative formula mass of CO₂.', { numeric: true })).toEqual(['tutor', 'calc', 'table', 'formula', 'working']);
    expect(equipmentFor('chemistry', 'What is meant by a fossil fuel?')).toEqual(['tutor']);
    expect(equipmentFor('chemistry', 'Which group is sodium in?')).toEqual(['tutor', 'table']);
    expect(equipmentFor('biology', 'What is the function of the mitochondria?')).toEqual(['tutor']);
    expect(equipmentFor('biology', 'Calculate the magnification of an image 25 mm long of a 0.05 mm cell.', { numeric: true })).toEqual(['tutor', 'calc', 'working']);
    expect(equipmentFor('maths', 'Find the area of a circle with radius 3 cm.', { numeric: true })).toEqual(['tutor', 'calc', 'formula', 'working']);
    expect(equipmentFor('maths', 'Simplify 3x + 2x')).toEqual(['tutor']);
    expect(equipmentFor('physics', 'What is the unit of power?')).toEqual(['tutor']);
    expect(equipmentFor('physics', 'Calculate the kinetic energy of a 2 kg ball moving at 3 m/s.', { numeric: true })).toEqual(['tutor', 'calc', 'formula', 'working']);
    expect(equipmentFor('english-literature', 'How does Shakespeare present guilt in Macbeth?')).toEqual(['tutor']);
    expect(equipmentFor('history', 'Explain why the Weimar Republic faced opposition in 1919-23.')).toEqual(['tutor']);
  });

  it('never gives a periodic table outside chemistry or a calculator to an essay subject', () => {
    for (const s of SUBJECTS) for (const u of s.units) for (const t of u.topics) for (const q of topicQuestions(t.id)) {
      const eq = equipmentForQuestion(q);
      if (s.id !== 'chemistry') expect(eq, q.id).not.toContain('table');
      if (['english-language', 'english-literature', 'history'].includes(s.id)) expect(eq, q.id).toEqual(['tutor']);
    }
  });
});

describe('generated multiple choice cannot be guessed from the length of the options', () => {
  it('the right answer is almost never much longer than every wrong option', () => {
    for (const [id, g] of Object.entries(GENERATORS)) {
      let n = 0, cued = 0;
      for (let seed = 1; seed <= 150; seed++) {
        const q = g.make(mulberry32(seed * 977 + 13), (seed % 5) + 1);
        if (!q.options) continue;
        n++;
        const longest = Math.max(...q.options.slice(1).map((o) => o.length));
        if (q.options[0].length > 25 && q.options[0].length > 1.5 * longest) cued++;
      }
      // poem, text and event titles are fixed real names, so a little more variation is unavoidable there
      if (n) expect(cued / n, id).toBeLessThanOrEqual(/^(pm|qt|tl|lo)-/.test(id) ? 0.06 : 0.02);
    }
  });
});

describe('answer options cannot be guessed from their look', () => {
  it('no authored multiple-choice question gives the answer away by length, and all have at least 3 options', () => {
    const bad: string[] = [];
    for (const s of SUBJECTS) for (const u of s.units) for (const t of u.topics) for (const q of topicQuestions(t.id)) {
      if (q.type !== 'mcq' || (q as { derived?: boolean }).derived) continue;
      const c = q.options[q.answer];
      const others = q.options.filter((_, i) => i !== q.answer);
      if (q.options.length < 3) bad.push(`${q.id}: only ${q.options.length} options`);
      if (c.length > 25 && c.length > 1.6 * Math.max(...others.map((o) => o.length))) bad.push(`${q.id}: correct answer much longer than the others`);
    }
    expect(bad).toEqual([]);
  });
});
