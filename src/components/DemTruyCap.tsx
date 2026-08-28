import { useEffect, useState } from 'react';
import { useLang } from '../i18n/LangContext';
import { doc, ghi } from '../lib/boNho';
import {
  MA_GOATCOUNTER,
  diaChiTong,
  docSo,
  dinhDang,
  docDaLuu,
  KHOA_LUU,
} from '../lib/thongKe';

// Ô "Lượt truy cập" ở cuối cột trái.
//
// NHÃN GHI "LƯỢT TRUY CẬP", KHÔNG GHI "NGƯỜI DÙNG" — và đó không phải chuyện
// chữ nghĩa. GoatCounter nhận diện khách bằng một mã băm TỰ ĐỔI MỖI NGÀY (nhờ
// vậy mới khỏi dùng cookie), nên một người vào ba ngày liền được tính ba lần.
// Ghi "1.234 người dùng" là nói quá con số máy chủ thật sự biết.
//
// Và con số này CHẮC CHẮN THẤP HƠN THỰC TẾ: app chạy được ngoại tuyến, ai cài
// về máy rồi mở lúc mất mạng thì lượt đó không tới được máy chủ.

/**
 * `kieu` quyết định chỗ đứng, KHÔNG quyết định con số:
 *   'cot'  — hai dòng, nằm cuối cột trái của máy tính/tablet
 *   'hang' — một dòng gọn, nằm cuối trang chủ trên điện thoại
 *
 * Vì sao phải có kiểu thứ hai: cột trái bị ẩn hẳn dưới màn hình 768px, mà
 * thanh điều hướng dưới đáy điện thoại thì chỉ vừa đúng các nút, không nhét
 * thêm được. Người dùng điện thoại — phần đông người dùng thật — sẽ không bao
 * giờ nhìn thấy con số nếu chỉ đặt ở cột trái.
 */
export default function DemTruyCap({
  kieu = 'cot',
  className = '',
}: {
  kieu?: 'cot' | 'hang';
  className?: string;
}) {
  const { lang } = useLang();
  // null = chưa biết. Khác hẳn số 0. Chưa biết thì KHÔNG hiện gì cả, vì hiện
  // "0" lúc mạng hỏng là bịa ra một sự thật không có.
  const [so, setSo] = useState<number | null>(() => docDaLuu(doc(KHOA_LUU))?.so ?? null);

  useEffect(() => {
    if (!MA_GOATCOUNTER) return;

    // HỎI LẠI MỖI LẦN MỞ APP, không giữ hạn chờ nào — xem lý do ở
    // lib/thongKe.ts. Số đã cất chỉ để hiện ngay lúc chờ và làm bản dự phòng
    // khi mất mạng. Component này gắn một lần theo khung app nên cả phiên chỉ
    // gọi đúng một lượt, không phải mỗi lần chuyển trang.
    //
    // Bỏ dở lượt gọi nếu người dùng rời đi trước khi mạng trả lời.
    const dungLai = new AbortController();
    fetch(diaChiTong(MA_GOATCOUNTER), { signal: dungLai.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((du) => {
        const n = docSo(du);
        if (n === null) return; // đọc không ra thì giữ nguyên số cũ đang hiện
        setSo(n);
        ghi(KHOA_LUU, JSON.stringify({ so: n, luc: Date.now() }));
      })
      .catch(() => {
        // Ngoại tuyến, hoặc chưa bật "Allow adding visitor counts on your
        // website" bên GoatCounter. Cả hai đều chỉ dẫn tới việc ô này im
        // lặng — số cũ đã lưu vẫn hiện, app vẫn chạy bình thường.
      });

    return () => dungLai.abort();
  }, []);

  if (so === null) return null;

  const nhan = lang === 'vi' ? 'Lượt truy cập' : 'Visits';
  const conSo = dinhDang(so, lang);

  if (kieu === 'hang') {
    return (
      <div className={`px-4 pb-6 text-center text-xs text-slate-500 ${className}`}>
        {nhan} ·{' '}
        <span className="font-semibold text-slate-300 tabular-nums">{conSo}</span>
      </div>
    );
  }

  return (
    <div className={`px-2.5 py-2 text-[11px] leading-tight text-slate-500 ${className}`}>
      <div className="uppercase tracking-wider">{nhan}</div>
      <div className="mt-0.5 text-sm font-semibold text-slate-300 tabular-nums">
        {conSo}
      </div>
    </div>
  );
}
