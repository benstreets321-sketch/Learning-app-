import { useMemo, useState } from 'react';
import type { QItem, Topic } from '../content/types';
import type { Confidence } from '../lib/engine';
import { checkNumber, checkText, parseCloze } from '../lib/answer';
import { shuffle } from '../lib/util';
import { Markdown } from './Markdown';
import { StuckPanel } from './StuckPanel';

export interface QuestionResult {
  correct: boolean;
  conf?: Confidence;
  hints: number;
}

interface Props {
  item: QItem;
  topic?: Topic;
  onDone: (r: QuestionResult) => void;
  /** Called the moment the answer is checked (before Next) so progress is saved even if the user leaves */
  onChecked?: (r: QuestionResult) => void;
  nextLabel?: string;
}

const CONF: { id: Confidence; label: string; title: string }[] = [
  { id: 'sure', label: 'Sure', title: 'I know this' },
  { id: 'unsure', label: 'Think so', title: 'Fairly confident' },
  { id: 'guess', label: 'Guessing', title: 'Not really sure' },
];

export function QuestionCard({ item, topic, onDone, onChecked, nextLabel = 'Next question' }: Props) {
  // Shuffle presentation order once per question
  const order = useMemo(() => {
    if (item.type === 'mcq' || item.type === 'multi') return shuffle(item.options.map((_, i) => i));
    return [];
  }, [item]);
  const orderItems = useMemo(() => (item.type === 'order' ? shuffleNotSorted(item.items) : []), [item]);
  const matchRight = useMemo(() => (item.type === 'match' ? shuffle(item.pairs.map((p) => p[1])) : []), [item]);
  const cloze = useMemo(() => (item.type === 'cloze' ? parseCloze(item.text) : null), [item]);

  const [choice, setChoice] = useState<number | null>(null);
  const [multiSel, setMultiSel] = useState<Set<number>>(new Set());
  const [tfChoice, setTfChoice] = useState<boolean | null>(null);
  const [text, setText] = useState('');
  const [seq, setSeq] = useState<string[]>(orderItems);
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [blanks, setBlanks] = useState<string[]>(() => (cloze ? cloze.blanks.map(() => '') : []));
  const [conf, setConf] = useState<Confidence>('unsure');
  const [hints, setHints] = useState(0);
  const [stuckOpen, setStuckOpen] = useState(false);
  const [result, setResult] = useState<null | { correct: boolean; close?: boolean; detail?: string }>(null);
  const [overridden, setOverridden] = useState(false);

  const answered = result !== null;

  function canCheck(): boolean {
    switch (item.type) {
      case 'mcq': return choice !== null;
      case 'multi': return multiSel.size > 0;
      case 'tf': return tfChoice !== null;
      case 'num':
      case 'text': return text.trim().length > 0;
      case 'order': return true;
      case 'match': return Object.keys(matches).length === item.pairs.length;
      case 'cloze': return blanks.every((b) => b.trim().length > 0);
    }
  }

  function check() {
    let correct = false;
    let close = false;
    let detail: string | undefined;
    switch (item.type) {
      case 'mcq':
        correct = choice === item.answer;
        if (!correct && choice !== null && item.fb?.[choice]) detail = item.fb[choice];
        break;
      case 'multi': {
        const want = new Set(item.answers);
        correct = want.size === multiSel.size && [...want].every((a) => multiSel.has(a));
        if (!correct) {
          const missed = [...want].filter((a) => !multiSel.has(a)).length;
          const extra = [...multiSel].filter((a) => !want.has(a)).length;
          detail = `${missed ? `You missed ${missed} correct option${missed > 1 ? 's' : ''}. ` : ''}${extra ? `${extra} option${extra > 1 ? 's' : ''} you picked ${extra > 1 ? 'are' : 'is'} wrong.` : ''}`;
        }
        break;
      }
      case 'tf':
        correct = tfChoice === item.answer;
        break;
      case 'num': {
        const r = checkNumber(text, item.answer, item.tol);
        correct = r.ok;
        close = r.close;
        if (r.parsed === null) detail = "I couldn't read that as a number - try digits like 12.5, -3 or 3/4.";
        else if (close) detail = 'Very close - check your rounding, units or place value (powers of 10).';
        break;
      }
      case 'text': {
        const r = checkText(text, item.accept);
        correct = r.ok;
        close = r.close;
        if (r.ok && r.close) detail = 'Accepted - but check your spelling: in the exam spelling of key terms matters.';
        else if (close) detail = 'Close! Check the spelling or the exact term.';
        break;
      }
      case 'order':
        correct = seq.every((s, i) => s === item.items[i]);
        if (!correct) detail = `${seq.filter((s, i) => s === item.items[i]).length} of ${item.items.length} in the right place.`;
        break;
      case 'match':
        correct = item.pairs.every((p, i) => matches[i] === p[1]);
        if (!correct) detail = `${item.pairs.filter((p, i) => matches[i] === p[1]).length} of ${item.pairs.length} matched correctly.`;
        break;
      case 'cloze': {
        const res = cloze!.blanks.map((acc, i) => checkText(blanks[i], acc).ok);
        correct = res.every(Boolean);
        if (!correct) detail = `${res.filter(Boolean).length} of ${res.length} gaps correct.`;
        break;
      }
    }
    setResult({ correct, close, detail });
    onChecked?.({ correct, conf, hints });
  }

  function overrideCorrect() {
    setOverridden(true);
    setResult((r) => (r ? { ...r, correct: true, detail: 'Marked correct by you - be honest, it only helps you!' } : r));
    onChecked?.({ correct: true, conf, hints: hints + 1 });
  }

  const correctAnswerText = (() => {
    switch (item.type) {
      case 'mcq': return item.options[item.answer];
      case 'multi': return item.answers.map((a) => item.options[a]).join('; ');
      case 'tf': return item.answer ? 'True' : 'False';
      case 'num': return `${formatNum(item.answer)}${item.unit ? ' ' + item.unit : ''}`;
      case 'text': return item.accept[0];
      case 'order': return item.items.map((s, i) => `${i + 1}. ${s}`).join('  ');
      case 'match': return item.pairs.map(([l, r]) => `${l} → ${r}`).join('; ');
      case 'cloze': return cloze!.blanks.map((b) => b[0]).join(', ');
    }
  })();

  const stateClass = answered ? (result!.correct ? 'is-right' : 'is-wrong') : '';

  return (
    <div className={`qcard ${stateClass}`}>
      <div className="qmeta">
        <span className={`diff diff-${item.d}`} title="Difficulty">{'●'.repeat(item.d)}{'○'.repeat(5 - item.d)}</span>
        {item.tier === 'H' && <span className="pill pill-info">Higher</span>}
        {item.generated && <span className="pill pill-plain">Fresh numbers</span>}
        {topic && <span className="qtopic">{topic.title}</span>}
      </div>

      {item.type === 'cloze' ? (
        <div className="qtext">
          {item.q && <Markdown text={item.q} />}
          <p className="cloze">
            {cloze!.parts.map((part, i) => (
              <span key={i}>
                <Markdown text={part} inline />
                {i < cloze!.blanks.length && (
                  <input
                    className={`cloze-in ${answered ? (checkText(blanks[i], cloze!.blanks[i]).ok ? 'ok' : 'bad') : ''}`}
                    value={blanks[i]}
                    disabled={answered}
                    aria-label={`Gap ${i + 1}`}
                    onChange={(e) => setBlanks((b) => b.map((x, j) => (j === i ? e.target.value : x)))}
                    size={Math.max(6, cloze!.blanks[i][0].length + 2)}
                  />
                )}
              </span>
            ))}
          </p>
        </div>
      ) : (
        <div className="qtext"><Markdown text={item.q} /></div>
      )}

      {/* ---------- inputs ---------- */}
      {item.type === 'mcq' && (
        <div className="options">
          {order.map((i) => {
            const isAns = i === item.answer;
            const cls = answered ? (isAns ? 'opt right' : i === choice ? 'opt wrong' : 'opt dim') : choice === i ? 'opt sel' : 'opt';
            return (
              <button key={i} className={cls} disabled={answered} onClick={() => setChoice(i)}>
                <Markdown text={item.options[i]} inline />
              </button>
            );
          })}
        </div>
      )}

      {item.type === 'multi' && (
        <div className="options">
          <p className="muted small">Select all that apply.</p>
          {order.map((i) => {
            const on = multiSel.has(i);
            const isAns = item.answers.includes(i);
            const cls = answered ? (isAns ? 'opt right' : on ? 'opt wrong' : 'opt dim') : on ? 'opt sel' : 'opt';
            return (
              <button
                key={i} className={cls} disabled={answered} aria-pressed={on}
                onClick={() => setMultiSel((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; })}
              >
                <span className="check">{on ? '☑' : '☐'}</span> <Markdown text={item.options[i]} inline />
              </button>
            );
          })}
        </div>
      )}

      {item.type === 'tf' && (
        <div className="options two">
          {[true, false].map((v) => {
            const cls = answered ? (v === item.answer ? 'opt right' : v === tfChoice ? 'opt wrong' : 'opt dim') : tfChoice === v ? 'opt sel' : 'opt';
            return (
              <button key={String(v)} className={cls} disabled={answered} onClick={() => setTfChoice(v)}>
                {v ? 'True' : 'False'}
              </button>
            );
          })}
        </div>
      )}

      {(item.type === 'num' || item.type === 'text') && (
        <div className="answer-row">
          <input
            className="answer-input"
            value={text}
            disabled={answered}
            inputMode={item.type === 'num' ? 'decimal' : 'text'}
            placeholder={item.type === 'num' ? 'Your answer (e.g. 12.5, -3, 3/4)' : 'Type your answer'}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !answered && canCheck()) check(); }}
            aria-label="Your answer"
            autoFocus
          />
          {item.type === 'num' && item.unit && <span className="unit">{item.unit}</span>}
        </div>
      )}

      {item.type === 'order' && (
        <ol className="order-list">
          {seq.map((s, i) => (
            <li key={s} className={answered ? (s === item.items[i] ? 'ok' : 'bad') : ''}>
              <span className="order-text"><Markdown text={s} inline /></span>
              {!answered && (
                <span className="order-btns">
                  <button aria-label="Move up" disabled={i === 0} onClick={() => setSeq((q) => swap(q, i, i - 1))}>▲</button>
                  <button aria-label="Move down" disabled={i === seq.length - 1} onClick={() => setSeq((q) => swap(q, i, i + 1))}>▼</button>
                </span>
              )}
            </li>
          ))}
        </ol>
      )}

      {item.type === 'match' && (
        <div className="match">
          {item.pairs.map(([left, right], i) => (
            <div key={i} className={`match-row ${answered ? (matches[i] === right ? 'ok' : 'bad') : ''}`}>
              <div className="match-left"><Markdown text={left} inline /></div>
              <select
                value={matches[i] ?? ''}
                disabled={answered}
                onChange={(e) => setMatches((m) => ({ ...m, [i]: e.target.value }))}
                aria-label={`Match for ${left}`}
              >
                <option value="">Choose…</option>
                {matchRight.map((r) => (
                  <option key={r} value={r}>{r.replace(/[*_`]/g, '')}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* ---------- actions ---------- */}
      {!answered && (
        <div className="q-actions">
          <div className="conf" role="radiogroup" aria-label="How confident are you?">
            <span className="muted small">How sure?</span>
            {CONF.map((c) => (
              <button key={c.id} role="radio" aria-checked={conf === c.id} title={c.title} className={`chip ${conf === c.id ? 'on' : ''}`} onClick={() => setConf(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="row gap">
            <button className="btn ghost" onClick={() => setStuckOpen((o) => !o)}>
              {stuckOpen ? 'Hide help' : "I'm stuck"}
            </button>
            <button className="btn primary" disabled={!canCheck()} onClick={check}>Check answer</button>
          </div>
        </div>
      )}

      {stuckOpen && !answered && (
        <StuckPanel item={item} topic={topic} hintsUsed={hints} onHint={() => setHints((h) => h + 1)} />
      )}

      {answered && (
        <div className={`feedback ${result!.correct ? 'good' : 'bad'}`} aria-live="polite">
          <div className="fb-head">
            {result!.correct ? (
              <strong>{hints > 0 ? 'Correct - with a little help.' : conf === 'guess' ? 'Correct - lucky guess? It will come back soon to make sure.' : 'Correct!'}</strong>
            ) : (
              <strong>{conf === 'sure' ? 'Not quite - and you were sure. That makes this a high-value fix!' : 'Not quite.'}</strong>
            )}
          </div>
          {result!.detail && <p className="fb-detail">{result!.detail}</p>}
          {!result!.correct && (
            <p className="fb-answer">
              <span className="muted">Correct answer: </span>
              <Markdown text={correctAnswerText ?? ''} inline />
            </p>
          )}
          {'steps' in item && item.steps && item.steps.length > 0 && !item.generated && (
            <ol className="steps">{item.steps.map((s, i) => <li key={i}><Markdown text={s} inline /></li>)}</ol>
          )}
          <div className="fb-why"><Markdown text={item.why} /></div>
          {!result!.correct && (item.type === 'text' || item.type === 'cloze') && !overridden && (
            <button className="btn link small" onClick={overrideCorrect}>My answer means the same - mark it correct</button>
          )}
          {!result!.correct && (
            <p className="muted small">Added to your <strong>Fix-it list</strong>. You'll see it again shortly, then in a few days, to lock it in.</p>
          )}
          <div className="row end">
            <button className="btn primary" autoFocus onClick={() => onDone({ correct: result!.correct, conf, hints: overridden ? hints + 1 : hints })}>
              {nextLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function swap<T>(arr: T[], i: number, j: number): T[] {
  const a = arr.slice();
  [a[i], a[j]] = [a[j], a[i]];
  return a;
}

function shuffleNotSorted(items: string[]): string[] {
  if (items.length < 2) return items.slice();
  for (let k = 0; k < 10; k++) {
    const s = shuffle(items);
    if (s.some((x, i) => x !== items[i])) return s;
  }
  return items.slice().reverse();
}

function formatNum(n: number): string {
  if (Number.isInteger(n)) return n.toLocaleString('en-GB');
  return String(Math.round(n * 1e6) / 1e6);
}
