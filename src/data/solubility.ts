// Bảng tính tan của muối/bazơ trong nước (điều kiện thường).
// Mã trạng thái:
//   T  = tan tốt (soluble)
//   I  = không tan / kết tủa (insoluble)
//   IT = ít tan (slightly soluble)
//   -  = không tồn tại / bị phân hủy hoặc bay hơi trong nước
// Dữ liệu theo bảng tính tan phổ thông (SGK Hóa học VN / IUPAC).

export type Solub = 'T' | 'I' | 'IT' | '-';

export interface Ion {
  formula: string; // hiển thị, vd "SO₄²⁻"
  ascii: string; // để tìm kiếm
}

// Cation (hàng)
export const CATIONS: Ion[] = [
  { formula: 'H⁺', ascii: 'H' },
  { formula: 'Na⁺', ascii: 'Na' },
  { formula: 'K⁺', ascii: 'K' },
  { formula: 'NH₄⁺', ascii: 'NH4' },
  { formula: 'Ag⁺', ascii: 'Ag' },
  { formula: 'Mg²⁺', ascii: 'Mg' },
  { formula: 'Ca²⁺', ascii: 'Ca' },
  { formula: 'Ba²⁺', ascii: 'Ba' },
  { formula: 'Zn²⁺', ascii: 'Zn' },
  { formula: 'Cu²⁺', ascii: 'Cu' },
  { formula: 'Fe²⁺', ascii: 'Fe2' },
  { formula: 'Fe³⁺', ascii: 'Fe3' },
  { formula: 'Al³⁺', ascii: 'Al' },
  { formula: 'Pb²⁺', ascii: 'Pb' },
];

// Anion (cột)
export const ANIONS: Ion[] = [
  { formula: 'OH⁻', ascii: 'OH' },
  { formula: 'Cl⁻', ascii: 'Cl' },
  { formula: 'NO₃⁻', ascii: 'NO3' },
  { formula: 'SO₄²⁻', ascii: 'SO4' },
  { formula: 'CO₃²⁻', ascii: 'CO3' },
  { formula: 'PO₄³⁻', ascii: 'PO4' },
  { formula: 'S²⁻', ascii: 'S' },
  { formula: 'Br⁻', ascii: 'Br' },
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
