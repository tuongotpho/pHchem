import { describe, it, expect } from 'vitest';
import { tachHeSo, tachChiSo } from './chiSoCongThuc';

// Tách hệ số ra khỏi công thức khi vẽ một phương trình.
//
// VÌ SAO ĐÁNG KIỂM: sai ở đây KHÔNG làm vỡ gì cả. Trang vẫn hiện, phương trình
// vẫn đủ chất, chỉ có một chữ số tụt xuống sai chỗ — "3 CO₂" thành "₃ CO₂", tức
// ba phân tử CO₂ biến thành một chất không tồn tại. Đúng kiểu hỏng lặng lẽ mà
// nhìn lướt không thấy.

describe('tachHeSo — tách hệ số khỏi công thức trong một mẩu phương trình', () => {
  it('mẩu thường: hệ số rồi tới công thức', () => {
    expect(tachHeSo('5 O2')).toEqual(['5 ', 'O2']);
    expect(tachHeSo('12 H2O')).toEqual(['12 ', 'H2O']);
  });

  it('CÓ DẤU CÁCH Ở ĐẦU vẫn phải nhận ra hệ số', () => {
    // Đây chính là ca đã hỏng thật (29/08/2026). Dấu "+" được tách kèm cả hai
    // dấu cách hai bên, còn mũi tên thì không — nên chất đầu tiên bên phải mũi
    // tên luôn dư một dấu cách ở đầu. Bỏ sót là hệ số của nó bị hạ thành chỉ số.
    expect(tachHeSo(' 3 CO2')).toEqual([' 3 ', 'CO2']);
    expect(tachHeSo('  2 NaOH')).toEqual(['  2 ', 'NaOH']);
  });

  it('không có hệ số thì trả null, để nơi gọi vẽ nguyên công thức', () => {
    expect(tachHeSo('H2O')).toBeNull();
    expect(tachHeSo(' H2O')).toBeNull();
    expect(tachHeSo('Fe')).toBeNull();
  });

  it('CHỮ SỐ DÍNH LIỀN CÔNG THỨC KHÔNG PHẢI HỆ SỐ', () => {
    // "2H2O" không có dấu cách nên số 2 đầu là hệ số viết dính — nhưng ở đây
    // định dạng của app luôn có dấu cách (xem formatBalanced trong lib/balance).
    // Không có dấu cách thì trả null cho an toàn, chứ đoán bừa là cắt nhầm
    // "3CO2" thành hệ số 3 của "CO2" hay hệ số 3 của "O2" đều có lý như nhau.
    expect(tachHeSo('2H2O')).toBeNull();
    expect(tachHeSo('H2SO4')).toBeNull();
  });
});

describe('tachChiSo — chữ số nào mới là chỉ số dưới', () => {
  const ve = (s: string) =>
    tachChiSo(s)
      .map((m) => (m.duoi ? `[${m.t}]` : m.t))
      .join('');

  it('chữ số đứng sau ký hiệu nguyên tố hoặc ngoặc đóng thì hạ xuống', () => {
    expect(ve('H2O')).toBe('H[2]O');
    expect(ve('H2SO4')).toBe('H[2]SO[4]');
    expect(ve('Ca(OH)2')).toBe('Ca(OH)[2]');
    expect(ve('C6H12O6')).toBe('C[6]H[12]O[6]');
  });

  it('MUỐI NGẬM NƯỚC: số phân tử nước KHÔNG được hạ', () => {
    // Ca đã hỏng thật, thấy ngay trên trang Máy tính (29/08/2026). Hạ số 5
    // xuống là biến đồng(II) sunfat ngậm 5 nước thành một chất không có thật.
    expect(ve('CuSO4.5H2O')).toBe('CuSO[4].5H[2]O');
    expect(ve('Na2CO3.10H2O')).toBe('Na[2]CO[3].10H[2]O');
  });

  it('hệ số đứng đầu công thức giữ cỡ thường', () => {
    expect(ve('2H2O')).toBe('2H[2]O');
  });

  it('chuỗi không có chữ số thì trả nguyên', () => {
    expect(ve('NaCl')).toBe('NaCl');
    expect(ve('Fe')).toBe('Fe');
  });
});
