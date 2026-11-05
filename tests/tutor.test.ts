import { describe, expect, it } from 'vitest';
import { allTopicRefs, topicQuestions } from '../src/content/registry';
import { offlineReply } from '../src/lib/offline-tutor';
import { quickActions, systemFor } from '../src/lib/tutor';
import { keywordCheck } from '../src/lib/marking';
import { examQ } from '../src/content/dsl';

describe('built-in tutor', () => {
  it('answers every quick action for every question type and exam question, without errors', () => {
    for (const { topic } of allTopicRefs()) {
      const qs = topicQuestions(topic.id);
      const byType = new Map(qs.map((q) => [q.type, q]));
      for (const item of byType.values()) {
        for (const answered of [false, true]) {
          const c = { kind: 'question' as const, key: item.id + answered, item, topic, answered, correct: false, given: 'x' };
          expect(systemFor(c), item.id).toContain(answered ? 'has answered' : 'NOT answered');
          for (const a of quickActions(c)) {
            const r = offlineReply(c, a.prompt, 0);
            expect(r.trim().length, `${item.id} ${a.label}`).toBeGreaterThan(10);
            expect(r, `${item.id} ${a.label}`).not.toMatch(/undefined|NaN|\[object Object\]/);
          }
          const free = offlineReply(c, 'what does this word mean', 1);
          expect(free.length).toBeGreaterThan(10);
        }
      }
      for (const eq of topic.examQuestions ?? []) {
        const c = { kind: 'exam' as const, key: topic.id, eq, topic, subjectId: '', draft: 'Some answer text with a point.' };
        for (const a of quickActions(c)) {
          const r = offlineReply(c, a.prompt, 0);
          expect(r.trim().length, `${topic.id} exam ${a.label}`).toBeGreaterThan(10);
          expect(r).not.toMatch(/undefined|NaN/);
        }
      }
    }
  });

  it('sets a practice question and marks the reply', () => {
    const ref = allTopicRefs().find(({ topic }) => topicQuestions(topic.id).filter((q) => q.type === 'mcq').length > 3)!;
    const item = topicQuestions(ref.topic.id)[0];
    const c = { kind: 'question' as const, key: 'practice-test', item, topic: ref.topic, answered: true, correct: true };
    const set = offlineReply(c, 'Give me one similar practice question', 0);
    expect(set).toMatch(/Try this one/);
    const marked = offlineReply(c, 'A', 0);
    expect(marked).toMatch(/Correct|Not quite/);
  });
});

describe('key-word check', () => {
  const eq = examQ('Solve 5(x - 3) = 2x + 9', 3, ['M1 Expands correctly: 5x − 15', 'M1 Collects terms correctly, e.g. 3x = 24', 'A1 x = 8']);
  it('finds points that are present', () => {
    const r = keywordCheck(eq, '5x - 15 = 2x + 9, 3x = 24, x = 8');
    expect(r.points.filter((p) => p.likely).length).toBe(3);
  });
  it('does not match 18 as 8', () => {
    const r = keywordCheck(eq, 'x = 18');
    expect(r.points[2].likely).toBe(false);
  });
  it('handles levelled schemes using indicative content', () => {
    const lv = examQ('Explain', 6, ['Level 2 (3-4): good', 'Level 1 (1-2): basic', 'Indicative content: photosynthesis uses carbon dioxide; animals respire releasing carbon dioxide']);
    const r = keywordCheck(lv, 'Plants use carbon dioxide in photosynthesis.');
    expect(r.levelled).toBe(true);
    expect(r.points[0].likely).toBe(true);
  });
});
