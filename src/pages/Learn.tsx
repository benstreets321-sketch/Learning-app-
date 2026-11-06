// One-tap "Learn": the app picks today's next topic and teaches it as a short guided lesson -
// pre-test → notes in chunks, each with a quick question → worked example → adaptive practice → flashcards → summary.
import { useEffect, useMemo, useRef, useState } from 'react';
import type { QItem } from '../content/types';
import { getTopic } from '../content/registry';
import { lessonChunks, lessonQuestions, pickLearnTopic, practiceQuestion } from '../lib/learn';
import { addStudyTime, getProfile, getProgress, markNotesRead, recordAnswer } from '../lib/store';
import { focusFor } from '../lib/week';
import { cardId } from '../lib/insights';
import { skillOf, weakSkills } from '../lib/skills';
import { href, go } from '../lib/router';
import { launchSession } from '../components/StartSession';
import { QuestionCard } from '../components/QuestionCard';
import { CardBurst } from '../components/CardBurst';
import { Markdown } from '../components/Markdown';
import { ProgressBar, Empty } from '../components/ui';
import { Icon } from '../components/Icon';
import { SubjectMark } from '../components/SubjectMark';
import type { Confidence } from '../lib/engine';

type Phase = 'pre' | 'lesson' | 'example' | 'practice' | 'cards' | 'done';
interface Result { item: QItem; correct: boolean; phase: Phase }
const PRACTICE = 5;

const snapshotOf = (item: QItem) => {
  const [, g, s] = item.id.split(':');
  return JSON.stringify({ g, s: Number(s), l: item.d, t: item.topicId });
};

export function LearnPage({ query }: { query: URLSearchParams }) {
  const profile = getProfile();
  const choice = useMemo(() => {
    const id = query.get('topic');
    const ref = id ? getTopic(id) : undefined;
    if (ref) return { ...ref, reason: 'The topic you chose.' };
    const subjects = query.get('subjects')?.split(',').filter(Boolean) ?? focusFor(profile).ids ?? null;
    return pickLearnTopic(profile, getProgress(), subjects);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!choice) return <div className="page narrow"><Empty title="Nothing to learn here yet">Choose your subjects in Settings first.</Empty></div>;
  return <Lesson key={choice.topic.id} choice={choice} />;
}

function Lesson({ choice }: { choice: NonNullable<ReturnType<typeof pickLearnTopic>> }) {
  const { subject, topic } = choice;
  const profile = getProfile();
  const chunks = useMemo(() => lessonChunks(topic.notes), [topic.notes]);
  const bank = useMemo(() => lessonQuestions(topic.id, profile), [topic.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const used = useRef(new Set<string>());
  const startedAt = useRef(Date.now());
  const shownAt = useRef(Date.now());
  const checkedKey = useRef('');
  // the kind of question this student finds hardest in the subject gets a little extra practice in the lesson
  const weakKind = useMemo(() => weakSkills(getProgress().skills, [subject.id]).find((w) => w.acc < 0.65)?.skill, [subject.id]);
  const take = (list: QItem[]) => { const q = list.find((x) => !used.current.has(x.id)); if (q) used.current.add(q.id); return q; };
  // pre-test: two quick, easy questions (not scored - guessing first makes the lesson stick)
  const pre = useMemo(() => {
    const easy = bank.filter((q) => q.d <= 2 && ['mcq', 'tf', 'num', 'text'].includes(q.type));
    return [take(easy), take(easy)].filter(Boolean) as QItem[];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // one quick question after each chunk of notes
  const checks = useMemo(() => chunks.map(() => take(bank.filter((q) => q.d <= 3)) ?? practiceQuestion(topic.id, 2, profile, used.current, false)), []); // eslint-disable-line react-hooks/exhaustive-deps
  const cards = useMemo(() => topic.flashcards.slice(0, 6).map((card) => ({ id: cardId(topic.id, card.front), card, topicId: topic.id })), [topic]);

  const [phase, setPhase] = useState<Phase>(pre.length ? 'pre' : chunks.length ? 'lesson' : 'practice');
  const [i, setI] = useState(0);
  const [asking, setAsking] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [practice, setPractice] = useState<QItem | undefined>();
  const [level, setLevel] = useState(2);
  const [retry, setRetry] = useState<QItem[]>([]);
  const [knewCards, setKnewCards] = useState(0);
  const example = topic.workedExamples?.[0];

  const record = (item: QItem, r: { correct: boolean; conf?: Confidence; hints: number }) => {
    const key = item.id + results.length;
    if (checkedKey.current === key) return;
    checkedKey.current = key;
    recordAnswer({ skill: skillOf(item), id: item.id, topicId: item.topicId, subjectId: item.subjectId, d: item.d, correct: r.correct, conf: r.conf, hints: r.hints, generated: item.generated, snapshot: item.generated ? snapshotOf(item) : undefined });
    addStudyTime(Math.min(240, (Date.now() - shownAt.current) / 1000));
  };

  const nextPractice = (lvl: number, n: number, again: QItem[]) => {
    if (n >= PRACTICE + Math.min(2, again.length)) { setPractice(undefined); setPhase(cards.length ? 'cards' : 'done'); return; }
    // a missed question comes back (as fresh numbers if generated) after two others
    if (again.length && n >= 2 && n % 3 === 2) {
      const [first, ...rest] = again;
      setRetry(rest);
      setPractice(first);
      return;
    }
    let q = practiceQuestion(topic.id, lvl, profile, used.current, n % 2 === 0);
    if (weakKind && n === 2) {
      for (let k = 0; k < 6; k++) { const alt = practiceQuestion(topic.id, lvl, profile, used.current, true); if (alt && skillOf(alt) === weakKind) { q = alt; break; } }
    }
    if (!q) { setPractice(undefined); setPhase(cards.length ? 'cards' : 'done'); return; }
    used.current.add(q.id);
    setPractice(q);
  };

  const steps: { id: Phase; label: string }[] = [
    ...(pre.length ? [{ id: 'pre' as Phase, label: 'Quick check' }] : []),
    ...(chunks.length ? [{ id: 'lesson' as Phase, label: 'Lesson' }] : []),
    ...(example ? [{ id: 'example' as Phase, label: 'Example' }] : []),
    { id: 'practice', label: 'Practice' },
    ...(cards.length ? [{ id: 'cards' as Phase, label: 'Flashcards' }] : []),
  ];
  const stepIdx = Math.max(0, steps.findIndex((s) => s.id === phase));
  // entering practice picks the first question; each answer then picks the next
  useEffect(() => { if (phase === 'practice' && !practice) nextPractice(level, 0, retry); }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'done') return <LearnSummary choice={choice} results={results} knewCards={knewCards} cards={cards.length} mins={Math.max(1, Math.round((Date.now() - startedAt.current) / 60000))} />;

  const practiceDone = results.filter((r) => r.phase === 'practice').length;

  return (
    <div className="page narrow session learn" style={{ ['--subj' as string]: subject.color }}>
      <div className="session-head">
        <a className="small" href={href('/')}>End</a>
        <span className="small row gap"><SubjectMark subject={subject} size="sm" /> Learn: {topic.title}</span>
        <span className="small muted">{steps[stepIdx]?.label}</span>
      </div>
      <ol className="learn-steps" aria-label="Lesson steps">
        {steps.map((s, k) => <li key={s.id} className={k < stepIdx ? 'done' : k === stepIdx ? 'on' : ''}>{s.label}</li>)}
      </ol>
      <ProgressBar value={(stepIdx + (phase === 'lesson' ? i / Math.max(1, chunks.length) : phase === 'practice' ? Math.min(1, practiceDone / PRACTICE) : 0)) / steps.length} color={subject.color} />

      {phase === 'pre' && (
        <>
          {i === 0 && <div className="banner support small"><Icon name="bulb" size={16} /> <span><strong>{choice.reason}</strong> First, a quick check – have a go even if you're not sure. Guessing before the lesson makes it stick better, and it isn't scored.</span></div>}
          <QuestionCard
            key={`pre${i}`}
            item={pre[i]}
            topic={topic}
            nextLabel={i + 1 < pre.length ? 'Next' : 'Start the lesson'}
            onDone={() => { shownAt.current = Date.now(); if (i + 1 < pre.length) setI(i + 1); else { setI(0); setPhase(chunks.length ? 'lesson' : example ? 'example' : 'practice'); } }}
          />
        </>
      )}

      {phase === 'lesson' && (
        !asking ? (
          <div className="lesson-chunk card pad">
            <p className="eyebrow">Part {i + 1} of {chunks.length}</p>
            <Markdown text={chunks[i]} />
            {i === chunks.length - 1 && topic.keyPoints.length > 0 && (
              <div className="callout callout-key">
                <div className="callout-title">Must know</div>
                <ul>{topic.keyPoints.slice(0, 6).map((k, n) => <li key={n}><Markdown text={k} inline /></li>)}</ul>
              </div>
            )}
            <div className="row end"><button className="btn primary" onClick={() => { shownAt.current = Date.now(); if (checks[i]) setAsking(true); else if (i + 1 < chunks.length) setI(i + 1); else { markNotesRead(topic.id); setI(0); setPhase(example ? 'example' : 'practice'); } }}>{checks[i] ? 'Got it – check me' : 'Next'}</button></div>
          </div>
        ) : (
          <QuestionCard
            key={`chk${i}`}
            item={checks[i]!}
            topic={topic}
            explain={i === 0}
            onChecked={(r) => record(checks[i]!, r)}
            nextLabel={i + 1 < chunks.length ? 'Next part' : 'Carry on'}
            onDone={(r) => {
              setResults((rs) => [...rs, { item: checks[i]!, correct: r.correct, phase: 'lesson' }]);
              if (!r.correct) setRetry((x) => [...x, checks[i]!]);
              setAsking(false);
              if (i + 1 < chunks.length) setI(i + 1);
              else { markNotesRead(topic.id); setI(0); setPhase(example ? 'example' : 'practice'); }
            }}
          />
        )
      )}

      {phase === 'example' && example && (
        <WorkedExample ex={example} onDone={() => setPhase('practice')} />
      )}

      {phase === 'practice' && practice && (
        <>
          <p className="muted small">Practice {Math.min(practiceDone + 1, PRACTICE)} of {PRACTICE} – the questions get harder when you're right and easier when you're not.</p>
          <QuestionCard
            key={`p${practice.id}${practiceDone}`}
            item={practice}
            topic={topic}
            canEasier
            explain={practiceDone === 1 && (practice.type === 'mcq' || practice.type === 'tf' || practice.type === 'multi')}
            onChecked={(r) => record(practice, r)}
            nextLabel="Next"
            onDone={(r) => {
              setResults((rs) => [...rs, { item: practice, correct: r.correct, phase: 'practice' }]);
              const lvl = Math.max(1, Math.min(5, level + (r.correct ? 1 : -1)));
              setLevel(lvl);
              const again = r.correct ? retry : [...retry, practice];
              setRetry(again);
              shownAt.current = Date.now();
              nextPractice(lvl, practiceDone + 1, again);
            }}
          />
        </>
      )}

      {phase === 'cards' && (
        <CardBurst cards={cards} color={subject.color} title="Lock it in: flashcards" intro="Say each answer before you flip. These cards now come back for review on their own." onDone={(k) => { setKnewCards(k); setPhase('done'); }} />
      )}
    </div>
  );
}

function WorkedExample({ ex, onDone }: { ex: NonNullable<import('../content/types').Topic['workedExamples']>[number]; onDone: () => void }) {
  const [shown, setShown] = useState(1);
  const all = shown >= ex.steps.length;
  return (
    <div className="card pad worked">
      <p className="eyebrow">Worked example</p>
      <h3>{ex.title}</h3>
      <Markdown text={ex.problem} />
      <ol className="steps">{ex.steps.slice(0, shown).map((s, k) => <li key={k}><Markdown text={s} inline /></li>)}</ol>
      {all && ex.answer && <p><strong>Answer:</strong> <Markdown text={ex.answer} inline /></p>}
      <p className="muted small">{all ? 'Now you try – the practice questions use the same method.' : 'Try to predict the next step before you reveal it.'}</p>
      <div className="row end">{all ? <button className="btn primary" onClick={onDone}>Start practice</button> : <button className="btn primary" onClick={() => setShown((n) => n + 1)}>Next step</button>}</div>
    </div>
  );
}

function LearnSummary({ choice, results, knewCards, cards, mins }: { choice: NonNullable<ReturnType<typeof pickLearnTopic>>; results: Result[]; knewCards: number; cards: number; mins: number }) {
  const profile = getProfile();
  const right = results.filter((r) => r.correct).length;
  const wrong = results.length - right;
  const goal = profile.dailyGoal;
  return (
    <div className="page narrow">
      <div className="card pad learn-done" style={{ ['--subj' as string]: choice.subject.color }}>
        <p className="eyebrow">Lesson complete · {mins} min</p>
        <h1>{choice.topic.title}</h1>
        <div className="kpis">
          <div className="kpi"><span className="mono big">{right}/{results.length}</span><span className="muted small">questions right</span></div>
          {cards > 0 && <div className="kpi"><span className="mono big">{knewCards}/{cards}</span><span className="muted small">flashcards known</span></div>}
        </div>
        <ul className="small learn-next">
          <li><Icon name="clock" size={14} /> This topic now comes back by itself: a review question in your sessions over the next few days, and the flashcards when they're due.</li>
          {wrong > 0 && <li><Icon name="fix" size={14} /> {wrong} question{wrong === 1 ? '' : 's'} went on your Fix-it list – your session brings {wrong === 1 ? 'it' : 'them'} back until you get {wrong === 1 ? 'it' : 'them'} right twice.</li>}
          <li><Icon name="target" size={14} /> Your {goal}-minute session mixes this in with reviews, mistakes and weak spots, so it all ties together.</li>
        </ul>
        <div className="row gap wrap">
          <button className="btn primary big" onClick={() => launchSession(goal)}>Start {goal}-minute session</button>
          <button className="btn" onClick={() => go('/learn', { _: Date.now() })}>Learn the next topic</button>
          <a className="btn ghost" href={href(`/t/${choice.topic.id}`)}>Full topic page</a>
        </div>
      </div>
    </div>
  );
}
