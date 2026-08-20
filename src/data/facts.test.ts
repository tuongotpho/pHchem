import { describe, it, expect } from 'vitest';
import { FACTS, factsForElement } from './facts';
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
    const quenThuoc = [1, 6, 7, 8, 11, 13, 16, 17, 20, 26, 29, 30, 47, 79, 80, 82];
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
    expect(coFact.length).toBeGreaterThan(40);
  });
});
