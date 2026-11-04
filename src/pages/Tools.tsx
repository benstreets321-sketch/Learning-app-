import { useEffect, useMemo, useRef, useState } from 'react';
import { getSubject, getTopic, visibleTopics } from '../content/registry';
import { REFERENCE } from '../content/reference';
import { useProfile, useProgress, saveNote } from '../lib/store';
import { href } from '../lib/router';
import { levenshtein, normalise } from '../lib/answer';
import { Markdown } from '../components/Markdown';
import { Empty, Section } from '../components/ui';
import type { Quote } from '../content/types';
import { Calculator, PeriodicTable } from '../components/Tools';

export const TOOL_INFO: Record<string, { title: string; desc: string }> = {
  calculator: { title: 'Calculator', desc: 'Scientific calculator: powers, roots, trig (degrees), standard form, π and Ans – like an exam calculator.' },
  periodic: { title: 'Periodic table', desc: 'The exam data-sheet periodic table. Tap an element for protons, neutrons, electrons and shells.' },
  reference: { title: 'Reference sheet', desc: 'Formulae, equations and must-learn facts – including what IS and ISN\'T given in the exam.' },
  quotes: { title: 'Quote trainer', desc: 'Memorise quotations with progressive deletion: words disappear until you know it by heart.' },
  essay: { title: 'Essay planner', desc: 'Plan a top-band answer: thesis, paragraphs, evidence, analysis and context.' },
  pastq: { title: 'Past question tracker', desc: 'Every question from recent real papers for your texts, by year.' },
  timeline: { title: 'Master timeline', desc: 'Every key date across your units in one place.' },
  practicals: { title: 'Required practicals', desc: 'All the required practicals – method, variables, risks and typical exam questions.' },
  command: { title: 'Command words', desc: 'What "explain", "evaluate", "describe" and others actually ask you to do.' },
  glossary: { title: 'Glossary', desc: 'Every key term and definition in this subject – searchable.' },
  timer: { title: 'Focus timer', desc: '25-minute focus blocks with 5-minute breaks (Pomodoro).' },
};

export function ToolsPage({ tool, query }: { tool?: string; query: URLSearchParams }) {
  const subjectId = query.get('subject') ?? '';
  const subject = getSubject(subjectId);
  const back = subject ? <a className="small" href={href(`/s/${subject.id}`, { tab: 'tools' })}>← {subject.name} toolkit</a> : <a className="small" href="#/">← Home</a>;
  const info = TOOL_INFO[tool ?? ''];
  return (
    <div className="page narrow">
      {back}
      <h1>{info?.title ?? 'Tools'}</h1>
      {tool === 'timer' && <FocusTimer />}
      {tool === 'calculator' && <div className="card pad"><Calculator /></div>}
      {tool === 'periodic' && <div className="card pad"><PeriodicTable /></div>}
      {tool === 'reference' && <ReferenceSheet subjectId={subjectId} />}
      {tool === 'quotes' && <QuoteTrainer subjectId={subjectId} topicId={query.get('topic') ?? ''} />}
      {tool === 'essay' && <EssayPlanner subjectId={subjectId} />}
      {tool === 'pastq' && <PastQuestions subjectId={subjectId} />}
      {tool === 'timeline' && <MasterTimeline subjectId={subjectId} />}
      {tool === 'practicals' && <Practicals subjectId={subjectId} />}
      {tool === 'command' && <CommandWords subjectId={subjectId} />}
      {tool === 'glossary' && <Glossary subjectId={subjectId} />}
      {!info && <Empty title="Choose a tool from a subject's Toolkit tab" />}
    </div>
  );
}

function FocusTimer() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [secs, setSecs] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds] = useState(0);
  const t = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  useEffect(() => {
    if (!running) return;
    t.current = setInterval(() => setSecs((s) => s - 1), 1000);
    return () => clearInterval(t.current);
  }, [running]);
  useEffect(() => {
    if (secs > 0) return;
    if (mode === 'focus') { setRounds((r) => r + 1); setMode('break'); setSecs(((rounds + 1) % 4 === 0 ? 15 : 5) * 60); }
    else { setMode('focus'); setSecs(25 * 60); }
    try { navigator.vibrate?.(300); } catch { /* not supported */ }
  }, [secs, mode, rounds]);
  return (
    <div className="center">
      <p className="muted">{mode === 'focus' ? 'Focus: phone away, one task only.' : 'Break: stand up, stretch, drink some water. Leave your phone.'}</p>
      <div className={`big-timer ${mode}`}>{Math.floor(Math.max(0, secs) / 60)}:{String(Math.max(0, secs) % 60).padStart(2, '0')}</div>
      <div className="row gap center-row">
        <button className="btn primary" onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Start'}</button>
        <button className="btn" onClick={() => { setRunning(false); setMode('focus'); setSecs(25 * 60); }}>Reset</button>
      </div>
      <p className="muted small">Focus blocks completed: {rounds}. Every 4th break is a longer one.</p>
    </div>
  );
}

function ReferenceSheet({ subjectId }: { subjectId: string }) {
  const ref = REFERENCE[subjectId];
  if (!ref) return <Empty title="No reference sheet for this subject" />;
  return <div className="lesson"><Markdown text={ref} /></div>;
}

function stageText(text: string, stage: number): string {
  const words = text.split(/(\s+)/);
  let wi = 0;
  return words
    .map((w) => {
      if (/^\s+$/.test(w)) return w;
      const i = wi++;
      if (stage === 0) return w;
      const hide = stage === 1 ? i % 4 === 3 : stage === 2 ? i % 2 === 1 : true;
      if (!hide) return w;
      if (stage === 3) return w.replace(/^([^A-Za-z]*[A-Za-z])[A-Za-z'’-]*/, '$1_');
      return w.replace(/[A-Za-z'’-]/g, '_');
    })
    .join('');
}

function QuoteTrainer({ subjectId, topicId }: { subjectId: string; topicId: string }) {
  const profile = useProfile();
  const topics = useMemo(() => {
    if (topicId) {
      const r = getTopic(topicId);
      return r ? [r.topic] : [];
    }
    const s = getSubject(subjectId || 'english-literature');
    return s ? visibleTopics(s, profile).filter((t) => t.quotes?.length) : [];
  }, [subjectId, topicId, profile]);
  const quotes: (Quote & { topic: string })[] = topics.flatMap((t) => (t.quotes ?? []).map((q) => ({ ...q, topic: t.title })));
  const [idx, setIdx] = useState(0);
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState('');
  const [checked, setChecked] = useState<number | null>(null);
  if (!quotes.length) return <Empty title="No quotes yet for your texts" />;
  const q = quotes[idx % quotes.length];
  const nextQuote = (d: number) => { setIdx((i) => (i + d + quotes.length) % quotes.length); setStage(0); setTyped(''); setChecked(null); };
  const score = () => {
    const a = normalise(typed), b = normalise(q.text);
    const sim = 1 - levenshtein(a, b) / Math.max(a.length, b.length, 1);
    setChecked(Math.round(sim * 100));
  };
  return (
    <div>
      <p className="muted">Read the quote aloud, then step through the stages – more words vanish each time. Finally, type it from memory. Learn 3-5 a day and revisit them.</p>
      <div className="quote-trainer">
        <div className="muted small">{q.topic}{q.who ? ` · ${q.who}` : ''}{q.where ? ` · ${q.where}` : ''} · {idx % quotes.length + 1}/{quotes.length}</div>
        {stage < 4 ? <p className="qt big">“{stageText(q.text, stage)}”</p> : (
          <>
            <textarea className="essay" rows={3} value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="Type the quote from memory" />
            {checked === null ? <button className="btn primary" onClick={score} disabled={!typed.trim()}>Check</button> : (
              <div className={`feedback ${checked >= 90 ? 'good' : 'bad'}`}>
                <strong>{checked}% match.</strong> {checked >= 90 ? 'You know it.' : 'Nearly – look again and retry.'}
                <p className="qt">“{q.text}”</p>
              </div>
            )}
          </>
        )}
        <div className="row gap wrap">
          {stage < 4 && <button className="btn primary" onClick={() => setStage((s) => s + 1)}>{['Hide some words', 'Hide more', 'First letters only', 'Type it from memory'][stage]}</button>}
          {stage > 0 && <button className="btn" onClick={() => { setStage(0); setChecked(null); }}>Start again</button>}
          <button className="btn ghost" onClick={() => nextQuote(-1)}>← Previous</button>
          <button className="btn ghost" onClick={() => nextQuote(1)}>Next quote →</button>
        </div>
        <details><summary>Why it matters / analysis</summary><Markdown text={q.analysis} /></details>
      </div>
    </div>
  );
}

const ESSAY_FIELDS: { key: string; label: string; help: string }[] = [
  { key: 'question', label: 'The question', help: 'Copy it out and underline the key focus words (e.g. "how", "presents", "ambition").' },
  { key: 'thesis', label: 'Thesis (your big argument in 1-2 sentences)', help: 'A clear, arguable answer that mentions the writer\'s purpose. e.g. "Shakespeare presents ambition as a corrupting force, using Macbeth\'s fall to warn a Jacobean audience..."' },
  { key: 'p1', label: 'Paragraph 1 – idea + evidence + analysis', help: 'Start from the extract (if there is one). Topic sentence about an IDEA → embedded quote → zoom in on a word/technique → effect on reader → link to context/purpose.' },
  { key: 'p2', label: 'Paragraph 2 – development / contrast', help: 'Move through the text: how does this idea change or develop? Use a different part of the text.' },
  { key: 'p3', label: 'Paragraph 3 – the ending / alternative reading', help: 'How is the idea resolved at the end? Offer an alternative interpretation ("Alternatively...", "However, a modern audience might...").' },
  { key: 'context', label: 'Context I\'ll weave in', help: 'Only context that explains the writer\'s choices – not a history lesson.' },
  { key: 'conclusion', label: 'Conclusion', help: 'Return to the writer\'s purpose / message. Don\'t just repeat – say WHY it matters.' },
];

function EssayPlanner({ subjectId }: { subjectId: string }) {
  const progress = useProgress();
  const key = `essay-plan:${subjectId}`;
  const initial = useMemo(() => {
    try { return JSON.parse(progress.notes[key] ?? '{}') as Record<string, string>; } catch { return {}; }
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  const [plan, setPlan] = useState<Record<string, string>>(initial);
  useEffect(() => {
    const h = setTimeout(() => saveNote(key, JSON.stringify(plan)), 500);
    return () => clearTimeout(h);
  }, [plan, key]);
  return (
    <div>
      <p className="muted">Spend about 5 minutes planning in the exam – it is the difference between a list of points and a sustained argument. Practise planning lots of questions quickly: it's one of the best ways to revise English and History.</p>
      {ESSAY_FIELDS.map((f) => (
        <label key={f.key} className="essay-field">
          <strong>{f.label}</strong>
          <span className="muted small">{f.help}</span>
          <textarea rows={f.key.startsWith('p') ? 4 : 2} value={plan[f.key] ?? ''} onChange={(e) => setPlan((p) => ({ ...p, [f.key]: e.target.value }))} />
        </label>
      ))}
      <button className="btn" onClick={() => setPlan({})}>Clear plan</button>
    </div>
  );
}

function PastQuestions({ subjectId }: { subjectId: string }) {
  const profile = useProfile();
  const s = getSubject(subjectId);
  if (!s) return null;
  const topics = visibleTopics(s, profile).filter((t) => t.pastQuestions?.length);
  if (!topics.length) return <Empty title="No past questions for your options yet" />;
  return (
    <div>
      <p className="muted">From real AQA papers (2020 and 2021 were November-only series). Use these to check you could answer on <em>any</em> focus. Exam boards never publish predictions – every character, theme and poem is examinable.</p>
      {topics.map((t) => (
        <Section key={t.id} title={t.title}>
          <table className="table">
            <tbody>{t.pastQuestions!.map((p, i) => <tr key={i}><th>{p.year}</th><td><Markdown text={p.focus} inline />{p.extract && <span className="muted small"> ({p.extract})</span>}</td></tr>)}</tbody>
          </table>
        </Section>
      ))}
    </div>
  );
}

function MasterTimeline({ subjectId }: { subjectId: string }) {
  const profile = useProfile();
  const s = getSubject(subjectId);
  if (!s) return null;
  const topics = visibleTopics(s, profile).filter((t) => t.timeline?.length);
  return (
    <div>
      {topics.map((t) => (
        <Section key={t.id} title={t.title}>
          <ol className="timeline">{t.timeline!.map((e, i) => <li key={i}><span className="tl-date">{e.date}</span><span><Markdown text={e.event} inline /></span></li>)}</ol>
        </Section>
      ))}
    </div>
  );
}

function Practicals({ subjectId }: { subjectId: string }) {
  const profile = useProfile();
  const s = getSubject(subjectId);
  if (!s) return null;
  const topics = visibleTopics(s, profile).filter((t) => t.tags?.includes('Required practical'));
  if (!topics.length) return <Empty title="No required practicals here" />;
  return (
    <div className="topic-list">
      {topics.map((t) => (
        <a key={t.id} className="topic-row" href={href(`/t/${t.id}`)}>
          <span className="topic-main"><span className="topic-title">{t.title}</span><span className="muted small">{t.summary}</span></span>
        </a>
      ))}
    </div>
  );
}

function CommandWords({ subjectId }: { subjectId: string }) {
  const s = getSubject(subjectId);
  if (!s?.commandWords?.length) return <Empty title="No command words listed" />;
  return (
    <table className="table">
      <tbody>{s.commandWords.map((c) => <tr key={c.word}><th>{c.word}</th><td><Markdown text={c.meaning} inline /></td></tr>)}</tbody>
    </table>
  );
}

function Glossary({ subjectId }: { subjectId: string }) {
  const profile = useProfile();
  const [q, setQ] = useState('');
  const s = getSubject(subjectId);
  if (!s) return null;
  const all = visibleTopics(s, profile).flatMap((t) => t.flashcards.map((c) => ({ ...c, topic: t.title })));
  const nq = q.toLowerCase();
  const list = nq ? all.filter((c) => (c.front + ' ' + c.back).toLowerCase().includes(nq)) : all;
  return (
    <div>
      <input className="answer-input" placeholder={`Search ${all.length} terms...`} value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="glossary">
        {list.slice(0, 300).map((c, i) => (
          <div key={i} className="gloss-item">
            <div><Markdown text={c.front} inline /></div>
            <div className="muted"><Markdown text={c.back} inline /></div>
            <div className="muted small">{c.topic}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
