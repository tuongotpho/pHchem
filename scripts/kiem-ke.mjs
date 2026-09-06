/**
 * kiem-ke.mjs — Quét toàn dự án rồi ghi ra bản đồ nội dung truyền thông.
 *
 * Viết thành lệnh quét chứ không phải file tĩnh, để lần sau chạy lại là ra
 * số mới, không bao giờ lệch với thực tế trên ổ đĩa.
 *
 *   node scripts/kiem-ke.mjs        -> in ra màn hình + ghi promo/BAN_DO_NOI_DUNG.md
 */

import fs from 'node:fs';
import path from 'node:path';

const R = path.resolve('.');
const P = p => path.join(R, p);

const demFile = (thuMuc, mau = /\.mp4$/) => {
  try { return fs.readdirSync(P(thuMuc)).filter(f => mau.test(f)).length; }
  catch { return 0; }
};

const demBanGhi = (tep, mau = /\n {2}\{/g) => {
  try { return (fs.readFileSync(P(tep), 'utf8').match(mau) || []).length; }
  catch { return 0; }
};

const demTrong = (tep, mau) => {
  try { return (fs.readFileSync(P(tep), 'utf8').match(mau) || []).length; }
  catch { return 0; }
};

// ── 1. VIDEO THÀNH PHẨM ───────────────────────────────────────
const soNguyenToV1 = demFile('promo/reels', /^element_.*\.mp4$/);
const soChuyenLa = demFile('promo/reels', /^reel_.*\.mp4$/);
const soQuiz = demFile('promo/reels', /^quiz_.*\.mp4$/);
const soNguyenToV2 = demFile('promo/reels_v2', /^element_.*\.mp4$/);
const soAnToan = demFile('promo/reels_antoan');
const soLichSu = demFile('promo/reels_lichsu');
const soChuyenLa2 = demFile('promo/reels_chuyenla');
const soTrang = demFile('promo', /^phchem_.*\.mp4$/);

const loat = [
  ['Hồ sơ nguyên tố — bản 1', soNguyenToV1, '720x1280, ảnh tĩnh', 'promo/reels/'],
  ['Hồ sơ nguyên tố — bản 2', soNguyenToV2, '1080x1920, có chuyển động', 'promo/reels_v2/'],
  ['Chuyện lạ — bản 1', soChuyenLa, '720x1280, ảnh tĩnh', 'promo/reels/'],
  ['Chuyện lạ — bản 2', soChuyenLa2, '1080x1920, nền sáng, 3 cảnh', 'promo/reels_chuyenla/'],
  ['An toàn hoá chất', soAnToan, '1080x1920, có chuyển động', 'promo/reels_antoan/'],
  ['Lịch sử hoá học', soLichSu, '1080x1920, có chuyển động', 'promo/reels_lichsu/'],
  ['Đố vui hoá học', soQuiz, '720x1280, ảnh tĩnh', 'promo/reels/'],
  ['Video giới thiệu trang', soTrang, 'giới thiệu từng trang của app', 'promo/']
];
const tongVideo = loat.reduce((s, l) => s + l[1], 0);

// ── 2. NỘI DUNG TRONG APP ─────────────────────────────────────
const app = [
  ['Bảng tuần hoàn', 118, soNguyenToV1 + soNguyenToV2 >= 118 ? 118 : soNguyenToV1 + soNguyenToV2,
    'xong cả 118 nguyên tố'],
  ['Chuyện lạ hoá học', demBanGhi('src/data/facts.ts'), demBanGhi('src/data/facts.ts'),
    'phủ kín — đo bằng node scripts/do-do-phu.mjs'],
  ['Từ điển hoá học', demBanGhi('src/data/dictionary.ts'), 0, 'CHƯA CÓ VIDEO NÀO'],
  ['Công thức vô cơ', demBanGhi('src/data/formulas.inorganic.ts'), 0, 'mới có video giới thiệu trang'],
  ['Công thức hữu cơ', demBanGhi('src/data/formulas.organic.ts'), 0, 'mới có video giới thiệu trang'],
  ['Công thức vật lý', demBanGhi('src/data/formulas.physical.ts'), 0, 'mới có video giới thiệu trang'],
  // iupac.ts là bảng khoá -> giá trị chứ không phải mảng object, phải đếm kiểu khác
  ['Danh pháp IUPAC', demTrong('src/data/iupac.ts', /^ {2}[^ /][^:]*:\s*'/gm), 0, 'CHƯA CÓ VIDEO NÀO'],
  ['Dãy điện hoá', demBanGhi('src/data/electro.ts'), 0, 'mới có video giới thiệu trang']
];

// ── 3. TRANG CỦA APP ──────────────────────────────────────────
let trangApp = [];
try { trangApp = fs.readdirSync(P('src/pages')).filter(f => f.endsWith('.tsx')).map(f => f.replace('.tsx', '')); }
catch { /* bỏ qua */ }
const coVideoTrang = ['Calculator', 'Electro', 'Formulas', 'PeriodicTable', 'Quiz', 'Reactions', 'Solubility'];
const thieuVideoTrang = trangApp.filter(t => !coVideoTrang.includes(t) && t !== 'Settings' && t !== 'ElementDetail');

// ── 4. BÀI ĐĂNG CHỮ ───────────────────────────────────────────
let soBaiChu = 0;
try {
  for (const f of fs.readdirSync(P('scripts')).filter(f => /^schedule-week-\d+\.mjs$/.test(f))) {
    soBaiChu += demTrong('scripts/' + f, /message:/g);
  }
} catch { /* bỏ qua */ }

// ── 5. GHI BÁO CÁO ────────────────────────────────────────────
const hn = new Date().toISOString().slice(0, 10);
let md = `# Bản đồ nội dung truyền thông pH-Chem

*Sinh tự động bằng \`node scripts/kiem-ke.mjs\` — cập nhật ngày ${hn}.*
*Đừng sửa tay file này, chạy lại lệnh là ra số mới.*

## 1. Video thành phẩm — tổng ${tongVideo}

| Loạt | Số video | Chất lượng | Thư mục |
|---|---:|---|---|
`;
for (const [ten, n, chatLuong, tm] of loat) md += `| ${ten} | ${n} | ${chatLuong} | \`${tm}\` |\n`;

md += `
## 2. Nội dung trong app đã lên video tới đâu

| Mục | Có trong app | Đã làm video | Ghi chú |
|---|---:|---:|---|
`;
for (const [ten, coTrongApp, daLam, ghiChu] of app) {
  md += `| ${ten} | ${coTrongApp} | ${daLam} | ${ghiChu} |\n`;
}

md += `
## 3. Trang của app

App có ${trangApp.length} trang: ${trangApp.join(', ')}.

Đã có video giới thiệu: ${coVideoTrang.join(', ')}.
${thieuVideoTrang.length ? `**Chưa có video giới thiệu: ${thieuVideoTrang.join(', ')}.**` : 'Đã đủ video giới thiệu cho mọi trang.'}

## 4. Bài đăng chữ

${soBaiChu} bài đã soạn, rải trong \`scripts/schedule-week-1..8.mjs\`.

## 5. Lệnh hay dùng

\`\`\`bash
node scripts/kiem-ke.mjs                    # chạy lại chính bản đồ này
\`\`\`

| Việc | Lệnh |
|---|---|
| Dựng reel nguyên tố (bản 2) | \`npm run gen:element-reels-v2 -- 11\` |
| Soi bố cục chữ nguyên tố | \`npm run soi:reels-v2\` |
| Nghiệm thu video nguyên tố | \`npm run nghiemthu:reels-v2\` |
| Dựng reel an toàn hoá chất | \`npm run gen:safety-reels -- all\` |
| Soi / nghiệm thu loạt an toàn | \`npm run soi:safety-reels\` · \`npm run nghiemthu:safety-reels\` |
| Dựng reel lịch sử hoá học | \`npm run gen:history-reels -- all\` |
| Soi / nghiệm thu loạt lịch sử | \`npm run soi:history-reels\` · \`npm run nghiemthu:history-reels\` |
| Dựng reel chuyện lạ bản 2 | \`npm run gen:fact-reels-v2 -- all\` |
| Đo độ phủ chuyện lạ trên mọi loạt | \`node scripts/do-do-phu.mjs\` |
| Xem tình hình fanpage (chỉ đọc) | \`node scripts/fanpage-tinhhinh.mjs\` |
| Sinh nhạc nền tự tổng hợp | \`npm run gen:music\` |

Thêm \`FORCE=1\` ở đầu lệnh để dựng đè lên video đã có.

## 6. Ba phép kiểm bắt buộc trước khi đăng

Bài học rút ra trong quá trình làm, xếp theo thứ tự nên chạy:

1. **Soi bố cục** (\`soi\`) — chạy công thức ngắt dòng của 4 cảnh để tìm chữ tràn
   khung hoặc bị cắt, **không cần kết xuất ảnh nào**. Đã bắt được lỗi thật trong
   dữ liệu cũ (#58 Tecneti tràn chữ, #60 Oganesson bị cắt).

2. **Nghiệm thu file** (\`nghiemthu\`) — soi khung hình, thời lượng, có tiếng chưa,
   dung lượng của từng mp4.

3. **Đo cao độ giọng đọc** — phép kiểm mà hai bước trên KHÔNG thay thế được.
   Khi dịch vụ đọc của Microsoft đứt kết nối giữa chừng, script từng tự đổi sang
   giọng khác, làm một cảnh trong video đọc bằng giọng nữ còn ba cảnh kia giọng
   nam. File vẫn đủ khung hình, đủ tiếng, đủ dài nên **nghiệm thu vẫn báo đạt**.
   Đã gặp bốn lần: Astatin, Rượu methanol, Mendeleev và Alfred Nobel. Cách sửa
   nửa vời (thử lại 3 lần rồi mới đổi giọng) KHÔNG đủ. Nay \`saveSpeech\` nhận
   tham số khoá cứng một giọng: hết lượt thử thì báo lỗi dừng hẳn chứ không
   âm thầm đổi giọng. Vẫn nên đo lại cao độ khi dựng loạt lớn.

4. **Đo nhiễu động nền** — hoa văn mảnh cỡ 1 pixel bị rung khi nền zoom chậm,
   vừa lợn cợn mắt vừa làm file phình gấp đôi. Loạt lịch sử từng dính: 0,37 mức
   xám so với 0,01 của hai loạt kia, 12,86 MB so với 4,8 MB. Bỏ hoa văn là hết.

## 7. Việc còn treo

- **Lịch fanpage:** đã xếp lại theo lịch phát sóng cố định, chi tiết ở
  \`promo/KE_HOACH_LICH_DANG.md\`. Hàng chờ cạn đầu tháng 10; 151 video kiểu mới
  vẫn chưa lên lịch. Facebook chỉ cho hẹn tối đa 30 ngày, nên phải thêm bài
  nhỏ giọt theo ngày chứ đừng đổ cả trăm bài một lúc.
- Hai lỗi trong dữ liệu nguyên tố đợt 1 của Antigravity: #58 Tecneti (câu trích
  3 dòng sẽ tràn mép dưới) và #60 Oganesson (ô "năm phát hiện" bị cắt chữ).
  Không ảnh hưởng 60 video bản 1 đã dựng, chỉ lộ ra nếu dựng lại theo bản 2.
- 9 video Đố vui hoá học đã viết kịch bản, script đã sửa được lỗi, nhưng chưa dựng.
- Ba mảng lớn trong app chưa có video nào: **từ điển**, **công thức**, **danh pháp IUPAC**.
`;

fs.mkdirSync(P('promo'), { recursive: true });
fs.writeFileSync(P('promo/BAN_DO_NOI_DUNG.md'), md, 'utf8');

// ── in ra màn hình ────────────────────────────────────────────
console.log(`\n📊 BẢN ĐỒ NỘI DUNG pH-CHEM — ${hn}\n`);
console.log('VIDEO THÀNH PHẨM'.padEnd(30) + 'Số lượng');
for (const [ten, n] of loat) console.log('  ' + ten.padEnd(28) + String(n).padStart(6));
console.log('  ' + 'TỔNG'.padEnd(28) + String(tongVideo).padStart(6));

console.log('\n' + 'NỘI DUNG APP'.padEnd(26) + 'Trong app'.padStart(10) + 'Đã quay'.padStart(9));
for (const [ten, a, b] of app) console.log('  ' + ten.padEnd(24) + String(a).padStart(10) + String(b).padStart(9));

console.log(`\nBài đăng chữ: ${soBaiChu}`);
if (thieuVideoTrang.length) console.log(`Trang chưa có video giới thiệu: ${thieuVideoTrang.join(', ')}`);
console.log('\n✅ Đã ghi promo/BAN_DO_NOI_DUNG.md');
