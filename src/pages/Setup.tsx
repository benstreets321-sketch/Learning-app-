import { useRef, useState } from 'react';
import { SUBJECTS } from '../content/registry';
import { go } from '../lib/router';
import { exportData, importData, resetAll, updateProfile, useProfile } from '../lib/store';
import { Section } from '../components/ui';

const TIERED = ['maths', 'biology', 'chemistry', 'physics', 'statistics'];

export function Setup({ firstRun }: { firstRun: boolean }) {
  const profile = useProfile();
  const [msg, setMsg] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleSubject = (id: string) => {
    const has = profile.subjects.includes(id);
    updateProfile({ subjects: has ? profile.subjects.filter((s) => s !== id) : [...profile.subjects, id] });
  };

  const setOption = (group: string, value: string) => updateProfile({ options: { ...profile.options, [group]: value } });
  const toggleMulti = (group: string, value: string) => {
    const cur = profile.multiOptions[group] ?? [];
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    updateProfile({ multiOptions: { ...profile.multiOptions, [group]: next } });
  };

  return (
    <div className="page narrow">
      {firstRun ? (
        <div className="hero">
          <div>
            <h1>Let's set up your revision</h1>
            <p className="muted">
              Tell me your exam year, subjects, tiers and the set texts/options your school chose. Everything adapts to this -
              you only see what can come up in <em>your</em> exams. You can change it any time in Settings.
            </p>
          </div>
        </div>
      ) : (
        <h1>Settings</h1>
      )}

      <Section title="About you">
        <div className="form-grid">
          <label>
            First name (optional)
            <input value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} placeholder="e.g. Sam" />
          </label>
          <label>
            I sit my GCSEs in
            <select
              value={profile.examYear}
              onChange={(e) => {
                const y = Number(e.target.value) as 2027 | 2028;
                updateProfile({ examYear: y, firstExam: y === 2027 ? '2027-05-10' : '2028-05-11' });
              }}
            >
              <option value={2027}>Summer 2027 (Year 11 now)</option>
              <option value={2028}>Summer 2028 (Year 10 now)</option>
            </select>
          </label>
          <label>
            Date of my first exam
            <input type="date" value={profile.firstExam} onChange={(e) => updateProfile({ firstExam: e.target.value })} />
            <span className="muted small">Estimated - update it when your school shares the timetable.</span>
          </label>
          <label>
            Daily goal (minutes)
            <input type="number" min={5} max={240} value={profile.dailyGoal} onChange={(e) => updateProfile({ dailyGoal: Math.max(5, Number(e.target.value) || 30) })} />
          </label>
          <label>
            Theme
            <select value={profile.theme} onChange={(e) => updateProfile({ theme: e.target.value as 'auto' | 'light' | 'dark' })}>
              <option value="auto">Match my device</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
      </Section>

      <Section title="My subjects">
        <div className="subject-pick">
          {SUBJECTS.map((s) => (
            <label key={s.id} className={`pick ${profile.subjects.includes(s.id) ? 'on' : ''}`} style={{ ['--subj' as string]: s.color }}>
              <input type="checkbox" checked={profile.subjects.includes(s.id)} onChange={() => toggleSubject(s.id)} />
              <span>{s.icon} {s.name}</span>
              <span className="muted small">{s.qualification}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Tiers">
        <p className="muted small">Higher tier shows grade 4-9 content including the hardest topics. Foundation hides higher-only topics (grades 1-5). Not sure? Ask your teacher - choose Higher if you're aiming for a 6+.</p>
        <div className="form-grid">
          {TIERED.filter((id) => profile.subjects.includes(id)).map((id) => (
            <label key={id}>
              {SUBJECTS.find((s) => s.id === id)?.name}
              <select value={profile.tiers[id] ?? 'H'} onChange={(e) => updateProfile({ tiers: { ...profile.tiers, [id]: e.target.value as 'F' | 'H' } })}>
                <option value="H">Higher</option>
                <option value="F">Foundation</option>
              </select>
            </label>
          ))}
        </div>
      </Section>

      {SUBJECTS.filter((s) => profile.subjects.includes(s.id) && s.optionGroups?.length).map((s) => (
        <Section key={s.id} title={`${s.name}: your options`}>
          {s.optionGroups!.map((g) => {
            const isMulti = g.id.endsWith('-units');
            return (
              <div key={g.id} className="opt-group">
                <div className="opt-label">{g.label}</div>
                {g.help && <p className="muted small">{g.help}</p>}
                <div className="chips wrap">
                  {g.choices.map((c) => {
                    const on = isMulti ? (profile.multiOptions[g.id] ?? []).includes(c.value) : profile.options[g.id] === c.value;
                    return (
                      <button key={c.value} className={`chip ${on ? 'on' : ''}`} onClick={() => (isMulti ? toggleMulti(g.id, c.value) : setOption(g.id, c.value))}>
                        {c.label}{c.deep === false ? ' (overview)' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Section>
      ))}

      <Section title="Show everything?">
        <label className="row gap">
          <input type="checkbox" checked={profile.showAllOptions} onChange={(e) => updateProfile({ showAllOptions: e.target.checked })} />
          <span>Show all set texts and options, not just mine (useful if you haven't been told yet).</span>
        </label>
      </Section>

      {firstRun ? (
        <div className="row end">
          <button className="btn primary big" onClick={() => { updateProfile({ onboarded: true }); go('/'); }}>Start revising →</button>
        </div>
      ) : (
        <Section title="Your data">
          <p className="muted small">Progress is saved on this device only. Export a backup to move it to another device.</p>
          <div className="row gap wrap">
            <button className="btn" onClick={() => {
              const blob = new Blob([exportData()], { type: 'application/json' });
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = `gcse-revision-backup-${new Date().toISOString().slice(0, 10)}.json`;
              a.click();
              URL.revokeObjectURL(a.href);
            }}>Export backup</button>
            <button className="btn" onClick={() => fileRef.current?.click()}>Import backup</button>
            <input ref={fileRef} type="file" accept="application/json" hidden onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setMsg(importData(await f.text()) ? 'Backup restored.' : 'That file is not a valid backup.');
            }} />
            <button className="btn" onClick={async () => {
              try { await navigator.clipboard.writeText(exportData()); setMsg('Backup copied - paste it somewhere safe (e.g. a note or email to yourself).'); }
              catch { setMsg('Copying was blocked by your browser - use Export backup instead.'); }
            }}>Copy backup</button>
            {!confirmReset ? (
              <button className="btn danger" onClick={() => setConfirmReset(true)}>Reset everything</button>
            ) : (
              <span className="row gap">
                <span className="small">Delete ALL progress and settings on this device?</span>
                <button className="btn danger" onClick={() => { resetAll(); setConfirmReset(false); go('/setup'); }}>Yes, delete</button>
                <button className="btn ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
              </span>
            )}
          </div>
          {msg && <p className="small">{msg}</p>}
        </Section>
      )}
    </div>
  );
}
