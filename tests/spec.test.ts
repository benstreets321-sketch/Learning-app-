import { describe, expect, it } from 'vitest';
import { SUBJECTS, getTopic, topicQuestions } from '../src/content/registry';
import { specFor } from '../src/content/spec';

describe('specification coverage', () => {
  it('every specification point maps to real topics that have lessons and practice', () => {
    for (const s of SUBJECTS) {
      const spec = specFor(s);
      expect(spec.sections.length, s.id).toBeGreaterThan(0);
      for (const sec of spec.sections) {
        for (const p of sec.points) {
          expect(p.topics.length, `${s.id} ${p.code} has no topics`).toBeGreaterThan(0);
          for (const tid of p.topics) {
            const ref = getTopic(tid);
            expect(ref, `${s.id} ${p.code} -> missing topic ${tid}`).toBeTruthy();
            expect(ref!.subject.id, `${tid} belongs to another subject`).toBe(s.id);
            expect(ref!.topic.notes.length, `${tid} has no lesson`).toBeGreaterThan(100);
            const practice = topicQuestions(tid).length + (ref!.topic.generators?.length ?? 0);
            expect(practice, `${tid} has no practice questions`).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it('every topic in the app is linked to at least one specification point', () => {
    for (const s of SUBJECTS) {
      const linked = new Set(specFor(s).sections.flatMap((sec) => sec.points.flatMap((p) => p.topics)));
      for (const u of s.units) for (const t of u.topics) expect(linked.has(t.id), `${s.id}: topic ${t.id} is not on the spec map`).toBe(true);
    }
  });

  it('option-specific sections use real option groups', () => {
    for (const s of SUBJECTS) {
      const groups = new Set((s.optionGroups ?? []).flatMap((g) => g.choices.map((c) => `${g.id}=${c.value}`)));
      for (const sec of specFor(s).sections) if (sec.option) expect(groups.has(`${sec.option.group}=${sec.option.value}`), `${s.id} ${sec.title}`).toBe(true);
    }
  });
});
