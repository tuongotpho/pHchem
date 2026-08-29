// Hai luật đọc chữ số trong công thức hóa học. TÁCH RIÊNG KHỎI FormulaText.tsx
// vì đây là logic thuần, không dính React — nhờ vậy chạy được phép kiểm tự động
// (xem chiSoCongThuc.test.ts), đúng lối đã làm với deParse.mjs bên bộ sinh đề.
//
// Cả hai luật đều đã từng SAI VÀ SAI LẶNG LẼ: trang vẫn hiện, công thức vẫn đủ
// nguyên tố, chỉ có một chữ số nằm sai tầng — mà nằm sai tầng là ra một chất
// khác. Chi tiết từng ca ghi ngay trên mỗi hàm.

/**
 * Cắt một công thức thành từng mẩu, mỗi mẩu kèm cờ "có phải chỉ số dưới không".
 *
 * LUẬT DUY NHẤT: chữ số CHỈ hạ xuống khi ký tự đứng ngay trước nó là chữ cái
 * hoặc dấu đóng ngoặc. Đứng sau thứ gì khác thì nó đếm số phân tử, phải giữ cỡ
 * thường.
 *
 * Luật cũ là "cứ chữ số nào không nằm đầu chuỗi thì hạ" — sai ở muối ngậm nước.
 * CuSO₄·5H₂O bị vẽ thành "CuSO₄.₅H₂O": số 5 đếm năm phân tử nước bị tụt xuống
 * thành chỉ số, hóa ra một chất không có thật. Đây là chất có sẵn trong danh
 * sách bấm nhanh của trang Máy tính, tức là ai mở trang cũng nhìn thấy.
 *
 * Tách thành hàm thuần để chạy được phép kiểm tự động — xem FormulaText.test.ts.
 */
export function tachChiSo(value: string): { t: string; duoi: boolean }[] {
  const ra: { t: string; duoi: boolean }[] = [];
  for (const m of value.matchAll(/\d+|\D+/g)) {
    const t = m[0];
    const truoc = value[m.index - 1];
    ra.push({ t, duoi: /^\d/.test(t) && !!truoc && /[A-Za-z)\]]/.test(truoc) });
  }
  return ra;
}

/**
 * Tách một mẩu phương trình thành HỆ SỐ và CÔNG THỨC — trả null nếu không có
 * hệ số. Tách riêng ra hàm thuần để chạy được phép kiểm tự động: lỗi ở đây
 * không làm vỡ gì cả, chỉ làm sai hóa học một cách lặng lẽ.
 *
 * @param {string} mau
 * @returns {[string, string] | null}
 */
export function tachHeSo(mau: string): [string, string] | null {
  // \s* ở đầu là bắt buộc: mẩu đứng ngay sau mũi tên luôn dư một dấu cách.
  const m = mau.match(/^(\s*\d+\s+)(.+)$/);
  return m ? [m[1], m[2]] : null;
}
