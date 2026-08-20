// Tính pH. Dùng nghiệm CHÍNH XÁC của phương trình cân bằng, không dùng xấp xỉ
// pH = -log(C) hay [H+] = √(Ka·C), nên vẫn đúng ở nồng độ rất loãng.

/** Tích số ion của nước ở 25°C. */
export const KW = 1e-14;

export type AcidBaseKind = 'strongAcid' | 'strongBase' | 'weakAcid' | 'weakBase';

/**
 * Axit mạnh phân li hoàn toàn. Cân bằng điện tích + tích số ion của nước cho:
 *   [H⁺]² − Ca·[H⁺] − Kw = 0  →  [H⁺] = (Ca + √(Ca² + 4Kw)) / 2
 * Nhờ số hạng Kw, công thức vẫn đúng khi Ca rất nhỏ (vd 10⁻⁸ M cho pH ≈ 6,98
 * chứ không phải 8 — lỗi kinh điển của cách tính pH = −log C).
 */
export const strongAcidH = (Ca: number): number =>
  (Ca + Math.sqrt(Ca * Ca + 4 * KW)) / 2;

/** Bazơ mạnh, đối xứng với axit mạnh. */
export const strongBaseOH = (Cb: number): number =>
  (Cb + Math.sqrt(Cb * Cb + 4 * KW)) / 2;

/**
 * Axit yếu — giải ĐẦY ĐỦ, có tính cả nước tự phân li.
 *
 * Cân bằng điện tích [H⁺] = [A⁻] + [OH⁻], cân bằng khối lượng Ca = [HA] + [A⁻]
 * và Ka = [H⁺][A⁻]/[HA] dẫn tới phương trình bậc ba:
 *   h³ + Ka·h² − (Ka·Ca + Kw)·h − Ka·Kw = 0
 * Giải bằng phương pháp chia đôi.
 *
 * Vì sao không dùng nghiệm bậc hai x = (−Ka + √(Ka² + 4·Ka·Ca))/2 quen thuộc:
 * công thức đó bỏ qua nước nên ở nồng độ rất loãng (vd 10⁻⁸ M) sẽ cho pH = 8,
 * tức là một dung dịch AXIT lại hóa ra có môi trường BAZƠ — vô lý.
 */
export function weakAcidH(Ca: number, Ka: number): number {
  const f = (h: number) => h * h * h + Ka * h * h - (Ka * Ca + KW) * h - Ka * KW;
  let lo = 1e-15;
  let hi = Ca + 1e-6;
  while (f(hi) < 0) hi *= 10;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) > 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

/** Bazơ yếu — đối xứng với axit yếu, cũng tính cả nước tự phân li. */
export function weakBaseOH(Cb: number, Kb: number): number {
  return weakAcidH(Cb, Kb); // cùng dạng phương trình, chỉ đổi vai [H⁺] thành [OH⁻]
}

export interface PhInput {
  kind: AcidBaseKind;
  /** Nồng độ chất tan (mol/L). */
  C: number;
  /** Số H⁺ (hoặc OH⁻) mà một phân tử nhường/nhận — dùng cho axit/bazơ mạnh đa nấc. */
  z?: number;
  /** Hằng số phân li — bắt buộc với axit/bazơ yếu. */
  k?: number;
}

export interface PhResult {
  h: number;
  oh: number;
  pH: number;
  pOH: number;
  /** Công thức đã dùng, để hiện cho học sinh thấy cách làm. */
  formula: string;
}

export function computePh(input: PhInput): PhResult {
  const { kind, C, z = 1, k } = input;
  if (!(C > 0)) throw new Error('Nồng độ phải lớn hơn 0');
  if ((kind === 'weakAcid' || kind === 'weakBase') && !(k && k > 0))
    throw new Error('Cần hằng số phân li Ka hoặc Kb');

  let h: number;
  let formula: string;

  if (kind === 'strongAcid') {
    h = strongAcidH(C * z);
    formula = '[H⁺] = (Ca + √(Ca² + 4Kw)) / 2';
  } else if (kind === 'strongBase') {
    const oh = strongBaseOH(C * z);
    h = KW / oh;
    formula = '[OH⁻] = (Cb + √(Cb² + 4Kw)) / 2';
  } else if (kind === 'weakAcid') {
    h = weakAcidH(C, k!);
    formula = 'h³ + Ka·h² − (Ka·Ca + Kw)·h − Ka·Kw = 0, với h = [H⁺]';
  } else {
    const oh = weakBaseOH(C, k!);
    h = KW / oh;
    formula = 'x³ + Kb·x² − (Kb·Cb + Kw)·x − Kb·Kw = 0, với x = [OH⁻]';
  }

  const oh = KW / h;
  return {
    h,
    oh,
    pH: -Math.log10(h),
    pOH: -Math.log10(oh),
    formula,
  };
}

export interface AcidBaseEntry {
  formula: string;
  vi: string;
  en: string;
  kind: AcidBaseKind;
  /** Số H⁺/OH⁻ với chất mạnh. */
  z?: number;
  /** Ka hoặc Kb với chất yếu. */
  k?: number;
  /** Ghi chú giới hạn của phép tính, hiện kèm kết quả. */
  note_vi?: string;
  note_en?: string;
}

/** Các axit/bazơ hay gặp ở phổ thông, kèm hằng số phân li chuẩn. */
export const ACIDS_BASES: AcidBaseEntry[] = [
  { formula: 'HCl', vi: 'Axit clohydric', en: 'Hydrochloric acid', kind: 'strongAcid', z: 1 },
  { formula: 'HBr', vi: 'Axit bromhydric', en: 'Hydrobromic acid', kind: 'strongAcid', z: 1 },
  { formula: 'HNO3', vi: 'Axit nitric', en: 'Nitric acid', kind: 'strongAcid', z: 1 },
  { formula: 'HClO4', vi: 'Axit pecloric', en: 'Perchloric acid', kind: 'strongAcid', z: 1 },
  {
    formula: 'H2SO4', vi: 'Axit sunfuric', en: 'Sulfuric acid', kind: 'strongAcid', z: 2,
    note_vi: 'Coi cả hai nấc đều mạnh — cách tính phổ thông. Thực tế nấc hai chỉ mạnh vừa (Ka₂ ≈ 1,2×10⁻²) nên pH thật hơi cao hơn.',
    note_en: 'Both protons treated as strong (school-level). The second is only moderately strong, so real pH is slightly higher.',
  },
  { formula: 'NaOH', vi: 'Natri hydroxit', en: 'Sodium hydroxide', kind: 'strongBase', z: 1 },
  { formula: 'KOH', vi: 'Kali hydroxit', en: 'Potassium hydroxide', kind: 'strongBase', z: 1 },
  { formula: 'Ba(OH)2', vi: 'Bari hydroxit', en: 'Barium hydroxide', kind: 'strongBase', z: 2 },
  {
    formula: 'Ca(OH)2', vi: 'Canxi hydroxit', en: 'Calcium hydroxide', kind: 'strongBase', z: 2,
    note_vi: 'Ít tan trong nước — nồng độ thực tế khó vượt khoảng 0,02 M.',
    note_en: 'Only slightly soluble — real concentration rarely exceeds about 0.02 M.',
  },
  { formula: 'CH3COOH', vi: 'Axit axetic (giấm)', en: 'Acetic acid', kind: 'weakAcid', k: 1.8e-5 },
  { formula: 'HCOOH', vi: 'Axit fomic', en: 'Formic acid', kind: 'weakAcid', k: 1.8e-4 },
  { formula: 'HF', vi: 'Axit flohydric', en: 'Hydrofluoric acid', kind: 'weakAcid', k: 6.8e-4 },
  { formula: 'HCN', vi: 'Axit xianhydric', en: 'Hydrocyanic acid', kind: 'weakAcid', k: 6.2e-10 },
  {
    formula: 'H2CO3', vi: 'Axit cacbonic', en: 'Carbonic acid', kind: 'weakAcid', k: 4.3e-7,
    note_vi: 'Chỉ tính nấc phân li thứ nhất (Ka₁).',
    note_en: 'Only the first dissociation step (Ka₁) is used.',
  },
  {
    formula: 'H3PO4', vi: 'Axit photphoric', en: 'Phosphoric acid', kind: 'weakAcid', k: 7.5e-3,
    note_vi: 'Chỉ tính nấc phân li thứ nhất (Ka₁).',
    note_en: 'Only the first dissociation step (Ka₁) is used.',
  },
  { formula: 'NH3', vi: 'Amoniac', en: 'Ammonia', kind: 'weakBase', k: 1.8e-5 },
  { formula: 'CH3NH2', vi: 'Metylamin', en: 'Methylamine', kind: 'weakBase', k: 4.4e-4 },
  { formula: 'C6H5NH2', vi: 'Anilin', en: 'Aniline', kind: 'weakBase', k: 4.3e-10 },
];

export const KIND_META: Record<AcidBaseKind, { vi: string; en: string }> = {
  strongAcid: { vi: 'Axit mạnh', en: 'Strong acid' },
  strongBase: { vi: 'Bazơ mạnh', en: 'Strong base' },
  weakAcid: { vi: 'Axit yếu', en: 'Weak acid' },
  weakBase: { vi: 'Bazơ yếu', en: 'Weak base' },
};
