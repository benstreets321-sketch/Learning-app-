// The exam timetable and the phases of the year leading up to it.
//
// Exam boards publish the real timetable about a year ahead, so until then every paper has an ESTIMATED date based
// on the usual pattern of the summer series (mid-May to late June). Students can enter their school's real dates in
// Settings; those always win. The phase drives the app's coaching:
//   learn         - most of the course still to learn: Learn each day, sessions build retrieval
//   consolidate   - about 4 months to go, or the course is covered: relearn weak topics, mixed retrieval, a mock
//                   every few weeks
//   exam-season   - six weeks before the first paper: the daily subject follows the next exams, not the timetable
//   exam-eve      - the day before a paper: that subject only, a short calm review
//   exam-day      - a paper today
//   finished      - every paper is done
import type { Profile } from './store';
import { ALL_SUBJECTS } from './store';

export interface Paper { key: string; subjectId: string; name: string; date: string; estimated: boolean }

// paper name and its usual position in the series (days after the first exam), per subject and option
const BASE: Record<string, [string, number][]> = {
  'english-literature': [['Paper 1: Shakespeare and the 19th-century novel', 0], ['Paper 2: Modern texts and poetry', 14]],
  'english-language': [['Paper 1: Explorations in creative reading and writing', 11], ['Paper 2: Writers\' viewpoints and perspectives', 18]],
  maths: [['Paper 1 (non-calculator)', 4], ['Paper 2 (calculator)', 22], ['Paper 3 (calculator)', 29]],
  biology: [['Paper 1', 2], ['Paper 2', 30]],
  chemistry: [['Paper 1', 7], ['Paper 2', 32]],
  physics: [['Paper 1', 9], ['Paper 2', 36]],
  statistics: [['Paper 1', 10], ['Paper 2', 21]],
  imedia: [['R093: Creative iMedia in the media industry', 15]],
};
const HISTORY_ED: [string, number][] = [['Paper 1: Thematic study and historic environment', 3], ['Paper 2: Period study and British depth study', 13], ['Paper 3: Modern depth study', 24]];
const HISTORY_AQA: [string, number][] = [['Paper 1: Understanding the modern world', 3], ['Paper 2: Shaping the nation', 16]];
const BUSINESS_GCSE: [string, number][] = [['Paper 1', 8], ['Paper 2', 17]];
const BUSINESS_BTEC: [string, number][] = [['Component 3 external assessment', 6]];

const DAY = 86_400_000;
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const atNine = (s: string) => new Date(`${s}T09:00:00`);
/** whole days from one date to another (calendar days, ignoring the time of day) */
export const daysBetween = (from: Date, to: Date) => Math.round((new Date(to.getFullYear(), to.getMonth(), to.getDate()).getTime() - new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime()) / DAY);

/** skip weekends: exams are on weekdays */
function weekday(d: Date): Date {
  const x = new Date(d);
  while (x.getDay() === 0 || x.getDay() === 6) x.setDate(x.getDate() + 1);
  return x;
}

/** Every paper this student sits, in date order, with their own dates where entered */
export function examTimetable(profile: Profile): Paper[] {
  const start = atNine(profile.firstExam);
  const out: Paper[] = [];
  for (const sid of ALL_SUBJECTS) {
    if (!profile.subjects.includes(sid)) continue;
    const list = sid === 'history' ? (profile.options['history-board'] === 'aqa' ? HISTORY_AQA : HISTORY_ED)
      : sid === 'business' ? (profile.options['business-course'] === 'btec' ? BUSINESS_BTEC : BUSINESS_GCSE)
      : BASE[sid] ?? [];
    list.forEach(([name, offset], i) => {
      const key = `${sid}#${i}`;
      const own = profile.examDates?.[key];
      const est = new Date(start); est.setDate(est.getDate() + offset);
      out.push({ key, subjectId: sid, name, date: own || iso(weekday(est)), estimated: !own });
    });
  }
  return out.sort((a, b) => a.date.localeCompare(b.date) || a.key.localeCompare(b.key));
}

export type Phase = 'learn' | 'consolidate' | 'exam-season' | 'exam-eve' | 'exam-day' | 'finished';
export interface PhaseInfo {
  phase: Phase;
  /** days until the first paper (negative once exams have started) */
  toFirst: number;
  /** the next paper not yet sat (today's counts) */
  next?: Paper;
  daysToNext?: number;
  /** papers today */
  today: Paper[];
  title: string;
  advice: string;
}

/** Where the student is in the year, and what to focus on */
export function phaseFor(profile: Profile, courseStarted: number, date = new Date()): PhaseInfo {
  const papers = examTimetable(profile);
  const now = new Date(date);
  const todayIso = iso(now);
  const upcoming = papers.filter((p) => p.date >= todayIso);
  const next = upcoming[0];
  const toFirst = papers.length ? daysBetween(now, atNine(papers[0].date)) : 999;
  const daysToNext = next ? daysBetween(now, atNine(next.date)) : undefined;
  const today = papers.filter((p) => p.date === todayIso);
  const name = (p: Paper) => `${subjectName(p.subjectId)} ${p.name.split(':')[0]}`;
  if (!next) return { phase: 'finished', toFirst, today, title: 'Exams finished', advice: 'Every paper is done. Well done. Rest, and keep the app for next year or for resits.' };
  if (today.length) return { phase: 'exam-day', toFirst, next, daysToNext, today, title: `Exam today: ${today.map(name).join(' and ')}`, advice: 'A light 10-minute look at key facts and flashcards only. Eat breakfast, bring black pens, a calculator if allowed, and arrive early. You have prepared. Trust it.' };
  if (daysToNext === 1) return { phase: 'exam-eve', toFirst, next, daysToNext, today, title: `Tomorrow: ${name(next)}`, advice: 'Tonight: a short session on this subject only, then check your equipment and get a good night\'s sleep. Sleep fixes memories. A late cram does more harm than good.' };
  if (toFirst <= 42) return { phase: 'exam-season', toFirst, next, daysToNext, today, title: toFirst > 0 ? `Exam season: ${toFirst} days to go` : 'Exam season', advice: `Each day now follows your next exams (next: ${name(next)} in ${daysToNext} day${daysToNext === 1 ? '' : 's'}). Sessions focus on mistakes, weak spots and exam questions; take one timed mock paper each week.` };
  if (toFirst <= 120 || courseStarted >= 0.9) return { phase: 'consolidate', toFirst, next, daysToNext, today, title: 'Consolidate and practise exam questions', advice: 'The course is (nearly) all learned, so Learn now re-teaches your weakest topics. Do your daily session, one written exam question a day, and a full mock paper every two to three weeks.' };
  return { phase: 'learn', toFirst, next, daysToNext, today, title: 'Learning the course', advice: 'Learn one new topic each day, then do your session. It keeps everything you have learned fresh. Aim to finish the course about four months before the exams, leaving time to consolidate.' };
}

const NAMES: Record<string, string> = {
  'english-language': 'English Language', 'english-literature': 'English Literature', maths: 'Maths', biology: 'Biology', chemistry: 'Chemistry',
  physics: 'Physics', imedia: 'Creative iMedia', business: 'Business', history: 'History', statistics: 'Statistics',
};
export const subjectName = (id: string) => NAMES[id] ?? id;

/** In exam season, the subject(s) to focus on: the next paper's subject (tomorrow's exam always wins) */
export function examFocusSubjects(profile: Profile, courseStarted: number, date = new Date()): { ids: string[]; label: string } | null {
  const ph = phaseFor(profile, courseStarted, date);
  if (!['exam-season', 'exam-eve', 'exam-day'].includes(ph.phase) || !ph.next) return null;
  // on an exam day, revise for the NEXT paper after today's (today's subject is already done after the exam)
  const todayIso = iso(date);
  const next = examTimetable(profile).find((p) => p.date > todayIso) ?? ph.next;
  if (ph.phase === 'exam-season' && (ph.daysToNext ?? 99) > 10) return null; // nothing close yet: keep the weekly timetable
  return { ids: [next.subjectId], label: subjectName(next.subjectId) };
}

/** Course pace: topics started per week recently, and when the course will be covered at that pace */
export function coursePace(started: { first?: number; notesRead?: number }[], remaining: number, firstExam: string, now = Date.now()): { perWeek: number; finish?: Date; aim: Date; onTrack: boolean | null } {
  // measure over the last four weeks, or since the student started if that is sooner; under two weeks of history
  // is too little to project from
  const times = started.map((t) => t.first ?? t.notesRead ?? 0).filter(Boolean);
  const since = times.length ? Math.min(...times) : now;
  const window = Math.min(28 * DAY, now - since);
  const recent = times.filter((t) => t >= now - window).length;
  const perWeek = window >= 7 * DAY ? recent / (window / (7 * DAY)) : recent;
  const aim = new Date(atNine(firstExam).getTime() - 120 * DAY);
  if (!remaining) return { perWeek, finish: new Date(now), aim, onTrack: true };
  if (!perWeek || window < 14 * DAY) return { perWeek, aim, onTrack: null };
  const finish = new Date(now + (remaining / perWeek) * 7 * DAY);
  return { perWeek, finish, aim, onTrack: finish <= aim };
}
