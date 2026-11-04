import type { Generator, GeneratedQuestion } from '../types';
import { ri, pk, r, f, sf, comma } from './helpers';

const G = (id: string, title: string, make: Generator['make'], tier?: Generator['tier']): Generator => ({ id, title, make, tier });

/** Generic "equation" question: pick which variable to find */
function eq(
  rand: () => number,
  spec: { name: string; eq: string; vars: { sym: string; name: string; unit: string; val: number }[]; solve: Record<string, (v: Record<string, number>) => number>; rearr: Record<string, string>; dp?: number; context?: string; hint?: string },
  lvl: number,
): GeneratedQuestion {
  // level 1-2: find the subject of the equation; level 3+: rearrange
  const subject = spec.vars[0].sym;
  const target = lvl <= 2 ? subject : pk(rand, spec.vars.map((v) => v.sym));
  const vals = Object.fromEntries(spec.vars.map((v) => [v.sym, v.val]));
  const ans = spec.solve[target](vals);
  const tv = spec.vars.find((v) => v.sym === target)!;
  const given = spec.vars.filter((v) => v.sym !== target).map((v) => `${v.name} = ${f(v.val, 4)} ${v.unit}`).join(', ');
  const dp = spec.dp ?? 2;
  return {
    q: `${spec.context ? spec.context + ' ' : ''}${given}. Calculate the **${tv.name}**${dp < 3 ? ` (to ${dp} dp if needed)` : ''}.`,
    answer: r(ans, dp), unit: tv.unit, tol: Math.max(Math.abs(ans) * 0.005, 0.5 * 10 ** -dp + 1e-9),
    steps: [`Equation: ${spec.eq}`, target === subject ? 'Substitute the values.' : `Rearrange: ${spec.rearr[target]}`, `${tv.sym} = ${f(ans, 4)} ${tv.unit}`],
    hints: [spec.hint ?? 'Write the equation, list the values with units, then substitute.', target === subject ? 'Just substitute.' : `Rearrange to make ${tv.sym} the subject: ${spec.rearr[target]}`],
    d: target === subject ? 2 : 3,
  };
}

export const SCIENCE_GENERATORS: Generator[] = [
  // ---------------- PHYSICS ----------------
  G('p-ke', 'Kinetic energy', (rand, lvl) => {
    const m = pk(rand, [0.5, 2, 5, 60, 70, 800, 1200, 0.15]), v = ri(rand, 2, 30);
    return eq(rand, { name: 'KE', eq: 'Eₖ = ½mv²', vars: [{ sym: 'Eₖ', name: 'kinetic energy', unit: 'J', val: 0.5 * m * v * v }, { sym: 'm', name: 'mass', unit: 'kg', val: m }, { sym: 'v', name: 'speed', unit: 'm/s', val: v }], solve: { 'Eₖ': (x) => 0.5 * x.m * x.v ** 2, m: (x) => (2 * x['Eₖ']) / x.v ** 2, v: (x) => Math.sqrt((2 * x['Eₖ']) / x.m) }, rearr: { m: 'm = 2Eₖ ÷ v²', v: 'v = √(2Eₖ ÷ m)' }, hint: 'Square the speed FIRST, then multiply by ½ and m.' }, lvl);
  }),
  G('p-gpe', 'Gravitational potential energy', (rand, lvl) => {
    const m = pk(rand, [0.2, 1.5, 2, 45, 60, 75]), h = ri(rand, 2, 80);
    return eq(rand, { name: 'GPE', eq: 'Eₚ = mgh (g = 9.8 N/kg)', vars: [{ sym: 'Eₚ', name: 'gravitational potential energy gained', unit: 'J', val: m * 9.8 * h }, { sym: 'm', name: 'mass', unit: 'kg', val: m }, { sym: 'h', name: 'height', unit: 'm', val: h }], solve: { 'Eₚ': (x) => x.m * 9.8 * x.h, m: (x) => x['Eₚ'] / (9.8 * x.h), h: (x) => x['Eₚ'] / (9.8 * x.m) }, rearr: { m: 'm = Eₚ ÷ (gh)', h: 'h = Eₚ ÷ (mg)' }, context: 'Use g = 9.8 N/kg.' }, lvl);
  }),
  G('p-power', 'Power (energy ÷ time)', (rand, lvl) => {
    const P = pk(rand, [20, 60, 100, 500, 1200, 2000, 3000]), t = ri(rand, 5, 300);
    return eq(rand, { name: 'Power', eq: 'P = E ÷ t', vars: [{ sym: 'P', name: 'power', unit: 'W', val: P }, { sym: 'E', name: 'energy transferred', unit: 'J', val: P * t }, { sym: 't', name: 'time', unit: 's', val: t }], solve: { P: (x) => x.E / x.t, E: (x) => x.P * x.t, t: (x) => x.E / x.P }, rearr: { E: 'E = P × t', t: 't = E ÷ P' }, hint: 'Time must be in seconds.' }, lvl);
  }),
  G('p-efficiency', 'Efficiency', (rand) => {
    const total = ri(rand, 2, 40) * 50, eff = pk(rand, [0.2, 0.25, 0.35, 0.4, 0.6, 0.75, 0.8, 0.9]);
    const useful = total * eff;
    if (rand() < 0.5) return { q: `A device has a total energy input of **${total} J** and a useful output of **${useful} J**. Calculate its efficiency as a percentage.`, answer: r(eff * 100, 1), unit: '%', steps: ['Efficiency = useful output ÷ total input', `= ${useful} ÷ ${total} = ${eff}`, `× 100 = ${r(eff * 100, 1)}%`], hints: ['Useful ÷ total - the answer can never be more than 1 (100%).'], d: 2 };
    return { q: `A motor is **${eff * 100}%** efficient. The total input is **${total} J**. How much energy is **wasted**?`, answer: r(total - useful, 2), unit: 'J', steps: [`Useful = ${eff} × ${total} = ${useful} J`, `Wasted = ${total} − ${useful} = ${total - useful} J`], d: 3 };
  }),
  G('p-charge', 'Charge, current & time', (rand, lvl) => {
    const I = pk(rand, [0.2, 0.5, 1.5, 2, 3, 5, 13]), t = ri(rand, 5, 600);
    return eq(rand, { name: 'Charge', eq: 'Q = I × t', vars: [{ sym: 'Q', name: 'charge', unit: 'C', val: I * t }, { sym: 'I', name: 'current', unit: 'A', val: I }, { sym: 't', name: 'time', unit: 's', val: t }], solve: { Q: (x) => x.I * x.t, I: (x) => x.Q / x.t, t: (x) => x.Q / x.I }, rearr: { I: 'I = Q ÷ t', t: 't = Q ÷ I' } }, lvl);
  }),
  G('p-ohm', 'V = IR', (rand, lvl) => {
    const I = pk(rand, [0.1, 0.25, 0.5, 1.2, 2, 3, 4]), R = pk(rand, [2, 4, 5, 6, 10, 12, 20, 47, 100]);
    return eq(rand, { name: 'Ohm', eq: 'V = I × R', vars: [{ sym: 'V', name: 'potential difference', unit: 'V', val: I * R }, { sym: 'I', name: 'current', unit: 'A', val: I }, { sym: 'R', name: 'resistance', unit: 'Ω', val: R }], solve: { V: (x) => x.I * x.R, I: (x) => x.V / x.R, R: (x) => x.V / x.I }, rearr: { I: 'I = V ÷ R', R: 'R = V ÷ I' } }, lvl);
  }),
  G('p-elec-power', 'Electrical power', (rand, lvl) => {
    const I = pk(rand, [0.5, 1, 2, 3, 5, 10, 13]), V = pk(rand, [3, 6, 9, 12, 230]), R = pk(rand, [2, 4, 5, 10, 20]);
    if (rand() < 0.5) return eq(rand, { name: 'P=IV', eq: 'P = I × V', vars: [{ sym: 'P', name: 'power', unit: 'W', val: I * V }, { sym: 'I', name: 'current', unit: 'A', val: I }, { sym: 'V', name: 'potential difference', unit: 'V', val: V }], solve: { P: (x) => x.I * x.V, I: (x) => x.P / x.V, V: (x) => x.P / x.I }, rearr: { I: 'I = P ÷ V', V: 'V = P ÷ I' } }, lvl);
    return eq(rand, { name: 'P=I²R', eq: 'P = I² × R', vars: [{ sym: 'P', name: 'power', unit: 'W', val: I * I * R }, { sym: 'I', name: 'current', unit: 'A', val: I }, { sym: 'R', name: 'resistance', unit: 'Ω', val: R }], solve: { P: (x) => x.I ** 2 * x.R, I: (x) => Math.sqrt(x.P / x.R), R: (x) => x.P / x.I ** 2 }, rearr: { I: 'I = √(P ÷ R)', R: 'R = P ÷ I²' }, hint: 'Square the current before multiplying.' }, lvl);
  }),
  G('p-energy-elec', 'Energy transferred (E = Pt, E = QV)', (rand, lvl) => {
    if (rand() < 0.5) {
      const P = pk(rand, [60, 100, 500, 1000, 2000, 2500]), mins = ri(rand, 1, 30);
      return { q: `A **${P} W** kettle is used for **${mins} minutes**. How much energy is transferred in joules?`, answer: P * mins * 60, unit: 'J', steps: [`Convert time: ${mins} min × 60 = ${mins * 60} s`, `E = P × t = ${P} × ${mins * 60} = ${comma(P * mins * 60)} J`], hints: ['Minutes → seconds first (× 60).'], d: 2 };
    }
    const Q = ri(rand, 2, 60) * 5, V = pk(rand, [1.5, 3, 6, 9, 12, 230]);
    return eq(rand, { name: 'E=QV', eq: 'E = Q × V', vars: [{ sym: 'E', name: 'energy transferred', unit: 'J', val: Q * V }, { sym: 'Q', name: 'charge', unit: 'C', val: Q }, { sym: 'V', name: 'potential difference', unit: 'V', val: V }], solve: { E: (x) => x.Q * x.V, Q: (x) => x.E / x.V, V: (x) => x.E / x.Q }, rearr: { Q: 'Q = E ÷ V', V: 'V = E ÷ Q' } }, lvl);
  }),
  G('p-density', 'Density', (rand, lvl) => {
    const rho = pk(rand, [1000, 2700, 7800, 8900, 920, 1.2, 19300]), V = pk(rand, [0.001, 0.002, 0.005, 0.02, 0.5, 2]);
    return eq(rand, { name: 'Density', eq: 'ρ = m ÷ V', vars: [{ sym: 'ρ', name: 'density', unit: 'kg/m³', val: rho }, { sym: 'm', name: 'mass', unit: 'kg', val: rho * V }, { sym: 'V', name: 'volume', unit: 'm³', val: V }], solve: { 'ρ': (x) => x.m / x.V, m: (x) => x['ρ'] * x.V, V: (x) => x.m / x['ρ'] }, rearr: { m: 'm = ρ × V', V: 'V = m ÷ ρ' }, dp: 4 }, lvl);
  }),
  G('p-shc', 'Specific heat capacity', (rand, lvl) => {
    const m = pk(rand, [0.2, 0.5, 1, 2, 2.5]), c = pk(rand, [4200, 900, 380, 2100, 450]), dT = ri(rand, 5, 60);
    return eq(rand, { name: 'SHC', eq: 'ΔE = m × c × Δθ', vars: [{ sym: 'ΔE', name: 'energy needed', unit: 'J', val: m * c * dT }, { sym: 'm', name: 'mass', unit: 'kg', val: m }, { sym: 'c', name: 'specific heat capacity', unit: 'J/kg°C', val: c }, { sym: 'Δθ', name: 'temperature change', unit: '°C', val: dT }], solve: { 'ΔE': (x) => x.m * x.c * x['Δθ'], m: (x) => x['ΔE'] / (x.c * x['Δθ']), c: (x) => x['ΔE'] / (x.m * x['Δθ']), 'Δθ': (x) => x['ΔE'] / (x.m * x.c) }, rearr: { m: 'm = ΔE ÷ (cΔθ)', c: 'c = ΔE ÷ (mΔθ)', 'Δθ': 'Δθ = ΔE ÷ (mc)' } }, lvl);
  }),
  G('p-latent', 'Specific latent heat', (rand, lvl) => {
    const m = pk(rand, [0.1, 0.2, 0.5, 1.5, 2]), L = pk(rand, [334000, 2260000, 25000]);
    return eq(rand, { name: 'SLH', eq: 'E = m × L', vars: [{ sym: 'E', name: 'energy needed to change state', unit: 'J', val: m * L }, { sym: 'm', name: 'mass', unit: 'kg', val: m }, { sym: 'L', name: 'specific latent heat', unit: 'J/kg', val: L }], solve: { E: (x) => x.m * x.L, m: (x) => x.E / x.L, L: (x) => x.E / x.m }, rearr: { m: 'm = E ÷ L', L: 'L = E ÷ m' } }, lvl);
  }),
  G('p-weight', 'Weight (W = mg)', (rand, lvl) => {
    const m = pk(rand, [0.5, 2, 5, 12, 50, 65, 80]), g = pk(rand, [9.8, 9.8, 1.6, 3.7, 24.8]);
    return eq(rand, { name: 'Weight', eq: 'W = m × g', vars: [{ sym: 'W', name: 'weight', unit: 'N', val: m * g }, { sym: 'm', name: 'mass', unit: 'kg', val: m }, { sym: 'g', name: 'gravitational field strength', unit: 'N/kg', val: g }], solve: { W: (x) => x.m * x.g, m: (x) => x.W / x.g, g: (x) => x.W / x.m }, rearr: { m: 'm = W ÷ g', g: 'g = W ÷ m' } }, lvl);
  }),
  G('p-work', 'Work done (W = Fs)', (rand, lvl) => {
    const F = ri(rand, 5, 400), s = pk(rand, [0.5, 2, 3, 10, 25, 100]);
    return eq(rand, { name: 'Work', eq: 'W = F × s', vars: [{ sym: 'W', name: 'work done', unit: 'J', val: F * s }, { sym: 'F', name: 'force', unit: 'N', val: F }, { sym: 's', name: 'distance moved along the line of action of the force', unit: 'm', val: s }], solve: { W: (x) => x.F * x.s, F: (x) => x.W / x.s, s: (x) => x.W / x.F }, rearr: { F: 'F = W ÷ s', s: 's = W ÷ F' } }, lvl);
  }),
  G('p-spring', "Hooke's law & elastic energy", (rand, lvl) => {
    const k = pk(rand, [20, 25, 40, 50, 80, 100, 200]), e = pk(rand, [0.02, 0.05, 0.1, 0.15, 0.2, 0.3]);
    if (rand() < 0.5) return eq(rand, { name: 'Hooke', eq: 'F = k × e', vars: [{ sym: 'F', name: 'force', unit: 'N', val: k * e }, { sym: 'k', name: 'spring constant', unit: 'N/m', val: k }, { sym: 'e', name: 'extension', unit: 'm', val: e }], solve: { F: (x) => x.k * x.e, k: (x) => x.F / x.e, e: (x) => x.F / x.k }, rearr: { k: 'k = F ÷ e', e: 'e = F ÷ k' }, hint: 'Extension must be in metres (cm ÷ 100).', dp: 3 }, lvl);
    return { q: `A spring with spring constant **${k} N/m** is stretched by **${e * 100} cm**. Calculate the elastic potential energy stored.`, answer: r(0.5 * k * e * e, 4), unit: 'J', steps: [`Convert: ${e * 100} cm = ${e} m`, `Eₑ = ½ k e² = ½ × ${k} × ${e}²`, `= ${r(0.5 * k * e * e, 4)} J`], hints: ['Convert cm → m first. This equation is on the equation sheet.'], d: 3 };
  }),
  G('p-speed', 'Speed (v = s/t)', (rand, lvl) => {
    const v = pk(rand, [1.5, 3, 5, 12, 20, 31, 340]), t = ri(rand, 2, 120);
    return eq(rand, { name: 'Speed', eq: 'v = s ÷ t', vars: [{ sym: 'v', name: 'speed', unit: 'm/s', val: v }, { sym: 's', name: 'distance', unit: 'm', val: v * t }, { sym: 't', name: 'time', unit: 's', val: t }], solve: { v: (x) => x.s / x.t, s: (x) => x.v * x.t, t: (x) => x.s / x.v }, rearr: { s: 's = v × t', t: 't = s ÷ v' } }, lvl);
  }),
  G('p-accel', 'Acceleration', (rand, lvl) => {
    const u = ri(rand, 0, 10), a = pk(rand, [0.5, 1.5, 2, 2.5, 3, 4, -2, -1.5]), t = ri(rand, 2, 12);
    const v = u + a * t;
    if (v < 0) return { q: `A car slows from **${u + 20} m/s** to **${u} m/s** in **${t} s**. Calculate its acceleration (negative = deceleration).`, answer: r(-20 / t, 2), unit: 'm/s²', steps: ['a = Δv ÷ t', `= (${u} − ${u + 20}) ÷ ${t} = ${r(-20 / t, 2)} m/s²`], d: 2 };
    return eq(rand, { name: 'Accel', eq: 'a = Δv ÷ t', vars: [{ sym: 'a', name: 'acceleration', unit: 'm/s²', val: a }, { sym: 'Δv', name: 'change in velocity', unit: 'm/s', val: a * t }, { sym: 't', name: 'time', unit: 's', val: t }], solve: { a: (x) => x['Δv'] / x.t, 'Δv': (x) => x.a * x.t, t: (x) => x['Δv'] / x.a }, rearr: { 'Δv': 'Δv = a × t', t: 't = Δv ÷ a' } }, lvl);
  }),
  G('p-suvat', 'v² − u² = 2as', (rand) => {
    const u = ri(rand, 0, 8), a = pk(rand, [1, 2, 2.5, 4, 9.8]), s = ri(rand, 5, 60);
    const v = Math.sqrt(u * u + 2 * a * s);
    return { q: `An object starts at **${u} m/s** and accelerates at **${a} m/s²** over **${s} m**. Calculate its final velocity (2 dp).`, answer: r(v, 2), unit: 'm/s', tol: 0.011, steps: ['v² − u² = 2as (on the equation sheet)', `v² = ${u}² + 2 × ${a} × ${s} = ${r(v * v, 3)}`, `v = √${r(v * v, 3)} = ${r(v, 2)} m/s`], hints: ['Rearrange to v² = u² + 2as, then square root.'], d: 4 };
  }),
  G('p-newton2', 'F = ma', (rand, lvl) => {
    const m = pk(rand, [0.5, 2, 5, 60, 900, 1200, 1500]), a = pk(rand, [0.5, 1.5, 2, 3, 4, 9.8]);
    return eq(rand, { name: 'N2', eq: 'F = m × a', vars: [{ sym: 'F', name: 'resultant force', unit: 'N', val: m * a }, { sym: 'm', name: 'mass', unit: 'kg', val: m }, { sym: 'a', name: 'acceleration', unit: 'm/s²', val: a }], solve: { F: (x) => x.m * x.a, m: (x) => x.F / x.a, a: (x) => x.F / x.m }, rearr: { m: 'm = F ÷ a', a: 'a = F ÷ m' } }, lvl);
  }),
  G('p-momentum', 'Momentum', (rand, lvl) => {
    const m = pk(rand, [0.06, 0.5, 2, 70, 900, 1200]), v = pk(rand, [2, 5, 8, 12, 20, 25]);
    return eq(rand, { name: 'Momentum', eq: 'p = m × v', vars: [{ sym: 'p', name: 'momentum', unit: 'kg m/s', val: m * v }, { sym: 'm', name: 'mass', unit: 'kg', val: m }, { sym: 'v', name: 'velocity', unit: 'm/s', val: v }], solve: { p: (x) => x.m * x.v, m: (x) => x.p / x.v, v: (x) => x.p / x.m }, rearr: { m: 'm = p ÷ v', v: 'v = p ÷ m' } }, lvl);
  }, 'H'),
  G('p-wave', 'Wave speed', (rand, lvl) => {
    const f0 = pk(rand, [2, 5, 50, 256, 440, 1000, 20000]), lam = pk(rand, [0.02, 0.5, 0.75, 1.3, 2, 4]);
    return eq(rand, { name: 'Wave', eq: 'v = f × λ', vars: [{ sym: 'v', name: 'wave speed', unit: 'm/s', val: f0 * lam }, { sym: 'f', name: 'frequency', unit: 'Hz', val: f0 }, { sym: 'λ', name: 'wavelength', unit: 'm', val: lam }], solve: { v: (x) => x.f * x['λ'], f: (x) => x.v / x['λ'], 'λ': (x) => x.v / x.f }, rearr: { f: 'f = v ÷ λ', 'λ': 'λ = v ÷ f' }, dp: 4 }, lvl);
  }),
  G('p-period', 'Period & frequency', (rand) => {
    const fq = pk(rand, [2, 4, 5, 10, 20, 25, 50, 100]);
    return { q: `A wave has a frequency of **${fq} Hz**. Calculate its period.`, answer: r(1 / fq, 4), unit: 's', steps: ['T = 1 ÷ f', `= 1 ÷ ${fq} = ${r(1 / fq, 4)} s`], d: 2 };
  }),
  G('p-pressure', 'Pressure', (rand, lvl) => {
    const F = ri(rand, 10, 900), A = pk(rand, [0.01, 0.02, 0.05, 0.1, 0.25, 0.5, 2]);
    return eq(rand, { name: 'Pressure', eq: 'p = F ÷ A', vars: [{ sym: 'p', name: 'pressure', unit: 'Pa', val: F / A }, { sym: 'F', name: 'force', unit: 'N', val: F }, { sym: 'A', name: 'area', unit: 'm²', val: A }], solve: { p: (x) => x.F / x.A, F: (x) => x.p * x.A, A: (x) => x.F / x.p }, rearr: { F: 'F = p × A', A: 'A = F ÷ p' } }, lvl);
  }),
  G('p-moment', 'Moments', (rand, lvl) => {
    const F = ri(rand, 5, 200), d = pk(rand, [0.1, 0.2, 0.25, 0.5, 0.8, 1.5, 2]);
    return eq(rand, { name: 'Moment', eq: 'M = F × d', vars: [{ sym: 'M', name: 'moment', unit: 'Nm', val: F * d }, { sym: 'F', name: 'force', unit: 'N', val: F }, { sym: 'd', name: 'perpendicular distance from the pivot', unit: 'm', val: d }], solve: { M: (x) => x.F * x.d, F: (x) => x.M / x.d, d: (x) => x.M / x.F }, rearr: { F: 'F = M ÷ d', d: 'd = M ÷ F' } }, lvl);
  }),
  G('p-halflife', 'Half-life', (rand) => {
    const A0 = pk(rand, [800, 1200, 1600, 3200, 6400]), hl = pk(rand, [2, 5, 8, 12, 30]), n = ri(rand, 1, 4);
    if (rand() < 0.5) return { q: `A sample has an activity of **${A0} Bq**. Its half-life is **${hl} hours**. What is its activity after **${hl * n} hours**?`, answer: A0 / 2 ** n, unit: 'Bq', steps: [`Number of half-lives = ${hl * n} ÷ ${hl} = ${n}`, `Halve ${n} time${n > 1 ? 's' : ''}: ${A0} → ${Array.from({ length: n }, (_, i) => A0 / 2 ** (i + 1)).join(' → ')} Bq`], hints: ['How many half-lives fit into the time?'], d: 2 };
    return { q: `The activity of a source falls from **${A0} Bq** to **${A0 / 2 ** n} Bq** in **${hl * n} days**. What is its half-life in days?`, answer: hl, unit: 'days', steps: [`${A0} → ${A0 / 2 ** n} is ${n} halvings`, `Half-life = ${hl * n} ÷ ${n} = ${hl} days`], d: 3 };
  }),
  G('p-transformer', 'Transformers', (rand) => {
    const Vp = pk(rand, [230, 400, 11000, 25000]), np = pk(rand, [100, 200, 500, 1000, 2000]), ratio = pk(rand, [0.1, 0.05, 2, 5, 10, 0.5]);
    const ns = np * ratio, Vs = Vp * ratio;
    return { q: `A transformer has **${np}** turns on the primary coil and **${ns}** on the secondary. The primary p.d. is **${comma(Vp)} V**. Calculate the secondary p.d.`, answer: Vs, unit: 'V', steps: ['Vp ÷ Vs = np ÷ ns', `Vs = Vp × ns ÷ np = ${Vp} × ${ns} ÷ ${np} = ${comma(Vs)} V`], d: 4 };
  }, 'H'),
  G('p-motor', 'F = BIl', (rand) => {
    const B = pk(rand, [0.05, 0.1, 0.2, 0.4, 0.5]), I = pk(rand, [0.5, 1, 2, 3, 5]), l = pk(rand, [0.05, 0.1, 0.2, 0.3, 0.5]);
    return { q: `A wire **${l} m** long carries **${I} A** at right angles to a **${B} T** magnetic field. Calculate the force on the wire.`, answer: r(B * I * l, 4), unit: 'N', steps: ['F = B × I × l (on the equation sheet)', `= ${B} × ${I} × ${l} = ${r(B * I * l, 4)} N`], d: 3 };
  }, 'H'),
  // ---------------- CHEMISTRY ----------------
  G('c-mr', 'Relative formula mass', (rand) => {
    const cpds: [string, number, string][] = [
      ['H₂O', 18, '2(1) + 16'], ['CO₂', 44, '12 + 2(16)'], ['NaCl', 58.5, '23 + 35.5'], ['CaCO₃', 100, '40 + 12 + 3(16)'], ['H₂SO₄', 98, '2(1) + 32 + 4(16)'],
      ['MgO', 40, '24 + 16'], ['NH₃', 17, '14 + 3(1)'], ['CH₄', 16, '12 + 4(1)'], ['Ca(OH)₂', 74, '40 + 2(16 + 1)'], ['Mg(NO₃)₂', 148, '24 + 2(14 + 3×16)'],
      ['Al₂O₃', 102, '2(27) + 3(16)'], ['CuSO₄', 159.5, '63.5 + 32 + 4(16)'], ['NaOH', 40, '23 + 16 + 1'], ['HCl', 36.5, '1 + 35.5'], ['Fe₂O₃', 160, '2(56) + 3(16)'], ['C₂H₅OH', 46, '2(12) + 6(1) + 16'],
    ];
    const [fm, mr, work] = pk(rand, cpds);
    return { q: `Calculate the relative formula mass (Mᵣ) of **${fm}**. (Aᵣ: H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, Al = 27, S = 32, Cl = 35.5, Ca = 40, Fe = 56, Cu = 63.5)`, answer: mr, steps: [`Add up the Aᵣ of every atom: ${work}`, `Mᵣ = ${mr}`], hints: ['A small number after an element multiplies only that element; a number after a bracket multiplies everything inside.'], d: 2 };
  }),
  G('c-moles', 'Moles (n = m ÷ Mr)', (rand) => {
    const sub = pk(rand, [['water', 18], ['carbon dioxide', 44], ['sodium chloride', 58.5], ['calcium carbonate', 100], ['magnesium', 24], ['sulfuric acid', 98], ['methane', 16]] as [string, number][]);
    const n = pk(rand, [0.1, 0.2, 0.25, 0.5, 1.5, 2, 3]);
    const m = r(n * sub[1], 3);
    const t = pk(rand, ['n', 'm']);
    if (t === 'n') return { q: `How many moles are in **${m} g** of ${sub[0]} (Mᵣ = ${sub[1]})?`, answer: n, unit: 'mol', steps: ['moles = mass ÷ Mᵣ', `= ${m} ÷ ${sub[1]} = ${n} mol`], d: 2 };
    return { q: `What is the mass of **${n} mol** of ${sub[0]} (Mᵣ = ${sub[1]})?`, answer: m, unit: 'g', steps: ['mass = moles × Mᵣ', `= ${n} × ${sub[1]} = ${m} g`], d: 2 };
  }, 'H'),
  G('c-conc', 'Concentration', (rand) => {
    const mass = ri(rand, 2, 40), vol = pk(rand, [50, 100, 200, 250, 500, 1000]);
    return { q: `**${mass} g** of solute is dissolved to make **${vol} cm³** of solution. Calculate the concentration in **g/dm³**.`, answer: r(mass / (vol / 1000), 2), unit: 'g/dm³', steps: [`Convert volume: ${vol} cm³ ÷ 1000 = ${vol / 1000} dm³`, `Concentration = mass ÷ volume = ${mass} ÷ ${vol / 1000} = ${r(mass / (vol / 1000), 2)} g/dm³`], hints: ['cm³ → dm³: divide by 1000.'], d: 2 };
  }),
  G('c-pct-mass', 'Percentage by mass', (rand) => {
    const cpd = pk(rand, [['carbon in CO₂', 12, 44], ['oxygen in H₂O', 16, 18], ['calcium in CaCO₃', 40, 100], ['magnesium in MgO', 24, 40], ['nitrogen in NH₃', 14, 17], ['iron in Fe₂O₃', 112, 160], ['sodium in NaCl', 23, 58.5]] as [string, number, number][]);
    return { q: `Calculate the percentage by mass of **${cpd[0]}** (to 1 dp).`, answer: r((cpd[1] / cpd[2]) * 100, 1), unit: '%', tol: 0.051, steps: ['% = (total Aᵣ of that element ÷ Mᵣ) × 100', `= ${cpd[1]} ÷ ${cpd[2]} × 100 = ${r((cpd[1] / cpd[2]) * 100, 1)}%`], d: 2 };
  }),
  G('c-atom-economy', 'Atom economy', (rand) => {
    const rx = pk(rand, [
      ['CaCO₃ → CaO + CO₂, where CaO is the useful product', 56, 100],
      ['2H₂O₂ → 2H₂O + O₂, where O₂ is the useful product', 32, 68],
      ['C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, where ethanol is the useful product', 92, 180],
      ['Fe₂O₃ + 3CO → 2Fe + 3CO₂, where iron is the useful product', 112, 244],
    ] as [string, number, number][]);
    return { q: `Calculate the atom economy for ${rx[0]}. (Mᵣ of useful product(s) = ${rx[1]}, total Mᵣ of reactants = ${rx[2]}.) Give your answer to 1 dp.`, answer: r((rx[1] / rx[2]) * 100, 1), unit: '%', tol: 0.051, steps: ['Atom economy = (Mᵣ of desired product ÷ total Mᵣ of reactants) × 100', `= ${rx[1]} ÷ ${rx[2]} × 100 = ${r((rx[1] / rx[2]) * 100, 1)}%`], d: 3 };
  }),
  G('c-yield', 'Percentage yield', (rand) => {
    const theo = ri(rand, 20, 200) / 2, pct = ri(rand, 40, 95);
    const actual = r((theo * pct) / 100, 2);
    return { q: `The maximum theoretical mass of product is **${theo} g**. The actual mass obtained is **${actual} g**. Calculate the percentage yield (1 dp).`, answer: r((actual / theo) * 100, 1), unit: '%', tol: 0.051, steps: ['% yield = actual ÷ theoretical × 100', `= ${actual} ÷ ${theo} × 100 = ${r((actual / theo) * 100, 1)}%`], d: 2 };
  }, 'H'),
  G('c-rate', 'Mean rate of reaction', (rand) => {
    const vol = ri(rand, 10, 120), t = pk(rand, [10, 20, 30, 40, 60, 90, 120]);
    return { q: `A reaction produces **${vol} cm³** of gas in **${t} s**. Calculate the mean rate of reaction.`, answer: r(vol / t, 2), unit: 'cm³/s', steps: ['Mean rate = quantity of product formed ÷ time', `= ${vol} ÷ ${t} = ${r(vol / t, 2)} cm³/s`], d: 2 };
  }),
  G('c-rf', 'Rf values (chromatography)', (rand) => {
    const solvent = ri(rand, 60, 120) / 10, spot = r(solvent * pk(rand, [0.2, 0.35, 0.45, 0.5, 0.6, 0.75, 0.8]), 1);
    return { q: `In a chromatogram the solvent front moved **${solvent} cm** and a spot moved **${spot} cm** from the baseline. Calculate the Rf value (2 dp).`, answer: r(spot / solvent, 2), tol: 0.006, steps: ['Rf = distance moved by substance ÷ distance moved by solvent', `= ${spot} ÷ ${solvent} = ${r(spot / solvent, 2)}`, 'Rf has no units and is always less than 1.'], d: 2 };
  }),
  G('c-subatomic', 'Protons, neutrons, electrons', (rand) => {
    const els = [['Na', 11, 23], ['Mg', 12, 24], ['Al', 13, 27], ['Cl', 17, 35], ['K', 19, 39], ['Ca', 20, 40], ['O', 8, 16], ['F', 9, 19], ['Li', 3, 7], ['C', 6, 12], ['S', 16, 32], ['Fe', 26, 56]] as [string, number, number][];
    const [sym, Z, A] = pk(rand, els);
    const t = pk(rand, ['p', 'n', 'e']);
    const ans = t === 'n' ? A - Z : Z;
    return { q: `An atom of ${sym} has atomic number **${Z}** and mass number **${A}**. How many **${t === 'p' ? 'protons' : t === 'n' ? 'neutrons' : 'electrons'}** does it have?`, answer: ans, steps: ['Protons = atomic number', 'Electrons = protons (in a neutral atom)', 'Neutrons = mass number − atomic number', `Answer: ${ans}`], d: 1 };
  }),
  G('c-gas-vol', 'Volumes of gases', (rand) => {
    const n = pk(rand, [0.05, 0.1, 0.25, 0.5, 1.5, 2]);
    return { q: `What volume does **${n} mol** of a gas occupy at room temperature and pressure? (1 mol occupies 24 dm³)`, answer: r(n * 24, 2), unit: 'dm³', steps: ['Volume = moles × 24', `= ${n} × 24 = ${r(n * 24, 2)} dm³`], d: 3 };
  }, 'H'),
  G('c-titration', 'Titration calculation', (rand) => {
    const cNaOH = pk(rand, [0.1, 0.2, 0.25, 0.5]), vNaOH = pk(rand, [20, 25]), vAcid = r(ri(rand, 150, 300) / 10, 1);
    const n = (cNaOH * vNaOH) / 1000, cAcid = n / (vAcid / 1000);
    return { q: `**${vNaOH}.0 cm³** of **${cNaOH} mol/dm³** NaOH is neutralised by **${vAcid} cm³** of HCl. NaOH + HCl → NaCl + H₂O. Calculate the concentration of the HCl in mol/dm³ (3 sf).`, answer: sf(cAcid, 3), tol: sf(cAcid, 3) * 0.006, steps: [`Moles NaOH = ${cNaOH} × ${vNaOH}/1000 = ${n}`, 'Ratio 1:1 → moles HCl = ' + n, `Conc HCl = ${n} ÷ (${vAcid}/1000) = ${sf(cAcid, 3)} mol/dm³`], d: 5 };
  }, 'H'),
  G('c-bond-energy', 'Bond energy calculations', (rand) => {
    const make = pk(rand, [
      { r: 'H₂ + Cl₂ → 2HCl', broken: 436 + 243, made: 2 * 432, bw: 'H–H (436) + Cl–Cl (243)', mw: '2 × H–Cl (432)' },
      { r: 'CH₄ + 2O₂ → CO₂ + 2H₂O', broken: 4 * 413 + 2 * 498, made: 2 * 805 + 4 * 464, bw: '4 × C–H (413) + 2 × O=O (498)', mw: '2 × C=O (805) + 4 × O–H (464)' },
      { r: 'H₂ + ½O₂ → H₂O', broken: 436 + 249, made: 2 * 464, bw: 'H–H (436) + ½ × O=O (498)', mw: '2 × O–H (464)' },
    ]);
    const dH = make.broken - make.made;
    return { q: `Use the bond energies to calculate the overall energy change for **${make.r}** (kJ/mol). Bonds broken: ${make.bw}. Bonds made: ${make.mw}.`, answer: dH, unit: 'kJ/mol', steps: [`Energy in (bonds broken) = ${make.broken}`, `Energy out (bonds made) = ${make.made}`, `ΔH = broken − made = ${dH} kJ/mol (${dH < 0 ? 'exothermic' : 'endothermic'})`], hints: ['Breaking bonds takes energy IN; making bonds gives energy OUT. ΔH = in − out.'], d: 4 };
  }, 'H'),
  // ---------------- BIOLOGY ----------------
  G('b-magnification', 'Magnification', (rand, lvl) => {
    const mag = pk(rand, [40, 100, 400, 1000, 1500, 2000]), real = pk(rand, [5, 10, 20, 25, 50, 80, 100]); // µm
    const image = (real * mag) / 1000; // mm
    const t = lvl <= 2 ? 'mag' : pk(rand, ['mag', 'real']);
    if (t === 'mag') return { q: `A cell is **${real} µm** long. In a drawing it measures **${image} mm**. Calculate the magnification.`, answer: mag, unit: '×', steps: [`Same units: ${image} mm = ${image * 1000} µm`, `Magnification = image ÷ real = ${image * 1000} ÷ ${real} = ×${mag}`], hints: ['Convert to the same units first: 1 mm = 1000 µm.'], d: 3 };
    return { q: `An image of a cell is **${image} mm** long at magnification **×${mag}**. Calculate the real size in **µm**.`, answer: real, unit: 'µm', steps: [`Real size = image ÷ magnification = ${image} ÷ ${mag} = ${r(image / mag, 5)} mm`, `× 1000 = ${real} µm`], hints: ['Rearrange: real = image ÷ magnification. Then mm → µm (× 1000).'], d: 3 };
  }),
  G('b-pct-change', 'Percentage change in mass (osmosis)', (rand) => {
    const start = r(ri(rand, 150, 400) / 100, 2), pct = pk(rand, [-25, -18, -12, -8, -5, 4, 7, 10, 15, 22]);
    const end = r(start * (1 + pct / 100), 2);
    const real = ((end - start) / start) * 100;
    return { q: `A potato cylinder had a mass of **${start} g** before and **${end} g** after soaking in a solution. Calculate the percentage change in mass (1 dp).`, answer: r(real, 1), unit: '%', tol: 0.15, steps: [`Change = ${end} − ${start} = ${r(end - start, 2)} g`, `% change = change ÷ start × 100 = ${r(real, 1)}%`, real < 0 ? 'Mass decreased → water left by osmosis → the solution was more concentrated than the cell sap.' : 'Mass increased → water entered by osmosis → the solution was more dilute than the cell sap.'], d: 3 };
  }),
  G('b-rate', 'Rate from time (1/t)', (rand) => {
    const t = pk(rand, [8, 10, 12.5, 16, 20, 25, 40, 50]);
    return { q: `A reaction took **${t} s** to finish. Calculate the rate as **1/t** (3 dp).`, answer: r(1 / t, 3), unit: 's⁻¹', tol: 0.0006, steps: [`Rate = 1 ÷ time = 1 ÷ ${t} = ${r(1 / t, 4)}`, 'The shorter the time, the faster the rate.'], d: 2 };
  }),
  G('b-punnett', 'Genetic crosses', (rand) => {
    const cross = pk(rand, [
      { p: 'Aa × Aa', q: 'have the recessive phenotype (aa)', ans: 25, grid: 'AA, Aa, Aa, aa' },
      { p: 'Aa × aa', q: 'have the recessive phenotype (aa)', ans: 50, grid: 'Aa, Aa, aa, aa' },
      { p: 'AA × aa', q: 'have the dominant phenotype', ans: 100, grid: 'Aa, Aa, Aa, Aa' },
      { p: 'Aa × Aa', q: 'have the dominant phenotype', ans: 75, grid: 'AA, Aa, Aa, aa' },
      { p: 'Aa × Aa', q: 'be heterozygous (Aa)', ans: 50, grid: 'AA, Aa, Aa, aa' },
      { p: 'Ff × Ff (cystic fibrosis carriers)', q: 'have cystic fibrosis (ff)', ans: 25, grid: 'FF, Ff, Ff, ff' },
    ]);
    return { q: `Two parents are crossed: **${cross.p}**. What percentage of offspring are expected to ${cross.q}?`, answer: cross.ans, unit: '%', steps: ['Draw a Punnett square: parent gametes along the top and side', `Offspring genotypes: ${cross.grid}`, `Answer: ${cross.ans}%`], hints: ['Split each parent into its two possible gametes.'], d: 3 };
  }),
  G('b-quadrat', 'Estimating population size', (rand) => {
    const q = ri(rand, 5, 10), counts = Array.from({ length: q }, () => ri(rand, 0, 12)), area = pk(rand, [100, 200, 500, 1200, 2000]), qa = pk(rand, [0.25, 1]);
    const mean = counts.reduce((a, b) => a + b, 0) / q;
    const est = (mean / qa) * area;
    return { q: `${q} quadrats of **${qa} m²** were placed randomly in a **${area} m²** field. Daisies counted: ${counts.join(', ')}. Estimate the total daisy population (nearest whole number).`, answer: Math.round(est), tol: 1, steps: [`Mean per quadrat = ${counts.reduce((a, b) => a + b, 0)} ÷ ${q} = ${r(mean, 3)}`, `Per m² = ${r(mean, 3)} ÷ ${qa} = ${r(mean / qa, 3)}`, `Population = ${r(mean / qa, 3)} × ${area} = ${Math.round(est)}`], d: 3 };
  }),
  G('b-sf', 'Standard form & units in biology', (rand) => {
    const size = pk(rand, [[2, 'µm', 0.002, 'mm'], [0.5, 'mm', 500, 'µm'], [150, 'nm', 0.15, 'µm'], [3, 'µm', 3000, 'nm'], [0.02, 'mm', 20, 'µm']] as [number, string, number, string][]);
    return { q: `Convert **${size[0]} ${size[1]}** into **${size[3]}**.`, answer: size[2], unit: size[3], steps: ['1 mm = 1000 µm, 1 µm = 1000 nm', `${size[0]} ${size[1]} = ${size[2]} ${size[3]}`], hints: ['Going to a SMALLER unit → multiply by 1000; to a BIGGER unit → divide by 1000.'], d: 2 };
  }),
];

export { f, sf };
