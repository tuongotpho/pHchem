// Nút tải toàn bộ hình cấu tạo về máy, để dùng khi không có mạng.
//
// VÌ SAO CẦN NÚT NÀY: hình cấu tạo không còn nằm trong gói cài nữa (296 file,
// 1,6 MB — trước đây chiếm 73% dung lượng cài, ai cũng phải tải dù có xem hay
// không). Nay xem chất nào thì máy nhớ chất ấy. Nhưng người mang app đi dạy,
// đi thi, hay dùng ở chỗ sóng yếu thì cần CHẮC CHẮN có sẵn — nên phải có một
// chỗ bấm một lần cho xong, và phải nói thật nó tốn bao nhiêu.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '../i18n/LangContext';
import {
  STRUCTURE_BYTES,
  STRUCTURE_COUNT,
  allStructureUrls,
} from '../generated/structures';
import { demHinhDaLuu, taiCaBoVeMay, xoaHinhDaLuu } from '../lib/khoHinh';

export default function TaiHinhNgoaiTuyen() {
  const { lang } = useLang();
  const vi = lang === 'vi';
  const urls = useMemo(() => allStructureUrls(), []);

  /** Số hình đang có trên máy. null = chưa đếm xong, -1 = trình duyệt không cho. */
  const [daCo, setDaCo] = useState<number | null>(null);
  const [tienDo, setTienDo] = useState<{ xong: number; tong: number } | null>(null);
  const [bao, setBao] = useState<string | null>(null);
  const dungRef = useRef<AbortController | null>(null);

  const demLai = useCallback(async () => {
    const n = await demHinhDaLuu(urls);
    setDaCo(n === null ? -1 : n);
  }, [urls]);

  // Đếm lần đầu. Viết bằng .then chứ không gọi hàm async ở đây, để rõ là không
  // có setState nào chạy ngay trong lượt dựng — và để có chỗ gắn cờ `con`: rời
  // trang trước khi đếm xong thì kết quả về muộn không được ghi đè lên gì nữa.
  useEffect(() => {
    let con = true;
    demHinhDaLuu(urls).then((n) => {
      if (con) setDaCo(n === null ? -1 : n);
    });
    return () => {
      con = false;
    };
  }, [urls]);

  // Rời trang giữa chừng thì dừng hẳn, đừng để một loạt lượt tải chạy tiếp
  // trong nền của người dùng.
  useEffect(() => () => dungRef.current?.abort(), []);

  const soMB = (STRUCTURE_BYTES / 1048576).toFixed(1).replace('.', vi ? ',' : '.');
  const dangTai = tienDo !== null;

  const batDau = async () => {
    setBao(null);
    const dung = new AbortController();
    dungRef.current = dung;
    setTienDo({ xong: 0, tong: urls.length });
    const kq = await taiCaBoVeMay(
      urls,
      (xong, tong) => setTienDo({ xong, tong }),
      dung.signal,
    );
    dungRef.current = null;
    setTienDo(null);
    await demLai();
    if (kq.khongCoKho) {
      setBao(
        vi
          ? 'Trình duyệt này không cho lưu hình. Thử mở app bằng Chrome hoặc Edge.'
          : 'This browser will not store the images. Try Chrome or Edge.',
      );
    } else if (dung.signal.aborted) {
      setBao(vi ? 'Đã dừng. Phần tải được vẫn giữ lại.' : 'Stopped. What downloaded is kept.');
    } else if (kq.loi > 0) {
      // Nói đúng số hỏng chứ không báo "xong" cho đẹp.
      setBao(
        vi
          ? `Xong ${kq.xong} hình, ${kq.loi} hình không tải được. Thử lại khi mạng ổn hơn.`
          : `Done: ${kq.xong} images, ${kq.loi} failed. Try again on a better connection.`,
      );
    } else {
      setBao(vi ? 'Xong. Đã có đủ hình để dùng ngoại tuyến.' : 'Done. All images are available offline.');
    }
  };

  const xoa = async () => {
    await xoaHinhDaLuu();
    await demLai();
    setBao(vi ? 'Đã xóa hình khỏi máy.' : 'Images removed from this device.');
  };

  const duHet = daCo !== null && daCo >= STRUCTURE_COUNT;

  return (
    <section className="card p-4">
      <h3 className="font-semibold text-slate-100 mb-1">
        {vi ? 'Hình cấu tạo khi không có mạng' : 'Structures when offline'}
      </h3>
      <p className="text-sm text-slate-400">
        {vi
          ? `Mọi thứ khác trong app đã dùng được ngoại tuyến. Riêng ${STRUCTURE_COUNT} hình cấu tạo chỉ tải khi bạn mở xem, để lần cài đầu khỏi nặng — xem chất nào thì máy nhớ chất ấy.`
          : `Everything else already works offline. The ${STRUCTURE_COUNT} structure images load only when you open them, to keep the install small — whatever you view is kept.`}
      </p>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className="text-slate-500">{vi ? 'Đang có trên máy:' : 'On this device:'}</span>
        <span className="font-mono font-bold text-accent">
          {daCo === null ? '…' : daCo < 0 ? '—' : `${daCo}/${STRUCTURE_COUNT}`}
        </span>
      </div>

      {dangTai && (
        <div className="mt-3">
          <div className="h-1.5 rounded-full bg-base-800 overflow-hidden">
            <div
              className="h-full bg-accent transition-[width] duration-150"
              style={{ width: `${Math.round((tienDo.xong / tienDo.tong) * 100)}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            {tienDo.xong}/{tienDo.tong}
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {dangTai ? (
          <button onClick={() => dungRef.current?.abort()} className="btn-ghost px-3 py-1.5 text-sm">
            {vi ? 'Dừng' : 'Stop'}
          </button>
        ) : (
          <button
            onClick={() => void batDau()}
            disabled={daCo === null || daCo < 0 || duHet}
            className="btn-ghost px-3 py-1.5 text-sm disabled:opacity-40"
          >
            {duHet
              ? vi
                ? 'Đã tải đủ'
                : 'All downloaded'
              : vi
                ? `Tải cả bộ về máy (${soMB} MB)`
                : `Download all (${soMB} MB)`}
          </button>
        )}
        {!dangTai && daCo !== null && daCo > 0 && (
          <button onClick={() => void xoa()} className="btn-ghost px-3 py-1.5 text-sm text-slate-500">
            {vi ? 'Xóa hình đã tải' : 'Remove downloaded'}
          </button>
        )}
      </div>

      {bao && <p className="text-xs text-slate-400 mt-2">{bao}</p>}
    </section>
  );
}
