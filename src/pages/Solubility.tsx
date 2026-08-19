import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import {
  CATIONS,
  ANIONS,
  MATRIX,
  SOLUB_META,
  type Solub,
} from '../data/solubility';

export default function Solubility() {
  const { t, lang } = useLang();
  const [sel, setSel] = useState<{ c: number; a: number } | null>(null);

  const cell = sel ? MATRIX[sel.c][sel.a] : null;

  return (
    <>
      <PageHeader title={t('nav_solubility')} />
      <div className="p-3 md:p-5">
        {/* Chú giải */}
        <div className="flex flex-wrap gap-2 mb-3 text-xs">
          {(['T', 'I', 'IT', '-'] as Solub[]).map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <span className={`inline-block w-4 h-4 rounded ${SOLUB_META[s].color}`} />
              <span className="text-slate-400">
                {s === '-' ? '—' : s}: {lang === 'vi' ? SOLUB_META[s].vi : SOLUB_META[s].en}
              </span>
            </div>
          ))}
        </div>

        {/* Bảng */}
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-[2px]">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-base-950" />
                {ANIONS.map((an) => (
                  <th
                    key={an.ascii}
                    className="text-[11px] md:text-xs font-semibold text-slate-300 px-1 py-1 min-w-[38px]"
                  >
                    {an.formula}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATIONS.map((cat, ci) => (
                <tr key={cat.ascii}>
                  <th className="sticky left-0 z-10 bg-base-950 text-[11px] md:text-xs font-semibold text-slate-300 pr-2 text-right">
                    {cat.formula}
                  </th>
                  {ANIONS.map((_, ai) => {
                    const v = MATRIX[ci][ai];
                    const meta = SOLUB_META[v];
                    const on = sel?.c === ci && sel?.a === ai;
                    return (
                      <td key={ai} className="p-0">
                        <button
                          onClick={() => setSel({ c: ci, a: ai })}
                          className={`w-9 h-9 md:w-11 md:h-11 rounded-md grid place-items-center text-xs md:text-sm font-bold ${meta.color} ${meta.text} ${
                            on ? 'ring-2 ring-accent' : 'hover:ring-1 hover:ring-white/30'
                          }`}
                        >
                          {v === '-' ? '—' : v}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chi tiết ô đang chọn */}
        {sel && cell && (
          <div className="card p-4 mt-4 max-w-md">
            <div className="text-xs text-slate-500 mb-1">
              {lang === 'vi' ? 'Kết hợp' : 'Combination'}
            </div>
            <div className="font-mono text-lg text-slate-100">
              {CATIONS[sel.c].formula} + {ANIONS[sel.a].formula}
            </div>
            <div className={`mt-2 inline-block px-3 py-1 rounded-lg ${SOLUB_META[cell].color} ${SOLUB_META[cell].text} text-sm font-medium`}>
              {lang === 'vi' ? SOLUB_META[cell].vi : SOLUB_META[cell].en}
            </div>
            {cell === 'I' && (
              <p className="text-xs text-slate-400 mt-2">
                {lang === 'vi'
                  ? '→ Tạo kết tủa khi trộn hai dung dịch chứa các ion này.'
                  : '→ Forms a precipitate when the two ion solutions are mixed.'}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
