// Chỉ mục đồng phân: chất nào cùng công thức phân tử với chất nào.
//
// Đồng phân là các chất CÙNG công thức phân tử nhưng KHÁC cấu tạo, nên tính
// chất khác hẳn nhau. Đây là một trong những ý khó nhất của hóa hữu cơ, mà
// nhìn danh sách phẳng thì không thấy được — phải bày ra cạnh nhau.
//
// Danh sách này MÁY TỰ SUY RA từ công thức, không phải gõ tay: thêm một chất
// mới là quan hệ đồng phân tự cập nhật, không bao giờ sót hay lệch.

import { FORMULAS, keyOf, type Formula } from '../data/formulas';
import { parseFormula, type Composition } from './formula';

/**
 * Viết công thức phân tử theo quy ước Hill: C trước, H sau, rồi các nguyên tố
 * còn lại xếp theo bảng chữ cái. Nhờ vậy hai cách viết khác nhau của cùng một
 * chất, vd "CH3COOH" và "C2H4O2", quy về đúng một chuỗi để so.
 */
export function hillFormula(comp: Composition): string {
  const soLan = (k: string) => (comp[k] > 1 ? String(comp[k]) : '');
  const conLai = Object.keys(comp)
    .filter((k) => k !== 'C' && k !== 'H')
    .sort();
  let s = '';
  if (comp.C) s += 'C' + soLan('C');
  if (comp.H) s += 'H' + soLan('H');
  for (const k of conLai) s += k + soLan(k);
  return s;
}

/** Công thức phân tử của một chất, hoặc null nếu không đọc được. */
export function molecularFormula(f: Formula): string | null {
  // Polime viết dạng (X)n — số mắt xích không xác định nên không so đồng phân được
  if (/\)n$/.test(f.formula)) return null;
  const r = parseFormula(f.formula);
  if (!r.ok || !r.comp) return null;
  return hillFormula(r.comp);
}

// Gom nhóm theo công thức phân tử. Chỉ xét chất HỮU CƠ: đồng phân là chuyện
// của hóa hữu cơ, còn hai chất vô cơ trùng công thức phân tử thì hầu như
// không có ở mức phổ thông.
const THEO_CTPT = new Map<string, Formula[]>();

for (const f of FORMULAS) {
  if (f.cat !== 'organic') continue;
  const ctpt = molecularFormula(f);
  if (!ctpt) continue;
  const arr = THEO_CTPT.get(ctpt);
  if (arr) arr.push(f);
  else THEO_CTPT.set(ctpt, [f]);
}

/** Công thức phân tử dùng để gom nhóm, hoặc null nếu chất này không xét. */
export const ctptOf = (f: Formula): string | null =>
  f.cat === 'organic' ? molecularFormula(f) : null;

/** Các chất là đồng phân của chất này (không kể chính nó). */
export function isomersOf(f: Formula): Formula[] {
  const ctpt = ctptOf(f);
  if (!ctpt) return [];
  const nhom = THEO_CTPT.get(ctpt);
  if (!nhom) return [];
  const khoaCuaToi = keyOf(f);
  return nhom.filter((x) => keyOf(x) !== khoaCuaToi);
}

/** Mọi nhóm đồng phân có từ hai chất trở lên — dùng để thống kê và kiểm tra. */
export function allIsomerGroups(): { ctpt: string; chat: Formula[] }[] {
  return [...THEO_CTPT.entries()]
    .filter(([, v]) => v.length > 1)
    .map(([ctpt, chat]) => ({ ctpt, chat }))
    .sort((a, b) => b.chat.length - a.chat.length);
}
