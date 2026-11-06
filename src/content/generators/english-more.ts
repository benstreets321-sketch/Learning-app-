// English Language technical accuracy (AO6) and the Spoken Language endorsement: homophones in context, commonly
// misspelt words (with the misspellings students really make), apostrophes, sentence punctuation and sentence types.
import type { Generator, GeneratedQuestion } from '../types';
import { mcq } from './facts-kit';
import { pk } from './helpers';
import { shuffle } from '../../lib/util';

const G = (id: string, title: string, make: Generator['make']): Generator => ({ id, title, make });

// [sentence with ___, right word, confusables, why]
const HOMOPHONES: [string, string, string[], string][] = [
  ['The students left ___ bags in the hall.', 'their', ['there', "they're"], '"their" = belonging to them.'],
  ['Put the box over ___, by the door.', 'there', ['their', "they're"], '"there" = a place.'],
  ['___ going to be late if the bus doesn\'t come.', "They're", ['Their', 'There'], '"they\'re" = they are.'],
  ['The dog wagged ___ tail.', 'its', ["it's", "its'"], '"its" (no apostrophe) = belonging to it.'],
  ['___ been raining all morning.', "It's", ['Its', "Its'"], '"it\'s" = it is / it has.'],
  ['Is this ___ coat on the chair?', 'your', ["you're", 'yore'], '"your" = belonging to you.'],
  ['___ going to love this film.', "You're", ['Your', 'Yore'], '"you\'re" = you are.'],
  ['The soup was ___ hot to eat.', 'too', ['to', 'two'], '"too" = excessively (or also).'],
  ['We walked ___ the shop.', 'to', ['too', 'two'], '"to" = towards (or part of a verb, "to run").'],
  ['The weather will ___ the match.', 'affect', ['effect', 'affects'], '"affect" is usually the verb (to influence).'],
  ['The new rule had a big ___ on the school.', 'effect', ['affect', 'affects'], '"effect" is usually the noun (a result).'],
  ['I need to ___ the piano every day.', 'practise', ['practice', 'practising'], 'In UK English, "practise" is the verb and "practice" is the noun.'],
  ['Football ___ is on Tuesday.', 'practice', ['practise', 'practised'], 'In UK English, "practice" is the noun and "practise" is the verb.'],
  ['___ did you leave your phone?', 'Where', ['Were', 'Wear'], '"where" asks about a place.'],
  ['They ___ late for the lesson.', 'were', ['where', 'wear'], '"were" is the past tense of "are".'],
  ['Don\'t ___ your ticket!', 'lose', ['loose', 'lost'], '"lose" = misplace or not win; "loose" = not tight.'],
  ['The screw on the shelf was ___.', 'loose', ['lose', 'loosen'], '"loose" = not tight.'],
  ['I should ___ revised for the test.', 'have', ['of', 'off'], '"should have" (or "should\'ve") - never "should of".'],
  ['She is taller ___ her brother.', 'than', ['then', 'that'], '"than" compares; "then" is about time.'],
  ['We ate, and ___ we went home.', 'then', ['than', 'them'], '"then" = next, after that.'],
  ['___ bag is this?', 'Whose', ["Who's", 'Who'], '"whose" = belonging to whom.'],
  ['___ coming to the party?', "Who's", ['Whose', 'Who'], '"who\'s" = who is / who has.'],
  ['I will ___ the invitation.', 'accept', ['except', 'accepted'], '"accept" = agree to receive.'],
  ['Everyone came ___ Sam.', 'except', ['accept', 'expect'], '"except" = apart from.'],
  ['The car was ___ outside the station.', 'stationary', ['stationery', 'station'], '"stationary" = not moving; "stationery" = paper, pens and so on.'],
  ['She bought pens and other ___.', 'stationery', ['stationary', 'station'], '"stationery" (with e for envelopes) = writing materials.'],
  ['I could ___ the music from upstairs.', 'hear', ['here', 'heard'], '"hear" has "ear" in it.'],
  ['Come over ___ and sit down.', 'here', ['hear', 'hare'], '"here" = this place.'],
  ['The ___ of the story is to be kind.', 'moral', ['morale', 'mortal'], '"moral" = a lesson; "morale" = confidence and spirit.'],
];

// [correct spelling, common misspellings]
const SPELLINGS: [string, string[]][] = [
  ['definitely', ['definately', 'definitly', 'defiantly']],
  ['separate', ['seperate', 'separete', 'seprate']],
  ['necessary', ['neccessary', 'necesary', 'neccesary']],
  ['accommodation', ['accomodation', 'acommodation', 'accommadation']],
  ['embarrass', ['embarass', 'embaress', 'embarras']],
  ['occurred', ['occured', 'ocurred', 'occurrd']],
  ['rhythm', ['rythm', 'rhythem', 'rhytm']],
  ['conscience', ['concience', 'consience', 'conscence']],
  ['beginning', ['begining', 'beggining', 'beginnning']],
  ['argument', ['arguement', 'argumant', 'arguemant']],
  ['believe', ['beleive', 'belive', 'beleave']],
  ['receive', ['recieve', 'receeve', 'recive']],
  ['government', ['goverment', 'govenment', 'governmant']],
  ['environment', ['enviroment', 'enviornment', 'envirnoment']],
  ['disappear', ['dissapear', 'disapear', 'dissappear']],
  ['disappoint', ['dissapoint', 'disapoint', 'dissappoint']],
  ['tomorrow', ['tommorow', 'tomorow', 'tommorrow']],
  ['until', ['untill', 'untile', 'unntil']],
  ['successful', ['succesful', 'successfull', 'sucessful']],
  ['immediately', ['immediatly', 'imediately', 'immediatley']],
  ['knowledge', ['knowlege', 'knowledgde', 'knoweldge']],
  ['library', ['libary', 'liberary', 'librery']],
  ['February', ['Febuary', 'Feburary', 'Februery']],
  ['restaurant', ['restaraunt', 'resturant', 'restuarant']],
  ['surprise', ['suprise', 'surprize', 'surpise']],
  ['weird', ['wierd', 'weerd', 'weired']],
  ['achieve', ['acheive', 'achive', 'acheeve']],
  ['experience', ['experiance', 'expereince', 'experence']],
  ['persuade', ['persuede', 'pursuade', 'perswade']],
  ['opportunity', ['oppurtunity', 'opportunaty', 'oportunity']],
  ['sincerely', ['sincerly', 'sincerley', 'sinceerly']],
  ['particularly', ['particulary', 'particularily', 'particuarly']],
  ['atmosphere', ['atmousphere', 'atmosfere', 'atmospere']],
  ['business', ['buisness', 'busness', 'bussiness']],
  ['independent', ['independant', 'indipendent', 'independint']],
];

function homophoneQ(rand: () => number): GeneratedQuestion {
  const [sent, ans, wrong, why] = pk(rand, HOMOPHONES);
  const capFirst = sent.startsWith('___');
  const opts = wrong.map((w) => (capFirst ? w.charAt(0).toUpperCase() + w.slice(1) : w));
  return mcq(rand, `Which word correctly fills the gap?\n\n> ${sent}`, ans, opts, [why, `✓ ${sent.replace('___', ans)}`], 1, ['Say the sentence with each option. Can you expand it (they\'re → they are; it\'s → it is)?']);
}

function spellingQ(rand: () => number): GeneratedQuestion {
  const [right, wrongs] = pk(rand, SPELLINGS);
  if (rand() < 0.6) return mcq(rand, 'Which word is **spelt correctly**?', right, shuffle(wrongs, rand), [`The correct spelling is **${right}**.`, 'Learn tricky words with a trick: "separate" has "a rat" in it; "definitely" has "finite" in it; "necessary" has one collar (c) and two sleeves (ss).'], 2);
  const bad = pk(rand, wrongs);
  return { q: `This word is spelt **wrongly**: **${bad}**. Type the correct spelling.`, answer: right, accept: [right], exact: true, steps: [`Correct: **${right}**.`, 'Spelling counts towards AO6 in both Paper 1 and Paper 2 writing.'], d: 2 };
}

// [sentence options (first is correct), why]
const PUNCT: [string[], string][] = [
  [["The children's toys were everywhere.", "The childrens' toys were everywhere.", 'The childrens toys were everywhere.', "The children's' toys were everywhere."], '"Children" is already plural, so add \'s: children\'s.'],
  [["The two girls' bikes were stolen.", "The two girl's bikes were stolen.", 'The two girls bikes were stolen.', "The two girls's bikes were stolen."], 'Plural ending in s: put the apostrophe after the s (girls\').'],
  [["My brother's phone is broken.", "My brothers' phone is broken.", 'My brothers phone is broken.', "My brother's' phone is broken."], 'One brother owns it: brother\'s.'],
  [['It was late; she ran home.', 'It was late, she ran home.', 'It was late she ran home.', 'It was late: and she ran home.'], 'A comma cannot join two full sentences (a comma splice). A semicolon can.'],
  [['You need three things: a pen, a ruler and a calculator.', 'You need three things; a pen, a ruler and a calculator.', 'You need three things, a pen; a ruler; and a calculator.', 'You need: three things a pen, a ruler and a calculator.'], 'A colon introduces a list after a complete sentence.'],
  [['Halfway up the hill, she stopped to rest.', 'Halfway up the hill she, stopped to rest.', 'Halfway, up the hill she stopped to rest.', 'Halfway up the hill; she stopped to rest.'], 'Use a comma after a fronted adverbial.'],
  [['Mara, who was fifteen, lived by the sea.', 'Mara who was fifteen, lived by the sea.', 'Mara, who was fifteen lived by the sea.', 'Mara who, was fifteen, lived by the sea.'], 'Extra information in the middle of a sentence needs a comma on both sides.'],
  [['"Where are you going?" asked Tom.', '"Where are you going"? asked Tom.', '"Where are you going?" Asked Tom.', '"Where are you going," asked Tom?'], 'The question mark goes inside the speech marks, and "asked" stays lower case.'],
  [["I can't come because it's raining.", "I ca'nt come because its raining.", "I cant come because it's raining.", "I can't come because its' raining."], 'Omission: can\'t (cannot), it\'s (it is).'],
];

const SENTENCE_TYPES: [string, string][] = [
  ['The rain fell.', 'simple'],
  ['She grabbed her coat and ran outside.', 'simple'],
  ['The rain fell, but we kept walking.', 'compound'],
  ['I was tired, so I went to bed.', 'compound'],
  ['Although it was raining, we kept walking.', 'complex'],
  ['The boy, who had lost his way, began to cry.', 'complex'],
  ['When the bell rang, everyone rushed out.', 'complex'],
  ['He wanted to go, yet he stayed.', 'compound'],
];

function punctuationQ(rand: () => number): GeneratedQuestion {
  const k = rand();
  if (k < 0.6) {
    const [opts, why] = pk(rand, PUNCT);
    return mcq(rand, 'Which sentence is **correctly punctuated**?', opts[0], opts.slice(1), [why, `✓ ${opts[0]}`], 2);
  }
  if (k < 0.85) {
    const [s, t] = pk(rand, SENTENCE_TYPES);
    return mcq(rand, `What type of sentence is this?\n\n> ${s}`, t, ['simple', 'compound', 'complex', 'minor'].filter((x) => x !== t), [t === 'simple' ? 'Simple: one main clause (one subject doing the action(s)).' : t === 'compound' ? 'Compound: two main clauses joined by and, but, or, so, yet (FANBOYS).' : 'Complex: a main clause plus a subordinate clause (although, when, because, who…).', 'Varying simple, compound and complex sentences helps the AO6 mark.'], 2);
  }
  const facts: [string, string, string[]][] = [
    ['When should you start a new paragraph in a story?', 'For a change of time, place, topic or person speaking', ['After every three sentences, so paragraphs stay short', 'Only when the page is full or you reach the bottom', 'Whenever you use a long or difficult new word']],
    ['What is a comma splice?', 'Two complete sentences joined with only a comma', ['A list of three or more items separated by commas', 'A comma used after a fronted adverbial phrase', 'A long sentence with no commas in it at all']],
    ['What is AO6 in English Language?', 'Vocabulary, sentence structures, spelling and punctuation in your writing', ['Comparing writers\' ideas and perspectives, and how they are conveyed', 'Analysing how writers use language and structure to create effects', 'Using spoken Standard English when giving a formal presentation']],
  ];
  const [q, a, w] = pk(rand, facts);
  return mcq(rand, q, a, w, [a + '.'], 1);
}

const SPOKEN: [string, string, string[]][] = [
  ['How is the Spoken Language endorsement graded?', 'Pass, Merit, Distinction (or Not classified)', ['Grades 9 to 1, like the written papers', 'A mark out of 40 added to Paper 2', 'Pass or Fail only']],
  ['Does the Spoken Language endorsement count towards your GCSE English Language grade?', 'No - it is reported separately, but you must complete it', ['Yes - it is worth 20% of the overall English Language grade', 'Yes - it replaces the writing section of Paper 2 (Section B)', 'No - and it is optional, so most students choose to skip it']],
  ['Which assessment objective is about using spoken Standard English?', 'AO9', ['AO7', 'AO8', 'AO6']],
  ['Which assessment objective is about responding to questions and feedback?', 'AO8', ['AO7', 'AO9', 'AO5']],
  ['Which assessment objective is about presentation skills in a formal setting?', 'AO7', ['AO8', 'AO9', 'AO5']],
  ['What is the best thing to speak from in your presentation?', 'Notes or cue cards', ['A full script, read out', 'Nothing - all memorised', 'Slides, read out exactly']],
  ['Who assesses the Spoken Language presentation?', 'Your teacher (some are filmed for moderation)', ['An external examiner visiting an exam centre', 'Other students in the class, by voting', 'Nobody - it is recorded but never assessed']],
  ['What helps most in getting a Distinction?', 'A well-structured, researched argument and confident answers to challenging questions', ['Speaking for as long as possible, even if some points are repeated, to show effort', 'Using lots of slang and informal phrases so that you sound relaxed and natural', 'Choosing a simple topic you only need to describe, and reading it from a script']],
];
function spokenQ(rand: () => number): GeneratedQuestion {
  const [q, a, w] = pk(rand, SPOKEN);
  return mcq(rand, q, a, shuffle(w, rand), [a + '.', 'AO7: presenting · AO8: listening and responding · AO9: spoken Standard English.'], 1);
}

export const ENGLISH_MORE_GENERATORS: Generator[] = [
  G('em-homophones', 'Homophones and commonly confused words', (r) => homophoneQ(r)),
  G('em-spelling', 'Commonly misspelt words', (r) => spellingQ(r)),
  G('em-punctuation', 'Punctuation and sentence types', (r) => punctuationQ(r)),
  G('em-spoken', 'Spoken Language endorsement', (r) => spokenQ(r)),
];

export const ENGLISH_MORE_TOPICS: Record<string, string[]> = {
  'el-spag': ['em-homophones', 'em-spelling', 'em-punctuation'],
  'el-p1q5': ['em-punctuation'],
  'el-p2q5': ['em-homophones'],
  'el-spoken': ['em-spoken'],
};
