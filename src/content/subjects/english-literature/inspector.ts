import type { Unit } from '../../types';
import { cards, mc, multi, tf, topic, quote, examQ, match } from '../../dsl';

const LEVELS = [
  'Level 6 (26-30): convincing, critical argument; judicious quotations; analysis of Priestley\'s methods incl. dramatic devices; context linked to purpose',
  'Level 5 (21-25): thoughtful, developed; apt references; examination of methods',
  'Level 4 (16-20): clear, explained; effective references; clear understanding of methods',
  'Covers the whole play (Acts 1-3)', 'Writes about the play as drama (stage directions, entrances, lighting, dramatic irony)', 'Shows how characters/ideas change', 'Links to 1912 vs 1945 context and Priestley\'s purpose', 'AO4 accuracy (4 marks)',
];

export const inspectorUnit: Unit[] = [{
  id: 'aic', title: 'An Inspector Calls', option: { group: 'lit-modern', value: 'aic' },
  description: 'J.B. Priestley\'s 1945 play, set in 1912: responsibility, class and social change.',
  topics: [
    topic({
      id: 'aic-plot', title: 'Plot, structure and dramatic devices', summary: 'The three acts, the twist ending and how Priestley uses the stage.',
      notes: `
## Plot
**Act 1** - Spring **1912**, Brumley (an industrial town). The Birlings celebrate **Sheila's engagement to Gerald Croft**. **Arthur Birling** lectures about business, says war and labour unrest are nonsense and the **Titanic is "unsinkable"**. **Inspector Goole** arrives: **Eva Smith** has died after drinking disinfectant. Birling admits he **sacked her in 1910** for leading a strike for higher wages. **Sheila** recognises a photo: she had Eva sacked from **Milwards** department store out of jealousy. Gerald reacts to the name **Daisy Renton**.

**Act 2** - Gerald admits he kept Daisy as his **mistress** in spring-summer 1911, then ended it. Sheila returns the ring. **Mrs Birling**, chair of the Brumley Women's Charity Organisation, admits she **refused Eva help** when she was **pregnant**, blaming the father - who, the audience realises, is **Eric** (Act 2 ends as Eric enters).

**Act 3** - **Eric** confesses: he got Eva pregnant after drunkenly forcing his way into her lodgings, and **stole £50** from his father's office to support her. The Inspector gives his final speech ("**We are members of one body**") and leaves. Gerald returns: there is **no Inspector Goole** on the force. A phone call shows **no girl has died** in the infirmary. The older Birlings and Gerald relax; Sheila and Eric still feel responsible. **The phone rings: a girl has died and an inspector is on his way.**

## Structure and devices
- **Real time** and a single setting (the dining room) - a **well-made play** that's also a **morality play** (the Inspector exposes the "seven deadly sins").
- **Chain of events**: each Birling contributes a link to Eva's death - collective responsibility.
- **Cliffhangers** at the end of each act.
- **Dramatic irony**: Birling's predictions (Titanic, no war) - the 1945 audience knows he is wrong, so we distrust his views.
- **Lighting**: "**pink and intimate**" → "**brighter and harder**" when the Inspector arrives - scrutiny.
- **Entrances/exits** are carefully timed (e.g. Eric's entrance at the end of Act 2).
- **Cyclical ending**: the second phone call - the lesson must be learned again.
`,
      keyPoints: ['1912 setting, written 1945', 'Birling: Titanic "unsinkable", sacked Eva in 1910', 'Sheila: had Eva sacked from Milwards', 'Gerald: Daisy Renton was his mistress', 'Mrs Birling: refused help to pregnant Eva', 'Eric: father of the baby, stole £50', '"We are members of one body"', 'Twist: no Inspector Goole, then a real phone call', 'Lighting: "pink and intimate" → "brighter and harder"'],
      timeline: [
        { date: 'Act 1', event: 'Birling calls the Titanic "unsinkable"' },
        { date: 'Act 1', event: 'The Inspector arrives and describes Eva\'s death' },
        { date: 'Act 1', event: 'Sheila admits having Eva sacked from Milwards' },
        { date: 'Act 2', event: 'Gerald admits Daisy Renton was his mistress' },
        { date: 'Act 2', event: 'Mrs Birling admits refusing Eva charity' },
        { date: 'Act 3', event: 'Eric confesses and admits stealing money' },
        { date: 'Act 3', event: 'The Inspector\'s final speech' },
        { date: 'Act 3', event: 'The final phone call announces a real inspector' },
      ],
      flashcards: cards([
        ['When is the play set and when was it written/performed?', 'Set in 1912; written in 1945, first performed 1945 (Moscow) and 1946 (London).'],
        ['Why did Birling sack Eva Smith?', 'She was a ringleader of a strike for higher wages (25 shillings a week instead of 22 and 6).'],
        ['Why did Sheila have Eva sacked?', 'Jealousy - Eva smiled when a dress suited her better; Sheila was in a bad temper.'],
        ['What name did Eva use with Gerald?', 'Daisy Renton.'],
        ['How much did Eric steal?', 'About £50 from his father\'s office.'],
        ['How does the lighting change?', '"pink and intimate" (rose-tinted complacency) → "brighter and harder" when the Inspector arrives.'],
      ]),
      questions: [
        mc('What is the effect of Birling calling the Titanic "unsinkable"?', ['Dramatic irony: the audience knows it sank, so Birling\'s judgement is undermined', 'It makes Birling seem wise and sensible about business and the future', 'It is a joke the Inspector tells to make the family relax', 'It shows that Birling has invested in the Titanic\'s shipping line'], 'Priestley makes the capitalist voice look foolish so we reject his views.', { d: 2 }),
        mc('Who is the father of Eva\'s baby?', ['Eric', 'Gerald', 'Mr Birling', 'The Inspector'], 'Revealed in Act 3; Mrs Birling unknowingly condemned her own son.', { d: 1 }),
        tf('The play is set in 1945.', false, 'Set in 1912, written in 1945 - the gap lets the audience see the Birlings\' mistakes in hindsight.'),
        ord_q(),
        mc('Why does the lighting become "brighter and harder" when the Inspector arrives?', ['To show scrutiny and the exposure of truth', 'To show the family\'s warm, celebratory mood', 'To show that time has passed and night has fallen', 'To soften the mood after the engagement'], '"Pink and intimate" suggests a rose-tinted view; the harsh light interrogates.', { d: 2 }),
        mc('What is the effect of the final phone call?', ['It is cyclical: the lesson must be faced again, especially by those who didn\'t learn', 'It shows the whole story was a dream that Sheila had', 'It proves the Inspector was a real police officer all along', 'It ends the play happily as the family celebrate the engagement'], 'Priestley denies the older Birlings their escape.', { d: 3 }),
      ],
    }),
    topic({
      id: 'aic-characters', title: 'The Inspector and the Birlings', summary: 'Who changes, who doesn\'t - and why.',
      notes: `
| Character | Key ideas |
|---|---|
| **Inspector Goole** | Priestley's **mouthpiece** for socialism. "Creates at once an impression of **massiveness, solidity and purposefulness**." Controls the pace: "One person and one line of inquiry at a time." Name puns on "**ghoul**" - supernatural? Final speech: "**We are members of one body. We are responsible for each other... fire and blood and anguish**" - foreshadows the World Wars. |
| **Arthur Birling** | Capitalist, self-made, socially insecure (wants a knighthood). "**A man has to mind his own business and look after himself and his own**." Dismissive: "**community and all that nonsense**". Doesn't change - relieved at the end and mocks Sheila and Eric. |
| **Sybil Birling** | Snobbish, "her husband's social superior". "**Girls of that class**". Refuses Eva help; blames the father - **dramatic irony**. Doesn't change: "I was the only one of you who didn't give in to him." |
| **Sheila** | Starts "pleased with life and rather excited", childish ("Mummy"). Feels genuine guilt: "**I'll never, never do it again**". Becomes perceptive and challenges her parents: "**You're pretending everything's just as it was before**." Represents the **hope of the younger generation**. |
| **Eric** | "Half shy, half assertive", drinks heavily. Guilty of serious wrongdoing, yet takes responsibility and condemns his parents: "**the fact remains that I did what I did**." Changes. |
| **Gerald Croft** | Upper-class, polished, Birling's ideal son-in-law. Showed Eva some kindness but used her. Investigates the hoax and is keen to return to normal - **doesn't really change**. |
| **Eva Smith / Daisy Renton** | Never seen - she represents **all exploited working-class women** ("there are millions and millions of Eva Smiths and John Smiths"). |
| **Edna** | The maid - a silent reminder of the working class serving the Birlings. |
`,
      keyPoints: ['Inspector = Priestley\'s mouthpiece; "massiveness, solidity and purposefulness"', '"We are members of one body"', 'Birling: "look after himself and his own"; doesn\'t change', 'Mrs Birling: "Girls of that class"; doesn\'t change', 'Sheila: childish → perceptive; changes', 'Eric: takes responsibility; changes', 'Gerald: tries to restore normality; doesn\'t really change', 'Eva represents "millions and millions of Eva Smiths"'],
      quotes: [
        quote('massiveness, solidity and purposefulness', 'Stage direction: the Inspector\'s presence dominates - abstract nouns make him a symbol of moral authority.', { who: 'The Inspector', where: 'Act 1 (stage direction)', themes: ['responsibility'] }),
        quote('We are members of one body. We are responsible for each other', 'Religious/collective imagery: society as a single body - Priestley\'s socialist message.', { who: 'The Inspector', where: 'Act 3', themes: ['responsibility', 'socialism'] }),
        quote('fire and blood and anguish', 'Polysyndeton foreshadows the two World Wars - a warning to the 1945 audience about selfishness.', { who: 'The Inspector', where: 'Act 3', themes: ['responsibility'] }),
        quote('a man has to mind his own business and look after himself and his own', 'Birling\'s capitalist individualism - the exact attitude the play attacks.', { who: 'Mr Birling', where: 'Act 1', themes: ['class', 'capitalism'] }),
        quote('community and all that nonsense', 'Dismissive noun phrase: Birling mocks collective responsibility - dramatic irony as the Inspector arrives.', { who: 'Mr Birling', where: 'Act 1', themes: ['responsibility'] }),
        quote('Girls of that class', 'Mrs Birling\'s snobbery dehumanises Eva - class prejudice.', { who: 'Mrs Birling', where: 'Act 2', themes: ['class', 'gender'] }),
        quote('But these girls aren\'t cheap labour - they\'re people', 'Sheila\'s growing empathy - she sees workers as humans, not resources.', { who: 'Sheila', where: 'Act 1', themes: ['class', 'responsibility'] }),
        quote('the fact remains that I did what I did', 'Eric accepts responsibility; the repetition "I did what I did" is blunt and honest.', { who: 'Eric', where: 'Act 3', themes: ['responsibility', 'age'] }),
      ],
      flashcards: cards([
        ['What does "Goole" sound like?', '"Ghoul" - a ghost or spirit, suggesting the Inspector may be supernatural.'],
        ['Which characters change?', 'Sheila and Eric (the younger generation).'],
        ['Which characters don\'t change?', 'Mr and Mrs Birling, and (largely) Gerald.'],
        ['What does Mrs Birling chair?', 'The Brumley Women\'s Charity Organisation.'],
      ]),
      questions: [
        mc('What does the Inspector represent for Priestley?', ['Priestley\'s own socialist views and conscience', 'The capitalist class Priestley admired', 'The corruption of the police force', 'The older generation\'s sense of duty'], 'He is Priestley\'s mouthpiece - delivering the play\'s message.', { d: 2 }),
        mc('How does Sheila change?', ['From childish and self-centred to perceptive and morally responsible', 'From kind and generous to cruel and self-centred', 'She doesn\'t change: she stays loyal to her parents\' views', 'From confident and outspoken to quiet and obedient'], 'She ends challenging her parents\' refusal to learn.', { d: 1 }),
        tf('Mr Birling accepts responsibility for Eva\'s death by the end.', false, 'He is relieved when it seems a hoax and worries about the scandal and his knighthood.'),
        match('Match the character to their attitude at the end.', [['Mr Birling', 'Relieved - "the whole story\'s just a lot of moonshine"'], ['Sheila', 'Still feels responsible'], ['Eric', 'Condemns his parents'], ['Gerald', 'Wants things back to normal']], 'The generational divide is Priestley\'s point: hope lies with the young.', { d: 3 }),
        mc('Why does Eva Smith never appear on stage?', ['So she can represent all exploited working-class people', 'So the audience will blame the Inspector for her death', 'Because her story is a rumour the family made up', 'To keep the focus on Sheila as the central character'], '"Millions and millions of Eva Smiths" - she is symbolic.', { d: 2 }),
      ],
    }),
    topic({
      id: 'aic-themes', title: 'Themes and context', summary: 'Responsibility, class, gender, age - 1912 vs 1945.',
      notes: `
## Themes
- **Responsibility** (individual and collective): everyone shares in Eva's death; society must care for its weakest.
- **Class**: the upper/middle classes exploit and look down on the working class (Birling's profits, Mrs Birling's prejudice).
- **Gender**: Eva is vulnerable as a working-class woman; Sheila is patronised ("the women"), but grows in strength; Mrs Birling upholds patriarchal values.
- **Age/generations**: the young can change; the old are stubborn - hope for the future.
- **Time**: the 1912/1945 gap; the "time play" ending (Priestley was interested in theories of time).
- **Hypocrisy and appearance**: respectable family hiding sexual exploitation, drunkenness and theft.

## Context
| 1912 (setting) | 1945 (writing / first audience) |
|---|---|
| Rigid class system; **no welfare state** | End of **WW2**; Labour landslide victory (July 1945) |
| Women couldn't vote; few rights | Women had worked in war; more equality |
| Capitalism unchecked; workers had little protection; strikes | Desire for a fairer society; **NHS (1948)** and welfare state created soon after |
| Titanic sank (April 1912); WW1 began 1914 | Audience has lived through two world wars |

**J.B. Priestley** (1894-1984): served in WW1, a **socialist**; his WW2 radio broadcasts (*Postscripts*) argued for a fairer post-war Britain. Co-founded the Common Wealth Party (1942).

:::tip Purpose
Priestley sets the play in 1912 so the 1945 audience can see where selfishness led ("fire and blood and anguish") and choose a better, collective future.
:::
`,
      keyPoints: ['Collective responsibility is the central message', 'Class exploitation and prejudice', 'Gender: Eva\'s vulnerability; Sheila\'s growth', 'Generations: young change, old don\'t', '1912 setting vs 1945 audience', 'Priestley: socialist, WW1 veteran, Postscripts broadcasts', 'Labour 1945, welfare state, NHS 1948'],
      flashcards: cards([
        ['What happened in British politics in 1945?', 'The Labour Party won a landslide, leading to the welfare state and the NHS (1948).'],
        ['What were Priestley\'s Postscripts?', 'WW2 radio talks in which he argued for a fairer, more equal society after the war.'],
        ['Why set the play in 1912?', 'So the audience, with hindsight of two world wars, can see the consequences of selfish capitalism.'],
      ]),
      questions: [
        mc('What was Priestley\'s political view?', ['Socialist - he believed in collective responsibility', 'Capitalist - he believed in self-reliance and profit', 'Liberal - he believed in free trade and charity', 'Conservative - he believed in tradition and class'], 'The Inspector voices his beliefs.', { d: 1 }),
        mc('Why would a 1945 audience distrust Mr Birling?', ['They knew his predictions (no war, Titanic unsinkable) were wrong', 'He was based on a real criminal the audience knew about', 'The actor playing him was famous for playing villains', 'He agreed with the Inspector, which seemed weak to them'], 'Dramatic irony undermines capitalism\'s spokesman.', { d: 2 }),
        multi('Which are examples of gender inequality in the play?', ['Eva\'s vulnerability to men with money and power', 'Mr Birling\'s comment that women need clothes to feel worthwhile', 'Women\'s lack of rights in 1912'], ['Sheila becoming Prime Minister'], 'Priestley exposes how women - especially working-class women - were exploited.', { d: 2 }),
        tf('The NHS already existed in 1912.', false, 'The NHS began in 1948 - part of the post-war welfare state Priestley\'s message supported.'),
      ],
    }),
    topic({
      id: 'aic-exam', title: 'An Inspector Calls: past questions and exam practice', summary: 'Every recent AQA question; two essays per year, choose one.',
      notes: `
Paper 2 Section A: **no extract**. Choose ONE of two questions. **30 marks + 4 AO4**. About 45 minutes.

:::tip Writing about a play
Refer to it as a **play** for an **audience**: stage directions, lighting, entrances and exits, dramatic irony, the Inspector's control of pace, cliffhangers. This lifts AO2.
:::
`,
      keyPoints: ['No extract - you need quotes from memory', 'Choose one of two questions', 'Write about stage directions and dramatic devices', 'Always link to 1912/1945 and Priestley\'s purpose'],
      pastQuestions: [
        { year: 'Jun 2017', focus: 'How far is Mrs Birling an **unlikeable** character? / The **Inspector** suggesting ways society could be improved' },
        { year: 'Jun 2018', focus: 'How far **Eric changes** his attitudes / The importance of **social class**' },
        { year: 'Jun 2019', focus: '**Selfishness** and its effects / **Sheila** learning important lessons' },
        { year: 'Nov 2020', focus: 'How far **Mr Birling** cares only for himself and his family / **Male characters** as irresponsible' },
        { year: 'Nov 2021', focus: '**Gerald** and responsibility / How far **society** is presented as **unfair**' },
        { year: 'Jun 2022', focus: '**Eric** learning important lessons about society / "**Inequality** in society leads to tragedy"' },
        { year: 'Jun 2023', focus: 'What life is like for **women** / How **older and younger** characters respond to the Inspector' },
        { year: 'Jun 2024', focus: '**Mrs Birling** and social class / The **Inspector** and the need for **social change**' },
        { year: 'Jun 2025', focus: '**Gerald and Sheila\'s** changing relationship / Ideas about **power**' },
      ],
      questions: [
        mc('How many questions on An Inspector Calls do you answer?', ['One, from a choice of two', 'Two, both compulsory', 'One, with no choice', 'One extract question and one essay'], 'Choose the question you can argue best.', { d: 1 }),
      ],
      examQuestions: [
        examQ('**How does Priestley use the character of the Inspector to explore ideas about responsibility?**\n\nWrite about:\n- what the Inspector says and does\n- how Priestley presents the Inspector.', 34, [
          ...LEVELS,
          'Analyses the Inspector\'s entrance stage directions and lighting change',
          'Explores his methods: photograph, "one line of inquiry at a time", controlling pace',
          'Analyses the final speech: "members of one body", "fire and blood and anguish"',
          'Considers his mysterious nature (Goole/ghoul) and purpose as Priestley\'s mouthpiece',
        ], { meta: 'Paper 2 Section A · practice question', time: 45, model: 'Priestley constructs the Inspector as the embodiment of conscience: an almost supernatural moral force who dismantles the Birlings\' complacency and leaves the audience, rather than the characters, to decide whether they will accept responsibility.\n\nFrom his entrance, Priestley signals the Inspector\'s authority through stage directions that he "need not be a big man but... creates at once an impression of massiveness, solidity and purposefulness". The abstract nouns make him less a person than an idea - a moral weight pressing on the family. The lighting shift from "pink and intimate" to "brighter and harder" visually dramatises this scrutiny: the rose-tinted world of Birling\'s capitalist confidence is exposed...' }),
        examQ('**How does Priestley present the differences between the older and younger generations in *An Inspector Calls*?**', 34, [
          ...LEVELS,
          'Contrasts Sheila and Eric\'s changes with Mr and Mrs Birling\'s refusal',
          'Uses the ending (Act 3) as key evidence',
          'Considers Gerald as between the generations',
          'Context: hope for post-war youth; Priestley\'s socialism',
        ], { meta: 'Paper 2 Section A · practice question', time: 45 }),
      ],
    }),
  ],
}];

function ord_q() {
  return {
    type: 'order' as const,
    q: 'Put the Birlings\' involvement with Eva in chronological order (by when it happened to her).',
    items: ['Mr Birling sacks her from his works (1910)', 'Sheila has her sacked from Milwards (Jan 1911)', 'Gerald keeps her as his mistress (spring-summer 1911)', 'Eric gets her pregnant (Nov 1911)', 'Mrs Birling refuses her charity (2 weeks before her death)'],
    why: 'The Inspector questions them in this order - building a chain of responsibility.',
    d: 3,
  };
}
