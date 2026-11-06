import { useEffect, useMemo, useRef, useState } from 'react';
import { activeSubjects, getSubject, questionPool, randomGenerated, visibleTopics } from '../content/registry';
import type { QItem } from '../content/types';
import { getProfile, getProgress, recordAnswer, recordSprint, addStudyTime } from '../lib/store';
import { answerWithUnit, checkNumber } from '../lib/answer';
import { recentPenalty } from '../lib/engine';
import { href, refresh } from '../lib/router';
import { shuffle } from '../lib/util';
import { Markdown } from '../components/Markdown';
import { Icon } from '../components/Icon';
import { ToolBar, resetTools, syncTools, type ToolId } from '../components/Tools';
import { equipmentForQuestion } from '../lib/equipment';

const LENGTH = 90;

/** Quick-fire retrieval: as many short questions as you can in 90 seconds. Builds fluency on facts you already know. */
export function SprintPage({ query }: { query: URLSearchParams }) {
  const profile = getProfile();
  const subjectId = query.get('subject') ?? '';
  const subject = getSubject(subjectId);
  const subjects = subject ? [subject] : activeSubjects(profile);
  const [started, setStarted] = useState(false);

  const deck = useMemo(() => {
    const progress = getProgress();
    const topicIds = subjects.flatMap((s) => visibleTopics(s, profile).map((t) => t.id));
    // prefer topics the student has met, so this is retrieval rather than guessing
    const met = topicIds.filter((t) => (progress.topics[t]?.n ?? 0) > 0 || progress.topics[t]?.notesRead);
    const ids = met.length >= 3 ? met : topicIds;
    const qs = questionPool(ids, profile).filter((q) => {
      if (q.ctx || !('q' in q) || (q.q ?? '').length > 220) return false;
      if (q.type === 'mcq') return q.d <= 3 && q.options.join('').length < 320;
      if (q.type === 'tf') return q.d <= 3;
      if (q.type === 'num') return q.d <= 2;
      return false;
    });
    const gens: QItem[] = [];
    for (const t of shuffle(ids).slice(0, 60)) {
      const g = randomGenerated(t, 1 + Math.floor(Math.random() * 2), profile);
      if (g && (g.type === 'num' || g.type === 'mcq' || g.type === 'tf')) gens.push(g);
    }
    // least recently seen first, so a sprint isn't the same questions as the last one
    const now = Date.now();
    const fresh = qs.map((q) => ({ q, k: recentPenalty(progress.items[q.id], now) + Math.random() * 1.5 })).sort((a, b) => a.k - b.k).map((x) => x.q);
    return shuffle([...fresh.slice(0, 80), ...gens]);
  }, [subjectId]); // eslint-disable-line react-hooks/exhaustive-deps

  const key = subject ? subject.id : 'all';
  const best = getProgress().sprints?.[key] ?? 0;

  if (!started) {
    return (
      <div className="page narrow">
        <a className="small" href={subject ? href(`/s/${subject.id}`, { tab: 'practice' }) : href('/')}>{subject ? subject.name : 'Today'}</a>
        <h1>Sprint{subject ? `: ${subject.short}` : ''}</h1>
        <p className="lead">{LENGTH} seconds. Short questions on topics you have already met. Answer as many as you can - speed and accuracy both count.</p>
        <div className="card pad sprint-intro">
          <ul className="plain">
            <li><strong>Why:</strong> quick recall makes facts automatic, which frees up thinking time for the long questions in the exam.</li>
            <li><strong>Keys:</strong> number keys pick an option, Enter submits a typed answer.</li>
            <li><strong>Wrong answers</strong> go on your Fix-it list.</li>
          </ul>
          <p className="muted small">Personal best: <span className="mono">{best || '-'}</span></p>
        </div>
        {deck.length < 5 ? <p className="muted">Not enough short questions yet – learn a few topics first.</p> : (
          <button className="btn primary big" onClick={() => setStarted(true)}>Start</button>
        )}
      </div>
    );
  }
  return <Run deck={deck} sprintKey={key} best={best} title={subject ? subject.short : 'Mixed'} />;
}

function Run({ deck, sprintKey, best, title }: { deck: QItem[]; sprintKey: string; best: number; title: string }) {
  const [i, setI] = useState(0);
  const [left, setLeft] = useState(LENGTH);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState<null | 'ok' | 'bad'>(null);
  const [text, setText] = useState('');
  const [missed, setMissed] = useState<{ q: QItem; given: string }[]>([]);
  const [done, setDone] = useState(false);
  const [newBest, setNewBest] = useState(false);
  const order = useMemo(() => deck.map((q) => (q.type === 'mcq' ? shuffle(q.options.map((_, k) => k)) : [])), [deck]);
  const shownAt = useRef(Date.now());
  const q = deck[i % deck.length];
  const tools = useMemo(() => equipmentForQuestion(q) as ToolId[], [q]);
  useEffect(() => { syncTools(tools, q.subjectId); }, [tools, q.subjectId]);
  useEffect(() => () => resetTools(), []);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(t);
  }, [done]);
  useEffect(() => {
    if (left <= 0 && !done) {
      setDone(true);
      addStudyTime(LENGTH);
      setNewBest(recordSprint(sprintKey, score));
    }
  }, [left, done, score, sprintKey]);

  const answer = (correct: boolean, given: string) => {
    if (flash || done) return;
    recordAnswer({ id: q.id, topicId: q.topicId, subjectId: q.subjectId, d: q.d, correct, conf: 'unsure', hints: 0, generated: q.generated, snapshot: q.generated ? JSON.stringify({ g: q.id.split(':')[1], s: Number(q.id.split(':')[2]), l: q.d, t: q.topicId }) : undefined });
    if (correct) setScore((s) => s + 1); else setMissed((m) => [...m, { q, given }]);
    setFlash(correct ? 'ok' : 'bad');
    setTimeout(() => { setFlash(null); setText(''); setI((x) => x + 1); shownAt.current = Date.now(); }, correct ? 350 : 900);
  };

  const keyRef = useRef<(e: KeyboardEvent) => void>(() => {});
  keyRef.current = (e) => {
    if (done || flash) return;
    const n = Number(e.key);
    if (q.type === 'mcq' && n >= 1 && n <= q.options.length) { const k = order[i % deck.length][n - 1]; answer(k === q.answer, q.options[k]); }
    if (q.type === 'tf' && (n === 1 || n === 2)) answer((n === 1) === q.answer, n === 1 ? 'True' : 'False');
  };
  useEffect(() => {
    // typing in the calculator or working pad must never answer the question
    const h = (e: KeyboardEvent) => { const t = e.target as HTMLElement; if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) && !t.closest('.drawer')) keyRef.current(e); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  if (done) {
    return (
      <div className="page narrow">
        <p className="eyebrow">Sprint · {title}</p>
        <h1><span className="mono">{score}</span> correct in {LENGTH} seconds</h1>
        <p className="muted">{newBest ? `New personal best (previous ${best}).` : best ? `Personal best: ${Math.max(best, score)}.` : 'First sprint recorded – try to beat it next time.'}</p>
        {missed.length > 0 && (
          <section className="section">
            <h2>Missed ({missed.length})</h2>
            <div className="list">
              {missed.map(({ q: m, given }, k) => (
                <div key={k} className="list-row block-row">
                  <div className="grow">
                    <Markdown text={'q' in m ? m.q ?? '' : ''} inline />
                    <div className="small"><span className="muted">You: {given || '-'}</span> · <strong>Answer: {m.type === 'mcq' ? m.options[m.answer] : m.type === 'tf' ? (m.answer ? 'True' : 'False') : m.type === 'num' ? `${m.answer}${m.unit ? ' ' + m.unit : ''}` : ''}</strong></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="muted small">These are on your Fix-it list.</p>
          </section>
        )}
        <div className="row gap wrap">
          <button className="btn primary" onClick={() => refresh()}>Go again</button>
          {missed.length > 0 && <a className="btn" href={href('/quiz', { scope: 'mistakes', n: Math.min(10, missed.length) })}>Fix the missed ones</a>}
          <a className="btn ghost" href={href('/')}>Today</a>
        </div>
      </div>
    );
  }

  return (
    <div className="page narrow session">
      <div className="session-head">
        <a className="small" href={href('/')}>End</a>
        <span className="small">Sprint · {title}</span>
        <span className="mono small">{score} correct</span>
      </div>
      <div className="sprint-timer" aria-label={`${left} seconds left`}><div style={{ width: `${(left / LENGTH) * 100}%` }} className={left <= 10 ? 'low' : ''} /></div>
      <div className={`qcard sprint-card ${flash === 'ok' ? 'is-right' : flash === 'bad' ? 'is-wrong' : ''}`}>
        <div className="qmeta"><span className="mono">{left}s</span><span className="qtopic">{getSubject(q.subjectId)?.short}</span></div>
        {tools.length > 1 && <div className="q-tools"><ToolBar subjectId={q.subjectId} tools={tools} compact /></div>}
        <div className="qtext"><Markdown text={'q' in q ? q.q ?? '' : ''} /></div>
        {q.type === 'mcq' && (
          <div className="options">
            {order[i % deck.length].map((k, n) => (
              <button key={k} className={`opt ${flash && k === q.answer ? 'right' : ''}`} disabled={!!flash} onClick={() => answer(k === q.answer, q.options[k])}>
                <span className="opt-key mono">{n + 1}</span><Markdown text={q.options[k]} inline />
              </button>
            ))}
          </div>
        )}
        {q.type === 'tf' && (
          <div className="options two">
            {[true, false].map((v) => (
              <button key={String(v)} className={`opt ${flash && v === q.answer ? 'right' : ''}`} disabled={!!flash} onClick={() => answer(v === q.answer, v ? 'True' : 'False')}>{v ? 'True' : 'False'}</button>
            ))}
          </div>
        )}
        {q.type === 'num' && (
          <form className="answer-row" onSubmit={(e) => { e.preventDefault(); if (text.trim()) answer(checkNumber(text, q.answer, q.tol).ok, text); }}>
            <input className="answer-input" autoFocus value={text} onChange={(e) => setText(e.target.value)} inputMode="decimal" aria-label="Your answer" disabled={!!flash} />
            {q.unit && <span className="unit">{q.unit}</span>}
            <button className="btn primary" type="submit"><Icon name="arrow" size={18} /></button>
          </form>
        )}
        {flash === 'bad' && q.type === 'num' && <p className="small fb-detail">Answer: {answerWithUnit(q.answer, q.q, q.unit)}</p>}
      </div>
      <button className="btn ghost small" onClick={() => answer(false, '(skipped)')}>Skip</button>
    </div>
  );
}
