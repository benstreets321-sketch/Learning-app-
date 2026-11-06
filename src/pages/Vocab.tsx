// The ambitious vocabulary word bank: every word with its meaning, the plain word it upgrades and an example, by
// group, with search. Learning and practice go through the normal topic, so it all feeds reviews and sessions.
import { useMemo, useState } from 'react';
import { VOCAB, VOCAB_CATS, type VocabCat } from '../content/vocab';
import { cardId } from '../lib/insights';
import { href } from '../lib/router';
import { useProgress } from '../lib/store';
import { Section } from '../components/ui';
import { Icon } from '../components/Icon';

export function VocabPage() {
  const progress = useProgress();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<VocabCat | 'all'>('all');
  const day = Math.floor(Date.now() / 86_400_000);
  const wotd = VOCAB[(day * 37) % VOCAB.length];
  const learned = VOCAB.filter((v) => { const s = progress.cards[cardId('el-vocab', `**${v.w}** (${v.pos === 'adj' ? 'adjective' : v.pos === 'adv' ? 'adverb' : v.pos})`)]; return s && s.ivl >= 3; }).length;
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return VOCAB.filter((v) => (cat === 'all' || v.cat === cat) && (!t || v.w.includes(t) || v.def.toLowerCase().includes(t) || v.plain.toLowerCase().includes(t)));
  }, [q, cat]);
  return (
    <div className="page narrow vocab-page">
      <a className="small" href={href('/s/english-language')}>← English Language</a>
      <h1>Ambitious vocabulary</h1>
      <p className="muted">{VOCAB.length} precise words for description, argument and analysis. {learned ? <><strong>{learned}</strong> learned so far (remembered for 3+ days).</> : 'Learn a few a day – your sessions bring them back before you forget.'}</p>
      <div className="card pad wotd">
        <p className="eyebrow">Word of the day</p>
        <h2>{wotd.w} <span className="muted small">({wotd.pos === 'adj' ? 'adjective' : wotd.pos === 'adv' ? 'adverb' : wotd.pos})</span></h2>
        <p>{wotd.def}. Upgrades: <em>{wotd.plain}</em>.</p>
        <p className="muted"><em>{wotd.ex}</em></p>
        <p className="small">Now write your own sentence with it – using a word is what makes it yours.</p>
      </div>
      <div className="row gap wrap vocab-actions">
        <a className="btn primary" href={href('/learn', { topic: 'el-vocab', _: Date.now() })}><Icon name="learn" size={16} /> Learn words</a>
        <a className="btn" href={href('/quiz', { scope: 'topic', id: 'el-vocab', n: 10 })}><Icon name="target" size={16} /> Practise 10</a>
        <a className="btn" href={href('/cards', { scope: 'topic', id: 'el-vocab' })}><Icon name="cards" size={16} /> Flashcards</a>
      </div>
      <div className="row gap wrap vocab-filter">
        <input className="answer-input small" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a word, meaning or plain word (e.g. scary)" aria-label="Search vocabulary" autoComplete="off" spellCheck={false} />
        <div className="chips wrap">
          <button className={`chip ${cat === 'all' ? 'on' : ''}`} onClick={() => setCat('all')}>All</button>
          {(Object.keys(VOCAB_CATS) as VocabCat[]).map((c) => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{VOCAB_CATS[c].title}</button>)}
        </div>
      </div>
      {(Object.keys(VOCAB_CATS) as VocabCat[]).filter((c) => list.some((v) => v.cat === c)).map((c) => (
        <Section key={c} title={VOCAB_CATS[c].title}>
          <p className="muted small">{VOCAB_CATS[c].use}</p>
          <div className="vocab-grid">
            {list.filter((v) => v.cat === c).map((v) => (
              <div key={v.w} className="vocab-card">
                <div className="row gap"><strong>{v.w}</strong><span className="muted small">{v.pos === 'adj' ? 'adjective' : v.pos === 'adv' ? 'adverb' : v.pos}</span><span className="pill small push">not “{v.plain}”</span></div>
                <span className="small">{v.def}</span>
                <span className="muted small"><em>{v.ex}</em></span>
              </div>
            ))}
          </div>
        </Section>
      ))}
      {!list.length && <p className="muted">No words match “{q}”.</p>}
    </div>
  );
}
