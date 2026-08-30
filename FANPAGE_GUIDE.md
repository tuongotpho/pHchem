# Hướng Dẫn & Kế Hoạch Quản Lý Fanpage Ph-Chem (Tuần 1)

Tài liệu này ghi nhớ toàn bộ quy trình, công cụ kỹ thuật và trạng thái các bài đăng Fanpage để mọi phiên làm việc tiếp theo có thể tiếp nhận và vận hành trơn tru.

---

## 1. Thông Tin Kết Nối Fanpage

* **Tên Fanpage:** `Ph-Chem`
* **Page ID:** `1409676485553930`
* **Link Trang:** https://www.facebook.com/1409676485553930
* **Quyền API đã cấp:** `pages_manage_posts`, `pages_read_engagement`, `pages_show_list`
* **File lưu Token:** `.env.local` (nằm trong `.gitignore`, tuyệt đối không commit lên git)

---

## 2. Quy Tắc Bắt Buộc Khi Đăng Bài (Brand Guidelines)

1. ⚠️ **Tên miền duy nhất:** CHỈ sử dụng liên kết `https://ph-chem.web.app/` (hoặc các link con như `/quiz`, `/table`, `/calculator`). **TUYỆT ĐỐI KHÔNG** đưa link dự phòng `github.io` vào bài viết.
2. ⚠️ **Chính sách quảng cáo:** ĐÃ GỠ BỎ toàn bộ các tuyên bố "không quảng cáo" / "miễn phí" trong mã nguồn app và bài đăng (sẵn sàng cho kế hoạch gắn quảng cáo về sau).
3. ⚠️ **Ảnh xem trước:** Thẻ `og:image` trỏ tới banner HD 1200×630 tại `public/og-image.png`.

---

## 3. Trạng Thái Lịch Đăng Tuần 1: Giới Thiệu 7 Tính Năng Cốt Lõi

Toàn bộ 7 bài viết tính năng đã được **lên lịch tự động thành công 100% trên Facebook**:

| STT | Khung Giờ Phát Hành | Chủ Đề Tính Năng | ID Bài Viết Facebook | Link Trỏ Về |
| :---: | :---: | :--- | :--- | :--- |
| **Bài 0** | Đã đăng | 🔬 Giới thiệu tổng quan pH-Chem | `1409676485553930_122093844825471598` | `/` |
| **Bài 1** | **19:45 Thứ Hai (31/08)** | 🔬 Bảng tuần hoàn 118 nguyên tố tương tác | `1409676485553930_122093861013471598` | `/table` |
| **Bài 2** | **11:45 Thứ Ba (01/09)** | ⚡ Máy tính Hóa học: Cân bằng & Chất hết/dư | `1409676485553930_122093861037471598` | `/calculator` |
| **Bài 3** | **19:45 Thứ Tư (02/09)** | 🧪 Máy tính pH & Nồng độ dung dịch | `1409676485553930_122093861067471598` | `/calculator` |
| **Bài 4** | **19:45 Thứ Năm (03/09)** | 🔋 Dãy điện hóa kim loại & Quy tắc Alpha | `1409676485553930_122093861133471598` | `/electro` |
| **Bài 5** | **11:45 Thứ Sáu (04/09)** | 💧 Ma trận độ tan & Kho 224+ phản ứng | `1409676485553930_122093861157471598` | `/solubility` |
| **Bài 6** | **14:30 Thứ Bảy (05/09)** | 🧬 Thư viện 340+ chất & 274 hình 2D IUPAC | `1409676485553930_122093861199471598` | `/formulas` |
| **Bài 7** | **20:00 Chủ Nhật (06/09)**| 🎯 Phòng luyện đề trắc nghiệm & Xuất phiếu điểm | `1409676485553930_122093861277471598` | `/quiz` |

---

## 4. Bộ Công Cụ Tự Động (`scripts/`)

| Script | Chức năng |
| :--- | :--- |
| `scripts/fanpage-manager.mjs` | Quản lý kết nối, đăng bài và kiểm tra tương tác |
| `scripts/schedule-week-1.mjs` | Script lên lịch phát hành tuần 1 |
| `scripts/delete-scheduled.mjs` | Script xóa các bài viết đang hẹn giờ khi cần đặt lại lịch |
| `scripts/check-scheduled.mjs` | Tra cứu danh sách các bài viết đang hẹn giờ trên Facebook |
| `scripts/gen-og-banner.mjs` | Sinh ảnh Banner Open Graph 1200×630 |
