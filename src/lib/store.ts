// Persistent state (profile + progress) kept in localStorage, with a tiny subscribe/notify store.
import { useSyncExternalStore } from 'react';
import {
  type Confidence, type SrsState, type TopicState, type Grade,
  gradeFromOutcome, outcomeScore, schedule, updateAbility,
} from './engine';
import { todayKey } from './util';

export interface Profile {
  name: string;
  examYear: 2027 | 2028;
  /** first exam date yyyy-mm-dd (estimate until timetable published) */
  firstExam: string;
  subjects: string[];
  tiers: Record<string, 'F' | 'H'>;
  /** option group id -> chosen value (e.g. 'lit-shakespeare' -> 'macbeth') */
  options: Record<string, string>;
  /** extra options shown in addition (e.g. history units chosen) */
  multiOptions: Record<string, string[]>;
  dailyGoal: number; // minutes
  onboarded: boolean;
  theme: 'auto' | 'light' | 'dark';
  showAllOptions: boolean;
}

export interface MistakeEntry {
  id: string; // question id
  topicId: string;
  subjectId: string;
  at: number;
  count: number;
  confidentWrong: boolean;
  /** snapshot for generated questions so they can be replayed */
  snapshot?: string;
}

export interface DayLog {
  q: number; // questions answered
  c: number; // correct
  cards: number;
  secs: number;
}

export interface Progress {
  v: 1;
  items: Record<string, SrsState>;
  cards: Record<string, SrsState>;
  topics: Record<string, TopicState>;
  mistakes: Record<string, MistakeEntry>;
  days: Record<string, DayLog>;
  xp: number;
  essays: Record<string, { text: string; at: number; score?: number; max?: number }>;
  notes: Record<string, string>; // personal notes per topic
  plan?: { createdAt: number; weeks: PlanWeek[] };
}

export interface PlanWeek {
  start: string;
  focus: { subjectId: string; topicId: string; reason: string }[];
}

const KEY_PROFILE = 'gcse-hub.profile.v1';
const KEY_PROGRESS = 'gcse-hub.progress.v1';

export const ALL_SUBJECTS = ['english-language', 'english-literature', 'maths', 'biology', 'chemistry', 'physics', 'imedia', 'business', 'history', 'statistics'];

export const defaultProfile = (): Profile => ({
  name: '',
  examYear: 2028,
  firstExam: '2028-05-11',
  subjects: [...ALL_SUBJECTS],
  tiers: { maths: 'H', biology: 'H', chemistry: 'H', physics: 'H', statistics: 'H' },
  options: {
    'lit-shakespeare': 'macbeth',
    'lit-novel': 'acc',
    'lit-modern': 'aic',
    'lit-poetry': 'power-conflict',
    'history-board': 'edexcel',
    'business-course': 'gcse',
    'imedia-optional': 'r097',
  },
  multiOptions: {},
  dailyGoal: 30,
  onboarded: false,
  theme: 'auto',
  showAllOptions: false,
});

const emptyProgress = (): Progress => ({
  v: 1, items: {}, cards: {}, topics: {}, mistakes: {}, days: {}, xp: 0, essays: {}, notes: {},
});

function safeRead<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked: keep working in memory */
  }
}

let profile: Profile = { ...defaultProfile(), ...(safeRead<Partial<Profile>>(KEY_PROFILE) ?? {}) };
profile.options = { ...defaultProfile().options, ...profile.options };
let progress: Progress = { ...emptyProgress(), ...(safeRead<Progress>(KEY_PROGRESS) ?? {}) };

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

let saveTimer: ReturnType<typeof setTimeout> | undefined;
function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    safeWrite(KEY_PROFILE, profile);
    safeWrite(KEY_PROGRESS, progress);
  }, 150);
}

export const getProfile = () => profile;
export const getProgress = () => progress;

export function useProfile(): Profile {
  return useSyncExternalStore(subscribe, getProfile, getProfile);
}
export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getProgress, getProgress);
}

export function updateProfile(patch: Partial<Profile>) {
  profile = { ...profile, ...patch };
  persist();
  emit();
}

function mutate(fn: (p: Progress) => void) {
  const next: Progress = {
    ...progress,
    items: { ...progress.items },
    cards: { ...progress.cards },
    topics: { ...progress.topics },
    mistakes: { ...progress.mistakes },
    days: { ...progress.days },
    essays: { ...progress.essays },
    notes: { ...progress.notes },
  };
  fn(next);
  progress = next;
  persist();
  emit();
}

function today(p: Progress): DayLog {
  const k = todayKey();
  const d = p.days[k] ?? { q: 0, c: 0, cards: 0, secs: 0 };
  p.days[k] = { ...d };
  return p.days[k];
}

export interface AnswerRecord {
  id: string;
  topicId: string;
  subjectId: string;
  d: number;
  correct: boolean;
  conf?: Confidence;
  hints: number;
  snapshot?: string;
  generated?: boolean;
}

/** Record a question attempt: updates SRS, ability, mistakes bank, daily log, XP */
export function recordAnswer(r: AnswerRecord) {
  mutate((p) => {
    const now = Date.now();
    const grade = gradeFromOutcome(r.correct, r.conf, r.hints);
    // generated questions are fresh every time, so they only affect ability, not SRS (except as mistakes)
    if (!r.generated) p.items[r.id] = schedule(p.items[r.id], grade, now);
    p.topics[r.topicId] = updateAbility(p.topics[r.topicId], r.d, outcomeScore(r.correct, r.conf, r.hints), now);
    const day = today(p);
    day.q += 1;
    if (r.correct) day.c += 1;
    if (!r.correct) {
      const prev = p.mistakes[r.id];
      p.mistakes[r.id] = {
        id: r.id, topicId: r.topicId, subjectId: r.subjectId, at: now,
        count: (prev?.count ?? 0) + 1,
        confidentWrong: r.conf === 'sure' || (prev?.confidentWrong ?? false),
        snapshot: r.snapshot ?? prev?.snapshot,
      };
    } else if (p.mistakes[r.id]) {
      // fixed a mistake: remove once it has been answered right unaided
      if (r.hints === 0 && r.conf !== 'guess') delete p.mistakes[r.id];
    }
    p.xp += r.correct ? 10 + r.d * 2 - r.hints * 3 : 2;
  });
}

export function recordCard(id: string, grade: Grade) {
  mutate((p) => {
    p.cards[id] = schedule(p.cards[id], grade);
    today(p).cards += 1;
    p.xp += grade === 0 ? 1 : 3;
  });
}

export function addStudyTime(secs: number) {
  if (secs <= 0) return;
  mutate((p) => {
    today(p).secs += Math.round(secs);
  });
}

export function markNotesRead(topicId: string) {
  mutate((p) => {
    const t = p.topics[topicId] ?? { theta: -0.5, n: 0, last: 0 };
    p.topics[topicId] = { ...t, notesRead: Date.now() };
    p.xp += 5;
  });
}

export function recordBlurt(topicId: string, pct: number) {
  mutate((p) => {
    const t = p.topics[topicId] ?? { theta: -0.5, n: 0, last: 0 };
    p.topics[topicId] = { ...t, blurt: [...(t.blurt ?? []), Math.round(pct)].slice(-10), last: Date.now(), n: Math.max(t.n, 1) };
    p.xp += 15;
  });
}

export function recordExam(topicId: string, examId: string, score: number, max: number, text: string) {
  mutate((p) => {
    const t = p.topics[topicId] ?? { theta: -0.5, n: 0, last: 0 };
    p.topics[topicId] = {
      ...t,
      exam: [...(t.exam ?? []), { id: examId, score, max, at: Date.now() }].slice(-20),
      last: Date.now(),
      n: Math.max(t.n, 1),
    };
    p.essays[examId] = { text, at: Date.now(), score, max };
    p.xp += 10 + score * 2;
  });
}

export function saveDraft(examId: string, text: string) {
  mutate((p) => {
    p.essays[examId] = { ...(p.essays[examId] ?? { at: Date.now() }), text, at: Date.now() };
  });
}

export function saveNote(topicId: string, text: string) {
  mutate((p) => {
    p.notes[topicId] = text;
  });
}

export function clearMistake(id: string) {
  mutate((p) => {
    delete p.mistakes[id];
  });
}

export function savePlan(weeks: PlanWeek[]) {
  mutate((p) => {
    p.plan = { createdAt: Date.now(), weeks };
  });
}

export function exportData(): string {
  return JSON.stringify({ app: 'gcse-revision-hub', exportedAt: new Date().toISOString(), profile, progress }, null, 1);
}

export function importData(json: string): boolean {
  try {
    const data = JSON.parse(json);
    if (!data || data.app !== 'gcse-revision-hub' || !data.progress) return false;
    profile = { ...defaultProfile(), ...data.profile };
    progress = { ...emptyProgress(), ...data.progress };
    persist();
    emit();
    return true;
  } catch {
    return false;
  }
}

export function resetAll() {
  profile = defaultProfile();
  progress = emptyProgress();
  persist();
  emit();
}

/** Consecutive days (ending today or yesterday) with some study */
export function streak(p: Progress): number {
  let n = 0;
  const d = new Date();
  if (!p.days[todayKey(d)]) d.setDate(d.getDate() - 1);
  for (;;) {
    const log = p.days[todayKey(d)];
    if (!log || (log.q + log.cards === 0 && log.secs < 60)) break;
    n += 1;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
