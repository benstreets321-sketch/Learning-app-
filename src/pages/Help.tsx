import { href } from '../lib/router';
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
          <p>Hints one at a time, "remove two wrong answers", a step-by-step guided solution, another explanation, a worked example, common mistakes and the lesson – all without leaving the question. The toolbar above each question has exactly the equipment that question needs – a calculator and working-out pad for calculations, the periodic table for Chemistry about elements and formulae, the formula sheet when one of its formulae is used – in every mode, including the 90-second sprint.</p>
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
          <li>Talk to someone – a parent or carer, a friend, a teacher, your form tutor or the school's pastoral team.</li>
        </ul>
        <h3>Free, confidential support (UK)</h3>
        <div className="support-grid">
          <div className="support"><strong>Childline</strong><span>Call <span className="mono">0800 1111</span> or chat online at childline.org.uk – any time, for under-19s.</span></div>
          <div className="support"><strong>Shout</strong><span>Text <span className="mono">SHOUT</span> to <span className="mono">85258</span> - 24/7 text support.</span></div>
          <div className="support"><strong>Young Minds</strong><span>youngminds.org.uk – advice on exam stress and wellbeing.</span></div>
          <div className="support"><strong>In an emergency</strong><span>Call <span className="mono">999</span>, or <span className="mono">111</span> for urgent medical advice.</span></div>
        </div>
      </section>

      <h2>How the app works</h2>
      <div className="faq">
        <details>
          <summary>What should I do each day?</summary>
          <p>Press <strong>Start session</strong> at the top of any screen, choose how long you have, and the app decides what to practise. Or follow <strong>Today's plan</strong> on the home page: flashcards (5 min), smart practice (15 min), then fix your mistakes (10 min). It adjusts to the daily goal you set in Settings.</p>
        </details>
        <details>
          <summary>How does Start session choose my questions?</summary>
          <ul>
            <li><strong>Fix a mistake</strong>: questions you got wrong come back first, until you have got each one right twice, at least 6 hours apart, without hints.</li>
            <li><strong>Retry</strong>: a question you get wrong comes back again about three questions later in the same session, and a similar question follows a few questions after that.</li>
            <li><strong>Keep it fresh</strong>: questions you got right return on a spaced schedule, and topics you know well get a <em>similar</em> (not identical) question so you remember the idea, not just the answer.</li>
            <li><strong>Weak spot</strong> and <strong>new</strong>: your weakest topics, and parts of the specification you haven't practised yet.</li>
            <li>The summary at the end shows what you got right and wrong, which mistakes are cleared, and what to revise next.</li>
          </ul>
        </details>
        <details>
          <summary>How do the mock exams work?</summary>
          <ul>
            <li>Every paper you sit has <strong>three practice tests</strong>. Each is the real length, worth the real number of marks and in the board's format, with your chosen texts and options.</li>
            <li>You only get the equipment allowed in the real exam – for example, no calculator on a non-calculator paper, a periodic table for Chemistry, the equations sheet for Physics, and no hints or tutor until you submit.</li>
            <li>The timer keeps running while the test is open. Use <em>Save &amp; exit</em> to stop and resume later with the time you had left. When time runs out, the paper is submitted for you.</li>
            <li>Multiple-choice, number and matching answers are marked instantly, with partial credit where the board gives it. For written answers, choose the level or tick the points in the mark scheme. Inside Claude, <em>Mark with AI</em> can mark them for you.</li>
            <li>The review highlights lost marks, explains the correct answer, shows model answers and the mark scheme, gives advice on what to do next, and offers the tutor for any question. Every answer feeds into your Fix-it list and revision priorities.</li>
            <li>You can look back at old attempts and retry the same test at any time.</li>
          </ul>
        </details>
        <details>
          <summary>How does it adapt to me?</summary>
          <ul>
            <li>Each topic has an ability score that rises and falls with your answers (harder questions count for more).</li>
            <li>Questions are chosen so you have about a 70% chance of success – hard enough to stretch you, easy enough to keep going.</li>
            <li>Two wrong in a row on a topic: the app pauses to re-teach the key idea, then eases the difficulty.</li>
            <li>Three right in a row: it steps up the challenge.</li>
            <li>Each question and flashcard has its own review schedule (spaced repetition), and mastery slowly fades if you leave a topic alone.</li>
            <li>Questions you saw recently are held back. Almost every topic can also make brand-new questions (fresh numbers, other elements, other quotations, other events), so you get far fewer repeats.</li>
            <li>Wrong options are always the closest mix-ups – other parts of the same topic, other characters from the same text, the slips students really make – and about as long as the right answer, so you can't pass by guessing.</li>
            <li>Typed answers forgive small typos, except when the question is testing your spelling.</li>
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
          <p>Every question you get wrong goes on your <a href="#/fix">Fix-it list</a> and keeps coming back until you have got it right <strong>twice without help, at least 6 hours apart</strong> – getting it right once straight after a mistake isn't enough to remember it. A new version of a generated question also counts.</p>
        </details>
        <details>
          <summary>How do exam questions work?</summary>
          <p>Write your answer (with a timer if you like), then mark it yourself against the mark scheme and model answer. Then improve your weakest paragraph – that teaches more than writing a new answer.</p>
        </details>
        <details>
          <summary>Where is my data stored?</summary>
          <p>Privately on this device – no account needed. Use <a href="#/setup">Settings</a> to back up your progress or move it to another device.</p>
        </details>
        <details>
          <summary>Can it predict what will come up?</summary>
          <p>No one can be sure – exam boards never reveal it, and any topic on the specification can be examined. The mock exams follow the real paper structures and lean towards topics, characters and themes that haven't been asked for a while (based on past papers), but they cover the whole specification so you are ready for anything.</p>
        </details>
      </div>

      <h2><Icon name="download" size={20} /> Install the app</h2>
      <InstallCard always />
    </div>
  );
}
