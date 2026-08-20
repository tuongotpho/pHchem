import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { byNumber, CATEGORY_META, type Element } from '../data/elements';
import { DETAILS, PHASE_META, formatDensity } from '../data/elements.details';
import { factsForElement } from '../data/facts';

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

export default function ElementDetail() {
  const { n } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [xemHet, setXemHet] = useState(false);
  const el = byNumber(Number(n));

  if (!el) {
    return (
      <>
        <PageHeader title={t('nav_table')} />
        <div className="p-6 text-slate-400">Không tìm thấy nguyên tố.</div>
      </>
    );
  }

  const meta = CATEGORY_META[el.cat];
  const d = DETAILS[el.n];
  const phase = PHASE_META[d.state];
  const facts = factsForElement(el.n);
  const factsHien = xemHet ? facts : facts.slice(0, 6);
  const prev = byNumber(el.n - 1);
  const next = byNumber(el.n + 1);

  const temp = (v: number | null) => (v === null ? null : `${v} °C`);

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
    { label: lang === 'vi' ? 'Nóng chảy' : 'Melting', value: temp(d.melt) },
    { label: lang === 'vi' ? 'Sôi' : 'Boiling', value: temp(d.boil) },
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

  const SpecRow = ({ s }: { s: Spec }) => (
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

  const Group = ({ title, specs }: { title: string; specs: Spec[] }) => (
    <div>
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
        {title}
      </h3>
      <dl className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-6">
        {specs.map((s) => (
          <SpecRow key={s.label} s={s} />
        ))}
      </dl>
    </div>
  );

  return (
    <>
      <PageHeader
        title={lang === 'vi' ? el.vi : el.en}
        subtitle={el.en !== el.vi ? el.en : undefined}
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
              <span className={meta.text}>{lang === 'vi' ? meta.vi : meta.en}</span>
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
            <Group title={lang === 'vi' ? 'Thông tin cơ bản' : 'Basic data'} specs={basic} />
            <Group
              title={lang === 'vi' ? 'Tính chất vật lý' : 'Physical properties'}
              specs={physical}
            />
            <Group title={lang === 'vi' ? 'Lịch sử & ứng dụng' : 'History & uses'} specs={history} />
            {coOTrong && (
              <p className="text-[11px] text-slate-600 pt-1">
                {lang === 'vi'
                  ? '— : chưa đo được, chỉ có số dự đoán nên không ghi.'
                  : '— : not measured; only predicted values exist, so left blank.'}
              </p>
            )}
          </div>
        </div>

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
