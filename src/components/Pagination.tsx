import { useLang } from '../i18n/LangContext';

// Thanh chuyển trang dùng chung. Hiện tối đa 5 số trang quanh trang hiện tại,
// phần bị lược bớt thay bằng dấu …
export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const { lang } = useLang();
  if (totalPages <= 1) return null;

  const go = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    onChange(next);
    // Cuộn lên đầu danh sách cho dễ đọc
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dãy số trang: luôn có trang đầu, trang cuối và vùng quanh trang hiện tại
  const nums: (number | 'gap')[] = [];
  const push = (n: number) => nums.push(n);
  const from = Math.max(2, page - 1);
  const to = Math.min(totalPages - 1, page + 1);
  push(1);
  if (from > 2) nums.push('gap');
  for (let i = from; i <= to; i++) push(i);
  if (to < totalPages - 1) nums.push('gap');
  if (totalPages > 1) push(totalPages);

  const btn =
    'min-w-[34px] h-9 px-2 rounded-lg border text-sm transition select-none';

  return (
    <nav className="flex items-center justify-center gap-1.5 flex-wrap mt-6">
      <button
        onClick={() => go(page - 1)}
        disabled={page === 1}
        className={`${btn} border-base-700 text-slate-300 hover:bg-base-800 disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        ‹
      </button>

      {nums.map((n, i) =>
        n === 'gap' ? (
          <span key={`g${i}`} className="px-1 text-slate-600 select-none">
            …
          </span>
        ) : (
          <button
            key={n}
            onClick={() => go(n)}
            className={`${btn} ${
              n === page
                ? 'bg-accent text-base-950 border-accent font-semibold'
                : 'border-base-700 text-slate-300 hover:bg-base-800'
            }`}
          >
            {n}
          </button>
        ),
      )}

      <button
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        className={`${btn} border-base-700 text-slate-300 hover:bg-base-800 disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        ›
      </button>

      <span className="ml-2 text-xs text-slate-500">
        {lang === 'vi' ? `Trang ${page}/${totalPages}` : `Page ${page}/${totalPages}`}
      </span>
    </nav>
  );
}
