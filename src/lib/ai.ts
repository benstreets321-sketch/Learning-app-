// One way to ask Claude, wherever the app is running:
// 1) Inside claude.ai (the preview artifact): the viewer's own Claude account, via the artifact `sample` capability.
// 2) The installed / web app: the Anthropic SDK with an API key the student (or a parent) pastes into Settings.
//    The key is kept only on this device and sent only to api.anthropic.com.
// 3) Neither: callers fall back to the app's built-in hints and explanations.
import { useSyncExternalStore } from 'react';

export type Provider = 'claude' | 'key' | 'none';
export interface Turn { role: 'user' | 'assistant'; content: string }

const KEY_STORE = 'gcse-hub.ai-key';
const MODEL = 'claude-opus-5-5';

type SampleFn = ((input: string | Turn[], opts?: Record<string, unknown>) => Promise<{ text: string }>) & {
  json?: <T>(input: string | Turn[], opts?: Record<string, unknown>) => Promise<T>;
};

let provider: Provider = 'none';
let sample: SampleFn | null = null;
let checked = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

export function getApiKey(): string {
  try { return localStorage.getItem(KEY_STORE) ?? ''; } catch { return ''; }
}
export function setApiKey(k: string) {
  try { if (k) localStorage.setItem(KEY_STORE, k.trim()); else localStorage.removeItem(KEY_STORE); } catch { /* storage blocked */ }
  refreshProvider();
}

function refreshProvider() {
  provider = sample ? 'claude' : getApiKey() ? 'key' : 'none';
  emit();
}

/** Detect the claude.ai runtime once (it answers within ~10 s, or never) */
export async function detectAI() {
  if (checked) return;
  checked = true;
  refreshProvider();
  const rt = (window as unknown as { claude?: { use(n: string): Promise<unknown> } }).claude;
  if (rt?.use) {
    try { sample = (await rt.use('sample')) as SampleFn | null; } catch { sample = null; }
  }
  refreshProvider();
}

export const getProvider = () => provider;
export function useAIProvider(): Provider {
  return useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, getProvider, getProvider);
}

export class AIError extends Error {
  constructor(public code: string, message: string) { super(message); }
}

const friendly: Record<string, string> = {
  not_granted: 'Claude was not allowed for this page. Reload and choose Allow to use the tutor.',
  rate_limited: 'Too many requests just now. Wait a minute and try again.',
  sampling_disabled: 'Claude is not available on this account.',
  session_expired: 'Your Claude session has expired. Sign in again.',
  auth: 'That API key was not accepted. Check it in Settings.',
  network: 'Could not reach Claude. Check your internet connection.',
  none: 'The AI tutor is not set up yet.',
};
export const aiErrorText = (e: unknown) => {
  const code = (e as { code?: string })?.code ?? 'error';
  return friendly[code] ?? 'Something went wrong asking Claude. Try again in a moment.';
};

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
  if (provider === 'claude' && sample) {
    try {
      const { text } = await sample([{ role: 'user', content: system }, ...turns], {
        cache: false,
        signal,
        modelTier: purpose === 'mark' ? 'complex' : 'default',
        onText: onText ? ({ text: t }: { text: string }) => onText(t) : undefined,
      });
      return text;
    } catch (e) {
      throw new AIError((e as { code?: string }).code ?? 'error', (e as { message?: string }).message ?? 'error');
    }
  }
  if (provider === 'key') {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey: getApiKey(), dangerouslyAllowBrowser: true });
    try {
      const stream = client.beta.messages.stream({
        model: MODEL,
        max_tokens: purpose === 'mark' ? 8000 : 4000,
        system,
        messages: turns,
        output_config: { effort: purpose === 'mark' ? 'medium' : 'low' },
        betas: ['server-side-fallback-2026-07-01'],
        // If a safety classifier declines, the API re-runs the request on its recommended fallback model.
        fallbacks: 'default',
      }, { signal });
      let text = '';
      for await (const ev of stream) {
        if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') {
          text += ev.delta.text;
          onText?.(text);
        }
      }
      const final = await stream.finalMessage();
      if (final.stop_reason === 'refusal') throw new AIError('refused', 'Claude could not help with that request.');
      return text;
    } catch (e) {
      if (e instanceof AIError) throw e;
      if (e instanceof Anthropic.AuthenticationError || e instanceof Anthropic.PermissionDeniedError) throw new AIError('auth', 'bad key');
      if (e instanceof Anthropic.RateLimitError) throw new AIError('rate_limited', 'rate limited');
      if (e instanceof Anthropic.APIConnectionError) throw new AIError('network', 'network');
      if ((e as { name?: string }).name === 'AbortError' || signal?.aborted) throw new AIError('cancelled', 'cancelled');
      throw new AIError('error', String((e as Error).message ?? e));
    }
  }
  throw new AIError('none', 'not set up');
}

/** Ask for JSON back; tolerant of a sentence around the JSON */
export async function askJSON<T>(opts: AskOpts): Promise<T> {
  const text = await ask({ ...opts, onText: undefined });
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fence ? fence[1] : text.slice(Math.max(0, text.search(/[[{]/)), text.lastIndexOf(text.trim().startsWith('[') ? ']' : '}') + 1);
  try { return JSON.parse(raw) as T; } catch { throw new AIError('invalid_json', text); }
}

/** Cheap check that a pasted key works */
export async function testKey(): Promise<string> {
  try {
    const t = await ask({ system: 'Reply with exactly: OK', turns: [{ role: 'user', content: 'Test' }] });
    return t.trim() ? 'Key works. The tutor is ready.' : 'No reply.';
  } catch (e) { return aiErrorText(e); }
}
