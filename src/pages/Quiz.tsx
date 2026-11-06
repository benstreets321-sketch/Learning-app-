import { useMemo, useRef, useState } from 'react';
import {
  activeSubjects, easierQuestion, getQuestion, getSubject, getTopic, makeGenerated, questionPool, randomGenerated, visibleTopics, visibleUnits,
  type GenSnapshot,
} from '../content/registry';
import type { QItem } from '../content/types';
import { adaptTarget, effectiveTheta, isStale, level, mastery, newTopicState, pCorrect, pickNext, type Confidence } from '../lib/engine';
import { addStudyTime, getProfile, getProgress, recordAnswer } from '../lib/store';
import { href, refresh } from '../lib/router';
import { QuestionCard } from '../components/QuestionCard';
import { Empty, ProgressBar } from '../components/ui';
import { Markdown } from '../components/Markdown';

interface Answered {
  item: QItem;
  correct: boolean;
  conf?: Confidence;
  hints: number;
}

function buildScope(query: URLSearchParams) {
  const profile = getProfile();
  const progress = getProgress();
  const scope = query.get('scope') ?? 'smart';
  const id = query.get('id') ?? '';
  // optional list of subjects (today's subject on the timetable)
  const only = query.get('subjects')?.split(',').filter(Boolean) ?? null;
  let topicIds: string[] = [];
  let title = 'Revision session';
  let fixed: QItem[] | null = null;

  if (scope === 'topic') {
    topicIds = [id];
    title = getTopic(id)?.topic.title ?? 'Topic quiz';
  } else if (scope === 'unit') {
    for (const s of activeSubjects(profile)) {
      const u = visibleUnits(s, profile).find((x) => x.id === id);
      if (u) { topicIds = u.topics.map((t) => t.id); title = u.title; }
    }
  } else if (scope === 'subject' || scope === 'mixed' || scope === 'weak') {
    const s = getSubject(id);
    if (s) {
      const all = visibleTopics(s, profile);
      topicIds = all.map((t) => t.id);
      title = `${s.name}${scope === 'mixed' ? ' – mixed review' : scope === 'weak' ? ' – weak spots' : ''}`;
      if (scope === 'weak') {
        const weak = all.filter((t) => ['weak', 'developing'].includes(level(progress.topics[t.id])));
        if (weak.length) topicIds = weak.map((t) => t.id);
        else title += ' (none yet – practising everything)';
      }
      if (scope === 'mixed') {
        const started = all.filter((t) => (progress.topics[t.id]?.n ?? 0) > 0);
        if (started.length >= 3) topicIds = started.map((t) => t.id);
      }
    }
  } else if (scope === 'mistakes') {
    title = id ? `Fix-it: ${getSubject(id)?.name ?? ''}` : only ? `Fix-it: ${only.map((s) => getSubject(s)?.short ?? s).join(', ')}` : 'Fix-it list';
    fixed = Object.values(progress.mistakes)
      .filter((m) => (!id || m.subjectId === id) && (!only || only.includes(m.subjectId)))
      .sort((a, b) => Number(b.confidentWrong) - Number(a.confidentWrong) || b.count - a.count)
      .map((m) => {
        if (m.snapshot) {
          try { return makeGenerated(JSON.parse(m.snapshot) as GenSnapshot); } catch { return undefined; }
        }
        return getQuestion(m.id);
      })
      .filter((x): x is QItem => !!x);
  } else {
    // smart: every active subject (or just today's), started topics weighted in, plus some new material
    const subs = activeSubjects(profile).filter((s) => !only || only.includes(s.id));
    title = only && subs.length ? `Smart revision: ${subs.map((s) => s.short).join(', ')}` : 'Smart revision';
    for (const s of (subs.length ? subs : activeSubjects(profile))) topicIds.push(...visibleTopics(s, profile).map((t) => t.id));
    const started = topicIds.filter((t) => (progress.topics[t]?.n ?? 0) > 0 || progress.topics[t]?.notesRead);
    if (started.length >= 4) {
      // keep all started topics + a handful of new ones from the start of each subject's course
      const fresh = activeSubjects(profile).flatMap((s) => visibleTopics(s, profile).filter((t) => !started.includes(t.id)).slice(0, 2).map((t) => t.id));
      topicIds = [...started, ...fresh];
    }
  }
  return { scope, title, topicIds, fixed };
}

export function QuizPage({ query }: { query: URLSearchParams }) {
  const setup = useMemo(() => buildScope(query), [query]);
  const n = Math.max(1, Math.min(50, Number(query.get('n')) || 10));
  const genOnly = query.get('gen') === '1';
  const timed = query.get('timed') === '1';
  const profile = getProfile();

  const pool = useMemo(() => (setup.fixed ? setup.fixed : questionPool(setup.topicIds, profile)), [setup, profile]);
  const genTopics = useMemo(() => setup.topicIds.filter((t) => getTopic(t)?.topic.generators?.length), [setup]);

  const asked = useRef(new Set<string>());
  const retry = useRef<{ item: QItem; at: number }[]>([]);
  const lastTopic = useRef<string | null>(null);
  const shownAt = useRef(Date.now());
  const startedAt = useRef(Date.now());
  const startMastery = useRef<Record<string, number>>({});
  const checkedFor = useRef<string | null>(null);

  const [answers, setAnswers] = useState<Answered[]>([]);
  const [reteach, setReteach] = useState<string | null>(null);
  const [current, setCurrent] = useState<QItem | undefined>(() => next([], 0));
  const [finished, setFinished] = useState(false);

  function next(history: Answered[], count: number): QItem | undefined {
    const progress = getProgress();
    const now = Date.now();
    // 1) spaced retry of something missed earlier in this session
    const due = retry.current.findIndex((r) => r.at <= count);
    if (due >= 0) {
      const [r] = retry.current.splice(due, 1);
      return r.item;
    }
    const { target } = adaptTarget(history.map((h) => h.correct));
    // fixed lists (mistakes) just go in order
    if (setup.fixed) {
      const item = setup.fixed.find((q) => !asked.current.has(q.id));
      if (item) asked.current.add(item.id);
      return item;
    }
    const remaining = pool.filter((q) => !asked.current.has(q.id));
    const useGen = genTopics.length > 0 && (genOnly || remaining.length === 0 || Math.random() < 0.3);
    if (useGen) {
      // weight towards weaker topics
      const weights = genTopics.map((t) => 1.2 - mastery(progress.topics[t], now));
      let r = Math.random() * weights.reduce((a, b) => a + b, 0);
      let tid = genTopics[0];
      for (let i = 0; i < genTopics.length; i++) { r -= weights[i]; if (r <= 0) { tid = genTopics[i]; break; } }
      const theta = effectiveTheta(progress.topics[tid] ?? newTopicState(), now);
      let lvl = 1, best = Infinity;
      for (let d = 1; d <= 5; d++) {
        const diff = Math.abs(pCorrect(theta, d) - target);
        if (diff < best) { best = diff; lvl = d; }
      }
      const g = randomGenerated(tid, lvl, profile);
      if (g) { asked.current.add(g.id); lastTopic.current = tid; return g; }
    }
    if (!remaining.length) return undefined;
    // interleave: avoid the same topic twice in a row when there is a choice
    const candidates = setup.topicIds.length > 1 ? remaining.filter((q) => q.topicId !== lastTopic.current) : remaining;
    const ctx = { now, srs: progress.items, topics: progress.topics, askedThisSession: asked.current, target, rand: Math.random };
    const item = pickNext(candidates.length ? candidates : remaining, ctx);
    // the best question left was seen very recently: give a freshly generated one on the same topic instead
    if (item && isStale(item, ctx) && genTopics.length) {
      const tid = genTopics.includes(item.topicId) ? item.topicId : genTopics[Math.floor(Math.random() * genTopics.length)];
      const g = randomGenerated(tid, Math.max(1, Math.min(5, item.d)), profile);
      if (g) { asked.current.add(g.id); lastTopic.current = tid; return g; }
    }
    if (item) { asked.current.add(item.id); lastTopic.current = item.topicId; }
    return item;
  }

  function handleChecked(item: QItem, r: { correct: boolean; conf?: Confidence; hints: number }) {
    if (checkedFor.current === item.id + answers.length) return;
    checkedFor.current = item.id + answers.length;
    if (!(item.topicId in startMastery.current)) startMastery.current[item.topicId] = mastery(getProgress().topics[item.topicId]);
    const snapshot = item.generated ? JSON.stringify(snapFromId(item)) : undefined;
    recordAnswer({ id: item.id, topicId: item.topicId, subjectId: item.subjectId, d: item.d, correct: r.correct, conf: r.conf, hints: r.hints, snapshot, generated: item.generated });
    addStudyTime(Math.min(180, (Date.now() - shownAt.current) / 1000));
  }

  function handleDone(item: QItem, r: { correct: boolean; conf?: Confidence; hints: number; easier?: boolean }) {
    const history = [...answers, { item, correct: r.correct, conf: r.conf, hints: r.hints }];
    setAnswers(history);
    if (!r.correct && !retry.current.some((x) => x.item.id === item.id) && answers.filter((a) => a.item.id === item.id).length === 0) {
      retry.current.push({ item, at: history.length + 3 });
    }
    // two wrong in a row on the same topic -> pause and reteach before carrying on
    const last2 = history.slice(-2);
    if (last2.length === 2 && last2.every((a) => !a.correct) && last2[0].item.topicId === last2[1].item.topicId && reteach === null) {
      setReteach(item.topicId);
    }
    if (history.length >= n && !r.easier) { setFinished(true); return; }
    let nx: QItem | undefined;
    if (r.easier) {
      nx = easierQuestion(item, profile, asked.current);
      if (nx) asked.current.add(nx.id);
    }
    nx = nx ?? next(history, history.length);
    if (!nx) { setFinished(true); return; }
    shownAt.current = Date.now();
    setCurrent(nx);
  }

  if (!current && !finished) {
    return (
      <Empty title={setup.scope === 'mistakes' ? 'Nothing to fix' : 'No questions here yet'}>
        <p className="muted">{setup.scope === 'mistakes' ? 'Questions you get wrong will appear here so you can fix them.' : 'Try another topic or check your settings.'}</p>
        <a className="btn" href="#/">Home</a>
      </Empty>
    );
  }

  if (finished) return <Summary title={setup.title} answers={answers} startMastery={startMastery.current} secs={(Date.now() - startedAt.current) / 1000} timed={timed} pre={query.get('pre') === '1'} />;

  const ref = current ? getTopic(current.topicId) : undefined;
  const mode = adaptTarget(answers.map((a) => a.correct)).mode;
  const correctSoFar = answers.filter((a) => a.correct).length;
  const recentWrong = answers.slice(-6).filter((a) => !a.correct).length;
  const total = Math.max(n, answers.length + 1);

  return (
    <div className="page narrow session">
      <div className="session-head">
        <a className="small" href={ref ? href(`/s/${ref.subject.id}`, { tab: 'practice' }) : '#/'}>End session</a>
        <span className="small">{setup.title}</span>
        <span className="small mono">{answers.length + 1}/{total} · {correctSoFar} correct</span>
      </div>
      <ProgressBar value={answers.length / total} color={ref?.subject.color} />
      {mode === 'stretch' && <div className="banner stretch">Three in a row – the next one will be harder.</div>}
      {mode === 'support' && !reteach && recentWrong < 4 && <div className="banner support">Two wrong – the next question will be a bit easier.</div>}
      {recentWrong >= 4 && !reteach && (
        <div className="banner care">
          <strong>This one's tough right now – that's normal.</strong> Getting things wrong while practising is how memory gets stronger.
          {' '}You could <a href={href('/rescue', { topic: current?.topicId ?? '' })}>rebuild this topic step by step</a>, or take a 5-minute break and come back.
        </div>
      )}
      {reteach ? (
        <Reteach topicId={reteach} onContinue={() => setReteach('')} />
      ) : (
        current && (
          <QuestionCard
            key={current.id + answers.length}
            item={current}
            topic={ref?.topic}
            onChecked={(r) => handleChecked(current, r)}
            onDone={(r) => handleDone(current, r)}
            nextLabel={answers.length + 1 >= n ? 'See results' : 'Next question'}
            canEasier={!setup.fixed}
          />
        )
      )}
    </div>
  );
}

function snapFromId(item: QItem): GenSnapshot {
  // id format gen:<generatorId>:<seed>
  const [, g, s] = item.id.split(':');
  return { g, s: Number(s), l: item.d, t: item.topicId };
}

export function Reteach({ topicId, onContinue }: { topicId: string; onContinue: () => void }) {
  const ref = getTopic(topicId);
  if (!ref) return <div className="row end"><button className="btn primary" onClick={onContinue}>Carry on</button></div>;
  const { topic } = ref;
  const ex = topic.workedExamples?.[0];
  return (
    <div className="reteach">
      <h2>Quick reset: {topic.title}</h2>
      <p className="muted">Two misses in a row is a signal, not a failure. Here's the core idea again before we carry on with an easier question.</p>
      {topic.simpler ? <Markdown text={topic.simpler} /> : null}
      {topic.keyPoints.length > 0 && (
        <div className="callout callout-key">
          <div className="callout-title">Key points</div>
          <ul>{topic.keyPoints.slice(0, 6).map((k, i) => <li key={i}><Markdown text={k} inline /></li>)}</ul>
        </div>
      )}
      {ex && (
        <details className="example">
          <summary>Worked example: {ex.title}</summary>
          <Markdown text={ex.problem} />
          <ol className="steps">{ex.steps.map((s, i) => <li key={i}><Markdown text={s} inline /></li>)}</ol>
          {ex.answer && <p><strong>Answer:</strong> <Markdown text={ex.answer} inline /></p>}
        </details>
      )}
      <div className="row gap end">
        <a className="btn ghost" href={href(`/t/${topicId}`)}>Open full lesson</a>
        <button className="btn primary" onClick={onContinue}>Got it – carry on</button>
      </div>
    </div>
  );
}

function Summary({ title, answers, startMastery, secs, timed, pre }: { title: string; answers: Answered[]; startMastery: Record<string, number>; secs: number; timed: boolean; pre: boolean }) {
  const progress = getProgress();
  const right = answers.filter((a) => a.correct).length;
  const pct = answers.length ? right / answers.length : 0;
  const topicIds = [...new Set(answers.map((a) => a.item.topicId))];
  const wrong = answers.filter((a) => !a.correct);
  const confidentWrong = wrong.filter((a) => a.conf === 'sure').length;
  const luckyGuesses = answers.filter((a) => a.correct && a.conf === 'guess').length;
  const first = getTopic(answers[0]?.item.topicId ?? '');

  return (
    <div className="page narrow">
      <p className="eyebrow">Session complete</p>
      <h1><span className="mono">{right}/{answers.length}</span> correct</h1>
      <p className="muted">{title}</p>
      <div className="stat-row">
        <div className="stat"><span className="stat-n">{right}/{answers.length}</span><span className="muted small">correct</span></div>
        <div className="stat"><span className="stat-n">{Math.round(pct * 100)}%</span><span className="muted small">accuracy</span></div>
        <div className="stat"><span className="stat-n">{Math.floor(secs / 60)}:{String(Math.round(secs % 60)).padStart(2, '0')}</span><span className="muted small">{timed ? 'your time' : 'time'}</span></div>
      </div>

      {confidentWrong > 0 && (
        <div className="callout callout-warn">
          <div className="callout-title">{confidentWrong} confident mistake{confidentWrong > 1 ? 's' : ''}</div>
          <p>You were sure but wrong – these are misconceptions, and fixing them gives the biggest gains. They're top of your Fix-it list.</p>
        </div>
      )}
      {luckyGuesses > 0 && <p className="muted small">{luckyGuesses} correct answer{luckyGuesses > 1 ? 's were guesses' : ' was a guess'} - they'll come back sooner to check you really know them.</p>}

      <h3>Topic mastery</h3>
      <div className="topic-list">
        {topicIds.map((tid) => {
          const ref = getTopic(tid);
          if (!ref) return null;
          const before = startMastery[tid] ?? 0;
          const after = mastery(progress.topics[tid]);
          return (
            <div key={tid} className="topic-row">
              <a className="topic-main" href={href(`/t/${tid}`)}><span className="topic-title">{ref.topic.title}</span></a>
              <div className="topic-side">
                <span className="small">{Math.round(before * 100)}% → <strong>{Math.round(after * 100)}%</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {wrong.length > 0 && (
        <>
          <h3>Review what you missed</h3>
          {wrong.map((a, i) => (
            <details key={i} className="review">
              <summary><Markdown text={'q' in a.item && a.item.q ? a.item.q : a.item.type === 'cloze' ? a.item.text.replace(/\{\{([^}|]+)[^}]*\}\}/g, '____') : ''} inline /></summary>
              <Markdown text={a.item.why} />
            </details>
          ))}
        </>
      )}

      <h3>What next?</h3>
      {pre && first && (
        <div className="callout callout-tip">
          <div className="callout-title">Now read the lesson</div>
          <p>Look out for the answers to the questions you just tried – that's what makes a pre-test work.</p>
          <a className="btn primary small" href={href(`/t/${first.topic.id}`)}>Read {first.topic.title}</a>
        </div>
      )}
      <div className="row gap wrap">
        {pct < 0.5 && first && <a className="btn primary" href={href(`/t/${first.topic.id}`)}>Re-read the lesson</a>}
        {pct >= 0.8 && first?.topic.examQuestions?.length ? <a className="btn primary" href={href(`/t/${first.topic.id}`, { tab: 'exam' })}>Try an exam question</a> : null}
        <button className="btn" onClick={() => refresh()}>Another round</button>
        {wrong.length > 0 && <a className="btn" href="#/fix">Fix-it list</a>}
        {first && <a className="btn ghost" href={href(`/s/${first.subject.id}`)}>Back to {first.subject.short}</a>}
      </div>
    </div>
  );
}
