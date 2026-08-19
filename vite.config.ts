import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'pH-Chem — Hóa học chuyên nghiệp',
        short_name: 'pH-Chem',
        description:
          'Bộ công cụ hóa học: bảng tuần hoàn, máy tính, độ tan, công thức, từ điển. Chạy offline, không quảng cáo.',
        theme_color: '#0f141b',
        background_color: '#0a0e14',
        display: 'standalone',
        orientation: 'any',
        lang: 'vi',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
});
