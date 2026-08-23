import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { TERMS, type Term } from '../data/dictionary';
import { Link } from 'react-router-dom';
import { keyOf } from '../data/formulas';
import { noiDungChoThuatNgu, coNoiDungHoc } from '../lib/classIndex';

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
  // Thuật ngữ đang mở để học: bấm vào một định nghĩa là bày ra luôn cả loạt
  // chất và nguyên tố thuộc nhóm đó, khỏi phải tự đi tra từng cái.
  const [mo, setMo] = useState<Term | null>(null);
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
          placeholder={t('filter_placeholder')}
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
            const hocDuoc = coNoiDungHoc(term);
            const n = hocDuoc ? noiDungChoThuatNgu(term) : null;
            return (
            <div
              key={term.en}
              ref={daChon ? targetRef : undefined}
              onClick={hocDuoc ? () => setMo(term) : undefined}
              className={`card p-4 ${daChon ? 'border-accent ring-2 ring-accent/40' : ''} ${
                hocDuoc ? 'cursor-pointer hover:border-accent/40 transition-colors' : ''
              }`}
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
              {n && (
                <div className="mt-2 text-[11px] text-accent">
                  {lang === 'vi' ? 'Xem ' : 'See '}
                  {[
                    n.chat.length && `${n.chat.length} ${lang === 'vi' ? 'chất' : 'compounds'}`,
                    n.nguyenTo.length &&
                      `${n.nguyenTo.length} ${lang === 'vi' ? 'nguyên tố' : 'elements'}`,
                    n.thucTien.length &&
                      `${n.thucTien.length} ${lang === 'vi' ? 'mẩu thực tiễn' : 'facts'}`,
                  ]
                    .filter(Boolean)
                    .join(' · ')}{' '}
                  →
                </div>
              )}
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

      {/* Mở một định nghĩa ra là thấy luôn cả nhóm để học: chất nào thuộc
          nhóm này, nguyên tố nào, và những mẩu thực tiễn đi kèm. */}
      {mo && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setMo(null)}
        >
          <div
            className="card p-5 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMo(null)}
              aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-200 text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-slate-100 pr-6">
              {lang === 'vi' ? mo.vi : mo.en}
            </h2>
            <div className="text-xs text-slate-500">{lang === 'vi' ? mo.en : mo.vi}</div>
            <p className="text-sm text-slate-300 mt-2">
              {lang === 'vi' ? mo.def_vi : mo.def_en}
            </p>

            {(() => {
              const n = noiDungChoThuatNgu(mo);
              return (
                <>
                  {n.nguyenTo.length > 0 && (
                    <section className="mt-4">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        {lang === 'vi'
                          ? `Nguyên tố thuộc nhóm này (${n.nguyenTo.length})`
                          : `Elements in this group (${n.nguyenTo.length})`}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {n.nguyenTo.map((e) => (
                          <Link
                            key={e.n}
                            to={`/table/${e.n}`}
                            className="text-xs px-2 py-1 rounded-lg bg-base-800 text-slate-300 hover:bg-accent/15 hover:text-accent transition"
                          >
                            <span className="font-mono font-semibold">{e.sym}</span>{' '}
                            {lang === 'vi' ? e.vi : e.en}
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}

                  {n.chat.length > 0 && (
                    <section className="mt-4">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        {lang === 'vi'
                          ? `Chất thuộc nhóm này (${n.chat.length})`
                          : `Compounds in this class (${n.chat.length})`}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {n.chat.map((f) => (
                          <Link
                            key={keyOf(f) + f.en}
                            to={`/formulas?item=${encodeURIComponent(keyOf(f))}`}
                            className="text-xs px-2 py-1 rounded-lg bg-base-800 text-slate-300 hover:bg-accent/15 hover:text-accent transition"
                          >
                            <span className="font-mono font-semibold">{f.formula}</span>{' '}
                            {lang === 'vi' ? f.vi : f.en}
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}

                  {n.thucTien.length > 0 && (
                    <section className="mt-4">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        {lang === 'vi'
                          ? `Thực tiễn liên quan (${n.thucTien.length})`
                          : `Related facts (${n.thucTien.length})`}
                      </h3>
                      <ul className="space-y-1.5">
                        {n.thucTien.map((f, i) => (
                          <li key={i} className="flex gap-2 text-xs text-slate-400">
                            <span className="shrink-0">💡</span>
                            <span>{lang === 'vi' ? f.vi : f.en}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}
