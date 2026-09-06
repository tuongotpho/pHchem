import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';

// 1. Tìm đường dẫn FFmpeg
function getFfmpegPath() {
  try {
    const pythonOut = execSync('python -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"').toString().trim();
    if (fs.existsSync(pythonOut)) return pythonOut;
  } catch {
    // fallback
  }
  const defaultPath = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe';
  if (fs.existsSync(defaultPath)) return defaultPath;
  throw new Error('Không tìm thấy FFmpeg!');
}

const WIDTH = 720;
const HEIGHT = 1280;
const PROMO_DIR = path.resolve('promo');
const SLIDES_DIR = path.join(PROMO_DIR, 'slides');

if (!fs.existsSync(SLIDES_DIR)) {
  fs.mkdirSync(SLIDES_DIR, { recursive: true });
}

// 2. Hàm tạo các slide chất lượng cao (720x1280 JPEG)
async function generateSlide1() {
  const posterPath = path.join(PROMO_DIR, 'phchem_poster_9_16.jpg');
  const basePoster = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const overlaySvg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#020617" stop-opacity="0.95" />
        </linearGradient>
        <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2dd4bf" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>
      </defs>

      <!-- Badge đỉnh đầu -->
      <rect x="180" y="80" width="360" height="50" rx="25" fill="#0d9488" fill-opacity="0.3" stroke="#2dd4bf" stroke-width="2" />
      <text x="360" y="113" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#5eead4" text-anchor="middle" letter-spacing="2">🧪 pH-Chem · HÓA HỌC 4.0</text>

      <!-- Khung Hook trung tâm -->
      <rect x="50" y="400" width="620" height="380" rx="28" fill="url(#cardGrad)" stroke="#38bdf8" stroke-width="2.5" />
      
      <rect x="90" y="440" width="540" height="50" rx="12" fill="#ef4444" fill-opacity="0.25" stroke="#f87171" stroke-width="1.5" />
      <text x="360" y="474" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#fca5a5" text-anchor="middle">⚠️ BẠN THẤY HÓA HỌC QUÁ KHÓ?</text>

      <text x="360" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="900" fill="#ffffff" text-anchor="middle">Không Nhớ Nổi</text>
      <text x="360" y="615" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="900" fill="url(#neonCyan)" text-anchor="middle">Công Thức Cấu Tạo?</text>
      <text x="360" y="675" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="900" fill="#f59e0b" text-anchor="middle">Cân Bằng Phương Trình?</text>

      <text x="360" y="735" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="500" fill="#94a3b8" text-anchor="middle">Đừng lo! Đã có giải pháp ngay đây 👇</text>
    </svg>
  `);

  await basePoster
    .composite([{ input: overlaySvg, top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile(path.join(SLIDES_DIR, 'slide_01.jpg'));
  console.log('✅ Đã tạo slide_01.jpg (Hook)');
}

async function generateSlide2() {
  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#070a13" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#06121f" />
        </linearGradient>
        <radialGradient id="glowTeal" cx="50%" cy="30%" r="40%">
          <stop offset="0%" stop-color="#0d9488" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#0d9488" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2dd4bf" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg2)" />
      <circle cx="360" cy="380" r="360" fill="url(#glowTeal)" />

      <!-- Top Title -->
      <rect x="210" y="100" width="300" height="46" rx="23" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="2" />
      <text x="360" y="132" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="bold" fill="#7dd3fc" text-anchor="middle" letter-spacing="3">GIỚI THIỆU NỀN TẢNG</text>

      <text x="360" y="240" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="900" fill="url(#cyanGrad)" text-anchor="middle" letter-spacing="2">pH-Chem</text>
      <text x="360" y="295" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" fill="#f8fafc" text-anchor="middle">Bộ Công Cụ Hóa Học Chuyên Nghiệp</text>

      <!-- 3 Tính năng chính -->
      <!-- Card 1 -->
      <g transform="translate(50, 360)">
        <rect width="620" height="150" rx="22" fill="#1e293b" fill-opacity="0.8" stroke="#334155" stroke-width="2" />
        <circle cx="65" cy="75" r="38" fill="#0284c7" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1.5" />
        <text x="65" y="85" font-family="Segoe UI, Arial, sans-serif" font-size="32" text-anchor="middle">🌐</text>
        <text x="130" y="65" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="bold" fill="#ffffff">Chạy Trực Tiếp Trên Web</text>
        <text x="130" y="105" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8">Không cần cài đặt, dùng ngay trên Mobile &amp; PC</text>
      </g>

      <!-- Card 2 -->
      <g transform="translate(50, 540)">
        <rect width="620" height="150" rx="22" fill="#1e293b" fill-opacity="0.8" stroke="#0d9488" stroke-width="2" />
        <circle cx="65" cy="75" r="38" fill="#0d9488" fill-opacity="0.3" stroke="#2dd4bf" stroke-width="1.5" />
        <text x="65" y="85" font-family="Segoe UI, Arial, sans-serif" font-size="32" text-anchor="middle">⚡</text>
        <text x="130" y="65" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="bold" fill="#ffffff">Cài Được Như App (PWA)</text>
        <text x="130" y="105" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8">Hoạt động offline mượt mà không cần Internet</text>
      </g>

      <!-- Card 3 -->
      <g transform="translate(50, 720)">
        <rect width="620" height="150" rx="22" fill="#1e293b" fill-opacity="0.8" stroke="#334155" stroke-width="2" />
        <circle cx="65" cy="75" r="38" fill="#16a34a" fill-opacity="0.3" stroke="#4ade80" stroke-width="1.5" />
        <text x="65" y="85" font-family="Segoe UI, Arial, sans-serif" font-size="32" text-anchor="middle">🎁</text>
        <text x="130" y="65" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="bold" fill="#ffffff">100% Hoàn Toàn Miễn Phí</text>
        <text x="130" y="105" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8">Không quảng cáo phiền toái, an toàn bảo mật</text>
      </g>

      <!-- Bottom badge -->
      <rect x="110" y="930" width="500" height="56" rx="18" fill="#0d9488" fill-opacity="0.2" stroke="#2dd4bf" stroke-width="1.5" />
      <text x="360" y="966" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" fill="#5eead4" text-anchor="middle">🔥 Phù hợp học sinh, sinh viên &amp; giáo viên</text>
    </svg>
  `);

  await sharp(svg).jpeg({ quality: 92 }).toFile(path.join(SLIDES_DIR, 'slide_02.jpg'));
  console.log('✅ Đã tạo slide_02.jpg (Intro)');
}

async function generateSlide3() {
  const caffeinePng = path.join(PROMO_DIR, 'assets', 'Caffeine_C8H10N4O2.png');
  const aspirinPng = path.join(PROMO_DIR, 'assets', 'Aspirin_C9H8O4.png');

  const cafResized = await sharp(caffeinePng).resize(280, 280).toBuffer();
  const aspResized = await sharp(aspirinPng).resize(280, 280).toBuffer();

  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#060c18" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#030712" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#fbbf24" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg3)" />

      <!-- Tiêu đề nổi bật -->
      <text x="360" y="140" font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="900" fill="#38bdf8" text-anchor="middle">340+ HỢP CHẤT</text>
      <text x="360" y="200" font-family="Segoe UI, Arial, sans-serif" font-size="32" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">274 Cấu Trúc 2D Chuẩn IUPAC</text>
      <text x="360" y="245" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Vẽ bằng thuật toán RDKit cực kỳ chuẩn xác và sắc nét</text>

      <!-- Khung chất 1: Caffeine -->
      <g transform="translate(50, 310)">
        <rect width="295" height="420" rx="22" fill="#1e293b" fill-opacity="0.85" stroke="#0ea5e9" stroke-width="2" />
        <text x="147" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">Caffeine</text>
        <text x="147" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#38bdf8" text-anchor="middle">C₈H₁₀N₄O₂</text>
      </g>

      <!-- Khung chất 2: Aspirin -->
      <g transform="translate(375, 310)">
        <rect width="295" height="420" rx="22" fill="#1e293b" fill-opacity="0.85" stroke="#10b981" stroke-width="2" />
        <text x="147" y="55" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">Aspirin</text>
        <text x="147" y="90" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#34d399" text-anchor="middle">C₉H₈O₄</text>
      </g>

      <!-- Thanh Highlight chân trang -->
      <rect x="50" y="780" width="620" height="230" rx="24" fill="#0f172a" stroke="#2dd4bf" stroke-width="2" />
      <text x="360" y="840" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="bold" fill="#2dd4bf" text-anchor="middle">✨ TRA CỨU MỌI LÚC, MỌI NƠI</text>
      <text x="360" y="895" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#e2e8f0" text-anchor="middle">Đầy đủ hợp chất vô cơ, hữu cơ &amp; hóa lý</text>
      <text x="360" y="945" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Xem tên IUPAC, tên thông thường và mã SMILES</text>
    </svg>
  `);

  await sharp(svg)
    .composite([
      { input: cafResized, top: 415, left: 57 },
      { input: aspResized, top: 415, left: 382 }
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(SLIDES_DIR, 'slide_03.jpg'));
  console.log('✅ Đã tạo slide_03.jpg (Structures)');
}

async function generateSlide4() {
  const svg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090d16" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#08101e" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg4)" />

      <!-- Top Header -->
      <text x="360" y="140" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="900" fill="#38bdf8" text-anchor="middle">MÁY TÍNH HÓA HỌC</text>
      <text x="360" y="195" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="bold" fill="#2dd4bf" text-anchor="middle">Xử Lý Bài Tập Chỉ Trong 1 Tích Tắc ⚡</text>

      <!-- Grid 4 tính năng tính toán -->
      <!-- Item 1 -->
      <g transform="translate(50, 270)">
        <rect width="620" height="135" rx="18" fill="#1e293b" fill-opacity="0.8" stroke="#38bdf8" stroke-width="2" />
        <text x="50" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="34">⚖️</text>
        <text x="110" y="60" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Tự Động Cân Bằng Phương Trình</text>
        <text x="110" y="96" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8">Cân bằng mọi phản ứng vô cơ &amp; hữu cơ</text>
      </g>

      <!-- Item 2 -->
      <g transform="translate(50, 430)">
        <rect width="620" height="135" rx="18" fill="#1e293b" fill-opacity="0.8" stroke="#2dd4bf" stroke-width="2" />
        <text x="50" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="34">📊</text>
        <text x="110" y="60" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Tính Khối Lượng Mol &amp; % Khối Lượng</text>
        <text x="110" y="96" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8">Phân tích % khối lượng từng nguyên tố</text>
      </g>

      <!-- Item 3 -->
      <g transform="translate(50, 590)">
        <rect width="620" height="135" rx="18" fill="#1e293b" fill-opacity="0.8" stroke="#f59e0b" stroke-width="2" />
        <text x="50" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="34">🧪</text>
        <text x="110" y="60" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Tính pH &amp; Pha Loãng Dung Dịch</text>
        <text x="110" y="96" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8">Chuyển đổi mol ↔ nồng độ ↔ thể tích khí</text>
      </g>

      <!-- Item 4 -->
      <g transform="translate(50, 750)">
        <rect width="620" height="135" rx="18" fill="#1e293b" fill-opacity="0.8" stroke="#a855f7" stroke-width="2" />
        <text x="50" y="80" font-family="Segoe UI, Arial, sans-serif" font-size="34">🗺️</text>
        <text x="110" y="60" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff">Bảng Tuần Hoàn 118 Nguyên Tố</text>
        <text x="110" y="96" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#94a3b8">Kèm ma trận độ tan chuẩn xác</text>
      </g>

      <rect x="110" y="950" width="500" height="54" rx="16" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1.5" />
      <text x="360" y="985" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="600" fill="#7dd3fc" text-anchor="middle">🎯 Tích hợp cả Ngân Hàng Đề Thi Trắc Nghiệm</text>
    </svg>
  `);

  await sharp(svg).jpeg({ quality: 92 }).toFile(path.join(SLIDES_DIR, 'slide_04.jpg'));
  console.log('✅ Đã tạo slide_04.jpg (Calculators)');
}

async function generateSlide5() {
  const posterPath = path.join(PROMO_DIR, 'phchem_poster_9_16.jpg');
  const basePoster = sharp(posterPath).resize(WIDTH, HEIGHT, { fit: 'cover' });

  const overlaySvg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ctaBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617" stop-opacity="0.92" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.96" />
        </linearGradient>
        <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0d9488" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
      </defs>

      <!-- Hộp trung tâm Call to action -->
      <rect x="45" y="320" width="630" height="600" rx="30" fill="url(#ctaBg)" stroke="#2dd4bf" stroke-width="2.5" />

      <text x="360" y="390" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="bold" fill="#f59e0b" text-anchor="middle">HỌC HÓA THÔNG MINH HƠN VỚI</text>
      <text x="360" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="900" fill="#ffffff" text-anchor="middle">pH-Chem</text>
      
      <text x="360" y="530" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#94a3b8" text-anchor="middle">Trợ thủ đắc lực cho mọi tiết học &amp; bài thi Hóa</text>

      <!-- Nút URL lớn -->
      <g transform="translate(85, 570)">
        <rect width="550" height="110" rx="24" fill="url(#btnGrad)" stroke="#5eead4" stroke-width="2" />
        <text x="275" y="45" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">👉 TRUY CẬP NGAY TẠI</text>
        <text x="275" y="85" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="900" fill="#fef08a" text-anchor="middle">tuongotpho.github.io/pHchem</text>
      </g>

      <!-- Link phụ -->
      <text x="360" y="730" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#64748b" text-anchor="middle">hoặc: ph-chem.web.app</text>

      <!-- Badges cuối -->
      <rect x="95" y="770" width="530" height="60" rx="18" fill="#16a34a" fill-opacity="0.2" stroke="#4ade80" stroke-width="1.5" />
      <text x="360" y="808" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="bold" fill="#86efac" text-anchor="middle">✨ HOÀN TOÀN MIỄN PHÍ · KHÔNG QUẢNG CÁO</text>

      <text x="360" y="880" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#e2e8f0" text-anchor="middle">Lưu lại hoặc chia sẻ cho bạn bè cùng học nhé! ❤️</text>
    </svg>
  `);

  await basePoster
    .composite([{ input: overlaySvg, top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile(path.join(SLIDES_DIR, 'slide_05.jpg'));
  console.log('✅ Đã tạo slide_05.jpg (CTA)');
}

// 3. Hàm tạo Video bằng FFmpeg
async function buildVideo() {
  console.log('🎨 Đang tạo 5 slide đồ họa 720x1280...');
  await generateSlide1();
  await generateSlide2();
  await generateSlide3();
  await generateSlide4();
  await generateSlide5();

  const ffmpeg = getFfmpegPath();
  console.log(`\n🎬 Khởi động FFmpeg: ${ffmpeg}`);

  const audioPath = path.join(PROMO_DIR, 'phchem_promo_full_hoaimy.mp3');
  const videoOutputPath = path.join(PROMO_DIR, 'phchem_promo_video.mp4');

  // Khớp chính xác với thời lượng 37.25 giây của giọng Hoài My
  const concatListPath = path.join(SLIDES_DIR, 'concat.txt');
  const concatContent = [
    `file '${path.join(SLIDES_DIR, 'slide_01.jpg').replace(/\\/g, '/')}'`,
    `duration 6.86`,
    `file '${path.join(SLIDES_DIR, 'slide_02.jpg').replace(/\\/g, '/')}'`,
    `duration 8.11`,
    `file '${path.join(SLIDES_DIR, 'slide_03.jpg').replace(/\\/g, '/')}'`,
    `duration 7.14`,
    `file '${path.join(SLIDES_DIR, 'slide_04.jpg').replace(/\\/g, '/')}'`,
    `duration 7.14`,
    `file '${path.join(SLIDES_DIR, 'slide_05.jpg').replace(/\\/g, '/')}'`,
    `duration 8.00`,
    `file '${path.join(SLIDES_DIR, 'slide_05.jpg').replace(/\\/g, '/')}'`
  ].join('\n');

  fs.writeFileSync(concatListPath, concatContent, 'utf-8');

  console.log('⚙️ Đang ghép video và audio bằng FFmpeg...');
  const ffmpegArgs = [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concatListPath,
    '-i', audioPath,
    '-r', '25',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-shortest',
    videoOutputPath
  ];

  const res = spawnSync(ffmpeg, ffmpegArgs, { stdio: 'inherit' });
  if (res.status !== 0) {
    throw new Error(`FFmpeg thất bại với mã lỗi ${res.status}`);
  }

  const stat = fs.statSync(videoOutputPath);
  console.log(`\n🎉 XUẤT VIDEO THÀNH CÔNG!`);
  console.log(`📁 File: ${videoOutputPath}`);
  console.log(`📦 Kích thước: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);
}

buildVideo().catch(err => {
  console.error('❌ Lỗi khi dựng video:', err);
  process.exit(1);
});
