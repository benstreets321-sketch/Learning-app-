import type { Subject } from '../content/types';

/** Periodic-table style monogram tile for a subject (replaces emoji icons) */
export function SubjectMark({ subject, size = 'md' }: { subject: Pick<Subject, 'icon' | 'color' | 'name'>; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={`smark smark-${size}`} style={{ ['--subj' as string]: subject.color }} aria-hidden="true">
      {subject.icon}
    </span>
  );
}
