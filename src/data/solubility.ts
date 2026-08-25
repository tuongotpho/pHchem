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
  /** Gốc axit viết TRƯỚC kim loại, vd CH3COONa chứ không phải NaCH3COO.
   *  Chỉ dùng cho gốc hữu cơ, nơi lối viết quen thuộc đảo ngược. */
  anionFirst?: true;
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
  { formula: 'I⁻', ascii: 'I', sym: 'I', charge: 1, poly: false },
  { formula: 'CH₃COO⁻', ascii: 'CH3COO', sym: 'CH3COO', charge: 1, poly: true, anionFirst: true },
  { formula: 'SO₃²⁻', ascii: 'SO3', sym: 'SO3', charge: 2, poly: true },
  { formula: 'SiO₃²⁻', ascii: 'SiO3', sym: 'SiO3', charge: 2, poly: true },
];

// Ma trận[cation][anion]. Thứ tự khớp với 2 mảng trên.
//
// Vài ô ghi "-" vì hai ion KHÔNG cùng tồn tại chứ không phải vì không tan:
//   Cu²⁺ và Fe³⁺ gặp I⁻ thì oxi hóa luôn iotua thành iot, không ra muối.
//   Fe³⁺ và Al³⁺ gặp SO₃²⁻ hay CO₃²⁻ thì thủy phân hoàn toàn.
//
// Cột:      OH   Cl   NO3  SO4  CO3  PO4  S    Br   I    CH3COO SO3  SiO3
export const MATRIX: Solub[][] = [
  /* H⁺   */ ['-', 'T', 'T', 'T', '-', 'T', 'T', 'T', 'T', 'T', 'T', 'I'],
  /* Na⁺  */ ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  /* K⁺   */ ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  /* NH₄⁺ */ ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', '-'],
  /* Ag⁺  */ ['-', 'I', 'T', 'IT', 'I', 'I', 'I', 'I', 'I', 'IT', 'I', 'I'],
  /* Mg²⁺ */ ['I', 'T', 'T', 'T', 'I', 'I', '-', 'T', 'T', 'T', 'IT', 'I'],
  /* Ca²⁺ */ ['IT', 'T', 'T', 'IT', 'I', 'I', '-', 'T', 'T', 'T', 'I', 'I'],
  /* Ba²⁺ */ ['T', 'T', 'T', 'I', 'I', 'I', '-', 'T', 'T', 'T', 'I', 'I'],
  /* Zn²⁺ */ ['I', 'T', 'T', 'T', 'I', 'I', 'I', 'T', 'T', 'T', 'I', 'I'],
  /* Cu²⁺ */ ['I', 'T', 'T', 'T', 'I', 'I', 'I', 'T', '-', 'T', 'I', 'I'],
  /* Fe²⁺ */ ['I', 'T', 'T', 'T', 'I', 'I', 'I', 'T', 'T', 'T', 'I', 'I'],
  /* Fe³⁺ */ ['I', 'T', 'T', 'T', '-', 'I', '-', 'T', '-', 'T', '-', 'I'],
  /* Al³⁺ */ ['I', 'T', 'T', 'T', '-', 'I', '-', 'T', 'T', 'T', '-', 'I'],
  /* Pb²⁺ */ ['I', 'IT', 'T', 'I', 'I', 'I', 'I', 'IT', 'I', 'T', 'I', 'I'],
];

export const SOLUB_META: Record<
  Solub,
  { vi: string; en: string; color: string; text: string }
> = {
  T: { vi: 'Tan', en: 'Soluble', color: 'bg-emerald-500/25', text: 'text-emerald-700 dark:text-emerald-200' },
  I: { vi: 'Không tan (kết tủa)', en: 'Insoluble', color: 'bg-rose-500/30', text: 'text-rose-700 dark:text-rose-200' },
  IT: { vi: 'Ít tan', en: 'Slightly soluble', color: 'bg-amber-500/25', text: 'text-amber-700 dark:text-amber-200' },
  '-': { vi: 'Không tồn tại / phân hủy', en: 'Does not exist / decomposes', color: 'bg-base-800', text: 'text-slate-500' },
};

// ---- MÀU KẾT TỦA ----
//
// Bảng tính tan mới chỉ nói TAN hay KHÔNG. Nhưng trong phòng thí nghiệm, thứ
// người ta thật sự nhìn thấy là MÀU của kết tủa — đó mới là cái để nhận biết
// chất. Thêm màu vào đây là biến bảng tra thành công cụ nhận biết.
//
// CHỈ ĐIỀN NHỮNG CHẤT CHẮC CHẮN. Trong 61 ô kết tủa/ít tan của bảng, phần lớn
// silicat và sunfit của kim loại ít gặp thì các nguồn không thống nhất màu,
// mà cũng chẳng phải chất dùng để nhận biết. Chỗ nào chưa chắc thì BỎ TRỐNG —
// giao diện tự ẩn dòng màu đi, chứ không đoán bừa. Cùng nguyên tắc với dữ liệu
// nguyên tố: không đo được thì để trống.
//
// ĐỐI CHỨNG (tra ngày 25/08/2026): mười chất đánh dấu ✓ đã so với nguồn ngoài
// — Wikipedia "Qualitative inorganic analysis" và ô thông tin từng hợp chất.
// Số còn lại là kiến thức nhận biết chuẩn của SGK Hóa học phổ thông.

// CHỈ MÀU, KHÔNG KÈM CÂU CHỮ. Ban đầu tôi có thêm trường ghi chú kiểu "để
// ngoài ánh sáng thì hóa đen dần" — rồi mở khung ra thấy nó lặp nguyên ý với
// ghi chú sẵn có của thư viện công thức ("Kết tủa trắng, hóa đen ngoài ánh
// sáng."). Khung nói trùng hai lần đọc rất cẩu thả. Phần chữ để thư viện lo;
// ở đây chỉ đóng góp thứ thư viện không có: CHẤM MÀU nhìn thấy được.
export interface MauKetTua {
  vi: string;
  en: string;
  /** Mã màu để vẽ chấm mẫu. Dùng mã tuyệt đối chứ KHÔNG dùng biến giao diện:
   *  đây là màu THẬT của chất, không được đổi theo nền sáng/tối. */
  css: string;
}

const TRANG = '#eef2f6';
const DEN = '#1c1917';
const VANG = '#facc15';
const VANG_NHAT = '#fde68a';

export const MAU_KET_TUA: Record<string, MauKetTua> = {
  // --- Bạc: nhóm quan trọng nhất để nhận biết gốc halogenua ---
  AgCl: { vi: 'trắng', en: 'white', css: TRANG }, // ✓ "white solid"
  AgBr: { vi: 'vàng nhạt', en: 'pale yellow', css: VANG_NHAT }, // ✓ "pale yellow"
  AgI: { vi: 'vàng', en: 'yellow', css: VANG }, // ✓ "yellow"
  Ag3PO4: { vi: 'vàng', en: 'yellow', css: VANG }, // ✓ "yellow crystalline"
  Ag2S: { vi: 'đen', en: 'black', css: DEN },
  Ag2SO4: { vi: 'trắng', en: 'white', css: TRANG },

  // --- Hidroxit: bộ ba màu kinh điển của bài nhận biết ---
  'Cu(OH)2': { vi: 'xanh lam', en: 'blue', css: '#3b82f6' }, // ✓ "Blue solid"
  'Fe(OH)3': { vi: 'nâu đỏ', en: 'reddish-brown', css: '#a3541f' }, // ✓ "reddish-brown"
  'Fe(OH)2': { vi: 'trắng xanh', en: 'pale green', css: '#b9dfc4' }, // ✓ "green"
  'Al(OH)3': {
    vi: 'keo trắng',
    en: 'gelatinous white',
    css: TRANG, // ✓ "gelatinous white precipitate"
  },
  'Mg(OH)2': { vi: 'trắng', en: 'white', css: TRANG },
  'Zn(OH)2': { vi: 'trắng', en: 'white', css: TRANG },
  'Pb(OH)2': { vi: 'trắng', en: 'white', css: TRANG },

  // --- Sunfua: gần như đều đen, riêng kẽm thì trắng ---
  CuS: { vi: 'đen', en: 'black', css: DEN },
  FeS: { vi: 'đen', en: 'black', css: DEN },
  PbS: { vi: 'đen', en: 'black', css: DEN },
  ZnS: { vi: 'trắng', en: 'white', css: TRANG }, // ✓ "white precipitate"

  // --- Muối trắng hay gặp ---
  BaSO4: { vi: 'trắng', en: 'white', css: TRANG }, // ✓ "white precipitate"
  PbSO4: { vi: 'trắng', en: 'white', css: TRANG },
  CaSO4: { vi: 'trắng', en: 'white', css: TRANG },
  CaCO3: { vi: 'trắng', en: 'white', css: TRANG },
  BaCO3: { vi: 'trắng', en: 'white', css: TRANG },
  PbCl2: { vi: 'trắng', en: 'white', css: TRANG }, // ✓ "white precipitate"
  PbBr2: { vi: 'trắng', en: 'white', css: TRANG },
  'Ca3(PO4)2': { vi: 'trắng', en: 'white', css: TRANG },

  // --- Chất màu nổi bật khác ---
  PbI2: { vi: 'vàng', en: 'bright yellow', css: VANG }, // ✓ "bright yellow powder"
};

/** Màu kết tủa của một chất, hoặc null nếu chưa có căn cứ chắc chắn. */
export const mauKetTua = (congThuc: string): MauKetTua | null =>
  MAU_KET_TUA[congThuc] ?? null;

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
  // Gốc hữu cơ viết trước theo lối quen thuộc: CH3COONa, (CH3COO)2Ca
  if (anion.anionFirst) return part(anion, nAn) + part(cation, nCat);
  return part(cation, nCat) + part(anion, nAn);
}
