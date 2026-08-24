// Tìm kiếm toàn app — nút kính lúp trên thanh tiêu đề, bấm vào thì mở khung
// tìm kiếm nổi giữa màn hình.
//
// Thuật ngữ: tra được mọi thứ trong app gọi là "universal search" (hay global
// search); còn khung nổi lên giữa màn hình, gõ rồi Enter đi thẳng tới nơi, gọi
// là "command palette".
//
// Vì sao là nút nhỏ chứ không phải ô to nằm sẵn:
//   - Ô to chiếm hẳn một hàng trên MỌI trang nhánh, điện thoại thì rất phí.
//   - Mỗi trang đã có ô lọc riêng; hai ô to nằm cạnh nhau gây rối, dễ nhầm
//     ô nào làm việc gì.
//   - Khung nổi lên trên cùng nên không bao giờ bị thanh tiêu đề che — lỗi cũ
//     khỏi tái diễn, mà khỏi cần canh z-index giữa hai thanh dính.
//
// Dùng chung bộ tìm kiếm ở lib/search.ts với trang chủ nên kết quả y hệt, và
// cũng trỏ thẳng tới đúng mục.

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { IconSearch } from './icons';
import { useTimKiem } from '../hooks/useTimKiem';
import { useKhungNoi } from '../hooks/useKhungNoi';

// Số kết quả hiện trong khung. Nhiều hơn thì phải cuộn nhiều, rối mắt.
const HIEN_TOI_DA = 10;

const BADGE_COLOR: Record<string, string> = {
  element: 'bg-teal-500/20 text-teal-700 dark:text-teal-300',
  formula: 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
  reaction: 'bg-orange-500/20 text-orange-700 dark:text-orange-300',
  term: 'bg-rose-500/20 text-rose-700 dark:text-rose-300',
  fact: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
};

export default function GlobalSearch() {
  const { t, lang } = useLang();
  const navigate = useNavigate();

  const [mo, setMo] = useState(false);
  const [q, setQ] = useState('');
  const [chon, setChon] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Kho tra chỉ về khi khung này mở ra — xem hooks/useTimKiem.ts. Mở khung
  // xong người dùng còn phải gõ, nên kho thường về kịp trước phím đầu tiên.
  const { ketQua: tatCa, dangNap } = useTimKiem(q, lang, mo);
  const hien = tatCa.slice(0, HIEN_TOI_DA);
  // Chốt chặn: danh sách ngắn lại mà con trỏ còn trỏ ra ngoài thì kéo về đầu.
  const chonHienTai = chon < hien.length ? chon : 0;
  const conLai = tatCa.length - hien.length;
  const dangTim = q.trim().length > 0;

  // Ctrl+K (Windows) hoặc ⌘K (Mac) mở khung từ bất cứ đâu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMo(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Mở khung thì đưa con trỏ vào ô.
  useEffect(() => {
    if (mo) inputRef.current?.focus();
  }, [mo]);

  const dong = () => {
    setMo(false);
    setQ('');
    setChon(0);
  };

  // Esc đóng khung, và khóa cuộn nền — xem hooks/useKhungNoi.ts. Trước đây Esc
  // bắt trên chính ô nhập, nên con trỏ mà rời khỏi ô là bấm Esc không ăn nữa.
  // Nghe ở cấp cửa sổ thì giống hệt ba khung nổi còn lại trong app.
  useKhungNoi(mo, dong);

  const diToi = (to: string) => {
    dong();
    navigate(to);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Esc không xử lý ở đây nữa — useKhungNoi lo, ở cấp cửa sổ.
    if (!hien.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setChon((i) => (i + 1) % hien.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setChon((i) => (i - 1 + hien.length) % hien.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const r = hien[chonHienTai];
      if (r) diToi(r.to);
    }
  };

  return (
    <>
      {/* Nút kính lúp, nằm gọn trên thanh tiêu đề */}
      <button
        onClick={() => setMo(true)}
        title={`${t('gsearch_open')} (Ctrl K)`}
        aria-label={t('gsearch_open')}
        className="btn-ghost shrink-0 flex items-center gap-1.5 px-2.5 py-1.5"
      >
        <IconSearch className="w-4 h-4" />
        <kbd className="hidden lg:block text-[10px] text-slate-500 border border-base-700 rounded px-1 py-0.5">
          Ctrl K
        </kbd>
      </button>

      {mo && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm p-4 pt-[12vh] flex justify-center"
          onMouseDown={dong}
        >
          <div
            className="w-full max-w-xl h-fit rounded-2xl border border-base-700 bg-base-900 shadow-2xl overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="relative border-b border-base-800">
              <IconSearch className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setChon(0); // gõ thêm chữ là danh sách khác hẳn
                }}
                onKeyDown={onKeyDown}
                placeholder={t('gsearch_placeholder')}
                aria-label={t('gsearch_open')}
                className="w-full bg-transparent pl-11 pr-11 py-3.5 text-sm outline-none"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
              />
              <button
                onClick={dong}
                aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            </div>

            {dangTim &&
              (dangNap ? (
                // Kho tra chưa về. Báo "không có kết quả" lúc này là nói dối —
                // chưa tìm gì cả. Không chữ nghĩa, giống chỗ giữ nhịp trong
                // App.tsx.
                <div className="px-3 py-2 space-y-1.5" aria-busy="true">
                  <div className="h-9 rounded bg-base-850 animate-pulse" />
                  <div className="h-9 rounded bg-base-850 animate-pulse" />
                  <div className="h-9 rounded bg-base-850 animate-pulse" />
                </div>
              ) : hien.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-slate-500">
                  {t('gsearch_empty')}
                </div>
              ) : (
                <div className="max-h-[55vh] overflow-y-auto py-1">
                  {hien.map((r, i) => (
                    <button
                      key={r.to + i}
                      onMouseEnter={() => setChon(i)}
                      onClick={() => diToi(r.to)}
                      className={`w-full text-left px-3 py-2 flex items-start gap-2.5 ${
                        i === chonHienTai ? 'bg-accent/10' : ''
                      }`}
                    >
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                          BADGE_COLOR[r.kind] || 'bg-base-800 text-slate-300'
                        }`}
                      >
                        {r.badge}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-slate-100 truncate">
                          {r.title}
                        </span>
                        <span className="block text-xs text-slate-500 truncate">
                          {r.sub}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              ))}

            <div className="flex items-center justify-between gap-2 border-t border-base-800 px-4 py-2 text-[11px] text-slate-500">
              <span>{t('gsearch_hint')}</span>
              {conLai > 0 && (
                <span>
                  +{conLai} {t('gsearch_more')}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
