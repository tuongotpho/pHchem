import { describe, it, expect } from 'vitest';
import { ELEMENTS } from './elements';

// ĐỐI CHIẾU KHỐI LƯỢNG NGUYÊN TỬ VỚI BẢNG CHÍNH THỨC CỦA IUPAC.
//
// VÌ SAO CÓ FILE NÀY: các phép kiểm khác trong thư mục này chỉ soi được MÂU
// THUẪN BÊN TRONG — cấu hình electron cộng có đúng bằng số hiệu không, khối
// lượng có tăng dần không, khí có nhẹ hơn kim loại không. Chúng bắt được lỗi
// gõ nhầm, nhưng KHÔNG bắt được một con số chép đúng từ một quyển sách in sai,
// hay một con số đúng vào năm 1979 mà nay đã bị sửa. Muốn bắt loại đó thì phải
// so với một nguồn NGOÀI, có tên tuổi.
//
// Đây chính là lối đã dùng cho hình cấu tạo (đối chiếu InChI với PubChem, xem
// scripts/references.mjs), nay áp cho số liệu.
//
// NGUỒN: Ủy ban Đồng vị và Khối lượng Nguyên tử của IUPAC (CIAAW),
//   bảng rút gọn: https://www.ciaaw.org/abridged-atomic-weights.htm
//   bản "Atomic Weights 2021" kèm hiệu chỉnh 2024 cho gadolini, luteti, ziconi.
//   Tra ngày 25/08/2026.
//
// Bảng này để NGAY TRONG FILE TEST chứ không nằm trong src/data: nó là đồ
// nghề kiểm tra, người dùng cuối không cần, cho vào gói cài chỉ tổ nặng.

/** Khối lượng nguyên tử tiêu chuẩn dạng rút gọn, tra theo số hiệu nguyên tử. */
const IUPAC: Record<number, number> = {
  1: 1.008, 2: 4.0026, 3: 6.94, 4: 9.0122, 5: 10.81,
  6: 12.011, 7: 14.007, 8: 15.999, 9: 18.998, 10: 20.18,
  11: 22.99, 12: 24.305, 13: 26.982, 14: 28.085, 15: 30.974,
  16: 32.06, 17: 35.45, 18: 39.95, 19: 39.098, 20: 40.078,
  21: 44.956, 22: 47.867, 23: 50.942, 24: 51.996, 25: 54.938,
  26: 55.845, 27: 58.933, 28: 58.693, 29: 63.546, 30: 65.38,
  31: 69.723, 32: 72.63, 33: 74.922, 34: 78.971, 35: 79.904,
  36: 83.798, 37: 85.468, 38: 87.62, 39: 88.906, 40: 91.222,
  41: 92.906, 42: 95.95, 44: 101.07, 45: 102.91, 46: 106.42,
  47: 107.87, 48: 112.41, 49: 114.82, 50: 118.71, 51: 121.76,
  52: 127.6, 53: 126.9, 54: 131.29, 55: 132.91, 56: 137.33,
  57: 138.91, 58: 140.12, 59: 140.91, 60: 144.24, 62: 150.36,
  63: 151.96, 64: 157.25, 65: 158.93, 66: 162.5, 67: 164.93,
  68: 167.26, 69: 168.93, 70: 173.05, 71: 174.97, 72: 178.49,
  73: 180.95, 74: 183.84, 75: 186.21, 76: 190.23, 77: 192.22,
  78: 195.08, 79: 196.97, 80: 200.59, 81: 204.38, 82: 207.2,
  83: 208.98, 90: 232.04, 91: 231.04, 92: 238.03,
};

// Những nguyên tố IUPAC KHÔNG công bố khối lượng nguyên tử tiêu chuẩn: chúng
// không có đồng vị bền, và thành phần đồng vị của mẫu vật tùy nguồn gốc nên
// không có một con số chung nào có nghĩa. Quy ước quốc tế là ghi SỐ KHỐI của
// đồng vị thọ nhất, đặt trong ngoặc vuông. App lưu chính số nguyên đó.
const KHONG_CO_CHUAN = [
  43, 61, 84, 85, 86, 87, 88, 89, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102,
  103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
  118,
];

describe('khối lượng nguyên tử đối chiếu IUPAC', () => {
  it('mọi giá trị khớp ĐÚNG bảng rút gọn của IUPAC', () => {
    const lech: string[] = [];
    for (const e of ELEMENTS) {
      const chuan = IUPAC[e.n];
      if (chuan === undefined) continue;
      if (e.mass !== chuan) {
        lech.push(`${e.n} ${e.sym}: app ${e.mass}, IUPAC ${chuan}`);
      }
    }
    expect(lech).toEqual([]);
  });

  it('nguyên tố không có khối lượng chuẩn thì dùng số khối, không bịa số lẻ', () => {
    const sai: string[] = [];
    for (const n of KHONG_CO_CHUAN) {
      const e = ELEMENTS.find((x) => x.n === n);
      if (!e) {
        sai.push(`thiếu nguyên tố ${n}`);
        continue;
      }
      // Số khối là số nguyên. Thấy số lẻ ở đây tức là ai đó đã chép một "khối
      // lượng nguyên tử" từ đâu đó về, mà thứ ấy không tồn tại.
      if (!Number.isInteger(e.mass)) {
        sai.push(`${e.n} ${e.sym}: ${e.mass} — phải là số khối nguyên`);
      }
    }
    expect(sai).toEqual([]);
  });

  // CHỐT CHẶN cho tương lai: thêm nguyên tố mới mà quên cập nhật bảng đối
  // chiếu thì phép kiểm trên lặng lẽ bỏ qua nó. Đếm lại cho chắc.
  it('bảng đối chiếu phủ đủ cả 118 nguyên tố, không sót cái nào', () => {
    const coChuan = Object.keys(IUPAC).map(Number);
    const phu = new Set([...coChuan, ...KHONG_CO_CHUAN]);
    expect(coChuan.length + KHONG_CO_CHUAN.length).toBe(118);
    expect(phu.size).toBe(118);
    expect(ELEMENTS.map((e) => e.n).filter((n) => !phu.has(n))).toEqual([]);
  });
});
