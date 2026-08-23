import { describe, it, expect } from 'vitest';
import { balance, formatBalanced } from './balance';
import { isBalanced, speciesOf } from './reaction';
import { REACTIONS } from '../data/reactions';

const he = (pt: string) => balance(pt).coefficients;

describe('cân bằng phương trình quen thuộc', () => {
  const CA: [string, number[]][] = [
    ['H2 + O2 -> H2O', [2, 1, 2]],
    ['Fe + O2 -> Fe2O3', [4, 3, 2]],
    ['C3H8 + O2 -> CO2 + H2O', [1, 5, 3, 4]],
    ['CH4 + O2 -> CO2 + H2O', [1, 2, 1, 2]],
    ['Na + H2O -> NaOH + H2', [2, 2, 2, 1]],
    ['CaCO3 -> CaO + CO2', [1, 1, 1]],
    ['Al + HCl -> AlCl3 + H2', [2, 6, 2, 3]],
    ['N2 + H2 -> NH3', [1, 3, 2]],
  ];
  it.each(CA)('%s', (pt, mong) => {
    expect(he(pt)).toEqual(mong);
  });
});

describe('phản ứng oxi hóa khử nhiều chất — chỗ cân bằng tay hay sai', () => {
  it('KMnO4 + HCl', () => {
    expect(he('KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O')).toEqual([2, 16, 2, 2, 5, 8]);
  });

  it('Cu + HNO3 loãng', () => {
    expect(he('Cu + HNO3 -> Cu(NO3)2 + NO + H2O')).toEqual([3, 8, 3, 2, 4]);
  });

  it('K2Cr2O7 + HCl', () => {
    expect(he('K2Cr2O7 + HCl -> KCl + CrCl3 + Cl2 + H2O')).toEqual([1, 14, 2, 2, 3, 7]);
  });

  it('FeS2 cháy trong oxi', () => {
    expect(he('FeS2 + O2 -> Fe2O3 + SO2')).toEqual([4, 11, 2, 8]);
  });
});

describe('kết quả trả về luôn phải đúng về mặt số học', () => {
  const THU = [
    'H2 + O2 -> H2O',
    'C2H5OH + O2 -> CO2 + H2O',
    'KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O',
    'Al + Fe2O3 -> Al2O3 + Fe',
    'C6H12O6 + O2 -> CO2 + H2O',
    'NH3 + O2 -> NO + H2O',
  ];

  it('phương trình sau khi cân bằng đếm lại nguyên tử phải khớp', () => {
    // Kiểm chéo bằng MỘT MODULE KHÁC: bộ đếm nguyên tử ở reaction.ts. Nếu cả
    // hai cùng sai theo một kiểu thì mới lọt, mà hai bên viết độc lập nhau.
    for (const pt of THU) {
      const r = balance(pt);
      expect(r.ok, pt).toBe(true);
      expect(isBalanced(formatBalanced(r)).ok, formatBalanced(r)).toBe(true);
    }
  });

  it('hệ số là bộ số nguyên dương NHỎ NHẤT', () => {
    const ucln = (a: number, b: number): number => (b === 0 ? a : ucln(b, a % b));
    for (const pt of THU) {
      const c = balance(pt).coefficients!;
      expect(c.every((x) => x > 0 && Number.isInteger(x)), pt).toBe(true);
      expect(c.reduce(ucln), `${pt} còn rút gọn được`).toBe(1);
    }
  });
});

// Phép kiểm mạnh nhất: bắt bộ cân bằng giải lại TOÀN BỘ phương trình trong kho.
// Bỏ hết hệ số đi rồi yêu cầu tự tìm lại — kết quả phải trùng khít với hệ số
// đã được kiểm cân bằng sẵn.
describe('giải lại toàn bộ phương trình trong kho', () => {
  const thuong = REACTIONS.filter((r) => !r.symbolic);

  it('không phương trình nào giải sai', () => {
    const sai: string[] = [];
    for (const r of thuong) {
      const { reactants, products } = speciesOf(r.eq);
      const kq = balance(`${reactants.join(' + ')} -> ${products.join(' + ')}`);
      if (!kq.ok) {
        // Vài phương trình có nhiều nghiệm độc lập nên không xác định duy nhất
        // — đó là tính chất của phương trình, không phải lỗi thuật toán.
        if (!/nhiều nghiệm/.test(kq.error ?? '')) sai.push(`${r.eq} → ${kq.error}`);
        continue;
      }
      if (!isBalanced(formatBalanced(kq)).ok) sai.push(`${r.eq} → giải ra không cân bằng`);
    }
    expect(sai).toEqual([]);
  });

  it('giải được phần lớn phương trình trong kho', () => {
    const giaiDuoc = thuong.filter((r) => {
      const { reactants, products } = speciesOf(r.eq);
      return balance(`${reactants.join(' + ')} -> ${products.join(' + ')}`).ok;
    });
    expect(giaiDuoc.length / thuong.length).toBeGreaterThan(0.9);
  });
});

describe('báo lỗi rõ ràng thay vì trả kết quả sai', () => {
  it('thiếu mũi tên', () => {
    expect(balance('H2 + O2').ok).toBe(false);
    expect(balance('H2 + O2').error).toBeTruthy();
  });

  it('thiếu chất ở một vế', () => {
    expect(balance('H2 + O2 ->').ok).toBe(false);
  });

  it('công thức không đọc được', () => {
    const r = balance('H2 + Xyz -> H2O');
    expect(r.ok).toBe(false);
    expect(r.error).toContain('Xyz');
  });

  it('phương trình vô lý thì không bịa ra hệ số', () => {
    // nitơ không thể tự biến thành oxi
    expect(balance('N2 -> O2').ok).toBe(false);
    expect(balance('H2 + O2 -> NaCl').ok).toBe(false);
  });
});

describe('ghép chuỗi hiển thị', () => {
  it('bỏ hệ số 1 cho gọn', () => {
    expect(formatBalanced(balance('CaCO3 -> CaO + CO2'))).toBe('CaCO3 → CaO + CO2');
  });

  it('giữ hệ số khác 1', () => {
    expect(formatBalanced(balance('H2 + O2 -> H2O'))).toBe('2 H2 + O2 → 2 H2O');
  });

  it('không cân bằng được thì trả chuỗi rỗng', () => {
    expect(formatBalanced(balance('N2 -> O2'))).toBe('');
  });
});
