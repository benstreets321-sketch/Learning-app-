import type { Topic } from '../../types';
import { cards, mc, tf, topic, examQ, ord, match } from '../../dsl';

/** Early Elizabethan England 1558-88 (Edexcel) / Elizabethan England c1568-1603 (AQA) */
export function elizabethTopics(p: string, board: 'edexcel' | 'aqa'): Topic[] {
  const big = (q: string) => board === 'edexcel'
    ? examQ(q, 16, ['Level 4 (13-16): analytical explanation, well-selected knowledge, criteria for judgement, justified conclusion', 'Considers the stated factor and others', 'Uses own knowledge beyond the two stimulus points'], { meta: 'Edexcel Paper 2 British depth Q3', time: 25 })
    : examQ(q, 16, ['Level 4 (13-16): complex explanation and sustained, substantiated judgement', 'Precise, wide-ranging knowledge', 'For historic environment questions: links the site to its context'], { meta: 'AQA Paper 2 Section B Q4', time: 25 });
  const range = board === 'edexcel' ? '1558-88' : 'c1568-1603';
  return [
    topic({
      id: `${p}-eliz-gov`, title: `Queen, government and religion (${range})`, summary: 'Elizabeth\'s situation in 1558, her government, the religious settlement and the Puritan and Catholic challenges.',
      notes: `
## Elizabeth's situation in 1558
Aged 25; **legitimacy** questioned by Catholics (Henry VIII's marriage to Anne Boleyn); **gender** (expected to marry); **religious divisions** after Mary I; **debts** from war with France; threats from France, Spain and Scotland (Mary, Queen of Scots).

## Government
- **Privy Council** (advisers; **William Cecil** - Lord Burghley, **Francis Walsingham** - spymaster, **Robert Dudley**), **Parliament** (taxes, laws; called only when needed), **Lord Lieutenants** and **Justices of the Peace** in the counties.
- **Court**: patronage, progresses (royal tours) to show herself to the people.
- The **marriage question** and **succession** - Elizabeth never married ("Virgin Queen").

## The Religious Settlement (1559)
A "**middle way**": **Act of Supremacy** (Elizabeth **Supreme Governor** of the Church), **Act of Uniformity** (Book of Common Prayer; churchgoing compulsory with **recusancy fines**), **Royal Injunctions** (guidance to clergy). Allowed some Catholic features (vestments, crucifixes) to keep Catholics loyal.

## Challenges
- **Puritans**: wanted a "purer" Protestant church - the **vestment controversy**; **prophesyings** (Archbishop Grindal suspended for refusing to ban them, 1577); later Separatists.
- **Catholics**: **Northern Rebellion (1569)**; **Papal Bull (1570)** excommunicating Elizabeth; **Jesuit/seminary priests** (Edmund Campion executed 1581); plots: **Ridolfi (1571)**, **Throckmorton (1583)**, **Babington (1586)**.
- **Mary, Queen of Scots**: fled to England 1568, imprisoned for 19 years, a focus for Catholic plots; **executed 1587** after the Babington Plot.
`,
      keyPoints: ['Problems in 1558: legitimacy, gender, religion, finance, foreign threats', 'Privy Council: Cecil, Walsingham, Dudley', '1559 Settlement: Supremacy, Uniformity, Injunctions - a middle way', 'Puritan challenge: vestments, prophesyings, Grindal', 'Catholic challenge: Northern Rebellion 1569, Papal Bull 1570, plots', 'Mary, Queen of Scots executed 1587'],
      timeline: [
        { date: '1558', event: 'Elizabeth becomes queen' },
        { date: '1559', event: 'The Religious Settlement (Acts of Supremacy and Uniformity)' },
        { date: '1568', event: 'Mary, Queen of Scots flees to England' },
        { date: '1569', event: 'The Revolt of the Northern Earls' },
        { date: '1570', event: 'The Pope excommunicates Elizabeth (Papal Bull)' },
        { date: '1571', event: 'The Ridolfi Plot' },
        { date: '1583', event: 'The Throckmorton Plot' },
        { date: '1586', event: 'The Babington Plot' },
        { date: '1587', event: 'Mary, Queen of Scots is executed' },
      ],
      flashcards: cards([['What did the Act of Supremacy (1559) do?', 'Made Elizabeth Supreme Governor of the Church of England.'], ['What did the Act of Uniformity do?', 'Set out the appearance and services of churches (Book of Common Prayer); attendance compulsory with fines for recusants.'], ['Who was Elizabeth\'s spymaster?', 'Sir Francis Walsingham.'], ['What was the Papal Bull of 1570?', 'The Pope excommunicated Elizabeth and released Catholics from obedience to her.'], ['Why was Mary, Queen of Scots a threat?', 'She had a strong claim to the throne and was a focus for Catholic plots.'], ['What was the vestment controversy?', 'Puritan objections to clergy wearing special Catholic-style clothing.']]),
      questions: [
        ord('Put these threats in chronological order.', ['Revolt of the Northern Earls', 'Papal Bull excommunicating Elizabeth', 'Throckmorton Plot', 'Babington Plot'], '1569 → 1570 → 1583 → 1586.', { d: 2 }),
        mc('Why was the 1559 Religious Settlement called a "middle way"?', ['It was Protestant but kept some Catholic features to avoid alienating Catholics', 'It was fully Catholic', 'It banned all religion', 'It was written by the Pope'], 'Compromise to unite the country.', { d: 2 }),
        mc('Which plot led directly to Mary, Queen of Scots\' execution?', ['Babington Plot', 'Ridolfi Plot', 'Throckmorton Plot', 'Gunpowder Plot'], 'Coded letters proved Mary approved the plot.', { d: 1 }),
        tf('Elizabeth\'s Privy Council always agreed with each other.', false, 'Councillors often disagreed (e.g. on Mary, on war with Spain); Elizabeth balanced factions.', { d: 2 }),
      ],
      examQuestions: [board === 'edexcel'
        ? examQ('Explain why Mary, Queen of Scots was a threat to Elizabeth I in the years 1568-87. You may use: the Papal Bull; the Babington Plot. You must also use information of your own.', 12, ['Level 4 (10-12): analytical explanation with well-developed causation', 'Mary\'s strong claim to the throne', 'Focus for Catholic plots (Ridolfi, Throckmorton, Babington)', 'Papal Bull encouraged Catholics to rebel', 'Foreign support (Spain, France)'], { meta: 'Edexcel Paper 2 British depth Q2', time: 15 })
        : examQ('Explain what was important about the Puritan challenge to Elizabeth I.', 8, ['Level 4 (7-8): complex explanation of importance with precise knowledge', 'Threat to the Religious Settlement (vestments, prophesyings)', 'Influence in Parliament and Privy Council', 'Grindal\'s suspension', 'Longer-term significance'], { meta: 'AQA Paper 2B Q2', time: 10 })],
    }),
    topic({
      id: `${p}-eliz-spain`, title: 'Conflict with Spain and the Armada (1588)', summary: 'Causes of conflict with Spain, the Netherlands, Drake, and why the Armada failed.',
      notes: `
## Causes of conflict
- **Religion**: Philip II (Catholic) vs Protestant England.
- **The Netherlands**: Protestant Dutch rebels against Spain; Elizabeth secretly then openly helped (**Treaty of Nonsuch, 1585** - Dudley sent with an army).
- **Privateers**: **Francis Drake** raided Spanish treasure ships and colonies; circumnavigation (1577-80), knighted 1581.
- **Plots**: Spanish involvement in plots against Elizabeth; Mary's execution (1587).
- **Drake's raid on Cádiz (1587)** - "**singeing the King of Spain's beard**" - delayed the Armada.

## The Spanish Armada (1588)
Plan: **Medina Sidonia** to sail up the Channel, meet the **Duke of Parma's** army in the Netherlands and invade England.
Why it failed:
- **English tactics and ships**: faster, more manoeuvrable galleons, long-range guns, better trained gunners; **fireships** at **Calais** broke the crescent formation; **Battle of Gravelines**.
- **Spanish problems**: poor communication with Parma (no deep-water port), inexperienced commander, supplies (rotten barrels after Cádiz).
- **Weather**: the "**Protestant wind**" drove ships north around Scotland and Ireland; many wrecked.
Consequences: boosted national pride and Protestantism; war with Spain continued until 1604.
`,
      keyPoints: ['Causes: religion, Netherlands, privateers, plots', 'Treaty of Nonsuch 1585', 'Drake: circumnavigation and Cádiz raid 1587', 'Armada 1588: Medina Sidonia, Parma', 'Fireships at Calais; Gravelines', 'Weather wrecked the retreating fleet'],
      timeline: [
        { date: '1577-80', event: 'Drake circumnavigates the globe' },
        { date: '1585', event: 'Treaty of Nonsuch - England supports the Dutch rebels' },
        { date: '1587', event: 'Drake raids Cádiz' },
        { date: '1588', event: 'The Spanish Armada is defeated' },
      ],
      flashcards: cards([['What was the Treaty of Nonsuch (1585)?', 'England agreed to send an army (under Dudley) to support the Dutch Protestant rebels against Spain.'], ['Who commanded the Spanish Armada?', 'The Duke of Medina Sidonia.'], ['What happened at Calais in 1588?', 'English fireships broke up the Armada\'s crescent formation.'], ['Why was the raid on Cádiz important?', 'It destroyed ships and supplies (including barrel staves), delaying the Armada by a year.']]),
      questions: [
        mc('What did English fireships do at Calais?', ['Scattered the Armada and broke its formation', 'Sank the whole Armada', 'Carried Parma\'s army', 'Delivered supplies'], 'Panic broke the crescent formation.', { d: 1 }),
        match('Match the person to their role.', [['Medina Sidonia', 'Commander of the Armada'], ['Parma', 'Commanded the Spanish army in the Netherlands'], ['Drake', 'English privateer'], ['Philip II', 'King of Spain']], 'Key individuals.', { d: 1 }),
        tf('Weather was the only reason the Armada failed.', false, 'English ships, tactics, fireships and Spanish planning problems also mattered.', { d: 2 }),
      ],
      examQuestions: [big('"The main reason for the defeat of the Spanish Armada was English tactics." How far do you agree? Explain your answer.')],
    }),
    topic({
      id: `${p}-eliz-society`, title: 'Society: education, leisure, poverty and exploration', summary: 'Elizabethan society, the Golden Age, the problem of poverty, voyages of discovery and Virginia.',
      notes: `
## Education and leisure
- Education mainly for boys of wealthier families: petty schools, **grammar schools**, universities (Oxford, Cambridge); girls educated at home if at all.
- Leisure: **theatre** (the Globe built 1599; Shakespeare), blood sports (bear-baiting, cock-fighting), hunting, music, dance, football; a "**Golden Age**" of culture (AQA emphasis: Shakespeare, Hilliard's portraits, Hardwick Hall).

## Poverty
Causes: **population growth**, rising prices/**inflation**, enclosure, bad harvests (1590s), decline of the cloth trade, dissolution of the monasteries (earlier) removed charity.
Responses: **Vagabonds Act (1572)** (punish sturdy beggars, poor rate), **Statute of Artificers (1563)**, **1576 Poor Relief Act** (work for the able-bodied), the **1601 Poor Law** (AQA) - deserving vs undeserving poor, compulsory poor rates, overseers of the poor.

## Exploration
Reasons: trade, new technology (astrolabe, better ships, maps), rivalry with Spain, wealth.
- **Drake's circumnavigation (1577-80)**.
- **Walter Raleigh** and **Virginia** (Roanoke colony 1585-87) - failed: poor planning, conflict with Native Americans, supply problems; the "lost colony".

## AQA: historic environment
AQA sets an essay on a **specific historic site** each year (released by AQA in advance) - check with your teacher which site is set for **your** exam year.
`,
      keyPoints: ['Education for wealthy boys; grammar schools', 'Theatre and the Golden Age', 'Poverty causes: population, inflation, enclosure, bad harvests', 'Poor laws 1563, 1572, 1576, (1601)', 'Exploration: Drake 1577-80; Raleigh and Virginia (Roanoke failed)'],
      timeline: [
        { date: '1563', event: 'Statute of Artificers' },
        { date: '1572', event: 'Vagabonds Act' },
        { date: '1576', event: 'Poor Relief Act' },
        { date: '1585', event: 'First colony at Roanoke, Virginia' },
        { date: '1599', event: 'The Globe Theatre is built' },
        { date: '1601', event: 'The Elizabethan Poor Law' },
      ],
      flashcards: cards([['Give three causes of poverty in Elizabethan England', 'Population growth, inflation, enclosure, bad harvests, decline of the cloth trade.'], ['What was the 1601 Poor Law?', 'Made poor rates compulsory and divided the poor into deserving and undeserving, with overseers of the poor.'], ['Why did the Roanoke colony fail?', 'Poor planning, lack of supplies, conflict with Native Americans and the war with Spain.'], ['Who led the voyages to Virginia?', 'Sir Walter Raleigh organised them.']]),
      questions: [
        mc('What was a "sturdy beggar"?', ['An able-bodied person who could work but begged instead', 'A disabled person', 'A soldier', 'A rich merchant'], 'Seen as "undeserving" and punished.', { d: 2 }),
        mc('Why did population growth increase poverty?', ['More demand pushed up prices and there were not enough jobs', 'It reduced prices', 'It increased wages', 'It ended enclosure'], 'Inflation and unemployment.', { d: 2 }),
      ],
      examQuestions: [board === 'edexcel'
        ? examQ('Describe **two** features of the attempted colonisation of Virginia (1585-86).', 4, ['Feature 1 identified (e.g. the settlement at Roanoke)', 'Supporting detail', 'Feature 2 identified (e.g. conflict with Native Americans / supply problems)', 'Supporting detail'], { meta: 'Edexcel Paper 2 British depth Q1', time: 5 })
        : examQ('Write an account of the ways in which the government dealt with the problem of poverty during Elizabeth\'s reign.', 8, ['Level 4 (7-8): analytical narrative showing how actions developed over time', 'Distinction between deserving and undeserving poor', 'Key acts: 1563, 1572, 1576, 1601', 'Local initiatives (e.g. Norwich, Ipswich)'], { meta: 'AQA Paper 2B Q3', time: 10 })],
    }),
  ];
}
