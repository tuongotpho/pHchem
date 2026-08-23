// Nối THƯ VIỆN CHẤT và BẢNG TUẦN HOÀN sang ĐỊNH NGHĨA trong từ điển.
//
// Ý tưởng: thay vì dò chữ trong mô tả (kiểu nào cũng có liên kết sai), ta đi
// theo PHÂN LOẠI — thứ vốn là quan hệ thật trong hóa học.
//   Clo là halogen  → mở định nghĩa "Halogen"
//   CH4 là ankan    → mở định nghĩa "Ankan"
//
// Nhờ vậy tra một chất là thấy luôn nó thuộc lớp nào, mà mở một định nghĩa là
// thấy luôn cả loạt chất thuộc lớp đó để học.
//
// Khóa nối sang từ điển là trường `en` của thuật ngữ: nó duy nhất (có phép
// kiểm bảo đảm) và không đổi khi sửa cách viết tiếng Việt.

import type { Category } from './elements';

export interface NhomChat {
  /** Tên hiển thị */
  vi: string;
  en: string;
  /** Trường `en` của thuật ngữ tương ứng trong từ điển */
  term: string;
}

/** Lớp chất của các hợp chất trong thư viện công thức. */
export const NHOM_CHAT: Record<string, NhomChat> = {
  // --- Vô cơ ---
  'don-chat': { vi: 'Đơn chất', en: 'Elementary substance', term: 'Elementary substance' },
  oxit: { vi: 'Oxit', en: 'Oxide', term: 'Oxide' },
  axit: { vi: 'Axit', en: 'Acid', term: 'Acid' },
  bazo: { vi: 'Bazơ, hiđroxit', en: 'Base, hydroxide', term: 'Hydroxide' },
  muoi: { vi: 'Muối', en: 'Salt', term: 'Salt' },

  // --- Hiđrocacbon ---
  ankan: { vi: 'Ankan', en: 'Alkane', term: 'Alkane' },
  anken: { vi: 'Anken', en: 'Alkene', term: 'Alkene' },
  ankin: { vi: 'Ankin', en: 'Alkyne', term: 'Alkyne' },
  ankadien: { vi: 'Ankađien', en: 'Alkadiene', term: 'Alkadiene' },
  aren: { vi: 'Aren (hiđrocacbon thơm)', en: 'Arene', term: 'Arene' },

  // --- Dẫn xuất chứa oxi ---
  ancol: { vi: 'Ancol', en: 'Alcohol', term: 'Alcohol' },
  phenol: { vi: 'Phenol', en: 'Phenol', term: 'Phenol' },
  ete: { vi: 'Ete', en: 'Ether', term: 'Ether' },
  andehit: { vi: 'Anđehit', en: 'Aldehyde', term: 'Aldehyde' },
  xeton: { vi: 'Xeton', en: 'Ketone', term: 'Ketone' },
  'axit-cacboxylic': { vi: 'Axit cacboxylic', en: 'Carboxylic acid', term: 'Carboxylic acid' },
  este: { vi: 'Este', en: 'Ester', term: 'Ester' },
  lipit: { vi: 'Chất béo', en: 'Fat', term: 'Fat' },

  // --- Chứa nitơ ---
  amin: { vi: 'Amin', en: 'Amine', term: 'Amine' },
  'amino-axit': { vi: 'Amino axit', en: 'Amino acid', term: 'Amino acid' },

  // --- Gluxit, polime, halogen ---
  gluxit: { vi: 'Cacbohydrat (gluxit)', en: 'Carbohydrate', term: 'Carbohydrate' },
  polime: { vi: 'Polime', en: 'Polymer', term: 'Polymer' },
  'dan-xuat-halogen': { vi: 'Dẫn xuất halogen', en: 'Halogen derivative', term: 'Halogen' },
};

/** Nhóm nguyên tố trong bảng tuần hoàn → thuật ngữ trong từ điển. */
export const NHOM_NGUYEN_TO: Partial<Record<Category, string>> = {
  alkali: 'Alkali metal',
  alkaline: 'Alkaline earth metal',
  transition: 'Transition metal',
  'post-transition': 'Post-transition metal',
  metalloid: 'Metalloid',
  nonmetal: 'Nonmetal',
  halogen: 'Halogen',
  noble: 'Noble gas',
  lanthanide: 'Lanthanide',
  actinide: 'Actinide',
  // 'unknown' cố ý bỏ trống: các nguyên tố siêu nặng chưa ai đo được tính chất
  // nên không xếp vào nhóm nào, không có định nghĩa để trỏ tới.
};
