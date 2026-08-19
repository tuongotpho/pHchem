# pH-Chem — Hóa học chuyên nghiệp (PWA)

Bộ công cụ hóa học chạy trên trình duyệt, **cài được như app** và **chạy offline**.
Không quảng cáo, không theo dõi. Giao diện tối, song ngữ Việt / Anh.

## Tính năng

| Module | Mô tả | Dữ liệu |
|---|---|---|
| Bảng tuần hoàn | 118 nguyên tố, bấm xem chi tiết, lọc theo phân loại | Chuẩn IUPAC |
| Máy tính | Khối lượng mol (kèm % khối lượng) + cân bằng phương trình | Tính bằng thuật toán, có test |
| Ma trận độ tan | Bảng cation × anion tô màu | Quy tắc độ tan chuẩn |
| Thư viện công thức | 56 công thức vô cơ / hữu cơ / hóa lý | Có thể thêm dần |
| Từ điển | 46 thuật ngữ | Có thể thêm dần |
| Sự thật | 38 sự thật hóa học | Có thể thêm dần |

## Chạy thử (máy đã cài Node)

```bash
npm install       # cài lần đầu
npm run dev        # chạy bản phát triển: http://localhost:5183
npm run build      # đóng gói bản chính thức vào thư mục dist/
npm run preview    # xem thử bản chính thức
npm test           # chạy test (parser công thức + cân bằng)
```

## Thêm nội dung (không cần biết lập trình)

Mọi nội dung nằm trong `src/data/`, mỗi mục là **một dòng**:

- `formulas.ts` — thư viện công thức
- `dictionary.ts` — từ điển
- `facts.ts` — sự thật
- `elements.ts` — dữ liệu nguyên tố
- `solubility.ts` — ma trận độ tan

Chép một dòng có sẵn, sửa lại nội dung, lưu — app tự cập nhật số lượng.

## Cài lên điện thoại / máy tính

Mở app trên trình duyệt (Chrome/Edge/Safari), chọn **"Cài đặt ứng dụng" / "Add to Home Screen"**.
Sau khi cài, mở lại vẫn chạy **kể cả khi mất mạng**.

## Firebase (để dành, chưa bật)

Hiện app chạy 100% offline, **không cần Firebase**. Khi nào muốn thêm tính năng
đồng bộ (ghi chú, đánh dấu yêu thích trên nhiều máy), tạo file `src/lib/firebase.ts`
và điền cấu hình từ Firebase Console. Xem `.env.example` cho các biến môi trường cần thiết.

## Công nghệ

Vite · React · TypeScript · Tailwind CSS · vite-plugin-pwa · vitest
