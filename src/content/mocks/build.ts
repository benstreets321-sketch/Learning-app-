// Builds mock papers from the question bank, generators and exam questions, to the real paper's marks.
// Every test is deterministic (seeded) so "retry the same test" gives exactly the same paper, and the three tests
// for a paper avoid sharing questions wherever the bank allows.
import type { ExamQuestion, QItem } from '../types';
import { getTopic, makeGenerated, topicQuestions } from '../registry';
import { GENERATORS } from '../generators';
import { mulberry32, shuffle } from '../../lib/util';
import { defaultMarks } from '../../lib/grade';
import type { AutoQ, MockQ, MockSection, WrittenQ } from './types';

export const seedOf = (s: string) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0; return h; };

/** Generators whose questions need a calculator */
const CALC_ONLY = new Set(['m-compound', 'm-trig', 'm-sine-cosine', 'm-quad-formula', 'm-arc-sector', 'm-circle', 'm-volume']);
const isLevelled = (eq: ExamQuestion) => eq.markScheme.some((m) => /\bLevel \d/i.test(m));
const decimals = (n: number) => { const s = String(n); return s.includes('.') ? s.split('.')[1].length : 0; };
const ncFriendly = (q: QItem) => q.type !== 'num' || (Number.isFinite(q.answer) && decimals(q.answer) <= 2 && Math.abs(q.answer) < 1e7);

/** used questions across the three tests of a paper; written questions are keyed by wording so duplicates in the bank never repeat */
export interface Pools { items: Set<string>; written: Set<string>; gens: Map<string, number> }
const wkey = (eq: ExamQuestion) => eq.q.replace(/\s+/g, ' ').trim().toLowerCase();
export const newPools = (): Pools => ({ items: new Set(), written: new Set(), gens: new Map() });

export interface AssembleOpts {
  key: string;
  topics: string[];
  marks: number;
  tier?: 'F' | 'H';
  nonCalc?: boolean;
  /** share of marks from extended written answers (marked against a mark scheme) */
  writtenShare: number;
  /** share of marks from generated calculations (fresh numbers each test) */
  genShare: number;
  /** largest single written question */
  maxWritten?: number;
  numbering: 'aqa' | 'plain';
  extraWritten?: Record<string, ExamQuestion[]>;
  types?: QItem['type'][];
  pools: Pools;
}

interface Pick { q: MockQ; topicId: string; order: number }

export function assemble(o: AssembleOpts): MockSection {
  const rand = mulberry32(seedOf(o.key));
  const picks: Pick[] = [];
  let total = 0;
  const room = () => o.marks - total;
  const topicOrder = (t: string) => o.topics.indexOf(t);
  const F = o.tier === 'F';

  // 1) written exam-style questions, spread across topics
  const writtenTarget = Math.round(o.marks * o.writtenShare);
  const written: { eq: ExamQuestion; t: string }[] = [];
  for (const t of o.topics) {
    for (const eq of [...(getTopic(t)?.topic.examQuestions ?? []), ...(o.extraWritten?.[t] ?? [])]) {
      if (eq.marks > (o.maxWritten ?? 6)) continue;
      if (F && /higher/i.test(eq.meta ?? '')) continue;
      if (o.nonCalc && /calculator allowed/i.test(eq.meta ?? '')) continue;
      if (!o.nonCalc && /non-calculator/i.test(eq.meta ?? '') && o.topics.length > 3 && rand() < 0.5) continue;
      if (F && isLevelled(eq) && eq.marks > 6) continue;
      written.push({ eq, t });
    }
  }
  const freshWritten = shuffle(written.filter((w, i) => !o.pools.written.has(wkey(w.eq)) && written.findIndex((x) => wkey(x.eq) === wkey(w.eq)) === i), rand);
  const usedTopicsW = new Map<string, number>();
  for (const pass of [0, 1]) {
    for (const w of freshWritten) {
      if (total >= writtenTarget) break;
      if (o.pools.written.has(wkey(w.eq)) || w.eq.marks > room()) continue;
      if (pass === 0 && (usedTopicsW.get(w.t) ?? 0) >= 1) continue; // first pass: one per topic
      o.pools.written.add(wkey(w.eq));
      usedTopicsW.set(w.t, (usedTopicsW.get(w.t) ?? 0) + 1);
      picks.push({ q: { kind: 'written', n: '', marks: w.eq.marks, eq: w.eq, topicId: w.t, lines: Math.max(3, w.eq.marks * 2) } as WrittenQ, topicId: w.t, order: 50 + w.eq.marks });
      total += w.eq.marks;
    }
  }

  // 2) generated calculations (new numbers for every test)
  const genTarget = total + Math.round(o.marks * o.genShare);
  const gens = o.topics.flatMap((t) => (getTopic(t)?.topic.generators ?? []).filter((g) => GENERATORS[g] && !(F && GENERATORS[g].tier === 'H') && !(o.nonCalc && CALC_ONLY.has(g)) && !g.includes('spot')).map((g) => ({ g, t })));
  const levels = F ? [1, 2, 2, 3] : [2, 3, 3, 4, 5];
  let guard = 0;
  const genOrder = shuffle(gens, rand);
  while (total < genTarget && genOrder.length && guard++ < 400) {
    const { g, t } = genOrder[guard % genOrder.length];
    const uses = o.pools.gens.get(g) ?? 0;
    if (uses >= 3 && guard < 300) continue;
    const l = levels[Math.floor(rand() * levels.length)];
    const item = makeGenerated({ g, s: Math.floor(rand() * 2 ** 31), l, t });
    if (!item || (o.nonCalc && !ncFriendly(item))) continue;
    const marks = defaultMarks(item);
    if (marks > room()) continue;
    o.pools.gens.set(g, uses + 1);
    const method = 'steps' in item && item.steps ? item.steps.slice(0, -1).slice(0, Math.max(0, marks - 1)).map((s) => `M1 ${s}`) : undefined;
    picks.push({ q: { kind: 'auto', n: '', marks, item, method } as AutoQ, topicId: t, order: l * 10 + marks });
    total += marks;
  }

  // 3) bank questions to make up the exact total
  const types = o.types ?? ['mcq', 'multi', 'num', 'text', 'match', 'order'];
  const bank = o.topics.flatMap((t) => topicQuestions(t))
    .filter((q) => types.includes(q.type) && !q.ctx && !(F && q.tier === 'H') && !(o.nonCalc && !ncFriendly(q)) && !(q as { fromQuotes?: boolean }).fromQuotes);
  const authoredFirst = (list: QItem[]) => [...shuffle(list.filter((q) => !(q as { derived?: boolean }).derived), rand), ...shuffle(list.filter((q) => (q as { derived?: boolean }).derived), rand)];
  const fresh = authoredFirst(bank.filter((q) => !o.pools.items.has(q.id)));
  const reused = authoredFirst(bank.filter((q) => o.pools.items.has(q.id)));
  const perTopic = new Map<string, number>();
  const cap = Math.ceil((o.marks * 0.6) / Math.max(1, o.topics.length)) + 2;
  for (const list of [fresh, reused]) {
    for (const q of list) {
      if (room() <= 0) break;
      if (picks.some((p) => p.q.kind === 'auto' && p.q.item.id === q.id)) continue;
      const marks = Math.min(defaultMarks(q), room());
      if ((perTopic.get(q.topicId) ?? 0) >= cap && list === fresh) continue;
      perTopic.set(q.topicId, (perTopic.get(q.topicId) ?? 0) + marks);
      o.pools.items.add(q.id);
      picks.push({ q: { kind: 'auto', n: '', marks, item: q } as AutoQ, topicId: q.topicId, order: q.d * 10 + marks });
      total += marks;
    }
  }

  // 4) safety net: if the bank ran out, top up with freshly generated questions (new numbers, so never a repeat)
  for (let tries = 0; room() > 0 && gens.length && tries < 200; tries++) {
    const { g, t } = gens[Math.floor(rand() * gens.length)];
    const item = makeGenerated({ g, s: Math.floor(rand() * 2 ** 31), l: levels[Math.floor(rand() * levels.length)], t });
    if (!item || (o.nonCalc && !ncFriendly(item))) continue;
    const marks = Math.min(defaultMarks(item), room());
    picks.push({ q: { kind: 'auto', n: '', marks, item } as AutoQ, topicId: t, order: 50 + marks });
    total += marks;
  }

  // number the questions as the board does
  const out: MockQ[] = [];
  if (o.numbering === 'aqa') {
    const byTopic = [...new Set(picks.map((p) => p.topicId))].sort((a, b) => topicOrder(a) - topicOrder(b));
    byTopic.forEach((t, qi) => {
      const parts = picks.filter((p) => p.topicId === t).sort((a, b) => a.order - b.order);
      parts.forEach((p, pi) => out.push({ ...p.q, n: `${String(qi + 1).padStart(2, '0')}.${pi + 1}` }));
    });
  } else {
    picks.sort((a, b) => a.order - b.order || topicOrder(a.topicId) - topicOrder(b.topicId)).forEach((p, i) => out.push({ ...p.q, n: String(i + 1) }));
  }
  return { title: 'Answer all questions', intro: 'Answer all questions in the spaces provided.', questions: out };
}

/** Sum of marks a set of sections is worth (a "choose one" section counts its largest question) */
export function sectionMarks(sections: MockSection[]): number {
  return sections.reduce((a, s) => a + (s.chooseOne ? Math.max(0, ...s.questions.map((q) => q.marks)) : s.questions.reduce((b, q) => b + q.marks, 0)), 0);
}
