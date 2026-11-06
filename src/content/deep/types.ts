// A deep fact bank for one subject: per topic, facts as [term, definition, example?] and processes as ordered steps.
export type DeepFact = readonly [term: string, definition: string, example?: string];
export interface DeepProcess { name: string; steps: string[] }
export interface DeepTopic { facts: DeepFact[]; steps?: DeepProcess[] }
export type DeepBank = Record<string, DeepTopic>;
