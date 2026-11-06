import { useEffect, useState } from 'react';
import { useSaveState } from '../lib/store';
import { Icon } from './Icon';

const ago = (t: number) => {
  const s = Math.round((Date.now() - t) / 1000);
  if (s < 10) return 'just now';
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  return new Date(t).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

/** Small "saved" line for the sidebar and settings */
export function SaveStatus({ detail = false }: { detail?: boolean }) {
  const s = useSaveState();
  const [, tick] = useState(0);
  useEffect(() => { const t = setInterval(() => tick((n) => n + 1), 20000); return () => clearInterval(t); }, []);
  const local = s.status === 'error' ? 'Could not save on this device' : s.status === 'pending' ? 'Saving…' : `Saved on this device${s.at ? ` ${ago(s.at)}` : ''}`;
  const cloud = s.cloud === 'synced' ? `Synced to your Claude account ${ago(s.cloudAt)}` : s.cloud === 'syncing' ? 'Syncing to your Claude account…' : s.cloud === 'error' ? 'Account sync paused. Saved on this device' : '';
  return (
    <div className={`save-status ${s.status === 'error' ? 'err' : ''}`} role="status" aria-live="polite">
      <Icon name={s.status === 'error' ? 'close' : 'check'} size={14} />
      <span>{local}{detail && cloud ? <><br />{cloud}</> : null}</span>
    </div>
  );
}

/** Banner shown only when saving is failing */
export function SaveWarning() {
  const s = useSaveState();
  if (s.status !== 'error') return null;
  return (
    <div className="notice">
      <Icon name="close" size={18} />
      <span>Your browser is blocking storage (private browsing or full storage), so progress won't survive closing the app. Open Settings to copy a backup.</span>
    </div>
  );
}
