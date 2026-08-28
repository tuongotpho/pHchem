import { describe, it, expect } from 'vitest';
import { tinhDiem, vietDiem, dinhDangDongHo, tenTepPhieu, type DuLieuPhieu } from './phieuKetQua';

describe('tinhDiem — quy về thang 10', () => {
  it('các mốc quen thuộc', () => {
    expect(tinhDiem(20, 20)).toBe(10);
    expect(tinhDiem(10, 20)).toBe(5);
    expect(tinhDiem(16, 20)).toBe(8);
    expect(tinhDiem(0, 20)).toBe(0);
  });

  it('giữ hai chữ số thập phân để hai bài chênh một câu không ra cùng điểm', () => {
    // Đề 42 câu, mỗi câu đáng 0,238 điểm. Làm tròn một chữ số thì 25 và 26 câu
    // đúng đều ra 6,0 — học sinh nhìn vào tưởng máy chấm sai.
    expect(tinhDiem(25, 42)).toBe(5.95);
    expect(tinhDiem(26, 42)).toBe(6.19);
    expect(tinhDiem(25, 42)).not.toBe(tinhDiem(26, 42));
  });

  it('tổng bằng 0 thì trả 0 chứ không chia cho 0', () => {
    // Bộ sinh đề có thể trả về đề rỗng; chia cho 0 ra NaN rồi in "NaN/10".
    expect(tinhDiem(0, 0)).toBe(0);
    expect(tinhDiem(5, -1)).toBe(0);
  });
});

describe('vietDiem — viết theo lối Việt Nam', () => {
  it('dùng dấu phẩy thập phân, bỏ số 0 thừa', () => {
    expect(vietDiem(8)).toBe('8');
    expect(vietDiem(7.5)).toBe('7,5');
    expect(vietDiem(5.95)).toBe('5,95');
    expect(vietDiem(10)).toBe('10');
  });
});

describe('dinhDangDongHo', () => {
  it('dưới một giờ thì chỉ hiện phút:giây', () => {
    expect(dinhDangDongHo(0)).toBe('00:00');
    expect(dinhDangDongHo(65)).toBe('01:05');
    expect(dinhDangDongHo(600)).toBe('10:00');
    expect(dinhDangDongHo(3599)).toBe('59:59');
  });

  it('quá một giờ thì hiện thêm giờ', () => {
    // Chọn "Tất cả" trên bộ đề lớn là vượt một tiếng ngay.
    expect(dinhDangDongHo(3600)).toBe('1:00:00');
    expect(dinhDangDongHo(3750)).toBe('1:02:30');
  });

  it('số âm coi như hết giờ, không hiện "-01:-5"', () => {
    // Đồng hồ có thể tụt xuống âm một nhịp trước khi kịp dừng.
    expect(dinhDangDongHo(-5)).toBe('00:00');
  });
});

describe('tenTepPhieu — tên file lưu ảnh', () => {
  const nen: DuLieuPhieu = {
    ten: 'Nguyễn Văn A',
    nguon: 'Nitrogen',
    dung: 16,
    tong: 20,
    maDe: 12345,
    giayLam: 300,
    luc: new Date('2026-08-28T03:00:00Z'),
  };

  it('bỏ dấu tiếng Việt và ký tự lạ', () => {
    // Tên có dấu hoặc có ngoặc làm Windows/Android lưu ra tên vỡ, có máy còn
    // từ chối lưu hẳn.
    expect(tenTepPhieu(nen)).toBe('pH-Chem_Nguyen-Van-A_2026-08-28_made-12345.png');
    expect(tenTepPhieu({ ...nen, ten: 'Trần Đức Bo (11A2)' })).toBe(
      'pH-Chem_Tran-Duc-Bo-11A2_2026-08-28_made-12345.png',
    );
  });

  it('chưa ghi tên thì vẫn ra tên file dùng được', () => {
    expect(tenTepPhieu({ ...nen, ten: '' })).toContain('hoc-sinh');
    expect(tenTepPhieu({ ...nen, ten: '   ???   ' })).toContain('hoc-sinh');
  });

  it('tên quá dài thì cắt bớt', () => {
    const ten = 'a'.repeat(200);
    expect(tenTepPhieu({ ...nen, ten }).length).toBeLessThan(90);
  });
});
