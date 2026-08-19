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
