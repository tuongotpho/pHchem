import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { byNumber, CATEGORY_META, type Element } from '../data/elements';
import {
  DETAILS,
  PHASE_META,
  formatDensity,
  laUocTinh,
} from '../data/elements.details';
import { factsForElement } from '../data/facts';
import { compoundsForElement } from '../lib/compoundIndex';
import { thuatNguCuaNguyenTo } from '../lib/classIndex';
import { reactionsForElement } from '../lib/reactionIndex';
import FormulaText from '../components/FormulaText';

function block(el: Element): string {
  // Khối s/p/d/f suy theo vị trí trong bảng (chuẩn hơn là đọc ký tự cuối
  // của cấu hình, vì 4s viết sau 3d theo quy ước).
  if (el.cat === 'lanthanide' || el.cat === 'actinide') return 'f';
  if (el.sym === 'He') return 's';
  if (el.group <= 2) return 's';
  if (el.group >= 13) return 'p';
  return 'd';
}

/** Một dòng thông số: nhãn trái, giá trị phải, gọn trong một dòng.
 *  wide = chiếm trọn hàng (dành cho nội dung dài như cấu hình electron). */
type Spec = { label: string; value: string | null; wide?: boolean };

// Hai khối dưới đây đặt NGOÀI hàm trang, không lồng bên trong.
//
// Định nghĩa component ngay trong lúc vẽ thì mỗi lần trang vẽ lại, React coi
// đó là một loại component MỚI: nó tháo cây cũ đi rồi dựng lại từ đầu, mất
// sạch trạng thái bên trong và làm hỏng hiệu ứng chuyển. Ở đây chưa lộ ra vì
// hai khối này không giữ trạng thái, nhưng thêm bất cứ thứ gì có trạng thái là
// lỗi hiện ngay — nên đặt đúng chỗ ngay từ giờ.

function SpecRow({ s, chuaXacDinh }: { s: Spec; chuaXacDinh: string }) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 border-b border-base-800/70 py-1 ${
        s.wide ? 'col-span-full' : ''
      }`}
    >
      <dt className="text-xs text-slate-500 shrink-0">{s.label}</dt>
      <dd
        className={`text-sm text-right min-w-0 ${
          s.value === null ? 'text-slate-600' : 'font-medium text-slate-100 font-mono'
        }`}
        title={s.value === null ? chuaXacDinh : undefined}
      >
        {s.value ?? '—'}
      </dd>
    </div>
  );
}

function Group({
  title,
  specs,
  chuaXacDinh,
}: {
  title: string;
  specs: Spec[];
  chuaXacDinh: string;
}) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
        {title}
      </h3>
      <dl className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-6">
        {specs.map((s) => (
          <SpecRow key={s.label} s={s} chuaXacDinh={chuaXacDinh} />
        ))}
      </dl>
    </div>
  );
}

export default function ElementDetail() {
  const { n } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [xemHet, setXemHet] = useState(false);
  const [xemHetHC, setXemHetHC] = useState(false);
  const el = byNumber(Number(n));

  if (!el) {
    return (
      <>
        <PageHeader title={t('nav_table')} />
        <div className="p-6 text-slate-400">{t('element_not_found')}</div>
      </>
    );
  }

  const meta = CATEGORY_META[el.cat];
  const d = DETAILS[el.n];
  const phase = PHASE_META[d.state];
  const facts = factsForElement(el.n);
  const hopChat = compoundsForElement(el.n);
  const phanUng = reactionsForElement(el.n);
  const hopChatHien = xemHetHC ? hopChat : hopChat.slice(0, 24);
  const factsHien = xemHet ? facts : facts.slice(0, 6);
  const prev = byNumber(el.n - 1);
  const next = byNumber(el.n + 1);

  // Vài nhiệt độ sôi của actini phóng xạ là NGOẠI SUY chứ chưa ai đo được —
  // xem elements.details.ts. Ghi kèm chữ "ước tính" chứ không giấu, mà cũng
  // không bỏ trống: bảng tra nào cũng in số, để dấu gạch ngang lại trông như
  // app thiếu dữ liệu.
  const temp = (v: number | null, truong: 'melt' | 'boil') => {
    if (v === null) return null;
    const so = `${v} °C`;
    if (!laUocTinh(el.n, truong)) return so;
    return `${so} (${lang === 'vi' ? 'ước tính' : 'estimated'})`;
  };

  const basic: Spec[] = [
    { label: lang === 'vi' ? 'Số hiệu' : 'Number', value: String(el.n) },
    { label: lang === 'vi' ? 'Khối lượng' : 'Mass', value: `${el.mass} u` },
    { label: lang === 'vi' ? 'Nhóm' : 'Group', value: el.group === 0 ? (lang === 'vi' ? 'Khối f' : 'f-block') : String(el.group) },
    { label: lang === 'vi' ? 'Chu kỳ' : 'Period', value: String(el.period) },
    { label: lang === 'vi' ? 'Khối' : 'Block', value: block(el) },
    { label: lang === 'vi' ? 'Trạng thái' : 'State', value: `${phase.icon} ${lang === 'vi' ? phase.vi : phase.en}` },
    { label: lang === 'vi' ? 'Cấu hình e' : 'Electron config.', value: el.config, wide: true },
  ];

  const physical: Spec[] = [
    { label: lang === 'vi' ? 'Nóng chảy' : 'Melting', value: temp(d.melt, 'melt') },
    { label: lang === 'vi' ? 'Sôi' : 'Boiling', value: temp(d.boil, 'boil') },
    { label: lang === 'vi' ? 'Khối lượng riêng' : 'Density', value: formatDensity(d.density, d.state) },
    { label: lang === 'vi' ? 'Độ âm điện' : 'Electronegativity', value: d.en === null ? null : String(d.en) },
  ];

  // Năm phát hiện: null = chưa rõ, 0 = biết từ thời cổ đại
  let namPhatHien: string | null;
  if (d.disc === null) namPhatHien = null;
  else if (d.disc === 0) namPhatHien = lang === 'vi' ? 'Thời cổ đại' : 'Antiquity';
  else namPhatHien = String(d.disc);

  const history: Spec[] = [
    { label: lang === 'vi' ? 'Phát hiện' : 'Discovered', value: namPhatHien },
    {
      label: lang === 'vi' ? 'Ứng dụng' : 'Uses',
      value: lang === 'vi' ? d.use_vi : d.use_en,
      wide: true,
    },
  ];

  const coOTrong = [...basic, ...physical, ...history].some((s) => s.value === null);
  const chuaXacDinh = lang === 'vi' ? 'Chưa xác định' : 'Not determined';

  return (
    <>
      <PageHeader
        title={lang === 'vi' ? el.vi : el.en}
        subtitle={
          // Tên tiếng Anh của nguyên tố CHÍNH LÀ tên IUPAC. Sách giáo khoa mới
          // đã chuyển sang dùng tên này, nên ghi rõ nhãn để người đọc biết đó
          // không phải chỉ là bản dịch.
          el.en !== el.vi
            ? lang === 'vi'
              ? `Danh pháp IUPAC: ${el.en}`
              : el.vi
            : undefined
        }
      />

      <div className="p-4 md:p-6">
        <button onClick={() => navigate('/table')} className="btn-ghost text-xs mb-3">
          ← {t('nav_table')}
        </button>

        <div className="grid gap-4 lg:grid-cols-[210px_minmax(0,1fr)] items-start">
          {/* Thẻ nguyên tố — gọn, không lặp lại số liệu đã có ở bảng bên phải */}
          <div className={`card border ${meta.color} p-4 text-center`}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">{el.n}</span>
              {/* Nhóm nguyên tố bấm được: mở thẳng định nghĩa trong từ điển,
                  kèm mọi nguyên tố cùng nhóm để so sánh. */}
              {(() => {
                const tu = thuatNguCuaNguyenTo(el.cat);
                const nhan = lang === 'vi' ? meta.vi : meta.en;
                return tu ? (
                  <Link
                    to={`/dictionary?item=${encodeURIComponent(tu.en)}`}
                    className={`${meta.text} hover:underline`}
                    title={lang === 'vi' ? 'Xem định nghĩa nhóm' : 'See group definition'}
                  >
                    {nhan} →
                  </Link>
                ) : (
                  <span className={meta.text}>{nhan}</span>
                );
              })()}
            </div>
            <div className={`text-6xl font-bold my-2 ${meta.text}`}>{el.sym}</div>
            <div className="text-base font-bold text-slate-100 leading-tight">
              {lang === 'vi' ? el.vi : el.en}
            </div>
            <div className="text-[11px] text-slate-500">
              {lang === 'vi' ? el.en : el.vi}
            </div>
          </div>

          {/* Bảng thông số — gộp cả ba nhóm vào một thẻ */}
          <div className="card p-4 space-y-3">
            <Group
              title={lang === 'vi' ? 'Thông tin cơ bản' : 'Basic data'}
              specs={basic}
              chuaXacDinh={chuaXacDinh}
            />
            <Group
              title={lang === 'vi' ? 'Tính chất vật lý' : 'Physical properties'}
              specs={physical}
              chuaXacDinh={chuaXacDinh}
            />
            <Group
              title={lang === 'vi' ? 'Lịch sử & ứng dụng' : 'History & uses'}
              specs={history}
              chuaXacDinh={chuaXacDinh}
            />
            {coOTrong && (
              <p className="text-[11px] text-slate-600 pt-1">
                {lang === 'vi'
                  ? '— : chưa đo được, chỉ có số dự đoán nên không ghi.'
                  : '— : not measured; only predicted values exist, so left blank.'}
              </p>
            )}
          </div>
        </div>

        {/* Hợp chất trong thư viện có chứa nguyên tố này */}
        {hopChat.length > 0 && (
          <section className="mt-5">
            <h2 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'vi'
                ? `Hợp chất chứa ${el.vi} (${hopChat.length})`
                : `Compounds containing ${el.en} (${hopChat.length})`}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {hopChatHien.map((f) => (
                <button
                  key={f.formula + f.en}
                  onClick={() =>
                    navigate(`/formulas?q=${encodeURIComponent(f.formula)}`)
                  }
                  title={lang === 'vi' ? f.vi : f.en}
                  className="text-xs px-2 py-1 rounded-lg border border-base-700 text-slate-300 hover:bg-accent/15 hover:border-accent/40 hover:text-accent transition"
                >
                  <FormulaText value={f.formula} className="font-mono" />
                </button>
              ))}
            </div>
            {hopChat.length > 24 && (
              <button
                onClick={() => setXemHetHC((v) => !v)}
                className="btn-ghost text-xs mt-2 w-full"
              >
                {xemHetHC
                  ? lang === 'vi'
                    ? 'Thu gọn'
                    : 'Show less'
                  : lang === 'vi'
                    ? `Xem thêm ${hopChat.length - 24} hợp chất`
                    : `Show ${hopChat.length - 24} more`}
              </button>
            )}
          </section>
        )}

        {/* Phản ứng có mặt nguyên tố này */}
        {phanUng.length > 0 && (
          <section className="mt-5">
            <h2 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'vi'
                ? `Phản ứng có ${el.vi} (${phanUng.length})`
                : `Reactions involving ${el.en} (${phanUng.length})`}
            </h2>
            <div className="grid gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
              {phanUng.slice(0, 6).map((r) => (
                <div key={r.eq} className="card px-3 py-2 font-mono text-xs text-slate-300">
                  {r.eq}
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate(`/reactions?el=${el.n}`)}
              className="btn-ghost text-xs mt-2 w-full"
            >
              {lang === 'vi'
                ? `Xem tất cả ${phanUng.length} phản ứng`
                : `See all ${phanUng.length} reactions`}
            </button>
          </section>
        )}

        {/* Sự thật gắn với nguyên tố này — giúp nhớ bài dễ hơn */}
        {facts.length > 0 && (
          <section className="mt-5">
            <h2 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'vi'
                ? `Sự thật về ${el.vi} (${facts.length})`
                : `Facts about ${el.en} (${facts.length})`}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3 items-start">
              {factsHien.map((f, i) => (
                <div key={i} className="card p-3 flex gap-2.5">
                  <div className="text-base shrink-0 leading-none mt-0.5">💡</div>
                  <div className="min-w-0">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-base-800 text-accent">
                      {f.tag}
                    </span>
                    <p className="text-sm text-slate-300 mt-1.5">
                      {lang === 'vi' ? f.vi : f.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {facts.length > 6 && (
              <button
                onClick={() => setXemHet((v) => !v)}
                className="btn-ghost text-xs mt-2 w-full"
              >
                {xemHet
                  ? lang === 'vi'
                    ? 'Thu gọn'
                    : 'Show less'
                  : lang === 'vi'
                    ? `Xem thêm ${facts.length - 6} sự thật`
                    : `Show ${facts.length - 6} more`}
              </button>
            )}
          </section>
        )}

        {/* Điều hướng trước/sau */}
        <div className="flex justify-between gap-3 mt-5">
          <button
            disabled={!prev}
            onClick={() => prev && navigate(`/table/${prev.n}`)}
            className="btn-ghost text-sm disabled:opacity-30 flex-1"
          >
            {prev ? `← ${prev.sym} ${lang === 'vi' ? prev.vi : prev.en}` : ''}
          </button>
          <button
            disabled={!next}
            onClick={() => next && navigate(`/table/${next.n}`)}
            className="btn-ghost text-sm disabled:opacity-30 flex-1"
          >
            {next ? `${next.sym} ${lang === 'vi' ? next.vi : next.en} →` : ''}
          </button>
        </div>
      </div>
    </>
  );
}
