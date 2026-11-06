import { href } from '../lib/router';
import { WORDLIST_NOTICE } from '../content/wordlist-notice';
import { Icon } from '../components/Icon';
import { InstallCard } from '../components/Install';

export function HelpPage() {
  return (
    <div className="page narrow">
      <p className="eyebrow">Help and support</p>
      <h1>When you're stuck</h1>
      <p className="lead">Being stuck is a normal part of learning, not a sign you can't do it. Here is what to try, from the quickest fix to the biggest.</p>

      <ol className="ladder">
        <li>
          <strong>On a question: press "I'm stuck"</strong>
          <p>Hints one at a time, "remove two wrong answers", a step-by-step guided solution, another explanation, a worked example, common mistakes and the lesson. All without leaving the question. The toolbar above each question has exactly the equipment that question needs. A calculator and working-out pad for calculations, the periodic table for Chemistry about elements and formulae, the formula sheet when one of its formulae is used. In every mode, including the 90-second sprint.</p>
        </li>
        <li>
          <strong>Ask the tutor</strong>
          <p>Every question and exam question has an <em>Ask tutor</em> button. It gives clues without spoiling the answer, explains what the question is asking and its key words, finds answers in your notes, sets you a similar question to try, and checks your writing against the mark scheme. It's free and works offline. Inside Claude it becomes a full AI tutor at no extra cost.</p>
        </li>
        <li>
          <strong>After a wrong answer: "Help me understand this" or "Try a similar, easier one"</strong>
          <p>See why the answer is right, then prove it to yourself on an easier version before going back up.</p>
        </li>
        <li>
          <strong>A whole topic feels lost: run a rescue session</strong>
          <p>About 10 minutes: back to the basics, a worked example revealed one step at a time, three easy questions, then a check-in. <a href={href('/rescue')}>Start a rescue session</a>.</p>
        </li>
        <li>
          <strong>Still stuck: ask a person</strong>
          <p>At the end of a rescue session you can copy a short note for your teacher saying exactly what you're finding hard. Teachers would much rather help now than find out after the exam.</p>
        </li>
      </ol>

      <section className="section card pad">
        <h2>If revision is getting on top of you</h2>
        <ul className="plain">
          <li>Short and regular beats long and stressed: 30 minutes a day is enough to make real progress.</li>
          <li>Stop after a run of wrong answers. A 5-minute break (walk, water, fresh air) helps more than pushing on.</li>
          <li>Sleep is when memories get stored. Late-night cramming undoes daytime revision.</li>
          <li>Talk to someone. A parent or carer, a friend, a teacher, your form tutor or the school's pastoral team.</li>
        </ul>
        <h3>Free, confidential support (UK)</h3>
        <div className="support-grid">
          <div className="support"><strong>Childline</strong><span>Call <span className="mono">0800 1111</span> or chat online at childline.org.uk. Any time, for under-19s.</span></div>
          <div className="support"><strong>Shout</strong><span>Text <span className="mono">SHOUT</span> to <span className="mono">85258</span> - 24/7 text support.</span></div>
          <div className="support"><strong>Young Minds</strong><span>youngminds.org.uk. Advice on exam stress and wellbeing.</span></div>
          <div className="support"><strong>In an emergency</strong><span>Call <span className="mono">999</span>, or <span className="mono">111</span> for urgent medical advice.</span></div>
        </div>
      </section>

      <h2>How the app works</h2>
      <div className="faq">
        <details>
          <summary>What should I do each day?</summary>
          <p>Two buttons, both on today's subject: <strong>Learn</strong> teaches your next topic (a quick check, the lesson in short parts with a question after each, a worked example, practice that adapts to you, then flashcards). Then press <strong>30-minute session</strong> (or whatever daily goal you set). There are no options to choose: the app decides every question and mode for you.</p>
        </details>
        <details>
          <summary>How does the session choose my questions?</summary>
          <ul>
            <li><strong>Fix a mistake</strong>: questions you got wrong come back first, until you have got each one right twice, at least 6 hours apart, without hints.</li>
            <li><strong>Retry</strong>: a question you get wrong comes back again about three questions later in the same session, and a similar question follows a few questions after that.</li>
            <li><strong>Keep it fresh</strong>: questions you got right return on a spaced schedule, and topics you know well get a <em>similar</em> (not identical) question so you remember the idea, not just the answer.</li>
            <li><strong>Target grade</strong>: the topics that would add the most marks towards your target grade (set targets on the Progress page).</li>
            <li><strong>Question type</strong>: the kind of question you find hardest in that subject. For example reading diagrams, typed algebra or plotting graphs. Gets its own practice.</li>
            <li><strong>Weak spot</strong> and <strong>new</strong>: your weakest topics, and parts of the specification you haven't practised yet (at most three new topics a session, each with a quick lesson first).</li>
            <li>It also chooses the mode: a short flashcard burst when cards are due, a quick lesson before a new topic, a reset after two misses in a row, and sometimes <em>explain why</em> after an answer. Saying the reason makes it stick. When you are struggling it eases off new material.</li>
            <li>The "AI" here is the app's own adaptive engine. It runs on your device, is free and works offline. It doesn't send your work anywhere.</li>
            <li>The summary at the end shows what you got right and wrong, which mistakes are cleared, and what to revise next.</li>
          </ul>
        </details>
        <details>
          <summary>How does the app change as the exams get closer?</summary>
          <ul>
            <li><strong>Learning the course</strong> (most of the year): Learn teaches one new topic a day, and your session keeps everything you have learned fresh. The Progress page shows your course pace and when you'll finish at that pace. Aim for about four months before the exams.</li>
            <li><strong>Consolidate</strong> (about four months to go, or once the course is covered): fewer new topics per session, Learn re-teaches weak ones, and you should do the exam question of the day and a timed mock paper every two to three weeks.</li>
            <li><strong>Exam season</strong> (six weeks before the first paper): each day follows your next exams instead of the weekly timetable, Learn re-teaches the topic worth the most marks, and sessions focus on mistakes, weak spots and exam-style questions.</li>
            <li><strong>The night before a paper</strong>: a short session on that subject only, then sleep. <strong>Exam day</strong>: a light look at key facts. And good luck.</li>
            <li>Exam dates are estimates until the boards publish the real timetable. Enter your school's dates in <a href={href('/setup', { tab: 'exams' })}>Settings → My exam timetable</a> and everything follows them.</li>
          </ul>
        </details>
        <details>
          <summary>Will I run out of questions?</summary>
          <ul>
            <li>No. Besides about 2,800 written questions, nearly 850 kinds of question generator make fresh questions every time: new numbers for calculations, diagrams and graphs; about 920 extra key terms, examples and processes across the sciences, Creative iMedia, Business and English; and questions built from every lesson's own notes and tables.</li>
            <li>For writing practice, almost 2,000 exam-style prompts with mark schemes. Essays on every character and theme, History explain and "how far" questions, Business evaluate questions, English Language writing tasks and science 6-markers. There's an <strong>exam question of the day</strong> on the Today page.</li>
            <li>Some repetition is deliberate: a question you get wrong comes back until you've got it right twice, and spaced reviews return just before you'd forget.</li>
          </ul>
        </details>
        <details>
          <summary>How is my grade predicted?</summary>
          <ul>
            <li>The prediction answers "if you sat the exam today": it combines how well you know every topic on the course (topics you haven't started count low) with any marked mock papers, which count most.</li>
            <li>It uses approximate grade boundaries from recent years for that kind of paper – Higher or Foundation, and Level 1/Level 2 grades for Creative iMedia and BTEC Enterprise. Real boundaries change every year, so treat it as a guide.</li>
            <li>It shows a range that narrows as you answer more and take more mocks, and appears after about 20 answers in a subject.</li>
            <li>Set a <strong>target grade</strong> on the Progress page to see how far you have to go and <em>where the marks are</em>. The topics worth the most. Learn and your sessions then lean towards them.</li>
            <li>Your prediction is saved each day, so the Progress page shows the trend and. After a week or two. Where it leads by your first paper if the trend continues, plus a weekly review with what to focus on next.</li>
          </ul>
        </details>
        <details>
          <summary>How do I type maths answers and draw graphs?</summary>
          <ul>
            <li>Typed algebra is marked by checking your expression is equal to the answer, so <em>6x² + 15x</em> and <em>15x + 6x²</em> both count. Unless the question asks for a form, such as "factorise fully" or "simplest surd form". Then an equal answer in the wrong form is shown as "not yet" with the reason (and earns a method mark in mocks).</li>
            <li>Type powers as x^2 or with the ² key, and use brackets for multiplying. On phones the maths keyboard has x, y, n, a, ², ³, √, π and brackets.</li>
            <li>Plotting questions: tap the grid to plot a point and tap it again to remove it, or type coordinates such as (2, 3) (−1, 4).</li>
            <li>Diagrams are drawn from the question's own numbers, but. As in the exam. Are not drawn accurately, so work it out rather than measure.</li>
          </ul>
        </details>
        <details>
          <summary>How do the mock exams work?</summary>
          <ul>
            <li>Every paper you sit has <strong>three practice tests</strong>. Each is the real length, worth the real number of marks and in the board's format, with your chosen texts and options.</li>
            <li>You only get the equipment allowed in the real exam. For example, no calculator on a non-calculator paper, a periodic table for Chemistry, the equations sheet for Physics, and no hints or tutor until you submit.</li>
            <li>The timer keeps running while the test is open. Use <em>Save &amp; exit</em> to stop and resume later with the time you had left. When time runs out, the paper is submitted for you.</li>
            <li>Multiple-choice, number and matching answers are marked instantly, with partial credit where the board gives it. For written answers, choose the level or tick the points in the mark scheme. Inside Claude, <em>Mark with AI</em> can mark them for you.</li>
            <li>The review highlights lost marks, explains the correct answer, shows model answers and the mark scheme, gives advice on what to do next, and offers the tutor for any question. Every answer feeds into your Fix-it list and revision priorities.</li>
            <li>You can look back at old attempts and retry the same test at any time.</li>
          </ul>
        </details>
        <details>
          <summary>Why is there one subject each day?</summary>
          <ul>
            <li>Your weekly timetable gives each day one subject. For example Monday is History and Thursday is Maths. Spending a whole session on one subject lets you go deeper and remember more than doing a few minutes of everything.</li>
            <li>English (Language and Literature) and Science (Biology, Chemistry and Physics) each count as one subject, so there's one for every day of the week.</li>
            <li>You can change any day in <a href={href('/setup', { tab: 'week' })}>Settings → My week</a>. Each subject's page also has its own Learn and session buttons, for an extra subject whenever you want.</li>
            <li>Finished your daily minutes? Keep going as long as you like – <em>Keep going: 10 more minutes</em> appears on the home page and when a timed session ends, and everything you do still counts.</li>
          </ul>
        </details>
        <details>
          <summary>How does it adapt to me?</summary>
          <ul>
            <li>Each topic has an ability score that rises and falls with your answers (harder questions count for more).</li>
            <li>Questions are chosen so you have about a 70% chance of success. Hard enough to stretch you, easy enough to keep going.</li>
            <li>Two wrong in a row on a topic: the app pauses to re-teach the key idea, then eases the difficulty.</li>
            <li>Three right in a row: it steps up the challenge.</li>
            <li>Each question and flashcard has its own review schedule (spaced repetition), and mastery slowly fades if you leave a topic alone.</li>
            <li>Questions you saw recently are held back. Almost every topic can also make brand-new questions (fresh numbers, other elements, other quotations, other events), so you get far fewer repeats.</li>
            <li>Every wrong option is one that could be right if you didn't know: the closest mix-ups from the same topic, other characters from the same text, the slips students really make. They look like the right answer too (the same kind of thing, the same length, the same capitals), so you can't work it out by elimination. When a question has no convincing wrong options, you type the answer instead.</li>
            <li>Typed answers forgive small typos, except when the question is testing your spelling.</li>
            <li>On phones and tablets, answers are typed on the app's own keyboard, so your phone's autocorrect and word suggestions can't fill in a spelling for you. Nothing is underlined while you write; spelling mistakes are pointed out after you answer, with the correct spelling. You can switch to your device's keyboard in Settings.</li>
          </ul>
        </details>
        <details>
          <summary>How do I know I've covered everything for the exam?</summary>
          <p>Each subject has a <strong>Spec checklist</strong> tab listing every point on the exam board's specification for your options, linked to the lessons that teach it and coloured by how secure you are. The home page suggests points you haven't started yet, and Progress shows coverage for every subject.</p>
        </details>
        <details>
          <summary>How are long exam answers marked?</summary>
          <p>After you write an answer, compare it with the mark scheme and model answer and tick what you included. Press <em>Check key words</em> to see which mark-scheme points your answer seems to cover. When you use the app inside Claude, <em>Mark it with AI</em> marks it against the same mark scheme and suggests improvements, using your Claude plan at no extra cost. You can change any tick before saving.</p>
        </details>
        <details>
          <summary>What is the Fix-it list?</summary>
          <p>Every question you get wrong goes on your <a href="#/fix">Fix-it list</a> and keeps coming back until you have got it right <strong>twice without help, at least 6 hours apart</strong>. Getting it right once straight after a mistake isn't enough to remember it. A new version of a generated question also counts.</p>
        </details>
        <details>
          <summary>How do exam questions work?</summary>
          <p>Write your answer (with a timer if you like), then mark it yourself against the mark scheme and model answer. Then improve your weakest paragraph. That teaches more than writing a new answer.</p>
        </details>
        <details>
          <summary>Where is my data stored?</summary>
          <p>Privately on this device. No account needed. Use <a href="#/setup">Settings</a> to back up your progress or move it to another device.</p>
        </details>
        <details>
          <summary>Can it predict what will come up?</summary>
          <p>No one can be sure. Exam boards never reveal it, and any topic on the specification can be examined. The mock exams follow the real paper structures and lean towards topics, characters and themes that haven't been asked for a while (based on past papers), but they cover the whole specification so you are ready for anything.</p>
        </details>
      </div>

      <h2><Icon name="download" size={20} /> Install the app</h2>
      <InstallCard always />

      <details className="credits small">
        <summary>Credits</summary>
        <p>Spelling feedback uses the SCOWL word lists (British English) by Kevin Atkinson, alongside the app's own lesson vocabulary.</p>
        <pre className="notice">{WORDLIST_NOTICE}</pre>
      </details>
    </div>
  );
}
