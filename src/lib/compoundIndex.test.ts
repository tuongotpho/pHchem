import { describe, it, expect } from 'vitest';
import {
  elementsOf,
  compoundsForElement,
  elementsOfFormula,
  indexedElementCount,
  normalizeFormula,
} from './compoundIndex';
import { FORMULAS, keyOf } from '../data/formulas';
import { byNumber } from '../data/elements';

describe('chỉ mục nguyên tố ↔ hợp chất', () => {
  it('đọc đúng thành phần nguyên tố của công thức', () => {
    expect(elementsOf('H2SO4')).toEqual([1, 8, 16]); // H, O, S
    expect(elementsOf('NaCl')).toEqual([11, 17]);
    expect(elementsOf('Ca(OH)2')).toEqual([1, 8, 20]);
    expect(elementsOf('CuSO4.5H2O')).toEqual([1, 8, 16, 29]);
    expect(elementsOf('C6H12O6')).toEqual([1, 6, 8]);
  });

  it('polime bỏ được chỉ số mắt xích n', () => {
    expect(normalizeFormula('(C2H4)n')).toBe('(C2H4)');
    expect(elementsOf('(C2H4)n')).toEqual([1, 6]);
    expect(elementsOf('(C2H3Cl)n')).toEqual([1, 6, 17]); // PVC có clo
  });

  it('mọi chất (trừ nhóm hóa lý) đều đọc được thành phần', () => {
    const hong = FORMULAS.filter(
      (f) => f.cat !== 'physical' && elementsOfFormula(f).length === 0,
    ).map((f) => f.formula);
    expect(hong).toEqual([]);
  });

  it('phương trình hóa lý KHÔNG bị xếp thành hợp chất', () => {
    const pt = FORMULAS.find((f) => f.formula === 'PV = nRT')!;
    expect(elementsOfFormula(pt)).toEqual([]);
    // và không xuất hiện trong danh sách của bất kỳ nguyên tố nào
    for (let n = 1; n <= 118; n++) {
      expect(compoundsForElement(n).some((f) => keyOf(f) === keyOf(pt))).toBe(false);
    }
  });

  it('mọi hợp chất được xếp vào nguyên tố nào thì THẬT SỰ chứa nguyên tố đó', () => {
    const sai: string[] = [];
    for (let n = 1; n <= 118; n++) {
      compoundsForElement(n).forEach((f) => {
        if (!elementsOfFormula(f).includes(n)) {
          sai.push(`${f.formula} bị xếp nhầm vào ${byNumber(n)?.sym}`);
        }
      });
    }
    expect(sai).toEqual([]);
  });

  it('sắt có đủ các hợp chất quen thuộc', () => {
    const fe = compoundsForElement(26).map((f) => f.formula);
    ['FeO', 'Fe2O3', 'Fe3O4', 'FeCl2', 'FeCl3', 'Fe(OH)2', 'Fe(OH)3', 'FeSO4', 'FeS'].forEach(
      (ct) => expect(fe).toContain(ct),
    );
  });

  it('không nhầm nguyên tố có ký hiệu lồng nhau', () => {
    // Co (coban) không được lẫn vào CO2, C + O
    const co2 = FORMULAS.find((f) => f.formula === 'CO2')!;
    expect(elementsOfFormula(co2)).toEqual([6, 8]); // C và O
    expect(elementsOfFormula(co2)).not.toContain(27); // KHÔNG phải coban
    // Ngược lại: nguyên tố coban không có CO2 trong danh sách
    expect(compoundsForElement(27).map((f) => f.formula)).not.toContain('CO2');
  });

  it('nguyên tố phổ biến có nhiều hợp chất, nguyên tố hiếm thì không có', () => {
    expect(compoundsForElement(8).length).toBeGreaterThan(100); // oxy
    expect(compoundsForElement(1).length).toBeGreaterThan(100); // hydro
    expect(compoundsForElement(99).length).toBe(0); // einsteini
  });

  it('báo số nguyên tố có hợp chất', () => {
    expect(indexedElementCount()).toBeGreaterThan(25);
  });
});
