// Kinds of question ("skills"), tracked per subject so the session engine can give more practice on the kinds a
// student finds hard - e.g. typed algebra, plotting graphs or reading diagrams - not just the topics.
import type { QItem } from '../content/types';

export type Skill = 'diagram' | 'algebra' | 'plot' | 'calc' | 'recall' | 'choice' | 'sort' | 'spot';
export const SKILL_NAME: Record<Skill, string> = {
  diagram: 'Reading diagrams, charts and graphs', algebra: 'Typed algebra', plot: 'Plotting on a grid', calc: 'Calculations',
  recall: 'Typed recall', choice: 'Multiple choice', sort: 'Sorting, ordering and matching', spot: 'Spotting mistakes',
};

export function skillOf(q: Pick<QItem, 'type'> & { diagram?: unknown }): Skill {
  if (q.diagram) return 'diagram';
  switch (q.type) {
    case 'algebra': return 'algebra';
    case 'plot': return 'plot';
    case 'num': return 'calc';
    case 'text': case 'cloze': return 'recall';
    case 'mcq': case 'tf': case 'multi': return 'choice';
    case 'spot': return 'spot';
    default: return 'sort';
  }
}

/** A subject's skills ordered weakest first (only those with enough answers to judge) */
export function weakSkills(skills: Record<string, { n: number; c: number }> | undefined, subjectIds: string[], minAnswers = 4): { skill: Skill; acc: number; n: number }[] {
  const agg = new Map<Skill, { n: number; c: number }>();
  for (const [k, v] of Object.entries(skills ?? {})) {
    const [sid, sk] = k.split('|');
    if (!subjectIds.includes(sid)) continue;
    const a = agg.get(sk as Skill) ?? { n: 0, c: 0 };
    agg.set(sk as Skill, { n: a.n + v.n, c: a.c + v.c });
  }
  return [...agg.entries()].filter(([, v]) => v.n >= minAnswers).map(([skill, v]) => ({ skill, acc: v.c / v.n, n: v.n })).sort((a, b) => a.acc - b.acc);
}
