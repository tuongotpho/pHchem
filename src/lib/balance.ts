// Cân bằng phương trình hóa học bằng đại số tuyến tính.
// Ý tưởng: mỗi chất là một cột, mỗi nguyên tố là một hàng. Số nguyên tử của
// nguyên tố ở vế trái mang dấu +, vế phải mang dấu −. Nghiệm của hệ A·x = 0
// (với x > 0, nguyên) chính là bộ hệ số cân bằng. Dùng phân số BigInt để
// không có sai số dấu phẩy động.

import { parseFormula, type Composition } from './formula';

// ---- Phân số chính xác bằng BigInt ----
function gcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a;
}

class Frac {
  n: bigint;
  d: bigint;
  constructor(n: bigint, d: bigint = 1n) {
    if (d === 0n) throw new Error('Chia cho 0');
    if (d < 0n) {
      n = -n;
      d = -d;
    }
    const g = gcd(n, d) || 1n;
    this.n = n / g;
    this.d = d / g;
  }
  add(o: Frac) {
    return new Frac(this.n * o.d + o.n * this.d, this.d * o.d);
  }
  sub(o: Frac) {
    return new Frac(this.n * o.d - o.n * this.d, this.d * o.d);
  }
  mul(o: Frac) {
    return new Frac(this.n * o.n, this.d * o.d);
  }
  div(o: Frac) {
    return new Frac(this.n * o.d, this.d * o.n);
  }
  isZero() {
    return this.n === 0n;
  }
}
const F = (n: number | bigint) => new Frac(BigInt(n));

export interface BalanceResult {
  ok: boolean;
  coefficients?: number[]; // hệ số cho từng chất, theo thứ tự reactants++products
  reactants?: string[];
  products?: string[];
  error?: string;
}

function lcm(a: bigint, b: bigint) {
  return (a / gcd(a, b)) * b;
}

// Tách "A + B -> C + D" (chấp nhận ->, =, →, ⟶)
function splitSides(input: string): { left: string[]; right: string[] } | null {
  const parts = input.split(/->|=>|=|→|⟶/);
  if (parts.length !== 2) return null;
  const clean = (s: string) =>
    s
      .split('+')
      .map((x) => x.trim())
      .filter(Boolean);
  return { left: clean(parts[0]), right: clean(parts[1]) };
}

export function balance(input: string): BalanceResult {
  const sides = splitSides(input);
  if (!sides) return { ok: false, error: 'Cần dạng "A + B → C + D"' };
  const { left, right } = sides;
  if (!left.length || !right.length)
    return { ok: false, error: 'Thiếu chất ở một vế' };

  const species = [...left, ...right];
  const comps: Composition[] = [];
  for (const sp of species) {
    const r = parseFormula(sp);
    if (!r.ok || !r.comp)
      return { ok: false, error: `Không đọc được "${sp}": ${r.error}` };
    comps.push(r.comp);
  }

  // tập nguyên tố
  const elements = [...new Set(comps.flatMap((c) => Object.keys(c)))];
  const m = species.length;

  // Ma trận A (elements x species), dấu + cho vế trái, − cho vế phải
  const A: Frac[][] = elements.map((el) =>
    species.map((_, j) => {
      const count = comps[j][el] || 0;
      const sign = j < left.length ? 1 : -1;
      return F(count * sign);
    }),
  );

  // Khử Gauss về bậc thang, tìm không gian nghiệm (nullspace)
  const rows = A.length;
  const cols = m;
  const pivotCol: number[] = [];
  let r = 0;
  for (let c = 0; c < cols && r < rows; c++) {
    // tìm hàng có phần tử khác 0 ở cột c
    let sel = -1;
    for (let i = r; i < rows; i++) {
      if (!A[i][c].isZero()) {
        sel = i;
        break;
      }
    }
    if (sel === -1) continue;
    [A[r], A[sel]] = [A[sel], A[r]];
    const pivot = A[r][c];
    for (let j = 0; j < cols; j++) A[r][j] = A[r][j].div(pivot);
    for (let i = 0; i < rows; i++) {
      if (i !== r && !A[i][c].isZero()) {
        const factor = A[i][c];
        for (let j = 0; j < cols; j++)
          A[i][j] = A[i][j].sub(factor.mul(A[r][j]));
      }
    }
    pivotCol.push(c);
    r++;
  }

  const freeCols = [];
  for (let c = 0; c < cols; c++) if (!pivotCol.includes(c)) freeCols.push(c);

  if (freeCols.length === 0)
    return { ok: false, error: 'Phương trình không có nghiệm cân bằng' };
  if (freeCols.length > 1)
    return {
      ok: false,
      error: 'Phương trình chưa xác định duy nhất (nhiều nghiệm)',
    };

  // gán biến tự do = 1, suy ngược các biến pivot
  const free = freeCols[0];
  const x: Frac[] = new Array(cols).fill(F(0));
  x[free] = F(1);
  for (let i = 0; i < pivotCol.length; i++) {
    const pc = pivotCol[i];
    // hàng i: x[pc] = - sum(A[i][free] * x[free])
    x[pc] = A[i][free].mul(F(-1));
  }

  // quy về số nguyên dương: nhân với LCM các mẫu, chia GCD các tử
  let denom = 1n;
  for (const f of x) denom = lcm(denom, f.d);
  const ints = x.map((f) => (f.n * denom) / f.d);
  let g = 0n;
  for (const v of ints) g = gcd(g, v);
  if (g === 0n) g = 1n;
  let norm = ints.map((v) => v / g);

  // đảm bảo dương
  if (norm.some((v) => v < 0n)) norm = norm.map((v) => -v);
  if (norm.some((v) => v <= 0n))
    return { ok: false, error: 'Không tìm được hệ số dương' };

  return {
    ok: true,
    coefficients: norm.map((v) => Number(v)),
    reactants: left,
    products: right,
  };
}

// Ghép lại chuỗi cân bằng để hiển thị: "2 H2 + O2 → 2 H2O"
export function formatBalanced(res: BalanceResult): string {
  if (!res.ok || !res.coefficients) return '';
  const { coefficients, reactants = [], products = [] } = res;
  const term = (coef: number, sp: string) => (coef === 1 ? sp : `${coef} ${sp}`);
  const l = reactants.map((sp, i) => term(coefficients[i], sp)).join(' + ');
  const rct = reactants.length;
  const rgt = products
    .map((sp, i) => term(coefficients[rct + i], sp))
    .join(' + ');
  return `${l} → ${rgt}`;
}
