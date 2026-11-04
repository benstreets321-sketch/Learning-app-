import { activeSubjects, totalCounts } from '../content/registry';
import { href } from '../lib/router';
import { streak, useProfile, useProgress } from '../lib/store';
import { daysToExam, dueCardCount, recommendations, subjectStats } from '../lib/insights';
import { todayKey } from '../lib/util';
import { ProgressBar, Ring, Section } from '../components/ui';
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

  return (
    <div className="page">
      <div className="hero">
        <div>
          <h1>{profile.name ? `Hi ${profile.name}` : 'Welcome back'}</h1>
          <p className="muted">
            {days > 0 ? <><strong>{days}</strong> days until your first GCSE exam ({profile.examYear})</> : 'Exam season - you have got this.'}
            {' · '}Streak: <strong>{st}</strong> day{st === 1 ? '' : 's'} · {progress.xp} XP
          </p>
        </div>
        <div className="hero-goal">
          <Ring value={mins / profile.dailyGoal} label={`${mins}m`} size={72} />
          <span className="muted small">of {profile.dailyGoal} min goal</span>
        </div>
      </div>

      <div className="cta-grid">
        <a className="cta primary" href={href('/quiz', { scope: 'smart', n: 15 })}>
          <span className="cta-title">Smart revision session</span>
          <span className="cta-sub">15 questions picked for you: reviews that are due, your weakest topics and new material, mixed across subjects.</span>
        </a>
        <a className="cta" href={href('/cards', { scope: 'due' })}>
          <span className="cta-title">Flashcards due: {dueCards}</span>
          <span className="cta-sub">Spaced repetition - review cards just before you forget them.</span>
        </a>
        <a className="cta" href={href('/fix')}>
          <span className="cta-title">Fix-it list: {mistakes}</span>
          <span className="cta-sub">Questions you got wrong come back until you get them right.</span>
        </a>
      </div>

      <Section title="Recommended next" right={<a className="small" href="#/plan">Revision plan →</a>}>
        <div className="rec-list">
          {recs.map((r) => (
            <a
              key={r.topic.id}
              className="rec"
              style={{ borderLeftColor: r.subject.color }}
              href={
                r.action === 'learn' ? href(`/t/${r.topic.id}`) :
                r.action === 'exam' ? href(`/t/${r.topic.id}`, { tab: 'exam' }) :
                href('/quiz', { scope: 'topic', id: r.topic.id, n: 8 })
              }
            >
              <span className="rec-subj" style={{ color: r.subject.color }}>{r.subject.icon} {r.subject.short}</span>
              <span className="rec-title">{r.topic.title}</span>
              <span className="muted small">{r.reason} · {r.action === 'learn' ? 'Learn it' : r.action === 'exam' ? 'Exam practice' : 'Practise'}</span>
            </a>
          ))}
        </div>
      </Section>

      <Section title="Your subjects" right={<a className="small" href="#/setup">Choose subjects & options</a>}>
        <div className="subject-grid">
          {stats.map((s) => (
            <a key={s.subject.id} className="subject-card" href={href(`/s/${s.subject.id}`)} style={{ ['--subj' as string]: s.subject.color }}>
              <div className="subject-card-head">
                <span className="subject-icon" aria-hidden="true">{s.subject.icon}</span>
                <span className="subject-name">{s.subject.name}</span>
              </div>
              <ProgressBar value={s.mastery} color={s.subject.color} label={`${s.subject.name} mastery`} />
              <div className="muted small">
                {Math.round(s.mastery * 100)}% mastery · {s.started}/{s.topics.length} topics started
                {s.mistakes > 0 && <> · {s.mistakes} to fix</>}
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section title="Revision tip of the day">
        <div className="tip">
          <strong>{tip.title}.</strong> {tip.text}
          <div><a className="small" href="#/how">More on how to revise effectively →</a></div>
        </div>
      </Section>

      <p className="muted small center">
        {counts.topics} topics · {counts.questions.toLocaleString()} written questions · {counts.cards.toLocaleString()} flashcards · {counts.exam} exam-style questions · {counts.generatorTypes} unlimited question generators
      </p>
    </div>
  );
}
