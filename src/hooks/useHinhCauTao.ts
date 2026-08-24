// Lấy hình cấu tạo của MỘT chất.
//
// Trước đây đoạn nạp kho hình được chép y nguyên ở hai chỗ (Formulas.tsx và
// Solubility.tsx) — cùng một useEffect tám dòng, cùng một cờ `alive`. Hai bản
// giống nhau thì sửa một chỗ dễ quên chỗ kia; nay chỉ còn một.

import { useEffect, useState } from 'react';
import { structureUrl } from '../generated/structures';
import { hinhCoSan, napHinh } from '../lib/khoHinh';

export interface KetQuaHinh {
  /** Nội dung SVG, sẵn sàng để nhúng. null khi chưa có. */
  svg: string | null;
  dangTai: boolean;
  /** Lấy hình không được (mất mạng và chưa từng xem chất này). */
  loi: boolean;
}

type Xong = { url: string; svg: string | null; loi: boolean };

/**
 * @param key khóa chất (keyOf). Truyền null khi chưa mở xem chất nào — lúc đó
 *   hook không đụng tới mạng.
 */
export function useHinhCauTao(key: string | null): KetQuaHinh {
  const url = key ? structureUrl(key) : null;
  // Đã xem chất này trong phiên thì lấy thẳng từ bộ nhớ, KHÔNG qua nhịp "đang
  // tải" — mở lại cùng một chất mà nháy chữ một cái thì trông như app giật.
  const coSan = url ? hinhCoSan(url) : null;
  const [xong, setXong] = useState<Xong | null>(null);

  useEffect(() => {
    if (!url || coSan) return;
    let con = true;
    napHinh(url).then(
      (svg) => {
        if (con) setXong({ url, svg, loi: false });
      },
      () => {
        // KHÔNG nuốt im: chỗ gọi phải hiện được câu "chưa tải được hình" thay
        // vì để một ô trống, không ai hiểu là đang chờ hay là hỏng.
        if (con) setXong({ url, svg: null, loi: true });
      },
    );
    return () => {
      con = false;
    };
  }, [url, coSan]);

  if (!url) return { svg: null, dangTai: false, loi: false };
  if (coSan) return { svg: coSan, dangTai: false, loi: false };
  // "Đang tải" là thứ SUY RA: có địa chỉ, chưa có sẵn, mà kết quả trong tay
  // lại là của chất khác. Đặt tay bằng setState ngay trong effect thì React
  // phải dựng lại thừa một nhịp.
  const khop = xong !== null && xong.url === url;
  return {
    svg: khop ? xong.svg : null,
    dangTai: !khop,
    loi: khop ? xong.loi : false,
  };
}
