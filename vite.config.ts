/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { VitePWA } from 'vite-plugin-pwa';

// `npm run build` -> installable, offline-capable web app for GitHub Pages (relative base so it works in a sub-folder)
// `npm run build:single` -> one self-contained HTML file (dist-single/index.html) you can open or share
const pwa = VitePWA({
  injectRegister: null, // registered in src/lib/pwa.ts
  registerType: 'autoUpdate',
  includeAssets: ['icons/*.png', 'icons/*.svg', 'sw-reminders.js'],
  manifest: {
    id: './',
    name: 'GCSE Revision Hub',
    short_name: 'GCSE Revision',
    description: 'Adaptive GCSE revision for English, Maths, Triple Science, Creative iMedia, Business, History and Statistics.',
    lang: 'en-GB',
    start_url: './',
    scope: './',
    display: 'standalone',
    orientation: 'any',
    background_color: '#0F1420',
    theme_color: '#0F1420',
    categories: ['education'],
    icons: [
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,woff2,png,svg}'],
    maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
    navigateFallback: 'index.html',
    cleanupOutdatedCaches: true,
    importScripts: ['sw-reminders.js'],
  },
});

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: mode === 'single' ? [react(), viteSingleFile()] : [react(), pwa],
  build: {
    outDir: mode === 'single' ? 'dist-single' : 'dist',
    chunkSizeWarningLimit: 4000,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
}));
