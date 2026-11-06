import { Suspense } from 'react';
import { lazyNamed } from '../lib/lazy';
import { activeSubjects, totalCounts } from '../content/registry';
import { href } from '../lib/router';
import { streak, useProfile, useProgress } from '../lib/store';
import { daysToExam, dueCardCount, recommendations, subjectStats } from '../lib/insights';
import { todayKey } from '../lib/util';
import { ProgressBar, Section } from '../components/ui';
import { SubjectMark } from '../components/SubjectMark';
import { Icon } from '../components/Icon';
import { InstallCard } from '../components/Install';
import { STRATEGY_TIPS } from '../content/strategies';
import { specCoverage, uncovered } from '../lib/coverage';
import { WEEK_DAYS, effectiveWeek, focusFor, groupById } from '../lib/week';
import { go } from '../lib/router';
import { pickLearnTopic } from '../lib/learn';
import { sessionPreview } from '../lib/session';
import { predictSubject, rangeText, shortGrade } from '../lib/predict';
import { launchSession } from '../components/StartSession';
import { PhaseCard, TodayExtras, WeeklyReview, usePredictionSnapshot } from '../components/Coach';
import { phaseFor } from '../lib/exams';
import { courseCoverage } from '../lib/daily';

const HomeMocks = lazyNamed(() => import('../components/MockCards'), (m) => m.HomeMocks);

export function Home() {
  const profile = useProfile();
  const progress = useProgress();
  const subjects = activeSubjects(profile);
  const stats = subjects.map((s) => subjectStats(s, profile, progress));
  const recs = recommendations(profile, progress, 6);
  const today = progress.days[todayKey()] ?? { q: 0, c: 0, cards: 0, secs: 0 };
  const mins = Math.round(today.secs / 60);
  const days = daysToExam(profile);
  const st = streak(progress);
  // one subject a day from the weekly timetable (e.g. Monday History, Thursday Maths)
  const focus = focusFor(profile);
  const onlyQ = focus.ids?.join(',');
  const week = effectiveWeek(profile);
  const todayN = new Date().getDay();
  const dueCards = dueCardCount(profile, progress, focus.ids);
  const mistakes = Object.values(progress.mistakes).filter((m) => !focus.ids || focus.ids.includes(m.subjectId)).length;
  const tip = STRATEGY_TIPS[new Date().getDate() % STRATEGY_TIPS.length];
  const counts = totalCounts();
  const goal = profile.dailyGoal;

  // Two buttons, no options: Learn (the next topic, taught) and the session (everything else, chosen by the engine)
  const phase = phaseFor(profile, courseCoverage(profile, progress).frac);
  const learnNext = pickLearnTopic(profile, progress, focus.ids, [], Date.now(), phase.phase === 'exam-season' || phase.phase === 'exam-eve');
  usePredictionSnapshot();
  const preview = sessionPreview(focus.ids ?? null);
  const goalDone = mins >= goal;
  const preds = (focus.ids ? subjects.filter((x) => focus.ids!.includes(x.id)) : []).map((x) => predictSubject(x, profile, progress));
  const sessionBits = [
    mistakes ? `${mistakes} to fix` : '',
    dueCards ? `${dueCards} card${dueCards === 1 ? '' : 's'} due` : '',
    preview.due ? `${preview.due} review${preview.due === 1 ? '' : 's'}` : '',
    preview.weak ? `${preview.weak} weak spot${preview.weak === 1 ? '' : 's'}` : '',
  ].filter(Boolean);

  const dateLine = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const subjectWord = focus.group?.short ?? 'Revision';
  const evening = new Date().getHours() >= 16;
  const frac = Math.min(1, mins / Math.max(1, goal));
  const RING = 2 * Math.PI * 40;
  const note = goalDone
    ? 'Done for today. Keep going if you like: it all still counts.'
    : focus.exam
      ? 'Exam season: today follows your next exam instead of the timetable.'
      : '';

  return (
    <div className="page home">
      <section className="today">
        <p className="today-top mono"><span>{dateLine}</span><span>{days > 0 ? `${days} day${days === 1 ? '' : 's'} to go` : 'Exam season'}</span></p>
        <div className="today-head">
          <svg className="focus-ring" width="96" height="96" viewBox="0 0 96 96" role="img" aria-label={`${mins} of ${goal} minutes done today`}>
            <circle cx="48" cy="48" r="40" className="fr-track" />
            {frac > 0 && <circle cx="48" cy="48" r="40" className={`fr-fill ${goalDone ? 'done' : ''}`} strokeDasharray={`${(frac * RING).toFixed(1)} ${RING.toFixed(1)}`} transform="rotate(-90 48 48)" />}
            <text x="48" y="50" textAnchor="middle" className="fr-n">{mins}</text>
            <text x="48" y="66" textAnchor="middle" className="fr-u">{goalDone ? 'DONE' : `OF ${goal} MIN`}</text>
          </svg>
          <div className="today-name">
            <p className="today-kicker">{evening ? "Tonight's subject" : "Today's subject"}{profile.name ? `, ${profile.name}` : ''}</p>
            <h1 className="today-title">{subjectWord}</h1>
            <p className="today-stats"><span className="mono">{mins}</span> of <span className="mono">{goal}</span> min · {st > 0 ? <><span className="mono">{st}</span>-day streak</> : 'start a streak today'}</p>
          </div>
        </div>
        {note && <p className="today-intro">{note}</p>}

        {st > 0 && today.q + today.cards === 0 && new Date().getHours() >= 17 && (
          <p className="notice small">
            <Icon name="flame" size={16} /> Nothing yet today. Ten minutes keeps your {st}-day streak going.
            <a className="btn small" href={href('/quiz', { scope: 'smart', n: 8, subjects: onlyQ })}>Ten minutes now</a>
          </p>
        )}

        <div className="today-actions">
          <button className="today-btn learn" onClick={() => go('/learn', { _: Date.now() })}>
            <span className="today-label">Learn · 15 min</span>
            <span className="today-main">{learnNext ? learnNext.topic.title : 'Your next topic'}</span>
            <span className="today-sub">Lesson, practice and flashcards</span>
          </button>
          <button className="today-btn session" onClick={() => launchSession(goal, focus.ids ?? undefined)}>
            <span className="today-label">{goal}-minute session</span>
            <span className="today-main">{sessionBits.length ? sessionBits.join(', ') : 'Practice, reviews and new questions'}</span>
            <span className="today-sub">Every question is picked for you</span>
          </button>
        </div>

        <div className="also-today">
          <TodayExtras ids={focus.ids} />
          {preds.map((p) => (
            <a key={p.subject.id} className="extra-card" href={href('/progress', { tab: 'grades' })}>
              <span className="ex-kind">Grade</span>
              <span className="grow clip">{preds.length > 1 ? `${p.subject.short}: ` : ''}{p.ready ? <>Predicted <strong className="mono">{rangeText(p)}</strong></> : 'A prediction appears after about 20 answers'}{p.target ? <>, target <strong className="mono">{shortGrade(p.target)}</strong>{p.ready ? (p.gap ? ` (${Math.ceil(p.gap)}% to go)` : ' (on track)') : ''}</> : ''}</span>
              {!p.target && <span className="small muted">Set a target</span>}
            </a>
          ))}
        </div>

        {goalDone && (
          <div className="keep-going">
            <span className="small"><strong>Goal reached.</strong> Extra practice still counts towards your progress and Fix-it list.</span>
            <div className="row gap wrap">
              <a className="btn small primary" href={href('/session', { mins: 10, subjects: onlyQ, _: Date.now() })}>Keep going: 10 more minutes{focus.group ? ` of ${focus.group.short}` : ''}</a>
              <a className="btn small" href={href('/session', { mins: 20, subjects: onlyQ, _: Date.now() })}>20 more minutes</a>
              {focus.group && <a className="btn small ghost" href={href('/session', { mins: 15, _: Date.now() })}>15 minutes, all subjects</a>}
            </div>
          </div>
        )}

        <div className="week-strip" aria-label="Your weekly timetable">
          {WEEK_DAYS.map((d) => (
            <span key={d.n} className={`wk ${d.n === todayN ? 'on' : ''}`} title={`${d.name}: ${groupById(week[d.n])?.name ?? 'All my subjects'}`}>
              <span className="wk-d">{d.short}</span>
              <span className="wk-s">{groupById(week[d.n])?.short ?? 'Mixed'}</span>
            </span>
          ))}
          <a className="small wk-edit" href={href('/setup', { tab: 'week' })}>Change</a>
        </div>
      </section>

      <PhaseCard compact />

      {[0, 1].includes(new Date().getDay()) && Object.keys(progress.days).length > 2 && (
        <Section title="Your week" right={<a className="small" href="#/progress">Progress</a>}>
          <WeeklyReview />
        </Section>
      )}

      <nav className="tool-links" aria-label="Other ways to revise">
        <a href={href('/rescue')}><Icon name="life" size={18} /> Rescue a topic you're stuck on</a>
        <a href={href('/sprint')}><Icon name="clock" size={18} /> 90-second sprint{progress.sprints?.all ? <span className="muted"> (best {progress.sprints.all})</span> : null}</a>
        <a href={href('/tools/calculator')}><Icon name="calc" size={18} /> Calculator, periodic table and formula sheets</a>
      </nav>

      <InstallCard />

      <Section title="Next up" right={<a className="small" href="#/plan">Revision plan</a>}>
        <div className="rec-list">
          {recs.map((r) => (
            <a
              key={r.topic.id}
              className="rec"
              href={
                r.action === 'learn' ? href(`/t/${r.topic.id}`) :
                r.action === 'exam' ? href(`/t/${r.topic.id}`, { tab: 'exam' }) :
                href('/quiz', { scope: 'topic', id: r.topic.id, n: 8 })
              }
            >
              <SubjectMark subject={r.subject} size="sm" />
              <span className="rec-body">
                <span className="rec-title">{r.topic.title}</span>
                <span className="muted small">{r.subject.short}. {r.reason}</span>
              </span>
              <span className="rec-action small">{r.action === 'learn' ? 'Learn' : r.action === 'exam' ? 'Exam question' : 'Practise'}</span>
            </a>
          ))}
        </div>
      </Section>

      <Suspense fallback={null}><HomeMocks /></Suspense>

      <Section title="Your subjects" right={<a className="small" href="#/setup">Subjects and options</a>}>
        <div className="subject-list">
          {stats.map((s) => (
            <a key={s.subject.id} className="subject-row" href={href(`/s/${s.subject.id}`)} style={{ ['--subj' as string]: s.subject.color }}>
              <SubjectMark subject={s.subject} size="sm" />
              <span className="subject-name">{s.subject.name}</span>
              <span className="muted small subject-meta">{s.started} of {s.topics.length} topics{s.mistakes > 0 && <>, {s.mistakes} to fix</>}</span>
              <ProgressBar value={s.mastery} color={s.subject.color} label={`${s.subject.name} mastery`} />
              <span className="mono subject-pct">{Math.round(s.mastery * 100)}%</span>
            </a>
          ))}
        </div>
      </Section>

      {(() => {
        const gaps = uncovered(subjects, profile, progress, 3);
        const totals = subjects.map((s) => specCoverage(s, profile, progress)).reduce((a, c) => ({ t: a.t + c.total, s: a.s + c.started }), { t: 0, s: 0 });
        return (
          <Section title="Exam coverage" right={<a className="small" href="#/progress">All subjects</a>}>
            <p className="cov-line"><span className="mono">{totals.s}</span> of <span className="mono">{totals.t}</span> specification points practised</p>
            <div className="cov-bar"><span className="sec" style={{ width: `${(totals.s / Math.max(1, totals.t)) * 100}%` }} /></div>
            {gaps.length > 0 && (
              <>
                <p className="small muted" style={{ marginTop: '0.8rem' }}>Not started yet:</p>
                <div className="list">
                  {gaps.map((g) => (
                    <a key={g.subject.id + g.point.code} className="list-row" href={href(`/t/${g.topicId}`)}>
                      <SubjectMark subject={g.subject} size="sm" />
                      <span className="grow">{g.point.title}</span>
                      <span className="mono small muted">{g.point.code}</span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </Section>
        );
      })()}

      <aside className="tip">
        <p className="eyebrow">Revision tip</p>
        <p><strong>{tip.title}.</strong> {tip.text} <a className="small" href="#/how">How to revise</a></p>
      </aside>

      <p className="muted small foot-counts">
        {counts.topics} topics, {counts.questions.toLocaleString()} written questions, {counts.cards.toLocaleString()} flashcards, {counts.exam} exam questions and {counts.generatorTypes} question generators.
      </p>
    </div>
  );
}
