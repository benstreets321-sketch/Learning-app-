import { useState } from 'react';
import type { QItem, Topic } from '../content/types';
import { getSubject } from '../content/registry';
import { href } from '../lib/router';
import { Markdown } from './Markdown';
import { Icon } from './Icon';

type Panel = 'none' | 'guided' | 'simpler' | 'example' | 'key' | 'mistakes' | 'lesson' | 'tips';

interface Props {
  item: QItem;
  topic?: Topic;
  hintsUsed: number;
  onHint: () => void;
  /** MCQ only: remove two wrong options (counts as a hint) */
  onEliminate?: () => void;
  eliminated?: boolean;
  /** 'before' = while answering; 'after' = help understanding a wrong answer (no credit cost) */
  mode?: 'before' | 'after';
}

/**
 * Layered help for when a student is stuck, ordered from the lightest nudge to full re-teaching:
 * hints one at a time -> remove two wrong answers -> guided solution -> another explanation ->
 * worked example -> key points / common mistakes -> the lesson -> a rescue session.
 * Help used before answering lowers the credit slightly so mastery stays honest.
 */
export function StuckPanel({ item, topic, hintsUsed, onHint, onEliminate, eliminated, mode = 'before' }: Props) {
  const [panel, setPanel] = useState<Panel>('none');
  const [exIndex, setExIndex] = useState(0);
  const [guidedShown, setGuidedShown] = useState(1);
  const subject = getSubject(item.subjectId);
  const before = mode === 'before';

  const hintList: string[] = [...(item.hints ?? [])];
  if (item.type === 'text') {
    const a = item.accept[0];
    hintList.push(`The answer starts with **${a[0].toUpperCase()}** and is ${a.includes(' ') ? `${a.split(/\s+/).length} words` : `${a.length} letters`} long.`);
  }
  if (item.type === 'cloze') hintList.push('Read the sentence aloud with a gap-filler like "blank" - which key term from the lesson fits the meaning?');
  if (hintList.length === 0) hintList.push(genericHint(item));

  const steps = (item.type === 'num' || item.type === 'text' || item.type === 'algebra' || item.type === 'plot') && item.steps?.length ? item.steps : [];
  const guided = steps.length > 1 ? steps.slice(0, -1) : [];
  const shown = hintList.slice(0, hintsUsed);
  const examples = topic?.workedExamples ?? [];
  const ex = examples[exIndex % Math.max(1, examples.length)];
  const canEliminate = before && item.type === 'mcq' && item.options.length >= 4 && !!onEliminate;

  const open = (id: Panel, costs = false) => {
    if (panel === id) return setPanel('none');
    if (costs && before && id === 'guided' && hintsUsed < hintList.length + 1) onHint();
    setPanel(id);
  };
  const btn = (id: Panel, label: string, icon: string, show = true, costs = false) =>
    show ? (
      <button className={`chip ${panel === id ? 'on' : ''}`} onClick={() => open(id, costs)}>
        <Icon name={icon} size={16} /> {label}
      </button>
    ) : null;

  return (
    <div className={`stuck ${before ? '' : 'after'}`}>
      <div className="stuck-head">
        <strong>{before ? 'Stuck? Start with the smallest nudge.' : 'Help me understand this'}</strong>
        <span className="muted small">
          {before ? 'Using help is a good strategy – it only reduces the credit a little, and the question comes back later.' : 'Work out why the answer is right – that is what stops the same mistake next time.'}
        </span>
      </div>

      {before && (
        <>
          {shown.length > 0 && (
            <ol className="hint-list">
              {shown.map((h, i) => <li key={i}><Markdown text={h} inline /></li>)}
            </ol>
          )}
          <div className="row gap wrap">
            {hintsUsed < hintList.length ? (
              <button className="btn small" onClick={onHint}>
                <Icon name="bulb" size={16} /> {hintsUsed === 0 ? 'Give me a hint' : `Another hint (${hintList.length - hintsUsed} left)`}
              </button>
            ) : (
              <span className="muted small">No more hints.</span>
            )}
            {canEliminate && (
              <button className="btn small" disabled={eliminated} onClick={onEliminate}>
                <Icon name="half" size={16} /> {eliminated ? 'Two wrong answers removed' : 'Remove two wrong answers'}
              </button>
            )}
          </div>
        </>
      )}

      <div className="chips wrap">
        {btn('guided', before ? 'Guide me step by step' : 'Full worked solution', 'steps', steps.length > 0 && (before ? guided.length > 0 : !item.generated), true)}
        {btn('simpler', 'Explain it another way', 'message', !!topic?.simpler)}
        {btn('example', 'Show a worked example', 'pencil', examples.length > 0)}
        {btn('key', 'Key points', 'target', !!topic?.keyPoints.length)}
        {btn('mistakes', 'Common mistakes', 'fix', !!topic?.misconceptions?.length)}
        {btn('lesson', 'Read the lesson', 'learn', !!topic?.notes)}
        {btn('tips', 'How to get unstuck', 'life', !!subject?.stuck.length)}
      </div>

      {panel === 'guided' && (
        <div className="stuck-body">
          {before ? (
            <>
              <p className="muted small">Follow the steps. The last step is yours – finish it and type your answer.</p>
              <ol className="steps">{guided.slice(0, guidedShown).map((s, i) => <li key={i}><Markdown text={s} inline /></li>)}</ol>
              {guidedShown < guided.length ? (
                <button className="btn small" onClick={() => setGuidedShown((n) => n + 1)}>Show the next step</button>
              ) : (
                <p className="small"><strong>Now you finish it.</strong></p>
              )}
            </>
          ) : (
            <ol className="steps">{steps.map((s, i) => <li key={i}><Markdown text={s} inline /></li>)}</ol>
          )}
        </div>
      )}
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

      {topic && (
        <p className="stuck-foot small">
          Still lost on <strong>{topic.title}</strong>? <a href={href('/rescue', { topic: topic.id })}>Start a rescue session</a> - we rebuild it from the basics, one small step at a time.
        </p>
      )}
    </div>
  );
}

function genericHint(item: QItem): string {
  switch (item.type) {
    case 'mcq': return 'Cover the options and answer in your head first. Then rule out any option you know is wrong – which is left?';
    case 'multi': return 'Treat each option as its own true/false question.';
    case 'tf': return 'Look for the one word that could make the statement wrong (always, never, only, all...).';
    case 'num': return 'Write down what you know, the formula that links it, then substitute. Check units first. The calculator and formula sheet are in the toolbar above the question.';
    case 'text': return 'Think of the exact key term from your notes – the word an examiner would look for.';
    case 'order': return 'Find the very first step or event first, then ask "what must happen next?"';
    case 'match': return 'Start with the pair you are most sure of – fewer options make the rest easier.';
    case 'cloze': return 'Read the whole sentence first. The words around each gap are clues.';
    case 'sort': return 'Do the ones you are sure of first. For the rest, ask what the groups have in common.';
    case 'select': return 'Read the instruction again, then read the passage slowly one sentence at a time.';
    case 'spot': return 'Check each line on its own: does it follow correctly from the line before? Redo each calculation.';
    case 'algebra': return 'Work it out on the working pad first. Check your answer by putting in a number for x on both your answer and the question – they should match. Then check it is in the form asked for.';
    case 'plot': return 'For each point, go across to the x-value first, then up or down to the y-value ("along the corridor, then up the stairs"). For a line, work out y for two or three easy x-values.';
  }
}
