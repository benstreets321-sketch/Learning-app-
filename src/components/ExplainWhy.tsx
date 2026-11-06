// The "explain why" box shown after some answers. Optional, quick, and checked straight away.
import { useState } from 'react';
import { checkExplanation, type ExplainResult } from '../lib/explain';
import { recordExplain } from '../lib/store';
import { answerProps, useAppKeyboard } from './AppKeyboard';
import { Markdown } from './Markdown';

export function ExplainWhy({ why, answer, question, reason }: { why: string; answer: string; question: string; reason: string }) {
  const appKb = useAppKeyboard();
  const [text, setText] = useState('');
  const [res, setRes] = useState<ExplainResult | null>(null);
  const check = () => {
    const r = checkExplanation(text, why, answer, question);
    setRes(r);
    recordExplain(r.good);
  };
  return (
    <div className="explain-why">
      <strong className="small">Explain why, in one sentence</strong>
      <span className="muted small">{reason} Saying the reason in your own words makes it stick.</span>
      {!res ? (
        <div className="row gap">
          <input className="answer-input" value={text} onChange={(e) => setText(e.target.value)} {...answerProps('text', appKb)} onKeyDown={(e) => { if (e.key === 'Enter' && text.trim()) check(); }} placeholder="It's this because…" aria-label="Your explanation" />
          <button className="btn small" disabled={!text.trim()} onClick={check}>Check</button>
        </div>
      ) : (
        <div className={`explain-res ${res.good ? 'good' : 'meh'}`}>
          <p className="small">
            {res.good
              ? <>Good reason{res.hit.length ? <>. You mentioned <strong>{res.hit.slice(0, 4).join(', ')}</strong></> : null}.</>
              : <>Close, but the key idea is missing{res.missed.length ? <>. Try to use words like <strong>{res.missed.join(', ')}</strong></> : null}.</>}
          </p>
          <div className="small muted"><Markdown text={`**The reason:** ${why}`} /></div>
        </div>
      )}
    </div>
  );
}
