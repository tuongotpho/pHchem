import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { byNumber, CATEGORY_META, type Element } from '../data/elements';

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
  const prev = byNumber(el.n - 1);
  const next = byNumber(el.n + 1);

  const rows: { label: string; value: string }[] = [
    { label: lang === 'vi' ? 'Số hiệu nguyên tử' : 'Atomic number', value: String(el.n) },
    {
      label: lang === 'vi' ? 'Khối lượng nguyên tử' : 'Atomic mass',
      value: `${el.mass} u`,
    },
    {
      label: lang === 'vi' ? 'Phân loại' : 'Category',
      value: lang === 'vi' ? meta.vi : meta.en,
    },
    {
      label: lang === 'vi' ? 'Nhóm' : 'Group',
      value: el.group === 0 ? (lang === 'vi' ? 'Khối f' : 'f-block') : String(el.group),
    },
    { label: lang === 'vi' ? 'Chu kỳ' : 'Period', value: String(el.period) },
    { label: lang === 'vi' ? 'Khối' : 'Block', value: block(el) },
    { label: lang === 'vi' ? 'Cấu hình electron' : 'Electron configuration', value: el.config },
  ];

  return (
    <>
      <PageHeader title={lang === 'vi' ? el.vi : el.en} subtitle={el.en !== el.vi ? el.en : undefined} />

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
            <div className={`text-sm ${meta.text}`}>
              {lang === 'vi' ? meta.vi : meta.en}
            </div>
            <div className="text-sm text-slate-400 mt-1">{el.mass} u</div>
          </div>
        </div>

        {/* Bảng số liệu */}
        <div className="card divide-y divide-base-800">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-4 px-4 py-3">
              <span className="text-sm text-slate-400">{r.label}</span>
              <span className="text-sm font-medium text-slate-100 text-right font-mono">
                {r.value}
              </span>
            </div>
          ))}
        </div>

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
