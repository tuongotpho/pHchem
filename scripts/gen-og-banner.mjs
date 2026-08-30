import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// Tạo banner Open Graph 1200x630 chuẩn Facebook / Zalo với độ nét cao
async function generateOgBanner() {
  const width = 1200;
  const height = 630;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Nền gradient tối sang trọng -->
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090d14" />
        <stop offset="50%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#070a10" />
      </linearGradient>

      <!-- Glow hạt nhân -->
      <radialGradient id="tealGlow" cx="25%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0d9488" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#0d9488" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="skyGlow" cx="80%" cy="30%" r="40%">
        <stop offset="0%" stop-color="#0284c7" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
      </radialGradient>

      <!-- Gradient chữ tiêu đề -->
      <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="50%" stop-color="#5eead4" />
        <stop offset="100%" stop-color="#38bdf8" />
      </linearGradient>

      <!-- Gradient biểu tượng bình hóa học -->
      <linearGradient id="flaskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2dd4bf" />
        <stop offset="100%" stop-color="#0284c7" />
      </linearGradient>
    </defs>

    <!-- Background Layer -->
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <circle cx="280" cy="315" r="350" fill="url(#tealGlow)" />
    <circle cx="950" cy="200" r="300" fill="url(#skyGlow)" />

    <!-- Lưới trang trí tinh tế -->
    <g opacity="0.05" stroke="#ffffff" stroke-width="1">
      <line x1="0" y1="105" x2="1200" y2="105" />
      <line x1="0" y1="210" x2="1200" y2="210" />
      <line x1="0" y1="315" x2="1200" y2="315" />
      <line x1="0" y1="420" x2="1200" y2="420" />
      <line x1="0" y1="525" x2="1200" y2="525" />
      <line x1="200" y1="0" x2="200" y2="630" />
      <line x1="400" y1="0" x2="400" y2="630" />
      <line x1="600" y1="0" x2="600" y2="630" />
      <line x1="800" y1="0" x2="800" y2="630" />
      <line x1="1000" y1="0" x2="1000" y2="630" />
    </g>

    <!-- Khung viền tinh tế -->
    <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#334155" stroke-width="1.5" opacity="0.6" />

    <!-- Biểu tượng Bình Hóa Học lớn bên trái -->
    <g transform="translate(100, 165)">
      <!-- Vòng tròn hào quang sau bình -->
      <circle cx="150" cy="150" r="140" fill="#0f2b38" stroke="#14b8a6" stroke-width="2" opacity="0.4" />

      <!-- Bình tam giác Erlenmeyer -->
      <path d="M 125 50 L 175 50 L 175 90 L 250 220 A 20 20 0 0 1 235 250 L 65 250 A 20 20 0 0 1 50 220 L 125 90 Z" 
            fill="none" stroke="url(#flaskGrad)" stroke-width="14" stroke-linejoin="round" stroke-linecap="round" />
      
      <!-- Miệng bình -->
      <line x1="110" y1="50" x2="190" y2="50" stroke="url(#flaskGrad)" stroke-width="14" stroke-linecap="round" />

      <!-- Dung dịch bên trong -->
      <path d="M 82 205 L 218 205 L 230 228 A 12 12 0 0 1 220 242 L 80 242 A 12 12 0 0 1 70 228 Z" 
            fill="#0d9488" opacity="0.8" />

      <!-- Bọt khí -->
      <circle cx="130" cy="175" r="10" fill="#5eead4" opacity="0.9" />
      <circle cx="170" cy="190" r="7" fill="#5eead4" opacity="0.7" />
      <circle cx="150" cy="140" r="6" fill="#38bdf8" opacity="0.8" />
    </g>

    <!-- Nội dung chính bên phải -->
    <!-- Badge Top -->
    <g transform="translate(470, 120)">
      <rect width="320" height="38" rx="19" fill="#134e4a" stroke="#14b8a6" stroke-width="1.5" opacity="0.9" />
      <text x="160" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#5eead4" text-anchor="middle" letter-spacing="1">
        ⚗️ HÓA HỌC CHUYÊN NGHIỆP
      </text>
    </g>

    <!-- Tiêu đề lớn Brand Name -->
    <text x="470" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="74" font-weight="900" fill="url(#titleGrad)" letter-spacing="-1.5">
      pH-Chem
    </text>

    <!-- Slogan / Giới thiệu -->
    <text x="470" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="500" fill="#94a3b8">
      Bộ công cụ tra cứu, tính toán &amp; luyện tập Hóa học
    </text>
    <text x="470" y="335" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="400" fill="#64748b">
      Chuẩn IUPAC · Thuật toán chính xác · 100% Offline
    </text>

    <!-- 4 Khối tính năng nổi bật (Feature Cards) -->
    <g transform="translate(470, 385)">
      <!-- Card 1: Bảng tuần hoàn -->
      <g transform="translate(0, 0)">
        <rect width="145" height="76" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <text x="72" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#2dd4bf" text-anchor="middle">118</text>
        <text x="72" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#94a3b8" text-anchor="middle">Nguyên tố</text>
      </g>

      <!-- Card 2: Máy tính PT & pH -->
      <g transform="translate(160, 0)">
        <rect width="145" height="76" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <text x="72" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#38bdf8" text-anchor="middle">Máy Tính</text>
        <text x="72" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#94a3b8" text-anchor="middle">PT, Mol &amp; pH</text>
      </g>

      <!-- Card 3: Cấu tạo 2D -->
      <g transform="translate(320, 0)">
        <rect width="145" height="76" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <text x="72" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#f59e0b" text-anchor="middle">274+</text>
        <text x="72" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#94a3b8" text-anchor="middle">Cấu trúc 2D</text>
      </g>

      <!-- Card 4: Luyện tập đề -->
      <g transform="translate(480, 0)">
        <rect width="145" height="76" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <text x="72" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#ec4899" text-anchor="middle">Luyện Đề</text>
        <text x="72" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#94a3b8" text-anchor="middle">Xuất Phiếu Điểm</text>
      </g>
    </g>

    <!-- Footer URL -->
    <g transform="translate(470, 510)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="#14b8a6">
        🌐 ph-chem.web.app
      </text>
    </g>
  </svg>
  `;

  const outPath = path.resolve(process.cwd(), 'public/og-image.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outPath);

  console.log('✅ ĐÃ SINH BANNER OPEN GRAPH (1200x630):', outPath);
}

generateOgBanner().catch(console.error);
