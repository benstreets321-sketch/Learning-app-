// Generators for the shorter-coverage Literature texts (one overview topic each): who's who in the text, which
// text a character belongs to, which text matches a premise, writer and date. Wrong options are always other
// characters from the same text or other set texts from the same exam section, so nothing can be ruled out by look.
import type { Generator, GeneratedQuestion } from '../types';
import { mcq, pick, typed } from './facts-kit';
import { shuffle } from '../../lib/util';

type Group = 'shakespeare' | 'c19' | 'modern';
interface LitText {
  id: string;
  title: string;
  group: Group;
  writer: string;
  year: string;
  premise: string;
  cast: [name: string, role: string][];
  /** topics it practises (default: the text's overview topic) */
  topics?: string[];
}

const TEXTS: LitText[] = [
  {
    id: 'tempest', title: 'The Tempest', group: 'shakespeare', writer: 'William Shakespeare', year: 'c.1611',
    premise: 'An overthrown duke uses magic on a remote island to bring his enemies to him, then forgives them.',
    cast: [
      ['Prospero', 'the rightful Duke of Milan, who controls the island with magic'],
      ['Antonio', 'the brother who overthrew Prospero and plots against Alonso with Sebastian'],
      ['Alonso', 'the King of Naples, who helped overthrow Prospero'],
      ['Miranda', 'Prospero\'s daughter, who falls in love with Ferdinand'],
      ['Ariel', 'the spirit who serves Prospero in return for freedom'],
      ['Caliban', 'the son of Sycorax, enslaved by Prospero, who plots with two drunks'],
      ['Ferdinand', 'the King of Naples\'s son, who falls in love with Miranda'],
      ['Stephano', 'the drunken butler Caliban treats as a new master'],
      ['Sebastian', 'the King of Naples\'s brother, who plots to murder him'],
      ['Gonzalo', 'the kind old counsellor who gave Prospero his books'],
    ],
  },
  {
    id: 'merchant', title: 'The Merchant of Venice', group: 'shakespeare', writer: 'William Shakespeare', year: 'c.1597',
    premise: 'A moneylender demands a pound of flesh when a loan made to help a friend win an heiress cannot be repaid.',
    cast: [
      ['Bassanio', 'the young man who needs money to woo the heiress of Belmont'],
      ['Antonio', 'the merchant who borrows 3,000 ducats for his friend'],
      ['Shylock', 'the Jewish moneylender who demands a pound of flesh'],
      ['Portia', 'the rich heiress who disguises herself as a lawyer'],
      ['Jessica', 'the moneylender\'s daughter who elopes and takes his money'],
      ['Lorenzo', 'the Christian who elopes with Shylock\'s daughter'],
      ['Nerissa', 'Portia\'s waiting-woman, who marries Gratiano'],
      ['Gratiano', 'Bassanio\'s loud, joking friend who marries Nerissa'],
    ],
  },
  {
    id: 'muchado', title: 'Much Ado About Nothing', group: 'shakespeare', writer: 'William Shakespeare', year: 'c.1599',
    premise: 'Returning soldiers fall in love in Messina; a villain\'s trick leads to a bride being shamed at the altar.',
    cast: [
      ['Claudio', 'the young soldier who shames Hero at the altar'],
      ['Hero', 'the bride falsely accused of being unfaithful, who pretends to be dead'],
      ['Benedick', 'the soldier who wages a "merry war" of wit and swears never to marry'],
      ['Beatrice', 'Hero\'s witty cousin, who demands "Kill Claudio"'],
      ['Don Pedro', 'the prince who woos Hero on Claudio\'s behalf'],
      ['Don John', 'the villain who tricks Claudio into believing Hero is unfaithful'],
      ['Dogberry', 'the bumbling constable whose watchmen uncover the plot'],
      ['Leonato', 'the Governor of Messina and Hero\'s father'],
    ],
  },
  {
    id: 'caesar', title: 'Julius Caesar', group: 'shakespeare', writer: 'William Shakespeare', year: '1599',
    premise: 'Senators who fear one man will become king assassinate him, and civil war follows.',
    cast: [
      ['Julius Caesar', 'the leader assassinated at the Senate on the Ides of March'],
      ['Brutus', 'the honourable conspirator later called "the noblest Roman of them all"'],
      ['Cassius', 'the conspirator who manipulates Brutus into joining the plot'],
      ['Mark Antony', 'Caesar\'s loyal friend, whose funeral speech turns the crowd'],
      ['Calpurnia', 'Caesar\'s wife, who dreams of his death and begs him to stay home'],
      ['Casca', 'the conspirator who strikes the first blow'],
      ['Octavius', 'Caesar\'s heir, who fights the conspirators with Antony'],
    ],
  },
  {
    id: 'great-exp', title: 'Great Expectations', group: 'c19', writer: 'Charles Dickens', year: '1860-61',
    premise: 'An orphan from the Kent marshes is secretly funded to become a gentleman and grows ashamed of his past.',
    cast: [
      ['Pip', 'the orphan who receives "great expectations" and moves to London'],
      ['Joe Gargery', 'the kind blacksmith who raises Pip and later nurses him'],
      ['Magwitch', 'the escaped convict who turns out to be Pip\'s secret benefactor'],
      ['Miss Havisham', 'the jilted woman who still wears her wedding dress, with the clocks stopped'],
      ['Estella', 'the cold, beautiful girl raised to break men\'s hearts'],
      ['Mrs Joe', 'Pip\'s harsh older sister, who raises him "by hand"'],
      ['Herbert Pocket', 'Pip\'s cheerful friend and flatmate in London'],
      ['Jaggers', 'the powerful London lawyer who handles Pip\'s money'],
      ['Biddy', 'the kind, sensible village girl who later marries Joe'],
    ],
  },
  {
    id: 'jane-eyre', title: 'Jane Eyre', group: 'c19', writer: 'Charlotte Brontë', year: '1847',
    premise: 'An orphaned governess falls in love with her employer, then discovers he has a wife locked in the attic.',
    cast: [
      ['Jane Eyre', 'the orphaned narrator who becomes a governess'],
      ['Mrs Reed', 'the aunt who locks the young narrator in the red room'],
      ['Helen Burns', 'the patient friend at Lowood School who dies'],
      ['Mr Rochester', 'the master of Thornfield Hall'],
      ['Bertha Mason', 'the wife kept locked in the attic at Thornfield'],
      ['St John Rivers', 'the clergyman who proposes a loveless marriage'],
      ['Mr Brocklehurst', 'the harsh, hypocritical man who runs Lowood School'],
      ['Adèle', 'the young French girl who is the governess\'s pupil'],
    ],
  },
  {
    id: 'frankenstein', title: 'Frankenstein', group: 'c19', writer: 'Mary Shelley', year: '1818',
    premise: 'A scientist brings a body to life, abandons what he has made, and is destroyed by its revenge.',
    cast: [
      ['Victor Frankenstein', 'the scientist obsessed with discovering "the principle of life"'],
      ['The Creature', 'the being who teaches itself by watching a family through a wall'],
      ['William', 'the scientist\'s young brother, the first to be murdered'],
      ['Justine', 'the servant wrongly executed for a murder'],
      ['Clerval', 'the scientist\'s loyal best friend, murdered in Ireland'],
      ['Elizabeth Lavenza', 'the scientist\'s bride, killed on the wedding night'],
      ['Walton', 'the Arctic explorer whose letters frame the story'],
      ['De Lacey', 'the blind old man who is kind to the Creature'],
    ],
  },
  {
    id: 'pride', title: 'Pride and Prejudice', group: 'c19', writer: 'Jane Austen', year: '1813',
    premise: 'A sharp-witted second daughter misjudges a proud, rich gentleman, while her family needs good marriages.',
    cast: [
      ['Elizabeth Bennet', 'the witty second daughter who rejects two proposals'],
      ['Mr Darcy', 'the proud, wealthy gentleman whose letter changes everything'],
      ['Wickham', 'the charming officer who spreads lies and elopes with the youngest sister'],
      ['Jane Bennet', 'the gentle eldest daughter, who loves Bingley'],
      ['Mr Bingley', 'the friendly, rich young man who rents Netherfield'],
      ['Mr Collins', 'the pompous clergyman who will inherit the entailed estate'],
      ['Charlotte Lucas', 'the friend who marries for security, not love'],
      ['Lydia Bennet', 'the youngest daughter, whose elopement threatens the family'],
      ['Lady Catherine de Bourgh', 'Darcy\'s overbearing, aristocratic aunt'],
    ],
  },
  {
    id: 'sign-four', title: 'The Sign of Four', group: 'c19', writer: 'Arthur Conan Doyle', year: '1890',
    premise: 'A detective and his doctor friend track a stolen Indian treasure and a killer across London.',
    cast: [
      ['Sherlock Holmes', 'the detective who uses deduction (and cocaine when bored)'],
      ['Dr Watson', 'the narrator, who falls in love with the client'],
      ['Mary Morstan', 'the client who receives a pearl every year'],
      ['Thaddeus Sholto', 'the nervous man who reveals the secret of the treasure'],
      ['Bartholomew Sholto', 'the man found murdered by a poisoned dart'],
      ['Jonathan Small', 'the one-legged ex-soldier who feels the treasure was stolen from him'],
      ['Tonga', 'the islander who fires the poisoned darts'],
      ['Athelney Jones', 'the Scotland Yard detective who keeps arresting the wrong people'],
    ],
  },
  {
    id: 'dna', title: 'DNA', group: 'modern', writer: 'Dennis Kelly', year: '2008',
    premise: 'Teenagers who think they have killed a boy during bullying invent a suspect to cover it up.',
    cast: [
      ['Phil', 'the quiet, calculating leader who plans the cover-up'],
      ['Leah', 'the talkative conscience of the group, who questions human nature'],
      ['Cathy', 'the ruthless girl who enjoys the power and danger'],
      ['John Tate', 'the former leader who loses control of the group'],
      ['Brian', 'the boy who breaks down with guilt and is medicated'],
      ['Richard', 'the boy who desperately wants Phil\'s approval'],
      ['Adam', 'the bullied boy believed dead, found living in a hedge'],
      ['Danny', 'the boy worried about his future career as a dentist'],
    ],
  },
  {
    id: 'honey', title: 'A Taste of Honey', group: 'modern', writer: 'Shelagh Delaney', year: '1958',
    premise: 'A teenage girl and her careless mother share a run-down Salford flat; the girl is left pregnant and alone.',
    cast: [
      ['Jo', 'the teenage daughter left pregnant and alone'],
      ['Helen', 'the self-centred mother who leaves to marry a younger man'],
      ['Peter', 'the younger, wealthier, drunken man who marries the mother'],
      ['Jimmie', 'the Black sailor who is the father of the baby'],
      ['Geof', 'the gay art student who moves in and cares for the pregnant girl'],
    ],
  },
  {
    id: 'leave', title: 'Leave Taking', group: 'modern', writer: 'Winsome Pinnock', year: '1987',
    premise: 'A Windrush-generation mother in London clashes with her British-born daughters over identity.',
    cast: [
      ['Enid', 'the Windrush-generation mother who wants a better life for her daughters'],
      ['Del', 'the rebellious daughter who leaves home'],
      ['Viv', 'the studious daughter who carries her mother\'s hopes of education'],
      ['Mai', 'the obeah woman (spiritual healer) the family consults'],
      ['Brod', 'the mother\'s brother, who also lives in England'],
    ],
  },
  {
    id: 'princess', title: 'Princess & The Hustler', group: 'modern', writer: 'Chinonyerem Odimba', year: '2019',
    premise: 'A girl in 1963 Bristol dreams of a beauty pageant as her estranged father returns, during the Bus Boycott.',
    cast: [
      ['Princess', 'the young girl who dreams of winning a beauty pageant'],
      ['Mavis', 'the hard-working mother holding the family together'],
      ['The Hustler', 'the estranged father whose return throws the family into turmoil'],
    ],
  },
  {
    id: 'anita', title: 'Anita and Me', group: 'modern', writer: 'Meera Syal', year: '1996',
    premise: 'The only Punjabi girl in a 1970s mining village idolises an older, rebellious white girl.',
    cast: [
      ['Meena Kumar', 'the narrator, torn between her family\'s culture and village life'],
      ['Anita Rutter', 'the older, glamorous but cruel girl the narrator idolises'],
      ['Nanima', 'the grandmother whose visit helps the narrator value her heritage'],
      ['Sam Lowbridge', 'the young man who leads a racist attack'],
      ['Robert', 'the boy the narrator befriends in hospital'],
    ],
  },
  {
    id: 'pigeon', title: 'Pigeon English', group: 'modern', writer: 'Stephen Kelman', year: '2011',
    premise: 'An 11-year-old boy newly arrived from Ghana plays detective after a stabbing on his London estate.',
    cast: [
      ['Harri', 'the 11-year-old narrator newly arrived from Ghana'],
      ['Dean', 'the friend who plays detective using ideas from TV'],
      ['X-Fire', 'the leader of the Dell Farm Crew'],
      ['Miquita', 'the frightening girl connected to the gang'],
      ['Agnes', 'the baby sister still in Ghana with her father'],
      ['The pigeon', 'the bird that narrates short sections of the novel'],
    ],
  },
  {
    id: 'bb', title: 'Blood Brothers', group: 'modern', writer: 'Willy Russell', year: '1983', topics: ['bb-plot', 'bb-themes'],
    premise: 'Twins separated at birth grow up on opposite sides of the class divide in Liverpool, and both die.',
    cast: [
      ['Mrs Johnstone', 'the poor single mother who gives away one of her twins'],
      ['Mrs Lyons', 'the wealthy, childless woman who takes a baby and makes the mother swear on the Bible'],
      ['Mickey', 'the twin who stays with his birth mother and later goes to prison'],
      ['Eddie', 'the twin raised in wealth who goes to university and becomes a councillor'],
      ['Linda', 'the girl both twins love, who marries the poorer twin'],
      ['Sammy', 'the older brother who drags his younger brother into a robbery'],
      ['Mr Lyons', 'the businessman whose company makes workers redundant'],
      ['The Narrator', 'the figure who comments on the action and warns about superstition and the devil'],
    ],
  },
  {
    id: 'leon', title: 'My Name is Leon', group: 'modern', writer: 'Kit de Waal', year: '2016',
    premise: 'A mixed-race boy in care is separated from his white baby brother, who is adopted without him.',
    cast: [
      ['Leon', 'the 9-year-old mixed-race boy left behind in foster care'],
      ['Carol', 'the mother who cannot cope after the birth of her second son'],
      ['Jake', 'the white baby brother who is adopted'],
      ['Maureen', 'the kind foster carer who falls ill'],
      ['Sylvia', 'the foster carer\'s sister, who looks after Leon for a while'],
      ['Tufty', 'the Black man at the allotment who becomes a role model'],
      ['Mr Devlin', 'the Irish ex-soldier at the allotment'],
    ],
  },
];

// main set texts that can be wrong options, with their casts so a shared name never makes two options right
const MAIN: { title: string; group: Group; writer: string; year: string; names: string[] }[] = [
  { title: 'Macbeth', group: 'shakespeare', writer: 'William Shakespeare', year: 'c.1606', names: ['Macbeth', 'Banquo', 'Duncan', 'Malcolm', 'Macduff', 'Fleance', 'Ross', 'Lennox', 'Seyton', 'Hecate'] },
  { title: 'Romeo and Juliet', group: 'shakespeare', writer: 'William Shakespeare', year: 'c.1595', names: ['Romeo', 'Juliet', 'Mercutio', 'Tybalt', 'Benvolio', 'Nurse', 'Laurence', 'Capulet', 'Montague', 'Paris', 'Rosaline', 'Escalus'] },
  { title: 'A Christmas Carol', group: 'c19', writer: 'Charles Dickens', year: '1843', names: ['Scrooge', 'Marley', 'Fred', 'Fezziwig', 'Belle', 'Cratchit', 'Tim', 'Fan'] },
  { title: 'The Strange Case of Dr Jekyll and Mr Hyde', group: 'c19', writer: 'Robert Louis Stevenson', year: '1886', names: ['Jekyll', 'Hyde', 'Utterson', 'Enfield', 'Lanyon', 'Poole', 'Carew', 'Guest'] },
  { title: 'An Inspector Calls', group: 'modern', writer: 'J.B. Priestley', year: '1945', names: ['Birling', 'Sheila', 'Eric', 'Gerald', 'Croft', 'Eva', 'Edna', 'Goole'] },
  { title: 'Animal Farm', group: 'modern', writer: 'George Orwell', year: '1945', names: ['Napoleon', 'Snowball', 'Boxer', 'Squealer', 'Major', 'Benjamin', 'Clover', 'Mollie', 'Jones'] },
  { title: 'Lord of the Flies', group: 'modern', writer: 'William Golding', year: '1954', names: ['Ralph', 'Piggy', 'Jack', 'Simon', 'Roger', 'Sam', 'Eric', 'Percival'] },
];

const TITLE_WORDS = new Set(['mr', 'mrs', 'miss', 'dr', 'the', 'lady', 'don', 'de', 'st', 'sir']);
const words = (name: string) => name.toLowerCase().split(/[\s-]+/).filter((w) => !TITLE_WORDS.has(w));
// every name word -> how many texts use it
const NAME_USE = new Map<string, Set<string>>();
for (const t of TEXTS) for (const [n] of t.cast) for (const w of words(n)) NAME_USE.set(w, (NAME_USE.get(w) ?? new Set()).add(t.title));
for (const m of MAIN) for (const n of m.names) for (const w of words(n)) NAME_USE.set(w, (NAME_USE.get(w) ?? new Set()).add(m.title));
/** a name that belongs to exactly one text (so "which text is X in?" has one right answer) */
const distinctive = (name: string, title: string) => words(name).every((w) => [...(NAME_USE.get(w) ?? [])].every((t) => t === title));
const mentions = (text: string, name: string) => words(name).some((w) => new RegExp(`\\b${w}\\b`, 'i').test(text));

function textGenerator(t: LitText): Generator {
  const sameGroup = TEXTS.filter((x) => x.group === t.group && x !== t);
  const otherTitles = [...sameGroup.map((x) => x.title), ...MAIN.filter((m) => m.group === t.group).map((m) => m.title)];
  const writers = [...new Set([...sameGroup.map((x) => x.writer), ...MAIN.filter((m) => m.group === t.group).map((m) => m.writer)])].filter((w) => w !== t.writer);
  const years = [...sameGroup.map((x) => x.year), ...MAIN.filter((m) => m.group === t.group).map((m) => m.year)].filter((y) => y !== t.year);
  const bigCast = t.cast.length >= 4;
  return {
    id: `lo-${t.id}`,
    title: `${t.title}: characters, premise and context`,
    make: (rand, lvl): GeneratedQuestion => {
      const kinds = [
        ...(bigCast ? ['role', 'role', 'who', 'who'] : []),
        'which', 'premise',
        ...(t.group !== 'shakespeare' ? ['writer'] : []),
        ...(t.group !== 'shakespeare' ? ['year'] : []),
      ];
      const kind = pick(rand, kinds);
      const [name, role] = pick(rand, t.cast);
      const why = [`In *${t.title}* (${t.writer}, ${t.year}), **${name}** is ${role}.`];
      if (kind === 'role') {
        const q = `In *${t.title}*, which character is this?\n\n> ${role.charAt(0).toUpperCase()}${role.slice(1)}`;
        if (lvl >= 4) {
          // surname or first name alone is fine, unless another character in the text shares it
          const alt = words(name).filter((w) => w.length > 2 && t.cast.every(([n]) => n === name || !words(n).includes(w)));
          return typed(`${q}\n\nType the character's name.`, name, alt, why, 3);
        }
        const wrong = shuffle(t.cast.filter(([n]) => n !== name && !mentions(role, n)).map(([n]) => n), rand);
        return mcq(rand, q, name, wrong, why, 2);
      }
      if (kind === 'who') {
        const wrong = shuffle(t.cast.filter(([n, r]) => n !== name && !mentions(r, name)).map(([, r]) => r), rand);
        return mcq(rand, `In *${t.title}*, who is **${name}**?`, role, wrong, why, 2);
      }
      if (kind === 'which') {
        const named = t.cast.filter(([n]) => distinctive(n, t.title) && !mentions(t.title, n));
        if (named.length) {
          const [n, r] = pick(rand, named);
          return mcq(rand, `Which set text has a character called **${n}**?`, t.title, shuffle(otherTitles, rand), [`**${n}** is ${r} in *${t.title}* (${t.writer}).`], 1);
        }
      }
      if (kind === 'writer') {
        return mcq(rand, `Who wrote *${t.title}*?`, t.writer, shuffle(writers, rand), [`*${t.title}* was written by ${t.writer} (${t.year}).`], 1);
      }
      if (kind === 'year' && years.length >= 3) {
        const yk = (y: string) => Number(/\d{4}/.exec(y)?.[0] ?? 0);
        const near = [...new Set(years)].sort((a, b) => Math.abs(yk(a) - yk(t.year)) - Math.abs(yk(b) - yk(t.year)));
        return mcq(rand, `When was *${t.title}* first published or performed?`, t.year, near, [`*${t.title}*: ${t.writer}, ${t.year}.`, 'Knowing the date helps you link the text to its context.'], 2);
      }
      const wrong = shuffle(sameGroup.map((x) => x.title), rand);
      return mcq(rand, `Which set text has this premise?\n\n> ${t.premise}`, t.title, wrong.length >= 3 ? wrong : [...wrong, ...otherTitles], [`*${t.title}* (${t.writer}, ${t.year}): ${t.premise}`], 1);
    },
  };
}

// AQA "Telling Tales" anthology
const TALES: [story: string, writer: string, idea: string][] = [
  ['The Darkness Out There', 'Penelope Lively', 'Two teenagers helping an elderly woman learn she once let an enemy airman die.'],
  ['Chemistry', 'Graham Swift', 'A boy, his mother and grandfather; a new partner arrives, then grief and a toy boat.'],
  ['Korea', 'John McGahern', 'An Irish father thinks about sending his son to fight abroad for the money.'],
  ['Odour of Chrysanthemums', 'D.H. Lawrence', 'A wife waits for her miner husband and, laying out his body, realises they never knew each other.'],
  ['My Polish Teacher\'s Tie', 'Helen Dunmore', 'A school dinner lady with a Polish father writes to a teacher in Poland as if she were a teacher.'],
  ['A Family Supper', 'Kazuo Ishiguro', 'A son returns to Japan for a tense meal with his father; fugu fish and hints of suicide.'],
  ['Invisible Mass of the Back Row', 'Claire Fisher', 'A girl from a working-class family: imagination, aspiration and identity.'],
];

const talesGenerator: Generator = {
  id: 'lo-tales',
  title: 'Telling Tales: stories and writers',
  make: (rand): GeneratedQuestion => {
    const [story, writer, idea] = pick(rand, TALES);
    const why = [`'${story}' by ${writer}: ${idea}`];
    const k = rand();
    if (k < 0.4) return mcq(rand, `In *Telling Tales*, which story is this?\n\n> ${idea}`, `'${story}'`, shuffle(TALES.filter((x) => x[0] !== story).map((x) => `'${x[0]}'`), rand), why, 2);
    if (k < 0.7) return mcq(rand, `Who wrote '${story}'?`, writer, shuffle(TALES.filter((x) => x[1] !== writer).map((x) => x[1]), rand), why, 2);
    return mcq(rand, `Which story in *Telling Tales* was written by **${writer}**?`, `'${story}'`, shuffle(TALES.filter((x) => x[0] !== story).map((x) => `'${x[0]}'`), rand), why, 2);
  },
};

// How AQA English Literature is examined (from the lesson "How you are marked")
const AOS: [string, string][] = [
  ['AO1', 'a personal, critical argument that answers the question, supported by well-chosen references and quotations'],
  ['AO2', 'analysis of the writer\'s language, form and structure and their effects, using subject terminology'],
  ['AO3', 'understanding of context: how the time, society and the writer\'s beliefs shaped the text'],
  ['AO4', 'accurate spelling, punctuation and grammar, with a range of vocabulary and sentence structures'],
];
const LEVELS: [level: string, marks: string, words: string][] = [
  ['Level 6', '26-30', 'convincing, critical exploration with judicious references'],
  ['Level 5', '21-25', 'a thoughtful, developed response with apt references'],
  ['Level 4', '16-20', 'a clear, explained response with effective references'],
  ['Level 3', '11-15', 'some explained response, with references to support'],
  ['Level 2', '6-10', 'supported, relevant comments with some awareness of methods'],
  ['Level 1', '1-5', 'simple, explicit comments'],
];
const SECTIONS: [name: string, desc: string][] = [
  ['the Shakespeare play', 'Paper 1, Section A: an extract and the whole text, 34 marks including 4 for spelling, punctuation and grammar'],
  ['the 19th-century novel', 'Paper 1, Section B: an extract and the whole text, 30 marks, no marks for spelling, punctuation and grammar'],
  ['the modern prose or drama text', 'Paper 2, Section A: a choice of two essay questions with no extract, 34 marks including 4 for spelling, punctuation and grammar'],
  ['the poetry anthology', 'Paper 2, Section B: compare a printed named poem with one other from your cluster, 30 marks'],
  ['unseen poetry', 'Paper 2, Section C: write about one new poem for 24 marks, then compare it with a second for 8 marks'],
];
const examGenerator: Generator = {
  id: 'lo-exam',
  title: 'English Literature: AOs, levels and the papers',
  make: (rand): GeneratedQuestion => {
    const k = rand();
    if (k < 0.3) {
      const [ao, desc] = pick(rand, AOS);
      const why = [`${ao}: ${desc}.`, 'AO1 argument and references · AO2 methods and effects · AO3 context · AO4 accuracy (Shakespeare and the modern text only).'];
      if (rand() < 0.6) return mcq(rand, `Which assessment objective rewards this?\n\n> ${desc.charAt(0).toUpperCase()}${desc.slice(1)}`, ao, shuffle(AOS.filter((a) => a[0] !== ao).map((a) => a[0]), rand), why, 1);
      return mcq(rand, `What does **${ao}** reward in English Literature?`, desc, shuffle(AOS.filter((a) => a[0] !== ao).map((a) => a[1]), rand), why, 1);
    }
    if (k < 0.6) {
      const i = Math.floor(rand() * LEVELS.length);
      const [level, marks, words] = LEVELS[i];
      const near = LEVELS.filter((_, j) => j !== i).sort((a, b) => Math.abs(LEVELS.indexOf(a) - i) - Math.abs(LEVELS.indexOf(b) - i));
      const why = [`${level} (${marks} marks on a 30-mark essay): ${words}.`, 'Level 6 key words: convincing, critical, judicious, exploratory.'];
      if (rand() < 0.5) return mcq(rand, `On a 30-mark AQA Literature essay, which level is described as **${words}**?`, level, near.map((l) => l[0]), why, 3);
      return mcq(rand, `On a 30-mark AQA Literature essay, which mark band is **${level}**?`, marks, near.map((l) => l[1]), why, 2);
    }
    if (k < 0.85) {
      const [name, desc] = pick(rand, SECTIONS);
      const why = [`${name.charAt(0).toUpperCase()}${name.slice(1)} - ${desc}.`];
      if (rand() < 0.55) return mcq(rand, `Which part of the AQA English Literature exam is this?\n\n> ${desc}`, name, shuffle(SECTIONS.filter((x) => x[0] !== name).map((x) => x[0]), rand), why, 2);
      return mcq(rand, `How is **${name}** examined?`, desc, shuffle(SECTIONS.filter((x) => x[0] !== name).map((x) => x[1]), rand), why, 2);
    }
    const facts: [string, string, string[], string][] = [
      ['Which questions in English Literature give marks for spelling, punctuation and grammar (AO4)?', 'Shakespeare and the modern text (4 marks each)', ['The 19th-century novel and the poetry anthology', 'Only the unseen poetry questions', 'Every question on both papers'], 'AO4 is 4 marks on the Shakespeare question (Paper 1) and 4 on the modern text question (Paper 2) - easy marks for spelling names and titles correctly.'],
      ['Which assessment objective is NOT assessed on unseen poetry?', 'AO3 (context)', ['AO2 (methods and effects)', 'AO1 (argument and references)', 'None - all four are assessed'], 'You cannot know the context of a poem you have never seen, so unseen poetry rewards your response (AO1) and analysis of methods (AO2).'],
      ['How many marks is the unseen poetry comparison question worth?', '8 marks', ['24 marks', '30 marks', '16 marks', '4 marks'], 'The first unseen question (one poem) is 24 marks; the comparison is 8 - spend about 15 minutes on it.'],
      ['On which section is there no extract printed in the exam paper?', 'The modern prose or drama text', ['The Shakespeare play', 'The 19th-century novel', 'The poetry anthology (a named poem is printed)'], 'For the modern text you choose one of two essay questions and write from memory, so you need quotations ready.'],
    ];
    const [q, a, wrong, why] = pick(rand, facts);
    return mcq(rand, q, a, shuffle(wrong, rand), [`${a}.`, why], 2);
  },
};

export const LIT_OVERVIEW_GENERATORS: Generator[] = [...TEXTS.map(textGenerator), talesGenerator, examGenerator];
export const LIT_OVERVIEW_TOPICS: Record<string, string[]> = Object.fromEntries([...TEXTS.flatMap((t) => (t.topics ?? [`${t.id}-overview`]).map((topic) => [topic, [`lo-${t.id}`]])), ['tales-overview', ['lo-tales']], ...['lit-aos', 'lit-essay', 'lit-extract', 'unseen-method'].map((t) => [t, ['lo-exam']])]);
