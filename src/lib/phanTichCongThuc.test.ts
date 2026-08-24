import { describe, it, expect } from 'vitest';
import { demNguyenTu } from './phanTichCongThuc.js';

// Lõi này DÙNG CHUNG cho app và cho scripts/gen-structures.mjs. Hai bên gọi
// với hai chế độ khác nhau, và cả hai chế độ đều phải đứng vững — vì chính
// script dùng nó để đối chiếu "công thức khai báo có khớp SMILES không", phép
// kiểm chống sai dữ liệu mạnh nhất của dự án.

// Bộ ký hiệu giả, đủ dùng cho các ca dưới đây. Phải là TẬP HỢP chứ không phải
// chuỗi rồi dò includes — dò kiểu đó thì "Ca" trượt vì không nằm liền mạch.
const CO_THAT = new Set(
  'H C O N S P K Na Cl Ca Cu Mg Al Fe Mn Br I Si'.split(' '),
);
const CHAT_CHE = {
  chatChe: true,
  nguyenToHopLe: (s: string) => CO_THAT.has(s),
};

describe('đếm nguyên tử — phần chung của cả hai chế độ', () => {
  it('công thức thường', () => {
    expect(demNguyenTu('H2O')).toEqual({ H: 2, O: 1 });
    expect(demNguyenTu('NaCl')).toEqual({ Na: 1, Cl: 1 });
  });

  it('ngoặc lồng nhau', () => {
    expect(demNguyenTu('Ca(OH)2')).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(demNguyenTu('Al2(SO4)3')).toEqual({ Al: 2, S: 3, O: 12 });
    expect(demNguyenTu('K4[Fe(CN)6]')).toEqual({ K: 4, Fe: 1, C: 6, N: 6 });
  });

  it('muối ngậm nước — hệ số SAU dấu chấm là hợp lệ', () => {
    expect(demNguyenTu('CuSO4.5H2O')).toEqual({ Cu: 1, S: 1, O: 9, H: 10 });
    expect(demNguyenTu('Na2CO3.10H2O')).toEqual({ Na: 2, C: 1, O: 13, H: 20 });
  });

  it('hệ số đứng TRƯỚC cả chất thì cấm, ở cả hai chế độ', () => {
    // Không công thức hóa học nào bắt đầu bằng chữ số. Đã kiểm 295 khóa trong
    // smiles.json, không khóa nào như vậy, nên luật này áp chung được.
    expect(() => demNguyenTu('2H2O')).toThrow(/hệ số/i);
    expect(() => demNguyenTu('2H2O', CHAT_CHE)).toThrow(/hệ số/i);
  });
});

describe('chế độ CHẶT CHẼ — app dùng, đầu vào do người gõ tay', () => {
  it('ký hiệu nguyên tố không có thật thì báo lỗi', () => {
    expect(() => demNguyenTu('Xx2', CHAT_CHE)).toThrow(/Không rõ nguyên tố/);
  });

  it('thiếu dấu đóng ngoặc thì báo lỗi', () => {
    expect(() => demNguyenTu('Ca(OH2', CHAT_CHE)).toThrow(/đóng ngoặc/);
  });

  it('ký tự lạ thì báo lỗi chứ không nuốt', () => {
    expect(() => demNguyenTu('H2O!', CHAT_CHE)).toThrow(/không hợp lệ/);
  });

  it('chữ n của polime cũng bị coi là lạ — đúng ý, app không nhận polime', () => {
    expect(() => demNguyenTu('(C2H4)n', CHAT_CHE)).toThrow();
  });
});

describe('chế độ DỄ TÍNH — script dùng, dữ liệu đã tin được', () => {
  it('đọc trôi polime, bỏ qua chữ n', () => {
    // Script chỉ vẽ MỘT mắt xích nên phải đếm được phần trong ngoặc.
    expect(demNguyenTu('(C2H4)n')).toEqual({ C: 2, H: 4 });
    expect(demNguyenTu('(C6H10O5)n')).toEqual({ C: 6, H: 10, O: 5 });
  });

  it('không kiểm ký hiệu nguyên tố, cứ đếm', () => {
    expect(demNguyenTu('Xx2')).toEqual({ Xx: 2 });
  });

  it('bỏ qua ký tự lạ thay vì ném lỗi', () => {
    expect(demNguyenTu('H2O!')).toEqual({ H: 2, O: 1 });
  });
});

describe('hai chế độ phải cho CÙNG kết quả trên công thức sạch', () => {
  // Đây là điều thật sự cần bảo vệ: app và script không được đọc lệch nhau.
  const SACH = [
    'H2O',
    'H2SO4',
    'NaCl',
    'Ca(OH)2',
    'Al2(SO4)3',
    'CuSO4.5H2O',
    'C6H12O6',
    'KMnO4',
    'NaHCO3',
    'K4[Fe(CN)6]',
  ];
  it.each(SACH)('%s đọc như nhau ở cả hai chế độ', (ct) => {
    expect(demNguyenTu(ct)).toEqual(
      demNguyenTu(ct, { chatChe: true, nguyenToHopLe: () => true }),
    );
  });
});
