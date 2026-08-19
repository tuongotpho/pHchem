import { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import FormulaText from '../components/FormulaText';
import StructuralFormula from '../components/StructuralFormula';
import { useLang } from '../i18n/LangContext';
import { getStructure } from '../data/structures';
import {
  FORMULAS,
  FORMULA_CAT_META,
  type Formula,
  type FormulaCat,
} from '../data/formulas';

const CATS: (FormulaCat | 'all')[] = ['all', 'inorganic', 'organic', 'physical'];

export default function Formulas() {
  const { t, lang } = useLang();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<FormulaCat | 'all'>('all');
  const [onlyStruct, setOnlyStruct] = useState(false);
  const [sel, setSel] = useState<Formula | null>(null);

  // số chất đang có hình công thức cấu tạo
  const structCount = useMemo(
    () => FORMULAS.filter((f) => getStructure(f.formula)).length,
    [],
  );

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return FORMULAS.filter((f) => {
      if (cat !== 'all' && f.cat !== cat) return false;
      if (onlyStruct && !getStructure(f.formula)) return false;
      if (!query) return true;
      return (
        f.formula.toLowerCase().includes(query) ||
        f.vi.toLowerCase().includes(query) ||
        f.en.toLowerCase().includes(query)
      );
    });
  }, [q, cat, onlyStruct]);

  return (
    <>
      <PageHeader title={t('nav_formulas')} subtitle={`${FORMULAS.length} ${t('items_count')}`} />
      <div className="p-4 md:p-6 max-w-3xl">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('search_placeholder')}
          className="w-full bg-base-850 border border-base-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent mb-3"
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
          {list.length} {t('items_count')}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {list.map((f) => {
            const hasStruct = !!getStructure(f.formula);
            return (
              <button
                key={f.formula + f.en}
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

            {getStructure(sel.formula) ? (
              <div className="mt-4 rounded-xl bg-base-900 border border-base-800 p-3">
                <StructuralFormula struct={getStructure(sel.formula)!} size={260} />
                <div className="text-center text-[11px] text-slate-500 mt-1">
                  {lang === 'vi' ? 'Công thức cấu tạo' : 'Structural formula'}
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
