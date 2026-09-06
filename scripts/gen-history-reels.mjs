/**
 * gen-history-reels.mjs — Loạt reel "LỊCH SỬ HOÁ HỌC".
 *
 * Dùng chung bộ dựng chuyển động của scripts/gen-element-reels-v2.mjs,
 * nhưng nhận diện riêng: tông vàng đồng cổ trên nền mực, và bố cục 4 cảnh
 * theo đúng mạch kể một câu chuyện:
 *
 *   Cảnh 1 — MỐC THỜI GIAN : năm thật to + tên nhân vật + câu dẫn
 *   Cảnh 2 — TRƯỚC ĐÓ      : thế giới đang tin điều gì, vướng ở đâu
 *   Cảnh 3 — BƯỚC NGOẶT    : chuyện gì đã xảy ra + khung dữ kiện chốt
 *   Cảnh 4 — ĐỂ LẠI GÌ     : di sản tới hôm nay + câu kết
 *
 * Cách chạy:
 *   node scripts/gen-history-reels.mjs soi        -> soi bố cục
 *   node scripts/gen-history-reels.mjs stills 1   -> xuất 4 ảnh xem trước
 *   node scripts/gen-history-reels.mjs 1          -> dựng 1 video
 *   node scripts/gen-history-reels.mjs all        -> dựng cả loạt
 *   node scripts/gen-history-reels.mjs nghiemthu  -> nghiệm thu
 */

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { saveSpeech } from './gen-element-reels.mjs';
import { soThanhChu } from './element-data-2.mjs';
import { HISTORY_ROWS } from './history-rows.mjs';
import {
  W, H, M, CW, FPS, XFADE, PAD,
  FONT_DISPLAY, FONT_TECH, FONT_BODY, FONT_MONO, FONT_QUOTE,
  esc, wrapByWidth, fitSize, textLines, writeSvgPng, stripLeadIcon,
  getFfmpegPath, probeDuration, buildScene, renderProgressBar
} from './gen-element-reels-v2.mjs';

const PROMO_DIR = path.join(path.resolve('.'), 'promo');
const OUT_DIR = path.join(PROMO_DIR, 'reels_lichsu');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Tông vàng đồng cổ trên nền mực — gợi cảm giác tư liệu cũ
const C = {
  bg: '#080A12',
  vang: '#D4A857', vangNhat: '#F0D9A0',
  giay: '#F5F1E8',
  x300: '#CFCABE',
  x400: '#9C968A',
  x500: '#736E64',
  x600: '#54504A'
};

// Khoá một giọng đọc duy nhất cho cả loạt, tránh lẫn giọng giữa các cảnh
const GIONG = 'vi-VN-NamMinhNeural';

const NHAN = ['LỊCH SỬ HOÁ HỌC', 'TRƯỚC ĐÓ NGƯỜI TA TIN', 'BƯỚC NGOẶT', 'ĐỂ LẠI GÌ HÔM NAY'];

// ─────────────────────────────────────────────────────────────
// NỀN — nét khắc ngang kiểu bản in cũ + năm chìm
// ─────────────────────────────────────────────────────────────
async function renderBg(r, idx, dir) {
  const goc = [[0.5, 0.30], [0.20, 0.24], [0.80, 0.68], [0.28, 0.76]][idx];
  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="${goc[0]}" cy="${goc[1]}" r="0.70">
        <stop offset="0%" stop-color="${C.vang}" stop-opacity="0.22" />
        <stop offset="55%" stop-color="${C.vang}" stop-opacity="0.06" />
        <stop offset="100%" stop-color="${C.vang}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="vig" cx="0.5" cy="0.46" r="0.78">
        <stop offset="38%" stop-color="#000000" stop-opacity="0" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.78" />
      </radialGradient>
    </defs>

    <rect width="${W}" height="${H}" fill="${C.bg}" />
    <rect width="${W}" height="${H}" fill="url(#glow)" />

    ${idx === 0 ? '' : `<text x="${W / 2}" y="${[0, 1300, 780, 1260][idx]}" font-family="${FONT_DISPLAY}"
          font-size="620" fill="${C.giay}" fill-opacity="0.022" text-anchor="middle">${esc(r.nam)}</text>`}

    <rect width="${W}" height="${H}" fill="url(#vig)" />
    <rect x="0" y="0" width="${W}" height="7" fill="#ffffff" fill-opacity="0.12" />
  </svg>`;
  return writeSvgPng(svg, path.join(dir, `bg_0${idx + 1}.png`));
}

// ─────────────────────────────────────────────────────────────
function header(idx) {
  return `
    <rect x="${M}" y="168" width="14" height="14" rx="7" fill="${C.vang}" />
    <text x="${M + 32}" y="181" font-family="${FONT_TECH}" font-size="24" letter-spacing="6"
          fill="${C.x500}">LỊCH SỬ HOÁ HỌC</text>
    <text x="${W - M}" y="181" font-family="${FONT_TECH}" font-size="24" letter-spacing="6"
          fill="${C.x600}" text-anchor="end">0${idx + 1} / 04</text>`;
}

function footer() {
  return `
    <rect x="${M}" y="1660" width="${CW}" height="1" fill="${C.giay}" fill-opacity="0.10" />
    <text x="${M}" y="1706" font-family="${FONT_TECH}" font-size="26" letter-spacing="3"
          fill="${C.x500}">ph-chem.web.app</text>
    <text x="${W - M}" y="1706" font-family="${FONT_TECH}" font-size="26" letter-spacing="3"
          fill="${C.vang}" text-anchor="end">pH-CHEM</text>`;
}

function nhanMuc(idx) {
  return `
    <rect x="${M}" y="278" width="5" height="28" rx="2.5" fill="${C.vang}" />
    <text x="${M + 22}" y="300" font-family="${FONT_TECH}" font-size="28" letter-spacing="7"
          fill="${C.vangNhat}">${esc(NHAN[idx])}</text>`;
}

const layer = inner => `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

/** Khối 3 gạch đầu dòng có số thứ tự, dùng chung cho cảnh 2, 3, 4 */
function danhSach(items, yStart, khoang, mauSo) {
  let y = yStart;
  const svg = items.slice(0, 3).map((raw, i) => {
    const lines = wrapByWidth(stripLeadIcon(raw), 33, CW - 96, 0.50);
    const block = `
      <text x="${M}" y="${y + 2}" font-family="${FONT_TECH}" font-size="40" font-weight="700"
            fill="${mauSo}" fill-opacity="0.85">0${i + 1}</text>
      ${textLines(lines, M + 92, y, 46, `font-family="${FONT_BODY}" font-size="33" fill="${C.x300}"`)}`;
    y += lines.length * 46 + khoang;
    return block;
  }).join('\n');
  return { svg, cuoi: y - khoang };
}

// ─────────────────────────────────────────────────────────────
// CẢNH 1 — MỐC THỜI GIAN
// ─────────────────────────────────────────────────────────────
async function canh1(r, dir) {
  const cx = W / 2;
  const namSize = fitSize(r.nam, CW - 120, 300, 150, 1, 0.62);

  const l1 = layer(`
    ${header(0)}
    <text x="${cx}" y="410" font-family="${FONT_TECH}" font-size="30" letter-spacing="10"
          fill="${C.x500}" text-anchor="middle">${esc(r.moc || 'NĂM')}</text>
    <text x="${cx}" y="${660 + namSize * 0.16}" font-family="${FONT_DISPLAY}" font-size="${namSize}"
          fill="${C.vang}" text-anchor="middle" letter-spacing="-4">${esc(r.nam)}</text>
    <rect x="${cx - 150}" y="770" width="300" height="2" fill="${C.vang}" fill-opacity="0.55" />
  `);

  const tenSize = fitSize(r.nhanVat, CW, 72, 38, 2, 0.66);
  const tenLines = wrapByWidth(r.nhanVat, tenSize, CW, 0.66).slice(0, 2);
  const danhLines = wrapByWidth(r.danh, 32, CW - 40, 0.55).slice(0, 2);
  const hookLines = wrapByWidth(r.hook, 36, CW - 40, 0.50).slice(0, 3);
  const yDanh = 900 + tenLines.length * (tenSize + 10);

  const l2 = layer(`
    ${textLines(tenLines, cx, 900, tenSize + 10,
      `font-family="${FONT_DISPLAY}" font-size="${tenSize}" fill="${C.giay}" text-anchor="middle" letter-spacing="-1"`)}
    ${textLines(danhLines, cx, yDanh + 26, 44,
      `font-family="${FONT_TECH}" font-size="32" letter-spacing="5" fill="${C.x400}" text-anchor="middle"`)}
    <rect x="${cx - 60}" y="${yDanh + 26 + danhLines.length * 44 + 40}" width="120" height="2"
          fill="${C.vang}" fill-opacity="0.5" />
    ${textLines(hookLines, cx, yDanh + 26 + danhLines.length * 44 + 130, 52,
      `font-family="${FONT_QUOTE}" font-size="36" font-style="italic" font-weight="600" fill="${C.giay}" text-anchor="middle"`)}
    ${footer()}
  `);

  return [await writeSvgPng(l1, path.join(dir, 's1_a.png')),
          await writeSvgPng(l2, path.join(dir, 's1_b.png'))];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 2 — TRƯỚC ĐÓ NGƯỜI TA TIN GÌ
// ─────────────────────────────────────────────────────────────
async function canh2(r, dir) {
  const tSize = fitSize(r.truocDo, CW, 62, 34, 2, 0.67);
  const tLines = wrapByWidth(r.truocDo, tSize, CW, 0.67).slice(0, 2);

  const l1 = layer(`
    ${header(1)}
    ${nhanMuc(1)}
    ${textLines(tLines, M, 400, tSize + 14,
      `font-family="${FONT_DISPLAY}" font-size="${tSize}" fill="${C.giay}" letter-spacing="-1"`)}
    ${footer()}
  `);

  const { svg } = danhSach(r.boiCanh, 580, 104, C.vang);
  const l2 = layer(svg);

  return [await writeSvgPng(l1, path.join(dir, 's2_a.png')),
          await writeSvgPng(l2, path.join(dir, 's2_b.png'))];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 3 — BƯỚC NGOẶT
// ─────────────────────────────────────────────────────────────
async function canh3(r, dir) {
  const tSize = fitSize(r.moment, CW, 62, 34, 2, 0.67);
  const tLines = wrapByWidth(r.moment, tSize, CW, 0.67).slice(0, 2);

  const l1 = layer(`
    ${header(2)}
    ${nhanMuc(2)}
    ${textLines(tLines, M, 400, tSize + 14,
      `font-family="${FONT_DISPLAY}" font-size="${tSize}" fill="${C.giay}" letter-spacing="-1"`)}
    ${footer()}
  `);

  const { svg, cuoi } = danhSach(r.chiTiet, 580, 96, C.vang);
  const rxSize = fitSize(r.dukien, CW - 100, 38, 22, 2, 0.56);
  const rxLines = wrapByWidth(r.dukien, rxSize, CW - 100, 0.56).slice(0, 2);
  const rxTop = Math.max(cuoi + 60, 1230);
  const rxH = 112 + rxLines.length * (rxSize + 14);

  const l2 = layer(`
    ${svg}
    <rect x="${M}" y="${rxTop}" width="${CW}" height="${rxH}" rx="26" fill="#040610" fill-opacity="0.92" />
    <rect x="${M}" y="${rxTop}" width="${CW}" height="${rxH}" rx="26" fill="none"
          stroke="${C.vang}" stroke-opacity="0.45" stroke-width="2" />
    <text x="${M + 44}" y="${rxTop + 48}" font-family="${FONT_TECH}" font-size="23" letter-spacing="6"
          fill="${C.x600}">${esc(r.dukienLabel || 'DỮ KIỆN CHỐT')}</text>
    ${textLines(rxLines, W / 2, rxTop + 104, rxSize + 14,
      `font-family="${FONT_MONO}" font-size="${rxSize}" font-weight="700" fill="${C.vangNhat}" text-anchor="middle"`)}
  `);

  return [await writeSvgPng(l1, path.join(dir, 's3_a.png')),
          await writeSvgPng(l2, path.join(dir, 's3_b.png'))];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 4 — DI SẢN
// ─────────────────────────────────────────────────────────────
async function canh4(r, dir) {
  const l1 = layer(`
    ${header(3)}
    ${nhanMuc(3)}
    <text x="${M}" y="400" font-family="${FONT_DISPLAY}" font-size="70" fill="${C.giay}"
          letter-spacing="-1">DẤU VẾT CÒN LẠI</text>
    ${footer()}
  `);

  const { svg, cuoi } = danhSach(r.diSan, 560, 96, C.vang);
  const klLines = wrapByWidth(r.ketLuan, 38, CW - 100, 0.50).slice(0, 3);
  const klTop = Math.max(cuoi + 50, 1150);
  const klH = 100 + klLines.length * 50;

  const l2 = layer(`
    ${svg}
    <rect x="${M}" y="${klTop}" width="5" height="${klH}" rx="2.5" fill="${C.vang}" />
    ${textLines(klLines, M + 44, klTop + 62, 50,
      `font-family="${FONT_QUOTE}" font-size="38" font-style="italic" font-weight="600" fill="${C.giay}"`)}

    <text x="${W / 2}" y="${klTop + klH + 76}" font-family="${FONT_BODY}" font-size="30"
          fill="${C.x400}" text-anchor="middle">Tra cứu 118 nguyên tố và công thức tại</text>
    <text x="${W / 2}" y="${klTop + klH + 126}" font-family="${FONT_DISPLAY}" font-size="42"
          fill="${C.vang}" text-anchor="middle">ph-chem.web.app</text>
  `);

  return [await writeSvgPng(l1, path.join(dir, 's4_a.png')),
          await writeSvgPng(l2, path.join(dir, 's4_b.png'))];
}

// ─────────────────────────────────────────────────────────────
function loiDoc(r) {
  return [
    `${soThanhChu(r.mocSay || (r.moc || 'Năm') + ' ' + r.nam)}. ${soThanhChu(r.nhanVat)}, ${soThanhChu(r.danh)}. ${soThanhChu(r.hook)}`,
    `Trước đó người ta tin gì? ${soThanhChu(stripLeadIcon(r.boiCanh[0]))} ${soThanhChu(stripLeadIcon(r.boiCanh[1]))}`,
    `Rồi bước ngoặt đến. ${soThanhChu(stripLeadIcon(r.chiTiet[0]))} ${soThanhChu(stripLeadIcon(r.chiTiet[1]))}`,
    `Chuyện đó để lại gì? ${soThanhChu(stripLeadIcon(r.diSan[0]))} ${soThanhChu(stripLeadIcon(r.diSan[1]))} `
      + `${soThanhChu(r.ketLuan)} Tra cứu 118 nguyên tố tại ph-chem.web.app nhé!`
  ].map(t => t.replace(/\s+/g, ' ').trim());
}

// ─────────────────────────────────────────────────────────────
export function soiBoCuc(list) {
  const loi = [];
  for (const r of list) {
    const v = [];
    if (fitSize(r.nhanVat, CW, 72, 38, 2, 0.66) <= 38) v.push('C1: tên nhân vật quá dài');
    if (wrapByWidth(r.danh, 32, CW - 40, 0.55).length > 2) v.push('C1: danh hiệu quá 2 dòng');
    if (wrapByWidth(r.hook, 36, CW - 40, 0.50).length > 3) v.push('C1: câu dẫn quá 3 dòng');

    const tSize = fitSize(r.nhanVat, CW, 72, 38, 2, 0.66);
    const tLines = wrapByWidth(r.nhanVat, tSize, CW, 0.66).length;
    const dLines = wrapByWidth(r.danh, 32, CW - 40, 0.55).length;
    const hLines = wrapByWidth(r.hook, 36, CW - 40, 0.50).length;
    const cuoi1 = 780 + tLines * (tSize + 10) + 26 + dLines * 44 + 130 + (hLines - 1) * 52;
    if (cuoi1 > 1580) v.push(`C1: khối tên + câu dẫn chạm y=${Math.round(cuoi1)} (giới hạn 1580)`);

    if (fitSize(r.truocDo, CW, 62, 34, 2, 0.67) <= 34) v.push('C2: tiêu đề quá dài');
    if (fitSize(r.moment, CW, 62, 34, 2, 0.67) <= 34) v.push('C3: tiêu đề quá dài');

    const dai = (items, khoang, batDau) => {
      let y = batDau;
      for (const b of items.slice(0, 3)) y += wrapByWidth(stripLeadIcon(b), 33, CW - 96, 0.50).length * 46 + khoang;
      return y - khoang;
    };
    if (dai(r.boiCanh, 104, 580) > 1560) v.push('C2: 3 ý quá cao');
    if (dai(r.chiTiet, 96, 580) > 1230) v.push('C3: 3 ý đè lên khung dữ kiện');
    if (wrapByWidth(r.dukien, fitSize(r.dukien, CW - 100, 38, 22, 2, 0.56), CW - 100, 0.56).length > 2)
      v.push('C3: dữ kiện chốt quá dài, bị cắt');
    if (dai(r.diSan, 96, 560) > 1150) v.push('C4: 3 di sản đè lên câu kết');
    if (wrapByWidth(r.ketLuan, 38, CW - 100, 0.50).length > 3) v.push('C4: câu kết quá 3 dòng');

    if (v.length) loi.push({ r, v });
  }
  console.log(`\n🔎 Soi bố cục ${list.length} chủ đề lịch sử:`);
  if (!loi.length) console.log('   ✅ Không có chủ đề nào bị tràn hay bị cắt chữ.');
  else for (const { r, v } of loi) {
    console.log(`   ⚠️  #${r.id} ${r.nam} — ${r.nhanVat}`);
    v.forEach(x => console.log(`        - ${x}`));
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

export async function buildHistoryReel(r) {
  const ffmpeg = getFfmpegPath();
  const dir = path.join(OUT_DIR, r.key);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const videoOut = path.join(OUT_DIR, `${r.key}.mp4`);
  if (fs.existsSync(videoOut) && fs.statSync(videoOut).size > 500000 && !process.env.FORCE) {
    console.log(`⏩ Đã có ${videoOut}, bỏ qua (FORCE=1 để dựng lại).`);
    return videoOut;
  }
  console.log(`\n🎬 [LỊCH SỬ #${r.id}] ${r.nam} — ${r.nhanVat}`);

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
  const bar = await renderProgressBar({ themeColor: C.vang, accentColor: C.vangNhat }, dir);

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
  console.log(`\n📋 Nghiệm thu ${list.length} video lịch sử:`);
  console.log(`   ✅ Đạt: ${ok}/${list.length}` +
    (ok ? ` — trung bình ${(tongGiay / ok).toFixed(1)}s, ${(tongMB / ok).toFixed(2)} MB` : ''));
  for (const [r, ly] of loi) console.log(`        #${r.id} ${r.nhanVat}: ${ly}`);
  return loi;
}

// ─────────────────────────────────────────────────────────────
if (process.argv[1]?.endsWith('gen-history-reels.mjs')) {
  const [a, b] = process.argv.slice(2);
  const tim = k => HISTORY_ROWS.find(x => String(x.id) === k || x.key === k);
  const run = async () => {
    if (a === 'soi') return soiBoCuc(HISTORY_ROWS);
    if (a === 'nghiemthu') return nghiemThu(HISTORY_ROWS);
    if (a === 'stills') return renderStills(tim(b) || HISTORY_ROWS[0]);
    if (!a || a === 'all') {
      // Một mẩu hỏng (thường do dịch vụ đọc chập) không được giết cả loạt:
      // ghi lại rồi chạy tiếp, cuối cùng liệt kê những mẩu cần dựng lại.
      const hong = [];
      for (const r of HISTORY_ROWS) {
        try { await buildHistoryReel(r); }
        catch (e) { console.error(`   ⛔ Bỏ qua #${r.id}: ${e.message}`); hong.push(r.id); }
      }
      if (hong.length) console.log(`\n⚠️  ${hong.length} mẩu chưa dựng được, chạy lại: ${hong.join(' ')}`);
      else console.log('\n🎉 Dựng xong toàn bộ.');
      return;
    }
    const r = tim(a);
    if (!r) throw new Error(`Không tìm thấy chủ đề: ${a}`);
    return buildHistoryReel(r);
  };
  run().catch(e => { console.error('❌ Lỗi:', e.message); process.exit(1); });
}
