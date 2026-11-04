import { SubjectMark } from '../components/SubjectMark';
import { activeSubjects } from '../content/registry';
import { href } from '../lib/router';
import { level, mastery } from '../lib/engine';
import { streak, useProfile, useProgress } from '../lib/store';
import { subjectStats } from '../lib/insights';
import { todayKey } from '../lib/util';
import { ProgressBar, Section } from '../components/ui';

export function ProgressPage() {
  const profile = useProfile();
  const progress = useProgress();
  const now = Date.now();
  const stats = activeSubjects(profile).map((s) => subjectStats(s, profile, progress, now));
  const days = Object.values(progress.days);
  const totalQ = days.reduce((a, d) => a + d.q, 0);
  const totalC = days.reduce((a, d) => a + d.c, 0);
  const totalMins = Math.round(days.reduce((a, d) => a + d.secs, 0) / 60);
  const totalCards = days.reduce((a, d) => a + d.cards, 0);

  const last28 = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    const log = progress.days[todayKey(d)];
    return { d, mins: log ? Math.round(log.secs / 60) : 0, q: log?.q ?? 0 };
  });
  const maxMins = Math.max(10, ...last28.map((x) => x.mins));

  const exams = Object.entries(progress.essays).filter(([, e]) => e.score !== undefined);
  const examPct = exams.length ? exams.reduce((a, [, e]) => a + (e.score ?? 0) / (e.max ?? 1), 0) / exams.length : 0;

  return (
    <div className="page">
      <h1>Your progress</h1>
      <div className="stat-row">
        <div className="stat"><span className="stat-n">{streak(progress)}</span><span className="muted small">day streak</span></div>
        <div className="stat"><span className="stat-n">{totalMins}</span><span className="muted small">minutes studied</span></div>
        <div className="stat"><span className="stat-n">{totalQ}</span><span className="muted small">questions</span></div>
        <div className="stat"><span className="stat-n">{totalQ ? Math.round((totalC / totalQ) * 100) : 0}%</span><span className="muted small">accuracy</span></div>
        <div className="stat"><span className="stat-n">{totalCards}</span><span className="muted small">cards reviewed</span></div>
        <div className="stat"><span className="stat-n">{exams.length ? Math.round(examPct * 100) + '%' : '-'}</span><span className="muted small">exam Qs ({exams.length})</span></div>
      </div>

      <Section title="Last 4 weeks">
        <div className="bars" role="img" aria-label="Minutes studied per day over the last 28 days">
          {last28.map((x, i) => (
            <div key={i} className="bar-col" title={`${x.d.toDateString()}: ${x.mins} min, ${x.q} questions`}>
              <div className="bar" style={{ height: `${(x.mins / maxMins) * 100}%`, opacity: x.mins ? 1 : 0.25 }} />
            </div>
          ))}
        </div>
        <p className="muted small">Little and often beats cramming: 20-40 minutes most days, spread across subjects, is ideal.</p>
      </Section>

      <Section title="By subject">
        {stats.map((s) => (
          <div key={s.subject.id} className="subj-progress">
            <a href={href(`/s/${s.subject.id}`)} className="subj-progress-head">
              <span className="row gap"><SubjectMark subject={s.subject} size="sm" /> {s.subject.name}</span>
              <span className="small">{Math.round(s.mastery * 100)}%</span>
            </a>
            <ProgressBar value={s.mastery} color={s.subject.color} />
            <div className="heat mini">
              {s.topics.map((t) => (
                <a key={t.id} href={href(`/t/${t.id}`)} className={`heat-cell lvl-${level(progress.topics[t.id], now)}`} title={`${t.title}: ${Math.round(mastery(progress.topics[t.id], now) * 100)}%`} />
              ))}
            </div>
            <div className="muted small">
              {s.levels.mastered} mastered · {s.levels.secure} secure · {s.levels.developing} developing · {s.levels.weak} need work · {s.levels.new} not started
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}
