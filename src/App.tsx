import { useEffect } from 'react';
import { useRoute, href } from './lib/router';
import { useProfile, useProgress } from './lib/store';
import { Home } from './pages/Home';
import { Setup } from './pages/Setup';
import { SubjectPage } from './pages/Subject';
import { TopicPage } from './pages/Topic';
import { QuizPage } from './pages/Quiz';
import { FlashcardsPage } from './pages/Flashcards';
import { ExamPage } from './pages/Exam';
import { MistakesPage } from './pages/Mistakes';
import { ProgressPage } from './pages/Progress';
import { PlannerPage } from './pages/Planner';
import { StrategiesPage } from './pages/Strategies';
import { ToolsPage } from './pages/Tools';
import { HelpPage } from './pages/Help';

const NAV = [
  { path: '/', label: 'Home', icon: '⌂' },
  { path: '/fix', label: 'Fix-it', icon: '✎' },
  { path: '/plan', label: 'Plan', icon: '▦' },
  { path: '/progress', label: 'Progress', icon: '▲' },
  { path: '/how', label: 'Learn how', icon: '✦' },
];

export function App() {
  const route = useRoute();
  const profile = useProfile();
  const progress = useProgress();

  useEffect(() => {
    const root = document.documentElement;
    if (profile.theme === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', profile.theme);
  }, [profile.theme]);

  const [first, second] = route.path;
  const mistakes = Object.keys(progress.mistakes).length;

  let page;
  if (!profile.onboarded && first !== 'setup') page = <Setup firstRun />;
  else {
    switch (first) {
      case undefined: page = <Home />; break;
      case 'setup': page = <Setup firstRun={!profile.onboarded} />; break;
      case 's': page = <SubjectPage id={second} tab={route.query.get('tab') ?? 'overview'} />; break;
      case 't': page = <TopicPage id={second} tab={route.query.get('tab') ?? 'learn'} />; break;
      case 'quiz': page = <QuizPage key={route.raw} query={route.query} />; break;
      case 'cards': page = <FlashcardsPage key={route.raw} query={route.query} />; break;
      case 'exam': page = <ExamPage key={route.raw} query={route.query} />; break;
      case 'fix': page = <MistakesPage />; break;
      case 'progress': page = <ProgressPage />; break;
      case 'plan': page = <PlannerPage />; break;
      case 'how': page = <StrategiesPage />; break;
      case 'tools': page = <ToolsPage key={route.raw} tool={second} query={route.query} />; break;
      case 'help': page = <HelpPage />; break;
      default: page = <Home />;
    }
  }

  const inSession = first === 'quiz' || first === 'cards' || first === 'exam';

  return (
    <div className={`app ${inSession ? 'in-session' : ''}`}>
      <header className="topbar">
        <a className="brand" href="#/">
          <span className="logo" aria-hidden="true">▲</span>
          <span>GCSE Revision Hub</span>
        </a>
        <nav className="topnav" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.path} href={href(n.path)} className={`navlink ${('/' + (first ?? '')) === n.path || (n.path === '/' && !first) ? 'active' : ''}`}>
              {n.label}
              {n.path === '/fix' && mistakes > 0 && <span className="count">{mistakes}</span>}
            </a>
          ))}
          <a href="#/setup" className={`navlink ${first === 'setup' ? 'active' : ''}`} aria-label="Settings">Settings</a>
        </nav>
      </header>
      <main className="main">{page}</main>
      <nav className="bottomnav" aria-label="Main mobile">
        {NAV.map((n) => (
          <a key={n.path} href={href(n.path)} className={`bnav ${('/' + (first ?? '')) === n.path || (n.path === '/' && !first) ? 'active' : ''}`}>
            <span aria-hidden="true">{n.icon}</span>
            <span>{n.label}</span>
            {n.path === '/fix' && mistakes > 0 && <span className="count">{mistakes}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
}
