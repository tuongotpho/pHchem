import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { byNumber, CATEGORY_META, type Element } from '../data/elements';
import { DETAILS, PHASE_META, formatDensity } from '../data/elements.details';

function block(el: Element): string {
  // Khối s/p/d/f suy theo vị trí trong bảng (chuẩn hơn là đọc ký tự cuối
  // của cấu hình, vì 4s viết sau 3d theo quy ước).
  if (el.cat === 'lanthanide' || el.cat === 'actinide') return 'f';
  if (el.sym === 'He') return 's';
  if (el.group <= 2) return 's';
  if (el.group >= 13) return 'p';
  return 'd';
}

export default function ElementDetail() {
  const { n } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
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
  const prev = byNumber(el.n - 1);
  const next = byNumber(el.n + 1);

  const unknown = lang === 'vi' ? 'Chưa xác định' : 'Not determined';
  const temp = (v: number | null) => (v === null ? null : `${v} °C`);

  type Row = { label: string; value: string | null };

  const basic: Row[] = [
    { label: lang === 'vi' ? 'Số hiệu nguyên tử' : 'Atomic number', value: String(el.n) },
    { label: lang === 'vi' ? 'Khối lượng nguyên tử' : 'Atomic mass', value: `${el.mass} u` },
    { label: lang === 'vi' ? 'Phân loại' : 'Category', value: lang === 'vi' ? meta.vi : meta.en },
    {
      label: lang === 'vi' ? 'Nhóm' : 'Group',
      value: el.group === 0 ? (lang === 'vi' ? 'Khối f' : 'f-block') : String(el.group),
    },
    { label: lang === 'vi' ? 'Chu kỳ' : 'Period', value: String(el.period) },
    { label: lang === 'vi' ? 'Khối' : 'Block', value: block(el) },
    { label: lang === 'vi' ? 'Cấu hình electron' : 'Electron configuration', value: el.config },
  ];

  const physical: Row[] = [
    {
      label: lang === 'vi' ? 'Trạng thái (25°C)' : 'State at 25°C',
      value: `${PHASE_META[d.state].icon} ${lang === 'vi' ? PHASE_META[d.state].vi : PHASE_META[d.state].en}`,
    },
    { label: lang === 'vi' ? 'Nhiệt độ nóng chảy' : 'Melting point', value: temp(d.melt) },
    { label: lang === 'vi' ? 'Nhiệt độ sôi' : 'Boiling point', value: temp(d.boil) },
    { label: lang === 'vi' ? 'Khối lượng riêng' : 'Density', value: formatDensity(d.density, d.state) },
    {
      label: lang === 'vi' ? 'Độ âm điện' : 'Electronegativity',
      value: d.en === null ? null : `${d.en} (Pauling)`,
    },
  ];

  const history: Row[] = [
    {
      label: lang === 'vi' ? 'Năm phát hiện' : 'Discovered',
      value:
        d.disc === null
          ? null
          : d.disc === 0
            ? lang === 'vi'
              ? 'Đã biết từ thời cổ đại'
              : 'Known since antiquity'
            : String(d.disc),
    },
    {
      label: lang === 'vi' ? 'Ứng dụng chính' : 'Main uses',
      value: lang === 'vi' ? d.use_vi : d.use_en,
    },
  ];

  const Section = ({ title, rows }: { title: string; rows: Row[] }) => (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
        {title}
      </h2>
      <div className="card divide-y divide-base-800">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 px-4 py-3">
            <span className="text-sm text-slate-400 shrink-0">{r.label}</span>
            <span
              className={`text-sm text-right ${
                r.value === null
                  ? 'text-slate-600 italic'
                  : 'font-medium text-slate-100 font-mono'
              }`}
            >
              {r.value ?? unknown}
            </span>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <PageHeader
        title={lang === 'vi' ? el.vi : el.en}
        subtitle={el.en !== el.vi ? el.en : undefined}
      />

      <div className="p-4 md:p-6 max-w-2xl">
        <button onClick={() => navigate('/table')} className="btn-ghost text-xs mb-4">
          ← {t('nav_table')}
        </button>

        {/* Thẻ lớn */}
        <div className={`card border ${meta.color} p-6 mb-5 flex items-center gap-5`}>
          <div className={`text-6xl md:text-7xl font-bold ${meta.text}`}>{el.sym}</div>
          <div>
            <div className="text-sm text-slate-400">{el.n}</div>
            <div className="text-xl font-bold text-slate-100">
              {lang === 'vi' ? el.vi : el.en}
            </div>
            <div className={`text-sm ${meta.text}`}>{lang === 'vi' ? meta.vi : meta.en}</div>
            <div className="text-sm text-slate-400 mt-1">
              {el.mass} u · {PHASE_META[d.state].icon}{' '}
              {lang === 'vi' ? PHASE_META[d.state].vi : PHASE_META[d.state].en}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <Section title={lang === 'vi' ? 'Thông tin cơ bản' : 'Basic data'} rows={basic} />
          <Section
            title={lang === 'vi' ? 'Tính chất vật lý' : 'Physical properties'}
            rows={physical}
          />
          <Section
            title={lang === 'vi' ? 'Lịch sử & ứng dụng' : 'History & uses'}
            rows={history}
          />
        </div>

        {/* Điều hướng trước/sau */}
        <div className="flex justify-between gap-3 mt-6">
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
