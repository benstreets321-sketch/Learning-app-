// Per-topic generators built from a topic's own timeline and quotations (History dates and events; Literature
// quotations, scenes, themes and plot order). Wrong options come from the same unit - other events of the same
// period, other speakers and scenes from the same text - so they are always plausible.
import type { Generator, GeneratedQuestion, Quote, TimelineEvent } from '../types';
import { mcq, numQ, pick } from './facts-kit';
import { shuffle } from '../../lib/util';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const yearOf = (d: string) => { const m = /\b(1\d{3}|20\d{2})\b/.exec(d); return m ? Number(m[1]) : null; };
/** sortable key for a date such as "1919", "Feb 1945" or "1577-80" (null if not a real date) */
export const dateKey = (d: string): number | null => {
  const y = yearOf(d);
  if (y === null) return null;
  const m = MONTHS.findIndex((x) => d.toLowerCase().includes(x));
  return y * 12 + (m >= 0 ? m : 0);
};
const clip = (s: string, n = 110) => (s.length > n ? `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : s);

export interface UnitEvent extends TimelineEvent { topicId: string; idx: number }
export interface UnitQuote extends Quote { topicId: string }

/** History: dates and order of events */
export function timelineGenerator(id: string, title: string, own: UnitEvent[], unit: UnitEvent[]): Generator | null {
  const dated = unit.filter((e) => dateKey(e.date) !== null);
  const mine = own.filter((e) => dateKey(e.date) !== null);
  const distinctDates = new Set(dated.map((e) => e.date));
  if (mine.length < 2 || distinctDates.size < 4) return null;
  return {
    id, title,
    make: (rand, lvl): GeneratedQuestion => {
      const e = pick(rand, mine);
      const k = dateKey(e.date)!;
      const near = (x: UnitEvent) => Math.abs(dateKey(x.date)! - k);
      const others = shuffle(dated, rand).filter((x) => x.date !== e.date).sort((a, b) => near(a) - near(b));
      const t = rand();
      if (t < 0.35) {
        if (lvl >= 4 && /^\d{4}$/.test(e.date.trim())) return numQ(`In which year: **${e.event}**?`, Number(e.date), [`${e.date}: ${e.event}`], 3);
        return mcq(rand, `When did this happen? **${e.event}**`, e.date, [...new Set(others.map((x) => x.date))], [`${e.date}: ${e.event}`, ...others.slice(0, 3).map((x) => `${x.date}: ${x.event}`)], 2);
      }
      if (t < 0.65) {
        // four events with different years; which came first / last?
        // events of a similar length, so the answer can't be spotted as the longest one
        const picks: UnitEvent[] = [e];
        const similar = (x: UnitEvent) => x.event.length <= e.event.length * 1.4 + 4 && e.event.length <= x.event.length * 1.4 + 4;
        for (const pass of [true, false]) {
          for (const x of shuffle(dated, rand)) {
            if (picks.length === 4) break;
            if ((!pass || similar(x)) && !picks.includes(x) && picks.every((p) => yearOf(p.date) !== yearOf(x.date))) picks.push(x);
          }
        }
        if (picks.length < 3) return mcq(rand, `When did this happen? **${e.event}**`, e.date, [...new Set(others.map((x) => x.date))], [`${e.date}: ${e.event}`], 2);
        const first = rand() < 0.6;
        const sorted = [...picks].sort((a, b) => dateKey(a.date)! - dateKey(b.date)!);
        const ans = first ? sorted[0] : sorted[sorted.length - 1];
        return mcq(rand, `Which of these happened **${first ? 'first' : 'last'}**?`, ans.event, picks.filter((p) => p !== ans).map((p) => p.event), sorted.map((p) => `**${p.date}**: ${p.event}`), 3);
      }
      return mcq(rand, `Which of these happened in **${e.date}**?`, e.event, others.filter((x) => yearOf(x.date) !== yearOf(e.date)).map((x) => x.event), [`${e.date}: ${e.event}`, ...others.slice(0, 3).map((x) => `${x.date}: ${x.event}`)], 2);
    },
  };
}

/** Literature plot: where events happen and in what order (dates are scenes/staves/chapters, kept in authored order) */
export function plotGenerator(id: string, title: string, own: UnitEvent[], text: string): Generator | null {
  const places = [...new Set(own.map((e) => e.date))];
  if (own.length < 4 || places.length < 4) return null;
  return {
    id, title,
    make: (rand): GeneratedQuestion => {
      if (rand() < 0.5) {
        const e = pick(rand, own);
        const i = places.indexOf(e.date);
        const near = places.filter((p) => p !== e.date).sort((a, b) => Math.abs(places.indexOf(a) - i) - Math.abs(places.indexOf(b) - i));
        return mcq(rand, `Where in *${text}* does this happen? **${e.event}**`, e.date, near, [`${e.date}: ${e.event}`], 2);
      }
      // four events from different scenes, of similar length so the answer can't be spotted as the longest
      const order = shuffle(own, rand);
      const seed = order[0];
      const similar = (x: UnitEvent) => x.event.length <= seed.event.length * 1.4 + 4 && seed.event.length <= x.event.length * 1.4 + 4;
      const picks: UnitEvent[] = [seed];
      for (const pass of [true, false]) {
        for (const x of order) {
          if (picks.length === 4) break;
          if ((!pass || similar(x)) && !picks.includes(x) && picks.every((p) => p.date !== x.date)) picks.push(x);
        }
      }
      const sorted = [...picks].sort((a, b) => a.idx - b.idx);
      const first = rand() < 0.6;
      const ans = first ? sorted[0] : sorted[sorted.length - 1];
      return mcq(rand, `In *${text}*, which of these happens **${first ? 'first' : 'last'}**?`, ans.event, picks.filter((p) => p !== ans).map((p) => p.event), sorted.map((p) => `**${p.date}**: ${p.event}`), 3);
    },
  };
}

/** Literature quotations: where they come from, which theme they show, which one a character says */
export function quoteGenerator(id: string, title: string, own: UnitQuote[], unit: UnitQuote[], text: string, poetry = false): Generator | null {
  const speakers = [...new Set(unit.map((q) => q.who).filter((w): w is string => !!w))];
  const wheres = [...new Set(unit.map((q) => q.where).filter((w): w is string => !!w))];
  const themes = [...new Set(unit.flatMap((q) => q.themes ?? []))];
  if (own.length < 2 || (speakers.length < 4 && wheres.length < 4 && themes.length < 5)) return null;
  return {
    id, title,
    make: (rand): GeneratedQuestion => {
      const q = pick(rand, own);
      const kinds = [
        q.where && wheres.length >= 4 ? 'where' : '',
        q.themes?.length && themes.length >= 5 ? 'theme' : '',
        q.who && speakers.length >= 4 && unit.filter((u) => u.who && u.who !== q.who).length >= 3 ? 'which' : '',
        q.who && speakers.length >= 4 ? 'who' : '',
      ].filter(Boolean);
      const kind = pick(rand, kinds.length ? kinds : ['who']);
      const why = [`“${q.text}”${q.who ? ` – ${q.who}` : ''}${q.where ? `, ${q.where}` : ''}`, q.analysis];
      if (kind === 'where') {
        const near = wheres.filter((w) => w !== q.where && !unit.some((u) => u.text === q.text && u.where === w));
        return mcq(rand, `Where in *${text}* does this quotation come from?\n\n> “${q.text}”`, q.where!, shuffle(near, rand), why, 3);
      }
      if (kind === 'theme') {
        const wrong = themes.filter((t) => !(q.themes ?? []).includes(t));
        return mcq(rand, `Which theme is this quotation most often used to explore?\n\n> “${q.text}”${q.who ? ` (${q.who})` : ''}`, q.themes![0], shuffle(wrong, rand), why, 3);
      }
      if (kind === 'which') {
        const wrong = shuffle(unit.filter((u) => u.who && u.who !== q.who && u.text !== q.text), rand).map((u) => `“${clip(u.text)}”`);
        return mcq(rand, poetry ? `Which of these lines is from **${q.who}**?` : `Which of these quotations is spoken by (or describes) **${q.who}**?`, `“${clip(q.text)}”`, wrong, why, 2);
      }
      return mcq(rand, poetry ? `Which poem is this line from?\n\n> “${q.text}”` : `Who says this?\n\n> “${q.text}”`, q.who!, shuffle(speakers.filter((s) => s !== q.who), rand), why, 2);
    },
  };
}
