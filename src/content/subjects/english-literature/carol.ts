import type { Unit } from '../../types';
import { cards, mc, multi, tf, topic, quote, examQ, match } from '../../dsl';

const LEVELS = [
  'Level 6 (26-30): convincing, critical argument; judicious quotations; analysis of Dickens\'s methods; context linked to purpose',
  'Level 5 (21-25): thoughtful, developed; apt references; examination of methods',
  'Level 4 (16-20): clear, explained; effective references; clear understanding of methods',
  'Covers the extract in detail', 'Covers the novella as a whole (all five staves)', 'Shows how Scrooge/the idea develops', 'Offers alternative interpretations',
];

export const carolUnit: Unit[] = [{
  id: 'acc', title: 'A Christmas Carol', option: { group: 'lit-novel', value: 'acc' },
  description: 'Dickens\'s 1843 novella: a ghost story with a social conscience.',
  topics: [
    topic({
      id: 'acc-plot', title: 'Plot and structure (the five staves)', summary: 'Stave by stave, and why the structure matters.',
      notes: `
Dickens calls the chapters **"staves"** - the verses of a song (a carol), suggesting the story is joyful and meant to be shared.

| Stave | What happens |
|---|---|
| **1 - Marley's Ghost** | Christmas Eve. Scrooge, a miserly moneylender, refuses his nephew **Fred**'s invitation, rejects **charity collectors** ("Are there no prisons?") and resents his clerk **Bob Cratchit**'s day off. **Marley's ghost** appears in chains he "forged in life" and warns of three spirits. |
| **2 - The First of the Three Spirits** | **Ghost of Christmas Past**: Scrooge sees his lonely childhood at school, his sister **Fan**, the joyful party of his old boss **Fezziwig**, and **Belle** ending their engagement because he loves money ("a golden idol"). He begs the ghost to stop. |
| **3 - The Second of the Three Spirits** | **Ghost of Christmas Present**: abundant Christmas in London; the **Cratchits'** humble, loving dinner; **Tiny Tim** ("God bless Us, Every One!") will die unless things change; Fred's party where Scrooge enjoys the games. The ghost reveals two wretched children, **Ignorance and Want**. |
| **4 - The Last of the Spirits** | **Ghost of Christmas Yet to Come** (silent, hooded): businessmen joke about a dead man's cheap funeral; thieves sell his belongings; a couple are relieved he is dead (debt). The Cratchits mourn Tiny Tim. Scrooge sees **his own neglected grave** and vows to change. |
| **5 - The End of It** | Christmas morning: Scrooge is overjoyed, buys the **prize turkey** for the Cratchits, donates to the charity collectors, goes to Fred's, raises Bob's salary and becomes "**a second father**" to Tiny Tim. |

## Structure
- **Circular / mirrored**: Stave 1 and 5 mirror each other (charity collectors, Fred, Bob) - showing Scrooge's change.
- **Past → Present → Future**: a journey of **memory, empathy and consequence**.
- A **morality tale / allegory** with a clear lesson; a **novella** - short enough to read aloud at Christmas.
- **Ghost story** genre makes the moral exciting; the omniscient, chatty narrator speaks directly to the reader.
`,
      keyPoints: ['Five "staves" = verses of a carol', 'Stave 1: Fred, charity collectors, Marley\'s chains', 'Stave 2: lonely childhood, Fezziwig, Belle', 'Stave 3: Cratchits, Tiny Tim, Ignorance and Want', 'Stave 4: dead man, thieves, Scrooge\'s grave', 'Stave 5: transformation - mirrors Stave 1', 'Allegory/morality tale; intrusive narrator'],
      timeline: [
        { date: 'Stave 1', event: 'Scrooge refuses Fred\'s invitation and the charity collectors' },
        { date: 'Stave 1', event: 'Marley\'s ghost appears in chains' },
        { date: 'Stave 2', event: 'Scrooge sees himself alone at school' },
        { date: 'Stave 2', event: 'Fezziwig\'s Christmas party' },
        { date: 'Stave 2', event: 'Belle releases Scrooge from their engagement' },
        { date: 'Stave 3', event: 'The Cratchits\' Christmas dinner' },
        { date: 'Stave 3', event: 'Ignorance and Want are revealed' },
        { date: 'Stave 4', event: 'Thieves sell the dead man\'s belongings' },
        { date: 'Stave 4', event: 'Scrooge sees his own gravestone' },
        { date: 'Stave 5', event: 'Scrooge sends the prize turkey to the Cratchits' },
        { date: 'Stave 5', event: 'Scrooge raises Bob\'s salary' },
        { date: 'Stave 5', event: 'Scrooge becomes "a second father" to Tiny Tim' },
      ],
      flashcards: cards([
        ['Why are the chapters called staves?', 'A stave is a verse of a song - it links to the title "Carol" and suggests joy and community.'],
        ['When was A Christmas Carol published?', 'December 1843.'],
        ['Who visits Scrooge first?', 'Jacob Marley, his dead business partner, wearing chains.'],
        ['What are the names of the two children under the Ghost of Christmas Present\'s robe?', 'Ignorance (the boy) and Want (the girl).'],
        ['How does Stave 5 mirror Stave 1?', 'Scrooge meets the same people (charity collector, Fred, Bob) but now responds with generosity.'],
      ]),
      questions: [
        mc('Who is Scrooge\'s former employer, whose party he sees in Stave 2?', ['Fezziwig', 'Marley', 'Fred', 'Topper'], 'Fezziwig shows how an employer can bring joy cheaply - a contrast with Scrooge\'s treatment of Bob.', { d: 1 }),
        mc('What does Scrooge see at the end of Stave 4 that makes him beg to change?', ['His own neglected gravestone', 'Belle\'s wedding', 'Fred\'s party', 'Marley\'s chains'], 'The name on the grave is "EBENEZER SCROOGE" - the final shock.', { d: 1 }),
        tf('The Ghost of Christmas Yet to Come speaks to Scrooge to explain the visions.', false, 'It is silent and only points - making it more frightening and forcing Scrooge to interpret.', { d: 2 }),
        mc('What is the effect of Stave 5 mirroring Stave 1?', ['It highlights how completely Scrooge has changed', 'It shows nothing has changed', 'It introduces new characters', 'It makes the story longer'], 'The same encounters with opposite reactions make the transformation clear.', { d: 2 }),
        mc('Why did Dickens write a short novella rather than a long novel?', ['To make it cheap, quick to read and to be read aloud to families at Christmas', 'Because he ran out of ideas', 'Because novels were illegal', 'To win a competition'], 'Accessibility spread his message widely - it sold out by Christmas Eve 1843.', { d: 3 }),
      ],
    }),
    topic({
      id: 'acc-scrooge', title: 'Scrooge', summary: 'From "covetous old sinner" to "as good a man as the good old city knew".',
      notes: `
## Stave 1: the miser
- Dickens's narrator piles on description: "**a squeezing, wrenching, grasping, scraping, clutching, covetous old sinner!**" (asyndetic list of present participles - greed in action).
- "**Hard and sharp as flint**", "**solitary as an oyster**" - cold, isolated, but the oyster may hide a pearl.
- "The **cold within him** froze his old features" - pathetic fallacy: coldness is internal.
- "**Are there no prisons? ... And the Union workhouses?**" - rhetorical questions echo heartless Victorian attitudes. "**decrease the surplus population**" - Malthusian.
- "**Bah! Humbug!**" - dismisses Christmas.

## Staves 2-4: the change
- Stave 2: memories soften him - he weeps at his lonely childhood, regrets not giving a carol singer anything, recognises Fezziwig's goodness ("**The happiness he gives is quite as great as if it cost a fortune**"), and is in agony at Belle.
- Stave 3: concern for Tiny Tim - "**tell me if Tiny Tim will live**"; his own words "surplus population" are thrown back at him.
- Stave 4: terror at the dead man; "**I am not the man I was**".

## Stave 5: the redeemed man
- "**I am as light as a feather, I am as happy as an angel, I am as merry as a school-boy**" - similes and repetition show childlike joy.
- "He became as good a friend, as good a master, and as good a man, as the good old city knew."

## Dickens's purpose
Scrooge represents the **selfish, wealthy middle and upper classes**. If even Scrooge can change, so can the reader - Dickens's message is **social responsibility** and **redemption**.
`,
      keyPoints: ['"squeezing, wrenching, grasping..." asyndetic list', '"solitary as an oyster" - isolation, hidden pearl', '"Are there no prisons?" - heartless attitudes', '"decrease the surplus population" - Malthus', 'Weeps at his past; concern for Tiny Tim', '"I am not the man I was"', '"as light as a feather... as merry as a school-boy"', 'Represents the rich - if he can change, anyone can'],
      quotes: [
        quote('a squeezing, wrenching, grasping, scraping, clutching, covetous old sinner!', 'An asyndetic list of violent present participles shows greed as constant physical action; "sinner" adds a religious judgement.', { who: 'Narrator on Scrooge', where: 'Stave 1', themes: ['greed'] }),
        quote('hard and sharp as flint', 'Simile: flint is cold and hard - yet flint can create sparks, hinting he could be kindled into warmth.', { who: 'Narrator on Scrooge', where: 'Stave 1', themes: ['isolation'] }),
        quote('solitary as an oyster', 'Simile: closed off and isolated - but oysters contain pearls, suggesting hidden goodness.', { who: 'Narrator on Scrooge', where: 'Stave 1', themes: ['isolation', 'redemption'] }),
        quote('Are there no prisons? And the Union workhouses?', 'Rhetorical questions dismiss the poor - reflecting harsh attitudes behind the 1834 Poor Law.', { who: 'Scrooge', where: 'Stave 1', themes: ['poverty', 'social responsibility'] }),
        quote('decrease the surplus population', 'Malthusian language treats the poor as numbers. The Ghost later repeats it back at him about Tiny Tim.', { who: 'Scrooge', where: 'Stave 1', themes: ['poverty'] }),
        quote('The happiness he gives is quite as great as if it cost a fortune', 'Scrooge recognises Fezziwig\'s kindness costs little - the first sign of his moral awakening.', { who: 'Scrooge', where: 'Stave 2', themes: ['kindness', 'redemption'] }),
        quote('I am not the man I was', 'Short declarative sentence - a clear, decisive turning point.', { who: 'Scrooge', where: 'Stave 4', themes: ['redemption'] }),
        quote('I am as light as a feather, I am as happy as an angel, I am as merry as a school-boy', 'Tricolon of similes and anaphora ("I am") show childlike, spiritual joy - he is reborn.', { who: 'Scrooge', where: 'Stave 5', themes: ['redemption', 'Christmas'] }),
      ],
      flashcards: cards([
        ['What is Malthusian theory?', 'Thomas Malthus argued population growth would outstrip food, implying the poor should be allowed to die - echoed in "surplus population".'],
        ['What does Scrooge say to the charity collectors in Stave 1?', '"Are there no prisons?... And the Union workhouses?" and that the poor should die "and decrease the surplus population".'],
        ['What does Scrooge do for the Cratchits in Stave 5?', 'Sends the prize turkey, raises Bob\'s salary and becomes a second father to Tiny Tim.'],
      ]),
      questions: [
        mc('What does "solitary as an oyster" suggest about Scrooge?', ['He is isolated and closed off but may hide goodness inside', 'He loves the sea', 'He is generous', 'He is part of a close family'], 'The oyster\'s shell = isolation; the pearl = hidden potential for good.', { d: 2 }),
        mc('What is the effect of the ghost repeating "decrease the surplus population" in Stave 3?', ['Scrooge is confronted with the human cost of his words - Tiny Tim', 'It shows the ghost agrees with Scrooge', 'It is a joke', 'It makes Scrooge angry'], 'Hearing his words applied to a real child shames him.', { d: 3 }),
        tf('Scrooge\'s transformation happens only in Stave 5.', false, 'It is gradual: he weeps in Stave 2, worries about Tiny Tim in Stave 3, and vows to change in Stave 4.', { d: 2 }),
        mc('What does Scrooge represent for Dickens\'s readers?', ['The selfish wealthy classes who ignored the poor', 'The working poor', 'The Church', 'Children'], 'Dickens aims his message at middle- and upper-class readers who could help.', { d: 2 }),
        match('Match the quote to the stave.', [['"Bah! Humbug!"', 'Stave 1'], ['"The happiness he gives is quite as great as if it cost a fortune"', 'Stave 2'], ['"tell me if Tiny Tim will live"', 'Stave 3'], ['"I am as light as a feather"', 'Stave 5']], 'Tracking Scrooge\'s journey stave by stave.', { d: 2 }),
      ],
    }),
    topic({
      id: 'acc-characters', title: 'The ghosts, the Cratchits, Fred, Belle and Fezziwig', summary: 'How each character teaches Scrooge (and the reader) a lesson.',
      notes: `
| Character | Function |
|---|---|
| **Marley's Ghost** | A warning: wears a chain "**I forged in life**" of cash-boxes and ledgers. "**Mankind was my business!**" - he regrets ignoring others. |
| **Ghost of Christmas Past** | Childlike and old at once, with a light shining from its head (memory, truth, clarity). Scrooge tries to extinguish it with the cap - he resists the truth. |
| **Ghost of Christmas Present** | A jolly giant on a throne of food - abundance and generosity. Ages over the stave. Reveals **Ignorance and Want**: "**This boy is Ignorance. This girl is Want. Beware them both... but most of all beware this boy.**" |
| **Ghost of Christmas Yet to Come** | Silent, hooded, pointing - like the Grim Reaper. Represents death and consequences. |
| **Bob Cratchit** | Poor, underpaid clerk who still toasts Scrooge as "the Founder of the Feast". Represents the **deserving poor**. |
| **Tiny Tim** | Disabled child - innocence and the vulnerability of poor children. "**God bless Us, Every One!**" Used to provoke **sympathy**. |
| **Mrs Cratchit & family** | Make the most of little - "a small pudding for a large family". Love and togetherness over wealth. |
| **Fred** | Scrooge's nephew: warm, cheerful, keeps inviting him. Defines Christmas as "**a kind, forgiving, charitable, pleasant time**". The Christmas spirit embodied. |
| **Belle** | Scrooge's ex-fiancée: "**another idol has displaced me... a golden one**" - money replaced love. Later shown with a happy family Scrooge could have had. |
| **Fezziwig** | Generous, joyful employer - a model for how Scrooge should treat Bob. |
| **Fan** | Scrooge's sister, who rescues him from school - Fred's mother. |
`,
      keyPoints: ['Marley: chains "I forged in life"; "Mankind was my business!"', 'Past: light = truth/memory', 'Present: abundance; Ignorance and Want', 'Yet to Come: silent, death, consequences', 'Bob & Tiny Tim: deserving poor; sympathy', 'Fred: "kind, forgiving, charitable, pleasant time"', 'Belle: "a golden idol" replaced her', 'Fezziwig: model employer'],
      quotes: [
        quote('I wear the chain I forged in life', 'The chain symbolises the consequences of greed; "forged" shows it was made by his own choices.', { who: 'Marley', where: 'Stave 1', themes: ['greed', 'consequences'] }),
        quote('Mankind was my business!', 'Exclamation and pun on "business": his real duty was to people, not profit - Dickens\'s central message.', { who: 'Marley', where: 'Stave 1', themes: ['social responsibility'] }),
        quote('a kind, forgiving, charitable, pleasant time', 'Fred\'s list of adjectives defines the true meaning of Christmas - the opposite of Scrooge\'s values.', { who: 'Fred', where: 'Stave 1', themes: ['Christmas', 'kindness'] }),
        quote('another idol has displaced me... a golden one', 'Religious metaphor: money has become Scrooge\'s false god.', { who: 'Belle', where: 'Stave 2', themes: ['greed', 'love'] }),
        quote('This boy is Ignorance. This girl is Want. Beware them both', 'Allegorical children represent the dangers of neglecting the poor - Ignorance (lack of education) is the bigger threat.', { who: 'Ghost of Christmas Present', where: 'Stave 3', themes: ['poverty', 'social responsibility'] }),
        quote('God bless Us, Every One!', 'Tiny Tim\'s blessing is inclusive ("Every One") and Christian - the novella\'s final words.', { who: 'Tiny Tim', where: 'Stave 3 & 5', themes: ['Christmas', 'family'] }),
      ],
      flashcards: cards([
        ['What does Marley\'s chain represent?', 'The consequences of his greed - made of cash-boxes, keys, ledgers and purses.'],
        ['What do Ignorance and Want represent?', 'The neglected poor: lack of education and lack of basic needs - dangers to society.'],
        ['Why does the Ghost of Christmas Present age during Stave 3?', 'Its life lasts only one Christmas Day - the present is fleeting, so act now.'],
        ['Who toasts Scrooge as "the Founder of the Feast"?', 'Bob Cratchit.'],
      ]),
      questions: [
        mc('Why does the Ghost of Christmas Past have a light shining from its head?', ['It represents the truth and clarity of memory', 'It is a lamp to find the way', 'It shows the ghost is angry', 'It represents money'], 'Scrooge tries to put it out - he resists painful truths.', { d: 2 }),
        mc('Which character best shows how an employer should behave?', ['Fezziwig', 'Marley', 'Topper', 'Old Joe'], 'Fezziwig\'s joyful party contrasts with Scrooge\'s meanness to Bob.', { d: 1 }),
        tf('The ghost says Want is the more dangerous of the two children.', false, '"Most of all beware this boy" - Ignorance is more dangerous: Dickens campaigned for education of the poor.', { d: 3 }),
        mc('What is Tiny Tim\'s main purpose in the novella?', ['To make readers sympathise with the poor and push Scrooge to change', 'To provide comedy', 'To be a villain', 'To represent the wealthy'], 'His likely death "if these shadows remain unaltered" creates urgency.', { d: 2 }),
        multi('Which characters embody the true spirit of Christmas?', ['Fred', 'Fezziwig', 'The Cratchits'], ['Scrooge in Stave 1', 'The businessmen in Stave 4'], 'They show generosity and joy regardless of wealth.', { d: 1 }),
      ],
    }),
    topic({
      id: 'acc-themes', title: 'Themes and context', summary: 'Redemption, social responsibility, poverty, family, Christmas - and Victorian context.',
      notes: `
## Themes
- **Redemption**: anyone can change; Christian ideas of repentance and salvation.
- **Social responsibility**: "Mankind was my business!" - the rich have a duty to the poor.
- **Poverty**: the Cratchits, Ignorance and Want, the thieves in Stave 4 - poverty is shown realistically but sympathetically.
- **Greed/money**: chains, the "golden idol", the businessmen who joke about the dead man.
- **Family and togetherness**: the Cratchits, Fred's party, Belle's family; Scrooge's isolation.
- **Christmas**: a time of generosity, joy and community - Dickens helped popularise the modern idea of Christmas.
- **Time / memory / consequences**: past, present and future.

## Context
| Context | Link |
|---|---|
| **1843**, Victorian London, rapid industrialisation | Huge gap between rich and poor; overcrowded slums. |
| **1834 Poor Law Amendment Act** | Created **workhouses** - harsh, deliberately miserable, families separated. Scrooge's "Union workhouses". |
| **Thomas Malthus** | Population theory used to justify not helping the poor - "surplus population". |
| **Dickens's childhood** | At 12 he worked in a **blacking factory** while his father was in a debtors' prison - he knew poverty first-hand (Scrooge's lonely childhood). |
| **Ragged Schools** & the **1843 Report on child labour** | Dickens visited a Ragged School and was shocked; he considered writing a pamphlet but chose a story ("a sledgehammer blow") - Ignorance and Want. |
| **Christianity** | Charity, forgiveness, redemption; Tiny Tim's blessing. |
| **Victorian Christmas revival** | Christmas trees (popularised by Prince Albert), cards (1843), family feasts. |

:::tip Purpose
Dickens wanted his wealthy readers to **feel** for the poor and **act**: "I have endeavoured in this Ghostly little book, to raise the Ghost of an Idea" (Preface).
:::
`,
      keyPoints: ['Redemption: anyone can change', 'Social responsibility: "Mankind was my business!"', '1834 Poor Law and workhouses', 'Malthus and "surplus population"', 'Dickens worked in a blacking factory aged 12', 'Ragged Schools inspired Ignorance and Want', 'Purpose: move readers to act - "Ghost of an Idea"'],
      flashcards: cards([
        ['What was the 1834 Poor Law Amendment Act?', 'A law that made poor relief available mainly through harsh workhouses, designed to deter people from claiming help.'],
        ['What happened to Dickens as a child?', 'His father was imprisoned for debt and Dickens worked in a blacking (boot polish) factory aged 12.'],
        ['What were Ragged Schools?', 'Free charity schools for very poor children - Dickens visited one in 1843.'],
        ['What does Dickens say in the Preface?', 'He hopes to "raise the Ghost of an Idea" which will not put readers "out of humour with themselves... or with me".'],
      ]),
      questions: [
        mc('Which law created the workhouses Scrooge mentions?', ['The 1834 Poor Law Amendment Act', 'The 1870 Education Act', 'The Factory Act of 1833', 'The Reform Act of 1832'], 'Workhouses were deliberately harsh to deter the poor from seeking help.', { d: 2 }),
        mc('Why did Dickens choose to write a story rather than a political pamphlet?', ['A story would reach more people and move them emotionally', 'Pamphlets were banned', 'He was paid more for pamphlets', 'He disliked politics'], 'He called it a "sledgehammer blow" - emotion persuades more than argument.', { d: 3 }),
        tf('Dickens had personal experience of poverty as a child.', true, 'His father was in Marshalsea debtors\' prison and Dickens worked in Warren\'s Blacking Factory.'),
        mc('How does Dickens present poverty through the Cratchits?', ['As hardship borne with love and dignity - they are the "deserving poor"', 'As a result of laziness', 'As something to laugh at', 'As non-existent'], 'He counters the Victorian view that the poor were idle or immoral.', { d: 2 }),
      ],
    }),
    topic({
      id: 'acc-exam', title: 'A Christmas Carol: past questions and exam practice', summary: 'Every recent AQA question and practice essays with mark schemes.',
      notes: `
AQA questions are extract + whole novella, **30 marks** (no SPaG on this section). Typical focuses: **Scrooge** (fears, change, lessons), **poverty and suffering**, the **Cratchits**, **the ghosts**, **joy and happiness**, **loneliness and isolation**, **greed**, **kindness**.

:::warn Prepare everything
Themes asked recently include greed (2023), lessons Scrooge learns (2024) and kindness (2025). Equally examinable: **family**, **redemption**, **Christmas**, **Fred**, **Marley**, **Belle**, **social responsibility**, **the past/memory**, **fear and the supernatural**, **generosity**.
:::
`,
      keyPoints: ['Section B: 30 marks, ~45-50 minutes', 'Extract + whole text', 'Prepare all characters and themes'],
      pastQuestions: [
        { year: 'Jun 2017', focus: 'How Dickens uses the **Cratchit family** to show the struggles of the poor', extract: 'Stave 3' },
        { year: 'Jun 2018', focus: '**Scrooge\'s fears**', extract: 'Stave 4' },
        { year: 'Jun 2019', focus: 'How Dickens uses **the ghosts** to help Scrooge change', extract: 'Stave 1 (Marley)' },
        { year: 'Nov 2020', focus: 'The **suffering of the poor**', extract: 'Stave 3 (Ignorance and Want)' },
        { year: 'Nov 2021', focus: 'Ideas about **joy and happiness**', extract: 'Stave 2 (Fezziwig)' },
        { year: 'Jun 2022', focus: 'The effects of **loneliness and isolation**', extract: 'Stave 2 (school)' },
        { year: 'Jun 2023', focus: 'The effects of **greed**', extract: 'Stave 2 (Belle)' },
        { year: 'Jun 2024', focus: 'The **lessons Scrooge learns** about life', extract: 'Stave 4' },
        { year: 'Jun 2025', focus: 'The importance of **kindness**', extract: 'Stave 3' },
      ],
      questions: [
        mc('Is SPaG (AO4) assessed on the 19th-century novel question?', ['No', 'Yes, 4 marks', 'Yes, 8 marks', 'Only for Higher tier'], 'AO4 is only on the Shakespeare and modern text questions.', { d: 1 }),
      ],
      examQuestions: [
        examQ('**Starting with this extract (Stave 1, Fred visits the counting-house), explore how Dickens presents the importance of family in *A Christmas Carol*.**\n\n*Extract:* "A merry Christmas, uncle! God save you!" cried a cheerful voice. It was the voice of Scrooge\'s nephew... "Christmas a humbug, uncle!" said Scrooge\'s nephew. "You don\'t mean that, I am sure?"... "I have always thought of Christmas time... as a good time; a kind, forgiving, charitable, pleasant time..."', 30, [
          ...LEVELS,
          'Analyses Fred\'s warmth (exclamations, "cheerful voice") vs Scrooge\'s coldness',
          'Links to Fan (Stave 2), the Cratchits (Stave 3), Belle\'s family, Fred\'s party, Stave 5 reunion',
          'Explores family as a cure for isolation and greed',
          'Context: Victorian ideals of the family Christmas; Dickens\'s purpose',
        ], { meta: 'Paper 1 Section B · practice question', time: 45, model: 'Dickens presents family as the antidote to Scrooge\'s isolation: Fred\'s persistent, joyful invitations show that family love is freely offered, and Scrooge\'s eventual acceptance of it in Stave 5 signals his redemption.\n\nIn the extract, Fred bursts in with an exclamatory "A merry Christmas, uncle! God save you!", the familial noun "uncle" asserting a bond that Scrooge refuses to acknowledge. Dickens contrasts the "cheerful voice" with Scrooge\'s cold isolation ("solitary as an oyster"), so that family is associated with warmth and light...' }),
        examQ('**Starting with this extract (Stave 3, the Cratchits\' dinner), explore how Dickens presents generosity in *A Christmas Carol*.**\n\n> **Find the extract:** open your copy of the text at the point named above and read about 30 lines. (In the real exam the extract is printed for you.)', 30, [
          ...LEVELS,
          'Analyses how the Cratchits share little but give much (pudding, toast to Scrooge)',
          'Contrasts with Scrooge\'s meanness (Stave 1) and Fezziwig (Stave 2)',
          'Explores Stave 5 generosity (turkey, charity, salary)',
          'Context: Christian charity, Poor Law, Dickens\'s social purpose',
        ], { meta: 'Paper 1 Section B · practice question', time: 45 }),
      ],
    }),
  ],
}];
