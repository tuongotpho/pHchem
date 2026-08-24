import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import {
  ELEMENTS,
  CATEGORY_META,
  type Category,
  type Element,
} from '../data/elements';
import { DETAILS, PHASE_META } from '../data/elements.details';

const CATEGORIES = Object.keys(CATEGORY_META) as Category[];

// ---- Kích thước lưới ----
// Bảng có 18 cột và 10 hàng: 7 hàng chính + 1 hàng đệm + 2 hàng khối f (lantan,
// actini). Bốn hằng số này phải khớp với phần dựng lưới bên dưới.
const KHE = 3; // khoảng hở giữa hai ô, px
const DEM = 10; // hàng đệm tách khối f khỏi bảng chính, px
const SO_COT = 18;
const SO_HANG_O = 9; // 7 + 2, không tính hàng đệm

// HAI cái sàn, cho hai chuyện khác nhau — đừng gộp làm một.
//
// SAN_BE_NGANG: khi màn hình HẸP. Co theo bề ngang trên điện thoại thì ô còn
// chưa tới 17 px, chữ thành vệt mờ. Thà dừng ở đây rồi cho kéo ngang — đúng
// lối bảng vẫn làm trên điện thoại từ trước tới nay.
//
// SAN_CHIEU_CAO: khi cửa sổ THẤP. Ở đây co lại chính là điều người dùng muốn,
// nên sàn phải thấp hơn hẳn; chỉ để chặn trường hợp cửa sổ thấp đến vô lý.
// Gộp hai sàn làm một (cùng 38) thì cửa sổ 1024×600 bị chặn sớm, ô đứng ở 38
// trong khi chỗ chỉ đủ cho 36 — và vùng lưới lại phải cuộn dọc 13 px, đúng
// cái mà cả việc này sinh ra để bỏ đi.
const SAN_BE_NGANG = 38;
const SAN_CHIEU_CAO = 24;

export default function PeriodicTable() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [active, setActive] = useState<Category | null>(null);
  const [query, setQuery] = useState('');

  // ---- Tự co cho vừa chỗ trống còn lại ----
  //
  // Trước đây ô vuông lấy kích thước theo BỀ NGANG (aspect-square trong lưới 18
  // cột), nên chiều cao muốn ra bao nhiêu thì ra. Máy 1366×768 — cỡ laptop phổ
  // biến nhất — dôi 31 px và phải cuộn dọc. Bảng tuần hoàn là thứ người ta nhìn
  // TỔNG THỂ; cuộn một tí là mất luôn cái nhìn tổng thể ấy.
  //
  // Nay đo vùng còn lại rồi lấy cạnh ô = số NHỎ HƠN giữa "vừa bề ngang" và "vừa
  // chiều cao". Đo bằng clientWidth/clientHeight (không tính thanh cuộn) nên
  // không có chuyện thanh cuộn hiện ra làm hẹp vùng đo, ô co lại, thanh cuộn
  // biến mất, rồi lặp mãi.
  const vungRef = useRef<HTMLDivElement>(null);
  const [canh, setCanh] = useState(SAN_BE_NGANG);
  const [phaiKeoNgang, setPhaiKeoNgang] = useState(false);

  useEffect(() => {
    const vung = vungRef.current;
    if (!vung) return;
    const tinh = () => {
      const rong = vung.clientWidth;
      const cao = vung.clientHeight;
      if (!rong || !cao) return;
      // Bề ngang trước: dừng ở sàn rồi cho kéo ngang.
      const theoRong = Math.max(
        SAN_BE_NGANG,
        Math.floor((rong - (SO_COT - 1) * KHE) / SO_COT),
      );
      // Rồi mới ép theo chiều cao, với sàn thấp hơn hẳn.
      const theoCao = Math.floor((cao - DEM - SO_HANG_O * KHE) / SO_HANG_O);
      const moi = Math.max(SAN_CHIEU_CAO, Math.min(theoRong, theoCao));
      setCanh(moi);
      setPhaiKeoNgang(moi * SO_COT + (SO_COT - 1) * KHE > rong);
    };
    tinh();
    const theoDoi = new ResizeObserver(tinh);
    theoDoi.observe(vung);
    return () => theoDoi.disconnect();
  }, []);

  // Cỡ chữ đi theo cạnh ô. Bỏ điểm ngắt md: — cùng một bề ngang, bảng vẫn có
  // thể phải co lại vì cửa sổ thấp, lúc đó chữ theo md: sẽ tràn ra ngoài ô.
  const coSo = Math.max(6, Math.round(canh * 0.2));
  const coKyHieu = Math.max(9, Math.round(canh * 0.34));
  const coTen = Math.round(canh * 0.15);
  const hienTen = canh >= 46; // nhỏ hơn nữa thì tên chỉ còn là vệt mờ

  const q = query.trim().toLowerCase();
  const matches = (e: Element) =>
    !q ||
    e.sym.toLowerCase().includes(q) ||
    e.en.toLowerCase().includes(q) ||
    e.vi.toLowerCase().includes(q) ||
    String(e.n) === q;

  const isDim = (e: Element) =>
    (active !== null && e.cat !== active) || (q !== '' && !matches(e));

  // Chú thích khi rê chuột: tên, trạng thái, nhiệt độ nóng chảy
  const tooltip = (e: Element) => {
    const d = DETAILS[e.n];
    const ten = lang === 'vi' ? e.vi : e.en;
    const pha = lang === 'vi' ? PHASE_META[d.state].vi : PHASE_META[d.state].en;
    const nc =
      d.melt === null
        ? lang === 'vi'
          ? 'nóng chảy: chưa xác định'
          : 'melting: not determined'
        : lang === 'vi'
          ? `nóng chảy ${d.melt}°C`
          : `melts at ${d.melt}°C`;
    return `${ten} · ${pha} · ${nc}`;
  };

  return (
    // Cao đúng MỘT màn hình, không hơn. Trên điện thoại phải trừ thanh điều
    // hướng dưới (Layout cho main padding-bottom 5rem), không thì cộng lại vẫn
    // vượt một màn. Dùng svh chứ không vh: trên điện thoại vh tính theo lúc
    // thanh địa chỉ ĐÃ THU LẠI, nên khi nó còn hiện thì trang vẫn dôi ra.
    <div className="flex flex-col h-[calc(100svh-5rem)] md:h-svh">
      <PageHeader title={t('nav_table')} subtitle="118" />

      <div className="flex-1 min-h-0 flex flex-col p-3 md:p-5">
        {/* Tìm kiếm + chú giải */}
        <div className="shrink-0 mb-2 flex flex-col gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`${t('filter_placeholder')} (H, Oxy, 26…)`}
            className="w-full max-w-sm bg-base-850 border border-base-700 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-accent"
          />
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => {
              const meta = CATEGORY_META[c];
              const on = active === c;
              return (
                <button
                  key={c}
                  onClick={() => setActive(on ? null : c)}
                  className={`text-[11px] px-2 py-0.5 rounded-lg border transition ${
                    on
                      ? `${meta.color} ${meta.text} ring-1 ring-white/20`
                      : 'border-base-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'vi' ? meta.vi : meta.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vùng còn lại — lưới co cho vừa đúng chỗ này */}
        <div ref={vungRef} className="flex-1 min-h-0 overflow-auto flex">
          <div
            // m-auto chứ không phải mx-auto + items-center: trên màn rộng thì
            // bề ngang mới là thứ chặn, nên còn thừa chiều cao — để bảng dồn
            // lên trên nhìn như bị rơi. Còn lý do dùng LỀ TỰ ĐỘNG thay vì căn
            // giữa bằng flex: khi bảng to hơn khung (điện thoại), cách căn
            // giữa bằng flex làm phần tràn ra ở đầu KHÔNG cuộn tới được nữa —
            // lề tự động thì tự co về 0 nên cuộn vẫn đủ.
            className="grid m-auto w-fit"
            style={{
              gap: `${KHE}px`,
              gridTemplateColumns: `repeat(${SO_COT}, ${canh}px)`,
              gridTemplateRows: `repeat(7, ${canh}px) ${DEM}px repeat(2, ${canh}px)`,
            }}
          >
            {ELEMENTS.map((e) => {
              const meta = CATEGORY_META[e.cat];
              // hàng khối f nằm ở grid-row 9 và 10 (chừa 1 hàng đệm ở row 8)
              const gridRow = e.ypos >= 9 ? e.ypos - 1 + 1 : e.ypos;
              return (
                <button
                  key={e.n}
                  onClick={() => navigate(`/table/${e.n}`)}
                  style={{ gridColumn: e.xpos, gridRow }}
                  className={`rounded-[5px] border p-0.5 flex flex-col items-center justify-center leading-none transition ${
                    meta.color
                  } ${meta.text} ${
                    isDim(e)
                      ? 'opacity-20'
                      : 'hover:scale-[1.12] hover:z-10 hover:ring-1 hover:ring-white/40'
                  }`}
                  title={tooltip(e)}
                >
                  <span className="opacity-70" style={{ fontSize: `${coSo}px` }}>
                    {e.n}
                  </span>
                  <span
                    className="font-bold"
                    style={{ fontSize: `${coKyHieu}px` }}
                  >
                    {e.sym}
                  </span>
                  {hienTen && (
                    <span
                      className="opacity-70 truncate max-w-full"
                      style={{ fontSize: `${coTen}px` }}
                    >
                      {lang === 'vi' ? e.vi : e.en}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <p className="shrink-0 mt-2 text-[11px] text-slate-500">
          {lang === 'vi'
            ? `Bấm vào một nguyên tố để xem chi tiết.${phaiKeoNgang ? ' Kéo ngang để xem hết bảng.' : ''}`
            : `Tap an element for details.${phaiKeoNgang ? ' Scroll sideways to see the full table.' : ''}`}
        </p>
      </div>
    </div>
  );
}
