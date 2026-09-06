# Bản đồ nội dung truyền thông pH-Chem

*Sinh tự động bằng `node scripts/kiem-ke.mjs` — cập nhật ngày 2026-09-06.*
*Đừng sửa tay file này, chạy lại lệnh là ra số mới.*

## 1. Video thành phẩm — tổng 289

| Loạt | Số video | Chất lượng | Thư mục |
|---|---:|---|---|
| Hồ sơ nguyên tố — bản 1 | 60 | 720x1280, ảnh tĩnh | `promo/reels/` |
| Hồ sơ nguyên tố — bản 2 | 61 | 1080x1920, có chuyển động | `promo/reels_v2/` |
| Chuyện lạ — bản 1 | 66 | 720x1280, ảnh tĩnh | `promo/reels/` |
| Chuyện lạ — bản 2 | 56 | 1080x1920, nền sáng, 3 cảnh | `promo/reels_chuyenla/` |
| An toàn hoá chất | 20 | 1080x1920, có chuyển động | `promo/reels_antoan/` |
| Lịch sử hoá học | 17 | 1080x1920, có chuyển động | `promo/reels_lichsu/` |
| Đố vui hoá học | 1 | 720x1280, ảnh tĩnh | `promo/reels/` |
| Video giới thiệu trang | 8 | giới thiệu từng trang của app | `promo/` |

## 2. Nội dung trong app đã lên video tới đâu

| Mục | Có trong app | Đã làm video | Ghi chú |
|---|---:|---:|---|
| Bảng tuần hoàn | 118 | 118 | xong cả 118 nguyên tố |
| Chuyện lạ hoá học | 236 | 236 | phủ kín — đo bằng node scripts/do-do-phu.mjs |
| Từ điển hoá học | 224 | 0 | CHƯA CÓ VIDEO NÀO |
| Công thức vô cơ | 154 | 0 | mới có video giới thiệu trang |
| Công thức hữu cơ | 144 | 0 | mới có video giới thiệu trang |
| Công thức vật lý | 43 | 0 | mới có video giới thiệu trang |
| Danh pháp IUPAC | 140 | 0 | CHƯA CÓ VIDEO NÀO |
| Dãy điện hoá | 21 | 0 | mới có video giới thiệu trang |

## 3. Trang của app

App có 12 trang: Calculator, Dictionary, Electro, ElementDetail, Facts, Formulas, Home, PeriodicTable, Quiz, Reactions, Settings, Solubility.

Đã có video giới thiệu: Calculator, Electro, Formulas, PeriodicTable, Quiz, Reactions, Solubility.
**Chưa có video giới thiệu: Dictionary, Facts, Home.**

## 4. Bài đăng chữ

64 bài đã soạn, rải trong `scripts/schedule-week-1..8.mjs`.

## 5. Lệnh hay dùng

```bash
node scripts/kiem-ke.mjs                    # chạy lại chính bản đồ này
```

| Việc | Lệnh |
|---|---|
| Dựng reel nguyên tố (bản 2) | `npm run gen:element-reels-v2 -- 11` |
| Soi bố cục chữ nguyên tố | `npm run soi:reels-v2` |
| Nghiệm thu video nguyên tố | `npm run nghiemthu:reels-v2` |
| Dựng reel an toàn hoá chất | `npm run gen:safety-reels -- all` |
| Soi / nghiệm thu loạt an toàn | `npm run soi:safety-reels` · `npm run nghiemthu:safety-reels` |
| Dựng reel lịch sử hoá học | `npm run gen:history-reels -- all` |
| Soi / nghiệm thu loạt lịch sử | `npm run soi:history-reels` · `npm run nghiemthu:history-reels` |
| Dựng reel chuyện lạ bản 2 | `npm run gen:fact-reels-v2 -- all` |
| Đo độ phủ chuyện lạ trên mọi loạt | `node scripts/do-do-phu.mjs` |
| Xem tình hình fanpage (chỉ đọc) | `node scripts/fanpage-tinhhinh.mjs` |
| Sinh nhạc nền tự tổng hợp | `npm run gen:music` |

Thêm `FORCE=1` ở đầu lệnh để dựng đè lên video đã có.

## 6. Ba phép kiểm bắt buộc trước khi đăng

Bài học rút ra trong quá trình làm, xếp theo thứ tự nên chạy:

1. **Soi bố cục** (`soi`) — chạy công thức ngắt dòng của 4 cảnh để tìm chữ tràn
   khung hoặc bị cắt, **không cần kết xuất ảnh nào**. Đã bắt được lỗi thật trong
   dữ liệu cũ (#58 Tecneti tràn chữ, #60 Oganesson bị cắt).

2. **Nghiệm thu file** (`nghiemthu`) — soi khung hình, thời lượng, có tiếng chưa,
   dung lượng của từng mp4.

3. **Đo cao độ giọng đọc** — phép kiểm mà hai bước trên KHÔNG thay thế được.
   Khi dịch vụ đọc của Microsoft đứt kết nối giữa chừng, script từng tự đổi sang
   giọng khác, làm một cảnh trong video đọc bằng giọng nữ còn ba cảnh kia giọng
   nam. File vẫn đủ khung hình, đủ tiếng, đủ dài nên **nghiệm thu vẫn báo đạt**.
   Đã gặp bốn lần: Astatin, Rượu methanol, Mendeleev và Alfred Nobel. Cách sửa
   nửa vời (thử lại 3 lần rồi mới đổi giọng) KHÔNG đủ. Nay `saveSpeech` nhận
   tham số khoá cứng một giọng: hết lượt thử thì báo lỗi dừng hẳn chứ không
   âm thầm đổi giọng. Vẫn nên đo lại cao độ khi dựng loạt lớn.

4. **Đo nhiễu động nền** — hoa văn mảnh cỡ 1 pixel bị rung khi nền zoom chậm,
   vừa lợn cợn mắt vừa làm file phình gấp đôi. Loạt lịch sử từng dính: 0,37 mức
   xám so với 0,01 của hai loạt kia, 12,86 MB so với 4,8 MB. Bỏ hoa văn là hết.

## 7. Việc còn treo

- **Lịch fanpage:** đã xếp lại theo lịch phát sóng cố định, chi tiết ở
  `promo/KE_HOACH_LICH_DANG.md`. Hàng chờ cạn đầu tháng 10; 151 video kiểu mới
  vẫn chưa lên lịch. Facebook chỉ cho hẹn tối đa 30 ngày, nên phải thêm bài
  nhỏ giọt theo ngày chứ đừng đổ cả trăm bài một lúc.
- Hai lỗi trong dữ liệu nguyên tố đợt 1 của Antigravity: #58 Tecneti (câu trích
  3 dòng sẽ tràn mép dưới) và #60 Oganesson (ô "năm phát hiện" bị cắt chữ).
  Không ảnh hưởng 60 video bản 1 đã dựng, chỉ lộ ra nếu dựng lại theo bản 2.
- 9 video Đố vui hoá học đã viết kịch bản, script đã sửa được lỗi, nhưng chưa dựng.
- Ba mảng lớn trong app chưa có video nào: **từ điển**, **công thức**, **danh pháp IUPAC**.
