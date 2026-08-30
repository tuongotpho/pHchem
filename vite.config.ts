import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// Tên kho đệm hình dùng chung với mã chạy trong app — xem src/lib/tenKhoHinh.ts.
// Kéo từ đó sang chứ KHÔNG gõ lại chuỗi, để hai bên không bao giờ lệch nhau.
import { TEN_KHO_HINH, TEN_KHO_ANH_DE, TEN_KHO_DANH_MUC_DE } from './src/lib/tenKhoHinh.ts';

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
          'Bộ công cụ hóa học: bảng tuần hoàn, máy tính, độ tan, công thức, từ điển. Chạy offline.',
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
        //
        // Thư mục de/ vào đây cùng lý do, và phải vào NGAY TỪ ĐẦU: globPatterns
        // ở trên bắt cả *.png, nên ảnh đề thi rơi thẳng vào gói cài nếu không
        // chặn. Một bộ đề chỉ vài KB nên chẳng ai để ý, nhưng thêm dần 50 bộ
        // thì lại đúng cái cảnh 296 hình cấu tạo chiếm 73% gói cài hồi trước.
        // Chặn từ lúc chưa đau thì không bao giờ phải đi gỡ.
        globIgnores: ['**/hinh/**', '**/de/**'],
        runtimeCaching: [
          {
            // CacheFirst chứ không phải NetworkFirst: tên file hình có kèm
            // MÃ BĂM NỘI DUNG ("H2O.3f2a1b9c.svg"), nên sửa hình là đổi luôn
            // địa chỉ — bản đã đệm KHÔNG bao giờ che mất bản mới. Hỏi lại mạng
            // chỉ tổ chậm và tốn dung lượng của người dùng.
            //
            // ĐIỀU KIỆN để lối này đúng nằm ở scripts/gen-structures.mjs. Bỏ
            // mã băm khỏi tên file mà vẫn để CacheFirst thì hôm nào sửa một
            // hình vẽ sai, người đã xem qua sẽ không bao giờ thấy bản sửa —
            // hóa học sai nằm lại trên máy học sinh, không cách nào gỡ.
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
          {
            // QUYỂN MỤC LỤC của ngân hàng đề. Phải đứng TRƯỚC luật đề thi bên
            // dưới: Workbox lấy luật khớp ĐẦU TIÊN, mà luật kia bắt mọi .json
            // trong de/ nên sẽ nuốt luôn file này nếu đứng trước.
            //
            // NETWORKFIRST chứ không CacheFirst như hai luật kia. Đây là chỗ đã
            // cắn thật ngày 29/08/2026: mã bộ đề đổi, script dọn file .json cũ
            // đi như file mồ côi, nhưng máy nào đã đệm quyển mục lục cũ thì vẫn
            // đi đòi cái mã đã chết — 404, và app báo "Không tải được bộ đề.
            // Kiểm tra mạng rồi thử lại" trong khi mạng chẳng làm sao.
            //
            // Mục lục là thứ TRỎ TỚI file khác, nên đệm nó cứng là tự chuốc lấy
            // cảnh trỏ vào chỗ trống. Nó lại chỉ nặng nửa KB và mỗi phiên đọc
            // một lần, hỏi mạng chẳng tốn gì. Từng bộ đề vẫn để CacheFirst —
            // chúng nặng và không trỏ đi đâu cả.
            //
            // Hạn để DÀI: bản đệm ở đây chỉ là phao cho lúc mất mạng, còn có
            // mạng thì luôn lấy bản mới. Hết hạn sớm là cướp mất cái phao.
            urlPattern: ({ url }: { url: URL }) => url.pathname.endsWith('/de/danh-muc.json'),
            handler: 'NetworkFirst',
            options: {
              cacheName: TEN_KHO_DANH_MUC_DE,
              // Mạng ọp ẹp thì đừng bắt học sinh ngồi nhìn màn hình trắng: quá
              // ba giây là rơi về bản đệm, còn hơn không có gì.
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Đề thi: cả dữ liệu câu hỏi (.json) lẫn ảnh minh họa (.png) trong
            // public/de/. Không nạp sẵn (xem globIgnores ở trên), làm đề nào
            // thì đệm đề ấy — nên học sinh đã làm một lần thì lần sau mất mạng
            // vẫn mở lại được.
            //
            // CacheFirst an toàn vì ẢNH có tên là mã băm nội dung, sửa ảnh là
            // đổi luôn địa chỉ. Riêng file .json thì tên KHÔNG đổi khi sửa nội
            // dung, nên phải để hạn 30 ngày — sửa sai một đáp án thì chậm nhất
            // một tháng là máy học sinh nhận bản mới, chứ không kẹt vĩnh viễn.
            //
            // danh-muc.json KHÔNG rơi vào luật này: nó đã bị luật NetworkFirst
            // ngay bên trên bắt trước.
            urlPattern: ({ url }: { url: URL }) =>
              url.pathname.includes('/de/') && /\.(png|json)$/.test(url.pathname),
            handler: 'CacheFirst',
            options: {
              cacheName: TEN_KHO_ANH_DE,
              expiration: { maxEntries: 600, maxAgeSeconds: 60 * 60 * 24 * 30 },
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
