// Built-in tutor: answers from the app's own content, free and offline. No AI involved.
import type { ExamQuestion, QItem, Topic } from '../content/types';
import { getSubject, topicQuestions } from '../content/registry';
import { checkNumber, checkText } from './answer';
import { answerText, type TutorContext } from './tutor';
import { keywordCheck } from './marking';

const STOP = new Set('the a an and or of to in on for with is are was were be been this that these those it its as at by from into than then there their they them what which who whom whose when where why how do does did can could should would will your you my me i we our not no yes about also just very more most some any each other such only own same so too give tell explain help please question answer'.split(' '));
const words = (s: string) => s.toLowerCase().replace(/[*_`>#|]/g, ' ').match(/[a-z][a-z'-]{2,}|\d+(?:\.\d+)?/g)?.filter((w) => !STOP.has(w)) ?? [];

/** Split lesson notes into short readable chunks (bullets, sentences, table rows) */
function chunks(md: string): string[] {
  return md
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l && !/^\|?\s*:?-{3,}/.test(l) && !/^#{1,6}\s/.test(l) && !/^:::/.test(l))
    .map((l) => (l.startsWith('|') ? l.split('|').map((c) => c.trim()).filter((c) => c && !/^[✓✗x-]$/.test(c)).join(' – ') : l))
    .flatMap((l) => (l.length > 260 ? l.split(/(?<=[.!?])\s+/) : [l]))
    .filter((l) => l.length > 20);
}

/** Find the most relevant lines from the topic (and the rest of the subject's flashcards) for a typed question */
function retrieve(query: string, topic: Topic | undefined, subjectId: string, n = 3): string[] {
  const q = words(query);
  if (!q.length) return [];
  const stem = (w: string) => (w.length > 5 ? w.slice(0, w.length - 1) : w);
  const score = (text: string) => {
    const t = text.toLowerCase();
    const s = q.reduce((a, w) => a + (t.includes(stem(w)) ? (w.length > 6 ? 2 : 1) : 0), 0);
    // prefer lines that explain or define something, not ones that only list it
    const explains = /\b(is|are|means|where|site of|function|used to|used for|because|so that|causes?|makes?|releases?|controls?)\b/.test(t) ? 1 : 0;
    return s > 0 ? s + explains : 0;
  };
  const frontHit = (front: string) => q.some((w) => front.toLowerCase().includes(stem(w)));
  const pool: { text: string; s: number }[] = [];
  if (topic) {
    for (const c of chunks(topic.notes)) pool.push({ text: c, s: score(c) * 1.2 });
    for (const k of topic.keyPoints) pool.push({ text: k, s: score(k) * 1.3 });
    for (const f of topic.flashcards) pool.push({ text: `**${f.front.replace(/\n+/g, ' ')}** ${f.back}`, s: score(f.front + ' ' + f.back) * (frontHit(f.front) ? 1.8 : 1.1) });
    for (const m of topic.misconceptions ?? []) pool.push({ text: `Common mistake: ${m.wrong} – actually, ${m.right}`, s: score(m.wrong + ' ' + m.right) });
  }
  const subject = getSubject(subjectId);
  for (const u of subject?.units ?? []) for (const t of u.topics) {
    if (t === topic) continue;
    for (const f of t.flashcards) { const s = score(f.front + ' ' + f.back) * (frontHit(f.front) ? 1.2 : 0.8); if (s > 0) pool.push({ text: `**${f.front.replace(/\n+/g, ' ')}** ${f.back}`, s }); }
  }
  for (const w of subject?.commandWords ?? []) { const s = score(w.word + ' ' + w.meaning) * 1.2; if (s > 0) pool.push({ text: `**${w.word}**: ${w.meaning}`, s }); }
  const best = pool.filter((p) => p.s >= Math.min(2, q.length)).sort((a, b) => b.s - a.s);
  const out: string[] = [];
  for (const b of best) {
    if (out.length >= n) break;
    if (!out.some((o) => o === b.text)) out.push(b.text.replace(/^[-*]\s+/, ''));
  }
  return out;
}

/** Key terms from the topic's flashcards that appear in the question - with their meanings */
function termsIn(text: string, topic?: Topic): string[] {
  if (!topic) return [];
  const t = text.toLowerCase();
  return topic.flashcards
    .filter((f) => f.front.length <= 40 && !/[?]/.test(f.front) && t.includes(f.front.toLowerCase().replace(/[*_]/g, '')))
    .slice(0, 3)
    .map((f) => `**${f.front}**: ${f.back}`);
}

const TYPE_HELP: Record<QItem['type'], string> = {
  mcq: 'Choose the **one** option that is correct.',
  multi: 'Choose **every** option that is correct – there may be more than one.',
  tf: 'Decide whether the statement is **true or false**.',
  num: 'Work out a **number** and type it in (check the units it asks for).',
  text: 'Type a **short answer** – usually the exact key term.',
  order: 'Put the items in the **correct order**.',
  match: 'Match each item on the left with **one** on the right.',
  cloze: 'Fill each **gap** with the missing word.',
  sort: 'Put each item into the **group** it belongs to.',
  select: 'Tap the **words in the passage** that the question asks for.',
  spot: 'One line of the working is **wrong** – find it.',
};

interface Practice { item: QItem }
const practiceByKey = new Map<string, Practice>();

function pickPractice(item: QItem): QItem | undefined {
  const pool = topicQuestions(item.topicId).filter((q) => q.id !== item.id && ['mcq', 'tf', 'num', 'text'].includes(q.type) && !q.ctx);
  if (!pool.length) return undefined;
  const easier = pool.filter((q) => q.d <= item.d);
  const list = easier.length ? easier : pool;
  return list[Math.floor(Math.random() * list.length)];
}

function practiceText(q: QItem): string {
  if (q.type === 'mcq') return `${q.q}\n\n${q.options.map((o, i) => `**${String.fromCharCode(65 + i)}.** ${o}`).join('  \n')}\n\n*Reply with the letter.*`;
  if (q.type === 'tf') return `True or false? ${q.q}\n\n*Reply true or false.*`;
  if (q.type === 'num') return `${q.q}${q.unit ? ` (in ${q.unit})` : ''}\n\n*Reply with your number.*`;
  return 'q' in q && q.q ? `${q.q}\n\n*Reply with your answer.*` : '';
}

function markPractice(q: QItem, reply: string): string {
  const r = reply.trim();
  let ok = false;
  if (q.type === 'mcq') {
    const letter = r.match(/^\(?([a-d])\)?\b/i)?.[1];
    ok = letter ? letter.toUpperCase().charCodeAt(0) - 65 === q.answer : checkText(r, [q.options[q.answer]]).ok;
  } else if (q.type === 'tf') ok = /^(t|true|yes)\b/i.test(r) === q.answer && /^(t|true|yes|f|false|no)\b/i.test(r);
  else if (q.type === 'num') ok = checkNumber(r, q.answer, q.tol).ok;
  else if (q.type === 'text') ok = checkText(r, q.accept).ok;
  const ans = q.type === 'mcq' ? `${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}` : answerText(q);
  return `${ok ? '**Correct.**' : `**Not quite.** The answer is **${ans}**.`}\n\n${q.why}`;
}

export function offlineReply(c: NonNullable<TutorContext>, prompt: string, step: number): string {
  if (c.kind === 'exam') return examReply(c.eq, c.topic, c.subjectId, c.draft, prompt);
  const it = c.item;
  const topic = c.topic;
  const p = prompt.toLowerCase();

  // finishing a practice question the tutor set
  const pending = practiceByKey.get(c.key);
  if (pending && !/similar|another|one to try|clue|hint/.test(p)) {
    practiceByKey.delete(c.key);
    return markPractice(pending.item, prompt);
  }
  if (/similar|another one|one to try|practice|try one/.test(p)) {
    const q = pickPractice(it);
    if (!q) return 'There are no more short questions on this topic right now – try the **Practise** tab for this topic.';
    practiceByKey.set(c.key, { item: q });
    return `Try this one:\n\n${practiceText(q)}`;
  }

  if (!c.answered) {
    if (/clue|hint|stuck|help me start|nudge/.test(p)) {
      const ladder = [
        ...(it.hints ?? []),
        ...(it.type === 'num' || it.type === 'text' ? (it.steps ?? []).slice(0, 1).map((s) => `First step: ${s}`) : []),
        ...(topic?.keyPoints ?? []).slice(0, 3).map((k) => `Remember: ${k}`),
      ];
      return ladder.length ? `**Clue ${Math.min(step + 1, ladder.length)}:** ${ladder[Math.min(step, ladder.length - 1)]}${step + 1 < ladder.length ? '\n\n*Ask for another clue if you need one.*' : '\n\n*That was the last clue – have a go!*'}` : 'Rule out anything you know is wrong first, then look at what is left.';
    }
    if (/asking|mean|understand|what do i|what should/.test(p)) {
      const qtext = 'q' in it && it.q ? it.q : it.type === 'cloze' ? it.text : '';
      const terms = termsIn(qtext, topic);
      return [`${TYPE_HELP[it.type]}`, terms.length ? `Key words in the question:\n${terms.map((t) => `- ${t}`).join('\n')}` : '', topic ? `This question is about **${topic.title}**.` : ''].filter(Boolean).join('\n\n');
    }
    if (/method|formula|how do|first step|start|steps/.test(p)) {
      if ((it.type === 'num' || it.type === 'text') && it.steps?.length) return `**First step:** ${it.steps[0]}\n\n*Ask "how do I start" again after you've done this step.*`;
      const ex = topic?.workedExamples?.[0];
      if (ex) return `Here's the method on a different example – **${ex.title}**:\n\n${ex.problem}\n\n${ex.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    }
    if (/simpl|another way|explain|topic|don.?t get|confus/.test(p)) {
      if (topic?.simpler) return topic.simpler;
      if (topic) return `**${topic.title} – the key points:**\n${topic.keyPoints.slice(0, 5).map((k) => `- ${k}`).join('\n')}`;
    }
    if (/analys|quote|technique|effect/.test(p)) {
      return 'Try **What – How – Why**:\n- **What** is the writer showing or suggesting?\n- **How** – which word or technique creates it? Zoom in on one word.\n- **Why** – what effect on the reader, and what is the writer\'s purpose or context?';
    }
  } else {
    if (/simpl|another way/.test(p) && topic?.simpler) return topic.simpler;
    if (/my (answer|mistake|thinking)|where (my|i) went wrong|why (is|was) (that|this|it|my answer) (right|wrong|the answer)|explain (the|my) (answer|mistake)|why.*\b(right|wrong)\b\??$/.test(p) || !p.trim()) {
      const mis = topic?.misconceptions?.length ? `\n\n**Watch out:** ${topic.misconceptions[0].wrong} – actually, ${topic.misconceptions[0].right}` : '';
      const steps = (it.type === 'num' || it.type === 'text') && it.steps?.length ? `\n\n${it.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}` : '';
      return `${c.correct ? '**You got it right.** Here is why:' : `**The answer is ${answerText(it)}.**`}\n\n${it.why}${steps}${c.correct ? '' : mis}`;
    }
    if (/simpl|another way/.test(p) && topic?.simpler) return topic.simpler;
    if (/exam|marks|examined/.test(p) && topic?.examQuestions?.length) {
      const e = topic.examQuestions[0];
      return `A typical exam question on this topic (${e.marks} marks):\n\n${e.q.slice(0, 600)}\n\nMarks are given for:\n${e.markScheme.slice(0, 4).map((m) => `- ${m}`).join('\n')}`;
    }
  }

  // anything else: look it up in the notes and flashcards
  const found = retrieve(prompt, topic, it.subjectId);
  if (found.length) return `From your notes:\n\n${found.map((f) => `- ${f}`).join('\n')}`;
  return c.answered
    ? `**Answer:** ${answerText(it)}\n\n${it.why}`
    : 'I couldn\'t find that in this topic\'s notes. Try one of the buttons below, or ask about a key word in the question.';
}

function examReply(eq: ExamQuestion, topic: Topic, subjectId: string, draft: string, prompt: string): string {
  const p = prompt.toLowerCase();
  if (/plan|structure|start/.test(p)) {
    const g = eq.guidance?.length ? eq.guidance.map((x) => `- ${x}`).join('\n') : '';
    const rule = eq.marks >= 12 ? '- Aim for an introduction, 3-4 developed paragraphs and a judgement or conclusion.' : eq.marks >= 6 ? '- Aim for 2-3 developed points, each explained with a chain of reasoning.' : `- Aim for about ${eq.marks} clear points (roughly one per mark).`;
    return `**How to approach it (${eq.marks} marks, about ${Math.round(eq.time ?? Math.max(2, eq.marks * 1.2))} minutes)**\n${g ? g + '\n' : ''}${rule}`;
  }
  if (/top|full marks|examiner|mark scheme|what gets/.test(p)) return `**What earns the marks:**\n${eq.markScheme.map((m) => `- ${m}`).join('\n')}`;
  if (/command|word/.test(p)) {
    const first = eq.q.replace(/[*_]/g, '').match(/\b(Describe|Explain|Evaluate|Compare|Analyse|Justify|Assess|Calculate|Discuss|Identify|State|Outline|Suggest|How far|To what extent|Give|Write|Work out|Solve)\b/i)?.[1];
    const cw = getSubject(subjectId)?.commandWords?.find((w) => first && w.word.toLowerCase() === first.toLowerCase());
    return first ? `The command word is **${first}**.${cw ? ` ${cw.meaning}` : ''}` : 'Look for the command word at the start of the question (describe, explain, evaluate…) – it tells you what kind of answer to write.';
  }
  if (/feedback|check|mark|so far|improve/.test(p)) {
    if (!draft.trim()) return 'Write some of your answer first, then ask again and I\'ll check it against the mark scheme.';
    const r = keywordCheck(eq, draft);
    const met = r.points.filter((x) => x.likely);
    const missing = r.points.filter((x) => !x.likely && x.terms.length);
    return [
      met.length ? `**Looks covered:**\n${met.slice(0, 5).map((x) => `- ${x.text}`).join('\n')}` : '',
      missing.length ? `**Not found yet – think about adding:**\n${missing.slice(0, 4).map((x) => `- ${x.text}`).join('\n')}` : '',
      '*This is a key-word check, not a real mark. Read the mark scheme to be sure.*',
    ].filter(Boolean).join('\n\n');
  }
  const found = retrieve(prompt, topic, subjectId);
  return found.length ? `From your notes:\n\n${found.map((f) => `- ${f}`).join('\n')}` : 'Try one of the buttons below: planning, what gets top marks, the command word, or feedback on what you have written.';
}
