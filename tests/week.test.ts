import { describe, expect, it } from 'vitest';
import { defaultProfile } from '../src/lib/store';
import { DEFAULT_WEEK, MIXED, daysForSubject, effectiveWeek, focusFor } from '../src/lib/week';

// a date for each weekday (5 Nov 2026 is a Thursday)
const on = (weekday: number) => { const d = new Date(2026, 10, 1); d.setDate(d.getDate() + ((weekday - d.getDay() + 7) % 7)); return d; };

describe('one subject a day', () => {
  it('defaults to Monday History, Tuesday English, Wednesday Science, Thursday Maths, Friday Business, Saturday iMedia, Sunday Statistics', () => {
    const p = { ...defaultProfile(), onboarded: true };
    const names = [0, 1, 2, 3, 4, 5, 6].map((n) => focusFor(p, on(n)).label);
    expect(names).toEqual(['Statistics', 'History', 'English', 'Science', 'Maths', 'Business', 'iMedia']);
    expect(focusFor(p, on(4)).ids).toEqual(['maths']);
    expect(focusFor(p, on(1)).ids).toEqual(['history']);
    expect(focusFor(p, on(3)).ids).toEqual(['biology', 'chemistry', 'physics']);
    expect(focusFor(p, on(2)).ids).toEqual(['english-language', 'english-literature']);
  });

  it('gives a day whose subject you do not take one of your own subjects, so every day still has one focus', () => {
    const p = { ...defaultProfile(), subjects: ['maths', 'english-language', 'english-literature', 'history', 'biology', 'chemistry', 'physics'] };
    const week = effectiveWeek(p);
    expect(week.every((id) => ['maths', 'english', 'history', 'science'].includes(id))).toBe(true);
    expect(week[4]).toBe('maths');
    expect(week[1]).toBe('history');
    // the spare days are shared out evenly
    const counts = ['maths', 'english', 'history', 'science'].map((g) => week.filter((x) => x === g).length);
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
  });

  it('only includes the subjects you take from a group (e.g. Biology only)', () => {
    const p = { ...defaultProfile(), subjects: ['biology', 'maths'] };
    expect(focusFor(p, on(3)).ids).toEqual(['biology']);
  });

  it('follows your own timetable, and every day always has one dedicated subject', () => {
    const p = { ...defaultProfile(), week: [...DEFAULT_WEEK] };
    p.week[5] = 'maths';
    p.week[6] = MIXED; // an old "mixed" day is given one of your subjects
    expect(focusFor(p, on(5)).label).toBe('Maths');
    expect(focusFor(p, on(6)).ids?.length).toBeGreaterThan(0);
    expect(daysForSubject(p, 'maths')).toContain('Thursday');
    expect(daysForSubject(p, 'maths')).toContain('Friday');
    for (let d = 0; d < 7; d++) expect(focusFor({ ...p, weekOn: false }, on(d)).group).not.toBeNull();
  });
});
