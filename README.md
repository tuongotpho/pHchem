# pH-Chem — Hóa học chuyên nghiệp (PWA)

Bộ công cụ hóa học chạy trên trình duyệt, **cài được như app** và **chạy offline**.
Không quảng cáo, không theo dõi. Giao diện tối, song ngữ Việt / Anh.

🔗 Bản chạy thử: <https://tuongotpho.github.io/pHchem/>

## Tính năng

| Module | Mô tả | Dữ liệu |
|---|---|---|
| Bảng tuần hoàn | **118 nguyên tố**, mỗi nguyên tố có nhiệt độ nóng chảy/sôi, khối lượng riêng, độ âm điện, năm phát hiện, ứng dụng, trạng thái ở 25°C | Bảng tra chuẩn; giá trị chưa đo được để trống, **không ghi số dự đoán** |
| Máy tính | Khối lượng mol (kèm % khối lượng) · cân bằng phương trình · chuyển đổi mol ↔ khối lượng ↔ thể tích khí ↔ nồng độ · pha loãng · pH | Tính bằng thuật toán, có test |
| Ma trận độ tan | 14 cation × 8 anion; bấm ô ra công thức chất tạo thành (ghép theo quy tắc hóa trị) | Quy tắc độ tan chuẩn |
| Thư viện công thức | **340 chất** vô cơ / hữu cơ / hóa lý, **274 chất có hình công thức cấu tạo** | Hình sinh bằng RDKit, chuẩn IUPAC |
| Từ điển | **211 thuật ngữ**, lọc theo chữ cái | Song ngữ |
| Sự thật | **208 sự thật**, 141 câu gắn với nguyên tố liên quan | Hiện kèm ở trang chi tiết nguyên tố |

Tổng: **59 test tự động** kiểm tính toán và tính nhất quán của dữ liệu.

## Chạy thử (máy đã cài Node)

```bash
npm install        # cài lần đầu
npm run dev        # chạy bản phát triển: http://localhost:5183
npm test           # chạy toàn bộ test
npm run build      # đóng gói bản chính thức vào dist/
npm run preview    # xem thử bản chính thức
npm run struct     # sinh lại hình công thức cấu tạo (cần khi sửa smiles.json)
npm run icons      # sinh lại icon PWA
```

## Thêm nội dung (không cần biết lập trình)

Mọi nội dung nằm trong `src/data/`, mỗi mục là **một dòng**. Chép một dòng có sẵn,
sửa lại nội dung, lưu — app tự cập nhật số lượng.

| File | Nội dung |
|---|---|
| `formulas.inorganic.ts` · `formulas.organic.ts` · `formulas.physical.ts` | Thư viện công thức (chia theo nhóm) |
| `smiles.json` | Mã SMILES để sinh hình cấu tạo — sửa xong nhớ chạy `npm run struct` |
| `dictionary.ts` | Từ điển thuật ngữ |
| `facts.ts` | Sự thật (trường `el` gắn nguyên tố liên quan) |
| `elements.ts` · `elements.details.ts` | Dữ liệu nguyên tố |
| `solubility.ts` | Ma trận độ tan |

## Hình công thức cấu tạo

Hình **không vẽ tay** và **không vẽ lúc chạy**. Quy trình:

```text
src/data/smiles.json  →  npm run struct  →  src/generated/structures.ts (danh mục)
                                         →  src/generated/structures-svgs.ts (kho hình)
                                         →  structure-review.html (trang duyệt)
```

- Vẽ bằng **RDKit** (thuật toán CoordGen), theo tiêu chuẩn IUPAC 2008, đầy đủ lập thể.
- RDKit chỉ là **công cụ lúc build**, không đóng gói vào app; app chỉ nhận file SVG nhẹ.
- Script **tự kiểm**: đối chiếu công thức khai báo với công thức RDKit tính từ SMILES,
  báo SMILES sai / mồ côi / tọa độ hỏng. Hiện **274/274 khớp**.
- Mở `structure-review.html` để soi toàn bộ hình một lượt (dành cho giáo viên duyệt).

## Ngân hàng đề của giáo viên

Ngoài đề do AI tự tạo từ dữ liệu app, trang Luyện tập còn có mục **"Ngân hàng đề"** —
đề thật do giáo viên soạn, giữ nguyên thứ tự câu và đáp án của thầy.

**Ai làm gì.** Giáo viên chỉ làm hai việc, đều là việc vốn đã quen:

1. Gửi **file Word** đề trắc nghiệm, soạn y như xưa nay vẫn soạn.
2. Xem **trang duyệt** rồi gật đầu hoặc chỉ chỗ sai.

Toàn bộ phần chuyển đổi và đưa vào mã nguồn là việc của người làm app. Không bắt thầy
cô điền mẫu Excel, bỏ MathType hay học cú pháp nào.

```text
de-nguon/*.docx        →  npm run de  →  public/de/<mã>.json     (dữ liệu câu hỏi)
de-nguon/*.va.json                    →  public/de/hinh/*.png    (ảnh đã nén)
(bản vá do người làm app viết)        →  de-review-<mã>.html     (trang duyệt)
```

- **Đáp án lấy từ dấu gạch chân** thầy đánh trên chữ A/B/C/D — Word lưu thành dữ liệu
  nên máy đọc thẳng, không phải đoán. *Vì vậy đừng xuất đề sang PDF rồi mới đưa vào:
  sang PDF thì gạch chân chỉ còn là nét vẽ, mất sạch thông tin đáp án.*
- **Chỉ số dưới / số mũ** cũng đọc từ định dạng của thầy (đề Nitrogen có 93 + 32 chỗ),
  nên `¹⁴N` không bị nhầm thành hệ số 14.
- **Công thức chèn bằng MathType** máy không đọc được — script bắt buộc phải có người
  soi rồi khai `daSoi` trong bản vá mới cho qua.
- **Ảnh KHÔNG nằm trong gói cài** (`globIgnores` trong `vite.config.ts`), nén về 4 mức
  xám và đặt tên theo mã băm nội dung nên tự khử trùng lặp giữa các bộ đề. Thêm 100 bộ
  đề thì gói cài vẫn nguyên kích thước.
- Ký hiệu hóa học viết theo **cú pháp mhchem** (`H2O`, `NH4+`, `^14N`, `A ->[t°] B`),
  vẽ bằng bộ nhẹ tự viết ở `src/lib/kyHieuHoa.js` — không kéo KaTeX (~320 KB mã + 254 KB
  phông). Cần toán thật thì cắm KaTeX vào là chạy, không phải sửa dữ liệu.
- Mở `de-review-<mã>.html` để soi cả bộ đề một lượt. Trang này vẽ bằng **đúng bộ vẽ của
  app**, nên thầy cô duyệt ở đó thì học sinh nhìn thấy y như vậy.

## Cài lên điện thoại / máy tính

Mở app trên trình duyệt (Chrome/Edge/Safari), chọn **"Cài đặt ứng dụng" / "Add to Home Screen"**.
Sau khi cài, mở lại vẫn chạy **kể cả khi mất mạng**.

> ⚠️ Phần chạy offline **chưa được kiểm trên trình duyệt thật**. Bản build đúng chuẩn
> (manifest hợp lệ, service worker, precache 15 file) nhưng cần một lần thử tay:
> cài app rồi tắt mạng mở lại.

## Triển khai

Mỗi lần đẩy lên nhánh `main`, `.github/workflows/deploy.yml` chạy test + lint, rồi
dựng **hai bản** và đẩy lên **hai nơi cùng lúc**:

| Nơi | Địa chỉ | Đường dẫn gốc | Lệnh dựng |
|---|---|---|---|
| GitHub Pages | https://tuongotpho.github.io/pHchem/ | `/pHchem/` | `npm run build` |
| Firebase Hosting | https://ph-chem.web.app/ | `/` | `npm run build:firebase` |

Vì sao hai bản chứ không một: Pages đặt app trong thư mục con, Firebase đặt ở gốc tên
miền. Lấy bản này đem đẩy sang nơi kia thì **trang trắng trơn** — mọi đường dẫn tới
js/css/hình đều trỏ sai. Chạy song song là cố ý, để chuyển dần; Firebase hỏng thì Pages
vẫn còn đó. Khi nào yên tâm hẳn thì bỏ phần Pages đi.

Xem thử bản Firebase ngay trên máy, kèm đúng luật chuyển hướng và bộ nhớ đệm:

```
npm run build:firebase
npx firebase emulators:start --only hosting --project ph-chem
```

### Cắm bí mật cho Firebase — VIỆC PHẢI LÀM TAY MỘT LẦN

Workflow cần một bí mật tên **`FIREBASE_SERVICE_ACCOUNT`** trên GitHub. Chưa có nó thì
job `deploy-firebase` đỏ, **nhưng Pages vẫn lên bình thường** (hai job tách rời nhau).

Cách nhanh nhất — để Firebase CLI tự tạo tài khoản dịch vụ và tự cắm bí mật:

```
npx firebase login
npx firebase init hosting:github
```

Khi nó hỏi:

- *"For which GitHub repository…"* → `tuongotpho/pHchem`
- *"Set up the workflow to run a build script before every deploy?"* → **No**
- *"Set up automatic deployment to your site's live channel when a PR is merged?"* → **No**
- *"Overwrite existing firebase.json / .firebaserc?"* → **No** (đã cấu hình sẵn rồi)

Xong, nó tự sinh thêm hai file workflow của riêng nó trong `.github/workflows/` —
**xóa hai file đó đi**, vì `deploy.yml` đã lo cả rồi. Bí mật thì nó đã cắm xong.

Kiểm bí mật đã có chưa:

```
gh secret list
```

Nếu mã dự án không phải `ph-chem`, sửa lại ở **hai chỗ**: `.firebaserc` và dòng
`projectId:` trong `.github/workflows/deploy.yml`. Xem mã đúng bằng:

```
npx firebase projects:list
```

## Đồng bộ dữ liệu qua Firebase (để dành, CHƯA bật)

Mục này nói về **Firestore / đăng nhập**, không phải Hosting — Hosting thì đã bật rồi,
xem phần Triển khai ở trên. App vẫn chạy 100% offline và **không cần** phần này.

Khi nào muốn đồng bộ ghi chú hay mục yêu thích giữa nhiều máy thì tạo
`src/lib/firebase.ts` và điền cấu hình từ Firebase Console. Xem `.env.example` cho các
biến môi trường cần thiết.

## Công nghệ

Vite · React · TypeScript · Tailwind CSS · vite-plugin-pwa · vitest · RDKit (lúc build)
