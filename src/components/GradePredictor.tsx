// Predicted grades with ranges, target grades and the gap analysis ("where the marks are").
import { useState } from 'react';
import { activeSubjects } from '../content/registry';
import { gapTopics, gradeAt, predictSubject, rangeText, shortGrade, type Prediction } from '../lib/predict';
import { firstPaperDate, forecast } from '../lib/daily';
import { updateProfile, useProfile, useProgress } from '../lib/store';
import { href } from '../lib/router';
import { SubjectMark } from './SubjectMark';
import { ProgressBar } from './ui';

export function GradePredictor({ only }: { only?: string }) {
  const profile = useProfile();
  const progress = useProgress();
  const subjects = activeSubjects(profile).filter((s) => !only || s.id === only);
  const preds = subjects.map((s) => predictSubject(s, profile, progress));
  const [open, setOpen] = useState<string | null>(only ?? null);
  const setTarget = (id: string, g: string) => updateProfile({ targets: { ...profile.targets, [id]: g } });
  return (
    <div className="grade-table">
      {preds.map((p) => (
        <div key={p.subject.id} className="grade-row-card">
          <div className="grade-line">
            <span className="row gap grade-subj"><SubjectMark subject={p.subject} size="sm" /> {p.subject.short}</span>
            <span className="grade-pred" title={`About ${Math.round(p.pct)}% of the marks if you sat it today`}>
              <span className="muted small">Predicted</span> {p.ready ? <strong className="mono">{rangeText(p)}</strong> : <span className="small muted">after ~20 answers</span>}
            </span>
            <label className="grade-target small">
              <span className="muted">Target</span>
              <select value={p.target ?? ''} onChange={(e) => setTarget(p.subject.id, e.target.value)} aria-label={`Target grade for ${p.subject.name}`}>
                <option value="">–</option>
                {p.scale.labels.slice(1).map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
            <span className={`small grade-gap ${p.target && p.ready ? (p.gap ? 'behind' : 'ok') : ''}`}>{p.target && p.ready ? (p.gap ? `${Math.ceil(p.gap)}% to go` : 'On track') : ''}</span>
            {!only && <button className="btn link small" onClick={() => setOpen(open === p.subject.id ? null : p.subject.id)} aria-expanded={open === p.subject.id}>{open === p.subject.id ? 'Hide' : 'Where the marks are'}</button>}
          </div>
          {p.ready && <ProgressBar value={p.pct / 100} color={p.subject.color} label={`${p.subject.name} predicted percentage`} />}
          <p className="muted small evidence">{evidence(p)}</p>
          {p.ready && <Trend p={p} hist={progress.predHist?.[p.subject.id]} exam={firstPaperDate(profile, p.subject.id)} />}
          {open === p.subject.id && <Gaps p={p} />}
        </div>
      ))}
      <p className="muted small">Predictions use your topic mastery and any marked mock papers, with approximate grade boundaries from recent years (real boundaries change every year). The range narrows as you answer more questions and take more mocks. Your target grade steers your sessions and lessons towards the topics that add the most marks.</p>
    </div>
  );
}

/** The predicted percentage over time, the target line, and where the current trend leads by exam day */
function Trend({ p, hist, exam }: { p: Prediction; hist?: [number, number][]; exam?: string }) {
  const f = forecast(hist, exam);
  const pts = (hist ?? []).slice(-90);
  const ti = p.target ? p.scale.labels.indexOf(p.target) : -1;
  const targetPct = ti > 0 ? p.scale.mins[ti] : undefined;
  const W = 220, H = 44;
  const d0 = pts[0]?.[0] ?? 0, d1 = pts[pts.length - 1]?.[0] ?? 1;
  const x = (d: number) => (pts.length > 1 ? ((d - d0) / Math.max(1, d1 - d0)) * (W - 4) + 2 : W / 2);
  const y = (v: number) => H - 3 - (v / 100) * (H - 6);
  const examDay = exam ? new Date(`${exam}T09:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  return (
    <div className="trend">
      {pts.length > 1 && (
        <svg viewBox={`0 0 ${W} ${H}`} className="trend-svg" role="img" aria-label={`Predicted percentage over the last ${pts.length} days, from ${Math.round(pts[0][1])}% to ${Math.round(pts[pts.length - 1][1])}%`}>
          {targetPct !== undefined && <line x1={0} x2={W} y1={y(targetPct)} y2={y(targetPct)} className="trend-target" />}
          <polyline points={pts.map(([d, v]) => `${x(d)},${y(v)}`).join(' ')} className="trend-line" style={{ stroke: p.subject.color }} />
          <circle cx={x(d1)} cy={y(pts[pts.length - 1][1])} r={2.8} style={{ fill: p.subject.color }} />
        </svg>
      )}
      <span className="small muted">
        {f
          ? <>Trend: {f.perWeek >= 0 ? '+' : ''}{f.perWeek.toFixed(1)}% a week. If it continues: about <strong>{shortGrade(gradeAt(p.scale, f.pct))}</strong> by your first paper{examDay ? ` (${examDay})` : ''}{targetPct !== undefined ? (f.pct >= targetPct ? ' – on course for your target.' : ' – not yet enough for your target; the session is steering towards the gap.') : '.'}</>
          : pts.length > 1 ? 'A forecast appears after a week or two of practice.' : 'Your trend starts from today.'}
      </span>
    </div>
  );
}

function evidence(p: Prediction): string {
  const bits = [`${Math.round(p.coverage * 100)}% of topics started`, `${p.answers} answer${p.answers === 1 ? '' : 's'}`];
  if (p.mocks) bits.push(`${p.mocks} marked mock${p.mocks === 1 ? '' : 's'}`);
  if (!p.ready) return `Not enough to go on yet (${bits.join(', ')}). Answer about 20 questions or take a mock and a predicted grade appears here.`;
  return `If you sat it today: about ${Math.round(p.pct)}% → ${shortGrade(p.grade)}. Based on ${bits.join(', ')}.${p.confidence < 0.35 ? ' Early days – the range narrows as you answer more.' : ''}`;
}

function Gaps({ p }: { p: Prediction }) {
  const profile = useProfile();
  const progress = useProgress();
  const gaps = gapTopics(p.subject, profile, progress, 5);
  if (!gaps.length) return <p className="small">Every topic is at the level your target needs – keep them fresh with your sessions.</p>;
  return (
    <div className="gaps">
      <p className="small"><strong>Where the marks are{p.target ? ` for a ${shortGrade(p.target)}` : ''}:</strong> raising these topics adds the most to your percentage. Your sessions already favour them.</p>
      <div className="list">
        {gaps.map((g) => (
          <a key={g.topic.id} className="list-row" href={href('/learn', { topic: g.topic.id, _: Date.now() })}>
            <span className="grow">
              <span className="block">{g.topic.title}</span>
              <span className="muted small">{g.why}</span>
            </span>
            <span className="mono small">+{g.gain < 1 ? g.gain.toFixed(1) : Math.round(g.gain)}%</span>
          </a>
        ))}
      </div>
    </div>
  );
}
