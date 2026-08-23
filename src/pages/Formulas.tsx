import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import FormulaText from '../components/FormulaText';
import Pagination from '../components/Pagination';
import { useLang } from '../i18n/LangContext';
import { hasStructure, STRUCTURE_COUNT } from '../generated/structures';
import { elementsOfFormula } from '../lib/compoundIndex';
import { reactionsForFormula } from '../lib/reactionIndex';
import { byNumber } from '../data/elements';
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
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [cat, setCat] = useState<FormulaCat | 'all'>('all');
  const [onlyStruct, setOnlyStruct] = useState(false);
  // Đến thẳng từ ô tìm kiếm trang chủ: ?item=<khóa chất> thì mở sẵn khung chi
  // tiết của đúng chất đó, khỏi bắt người dùng dò lại trong danh sách 340 mục.
  const [sel, setSel] = useState<Formula | null>(
    () => FORMULAS.find((f) => keyOf(f) === params.get('item')) ?? null,
  );
  const [page, setPage] = useState(1);

  // Đến từ trang nguyên tố: điền sẵn ô tìm kiếm theo công thức được bấm
  useEffect(() => {
    const tuDiaChi = params.get('q');
    if (tuDiaChi !== null) setQ(tuDiaChi);
  }, [params]);
  // Kho hình chỉ tải khi người dùng mở xem chất đầu tiên (giữ app nhẹ lúc mở).
  const [svgs, setSvgs] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    if (!sel || svgs) return;
    let alive = true;
    import('../generated/structures-svgs').then((m) => {
      if (alive) setSvgs(m.STRUCTURE_SVGS);
    });
    return () => {
      alive = false;
    };
  }, [sel, svgs]);

  const structCount = STRUCTURE_COUNT;

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

  // Đổi bộ lọc hay từ khóa thì quay về trang 1
  useEffect(() => setPage(1), [q, cat, onlyStruct]);

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
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('filter_placeholder')}
          className="w-full max-w-md bg-base-850 border border-base-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent mb-3"
        />
        <div className="flex gap-1.5 mb-4 flex-wrap items-center">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
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
            onClick={() => setOnlyStruct((v) => !v)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition flex items-center gap-1 ${
              onlyStruct
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'border-base-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {onlyStruct ? '☑' : '☐'} {lang === 'vi' ? 'Có hình' : 'With structure'}
            <span className="opacity-60">({structCount})</span>
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
          onClick={() => setSel(null)}
        >
          <div
            className="card p-5 max-w-sm w-full relative"
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
            <div className="text-sm text-slate-400 mt-1">
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

            {hasStructure(keyOf(sel)) ? (
              <div className="mt-4 rounded-xl bg-base-900 border border-base-800 p-3">
                {svgs ? (
                  <div
                    className="h-56 text-slate-100 mx-auto"
                    // Hình do RDKit sinh sẵn (đầy đủ lập thể); nét dùng currentColor
                    dangerouslySetInnerHTML={{ __html: svgs[keyOf(sel)] }}
                  />
                ) : (
                  <div className="h-56 grid place-items-center text-xs text-slate-600">
                    {lang === 'vi' ? 'Đang tải hình…' : 'Loading…'}
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
    </>
  );
}
