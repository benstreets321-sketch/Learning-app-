import { useEffect, useRef, useState } from 'react';
import { getTopic } from '../content/registry';
import { recordExam, saveDraft, getProgress, addStudyTime } from '../lib/store';
import { href } from '../lib/router';
import { Markdown } from '../components/Markdown';
import { Empty } from '../components/ui';
import { ToolBar } from '../components/Tools';
import { setTutorContext } from '../lib/tutor';
import { aiErrorText, useAIProvider } from '../lib/ai';
import { markWithAI, type AIMark } from '../lib/marking';
import { openTool } from '../components/Tools';
import { Icon } from '../components/Icon';

export function ExamPage({ query }: { query: URLSearchParams }) {
  const topicId = query.get('topic') ?? '';
  const i = Number(query.get('i') ?? 0);
  const ref = getTopic(topicId);
  const eq = ref?.topic.examQuestions?.[i];
  const examId = `${topicId}~${i}`;
  const [text, setText] = useState(() => getProgress().essays[examId]?.text ?? '');
  const [phase, setPhase] = useState<'write' | 'mark' | 'saved'>('write');
  const [ticks, setTicks] = useState<Set<number>>(new Set());
  const [score, setScore] = useState<number | null>(null);
  const [secs, setSecs] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const provider = useAIProvider();
  const [ai, setAi] = useState<AIMark | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiErr, setAiErr] = useState('');

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(timer.current);
  }, [running]);

  useEffect(() => {
    if (!eq) return;
    // save as you type: the store writes within a quarter of a second, and at once if the app is closed
    if (text && text !== getProgress().essays[examId]?.text) saveDraft(examId, text);
  }, [text, examId, eq]);

  useEffect(() => {
    if (ref && eq) setTutorContext({ kind: 'exam', key: examId, eq, topic: ref.topic, subjectId: ref.subject.id, draft: text });
  }, [examId, text]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => setTutorContext(null), []);

  if (!ref || !eq) return <Empty title="Question not found"><a href="#/">Home</a></Empty>;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const suggested = Math.round(eq.time ?? Math.max(2, eq.marks * 1.2));
  const levelScheme = eq.markScheme.some((m) => /\bLevel \d/i.test(m));
  // one mark per point when there are enough points; otherwise (levels or holistic schemes) the proportion met
  const tickScore = !levelScheme && eq.markScheme.length >= eq.marks ? Math.min(eq.marks, ticks.size) : Math.round((ticks.size / Math.max(1, eq.markScheme.length)) * eq.marks);
  const finalScore = score ?? tickScore;
  const runAI = async () => {
    setAiBusy(true); setAiErr('');
    try {
      const r = await markWithAI(eq, ref.subject.name, text);
      setAi(r);
      setTicks(new Set(r.met));
      setScore(r.mark);
    } catch (e) {
      setAiErr(aiErrorText(e));
    } finally {
      setAiBusy(false);
    }
  };

  return (
    <div className="page narrow session" style={{ ['--subj' as string]: ref.subject.color }}>
      <div className="session-head">
        <a className="small" href={href(`/t/${topicId}`, { tab: 'exam' })}>Close</a>
        <span className="small">{ref.subject.short} · {ref.topic.title}</span>
        <span className="small">{eq.marks} marks</span>
      </div>

      <div className="q-tools"><ToolBar subjectId={ref.subject.id} /></div>
      <div className="exam-q-box">
        {eq.meta && <div className="muted small">{eq.meta}</div>}
        <Markdown text={eq.q} />
        <div className="muted small">[{eq.marks} marks] · Suggested time: about {suggested} minutes</div>
      </div>

      {eq.guidance?.length ? (
        <details className="guidance">
          <summary>How to approach this question</summary>
          <ul>{eq.guidance.map((g, k) => <li key={k}><Markdown text={g} inline /></li>)}</ul>
        </details>
      ) : null}

      {phase === 'write' && (
        <>
          <div className="row gap">
            <button className="btn small" onClick={() => setRunning((r) => !r)}>{running ? 'Pause timer' : secs ? 'Resume timer' : 'Start timer'}</button>
            <span className={`timer ${secs > suggested * 60 ? 'over' : ''}`}>{Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')}</span>
            <span className="muted small">{words} words</span>
          </div>
          <textarea className="essay" rows={eq.marks >= 12 ? 18 : eq.marks >= 6 ? 10 : 5} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your answer as you would in the exam. It saves automatically." />
          <div className="row gap end">
            <button className="btn primary" disabled={!text.trim()} onClick={() => { setRunning(false); addStudyTime(secs); setPhase('mark'); }}>I'm done – mark it</button>
          </div>
        </>
      )}

      {phase !== 'write' && (
        <div className="marking">
          <div className="ai-mark card pad">
            {!ai ? (
              <div className="row gap wrap">
                <div className="grow">
                  <strong>Get it marked</strong>
                  <p className="muted small">{provider === 'none' ? 'Mark it yourself below. To have Claude mark it against the mark scheme, add an API key in Settings or open the app inside Claude.' : 'Claude marks your answer against the mark scheme and ticks the points you made. Check its marking – you have the final say.'}</p>
                </div>
                {provider !== 'none' && <button className="btn primary" disabled={aiBusy || phase === 'saved'} onClick={() => void runAI()}>{aiBusy ? 'Marking…' : 'Mark it with AI'}</button>}
              </div>
            ) : (
              <div>
                <div className="row gap wrap">
                  <span className="ai-score mono">{ai.mark}/{eq.marks}</span>
                  <div className="grow">
                    <strong>Suggested mark{ai.level ? ` · ${ai.level}` : ''}</strong>
                    <p className="small" style={{ margin: 0 }}>{ai.comment}</p>
                  </div>
                </div>
                <div className="two-col ai-fb">
                  {ai.strengths.length > 0 && <div><div className="small strong">What went well</div><ul className="small">{ai.strengths.map((x, k) => <li key={k}>{x}</li>)}</ul></div>}
                  {ai.improvements.length > 0 && <div><div className="small strong">Even better if</div><ul className="small">{ai.improvements.map((x, k) => <li key={k}>{x}</li>)}</ul></div>}
                </div>
                <p className="muted small">The ticks below are Claude's suggestion. Adjust them if you disagree, then save. <button className="btn link small" onClick={() => openTool('tutor', ref.subject.id)}><Icon name="message" size={14} /> Ask the tutor about this feedback</button></p>
              </div>
            )}
            {aiErr && <p className="small fb-detail">{aiErr}</p>}
          </div>
          <div className="two-col">
            <div>
              <h3>Your answer</h3>
              <div className="essay-view">{text}</div>
            </div>
            <div>
              <h3>Mark scheme</h3>
              <p className="muted small">{levelScheme ? 'Read the level descriptors and tick every statement your answer genuinely meets. Mark it as strictly as an examiner would.' : 'Tick each point your answer clearly makes. Be strict – would an examiner give it?'}</p>
              {eq.markScheme.map((m, k) => (
                <label key={k} className="tick">
                  <input type="checkbox" disabled={phase === 'saved'} checked={ticks.has(k)} onChange={() => { setScore(null); setTicks((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; }); }} />
                  <Markdown text={m} inline />
                </label>
              ))}
            </div>
          </div>
          {eq.model && (
            <details className="model" open>
              <summary>Model answer</summary>
              <Markdown text={eq.model} />
            </details>
          )}
          <div className="score-row">
            <label>
              Your mark: <strong>{finalScore}</strong> / {eq.marks}
              <input type="range" min={0} max={eq.marks} value={finalScore} disabled={phase === 'saved'} onChange={(e) => setScore(Number(e.target.value))} />
            </label>
            {phase === 'mark' ? (
              <button className="btn primary" onClick={() => { recordExam(topicId, examId, finalScore, eq.marks, text); setPhase('saved'); }}>Save mark</button>
            ) : (
              <span className="pill pill-good">Saved</span>
            )}
          </div>
          {phase === 'saved' && (
            <div className="feedback good">
              <p><strong>Next step:</strong> rewrite your weakest paragraph or point using the mark scheme and model – improving an answer teaches more than writing a new one.</p>
              <div className="row gap wrap">
                <button className="btn" onClick={() => { setPhase('write'); setTicks(new Set()); setScore(null); setSecs(0); }}>Improve my answer</button>
                {(ref.topic.examQuestions?.length ?? 0) > i + 1 && <a className="btn primary" href={href('/exam', { topic: topicId, i: i + 1 })}>Next exam question</a>}
                <a className="btn ghost" href={href(`/t/${topicId}`)}>Back to topic</a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
