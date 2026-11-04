import type { Unit } from '../../types';
import { cards, mc, multi, tf, topic, quote, examQ, match } from '../../dsl';

const LEVELS = [
  'Level 6 (26-30): convincing, critical argument; judicious quotations; analysis of methods; context linked to purpose',
  'Level 5 (21-25): thoughtful, developed; apt references; examination of methods',
  'Level 4 (16-20): clear, explained; effective references; clear understanding of methods',
  'Covers the extract in detail', 'Covers the play as a whole', 'Shows development/change across the play', 'Offers alternative interpretations', 'AO4 accuracy (4 marks)',
];

export const romeoUnit: Unit[] = [{
  id: 'rj', title: 'Romeo and Juliet', option: { group: 'lit-shakespeare', value: 'romeo' },
  description: 'Shakespeare\'s tragedy of young love and family feud (c.1595).',
  topics: [
    topic({
      id: 'rj-plot', title: 'Plot and structure', summary: 'The five acts, the Prologue and the tragic structure.',
      notes: `
## The Prologue
A **sonnet** spoken by the Chorus: it tells us the "**star-crossed lovers**" will die and their deaths will end their parents' feud. The audience knows the ending from the start - **dramatic irony** runs through the whole play.

| Act | What happens |
|---|---|
| **1** | A street brawl between Montague and Capulet servants; Prince Escalus threatens death for further fighting. Romeo is lovesick over **Rosaline**. Paris asks to marry Juliet. Romeo gatecrashes the **Capulet feast**, meets Juliet - their first conversation is a **shared sonnet**. Tybalt recognises Romeo and is furious. |
| **2** | The **balcony scene**: they declare love and plan to marry. **Friar Laurence** agrees, hoping to end the feud. The **Nurse** carries messages. They marry secretly. |
| **3** | Tybalt challenges Romeo, who refuses (he's now Tybalt's kinsman). **Mercutio fights Tybalt and is killed** ("A plague o' both your houses!"). Romeo kills Tybalt and is **banished** to Mantua. The couple spend one night together. Capulet orders Juliet to marry **Paris** on Thursday; she refuses and he rages at her. |
| **4** | Friar gives Juliet a **potion** to fake death. She takes it; the family find her "dead" on her wedding morning. |
| **5** | The Friar's letter fails to reach Romeo (plague). Balthasar tells Romeo Juliet is dead. Romeo buys poison, kills **Paris** at the tomb, drinks poison and dies. Juliet wakes, sees Romeo dead and **stabs herself**. The families **reconcile**. |

## Structure
- **Tragedy compressed into four days** - haste and time pressure drive events.
- **Fate vs choice**: the Prologue frames events as destined; impulsive decisions make them happen.
- **Turning point**: Act 3 Scene 1 - Mercutio's death turns a romantic comedy-like first half into tragedy.
- **Light/dark** contrasts: the lovers meet at night; their love is bright against darkness.
`,
      keyPoints: ['Prologue: "star-crossed lovers" - we know the ending', 'Act 1: brawl, Rosaline, feast, shared sonnet', 'Act 2: balcony, secret marriage', 'Act 3 Scene 1: Mercutio and Tybalt die, Romeo banished - turning point', 'Capulet forces marriage to Paris', 'Act 4: potion; Act 5: letter fails, double suicide, reconciliation', 'Whole play takes about four days'],
      timeline: [
        { date: 'Prologue', event: 'The Chorus calls them "star-crossed lovers"' },
        { date: '1.1', event: 'Street brawl; the Prince threatens death for further fighting' },
        { date: '1.5', event: 'Romeo and Juliet meet at the Capulet feast' },
        { date: '2.2', event: 'The balcony scene' },
        { date: '2.6', event: 'Romeo and Juliet marry secretly' },
        { date: '3.1', event: 'Mercutio and Tybalt are killed; Romeo is banished' },
        { date: '3.5', event: 'Capulet rages at Juliet for refusing to marry Paris' },
        { date: '4.3', event: 'Juliet drinks the Friar\'s potion' },
        { date: '5.1', event: 'Romeo hears Juliet is "dead" and buys poison' },
        { date: '5.3', event: 'Romeo and Juliet die in the tomb; the families reconcile' },
      ],
      flashcards: cards([
        ['What form is the Prologue?', 'A sonnet - a love poem form used to introduce a tragedy.'],
        ['Who does Romeo love at the start?', 'Rosaline, who has sworn to stay chaste.'],
        ['Who kills Mercutio?', 'Tybalt, under Romeo\'s arm as Romeo tries to stop the fight.'],
        ['Why does the Friar\'s plan fail?', 'Friar John is quarantined because of plague, so the letter never reaches Romeo.'],
        ['How long do the events of the play take?', 'About four days - Sunday to Thursday morning.'],
      ]),
      questions: [
        mc('What is the effect of the Prologue telling us the ending?', ['Dramatic irony: we watch the lovers knowing they are doomed', 'It removes all tension', 'It shows the play is a comedy', 'It introduces Rosaline'], 'Knowing the end makes every hopeful moment painful.', { d: 2 }),
        mc('Which scene is the turning point of the play?', ['Act 3 Scene 1 - the deaths of Mercutio and Tybalt', 'Act 1 Scene 5 - the feast', 'Act 5 Scene 3 - the tomb', 'Act 2 Scene 2 - the balcony'], 'After Mercutio\'s curse and Romeo\'s banishment, events slide into tragedy.', { d: 2 }),
        tf('Romeo and Juliet\'s first conversation forms a sonnet.', true, 'They share a 14-line sonnet (1.5), showing they are perfectly matched.', { d: 3 }),
        mc('Why is Romeo banished rather than executed?', ['The Prince shows mercy because Tybalt killed Mercutio first', 'Capulet asks for mercy', 'Juliet begs the Prince', 'Romeo escapes before he is caught'], 'Tybalt killed the Prince\'s kinsman Mercutio, so Romeo\'s revenge is partly understood.', { d: 3 }),
        mc('How do the families respond at the end?', ['They reconcile and promise golden statues of each other\'s child', 'They continue fighting', 'They blame the Nurse', 'They leave Verona'], 'The tragedy achieves what the lovers could not alive - peace.', { d: 1 }),
      ],
    }),
    topic({
      id: 'rj-romeo', title: 'Romeo', summary: 'Impulsive, passionate, poetic - and changed by love.',
      notes: `
## Character arc
- **Lovesick (Act 1)**: melancholy over Rosaline, using clichéd **Petrarchan** language and **oxymorons**: "O brawling love! O loving hate!" - love as confusion.
- **Transformed (1.5-2.2)**: on seeing Juliet - "**O, she doth teach the torches to burn bright!**" - light imagery replaces clichés. He is sincere but **impulsive**: he forgets Rosaline instantly.
- **Peacemaker turned avenger (3.1)**: refuses to fight Tybalt ("I do protest I never injured thee"), but after Mercutio's death: "**fire-eyed fury be my conduct now**" - then "**O, I am fortune's fool!**"
- **Desperate (3.3)**: banishment is "**death**" to him; he falls weeping, threatens suicide.
- **Defiant (5.1-5.3)**: "Then **I defy you, stars!**" - he acts rashly, killing Paris and himself.

## How Shakespeare presents him
- A young man ruled by **emotion and haste** (the Friar: "Wisely and slow; they stumble that run fast").
- His language matures: from Petrarchan clichés to genuine, inventive imagery of light.
- He blames **fate** ("fortune's fool") but his choices drive the tragedy.
`,
      keyPoints: ['Lovesick over Rosaline: oxymorons, Petrarchan clichés', '"she doth teach the torches to burn bright" - light imagery', 'Impulsive: forgets Rosaline, marries within a day', 'Refuses Tybalt, then "fire-eyed fury" after Mercutio dies', '"I am fortune\'s fool" - blames fate', '"I defy you, stars!" - defiance of fate'],
      quotes: [
        quote('O brawling love! O loving hate!', 'Oxymorons show his confused, clichéd idea of love for Rosaline - and foreshadow how love and hate will intertwine.', { who: 'Romeo', where: '1.1', themes: ['love', 'conflict'] }),
        quote('O, she doth teach the torches to burn bright!', 'Hyperbolic light imagery: Juliet outshines the torches. His language becomes fresh and sincere.', { who: 'Romeo', where: '1.5', themes: ['love'] }),
        quote('But soft, what light through yonder window breaks? It is the east, and Juliet is the sun', 'Metaphor: Juliet is the sun - the centre of his world, life-giving, bringing light into darkness.', { who: 'Romeo', where: '2.2', themes: ['love'] }),
        quote('fire-eyed fury be my conduct now', 'Fire imagery and alliteration show rage taking over - he abandons peace to avenge Mercutio.', { who: 'Romeo', where: '3.1', themes: ['conflict', 'masculinity'] }),
        quote('O, I am fortune\'s fool!', 'He sees himself as a plaything of fate - but he chose to kill Tybalt.', { who: 'Romeo', where: '3.1', themes: ['fate'] }),
        quote('Then I defy you, stars!', 'Defiance of fate - ironically his rash response fulfils the "star-crossed" prophecy.', { who: 'Romeo', where: '5.1', themes: ['fate'] }),
        quote('Thus with a kiss I die', 'Final rhyming echo of their first kiss - love and death are united.', { who: 'Romeo', where: '5.3', themes: ['love', 'death'] }),
      ],
      flashcards: cards([
        ['What is Petrarchan love language?', 'Clichéd, exaggerated poetry about unrequited love for an unattainable woman - like Romeo\'s talk of Rosaline.'],
        ['Why does Romeo refuse to fight Tybalt at first?', 'He has just secretly married Juliet, Tybalt\'s cousin, so Tybalt is now his kinsman.'],
        ['What does Romeo say after killing Tybalt?', '"O, I am fortune\'s fool!"'],
      ]),
      questions: [
        mc('What do Romeo\'s oxymorons in Act 1 Scene 1 suggest?', ['His love for Rosaline is confused and clichéd', 'He hates Juliet', 'He is a skilled fighter', 'He is happy and content'], '"O brawling love! O loving hate!" - conventional, self-indulgent misery.', { d: 2 }),
        mc('How does Romeo\'s language change when he meets Juliet?', ['It becomes fresher, full of light imagery', 'It becomes more violent', 'He stops speaking in verse', 'He uses only oxymorons'], 'Light imagery ("teach the torches to burn bright") shows sincere wonder.', { d: 2 }),
        tf('Romeo initially tries to avoid fighting Tybalt in Act 3 Scene 1.', true, 'He says he loves Tybalt "better than thou canst devise" - because they are now related by marriage.'),
        mc('How could you argue Romeo is responsible for the tragedy?', ['His impulsive choices - killing Tybalt, rushing to the tomb - drive events', 'He follows the Friar\'s advice carefully', 'He never acts without thinking', 'The Prologue says he is innocent'], 'Fate frames the play, but Romeo\'s haste makes it happen.', { d: 3 }),
      ],
    }),
    topic({
      id: 'rj-juliet', title: 'Juliet', summary: 'From obedient daughter to independent, determined young woman.',
      notes: `
## Character arc
- **Obedient (1.3)**: aged 13 ("not fourteen"); on marriage to Paris: "**I'll look to like, if looking liking move**" - dutiful and cautious.
- **Passionate but practical (2.2)**: "**Wherefore art thou Romeo?**" (why are you a Montague?); "What's in a name? That which we call a rose / By any other word would smell as sweet." She is the one who proposes marriage and worries it is "**too rash, too unadvised, too sudden**".
- **Torn (3.2)**: oxymorons about Romeo after Tybalt's death - "**Beautiful tyrant! fiend angelical!**" - but loyalty to her husband wins.
- **Defiant (3.5)**: refuses Paris; Capulet calls her "disobedient wretch" and threatens to disown her. Her mother and **Nurse abandon her** - she is alone.
- **Courageous (4.3)**: faces terrifying fears of waking in the tomb, then drinks the potion.
- **Final act (5.3)**: "**O happy dagger!**" - she chooses death with Romeo.

## How Shakespeare presents her
- Matures rapidly: from passive daughter to a woman making life-or-death choices.
- More **rational** than Romeo (she sees the danger of haste), yet equally committed.
- Highlights the **lack of power** of young women in a patriarchal society: her father treats her as property.
- Uses **double meanings** to deceive her mother (3.5) - shows intelligence.

:::exam Past focuses
Juliet as a **female character with strong emotions** (2021), Juliet's **feelings towards Romeo** (2023), the **difficulties faced by Juliet** (2024), **parents and children** (2025).
:::
`,
      keyPoints: ['13 years old; initially obedient: "I\'ll look to like"', '"What\'s in a name?" - rejects family identity', 'Proposes marriage but fears it is "too rash"', 'Oxymorons in 3.2: "Beautiful tyrant!"', 'Defies Capulet in 3.5; abandoned by Nurse and mother', 'Courage in the potion scene (4.3)', '"O happy dagger!"'],
      quotes: [
        quote('I\'ll look to like, if looking liking move', 'Polyptoton (look/looking, like/liking) shows cautious obedience to her mother at the start.', { who: 'Juliet', where: '1.3', themes: ['family', 'obedience'] }),
        quote('My only love sprung from my only hate!', 'Antithesis captures the central conflict of love vs feud.', { who: 'Juliet', where: '1.5', themes: ['love', 'conflict'] }),
        quote('What\'s in a name? That which we call a rose by any other word would smell as sweet', 'She argues that family names are meaningless labels - a radical rejection of family identity and honour.', { who: 'Juliet', where: '2.2', themes: ['love', 'family'] }),
        quote('It is too rash, too unadvised, too sudden', 'Tricolon of "too" shows her practicality and foreshadows the danger of haste.', { who: 'Juliet', where: '2.2', themes: ['time', 'love'] }),
        quote('Beautiful tyrant! fiend angelical!', 'Oxymorons show her shock and conflicting feelings after Romeo kills Tybalt.', { who: 'Juliet', where: '3.2', themes: ['love', 'conflict'] }),
        quote('O happy dagger, this is thy sheath', 'Shocking oxymoron "happy dagger": death is welcome as reunion with Romeo.', { who: 'Juliet', where: '5.3', themes: ['love', 'death'] }),
      ],
      flashcards: cards([
        ['How old is Juliet?', 'Thirteen - "not fourteen".'],
        ['What does "Wherefore art thou Romeo?" mean?', 'Why are you Romeo (a Montague)? - not "where are you?"'],
        ['Who abandons Juliet in Act 3 Scene 5?', 'Her mother and then the Nurse, who advises her to marry Paris.'],
      ]),
      questions: [
        mc('What does "Wherefore art thou Romeo?" mean?', ['Why are you Romeo - a Montague?', 'Where are you, Romeo?', 'Are you Romeo?', 'Come here, Romeo'], '"Wherefore" means "why" - she laments that he belongs to the enemy family.', { d: 1 }),
        mc('How does Juliet change between Act 1 Scene 3 and Act 3 Scene 5?', ['From obedient daughter to defiant, independent woman', 'From defiant to obedient', 'She does not change', 'From happy to bored'], 'She moves from "I\'ll look to like" to refusing her father\'s choice of husband.', { d: 2 }),
        tf('The Nurse supports Juliet\'s refusal to marry Paris to the end.', false, 'In 3.5 the Nurse advises her to marry Paris ("I think it best you married with the County") - Juliet feels betrayed.', { d: 2 }),
        mc('Why is Juliet\'s potion speech (4.3) significant?', ['It shows her courage in facing terrifying fears alone', 'It shows she is happy to marry Paris', 'It is spoken to the Nurse', 'It is comic relief'], 'She imagines waking among corpses and Tybalt\'s body, yet drinks - remarkable bravery.', { d: 3 }),
      ],
    }),
    topic({
      id: 'rj-others', title: 'Mercutio, Tybalt, the Nurse, the Friar and the Capulets', summary: 'Supporting characters who shape the tragedy.',
      notes: `
| Character | Role and key ideas |
|---|---|
| **Mercutio** | Romeo's witty friend, kinsman of the Prince (neutral). Mocks romantic love; the **Queen Mab** speech. Fights Tybalt; dying curse "**A plague o' both your houses!**" blames both families - foreshadows the tragedy. His death pushes Romeo to violence. |
| **Tybalt** | Juliet's hot-tempered cousin, obsessed with **honour**: "**peace? I hate the word, / As I hate hell, all Montagues, and thee.**" Represents the feud's destructive masculinity. |
| **Benvolio** | Name means "good will" - the peacemaker: "I do but keep the peace". |
| **The Nurse** | Comic, bawdy, loving surrogate mother; Juliet's confidante and messenger. Betrays her trust in 3.5 by advising marriage to Paris - pragmatic but hurtful. |
| **Friar Laurence** | Well-meaning priest, hopes the marriage will end the feud. Warns "**Wisely and slow; they stumble that run fast**" - but his own rushed plans (potion) fail. Flees the tomb. |
| **Lord Capulet** | Seems caring at first ("My child is yet a stranger in the world") - but becomes tyrannical when defied: "**hang, beg, starve, die in the streets**". Shows patriarchal control. |
| **Lady Capulet** | Distant mother; the Nurse is closer to Juliet. "I would the fool were married to her grave" - dramatic irony. |
| **Paris** | Suitable, wealthy suitor; treats Juliet as already his. Killed by Romeo at the tomb. |
| **Prince Escalus** | Authority and order; ends with "**All are punished**". |
`,
      keyPoints: ['Mercutio: "A plague o\' both your houses!" - curse/foreshadowing', 'Tybalt: "peace? I hate the word"', 'Benvolio: peacemaker', 'Nurse: comic surrogate mother who betrays Juliet in 3.5', 'Friar: "Wisely and slow" - yet his plans are rushed', 'Capulet: caring father turned tyrant', 'Prince: "All are punished"'],
      quotes: [
        quote('A plague o\' both your houses!', 'Repeated curse blaming both families - a prophecy fulfilled by the lovers\' deaths.', { who: 'Mercutio', where: '3.1', themes: ['conflict', 'fate'] }),
        quote('peace? I hate the word, as I hate hell, all Montagues, and thee', 'Tybalt equates peace with hell - honour and hatred define him.', { who: 'Tybalt', where: '1.1', themes: ['conflict'] }),
        quote('Wisely and slow; they stumble that run fast', 'Advice that warns against haste - dramatic irony as everyone (including the Friar) rushes.', { who: 'Friar Laurence', where: '2.3', themes: ['time'] }),
        quote('hang, beg, starve, die in the streets', 'Asyndetic list of brutal fates: Capulet treats Juliet as property to be disposed of.', { who: 'Capulet', where: '3.5', themes: ['family', 'parents'] }),
        quote('I think it best you married with the County', 'The Nurse\'s pragmatism betrays Juliet\'s trust - leaving her isolated.', { who: 'Nurse', where: '3.5', themes: ['family'] }),
        quote('All are punished', 'The Prince\'s final judgement: the feud has destroyed both families.', { who: 'Prince', where: '5.3', themes: ['conflict'] }),
      ],
      flashcards: cards([
        ['What does Benvolio\'s name mean?', '"Good will" - he is the peacemaker.'],
        ['What is the Queen Mab speech?', 'Mercutio\'s fantastical speech about a fairy who brings dreams - showing his wit and cynicism about love.'],
        ['How does the Nurse betray Juliet?', 'She advises her to marry Paris after Romeo is banished.'],
        ['How does Capulet react to Juliet\'s refusal?', 'With rage: insults ("green-sickness carrion") and threatens to throw her out: "hang, beg, starve, die in the streets".'],
      ]),
      questions: [
        mc('Why is Mercutio\'s death so important?', ['It drives Romeo to kill Tybalt, leading to his banishment', 'It ends the feud', 'It makes Juliet hate Romeo', 'It is a comic moment'], 'It is the turning point: love gives way to revenge.', { d: 2 }),
        mc('What does Capulet\'s outburst in 3.5 reveal about Elizabethan fathers?', ['They had near-total authority over daughters\' marriages', 'They let daughters choose freely', 'They had no interest in marriage', 'They were legally powerless'], 'Daughters were expected to obey; disobedience could mean being disowned.', { d: 2 }),
        match('Match each character to their attitude.', [['Tybalt', 'Hates peace'], ['Benvolio', 'Keeps the peace'], ['Friar Laurence', 'Advises caution'], ['Mercutio', 'Mocks romantic love']], 'These attitudes create contrasts with Romeo.', { d: 2 }),
        tf('Friar Laurence stays in the tomb with Juliet at the end.', false, 'He flees when he hears the watch coming - leaving Juliet alone.', { d: 2 }),
      ],
    }),
    topic({
      id: 'rj-themes', title: 'Themes: love, conflict, fate, family and time', summary: 'The big ideas with evidence across the play.',
      notes: `
## Love
- **Types of love**: Petrarchan (Romeo/Rosaline), sexual/bawdy (Mercutio, the Nurse), arranged (Paris), true passionate love (Romeo & Juliet), family love.
- Love is **transformative** but **dangerous** - linked repeatedly to death ("my grave is like to be my wedding bed").
- **Light imagery** (sun, stars, torches) vs darkness: their love shines in a dark world.

## Conflict and violence
- The **feud** ("ancient grudge") opens the play with a brawl; violence is linked to **masculinity and honour**.
- Public conflict (families) vs private conflict (Juliet vs her father; Romeo's inner turmoil).

## Fate
- "**Star-crossed lovers**", "death-marked love" (Prologue).
- Premonitions: Romeo fears "some consequence yet hanging in the stars" (1.4); Juliet sees Romeo "as one dead in the bottom of a tomb" (3.5).
- Chance events: the plague, the undelivered letter. Is it fate, or haste and bad choices?

## Family and parents/children
- Capulet's authority; arranged marriage; Juliet's distant mother; the Nurse as surrogate parent.
- The parents' feud destroys their children - "**Poor sacrifices of our enmity**".

## Youth and age / time and haste
- The young act fast and passionately; the old counsel patience but also act rashly (Capulet brings the wedding forward).
- Time pressure: events compressed into four days. "Wisely and slow".

## Death
- Constantly foreshadowed; love and death are entwined ("Thus with a kiss I die").
`,
      keyPoints: ['Many types of love; true love is transformative and dangerous', 'Light vs dark imagery', 'Feud linked to masculine honour', 'Fate: "star-crossed", premonitions, chance', 'Parents\' feud sacrifices their children', 'Haste and time pressure drive the tragedy', 'Love and death entwined'],
      quotes: [
        quote('From forth the fatal loins of these two foes a pair of star-crossed lovers take their life', 'Prologue: "fatal" and "star-crossed" suggest destiny; "take their life" puns on birth and suicide.', { who: 'Chorus', where: 'Prologue', themes: ['fate', 'family'] }),
        quote('My grave is like to be my wedding bed', 'Juliet foreshadows her death - love and death are linked from their first meeting.', { who: 'Juliet', where: '1.5', themes: ['love', 'death', 'fate'] }),
        quote('These violent delights have violent ends', 'The Friar warns that intense passion burns out destructively - foreshadowing.', { who: 'Friar Laurence', where: '2.6', themes: ['love', 'time'] }),
        quote('Poor sacrifices of our enmity!', 'Capulet admits the children were sacrificed to the parents\' hatred.', { who: 'Capulet', where: '5.3', themes: ['family', 'conflict'] }),
      ],
      flashcards: cards([
        ['What does "star-crossed" mean?', 'Doomed by fate - the stars were believed to control destiny.'],
        ['Give two examples of foreshadowing of death.', '"My grave is like to be my wedding bed"; Juliet sees Romeo "as one dead in the bottom of a tomb".'],
        ['What chance event ruins the Friar\'s plan?', 'Plague quarantine stops Friar John delivering the letter.'],
      ]),
      questions: [
        mc('Which quote best shows that love and death are linked?', ['"My grave is like to be my wedding bed"', '"I do but keep the peace"', '"What\'s in a name?"', '"I\'ll look to like"'], 'Juliet imagines her wedding bed as her grave - a premonition.', { d: 2 }),
        mc('What does the Friar mean by "These violent delights have violent ends"?', ['Passionate, extreme love burns out destructively', 'Love is boring', 'Fighting is fun', 'The Capulets will win'], 'A warning about intensity and haste.', { d: 2 }),
        multi('Which events could support the argument that FATE causes the tragedy?', ['The Prologue\'s "star-crossed lovers"', 'The plague stopping the letter', 'Romeo\'s premonition before the feast'], ['Romeo choosing to kill Tybalt', 'Capulet bringing the wedding forward'], 'The other two are human choices - useful for the counter-argument.', { d: 3 }),
        tf('Older characters in the play always act wisely and slowly.', false, 'Capulet rushes the wedding to Thursday, and the Friar\'s potion plan is rash - age is no guarantee of wisdom.'),
      ],
    }),
    topic({
      id: 'rj-context', title: 'Context and exam practice', summary: 'Elizabethan marriage, honour and religion - plus past questions.',
      notes: `
| Context | Link to the play |
|---|---|
| Written **c.1595**, Elizabethan England | Popular tragedy; based on Arthur Brooke's poem *The Tragicall Historye of Romeus and Juliet* (1562), which presented the lovers as a warning. |
| **Patriarchy** | Fathers controlled daughters' marriages; daughters were property. Capulet's rage reflects this. |
| **Arranged marriage** | Wealthy families married for status and money - Paris is a "good match". Girls could marry at 12-14. |
| **Honour and masculinity** | Duels and family honour were taken seriously; insults demanded violence (Tybalt). |
| **Religion** | Catholic Italy; suicide was a mortal sin - the lovers' choices would shock. Friars were respected but the Friar's plotting is questionable. |
| **Fate and astrology** | Elizabethans widely believed the stars influenced destiny. |
| **Italy** | Seen by English audiences as passionate, romantic and violent - a fitting setting. |
| **Courtly/Petrarchan love** | A poetic convention Shakespeare mocks through Romeo's early lovesickness. |

See the **Past questions** tab for every recent AQA question on the play.
`,
      keyPoints: ['c.1595; source: Brooke\'s poem (1562)', 'Patriarchy: fathers control daughters\' marriages', 'Honour culture drives the feud', 'Suicide a mortal sin for a Christian audience', 'Belief in fate and the stars', 'Petrarchan love convention mocked'],
      pastQuestions: [
        { year: 'Jun 2017', focus: 'How Shakespeare presents **aggressive male behaviour**' },
        { year: 'Jun 2018', focus: '**Relationships between adults and young people**' },
        { year: 'Jun 2019', focus: 'The **relationship between Romeo and Juliet**' },
        { year: 'Nov 2020', focus: 'The **effects of the conflict** between the Capulet and Montague families' },
        { year: 'Nov 2021', focus: 'How far Juliet is a **female character with strong emotions**' },
        { year: 'Jun 2023', focus: '**Juliet\'s feelings towards Romeo**' },
        { year: 'Jun 2024', focus: 'The **difficulties faced by Juliet**', extract: 'Act 2 Scene 5' },
        { year: 'Jun 2025', focus: '**Relationships between parents and children**', extract: 'Act 3 Scene 5' },
      ],
      flashcards: cards([
        ['What was Shakespeare\'s source for Romeo and Juliet?', 'Arthur Brooke\'s poem "The Tragicall Historye of Romeus and Juliet" (1562).'],
        ['Why would the lovers\' suicides shock an Elizabethan audience?', 'Suicide was a mortal sin in Christian belief, meaning damnation.'],
      ]),
      questions: [
        mc('Why would Elizabethan audiences see Capulet\'s anger as understandable (if harsh)?', ['Daughters were expected to obey their fathers in marriage', 'Juliet was too old to marry', 'Paris was poor', 'Capulet was the Prince'], 'Patriarchal norms gave fathers control; disobedience was a serious offence.', { d: 2 }),
        tf('Elizabethans commonly believed the stars could influence people\'s lives.', true, 'Astrology was widely believed - hence "star-crossed".'),
        mc('Which focus has NOT been asked recently and is worth preparing?', ['Fate and the role of chance', 'Aggressive male behaviour', 'Parents and children', 'The relationship between Romeo and Juliet'], 'Fate hasn\'t been the headline focus recently - all themes are examinable.', { d: 2 }),
      ],
      examQuestions: [
        examQ('**Starting with this conversation (Act 3 Scene 1), explore how Shakespeare presents ideas about masculinity and honour.**\n\nWrite about:\n- how Shakespeare presents masculinity and honour in this conversation\n- how Shakespeare presents masculinity and honour in the play as a whole.', 34, [
          ...LEVELS,
          'Analyses Tybalt\'s challenge and Romeo\'s refusal; Mercutio\'s "calm, dishonourable, vile submission"',
          'Explores Romeo\'s shift: "thy beauty hath made me effeminate" → "fire-eyed fury"',
          'Links to the opening brawl (1.1) and Capulet\'s rage (3.5)',
          'Context: Elizabethan honour culture, duelling, patriarchy',
        ], { meta: 'Paper 1 Section A · practice question', time: 50 }),
        examQ('**Starting with the Prologue, explore how Shakespeare presents the idea that the lovers are controlled by fate.**', 34, [
          ...LEVELS,
          'Analyses "star-crossed", "death-marked", "fatal loins"',
          'Uses premonitions (1.4, 3.5) and chance events (plague, letter)',
          'Counter-argument: haste and choices (Romeo kills Tybalt, buys poison)',
          'Context: Elizabethan beliefs in astrology/destiny',
        ], { meta: 'Paper 1 Section A · practice question', time: 50 }),
      ],
    }),
  ],
}];
