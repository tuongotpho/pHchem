/**
 * gen-element-reels-v2.mjs — Bản dựng REEL nguyên tố "phiên bản 2" (điện ảnh)
 *
 * Khác biệt so với scripts/gen-element-reels.mjs (bản 1):
 *   1. Độ phân giải 1080x1920 (Full HD dọc) thay vì 720x1280.
 *   2. Có CHUYỂN ĐỘNG THẬT: nền zoom chậm (Ken Burns), chữ hiện dần theo lớp,
 *      chuyển cảnh hoà tan (xfade) thay vì cắt cứng.
 *   3. Nền sinh tự động theo màu của từng nguyên tố (quầng sáng + lưới chấm +
 *      ký hiệu chìm) thay vì dùng chung một tấm ảnh bảng tuần hoàn.
 *   4. Bố cục kiểu tạp chí: ít khung viền, nhiều khoảng trắng, chữ to.
 *   5. Toàn bộ nội dung nằm trong vùng an toàn (y = 260..1560) để không bị
 *      nút bấm của Reels/TikTok che mất.
 *   6. Thanh tiến trình chạy liên tục suốt video.
 *   7. Nén chuẩn phát hành: CRF 20, preset medium, 30fps, +faststart.
 *
 * Cách chạy:
 *   node scripts/gen-element-reels-v2.mjs 11          -> dựng 1 nguyên tố (theo id hoặc key)
 *   node scripts/gen-element-reels-v2.mjs demo        -> dựng 3 clip mẫu để so sánh
 *   node scripts/gen-element-reels-v2.mjs 1 10        -> dựng từ id 1 đến 10
 *   FORCE=1 node scripts/gen-element-reels-v2.mjs 11  -> dựng lại dù đã có file
 */

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { execSync, spawnSync } from 'node:child_process';
import { ELEMENT_REELS as ELEMENT_REELS_1 } from './element-reels-data.mjs';
import { saveSpeech } from './gen-element-reels.mjs';
import { ROWS as ROWS_2 } from './element-rows-2-all.mjs';
import { expand } from './element-data-2.mjs';

// Đợt 1 (60 nguyên tố, đã có sẵn) + đợt 2 (58 nguyên tố còn lại, id chạy tiếp từ 61)
const ELEMENT_REELS = [...ELEMENT_REELS_1, ...expand(ROWS_2, 61)];

// ─────────────────────────────────────────────────────────────
// HẰNG SỐ BỐ CỤC
// ─────────────────────────────────────────────────────────────
export const W = 1080;
export const H = 1920;
export const M = 76;                 // lề trái/phải
export const CW = W - M * 2;         // bề rộng vùng nội dung = 928
export const FPS = 30;
export const XFADE = 0.45;           // thời lượng hoà tan giữa 2 cảnh (giây)
export const PAD = 0.95;             // khoảng lặng thêm sau mỗi câu thuyết minh

const ROOT_DIR = path.resolve('.');
const PROMO_DIR = path.join(ROOT_DIR, 'promo');
const OUT_DIR = path.join(PROMO_DIR, 'reels_v2');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Khoá một giọng đọc duy nhất cho cả loạt, tránh lẫn giọng giữa các cảnh
const GIONG = 'vi-VN-NamMinhNeural';

// Bảng màu trung tính dùng chung
export const INK = {
  bg: '#04060D',
  panel: '#0A0F1C',
  hair: '#ffffff',
  white: '#ffffff',
  s300: '#cbd5e1',
  s400: '#94a3b8',
  s500: '#64748b',
  s600: '#475569'
};

export const FONT_DISPLAY = "Segoe UI Black, Arial Black, sans-serif";
export const FONT_TECH = "Bahnschrift, Segoe UI, sans-serif";
export const FONT_BODY = "Segoe UI, Arial, sans-serif";
export const FONT_MONO = "Consolas, monospace";
export const FONT_QUOTE = "Segoe UI, Arial, sans-serif";

// ─────────────────────────────────────────────────────────────
// TIỆN ÍCH
// ─────────────────────────────────────────────────────────────
export function getFfmpegPath() {
  try {
    const p = execSync('python -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"').toString().trim();
    if (fs.existsSync(p)) return p;
  } catch { /* bỏ qua, dùng đường dẫn mặc định */ }
  const fallback = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\Python\\Python313\\Lib\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe';
  if (fs.existsSync(fallback)) return fallback;
  throw new Error('Không tìm thấy FFmpeg!');
}

export function esc(str) {
  if (str === undefined || str === null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Bỏ emoji và ký tự gạch đầu dòng ở đầu chuỗi (bản 2 dùng số thứ tự thay emoji) */
export function stripLeadIcon(str) {
  return String(str || '')
    .replace(/^[\s•\-–—]+/, '')
    .replace(/^[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]+\s*/u, '')
    .trim();
}

/** Ước lượng bề rộng chuỗi (px). factor tuỳ theo độ đậm của font. */
export function estWidth(text, size, factor = 0.52) {
  return String(text).length * size * factor;
}

/** Ngắt dòng theo bề rộng khả dụng */
export function wrapByWidth(text, size, maxW, factor = 0.52) {
  const clean = String(text || '').trim().replace(/\s+([↑↓])/g, '$1');
  if (!clean) return [];
  if (estWidth(clean, size, factor) <= maxW) return [clean];
  const words = clean.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (estWidth(next, size, factor) <= maxW) {
      cur = next;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  // tránh dòng cuối "mồ côi" chỉ 1 từ ngắn
  if (lines.length > 1 && lines[lines.length - 1].length < 12) {
    const prevWords = lines[lines.length - 2].split(/\s+/);
    if (prevWords.length >= 4) {
      const moved = prevWords.pop();
      lines[lines.length - 2] = prevWords.join(' ');
      lines[lines.length - 1] = moved + ' ' + lines[lines.length - 1];
    }
  }
  return lines;
}

/** Giảm cỡ chữ đến khi vừa maxLines dòng trong maxW */
export function fitSize(text, maxW, startSize, minSize, maxLines = 1, factor = 0.52) {
  let size = startSize;
  while (size > minSize) {
    if (wrapByWidth(text, size, maxW, factor).length <= maxLines) return size;
    size -= 2;
  }
  return minSize;
}

export function textLines(lines, x, y, lineHeight, attrs) {
  return lines
    .map((ln, i) => `<text x="${x}" y="${y + i * lineHeight}" ${attrs}>${esc(ln)}</text>`)
    .join('\n');
}

export async function writeSvgPng(svg, filePath) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 6 }).toFile(filePath);
  return filePath;
}

// ─────────────────────────────────────────────────────────────
// LỚP NỀN — sinh theo màu riêng của từng nguyên tố
// ─────────────────────────────────────────────────────────────
const GLOW_POS = [
  { a: [0.76, 0.20], b: [0.14, 0.84] },
  { a: [0.20, 0.24], b: [0.84, 0.80] },
  { a: [0.80, 0.70], b: [0.18, 0.22] },
  { a: [0.26, 0.76], b: [0.80, 0.24] }
];

async function renderBackground(el, idx, dir) {
  const g = GLOW_POS[idx % GLOW_POS.length];
  const markY = [1180, 1320, 700, 1250][idx % 4];

  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glowA" cx="${g.a[0]}" cy="${g.a[1]}" r="0.66">
        <stop offset="0%" stop-color="${el.themeColor}" stop-opacity="0.38" />
        <stop offset="55%" stop-color="${el.themeColor}" stop-opacity="0.10" />
        <stop offset="100%" stop-color="${el.themeColor}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glowB" cx="${g.b[0]}" cy="${g.b[1]}" r="0.60">
        <stop offset="0%" stop-color="${el.accentColor}" stop-opacity="0.20" />
        <stop offset="100%" stop-color="${el.accentColor}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="vig" cx="0.5" cy="0.46" r="0.78">
        <stop offset="40%" stop-color="#000000" stop-opacity="0" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.72" />
      </radialGradient>
      <pattern id="dots" width="56" height="56" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.7" fill="#ffffff" fill-opacity="0.06" />
      </pattern>
      <linearGradient id="rail" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${el.themeColor}" stop-opacity="0.85" />
        <stop offset="100%" stop-color="${el.themeColor}" stop-opacity="0" />
      </linearGradient>
    </defs>

    <rect width="${W}" height="${H}" fill="${INK.bg}" />
    <rect width="${W}" height="${H}" fill="url(#dots)" />
    <rect width="${W}" height="${H}" fill="url(#glowA)" />
    <rect width="${W}" height="${H}" fill="url(#glowB)" />

    <!-- Ký hiệu nguyên tố chìm rất mờ làm hoa văn nền -->
    ${idx === 0 ? '' : `<text x="${W / 2}" y="${markY}" font-family="${FONT_DISPLAY}" font-size="900"
          fill="#ffffff" fill-opacity="0.018" text-anchor="middle">${esc(el.sym)}</text>`}

    <rect width="${W}" height="${H}" fill="url(#vig)" />

    <!-- Rãnh trang trí bên trái -->
    <rect x="${M - 26}" y="300" width="3" height="900" fill="url(#rail)" />

    <!-- Rãnh thanh tiến trình (phần chạy do FFmpeg trượt đè lên) -->
    <rect x="0" y="0" width="${W}" height="7" fill="#ffffff" fill-opacity="0.12" />
  </svg>`;

  return writeSvgPng(svg, path.join(dir, `bg_0${idx + 1}.png`));
}

/** Ảnh thanh tiến trình: FFmpeg sẽ trượt nó từ trái sang để lộ dần */
export async function renderProgressBar(el, dir) {
  const svg = `
  <svg width="${W}" height="7" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pb" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${el.themeColor}" />
        <stop offset="100%" stop-color="${el.accentColor}" />
      </linearGradient>
    </defs>
    <rect width="${W}" height="7" fill="url(#pb)" />
  </svg>`;
  return writeSvgPng(svg, path.join(dir, 'progress.png'));
}

// ─────────────────────────────────────────────────────────────
// CÁC MẢNH GIAO DIỆN DÙNG CHUNG
// ─────────────────────────────────────────────────────────────
function headerSvg(el, idx) {
  return `
    <rect x="${M}" y="168" width="14" height="14" rx="3" fill="${el.themeColor}" />
    <text x="${M + 30}" y="181" font-family="${FONT_TECH}" font-size="24" letter-spacing="6"
          fill="${INK.s500}">PH-CHEM</text>
    <text x="${W - M}" y="181" font-family="${FONT_TECH}" font-size="24" letter-spacing="6"
          fill="${INK.s600}" text-anchor="end">0${idx + 1} / 04</text>`;
}

function footerSvg(el) {
  return `
    <rect x="${M}" y="1660" width="${CW}" height="1" fill="#ffffff" fill-opacity="0.10" />
    <text x="${M}" y="1706" font-family="${FONT_TECH}" font-size="26" letter-spacing="3"
          fill="${INK.s500}">ph-chem.web.app</text>
    <text x="${W - M}" y="1706" font-family="${FONT_TECH}" font-size="26" letter-spacing="3"
          fill="${el.themeColor}" text-anchor="end">${esc(el.sym)} · Z ${el.z}</text>`;
}

/** Nhãn mục kiểu "▍ THÔNG SỐ NGUYÊN TỬ" */
function sectionLabel(el, y, label) {
  return `
    <rect x="${M}" y="${y - 22}" width="5" height="28" rx="2.5" fill="${el.themeColor}" />
    <text x="${M + 22}" y="${y}" font-family="${FONT_TECH}" font-size="28" letter-spacing="7"
          fill="${el.accentColor}">${esc(label)}</text>`;
}

function layerSvg(inner) {
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

// ─────────────────────────────────────────────────────────────
// CẢNH 1 — THẺ ĐỊNH DANH (bố cục căn giữa, ký hiệu khổng lồ)
// ─────────────────────────────────────────────────────────────
async function renderScene1(el, dir) {
  const cx = W / 2;
  const cy = 745;

  // vòng electron trang trí
  const orbits = [0, 60, 120].map(deg => `
    <ellipse cx="${cx}" cy="${cy}" rx="292" ry="150" fill="none"
             stroke="${el.themeColor}" stroke-opacity="0.28" stroke-width="2"
             transform="rotate(${deg} ${cx} ${cy})" />`).join('');

  const symSize = fitSize(el.sym, 420, 380, 180, 1, 0.66);

  const l1 = layerSvg(`
    ${headerSvg(el, 0)}
    <text x="${cx}" y="300" font-family="${FONT_TECH}" font-size="30" letter-spacing="10"
          fill="${INK.s500}" text-anchor="middle">HỒ SƠ NGUYÊN TỐ · #${String(el.id).padStart(2, '0')}</text>

    <defs>
      <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="46" />
      </filter>
      <radialGradient id="core" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="${el.themeColor}" stop-opacity="0.55" />
        <stop offset="100%" stop-color="${el.themeColor}" stop-opacity="0" />
      </radialGradient>
    </defs>

    <circle cx="${cx}" cy="${cy}" r="300" fill="url(#core)" />
    ${orbits}
    <circle cx="${cx}" cy="${cy}" r="222" fill="none" stroke="${el.themeColor}"
            stroke-opacity="0.55" stroke-width="2.5" stroke-dasharray="3 14" stroke-linecap="round" />
    <circle cx="${cx + 292}" cy="${cy}" r="9" fill="${el.accentColor}" />
    <circle cx="${cx - 146}" cy="${cy - 130}" r="7" fill="${el.accentColor}" fill-opacity="0.8" />

    <text x="${cx}" y="${cy + symSize * 0.36}" font-family="${FONT_DISPLAY}" font-size="${symSize}"
          fill="${el.accentColor}" text-anchor="middle" filter="url(#soft)" opacity="0.9">${esc(el.sym)}</text>
    <text x="${cx}" y="${cy + symSize * 0.36}" font-family="${FONT_DISPLAY}" font-size="${symSize}"
          fill="#ffffff" text-anchor="middle">${esc(el.sym)}</text>

    <text x="${cx}" y="1105" font-family="${FONT_TECH}" font-size="36" letter-spacing="4"
          fill="${INK.s300}" text-anchor="middle">Z = ${el.z}    ·    M = ${esc(el.mass)}</text>
    <text x="${cx}" y="1152" font-family="${FONT_TECH}" font-size="27" letter-spacing="3"
          fill="${INK.s600}" text-anchor="middle">${esc(el.groupPeriod)}</text>
  `);

  const nameSize = fitSize(el.vi.toUpperCase(), CW, 132, 60, 1, 0.66);
  const enSize = fitSize(el.en.toUpperCase(), CW - 60, 42, 26, 1, 0.62);
  const nickSize = fitSize(el.nickname.toUpperCase(), CW, 32, 22, 1, 0.55);
  const quoteLines = wrapByWidth(el.subQuote, 40, CW - 40, 0.50);

  const l2 = layerSvg(`
    <text x="${cx}" y="1272" font-family="${FONT_DISPLAY}" font-size="${nameSize}"
          fill="#ffffff" text-anchor="middle" letter-spacing="-1">${esc(el.vi.toUpperCase())}</text>
    <text x="${cx}" y="1328" font-family="${FONT_TECH}" font-size="${enSize}" letter-spacing="12"
          fill="${el.accentColor}" text-anchor="middle">${esc(el.en.toUpperCase())}</text>

    <rect x="${cx - 90}" y="1372" width="180" height="2" fill="${el.themeColor}" fill-opacity="0.7" />

    <text x="${cx}" y="1432" font-family="${FONT_TECH}" font-size="${nickSize}" letter-spacing="6"
          fill="${INK.s400}" text-anchor="middle">${esc(el.nickname.toUpperCase())}</text>
    ${textLines(quoteLines, cx, 1500, 52,
      `font-family="${FONT_QUOTE}" font-size="40" font-style="italic" font-weight="600" fill="#ffffff" text-anchor="middle"`)}
    ${footerSvg(el)}
  `);

  return [
    await writeSvgPng(l1, path.join(dir, 's1_a.png')),
    await writeSvgPng(l2, path.join(dir, 's1_b.png'))
  ];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 2 — THÔNG SỐ (lưới 2 cột, không viền, có gạch phân cách)
// ─────────────────────────────────────────────────────────────
async function renderScene2(el, dir) {
  const subLines = wrapByWidth(`${el.vi} (${el.sym}) · ${el.state}`, 30, CW, 0.50);

  const l1 = layerSvg(`
    ${headerSvg(el, 1)}
    ${sectionLabel(el, 300, 'THÔNG SỐ NGUYÊN TỬ')}
    <text x="${M}" y="405" font-family="${FONT_DISPLAY}" font-size="72" fill="#ffffff"
          letter-spacing="-1">DỮ LIỆU GỐC</text>
    ${textLines(subLines, M, 462, 40, `font-family="${FONT_BODY}" font-size="30" fill="${INK.s400}"`)}
    ${footerSvg(el)}
  `);

  const cells = [
    { label: 'CẤU HÌNH ELECTRON', val: el.config },
    { label: 'ĐỘ ÂM ĐIỆN', val: el.enScale },
    { label: 'NÓNG CHẢY', val: el.melt },
    { label: 'ĐIỂM SÔI', val: el.boil },
    { label: 'KHỐI LƯỢNG RIÊNG', val: el.density },
    { label: 'NĂM PHÁT HIỆN', val: el.disc }
  ];

  const colW = (CW - 40) / 2;
  const rowH = 182;
  const gridTop = 585;

  const gridSvg = cells.map((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M + col * (colW + 40);
    const y = gridTop + row * rowH;
    const vSize = fitSize(c.val, colW, 40, 24, 2, 0.50);
    const vLines = wrapByWidth(c.val, vSize, colW, 0.50).slice(0, 2);
    return `
      <text x="${x}" y="${y + 26}" font-family="${FONT_TECH}" font-size="23" letter-spacing="4"
            fill="${INK.s600}">${esc(c.label)}</text>
      ${textLines(vLines, x, y + 80, vSize + 6,
        `font-family="${FONT_BODY}" font-size="${vSize}" font-weight="600" fill="#ffffff"`)}
      <rect x="${x}" y="${y + rowH - 34}" width="${colW}" height="1" fill="#ffffff" fill-opacity="0.09" />`;
  }).join('\n');

  const hlLines = wrapByWidth(el.statsHighlight, 36, CW - 120, 0.50);
  const hlH = Math.max(210, 120 + hlLines.length * 48);
  const hlTop = 1205;

  const l2 = layerSvg(`
    ${gridSvg}
    <rect x="${M}" y="${hlTop}" width="${CW}" height="${hlH}" rx="26" fill="#ffffff" fill-opacity="0.045" />
    <rect x="${M}" y="${hlTop}" width="5" height="${hlH}" rx="2.5" fill="${el.themeColor}" />
    <text x="${M + 46}" y="${hlTop + 58}" font-family="${FONT_TECH}" font-size="24" letter-spacing="6"
          fill="${el.accentColor}">ĐIỂM NHẤN</text>
    ${textLines(hlLines, M + 46, hlTop + 122, 48,
      `font-family="${FONT_BODY}" font-size="36" font-weight="600" fill="#ffffff"`)}
    <text x="${M}" y="1570" font-family="${FONT_TECH}" font-size="27" letter-spacing="5"
          fill="${el.themeColor}">TIẾP THEO → SIÊU NĂNG LỰC CỦA ${esc(el.vi.toUpperCase())}</text>
  `);

  return [
    await writeSvgPng(l1, path.join(dir, 's2_a.png')),
    await writeSvgPng(l2, path.join(dir, 's2_b.png'))
  ];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 3 — SIÊU NĂNG LỰC + PHƯƠNG TRÌNH
// ─────────────────────────────────────────────────────────────
async function renderScene3(el, dir) {
  const titleSize = fitSize(el.powerTitle, CW, 62, 34, 2, 0.67);
  const titleLines = wrapByWidth(el.powerTitle, titleSize, CW, 0.67).slice(0, 2);

  const l1 = layerSvg(`
    ${headerSvg(el, 2)}
    ${sectionLabel(el, 300, 'SIÊU NĂNG LỰC HOÁ HỌC')}
    ${textLines(titleLines, M, 400, titleSize + 14,
      `font-family="${FONT_DISPLAY}" font-size="${titleSize}" fill="#ffffff" letter-spacing="-1"`)}
    ${footerSvg(el)}
  `);

  let y = 560;
  const bulletSvg = el.powerDesc.slice(0, 3).map((raw, i) => {
    const text = stripLeadIcon(raw);
    const lines = wrapByWidth(text, 33, CW - 96, 0.50);
    const block = `
      <circle cx="${M + 22}" cy="${y - 10}" r="23" fill="${el.themeColor}" fill-opacity="0.18" />
      <text x="${M + 22}" y="${y - 1}" font-family="${FONT_TECH}" font-size="22" font-weight="700"
            fill="${el.accentColor}" text-anchor="middle">0${i + 1}</text>
      ${textLines(lines, M + 96, y, 46, `font-family="${FONT_BODY}" font-size="33" fill="${INK.s300}"`)}`;
    y += lines.length * 46 + 74;
    return block;
  }).join('\n');

  const rxTop = Math.max(y + 30, 1245);
  const rxSize = fitSize(el.reaction, CW - 100, 42, 26, 2, 0.56);
  const rxLines = wrapByWidth(el.reaction, rxSize, CW - 100, 0.56).slice(0, 2);
  const rxH = 120 + rxLines.length * (rxSize + 14);

  const l2 = layerSvg(`
    ${bulletSvg}
    <rect x="${M}" y="${rxTop}" width="${CW}" height="${rxH}" rx="26" fill="#020510" fill-opacity="0.92" />
    <rect x="${M}" y="${rxTop}" width="${CW}" height="${rxH}" rx="26" fill="none"
          stroke="${el.themeColor}" stroke-opacity="0.45" stroke-width="2" />
    <text x="${M + 44}" y="${rxTop + 52}" font-family="${FONT_TECH}" font-size="23" letter-spacing="6"
          fill="${INK.s600}">${esc(el.reactionLabel || 'PHẢN ỨNG TIÊU BIỂU')}</text>
    ${textLines(rxLines, W / 2, rxTop + 112, rxSize + 14,
      `font-family="${FONT_MONO}" font-size="${rxSize}" font-weight="700" fill="${el.accentColor}" text-anchor="middle"`)}
  `);

  return [
    await writeSvgPng(l1, path.join(dir, 's3_a.png')),
    await writeSvgPng(l2, path.join(dir, 's3_b.png'))
  ];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 4 — ỨNG DỤNG THỰC TẾ + KÊU GỌI TRUY CẬP
// ─────────────────────────────────────────────────────────────
async function renderScene4(el, dir) {
  const title = el.appsTitle || `${el.vi.toUpperCase()} TRONG ĐỜI SỐNG`;
  const titleSize = fitSize(title, CW, 72, 38, 1, 0.67);

  const l1 = layerSvg(`
    ${headerSvg(el, 3)}
    ${sectionLabel(el, 300, el.appsLabel || 'ỨNG DỤNG THỰC TẾ')}
    <text x="${M}" y="405" font-family="${FONT_DISPLAY}" font-size="${titleSize}" fill="#ffffff"
          letter-spacing="-1">${esc(title)}</text>
    ${footerSvg(el)}
  `);

  let y = 545;
  const appSvg = el.apps.slice(0, 3).map((raw, i) => {
    const text = stripLeadIcon(raw);
    const lines = wrapByWidth(text, 34, CW - 110, 0.50);
    const block = `
      <text x="${M}" y="${y + 4}" font-family="${FONT_TECH}" font-size="44" font-weight="700"
            fill="${el.themeColor}" fill-opacity="0.85">0${i + 1}</text>
      ${textLines(lines, M + 106, y, 46, `font-family="${FONT_BODY}" font-size="34" fill="#ffffff"`)}
      <rect x="${M}" y="${y + lines.length * 46 + 6}" width="${CW}" height="1"
            fill="#ffffff" fill-opacity="0.08" />`;
    y += lines.length * 46 + 104;
    return block;
  }).join('\n');

  const ctaTop = 1120;
  const l2 = layerSvg(`
    ${appSvg}
    <defs>
      <linearGradient id="ctaG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${el.themeColor}" stop-opacity="0.20" />
        <stop offset="100%" stop-color="#0A0F1C" stop-opacity="0.95" />
      </linearGradient>
    </defs>
    <rect x="${M}" y="${ctaTop}" width="${CW}" height="430" rx="34" fill="url(#ctaG)" />
    <rect x="${M}" y="${ctaTop}" width="${CW}" height="430" rx="34" fill="none"
          stroke="${el.themeColor}" stroke-opacity="0.55" stroke-width="2" />

    <text x="${W / 2}" y="${ctaTop + 78}" font-family="${FONT_DISPLAY}" font-size="46"
          fill="#ffffff" text-anchor="middle">TRA CỨU 118 NGUYÊN TỐ</text>
    <text x="${W / 2}" y="${ctaTop + 124}" font-family="${FONT_BODY}" font-size="28"
          fill="${INK.s400}" text-anchor="middle">Bảng tuần hoàn tương tác · Cấu hình e · Mô hình 3D</text>

    <rect x="${M + 40}" y="${ctaTop + 168}" width="${CW - 80}" height="110" rx="26"
          fill="${el.themeColor}" fill-opacity="0.92" />
    <text x="${W / 2}" y="${ctaTop + 238}" font-family="${FONT_DISPLAY}" font-size="46"
          fill="#020510" text-anchor="middle">ph-chem.web.app/table</text>

    <text x="${W / 2}" y="${ctaTop + 330}" font-family="${FONT_TECH}" font-size="27" letter-spacing="3"
          fill="${INK.s400}" text-anchor="middle">MIỄN PHÍ · KHÔNG QUẢNG CÁO · KHÔNG CẦN CÀI ĐẶT</text>
    <text x="${W / 2}" y="${ctaTop + 385}" font-family="${FONT_BODY}" font-size="30" font-weight="600"
          fill="${el.accentColor}" text-anchor="middle">Lưu video lại để ôn khi cần nhé!</text>
  `);

  return [
    await writeSvgPng(l1, path.join(dir, 's4_a.png')),
    await writeSvgPng(l2, path.join(dir, 's4_b.png'))
  ];
}

// ─────────────────────────────────────────────────────────────
// DỰNG VIDEO
// ─────────────────────────────────────────────────────────────
/**
 * Soi file nhạc nền để dùng được BẤT KỲ bản nhạc nào người dùng chép vào:
 *  - bỏ qua đoạn dạo đầu (nhiều bài mở màn nhỏ tiếng rồi mới vào nhạc);
 *  - tính sẵn mức khuếch đại để mọi bài đều nằm cùng một độ to trong video.
 * Trả về { start, gainDb, needsLoop }.
 */
function analyzeMusic(ffmpeg, file, needSec, targetRmsDb = -32) {
  const RATE = 8000;
  const res = spawnSync(ffmpeg, ['-v', 'quiet', '-i', file, '-f', 's16le', '-ac', '1', '-ar', String(RATE), '-'],
    { maxBuffer: 1 << 28 });
  const buf = res.stdout;
  const secs = Math.floor(buf.length / 2 / RATE);
  if (!secs) return { start: 0, gainDb: 0, needsLoop: true };

  const power = [];
  for (let s = 0; s < secs; s++) {
    let sum = 0;
    for (let i = s * RATE; i < (s + 1) * RATE; i++) {
      const v = buf.readInt16LE(i * 2) / 32768;
      sum += v * v;
    }
    power.push(sum / RATE);
  }
  const db = power.map(p => 10 * Math.log10(p + 1e-12));
  const body = [...db].sort((a, b) => a - b)[Math.floor(db.length / 2)];   // mức trung vị = "thân bài"

  // điểm vào nhạc: giây đầu tiên đạt tới trong khoảng 3 dB so với thân bài,
  // và còn đủ độ dài cho cả video
  let start = 0;
  for (let s = 0; s < secs; s++) {
    if (db[s] >= body - 3) { start = s; break; }
  }
  const needsLoop = secs - start < needSec + 1;
  if (needsLoop) start = 0;

  const from = start;
  const to = Math.min(secs, start + Math.ceil(needSec));
  const usedRms = 10 * Math.log10(
    power.slice(from, to).reduce((a, b) => a + b, 0) / Math.max(1, to - from) + 1e-12);

  return { start, gainDb: targetRmsDb - usedRms, needsLoop };
}

export function probeDuration(ffmpeg, file) {
  const probe = spawnSync(ffmpeg, ['-i', file], { encoding: 'utf8' });
  const m = probe.stderr?.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
  if (!m) return 4.0;
  return parseInt(m[1], 10) * 3600 + parseInt(m[2], 10) * 60 + parseFloat(m[3]);
}

function fx(p) {
  return p.replace(/\\/g, '/').replace(/:/g, '\\:');
}

/**
 * Dựng 1 cảnh: nền zoom chậm + 2 lớp chữ hiện dần + thanh tiến trình chạy.
 */
export function buildScene(ffmpeg, { bg, layerA, layerB, bar, dur, out, offset, total }) {
  const nf = Math.round(dur * FPS);
  // zoom 1.00 -> 1.085 trong suốt cảnh, phóng to nguồn trước để hết rung
  const zoomStep = (0.085 / nf).toFixed(6);

  const filter = [
    `[0:v]scale=2160:3840:flags=lanczos,` +
      `zoompan=z='min(1+${zoomStep}*on,1.085)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':` +
      `d=1:s=${W}x${H}:fps=${FPS},setsar=1,format=rgba[bg]`,
    `[1:v]format=rgba,fade=t=in:st=0.20:d=0.55:alpha=1[la]`,
    `[bg][la]overlay=x=0:y='22*max(0\\,1-(t-0.20)/0.55)':format=auto[v1]`,
    `[2:v]format=rgba,fade=t=in:st=0.95:d=0.60:alpha=1[lb]`,
    `[v1][lb]overlay=x=0:y='26*max(0\\,1-(t-0.95)/0.60)':format=auto[v2]`,
    `[v2][3:v]overlay=x='-${W}+${W}*((${offset.toFixed(3)}+t)/${total.toFixed(3)})':y=0:format=auto,` +
      `format=yuv420p[vout]`
  ].join(';');

  const args = [
    '-y',
    '-loop', '1', '-framerate', String(FPS), '-t', dur.toFixed(3), '-i', bg,
    '-loop', '1', '-framerate', String(FPS), '-t', dur.toFixed(3), '-i', layerA,
    '-loop', '1', '-framerate', String(FPS), '-t', dur.toFixed(3), '-i', layerB,
    '-loop', '1', '-framerate', String(FPS), '-t', dur.toFixed(3), '-i', bar,
    '-filter_complex', filter,
    '-map', '[vout]',
    '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast',
    '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-t', dur.toFixed(3),
    out
  ];

  const res = spawnSync(ffmpeg, args, { encoding: 'utf8' });
  if (res.status !== 0) {
    console.error(res.stderr?.slice(-3000));
    throw new Error('FFmpeg lỗi khi dựng cảnh: ' + out);
  }
  return out;
}

export async function buildReelV2(el) {
  const ffmpeg = getFfmpegPath();
  const workDir = path.join(OUT_DIR, el.key);
  if (!fs.existsSync(workDir)) fs.mkdirSync(workDir, { recursive: true });

  const videoOut = path.join(OUT_DIR, el.videoFileName);
  if (fs.existsSync(videoOut) && fs.statSync(videoOut).size > 500000 && !process.env.FORCE) {
    console.log(`⏩ Đã có ${videoOut}, bỏ qua (đặt FORCE=1 để dựng lại).`);
    return videoOut;
  }

  console.log(`\n🎬 [V2] ${el.title}`);

  // 1) Thuyết minh — dùng lại file của bản 1 nếu đã có để tiết kiệm thời gian
  const oldDir = path.join(PROMO_DIR, 'reels', el.key);
  const speeches = [];
  for (let i = 0; i < el.scenes.length; i++) {
    const name = `speech_${String(i + 1).padStart(2, '0')}.mp3`;
    const reuse = path.join(oldDir, name);
    const target = path.join(workDir, name);
    if (!fs.existsSync(target)) {
      if (fs.existsSync(reuse) && fs.statSync(reuse).size > 2000) {
        fs.copyFileSync(reuse, target);
        console.log(`   ♻️  Dùng lại giọng đọc cảnh ${i + 1}`);
      } else {
        console.log(`   🎙️  Tạo giọng đọc cảnh ${i + 1}...`);
        await saveSpeech(target, el.scenes[i].text, '+10%', GIONG);
      }
    }
    speeches.push(target);
  }

  // 2) Thời lượng từng cảnh
  const durs = speeches.map((s, i) => {
    const d = probeDuration(ffmpeg, s) + PAD + (i === 3 ? 0.7 : 0);
    return Math.max(d, 3.6);
  });
  const offsets = [];
  let acc = 0;
  durs.forEach((d, i) => { offsets.push(acc); acc += d - (i < durs.length - 1 ? XFADE : 0); });
  const total = offsets[offsets.length - 1] + durs[durs.length - 1];
  console.log(`   ⏱️  Thời lượng: ${total.toFixed(1)}s (${durs.map(d => d.toFixed(1)).join(' + ')})`);

  // 3) Kết xuất đồ hoạ
  console.log('   🎨 Kết xuất 4 nền + 8 lớp chữ 1080x1920...');
  const bgs = [];
  for (let i = 0; i < 4; i++) bgs.push(await renderBackground(el, i, workDir));
  const layers = [
    await renderScene1(el, workDir),
    await renderScene2(el, workDir),
    await renderScene3(el, workDir),
    await renderScene4(el, workDir)
  ];

  // 4) Dựng từng cảnh
  const barPng = await renderProgressBar(el, workDir);
  const sceneFiles = [];
  for (let i = 0; i < 4; i++) {
    console.log(`   ⚙️  Dựng cảnh ${i + 1}/4 (${durs[i].toFixed(1)}s)...`);
    sceneFiles.push(buildScene(ffmpeg, {
      bg: bgs[i],
      layerA: layers[i][0],
      layerB: layers[i][1],
      bar: barPng,
      dur: durs[i],
      out: path.join(workDir, `scene_0${i + 1}.mp4`),
      offset: offsets[i],
      total
    }));
  }

  // 5) Ghép 4 cảnh bằng hoà tan + trộn tiếng theo đúng mốc thời gian
  console.log('   🎞️  Ghép cảnh (hoà tan) + trộn âm thanh...');
  const vParts = [];
  let last = '[0:v]';
  for (let i = 1; i < 4; i++) {
    const outLbl = i === 3 ? '[vx]' : `[vx${i}]`;
    vParts.push(`${last}[${i}:v]xfade=transition=fade:duration=${XFADE}:offset=${offsets[i].toFixed(3)}${outLbl}`);
    last = outLbl;
  }
  const aParts = speeches.map((_, i) => {
    const ms = Math.round(offsets[i] * 1000);
    return `[${i + 4}:a]adelay=${ms}|${ms},aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a${i}]`;
  });
  const vFinal = `[vx]fade=t=in:st=0:d=0.5,fade=t=out:st=${(total - 0.6).toFixed(3)}:d=0.6,format=yuv420p[vfin]`;

  // Nhạc nền (tuỳ chọn): MUSIC=ambient|lofi|pulse, MUSIC_DB để chỉnh to nhỏ
  const musicName = (process.env.MUSIC || '').trim();
  let musicPath = null;
  if (musicName && musicName !== 'off') {
    const musicDir = path.join(PROMO_DIR, 'assets', 'music');
    // chấp nhận cả tên có sẵn đuôi lẫn tên trần, thử lần lượt các định dạng phổ biến
    const candidates = [musicName, ...['.mp3', '.m4a', '.wav', '.aac', '.ogg'].map(e => musicName + e)];
    musicPath = candidates.map(c => path.join(musicDir, c)).find(f => fs.existsSync(f)) || null;
    if (!musicPath) {
      const have = fs.existsSync(musicDir)
        ? fs.readdirSync(musicDir).filter(f => /\.(mp3|m4a|wav|aac|ogg)$/i.test(f))
        : [];
      throw new Error(
        `Không tìm thấy nhạc nền "${musicName}" trong ${musicDir}.
` +
        (have.length ? `Đang có: ${have.join(', ')}` : 'Thư mục trống — chạy "npm run gen:music" hoặc chép file nhạc vào đây.')
      );
    }
  }
  // MUSIC_DB: chỉnh thêm/bớt so với mức đã tự cân (0 = giữ nguyên)
  const musicTrimDb = Number(process.env.MUSIC_DB || 0);

  const aChain = [...aParts];
  let music = null;
  if (musicPath) {
    music = analyzeMusic(ffmpeg, musicPath, total);
    const gain = (music.gainDb + musicTrimDb).toFixed(1);

    // Lời đọc tách 2 đường: một đường ra loa, một đường làm "chìa khoá" ép nhạc nhỏ lại
    aChain.push(`[a0][a1][a2][a3]amix=inputs=4:normalize=0:dropout_transition=0,alimiter=limit=0.95:level=false,asplit=2[voice][key]`);
    aChain.push(`[8:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,` +
      `atrim=0:${total.toFixed(3)},volume=${gain}dB,` +
      `afade=t=in:st=0:d=2.0,afade=t=out:st=${(total - 2.5).toFixed(3)}:d=2.5[mus]`);
    aChain.push(`[mus][key]sidechaincompress=threshold=0.015:ratio=12:attack=10:release=420:makeup=1[musduck]`);
    aChain.push(`[voice][musduck]amix=inputs=2:normalize=0:dropout_transition=0,alimiter=limit=0.95:level=false[aout]`);
    console.log(`   🎵 Nhạc nền: ${path.basename(musicPath)} — vào từ giây ${music.start}` +
      `${music.needsLoop ? ' (lặp vòng)' : ''}, chỉnh ${gain} dB, tự hạ khi có lời đọc`);
  } else {
    aChain.push(`[a0][a1][a2][a3]amix=inputs=4:normalize=0:dropout_transition=0,alimiter=limit=0.95:level=false[aout]`);
  }

  const args = [
    '-y',
    ...sceneFiles.flatMap(f => ['-i', f]),
    ...speeches.flatMap(f => ['-i', f]),
    ...(musicPath
      ? (music.needsLoop
        ? ['-stream_loop', '-1', '-i', musicPath]
        : ['-ss', String(music.start), '-i', musicPath])
      : []),
    '-filter_complex', [...vParts, vFinal, ...aChain].join(';'),
    '-map', '[vfin]', '-map', '[aout]',
    '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-profile:v', 'high', '-level', '4.1',
    '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '160k', '-ar', '48000',
    '-movflags', '+faststart',
    '-t', total.toFixed(3),
    videoOut
  ];

  const res = spawnSync(ffmpeg, args, { encoding: 'utf8' });
  if (res.status !== 0) {
    console.error(res.stderr?.slice(-4000));
    throw new Error('FFmpeg lỗi khi ghép video cuối: ' + el.key);
  }

  const mb = (fs.statSync(videoOut).size / 1048576).toFixed(2);
  console.log(`   ✅ Xong: ${videoOut} (${mb} MB, ${total.toFixed(1)}s, 1080x1920)`);
  return videoOut;
}

/**
 * Tự soi bố cục MÀ KHÔNG cần kết xuất ảnh: chạy chính công thức ngắt dòng /
 * co chữ của 4 cảnh rồi báo chỗ nào chữ sẽ tràn khung hoặc bị cắt mất.
 * Nhờ vậy không phải mở từng ảnh ra nhìn.
 */
export function kiemTraBoCuc(list) {
  const loi = [];
  for (const el of list) {
    const v = [];

    // Cảnh 1 — thẻ định danh
    if (fitSize(el.vi.toUpperCase(), CW, 132, 60, 1, 0.66) <= 60) v.push('C1: tên quá dài, chữ phải thu nhỏ hết cỡ');
    const quote = wrapByWidth(el.subQuote, 40, CW - 40, 0.50);
    if (quote.length > 2) v.push(`C1: câu trích ${quote.length} dòng (tối đa 2) -> tràn xuống mép dưới`);

    // Cảnh 2 — bảng thông số
    const colW = (CW - 40) / 2;
    for (const [nhan, val] of [['cấu hình', el.config], ['độ âm điện', el.enScale],
      ['nóng chảy', el.melt], ['điểm sôi', el.boil], ['khối lượng riêng', el.density], ['năm phát hiện', el.disc]]) {
      const sz = fitSize(val, colW, 40, 24, 2, 0.50);
      if (wrapByWidth(val, sz, colW, 0.50).length > 2) v.push(`C2: ô "${nhan}" dài quá, bị cắt bớt`);
    }
    const hl = wrapByWidth(el.statsHighlight, 36, CW - 120, 0.50);
    if (hl.length > 4) v.push(`C2: điểm nhấn ${hl.length} dòng (tối đa 4)`);

    // Cảnh 3 — siêu năng lực
    const tSize = fitSize(el.powerTitle, CW, 62, 34, 2, 0.67);
    if (wrapByWidth(el.powerTitle, tSize, CW, 0.67).length > 2) v.push('C3: tiêu đề quá dài, bị cắt còn 2 dòng');
    let y = 560;
    for (const raw of el.powerDesc.slice(0, 3)) {
      y += wrapByWidth(stripLeadIcon(raw), 33, CW - 96, 0.50).length * 46 + 74;
    }
    if (y - 74 > 1245) v.push(`C3: 3 gạch đầu dòng cao tới y=${Math.round(y - 74)} (giới hạn 1245) -> đè lên khung phản ứng`);
    const rxSize = fitSize(el.reaction, CW - 100, 42, 26, 2, 0.56);
    if (wrapByWidth(el.reaction, rxSize, CW - 100, 0.56).length > 2) v.push('C3: phương trình quá dài, bị cắt');

    // Cảnh 4 — ứng dụng + kêu gọi
    const title4 = el.appsTitle || `${el.vi.toUpperCase()} TRONG ĐỜI SỐNG`;
    if (fitSize(title4, CW, 72, 38, 1, 0.67) <= 38) v.push('C4: tiêu đề quá dài, tràn lề');
    let y4 = 545;
    for (const raw of el.apps.slice(0, 3)) {
      y4 += wrapByWidth(stripLeadIcon(raw), 34, CW - 110, 0.50).length * 46 + 104;
    }
    if (y4 - 104 > 1120) v.push(`C4: 3 mục ứng dụng cao tới y=${Math.round(y4 - 104)} (giới hạn 1120) -> đè lên khung kêu gọi`);

    if (v.length) loi.push({ el, v });
  }

  console.log(`
🔎 Soi bố cục ${list.length} nguyên tố:`);
  if (!loi.length) {
    console.log('   ✅ Không có nguyên tố nào bị tràn hay bị cắt chữ.');
  } else {
    for (const { el, v } of loi) {
      console.log(`   ⚠️  #${el.id} ${el.vi} (${el.sym}):`);
      v.forEach(x => console.log(`        - ${x}`));
    }
    console.log(`   Tổng: ${loi.length}/${list.length} nguyên tố cần sửa lời.`);
  }
  return loi;
}

/** Chỉ kết xuất 4 ảnh tĩnh để xem trước bố cục (nhanh, không cần FFmpeg) */
export async function renderStills(el) {
  const workDir = path.join(OUT_DIR, el.key);
  if (!fs.existsSync(workDir)) fs.mkdirSync(workDir, { recursive: true });
  const bgs = [];
  for (let i = 0; i < 4; i++) bgs.push(await renderBackground(el, i, workDir));
  const layers = [
    await renderScene1(el, workDir),
    await renderScene2(el, workDir),
    await renderScene3(el, workDir),
    await renderScene4(el, workDir)
  ];
  const outs = [];
  for (let i = 0; i < 4; i++) {
    const out = path.join(workDir, `preview_0${i + 1}.jpg`);
    await sharp(bgs[i])
      .composite([{ input: layers[i][0] }, { input: layers[i][1] }])
      .jpeg({ quality: 92 })
      .toFile(out);
    outs.push(out);
  }
  console.log('🖼️  Ảnh xem trước:', outs.join('\n   '));
  return outs;
}

/**
 * Nghiệm thu hàng loạt: soi từng file mp4 đã dựng xem có đúng khuôn không.
 * In ra một bảng duy nhất, chỉ nêu tên nguyên tố có vấn đề.
 */
export function nghiemThu(list) {
  const ffmpeg = getFfmpegPath();
  const loi = [];
  let ok = 0, tongMB = 0, tongGiay = 0;

  for (const el of list) {
    const f = path.join(OUT_DIR, el.videoFileName);
    if (!fs.existsSync(f)) { loi.push([el, 'chưa dựng']); continue; }

    const st = fs.statSync(f);
    const info = spawnSync(ffmpeg, ['-i', f], { encoding: 'utf8' }).stderr || '';
    const mDur = info.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    const dur = mDur ? (+mDur[1]) * 3600 + (+mDur[2]) * 60 + parseFloat(mDur[3]) : 0;
    const mRes = info.match(/,\s*(\d{3,4})x(\d{3,4})/);
    const res = mRes ? `${mRes[1]}x${mRes[2]}` : 'không đọc được';
    const coTieng = /Audio:\s*aac/.test(info);

    const v = [];
    if (res !== '1080x1920') v.push(`khung hình ${res}`);
    if (!coTieng) v.push('thiếu tiếng');
    if (dur < 25) v.push(`quá ngắn (${dur.toFixed(1)}s)`);
    if (dur > 90) v.push(`quá dài (${dur.toFixed(1)}s)`);
    if (st.size < 1_000_000) v.push(`file quá nhỏ (${(st.size / 1048576).toFixed(2)} MB)`);

    if (v.length) loi.push([el, v.join(', ')]);
    else { ok++; tongMB += st.size / 1048576; tongGiay += dur; }
  }

  console.log(`
📋 Nghiệm thu ${list.length} video:`);
  console.log(`   ✅ Đạt: ${ok}/${list.length}` +
    (ok ? ` — trung bình ${(tongGiay / ok).toFixed(1)}s, ${(tongMB / ok).toFixed(2)} MB mỗi video` : ''));
  if (loi.length) {
    console.log(`   ⚠️  Có vấn đề: ${loi.length}`);
    for (const [el, ly] of loi) console.log(`        #${el.id} ${el.vi} (${el.sym}): ${ly}`);
  }
  return loi;
}

export async function buildRangeV2(startId, endId) {
  const targets = ELEMENT_REELS.filter(e => e.id >= startId && e.id <= endId);
  const out = [];
  for (const el of targets) out.push(await buildReelV2(el));
  return out;
}

// ─────────────────────────────────────────────────────────────
// CHẠY TỪ DÒNG LỆNH
// ─────────────────────────────────────────────────────────────
if (process.argv[1]?.endsWith('gen-element-reels-v2.mjs')) {
  const [a, b] = process.argv.slice(2);
  const run = async () => {
    if (a === 'nghiemthu' || a === 'verify') {
      const from = b ? Number(b) : 61;
      return nghiemThu(ELEMENT_REELS.filter(e => e.id >= from));
    }
    if (a === 'soi' || a === 'check') {
      const from = b ? Number(b) : 1;
      return kiemTraBoCuc(ELEMENT_REELS.filter(e => e.id >= from));
    }
    if (a === 'stills') {
      const el = ELEMENT_REELS.find(e => String(e.id) === b || e.key === b) || ELEMENT_REELS[10];
      return renderStills(el);
    }
    if (!a || a === 'demo') {
      // 3 clip mẫu để so sánh với bản 1: kim loại nóng chảy trong tay,
      // phi kim của sự sống, kim loại quý.
      const demoKeys = ['element_10_gali', 'element_11_oxy', 'element_03_vang'];
      for (const key of demoKeys) {
        const el = ELEMENT_REELS.find(e => e.key === key);
        if (el) await buildReelV2(el);
      }
      return;
    }
    if (b) return buildRangeV2(Number(a), Number(b));
    const el = ELEMENT_REELS.find(e => String(e.id) === a || e.key === a);
    if (!el) throw new Error(`Không tìm thấy nguyên tố: ${a}`);
    return buildReelV2(el);
  };
  run().catch(err => { console.error('❌ Lỗi:', err.message); process.exit(1); });
}
