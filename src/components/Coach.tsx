// Coaching pieces that keep the app useful every day up to exam day: where you are in the year and the next exams,
// today's extra practice, the weekly review, course pace, and the exam timetable editor.
import { useEffect } from 'react';
import { activeSubjects, visibleTopics, getSubject } from '../content/registry';
import { VOCAB } from '../content/vocab';
import { coursePace, examTimetable, phaseFor, subjectName, daysBetween, type Paper } from '../lib/exams';
import { courseCoverage, dayNumber, examQuestionOfDay, predictionSnapshot } from '../lib/daily';
import { predictSubject } from '../lib/predict';
import { savePredHist, updateProfile, useProfile, useProgress, type Profile, type Progress } from '../lib/store';
import { href } from '../lib/router';
import { todayKey } from '../lib/util';

const fmtDate = (s: string) => new Date(`${s}T09:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const inDays = (n: number) => (n <= 0 ? 'today' : n === 1 ? 'tomorrow' : `in ${n} days`);

/** Keeps the daily prediction history up to date (call on the main pages) */
export function usePredictionSnapshot() {
  const profile = useProfile();
  const progress = useProgress();
  useEffect(() => {
    const t = setTimeout(() => { const h = predictionSnapshot(profile, progress); if (h) savePredHist(h); }, 400);
    return () => clearTimeout(t);
  }, [profile, progress]);
}

/** Where the student is in the year, with the next exams and a countdown */
export function PhaseCard({ compact = false }: { compact?: boolean }) {
  const profile = useProfile();
  const progress = useProgress();
  const cov = courseCoverage(profile, progress);
  const ph = phaseFor(profile, cov.frac);
  const now = new Date();
  const upcoming = examTimetable(profile).filter((p) => p.date >= todayKey()).slice(0, compact ? 3 : 6);
  const urgent = ph.phase === 'exam-eve' || ph.phase === 'exam-day';
  const anyEstimated = upcoming.some((p) => p.estimated);
  return (
    <section className={`phase-card ${urgent ? 'urgent' : ''} ${compact ? 'compact' : ''}`}>
      <div className="phase-text">
        <strong>{ph.title}</strong>
        <p className="small muted">{ph.advice}</p>
      </div>
      {upcoming.length > 0 && (
        <ol className="next-exams" aria-label="Your next exams">
          {upcoming.map((p) => (
            <li key={p.key} title={p.name}>
              <span className="ne-name">{subjectName(p.subjectId)} {p.name.split(':')[0]}</span>
              <span className="ne-when mono">{fmtDate(p.date)} · {inDays(daysBetween(now, new Date(`${p.date}T09:00:00`)))}{p.estimated ? '*' : ''}</span>
            </li>
          ))}
        </ol>
      )}
      {anyEstimated && <p className="small muted ne-note">* Estimated. <a href={href('/setup', { tab: 'exams' })}>Add your school's exam timetable</a> when you get it.</p>}
    </section>
  );
}

/** Today's extras: the written exam question of the day, and a word of the day on English days */
export function TodayExtras({ ids }: { ids?: string[] }) {
  const profile = useProfile();
  const progress = useProgress();
  const q = examQuestionOfDay(profile, progress, ids);
  const english = !ids || ids.some((i) => i.startsWith('english'));
  const word = VOCAB[(dayNumber() * 37) % VOCAB.length];
  if (!q && !english) return null;
  return (
    <>
      {q && (
        <a className="extra-card" href={href('/exam', { topic: q.topic.id, p: q.n })}>
          <span className="ex-kind">Exam Q{q.done ? ' ✓' : ''}</span>
          <span className="grow clip">{q.eq.q.replace(/[*_#>]/g, '').split('\n')[0]}</span>
          <span className="mono small muted">[{q.eq.marks}]</span>
        </a>
      )}
      {english && (
        <a className="extra-card" href={href('/vocab')}>
          <span className="ex-kind">Word</span>
          <span className="grow clip"><strong>{word.w}</strong> <span className="muted">{word.def}</span></span>
        </a>
      )}
    </>
  );
}

interface WeekStats { mins: number; q: number; c: number; cards: number; fixed: number; days: number }
function weekStats(progress: Progress, endDaysAgo: number): WeekStats {
  const s: WeekStats = { mins: 0, q: 0, c: 0, cards: 0, fixed: 0, days: 0 };
  for (let i = endDaysAgo; i < endDaysAgo + 7; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const log = progress.days[todayKey(d)];
    if (!log) continue;
    s.mins += Math.round(log.secs / 60); s.q += log.q; s.c += log.c; s.cards += log.cards; s.fixed += log.fixed ?? 0;
    if (log.q + log.cards > 0) s.days++;
  }
  return s;
}

/** The last seven days: effort, accuracy, topics learned, prediction changes, and what to do next week */
export function WeeklyReview() {
  const profile = useProfile();
  const progress = useProgress();
  const w = weekStats(progress, 0), prev = weekStats(progress, 7);
  const weekAgo = Date.now() - 7 * 86_400_000;
  const learned = Object.entries(progress.topics).filter(([, t]) => (t.first ?? t.notesRead ?? 0) >= weekAgo).length;
  const day = dayNumber();
  const moves = activeSubjects(profile).map((s) => {
    const h = progress.predHist?.[s.id] ?? [];
    const then = [...h].reverse().find(([d]) => d <= day - 7);
    const nowP = predictSubject(s, profile, progress);
    return { s, nowP, delta: then ? nowP.pct - then[1] : null };
  });
  const rising = moves.filter((m) => (m.delta ?? 0) >= 1).sort((a, b) => b.delta! - a.delta!);
  const behind = moves.filter((m) => m.nowP.ready && (m.nowP.gap ?? 0) > 0).sort((a, b) => b.nowP.gap! - a.nowP.gap!);
  const mocksThisMonth = Object.values(progress.mocks ?? {}).flat().filter((a) => (a.finished ?? 0) >= Date.now() - 28 * 86_400_000).length;
  const tips: string[] = [];
  if (w.days < 5) tips.push(`Aim for at least 5 days next week. You studied on ${w.days}. Little and often beats one long session.`);
  if (behind[0]) tips.push(`Biggest gap to target: ${behind[0].s.name} (${Math.ceil(behind[0].nowP.gap!)}% to go). Its sessions already favour the topics worth the most marks.`);
  if (!mocksThisMonth && Object.keys(progress.topics).length > 20) tips.push('No mock paper in the last four weeks. Take one this week under timed conditions.');
  if (w.q && w.c / w.q < 0.6) tips.push('Accuracy was under 60%: use Learn on your weakest topic before more practice.');
  if (!tips.length) tips.push('Great week. Keep the same routine: Learn, then your session, plus the exam question of the day.');
  return (
    <div className="weekly-review">
      <div className="review-grid">
        <div><span className="muted small">Days studied</span><strong className="mono">{w.days}/7</strong><span className="muted small">last week {prev.days}</span></div>
        <div><span className="muted small">Minutes</span><strong className="mono">{w.mins}</strong><span className="muted small">last week {prev.mins}</span></div>
        <div><span className="muted small">Questions</span><strong className="mono">{w.q}</strong><span className="muted small">{w.q ? `${Math.round((w.c / w.q) * 100)}% right` : '–'}</span></div>
        <div><span className="muted small">New topics</span><strong className="mono">{learned}</strong><span className="muted small">{w.fixed} mistakes fixed</span></div>
      </div>
      {rising.length > 0 && <p className="small">Predictions rising: {rising.slice(0, 3).map((m) => `${m.s.short} +${m.delta!.toFixed(1)}%`).join(', ')}.</p>}
      <ul className="review-list small">{tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  );
}

/** How fast the course is being covered, and when it will be finished at that pace */
export function CoursePace() {
  const profile = useProfile();
  const progress = useProgress();
  const topics = activeSubjects(profile).flatMap((s) => visibleTopics(s, profile));
  const started = topics.map((t) => progress.topics[t.id]).filter((t) => (t?.n ?? 0) > 0) as { first?: number; notesRead?: number }[];
  const remaining = topics.length - started.length;
  const pace = coursePace(started, remaining, profile.firstExam);
  const d = (x: Date) => x.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  return (
    <p className="small">
      <strong className="mono">{started.length}/{topics.length}</strong> topics started{remaining ? <>, <strong className="mono">{remaining}</strong> to go</> : ', the whole course'}.{' '}
      {remaining > 0 && (pace.onTrack === null
        ? <>Start one new topic a day with <strong>Learn</strong> to finish by {d(pace.aim)}, leaving four months to consolidate.</>
        : <>At your recent pace of <strong>{pace.perWeek.toFixed(1)}</strong> a week you'll finish around <strong>{d(pace.finish!)}</strong>. {pace.onTrack ? 'That is on track.' : `To finish by ${d(pace.aim)}, aim for about ${Math.ceil(remaining / Math.max(1, (pace.aim.getTime() - Date.now()) / (7 * 86_400_000)))} a week.`}</>)}
    </p>
  );
}

/** Edit the exam dates (estimates until the school's real timetable is known) */
export function ExamTimetableEditor() {
  const profile = useProfile();
  const papers = examTimetable(profile);
  const set = (p: Paper, v: string) => {
    const next = { ...(profile.examDates ?? {}) };
    if (v) next[p.key] = v; else delete next[p.key];
    updateProfile({ examDates: next });
  };
  return (
    <div className="timetable">
      {papers.map((p) => (
        <div key={p.key} className="timetable-row">
          <span><strong className="small">{getSubject(p.subjectId)?.short ?? subjectName(p.subjectId)}</strong> <span className="small">{p.name}</span></span>
          <input type="date" value={p.date} onChange={(e) => set(p, e.target.value)} aria-label={`Date of ${subjectName(p.subjectId)} ${p.name}`} />
          <span className="small muted">{p.estimated ? 'estimate' : <button className="btn link small" onClick={() => set(p, '')}>use estimate</button>}</span>
        </div>
      ))}
    </div>
  );
}

/** A one-line next-exam countdown for headers */
export function nextExamText(profile: Profile): string | null {
  const next = examTimetable(profile).find((p) => p.date >= todayKey());
  if (!next) return null;
  const n = daysBetween(new Date(), new Date(`${next.date}T09:00:00`));
  return `${subjectName(next.subjectId)} ${next.name.split(':')[0]} ${inDays(n)}${next.estimated ? ' (estimated)' : ''}`;
}

