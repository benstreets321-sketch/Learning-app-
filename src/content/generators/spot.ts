// "Spot the mistake" generators: a worked solution with one realistic error to find.
import type { Generator, GeneratedQuestion } from '../types';
import { ri, nz, pk, sgn, coef, r } from './helpers';

const G = (id: string, title: string, make: Generator['make']): Generator => ({ id, title, make });

/** Build a spot question; the steps also explain the right method */
function make(q: string, lines: string[], wrong: number, fix: string, steps: string[], d: number, hints: string[]): GeneratedQuestion {
  return { q, answer: fix, steps, d, hints, spot: { lines, wrong, fix } };
}

export const SPOT_GENERATORS: Generator[] = [
  G('m-spot-linear', 'Spot the mistake: linear equations', (rand, lvl) => {
    const a = ri(rand, 2, 9), x = nz(rand, -6, 9), b = nz(rand, -12, 12);
    const c = a * x + b;
    const kind = pk(rand, ['sign', 'divide'] as const);
    const correct = [`${coef(a)} ${sgn(b)} = ${c}`, `${coef(a)} = ${c - b}`, `x = ${c - b} ÷ ${a}`, `x = ${x}`];
    const lines = correct.slice();
    let wrong = 1, fix = correct[1];
    if (kind === 'sign') {
      lines[1] = `${coef(a)} = ${c + b}`; lines[2] = `x = ${c + b} ÷ ${a}`; lines[3] = `x = ${r((c + b) / a, 2)}`;
    } else {
      wrong = 2; fix = correct[2];
      lines[2] = `x = ${c - b} − ${a}`; lines[3] = `x = ${c - b - a}`;
    }
    return make(`Find the line with the mistake. Solve **${correct[0]}**.`, lines, wrong, fix,
      [`To remove ${b > 0 ? `+${b}` : b} do the inverse to both sides: ${coef(a)} = ${c - b}`, `${a}x means ${a} × x, so divide by ${a}: x = ${x}`, `Check: ${a} × ${x} ${sgn(b)} = ${c} ✓`], Math.min(3, lvl + 1),
      ['Do the inverse operation to BOTH sides at each step.', 'Substitute the final answer back in to check it.']);
  }),
  G('m-spot-expand', 'Spot the mistake: expanding brackets', (rand, lvl) => {
    const p = nz(rand, -7, 7);
    let q = nz(rand, -7, 7);
    while (p + q === 0) q = nz(rand, -7, 7);
    const line1 = `(x ${sgn(p)})(x ${sgn(q)})`;
    const mid = p + q, end = p * q;
    const right = `x² ${sgn(mid)}x ${sgn(end)}`.replace(/([+−] )1x/, '$1x');
    const kind = pk(rand, ['end', 'mid'] as const);
    const wrongLine = kind === 'end' ? `x² ${sgn(mid)}x ${sgn(p + q === end ? end + 1 : p + q)}`.replace(/([+−] )1x/, '$1x') : `x² ${sgn(p * q === mid ? mid + 1 : p * q)}x ${sgn(end)}`.replace(/([+−] )1x/, '$1x');
    const lines = [line1, `= x² ${sgn(q)}x ${sgn(p)}x ${sgn(end)}`.replace(/([+−] )1x/g, '$1x'), `= ${wrongLine}`];
    return make(`Find the line with the mistake when expanding **${line1}**.`, lines, 2, `= ${right}`,
      [`FOIL: x × x = x², x × ${q} = ${q}x, ${p} × x = ${p}x, ${p} × ${q} = ${end}`, `Collect the x terms: ${q} + ${p} = ${mid}`, `Answer: ${right}`], Math.min(3, lvl + 1),
      ['Check the number term: it is the two numbers MULTIPLIED.', 'The x term is the two numbers ADDED.']);
  }),
  G('m-spot-percent', 'Spot the mistake: percentage change', (rand, lvl) => {
    const price = ri(rand, 4, 30) * 10, pc = pk(rand, [10, 15, 20, 25, 30, 35, 40]);
    const up = rand() < 0.5;
    const change = (price * pc) / 100;
    const ans = up ? price + change : price - change;
    const kind = pk(rand, ['direction', 'decimal'] as const);
    const lines = [`${pc}% of £${price} = ${pc / 100} × ${price}`, `= £${change}`, `New price = ${price} ${up ? '+' : '−'} ${change}`, `= £${ans}`];
    let wrong = 2, fix = lines[2];
    if (kind === 'direction') {
      lines[2] = `New price = ${price} ${up ? '−' : '+'} ${change}`; lines[3] = `= £${up ? price - change : price + change}`;
    } else {
      wrong = 0; fix = lines[0];
      lines[0] = `${pc}% of £${price} = ${pc / 10} × ${price}`; lines[1] = `= £${(pc / 10) * price}`; lines[2] = `New price = ${price} ${up ? '+' : '−'} ${(pc / 10) * price}`; lines[3] = `= £${up ? price + (pc / 10) * price : price - (pc / 10) * price}`;
    }
    return make(`A £${price} item is ${up ? 'increased' : 'reduced'} by ${pc}%. Find the line with the mistake.`, lines, wrong, fix,
      [`${pc}% = ${pc / 100} as a decimal`, `${pc / 100} × ${price} = £${change}`, `${up ? 'Increase → add' : 'Decrease → subtract'}: £${ans}`, `Or use a multiplier: ${price} × ${up ? 1 + pc / 100 : 1 - pc / 100} = £${ans}`], Math.min(3, lvl),
      ['Is the final answer sensible? A reduction must give a smaller number.', 'To turn a percentage into a decimal, divide by 100.']);
  }),
  G('p-spot-equation', 'Spot the mistake: physics calculations', (rand, lvl) => {
    const kind = pk(rand, ['ke', 'speed', 'power'] as const);
    if (kind === 'ke') {
      const m = ri(rand, 2, 12), v = ri(rand, 2, 9);
      const lines = ['Eₖ = ½ × m × v²', `Eₖ = 0.5 × ${m} × ${v}`, `Eₖ = ${0.5 * m * v} J`];
      return make(`A ${m} kg object moves at ${v} m/s. Find the line with the mistake.`, lines, 1, `Eₖ = 0.5 × ${m} × ${v}² = ${0.5 * m * v * v} J`,
        [`Square the speed: ${v}² = ${v * v}`, `Eₖ = 0.5 × ${m} × ${v * v} = ${0.5 * m * v * v} J`], Math.min(3, lvl + 1), ['Which quantity in the equation is squared?']);
    }
    if (kind === 'speed') {
      const s = ri(rand, 2, 12) * 100, t = ri(rand, 2, 10) * 10;
      const lines = ['speed = distance ÷ time', `speed = ${t} ÷ ${s}`, `speed = ${r(t / s, 3)} m/s`];
      return make(`A cyclist travels ${s} m in ${t} s. Find the line with the mistake.`, lines, 1, `speed = ${s} ÷ ${t} = ${r(s / t, 2)} m/s`,
        [`Distance goes on top: ${s} ÷ ${t}`, `= ${r(s / t, 2)} m/s - a sensible cycling speed`], Math.min(3, lvl), ['Sense-check: is the answer a realistic speed?']);
    }
    const E = ri(rand, 2, 20) * 100, t = ri(rand, 2, 10) * 5;
    const lines = ['P = E ÷ t', `P = ${E} × ${t}`, `P = ${E * t} W`];
    return make(`A heater transfers ${E} J in ${t} s. Find the line with the mistake.`, lines, 1, `P = ${E} ÷ ${t} = ${r(E / t, 2)} W`,
      [`Power is energy per second, so divide: ${E} ÷ ${t}`, `P = ${r(E / t, 2)} W`], Math.min(3, lvl), ['Power = energy transferred per second.']);
  }),
];
