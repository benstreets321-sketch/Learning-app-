import { useState } from 'react';
import { activeSubjects, getSubject, getTopic, visibleTopics } from '../content/registry';
import { level, mastery } from '../lib/engine';
import { href } from '../lib/router';
import { savePlan, useProfile, useProgress, type PlanWeek, type Profile, type Progress } from '../lib/store';
import { daysToExam } from '../lib/insights';
import { DAY, todayKey } from '../lib/util';
import { Empty, Section } from '../components/ui';

function mondayOf(d: Date): Date {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}

/**
 * Builds a spaced, interleaved plan: every topic gets a first "learn" slot (weakest/not-started first),
 * then automatic revisits 1 week and ~4 weeks later; the final weeks switch to mixed exam practice.
 */
export function buildPlan(profile: Profile, progress: Progress, sessionsPerWeek: number): PlanWeek[] {
  const days = daysToExam(profile);
  const weeks = Math.max(1, Math.min(90, Math.ceil(days / 7)));
  const perSession = Math.max(1, Math.round(profile.dailyGoal / 25));
  const slots = sessionsPerWeek * perSession;
  const examWeeks = Math.min(6, Math.max(1, Math.floor(weeks * 0.15)));
  const learnWeeks = Math.max(1, weeks - examWeeks);

  const queues = activeSubjects(profile).map((s) => ({
    s,
    q: visibleTopics(s, profile)
      .map((t, i) => ({ t, i, m: mastery(progress.topics[t.id]), lv: level(progress.topics[t.id]) }))
      .filter((x) => x.lv !== 'mastered')
      .sort((a, b) => (a.lv === 'new' ? 1 : 0) - (b.lv === 'new' ? 1 : 0) || a.m - b.m || a.i - b.i),
  }));
  // new topics in course order after weak ones
  for (const q of queues) {
    const started = q.q.filter((x) => x.lv !== 'new');
    const fresh = q.q.filter((x) => x.lv === 'new').sort((a, b) => a.i - b.i);
    q.q = [...started, ...fresh];
  }

  const start = mondayOf(new Date());
  const plan: PlanWeek[] = Array.from({ length: weeks }, (_, w) => ({ start: todayKey(new Date(start.getTime() + w * 7 * DAY)), focus: [] }));
  const reviews: Record<number, { subjectId: string; topicId: string; reason: string }[]> = {};

  for (let w = 0; w < learnWeeks; w++) {
    const week = plan[w];
    for (const r of reviews[w] ?? []) if (week.focus.length < slots) week.focus.push(r);
    let guard = 0;
    while (week.focus.length < slots && guard++ < 200) {
      let placed = false;
      for (const q of queues) {
        if (week.focus.length >= slots) break;
        const next = q.q.shift();
        if (!next) continue;
        placed = true;
        week.focus.push({ subjectId: q.s.id, topicId: next.t.id, reason: next.lv === 'new' ? 'Learn' : 'Strengthen' });
        for (const gap of [1, 4]) {
          const rw = w + gap;
          if (rw < learnWeeks) (reviews[rw] ??= []).push({ subjectId: q.s.id, topicId: next.t.id, reason: gap === 1 ? 'Review (1 week)' : 'Review (1 month)' });
        }
      }
      if (!placed) break;
    }
    // if we ran out of new topics, top up with mixed reviews
    if (week.focus.length < slots) {
      for (const q of queues) {
        if (week.focus.length >= slots) break;
        week.focus.push({ subjectId: q.s.id, topicId: '', reason: 'Mixed review + exam questions' });
      }
    }
  }
  for (let w = learnWeeks; w < weeks; w++) {
    for (const s of activeSubjects(profile)) plan[w].focus.push({ subjectId: s.id, topicId: '', reason: 'Timed exam practice + Fix-it list' });
  }
  return plan;
}

export function PlannerPage() {
  const profile = useProfile();
  const progress = useProgress();
  const [sessions, setSessions] = useState(5);
  const plan = progress.plan?.weeks;
  const nowWeek = todayKey(mondayOf(new Date()));

  return (
    <div className="page">
      <h1>Revision plan</h1>
      <p className="muted">
        {daysToExam(profile)} days to go. Your plan interleaves subjects, puts weak and unstarted topics first, and automatically schedules
        reviews 1 week and 1 month after you learn something (spaced repetition). The last few weeks switch to exam practice.
      </p>
      <div className="row gap wrap">
        <label className="row gap">Study sessions per week
          <select value={sessions} onChange={(e) => setSessions(Number(e.target.value))}>
            {[3, 4, 5, 6, 7].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <span className="muted small">of about {profile.dailyGoal} minutes (change in Settings)</span>
        <button className="btn primary" onClick={() => savePlan(buildPlan(profile, progress, sessions))}>{plan ? 'Rebuild my plan' : 'Build my plan'}</button>
      </div>
      <p className="muted small">Rebuild every few weeks - it uses your latest mastery data.</p>

      {!plan ? (
        <Empty title="No plan yet">Build one above - it takes a second.</Empty>
      ) : (
        plan.map((w) => {
          const isNow = w.start === nowWeek;
          const past = w.start < nowWeek;
          if (past) return null;
          const weekStart = new Date(w.start + 'T00:00:00').getTime();
          return (
            <Section key={w.start} title={`${isNow ? 'This week' : 'Week of'} ${new Date(w.start + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`}>
              <div className={`plan-week ${isNow ? 'now' : ''}`}>
                {w.focus.map((f, i) => {
                  const subj = getSubject(f.subjectId);
                  const t = f.topicId ? getTopic(f.topicId) : undefined;
                  const done = t && (progress.topics[f.topicId]?.last ?? 0) >= weekStart;
                  return (
                    <a
                      key={i}
                      className={`plan-item ${done ? 'done' : ''}`}
                      style={{ borderLeftColor: subj?.color }}
                      href={t ? (f.reason === 'Learn' ? href(`/t/${f.topicId}`) : href('/quiz', { scope: 'topic', id: f.topicId, n: 8 })) : href(`/s/${f.subjectId}`, { tab: 'exam' })}
                    >
                      <span className="small" style={{ color: subj?.color }}>{subj?.icon} {subj?.short}</span>
                      <span>{t ? t.topic.title : f.reason}</span>
                      <span className="muted small">{t ? f.reason : ''}{done ? ' ✓' : ''}</span>
                    </a>
                  );
                })}
              </div>
            </Section>
          );
        })
      )}
    </div>
  );
}
