// Code-split components that render instantly once their code is in memory.
// React.lazy suspends on a component's first render even when its code has already been prefetched, and React then
// holds the fallback for ~300 ms before revealing the page. These wrappers render the loaded component directly
// instead, so a page that was prefetched in the background appears immediately.
import { lazy, useState, type ComponentType } from 'react';

const preloaders: (() => Promise<unknown>)[] = [];

export function lazyNamed<M, P extends object>(load: () => Promise<M>, pick: (m: M) => ComponentType<P>): ComponentType<P> & { preload: () => Promise<unknown> } {
  let mod: M | undefined;
  const keep = () => load().then((m) => { mod = m; return m; });
  const Lazy = lazy(() => keep().then((m) => ({ default: pick(m) })));
  function Loaded(props: P) {
    // decided once per mount, so a page never switches component (and loses its state) when its code arrives
    const [Ready] = useState<ComponentType<P> | null>(() => (mod ? pick(mod) : null));
    return Ready ? <Ready {...props} /> : <Lazy {...props} />;
  }
  const preload = () => keep().catch(() => undefined);
  preloaders.push(preload);
  return Object.assign(Loaded, { preload });
}

/** Load every code-split component in the background (once) */
export const preloadAll = () => Promise.all(preloaders.map((p) => p()));
