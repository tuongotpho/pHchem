import { describe, it, expect } from 'vitest';
import { isBalanced, splitEquation, speciesOf } from './reaction';
import { REACTIONS, TYPE_META } from '../data/reactions';

describe('bộ đọc phương trình', () => {
  it('tách đúng hệ số và công thức', () => {
    const s = splitEquation('2 Na + 2 H2O → 2 NaOH + H2')!;
    expect(s.left).toEqual([
      { coef: 2, formula: 'Na' },
      { coef: 2, formula: 'H2O' },
    ]);
    expect(s.right).toEqual([
      { coef: 2, formula: 'NaOH' },
      { coef: 1, formula: 'H2' },
    ]);
  });

  it('phát hiện phương trình CHƯA cân bằng', () => {
    expect(isBalanced('H2 + O2 → H2O').ok).toBe(false);
    expect(isBalanced('Na + H2O → NaOH + H2').ok).toBe(false);
  });

  it('xác nhận phương trình đã cân bằng', () => {
    expect(isBalanced('2 H2 + O2 → 2 H2O').ok).toBe(true);
    expect(isBalanced('3 Cu + 8 HNO3 → 3 Cu(NO3)2 + 2 NO + 4 H2O').ok).toBe(true);
  });

  it('lấy đúng danh sách chất hai vế', () => {
    const s = speciesOf('CaCO3 + 2 HCl → CaCl2 + H2O + CO2');
    expect(s.reactants).toEqual(['CaCO3', 'HCl']);
    expect(s.products).toEqual(['CaCl2', 'H2O', 'CO2']);
  });
});

describe('kiểm toàn bộ cơ sở dữ liệu phản ứng', () => {
  const thuong = REACTIONS.filter((r) => !r.symbolic);

  it('MỌI phương trình đều cân bằng đúng', () => {
    const sai: string[] = [];
    thuong.forEach((r) => {
      const kq = isBalanced(r.eq);
      if (!kq.ok) sai.push(`${r.eq}  →  ${kq.error ?? kq.lech?.join('; ')}`);
    });
    expect(sai).toEqual([]);
  });

  it('không có phương trình nào trùng nhau', () => {
    const set = new Set(REACTIONS.map((r) => r.eq));
    expect(set.size).toBe(REACTIONS.length);
  });

  it('mọi phản ứng đều có ít nhất một phân loại hợp lệ', () => {
    const sai: string[] = [];
    REACTIONS.forEach((r) => {
      if (!r.type.length) sai.push(`${r.eq}: thiếu phân loại`);
      r.type.forEach((t) => {
        if (!TYPE_META[t]) sai.push(`${r.eq}: phân loại lạ "${t}"`);
      });
    });
    expect(sai).toEqual([]);
  });

  it('phản ứng đánh dấu tạo kết tủa thì phải có mô tả hiện tượng', () => {
    const thieu = REACTIONS.filter(
      (r) => r.type.includes('precipitation') && !r.phen_vi,
    ).map((r) => r.eq);
    expect(thieu).toEqual([]);
  });

  it('phương trình ion rút gọn cũng phải cân bằng nguyên tố', () => {
    const sai: string[] = [];
    REACTIONS.filter((r) => r.ionic).forEach((r) => {
      // bỏ ký hiệu điện tích để chỉ kiểm số nguyên tử
      const sach = r.ionic!.replace(/[⁺⁻¹²³⁴]/g, '');
      const kq = isBalanced(sach);
      if (!kq.ok) sai.push(`${r.ionic}  →  ${kq.error ?? kq.lech?.join('; ')}`);
    });
    expect(sai).toEqual([]);
  });

  it('có đủ số lượng và phủ nhiều loại phản ứng', () => {
    expect(REACTIONS.length).toBeGreaterThanOrEqual(120);
    const loai = new Set(REACTIONS.flatMap((r) => r.type));
    expect(loai.size).toBeGreaterThanOrEqual(12);
  });
});
