// Bảng tính tan của muối/bazơ trong nước (điều kiện thường).
// Mã trạng thái:
//   T  = tan tốt (soluble)
//   I  = không tan / kết tủa (insoluble)
//   IT = ít tan (slightly soluble)
//   -  = không tồn tại / bị phân hủy hoặc bay hơi trong nước
// Dữ liệu theo bảng tính tan phổ thông (SGK Hóa học VN / IUPAC).

export type Solub = 'T' | 'I' | 'IT' | '-';

export interface Ion {
  formula: string; // hiển thị kèm điện tích, vd "SO₄²⁻"
  ascii: string; // khóa tìm kiếm (phân biệt Fe2/Fe3)
  sym: string; // ký hiệu trần để ghép công thức, vd "SO4", "Fe"
  charge: number; // độ lớn điện tích
  poly: boolean; // nhóm nhiều nguyên tử → cần ngoặc khi có chỉ số
}

// Cation (hàng)
export const CATIONS: Ion[] = [
  { formula: 'H⁺', ascii: 'H', sym: 'H', charge: 1, poly: false },
  { formula: 'Na⁺', ascii: 'Na', sym: 'Na', charge: 1, poly: false },
  { formula: 'K⁺', ascii: 'K', sym: 'K', charge: 1, poly: false },
  { formula: 'NH₄⁺', ascii: 'NH4', sym: 'NH4', charge: 1, poly: true },
  { formula: 'Ag⁺', ascii: 'Ag', sym: 'Ag', charge: 1, poly: false },
  { formula: 'Mg²⁺', ascii: 'Mg', sym: 'Mg', charge: 2, poly: false },
  { formula: 'Ca²⁺', ascii: 'Ca', sym: 'Ca', charge: 2, poly: false },
  { formula: 'Ba²⁺', ascii: 'Ba', sym: 'Ba', charge: 2, poly: false },
  { formula: 'Zn²⁺', ascii: 'Zn', sym: 'Zn', charge: 2, poly: false },
  { formula: 'Cu²⁺', ascii: 'Cu', sym: 'Cu', charge: 2, poly: false },
  { formula: 'Fe²⁺', ascii: 'Fe2', sym: 'Fe', charge: 2, poly: false },
  { formula: 'Fe³⁺', ascii: 'Fe3', sym: 'Fe', charge: 3, poly: false },
  { formula: 'Al³⁺', ascii: 'Al', sym: 'Al', charge: 3, poly: false },
  { formula: 'Pb²⁺', ascii: 'Pb', sym: 'Pb', charge: 2, poly: false },
];

// Anion (cột)
export const ANIONS: Ion[] = [
  { formula: 'OH⁻', ascii: 'OH', sym: 'OH', charge: 1, poly: true },
  { formula: 'Cl⁻', ascii: 'Cl', sym: 'Cl', charge: 1, poly: false },
  { formula: 'NO₃⁻', ascii: 'NO3', sym: 'NO3', charge: 1, poly: true },
  { formula: 'SO₄²⁻', ascii: 'SO4', sym: 'SO4', charge: 2, poly: true },
  { formula: 'CO₃²⁻', ascii: 'CO3', sym: 'CO3', charge: 2, poly: true },
  { formula: 'PO₄³⁻', ascii: 'PO4', sym: 'PO4', charge: 3, poly: true },
  { formula: 'S²⁻', ascii: 'S', sym: 'S', charge: 2, poly: false },
  { formula: 'Br⁻', ascii: 'Br', sym: 'Br', charge: 1, poly: false },
];

// Ma trận[cation][anion]. Thứ tự khớp với 2 mảng trên.
// Cột:      OH   Cl   NO3  SO4  CO3  PO4  S    Br
export const MATRIX: Solub[][] = [
  /* H⁺   */ ['-', 'T', 'T', 'T', '-', 'T', 'T', 'T'],
  /* Na⁺  */ ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  /* K⁺   */ ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  /* NH₄⁺ */ ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  /* Ag⁺  */ ['-', 'I', 'T', 'IT', 'I', 'I', 'I', 'I'],
  /* Mg²⁺ */ ['I', 'T', 'T', 'T', 'I', 'I', '-', 'T'],
  /* Ca²⁺ */ ['IT', 'T', 'T', 'IT', 'I', 'I', '-', 'T'],
  /* Ba²⁺ */ ['T', 'T', 'T', 'I', 'I', 'I', '-', 'T'],
  /* Zn²⁺ */ ['I', 'T', 'T', 'T', 'I', 'I', 'I', 'T'],
  /* Cu²⁺ */ ['I', 'T', 'T', 'T', 'I', 'I', 'I', 'T'],
  /* Fe²⁺ */ ['I', 'T', 'T', 'T', 'I', 'I', 'I', 'T'],
  /* Fe³⁺ */ ['I', 'T', 'T', 'T', '-', 'I', '-', 'T'],
  /* Al³⁺ */ ['I', 'T', 'T', 'T', '-', 'I', '-', 'T'],
  /* Pb²⁺ */ ['I', 'IT', 'T', 'I', 'I', 'I', 'I', 'IT'],
];

export const SOLUB_META: Record<
  Solub,
  { vi: string; en: string; color: string; text: string }
> = {
  T: { vi: 'Tan', en: 'Soluble', color: 'bg-emerald-500/25', text: 'text-emerald-200' },
  I: { vi: 'Không tan (kết tủa)', en: 'Insoluble', color: 'bg-rose-500/30', text: 'text-rose-200' },
  IT: { vi: 'Ít tan', en: 'Slightly soluble', color: 'bg-amber-500/25', text: 'text-amber-200' },
  '-': { vi: 'Không tồn tại / phân hủy', en: 'Does not exist / decomposes', color: 'bg-base-800', text: 'text-slate-500' },
};

// ---- Ghép công thức hợp chất từ cation + anion ----
// Dùng quy tắc hóa trị: nhân chéo điện tích rồi rút gọn.
// vd Ca²⁺ + OH⁻ → Ca(OH)2 ; Al³⁺ + SO₄²⁻ → Al2(SO4)3 ; Fe³⁺ + PO₄³⁻ → FePO4
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

function part(ion: Ion, count: number): string {
  if (count === 1) return ion.sym;
  return ion.poly ? `(${ion.sym})${count}` : `${ion.sym}${count}`;
}

/** Công thức dạng ASCII, vd "Al2(SO4)3". Khớp cách viết trong thư viện công thức. */
export function buildFormula(cation: Ion, anion: Ion): string {
  // Nước là ca đặc biệt: H⁺ + OH⁻ → H2O chứ không phải "HOH"
  if (cation.sym === 'H' && anion.sym === 'OH') return 'H2O';
  const g = gcd(cation.charge, anion.charge);
  const nCat = anion.charge / g;
  const nAn = cation.charge / g;
  return part(cation, nCat) + part(anion, nAn);
}
