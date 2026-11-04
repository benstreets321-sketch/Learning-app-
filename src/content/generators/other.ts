import type { Generator } from '../types';
import { ri, pk, r, f, comma, money, frac, fstr, facc } from './helpers';

const G = (id: string, title: string, make: Generator['make'], tier?: Generator['tier']): Generator => ({ id, title, make, tier });

const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

// ---------------- STATISTICS ----------------
export const STATS_GENERATORS: Generator[] = [
  G('s-quartiles', 'Quartiles & interquartile range', (rand) => {
    const k = ri(rand, 1, 3), n = 4 * k + 3; // makes (n+1)/4 a whole number
    const data = Array.from({ length: n }, () => ri(rand, 5, 60)).sort((a, b) => a - b);
    const q1 = data[(n + 1) / 4 - 1], q3 = data[(3 * (n + 1)) / 4 - 1];
    return { q: `For the ordered data ${data.join(', ')}, find the **interquartile range**.`, answer: q3 - q1, steps: [`n = ${n}`, `Lower quartile = value at position (n + 1)/4 = ${(n + 1) / 4} → ${q1}`, `Upper quartile = value at position 3(n + 1)/4 = ${(3 * (n + 1)) / 4} → ${q3}`, `IQR = ${q3} − ${q1} = ${q3 - q1}`], hints: ['Find the lower and upper quartiles first, then subtract.'], d: 3 };
  }),
  G('s-std-dev', 'Standard deviation', (rand) => {
    const n = ri(rand, 4, 6), data = Array.from({ length: n }, () => ri(rand, 1, 20));
    const m = sum(data) / n, v = sum(data.map((x) => x * x)) / n - m * m, sd = Math.sqrt(v);
    return { q: `Calculate the **standard deviation** of: ${data.join(', ')} (2 dp). Use σ = √(Σx²/n − x̄²).`, answer: r(sd, 2), tol: 0.011, steps: [`x̄ = ${sum(data)} ÷ ${n} = ${r(m, 4)}`, `Σx² = ${data.map((x) => x * x).join(' + ')} = ${sum(data.map((x) => x * x))}`, `σ² = ${sum(data.map((x) => x * x))}/${n} − ${r(m, 4)}² = ${r(v, 4)}`, `σ = ${r(sd, 2)}`], hints: ['Square each value and add them up for Σx².'], d: 4 };
  }, 'H'),
  G('s-grouped-mean', 'Estimated mean from grouped data', (rand) => {
    const w = pk(rand, [5, 10, 20]), groups = ri(rand, 4, 5), start = pk(rand, [0, 10, 20]);
    const fs = Array.from({ length: groups }, () => ri(rand, 2, 15));
    const mids = fs.map((_, i) => start + i * w + w / 2);
    const fx = sum(mids.map((m, i) => m * fs[i])), tot = sum(fs);
    const rows = fs.map((fr, i) => `| ${start + i * w} ≤ t < ${start + (i + 1) * w} | ${fr} |`).join('\n');
    return { q: `Estimate the **mean** time (1 dp).\n\n| Time (min) | Frequency |\n|---|---|\n${rows}`, answer: r(fx / tot, 1), tol: 0.051, steps: [`Midpoints: ${mids.join(', ')}`, `Σfx = ${mids.map((m, i) => `${m}×${fs[i]}`).join(' + ')} = ${fx}`, `Σf = ${tot}`, `Estimated mean = ${fx} ÷ ${tot} = ${r(fx / tot, 1)}`, 'It is an ESTIMATE because we don\'t know the exact values in each group.'], hints: ['Use the midpoint of each group as its value.'], d: 3 };
  }),
  G('s-spearman', "Spearman's rank correlation", (rand) => {
    const n = 5;
    const ranksX = [1, 2, 3, 4, 5];
    const ranksY = [...ranksX].sort(() => rand() - 0.5);
    const d2 = sum(ranksX.map((x, i) => (x - ranksY[i]) ** 2));
    const rs = 1 - (6 * d2) / (n * (n * n - 1));
    return { q: `Five students are ranked in two tests. Test A ranks: ${ranksX.join(', ')}. Test B ranks: ${ranksY.join(', ')}. Calculate **Spearman's rank correlation coefficient** (2 dp).`, answer: r(rs, 2), tol: 0.006, steps: [`d = differences: ${ranksX.map((x, i) => x - ranksY[i]).join(', ')}`, `Σd² = ${d2}`, `rₛ = 1 − 6Σd² ÷ n(n² − 1) = 1 − 6×${d2} ÷ (5×24) = ${r(rs, 2)}`, rs > 0.5 ? 'Strong positive agreement.' : rs < -0.5 ? 'Strong negative agreement.' : 'Weak/no correlation.'], d: 4 };
  }),
  G('s-index', 'Index numbers', (rand) => {
    const base = r(ri(rand, 100, 900) / 100, 2), pct = ri(rand, -15, 40), now = r(base * (1 + pct / 100), 2);
    return { q: `A loaf cost **${money(base)}** in the base year and **${money(now)}** now. Calculate the price index (base year = 100), to 1 dp.`, answer: r((now / base) * 100, 1), tol: 0.051, steps: ['Index = (current price ÷ base price) × 100', `= ${now} ÷ ${base} × 100 = ${r((now / base) * 100, 1)}`, `So the price has changed by ${r((now / base) * 100 - 100, 1)}%.`], d: 2 };
  }),
  G('s-capture', 'Capture-recapture (Petersen)', (rand) => {
    const N = ri(rand, 10, 60) * 10, M = ri(rand, 20, 60), n = ri(rand, 20, 60), m = Math.max(1, Math.round((M * n) / N));
    const est = (M * n) / m;
    return { q: `**${M}** fish are caught, tagged and released. Later **${n}** fish are caught and **${m}** of them are tagged. Estimate the population (nearest whole number).`, answer: Math.round(est), tol: 1, steps: ['N = Mn ÷ m (Petersen)', `= ${M} × ${n} ÷ ${m} = ${r(est, 2)}`, `≈ ${Math.round(est)}`, 'Assumes: no births/deaths/migration, tags not lost, tagged fish mix back evenly.'], d: 3 };
  }),
  G('s-stratified', 'Stratified sampling', (rand) => {
    const groups = [['Year 7', ri(rand, 120, 220)], ['Year 8', ri(rand, 120, 220)], ['Year 9', ri(rand, 120, 220)], ['Year 10', ri(rand, 120, 220)]] as [string, number][];
    const tot = sum(groups.map((g) => g[1])), sample = pk(rand, [40, 50, 60, 80, 100]);
    const g = pk(rand, groups);
    const exact = (g[1] / tot) * sample;
    return { q: `A school has ${groups.map(([n, c]) => `${c} in ${n}`).join(', ')}. A stratified sample of **${sample}** is taken. How many from **${g[0]}**? (nearest whole number)`, answer: Math.round(exact), steps: [`Total = ${tot}`, `${g[0]}: ${g[1]} ÷ ${tot} × ${sample} = ${r(exact, 2)}`, `≈ ${Math.round(exact)}`], hints: ['Each group is sampled in proportion to its size.'], d: 2 };
  }),
  G('s-expected', 'Expected frequency', (rand) => {
    const p = pk(rand, [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.05]), n = pk(rand, [40, 60, 80, 120, 200, 500]);
    return { q: `The probability a component is faulty is **${p}**. How many faulty components would you **expect** in **${n}**?`, answer: r(p * n, 2), steps: ['Expected frequency = probability × number of trials', `= ${p} × ${n} = ${r(p * n, 2)}`], d: 1 };
  }),
  G('s-binomial', 'Binomial probability', (rand) => {
    const n = ri(rand, 3, 6), p = pk(rand, [0.1, 0.2, 0.3, 0.4, 0.5]), k = ri(rand, 0, n);
    const C = (a: number, b: number) => { let x = 1; for (let i = 0; i < b; i++) x = (x * (a - i)) / (i + 1); return x; };
    const v = C(n, k) * p ** k * (1 - p) ** (n - k);
    return { q: `X ~ B(${n}, ${p}). Find **P(X = ${k})** to 4 dp.`, answer: r(v, 4), tol: 0.00006, steps: [`P(X = ${k}) = ⁿCᵣ pʳ (1 − p)ⁿ⁻ʳ`, `= ${C(n, k)} × ${p}^${k} × ${r(1 - p, 2)}^${n - k}`, `= ${r(v, 4)}`], d: 5 };
  }, 'H'),
  G('s-skew', "Pearson's skewness", (rand) => {
    const mean = ri(rand, 30, 70), med = mean + ri(rand, -6, 6), sd = ri(rand, 4, 15);
    const sk = (3 * (mean - med)) / sd;
    return { q: `A data set has mean **${mean}**, median **${med}** and standard deviation **${sd}**. Calculate Pearson's coefficient of skewness (2 dp).`, answer: r(sk, 2), tol: 0.006, steps: ['Skew = 3(mean − median) ÷ standard deviation', `= 3(${mean} − ${med}) ÷ ${sd} = ${r(sk, 2)}`, sk > 0 ? 'Positive skew (mean > median).' : sk < 0 ? 'Negative skew (mean < median).' : 'Symmetrical.'], d: 3 };
  }, 'H'),
  G('s-moving-avg', 'Moving averages', (rand) => {
    const data = Array.from({ length: 6 }, () => ri(rand, 20, 90));
    const pts = pk(rand, [3, 4]);
    const i = ri(rand, 0, data.length - pts);
    const v = sum(data.slice(i, i + pts)) / pts;
    return { q: `Quarterly sales: ${data.join(', ')}. Calculate the **${pts}-point moving average** starting at value ${i + 1} (2 dp).`, answer: r(v, 2), tol: 0.006, steps: [`Add values ${i + 1} to ${i + pts}: ${data.slice(i, i + pts).join(' + ')} = ${sum(data.slice(i, i + pts))}`, `÷ ${pts} = ${r(v, 2)}`], d: 2 };
  }),
  G('s-outlier', 'Outliers (1.5 × IQR rule)', (rand) => {
    const q1 = ri(rand, 10, 40), iqr = ri(rand, 5, 20), q3 = q1 + iqr;
    const upper = rand() < 0.5;
    const lim = upper ? q3 + 1.5 * iqr : q1 - 1.5 * iqr;
    return { q: `Q1 = ${q1} and Q3 = ${q3}. Using the 1.5 × IQR rule, what is the **${upper ? 'upper' : 'lower'}** limit for outliers?`, answer: lim, steps: [`IQR = ${q3} − ${q1} = ${iqr}`, `1.5 × IQR = ${1.5 * iqr}`, upper ? `Upper limit = Q3 + 1.5×IQR = ${lim}` : `Lower limit = Q1 − 1.5×IQR = ${lim}`], d: 3 };
  }),
  G('s-regression', 'Using a regression line', (rand) => {
    const a = ri(rand, -10, 20), b = r(ri(rand, 5, 40) / 10, 1), x = ri(rand, 2, 30);
    return { q: `The line of best fit is **y = ${a} + ${b}x**. Estimate y when **x = ${x}**.`, answer: r(a + b * x, 2), steps: [`y = ${a} + ${b} × ${x} = ${r(a + b * x, 2)}`, 'Only reliable within the range of the data (interpolation), not outside it (extrapolation).'], d: 2 };
  }),
  G('s-crude-rate', 'Crude rates', (rand) => {
    const pop = ri(rand, 20, 400) * 1000, deaths = ri(rand, 100, 3000);
    return { q: `A town of **${comma(pop)}** people had **${deaths}** deaths in a year. Calculate the crude death rate per 1000 (2 dp).`, answer: r((deaths / pop) * 1000, 2), tol: 0.006, steps: ['Crude rate = (number of deaths ÷ population) × 1000', `= ${deaths} ÷ ${pop} × 1000 = ${r((deaths / pop) * 1000, 2)}`], d: 2 };
  }),
  G('s-prob-tree', 'Tree diagrams (without replacement)', (rand) => {
    const red = ri(rand, 2, 7), blue = ri(rand, 2, 7), tot = red + blue;
    const both = frac(red * (red - 1), tot * (tot - 1));
    return { q: `A bag has ${red} red and ${blue} blue sweets. Two are taken **without replacement**. Find P(both red) as a fraction in simplest form.`, answer: fstr(both), accept: facc(both), steps: [`P(1st red) = ${red}/${tot}`, `P(2nd red | 1st red) = ${red - 1}/${tot - 1}`, `Multiply: ${red * (red - 1)}/${tot * (tot - 1)} = ${fstr(both)}`], hints: ['Without replacement: the second fraction has one fewer on top AND bottom.'], d: 4 };
  }),
];

// ---------------- BUSINESS ----------------
export const BUSINESS_GENERATORS: Generator[] = [
  G('bus-revenue', 'Revenue', (rand) => {
    const p = r(ri(rand, 150, 4000) / 100, 2), q = ri(rand, 50, 5000);
    return { q: `A business sells **${comma(q)}** units at **${money(p)}** each. Calculate total revenue.`, answer: r(p * q, 2), unit: '£', steps: ['Revenue = selling price × quantity sold', `= ${money(p)} × ${comma(q)} = £${comma(r(p * q, 2))}`], d: 1 };
  }),
  G('bus-costs', 'Total costs', (rand) => {
    const fc = ri(rand, 10, 200) * 100, vc = r(ri(rand, 50, 1500) / 100, 2), q = ri(rand, 100, 3000);
    return { q: `Fixed costs are **£${comma(fc)}**, variable cost per unit is **${money(vc)}** and output is **${comma(q)}** units. Calculate total costs.`, answer: r(fc + vc * q, 2), unit: '£', steps: ['Total costs = fixed costs + (variable cost per unit × output)', `= ${fc} + (${vc} × ${q}) = £${comma(r(fc + vc * q, 2))}`], hints: ['Variable costs change with output; fixed costs don\'t.'], d: 2 };
  }),
  G('bus-profit', 'Profit', (rand) => {
    const p = ri(rand, 8, 60), vc = ri(rand, 2, p - 2), fc = ri(rand, 5, 80) * 100, q = ri(rand, 100, 2000);
    const prof = (p - vc) * q - fc;
    return { q: `Price **£${p}**, variable cost **£${vc}** per unit, fixed costs **£${comma(fc)}**, sales **${comma(q)}** units. Calculate profit (negative = loss).`, answer: prof, unit: '£', steps: [`Revenue = ${p} × ${q} = £${comma(p * q)}`, `Total costs = ${fc} + ${vc} × ${q} = £${comma(fc + vc * q)}`, `Profit = revenue − total costs = £${comma(prof)}`], d: 2 };
  }),
  G('bus-breakeven', 'Break-even output', (rand) => {
    const p = ri(rand, 10, 80), vc = ri(rand, 2, p - 3), contrib = p - vc, be = ri(rand, 50, 2000), fc = be * contrib;
    return { q: `Fixed costs **£${comma(fc)}**, selling price **£${p}**, variable cost per unit **£${vc}**. Calculate the break-even output.`, answer: be, unit: 'units', steps: [`Contribution per unit = price − variable cost = ${p} − ${vc} = £${contrib}`, `Break-even = fixed costs ÷ contribution per unit = ${fc} ÷ ${contrib} = ${comma(be)} units`], hints: ['Break-even output = fixed costs ÷ (price − variable cost per unit).'], d: 3 };
  }),
  G('bus-mos', 'Margin of safety', (rand) => {
    const be = ri(rand, 100, 3000), actual = be + ri(rand, -200, 1500);
    return { q: `Break-even output is **${comma(be)}** units and actual sales are **${comma(actual)}** units. Calculate the margin of safety.`, answer: actual - be, unit: 'units', steps: ['Margin of safety = actual sales − break-even output', `= ${actual} − ${be} = ${actual - be} units`, actual - be < 0 ? 'Negative → the business is making a loss.' : 'Positive → sales can fall by this much before a loss is made.'], d: 2 };
  }),
  G('bus-gpm', 'Gross profit margin', (rand) => {
    const rev = ri(rand, 50, 900) * 1000, cos = Math.round(rev * pk(rand, [0.3, 0.4, 0.45, 0.55, 0.6, 0.7]));
    const gp = rev - cos;
    return { q: `Revenue is **£${comma(rev)}** and cost of sales is **£${comma(cos)}**. Calculate the gross profit margin (1 dp).`, answer: r((gp / rev) * 100, 1), unit: '%', tol: 0.051, steps: [`Gross profit = revenue − cost of sales = £${comma(gp)}`, `GPM = gross profit ÷ revenue × 100 = ${r((gp / rev) * 100, 1)}%`], d: 2 };
  }),
  G('bus-npm', 'Net profit margin', (rand) => {
    const rev = ri(rand, 50, 900) * 1000, np = Math.round(rev * pk(rand, [0.05, 0.08, 0.12, 0.15, 0.2, 0.25]));
    return { q: `Revenue is **£${comma(rev)}** and net profit is **£${comma(np)}**. Calculate the net profit margin (1 dp).`, answer: r((np / rev) * 100, 1), unit: '%', tol: 0.051, steps: ['NPM = net profit ÷ revenue × 100', `= ${comma(np)} ÷ ${comma(rev)} × 100 = ${r((np / rev) * 100, 1)}%`], d: 2 };
  }),
  G('bus-arr', 'Average rate of return', (rand) => {
    const cost = ri(rand, 10, 100) * 1000, years = ri(rand, 3, 6), totalProfit = Math.round(cost * (1 + pk(rand, [0.2, 0.4, 0.5, 0.75, 1])));
    const avg = (totalProfit - cost) / years;
    return { q: `An investment costs **£${comma(cost)}** and returns a total of **£${comma(totalProfit)}** over **${years} years**. Calculate the ARR (1 dp).`, answer: r((avg / cost) * 100, 1), unit: '%', tol: 0.051, steps: [`Total profit = ${comma(totalProfit)} − ${comma(cost)} = £${comma(totalProfit - cost)}`, `Average annual profit = ÷ ${years} = £${comma(r(avg, 2))}`, `ARR = average annual profit ÷ cost of investment × 100 = ${r((avg / cost) * 100, 1)}%`], hints: ['Subtract the cost first, then divide by the number of years.'], d: 4 };
  }),
  G('bus-cashflow', 'Cash flow closing balance', (rand) => {
    const open = ri(rand, -50, 200) * 100, inflow = ri(rand, 20, 300) * 100, outflow = ri(rand, 20, 300) * 100;
    const net = inflow - outflow, close = open + net;
    return { q: `Opening balance **£${comma(open)}**, cash inflows **£${comma(inflow)}**, cash outflows **£${comma(outflow)}**. Calculate the closing balance.`, answer: close, unit: '£', steps: [`Net cash flow = inflows − outflows = £${comma(net)}`, `Closing balance = opening balance + net cash flow = £${comma(close)}`, 'The closing balance becomes next month\'s opening balance.'], d: 2 };
  }),
  G('bus-interest', 'Interest on loans', (rand) => {
    const loan = ri(rand, 5, 100) * 1000, total = Math.round(loan * (1 + pk(rand, [0.05, 0.08, 0.1, 0.12, 0.2, 0.25])));
    return { q: `A business borrows **£${comma(loan)}** and repays **£${comma(total)}** in total. Calculate the interest rate on the loan (1 dp).`, answer: r(((total - loan) / loan) * 100, 1), unit: '%', tol: 0.051, steps: [`Interest = ${comma(total)} − ${comma(loan)} = £${comma(total - loan)}`, `Interest (%) = (total repayment − borrowed) ÷ borrowed × 100 = ${r(((total - loan) / loan) * 100, 1)}%`], d: 3 };
  }),
  G('bus-pct-change', 'Percentage change in sales', (rand) => {
    const a = ri(rand, 20, 500) * 100, pct = pk(rand, [-20, -12, -5, 4, 8, 15, 25, 40]), b = Math.round(a * (1 + pct / 100));
    return { q: `Sales were **£${comma(a)}** last year and **£${comma(b)}** this year. Calculate the percentage change (1 dp).`, answer: r(((b - a) / a) * 100, 1), unit: '%', tol: 0.051, steps: [`Change = £${comma(b - a)}`, `% change = change ÷ original × 100 = ${r(((b - a) / a) * 100, 1)}%`], d: 2 };
  }),
  G('bus-market-share', 'Market share', (rand) => {
    const total = ri(rand, 10, 200) * 10000, share = pk(rand, [0.05, 0.08, 0.12, 0.2, 0.25, 0.35]), sales = Math.round(total * share);
    return { q: `A firm's sales are **£${comma(sales)}** in a market worth **£${comma(total)}**. Calculate its market share (1 dp).`, answer: r((sales / total) * 100, 1), unit: '%', tol: 0.051, steps: ['Market share = firm\'s sales ÷ total market sales × 100', `= ${r((sales / total) * 100, 1)}%`], d: 2 };
  }),
  G('bus-unit-cost', 'Average (unit) cost', (rand) => {
    const tc = ri(rand, 20, 400) * 100, q = pk(rand, [100, 200, 250, 400, 500, 1000]);
    return { q: `Total costs are **£${comma(tc)}** for **${q}** units. Calculate the average cost per unit.`, answer: r(tc / q, 2), unit: '£', steps: [`Average cost = total cost ÷ output = ${tc} ÷ ${q} = ${money(tc / q)}`], d: 1 };
  }),
];

// ---------------- CREATIVE iMEDIA ----------------
export const IMEDIA_GENERATORS: Generator[] = [
  G('im-image-size', 'Bitmap image file size', (rand) => {
    const w = pk(rand, [640, 800, 1024, 1280, 1920]), h = pk(rand, [480, 600, 768, 720, 1080]), bd = pk(rand, [8, 16, 24]);
    const bytes = (w * h * bd) / 8;
    const mb = bytes / (1024 * 1024);
    return { q: `An uncompressed image is **${w} × ${h} pixels** with a colour depth of **${bd} bits**. Calculate its file size in **MB** (2 dp, 1 MB = 1024 × 1024 bytes).`, answer: r(mb, 2), unit: 'MB', tol: 0.011, steps: [`Bits = width × height × colour depth = ${w} × ${h} × ${bd} = ${comma(w * h * bd)} bits`, `Bytes = bits ÷ 8 = ${comma(bytes)} bytes`, `MB = bytes ÷ 1024 ÷ 1024 = ${r(mb, 2)} MB`], hints: ['Pixels × bits per pixel gives bits. ÷ 8 for bytes.'], d: 3 };
  }),
  G('im-audio-size', 'Audio file size', (rand) => {
    const sr = pk(rand, [22050, 44100, 48000]), bd = pk(rand, [16, 24]), ch = pk(rand, [1, 2]), s = pk(rand, [10, 30, 60, 120, 180]);
    const bytes = (sr * bd * ch * s) / 8, mb = bytes / (1024 * 1024);
    return { q: `An uncompressed audio clip is **${s} seconds** long, sampled at **${comma(sr)} Hz**, **${bd}-bit**, **${ch === 1 ? 'mono' : 'stereo'}**. Calculate its file size in MB (2 dp).`, answer: r(mb, 2), unit: 'MB', tol: 0.011, steps: [`Bits = sample rate × bit depth × channels × seconds = ${sr} × ${bd} × ${ch} × ${s} = ${comma(sr * bd * ch * s)}`, `÷ 8 = ${comma(bytes)} bytes`, `÷ 1024 ÷ 1024 = ${r(mb, 2)} MB`], d: 3 };
  }),
  G('im-colours', 'Colour depth', (rand) => {
    const bd = pk(rand, [1, 2, 4, 8, 16, 24]);
    return { q: `How many different colours can be shown with a colour depth of **${bd} bit${bd > 1 ? 's' : ''}**?`, answer: 2 ** bd, steps: [`Colours = 2^bit depth = 2^${bd} = ${comma(2 ** bd)}`], hints: ['Each extra bit doubles the number of colours.'], d: 2 };
  }),
  G('im-print', 'Print resolution (DPI)', (rand) => {
    const inches = pk(rand, [4, 5, 6, 8, 10]), dpi = pk(rand, [72, 150, 300]);
    return { q: `A photo is to be printed **${inches} inches** wide at **${dpi} dpi**. How many pixels wide must the image be?`, answer: inches * dpi, unit: 'pixels', steps: [`Pixels = inches × dpi = ${inches} × ${dpi} = ${inches * dpi}`, dpi >= 300 ? '300 dpi is standard for high-quality print.' : dpi === 72 ? '72 dpi is screen resolution - too low for good print quality.' : '150 dpi is acceptable for some print.'], d: 2 };
  }),
  G('im-duration', 'Video frames', (rand) => {
    const fps = pk(rand, [24, 25, 30, 50, 60]), s = pk(rand, [5, 10, 15, 30, 60]);
    return { q: `A video runs at **${fps} fps** for **${s} seconds**. How many frames is that?`, answer: fps * s, steps: [`Frames = fps × seconds = ${fps} × ${s} = ${fps * s}`], d: 1 };
  }),
];

export { f };
