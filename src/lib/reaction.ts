// Đọc và kiểm tra phương trình hóa học đã cân bằng.
//
// Nhờ có bộ phân tích công thức, MÁY tự kiểm được phương trình có cân bằng hay
// không: đếm số nguyên tử mỗi nguyên tố ở hai vế rồi so. Gõ nhầm một hệ số là
// test báo ngay, không cần dò tay.

import { parseFormula, type Composition } from './formula';

export interface Term {
  coef: number;
  formula: string;
}

export interface Sides {
  left: Term[];
  right: Term[];
}

/** Tách "2 Na + 2 H2O → 2 NaOH + H2" thành hệ số và công thức từng chất. */
export function splitEquation(eq: string): Sides | null {
  const parts = eq.split(/->|=>|=|→|⟶/);
  if (parts.length !== 2) return null;

  const doc = (s: string): Term[] =>
    s
      .split('+')
      .map((x) => x.trim())
      .filter(Boolean)
      .map((x) => {
        const m = x.match(/^(\d+)\s+(.+)$/);
        return m
          ? { coef: parseInt(m[1], 10), formula: m[2].trim() }
          : { coef: 1, formula: x };
      });

  const left = doc(parts[0]);
  const right = doc(parts[1]);
  if (!left.length || !right.length) return null;
  return { left, right };
}

/** Cộng số nguyên tử của một vế. */
function tongVe(terms: Term[]): Composition | string {
  const total: Composition = {};
  for (const t of terms) {
    const r = parseFormula(t.formula);
    if (!r.ok || !r.comp) return `không đọc được "${t.formula}": ${r.error}`;
    for (const k in r.comp) total[k] = (total[k] || 0) + r.comp[k] * t.coef;
  }
  return total;
}

export interface BalanceCheck {
  ok: boolean;
  error?: string;
  /** Các nguyên tố lệch giữa hai vế, dùng để báo lỗi cụ thể. */
  lech?: string[];
}

/** Kiểm tra phương trình đã cân bằng chưa. */
export function isBalanced(eq: string): BalanceCheck {
  const sides = splitEquation(eq);
  if (!sides) return { ok: false, error: 'Không tách được hai vế' };

  const L = tongVe(sides.left);
  if (typeof L === 'string') return { ok: false, error: L };
  const R = tongVe(sides.right);
  if (typeof R === 'string') return { ok: false, error: R };

  const keys = new Set([...Object.keys(L), ...Object.keys(R)]);
  const lech: string[] = [];
  for (const k of keys) {
    const a = L[k] || 0;
    const b = R[k] || 0;
    if (a !== b) lech.push(`${k}: trái ${a} ≠ phải ${b}`);
  }
  return lech.length ? { ok: false, lech } : { ok: true };
}

/** Danh sách công thức các chất ở hai vế (bỏ hệ số) — dùng để lập chỉ mục. */
export function speciesOf(eq: string): { reactants: string[]; products: string[] } {
  const s = splitEquation(eq);
  if (!s) return { reactants: [], products: [] };
  return {
    reactants: s.left.map((t) => t.formula),
    products: s.right.map((t) => t.formula),
  };
}
