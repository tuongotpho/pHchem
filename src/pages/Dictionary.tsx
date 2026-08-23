import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { TERMS } from '../data/dictionary';

// Lấy chữ cái đầu để xếp nhóm; bỏ dấu tiếng Việt (Á → A, Đ → D)
function firstLetter(s: string): string {
  const c = s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'D')
    .trim()
    .charAt(0)
    .toUpperCase();
  return /[A-Z]/.test(c) ? c : '#';
}

export default function Dictionary() {
  const { t, lang } = useLang();
  const [q, setQ] = useState('');
  const [letter, setLetter] = useState<string | null>(null);

  // Đến thẳng từ ô tìm kiếm trang chủ: ?item=<tên tiếng Anh của thuật ngữ>.
  // Không lọc bớt danh sách — vẫn hiện đủ để người dùng thấy ngữ cảnh xung
  // quanh, chỉ cuộn tới và tô viền mục cần tìm.
  const [params] = useSearchParams();
  const target = params.get('item');
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cuộn TỨC THÌ, không "mượt": danh sách dài mấy nghìn pixel, cuộn mượt vừa
    // lâu vừa hay bị hụt giữa chừng. Bấm liên kết là phải thấy mục ngay.
    // Đợi một khung hình cho danh sách vẽ xong rồi mới đo vị trí.
    const id = requestAnimationFrame(() => {
      targetRef.current?.scrollIntoView({ block: 'center' });
    });
    return () => cancelAnimationFrame(id);
  }, [target]);

  // Sắp xếp theo bảng chữ cái của ngôn ngữ đang chọn
  const sorted = useMemo(
    () =>
      [...TERMS].sort((a, b) =>
        (lang === 'vi' ? a.vi : a.en).localeCompare(
          lang === 'vi' ? b.vi : b.en,
          'vi',
        ),
      ),
    [lang],
  );

  // Các chữ cái thực sự có mục
  const letters = useMemo(
    () => [...new Set(sorted.map((tm) => firstLetter(lang === 'vi' ? tm.vi : tm.en)))],
    [sorted, lang],
  );

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return sorted.filter((term) => {
      if (letter && firstLetter(lang === 'vi' ? term.vi : term.en) !== letter)
        return false;
      if (!query) return true;
      return (
        term.vi.toLowerCase().includes(query) ||
        term.en.toLowerCase().includes(query) ||
        term.def_vi.toLowerCase().includes(query) ||
        term.def_en.toLowerCase().includes(query)
      );
    });
  }, [sorted, q, letter, lang]);

  return (
    <>
      <PageHeader
        title={t('nav_dictionary')}
        subtitle={`${TERMS.length} ${t('items_count')}`}
      />
      <div className="p-4 md:p-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('search_placeholder')}
          className="w-full max-w-md bg-base-850 border border-base-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent mb-3"
        />

        {/* Thanh chữ cái */}
        <div className="flex flex-wrap gap-1 mb-4">
          <button
            onClick={() => setLetter(null)}
            className={`text-xs px-2.5 py-1.5 rounded-lg border transition ${
              letter === null
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'border-base-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'vi' ? 'Tất cả' : 'All'}
          </button>
          {letters.map((L) => (
            <button
              key={L}
              onClick={() => setLetter(letter === L ? null : L)}
              className={`w-8 h-8 text-xs font-semibold rounded-lg border transition ${
                letter === L
                  ? 'bg-accent/15 border-accent/40 text-accent'
                  : 'border-base-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {L}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 mb-2">
          {list.length} {t('items_count')}
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-start">
          {list.map((term) => {
            const daChon = term.en === target;
            return (
            <div
              key={term.en}
              ref={daChon ? targetRef : undefined}
              className={`card p-4 ${daChon ? 'border-accent ring-2 ring-accent/40' : ''}`}
            >
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
            );
          })}
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
