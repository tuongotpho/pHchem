import { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { TERMS } from '../data/dictionary';

export default function Dictionary() {
  const { t, lang } = useLang();
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    const filtered = TERMS.filter(
      (term) =>
        !query ||
        term.vi.toLowerCase().includes(query) ||
        term.en.toLowerCase().includes(query) ||
        term.def_vi.toLowerCase().includes(query) ||
        term.def_en.toLowerCase().includes(query),
    );
    return [...filtered].sort((a, b) =>
      (lang === 'vi' ? a.vi : a.en).localeCompare(lang === 'vi' ? b.vi : b.en, 'vi'),
    );
  }, [q, lang]);

  return (
    <>
      <PageHeader title={t('nav_dictionary')} subtitle={`${TERMS.length} ${t('items_count')}`} />
      <div className="p-4 md:p-6 max-w-2xl">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('search_placeholder')}
          className="w-full bg-base-850 border border-base-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent mb-4"
        />
        <div className="space-y-2">
          {list.map((term) => (
            <div key={term.en} className="card p-4">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-semibold text-slate-100">
                  {lang === 'vi' ? term.vi : term.en}
                </h3>
                <span className="text-xs text-slate-500">
                  {lang === 'vi' ? term.en : term.vi}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {lang === 'vi' ? term.def_vi : term.def_en}
              </p>
            </div>
          ))}
        </div>
        {list.length === 0 && (
          <div className="text-center text-slate-500 py-10">
            {lang === 'vi' ? 'Không tìm thấy.' : 'No results.'}
          </div>
        )}
      </div>
    </>
  );
}
