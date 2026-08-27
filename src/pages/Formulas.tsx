import { useState, useMemo, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import FormulaText from '../components/FormulaText';
import Pagination from '../components/Pagination';
import { useLang } from '../i18n/LangContext';
import { hasStructure, STRUCTURE_COUNT } from '../generated/structures';
import { useMucTheoDiaChi } from '../hooks/useMucTheoDiaChi';
import { useKhungNoi } from '../hooks/useKhungNoi';
import { useHinhCauTao } from '../hooks/useHinhCauTao';
import { elementsOfFormula } from '../lib/compoundIndex';
import { reactionsForFormula } from '../lib/reactionIndex';
import { isomersOf, ctptOf } from '../lib/isomerIndex';
import { iupacKhacTen } from '../data/iupac';
import { nhomCuaChat, thuatNguCuaNhom } from '../lib/classIndex';
import { byNumber } from '../data/elements';
import { factsForChat } from '../data/facts';
import {
  FORMULAS,
  FORMULA_CAT_META,
  keyOf,
  type Formula,
  type FormulaCat,
} from '../data/formulas';

const CATS: (FormulaCat | 'all')[] = ['all', 'inorganic', 'organic', 'physical'];

// Số công thức hiển thị mỗi trang
const PER_PAGE = 24;

export default function Formulas() {
  const { t, lang } = useLang();
  const [cat, setCat] = useState<FormulaCat | 'all'>('all');
  const [onlyStruct, setOnlyStruct] = useState(false);
  // Đến thẳng từ ô tìm kiếm: ?item=<khóa chất> thì mở sẵn khung chi tiết của
  // đúng chất đó, khỏi bắt người dùng dò lại trong danh sách 341 mục.
  // Toàn bộ việc bám theo địa chỉ nằm ở hooks/useMucTheoDiaChi.ts.
  const {
    q,
    setQ,
    muc: sel,
    setMuc: setSel,
    trang: page,
    setTrang: setPage,
  } = useMucTheoDiaChi<Formula>((khoa) =>
    khoa ? (FORMULAS.find((f) => keyOf(f) === khoa) ?? null) : null,
  );
  // Đang phóng to hình cấu tạo của chất nào. Chất nhiều nguyên tử như
  // cholesterol hay saccarozơ nhồi vào khung nhỏ thì đọc không nổi.
  const [phongTo, setPhongTo] = useState(false);
  // Người dùng tự tắt chế độ xoay khi không thích
  const [tatXoay, setTatXoay] = useState(false);

  // Màn hình hẹp mà lại dựng đứng: hình cấu tạo nằm ngang (300×230) chỉ dùng
  // được bề ngang ít ỏi, trong khi chiều cao thừa mứa. Xoay hình 90° thì đổi
  // được bề ngang lấy chiều dài.
  // Đọc trạng thái trình duyệt bằng useSyncExternalStore để tự cập nhật khi
  // người dùng xoay máy sang nằm ngang — lúc đó phải thôi xoay hình.
  const manHinhDungHep = useSyncExternalStore(
    (baoLai) => {
      const mq = window.matchMedia('(max-width: 767px) and (orientation: portrait)');
      mq.addEventListener('change', baoLai);
      return () => mq.removeEventListener('change', baoLai);
    },
    () => window.matchMedia('(max-width: 767px) and (orientation: portrait)').matches,
    () => false, // lúc dựng sẵn trang trên máy chủ thì coi như không xoay
  );
  const xoayHinh = manHinhDungHep && !tatXoay;

  // Hình của CHẤT ĐANG MỞ, tải riêng một file — xem hooks/useHinhCauTao.ts.
  // Trước đây chỗ này kéo cả kho 1,68 MB về chỉ để lấy một hình.
  const { svg: hinh, dangTai: dangTaiHinh, loi: loiHinh } = useHinhCauTao(
    sel ? keyOf(sel) : null,
  );

  // Khung phóng to hình: đóng bằng Esc và khóa cuộn nền, giống hệt các khung
  // nổi khác trong app (Reactions, Solubility, GlobalSearch). Thiếu hai thứ
  // này thì trên điện thoại bấm phóng to xong nền vẫn trôi phía sau, còn trên
  // máy tính thì gõ Esc không ăn — trái thói quen mà chính app đã tạo ra.
  // Hai khung chồng nhau: khung chi tiết chất, và khung phóng to hình mở ĐÈ
  // lên nó. Bấm Esc phải đóng cái TRÊN CÙNG thôi — nên khi đang phóng to thì
  // tắt Esc của khung dưới, không thì một phát đóng sạch cả hai.
  useKhungNoi(phongTo, () => setPhongTo(false));
  useKhungNoi(sel !== null && !phongTo, () => setSel(null));


  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return FORMULAS.filter((f) => {
      if (cat !== 'all' && f.cat !== cat) return false;
      if (onlyStruct && !hasStructure(keyOf(f))) return false;
      if (!query) return true;
      return (
        f.formula.toLowerCase().includes(query) ||
        f.vi.toLowerCase().includes(query) ||
        f.en.toLowerCase().includes(query)
      );
    });
  }, [q, cat, onlyStruct]);

  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PER_PAGE;
  const paged = list.slice(start, start + PER_PAGE);

  return (
    <>
      <PageHeader title={t('nav_formulas')} subtitle={`${FORMULAS.length} ${t('items_count')}`} />
      <div className="p-4 md:p-6">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1); // đổi từ khóa thì về trang 1, khỏi rơi vào trang trống
          }}
          placeholder={t('filter_placeholder')}
          className="w-full max-w-md bg-base-850 border border-base-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent mb-3"
        />
        <div className="flex gap-1.5 mb-4 flex-wrap items-center">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCat(c);
                setPage(1);
              }}
              className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                cat === c
                  ? 'bg-accent/15 border-accent/40 text-accent'
                  : 'border-base-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {c === 'all' ? (lang === 'vi' ? 'Tất cả' : 'All') : FORMULA_CAT_META[c][lang]}
            </button>
          ))}

          {/* ngăn cách rồi tới nút lọc "có hình" */}
          <span className="w-px h-5 bg-base-700 mx-1" />
          <button
            onClick={() => {
              setOnlyStruct((v) => !v);
              setPage(1);
            }}
            className={`text-xs px-3 py-1.5 rounded-lg border transition flex items-center gap-1 ${
              onlyStruct
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'border-base-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {onlyStruct ? '☑' : '☐'} {lang === 'vi' ? 'Có hình' : 'With structure'}
            <span className="opacity-60">({STRUCTURE_COUNT})</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 mb-2">
          {list.length > 0
            ? `${start + 1}–${start + paged.length} / ${list.length}`
            : 0}{' '}
          {t('items_count')}
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {paged.map((f) => {
            const hasStruct = hasStructure(keyOf(f));
            return (
              <button
                key={keyOf(f) + f.en}
                onClick={() => setSel(f)}
                className="card p-3.5 text-left hover:border-accent/40 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <FormulaText
                    value={f.formula}
                    subscript={f.cat !== 'physical'}
                    className="text-lg font-semibold text-accent font-mono"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    {hasStruct && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/15 text-accent">
                        {lang === 'vi' ? 'có hình' : 'structure'}
                      </span>
                    )}
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-base-800 text-slate-400">
                      {FORMULA_CAT_META[f.cat][lang]}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-100 mt-1">
                  {lang === 'vi' ? f.vi : f.en}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {lang === 'vi' ? f.note_vi : f.note_en}
                </div>
              </button>
            );
          })}
        </div>

        <Pagination page={current} totalPages={totalPages} onChange={setPage} />

        {list.length === 0 && (
          <div className="text-center text-slate-500 py-10">
            {lang === 'vi' ? 'Không tìm thấy.' : 'No results.'}
          </div>
        )}
      </div>

      {/* Khung chi tiết + hình cấu trúc */}
      {sel && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => {
            setSel(null);
            setPhongTo(false);
          }}
        >
          <div
            className="card p-5 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSel(null)}
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-200 text-lg"
            >
              ✕
            </button>

            <div className="flex items-baseline gap-2 mb-1 pr-6">
              <FormulaText
                value={sel.formula}
                subscript={sel.cat !== 'physical'}
                className="text-2xl font-bold text-accent font-mono"
              />
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-base-800 text-slate-400">
                {FORMULA_CAT_META[sel.cat][lang]}
              </span>
            </div>
            <div className="font-medium text-slate-100">
              {lang === 'vi' ? sel.vi : sel.en}
            </div>
            {/* Tên IUPAC — luôn giữ nguyên dạng tiếng Anh, kể cả ở giao diện
                tiếng Việt: đây là chuẩn quốc tế, chỉ có một cách viết.
                Ẩn đi khi trùng đúng tên đang hiện ngay bên trên. */}
            {iupacKhacTen(keyOf(sel), lang === 'vi' ? sel.vi : sel.en, sel.en) && (
              <div className="text-xs mt-0.5">
                <span className="text-slate-500">
                  {lang === 'vi' ? 'Danh pháp IUPAC: ' : 'IUPAC name: '}
                </span>
                <span className="text-slate-300">
                  {iupacKhacTen(keyOf(sel), lang === 'vi' ? sel.vi : sel.en, sel.en)}
                </span>
              </div>
            )}

            {/* Lớp chất — bấm sang định nghĩa trong từ điển để hiểu cả nhóm,
                không chỉ riêng chất đang xem. */}
            {(() => {
              const nhom = nhomCuaChat(sel);
              const tu = sel.nhom ? thuatNguCuaNhom(sel.nhom) : undefined;
              if (!nhom) return null;
              return (
                <div className="text-xs mt-1">
                  <span className="text-slate-500">
                    {lang === 'vi' ? 'Nhóm chất: ' : 'Class: '}
                  </span>
                  {tu ? (
                    <Link
                      to={`/dictionary?item=${encodeURIComponent(tu.en)}`}
                      className="text-accent hover:underline"
                    >
                      {lang === 'vi' ? nhom.vi : nhom.en} →
                    </Link>
                  ) : (
                    <span className="text-slate-300">
                      {lang === 'vi' ? nhom.vi : nhom.en}
                    </span>
                  )}
                </div>
              );
            })()}

            <div className="text-sm text-slate-400 mt-1.5">
              {lang === 'vi' ? sel.note_vi : sel.note_en}
            </div>

            {reactionsForFormula(sel.formula).length > 0 && (
              <Link
                to={`/reactions?q=${encodeURIComponent(sel.formula)}`}
                className="btn-ghost text-xs mt-3 w-full"
              >
                {lang === 'vi'
                  ? `Xem ${reactionsForFormula(sel.formula).length} phản ứng liên quan →`
                  : `See ${reactionsForFormula(sel.formula).length} related reactions →`}
              </Link>
            )}

            {/* Đồng phân — cùng công thức phân tử nhưng khác cấu tạo.
                Bấm vào là chuyển thẳng sang chất đó để so sánh ngay. */}
            {isomersOf(sel).length > 0 && (
              <div className="mt-3">
                <div className="text-[11px] text-slate-500 mb-1">
                  {lang === 'vi'
                    ? `Đồng phân — cùng công thức phân tử ${ctptOf(sel)}`
                    : `Isomers — same molecular formula ${ctptOf(sel)}`}
                </div>
                <div className="flex flex-wrap gap-1">
                  {isomersOf(sel).map((x) => (
                    <button
                      key={keyOf(x) + x.en}
                      onClick={() => setSel(x)}
                      className="text-[11px] px-1.5 py-0.5 rounded bg-base-800 text-slate-400 hover:bg-accent/15 hover:text-accent transition"
                    >
                      {lang === 'vi' ? x.vi : x.en}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {elementsOfFormula(sel).length > 0 && (
              <div className="mt-3">
                <div className="text-[11px] text-slate-500 mb-1">
                  {lang === 'vi' ? 'Nguyên tố cấu thành' : 'Elements'}
                </div>
                <div className="flex flex-wrap gap-1">
                  {elementsOfFormula(sel).map((n) => {
                    const e = byNumber(n);
                    if (!e) return null;
                    return (
                      <Link
                        key={n}
                        to={`/table/${n}`}
                        className="text-[11px] px-1.5 py-0.5 rounded bg-base-800 text-slate-400 hover:bg-accent/15 hover:text-accent transition"
                      >
                        {e.sym} {lang === 'vi' ? e.vi : e.en}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MẨU THỰC TIỄN CỦA CHÍNH CHẤT NÀY.
                Trước đây mẩu thực tiễn chỉ nối được tới NGUYÊN TỐ và tới LỚP
                CHẤT, không nối tới một chất cụ thể. Nên mở SiO2 ra không thấy
                chuyện gói hút ẩm, dù mẩu ấy nói đúng về nó. Nay nối được. */}
            {(() => {
              const mau = factsForChat(keyOf(sel));
              if (!mau.length) return null;
              return (
                <div className="mt-4">
                  <div className="text-xs text-slate-500 mb-1.5">
                    {lang === 'vi' ? 'Chất này trong đời sống' : 'In everyday life'}
                  </div>
                  <ul className="space-y-1.5">
                    {mau.map((f) => (
                      <li
                        key={f.en}
                        className="flex gap-2 text-xs text-slate-400 leading-relaxed"
                      >
                        <span className="text-accent/70 shrink-0">💡</span>
                        <span className="min-w-0">{lang === 'vi' ? f.vi : f.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

            {hasStructure(keyOf(sel)) ? (
              <div className="mt-4 rounded-xl bg-base-900 border border-base-800 p-3">
                {hinh ? (
                  <button
                    onClick={() => setPhongTo(true)}
                    title={lang === 'vi' ? 'Bấm để phóng to' : 'Click to enlarge'}
                    className="block w-full h-64 sm:h-72 text-slate-100 hover:opacity-80 transition-opacity cursor-zoom-in"
                    // Hình do RDKit sinh sẵn (đầy đủ lập thể); nét dùng currentColor.
                    // Là ảnh vector nên phóng to bao nhiêu cũng không vỡ nét.
                    dangerouslySetInnerHTML={{ __html: hinh }}
                  />
                ) : (
                  <div className="h-64 sm:h-72 grid place-items-center text-center text-xs text-slate-600 px-4">
                    {/* Nói rõ ĐANG CHỜ hay ĐÃ HỎNG. Gộp hai chuyện vào một ô
                        trống thì người mất mạng cứ ngồi đợi mãi một thứ không
                        bao giờ tới. */}
                    {dangTaiHinh
                      ? lang === 'vi'
                        ? 'Đang tải hình…'
                        : 'Loading…'
                      : loiHinh
                        ? lang === 'vi'
                          ? 'Chưa tải được hình. Cần mạng cho lần xem đầu — hoặc vào Cài đặt tải sẵn cả bộ về máy.'
                          : 'Could not load the image. The first view needs a network — or download the whole set in Settings.'
                        : ''}
                  </div>
                )}
                <div className="text-center text-[11px] text-slate-500 mt-1">
                  {/* Polime chỉ vẽ được MỘT mắt xích; hai đầu hở là chỗ mạch nối tiếp */}
                  {/^\(.+\)n$/.test(sel.formula)
                    ? lang === 'vi'
                      ? 'Một mắt xích của polime (hai đầu nối tiếp mạch)'
                      : 'One repeating unit (open ends continue the chain)'
                    : lang === 'vi'
                      ? 'Công thức cấu tạo'
                      : 'Structural formula'}
                </div>
                {hinh && (
                  <div className="text-center text-[10px] text-slate-600 mt-0.5">
                    {lang === 'vi' ? 'Bấm vào hình để phóng to' : 'Click the image to enlarge'}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 text-xs text-slate-600 text-center py-4 rounded-xl bg-base-900 border border-base-800">
                {lang === 'vi'
                  ? 'Chất này chưa có hình công thức cấu tạo.'
                  : 'No structural formula yet.'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Phóng to hình cấu tạo ra toàn màn hình. Ảnh vector nên nét vẫn sắc.
          Đặt z cao hơn khung chi tiết để nằm hẳn lên trên. */}
      {phongTo && sel && hinh && (
        <div
          // Màn hình THẤP (điện thoại nằm ngang) thì thu lề và tiêu đề lại,
          // nhường hết chỗ cho hình — chiều cao mới là thứ khan hiếm.
          className="fixed inset-0 z-[70] bg-base-950/95 backdrop-blur-sm flex flex-col p-4 md:p-8 [@media(max-height:500px)]:p-2"
          onClick={() => setPhongTo(false)}
        >
          <div className="flex items-start justify-between gap-3 shrink-0">
            <div className="min-w-0">
              <FormulaText
                value={sel.formula}
                subscript={sel.cat !== 'physical'}
                className="text-xl md:text-2xl [@media(max-height:500px)]:text-base font-bold text-accent font-mono"
              />
              <div className="text-sm [@media(max-height:500px)]:text-xs text-slate-300 truncate">
                {lang === 'vi' ? sel.vi : sel.en}
              </div>
            </div>
            <button
              onClick={() => setPhongTo(false)}
              aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
              className="btn-ghost shrink-0 px-3 py-1.5 text-lg leading-none"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 min-h-0 mt-3 [@media(max-height:500px)]:mt-1 relative cursor-zoom-out">
            {/* Khi xoay: cho khối này mang đúng kích thước ĐÃ HOÁN ĐỔI rồi mới
                quay 90°, nhờ vậy sau khi quay nó phủ vừa khít vùng trống.
                Quay bằng transform nên không ảnh hưởng bố cục xung quanh. */}
            <div
              className={
                xoayHinh
                  ? 'absolute top-1/2 left-1/2 w-[calc(100vh-12rem)] h-[88vw] -translate-x-1/2 -translate-y-1/2 rotate-90 text-slate-100'
                  : 'absolute inset-0 text-slate-100'
              }
              dangerouslySetInnerHTML={{ __html: hinh }}
            />
          </div>
          <div className="flex items-center justify-center gap-3 shrink-0 pt-2 [@media(max-height:500px)]:pt-1 [@media(max-height:500px)]:text-[10px] text-xs text-slate-500">
            <span>{lang === 'vi' ? 'Bấm bất cứ đâu để đóng' : 'Click anywhere to close'}</span>
            {manHinhDungHep && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // đừng để cú bấm này đóng luôn khung
                  setTatXoay((v) => !v);
                }}
                className="btn-ghost px-2 py-1 text-xs"
              >
                {xoayHinh
                  ? lang === 'vi'
                    ? '⟲ Để thẳng'
                    : '⟲ Upright'
                  : lang === 'vi'
                    ? '⟳ Xoay ngang'
                    : '⟳ Rotate'}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
