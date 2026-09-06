/**
 * fanpage-hieu-qua.mjs — Đo hiệu quả thật của trang. CHỈ ĐỌC.
 *
 * Token hiện tại CÓ pages_read_engagement nhưng KHÔNG có pages_read_user_content.
 * Vì vậy đọc được: giờ đăng, nội dung, đường dẫn, kiểu đính kèm, lượt xem video.
 * KHÔNG đọc được: số tim và số bình luận.
 *
 *   node scripts/fanpage-hieu-qua.mjs
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

const gioVN = s => new Date(s).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
const khung = s => new Date(s).toLocaleTimeString('vi-VN',
  { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit' });

async function layHet(url, toiDa = 300) {
  const ra = [];
  let u = url;
  while (u && ra.length < toiDa) {
    const d = await (await fetch(u)).json();
    if (d.error) { console.log('  (dừng: ' + d.error.message.slice(0, 70) + ')'); break; }
    ra.push(...(d.data || []));
    u = d.paging?.next || null;
  }
  return ra;
}

const trang = await (await fetch(
  `${API}/${PAGE}?fields=name,fan_count,followers_count,talking_about_count&access_token=${TOKEN}`)).json();
console.log(`\n📄 ${trang.name}`);
console.log(`   Người thích   : ${trang.fan_count ?? '—'}`);
console.log(`   Người theo dõi: ${trang.followers_count ?? '—'}`);

const bai = await layHet(
  `${API}/${PAGE}/posts?fields=id,created_time,message,permalink_url,attachments{media_type}&limit=100&access_token=${TOKEN}`);

const laReel = p => (p.permalink_url || '').includes('/reel/');
const soReel = bai.filter(laReel).length;
console.log(`\n📊 ${bai.length} BÀI ĐÃ ĐĂNG · ${soReel} là Reels · ${bai.length - soReel} bài thường`);

const vid = await layHet(
  `${API}/${PAGE}/videos?fields=id,created_time,views,length&limit=100&access_token=${TOKEN}`);
const tongXem = vid.reduce((s, v) => s + (v.views || 0), 0);

console.log(`\n▶️  ${vid.length} VIDEO — tổng ${tongXem} lượt xem`);
if (vid.length) {
  console.log(`   Trung bình ${(tongXem / vid.length).toFixed(1)} lượt/video · cao nhất ${Math.max(...vid.map(v => v.views || 0))}`);
  console.log('\n   Giờ đăng            Lượt xem');
  for (const v of vid.slice().sort((a, b) => new Date(a.created_time) - new Date(b.created_time)))
    console.log('   ' + gioVN(v.created_time).padEnd(20) + String(v.views ?? 0).padStart(6));
}

const theoKhung = {};
for (const p of bai) { const k = khung(p.created_time); theoKhung[k] = (theoKhung[k] || 0) + 1; }
console.log('\n🕐 SỐ BÀI THEO KHUNG GIỜ:');
for (const [k, n] of Object.entries(theoKhung).sort()) console.log(`   ${k}  ${n} bài`);

console.log('\n⚠️  Chưa đọc được số tim và bình luận: token thiếu pages_read_user_content.');
console.log('   Thêm quyền đó rồi TẠO TOKEN MỚI, dán vào .env.local thì đo được.\n');
