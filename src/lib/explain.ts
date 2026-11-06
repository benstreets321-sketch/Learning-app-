// "Explain why" follow-ups: after some answers the student says WHY in a sentence. Saying the reason is one of the
// strongest ways to make learning stick (self-explanation). The reply is checked offline against the key ideas in
// the question's own explanation.
const STOP = new Set('about above after again against also although always among another answer answers because been before being below between both cannot could does doing down during each either enough even ever every from have having here into itself just like made make makes many more most much must never only other over same should since some such than that their them then there these they this those through thus under until upon very what when where whether which while whole will with within without would your yours correct right wrong option options question means mean meaning used uses using called'.split(' '));

const stem = (w: string) => w.replace(/(ies|es|s|ing|ed|ly)$/, '').replace(/e$/, '');
const words = (s: string) => (s.toLowerCase().replace(/[*_`>#]/g, ' ').match(/[a-z][a-z'-]{2,}/g) ?? []).filter((w) => w.length >= 4 && !STOP.has(w));

/** The key ideas: content words from the explanation and the right answer that aren't just repeated from the question */
export function keyIdeas(why: string, answer: string, question: string): string[] {
  const inQ = new Set(words(question).map(stem));
  const seen = new Set<string>();
  const out: string[] = [];
  for (const w of [...words(answer), ...words(why)]) {
    const s = stem(w);
    if (inQ.has(s) || seen.has(s)) continue;
    seen.add(s);
    out.push(w);
  }
  return out.slice(0, 10);
}

export interface ExplainResult { good: boolean; hit: string[]; missed: string[] }

export function checkExplanation(reply: string, why: string, answer: string, question: string): ExplainResult {
  const ideas = keyIdeas(why, answer, question);
  const said = new Set(words(reply).map(stem));
  const hit = ideas.filter((w) => said.has(stem(w)));
  const missed = ideas.filter((w) => !said.has(stem(w))).slice(0, 4);
  const need = Math.max(1, Math.min(3, Math.ceil(ideas.length * 0.3)));
  const long = words(reply).length >= 3;
  return { good: long && hit.length >= need, hit, missed };
}
