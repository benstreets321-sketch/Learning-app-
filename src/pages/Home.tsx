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

  // Today's plan, scaled to the daily goal (30 min = 5 + 15 + 10)
  const scale = goal / 30;
  const cardTarget = Math.max(5, Math.round(12 * scale));
  const qTarget = Math.max(5, Math.round(15 * scale));
  const fixTarget = Math.max(2, Math.round(5 * scale));
  const todayRecs = focus.ids ? recommendations(profile, progress, 6, focus.ids) : recs;
  const weakest = todayRecs.find((r) => r.action !== 'learn') ?? todayRecs[0];
  const inFocus = focus.group ? ` in ${focus.group.short}` : '';
  const plan = [
    {
      key: 'cards', mins: Math.round(5 * scale), title: 'Warm up with flashcards',
      sub: dueCards ? `${dueCards} card${dueCards === 1 ? '' : 's'} due for review${inFocus}` : `Nothing due – a quick mixed set${inFocus}`,
      done: today.cards >= cardTarget || (dueCards === 0 && today.cards > 0), progress: Math.min(1, today.cards / cardTarget),
      count: `${Math.min(today.cards, cardTarget)}/${cardTarget}`,
      link: href('/cards', { scope: dueCards ? 'due' : 'mixed', subjects: onlyQ }), icon: 'cards',
    },
    {
      key: 'smart', mins: Math.round(15 * scale), title: 'Smart practice',
      sub: focus.group ? `Reviews that are due, weak topics and some new material${inFocus}` : 'Reviews that are due, weak topics and some new material, mixed across subjects',
      done: today.q >= qTarget, progress: Math.min(1, today.q / qTarget), count: `${Math.min(today.q, qTarget)}/${qTarget}`,
      link: href('/quiz', { scope: 'smart', n: qTarget, subjects: onlyQ }), icon: 'target',
    },
    mistakes > 0
      ? {
          key: 'fix', mins: Math.round(10 * scale), title: focus.group ? `Fix your ${focus.group.short} mistakes` : 'Fix yesterday\'s mistakes',
          sub: `${mistakes} question${mistakes === 1 ? '' : 's'} on your Fix-it list${inFocus}`,
          done: (today.fixed ?? 0) >= Math.min(fixTarget, mistakes), progress: Math.min(1, (today.fixed ?? 0) / Math.min(fixTarget, mistakes)),
          count: `${Math.min(today.fixed ?? 0, fixTarget)}/${Math.min(fixTarget, mistakes)} fixed`,
          link: href('/quiz', { scope: 'mistakes', n: Math.min(10, mistakes), subjects: onlyQ }), icon: 'fix',
        }
      : {
          key: 'fix', mins: Math.round(10 * scale), title: weakest ? `Strengthen: ${weakest.topic.title}` : 'Learn something new',
          sub: weakest ? `${weakest.subject.short} · ${weakest.reason}` : `Pick a topic${inFocus || ' from one of your subjects'}`,
          done: false, progress: 0, count: '',
          link: weakest ? (weakest.action === 'learn' ? href(`/t/${weakest.topic.id}`) : href('/quiz', { scope: 'topic', id: weakest.topic.id, n: 8 })) : href('/'), icon: 'learn',
        },
  ];
  const doneCount = plan.filter((p) => p.done).length;
  const goalDone = doneCount === plan.length || mins >= goal;

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
            <h2>Today's {goal} minutes{focus.group ? <>: <span className="today-subject">{focus.group.short}</span></> : null}</h2>
            <p className="muted small">
              {goalDone
                ? 'Done for today – you can keep going as long as you like, and it all still counts.'
                : focus.group
                  ? `${focus.dayName} is ${focus.group.short} day: one subject, done properly. Three short blocks – do them in order.`
                  : 'Three short blocks. Do them in order – each one makes the next more effective.'}
            </p>
          </div>
          <Ring value={mins / goal} label={`${Math.min(100, Math.round((mins / goal) * 100))}%`} size={64} />
        </div>
        <ol className="plan-steps">
          {plan.map((p, i) => (
            <li key={p.key} className={p.done ? 'done' : ''}>
              <a href={p.link} className="plan-step">
                <span className="plan-n">{p.done ? <Icon name="check" size={16} /> : i + 1}</span>
                <span className="plan-main">
                  <span className="plan-title">{p.title}</span>
                  <span className="muted small">{p.sub}</span>
                  {p.count && <ProgressBar value={p.progress} label={p.title} />}
                </span>
                <span className="plan-side">
                  <span className="mono small">{p.mins} min</span>
                  {p.count && <span className="muted small mono">{p.count}</span>}
                </span>
              </a>
            </li>
          ))}
        </ol>
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
        {profile.weekOn !== false && (
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
