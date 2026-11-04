/* Daily reminder handler, imported into the generated service worker. */
const REMINDER_CACHE = 'gcse-reminders';
const STATE_URL = new URL('./reminder-state.json', self.registration.scope).href;
const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

async function readState() {
  const c = await caches.open(REMINDER_CACHE);
  const r = await c.match(STATE_URL);
  return r ? r.json() : null;
}
async function writeState(s) {
  const c = await caches.open(REMINDER_CACHE);
  await c.put(STATE_URL, new Response(JSON.stringify(s), { headers: { 'Content-Type': 'application/json' } }));
}

async function maybeRemind() {
  const s = await readState();
  if (!s || !s.on) return;
  const now = new Date();
  const today = dayKey(now);
  const [h, m] = String(s.time || '18:00').split(':').map(Number);
  const due = now.getHours() * 60 + now.getMinutes() >= h * 60 + m;
  if (!due || s.studiedOn === today || s.lastShown === today) return;
  await self.registration.showNotification("Time for today's revision", {
    body: 'Flashcards, a short practice session and your Fix-it list. About 30 minutes.',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    tag: 'daily-reminder',
  });
  await writeState({ ...s, lastShown: today });
}

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'daily-reminder') event.waitUntil(maybeRemind());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow(self.registration.scope);
  })());
});
