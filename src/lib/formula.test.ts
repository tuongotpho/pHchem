import { describe, it, expect } from 'vitest';
import { parseFormula } from './formula';
import { balance, formatBalanced } from './balance';

describe('parseFormula — khối lượng mol', () => {
  const cases: [string, number][] = [
    ['H2O', 18.015],
    ['H2SO4', 98.072],
    ['NaCl', 58.44],
    ['Ca(OH)2', 74.092],
    ['Al2(SO4)3', 342.15],
    ['CuSO4.5H2O', 249.681], // muối ngậm nước
    ['C6H12O6', 180.156], // glucose
    ['KMnO4', 158.032],
    ['NaHCO3', 84.006],
  ];
  it.each(cases)('%s = %f', (formula, expected) => {
    const r = parseFormula(formula);
    expect(r.ok).toBe(true);
    // sai số cho phép do làm tròn khối lượng nguyên tử
    expect(r.mass!).toBeCloseTo(expected, 1);
  });

  it('báo lỗi khi nguyên tố không tồn tại', () => {
    expect(parseFormula('Xx2').ok).toBe(false);
  });
  it('báo lỗi khi thiếu đóng ngoặc', () => {
    expect(parseFormula('Ca(OH2').ok).toBe(false);
  });
});

// Số đứng đầu là hệ số ngậm nước — thứ chỉ có nghĩa SAU dấu chấm. Đứng trước
// cả chất thì nó là hệ số phương trình, không thuộc về công thức chất.
//
// Trước đây không phân biệt: gõ "2H2O" vào ô Khối lượng mol thì app hiện
// "36,03 g/mol" — khối lượng của HAI phân tử nước, dán nhãn là khối lượng mol
// của chất. Học sinh tin theo là hỏng cả bài.
describe('hệ số đứng trước công thức — phải báo lỗi, không tính bừa', () => {
  const GO_SAI = ['2H2O', '5H2O', '3 NaCl', '10CO2'];
  it.each(GO_SAI)('%s bị từ chối', (ct) => {
    const r = parseFormula(ct);
    expect(r.ok).toBe(false);
    expect(r.error).toBeTruthy();
  });

  it('lời báo lỗi phải chỉ đúng việc cần làm', () => {
    expect(parseFormula('2H2O').error).toMatch(/hệ số/i);
  });

  it('muối ngậm nước vẫn đọc được như cũ', () => {
    // Chốt chặn cho chính chỗ vừa sửa — hệ số SAU dấu chấm là hợp lệ.
    expect(parseFormula('CuSO4.5H2O').mass!).toBeCloseTo(249.681, 1);
    expect(parseFormula('Na2CO3.10H2O').mass!).toBeCloseTo(286.14, 1);
    expect(parseFormula('CaSO4.2H2O').mass!).toBeCloseTo(172.17, 1);
  });

  it('công thức thường không bị vạ lây', () => {
    expect(parseFormula('H2O').mass!).toBeCloseTo(18.015, 2);
    expect(parseFormula('C6H12O6').mass!).toBeCloseTo(180.156, 1);
  });
});

describe('balance — cân bằng phương trình', () => {
  const cases: [string, string][] = [
    ['H2 + O2 -> H2O', '2 H2 + O2 → 2 H2O'],
    ['Fe + O2 -> Fe2O3', '4 Fe + 3 O2 → 2 Fe2O3'],
    ['H2 + N2 -> NH3', '3 H2 + N2 → 2 NH3'],
    ['C3H8 + O2 -> CO2 + H2O', 'C3H8 + 5 O2 → 3 CO2 + 4 H2O'],
    [
      'KMnO4 + HCl -> KCl + MnCl2 + H2O + Cl2',
      '2 KMnO4 + 16 HCl → 2 KCl + 2 MnCl2 + 8 H2O + 5 Cl2',
    ],
    ['Al + HCl -> AlCl3 + H2', '2 Al + 6 HCl → 2 AlCl3 + 3 H2'],
    ['NaOH + H2SO4 -> Na2SO4 + H2O', '2 NaOH + H2SO4 → Na2SO4 + 2 H2O'],
  ];
  it.each(cases)('%s', (input, expected) => {
    const r = balance(input);
    expect(r.ok).toBe(true);
    expect(formatBalanced(r)).toBe(expected);
  });

  it('báo lỗi khi không thể cân bằng', () => {
    expect(balance('Na -> Cl2').ok).toBe(false);
  });
});
