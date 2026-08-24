// Đến thẳng một mục trong danh sách dài: ?item=<mã> thì cuộn tới đó.
//
// Dùng cho những trang KHÔNG mở khung chi tiết mà hiện thẳng cả danh sách —
// Từ điển và Thực tiễn. Cố ý không lọc bớt danh sách: giữ nguyên để người dùng
// thấy được ngữ cảnh xung quanh mục mình tìm, chỉ cuộn tới và tô viền.
//
// (Trang Công thức và Phản ứng đi lối khác — mở hẳn khung chi tiết. Xem
// hooks/useMucTheoDiaChi.ts.)

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useCuonToiMuc<T extends HTMLElement = HTMLDivElement>(): {
  /** Mã mục cần tìm, lấy từ ?item=. null nếu không đi từ ô tìm kiếm sang. */
  maMuc: string | null;
  /** Gắn vào ĐÚNG một phần tử — cái khớp với maMuc. */
  refMuc: React.RefObject<T | null>;
} {
  const [params] = useSearchParams();
  const maMuc = params.get('item');
  const refMuc = useRef<T>(null);

  useEffect(() => {
    if (!maMuc) return;
    let xong = false;

    const cuon = () => {
      if (xong) return;
      const el = refMuc.current;
      if (!el) return;
      xong = true; // chỉ cuộn MỘT lần cho mỗi mục
      // Cuộn TỨC THÌ, không "mượt": danh sách dài mấy nghìn pixel, cuộn mượt
      // vừa lâu vừa hay bị hụt giữa chừng. Bấm liên kết là phải thấy mục ngay.
      el.scrollIntoView({ block: 'center' });
    };

    // Đường chính: đợi một khung hình cho danh sách vẽ xong rồi mới đo vị trí.
    const idKhung = requestAnimationFrame(cuon);

    // ĐƯỜNG DỰ PHÒNG, và nó có việc thật chứ không phải cho chắc ăn:
    // requestAnimationFrame KHÔNG chạy khi thẻ đang ẩn. Mở liên kết ở thẻ nền
    // (Ctrl+bấm, hoặc bấm chuột giữa) là đúng cảnh đó — trang nạp xong trong
    // lúc ẩn, khung hình không bao giờ tới, và khi người dùng chuyển sang thẻ
    // thì mục cần tìm vẫn nằm nguyên chỗ cũ, không ai cuộn tới. Hẹn giờ thì
    // vẫn chạy trong thẻ ẩn (có bị giãn nhịp, nhưng chạy).
    const idGio = setTimeout(cuon, 250);

    return () => {
      xong = true; // chặn luôn lượt về muộn sau khi rời trang
      cancelAnimationFrame(idKhung);
      clearTimeout(idGio);
    };
  }, [maMuc]);

  return { maMuc, refMuc };
}
