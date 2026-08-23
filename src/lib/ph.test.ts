import { describe, it, expect } from 'vitest';
import {
  KW,
  strongAcidH,
  weakAcidH,
  computePh,
  ACIDS_BASES,
} from './ph';

const pH = (h: number) => -Math.log10(h);

describe('axit mạnh, bazơ mạnh ở nồng độ thường', () => {
  it('HCl 0,1 M cho pH = 1', () => {
    expect(pH(strongAcidH(0.1))).toBeCloseTo(1, 6);
  });

  it('NaOH 0,01 M cho pH = 12', () => {
    const r = computePh({ kind: 'strongBase', C: 0.01 });
    expect(r.pH).toBeCloseTo(12, 6);
  });

  it('axit hai nấc tính đúng số H+ nhường ra', () => {
    // H2SO4 0,05 M coi cả hai nấc đều mạnh → [H+] = 0,1 → pH = 1
    const r = computePh({ kind: 'strongAcid', C: 0.05, z: 2 });
    expect(r.pH).toBeCloseTo(1, 6);
  });

  it('Ba(OH)2 0,005 M cho pH = 12', () => {
    const r = computePh({ kind: 'strongBase', C: 0.005, z: 2 });
    expect(r.pH).toBeCloseTo(12, 6);
  });
});

// Đây là điều trang Cài đặt hứa: "giải đúng phương trình cân bằng, kể cả ở
// nồng độ rất loãng". Nhóm test này chính là bằng chứng cho lời hứa đó.
describe('nồng độ rất loãng — chỗ cách tính tắt cho kết quả vô lý', () => {
  it('axit mạnh 10⁻⁸ M vẫn có tính AXIT, không hóa bazơ', () => {
    const r = computePh({ kind: 'strongAcid', C: 1e-8 });
    // Cách tính tắt pH = -log(C) sẽ cho pH = 8, tức dung dịch AXIT lại hóa BAZƠ
    expect(r.pH).toBeLessThan(7);
    expect(r.pH).toBeCloseTo(6.98, 2);
  });

  it('bazơ mạnh 10⁻⁸ M vẫn có tính BAZƠ, không hóa axit', () => {
    const r = computePh({ kind: 'strongBase', C: 1e-8 });
    expect(r.pH).toBeGreaterThan(7);
    expect(r.pH).toBeCloseTo(7.02, 2);
  });

  it('axit yếu 10⁻⁸ M cũng phải có tính axit', () => {
    // Nghiệm bậc hai quen thuộc bỏ qua nước sẽ cho pH ≈ 8 — vô lý y hệt
    const r = computePh({ kind: 'weakAcid', C: 1e-8, k: 1.8e-5 });
    expect(r.pH).toBeLessThan(7);
  });

  it('pha loãng mãi thì tiến về nước tinh khiết, không vượt qua pH 7', () => {
    for (const C of [1e-9, 1e-10, 1e-12]) {
      const axit = computePh({ kind: 'strongAcid', C });
      const bazo = computePh({ kind: 'strongBase', C });
      expect(axit.pH).toBeLessThan(7);
      expect(axit.pH).toBeGreaterThan(6.9);
      expect(bazo.pH).toBeGreaterThan(7);
      expect(bazo.pH).toBeLessThan(7.1);
    }
  });
});

describe('axit yếu, bazơ yếu', () => {
  it('axit axetic 0,1 M cho pH ≈ 2,87', () => {
    const r = computePh({ kind: 'weakAcid', C: 0.1, k: 1.8e-5 });
    expect(r.pH).toBeCloseTo(2.875, 2);
  });

  it('amoniac 0,1 M cho pH ≈ 11,13', () => {
    const r = computePh({ kind: 'weakBase', C: 0.1, k: 1.8e-5 });
    expect(r.pH).toBeCloseTo(11.125, 2);
  });

  it('axit yếu luôn kém axit hơn axit mạnh cùng nồng độ', () => {
    for (const C of [1e-1, 1e-3, 1e-5]) {
      const yeu = computePh({ kind: 'weakAcid', C, k: 1.8e-5 });
      const manh = computePh({ kind: 'strongAcid', C });
      expect(yeu.pH).toBeGreaterThan(manh.pH);
    }
  });

  it('Ka càng lớn thì axit càng mạnh', () => {
    const a = computePh({ kind: 'weakAcid', C: 0.1, k: 1e-3 });
    const b = computePh({ kind: 'weakAcid', C: 0.1, k: 1e-7 });
    expect(a.pH).toBeLessThan(b.pH);
  });

  it('nghiệm trả về đúng là nghiệm của phương trình bậc ba', () => {
    // Kiểm thẳng vào định nghĩa: thay h vào phương trình phải ra xấp xỉ 0
    for (const [C, Ka] of [
      [0.1, 1.8e-5],
      [1e-4, 6.2e-10],
      [2, 7.5e-3],
    ]) {
      const h = weakAcidH(C, Ka);
      const f = h ** 3 + Ka * h * h - (Ka * C + KW) * h - Ka * KW;
      // so với bậc lớn nhất của các số hạng để phép so không phụ thuộc thang đo
      const thangDo = Math.max(h ** 3, Ka * h * h, (Ka * C + KW) * h, Ka * KW);
      expect(Math.abs(f) / thangDo).toBeLessThan(1e-6);
    }
  });
});

describe('các quan hệ luôn phải đúng', () => {
  const truongHop = [
    { kind: 'strongAcid' as const, C: 0.1 },
    { kind: 'strongAcid' as const, C: 1e-8 },
    { kind: 'strongBase' as const, C: 0.5 },
    { kind: 'weakAcid' as const, C: 0.02, k: 1.8e-5 },
    { kind: 'weakBase' as const, C: 0.02, k: 4.4e-4 },
  ];

  it('pH + pOH = 14', () => {
    for (const t of truongHop) {
      const r = computePh(t);
      expect(r.pH + r.pOH).toBeCloseTo(14, 6);
    }
  });

  it('[H+]·[OH-] = Kw', () => {
    for (const t of truongHop) {
      const r = computePh(t);
      expect(r.h * r.oh).toBeCloseTo(KW, 20);
    }
  });

  it('càng đặc thì axit càng mạnh, bazơ càng mạnh', () => {
    let truoc = Infinity;
    for (const C of [1e-6, 1e-4, 1e-2, 1]) {
      const p = computePh({ kind: 'strongAcid', C }).pH;
      expect(p).toBeLessThan(truoc);
      truoc = p;
    }
  });

  it('axit mạnh và bazơ mạnh đối xứng nhau qua pH 7', () => {
    for (const C of [1e-2, 1e-5, 1e-8]) {
      const a = computePh({ kind: 'strongAcid', C }).pH;
      const b = computePh({ kind: 'strongBase', C }).pH;
      expect(a + b).toBeCloseTo(14, 6);
    }
  });

  it('công thức đã dùng luôn được ghi lại để học sinh thấy cách làm', () => {
    for (const t of truongHop) expect(computePh(t).formula.length).toBeGreaterThan(10);
  });
});

describe('báo lỗi đúng chỗ thay vì trả số sai', () => {
  it('nồng độ không dương thì báo lỗi', () => {
    expect(() => computePh({ kind: 'strongAcid', C: 0 })).toThrow();
    expect(() => computePh({ kind: 'strongAcid', C: -1 })).toThrow();
  });

  it('chất yếu mà thiếu hằng số phân li thì báo lỗi', () => {
    expect(() => computePh({ kind: 'weakAcid', C: 0.1 })).toThrow();
    expect(() => computePh({ kind: 'weakBase', C: 0.1, k: 0 })).toThrow();
  });
});

describe('kho axit/bazơ dựng sẵn', () => {
  it('chất yếu nào cũng phải có hằng số phân li, chất mạnh thì không cần', () => {
    for (const e of ACIDS_BASES) {
      const yeu = e.kind === 'weakAcid' || e.kind === 'weakBase';
      if (yeu) expect(e.k, `${e.formula} thiếu hằng số`).toBeGreaterThan(0);
      else expect(e.z ?? 1, `${e.formula} sai số nấc`).toBeGreaterThanOrEqual(1);
    }
  });

  it('mọi chất trong kho tính ra pH hợp lý ở 0,1 M', () => {
    for (const e of ACIDS_BASES) {
      const r = computePh({ kind: e.kind, C: 0.1, z: e.z, k: e.k });
      expect(Number.isFinite(r.pH), `${e.formula} cho pH không phải số`).toBe(true);
      expect(r.pH).toBeGreaterThan(-2);
      expect(r.pH).toBeLessThan(16);
      const laAxit = e.kind === 'strongAcid' || e.kind === 'weakAcid';
      if (laAxit) expect(r.pH, `${e.formula} phải có tính axit`).toBeLessThan(7);
      else expect(r.pH, `${e.formula} phải có tính bazơ`).toBeGreaterThan(7);
    }
  });

  it('không có công thức nào trùng nhau trong kho', () => {
    const ct = ACIDS_BASES.map((e) => e.formula);
    expect(new Set(ct).size).toBe(ct.length);
  });

  it('axit mạnh cùng số nấc thì cho cùng pH — vì đều phân li hoàn toàn', () => {
    const p = ACIDS_BASES.filter((e) => e.kind === 'strongAcid' && (e.z ?? 1) === 1).map(
      (e) => computePh({ kind: e.kind, C: 0.1, z: e.z }).pH,
    );
    for (const x of p) expect(x).toBeCloseTo(p[0], 10);
  });
});

// Những phép kiểm dưới đây vốn nằm ở solution.test.ts. Chuyển về đây cho đúng
// chỗ: bộ kiểm của module nào nằm cạnh module đó.
describe('so với cách tính xấp xỉ trong sách', () => {
  it('nghiệm đúng lệch nhẹ so với xấp xỉ căn bậc hai quen thuộc', () => {
    const Ca = 0.1;
    const Ka = 1.8e-5;
    const xapXi = -Math.log10(Math.sqrt(Ka * Ca)); // cách tính trong sách
    const dung = computePh({ kind: 'weakAcid', C: Ca, k: Ka }).pH;
    expect(xapXi).toBeCloseTo(2.872, 3);
    expect(dung).toBeGreaterThan(xapXi); // nghiệm đúng luôn cao hơn một chút
    expect(dung - xapXi).toBeLessThan(0.01); // nhưng chênh không đáng kể
  });

  it('axit yếu rất loãng hành xử gần như axit mạnh cùng nồng độ', () => {
    // Ka lớn hơn hẳn Ca thì coi như phân li hoàn toàn
    const yeu = computePh({ kind: 'weakAcid', C: 1e-8, k: 1.8e-5 }).pH;
    const manh = computePh({ kind: 'strongAcid', C: 1e-8 }).pH;
    expect(Math.abs(yeu - manh)).toBeLessThan(0.01);
  });
});

describe('bất biến — mọi axit đều phải chua, mọi bazơ đều phải kiềm', () => {
  // Quét rộng: mọi chất trong kho, mười mức nồng độ trải từ đặc tới cực loãng.
  const nongDo = [1, 0.1, 0.01, 1e-3, 1e-5, 1e-6, 1e-7, 1e-8, 1e-9, 1e-10];

  it('mọi AXIT ở mọi nồng độ đều cho pH < 7', () => {
    const sai: string[] = [];
    for (const ab of ACIDS_BASES.filter((a) => a.kind.includes('Acid')))
      for (const C of nongDo) {
        const r = computePh({ kind: ab.kind, C, z: ab.z, k: ab.k });
        if (r.pH >= 7) sai.push(`${ab.formula} ${C}M -> pH ${r.pH.toFixed(2)}`);
      }
    expect(sai).toEqual([]);
  });

  it('mọi BAZƠ ở mọi nồng độ đều cho pH > 7', () => {
    const sai: string[] = [];
    for (const ab of ACIDS_BASES.filter((a) => a.kind.includes('Base')))
      for (const C of nongDo) {
        const r = computePh({ kind: ab.kind, C, z: ab.z, k: ab.k });
        if (r.pH <= 7) sai.push(`${ab.formula} ${C}M -> pH ${r.pH.toFixed(2)}`);
      }
    expect(sai).toEqual([]);
  });

  it('pha càng loãng thì pH càng tiến về 7, không bao giờ vượt qua', () => {
    let truoc = computePh({ kind: 'weakAcid', C: 1, k: 1.8e-5 }).pH;
    for (const C of [0.1, 0.01, 1e-4, 1e-6, 1e-8, 1e-10]) {
      const nay = computePh({ kind: 'weakAcid', C, k: 1.8e-5 }).pH;
      expect(nay).toBeGreaterThan(truoc); // loãng dần thì pH tăng dần
      expect(nay).toBeLessThan(7); // nhưng vẫn là axit
      truoc = nay;
    }
  });
});
