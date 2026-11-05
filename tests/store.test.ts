import { beforeEach, describe, expect, it, vi } from 'vitest';

// minimal in-memory localStorage for the node test environment
class MemStorage {
  m = new Map<string, string>();
  getItem(k: string) { return this.m.has(k) ? this.m.get(k)! : null; }
  setItem(k: string, v: string) { this.m.set(k, String(v)); }
  removeItem(k: string) { this.m.delete(k); }
  clear() { this.m.clear(); }
}
const mem = new MemStorage();
(globalThis as unknown as { localStorage: MemStorage }).localStorage = mem;

async function freshStore() {
  vi.resetModules();
  return import('../src/lib/store');
}

describe('saving progress', () => {
  beforeEach(() => mem.clear());

  it('saves answers, notes, drafts and settings, and loads them back', async () => {
    let s = await freshStore();
    s.updateProfile({ name: 'Alex', onboarded: true });
    s.recordAnswer({ id: 'q1', topicId: 't1', subjectId: 'maths', d: 2, correct: true, conf: 'sure', hints: 0 });
    s.recordAnswer({ id: 'q2', topicId: 't1', subjectId: 'maths', d: 2, correct: false, conf: 'sure', hints: 0 });
    s.saveNote('t1', 'note text');
    s.saveDraft('t1~0', 'draft answer');
    s.recordCard('c1', 3);
    s.saveNow();
    s = await freshStore();
    expect(s.getProfile().name).toBe('Alex');
    const p = s.getProgress();
    expect(Object.values(p.days)[0].q).toBe(2);
    expect(p.mistakes.q2).toBeTruthy();
    expect(p.items.q1).toBeTruthy();
    expect(p.notes.t1).toBe('note text');
    expect(p.essays['t1~0'].text).toBe('draft answer');
    expect(p.cards.c1).toBeTruthy();
    expect(p.calib?.sure).toEqual([2, 1]);
  });

  it('a mistake needs two correct answers on separate occasions to clear', async () => {
    const s = await freshStore();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2027-01-10T09:00:00'));
    s.recordAnswer({ id: 'q9', topicId: 't1', subjectId: 'maths', d: 2, correct: false, hints: 0 });
    s.recordAnswer({ id: 'q9', topicId: 't1', subjectId: 'maths', d: 2, correct: true, conf: 'sure', hints: 0 });
    expect(s.getProgress().mistakes.q9.wins).toBe(1);
    s.recordAnswer({ id: 'q9', topicId: 't1', subjectId: 'maths', d: 2, correct: true, conf: 'sure', hints: 0 });
    expect(s.getProgress().mistakes.q9, 'same sitting does not clear it').toBeTruthy();
    s.recordAnswer({ id: 'q9', topicId: 't1', subjectId: 'maths', d: 2, correct: true, conf: 'sure', hints: 1 });
    vi.setSystemTime(new Date('2027-01-10T16:00:00'));
    s.recordAnswer({ id: 'q9', topicId: 't1', subjectId: 'maths', d: 2, correct: true, conf: 'guess', hints: 0 });
    expect(s.getProgress().mistakes.q9, 'a guess does not count').toBeTruthy();
    s.recordAnswer({ id: 'q9', topicId: 't1', subjectId: 'maths', d: 2, correct: true, conf: 'sure', hints: 0 });
    expect(s.getProgress().mistakes.q9).toBeUndefined();
    expect(Object.values(s.getProgress().days).reduce((a, d) => a + (d.fixed ?? 0), 0)).toBe(1);
    vi.useRealTimers();
  });

  it('a wrong answer resets progress towards clearing a mistake', async () => {
    const s = await freshStore();
    s.recordAnswer({ id: 'q8', topicId: 't1', subjectId: 'maths', d: 2, correct: false, hints: 0 });
    s.recordAnswer({ id: 'q8', topicId: 't1', subjectId: 'maths', d: 2, correct: true, conf: 'sure', hints: 0 });
    s.recordAnswer({ id: 'q8', topicId: 't1', subjectId: 'maths', d: 2, correct: false, hints: 0 });
    expect(s.getProgress().mistakes.q8.wins).toBe(0);
    expect(s.getProgress().mistakes.q8.count).toBe(2);
  });

  it('every answer schedules a topic review, so a similar question returns even after a correct answer', async () => {
    const s = await freshStore();
    s.recordAnswer({ id: 'q7', topicId: 't7', subjectId: 'maths', d: 2, correct: true, conf: 'sure', hints: 0 });
    const t = s.getProgress().topicSrs?.t7;
    expect(t).toBeTruthy();
    expect(t!.due).toBeGreaterThan(Date.now());
    expect(t!.right).toBe(1);
  });

  it('recovers from a corrupted save using the backup copy and repairs it', async () => {
    let s = await freshStore();
    s.recordAnswer({ id: 'q1', topicId: 't1', subjectId: 'maths', d: 2, correct: true, hints: 0 });
    s.saveNow();
    mem.setItem('gcse-hub.progress.v1.bak', mem.getItem('gcse-hub.progress.v1')!);
    mem.setItem('gcse-hub.progress.v1', '{corrupt');
    s = await freshStore();
    expect(s.getProgress().topics.t1).toBeTruthy();
    expect(() => JSON.parse(mem.getItem('gcse-hub.progress.v1')!)).not.toThrow();
  });

  it('export, reset and import restore everything', async () => {
    const s = await freshStore();
    s.recordAnswer({ id: 'q1', topicId: 't1', subjectId: 'maths', d: 2, correct: true, hints: 0 });
    s.updateProfile({ name: 'Sam' });
    const backup = s.exportData();
    s.resetAll();
    expect(Object.keys(s.getProgress().topics)).toHaveLength(0);
    expect(s.importData('not json')).toBe(false);
    expect(s.importData(backup)).toBe(true);
    expect(s.getProfile().name).toBe('Sam');
    expect(s.getProgress().topics.t1).toBeTruthy();
  });

  it('reports a save error when storage is full instead of crashing', async () => {
    const s = await freshStore();
    const orig = mem.setItem;
    mem.setItem = () => { throw new Error('QuotaExceededError'); };
    s.recordAnswer({ id: 'q1', topicId: 't1', subjectId: 'maths', d: 2, correct: true, hints: 0 });
    s.saveNow();
    expect(s.getSaveState().status).toBe('error');
    mem.setItem = orig;
    s.recordAnswer({ id: 'q2', topicId: 't1', subjectId: 'maths', d: 2, correct: true, hints: 0 });
    s.saveNow();
    expect(s.getSaveState().status).toBe('saved');
  });

  it('schedules a topic for review from written mock answers, sooner when the answer was weak', async () => {
    const s = await freshStore();
    s.recordExam('t-weak', 'mock:x:1', 2, 20, 'answer');
    s.recordExam('t-strong', 'mock:x:2', 19, 20, 'answer');
    const p = s.getProgress();
    expect(p.topicSrs?.['t-weak']).toBeTruthy();
    expect(p.topicSrs!['t-weak'].due).toBeLessThan(p.topicSrs!['t-strong'].due);
  });

  it('never turns a finished mock attempt back into an unfinished one', async () => {
    const s = await freshStore();
    const a = { id: 'a1', testId: 'maths-p1-h-t1', started: 1, remaining: 100, status: 'in-progress' as const, answers: {}, marks: {}, ticks: {}, max: 80 };
    s.saveMockAttempt(a);
    s.saveMockAttempt({ ...a, status: 'submitted', score: 10 });
    s.saveMockAttempt({ ...a, remaining: 90 }); // a late save from the exam screen
    expect(s.getProgress().mocks?.['maths-p1-h-t1'][0].status).toBe('submitted');
  });
});
