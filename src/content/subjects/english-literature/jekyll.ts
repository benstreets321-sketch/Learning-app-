import type { Unit } from '../../types';
import { cards, mc, multi, tf, topic, quote, examQ } from '../../dsl';

const LEVELS = [
  'Level 6 (26-30): convincing, critical argument; judicious quotations; analysis of Stevenson\'s methods; context linked to purpose',
  'Level 5 (21-25): thoughtful, developed; apt references; examination of methods',
  'Level 4 (16-20): clear, explained; effective references; clear understanding of methods',
  'Covers the extract in detail', 'Covers the novella as a whole', 'Shows development (e.g. Hyde growing stronger)', 'Offers alternative interpretations',
];

export const jekyllUnit: Unit[] = [{
  id: 'jh', title: 'The Strange Case of Dr Jekyll and Mr Hyde', option: { group: 'lit-novel', value: 'jekyll' },
  description: 'Stevenson\'s 1886 Gothic novella about duality and repression.',
  topics: [
    topic({
      id: 'jh-plot', title: 'Plot and structure', summary: 'The ten chapters and the mystery structure.',
      notes: `
| Ch | Title | What happens |
|---|---|---|
| 1 | Story of the Door | **Enfield** tells **Utterson** about Hyde **trampling a girl** and paying with a cheque signed by a respectable man (Jekyll). |
| 2 | Search for Mr Hyde | Utterson worries about Jekyll's **will** (everything to Hyde). Visits **Lanyon** (who fell out with Jekyll over "unscientific balderdash"). Meets Hyde - feels disgust he can't explain. |
| 3 | Dr Jekyll was Quite at Ease | Jekyll laughs off concerns: "the moment I choose, I can be rid of Mr Hyde". |
| 4 | The Carew Murder Case | A maid sees Hyde beat **Sir Danvers Carew MP** to death with a cane. Hyde's rooms in Soho are found empty. |
| 5 | Incident of the Letter | Jekyll, shaken, shows a letter "from Hyde". Utterson's clerk Guest notices the handwriting matches Jekyll's. |
| 6 | Remarkable Incident of Dr Lanyon | Jekyll becomes sociable - then shuts himself away. **Lanyon is dying** from a shock; leaves a letter not to be opened until Jekyll's death or disappearance. |
| 7 | Incident at the Window | Utterson and Enfield see Jekyll at a window; his face shows "abject terror and despair" and he slams it shut. |
| 8 | The Last Night | **Poole** fetches Utterson: someone is locked in the lab. They break in and find **Hyde dead** (suicide), wearing Jekyll's clothes. A new will names Utterson. |
| 9 | Dr Lanyon's Narrative | Lanyon describes watching **Hyde drink the potion and transform into Jekyll** - the shock killed him. |
| 10 | Henry Jekyll's Full Statement of the Case | Jekyll's confession: his "**duality**", the experiment, Hyde growing stronger, transforming involuntarily, running out of the salt. |

## Structure
- A **detective/mystery** structure: we see events through **Utterson**, who doesn't know the truth. The secret is withheld until chapters 9-10.
- **Multiple narratives** (Enfield's story, letters, Lanyon's narrative, Jekyll's statement) - like assembling evidence; fragments reflect a fragmented identity.
- **Gothic novella**: short, intense, suspenseful; written in 1886 as a "shilling shocker".
`,
      keyPoints: ['Ch1: Hyde tramples a girl (Enfield\'s story)', 'Ch2: the will; Utterson meets Hyde', 'Ch4: Carew murder', 'Ch5: letter - handwriting matches Jekyll', 'Ch6: Lanyon dies of shock', 'Ch8: Hyde dead in the lab', 'Ch9-10: Lanyon\'s and Jekyll\'s narratives reveal the truth', 'Mystery structure via Utterson; multiple narratives'],
      timeline: [
        { date: 'Ch 1', event: 'Enfield describes Hyde trampling a girl' },
        { date: 'Ch 2', event: 'Utterson meets Hyde for the first time' },
        { date: 'Ch 3', event: 'Jekyll says he can be rid of Hyde "the moment I choose"' },
        { date: 'Ch 4', event: 'Hyde murders Sir Danvers Carew' },
        { date: 'Ch 5', event: 'Guest notices the handwriting is similar' },
        { date: 'Ch 6', event: 'Lanyon dies after a shock' },
        { date: 'Ch 7', event: 'Jekyll slams the window shut in terror' },
        { date: 'Ch 8', event: 'Utterson and Poole break into the laboratory' },
        { date: 'Ch 9', event: 'Lanyon\'s narrative: he witnesses the transformation' },
        { date: 'Ch 10', event: 'Jekyll\'s full statement of the case' },
      ],
      flashcards: cards([
        ['Who narrates most of the novella?', 'A third-person narrator following Utterson - until the documents of Lanyon (Ch 9) and Jekyll (Ch 10).'],
        ['Who is Hyde\'s first victim we hear about?', 'A young girl he tramples (Ch 1).'],
        ['Who does Hyde murder?', 'Sir Danvers Carew, an elderly MP.'],
        ['What causes Lanyon\'s death?', 'The shock of seeing Hyde transform into Jekyll.'],
        ['Why can\'t Jekyll make more potion?', 'The original salt was impure; new batches don\'t work.'],
      ]),
      questions: [
        mc('Why does Stevenson tell most of the story through Utterson?', ['To keep the mystery hidden, as he doesn\'t know the truth', 'Because Utterson has seen every one of Hyde\'s crimes', 'So the whole story can be told in the first person', 'Because Utterson is the most emotional character'], 'Utterson\'s limited viewpoint creates suspense; the truth is revealed only at the end.', { d: 2 }),
        mc('What clue in Chapter 5 links Jekyll and Hyde?', ['The handwriting on Hyde\'s letter is like Jekyll\'s', 'Hyde is seen wearing Jekyll\'s clothes in the street', 'Jekyll and Hyde are seen together at the old door', 'Hyde\'s footprints are found in Jekyll\'s study'], 'Guest, a handwriting expert, notes the similarity - but Utterson keeps it quiet to protect reputations.', { d: 2 }),
        tf('Lanyon dies because Hyde attacks him.', false, 'He dies from the shock of witnessing the transformation - his rational, scientific worldview is shattered.', { d: 2 }),
        mc('What is the effect of multiple narratives (letters, statements)?', ['It feels like evidence in a case and reflects fragmented identity', 'It makes the story feel light-hearted and comic', 'It lets Hyde explain his own actions in every chapter', 'It shows that every narrator is lying to Utterson'], 'The title calls it a "Case" - documents are like legal evidence.', { d: 3 }),
      ],
    }),
    topic({
      id: 'jh-characters', title: 'Jekyll, Hyde, Utterson and Lanyon', summary: 'Duality personified - and the respectable men who look away.',
      notes: `
## Dr Henry Jekyll
- Respectable, wealthy doctor: "a large, well-made, smooth-faced man of fifty". Has a **secret life** of "irregularities" he hid out of shame.
- Believes "**man is not truly one, but truly two**". Creates Hyde to indulge desires without guilt.
- Gradually loses control: transforms involuntarily; Hyde grows stronger ("I was slowly losing hold of my original and better self").
- Can we sympathise? He is weak and hypocritical, but desperate and tormented.

## Mr Edward Hyde
- Small, young, quick: "**something wrong with his appearance... something displeasing, something downright detestable**" - people can't explain their disgust.
- Described with **animal imagery**: "ape-like fury", "like a rat", "hissing".
- **Violence**: tramples a girl "like some damned Juggernaut"; beats Carew with "ape-like fury".
- Represents **pure evil**, repressed desire, the "**primitive**" (Darwin fears).

## Mr Gabriel Utterson
- Lawyer, rational, reserved: "**lean, long, dusty, dreary, and yet somehow lovable**". "I incline to Cain's heresy... I let my brother go to the devil in his own way."
- Detective figure who protects reputation (doesn't reveal the handwriting clue) - shows **Victorian secrecy**.

## Dr Hastie Lanyon
- Rational scientist; rejected Jekyll's "**unscientific balderdash**". His death shows **science cannot cope** with the supernatural/the truth about human nature.

## Others
- **Enfield** - a man about town; "the more it looks like Queer Street, the less I ask" - avoidance.
- **Poole** - loyal butler.
- **Sir Danvers Carew** - innocent, elderly MP: Hyde's attack is an attack on respectable society.
`,
      keyPoints: ['Jekyll: "man is not truly one, but truly two"', 'Hyde: small, ape-like, "downright detestable"', 'Hyde tramples "like some damned Juggernaut"', 'Hyde beats Carew with "ape-like fury"', 'Utterson: rational, reserved, protects reputations', 'Lanyon: "unscientific balderdash"; dies of shock', 'Enfield: "the less I ask" - avoidance'],
      quotes: [
        quote('man is not truly one, but truly two', 'Jekyll\'s central idea of duality; the balanced antithesis mirrors his split self.', { who: 'Jekyll', where: 'Ch 10', themes: ['duality'] }),
        quote('like some damned Juggernaut', 'Simile: Hyde as an unstoppable, crushing force - "damned" adds a hellish, religious horror.', { who: 'Enfield on Hyde', where: 'Ch 1', themes: ['violence', 'evil'] }),
        quote('something displeasing, something downright detestable', 'Repetition of "something" shows evil that can\'t be named - characters can\'t rationally explain Hyde.', { who: 'Enfield on Hyde', where: 'Ch 1', themes: ['evil'] }),
        quote('with ape-like fury', 'Animal imagery links Hyde to Darwinian fears of humans being close to apes - primitive savagery under civilisation.', { who: 'Maid on Hyde', where: 'Ch 4', themes: ['violence', 'evolution'] }),
        quote('If he be Mr Hyde, I shall be Mr Seek', 'Utterson\'s pun shows his determination to uncover the secret - the detective figure.', { who: 'Utterson', where: 'Ch 2', themes: ['secrecy'] }),
        quote('unscientific balderdash', 'Lanyon dismisses Jekyll\'s experiments - the conflict between traditional science and dangerous experimentation.', { who: 'Lanyon', where: 'Ch 2', themes: ['science'] }),
        quote('I was slowly losing hold of my original and better self', 'Hyde grows stronger; Jekyll\'s control fades - evil, once indulged, takes over.', { who: 'Jekyll', where: 'Ch 10', themes: ['duality'] }),
        quote('a man of a rugged countenance that was never lighted by a smile', 'Utterson is serious and reserved - a respectable Victorian gentleman.', { who: 'Narrator', where: 'Ch 1', themes: ['reputation'] }),
        quote('trampled calmly over the child\'s body', 'The adverb \'calmly\' makes Hyde\'s violence shocking and inhuman.', { who: 'Enfield', where: 'Ch 1', themes: ['good vs evil', 'violence'] }),
        quote('Satan\'s signature upon a face', 'Utterson reads Hyde\'s evil in his appearance - religious language for pure evil.', { who: 'Utterson', where: 'Ch 2', themes: ['good vs evil', 'religion'] }),
        quote('pale and dwarfish', 'Hyde\'s small, deformed appearance links to fears of degeneration.', { who: 'Narrator', where: 'Ch 2', themes: ['good vs evil', 'science'] }),
        quote('weeping like a woman or a lost soul', 'Poole hears weeping in the cabinet - Jekyll trapped and despairing as Hyde.', { who: 'Poole', where: 'Ch 8', themes: ['duality', 'good vs evil'] }),
        quote('the thorough and primitive duality of man', 'Jekyll\'s statement: every person is both good and evil.', { who: 'Jekyll', where: 'Ch 10', themes: ['duality', 'science'] }),
      ],
      flashcards: cards([
        ['How is Hyde physically described?', 'Small, young, deformed in some unexplainable way, ape-like, with a "hissing" voice.'],
        ['What did Lanyon call Jekyll\'s science?', '"unscientific balderdash".'],
        ['What does Utterson\'s "Cain\'s heresy" comment show?', 'He chooses not to interfere in others\' lives - "I let my brother go to the devil in his own way".'],
        ['Why is Carew\'s murder so shocking?', 'He was an elderly, respectable MP - an attack on the establishment.'],
      ]),
      questions: [
        mc('Why do characters struggle to describe Hyde?', ['His evil is felt rather than seen - it can\'t be rationally explained', 'He wears a mask so nobody ever sees his real face', 'He is invisible except when standing in the lamplight', 'He looks exactly like Jekyll, so people are confused'], 'Repeated "something" shows evil beyond words - a Gothic technique.', { d: 2 }),
        mc('What does animal imagery ("ape-like", "like a rat") suggest about Hyde?', ['He is primitive and less than human, linking to fears from Darwin\'s theory', 'He is gentle and harmless, like a pet that has escaped', 'He loves animals and spends his nights at London Zoo', 'He is a skilled hunter who is admired by other men'], 'Victorians feared humans could "degenerate" back towards animals.', { d: 3 }),
        tf('Utterson immediately tells the police that the handwriting matches Jekyll\'s.', false, 'He keeps it secret to protect Jekyll\'s reputation - showing how Victorian gentlemen hid scandal.', { d: 2 }),
        mc('Which statement about Jekyll is most accurate?', ['He created Hyde to indulge hidden desires without damaging his reputation', 'He is entirely good and is the innocent victim of an accident', 'He never wanted to become Hyde and fought it from the first night', 'He is a lawyer who helps Utterson investigate the case'], 'Jekyll admits to "irregularities" and wanted to enjoy them freely as Hyde.', { d: 3 }),
      ],
    }),
    topic({
      id: 'jh-themes', title: 'Themes and context', summary: 'Duality, reputation, science vs religion, violence, setting - and Victorian fears.',
      notes: `
## Themes
- **Duality**: good and evil exist in everyone ("man is not truly one, but truly two"). Also double lives in society and the city (respectable front, decaying back - Jekyll's house vs the lab door).
- **Reputation and secrecy**: Victorian gentlemen value respectability above truth - Enfield, Utterson and Jekyll all hide things. Silence enables evil.
- **Science vs religion**: Jekyll's experiments "play God"; Lanyon represents traditional science. Transgressing limits brings punishment.
- **Violence and evil**: Hyde's attacks on the vulnerable (a child) and the respectable (Carew).
- **Repression**: the more Jekyll suppresses desires, the stronger Hyde becomes.

## Setting
- **Fog**: "a great chocolate-coloured pall" - mystery, moral confusion, concealment (pathetic fallacy).
- **Soho**: dark, "like a district of some city in a nightmare" - the dark side of London.
- **The door**: "**blistered and distained**", "sinister" - Hyde's entrance to Jekyll's lab; a symbol of the hidden, neglected side of Jekyll.

## Context
| Context | Link |
|---|---|
| **1886**, late Victorian London | Strict public morality and respectability; hidden vice (prostitution, gambling, opium in Soho). |
| **Darwin's *On the Origin of Species* (1859)** | Humans evolved from apes; fear of **degeneration** - Hyde is "ape-like". |
| **Criminal anthropology (Lombroso)** | Belief criminals could be identified by "primitive" physical features - Hyde's deformity. |
| **Science and religion** | Scientific advances challenged religious belief; fear of scientists "playing God". |
| **Gothic genre** | Mystery, horror, the supernatural, doubles, dark settings. |
| **Stevenson's Edinburgh** | A city of respectable New Town and poor Old Town; the story of **Deacon Brodie**, a respectable cabinet-maker by day and burglar by night. |
| **Calvinism** | Stevenson's strict Presbyterian upbringing: humans are inherently sinful. |
`,
      keyPoints: ['Duality in people and in the city', 'Reputation and secrecy enable evil', 'Science vs religion: Jekyll "plays God"', 'Repression strengthens Hyde', 'Fog = concealment and confusion', 'Darwin (1859) and fears of degeneration', 'Deacon Brodie: real double life', 'Gothic genre conventions'],
      quotes: [
        quote('blistered and distained', 'The neglected door symbolises Hyde - the hidden, decaying side of respectable Jekyll.', { who: 'Narrator', where: 'Ch 1', themes: ['duality', 'setting'] }),
        quote('a great chocolate-coloured pall lowered over heaven', 'Fog as a funeral "pall" blocks out heaven - darkness, death and godlessness.', { who: 'Narrator', where: 'Ch 4', themes: ['setting', 'religion'] }),
        quote('like a district of some city in a nightmare', 'Soho is presented as unreal and terrifying - the dark side of civilised London.', { who: 'Narrator', where: 'Ch 4', themes: ['setting'] }),
      ],
      flashcards: cards([
        ['Who was Deacon Brodie?', 'An 18th-century Edinburgh cabinet-maker and councillor by day, burglar by night - a real double life.'],
        ['When was On the Origin of Species published?', '1859, by Charles Darwin.'],
        ['What did Lombroso claim?', 'That criminals were "atavistic" throwbacks identifiable by primitive physical features.'],
        ['What does the fog symbolise?', 'Secrecy, confusion and the moral murkiness of Victorian London.'],
      ]),
      questions: [
        mc('What does the "blistered and distained" door symbolise?', ['The neglected, hidden side of Jekyll - Hyde', 'Jekyll\'s great wealth and respectable reputation', 'Utterson\'s cold, unwelcoming personality', 'The progress of Victorian science and technology'], 'Behind a respectable house lies a decaying back entrance - duality in architecture.', { d: 2 }),
        mc('How does Darwin\'s theory of evolution link to Hyde?', ['Hyde\'s ape-like features reflect fears humans might degenerate', 'Hyde\'s violence shows humans evolving to become stronger', 'Jekyll\'s experiment copies Darwin\'s work on plants', 'Hyde\'s behaviour proves that evolution cannot be true'], 'Victorians feared the "beast" within civilised humans.', { d: 2 }),
        multi('Which characters keep secrets to protect reputation?', ['Utterson', 'Enfield', 'Jekyll'], ['The maid who witnesses the Carew murder'], 'The maid reports the murder; the gentlemen hide the truth.', { d: 2 }),
        tf('The novella suggests that repressing desires makes them weaker.', false, 'Jekyll says his devil "came out roaring" after being "long caged" - repression makes Hyde stronger.', { d: 3 }),
      ],
    }),
    topic({
      id: 'jh-exam', title: 'Jekyll and Hyde: past questions and exam practice', summary: 'Every recent AQA question and practice essays.',
      notes: `
Focuses so far: **Hyde** (threatening, inhuman), **Jekyll** (sympathy, mysterious), **good and evil**, **mystery and tension**, **fear and danger**, **hidden lives and secrets**.

:::warn Prepare everything
Also examinable: **Utterson**, **Lanyon**, **science**, **violence**, **reputation**, **setting/London**, **friendship**, **religion**, **duality**, **the ending**.
:::
`,
      keyPoints: ['Section B: 30 marks, ~45 minutes', 'Extract + whole novella', 'Prepare characters, themes and setting'],
      pastQuestions: [
        { year: 'Jun 2017', focus: '"Stevenson\'s presentation of Dr Jekyll allows the reader to feel **sympathy** for him" - how far do you agree?' },
        { year: 'Jun 2018', focus: 'How Stevenson creates **mystery and tension**' },
        { year: 'Jun 2019', focus: 'Mr Hyde as an **inhuman and disturbing** member of society' },
        { year: 'Nov 2020', focus: 'Ideas about **good and evil**' },
        { year: 'Jun 2022', focus: 'Dr Jekyll as a **mysterious** character' },
        { year: 'Jun 2023', focus: 'How far Mr Hyde is a **threatening and dangerous** character' },
        { year: 'Jun 2024', focus: 'How Stevenson creates an **atmosphere of fear and danger**', extract: 'Ch 2 (Search for Mr Hyde)' },
        { year: 'Jun 2025', focus: 'Ideas about **hidden lives and secrets**', extract: 'Ch 6 (Dr Lanyon)' },
      ],
      flashcards: cards([['How is the Jekyll and Hyde question set?', 'An extract from the novella, then a question about the whole novella.'], ['How many marks is the 19th-century novel question worth?', '30. There are no extra marks for spelling, punctuation and grammar on this question.'], ['How long should you spend on the 19th-century novel question?', 'About 50 minutes, including a few minutes to plan.']]),
      questions: [
        mc('Which character has NOT been the main focus of a recent question, but should be prepared?', ['Utterson', 'Hyde', 'Jekyll', 'None - all have been asked'], 'Utterson and Lanyon are examinable even if not asked recently.', { d: 2 }),
      ],
      examQuestions: [
        examQ('**Starting with this extract (Chapter 4, the Carew murder), explore how Stevenson presents violence in *Jekyll and Hyde*.**\n\n*Extract:* "...he broke out in a great flame of anger, stamping with his foot, brandishing the cane, and carrying on (as the maid described it) like a madman... And next moment, with ape-like fury, he was trampling his victim under foot and hailing down a storm of blows, under which the bones were audibly shattered..."', 30, [
          ...LEVELS,
          'Analyses "ape-like fury", "storm of blows", "audibly shattered"',
          'Links to the trampling of the girl (Ch 1) and Jekyll\'s description of Hyde\'s pleasure in violence (Ch 10)',
          'Explores what violence suggests about human nature and repression',
          'Context: Darwin, degeneration, Victorian fears of crime',
        ], { meta: 'Paper 1 Section B · practice question', time: 45 }),
        examQ('**Starting with this extract (Chapter 1, the door), explore how Stevenson uses settings to create a sense of mystery.**\n\n> **Find the extract:** open your copy of the text at the point named above and read about 30 lines. (In the real exam the extract is printed for you.)', 30, [
          ...LEVELS,
          'Analyses the door: "blistered and distained", "sinister block of building"',
          'Fog and Soho (Ch 4); the lab and cabinet (Ch 8)',
          'Explores setting as a symbol of duality',
          'Context: Victorian London, Gothic genre',
        ], { meta: 'Paper 1 Section B · practice question', time: 45 }),
      ],
    }),
  ],
}];
