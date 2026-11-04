import { SubjectMark } from '../components/SubjectMark';
import { getSubject, visibleUnits } from '../content/registry';
import { go, href } from '../lib/router';
import { useProfile, useProgress } from '../lib/store';
import { level, mastery } from '../lib/engine';
import { recommendations, subjectStats } from '../lib/insights';
import { Empty, LevelBadge, ProgressBar, Section, Tabs } from '../components/ui';
import { Markdown } from '../components/Markdown';
import { TOOL_INFO } from './Tools';
import { specCoverage } from '../lib/coverage';

type Tab = 'overview' | 'topics' | 'spec' | 'practice' | 'exam' | 'tools' | 'revise' | 'stuck';

export function SubjectPage({ id, tab }: { id: string; tab: string }) {
  const subject = getSubject(id);
  const profile = useProfile();
  const progress = useProgress();
  if (!subject) return <Empty title="Subject not found"><a href="#/">Go home</a></Empty>;
  const units = visibleUnits(subject, profile);
  const stats = subjectStats(subject, profile, progress);
  const recs = recommendations(profile, progress, 4, subject.id);
  const now = Date.now();
  const t = (tab as Tab) || 'overview';

  return (
    <div className="page" style={{ ['--subj' as string]: subject.color }}>
      <div className="subject-hero">
        <a className="small" href="#/">← Home</a>
        <div className="hero-title"><SubjectMark subject={subject} size="lg" /><h1>{subject.name}</h1></div>
        <p className="muted">{subject.qualification}</p>
        <div className="row gap wrap">
          <div className="grow"><ProgressBar value={stats.mastery} color={subject.color} /></div>
          <span className="small">{Math.round(stats.mastery * 100)}% mastery · {stats.started}/{stats.topics.length} topics</span>
        </div>
      </div>

      <Tabs<Tab>
        value={t}
        onChange={(v) => go(`/s/${id}`, { tab: v })}
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'topics', label: 'Topics' },
          { id: 'spec', label: 'Spec checklist' },
          { id: 'practice', label: 'Practice' },
          { id: 'exam', label: 'Exam questions' },
          { id: 'tools', label: 'Toolkit' },
          { id: 'revise', label: 'How to revise' },
          { id: 'stuck', label: 'Stuck?' },
        ]}
      />

      {t === 'overview' && (
        <>
          {recs.length > 0 && (
            <Section title="Do this next">
              <div className="rec-list">
                {recs.map((r) => (
                  <a key={r.topic.id} className="rec"
                    href={r.action === 'learn' ? href(`/t/${r.topic.id}`) : href('/quiz', { scope: 'topic', id: r.topic.id, n: 8 })}>
                    <span className="rec-body">
                      <span className="rec-title">{r.topic.title}</span>
                      <span className="muted small">{r.reason}</span>
                    </span>
                    <span className="rec-action small">{r.action === 'learn' ? 'Learn' : 'Practise'}</span>
                  </a>
                ))}
              </div>
            </Section>
          )}
          {subject.examNews?.length ? (
            <Section title={`Exam facts for ${profile.examYear}`}>
              <ul className="facts">{subject.examNews.map((n, i) => <li key={i}><Markdown text={n} inline /></li>)}</ul>
            </Section>
          ) : null}
          {subject.boardNote && <div className="callout callout-tip"><Markdown text={subject.boardNote} /></div>}
          <Section title="Your exams">
            <div className="papers">
              {subject.papers.map((p) => (
                <details key={p.name} className="paper">
                  <summary>
                    <strong>{p.name}</strong>
                    <span className="muted small"> · {p.time} · {typeof p.marks === 'number' ? `${p.marks} marks` : p.marks} · {p.weight}</span>
                  </summary>
                  <p>{p.content}</p>
                  {p.sections && (
                    <table className="table">
                      <tbody>{p.sections.map((s) => <tr key={s.label}><th>{s.label}</th><td><Markdown text={s.detail} inline /></td></tr>)}</tbody>
                    </table>
                  )}
                </details>
              ))}
            </div>
          </Section>
          <Section title="Mastery map">
            <div className="heat">
              {stats.topics.map((tp) => (
                <a key={tp.id} href={href(`/t/${tp.id}`)} className={`heat-cell lvl-${level(progress.topics[tp.id], now)}`} title={`${tp.title}: ${Math.round(mastery(progress.topics[tp.id], now) * 100)}%`}>
                  <span>{tp.title}</span>
                </a>
              ))}
            </div>
            <p className="muted small">Grey = not started · red = needs work · amber = developing · light green = secure · green = mastered.</p>
          </Section>
        </>
      )}

      {t === 'topics' && (
        <div>
          {units.map((u) => (
            <Section key={u.id} title={u.title} right={<a className="small" href={href('/quiz', { scope: 'unit', id: u.id, n: 12 })}>Quiz this unit →</a>}>
              {u.description && <p className="muted small">{u.description}</p>}
              <div className="topic-list">
                {u.topics.map((tp) => {
                  const ts = progress.topics[tp.id];
                  return (
                    <div key={tp.id} className="topic-row">
                      <a className="topic-main" href={href(`/t/${tp.id}`)}>
                        <span className="topic-title">{tp.title} {tp.tier === 'H' && <span className="pill pill-info">Higher</span>}</span>
                        <span className="muted small">{tp.summary}</span>
                      </a>
                      <div className="topic-side">
                        <LevelBadge level={level(ts, now)} />
                        <a className="btn small" href={href('/quiz', { scope: 'topic', id: tp.id, n: 8 })}>Quiz</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>
          ))}
          {!profile.showAllOptions && subject.optionGroups?.length ? (
            <p className="muted small">Showing your chosen options only. <a href="#/setup">Change options</a></p>
          ) : null}
        </div>
      )}

      {t === 'practice' && (
        <div className="practice-grid">
          <a className="cta primary" href={href('/quiz', { scope: 'subject', id, n: 15 })}>
            <span className="cta-title">Adaptive quiz</span>
            <span className="cta-sub">Questions get harder as you get them right, and easier with support when you're stuck.</span>
          </a>
          <a className="cta" href={href('/sprint', { subject: id })}>
            <span className="cta-title">90-second sprint</span>
            <span className="cta-sub">Quick-fire recall on topics you've met. Builds speed for the exam.</span>
          </a>
          <a className="cta" href={href('/quiz', { scope: 'weak', id, n: 12 })}>
            <span className="cta-title">Target my weak spots</span>
            <span className="cta-sub">Only topics rated "Needs work" or "Developing".</span>
          </a>
          <a className="cta" href={href('/quiz', { scope: 'mixed', id, n: 20 })}>
            <span className="cta-title">Mixed review (interleaved)</span>
            <span className="cta-sub">Jumps between topics – harder, but proven to make learning stick and mirrors the real exam.</span>
          </a>
          <a className="cta" href={href('/cards', { scope: 'subject', id })}>
            <span className="cta-title">Flashcards ({stats.dueCards} due)</span>
            <span className="cta-sub">Key terms, facts, quotes and formulas with spaced repetition.</span>
          </a>
          <a className="cta" href={href('/quiz', { scope: 'mistakes', id, n: 20 })}>
            <span className="cta-title">Fix my mistakes ({stats.mistakes})</span>
            <span className="cta-sub">Retry everything you've got wrong in {subject.short}.</span>
          </a>
          <a className="cta" href={href('/quiz', { scope: 'subject', id, n: 10, timed: 1 })}>
            <span className="cta-title">Speed round</span>
            <span className="cta-sub">10 questions against the clock – builds fast recall for the exam.</span>
          </a>
          {units.some((u) => u.topics.some((tp) => tp.generators?.length)) && (
            <a className="cta" href={href('/quiz', { scope: 'subject', id, n: 20, gen: 1 })}>
              <span className="cta-title">Unlimited calculation practice</span>
              <span className="cta-sub">Freshly generated numbers every time, with full worked solutions.</span>
            </a>
          )}
        </div>
      )}

      {t === 'exam' && (
        <div>
          <p className="muted">Write a full answer, then mark it yourself against the mark scheme and a model answer. This is the closest thing to the real exam – do some every week.</p>
          {units.map((u) => {
            const qs = u.topics.flatMap((tp) => (tp.examQuestions ?? []).map((q, i) => ({ tp, q, i })));
            if (!qs.length) return null;
            return (
              <Section key={u.id} title={u.title}>
                <div className="exam-list">
                  {qs.map(({ tp, q, i }) => {
                    const done = progress.essays[`${tp.id}~${i}`];
                    return (
                      <a key={`${tp.id}-${i}`} className="exam-item" href={href('/exam', { topic: tp.id, i })}>
                        <span className="exam-marks">{q.marks}</span>
                        <span className="exam-q"><Markdown text={q.q.split('\n')[0]} inline /></span>
                        {done?.score !== undefined && <span className="pill pill-good">{done.score}/{done.max}</span>}
                      </a>
                    );
                  })}
                </div>
              </Section>
            );
          })}
        </div>
      )}

      {t === 'spec' && <SpecChecklist subjectId={id} />}

      {t === 'tools' && (
        <div className="practice-grid">
          {[...(['maths', 'statistics', 'physics', 'chemistry', 'biology', 'business'].includes(subject.id) ? ['calculator'] : []), ...(['chemistry', 'physics', 'biology'].includes(subject.id) ? ['periodic'] : []), ...(subject.tools ?? []), 'glossary', 'timer'].map((tool) => {
            const info = TOOL_INFO[tool];
            if (!info) return null;
            return (
              <a key={tool} className="cta" href={href(`/tools/${tool}`, { subject: id })}>
                <span className="cta-title">{info.title}</span>
                <span className="cta-sub">{info.desc}</span>
              </a>
            );
          })}
        </div>
      )}

      {t === 'revise' && (
        <div>
          <p className="muted">Research-backed ways to revise <strong>{subject.name}</strong>. The app is built around these – but knowing why they work helps you use them.</p>
          {subject.strategies.map((s) => (
            <div key={s.title} className="strategy">
              <h3>{s.title}</h3>
              <p className="muted"><Markdown text={s.why} inline /></p>
              <ul>{s.how.map((h, i) => <li key={i}><Markdown text={h} inline /></li>)}</ul>
            </div>
          ))}
        </div>
      )}

      {t === 'stuck' && (
        <div>
          <p className="muted">Everyone gets stuck. Here's what to do in {subject.name}. Inside any question, press <strong>"I'm stuck"</strong> for hints, a worked example and another explanation.</p>
          {subject.stuck.map((s) => (
            <details key={s.problem} className="stuck-tip" open>
              <summary>{s.problem}</summary>
              <ul>{s.fixes.map((f, i) => <li key={i}><Markdown text={f} inline /></li>)}</ul>
            </details>
          ))}
          {subject.commandWords?.length ? (
            <Section title="Command words – what the question is really asking">
              <table className="table">
                <tbody>{subject.commandWords.map((c) => <tr key={c.word}><th>{c.word}</th><td><Markdown text={c.meaning} inline /></td></tr>)}</tbody>
              </table>
            </Section>
          ) : null}
        </div>
      )}
    </div>
  );
}

const STATUS_LABEL = { new: 'Not started', started: 'In progress', weak: 'Needs work', secure: 'Secure' } as const;

function SpecChecklist({ subjectId }: { subjectId: string }) {
  const profile = useProfile();
  const progress = useProgress();
  const subject = getSubject(subjectId)!;
  const cov = specCoverage(subject, profile, progress);
  return (
    <div>
      <div className="cov-head card pad">
        <div>
          <p className="eyebrow">{cov.name}</p>
          <p className="cov-line"><span className="mono">{cov.started}/{cov.total}</span> specification points practised · <span className="mono">{cov.secure}</span> secure</p>
          <p className="muted small">Every point on the specification for your options is listed here and linked to the lessons that teach it. Work down the list until everything is green – then nothing in the exam is a surprise.</p>
        </div>
        <div className="cov-bars" aria-hidden="true">
          <div className="cov-bar"><span style={{ width: `${(cov.secure / Math.max(1, cov.total)) * 100}%` }} className="sec" /><span style={{ width: `${((cov.started - cov.secure) / Math.max(1, cov.total)) * 100}%` }} className="prog" /></div>
          <div className="cov-legend small muted"><span><i className="dot sec" /> Secure</span><span><i className="dot prog" /> Practised</span><span><i className="dot" /> Not started</span></div>
        </div>
      </div>
      {cov.sections.map((sec) => (
        <Section key={sec.title} title={sec.title} right={<span className="small muted mono">{sec.points.filter((p) => p.status !== 'new').length}/{sec.points.length}</span>}>
          <div className="list spec-list">
            {sec.points.map((p) => (
              <a key={p.code + p.title} className={`list-row spec-row st-${p.status}`} href={p.status === 'new' ? href(`/t/${p.topics[0]}`) : href('/quiz', { scope: 'topic', id: p.topics.find((x) => (progress.topics[x]?.n ?? 0) === 0) ?? p.topics[0], n: 8 })}>
                <span className="spec-code mono small">{p.code}</span>
                <span className="grow">
                  <span className="block">{p.title}{p.tier === 'H' && <span className="pill pill-info spec-tier">Higher</span>}</span>
                </span>
                <span className={`spec-status small st-${p.status}`}>{STATUS_LABEL[p.status]}</span>
              </a>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
