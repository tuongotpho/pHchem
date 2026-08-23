// Thư viện công thức hóa học — gom từ 3 file dữ liệu theo nhóm.
// Muốn thêm chất: mở file nhóm tương ứng (formulas.inorganic / .organic / .physical),
// chép một dòng rồi sửa. Muốn chất có HÌNH CẤU TẠO: thêm SMILES vào smiles.json
// rồi chạy `npm run struct`.

import { INORGANIC } from './formulas.inorganic';
import { ORGANIC } from './formulas.organic';
import { PHYSICAL } from './formulas.physical';
import SMILES_JSON from './smiles.json';

export type FormulaCat = 'inorganic' | 'organic' | 'physical';

export interface Formula {
  /** Công thức hiển thị, vd "H2SO4" */
  formula: string;
  /** Khóa duy nhất khi nhiều chất trùng công thức (glucozơ/fructozơ đều C6H12O6).
   *  Bỏ trống thì lấy chính `formula`. Dùng để tra SMILES và hình cấu tạo. */
  id?: string;
  vi: string;
  en: string;
  cat: FormulaCat;
  note_vi: string;
  note_en: string;
  /** Lớp chất, vd 'ankan', 'este', 'oxit'. Dùng để nối sang định nghĩa trong
   *  từ điển — xem src/data/classes.ts. Bỏ trống nếu chất không thuộc lớp nào
   *  được dạy riêng (vd các hợp chất sinh học lẻ). */
  nhom?: string;
}

export const FORMULA_CAT_META: Record<FormulaCat, { vi: string; en: string }> = {
  inorganic: { vi: 'Vô cơ', en: 'Inorganic' },
  organic: { vi: 'Hữu cơ', en: 'Organic' },
  physical: { vi: 'Hóa lý', en: 'Physical' },
};

/** Khóa tra cứu của một chất (SMILES, hình cấu tạo, React key). */
export const keyOf = (f: Formula): string => f.id ?? f.formula;

// Mã SMILES là NGUỒN CHÂN LÝ để sinh hình cấu tạo. Đặt ở file JSON dùng chung
// để cả app và script scripts/gen-structures.mjs cùng đọc.
export const SMILES: Record<string, string> = SMILES_JSON;

export const getSmiles = (key: string): string | undefined => SMILES[key];

export const FORMULAS: Formula[] = [...INORGANIC, ...ORGANIC, ...PHYSICAL];
