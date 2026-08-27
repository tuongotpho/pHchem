import { useState } from 'react';
import FormulaText, { EquationText } from '../components/FormulaText';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { sinhDe, TEN_LOAI, type CauHoi, type LoaiCau } from '../lib/quiz';

const CAC_LOAI = Object.keys(TEN_LOAI) as LoaiCau[];
const SO_CAU = [5, 10, 20];

/**
 * Vẽ dòng phụ của câu hỏi cho đúng kiểu.
 *
 * VÌ SAO PHẢI CÓ: trước đây trang này in thẳng chuỗi ra, nên công thức hiện
 * thô — "H2 + O2 → H2O" thay vì "H₂ + O₂ → H₂O". Bốn trang khác trong app đã
 * hạ chỉ số từ lâu, riêng Luyện tập thì không, nhìn rất lệch.
 *
 * Kiểu do chính câu hỏi khai (xem lib/quiz.ts), không đoán theo loại câu —
 * dòng phụ "Fe · Z = 26" mà hạ chỉ số thì thành "Z = ₂₆".
 */
function DongPhu({ c, className }: { c: CauHoi; className?: string }) {
  if (!c.phu) return null;
  if (c.kieuPhu === 'phuongTrinh')
    return <EquationText eq={c.phu} className={className} />;
  if (c.kieuPhu === 'congThuc')
    return <FormulaText value={c.phu} className={className} />;
  return <span className={className}>{c.phu}</span>;
}

export default function Quiz() {
  const { lang } = useLang();
  const vi = lang === 'vi';

  const [chonLoai, setChonLoai] = useState<LoaiCau[]>([]);
  const [soCau, setSoCau] = useState(10);
  const [de, setDe] = useState<CauHoi[] | null>(null);
  const [hat, setHat] = useState(0);
  const [viTri, setViTri] = useState(0);
  const [daChon, setDaChon] = useState<number | null>(null);
  const [traLoi, setTraLoi] = useState<boolean[]>([]);
  // Bộ sinh đề có thể trả ít câu hơn số xin, thậm chí không câu nào — dạng
  // bài chọn quá hẹp, hoặc dữ liệu nguồn đổi. Vào thẳng màn làm bài với đề
  // rỗng thì màn kết quả chia cho 0 và hiện "0/0 · Đúng NaN%".
  const [khongRaDuocDe, setKhongRaDuocDe] = useState(false);

  const batDau = () => {
    const h = Math.floor(Math.random() * 1e9);
    const bo = sinhDe(h, soCau, lang, chonLoai);
    if (!bo.length) {
      setKhongRaDuocDe(true);
      return;
    }
    setKhongRaDuocDe(false);
    setHat(h);
    setDe(bo);
    setViTri(0);
    setDaChon(null);
    setTraLoi([]);
  };

  const doiLoai = (l: LoaiCau) => {
    setKhongRaDuocDe(false); // đổi lựa chọn thì lời nhắc cũ hết nghĩa
    setChonLoai((cu) => (cu.includes(l) ? cu.filter((x) => x !== l) : [...cu, l]));
  };

  // ---------- Màn chọn ----------
  if (!de) {
    return (
      <>
        <PageHeader title={vi ? 'Luyện tập' : 'Practice'} />
        <div className="p-4 md:p-6 max-w-2xl space-y-4">
          <section className="card p-4">
            <h2 className="font-semibold text-slate-100 mb-1">
              {vi ? 'Đề sinh từ chính dữ liệu của app' : 'Questions built from the app data'}
            </h2>
            <p className="text-sm text-slate-400">
              {vi
                ? 'Mỗi lần bấm là một bộ câu khác, không bao giờ cạn. Vì đề lấy từ dữ liệu đã qua bộ kiểm tự động nên đáp án không thể sai.'
                : 'Every round is a fresh set. Questions come from data that passes the automated checks, so the answers cannot be wrong.'}
            </p>
          </section>

          <section className="card p-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              {vi ? 'Chọn dạng bài — để trống là lấy tất cả' : 'Pick topics — none means all'}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {CAC_LOAI.map((l) => (
                <button
                  key={l}
                  onClick={() => doiLoai(l)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                    chonLoai.includes(l)
                      ? 'bg-accent/15 border-accent/40 text-accent'
                      : 'border-base-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {vi ? TEN_LOAI[l].vi : TEN_LOAI[l].en}
                </button>
              ))}
            </div>

            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-2">
              {vi ? 'Số câu' : 'How many'}
            </h3>
            <div className="flex gap-1.5">
              {SO_CAU.map((n) => (
                <button
                  key={n}
                  onClick={() => setSoCau(n)}
                  className={`text-xs px-4 py-1.5 rounded-lg border transition ${
                    soCau === n
                      ? 'bg-accent/15 border-accent/40 text-accent'
                      : 'border-base-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <button onClick={batDau} className="btn-accent w-full mt-4 py-2.5">
              {vi ? 'Bắt đầu' : 'Start'}
            </button>

            {khongRaDuocDe && (
              <p className="text-xs text-rose-700 dark:text-rose-300 mt-2">
                {vi
                  ? 'Chưa ra được câu nào với dạng bài đang chọn. Thử chọn thêm dạng khác.'
                  : 'No questions could be built from the selected topics. Try adding more.'}
              </p>
            )}
          </section>
        </div>
      </>
    );
  }

  // ---------- Màn kết quả ----------
  if (viTri >= de.length) {
    const dung = traLoi.filter(Boolean).length;
    const tiLe = Math.round((dung / de.length) * 100);
    return (
      <>
        <PageHeader title={vi ? 'Luyện tập' : 'Practice'} />
        <div className="p-4 md:p-6 max-w-2xl space-y-4">
          <section className="card p-6 text-center">
            <div className="text-5xl font-bold font-mono text-accent">
              {dung}/{de.length}
            </div>
            <div className="text-sm text-slate-400 mt-1">
              {vi ? `Đúng ${tiLe}%` : `${tiLe}% correct`}
            </div>
            <div className="text-[11px] text-slate-600 mt-3 font-mono">
              {vi ? 'Mã đề' : 'Set code'} {hat}
            </div>
          </section>

          {/* Chỉ liệt kê câu sai — đó mới là chỗ cần xem lại */}
          {dung < de.length && (
            <section className="card p-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {vi ? `Câu làm sai (${de.length - dung})` : `Missed (${de.length - dung})`}
              </h3>
              <ul className="space-y-3">
                {de.map((c, i) =>
                  traLoi[i] ? null : (
                    <li key={i} className="text-xs">
                      <div className="text-slate-300">{c.de}</div>
                      {c.phu && (
                        <div className="font-mono text-slate-400">
                          <DongPhu c={c} />
                        </div>
                      )}
                      <div className="text-emerald-600 dark:text-emerald-300 mt-0.5">
                        {vi ? 'Đáp án: ' : 'Answer: '}
                        {c.luaChon[c.dapAn]}
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </section>
          )}

          <div className="flex gap-2">
            <button onClick={batDau} className="btn-accent flex-1 py-2.5">
              {vi ? 'Làm bộ khác' : 'Another set'}
            </button>
            <button onClick={() => setDe(null)} className="btn-ghost flex-1 py-2.5">
              {vi ? 'Đổi dạng bài' : 'Change topics'}
            </button>
          </div>
        </div>
      </>
    );
  }

  // ---------- Màn làm bài ----------
  const c = de[viTri];
  const daTraLoi = daChon !== null;

  const chonDapAn = (i: number) => {
    if (daTraLoi) return;
    setDaChon(i);
    setTraLoi((cu) => {
      const m = [...cu];
      m[viTri] = i === c.dapAn;
      return m;
    });
  };

  return (
    <>
      <PageHeader
        title={vi ? 'Luyện tập' : 'Practice'}
        subtitle={`${viTri + 1}/${de.length} · ${vi ? TEN_LOAI[c.loai].vi : TEN_LOAI[c.loai].en}`}
      />
      <div className="p-4 md:p-6 max-w-2xl space-y-4">
        {/* Thanh tiến độ */}
        <div className="h-1 rounded-full bg-base-800 overflow-hidden">
          <div
            className="h-full bg-accent transition-all"
            style={{ width: `${(viTri / de.length) * 100}%` }}
          />
        </div>

        <section className="card p-4">
          <div className="text-sm text-slate-200">{c.de}</div>
          {c.phu && (
            <div className="font-mono text-lg text-accent mt-2 break-words">
              <DongPhu c={c} />
            </div>
          )}
        </section>

        <div className="space-y-2">
          {c.luaChon.map((x, i) => {
            const laDung = i === c.dapAn;
            const laChonCuaToi = i === daChon;
            let cls = 'border-base-700 hover:border-accent/40';
            if (daTraLoi && laDung) cls = 'border-emerald-500/60 bg-emerald-500/10';
            else if (daTraLoi && laChonCuaToi) cls = 'border-rose-500/60 bg-rose-500/10';
            else if (daTraLoi) cls = 'border-base-800 opacity-60';
            return (
              <button
                key={i}
                onClick={() => chonDapAn(i)}
                disabled={daTraLoi}
                className={`w-full text-left border rounded-xl px-3.5 py-2.5 text-sm transition ${cls}`}
              >
                <span className="font-mono text-slate-500 mr-2">
                  {String.fromCharCode(65 + i)}.
                </span>
                <span className="text-slate-200">{x}</span>
                {daTraLoi && laDung && <span className="float-right">✓</span>}
                {daTraLoi && laChonCuaToi && !laDung && <span className="float-right">✕</span>}
              </button>
            );
          })}
        </div>

        {daTraLoi && (
          <section className="card p-4">
            <div
              className={`text-sm font-semibold ${
                traLoi[viTri]
                  ? 'text-emerald-600 dark:text-emerald-300'
                  : 'text-rose-600 dark:text-rose-300'
              }`}
            >
              {traLoi[viTri] ? (vi ? 'Đúng rồi' : 'Correct') : vi ? 'Chưa đúng' : 'Not quite'}
            </div>
            <p className="text-xs text-slate-400 mt-1">{c.giaiThich}</p>
            {c.hoc && (
              <Link to={c.hoc} className="text-xs text-accent hover:underline mt-2 inline-block">
                {vi ? 'Mở phần liên quan để học thêm →' : 'Open the related entry →'}
              </Link>
            )}
            <button
              onClick={() => {
                setViTri(viTri + 1);
                setDaChon(null);
              }}
              className="btn-accent w-full mt-3 py-2.5"
            >
              {viTri + 1 < de.length
                ? vi
                  ? 'Câu tiếp'
                  : 'Next'
                : vi
                  ? 'Xem kết quả'
                  : 'See result'}
            </button>
          </section>
        )}

        <button onClick={() => setDe(null)} className="btn-ghost w-full text-xs">
          {vi ? 'Thoát, chọn dạng bài khác' : 'Quit and change topics'}
        </button>
      </div>
    </>
  );
}
