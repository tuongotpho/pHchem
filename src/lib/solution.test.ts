import { describe, it, expect } from 'vitest';
import { convert, dilution, VM_STP, AVOGADRO } from './solution';
// Phép kiểm cho phần tính pH nằm ở ph.test.ts — cùng chỗ với module ph.ts.
import { parseFormula } from './formula';

describe('chuyển đổi mol - khối lượng - thể tích - nồng độ', () => {
  const M_H2O = parseFormula('H2O').mass!;

  it('18 g nước là 1 mol', () => {
    const r = convert({ M: M_H2O, known: 'mass', value: M_H2O });
    expect(r.moles).toBeCloseTo(1, 6);
  });

  it('1 mol khí chiếm 22,4 lít ở đktc', () => {
    const r = convert({ M: 32, known: 'moles', value: 1 });
    expect(r.gasVolume).toBeCloseTo(VM_STP, 6);
  });

  it('11,2 lít khí ở đktc là 0,5 mol', () => {
    const r = convert({ M: 32, known: 'gasVolume', value: 11.2 });
    expect(r.moles).toBeCloseTo(0.5, 6);
  });

  it('0,5 mol O2 nặng 16 g', () => {
    const M = parseFormula('O2').mass!;
    const r = convert({ M, known: 'moles', value: 0.5 });
    expect(r.mass).toBeCloseTo(16, 2);
  });

  it('tính nồng độ khi có thể tích dung dịch', () => {
    // 0,2 mol trong 500 mL = 0,4 M
    const r = convert({ M: 40, known: 'moles', value: 0.2, solutionVolume: 0.5 });
    expect(r.concentration).toBeCloseTo(0.4, 6);
  });

  it('không nhập thể tích dung dịch thì không có nồng độ', () => {
    const r = convert({ M: 40, known: 'moles', value: 0.2 });
    expect(r.concentration).toBeNull();
  });

  it('1 mol chứa 6,022×10²³ hạt', () => {
    const r = convert({ M: 18, known: 'moles', value: 1 });
    expect(r.particles).toBeCloseTo(AVOGADRO, -18);
  });

  it('báo lỗi nếu khối lượng mol không hợp lệ', () => {
    expect(() => convert({ M: 0, known: 'mass', value: 5 })).toThrow();
  });
});

describe('pha loãng C1V1 = C2V2', () => {
  it('100 mL dung dịch 1 M pha thành 500 mL cho 0,2 M', () => {
    const r = dilution(1, 0.1, null, 0.5);
    expect(r.field).toBe('c2');
    expect(r.value).toBeCloseTo(0.2, 6);
  });

  it('tính thể tích cần lấy từ dung dịch gốc', () => {
    // muốn 250 mL dung dịch 0,1 M từ dung dịch 2 M
    const r = dilution(2, null, 0.1, 0.25);
    expect(r.field).toBe('v1');
    expect(r.value).toBeCloseTo(0.0125, 6); // 12,5 mL
  });

  it('tính thể tích sau khi pha', () => {
    const r = dilution(2, 0.05, 0.5, null);
    expect(r.field).toBe('v2');
    expect(r.value).toBeCloseTo(0.2, 6);
  });

  it('bắt buộc để trống đúng một ô', () => {
    expect(() => dilution(1, 0.1, 0.2, 0.5)).toThrow();
    expect(() => dilution(1, null, null, 0.5)).toThrow();
  });
});
