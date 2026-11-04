// Answer checking that is forgiving of formatting and small typos, but strict on meaning.

export function normalise(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/×/g, 'x')
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/√/g, 'root')
    .replace(/−/g, '-')
    .replace(/[^a-z0-9.\-+/=<>^%£$'() ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^(the|a|an) /, '')
    .trim();
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

/** Text answer check: exact after normalising, or within a small typo budget for longer words */
export function checkText(input: string, accept: string[]): { ok: boolean; close: boolean } {
  const a = normalise(input).replace(/\s/g, '');
  if (!a) return { ok: false, close: false };
  let close = false;
  for (const acc of accept) {
    const b = normalise(acc).replace(/\s/g, '');
    if (a === b) return { ok: true, close: false };
    // numeric-looking answers must match exactly
    if (/^[-\d.,/]+$/.test(b)) continue;
    const budget = b.length >= 10 ? 2 : b.length >= 5 ? 1 : 0;
    const dist = levenshtein(a, b);
    if (dist <= budget) return { ok: true, close: true };
    if (dist <= budget + 2) close = true;
  }
  return { ok: false, close };
}

/** Parse "3/4", "-2.5", "1,200", "2 1/2", "45%", "£3.20", "3.0 x 10^4", "3e4" */
export function parseNumber(raw: string): number | null {
  let s = raw.trim().toLowerCase().replace(/[£$€,\s]/g, ' ').replace(/−/g, '-').trim();
  if (!s) return null;
  s = s.replace(/%$/, '').trim();
  // standard form 3.2 x 10^4 / 3.2×10^-4 / 3.2*10^4
  const sf = s.match(/^(-?\d*\.?\d+)\s*[x×*]\s*10\s*\^\s*(-?\d+)$/);
  if (sf) return parseFloat(sf[1]) * 10 ** parseInt(sf[2], 10);
  // mixed number "2 1/2"
  const mixed = s.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixed) {
    const whole = parseInt(mixed[1], 10);
    const frac = parseInt(mixed[2], 10) / parseInt(mixed[3], 10);
    return whole < 0 ? whole - frac : whole + frac;
  }
  const frac = s.match(/^(-?\d*\.?\d+)\s*\/\s*(-?\d*\.?\d+)$/);
  if (frac) {
    const d = parseFloat(frac[2]);
    return d === 0 ? null : parseFloat(frac[1]) / d;
  }
  const cleaned = s.replace(/\s+/g, '');
  if (/^-?\d*\.?\d+(e-?\d+)?$/.test(cleaned)) return parseFloat(cleaned);
  // allow a trailing unit e.g. "12 cm" / "4.5n"
  const withUnit = s.match(/^(-?\d*\.?\d+(?:e-?\d+)?)\s*[a-zµ°/²³]+[a-z0-9µ°/²³^ ]*$/);
  if (withUnit) return parseFloat(withUnit[1]);
  return null;
}

export function checkNumber(input: string, answer: number, tol?: number): { ok: boolean; close: boolean; parsed: number | null } {
  const v = parseNumber(input);
  if (v === null) return { ok: false, close: false, parsed: null };
  const t = tol ?? Math.max(Math.abs(answer) * 0.001, 1e-9);
  const diff = Math.abs(v - answer);
  if (diff <= t + 1e-12) return { ok: true, close: false, parsed: v };
  // "close" = right digits, wrong rounding or out by a power of 10 (a common slip worth flagging)
  const ratio = answer !== 0 ? v / answer : 0;
  const powerOfTen = [10, 100, 1000, 0.1, 0.01, 0.001].some((p) => Math.abs(ratio - p) < 1e-6);
  const near = diff <= Math.max(t * 10, Math.abs(answer) * 0.02);
  return { ok: false, close: near || powerOfTen, parsed: v };
}

/** Cloze: split text into parts and blanks */
export function parseCloze(text: string): { parts: string[]; blanks: string[][] } {
  const parts: string[] = [];
  const blanks: string[][] = [];
  const re = /\{\{([^}]+)\}\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    parts.push(text.slice(last, m.index));
    blanks.push(m[1].split('|').map((x) => x.trim()));
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last));
  return { parts, blanks };
}

export interface SelectToken { text: string; pickable: boolean; /** index of the target phrase this word belongs to, or -1 */ group: number }

/** Split a "tap the words" passage into word tokens. Words inside [[...]] belong to a target phrase. */
export function parseSelect(text: string): SelectToken[] {
  const out: SelectToken[] = [];
  let group = -1, groups = 0;
  const pushWords = (chunk: string, g: number) => {
    for (const part of chunk.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { out.push({ text: part, pickable: false, group: -1 }); continue; }
      const m = part.match(/^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u);
      if (!m || !m[2]) { out.push({ text: part, pickable: false, group: -1 }); continue; }
      if (m[1]) out.push({ text: m[1], pickable: false, group: -1 });
      out.push({ text: m[2], pickable: true, group: g });
      if (m[3]) out.push({ text: m[3], pickable: false, group: -1 });
    }
  };
  for (const part of text.split(/(\[\[[^\]]+\]\])/)) {
    if (!part) continue;
    if (part.startsWith('[[')) { group = groups++; pushWords(part.slice(2, -2), group); } else pushWords(part, -1);
  }
  return out;
}

/** Check a selection: every target phrase needs at least one of its words picked, and no other words. */
export function checkSelect(tokens: SelectToken[], picked: Set<number>) {
  const groups = new Set(tokens.filter((t) => t.group >= 0).map((t) => t.group));
  const found = new Set([...picked].map((i) => tokens[i]?.group).filter((g): g is number => g !== undefined && g >= 0));
  const extra = [...picked].filter((i) => tokens[i] && tokens[i].group < 0).length;
  return { ok: found.size === groups.size && extra === 0, found: found.size, total: groups.size, extra };
}
