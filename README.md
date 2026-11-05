# GCSE Revision Hub

An adaptive revision app for students sitting GCSEs in **summer 2027 or 2028**, covering:

| Subject | Mapped to |
|---|---|
| English Language | AQA 8700 |
| English Literature | AQA 8702 (all current set texts, all three poetry clusters, unseen poetry) |
| Maths | Edexcel / AQA / OCR (shared DfE content), Foundation and Higher |
| Biology, Chemistry, Physics (triple science) | AQA 8461 / 8462 / 8463 |
| Creative iMedia ("interactive media") | OCR Cambridge National J834 (R093 exam, R094, R097 and other NEA units) |
| Business / Enterprise | GCSE Business (AQA 8132 / Edexcel 1BS0) and BTEC Tech Award in Enterprise |
| History | Edexcel 1HI0 or AQA 8145 (most popular options) |
| Statistics | Edexcel 1ST0 / AQA 8382 |

It runs entirely in the browser - no account, no server. Progress is saved on the device (with export/import backups).

## What it does

- **Start session**: one button at the top of every screen. Choose a length (10-60 minutes) and optionally subjects, and the app picks what to practise, interleaving *fix a mistake*, *spaced review*, *a similar question to keep it fresh*, *weak spot* and *not yet practised*. Wrong answers come back again three questions later, followed by a similar question, and the summary shows what to revise next.
- **Mock exams for every paper**: three practice tests per paper (105 tests across English Language and Literature, Maths, the three sciences, Creative iMedia, Business, BTEC Enterprise, History and Statistics), each the real length and total, in the board's format, with only the equipment allowed in that exam (no calculator on Maths Paper 1, periodic table for Chemistry, equations sheet for Physics, no tutor until you submit). Timed with resume and auto-submit; auto-marked with exam-board partial credit; written answers marked by level (best fit, middle of the band) or by points; review with explanations, model answers, advice and the tutor; attempt history and retry. Literature extracts are quoted exactly from public-domain editions; all other sources and case studies were written for the app. Question focuses lean towards characters, themes and topics not asked recently.
- **Mistakes stick until they're really fixed**: a mistake leaves the Fix-it list only after two unaided correct answers at least 6 hours apart, and every topic also has its own spaced schedule, so even topics you answer correctly get a similar question again later.
- **Personalised to your exams**: choose your exam year, tiers, exam boards and your school's set texts/options. You only see what can come up in your exams.
- **Lessons** for ~300 topics with must-know checklists, common misconceptions and "explain it another way".
- **Adaptive quizzes**: a per-topic ability estimate (IRT/Elo style) picks questions you have about a 70% chance of getting right. Two misses in a row triggers a quick re-teach and easier questions; three in a row steps up the challenge.
- **Today's 30 minutes**: the home page turns the daily goal into three blocks - flashcards (5 min), smart practice (15 min), fixing mistakes (10 min) - with ticks as each is done. Scales to whatever goal you set.
- **In-question tools**: scientific calculator (degrees, powers, roots, standard form, Ans), the exam data-sheet periodic table (tap an element for protons/neutrons/electrons/shells), the subject's formula/equation sheet and a working-out pad - opened from a toolbar above every question and exam question. Questions that depend on a source text show it above the question.
- **Help when stuck, from the smallest nudge up**: hints one at a time, *remove two wrong answers*, a step-by-step guided solution, another explanation, a worked example, key points, common mistakes and the lesson. After a wrong answer: *Help me understand this* and *Try a similar, easier one*. A run of wrong answers brings a supportive break prompt.
- **Rescue sessions** (about 10 minutes) for a topic that feels lost: back to basics, a worked example revealed step by step, three easy questions, then a check-in with a ready-to-send note for your teacher. The Help page lists free support (Childline, Shout, Young Minds).
- **Eleven question formats**: multiple choice, select-all, true/false, number, typed answer, ordering, matching, gap-fill, **sort into groups**, **tap the words in a passage** and **spot the mistake in a worked solution**. About 1,000 extra recall questions are generated from the flashcards and common-misconception notes, with wrong options chosen to look like the right answer.
- **Built around how memory works**: a 3-question pre-test before a new lesson, a 90-second **sprint** for quick recall, confidence tracking, a weekly review, spacing, interleaving and keyboard shortcuts (1-9 to choose, Enter to check and continue, H for a hint).
- **Daily reminder**: notifications at a chosen time (only if you haven't studied yet that day), background reminders for the installed app on Chrome/Edge/Android, and an "Add to calendar" repeating event that works on iPhone too.
- **Search** across lessons, flashcards, quotations and command words (press `/`), **read aloud** for questions and lessons, and reading settings (larger text, extra spacing).
- **Tutor on every question**, free with no API key. The built-in tutor (works everywhere, offline) gives graded clues, explains what a question asks and its key terms, finds answers to typed questions in the lesson notes and flashcards, sets a similar practice question and marks the reply, and checks written exam answers for mark-scheme key words. When the app is opened inside claude.ai it also becomes a full AI tutor and can mark exam answers against the mark scheme, using the viewer's own Claude plan.
- **Over 260 exam-style questions** with exam-board-style mark schemes (method/accuracy marks in Maths, marking points and levels in the sciences, knowledge/application/analysis/evaluation levels in Business and History).
- **Specification coverage**: every point of each exam board specification is mapped to the lessons that teach it (`src/content/spec.ts`); a test fails if any point has no lesson or practice, or any topic is missing from the map. Each subject has a Spec checklist tab, and the home page suggests points not yet started.
- **Saving**: progress saves within a quarter of a second and immediately when the app is hidden or closed, keeps a second backup copy (and repairs a corrupted save from it), asks the browser for persistent storage, warns if storage is blocked, can be exported/imported (including on the first-run screen), and syncs to the student's Claude account when run inside claude.ai.
- **Confidence ratings**: guesses come back sooner; confident mistakes go to the top of the Fix-it list (hypercorrection effect).
- **Spaced repetition** (SM-2) for every question and flashcard; a **Fix-it list** that keeps mistakes until you get them right unaided.
- **Unlimited practice**: 120+ procedural generators (maths, physics, chemistry, biology, statistics, business finance, iMedia file sizes) with full worked solutions.
- **Exam-style questions** with mark schemes, level descriptors and model answers - write your answer, then self-mark.
- **Past questions**: verified AQA English Literature questions 2017-2025 for every text and poetry cluster (to check readiness - not to "predict").
- **Tools**: quote trainer (progressive deletion), essay planner, blurting with self-check, reference sheets (including exactly what is and isn't on the 2027/2028 formulae and equation sheets), timelines, required practicals, glossary, command words, focus timer.
- **Revision planner** that interleaves subjects, prioritises weak/unstarted topics and schedules reviews after 1 week and 1 month.
- **Learning strategies** explained (retrieval practice, spacing, interleaving, worked examples, dual coding, metacognition, sleep and focus).

## Facts checked for 2027/2028 (November 2026)

See [`docs/RESEARCH_NOTES.md`](docs/RESEARCH_NOTES.md). Highlights:
- Current specifications continue for 2027 and 2028. The Curriculum and Assessment Review changes apply to *future* GCSEs (first teaching 2029/2030).
- Maths formulae sheets and physics equation sheets are provided in 2027 and confirmed by Ofqual (May 2026) for 2028 onwards; from 2028, science questions won't simply ask you to copy an equation from the sheet.
- AQA English Literature: *The History Boys*, *The Curious Incident* and *Never Let Me Go* had their last exam in 2024; *Princess & The Hustler*, *Leave Taking*, *My Name is Leon* and the *Worlds and Lives* cluster were first examined in 2025.
- AQA papers from summer 2027 use a consistent tick-box format for multiple-choice questions and left-aligned sources.

> **On "predictions"**: exam boards never publish what will come up and any part of a specification can be examined. The app shows past questions so students can make sure they're ready for anything.

## Run it

```bash
npm install
npm run dev          # local dev server
npm test             # engine, generator, content, specification, tutor and saving tests
npm run build        # production build in dist/ (for GitHub Pages or any static host)
npm run build:single # one self-contained HTML file in dist-single/index.html
```

### Deploy to GitHub Pages
The workflow in `.github/workflows/deploy.yml` tests, builds and deploys on every push to `main`. In the repository settings, set **Pages → Source** to **GitHub Actions**.

### Install it as an app
`npm run build` produces an installable, offline-capable web app (web manifest, icons and a service worker). Once it is deployed (any HTTPS host, e.g. GitHub Pages):
- **Chrome / Edge on a computer or Android**: an **Install** button appears on the home page (or use the install icon in the address bar / *Install app* in the menu).
- **iPhone / iPad**: open it in Safari, tap **Share → Add to Home Screen**.

It then opens full-screen from the home screen and works without internet. Progress stays on the device.

## Project structure

```
src/
  lib/            engine.ts (spaced repetition + adaptive ability), session.ts (timed Start session), store.ts (localStorage),
                  answer.ts + grade.ts (marking, mock partial credit and level marking), router.ts
  content/
    types.ts      content model
    dsl.ts        compact authoring helpers (mc, num, txt, cloze, ord, match, examQ...)
    generators/   procedural question generators with worked solutions
    subjects/     one folder per subject (units → topics)
    registry.ts   indexes everything; derives quote and timeline drills automatically
    reference.ts  reference sheets
    mocks/        mock exam papers: paper specs, assembler, written papers (English, History, Business) and extra questions
  components/     QuestionCard, StuckPanel, Markdown, UI bits
  pages/          Home, Setup, Subject, Topic, Quiz, Session, Mocks, Flashcards, Exam, Fix-it, Progress, Planner, Strategies, Tools
tests/            engine + generators + content integrity + mock papers (totals, durations, tools, no repeats, marking)
```

### Adding content
Topics are plain TypeScript objects. Multiple-choice options are written **correct answer first** - the app shuffles them. The content test (`npm test`) checks every question is well-formed (valid answers, no duplicate options, generators exist, etc.).

```ts
topic({
  id: 'bio-example', title: 'Example', summary: '...', notes: `## Markdown lesson...`,
  keyPoints: ['...'],
  flashcards: cards([['front', 'back']]),
  questions: [mc('Question?', ['Correct', 'Wrong 1', 'Wrong 2'], 'Why the answer is right', { d: 2, h: ['hint'] })],
  generators: ['p-ke'],
});
```

## Copyright
Practice sources in English Language, the unseen poems, the History sources and interpretations (except those labelled as adapted from the original) and all Business case studies are original texts written for the app. Mock-exam extracts from Shakespeare, Dickens, Stevenson, Byron, Tennyson, Mew and Shelley are public domain. Quotations from set texts are short extracts for study and criticism; modern poems are not reproduced - students should use their printed anthology.
