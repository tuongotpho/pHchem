/**
 * fanpage-doi-token.mjs — Đổi token người dùng ngắn hạn thành token TRANG vĩnh viễn.
 *
 * Token lấy thẳng từ Graph API Explorer là token NGƯỜI DÙNG và chỉ sống
 * vài tiếng. Muốn script chạy lâu dài thì phải đi ba bước:
 *   1. đổi token ngắn hạn -> token người dùng dài hạn (60 ngày), cần app secret;
 *   2. hỏi /me/accounts để lấy token TRANG (dẫn xuất từ token dài hạn thì
 *      không hết hạn);
 *   3. kiểm lại token trang xem đủ quyền chưa.
 *
 * Mặc định CHỈ IN RA, không ghi đè gì. Thêm "ghi" thì mới sửa .env.local,
 * và luôn sao lưu file cũ trước khi sửa.
 *
 *   node scripts/fanpage-doi-token.mjs        -> xem kết quả
 *   node scripts/fanpage-doi-token.mjs ghi    -> ghi vào .env.local (có sao lưu)
 */

import fs from 'node:fs';
import path from 'node:path';

const DUONG = path.resolve(process.cwd(), '.env.local');
const raw = fs.readFileSync(DUONG, 'utf8');
const env = {};
for (const line of raw.split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const i = t.indexOf('=');
  if (i !== -1) env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
}

const API = 'https://graph.facebook.com/v26.0';
const GHI = process.argv[2] === 'ghi';
const che = t => t ? t.slice(0, 8) + '…' + t.slice(-6) + ` (${t.length} ký tự)` : '(trống)';

const tokenHienTai = env.FB_PAGE_ACCESS_TOKEN;
if (!tokenHienTai) { console.log('Không thấy FB_PAGE_ACCESS_TOKEN trong .env.local'); process.exit(1); }

// ── Bước 0: token đang có là loại gì ──
const soi = await (await fetch(`${API}/debug_token?input_token=${tokenHienTai}&access_token=${tokenHienTai}`)).json();
if (soi.error) { console.log('❌ Token hiện tại không dùng được:', soi.error.message); process.exit(1); }
const info = soi.data;
console.log(`\nToken đang có: loại ${info.type}, ${info.expires_at === 0 ? 'vĩnh viễn' : 'hết hạn ' + new Date(info.expires_at * 1000).toLocaleString('vi-VN')}`);

if (info.type === 'PAGE' && info.expires_at === 0) {
  console.log('✅ Đã là token TRANG vĩnh viễn rồi, không cần đổi.\n');
  process.exit(0);
}

const APP_ID = info.app_id;
const APP_SECRET = env.FB_APP_SECRET;
if (!APP_SECRET) { console.log('❌ Thiếu FB_APP_SECRET trong .env.local, không đổi được.'); process.exit(1); }
console.log(`Ứng dụng: ${APP_ID}`);

// ── Bước 1: đổi sang token người dùng dài hạn ──
console.log('\n1/3 Đổi sang token người dùng dài hạn...');
const dai = await (await fetch(`${API}/oauth/access_token?grant_type=fb_exchange_token` +
  `&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${tokenHienTai}`)).json();
if (dai.error) { console.log('   ❌', dai.error.message); process.exit(1); }
console.log(`   ✅ ${che(dai.access_token)} · hạn ${dai.expires_in ? Math.round(dai.expires_in / 86400) + ' ngày' : 'không ghi'}`);

// ── Bước 2: lấy token TRANG ──
console.log('\n2/3 Lấy token trang từ /me/accounts...');
const acc = await (await fetch(`${API}/me/accounts?access_token=${dai.access_token}`)).json();
if (acc.error) { console.log('   ❌', acc.error.message); process.exit(1); }
const trang = (acc.data || []).find(p => p.id === env.FB_PAGE_ID);
if (!trang) {
  console.log('   ❌ Không thấy trang', env.FB_PAGE_ID, 'trong danh sách. Các trang thấy được:');
  for (const p of acc.data || []) console.log('      -', p.id, p.name);
  process.exit(1);
}
console.log(`   ✅ ${trang.name} · ${che(trang.access_token)}`);

// ── Bước 3: kiểm lại ──
console.log('\n3/3 Kiểm token trang vừa lấy...');
const soi2 = await (await fetch(`${API}/debug_token?input_token=${trang.access_token}&access_token=${trang.access_token}`)).json();
const x = soi2.data || {};
console.log(`   loại   : ${x.type}`);
console.log(`   hạn    : ${x.expires_at === 0 ? '✅ vĩnh viễn' : new Date(x.expires_at * 1000).toLocaleString('vi-VN')}`);
console.log(`   quyền  : ${(x.scopes || []).join(', ')}`);
const can = ['pages_read_engagement', 'pages_read_user_content', 'pages_manage_posts', 'publish_video'];
const thieu = can.filter(c => !(x.scopes || []).includes(c));
console.log(`   thiếu  : ${thieu.length ? thieu.join(', ') : '✅ không thiếu gì'}`);

// thử đọc thật một phát
const thu = await (await fetch(`${API}/${env.FB_PAGE_ID}/posts?fields=id,message&limit=1&access_token=${trang.access_token}`)).json();
console.log(`   đọc thử /posts: ${thu.error ? '❌ ' + thu.error.message.slice(0, 60) : '✅ được'}`);

if (!GHI) {
  console.log('\n(Mới chỉ thử. Chạy "node scripts/fanpage-doi-token.mjs ghi" để lưu vào .env.local.)\n');
  process.exit(0);
}

// ── Ghi, có sao lưu ──
const luu = DUONG + '.backup-' + new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
fs.writeFileSync(luu, raw, 'utf8');
let moi = raw;
moi = moi.includes('FB_PAGE_ACCESS_TOKEN=')
  ? moi.replace(/^FB_PAGE_ACCESS_TOKEN=.*$/m, `FB_PAGE_ACCESS_TOKEN=${trang.access_token}`)
  : moi.trimEnd() + `\nFB_PAGE_ACCESS_TOKEN=${trang.access_token}\n`;
moi = moi.includes('FB_USER_ACCESS_TOKEN=')
  ? moi.replace(/^FB_USER_ACCESS_TOKEN=.*$/m, `FB_USER_ACCESS_TOKEN=${dai.access_token}`)
  : moi.trimEnd() + `\nFB_USER_ACCESS_TOKEN=${dai.access_token}\n`;
fs.writeFileSync(DUONG, moi, 'utf8');
console.log(`\n✅ Đã ghi vào .env.local`);
console.log(`   Bản cũ sao lưu ở: ${path.basename(luu)}\n`);
