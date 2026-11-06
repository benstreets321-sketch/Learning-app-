// A short run of flashcards inside a lesson or session: recall, flip, say how it went. Feeds the same card reviews
// as the Flashcards page, so cards answered here are scheduled exactly the same way.
import { useState } from 'react';
import type { Flashcard } from '../content/types';
import { addStudyTime, recordCard } from '../lib/store';
import { getTopic } from '../content/registry';
import { Markdown } from './Markdown';

export interface BurstCard { id: string; card: Flashcard; topicId: string }

export function CardBurst({ cards, title, intro, onDone, color }: { cards: BurstCard[]; title: string; intro?: string; onDone: (knew: number) => void; color?: string }) {
  const [queue, setQueue] = useState(cards);
  const [flipped, setFlipped] = useState(false);
  const [knew, setKnew] = useState(0);
  const [shownAt, setShownAt] = useState(Date.now());
  const [retried] = useState(() => new Set<string>());
  const c = queue[0];
  if (!c) return null;
  const grade = (ok: boolean) => {
    recordCard(c.id, ok ? 2 : 0);
    addStudyTime(Math.min(60, (Date.now() - shownAt) / 1000));
    const k = knew + (ok ? 1 : 0);
    setKnew(k);
    setFlipped(false);
    setShownAt(Date.now());
    // a forgotten card comes back once at the end of the burst
    const rest = queue.slice(1);
    const next = !ok && !retried.has(c.id) ? (retried.add(c.id), [...rest, c]) : rest;
    if (!next.length) onDone(k);
    else setQueue(next);
  };
  return (
    <div className="card-burst">
      <div className="row gap wrap"><strong>{title}</strong><span className="muted small mono push">{queue.length} left</span></div>
      {intro && <p className="muted small">{intro}</p>}
      <button className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)} style={color ? { ['--subj' as string]: color } : undefined} aria-live="polite">
        <span className="fc-topic muted small">{getTopic(c.topicId)?.topic.title}</span>
        <div className="fc-face"><Markdown text={flipped ? c.card.back : c.card.front} /></div>
        {!flipped && <span className="muted small">Say the answer first, then tap to flip</span>}
      </button>
      {flipped ? (
        <div className="grade-row two">
          <button className="grade again" onClick={() => grade(false)}>Not yet</button>
          <button className="grade good" onClick={() => grade(true)}>Knew it</button>
        </div>
      ) : (
        <div className="row end"><button className="btn primary" onClick={() => setFlipped(true)}>Show answer</button></div>
      )}
    </div>
  );
}
