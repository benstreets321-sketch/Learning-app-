// Saving a file for the student: a normal browser download, or - inside claude.ai, where pages cannot download
// directly - the viewer's own save prompt (the `downloads` capability). The viewer always confirms that save.
const SINGLE = import.meta.env.MODE === 'single';

interface Downloads { save(r: { filename: string; data: string | Blob }): Promise<{ status: string }> }
let cap: Promise<Downloads | null> | null = null;

/** The claude.ai save prompt, or null when this view can't offer one */
export function downloadsCap(): Promise<Downloads | null> {
  if (!cap) {
    const rt = typeof window !== 'undefined' ? (window as unknown as { claude?: { use(n: string): Promise<unknown> } }).claude : undefined;
    cap = rt?.use ? rt.use('downloads').then((d) => (d as Downloads | null) ?? null, () => null) : Promise.resolve(null);
  }
  return cap;
}

/** Can this view save files at all? (always in the normal app; inside claude.ai only if the viewer allows it) */
export const canSaveFiles = async () => (SINGLE ? (await downloadsCap()) !== null : true);

export type SaveOutcome = 'saved' | 'declined' | 'unavailable';

export async function saveFile(filename: string, data: string, type: string): Promise<SaveOutcome> {
  if (SINGLE) {
    const d = await downloadsCap();
    if (!d) return 'unavailable';
    try { await d.save({ filename, data }); return 'saved'; }
    catch (e) { return (e as { code?: string })?.code === 'declined' ? 'declined' : 'unavailable'; }
  }
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'saved';
}
