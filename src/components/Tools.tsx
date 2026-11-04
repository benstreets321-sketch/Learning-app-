import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { evaluate, formatResult } from '../lib/calc';
import { ELEMENTS, electronShells, type Element } from '../content/periodic';
import { REFERENCE } from '../content/reference';
import { Markdown } from './Markdown';
import { Icon } from './Icon';
import { Tutor } from './Tutor';

// ---------- tiny store so any page can open the drawer ----------
export type ToolId = 'tutor' | 'calc' | 'table' | 'formula' | 'working';
let state: { open: ToolId | null; subject: string } = { open: null, subject: '' };
const subs = new Set<() => void>();
const set = (s: typeof state) => { state = s; subs.forEach((f) => f()); };
export const openTool = (tool: ToolId, subject = state.subject) => set({ open: tool, subject });
export const closeTools = () => set({ ...state, open: null });
export const useTools = () => useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => state);

/** Which tools make sense for a subject */
export function toolsFor(subjectId: string): ToolId[] {
  const t: ToolId[] = ['tutor'];
  if (['maths', 'statistics', 'chemistry', 'physics', 'biology', 'business'].includes(subjectId)) t.push('calc');
  if (['chemistry', 'physics', 'biology'].includes(subjectId)) t.push('table');
  if (REFERENCE[subjectId]) t.push('formula');
  t.push('working');
  return t;
}

const LABEL: Record<ToolId, string> = { tutor: 'Ask the tutor', calc: 'Calculator', table: 'Periodic table', formula: 'Formula sheet', working: 'Working out' };
const SHORT: Record<ToolId, string> = { tutor: 'Ask tutor', calc: 'Calculator', table: 'Elements', formula: 'Formulae', working: 'Working' };
const ICON: Record<ToolId, string> = { tutor: 'message', calc: 'calc', table: 'table', formula: 'formula', working: 'pencil' };

/** Row of tool buttons to put above a question */
export function ToolBar({ subjectId, compact = false }: { subjectId: string; compact?: boolean }) {
  return (
    <div className="toolbar" role="toolbar" aria-label="Tools">
      {toolsFor(subjectId).map((t) => (
        <button key={t} className={`tool-btn ${t === 'tutor' ? 'tutor-btn' : ''}`} onClick={() => openTool(t, subjectId)} title={LABEL[t]}>
          <Icon name={ICON[t]} size={18} />
          {!compact && <span>{SHORT[t]}</span>}
        </button>
      ))}
    </div>
  );
}

export function ToolDrawer() {
  const s = useTools();
  useEffect(() => {
    if (!s.open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeTools(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [s.open]);
  if (!s.open) return null;
  const tools = toolsFor(s.subject);
  const available: ToolId[] = Array.from(new Set<ToolId>([...tools, s.open]));
  return (
    <aside className={`drawer ${s.open === 'table' ? 'wide' : ''} ${s.open === 'tutor' ? 'is-tutor' : ''}`} role="dialog" aria-label={LABEL[s.open]}>
      <div className="drawer-head">
        <div className="seg" role="tablist">
          {available.map((t) => (
            <button key={t} role="tab" aria-selected={s.open === t} className={`seg-btn ${s.open === t ? 'on' : ''}`} onClick={() => openTool(t)}>
              <Icon name={ICON[t]} size={16} /> <span>{SHORT[t]}</span>
            </button>
          ))}
        </div>
        <button className="icon-btn" onClick={closeTools} aria-label="Close tools"><Icon name="close" /></button>
      </div>
      <div className="drawer-body">
        {s.open === 'tutor' && <Tutor />}
        {s.open === 'calc' && <Calculator />}
        {s.open === 'table' && <PeriodicTable />}
        {s.open === 'formula' && (REFERENCE[s.subject] ? <div className="md-compact"><Markdown text={REFERENCE[s.subject]} /></div> : <p className="muted">No formula sheet for this subject.</p>)}
        {s.open === 'working' && <Working />}
      </div>
    </aside>
  );
}

// ---------- Calculator ----------
let calcMemory = { expr: '', ans: 0, history: [] as { e: string; r: string }[] };

export function Calculator() {
  const [expr, setExpr] = useState(calcMemory.expr);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState('');
  const [ans, setAns] = useState(calcMemory.ans);
  const [history, setHistory] = useState(calcMemory.history);
  const [inv, setInv] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { calcMemory = { expr, ans, history }; }, [expr, ans, history]);

  const insert = (t: string) => { setExpr((e) => e + t); setError(''); input.current?.focus(); };
  const run = () => {
    if (!expr.trim()) return;
    try {
      const v = evaluate(expr, ans);
      const r = formatResult(v);
      setResult(r); setAns(v); setError('');
      setHistory((h) => [{ e: expr, r }, ...h].slice(0, 6));
    } catch (err) {
      setError((err as Error).message === 'Incomplete' ? 'The calculation is incomplete' : (err as Error).message);
    }
  };
  const useInAnswer = () => {
    if (!result) return;
    window.dispatchEvent(new CustomEvent('tool-insert', { detail: String(Math.round(ans * 1e10) / 1e10) }));
  };

  const keys: [string, () => void, string?][] = [
    [inv ? 'sin⁻¹' : 'sin', () => insert(inv ? 'asin(' : 'sin('), 'fn'], [inv ? 'cos⁻¹' : 'cos', () => insert(inv ? 'acos(' : 'cos('), 'fn'], [inv ? 'tan⁻¹' : 'tan', () => insert(inv ? 'atan(' : 'tan('), 'fn'], ['SHIFT', () => setInv((v) => !v), inv ? 'fn on' : 'fn'], ['DEL', () => setExpr((e) => e.slice(0, -1)), 'del'],
    ['x²', () => insert('²'), 'fn'], ['xʸ', () => insert('^'), 'fn'], ['√', () => insert('√('), 'fn'], ['∛', () => insert('∛('), 'fn'], ['AC', () => { setExpr(''); setResult(''); setError(''); }, 'del'],
    ['(', () => insert('('), 'fn'], [')', () => insert(')'), 'fn'], ['π', () => insert('π'), 'fn'], ['×10ˣ', () => insert('×10^'), 'fn'], ['÷', () => insert('÷'), 'op'],
    ['7', () => insert('7')], ['8', () => insert('8')], ['9', () => insert('9')], ['log', () => insert('log('), 'fn'], ['×', () => insert('×'), 'op'],
    ['4', () => insert('4')], ['5', () => insert('5')], ['6', () => insert('6')], ['ln', () => insert('ln('), 'fn'], ['−', () => insert('-'), 'op'],
    ['1', () => insert('1')], ['2', () => insert('2')], ['3', () => insert('3')], ['%', () => insert('%'), 'fn'], ['+', () => insert('+'), 'op'],
    ['0', () => insert('0')], ['.', () => insert('.')], ['(−)', () => insert('-'), 'fn'], ['Ans', () => insert('Ans'), 'fn'], ['=', run, 'eq'],
  ];

  return (
    <div className="calc">
      <div className="calc-screen">
        <input
          ref={input}
          id="calc-input"
          className="calc-expr"
          value={expr}
          onChange={(e) => { setExpr(e.target.value); setError(''); }}
          onKeyDown={(e) => { if (e.key === 'Enter') run(); }}
          aria-label="Calculation"
          inputMode="none"
          autoComplete="off"
          spellCheck={false}
          placeholder="Type or tap: e.g. 2×π×7"
        />
        <div className={`calc-result ${error ? 'err' : ''}`} aria-live="polite">{error || result || ' '}</div>
      </div>
      <div className="calc-keys">
        {keys.map(([label, fn, cls]) => (
          <button key={label + cls} className={`ck ${cls ?? ''}`} onClick={fn}>{label}</button>
        ))}
      </div>
      <div className="calc-foot">
        <span className="muted small">Angles in degrees · type on your keyboard too</span>
        <button className="btn small" disabled={!result} onClick={useInAnswer}>Put result in my answer</button>
      </div>
      {history.length > 0 && (
        <ul className="calc-history">
          {history.map((h, i) => (
            <li key={i}><button className="link-row" onClick={() => setExpr(h.e)}><span className="mono muted">{h.e}</span><span className="mono">= {h.r}</span></button></li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- Periodic table ----------
export function PeriodicTable() {
  const [sel, setSel] = useState<Element | null>(ELEMENTS.find((e) => e.z === 6) ?? null);
  const groupLabel = (g: number) => (g === 18 ? '0' : g <= 2 ? String(g) : g >= 13 ? String(g - 10) : '');
  return (
    <div className="ptable-wrap">
      <div className="ptable-scroll">
        <div className="ptable" role="grid" aria-label="Periodic table">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((g) => (
            <div key={`g${g}`} className="pt-group" style={{ gridColumn: g, gridRow: 1 }}>{groupLabel(g)}</div>
          ))}
          {ELEMENTS.map((e) => (
            <button
              key={e.z}
              className={`pt-cell k-${e.kind} ${sel?.z === e.z ? 'sel' : ''}`}
              style={{ gridColumn: e.group, gridRow: e.period + 1 }}
              onClick={() => setSel(e)}
              aria-label={`${e.name}, atomic number ${e.z}, relative atomic mass ${e.ar}`}
            >
              <span className="pt-ar">{e.ar}</span>
              <span className="pt-sym">{e.sym}</span>
              <span className="pt-z">{e.z}</span>
            </button>
          ))}
        </div>
      </div>
      {sel && (
        <div className="pt-detail">
          <div className="pt-big"><span className="pt-ar">{sel.ar}</span><span className="pt-sym">{sel.sym}</span><span className="pt-z">{sel.z}</span></div>
          <dl className="pt-facts">
            <dt>Element</dt><dd>{sel.name}</dd>
            <dt>Atomic number</dt><dd>{sel.z} (protons; electrons in an atom)</dd>
            <dt>Relative atomic mass, Aᵣ</dt><dd>{sel.ar}</dd>
            {Number.isInteger(sel.ar) && sel.z <= 92 && <><dt>Neutrons (main isotope)</dt><dd>{Math.round(sel.ar) - sel.z}</dd></>}
            <dt>Group, period</dt><dd>{sel.group === 18 ? '0' : sel.group <= 2 ? sel.group : sel.group >= 13 ? sel.group - 10 : 'transition metal'}, {sel.period}</dd>
            {electronShells(sel.z) && <><dt>Electron arrangement</dt><dd>{electronShells(sel.z)}</dd></>}
          </dl>
          <p className="muted small">Key: top number = relative atomic mass, bottom number = atomic (proton) number – the same layout as the exam data sheet.</p>
        </div>
      )}
    </div>
  );
}

// ---------- Working out (scratch paper) ----------
let workingText = '';
function Working() {
  const [t, setT] = useState(workingText);
  useEffect(() => { workingText = t; }, [t]);
  return (
    <div>
      <p className="muted small">Rough working – like the blank space on an exam paper. Writing each step down makes mistakes easier to spot.</p>
      <textarea id="working-pad" className="working" rows={14} value={t} onChange={(e) => setT(e.target.value)} placeholder={'1. Write the formula\n2. List what you know (with units)\n3. Substitute\n4. Rearrange and calculate'} />
      <button className="btn small ghost" onClick={() => setT('')}>Clear</button>
    </div>
  );
}
