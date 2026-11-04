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
import { RescuePage } from './pages/Rescue';
import { Icon } from './components/Icon';
import { ToolDrawer, useTools } from './components/Tools';
import { InstallButton } from './components/Install';
import { SubjectMark } from './components/SubjectMark';
import { activeSubjects } from './content/registry';

const NAV = [
  { path: '/', label: 'Today', icon: 'home' },
  { path: '/fix', label: 'Fix-it', icon: 'fix' },
  { path: '/plan', label: 'Plan', icon: 'plan' },
  { path: '/progress', label: 'Progress', icon: 'progress' },
  { path: '/help', label: 'Help', icon: 'life' },
];

export function App() {
  const route = useRoute();
  const profile = useProfile();
  const progress = useProgress();
  const tools = useTools();

  useEffect(() => {
    const root = document.documentElement;
    if (profile.theme === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', profile.theme);
  }, [profile.theme]);

  useEffect(() => { window.scrollTo(0, 0); }, [route.raw]);

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
      case 'rescue': page = <RescuePage key={route.raw} query={route.query} />; break;
      case 'fix': page = <MistakesPage />; break;
      case 'progress': page = <ProgressPage />; break;
      case 'plan': page = <PlannerPage />; break;
      case 'how': page = <StrategiesPage />; break;
      case 'tools': page = <ToolsPage key={route.raw} tool={second} query={route.query} />; break;
      case 'help': page = <HelpPage />; break;
      default: page = <Home />;
    }
  }

  const inSession = first === 'quiz' || first === 'cards' || first === 'exam' || (first === 'rescue' && !!route.query.get('topic'));
  const isActive = (p: string) => (p === '/' ? !first : '/' + (first ?? '') === p);
  const subjects = profile.onboarded ? activeSubjects(profile) : [];

  return (
    <div className={`app ${inSession ? 'in-session' : ''} ${profile.onboarded ? '' : 'no-nav'} ${tools.open ? `drawer-open${tools.open === 'table' ? ' drawer-wide' : ''}` : ''}`}>
      <aside className="sidebar" aria-label="Main">
        <a className="brand" href={href('/')}>
          <span className="logo" aria-hidden="true">G</span>
          <span className="brand-text">GCSE Revision Hub</span>
        </a>
        <nav className="side-nav">
          {NAV.map((n) => (
            <a key={n.path} href={href(n.path)} className={`side-link ${isActive(n.path) ? 'active' : ''}`} aria-current={isActive(n.path) ? 'page' : undefined}>
              <Icon name={n.icon} size={18} /> <span>{n.label}</span>
              {n.path === '/fix' && mistakes > 0 && <span className="count mono">{mistakes}</span>}
            </a>
          ))}
          <a href={href('/how')} className={`side-link ${isActive('/how') ? 'active' : ''}`}><Icon name="learn" size={18} /> <span>How to revise</span></a>
        </nav>
        {subjects.length > 0 && (
          <nav className="side-nav subjects" aria-label="Subjects">
            <span className="side-label">Subjects</span>
            {subjects.map((s) => (
              <a key={s.id} href={href(`/s/${s.id}`)} className={`side-link ${first === 's' && second === s.id ? 'active' : ''}`}>
                <SubjectMark subject={s} size="sm" /> <span>{s.name}</span>
              </a>
            ))}
          </nav>
        )}
        <div className="side-foot">
          <InstallButton />
          <a href={href('/setup')} className={`side-link ${isActive('/setup') ? 'active' : ''}`}><Icon name="settings" size={18} /> <span>Settings</span></a>
        </div>
      </aside>

      <header className="topbar">
        <a className="brand" href={href('/')}>
          <span className="logo" aria-hidden="true">G</span>
          <span className="brand-text">GCSE Revision Hub</span>
        </a>
        <a href={href('/setup')} className="icon-btn" aria-label="Settings"><Icon name="settings" /></a>
      </header>

      <main className="main">{page}</main>

      <nav className="bottomnav" aria-label="Main mobile">
        {NAV.map((n) => (
          <a key={n.path} href={href(n.path)} className={`bnav ${isActive(n.path) ? 'active' : ''}`} aria-current={isActive(n.path) ? 'page' : undefined}>
            <Icon name={n.icon} size={22} />
            <span>{n.label}</span>
            {n.path === '/fix' && mistakes > 0 && <span className="count mono">{mistakes}</span>}
          </a>
        ))}
      </nav>
      <ToolDrawer />
    </div>
  );
}
