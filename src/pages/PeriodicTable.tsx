import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import {
  ELEMENTS,
  CATEGORY_META,
  type Category,
  type Element,
} from '../data/elements';
import { DETAILS, PHASE_META } from '../data/elements.details';

const CATEGORIES = Object.keys(CATEGORY_META) as Category[];

export default function PeriodicTable() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [active, setActive] = useState<Category | null>(null);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const matches = (e: Element) =>
    !q ||
    e.sym.toLowerCase().includes(q) ||
    e.en.toLowerCase().includes(q) ||
    e.vi.toLowerCase().includes(q) ||
    String(e.n) === q;

  const isDim = (e: Element) =>
    (active !== null && e.cat !== active) || (q !== '' && !matches(e));

  // Chú thích khi rê chuột: tên, trạng thái, nhiệt độ nóng chảy
  const tooltip = (e: Element) => {
    const d = DETAILS[e.n];
    const ten = lang === 'vi' ? e.vi : e.en;
    const pha = lang === 'vi' ? PHASE_META[d.state].vi : PHASE_META[d.state].en;
    const nc =
      d.melt === null
        ? lang === 'vi'
          ? 'nóng chảy: chưa xác định'
          : 'melting: not determined'
        : lang === 'vi'
          ? `nóng chảy ${d.melt}°C`
          : `melts at ${d.melt}°C`;
    return `${ten} · ${pha} · ${nc}`;
  };

  return (
    <>
      <PageHeader title={t('nav_table')} subtitle="118" />

      <div className="p-3 md:p-5">
        {/* Tìm kiếm + chú giải */}
        <div className="mb-3 flex flex-col gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`${t('search_placeholder')} (H, Oxy, 26…)`}
            className="w-full max-w-sm bg-base-850 border border-base-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => {
              const meta = CATEGORY_META[c];
              const on = active === c;
              return (
                <button
                  key={c}
                  onClick={() => setActive(on ? null : c)}
                  className={`text-[11px] px-2 py-1 rounded-lg border transition ${
                    on
                      ? `${meta.color} ${meta.text} ring-1 ring-white/20`
                      : 'border-base-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'vi' ? meta.vi : meta.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lưới bảng tuần hoàn — cuộn ngang trên màn nhỏ */}
        <div className="overflow-x-auto pb-2">
          <div
            className="grid gap-[3px] min-w-[760px]"
            style={{
              gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(7, auto) 10px repeat(2, auto)',
            }}
          >
            {ELEMENTS.map((e) => {
              const meta = CATEGORY_META[e.cat];
              // hàng khối f nằm ở grid-row 9 và 10 (chừa 1 hàng đệm ở row 8)
              const gridRow = e.ypos >= 9 ? e.ypos - 1 + 1 : e.ypos;
              return (
                <button
                  key={e.n}
                  onClick={() => navigate(`/table/${e.n}`)}
                  style={{ gridColumn: e.xpos, gridRow }}
                  className={`aspect-square rounded-[5px] border p-0.5 flex flex-col items-center justify-center leading-none transition ${
                    meta.color
                  } ${meta.text} ${
                    isDim(e) ? 'opacity-20' : 'hover:scale-[1.12] hover:z-10 hover:ring-1 hover:ring-white/40'
                  }`}
                  title={tooltip(e)}
                >
                  <span className="text-[7px] md:text-[8px] opacity-70">
                    {e.n}
                  </span>
                  <span className="font-bold text-[10px] md:text-sm">
                    {e.sym}
                  </span>
                  <span className="hidden md:block text-[6.5px] opacity-70 truncate max-w-full">
                    {lang === 'vi' ? e.vi : e.en}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          {lang === 'vi'
            ? 'Bấm vào một nguyên tố để xem chi tiết. Kéo ngang để xem hết bảng.'
            : 'Tap an element for details. Scroll horizontally to see the full table.'}
        </p>
      </div>
    </>
  );
}
