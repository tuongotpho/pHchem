import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MA_GOATCOUNTER, diaChiDem, DIA_CHI_SCRIPT } from '../lib/thongKe';

// Bắn một lượt truy cập về GoatCounter mỗi khi người dùng đổi trang.
//
// VÌ SAO KHÔNG DÁN THẲNG THẺ <script> VÀO index.html như hướng dẫn của họ:
//
//   1. App này là MỘT TRANG (SPA). Bấm từ Trang chủ sang Luyện tập thì trình
//      duyệt không nạp lại trang, nên thẻ script kiểu thường chỉ đếm được
//      đúng MỘT lượt lúc mở app rồi thôi — mọi trang bên trong đều vô hình.
//      Chính GoatCounter dặn cách này: bật no_onload rồi tự gọi count().
//
//   2. Dán vào index.html thì mã trang "vietthanh228" nằm ở HAI nơi: một
//      trong file HTML, một trong lib/thongKe.ts. Sau này đổi tài khoản mà
//      quên một chỗ thì nửa số liệu bay sang trang cũ, mà không ai báo lỗi.
//      Kéo về một mối như app đã làm với TEN_KHO_HINH ở vite.config.ts.

/** Cửa mà count.js gắn vào. Khai để TypeScript khỏi kêu, không hơn. */
declare global {
  interface Window {
    goatcounter?: {
      no_onload?: boolean;
      no_events?: boolean;
      count?: (x: { path: string }) => void;
    };
  }
}

/**
 * Đường dẫn gửi đi là ĐƯỜNG DẪN TRONG APP, không phải location.pathname.
 *
 * App đang chạy ở hai nơi với hai gốc khác nhau: GitHub Pages để dưới
 * "/pHchem/", Firebase để ở gốc "/". Gửi pathname thô thì cùng một trang
 * Luyện tập hiện thành hai dòng "/pHchem/quiz" và "/quiz" trong bảng thống
 * kê, nhìn như hai trang khác nhau và số bị chia đôi.
 */
export function useDemLuot() {
  const { pathname } = useLocation();
  // Nhớ trang vừa đếm: React ở chế độ dựng chạy hiệu ứng hai lần, và mấy thao
  // tác đổi query cũng làm hiệu ứng chạy lại trong khi trang vẫn thế.
  const daDem = useRef<string | null>(null);
  // Trang cần đếm nhưng script chưa về kịp. Không có chỗ giữ này thì lượt đầu
  // tiên — tức lượt lúc người ta mở app — rơi mất, vì count.js nạp không đồng bộ.
  const dangCho = useRef<string | null>(null);
  const daNap = useRef(false);

  useEffect(() => {
    if (!MA_GOATCOUNTER) return; // để trống mã là tắt hẳn, xem lib/thongKe.ts

    const ban = (duongDan: string) => {
      try {
        window.goatcounter?.count?.({ path: duongDan });
      } catch {
        // Đếm lượt hỏng thì thôi. TUYỆT ĐỐI không để nó làm sập app —
        // người ta mở app để tra hóa học, không phải để chạy bộ đếm.
      }
    };

    if (!daNap.current) {
      daNap.current = true;
      // Phải khai TRƯỚC khi script về, vì count.js đọc mấy tùy chọn này ngay
      // lúc chạy. Khai sau thì nó đã tự đếm mất một lượt theo kiểu trang thường.
      window.goatcounter = { ...window.goatcounter, no_onload: true, no_events: true };

      const s = document.createElement('script');
      s.async = true;
      s.src = DIA_CHI_SCRIPT;
      s.setAttribute('data-goatcounter', diaChiDem(MA_GOATCOUNTER));
      s.addEventListener('load', () => {
        const cho = dangCho.current;
        dangCho.current = null;
        if (cho) ban(cho);
      });
      s.addEventListener('error', () => {
        // Ngoại tuyến, hoặc trình duyệt/máy chủ chặn. Đây là chuyện BÌNH
        // THƯỜNG với app chạy offline nên không kêu ca gì, chỉ là không đếm.
        dangCho.current = null;
      });
      document.head.appendChild(s);
    }

    if (daDem.current === pathname) return;
    daDem.current = pathname;

    if (window.goatcounter?.count) ban(pathname);
    else dangCho.current = pathname;
  }, [pathname]);
}
