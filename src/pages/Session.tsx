import { useEffect, useMemo, useRef, useState } from 'react';
import { skillOf } from '../lib/skills';
import type { QItem } from '../content/types';
import { getTopic } from '../content/registry';
import { SessionEngine, SOURCE_HELP, SOURCE_LABEL, sessionPreview, type Source } from '../lib/session';
import { addStudyTime, getProgress, recordAnswer, useProgress } from '../lib/store';
import { mastery, type Confidence } from '../lib/engine';
import { href, refresh } from '../lib/router';
import { todayKey } from '../lib/util';
import { QuestionCard } from '../components/QuestionCard';
import { Markdown } from '../components/Markdown';
import { ProgressBar } from '../components/ui';
import { Icon } from '../components/Icon';
import { SubjectMark } from '../components/SubjectMark';
import { Reteach } from './Quiz';
import { CardBurst, type BurstCard } from '../components/CardBurst';
import { TodayExtras } from '../components/Coach';
import type { Topic } from '../content/types';

interface Answered { item: QItem; source: Source; correct: boolean; conf?: Confidence; hints: number }

const snapshotOf = (item: QItem) => {
  const [, g, s] = item.id.split(':');
  return JSON.stringify({ g, s: Number(s), l: item.d, t: item.topicId });
};

/** A timed session: the app decides what to practise, question by question, until the time is up. */
export function SessionPage({ query }: { query: URLSearchParams }) {
  const mins = Math.max(5, Math.min(120, Number(query.get('mins')) || 20));
  const subjectIds = query.get('subjects')?.split(',').filter(Boolean) ?? null;
  const engine = useMemo(() => new SessionEngine(subjectIds), []); // eslint-disable-line react-hooks/exhaustive-deps
  const endAt = useRef(Date.now() + mins * 60_000);
  const startedAt = useRef(Date.now());
  const shownAt = useRef(Date.now());
  const startFixed = useRef(getProgress().days[todayKey()]?.fixed ?? 0);
  const startMastery = useRef<Record<string, number>>({});
  const checked = useRef<string | null>(null);
  const [pick, setPick] = useState(() => engine.next());
  // modes the engine mixes in: a flashcard warm-up when cards are due (and again every 10 questions), and a quick
  // lesson before the first question on a brand-new topic
  const [burst, setBurst] = useState<BurstCard[] | null>(() => { const c = engine.dueCards(6); return c.length >= 3 ? c : null; });
  const [lessonFor, setLessonFor] = useState<string | null>(() => (pick?.lesson ? pick.item.topicId : null));
  const lastBurstAt = useRef(0);
  const plan = useMemo(() => sessionPreview(subjectIds), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [answers, setAnswers] = useState<Answered[]>([]);
  const [reteach, setReteach] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());
  const [done, setDone] = useState(false);
  // total minutes, including any "keep going" extensions
  const [planned, setPlanned] = useState(mins);
  const extend = (m: number) => { endAt.current = Math.max(Date.now(), endAt.current) + m * 60_000; setPlanned((p) => p + m); setNow(Date.now()); };

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [done]);

  const left = Math.max(0, Math.round((endAt.current - now) / 1000));
  const timeUp = left === 0;

  if (done || !pick) return <Summary answers={answers} mins={Math.round((Date.now() - startedAt.current) / 60000)} fixedBefore={startFixed.current} startMastery={startMastery.current} subjectIds={subjectIds} />;

  const ref = getTopic(pick.item.topicId);
  const onChecked = (r: { correct: boolean; conf?: Confidence; hints: number }) => {
    const key = pick.item.id + answers.length;
    if (checked.current === key) return;
    checked.current = key;
    if (!(pick.item.topicId in startMastery.current)) startMastery.current[pick.item.topicId] = mastery(getProgress().topics[pick.item.topicId]);
    recordAnswer({ skill: skillOf(pick.item), id: pick.item.id, topicId: pick.item.topicId, subjectId: pick.item.subjectId, d: pick.item.d, correct: r.correct, conf: r.conf, hints: r.hints, generated: pick.item.generated, snapshot: pick.item.generated ? snapshotOf(pick.item) : undefined });
    addStudyTime(Math.min(240, (Date.now() - shownAt.current) / 1000));
  };
  const onDone = (r: { correct: boolean; conf?: Confidence; hints: number; easier?: boolean }) => {
    const history = [...answers, { item: pick.item, source: pick.source, correct: r.correct, conf: r.conf, hints: r.hints }];
    setAnswers(history);
    engine.answered(pick.item, r.correct);
    const last2 = history.slice(-2);
    if (last2.length === 2 && last2.every((a) => !a.correct) && last2[0].item.topicId === last2[1].item.topicId && reteach === null) setReteach(pick.item.topicId);
    if (timeUp) { setDone(true); return; }
    let nx = r.easier ? engine.similarTo(pick.item) : undefined;
    const next = nx ? { item: nx, source: 'follow' as Source } : engine.next();
    shownAt.current = Date.now();
    if (!next) { setDone(true); return; }
    setPick(next);
    setLessonFor(next.lesson ? next.item.topicId : null);
    const n = history.length;
    if (n - lastBurstAt.current >= 10) {
      const c = engine.dueCards(4);
      if (c.length >= 3) { lastBurstAt.current = n; setBurst(c); }
    }
  };

  return (
    <div className="page narrow session">
      <div className="session-head mono-head">
        <button className="btn link small" onClick={() => setDone(true)}>End</button>
        <span>{planned}-minute session</span>
        <span className={left < 60 ? 'timer over' : ''}>{Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')} left</span>
      </div>
      <ProgressBar value={1 - left / (planned * 60)} />
      <div className="source-line">
        <span className={`pill src-${burst ? 'review' : pick.source}`}>{burst ? 'Flashcards' : lessonFor ? 'Quick lesson' : SOURCE_LABEL[pick.source]}</span>
        <span className="muted small">{burst ? 'Cards due for review. A quick burst of recall between questions.' : lessonFor ? 'A brand-new topic: the key idea first, then a question on it.' : <>{SOURCE_HELP[pick.source]}{pick.note ? <> <strong>{pick.note}.</strong></> : null}</>}</span>
        <span className="muted small mono push">{answers.length} done · {answers.filter((a) => a.correct).length} correct</span>
      </div>
      {answers.length === 0 && !burst && (() => {
        const pv = plan;
        const bits = [pv.fix ? `${pv.fix} to fix` : '', pv.due ? `${pv.due} topic review${pv.due === 1 ? '' : 's'} due` : '', pv.weak ? `${pv.weak} weak spot${pv.weak === 1 ? '' : 's'}` : '', pv.fresh ? 'some new material' : ''].filter(Boolean);
        return <p className="small muted session-plan"><strong>Today's plan:</strong> {bits.length ? bits.join(' · ') : 'mixed practice'}, plus the topics worth the most marks towards your target. The engine adapts after every answer.</p>;
      })()}
      {timeUp && (
        <div className="banner support row gap wrap">
          <span>Time's up. Well done. Finish this question to see your summary, or keep going.</span>
          <button className="btn small primary" onClick={() => extend(10)}>Keep going: 10 more minutes</button>
        </div>
      )}
      {burst ? (
        <CardBurst cards={burst} title={answers.length ? 'Quick flashcard burst' : 'Warm-up: flashcards due today'} intro="Say each answer before you flip. Recalling it is what makes it stick." color={ref?.subject.color} onDone={() => { setBurst(null); shownAt.current = Date.now(); }} />
      ) : reteach ? (
        <Reteach topicId={reteach} onContinue={() => setReteach('')} />
      ) : lessonFor && ref ? (
        <QuickLesson topic={ref.topic} onDone={() => { setLessonFor(null); shownAt.current = Date.now(); }} />
      ) : (
        <QuestionCard
          key={pick.item.id + answers.length}
          item={pick.item}
          topic={ref?.topic}
          onChecked={onChecked}
          onDone={onDone}
          nextLabel={timeUp ? 'See summary' : 'Next question'}
          canEasier
          explain={pick.explain}
        />
      )}
    </div>
  );
}

/** The key idea of a topic never studied, before the first question on it */
function QuickLesson({ topic, onDone }: { topic: Topic; onDone: () => void }) {
  return (
    <div className="card pad quick-lesson">
      <p className="eyebrow">New topic</p>
      <h2>{topic.title}</h2>
      {topic.summary && <p>{topic.summary}</p>}
      {topic.keyPoints.length > 0 && (
        <div className="callout callout-key">
          <div className="callout-title">Key points</div>
          <ul>{topic.keyPoints.slice(0, 5).map((k, i) => <li key={i}><Markdown text={k} inline /></li>)}</ul>
        </div>
      )}
      <details className="example"><summary>Read the full notes</summary><Markdown text={topic.notes} /></details>
      <div className="row end"><button className="btn primary" onClick={onDone}>Ask me a question</button></div>
    </div>
  );
}

function Summary({ answers, mins, fixedBefore, startMastery, subjectIds }: { answers: Answered[]; mins: number; fixedBefore: number; startMastery: Record<string, number>; subjectIds: string[] | null }) {
  const progress = useProgress();
  const right = answers.filter((a) => a.correct).length;
  const fixedNow = (progress.days[todayKey()]?.fixed ?? 0) - fixedBefore;
  const halfway = Object.values(progress.mistakes).filter((m) => (m.wins ?? 0) >= 1).length;
  const wrongTopics = [...new Set(answers.filter((a) => !a.correct).map((a) => a.item.topicId))];
  const topics = [...new Set(answers.map((a) => a.item.topicId))];
  const bySource = answers.reduce<Record<string, { n: number; c: number }>>((acc, a) => {
    const k = a.source === 'retry' || a.source === 'follow' ? 'fix' : a.source;
    acc[k] = { n: (acc[k]?.n ?? 0) + 1, c: (acc[k]?.c ?? 0) + (a.correct ? 1 : 0) };
    return acc;
  }, {});
  return (
    <div className="page narrow">
      <p className="eyebrow">Session complete · {mins} min</p>
      <h1><span className="mono">{right}/{answers.length}</span> correct</h1>
      <div className="week-grid">
        {(['fix', 'review', 'similar', 'weak', 'new'] as const).map((k) => (
          <div key={k} className="week-cell">
            <span className="muted small">{SOURCE_LABEL[k]}</span>
            <span className="mono big-n">{bySource[k]?.c ?? 0}<span className="muted">/{bySource[k]?.n ?? 0}</span></span>
          </div>
        )).slice(0, 4)}
      </div>
      <p className="small muted" style={{ marginTop: '0.8rem' }}>
        {fixedNow > 0 ? `${fixedNow} mistake${fixedNow === 1 ? '' : 's'} cleared from your Fix-it list. ` : ''}
        {halfway > 0 ? `${halfway} more ${halfway === 1 ? 'is' : 'are'} halfway. Answer ${halfway === 1 ? 'it' : 'them'} correctly again in a later session to clear ${halfway === 1 ? 'it' : 'them'}.` : ''}
      </p>

      {wrongTopics.length > 0 && (
        <section className="section">
          <h2>Revise next</h2>
          <div className="list">
            {wrongTopics.map((t) => {
              const r = getTopic(t);
              if (!r) return null;
              return (
                <a key={t} className="list-row" href={href(`/t/${t}`)}>
                  <SubjectMark subject={r.subject} size="sm" />
                  <span className="grow">{r.topic.title}</span>
                  <span className="small muted">{answers.filter((a) => a.item.topicId === t && !a.correct).length} wrong</span>
                  <Icon name="arrow" size={16} />
                </a>
              );
            })}
          </div>
        </section>
      )}

      <section className="section">
        <h2>Topic mastery</h2>
        <div className="topic-list">
          {topics.slice(0, 12).map((t) => {
            const r = getTopic(t);
            if (!r) return null;
            return (
              <div key={t} className="topic-row">
                <a className="topic-main" href={href(`/t/${t}`)}><span className="topic-title">{r.topic.title}</span></a>
                <span className="small mono">{Math.round((startMastery[t] ?? 0) * 100)}% → <strong>{Math.round(mastery(progress.topics[t]) * 100)}%</strong></span>
              </div>
            );
          })}
        </div>
      </section>

      {answers.some((a) => !a.correct) && (
        <section className="section">
          <h2>What you missed</h2>
          {answers.filter((a) => !a.correct).map((a, i) => (
            <details key={i} className="review">
              <summary><Markdown text={'q' in a.item && a.item.q ? a.item.q : a.item.type === 'cloze' ? a.item.text.replace(/\{\{([^}|]+)[^}]*\}\}/g, '____') : ''} inline /></summary>
              <Markdown text={a.item.why} />
            </details>
          ))}
        </section>
      )}

      <TodayExtras ids={subjectIds ?? undefined} />

      <div className="row gap wrap">
        <a className="btn primary" href={href('/session', { mins: 10, subjects: subjectIds?.join(',') || undefined, _: Date.now() })}>Keep going: 10 more minutes</a>
        <button className="btn" onClick={() => refresh()}>Another session</button>
        <a className="btn" href={href('/fix')}>Fix-it list</a>
        <a className="btn ghost" href={href('/')}>Today</a>
      </div>
    </div>
  );
}
