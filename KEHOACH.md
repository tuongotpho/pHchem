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

## Đợt A — Lấp lỗ hổng phản ứng ✅ XONG 23/08/2026

| | Trước | Sau |
|---|---|---|
| Phản ứng | 159 | **224** |
| Chất có phản ứng | 128 (43%) | **197 (66%)** |
| Có hiện tượng | 63 (40%) | **110 (49%)** |
| Có điều kiện | 86 (54%) | **110 (49%)** |
| Có PT ion | 27 (17%) | **60 (27%)** |
| Phản ứng tạo khí chưa mô tả | 23 | **0** |

Còn 100 chất chưa có phản ứng, phần lớn là hiđrua, oxit kim loại hiếm và
nhóm dược phẩm - sinh học. Những chất này ít khi được dạy kèm phương trình.

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

## Đợt B — Hai công cụ đang thiếu hẳn ✅ XONG 23/08/2026

- **B1** thêm tab "Tính theo PT" trên trang Máy tính, có xử lý chất hết trước.
  17 phép kiểm, trong đó có phép tự kiểm bảo toàn khối lượng.
- **B2** thêm trang "Dãy điện hóa" với 21 cặp oxi hóa - khử và công cụ tra
  "kim loại này có đẩy được kim loại kia không". 15 phép kiểm.

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

## Đợt C — Chế độ luyện tập ✅ XONG 23/08/2026

Trang "Luyện tập" sinh đề tự động từ dữ liệu, đủ sáu dạng. Chọn dạng bài và
số câu, làm xong chấm ngay kèm giải thích và liên kết mở phần liên quan để
học thêm. Mỗi bộ đề có mã riêng nên chia sẻ lại được đúng đề đã làm.

17 phép kiểm, trong đó ba phép đối chiếu NGƯỢC về dữ liệu gốc: cân bằng lại
phương trình để so tổng hệ số, dò công thức về đúng ô bảng tính tan, và tra
hiện tượng về đúng phản ứng.

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

## Đợt D — Dọn nợ kỹ thuật ✅ XONG 23/08/2026

7 cảnh báo lint → **0**.

Hóa ra không chỉ là cảnh báo suông: bốn chỗ "đặt trạng thái trong hiệu ứng"
đang che một LỖI THẬT. Đang ở trang Công thức mà bấm Ctrl+K chọn chất khác
thì địa chỉ đổi nhưng khung chi tiết vẫn hiện chất cũ, vì hàm dựng trạng thái
ban đầu chỉ chạy đúng một lần lúc trang được dựng. Trang Phản ứng y hệt.

Đã đổi sang lối React khuyên dùng cho việc "chỉnh trạng thái khi đầu vào đổi":
so với giá trị lần trước ngay trong lúc vẽ. Việc đặt lại số trang khi đổi bộ
lọc thì chuyển vào chính sự kiện gây ra thay đổi.

Ba chỗ ở `ElementDetail.tsx` gỡ hai khối con ra ngoài hàm trang.

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

---

# Đợt E — Rà soát toàn bộ mã nguồn

Lập 23/08/2026 sau một lượt đọc hết `src/`. **Chưa sửa dòng nào.**

Số liệu đo lúc lập kế hoạch, không ước lượng:

```
npx tsc -b        → 0 lỗi
npx vitest run    → 296/296 pass, 19 file test
dist/index-*.js            595.624 B
dist/structures-svgs-*.js  1.841.789 B   ← trần Workbox mặc định 2.097.152
```

Điều quan trọng nhất tìm được: **dữ liệu và bộ test rất chắc, lỗi nằm hết ở
chỗ tiếp nhận cái người dùng gõ vào.** Không có lỗi bảo mật — app chạy thuần
trong trình duyệt, không máy chủ, không CSDL, không đăng nhập, không một lời
gọi mạng nào. Đã quét secret toàn repo: sạch.

---

## ⚠ Cách dùng phần này khi hết hạn mức 5 tiếng

Hạn mức hay đứt giữa phiên dài. Phần này viết để **phiên sau mở ra là làm
tiếp được ngay**, không phải đọc lại cả repo.

### Đầu phiên mới, chạy đúng 3 lệnh này trước

```bash
git log --oneline -5 && git status --short && npx vitest run --reporter=dot
```

Xong thì đọc **SỔ BÀN GIAO** ngay dưới, rồi mở đúng mục còn dang dở. **Không
đọc lại toàn bộ `src/`** — mọi thứ cần biết đã nằm trong mục đó rồi.

### Quy tắc bắt buộc để không mất việc giữa chừng

1. **Xong một mục là commit ngay.** Đừng gom nhiều mục vào một commit. Hạn mức
   đứt giữa chừng mà chưa commit là mất trắng.
2. **Mỗi mục làm đủ 3 bước rồi mới sang mục khác:** viết test tái hiện lỗi →
   sửa → chạy `npx vitest run`. Không được để mục nào ở trạng thái "sửa rồi
   nhưng chưa có test".
3. **Sửa xong thì đánh dấu `[x]` vào bảng dưới và ghi một dòng vào SỔ BÀN
   GIAO**, ngay trong cùng commit đó.
4. Ước lượng sức: nhóm 1 khoảng **một phiên ngắn**, nhóm 2 **một phiên dài**,
   nhóm 3 làm lẻ lúc nào cũng được. Còn ít hạn mức thì làm E1 → E2 → E3 rồi
   dừng, đừng mở nhóm 2 ra dở dang.

### SỔ BÀN GIAO

> Mỗi lần dừng việc thì ghi một dòng vào đây. Dòng mới nhất ở trên cùng.

| Ngày | Đã xong tới | Đang dở | Việc kế tiếp |
|---|---|---|---|
| 23/08/2026 | **E1**, **E2** — nghiệm thu cả test lẫn trình duyệt | không | **E3** |
| 23/08/2026 | **E1** (098c45e) — đã nghiệm thu cả test lẫn trình duyệt | không | **E2** |
| 23/08/2026 | — (mới lập kế hoạch) | không | **E1** |

---

## Bảng việc

| | Mục | Mức | Chỗ | Sức |
|---|---|---|---|---|
| ✅ | **E1** Cân bằng PT ra `"2 2 Fe"` | 🔴 critical | `lib/balance.ts` | xong 098c45e |
| ✅ | **E2** `2H2O` ra 36 g/mol | 🟡 warning | `lib/formula.ts` | xong |
| ☐ | **E3** Tab Tính theo PT chối dấu phẩy | 🟡 warning | `pages/Calculator.tsx` | nhỏ |
| ☐ | **E4** Trần cache 2 MB sắp vỡ | 🟡 warning | `vite.config.ts` | rất nhỏ |
| ☐ | **E5** localStorage không bọc → trắng màn hình | 🟡 warning | 2 context | nhỏ |
| ☐ | **E6** Sửa PT thì lượng chất gắn nhầm | 🟡 warning | `pages/Calculator.tsx` | vừa |
| ☐ | **E7** Lọc phản ứng chết khi dùng tiếng Anh | 🟡 warning | `pages/Reactions.tsx` | nhỏ |
| ☐ | **E8** Gói chính 596 KB, chưa tách tuyến | 🟡 warning | `App.tsx` | vừa |
| ☐ | **E9** Tìm kiếm tính lại bỏ dấu mỗi phím gõ | 🟡 warning | `lib/search.ts` | vừa |
| ☐ | **E10** Từ điển làm đôi việc mỗi lần vẽ | 🔵 nitpick | `pages/Dictionary.tsx` | rất nhỏ |
| ☐ | **E11** Luyện tập chia 0 → `NaN%` | 🔵 nitpick | `pages/Quiz.tsx` | rất nhỏ |
| ☐ | **E12** `chon()` trên mảng rỗng → sập | 🔵 nitpick | `lib/quiz.ts` | rất nhỏ |
| ☐ | **E13** `html lang` không đặt lúc mở app | 🔵 nitpick | `i18n/LangContext.tsx` | rất nhỏ |
| ☐ | **E14** Câu tiếng Việt chết cứng | 🔵 nitpick | `pages/ElementDetail.tsx` | rất nhỏ |
| ☐ | **E15** Ba đoạn mã chết | 🔵 nitpick | 3 file | rất nhỏ |
| ☐ | **E16** `clean()` chưa lọc script trong SVG | 🔵 nitpick | `scripts/gen-structures.mjs` | rất nhỏ |
| ☐ | **E17** Hai bản `parseFormula` viết riêng | 🔵 nitpick | app ↔ script | vừa |
| ☐ | **E18** Khung phóng to thiếu Esc + khóa cuộn | 🔵 nitpick | `pages/Formulas.tsx` | rất nhỏ |

---

# NHÓM 1 — Sai về hóa học. Làm trước hết.

App hứa với người dùng là *"đề lấy từ dữ liệu đã qua bộ kiểm tự động nên đáp
án không thể sai"*. Ba lỗi này phá đúng lời hứa đó. Cả ba **cùng một gốc rễ
hoặc cùng một file**, nên làm liền một mạch.

## E1 🔴 Cân bằng phương trình ra kết quả vô nghĩa

📁 gốc rễ `src/lib/formula.ts:88` · lộ ra ở `src/lib/balance.ts:61-70`

**Bằng chứng — chạy thật, không suy đoán:**

```
balance('2 Fe + O2 -> Fe2O3')  →  "2 2 Fe + 3 O2 → 2 Fe2O3"
                                    ^^^^^
```

Học sinh gõ phương trình đã có sẵn hệ số — chuyện xảy ra suốt — thì nhận về
một dòng rác.

**Vì sao:** `parseFormula` phải hiểu muối ngậm nước `CuSO4.5H2O` nên nó cho
phép **một số đứng đầu làm hệ số nhân phân tử**. Nhưng luật đó bị áp cho **cả
chuỗi nhập**, không riêng đoạn sau dấu chấm. `"2 Fe"` → bỏ khoảng trắng →
`"2Fe"` → app hiểu thành **Fe₂**, rồi máy cân bằng chồng thêm hệ số 2 lên nữa.

**Sửa** — bóc hệ số ra trước khi giao cho `parseFormula`, trong `splitSides`:

```ts
const clean = (s: string) =>
  s.split('+').map((x) => x.trim()).filter(Boolean)
   .map((x) => x.replace(/^\d+\s+/, ''));   // "2 Fe" → "Fe"
```

**Nghiệm thu** — thêm vào `src/lib/balance.test.ts`:

```ts
it('bỏ qua hệ số người dùng gõ sẵn', () => {
  const mong = '4 Fe + 3 O2 → 2 Fe2O3';
  expect(formatBalanced(balance('2 Fe + O2 -> Fe2O3'))).toBe(mong);
  expect(formatBalanced(balance('4 Fe + 3 O2 -> 2 Fe2O3'))).toBe(mong);
  expect(formatBalanced(balance('Fe + O2 -> Fe2O3'))).toBe(mong);
});
```

Ba cách gõ, một đáp án. Chạy `npx vitest run src/lib/balance.test.ts`.

⚠ **Coi chừng:** đừng sửa thẳng trong `parseFormula` — muối ngậm nước
`CuSO4.5H2O` đang dựa vào chính luật đó. Sửa ở `balance.ts` mới đúng chỗ.
Test cũ có ca ngậm nước, chạy lại đủ bộ để chắc.

## E2 🟡 Tab "Khối lượng mol" trả sai số

📁 `src/lib/formula.ts:88` · hiện ra ở `src/pages/Calculator.tsx:75`

Cùng gốc rễ E1. **Đo được:**

```
parseFormula('2H2O').mass = 36.03    ← app hiện to đùng "Khối lượng mol 36.03 g/mol"
parseFormula('5H2O').mass = 90.075
parseFormula('H2O.').mass = 18.015   ← dấu chấm thừa cũng nuốt luôn, không báo
```

Khối lượng mol của H₂O là **18,015**. App đang dạy sai.

**Sửa:** trong `parseFormula`, chỉ cho phép hệ số ở **đoạn từ thứ hai trở đi**
(tức sau dấu chấm). Đoạn đầu mà có số dẫn đầu thì báo lỗi rõ:
*"Bỏ hệ số đứng trước công thức — chỉ nhập công thức của một chất"*.

**Nghiệm thu:** `parseFormula('2H2O').ok === false`, còn
`parseFormula('CuSO4.5H2O')` vẫn phải ra đúng khối lượng như cũ (chạy lại test
ngậm nước đã có).

## E3 🟡 Tab "Tính theo PT" từ chối dấu phẩy thập phân

📁 `src/pages/Calculator.tsx:584-585`

```ts
.filter(([, v]) => v.giaTri.trim() !== '' && Number(v.giaTri) > 0)
.map(([k, v]) => ({ viTri: Number(k), donVi: v.donVi, giaTri: Number(v.giaTri) }));
```

`Number('5,6')` = **NaN**. Người Việt gõ `5,6` → bị lọc bỏ im lặng, hoặc nhận
báo lỗi sai hẳn ý *"Lượng chất phải lớn hơn 0"* (đã dựng lại được).

Trớ trêu là **bốn tab kia đều làm đúng** — dòng 151, 152, 285, 373 đều có
`.replace(',', '.')`. Chỉ tab mới nhất bị sót.

**Sửa:** tách một hàm dùng chung đặt đầu file, cả năm tab gọi chung:

```ts
/** Đọc số người dùng gõ, chấp nhận cả dấu phẩy kiểu Việt Nam. */
const doSo = (s: string): number => parseFloat(s.trim().replace(',', '.'));
```

Thay hết 5 chỗ. Hết đường sót lần sau.

**Nghiệm thu:** thêm test cho `tinhTheoPhuongTrinh` với lượng đọc từ chuỗi
`'5,6'`, ra đúng 0,1 mol Fe.

---

# NHÓM 2 — Chặn bom hẹn giờ và dọn sức ì

Không sai về hóa học, nhưng hai mục đầu là loại **hỏng âm thầm**: build vẫn
xanh, test vẫn pass, chỉ người dùng thật mới thấy.

## E4 🟡 Trần cache 2 MB sắp vỡ — làm ngay, tốn 1 dòng

📁 `vite.config.ts:37-38`

| File trong `dist` | Kích thước |
|---|---|
| `structures-svgs-*.js` | **1.841.789 B** |
| trần Workbox mặc định | 2.097.152 B |
| còn dư | **255.363 B** |

Đã xác nhận file này **đang nằm trong danh sách nạp sẵn** của `dist/sw.js`.

**Rủi ro:** thêm chừng 15–20 chất nữa là vượt trần. Lúc đó Workbox **âm thầm
bỏ file khỏi kho đệm** — build xanh, test pass, chỉ người dùng ngoại tuyến mở
ra thấy hình cấu tạo trắng trơn. Không ai biết cho tới khi có người kêu.

**Sửa:**

```ts
workbox: {
  globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
},
```

**Nghiệm thu:** `npm run build` rồi kiểm tên file hình cấu tạo vẫn còn trong
`dist/sw.js`.

## E5 🟡 localStorage không bọc → có thể trắng màn hình cả app

📁 `src/theme/ThemeContext.tsx:22,32` · `src/i18n/LangContext.tsx:73,81`

`readInitial()` gọi `localStorage.getItem` **ngay lúc dựng provider gốc**.
Safari chế độ riêng tư, iframe bị chặn cookie bên thứ ba, hoặc bộ nhớ đầy →
ném lỗi → **không có ErrorBoundary → trang trắng, không một chữ thông báo.**

Đây là app offline-first, người dùng mở trong đủ kiểu môi trường. Giống rơ-le
bảo vệ mà mất nguồn nuôi thì cắt luôn cả lộ, thay vì chỉ mất chức năng bảo vệ.

**Sửa** — bọc cả đọc lẫn ghi, ở cả hai file:

```ts
function readInitial(): Theme {
  try { return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'; }
  catch { return 'dark'; }
}
```

**Nghiệm thu:** Chrome → DevTools → chặn cookie bên thứ ba → mở app trong
iframe. Phải chạy được, chỉ mất chức năng nhớ lựa chọn.

## E6 🟡 Sửa phương trình thì lượng chất bị gắn nhầm sang chất khác

📁 `src/pages/Calculator.tsx:579`

```ts
const [nhap, setNhap] = useState<Record<number, ...>>({ 0: { donVi:'gam', giaTri:'5.6' } });
```

Khóa theo **vị trí** trong phương trình. Nhập `Fe + HCl → ...` với Fe = 5,6 g,
rồi sửa thành `HCl + Fe → ...` — con số 5,6 g **vẫn ở ô số 0, giờ là HCl**.
App tính ra đáp án khác hẳn mà không báo gì.

**Sửa:** khóa theo `congThuc` thay vì số thứ tự. Cách rẻ hơn: `setNhap({})` mỗi
khi `pt` đổi — mất dữ liệu người dùng đã gõ nhưng không bao giờ gắn nhầm.
Nên chọn cách khóa theo `congThuc`.

⚠ Chú ý: một phương trình có thể có hai chất trùng công thức ở hai vế, ví dụ
`H2O` vừa là chất tham gia vừa là sản phẩm. Khóa nên gồm cả vị trí lẫn công
thức, và kiểm cả hai khi đọc lại.

## E7 🟡 Trang Phản ứng: chuyển sang tiếng Anh thì bộ lọc chết một nửa

📁 `src/pages/Reactions.tsx:89-93`

```ts
r.eq.toLowerCase().includes(query) ||
(r.phen_vi ?? '').toLowerCase().includes(query) ||    // ← chỉ _vi
(r.note_vi ?? '').toLowerCase().includes(query) ||
(r.cond_vi ?? '').toLowerCase().includes(query)
```

Dữ liệu có đủ `phen_en` / `note_en` / `cond_en` nhưng bộ lọc không đụng tới.
Đang dùng tiếng Anh mà gõ *"precipitate"* → không ra gì.

**Sửa:** dò cả hai thứ tiếng (đơn giản và luôn đúng), hoặc chọn trường theo
`lang`. Nên chọn cách dò cả hai — người học hay gõ lẫn hai thứ tiếng.

## E8 🟡 Gói chính 596 KB — 13 trang nạp hết ngay lần mở đầu

📁 `src/App.tsx:3-14`

Toàn bộ 13 trang + toàn bộ kho dữ liệu vào chung một file. Người mở app chỉ để
tra một nguyên tố vẫn phải tải cả bộ máy tính pH, bộ cân bằng, bộ sinh đề.

**Sửa:** `React.lazy` theo tuyến đường, bọc `<Suspense>` quanh `<Outlet />`
trong `Layout.tsx`. Kho hình đã làm đúng kiểu này rồi (`Formulas.tsx:82`) —
chỉ là chưa áp cho các trang.

**Nghiệm thu:** `npm run build`, so kích thước `index-*.js` trước/sau. Ghi cả
hai con số vào SỔ BÀN GIAO.

## E9 🟡 Tìm kiếm tính lại việc bỏ dấu tiếng Việt cho MỌI mục, MỖI phím gõ

📁 `src/lib/search.ts:27` và `:43`

```ts
const norm = (s) => s.toLowerCase().replace(/đ/g,'d').normalize('NFD').replace(/[̀-ͯ]/g,'');
```

Mỗi ký tự gõ vào → duyệt 118 nguyên tố + toàn bộ công thức + 224 phản ứng +
toàn bộ thuật ngữ + kho sự thật; mỗi mục gọi `norm()` vài lần (`khop` một lần,
`diemKhop` thêm mấy lần). `normalize('NFD')` không rẻ. Không debounce, không
memo.

Máy bàn không thấy gì. **Điện thoại phổ thông thì gõ có độ trễ** — mà đây là
app cho học sinh.

**Sửa:** dựng sẵn một mảng chuỗi **đã chuẩn hóa, một lần lúc nạp module**; khi
tìm chỉ so chuỗi. Đúng cách app đã làm với `THEO_CHAT` và `CHAT_THEO_TERM`.

**Nghiệm thu:** `src/lib/search.test.ts` đang có sẵn phép kiểm xếp hạng — chạy
lại phải y nguyên. Đo thêm bằng `performance.now()` quanh 20 lần `searchAll`.

---

# NHÓM 3 — Việc lẻ, làm lúc nào cũng được

Mỗi mục dưới đây độc lập hoàn toàn, làm một mục rồi commit là xong, không
vướng gì mục khác. Đây là chỗ để làm khi chỉ còn ít hạn mức.

| Mục | Chỗ | Việc |
|---|---|---|
| **E10** | `pages/Dictionary.tsx:128-129` | `coNoiDungHoc(term)` gọi `noiDungChoThuatNgu` bên trong, dòng sau gọi lại lần nữa → làm đôi việc cho toàn bộ thuật ngữ mỗi lần vẽ. Gọi một lần rồi kiểm kết quả |
| **E11** | `pages/Quiz.tsx:100-102` | `sinhDe` trả mảng rỗng → hiện **"0/0 · Đúng NaN%"**. Hiện chưa xảy ra (thử `sinhDe(12345,20,'vi',['doTan'])` vẫn đủ 20 câu) nhưng không có chốt chặn. Thêm: rỗng thì quay về màn chọn kèm lời nhắn |
| **E12** | `lib/quiz.ts:60` | `chon(rng, ds)` với mảng rỗng → `undefined` → sập trang. Các mảng lọc ở dòng 95-97 chỉ cần dữ liệu đổi là rỗng. Trả `null` nếu mảng rỗng |
| **E13** | `i18n/LangContext.tsx:72-75` | `document.documentElement.lang` chỉ đặt trong `setLang` (dòng 83), không đặt lúc khởi động → chọn tiếng Anh, mở lại app, HTML vẫn khai `lang="vi"`. Ảnh hưởng trình đọc màn hình. Đặt trong `useEffect` đầu tiên |
| **E14** | `pages/ElementDetail.tsx:90` | `"Không tìm thấy nguyên tố."` chết cứng tiếng Việt, cả app còn lại đều song ngữ. Dùng `t()` |
| **E15** | `lib/reactionIndex.ts:39`, `lib/classIndex.ts:92`, `pages/Formulas.tsx:91` | `indexStats` và `thongKeNoiKet` **không chỗ nào gọi**, kể cả test. `const structCount = STRUCTURE_COUNT` là bí danh thừa. Xóa cả ba |
| **E16** | `scripts/gen-structures.mjs:122` | Ba chỗ `dangerouslySetInnerHTML` (`Formulas.tsx:358`, `:430`, `Solubility.tsx:216`) **hiện an toàn** — SVG do RDKit sinh lúc build, cam kết vào git, không dính đầu vào người dùng. Nhưng hàm `clean()` không lọc thẻ script và thuộc tính `on*`. Thêm một dòng lọc cho khỏi phải nghĩ lại |
| **E17** | `lib/formula.ts:26-79` ↔ `scripts/gen-structures.mjs:34-76` | **Hai bản `parseFormula` viết riêng biệt**, cùng nhiệm vụ, khác cách xử lý ký tự lạ (bản app ném lỗi, bản script bỏ qua). Đây chính là bộ đối chiếu công thức ↔ SMILES — hai bản lệch nhau thì phép kiểm mất hiệu lực mà không ai biết. Tách một module dùng chung, script `import` vào |
| **E18** | `pages/Formulas.tsx:394` | Khung phóng to hình **không đóng bằng Esc, không khóa cuộn nền** — trong khi `Reactions.tsx:67`, `Solubility.tsx:38`, `GlobalSearch.tsx:65` đều làm đủ. Chép lại `useEffect` đã có sẵn |

**Thêm một điểm nhỏ ở tab Pha loãng** (`Calculator.tsx:283-284`): gõ chữ bậy
vào một ô rồi để trống một ô → `hopLe` thành `false` → **app không hiện gì cả,
cũng không báo lỗi**. Người dùng ngồi chờ. Nên hiện *"Ô C₂ không phải số"*.

---

## Chưa kiểm được — cần mắt người

Chạy được test và build, nhưng **chưa mở app trên trình duyệt thật**. Ba việc
phải người xác nhận, không máy nào thay được:

1. **Ngoại tuyến thật** — tắt mạng, mở app, bấm vào một chất có hình cấu tạo.
   Hình có hiện không? Đây là chỗ đáng lo nhất, liên quan E4.
2. **Gõ tìm kiếm trên điện thoại** — gõ nhanh 5–6 chữ, chữ có bị đuổi theo
   không? Liên quan E9.
3. **Trắng màn hình khi chặn localStorage** — Chrome chặn cookie bên thứ ba
   rồi mở app trong iframe. Liên quan E5.

(Trùng với "Hai việc treo, cần người thật" ở trên — vẫn chưa làm.)

## Ghi chú cho lần bật Firebase

`.env.example` đang để trống, và app **hiện không đọc biến môi trường nào**
(đã quét: chỉ có `import.meta.env.BASE_URL` ở `main.tsx:13`).

Khi bật đồng bộ: mọi biến `VITE_*` bị **nướng thẳng vào file JS gửi xuống
trình duyệt** — ai bấm F12 cũng đọc được. Với Firebase thì API key vốn không
phải bí mật, cái bảo vệ dữ liệu là **Firestore rules**. Nhưng nếu nhét thêm
token Telegram hay khóa Gemini vào đây thì lộ ngay — đúng cái bẫy đã dính ở
app NPSC và phmix.
