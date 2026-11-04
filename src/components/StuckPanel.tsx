import { useState } from 'react';
import type { QItem, Topic } from '../content/types';
import { getSubject } from '../content/registry';
import { Markdown } from './Markdown';

type Panel = 'none' | 'simpler' | 'example' | 'key' | 'mistakes' | 'lesson' | 'tips';

/**
 * Layered help for when a student is stuck. Hints are revealed one at a time (each one lowers the
 * credit slightly so mastery stays honest). Beyond hints: another explanation, a worked example,
 * key points, common mistakes, the full lesson and general "getting unstuck" strategies.
 */
export function StuckPanel({ item, topic, hintsUsed, onHint }: { item: QItem; topic?: Topic; hintsUsed: number; onHint: () => void }) {
  const [panel, setPanel] = useState<Panel>('none');
  const [exIndex, setExIndex] = useState(0);
  const subject = getSubject(item.subjectId);

  const hintList: string[] = [...(item.hints ?? [])];
  if ('steps' in item && item.steps?.length) {
    // For worked-solution questions the final hint shows the first step(s)
    hintList.push(`First step: ${item.steps[0]}`);
    if (item.steps.length > 2) hintList.push(`Next: ${item.steps[1]}`);
  }
  if (hintList.length === 0) hintList.push(genericHint(item));

  const shown = hintList.slice(0, hintsUsed);
  const examples = topic?.workedExamples ?? [];
  const ex = examples[exIndex % Math.max(1, examples.length)];

  const btn = (id: Panel, label: string, show = true) =>
    show ? (
      <button className={`chip ${panel === id ? 'on' : ''}`} onClick={() => setPanel(panel === id ? 'none' : id)}>{label}</button>
    ) : null;

  return (
    <div className="stuck">
      <div className="stuck-head">
        <strong>Stuck? Work through these in order.</strong>
        <span className="muted small">Using help is smart - it just counts as partial credit.</span>
      </div>

      <ol className="hint-list">
        {shown.map((h, i) => (
          <li key={i}><Markdown text={h} inline /></li>
        ))}
      </ol>
      {hintsUsed < hintList.length ? (
        <button className="btn small" onClick={onHint}>
          {hintsUsed === 0 ? 'Give me a hint' : `Another hint (${hintList.length - hintsUsed} left)`}
        </button>
      ) : (
        <p className="muted small">No more hints - try the options below, or have a go and learn from the answer.</p>
      )}

      <div className="chips wrap">
        {btn('simpler', 'Explain it another way', !!topic?.simpler)}
        {btn('example', 'Show a worked example', examples.length > 0)}
        {btn('key', 'Key points', !!topic?.keyPoints.length)}
        {btn('mistakes', 'Common mistakes', !!topic?.misconceptions?.length)}
        {btn('lesson', 'Read the lesson', !!topic?.notes)}
        {btn('tips', 'How to get unstuck', !!subject?.stuck.length)}
      </div>

      {panel === 'simpler' && topic?.simpler && <div className="stuck-body"><Markdown text={topic.simpler} /></div>}
      {panel === 'example' && ex && (
        <div className="stuck-body">
          <h4>{ex.title}</h4>
          <Markdown text={ex.problem} />
          <ol className="steps">{ex.steps.map((s, i) => <li key={i}><Markdown text={s} inline /></li>)}</ol>
          {ex.answer && <p><strong>Answer:</strong> <Markdown text={ex.answer} inline /></p>}
          {examples.length > 1 && <button className="btn small" onClick={() => setExIndex((i) => i + 1)}>Another example</button>}
        </div>
      )}
      {panel === 'key' && topic && (
        <div className="stuck-body"><ul>{topic.keyPoints.map((k, i) => <li key={i}><Markdown text={k} inline /></li>)}</ul></div>
      )}
      {panel === 'mistakes' && topic?.misconceptions && (
        <div className="stuck-body">
          {topic.misconceptions.map((m, i) => (
            <div key={i} className="myth">
              <p><span className="pill pill-bad">Myth</span> <Markdown text={m.wrong} inline /></p>
              <p><span className="pill pill-good">Actually</span> <Markdown text={m.right} inline /></p>
            </div>
          ))}
        </div>
      )}
      {panel === 'lesson' && topic && <div className="stuck-body lesson-scroll"><Markdown text={topic.notes} /></div>}
      {panel === 'tips' && subject && (
        <div className="stuck-body">
          {subject.stuck.map((t, i) => (
            <details key={i}>
              <summary>{t.problem}</summary>
              <ul>{t.fixes.map((f, j) => <li key={j}><Markdown text={f} inline /></li>)}</ul>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}

function genericHint(item: QItem): string {
  switch (item.type) {
    case 'mcq': return 'Cover the options and answer in your head first. Then rule out any option you know is wrong - which is left?';
    case 'multi': return 'Treat each option as its own true/false question.';
    case 'tf': return 'Look for the one word that could make the statement wrong (always, never, only, all...).';
    case 'num': return 'Write down what you know, the formula that links it, then substitute. Check units first.';
    case 'text': return 'Think of the exact key term from your notes - the word an examiner would look for.';
    case 'order': return 'Find the very first step or event first, then ask "what must happen next?"';
    case 'match': return 'Start with the pair you are most sure of - fewer options make the rest easier.';
    case 'cloze': return 'Read the whole sentence first. The words around each gap are clues.';
  }
}
