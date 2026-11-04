export function HelpPage() {
  return (
    <div className="page narrow">
      <h1>How to use GCSE Revision Hub</h1>
      <h3>1. Set it up</h3>
      <p>In <a href="#/setup">Settings</a>, choose your exam year, subjects, tiers and your school's set texts/options. You'll only see content for your exams.</p>
      <h3>2. Learn a topic</h3>
      <p>Open a subject → Topics → a topic. Read the lesson, then press <strong>"quiz me"</strong> straight away. Try the worked examples and flashcards.</p>
      <h3>3. Practise every day</h3>
      <p>The <strong>Smart revision session</strong> on the home page picks the best questions for you: reviews that are due, weak topics and some new material.</p>
      <h3>4. Use "I'm stuck"</h3>
      <p>Every question has an <strong>I'm stuck</strong> button: hints one at a time, another explanation, a worked example, key points, common mistakes and the full lesson - without leaving the question.</p>
      <h3>5. Fix your mistakes</h3>
      <p>Wrong answers go on your <a href="#/fix">Fix-it list</a> and come back until you get them right without help.</p>
      <h3>6. Do exam questions</h3>
      <p>Each subject has exam-style questions with mark schemes and model answers. Write your answer, then mark it honestly.</p>
      <h3>How the adapting works</h3>
      <ul>
        <li>Each topic has an ability score that rises and falls with your answers (harder questions count for more).</li>
        <li>Questions are chosen so you have about a 70% chance of success - the sweet spot for learning.</li>
        <li>Two wrong in a row on a topic → the app pauses to re-teach the key idea, then eases the difficulty.</li>
        <li>Three right in a row → it steps up the challenge.</li>
        <li>Each question and flashcard has its own review schedule (spaced repetition).</li>
        <li>Mastery slowly decays if you leave a topic alone, so it reminds you to come back.</li>
      </ul>
      <h3>Your data</h3>
      <p>Everything is stored privately on this device - no account needed. Use Settings → Export backup to move to another device.</p>
      <h3>A note on "predictions"</h3>
      <p>Exam boards never reveal what will come up, and any topic on the specification can be examined. This app shows what has appeared in past papers so you can make sure you're prepared for <em>everything</em> - never revise by guessing.</p>
    </div>
  );
}
