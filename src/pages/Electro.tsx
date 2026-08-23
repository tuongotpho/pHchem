import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import {
  DAY_DIEN_HOA,
  VI_TRI_HIDRO,
  coDayDuoc,
  tanTrongAxitLoang,
} from '../data/electro';
import { ELEMENTS } from '../data/elements';

const soHieu = (sym: string | null) => ELEMENTS.find((e) => e.sym === sym)?.n;

export default function Electro() {
  const { lang } = useLang();
  const vi = lang === 'vi';
  const kimLoai = DAY_DIEN_HOA.filter((c) => c.sym !== null);
  const [A, setA] = useState('Fe');
  const [B, setB] = useState('Cu');

  const kq = coDayDuoc(A, B);

  return (
    <>
      <PageHeader
        title={vi ? 'Dãy điện hóa' : 'Electrochemical series'}
        subtitle={`${DAY_DIEN_HOA.length} ${vi ? 'cặp oxi hóa - khử' : 'redox couples'}`}
      />
      <div className="p-4 md:p-6 space-y-4">
        {/* ---------- Công cụ tra ---------- */}
        <section className="card p-4">
          <h2 className="font-semibold text-slate-100 mb-1">
            {vi ? 'Kim loại này có đẩy được kim loại kia không?' : 'Does one metal displace another?'}
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            {vi
              ? 'Chọn kim loại nhúng vào dung dịch muối của kim loại còn lại.'
              : 'Pick a metal to dip into a salt solution of the other.'}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <select
              value={A}
              onChange={(e) => setA(e.target.value)}
              className="bg-base-850 border border-base-700 rounded-xl px-3 py-2 outline-none focus:border-accent"
            >
              {kimLoai.map((c) => (
                <option key={c.kimLoai} value={c.kimLoai}>
                  {c.kimLoai} — {vi ? c.vi : c.en}
                </option>
              ))}
            </select>
            <span className="text-slate-500">
              {vi ? 'nhúng vào dung dịch muối của' : 'into a salt solution of'}
            </span>
            <select
              value={B}
              onChange={(e) => setB(e.target.value)}
              className="bg-base-850 border border-base-700 rounded-xl px-3 py-2 outline-none focus:border-accent"
            >
              {kimLoai.map((c) => (
                <option key={c.kimLoai} value={c.kimLoai}>
                  {c.kimLoai} — {vi ? c.vi : c.en}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`mt-3 rounded-xl border p-3 ${
              kq.xayRa
                ? 'border-emerald-500/40 bg-emerald-500/[0.07]'
                : 'border-base-700 bg-base-850'
            }`}
          >
            <div
              className={`text-sm font-semibold ${
                kq.xayRa ? 'text-emerald-600 dark:text-emerald-300' : 'text-slate-400'
              }`}
            >
              {kq.xayRa
                ? vi
                  ? '✓ Có phản ứng'
                  : '✓ Reaction happens'
                : vi
                  ? '✕ Không phản ứng'
                  : '✕ No reaction'}
            </div>
            {kq.ptIon && (
              <div className="font-mono text-base text-slate-100 mt-1.5 break-words">
                {kq.ptIon}
              </div>
            )}
            <p className="text-xs text-slate-400 mt-1.5">
              {vi ? kq.giaiThichVi : kq.giaiThichEn}
            </p>
          </div>
        </section>

        {/* ---------- Bảng dãy ---------- */}
        <section className="card p-4">
          <h2 className="font-semibold text-slate-100 mb-1">
            {vi ? 'Toàn bộ dãy' : 'The full series'}
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            {vi
              ? 'Xếp theo thế điện cực chuẩn tăng dần. Kim loại đứng TRƯỚC đẩy được ion kim loại đứng SAU ra khỏi dung dịch muối.'
              : 'Ordered by standard electrode potential. A metal displaces the ions of any metal below it.'}
          </p>

          <div className="space-y-0.5">
            {DAY_DIEN_HOA.map((c, i) => {
              const laHidro = c.sym === null;
              const n = soHieu(c.sym);
              const noiDung = (
                <>
                  <span className="font-mono text-xs text-slate-500 w-14 shrink-0">
                    {c.E > 0 ? '+' : ''}
                    {c.E.toFixed(2)} V
                  </span>
                  <span className="font-mono font-semibold text-slate-100 w-24 shrink-0">
                    {c.ion}/{c.kimLoai}
                  </span>
                  <span className="text-xs text-slate-400 min-w-0 truncate">
                    {vi ? c.vi : c.en}
                  </span>
                  {i < VI_TRI_HIDRO && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 shrink-0">
                      {vi ? 'tan trong axit loãng' : 'dissolves in dilute acid'}
                    </span>
                  )}
                </>
              );
              return laHidro ? (
                <div
                  key={c.ion}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-dashed border-accent/50 bg-accent/[0.07]"
                >
                  {noiDung}
                </div>
              ) : (
                <Link
                  key={c.ion + c.kimLoai}
                  to={n ? `/table/${n}` : '#'}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-base-850 transition-colors"
                >
                  {noiDung}
                </Link>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-600 mt-3">
            {vi
              ? 'Vạch đứt là mốc hiđro. Kim loại nằm trên vạch này tan được trong axit loãng và giải phóng khí H2; nằm dưới thì không.'
              : 'The dashed row is the hydrogen reference. Metals above it dissolve in dilute acid releasing H2; those below do not.'}
          </p>
        </section>

        {/* ---------- Vài ví dụ quen thuộc ---------- */}
        <section className="card p-4">
          <h2 className="font-semibold text-slate-100 mb-2">
            {vi ? 'Vài trường hợp hay gặp' : 'Familiar cases'}
          </h2>
          <ul className="space-y-2 text-xs text-slate-400">
            {[
              ['Fe', 'Cu', vi ? 'Đinh sắt nhúng vào dung dịch CuSO4 phủ một lớp đồng đỏ' : 'An iron nail in CuSO4 becomes coated with red copper'],
              ['Cu', 'Ag', vi ? 'Dây đồng nhúng vào dung dịch AgNO3 mọc tinh thể bạc sáng' : 'Copper wire in AgNO3 grows bright silver crystals'],
              ['Zn', 'Cu', vi ? 'Cặp kẽm và đồng là nguyên lý của pin điện hóa đầu tiên' : 'Zinc and copper form the first electrochemical cell'],
              ['Cu', 'Fe', vi ? 'Chiều ngược lại không xảy ra — đồng đứng sau sắt' : 'The reverse does not happen; copper sits after iron'],
            ].map(([a, b, mo]) => {
              const r = coDayDuoc(a, b);
              return (
                <li key={a + b} className="flex gap-2">
                  <span className="shrink-0">{r.xayRa ? '✓' : '✕'}</span>
                  <span>
                    <button
                      onClick={() => {
                        setA(a);
                        setB(b);
                      }}
                      className="font-mono text-accent hover:underline"
                    >
                      {a} + {b}
                      {vi ? ' (muối)' : ' salt'}
                    </button>
                    {' — '}
                    {mo}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <p className="text-[11px] text-slate-600 px-1">
          {vi
            ? `Kim loại tan trong axit loãng: ${kimLoai.filter((c) => tanTrongAxitLoang(c.kimLoai)).length}/${kimLoai.length} kim loại trong dãy.`
            : `Metals that dissolve in dilute acid: ${kimLoai.filter((c) => tanTrongAxitLoang(c.kimLoai)).length} of ${kimLoai.length}.`}
        </p>
      </div>
    </>
  );
}
