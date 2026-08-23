import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import type { StringKey } from '../i18n/strings';
import {
  IconTable,
  IconCalc,
  IconGrid,
  IconFlask,
  IconBook,
  IconBulb,
  IconSearch,
  IconReaction,
} from '../components/icons';
import { searchAll } from '../lib/search';
import NutNhanh from '../components/NutNhanh';

type Tile = {
  to: string;
  title: StringKey;
  desc: StringKey;
  Icon: (p: { className?: string }) => React.JSX.Element;
  color: string;
};

const TILES: Tile[] = [
  { to: '/table', title: 'home_title_table', desc: 'home_desc_table', Icon: IconTable, color: 'from-teal-500/20 to-teal-500/5 text-teal-700 dark:text-teal-300' },
  { to: '/calculator', title: 'home_title_calc', desc: 'home_desc_calc', Icon: IconCalc, color: 'from-sky-500/20 to-sky-500/5 text-sky-700 dark:text-sky-300' },
  { to: '/solubility', title: 'home_title_solubility', desc: 'home_desc_solubility', Icon: IconGrid, color: 'from-violet-500/20 to-violet-500/5 text-violet-700 dark:text-violet-300' },
  { to: '/reactions', title: 'home_title_reactions', desc: 'home_desc_reactions', Icon: IconReaction, color: 'from-orange-500/20 to-orange-500/5 text-orange-700 dark:text-orange-300' },
  { to: '/electro', title: 'home_title_electro', desc: 'home_desc_electro', Icon: IconGrid, color: 'from-cyan-500/20 to-cyan-500/5 text-cyan-700 dark:text-cyan-300' },
  { to: '/formulas', title: 'home_title_formulas', desc: 'home_desc_formulas', Icon: IconFlask, color: 'from-amber-500/20 to-amber-500/5 text-amber-700 dark:text-amber-300' },
  { to: '/dictionary', title: 'home_title_dictionary', desc: 'home_desc_dictionary', Icon: IconBook, color: 'from-rose-500/20 to-rose-500/5 text-rose-700 dark:text-rose-300' },
  { to: '/facts', title: 'home_title_facts', desc: 'home_desc_facts', Icon: IconBulb, color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-700 dark:text-emerald-300' },
];

const BADGE_COLOR: Record<string, string> = {
  element: 'bg-teal-500/20 text-teal-700 dark:text-teal-300',
  formula: 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
  reaction: 'bg-orange-500/20 text-orange-700 dark:text-orange-300',
  term: 'bg-rose-500/20 text-rose-700 dark:text-rose-300',
  fact: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
};

export default function Home() {
  const { t, lang } = useLang();
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Trang chủ không có nút kính lúp (đã có sẵn ô lớn ngay đây), nhưng Ctrl+K
  // vẫn phải ăn cho thống nhất với các trang nhánh — người dùng quen tay bấm
  // ở trang nào cũng thấy có tác dụng.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => searchAll(q, lang), [q, lang]);
  const searching = q.trim().length > 0;

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="relative overflow-hidden px-5 md:px-8 pt-8 pb-6 border-b border-base-800">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex items-start justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">⚗️</span>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
                {t('appName')}
              </h1>
            </div>
            <p className="text-slate-400 text-sm md:text-base">{t('tagline')}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <NutNhanh />
          </div>
        </div>

        {/* Ô tìm kiếm tổng */}
        <div className="relative max-w-xl">
          <IconSearch className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={
              lang === 'vi'
                ? 'Tìm mọi thứ: nguyên tố, công thức, thuật ngữ…'
                : 'Search everything: elements, formulas, terms…'
            }
            className="w-full bg-base-850 border border-base-700 rounded-2xl pl-11 pr-10 py-3 text-sm outline-none focus:border-accent"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
          {searching && (
            <button
              onClick={() => setQ('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-lg"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Kết quả tìm kiếm HOẶC lưới module */}
      {searching ? (
        <div className="p-4 md:p-6 max-w-3xl">
          <div className="text-xs text-slate-500 mb-3">
            {results.length} {lang === 'vi' ? 'kết quả' : 'results'}
          </div>
          {results.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              {lang === 'vi' ? 'Không tìm thấy.' : 'No results.'}
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((r, i) => (
                // Liên kết thật, không phải nút bấm: mở được ở tab mới, chuột
                // phải sao chép được địa chỉ, và trỏ thẳng tới đúng mục.
                <Link
                  key={i}
                  to={r.to}
                  className="card w-full text-left p-3.5 flex items-start gap-3 hover:border-accent/40 transition-colors"
                >
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                      BADGE_COLOR[r.kind] || 'bg-base-800 text-slate-300'
                    }`}
                  >
                    {r.badge}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate-100">
                      {r.title}
                    </span>
                    <span className="block text-xs text-slate-400 truncate">
                      {r.sub}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {TILES.map(({ to, title, desc, Icon, color }) => (
            <Link
              key={to}
              to={to}
              className="card p-4 md:p-5 group hover:border-accent/40 transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} grid place-items-center mb-3`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="font-semibold text-slate-100 group-hover:text-accent transition-colors">
                {t(title)}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">{t(desc)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
