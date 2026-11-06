import type { Generator } from '../types';
import { MATHS_GENERATORS } from './maths';
import { SCIENCE_GENERATORS } from './science';
import { SPOT_GENERATORS } from './spot';
import { STATS_GENERATORS, BUSINESS_GENERATORS, IMEDIA_GENERATORS } from './other';
import { FACT_SCIENCE_GENERATORS, FACT_SCIENCE_TOPICS } from './facts-science';
import { FACT_OTHER_GENERATORS, FACT_OTHER_TOPICS } from './facts-other';
import { FACT_MORE_GENERATORS, FACT_MORE_TOPICS } from './facts-more';
import { LIT_OVERVIEW_GENERATORS, LIT_OVERVIEW_TOPICS } from './lit-overview';
import { MATHS_MORE_GENERATORS, MATHS_MORE_TOPICS } from './maths-more';
import { STATS_BUSINESS_GENERATORS, STATS_BUSINESS_TOPICS } from './stats-business-more';
import { ENGLISH_MORE_GENERATORS, ENGLISH_MORE_TOPICS } from './english-more';
import { VISUAL_GENERATORS, VISUAL_TOPICS } from './visual';
import { ALGEBRA_GENERATORS, ALGEBRA_TOPICS } from './algebra-gen';
import { PLOT_GENERATORS, PLOT_TOPICS } from './plot-gen';
import { VOCAB_GENERATORS, VOCAB_TOPICS } from './vocab-gen';

export const ALL_GENERATORS: Generator[] = [...MATHS_GENERATORS, ...SCIENCE_GENERATORS, ...STATS_GENERATORS, ...BUSINESS_GENERATORS, ...IMEDIA_GENERATORS, ...SPOT_GENERATORS, ...FACT_SCIENCE_GENERATORS, ...FACT_OTHER_GENERATORS, ...FACT_MORE_GENERATORS, ...LIT_OVERVIEW_GENERATORS, ...MATHS_MORE_GENERATORS, ...STATS_BUSINESS_GENERATORS, ...ENGLISH_MORE_GENERATORS, ...VISUAL_GENERATORS, ...ALGEBRA_GENERATORS, ...PLOT_GENERATORS, ...VOCAB_GENERATORS];

/** Fact-table generators attached to topics (topic id -> generator ids) */
export const FACT_TOPICS: Record<string, string[]> = { ...FACT_SCIENCE_TOPICS };
for (const [t, gs] of [...Object.entries(FACT_OTHER_TOPICS), ...Object.entries(FACT_MORE_TOPICS), ...Object.entries(LIT_OVERVIEW_TOPICS), ...Object.entries(MATHS_MORE_TOPICS), ...Object.entries(STATS_BUSINESS_TOPICS), ...Object.entries(ENGLISH_MORE_TOPICS), ...Object.entries(VISUAL_TOPICS), ...Object.entries(ALGEBRA_TOPICS), ...Object.entries(PLOT_TOPICS), ...Object.entries(VOCAB_TOPICS)]) FACT_TOPICS[t] = [...new Set([...(FACT_TOPICS[t] ?? []), ...gs])];

export const GENERATORS: Record<string, Generator> = Object.fromEntries(ALL_GENERATORS.map((g) => [g.id, g]));
