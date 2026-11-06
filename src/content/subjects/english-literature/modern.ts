import type { Unit } from '../../types';
import { cards, mc, multi, tf, topic, quote, examQ } from '../../dsl';

const LEVELS = [
  'Level 6: convincing, critical argument; judicious references; analysis of methods; context linked to purpose',
  'Level 5: thoughtful, developed; apt references; examination of methods',
  'Level 4: clear, explained; effective references',
  'Covers the whole text', 'Shows development/change', 'Links context to the writer\'s purpose', 'AO4 accuracy (4 marks)',
];

export const modernUnits: Unit[] = [
  {
    id: 'bb', title: 'Blood Brothers', option: { group: 'lit-modern', value: 'blood' },
    description: 'Willy Russell\'s musical (1983): twins separated at birth, divided by class.',
    topics: [
      topic({
        id: 'bb-plot', title: 'Plot, characters and structure', summary: 'The twins, the mothers, the Narrator and the tragic ending.',
        notes: `
## Plot
Liverpool, 1950s-1980s. Working-class **Mrs Johnstone**, abandoned by her husband with many children, is expecting **twins**. Her employer, wealthy, childless **Mrs Lyons**, persuades her to give one away, swearing on the **Bible**. Mrs Lyons invents a **superstition**: if twins secretly parted learn the truth, they'll both die. **Mickey** (kept) and **Edward** (given away) meet at 7, become "**blood brothers**". Mrs Lyons moves away, but the Johnstones are rehoused nearby. As teenagers both love **Linda**. Edward goes to university; Mickey loses his job, gets Linda pregnant, marries her, joins a robbery with his brother **Sammy**, goes to **prison**, becomes depressed and dependent on **anti-depressants**. Linda turns to Edward (now a councillor). Mrs Lyons tells Mickey; he confronts Edward with a gun. Mrs Johnstone reveals they are twins. Mickey: "**I could have been him!**" The gun goes off - Edward dies; the police shoot Mickey.

## Structure and form
- **Cyclical**: opens with the twins' deaths, then shows how it happened - **dramatic irony** and inevitability.
- **The Narrator**: chorus-like, menacing - links fate and the **devil** ("the devil's got your number"), asks the audience to judge.
- **Musical**: songs (e.g. "Marilyn Monroe", "Easy Terms", "Tell Me It's Not True") develop emotion and themes; repeated motifs.
- **Children played by adults** - comic but poignant.

| Character | Key ideas |
|---|---|
| **Mickey** | Energetic, funny child → unemployed, depressed adult. Shows how **poverty and class** crush potential. |
| **Edward** | Polite, privileged, generous ("Eddie") → university, councillor. Naive about class ("Why don't you just get another job?"). |
| **Mrs Johnstone** | Warm, loving, superstitious, poor. Marilyn Monroe song: from glamour to struggle. |
| **Mrs Lyons** | Wealthy, lonely, increasingly paranoid and manipulative. |
| **Linda** | Loyal, spirited; trapped by early marriage and poverty. |
| **Sammy** | Mickey's older brother - shows the path to crime for poor boys. |
`,
        keyPoints: ['Twins separated: Mickey (poor) and Edward (rich)', 'Mrs Lyons invents the superstition', 'Cyclical structure: opens with the deaths', 'Narrator: fate, the devil, judgement', 'Mickey\'s decline: job loss, prison, anti-depressants', '"I could have been him!"', 'Final question: superstition or class?'],
        quotes: [
          quote('I could have been him!', 'Mickey realises that class and upbringing, not ability, decided their lives - the play\'s key message.', { who: 'Mickey', where: 'Act 2 (ending)', themes: ['class'] }),
          quote('the devil\'s got your number', 'The Narrator\'s repeated warning creates menace and fate - debt and punishment imagery.', { who: 'Narrator', where: 'Act 1 & 2', themes: ['fate', 'superstition'] }),
          quote('Or could it be what we, the English, have come to know as class?', 'Final rhetorical question to the audience: Russell suggests class, not superstition, killed the twins.', { who: 'Narrator', where: 'Ending', themes: ['class', 'superstition'] }),
        ],
        flashcards: cards([
          ['Where is Blood Brothers set?', 'Liverpool, from the 1950s to the 1980s.'],
          ['What superstition does Mrs Lyons invent?', 'That if twins secretly parted find out, they will both immediately die.'],
          ['How does the play open?', 'With the deaths of the twins - the rest shows how it happened (cyclical).'],
          ['What happens to Mickey after prison?', 'He becomes depressed and dependent on anti-depressants.'],
        ]),
        questions: [
          mc('Why does Russell show the twins\' deaths at the start?', ['To create dramatic irony and a sense of inevitable tragedy', 'To confuse the audience about which twin is which', 'To make the audience sympathise with Mrs Lyons first', 'To show that the play is really a comedy about class'], 'We watch knowing the outcome - focusing on WHY it happens.', { d: 2 }),
          mc('What does the Narrator\'s final question suggest killed the twins?', ['Class', 'Superstition', 'Fate', 'Mrs Lyons'], '"...what we, the English, have come to know as class?"', { d: 2 }),
          tf('Edward goes to prison for robbery.', false, 'Mickey goes to prison after the robbery with Sammy; Edward goes to university.'),
          mc('How do the twins\' adult lives differ?', ['Edward has university and a career; Mickey is unemployed and in prison', 'They lead similar lives once they leave school', 'Mickey becomes a councillor; Edward works in a factory', 'Edward joins the army; Mickey stays at home with Linda'], 'Class determines opportunity.', { d: 1 }),
        ],
      }),
      topic({
        id: 'bb-themes', title: 'Themes, context and past questions', summary: 'Class, fate/superstition, motherhood, growing up - Thatcher\'s Britain.',
        notes: `
## Themes
- **Social class**: shapes education, policing (the policeman treats the boys differently), jobs and health.
- **Fate and superstition**: Mrs Johnstone's superstitions, the Narrator, the oath on the Bible - vs the real cause, **class**.
- **Motherhood**: two very different mothers - love vs possession.
- **Childhood and growing up**: innocence of games (guns, "blood brothers") turns into real violence.
- **Friendship and brotherhood**.
- **Money**: "Easy Terms" - debt and hire purchase.

## Context
- **1980s Britain**: **Thatcher's** government; deindustrialisation; **mass unemployment** in Liverpool; recession.
- Willy Russell grew up working-class in Liverpool; left school at 15 - knew the limits class placed on people.
`,
        keyPoints: ['Class determines opportunity', 'Superstition vs class as the cause', 'Two mothers: love vs possession', 'Childhood games foreshadow violence', '1980s unemployment, Thatcher, Liverpool', 'Russell: working-class Liverpudlian'],
        pastQuestions: [
          { year: 'Jun 2017', focus: 'Effects of Mickey and Edward\'s **different upbringings** / What kind of **mother** Mrs Johnstone is' },
          { year: 'Jun 2018', focus: '**Linda** as an important character / Effects of different **family life**' },
          { year: 'Jun 2019', focus: 'The importance of **money** / How far **Mrs Lyons** is lonely and unhappy' },
          { year: 'Jun 2023', focus: 'Mrs Johnstone and Mrs Lyons as **different mothers** / How far **Edward** is likeable' },
          { year: 'Jun 2024', focus: 'Mickey\'s relationships with **his mother and Linda** / The effects of **poverty**' },
          { year: 'Jun 2025', focus: 'Changes in **Mickey and Edward\'s relationship** / The effects of **social class**' },
        ],
        flashcards: cards([
          ['What was happening in 1980s Liverpool?', 'High unemployment after factory and dock closures under Thatcher\'s government.'],
          ['What does the "Easy Terms" song show?', 'Mrs Johnstone trapped in debt from buying on hire purchase.'],
        ]),
        questions: [
          mc('How does the policeman scene show class difference?', ['He threatens Mrs Johnstone but is friendly with Mr Lyons over the same behaviour', 'He arrests Edward but lets Mickey off with a warning', 'He helps Mickey find a job after he leaves prison', 'He blames Mrs Lyons for letting the boys play together'], 'Authority treats the classes differently.', { d: 3 }),
          multi('Which are themes in Blood Brothers?', ['Social class', 'Superstition and fate', 'Motherhood'], ['Space travel', 'Medieval chivalry'], 'Class is central; superstition is a red herring.', { d: 1 }),
        ],
        examQuestions: [
          examQ('**How does Russell present the importance of superstition and fate in *Blood Brothers*?**', 34, [...LEVELS, 'Analyses the Narrator, the Bible oath, Mrs Lyons\'s lie, Mrs Johnstone\'s superstitions', 'Argues whether class is the real cause (final question)'], { meta: 'Paper 2 Section A · practice', time: 45 }),
        ],
      }),
    ],
  },
  {
    id: 'lotf', title: 'Lord of the Flies', option: { group: 'lit-modern', value: 'lotf' },
    description: 'William Golding\'s 1954 novel: boys stranded on an island descend into savagery.',
    topics: [
      topic({
        id: 'lotf-plot', title: 'Plot, characters and symbols', summary: 'Civilisation vs savagery on the island.',
        notes: `
## Plot
During a war, a plane evacuating British schoolboys crashes on a tropical island. **Ralph** finds a **conch** with **Piggy** and is elected chief. **Jack** leads the choir as hunters. They build shelters and keep a signal fire (Piggy's **glasses** light it). Jack's obsession with hunting lets the fire go out as a ship passes. Fear of a "**beast**" grows. **Simon** discovers the "beast" is a dead parachutist and that the beast is within them; returning to tell the others, he is **killed in a frenzied dance**. Jack's tribe steal Piggy's glasses. At Castle Rock, **Roger** releases a boulder that **kills Piggy and shatters the conch**. Ralph is hunted; the island burns. A **naval officer** arrives - Ralph "**wept for the end of innocence, the darkness of man's heart**".

| Character | Represents |
|---|---|
| **Ralph** | Order, democracy, civilisation; gradually loses grip. |
| **Piggy** | Intellect, reason, science; mocked and vulnerable. |
| **Jack** | Savagery, dictatorship, desire for power. |
| **Simon** | Goodness, spirituality, insight ("maybe it's only us"). |
| **Roger** | Sadism and cruelty; restrained at first by "the taboo of the old life". |
| **The littluns** | Fear, vulnerability; society's weakest. |

| Symbol | Meaning |
|---|---|
| **Conch** | Democracy, order, the right to speak - destroyed with Piggy. |
| **Piggy's glasses** | Reason, science, the means to make fire - stolen. |
| **Signal fire** | Hope of rescue and connection to civilisation. |
| **The beast** | The evil inside human beings. |
| **Lord of the Flies (pig's head)** | Beelzebub/the devil; savagery worshipped. |
`,
        keyPoints: ['Conch = democracy; shattered with Piggy\'s death', 'Glasses = reason; fire = hope', 'Jack = savagery and dictatorship', 'Simon discovers the beast is within', 'Simon and Piggy killed', 'Ending: "the end of innocence, the darkness of man\'s heart"'],
        quotes: [
          quote('Kill the pig! Cut her throat! Spill her blood!', 'The repeated chant\'s rhythm and imperatives show mob violence growing.', { who: 'The hunters', where: 'Ch 4 onwards', themes: ['savagery'] }),
          quote('Which is better - to have rules and agree, or to hunt and kill?', 'Piggy\'s rhetorical question sums up the conflict between civilisation and savagery.', { who: 'Piggy', where: 'Ch 11', themes: ['civilisation'] }),
          quote('maybe it\'s only us', 'Simon\'s insight: the beast is human evil - he is mocked for it.', { who: 'Simon', where: 'Ch 5', themes: ['human nature'] }),
          quote('Ralph wept for the end of innocence, the darkness of man\'s heart', 'Golding\'s final message: evil is innate, and civilisation is fragile.', { who: 'Narrator', where: 'Ch 12', themes: ['human nature'] }),
        ],
        flashcards: cards([
          ['What does the conch symbolise?', 'Order, democracy and the right to speak.'],
          ['What does the "Lord of the Flies" literally mean?', 'Beelzebub - a name for the devil; here a pig\'s head on a stick.'],
          ['Who kills Piggy?', 'Roger, by releasing a boulder.'],
        ]),
        questions: [
          mc('What happens to the conch when Piggy dies?', ['It is shattered - order and democracy are destroyed', 'Ralph keeps it safe as a symbol of hope', 'Jack blows it to call his tribe together', 'It washes out to sea, untouched by anyone'], 'Its destruction marks the end of civilisation on the island.', { d: 1 }),
          mc('What does Simon realise about the beast?', ['It is the evil within the boys themselves', 'It is a real animal hiding on the mountain', 'It is the ghost of the dead parachutist', 'It is Jack, who dresses up to scare them'], '"maybe it\'s only us".', { d: 2 }),
          tf('The naval officer\'s arrival suggests the adult world is free of violence.', false, 'He is part of a war - the adult world mirrors the island\'s savagery on a larger scale.', { d: 3 }),
        ],
      }),
      topic({
        id: 'lotf-themes', title: 'Themes, context and past questions', summary: 'Human nature, power, fear - Golding and WW2.',
        notes: `
## Themes
- **Civilisation vs savagery** - the veneer of civilisation is thin.
- **Human nature / evil** - Golding believed humans are inherently capable of evil.
- **Power and leadership** - democracy (Ralph) vs dictatorship (Jack).
- **Fear** - the beast as a projection of fear; fear is used to control.
- **Loss of innocence**.

## Context
- Published **1954**. **William Golding** served in the Royal Navy in **WW2** (D-Day) - he saw what humans could do; the Holocaust and atomic bomb shaped his view.
- **Cold War** fears of nuclear war; the boys are evacuated from an atomic war.
- A response to *The Coral Island* (1857), an adventure where British boys are civilised and heroic - Golding challenges British superiority ("We're English, and the English are best at everything").
- **Allegory**: the island as a microcosm of society.
`,
        keyPoints: ['Civilisation vs savagery', 'Evil is innate (Golding\'s WW2 experience)', 'Democracy vs dictatorship', 'Fear used for control', 'Responds to The Coral Island', 'Allegory/microcosm'],
        pastQuestions: [
          { year: 'Jun 2017', focus: '**Ralph** as a leader / What Golding says about **human nature**' },
          { year: 'Jun 2018', focus: '**Simon** as different / The importance of **the Beast**' },
          { year: 'Jun 2019', focus: 'How far **Piggy** has useful and important ideas / Why **society breaks up**' },
          { year: 'Jun 2023', focus: 'How far **Ralph** is a strong character / **Violence** and its effects' },
          { year: 'Jun 2024', focus: 'Ideas about **leadership** / The **littluns**, trust and fear' },
          { year: 'Jun 2025', focus: 'The changing relationship between **Ralph and Jack** / How far **Simon** explores goodness' },
        ],
        flashcards: cards([
          ['What was Golding\'s wartime experience?', 'He served in the Royal Navy in WW2, including D-Day.'],
          ['What novel was Lord of the Flies responding to?', 'The Coral Island (1857) by R.M. Ballantyne.'],
        ]),
        questions: [
          mc('Why is the island a "microcosm"?', ['It represents society in miniature', 'It is very small and easy to explore', 'It is based on a real Pacific island', 'It contains every type of habitat'], 'Golding uses it to explore how all societies work.', { d: 2 }),
          tf('Golding believed humans are naturally good and only society corrupts them.', false, 'He believed evil is innate - civilisation only restrains it.'),
        ],
        examQuestions: [examQ('**How does Golding present fear in *Lord of the Flies*?**', 34, [...LEVELS, 'Explores the beast, littluns\' fears, how Jack uses fear for power', 'Uses Simon\'s insight and the Lord of the Flies scene'], { meta: 'Paper 2 Section A · practice', time: 45 })],
      }),
    ],
  },
  {
    id: 'af', title: 'Animal Farm', option: { group: 'lit-modern', value: 'animal' },
    description: 'George Orwell\'s 1945 allegory of the Russian Revolution.',
    topics: [
      topic({
        id: 'af-plot', title: 'Plot, characters and the allegory', summary: 'From rebellion to tyranny: who represents whom.',
        notes: `
## Plot
**Old Major** dreams of a world without humans ("Beasts of England"). The animals **rebel** and drive out drunken **Mr Jones**. Pigs **Snowball** and **Napoleon** lead; the **Seven Commandments** are painted on the barn ("All animals are equal"). Snowball plans a **windmill**; Napoleon uses his trained **dogs** to chase Snowball away and becomes dictator. **Squealer** spreads propaganda. The pigs gradually break every commandment (sleep in beds, drink alcohol, trade with humans, kill animals in show trials). **Boxer**, the loyal horse ("**I will work harder**"), collapses and is sold to the knacker. At the end the pigs walk on two legs and the last commandment reads "**All animals are equal, but some animals are more equal than others.**" The animals look "**from pig to man, and from man to pig**" and can't tell the difference.

| Animal | Represents |
|---|---|
| Old Major | Karl Marx / Lenin - the revolutionary idea |
| Napoleon | **Stalin** - dictator |
| Snowball | **Trotsky** - exiled rival |
| Squealer | Propaganda (Pravda) |
| The dogs | Secret police (NKVD) |
| Boxer | Loyal, exploited working class |
| Benjamin | Cynical intellectuals who see but don't act |
| Moses (raven) | Religion ("Sugarcandy Mountain") |
| The sheep | Unthinking masses ("Four legs good, two legs bad") |
| Mr Jones | Tsar Nicholas II |
| Pilkington / Frederick | Western capitalists / Hitler |
`,
        keyPoints: ['Allegory of the Russian Revolution', 'Napoleon = Stalin; Snowball = Trotsky', 'Squealer = propaganda; dogs = secret police', 'Seven Commandments rewritten', 'Boxer: "I will work harder" - betrayed', '"some animals are more equal than others"', 'Ending: pigs indistinguishable from men'],
        quotes: [
          quote('All animals are equal, but some animals are more equal than others', 'The paradox exposes the hypocrisy of the pigs\' rule - equality has been destroyed by language manipulation.', { who: 'The final commandment', where: 'Ch 10', themes: ['power', 'equality'] }),
          quote('Four legs good, two legs bad', 'Simplistic slogan chanted by the sheep - propaganda silences debate. Later reversed.', { who: 'The sheep', where: 'Ch 3', themes: ['propaganda'] }),
          quote('I will work harder', 'Boxer\'s motto shows blind loyalty - he is exploited and finally sold to the knacker.', { who: 'Boxer', where: 'Ch 3', themes: ['exploitation'] }),
          quote('Napoleon is always right', 'Boxer\'s second motto - the cult of personality.', { who: 'Boxer', where: 'Ch 5', themes: ['power'] }),
          quote('from pig to man, and from man to pig, and from pig to man again', 'Repetition and circular structure: the revolution has come full circle - the oppressors have simply changed.', { who: 'Narrator', where: 'Ch 10', themes: ['power', 'revolution'] }),
        ],
        flashcards: cards([
          ['Who does Napoleon represent?', 'Joseph Stalin.'],
          ['Who does Snowball represent?', 'Leon Trotsky.'],
          ['What happens to Boxer?', 'He collapses and is sold to the knacker (horse slaughterer); Squealer lies that he died in hospital.'],
          ['What is the first commandment?', '"Whatever goes upon two legs is an enemy."'],
        ]),
        questions: [
          mc('What does Squealer represent?', ['Propaganda', 'Religion', 'The working class', 'Capitalism'], 'He twists facts to justify the pigs.', { d: 1 }),
          mc('What does the final scene suggest?', ['The pigs have become as oppressive as the humans', 'The revolution has finally succeeded for all', 'The animals have won freedom from the pigs', 'Snowball returns to lead a second rebellion'], 'The animals can\'t tell pigs from men - power corrupts.', { d: 2 }),
          tf('Moses the raven represents religion.', true, 'His tales of Sugarcandy Mountain distract the animals from their suffering.'),
        ],
      }),
      topic({
        id: 'af-themes', title: 'Themes, context and past questions', summary: 'Power, propaganda, equality, revolution - Orwell\'s warning.',
        notes: `
## Themes
- **Power corrupts**: the pigs become what they overthrew.
- **Propaganda and language**: Squealer, slogans, rewritten commandments, rewritten history.
- **Equality and class**: a new ruling class emerges.
- **Revolution and its betrayal**.
- **Education and ignorance**: the pigs can read; most animals can't - knowledge is power.

## Context
- Written 1943-44, published **1945**. **George Orwell** (Eric Blair) was a democratic socialist who fought against fascism in the **Spanish Civil War** and saw how Stalinists betrayed other socialists.
- A **fable/allegory** of the **Russian Revolution (1917)** and Stalin's rule: purges, show trials, famine, the Five-Year Plans (windmill).
- Hard to publish in 1945 because the USSR was Britain's **ally** in WW2.
`,
        keyPoints: ['Power corrupts', 'Propaganda and manipulation of language', 'New ruling class: inequality returns', 'Russian Revolution 1917 and Stalin', 'Orwell: democratic socialist, Spanish Civil War', 'Published 1945 when USSR was an ally'],
        pastQuestions: [
          { year: 'Jun 2017', focus: 'A shocking and unexpected **ending** / **Snowball** and leadership' },
          { year: 'Jun 2018', focus: '**Squealer**, truth and lies / Events and ideas about **revolution**' },
          { year: 'Jun 2019', focus: '**Moses and Benjamin** and attitudes to revolution / The **failure of the rebellion**' },
          { year: 'Jun 2023', focus: 'Reasons for **Snowball\'s defeat** / The **Seven Commandments**' },
          { year: 'Jun 2024', focus: '**Squealer**, power and control / The **ending** and revolution' },
          { year: 'Jun 2025', focus: '"No society can ever be truly **equal**" / How far **Napoleon** is responsible for the failure of the revolution' },
        ],
        flashcards: cards([
          ['When was Animal Farm published?', '1945.'],
          ['What war did Orwell fight in?', 'The Spanish Civil War (1936-39), against Franco\'s fascists.'],
        ]),
        questions: [
          mc('Why was Animal Farm hard to publish in 1945?', ['The USSR was Britain\'s wartime ally', 'Paper rationing stopped all new novels', 'Orwell was unknown to publishers then', 'It was far too long for a wartime book'], 'Publishers didn\'t want to criticise Stalin during the war.', { d: 2 }),
          multi('Which methods do the pigs use to control the animals?', ['Propaganda from Squealer', 'Fear of the dogs', 'Rewriting the commandments'], ['Free and fair elections', 'Teaching everyone to read'], 'Control through fear and manipulation of truth.', { d: 1 }),
        ],
        examQuestions: [examQ('**How does Orwell present the importance of education and knowledge in *Animal Farm*?**', 34, [...LEVELS, 'Explores the pigs\' literacy, Benjamin, the sheep, rewritten commandments', 'Links to Orwell\'s warning about propaganda'], { meta: 'Paper 2 Section A · practice', time: 45 })],
      }),
    ],
  },
];
