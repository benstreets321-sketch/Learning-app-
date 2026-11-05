// Asking Claude, at no extra cost:
// - Inside claude.ai (the shared app page) the tutor uses the viewer's own Claude plan through the artifact
//   `sample` capability - no API key, nothing to pay.
// - Everywhere else (the installed app / website) the tutor runs in built-in mode, answering from the app's
//   own hints, worked steps, notes and mark schemes. Nothing is sent anywhere.
import { useSyncExternalStore } from 'react';

export type Provider = 'claude' | 'none';
export interface Turn { role: 'user' | 'assistant'; content: string }

type SampleFn = (input: string | Turn[], opts?: Record<string, unknown>) => Promise<{ text: string }>;

let provider: Provider = 'none';
let sample: SampleFn | null = null;
let checked = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
const setProvider = (p: Provider) => { if (p !== provider) { provider = p; emit(); } };

/** Detect the claude.ai runtime once (it answers within ~10 s, or never) */
export async function detectAI() {
  if (checked) return;
  checked = true;
  const rt = (typeof window !== 'undefined' ? (window as unknown as { claude?: { use(n: string): Promise<unknown> } }).claude : undefined);
  if (!rt?.use) return;
  try { sample = ((await rt.use('sample')) as SampleFn | null) ?? null; } catch { sample = null; }
  setProvider(sample ? 'claude' : 'none');
}

export const getProvider = () => provider;
export function useAIProvider(): Provider {
  return useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, getProvider, getProvider);
}

export class AIError extends Error {
  constructor(public code: string, message: string) { super(message); }
}

/** Errors after which Claude can't be used for the rest of this visit: switch to built-in mode */
const PERMANENT = new Set(['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed', 'session_expired']);
export const isPermanent = (e: unknown) => PERMANENT.has((e as { code?: string })?.code ?? '');

const friendly: Record<string, string> = {
  rate_limited: 'Claude is busy or your Claude usage limit has been reached. Try again in a little while.',
  refused: 'Claude could not help with that. Try asking in a different way.',
  none: 'Using the built-in tutor.',
};
export const aiErrorText = (e: unknown) => friendly[(e as { code?: string })?.code ?? ''] ?? 'Something went wrong asking Claude. Try again in a moment.';

interface AskOpts {
  system: string;
  turns: Turn[];
  onText?: (text: string) => void;
  signal?: AbortSignal;
  /** chat = quick replies; mark = careful marking */
  purpose?: 'chat' | 'mark';
}

/** Ask Claude; resolves with the full reply text. Streams through onText when given. */
export async function ask({ system, turns, onText, signal, purpose = 'chat' }: AskOpts): Promise<string> {
  if (provider !== 'claude' || !sample) throw new AIError('none', 'not available');
  try {
    const { text } = await sample([{ role: 'user', content: system }, ...turns], {
      cache: false,
      signal,
      modelTier: purpose === 'mark' ? 'complex' : 'default',
      onText: onText ? ({ text: t }: { text: string }) => onText(t) : undefined,
    });
    return text;
  } catch (e) {
    const err = new AIError((e as { code?: string })?.code ?? 'error', (e as { message?: string })?.message ?? 'error');
    if (isPermanent(err)) { sample = null; setProvider('none'); }
    throw err;
  }
}

/** Ask for JSON back; tolerant of a sentence around the JSON */
export async function askJSON<T>(opts: AskOpts): Promise<T> {
  const text = await ask({ ...opts, onText: undefined });
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const start = text.search(/[[{]/);
  const end = Math.max(text.lastIndexOf('}'), text.lastIndexOf(']'));
  const raw = fence ? fence[1] : start >= 0 && end > start ? text.slice(start, end + 1) : text;
  try { return JSON.parse(raw) as T; } catch { throw new AIError('invalid_json', text); }
}
