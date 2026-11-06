import { useEffect, useRef, useState } from 'react';
import { ask, aiErrorText, isPermanent, useAIProvider, type Turn } from '../lib/ai';
import { quickActions, systemFor, useTutorContext } from '../lib/tutor';
import { offlineReply } from '../lib/offline-tutor';
import { Markdown } from './Markdown';
import { Icon } from './Icon';

// Conversations are kept per question/exam for this visit
const history = new Map<string, Turn[]>();

export function Tutor() {
  const c = useTutorContext();
  const provider = useAIProvider();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [streaming, setStreaming] = useState('');
  const [err, setErr] = useState('');
  const ctl = useRef<AbortController | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const offlineHints = useRef(0);
  const key = c?.key ?? '';

  useEffect(() => { setTurns(history.get(key) ?? []); setErr(''); setStreaming(''); offlineHints.current = 0; }, [key]);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [turns, streaming]);
  useEffect(() => () => ctl.current?.abort(), []);

  if (!c) {
    return (
      <div className="tutor-empty">
        <p><strong>Ask the tutor about any question.</strong></p>
        <p className="muted small">Open a question or an exam question and press <em>Ask tutor</em>. It can give clues, explain what a question is asking, show the method, analyse a quote or source, and give feedback on your writing.</p>
      </div>
    );
  }

  const send = async (text: string) => {
    const msg = text.trim();
    if (!msg || busy) return;
    const next: Turn[] = [...turns, { role: 'user', content: msg }];
    setTurns(next); history.set(key, next); setDraft(''); setErr('');
    if (provider === 'none') {
      const reply = offlineReply(c, msg, offlineHints.current++);
      const withReply: Turn[] = [...next, { role: 'assistant', content: reply }];
      setTurns(withReply); history.set(key, withReply);
      return;
    }
    setBusy(true); setStreaming('');
    ctl.current = new AbortController();
    try {
      const reply = await ask({ system: systemFor(c), turns: next.slice(-12), onText: setStreaming, signal: ctl.current.signal });
      const withReply: Turn[] = [...next, { role: 'assistant', content: reply }];
      setTurns(withReply); history.set(key, withReply);
    } catch (e) {
      if (isPermanent(e) || (e as { code?: string }).code === 'none') {
        // Claude isn't available for this visit: answer with the built-in tutor instead
        const reply = offlineReply(c, msg, offlineHints.current++);
        const withReply: Turn[] = [...next, { role: 'assistant', content: reply }];
        setTurns(withReply); history.set(key, withReply);
      } else if ((e as { code?: string }).code !== 'cancelled') setErr(aiErrorText(e));
    } finally {
      setBusy(false); setStreaming('');
    }
  };

  const label = c.kind === 'exam' ? 'this exam question' : c.answered ? 'this answer' : 'this question';
  return (
    <div className="tutor">
      <div className="tutor-head">
        <span className="muted small">Talking about {label}{c.kind === 'question' && !c.answered ? '. No spoilers until you answer' : ''}</span>
        {turns.length > 0 && <button className="btn link small" onClick={() => { setTurns([]); history.delete(key); }}>Clear</button>}
      </div>
      {provider === 'none' && turns.length === 0 && (
        <p className="muted small tutor-note">Built-in tutor: answers come from this app's hints, worked steps, notes and mark schemes. Free, private and works offline.</p>
      )}
      <div className="tutor-log" aria-live="polite">
        {turns.length === 0 && <p className="muted small">Pick a prompt below or type your own question.</p>}
        {turns.map((t, i) => (
          <div key={i} className={`bubble ${t.role}`}>{t.role === 'assistant' ? <Markdown text={t.content} /> : t.content}</div>
        ))}
        {busy && <div className="bubble assistant">{streaming ? <Markdown text={streaming} /> : <span className="muted">Thinking…</span>}</div>}
        {err && <p className="small fb-detail">{err}</p>}
        <div ref={end} />
      </div>
      <div className="chips wrap tutor-chips">
        {quickActions(c).map((q) => (
          <button key={q.label} className="chip" disabled={busy} onClick={() => void send(q.prompt)}>{q.label}</button>
        ))}
      </div>
      <form className="tutor-input" onSubmit={(e) => { e.preventDefault(); void send(draft); }}>
        <textarea
          rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask anything about it…"
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void send(draft); } }}
          aria-label="Message the tutor"
        />
        {busy ? (
          <button type="button" className="btn" onClick={() => ctl.current?.abort()}>Stop</button>
        ) : (
          <button type="submit" className="btn primary" disabled={!draft.trim()} aria-label="Send"><Icon name="arrow" size={18} /></button>
        )}
      </form>
      {provider === 'claude' && <p className="muted tiny">AI can make mistakes. Check important facts against your notes or teacher.</p>}
    </div>
  );
}
