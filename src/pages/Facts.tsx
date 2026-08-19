import { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { FACTS } from '../data/facts';

export default function Facts() {
  const { t, lang } = useLang();
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => [...new Set(FACTS.map((f) => f.tag))], []);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return FACTS.filter((f) => {
      if (tag && f.tag !== tag) return false;
      if (!query) return true;
      return f.vi.toLowerCase().includes(query) || f.en.toLowerCase().includes(query);
    });
  }, [q, tag]);

  return (
    <>
      <PageHeader title={t('nav_facts')} subtitle={`${FACTS.length} ${t('items_count')}`} />
      <div className="p-4 md:p-6 max-w-2xl">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('search_placeholder')}
          className="w-full bg-base-850 border border-base-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent mb-3"
        />
        <div className="flex gap-1.5 mb-4 flex-wrap">
          <button
            onClick={() => setTag(null)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition ${
              tag === null
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'border-base-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'vi' ? 'Tất cả' : 'All'}
          </button>
          {tags.map((tg) => (
            <button
              key={tg}
              onClick={() => setTag(tg)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                tag === tg
                  ? 'bg-accent/15 border-accent/40 text-accent'
                  : 'border-base-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tg}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {list.map((f, i) => (
            <div key={i} className="card p-4 flex gap-3">
              <div className="text-2xl shrink-0">💡</div>
              <div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-base-800 text-accent">
                  {f.tag}
                </span>
                <p className="text-sm text-slate-200 mt-1.5">
                  {lang === 'vi' ? f.vi : f.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
