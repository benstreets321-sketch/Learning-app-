import { useEffect, useRef, useState } from 'react';
import { SpellingNotes } from '../components/SpellingNotes';
import { answerProps, useAppKeyboard } from '../components/AppKeyboard';
import { getTopic, topicQuestions } from '../content/registry';
import { go, href } from '../lib/router';
import { markNotesRead, recordBlurt, saveNote, useProgress } from '../lib/store';
import { level, mastery } from '../lib/engine';
import { Empty, LevelBadge, ProgressBar, Section, Tabs } from '../components/ui';
import { Markdown } from '../components/Markdown';
import type { WorkedExample } from '../content/types';
import { SpeakButton } from '../components/Speak';

type Tab = 'learn' | 'practice' | 'examples' | 'exam' | 'blurt' | 'quotes' | 'timeline' | 'past' | 'notes';

export function TopicPage({ id, tab }: { id: string; tab: string }) {
  const ref = getTopic(id);
  const progress = useProgress();
  if (!ref) return <Empty title="Topic not found"><a href="#/">Go home</a></Empty>;
  const { subject, unit, topic } = ref;
  const ts = progress.topics[id];
  const t = tab as Tab;
  const nQ = topicQuestions(id).length;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practise' },
  ];
  if (topic.workedExamples?.length) tabs.push({ id: 'examples', label: 'Worked examples' });
  if (topic.examQuestions?.length) tabs.push({ id: 'exam', label: 'Exam questions' });
  if (topic.quotes?.length) tabs.push({ id: 'quotes', label: 'Key quotes' });
  if (topic.timeline?.length) tabs.push({ id: 'timeline', label: 'Timeline' });
  if (topic.pastQuestions?.length) tabs.push({ id: 'past', label: 'Past questions' });
  tabs.push({ id: 'blurt', label: 'Blurt it' }, { id: 'notes', label: 'My notes' });

  return (
    <div className="page" style={{ ['--subj' as string]: subject.color }}>
      <div className="subject-hero">
        <a className="small" href={href(`/s/${subject.id}`, { tab: 'topics' })}>← {subject.name} · {unit.title}</a>
        <h1>{topic.title}</h1>
        <p className="muted">{topic.summary}</p>
        <div className="row gap wrap">
          <LevelBadge level={level(ts)} />
          <div className="grow"><ProgressBar value={mastery(ts)} color={subject.color} /></div>
          {topic.tags?.map((tg) => <span key={tg} className="pill pill-info">{tg}</span>)}
        </div>
        <div className="row gap wrap hero-actions">
          <a className="btn primary small" href={href('/quiz', { scope: 'topic', id, n: 8 })}>Practise this topic</a>
          <a className="btn small" href={href('/rescue', { topic: id })}>Struggling? Rescue session</a>
        </div>
      </div>

      <Tabs<Tab> value={tabs.some((x) => x.id === t) ? t : 'learn'} onChange={(v) => go(`/t/${id}`, { tab: v })} tabs={tabs} />

      {(t === 'learn' || !tabs.some((x) => x.id === t)) && !(ts?.n) && nQ >= 3 && (
        <div className="callout callout-tip pretest">
          <div className="callout-title">New topic? Try 3 questions before you read</div>
          <p>Guessing first – even getting them wrong – makes the lesson stick better, because your brain is already looking for the answers.</p>
          <a className="btn small" href={href('/quiz', { scope: 'topic', id, n: 3, pre: 1 })}>Quick pre-test</a>
        </div>
      )}
      {(t === 'learn' || !tabs.some((x) => x.id === t)) && (
        <div className="lesson">
          <div className="lesson-tools"><SpeakButton text={topic.notes} label="Listen to this lesson" /></div>
          <Markdown text={topic.notes} />
          {topic.simpler && (
            <details className="simpler">
              <summary>Still confused? Explain it another way</summary>
              <Markdown text={topic.simpler} />
            </details>
          )}
          {topic.keyPoints.length > 0 && (
            <div className="callout callout-key">
              <div className="callout-title">Must-know checklist</div>
              <ul>{topic.keyPoints.map((k, i) => <li key={i}><Markdown text={k} inline /></li>)}</ul>
            </div>
          )}
          {topic.misconceptions?.length ? (
            <Section title="Common mistakes">
              {topic.misconceptions.map((m, i) => (
                <div key={i} className="myth">
                  <p><span className="pill pill-bad">Myth</span> <Markdown text={m.wrong} inline /></p>
                  <p><span className="pill pill-good">Actually</span> <Markdown text={m.right} inline /></p>
                </div>
              ))}
            </Section>
          ) : null}
          <div className="next-steps">
            <p><strong>Now test yourself straight away</strong> - retrieving what you've just read is what moves it into long-term memory.</p>
            <div className="row gap wrap">
              <button className="btn primary" onClick={() => { markNotesRead(id); go('/quiz', { scope: 'topic', id, n: 8 }); }}>I've read it - quiz me ({nQ}+ questions)</button>
              {topic.flashcards.length > 0 && <a className="btn" href={href('/cards', { scope: 'topic', id })}>Flashcards ({topic.flashcards.length})</a>}
              <a className="btn" href={href(`/t/${id}`, { tab: 'blurt' })}>Blurt it from memory</a>
            </div>
            {topic.prerequisites?.length ? (
              <p className="muted small">Finding this hard? First check: {topic.prerequisites.map((p, i) => {
                const pr = getTopic(p);
                return pr ? <span key={p}>{i > 0 && ', '}<a href={href(`/t/${p}`)}>{pr.topic.title}</a></span> : null;
              })}</p>
            ) : null}
          </div>
        </div>
      )}

      {t === 'practice' && (
        <div className="practice-grid">
          <a className="cta primary" href={href('/quiz', { scope: 'topic', id, n: 10 })}>
            <span className="cta-title">Adaptive quiz</span>
            <span className="cta-sub">{nQ} written questions{topic.generators?.length ? ' + unlimited generated ones' : ''}. Adapts to how you're doing.</span>
          </a>
          {topic.generators?.length ? (
            <a className="cta" href={href('/quiz', { scope: 'topic', id, n: 15, gen: 1 })}>
              <span className="cta-title">Unlimited practice</span>
              <span className="cta-sub">{(topic.generators ?? []).some((g) => !/^(f|tl|qt|pm)-/.test(g)) ? 'Fresh numbers each time with step-by-step solutions.' : 'A new variation every time, with a different set of answer options.'}</span>
            </a>
          ) : null}
          {topic.flashcards.length > 0 && (
            <a className="cta" href={href('/cards', { scope: 'topic', id })}>
              <span className="cta-title">Flashcards</span>
              <span className="cta-sub">{topic.flashcards.length} cards with spaced repetition.</span>
            </a>
          )}
          <a className="cta" href={href(`/t/${id}`, { tab: 'blurt' })}>
            <span className="cta-title">Blurting</span>
            <span className="cta-sub">Write everything you remember, then check against the checklist.</span>
          </a>
        </div>
      )}

      {t === 'examples' && topic.workedExamples && (
        <div>{topic.workedExamples.map((ex, i) => <Example key={i} ex={ex} />)}</div>
      )}

      {t === 'exam' && topic.examQuestions && (
        <div className="exam-list">
          {topic.examQuestions.map((q, i) => {
            const done = progress.essays[`${id}~${i}`];
            return (
              <a key={i} className="exam-item" href={href('/exam', { topic: id, i })}>
                <span className="exam-marks">{q.marks}</span>
                <span className="exam-q"><Markdown text={q.q.split('\n')[0]} inline />{q.meta && <span className="muted small"> · {q.meta}</span>}</span>
                {done?.score !== undefined && <span className="pill pill-good">{done.score}/{done.max}</span>}
              </a>
            );
          })}
        </div>
      )}

      {t === 'quotes' && topic.quotes && (
        <div>
          <div className="row gap wrap">
            <a className="btn primary" href={href('/tools/quotes', { topic: id })}>Memorise these quotes</a>
            <a className="btn" href={href('/cards', { scope: 'topic', id })}>Quote flashcards</a>
          </div>
          <div className="quote-list">
            {topic.quotes.map((q, i) => (
              <details key={i} className="quote">
                <summary>
                  <span className="qt">“{q.text}”</span>
                  {(q.who || q.where) && <span className="muted small"> - {[q.who, q.where].filter(Boolean).join(', ')}</span>}
                </summary>
                <Markdown text={q.analysis} />
                {q.themes?.length ? <div className="chips wrap">{q.themes.map((th) => <span key={th} className="pill">{th}</span>)}</div> : null}
              </details>
            ))}
          </div>
        </div>
      )}

      {t === 'timeline' && topic.timeline && (
        <ol className="timeline">
          {topic.timeline.map((e, i) => (
            <li key={i}><span className="tl-date">{e.date}</span><span><Markdown text={e.event} inline /></span></li>
          ))}
        </ol>
      )}

      {t === 'past' && topic.pastQuestions && (
        <div>
          <p className="muted">Questions from real past papers. Exam boards never say what will come up, so use this to check you can handle <em>any</em> focus – not to guess.</p>
          <table className="table">
            <thead><tr><th>Series</th><th>Focus</th><th>Extract</th></tr></thead>
            <tbody>
              {topic.pastQuestions.map((p, i) => (
                <tr key={i}><td>{p.year}</td><td><Markdown text={p.focus} inline /></td><td className="muted small">{p.extract ?? ''}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {t === 'blurt' && <Blurt topicId={id} points={topic.keyPoints} />}

      {t === 'notes' && <MyNotes topicId={id} />}
    </div>
  );
}

function Example({ ex }: { ex: WorkedExample }) {
  const [shown, setShown] = useState(0);
  const [tryOpen, setTryOpen] = useState(false);
  return (
    <div className="example">
      <h3>{ex.title}</h3>
      <Markdown text={ex.problem} />
      <ol className="steps">
        {ex.steps.slice(0, shown).map((s, i) => <li key={i}><Markdown text={s} inline /></li>)}
      </ol>
      {shown < ex.steps.length ? (
        <div className="row gap">
          <button className="btn small" onClick={() => setShown((s) => s + 1)}>Show next step</button>
          <button className="btn small ghost" onClick={() => setShown(ex.steps.length)}>Show all</button>
          <span className="muted small">Try to predict each step before revealing it.</span>
        </div>
      ) : (
        ex.answer && <p><strong>Answer:</strong> <Markdown text={ex.answer} inline /></p>
      )}
      {ex.tryIt && (
        <div className="tryit">
          <strong>Your turn:</strong> <Markdown text={ex.tryIt} inline />
          {ex.tryAnswer && (
            <div>
              <button className="btn small" onClick={() => setTryOpen((o) => !o)}>{tryOpen ? 'Hide answer' : 'Check answer'}</button>
              {tryOpen && <p className="muted"><Markdown text={ex.tryAnswer} inline /></p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Blurt({ topicId, points }: { topicId: string; points: string[] }) {
  const appKb = useAppKeyboard();
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'write' | 'check' | 'done'>('write');
  const [ticks, setTicks] = useState<Set<number>>(new Set());
  const [secs, setSecs] = useState(300);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => () => clearInterval(timer.current), []);
  const start = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setSecs((s) => (s <= 1 ? (clearInterval(timer.current), 0) : s - 1)), 1000);
  };

  if (!points.length) return <Empty title="No checklist for this topic yet" />;
  const pct = (ticks.size / points.length) * 100;

  return (
    <div className="blurt">
      <div className="callout callout-tip">
        <div className="callout-title">How blurting works</div>
        <p>Close your notes. Write down <strong>everything</strong> you can remember about this topic – facts, keywords, quotes, diagrams in words. Then check against the checklist and tick what you got. The gaps are exactly what to revise next.</p>
      </div>
      {phase === 'write' && (
        <>
          <div className="row gap">
            <button className="btn small" onClick={start}>Start 5-minute timer</button>
            <span className={`timer ${secs === 0 ? 'done' : ''}`}>{Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')}</span>
          </div>
          <textarea className="essay" {...answerProps('long', appKb)} rows={12} value={text} onChange={(e) => setText(e.target.value)} placeholder="Everything I remember about this topic..." />
          <button className="btn primary" disabled={!text.trim()} onClick={() => { clearInterval(timer.current); setPhase('check'); }}>Check against the checklist</button>
        </>
      )}
      {phase !== 'write' && (
        <>
          <div className="two-col">
            <div>
              <h4>What you wrote</h4>
              <div className="essay-view">{text}</div>
              <SpellingNotes text={text} quiet />
            </div>
            <div>
              <h4>Tick each point you covered</h4>
              {points.map((p, i) => (
                <label key={i} className="tick">
                  <input type="checkbox" disabled={phase === 'done'} checked={ticks.has(i)} onChange={() => setTicks((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; })} />
                  <Markdown text={p} inline />
                </label>
              ))}
            </div>
          </div>
          {phase === 'check' ? (
            <button className="btn primary" onClick={() => { recordBlurt(topicId, pct); setPhase('done'); }}>Save my score</button>
          ) : (
            <div className="feedback good">
              <strong>You recalled {Math.round(pct)}% of the key points.</strong>
              <p>{pct >= 80 ? 'Excellent recall – try exam questions next.' : pct >= 50 ? 'Good start. Re-read the points you missed, then blurt again tomorrow.' : 'That shows you exactly what to learn. Re-read the lesson, then try again later today – the second attempt is where the learning happens.'}</p>
              <div className="row gap">
                <button className="btn" onClick={() => { setText(''); setTicks(new Set()); setSecs(300); setPhase('write'); }}>Blurt again</button>
                <a className="btn" href={href(`/t/${topicId}`)}>Re-read the lesson</a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MyNotes({ topicId }: { topicId: string }) {
  const appKb = useAppKeyboard();
  const progress = useProgress();
  const [text, setText] = useState(progress.notes[topicId] ?? '');
  useEffect(() => {
    if (text !== (progress.notes[topicId] ?? '')) saveNote(topicId, text);
  }, [text, topicId]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <p className="muted small">Your own notes, mnemonics and things your teacher said. Saved automatically on this device.</p>
      <textarea className="essay" {...answerProps('long', appKb)} rows={14} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write it in your own words – explaining something yourself is one of the best ways to learn it." />
    </div>
  );
}
