import { useMemo, useState } from 'react';
import { skillOf } from '../lib/skills';
import { activeSubjects, easyQuestions, getTopic, visibleTopics } from '../content/registry';
import { getProfile, getProgress, recordAnswer, useProgress } from '../lib/store';
import { level, mastery } from '../lib/engine';
import { href } from '../lib/router';
import { QuestionCard } from '../components/QuestionCard';
import { Markdown } from '../components/Markdown';
import { Icon } from '../components/Icon';
import { SubjectMark } from '../components/SubjectMark';
import { ProgressBar } from '../components/ui';

type Step = 'basics' | 'example' | 'practice' | 'check';
const STEPS: { id: Step; label: string }[] = [
  { id: 'basics', label: 'Back to basics' },
  { id: 'example', label: 'Worked example' },
  { id: 'practice', label: 'Three easy wins' },
  { id: 'check', label: 'Check in' },
];

/** Rescue session: rebuild a topic from the ground up when a student is really stuck. */
export function RescuePage({ query }: { query: URLSearchParams }) {
  const id = query.get('topic') ?? '';
  const ref = getTopic(id);
  if (!ref) return <RescuePicker />;
  return <Rescue key={id} topicId={id} />;
}

function RescuePicker() {
  const profile = getProfile();
  const progress = useProgress();
  const weak = activeSubjects(profile)
    .flatMap((s) => visibleTopics(s, profile).map((t) => ({ s, t, m: mastery(progress.topics[t.id]), n: progress.topics[t.id]?.n ?? 0 })))
    .filter((x) => x.n > 0 && ['weak', 'developing'].includes(level(progress.topics[x.t.id])))
    .sort((a, b) => a.m - b.m)
    .slice(0, 8);
  const [subject, setSubject] = useState(activeSubjects(profile)[0]?.id ?? '');
  const s = activeSubjects(profile).find((x) => x.id === subject);
  return (
    <div className="page narrow">
      <p className="eyebrow">Struggling?</p>
      <h1>Rescue session</h1>
      <p className="lead">Pick the topic that's causing trouble. We'll go back to the basics, walk through a worked example, then build up with three easy questions. About 10 minutes.</p>
      {weak.length > 0 && (
        <section className="section">
          <h2>Your weakest topics</h2>
          <div className="list">
            {weak.map(({ s: sub, t, m }) => (
              <a key={t.id} className="list-row" href={href('/rescue', { topic: t.id })}>
                <SubjectMark subject={sub} size="sm" />
                <span className="grow">{t.title}</span>
                <span className="muted small mono">{Math.round(m * 100)}%</span>
                <Icon name="arrow" size={18} />
              </a>
            ))}
          </div>
        </section>
      )}
      <section className="section">
        <h2>Or choose any topic</h2>
        <label className="field">
          <span>Subject</span>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {activeSubjects(profile).map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        </label>
        <div className="list">
          {s && visibleTopics(s, profile).map((t) => (
            <a key={t.id} className="list-row" href={href('/rescue', { topic: t.id })}>
              <span className="grow">{t.title}</span>
              <Icon name="arrow" size={18} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function Rescue({ topicId }: { topicId: string }) {
  const ref = getTopic(topicId)!;
  const { topic, subject } = ref;
  const profile = getProfile();
  const [step, setStep] = useState<Step>('basics');
  const [revealed, setRevealed] = useState(0);
  const [tryShown, setTryShown] = useState(false);
  const qs = useMemo(() => easyQuestions(topicId, profile, 3), [topicId, profile]);
  const [qi, setQi] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [copied, setCopied] = useState(false);
  const ex = topic.workedExamples?.[0];
  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const right = results.filter(Boolean).length;

  const note = () => {
    const p = getProgress();
    const t = p.topics[topicId];
    const misses = Object.values(p.mistakes).filter((m) => m.topicId === topicId).length;
    return [
      `Hi - I'm finding "${topic.title}" (${subject.name}) difficult.`,
      `I've answered ${t?.n ?? 0} questions on it; current mastery ${Math.round(mastery(t) * 100)}%, ${misses} question${misses === 1 ? '' : 's'} still on my fix-it list.`,
      `In a rescue session today I got ${right} of ${results.length} easy questions right.`,
      'The part I find hardest is: ______________________',
      'Could we go over it, or could you suggest something to practise?',
    ].join('\n');
  };
  const copyNote = async () => {
    try { await navigator.clipboard.writeText(note()); setCopied(true); } catch { setCopied(false); }
  };

  return (
    <div className="page narrow session" style={{ ['--subj' as string]: subject.color }}>
      <div className="session-head">
        <a className="small" href={href(`/t/${topicId}`)}>Leave</a>
        <span className="small">Rescue · {topic.title}</span>
        <span className="small mono">{stepIndex + 1}/4</span>
      </div>
      <ProgressBar value={(stepIndex + (step === 'check' ? 1 : 0)) / 4} color={subject.color} />
      <ol className="stepper" aria-label="Rescue steps">
        {STEPS.map((s, i) => (
          <li key={s.id} className={i < stepIndex ? 'done' : i === stepIndex ? 'now' : ''}>
            <span className="stepper-n">{i < stepIndex ? <Icon name="check" size={14} /> : i + 1}</span>
            <span>{s.label}</span>
          </li>
        ))}
      </ol>

      {step === 'basics' && (
        <div className="panel">
          <h2>Start from the beginning</h2>
          <p className="muted">Forget the exam question for a minute. Read this slowly. Just the core idea.</p>
          {topic.simpler ? <Markdown text={topic.simpler} /> : <Markdown text={topic.notes.split('\n## ')[0]} />}
          <div className="callout callout-key">
            <div className="callout-title">The essentials</div>
            <ul>{topic.keyPoints.slice(0, 5).map((k, i) => <li key={i}><Markdown text={k} inline /></li>)}</ul>
          </div>
          {topic.misconceptions?.[0] && (
            <div className="callout callout-warn">
              <div className="callout-title">The trap most people fall into</div>
              <p><span className="pill pill-bad">Wrong</span> <Markdown text={topic.misconceptions[0].wrong} inline /></p>
              <p><span className="pill pill-good">Right</span> <Markdown text={topic.misconceptions[0].right} inline /></p>
            </div>
          )}
          {topic.prerequisites?.length ? (
            <p className="small muted">This topic builds on: {topic.prerequisites.map((p, i) => {
              const r = getTopic(p);
              return r ? <span key={p}>{i > 0 && ', '}<a href={href(`/t/${p}`)}>{r.topic.title}</a></span> : null;
            })}. If those feel shaky, start there.</p>
          ) : null}
          <div className="row end"><button className="btn primary" onClick={() => setStep(ex ? 'example' : 'practice')}>I've read it <Icon name="arrow" size={18} /></button></div>
        </div>
      )}

      {step === 'example' && ex && (
        <div className="panel">
          <h2>Watch one being done</h2>
          <p className="muted">Reveal one step at a time. Before each reveal, try to predict what the next step will be.</p>
          <h3>{ex.title}</h3>
          <Markdown text={ex.problem} />
          <ol className="steps reveal">
            {ex.steps.slice(0, revealed).map((s, i) => <li key={i}><Markdown text={s} inline /></li>)}
          </ol>
          {revealed < ex.steps.length ? (
            <button className="btn" onClick={() => setRevealed((r) => r + 1)}>{revealed === 0 ? 'Show the first step' : 'Show the next step'}</button>
          ) : (
            <>
              {ex.answer && <p><strong>Answer:</strong> <Markdown text={ex.answer} inline /></p>}
              {ex.tryIt && (
                <div className="tryit">
                  <strong>Your turn. Same method, new numbers:</strong>
                  <Markdown text={ex.tryIt} />
                  {ex.tryAnswer && (tryShown ? <p><strong>Answer:</strong> <Markdown text={ex.tryAnswer} inline /></p> : <button className="btn small" onClick={() => setTryShown(true)}>Check my answer</button>)}
                </div>
              )}
              <div className="row end"><button className="btn primary" onClick={() => setStep('practice')}>Now let me try <Icon name="arrow" size={18} /></button></div>
            </>
          )}
        </div>
      )}

      {step === 'practice' && (
        qs[qi] ? (
          <>
            <p className="muted small center">Easy question {qi + 1} of {qs.length} - use the hints as much as you like.</p>
            <QuestionCard
              key={qs[qi].id + qi}
              item={qs[qi]}
              topic={topic}
              onChecked={(r) => recordAnswer({ skill: skillOf(qs[qi]), id: qs[qi].id, topicId, subjectId: subject.id, d: qs[qi].d, correct: r.correct, conf: r.conf, hints: r.hints, generated: qs[qi].generated })}
              onDone={(r) => {
                setResults((x) => [...x, r.correct]);
                if (qi + 1 >= qs.length) setStep('check'); else setQi(qi + 1);
              }}
              nextLabel={qi + 1 >= qs.length ? 'Finish' : 'Next easy question'}
            />
          </>
        ) : (
          <div className="panel">
            <p>No practice questions for this topic yet.</p>
            <button className="btn primary" onClick={() => setStep('check')}>Continue</button>
          </div>
        )
      )}

      {step === 'check' && (
        <div className="panel">
          <h2>{right === results.length && results.length > 0 ? 'That is real progress.' : right > 0 ? 'You are getting there.' : 'That is OK. This one needs a teacher.'}</h2>
          {results.length > 0 && <p>You got <strong>{right} of {results.length}</strong> right.</p>}
          <h3>How do you feel about {topic.title} now?</h3>
          <div className="choice-grid">
            <a className="choice" href={href('/quiz', { scope: 'topic', id: topicId, n: 6 })}>
              <Icon name="target" /><strong>Better, let me practise</strong><span className="muted small">6 questions that adapt to you</span>
            </a>
            <a className="choice" href={href(`/t/${topicId}`, { tab: 'learn' })}>
              <Icon name="learn" /><strong>A bit better, re-read the lesson</strong><span className="muted small">Then try the flashcards</span>
            </a>
            <a className="choice" href={href('/rescue', { topic: topicId, again: Date.now() })}>
              <Icon name="steps" /><strong>Still confused, go again</strong><span className="muted small">New easy questions</span>
            </a>
          </div>

          <div className="callout callout-tip">
            <div className="callout-title">Ask for help. Teachers are there for this</div>
            <p>Copy this note and send it to your teacher (or show it at the start of a lesson). Fill in the gap first.</p>
            <pre className="note">{note()}</pre>
            <button className="btn small" onClick={copyNote}><Icon name="message" size={16} /> {copied ? 'Copied' : 'Copy note'}</button>
          </div>
          <p className="small muted">Feeling overwhelmed about revision in general? <a href={href('/help')}>See support and wellbeing</a>.</p>
        </div>
      )}
    </div>
  );
}
