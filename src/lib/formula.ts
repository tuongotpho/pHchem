// Phân tích công thức hóa học và tính khối lượng mol.
// Hỗ trợ ngoặc lồng nhau, ví dụ: Ca(OH)2, Al2(SO4)3, CuSO4.5H2O

import { ELEMENTS } from '../data/elements';
import { demNguyenTu } from './phanTichCongThuc.js';

// Tra khối lượng nguyên tử theo ký hiệu
const MASS: Record<string, number> = Object.fromEntries(
  ELEMENTS.map((e) => [e.sym, e.mass]),
);

export type Composition = Record<string, number>; // ký hiệu -> số nguyên tử

export interface ParseResult {
  ok: boolean;
  comp?: Composition;
  mass?: number;
  error?: string;
}

/**
 * Đọc công thức của MỘT chất và tính khối lượng mol.
 *
 * Phần đếm nguyên tử nằm ở lib/phanTichCongThuc.js — dùng chung với script
 * sinh hình cấu tạo, để hai bên không bao giờ đọc lệch nhau. Ở đây bật chế độ
 * CHẶT CHẼ vì đầu vào là do người dùng gõ tay.
 */
export function parseFormula(input: string): ParseResult {
  const raw = input.replace(/\s+/g, '');
  if (!raw) return { ok: false, error: 'Chưa nhập công thức' };

  try {
    const comp = demNguyenTu(raw, {
      chatChe: true,
      nguyenToHopLe: (sym) => sym in MASS,
    });
    let mass = 0;
    for (const k in comp) mass += MASS[k] * comp[k];
    return { ok: true, comp, mass: Math.round(mass * 1000) / 1000 };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

// Thành phần % khối lượng theo từng nguyên tố
export function percentComposition(
  comp: Composition,
  totalMass: number,
): { sym: string; count: number; mass: number; percent: number }[] {
  return Object.entries(comp)
    .map(([sym, count]) => {
      const mass = MASS[sym] * count;
      return {
        sym,
        count,
        mass: Math.round(mass * 1000) / 1000,
        percent: Math.round((mass / totalMass) * 10000) / 100,
      };
    })
    .sort((a, b) => b.mass - a.mass);
}
