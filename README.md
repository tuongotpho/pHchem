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

## Cài lên điện thoại / máy tính

Mở app trên trình duyệt (Chrome/Edge/Safari), chọn **"Cài đặt ứng dụng" / "Add to Home Screen"**.
Sau khi cài, mở lại vẫn chạy **kể cả khi mất mạng**.

> ⚠️ Phần chạy offline **chưa được kiểm trên trình duyệt thật**. Bản build đúng chuẩn
> (manifest hợp lệ, service worker, precache 15 file) nhưng cần một lần thử tay:
> cài app rồi tắt mạng mở lại.

## Triển khai

- **GitHub Pages** (đang dùng): tự động qua `.github/workflows/deploy.yml` mỗi lần đẩy
  lên nhánh `main`. Vite dùng `base = '/pHchem/'` khi build, kèm `404.html` để bấm sâu không lỗi.
- **Firebase Hosting** (dự định sau): bỏ `base` về `/` trong `vite.config.ts` là xong.

## Firebase (để dành, chưa bật)

Hiện app chạy 100% offline, **không cần Firebase**. Khi nào muốn đồng bộ ghi chú hay
mục yêu thích giữa nhiều máy, tạo `src/lib/firebase.ts` và điền cấu hình từ Firebase
Console. Xem `.env.example` cho các biến môi trường cần thiết.

## Công nghệ

Vite · React · TypeScript · Tailwind CSS · vite-plugin-pwa · vitest · RDKit (lúc build)
