import { useEffect, useMemo, useRef, useState } from 'react';
import { SpellingNotes } from '../components/SpellingNotes';
import { answerProps, useAppKeyboard } from '../components/AppKeyboard';
import type { QItem } from '../content/types';
import { getSubject, getTopic } from '../content/registry';
import { getPaper, getTest, hasOtherTier, papersFor, testMarks, visibleSections } from '../content/mocks';
import type { MockPaper, MockQ, MockTest, MockTool, WrittenQ } from '../content/mocks/types';
import { seedOf } from '../content/mocks/build';
import { getProfile, getProgress, recordAnswer, recordExam, saveMockAttempt, deleteMockAttempt, addStudyTime, updateProfile, useProfile, useProgress, type MockAttempt } from '../lib/store';
import { gradeAuto, isAnswered, isInfoLine, isLevelledScheme, schemeMark, toggleTick, bandOf, type AutoAnswer } from '../lib/grade';
import { keywordCheck, markWithAI } from '../lib/marking';
import { ask, aiErrorText, useAIProvider } from '../lib/ai';
import { setTutorContext } from '../lib/tutor';
import { go, href } from '../lib/router';
import { mulberry32, shuffle } from '../lib/util';
import { Markdown } from '../components/Markdown';
import { Icon } from '../components/Icon';
import { SubjectMark } from '../components/SubjectMark';
import { Empty, ProgressBar } from '../components/ui';
import { ToolBar, openTool, resetTools, toolsFor, type ToolId } from '../components/Tools';
import { answerText } from '../lib/tutor';

const TOOL_NAME: Record<MockTool, string> = { calc: 'Calculator', formula: 'Formulae sheet', table: 'Periodic table', equations: 'Physics equations sheet', working: 'Rough working space' };
const toToolIds = (t: MockTool[]): ToolId[] => [...new Set(t.map((x) => (x === 'equations' ? 'formula' : x) as ToolId))];
const ALL_TOOLS: MockTool[] = ['calc', 'formula', 'equations', 'table'];
const fmtMins = (m: number) => (m >= 60 ? `${Math.floor(m / 60)} hour${m >= 120 ? 's' : ''}${m % 60 ? ` ${m % 60} minutes` : ''}` : `${m} minutes`);
const clock = (s: number) => `${Math.floor(s / 3600) ? Math.floor(s / 3600) + ':' : ''}${String(Math.floor((s % 3600) / 60)).padStart(Math.floor(s / 3600) ? 2 : 1, '0')}:${String(s % 60).padStart(2, '0')}`;
const allQs = (sections: MockTest['sections']) => sections.flatMap((s) => s.questions);
const levelled = (q: WrittenQ) => isLevelledScheme(q.eq.markScheme);
const writtenMark = (q: WrittenQ, ticks: number[]) => schemeMark(q.eq.markScheme, q.marks, ticks);

// =============================== hub ===============================
export function MocksPage() {
  const profile = useProfile();
  const progress = useProgress();
  const papers = papersFor(profile);
  const bySubject = new Map<string, MockPaper[]>();
  for (const p of papers) bySubject.set(p.subjectId, [...(bySubject.get(p.subjectId) ?? []), p]);
  return (
    <div className="page">
      <p className="eyebrow">Mock exams</p>
      <h1>Practice papers</h1>
      <p className="lead">Three full practice papers for every exam you sit, timed to the real paper, with only the equipment you're allowed. Submit to see your marks, what you missed and how to improve.</p>
      <div className="callout callout-tip small">
        <div className="callout-title">About the predictions</div>
        Exam boards never reveal what will come up, and any part of the specification can be examined. These papers follow each board's real structure and are weighted towards themes, characters and topics that haven't been asked recently – a sensible bet, not a guarantee.
      </div>
      {hasOtherTier(profile) && (
        <label className="row gap small">
          <input type="checkbox" checked={!!profile.mockAllTiers} onChange={(e) => updateProfile({ mockAllTiers: e.target.checked })} />
          Show Foundation and Higher papers for every subject (Maths always shows both)
        </label>
      )}
      {[...bySubject.entries()].map(([sid, list]) => {
        const s = getSubject(sid)!;
        return (
          <section key={sid} className="section">
            <h2 className="row gap"><SubjectMark subject={s} size="sm" /> {s.name}</h2>
            <div className="list">
              {list.map((p) => {
                const attempts = Object.entries(progress.mocks ?? {}).filter(([k]) => k.startsWith(`${p.id}-t`)).flatMap(([, v]) => v).filter((a) => a.status !== 'in-progress');
                const best = attempts.reduce((m, a) => Math.max(m, (a.score ?? 0) / a.max), -1);
                return (
                  <a key={p.id} className="list-row" href={href(`/mocks/${p.id}`)}>
                    <span className="grow">
                      <span className="block strong">{p.title}{p.tier && p.tier !== (profile.tiers[p.subjectId] ?? 'H') && <span className="pill tier-pill">{p.tier === 'F' ? 'Foundation' : 'Higher'} practice</span>}</span>
                      <span className="muted small">{p.board} · {fmtMins(p.mins)} · {p.marks} marks</span>
                    </span>
                    {best >= 0 && <span className="mono small">best {Math.round(best * 100)}%</span>}
                    <span className="btn small primary">Try test</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
      {!papers.length && <Empty title="No papers for your subjects yet" />}
    </div>
  );
}

// =============================== paper ===============================
export function MockPaperPage({ paperId }: { paperId: string }) {
  const profile = useProfile();
  const progress = useProgress();
  const paper = getPaper(paperId);
  if (!paper) return <Empty title="Paper not found"><a href={href('/mocks')}>All mock exams</a></Empty>;
  const subject = getSubject(paper.subjectId)!;
  const tests = paper.tests();
  const tools = paper.tools.filter((t) => t !== 'working');
  // only list equipment this subject would normally use (no "periodic table not allowed" on a maths paper)
  const usual = toolsFor(paper.subjectId);
  const notAllowed = ALL_TOOLS.filter((t) => !paper.tools.includes(t) && usual.includes(t === 'equations' ? 'formula' : t) && !(t === 'formula' && paper.tools.includes('equations')) && !(t === 'equations' && (paper.tools.includes('formula') || paper.subjectId !== 'physics')) && !(t === 'formula' && paper.subjectId === 'physics'));
  return (
    <div className="page narrow" style={{ ['--subj' as string]: subject.color }}>
      <a className="small" href={href('/mocks')}>← All mock exams</a>
      <div className="hero-title"><SubjectMark subject={subject} size="lg" /><div><h1>{paper.title}</h1><p className="muted" style={{ margin: 0 }}>{subject.name} · {paper.board}</p></div></div>
      <div className="paper-facts">
        <div><span className="muted small">Time</span><strong>{fmtMins(paper.mins)}</strong></div>
        <div><span className="muted small">Marks</span><strong className="mono">{paper.marks}</strong></div>
        <div><span className="muted small">Allowed</span><strong>{tools.length ? tools.map((t) => TOOL_NAME[t]).join(', ') : 'No equipment'}</strong></div>
        <div><span className="muted small">Not allowed</span><strong>{[...notAllowed.map((t) => TOOL_NAME[t]), 'Hints and tutor'].join(', ')}</strong></div>
      </div>
      <ul className="small paper-info">{paper.info.map((i, k) => <li key={k}>{i}</li>)}</ul>
      {tests.map((t) => {
        const attempts = (progress.mocks?.[t.id] ?? []).slice().reverse();
        const open = attempts.find((a) => a.status === 'in-progress');
        const done = attempts.filter((a) => a.status !== 'in-progress');
        return (
          <section key={t.id} className="card pad test-card">
            <div className="row gap wrap">
              <div className="grow">
                <h2 style={{ margin: 0 }}>{t.title}</h2>
                {t.focus && <p className="muted small" style={{ margin: '0.2rem 0 0' }}>{t.focus}</p>}
                <p className="muted small mono" style={{ margin: '0.2rem 0 0' }}>{testMarks(t, profile)} marks · {fmtMins(paper.mins)}</p>
              </div>
              {open
                ? <a className="btn primary" href={href(`/mock/${t.id}`, { a: open.id })}>Resume ({clock(open.remaining)} left)</a>
                : <a className="btn primary" href={href(`/mock/${t.id}`)}>{done.length ? 'Retry test' : 'Try test'}</a>}
            </div>
            {done.length > 0 && (
              <div className="list attempts">
                {done.map((a) => (
                  <a key={a.id} className="list-row" href={href(`/mock/${t.id}`, { review: a.id })}>
                    <span className="grow small">{new Date(a.finished ?? a.started).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}{a.status === 'submitted' ? ' · written answers to mark' : ''}</span>
                    <span className="mono small">{a.score ?? 0}/{a.max} ({Math.round(((a.score ?? 0) / a.max) * 100)}%)</span>
                    <span className="small">Review</span>
                  </a>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

// =============================== taking a test ===============================
function newAttempt(test: MockTest, paper: MockPaper): MockAttempt {
  return { id: `a${Date.now().toString(36)}`, testId: test.id, started: Date.now(), remaining: paper.mins * 60, status: 'in-progress', answers: {}, marks: {}, ticks: {}, max: testMarks(test, getProfile()) };
}

export function MockTakePage({ testId, attemptId }: { testId: string; attemptId?: string }) {
  const appKb = useAppKeyboard();
  const found = getTest(testId);
  const profile = getProfile();
  const existing = useMemo(() => (getProgress().mocks?.[testId] ?? []).find((a) => (attemptId ? a.id === attemptId : a.status === 'in-progress')), [testId, attemptId]);
  const [attempt, setAttempt] = useState<MockAttempt | null>(existing && existing.status === 'in-progress' ? existing : null);
  const [confirm, setConfirm] = useState(false);
  const attemptRef = useRef(attempt);
  attemptRef.current = attempt;

  useEffect(() => () => resetTools(), []);
  useEffect(() => { setTutorContext(null); }, []);

  // timer: counts down while the page is open; saved regularly so the test can be resumed
  useEffect(() => {
    if (!attempt) return;
    const t = setInterval(() => {
      const a = attemptRef.current;
      if (!a || a.status !== 'in-progress') return;
      const remaining = Math.max(0, a.remaining - 1);
      const next = { ...a, remaining };
      attemptRef.current = next;
      setAttempt(next);
      if (remaining % 10 === 0) saveMockAttempt(next);
      if (remaining === 0) submit(next, true);
    }, 1000);
    const onHide = () => { if (document.visibilityState === 'hidden' && attemptRef.current?.status === 'in-progress') saveMockAttempt(attemptRef.current); };
    document.addEventListener('visibilitychange', onHide);
    return () => { clearInterval(t); document.removeEventListener('visibilitychange', onHide); if (attemptRef.current?.status === 'in-progress') saveMockAttempt(attemptRef.current); };
  }, [attempt?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!found) return <Empty title="Test not found"><a href={href('/mocks')}>All mock exams</a></Empty>;
  const { paper, test } = found;
  const subject = getSubject(paper.subjectId)!;
  const sections = visibleSections(test, profile);
  const qs = allQs(sections);
  const toolIds = toToolIds(paper.tools);

  if (!attempt) {
    return (
      <div className="page narrow" style={{ ['--subj' as string]: subject.color }}>
        <a className="small" href={href(`/mocks/${paper.id}`)}>← {paper.title}</a>
        <p className="eyebrow" style={{ marginTop: '1rem' }}>{subject.name} · {paper.board}</p>
        <h1>{paper.title}</h1>
        <p className="lead">{test.title}</p>
        <div className="exam-cover card pad">
          <h2 style={{ marginTop: 0 }}>Instructions</h2>
          <ul>{paper.info.map((i, k) => <li key={k}>{i}</li>)}</ul>
          <ul>
            <li>The timer starts when you press Start and keeps running while the test is open. When it reaches zero your paper is submitted.</li>
            <li>Only the equipment allowed in the real exam is available: {paper.tools.filter((t) => t !== 'working').map((t) => TOOL_NAME[t].toLowerCase()).join(', ') || 'none'}. There are no hints and no tutor until you submit.</li>
            <li>Your answers save as you go. If you leave, you can resume with the time you had left.</li>
          </ul>
          <button className="btn primary big" onClick={() => { const a = newAttempt(test, paper); saveMockAttempt(a); setAttempt(a); }}>Start – {fmtMins(paper.mins)}</button>
        </div>
      </div>
    );
  }

  const setAnswer = (n: string, v: unknown) => {
    const next = { ...attemptRef.current!, answers: { ...attemptRef.current!.answers, [n]: v } };
    attemptRef.current = next;
    setAttempt(next);
    saveMockAttempt(next);
  };
  const answeredCount = qs.filter((q) => (q.kind === 'auto' ? isAnswered(q.item, attempt.answers[q.n] as AutoAnswer) : String(attempt.answers[q.n] ?? '').trim().length > 0)).length;

  function submit(a: MockAttempt, timedOut = false) {
    if (a.status !== 'in-progress' || attemptRef.current?.status !== 'in-progress') return; // never mark twice
    const marks: Record<string, number> = {};
    const ticks: Record<string, number[]> = {};
    for (const q of allQs(visibleSections(test, getProfile()))) {
      if (q.kind === 'auto') {
        const g = gradeAuto(q.item, a.answers[q.n] as AutoAnswer, q.marks);
        marks[q.n] = g.got;
        recordAnswer({ id: q.item.id, topicId: q.item.topicId, subjectId: q.item.subjectId, d: q.item.d, correct: g.correct, hints: 0, generated: q.item.generated, snapshot: q.item.generated ? JSON.stringify({ g: q.item.id.split(':')[1], s: Number(q.item.id.split(':')[2]), l: q.item.d, t: q.item.topicId }) : undefined });
      } else {
        const text = String(a.answers[q.n] ?? '');
        const r = text.trim() ? keywordCheck(q.eq, text) : null;
        const t = r && !r.levelled ? r.points.filter((p) => p.likely).map((p) => p.index) : [];
        ticks[q.n] = t;
        marks[q.n] = text.trim() ? writtenMark(q, t) : 0;
      }
    }
    const score = Object.values(marks).reduce((x, y) => x + y, 0);
    const used = paper.mins * 60 - a.remaining;
    addStudyTime(Math.max(0, used));
    const done: MockAttempt = { ...a, status: qs.some((q) => q.kind === 'written') ? 'submitted' : 'marked', finished: Date.now(), marks, ticks, score };
    // the screen's own copy becomes the finished attempt first, so closing the screen can't overwrite the result
    attemptRef.current = done;
    setAttempt(done);
    saveMockAttempt(done);
    resetTools();
    go(`/mock/${test.id}`, { review: done.id, ...(timedOut ? { timeout: 1 } : {}) });
  }

  const left = attempt.remaining;
  return (
    <div className="page narrow mock-page" style={{ ['--subj' as string]: subject.color }}>
      <div className="mock-bar">
        <span className="small strong">{subject.short} · {paper.title.split(' – ')[0]}</span>
        <span className={`mono mock-timer ${left < 300 ? 'low' : ''}`} aria-label={`${clock(left)} remaining`}><Icon name="clock" size={16} /> {clock(left)}</span>
        <span className="small muted mono">{answeredCount}/{qs.length} answered</span>
        <a className="small" href={href(`/mocks/${paper.id}`)} onClick={() => { if (attemptRef.current) saveMockAttempt(attemptRef.current); resetTools(); }} title="Your answers and time left are saved – resume from the paper page">Save &amp; exit</a>
        {!confirm
          ? <button className="btn small primary" onClick={() => setConfirm(true)}>Submit</button>
          : <span className="row gap"><span className="small">{qs.length - answeredCount ? `${qs.length - answeredCount} unanswered. ` : ''}Submit now?</span><button className="btn small primary" onClick={() => submit(attempt)}>Yes, submit</button><button className="btn small ghost" onClick={() => setConfirm(false)}>Keep going</button></span>}
      </div>
      {toolIds.length > 0 && <div className="q-tools"><ToolBar subjectId={paper.subjectId} tools={toolIds} /></div>}
      {sections.map((sec, si) => (
        <section key={si} className="mock-section">
          <h2>{sec.title}</h2>
          {sec.intro && <p className="muted small">{sec.intro}</p>}
          {sec.source && <details className="source" open><summary><Icon name="learn" size={16} /> {sec.chooseOne ? 'Read this first' : 'Source material'}</summary><div className="source-body"><Markdown text={sec.source} /></div></details>}
          {sec.chooseOne && <p className="small strong">Answer ONE question from this section.</p>}
          {sec.questions.map((q) => (
            <div key={q.n} className="mock-q">
              <div className="mock-q-head"><span className="mock-n mono">{q.n}</span><span className="muted small mono push">[{q.marks} mark{q.marks === 1 ? '' : 's'}]</span></div>
              {q.kind === 'auto'
                ? <MockAutoInput item={q.item} marks={q.marks} value={attempt.answers[q.n] as AutoAnswer | undefined} onChange={(v) => setAnswer(q.n, v)} />
                : (
                  <div>
                    {q.eq.meta && <p className="muted small">{q.eq.meta}</p>}
                    <Markdown text={q.eq.q} />
                    <textarea className="essay" {...answerProps('long', appKb)} rows={Math.min(24, q.lines ?? Math.max(4, q.marks * 2))} value={String(attempt.answers[q.n] ?? '')} onChange={(e) => setAnswer(q.n, e.target.value)} placeholder={paper.subjectId === 'maths' || paper.subjectId === 'statistics' ? 'Show your working and your final answer…' : 'Write your answer…'} aria-label={`Answer to question ${q.n}`} />
                    <p className="muted small mono">{String(attempt.answers[q.n] ?? '').trim() ? String(attempt.answers[q.n]).trim().split(/\s+/).length : 0} words</p>
                  </div>
                )}
            </div>
          ))}
        </section>
      ))}
      <div className="row end"><button className="btn primary big" onClick={() => setConfirm(true)}>Finish and submit</button></div>
    </div>
  );
}

function MockAutoInput({ item, value, onChange, marks, disabled = false }: { item: QItem; value?: AutoAnswer; onChange: (v: AutoAnswer) => void; marks: number; disabled?: boolean }) {
  const appKb = useAppKeyboard();
  const rand = useMemo(() => mulberry32(seedOf(item.id)), [item.id]);
  const order = useMemo(() => (item.type === 'mcq' || item.type === 'multi' ? shuffle(item.options.map((_, i) => i), rand) : []), [item, rand]);
  const startOrder = useMemo(() => (item.type === 'order' ? (() => { let s = shuffle(item.items, rand); if (s.every((x, i) => x === item.items[i])) s = s.slice().reverse(); return s; })() : []), [item, rand]);
  const right = useMemo(() => (item.type === 'match' ? shuffle(item.pairs.map((p) => p[1]), rand) : []), [item, rand]);
  const v = value ?? {};
  const qText = item.type === 'cloze' ? item.q ?? 'Complete the sentences.' : item.q;
  return (
    <div>
      <div className="qtext"><Markdown text={qText} /></div>
      {item.type === 'mcq' && (
        <div className="options">
          <p className="muted small">Tick one box.</p>
          {order.map((i) => (
            <button key={i} className={`opt ${v.choice === i ? 'sel' : ''}`} disabled={disabled} aria-pressed={v.choice === i} onClick={() => onChange({ choice: i })}>
              <span className={`box ${v.choice === i ? 'on' : ''}`} aria-hidden="true">{v.choice === i && <Icon name="check" size={14} />}</span> <Markdown text={item.options[i]} inline />
            </button>
          ))}
        </div>
      )}
      {item.type === 'multi' && (
        <div className="options">
          <p className="muted small">Tick {item.answers.length === 1 ? 'one box' : `${['', '', 'two', 'three', 'four'][item.answers.length] ?? item.answers.length} boxes`}.</p>
          {order.map((i) => {
            const on = v.multi?.includes(i) ?? false;
            return (
              <button key={i} className={`opt ${on ? 'sel' : ''}`} disabled={disabled} aria-pressed={on} onClick={() => { const set = new Set(v.multi ?? []); if (set.has(i)) set.delete(i); else set.add(i); onChange({ multi: [...set] }); }}>
                <span className={`box ${on ? 'on' : ''}`} aria-hidden="true">{on && <Icon name="check" size={14} />}</span> <Markdown text={item.options[i]} inline />
              </button>
            );
          })}
        </div>
      )}
      {item.type === 'tf' && (
        <div className="options two">
          {['True', 'False'].map((t, i) => <button key={t} className={`opt ${v.choice === i ? 'sel' : ''}`} disabled={disabled} onClick={() => onChange({ choice: i })}>{t}</button>)}
        </div>
      )}
      {(item.type === 'num' || item.type === 'text') && (
        <div className="answer-row">
          <input className="answer-input" value={v.text ?? ''} disabled={disabled} {...answerProps(item.type === 'num' ? 'num' : 'text', appKb, 'next')} onChange={(e) => onChange({ text: e.target.value })} aria-label="Your answer" placeholder={item.type === 'num' ? 'Answer' : 'Your answer'} />
          {item.type === 'num' && item.unit && <span className="unit">{item.unit}</span>}
        </div>
      )}
      {item.type === 'order' && (
        <ol className="order-list">
          {(v.order ?? startOrder).map((s, i, arr) => (
            <li key={s}>
              <span className="order-text"><Markdown text={s} inline /></span>
              {!disabled && (
                <span className="order-btns">
                  <button aria-label="Move up" disabled={i === 0} onClick={() => { const a = arr.slice(); [a[i - 1], a[i]] = [a[i], a[i - 1]]; onChange({ order: a }); }}>▲</button>
                  <button aria-label="Move down" disabled={i === arr.length - 1} onClick={() => { const a = arr.slice(); [a[i + 1], a[i]] = [a[i], a[i + 1]]; onChange({ order: a }); }}>▼</button>
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
      {item.type === 'match' && (
        <div className="match">
          <p className="muted small">Draw one line from each item – choose its match.</p>
          {item.pairs.map(([l], i) => (
            <div key={i} className="match-row">
              <div className="match-left"><Markdown text={l} inline /></div>
              <select value={v.match?.[i] ?? ''} disabled={disabled} onChange={(e) => onChange({ match: { ...(v.match ?? {}), [i]: e.target.value } })} aria-label={`Match for ${l}`}>
                <option value="">Choose…</option>
                {right.map((r) => <option key={r} value={r}>{r.replace(/[*_`]/g, '')}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
      {marks > 1 && item.type === 'num' && <p className="muted small">Show your working in the working space – method marks can be given if your final answer is wrong.</p>}
    </div>
  );
}

// =============================== review ===============================
export function MockReviewPage({ testId, attemptId }: { testId: string; attemptId: string }) {
  const profile = useProfile();
  const progress = useProgress();
  const provider = useAIProvider();
  const found = getTest(testId);
  const attempt = (progress.mocks?.[testId] ?? []).find((a) => a.id === attemptId);
  const [aiBusy, setAiBusy] = useState<string | null>(null);
  const [aiNote, setAiNote] = useState<Record<string, string>>({});
  const [overall, setOverall] = useState('');
  const [filter, setFilter] = useState<'all' | 'lost'>('lost');
  useEffect(() => () => resetTools(), []);
  if (!found || !attempt) return <Empty title="Attempt not found"><a href={href('/mocks')}>All mock exams</a></Empty>;
  const { paper, test } = found;
  const subject = getSubject(paper.subjectId)!;
  const sections = visibleSections(test, profile);
  const qs = allQs(sections);
  const score = qs.reduce((a, q) => a + (attempt.marks[q.n] ?? 0), 0);
  const max = attempt.max;
  const pct = Math.round((score / Math.max(1, max)) * 100);
  const pending = attempt.status === 'submitted';
  const timeTaken = Math.round(((paper.mins * 60 - attempt.remaining) || 0) / 60);

  const update = (patch: Partial<MockAttempt>) => {
    const next = { ...attempt, ...patch };
    next.score = allQs(visibleSections(test, getProfile())).reduce((a, q) => a + (next.marks[q.n] ?? 0), 0);
    saveMockAttempt(next);
  };
  const setTicks = (q: WrittenQ, t: number[]) => update({ ticks: { ...attempt.ticks, [q.n]: t }, marks: { ...attempt.marks, [q.n]: writtenMark(q, t) } });
  const setMark = (q: MockQ, m: number) => update({ marks: { ...attempt.marks, [q.n]: Math.max(0, Math.min(q.marks, m)) } });
  const confirmMarks = () => {
    for (const q of qs) if (q.kind === 'written') recordExam(q.topicId, `mock:${testId}:${q.n}`, attempt.marks[q.n] ?? 0, q.marks, String(attempt.answers[q.n] ?? ''));
    update({ status: 'marked' });
  };
  const aiMark = async (q: WrittenQ) => {
    setAiBusy(q.n);
    try {
      const r = await markWithAI(q.eq, subject.name, String(attempt.answers[q.n] ?? ''));
      update({ ticks: { ...attempt.ticks, [q.n]: r.met }, marks: { ...attempt.marks, [q.n]: r.mark } });
      setAiNote((n) => ({ ...n, [q.n]: [r.comment, ...r.improvements.map((x) => `- ${x}`)].join('\n') }));
    } catch (e) { setAiNote((n) => ({ ...n, [q.n]: aiErrorText(e) })); }
    setAiBusy(null);
  };

  // where the marks went
  const byTopic = new Map<string, { got: number; max: number }>();
  for (const q of qs) {
    const t = q.kind === 'auto' ? q.item.topicId : q.topicId;
    const cur = byTopic.get(t) ?? { got: 0, max: 0 };
    byTopic.set(t, { got: cur.got + (attempt.marks[q.n] ?? 0), max: cur.max + q.marks });
  }
  const weakest = [...byTopic.entries()].filter(([, v]) => v.got < v.max).sort((a, b) => (b[1].max - b[1].got) - (a[1].max - a[1].got)).slice(0, 6);
  const unanswered = qs.filter((q) => (q.kind === 'auto' ? !isAnswered(q.item, attempt.answers[q.n] as AutoAnswer) : !String(attempt.answers[q.n] ?? '').trim()));
  const autoLost = qs.filter((q) => q.kind === 'auto').reduce((a, q) => a + q.marks - (attempt.marks[q.n] ?? 0), 0);
  const writtenLost = qs.filter((q) => q.kind === 'written').reduce((a, q) => a + q.marks - (attempt.marks[q.n] ?? 0), 0);

  const advice = [
    unanswered.length ? `**${unanswered.length} question${unanswered.length === 1 ? '' : 's'} left blank.** In the real exam always write something – a method or one relevant point can earn marks.` : '',
    timeTaken > paper.mins * 0.98 && unanswered.length ? `**Timing:** you ran out of time. Aim for about a mark a minute${paper.mins / paper.marks > 1.1 ? ` (here ${Math.round((paper.mins / paper.marks) * 10) / 10} minutes per mark)` : ''} and move on from anything you're stuck on.` : '',
    writtenLost > autoLost && writtenLost > 0 ? `**Most marks were lost in longer written answers** (${writtenLost} marks). Use the mark scheme points and model answers below: plan before writing, and make every point specific.` : '',
    autoLost >= writtenLost && autoLost > 0 ? `**Most marks were lost on short, knowledge-based questions** (${autoLost} marks). These are the quickest to fix – they are now on your Fix-it list and will come back in your sessions.` : '',
    weakest.length ? `**Revise first:** ${weakest.slice(0, 3).map(([t]) => getTopic(t)?.topic.title).filter(Boolean).join(', ')}.` : '',
  ].filter(Boolean);

  const aiOverall = async () => {
    setAiBusy('overall');
    const lines = qs.map((q) => {
      const t = q.kind === 'auto' ? q.item.topicId : q.topicId;
      const ans = q.kind === 'auto' ? JSON.stringify(attempt.answers[q.n] ?? null) : String(attempt.answers[q.n] ?? '').slice(0, 400);
      return `Q${q.n} (${getTopic(t)?.topic.title}): ${attempt.marks[q.n] ?? 0}/${q.marks}. Student: ${ans || '(blank)'}${q.kind === 'auto' ? `. Correct: ${answerText(q.item)}` : ''}`;
    }).join('\n');
    try {
      const text = await ask({
        system: `You are an experienced GCSE ${subject.name} teacher giving feedback on a full mock paper (${paper.title}, ${paper.board}). UK spelling. Be specific and practical; no gushing. Give: 2 strengths, the 3 most important things to improve with exactly how, and a short revision plan for the next week. Under 220 words.`,
        turns: [{ role: 'user', content: `Score ${score}/${max} in ${timeTaken} of ${paper.mins} minutes.\n${lines}` }],
      });
      setOverall(text);
    } catch (e) { setOverall(aiErrorText(e)); }
    setAiBusy(null);
  };

  const shown = qs.filter((q) => filter === 'all' || (attempt.marks[q.n] ?? 0) < q.marks);
  return (
    <div className="page narrow" style={{ ['--subj' as string]: subject.color }}>
      <a className="small" href={href(`/mocks/${paper.id}`)}>← {paper.title}</a>
      <p className="eyebrow" style={{ marginTop: '1rem' }}>{subject.name} · {test.title}</p>
      <h1><span className="mono">{score}/{max}</span> <span className="muted">({pct}%)</span></h1>
      <p className="muted">{pending ? 'Short answers are marked. Check the marks for your written answers below, then confirm.' : `Marked. Completed in ${timeTaken} of ${paper.mins} minutes.`}</p>
      <ProgressBar value={score / Math.max(1, max)} color={subject.color} />

      <section className="section card pad">
        <h2 style={{ marginTop: 0 }}>How to improve</h2>
        {advice.length ? <ul className="plain">{advice.map((a, i) => <li key={i}><Markdown text={a} inline /></li>)}</ul> : <p>Full marks – excellent. Try the next practice paper.</p>}
        {weakest.length > 0 && (
          <div className="list" style={{ marginTop: '0.6rem' }}>
            {weakest.map(([t, v]) => (
              <a key={t} className="list-row" href={href('/quiz', { scope: 'topic', id: t, n: 8 })}>
                <span className="grow">{getTopic(t)?.topic.title}</span>
                <span className="mono small">{v.got}/{v.max}</span>
                <span className="small">Practise</span>
              </a>
            ))}
          </div>
        )}
        {provider === 'claude' && (
          <div style={{ marginTop: '0.8rem' }}>
            {overall ? <div className="callout callout-tip"><div className="callout-title">Feedback from Claude</div><Markdown text={overall} /></div>
              : <button className="btn" disabled={aiBusy === 'overall'} onClick={() => void aiOverall()}><Icon name="message" size={16} /> {aiBusy === 'overall' ? 'Thinking…' : 'Get detailed feedback from Claude'}</button>}
          </div>
        )}
      </section>

      <div className="row gap wrap">
        {pending && <button className="btn primary" onClick={confirmMarks}>Confirm marks</button>}
        <a className="btn" href={href(`/mock/${testId}`)}>Retry this test</a>
        <button className="btn ghost" onClick={() => setFilter(filter === 'all' ? 'lost' : 'all')}>{filter === 'all' ? 'Show only questions with lost marks' : 'Show every question'}</button>
      </div>

      {shown.map((q) => {
        const got = attempt.marks[q.n] ?? 0;
        const full = got >= q.marks;
        const topicId = q.kind === 'auto' ? q.item.topicId : q.topicId;
        return (
          <div key={q.n} className={`mock-q review-q ${full ? 'full' : got > 0 ? 'part' : 'none'}`}>
            <div className="mock-q-head">
              <span className="mock-n mono">{q.n}</span>
              <span className={`pill ${full ? 'pill-good' : got > 0 ? 'pill-warn' : 'pill-bad'}`}>{got}/{q.marks}</span>
              <a className="small push" href={href(`/t/${topicId}`)}>{getTopic(topicId)?.topic.title}</a>
            </div>
            {q.kind === 'auto' ? (
              <AutoReview q={q} answer={attempt.answers[q.n] as AutoAnswer | undefined} got={got} onMethod={(m) => setMark(q, m)} />
            ) : (
              <div>
                <Markdown text={q.eq.q} />
                <h4>Your answer</h4>
                <div className="essay-view">{String(attempt.answers[q.n] ?? '') || <span className="muted">(no answer)</span>}</div>
                <SpellingNotes text={String(attempt.answers[q.n] ?? '')} quiet />
                <h4>Mark scheme {levelled(q) ? '– choose the level that best fits your answer' : '– tick each point you made'}</h4>
                {levelled(q) && <p className="small muted">Read the levels from the top and choose the first one your whole answer matches. You get the middle of that level&apos;s range, then adjust the mark up or down if your answer is a strong or weak fit.{q.eq.markScheme.filter((m) => bandOf(m)).map((m) => bandOf(m)!.comp).filter((c, i, a) => a.indexOf(c) === i).length > 1 ? ' Choose one level for each part.' : ''}</p>}
                {q.eq.markScheme.map((m, k) => isInfoLine(m) ? (
                  <div key={k} className="tick info"><Markdown text={m} inline /></div>
                ) : (
                  <label key={k} className={`tick${bandOf(m) ? ' band' : ''}`}>
                    <input type={bandOf(m) ? 'radio' : 'checkbox'} name={bandOf(m) ? `band-${q.n}-${bandOf(m)!.comp}` : undefined} checked={(attempt.ticks[q.n] ?? []).includes(k)} onClick={() => { if (bandOf(m) && (attempt.ticks[q.n] ?? []).includes(k)) setTicks(q, toggleTick(q.eq.markScheme, attempt.ticks[q.n] ?? [], k)); }} onChange={() => { if (!(bandOf(m) && (attempt.ticks[q.n] ?? []).includes(k))) setTicks(q, toggleTick(q.eq.markScheme, attempt.ticks[q.n] ?? [], k)); }} />
                    <Markdown text={m} inline />
                  </label>
                ))}
                <div className="row gap wrap" style={{ marginTop: '0.5rem' }}>
                  <label className="small">Mark: <input type="number" min={0} max={q.marks} value={got} onChange={(e) => setMark(q, Number(e.target.value))} style={{ width: '4.5rem' }} /> / {q.marks}</label>
                  {provider === 'claude' && <button className="btn small" disabled={aiBusy === q.n} onClick={() => void aiMark(q)}>{aiBusy === q.n ? 'Marking…' : 'Mark with AI'}</button>}
                  <button className="btn small ghost" onClick={() => { setTutorContext({ kind: 'exam', key: `mock:${q.n}`, eq: q.eq, topic: getTopic(q.topicId)!.topic, subjectId: paper.subjectId, draft: String(attempt.answers[q.n] ?? '') }); openTool('tutor', paper.subjectId, null); }}><Icon name="message" size={14} /> Ask the tutor</button>
                </div>
                {aiNote[q.n] && <div className="callout callout-tip small"><Markdown text={aiNote[q.n]} /></div>}
                {(() => {
                  const kw = keywordCheck(q.eq, String(attempt.answers[q.n] ?? ''));
                  const miss = kw.points.filter((p) => !p.likely && p.terms.length).slice(0, 4);
                  return miss.length && !full ? <div className="callout callout-warn small"><div className="callout-title">To get more marks, include</div><ul>{miss.map((p) => <li key={p.index}>{p.text}</li>)}</ul></div> : null;
                })()}
                {q.eq.model && <details className="model"><summary>Model answer</summary><Markdown text={q.eq.model} /></details>}
                {q.eq.guidance?.length ? <details className="guidance"><summary>How to approach it</summary><ul>{q.eq.guidance.map((g, k) => <li key={k}><Markdown text={g} inline /></li>)}</ul></details> : null}
              </div>
            )}
          </div>
        );
      })}
      {pending && <div className="row end"><button className="btn primary big" onClick={confirmMarks}>Confirm marks</button></div>}
      <div className="row gap wrap" style={{ marginTop: '1rem' }}>
        <button className="btn danger small" onClick={() => { deleteMockAttempt(testId, attempt.id); go(`/mocks/${paper.id}`); }}>Delete this attempt</button>
      </div>
    </div>
  );
}

function AutoReview({ q, answer, got, onMethod }: { q: Extract<MockQ, { kind: 'auto' }>; answer?: AutoAnswer; got: number; onMethod: (m: number) => void }) {
  const g = gradeAuto(q.item, answer, q.marks);
  const item = q.item;
  const given = (() => {
    if (!answer || !isAnswered(item, answer)) return '(no answer)';
    switch (item.type) {
      case 'mcq': return item.options[answer.choice!];
      case 'tf': return answer.choice === 0 ? 'True' : 'False';
      case 'multi': return (answer.multi ?? []).map((i) => item.options[i]).join('; ');
      case 'num': case 'text': return answer.text ?? '';
      case 'order': return (answer.order ?? []).join(' → ');
      case 'match': return item.pairs.map(([l], i) => `${l} = ${answer.match?.[i] ?? '?'}`).join('; ');
      default: return '';
    }
  })();
  const steps = (item.type === 'num' || item.type === 'text') && item.steps?.length ? item.steps : [];
  return (
    <div>
      <div className="qtext"><Markdown text={item.type === 'cloze' ? item.q ?? '' : item.q} /></div>
      <p className="small"><span className="muted">Your answer:</span> <Markdown text={given} inline /></p>
      {!g.correct && <p className="small"><span className="muted">Correct answer:</span> <strong><Markdown text={answerText(item)} inline /></strong></p>}
      {g.detail && !g.correct && <p className="small muted">{g.detail}</p>}
      {!g.correct && q.method?.length ? (
        <div className="callout small">
          <div className="callout-title">Method marks – tick any your working showed</div>
          {q.method.map((m, k) => (
            <label key={k} className="tick"><input type="checkbox" checked={got > k} onChange={(e) => onMethod(e.target.checked ? Math.max(got, k + 1) : k)} /> <Markdown text={m} inline /></label>
          ))}
        </div>
      ) : null}
      {!g.correct && (
        <details className="model" open={!g.correct}>
          <summary>Why</summary>
          <Markdown text={item.why} />
          {steps.length > 0 && !item.generated && <ol className="steps">{steps.map((s, i) => <li key={i}><Markdown text={s} inline /></li>)}</ol>}
        </details>
      )}
    </div>
  );
}
