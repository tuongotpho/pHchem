/**
 * gen-fact-reels-v2.mjs — Loạt "CHUYỆN LẠ HOÁ HỌC" kiểu mới (88 mẩu còn thiếu).
 *
 * HAI QUYẾT ĐỊNH KHÁC HAI LOẠT TRƯỚC:
 *
 * 1. CHỈ 3 CẢNH, không phải 4. Một mẩu chuyện lạ chỉ có một điều bất ngờ để
 *    kể, không cần trải ra bốn cảnh như hồ sơ nguyên tố. Ba cảnh cho ra video
 *    khoảng 36 giây — gọn hơn, hợp Reels hơn, và bớt một phần tư khối lượng viết.
 *      Cảnh 1 — ĐIỀU BẤT NGỜ : câu chuyện lạ, chữ thật to
 *      Cảnh 2 — VÌ SAO       : 3 ý giải thích + khung dữ kiện
 *      Cảnh 3 — GẶP Ở ĐÂU    : bắt gặp trong đời sống + kêu gọi tra cứu
 *
 * 2. NỀN SÁNG, không phải nền tối. Ba loạt kia đều nền đen; giữa dòng Reels
 *    toàn nền tối, một video nền sáng đập vào mắt hơn hẳn. Chữ đen trên giấy
 *    xanh lạnh, mỗi chủ đề một màu nhấn riêng.
 *
 * Cách chạy:
 *   node scripts/gen-fact-reels-v2.mjs soi        -> soi bố cục
 *   node scripts/gen-fact-reels-v2.mjs stills 1   -> xuất ảnh xem trước
 *   node scripts/gen-fact-reels-v2.mjs 1          -> dựng 1 video
 *   node scripts/gen-fact-reels-v2.mjs all        -> dựng cả loạt
 *   node scripts/gen-fact-reels-v2.mjs nghiemthu  -> nghiệm thu
 */

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { saveSpeech } from './gen-element-reels.mjs';
import { soThanhChu } from './element-data-2.mjs';
import { FACT_ROWS } from './fact-rows-2-all.mjs';
import {
  W, H, M, CW, FPS, XFADE, PAD,
  FONT_DISPLAY, FONT_TECH, FONT_BODY, FONT_MONO,
  esc, wrapByWidth, fitSize, textLines, writeSvgPng, stripLeadIcon,
  getFfmpegPath, probeDuration, buildScene, renderProgressBar
} from './gen-element-reels-v2.mjs';

// Khoá một giọng đọc duy nhất cho cả loạt, tránh lẫn giọng giữa các cảnh
const GIONG = 'vi-VN-NamMinhNeural';

const PROMO_DIR = path.join(path.resolve('.'), 'promo');
const OUT_DIR = path.join(PROMO_DIR, 'reels_chuyenla');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Nền sáng: giấy xanh lạnh, mực gần đen
const K = {
  giay: '#EDF0F3',
  giay2: '#E982E9',      // không dùng, giữ chỗ tránh nhầm khoá
  muc: '#0F1419',
  mo: '#59636E',
  mo2: '#8A939C',
  vien: '#D2D9DF'
};

// Mỗi chủ đề một màu nhấn riêng — người xem quen mắt sẽ nhận ra chủ đề từ màu
const MAU_TAG = {
  'Nguyên tố': '#1560D6',
  'Đời sống': '#D2601A',
  'Bất ngờ': '#C4179B',
  'Lịch sử': '#9A6B10',
  'Cơ thể': '#C42847',
  'Môi trường': '#1B8A4B',
  'Công nghiệp': '#41607F',
  'An toàn': '#C7431A',
  'Ẩm thực': '#B32D3C',
  'Vũ trụ': '#4634B8',
  'Y học': '#0E7C86',
  'Nhận biết': '#7A34B8',
  'Nông nghiệp': '#5E7A16'
};
const mauCua = tag => MAU_TAG[tag] || '#1560D6';

const NHAN = ['ĐIỀU BẤT NGỜ', 'VÌ SAO LẠI THẾ', 'GẶP Ở ĐÂU'];

// ─────────────────────────────────────────────────────────────
// NỀN SÁNG — khối màu nhấn lớn, không hoa văn mảnh (tránh rung khi zoom)
// ─────────────────────────────────────────────────────────────
async function renderBg(r, idx, dir) {
  const mau = mauCua(r.tag);
  const goc = [[0.80, 0.16], [0.16, 0.80], [0.84, 0.78]][idx];

  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="oa" cx="${goc[0]}" cy="${goc[1]}" r="0.72">
        <stop offset="0%" stop-color="${mau}" stop-opacity="0.20" />
        <stop offset="60%" stop-color="${mau}" stop-opacity="0.05" />
        <stop offset="100%" stop-color="${mau}" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="${K.giay}" />
    <rect width="${W}" height="${H}" fill="url(#oa)" />
    <circle cx="${goc[0] * W}" cy="${goc[1] * H}" r="330" fill="${mau}" fill-opacity="0.07" />
    <rect x="0" y="0" width="${W}" height="7" fill="${K.muc}" fill-opacity="0.12" />
  </svg>`;
  return writeSvgPng(svg, path.join(dir, `bg_0${idx + 1}.png`));
}

// ─────────────────────────────────────────────────────────────
function header(r, idx, tong) {
  const mau = mauCua(r.tag);
  const nhan = r.tag.toUpperCase();
  const rong = Math.max(150, nhan.length * 17 + 44);
  return `
    <rect x="${M}" y="152" width="${rong}" height="40" rx="4" fill="${mau}" />
    <text x="${M + rong / 2}" y="179" font-family="${FONT_TECH}" font-size="22" letter-spacing="4"
          fill="#ffffff" text-anchor="middle">${esc(nhan)}</text>
    <text x="${W - M}" y="179" font-family="${FONT_TECH}" font-size="24" letter-spacing="6"
          fill="${K.mo2}" text-anchor="end">0${idx + 1} / 0${tong}</text>`;
}

function footer(r) {
  return `
    <rect x="${M}" y="1660" width="${CW}" height="1" fill="${K.vien}" />
    <text x="${M}" y="1706" font-family="${FONT_TECH}" font-size="26" letter-spacing="3"
          fill="${K.mo2}">ph-chem.web.app</text>
    <text x="${W - M}" y="1706" font-family="${FONT_TECH}" font-size="26" letter-spacing="3"
          fill="${mauCua(r.tag)}" text-anchor="end">CHUYỆN LẠ HOÁ HỌC</text>`;
}

function nhanMuc(r, idx) {
  const mau = mauCua(r.tag);
  return `
    <rect x="${M}" y="278" width="5" height="28" rx="2.5" fill="${mau}" />
    <text x="${M + 22}" y="300" font-family="${FONT_TECH}" font-size="28" letter-spacing="7"
          fill="${mau}">${esc(NHAN[idx])}</text>`;
}

const layer = inner => `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

function danhSach(items, yStart, khoang, mau) {
  let y = yStart;
  const svg = items.slice(0, 3).map((raw, i) => {
    const lines = wrapByWidth(stripLeadIcon(raw), 34, CW - 96, 0.50);
    const block = `
      <text x="${M}" y="${y + 2}" font-family="${FONT_TECH}" font-size="40" font-weight="700"
            fill="${mau}">0${i + 1}</text>
      ${textLines(lines, M + 92, y, 47, `font-family="${FONT_BODY}" font-size="34" fill="${K.muc}"`)}`;
    y += lines.length * 47 + khoang;
    return block;
  }).join('\n');
  return { svg, cuoi: y - khoang };
}

// ─────────────────────────────────────────────────────────────
// CẢNH 1 — ĐIỀU BẤT NGỜ
// ─────────────────────────────────────────────────────────────
async function canh1(r, dir) {
  const mau = mauCua(r.tag);
  const tSize = fitSize(r.title, CW, 74, 40, 2, 0.67);
  const tLines = wrapByWidth(r.title, tSize, CW, 0.67).slice(0, 2);

  const cLines = wrapByWidth(r.claim, 40, CW, 0.50).slice(0, 6);

  // Căn giữa cả khối chữ trong dải an toàn 400..1560 để không trống nửa dưới
  const caoKhoi = tLines.length * (tSize + 16) + 60 + 44 + (cLines.length - 1) * 58;
  const yTitle = Math.max(400, Math.round(400 + (1160 - caoKhoi) / 2));

  const l1 = layer(`
    ${header(r, 0, 3)}
    ${textLines(tLines, M, yTitle, tSize + 16,
      `font-family="${FONT_DISPLAY}" font-size="${tSize}" fill="${K.muc}" letter-spacing="-1"`)}
    ${footer(r)}
  `);

  const yClaim = yTitle + tLines.length * (tSize + 16) + 60;

  const l2 = layer(`
    <rect x="${M}" y="${yClaim - 46}" width="90" height="6" fill="${mau}" />
    ${textLines(cLines, M, yClaim + 44, 58,
      `font-family="${FONT_BODY}" font-size="40" fill="${K.muc}"`)}
  `);

  return [await writeSvgPng(l1, path.join(dir, 's1_a.png')),
          await writeSvgPng(l2, path.join(dir, 's1_b.png'))];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 2 — VÌ SAO + KHUNG DỮ KIỆN
// ─────────────────────────────────────────────────────────────
async function canh2(r, dir) {
  const mau = mauCua(r.tag);
  const tSize = fitSize(r.viSao, CW, 62, 34, 2, 0.67);
  const tLines = wrapByWidth(r.viSao, tSize, CW, 0.67).slice(0, 2);

  const l1 = layer(`
    ${header(r, 1, 3)}
    ${nhanMuc(r, 1)}
    ${textLines(tLines, M, 400, tSize + 14,
      `font-family="${FONT_DISPLAY}" font-size="${tSize}" fill="${K.muc}" letter-spacing="-1"`)}
    ${footer(r)}
  `);

  const { svg, cuoi } = danhSach(r.why, 580, 92, mau);
  const dSize = fitSize(r.dukien, CW - 100, 40, 24, 2, 0.56);
  const dLines = wrapByWidth(r.dukien, dSize, CW - 100, 0.56).slice(0, 2);
  const dTop = Math.max(cuoi + 56, 1200);
  const dH = 112 + dLines.length * (dSize + 14);

  const l2 = layer(`
    ${svg}
    <rect x="${M}" y="${dTop}" width="${CW}" height="${dH}" rx="10" fill="${mau}" fill-opacity="0.10" />
    <rect x="${M}" y="${dTop}" width="6" height="${dH}" fill="${mau}" />
    <text x="${M + 44}" y="${dTop + 48}" font-family="${FONT_TECH}" font-size="23" letter-spacing="6"
          fill="${mau}">${esc(r.dukienLabel || 'DỮ KIỆN')}</text>
    ${textLines(dLines, W / 2, dTop + 104, dSize + 14,
      `font-family="${FONT_MONO}" font-size="${dSize}" font-weight="700" fill="${K.muc}" text-anchor="middle"`)}
  `);

  return [await writeSvgPng(l1, path.join(dir, 's2_a.png')),
          await writeSvgPng(l2, path.join(dir, 's2_b.png'))];
}

// ─────────────────────────────────────────────────────────────
// CẢNH 3 — GẶP Ở ĐÂU + KÊU GỌI
// ─────────────────────────────────────────────────────────────
async function canh3(r, dir) {
  const mau = mauCua(r.tag);

  const l1 = layer(`
    ${header(r, 2, 3)}
    ${nhanMuc(r, 2)}
    <text x="${M}" y="400" font-family="${FONT_DISPLAY}" font-size="70" fill="${K.muc}"
          letter-spacing="-1">TRONG ĐỜI SỐNG</text>
    ${footer(r)}
  `);

  const { svg, cuoi } = danhSach(r.gapODau, 560, 104, mau);
  const kLines = wrapByWidth(r.ketLuan, 38, CW - 60, 0.50).slice(0, 3);
  const kTop = Math.max(cuoi + 60, 1080);

  const l2 = layer(`
    ${svg}
    <rect x="${M}" y="${kTop}" width="90" height="5" fill="${mau}" />
    ${textLines(kLines, M, kTop + 76, 52,
      `font-family="${FONT_BODY}" font-size="38" font-weight="600" fill="${K.muc}"`)}

    <rect x="${M}" y="${kTop + 76 + kLines.length * 52 + 40}" width="${CW}" height="112" rx="10" fill="${mau}" />
    <text x="${W / 2}" y="${kTop + 76 + kLines.length * 52 + 108}" font-family="${FONT_DISPLAY}"
          font-size="42" fill="#ffffff" text-anchor="middle">ph-chem.web.app</text>
  `);

  return [await writeSvgPng(l1, path.join(dir, 's3_a.png')),
          await writeSvgPng(l2, path.join(dir, 's3_b.png'))];
}

const CANH = [canh1, canh2, canh3];

// ─────────────────────────────────────────────────────────────
function loiDoc(r) {
  return [
    `${soThanhChu(r.title)}. ${soThanhChu(r.claim)}`,
    `Vì sao lại thế? ${soThanhChu(stripLeadIcon(r.why[0]))} ${soThanhChu(stripLeadIcon(r.why[1]))}`,
    `Gặp ở đâu trong đời sống? ${soThanhChu(stripLeadIcon(r.gapODau[0]))} ${soThanhChu(stripLeadIcon(r.gapODau[1]))} `
      + `${soThanhChu(r.ketLuan)} Tra cứu thêm tại ph-chem.web.app nhé!`
  ].map(t => t.replace(/\s+/g, ' ').trim());
}

// ─────────────────────────────────────────────────────────────
export function soiBoCuc(list) {
  const loi = [];
  for (const r of list) {
    const v = [];
    if (!MAU_TAG[r.tag]) v.push(`chủ đề "${r.tag}" chưa có màu nhấn`);

    const tSize = fitSize(r.title, CW, 74, 40, 2, 0.67);
    if (wrapByWidth(r.title, tSize, CW, 0.67).length > 2) v.push('C1: tiêu đề quá dài, bị cắt');
    const tLines = wrapByWidth(r.title, tSize, CW, 0.67).length;
    const cLines = wrapByWidth(r.claim, 40, CW, 0.50).length;
    if (cLines > 6) v.push(`C1: câu chuyện ${cLines} dòng (tối đa 6)`);
    const caoKhoi = tLines * (tSize + 16) + 60 + 44 + (cLines - 1) * 58;
    if (400 + caoKhoi > 1580) v.push(`C1: khối chữ cao ${Math.round(caoKhoi)}px, không lọt dải an toàn`);

    if (fitSize(r.viSao, CW, 62, 34, 2, 0.67) <= 34) v.push('C2: tiêu đề quá dài');
    const dai = (items, khoang, batDau) => {
      let y = batDau;
      for (const b of items.slice(0, 3)) y += wrapByWidth(stripLeadIcon(b), 34, CW - 96, 0.50).length * 47 + khoang;
      return y - khoang;
    };
    if (dai(r.why, 92, 580) > 1200) v.push('C2: 3 ý đè lên khung dữ kiện');
    if (wrapByWidth(r.dukien, fitSize(r.dukien, CW - 100, 40, 24, 2, 0.56), CW - 100, 0.56).length > 2)
      v.push('C2: dữ kiện quá dài, bị cắt');

    const cuoi3 = dai(r.gapODau, 104, 560);
    const kTop = Math.max(cuoi3 + 60, 1080);
    const kLines = wrapByWidth(r.ketLuan, 38, CW - 60, 0.50).length;
    if (kLines > 3) v.push('C3: câu kết quá 3 dòng');
    if (kTop + 76 + kLines * 52 + 40 + 112 > 1620) v.push('C3: khối kêu gọi tràn xuống chân trang');

    if (v.length) loi.push({ r, v });
  }
  console.log(`\n🔎 Soi bố cục ${list.length} mẩu chuyện lạ:`);
  if (!loi.length) console.log('   ✅ Không mẩu nào bị tràn hay bị cắt chữ.');
  else for (const { r, v } of loi) {
    console.log(`   ⚠️  #${r.id} ${r.title}`);
    v.forEach(x => console.log(`        - ${x}`));
  }
  return loi;
}

export async function renderStills(r) {
  const dir = path.join(OUT_DIR, r.key);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const outs = [];
  for (let i = 0; i < 3; i++) {
    const bg = await renderBg(r, i, dir);
    const [a, b] = await CANH[i](r, dir);
    const out = path.join(dir, `preview_0${i + 1}.jpg`);
    await sharp(bg).composite([{ input: a }, { input: b }]).jpeg({ quality: 92 }).toFile(out);
    outs.push(out);
  }
  console.log('🖼️  Ảnh xem trước:\n   ' + outs.join('\n   '));
  return outs;
}

export async function buildFactReel(r) {
  const ffmpeg = getFfmpegPath();
  const dir = path.join(OUT_DIR, r.key);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const videoOut = path.join(OUT_DIR, `${r.key}.mp4`);
  if (fs.existsSync(videoOut) && fs.statSync(videoOut).size > 400000 && !process.env.FORCE) {
    console.log(`⏩ Đã có ${videoOut}, bỏ qua (FORCE=1 để dựng lại).`);
    return videoOut;
  }
  console.log(`\n🎬 [CHUYỆN LẠ #${r.id}] ${r.title}`);

  const texts = loiDoc(r);
  const speeches = [];
  for (let i = 0; i < 3; i++) {
    const f = path.join(dir, `speech_0${i + 1}.mp3`);
    if (!fs.existsSync(f)) {
      console.log(`   🎙️  Tạo giọng đọc cảnh ${i + 1}...`);
      await saveSpeech(f, texts[i], '+10%', GIONG);
    }
    speeches.push(f);
  }

  const N = 3;
  const durs = speeches.map((s, i) => Math.max(probeDuration(ffmpeg, s) + PAD + (i === N - 1 ? 0.7 : 0), 3.6));
  const offsets = [];
  let acc = 0;
  durs.forEach((d, i) => { offsets.push(acc); acc += d - (i < N - 1 ? XFADE : 0); });
  const total = offsets[N - 1] + durs[N - 1];
  console.log(`   ⏱️  Thời lượng: ${total.toFixed(1)}s`);

  const bgs = [], lop = [];
  for (let i = 0; i < N; i++) { bgs.push(await renderBg(r, i, dir)); lop.push(await CANH[i](r, dir)); }
  const bar = await renderProgressBar({ themeColor: mauCua(r.tag), accentColor: K.muc }, dir);

  const sceneFiles = [];
  for (let i = 0; i < N; i++) {
    console.log(`   ⚙️  Dựng cảnh ${i + 1}/${N}...`);
    sceneFiles.push(buildScene(ffmpeg, {
      bg: bgs[i], layerA: lop[i][0], layerB: lop[i][1], bar,
      dur: durs[i], out: path.join(dir, `scene_0${i + 1}.mp4`),
      offset: offsets[i], total
    }));
  }

  console.log('   🎞️  Ghép cảnh + trộn tiếng...');
  const vParts = [];
  let last = '[0:v]';
  for (let i = 1; i < N; i++) {
    const lbl = i === N - 1 ? '[vx]' : `[vx${i}]`;
    vParts.push(`${last}[${i}:v]xfade=transition=fade:duration=${XFADE}:offset=${offsets[i].toFixed(3)}${lbl}`);
    last = lbl;
  }
  const vFinal = `[vx]fade=t=in:st=0:d=0.5,fade=t=out:st=${(total - 0.6).toFixed(3)}:d=0.6,format=yuv420p[vfin]`;
  const aParts = speeches.map((_, i) => {
    const ms = Math.round(offsets[i] * 1000);
    return `[${i + N}:a]adelay=${ms}|${ms},aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a${i}]`;
  });
  aParts.push(`[a0][a1][a2]amix=inputs=${N}:normalize=0:dropout_transition=0,alimiter=limit=0.95:level=false[aout]`);

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
    if (dur < 18 || dur > 70) v.push(`thời lượng ${dur.toFixed(1)}s`);
    if (st.size < 600_000) v.push('file quá nhỏ');
    if (v.length) loi.push([r, v.join(', ')]);
    else { ok++; tongGiay += dur; tongMB += st.size / 1048576; }
  }
  console.log(`\n📋 Nghiệm thu ${list.length} video chuyện lạ:`);
  console.log(`   ✅ Đạt: ${ok}/${list.length}` +
    (ok ? ` — trung bình ${(tongGiay / ok).toFixed(1)}s, ${(tongMB / ok).toFixed(2)} MB` : ''));
  for (const [r, ly] of loi.slice(0, 20)) console.log(`        #${r.id} ${r.title}: ${ly}`);
  if (loi.length > 20) console.log(`        … và ${loi.length - 20} mẩu nữa`);
  return loi;
}

// ─────────────────────────────────────────────────────────────
if (process.argv[1]?.endsWith('gen-fact-reels-v2.mjs')) {
  const [a, b] = process.argv.slice(2);
  const tim = k => FACT_ROWS.find(x => String(x.id) === k || x.key === k);
  const run = async () => {
    if (a === 'soi') return soiBoCuc(FACT_ROWS);
    if (a === 'nghiemthu') return nghiemThu(FACT_ROWS);
    if (a === 'stills') return renderStills(tim(b) || FACT_ROWS[0]);
    if (!a || a === 'all') {
      // Một mẩu hỏng (thường do dịch vụ đọc chập) không được giết cả loạt:
      // ghi lại rồi chạy tiếp, cuối cùng liệt kê những mẩu cần dựng lại.
      const hong = [];
      for (const r of FACT_ROWS) {
        try { await buildFactReel(r); }
        catch (e) { console.error(`   ⛔ Bỏ qua #${r.id}: ${e.message}`); hong.push(r.id); }
      }
      if (hong.length) console.log(`\n⚠️  ${hong.length} mẩu chưa dựng được, chạy lại: ${hong.join(' ')}`);
      else console.log('\n🎉 Dựng xong toàn bộ.');
      return;
    }
    if (b) { for (const r of FACT_ROWS.filter(x => x.id >= +a && x.id <= +b)) await buildFactReel(r); return; }
    const r = tim(a);
    if (!r) throw new Error(`Không tìm thấy mẩu: ${a}`);
    return buildFactReel(r);
  };
  run().catch(e => { console.error('❌ Lỗi:', e.message); process.exit(1); });
}
