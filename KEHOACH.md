# Kế hoạch nâng cấp pH-Chem

Lập ngày 23/08/2026. Mọi con số dưới đây **đo từ dữ liệu thật**, không ước
lượng — chạy lại `npm run audit` là kiểm được.

---

## Hiện trạng

| Kho | Số lượng | Độ phủ |
|---|---|---|
| Nguyên tố | 118 | chi tiết 118/118 · sự thật 69/118 |
| Chất | 297 | hình cấu tạo 295 · xếp lớp 265 · **có phản ứng 128** |
| Phản ứng | 159 | điều kiện 86 · hiện tượng 63 · **PT ion 27** |
| Thuật ngữ | 224 | 32 mục có nội dung học kèm |
| Thực tiễn | 236 | phủ 69 nguyên tố |
| Bảng tính tan | 14 × 12 = 168 ô | đủ theo bảng SGK |
| Phép kiểm tự động | 247 | — |

---

## Lỗ hổng lớn nhất: hơn nửa số chất là ngõ cụt

**169/297 chất không có phản ứng nào.** Mở một chất ra chỉ đọc được mô tả rồi
hết, không học tiếp được gì.

```
Muối              thiếu 38/77     Amino axit    thiếu 14/15
Axit cacboxylic   thiếu 16/18     Oxit          thiếu 10/30
Ancol             thiếu  7/11     Este          thiếu  6/9
Axit              thiếu  7/15     Ankan         thiếu  5/10
```

---

## Đợt A — Lấp lỗ hổng phản ứng

**Vì sao trước:** mọi thứ khác dựa lên đây. Có phản ứng thì chất mới "sống",
mà đề luyện tập ở đợt C cũng lấy từ đây.

- Thêm phản ứng nhắm đúng chỗ trống: muối tác dụng axit/bazơ/muối, tính chất
  amino axit, phản ứng của ancol và este.
- Bổ sung **hiện tượng quan sát được** cho các phản ứng đã có — đây là thứ học
  sinh phải nhớ để làm bài nhận biết.
- Bổ sung **phương trình ion rút gọn** cho phản ứng trong dung dịch (hiện mới
  27/159).

**Đo lúc xong:** tỉ lệ chất có phản ứng, tỉ lệ phản ứng có hiện tượng và có
PT ion. Bộ kiểm cân bằng tự chạy trên mọi phương trình mới.

---

## Đợt B — Hai công cụ đang thiếu hẳn

### B1. Tính theo phương trình hóa học

Bài toán phổ biến nhất của học sinh: *cho 5,6 g Fe tác dụng hết với HCl, thu
được bao nhiêu lít khí?*

Máy tính đã có đủ mảnh — cân bằng phương trình, đổi mol, khối lượng mol —
nhưng **chưa ghép lại**. Ghép được thì đây là tính năng đắt giá nhất mà tốn ít
công nhất. Cần xử lý cả chất dư và chất hết trước.

### B2. Dãy điện hóa kim loại

Hiện chỉ có **một dòng định nghĩa trong từ điển**, không dữ liệu, không công
cụ. Mà đây là trọng tâm lớp 12: dựa vào nó mới biết kim loại nào đẩy được kim
loại nào ra khỏi dung dịch muối.

Cần: bảng thế điện cực chuẩn, và công cụ tra "A có đẩy được B không".

---

## Đợt C — Chế độ luyện tập

App hiện **thuần tra cứu**, không có chỗ nào tự kiểm tra. Đây là mảng thiếu rõ
nhất với người đi dạy.

Sinh đề **tự động từ dữ liệu sẵn có**, không gõ tay câu nào:

| Dạng đề | Lấy từ |
|---|---|
| Cân bằng phương trình | 159 phương trình, ẩn hệ số đi |
| Đoán sản phẩm / hiện tượng | phản ứng có mô tả hiện tượng |
| Nhận biết chất qua hiện tượng | phản ứng tạo kết tủa, tạo khí |
| Chất này thuộc lớp nào | dữ liệu phân lớp (265 chất) |
| Tra bảng tính tan | 168 ô |
| Đọc tên IUPAC | 296 chất |

Sinh từ dữ liệu nên **đề không bao giờ cạn** và **không sai**, vì dữ liệu đã
qua bộ kiểm tự động.

---

## Đợt D — Dọn nợ kỹ thuật

7 cảnh báo lint còn tồn, đều là lỗi tiềm ẩn chưa lộ ra:

- `ElementDetail.tsx` — 3 chỗ tạo component ngay trong lúc vẽ. Mỗi lần vẽ lại
  là component bị dựng mới, mất sạch trạng thái bên trong.
- `Reactions.tsx`, `Formulas.tsx` — 4 chỗ đặt trạng thái trong hiệu ứng, gây
  vẽ lại dây chuyền.

---

## Hai việc treo, cần người thật

1. **Chưa thử ngoại tuyến thật.** Mới đo được cấu hình: service worker chạy,
   kho đệm có đủ file kể cả chunk hình cấu tạo, có luật dự phòng điều hướng.
   Cần mở app rồi bật chế độ máy bay để xác nhận.

2. **Chưa có mắt người nhìn giao diện.** Suốt quá trình làm không chụp được
   màn hình, mọi đánh giá bố cục đều là **đo bằng số** (kích thước, tọa độ,
   phần tử nào che phần tử nào).

---

## Việc nhỏ ghi lại kẻo quên

- Mẩu thực tiễn mới nối được với **nhóm nguyên tố**, chưa nối với lớp chất hữu
  cơ. Mở "Halogen" thấy 16 mẩu, mở "Este" thì không mẩu nào. Muốn nối phải gắn
  thẻ lớp chất cho từng mẩu.
- 32 chất chưa xếp lớp: hiđrua, hợp chất nitro, nhóm dược phẩm - sinh học.
  Cố ý bỏ trống vì không thuộc lớp nào được dạy riêng.
- 2 chất chưa có hình cấu tạo: V2O5 và SiC — mạng tinh thể, không có phân tử
  riêng lẻ để vẽ.
- `(C6H10O5)n` gộp tinh bột và xenlulozơ vào một mục, nên không có tên IUPAC
  chung nào đúng cho cả hai. Tách thành hai mục thì sạch hơn.
