import { describe, it, expect } from 'vitest';
import { doSo, doSoHoacTrong, laSoDuong } from './soNhap';

describe('đọc số người dùng gõ', () => {
  it('dấu phẩy thập phân kiểu Việt Nam', () => {
    // Đây là chỗ tab "Tính theo PT" từng gãy: Number('5,6') cho NaN nên lượng
    // chất bị lọc bỏ im lặng, người dùng nhận báo lỗi sai hẳn ý.
    expect(doSo('5,6')).toBe(5.6);
    expect(doSo('0,001')).toBe(0.001);
    expect(doSo('22,4')).toBe(22.4);
  });

  it('dấu chấm thập phân kiểu Anh Mỹ vẫn đọc được', () => {
    expect(doSo('5.6')).toBe(5.6);
    expect(doSo('0.001')).toBe(0.001);
  });

  it('bỏ khoảng trắng thừa hai đầu', () => {
    expect(doSo('  5,6  ')).toBe(5.6);
  });

  it('dạng mũ vẫn đọc được — ô nồng độ có nút sẵn 1e-8', () => {
    expect(doSo('1e-8')).toBe(1e-8);
  });

  it('không đọc được thì trả NaN, không trả 0', () => {
    // Trả 0 thì nguy hơn NaN nhiều: 0 lọt qua mọi phép tính rồi ra đáp án sai.
    expect(doSo('')).toBeNaN();
    expect(doSo('abc')).toBeNaN();
  });

  it('ô để trống khác với ô gõ bậy', () => {
    // Bài toán pha loãng dựa vào đúng phân biệt này để biết ô nào cần tính.
    expect(doSoHoacTrong('')).toBeNull();
    expect(doSoHoacTrong('   ')).toBeNull();
    expect(doSoHoacTrong('abc')).toBeNaN();
    expect(doSoHoacTrong('5,6')).toBe(5.6);
  });

  it('laSoDuong đòi vừa đọc được vừa lớn hơn 0', () => {
    expect(laSoDuong('5,6')).toBe(true);
    expect(laSoDuong('0')).toBe(false);
    expect(laSoDuong('-3')).toBe(false);
    expect(laSoDuong('abc')).toBe(false);
    expect(laSoDuong('')).toBe(false);
  });
});
