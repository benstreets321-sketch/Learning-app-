// Core content model for the whole app.
// Content is authored with the helpers in dsl.ts so files stay short and readable.

export type Tier = 'F' | 'H' | 'both';

// ---------- diagrams drawn with a question (SVG) ----------
export type Pt = [number, number];
/** Geometry shapes, in the diagram's own units (0,0 top-left, y down) */
export type GeoShape =
  | { t: 'poly'; pts: Pt[]; fill?: boolean }
  | { t: 'line'; a: Pt; b: Pt; dash?: boolean; thin?: boolean }
  | { t: 'circle'; c: Pt; r: number }
  | { t: 'dot'; p: Pt; label?: string; at?: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' }
  | { t: 'text'; p: Pt; s: string; size?: number }
  /** an angle arc at `at` between the rays towards `from` and `to`, with a label */
  | { t: 'angle'; at: Pt; from: Pt; to: Pt; label?: string; r?: number }
  | { t: 'right'; at: Pt; from: Pt; to: Pt }
  /** equal-length marks on a side */
  | { t: 'ticks'; a: Pt; b: Pt; n?: number }
  /** parallel-line arrows on a side */
  | { t: 'arrows'; a: Pt; b: Pt; n?: number }
  /** a length written beside a side (outside the shape: side 1 or -1) */
  | { t: 'side'; a: Pt; b: Pt; s: string; side?: 1 | -1 };
export type Diagram = { alt: string } & (
  | { kind: 'geo'; w: number; h: number; shapes: GeoShape[] }
  | { kind: 'bar'; labels: string[]; values: number[]; x?: string; y?: string; step?: number }
  | { kind: 'pie'; labels: string[]; values: number[]; angles?: boolean }
  | { kind: 'histogram'; bounds: number[]; fd: number[]; x: string }
  | { kind: 'boxplot'; boxes: { label?: string; v: [number, number, number, number, number] }[]; axis: [number, number, number]; x?: string }
  | { kind: 'graph'; x: [number, number, number]; y: [number, number, number]; xl?: string; yl?: string;
      lines?: { m: number; c: number; label?: string }[]; quads?: { a: number; b: number; c: number }[]; poly?: Pt[]; points?: { p: Pt; label?: string }[] }
);

export interface Hinted {
  /** Progressive hints: nudge -> strategy -> nearly the answer */
  hints?: string[];
  /** 1 (easy) to 5 (hardest, grade 8/9 style) */
  d: number;
  /** Explanation shown after answering (always shown, right or wrong) */
  why: string;
  /** Higher-tier only (maths/science/statistics) */
  tier?: Tier;
  /** Source text, data or table the question depends on (shown above the question) */
  ctx?: string;
  /** a drawn diagram (angles, triangles, charts, graphs) shown with the question */
  diagram?: Diagram;
}

export interface McqQ extends Hinted {
  type: 'mcq';
  q: string;
  /** options[answer] is correct. Authoring convention: correct option first, the UI shuffles. */
  options: string[];
  answer: number;
  /** Feedback for specific wrong options (keyed by authored option index) - targets misconceptions */
  fb?: Record<number, string>;
}

export interface MultiQ extends Hinted {
  type: 'multi';
  q: string;
  options: string[];
  answers: number[];
}

export interface TfQ extends Hinted {
  type: 'tf';
  q: string;
  answer: boolean;
}

export interface NumQ extends Hinted {
  type: 'num';
  q: string;
  answer: number;
  /** absolute tolerance (default 0.001 relative) */
  tol?: number;
  unit?: string;
  /** step-by-step solution, shown after answering or when stuck */
  steps?: string[];
}

export interface TextQ extends Hinted {
  type: 'text';
  q: string;
  /** accepted answers (case/punctuation-insensitive, small typos allowed) */
  accept: string[];
  /** spelling is being tested, so no typo allowance */
  exact?: boolean;
  steps?: string[];
}

export interface OrderQ extends Hinted {
  type: 'order';
  q: string;
  /** items in the CORRECT order; UI shuffles */
  items: string[];
}

export interface MatchQ extends Hinted {
  type: 'match';
  q: string;
  pairs: [string, string][];
}

export interface ClozeQ extends Hinted {
  type: 'cloze';
  /** Text with blanks written as {{answer}} or {{answer|alt1|alt2}} */
  text: string;
  q?: string;
}

/** Sort items into 2-4 groups */
export interface SortQ extends Hinted {
  type: 'sort';
  q: string;
  groups: string[];
  /** [item, index of its group] */
  items: [string, number][];
}

/** Tap the target words in a passage. Targets are written [[like this]] in `text`. */
export interface SelectQ extends Hinted {
  type: 'select';
  q: string;
  text: string;
}

/** Spot the mistake in a worked solution. steps[wrong] contains the error. */
export interface SpotQ extends Hinted {
  type: 'spot';
  q: string;
  steps: string[];
  wrong: number;
  /** the corrected version of the wrong step */
  fix?: string;
}

/** A typed algebra answer: marked correct if it is EQUAL to `answer` and in the required form */
export interface AlgebraQ extends Hinted {
  type: 'algebra';
  q: string;
  answer: string;
  /** any equivalent form, fully factorised, expanded and simplified, or simplest surd form */
  form?: 'any' | 'factorised' | 'expanded' | 'surd';
  steps?: string[];
}

/** Plot points (or draw a straight line through points) by tapping a grid */
export interface PlotQ extends Hinted {
  type: 'plot';
  q: string;
  grid: { x: [number, number]; y: [number, number]; snap?: number; xl?: string; yl?: string };
  /** exactly these points (any order) */
  points?: Pt[];
  /** or: at least `min` points, all on y = mx + c */
  line?: { m: number; c: number; min?: number };
  /** shown on the grid for reference (e.g. the shape to reflect) */
  given?: { p: Pt; label?: string }[];
  steps?: string[];
}

export type Question = McqQ | MultiQ | TfQ | NumQ | TextQ | OrderQ | MatchQ | ClozeQ | SortQ | SelectQ | SpotQ | AlgebraQ | PlotQ;

/** A question with identity attached at load time */
export type QItem = Question & { id: string; topicId: string; subjectId: string; generated?: boolean };

export interface Flashcard {
  front: string;
  back: string;
}

export interface WorkedExample {
  title: string;
  problem: string;
  steps: string[];
  answer?: string;
  /** "Your turn" follow-up so students go straight from example to practice (faded examples) */
  tryIt?: string;
  tryAnswer?: string;
}

export interface ExamQuestion {
  q: string;
  marks: number;
  /** e.g. "Paper 1 Section A", "AO2" */
  meta?: string;
  /** how to approach / plan it */
  guidance?: string[];
  /** Mark-scheme points or level descriptors the student ticks off when self-marking */
  markScheme: string[];
  /** model answer or model paragraph */
  model?: string;
  /** suggested minutes */
  time?: number;
}

export interface Quote {
  text: string;
  who?: string;
  where?: string;
  analysis: string;
  themes?: string[];
}

export interface TimelineEvent {
  date: string;
  event: string;
}

export interface PastQuestion {
  year: string;
  focus: string;
  extract?: string;
}

export interface Misconception {
  wrong: string;
  right: string;
}

export interface Topic {
  id: string;
  title: string;
  summary: string;
  tier?: Tier;
  /** Main lesson in Markdown */
  notes: string;
  /** "Explain it another way" - simpler analogy-led explanation for when stuck */
  simpler?: string;
  /** the must-know checklist (also used for blurting self-check) */
  keyPoints: string[];
  flashcards: Flashcard[];
  questions: Question[];
  /** ids of procedural generators giving unlimited practice */
  generators?: string[];
  workedExamples?: WorkedExample[];
  examQuestions?: ExamQuestion[];
  misconceptions?: Misconception[];
  quotes?: Quote[];
  timeline?: TimelineEvent[];
  pastQuestions?: PastQuestion[];
  /** topic ids to revisit if this one is a struggle */
  prerequisites?: string[];
  /** e.g. "Required practical", "Paper 2" */
  tags?: string[];
}

export interface Unit {
  id: string;
  title: string;
  description?: string;
  /** Only shown when the student's settings choose this option (e.g. their Shakespeare play) */
  option?: { group: string; value: string };
  /** Exam-board scoping, e.g. ['edexcel'] */
  boards?: string[];
  topics: Topic[];
}

export interface Paper {
  name: string;
  time: string;
  marks: number | string;
  weight: string;
  content: string;
  /** question-by-question breakdown */
  sections?: { label: string; detail: string }[];
}

export interface OptionGroup {
  id: string;
  label: string;
  help?: string;
  choices: { value: string; label: string; deep?: boolean }[];
}

export interface Strategy {
  title: string;
  why: string;
  how: string[];
}

export interface StuckTip {
  problem: string;
  fixes: string[];
}

export interface Subject {
  id: string;
  name: string;
  short: string;
  icon: string;
  color: string;
  qualification: string;
  boardNote?: string;
  /** the board(s) this content is mapped to */
  boards?: { value: string; label: string }[];
  papers: Paper[];
  optionGroups?: OptionGroup[];
  strategies: Strategy[];
  stuck: StuckTip[];
  /** command words/glossary for exam questions */
  commandWords?: { word: string; meaning: string }[];
  /** "What's changing / exam facts" for 2027 & 2028 */
  examNews?: string[];
  units: Unit[];
  /** Subject-specific tools to show on the Toolkit tab */
  tools?: string[];
}

export interface GeneratedQuestion {
  q: string;
  answer: number | string;
  /** for text answers */
  accept?: string[];
  /** text answer must be spelt exactly (spelling questions) */
  exact?: boolean;
  /** if present, rendered as multiple choice */
  options?: string[];
  tol?: number;
  unit?: string;
  steps: string[];
  hints?: string[];
  d: number;
  /** spot-the-error variant: a worked solution with one wrong line */
  spot?: { lines: string[]; wrong: number; fix: string };
  /** drawn with the question */
  diagram?: Diagram;
  /** typed algebra: `answer` is the expression; marked by equivalence plus this form */
  algebra?: { form: 'any' | 'factorised' | 'expanded' | 'surd' };
  /** plotting on a grid */
  plot?: Omit<PlotQ, 'type' | 'q' | 'why' | 'd' | 'hints' | 'steps'>;
}

export interface Generator {
  id: string;
  title: string;
  tier?: Tier;
  make: (rand: () => number, level: number) => GeneratedQuestion;
}
