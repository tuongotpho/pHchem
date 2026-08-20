import { describe, it, expect } from 'vitest';
import { ELEMENTS } from './elements';
import { DETAILS } from './elements.details';

describe('dữ liệu chi tiết nguyên tố', () => {
  it('phủ đủ 118 nguyên tố', () => {
    expect(Object.keys(DETAILS).length).toBe(118);
    ELEMENTS.forEach((e) => expect(DETAILS[e.n]).toBeDefined());
  });

  it('nhiệt độ nóng chảy luôn thấp hơn nhiệt độ sôi', () => {
    const sai: string[] = [];
    ELEMENTS.forEach((e) => {
      const d = DETAILS[e.n];
      if (d.melt !== null && d.boil !== null && d.melt >= d.boil) {
        // Asen thăng hoa: sôi (thăng hoa) thấp hơn nóng chảy dưới áp suất thường
        if (e.sym !== 'As') sai.push(`${e.sym}: ${d.melt} >= ${d.boil}`);
      }
    });
    expect(sai).toEqual([]);
  });

  it('trạng thái ở 25°C khớp nhiệt độ nóng chảy/sôi', () => {
    const sai: string[] = [];
    ELEMENTS.forEach((e) => {
      const d = DETAILS[e.n];
      if (d.melt === null || d.boil === null) return;
      const expected = d.melt > 25 ? 's' : d.boil > 25 ? 'l' : 'g';
      if (d.state !== expected) sai.push(`${e.sym}: ghi ${d.state}, tính ra ${expected}`);
    });
    expect(sai).toEqual([]);
  });

  it('mốc quen thuộc đúng', () => {
    const by = (sym: string) => DETAILS[ELEMENTS.find((e) => e.sym === sym)!.n];
    expect(by('Fe').melt).toBe(1538);
    expect(by('Hg').state).toBe('l');
    expect(by('Br').state).toBe('l');
    expect(by('O').state).toBe('g');
    expect(by('Au').disc).toBe(0); // biết từ thời cổ đại
    expect(by('F').en).toBe(3.98); // âm điện lớn nhất
  });

  it('cacbon nóng chảy cao nhất trong mọi nguyên tố', () => {
    const max = ELEMENTS.map((e) => DETAILS[e.n])
      .filter((d) => d.melt !== null)
      .reduce((a, b) => (a.melt! > b.melt! ? a : b));
    expect(max.melt).toBe(DETAILS[6].melt); // C = 3550 độ C
  });

  it('wolfram nóng chảy cao nhất trong các KIM LOẠI', () => {
    const kimLoai = ELEMENTS.filter((e) =>
      ['transition', 'post-transition', 'alkali', 'alkaline', 'lanthanide', 'actinide'].includes(e.cat),
    );
    const max = kimLoai
      .map((e) => DETAILS[e.n])
      .filter((d) => d.melt !== null)
      .reduce((a, b) => (a.melt! > b.melt! ? a : b));
    expect(max.melt).toBe(DETAILS[74].melt); // W = 3422 độ C
  });

  it('flo có độ âm điện lớn nhất', () => {
    const max = ELEMENTS.map((e) => DETAILS[e.n])
      .filter((d) => d.en !== null)
      .reduce((a, b) => (a.en! > b.en! ? a : b));
    expect(max.en).toBe(3.98);
  });

  it('nguyên tố siêu nặng 104-118 để trống thay vì bịa số', () => {
    for (let n = 104; n <= 118; n++) {
      expect(DETAILS[n].melt).toBeNull();
      expect(DETAILS[n].density).toBeNull();
      expect(DETAILS[n].disc).not.toBeNull(); // năm phát hiện thì có thật
    }
  });

  it('mọi nguyên tố đều có ghi chú ứng dụng hai thứ tiếng', () => {
    ELEMENTS.forEach((e) => {
      expect(DETAILS[e.n].use_vi.length).toBeGreaterThan(5);
      expect(DETAILS[e.n].use_en.length).toBeGreaterThan(5);
    });
  });
});
