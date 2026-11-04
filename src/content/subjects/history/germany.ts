import type { Topic } from '../../types';
import { cards, mc, multi, tf, topic, examQ, ord } from '../../dsl';

/** Weimar and Nazi Germany (Edexcel 1918-39) / Germany 1890-1945 (AQA) */
export function germanyTopics(p: string, board: 'edexcel' | 'aqa'): Topic[] {
  const explainWhy = (q: string) => board === 'edexcel'
    ? examQ(q, 12, ['Level 4 (10-12): analytical explanation directed at the question; accurate, relevant knowledge; well-developed causation', 'Covers the two stimulus points AND own knowledge', 'Shows how factors link/interact', 'Clear line of reasoning'], { meta: 'Edexcel Paper 3 Q2 (Explain why)', time: 15 })
    : examQ(q, 12, ['Level 4 (10-12): complex explanation of BOTH bullet points; judgement on which is more important', 'Developed, sustained reasoning with accurate knowledge', 'Substantiated judgement explaining WHY one factor mattered more'], { meta: 'AQA Paper 1A Q6 (Which was more important?)', time: 15 });
  const extra: Topic[] = board === 'aqa' ? [
    topic({
      id: `${p}-ger-kaiser`, title: 'Kaiser Wilhelm II and the First World War (1890-1918)', summary: 'Kaiser Wilhelm\'s Germany, militarism, the impact of WW1 and the 1918 revolution (AQA).',
      notes: `
- **Kaiser Wilhelm II** (ruled 1888-1918): an autocrat who controlled the army, chancellor and foreign policy; the **Reichstag** (elected) had limited power.
- **Prussian militarism**: the army had huge status; Wilhelm wanted a "place in the sun" → **Weltpolitik** and the **Navy Laws** (1898, 1900) - naval race with Britain.
- **Industrialisation**: rapid growth, rise of the working class and the **SPD** (socialists - largest party by 1912) → the Kaiser feared socialism; social reforms to win workers.
- **WW1 (1914-18)**: food shortages (British **naval blockade**), the "turnip winter" (1916-17), war weariness, strikes; by 1918 Germany was effectively a military dictatorship under Hindenburg and Ludendorff.
- **1918**: Kiel naval **mutiny**, revolution spreads, Kaiser **abdicates** (9 November 1918), Germany becomes a **republic**; **armistice** signed 11 November 1918.
`,
      keyPoints: ['Kaiser as autocrat; weak Reichstag', 'Militarism and the Navy Laws', 'Growth of the SPD and fear of socialism', 'WW1: blockade, food shortages, war weariness', 'Kiel mutiny; Kaiser abdicates 9 Nov 1918'],
      timeline: [
        { date: '1888', event: 'Wilhelm II becomes Kaiser' },
        { date: '1898', event: 'First Navy Law passed' },
        { date: '1912', event: 'The SPD becomes the largest party in the Reichstag' },
        { date: '1914', event: 'Germany enters the First World War' },
        { date: '1916-17', event: 'The "turnip winter" food crisis' },
        { date: 'Nov 1918', event: 'Kiel mutiny and the Kaiser abdicates' },
      ],
      flashcards: cards([['What was Weltpolitik?', 'Wilhelm II\'s policy of making Germany a world power, e.g. building a navy and empire.'], ['Why did the Kaiser fear the SPD?', 'It was a socialist party that grew rapidly with industrialisation and wanted to reduce his power.'], ['What happened in November 1918?', 'Naval mutiny at Kiel, revolution, the Kaiser abdicated and Germany became a republic.']]),
      questions: [
        mc('Why did support for the SPD grow before 1914?', ['Industrialisation created a large working class', 'The Kaiser supported socialism', 'Germany lost a war', 'The army backed it'], 'Workers wanted better conditions.', { d: 2 }),
        tf('The Reichstag controlled the army before 1914.', false, 'The Kaiser controlled the army; the Reichstag had limited power.', { d: 2 }),
      ],
    }),
  ] : [];

  const final: Topic[] = board === 'aqa' ? [
    topic({
      id: `${p}-ger-war`, title: 'The Nazi home front in the Second World War (1939-45)', summary: 'Rationing, total war, bombing, opposition and the Holocaust (AQA).',
      notes: `
- **Rationing** from 1939; early victories kept morale high.
- After defeat at **Stalingrad (1943)**, Goebbels declared **total war**: all resources for the war, women conscripted into work, non-essential businesses closed.
- **Allied bombing** (e.g. Hamburg 1943, Dresden 1945) destroyed cities; refugees.
- **Opposition**: **White Rose** group (Hans and Sophie Scholl, leaflets, executed 1943); **Edelweiss Pirates**; the **July Bomb Plot** (Stauffenberg, 1944) failed.
- **The Holocaust / Final Solution**: persecution escalated - ghettos, *Einsatzgruppen* mass shootings, **Wannsee Conference (1942)** planned systematic extermination; death camps (e.g. Auschwitz-Birkenau). Around **6 million Jews** murdered, plus Roma, disabled people and others.
`,
      keyPoints: ['Rationing from 1939', 'Total war after Stalingrad 1943', 'Allied bombing of German cities', 'Opposition: White Rose, Edelweiss Pirates, July Bomb Plot', 'Wannsee Conference 1942 and the Final Solution'],
      timeline: [
        { date: '1939', event: 'Rationing introduced in Germany' },
        { date: '1942', event: 'Wannsee Conference plans the "Final Solution"' },
        { date: '1943', event: 'Defeat at Stalingrad and Goebbels declares "total war"' },
        { date: '1944', event: 'July Bomb Plot against Hitler fails' },
      ],
      flashcards: cards([['What was "total war"?', 'Goebbels\' 1943 policy of devoting all of Germany\'s resources to the war effort.'], ['What was the White Rose?', 'A student resistance group (Hans and Sophie Scholl) who distributed anti-Nazi leaflets.'], ['What was decided at the Wannsee Conference (1942)?', 'The organisation of the "Final Solution" - the systematic murder of Europe\'s Jews.']]),
      questions: [mc('What event led Goebbels to declare "total war" in 1943?', ['Defeat at Stalingrad', 'The Reichstag Fire', 'The Munich Putsch', 'Kristallnacht'], 'A turning point in the war.', { d: 2 })],
    }),
  ] : [];

  return [
    ...extra,
    topic({
      id: `${p}-ger-weimar`, title: 'The Weimar Republic 1918-29: crisis and recovery', summary: 'Weaknesses of the constitution, Versailles, uprisings, hyperinflation (1923) and the Stresemann years.',
      notes: `
## The Weimar Constitution (1919)
- President (elected every 7 years) with **Article 48** - emergency powers to rule by decree.
- Reichstag elected by **proportional representation** → many small parties → **coalition** governments that often collapsed.
- Strengths: democratic, votes for women and men over 20, rights guaranteed.

## Early problems (1919-23)
- **Treaty of Versailles** (1919): "**Diktat**" - war guilt (Article 231), **£6.6 billion reparations**, army limited to 100,000, lost land (Alsace-Lorraine, Polish Corridor), Rhineland demilitarised. Politicians who signed were called "**November Criminals**" - "stab in the back" myth.
- **Spartacist Revolt** (left, January 1919) crushed by the **Freikorps**.
- **Kapp Putsch** (right, 1920) defeated by a **general strike**.
- **Ruhr occupation** (French/Belgian, January 1923) after missed reparations → passive resistance → government printed money → **hyperinflation** (a loaf cost 200 billion marks by November 1923). Savings wiped out (middle classes hit hardest); some debtors benefited.
- **Munich Putsch** (Nov 1923) - see Nazi rise.

## Recovery under Stresemann (1924-29)
- **Rentenmark** (1923) ended hyperinflation.
- **Dawes Plan** (1924): reparations reduced/rescheduled, US loans (800 million marks). **Young Plan** (1929): reparations reduced further, extended to 1988.
- **Locarno Pact** (1925), joined the **League of Nations** (1926), **Kellogg-Briand Pact** (1928).
- "Golden Age" culture (cabaret, Bauhaus) - but reliant on **US loans**; extremist parties still existed.
`,
      keyPoints: ['Article 48 and proportional representation were weaknesses', 'Versailles: Diktat, war guilt, reparations, army 100,000', 'Spartacists 1919 (left); Kapp Putsch 1920 (right)', 'Ruhr occupation → hyperinflation 1923', 'Stresemann: Rentenmark, Dawes Plan, Locarno, League, Young Plan', 'Recovery depended on US loans'],
      timeline: [
        { date: '1919', event: 'Spartacist Revolt is crushed by the Freikorps' },
        { date: '1919', event: 'The Treaty of Versailles is signed' },
        { date: '1920', event: 'Kapp Putsch defeated by a general strike' },
        { date: '1923', event: 'French and Belgian troops occupy the Ruhr' },
        { date: '1924', event: 'The Dawes Plan provides US loans' },
        { date: '1925', event: 'The Locarno Pact is signed' },
        { date: '1926', event: 'Germany joins the League of Nations' },
        { date: '1929', event: 'The Young Plan reduces reparations' },
      ],
      flashcards: cards([['What was Article 48?', 'It allowed the President to rule by decree in an emergency, bypassing the Reichstag.'], ['Why did proportional representation weaken Weimar?', 'It produced many parties and unstable coalition governments.'], ['What caused hyperinflation in 1923?', 'The government printed money to pay striking workers during the Ruhr occupation (on top of reparations and war debts).'], ['What was the Dawes Plan?', 'A 1924 agreement reducing reparation payments and providing US loans to Germany.'], ['Who were the "November Criminals"?', 'The politicians who signed the armistice/Treaty - blamed by nationalists for Germany\'s defeat.']]),
      questions: [
        mc('Which event triggered hyperinflation in 1923?', ['The French and Belgian occupation of the Ruhr', 'The Wall Street Crash', 'The Kapp Putsch', 'The Dawes Plan'], 'Passive resistance → printing money.', { d: 1 }),
        mc('Who was hit hardest by hyperinflation?', ['People with savings, such as the middle classes', 'People with large debts', 'Farmers with mortgages', 'Foreign investors only'], 'Savings became worthless.', { d: 2 }),
        multi('Which were achievements of Stresemann?', ['The Rentenmark', 'The Dawes Plan', 'Joining the League of Nations'], ['The Enabling Act', 'The Munich Putsch'], '1923-29 recovery.', { d: 2 }),
        tf('The Weimar recovery of 1924-29 was independent of foreign money.', false, 'It depended heavily on US loans - which were recalled after 1929.', { d: 2 }),
      ],
      examQuestions: [explainWhy(board === 'edexcel'
        ? 'Explain why there was a recovery in Germany in the years 1924-29. You may use: the Dawes Plan; the League of Nations. You must also use information of your own.'
        : 'Which of the following was the more important reason why the Weimar Republic faced problems in 1919-23: the Treaty of Versailles OR hyperinflation? Explain your answer with reference to both reasons.')],
    }),
    topic({
      id: `${p}-ger-rise`, title: 'Hitler\'s rise to power 1919-33', summary: 'The early Nazi Party, Munich Putsch, the Depression and how Hitler became Chancellor.',
      notes: `
## Early years
- Hitler joined the **German Workers' Party (DAP)** in 1919; it became the **NSDAP** (Nazi Party) in 1920 with the **Twenty-Five Point Programme** (abolish Versailles, anti-Semitism, nationalism). The **SA** (stormtroopers) formed in 1921.
- **Munich Putsch (November 1923)**: failed attempt to seize power in Bavaria; Hitler imprisoned - wrote *Mein Kampf* and gained national publicity. He decided to win power **legally** through elections.
- **Lean years (1924-29)**: little support during prosperity (12 seats in 1928), but reorganised the party (**Bamberg Conference 1926**, Hitler Youth, SS).

## The Depression and growth of support (1929-32)
- **Wall Street Crash (1929)** → US loans recalled → unemployment over **6 million** (1932).
- Weimar governments seemed weak; **Brüning** ruled by Article 48 decrees.
- Nazi appeal: **propaganda** (Goebbels), promises of jobs and strong leadership, scapegoating Jews/communists, Hitler's speeches, SA violence against opponents; support from workers, farmers, middle classes and some industrialists fearing communism.
- July 1932: Nazis became the **largest party** (230 seats).

## Becoming Chancellor (January 1933)
Political deals: **von Papen** and **Hindenburg** made Hitler **Chancellor on 30 January 1933**, believing they could control him.
`,
      keyPoints: ['DAP → NSDAP 1920; 25 Point Programme', 'Munich Putsch 1923 failed - Mein Kampf, publicity, legal strategy', 'Little support in the prosperous late 1920s', 'Depression: 6 million unemployed by 1932', 'Propaganda, promises, scapegoats, SA', 'Largest party July 1932; Chancellor 30 Jan 1933 through deals'],
      timeline: [
        { date: '1920', event: 'The DAP becomes the NSDAP and publishes the 25 Point Programme' },
        { date: '1923', event: 'The Munich Putsch fails' },
        { date: '1926', event: 'The Bamberg Conference strengthens Hitler\'s control of the party' },
        { date: '1929', event: 'The Wall Street Crash' },
        { date: 'Jul 1932', event: 'The Nazis become the largest party in the Reichstag' },
        { date: 'Jan 1933', event: 'Hitler is appointed Chancellor' },
      ],
      flashcards: cards([['What was the Munich Putsch?', 'Hitler\'s failed attempt to seize power in Bavaria in November 1923.'], ['Why was the Munich Putsch important despite failing?', 'Hitler gained publicity at his trial, wrote Mein Kampf, and switched to a legal route to power.'], ['How many were unemployed in Germany in 1932?', 'About 6 million.'], ['How did Hitler become Chancellor?', 'Through a political deal - von Papen and Hindenburg appointed him in January 1933, thinking they could control him.']]),
      questions: [
        ord('Put these events in order.', ['Munich Putsch', 'Wall Street Crash', 'Nazis become largest party', 'Hitler becomes Chancellor'], '1923 → 1929 → 1932 → 1933.', { d: 1 }),
        mc('Why did Nazi support grow after 1929?', ['The Depression caused mass unemployment and anger at Weimar', 'Germany was very prosperous', 'Hitler won the 1925 presidential election', 'The Nazis abolished the SA'], 'Economic crisis made extremist promises attractive.', { d: 1 }),
        tf('Hitler was elected Chancellor by a majority of German voters.', false, 'Nazis never won a majority in free elections; Hitler was appointed through backroom deals.', { d: 2 }),
      ],
      examQuestions: [board === 'edexcel'
        ? examQ('"The main reason for the growth in support for the Nazi Party in the years 1929-32 was the Great Depression." How far do you agree with Interpretation 2? (Assume Interpretation 2 argues that Nazi propaganda was the main reason.) Explain your answer using both interpretations and your knowledge of the historical context.', 16, ['Level 4 (13-16): explains agreement/disagreement with the interpretation using both interpretations and precise contextual knowledge', 'Evaluates propaganda (Goebbels, rallies, posters, Hitler as saviour)', 'Evaluates economic factors (unemployment, US loans recalled)', 'Considers other factors (weak Weimar governments, fear of communism, SA)', 'Sustained judgement', 'SPaG (+4)'], { meta: 'Edexcel Paper 3 Q3(d) style', time: 25 })
        : examQ('Describe two problems the Nazi Party faced in the years 1924-28.', 4, ['Problem 1 identified (e.g. little support during prosperity - only 12 seats in 1928)', 'Supporting detail', 'Problem 2 identified (e.g. Hitler in prison / party divided until the Bamberg Conference)', 'Supporting detail'], { meta: 'AQA Paper 1A Q4', time: 5 })],
    }),
    topic({
      id: `${p}-ger-control`, title: 'Nazi control and dictatorship 1933-39', summary: 'Reichstag Fire, Enabling Act, Night of the Long Knives, police state, propaganda and opposition.',
      notes: `
## Creating the dictatorship
- **Reichstag Fire** (February 1933): blamed on communist van der Lubbe → emergency decree, communists arrested.
- **Enabling Act** (March 1933): Hitler could pass laws without the Reichstag for four years.
- **Trade unions banned** (May 1933); **other political parties banned** (July 1933) → one-party state.
- **Night of the Long Knives** (30 June 1934): SA leader **Röhm** and others murdered by the SS - removed rivals, won army support.
- **Hindenburg died** (August 1934): Hitler became **Führer**; army swore personal oath of loyalty.

## Police state
- **SS** (Himmler), **Gestapo** (secret police), **SD**; informers, block wardens; concentration camps (Dachau 1933).
- Courts and judges controlled (People's Court).
- **Churches**: Concordat with the Catholic Church (1933) later broken; Reich Church for Protestants; Pastor **Niemöller** (Confessing Church) sent to camps.

## Propaganda and censorship (Goebbels)
Rallies (Nuremberg), radio ("People's Receiver"), newspapers controlled, films, posters, **1936 Berlin Olympics**, book burning (1933), Reich Chamber of Culture.

## Opposition
Limited: some churchmen, youth groups (Swing Youth, **Edelweiss Pirates**), workers' passive resistance. Fear, propaganda and popular policies limited it.
`,
      keyPoints: ['Reichstag Fire Feb 1933 → arrests of communists', 'Enabling Act March 1933', 'Parties and unions banned 1933', 'Night of the Long Knives June 1934', 'Hitler becomes Führer August 1934', 'SS, Gestapo, camps; Goebbels\' propaganda', 'Opposition: Niemöller, Edelweiss Pirates, Swing Youth'],
      timeline: [
        { date: 'Feb 1933', event: 'The Reichstag Fire' },
        { date: 'Mar 1933', event: 'The Enabling Act is passed' },
        { date: 'Jul 1933', event: 'All other political parties are banned' },
        { date: 'Jun 1934', event: 'The Night of the Long Knives' },
        { date: 'Aug 1934', event: 'Hindenburg dies and Hitler becomes Führer' },
        { date: '1936', event: 'Berlin hosts the Olympic Games' },
      ],
      flashcards: cards([['What did the Enabling Act allow?', 'Hitler to pass laws without the Reichstag\'s approval for four years.'], ['What was the Night of the Long Knives?', 'The murder of SA leaders including Röhm by the SS (June 1934) to remove rivals and win the army\'s support.'], ['Who ran Nazi propaganda?', 'Joseph Goebbels.'], ['Who led the Confessing Church?', 'Pastor Martin Niemöller.'], ['What was the Gestapo?', 'The Nazi secret police.']]),
      questions: [
        mc('Why did Hitler carry out the Night of the Long Knives?', ['To remove Röhm and the SA as a threat and win the army\'s support', 'To punish communists for the Reichstag Fire', 'To end the Depression', 'To prepare for the Olympics'], 'The army saw the SA as a rival.', { d: 2 }),
        ord('Put the steps to dictatorship in order.', ['Reichstag Fire', 'Enabling Act', 'Political parties banned', 'Night of the Long Knives', 'Hitler becomes Führer'], '1933-34.', { d: 2 }),
        tf('Opposition to the Nazis was large and well organised in the 1930s.', false, 'Fear, propaganda and popular policies kept opposition small.', { d: 2 }),
      ],
      examQuestions: [board === 'edexcel'
        ? examQ('Give **two** things you can infer from a Nazi poster of the 1930s showing a crowd saluting Hitler under the slogan "One People, One Reich, One Führer".', 4, ['Inference 1 (e.g. the Nazis wanted Germans to see Hitler as the single leader)', 'Supporting detail from the source', 'Inference 2 (e.g. propaganda promoted national unity)', 'Supporting detail'], { meta: 'Edexcel Paper 3 Q1 (inference)', time: 5 })
        : examQ('In what ways were the lives of people in Germany affected by Nazi policies towards the Church? Explain your answer.', 8, ['Level 4 (7-8): complex explanation of change/effects with precise knowledge', 'Concordat (1933) and its breaking', 'Reich Church; persecution of Niemöller and Confessing Church', 'Effects on Catholic schools/youth groups'], { meta: 'AQA Paper 1A Q5', time: 10 })],
    }),
    topic({
      id: `${p}-ger-life`, title: 'Life in Nazi Germany 1933-39', summary: 'Women, young people, employment and living standards, and persecution of minorities.',
      notes: `
## Women
"**Kinder, Küche, Kirche**" (children, kitchen, church). Marriage loans, **Mother's Cross** for large families, Lebensborn; women discouraged from professions. (Later, labour shortages forced some back to work.)

## Young people
- **Hitler Youth** (compulsory from 1936/39) and **League of German Maidens**: physical fitness, obedience, Nazi ideology.
- **Education**: curriculum changed - race studies, history from the Nazi viewpoint, PE; teachers in the Nazi Teachers' League; **Mein Kampf** studied.

## Employment and living standards
- Unemployment fell from ~6 million (1933) to ~0.3 million (1939) via **public works** (autobahns), **rearmament**, **conscription** (1935), **RAD** (National Labour Service) - and "invisible unemployment" (women and Jews not counted).
- **German Labour Front (DAF)** replaced unions; **Strength Through Joy (KdF)** - holidays and leisure; **Beauty of Labour**; the **Volkswagen** scheme (most never received a car).
- Wages controlled, longer hours; food prices rose.

## Persecution
- **Jews**: boycott of Jewish shops (April 1933), **Nuremberg Laws (1935)** removed citizenship and banned marriage with non-Jews, **Kristallnacht (November 1938)** - synagogues, shops and homes attacked, ~30,000 men sent to camps.
- Others: Roma and Sinti, disabled people (sterilisation; the T4 "euthanasia" programme from 1939), homosexuals, Slavs, "asocials".
`,
      keyPoints: ['Women: Kinder, Küche, Kirche; Mother\'s Cross', 'Hitler Youth and Nazi education', 'Unemployment cut by public works, rearmament, conscription (and invisible unemployment)', 'DAF, Strength Through Joy, Volkswagen', 'Nuremberg Laws 1935; Kristallnacht 1938', 'Persecution of Roma, disabled, homosexuals'],
      timeline: [
        { date: 'Apr 1933', event: 'Boycott of Jewish shops' },
        { date: '1935', event: 'The Nuremberg Laws are passed' },
        { date: '1935', event: 'Conscription is introduced' },
        { date: '1936', event: 'Membership of the Hitler Youth is made compulsory' },
        { date: 'Nov 1938', event: 'Kristallnacht' },
      ],
      flashcards: cards([['What were the Nuremberg Laws (1935)?', 'Laws removing German citizenship from Jews and banning marriage between Jews and non-Jews.'], ['What was Kristallnacht?', 'A night of violence against Jews (November 1938): synagogues, shops and homes attacked.'], ['What was Strength Through Joy?', 'A Nazi organisation providing cheap holidays and leisure activities for workers.'], ['What does "Kinder, Küche, Kirche" mean?', 'Children, kitchen, church - the Nazi ideal role for women.'], ['What was "invisible unemployment"?', 'Unemployed women and Jews were not counted in official figures.']]),
      questions: [
        mc('How did the Nazis reduce unemployment?', ['Public works, rearmament and conscription', 'Joining the League of Nations', 'Increasing reparations', 'Banning the Hitler Youth'], 'Plus not counting women and Jews.', { d: 1 }),
        mc('What did the Nuremberg Laws do?', ['Removed Jews\' German citizenship', 'Made the Hitler Youth compulsory', 'Introduced conscription', 'Banned trade unions'], '1935.', { d: 1 }),
        tf('Most workers received a Volkswagen car through the KdF scheme before the war.', false, 'Workers paid in but almost none received a car - factories switched to war production.', { d: 3 }),
      ],
      examQuestions: [explainWhy(board === 'edexcel'
        ? 'Explain why the Nazis were able to reduce unemployment in the years 1933-39. You may use: the National Labour Service (RAD); rearmament. You must also use information of your own.'
        : 'Which of the following was the more important reason why the Nazis kept control of young people: the Hitler Youth OR education? Explain your answer with reference to both.')],
    }),
    ...final,
  ];
}

