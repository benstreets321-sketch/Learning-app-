import { useMemo, useState } from 'react';
import { activeSubjects, getSubject, getTopic, visibleTopics } from '../content/registry';
import type { Flashcard } from '../content/types';
import { schedule, type Grade } from '../lib/engine';
import { cardId } from '../lib/insights';
import { addStudyTime, getProfile, getProgress, recordCard } from '../lib/store';
import { href } from '../lib/router';
import { Markdown } from '../components/Markdown';
import { Empty, ProgressBar } from '../components/ui';
import { shuffle } from '../lib/util';

interface Card extends Flashcard {
  id: string;
  topicId: string;
  color: string;
}

const NEW_LIMIT = 20;

function buildDeck(query: URLSearchParams): { title: string; cards: Card[]; total: number } {
  const profile = getProfile();
  const progress = getProgress();
  const scope = query.get('scope') ?? 'due';
  const id = query.get('id') ?? '';
  const now = Date.now();
  let topics: { id: string; cards: Flashcard[]; color: string }[] = [];
  let title = 'Flashcards';

  if (scope === 'topic') {
    const ref = getTopic(id);
    if (ref) { topics = [{ id, cards: ref.topic.flashcards, color: ref.subject.color }]; title = ref.topic.title; }
  } else if (scope === 'subject') {
    const s = getSubject(id);
    if (s) { topics = visibleTopics(s, profile).map((t) => ({ id: t.id, cards: t.flashcards, color: s.color })); title = s.name; }
  } else {
    title = 'All due cards';
    for (const s of activeSubjects(profile)) topics.push(...visibleTopics(s, profile).map((t) => ({ id: t.id, cards: t.flashcards, color: s.color })));
  }

  const all: Card[] = topics.flatMap((t) => t.cards.map((c) => ({ ...c, id: cardId(t.id, c.front), topicId: t.id, color: t.color })));
  const due = all.filter((c) => progress.cards[c.id] && progress.cards[c.id].due <= now).sort((a, b) => progress.cards[a.id].due - progress.cards[b.id].due);
  // new cards: in course order for a single topic, shuffled otherwise; only from studied topics in "due" mode
  let fresh = all.filter((c) => !progress.cards[c.id]);
  if (scope === 'due') fresh = fresh.filter((c) => (progress.topics[c.topicId]?.n ?? 0) > 0 || progress.topics[c.topicId]?.notesRead);
  if (scope !== 'topic') fresh = shuffle(fresh);
  const cards = [...due, ...fresh.slice(0, NEW_LIMIT)];
  // if nothing due or new in a topic/subject deck, allow a free practice run
  if (!cards.length && scope !== 'due') return { title: `${title} (practice run)`, cards: shuffle(all).slice(0, 30), total: all.length };
  return { title, cards, total: all.length };
}

function ivlLabel(days: number): string {
  if (days <= 0) return '10 min';
  if (days === 1) return '1 day';
  if (days < 30) return `${days} days`;
  return `${Math.round(days / 30)} mo`;
}

export function FlashcardsPage({ query }: { query: URLSearchParams }) {
  const deck = useMemo(() => buildDeck(query), [query]);
  const [queue, setQueue] = useState<Card[]>(deck.cards);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const [again, setAgain] = useState(0);
  const [shownAt, setShownAt] = useState(Date.now());

  if (!deck.cards.length) {
    return (
      <Empty title="No cards due right now">
        <p className="muted">Cards appear here when they're due for review. Study a topic first, or open a subject's flashcards to learn new ones.</p>
        <a className="btn" href="#/">Home</a>
      </Empty>
    );
  }

  const card = queue[0];
  if (!card) {
    return (
      <div className="page narrow">
        <h1>Deck complete</h1>
        <p>You reviewed <strong>{done}</strong> cards{again ? `, and re-learned ${again} you'd forgotten` : ''}. They'll come back just before you're likely to forget them.</p>
        <div className="row gap">
          <a className="btn primary" href="#/">Home</a>
          <a className="btn" href={href('/quiz', { scope: 'smart', n: 10 })}>Now quiz me</a>
        </div>
      </div>
    );
  }

  const st = getProgress().cards[card.id];
  const preview = (g: Grade) => ivlLabel(schedule(st, g).ivl);

  const grade = (g: Grade) => {
    recordCard(card.id, g);
    addStudyTime(Math.min(60, (Date.now() - shownAt) / 1000));
    setDone((d) => d + 1);
    setFlipped(false);
    setShownAt(Date.now());
    setQueue((q) => {
      const rest = q.slice(1);
      if (g === 0) {
        setAgain((a) => a + 1);
        // re-show forgotten card a few cards later in this session
        const pos = Math.min(rest.length, 3);
        return [...rest.slice(0, pos), card, ...rest.slice(pos)];
      }
      return rest;
    });
  };

  const topicTitle = getTopic(card.topicId)?.topic.title;

  return (
    <div className="page narrow session">
      <div className="session-head">
        <a className="small" href="#/">End</a>
        <span className="small">{deck.title}</span>
        <span className="small">{queue.length} left</span>
      </div>
      <ProgressBar value={done / (done + queue.length)} color={card.color} />
      <button className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)} style={{ ['--subj' as string]: card.color }} aria-live="polite">
        <span className="fc-topic muted small">{topicTitle}{!st && ' · new'}</span>
        <div className="fc-face"><Markdown text={flipped ? card.back : card.front} /></div>
        {!flipped && <span className="muted small">Say or write the answer first, then tap to flip</span>}
      </button>
      {flipped ? (
        <div className="grade-row">
          <button className="grade again" onClick={() => grade(0)}>Forgot<span>{preview(0)}</span></button>
          <button className="grade hard" onClick={() => grade(1)}>Hard<span>{preview(1)}</span></button>
          <button className="grade good" onClick={() => grade(2)}>Good<span>{preview(2)}</span></button>
          <button className="grade easy" onClick={() => grade(3)}>Easy<span>{preview(3)}</span></button>
        </div>
      ) : (
        <div className="row end"><button className="btn primary" onClick={() => setFlipped(true)}>Show answer</button></div>
      )}
    </div>
  );
}
