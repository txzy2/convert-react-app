import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA, VitePWAOptions} from 'vite-plugin-pwa';

// NOTE: If u need todo web-app
const vitePWA: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',

  outDir: 'dist',
  workbox: {
    clientsClaim: true,
    skipWaiting: true,
  },

  manifest: {
    start_url: '/',
    name: 'title',
    short_name: 'title',
    description: 'description',
    theme_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 3000,
  },
  plugins: [react(), VitePWA(vitePWA)],
});
