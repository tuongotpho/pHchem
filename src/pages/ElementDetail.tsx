import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { byNumber, CATEGORY_META, type Element } from '../data/elements';
import { DETAILS, PHASE_META, formatDensity } from '../data/elements.details';
import { factsForElement } from '../data/facts';

function block(el: Element): string {
  // Khối s/p/d/f suy theo vị trí trong bảng (chuẩn hơn là đọc ký tự cuối
  // của cấu hình, vì 4s viết sau 3d theo quy ước).
  if (el.cat === 'lanthanide' || el.cat === 'actinide') return 'f';
  if (el.sym === 'He') return 's';
  if (el.group <= 2) return 's';
  if (el.group >= 13) return 'p';
  return 'd';
}

/** Ô số liệu: nhãn nhỏ ở trên, giá trị ở dưới — không để hở khoảng giữa. */
type Tile = { label: string; value: string | null; span?: 2 | 'full' };

export default function ElementDetail() {
  const { n } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [xemHet, setXemHet] = useState(false);
  const el = byNumber(Number(n));

  if (!el) {
    return (
      <>
        <PageHeader title={t('nav_table')} />
        <div className="p-6 text-slate-400">Không tìm thấy nguyên tố.</div>
      </>
    );
  }

  const meta = CATEGORY_META[el.cat];
  const d = DETAILS[el.n];
  const phase = PHASE_META[d.state];
  const facts = factsForElement(el.n);
  const factsHien = xemHet ? facts : facts.slice(0, 6);
  const prev = byNumber(el.n - 1);
  const next = byNumber(el.n + 1);

  const unknown = lang === 'vi' ? 'Chưa xác định' : 'Not determined';
  const temp = (v: number | null) => (v === null ? null : `${v} °C`);

  const basic: Tile[] = [
    { label: lang === 'vi' ? 'Số hiệu' : 'Number', value: String(el.n) },
    { label: lang === 'vi' ? 'Khối lượng' : 'Mass', value: `${el.mass} u` },
    { label: lang === 'vi' ? 'Nhóm' : 'Group', value: el.group === 0 ? (lang === 'vi' ? 'Khối f' : 'f-block') : String(el.group) },
    { label: lang === 'vi' ? 'Chu kỳ' : 'Period', value: String(el.period) },
    { label: lang === 'vi' ? 'Khối' : 'Block', value: block(el) },
    { label: lang === 'vi' ? 'Trạng thái 25°C' : 'State at 25°C', value: `${phase.icon} ${lang === 'vi' ? phase.vi : phase.en}` },
    { label: lang === 'vi' ? 'Cấu hình electron' : 'Electron configuration', value: el.config, span: 'full' },
  ];

  const physical: Tile[] = [
    { label: lang === 'vi' ? 'Nóng chảy' : 'Melting point', value: temp(d.melt) },
    { label: lang === 'vi' ? 'Sôi' : 'Boiling point', value: temp(d.boil) },
    { label: lang === 'vi' ? 'Khối lượng riêng' : 'Density', value: formatDensity(d.density, d.state) },
    { label: lang === 'vi' ? 'Độ âm điện' : 'Electronegativity', value: d.en === null ? null : `${d.en}` },
  ];

  // Năm phát hiện: null = chưa rõ, 0 = biết từ thời cổ đại
  let namPhatHien: string | null;
  if (d.disc === null) namPhatHien = null;
  else if (d.disc === 0) namPhatHien = lang === 'vi' ? 'Thời cổ đại' : 'Antiquity';
  else namPhatHien = String(d.disc);

  const history: Tile[] = [
    {
      label: lang === 'vi' ? 'Năm phát hiện' : 'Discovered',
      value: namPhatHien,
    },
    {
      label: lang === 'vi' ? 'Ứng dụng chính' : 'Main uses',
      value: lang === 'vi' ? d.use_vi : d.use_en,
      span: 'full',
    },
  ];

  const TileBox = ({ tile }: { tile: Tile }) => (
    <div
      className={`card px-3 py-2.5 ${
        tile.span === 'full' ? 'col-span-full' : tile.span === 2 ? 'col-span-2' : ''
      }`}
    >
      <div className="text-[11px] text-slate-500 leading-tight">{tile.label}</div>
      <div
        className={`mt-1 text-sm break-words ${
          tile.value === null
            ? 'text-slate-600 italic'
            : 'font-semibold text-slate-100 font-mono'
        }`}
      >
        {tile.value ?? unknown}
      </div>
    </div>
  );

  const Group = ({ title, tiles }: { title: string; tiles: Tile[] }) => (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {tiles.map((tile) => (
          <TileBox key={tile.label} tile={tile} />
        ))}
      </div>
    </section>
  );

  return (
    <>
      <PageHeader
        title={lang === 'vi' ? el.vi : el.en}
        subtitle={el.en !== el.vi ? el.en : undefined}
      />

      <div className="p-4 md:p-6">
        <button onClick={() => navigate('/table')} className="btn-ghost text-xs mb-4">
          ← {t('nav_table')}
        </button>

        {/* Hai cột trên màn rộng: thẻ nguyên tố bên trái (dính khi cuộn), số liệu bên phải */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] items-start">
          {/* Thẻ nguyên tố */}
          <div className="lg:sticky lg:top-20">
            <div className={`card border ${meta.color} p-5`}>
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm text-slate-400 font-mono">{el.n}</span>
                <span className={`text-xs px-2 py-0.5 rounded-lg ${meta.color} ${meta.text}`}>
                  {lang === 'vi' ? meta.vi : meta.en}
                </span>
              </div>
              <div className={`text-7xl font-bold text-center my-3 ${meta.text}`}>
                {el.sym}
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-100">
                  {lang === 'vi' ? el.vi : el.en}
                </div>
                <div className="text-xs text-slate-500">
                  {lang === 'vi' ? el.en : el.vi}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                <div className="rounded-lg bg-base-900 py-2">
                  <div className="text-[10px] text-slate-500">
                    {lang === 'vi' ? 'Khối lượng' : 'Mass'}
                  </div>
                  <div className="text-sm font-mono text-slate-200">{el.mass}</div>
                </div>
                <div className="rounded-lg bg-base-900 py-2">
                  <div className="text-[10px] text-slate-500">
                    {lang === 'vi' ? 'Trạng thái' : 'State'}
                  </div>
                  <div className="text-sm text-slate-200">
                    {phase.icon} {lang === 'vi' ? phase.vi : phase.en}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Số liệu + sự thật */}
          <div className="space-y-5 min-w-0">
            <Group title={lang === 'vi' ? 'Thông tin cơ bản' : 'Basic data'} tiles={basic} />
            <Group
              title={lang === 'vi' ? 'Tính chất vật lý' : 'Physical properties'}
              tiles={physical}
            />
            <Group
              title={lang === 'vi' ? 'Lịch sử & ứng dụng' : 'History & uses'}
              tiles={history}
            />

            {/* Sự thật gắn với nguyên tố này — giúp nhớ bài dễ hơn */}
            {facts.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  {lang === 'vi'
                    ? `Sự thật về ${el.vi} (${facts.length})`
                    : `Facts about ${el.en} (${facts.length})`}
                </h2>
                <div className="grid gap-2 sm:grid-cols-2 items-start">
                  {factsHien.map((f, i) => (
                    <div key={i} className="card p-3 flex gap-2.5">
                      <div className="text-base shrink-0 leading-none mt-0.5">💡</div>
                      <div className="min-w-0">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-base-800 text-accent">
                          {f.tag}
                        </span>
                        <p className="text-sm text-slate-300 mt-1.5">
                          {lang === 'vi' ? f.vi : f.en}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {facts.length > 6 && (
                  <button
                    onClick={() => setXemHet((v) => !v)}
                    className="btn-ghost text-xs mt-2 w-full"
                  >
                    {xemHet
                      ? lang === 'vi'
                        ? 'Thu gọn'
                        : 'Show less'
                      : lang === 'vi'
                        ? `Xem thêm ${facts.length - 6} sự thật`
                        : `Show ${facts.length - 6} more`}
                  </button>
                )}
              </section>
            )}
          </div>
        </div>

        {/* Điều hướng trước/sau */}
        <div className="flex justify-between gap-3 mt-6">
          <button
            disabled={!prev}
            onClick={() => prev && navigate(`/table/${prev.n}`)}
            className="btn-ghost text-sm disabled:opacity-30 flex-1"
          >
            {prev ? `← ${prev.sym} ${lang === 'vi' ? prev.vi : prev.en}` : ''}
          </button>
          <button
            disabled={!next}
            onClick={() => next && navigate(`/table/${next.n}`)}
            className="btn-ghost text-sm disabled:opacity-30 flex-1"
          >
            {next ? `${next.sym} ${lang === 'vi' ? next.vi : next.en} →` : ''}
          </button>
        </div>
      </div>
    </>
  );
}
