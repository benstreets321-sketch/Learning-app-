import { useMemo, useState } from 'react';
import { activeSubjects, allTopicRefs } from '../content/registry';
import { getProfile } from '../lib/store';
import { href, go } from '../lib/router';
import { Markdown } from '../components/Markdown';
import { SubjectMark } from '../components/SubjectMark';
import { Icon } from '../components/Icon';
import type { Subject } from '../content/types';

interface Hit { kind: 'topic' | 'card' | 'quote' | 'term'; subject: Subject; topicId?: string; title: string; detail: string; score: number }

const norm = (s: string) => s.toLowerCase().replace(/[*_`>#]/g, '').replace(/[’‘]/g, "'");

let INDEX: Omit<Hit, 'score'>[] | null = null;
function buildIndex(): Omit<Hit, 'score'>[] {
  if (INDEX) return INDEX;
  const out: Omit<Hit, 'score'>[] = [];
  const seenTerms = new Set<string>();
  for (const { subject, topic } of allTopicRefs()) {
    out.push({ kind: 'topic', subject, topicId: topic.id, title: topic.title, detail: [topic.summary, ...topic.keyPoints].join(' · ') });
    for (const c of topic.flashcards) out.push({ kind: 'card', subject, topicId: topic.id, title: c.front, detail: c.back });
    for (const q of topic.quotes ?? []) out.push({ kind: 'quote', subject, topicId: topic.id, title: `“${q.text}”`, detail: [q.who, q.where].filter(Boolean).join(', ') + (q.analysis ? ` - ${q.analysis}` : '') });
  }
  for (const s of activeSubjects(getProfile())) {
    for (const w of s.commandWords ?? []) {
      const k = `${s.id}:${w.word}`;
      if (seenTerms.has(k)) continue;
      seenTerms.add(k);
      out.push({ kind: 'term', subject: s, title: w.word, detail: w.meaning });
    }
  }
  INDEX = out;
  return out;
}

function search(q: string, subjectIds: Set<string>): Hit[] {
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  const hits: Hit[] = [];
  for (const e of buildIndex()) {
    if (!subjectIds.has(e.subject.id)) continue;
    const t = norm(e.title), d = norm(e.detail);
    let score = 0;
    let all = true;
    for (const term of terms) {
      const inT = t.includes(term), inD = d.includes(term);
      if (!inT && !inD) { all = false; break; }
      score += inT ? (t.startsWith(term) || new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(t) ? 6 : 3) : 1;
    }
    if (!all) continue;
    if (e.kind === 'topic') score += 4;
    hits.push({ ...e, score });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 60);
}

const LABEL = { topic: 'Topics', card: 'Flashcards and facts', quote: 'Quotations', term: 'Command words' } as const;

export function SearchPage({ query }: { query: URLSearchParams }) {
  const [q, setQ] = useState(query.get('q') ?? '');
  const subjects = activeSubjects(getProfile());
  const ids = useMemo(() => new Set(subjects.map((s) => s.id)), [subjects]);
  const hits = useMemo(() => search(q, ids), [q, ids]);
  const groups = (['topic', 'card', 'quote', 'term'] as const).map((k) => ({ k, items: hits.filter((h) => h.kind === k).slice(0, k === 'topic' ? 12 : 20) })).filter((g) => g.items.length);

  return (
    <div className="page narrow">
      <h1>Search</h1>
      <form className="search-box" onSubmit={(e) => { e.preventDefault(); const first = hits.find((h) => h.topicId); if (first?.topicId) go(`/t/${first.topicId}`); }}>
        <Icon name="search" size={20} />
        <input
          autoFocus type="search" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Topics, key terms, quotes – e.g. osmosis, Lady Macbeth, break-even"
          aria-label="Search everything"
        />
      </form>
      {q.trim().length > 1 && !hits.length && <p className="muted">Nothing found for "{q}". Try a shorter or different word.</p>}
      {!q.trim() && <p className="muted small">Searches lessons, flashcards, quotations and command words in your subjects. Press <kbd>/</kbd> anywhere to jump here.</p>}
      {groups.map((g) => (
        <section key={g.k} className="section">
          <h2>{LABEL[g.k]} <span className="muted small mono">{g.items.length}</span></h2>
          <div className="list">
            {g.items.map((h, i) => (
              <a key={i} className="list-row search-hit" href={h.topicId ? href(`/t/${h.topicId}`, g.k === 'quote' ? { tab: 'quotes' } : undefined) : href(`/s/${h.subject.id}`)}>
                <SubjectMark subject={h.subject} size="sm" />
                <span className="grow">
                  <span className="hit-title"><Markdown text={h.title} inline /></span>
                  <span className="muted small hit-detail"><Markdown text={h.detail.length > 180 ? h.detail.slice(0, 180) + '…' : h.detail} inline /></span>
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
