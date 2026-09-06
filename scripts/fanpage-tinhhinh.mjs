/**
 * fanpage-tinhhinh.mjs — Xem nhanh tình hình fanpage: đã đăng gì, còn hẹn gì.
 * CHỈ ĐỌC, không đăng và không xoá bất cứ thứ gì.
 *
 *   node scripts/fanpage-tinhhinh.mjs          -> bảng tóm tắt
 *   node scripts/fanpage-tinhhinh.mjs chitiet  -> liệt kê từng bài đã hẹn
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

const gio = ts => new Date(ts * 1000).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
const ngay = s => new Date(s).toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

/** Lấy hết các trang kết quả, có chặn trên để khỏi chạy mãi */
async function layHet(url, toiDa = 400) {
  const ra = [];
  let u = url;
  while (u && ra.length < toiDa) {
    const res = await fetch(u);
    const d = await res.json();
    if (d.error) throw new Error(`${d.error.message} (code ${d.error.code})`);
    ra.push(...(d.data || []));
    u = d.paging?.next || null;
  }
  return ra;
}

/** Đoán bài thuộc loạt nào dựa vào thẻ và nội dung */
function doanLoat(msg = '') {
  const m = msg.toLowerCase();
  if (/#hosonguyento|hồ sơ nguyên tố/.test(m)) return 'Hồ sơ nguyên tố';
  if (/#bancobiet|bạn có biết/.test(m)) return 'Bạn có biết / chuyện lạ';
  if (/#dovui|đố vui/.test(m)) return 'Đố vui';
  if (/bảng tuần hoàn|#bangtuanhoan/.test(m)) return 'Bảng tuần hoàn';
  return 'Khác';
}

const chiTiet = process.argv[2] === 'chitiet';

const hen = await layHet(
  `${API}/${PAGE}/scheduled_posts?fields=id,message,scheduled_publish_time&limit=100&access_token=${TOKEN}`);
const daDang = await layHet(
  `${API}/${PAGE}/published_posts?fields=id,message,created_time,permalink_url&limit=100&access_token=${TOKEN}`);

console.log('\n📊 TÌNH HÌNH FANPAGE Ph-Chem\n');
console.log(`Đã đăng   : ${daDang.length} bài`);
console.log(`Đang hẹn  : ${hen.length} bài`);

if (daDang.length) {
  const t = daDang.map(p => new Date(p.created_time)).sort((a, b) => a - b);
  console.log(`Bài đầu   : ${ngay(t[0])}`);
  console.log(`Bài mới   : ${ngay(t[t.length - 1])}`);
}
if (hen.length) {
  const t = hen.map(p => p.scheduled_publish_time).sort((a, b) => a - b);
  console.log(`Hẹn từ    : ${gio(t[0])}`);
  console.log(`Hẹn tới   : ${gio(t[t.length - 1])}`);
  const soNgay = Math.round((t[t.length - 1] - t[0]) / 86400) + 1;
  console.log(`Trải dài  : ${soNgay} ngày, trung bình ${(hen.length / soNgay).toFixed(1)} bài/ngày`);
}

const dem = arr => {
  const d = {};
  for (const p of arr) d[doanLoat(p.message)] = (d[doanLoat(p.message)] || 0) + 1;
  return d;
};
console.log('\nĐÃ ĐĂNG theo loạt:');
for (const [k, v] of Object.entries(dem(daDang)).sort((a, b) => b[1] - a[1]))
  console.log(`  ${k.padEnd(26)} ${String(v).padStart(4)}`);
console.log('\nĐANG HẸN theo loạt:');
for (const [k, v] of Object.entries(dem(hen)).sort((a, b) => b[1] - a[1]))
  console.log(`  ${k.padEnd(26)} ${String(v).padStart(4)}`);

// Bài hẹn theo từng ngày
if (hen.length) {
  const theoNgay = {};
  for (const p of hen) {
    const d = new Date(p.scheduled_publish_time * 1000)
      .toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    (theoNgay[d] ||= []).push(p);
  }
  const cacNgay = Object.keys(theoNgay).sort((a, b) => {
    const [d1, m1, y1] = a.split('/').map(Number), [d2, m2, y2] = b.split('/').map(Number);
    return new Date(y1, m1 - 1, d1) - new Date(y2, m2 - 1, d2);
  });
  console.log(`\nLỊCH HẸN — ${cacNgay.length} ngày có bài:`);
  for (const d of cacNgay.slice(0, chiTiet ? 999 : 12)) {
    const gioTrongNgay = theoNgay[d]
      .map(p => new Date(p.scheduled_publish_time * 1000)
        .toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit' }))
      .sort().join(' · ');
    console.log(`  ${d.padEnd(12)} ${String(theoNgay[d].length).padStart(2)} bài   ${gioTrongNgay}`);
  }
  if (!chiTiet && cacNgay.length > 12) console.log(`  … còn ${cacNgay.length - 12} ngày nữa (chạy "chitiet" để xem hết)`);
}

if (chiTiet) {
  console.log('\n--- TỪNG BÀI ĐANG HẸN ---');
  for (const p of hen.sort((a, b) => a.scheduled_publish_time - b.scheduled_publish_time)) {
    console.log(`\n${gio(p.scheduled_publish_time)}  [${doanLoat(p.message)}]`);
    console.log(`  ${(p.message || '').split('\n')[0].slice(0, 100)}`);
  }
}
console.log('');
