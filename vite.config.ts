import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// Tên kho đệm hình dùng chung với mã chạy trong app — xem src/lib/tenKhoHinh.ts.
// Kéo từ đó sang chứ KHÔNG gõ lại chuỗi, để hai bên không bao giờ lệch nhau.
import { TEN_KHO_HINH } from './src/lib/tenKhoHinh.ts';

// https://vite.dev/config/
// Khi build để deploy lên GitHub Pages, app nằm dưới /pHchem/.
// Dev (npm run dev) vẫn chạy ở gốc "/". Firebase sau này cũng ở gốc — chỉ cần
// đổi biến GH_PAGES này hoặc bỏ base là xong.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/pHchem/' : '/',
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
        // HÌNH CẤU TẠO KHÔNG NẠP SẴN. 296 file trong public/hinh/ nặng tổng
        // 1,64 MB — trước đây chúng bị gói chung vào một file .js và nạp sẵn
        // hết lúc cài, chiếm 73% gói cài, dù người dùng có mở xem hình hay
        // không. Nay để runtimeCaching bên dưới lo: xem chất nào thì đệm chất
        // ấy, còn ai cần dùng ngoại tuyến thì bấm nút tải cả bộ trong Cài đặt.
        //
        // Dòng này phải đứng đây vì globPatterns ở trên có bắt cả *.svg.
        globIgnores: ['**/hinh/**'],
        runtimeCaching: [
          {
            // CacheFirst chứ không phải NetworkFirst: hình do build sinh ra,
            // đổi thì đổi cả tên file, nên bản đã đệm KHÔNG bao giờ cũ. Hỏi
            // mạng lại chỉ tổ chậm và tốn dung lượng của người dùng.
            urlPattern: ({ url }: { url: URL }) =>
              url.pathname.includes('/hinh/') && url.pathname.endsWith('.svg'),
            handler: 'CacheFirst',
            options: {
              cacheName: TEN_KHO_HINH,
              // Nới hơn 296 để nút "tải cả bộ" không bị chính luật dọn của
              // Workbox ăn mất mấy hình cuối ngay sau khi tải xong.
              expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
        // Trần mặc định của Workbox là 2 MB; vượt trần thì nó ÂM THẦM bỏ file
        // khỏi kho đệm — build vẫn xanh, test vẫn pass, chỉ người dùng ngoại
        // tuyến mở ra thấy trắng. Nay không còn file nào gần trần nữa, nhưng
        // giữ lại làm chốt: hỏng thì hỏng ở chỗ nhìn thấy được.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
}));
