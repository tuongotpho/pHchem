// Mã định danh ngắn cho những mục dữ liệu KHÔNG có sẵn khóa riêng (Sự thật).
//
// Vì sao không dùng số thứ tự trong mảng: chèn thêm một mục ở giữa file là mọi
// số thứ tự phía sau lệch hết, đường dẫn đã lưu sẽ trỏ nhầm sang mục khác mà
// không ai biết. Mã tính từ chính nội dung thì thêm/bớt/đảo chỗ đều không ảnh
// hưởng; chỉ khi sửa nội dung mục đó thì mã mới đổi — lúc ấy đường dẫn cũ
// không khớp mục nào và app hiện danh sách bình thường, không trỏ nhầm.
//
// Thuật toán FNV-1a 32 bit: ngắn gọn, không cần thư viện, đủ tránh trùng cho
// vài trăm mục.

export function itemId(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    // h * 16777619 nhưng giữ trong 32 bit
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h.toString(36);
}
