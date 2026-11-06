// The weekly timetable: each day of the week focuses on ONE subject, so a student goes deep on it instead of
// spreading 30 minutes across everything. English (Language + Literature) and Science (Biology, Chemistry,
// Physics) each count as one subject, which makes seven - one per day. Students can change the timetable in
// Settings; a day whose subject they don't take is filled with one of their own subjects.
import type { Subject } from '../content/types';
import { activeSubjects } from '../content/registry';
import type { Profile } from './store';

export interface SubjectGroup { id: string; name: string; short: string; subjects: string[] }

export const GROUPS: SubjectGroup[] = [
  { id: 'history', name: 'History', short: 'History', subjects: ['history'] },
  { id: 'english', name: 'English Language and Literature', short: 'English', subjects: ['english-language', 'english-literature'] },
  { id: 'science', name: 'Science (Biology, Chemistry and Physics)', short: 'Science', subjects: ['biology', 'chemistry', 'physics'] },
  { id: 'maths', name: 'Maths', short: 'Maths', subjects: ['maths'] },
  { id: 'business', name: 'Business', short: 'Business', subjects: ['business'] },
  { id: 'imedia', name: 'Creative iMedia', short: 'iMedia', subjects: ['imedia'] },
  { id: 'statistics', name: 'Statistics', short: 'Statistics', subjects: ['statistics'] },
];
export const MIXED = 'mixed';

/** Days in display order (Monday first), with their JavaScript weekday number (0 = Sunday) */
export const WEEK_DAYS: { n: number; name: string; short: string }[] = [
  { n: 1, name: 'Monday', short: 'Mon' }, { n: 2, name: 'Tuesday', short: 'Tue' }, { n: 3, name: 'Wednesday', short: 'Wed' },
  { n: 4, name: 'Thursday', short: 'Thu' }, { n: 5, name: 'Friday', short: 'Fri' }, { n: 6, name: 'Saturday', short: 'Sat' }, { n: 0, name: 'Sunday', short: 'Sun' },
];

/** Default timetable, indexed by JavaScript weekday: Mon History, Tue English, Wed Science, Thu Maths, Fri Business, Sat iMedia, Sun Statistics */
export const DEFAULT_WEEK: string[] = ['statistics', 'history', 'english', 'science', 'maths', 'business', 'imedia'];

export const groupById = (id: string) => GROUPS.find((g) => g.id === id);
const studied = (g: SubjectGroup, profile: Profile) => g.subjects.some((s) => profile.subjects.includes(s));

/** The groups this student takes */
export const myGroups = (profile: Profile) => GROUPS.filter((g) => studied(g, profile));

/**
 * The timetable this student actually follows (indexed by JavaScript weekday). Days set to a subject they don't
 * take are given one of their own subjects, the one with the fewest days so far, so every day still has one focus.
 */
export function effectiveWeek(profile: Profile): string[] {
  const mine = myGroups(profile);
  const plan = profile.week?.length === 7 ? [...profile.week] : [...DEFAULT_WEEK];
  if (!mine.length) return plan.map(() => MIXED);
  // every day has ONE dedicated subject: an old "mixed" day (or a subject not taken) is given one of theirs
  const ok = (id: string) => mine.some((g) => g.id === id);
  const week = plan.map((id) => (ok(id) ? id : ''));
  // fill gaps in Monday-first order so the result is predictable
  for (const { n } of WEEK_DAYS) {
    if (week[n]) continue;
    const count = (id: string) => week.filter((x) => x === id).length;
    const next = [...mine].sort((a, b) => count(a.id) - count(b.id) || GROUPS.indexOf(a) - GROUPS.indexOf(b))[0];
    week[n] = next.id;
  }
  return week;
}

export interface DayFocus {
  /** null on a mixed day (or when the timetable is switched off) */
  group: SubjectGroup | null;
  /** the student's own subjects in today's group (all active subjects on a mixed day) */
  subjects: Subject[];
  /** subject ids to pass to links, or undefined for "all my subjects" */
  ids: string[] | undefined;
  dayName: string;
  label: string;
}

export function focusFor(profile: Profile, date = new Date()): DayFocus {
  const n = date.getDay();
  const dayName = WEEK_DAYS.find((d) => d.n === n)!.name;
  const all = activeSubjects(profile);
  const g = groupById(effectiveWeek(profile)[n]);
  const subjects = g ? all.filter((s) => g.subjects.includes(s.id)) : all;
  if (!g || !subjects.length) return { group: null, subjects: all, ids: undefined, dayName, label: 'All my subjects' };
  return { group: g, subjects, ids: subjects.map((s) => s.id), dayName, label: g.short };
}

/** The day(s) of the week a subject is studied, e.g. "Thursday" */
export function daysForSubject(profile: Profile, subjectId: string): string[] {
  const week = effectiveWeek(profile);
  return WEEK_DAYS.filter((d) => groupById(week[d.n])?.subjects.includes(subjectId)).map((d) => d.name);
}
