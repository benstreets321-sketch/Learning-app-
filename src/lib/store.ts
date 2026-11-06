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
  /** daily study reminder */
  reminder?: { on: boolean; time: string };
  /** reading comfort */
  textSize?: 'normal' | 'large' | 'xlarge';
  readable?: boolean;
  /** last choices in the Start session panel */
  sessionMins?: number;
  sessionSubjects?: string[];
  /** weekly timetable: one subject group (or 'mixed') per JavaScript weekday, 0 = Sunday */
  week?: string[];
  /** false = no timetable, every day mixes all subjects */
  weekOn?: boolean;
  /** show mock papers for both tiers in every tiered subject */
  mockAllTiers?: boolean;
  /** typed answers use the app's own keyboard on touch screens: auto (touch devices), on or off */
  appKeyboard?: 'auto' | 'on' | 'off';
  /** target grade per subject id ('7', 'L2 Merit', ...) for the gap analysis */
  targets?: Record<string, string>;
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
  /** correct, unaided answers since the last mistake. Two, on separate occasions, are needed to clear it. */
  wins?: number;
  /** when the first of those correct answers happened */
  firstWin?: number;
}

/** A mistake only leaves the Fix-it list after a second correct answer at least this long after the first */
export const FIX_GAP_MS = 6 * 60 * 60 * 1000;

export interface MockAttempt {
  id: string;
  testId: string;
  started: number;
  /** seconds left when last saved (for resuming) */
  remaining: number;
  status: 'in-progress' | 'submitted' | 'marked';
  finished?: number;
  /** answers keyed by question number */
  answers: Record<string, unknown>;
  /** marks awarded keyed by question number (auto-marked or self/AI-marked) */
  marks: Record<string, number>;
  /** ticked mark-scheme points for written answers */
  ticks: Record<string, number[]>;
  score?: number;
  max: number;
}

export interface DayLog {
  q: number; // questions answered
  c: number; // correct
  cards: number;
  /** mistakes fixed (answered right after being wrong) */
  fixed?: number;
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
  /** confidence calibration: [answered, correct] per confidence level */
  calib?: Partial<Record<Confidence, [number, number]>>;
  /** best sprint scores by subject id ('all' for mixed) */
  sprints?: Record<string, number>;
  /** topic-level review schedule: even after a correct answer, a similar question on the topic comes back */
  topicSrs?: Record<string, SrsState>;
  /** mock exam attempts keyed by test id */
  mocks?: Record<string, MockAttempt[]>;
  /** accuracy by kind of question per subject ("maths|algebra"), so practice targets the kinds a student finds hard */
  skills?: Record<string, { n: number; c: number; at: number }>;
  /** "explain why" follow-ups: how many were tried and how many hit the key idea */
  explains?: { n: number; good: number };
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

// ---------- persistence ----------
// Saved to localStorage straight away (debounced 250 ms), flushed immediately when the app is hidden or closed,
// with a second "last good" copy so a corrupted write can never lose everything.
const KEY_META = 'gcse-hub.meta.v1';
const BAK = '.bak';

function safeRead<T>(key: string): T | null {
  for (const k of [key, key + BAK]) {
    try {
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      const value = JSON.parse(raw) as T;
      // recovered from the backup copy: repair the main save straight away
      if (k !== key) { try { localStorage.setItem(key, raw); } catch { /* storage blocked */ } }
      return value;
    } catch { /* corrupt or blocked: try the backup copy */ }
  }
  return null;
}

function safeWrite(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false; // storage full or blocked: keep working in memory and tell the user
  }
}

export type SaveState = { status: 'saved' | 'pending' | 'error'; at: number; updatedAt: number; cloud: 'off' | 'syncing' | 'synced' | 'error'; cloudAt: number };
let save: SaveState = { status: 'saved', at: 0, updatedAt: safeRead<{ updatedAt: number }>(KEY_META)?.updatedAt ?? 0, cloud: 'off', cloudAt: 0 };
const saveListeners = new Set<() => void>();
const setSave = (patch: Partial<SaveState>) => { save = { ...save, ...patch }; saveListeners.forEach((l) => l()); };
export const getSaveState = () => save;
export const setCloudState = (cloud: SaveState['cloud']) => setSave({ cloud, cloudAt: cloud === 'synced' ? Date.now() : save.cloudAt });
export function useSaveState(): SaveState {
  return useSyncExternalStore((l) => { saveListeners.add(l); return () => saveListeners.delete(l); }, getSaveState, getSaveState);
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
let dirty = false;
function flush() {
  clearTimeout(saveTimer);
  if (!dirty) return;
  const ok = safeWrite(KEY_PROFILE, profile) && safeWrite(KEY_PROGRESS, progress) && safeWrite(KEY_META, { updatedAt: save.updatedAt });
  dirty = !ok;
  setSave({ status: ok ? 'saved' : 'error', at: ok ? Date.now() : save.at });
}
/** Mark state changed: saves within 250 ms, and immediately if the page is hidden. */
function persist(touch = true) {
  dirty = true;
  if (touch) save = { ...save, updatedAt: Date.now() };
  setSave({ status: 'pending' });
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, 250);
}
export const saveNow = flush;

/** Keep a "last good" copy, refreshed every few minutes while the app is open */
function backup() {
  if (dirty) flush();
  safeWrite(KEY_PROFILE + BAK, profile);
  safeWrite(KEY_PROGRESS + BAK, progress);
}

if (typeof window !== 'undefined') {
  const onHide = () => { flush(); };
  window.addEventListener('pagehide', onHide);
  window.addEventListener('beforeunload', onHide);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { flush(); backup(); } });
  setInterval(backup, 3 * 60 * 1000);
  setTimeout(backup, 5000);
  // ask the browser not to clear our data when space runs low
  try { void navigator.storage?.persist?.(); } catch { /* not supported */ }
}

/** Replace everything with a newer copy (from a backup file or the cloud) */
export function replaceState(p: Partial<Profile>, pr: Partial<Progress>, updatedAt = Date.now()) {
  profile = { ...defaultProfile(), ...p };
  profile.options = { ...defaultProfile().options, ...profile.options };
  progress = { ...emptyProgress(), ...pr };
  save = { ...save, updatedAt };
  persist(false);
  flush();
  emit();
}

/** Listen to every profile/progress change (used by cloud sync) */
export const subscribeAll = subscribe;

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
  /** kind of question (see skillOf), for the per-subject skill stats */
  skill?: string;
}

/** Record a "why" explanation attempt */
export function recordExplain(good: boolean) {
  mutate((p) => { const e = p.explains ?? { n: 0, good: 0 }; p.explains = { n: e.n + 1, good: e.good + (good ? 1 : 0) }; });
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
    if (r.skill) {
      const k = `${r.subjectId}|${r.skill}`;
      const s = p.skills?.[k] ?? { n: 0, c: 0, at: 0 };
      p.skills = { ...p.skills, [k]: { n: s.n + 1, c: s.c + (r.correct ? 1 : 0), at: now } };
    }
    if (r.conf && r.hints === 0) {
      const prev = p.calib?.[r.conf] ?? [0, 0];
      p.calib = { ...p.calib, [r.conf]: [prev[0] + 1, prev[1] + (r.correct ? 1 : 0)] };
    }
    // topic-level spacing: a similar question on this topic is scheduled whatever the outcome
    p.topicSrs = { ...p.topicSrs, [r.topicId]: schedule(p.topicSrs?.[r.topicId], grade, now) };
    const unaided = r.hints === 0 && r.conf !== 'guess';
    if (!r.correct) {
      const prev = p.mistakes[r.id];
      p.mistakes[r.id] = {
        id: r.id, topicId: r.topicId, subjectId: r.subjectId, at: now,
        count: (prev?.count ?? 0) + 1,
        confidentWrong: r.conf === 'sure' || (prev?.confidentWrong ?? false),
        snapshot: r.snapshot ?? prev?.snapshot,
        wins: 0,
      };
    } else if (unaided) {
      // successive relearning: right once, then right again on a later occasion, before it leaves the Fix-it list
      const settle = (id: string) => {
        const m = p.mistakes[id];
        if (!m) return;
        if (!m.wins || !m.firstWin) p.mistakes[id] = { ...m, wins: 1, firstWin: now };
        else if (now - m.firstWin >= FIX_GAP_MS) { delete p.mistakes[id]; day.fixed = (day.fixed ?? 0) + 1; }
      };
      settle(r.id);
      // a fresh-number version of a generated question counts as the confirming "similar question"
      if (r.generated) {
        const gen = r.id.split(':')[1];
        for (const m of Object.values(p.mistakes)) {
          if (m.id !== r.id && m.id.startsWith(`gen:${gen}:`) && (m.wins ?? 0) >= 1 && m.firstWin && now - m.firstWin >= FIX_GAP_MS) {
            delete p.mistakes[m.id];
            day.fixed = (day.fixed ?? 0) + 1;
          }
        }
      }
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
    // written answers also set when this topic comes back: weak answers return soon, strong ones later
    const ratio = max > 0 ? score / max : 0;
    const grade: Grade = ratio >= 0.85 ? 3 : ratio >= 0.65 ? 2 : ratio >= 0.4 ? 1 : 0;
    p.topicSrs = { ...p.topicSrs, [topicId]: schedule(p.topicSrs?.[topicId], grade, Date.now()) };
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
  return JSON.stringify({ app: 'gcse-revision-hub', exportedAt: new Date().toISOString(), updatedAt: save.updatedAt, profile, progress }, null, 1);
}

export function importData(json: string): boolean {
  try {
    const data = JSON.parse(json);
    if (!data || data.app !== 'gcse-revision-hub' || !data.progress) return false;
    replaceState(data.profile ?? {}, data.progress);
    return true;
  } catch {
    return false;
  }
}

export function resetAll() {
  replaceState(defaultProfile(), emptyProgress());
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

export function recordSprint(key: string, score: number): boolean {
  let best = false;
  mutate((p) => {
    const prev = p.sprints?.[key] ?? 0;
    if (score > prev) { best = prev > 0; p.sprints = { ...p.sprints, [key]: score }; }
  });
  return best;
}

// ---------- mock exams ----------
export function saveMockAttempt(a: MockAttempt) {
  mutate((p) => {
    const list = [...(p.mocks?.[a.testId] ?? [])];
    const i = list.findIndex((x) => x.id === a.id);
    // a finished attempt is never turned back into an unfinished one (e.g. by a late save from the exam screen)
    if (i >= 0 && list[i].status !== 'in-progress' && a.status === 'in-progress') return;
    if (i >= 0) list[i] = a; else list.push(a);
    p.mocks = { ...p.mocks, [a.testId]: list.slice(-20) };
  });
}
export function deleteMockAttempt(testId: string, id: string) {
  mutate((p) => {
    p.mocks = { ...p.mocks, [testId]: (p.mocks?.[testId] ?? []).filter((x) => x.id !== id) };
  });
}
