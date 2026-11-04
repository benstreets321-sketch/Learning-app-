import type { Generator } from '../types';
import { MATHS_GENERATORS } from './maths';
import { SCIENCE_GENERATORS } from './science';
import { STATS_GENERATORS, BUSINESS_GENERATORS, IMEDIA_GENERATORS } from './other';

export const ALL_GENERATORS: Generator[] = [...MATHS_GENERATORS, ...SCIENCE_GENERATORS, ...STATS_GENERATORS, ...BUSINESS_GENERATORS, ...IMEDIA_GENERATORS];

export const GENERATORS: Record<string, Generator> = Object.fromEntries(ALL_GENERATORS.map((g) => [g.id, g]));
