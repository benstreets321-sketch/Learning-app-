// The two one-tap buttons shown at the top of every screen. No options to pick: the app's adaptive engine decides
// what to do, from today's subject on the timetable, mistakes, reviews that are due, weak topics and question types,
// and the gap to the target grade.
import { getProfile, useProfile } from '../lib/store';
import { go } from '../lib/router';
import { focusFor } from '../lib/week';
import { Icon } from './Icon';

/** Start today's session straight away: the daily-goal length, on today's subject */
export function StartSession({ compact = false }: { compact?: boolean }) {
  const profile = useProfile();
  const focus = focusFor(profile);
  const mins = profile.dailyGoal ?? 30;
  return (
    <button className={`btn primary start-btn ${compact ? 'compact' : ''}`} onClick={() => launchSession(mins, focus.ids ?? undefined)} title={`${mins}-minute session${focus.group ? ` on ${focus.group.short}` : ''}: the app chooses everything`}>
      <Icon name="target" size={18} /> <span>{compact ? 'Session' : `${mins}-min session`}</span>
    </button>
  );
}

/** Learn the next topic for today's subject */
export function LearnButton({ compact = false }: { compact?: boolean }) {
  return (
    <button className={`btn learn-btn ${compact ? 'compact' : ''}`} onClick={() => go('/learn', { _: Date.now() })} title="Learn the next topic: a short lesson, practice and flashcards">
      <Icon name="learn" size={18} /> <span>Learn</span>
    </button>
  );
}

/** For other components that want to launch a session directly */
export function launchSession(mins?: number, subjectIds?: string[]) {
  const p = getProfile();
  const ids = subjectIds ?? focusFor(p).ids ?? [];
  go('/session', { mins: mins ?? p.dailyGoal ?? 30, subjects: ids.join(',') || undefined, _: Date.now() });
}
