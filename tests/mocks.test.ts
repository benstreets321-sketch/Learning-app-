import { describe, expect, test } from 'vitest';
import { MOCK_PAPERS, getTest, papersFor, testMarks, visibleSections } from '../src/content/mocks';
import type { MockPaper, MockTest } from '../src/content/mocks/types';
import { getTopic } from '../src/content/registry';
import { defaultProfile, type Profile } from '../src/lib/store';
import { bandOf, gradeAuto, isLevelledScheme, schemeMark, toggleTick, type AutoAnswer } from '../src/lib/grade';
import type { QItem } from '../src/content/types';
import { short } from '../src/content/mocks/english-literature';

// The real papers: duration (minutes) and total marks
const SPEC: Record<string, [number, number]> = {
  'english-language-p1': [105, 80], 'english-language-p2': [105, 80],
  'english-literature-p1': [105, 64], 'english-literature-p2': [135, 96],
  'imedia-r093': [90, 70],
  'business-p1': [105, 90], 'business-p2': [105, 90], 'business-btec-c3': [120, 60],
  'history-ed-p1': [75, 52], 'history-ed-p2': [105, 64], 'history-ed-p3': [80, 52], 'history-aqa-p1': [120, 84], 'history-aqa-p2': [120, 84],
};
const expected = (p: MockPaper): [number, number] => {
  if (SPEC[p.id]) return SPEC[p.id];
  if (p.subjectId === 'maths' || p.subjectId === 'statistics') return [90, 80];
  if (['biology', 'chemistry', 'physics'].includes(p.subjectId)) return [105, 100];
  throw new Error(`no spec for ${p.id}`);
};

/** every combination of the options used by a test's sections, so each student's version is checked */
function profilesFor(paper: MockPaper, test: MockTest): Profile[] {
  const groups = new Map<string, Set<string>>();
  for (const s of test.sections) if (s.option) (groups.get(s.option.group) ?? groups.set(s.option.group, new Set()).get(s.option.group)!).add(s.option.value);
  const base = { ...defaultProfile(), ...(paper.option ? { options: { ...defaultProfile().options, [paper.option.group]: paper.option.value } } : {}) };
  let out: Profile[] = [base];
  for (const [g, vals] of groups) out = out.flatMap((p) => [...vals].map((v) => ({ ...p, options: { ...p.options, [g]: v } })));
  return out;
}

function correctAnswer(item: QItem): AutoAnswer {
  switch (item.type) {
    case 'mcq': return { choice: item.answer };
    case 'tf': return { choice: item.answer ? 0 : 1 };
    case 'multi': return { multi: item.answers };
    case 'num': return { text: String(item.answer) };
    case 'text': return { text: item.accept[0] };
    case 'order': return { order: item.items };
    case 'match': return { match: Object.fromEntries(item.pairs.map((p, i) => [i, p[1]])) };
    default: throw new Error(`unexpected type ${item.type}`);
  }
}

describe('mock papers', () => {
  test('every paper has exactly three practice tests, the real duration and permitted tools', () => {
    expect(MOCK_PAPERS.length).toBeGreaterThan(30);
    for (const p of MOCK_PAPERS) {
      const [mins, marks] = expected(p);
      expect(p.mins, p.id).toBe(mins);
      expect(p.marks, p.id).toBe(marks);
      const tests = p.tests();
      expect(tests.map((t) => t.n), p.id).toEqual([1, 2, 3]);
      expect(new Set(tests.map((t) => t.id)).size).toBe(3);
      for (const t of tests) expect(getTest(t.id)?.test.id).toBe(t.id);
      // no calculator on non-calculator papers; calculator on every paper where one is allowed
      if (/Non-calculator/.test(p.title)) expect(p.tools).not.toContain('calc');
      if (/maths-p[23]|biology|chemistry|physics|statistics|business/.test(p.id)) expect(p.tools, p.id).toContain('calc');
      if (/english|history|imedia/.test(p.id)) expect(p.tools, p.id).toEqual(['working']);
      if (p.subjectId === 'chemistry') expect(p.tools).toContain('table');
      if (p.subjectId === 'physics') expect(p.tools).toContain('equations');
    }
  });

  test('every version of every test adds up to the paper total', () => {
    for (const p of MOCK_PAPERS) for (const t of p.tests()) for (const prof of profilesFor(p, t)) {
      expect(testMarks(t, prof), `${t.id} ${JSON.stringify(prof.options)}`).toBe(p.marks);
      expect(visibleSections(t, prof).length).toBeGreaterThan(0);
    }
  });

  test('question numbers are unique and every question links to a real topic in its subject', () => {
    for (const p of MOCK_PAPERS) for (const t of p.tests()) for (const prof of profilesFor(p, t)) {
      const ns = visibleSections(t, prof).flatMap((s) => s.questions.map((q) => q.n));
      expect(new Set(ns).size, `${t.id} duplicate numbers ${ns.join(',')}`).toBe(ns.length);
      for (const s of visibleSections(t, prof)) for (const q of s.questions) {
        const topicId = q.kind === 'auto' ? q.item.topicId : q.topicId;
        const found = getTopic(topicId);
        expect(found, `${t.id} q${q.n} topic ${topicId}`).toBeTruthy();
        expect(found!.subject.id, `${t.id} q${q.n}`).toBe(p.subjectId);
        expect(q.marks).toBeGreaterThan(0);
        if (q.kind === 'written') {
          expect(q.eq.markScheme.length, `${t.id} q${q.n}`).toBeGreaterThan(0);
          expect(q.eq.q.length).toBeGreaterThan(15);
        }
      }
    }
  });

  test('the three tests for a paper never repeat a written question', () => {
    for (const p of MOCK_PAPERS) {
      const seen = new Map<string, string>();
      for (const t of p.tests()) {
        // the same standard wording on a different source (e.g. English Language Question 3) is a different question
        const mine = new Set(t.sections.flatMap((s) => s.questions.filter((q) => q.kind === 'written').map((q) => `${s.source ?? ''}\n${q.kind === 'written' ? q.eq.q : ''}`)));
        for (const q of mine) {
          expect(seen.get(q), `${p.id}: "${q.slice(-80)}" repeated in ${t.id}`).toBeUndefined();
          seen.set(q, t.id);
        }
      }
    }
  });

  test('every auto-marked question is full marks with its correct answer and zero when blank', () => {
    for (const p of MOCK_PAPERS) for (const t of p.tests()) for (const s of t.sections) for (const q of s.questions) {
      if (q.kind !== 'auto') continue;
      const r = gradeAuto(q.item, correctAnswer(q.item), q.marks);
      expect(r.got, `${t.id} q${q.n} ${q.item.type}: ${(q.item.q ?? "").slice(0, 50)}`).toBe(q.marks);
      expect(gradeAuto(q.item, undefined, q.marks).got).toBe(0);
    }
  });

  test('non-calculator maths papers only use answers you can work out by hand', () => {
    for (const p of MOCK_PAPERS.filter((x) => /Non-calculator/.test(x.title))) for (const t of p.tests()) for (const s of t.sections) for (const q of s.questions) {
      if (q.kind === 'auto' && q.item.type === 'num') {
        const dp = String(q.item.answer).split('.')[1]?.length ?? 0;
        expect(dp, `${t.id} q${q.n}`).toBeLessThanOrEqual(2);
      }
    }
  });

  test('students only see papers for their own subjects, tier and course', () => {
    const prof = { ...defaultProfile(), subjects: ['maths', 'history', 'business'], tiers: { maths: 'F' as const }, options: { ...defaultProfile().options, 'history-board': 'aqa', 'business-course': 'btec' } };
    const ids = papersFor(prof).map((p) => p.id);
    expect(ids).toEqual(expect.arrayContaining(['maths-p1-f', 'maths-p2-f', 'maths-p3-f', 'history-aqa-p1', 'history-aqa-p2', 'business-btec-c3']));
    expect(ids.some((i) => i.endsWith('-h') || i.startsWith('history-ed') || i === 'business-p1' || i.startsWith('english'))).toBe(false);
    const both = papersFor({ ...prof, options: { ...prof.options, 'business-course': 'both' } }).map((p) => p.id);
    expect(both).toEqual(expect.arrayContaining(['business-p1', 'business-p2', 'business-btec-c3']));
  });

  test('literature papers show only the student\'s chosen texts', () => {
    const t = getTest('english-literature-p1-t2')!.test;
    const prof = { ...defaultProfile(), options: { ...defaultProfile().options, 'lit-shakespeare': 'romeo', 'lit-novel': 'jekyll' } };
    const secs = visibleSections(t, prof);
    expect(secs).toHaveLength(2);
    expect(secs[0].title).toContain('Romeo and Juliet');
    expect(secs[1].title).toContain('Jekyll');
    expect(secs[0].questions[0].marks).toBe(34);
    expect(secs[1].questions[0].marks).toBe(30);
    expect(short('explore how Shakespeare presents guilt in *Macbeth*.')).toEqual(['presents', 'guilt']);
    expect(short('how does Shelley create a sense of horror in *Frankenstein*?')).toEqual(['creates', 'a sense of horror']);
  });
});

describe('mark-scheme marking', () => {
  const lit = ['Level 6 (26-30 marks): convincing', 'Level 5 (21-25 marks): thoughtful', 'Level 4 (16-20 marks): clear', 'Level 3 (11-15 marks): explained', 'Level 2 (6-10 marks): supported', 'Level 1 (1-5 marks): simple',
    'AO4 High performance (4 marks): consistent accuracy', 'AO4 Intermediate performance (2-3 marks): considerable accuracy', 'AO4 Threshold performance (1 mark): reasonable accuracy', 'Indicative content: ...'];

  test('levels are best-fit: the middle of the chosen band, per component', () => {
    expect(isLevelledScheme(lit)).toBe(true);
    expect(schemeMark(lit, 34, [3])).toBe(13); // Level 3 (11-15) -> 13, not a fraction of the boxes ticked
    expect(schemeMark(lit, 34, [0, 6])).toBe(32); // Level 6 (28) + AO4 high (4)
    expect(schemeMark(lit, 34, [2, 7])).toBe(21); // Level 4 (18) + AO4 intermediate (3)
    expect(schemeMark(lit, 34, [9])).toBe(0); // indicative content earns nothing on its own
    expect(bandOf(lit[8])).toEqual({ comp: 'ao4', lo: 1, hi: 1 });
  });

  test('choosing a level replaces the previous level in the same component only', () => {
    let t = toggleTick(lit, [], 3);
    t = toggleTick(lit, t, 6);
    t = toggleTick(lit, t, 1);
    expect(t).toEqual([1, 6]);
    expect(toggleTick(lit, t, 1)).toEqual([6]);
  });

  test('English Language writing: content and technical accuracy are marked separately', () => {
    const t = getTest('english-language-p1-t1')!.test;
    const q5 = t.sections[1].questions[0];
    if (q5.kind !== 'written') throw new Error('expected written');
    const ms = q5.eq.markScheme;
    const c3 = ms.findIndex((l) => /^Content and organisation – Level 3/.test(l));
    const t4 = ms.findIndex((l) => /^Technical accuracy – Level 4/.test(l));
    expect(schemeMark(ms, 40, [c3, t4])).toBe(16 + 15); // 13-18 -> 16, 13-16 -> 15
  });

  test('a "maximum N marks" line caps the total when ticked', () => {
    const t = getTest('history-ed-p1-t1')!.test;
    const q4 = t.sections[1].questions[1];
    if (q4.kind !== 'written') throw new Error('expected written');
    const ms = q4.eq.markScheme;
    const top = ms.findIndex((l) => l.startsWith('Level 4'));
    const cap = ms.findIndex((l) => l.startsWith('Maximum 8'));
    expect(schemeMark(ms, 12, [top])).toBe(11);
    expect(schemeMark(ms, 12, [top, cap])).toBe(8);
  });

  test('points-based schemes give one mark per point, ignoring guidance lines', () => {
    const ms = ['Identifies a first valid feature (1)', 'Gives supporting information (1)', 'Identifies a second valid feature (1)', 'Gives supporting information (1)', 'Valid features include: a; b; c.'];
    expect(schemeMark(ms, 4, [0, 1, 2])).toBe(3);
    expect(schemeMark(ms, 4, [0, 1, 2, 3, 4])).toBe(4);
    expect(schemeMark(ms, 4, [4])).toBe(0);
  });
});
