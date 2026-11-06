// The app's own on-screen keyboard for typed answers. On phones and tablets the device keyboard suggests and
// autocorrects words - which gives away spellings and answers - so answer boxes open this keyboard instead
// (inputmode="none" keeps the device keyboard closed while the caret and selection still work normally).
// On computers, answer boxes simply have spellcheck and autocorrect switched off.
import { useEffect, useRef, useState, type InputHTMLAttributes, type PointerEvent as RPointerEvent } from 'react';
import { useProfile } from '../lib/store';

export type KbKind = 'text' | 'num' | 'long' | 'algebra';
type Field = HTMLInputElement | HTMLTextAreaElement;

const touchScreen = () => typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: coarse)').matches && (navigator.maxTouchPoints ?? 0) > 0;

/** Is the app keyboard in use on this device? */
export function useAppKeyboard(): boolean {
  const setting = useProfile().appKeyboard ?? 'auto';
  return setting === 'on' || (setting === 'auto' && touchScreen());
}

/** Props for an answer box: no spellcheck, autocorrect or suggestions, and the app keyboard on touch screens.
 *  `enter` = what the keyboard's action key does: check the answer, or move to the next answer box. */
export function answerProps(kind: KbKind, appKb: boolean, enter: 'check' | 'next' = 'check'): Pick<InputHTMLAttributes<HTMLInputElement>, 'inputMode' | 'autoComplete' | 'autoCorrect' | 'autoCapitalize' | 'spellCheck' | 'enterKeyHint'> & { 'data-kb': KbKind; 'data-kb-enter': string } {
  return {
    'data-kb': kind,
    'data-kb-enter': enter,
    enterKeyHint: enter === 'next' ? 'next' : kind === 'long' ? 'enter' : 'done',
    inputMode: appKb ? 'none' : kind === 'num' ? 'decimal' : 'text',
    autoComplete: 'off',
    autoCorrect: 'off',
    autoCapitalize: kind === 'long' ? 'sentences' : 'off',
    spellCheck: false,
  };
}

const LETTERS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
const SYMBOLS = ['1234567890', '-/:;()£&@"', '.,?!\'%+='];
// maths layer for algebra answers: digits, letters used in algebra, brackets, powers, roots
const MATHPAD = [['7', '8', '9', 'x', 'y', '('], ['4', '5', '6', 'n', 'a', ')'], ['1', '2', '3', '²', '³', '^'], ['0', '.', '+', '−', '×', '/']];
const NUMPAD = [['7', '8', '9', '/'], ['4', '5', '6', '−'], ['1', '2', '3', '^'], ['0', '.', '×10^', '%']];

function insert(el: Field, text: string) {
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  el.setRangeText(text, start, end, 'end');
  el.dispatchEvent(new Event('input', { bubbles: true }));
}
function backspace(el: Field) {
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  if (start !== end) el.setRangeText('', start, end, 'end');
  else if (start > 0) el.setRangeText('', start - 1, start, 'end');
  else return;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

/** Mounted once: appears whenever an answer box is focused on a device using the app keyboard */
export function AppKeyboard() {
  const on = useAppKeyboard();
  const [field, setField] = useState<Field | null>(null);
  const [kind, setKind] = useState<KbKind>('text');
  const [layer, setLayer] = useState<'abc' | '123'>('abc');
  const [shift, setShift] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const repeat = useRef<number | null>(null);
  const fieldRef = useRef<Field | null>(null);
  const close = () => { fieldRef.current = null; setField(null); };

  useEffect(() => {
    if (!on) { close(); return; }
    const open = (target: EventTarget | null) => {
      const el = target as Field | null;
      const k = el?.getAttribute?.('data-kb') as KbKind | null;
      if (!el || !k || (el as HTMLInputElement).disabled || (el as HTMLInputElement).readOnly) return;
      if (fieldRef.current !== el) {
        setKind(k);
        setLayer(k === 'num' || k === 'algebra' ? '123' : 'abc');
        setShift(k === 'long' && !el.value.trim());
      }
      fieldRef.current = el;
      setField(el);
      // keep the box visible above the keyboard
      window.setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'smooth' }), 60);
    };
    const onFocus = (e: FocusEvent) => open(e.target);
    // tapping a box that already has focus (e.g. after "Hide") opens the keyboard again
    const onTap = (e: PointerEvent) => { if (document.activeElement === e.target) open(e.target); };
    document.addEventListener('pointerup', onTap);
    // a box that was focused before the keyboard was ready (autofocus) still gets it
    open(document.activeElement);
    const onBlur = (e: FocusEvent) => {
      // tapping a key never blurs (keys prevent it), so a blur means the student moved elsewhere
      const next = e.relatedTarget as Node | null;
      if (next && panel.current?.contains(next)) return;
      window.setTimeout(() => {
        const a = document.activeElement as Field | null;
        if (!a?.getAttribute?.('data-kb')) close();
      }, 0);
    };
    document.addEventListener('focusin', onFocus);
    document.addEventListener('focusout', onBlur);
    return () => { document.removeEventListener('focusin', onFocus); document.removeEventListener('focusout', onBlur); document.removeEventListener('pointerup', onTap); };
  }, [on]);

  // the page gets room at the bottom so nothing is hidden behind the keyboard
  useEffect(() => {
    document.body.classList.toggle('kb-open', !!field);
    return () => document.body.classList.remove('kb-open');
  }, [field]);

  // a field that is removed or disabled (e.g. after "Check answer") closes the keyboard
  useEffect(() => {
    if (!field) return;
    const t = window.setInterval(() => { if (!field.isConnected || (field as HTMLInputElement).disabled) close(); }, 300);
    return () => window.clearInterval(t);
  }, [field]);

  if (!on || !field) return null;

  const stopRepeat = () => { if (repeat.current) { window.clearTimeout(repeat.current); window.clearInterval(repeat.current); repeat.current = null; } };
  const press = (key: string) => {
    if (key === '⌫') return backspace(field);
    if (key === '⇧') return setShift((s) => !s);
    if (key === 'layer') return setLayer((l) => (l === 'abc' ? '123' : 'abc'));
    if (key === 'hide') { close(); return; }
    if (key === 'enter') {
      if (kind === 'long') return insert(field, '\n');
      if (field.getAttribute('data-kb-enter') === 'next') {
        const all = [...document.querySelectorAll<Field>('[data-kb]')].filter((x) => !(x as HTMLInputElement).disabled);
        const next = all[all.indexOf(field) + 1];
        if (next) { next.focus(); return; }
        close();
        return;
      }
      field.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true, cancelable: true }));
      const form = field.closest('form');
      if (form) form.requestSubmit();
      return;
    }
    const map: Record<string, string> = { space: ' ', '−': '-', '×10^': ' x 10^', '×': kind === 'algebra' ? '×' : '*' };
    let ch = map[key] ?? key;
    if (shift && /^[a-z]$/.test(ch)) { ch = ch.toUpperCase(); setShift(false); }
    insert(field, ch);
    if (kind === 'long' && /[.!?]$/.test(ch)) setShift(true);
  };
  const keyProps = (key: string, label?: string, cls = '') => ({
    key: key + (label ?? ''),
    type: 'button' as const,
    className: `kb-key ${cls}`,
    'aria-label': label ?? key,
    // pointerdown + preventDefault keeps the answer box focused (and the caret where it is)
    onPointerDown: (e: RPointerEvent) => {
      e.preventDefault();
      press(key);
      // hold delete to keep deleting (after a short pause)
      if (key === '⌫') { stopRepeat(); repeat.current = window.setTimeout(() => { repeat.current = window.setInterval(() => backspace(field), 80); }, 420); }
    },
    onPointerUp: stopRepeat,
    onPointerLeave: stopRepeat,
    onPointerCancel: stopRepeat,
  });
  const nextMode = field.getAttribute('data-kb-enter') === 'next';
  const enterLabel = kind === 'long' ? 'New line' : nextMode ? 'Next' : 'Check';

  return (
    <div className="app-kb" ref={panel} role="group" aria-label="Answer keyboard" onPointerDown={(e) => e.preventDefault()}>
      <div className="kb-top">
        <span className="muted small">App keyboard: no autocorrect, as in the exam</span>
        <button {...keyProps('hide', 'Hide keyboard', 'kb-hide')}>Hide ▾</button>
      </div>
      {kind === 'algebra' && layer === '123' ? (
        <div className="kb-num kb-maths">
          {MATHPAD.map((row, r) => (
            <div key={r} className="kb-row">
              {row.map((k) => <button {...keyProps(k, k === '^' ? 'power' : k === '²' ? 'squared' : k === '³' ? 'cubed' : k === '−' ? 'minus' : k === '×' ? 'times' : k)}>{k}</button>)}
            </div>
          ))}
          <div className="kb-row">
            <button {...keyProps('layer', 'Letters', 'kb-fn')}>ABC</button>
            <button {...keyProps('√', 'square root', 'kb-fn')}>√</button>
            <button {...keyProps('π', 'pi', 'kb-fn')}>π</button>
            <button {...keyProps('space', 'Space', 'kb-space')}>space</button>
            <button {...keyProps('⌫', 'Delete', 'kb-fn')}>⌫</button>
            <button {...keyProps('enter', enterLabel, 'kb-enter')}>{enterLabel}</button>
          </div>
        </div>
      ) : kind === 'num' && layer === '123' ? (
        <div className="kb-num">
          {NUMPAD.map((row, r) => (
            <div key={r} className="kb-row">
              {row.map((k) => <button {...keyProps(k, k === '^' ? 'power' : k === '×10^' ? 'times ten to the power' : k)}>{k === '×10^' ? '×10ⁿ' : k}</button>)}
            </div>
          ))}
          <div className="kb-row">
            <button {...keyProps('layer', 'Letters', 'kb-fn')}>ABC</button>
            <button {...keyProps('space', 'Space', 'kb-space')}>space</button>
            <button {...keyProps('⌫', 'Delete', 'kb-fn')}>⌫</button>
            <button {...keyProps('enter', enterLabel, 'kb-enter')}>{enterLabel}</button>
          </div>
        </div>
      ) : (
        <div className="kb-text">
          {(layer === 'abc' ? LETTERS : SYMBOLS).map((row, r) => (
            <div key={r} className="kb-row">
              {r === 2 && layer === 'abc' && <button {...keyProps('⇧', 'Shift', `kb-fn ${shift ? 'on' : ''}`)}>⇧</button>}
              {row.split('').map((k) => <button {...keyProps(k)}>{layer === 'abc' && shift ? k.toUpperCase() : k}</button>)}
              {r === 2 && <button {...keyProps('⌫', 'Delete', 'kb-fn')}>⌫</button>}
            </div>
          ))}
          <div className="kb-row">
            <button {...keyProps('layer', layer === 'abc' ? 'Numbers and symbols' : 'Letters', 'kb-fn')}>{layer === 'abc' ? '123' : 'ABC'}</button>
            <button {...keyProps(',')}>,</button>
            <button {...keyProps('space', 'Space', 'kb-space')}>space</button>
            <button {...keyProps('.')}>.</button>
            <button {...keyProps('enter', enterLabel, 'kb-enter')}>{enterLabel}</button>
          </div>
        </div>
      )}
    </div>
  );
}
