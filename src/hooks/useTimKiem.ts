// Bộ tìm kiếm tổng, nạp MUỘN.
//
// VÌ SAO PHẢI CÓ FILE NÀY: lib/search.ts kéo theo cả sáu kho dữ liệu (nguyên
// tố, công thức, phản ứng, thuật ngữ, sự thật, tên IUPAC) rồi dựng năm bảng
// tra ngay lúc nạp module. Trước đây nó được import THẲNG từ Home.tsx và
// GlobalSearch.tsx — mà GlobalSearch nằm trong Layout, tức có mặt ở MỌI trang.
// Hệ quả: 255 KB dữ liệu nằm trong gói chính, và 51 ms (đo trên máy bàn, điện
// thoại phổ thông chậm hơn cỡ 4-6 lần) bị đốt trước khi trang chủ kịp hiện —
// chỉ để chuẩn bị cho một việc mà phần lớn người mở app còn chưa định làm.
//
// Nay kho chỉ về khi người dùng CHẠM tới ô tìm kiếm: bấm vào ô ở trang chủ,
// hoặc mở khung Ctrl+K. Chạm xong mới gõ, nên kho thường đã về kịp trước chữ
// đầu tiên — người dùng không thấy có gì khác.
//
// Đây KHÔNG phải để giảm dung lượng tải: app là PWA nạp sẵn mọi thứ, tổng số
// byte tải lần đầu y như cũ. Đổi lại là app mở ra dùng được ngay.

import { useEffect, useMemo, useState } from 'react';
import type { Lang } from '../i18n/strings';
// `import type` bị xóa hẳn lúc dịch, nên dòng này KHÔNG kéo lib/search vào gói
// chính. Đổi thành import thường là mất sạch công của cả file này.
import type { SearchResult } from '../lib/search';

type BoTim = (query: string, lang: Lang) => SearchResult[];

// Giữ ngoài React: kho chỉ tải MỘT lần cho cả phiên, dù có bao nhiêu ô tìm
// kiếm và người dùng đóng mở khung bao nhiêu bận.
let daNap: BoTim | null = null;
let dangCho: Promise<BoTim> | null = null;

function napBoTim(): Promise<BoTim> {
  if (!dangCho) {
    dangCho = import('../lib/search').then((m) => {
      daNap = m.searchAll;
      return m.searchAll;
    });
  }
  return dangCho;
}

/**
 * Tra `q` trong toàn app.
 *
 * @param batDau người dùng đã chạm tới ô tìm kiếm chưa. Đặt `true` từ lúc con
 *   trỏ vào ô (hoặc khung Ctrl+K mở ra), ĐỪNG đợi tới khi có chữ — khoảng thời
 *   gian giữa hai mốc đó chính là chỗ để kho kịp về.
 * @returns `dangNap` bật khi có chữ mà kho chưa về. Chỗ gọi phải xử lý nó:
 *   thiếu thì màn hình báo "Không tìm thấy" trong lúc thật ra đang tải, tức là
 *   nói dối người dùng.
 */
export function useTimKiem(
  q: string,
  lang: Lang,
  batDau: boolean,
): { ketQua: SearchResult[]; dangNap: boolean } {
  // Vào phiên sau (kho đã nằm sẵn trong bộ nhớ) thì dựng ra là có ngay, không
  // qua một nhịp rỗng nào.
  const [boTim, setBoTim] = useState<BoTim | null>(daNap);

  useEffect(() => {
    if (!batDau || boTim) return;
    let con = true;
    napBoTim().then((f) => {
      // Bọc trong hàm: setState thấy đối số là HÀM thì tưởng đó là hàm cập
      // nhật và đem gọi luôn. Truyền thẳng `f` vào là React gọi searchAll với
      // giá trị cũ làm tham số — không nổ, chỉ lặng lẽ cất nhầm thứ khác.
      if (con) setBoTim(() => f);
    });
    return () => {
      con = false;
    };
  }, [batDau, boTim]);

  const coChu = q.trim().length > 0;
  const ketQua = useMemo(
    () => (boTim && coChu ? boTim(q, lang) : []),
    [boTim, coChu, q, lang],
  );

  return { ketQua, dangNap: coChu && !boTim };
}
