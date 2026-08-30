# Hướng Dẫn & Sổ Bàn Giao Quản Lý Fanpage Ph-Chem

Tài liệu này ghi nhớ toàn bộ quy trình, công cụ kỹ thuật và trạng thái bài đăng Fanpage để mọi phiên làm việc tiếp theo có thể tiếp nhận và vận hành ngay lập tức.

---

## 1. Thông Tin Kết Nối Fanpage

* **Tên Fanpage:** `Ph-Chem`
* **Page ID:** `1409676485553930`
* **Link Trang:** https://www.facebook.com/1409676485553930
* **Quyền API đã cấp:** `pages_manage_posts`, `pages_read_engagement`, `pages_show_list`
* **File lưu Token:** `.env.local` (nằm trong `.gitignore`, tuyệt đối không commit lên git)
  * `FB_PAGE_ID=1409676485553930`
  * `FB_PAGE_ACCESS_TOKEN=...`

---

## 2. Quy Tắc Bắt Buộc Khi Đăng Bài (Brand & Content Guidelines)

1. ⚠️ **Tên miền duy nhất:** CHỈ sử dụng liên kết `https://ph-chem.web.app/` (hoặc các link con như `/quiz`, `/table`, `/calculator`). **TUYỆT ĐỐI KHÔNG** đưa link dự phòng `github.io` vào bài viết.
2. ⚠️ **Chính sách quảng cáo:** ĐÃ GỠ BỎ toàn bộ các tuyên bố "không quảng cáo" / "miễn phí" trong mã nguồn app và bài đăng (để chuẩn bị cho kế hoạch gắn quảng cáo sau này).
3. ⚠️ **Ảnh xem trước (OpenGraph Preview):** Đã cấu hình thẻ `og:image` trỏ tới banner HD 1200×630 tại `public/og-image.png`.

---

## 3. Danh Sách Công Cụ Tự Động (Scripts)

Mọi công cụ đều nằm trong thư mục `scripts/` và chạy bằng Node.js:

| Script | Lệnh chạy | Chức năng |
| :--- | :--- | :--- |
| **`scripts/fanpage-manager.mjs`** | `node scripts/fanpage-manager.mjs test` | Kiểm tra trạng thái kết nối tới Fanpage |
| | `node scripts/fanpage-manager.mjs fact` | Lấy 1 fact ngẫu nhiên trong app và đăng ngay lên Page |
| | `node scripts/fanpage-manager.mjs recent` | Lấy danh sách tương tác/bình luận bài viết gần nhất |
| **`scripts/check-scheduled.mjs`** | `node scripts/check-scheduled.mjs` | Kiểm tra danh sách các bài viết đang được hẹn giờ trên Facebook |
| **`scripts/gen-og-banner.mjs`** | `node scripts/gen-og-banner.mjs` | Tự động sinh lại ảnh Banner Open Graph 1200×630 |
| **`scripts/fanpage-content.mjs`** | Module nội bộ | Chứa các template sinh nội dung bài viết theo dữ liệu app |

---

## 4. Trạng Thái Lịch Đăng Tuần 1 (Đã Lên Lịch trên Facebook)

| STT | Thời gian phát hành | Trạng thái | ID bài viết trên Facebook | Chủ đề tóm tắt |
| :---: | :---: | :---: | :--- | :--- |
| **Bài 0** | Đã đăng | ✅ **Live** | `1409676485553930_122093844825471598` | Giới thiệu chính thức bộ công cụ pH-Chem |
| **Bài 1** | **19:30 Thứ Hai (31/08)** | ⏳ **Đã lên lịch** | `1409676485553930_122093846403471598` | ⚗️ Đố vui khởi động: Cho Na vào CuSO₄ |
| **Bài 2** | **11:30 Thứ Ba (01/09)** | ⏳ **Đã lên lịch** | `1409676485553930_122093846421471598` | 🤯 Mẹo tính chất hết/dư & thể tích khí trong 3s |
| **Bài 3** | **20:00 Thứ Tư (02/09)** | ⏳ **Đã lên lịch** | `1409676485553930_122093856795471598` | 🌌 Góc Hóa học: Nhiệt độ nóng chảy bí ẩn của Radium |
| **Bài 4** | **19:30 Thứ Năm (03/09)** | 📝 *Sẵn sàng* | — | ⚡ Dãy điện hóa kim loại & quy tắc Alpha |
| **Bài 5** | **20:00 Thứ Sáu (04/09)** | 📝 *Sẵn sàng* | — | 👨‍🏫 Góc Thầy Cô: Số hóa đề thi từ file Word |
| **Bài 6** | **14:00 Thứ Bảy (05/09)** | 📝 *Sẵn sàng* | — | 📴 Mẹo cài đặt app chạy Offline không cần mạng |
| **Bài 7** | **20:00 Chủ Nhật (06/09)** | 📝 *Sẵn sàng* | — | 🏆 Minigame cuối tuần: Khoe phiếu điểm 10 |

---

## 5. Lệnh Phổ Biến Cho Phiên Tiếp Theo

Khi bắt đầu phiên mới, bạn có thể yêu cầu:
1. *"Kiểm tra danh sách bài viết đã lên lịch trên Fanpage"* ➔ Chạy `node scripts/check-scheduled.mjs`.
2. *"Lên lịch tiếp Bài 4 (Dãy điện hóa)"* ➔ Lên lịch vào Thứ Năm lúc 19:30.
3. *"Đăng một bài viết mới về chủ đề X"* ➔ Soạn bài và phát lệnh qua `postMessage()`.
