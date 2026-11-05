import type { Generator } from '../types';
import { MATHS_GENERATORS } from './maths';
import { SCIENCE_GENERATORS } from './science';
import { SPOT_GENERATORS } from './spot';
import { STATS_GENERATORS, BUSINESS_GENERATORS, IMEDIA_GENERATORS } from './other';
import { FACT_SCIENCE_GENERATORS, FACT_SCIENCE_TOPICS } from './facts-science';
import { FACT_OTHER_GENERATORS, FACT_OTHER_TOPICS } from './facts-other';
import { FACT_MORE_GENERATORS, FACT_MORE_TOPICS } from './facts-more';
import { LIT_OVERVIEW_GENERATORS, LIT_OVERVIEW_TOPICS } from './lit-overview';

export const ALL_GENERATORS: Generator[] = [...MATHS_GENERATORS, ...SCIENCE_GENERATORS, ...STATS_GENERATORS, ...BUSINESS_GENERATORS, ...IMEDIA_GENERATORS, ...SPOT_GENERATORS, ...FACT_SCIENCE_GENERATORS, ...FACT_OTHER_GENERATORS, ...FACT_MORE_GENERATORS, ...LIT_OVERVIEW_GENERATORS];

/** Fact-table generators attached to topics (topic id -> generator ids) */
export const FACT_TOPICS: Record<string, string[]> = { ...FACT_SCIENCE_TOPICS };
for (const [t, gs] of [...Object.entries(FACT_OTHER_TOPICS), ...Object.entries(FACT_MORE_TOPICS), ...Object.entries(LIT_OVERVIEW_TOPICS)]) FACT_TOPICS[t] = [...new Set([...(FACT_TOPICS[t] ?? []), ...gs])];

export const GENERATORS: Record<string, Generator> = Object.fromEntries(ALL_GENERATORS.map((g) => [g.id, g]));
