import { useEffect, useRef, useState } from 'react';
import { activeSubjects } from '../content/registry';
import { getProfile, updateProfile, useProfile } from '../lib/store';
import { SESSION_LENGTHS, sessionPreview } from '../lib/session';
import { go } from '../lib/router';
import { Icon } from './Icon';
import { SubjectMark } from './SubjectMark';

/** The one-tap "Start session" button shown at the top of every screen */
export function StartSession({ compact = false }: { compact?: boolean }) {
  const profile = useProfile();
  const [open, setOpen] = useState(false);
  const [mins, setMins] = useState(profile.sessionMins ?? profile.dailyGoal ?? 30);
  const [picked, setPicked] = useState<string[]>(profile.sessionSubjects ?? []);
  const box = useRef<HTMLDivElement>(null);
  const subjects = activeSubjects(profile);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onDown); };
  }, [open]);

  const start = () => {
    updateProfile({ sessionMins: mins, sessionSubjects: picked });
    setOpen(false);
    go('/session', { mins, subjects: picked.join(',') || undefined, _: Date.now() });
  };
  const preview = open ? sessionPreview(picked.length ? picked : null) : null;
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="start-session" ref={box}>
      <button className={`btn primary start-btn ${compact ? 'compact' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="dialog">
        <Icon name="target" size={18} /> <span>Start session</span>
      </button>
      {open && (
        <div className="start-panel" role="dialog" aria-label="Start a session">
          <div className="start-row">
            <strong>How long?</strong>
            <div className="chips wrap">
              {SESSION_LENGTHS.map((m) => (
                <button key={m} className={`chip ${mins === m ? 'on' : ''}`} onClick={() => setMins(m)}>{m} min</button>
              ))}
            </div>
          </div>
          <div className="start-row">
            <strong>Subjects</strong>
            <div className="chips wrap">
              <button className={`chip ${picked.length === 0 ? 'on' : ''}`} onClick={() => setPicked([])}>All my subjects</button>
              {subjects.map((s) => (
                <button key={s.id} className={`chip ${picked.includes(s.id) ? 'on' : ''}`} onClick={() => toggle(s.id)}>
                  <SubjectMark subject={s} size="sm" /> {s.short}
                </button>
              ))}
            </div>
          </div>
          {preview && (
            <p className="small muted start-preview">
              The app chooses every question for you: {preview.fix ? `${preview.fix} to fix, ` : ''}{preview.due ? `${preview.due} topic${preview.due === 1 ? '' : 's'} due for review, ` : ''}{preview.weak ? `${preview.weak} weak spot${preview.weak === 1 ? '' : 's'}, ` : ''}and new parts of the specification you haven't started.
            </p>
          )}
          <button className="btn primary big start-go" onClick={start}>Start {mins}-minute session</button>
        </div>
      )}
    </div>
  );
}

/** For other components that want to launch a session directly */
export function launchSession(mins?: number) {
  const p = getProfile();
  go('/session', { mins: mins ?? p.sessionMins ?? p.dailyGoal ?? 30, subjects: (p.sessionSubjects ?? []).join(',') || undefined, _: Date.now() });
}
