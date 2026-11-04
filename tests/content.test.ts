import { describe, expect, it } from 'vitest';
import { SUBJECTS, allTopicRefs, topicQuestions, getTopic } from '../src/content/registry';
import { GENERATORS } from '../src/content/generators';
import { parseCloze, checkText } from '../src/lib/answer';

describe('content integrity', () => {
  it('has globally unique topic and unit ids', () => {
    const topicIds = new Set<string>();
    const unitIds = new Set<string>();
    for (const s of SUBJECTS) {
      for (const u of s.units) {
        expect(unitIds.has(u.id), `duplicate unit ${u.id}`).toBe(false);
        unitIds.add(u.id);
        for (const t of u.topics) {
          expect(topicIds.has(t.id), `duplicate topic ${t.id}`).toBe(false);
          topicIds.add(t.id);
        }
      }
    }
  });

  it('every subject has metadata, papers, strategies and stuck tips', () => {
    for (const s of SUBJECTS) {
      expect(s.name, s.id).toBeTruthy();
      expect(s.qualification, s.id).toBeTruthy();
      expect(s.papers.length, `${s.id} papers`).toBeGreaterThan(0);
      expect(s.strategies.length, `${s.id} strategies`).toBeGreaterThan(0);
      expect(s.stuck.length, `${s.id} stuck`).toBeGreaterThan(0);
      expect(s.units.length, `${s.id} units`).toBeGreaterThan(0);
    }
  });

  it('every topic has notes, key points and practice', () => {
    for (const { topic, subject } of allTopicRefs()) {
      const ctx = `${subject.id}/${topic.id}`;
      expect(topic.notes.trim().length, `${ctx} notes`).toBeGreaterThan(100);
      expect(topic.keyPoints.length, `${ctx} keyPoints`).toBeGreaterThan(0);
      expect(topic.questions.length + (topic.generators?.length ?? 0), `${ctx} practice`).toBeGreaterThan(0);
    }
  });

  it('all questions are well-formed and answerable', () => {
    for (const { topic } of allTopicRefs()) {
      for (const q of topicQuestions(topic.id)) {
        const ctx = `${topic.id} :: ${'q' in q ? q.q : ''}`;
        expect(q.why, `${ctx} why`).toBeTruthy();
        expect(q.d, ctx).toBeGreaterThanOrEqual(1);
        expect(q.d, ctx).toBeLessThanOrEqual(5);
        switch (q.type) {
          case 'mcq':
            expect(q.options.length, ctx).toBeGreaterThanOrEqual(2);
            expect(q.answer, ctx).toBeLessThan(q.options.length);
            expect(new Set(q.options).size, `${ctx} duplicate options`).toBe(q.options.length);
            break;
          case 'multi':
            expect(q.answers.length, ctx).toBeGreaterThan(0);
            q.answers.forEach((a) => expect(a, ctx).toBeLessThan(q.options.length));
            expect(new Set(q.options).size, `${ctx} duplicate options`).toBe(q.options.length);
            break;
          case 'order':
            expect(q.items.length, ctx).toBeGreaterThanOrEqual(3);
            expect(new Set(q.items).size, `${ctx} duplicate items`).toBe(q.items.length);
            break;
          case 'match':
            expect(q.pairs.length, ctx).toBeGreaterThanOrEqual(2);
            expect(new Set(q.pairs.map((p) => p[1])).size, `${ctx} duplicate right side`).toBe(q.pairs.length);
            break;
          case 'cloze': {
            const c = parseCloze(q.text);
            expect(c.blanks.length, ctx).toBeGreaterThan(0);
            c.blanks.forEach((b) => expect(checkText(b[0], b).ok, ctx).toBe(true));
            break;
          }
          case 'text':
            expect(q.accept.length, ctx).toBeGreaterThan(0);
            expect(checkText(q.accept[0], q.accept).ok, ctx).toBe(true);
            break;
          case 'num':
            expect(Number.isFinite(q.answer), ctx).toBe(true);
            break;
          case 'tf':
            expect(typeof q.answer, ctx).toBe('boolean');
            break;
        }
      }
    }
  });

  it('referenced generators and prerequisites exist', () => {
    for (const { topic } of allTopicRefs()) {
      for (const g of topic.generators ?? []) expect(GENERATORS[g], `${topic.id} -> generator ${g}`).toBeTruthy();
      for (const p of topic.prerequisites ?? []) expect(getTopic(p), `${topic.id} -> prerequisite ${p}`).toBeTruthy();
    }
  });

  it('exam questions have mark schemes', () => {
    for (const { topic } of allTopicRefs()) {
      for (const e of topic.examQuestions ?? []) {
        expect(e.marks, topic.id).toBeGreaterThan(0);
        expect(e.markScheme.length, `${topic.id} mark scheme`).toBeGreaterThan(0);
      }
    }
  });

  it('flashcards have both sides', () => {
    for (const { topic } of allTopicRefs()) {
      for (const c of topic.flashcards) {
        expect(c.front.trim(), topic.id).toBeTruthy();
        expect(c.back.trim(), topic.id).toBeTruthy();
      }
    }
  });
});
