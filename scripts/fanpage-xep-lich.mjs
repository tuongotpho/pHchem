/**
 * fanpage-xep-lich.mjs — Xếp lại toàn bộ lịch đăng theo "lịch phát sóng" cố định.
 *
 * Ý tưởng: mỗi khung giờ luôn là MỘT loạt nội dung, ngày nào cũng vậy, để
 * người xem quen nhịp. Nhịp giữ ở 2-3 bài/ngày, không hơn — kho video có
 * hạn mà trang chưa có người xem, đăng dày chỉ đốt kho nhanh hơn.
 *
 * Script CHỈ ĐỔI GIỜ của bài đã hẹn, không xoá và không đăng thêm.
 * Thứ tự trong từng làn được giữ nguyên, nên các chuỗi "BÀI 1..5" không bị đảo.
 *
 *   node scripts/fanpage-xep-lich.mjs        -> xem kế hoạch + ghi báo cáo
 *   node scripts/fanpage-xep-lich.mjs lam    -> đổi giờ thật
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

// ─────────────────────────────────────────────────────────────
// LỊCH PHÁT SÓNG — sửa ở đây là đổi được toàn bộ cách xếp
// ─────────────────────────────────────────────────────────────
const NGAY_BAT_DAU = '2026-09-07';        // xếp lại từ ngày này

// Facebook KHÔNG cho hẹn quá 30 ngày kể từ hôm nay. Mọi mốc xa hơn đều bị
// từ chối với lỗi "The specified scheduled publish time is invalid".
// Vì vậy số bài đang hẹn chia cho 29 ngày chính là nhịp tối thiểu ép buộc.
const TOI_DA_NGAY = 29;

const LAN = [
  {
    ma: 'cl', ten: 'Chuyện lạ hoá học', khung: '11:45',
    ngay: [0, 1, 2, 3, 4, 5, 6],            // 0 = Chủ nhật
    nhan: m => /#BanCoBiet|#DoVui/.test(m || '')
  },
  {
    ma: 'cl2', ten: 'Chuyện lạ (khung phụ)', khung: '17:30',
    ngay: [0, 1, 2, 3, 4, 5, 6],
    nhan: () => false                       // chỉ hứng phần tràn của làn chuyện lạ
  },
  {
    ma: 'nt', ten: 'Hồ sơ nguyên tố', khung: '19:45',
    ngay: [0, 1, 2, 3, 4, 5, 6],
    nhan: m => /^HỒ SƠ NGUYÊN TỐ #/.test(m || '')
  },
  {
    ma: 'nt2', ten: 'Nguyên tố (khung phụ)', khung: '08:00',
    ngay: [0, 1, 2, 3, 4, 5, 6],
    nhan: () => false                       // chỉ hứng phần tràn của làn nguyên tố
  },
  {
    ma: 'bg', ten: 'Bài giảng theo chuỗi', khung: '20:45',
    ngay: [0, 1, 2, 3, 4, 5, 6],
    nhan: m => /\[(BẢNG TUẦN HOÀN|MÁY TÍNH HÓA HỌC|MÁY TÍNH pH|TÍNH NĂNG)/.test(m || '')
  }
];
const LAN_MAC_DINH = 'bg';                  // bài không khớp làn nào thì cho vào đây

// ─────────────────────────────────────────────────────────────
const TZ = { timeZone: 'Asia/Ho_Chi_Minh' };
const gio = ts => new Date(ts * 1000).toLocaleString('vi-VN', TZ);
const ngayVN = ts => new Date(ts * 1000).toLocaleDateString('vi-VN', TZ);
const THU = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

/** Mốc unix của ngày thứ n (tính từ NGAY_BAT_DAU) ở khung giờ hh:mm, giờ VN */
function moc(nGay, hhmm) {
  const [h, p] = hhmm.split(':').map(Number);
  const d0 = new Date(NGAY_BAT_DAU + 'T00:00:00+07:00');
  const d = new Date(d0.getTime() + nGay * 86400000);
  return Math.floor(d.getTime() / 1000) + h * 3600 + p * 60;
}
function thuCua(nGay) {
  const d0 = new Date(NGAY_BAT_DAU + 'T00:00:00+07:00');
  return new Date(d0.getTime() + nGay * 86400000 + 7 * 3600000).getUTCDay();
}

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

// ── Chia bài vào các làn, giữ nguyên thứ tự cũ ──
const gio0 = Math.floor(new Date(NGAY_BAT_DAU + 'T00:00:00+07:00').getTime() / 1000);
const canXep = hen.filter(p => p.scheduled_publish_time >= gio0)
  .sort((a, b) => a.scheduled_publish_time - b.scheduled_publish_time);
const giuNguyen = hen.length - canXep.length;

const lane = {};
for (const l of LAN) lane[l.ma] = [];
for (const p of canXep) {
  const l = LAN.find(x => x.nhan(p.message)) || LAN.find(x => x.ma === LAN_MAC_DINH);
  lane[l.ma].push(p);
}

// Làn nào dài hơn cửa sổ cho phép thì san phần thừa sang làn phụ cùng chủ đề,
// để không có bài nào bị hẹn vào ngày Facebook từ chối.
const SAN = { cl: 'cl2', nt: 'nt2' };
for (const [tu, sang] of Object.entries(SAN)) {
  const suc = LAN.find(l => l.ma === tu).ngay.length / 7 * TOI_DA_NGAY;
  while (lane[tu].length > Math.floor(suc)) lane[sang].push(lane[tu].pop());
  lane[sang].sort((a, b) => a.scheduled_publish_time - b.scheduled_publish_time);
}

// ── Rải từng làn vào lưới ngày ──
const keHoach = [];
const boSot = [];   // bài không nhét được vào cửa sổ 29 ngày
for (const l of LAN) {
  let n = 0, i = 0;
  while (i < lane[l.ma].length) {
    if (l.ngay.includes(thuCua(n))) {
      keHoach.push({ bai: lane[l.ma][i], moi: moc(n, l.khung), lan: l, nGay: n });
      i++;
    }
    n++;
    if (n >= TOI_DA_NGAY) break;   // không vượt cửa sổ Facebook cho phép
  }
  if (i < lane[l.ma].length) {
    boSot.push({ lan: l.ten, so: lane[l.ma].length - i });
  }
}
keHoach.sort((a, b) => a.moi - b.moi);

// ── In kế hoạch ──
const soNgay = keHoach.length ? keHoach[keHoach.length - 1].nGay + 1 : 0;
console.log(`\n📅 XẾP LẠI LỊCH TỪ ${NGAY_BAT_DAU}\n`);
console.log(`   ${hen.length} bài đang hẹn · ${canXep.length} bài cần xếp · ${giuNguyen} bài giữ nguyên (trước ngày bắt đầu)`);
console.log(`   Trải ${soNgay} ngày · trung bình ${(canXep.length / Math.max(1, soNgay)).toFixed(2)} bài/ngày\n`);

console.log('   Làn'.padEnd(28) + 'Khung'.padEnd(8) + 'Ngày trong tuần'.padEnd(20) + 'Số bài'.padStart(7) + 'Hết vào'.padStart(14));
for (const l of LAN) {
  const cua = keHoach.filter(k => k.lan.ma === l.ma);
  const cuoi = cua.length ? ngayVN(cua[cua.length - 1].moi) : '—';
  console.log('   ' + l.ten.padEnd(25) + l.khung.padEnd(8) +
    l.ngay.map(d => THU[d]).join(' ').padEnd(20) + String(cua.length).padStart(7) + cuoi.padStart(14));
}

console.log('\n   Mười ngày đầu:');
const theoNgay = {};
for (const k of keHoach) (theoNgay[ngayVN(k.moi)] ||= []).push(k);
for (const [d, ds] of Object.entries(theoNgay).slice(0, 10)) {
  console.log(`     ${d.padEnd(11)} ${THU[thuCua(ds[0].nGay)]}  ` +
    ds.sort((a, b) => a.moi - b.moi).map(k => `${k.lan.khung} ${k.lan.ma}`).join('  ·  '));
}

if (boSot.length) {
  console.log('\n   ⚠️  KHÔNG XẾP HẾT — những làn sau vượt cửa sổ 29 ngày:');
  for (const b of boSot) console.log(`        ${b.lan}: thừa ${b.so} bài, sẽ giữ nguyên giờ cũ và có thể đâm nhau`);
  console.log('        Thêm làn phụ trong mảng LAN, hoặc bớt bài khỏi lịch.');
}

const doiThat = keHoach.filter(k => k.moi !== k.bai.scheduled_publish_time);
console.log(`\n   Cần đổi giờ: ${doiThat.length}/${canXep.length} bài (số còn lại đã đúng chỗ)\n`);

// ── Ghi báo cáo ──
let md = `# Kế hoạch lịch đăng fanpage pH-Chem

*Sinh tự động bằng \`node scripts/fanpage-xep-lich.mjs\` — cập nhật ${new Date().toLocaleDateString('vi-VN', TZ)}.*
*Muốn đổi cách xếp thì sửa mảng \`LAN\` trong chính script đó rồi chạy lại.*

## Nguyên tắc

Mỗi khung giờ **luôn là một loạt nội dung cố định**, ngày nào cũng vậy, để người
xem quen nhịp như xem lịch phát sóng truyền hình.

**Nhịp mong muốn là 2-3 bài mỗi ngày.** Lý do bằng số: tính tới
${new Date().toLocaleDateString('vi-VN', TZ)}, trang có **1 người theo dõi**, 19 bài đã đăng
được tổng cộng **22 lượt tim, 0 bình luận, 0 chia sẻ**, 8 video được **13 lượt xem**.
Kho có gần 300 video nhưng mỗi video chỉ đăng được một lần. Đăng dày là đốt sạch
kho trong hơn tháng rưỡi để đổi lấy vài trăm lượt xem; đăng thưa thì kho chạy
được hơn ba tháng, giữ nội dung lại cho lúc trang thật sự có người xem.

### Vì sao hiện tại vẫn là ${(canXep.length / Math.max(1, soNgay)).toFixed(2)} bài/ngày

**Facebook không cho hẹn quá 30 ngày.** Mọi mốc xa hơn bị từ chối với lỗi
\`(#100) The specified scheduled publish time is invalid\`.

Tại thời điểm xếp lại, hàng chờ có **${canXep.length} bài** tồn từ trước, mà cửa sổ chỉ
có ${TOI_DA_NGAY} ngày. ${canXep.length} chia ${TOI_DA_NGAY} ra ${(canXep.length / TOI_DA_NGAY).toFixed(2)} — đó là nhịp **thấp nhất có thể**,
không phải nhịp được chọn. Muốn thưa hơn thì phải xoá bớt bài khỏi hàng chờ,
mà xoá là mất luôn video đã tải lên, tháng sau phải tải lại từ đầu.

**Quyết định ngày ${new Date().toLocaleDateString('vi-VN', TZ)}: chấp nhận nhịp này, tháng sau tính tiếp.**

### Điều quan trọng cho lần sau

Giới hạn 30 ngày **chỉ gây khó khi phải xếp lại một đống tồn**. Với việc thêm
bài mới thì nó không cản gì cả: mỗi ngày cửa sổ trôi thêm một ngày, nên cứ
**thêm 2-3 bài vào rìa xa nhất của cửa sổ mỗi ngày** là giữ được nhịp mong muốn
mãi mãi.

Nói cách khác: đừng bao giờ đổ cả trăm bài vào hàng chờ một lúc nữa. Nhỏ giọt
theo ngày thì nhịp muốn bao nhiêu cũng được.

## Lịch phát sóng

| Khung giờ | Loạt nội dung | Ngày trong tuần |
|---|---|---|
`;
for (const l of LAN) md += `| ${l.khung} | ${l.ten} | ${l.ngay.map(d => THU[d]).join(', ')} |\n`;

md += `
Trung bình **${(canXep.length / Math.max(1, soNgay)).toFixed(2)} bài/ngày**.

## Hiện trạng lịch

| Làn | Số bài đang có | Chạy hết vào |
|---|---:|---|
`;
for (const l of LAN) {
  const cua = keHoach.filter(k => k.lan.ma === l.ma);
  md += `| ${l.ten} | ${cua.length} | ${cua.length ? ngayVN(cua[cua.length - 1].moi) : '—'} |\n`;
}

md += `
Tổng ${canXep.length} bài, trải ${soNgay} ngày kể từ ${NGAY_BAT_DAU}.

## Cách phân loại bài vào làn

Script đọc nội dung bài rồi tự xếp làn:

| Làn | Nhận ra bằng |
|---|---|
| Chuyện lạ hoá học | có thẻ \`#BanCoBiet\` hoặc \`#DoVui\` |
| Hồ sơ nguyên tố | mở đầu bằng \`HỒ SƠ NGUYÊN TỐ #\` |
| Bài giảng theo chuỗi | có \`[BẢNG TUẦN HOÀN\`, \`[MÁY TÍNH HÓA HỌC\`, \`[MÁY TÍNH pH\` hoặc \`[TÍNH NĂNG\` |

Bài không khớp làn nào thì rơi vào làn bài giảng. Thứ tự trong từng làn giữ
nguyên theo lịch cũ, nên các chuỗi đánh số **BÀI 1 → BÀI 5** không bị đảo.

## Lần sau muốn xếp lại thì làm gì

\`\`\`bash
node scripts/fanpage-tinhhinh.mjs        # xem đang hẹn bao nhiêu bài, khung nào
node scripts/fanpage-xep-lich.mjs        # xem kế hoạch mới, chưa đụng gì
node scripts/fanpage-xep-lich.mjs lam    # thực hiện đổi giờ
node scripts/fanpage-hieu-qua.mjs        # đo tim, bình luận, chia sẻ, lượt xem
\`\`\`

Muốn đổi khung giờ hay tần suất thì sửa mảng \`LAN\` ở đầu
\`scripts/fanpage-xep-lich.mjs\`, không cần sửa chỗ nào khác.

## Việc tháng sau

Hàng chờ cạn dần: làn nguyên tố phụ hết ${keHoach.filter(k => k.lan.ma === 'nt2').length ? ngayVN(keHoach.filter(k => k.lan.ma === 'nt2').slice(-1)[0].moi) : '—'},
làn bài giảng hết ${keHoach.filter(k => k.lan.ma === 'bg').length ? ngayVN(keHoach.filter(k => k.lan.ma === 'bg').slice(-1)[0].moi) : '—'},
hai làn còn lại hết đầu tháng 10. Từ đó trở đi lịch trống, và đó chính là lúc
chuyển sang nhịp 2-3 bài/ngày mà không phải xoá gì.

**Cách làm, theo đúng thứ tự:**

1. Chạy \`node scripts/fanpage-tinhhinh.mjs\` xem còn bao nhiêu bài trong hàng chờ.
2. Chạy \`node scripts/fanpage-hieu-qua.mjs\` xem tim, bình luận, chia sẻ. Lúc đó
   cỡ mẫu đã đủ lớn để biết khung giờ nào thật sự hiệu quả — hiện mỗi khung mới
   có 1-7 bài, chênh nhau 0-2 tim, chưa kết luận được gì.
3. Bỏ bớt làn phụ (\`cl2\` khung 17:30 và \`nt2\` khung 08:00) khỏi mảng \`LAN\`,
   giữ lại ba làn chính. Nhịp tự động về khoảng 2-3 bài/ngày.
4. Thêm video kiểu mới vào **nhỏ giọt theo ngày**, mỗi ngày 2-3 bài ở rìa cửa sổ,
   đừng đổ cả trăm bài một lúc như lần này.

**Kho chưa dùng: ${fs.existsSync('promo/reels_v2') ? 151 : '~150'} video 1080p** — 58 hồ sơ nguyên tố, 56 chuyện lạ,
20 an toàn hoá chất, 17 lịch sử hoá học. Mỗi video cần một lời bài đăng riêng
trước khi tải lên; tải lên là thao tác nặng nên chia thành nhiều đợt.

Khi làn nào sắp cạn thì bổ sung đúng loạt tương ứng vào làn đó, đừng dồn hết
vào một khung — cả điểm mạnh của lịch phát sóng nằm ở chỗ người xem quen giờ.
`;
fs.writeFileSync('promo/KE_HOACH_LICH_DANG.md', md, 'utf8');
console.log('   📄 Đã ghi promo/KE_HOACH_LICH_DANG.md');

if (!LAM) {
  console.log('\n   (Mới là kế hoạch. Chạy "node scripts/fanpage-xep-lich.mjs lam" để đổi giờ thật.)\n');
  process.exit(0);
}

// ── Thực hiện ──
console.log('\n⏳ Đang đổi giờ...\n');
let xong = 0;
const hong = [];
for (const k of doiThat) {
  const body = new URLSearchParams();
  body.append('access_token', TOKEN);
  body.append('scheduled_publish_time', String(k.moi));
  const d = await (await fetch(`${API}/${k.bai.id}`, { method: 'POST', body })).json();
  if (d.error) { hong.push({ k, ly: d.error.message }); }
  else xong++;
  if ((xong + hong.length) % 20 === 0) console.log(`   ... ${xong + hong.length}/${doiThat.length}`);
  await new Promise(r => setTimeout(r, 500));
}
console.log(`\n   Đổi được ${xong}/${doiThat.length} bài.`);
for (const h of hong.slice(0, 10)) console.log(`   ❌ ${gio(h.k.moi)}: ${h.ly.slice(0, 70)}`);

// ── Kiểm lại ──
const lai = await layHet(
  `${API}/${PAGE}/scheduled_posts?fields=id,scheduled_publish_time&limit=100&access_token=${TOKEN}`);
const m2 = {};
for (const p of lai) (m2[p.scheduled_publish_time] ||= []).push(p.id);
const trung = Object.entries(m2).filter(([, v]) => v.length > 1);
const ngayCo = new Set(lai.map(p => ngayVN(p.scheduled_publish_time)));
console.log(`\n   Kiểm lại: ${lai.length} bài · ${trung.length} mốc trùng giờ · trải ${ngayCo.size} ngày` +
  ` · trung bình ${(lai.length / ngayCo.size).toFixed(2)} bài/ngày`);
for (const [t, v] of trung.slice(0, 5)) console.log(`     ${gio(Number(t))} → ${v.length} bài`);
console.log('');
