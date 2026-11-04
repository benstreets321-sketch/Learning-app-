// Registers the service worker (offline support + installability) in the normal web build only.
export function registerSW() {
  if (import.meta.env.MODE === 'single' || !import.meta.env.PROD) return;
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => { /* offline support is optional */ });
  });
}
