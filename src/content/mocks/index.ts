// Every mock paper in the app, with the real paper's duration, marks and permitted equipment.
import type { Profile } from '../../lib/store';
import { getSubject } from '../registry';
import type { MockPaper, MockTest } from './types';
import { assemble, newPools, sectionMarks } from './build';
import { SCIENCE_WRITTEN } from './science-written';
import { IMEDIA_SCENARIOS, IMEDIA_WRITTEN } from './imedia';
import { ENGLISH_LANGUAGE_PAPERS } from './english-language';
import { ENGLISH_LITERATURE_PAPERS } from './english-literature';
import { HISTORY_PAPERS } from './history';
import { BUSINESS_PAPERS } from './business';

const unitTopics = (subjectId: string, unitIds: string[]) =>
  (getSubject(subjectId)?.units ?? []).filter((u) => unitIds.includes(u.id)).flatMap((u) => u.topics.map((t) => t.id));

const memo = (f: () => MockTest[]) => { let v: MockTest[] | null = null; return () => (v ??= f()); };

const FOCUS = [
  'Covers the whole paper, weighted towards high-mark skills that appear every year.',
  'Different questions on the same content, with more extended answers.',
  'A final full mock: different questions again, including the trickier applications.',
];

// ---------------- Maths (Edexcel 1MA1 structure; AQA 8300 and OCR J560 papers are equivalent) ----------------
const MATHS_UNITS = ['m-number', 'm-algebra', 'm-ratio', 'm-geometry', 'm-probstats'];
function mathsPaper(n: 1 | 2 | 3, tier: 'F' | 'H'): MockPaper {
  const nonCalc = n === 1;
  const id = `maths-p${n}-${tier.toLowerCase()}`;
  return {
    id, subjectId: 'maths', tier,
    title: `Paper ${n} (${nonCalc ? 'Non-calculator' : 'Calculator'}) – ${tier === 'H' ? 'Higher' : 'Foundation'} tier`,
    board: `Edexcel 1MA1/${n}${tier}-style · AQA and OCR papers follow the same pattern`,
    mins: 90, marks: 80,
    tools: nonCalc ? ['formula', 'working'] : ['calc', 'formula', 'working'],
    info: [
      'Time: 1 hour 30 minutes. Total marks: 80.',
      nonCalc ? 'Calculators may not be used.' : 'You may use a calculator.',
      'A formulae sheet is provided (as in the 2027 exams; Ofqual confirmed this continues from 2028).',
      'Answer all questions. Show all your working – method marks are given for correct working.',
      'In the real exam you also need a ruler, protractor and compasses.',
    ],
    tests: memo(() => {
      const pools = newPools();
      const topics = unitTopics('maths', MATHS_UNITS);
      return ([1, 2, 3] as const).map((t) => ({
        id: `${id}-t${t}`, paperId: id, n: t, title: `Practice paper ${t}`, focus: FOCUS[t - 1],
        sections: [assemble({ key: `${id}-t${t}`, topics, marks: 80, tier, nonCalc, writtenShare: 0.22, genShare: 0.5, maxWritten: 6, numbering: 'plain', pools, types: ['num', 'text', 'mcq', 'multi'] })],
      }));
    }),
  };
}

// ---------------- Sciences (AQA 8461 / 8462 / 8463) ----------------
const SCI: Record<string, { name: string; code: string; p1: string[]; p2: string[]; tools: MockPaper['tools']; written: number; gen: number; extra: string }> = {
  biology: { name: 'Biology', code: '8461', p1: ['bio-cell', 'bio-org', 'bio-infection', 'bio-energy'], p2: ['bio-homeo', 'bio-inherit', 'bio-ecology'], tools: ['calc', 'working'], written: 0.4, gen: 0.05, extra: '' },
  chemistry: { name: 'Chemistry', code: '8462', p1: ['chem-atomic', 'chem-bond', 'chem-quant', 'chem-changes', 'chem-energy'], p2: ['chem-rates', 'chem-organic', 'chem-analysis', 'chem-atmos'], tools: ['calc', 'table', 'working'], written: 0.38, gen: 0.14, extra: 'The Periodic Table is provided.' },
  physics: { name: 'Physics', code: '8463', p1: ['phys-energy', 'phys-elec', 'phys-particle', 'phys-atomic'], p2: ['phys-forces', 'phys-waves', 'phys-magnet', 'phys-space'], tools: ['calc', 'equations', 'working'], written: 0.36, gen: 0.22, extra: 'The Physics Equations Sheet is provided. From 2028 you will not be asked simply to write down an equation that is on the sheet.' },
};
function sciencePaper(subjectId: string, n: 1 | 2, tier: 'F' | 'H'): MockPaper {
  const s = SCI[subjectId];
  const id = `${subjectId}-p${n}-${tier.toLowerCase()}`;
  return {
    id, subjectId, tier,
    title: `Paper ${n} – ${tier === 'H' ? 'Higher' : 'Foundation'} tier`,
    board: `AQA ${s.code}/${n}${tier}-style`,
    mins: 105, marks: 100,
    tools: s.tools,
    info: [
      'Time allowed: 1 hour 45 minutes. Maximum mark: 100.',
      'You may use a scientific calculator.',
      ...(s.extra ? [s.extra] : []),
      'Answer all questions. Show your working in calculations.',
      'Questions numbered like 01.1, 01.2 are parts of the same question.',
    ],
    tests: memo(() => {
      const pools = newPools();
      const topics = unitTopics(subjectId, n === 1 ? s.p1 : s.p2);
      return ([1, 2, 3] as const).map((t) => ({
        id: `${id}-t${t}`, paperId: id, n: t, title: `Practice paper ${t}`, focus: FOCUS[t - 1],
        sections: [assemble({ key: `${id}-t${t}`, topics, marks: 100, tier, writtenShare: s.written, genShare: s.gen, maxWritten: 6, numbering: 'aqa', pools, extraWritten: SCIENCE_WRITTEN, types: ['mcq', 'multi', 'num', 'text', 'match', 'order'] })],
      }));
    }),
  };
}

// ---------------- Statistics (Edexcel 1ST0) ----------------
function statsPaper(n: 1 | 2, tier: 'F' | 'H'): MockPaper {
  const id = `statistics-p${n}-${tier.toLowerCase()}`;
  return {
    id, subjectId: 'statistics', tier,
    title: `Paper ${n} – ${tier === 'H' ? 'Higher' : 'Foundation'} tier`,
    board: `Edexcel 1ST0/${n}${tier}-style`,
    mins: 90, marks: 80, tools: ['calc', 'working'],
    info: ['Time: 1 hour 30 minutes. Total marks: 80.', 'You may use a calculator.', 'Answer all questions. Show your working.', 'Both papers can assess any part of the specification.'],
    tests: memo(() => {
      const pools = newPools();
      const topics = unitTopics('statistics', ['st-collect', 'st-process', 'st-relationships', 'st-prob']);
      return ([1, 2, 3] as const).map((t) => ({
        id: `${id}-t${t}`, paperId: id, n: t, title: `Practice paper ${t}`, focus: FOCUS[t - 1],
        sections: [assemble({ key: `${id}-t${t}-p${n}`, topics, marks: 80, tier, writtenShare: 0.4, genShare: 0.3, maxWritten: 6, numbering: 'plain', pools, types: ['mcq', 'multi', 'num', 'text', 'match', 'order'] })],
      }));
    }),
  };
}

// ---------------- Creative iMedia R093 ----------------
function imediaPaper(): MockPaper {
  const id = 'imedia-r093';
  return {
    id, subjectId: 'imedia',
    title: 'R093: Creative iMedia in the media industry',
    board: 'OCR Cambridge National J834 R093-style',
    mins: 90, marks: 70, tools: ['working'],
    info: ['Time: 1 hour 30 minutes. Total marks: 70.', 'Section A: 10 marks. Section B: 60 marks, based on a client scenario.', 'Answer all questions.', 'The quality of your extended response is assessed in questions marked with an asterisk (*).'],
    tests: memo(() => {
      const pools = newPools();
      const topics = unitTopics('imedia', ['im-ta1', 'im-ta2', 'im-ta3', 'im-ta4']);
      return ([1, 2, 3] as const).map((t) => {
        const a = assemble({ key: `${id}-a${t}`, topics, marks: 10, writtenShare: 0, genShare: 0, numbering: 'plain', pools, types: ['mcq'] });
        const b = assemble({ key: `${id}-b${t}`, topics, marks: 60, writtenShare: 0.62, genShare: 0.05, maxWritten: 9, numbering: 'plain', pools, extraWritten: IMEDIA_WRITTEN, types: ['mcq', 'multi', 'text', 'match'] });
        b.questions.forEach((q, i) => { q.n = String(11 + i); });
        return {
          id: `${id}-t${t}`, paperId: id, n: t, title: `Practice paper ${t}`, focus: FOCUS[t - 1],
          sections: [
            { ...a, title: 'Section A', intro: 'Answer all questions. Each question is worth 1 mark.' },
            { ...b, title: 'Section B', intro: 'Read the client scenario, then answer all questions.', source: IMEDIA_SCENARIOS[t - 1] },
          ],
        };
      });
    }),
  };
}

export const MOCK_PAPERS: MockPaper[] = [
  ...ENGLISH_LANGUAGE_PAPERS,
  ...ENGLISH_LITERATURE_PAPERS,
  ...(['H', 'F'] as const).flatMap((tier) => ([1, 2, 3] as const).map((n) => mathsPaper(n, tier))),
  ...['biology', 'chemistry', 'physics'].flatMap((s) => (['H', 'F'] as const).flatMap((tier) => ([1, 2] as const).map((n) => sciencePaper(s, n, tier)))),
  imediaPaper(),
  ...BUSINESS_PAPERS,
  ...HISTORY_PAPERS,
  ...(['H', 'F'] as const).flatMap((tier) => ([1, 2] as const).map((n) => statsPaper(n, tier))),
];

export const getPaper = (id: string) => MOCK_PAPERS.find((p) => p.id === id);
export function getTest(testId: string): { paper: MockPaper; test: MockTest } | undefined {
  const paperId = testId.replace(/-t\d$/, '');
  const paper = getPaper(paperId);
  const test = paper?.tests().find((t) => t.id === testId);
  return paper && test ? { paper, test } : undefined;
}

/** Papers relevant to this student: their subjects, tier and course options */
export function papersFor(profile: Profile, subjectId?: string, allTiers = false): MockPaper[] {
  return MOCK_PAPERS.filter((p) =>
    profile.subjects.includes(p.subjectId) &&
    (!subjectId || p.subjectId === subjectId) &&
    (allTiers || !p.tier || p.tier === (profile.tiers[p.subjectId] ?? 'H')) &&
    (!p.option || profile.options[p.option.group] === p.option.value || profile.options[p.option.group] === 'both' || profile.showAllOptions));
}

/** The sections a student answers: option-specific sections follow their chosen texts */
export function visibleSections(test: MockTest, profile: Profile) {
  const sections = test.sections.filter((s) => !s.option || profile.options[s.option.group] === s.option.value);
  // if the student's option has no section here (e.g. no option set), fall back to the first for each group
  const groups = new Set(test.sections.filter((s) => s.option).map((s) => s.option!.group));
  for (const g of groups) {
    if (!sections.some((s) => s.option?.group === g)) {
      const first = test.sections.find((s) => s.option?.group === g);
      if (first) sections.splice(test.sections.indexOf(first), 0, first);
    }
  }
  return test.sections.filter((s) => sections.includes(s));
}

export const testMarks = (test: MockTest, profile: Profile) => sectionMarks(visibleSections(test, profile));
