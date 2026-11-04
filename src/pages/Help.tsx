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
          <p>Hints one at a time, "remove two wrong answers", a step-by-step guided solution, another explanation, a worked example, common mistakes and the lesson – all without leaving the question. The calculator, periodic table, formula sheet and a working-out pad are in the toolbar above every question.</p>
        </li>
        <li>
          <strong>Ask the tutor</strong>
          <p>Every question and exam question has an <em>Ask tutor</em> button. It gives clues without spoiling the answer, explains what the question is asking, helps you analyse a quote or source, and gives feedback on your writing. After you answer, it explains exactly where your thinking went wrong.</p>
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
          <p>Follow <strong>Today's plan</strong> on the home page: flashcards (5 min), smart practice (15 min), then fix your mistakes (10 min). It adjusts to the daily goal you set in Settings.</p>
        </details>
        <details>
          <summary>How does it adapt to me?</summary>
          <ul>
            <li>Each topic has an ability score that rises and falls with your answers (harder questions count for more).</li>
            <li>Questions are chosen so you have about a 70% chance of success – hard enough to stretch you, easy enough to keep going.</li>
            <li>Two wrong in a row on a topic: the app pauses to re-teach the key idea, then eases the difficulty.</li>
            <li>Three right in a row: it steps up the challenge.</li>
            <li>Each question and flashcard has its own review schedule (spaced repetition), and mastery slowly fades if you leave a topic alone.</li>
          </ul>
        </details>
        <details>
          <summary>How do I know I've covered everything for the exam?</summary>
          <p>Each subject has a <strong>Spec checklist</strong> tab listing every point on the exam board's specification for your options, linked to the lessons that teach it and coloured by how secure you are. The home page suggests points you haven't started yet, and Progress shows coverage for every subject.</p>
        </details>
        <details>
          <summary>How are long exam answers marked?</summary>
          <p>After you write an answer, compare it with the mark scheme and model answer and tick what you included. With the AI tutor available, press <em>Mark it with AI</em>: Claude marks it against the same mark scheme, ticks the points you made and suggests improvements. You can change any tick before saving.</p>
        </details>
        <details>
          <summary>What is the Fix-it list?</summary>
          <p>Every question you get wrong goes on your <a href="#/fix">Fix-it list</a> and keeps coming back until you get it right without help.</p>
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
          <p>No one can – exam boards never reveal it, and any topic on the specification can be examined. The app shows what has appeared in past papers so you can be ready for everything.</p>
        </details>
      </div>

      <h2><Icon name="download" size={20} /> Install the app</h2>
      <InstallCard always />
    </div>
  );
}
