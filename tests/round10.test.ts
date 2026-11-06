import { describe, expect, it } from 'vitest';
import { defaultProfile, type Progress } from '../src/lib/store';
import { SUBJECTS, getSubject } from '../src/content/registry';
import { coursePace, daysBetween, examTimetable, phaseFor } from '../src/lib/exams';
import { focusFor } from '../src/lib/week';
import { practicePrompts, practicePrompt } from '../src/content/prompts';
import { courseCoverage, examQuestionOfDay, forecast, predictionSnapshot, dayNumber } from '../src/lib/daily';
import { GENERATORS } from '../src/content/generators';
import { deepCounts } from '../src/content/generators/deep-gen';
import { mulberry32 } from '../src/lib/util';

const empty = (): Progress => ({ v: 1, items: {}, cards: {}, topics: {}, mistakes: {}, days: {}, xp: 0, essays: {}, notes: {} });
const profile = () => ({ ...defaultProfile(), onboarded: true });
const at = (s: string) => new Date(`${s}T10:00:00`);

describe('exam timetable', () => {
  it('lists every paper for the chosen options, on weekdays, in date order, from the first exam', () => {
    const p = profile();
    const tt = examTimetable(p);
    expect(tt[0].date).toBe(p.firstExam);
    expect(tt.filter((x) => x.subjectId === 'maths')).toHaveLength(3);
    expect(tt.filter((x) => x.subjectId === 'history')).toHaveLength(3); // Edexcel by default
    expect(examTimetable({ ...p, options: { ...p.options, 'history-board': 'aqa' } }).filter((x) => x.subjectId === 'history')).toHaveLength(2);
    expect(examTimetable({ ...p, options: { ...p.options, 'business-course': 'btec' } }).filter((x) => x.subjectId === 'business')).toHaveLength(1);
    for (const x of tt) expect([0, 6]).not.toContain(new Date(`${x.date}T09:00:00`).getDay());
    expect([...tt].sort((a, b) => a.date.localeCompare(b.date)).map((x) => x.key)).toEqual(tt.map((x) => x.key));
    expect(tt.every((x) => x.estimated)).toBe(true);
  });

  it('uses the student\'s own dates when entered', () => {
    const p = { ...profile(), examDates: { 'maths#0': '2028-05-20' } };
    const m = examTimetable(p).find((x) => x.key === 'maths#0')!;
    expect(m.date).toBe('2028-05-20');
    expect(m.estimated).toBe(false);
  });
});

describe('phases of the year', () => {
  it('moves from learning to consolidating to exam season, the night before, exam day and finished', () => {
    const p = profile();
    expect(phaseFor(p, 0.2, at('2026-11-06')).phase).toBe('learn');
    expect(phaseFor(p, 0.95, at('2026-11-06')).phase).toBe('consolidate');
    expect(phaseFor(p, 0.2, at('2028-02-01')).phase).toBe('consolidate');
    expect(phaseFor(p, 0.5, at('2028-04-20')).phase).toBe('exam-season');
    expect(phaseFor(p, 0.5, at('2028-05-10')).phase).toBe('exam-eve');
    expect(phaseFor(p, 0.5, at('2028-05-11')).phase).toBe('exam-day');
    expect(phaseFor(p, 0.5, at('2028-09-01')).phase).toBe('finished');
    expect(daysBetween(at('2028-05-10'), at('2028-05-11'))).toBe(1);
  });

  it('in exam season the day follows the next exam; before that, the weekly timetable', () => {
    const p = profile();
    // a Thursday in November: Maths day on the timetable
    expect(focusFor(p, at('2026-11-12')).ids).toEqual(['maths']);
    expect(focusFor(p, at('2026-11-12')).exam).toBeUndefined();
    // the day before the first paper (English Literature Paper 1) the focus is English Literature, whatever the weekday
    const eve = focusFor(p, at('2028-05-10'));
    expect(eve.exam).toBe(true);
    expect(eve.ids).toEqual(['english-literature']);
  });

  it('works out course pace and whether it is on track', () => {
    const now = at('2026-11-06').getTime();
    // eight topics spread over four weeks: two a week
    const recent = Array.from({ length: 8 }, (_, i) => ({ first: now - i * 3.5 * 86_400_000 - 3_600_000 }));
    const pace = coursePace(recent, 100, '2028-05-11', now);
    expect(pace.perWeek).toBeCloseTo(2, 0);
    // a single day of history is too little to project from
    expect(coursePace([{ first: now - 3_600_000 }, { first: now - 7_200_000 }], 100, '2028-05-11', now).onTrack).toBeNull();
    expect(pace.finish!.getTime()).toBeGreaterThan(now);
    expect(coursePace([], 100, '2028-05-11', now).onTrack).toBeNull();
    expect(coursePace(recent, 0, '2028-05-11', now).onTrack).toBe(true);
  });
});

describe('written practice prompts', () => {
  it('gives the essay and extended-writing subjects hundreds of exam-style prompts, each with a mark scheme', () => {
    const per: Record<string, number> = {};
    for (const s of SUBJECTS) for (const u of s.units) for (const t of u.topics) {
      for (const q of practicePrompts(t.id)) {
        per[s.id] = (per[s.id] ?? 0) + 1;
        expect(q.marks, t.id).toBeGreaterThan(0);
        expect(q.markScheme.length, t.id).toBeGreaterThan(0);
        expect(q.q, t.id).not.toMatch(/undefined|NaN|\[object/);
        expect(q.meta, t.id).toMatch(/^Practice prompt/);
        expect(q.q, t.id).not.toMatch(/present \*\*(Plot|Context|Overview)/i);
      }
    }
    for (const sid of ['english-language', 'english-literature', 'history', 'business', 'biology', 'chemistry', 'physics', 'imedia']) expect(per[sid] ?? 0, sid).toBeGreaterThan(60);
    // wraps around, so any number works
    expect(practicePrompt('el-p2q5', 1000)?.q).toBeTruthy();
    // practice prompts never leak into mock papers (those use the authored exam questions only)
    expect(getSubject('history')!.units.flatMap((u) => u.topics).flatMap((t) => t.examQuestions ?? []).some((q) => /Practice prompt/.test(q.meta ?? ''))).toBe(false);
  });

  it('picks one exam question of the day that stays the same all day', () => {
    const p = profile();
    const a = examQuestionOfDay(p, empty(), ['history'], at('2026-11-06'));
    const b = examQuestionOfDay(p, empty(), ['history'], new Date('2026-11-06T21:00:00'));
    expect(a?.topic.id).toBe(b?.topic.id);
    expect(a?.n).toBe(b?.n);
    expect(a?.subject.id).toBe('history');
    expect(examQuestionOfDay(p, empty(), ['maths'])).toBeNull();
  });
});

describe('prediction history and forecast', () => {
  it('stores one snapshot a day and forecasts from the trend', () => {
    const p = profile();
    const pr = empty();
    for (const t of getSubject('maths')!.units[0].topics) pr.topics[t.id] = { theta: 1, n: 10, last: Date.now() };
    const h = predictionSnapshot(p, pr)!;
    expect(h.maths).toHaveLength(1);
    expect(predictionSnapshot(p, { ...pr, predHist: h })).toBeNull(); // nothing new the same day
    const today = dayNumber();
    const rising: [number, number][] = Array.from({ length: 15 }, (_, i) => [today - 14 + i, 30 + i * 0.5]);
    const f = forecast(rising, '2028-05-11')!;
    expect(f.perWeek).toBeCloseTo(3.5, 1);
    expect(f.pct).toBeGreaterThan(37);
    expect(f.pct).toBeLessThanOrEqual(97);
    expect(forecast(rising.slice(0, 2), '2028-05-11')).toBeNull();
  });

  it('measures how much of the course is started', () => {
    const pr = empty();
    pr.topics['m-num-basics'] = { theta: 0, n: 3, last: Date.now() };
    const c = courseCoverage(profile(), pr);
    expect(c.started).toBe(1);
    expect(c.total).toBeGreaterThan(200);
  });
});

describe('new content', () => {
  it('has a deep bank of about 900 facts and 20 processes, and notes questions on most topics', () => {
    const c = deepCounts();
    expect(c.facts).toBeGreaterThan(850);
    expect(c.processes).toBeGreaterThanOrEqual(20);
    const nt = Object.keys(GENERATORS).filter((g) => g.startsWith('nt-'));
    expect(nt.length).toBeGreaterThan(220);
  });

  it('notes questions never show the answer in the sentence, and options are distinct', () => {
    for (const id of Object.keys(GENERATORS).filter((g) => g.startsWith('nt-'))) {
      for (let s = 1; s <= 12; s++) {
        const q = GENERATORS[id].make(mulberry32(s * 31), 3);
        // with no convincing set of wrong options, the student types the missing term instead
        if (!q.options) { expect(q.accept?.length, id).toBeGreaterThan(0); expect(q.q, id).toMatch(/type the missing term/); continue; }
        const lower = q.options!.map((o) => o.toLowerCase());
        expect(new Set(lower).size, id).toBe(lower.length);
        const sentence = q.q.split('\n> ')[1] ?? '';
        if (sentence.includes('_____')) expect(` ${sentence.toLowerCase().replace('_____', '')} `, `${id}: ${q.q}`).not.toContain(` ${q.options![0].toLowerCase()} `);
      }
    }
  });
});
