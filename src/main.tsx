import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
// Atkinson Hyperlegible Next: designed by the Braille Institute for legibility, which suits long revision sessions
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-800.css';
import '@fontsource/dm-mono/latin-400.css';
import '@fontsource/dm-mono/latin-500.css';
import './styles.css';
import { registerSW } from './lib/pwa';
import { startCloudSync } from './lib/cloud';
import { detectAI } from './lib/ai';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

registerSW();
void startCloudSync();
void detectAI();
