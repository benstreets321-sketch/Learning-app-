// Mock exam cards for Today and subject pages. Loaded separately so the (large) mock papers don't slow the
// first screen; the card appears a moment after the page.
import { papersFor, getTest } from '../content/mocks';
import { getSubject } from '../content/registry';
import { href } from '../lib/router';
import { useProfile, useProgress } from '../lib/store';
import { Section } from './ui';
import { Icon } from './Icon';

export function HomeMocks() {
  const profile = useProfile();
  const progress = useProgress();
  return (
    <>
      {(() => {
        // mock exams: resume an unfinished paper, else suggest the paper you have practised least
        const papers = papersFor(profile);
        if (!papers.length) return null;
        const all = Object.values(progress.mocks ?? {}).flat();
        const open = all.filter((a) => a.status === 'in-progress').sort((a, b) => b.started - a.started)[0];
        const openTest = open ? getTest(open.testId) : undefined;
        const tried = (id: string) => all.filter((a) => a.testId.startsWith(`${id}-t`) && a.status !== 'in-progress').length;
        const next = [...papers].sort((a, b) => tried(a.id) - tried(b.id))[0];
        const last = all.filter((a) => a.status !== 'in-progress').sort((a, b) => (b.finished ?? 0) - (a.finished ?? 0))[0];
        const lastTest = last ? getTest(last.testId) : undefined;
        return (
          <Section title="Mock exams" right={<a className="small" href="#/mocks">All papers</a>}>
            <div className="list">
              {openTest && open && (
                <a className="list-row" href={href(`/mock/${open.testId}`, { a: open.id })}>
                  <Icon name="clock" size={18} />
                  <span className="grow"><strong className="small">Resume: {openTest.paper.title}</strong><span className="muted small"> · {openTest.test.title}</span></span>
                  <span className="btn small primary">Resume</span>
                </a>
              )}
              {lastTest && last && (
                <a className="list-row" href={href(`/mock/${last.testId}`, { review: last.id })}>
                  <Icon name="check" size={18} />
                  <span className="grow small">Last result: {lastTest.paper.title} – <span className="mono">{last.score ?? 0}/{last.max}</span>{last.status === 'submitted' ? ' · finish marking your written answers' : ''}</span>
                  <span className="small">Review</span>
                </a>
              )}
              {next && (
                <a className="list-row" href={href(`/mocks/${next.id}`)}>
                  <Icon name="target" size={18} />
                  <span className="grow"><strong className="small">{next.title}</strong><span className="muted small mono"> · {next.mins} min · {next.marks} marks</span></span>
                  <span className="btn small">Try test</span>
                </a>
              )}
            </div>
          </Section>
        );
      })()}

    </>
  );
}

export function SubjectMocks({ subjectId }: { subjectId: string }) {
  const profile = useProfile();
  const progress = useProgress();
  const subject = getSubject(subjectId)!;
  return (
    <>
          {papersFor(profile, subject.id).length > 0 && (
            <Section title="Mock exams" right={<a className="small" href={href('/mocks')}>All mock exams</a>}>
              <p className="muted small" style={{ marginTop: 0 }}>Three full practice papers for each exam, timed and with only the equipment you are allowed. Marked against the mark scheme when you submit.</p>
              <div className="list">
                {papersFor(profile, subject.id).map((p) => {
                  // attempts are stored by test id ("<paper>-t1"...), so no need to build the tests themselves
                  const done = Object.entries(progress.mocks ?? {}).filter(([k]) => k.startsWith(`${p.id}-t`)).flatMap(([, v]) => v).filter((a) => a.status !== 'in-progress');
                  const best = done.reduce((m, a) => Math.max(m, (a.score ?? 0) / Math.max(1, a.max)), -1);
                  return (
                    <a key={p.id} className="list-row" href={href(`/mocks/${p.id}`)}>
                      <span className="grow"><strong className="small">{p.title}</strong><span className="muted small mono"> · {p.mins} min · {p.marks} marks</span></span>
                      {best >= 0 && <span className="mono small">best {Math.round(best * 100)}%</span>}
                      <span className="btn small primary">Try test</span>
                    </a>
                  );
                })}
              </div>
            </Section>
          )}
    </>
  );
}
