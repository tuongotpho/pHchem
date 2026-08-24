// Bộ đếm nguyên tử DÙNG CHUNG cho app và cho script sinh hình cấu tạo.
//
// VÌ SAO PHẢI CHUNG: trước đây có HAI bản viết riêng — một ở lib/formula.ts
// cho app, một chép lại trong scripts/gen-structures.mjs. Mà chính script đó
// dùng bản của nó để đối chiếu "công thức khai báo có khớp SMILES không" —
// phép kiểm chống sai dữ liệu mạnh nhất của dự án. Hai bản lệch nhau thì phép
// kiểm ấy mất hiệu lực mà không ai biết: script gật đầu cho một công thức mà
// app lại đọc ra thành phần khác.
//
// VÌ SAO LÀ FILE .js CHỨ KHÔNG PHẢI .ts: script chạy bằng Node trần, không
// qua bộ dịch nào. Kiểu dữ liệu khai bằng chú thích JSDoc nên TypeScript vẫn
// hiểu đầy đủ, mà Node vẫn nạp thẳng được.
//
// HAI CHẾ ĐỘ, cố ý khác nhau:
//   - CHẶT CHẼ (app dùng): người dùng gõ tay nên gặp gì lạ là báo lỗi ngay,
//     kèm cả việc kiểm ký hiệu nguyên tố có thật không.
//   - DỄ TÍNH (script dùng): dữ liệu đã tin được, và còn phải đọc trôi những
//     thứ không phải nguyên tố — như chữ "n" trong công thức polime (C2H4)n.
//
// Riêng luật "hệ số không được đứng trước cả chất" thì áp cho CẢ HAI: không
// công thức hóa học nào bắt đầu bằng chữ số, và đã kiểm 295 khóa trong
// smiles.json, không khóa nào như vậy.

/** @typedef {Record<string, number>} ThanhPhan ký hiệu nguyên tố → số nguyên tử */

/**
 * Đếm số nguyên tử từng nguyên tố trong một công thức.
 * Hiểu ngoặc lồng nhau và muối ngậm nước: Ca(OH)2, Al2(SO4)3, CuSO4.5H2O
 *
 * @param {string} chuoi công thức, đã bỏ khoảng trắng nếu cần
 * @param {object} [tuyChon]
 * @param {boolean} [tuyChon.chatChe] gặp gì lạ thì ném lỗi thay vì bỏ qua
 * @param {((kyHieu: string) => boolean) | null} [tuyChon.nguyenToHopLe]
 *        hàm kiểm ký hiệu nguyên tố; chỉ dùng khi chặt chẽ
 * @returns {ThanhPhan}
 */
export function demNguyenTu(chuoi, tuyChon = {}) {
  const { chatChe = false, nguyenToHopLe = null } = tuyChon;

  /** @type {ThanhPhan} */
  const tong = {};
  const doan = chuoi
    .split(/[.·*]/)
    .map((x) => x.trim())
    .filter(Boolean);

  for (let i = 0; i < doan.length; i++) {
    const seg = doan[i];
    // Hệ số đứng trước đoạn ngậm nước, ví dụ "5H2O" trong CuSO4.5H2O
    const m = seg.match(/^(\d+)(.+)$/);
    let heSo = 1;
    let than = seg;
    if (m && /[A-Z(]/.test(m[2][0])) {
      // Số dẫn đầu chỉ có nghĩa "mấy phân tử nước ngậm vào" khi đứng SAU dấu
      // chấm. Đứng trước cả chất thì đó là hệ số phương trình, không thuộc về
      // công thức — nhận bừa thì "2H2O" ra 36,03 g/mol và bị dán nhãn là khối
      // lượng mol của nước.
      if (i === 0)
        throw new Error(
          'Bỏ hệ số đứng trước công thức — ô này chỉ nhận công thức của một chất',
        );
      heSo = parseInt(m[1], 10);
      than = m[2];
    }
    const c = demMotDoan(than, chatChe, nguyenToHopLe);
    for (const k in c) tong[k] = (tong[k] || 0) + c[k] * heSo;
  }
  return tong;
}

/**
 * Đếm một đoạn không có dấu chấm.
 * @param {string} s
 * @param {boolean} chatChe
 * @param {((kyHieu: string) => boolean) | null} nguyenToHopLe
 * @returns {ThanhPhan}
 */
function demMotDoan(s, chatChe, nguyenToHopLe) {
  let i = 0;
  const n = s.length;

  /** @returns {ThanhPhan} */
  function nhom() {
    /** @type {ThanhPhan} */
    const out = {};
    while (i < n) {
      const ch = s[i];
      if (ch === '(' || ch === '[') {
        i++;
        const trong = nhom();
        if (chatChe && s[i] !== ')' && s[i] !== ']')
          throw new Error('Thiếu dấu đóng ngoặc');
        i++; // bỏ dấu đóng
        const soLan = doSo();
        for (const k in trong) out[k] = (out[k] || 0) + trong[k] * soLan;
      } else if (ch === ')' || ch === ']') {
        break; // để lời gọi ngoài xử lý
      } else if (/[A-Z]/.test(ch)) {
        const kyHieu = docKyHieu();
        const dem = doSo();
        if (chatChe && nguyenToHopLe && !nguyenToHopLe(kyHieu))
          throw new Error(`Không rõ nguyên tố: ${kyHieu}`);
        out[kyHieu] = (out[kyHieu] || 0) + dem;
      } else if (chatChe) {
        throw new Error(`Ký tự không hợp lệ: "${ch}"`);
      } else {
        i++; // dữ liệu đã tin được — bỏ qua, vd chữ "n" của polime
      }
    }
    return out;
  }

  /** @returns {string} */
  function docKyHieu() {
    let kyHieu = s[i]; // chữ hoa
    i++;
    while (i < n && /[a-z]/.test(s[i])) {
      kyHieu += s[i];
      i++;
    }
    return kyHieu;
  }

  /** @returns {number} */
  function doSo() {
    let so = '';
    while (i < n && /[0-9]/.test(s[i])) {
      so += s[i];
      i++;
    }
    return so === '' ? 1 : parseInt(so, 10);
  }

  const kq = nhom();
  if (chatChe && i < n) throw new Error(`Dư ký tự ở vị trí ${i + 1}`);
  return kq;
}
