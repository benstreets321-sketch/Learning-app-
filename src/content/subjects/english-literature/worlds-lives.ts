import type { Unit } from '../../types';
import { quote as q, topic, cards, mc, tf } from '../../dsl';
import { poem } from './poetry-helpers';

const C = 'Worlds and lives';

/**
 * Worlds and Lives is AQA's newest cluster (first examined 2025). Most poems are recent and in copyright,
 * so quotations are only given for public-domain poems; for the others, use your printed anthology and
 * add your own quotes in the "My notes" tab.
 */
export const worldsLivesUnit: Unit = {
  id: 'wl', title: 'Poetry: Worlds and Lives', option: { group: 'lit-poetry', value: 'worlds-lives' },
  description: 'AQA\'s newest cluster (first exam 2025): place, identity, society and belonging.',
  topics: [
    topic({
      id: 'wl-overview', title: 'Worlds and Lives: overview and comparison grid', summary: 'The 15 poems, how they group, and how to revise a new cluster.',
      notes: `
**First examined in 2025.** The poems span 1798 to the present day and explore how **places, societies and histories** shape **people's lives and identities**.

| # | Poem | Poet |
|---|---|---|
| 1 | Lines Written in Early Spring | William Wordsworth |
| 2 | England in 1819 | Percy Bysshe Shelley |
| 3 | Shall Earth no more inspire thee | Emily Brontë |
| 4 | In a London Drawingroom | George Eliot |
| 5 | On an Afternoon Train from Purley to Victoria, 1955 | James Berry |
| 6 | Name Journeys | Raman Mundair |
| 7 | pot | Shamshad Khan |
| 8 | A Wider View | Seni Seneviratne |
| 9 | Homing | Liz Berry |
| 10 | A Century Later | Imtiaz Dharker |
| 11 | The Jewellery Maker | Louisa Adjoa Parker |
| 12 | With Birds You're Never Lonely | Raymond Antrobus |
| 13 | A Portable Paradise | Roger Robinson |
| 14 | Like an Heiress | Grace Nichols |
| 15 | Thirteen | Caleb Femi |

## Grouping
| Theme | Poems |
|---|---|
| **Place shaping lives** | In a London Drawingroom, Lines Written in Early Spring, Shall Earth no more inspire thee, Homing, A Portable Paradise |
| **Nature as healing / spiritual** | Lines Written in Early Spring, Shall Earth no more inspire thee, With Birds You're Never Lonely |
| **Society and injustice** | England in 1819, Lines Written in Early Spring ("what man has made of man"), Thirteen, A Century Later |
| **Identity, heritage and names** | Name Journeys, Homing, pot, On an Afternoon Train..., Like an Heiress, The Jewellery Maker |
| **Migration and belonging** | On an Afternoon Train..., A Portable Paradise, Name Journeys, A Wider View |
| **Youth and education** | A Century Later, Thirteen |

:::exam The 2025 question
"Compare how poets present the **ways places affect people's lives** in '**In a London Drawingroom**' and in one other poem from 'Worlds and lives'."
:::

:::tip Revising a new cluster
Because there are fewer revision guides, make your own: for each poem write **one sentence summary, three short quotes, two themes, one method, one comparison**. Use the "My notes" tab on each poem.
:::
`,
      keyPoints: ['First examined 2025', 'Themes: place, identity, society, belonging, nature', 'Make your own quote bank from the printed anthology', '2025 named poem: In a London Drawingroom'],
      pastQuestions: [{ year: 'Jun 2025', focus: 'The ways **places affect people\'s lives** - **In a London Drawingroom**' }],
      flashcards: cards([
        ['When was Worlds and Lives first examined?', '2025.'],
        ['Which W&L poems present nature as healing or spiritual?', 'Lines Written in Early Spring, Shall Earth no more inspire thee, With Birds You\'re Never Lonely.'],
        ['Which W&L poems protest about society?', 'England in 1819, Lines Written in Early Spring, Thirteen, A Century Later.'],
      ]),
      questions: [
        mc('What was the focus of the first Worlds and Lives question (2025)?', ['The ways places affect people\'s lives', 'The ways people remember the past', 'The effects of conflict on families', 'Relationships between parents and children'], 'Named poem: In a London Drawingroom.', { d: 1 }),
        tf('Worlds and Lives contains 15 poems from 1789 to the present day.', true, 'Like the other clusters.'),
      ],
    }),
    poem({ id: 'wl-spring', title: 'Lines Written in Early Spring', poet: 'William Wordsworth', date: '1798',
      about: 'Sitting in a grove in spring, the speaker feels the joy of nature - flowers, birds, budding twigs - and believes nature links to the human soul. But it saddens him to think "what man has made of man".',
      context: 'From *Lyrical Ballads* (1798), the founding text of English **Romanticism**. Written amid the **French Revolution** and industrialisation; Wordsworth contrasts natural harmony with human cruelty and inequality.',
      form: '- Six quatrains, ABAB rhyme, regular rhythm - the order and calm of nature.\n- The refrain-like "what man has made of man" returns at the end as a rhetorical lament.',
      language: '- "**To her fair works did Nature link / The human soul**" - nature personified as a creator.\n- Birds and flowers "**enjoy the air**" - pleasure and freedom in nature.\n- "**And much it grieved my heart to think / What man has made of man**" - society corrupts.',
      themes: ['nature and humanity', 'society and injustice', 'spirituality', 'place'],
      compare: [['England in 1819', 'Both Romantic protests about society.'], ['Shall Earth no more inspire thee', 'Nature as spiritual comfort.'], ['In a London Drawingroom', 'Natural place vs oppressive city.']],
      quotes: [
        q('To her fair works did Nature link the human soul that through me ran', 'Nature as a creative mother connected to the soul - Romantic belief.', { who: 'Lines Written in Early Spring', themes: ['nature'] }),
        q('And much it grieved my heart to think what man has made of man', 'Polyptoton "man... man": humans have damaged each other - social criticism.', { who: 'Lines Written in Early Spring', themes: ['society'] }),
      ] }, C),
    poem({ id: 'wl-1819', title: 'England in 1819', poet: 'Percy Bysshe Shelley', date: '1819',
      about: 'A furious sonnet attacking England\'s rulers: the old "mad, blind" King George III, his worthless sons, corrupt laws, religion and army - and the starving people. It ends hoping a glorious "Phantom" (revolution/liberty) may burst out.',
      context: 'Written after the **Peterloo Massacre** (August 1819), when cavalry charged a peaceful crowd demanding reform in Manchester. Too radical to be published until 1839.',
      form: '- A **sonnet**, but one long list-like sentence of accusations until the final couplet\'s hope (volta).\n- Unusual rhyme scheme - an angry break with convention.',
      language: '- "**An old, mad, blind, despised, and dying king**" - asyndetic list of insults.\n- "**Princes, the dregs of their dull race**" - contempt.\n- "**A people starved and stabbed in the untilled field**" - Peterloo.\n- "**a glorious Phantom may / Burst, to illumine our tempestuous day**" - hope for revolution.',
      themes: ['power and corruption', 'society and injustice', 'protest', 'hope'],
      compare: [['Lines Written in Early Spring', 'Romantic social criticism.'], ['Thirteen', 'Injustice by those in authority.'], ['A Century Later', 'Hope against oppression.']],
      quotes: [
        q('An old, mad, blind, despised, and dying king', 'List of adjectives attacks George III and the monarchy.', { who: 'England in 1819', themes: ['power'] }),
        q('A people starved and stabbed in the untilled field', 'Alliterative violence recalls the Peterloo Massacre.', { who: 'England in 1819', themes: ['injustice'] }),
        q('a glorious Phantom may burst, to illumine our tempestuous day', 'Hopeful volta: revolution or liberty may come.', { who: 'England in 1819', themes: ['hope'] }),
      ] }, C),
    poem({ id: 'wl-earth', title: 'Shall Earth no more inspire thee', poet: 'Emily Brontë', date: '1841',
      about: 'The voice of the Earth/Nature speaks to a "lonely dreamer" who has turned away, reminding them that nature\'s beauty - the mountain breezes and wild landscape - can still enchant, soothe and welcome them home.',
      context: 'Emily Brontë (author of *Wuthering Heights*) loved the Yorkshire moors around Haworth. Romantic belief in nature as a spiritual home.',
      form: '- Regular quatrains with alternating rhyme - a gentle, persuasive voice.\n- Nature speaks directly (personification as speaker); questions invite the dreamer back.',
      language: '- "**Shall earth no more inspire thee, / Thou lonely dreamer now?**" - rhetorical question.\n- Nature\'s "**mountain breezes**" that "enchant and soothe" - healing.\n- Archaic "thee/thou" - intimacy and tenderness.',
      themes: ['nature as healing', 'loneliness', 'belonging', 'imagination'],
      compare: [['Lines Written in Early Spring', 'Nature as spiritual connection.'], ['With Birds You\'re Never Lonely', 'Nature and loneliness.'], ['Homing', 'Belonging and home.']],
      quotes: [q('Shall earth no more inspire thee, thou lonely dreamer now?', 'Opening rhetorical question - nature calls the isolated dreamer back.', { who: 'Shall Earth no more inspire thee', themes: ['nature', 'loneliness'] })] }, C),
    poem({ id: 'wl-drawingroom', title: 'In a London Drawingroom', poet: 'George Eliot', date: '1865',
      about: 'From a London window the speaker sees a grey, smoky, monotonous city of identical buildings and hurried people. The place feels like a prison that drains life, colour and beauty from those who live there.',
      context: '"George Eliot" was Mary Ann Evans, who wrote under a male name. Victorian London was polluted by coal smoke and rapid industrial growth.',
      form: '- A single block of **blank verse** - unbroken, monotonous like the city it describes.\n- Observational, almost scientific tone.',
      language: '- "**The sky is cloudy, yellowed by the smoke**" - pollution blots out nature.\n- Imagery of sameness and greyness; people hurry without looking up.\n- Imprisonment imagery - the city confines its inhabitants.',
      themes: ['place shaping lives', 'urban life', 'monotony', 'loss of beauty'],
      compare: [['Lines Written in Early Spring', 'Natural place vs oppressive city.'], ['A Portable Paradise', 'How places affect people - paradise carried within.'], ['Homing', 'Places and identity.']],
      quotes: [q('The sky is cloudy, yellowed by the smoke', 'Pollution colours the whole sky - the city\'s influence is inescapable.', { who: 'In a London Drawingroom', themes: ['place'] })],
      past: [{ year: 'Jun 2025', focus: 'Compare how poets present **the ways places affect people\'s lives**' }] }, C),
    poem({ id: 'wl-train', title: 'On an Afternoon Train from Purley to Victoria, 1955', poet: 'James Berry', date: 'published 1985', copyrightNote: true,
      about: 'A Caribbean man, newly arrived in 1950s Britain, is questioned by a white woman on a train about where he comes from. The encounter reveals curiosity, misunderstanding and assumptions about identity and belonging.',
      context: 'James Berry came to Britain from **Jamaica** in 1948 (Windrush era). Many migrants met ignorance and prejudice.',
      form: 'Conversational, narrative free verse built around a dialogue.',
      language: 'Contrast between the woman\'s assumptions and the speaker\'s calm, thoughtful responses; gentle irony.',
      themes: ['identity', 'migration', 'belonging', 'prejudice'],
      compare: [['A Portable Paradise', 'Migration and holding on to identity.'], ['Name Journeys', 'Identity questioned by others.'], ['Thirteen', 'Being judged by others.']],
      quotes: [] }, C),
    poem({ id: 'wl-names', title: 'Name Journeys', poet: 'Raman Mundair', date: 'contemporary', copyrightNote: true,
      about: 'Explores how names - and the identity they carry - change, travel and are reshaped across places, cultures and generations.',
      context: 'Mundair was born in India, grew up in Manchester and lives in Shetland - experience of multiple places and identities.',
      form: 'Free verse; movement through places mirrors the journey of the name.',
      language: 'Imagery of journeys and places; the name as a marker of heritage.',
      themes: ['identity', 'names and heritage', 'migration', 'belonging'],
      compare: [['Homing', 'Identity, voice and heritage.'], ['On an Afternoon Train...', 'Identity questioned in a new country.'], ['pot', 'Heritage and identity.']],
      quotes: [] }, C),
    poem({ id: 'wl-pot', title: 'pot', poet: 'Shamshad Khan', date: 'contemporary', copyrightNote: true,
      about: 'Uses the image of a pot to explore heritage, identity and cultural belonging.',
      context: 'Khan is a Manchester-based British Asian poet.',
      form: 'Free verse; the lower-case title is a deliberate stylistic choice.',
      language: 'The pot as an extended metaphor - an object that holds history and identity.',
      themes: ['identity', 'heritage', 'culture', 'belonging'],
      compare: [['The Jewellery Maker', 'Objects and craft carrying heritage.'], ['Name Journeys', 'Heritage and identity.'], ['Like an Heiress', 'Inheritance.']],
      quotes: [] }, C),
    poem({ id: 'wl-wider', title: 'A Wider View', poet: 'Seni Seneviratne', date: 'contemporary', copyrightNote: true,
      about: 'Reflects on perspective, place and belonging - seeing one\'s life and identity within a wider landscape or history.',
      context: 'Seneviratne is a Leeds-based poet of English and Sri Lankan heritage.',
      form: 'Free verse.',
      language: 'Imagery of looking and landscape; shifting perspective.',
      themes: ['place', 'identity', 'perspective', 'belonging'],
      compare: [['In a London Drawingroom', 'Ways of seeing a place.'], ['A Portable Paradise', 'Belonging across places.'], ['Lines Written in Early Spring', 'Landscape and reflection.']],
      quotes: [] }, C),
    poem({ id: 'wl-homing', title: 'Homing', poet: 'Liz Berry', date: '2014', copyrightNote: true,
      about: 'The speaker reflects on her mother losing her Black Country accent to fit in, and wishes to give it back to her - a celebration of dialect, roots and home.',
      context: 'Liz Berry writes about the **Black Country** (West Midlands) and its dialect; regional accents were often stigmatised.',
      form: 'Free verse addressed to the mother; dialect words are celebrated.',
      language: 'Homing pigeon imagery - returning to roots; dialect as a treasure.',
      themes: ['identity and voice', 'home and belonging', 'parent and child', 'class'],
      compare: [['Name Journeys', 'Identity carried in names/voice.'], ['Like an Heiress', 'Inheritance from family and place.'], ['Shall Earth no more inspire thee', 'Belonging and home.']],
      quotes: [] }, C),
    poem({ id: 'wl-century', title: 'A Century Later', poet: 'Imtiaz Dharker', date: '2014', copyrightNote: true,
      about: 'Inspired by **Malala Yousafzai**, shot by the Taliban in 2012 for going to school; the poem links her to the young soldiers of WW1 a century earlier and presents education as a brave battle.',
      context: 'Written for the WW1 centenary; Malala became an international campaigner for girls\' education and won the Nobel Peace Prize (2014).',
      form: 'Free verse; contrasts past and present wars.',
      language: 'Military imagery for school and learning; the schoolgirl as a soldier for education.',
      themes: ['education', 'courage', 'injustice', 'youth'],
      compare: [['Thirteen', 'Young people facing threat and injustice.'], ['England in 1819', 'Protest and hope against oppression.'], ['A Portable Paradise', 'Resilience.']],
      quotes: [] }, C),
    poem({ id: 'wl-jewellery', title: 'The Jewellery Maker', poet: 'Louisa Adjoa Parker', date: 'contemporary', copyrightNote: true,
      about: 'Explores a jewellery maker\'s craft - skill, labour and the value of what people make - linked to heritage and history.',
      context: 'Parker is a Dorset-based writer of English and Ghanaian heritage who writes about rural Black history.',
      form: 'Free verse.',
      language: 'Imagery of craft, precious materials and hands at work.',
      themes: ['identity', 'heritage', 'work and craft', 'value'],
      compare: [['pot', 'Objects that carry history.'], ['Like an Heiress', 'Inheritance and value.'], ['Homing', 'Heritage.']],
      quotes: [] }, C),
    poem({ id: 'wl-birds', title: 'With Birds You\'re Never Lonely', poet: 'Raymond Antrobus', date: 'contemporary', copyrightNote: true,
      about: 'Explores sound, birdsong and the natural world through the perspective of a deaf poet - connection and companionship found in nature.',
      context: 'Antrobus is a British-Jamaican poet who is deaf; his work explores deafness, hearing and identity.',
      form: 'Free verse.',
      language: 'Imagery of birds and sound; sensory perception.',
      themes: ['nature', 'loneliness and connection', 'identity', 'perception'],
      compare: [['Shall Earth no more inspire thee', 'Nature as companion for the lonely.'], ['Lines Written in Early Spring', 'Birds and joy in nature.'], ['A Portable Paradise', 'Sources of comfort.']],
      quotes: [] }, C),
    poem({ id: 'wl-paradise', title: 'A Portable Paradise', poet: 'Roger Robinson', date: '2019', copyrightNote: true,
      about: 'The speaker recalls his grandmother\'s advice to carry his own paradise with him - a source of comfort and resilience to hold on to in hard places.',
      context: 'Robinson (Trinidadian-British) won the T.S. Eliot Prize (2019) for the collection *A Portable Paradise*, which includes poems about the Grenfell Tower fire.',
      form: 'A short, free-verse poem built like advice passed down.',
      language: 'Paradise as something private and portable; instructions that become a philosophy.',
      themes: ['resilience', 'place and belonging', 'family wisdom', 'migration'],
      compare: [['In a London Drawingroom', 'How places affect people - resisting a harsh place.'], ['On an Afternoon Train...', 'Migrant experience.'], ['Homing', 'Family and home.']],
      quotes: [] }, C),
    poem({ id: 'wl-heiress', title: 'Like an Heiress', poet: 'Grace Nichols', date: 'contemporary', copyrightNote: true,
      about: 'Explores what we inherit - from family, culture and place - and the sense of richness or belonging it can bring.',
      context: 'Nichols was born in **Guyana** and moved to the UK in 1977; her poetry celebrates Caribbean culture and identity.',
      form: 'Free verse.',
      language: 'The simile of the "heiress" - inheritance and value.',
      themes: ['inheritance', 'identity', 'belonging', 'place'],
      compare: [['Homing', 'Inheritance from family and place.'], ['pot', 'Heritage and identity.'], ['The Jewellery Maker', 'Value and heritage.']],
      quotes: [] }, C),
    poem({ id: 'wl-thirteen', title: 'Thirteen', poet: 'Caleb Femi', date: 'contemporary', copyrightNote: true,
      about: 'Reflects on a Black boy\'s experience of being stopped by the police at the age of thirteen - a loss of innocence and an encounter with racial profiling.',
      context: 'Femi, from Peckham, was the first Young People\'s Laureate for London; his work explores growing up on estates and the treatment of young Black men.',
      form: 'Free verse.',
      language: 'Contrast between childhood and the adult authority that treats the boy as a threat.',
      themes: ['injustice', 'youth and innocence', 'identity', 'power'],
      compare: [['England in 1819', 'Abuse of power and injustice.'], ['A Century Later', 'Young people under threat.'], ['On an Afternoon Train...', 'Being judged by others.']],
      quotes: [] }, C),
  ],
};
