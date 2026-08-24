// Đến thẳng một mục và MỞ SẴN khung chi tiết của nó: ?item=<mã>, kèm ?q=<chữ>.
//
// Dùng cho trang Công thức và trang Phản ứng — hai trang có phân trang và có
// khung chi tiết, nên dò tay trong 341 chất hay 224 phản ứng là cực hình.
//
// (Từ điển và Thực tiễn đi lối khác — hiện cả danh sách rồi cuộn tới. Xem
// hooks/useCuonToiMuc.ts.)
//
// VÌ SAO KHÔNG DÙNG useEffect ĐỂ BÁM THEO ĐỊA CHỈ: phải xử lý được cả trường
// hợp địa chỉ đổi mà trang KHÔNG dựng lại — đang đứng ở trang Công thức rồi
// bấm Ctrl+K chọn chất khác: vẫn cùng một tuyến đường, chỉ đổi tham số. Bản
// đầu viết trong useEffect nên khung chi tiết không đổi theo, cứ hiện chất cũ
// dù địa chỉ đã sang chất mới.
//
// Lối dưới đây là cách React khuyên dùng cho việc "chỉnh trạng thái khi đầu
// vào đổi": so với giá trị lần trước ngay trong lúc vẽ, khác thì chỉnh rồi vẽ
// lại luôn — người dùng không kịp thấy một nhịp hiện sai.

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface MucTheoDiaChi<T> {
  /** Chữ trong ô lọc của trang. Khởi đầu lấy từ ?q=. */
  q: string;
  setQ: (s: string) => void;
  /** Mục đang mở khung chi tiết. null là chưa mở gì. */
  muc: T | null;
  setMuc: (m: T | null) => void;
  trang: number;
  setTrang: (n: number) => void;
}

/**
 * @param timMuc đổi mã trong ?item= thành mục thật. Mã lạ thì trả null.
 *   Hàm này được gọi TRONG LÚC VẼ nên phải thuần: tra rồi trả về, không đụng
 *   gì bên ngoài.
 */
export function useMucTheoDiaChi<T>(
  timMuc: (ma: string | null) => T | null,
): MucTheoDiaChi<T> {
  const [params] = useSearchParams();
  const qDiaChi = params.get('q');
  const itemDiaChi = params.get('item');

  const [q, setQ] = useState(qDiaChi ?? '');
  const [muc, setMuc] = useState<T | null>(() => timMuc(itemDiaChi));
  const [trang, setTrang] = useState(1);

  const [truoc, setTruoc] = useState({ q: qDiaChi, item: itemDiaChi });
  if (truoc.q !== qDiaChi || truoc.item !== itemDiaChi) {
    setTruoc({ q: qDiaChi, item: itemDiaChi });
    if (qDiaChi !== null) setQ(qDiaChi);
    // Chỉ mở lại khung khi CHÍNH ?item= đổi. Người dùng gõ thêm chữ vào ô lọc
    // (đổi ?q=) mà cũng đóng mở khung theo thì rất khó chịu.
    if (truoc.item !== itemDiaChi) setMuc(timMuc(itemDiaChi));
    setTrang(1);
  }

  return { q, setQ, muc, setMuc, trang, setTrang };
}
