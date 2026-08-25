import { describe, it, expect } from 'vitest';
import { CATIONS, ANIONS, MATRIX, buildFormula, MAU_KET_TUA, mauKetTua } from './solubility';

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
    ['Na', 'CH3COO', 'CH3COONa'],
    ['Ca', 'CH3COO', '(CH3COO)2Ca'],
    ['Pb', 'I', 'PbI2'],
    ['Na', 'SO3', 'Na2SO3'],
    ['Ca', 'SiO3', 'CaSiO3'],
  ];
  it.each(cases)('%s + %s = %s', (c, a, expected) => {
    expect(buildFormula(cat(c), an(a))).toBe(expected);
  });
});

describe('ma trận độ tan', () => {
  it('ma trận đủ ô cho mọi cặp cation-anion', () => {
    expect(MATRIX.length).toBe(CATIONS.length);
    MATRIX.forEach((row) => expect(row.length).toBe(ANIONS.length));
  });
  it('mọi muối nitrat đều tan', () => {
    const i = ANIONS.findIndex((a) => a.ascii === 'NO3');
    MATRIX.forEach((row) => expect(row[i]).toBe('T'));
  });
  it('mọi muối axetat đều tan hoặc ít tan, không có ô kết tủa', () => {
    const i = ANIONS.findIndex((a) => a.ascii === 'CH3COO');
    MATRIX.forEach((row) => expect(['T', 'IT']).toContain(row[i]));
  });
  it('Cu2+ và Fe3+ không cùng tồn tại với I- vì oxi hóa iotua thành iot', () => {
    const i = ANIONS.findIndex((a) => a.ascii === 'I');
    expect(MATRIX[CATIONS.findIndex((c) => c.ascii === 'Cu')][i]).toBe('-');
    expect(MATRIX[CATIONS.findIndex((c) => c.ascii === 'Fe3')][i]).toBe('-');
  });
  it('silicat chỉ tan với natri và kali', () => {
    const i = ANIONS.findIndex((a) => a.ascii === 'SiO3');
    CATIONS.forEach((c, r) => {
      if (c.ascii === 'Na' || c.ascii === 'K') expect(MATRIX[r][i]).toBe('T');
      else expect(MATRIX[r][i]).not.toBe('T');
    });
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

describe('màu kết tủa', () => {
  it('mỗi màu phải trỏ tới một ô KẾT TỦA có thật trong bảng', () => {
    // Ghép hết công thức của những ô không tan / ít tan.
    const coKetTua = new Set<string>();
    CATIONS.forEach((c, i) =>
      ANIONS.forEach((a, j) => {
        const o = MATRIX[i][j];
        if (o === 'I' || o === 'IT') coKetTua.add(buildFormula(c, a));
      }),
    );
    // Khóa nào không khớp ô nào là rác: hoặc gõ sai công thức, hoặc ô đã đổi
    // sang "tan" mà quên gỡ màu. Cả hai đều làm app nói sai.
    const treo = Object.keys(MAU_KET_TUA).filter((ct) => !coKetTua.has(ct));
    expect(treo).toEqual([]);
  });

  it('không chất nào bị bỏ trống nửa vời: có tên màu thì phải có mã màu', () => {
    const thieu: string[] = [];
    for (const [ct, m] of Object.entries(MAU_KET_TUA)) {
      if (!m.vi.trim() || !m.en.trim()) thieu.push(`${ct}: thiếu tên màu`);
      if (!/^#[0-9a-f]{6}$/i.test(m.css)) thieu.push(`${ct}: mã màu sai dạng`);
    }
    expect(thieu).toEqual([]);
  });

  it('bộ ba màu kinh điển của bài nhận biết phải đúng', () => {
    // Ba chất này là xương sống của mọi bài nhận biết ở phổ thông. Sai một
    // trong ba là app dạy sai điều cơ bản nhất.
    expect(mauKetTua('Cu(OH)2')?.vi).toBe('xanh lam');
    expect(mauKetTua('Fe(OH)3')?.vi).toBe('nâu đỏ');
    expect(mauKetTua('Fe(OH)2')?.vi).toBe('trắng xanh');
    // Và ba halogenua bạc, cũng kinh điển không kém
    expect(mauKetTua('AgCl')?.vi).toBe('trắng');
    expect(mauKetTua('AgBr')?.vi).toBe('vàng nhạt');
    expect(mauKetTua('AgI')?.vi).toBe('vàng');
  });

  it('chất TAN thì không được gán màu kết tủa', () => {
    // NaCl, KNO3… tan hết, không có kết tủa nào để mà nói màu.
    for (const ct of ['NaCl', 'KNO3', 'Na2CO3', 'NH4Cl']) {
      expect(mauKetTua(ct)).toBeNull();
    }
  });
});
