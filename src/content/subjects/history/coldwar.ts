import type { Topic } from '../../types';
import { cards, mc, multi, tf, topic, examQ, ord, match } from '../../dsl';

/** Superpower relations and the Cold War 1941-91 (Edexcel period study) */
export function coldWarTopics(p: string): Topic[] {
  return [
    topic({
      id: `${p}-cw-origins`, title: 'The origins of the Cold War 1941-58', summary: 'Grand Alliance conferences, ideology, Truman Doctrine, Marshall Plan, Berlin Blockade, NATO and the Hungarian Uprising.',
      notes: `
## Ideologies
**USA**: capitalism and democracy. **USSR**: communism and one-party state. Mutual suspicion.

## The Grand Alliance conferences
- **Tehran (1943)**: second front agreed; USSR to have influence in Eastern Europe.
- **Yalta (Feb 1945)**: Germany divided into 4 zones (Berlin too); free elections in Eastern Europe promised; USSR to join the war against Japan.
- **Potsdam (July 1945)**: tension - **Truman** (after Roosevelt's death) and **Attlee**; disagreements over Germany and Poland; USA had the **atomic bomb**.

## Increasing tension 1945-49
- Soviet satellite states set up in Eastern Europe ("**Iron Curtain**" - Churchill, 1946); **Long Telegram** (Kennan) and **Novikov Telegram** (1946).
- **Truman Doctrine (1947)**: USA would support free peoples resisting communism (**containment**).
- **Marshall Plan (1947)**: $13 billion aid to rebuild Europe - Stalin called it "dollar imperialism" and set up **Cominform** (1947) and **Comecon** (1949).
- **Berlin Blockade (1948-49)**: Stalin cut off land routes to West Berlin after the new currency (Deutschmark) → **Berlin Airlift**; Stalin backed down.
- **NATO (1949)**; Germany split into FRG and GDR (1949). **Warsaw Pact (1955)**.
- **Arms race**: USSR atomic bomb (1949); H-bombs.

## Hungarian Uprising (1956)
After Stalin's death, **Khrushchev**'s "destalinisation" raised hopes. **Imre Nagy** promised reforms and to leave the **Warsaw Pact** → Soviet tanks crushed the uprising (thousands killed, Nagy executed). The West condemned it but didn't intervene.
`,
      keyPoints: ['Capitalism vs communism', 'Yalta: 4 zones, free elections; Potsdam: tension, atomic bomb', 'Iron Curtain; Long and Novikov Telegrams', 'Truman Doctrine (containment) and Marshall Plan 1947', 'Berlin Blockade and Airlift 1948-49', 'NATO 1949; Warsaw Pact 1955', 'Hungary 1956 crushed by Soviet tanks'],
      timeline: [
        { date: '1943', event: 'Tehran Conference' },
        { date: 'Feb 1945', event: 'Yalta Conference' },
        { date: 'Jul 1945', event: 'Potsdam Conference' },
        { date: '1946', event: 'The Long Telegram' },
        { date: 'Mar 1947', event: 'The Truman Doctrine' },
        { date: 'Jun 1947', event: 'The Marshall Plan is announced' },
        { date: '1948', event: 'The Berlin Blockade begins' },
        { date: '1949', event: 'NATO is formed' },
        { date: '1955', event: 'The Warsaw Pact is formed' },
        { date: '1956', event: 'The Hungarian Uprising is crushed' },
      ],
      flashcards: cards([['What was the Truman Doctrine?', 'US policy (1947) of supporting countries resisting communism - containment.'], ['What was the Marshall Plan?', 'US economic aid (about $13 billion) to rebuild Europe and stop communism spreading.'], ['What was Comecon?', 'The Soviet response to the Marshall Plan (1949) - economic aid for communist countries.'], ['Why did Stalin blockade Berlin in 1948?', 'To force the West out of Berlin after the introduction of a new currency in the Western zones.'], ['What happened in Hungary in 1956?', 'Nagy\'s reforms and plan to leave the Warsaw Pact led to a Soviet invasion that crushed the uprising.']]),
      questions: [
        ord('Put these events in order.', ['Yalta Conference', 'Truman Doctrine', 'Berlin Blockade', 'Formation of NATO'], '1945 → 1947 → 1948 → 1949.', { d: 2 }),
        mc('How did Stalin respond to the Marshall Plan?', ['Set up Cominform and Comecon and banned satellite states from accepting it', 'Accepted the aid for the USSR but not for Eastern Europe', 'Joined NATO to share in the American funding', 'Built the Berlin Wall to stop people reaching the aid'], '"Dollar imperialism".', { d: 2 }),
        tf('NATO intervened militarily to support the Hungarian Uprising in 1956.', false, 'The West condemned it but didn\'t intervene.', { d: 2 }),
      ],
      examQuestions: [examQ('Explain **two** consequences of the Berlin Blockade (1948-49).', 8, ['Consequence 1 explained (e.g. formation of NATO in 1949)', 'Developed with accurate knowledge and analysis', 'Consequence 2 explained (e.g. Germany formally divided into FRG and GDR)', 'Developed with accurate knowledge and analysis'], { meta: 'Edexcel Paper 2 period study Q1', time: 10 })],
    }),
    topic({
      id: `${p}-cw-crises`, title: 'Cold War crises 1958-70', summary: 'Berlin 1958-61 and the Wall, the Cuban Missile Crisis, and the Prague Spring.',
      notes: `
## Berlin 1958-61
Refugee crisis: ~3 million East Germans fled via Berlin (a "brain drain"). **Khrushchev's Berlin ultimatum (1958)**; summits failed (Paris 1960 collapsed after the **U2 incident**; Vienna 1961). **Berlin Wall built August 1961**. **Kennedy's "Ich bin ein Berliner" speech (1963)**.

## Cuban Missile Crisis (1962)
- **Castro**'s revolution (1959); USA's failed **Bay of Pigs** invasion (1961) pushed Cuba towards the USSR.
- USSR placed **nuclear missiles on Cuba**; US U2 spy planes photographed them (October 1962).
- **13 days**: Kennedy ordered a **naval blockade** ("quarantine"); letters from Khrushchev; secret deal: Soviet missiles removed from Cuba, **US missiles removed from Turkey** (secretly).
- Consequences: **hotline** (1963), **Limited Test Ban Treaty** (1963), Outer Space Treaty (1967), **Nuclear Non-Proliferation Treaty** (1968).

## Prague Spring (1968)
**Dubček** introduced reforms ("socialism with a human face": less censorship, more freedom) in Czechoslovakia. The **Warsaw Pact invaded (August 1968)**; Dubček removed. **Brezhnev Doctrine**: the USSR would intervene if communism was threatened in any satellite state. The USA condemned it but did not act (busy in Vietnam).
`,
      keyPoints: ['Refugee crisis → Berlin Wall August 1961', 'Bay of Pigs 1961 pushed Cuba towards the USSR', 'Cuban Missile Crisis Oct 1962: blockade; deal including Turkey', 'Hotline and Test Ban Treaty 1963', 'Prague Spring 1968 crushed; Brezhnev Doctrine'],
      timeline: [
        { date: '1958', event: 'Khrushchev\'s Berlin ultimatum' },
        { date: '1959', event: 'Castro takes power in Cuba' },
        { date: '1960', event: 'The U2 incident wrecks the Paris summit' },
        { date: '1961', event: 'The Bay of Pigs invasion fails' },
        { date: 'Aug 1961', event: 'The Berlin Wall is built' },
        { date: 'Oct 1962', event: 'The Cuban Missile Crisis' },
        { date: '1963', event: 'The hotline and Limited Test Ban Treaty' },
        { date: '1968', event: 'The Prague Spring is crushed by the Warsaw Pact' },
      ],
      flashcards: cards([['Why was the Berlin Wall built?', 'To stop East Germans fleeing to the West through Berlin.'], ['How did Kennedy respond to the missiles on Cuba?', 'A naval blockade (quarantine) around Cuba.'], ['What was secretly agreed to end the Cuban Missile Crisis?', 'The USA would remove its Jupiter missiles from Turkey.'], ['What was the Brezhnev Doctrine?', 'The USSR would intervene in any satellite state where communism was under threat.'], ['Who led the Prague Spring?', 'Alexander Dubček.']]),
      questions: [
        mc('What was the main reason for building the Berlin Wall in 1961?', ['To stop the flow of refugees from East to West', 'To protect West Berlin from attack', 'Because the Allies demanded it', 'To end the Cold War'], 'The refugee "brain drain".', { d: 1 }),
        multi('Which were consequences of the Cuban Missile Crisis?', ['A telephone hotline between Washington and Moscow', 'The Limited Test Ban Treaty', 'Removal of US missiles from Turkey'], ['The Berlin Blockade', 'The formation of NATO'], 'Moves towards reducing tension.', { d: 2 }),
        match('Match the leader to the crisis.', [['Dubček', 'Prague Spring'], ['Castro', 'Cuban Revolution'], ['Nagy', 'Hungarian Uprising'], ['Kennedy', 'Cuban Missile Crisis']], 'Key individuals.', { d: 1 }),
      ],
      examQuestions: [examQ('Write a narrative account analysing the key events of the Cuban Missile Crisis in 1962. You may use: U2 spy planes; the naval blockade. You must also use information of your own.', 8, ['Level 3 (6-8): analytical narrative showing how events led to one another', 'Organised sequence (missiles discovered → blockade → letters → deal)', 'Accurate, relevant knowledge beyond the stimulus points', 'Clear focus on the crisis and its resolution'], { meta: 'Edexcel Paper 2 period study Q2', time: 10 })],
    }),
    topic({
      id: `${p}-cw-end`, title: 'The end of the Cold War 1970-91', summary: 'Détente, Afghanistan, the "Second Cold War", Reagan and Gorbachev, and the collapse of the Soviet Union.',
      notes: `
## Détente (1970s)
Relaxation of tensions: **SALT 1 (1972)** limited missiles; **Helsinki Agreements (1975)** - borders recognised, human rights promises; **Apollo-Soyuz** joint space mission (1975); SALT 2 (1979) signed but not ratified.

## End of détente
**Soviet invasion of Afghanistan (December 1979)** → **Carter Doctrine**, US **boycott of the 1980 Moscow Olympics** (USSR boycotted LA 1984), SALT 2 not ratified.

## The "Second Cold War"
**Reagan** (1981): "**evil empire**", military build-up, **SDI** ("Star Wars" missile defence, 1983) - the USSR couldn't afford to compete.

## Gorbachev and the end
**Gorbachev** (1985): "**new thinking**", **glasnost** (openness) and **perestroika** (restructuring); Sinatra Doctrine (satellite states could choose their own way). Summits with Reagan: Geneva (1985), Reykjavik (1986), **INF Treaty (1987)** eliminated intermediate-range nuclear missiles. Withdrawal from Afghanistan (1988-89).
- **1989**: revolutions in Eastern Europe; **Berlin Wall falls (9 November 1989)**.
- **1990**: Germany reunified. **1991**: Warsaw Pact dissolved; **Soviet Union collapses (December 1991)**.
`,
      keyPoints: ['Détente: SALT 1 1972, Helsinki 1975, Apollo-Soyuz', 'Afghanistan invasion 1979 ended détente', 'Olympic boycotts 1980 and 1984', 'Reagan: "evil empire", SDI', 'Gorbachev: glasnost, perestroika, INF Treaty 1987', 'Berlin Wall falls 1989; USSR collapses 1991'],
      timeline: [
        { date: '1972', event: 'SALT 1 is signed' },
        { date: '1975', event: 'The Helsinki Agreements' },
        { date: '1979', event: 'The Soviet Union invades Afghanistan' },
        { date: '1980', event: 'The USA boycotts the Moscow Olympics' },
        { date: '1983', event: 'Reagan announces SDI ("Star Wars")' },
        { date: '1985', event: 'Gorbachev becomes Soviet leader' },
        { date: '1987', event: 'The INF Treaty is signed' },
        { date: '1989', event: 'The Berlin Wall falls' },
        { date: '1991', event: 'The Soviet Union collapses' },
      ],
      flashcards: cards([['What is détente?', 'The easing of tension between the superpowers in the 1970s.'], ['What ended détente?', 'The Soviet invasion of Afghanistan in December 1979.'], ['What was SDI?', 'Reagan\'s Strategic Defence Initiative ("Star Wars") - a planned space-based missile defence system.'], ['What are glasnost and perestroika?', 'Gorbachev\'s policies of openness and economic restructuring.'], ['What did the INF Treaty (1987) do?', 'Eliminated all intermediate-range nuclear missiles.']]),
      questions: [
        mc('Which event ended the period of détente?', ['The Soviet invasion of Afghanistan', 'The Helsinki Agreements', 'The INF Treaty', 'The building of the Berlin Wall'], 'December 1979.', { d: 1 }),
        tf('Gorbachev used the Brezhnev Doctrine to crush the 1989 revolutions in Eastern Europe.', false, 'He abandoned it (the "Sinatra Doctrine") and let satellite states choose their own path.', { d: 3 }),
      ],
      examQuestions: [examQ('Explain the importance of **two** of the following for the end of the Cold War: Gorbachev\'s "new thinking"; Reagan\'s SDI; the fall of the Berlin Wall.', 16, ['Level 4 (13-16): analytical explanation of importance for BOTH chosen events', 'Shows how each event affected relations / led to the end of the Cold War', 'Accurate, well-selected knowledge', 'Explains connections and consequences'], { meta: 'Edexcel Paper 2 period study Q3', time: 20 })],
    }),
  ];
}

/** Conflict and tension 1918-1939 (AQA wider world depth study) */
export function conflictTopics(p: string): Topic[] {
  return [
    topic({
      id: `${p}-ct-peace`, title: 'Peacemaking 1919', summary: 'The aims of the Big Three, the Treaty of Versailles and reactions to it.',
      notes: `
## The Big Three's aims
| Leader | Aims |
|---|---|
| **Clemenceau** (France) | Revenge and security - weaken Germany ("make Germany pay") |
| **Lloyd George** (Britain) | Punish Germany but not too harshly - keep it as a trading partner; protect the navy and empire |
| **Wilson** (USA) | Fair peace based on his **Fourteen Points**: self-determination, League of Nations, disarmament |

## Treaty of Versailles (June 1919) - "LAMB"
- **L**and: Alsace-Lorraine to France, Polish Corridor, Saar (League control), colonies lost, **Anschluss** with Austria banned.
- **A**rmy: limited to **100,000**, no air force, no tanks, 6 battleships; **Rhineland demilitarised**.
- **M**oney: **reparations £6.6 billion**.
- **B**lame: **Article 231 - war guilt clause**.

## Reactions
Germans called it a **Diktat**; Clemenceau thought it too lenient; Wilson disappointed (US Senate rejected the treaty and the League); Lloyd George had mixed feelings. Other treaties: St Germain, Trianon, Neuilly, Sèvres.
`,
      keyPoints: ['Clemenceau: revenge and security', 'Lloyd George: middle way, trade', 'Wilson: Fourteen Points, self-determination', 'LAMB: land, army, money, blame', 'Army 100,000; reparations £6.6bn; Article 231', 'Germany saw it as a Diktat'],
      timeline: [{ date: 'Jan 1918', event: 'Wilson announces the Fourteen Points' }, { date: 'Nov 1918', event: 'Armistice ends the fighting' }, { date: 'Jun 1919', event: 'Treaty of Versailles signed' }, { date: '1920', event: 'The League of Nations begins work' }],
      flashcards: cards([['What does LAMB stand for?', 'Land, Army, Money (reparations), Blame (war guilt) - terms of the Treaty of Versailles.'], ['What was Article 231?', 'The war guilt clause - Germany accepted blame for the war.'], ['What was Clemenceau\'s main aim?', 'To weaken Germany so it could never attack France again.'], ['What was self-determination?', 'Nations ruling themselves - one of Wilson\'s Fourteen Points.']]),
      questions: [
        mc('Which leader wanted the harshest treaty?', ['Clemenceau', 'Wilson', 'Lloyd George', 'Orlando'], 'France had suffered most.', { d: 1 }),
        mc('What was Germany\'s army limited to?', ['100,000 men', '1 million men', '500,000 men', 'No limit'], 'LAMB - army.', { d: 1 }),
      ],
      examQuestions: [examQ('Write an account of how the Treaty of Versailles caused anger in Germany.', 8, ['Level 4 (7-8): analytical narrative showing how events linked to cause anger', 'Diktat - Germany excluded from negotiations', 'War guilt clause and reparations', 'Loss of land and military restrictions humiliating', 'Links to political instability (e.g. "November Criminals")'], { meta: 'AQA Paper 1B Q3', time: 10 })],
    }),
    topic({
      id: `${p}-ct-league`, title: 'The League of Nations and international peace', summary: 'Structure, successes, weaknesses, Manchuria and Abyssinia.',
      notes: `
## Aims and structure
Aims: prevent war (collective security), disarmament, improve living/working conditions. Bodies: Assembly, Council, Permanent Court of International Justice, Secretariat, agencies (ILO, Health Committee, Refugees Committee).

## Weaknesses
- **USA never joined**; Germany (until 1926) and USSR (until 1934) excluded.
- No army - relied on **sanctions** (moral, economic) and members' goodwill.
- Decisions had to be **unanimous** - slow.
- Britain and France put their own interests first.

## Successes (1920s)
Åland Islands (1921), Upper Silesia (1921), Bulgaria (1925), humanitarian work (refugees, leprosy, slavery). Locarno (1925) and Kellogg-Briand Pact (1928) improved relations.

## Failures (1930s) - the Depression made countries aggressive
- **Manchuria (1931)**: Japan invaded; the **Lytton Report** took a year; Japan left the League (1933).
- **Abyssinia (1935-36)**: Mussolini's Italy invaded; sanctions excluded **oil**, Suez Canal kept open; **Hoare-Laval Pact** (secret plan to give Italy much of Abyssinia) leaked; Italy left (1937). The League was discredited.
`,
      keyPoints: ['Collective security; sanctions; no army', 'USA never joined; unanimity slowed decisions', '1920s successes: Åland, Upper Silesia, Bulgaria', 'Manchuria 1931: Lytton Report too slow', 'Abyssinia 1935: no oil sanctions; Hoare-Laval Pact', 'Depression encouraged aggression'],
      timeline: [{ date: '1920', event: 'The League of Nations begins' }, { date: '1921', event: 'Åland Islands dispute settled' }, { date: '1925', event: 'Bulgaria dispute resolved' }, { date: '1931', event: 'Japan invades Manchuria' }, { date: '1933', event: 'Japan leaves the League' }, { date: '1935', event: 'Italy invades Abyssinia' }],
      flashcards: cards([['What is collective security?', 'Members acting together to stop an aggressor.'], ['Why did the League fail in Abyssinia?', 'Sanctions didn\'t include oil, the Suez Canal stayed open and Britain and France made the secret Hoare-Laval Pact.'], ['What was the Lytton Report?', 'The League\'s investigation into Manchuria - it took a year and Japan ignored it.']]),
      questions: [
        multi('Which were weaknesses of the League?', ['The USA did not join', 'It had no army', 'Decisions had to be unanimous'], ['It had too many soldiers', 'Germany was a founder member'], 'Structural weaknesses.', { d: 1 }),
        tf('The League imposed oil sanctions on Italy during the Abyssinian crisis.', false, 'Oil was excluded - a critical failure.', { d: 2 }),
      ],
      examQuestions: [examQ('"The main reason for the failure of the League of Nations was the absence of the USA." How far do you agree with this statement? Explain your answer.', 16, ['Level 4 (13-16): complex explanation of the stated factor and others; sustained judgement', 'USA absence: no economic or military weight', 'Other factors: structure (unanimity, no army), Depression, self-interest of Britain/France', 'Manchuria and Abyssinia as evidence', 'SPaG (+4)'], { meta: 'AQA Paper 1B Q4', time: 25 })],
    }),
    topic({
      id: `${p}-ct-origins`, title: 'The origins and outbreak of the Second World War', summary: 'Hitler\'s aims, rearmament, Rhineland, Anschluss, Munich, appeasement and the Nazi-Soviet Pact.',
      notes: `
## Hitler's aims
Overturn Versailles, unite German-speaking people (**Grossdeutschland**), gain **Lebensraum** (living space) in the east, destroy communism.

## Steps to war
| Year | Event |
|---|---|
| 1933 | Left the League and the Disarmament Conference |
| 1935 | **Rearmament** and conscription announced; Saar plebiscite returns the Saar; Anglo-German Naval Agreement |
| 1936 | **Remilitarised the Rhineland** - no response from Britain/France |
| 1938 | **Anschluss** with Austria (March) |
| 1938 | **Munich Agreement** (September): Sudetenland given to Germany - Chamberlain's "**peace for our time**" |
| 1939 | Invaded the rest of **Czechoslovakia** (March) → end of appeasement; Britain guaranteed Poland |
| 1939 | **Nazi-Soviet Pact** (August) - non-aggression + secret plan to divide Poland |
| 1939 | Germany invaded **Poland** (1 September); Britain and France declared war (3 September) |

## Appeasement
Giving in to reasonable demands to avoid war. **Reasons**: memories of WW1, Britain not ready for war (rearming), sympathy that Versailles was harsh, fear of communism (Germany as a buffer), economic problems, no support from the USA. **Criticisms**: encouraged Hitler, betrayed Czechoslovakia, gave Germany time to rearm.
`,
      keyPoints: ['Hitler\'s aims: overturn Versailles, Lebensraum, unite Germans', '1936 Rhineland; 1938 Anschluss; Munich (Sudetenland)', 'March 1939 Czechoslovakia ends appeasement', 'Nazi-Soviet Pact August 1939', 'Invasion of Poland 1 September 1939', 'Appeasement: reasons and criticisms'],
      timeline: [{ date: '1935', event: 'Hitler announces rearmament and conscription' }, { date: '1936', event: 'German troops enter the Rhineland' }, { date: 'Mar 1938', event: 'Anschluss with Austria' }, { date: 'Sep 1938', event: 'The Munich Agreement' }, { date: 'Mar 1939', event: 'Germany invades the rest of Czechoslovakia' }, { date: 'Aug 1939', event: 'The Nazi-Soviet Pact' }, { date: 'Sep 1939', event: 'Germany invades Poland' }],
      flashcards: cards([['What was appeasement?', 'The policy of giving in to Hitler\'s demands to avoid war.'], ['What was agreed at Munich (1938)?', 'Germany could take the Sudetenland from Czechoslovakia.'], ['Why was the Nazi-Soviet Pact important?', 'It meant Hitler could invade Poland without fear of war with the USSR.'], ['What is Lebensraum?', '"Living space" - land in the east Hitler wanted for Germans.']]),
      questions: [
        ord('Put these events in order.', ['Remilitarisation of the Rhineland', 'Anschluss', 'Munich Agreement', 'Invasion of Poland'], '1936 → 1938 → 1938 → 1939.', { d: 2 }),
        mc('Which event ended Britain\'s policy of appeasement?', ['Germany\'s invasion of the rest of Czechoslovakia in March 1939', 'The Anschluss with Austria in March 1938', 'The remilitarisation of the Rhineland in 1936', 'The Munich Agreement in September 1938'], 'Hitler broke the Munich promise.', { d: 2 }),
      ],
      examQuestions: [examQ('"The main cause of the Second World War was the policy of appeasement." How far do you agree with this statement? Explain your answer.', 16, ['Level 4 (13-16): complex explanation of appeasement and other factors with sustained judgement', 'Appeasement encouraged Hitler (Rhineland, Munich)', 'Other factors: Hitler\'s aims, Treaty of Versailles, failure of the League, Nazi-Soviet Pact', 'Precise knowledge', 'SPaG (+4)'], { meta: 'AQA Paper 1B Q4', time: 25 })],
    }),
  ];
}

