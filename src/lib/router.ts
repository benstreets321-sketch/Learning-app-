// Minimal router.
// - Normal builds use the URL hash (#/s/maths) so pages can be bookmarked; works on GitHub Pages with no server config.
// - The single-file preview build (`vite build --mode single`) keeps the route in memory, because some embedded
//   viewers only allow plain #name hashes. Links are still written as href="#/..." and are intercepted.
import { useSyncExternalStore } from 'react';

export interface Route {
  path: string[];
  query: URLSearchParams;
  raw: string;
}

const MEMORY = import.meta.env.MODE === 'single';

function parse(raw: string): Route {
  const clean = raw.replace(/^#/, '') || '/';
  const [p, q = ''] = clean.split('?');
  return { path: p.split('/').filter(Boolean).map(decodeURIComponent), query: new URLSearchParams(q), raw: clean };
}

let current = parse(MEMORY ? '/' : window.location.hash);
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function setRoute(raw: string) {
  current = parse(raw);
  emit();
  try { window.scrollTo(0, 0); } catch { /* ignore */ }
}

if (MEMORY) {
  // Intercept in-app links so the outer page URL is never touched
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement | null)?.closest?.('a');
    const h = a?.getAttribute('href');
    if (h && h.startsWith('#/')) {
      e.preventDefault();
      setRoute(h);
    }
  });
} else {
  window.addEventListener('hashchange', () => setRoute(window.location.hash));
}

export function useRoute(): Route {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
  );
}

export function href(path: string, query?: Record<string, string | number | undefined>): string {
  const qs = query
    ? Object.entries(query)
        .filter(([, v]) => v !== undefined && v !== '')
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&')
    : '';
  return `#${path}${qs ? `?${qs}` : ''}`;
}

export function go(path: string, query?: Record<string, string | number | undefined>) {
  const target = href(path, query);
  if (MEMORY) setRoute(target);
  else window.location.hash = target.slice(1);
}

/** Re-mount the current page (e.g. "another round") without reloading the document */
export function refresh() {
  const q = new URLSearchParams(current.query);
  q.set('_', String(Date.now()));
  const path = '/' + current.path.map(encodeURIComponent).join('/');
  const target = `#${path}?${q.toString()}`;
  if (MEMORY) setRoute(target);
  else window.location.hash = target.slice(1);
}

export function back() {
  if (!MEMORY && window.history.length > 1) window.history.back();
  else go('/');
}
