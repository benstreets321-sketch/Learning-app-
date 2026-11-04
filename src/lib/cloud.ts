// Sync progress to the student's Claude account when the app runs as a claude.ai artifact.
// Uses the artifact `db` capability: each viewer's data lives under data/users/<their id>/, private to them.
// Elsewhere (the installed app / GitHub Pages) this does nothing and progress stays on the device.
import { getProfile, getProgress, getSaveState, replaceState, setCloudState, subscribeAll, type Profile, type Progress } from './store';

interface DocSnap { exists: boolean; data(): Record<string, unknown> | undefined }
interface DocRef { get(): Promise<DocSnap>; set(d: Record<string, unknown>): Promise<void> }
interface DB { doc(path: string): DocRef }
interface UserCap { id(): Promise<string | null> }
type ClaudeRT = { use(name: string): Promise<unknown> };

const MAX_DOC = 180_000; // bytes of JSON per document (store limit is 256 KiB)

/** Split a record into chunks that each serialise under MAX_DOC */
function chunk(obj: Record<string, unknown>): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  let cur: Record<string, unknown> = {};
  let size = 2;
  for (const [k, v] of Object.entries(obj)) {
    const s = JSON.stringify(k).length + JSON.stringify(v).length + 2;
    if (size + s > MAX_DOC && Object.keys(cur).length) { out.push(cur); cur = {}; size = 2; }
    cur[k] = v;
    size += s;
  }
  out.push(cur);
  return out;
}

const BIG = ['items', 'cards', 'essays', 'notes'] as const;

export async function startCloudSync() {
  const rt = (window as unknown as { claude?: ClaudeRT }).claude;
  if (!rt?.use) return;
  let db: DB | null = null, user: UserCap | null = null;
  try {
    [db, user] = (await Promise.all([rt.use('db'), rt.use('user')])) as [DB | null, UserCap | null];
  } catch { return; }
  if (!db || !user) return;
  const uid = await user.id().catch(() => null);
  if (!uid) return;
  const base = `data/users/${uid}`;
  const ref = (name: string) => db!.doc(`${base}/${name}`);
  setCloudState('syncing');

  const lastWritten = new Map<string, string>();
  try {
    // ---- pull ----
    const meta = await ref('meta').get();
    const m = meta.exists ? (meta.data() as { updatedAt?: number; chunks?: Record<string, number> }) : null;
    if (m?.updatedAt && m.updatedAt > getSaveState().updatedAt) {
      const prof = await ref('profile').get();
      const core = await ref('core').get();
      const pr: Record<string, unknown> = { ...(core.data() ?? {}) };
      for (const key of BIG) {
        const n = m.chunks?.[key] ?? 0;
        const merged: Record<string, unknown> = {};
        for (let i = 0; i < n; i++) {
          const d = await ref(`${key}-${i}`).get();
          if (d.exists) Object.assign(merged, d.data());
        }
        pr[key] = merged;
      }
      replaceState((prof.data() ?? {}) as Partial<Profile>, pr as Partial<Progress>, m.updatedAt);
    }
  } catch {
    setCloudState('error');
  }

  // ---- push (on change, batched) ----
  let busy = false, again = false;
  const push = async () => {
    if (busy) { again = true; return; }
    busy = true;
    try {
      const prog = getProgress();
      const { items, cards, essays, notes, ...core } = prog;
      const docs: [string, Record<string, unknown>][] = [['profile', getProfile() as unknown as Record<string, unknown>], ['core', core as unknown as Record<string, unknown>]];
      const chunks: Record<string, number> = {};
      for (const [key, val] of [['items', items], ['cards', cards], ['essays', essays], ['notes', notes]] as const) {
        const parts = chunk(val as Record<string, unknown>);
        chunks[key] = parts.length;
        parts.forEach((part, i) => docs.push([`${key}-${i}`, part]));
      }
      for (const [name, body] of docs) {
        const json = JSON.stringify(body);
        if (lastWritten.get(name) === json) continue;
        await ref(name).set(body);
        lastWritten.set(name, json);
      }
      const metaBody = { updatedAt: getSaveState().updatedAt, chunks };
      const mj = JSON.stringify(metaBody);
      if (lastWritten.get('meta') !== mj) { await ref('meta').set(metaBody); lastWritten.set('meta', mj); }
      setCloudState('synced');
    } catch {
      setCloudState('error');
    } finally {
      busy = false;
      if (again) { again = false; schedule(); }
    }
  };
  let t: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => { clearTimeout(t); t = setTimeout(() => void push(), 3000); };
  subscribeAll(schedule);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { clearTimeout(t); void push(); } });
  await push();
}
