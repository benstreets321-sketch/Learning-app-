import type { Topic } from '../../types';
import { cards, mc, multi, tf, topic, examQ, match } from '../../dsl';

/** Medicine in Britain / Health and the people - shared by Edexcel (c1250-present) and AQA (c1000-present). */
export function medicineTopics(p: string, board: 'edexcel' | 'aqa'): Topic[] {
  const essay = board === 'edexcel'
    ? (q: string) => examQ(q, 16, ['Level 4 (13-16): analytical explanation, well-chosen accurate knowledge across the period; criteria for judgement clear; sustained, justified conclusion', 'Considers the factor in the statement AND other factors (e.g. individuals, science and technology, government, attitudes)', 'Goes beyond the two stimulus points given', 'Spelling, punctuation, grammar and terminology (+4 SPaG)'], { meta: 'Edexcel Paper 1 · 16 + 4 SPaG', time: 25 })
    : (q: string) => examQ(q, 16, ['Level 4 (13-16): complex explanation of the stated factor and others; sustained judgement', 'Range of accurate knowledge across different periods', 'Factors: war, government, science and technology, individuals, communication, chance, religion, attitudes', 'SPaG (+4)'], { meta: 'AQA Paper 2 Section A · 16 + 4 SPaG', time: 25 });
  const start = board === 'edexcel' ? 'c1250' : 'c1000';
  return [
    topic({
      id: `${p}-med-medieval`, title: `Medieval medicine (${start}-c1500)`, summary: 'Supernatural and natural ideas, the Four Humours, the Church, hospitals and the Black Death.',
      notes: `
## Ideas about cause
- **Religious/supernatural**: disease as a **punishment from God** for sin; astrology (position of the planets).
- **Rational (natural)**: **Theory of the Four Humours** (Hippocrates; developed by **Galen**) - blood, phlegm, yellow bile, black bile must be **balanced**. **Miasma**: bad air from rotting matter causes disease.

## Influence of the Church
The Church controlled education and preserved **Galen's** books; challenging Galen was challenging the Church → **little progress**.

## Treatment and prevention
- Prayer, pilgrimage, flagellation (whipping), charms.
- Humoral treatments: **bloodletting**, purging (vomiting/laxatives); herbal remedies; **apothecaries** mixed remedies.
- Care: **physicians** (university-trained, expensive), **barber-surgeons**, wise women/housewife-physicians (most common).
- Hospitals run by the Church (e.g. St Leonard's, York) - care (rest, food, prayer) not cure; often refused the infectious.
- Prevention: diet, exercise, purifying air (herbs), keeping clean (regimen sanitatis).

## The Black Death (1348-49)
Killed roughly a third to half of England's population. Explained by God, planets, miasma. Treatments: prayer, flagellants, bloodletting, nosegays, avoiding bad air. Government: in 1349 the King ordered the streets of London cleaned.
`,
      keyPoints: ['Causes: God, astrology, Four Humours, miasma', 'Galen\'s ideas preserved and protected by the Church', 'Treatments: prayer, bloodletting, purging, herbal remedies', 'Hospitals offered care not cures', 'Black Death 1348-49: God, planets, miasma'],
      timeline: [
        { date: '1348', event: 'The Black Death arrives in England' },
        { date: '1349', event: 'Edward III orders London\'s streets to be cleaned' },
        { date: 'c1200s-1400s', event: 'Church-run hospitals such as St Leonard\'s, York, provide care' },
      ],
      flashcards: cards([['What were the Four Humours?', 'Blood, phlegm, yellow bile and black bile - illness was caused by imbalance.'], ['What is miasma?', 'The belief that disease is caused by bad air from rotting matter.'], ['Why did the Church slow medical progress?', 'It controlled education and promoted Galen\'s ideas, discouraging challenge.'], ['Name two medieval treatments based on the Four Humours', 'Bloodletting and purging.'], ['When did the Black Death reach England?', '1348.']]),
      questions: [
        mc('Which theory said illness came from an imbalance of bodily fluids?', ['The Four Humours', 'Miasma', 'Germ theory', 'Astrology'], 'Hippocrates and Galen.', { d: 1 }),
        mc('Why were Galen\'s ideas rarely challenged in medieval England?', ['The Church supported them and controlled education', 'Doctors\' observations kept proving him right', 'There were no universities to teach medicine', 'Galen was still alive to defend his ideas'], 'Religion and tradition limited progress.', { d: 2 }),
        tf('Medieval hospitals mainly aimed to cure patients with infectious diseases.', false, 'They offered care (food, rest, prayer); many refused infectious patients.', { d: 2 }),
        multi('Which were believed causes of the Black Death?', ['Punishment from God', 'Bad air (miasma)', 'The position of the planets'], ['Bacteria spread by fleas', 'Lack of vitamins'], 'They didn\'t know about germs.', { d: 1 }),
      ],
    }),
    topic({
      id: `${p}-med-renaissance`, title: 'Renaissance medicine (c1500-c1700)', summary: 'Vesalius, Harvey, Sydenham, the printing press, the Royal Society and the Great Plague.',
      notes: `
## Change in ideas
- **Renaissance**: renewed interest in learning and challenging old ideas; **scientific method** (observation, experiments).
- **Andreas Vesalius** (*On the Fabric of the Human Body*, 1543): dissected humans and proved Galen wrong on anatomy (e.g. the jawbone, breastbone).
- **William Harvey** (*On the Motion of the Heart*, 1628): proved **blood circulates**, pumped by the heart - but little impact on treatment at the time.
- **Thomas Sydenham**: "English Hippocrates" - careful **observation** of symptoms, treated diseases individually.
- **Printing press** (1440s; Caxton in England 1476): ideas spread quickly and accurately.
- **Royal Society** (1660): shared scientific knowledge, published *Philosophical Transactions*.
- Church's influence declined (Reformation).

## Continuity
Most people still believed in the Four Humours and miasma; treatments barely changed; Galen still taught.

## The Great Plague (1665)
Causes: miasma, God, planets. Responses: plague doctors' beaked masks with herbs, quarantining houses (red cross), killing cats and dogs, banning public gatherings, searchers of the dead, smoking tobacco. **Government** involvement grew (Lord Mayor's orders).
`,
      keyPoints: ['Vesalius 1543 corrected Galen\'s anatomy', 'Harvey 1628 discovered blood circulation', 'Sydenham: observation of symptoms', 'Printing press and Royal Society spread ideas', 'But treatments and ideas of cause largely continued', 'Great Plague 1665: more government action'],
      timeline: [
        { date: '1543', event: 'Vesalius publishes On the Fabric of the Human Body' },
        { date: '1628', event: 'Harvey publishes his discovery of blood circulation' },
        { date: '1660', event: 'The Royal Society is founded' },
        { date: '1665', event: 'The Great Plague in London' },
      ],
      flashcards: cards([['What did Vesalius do?', 'Dissected human bodies and published accurate anatomy (1543), proving Galen wrong in places.'], ['What did Harvey discover?', 'That blood circulates around the body, pumped by the heart (1628).'], ['Why did Harvey\'s discovery have little immediate impact on treatment?', 'Doctors still believed in the Four Humours and it didn\'t lead to new treatments.'], ['What was the Royal Society?', 'A society founded in 1660 to share scientific knowledge and experiments.'], ['How did authorities respond to the Great Plague of 1665?', 'Quarantined houses, banned gatherings, killed cats and dogs, searchers recorded deaths.']]),
      questions: [
        mc('Who proved that blood circulates around the body?', ['William Harvey', 'Andreas Vesalius', 'Thomas Sydenham', 'Edward Jenner'], '1628.', { d: 1 }),
        mc('Which factor most helped new ideas spread in the Renaissance?', ['The printing press', 'Television', 'The NHS', 'Germ theory'], 'Accurate copies spread knowledge quickly.', { d: 1 }),
        tf('By 1700 most doctors had abandoned the Four Humours.', false, 'Continuity was strong - humoral ideas and treatments persisted.', { d: 2 }),
      ],
    }),
    topic({
      id: `${p}-med-c18-19`, title: 'Medicine in the 18th and 19th centuries (c1700-c1900)', summary: 'Jenner, germ theory (Pasteur, Koch), anaesthetics, antiseptics, Nightingale, cholera and public health.',
      notes: `
## Breakthroughs
- **Edward Jenner** (1796): **smallpox vaccination** using cowpox - based on observation; opposed by some, but made **compulsory in 1853**. He didn't know *why* it worked.
- **Louis Pasteur** (1861): **germ theory** - microbes cause decay/disease. Later vaccines (chicken cholera, anthrax, rabies).
- **Robert Koch** (1880s): identified specific bacteria (anthrax, **TB 1882**, cholera 1883); staining techniques.
- **Florence Nightingale**: Crimean War (Scutari) - improved hygiene and nursing; *Notes on Nursing* (1859); training school; hospitals with **pavilion** design.
- **James Simpson** (1847): **chloroform** anaesthetic - pain solved, but "black period" (deeper surgery → more infection and blood loss).
- **Joseph Lister** (1867): **carbolic acid** antiseptic spray - infection deaths fell; then **aseptic** surgery (sterile).

## Public health
- **John Snow** (1854): mapped **cholera** deaths around the **Broad Street pump** - showed it was waterborne; removed the pump handle.
- **Great Stink** (1858) → Bazalgette's London **sewers**.
- **1875 Public Health Act**: compulsory - councils had to provide clean water, sewers, drainage, medical officers. Laissez-faire attitudes gave way to government intervention (after working men got the vote, 1867).
`,
      keyPoints: ['Jenner smallpox vaccine 1796 (compulsory 1853)', 'Pasteur germ theory 1861; Koch identified bacteria (TB 1882)', 'Simpson chloroform 1847; Lister carbolic 1867', 'Nightingale: hygiene and nursing', 'Snow: cholera from Broad Street pump 1854', '1875 Public Health Act - compulsory'],
      timeline: [
        { date: '1796', event: 'Jenner tests the smallpox vaccine' },
        { date: '1847', event: 'Simpson discovers chloroform as an anaesthetic' },
        { date: '1853', event: 'Smallpox vaccination made compulsory' },
        { date: '1854', event: 'John Snow links cholera to the Broad Street pump' },
        { date: '1858', event: 'The Great Stink in London' },
        { date: '1861', event: 'Pasteur publishes germ theory' },
        { date: '1867', event: 'Lister uses carbolic acid as an antiseptic' },
        { date: '1875', event: 'Public Health Act makes councils provide clean water and sewers' },
        { date: '1882', event: 'Koch identifies the bacterium that causes TB' },
      ],
      flashcards: cards([['What did Jenner discover?', 'Vaccination against smallpox using cowpox (1796).'], ['What is germ theory?', 'Pasteur\'s theory (1861) that microorganisms (germs) cause decay and disease.'], ['What did Koch do?', 'Identified the specific bacteria that cause diseases such as TB and cholera.'], ['How did John Snow prove cholera was waterborne?', 'He mapped deaths around the Broad Street pump and removed its handle; deaths fell.'], ['What did the 1875 Public Health Act do?', 'Forced local councils to provide clean water, sewers and drainage.'], ['What did Lister use as an antiseptic?', 'Carbolic acid.']]),
      questions: [
        match('Match the individual to the breakthrough.', [['Jenner', 'Smallpox vaccination'], ['Pasteur', 'Germ theory'], ['Lister', 'Antiseptic surgery'], ['Snow', 'Cholera linked to water']], 'Key individuals.', { d: 1 }),
        mc('Why was the period after anaesthetics sometimes called the "black period" of surgery?', ['Surgeons did deeper operations, so infection and blood loss deaths rose', 'Operations had to be carried out at night by candlelight', 'Anaesthetics killed most patients before surgery began', 'Surgery was banned by the government for twenty years'], 'Pain was solved but infection was not.', { d: 3 }),
        tf('Jenner understood how vaccination worked because he knew about germs.', false, 'Germ theory came 65 years later (1861).', { d: 2 }),
      ],
    }),
    topic({
      id: `${p}-med-modern`, title: 'Modern medicine (c1900-present)', summary: 'Magic bullets, penicillin, the NHS, the Liberal reforms, DNA, lifestyle and lung cancer.',
      notes: `
## Understanding and diagnosis
- **DNA** structure (Watson & Crick, with Rosalind Franklin's X-ray images, **1953**); the **Human Genome Project** (completed 2003) → genetic screening and therapy.
- Lifestyle factors (smoking, diet, alcohol) recognised as causes of disease.
- Diagnosis: blood tests, X-rays, CT/MRI scans, monitors.

## Treatment
- **Magic bullets**: Ehrlich's **Salvarsan 606** (1909, syphilis); Prontosil (1932, Domagk).
- **Penicillin**: **Fleming** discovered it (1928) but couldn't mass-produce; **Florey and Chain** purified it (1940); **WW2** and **US government funding** enabled **mass production** (by D-Day 1944).
- Modern: chemotherapy, transplants, keyhole surgery, robotics.

## Government and prevention
- **Liberal reforms** (1906-1911): free school meals, pensions, National Insurance.
- **Beveridge Report (1942)** → **NHS founded 1948** (Aneurin Bevan) - free at the point of use.
- Vaccination campaigns (diphtheria 1942, polio, MMR), **Clean Air Acts** (1956), smoking bans (2007), health campaigns.

## Case study: lung cancer
Link with smoking proven by **Doll and Hill** (1950s). Treatments: surgery, radiotherapy, chemotherapy, transplants. Prevention: advertising bans, health warnings, smoking ban in public places (2007), taxes.

## Factors
**War** (penicillin, plastic surgery), **science and technology**, **government**, **individuals**, **communication**, **chance** (Fleming's mould).
`,
      keyPoints: ['DNA 1953; Human Genome Project 2003', 'Fleming 1928 → Florey & Chain 1940 → mass production in WW2', 'Magic bullets: Salvarsan 606 (1909)', 'NHS 1948 after the Beveridge Report 1942', 'Lung cancer: Doll and Hill link with smoking', 'Factors: war, science, government, individuals, chance'],
      timeline: [
        { date: '1909', event: 'Ehrlich develops Salvarsan 606, the first magic bullet' },
        { date: '1928', event: 'Fleming notices penicillin killing bacteria' },
        { date: '1940', event: 'Florey and Chain purify penicillin and test it' },
        { date: '1942', event: 'The Beveridge Report is published' },
        { date: '1948', event: 'The NHS is founded' },
        { date: '1953', event: 'The structure of DNA is identified' },
        { date: '2003', event: 'The Human Genome Project is completed' },
        { date: '2007', event: 'Smoking banned in enclosed public places in England' },
      ],
      flashcards: cards([['Who discovered penicillin and when?', 'Alexander Fleming, 1928.'], ['Who developed penicillin into a usable drug?', 'Howard Florey and Ernst Chain (1940s).'], ['Why was penicillin mass-produced in the 1940s?', 'WW2 created demand and the US government funded production.'], ['When was the NHS founded?', '1948.'], ['What was Salvarsan 606?', 'The first "magic bullet" - a chemical cure for syphilis (Ehrlich, 1909).'], ['Who linked smoking to lung cancer?', 'Richard Doll and Austin Bradford Hill (1950s).']]),
      questions: [
        mc('Which factor was most important in the mass production of penicillin?', ['War and government funding', 'The Church', 'The printing press', 'The Four Humours'], 'WW2 demand + US funding.', { d: 2 }),
        tf('Fleming mass-produced penicillin himself in 1928.', false, 'He couldn\'t purify it; Florey and Chain did, with wartime funding.', { d: 2 }),
        mc('What did the Beveridge Report (1942) lead to?', ['The NHS and the welfare state', 'The Black Death', 'Germ theory', 'The Public Health Act 1875'], 'Attacked the "five giants" including disease.', { d: 1 }),
      ],
      examQuestions: [essay(board === 'edexcel'
        ? '"The work of individuals was the main reason for progress in medical treatment in the period c1700-present." How far do you agree? Explain your answer. You may use: Fleming; the NHS. You must also use information of your own.'
        : 'Has war been the main factor in the development of medicine in Britain since c1000? Explain your answer with reference to war and other factors.')],
    }),
    ...(board === 'edexcel' ? [topic({
      id: `${p}-med-wf`, title: 'The British sector of the Western Front 1914-18', summary: 'Historic environment: trenches, wounds, the chain of evacuation, medical developments and sources.',
      notes: `
## Context
Ypres (1914-15, gas at 2nd Ypres 1915), the **Somme** (1916, ~57,000 British casualties on day one), **Arras** (1917, tunnels and quarries used as hospitals), **Cambrai** (1917, tanks; blood bank).

## Conditions and illnesses
Trench foot, **trench fever** (lice), **shell shock**, gas (chlorine, phosgene, **mustard gas**). Wounds: shrapnel and bullet wounds, **gas gangrene** (soil bacteria), head injuries (Brodie helmet introduced 1915-16).

## Chain of evacuation
**Stretcher bearers** → **Regimental Aid Post** (first aid, near front) → **Dressing Station** (ADS/MDS) → **Casualty Clearing Station** (surgery, triage, few miles back) → **Base Hospital** (e.g. Étaples) → Britain. Transport: motor ambulances, light railways, barges. **FANY** (women volunteers) drove ambulances.

## Medical developments
- **Thomas splint** (broken femurs - death rate fell from ~80% to ~20%).
- **Mobile X-ray** units; **blood transfusions** and storage (sodium citrate; blood depot at Cambrai 1917).
- **Carrel-Dakin method** (wound irrigation), **debridement**, amputation.
- **Plastic surgery** (Harold Gillies, Queen's Hospital, Sidcup).

## Sources
Diaries, letters, photographs (censored), official records (RAMC), hospital records, Army records. Ask: provenance - **N**ature, **O**rigin, **P**urpose - and content.
`,
      keyPoints: ['Battles: Ypres, Somme, Arras, Cambrai', 'Illnesses: trench foot, trench fever, shell shock, gas', 'Chain of evacuation: RAP → dressing station → CCS → base hospital', 'Thomas splint, mobile X-rays, blood banks, plastic surgery', 'Use NOP to judge source usefulness'],
      timeline: [
        { date: '1915', event: 'Chlorine gas used at the Second Battle of Ypres' },
        { date: '1916', event: 'Battle of the Somme begins' },
        { date: '1917', event: 'Tunnels at Arras used, including an underground hospital' },
        { date: '1917', event: 'Blood depot used at the Battle of Cambrai' },
      ],
      flashcards: cards([['What was the chain of evacuation?', 'Stretcher bearers → Regimental Aid Post → Dressing Stations → Casualty Clearing Station → Base Hospital → Britain.'], ['What did the Thomas splint do?', 'Kept broken legs (femur) still, cutting death rates from about 80% to 20%.'], ['What caused trench fever?', 'Lice.'], ['What was gas gangrene?', 'Infection from soil bacteria in wounds, causing tissue to die and produce gas.'], ['Who pioneered plastic surgery?', 'Harold Gillies.']]),
      questions: [
        mc('Where were most operations carried out in the chain of evacuation?', ['Casualty Clearing Station', 'Regimental Aid Post', 'In the trench', 'On the train'], 'CCS had surgeons and was out of shell range.', { d: 2 }),
        tf('Trench fever was caused by contaminated water.', false, 'It was spread by lice.', { d: 2 }),
      ],
      examQuestions: [
        examQ('Describe **two** features of the Casualty Clearing Stations on the Western Front.', 4, ['Feature 1 identified (e.g. located a few miles behind the front, out of range of most artillery)', 'Supporting detail (e.g. near railways/roads for transport)', 'Feature 2 identified (e.g. carried out urgent surgery and triage)', 'Supporting detail (e.g. used X-rays/blood transfusions later in the war)'], { meta: 'Edexcel Paper 1 Q1', time: 5 }),
        examQ('How could you follow up a diary written by a stretcher bearer at the Somme to find out more about the problems of evacuating the wounded?', 4, ['Detail in the source to follow up', 'Question I would ask', 'Type of source I could use (e.g. RAMC war diaries, hospital admission records)', 'How this might help answer the question'], { meta: 'Edexcel Paper 1 Q2(b)', time: 5 }),
      ],
    })] : []),
  ];
}
