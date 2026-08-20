// Chuyển đổi mol ↔ khối lượng ↔ thể tích khí ↔ nồng độ, và bài toán pha loãng.
// Toàn bộ là công thức phổ thông, không xấp xỉ.

/** Thể tích mol chất khí ở điều kiện tiêu chuẩn (0°C, 1 atm), đơn vị L/mol. */
export const VM_STP = 22.4;

/** Số Avogadro. */
export const AVOGADRO = 6.022e23;

export type KnownQuantity = 'mass' | 'moles' | 'gasVolume';

export interface ConversionInput {
  /** Khối lượng mol (g/mol) — lấy từ công thức chất. */
  M: number;
  /** Đại lượng người dùng đã biết. */
  known: KnownQuantity;
  /** Giá trị của đại lượng đó: gam, mol, hoặc lít khí ở đktc. */
  value: number;
  /** Thể tích dung dịch (lít) — có thì tính thêm nồng độ mol. */
  solutionVolume?: number | null;
}

export interface ConversionResult {
  moles: number;
  mass: number;
  gasVolume: number;
  particles: number;
  /** Nồng độ mol (mol/L); null nếu không nhập thể tích dung dịch. */
  concentration: number | null;
}

/** Từ một đại lượng đã biết, suy ra tất cả các đại lượng còn lại. */
export function convert(input: ConversionInput): ConversionResult {
  const { M, known, value, solutionVolume } = input;
  if (!(M > 0)) throw new Error('Khối lượng mol phải lớn hơn 0');

  let moles: number;
  if (known === 'moles') moles = value;
  else if (known === 'mass') moles = value / M;
  else moles = value / VM_STP;

  const V = solutionVolume ?? null;
  return {
    moles,
    mass: moles * M,
    gasVolume: moles * VM_STP,
    particles: moles * AVOGADRO,
    concentration: V !== null && V > 0 ? moles / V : null,
  };
}

export type DilutionField = 'c1' | 'v1' | 'c2' | 'v2';

export interface DilutionResult {
  /** Ô được tính ra. */
  field: DilutionField;
  value: number;
}

/**
 * Bài toán pha loãng C₁V₁ = C₂V₂.
 * Truyền 3 giá trị, để null đúng một ô — hàm trả về ô còn thiếu.
 */
export function dilution(
  c1: number | null,
  v1: number | null,
  c2: number | null,
  v2: number | null,
): DilutionResult {
  const missing = [c1, v1, c2, v2].filter((x) => x === null).length;
  if (missing !== 1) throw new Error('Cần để trống đúng một ô');

  if (c1 === null) {
    if (!v1) throw new Error('V₁ phải khác 0');
    return { field: 'c1', value: (c2! * v2!) / v1 };
  }
  if (v1 === null) {
    if (!c1) throw new Error('C₁ phải khác 0');
    return { field: 'v1', value: (c2! * v2!) / c1 };
  }
  if (c2 === null) {
    if (!v2) throw new Error('V₂ phải khác 0');
    return { field: 'c2', value: (c1 * v1) / v2 };
  }
  if (!c2) throw new Error('C₂ phải khác 0');
  return { field: 'v2', value: (c1 * v1) / c2 };
}
