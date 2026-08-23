import { describe, it, expect } from 'vitest';
import { hillFormula, molecularFormula, isomersOf, allIsomerGroups, ctptOf } from './isomerIndex';
import { FORMULAS, keyOf, type Formula } from '../data/formulas';
import { parseFormula } from './formula';

const chat = (khoa: string): Formula => FORMULAS.find((f) => keyOf(f) === khoa)!;
const tenDongPhan = (khoa: string) => isomersOf(chat(khoa)).map((x) => x.vi).sort();

describe('viết công thức phân tử theo quy ước Hill', () => {
  it('C trước, H sau, còn lại theo bảng chữ cái', () => {
    expect(hillFormula(parseFormula('CH3COOH').comp!)).toBe('C2H4O2');
    expect(hillFormula(parseFormula('C2H4O2').comp!)).toBe('C2H4O2');
    expect(hillFormula(parseFormula('H2NCH2COOH').comp!)).toBe('C2H5NO2');
    expect(hillFormula(parseFormula('H2SO4').comp!)).toBe('H2O4S');
  });

  it('hai cách viết khác nhau của cùng một chất cho cùng một chuỗi', () => {
    // đây chính là điều làm cho phép so đồng phân đáng tin
    expect(molecularFormula(chat('C57H110O6'))).toBe('C57H110O6'); // viết (C17H35COO)3C3H5
    expect(molecularFormula(chat('C2H5NO2'))).toBe('C2H5NO2'); // viết H2NCH2COOH
    expect(molecularFormula(chat('C3H8O3'))).toBe('C3H8O3'); // viết C3H5(OH)3
  });

  it('polime không xét đồng phân vì số mắt xích không xác định', () => {
    expect(molecularFormula(chat('(C2H4)n'))).toBeNull();
    expect(ctptOf(chat('(C2H4)n'))).toBeNull();
  });
});

describe('quan hệ đồng phân', () => {
  it('ba đường sáu cacbon là đồng phân của nhau', () => {
    expect(tenDongPhan('C6H12O6')).toEqual(['Fructozơ', 'Galactozơ']);
  });

  it('axit axetic và metyl fomat là đồng phân — cặp kinh điển của SGK', () => {
    expect(tenDongPhan('CH3COOH')).toEqual(['Metyl fomat']);
    expect(tenDongPhan('HCOOCH3')).toEqual(['Axit axetic (giấm)']);
  });

  it('quan hệ đồng phân là hai chiều', () => {
    for (const nhom of allIsomerGroups()) {
      for (const a of nhom.chat) {
        for (const b of isomersOf(a)) {
          expect(isomersOf(b).map(keyOf)).toContain(keyOf(a));
        }
      }
    }
  });

  it('không chất nào là đồng phân của chính nó', () => {
    for (const f of FORMULAS) {
      expect(isomersOf(f).map(keyOf)).not.toContain(keyOf(f));
    }
  });

  it('mọi chất trong một nhóm đều cùng công thức phân tử', () => {
    for (const nhom of allIsomerGroups()) {
      for (const c of nhom.chat) expect(molecularFormula(c)).toBe(nhom.ctpt);
    }
  });

  it('có đủ số nhóm đồng phân để dạy', () => {
    expect(allIsomerGroups().length).toBeGreaterThanOrEqual(11);
  });
});
