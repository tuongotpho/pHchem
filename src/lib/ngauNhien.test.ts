import { describe, it, expect } from 'vitest';
import { taoRng, tron, chon } from './ngauNhien';

describe('taoRng — cùng hạt phải cho cùng kết quả', () => {
  it('hai bộ cùng hạt ra dãy số y hệt nhau', () => {
    // Đây là điều kiện để "mã đề" có nghĩa: thầy đọc một con số, cả lớp mở ra
    // đúng bộ câu ấy. Hỏng chỗ này thì mã đề thành vô nghĩa mà không ai thấy.
    const a = taoRng(12345);
    const b = taoRng(12345);
    const day = (r: () => number) => Array.from({ length: 8 }, r);
    expect(day(a)).toEqual(day(b));
  });

  it('hạt khác nhau thì dãy khác nhau', () => {
    const day = (h: number) => Array.from({ length: 8 }, taoRng(h));
    expect(day(1)).not.toEqual(day(2));
  });

  it('số trả về luôn nằm trong [0, 1)', () => {
    const r = taoRng(999);
    for (let i = 0; i < 500; i++) {
      const x = r();
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });
});

describe('tron — xáo mảng', () => {
  const goc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('KHÔNG đụng vào mảng gốc', () => {
    tron(taoRng(1), goc);
    expect(goc).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('giữ đủ phần tử, không mất không thêm', () => {
    // Trộn đề mà mất một câu thì học sinh làm thiếu, mà đề vẫn chạy bình thường.
    const ra = tron(taoRng(7), goc);
    expect(ra).toHaveLength(goc.length);
    expect([...ra].sort((a, b) => a - b)).toEqual(goc);
  });

  it('cùng hạt thì trộn ra cùng thứ tự', () => {
    expect(tron(taoRng(42), goc)).toEqual(tron(taoRng(42), goc));
  });

  it('mảng rỗng và một phần tử không làm sập', () => {
    expect(tron(taoRng(1), [])).toEqual([]);
    expect(tron(taoRng(1), ['x'])).toEqual(['x']);
  });
});

describe('chon — rút một phần tử', () => {
  it('rút được phần tử có thật trong mảng', () => {
    const ds = ['a', 'b', 'c'];
    for (let i = 0; i < 30; i++) expect(ds).toContain(chon(taoRng(i), ds));
  });

  it('mảng rỗng trả undefined chứ không trả bừa', () => {
    expect(chon(taoRng(1), [])).toBeUndefined();
  });
});
