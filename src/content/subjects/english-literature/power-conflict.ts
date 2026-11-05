import type { Unit } from '../../types';
import { quote as q, topic, cards, mc, tf } from '../../dsl';
import { poem } from './poetry-helpers';

const C = 'Power and conflict';

export const powerConflictUnit: Unit = {
  id: 'pc', title: 'Poetry: Power and Conflict', option: { group: 'lit-poetry', value: 'power-conflict' },
  description: 'The 15 poems in AQA\'s Power and Conflict cluster.',
  topics: [
    topic({
      id: 'pc-overview', title: 'Power and Conflict: overview and comparison grid', summary: 'How the poems group together, past questions and how to compare.',
      notes: `
## The question
> Compare how poets present [theme] in '[named poem]' and in **one** other poem from 'Power and conflict'. [30 marks]

The named poem is printed; the second is from **memory**. Spend ~45 minutes.

## Grouping the poems
| Theme | Poems |
|---|---|
| **Power of humans / rulers** | Ozymandias, London, My Last Duchess, Tissue, Checking Out Me History |
| **Power of nature** | The Prelude, Storm on the Island, Exposure, Ozymandias (time), Kamikaze (nature's beauty) |
| **Effects/reality of war** | Exposure, Charge of the Light Brigade, Bayonet Charge, Remains, War Photographer, Poppies, Kamikaze |
| **Memory** | Remains, The Emigrée, Poppies, Kamikaze, The Prelude, War Photographer |
| **Identity** | Checking Out Me History, The Emigrée, Tissue, Kamikaze |
| **Guilt / psychological effects** | Remains, War Photographer, Kamikaze, The Prelude |
| **Loss / absence** | Poppies, The Emigrée, Kamikaze, Remains |
| **Pride and patriotism** | Charge of the Light Brigade vs Bayonet Charge / Exposure |
| **Anger / protest** | London, Checking Out Me History, Ozymandias |

## Comparison toolkit
- **Similarly / likewise / both** · **Whereas / in contrast / however**
- Compare **ideas** first, then **methods** (voice, imagery, form, structure, endings), then **context/purpose**.

:::exam Past AQA named poems
2017 Bayonet Charge (effects of war) · 2018 Ozymandias (power) · 2019 War Photographer (effects of war) · Nov 2020 Remains (difficult experiences) · Nov 2021 London (power and control) · 2022 Bayonet Charge (conflict) · 2023 My Last Duchess (effects of power) · 2024 Kamikaze (effects of conflict) · 2025 Exposure (conflict).

Not named recently: **The Prelude, Charge of the Light Brigade, Storm on the Island, Poppies, Tissue, The Emigrée, Checking Out Me History**. Any poem can be named - learn all 15.
:::
`,
      keyPoints: ['Second poem is from memory - know quotes for all 15', 'Group poems by theme to choose comparisons fast', 'Compare ideas, methods and context in every paragraph', 'Use comparative connectives throughout', 'Recently named: Bayonet Charge, Ozymandias, War Photographer, Remains, London, My Last Duchess, Kamikaze, Exposure'],
      pastQuestions: [
        { year: 'Jun 2017', focus: 'Effects of war - **Bayonet Charge**' }, { year: 'Jun 2018', focus: 'Ideas about power - **Ozymandias**' },
        { year: 'Jun 2019', focus: 'Ways people are affected by war - **War Photographer**' }, { year: 'Nov 2020', focus: 'Ways people are affected by difficult experiences - **Remains**' },
        { year: 'Nov 2021', focus: 'Ideas about power and control - **London**' }, { year: 'Jun 2022', focus: 'Ideas about conflict - **Bayonet Charge**' },
        { year: 'Jun 2023', focus: 'The effects of power - **My Last Duchess**' }, { year: 'Jun 2024', focus: 'Ways people are affected by conflict - **Kamikaze**' },
        { year: 'Jun 2025', focus: 'Ideas about conflict - **Exposure**' },
      ],
      flashcards: cards([
        ['Which P&C poems show the power of nature?', 'The Prelude, Storm on the Island, Exposure (and time in Ozymandias).'],
        ['Which P&C poems are about memory?', 'Remains, The Emigrée, Poppies, Kamikaze, The Prelude, War Photographer.'],
        ['Which P&C poems explore identity?', 'Checking Out Me History, The Emigrée, Tissue, Kamikaze.'],
        ['Which P&C poems criticise those in power?', 'Ozymandias, London, My Last Duchess, Checking Out Me History.'],
      ]),
      questions: [
        mc('Which poem would best compare with Storm on the Island for the power of nature?', ['The Prelude', 'My Last Duchess', 'Checking Out Me History', 'Poppies'], 'Both show nature as overwhelming and frightening.', { d: 2 }),
        mc('Which poem best compares with Remains for guilt and memory?', ['War Photographer', 'Ozymandias', 'London', 'Tissue'], 'Both show the psychological after-effects of conflict on an individual.', { d: 2 }),
        tf('In the poetry question, both poems are printed on the exam paper.', false, 'Only the named poem is printed; your choice must come from memory.'),
      ],
    }),
    poem({
      id: 'pc-ozymandias', title: 'Ozymandias', poet: 'Percy Bysshe Shelley', date: '1818',
      about: 'A traveller describes a ruined statue in the desert of an ancient king (Ozymandias = Ramesses II). Only legs and a shattered face remain, with an arrogant inscription - now meaningless amid empty sands. Human power is temporary; time and nature win.',
      context: 'Shelley was a **Romantic** poet and radical who hated tyranny and the monarchy. Written in a friendly sonnet competition with Horace Smith. Ramesses II\'s statue fragment had just been brought to the British Museum.',
      form: '- A **sonnet** - but with an irregular rhyme scheme (mixing Petrarchan and Shakespearean), as if the form itself is broken like the statue.\n- **Narrative frame**: "I met a traveller" → the traveller\'s words → the inscription: power is distanced through layers.\n- **Volta** after the inscription: "Nothing beside remains."',
      language: '- "**sneer of cold command**" - sibilance and harsh "c" sounds show tyranny.\n- "**Look on my Works, ye Mighty, and despair!**" - imperative and arrogance, now **ironic**.\n- "**colossal Wreck**" - oxymoron-like contrast of greatness and ruin.\n- "**The lone and level sands stretch far away**" - alliteration and long vowels stress endless, indifferent time.',
      themes: ['power of rulers', 'time and nature', 'pride/arrogance', 'art outlasting power'],
      compare: [['My Last Duchess', 'Arrogant rulers whose power is undermined (by time vs by the reader seeing through him).'], ['London', 'Both Romantic attacks on those in power.'], ['Storm on the Island', 'Nature/time\'s power over humans.']],
      quotes: [
        q('sneer of cold command', 'Harsh sibilance and alliteration capture the ruler\'s cruelty - the sculptor saw through him.', { who: 'Ozymandias', themes: ['power'] }),
        q('Look on my Works, ye Mighty, and despair!', 'The imperative boast is ironic - there are no works left.', { who: 'Ozymandias', themes: ['power', 'pride'] }),
        q('Nothing beside remains', 'Blunt short sentence and volta: power has vanished.', { who: 'Ozymandias', themes: ['time'] }),
        q('The lone and level sands stretch far away', 'Alliteration and endless imagery - nature and time outlast human power.', { who: 'Ozymandias', themes: ['time', 'nature'] }),
      ],
      past: [{ year: 'Jun 2018', focus: 'Compare how poets present ideas about **power**' }],
      questions: [mc('What is ironic about the inscription on the statue?', ['It boasts of great works but nothing remains', 'It is a love poem written for the queen', 'It praises the sculptor\'s great skill', 'It warns travellers to turn back home'], 'Time has destroyed the "Works" - pride before a fall.', { d: 2 })],
    }, C),
    poem({
      id: 'pc-london', title: 'London', poet: 'William Blake', date: '1794 (Songs of Experience)',
      about: 'The speaker walks through London and sees suffering everywhere - in every face, cry and voice. He blames the institutions of power (the Church, the monarchy, the law) for the misery of the poor.',
      context: 'Blake was a **Romantic** and radical who supported the French Revolution (1789). Industrial London was overcrowded and poor; child labour (chimney sweeps) was common. From *Songs of Experience*, which shows a corrupted world.',
      form: '- Four **quatrains**, regular **ABAB** rhyme and iambic tetrameter - a relentless, trudging rhythm like his walk (and like the system\'s unbreakable order).\n- **Dramatic monologue** in the first person.\n- Builds to the shocking final stanza (the "youthful Harlot").',
      language: '- "**chartered**" street - owned, controlled; even the river is "chartered".\n- **Anaphora**: "In every cry of every Man... In every voice" - suffering is universal.\n- "**mind-forg\'d manacles**" - metaphor: people are mentally imprisoned (by fear, ideology, institutions).\n- "**the hapless Soldier\'s sigh / Runs in blood down Palace walls**" - blames the monarchy for soldiers\' deaths.\n- "**blackning Church**" - soot and moral corruption.\n- "**Marriage hearse**" - oxymoron: love and life tainted by disease/death.',
      themes: ['power of institutions', 'suffering and poverty', 'anger/protest', 'loss of innocence'],
      compare: [['Ozymandias', 'Both attack the abuse of power by those at the top.'], ['Checking Out Me History', 'Both protest against oppressive systems controlling people\'s minds.'], ['The Emigrée', 'Contrasting views of a city - oppression vs love.']],
      quotes: [
        q('I wander thro\' each charter\'d street', '"charter\'d" suggests everything is owned and controlled by the powerful.', { who: 'London', themes: ['power'] }),
        q('mind-forg\'d manacles', 'Metaphor: people are trapped by their own minds - oppression has been internalised.', { who: 'London', themes: ['power', 'suffering'] }),
        q('the hapless Soldier\'s sigh runs in blood down Palace walls', 'Synaesthesia and blood imagery blame the monarchy for war deaths.', { who: 'London', themes: ['power', 'conflict'] }),
        q('blasts the new-born Infant\'s tear', 'Even new life is ruined from the start - innocence is destroyed.', { who: 'London', themes: ['suffering'] }),
      ],
      past: [{ year: 'Nov 2021', focus: 'Compare how poets present ideas about **power and control**' }],
      questions: [mc('What does "mind-forg\'d manacles" suggest?', ['People are mentally imprisoned by oppression', 'Londoners are forced to wear iron chains', 'Many Londoners work as blacksmiths', 'The speaker feels free and full of hope'], 'A metaphor for psychological control.', { d: 2 })],
    }, C),
    poem({
      id: 'pc-prelude', title: 'Extract from The Prelude: Stealing the Boat', poet: 'William Wordsworth', date: '1850 (written 1799)',
      about: 'The young speaker steals a boat and rows out onto a lake at night, confident and proud - until a huge mountain peak appears to rise up and pursue him. Terrified, he returns the boat and is haunted for days by "huge and mighty forms".',
      context: 'Wordsworth was a **Romantic** poet who believed nature was a powerful, spiritual, moral teacher. *The Prelude* is an autobiographical epic about how his mind was shaped. Set in the Lake District.',
      form: '- **Blank verse** (unrhymed iambic pentameter) - natural, reflective, like speech/memory.\n- Long **enjambed** lines mirror the flowing water and his journey.\n- **Shift in tone**: confident → fearful (volta at "when, from behind that craggy steep") → troubled reflection.',
      language: '- "**led by her**" - nature personified as a guiding mother.\n- "**an act of stealth / And troubled pleasure**" - guilt from the start.\n- "**a huge peak, black and huge**" - repetition and simple adjectives show childish terror.\n- "**Upreared its head**" - personification: the mountain is like a monster.\n- "**huge and mighty forms, that do not live / Like living men**" - lasting psychological effect.',
      themes: ['power of nature', 'fear', 'memory', 'guilt', 'pride'],
      compare: [['Storm on the Island', 'Both show nature\'s overwhelming power and human fear.'], ['Exposure', 'Nature as a deadly enemy vs a moral teacher.'], ['Ozymandias', 'Human pride diminished by something greater.']],
      quotes: [
        q('One summer evening (led by her)', 'Nature personified as a guiding female presence - the boy\'s relationship with nature is personal.', { who: 'The Prelude', themes: ['nature'] }),
        q('an act of stealth and troubled pleasure', 'Oxymoronic "troubled pleasure" - guilt mixes with excitement.', { who: 'The Prelude', themes: ['guilt'] }),
        q('a huge peak, black and huge', 'Repetition of "huge" captures the child\'s terror and limited vocabulary.', { who: 'The Prelude', themes: ['nature', 'fear'] }),
        q('huge and mighty forms, that do not live like living men', 'The experience permanently changes his mind - nature\'s power is beyond human understanding.', { who: 'The Prelude', themes: ['memory', 'nature'] }),
      ],
    }, C),
    poem({
      id: 'pc-duchess', title: 'My Last Duchess', poet: 'Robert Browning', date: '1842',
      about: 'The Duke of Ferrara shows an envoy a portrait of his late wife. He complains she smiled at everyone and was too easily pleased - and reveals he "gave commands" so her smiles stopped (he had her killed). He is now arranging his next marriage.',
      context: 'Based on **Alfonso II, Duke of Ferrara**, whose young wife Lucrezia died in 1561 (rumoured poisoning). Browning (Victorian) uses the Renaissance setting to explore power, possession and patriarchy.',
      form: '- **Dramatic monologue**: only the Duke speaks - he controls the conversation like he controlled her.\n- **Rhyming couplets** in iambic pentameter, but heavy **enjambment** hides the rhyme - controlled surface, uncontrolled anger beneath.\n- **Caesura** and dashes show him losing composure.',
      language: '- "**Looking as if she were alive**" - chilling: he prefers her as a painting he can control.\n- "**since none puts by / The curtain I have drawn for you, but I**" - possession and control.\n- "**as if she ranked / My gift of a nine-hundred-years-old name / With anybody\'s gift**" - pride in status.\n- "**I gave commands; / Then all smiles stopped together**" - euphemism for murder; caesura.\n- "**Neptune... / Taming a sea-horse**" - final image of domination.',
      themes: ['power and control', 'pride', 'gender and possession', 'jealousy'],
      compare: [['Ozymandias', 'Arrogant, powerful men; art reveals their character.'], ['London', 'Abuse of power (personal vs institutional).'], ['Checking Out Me History', 'Power to control others\' identities/stories.']],
      quotes: [
        q('Looking as if she were alive', 'He prefers her lifeless and controllable as a painting.', { who: 'My Last Duchess', themes: ['power', 'possession'] }),
        q('since none puts by the curtain I have drawn for you, but I', 'He alone controls who sees her - possession continues after death.', { who: 'My Last Duchess', themes: ['power', 'control'] }),
        q('I gave commands; then all smiles stopped together', 'Euphemism for her murder; the caesura is a chilling pause.', { who: 'My Last Duchess', themes: ['power'] }),
        q('Notice Neptune, though, taming a sea-horse', 'Final image of dominance - reveals his attitude to his next wife.', { who: 'My Last Duchess', themes: ['power', 'gender'] }),
      ],
      past: [{ year: 'Jun 2023', focus: 'Compare how poets present **the effects of power**' }],
      questions: [mc('Why does Browning use enjambment over the rhyming couplets?', ['To suggest the Duke\'s controlled surface hiding anger and obsession', 'Because Browning found it hard to end lines on a rhyme', 'To make the poem sound like a cheerful, simple song', 'To show the Duchess interrupting the Duke as he speaks'], 'The rhyme (control) is muffled by run-on lines (loss of control).', { d: 3 })],
    }, C),
    poem({
      id: 'pc-charge', title: 'The Charge of the Light Brigade', poet: 'Alfred, Lord Tennyson', date: '1854',
      about: 'Describes the disastrous charge of 600 British cavalry into the "valley of Death" at the **Battle of Balaclava** (Crimean War) after a miscommunicated order. The soldiers obey without question; Tennyson celebrates their courage and urges us to honour them.',
      context: 'Tennyson was **Poet Laureate**; he wrote it within weeks of reading the report in *The Times*. A blundered order sent cavalry against Russian guns; many were killed or wounded.',
      form: '- **Dactylic** metre ("**Half** a league, **half** a league") - the galloping rhythm of horses.\n- Repetition and refrains ("Rode the six hundred") - a memorial chant.\n- Narrative structure: charge → battle → retreat → tribute. Shorter stanzas as fewer men return ("Not the six hundred").',
      language: '- "**Into the valley of Death**" - biblical echo (Psalm 23).\n- "**Someone had blundered**" - brief criticism of command.\n- "**Theirs not to reason why, / Theirs but to do and die**" - duty and obedience.\n- "**jaws of Death... mouth of Hell**" - personification of death as a monster.\n- "**Honour the Light Brigade, / Noble six hundred!**" - imperative, patriotic tribute.',
      themes: ['bravery and duty', 'patriotism', 'reality of war', 'blind obedience'],
      compare: [['Bayonet Charge', 'Patriotic glory vs the terror of an individual soldier.'], ['Exposure', 'Heroic battle vs the futility of waiting and dying of cold.'], ['Remains', 'Glorification vs psychological damage.']],
      quotes: [
        q('Into the valley of Death rode the six hundred', 'Biblical allusion and repetition create a solemn, inevitable doom.', { who: 'Charge of the Light Brigade', themes: ['war', 'death'] }),
        q('Someone had blundered', 'A rare hint of criticism - the leaders\' mistake.', { who: 'Charge of the Light Brigade', themes: ['war', 'power'] }),
        q('Theirs not to reason why, theirs but to do and die', 'Anaphora and rhyme celebrate obedience - or expose its tragedy.', { who: 'Charge of the Light Brigade', themes: ['duty'] }),
        q('Honour the Light Brigade, noble six hundred!', 'Imperative commands the reader to remember them as heroes.', { who: 'Charge of the Light Brigade', themes: ['patriotism'] }),
      ],
    }, C),
    poem({
      id: 'pc-exposure', title: 'Exposure', poet: 'Wilfred Owen', date: '1917 (published 1920)',
      about: 'Soldiers in the WW1 trenches suffer through a freezing night and dawn. Nothing happens - no battle - yet the weather is killing them. They drift towards death, dreaming of home, feeling forgotten by God.',
      context: 'Owen served on the Western Front, was treated for shell shock at Craiglockhart, and was killed one week before the **Armistice (1918)**. He wrote to expose the "pity of war", rejecting propaganda.',
      form: '- Eight stanzas of five lines; each ends with a short, half-length line ("**But nothing happens.**") - anticlimax, futility.\n- **Pararhyme / half-rhyme** (silent/salient, knive us/nervous) - unsettling, nothing resolves.\n- **Cyclical**: starts and ends with "But nothing happens" - endless suffering.',
      language: '- "**Our brains ache, in the merciless iced east winds that knive us**" - personification: weather is the enemy; sibilance like the wind.\n- "**Dawn massing in the east her melancholy army**" - even dawn is a military threat.\n- "**Pale flakes with fingering stealth come feeling for our faces**" - snow as a sinister enemy; alliteration.\n- Rhetorical questions: "**What are we doing here?**"\n- "**For love of God seems dying**" - loss of faith.\n- "**All their eyes are ice**" - death; final stanza.',
      themes: ['reality of war', 'power of nature', 'futility', 'suffering', 'loss of faith'],
      compare: [['Storm on the Island', 'Nature as an enemy force.'], ['Charge of the Light Brigade', 'Futility vs heroic glory.'], ['Bayonet Charge', 'The physical and mental reality of the soldier\'s experience.']],
      quotes: [
        q('Our brains ache, in the merciless iced east winds that knive us', 'Personification and sibilance make the weather a violent enemy.', { who: 'Exposure', themes: ['nature', 'suffering'] }),
        q('But nothing happens', 'Repeated anticlimax - the futility and boredom of war.', { who: 'Exposure', themes: ['futility'] }),
        q('Dawn massing in the east her melancholy army', 'Dawn is militarised - no relief, only another attack.', { who: 'Exposure', themes: ['nature', 'war'] }),
        q('For love of God seems dying', 'War destroys faith; ambiguity of "dying" love.', { who: 'Exposure', themes: ['religion', 'suffering'] }),
      ],
      past: [{ year: 'Jun 2025', focus: 'Compare how poets present **ideas about conflict**' }],
      questions: [mc('What is the effect of the repeated line "But nothing happens"?', ['It emphasises futility and endless waiting', 'It shows the battle is over and they won', 'It creates a happy ending', 'It shows the weather improving'], 'Anticlimax shows the real enemy is boredom, cold and despair.', { d: 2 })],
    }, C),
    poem({
      id: 'pc-storm', title: 'Storm on the Island', poet: 'Seamus Heaney', date: '1966', copyrightNote: true,
      about: 'Islanders confidently prepare for a storm ("We are prepared"), but as it hits they are attacked and isolated by the wind and sea. They realise they fear something invisible - "a huge nothing".',
      context: 'Heaney grew up in rural **Northern Ireland**. The title may pun on "**Stormont**", the Northern Irish parliament - possibly an allegory for the coming **Troubles** (political violence from the late 1960s).',
      form: '- A single stanza of **blank verse** - like the solid, compact houses (or the island).\n- Conversational, first-person plural "**we**" - a community voice.\n- **Enjambment** and caesura mimic the storm\'s unpredictable force.',
      language: '- "**We are prepared: we build our houses squat**" - confident opening; monosyllables.\n- "**spits like a tame cat / Turned savage**" - simile: the familiar sea becomes dangerous.\n- **Military semantic field**: "**exploding**", "**strafe**", "**salvo**", "**bombarded**" - nature as war.\n- "**Strange, it is a huge nothing that we fear**" - oxymoronic ending: fear of the invisible/unknown.',
      themes: ['power of nature', 'fear', 'isolation', 'conflict (allegory)'],
      compare: [['Exposure', 'Nature as an attacking army; humans helpless.'], ['The Prelude', 'Nature\'s power produces fear.'], ['Kamikaze', 'Different presentations of nature\'s power.']],
      quotes: [
        q('We are prepared: we build our houses squat', 'Confident, practical opening - which the storm will undermine.', { who: 'Storm on the Island', themes: ['nature'] }),
        q('spits like a tame cat turned savage', 'Simile: the familiar turns dangerous.', { who: 'Storm on the Island', themes: ['nature', 'fear'] }),
        q('We are bombarded by the empty air', 'Military metaphor and paradox - attacked by "nothing".', { who: 'Storm on the Island', themes: ['nature', 'conflict'] }),
        q('Strange, it is a huge nothing that we fear', 'Oxymoron: the invisible, unknown threat - possibly political conflict.', { who: 'Storm on the Island', themes: ['fear'] }),
      ],
    }, C),
    poem({
      id: 'pc-bayonet', title: 'Bayonet Charge', poet: 'Ted Hughes', date: '1957', copyrightNote: true,
      about: 'A WW1 soldier suddenly finds himself running across no-man\'s-land in a bayonet charge. Terror replaces patriotism; he stops, confused, sees a wounded hare, then plunges on in panic.',
      context: 'Hughes\'s father fought at **Gallipoli** in WW1 and told him stories. Hughes was fascinated by nature and violence.',
      form: '- Three stanzas: action → frozen moment of thought → action again.\n- Starts **in medias res** ("Suddenly he awoke and was running").\n- Third-person - he could be any soldier. Enjambment and caesura create breathless, stumbling pace.',
      language: '- "**raw / In raw-seamed hot khaki**" - repetition; inexperience, discomfort.\n- "**Bullets smacking the belly out of the air**" - violent personification.\n- "**The patriotic tear that had brimmed in his eye / Sweating like molten iron**" - patriotism turns to pain.\n- "**cold clockwork of the stars and the nations**" - he is a tiny cog in a machine.\n- "**King, honour, human dignity, etcetera / Dropped like luxuries**" - patriotic ideals abandoned.\n- "**a yellow hare that rolled like a flame**" - nature suffering too.\n- "**His terror\'s touchy dynamite**".',
      themes: ['reality of war', 'fear', 'patriotism exposed', 'loss of identity'],
      compare: [['Charge of the Light Brigade', 'Individual terror vs collective heroic duty.'], ['Exposure', 'Soldiers\' suffering and loss of belief.'], ['Remains', 'The individual soldier\'s mind and fear.']],
      quotes: [
        q('Suddenly he awoke and was running', 'In medias res - shock and confusion; was patriotism a dream?', { who: 'Bayonet Charge', themes: ['war', 'fear'] }),
        q('Bullets smacking the belly out of the air', 'Violent personification - even the air is wounded.', { who: 'Bayonet Charge', themes: ['war'] }),
        q('In what cold clockwork of the stars and the nations', 'Metaphor: the soldier is a powerless part in a mechanical system.', { who: 'Bayonet Charge', themes: ['power', 'war'] }),
        q('King, honour, human dignity, etcetera dropped like luxuries', '"etcetera" dismisses ideals - survival matters more than patriotism.', { who: 'Bayonet Charge', themes: ['patriotism'] }),
      ],
      past: [{ year: 'Jun 2017', focus: 'Compare how poets present **the effects of war**' }, { year: 'Jun 2022', focus: 'Compare how poets present **ideas about conflict**' }],
    }, C),
    poem({
      id: 'pc-remains', title: 'Remains', poet: 'Simon Armitage', date: '2008', copyrightNote: true,
      about: 'A soldier describes shooting a looter (who was "probably armed, possibly not") in Iraq with two comrades. Back home he can\'t escape the memory - the man is "here in my head", and drink and drugs can\'t remove him.',
      context: 'Based on interviews with **Guardsman Tromans** for *The Not Dead* (2008), a documentary about veterans with **PTSD** after Iraq and Bosnia.',
      form: '- **Dramatic monologue** with **colloquial** language ("legs it", "mates") - realistic voice.\n- Starts casually ("On another occasion") as if an anecdote - then shifts to the present tense and obsession.\n- Final stanza\'s short lines and enjambment show the memory won\'t stop.',
      language: '- "**probably armed, possibly not**" - doubt and guilt.\n- "**I see every round as it rips through his life**" - violent verb, present tense.\n- "**tosses his guts back into his body**" - grotesque, dehumanising imagery.\n- "**he\'s here in my head when I close one eye and dig**" - the memory remains.\n- "**his bloody life in my bloody hands**" - pun: swearing and literal blood; echoes Lady Macbeth\'s guilt.',
      themes: ['guilt', 'memory', 'psychological effects of conflict', 'reality of war'],
      compare: [['War Photographer', 'Haunting memories and the after-effects of conflict.'], ['Kamikaze', 'Lasting psychological consequences of a moment in war.'], ['Bayonet Charge', 'The individual soldier\'s experience.']],
      quotes: [
        q('probably armed, possibly not', 'Uncertainty that fuels his guilt.', { who: 'Remains', themes: ['guilt'] }),
        q('I see every round as it rips through his life', 'Present tense and violent verb - the memory replays endlessly.', { who: 'Remains', themes: ['memory', 'violence'] }),
        q('he\'s here in my head when I close one eye and dig', 'The dead man "remains" - PTSD.', { who: 'Remains', themes: ['memory', 'guilt'] }),
        q('his bloody life in my bloody hands', 'Double meaning of "bloody" - guilt that can\'t be washed away.', { who: 'Remains', themes: ['guilt'] }),
      ],
      past: [{ year: 'Nov 2020', focus: 'Compare how poets present **the ways people are affected by difficult experiences**' }],
    }, C),
    poem({
      id: 'pc-poppies', title: 'Poppies', poet: 'Jane Weir', date: '2009', copyrightNote: true,
      about: 'A mother describes her son leaving home (for war), and her grief and fear afterwards; she visits a war memorial, hoping to hear his "playground voice". It is unclear whether he has died.',
      context: 'Commissioned by **Carol Ann Duffy** in 2009 (with other poems about the wars in Iraq and Afghanistan). Weir was a **textile designer** - hence fabric imagery.',
      form: '- **Free verse**, four stanzas - like a stream of memory; long sentences and enjambment.\n- Moves from domestic moment → the son leaving → the mother alone at the memorial.\n- Second-person address ("you") to the son.',
      language: '- "**Three days before Armistice Sunday**" - setting links personal and national loss.\n- **Textile semantic field**: "**felt**", "**stitch**", "**tucks, darts, pleats**".\n- "**All my words / flattened, rolled, turned into felt**" - she can\'t express her emotions.\n- "**I was brave, as I walked / with you, to the front door**" - domestic bravery vs military bravery.\n- "**the dove pulled freely against the sky, / an ornamental stitch**" - peace, freedom, the son\'s departure.\n- "**hoping to hear / your playground voice catching on the wind**" - longing for his childhood.',
      themes: ['loss and grief', 'memory', 'effects of war on families', 'parent and child'],
      compare: [['Kamikaze', 'Family perspective on war and loss.'], ['War Photographer', 'Those left behind and the suffering of others.'], ['The Emigrée', 'Memory and loss of something precious.']],
      quotes: [
        q('Three days before Armistice Sunday and poppies had already been placed on individual war graves', 'Opening links personal grief to national remembrance.', { who: 'Poppies', themes: ['loss', 'memory'] }),
        q('All my words flattened, rolled, turned into felt', 'Textile metaphor/pun: words become feeling she can\'t express.', { who: 'Poppies', themes: ['loss'] }),
        q('I was brave, as I walked with you, to the front door', 'Redefines bravery - the mother\'s quiet courage.', { who: 'Poppies', themes: ['loss', 'family'] }),
        q('hoping to hear your playground voice catching on the wind', 'She longs for his childhood - ambiguous whether he has died.', { who: 'Poppies', themes: ['memory', 'loss'] }),
      ],
    }, C),
    poem({
      id: 'pc-photographer', title: 'War Photographer', poet: 'Carol Ann Duffy', date: '1985', copyrightNote: true,
      about: 'A war photographer develops his photos in his darkroom in rural England, haunted by the scenes of suffering he witnessed. He knows the editor will choose only a few for the Sunday supplement, and readers will briefly feel sad before forgetting.',
      context: 'Duffy was friends with war photographers (e.g. **Don McCullin**) and was interested in the difficulty of capturing and the public\'s indifference to suffering. Places named: **Belfast, Beirut, Phnom Penh**.',
      form: '- Four regular **sestets** (ABBCDD) with rhyming couplets - order, like his "ordered rows" of photos, contrasting chaotic war.\n- Moves from the darkroom → memories → the editor/readers → his departure.',
      language: '- "**spools of suffering set out in ordered rows**" - sibilance; religious imagery (like a priest, "**All flesh is grass**").\n- "**Belfast. Beirut. Phnom Penh.**" - list and caesura: conflict everywhere.\n- "**a stranger\'s features / faintly start to twist before his eyes, / a half-formed ghost**" - the image (and memory) develops.\n- "**A hundred agonies in black and white**" - stark contrast.\n- "**The reader\'s eyeballs prick / with tears between the bath and pre-lunch beers**" - indifference of comfortable readers.\n- "**they do not care**" - final bitter judgement.',
      themes: ['effects of war', 'memory and guilt', 'indifference', 'the role of the media'],
      compare: [['Remains', 'Haunted by memories of violence.'], ['Poppies', 'Those at home and their responses to war.'], ['Tissue', 'Paper/images and their power.']],
      quotes: [
        q('spools of suffering set out in ordered rows', 'Sibilance and order - he tries to control the chaos.', { who: 'War Photographer', themes: ['war', 'memory'] }),
        q('Belfast. Beirut. Phnom Penh.', 'Caesura-heavy list: suffering is global.', { who: 'War Photographer', themes: ['war'] }),
        q('A hundred agonies in black and white', 'Hyperbole and stark contrast of black and white - moral clarity.', { who: 'War Photographer', themes: ['war'] }),
        q('The reader\'s eyeballs prick with tears between the bath and pre-lunch beers', 'Internal rhyme mocks readers\' brief, comfortable sympathy.', { who: 'War Photographer', themes: ['indifference'] }),
      ],
      past: [{ year: 'Jun 2019', focus: 'Compare how poets present **the ways that people are affected by war**' }],
    }, C),
    poem({
      id: 'pc-tissue', title: 'Tissue', poet: 'Imtiaz Dharker', date: '2006', copyrightNote: true,
      about: 'The speaker reflects on how paper - in religious books, maps, receipts and records - is fragile yet controls lives. She imagines building with paper so that structures let light through, and ends by linking paper to human skin.',
      context: 'Dharker (born in Pakistan, raised in Glasgow) writes about identity, borders and religion. The poem questions human power structures (bureaucracy, borders, buildings).',
      form: '- **Free verse**, irregular stanzas mostly of four lines - fragile and flexible like tissue.\n- Final **single line** ("**turned into your skin**") stands alone - human life is what matters.\n- Enjambment carries ideas across stanzas.',
      language: '- "**Paper that lets the light / shine through, this / is what could alter things**" - light as hope/truth.\n- "**maps too. The sun shines through / their borderlines**" - borders are artificial.\n- "**Fine slips from grocery shops**" - receipts record lives.\n- "**If buildings were paper, I might / feel their drift**" - human structures should be flexible.\n- "**turned into your skin**" - humans are as fragile as paper.',
      themes: ['power of humans/structures', 'fragility', 'identity', 'religion'],
      compare: [['Ozymandias', 'Temporary nature of human power.'], ['Checking Out Me History', 'Written records and control over identity.'], ['The Emigrée', 'Borders, places and identity.']],
      quotes: [
        q('Paper that lets the light shine through, this is what could alter things', 'Light symbolises truth and hope - fragile things can change the world.', { who: 'Tissue', themes: ['power'] }),
        q('maps too. The sun shines through their borderlines', 'Borders are human-made and impermanent.', { who: 'Tissue', themes: ['power', 'identity'] }),
        q('turned into your skin', 'Isolated final line: humanity is fragile and precious.', { who: 'Tissue', themes: ['fragility'] }),
      ],
    }, C),
    poem({
      id: 'pc-emigree', title: 'The Emigrée', poet: 'Carol Rumens', date: '1993', copyrightNote: true,
      about: 'An emigrant remembers the city she left as a child: in her memory it is always bathed in sunlight, though she hears it is now at war or ruled by tyrants. She can\'t return, but carries the city with her; it gives her identity and comfort.',
      context: 'Rumens writes about exile and Eastern Europe. The country is never named - it could be anywhere, making the experience universal.',
      form: '- Three stanzas; each ends with "**sunlight**" (or a variation) - persistent positive memory.\n- First-person, reflective; moves from past → present threat → personal defiance.',
      language: '- "**There once was a country... I left it as a child**" - fairy-tale opening.\n- "**my memory of it is sunlight-clear**".\n- "**It may be at war, it may be sick with tyrants**" - disease metaphor for oppression.\n- "**I comb its hair and love its shining eyes**" - personification: the city as a child.\n- "**they accuse me of being dark in their free city**" - prejudice she faces now.\n- "**It tastes of sunlight**" - synaesthesia; memory as sensory comfort.',
      themes: ['memory', 'identity', 'loss', 'power of tyranny', 'belonging'],
      compare: [['Kamikaze', 'Memory, identity and exile from home/family.'], ['Checking Out Me History', 'Identity shaped by origins and power.'], ['London', 'Contrasting presentations of a city.']],
      quotes: [
        q('There once was a country... I left it as a child', 'Fairy-tale opening - nostalgic, idealised memory.', { who: 'The Emigrée', themes: ['memory'] }),
        q('It may be at war, it may be sick with tyrants', 'Hints at conflict and oppression the speaker refuses to let spoil her memory.', { who: 'The Emigrée', themes: ['power', 'memory'] }),
        q('I comb its hair and love its shining eyes', 'Personification: she cares for the city like a child.', { who: 'The Emigrée', themes: ['identity'] }),
        q('It tastes of sunlight', 'Synaesthesia - memory is warm and comforting.', { who: 'The Emigrée', themes: ['memory'] }),
      ],
    }, C),
    poem({
      id: 'pc-history', title: 'Checking Out Me History', poet: 'John Agard', date: '2007', copyrightNote: true,
      about: 'The speaker protests that his British education taught him only white European history and nursery rhymes, ignoring Black and Caribbean heroes such as Toussaint L\'Ouverture, Nanny de Maroon and Mary Seacole. He resolves to discover his own history and identity.',
      context: 'Agard was born in **Guyana** (1949) and moved to Britain in 1977. The poem challenges a colonial, Eurocentric curriculum.',
      form: '- **Phonetic Caribbean dialect** ("Dem tell me") - asserts his identity.\n- Two alternating voices: blunt, repetitive stanzas about what "dem" taught vs flowing, *italicised* stanzas celebrating Black heroes.\n- Irregular rhyme, rhythmic like oral tradition; final declaration.',
      language: '- "**Dem tell me / Dem tell me / Wha dem want to tell me**" - repetition shows frustration and control.\n- "**Bandage up me eye with me own history / Blind me to me own identity**" - metaphor: education has blinded him.\n- Juxtaposes nursery rhymes ("Dick Whittington and he cat") with heroes - trivialises what he was taught.\n- Heroes in light imagery: Nanny "**fire-woman**", Mary Seacole "**a healing star**", "**a yellow sunrise**".\n- "**I carving out me identity**" - active, defiant present tense.',
      themes: ['identity', 'power of education/history', 'protest', 'colonialism'],
      compare: [['London', 'Protest against oppressive power controlling minds.'], ['The Emigrée', 'Identity and heritage.'], ['Tissue', 'Who writes the records and controls the story.']],
      quotes: [
        q('Dem tell me, dem tell me, wha dem want to tell me', 'Repetition and dialect show resentment at being controlled.', { who: 'Checking Out Me History', themes: ['power', 'identity'] }),
        q('Bandage up me eye with me own history', 'Metaphor: his education has blinded him to his heritage.', { who: 'Checking Out Me History', themes: ['identity'] }),
        q('a healing star among the wounded', 'Light imagery celebrates Mary Seacole as heroic and guiding.', { who: 'Checking Out Me History', themes: ['identity'] }),
        q('I carving out me identity', 'Defiant final line - he takes control of his own identity.', { who: 'Checking Out Me History', themes: ['identity', 'power'] }),
      ],
    }, C),
    poem({
      id: 'pc-kamikaze', title: 'Kamikaze', poet: 'Beatrice Garland', date: '2013', copyrightNote: true,
      about: 'A Japanese kamikaze pilot in WW2 sets out on his suicide mission but, seeing the beauty of the sea and remembering his childhood, turns back. His family and community then treat him as if he no longer exists. The story is told through his daughter.',
      context: 'In WW2, Japanese **kamikaze** pilots flew suicide missions; returning was considered deeply shameful. The poem explores honour, duty and family.',
      form: '- Seven sestets; third-person narration, then the daughter\'s voice (in italics) speaking to her children.\n- Narrative moves from departure → beautiful sea and memory → rejection.\n- Final line poses an unanswered question.',
      language: '- "**Her father embarked at sunrise / with a flask of water, a samurai sword**" - ritual and honour.\n- "**a shaven head / full of powerful incantations**" - propaganda/brainwashing.\n- "**little fishing boats / strung out like bunting**" - celebration, innocence, home.\n- "**dark shoals of fishes / flashing silver**" - vivid nature brings back childhood memories.\n- "**we too learned / to be silent, to live as though / he had never returned**" - social death.\n- "**he must have wondered / which had been the better way to die**".',
      themes: ['effects of conflict', 'duty and honour', 'family', 'memory', 'nature'],
      compare: [['Poppies', 'Families\' experience of war.'], ['Remains', 'A soldier\'s life changed permanently by a decision in war.'], ['The Emigrée', 'Exile and memories of the natural world/home.']],
      quotes: [
        q('Her father embarked at sunrise with a flask of water, a samurai sword', 'Ritual imagery of honour and duty.', { who: 'Kamikaze', themes: ['duty'] }),
        q('a shaven head full of powerful incantations', 'Suggests indoctrination by propaganda.', { who: 'Kamikaze', themes: ['power', 'duty'] }),
        q('the little fishing boats strung out like bunting', 'Simile: celebration, home and innocence pull him back.', { who: 'Kamikaze', themes: ['nature', 'memory'] }),
        q('he must have wondered which had been the better way to die', 'Rejection by his family was a living death.', { who: 'Kamikaze', themes: ['effects of conflict'] }),
      ],
      past: [{ year: 'Jun 2024', focus: 'Compare how poets present **the ways people are affected by conflict**' }],
    }, C),
  ],
};
