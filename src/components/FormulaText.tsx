// Hiển thị công thức hóa học: biến các chữ số thành chỉ số dưới (H2O → H₂O).
// Chỉ áp dụng cho công thức hợp chất, không dùng cho phương trình hóa lý.

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

  // tách thành đoạn chữ và đoạn số; số đứng sau chữ/ngoặc thì hạ xuống
  const parts = value.split(/(\d+)/);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (/^\d+$/.test(p) && i > 0) {
          return <sub key={i}>{p}</sub>;
        }
        return <span key={i}>{p}</span>;
      })}
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
