import { describe, it, expect } from 'vitest';
import { CATIONS, ANIONS, MATRIX, buildFormula } from './solubility';

const cat = (a: string) => CATIONS.find((c) => c.ascii === a)!;
const an = (a: string) => ANIONS.find((c) => c.ascii === a)!;

describe('buildFormula — ghép công thức từ cation + anion', () => {
  const cases: [string, string, string][] = [
    ['Na', 'Cl', 'NaCl'],
    ['Ca', 'OH', 'Ca(OH)2'],
    ['Al', 'SO4', 'Al2(SO4)3'],
    ['Fe3', 'PO4', 'FePO4'],
    ['Fe2', 'SO4', 'FeSO4'],
    ['Fe3', 'Cl', 'FeCl3'],
    ['H', 'SO4', 'H2SO4'],
    ['H', 'Cl', 'HCl'],
    ['H', 'NO3', 'HNO3'],
    ['H', 'PO4', 'H3PO4'],
    ['H', 'S', 'H2S'],
    ['NH4', 'Cl', 'NH4Cl'],
    ['NH4', 'SO4', '(NH4)2SO4'],
    ['Ba', 'SO4', 'BaSO4'],
    ['Ca', 'PO4', 'Ca3(PO4)2'],
    ['Ag', 'Cl', 'AgCl'],
    ['Cu', 'OH', 'Cu(OH)2'],
    ['Al', 'OH', 'Al(OH)3'],
    ['K', 'CO3', 'K2CO3'],
    ['Pb', 'S', 'PbS'],
    ['H', 'OH', 'H2O'],
  ];
  it.each(cases)('%s + %s = %s', (c, a, expected) => {
    expect(buildFormula(cat(c), an(a))).toBe(expected);
  });
});

describe('ma trận độ tan', () => {
  it('đúng kích thước 14 cation x 8 anion', () => {
    expect(MATRIX.length).toBe(CATIONS.length);
    MATRIX.forEach((row) => expect(row.length).toBe(ANIONS.length));
  });
  it('mọi muối nitrat đều tan', () => {
    const i = ANIONS.findIndex((a) => a.ascii === 'NO3');
    MATRIX.forEach((row) => expect(row[i]).toBe('T'));
  });
  it('AgCl và BaSO4 không tan', () => {
    const ag = CATIONS.findIndex((c) => c.ascii === 'Ag');
    const cl = ANIONS.findIndex((a) => a.ascii === 'Cl');
    const ba = CATIONS.findIndex((c) => c.ascii === 'Ba');
    const so4 = ANIONS.findIndex((a) => a.ascii === 'SO4');
    expect(MATRIX[ag][cl]).toBe('I');
    expect(MATRIX[ba][so4]).toBe('I');
  });
});
