// Typed algebra answers: parse what a student types (3x(2x + 5), 6x^2+15x, (x+3)², 2√3, x = (y - 4)/3 ...),
// check it is EQUAL to the right answer (by evaluating both at several random values), and check it is in the FORM
// the question asks for (fully factorised, expanded and simplified, simplest surd form).

export type Node =
  | { k: 'num'; v: number }
  | { k: 'var'; n: string }
  | { k: 'add' | 'sub' | 'mul' | 'div' | 'pow'; a: Node; b: Node }
  | { k: 'neg'; a: Node }
  | { k: 'sqrt'; a: Node };

export type AlgebraForm = 'any' | 'factorised' | 'expanded' | 'surd';

const SUP: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };

/** Tidy what was typed: unicode symbols, superscripts, "x =" in front */
export function normaliseExpr(raw: string): string {
  let s = raw.trim()
    .replace(/[−–—]/g, '-').replace(/[×·∙]/g, '*').replace(/÷/g, '/')
    .replace(/\*\*/g, '^').replace(/π/g, 'pi');
  // superscript powers: x² → x^(2)
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (m) => `^(${[...m].map((c) => SUP[c]).join('')})`);
  // sqrt(...) / root(...) → √(...)
  s = s.replace(/\b(sqrt|root)\s*/gi, '√');
  return s;
}

type Tok = { t: 'num'; v: number } | { t: 'var'; n: string } | { t: 'op'; v: string };

function tokenize(s: string): Tok[] | null {
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const v = Number(s.slice(i, j));
      if (!Number.isFinite(v)) return null;
      out.push({ t: 'num', v });
      i = j;
      continue;
    }
    if (s.startsWith('pi', i)) { out.push({ t: 'num', v: Math.PI }); i += 2; continue; }
    if (/[a-zA-Z]/.test(c)) { out.push({ t: 'var', n: c.toLowerCase() }); i++; continue; }
    if ('+-*/^()√'.includes(c)) { out.push({ t: 'op', v: c }); i++; continue; }
    if (c === '[' || c === '{') { out.push({ t: 'op', v: '(' }); i++; continue; }
    if (c === ']' || c === '}') { out.push({ t: 'op', v: ')' }); i++; continue; }
    return null; // something we can't read
  }
  return out;
}

/** Parse an expression; returns null if it can't be read */
export function parseExpr(raw: string): Node | null {
  let s = normaliseExpr(raw);
  // an answer like "x = (y - 4)/3" or "y = 2x + 1": keep the right-hand side
  const eq = s.split('=');
  if (eq.length === 2 && /^\s*[a-zA-Z]\s*$/.test(eq[0])) s = eq[1];
  else if (eq.length > 1) return null;
  const read = tokenize(s);
  if (!read || !read.length) return null;
  const toks: Tok[] = read;
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v: string) => peek()?.t === 'op' && (peek() as { v: string }).v === v;

  function expr(): Node | null {
    let left = term();
    if (!left) return null;
    while (isOp('+') || isOp('-')) {
      const op = (toks[p++] as { v: string }).v;
      const right = term();
      if (!right) return null;
      left = { k: op === '+' ? 'add' : 'sub', a: left, b: right };
    }
    return left;
  }
  // a term: factors joined by *, / or written side by side (3x, 2(x+1), (x+1)(x-2), 2√3)
  function term(): Node | null {
    let left = unary();
    if (!left) return null;
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = (toks[p++] as { v: string }).v;
        const right = unary();
        if (!right) return null;
        left = { k: op === '*' ? 'mul' : 'div', a: left, b: right };
        continue;
      }
      const t = peek();
      if (t && (t.t === 'num' || t.t === 'var' || (t.t === 'op' && (t.v === '(' || t.v === '√')))) {
        const right = power();
        if (!right) return null;
        left = { k: 'mul', a: left, b: right };
        continue;
      }
      return left;
    }
  }
  function unary(): Node | null {
    if (isOp('-')) { p++; const a = unary(); return a ? { k: 'neg', a } : null; }
    if (isOp('+')) { p++; return unary(); }
    return power();
  }
  function power(): Node | null {
    const base = primary();
    if (!base) return null;
    if (isOp('^')) {
      p++;
      const e = unary();
      if (!e) return null;
      return { k: 'pow', a: base, b: e };
    }
    return base;
  }
  function primary(): Node | null {
    const t = peek();
    if (!t) return null;
    if (t.t === 'num') { p++; return { k: 'num', v: t.v }; }
    if (t.t === 'var') { p++; return { k: 'var', n: t.n }; }
    if (t.v === '(') {
      p++;
      const e = expr();
      if (!e || !isOp(')')) return null;
      p++;
      return e;
    }
    if (t.v === '√') {
      p++;
      // √ applies to the next number, letter or bracket (√12, √x, √(x + 1))
      const a = power();
      return a ? { k: 'sqrt', a } : null;
    }
    return null;
  }
  const tree = expr();
  return tree && p === toks.length ? tree : null;
}

export function evaluate(n: Node, env: Record<string, number>): number {
  switch (n.k) {
    case 'num': return n.v;
    case 'var': return env[n.n] ?? NaN;
    case 'add': return evaluate(n.a, env) + evaluate(n.b, env);
    case 'sub': return evaluate(n.a, env) - evaluate(n.b, env);
    case 'mul': return evaluate(n.a, env) * evaluate(n.b, env);
    case 'div': return evaluate(n.a, env) / evaluate(n.b, env);
    case 'pow': return evaluate(n.a, env) ** evaluate(n.b, env);
    case 'neg': return -evaluate(n.a, env);
    case 'sqrt': return Math.sqrt(evaluate(n.a, env));
  }
}

export function varsOf(n: Node, out = new Set<string>()): Set<string> {
  if (n.k === 'var') out.add(n.n);
  else if (n.k === 'neg' || n.k === 'sqrt') varsOf(n.a, out);
  else if (n.k !== 'num') { varsOf(n.a, out); varsOf(n.b, out); }
  return out;
}

/** Are two expressions equal for every value of their letters? (checked at many random values) */
export function equivalent(a: Node, b: Node): boolean {
  const vars = [...new Set([...varsOf(a), ...varsOf(b)])];
  let checked = 0;
  for (let i = 0; i < 40 && checked < 8; i++) {
    const env: Record<string, number> = {};
    // positive values keep square roots real; varied magnitudes catch coefficient slips
    for (const v of vars) env[v] = 0.37 + ((i * 7 + v.charCodeAt(0) * 13) % 29) / 6.1 + i * 0.011;
    const x = evaluate(a, env), y = evaluate(b, env);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    checked++;
    if (Math.abs(x - y) > 1e-7 * Math.max(1, Math.abs(x), Math.abs(y))) return false;
  }
  return checked >= 3;
}

// ---------- polynomials (for "expanded and simplified" and "fully factorised") ----------
type Poly = Map<string, number>; // monomial key ("x^2*y") -> coefficient
const monoKey = (m: Record<string, number>) => Object.keys(m).filter((k) => m[k]).sort().map((k) => (m[k] === 1 ? k : `${k}^${m[k]}`)).join('*') || '1';
const parseKey = (k: string): Record<string, number> => (k === '1' ? {} : Object.fromEntries(k.split('*').map((p) => { const [v, e] = p.split('^'); return [v, Number(e ?? 1)]; })));
function pAdd(a: Poly, b: Poly, sign = 1): Poly {
  const r = new Map(a);
  for (const [k, v] of b) r.set(k, (r.get(k) ?? 0) + sign * v);
  for (const [k, v] of r) if (Math.abs(v) < 1e-12) r.delete(k);
  return r;
}
function pMul(a: Poly, b: Poly): Poly {
  let r: Poly = new Map();
  for (const [ka, va] of a) for (const [kb, vb] of b) {
    const m = parseKey(ka), n = parseKey(kb);
    for (const [v, e] of Object.entries(n)) m[v] = (m[v] ?? 0) + e;
    r = pAdd(r, new Map([[monoKey(m), va * vb]]));
  }
  return r;
}
/** Expand into a polynomial, or null if it isn't one (square roots of letters, dividing by a letter...) */
export function toPoly(n: Node): Poly | null {
  switch (n.k) {
    case 'num': return new Map([['1', n.v]]);
    case 'var': return new Map([[n.n, 1]]);
    case 'add': case 'sub': { const a = toPoly(n.a), b = toPoly(n.b); return a && b ? pAdd(a, b, n.k === 'add' ? 1 : -1) : null; }
    case 'mul': { const a = toPoly(n.a), b = toPoly(n.b); return a && b ? pMul(a, b) : null; }
    case 'neg': { const a = toPoly(n.a); return a ? pMul(a, new Map([['1', -1]])) : null; }
    case 'div': { const a = toPoly(n.a), b = toPoly(n.b); if (!a || !b || b.size !== 1 || !b.has('1')) return null; const d = b.get('1')!; return pMul(a, new Map([['1', 1 / d]])); }
    case 'pow': {
      const a = toPoly(n.a), b = toPoly(n.b);
      if (!a || !b || b.size !== 1 || !b.has('1')) return null;
      const e = b.get('1')!;
      if (!Number.isInteger(e) || e < 0 || e > 8) return null;
      let r: Poly = new Map([['1', 1]]);
      for (let i = 0; i < e; i++) r = pMul(r, a);
      return r;
    }
    case 'sqrt': { const a = toPoly(n.a); if (!a || a.size !== 1 || !a.has('1')) return null; const v = Math.sqrt(a.get('1')!); return Number.isInteger(v) ? new Map([['1', v]]) : null; }
  }
}

const isSum = (n: Node): boolean => n.k === 'add' || n.k === 'sub' || (n.k === 'neg' && isSum(n.a));
const terms = (n: Node): Node[] => (n.k === 'add' || n.k === 'sub' ? [...terms(n.a), ...terms(n.b)] : [n]);

/** Written as a sum of single terms with no brackets left, and no like terms still to collect */
function isExpandedSimplified(n: Node): boolean {
  const noBrackets = (x: Node): boolean => {
    if (x.k === 'mul' || x.k === 'div') return !isSum(x.a) && !isSum(x.b) && noBrackets(x.a) && noBrackets(x.b);
    if (x.k === 'pow') return !isSum(x.a) && noBrackets(x.a);
    if (x.k === 'neg') return !isSum(x.a) && noBrackets(x.a);
    if (x.k === 'add' || x.k === 'sub') return noBrackets(x.a) && noBrackets(x.b);
    return true;
  };
  if (!noBrackets(n)) return false;
  const ts = terms(n);
  const keys = ts.map((t) => { const p = toPoly(t); return p ? [...p.keys()].join('|') : 'x'; });
  return new Set(keys).size === keys.length; // e.g. 3x + 2x is not simplified
}

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));

/** A product of factors where no factor can be factorised further */
function isFullyFactorised(n: Node): boolean {
  let x = n;
  while (x.k === 'neg') x = x.a;
  const factors: Node[] = [];
  const collect = (f: Node) => { if (f.k === 'mul') { collect(f.a); collect(f.b); } else factors.push(f); };
  collect(x);
  if (x.k === 'pow' && isSum(x.a)) factors.splice(0, factors.length, x.a);
  if (factors.length < 2 && !(x.k === 'pow' && isSum(x.a))) return false;
  for (const f0 of factors) {
    const f = f0.k === 'pow' ? f0.a : f0;
    if (!isSum(f)) continue;
    const p = toPoly(f);
    if (!p) return false;
    const coeffs = [...p.values()];
    if (coeffs.every(Number.isInteger) && coeffs.reduce((g, c) => gcd(g, c), 0) > 1) return false; // a number still to take out
    const keys = [...p.keys()];
    const vars = new Set(keys.flatMap((k) => Object.keys(parseKey(k))));
    for (const v of vars) if (keys.every((k) => (parseKey(k)[v] ?? 0) >= 1)) return false; // a letter in every term
    // a quadratic in one letter with whole-number roots still factorises (x² + 5x + 6, x² − 9)
    if (vars.size === 1) {
      const [v] = [...vars];
      const deg = Math.max(...keys.map((k) => parseKey(k)[v] ?? 0));
      if (deg === 2) {
        const a = p.get(`${v}^2`) ?? 0, b = p.get(v) ?? 0, c = p.get('1') ?? 0;
        const disc = b * b - 4 * a * c;
        if (disc >= 0 && Number.isInteger(Math.sqrt(disc)) && [a, b, c].every(Number.isInteger)) return false;
      }
    }
  }
  return true;
}

const squareFree = (n: number) => { for (let k = 2; k * k <= n; k++) if (n % (k * k) === 0) return false; return true; };
/** Surds in simplest form: every square root holds a whole number with no square factor, none on the bottom of a fraction, no like surds left to collect */
function isSimplestSurd(n: Node): boolean {
  let ok = true;
  const walk = (x: Node, inDenominator = false) => {
    if (x.k === 'sqrt') {
      if (inDenominator) ok = false;
      const p = toPoly(x.a);
      const v = p && p.size === 1 && p.has('1') ? p.get('1')! : null;
      if (v === null || !Number.isInteger(v) || v < 2 || !squareFree(v)) ok = false;
      return;
    }
    if (x.k === 'div') { walk(x.a, inDenominator); walk(x.b, true); return; }
    if (x.k === 'neg') { walk(x.a, inDenominator); return; }
    if (x.k !== 'num' && x.k !== 'var') { walk(x.a, inDenominator); walk(x.b, inDenominator); }
  };
  walk(n);
  if (!ok) return false;
  // like surds collected: 2√3 + √3 is not simplest
  const radicands = terms(n).map((t) => { const r: number[] = []; const f = (x: Node) => { if (x.k === 'sqrt') { const p = toPoly(x.a); r.push(p?.get('1') ?? -1); } else if (x.k !== 'num' && x.k !== 'var') { f(x.a); if ('b' in x) f(x.b); } }; f(t); return r.sort().join(',') || 'rational'; });
  return new Set(radicands).size === radicands.length;
}

export interface AlgebraCheck { ok: boolean; equal: boolean; formOk: boolean; parsed: boolean; message?: string }

/** Mark a typed algebra answer */
export function checkAlgebra(input: string, answer: string, form: AlgebraForm = 'any'): AlgebraCheck {
  const a = parseExpr(input);
  if (!a) return { ok: false, equal: false, formOk: false, parsed: false, message: "I couldn't read that. Use x^2 or x² for powers, brackets for multiplying, and √ for square roots." };
  const b = parseExpr(answer);
  if (!b) return { ok: false, equal: false, formOk: false, parsed: true };
  const equal = equivalent(a, b);
  if (!equal) return { ok: false, equal, formOk: false, parsed: true };
  const formOk = form === 'any' ? true : form === 'factorised' ? isFullyFactorised(a) : form === 'expanded' ? isExpandedSimplified(a) : isSimplestSurd(a);
  const message = formOk ? undefined
    : form === 'factorised' ? "That's equal to the right answer, but it isn't fully factorised – take out every common factor (numbers and letters), or factorise each bracket further."
    : form === 'expanded' ? "That's equal to the right answer, but it isn't expanded and simplified – multiply out every bracket and collect like terms."
    : "That's equal to the right answer, but not in simplest surd form – take square factors out of the root and rationalise any denominator.";
  return { ok: formOk, equal, formOk, parsed: true, message };
}

/** Show an expression the way it would be written (x^2 → x², * → ×, implicit multiplication kept) */
export function prettyExpr(raw: string): string {
  return normaliseExpr(raw)
    .replace(/\^\((-?\d+)\)/g, (_, d: string) => [...d].map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(c)] ?? '⁻').join(''))
    .replace(/\^(-?\d+)/g, (_, d: string) => [...d].map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(c)] ?? '⁻').join(''))
    .replace(/\*/g, '×').replace(/-/g, '−').replace(/pi/g, 'π').replace(/\s*([+−×/=])\s*/g, ' $1 ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim();
}
