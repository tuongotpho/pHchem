// Chuyển file đề trắc nghiệm của giáo viên (.docx) thành dữ liệu cho app.
// Đây là ĐỒ NGHỀ BUILD — không nằm trong app. Chạy khi thêm/sửa đề:
//     npm run de
//
// Nguồn:
//   - de-nguon/*.docx        → file Word thầy gửi (cam kết vào git, là bản gốc)
//   - de-nguon/*.va.json     → bản vá tay, xem phần "VÌ SAO CẦN BẢN VÁ" bên dưới
// Kết quả:
//   - public/de/<mã>.json    → một bộ đề (cam kết vào git)
//   - public/de/hinh/*.png   → ảnh đã nén, tên theo mã băm nội dung
//   - public/de/danh-muc.json→ danh sách các bộ đề để app biết có những gì
//   - de-review-<mã>.html    → TRANG DUYỆT cho thầy cô soi một lượt trước khi
//                              cho học sinh dùng (không cam kết vào git)
//
// ═══ AI LÀM GÌ — chốt ngày 28/08/2026 ═══
//
//   GIÁO VIÊN chỉ làm HAI việc, và đều là việc họ vốn đã quen:
//     1. Gửi file Word đề trắc nghiệm, soạn y như xưa nay vẫn soạn.
//     2. Xem trang duyệt (de-review-*.html) rồi gật đầu hoặc chỉ chỗ sai.
//
//   NGƯỜI LÀM APP làm tất cả phần còn lại: chạy script này, soi những câu
//   MathType, viết bản vá, đưa dữ liệu vào mã nguồn, deploy.
//
// Vì vậy KHÔNG được đẩy việc sang phía giáo viên: không bắt điền vào mẫu
// Excel, không bắt bỏ MathType, không bắt học cú pháp nào. Đề khó đọc tới đâu
// thì script và bản vá phải gánh tới đó — làm nhẹ phía người gửi đề, kể cả khi
// làm nặng phía mình.
//
// ẢNH KHÔNG NẰM TRONG GÓI CÀI. vite.config.ts loại thư mục de/ khỏi phần nạp
// sẵn, y như đã làm với 296 hình cấu tạo. Nhờ vậy thêm 100 bộ đề thì gói cài
// vẫn nguyên kích thước, học sinh làm đề nào chỉ tải ảnh của đề ấy.
//
// ĐÁP ÁN LẤY TỪ ĐÂU: thầy đánh dấu đáp án đúng bằng cách GẠCH CHÂN chữ cái
// A/B/C/D. Word lưu gạch chân thành dữ liệu nên máy đọc thẳng ra được, không
// phải đoán. Đây cũng là lý do KHÔNG được xuất đề sang PDF rồi mới đưa vào:
// sang PDF thì gạch chân chỉ còn là nét vẽ, mất sạch thông tin đáp án.
//
// KHÔNG DÙNG DẤU TRANG (bookmark). File mẫu của thầy có sẵn dấu trang kiểu
// "c1a, c1b..." trông rất tiện, nhưng đo trên đề Nitrogen thì chỉ 19/41 câu
// có, đánh số vọt tới 50 (sót lại từ bộ đề thầy chép về), và có câu thiếu
// dấu. Tin vào nó là hỏng lặng lẽ.
//
// VÌ SAO CẦN BẢN VÁ: hai thứ trong file Word máy không đọc nổi.
//
//   1. Công thức chèn bằng MathType nằm trong đối tượng OLE nhị phân, KHÔNG
//      đọc ra chữ được. Đã thử hai đường và cả hai đều tắc: vẽ ảnh vector WMF
//      kèm theo thì ra mấy vạch đen (thiếu phông MT Extra), moi thẳng nhị
//      phân MTEF thì mã hóa.
//
//      CHỖ NGUY HIỂM: phần lớn trường hợp MathType chỉ nuốt MỘT MẨU giữa câu
//      chứ không nuốt cả câu. Đề Nitrogen câu 11 bóc ra thành "Trong phản
//      ứng: N2(g) + 3H2(g) 2NH3(g). N2 thể hiện" — mất nguyên cái mũi tên
//      thuận nghịch và điều kiện "xt, t°, p" trên nó, mà câu vẫn đọc xuôi
//      tai. Câu 6 mất dấu ≡ và → nên hai lựa chọn hóa ra y hệt nhau.
//      Vì vậy KHÔNG được lấy "đề bài rỗng" làm dấu hiệu. Cứ đoạn nào có
//      MathType là đoạn đó thiếu chữ, phải có người soi rồi khai
//      "daSoi": true trong bản vá mới cho qua.
//
//   2. Ảnh chụp màn hình dán từ tài liệu khác, bên trong có sẵn số câu và bốn
//      đáp án của tài liệu gốc — chèn thẳng thì học sinh thấy câu hỏi hai lần.
//
// Cả hai đều cần MẮT NGƯỜI. Bản vá là chỗ ghi lại phần người đọc, tách khỏi
// phần máy đọc, để chạy lại script bao nhiêu lần cũng không mất.

import JSZip from 'jszip';
import { tachDoan, catThanhCau, MOC_HINH, MOC_BANG } from './deParse.mjs';
import { trangDuyet } from './trangDuyet.mjs';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, basename } from 'node:path';

const THU_MUC_NGUON = 'de-nguon';
const THU_MUC_RA = 'public/de';
const THU_MUC_HINH = 'public/de/hinh';

// Ảnh đề là nét đen trên nền trắng, không phải ảnh chụp. Bốn mức xám giữ
// nguyên độ nét mà nhẹ hơn bản gốc khoảng 80% — đo trên 3 ảnh của đề Nitrogen:
// 44,6 KB còn 8,1 KB. Tăng lên 16 mức chỉ đẹp hơn không đáng kể mà nặng gấp rưỡi.
const SO_MUC_XAM = 4;

// ---------- Đọc file .docx ----------
// Phần bóc chữ và cắt câu nằm ở deParse.mjs — tách ra để chạy được phép kiểm
// tự động (deParse.test.mjs). Chính bộ kiểm đó đã bắt được lỗi nuốt trọn câu
// 36 của đề Nitrogen, thứ mà nhìn báo cáo không thể thấy.

async function docDocx(duongDan) {
  const zip = await JSZip.loadAsync(readFileSync(duongDan));
  const doc = await zip.file('word/document.xml').async('string');
  const relsXml = await zip.file('word/_rels/document.xml.rels').async('string');

  const rels = {};
  for (const m of relsXml.matchAll(/Id="(rId\d+)"[^>]*Target="([^"]+)"/g)) rels[m[1]] = m[2];

  return { doan: tachDoan(doc), rels, zip };
}

// ---------- Ảnh ----------

/**
 * Nén một ảnh về PNG xám ít màu, đặt tên theo MÃ BĂM NỘI DUNG.
 *
 * Tên theo mã băm để TỰ KHỬ TRÙNG LẶP: hình "bình khí NH3 phun nước có
 * phenolphtalein" là hình kinh điển, sẽ xuất hiện ở hàng chục bộ đề khác nhau.
 * Cùng nội dung thì cùng tên, lưu một lần, bộ đề thứ hai trở đi tốn 0 byte.
 * App đã dùng đúng mẹo này cho hình cấu tạo.
 */
async function luuHinh(buf, cat) {
  let anh = sharp(buf);
  if (cat) anh = anh.extract(cat);
  const ra = await anh
    .grayscale()
    .png({ palette: true, colours: SO_MUC_XAM, effort: 10 })
    .toBuffer();
  const ten = createHash('sha256').update(ra).digest('hex').slice(0, 12) + '.png';
  writeFileSync(join(THU_MUC_HINH, ten), ra);
  return { ten, byte: ra.length };
}

// ---------- Chạy ----------

const nguon = existsSync(THU_MUC_NGUON)
  ? readdirSync(THU_MUC_NGUON).filter((f) => f.endsWith('.docx') && !f.startsWith('~$'))
  : [];

if (!nguon.length) {
  console.log(`Không có file .docx nào trong ${THU_MUC_NGUON}/ — chưa có gì để làm.`);
  process.exit(0);
}

mkdirSync(THU_MUC_HINH, { recursive: true });

const danhMuc = [];
let loiNang = 0;
const hinhDaGhi = new Set();
const trangDaSinh = [];

for (const tep of nguon) {
  const { doan, rels, zip } = await docDocx(join(THU_MUC_NGUON, tep));
  const cauTho = catThanhCau(doan);

  // Bản vá: cùng tên với file Word, đuôi .va.json
  const duongVa = join(THU_MUC_NGUON, basename(tep, '.docx') + '.va.json');
  const va = existsSync(duongVa) ? JSON.parse(readFileSync(duongVa, 'utf8')) : {};
  const ma = va.id ?? basename(tep, '.docx').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();

  // Tiêu đề: dòng đầu tiên có chữ, trước câu 1
  const tieuDe = va.ten ?? doan.find((d) => d.chu.trim())?.chu.trim() ?? ma;

  // Chuyên đề để gom nhóm ngoài giao diện. Mặc định lấy luôn tên bộ đề — hiện
  // mỗi chương một file nên trùng nhau. Khai riêng khi một chương có nhiều bộ
  // đề ("Nitrogen - đề 1", "Nitrogen - đề 2" cùng chuyên đề "Nitrogen"), lúc
  // đó học sinh chọn chuyên đề là gộp câu của cả mấy bộ.
  const chuyenDe = va.chuyenDe ?? tieuDe;

  const cau = [];
  const canNguoiDoc = [];
  const dapAnSuyRa = [];
  let byteHinh = 0;

  for (let i = 0; i < cauTho.length; i++) {
    const c = cauTho[i];
    const so = i + 1;
    const vaCau = va.cau?.[String(so)] ?? {};
    const de = vaCau.de ?? c.de;

    const banGhi = {
      so,
      de,
      luaChon: vaCau.luaChon ?? c.luaChon,
      dapAn: vaCau.dapAn ?? c.dapAn,
    };

    if (vaCau.bang) banGhi.bang = vaCau.bang; // bảng số liệu gõ lại thay cho ảnh

    // Đáp án do NGƯỜI SUY RA vì bản gốc của thầy quên đánh dấu. Ghi vào dữ
    // liệu để app còn hiện được cảnh báo, và đếm riêng trong báo cáo — đây là
    // thứ phải hỏi lại thầy chứ không được lặng lẽ coi như xong.
    if (vaCau.dapAnSuyRa) {
      banGhi.dapAnSuyRa = true;
      dapAnSuyRa.push(so);
    }

    // Chỉ giữ ảnh minh họa thật (png/jpg). Ảnh .wmf là bản xem trước của công
    // thức MathType — vẽ ra chỉ còn mấy vạch đen, giữ lại chỉ tổ nặng file.
    for (const rid of c.hinh) {
      const dich = rels[rid] ?? '';
      if (!/\.(png|jpe?g|gif)$/i.test(dich)) continue;
      if (vaCau.boHinh) continue;
      const buf = await zip.file('word/' + dich.replace(/^\.\//, '')).async('nodebuffer');
      const { ten, byte } = await luuHinh(buf, vaCau.catHinh);
      banGhi.hinh = ten;
      if (!hinhDaGhi.has(ten)) {
        hinhDaGhi.add(ten);
        byteHinh += byte;
      }
    }

    // Dọn mốc ảnh trong đề bài. Trong bản Word, MỖI ảnh để lại một mốc — kể cả
    // ảnh xem trước của công thức MathType, thứ ta không giữ. Nên phải:
    //   - giữ đúng MỘT mốc, ở chỗ ảnh thật sự được giữ lại;
    //   - đổi thành mốc bảng nếu bản vá đã thay ảnh chụp bảng bằng bảng gõ lại;
    //   - xóa sạch nếu rốt cuộc không giữ ảnh nào.
    // Sót mốc thừa thì đề hiện ra "{{hinh}}" giữa câu, học sinh đọc thấy ngay.
    const loaiMoc = banGhi.bang ? MOC_BANG : banGhi.hinh ? MOC_HINH : null;
    let daDatMoc = false;
    banGhi.de = banGhi.de
      .split(MOC_HINH)
      .reduce((gom, phan, i) => {
        if (i === 0) return phan;
        if (loaiMoc && !daDatMoc) {
          daDatMoc = true;
          return gom + loaiMoc + phan;
        }
        return gom + phan;
      }, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    // Ảnh nằm ngoài phần đề bài (ví dụ lẫn trong khu vực lựa chọn) thì không có
    // mốc nào để cắm — cho xuống cuối đề, còn hơn là mất hẳn.
    if (loaiMoc && !daDatMoc) banGhi.de += '\n' + loaiMoc;

    // Câu có MathType là câu THIẾU CHỮ, dù phần đọc được nhìn vẫn xuôi. Chỉ
    // hết cảnh báo khi người soi xong và khai "daSoi": true trong bản vá.
    if (c.coCongThuc && !vaCau.daSoi) canNguoiDoc.push(so);
    cau.push(banGhi);
  }

  // ----- Tự kiểm -----
  const loi = [];
  const thieuLuaChon = cau.filter((c) => c.luaChon.length !== 4 || c.luaChon.some((x) => !x));
  const thieuDapAn = cau.filter((c) => c.dapAn < 0);
  const trungLuaChon = cau.filter((c) => new Set(c.luaChon).size !== c.luaChon.length);
  // Số câu ghi trong file phải khớp thứ tự đếm được. Lệch nghĩa là cắt sai chỗ.
  const lechSo = cauTho
    .map((c, i) => ({ dem: i + 1, ghi: c.soGhi }))
    .filter((x) => x.ghi !== null && x.ghi !== x.dem);

  if (thieuLuaChon.length) loi.push(`${thieuLuaChon.length} câu không đủ 4 lựa chọn: ${thieuLuaChon.map((c) => c.so).join(', ')}`);
  if (thieuDapAn.length) loi.push(`${thieuDapAn.length} câu không tìm ra đáp án gạch chân: ${thieuDapAn.map((c) => c.so).join(', ')}`);
  if (trungLuaChon.length) loi.push(`${trungLuaChon.length} câu có lựa chọn trùng nhau: ${trungLuaChon.map((c) => c.so).join(', ')}`);
  if (lechSo.length) loi.push(`${lechSo.length} chỗ lệch số câu (đếm/ghi): ${lechSo.map((x) => x.dem + '/' + x.ghi).join(', ')}`);
  if (canNguoiDoc.length) loi.push(`${canNguoiDoc.length} câu có công thức MathType nên THIẾU CHỮ, người phải soi rồi khai daSoi: ${canNguoiDoc.join(', ')}`);

  const raJson = { id: ma, ten: tieuDe, chuyenDe, nguon: tep, soCau: cau.length, cau };
  writeFileSync(join(THU_MUC_RA, ma + '.json'), JSON.stringify(raJson, null, 1) + '\n');
  danhMuc.push({ id: ma, ten: tieuDe, chuyenDe, soCau: cau.length });

  // Trang duyệt cho thầy cô. Đặt ở gốc dự án, KHÔNG cam kết vào git — nó là
  // bản in ra để soi rồi bỏ, y như structure-review.html của kho hình cấu tạo.
  const tomTat = [
    `Đủ 4 lựa chọn: ${cau.length - thieuLuaChon.length}/${cau.length}`,
    `Có đúng một đáp án: ${cau.length - thieuDapAn.length}/${cau.length}`,
    `Không có lựa chọn trùng nhau: ${cau.length - trungLuaChon.length}/${cau.length}`,
    `Số câu khớp với bản Word: ${lechSo.length ? lechSo.length + ' chỗ LỆCH' : 'đạt'}`,
    `Đáp án lấy đúng từ dấu gạch chân của thầy: ${cau.length - dapAnSuyRa.length}/${cau.length}`,
  ];
  const tenTrang = `de-review-${ma}.html`;
  writeFileSync(tenTrang, trangDuyet(raJson, tomTat, 'public/de/hinh/'));
  trangDaSinh.push(tenTrang);

  const cvJson = readFileSync(join(THU_MUC_RA, ma + '.json')).length;
  console.log(`\n=== ${tep} ===`);
  console.log(`Mã bộ đề     : ${ma}`);
  console.log(`Số câu       : ${cau.length}` + (va.soCau && va.soCau !== cau.length ? `  ✗ bản vá khai ${va.soCau}` : ''));
  console.log(`Ảnh giữ lại  : ${cau.filter((c) => c.hinh).length} câu, ${(byteHinh / 1024).toFixed(1)} KB sau nén`);
  console.log(`Chữ (JSON)   : ${(cvJson / 1024).toFixed(1)} KB`);
  console.log(`\n— TỰ KIỂM —`);
  console.log(`1. Đủ 4 lựa chọn   : ${cau.length - thieuLuaChon.length}/${cau.length}`);
  console.log(`2. Có đáp án       : ${cau.length - thieuDapAn.length}/${cau.length}`);
  console.log(`3. Lựa chọn không trùng: ${cau.length - trungLuaChon.length}/${cau.length}`);
  console.log(`4. Số câu khớp file: ${lechSo.length ? lechSo.length + ' chỗ LỆCH' : 'đạt'}`);
  console.log(`5. Không dính MathType: ${cau.length - canNguoiDoc.length}/${cau.length}`);
  console.log(`6. Đáp án lấy từ bản gốc: ${cau.length - dapAnSuyRa.length}/${cau.length}`);

  if (dapAnSuyRa.length) {
    console.log(
      `
⚠ ${dapAnSuyRa.length} câu có đáp án do NGƯỜI SUY RA, bản gốc của thầy` +
        ` không đánh dấu: ${dapAnSuyRa.join(', ')} — phải hỏi lại thầy để xác nhận.`,
    );
  }

  if (loi.length) {
    console.log('');
    loi.forEach((x) => console.log('   ✗ ' + x));
    loiNang += loi.length;
  } else {
    console.log('\nSạch — không có lỗi.');
  }
}

// Dọn file mồ côi: đề sửa lại, đổi mã bộ đề hay đổi ảnh thì bản cũ không ai
// trỏ tới nữa. Không dọn thì thư mục phình mãi theo lịch sử chỉnh sửa, mà tệ
// hơn: file .json cũ vẫn nằm đó, vẫn tải về được, app có thể vẫn đọc nhầm.
let daDon = 0;
for (const f of readdirSync(THU_MUC_HINH)) {
  if (f.endsWith('.png') && !hinhDaGhi.has(f)) {
    rmSync(join(THU_MUC_HINH, f));
    daDon++;
  }
}
const maConDung = new Set(danhMuc.map((d) => d.id + '.json'));
for (const f of readdirSync(THU_MUC_RA)) {
  if (f.endsWith('.json') && f !== 'danh-muc.json' && !maConDung.has(f)) {
    rmSync(join(THU_MUC_RA, f));
    daDon++;
  }
}

writeFileSync(join(THU_MUC_RA, 'danh-muc.json'), JSON.stringify(danhMuc, null, 1) + '\n');

console.log(`\n${'─'.repeat(50)}`);
console.log(`✓ ${danhMuc.length} bộ đề → ${THU_MUC_RA}/`);
console.log(`✓ ${hinhDaGhi.size} ảnh dùng chung → ${THU_MUC_HINH}/`);
if (daDon) console.log(`✓ Dọn ${daDon} file mồ côi`);
trangDaSinh.forEach((t) => console.log(`✓ Trang duyệt cho thầy cô: ${t}`));
if (loiNang) {
  console.log(`\n✗ CÒN ${loiNang} VIỆC PHẢI SỬA (xem bên trên).`);
  process.exitCode = 1;
}
