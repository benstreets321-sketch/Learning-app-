import type { PastQuestion, Question, Quote, Unit } from '../../types';
import { cards, mc, tf, topic, quote, examQ } from '../../dsl';

function overview(o: {
  id: string; title: string; group: string; value: string; desc: string; notes: string; keyPoints: string[];
  past: PastQuestion[]; questions: Question[]; quotes?: Quote[]; flash: [string, string][]; essay: string;
}): Unit {
  return {
    id: o.id, title: o.title, option: { group: o.group, value: o.value }, description: o.desc,
    topics: [topic({
      id: `${o.id}-overview`, title: `${o.title}: overview`, summary: o.desc, notes: o.notes, keyPoints: o.keyPoints,
      pastQuestions: o.past, questions: o.questions, quotes: o.quotes, flashcards: cards(o.flash),
      examQuestions: [examQ(o.essay, o.group === 'lit-novel' ? 30 : 34, [
        'Level 6: convincing, critical argument with judicious references', 'Analysis of the writer\'s methods (language, form, structure)',
        'Covers the whole text and shows development', 'Context linked to the writer\'s purpose', 'Alternative interpretations considered',
      ], { meta: 'Practice question', time: 45 })],
      tags: ['Overview'],
    })],
  };
}

export const otherTextUnits: Unit[] = [
  overview({
    id: 'tempest', title: 'The Tempest', group: 'lit-shakespeare', value: 'tempest', desc: 'Shakespeare\'s late play (c.1611): power, colonialism, forgiveness.',
    notes: `
**Plot**: **Prospero**, the rightful Duke of Milan, was overthrown by his brother **Antonio** (helped by **Alonso**, King of Naples) and cast adrift with his daughter **Miranda**. On an island he uses magic to control the spirit **Ariel** and the "monster" **Caliban** (whose mother Sycorax ruled the island). He raises a **storm** to shipwreck his enemies. Miranda falls in love with Alonso's son **Ferdinand**. Caliban plots with the drunken **Stephano and Trinculo**. Antonio and **Sebastian** plot to kill Alonso. Prospero finally **forgives** his enemies, frees Ariel, renounces his magic ("**I'll drown my book**") and asks the audience to set him free.

**Themes**: power and control; colonialism (Caliban: "**This island's mine, by Sycorax my mother, / Which thou tak'st from me**"); freedom and servitude; forgiveness ("The rarer action is / In virtue than in vengeance"); magic and illusion; parents and children.

**Context**: c.1611; voyages of discovery and early colonisation (the 1609 *Sea Venture* shipwreck in Bermuda); Jacobean attitudes to magic; possibly Shakespeare's farewell to the stage.`,
    keyPoints: ['Prospero: usurped duke turned controlling magician', 'Ariel: spirit longing for freedom', 'Caliban: "This island\'s mine" - colonial victim or monster?', 'Forgiveness over vengeance', '"I\'ll drown my book" - renouncing power'],
    quotes: [
      quote('This island\'s mine, by Sycorax my mother, which thou tak\'st from me', 'Caliban\'s claim exposes Prospero as a coloniser - inviting sympathy.', { who: 'Caliban', where: '1.2', themes: ['power', 'colonialism'] }),
      quote('The rarer action is in virtue than in vengeance', 'Prospero chooses forgiveness - the play\'s moral turning point.', { who: 'Prospero', where: '5.1', themes: ['forgiveness'] }),
      quote('O brave new world, that has such people in\'t!', 'Miranda\'s wonder at humans - ironic, as the people include traitors.', { who: 'Miranda', where: '5.1', themes: ['innocence'] }),
    ],
    past: [{ year: 'Jun 2024', focus: 'The relationship between **Prospero and Ariel**', extract: 'Act 4 Scene 1' }, { year: 'Jun 2025', focus: 'How far **Caliban** is presented as a **victim**', extract: 'Act 2 Scene 2' }],
    questions: [
      mc('Who overthrew Prospero as Duke of Milan?', ['His brother Antonio, helped by Alonso', 'Caliban, helped by Stephano and Trinculo', 'Ariel, helped by the witch Sycorax', 'Sebastian, helped by Ferdinand'], 'Antonio\'s betrayal sets up the revenge-and-forgiveness plot.', { d: 1 }),
      mc('What does Ariel want throughout the play?', ['Freedom', 'To marry Miranda', 'To rule Naples', 'To kill Caliban'], 'Prospero promises freedom and grants it at the end.', { d: 1 }),
      tf('Prospero takes revenge by killing his enemies.', false, 'He forgives them: "The rarer action is in virtue than in vengeance."'),
    ],
    flash: [['Who is Sycorax?', 'Caliban\'s mother, a witch who ruled the island before Prospero.'], ['What does Prospero do at the end?', 'Forgives his enemies, frees Ariel and gives up his magic.']],
    essay: 'How does Shakespeare present ideas about power and control in *The Tempest*?',
  }),
  overview({
    id: 'merchant', title: 'The Merchant of Venice', group: 'lit-shakespeare', value: 'merchant', desc: 'Shakespeare\'s problem comedy (c.1596): money, prejudice, mercy.',
    notes: `
**Plot**: **Bassanio** needs money to woo the rich heiress **Portia**. His friend **Antonio**, a merchant, borrows 3,000 ducats from the Jewish moneylender **Shylock**, who has suffered Antonio's anti-Semitic abuse; the bond's penalty is **a pound of Antonio's flesh**. Bassanio wins Portia by choosing the **lead casket**. Shylock's daughter **Jessica** elopes with Lorenzo, taking his money. Antonio's ships are lost; Shylock demands his bond. Portia, disguised as a lawyer, argues "**The quality of mercy is not strained**", then finds a loophole: flesh but **no blood**. Shylock loses his wealth and is **forced to convert** to Christianity. Comic ending with the **ring plot**.

**Themes**: prejudice and anti-Semitism ("**Hath not a Jew eyes?**"); mercy vs justice; money and love; friendship and loyalty; appearance vs reality (caskets: "All that glisters is not gold"); outsiders.

**Context**: Jews were expelled from England in 1290; Elizabethan stereotypes of Jewish moneylenders (usury was seen as sinful by Christians); the Lopez trial (1594). Modern audiences often see Shylock as a victim.`,
    keyPoints: ['Pound of flesh bond', 'Shylock: victim of prejudice and vengeful', '"Hath not a Jew eyes?"', 'Portia: "The quality of mercy is not strained"', 'Caskets: appearance vs reality', 'Forced conversion - troubling "comedy"'],
    quotes: [
      quote('Hath not a Jew eyes?', 'Rhetorical questions assert shared humanity - and justify revenge as learned from Christians.', { who: 'Shylock', where: '3.1', themes: ['prejudice'] }),
      quote('The quality of mercy is not strained', 'Portia praises mercy as divine - yet the Christians show Shylock little mercy.', { who: 'Portia', where: '4.1', themes: ['mercy', 'justice'] }),
      quote('All that glisters is not gold', 'The golden casket\'s scroll - appearances deceive.', { who: 'Morocco (reading the scroll)', where: '2.7', themes: ['appearance vs reality'] }),
    ],
    past: [
      { year: 'Jun 2017', focus: 'How far **Portia** is a strong female character' }, { year: 'Jun 2018', focus: 'Ideas about **justice**' },
      { year: 'Jun 2019', focus: 'Ideas about **romantic love**' }, { year: 'Nov 2020', focus: 'Attitudes to **mercy**' },
      { year: 'Nov 2021', focus: 'The relationship between **Portia and Bassanio**' }, { year: 'Jun 2022', focus: 'The relationship between **Shylock and Antonio**' },
      { year: 'Jun 2023', focus: 'Ideas about **loyalty**' }, { year: 'Jun 2024', focus: 'How far **Shylock** is an **isolated** character', extract: '1.3' },
      { year: 'Jun 2025', focus: 'Attitudes to **wealth**', extract: '3.1' },
    ],
    questions: [
      mc('What is the penalty in Shylock\'s bond?', ['A pound of Antonio\'s flesh', '3,000 ducats', 'Antonio\'s ships', 'Portia\'s hand in marriage'], 'The gruesome bond drives the trial scene.', { d: 1 }),
      mc('How does Portia defeat the bond?', ['The bond allows flesh but no blood', 'She pays it off', 'She proves Shylock is lying', 'Antonio\'s ships return first'], 'A legal technicality turns the law against Shylock.', { d: 2 }),
    ],
    flash: [['Which casket wins Portia?', 'The lead casket.'], ['What happens to Shylock at the end?', 'He loses half his wealth to Antonio, half to the state (later lessened), and is forced to become a Christian.']],
    essay: 'How does Shakespeare present Shylock as an outsider in *The Merchant of Venice*?',
  }),
  overview({
    id: 'muchado', title: 'Much Ado About Nothing', group: 'lit-shakespeare', value: 'muchado', desc: 'Shakespeare\'s comedy (c.1598): love, deception and honour.',
    notes: `
**Plot**: Soldiers return to Messina. **Claudio** falls for **Hero**; **Benedick** and **Beatrice** wage a "merry war" of wit. **Don Pedro** woos Hero for Claudio. Friends **trick** Benedick and Beatrice into love by staging overheard conversations (the "gulling" scenes, 2.3 and 3.1). Villain **Don John** tricks Claudio into believing Hero is unfaithful; Claudio **shames Hero at the altar** (4.1). The Friar has Hero pretend to be dead. Beatrice demands Benedick "**Kill Claudio**". The bumbling watchman **Dogberry** uncovers the plot. Claudio marries "Hero's cousin" - who is Hero. Benedick and Beatrice marry.

**Themes**: deception (good and bad); honour and reputation, especially women's chastity; gender roles (Beatrice: "**O God, that I were a man!**"); love and marriage; appearance vs reality; noting/nothing (pun).

**Context**: Elizabethan patriarchy; a woman's honour depended on chastity; male friendship and military honour.`,
    keyPoints: ['Two couples: Claudio/Hero and Benedick/Beatrice', 'Deception: gulling scenes vs Don John\'s plot', 'Hero shamed at the altar (4.1)', 'Beatrice: "O God, that I were a man!"', 'Women\'s honour = chastity', 'Dogberry uncovers the truth'],
    quotes: [
      quote('O God, that I were a man! I would eat his heart in the market-place', 'Beatrice\'s rage at Claudio exposes women\'s powerlessness to act.', { who: 'Beatrice', where: '4.1', themes: ['gender', 'honour'] }),
      quote('Kill Claudio', 'Blunt imperative tests Benedick\'s love against male loyalty.', { who: 'Beatrice', where: '4.1', themes: ['love', 'honour'] }),
    ],
    past: [{ year: 'Jun 2024', focus: 'Characters **tricking and deceiving** each other', extract: '2.3' }, { year: 'Jun 2025', focus: 'How far **women** are presented as **powerless**', extract: '4.1' }],
    questions: [
      mc('Who tricks Claudio into believing Hero is unfaithful?', ['Don John', 'Benedick', 'Dogberry', 'Beatrice'], 'Don John is the malicious deceiver.', { d: 1 }),
      tf('All the deceptions in the play are malicious.', false, 'The gulling of Benedick and Beatrice is kindly deception that leads to love.'),
    ],
    flash: [['What is the "merry war"?', 'The witty verbal battles between Benedick and Beatrice.'], ['Who uncovers Don John\'s plot?', 'Dogberry and the Watch.']],
    essay: 'How does Shakespeare present ideas about honour in *Much Ado About Nothing*?',
  }),
  overview({
    id: 'caesar', title: 'Julius Caesar', group: 'lit-shakespeare', value: 'caesar', desc: 'Shakespeare\'s political tragedy (1599): power, loyalty, persuasion.',
    notes: `
**Plot**: Rome fears **Caesar** will become king. **Cassius** manipulates the honourable **Brutus** into joining a conspiracy. Despite warnings ("**Beware the Ides of March**") and his wife **Calpurnia**'s dream, Caesar goes to the Senate and is **assassinated** ("**Et tu, Brute?**"). At the funeral Brutus justifies the murder; **Mark Antony**'s brilliant speech ("**Friends, Romans, countrymen**") turns the crowd against the conspirators. Civil war follows; Caesar's ghost visits Brutus; Cassius and Brutus die by suicide at Philippi. Antony calls Brutus "**the noblest Roman of them all**".

**Themes**: power and ambition; loyalty and betrayal; persuasion and rhetoric; fate vs free will; honour; public vs private self.

**Context**: 1599 - an ageing Elizabeth I with no heir; fears of civil war and debates about whether killing a tyrant could be justified.`,
    keyPoints: ['Cassius manipulates Brutus', 'Brutus: honourable but naive', '"Et tu, Brute?" - betrayal', 'Antony\'s funeral speech - rhetoric', 'Civil war and suicides', 'Context: Elizabeth I\'s succession fears'],
    quotes: [
      quote('The fault, dear Brutus, is not in our stars, but in ourselves', 'Cassius argues for free will to persuade Brutus to act.', { who: 'Cassius', where: '1.2', themes: ['fate', 'manipulation'] }),
      quote('Friends, Romans, countrymen, lend me your ears', 'Antony\'s tricolon opens a masterclass in rhetoric that turns the crowd.', { who: 'Mark Antony', where: '3.2', themes: ['persuasion'] }),
      quote('This was the noblest Roman of them all', 'Antony\'s tribute to Brutus - he acted for Rome, not envy.', { who: 'Mark Antony', where: '5.5', themes: ['honour'] }),
    ],
    past: [{ year: 'Jun 2024', focus: 'How Shakespeare presents **Cassius** as a **manipulative** character', extract: '1.2' }, { year: 'Jun 2025', focus: 'Ideas about **loyalty**', extract: '3.1' }],
    questions: [
      mc('Who persuades Brutus to join the conspiracy?', ['Cassius', 'Mark Antony', 'Calpurnia', 'Octavius'], 'Cassius flatters and plants forged letters.', { d: 1 }),
      mc('How does Antony turn the crowd?', ['Repeating "Brutus is an honourable man" ironically, showing Caesar\'s will and body', 'By threatening to punish anyone in the crowd who still supports Brutus', 'By promising to make every citizen who joins him a senator of Rome', 'By praising Cassius as the true hero who saved Rome from Caesar'], 'Irony, emotion and evidence - powerful rhetoric.', { d: 2 }),
    ],
    flash: [['What date was Caesar warned about?', 'The Ides of March (15 March).'], ['What are Caesar\'s dying words?', '"Et tu, Brute? Then fall, Caesar!"']],
    essay: 'How does Shakespeare present Brutus as a tragic hero in *Julius Caesar*?',
  }),
  overview({
    id: 'great-exp', title: 'Great Expectations', group: 'lit-novel', value: 'great-exp', desc: 'Dickens (1861): Pip\'s journey from blacksmith\'s boy to gentleman.',
    notes: `
**Plot**: Orphan **Pip** lives with his harsh sister and kind blacksmith **Joe Gargery** on the Kent marshes. He helps an escaped convict, **Magwitch**. At **Satis House** he meets the jilted **Miss Havisham** (still in her wedding dress, clocks stopped) and cold, beautiful **Estella**, who makes him ashamed of being "common". An anonymous benefactor gives him "**great expectations**"; in London he becomes snobbish and ashamed of Joe. The benefactor is **Magwitch**, not Miss Havisham. Pip learns humility, tries to save Magwitch, falls ill and is nursed by Joe. Miss Havisham repents ("**What have I done!**") and is fatally burned.

**Themes**: social class and ambition; what makes a "gentleman"; guilt and redemption; love and rejection; crime and justice.

**Context**: Victorian class mobility; the gentleman ideal; transportation of convicts to Australia; Dickens's own social rise.`,
    keyPoints: ['Pip, Joe, Magwitch, Miss Havisham, Estella', 'Benefactor revealed as Magwitch', 'Pip becomes a snob, then learns humility', 'Real gentility = kindness (Joe)', 'Miss Havisham repents'],
    quotes: [quote('What have I done! What have I done!', 'Miss Havisham\'s repetition shows remorse for raising Estella to break hearts.', { who: 'Miss Havisham', where: 'Ch 49', themes: ['guilt', 'redemption'] })],
    past: [{ year: 'Jun 2024', focus: '"Pip learns to **value people more than social class**" - how far?', extract: 'Ch 17' }, { year: 'Jun 2025', focus: 'How far **Miss Havisham** is presented as a **victim**', extract: 'Ch 49' }],
    questions: [mc('Who is Pip\'s secret benefactor?', ['Magwitch', 'Miss Havisham', 'Joe', 'Jaggers'], 'Pip had assumed it was Miss Havisham - a shock that humbles him.', { d: 1 })],
    flash: [['What is Satis House like?', 'Decaying, with stopped clocks and Miss Havisham still in her wedding dress - frozen at the moment she was jilted.']],
    essay: 'How does Dickens present ideas about guilt in *Great Expectations*?',
  }),
  overview({
    id: 'jane-eyre', title: 'Jane Eyre', group: 'lit-novel', value: 'jane-eyre', desc: 'Charlotte Brontë (1847): an orphan\'s fight for independence and love.',
    notes: `
**Plot**: Orphan **Jane** is abused by her aunt **Mrs Reed** and locked in the **red room**. At harsh **Lowood School** her friend **Helen Burns** dies. She becomes governess at **Thornfield** for **Mr Rochester**; they fall in love. At the wedding it is revealed Rochester is married to **Bertha Mason**, kept locked in the attic. Jane leaves, nearly starves, is taken in by the **Rivers** family (St John proposes a loveless marriage), inherits money, then returns to find Thornfield burned, Bertha dead and Rochester blinded. "**Reader, I married him.**"

**Themes**: independence and equality ("**I am no bird; and no net ensnares me**"); gender and class; love vs duty; religion; belonging and home.

**Context**: Victorian governesses' low status; limited options for women; first published under the pseudonym "Currer Bell".`,
    keyPoints: ['Red room; Lowood; Thornfield', 'Rochester and the secret of Bertha', 'Jane leaves rather than compromise', 'Independence and equality', '"Reader, I married him."'],
    quotes: [quote('I am no bird; and no net ensnares me', 'Bird imagery: Jane asserts her freedom and independent will.', { who: 'Jane', where: 'Ch 23', themes: ['independence', 'gender'] })],
    past: [{ year: 'Jun 2024', focus: 'How far Jane is a young woman **searching for somewhere to belong**', extract: 'Ch 33' }, { year: 'Jun 2025', focus: 'How far Jane is presented as a **vulnerable** character', extract: 'Ch 2' }],
    questions: [mc('Who is kept in the attic at Thornfield?', ['Bertha Mason, Rochester\'s wife', 'Blanche Ingram, his fiancée', 'Grace Poole, a servant', 'Adèle Varens, his ward'], 'The revelation stops the wedding.', { d: 1 })],
    flash: [['What pseudonym did Charlotte Brontë use?', 'Currer Bell.']],
    essay: 'How does Brontë present Jane\'s search for independence in *Jane Eyre*?',
  }),
  overview({
    id: 'frankenstein', title: 'Frankenstein', group: 'lit-novel', value: 'frankenstein', desc: 'Mary Shelley (1818/1831): science, ambition and responsibility.',
    notes: `
**Structure**: a **frame narrative** - Captain **Walton**'s letters frame **Victor Frankenstein**'s story, which frames the **Creature**'s story.

**Plot**: Victor, obsessed with discovering "the principle of life", builds and animates a creature, then **abandons it in horror** ("**breathless horror and disgust filled my heart**"). Rejected by everyone, the Creature educates itself by watching the De Lacey family, but is driven away. It kills Victor's brother **William**; the servant **Justine** is executed. The Creature asks for a female companion; Victor destroys her. The Creature kills **Clerval** and, on the wedding night, **Elizabeth**. Victor pursues it to the Arctic and dies on Walton's ship; the Creature mourns him.

**Themes**: dangerous ambition and knowledge ("playing God"); responsibility and parenthood; isolation and rejection; nature vs nurture ("**I was benevolent and good; misery made me a fiend**"); family.

**Context**: Romantic era; galvanism experiments; the Enlightenment; Shelley wrote it aged 18 during the 1816 ghost-story contest with Byron.`,
    keyPoints: ['Frame narrative: Walton → Victor → Creature', 'Victor abandons his creation', 'Creature turns violent after rejection', '"misery made me a fiend" - nurture', 'Dangerous ambition / playing God', 'Galvanism, Romanticism'],
    quotes: [quote('I was benevolent and good; misery made me a fiend', 'The Creature argues that rejection, not nature, made him evil.', { who: 'The Creature', where: 'Vol 2', themes: ['nature vs nurture'] })],
    past: [{ year: 'Jun 2024', focus: 'Effects of Frankenstein\'s **scientific ambitions** on himself and others', extract: 'Ch 4' }, { year: 'Jun 2025', focus: 'The importance of **family**', extract: 'Ch 1' }],
    questions: [mc('Why does the Creature become violent?', ['Rejection and isolation by his creator and society', 'He is born evil and cruel by nature', 'Walton orders him to take revenge', 'He is driven mad by hunger and cold'], 'Shelley emphasises nurture and responsibility.', { d: 2 })],
    flash: [['What is galvanism?', 'Using electricity to stimulate muscles - experiments that inspired the idea of reanimation.']],
    essay: 'How does Shelley present ideas about responsibility in *Frankenstein*?',
  }),
  overview({
    id: 'pride', title: 'Pride and Prejudice', group: 'lit-novel', value: 'pride', desc: 'Jane Austen (1813): marriage, class and first impressions.',
    notes: `
"**It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.**" (ironic opening)

**Plot**: The Bennets have five daughters and no son (the estate is **entailed** to Mr Collins). **Elizabeth** meets proud **Mr Darcy**, who insults her; she believes **Wickham**'s lies about him. **Jane** and **Bingley** fall in love but are separated. Elizabeth rejects **Collins** (Charlotte Lucas marries him for security) and then **Darcy's** arrogant first proposal. Darcy's letter reveals Wickham's true character. After **Lydia** elopes with Wickham, Darcy secretly arranges their marriage, saving the family's reputation. Elizabeth's prejudice and Darcy's pride are overcome; they marry, as do Jane and Bingley.

**Themes**: marriage (for love, money, security); pride and prejudice; class; reputation; women's limited options; first impressions.

**Context**: Regency England; women couldn't inherit (entail); marriage was economic necessity; Austen's irony and free indirect discourse.`,
    keyPoints: ['Ironic opening sentence', 'Elizabeth\'s prejudice vs Darcy\'s pride', 'Different marriages: Charlotte/Collins, Lydia/Wickham, Jane/Bingley', 'Entail - women can\'t inherit', 'Darcy\'s letter changes Elizabeth\'s view'],
    quotes: [quote('It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife', 'Irony: it is really poor women who need rich husbands.', { who: 'Narrator', where: 'Ch 1', themes: ['marriage', 'money'] })],
    past: [{ year: 'Jun 2024', focus: 'Ideas about **marriage**', extract: 'Ch 1' }, { year: 'Jun 2025', focus: 'How far **Elizabeth** changes her views of others', extract: 'Ch 58' }],
    questions: [mc('Why does Charlotte Lucas marry Mr Collins?', ['For financial security', 'Passionate love', 'Her father forces her', 'To spite Elizabeth'], '"I am not romantic... I ask only a comfortable home."', { d: 2 })],
    flash: [['What is an entail?', 'A legal arrangement passing the estate to the nearest male heir - the Bennet daughters can\'t inherit.']],
    essay: 'How does Austen present the importance of reputation in *Pride and Prejudice*?',
  }),
  overview({
    id: 'sign-four', title: 'The Sign of Four', group: 'lit-novel', value: 'sign-four', desc: 'Arthur Conan Doyle (1890): Holmes, treasure and Empire.',
    notes: `
**Plot**: **Mary Morstan** asks **Sherlock Holmes** and **Dr Watson** for help: her father vanished and she receives a pearl each year. They meet **Thaddeus Sholto**; his brother **Bartholomew** is found murdered by a poisoned dart and the **Agra treasure** is gone. Holmes tracks the killer with the dog **Toby** and a river chase on the Thames. The culprit is **Jonathan Small**, a one-legged ex-soldier, helped by **Tonga**. Small explains the treasure was taken during the **Indian Rebellion of 1857** and he was betrayed by Major Sholto. He throws the treasure into the Thames. Watson marries Mary; Holmes returns to **cocaine**.

**Themes**: deduction and reason; Empire and colonialism (Victorian racism in the portrayal of Tonga); greed and treasure; friendship; London as dangerous; justice.

**Context**: Victorian London; British Empire and the 1857 Rebellion; the detective genre; Holmes's drug use.`,
    keyPoints: ['Holmes = reason and deduction; Watson = narrator and heart', 'Agra treasure from the 1857 Rebellion', 'Jonathan Small: betrayed, seeks revenge', 'Empire and racism', 'Holmes\'s cocaine use'],
    past: [{ year: 'Jun 2024', focus: '**Holmes and Watson** as characters with **different strengths and qualities**', extract: 'Ch 2' }, { year: 'Jun 2025', focus: 'An **atmosphere of mystery and suspense**', extract: 'Ch 4' }],
    questions: [mc('Who narrates The Sign of Four?', ['Dr Watson', 'Sherlock Holmes', 'Mary Morstan', 'Jonathan Small'], 'Watson\'s narration keeps Holmes\'s reasoning mysterious.', { d: 1 })],
    flash: [['What happens to the Agra treasure?', 'Jonathan Small throws it into the Thames.']],
    essay: 'How does Conan Doyle present Holmes as an unusual hero in *The Sign of Four*?',
  }),
  overview({
    id: 'dna', title: 'DNA', group: 'lit-modern', value: 'dna', desc: 'Dennis Kelly\'s play (2008): a teenage group\'s cover-up.',
    notes: `
**Plot**: A group of teenagers believe they have killed **Adam** during bullying (he fell into a shaft/grille). **Phil**, quiet and calculating, devises a cover-up - inventing a suspect and planting DNA evidence - which accidentally frames a real postman. **Leah** talks constantly to Phil, questioning morality and human nature. **Cathy** enjoys the power and danger. **Brian** breaks down and is medicated. Adam turns up alive, traumatised, living in a hedge. Phil decides he must be silenced; Cathy and Richard take Adam away and he is (implied) killed. Leah leaves; Phil withdraws into silence.

**Characters**: Phil (leader, silence = power), Leah (conscience, monologues), Cathy (ruthless, ambitious), John Tate (former leader who loses control), Brian (guilt and breakdown), Richard (wants Phil's approval), Mark and Jan (narrate events in duologues), Danny (worried about his future career), Lou.

**Themes**: group/peer pressure; power and leadership; responsibility and guilt; morality and human nature; bullying; identity (DNA = what we're made of).

**Context**: written for National Theatre Connections (youth theatre); concerns about youth violence and gangs.`,
    keyPoints: ['Group cover-up after Adam\'s "death"', 'Phil: silent, calculating leader', 'Leah: talkative conscience', 'Cathy: thrives on power', 'Adam returns alive - and is silenced', 'Themes: peer pressure, power, responsibility'],
    past: [{ year: 'Jun 2024', focus: 'The dangers of **peer pressure** / Ideas about **power and control**' }, { year: 'Jun 2025', focus: '**Leah** and human nature / **Adam** and bullying' }],
    questions: [mc('What does Phil do to cover up Adam\'s disappearance?', ['Plans to plant false DNA evidence', 'Calls the police', 'Confesses to teachers', 'Runs away'], 'The plan backfires by framing a real man.', { d: 1 }), tf('Adam is found dead at the end of Act 1.', false, 'Adam turns up alive later, traumatised.')],
    flash: [['Who is the group\'s silent leader?', 'Phil.']],
    essay: 'How does Kelly present ideas about responsibility in *DNA*?',
  }),
  overview({
    id: 'honey', title: 'A Taste of Honey', group: 'lit-modern', value: 'honey', desc: 'Shelagh Delaney\'s play (1958): a working-class daughter and mother in Salford.',
    notes: `
**Plot**: Teenage **Jo** and her mother **Helen** move into a run-down flat in Salford. Helen marries **Peter**, a younger, wealthier, drunken man, and leaves Jo. Jo has a relationship with **Jimmie**, a Black sailor, who leaves; she is pregnant. **Geoffrey (Geof)**, a gay art student, moves in and cares for her. Helen returns after Peter throws her out, and drives Geof away. Jo is left awaiting the birth.

**Themes**: mother-daughter relationships; gender and sexuality; race; class and poverty; independence; relationships between men and women.

**Context**: 1950s "**kitchen sink**" drama; Delaney wrote it aged 19; homosexuality was illegal (until 1967) and mixed-race relationships faced prejudice; single mothers were stigmatised.`,
    keyPoints: ['Jo and Helen: volatile relationship', 'Peter: selfish, younger husband', 'Jimmie: Black sailor, father of Jo\'s baby', 'Geof: gay friend who cares for Jo', 'Kitchen sink drama; Delaney aged 19'],
    past: [{ year: 'Jun 2024', focus: 'Relationships between **men and women** as difficult / **Helen** enjoying life her own way' }, { year: 'Jun 2025', focus: 'How far **Peter** is selfish and unpleasant / Characters **in conflict**' }],
    questions: [mc('Who looks after Jo during her pregnancy?', ['Geof', 'Helen', 'Peter', 'Jimmie'], 'Geof offers the care her mother doesn\'t.', { d: 1 })],
    flash: [['What is "kitchen sink" drama?', '1950s-60s realist drama about working-class life in ordinary domestic settings.']],
    essay: 'How does Delaney present the relationship between Jo and Helen?',
  }),
  overview({
    id: 'leave', title: 'Leave Taking', group: 'lit-modern', value: 'leave', desc: 'Winsome Pinnock\'s play (1987): a Jamaican family in London across generations.',
    notes: `
**Plot**: **Enid**, who came to England from Jamaica as part of the **Windrush generation**, has raised her British-born daughters **Del** and **Viv** in London, hoping for a better life. She consults **Mai**, an **obeah woman** (spiritual healer), about family troubles. Rebellious **Del** clashes with Enid and leaves home, staying with Mai; studious **Viv** carries her mother's hopes of education. Enid's brother **Brod** lives in England too. News from Jamaica (the death of Enid's mother) forces the family to confront what has been lost and sacrificed.

**Themes**: identity and belonging (Jamaican/British); mother-daughter and generational conflict; migration and sacrifice; racism and the immigrant experience; tradition vs modern life; home.

**Context**: Windrush migrants (from 1948) invited to help rebuild Britain faced racism and hardship; first-generation hopes vs second-generation identity. Pinnock's own mother inspired the play.`,
    keyPoints: ['Enid: Windrush-generation mother', 'Del and Viv: British-born daughters with different paths', 'Mai: obeah woman', 'Generational conflict and identity', 'Migration, sacrifice, belonging'],
    past: [{ year: 'Jun 2025', focus: 'Difficult relationships between **older and younger** characters / How far **Enid** is a **strong mother**' }],
    questions: [mc('Who is Mai?', ['An obeah woman Enid consults', 'Enid\'s elder daughter', 'Viv\'s history teacher', 'Enid\'s employer in London'], 'Mai represents a link to Caribbean traditions.', { d: 1 })],
    flash: [['What is the Windrush generation?', 'Caribbean migrants who came to Britain from 1948 (named after the ship HMT Empire Windrush).']],
    essay: 'How does Pinnock present ideas about identity and belonging in *Leave Taking*?',
  }),
  overview({
    id: 'princess', title: 'Princess & The Hustler', group: 'lit-modern', value: 'princess', desc: 'Chinonyerem Odimba\'s play (2019): a Black family in Bristol, 1963.',
    notes: `
**Setting**: Bristol, **1963**, against the backdrop of the **Bristol Bus Boycott** - a campaign against the bus company's refusal to employ Black and Asian crews (the "colour bar"), which helped lead to the **Race Relations Act 1965**.

**Story**: **Princess**, a young Black girl, dreams of winning a beauty pageant and of a life beyond prejudice. Her mother **Mavis** works hard to hold the family together. Their everyday family life is thrown into turmoil when Princess's estranged father - "**the Hustler**" - returns. The play explores how the family's private struggles mirror the public fight for dignity and equality.

**Themes**: dreams and aspiration; family relationships (especially mother and daughter); race, racism and civil rights; identity and self-worth (beauty standards); belonging; resilience.

**Context**: the 1960s colour bar in Britain; the Bristol Bus Boycott (1963) led by activists such as Paul Stephenson; Windrush-era migration.`,
    keyPoints: ['Bristol 1963 - Bus Boycott backdrop', 'Princess\'s dreams (beauty pageant)', 'Mavis holds the family together', 'The Hustler (father) returns', 'Race, identity, family, aspiration'],
    past: [{ year: 'Jun 2025', focus: 'The relationship between **Mavis and Princess** / How Princess\'s **dreams** are important to her' }],
    questions: [mc('What real event forms the backdrop of the play?', ['The 1963 Bristol Bus Boycott', 'The 1981 Brixton riots', 'The Windrush arrival in 1948', 'The 1966 World Cup'], 'A campaign against the bus company\'s colour bar.', { d: 1 })],
    flash: [['What did the Bristol Bus Boycott achieve?', 'The bus company ended its colour bar in 1963; it helped lead to the Race Relations Act 1965.']],
    essay: 'How does Odimba present the importance of family in *Princess & The Hustler*?',
  }),
  overview({
    id: 'tales', title: 'Telling Tales (AQA anthology)', group: 'lit-modern', value: 'tales', desc: 'AQA\'s short story anthology - compare a named story with one other.',
    notes: `
The question names **one story** and asks you to write about it and **one other** of your choice.

| Story | Writer | Key ideas |
|---|---|---|
| **The Darkness Out There** | Penelope Lively | Sandra and Kerry help elderly Mrs Rutter, who reveals she let a German airman die in the war - appearances deceive, cruelty, growing up. |
| **Chemistry** | Graham Swift | A boy, his mother and grandfather; the mother's new partner; grief, jealousy, change, a toy boat and the grandfather's death. |
| **Korea** | John McGahern | Irish father and son; the father considers sending his son to fight in Korea (for money) - betrayal, generational conflict, coming of age. |
| **Odour of Chrysanthemums** | D.H. Lawrence | Elizabeth waits for her miner husband, who is killed in the pit; laying out his body she realises they never knew each other - loss, marriage, class. |
| **My Polish Teacher's Tie** | Helen Dunmore | Carla, a school dinner lady with a Polish father, writes to a Polish teacher as if she were a teacher - identity, class, being seen. |
| **A Family Supper** | Kazuo Ishiguro | A son returns to Japan; his father and the fugu fish; family tension, tradition, suicide hints. |
| **Invisible Mass of the Back Row** | Claire Fisher | A girl from a working-class family - imagination, aspiration and identity. |

**Skills**: compare ideas and methods (narrative voice, structure, endings, symbols such as the chrysanthemums or the tie).`,
    keyPoints: ['Named story + one other of your choice', 'Plan comparisons by theme: change, identity, loss, conflict between generations', 'Know each story\'s symbols and endings'],
    past: [
      { year: 'Jun 2024', focus: 'Characters **dealing with change** (\'Chemistry\') / Ideas about **identity** (\'My Polish Teacher\'s Tie\')' },
      { year: 'Jun 2025', focus: 'Characters **dealing with loss** (\'Odour of Chrysanthemums\') / **Conflict between generations** (\'Korea\')' },
    ],
    questions: [mc('In the Telling Tales question, how many stories do you write about?', ['Two: the named story and one other', 'One: only the named story', 'Three: the named story and two others', 'All of the stories in the anthology'], 'Choose your second story to fit the question\'s theme.', { d: 1 })],
    flash: [['What happens in "Odour of Chrysanthemums"?', 'A miner is killed; his wife realises while laying out his body that they were strangers to each other.']],
    essay: 'How do writers present relationships between parents and children in \'Korea\' and in one other story from *Telling Tales*?',
  }),
  overview({
    id: 'anita', title: 'Anita and Me', group: 'lit-modern', value: 'anita', desc: 'Meera Syal\'s semi-autobiographical novel (1996): growing up Punjabi in a 1970s mining village.',
    notes: `
**Plot**: **Meena Kumar**, 9, is from the only Punjabi family in **Tollington**, a former mining village near Wolverhampton (early 1970s). She idolises **Anita Rutter**, an older, rebellious white girl. Meena lies, steals and tries to fit in, while feeling torn between her parents' culture and village life. Her grandmother **Nanima** visits and helps Meena value her heritage. **Racism** grows - Anita's boyfriend **Sam Lowbridge** leads a racist attack. Meena breaks her leg, spends time in hospital, passes the **11-plus**, and leaves Tollington with a stronger sense of identity as the friendship with Anita ends.

**Themes**: identity and belonging (British-Asian); friendship; racism; growing up; family; a changing community (motorway, closure of the mine).

**Context**: 1970s Britain; South Asian immigration; racism (Enoch Powell's 1968 "Rivers of Blood" speech climate); Syal's own childhood in Essington.`,
    keyPoints: ['Meena: torn between two cultures', 'Anita: glamorous but cruel friend', 'Nanima helps Meena value her heritage', 'Sam Lowbridge\'s racist violence', 'Tollington changing; Meena leaves'],
    past: [{ year: 'Jun 2024', focus: 'Changes in **Meena\'s relationship with Anita** / Ideas about **racism**' }, { year: 'Jun 2025', focus: 'How far **Anita** is a **powerful** character / **Tollington** and ideas about society changing' }],
    questions: [mc('Who helps Meena feel proud of her Punjabi heritage?', ['Nanima, her grandmother', 'Anita', 'Sam Lowbridge', 'Mrs Rutter'], 'Nanima\'s visit reconnects Meena to her roots.', { d: 1 })],
    flash: [['Where is Anita and Me set?', 'Tollington, a fictional former mining village near Wolverhampton, early 1970s.']],
    essay: 'How does Syal present the importance of family in *Anita and Me*?',
  }),
  overview({
    id: 'pigeon', title: 'Pigeon English', group: 'lit-modern', value: 'pigeon', desc: 'Stephen Kelman\'s novel (2011): an 11-year-old Ghanaian boy on a London estate.',
    notes: `
**Plot**: **Harrison (Harri) Opoku**, 11, has recently arrived from **Ghana** and lives on a London housing estate with his mum and sister **Lydia** (his father and baby sister Agnes are still in Ghana). After a boy is **stabbed to death**, Harri and his friend **Dean** play detective, using ideas from TV. Harri wants to belong and is drawn towards the **Dell Farm Crew** gang (led by X-Fire, with Killa), while **Miquita** - a girl connected to the gang - is a frightening presence. A **pigeon** that Harri befriends narrates short sections. Harri gets too close to the truth and is **stabbed and killed** at the end.

**Themes**: innocence and childhood; violence and gang culture; belonging and identity; immigration; friendship; community and fear.

**Context**: inspired by the 2000 killing of Damilola Taylor in Peckham; knife crime and youth violence in London.`,
    keyPoints: ['Harri: innocent, funny, curious narrator', 'Detective game after a stabbing', 'Dell Farm Crew - gang pressure', 'Pigeon narrator sections', 'Tragic ending: Harri is killed', 'Inspired by Damilola Taylor\'s death'],
    past: [{ year: 'Jun 2024', focus: 'How far **Harrison** is likeable / Harrison\'s relationship with **female characters**' }, { year: 'Jun 2025', focus: 'The effects of **violence** on Harrison and his community / How far **Miquita** is frightening and threatening' }],
    questions: [tf('Pigeon English has a happy ending in which Harri solves the case safely.', false, 'Harri is stabbed - the loss of innocence is brutal.')],
    flash: [['What real event inspired Pigeon English?', 'The killing of 10-year-old Damilola Taylor in Peckham in 2000.']],
    essay: 'How does Kelman present ideas about innocence in *Pigeon English*?',
  }),
  overview({
    id: 'leon', title: 'My Name is Leon', group: 'lit-modern', value: 'leon', desc: 'Kit de Waal\'s novel (2016): a mixed-race boy in the care system, early 1980s.',
    notes: `
**Plot**: **Leon**, aged 9, is mixed-race; his mother **Carol** can't cope after the birth of his white baby half-brother **Jake**. Both boys go into foster care with kind **Maureen**, but Jake - a white baby - is **adopted** and Leon is left behind, heartbroken. When Maureen falls ill, Leon stays with her sister **Sylvia**. He spends time at an **allotment** where he meets **Tufty**, a Black man who becomes a role model, and **Mr Devlin**, an Irish ex-soldier. Against the backdrop of the **1981 riots** and the royal wedding, Leon plans to find Jake. The ending brings Leon a measure of hope and connection.

**Themes**: family and belonging; race and identity (adoption preferences); loyalty and love; childhood innocence; the care system; masculinity and role models.

**Context**: Birmingham, 1980-81; racial tension and the 1981 riots (e.g. Handsworth); prejudice in adoption; de Waal worked in family law and adoption.`,
    keyPoints: ['Leon separated from baby brother Jake', 'Jake adopted because he is white and a baby', 'Maureen: loving foster carer', 'Tufty and Mr Devlin at the allotment', '1981 riots backdrop', 'Themes: family, race, loyalty, belonging'],
    past: [{ year: 'Jun 2025', focus: 'The importance of **Maureen** in Leon\'s life / Ideas about **loyalty**' }],
    questions: [mc('Why is Jake adopted but Leon isn\'t?', ['Jake is a white baby; Leon is older and mixed-race', 'Leon refuses to be adopted without Jake', 'Carol insists on keeping Leon at home', 'Jake is older and easier to look after'], 'De Waal exposes racial prejudice in adoption.', { d: 2 })],
    flash: [['Who is Tufty?', 'A Black man Leon meets at the allotment who becomes a role model.']],
    essay: 'How does de Waal present the importance of family in *My Name is Leon*?',
  }),
];
