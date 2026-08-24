// Tên kho đệm hình cấu tạo trong trình duyệt.
//
// VÌ SAO ĐỨNG RIÊNG MỘT FILE: chuỗi này phải GIỐNG NHAU ở hai nơi sống ở hai
// thời điểm khác nhau —
//   - vite.config.ts, lúc DỰNG, khai cho service worker biết đệm hình vào kho
//     tên gì khi người dùng mở xem;
//   - lib/khoHinh.ts, lúc CHẠY, ghi thẳng vào đúng kho đó khi người dùng bấm
//     nút tải cả bộ về máy trong trang Cài đặt.
// Lệch một chữ thì không có gì báo lỗi: nút tải vẫn chạy, vẫn báo xong, nhưng
// ghi vào một kho mà service worker không bao giờ ngó tới — người dùng ngắt
// mạng ra mới biết mình bị lừa.
//
// File này KHÔNG được dùng gì của trình duyệt (fetch, caches, window): nó bị
// vite.config.ts kéo vào, mà chỗ đó chạy bằng Node và không có mấy thứ ấy.
export const TEN_KHO_HINH = 'ph-chem-hinh-cau-tao';
