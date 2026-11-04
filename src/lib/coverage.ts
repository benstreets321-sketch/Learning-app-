// How much of each exam specification the student has covered, from their topic progress.
import type { Subject } from '../content/types';
import { specFor, type SpecPoint, type SpecSection } from '../content/spec';
import { getTopic } from '../content/registry';
import { level, mastery } from './engine';
import type { Profile, Progress } from './store';

export type PointStatus = 'new' | 'started' | 'weak' | 'secure';
export interface PointView extends SpecPoint { status: PointStatus; mastery: number }
export interface SectionView extends Omit<SpecSection, 'points'> { points: PointView[] }
export interface CoverageView { name: string; sections: SectionView[]; total: number; started: number; secure: number }

export function specCoverage(subject: Subject, profile: Profile, progress: Progress, now = Date.now()): CoverageView {
  const spec = specFor(subject);
  const foundation = profile.tiers[subject.id] === 'F';
  const sections: SectionView[] = spec.sections
    .filter((s) => !s.option || profile.showAllOptions || profile.options[s.option.group] === s.option.value || (profile.multiOptions[s.option.group] ?? []).includes(s.option.value))
    .map((s) => ({
      ...s,
      points: s.points
        .filter((p) => !(foundation && p.tier === 'H'))
        .map((p) => {
          const states = p.topics.map((t) => progress.topics[t]);
          const m = states.reduce((a, t) => a + mastery(t, now), 0) / Math.max(1, states.length);
          const levels = states.map((t) => level(t, now));
          const touched = states.some((t) => (t?.n ?? 0) > 0 || t?.notesRead);
          const status: PointStatus = !touched ? 'new' : levels.every((l) => l === 'secure' || l === 'mastered') ? 'secure' : levels.some((l) => l === 'weak') ? 'weak' : 'started';
          return { ...p, status, mastery: m };
        }),
    }))
    .filter((s) => s.points.length);
  const all = sections.flatMap((s) => s.points);
  return { name: spec.name, sections, total: all.length, started: all.filter((p) => p.status !== 'new').length, secure: all.filter((p) => p.status === 'secure').length };
}

/** Specification points the student has not touched yet, across their subjects (for "nothing missed" nudges) */
export function uncovered(subjects: Subject[], profile: Profile, progress: Progress, n = 3): { subject: Subject; point: PointView; topicId: string }[] {
  const out: { subject: Subject; point: PointView; topicId: string }[] = [];
  for (const s of subjects) {
    for (const sec of specCoverage(s, profile, progress).sections) {
      for (const p of sec.points) if (p.status === 'new' && getTopic(p.topics[0])) out.push({ subject: s, point: p, topicId: p.topics[0] });
    }
  }
  // rotate daily so the suggestions change, but stay stable within a day
  const day = Math.floor(Date.now() / 86_400_000);
  return out.length ? Array.from({ length: Math.min(n, out.length) }, (_, i) => out[(day * 7 + i * Math.max(1, Math.floor(out.length / n))) % out.length]) : [];
}
