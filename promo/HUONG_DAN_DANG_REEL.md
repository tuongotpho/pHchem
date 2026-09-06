# 📅 LỊCH PHÁT HÀNH & HƯỚNG DẪN ĐĂNG 10 VIDEO REEL FANPAGE

> **Mục tiêu**: Đăng tải 10 video Reel "Bạn Có Biết?" lên Fanpage Facebook với tần suất **2 video / ngày** vào các khung giờ vàng.  
> **Website chính thức trong bài**: `https://ph-chem.web.app/`

---

## I. MA TRẬN LỊCH ĐĂNG (2 VIDEO / NGÀY)

Toàn bộ 10 video độ phân giải cao 9:16 (720x1280) kèm giọng đọc đã được tạo sẵn tại thư mục [`promo/reels/`](./reels/):

| Ngày | Ca đăng | Tập Reel | Tệp Video MP4 | Tiêu đề | Tính năng app liên kết |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Thứ Bảy 05/09/2026** | ☀️ **11:45** | **Tập 1** | `reel_01_kien_can.mp4` | Bị kiến cắn: Vì sao bôi vôi / xà phòng? | [Máy tính pH & Phản ứng](https://ph-chem.web.app/calculator) |
| **Thứ Bảy 05/09/2026** | 🌙 **19:45** | **Tập 2** | `reel_02_da_noi.mp4` | Nghịch lý nước đá nổi cứu sống hành tinh | [Thư viện 340+ hợp chất 3D](https://ph-chem.web.app/formulas) |
| **Chủ Nhật 06/09/2026**| ☀️ **11:45** | **Tập 3** | `reel_03_con_70_do.mp4` | Vì sao cồn 70° diệt khuẩn tốt hơn cồn 90°? | [Pha loãng nồng độ dung dịch](https://ph-chem.web.app/calculator) |
| **Chủ Nhật 06/09/2026**| 🌙 **19:45** | **Tập 4** | `reel_04_hanh_cay_mat.mp4` | Cắt hành tây bị cay mắt & mẹo ngâm nước | [Tra cứu hợp chất hữu cơ](https://ph-chem.web.app/formulas) |
| **Thứ Hai 07/09/2026** | ☀️ **11:45** | **Tập 5** | `reel_05_kim_cuong_chay.mp4` | Kim cương có bị lửa thiêu rụi thành khói? | [Bảng tuần hoàn 118 nguyên tố](https://ph-chem.web.app/table) |
| **Thứ Hai 07/09/2026** | 🌙 **19:45** | **Tập 6** | `reel_06_baking_soda_giam.mp4` | Baking Soda + Giấm: Núi lửa tẩy rửa | [Cân bằng phản ứng tự động](https://ph-chem.web.app/reactions) |
| **Thứ Ba 08/09/2026**  | ☀️ **11:45** | **Tập 7** | `reel_07_mau_phao_hoa.mp4` | Vì sao pháo hoa có muôn màu rực rỡ? | [Thử màu ngọn lửa kim loại](https://ph-chem.web.app/table) |
| **Thứ Ba 08/09/2026**  | 🌙 **19:45** | **Tập 8** | `reel_08_mau_xanh_muc_cua.mp4` | Mực & sam biển có máu xanh ngọc bích | [Dãy điện hóa & Phức chất](https://ph-chem.web.app/electro) |
| **Thứ Tư 09/09/2026**  | ☀️ **11:45** | **Tập 9** | `reel_09_nuoc_ngot_co_ga.mp4` | Tiếng xì xì bí ẩn khi mở lon nước ngọt | [Phòng thi trắc nghiệm 30s](https://ph-chem.web.app/quiz) |
| **Thứ Tư 09/09/2026**  | 🌙 **19:45** | **Tập 10**| `reel_10_tui_khi_o_to.mp4` | Túi khí ô tô nổ cứu mạng trong 0.03 giây | [Cân bằng phản ứng & Số mol](https://ph-chem.web.app/calculator) |

---

## II. 2 CÁCH THỰC HIỆN LÊN LỊCH ĐĂNG BÀI

### 🚀 Cách 1: Tự động lên lịch bằng Script (Khuyên Dùng)

Script `scripts/schedule-fact-reels.mjs` đã tích hợp trực tiếp **Meta Graph Reels Publishing API** (`POST /{page-id}/video_reels`).

> ⚠️ **Lưu ý quan trọng**: Token Facebook Page trong file `.env.local` của bạn vừa hết hạn vào lúc 02:00 sáng nay (`code 190: Session has expired`).

**Các bước để chạy tự động:**
1. Truy cập [Meta for Developers — Graph API Explorer](https://developers.facebook.com/tools/explorer/).
2. Chọn Fanpage của bạn, cấp quyền `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `publish_video`.
3. Lấy **Page Access Token** mới và dán vào file `.env.local`:
   ```env
   FB_PAGE_ID=1409676485553930
   FB_PAGE_ACCESS_TOKEN=<Dán_token_mới_vào_đây>
   ```
4. Mở Terminal và gõ đúng 1 lệnh để tự động đặt lịch cho toàn bộ 10 video:
   ```bash
   node scripts/schedule-fact-reels.mjs
   ```
   *(Hoặc nếu chỉ muốn hẹn giờ từng tập: `node scripts/schedule-fact-reels.mjs 1`)*

Hệ thống sẽ tự động upload binary lên máy chủ Meta, tạo bài đăng Reel và đặt giờ phát hành chính xác theo bảng ma trận ở trên.

---

### 🌐 Cách 2: Đặt lịch trực tiếp qua Meta Business Suite (Không cần Token)

Nếu bạn không muốn lấy Token mới từ Meta Developers:
1. Mở trang xem trước tương tác: [`promo/preview-reels.html`](./preview-reels.html).
2. Chọn từng tập:
   - Bấm nút **"⬇️ Tải file MP4"** để lấy video tương ứng.
   - Bấm nút **"📋 Sao chép Caption"** để lấy nội dung bài viết kèm đầy đủ hashtag và liên kết app.
3. Mở **[Meta Business Suite Planner](https://business.facebook.com/latest/content_calendar)**:
   - Bấm **"Tạo thước phim" (Create Reel)**.
   - Kéo thả file video MP4 vào.
   - Dán Caption đã copy.
   - Chọn mục **"Lên lịch" (Schedule)** và chọn giờ tương ứng (Ca trưa 11:45 hoặc Ca tối 19:45).
