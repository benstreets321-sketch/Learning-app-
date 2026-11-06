import type { Unit } from '../../types';
import { cards, mc, multi, tf, topic, quote, examQ, match, txt } from '../../dsl';

const LEVELS = [
  'Level 6 (26-30): convincing, critical argument; judicious, precise quotations; analysis of Shakespeare\'s methods with well-chosen terminology; exploration of context linked to purpose',
  'Level 5 (21-25): thoughtful, developed argument; apt references integrated; examination of methods and effects; thoughtful context',
  'Level 4 (16-20): clear, explained response; effective references; clear explanation of methods; clear context links',
  'Covers the extract in detail', 'Covers the play as a whole (beginning, middle and end)', 'Shows how the idea develops or changes',
  'Offers an alternative interpretation', 'Accurate spelling, punctuation and grammar (AO4: 4 marks)',
];

export const macbethUnit: Unit[] = [{
  id: 'mac', title: 'Macbeth', option: { group: 'lit-shakespeare', value: 'macbeth' },
  description: 'Shakespeare\'s shortest tragedy (c.1606): ambition, guilt and the supernatural.',
  topics: [
    topic({
      id: 'mac-plot', title: 'Plot and structure', summary: 'What happens in each act, and how the tragic structure works.',
      notes: `
## The story in five acts
| Act | What happens |
|---|---|
| **1** | Three witches plan to meet Macbeth. A Captain reports Macbeth's brutal bravery in battle. The witches greet Macbeth as **Thane of Glamis, Thane of Cawdor and future king**, and Banquo as father of kings. Duncan makes Macbeth Thane of Cawdor (first prophecy comes true). Lady Macbeth reads his letter and calls on spirits to "unsex" her. She persuades a hesitant Macbeth to kill Duncan. |
| **2** | Macbeth sees a **floating dagger**, murders Duncan offstage. Lady Macbeth plants the daggers on the guards. A knocking (the Porter scene). Macduff discovers the body; Macbeth kills the guards. Malcolm and Donalbain flee; Macbeth is crowned. |
| **3** | Fearing Banquo's prophecy, Macbeth hires murderers: **Banquo is killed, Fleance escapes**. At the banquet Macbeth sees **Banquo's ghost**. Macduff refuses to attend; Macbeth grows suspicious. |
| **4** | Macbeth visits the witches: **apparitions** warn "beware Macduff", say "none of woman born" can harm him and he is safe until **Birnam Wood comes to Dunsinane**. Macbeth has **Macduff's wife and children murdered**. In England, Malcolm tests Macduff's loyalty; Macduff hears of his family's deaths. |
| **5** | **Lady Macbeth sleepwalks**, trying to wash imaginary blood. She dies (probably suicide). Macbeth gives the "Tomorrow" soliloquy. The army camouflages itself with Birnam Wood branches. Macduff reveals he was born by caesarean ("untimely ripped"), kills Macbeth. **Malcolm is crowned** - order restored. |

## Structure
- **Tragedy**: a noble hero with a fatal flaw (**hamartia** = ambition) falls, causing chaos and death, then order is restored.
- **Rise and fall**: Macbeth rises in Act 1 (hero), peaks at the murder, then falls into tyranny.
- **Cyclical**: opens and closes with battle and a traitor beheaded (the first Thane of Cawdor / Macbeth).
- **Reversal of the couple**: Lady Macbeth starts in control and Macbeth hesitant; by Act 5 she collapses and he is numb and ruthless.
- **Pace**: the shortest tragedy - events rush forward, mirroring the speed of Macbeth's ambition.
`,
      keyPoints: ['Act 1: prophecies, Cawdor, Lady Macbeth persuades', 'Act 2: dagger, murder of Duncan, Macbeth crowned', 'Act 3: Banquo murdered, Fleance escapes, ghost at banquet', 'Act 4: apparitions, Macduff\'s family murdered', 'Act 5: sleepwalking, Lady Macbeth\'s death, Macduff kills Macbeth, Malcolm crowned', 'Tragic structure: hamartia → fall → order restored'],
      timeline: [
        { date: '1.1', event: 'The witches plan to meet Macbeth' },
        { date: '1.3', event: 'The witches give their prophecies to Macbeth and Banquo' },
        { date: '1.5', event: 'Lady Macbeth reads the letter and calls on spirits to "unsex" her' },
        { date: '1.7', event: 'Lady Macbeth persuades Macbeth to go ahead with the murder' },
        { date: '2.1', event: 'Macbeth sees a floating dagger' },
        { date: '2.2', event: 'Duncan is murdered; Macbeth returns with the daggers' },
        { date: '2.3', event: 'Macduff discovers Duncan\'s body; Macbeth kills the guards' },
        { date: '3.3', event: 'Banquo is murdered but Fleance escapes' },
        { date: '3.4', event: 'Banquo\'s ghost appears at the banquet' },
        { date: '4.1', event: 'The apparitions: beware Macduff, none of woman born, Birnam Wood' },
        { date: '4.2', event: 'Lady Macduff and her children are murdered' },
        { date: '5.1', event: 'Lady Macbeth sleepwalks and tries to wash away blood' },
        { date: '5.5', event: 'Macbeth hears of his wife\'s death: "Tomorrow, and tomorrow..."' },
        { date: '5.8', event: 'Macduff kills Macbeth; Malcolm becomes king' },
      ],
      flashcards: cards([
        ['What are the three prophecies to Macbeth?', 'Thane of Glamis (already), Thane of Cawdor, and king hereafter.'],
        ['What is prophesied for Banquo?', 'He will be "lesser than Macbeth, and greater" - he will father kings but not be king.'],
        ['What are the three apparitions in Act 4?', 'Armed head: beware Macduff. Bloody child: none of woman born shall harm Macbeth. Crowned child with tree: safe until Birnam Wood comes to Dunsinane.'],
        ['How does Macduff defeat the prophecy?', 'He was "from his mother\'s womb untimely ripped" - born by caesarean, so not "of woman born" in the usual way.'],
        ['Who is crowned at the end?', 'Malcolm, Duncan\'s son - restoring rightful order.'],
        ['What is Macbeth\'s hamartia?', 'His "vaulting ambition".'],
      ]),
      questions: [
        mc('Who escapes when Banquo is murdered?', ['Fleance', 'Donalbain', 'Malcolm', 'Macduff'], 'Fleance escapes, meaning Banquo\'s line (future kings) survives - a threat to Macbeth.', { d: 1 }),
        mc('What does Macbeth see before the murder of Duncan?', ['A floating dagger', 'Banquo\'s ghost', 'A crowned child', 'A burning castle'], 'The dagger (2.1) suggests his mind is already "heat-oppressed" by guilty thoughts.', { d: 1 }),
        mc('Why does Macbeth have Macduff\'s family killed?', ['Macduff has fled to England and the apparition warned "beware Macduff"', 'Lady Macbeth orders it to stop Macduff becoming king', 'The witches tell him directly that Macduff killed Duncan', 'Macduff publicly accuses him of murdering Banquo at the feast'], 'It is pure tyranny: an attack on innocents with no strategic purpose - the lowest point of his moral fall.', { d: 2 }),
        tf('Duncan\'s murder happens on stage.', false, 'It happens offstage, so the audience imagines it - and focuses on the Macbeths\' reactions and guilt.', { d: 2 }),
        mc('Which statement best describes the structure of the play?', ['A tragedy: a noble hero\'s fatal flaw leads to his fall and order is restored', 'A comedy: confusion and disguise end happily in several marriages', 'A history: real events are retold with no supernatural elements', 'A romance: separated lovers are reunited after many trials'], 'Macbeth follows the pattern of Shakespearean tragedy.', { d: 2 }),
        txt('What is the name of the castle Macbeth defends in Act 5? (Birnam Wood comes to ...)', ['Dunsinane'], 'The prophecy: Macbeth is safe until Great Birnam Wood comes to high Dunsinane Hill.', { d: 2 }),
        mc('How does the relationship between Macbeth and Lady Macbeth change across the play?', ['They swap: she starts in control and he becomes the dominant, isolated one', 'They grow closer as they share the guilt and plan every murder together', 'It stays the same: Lady Macbeth controls him from start to finish', 'He controls her from the start, and she slowly gains confidence'], 'Structural reversal: by Act 3 he plans alone ("Be innocent of the knowledge, dearest chuck"), and she collapses in Act 5.', { d: 3 }),
      ],
    }),
    topic({
      id: 'mac-macbeth', title: 'Macbeth (character)', summary: 'From "brave Macbeth" to "dead butcher": the tragic hero\'s fall.',
      notes: `
## Macbeth's arc
1. **Brave warrior (Act 1)** - praised as "brave Macbeth" and "valiant cousin"; violent, but violence in service of the king is admired.
2. **Tempted and torn (1.3-1.7)** - the prophecy makes his "seated heart knock" at his ribs; he admits "vaulting ambition" is his only motive and decides "We will proceed no further" - until Lady Macbeth questions his manhood.
3. **Murderer and guilt (Act 2)** - the dagger hallucination; immediately after: "Will all great Neptune's ocean wash this blood / Clean from my hand?"
4. **Insecure tyrant (Act 3)** - "To be thus is nothing, but to be safely thus"; plans Banquo's murder alone; tormented: "O, full of scorpions is my mind".
5. **Ruthless (Act 4)** - kills Macduff's family without hesitation: "The very firstlings of my heart shall be / The firstlings of my hand."
6. **Numb and nihilistic (Act 5)** - reacts to his wife's death with "She should have died hereafter"; "Life's but a walking shadow"; fights to the end. Malcolm calls him "this dead butcher".

## How Shakespeare presents him
- **Tragic hero**: noble, admired, with a hamartia (ambition) - his fall creates **pity and fear** (catharsis).
- **Soliloquies** let us inside his mind: we see his conscience fight his ambition, which keeps some sympathy.
- **Imagery** of blood, darkness ("Stars, hide your fires"), sleep and disease tracks his decline.
- **Free will vs fate**: the witches tempt, but Macbeth chooses. Shakespeare leaves the balance open for debate.

:::exam Ways to argue
- *Macbeth is a victim* of the witches and his wife - **or** a man whose own ambition was always there ("my black and deep desires").
- *Macbeth changes* - from a conscience-stricken man to a numb tyrant - **yet** his courage at the end ("lay on, Macduff") recalls the warrior of Act 1.
:::
`,
      keyPoints: ['Act 1 hero: "brave Macbeth", "valiant cousin"', 'Admits "vaulting ambition" is his only spur', 'Guilt after the murder: "great Neptune\'s ocean"', 'Insecure tyrant: "full of scorpions is my mind"', 'Kills Macduff\'s family - lowest point', 'Nihilism: "Life\'s but a walking shadow"', 'Malcolm\'s verdict: "this dead butcher"', 'Tragic hero with hamartia → catharsis'],
      quotes: [
        quote('brave Macbeth', 'The Captain\'s epithet "brave" establishes him as a heroic warrior - making his fall more tragic.', { who: 'Captain', where: '1.2', themes: ['heroism', 'violence'] }),
        quote('unseamed him from the nave to th\' chops', 'Graphic violence is praised in battle - foreshadowing how Macbeth\'s talent for violence will be turned against the king.', { who: 'Captain', where: '1.2', themes: ['violence'] }),
        quote('Stars, hide your fires; Let not light see my black and deep desires', 'Imperatives to the stars, and light/dark imagery, show he already wants to hide evil ambitions - suggesting the desire existed before the witches.', { who: 'Macbeth', where: '1.4', themes: ['ambition', 'appearance vs reality'] }),
        quote('I have no spur to prick the sides of my intent, but only vaulting ambition', 'Horse-riding metaphor: ambition "vaults" (jumps) too high and falls - he knows it is his only motive and that it will end in ruin.', { who: 'Macbeth', where: '1.7', themes: ['ambition'] }),
        quote('Is this a dagger which I see before me', 'The rhetorical question shows his mind is unstable; is the dagger supernatural or a projection of guilt? Shakespeare keeps it ambiguous.', { who: 'Macbeth', where: '2.1', themes: ['supernatural', 'guilt'] }),
        quote('Will all great Neptune\'s ocean wash this blood clean from my hand?', 'Hyperbole: an ocean couldn\'t clean his guilt. Blood becomes a motif of permanent guilt (contrast Lady Macbeth\'s "A little water").', { who: 'Macbeth', where: '2.2', themes: ['guilt'] }),
        quote('O, full of scorpions is my mind, dear wife!', 'Metaphor of poisonous, stinging creatures - his reign brings mental torment, not peace. "dear wife" still shows affection.', { who: 'Macbeth', where: '3.2', themes: ['guilt', 'power'] }),
        quote('I am in blood stepped in so far', 'He is wading through a river of blood - going back is as hard as going on. He feels trapped by his own choices.', { who: 'Macbeth', where: '3.4', themes: ['guilt', 'violence'] }),
        quote('Life\'s but a walking shadow', 'Nihilism: life is meaningless and insubstantial. His ambition has emptied his life of meaning.', { who: 'Macbeth', where: '5.5', themes: ['ambition'] }),
        quote('this dead butcher and his fiend-like queen', 'Malcolm\'s final judgement: "butcher" reduces him from warrior to brute killer - but it is the view of his enemy.', { who: 'Malcolm', where: '5.8', themes: ['kingship', 'violence'] }),
      ],
      flashcards: cards([
        ['How is Macbeth described in Act 1 Scene 2?', '"brave Macbeth", "valiant cousin", "Bellona\'s bridegroom" - a heroic, violent warrior.'],
        ['What does Macbeth say is his only motive?', '"vaulting ambition, which o\'erleaps itself".'],
        ['What is Macbeth\'s reaction to his wife\'s death?', '"She should have died hereafter" and the "Tomorrow, and tomorrow, and tomorrow" soliloquy - numb despair.'],
        ['What makes Macbeth a tragic hero?', 'A noble figure with a fatal flaw (ambition) whose fall arouses pity and fear.'],
      ]),
      questions: [
        mc('What does "vaulting ambition, which o\'erleaps itself" suggest?', ['Ambition that jumps too high and will cause a fall', 'Ambition that is healthy and natural', 'Ambition held back by his conscience', 'Ambition that others have forced on him'], 'The metaphor of a rider leaping too far onto a horse and falling off: Macbeth predicts his own downfall.', { d: 2 }),
        mc('How does Macbeth\'s attitude to murder change from Act 2 to Act 4?', ['From guilt-ridden hesitation to killing without thought', 'From cold enjoyment of killing to deep, lasting regret', 'From confident planning to refusing to kill anyone else', 'It stays the same: he always hesitates before he kills'], 'Compare "Will all great Neptune\'s ocean..." with "The very firstlings of my heart shall be the firstlings of my hand" (act on impulse).', { d: 3 }),
        tf('Shakespeare makes it absolutely clear that the witches force Macbeth to kill Duncan.', false, 'The witches only predict; "my black and deep desires" suggests the ambition was already within him. The ambiguity drives debate about fate vs free will.'),
        multi('Which quotes show Macbeth\'s guilt or mental torment?', ['"O, full of scorpions is my mind"', '"Will all great Neptune\'s ocean wash this blood..."', '"Macbeth does murder sleep"'], ['"brave Macbeth"', '"look like th\' innocent flower"'], 'Scorpions, ocean/blood and sleep imagery all express guilt. The others are the Captain and Lady Macbeth.', { d: 2 }),
        mc('Why might an audience still feel some sympathy for Macbeth at the end?', ['His soliloquies show his suffering and he fights bravely to the end', 'He apologises to Macduff and admits that he was wrong', 'He gives up the crown to Malcolm before the final battle', 'Banquo\'s ghost forgives him and he dies at peace'], 'We have heard his inner torment; "lay on, Macduff" recalls the brave warrior - producing pity (catharsis).', { d: 3 }),
        match('Match the quote to the stage of Macbeth\'s journey.', [['"brave Macbeth"', 'Heroic warrior'], ['"We will proceed no further"', 'Hesitation'], ['"full of scorpions is my mind"', 'Tormented king'], ['"Life\'s but a walking shadow"', 'Nihilistic despair']], 'Tracking change across the play is key for top marks.', { d: 2 }),
      ],
    }),
    topic({
      id: 'mac-lady', title: 'Lady Macbeth', summary: 'Strength, manipulation, gender and collapse.',
      notes: `
## Her arc
1. **Ambitious and determined (1.5)** - reads the letter, fears Macbeth is "too full o' th' milk of human kindness", calls spirits to "**unsex me here**" and fill her with "direst cruelty".
2. **Manipulator (1.7)** - attacks his masculinity ("When you durst do it, then you were a man"), and shocks with the image of dashing her baby's brains out.
3. **In control (Act 2)** - plants the daggers; dismisses guilt: "**A little water clears us of this deed**". Faints (real or fake?) when the murder is discovered.
4. **Sidelined (Act 3)** - Macbeth excludes her ("Be innocent of the knowledge, dearest chuck"). She covers for him at the banquet but is losing influence.
5. **Collapse (5.1)** - sleepwalking in **prose**, she obsessively washes: "**Out, damned spot!**" and "**all the perfumes of Arabia will not sweeten this little hand**". She dies offstage - "fiend-like queen".

## How Shakespeare presents her
- She challenges **Jacobean gender roles**: women were expected to be obedient, gentle and maternal. Her rejection of femininity aligns her with the witches (unnatural).
- Her **strength is a performance** that she cannot sustain - guilt she repressed returns through her **unconscious** (sleepwalking).
- **Reversal**: "A little water" (2.2) vs "all the perfumes of Arabia" (5.1) - the guilt she mocked in Macbeth now consumes her.
- **Verse to prose**: verse shows control; prose in 5.1 shows her mind has broken.

:::exam Questions she appears in
2020 (Nov): *Lady Macbeth as a female character who changes*. 2024: *how far Lady Macbeth is a strong female character* (extract 1.7). She's also central to 2021's *relationship between Macbeth and Lady Macbeth*.
:::
`,
      keyPoints: ['Calls spirits to "unsex me here"', 'Fears Macbeth is "too full o\' th\' milk of human kindness"', 'Manipulates by questioning his manhood', '"A little water clears us of this deed"', 'Sidelined in Act 3 ("dearest chuck")', 'Sleepwalking in prose: "Out, damned spot!"', '"all the perfumes of Arabia" - guilt reversal', 'Challenges Jacobean gender expectations'],
      quotes: [
        quote('too full o\' th\' milk of human kindness', 'Milk = nurturing, maternal, feminine: she sees kindness as a weakness, ironically gendering it female while trying to reject her own femininity.', { who: 'Lady Macbeth', where: '1.5', themes: ['gender'] }),
        quote('Come, you spirits that tend on mortal thoughts, unsex me here', 'Imperative invocation of evil spirits; "unsex" suggests she believes cruelty and power are incompatible with being a woman. Links her to the witches.', { who: 'Lady Macbeth', where: '1.5', themes: ['gender', 'supernatural'] }),
        quote('look like th\' innocent flower, but be the serpent under\'t', 'Appearance vs reality. The serpent evokes Satan in Eden - she is the tempter, Macbeth is Adam.', { who: 'Lady Macbeth', where: '1.5', themes: ['appearance vs reality'] }),
        quote('When you durst do it, then you were a man', 'She defines masculinity as daring and violence, manipulating Macbeth\'s pride.', { who: 'Lady Macbeth', where: '1.7', themes: ['gender', 'masculinity'] }),
        quote('A little water clears us of this deed', 'Dismissive confidence about guilt - dramatic irony as she later cannot wash away imaginary blood.', { who: 'Lady Macbeth', where: '2.2', themes: ['guilt'] }),
        quote('Out, damned spot! Out, I say!', 'Fragmented, exclamatory prose shows her mind breaking. The imaginary blood spot symbolises indelible guilt.', { who: 'Lady Macbeth', where: '5.1', themes: ['guilt'] }),
        quote('All the perfumes of Arabia will not sweeten this little hand', 'Echoes Macbeth\'s "Neptune\'s ocean" - she now feels the guilt she once mocked. "little hand" makes her seem small and vulnerable.', { who: 'Lady Macbeth', where: '5.1', themes: ['guilt'] }),
      ],
      flashcards: cards([
        ['What does Lady Macbeth ask the spirits to do?', '"unsex me here" and fill her "from the crown to the toe top-full of direst cruelty".'],
        ['How does Lady Macbeth persuade Macbeth?', 'She questions his masculinity, calls him a coward and claims she would have killed her own baby rather than break such a promise.'],
        ['What does she do in Act 5 Scene 1?', 'Sleepwalks, speaks in prose and tries to wash imaginary blood from her hands.'],
        ['How does she die?', 'Offstage; Malcolm suggests she took her own life "by self and violent hands".'],
      ]),
      questions: [
        mc('Why does Lady Macbeth ask to be "unsexed"?', ['She believes womanhood makes her too weak for murder', 'She wants to become one of the witches and gain their powers', 'She is unhappy in her marriage and wants to leave Macbeth', 'She wants to rule Scotland herself instead of her husband'], 'She associates femininity with gentleness and wants the cruelty society linked to men.', { d: 2 }),
        mc('What is ironic about "A little water clears us of this deed"?', ['Later she cannot wash away the imagined blood however hard she tries', 'The water she uses is poisoned and makes her ill later on', 'Macbeth agrees with her and never thinks about the murder again', 'She is lying, because she never actually touched the daggers'], 'Dramatic irony: in 5.1 "all the perfumes of Arabia" cannot sweeten her hand.', { d: 2 }),
        mc('Why does Lady Macbeth speak in prose in Act 5 Scene 1?', ['To show her mind has broken down', 'Because she has become lower class', 'Because she is speaking to servants only', 'To show she is in control'], 'Shakespeare\'s verse/prose shift signals her mental collapse.', { d: 2 }),
        tf('A Jacobean audience would have seen Lady Macbeth\'s behaviour as normal for a noblewoman.', false, 'Women were expected to be obedient and gentle; her rejection of femininity would seem unnatural and link her to witchcraft.'),
        mc('How could you argue Lady Macbeth is NOT truly strong?', ['Her strength is an act - she needs spirits to make her cruel and is destroyed by repressed guilt', 'She refuses to help with Duncan\'s murder when the moment finally comes', 'She never speaks to Macbeth again after he becomes king of Scotland', 'She runs away to England when she hears that Macduff is coming'], 'A "how far" answer should consider that her strength is performed and unsustainable.', { d: 4 }),
        mc('How does Macbeth exclude Lady Macbeth in Act 3?', ['"Be innocent of the knowledge, dearest chuck" - he plans Banquo\'s murder alone', '"Out, damned spot!" - he mocks her guilt in front of the court', '"Come, you spirits" - he asks the witches to curse her', '"Is this a dagger" - he hides the murder weapon from her'], 'The pet name "chuck" is affectionate but patronising; the balance of power has shifted.', { d: 3 }),
      ],
    }),
    topic({
      id: 'mac-others', title: 'Banquo, Macduff, Duncan, Malcolm and the Witches', summary: 'Foils and contrasts that highlight Macbeth\'s choices.',
      notes: `
## Banquo - Macbeth's **foil**
- Hears the same prophecies but **resists temptation**: "oftentimes, to win us to our harm, / The instruments of darkness tell us truths".
- Has his own ambitions (prays to resist "cursed thoughts") but does not act on them - showing **free will**.
- Murdered; his **ghost** haunts the banquet - Macbeth's guilt made visible. His son Fleance escapes: the line of kings continues (flattering **King James I**, who claimed descent from Banquo).

## Macduff - the **avenger** and model of loyalty
- Discovers Duncan's body: "O horror, horror, horror!"
- Refuses Macbeth's coronation and flees to England - leaving his family (criticised by Lady Macduff).
- Grief shows true masculinity: "I must also **feel it as a man**" - contrast with Lady Macbeth's definition of manhood as violence.
- Kills Macbeth: "untimely ripped" fulfils the prophecy.

## Duncan - the **good king**
- Generous and trusting ("He was a gentleman on whom I built / An absolute trust" - about the first Cawdor, **dramatic irony**).
- Represents **divine right** and natural order; his murder causes unnatural events (horses eat each other, darkness in the day).

## Malcolm - the **rightful heir**
- Tests Macduff by pretending to be wicked (4.3); lists the "king-becoming graces" - justice, temperance, mercy - the opposite of Macbeth.
- Crowned at the end: order restored.

## The Witches ("weird sisters")
- Speak in **trochaic tetrameter** and rhyming couplets ("Double, double toil and trouble") - different from human characters, unnatural.
- **Paradox**: "Fair is foul, and foul is fair" - appearance vs reality.
- They never tell Macbeth to kill: they **tempt**. Do they control fate, or just predict it?
- Jacobean audiences (and **King James**, who wrote *Daemonologie*, 1597) genuinely feared witchcraft.
`,
      keyPoints: ['Banquo = foil: same prophecy, resists temptation', '"instruments of darkness tell us truths"', 'Fleance escapes: link to King James', 'Macduff: "feel it as a man" - true masculinity', 'Duncan = good king, divine right; "absolute trust" irony', 'Malcolm lists "king-becoming graces"', 'Witches: trochaic rhythm, paradox, temptation not command'],
      quotes: [
        quote('oftentimes, to win us to our harm, the instruments of darkness tell us truths', 'Banquo recognises the witches\' danger: small truths lure people into greater harm. Contrasts with Macbeth\'s eagerness.', { who: 'Banquo', where: '1.3', themes: ['supernatural', 'fate'] }),
        quote('Thou hast it now: King, Cawdor, Glamis, all', 'Banquo suspects Macbeth: "Thou play\'dst most foully for\'t". The list echoes the witches.', { who: 'Banquo', where: '3.1', themes: ['ambition'] }),
        quote('There\'s no art to find the mind\'s construction in the face', 'Duncan on the traitorous first Thane of Cawdor - dramatic irony as he immediately trusts Macbeth, the next traitor.', { who: 'Duncan', where: '1.4', themes: ['appearance vs reality'] }),
        quote('I must also feel it as a man', 'Macduff redefines masculinity to include grief and love - a contrast to Lady Macbeth\'s view that a man must be ruthless.', { who: 'Macduff', where: '4.3', themes: ['masculinity'] }),
        quote('from his mother\'s womb untimely ripped', 'Born by caesarean, so the apparition\'s "none of woman born" prophecy was a trick - the witches equivocate.', { who: 'Macduff', where: '5.8', themes: ['fate', 'supernatural'] }),
        quote('Fair is foul, and foul is fair', 'Paradox and chiasmus set up a world where appearances deceive and moral order is inverted.', { who: 'Witches', where: '1.1', themes: ['appearance vs reality', 'supernatural'] }),
        quote('Double, double toil and trouble; fire burn and cauldron bubble', 'Trochaic tetrameter and rhyme create a chant-like spell, marking the witches as unnatural.', { who: 'Witches', where: '4.1', themes: ['supernatural'] }),
      ],
      flashcards: cards([
        ['Why is Banquo a foil to Macbeth?', 'He hears similar prophecies but resists acting on them, highlighting that Macbeth chooses evil.'],
        ['Why would Banquo flatter King James I?', 'James believed he was descended from Banquo, so Banquo is shown as noble and his line continues.'],
        ['What is ironic about Duncan\'s trust?', 'He says you can\'t read a traitor\'s mind in his face, then immediately trusts Macbeth, who will murder him.'],
        ['What are Malcolm\'s "king-becoming graces"?', 'Justice, verity, temperance, stableness, bounty, perseverance, mercy, lowliness, devotion, patience, courage, fortitude.'],
        ['What did King James write about witches?', 'Daemonologie (1597), a book about witchcraft. He was involved in the North Berwick witch trials.'],
      ]),
      questions: [
        mc('What is Banquo\'s main dramatic function?', ['A foil showing that Macbeth could have resisted temptation', 'The play\'s main villain, who plots against Duncan from the start', 'Comic relief, lightening the mood between the murders', 'Lady Macbeth\'s secret accomplice in Duncan\'s murder'], 'He hears the prophecies too but chooses differently.', { d: 2 }),
        mc('What does Macduff\'s line "I must also feel it as a man" suggest?', ['Real men can show grief and love', 'Men must hide their grief to stay strong', 'He will take revenge before he grieves', 'He blames Malcolm for making him leave'], 'It challenges Lady Macbeth\'s idea that manhood equals ruthless violence.', { d: 3 }),
        mc('How do the witches\' speech patterns mark them as different?', ['They speak in a chanting, rhyming trochaic rhythm', 'They speak in long prose speeches', 'They speak in blank verse like the nobles', 'They speak in rhyming iambic pentameter'], 'Trochaic tetrameter (DUM-da) inverts the usual iambic rhythm - fittingly unnatural.', { d: 3 }),
        tf('The witches directly order Macbeth to murder Duncan.', false, 'They only prophesy. Macbeth (and Lady Macbeth) decide to murder - a key point in fate vs free will arguments.'),
        mc('What happens in nature after Duncan\'s murder?', ['Darkness in the day and Duncan\'s horses eat each other', 'A bright, calm day, as if nature approves of Macbeth', 'Birnam Wood begins to move towards Dunsinane', 'A heavy snowfall that traps everyone inside the castle'], 'Unnatural events show regicide breaks the natural order and the Great Chain of Being.', { d: 3 }),
      ],
    }),
    topic({
      id: 'mac-themes', title: 'Themes: ambition, power, kingship, fate and the supernatural', summary: 'The big ideas examiners ask about, with evidence across the play.',
      notes: `
## Ambition
- Presented as **corrupting** and **self-destructive**: "vaulting ambition, which o'erleaps itself".
- Ambition without morality leads to tyranny, paranoia and emptiness ("Life's but a walking shadow").
- Banquo's ambition is controlled → contrast. Malcolm's ambition is lawful.

## Kingship and power
- **Good kingship**: Duncan (generous, trusting) and Malcolm ("king-becoming graces"), Edward the Confessor (healing touch, 4.3).
- **Tyranny**: Macbeth's Scotland "**bleeds**" and "sinks beneath the yoke"; he rules through fear and spies.
- **Divine right of kings**: killing a king (regicide) was a sin against God - the natural world reacts.

## Fate and free will
- The witches predict; Macbeth **chooses** to act. Banquo shows the alternative.
- The apparitions **equivocate** - their half-truths give Macbeth false confidence.
- Shakespeare leaves it ambiguous - you can argue either, but the strongest answers explore both.

## The supernatural
- Witches, the dagger, Banquo's ghost, the apparitions, unnatural events.
- **Real or imagined?** The dagger and ghost may be products of guilt ("heat-oppressed brain").
- For a Jacobean audience the supernatural was real and terrifying - linked to the devil.

## Appearance vs reality
- "Fair is foul"; "look like th' innocent flower"; "False face must hide what the false heart doth know"; Duncan's "no art to find the mind's construction in the face".
- **Equivocation**: the Porter mentions "equivocator" - a reference to the Gunpowder Plot trial of Father Garnet (1606).

## Guilt and the blood/sleep motifs
- **Blood**: honour in battle → guilt ("Neptune's ocean", "Out, damned spot").
- **Sleep**: innocence and peace. "Macbeth does murder sleep" - he and Lady Macbeth lose it (sleepwalking).

## Masculinity
- Lady Macbeth: manhood = violence. Macduff: manhood includes feeling. Shakespeare questions toxic definitions of "being a man".
`,
      keyPoints: ['Ambition corrupts and destroys', 'Good kings vs tyrant: Duncan/Malcolm vs Macbeth', 'Divine right: regicide breaks natural order', 'Fate vs free will is deliberately ambiguous', 'Supernatural may be real or projections of guilt', 'Appearance vs reality: "Fair is foul"', 'Blood motif: honour → guilt', 'Sleep = innocence; "Macbeth does murder sleep"'],
      quotes: [
        quote('False face must hide what the false heart doth know', 'Rhyming couplet ending Act 1: Macbeth has learned his wife\'s lesson of deception.', { who: 'Macbeth', where: '1.7', themes: ['appearance vs reality'] }),
        quote('Macbeth does murder sleep', 'Sleep symbolises innocence and natural peace; by killing Duncan he destroys his own peace.', { who: 'Macbeth', where: '2.2', themes: ['guilt'] }),
        quote('To be thus is nothing, but to be safely thus', 'Power without security is worthless - his paranoia drives him to kill Banquo.', { who: 'Macbeth', where: '3.1', themes: ['power', 'kingship'] }),
        quote('It weeps, it bleeds, and each new day a gash is added to her wounds', 'Malcolm personifies Scotland as a wounded body - tyranny harms the whole nation.', { who: 'Malcolm', where: '4.3', themes: ['kingship'] }),
        quote('the king-becoming graces', 'Malcolm\'s list of royal virtues defines good kingship - everything Macbeth lacks.', { who: 'Malcolm', where: '4.3', themes: ['kingship'] }),
      ],
      flashcards: cards([
        ['What is the divine right of kings?', 'The belief that monarchs are chosen by God, so killing a king (regicide) is a sin against God.'],
        ['What is equivocation?', 'Using ambiguous language to mislead without technically lying - like the apparitions\' prophecies.'],
        ['What does sleep symbolise in Macbeth?', 'Innocence, peace and a clear conscience.'],
        ['How is Scotland presented under Macbeth?', 'As a suffering body: it "weeps, it bleeds" - tyranny wounds the nation.'],
      ]),
      questions: [
        mc('Which quote best shows ambition as self-destructive?', ['"vaulting ambition, which o\'erleaps itself"', '"Stars, hide your fires"', '"brave Macbeth"', '"look like th\' innocent flower"'], 'The image of over-leaping and falling predicts the fall that ambition causes.', { d: 1 }),
        mc('How might the dagger in Act 2 support the idea that the supernatural is psychological?', ['Macbeth calls it "a dagger of the mind, a false creation"', 'Lady Macbeth sees the dagger too and tells him to take it', 'The witches place the dagger in his hand before the murder', 'Banquo picks up the dagger and hands it to Macbeth'], 'He wonders if it is "a false creation, proceeding from the heat-oppressed brain".', { d: 3 }),
        tf('The theme of appearance vs reality is introduced in the very first scene.', true, '"Fair is foul, and foul is fair" (1.1).'),
        mc('What does the Porter\'s reference to an "equivocator" link to?', ['The 1605 Gunpowder Plot trial', 'The Spanish Armada of 1588', 'The Babington Plot of 1586', 'The Essex Rebellion of 1601'], 'Father Henry Garnet was accused of equivocation at his trial after the Gunpowder Plot - a topical reference for the 1606 audience.', { d: 4 }),
        multi('Which are examples of good kingship in the play?', ['Duncan\'s generosity', 'Malcolm\'s "king-becoming graces"', 'Edward the Confessor\'s healing touch'], ['Macbeth\'s use of spies', 'The murder of Macduff\'s family'], 'Shakespeare contrasts legitimate, virtuous kings with Macbeth\'s tyranny.', { d: 2 }),
      ],
    }),
    topic({
      id: 'mac-context', title: 'Context: Jacobean England, James I and the Gunpowder Plot', summary: 'Context that explains Shakespeare\'s choices (AO3).',
      notes: `
| Context | Why it matters in *Macbeth* |
|---|---|
| **Written c.1606** for **King James I** (James VI of Scotland) | Scottish setting, Banquo shown as noble (James's ancestor), witches (James's obsession). Shakespeare's company were the **King's Men**. |
| **The Gunpowder Plot (1605)** | A failed attempt to kill James. Regicide was a live fear. The Porter's "equivocator" and the theme of hidden treachery ("look like th' innocent flower") echo it. |
| **Divine right of kings** | Kings were appointed by God. Killing Duncan is a crime against God, so nature itself is disturbed. |
| **Great Chain of Being** | A God-given hierarchy: God → angels → king → nobles → commoners → animals. Breaking it causes chaos (horses eating each other). |
| **Witchcraft** | James wrote *Daemonologie* (1597) and was involved in witch trials. Witches were believed to be the devil's agents - truly frightening to the audience. |
| **Gender roles** | Patriarchal society: women were subordinate, expected to be pious and maternal. Lady Macbeth's ambition and rejection of motherhood would be shocking. |
| **Tragedy (Aristotle)** | Tragic hero, hamartia, downfall and catharsis - the audience is warned of ambition's dangers. |
| **Historical source** | Holinshed's *Chronicles*. The real Macbeth reigned 1040-1057, reportedly fairly successfully; Shakespeare changes history to suit his drama and his king. |

:::tip Using context well
Don't write "In Jacobean times people believed in witches." Write: "*Shakespeare's presentation of the witches as equivocating agents of evil would have terrified a Jacobean audience, including James I, author of Daemonologie, reinforcing the message that those who seek supernatural help are damned.*"
:::
`,
      keyPoints: ['c.1606, performed for James I (King\'s Men)', 'Gunpowder Plot 1605: fear of regicide and equivocation', 'Divine right of kings: regicide = sin against God', 'Great Chain of Being: disorder in nature', 'James I wrote Daemonologie (1597) - feared witches', 'Patriarchy: Lady Macbeth defies gender norms', 'Banquo flattered as James\'s ancestor'],
      flashcards: cards([
        ['When was Macbeth written?', 'Around 1606, early in the reign of James I.'],
        ['What was the Gunpowder Plot?', 'A failed Catholic plot in 1605 to blow up Parliament and kill King James I.'],
        ['What is the Great Chain of Being?', 'The belief in a God-given hierarchy from God to the king down to animals; disturbing it causes chaos.'],
        ['What was Daemonologie?', 'A book on witchcraft written by King James in 1597.'],
        ['What was Shakespeare\'s main historical source?', 'Holinshed\'s Chronicles.'],
      ]),
      questions: [
        mc('Why did Shakespeare present Banquo positively?', ['King James I believed Banquo was his ancestor', 'Banquo was a famous Scottish war hero', 'Elizabeth I had admired Banquo\'s story', 'Banquo was the true heir to Duncan'], 'Flattering the king\'s lineage was wise for the King\'s Men.', { d: 2 }),
        mc('Which event made regicide and treachery very topical in 1606?', ['The Gunpowder Plot of 1605', 'The Spanish Armada of 1588', 'The Essex Rebellion of 1601', 'The Babington Plot of 1586'], 'An attempted assassination of James I by Catholic conspirators.', { d: 1 }),
        tf('A Jacobean audience would generally have believed that witches were real.', true, 'Witch trials and James\'s Daemonologie show witchcraft was widely feared.'),
        mc('How does the Great Chain of Being help explain the unnatural events after Duncan\'s death?', ['Killing God\'s anointed king breaks the natural order, so nature itself is disrupted', 'Duncan\'s ghost raises the storms to haunt his murderer', 'The witches cause the storms to celebrate Duncan\'s murder', 'Macbeth uses witchcraft to make the storms and darkness happen'], 'The cosmos reflects the moral disorder of regicide.', { d: 3 }),
      ],
    }),
    topic({
      id: 'mac-exam', title: 'Macbeth: past questions and exam practice', summary: 'Every recent AQA Macbeth question, plus full practice essays with mark schemes.',
      notes: `
## What AQA has asked (real papers)
Every question is an **extract + whole play** essay worth **30 marks + 4 AO4**. Notice the patterns: **characters** (Macbeth, Lady Macbeth, Macbeth & Banquo) and **themes** (ambition, the supernatural, violence, fear, change).

:::warn Don't try to "predict"
AQA has asked about ambition twice (2017, 2025) and about change twice (2020, 2023). Any character or theme can come up. Make sure you could write on: **ambition, power, kingship, guilt, the supernatural, fate, violence, masculinity/gender, appearance vs reality, loyalty, the witches, Banquo, Macduff, Malcolm, Duncan, Lady Macbeth, Macbeth**.
:::

## Themes not asked about directly in recent years
These are just as examinable: **guilt and conscience**, **kingship/good vs bad rulers**, **loyalty and betrayal**, **appearance vs reality**, **Macduff**, **the witches as characters**, **the relationship between Macbeth and Banquo**, **the role of women** (Lady Macduff too).

Use the exam practice below to write one essay a week.
`,
      keyPoints: ['30 marks + 4 SPaG; ~50 minutes', 'Extract first, then whole play', 'Recent focuses: ambition, supernatural, violence, fear, change, Lady Macbeth\'s strength', 'Prepare every major character and theme'],
      pastQuestions: [
        { year: 'Jun 2017', focus: 'How Shakespeare presents **ambition**', extract: 'Act 1 Scene 5 (Lady Macbeth / the raven)' },
        { year: 'Jun 2018', focus: 'Attitudes of **Macbeth and Banquo towards the supernatural**', extract: 'Act 1 Scene 3' },
        { year: 'Jun 2019', focus: 'How far Macbeth is presented as a **violent** character', extract: 'Act 1 Scene 2 (the Captain)' },
        { year: 'Nov 2020', focus: '"**Lady Macbeth** is a female character who **changes**" - how far do you agree?', extract: 'Act 5 Scene 1' },
        { year: 'Nov 2021', focus: 'The **relationship** between Macbeth and Lady Macbeth', extract: 'Act 2 Scene 2' },
        { year: 'Jun 2022', focus: 'How Shakespeare presents **Macbeth\'s fears**', extract: 'Act 3 Scene 1' },
        { year: 'Jun 2023', focus: 'How far Macbeth is presented as a **male character who changes**', extract: 'Act 5 Scene 3' },
        { year: 'Jun 2024', focus: 'How far **Lady Macbeth** is presented as a **strong female character**', extract: 'Act 1 Scene 7' },
        { year: 'Jun 2025', focus: 'How far Macbeth is presented as an **ambitious** character', extract: 'Act 1 Scene 7' },
      ],
      questions: [
        mc('How many marks is the AQA Shakespeare question worth in total?', ['34 (30 + 4 SPaG)', '30 (26 + 4 SPaG)', '40 (36 + 4 SPaG)', '24 (20 + 4 SPaG)'], '30 for AO1-3 and 4 for AO4.', { d: 1 }),
        mc('Which of these has NOT been the main focus of a recent AQA Macbeth question?', ['Guilt and conscience', 'Ambition', 'The supernatural', 'Violence'], 'Guilt hasn\'t been the headline focus recently - but it is just as examinable, so prepare it.', { d: 2 }),
      ],
      examQuestions: [
        examQ('**Starting with this moment in the play (Act 2 Scene 2, after the murder), explore how Shakespeare presents guilt in *Macbeth*.**\n\nWrite about:\n- how Shakespeare presents guilt in this extract\n- how Shakespeare presents guilt in the play as a whole.\n\n*Extract (2.2):* MACBETH: "Methought I heard a voice cry \'Sleep no more! Macbeth does murder sleep\'... Will all great Neptune\'s ocean wash this blood / Clean from my hand? No, this my hand will rather / The multitudinous seas incarnadine, / Making the green one red." LADY MACBETH: "My hands are of your colour, but I shame / To wear a heart so white... A little water clears us of this deed."', 34, [
          ...LEVELS,
          'Analyses blood imagery and hyperbole ("Neptune\'s ocean", "incarnadine")',
          'Contrasts Macbeth\'s guilt with Lady Macbeth\'s dismissiveness, then her 5.1 collapse',
          'Explores sleep as a symbol of innocence/peace',
          'Uses context: divine right, Christian ideas of sin and damnation',
        ], {
          meta: 'Paper 1 Section A · practice question', time: 50,
          guidance: ['Thesis idea: guilt is presented as an inescapable, divine punishment that Macbeth feels immediately and Lady Macbeth represses until it destroys her.', 'Extract: blood/ocean hyperbole; "murder sleep"; contrast "heart so white"/"a little water".', 'Whole play: dagger (2.1), Banquo\'s ghost (3.4), "full of scorpions" (3.2), sleepwalking (5.1), "Tomorrow" (5.5).'],
          model: 'Shakespeare presents guilt as an inescapable, almost divine punishment for regicide - one that Macbeth feels instantly while Lady Macbeth suppresses it until it consumes her.\n\nIn the extract, Macbeth\'s hyperbolic question, "Will all great Neptune\'s ocean wash this blood / Clean from my hand?", shows that he already recognises his guilt as permanent. The image of the vast ocean being turned "incarnadine" - blood red - inverts the idea of water as cleansing: rather than washing him clean, his sin is so great it would stain the world. The polysyllabic, Latinate "multitudinous seas incarnadine" is followed by the blunt monosyllables "Making the green one red", as if the grandeur of his language collapses into a simple, horrifying truth. For a Jacobean audience who believed kings were appointed by God, this sense of cosmic contamination would reflect the enormity of regicide...\n\n*(A full answer would go on to Lady Macbeth\'s "A little water clears us of this deed", then Banquo\'s ghost, "full of scorpions", and the sleepwalking scene where "all the perfumes of Arabia" echo and reverse 2.2.)*',
        }),
        examQ('**Starting with this speech (Act 1 Scene 3), explore how Shakespeare presents the witches as powerful.**\n\nWrite about:\n- how Shakespeare presents the witches in this extract\n- how far Shakespeare presents the witches as powerful in the play as a whole.\n\n*Extract (1.3):* FIRST WITCH: "All hail, Macbeth! hail to thee, Thane of Glamis!" SECOND WITCH: "All hail, Macbeth, hail to thee, Thane of Cawdor!" THIRD WITCH: "All hail, Macbeth, that shalt be king hereafter!" ... BANQUO: "Good sir, why do you start, and seem to fear / Things that do sound so fair?"', 34, [
          ...LEVELS,
          'Explores the triple repetition and "hail" (honour, but also violent hail)',
          'Considers how far they control events vs merely tempt (fate vs free will)',
          'Uses Banquo\'s reaction as a contrast',
          'Discusses apparitions/equivocation in Act 4 and Macduff\'s birth',
          'Context: Daemonologie, witch trials, Jacobean fear of the devil',
        ], { meta: 'Paper 1 Section A · practice question', time: 50 }),
        examQ('**Starting with this extract (Act 4 Scene 3), explore how Shakespeare presents ideas about good and bad kingship.**\n\n> **Find the extract:** open your copy of the text at the point named above and read about 30 lines. (In the real exam the extract is printed for you.)', 34, [
          ...LEVELS,
          'Analyses Malcolm\'s "king-becoming graces" list',
          'Contrasts Duncan, Edward the Confessor and Malcolm with Macbeth the tyrant',
          'Explores Scotland personified as bleeding/suffering',
          'Context: divine right, James I, Great Chain of Being',
        ], { meta: 'Paper 1 Section A · practice question', time: 50 }),
      ],
    }),
  ],
}];
