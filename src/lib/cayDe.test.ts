import { describe, it, expect } from 'vitest';
import { dungCay, tongCau, cauCuaChuong } from './cayDe';

const la = [
  { khoa: 'a', ten: 'Nitrogen', soCau: 42, chuong: '11.2' },
  { khoa: 'b', ten: 'Cân bằng trong dung dịch nước', soCau: 69, chuong: '11.1' },
  { khoa: 'c', ten: 'Cân bằng hóa học', soCau: 16, chuong: '11.1' },
  { khoa: 'd', ten: 'Halogen', soCau: 10, chuong: '10.7' },
];

describe('dựng cây thư mục đề', () => {
  it('gom theo lớp rồi theo chương, đúng thứ tự sách', () => {
    const cay = dungCay(la, true);
    expect(cay.map((l) => l.lop)).toEqual([10, 11]);
    expect(cay[1].chuong.map((c) => c.ma)).toEqual(['11.1', '11.2']);
  });

  it('cộng dồn số câu từ lá lên chương rồi lên lớp', () => {
    const cay = dungCay(la, true);
    expect(cauCuaChuong(cay, '11.1')).toBe(85); // 69 + 16
    expect(cay[1].soCau).toBe(127); // 85 + 42
    expect(tongCau(cay)).toBe(137);
  });

  it('ẩn chương không có câu nào — không bày ra 21 mục rỗng', () => {
    const cay = dungCay(la, true);
    const ma = cay.flatMap((l) => l.chuong).map((c) => c.ma);
    expect(ma).toEqual(['10.7', '11.1', '11.2']);
  });

  it('lá chưa xếp chương vẫn hiện, và luôn đứng cuối', () => {
    const cay = dungCay([...la, { khoa: 'e', ten: 'Đề lẻ', soCau: 5 }], true);
    const cuoi = cay[cay.length - 1];
    expect(cuoi.lop).toBeNull();
    expect(cuoi.soCau).toBe(5);
    expect(cuoi.chuong[0].la[0].ten).toBe('Đề lẻ');
  });

  it('mã chương không có thật thì coi như chưa xếp, không dựng nhánh ma', () => {
    // Bộ đề cũ còn nằm trong kho đệm của trình duyệt có thể khai mã chương của
    // bản cũ. Tin vào nó thì cây mọc ra một lớp không tồn tại.
    const cay = dungCay([{ khoa: 'x', ten: 'Đề lạ', soCau: 3, chuong: '13.9' }], true);
    expect(cay).toHaveLength(1);
    expect(cay[0].lop).toBeNull();
  });

  it('bỏ qua lá không có câu nào', () => {
    expect(dungCay([{ khoa: 'z', ten: 'Rỗng', soCau: 0, chuong: '11.1' }], true)).toEqual([]);
  });

  it('đổi sang tiếng Anh thì tên lớp và tên chương đổi theo', () => {
    const cay = dungCay(la, false);
    expect(cay[0].ten).toBe('Grade 10');
    expect(cay[0].chuong[0].ten).toBe('Group VIIA elements (halogens)');
  });
});
