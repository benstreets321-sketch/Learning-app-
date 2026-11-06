import { Suspense, useEffect } from 'react';
import { lazyNamed, preloadAll } from './lib/lazy';
import { useRoute, href, go } from './lib/router';
import { useProfile, useProgress } from './lib/store';
import { Home } from './pages/Home';
import { SubjectPage } from './pages/Subject';
import { TopicPage } from './pages/Topic';
import { QuizPage } from './pages/Quiz';
import { LearnButton, StartSession } from './components/StartSession';
import { Icon } from './components/Icon';
import { ToolDrawer, resetTools, useTools } from './components/Tools';
import { AppKeyboard } from './components/AppKeyboard';
import { InstallButton } from './components/Install';
import { SubjectMark } from './components/SubjectMark';
import { SaveStatus, SaveWarning } from './components/SaveStatus';
import { activeSubjects } from './content/registry';
import { schedule as scheduleReminder, syncReminderState } from './lib/reminders';

// Pages that aren't needed for the first screen load on demand (and are prefetched once the app is idle),
// so the app opens faster without any page feeling slower.
const loaders = {
  setup: () => import('./pages/Setup'), cards: () => import('./pages/Flashcards'), exam: () => import('./pages/Exam'),
  fix: () => import('./pages/Mistakes'), progress: () => import('./pages/Progress'), plan: () => import('./pages/Planner'),
  how: () => import('./pages/Strategies'), tools: () => import('./pages/Tools'), help: () => import('./pages/Help'),
  rescue: () => import('./pages/Rescue'), session: () => import('./pages/Session'), mocks: () => import('./pages/Mocks'),
  sprint: () => import('./pages/Sprint'), search: () => import('./pages/Search'), learn: () => import('./pages/Learn'), vocab: () => import('./pages/Vocab'),
};
const Setup = lazyNamed(loaders.setup, (m) => m.Setup);
const FlashcardsPage = lazyNamed(loaders.cards, (m) => m.FlashcardsPage);
const ExamPage = lazyNamed(loaders.exam, (m) => m.ExamPage);
const MistakesPage = lazyNamed(loaders.fix, (m) => m.MistakesPage);
const ProgressPage = lazyNamed(loaders.progress, (m) => m.ProgressPage);
const PlannerPage = lazyNamed(loaders.plan, (m) => m.PlannerPage);
const StrategiesPage = lazyNamed(loaders.how, (m) => m.StrategiesPage);
const ToolsPage = lazyNamed(loaders.tools, (m) => m.ToolsPage);
const HelpPage = lazyNamed(loaders.help, (m) => m.HelpPage);
const RescuePage = lazyNamed(loaders.rescue, (m) => m.RescuePage);
const SessionPage = lazyNamed(loaders.session, (m) => m.SessionPage);
const MocksPage = lazyNamed(loaders.mocks, (m) => m.MocksPage);
const MockPaperPage = lazyNamed(loaders.mocks, (m) => m.MockPaperPage);
const MockTakePage = lazyNamed(loaders.mocks, (m) => m.MockTakePage);
const MockReviewPage = lazyNamed(loaders.mocks, (m) => m.MockReviewPage);
const SprintPage = lazyNamed(loaders.sprint, (m) => m.SprintPage);
const SearchPage = lazyNamed(loaders.search, (m) => m.SearchPage);
const LearnPage = lazyNamed(loaders.learn, (m) => m.LearnPage);
const VocabPage = lazyNamed(loaders.vocab, (m) => m.VocabPage);
let prefetched = false;
function prefetchPages() {
  if (prefetched) return;
  prefetched = true;
  const run = () => void preloadAll();
  const w = window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => void };
  // shortly after the first screen is up, when the browser is idle (at most ~1.2 s later)
  setTimeout(() => (w.requestIdleCallback ? w.requestIdleCallback(run, { timeout: 800 }) : run()), 400);
}
/** Shown for the moment a page's code is still arriving */
function PageLoading() {
  return <div className="page page-loading" aria-busy="true" aria-label="Loading"><div className="sk sk-title" /><div className="sk" /><div className="sk" /><div className="sk sk-short" /></div>;
}

const NAV = [
  { path: '/', label: 'Today', icon: 'home' },
  { path: '/fix', label: 'Fix-it', icon: 'fix' },
  { path: '/mocks', label: 'Mock exams', icon: 'formula' },
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
    // dark (the desk lamp) is the default; daylight is chosen in Settings or follows a light device
    if (profile.theme === 'light' || profile.theme === 'device') root.setAttribute('data-theme', profile.theme);
    else root.removeAttribute('data-theme');
    const light = profile.theme === 'light' || (profile.theme === 'device' && window.matchMedia?.('(prefers-color-scheme: light)').matches);
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', light ? '#F6F3EC' : '#0F1420'));
  }, [profile.theme]);

  useEffect(() => { window.scrollTo(0, 0); }, [route.raw]);
  useEffect(() => { prefetchPages(); }, []);
  // a new page starts with the drawer closed and no tool restrictions left over from the last question
  const pathKey = route.path.join('/');
  useEffect(() => { resetTools(); }, [pathKey]);

  // "/" jumps to search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) && !el.isContentEditable) { e.preventDefault(); go('/search'); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // reading comfort settings
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.size = profile.textSize ?? 'normal';
    if (profile.readable) root.dataset.readable = '1'; else delete root.dataset.readable;
  }, [profile.textSize, profile.readable]);

  // daily reminder: in-app timer + state for the service worker
  useEffect(() => { scheduleReminder(); }, [profile.reminder?.on, profile.reminder?.time]);
  useEffect(() => {
    const t = setTimeout(() => void syncReminderState(), 1500);
    return () => clearTimeout(t);
  }, [progress, profile.reminder]);

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
      case 'search': page = <SearchPage key={route.raw} query={route.query} />; break;
      case 'sprint': page = <SprintPage key={route.raw} query={route.query} />; break;
      case 'session': page = <SessionPage key={route.raw} query={route.query} />; break;
      case 'learn': page = <LearnPage key={route.raw} query={route.query} />; break;
      case 'vocab': page = <VocabPage />; break;
      case 'mocks': page = second ? <MockPaperPage key={route.raw} paperId={second} /> : <MocksPage />; break;
      case 'mock': page = route.query.get('review') ? <MockReviewPage key={route.raw} testId={second} attemptId={route.query.get('review')!} /> : <MockTakePage key={route.raw} testId={second} attemptId={route.query.get('a') ?? undefined} />; break;
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

  const takingMock = first === 'mock' && !route.query.get('review');
  const inSession = first === 'quiz' || first === 'cards' || first === 'exam' || first === 'sprint' || first === 'session' || first === 'learn' || takingMock || (first === 'rescue' && !!route.query.get('topic'));
  const isActive = (p: string) => (p === '/' ? !first : '/' + (first ?? '') === p || (p === '/mocks' && first === 'mock'));
  const subjects = profile.onboarded ? activeSubjects(profile) : [];

  return (
    <div className={`app ${inSession ? 'in-session' : ''} ${takingMock ? 'taking-mock' : ''} ${profile.onboarded ? '' : 'no-nav'} ${tools.open ? `drawer-open${tools.open === 'table' ? ' drawer-wide' : ''}` : ''}`}>
      <aside className="sidebar" aria-label="Main">
        <a className="brand" href={href('/')}>
          <span className="logo" aria-hidden="true">G</span>
          <span className="brand-text"><small>GCSE 2027/28</small>Revision Hub</span>
        </a>
        <a href={href('/search')} className={`side-search ${first === 'search' ? 'active' : ''}`}>
          <Icon name="search" size={16} /> <span>Search</span> <kbd>/</kbd>
        </a>
        <nav className="side-nav">
          {NAV.map((n) => (
            <a key={n.path} href={href(n.path)} className={`side-link ${isActive(n.path) ? 'active' : ''}`} aria-current={isActive(n.path) ? 'page' : undefined}>
              <Icon name={n.icon} size={18} /> <span>{n.label}</span>
              {n.path === '/fix' && mistakes > 0 && <span className="count mono">{mistakes}</span>}
            </a>
          ))}
          <a href={href('/plan')} className={`side-link ${isActive('/plan') ? 'active' : ''}`}><Icon name="plan" size={18} /> <span>Plan</span></a>
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
          <SaveStatus />
          <InstallButton />
          <a href={href('/setup')} className={`side-link ${isActive('/setup') ? 'active' : ''}`}><Icon name="settings" size={18} /> <span>Settings</span></a>
        </div>
      </aside>

      <header className="topbar">
        <a className="brand" href={href('/')}>
          <span className="logo" aria-hidden="true">G</span>
          <span className="brand-text"><small>GCSE 2027/28</small>Revision Hub</span>
        </a>
        <span className="row top-tools">
          {!inSession && profile.onboarded && <LearnButton compact />}
          {!inSession && profile.onboarded && <StartSession compact />}
          <a href={href('/search')} className="icon-btn" aria-label="Search"><Icon name="search" /></a>
          <a href={href('/setup')} className="icon-btn" aria-label="Settings"><Icon name="settings" /></a>
        </span>
      </header>

      <main className="main">
        {!inSession && profile.onboarded && (
          <div className="top-actions">
            <a className="btn ghost small" href={href('/mocks')}><Icon name="formula" size={16} /> Mock exams</a>
            <LearnButton />
            <StartSession />
          </div>
        )}
        <SaveWarning />
        <Suspense fallback={<PageLoading />}>{page}</Suspense>
      </main>

      <nav className="bottomnav" aria-label="Main mobile">
        {NAV.map((n) => (
          <a key={n.path} href={href(n.path)} className={`bnav ${isActive(n.path) ? 'active' : ''}`} aria-current={isActive(n.path) ? 'page' : undefined}>
            <Icon name={n.icon} size={22} />
            <span>{n.label === 'Mock exams' ? 'Tests' : n.label}</span>
            {n.path === '/fix' && mistakes > 0 && <span className="count mono">{mistakes}</span>}
          </a>
        ))}
      </nav>
      <ToolDrawer />
      <AppKeyboard />
    </div>
  );
}
