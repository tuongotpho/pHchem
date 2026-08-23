import { describe, it, expect } from 'vitest';
import {
  DAY_DIEN_HOA,
  VI_TRI_HIDRO,
  capTheoKimLoai,
  coDayDuoc,
  tanTrongAxitLoang,
} from './electro';
import { ELEMENTS } from './elements';

describe('dãy điện hóa xếp đúng thứ tự', () => {
  it('thế điện cực tăng dần từ đầu đến cuối dãy', () => {
    // Đây là điều kiện làm nên toàn bộ ý nghĩa của dãy — xếp sai một chỗ là
    // mọi kết luận đẩy kim loại đều sai theo.
    const sai: string[] = [];
    for (let i = 1; i < DAY_DIEN_HOA.length; i++)
      if (DAY_DIEN_HOA[i].E < DAY_DIEN_HOA[i - 1].E)
        sai.push(`${DAY_DIEN_HOA[i - 1].kimLoai} → ${DAY_DIEN_HOA[i].kimLoai}`);
    expect(sai).toEqual([]);
  });

  it('hiđro nằm đúng mốc 0 vôn', () => {
    expect(DAY_DIEN_HOA[VI_TRI_HIDRO].E).toBe(0);
    expect(DAY_DIEN_HOA[VI_TRI_HIDRO].kimLoai).toBe('H2');
  });

  it('mọi ký hiệu nguyên tố đều có thật trong bảng tuần hoàn', () => {
    const co = new Set(ELEMENTS.map((e) => e.sym));
    const la = DAY_DIEN_HOA.filter((c) => c.sym && !co.has(c.sym)).map((c) => c.sym);
    expect(la).toEqual([]);
  });

  it('không cặp nào trùng nhau', () => {
    const k = DAY_DIEN_HOA.map((c) => c.ion + '/' + c.kimLoai);
    expect(new Set(k).size).toBe(k.length);
  });
});

describe('kim loại nào đẩy được kim loại nào', () => {
  it('sắt đẩy được đồng ra khỏi dung dịch muối', () => {
    const r = coDayDuoc('Fe', 'Cu');
    expect(r.xayRa).toBe(true);
    expect(r.ptIon).toBe('Fe + Cu²⁺ → Fe²⁺ + Cu');
    expect(r.E).toBeCloseTo(0.78, 2);
  });

  it('đồng KHÔNG đẩy được sắt — chiều ngược lại không xảy ra', () => {
    const r = coDayDuoc('Cu', 'Fe');
    expect(r.xayRa).toBe(false);
    expect(r.E!).toBeLessThan(0);
  });

  it('đồng đẩy được bạc', () => {
    const r = coDayDuoc('Cu', 'Ag');
    expect(r.xayRa).toBe(true);
    // Cu nhường 2 electron, mỗi Ag⁺ nhận 1 nên cần 2 Ag⁺
    expect(r.ptIon).toBe('Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag');
  });

  it('cân bằng electron đúng khi số electron khác nhau', () => {
    // Al nhường 3, Cu²⁺ nhận 2 → bội chung nhỏ nhất là 6
    expect(coDayDuoc('Al', 'Cu').ptIon).toBe('2 Al + 3 Cu²⁺ → 2 Al³⁺ + 3 Cu');
  });

  it('cùng một kim loại thì không có phản ứng', () => {
    expect(coDayDuoc('Fe', 'Fe').xayRa).toBe(false);
  });

  it('kim loại không có trong dãy thì báo chưa có số liệu', () => {
    const r = coDayDuoc('Xx', 'Cu');
    expect(r.xayRa).toBe(false);
    expect(r.E).toBeUndefined();
  });

  it('quan hệ đẩy là một chiều: A đẩy B thì B không đẩy A', () => {
    const kl = DAY_DIEN_HOA.filter((c) => c.sym !== null).map((c) => c.kimLoai);
    for (const a of kl)
      for (const b of kl)
        if (a !== b && coDayDuoc(a, b).xayRa)
          expect(coDayDuoc(b, a).xayRa, `${a} và ${b} đẩy được nhau cả hai chiều`).toBe(false);
  });
});

describe('kim loại tan trong axit loãng', () => {
  it('kim loại đứng trước hiđro thì tan và giải phóng H2', () => {
    for (const m of ['K', 'Mg', 'Al', 'Zn', 'Fe', 'Pb']) expect(tanTrongAxitLoang(m)).toBe(true);
  });

  it('kim loại đứng sau hiđro thì không tan trong axit loãng', () => {
    for (const m of ['Cu', 'Ag', 'Hg', 'Pt', 'Au']) expect(tanTrongAxitLoang(m)).toBe(false);
  });

  it('khớp đúng với mốc hiđro trong dãy', () => {
    for (const c of DAY_DIEN_HOA) {
      if (c.sym === null) continue;
      const truocHidro = DAY_DIEN_HOA.indexOf(c) < VI_TRI_HIDRO;
      expect(tanTrongAxitLoang(c.kimLoai), c.kimLoai).toBe(truocHidro);
    }
  });
});

describe('tra cứu', () => {
  it('tìm được cặp theo tên kim loại', () => {
    expect(capTheoKimLoai('Zn')?.E).toBeCloseTo(-0.76, 2);
    expect(capTheoKimLoai('Khongco')).toBeUndefined();
  });
});
