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
