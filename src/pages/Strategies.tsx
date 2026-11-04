import { GENERAL_STRATEGIES } from '../content/strategies';
import { activeSubjects } from '../content/registry';
import { useProfile } from '../lib/store';
import { href } from '../lib/router';
import { Section } from '../components/ui';

export function StrategiesPage() {
  const profile = useProfile();
  return (
    <div className="page narrow">
      <h1>How to revise effectively</h1>
      <p className="muted">
        These are the learning strategies with the strongest evidence from cognitive science. The whole app is built around them -
        here's what they are, why they work and how to use them.
      </p>
      {GENERAL_STRATEGIES.map((s) => (
        <div key={s.title} className="strategy">
          <h2>{s.title}</h2>
          <p>{s.what}</p>
          <ul>{s.how.map((h, i) => <li key={i}>{h}</li>)}</ul>
          <p className="muted small"><strong>The evidence:</strong> {s.evidence}</p>
          <p className="small"><strong>In this app:</strong> {s.inApp}</p>
        </div>
      ))}
      <Section title="Subject-specific advice">
        <div className="chips wrap">
          {activeSubjects(profile).map((s) => (
            <a key={s.id} className="chip" href={href(`/s/${s.id}`, { tab: 'revise' })}>{s.icon} {s.name}</a>
          ))}
        </div>
      </Section>
      <Section title="A great weekly routine">
        <ol>
          <li><strong>Daily (20-40 min):</strong> due flashcards → a smart session → one Fix-it round.</li>
          <li><strong>Each new topic:</strong> read the lesson → quiz immediately → flashcards → blurt the next day.</li>
          <li><strong>Weekly:</strong> one exam-style question per subject, self-marked against the mark scheme.</li>
          <li><strong>Every few weeks:</strong> rebuild your plan and look at your mastery map for red topics.</li>
          <li><strong>From Easter of Year 11:</strong> full timed past papers from your exam board's website.</li>
        </ol>
        <p className="muted small">Need help using the app? <a href="#/help">Read the guide</a>.</p>
      </Section>
    </div>
  );
}
