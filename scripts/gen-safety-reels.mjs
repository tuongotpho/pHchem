/**
 * gen-safety-reels.mjs — Loạt reel "AN TOÀN HOÁ CHẤT TRONG NHÀ".
 *
 * Dùng chung bộ dựng chuyển động của scripts/gen-element-reels-v2.mjs
 * (nền zoom chậm, chữ hiện theo lớp, hoà tan giữa cảnh, thanh tiến trình)
 * nhưng nhận diện hình ảnh khác hẳn: tông cảnh báo, vạch chéo an toàn,
 * và bố cục 4 cảnh riêng cho nội dung an toàn:
 *
 *   Cảnh 1 — CẢNH BÁO      : việc làm sai + hậu quả, chữ thật to (tông đỏ)
 *   Cảnh 2 — VÌ SAO NGUY HIỂM: phản ứng hoá học thật + 3 ý giải thích (tông hổ phách)
 *   Cảnh 3 — DẤU HIỆU      : nhận biết khi đã dính + mức độ nguy hiểm (tông hổ phách)
 *   Cảnh 4 — LÀM ĐÚNG      : 3 bước xử lý + số cấp cứu 115 (tông xanh lá)
 *
 * Nguyên tắc nội dung: chỉ nêu cách sơ cứu chuẩn và an toàn (ra chỗ thoáng,
 * rửa nhiều nước sạch, gọi 115). KHÔNG bày mẹo tự trung hoà hoá chất trên
 * người, KHÔNG doạ quá mức so với thực tế.
 *
 * Cách chạy:
 *   node scripts/gen-safety-reels.mjs soi        -> soi bố cục, không dựng ảnh
 *   node scripts/gen-safety-reels.mjs stills 1   -> xuất 4 ảnh xem trước
 *   node scripts/gen-safety-reels.mjs 1          -> dựng 1 video
 *   node scripts/gen-safety-reels.mjs all        -> dựng cả loạt
 *   node scripts/gen-safety-reels.mjs nghiemthu  -> nghiệm thu video đã dựng
 */

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { saveSpeech } from './gen-element-reels.mjs';
import { soThanhChu } from './element-data-2.mjs';
import { SAFETY_ROWS } from './safety-rows.mjs';
import {
  W, H, M, CW, FPS, XFADE, PAD,
  FONT_DISPLAY, FONT_TECH, FONT_BODY, FONT_MONO,
  esc, wrapByWidth, fitSize, textLines, writeSvgPng, stripLeadIcon,
  getFfmpegPath, probeDuration, buildScene, renderProgressBar
} from './gen-element-reels-v2.mjs';

const PROMO_DIR = path.join(path.resolve('.'), 'promo');
const OUT_DIR = path.join(PROMO_DIR, 'reels_antoan');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Bảng màu riêng cho loạt an toàn — nền ấm hơn loạt nguyên tố
const S = {
  bg: '#0B0705',
  do: '#EF4444', doNhat: '#FCA5A5',
  ho: '#F59E0B', hoNhat: '#FCD34D',
  luc: '#22C55E', lucNhat: '#86EFAC',
  trang: '#ffffff',
  x200: '#E7E5E4',
  x400: '#A8A29E',
  x500: '#78716C',
  x600: '#57534E'
};

// Khoá một giọng đọc duy nhất cho cả loạt, tránh lẫn giọng giữa các cảnh
const GIONG = 'vi-VN-NamMinhNeural';

// Tông màu từng cảnh: cảnh báo đỏ -> giải thích hổ phách -> xử lý xanh lá
const TONE = [
  { chinh: S.do, phu: S.doNhat, nhan: 'CẢNH BÁO' },
  { chinh: S.ho, phu: S.hoNhat, nhan: 'VÌ SAO NGUY HIỂM' },
  { chinh: S.ho, phu: S.hoNhat, nhan: 'DẤU HIỆU KHI ĐÃ DÍNH' },
  { chinh: S.luc, phu: S.lucNhat, nhan: 'LÀM ĐÚNG THẾ NÀO' }
];

// ─────────────────────────────────────────────────────────────
// NỀN — vạch chéo cảnh báo + tam giác chìm
// ─────────────────────────────────────────────────────────────
async function renderBg(row, idx, dir) {
  const t = TONE[idx];
  const goc = [[0.78, 0.16], [0.20, 0.22], [0.80, 0.70], [0.26, 0.78]][idx];

  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="${goc[0]}" cy="${goc[1]}" r="0.68">
        <stop offset="0%" stop-color="${t.chinh}" stop-opacity="0.30" />
        <stop offset="55%" stop-color="${t.chinh}" stop-opacity="0.08" />
        <stop offset="100%" stop-color="${t.chinh}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="vig" cx="0.5" cy="0.46" r="0.78">
        <stop offset="40%" stop-color="#000000" stop-opacity="0" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.74" />
      </radialGradient>
      <pattern id="soc" width="34" height="34" patternUnits="userSpaceOnUse"
               patternTransform="rotate(45)">
        <rect width="17" height="34" fill="${t.chinh}" fill-opacity="0.14" />
      </pattern>
      <linearGradient id="mo" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#000" stop-opacity="0" />
        <stop offset="100%" stop-color="#000" stop-opacity="1" />
      </linearGradient>
      <mask id="lomSoc">
        <rect width="${W}" height="150" fill="url(#mo)" />
      </mask>
    </defs>

    <rect width="${W}" height="${H}" fill="${S.bg}" />
    <rect width="${W}" height="${H}" fill="url(#glow)" />

    <!-- Dải vạch chéo cảnh báo, nhạt dần về bên trái -->
    <g mask="url(#lomSoc)">
      <rect y="0" width="${W}" height="150" fill="url(#soc)" />
    </g>

    <!-- Tam giác cảnh báo chìm làm hoa văn nền -->
    <g opacity="0.035" transform="translate(540, ${[1180, 1280, 760, 1240][idx]}) scale(${[7.2, 6.4, 6.0, 6.4][idx]})">
      <path d="M 0 -50 L 58 52 L -58 52 Z" fill="none" stroke="#ffffff" stroke-width="7"
            stroke-linejoin="round" />
    </g>

    <rect width="${W}" height="${H}" fill="url(#vig)" />
    <rect x="0" y="0" width="${W}" height="7" fill="#ffffff" fill-opacity="0.12" />
  </svg>`;
  return writeSvgPng(svg, path.join(dir, `bg_0${idx + 1}.png`));
}

// ─────────────────────────────────────────────────────────────
// MẢNH DÙNG CHUNG
// ─────────────────────────────────────────────────────────────
function header(idx) {
  const t = TONE[idx];
  return `
    <path d="M ${M} 182 L ${M + 9} 166 L ${M + 18} 182 Z" fill="${t.chinh}" />
    <text x="${M + 32}" y="181" font-family="${FONT_TECH}" font-size="24" letter-spacing="6"
          fill="${S.x500}">AN TOÀN HOÁ CHẤT</text>
    <text x="${W - M}" y="181" font-family="${FONT_TECH}" font-size="24" letter-spacing="6"
          fill="${S.x600}" text-anchor="end">0${idx + 1} / 04</text>`;
}

function footer(idx) {
  const t = TONE[idx];
  return `
    <rect x="${M}" y="1660" width="${CW}" height="1" fill="#ffffff" fill-opacity="0.10" />
    <text x="${M}" y="1706" font-family="${FONT_TECH}" font-size="26" letter-spacing="3"
          fill="${S.x500}">ph-chem.web.app</text>
    <text x="${W - M}" y="1706" font-family="${FONT_TECH}" font-size="26" letter-spacing="3"
          fill="${t.chinh}" text-anchor="end">pH-CHEM</text>`;
}

function nhanMuc(idx, chu) {
  const t = TONE[idx];
  return `
    <rect x="${M}" y="${300 - 22}" width="5" height="28" rx="2.5" fill="${t.chinh}" />
    <text x="${M + 22}" y="300" font-family="${FONT_TECH}" font-size="28" letter-spacing="7"
          fill="${t.phu}">${esc(chu)}</text>`;
}

const layer = inner => `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// ─────────────────────────────────────────────────────────────
// CẢNH 1 — CẢNH BÁO
// ─────────────────────────────────────────────────────────────
async function canh1(r, dir) {
  const t = TONE[0];
  const cxV = W / 2;

  const dangerSize = fitSize(r.danger, CW, 70, 40, 2, 0.67);
  const dangerLines = wrapByWidth(r.danger, dangerSize, CW, 0.67).slice(0, 2);

  const l1 = layer(`
    ${header(0)}
    <text x="${cxV}" y="300" font-family="${FONT_TECH}" font-size="30" letter-spacing="10"
          fill="${t.chinh}" text-anchor="middle">${esc(t.nhan)}</text>
    ${textLines(dangerLines, cxV, 400, dangerSize + 14,
      `font-family="${FONT_DISPLAY}" font-size="${dangerSize}" fill="#ffffff" text-anchor="middle" letter-spacing="-1"`)}

    <!-- Tam giác cảnh báo -->
    <g transform="translate(${cxV}, 900)">
      <path d="M 0 -170 L 196 175 L -196 175 Z" fill="${t.chinh}" fill-opacity="0.12" />
      <path d="M 0 -170 L 196 175 L -196 175 Z" fill="none" stroke="${t.chinh}"
            stroke-width="9" stroke-linejoin="round" />
      <rect x="-17" y="-58" width="34" height="150" rx="17" fill="${t.chinh}" />
      <circle cx="0" cy="130" r="20" fill="${t.chinh}" />
    </g>
  `);

  const hqSize = fitSize(r.hauQua, CW, 62, 36, 2, 0.67);
  const hqLines = wrapByWidth(r.hauQua, hqSize, CW, 0.67).slice(0, 2);
  const hookLines = wrapByWidth(r.hook, 33, CW - 40, 0.50).slice(0, 2);

  const l2 = layer(`
    <rect x="${cxV - 60}" y="1146" width="120" height="3" fill="${t.chinh}" fill-opacity="0.8" />
    ${textLines(hqLines, cxV, 1240, hqSize + 12,
      `font-family="${FONT_DISPLAY}" font-size="${hqSize}" fill="${t.phu}" text-anchor="middle"`)}
    ${textLines(hookLines, cxV, 1240 + hqLines.length * (hqSize + 12) + 40, 46,
      `font-family="${FONT_BODY}" font-size="33" fill="${S.x400}" text-anchor="middle"`)}
    ${footer(0)}
  `);

  return [await writeSvgPng(l1, path.join(dir, 's1_a.png')),
          await writeSvgPng(l2, path.join(dir, 's1_b.png'))];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 2 — VÌ SAO NGUY HIỂM (phản ứng thật + 3 ý)
// ─────────────────────────────────────────────────────────────
async function canh2(r, dir) {
  const t = TONE[1];
  const tSize = fitSize(r.chatTitle, CW, 62, 34, 2, 0.67);
  const tLines = wrapByWidth(r.chatTitle, tSize, CW, 0.67).slice(0, 2);

  const l1 = layer(`
    ${header(1)}
    ${nhanMuc(1, t.nhan)}
    ${textLines(tLines, M, 400, tSize + 14,
      `font-family="${FONT_DISPLAY}" font-size="${tSize}" fill="#ffffff" letter-spacing="-1"`)}
    ${footer(1)}
  `);

  const rxSize = fitSize(r.reaction, CW - 100, 40, 24, 2, 0.56);
  const rxLines = wrapByWidth(r.reaction, rxSize, CW - 100, 0.56).slice(0, 2);
  const rxH = 118 + rxLines.length * (rxSize + 14);
  const rxTop = 560;

  let y = rxTop + rxH + 74;
  const yBullets = r.why.slice(0, 3).map((raw, i) => {
    const lines = wrapByWidth(stripLeadIcon(raw), 33, CW - 96, 0.50);
    const block = `
      <circle cx="${M + 22}" cy="${y - 10}" r="23" fill="${t.chinh}" fill-opacity="0.18" />
      <text x="${M + 22}" y="${y - 1}" font-family="${FONT_TECH}" font-size="22" font-weight="700"
            fill="${t.phu}" text-anchor="middle">0${i + 1}</text>
      ${textLines(lines, M + 96, y, 46, `font-family="${FONT_BODY}" font-size="33" fill="${S.x200}"`)}`;
    y += lines.length * 46 + 104;
    return block;
  }).join('\n');

  const l2 = layer(`
    <rect x="${M}" y="${rxTop}" width="${CW}" height="${rxH}" rx="26" fill="#050302" fill-opacity="0.92" />
    <rect x="${M}" y="${rxTop}" width="${CW}" height="${rxH}" rx="26" fill="none"
          stroke="${t.chinh}" stroke-opacity="0.5" stroke-width="2" />
    <text x="${M + 44}" y="${rxTop + 50}" font-family="${FONT_TECH}" font-size="23" letter-spacing="6"
          fill="${S.x600}">${esc(r.reactionLabel || 'PHẢN ỨNG XẢY RA')}</text>
    ${textLines(rxLines, W / 2, rxTop + 110, rxSize + 14,
      `font-family="${FONT_MONO}" font-size="${rxSize}" font-weight="700" fill="${t.phu}" text-anchor="middle"`)}
    ${yBullets}
  `);

  return [await writeSvgPng(l1, path.join(dir, 's2_a.png')),
          await writeSvgPng(l2, path.join(dir, 's2_b.png'))];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 3 — DẤU HIỆU + MỨC ĐỘ
// ─────────────────────────────────────────────────────────────
async function canh3(r, dir) {
  const t = TONE[2];
  const l1 = layer(`
    ${header(2)}
    ${nhanMuc(2, t.nhan)}
    <text x="${M}" y="400" font-family="${FONT_DISPLAY}" font-size="70" fill="#ffffff"
          letter-spacing="-1">NHẬN BIẾT SỚM</text>
    ${footer(2)}
  `);

  let y = 560;
  const ds = r.dauHieu.slice(0, 3).map(raw => {
    const lines = wrapByWidth(stripLeadIcon(raw), 34, CW - 90, 0.50);
    const block = `
      <path d="M ${M} ${y - 26} L ${M + 26} ${y - 12} L ${M} ${y + 2} Z" fill="${t.chinh}" />
      ${textLines(lines, M + 56, y, 46, `font-family="${FONT_BODY}" font-size="34" fill="#ffffff"`)}
      <rect x="${M}" y="${y + lines.length * 46 + 4}" width="${CW}" height="1"
            fill="#ffffff" fill-opacity="0.08" />`;
    y += lines.length * 46 + 92;
    return block;
  }).join('\n');

  const mdLines = wrapByWidth(r.mucDo, 36, CW - 120, 0.50);
  const mdTop = Math.max(y - 30, 1200);
  const mdH = Math.max(200, 118 + mdLines.length * 48);

  const l2 = layer(`
    ${ds}
    <rect x="${M}" y="${mdTop}" width="${CW}" height="${mdH}" rx="26" fill="${S.do}" fill-opacity="0.10" />
    <rect x="${M}" y="${mdTop}" width="5" height="${mdH}" rx="2.5" fill="${S.do}" />
    <text x="${M + 46}" y="${mdTop + 56}" font-family="${FONT_TECH}" font-size="24" letter-spacing="6"
          fill="${S.doNhat}">MỨC ĐỘ NGUY HIỂM</text>
    ${textLines(mdLines, M + 46, mdTop + 118, 48,
      `font-family="${FONT_BODY}" font-size="36" font-weight="600" fill="#ffffff"`)}
  `);

  return [await writeSvgPng(l1, path.join(dir, 's3_a.png')),
          await writeSvgPng(l2, path.join(dir, 's3_b.png'))];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 4 — LÀM ĐÚNG + CẤP CỨU
// ─────────────────────────────────────────────────────────────
async function canh4(r, dir) {
  const t = TONE[3];
  const l1 = layer(`
    ${header(3)}
    ${nhanMuc(3, t.nhan)}
    <text x="${M}" y="400" font-family="${FONT_DISPLAY}" font-size="70" fill="#ffffff"
          letter-spacing="-1">3 BƯỚC AN TOÀN</text>
    ${footer(3)}
  `);

  let y = 545;
  const buoc = r.lamDung.slice(0, 3).map((raw, i) => {
    const lines = wrapByWidth(stripLeadIcon(raw), 34, CW - 110, 0.50);
    const block = `
      <text x="${M}" y="${y + 4}" font-family="${FONT_TECH}" font-size="44" font-weight="700"
            fill="${t.chinh}" fill-opacity="0.9">0${i + 1}</text>
      ${textLines(lines, M + 106, y, 46, `font-family="${FONT_BODY}" font-size="34" fill="#ffffff"`)}
      <rect x="${M}" y="${y + lines.length * 46 + 6}" width="${CW}" height="1"
            fill="#ffffff" fill-opacity="0.08" />`;
    y += lines.length * 46 + 78;
    return block;
  }).join('\n');

  const ccLines = wrapByWidth(r.capCuu, 33, CW - 130, 0.50).slice(0, 3);
  const ccTop = 1130;
  const ccH = 130 + ccLines.length * 44;

  const l2 = layer(`
    ${buoc}
    <rect x="${M}" y="${ccTop}" width="${CW}" height="${ccH}" rx="28" fill="${S.do}" fill-opacity="0.12" />
    <rect x="${M}" y="${ccTop}" width="${CW}" height="${ccH}" rx="28" fill="none"
          stroke="${S.do}" stroke-opacity="0.55" stroke-width="2" />
    <text x="${M + 46}" y="${ccTop + 58}" font-family="${FONT_DISPLAY}" font-size="34"
          fill="${S.doNhat}">NẾU ĐÃ DÍNH — GỌI 115</text>
    ${textLines(ccLines, M + 46, ccTop + 112, 44,
      `font-family="${FONT_BODY}" font-size="33" fill="#ffffff"`)}

    <text x="${W / 2}" y="${ccTop + ccH + 78}" font-family="${FONT_BODY}" font-size="30"
          fill="${S.x400}" text-anchor="middle">Tra tính chất từng hoá chất tại</text>
    <text x="${W / 2}" y="${ccTop + ccH + 126}" font-family="${FONT_DISPLAY}" font-size="40"
          fill="${t.chinh}" text-anchor="middle">ph-chem.web.app</text>
  `);

  return [await writeSvgPng(l1, path.join(dir, 's4_a.png')),
          await writeSvgPng(l2, path.join(dir, 's4_b.png'))];
}

// ─────────────────────────────────────────────────────────────
// LỜI THUYẾT MINH
// ─────────────────────────────────────────────────────────────
function loiDoc(r) {
  const cau = [
    `Cảnh báo! ${soThanhChu(r.dangerSay || r.danger)}. ${soThanhChu(r.hauQuaSay || r.hauQua)}. ${soThanhChu(r.hook)}`,
    `Vì sao nguy hiểm? ${soThanhChu(stripLeadIcon(r.why[0]))} ${soThanhChu(stripLeadIcon(r.why[1]))}`,
    `Dấu hiệu nhận biết: ${soThanhChu(stripLeadIcon(r.dauHieu[0]))} ${soThanhChu(stripLeadIcon(r.dauHieu[1]))} ${soThanhChu(r.mucDo)}`,
    `Làm đúng thế nào? ${soThanhChu(stripLeadIcon(r.lamDung[0]))} ${soThanhChu(stripLeadIcon(r.lamDung[1]))} `
      + `Nếu đã dính, gọi ngay một một năm. Tra tính chất từng hoá chất tại ph-chem.web.app nhé!`
  ];
  return cau.map(t => t.replace(/\s+/g, ' ').trim());
}

// ─────────────────────────────────────────────────────────────
// SOI BỐ CỤC (không cần dựng ảnh)
// ─────────────────────────────────────────────────────────────
export function soiBoCuc(list) {
  const loi = [];
  for (const r of list) {
    const v = [];
    if (fitSize(r.danger, CW, 70, 40, 2, 0.67) <= 40) v.push('C1: câu "việc làm sai" quá dài');
    if (wrapByWidth(r.hook, 33, CW - 40, 0.50).length > 2) v.push('C1: câu dẫn quá 2 dòng');
    if (fitSize(r.hauQua, CW, 62, 36, 2, 0.67) <= 36) v.push('C1: câu "hậu quả" quá dài');
    if (fitSize(r.chatTitle, CW, 62, 34, 2, 0.67) <= 34) v.push('C2: tiêu đề quá dài');
    if (wrapByWidth(r.reaction, fitSize(r.reaction, CW - 100, 40, 24, 2, 0.56), CW - 100, 0.56).length > 2)
      v.push('C2: phương trình quá dài, bị cắt');

    let y = 560 + 118 + wrapByWidth(r.reaction, 40, CW - 100, 0.56).length * 54 + 74;
    for (const b of r.why.slice(0, 3)) y += wrapByWidth(stripLeadIcon(b), 33, CW - 96, 0.50).length * 46 + 104;
    if (y - 104 > 1560) v.push(`C2: 3 ý giải thích cao tới y=${Math.round(y - 48)} (giới hạn 1560)`);

    let y3 = 560;
    for (const b of r.dauHieu.slice(0, 3)) y3 += wrapByWidth(stripLeadIcon(b), 34, CW - 90, 0.50).length * 46 + 92;
    if (y3 - 92 > 1200) v.push(`C3: 3 dấu hiệu cao tới y=${Math.round(y3 - 92)} (giới hạn 1200)`);
    if (wrapByWidth(r.mucDo, 36, CW - 120, 0.50).length > 3) v.push('C3: câu mức độ quá 3 dòng');

    let y4 = 545;
    for (const b of r.lamDung.slice(0, 3)) y4 += wrapByWidth(stripLeadIcon(b), 34, CW - 110, 0.50).length * 46 + 78;
    if (y4 - 78 > 1130) v.push(`C4: 3 bước cao tới y=${Math.round(y4 - 78)} (giới hạn 1130)`);
    if (wrapByWidth(r.capCuu, 33, CW - 130, 0.50).length > 3) v.push('C4: câu cấp cứu quá 3 dòng');

    if (v.length) loi.push({ r, v });
  }
  console.log(`\n🔎 Soi bố cục ${list.length} chủ đề an toàn:`);
  if (!loi.length) console.log('   ✅ Không có chủ đề nào bị tràn hay bị cắt chữ.');
  else {
    for (const { r, v } of loi) {
      console.log(`   ⚠️  #${r.id} ${r.danger}`);
      v.forEach(x => console.log(`        - ${x}`));
    }
  }
  return loi;
}

export async function renderStills(r) {
  const dir = path.join(OUT_DIR, r.key);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const bgs = [];
  for (let i = 0; i < 4; i++) bgs.push(await renderBg(r, i, dir));
  const lop = [await canh1(r, dir), await canh2(r, dir), await canh3(r, dir), await canh4(r, dir)];
  const outs = [];
  for (let i = 0; i < 4; i++) {
    const out = path.join(dir, `preview_0${i + 1}.jpg`);
    await sharp(bgs[i]).composite([{ input: lop[i][0] }, { input: lop[i][1] }])
      .jpeg({ quality: 92 }).toFile(out);
    outs.push(out);
  }
  console.log('🖼️  Ảnh xem trước:\n   ' + outs.join('\n   '));
  return outs;
}

// ─────────────────────────────────────────────────────────────
// DỰNG VIDEO
// ─────────────────────────────────────────────────────────────
export async function buildSafetyReel(r) {
  const ffmpeg = getFfmpegPath();
  const dir = path.join(OUT_DIR, r.key);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const videoOut = path.join(OUT_DIR, `${r.key}.mp4`);
  if (fs.existsSync(videoOut) && fs.statSync(videoOut).size > 500000 && !process.env.FORCE) {
    console.log(`⏩ Đã có ${videoOut}, bỏ qua (FORCE=1 để dựng lại).`);
    return videoOut;
  }

  console.log(`\n🎬 [AN TOÀN #${r.id}] ${r.danger}`);

  const texts = loiDoc(r);
  const speeches = [];
  for (let i = 0; i < 4; i++) {
    const f = path.join(dir, `speech_0${i + 1}.mp3`);
    if (!fs.existsSync(f)) {
      console.log(`   🎙️  Tạo giọng đọc cảnh ${i + 1}...`);
      await saveSpeech(f, texts[i], '+10%', GIONG);
    }
    speeches.push(f);
  }

  const durs = speeches.map((s, i) => Math.max(probeDuration(ffmpeg, s) + PAD + (i === 3 ? 0.7 : 0), 3.6));
  const offsets = [];
  let acc = 0;
  durs.forEach((d, i) => { offsets.push(acc); acc += d - (i < durs.length - 1 ? XFADE : 0); });
  const total = offsets[3] + durs[3];
  console.log(`   ⏱️  Thời lượng: ${total.toFixed(1)}s`);

  console.log('   🎨 Kết xuất 4 nền + 8 lớp chữ...');
  const bgs = [];
  for (let i = 0; i < 4; i++) bgs.push(await renderBg(r, i, dir));
  const lop = [await canh1(r, dir), await canh2(r, dir), await canh3(r, dir), await canh4(r, dir)];
  const bar = await renderProgressBar({ themeColor: S.ho, accentColor: S.hoNhat }, dir);

  const sceneFiles = [];
  for (let i = 0; i < 4; i++) {
    console.log(`   ⚙️  Dựng cảnh ${i + 1}/4...`);
    sceneFiles.push(buildScene(ffmpeg, {
      bg: bgs[i], layerA: lop[i][0], layerB: lop[i][1], bar,
      dur: durs[i], out: path.join(dir, `scene_0${i + 1}.mp4`),
      offset: offsets[i], total
    }));
  }

  console.log('   🎞️  Ghép cảnh + trộn tiếng...');
  const vParts = [];
  let last = '[0:v]';
  for (let i = 1; i < 4; i++) {
    const lbl = i === 3 ? '[vx]' : `[vx${i}]`;
    vParts.push(`${last}[${i}:v]xfade=transition=fade:duration=${XFADE}:offset=${offsets[i].toFixed(3)}${lbl}`);
    last = lbl;
  }
  const vFinal = `[vx]fade=t=in:st=0:d=0.5,fade=t=out:st=${(total - 0.6).toFixed(3)}:d=0.6,format=yuv420p[vfin]`;
  const aParts = speeches.map((_, i) => {
    const ms = Math.round(offsets[i] * 1000);
    return `[${i + 4}:a]adelay=${ms}|${ms},aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a${i}]`;
  });
  aParts.push('[a0][a1][a2][a3]amix=inputs=4:normalize=0:dropout_transition=0,alimiter=limit=0.95:level=false[aout]');

  const args = [
    '-y',
    ...sceneFiles.flatMap(f => ['-i', f]),
    ...speeches.flatMap(f => ['-i', f]),
    '-filter_complex', [...vParts, vFinal, ...aParts].join(';'),
    '-map', '[vfin]', '-map', '[aout]',
    '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-profile:v', 'high', '-level', '4.1',
    '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '160k', '-ar', '48000',
    '-movflags', '+faststart', '-t', total.toFixed(3),
    videoOut
  ];
  const res = spawnSync(ffmpeg, args, { encoding: 'utf8' });
  if (res.status !== 0) {
    console.error(res.stderr?.slice(-4000));
    throw new Error('FFmpeg lỗi khi ghép: ' + r.key);
  }
  console.log(`   ✅ Xong: ${videoOut} (${(fs.statSync(videoOut).size / 1048576).toFixed(2)} MB)`);
  return videoOut;
}

export function nghiemThu(list) {
  const ffmpeg = getFfmpegPath();
  const loi = [];
  let ok = 0, tongGiay = 0, tongMB = 0;
  for (const r of list) {
    const f = path.join(OUT_DIR, `${r.key}.mp4`);
    if (!fs.existsSync(f)) { loi.push([r, 'chưa dựng']); continue; }
    const st = fs.statSync(f);
    const info = spawnSync(ffmpeg, ['-i', f], { encoding: 'utf8' }).stderr || '';
    const md = info.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    const dur = md ? (+md[1]) * 3600 + (+md[2]) * 60 + parseFloat(md[3]) : 0;
    const mr = info.match(/,\s*(\d{3,4})x(\d{3,4})/);
    const v = [];
    if (!mr || `${mr[1]}x${mr[2]}` !== '1080x1920') v.push('sai khung hình');
    if (!/Audio:\s*aac/.test(info)) v.push('thiếu tiếng');
    if (dur < 25 || dur > 90) v.push(`thời lượng ${dur.toFixed(1)}s`);
    if (st.size < 1_000_000) v.push('file quá nhỏ');
    if (v.length) loi.push([r, v.join(', ')]);
    else { ok++; tongGiay += dur; tongMB += st.size / 1048576; }
  }
  console.log(`\n📋 Nghiệm thu ${list.length} video an toàn:`);
  console.log(`   ✅ Đạt: ${ok}/${list.length}` +
    (ok ? ` — trung bình ${(tongGiay / ok).toFixed(1)}s, ${(tongMB / ok).toFixed(2)} MB` : ''));
  for (const [r, ly] of loi) console.log(`        #${r.id} ${r.danger}: ${ly}`);
  return loi;
}

// ─────────────────────────────────────────────────────────────
if (process.argv[1]?.endsWith('gen-safety-reels.mjs')) {
  const [a, b] = process.argv.slice(2);
  const tim = k => SAFETY_ROWS.find(x => String(x.id) === k || x.key === k);
  const run = async () => {
    if (a === 'soi') return soiBoCuc(SAFETY_ROWS);
    if (a === 'nghiemthu') return nghiemThu(SAFETY_ROWS);
    if (a === 'stills') return renderStills(tim(b) || SAFETY_ROWS[0]);
    if (!a || a === 'all') {
      // Một mẩu hỏng (thường do dịch vụ đọc chập) không được giết cả loạt:
      // ghi lại rồi chạy tiếp, cuối cùng liệt kê những mẩu cần dựng lại.
      const hong = [];
      for (const r of SAFETY_ROWS) {
        try { await buildSafetyReel(r); }
        catch (e) { console.error(`   ⛔ Bỏ qua #${r.id}: ${e.message}`); hong.push(r.id); }
      }
      if (hong.length) console.log(`\n⚠️  ${hong.length} mẩu chưa dựng được, chạy lại: ${hong.join(' ')}`);
      else console.log('\n🎉 Dựng xong toàn bộ.');
      return;
    }
    const r = tim(a);
    if (!r) throw new Error(`Không tìm thấy chủ đề: ${a}`);
    return buildSafetyReel(r);
  };
  run().catch(e => { console.error('❌ Lỗi:', e.message); process.exit(1); });
}
