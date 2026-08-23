// Đọc/ghi kho lưu của trình duyệt (localStorage) mà không làm sập app.
//
// VÌ SAO PHẢI BỌC: localStorage KHÔNG phải lúc nào cũng dùng được. Safari chế
// độ riêng tư, trình duyệt chặn cookie bên thứ ba khi app nằm trong khung
// nhúng, hoặc bộ nhớ đầy — cả ba trường hợp đều làm localStorage NÉM LỖI chứ
// không phải trả về null.
//
// Chỗ đọc nằm ngay lúc dựng ThemeProvider và LangProvider, tức gốc của cây
// giao diện. Ném lỗi ở đó mà không ai bắt thì React tháo sạch cây, người dùng
// nhận một trang TRẮNG TINH, không một chữ báo lỗi. Đây là app chạy ngoại
// tuyến, người ta mở trong đủ kiểu môi trường lạ.
//
// Giống rơ-le bảo vệ: mất nguồn nuôi thì chỉ nên mất chức năng bảo vệ, không
// được cắt luôn cả lộ.

/** Đọc một giá trị đã lưu. Kho lưu hỏng hay bị chặn thì coi như chưa lưu gì. */
export function doc(khoa: string): string | null {
  try {
    return localStorage.getItem(khoa);
  } catch {
    return null;
  }
}

/**
 * Ghi một giá trị. Ghi không được thì bỏ qua, KHÔNG ném lỗi.
 * Mất chức năng nhớ lựa chọn là chuyện nhỏ; sập app mới là chuyện lớn.
 */
export function ghi(khoa: string, giaTri: string): void {
  try {
    localStorage.setItem(khoa, giaTri);
  } catch {
    // Cố ý nuốt lỗi. Xem phần giải thích ở đầu file.
  }
}
