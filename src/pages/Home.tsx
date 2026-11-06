import { Suspense } from 'react';
import { lazyNamed } from '../lib/lazy';
import { activeSubjects, totalCounts } from '../content/registry';
import { href } from '../lib/router';
import { streak, useProfile, useProgress } from '../lib/store';
import { daysToExam, dueCardCount, recommendations, subjectStats } from '../lib/insights';
import { todayKey } from '../lib/util';
import { ProgressBar, Ring, Section } from '../components/ui';
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
  const learnNext = pickLearnTopic(profile, progress, focus.ids);
  const preview = sessionPreview(focus.ids ?? null);
  const goalDone = mins >= goal;
  const preds = (focus.ids ? subjects.filter((x) => focus.ids!.includes(x.id)) : []).map((x) => predictSubject(x, profile, progress));
  const sessionBits = [
    mistakes ? `${mistakes} to fix` : '',
    dueCards ? `${dueCards} card${dueCards === 1 ? '' : 's'} due` : '',
    preview.due ? `${preview.due} review${preview.due === 1 ? '' : 's'}` : '',
    preview.weak ? `${preview.weak} weak spot${preview.weak === 1 ? '' : 's'}` : '',
  ].filter(Boolean);

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h1>{profile.name ? `Hi ${profile.name}` : 'Welcome back'}</h1>
          <p className="muted">
            {days > 0 ? <><span className="mono">{days}</span> days until your first GCSE exam ({profile.examYear})</> : 'Exam season has started.'}
          </p>
        </div>
        <div className="head-stats">
          <div className="kpi"><Icon name="flame" size={18} /><span className="mono">{st}</span><span className="muted small">day streak</span></div>
          <div className="kpi"><Icon name="clock" size={18} /><span className="mono">{mins}</span><span className="muted small">min today</span></div>
        </div>
      </header>

      {st > 0 && today.q + today.cards === 0 && new Date().getHours() >= 17 && (
        <div className="notice">
          <Icon name="flame" size={18} />
          <span>You haven't studied today yet. Ten minutes keeps your {st}-day streak going.</span>
          <a className="btn small primary" href={href('/quiz', { scope: 'smart', n: 8, subjects: onlyQ })}>Ten minutes now</a>
        </div>
      )}

      <section className="today card">
        <div className="today-head">
          <div>
            <h2>Today{focus.group ? <>: <span className="today-subject">{focus.group.short}</span></> : null}</h2>
            <p className="muted small">
              {goalDone
                ? 'Done for today – you can keep going as long as you like, and it all still counts.'
                : focus.group
                  ? `${focus.dayName} is ${focus.group.short} day. Learn something new, then do your ${goal}-minute session – the app chooses everything in it from your mistakes, reviews, weak spots and target grade.`
                  : `Learn something new, then do your ${goal}-minute session – the app chooses everything in it.`}
            </p>
          </div>
          <Ring value={mins / goal} label={`${Math.min(100, Math.round((mins / goal) * 100))}%`} size={64} />
        </div>
        <div className="today-actions">
          <button className="today-btn learn" onClick={() => go('/learn', { _: Date.now() })}>
            <span className="today-ic"><Icon name="learn" size={24} /></span>
            <span className="today-txt">
              <strong>Learn</strong>
              <span className="small">{learnNext ? <>Next: <b>{learnNext.topic.title}</b></> : 'Your next topic'}</span>
              <span className="muted small">Lesson, practice and flashcards · about 15 minutes</span>
            </span>
            <Icon name="arrow" size={18} className="push" />
          </button>
          <button className="today-btn session" onClick={() => launchSession(goal, focus.ids ?? undefined)}>
            <span className="today-ic"><Icon name="target" size={24} /></span>
            <span className="today-txt">
              <strong>{goal}-minute session</strong>
              <span className="small">{sessionBits.length ? sessionBits.join(' · ') : 'Practice, reviews and new questions'}</span>
              <span className="muted small">The app picks every question and mode for you</span>
            </span>
            <Icon name="arrow" size={18} className="push" />
          </button>
        </div>
        {preds.length > 0 && (
          <div className="today-grades">
            {preds.map((p) => (
              <a key={p.subject.id} className="grade-chip" href={href('/progress', { tab: 'grades' })} title="Predicted grade if you sat the exam today">
                <SubjectMark subject={p.subject} size="sm" />
                <span className="small">{p.subject.short}: {p.ready ? <>predicted <strong className="mono">{rangeText(p)}</strong></> : 'grade prediction after ~20 answers'}{p.target ? <> · target <strong className="mono">{shortGrade(p.target)}</strong>{p.ready ? (p.gap ? ` (${Math.ceil(p.gap)}% to go)` : ' – on track') : ''}</> : ' · set a target'}</span>
              </a>
            ))}
          </div>
        )}
        {goalDone && (
          <div className="keep-going">
            <span className="small"><strong>Goal reached.</strong> Want more? Extra practice still updates your progress and Fix-it list.</span>
            <div className="row gap wrap">
              <a className="btn small primary" href={href('/session', { mins: 10, subjects: onlyQ, _: Date.now() })}>Keep going: 10 more minutes{focus.group ? ` of ${focus.group.short}` : ''}</a>
              <a className="btn small" href={href('/session', { mins: 20, subjects: onlyQ, _: Date.now() })}>20 more minutes</a>
              {focus.group && <a className="btn small ghost" href={href('/session', { mins: 15, _: Date.now() })}>15 minutes, all subjects</a>}
            </div>
          </div>
        )}
        {(
          <div className="week-strip" aria-label="Your weekly timetable">
            {WEEK_DAYS.map((d) => (
              <span key={d.n} className={`wk ${d.n === todayN ? 'on' : ''}`} title={`${d.name}: ${groupById(week[d.n])?.name ?? 'All my subjects'}`}>
                <span className="wk-d">{d.short}</span>
                <span className="wk-s">{groupById(week[d.n])?.short ?? 'Mixed'}</span>
              </span>
            ))}
            <a className="small wk-edit" href={href('/setup', { tab: 'week' })}>Change</a>
          </div>
        )}
      </section>

      <div className="split three">
        <a className="card link-card" href={href('/rescue')}>
          <Icon name="life" size={22} />
          <span>
            <strong>Struggling with a topic?</strong>
            <span className="muted small block">A 10-minute rescue session rebuilds it from the basics.</span>
          </span>
          <Icon name="arrow" size={18} className="push" />
        </a>
        <a className="card link-card" href={href('/sprint')}>
          <Icon name="clock" size={22} />
          <span>
            <strong>90-second sprint</strong>
            <span className="muted small block">Quick-fire recall across your subjects.{progress.sprints?.all ? ` Best: ${progress.sprints.all}.` : ''}</span>
          </span>
          <Icon name="arrow" size={18} className="push" />
        </a>
        <a className="card link-card" href={href('/tools/calculator')}>
          <Icon name="calc" size={22} />
          <span>
            <strong>Calculator, periodic table and formula sheets</strong>
            <span className="muted small block">Also available inside every question.</span>
          </span>
          <Icon name="arrow" size={18} className="push" />
        </a>
      </div>

      <InstallCard />

      <Section title="Recommended next" right={<a className="small" href="#/plan">Revision plan</a>}>
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
                <span className="muted small">{r.subject.short} · {r.reason}</span>
              </span>
              <span className="rec-action small">{r.action === 'learn' ? 'Learn' : r.action === 'exam' ? 'Exam' : 'Practise'}</span>
            </a>
          ))}
        </div>
      </Section>

      <Suspense fallback={null}><HomeMocks /></Suspense>

      {(() => {
        const gaps = uncovered(subjects, profile, progress, 3);
        const totals = subjects.map((s) => specCoverage(s, profile, progress)).reduce((a, c) => ({ t: a.t + c.total, s: a.s + c.started }), { t: 0, s: 0 });
        return (
          <Section title="Exam coverage" right={<a className="small" href="#/progress">All subjects</a>}>
            <div className="card pad">
              <p className="cov-line"><span className="mono">{totals.s}/{totals.t}</span> specification points practised across your subjects</p>
              <div className="cov-bar"><span className="sec" style={{ width: `${(totals.s / Math.max(1, totals.t)) * 100}%` }} /></div>
              {gaps.length > 0 && (
                <>
                  <p className="small muted" style={{ marginTop: '0.8rem' }}>Not started yet – pick one today:</p>
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
            </div>
          </Section>
        );
      })()}

      <Section title="Your subjects" right={<a className="small" href="#/setup">Subjects and options</a>}>
        <div className="subject-grid">
          {stats.map((s) => (
            <a key={s.subject.id} className="subject-card" href={href(`/s/${s.subject.id}`)} style={{ ['--subj' as string]: s.subject.color }}>
              <div className="subject-card-head">
                <SubjectMark subject={s.subject} />
                <span>
                  <span className="subject-name">{s.subject.name}</span>
                  <span className="muted small block">{s.started}/{s.topics.length} topics started{s.mistakes > 0 && <> · {s.mistakes} to fix</>}</span>
                </span>
                <span className="mono subject-pct">{Math.round(s.mastery * 100)}%</span>
              </div>
              <ProgressBar value={s.mastery} color={s.subject.color} label={`${s.subject.name} mastery`} />
            </a>
          ))}
        </div>
      </Section>

      <Section title="Revision tip">
        <div className="tip">
          <Icon name="bulb" size={20} />
          <div>
            <strong>{tip.title}.</strong> {tip.text}
            <div><a className="small" href="#/how">How to revise effectively</a></div>
          </div>
        </div>
      </Section>

      <p className="muted small center foot-counts">
        {counts.topics} topics · {counts.questions.toLocaleString()} questions · {counts.cards.toLocaleString()} flashcards · {counts.exam} exam questions · {counts.generatorTypes} question generators
      </p>
    </div>
  );
}
