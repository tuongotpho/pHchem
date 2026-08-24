import { describe, it, expect } from 'vitest';
import { FACTS, factsForElement, factsForNhom, nhomCoThucTien } from './facts';
import { NHOM_CHAT } from './classes';
import { ELEMENTS, byNumber } from './elements';

describe('liên kết sự thật với nguyên tố', () => {
  it('mọi số hiệu gắn kèm đều là nguyên tố có thật (1-118)', () => {
    const sai: string[] = [];
    FACTS.forEach((f) => {
      f.el?.forEach((n) => {
        if (!byNumber(n)) sai.push(`${n} trong: ${f.vi.slice(0, 40)}`);
      });
    });
    expect(sai).toEqual([]);
  });

  it('không gắn trùng cùng một nguyên tố trong một câu', () => {
    const sai: string[] = [];
    FACTS.forEach((f) => {
      if (!f.el) return;
      if (new Set(f.el).size !== f.el.length) sai.push(f.vi.slice(0, 40));
    });
    expect(sai).toEqual([]);
  });

  it('có ít nhất 100 sự thật được gắn nguyên tố', () => {
    const soCau = FACTS.filter((f) => f.el && f.el.length > 0).length;
    expect(soCau).toBeGreaterThanOrEqual(100);
  });

  it('các nguyên tố quen thuộc đều có sự thật đi kèm', () => {
    // Những nguyên tố học sinh gặp nhiều nhất
    const quenThuoc = [
      1, 6, 7, 8, 11, 13, 16, 17, 20, 26, 29, 30, 47, 79, 80, 82,
      // bổ sung đợt 4 — chốt lại để sau này không ai xóa mất
      4, 5, 12, 18, 21, 23, 27, 32, 33, 34, 35, 36, 40, 42, 43, 45, 49, 50, 51,
      52, 54, 77, 81, 86,
    ];
    const thieu = quenThuoc.filter((n) => factsForElement(n).length === 0);
    expect(thieu).toEqual([]);
  });

  it('factsForElement trả đúng câu', () => {
    const fe = factsForElement(26); // Sắt
    expect(fe.length).toBeGreaterThan(0);
    fe.forEach((f) => expect(f.el).toContain(26));
  });

  it('sự thật về hydro không bị gán nhầm cho nguyên tố Vàng', () => {
    // Câu "natri cho ngọn lửa vàng" phải thuộc natri, không phải vàng
    const thuMauLua = FACTS.find((f) => f.vi.includes('Thử màu ngọn lửa'))!;
    expect(thuMauLua.el).toContain(11); // Na
    expect(thuMauLua.el).not.toContain(79); // KHÔNG phải Au
  });

  it('báo số nguyên tố đang có sự thật', () => {
    const coFact = ELEMENTS.filter((e) => factsForElement(e.n).length > 0);
    // chỉ ghi nhận con số, không ép ngưỡng
    expect(coFact.length).toBeGreaterThanOrEqual(69);
  });
});

describe('gắn mẩu thực tiễn với lớp chất', () => {
  it('mọi khóa lớp chất gắn trên mẩu đều là khóa CÓ THẬT', () => {
    // Gõ sai một chữ trong khóa thì liên kết chết lặng, không ai biết —
    // mở "Este" vẫn trống trơn mà chẳng có lỗi nào báo.
    const hong: string[] = [];
    for (const f of FACTS)
      for (const k of f.nhom ?? [])
        if (!(k in NHOM_CHAT)) hong.push(`${k} (trong: ${f.vi.slice(0, 40)}…)`);
    expect(hong).toEqual([]);
  });

  it('không mẩu nào gắn trùng một lớp chất hai lần', () => {
    const trung = FACTS.filter(
      (f) => f.nhom && new Set(f.nhom).size !== f.nhom.length,
    ).map((f) => f.vi.slice(0, 40));
    expect(trung).toEqual([]);
  });

  it('factsForNhom trả đúng mẩu đã gắn, không trả thừa', () => {
    for (const k of nhomCoThucTien()) {
      const ds = factsForNhom(k);
      expect(ds.length, k).toBeGreaterThan(0);
      expect(ds.every((f) => f.nhom!.includes(k)), k).toBe(true);
    }
  });

  it('mảng nhom rỗng thì coi như chưa gắn, đừng để lửng lơ', () => {
    const rong = FACTS.filter((f) => f.nhom && f.nhom.length === 0).map((f) =>
      f.vi.slice(0, 40),
    );
    expect(rong).toEqual([]);
  });

  it('lớp chất không có mẩu nào thì trả mảng rỗng, không nổ', () => {
    expect(factsForNhom('xeton')).toEqual([]);
    expect(factsForNhom('khong-ton-tai')).toEqual([]);
  });
});
