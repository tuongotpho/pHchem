// Phân tích công thức hóa học và tính khối lượng mol.
// Hỗ trợ ngoặc lồng nhau, ví dụ: Ca(OH)2, Al2(SO4)3, CuSO4.5H2O

import { ELEMENTS } from '../data/elements';

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

// Tách phần "ngậm nước" bằng dấu chấm hoặc *: CuSO4.5H2O
function splitHydrates(input: string): string[] {
  return input.split(/[.*·]/).map((s) => s.trim()).filter(Boolean);
}

// Phân tích một đoạn không có dấu chấm, trả về composition hoặc ném lỗi
function parseSegment(s: string): Composition {
  let i = 0;
  const n = s.length;

  function parseGroup(): Composition {
    const comp: Composition = {};
    while (i < n) {
      const ch = s[i];
      if (ch === '(' || ch === '[') {
        i++;
        const inner = parseGroup();
        if (s[i] !== ')' && s[i] !== ']') throw new Error('Thiếu dấu đóng ngoặc');
        i++;
        const mult = parseNumber();
        merge(comp, inner, mult);
      } else if (ch === ')' || ch === ']') {
        break; // để lời gọi ngoài xử lý
      } else if (/[A-Z]/.test(ch)) {
        const sym = parseSymbol();
        const count = parseNumber();
        if (!(sym in MASS)) throw new Error(`Không rõ nguyên tố: ${sym}`);
        comp[sym] = (comp[sym] || 0) + count;
      } else {
        throw new Error(`Ký tự không hợp lệ: "${ch}"`);
      }
    }
    return comp;
  }

  function parseSymbol(): string {
    let sym = s[i]; // chữ hoa
    i++;
    while (i < n && /[a-z]/.test(s[i])) {
      sym += s[i];
      i++;
    }
    return sym;
  }

  function parseNumber(): number {
    let num = '';
    while (i < n && /[0-9]/.test(s[i])) {
      num += s[i];
      i++;
    }
    return num === '' ? 1 : parseInt(num, 10);
  }

  function merge(target: Composition, src: Composition, mult: number) {
    for (const k in src) target[k] = (target[k] || 0) + src[k] * mult;
  }

  const result = parseGroup();
  if (i < n) throw new Error(`Dư ký tự ở vị trí ${i + 1}`);
  return result;
}

export function parseFormula(input: string): ParseResult {
  const raw = input.replace(/\s+/g, '');
  if (!raw) return { ok: false, error: 'Chưa nhập công thức' };

  try {
    const comp: Composition = {};
    const doan = splitHydrates(raw);
    for (let i = 0; i < doan.length; i++) {
      const seg = doan[i];
      // hệ số đứng trước đoạn ngậm nước, ví dụ "5H2O"
      const m = seg.match(/^(\d+)(.+)$/);
      let mult = 1;
      let body = seg;
      if (m && /[A-Z(]/.test(m[2][0])) {
        // Số dẫn đầu chỉ có nghĩa là "mấy phân tử nước ngậm vào" khi nó đứng
        // SAU dấu chấm. Đứng trước cả chất thì đó là hệ số phương trình, không
        // thuộc về công thức — nhận bừa thì "2H2O" ra 36,03 g/mol và app dán
        // nhãn đó là khối lượng mol của nước.
        if (i === 0)
          throw new Error(
            'Bỏ hệ số đứng trước công thức — ô này chỉ nhận công thức của một chất',
          );
        mult = parseInt(m[1], 10);
        body = m[2];
      }
      const c = parseSegment(body);
      for (const k in c) comp[k] = (comp[k] || 0) + c[k] * mult;
    }

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
