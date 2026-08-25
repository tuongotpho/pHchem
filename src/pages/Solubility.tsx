import { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import FormulaText from '../components/FormulaText';
import { useLang } from '../i18n/LangContext';
import { hasStructure } from '../generated/structures';
import { useKhungNoi } from '../hooks/useKhungNoi';
import { useHinhCauTao } from '../hooks/useHinhCauTao';
import { FORMULAS, keyOf } from '../data/formulas';
import {
  CATIONS,
  ANIONS,
  MATRIX,
  SOLUB_META,
  buildFormula,
  type Solub,
  mauKetTua,
  chuTrenNen,
} from '../data/solubility';

export default function Solubility() {
  const { t, lang } = useLang();
  const [sel, setSel] = useState<{ c: number; a: number } | null>(null);

  // Tra nhanh chất trong thư viện công thức theo công thức ASCII
  const libByFormula = useMemo(() => {
    const m = new Map<string, (typeof FORMULAS)[number]>();
    for (const f of FORMULAS) if (!m.has(f.formula)) m.set(f.formula, f);
    return m;
  }, []);

  const cation = sel ? CATIONS[sel.c] : null;
  const anion = sel ? ANIONS[sel.a] : null;
  const cell: Solub | null = sel ? MATRIX[sel.c][sel.a] : null;
  const formula = cation && anion ? buildFormula(cation, anion) : '';
  const inLib = formula ? libByFormula.get(formula) : undefined;
  const structKey = inLib ? keyOf(inLib) : formula;
  // Màu chỉ có nghĩa khi chất thật sự tách ra khỏi dung dịch. Ô "ít tan" cũng
  // cho kết tủa nên vẫn hiện màu; ô "tan" hay "không tồn tại" thì không.
  const laKetTua = cell === 'I' || cell === 'IT';
  const mau = laKetTua ? mauKetTua(formula) : null;
  const showStruct = !!formula && hasStructure(structKey);

  // Hình tải riêng một file, chỉ khi ô đang mở có hình — xem hooks/useHinhCauTao.ts.
  const { svg: hinh, dangTai: dangTaiHinh } = useHinhCauTao(
    showStruct ? structKey : null,
  );
  // H+ + OH- không phải muối mà là phản ứng trung hòa tạo nước
  const isWater = formula === 'H2O';

  useKhungNoi(sel !== null, () => setSel(null));


  return (
    <>
      <PageHeader title={t('nav_solubility')} />
      <div className="p-3 md:p-5">
        {/* Chú giải */}
        <div className="flex flex-wrap gap-2 mb-3 text-xs">
          {(['T', 'I', 'IT', '-'] as Solub[]).map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <span className={`inline-block w-4 h-4 rounded ${SOLUB_META[s].color}`} />
              <span className="text-slate-400">
                {s === '-' ? '—' : s}: {lang === 'vi' ? SOLUB_META[s].vi : SOLUB_META[s].en}
              </span>
            </div>
          ))}
        </div>

        {/* Bảng */}
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-[2px]">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-base-950" />
                {ANIONS.map((an) => (
                  <th
                    key={an.ascii}
                    className="text-[11px] md:text-xs font-semibold text-slate-300 px-1 py-1 min-w-[38px]"
                  >
                    {an.formula}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATIONS.map((cat, ci) => (
                <tr key={cat.ascii}>
                  <th className="sticky left-0 z-10 bg-base-950 text-[11px] md:text-xs font-semibold text-slate-300 pr-2 text-right">
                    {cat.formula}
                  </th>
                  {ANIONS.map((_, ai) => {
                    const v = MATRIX[ci][ai];
                    const meta = SOLUB_META[v];
                    return (
                      <td key={ai} className="p-0">
                        <button
                          onClick={() => setSel({ c: ci, a: ai })}
                          title={buildFormula(CATIONS[ci], ANIONS[ai])}
                          className={`w-9 h-9 md:w-11 md:h-11 rounded-md grid place-items-center text-xs md:text-sm font-bold transition hover:ring-2 hover:ring-accent hover:scale-105 ${meta.color} ${meta.text}`}
                        >
                          {v === '-' ? '—' : v}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          {lang === 'vi'
            ? 'Bấm vào một ô để xem công thức chất tạo thành.'
            : 'Tap a cell to see the compound formed.'}
        </p>
      </div>

      {/* Modal chi tiết ô đang chọn */}
      {sel && cation && anion && cell && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setSel(null)}
        >
          <div
            className="card p-5 max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSel(null)}
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-200 text-lg"
            >
              ✕
            </button>

            {/* Phép cộng ion */}
            <div className="text-xs text-slate-500 mb-1">
              {lang === 'vi' ? 'Kết hợp ion' : 'Ion combination'}
            </div>
            <div className="font-mono text-base text-slate-300">
              {cation.formula} + {anion.formula}
            </div>

            {/* Công thức tạo thành */}
            <div className="mt-3 rounded-xl bg-base-900 border border-base-800 py-4 text-center">
              <FormulaText
                value={formula}
                className="text-3xl font-bold text-accent font-mono"
              />
              {inLib && (
                <div className="text-sm text-slate-200 mt-1.5">
                  {lang === 'vi' ? inLib.vi : inLib.en}
                </div>
              )}
            </div>

            {/* Trạng thái tan, kèm CHẤM MÀU kết tủa ngay bên cạnh — màu là thứ
                người ta thật sự nhìn thấy trong ống nghiệm, nên để sát nhãn
                "không tan" chứ không tách thành một khối riêng. */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
            <div
              className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                isWater
                  ? 'bg-sky-500/25 text-sky-700 dark:text-sky-200'
                  : `${SOLUB_META[cell].color} ${SOLUB_META[cell].text}`
              }`}
            >
              {isWater
                ? lang === 'vi'
                  ? 'Phản ứng trung hòa'
                  : 'Neutralization'
                : lang === 'vi'
                  ? SOLUB_META[cell].vi
                  : SOLUB_META[cell].en}
            </div>
            {laKetTua &&
              (mau ? (
                // Ô MÀU BAO QUANH CHỮ, không phải chấm nhỏ bên cạnh: nhìn phát
                // thấy ngay màu kết tủa, và nằm cùng hàng với nhãn "Không tan"
                // nên đọc liền một mạch "không tan — màu nâu đỏ".
                // Màu chữ TÍNH theo độ sáng nền, xem chuTrenNen(): nền đen mà
                // chữ đen thì mất hút. Viền mờ để ô trắng không lẫn vào nền.
                <>
                  <span
                    className="inline-block px-3 py-1 rounded-lg text-sm font-medium border border-slate-400/40"
                    style={{
                      backgroundColor: mau.css,
                      color: chuTrenNen(mau.css),
                    }}
                  >
                    {lang === 'vi' ? mau.vi : mau.en}
                  </span>
                  {/* Nói rõ màu nào là ĐỌC ĐƯỢC ở đâu đó, màu nào là mình
                      LUẬN RA từ tính chất ion. Người học có quyền biết mức tin
                      cậy khác nhau, nhất là khi đem đi dạy. */}
                  {mau.suyLuan && (
                    <span className="text-xs text-slate-500 italic">
                      {lang === 'vi' ? '(suy luận)' : '(inferred)'}
                    </span>
                  )}
                </>
              ) : (
                // KHÔNG ĐƯỢC IM LẶNG. Mọi kết tủa đều có màu — chất rắn không
                // thể "không màu". Bỏ trống mà không nói gì thì người dùng hiểu
                // thành "chất này không màu", tức app nói sai. Nói thẳng là
                // chưa tra.
                <span className="text-xs text-slate-500 italic">
                  {lang === 'vi' ? 'màu: chưa tra' : 'colour: not yet checked'}
                </span>
              ))}
            </div>

            {cell === 'I' && (
              <p className="text-xs text-slate-400 mt-2">
                {lang === 'vi'
                  ? '→ Trộn hai dung dịch chứa các ion này sẽ tạo kết tủa.'
                  : '→ Mixing solutions of these ions gives a precipitate.'}
              </p>
            )}

            {isWater && (
              <p className="text-xs text-slate-400 mt-2">
                {lang === 'vi'
                  ? 'Axit tác dụng bazơ tạo nước: H⁺ + OH⁻ → H₂O.'
                  : 'Acid meets base to form water: H⁺ + OH⁻ → H₂O.'}
              </p>
            )}
            {cell === '-' && !isWater && (
              <p className="text-xs text-slate-400 mt-2">
                {lang === 'vi'
                  ? '→ Chất này không tồn tại trong dung dịch hoặc bị phân hủy ngay.'
                  : '→ This compound does not exist in solution or decomposes.'}
              </p>
            )}

            {/* Mô tả lấy từ thư viện công thức nếu có */}
            {inLib && (
              <p className="text-xs text-slate-400 mt-2">
                {lang === 'vi' ? inLib.note_vi : inLib.note_en}
              </p>
            )}

            {/* Hình cấu tạo nếu có */}
            {showStruct && (
              <div className="mt-3 rounded-xl bg-base-900 border border-base-800 p-2">
                {hinh ? (
                  <div
                    className="h-40 text-slate-100"
                    dangerouslySetInnerHTML={{ __html: hinh }}
                  />
                ) : (
                  <div className="h-40 grid place-items-center text-center text-xs text-slate-600 px-3">
                    {dangTaiHinh
                      ? lang === 'vi'
                        ? 'Đang tải hình…'
                        : 'Loading…'
                      : lang === 'vi'
                        ? 'Chưa tải được hình.'
                        : 'Could not load the image.'}
                  </div>
                )}
                <div className="text-center text-[11px] text-slate-500">
                  {lang === 'vi' ? 'Công thức cấu tạo' : 'Structural formula'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
