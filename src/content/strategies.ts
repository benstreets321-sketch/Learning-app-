// Evidence-based learning strategies (cognitive science) that the app is designed around.

export interface GeneralStrategy {
  title: string;
  evidence: string;
  what: string;
  how: string[];
  inApp: string;
}

export const GENERAL_STRATEGIES: GeneralStrategy[] = [
  {
    title: 'Retrieval practice (testing yourself)',
    evidence: 'One of the most robust findings in learning research (e.g. Roediger & Karpicke, 2006; Dunlosky et al., 2013 rated it "high utility"). Pulling information out of memory strengthens it far more than re-reading.',
    what: 'Every time you recall something - by answering a question, using a flashcard or blurting - the memory gets stronger and easier to find next time.',
    how: [
      'Close the book and try to remember before you look.',
      'Use questions, flashcards and blurting rather than highlighting or re-reading.',
      'Struggling to remember is a good sign: effortful recall = stronger memory.',
    ],
    inApp: 'Every lesson ends with "quiz me now". Quizzes, flashcards, blurting and exam questions are all retrieval practice.',
  },
  {
    title: 'Spaced practice',
    evidence: 'The spacing effect is one of the oldest and most replicated results in psychology (Ebbinghaus, 1885; Cepeda et al., 2006). Spreading study out beats cramming the same total time.',
    what: 'Memories fade (the forgetting curve). Reviewing just as you are about to forget resets the curve and makes it flatter each time.',
    how: [
      'Revisit each topic after about 1 day, 1 week and 1 month.',
      'Do a little of several subjects each day rather than one subject all day.',
      'Start early - Year 10 is the perfect time to begin spaced review.',
    ],
    inApp: 'Questions and flashcards are scheduled with a spaced-repetition algorithm. Your plan schedules reviews 1 week and 1 month after you learn a topic.',
  },
  {
    title: 'Interleaving',
    evidence: 'Mixing different types of problems improves the ability to choose the right method (Rohrer & Taylor, 2007), especially in maths and science.',
    what: 'Real exams mix topics. Practising mixed questions trains you to recognise which idea or method each question needs.',
    how: [
      'After learning topics separately, practise them mixed together.',
      'In maths, do a mixed set rather than 20 of the same question type.',
      'It feels harder - that is the point.',
    ],
    inApp: 'Smart sessions and "Mixed review" interleave topics and subjects, and quizzes avoid the same topic twice in a row.',
  },
  {
    title: 'Desirable difficulty and adaptive challenge',
    evidence: 'Learning is best when tasks are challenging but achievable (Bjork, 1994). Success rates around 70-85% are often cited as a sweet spot for practice.',
    what: 'Too easy and you are not learning; too hard and you get stuck and demotivated.',
    how: [
      'Aim for practice you get mostly - but not all - right.',
      'When you are getting everything right, move on to harder or exam-style questions.',
    ],
    inApp: 'The engine estimates your ability on every topic and picks questions you have about a 70% chance of getting right - easier after mistakes, harder after a streak.',
  },
  {
    title: 'Elaboration and self-explanation',
    evidence: 'Explaining why something is true, and how ideas connect, improves understanding (Chi et al., 1994; Dunlosky et al., 2013).',
    what: 'Ask "why?" and "how does this link to...?" until you can explain it in your own words.',
    how: [
      'Explain a topic out loud as if teaching a friend (the "Feynman technique").',
      'Write your own notes in your own words in the "My notes" tab.',
      'Read the explanation after every question - especially the ones you got right by guessing.',
    ],
    inApp: 'Every question has an explanation. "Explain it another way" gives a different angle when you are stuck.',
  },
  {
    title: 'Worked examples, then fading',
    evidence: 'For new problem types, studying worked examples beats solving unaided (Sweller\'s cognitive load theory). Gradually removing steps then builds independence.',
    what: 'See an expert solve it step by step, then try a similar one yourself, then try it with no help.',
    how: [
      'Cover the steps of a worked example and predict each one before revealing it.',
      'Immediately try a "your turn" question.',
    ],
    inApp: 'Worked examples reveal one step at a time, followed by a "Your turn" question. Hints in quizzes reveal solution steps gradually.',
  },
  {
    title: 'Dual coding',
    evidence: 'Combining words with visuals (diagrams, timelines, flow charts) gives two routes to a memory (Paivio; Mayer).',
    what: 'Turn notes into diagrams: timelines for history, flow charts for processes, labelled diagrams for science.',
    how: [
      'Draw it: a cycle, a timeline, a mind map, a labelled sketch.',
      'For English, draw a character arc or theme map with quotes on it.',
    ],
    inApp: 'Timelines, ordering questions and process questions encourage you to build visual sequences.',
  },
  {
    title: 'Metacognition: know what you know',
    evidence: 'Students are often over-confident after re-reading ("illusion of fluency"). Rating confidence and checking it improves calibration (Dunlosky & Rawson, 2012).',
    what: 'Rating how sure you are shows the difference between what you know and what just feels familiar. Confident mistakes are the most valuable to fix (the hypercorrection effect).',
    how: [
      'Before checking an answer, decide how sure you are.',
      'Treat "sure but wrong" answers as top priority.',
    ],
    inApp: 'Every question asks "How sure?". Guesses come back sooner, and confident mistakes go to the top of your Fix-it list.',
  },
  {
    title: 'Focus, sleep and wellbeing',
    evidence: 'Sleep consolidates memory; multitasking (e.g. phone notifications) reduces learning; short breaks restore attention.',
    what: 'Your brain does a lot of its filing while you sleep. Distractions cost more than you think.',
    how: [
      'Phone in another room. Work in focused blocks (e.g. 25 minutes) with short breaks.',
      'Aim for 8-10 hours of sleep, especially before exams. Avoid all-nighters.',
      'Exercise, water and regular meals all help concentration.',
      'If you feel overwhelmed, talk to someone - a teacher, parent or friend. You can also contact Childline on 0800 1111.',
    ],
    inApp: 'Use the focus timer in Toolkit. Your daily goal keeps sessions short and regular.',
  },
];

export const STRATEGY_TIPS: { title: string; text: string }[] = [
  { title: 'Test, don\'t re-read', text: 'Re-reading feels productive but builds little memory. Close your notes and quiz yourself instead.' },
  { title: 'Space it out', text: 'Twenty minutes today and twenty minutes in three days beats forty minutes tonight.' },
  { title: 'Mix it up', text: 'Practise topics mixed together - it trains you to spot which method a question needs.' },
  { title: 'Rate your confidence', text: 'Being sure but wrong is the most valuable mistake you can make - it reveals a misconception to fix.' },
  { title: 'Teach it', text: 'Explain a topic out loud to an imaginary Year 7. Where you hesitate is where to revise.' },
  { title: 'Use the mark scheme', text: 'Examiners reward specific things. After every exam question, mark it strictly against the scheme.' },
  { title: 'Little and often', text: 'Thirty focused minutes most days, phone away, beats a five-hour cram.' },
  { title: 'Fix your mistakes', text: 'Your Fix-it list is a personalised revision guide. Clear it regularly.' },
  { title: 'Sleep on it', text: 'Sleep moves learning into long-term memory. A good night before an exam beats late-night cramming.' },
  { title: 'Blurt it', text: 'Write everything you know about a topic from memory, then check what you missed. The gaps are your to-do list.' },
  { title: 'Start with the hardest', text: 'Do the subject you are avoiding first while your energy is high.' },
  { title: 'Make it exam-shaped', text: 'Once you know a topic, practise it in the exact style of the exam questions - timing included.' },
];
