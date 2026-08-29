// Hiển thị công thức hóa học: biến các chữ số thành chỉ số dưới (H2O → H₂O).
// Chỉ áp dụng cho công thức hợp chất, không dùng cho phương trình hóa lý.
//
// Hai luật đọc chữ số nằm ở lib/chiSoCongThuc.ts để chạy được phép kiểm.
import { tachChiSo, tachHeSo } from '../lib/chiSoCongThuc';

export default function FormulaText({
  value,
  subscript = true,
  className = '',
}: {
  value: string;
  subscript?: boolean;
  className?: string;
}) {
  if (!subscript) return <span className={className}>{value}</span>;

  return (
    <span className={className}>
      {tachChiSo(value).map((m, i) =>
        m.duoi ? <sub key={i}>{m.t}</sub> : <span key={i}>{m.t}</span>,
      )}
    </span>
  );
}

/**
 * Vẽ cả một PHƯƠNG TRÌNH: hệ số giữ cỡ thường, công thức hạ chỉ số dưới.
 *
 * Trước đây hàm này nằm kẹt trong Reactions.tsx, không xuất ra, nên trang
 * Luyện tập không dùng được và phải in phương trình thô — "H2 + O2" thay vì
 * "H₂ + O₂". Nay để chung một chỗ với FormulaText.
 *
 * Vì sao không hạ chỉ số cho cả chuỗi: hệ số đứng TRƯỚC chất ("2 H2O") là số
 * cỡ thường, hạ xuống thành "₂H₂O" là sai hẳn nghĩa.
 */
export function EquationText({
  eq,
  className = '',
}: {
  eq: string;
  className?: string;
}) {
  // tách theo dấu + và mũi tên nhưng giữ lại dấu phân cách
  const parts = eq.split(/(\s\+\s|→)/);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (p === '→')
          return (
            <span key={i} className="text-accent px-1">
              →
            </span>
          );
        if (/^\s\+\s$/.test(p)) return <span key={i}> + </span>;
        // KHOẢNG TRẮNG ĐẦU MẨU PHẢI ĐƯỢC TÍNH ĐẾN. Dấu "+" được tách kèm cả hai
        // dấu cách hai bên, nhưng mũi tên thì không — nên mẩu đứng ngay sau mũi
        // tên luôn dư một dấu cách ở đầu: "→", rồi " 3 CO2".
        //
        // Bỏ sót chỗ này thì mẩu đó không khớp luật hệ số, rơi xuống nhánh
        // dưới, và FormulaText hạ SẠCH chữ số — hệ số 3 của CO₂ tụt xuống thành
        // "₃ CO₂". Sai hóa học, mà lại chỉ sai đúng chất đầu tiên bên phải mũi
        // tên nên rất dễ nhìn lướt qua. Bắt được ngày 29/08/2026 trên trang Máy
        // tính, nhưng lỗi nằm ở đây nên trang Phản ứng cũng dính.
        const m = tachHeSo(p);
        return m ? (
          <span key={i}>
            <span className="text-slate-400">{m[0]}</span>
            <FormulaText value={m[1]} />
          </span>
        ) : (
          <FormulaText key={i} value={p} />
        );
      })}
    </span>
  );
}
