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
  const dueCards = dueCardCount(profile, progress);
  const mistakes = Object.keys(progress.mistakes).length;
  const tip = STRATEGY_TIPS[new Date().getDate() % STRATEGY_TIPS.length];
  const counts = totalCounts();
  const goal = profile.dailyGoal;

  // Today's plan, scaled to the daily goal (30 min = 5 + 15 + 10)
  const scale = goal / 30;
  const cardTarget = Math.max(5, Math.round(12 * scale));
  const qTarget = Math.max(5, Math.round(15 * scale));
  const fixTarget = Math.max(2, Math.round(5 * scale));
  const weakest = recs.find((r) => r.action !== 'learn') ?? recs[0];
  const plan = [
    {
      key: 'cards', mins: Math.round(5 * scale), title: 'Warm up with flashcards',
      sub: dueCards ? `${dueCards} card${dueCards === 1 ? '' : 's'} due for review` : 'Nothing due - a quick mixed set',
      done: today.cards >= cardTarget || (dueCards === 0 && today.cards > 0), progress: Math.min(1, today.cards / cardTarget),
      count: `${Math.min(today.cards, cardTarget)}/${cardTarget}`,
      link: href('/cards', { scope: dueCards ? 'due' : 'mixed' }), icon: 'cards',
    },
    {
      key: 'smart', mins: Math.round(15 * scale), title: 'Smart practice',
      sub: 'Reviews that are due, weak topics and some new material, mixed across subjects',
      done: today.q >= qTarget, progress: Math.min(1, today.q / qTarget), count: `${Math.min(today.q, qTarget)}/${qTarget}`,
      link: href('/quiz', { scope: 'smart', n: qTarget }), icon: 'target',
    },
    mistakes > 0
      ? {
          key: 'fix', mins: Math.round(10 * scale), title: 'Fix yesterday\'s mistakes',
          sub: `${mistakes} question${mistakes === 1 ? '' : 's'} on your Fix-it list`,
          done: (today.fixed ?? 0) >= Math.min(fixTarget, mistakes), progress: Math.min(1, (today.fixed ?? 0) / Math.min(fixTarget, mistakes)),
          count: `${Math.min(today.fixed ?? 0, fixTarget)}/${Math.min(fixTarget, mistakes)} fixed`,
          link: href('/quiz', { scope: 'mistakes', n: Math.min(10, mistakes) }), icon: 'fix',
        }
      : {
          key: 'fix', mins: Math.round(10 * scale), title: weakest ? `Strengthen: ${weakest.topic.title}` : 'Learn something new',
          sub: weakest ? `${weakest.subject.short} · ${weakest.reason}` : 'Pick a topic from one of your subjects',
          done: false, progress: 0, count: '',
          link: weakest ? (weakest.action === 'learn' ? href(`/t/${weakest.topic.id}`) : href('/quiz', { scope: 'topic', id: weakest.topic.id, n: 8 })) : href('/'), icon: 'learn',
        },
  ];
  const doneCount = plan.filter((p) => p.done).length;

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h1>{profile.name ? `Hi ${profile.name}` : 'Welcome back'}</h1>
          <p className="muted">
            {days > 0 ? <><span className="mono">{days}</span> days until your first GCSE exam ({profile.examYear})</> : 'Exam season - you have got this.'}
          </p>
        </div>
        <div className="head-stats">
          <div className="kpi"><Icon name="flame" size={18} /><span className="mono">{st}</span><span className="muted small">day streak</span></div>
          <div className="kpi"><Icon name="clock" size={18} /><span className="mono">{mins}</span><span className="muted small">min today</span></div>
        </div>
      </header>

      <section className="today card">
        <div className="today-head">
          <div>
            <h2>Today's {goal} minutes</h2>
            <p className="muted small">{doneCount === 3 ? 'All done - brilliant. Anything extra is a bonus.' : 'Three short blocks. Do them in order - each one makes the next more effective.'}</p>
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
      </section>

      <div className="split">
        <a className="card link-card" href={href('/rescue')}>
          <Icon name="life" size={22} />
          <span>
            <strong>Struggling with a topic?</strong>
            <span className="muted small block">A 10-minute rescue session rebuilds it from the basics.</span>
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
