import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination';
import FormulaText from '../components/FormulaText';
import { useLang } from '../i18n/LangContext';
import { REACTIONS, TYPE_META, type Reaction, type ReactionType } from '../data/reactions';
import { speciesOf } from '../lib/reaction';
import { elementsOf } from '../lib/compoundIndex';
import { reactionsForElement } from '../lib/reactionIndex';
import { byNumber } from '../data/elements';

const PER_PAGE = 20;

const TYPES = Object.keys(TYPE_META) as ReactionType[];

/** Vẽ phương trình: hệ số giữ cỡ thường, công thức hạ chỉ số dưới. */
function EquationText({ eq, className = '' }: { eq: string; className?: string }) {
  // tách theo dấu + và mũi tên nhưng giữ lại dấu phân cách
  const parts = eq.split(/(\s\+\s|→)/);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (p === '→') return <span key={i} className="text-accent px-1">→</span>;
        if (/^\s\+\s$/.test(p)) return <span key={i}> + </span>;
        const m = p.match(/^(\d+\s+)(.+)$/);
        return m ? (
          <span key={i}>
            <span className="text-slate-400">{m[1]}</span>
            <FormulaText value={m[2]} />
          </span>
        ) : (
          <FormulaText key={i} value={p} />
        );
      })}
    </span>
  );
}

export default function Reactions() {
  const { t, lang } = useLang();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [loai, setLoai] = useState<ReactionType | 'all'>('all');
  const [page, setPage] = useState(1);
  const [sel, setSel] = useState<Reaction | null>(null);

  useEffect(() => {
    const tuDiaChi = params.get('q');
    if (tuDiaChi !== null) setQ(tuDiaChi);
  }, [params]);

  // Đóng modal bằng Esc
  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSel(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sel]);

  // Lọc theo nguyên tố khi đi từ trang nguyên tố sang (?el=26)
  const elParam = params.get('el');
  const nguonList = useMemo(() => {
    const n = elParam ? Number(elParam) : NaN;
    return Number.isFinite(n) ? reactionsForElement(n) : REACTIONS;
  }, [elParam]);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return nguonList.filter((r) => {
      if (loai !== 'all' && !r.type.includes(loai)) return false;
      if (!query) return true;
      return (
        r.eq.toLowerCase().includes(query) ||
        (r.phen_vi ?? '').toLowerCase().includes(query) ||
        (r.note_vi ?? '').toLowerCase().includes(query) ||
        (r.cond_vi ?? '').toLowerCase().includes(query)
      );
    });
  }, [q, loai, nguonList]);

  useEffect(() => setPage(1), [q, loai, nguonList]);

  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PER_PAGE;
  const paged = list.slice(start, start + PER_PAGE);

  // Đếm số phản ứng mỗi loại để hiện trên nút lọc
  const demTheoLoai = useMemo(() => {
    const m = new Map<ReactionType, number>();
    REACTIONS.forEach((r) => r.type.forEach((x) => m.set(x, (m.get(x) ?? 0) + 1)));
    return m;
  }, []);

  const chats = sel ? speciesOf(sel.eq) : null;
  const nguyenTo = sel
    ? [
        ...new Set(
          [...(chats?.reactants ?? []), ...(chats?.products ?? [])].flatMap((c) =>
            elementsOf(c),
          ),
        ),
      ].sort((a, b) => a - b)
    : [];

  return (
    <>
      <PageHeader
        title={t('nav_reactions')}
        subtitle={`${REACTIONS.length} ${t('items_count')}`}
      />
      <div className="p-4 md:p-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={
            lang === 'vi' ? 'Tìm chất, hiện tượng, điều kiện…' : 'Search substance, phenomenon…'
          }
          className="w-full max-w-md bg-base-850 border border-base-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent mb-3"
        />

        <div className="flex gap-1.5 mb-4 flex-wrap">
          <button
            onClick={() => setLoai('all')}
            className={`text-xs px-3 py-1.5 rounded-lg border transition ${
              loai === 'all'
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'border-base-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'vi' ? 'Tất cả' : 'All'}
          </button>
          {TYPES.map((x) => (
            <button
              key={x}
              onClick={() => setLoai(loai === x ? 'all' : x)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                loai === x
                  ? 'bg-accent/15 border-accent/40 text-accent'
                  : 'border-base-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'vi' ? TYPE_META[x].vi : TYPE_META[x].en}
              <span className="opacity-50 ml-1">{demTheoLoai.get(x) ?? 0}</span>
            </button>
          ))}
        </div>

        {elParam && byNumber(Number(elParam)) && (
          <div className="mb-3 flex items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded-lg bg-accent/15 text-accent">
              {lang === 'vi' ? 'Đang lọc theo nguyên tố: ' : 'Filtered by element: '}
              {byNumber(Number(elParam))!.sym}
            </span>
            <Link to="/reactions" className="text-slate-500 hover:text-slate-300">
              {lang === 'vi' ? 'bỏ lọc' : 'clear'}
            </Link>
          </div>
        )}

        <div className="text-xs text-slate-500 mb-2">
          {list.length > 0 ? `${start + 1}–${start + paged.length} / ${list.length}` : 0}{' '}
          {t('items_count')}
        </div>

        <div className="grid gap-2 lg:grid-cols-2">
          {paged.map((r) => (
            <button
              key={r.eq}
              onClick={() => setSel(r)}
              className="card p-3.5 text-left hover:border-accent/40 transition-colors"
            >
              <EquationText eq={r.eq} className="font-mono text-sm text-slate-100" />
              <div className="flex flex-wrap gap-1 mt-2">
                {r.type.map((x) => (
                  <span
                    key={x}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-base-800 text-accent"
                  >
                    {lang === 'vi' ? TYPE_META[x].vi : TYPE_META[x].en}
                  </span>
                ))}
              </div>
              {(lang === 'vi' ? r.phen_vi : r.phen_en) && (
                <p className="text-xs text-slate-400 mt-1.5">
                  {lang === 'vi' ? r.phen_vi : r.phen_en}
                </p>
              )}
            </button>
          ))}
        </div>

        <Pagination page={current} totalPages={totalPages} onChange={setPage} />

        {list.length === 0 && (
          <div className="text-center text-slate-500 py-10">
            {lang === 'vi' ? 'Không tìm thấy.' : 'No results.'}
          </div>
        )}
      </div>

      {/* Modal chi tiết phản ứng */}
      {sel && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setSel(null)}
        >
          <div
            className="card p-5 max-w-lg w-full relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSel(null)}
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-200 text-lg"
            >
              ✕
            </button>

            <div className="rounded-xl bg-base-900 border border-base-800 p-4 mb-3 pr-6">
              <EquationText
                eq={sel.eq}
                className="font-mono text-base md:text-lg text-slate-100"
              />
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {sel.type.map((x) => (
                <span
                  key={x}
                  className="text-[11px] px-2 py-0.5 rounded-lg bg-accent/15 text-accent"
                >
                  {lang === 'vi' ? TYPE_META[x].vi : TYPE_META[x].en}
                </span>
              ))}
            </div>

            <dl className="space-y-2.5">
              {(lang === 'vi' ? sel.cond_vi : sel.cond_en) && (
                <div>
                  <dt className="text-[11px] text-slate-500">
                    {lang === 'vi' ? 'Điều kiện' : 'Conditions'}
                  </dt>
                  <dd className="text-sm text-slate-200">
                    {lang === 'vi' ? sel.cond_vi : sel.cond_en}
                  </dd>
                </div>
              )}
              {(lang === 'vi' ? sel.phen_vi : sel.phen_en) && (
                <div>
                  <dt className="text-[11px] text-slate-500">
                    {lang === 'vi' ? 'Hiện tượng' : 'Observation'}
                  </dt>
                  <dd className="text-sm text-slate-200">
                    {lang === 'vi' ? sel.phen_vi : sel.phen_en}
                  </dd>
                </div>
              )}
              {sel.ionic && (
                <div>
                  <dt className="text-[11px] text-slate-500">
                    {lang === 'vi' ? 'Phương trình ion rút gọn' : 'Net ionic equation'}
                  </dt>
                  <dd className="text-sm font-mono text-slate-200">{sel.ionic}</dd>
                </div>
              )}
              {(lang === 'vi' ? sel.note_vi : sel.note_en) && (
                <div>
                  <dt className="text-[11px] text-slate-500">
                    {lang === 'vi' ? 'Ghi chú' : 'Note'}
                  </dt>
                  <dd className="text-sm text-slate-300">
                    {lang === 'vi' ? sel.note_vi : sel.note_en}
                  </dd>
                </div>
              )}
            </dl>

            {/* Chất tham gia / tạo thành, bấm sang thư viện công thức */}
            {chats && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[11px] text-slate-500 mb-1">
                    {lang === 'vi' ? 'Chất tham gia' : 'Reactants'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {chats.reactants.map((c) => (
                      <Link
                        key={c}
                        to={`/formulas?q=${encodeURIComponent(c)}`}
                        className="text-[11px] px-1.5 py-0.5 rounded bg-base-800 text-slate-300 hover:bg-accent/15 hover:text-accent transition font-mono"
                      >
                        <FormulaText value={c} />
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 mb-1">
                    {lang === 'vi' ? 'Sản phẩm' : 'Products'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {chats.products.map((c) => (
                      <Link
                        key={c}
                        to={`/formulas?q=${encodeURIComponent(c)}`}
                        className="text-[11px] px-1.5 py-0.5 rounded bg-base-800 text-slate-300 hover:bg-accent/15 hover:text-accent transition font-mono"
                      >
                        <FormulaText value={c} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Nguyên tố có mặt */}
            {nguyenTo.length > 0 && (
              <div className="mt-3">
                <div className="text-[11px] text-slate-500 mb-1">
                  {lang === 'vi' ? 'Nguyên tố có mặt' : 'Elements involved'}
                </div>
                <div className="flex flex-wrap gap-1">
                  {nguyenTo.map((n) => {
                    const e = byNumber(n);
                    if (!e) return null;
                    return (
                      <Link
                        key={n}
                        to={`/table/${n}`}
                        className="text-[11px] px-1.5 py-0.5 rounded bg-base-800 text-slate-400 hover:bg-accent/15 hover:text-accent transition"
                      >
                        {e.sym} {lang === 'vi' ? e.vi : e.en}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
