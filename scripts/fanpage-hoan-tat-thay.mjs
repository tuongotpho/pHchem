/**
 * fanpage-hoan-tat-thay.mjs — Hoàn tất việc thay video sau khi bản 1080p đã lên lịch.
 *
 * Bước tải lên đã xong nhưng Facebook cần thời gian xử lý video mới hiện
 * trong lịch, nên bước xoá bài cũ bị hoãn lại. Script này:
 *   1. đọc lịch, tìm các mốc đang có 2 bài;
 *   2. hỏi Facebook xem bài nào gắn với ID video MỚI (đã biết trước);
 *   3. chỉ xoá bài KHÔNG phải bản mới.
 *
 * Không đoán mò: mốc nào chưa đủ 2 bài, hoặc không nhận ra bài nào là bản
 * mới, thì bỏ qua và báo lại chứ không xoá gì cả.
 *
 *   node scripts/fanpage-hoan-tat-thay.mjs        -> xem tình hình
 *   node scripts/fanpage-hoan-tat-thay.mjs lam    -> xoá bài cũ
 */

import fs from 'node:fs';
import path from 'node:path';

function loadEnv() {
  const content = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i !== -1) env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return env;
}
const env = loadEnv();
const PAGE = env.FB_PAGE_ID;
const TOKEN = env.FB_PAGE_ACCESS_TOKEN;
const API = 'https://graph.facebook.com/v26.0';
const LAM = process.argv[2] === 'lam';
const gio = ts => new Date(ts * 1000).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

// ID video 1080p vừa tải lên, lấy từ lượt chạy fanpage-thay-video.mjs
const VIDEO_MOI = {
  '2556737674798401': 'element_03_vang.mp4',
  '1080514881126872': 'element_10_gali.mp4',
  '1601105714734453': 'element_11_oxy.mp4'
};

async function layHet(url, toiDa = 400) {
  const ra = [];
  let u = url;
  while (u && ra.length < toiDa) {
    const d = await (await fetch(u)).json();
    if (d.error) throw new Error(`${d.error.message} (code ${d.error.code})`);
    ra.push(...(d.data || []));
    u = d.paging?.next || null;
  }
  return ra;
}

const hen = await layHet(
  `${API}/${PAGE}/scheduled_posts?fields=id,message,scheduled_publish_time,attachments{target}&limit=100&access_token=${TOKEN}`);

const idVideo = p => p.attachments?.data?.[0]?.target?.id || null;

// gom theo mốc, chỉ giữ mốc có từ 2 bài
const theoMoc = {};
for (const p of hen) (theoMoc[p.scheduled_publish_time] ||= []).push(p);
const mocDoi = Object.entries(theoMoc).filter(([, v]) => v.length > 1);

console.log(`\n📋 ${hen.length} bài đang hẹn · ${mocDoi.length} mốc đang có 2 bài\n`);

const canXoa = [];
for (const [ts, ds] of mocDoi) {
  const moi = ds.filter(p => VIDEO_MOI[idVideo(p)]);
  const cu = ds.filter(p => !VIDEO_MOI[idVideo(p)]);
  console.log(`  ${gio(Number(ts))}`);
  for (const p of ds) {
    const v = idVideo(p);
    const la = VIDEO_MOI[v] ? `BẢN MỚI 1080p (${VIDEO_MOI[v]})` : 'bản cũ 720p';
    console.log(`     ${p.id}  video ${v || '—'}  → ${la}`);
  }
  if (moi.length === 1 && cu.length === 1) {
    canXoa.push({ ts: Number(ts), cu: cu[0], moi: moi[0] });
    console.log('     ✅ Nhận diện rõ, xoá được bản cũ');
  } else {
    console.log(`     ⚠️  Không rõ (mới: ${moi.length}, cũ: ${cu.length}) — bỏ qua, không xoá gì`);
  }
  console.log('');
}

const chuaLen = Object.entries(VIDEO_MOI)
  .filter(([id]) => !hen.some(p => idVideo(p) === id));
if (chuaLen.length) {
  console.log('Bản mới chưa thấy trong lịch (Facebook còn đang xử lý):');
  for (const [id, f] of chuaLen) console.log(`  ${f}  (video ${id})`);
  console.log('');
}

if (!LAM) {
  console.log(`(Xem thôi. Chạy "node scripts/fanpage-hoan-tat-thay.mjs lam" để xoá ${canXoa.length} bài cũ.)\n`);
  process.exit(0);
}

for (const k of canXoa) {
  const d = await (await fetch(`${API}/${k.cu.id}?access_token=${TOKEN}`, { method: 'DELETE' })).json();
  if (d.error) console.log(`  ❌ ${gio(k.ts)}: ${d.error.message}`);
  else console.log(`  ✅ ${gio(k.ts)}: đã xoá bản cũ ${k.cu.id}`);
  await new Promise(r => setTimeout(r, 1200));
}

const lai = await layHet(
  `${API}/${PAGE}/scheduled_posts?fields=id,scheduled_publish_time&limit=100&access_token=${TOKEN}`);
const moc2 = {};
for (const p of lai) (moc2[p.scheduled_publish_time] ||= []).push(p.id);
const trung = Object.entries(moc2).filter(([, v]) => v.length > 1);
console.log(`\nKiểm lại: ${lai.length} bài đang hẹn · ${trung.length} mốc trùng giờ`);
for (const [t, v] of trung) console.log(`  ${gio(Number(t))} → ${v.length} bài`);
console.log('');
