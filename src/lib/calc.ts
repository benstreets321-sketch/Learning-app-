// Safe expression evaluator for the in-app scientific calculator (no eval).
// Supports + - × ÷ ^ ( ), unary minus, %, π, e, ANS, and functions sin cos tan asin acos atan sqrt cbrt log ln abs.
// Trig works in degrees (as GCSE calculators are normally set).

type Tok = { t: 'num'; v: number } | { t: 'op'; v: string } | { t: 'fn'; v: string } | { t: '(' } | { t: ')' };

const FNS = ['asin', 'acos', 'atan', 'sin', 'cos', 'tan', 'sqrt', 'cbrt', 'log', 'ln', 'abs'];
const DEG = Math.PI / 180;

function tokenize(src: string, ans: number): Tok[] {
  const s = src.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/√/g, 'sqrt').replace(/∛/g, 'cbrt').replace(/\s+/g, '');
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      if (s[j] === 'E' && /[-+0-9]/.test(s[j + 1] ?? '')) { j += 2; while (j < s.length && /[0-9]/.test(s[j])) j++; }
      const v = Number(s.slice(i, j));
      if (!Number.isFinite(v)) throw new Error('Bad number');
      out.push({ t: 'num', v });
      i = j;
      continue;
    }
    if (s.startsWith('π', i) || s.startsWith('pi', i)) { out.push({ t: 'num', v: Math.PI }); i += s.startsWith('π', i) ? 1 : 2; continue; }
    if (s.startsWith('Ans', i) || s.startsWith('ANS', i)) { out.push({ t: 'num', v: ans }); i += 3; continue; }
    const fn = FNS.find((f) => s.startsWith(f, i));
    if (fn) { out.push({ t: 'fn', v: fn }); i += fn.length; continue; }
    if (c === 'e') { out.push({ t: 'num', v: Math.E }); i++; continue; }
    if ('+-*/^%²³'.includes(c)) { out.push({ t: 'op', v: c }); i++; continue; }
    if (c === '(') { out.push({ t: '(' }); i++; continue; }
    if (c === ')') { out.push({ t: ')' }); i++; continue; }
    throw new Error(`Unexpected "${c}"`);
  }
  // implicit multiplication: 2π, 3(4), (2)(3), 2sin30
  const res: Tok[] = [];
  for (const tk of out) {
    const prev = res[res.length - 1];
    const prevEnds = prev && (prev.t === 'num' || prev.t === ')' || (prev.t === 'op' && (prev.v === '²' || prev.v === '³' || prev.v === '%')));
    const starts = tk.t === 'num' || tk.t === '(' || tk.t === 'fn';
    if (prevEnds && starts) res.push({ t: 'op', v: '*' });
    res.push(tk);
  }
  return res;
}

/** Recursive-descent parser */
export function evaluate(src: string, ans = 0): number {
  const toks = tokenize(src, ans);
  let i = 0;
  const peek = () => toks[i];
  const isOp = (v: string) => { const p = peek(); return p && p.t === 'op' && p.v === v; };

  function primary(): number {
    const tk = toks[i++];
    if (!tk) throw new Error('Incomplete');
    if (tk.t === 'num') return tk.v;
    if (tk.t === '(') {
      const v = expr();
      if (peek()?.t === ')') i++; // tolerate a missing closing bracket at the end
      return v;
    }
    if (tk.t === 'fn') {
      const arg = postfix(primaryOrUnary());
      switch (tk.v) {
        case 'sin': return round(Math.sin(arg * DEG));
        case 'cos': return round(Math.cos(arg * DEG));
        case 'tan': return round(Math.tan(arg * DEG));
        case 'asin': return Math.asin(arg) / DEG;
        case 'acos': return Math.acos(arg) / DEG;
        case 'atan': return Math.atan(arg) / DEG;
        case 'sqrt': return Math.sqrt(arg);
        case 'cbrt': return Math.cbrt(arg);
        case 'log': return Math.log10(arg);
        case 'ln': return Math.log(arg);
        case 'abs': return Math.abs(arg);
      }
    }
    throw new Error('Syntax error');
  }
  function primaryOrUnary(): number {
    if (isOp('-')) { i++; return -primaryOrUnary(); }
    if (isOp('+')) { i++; return primaryOrUnary(); }
    return primary();
  }
  function postfix(v: number): number {
    for (;;) {
      if (isOp('²')) { i++; v = v * v; continue; }
      if (isOp('³')) { i++; v = v * v * v; continue; }
      if (isOp('%')) { i++; v = v / 100; continue; }
      return v;
    }
  }
  function power(): number {
    if (isOp('-')) { i++; return -power(); }
    const base = postfix(primary());
    if (isOp('^')) { i++; return base ** power(); }
    return base;
  }
  function term(): number {
    let v = power();
    for (;;) {
      if (isOp('*')) { i++; v *= power(); }
      else if (isOp('/')) { i++; const d = power(); if (d === 0) throw new Error('Cannot divide by 0'); v /= d; }
      else return v;
    }
  }
  function expr(): number {
    let v = term();
    for (;;) {
      if (isOp('+')) { i++; v += term(); }
      else if (isOp('-')) { i++; v -= term(); }
      else return v;
    }
  }
  const v = expr();
  if (i < toks.length) throw new Error('Syntax error');
  if (!Number.isFinite(v)) throw new Error('Math error');
  return v;
}

/** Kill floating noise like sin(30) = 0.49999999999999994 */
function round(x: number) {
  return Math.abs(x - Math.round(x * 1e12) / 1e12) < 1e-13 ? Math.round(x * 1e12) / 1e12 : x;
}

export function formatResult(v: number): string {
  if (v === 0) return '0';
  const a = Math.abs(v);
  if (a >= 1e10 || a < 1e-6) {
    const [m, e] = v.toExponential(6).split('e');
    return `${Number(m)} × 10^${Number(e)}`;
  }
  return String(Math.round(v * 1e10) / 1e10);
}
