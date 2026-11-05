// Daily study reminders.
// 1) While the app is open: a timer fires a notification at the chosen time if you haven't studied yet.
// 2) Installed app on Chrome/Edge/Android: periodic background sync lets the service worker remind you even when closed.
// 3) Everywhere (including iPhone): add a repeating event to your calendar.
import { saveFile } from './files';
import { getProfile, getProgress, updateProfile } from './store';
import { todayKey } from './util';

const CACHE = 'gcse-reminders';
const STATE_URL = './reminder-state.json';
const SINGLE = import.meta.env.MODE === 'single';

export const canNotify = () => typeof window !== 'undefined' && 'Notification' in window && !SINGLE;
export const permission = () => (canNotify() ? Notification.permission : 'denied');
export const canCalendar = () => !SINGLE;

function studiedToday(): boolean {
  const d = getProgress().days[todayKey()];
  return !!d && (d.q + d.cards > 0 || d.secs >= 120);
}

async function registration(): Promise<ServiceWorkerRegistration | undefined> {
  if (!('serviceWorker' in navigator)) return undefined;
  try { return (await navigator.serviceWorker.getRegistration()) ?? undefined; } catch { return undefined; }
}

export async function showReminder(title: string, body: string) {
  if (permission() !== 'granted') return false;
  const reg = await registration();
  const opts: NotificationOptions = { body, icon: './icons/icon-192.png', badge: './icons/icon-192.png', tag: 'daily-reminder' };
  try {
    if (reg) await reg.showNotification(title, opts);
    else new Notification(title, opts);
    return true;
  } catch { return false; }
}

/** Mirror the reminder settings + "studied today" into Cache Storage so the service worker can read them. */
export async function syncReminderState() {
  if (!('caches' in window) || SINGLE) return;
  const r = getProfile().reminder;
  const body = JSON.stringify({ on: !!r?.on && permission() === 'granted', time: r?.time ?? '18:00', studiedOn: studiedToday() ? todayKey() : null });
  try {
    const c = await caches.open(CACHE);
    const prev = await c.match(STATE_URL);
    const prevJson = prev ? await prev.json() : {};
    await c.put(STATE_URL, new Response(JSON.stringify({ ...prevJson, ...JSON.parse(body) }), { headers: { 'Content-Type': 'application/json' } }));
  } catch { /* storage unavailable */ }
}

async function registerPeriodic() {
  const reg = await registration();
  const ps = (reg as unknown as { periodicSync?: { register: (tag: string, o: { minInterval: number }) => Promise<void> } })?.periodicSync;
  if (!ps) return false;
  try {
    const status = await navigator.permissions.query({ name: 'periodic-background-sync' as PermissionName });
    if (status.state !== 'granted') return false;
    await ps.register('daily-reminder', { minInterval: 6 * 60 * 60 * 1000 });
    return true;
  } catch { return false; }
}

/** Turn reminders on: asks for permission. Returns a message for the user. */
export async function enableReminders(time: string): Promise<string> {
  if (!canNotify()) return 'This browser cannot show notifications. Use "Add to calendar" instead.';
  const p = await Notification.requestPermission();
  if (p !== 'granted') {
    updateProfile({ reminder: { on: false, time } });
    return 'Notifications are blocked. Allow them in your browser or phone settings, or use "Add to calendar".';
  }
  updateProfile({ reminder: { on: true, time } });
  await syncReminderState();
  const bg = await registerPeriodic();
  schedule();
  return bg
    ? `Reminder set for ${time} each day.`
    : `Reminder set for ${time}. It shows while the app is open in a tab or installed; for a reminder that always arrives, also add it to your calendar.`;
}

export function disableReminders() {
  const r = getProfile().reminder;
  updateProfile({ reminder: { on: false, time: r?.time ?? '18:00' } });
  void syncReminderState();
  schedule();
}

let timer: ReturnType<typeof setTimeout> | undefined;
/** In-app timer for today's reminder */
export function schedule() {
  clearTimeout(timer);
  const r = getProfile().reminder;
  if (!r?.on || permission() !== 'granted') return;
  const [h, m] = r.time.split(':').map(Number);
  const at = new Date();
  at.setHours(h, m, 0, 0);
  let ms = at.getTime() - Date.now();
  if (ms < 0) ms += 24 * 60 * 60 * 1000;
  timer = setTimeout(async () => {
    if (!studiedToday()) {
      const { body } = reminderText();
      await showReminder('Time for today\'s revision', body);
    }
    schedule();
  }, Math.min(ms, 2 ** 31 - 1));
}

export function reminderText() {
  const p = getProgress();
  const mistakes = Object.keys(p.mistakes).length;
  const goal = getProfile().dailyGoal;
  return { body: mistakes ? `${goal} minutes today. You have ${mistakes} question${mistakes === 1 ? '' : 's'} waiting on your Fix-it list.` : `${goal} minutes today keeps your revision on track.` };
}

/** A repeating calendar event (.ics) - works on every phone and computer */
export function calendarFile(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const start = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(h)}${pad(m)}00`;
  const endD = new Date(d); endD.setHours(h, m + getProfile().dailyGoal, 0, 0);
  const end = `${endD.getFullYear()}${pad(endD.getMonth() + 1)}${pad(endD.getDate())}T${pad(endD.getHours())}${pad(endD.getMinutes())}00`;
  const url = typeof location !== 'undefined' ? location.href.split('#')[0] : '';
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//GCSE Revision Hub//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:gcse-revision-daily-${start}@gcse-revision-hub`,
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    'RRULE:FREQ=DAILY',
    'SUMMARY:GCSE revision',
    `DESCRIPTION:Today's ${getProfile().dailyGoal} minutes: flashcards\\, practice\\, fix-it list. ${url}`,
    url ? `URL:${url}` : '',
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:GCSE revision', 'TRIGGER:PT0M', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');
}

/** Calendar files (.ics) are offered only in the normal app (canCalendar), where a plain download works */
export function downloadCalendar(time: string) {
  void saveFile('gcse-revision-reminder.ics', calendarFile(time), 'text/calendar');
}
