/**
 * fanpage-thay-video.mjs — Thay video đã hẹn bằng bản 1080p dựng lại.
 *
 * THỨ TỰ AN TOÀN: đăng bản mới trước, đọc lại xác nhận nó đã nằm trong
 * lịch, RỒI mới xoá bài cũ. Nếu bước nào hỏng thì lịch dư một bài chứ
 * không bao giờ thủng một suất.
 *
 *   node scripts/fanpage-thay-video.mjs        -> chỉ xem kế hoạch
 *   node scripts/fanpage-thay-video.mjs lam    -> thực hiện
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
const API_VIDEO = 'https://graph-video.facebook.com/v26.0';

const LAM = process.argv[2] === 'lam';
const gio = ts => new Date(ts * 1000).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

// Những video có bản 1080p thay thế
const CAN_THAY = ['element_03_vang.mp4', 'element_10_gali.mp4', 'element_11_oxy.mp4'];

const lichCu = JSON.parse(fs.readFileSync('promo/scheduled_element_reels.json', 'utf8'));

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
  `${API}/${PAGE}/scheduled_posts?fields=id,message,scheduled_publish_time&limit=100&access_token=${TOKEN}`);

// Ghép bản ghi trong máy với bài đang hẹn trên Facebook, dựa vào tiêu đề
const keHoach = [];
for (const muc of Object.values(lichCu)) {
  if (!CAN_THAY.includes(muc.videoFile)) continue;
  // Không ghép theo tiêu đề: lời trên Facebook đã được viết lại khác file máy.
  // Ghép theo mã "HỒ SƠ NGUYÊN TỐ #NN:" ở đầu bài — đó mới là khoá ổn định.
  const ma = `HỒ SƠ NGUYÊN TỐ #${String(muc.id).padStart(2, '0')}:`;
  const baiFb = hen.find(p => (p.message || '').startsWith(ma));
  const fileMoi = path.join('promo/reels_v2', muc.videoFile);
  keHoach.push({
    ...muc,
    baiFb: baiFb || null,
    fileMoi,
    coFile: fs.existsSync(fileMoi),
    mo: baiFb ? (baiFb.message || '') : null
  });
}

console.log('\n📋 KẾ HOẠCH THAY VIDEO\n');
for (const k of keHoach) {
  console.log(`  ${k.videoFile}`);
  console.log(`     ${k.title.slice(0, 62)}`);
  console.log(`     hẹn lúc : ${k.baiFb ? gio(k.baiFb.scheduled_publish_time) : '❌ KHÔNG TÌM THẤY BÀI TRÊN FACEBOOK'}`);
  console.log(`     file mới: ${k.coFile ? k.fileMoi + ' (' + (fs.statSync(k.fileMoi).size / 1048576).toFixed(2) + ' MB)' : '❌ CHƯA DỰNG'}`);
  console.log('');
}

const chay = keHoach.filter(k => k.baiFb && k.coFile);
console.log(`Thay được ${chay.length}/${keHoach.length} video.\n`);

if (!LAM) {
  console.log('(Đây mới là kế hoạch. Chạy "node scripts/fanpage-thay-video.mjs lam" để thực hiện.)\n');
  process.exit(0);
}

const ketQua = [];
for (const k of chay) {
  const khi = k.baiFb.scheduled_publish_time;
  console.log(`\n▶ ${k.videoFile} — hẹn ${gio(khi)}`);

  // BƯỚC 1: đăng bản mới, hẹn đúng giờ cũ
  console.log('   1/3 Đang tải bản 1080p lên...');
  const form = new FormData();
  form.append('access_token', TOKEN);
  form.append('description', k.mo);
  form.append('published', 'false');
  form.append('scheduled_publish_time', String(khi));
  form.append('source', new Blob([fs.readFileSync(k.fileMoi)], { type: 'video/mp4' }), k.videoFile);

  const up = await (await fetch(`${API_VIDEO}/${PAGE}/videos`, { method: 'POST', body: form })).json();
  if (up.error) {
    console.log(`   ❌ Tải lên hỏng: ${up.error.message}. Giữ nguyên bài cũ.`);
    ketQua.push({ ...k, xong: false, ly: up.error.message });
    continue;
  }
  console.log(`   ✅ Đã tải lên, video id ${up.id}`);

  // BƯỚC 2: đọc lại lịch, xác nhận bản mới đã có mặt
  console.log('   2/3 Đọc lại lịch để xác nhận...');
  await new Promise(r => setTimeout(r, 5000));
  const lai = await layHet(
    `${API}/${PAGE}/scheduled_posts?fields=id,scheduled_publish_time&limit=100&access_token=${TOKEN}`);
  const oDo = lai.filter(p => p.scheduled_publish_time === khi);
  if (oDo.length < 2) {
    console.log(`   ⚠️  Chưa thấy bản mới trong lịch (mốc này có ${oDo.length} bài). KHÔNG xoá bài cũ.`);
    ketQua.push({ ...k, xong: false, ly: 'chưa xác nhận được bản mới' });
    continue;
  }
  console.log(`   ✅ Mốc ${gio(khi)} giờ có ${oDo.length} bài — bản mới đã vào lịch`);

  // BƯỚC 3: xoá bài cũ
  console.log('   3/3 Xoá bài cũ...');
  const xoa = await (await fetch(`${API}/${k.baiFb.id}?access_token=${TOKEN}`, { method: 'DELETE' })).json();
  if (xoa.error) {
    console.log(`   ⚠️  Không xoá được bài cũ: ${xoa.error.message}. Mốc này đang có 2 bài, cần xoá tay.`);
    ketQua.push({ ...k, xong: false, ly: 'không xoá được bài cũ, đang dư 1 bài' });
  } else {
    console.log('   ✅ Đã xoá bài cũ. Thay xong.');
    ketQua.push({ ...k, xong: true });
  }
  await new Promise(r => setTimeout(r, 1500));
}

console.log('\n──────────────────────────────');
console.log(`Thay xong: ${ketQua.filter(x => x.xong).length}/${chay.length}`);
for (const r of ketQua.filter(x => !x.xong)) console.log(`  ⚠️ ${r.videoFile}: ${r.ly}`);

// Kiểm lại lần cuối
const cuoi = await layHet(
  `${API}/${PAGE}/scheduled_posts?fields=id,scheduled_publish_time&limit=100&access_token=${TOKEN}`);
const moc = {};
for (const p of cuoi) (moc[p.scheduled_publish_time] ||= []).push(p.id);
const trung = Object.entries(moc).filter(([, v]) => v.length > 1);
console.log(`\nKiểm lại: ${cuoi.length} bài đang hẹn · ${trung.length} mốc trùng giờ`);
for (const [t, v] of trung) console.log(`  ${gio(Number(t))} → ${v.length} bài`);
console.log('');
