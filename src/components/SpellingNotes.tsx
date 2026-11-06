// Shown AFTER a written answer is finished: likely spelling mistakes, each with the correct spelling.
// Nothing is underlined while the student writes - as in the real exam.
import { useEffect, useState } from 'react';
import { ensureDictionary, spellingNotes, type SpellNote } from '../lib/spelling';

export function SpellingNotes({ text, quiet = false }: { text: string; quiet?: boolean }) {
  const [notes, setNotes] = useState<SpellNote[] | null>(null);
  useEffect(() => {
    let on = true;
    if (!text.trim()) { setNotes([]); return; }
    void ensureDictionary().then(() => { if (on) setNotes(spellingNotes(text)); });
    return () => { on = false; };
  }, [text]);
  if (!notes) return null;
  if (!notes.length) return quiet ? null : <p className="small spell-ok">Spelling: no mistakes spotted.</p>;
  return (
    <div className="spell-notes" role="note">
      <strong className="small">Check the spelling of {notes.length} word{notes.length === 1 ? '' : 's'}</strong>
      <ul>
        {notes.map((n) => (
          <li key={n.word}><span className="spell-wrong">{n.word}</span> → <strong>{n.suggestion}</strong></li>
        ))}
      </ul>
      <span className="muted small">Spelling, punctuation and grammar earn marks in English, History and Literature (AO4/AO6), and key terms must be spelt correctly in every subject.</span>
    </div>
  );
}
