// Ô tìm kiếm toàn app — nằm trên đầu mọi trang nhánh.
//
// Thuật ngữ: kiểu này gọi là "universal search" (hay global search). Phần bấm
// Ctrl+K để bật ô nổi giữa màn hình gọi là "command palette".
//
// Dùng chung bộ tìm kiếm ở lib/search.ts với trang chủ, nên kết quả y hệt và
// cũng trỏ thẳng tới đúng mục (xem lib/search.ts).

import { useState, useMemo, useRef, useEffect, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { IconSearch } from './icons';
import { searchAll } from '../lib/search';

// Số kết quả hiện trong khung thả xuống. Nhiều hơn thì rối và phải cuộn nhiều.
const HIEN_TOI_DA = 8;

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
  const listId = useId();

  const [q, setQ] = useState('');
  const [mo, setMo] = useState(false); // khung kết quả đang mở?
  const [chon, setChon] = useState(0); // dòng đang được chọn bằng bàn phím

  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const tatCa = useMemo(() => searchAll(q, lang), [q, lang]);
  const hien = tatCa.slice(0, HIEN_TOI_DA);
  // Chốt chặn: danh sách ngắn lại (đổi ngôn ngữ chẳng hạn) mà con trỏ còn trỏ
  // ra ngoài thì kéo về dòng đầu.
  const chonHienTai = chon < hien.length ? chon : 0;
  const conLai = tatCa.length - hien.length;
  const dangTim = q.trim().length > 0;

  // Đổi trang thì ô tìm kiếm tự dọn sạch — Layout gắn `key` theo địa chỉ nên
  // thành phần này dựng lại từ đầu mỗi lần chuyển trang. Làm vậy gọn hơn là
  // viết thêm một hiệu ứng canh địa chỉ rồi xóa tay.

  // Ctrl+K (Windows) hoặc ⌘K (Mac) để nhảy vào ô tìm kiếm từ bất cứ đâu.
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

  // Bấm ra ngoài thì đóng khung kết quả.
  useEffect(() => {
    if (!mo) return;
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setMo(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [mo]);

  const diToi = (to: string) => {
    setQ('');
    setMo(false);
    inputRef.current?.blur();
    navigate(to);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (q) setQ('');
      else inputRef.current?.blur();
      setMo(false);
      return;
    }
    if (!hien.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setMo(true);
      setChon((i) => (i + 1) % hien.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setMo(true);
      setChon((i) => (i - 1 + hien.length) % hien.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const r = hien[chonHienTai];
      if (r) diToi(r.to);
    }
  };

  const dangHien = mo && dangTim;

  return (
    <div ref={boxRef} className="relative w-full max-w-lg">
      <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setChon(0); // gõ thêm chữ là danh sách khác hẳn, đưa con trỏ về đầu
          setMo(true);
        }}
        onFocus={() => setMo(true)}
        onKeyDown={onKeyDown}
        placeholder={t('gsearch_placeholder')}
        aria-label={t('gsearch_open')}
        aria-expanded={dangHien}
        aria-controls={listId}
        role="combobox"
        className="w-full bg-base-850 border border-base-700 rounded-xl pl-9 pr-16 py-2 text-sm outline-none focus:border-accent"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />

      {/* Gợi ý phím tắt; giấu đi khi đang gõ để không che chữ */}
      {!dangTim && (
        <kbd className="hidden md:block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 border border-base-700 rounded px-1.5 py-0.5 pointer-events-none">
          Ctrl K
        </kbd>
      )}
      {dangTim && (
        <button
          onClick={() => {
            setQ('');
            setChon(0);
            inputRef.current?.focus();
          }}
          aria-label={lang === 'vi' ? 'Xóa ô tìm kiếm' : 'Clear search'}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
        >
          ✕
        </button>
      )}

      {dangHien && (
        <div
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1.5 w-full rounded-xl border border-base-700 bg-base-900 shadow-2xl overflow-hidden"
        >
          {hien.length === 0 ? (
            <div className="px-3.5 py-5 text-center text-sm text-slate-500">
              {t('gsearch_empty')}
            </div>
          ) : (
            <>
              <div className="max-h-[60vh] overflow-y-auto py-1">
                {hien.map((r, i) => (
                  <button
                    key={r.to + i}
                    role="option"
                    aria-selected={i === chonHienTai}
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
              <div className="flex items-center justify-between gap-2 border-t border-base-800 px-3 py-1.5 text-[11px] text-slate-500">
                <span>{t('gsearch_hint')}</span>
                {conLai > 0 && (
                  <span>
                    +{conLai} {t('gsearch_more')}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
