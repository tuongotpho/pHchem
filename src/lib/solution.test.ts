import { describe, it, expect } from 'vitest';
import { convert, dilution, VM_STP, AVOGADRO } from './solution';
import { computePh, KW, ACIDS_BASES } from './ph';
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

describe('tính pH', () => {
  it('HCl 0,01 M cho pH = 2', () => {
    const r = computePh({ kind: 'strongAcid', C: 0.01 });
    expect(r.pH).toBeCloseTo(2, 5);
  });

  it('NaOH 0,01 M cho pH = 12', () => {
    const r = computePh({ kind: 'strongBase', C: 0.01 });
    expect(r.pH).toBeCloseTo(12, 5);
  });

  it('H2SO4 0,005 M (2 nấc) cho pH = 2', () => {
    const r = computePh({ kind: 'strongAcid', C: 0.005, z: 2 });
    expect(r.pH).toBeCloseTo(2, 5);
  });

  it('Ba(OH)2 0,005 M cho pH = 12', () => {
    const r = computePh({ kind: 'strongBase', C: 0.005, z: 2 });
    expect(r.pH).toBeCloseTo(12, 5);
  });

  // Sách thường ghi 2,87 vì dùng XẤP XỈ [H+] = √(Ka·Ca).
  // Giải đúng phương trình bậc hai cho 2,875 — ta lấy giá trị đúng.
  it('CH3COOH 0,1 M (Ka 1,8e-5) cho pH = 2,875', () => {
    const r = computePh({ kind: 'weakAcid', C: 0.1, k: 1.8e-5 });
    expect(r.pH).toBeCloseTo(2.875, 3);
  });

  it('nghiệm đúng lệch nhẹ so với xấp xỉ căn bậc hai quen thuộc', () => {
    const Ca = 0.1;
    const Ka = 1.8e-5;
    const xapXi = -Math.log10(Math.sqrt(Ka * Ca)); // cách tính trong sách
    const dung = computePh({ kind: 'weakAcid', C: Ca, k: Ka }).pH;
    expect(xapXi).toBeCloseTo(2.872, 3);
    expect(dung).toBeGreaterThan(xapXi); // nghiệm đúng luôn cao hơn một chút
    expect(dung - xapXi).toBeLessThan(0.01); // nhưng chênh không đáng kể
  });

  it('NH3 0,1 M (Kb 1,8e-5) cho pH = 11,125', () => {
    const r = computePh({ kind: 'weakBase', C: 0.1, k: 1.8e-5 });
    expect(r.pH).toBeCloseTo(11.125, 3);
  });

  // BẪY KINH ĐIỂN: dùng pH = -log(C) sẽ ra 8 — axit mà lại có tính bazơ, vô lý.
  it('HCl 1e-8 M cho pH khoảng 6,98 chứ KHÔNG phải 8', () => {
    const r = computePh({ kind: 'strongAcid', C: 1e-8 });
    expect(r.pH).toBeGreaterThan(6.9);
    expect(r.pH).toBeLessThan(7); // vẫn là axit
    expect(r.pH).toBeCloseTo(6.98, 2);
  });

  it('NaOH 1e-8 M cho pH hơi trên 7 chứ không phải 6', () => {
    const r = computePh({ kind: 'strongBase', C: 1e-8 });
    expect(r.pH).toBeGreaterThan(7);
    expect(r.pH).toBeLessThan(7.1);
  });

  it('luôn thỏa pH + pOH = 14', () => {
    const cases = [
      { kind: 'strongAcid' as const, C: 0.1 },
      { kind: 'weakAcid' as const, C: 0.05, k: 1.8e-5 },
      { kind: 'strongBase' as const, C: 0.2, z: 2 },
      { kind: 'weakBase' as const, C: 0.01, k: 1.8e-5 },
    ];
    cases.forEach((c) => {
      const r = computePh(c);
      expect(r.pH + r.pOH).toBeCloseTo(14, 6);
    });
  });

  it('luôn thỏa [H+]·[OH-] = Kw', () => {
    const r = computePh({ kind: 'weakAcid', C: 0.1, k: 1.8e-5 });
    expect(r.h * r.oh).toBeCloseTo(KW, 20);
  });

  it('axit yếu luôn có pH cao hơn axit mạnh cùng nồng độ', () => {
    const manh = computePh({ kind: 'strongAcid', C: 0.1 });
    const yeu = computePh({ kind: 'weakAcid', C: 0.1, k: 1.8e-5 });
    expect(yeu.pH).toBeGreaterThan(manh.pH);
  });

  it('báo lỗi khi thiếu hằng số phân li của chất yếu', () => {
    expect(() => computePh({ kind: 'weakAcid', C: 0.1 })).toThrow();
    expect(() => computePh({ kind: 'strongAcid', C: 0 })).toThrow();
  });

  it('mọi chất trong danh sách đều tính được pH', () => {
    ACIDS_BASES.forEach((ab) => {
      const r = computePh({ kind: ab.kind, C: 0.01, z: ab.z, k: ab.k });
      expect(Number.isFinite(r.pH)).toBe(true);
      expect(r.pH).toBeGreaterThan(-2);
      expect(r.pH).toBeLessThan(16);
    });
  });
});

describe('bất biến pH — mọi axit đều phải chua, mọi bazơ đều phải kiềm', () => {
  const nongDo = [1, 0.1, 0.01, 1e-3, 1e-5, 1e-6, 1e-7, 1e-8, 1e-9, 1e-10];

  it('mọi AXIT ở mọi nồng độ đều cho pH < 7', () => {
    const sai: string[] = [];
    ACIDS_BASES.filter((a) => a.kind.includes('Acid')).forEach((ab) => {
      nongDo.forEach((C) => {
        const r = computePh({ kind: ab.kind, C, z: ab.z, k: ab.k });
        if (r.pH >= 7) sai.push(`${ab.formula} ${C}M -> pH ${r.pH.toFixed(2)}`);
      });
    });
    expect(sai).toEqual([]);
  });

  it('mọi BAZƠ ở mọi nồng độ đều cho pH > 7', () => {
    const sai: string[] = [];
    ACIDS_BASES.filter((a) => a.kind.includes('Base')).forEach((ab) => {
      nongDo.forEach((C) => {
        const r = computePh({ kind: ab.kind, C, z: ab.z, k: ab.k });
        if (r.pH <= 7) sai.push(`${ab.formula} ${C}M -> pH ${r.pH.toFixed(2)}`);
      });
    });
    expect(sai).toEqual([]);
  });

  it('pha càng loãng thì pH càng tiến về 7, không bao giờ vượt qua', () => {
    let truoc = computePh({ kind: 'weakAcid', C: 1, k: 1.8e-5 }).pH;
    [0.1, 0.01, 1e-4, 1e-6, 1e-8, 1e-10].forEach((C) => {
      const nay = computePh({ kind: 'weakAcid', C, k: 1.8e-5 }).pH;
      expect(nay).toBeGreaterThan(truoc); // loãng dần thì pH tăng dần
      expect(nay).toBeLessThan(7); // nhưng vẫn là axit
      truoc = nay;
    });
  });

  it('axit yếu rất loãng hành xử gần như axit mạnh cùng nồng độ', () => {
    // Ka >> Ca thì coi như phân li hoàn toàn
    const yeu = computePh({ kind: 'weakAcid', C: 1e-8, k: 1.8e-5 }).pH;
    const manh = computePh({ kind: 'strongAcid', C: 1e-8 }).pH;
    expect(Math.abs(yeu - manh)).toBeLessThan(0.01);
  });
});
