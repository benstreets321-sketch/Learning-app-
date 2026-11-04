import { getQuestion, getSubject, getTopic } from '../content/registry';
import { clearMistake, useProgress } from '../lib/store';
import { href } from '../lib/router';
import { Empty, Section } from '../components/ui';
import { Markdown } from '../components/Markdown';

export function MistakesPage() {
  const progress = useProgress();
  const list = Object.values(progress.mistakes).sort((a, b) => Number(b.confidentWrong) - Number(a.confidentWrong) || b.at - a.at);
  if (!list.length) {
    return (
      <Empty title="Your Fix-it list is empty">
        <p className="muted">Every question you get wrong lands here. It leaves the list once you answer it correctly without help. Mistakes are the fastest route to improvement – so don't fear them!</p>
        <a className="btn primary" href={href('/quiz', { scope: 'smart', n: 15 })}>Start a smart session</a>
      </Empty>
    );
  }
  const bySubject = new Map<string, typeof list>();
  for (const m of list) bySubject.set(m.subjectId, [...(bySubject.get(m.subjectId) ?? []), m]);
  const confident = list.filter((m) => m.confidentWrong).length;

  return (
    <div className="page">
      <h1>Fix-it list</h1>
      <p className="muted">
        {list.length} question{list.length === 1 ? '' : 's'} to fix{confident ? `, including ${confident} you were sure about (misconceptions - fix these first)` : ''}.
        Retrying mistakes after a gap is one of the most powerful ways to learn.
      </p>
      <a className="btn primary" href={href('/quiz', { scope: 'mistakes', n: Math.min(20, list.length) })}>Fix them now ({Math.min(20, list.length)})</a>
      {[...bySubject.entries()].map(([sid, ms]) => {
        const subject = getSubject(sid);
        return (
          <Section key={sid} title={`${subject?.name ?? sid} (${ms.length})`} right={<a className="small" href={href('/quiz', { scope: 'mistakes', id: sid, n: 20 })}>Fix these →</a>}>
            <div className="mistake-list">
              {ms.map((m) => {
                const q = m.snapshot ? null : getQuestion(m.id);
                const t = getTopic(m.topicId);
                const text = q ? ('q' in q && q.q ? q.q : q.type === 'cloze' ? q.text.replace(/\{\{([^}|]+)[^}]*\}\}/g, '____') : '') : 'Calculation question (fresh numbers each time)';
                return (
                  <div key={m.id} className="mistake">
                    <div className="mistake-main">
                      {m.confidentWrong && <span className="pill pill-bad">Sure but wrong</span>}
                      {m.count > 1 && <span className="pill pill-warn">Missed {m.count}×</span>}
                      <Markdown text={text} inline />
                      <div className="muted small"><a href={href(`/t/${m.topicId}`)}>{t?.topic.title}</a></div>
                    </div>
                    <button className="btn small ghost" onClick={() => clearMistake(m.id)} title="Remove from list">Remove</button>
                  </div>
                );
              })}
            </div>
          </Section>
        );
      })}
    </div>
  );
}
