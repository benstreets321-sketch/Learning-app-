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

  // this week vs last week
  const weekSum = (offset: number) => {
    let q = 0, c = 0, secs = 0, cards = 0, active = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i - offset * 7);
      const log = progress.days[todayKey(d)];
      if (!log) continue;
      q += log.q; c += log.c; secs += log.secs; cards += log.cards;
      if (log.q + log.cards > 0 || log.secs >= 60) active++;
    }
    return { q, c, mins: Math.round(secs / 60), cards, active };
  };
  const tw = weekSum(0), lw = weekSum(1);
  const delta = (a: number, b: number) => (b === 0 ? '' :`${a >= b ? '+' : ''}${Math.round(((a - b) / b) * 100)}%`);
  const calib = (['sure', 'unsure', 'guess'] as const).map((k) => {
    const [n, c] = progress.calib?.[k] ?? [0, 0];
    return { k, n, pct: n ? c / n : 0 };
  });
  const sure = calib[0];
  const calibNote = sure.n < 10
    ? 'Rate your confidence before checking each answer. After about 10 "Sure" answers this shows whether your confidence matches your results.'
    : sure.pct >= 0.85
      ? 'When you say you are sure, you are usually right. Your sense of what you know is reliable.'
      : `When you say you are sure you are right ${Math.round(sure.pct * 100)}% of the time. Some things feel familiar but are not secure yet - test them before you move on.`;

  return (
    <div className="page">
      <h1>Your progress</h1>

      <Section title="This week">
        <div className="week-grid">
          <div className="week-cell"><span className="muted small">Days active</span><span className="mono big-n">{tw.active}<span className="muted">/7</span></span><span className="muted small">last week {lw.active}</span></div>
          <div className="week-cell"><span className="muted small">Minutes</span><span className="mono big-n">{tw.mins}</span><span className="muted small">{delta(tw.mins, lw.mins) ? `${delta(tw.mins, lw.mins)} vs last week` : 'nothing last week'}</span></div>
          <div className="week-cell"><span className="muted small">Questions</span><span className="mono big-n">{tw.q}</span><span className="muted small">{delta(tw.q, lw.q) ? `${delta(tw.q, lw.q)} vs last week` : 'nothing last week'}</span></div>
          <div className="week-cell"><span className="muted small">Accuracy</span><span className="mono big-n">{tw.q ? Math.round((tw.c / tw.q) * 100) : 0}%</span><span className="muted small">last week {lw.q ? Math.round((lw.c / lw.q) * 100) : 0}%</span></div>
        </div>
      </Section>

      <Section title="Do you know what you know?">
        <div className="card pad">
          <table className="table calib">
            <thead><tr><th>When you said</th><th>Answers</th><th>Actually right</th></tr></thead>
            <tbody>
              {calib.map((c) => (
                <tr key={c.k}>
                  <td>{c.k === 'sure' ? 'Sure' : c.k === 'unsure' ? 'Think so' : 'Guessing'}</td>
                  <td className="mono">{c.n}</td>
                  <td><span className="mono">{c.n ? `${Math.round(c.pct * 100)}%` : '-'}</span> {c.n > 0 && <ProgressBar value={c.pct} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="small muted">{calibNote}</p>
        </div>
      </Section>
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
