// Lập chỉ mục Nguyên tố ↔ Hợp chất.
//
// Khác với phần "sự thật" (phải gắn tay vì là văn xuôi), quan hệ này SUY RA ĐƯỢC
// từ chính công thức: phân tích công thức ra thành phần nguyên tố là việc máy làm
// chính xác, không thể gán nhầm.

import { ELEMENTS } from '../data/elements';
import { FORMULAS, keyOf, type Formula } from '../data/formulas';
import { parseFormula } from './formula';

const SYM_TO_N = new Map(ELEMENTS.map((e) => [e.sym, e.n]));

/**
 * Chuẩn hóa công thức trước khi phân tích.
 * Polime viết kèm chỉ số mắt xích: (C2H4)n → bỏ chữ n, vì mắt xích chứa đúng
 * những nguyên tố đó.
 */
export const normalizeFormula = (f: string): string => f.replace(/\)n$/, ')');

/** Số hiệu các nguyên tố có trong một công thức; mảng rỗng nếu không đọc được. */
export function elementsOf(formula: string): number[] {
  const r = parseFormula(normalizeFormula(formula));
  if (!r.ok || !r.comp) return [];
  const out: number[] = [];
  for (const sym of Object.keys(r.comp)) {
    const n = SYM_TO_N.get(sym);
    if (n !== undefined) out.push(n);
  }
  return out.sort((a, b) => a - b);
}

// Dựng chỉ mục một lần khi nạp module.
const INDEX = new Map<number, Formula[]>();
const ELS_OF_KEY = new Map<string, number[]>();

for (const f of FORMULAS) {
  // Nhóm "hóa lý" là PHƯƠNG TRÌNH (PV = nRT), không phải chất — bỏ qua.
  if (f.cat === 'physical') continue;
  const els = elementsOf(f.formula);
  ELS_OF_KEY.set(keyOf(f), els);
  for (const n of els) {
    const arr = INDEX.get(n);
    if (arr) arr.push(f);
    else INDEX.set(n, [f]);
  }
}

/** Các hợp chất trong thư viện có chứa nguyên tố số hiệu n. */
export const compoundsForElement = (n: number): Formula[] => INDEX.get(n) ?? [];

/** Số hiệu các nguyên tố có trong một mục của thư viện công thức. */
export const elementsOfFormula = (f: Formula): number[] =>
  ELS_OF_KEY.get(keyOf(f)) ?? [];

/** Số nguyên tố đang có ít nhất một hợp chất — dùng để báo cáo. */
export const indexedElementCount = (): number => INDEX.size;
