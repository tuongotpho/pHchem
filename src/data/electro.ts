// Dãy điện hóa kim loại — thế điện cực chuẩn ở 25°C, so với điện cực hiđro.
//
// VÌ SAO CẦN: dãy này quyết định kim loại nào đẩy được kim loại nào ra khỏi
// dung dịch muối, và kim loại nào tan được trong axit loãng. Trước đây app mới
// chỉ có MỘT DÒNG định nghĩa trong từ điển, không có số liệu nào để tra.
//
// Quy tắc đọc dãy, dạy dưới dạng "alpha":
//   Chất khử mạnh (kim loại đứng trước) + chất oxi hóa mạnh (ion đứng sau)
//   → chất khử yếu hơn + chất oxi hóa yếu hơn
// Nói gọn: kim loại đứng TRƯỚC đẩy được ion kim loại đứng SAU ra khỏi muối.
//
// Số liệu là thế điện cực chuẩn thông dụng trong sách phổ thông, đơn vị vôn.

export interface CapOxiHoaKhu {
  /** Dạng oxi hóa, vd 'Zn²⁺' */
  ion: string;
  /** Dạng khử, vd 'Zn' */
  kimLoai: string;
  /** Ký hiệu nguyên tố, để nối sang bảng tuần hoàn. null với cặp H⁺/H2. */
  sym: string | null;
  /** Thế điện cực chuẩn, vôn. */
  E: number;
  vi: string;
  en: string;
}

/** Xếp từ âm nhất (khử mạnh nhất) đến dương nhất — đúng thứ tự dãy điện hóa. */
export const DAY_DIEN_HOA: CapOxiHoaKhu[] = [
  { ion: 'Li⁺', kimLoai: 'Li', sym: 'Li', E: -3.04, vi: 'Liti', en: 'Lithium' },
  { ion: 'K⁺', kimLoai: 'K', sym: 'K', E: -2.93, vi: 'Kali', en: 'Potassium' },
  { ion: 'Ba²⁺', kimLoai: 'Ba', sym: 'Ba', E: -2.91, vi: 'Bari', en: 'Barium' },
  { ion: 'Ca²⁺', kimLoai: 'Ca', sym: 'Ca', E: -2.87, vi: 'Canxi', en: 'Calcium' },
  { ion: 'Na⁺', kimLoai: 'Na', sym: 'Na', E: -2.71, vi: 'Natri', en: 'Sodium' },
  { ion: 'Mg²⁺', kimLoai: 'Mg', sym: 'Mg', E: -2.37, vi: 'Magie', en: 'Magnesium' },
  { ion: 'Al³⁺', kimLoai: 'Al', sym: 'Al', E: -1.66, vi: 'Nhôm', en: 'Aluminium' },
  { ion: 'Mn²⁺', kimLoai: 'Mn', sym: 'Mn', E: -1.18, vi: 'Mangan', en: 'Manganese' },
  { ion: 'Zn²⁺', kimLoai: 'Zn', sym: 'Zn', E: -0.76, vi: 'Kẽm', en: 'Zinc' },
  { ion: 'Cr³⁺', kimLoai: 'Cr', sym: 'Cr', E: -0.74, vi: 'Crom', en: 'Chromium' },
  { ion: 'Fe²⁺', kimLoai: 'Fe', sym: 'Fe', E: -0.44, vi: 'Sắt(II)', en: 'Iron(II)' },
  { ion: 'Ni²⁺', kimLoai: 'Ni', sym: 'Ni', E: -0.26, vi: 'Niken', en: 'Nickel' },
  { ion: 'Sn²⁺', kimLoai: 'Sn', sym: 'Sn', E: -0.14, vi: 'Thiếc', en: 'Tin' },
  { ion: 'Pb²⁺', kimLoai: 'Pb', sym: 'Pb', E: -0.13, vi: 'Chì', en: 'Lead' },
  { ion: 'H⁺', kimLoai: 'H2', sym: null, E: 0, vi: 'Hiđro (mốc so sánh)', en: 'Hydrogen (reference)' },
  { ion: 'Cu²⁺', kimLoai: 'Cu', sym: 'Cu', E: 0.34, vi: 'Đồng', en: 'Copper' },
  { ion: 'Fe³⁺', kimLoai: 'Fe²⁺', sym: 'Fe', E: 0.77, vi: 'Sắt(III) về sắt(II)', en: 'Iron(III) to iron(II)' },
  { ion: 'Ag⁺', kimLoai: 'Ag', sym: 'Ag', E: 0.8, vi: 'Bạc', en: 'Silver' },
  { ion: 'Hg²⁺', kimLoai: 'Hg', sym: 'Hg', E: 0.85, vi: 'Thủy ngân', en: 'Mercury' },
  { ion: 'Pt²⁺', kimLoai: 'Pt', sym: 'Pt', E: 1.19, vi: 'Platin', en: 'Platinum' },
  { ion: 'Au³⁺', kimLoai: 'Au', sym: 'Au', E: 1.5, vi: 'Vàng', en: 'Gold' },
];

/** Vị trí cặp H⁺/H2 — mốc để biết kim loại có tan trong axit loãng hay không. */
export const VI_TRI_HIDRO = DAY_DIEN_HOA.findIndex((c) => c.sym === null);

export const capTheoKimLoai = (kimLoai: string): CapOxiHoaKhu | undefined =>
  DAY_DIEN_HOA.find((c) => c.kimLoai === kimLoai);

export interface KetQuaDay {
  xayRa: boolean;
  /** Phương trình ion rút gọn nếu phản ứng xảy ra. */
  ptIon?: string;
  /** Suất điện động chuẩn của phản ứng, vôn. Dương thì phản ứng tự xảy ra. */
  E?: number;
  giaiThichVi: string;
  giaiThichEn: string;
}

/**
 * Kim loại A có đẩy được ion kim loại B ra khỏi dung dịch muối không?
 *
 * Điều kiện: cặp của A phải đứng TRƯỚC cặp của B trong dãy, tức thế điện cực
 * của A âm hơn. Lúc đó A nhường electron cho ion B.
 */
export function coDayDuoc(kimLoaiA: string, kimLoaiB: string): KetQuaDay {
  const A = capTheoKimLoai(kimLoaiA);
  const B = capTheoKimLoai(kimLoaiB);
  if (!A || !B)
    return {
      xayRa: false,
      giaiThichVi: 'Chưa có số liệu cho cặp này trong dãy điện hóa.',
      giaiThichEn: 'This pair is not in the series.',
    };
  if (A === B)
    return {
      xayRa: false,
      giaiThichVi: 'Hai bên là cùng một kim loại nên không có phản ứng.',
      giaiThichEn: 'Same metal on both sides, so nothing happens.',
    };

  const E = B.E - A.E;
  if (E <= 0)
    return {
      xayRa: false,
      E,
      giaiThichVi: `${A.kimLoai} đứng SAU ${B.kimLoai} trong dãy nên không đẩy được. Muốn đẩy thì phải đứng trước.`,
      giaiThichEn: `${A.kimLoai} sits after ${B.kimLoai} in the series, so it cannot displace it.`,
    };

  // Cân bằng electron: A nhường a electron, ion B nhận b electron
  const a = soElectron(A.ion);
  const b = soElectron(B.ion);
  const g = ucln(a, b);
  const heSoA = b / g;
  const heSoB = a / g;
  const h = (n: number) => (n === 1 ? '' : `${n} `);

  return {
    xayRa: true,
    E,
    ptIon: `${h(heSoA)}${A.kimLoai} + ${h(heSoB)}${B.ion} → ${h(heSoA)}${A.ion} + ${h(heSoB)}${B.kimLoai}`,
    giaiThichVi: `${A.kimLoai} đứng TRƯỚC ${B.kimLoai} trong dãy nên đẩy được ${B.kimLoai} ra khỏi dung dịch muối. Suất điện động chuẩn ${E.toFixed(2)} V, dương nên phản ứng tự xảy ra.`,
    giaiThichEn: `${A.kimLoai} comes before ${B.kimLoai}, so it displaces it from solution. Standard cell potential ${E.toFixed(2)} V, positive so the reaction is spontaneous.`,
  };
}

/** Kim loại có tan trong axit loãng (HCl, H2SO4 loãng) và giải phóng H2 không? */
export function tanTrongAxitLoang(kimLoai: string): boolean {
  const c = capTheoKimLoai(kimLoai);
  return !!c && c.sym !== null && c.E < 0;
}

// Số electron trao đổi, đọc từ điện tích ghi trong ký hiệu ion.
function soElectron(ion: string): number {
  if (ion.includes('³')) return 3;
  if (ion.includes('²')) return 2;
  return 1;
}

const ucln = (a: number, b: number): number => (b === 0 ? a : ucln(b, a % b));
