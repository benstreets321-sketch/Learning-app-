import { useEffect, useState, useSyncExternalStore } from 'react';
import { Icon } from './Icon';

// Captures the browser's install prompt (Chrome, Edge, Android) so we can show our own button.
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
let deferred: BeforeInstallPromptEvent | null = null;
let installed = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e as BeforeInstallPromptEvent; emit(); });
  window.addEventListener('appinstalled', () => { installed = true; deferred = null; emit(); });
}
let snap = { canPrompt: false, installed: false };
const getSnap = () => {
  const next = { canPrompt: !!deferred, installed };
  if (next.canPrompt !== snap.canPrompt || next.installed !== snap.installed) snap = next;
  return snap;
};
const useInstall = () => useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, getSnap);

const standalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone === true);
const isIOS = () => typeof navigator !== 'undefined' && (/iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

export async function promptInstall() {
  if (!deferred) return false;
  await deferred.prompt();
  const r = await deferred.userChoice;
  deferred = null;
  emit();
  return r.outcome === 'accepted';
}

/** Install prompt card. Hidden once installed (unless `always`). */
export function InstallCard({ always = false }: { always?: boolean }) {
  const s = useInstall();
  const [hidden, setHidden] = useState(() => { try { return localStorage.getItem('gcse-install-dismissed') === '1'; } catch { return false; } });
  const [inApp, setInApp] = useState(false);
  useEffect(() => setInApp(standalone()), []);
  if (inApp || s.installed) return always ? <p className="muted">The app is installed on this device.</p> : null;
  if (hidden && !always) return null;
  const ios = isIOS();
  const dismiss = () => { setHidden(true); try { localStorage.setItem('gcse-install-dismissed', '1'); } catch { /* ignore */ } };
  return (
    <section className="card install">
      <div className="install-icon"><Icon name="download" size={22} /></div>
      <div className="grow">
        <strong>Install GCSE Revision Hub</strong>
        <p className="muted small">Opens full-screen from your home screen or desktop, and works offline once installed.</p>
        {s.canPrompt ? null : ios ? (
          <ol className="small install-steps">
            <li>Open this page in <strong>Safari</strong>.</li>
            <li>Tap the <strong>Share</strong> button (square with an arrow).</li>
            <li>Choose <strong>Add to Home Screen</strong>, then <strong>Add</strong>.</li>
          </ol>
        ) : (
          <ul className="small install-steps">
            <li><strong>Chrome or Edge (computer):</strong> click the install icon at the right of the address bar, or menu then <em>Install app</em>.</li>
            <li><strong>Android:</strong> menu (three dots) then <em>Install app</em> or <em>Add to Home screen</em>.</li>
            <li><strong>iPhone or iPad:</strong> Safari, Share, <em>Add to Home Screen</em>.</li>
          </ul>
        )}
      </div>
      <div className="install-actions">
        {s.canPrompt && <button className="btn primary" onClick={() => void promptInstall()}>Install</button>}
        {!always && <button className="btn ghost small" onClick={dismiss}>Not now</button>}
      </div>
    </section>
  );
}

/** Compact install button for the sidebar */
export function InstallButton() {
  const s = useInstall();
  if (!s.canPrompt) return null;
  return (
    <button className="side-link install-btn" onClick={() => void promptInstall()}>
      <Icon name="download" size={18} /> <span>Install app</span>
    </button>
  );
}
