/**
 * fanpage-gian-lich.mjs — Giãn các mốc giờ bị đặt nhiều bài cùng một phút.
 *
 * Hai bài đăng đúng cùng một phút thì chia đôi lượt tiếp cận của nhau và
 * trông như spam. Script này giữ nguyên bài đầu tiên ở mỗi mốc, dời những
 * bài còn lại sang khung giờ trống gần nhất TRONG CÙNG NGÀY.
 *
 * Chỉ đổi giờ, KHÔNG xoá và KHÔNG đăng thêm bài nào.
 *
 *   node scripts/fanpage-gian-lich.mjs         -> chỉ xem kế hoạch, không đụng gì
 *   node scripts/fanpage-gian-lich.mjs lam     -> thực hiện dời giờ
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
const TZ = { timeZone: 'Asia/Ho_Chi_Minh' };
const gio = ts => new Date(ts * 1000).toLocaleString('vi-VN', TZ);
const hhmm = ts => new Date(ts * 1000).toLocaleTimeString('vi-VN', { ...TZ, hour: '2-digit', minute: '2-digit' });
const ngayVN = ts => new Date(ts * 1000).toLocaleDateString('vi-VN', TZ);

// Khung giờ chuẩn của fanpage, tính bằng phút kể từ 0 giờ (giờ Việt Nam)
const KHUNG = [7 * 60 + 30, 11 * 60 + 45, 14 * 60 + 30, 17 * 60 + 30, 19 * 60 + 45, 20 * 60 + 45];

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

/** Mốc unix của một khung giờ trong đúng ngày của ts gốc (theo giờ VN) */
function mocTrongNgay(tsGoc, phut) {
  const d = new Date(tsGoc * 1000);
  // lấy ngày theo giờ VN rồi dựng lại mốc UTC tương ứng (VN = UTC+7)
  const vn = new Date(d.getTime() + 7 * 3600 * 1000);
  const y = vn.getUTCFullYear(), m = vn.getUTCMonth(), day = vn.getUTCDate();
  return Math.floor(Date.UTC(y, m, day, 0, 0, 0) / 1000) - 7 * 3600 + phut * 60;
}

const hen = await layHet(
  `${API}/${PAGE}/scheduled_posts?fields=id,message,scheduled_publish_time&limit=100&access_token=${TOKEN}`);

// gom theo mốc giờ
const theoMoc = {};
for (const p of hen) (theoMoc[p.scheduled_publish_time] ||= []).push(p);

// tập mốc đang bị chiếm, để không dời vào chỗ đã có bài
const dangChiem = new Set(hen.map(p => p.scheduled_publish_time));

const keHoach = [];
const NGUONG = Math.floor(Date.now() / 1000) + 3600;   // không dời vào chỗ dưới 1 giờ nữa

for (const [ts, dsBai] of Object.entries(theoMoc)) {
  if (dsBai.length < 2) continue;
  const goc = Number(ts);
  // giữ bài đầu, dời những bài sau
  for (const bai of dsBai.slice(1)) {
    // thử lần lượt các khung giờ trong ngày, chọn khung trống đầu tiên
    let moi = null;
    for (const phut of KHUNG) {
      const ung = mocTrongNgay(goc, phut);
      if (ung > NGUONG && !dangChiem.has(ung)) { moi = ung; break; }
    }
    // hết khung trong ngày thì lùi 40 phút so với mốc gốc cho tới khi trống
    if (!moi) {
      let ung = goc + 40 * 60;
      while (dangChiem.has(ung)) ung += 40 * 60;
      moi = ung;
    }
    // KHÔNG nhả mốc cũ ra: bài đầu tiên vẫn đang giữ chỗ ở đó.
    // Nhả ra thì bài thứ ba lại dời về đúng mốc vừa rời đi.
    dangChiem.add(moi);
    keHoach.push({ id: bai.id, cu: goc, moi, dong: (bai.message || '').split('\n')[0].slice(0, 52) });
  }
}

console.log(`\n📋 ${hen.length} bài đang hẹn · ${Object.values(theoMoc).filter(v => v.length > 1).length} mốc bị trùng giờ`);
console.log(`   Cần dời ${keHoach.length} bài\n`);
for (const k of keHoach) {
  console.log(`  ${ngayVN(k.cu)}  ${hhmm(k.cu)} → ${hhmm(k.moi)}   ${k.dong}`);
}

if (!LAM) {
  console.log('\n(Đây mới là kế hoạch. Chạy "node scripts/fanpage-gian-lich.mjs lam" để thực hiện.)\n');
  process.exit(0);
}

console.log('\n⏳ Đang dời giờ...\n');
let xong = 0;
const hong = [];
for (const k of keHoach) {
  const body = new URLSearchParams();
  body.append('access_token', TOKEN);
  body.append('scheduled_publish_time', String(k.moi));
  const d = await (await fetch(`${API}/${k.id}`, { method: 'POST', body })).json();
  if (d.error) {
    console.log(`  ❌ ${k.id}: ${d.error.message}`);
    hong.push({ ...k, loi: d.error.message });
  } else {
    console.log(`  ✅ ${ngayVN(k.cu)} ${hhmm(k.cu)} → ${hhmm(k.moi)}`);
    xong++;
  }
  await new Promise(r => setTimeout(r, 600));
}

console.log(`\nDời được ${xong}/${keHoach.length} bài.`);
if (hong.length) {
  console.log('Không dời được:');
  for (const h of hong) console.log(`  ${gio(h.cu)} — ${h.loi}`);
}

// đọc lại để xác nhận
const lai = await layHet(
  `${API}/${PAGE}/scheduled_posts?fields=id,scheduled_publish_time&limit=100&access_token=${TOKEN}`);
const moc2 = {};
for (const p of lai) (moc2[p.scheduled_publish_time] ||= []).push(p.id);
const conTrung = Object.entries(moc2).filter(([, v]) => v.length > 1);
console.log(`\nKiểm lại: ${lai.length} bài đang hẹn · ${conTrung.length} mốc còn trùng giờ`);
for (const [t, v] of conTrung) console.log(`  ${gio(Number(t))} → ${v.length} bài`);
console.log('');
