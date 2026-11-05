import type { ExamQuestion, QItem } from '../types';

/** Tools a candidate is allowed in the real exam. Nothing else is shown during a mock. */
export type MockTool = 'calc' | 'formula' | 'table' | 'equations' | 'working';

export interface AutoQ {
  kind: 'auto';
  /** question number as printed, e.g. "01.2" or "7" */
  n: string;
  marks: number;
  item: QItem;
  /** method-mark lines for partial credit when the final answer is wrong (self-marked) */
  method?: string[];
}

export interface WrittenQ {
  kind: 'written';
  n: string;
  marks: number;
  eq: ExamQuestion;
  topicId: string;
  /** suggested lines of writing space */
  lines?: number;
}

export type MockQ = AutoQ | WrittenQ;

export interface MockSection {
  title: string;
  /** instructions shown at the top of the section */
  intro?: string;
  /** source text, case study or extract shared by the section's questions (Markdown) */
  source?: string;
  /** only shown when the student's options include this (e.g. their Shakespeare play) */
  option?: { group: string; value: string };
  /** "answer one question from this section" */
  chooseOne?: boolean;
  questions: MockQ[];
}

export interface MockTest {
  id: string;
  paperId: string;
  n: 1 | 2 | 3;
  title: string;
  /** what this test concentrates on and why it was chosen */
  focus?: string;
  sections: MockSection[];
}

export interface MockPaper {
  id: string;
  subjectId: string;
  /** e.g. "Paper 1: Explorations in creative reading and writing" */
  title: string;
  /** e.g. "AQA 8700/1" */
  board: string;
  mins: number;
  marks: number;
  tier?: 'F' | 'H';
  /** paper only offered for a course option (e.g. GCSE Business vs BTEC Enterprise, history board) */
  option?: { group: string; value: string };
  tools: MockTool[];
  /** instructions to candidates, as on the front of the paper */
  info: string[];
  /** built lazily the first time the paper is opened */
  tests: () => MockTest[];
}
