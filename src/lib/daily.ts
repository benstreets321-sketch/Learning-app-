// Things that change day by day: how much of the course is started, the exam question of the day, and the daily
// snapshot of predicted grades (so the Progress page can show the trend and a forecast to exam day).
import type { ExamQuestion, Subject, Topic } from '../content/types';
import { activeSubjects, visibleTopics } from '../content/registry';
import { practicePrompts } from '../content/prompts';
import { predictSubject } from './predict';
import { examTimetable, daysBetween } from './exams';
import type { Profile, Progress } from './store';

const DAY = 86_400_000;
export const dayNumber = (t = Date.now()) => Math.floor((t - new Date(t).getTimezoneOffset() * 60_000) / DAY);

/** Fraction of the student's topics practised at least once */
export function courseCoverage(profile: Profile, progress: Progress): { started: number; total: number; frac: number } {
  const topics = activeSubjects(profile).flatMap((s) => visibleTopics(s, profile));
  const started = topics.filter((t) => (progress.topics[t.id]?.n ?? 0) > 0).length;
  return { started, total: topics.length, frac: topics.length ? started / topics.length : 0 };
}

export interface DailyExam { subject: Subject; topic: Topic; n: number; eq: ExamQuestion; done: boolean }

/** One written exam question a day, on today's subject, from topics already started (the same all day) */
export function examQuestionOfDay(profile: Profile, progress: Progress, subjectIds: string[] | undefined, date = new Date()): DailyExam | null {
  const day = dayNumber(date.getTime());
  const subjects = activeSubjects(profile).filter((s) => !subjectIds?.length || subjectIds.includes(s.id));
  const cands = subjects.flatMap((subject) => visibleTopics(subject, profile).filter((t) => practicePrompts(t.id).length).map((topic) => ({ subject, topic })));
  if (!cands.length) return null;
  const started = cands.filter((c) => (progress.topics[c.topic.id]?.n ?? 0) > 0);
  const pool = started.length ? started : cands;
  const pick = pool[(day * 7919) % pool.length];
  const list = practicePrompts(pick.topic.id);
  const n = (day * 104729) % list.length;
  const done = !!progress.essays[`${pick.topic.id}~p${n}`]?.score || progress.essays[`${pick.topic.id}~p${n}`]?.score === 0;
  return { ...pick, n, eq: list[n], done };
}

/** Today's predicted percentage for each subject, stored once a day (returns the updated history, or null if unchanged) */
export function predictionSnapshot(profile: Profile, progress: Progress, now = Date.now()): Record<string, [number, number][]> | null {
  const day = dayNumber(now);
  const hist = { ...(progress.predHist ?? {}) };
  let changed = false;
  for (const s of activeSubjects(profile)) {
    const p = predictSubject(s, profile, progress);
    if (!p.answers && !p.mocks) continue;
    const list = [...(hist[s.id] ?? [])];
    const last = list[list.length - 1];
    const pct = Math.round(p.pct * 10) / 10;
    if (last && last[0] === day) { if (last[1] !== pct) { list[list.length - 1] = [day, pct]; changed = true; } }
    else { list.push([day, pct]); changed = true; }
    hist[s.id] = list.slice(-400);
  }
  return changed ? hist : null;
}

/** Forecast of the percentage at the subject's first exam if the recent trend continues (needs a week of history) */
export function forecast(hist: [number, number][] | undefined, examDate: string | undefined, now = Date.now()): { pct: number; perWeek: number } | null {
  if (!hist || hist.length < 3 || !examDate) return null;
  const today = dayNumber(now);
  const recent = hist.filter(([d]) => d >= today - 42);
  if (recent.length < 3 || recent[recent.length - 1][0] - recent[0][0] < 7) return null;
  // least-squares slope (percentage points per day)
  const n = recent.length, mx = recent.reduce((a, [d]) => a + d, 0) / n, my = recent.reduce((a, [, p]) => a + p, 0) / n;
  const slope = recent.reduce((a, [d, p]) => a + (d - mx) * (p - my), 0) / Math.max(1e-9, recent.reduce((a, [d]) => a + (d - mx) ** 2, 0));
  const days = Math.max(0, daysBetween(new Date(now), new Date(`${examDate}T09:00:00`)));
  // progress slows as marks get harder to win: count the trend at a diminishing rate
  const gain = slope > 0 ? slope * days * 0.6 : slope * Math.min(days, 30);
  const last = recent[recent.length - 1][1];
  return { pct: Math.max(0, Math.min(97, last + gain)), perWeek: slope * 7 };
}

/** The date of a subject's first paper */
export const firstPaperDate = (profile: Profile, subjectId: string) => examTimetable(profile).find((p) => p.subjectId === subjectId)?.date;
