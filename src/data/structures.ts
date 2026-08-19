// Công thức cấu tạo vẽ TAY, đúng chuẩn sách giáo khoa VN.
// Mỗi chất là tọa độ nguyên tử + liên kết, do người đặt (không phải máy tự xếp),
// nên trái/phải, nhóm chức, liên kết đôi/ba đều đúng quy ước dạy học.
//
// Hệ tọa độ: gốc trên-trái, đơn vị px trong khung viewBox w×h.
// t: nhãn hiển thị ('' = đỉnh không nhãn, ngầm là C-H như khung benzen)
// c: màu gợi ý — 'o' đỏ (oxy), 'n' lam (nitơ); bỏ trống = sáng (C/H)
// o (bond order): 1 đơn (mặc định), 2 đôi, 3 ba

export interface SAtom {
  x: number;
  y: number;
  t: string;
  c?: 'o' | 'n';
}
export interface SBond {
  a: number;
  b: number;
  o?: 1 | 2 | 3;
}
export interface Struct {
  w: number;
  h: number;
  atoms: SAtom[];
  bonds: SBond[];
}

export const STRUCTURES: Record<string, Struct> = {
  // Metan — C ở giữa, 4 H, 4 liên kết đơn
  CH4: {
    w: 140,
    h: 140,
    atoms: [
      { x: 70, y: 70, t: 'C' },
      { x: 70, y: 25, t: 'H' },
      { x: 70, y: 115, t: 'H' },
      { x: 25, y: 70, t: 'H' },
      { x: 115, y: 70, t: 'H' },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
      { a: 0, b: 4 },
    ],
  },

  // Etilen H2C=CH2 — một liên kết đôi C=C
  C2H4: {
    w: 180,
    h: 130,
    atoms: [
      { x: 70, y: 65, t: 'C' },
      { x: 120, y: 65, t: 'C' },
      { x: 38, y: 38, t: 'H' },
      { x: 38, y: 92, t: 'H' },
      { x: 152, y: 38, t: 'H' },
      { x: 152, y: 92, t: 'H' },
    ],
    bonds: [
      { a: 0, b: 1, o: 2 },
      { a: 0, b: 2 },
      { a: 0, b: 3 },
      { a: 1, b: 4 },
      { a: 1, b: 5 },
    ],
  },

  // Axetilen H–C≡C–H — liên kết ba
  C2H2: {
    w: 200,
    h: 80,
    atoms: [
      { x: 30, y: 40, t: 'H' },
      { x: 78, y: 40, t: 'C' },
      { x: 128, y: 40, t: 'C' },
      { x: 176, y: 40, t: 'H' },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2, o: 3 },
      { a: 2, b: 3 },
    ],
  },

  // Etanol CH3–CH2–OH (công thức cấu tạo thu gọn)
  C2H5OH: {
    w: 210,
    h: 80,
    atoms: [
      { x: 45, y: 40, t: 'CH₃' },
      { x: 108, y: 40, t: 'CH₂' },
      { x: 168, y: 40, t: 'OH', c: 'o' },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2 },
    ],
  },

  // Axit axetic CH3–C(=O)–OH — metyl bên TRÁI, nhóm C=O rõ
  CH3COOH: {
    w: 210,
    h: 115,
    atoms: [
      { x: 45, y: 78, t: 'CH₃' },
      { x: 108, y: 78, t: 'C' },
      { x: 108, y: 30, t: 'O', c: 'o' },
      { x: 170, y: 78, t: 'OH', c: 'o' },
    ],
    bonds: [
      { a: 0, b: 1 },
      { a: 1, b: 2, o: 2 },
      { a: 1, b: 3 },
    ],
  },

  // Benzen — vòng 6 cạnh Kekulé (3 liên kết đôi xen kẽ), đỉnh ngầm là C-H
  C6H6: {
    w: 180,
    h: 150,
    atoms: [
      { x: 90, y: 28, t: '' },
      { x: 133, y: 53, t: '' },
      { x: 133, y: 100, t: '' },
      { x: 90, y: 125, t: '' },
      { x: 47, y: 100, t: '' },
      { x: 47, y: 53, t: '' },
    ],
    bonds: [
      { a: 0, b: 1, o: 2 },
      { a: 1, b: 2 },
      { a: 2, b: 3, o: 2 },
      { a: 3, b: 4 },
      { a: 4, b: 5, o: 2 },
      { a: 5, b: 0 },
    ],
  },
};

export const getStructure = (formula: string): Struct | undefined =>
  STRUCTURES[formula];
