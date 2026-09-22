// Phép kiểm cho phần xếp dữ liệu vào chương sách giáo khoa.
//
// CHỖ NÀY KIỂM ĐƯỢC GÌ VÀ KHÔNG KIỂM ĐƯỢC GÌ — phải nói rõ, vì đây là phần
// dữ liệu duy nhất của app mà máy KHÔNG tự phán đúng sai được.
//
//   Kiểm được: mã chương có thật, không lớp chất nào bị bỏ quên, quy tắc chạy
//   ra đúng kết quả trên những ca đã soi tay, và ĐO ĐƯỢC bao nhiêu phần dữ
//   liệu đã xếp được chương.
//
//   KHÔNG kiểm được: "phản ứng Fe + CuSO4 dạy ở chương nào" là chuyện chương
//   trình học, phải có mắt thầy cô. Vì vậy có thêm `npm run soi:chuong` —
//   scripts/soi-chuong.test.ts đổ ra bảng xếp của TOÀN BỘ dữ liệu thành
//   chuong-review.html để soi một lượt, giống trang duyệt đề de-review-*.html.

import { describe, it, expect } from 'vitest';
import {
  CHUONG_CUA_LOP_CHAT,
  chuongCuaChat,
  chuongCuaNguyenTo,
  chuongCuaPhanUng,
} from './xepChuong';
import { CHUONG_TRINH, doanChuong, boDau } from '../data/chuongTrinh.js';
import { NHOM_CHAT } from '../data/classes';
import { REACTIONS } from '../data/reactions';
import { FORMULAS } from '../data/formulas';
import { ELEMENTS } from '../data/elements';

const MA_CO_THAT = new Set(CHUONG_TRINH.map((c) => c.ma));
const phanUng = (eq: string) => REACTIONS.find((r) => r.eq === eq)!;

describe('cây chương trình', () => {
  it('không có mã chương nào trùng nhau', () => {
    expect(MA_CO_THAT.size).toBe(CHUONG_TRINH.length);
  });

  it('mã chương đúng dạng "lớp.số chương" và khớp với lop/so đã khai', () => {
    const sai = CHUONG_TRINH.filter((c) => c.ma !== `${c.lop}.${c.so}`).map((c) => c.ma);
    expect(sai).toEqual([]);
  });

  it('số chương chạy liền mạch từ 1 trong mỗi lớp', () => {
    for (const lop of [10, 11, 12]) {
      const so = CHUONG_TRINH.filter((c) => c.lop === lop).map((c) => c.so);
      expect(so).toEqual(so.map((_, i) => i + 1));
    }
  });

  it('từ khóa viết thường và không dấu — viết có dấu thì không bao giờ khớp', () => {
    const sai = CHUONG_TRINH.flatMap((c) => c.tuKhoa).filter((k) => boDau(k) !== k);
    expect(sai).toEqual([]);
  });
});

describe('đoán chương từ tên bộ đề', () => {
  it('đoán đúng ba bộ đề thầy đã gửi', () => {
    expect(doanChuong('Nitrogen và một số hợp chất quan trọng của nitrogen')).toBe('11.2');
    expect(doanChuong('Cân bằng trong dung dịch nước')).toBe('11.1');
    expect(doanChuong('Cân bằng hóa học')).toBe('11.1');
  });

  it('không phụ thuộc chữ hoa, chữ thường hay dấu', () => {
    expect(doanChuong('SỰ ĐIỆN LI_TN_ĐA')).toBe('11.1');
    expect(doanChuong('su dien li')).toBe('11.1');
  });

  it('khớp DÀI thắng khớp ngắn — "hợp chất chứa nitrogen" là lớp 12, không phải lớp 11', () => {
    expect(doanChuong('Ôn tập hợp chất chứa nitrogen')).toBe('12.3');
    expect(doanChuong('Nitrogen')).toBe('11.2');
  });

  it('không khớp thì trả null chứ không đoán bừa', () => {
    expect(doanChuong('Đề kiểm tra 15 phút')).toBeNull();
    expect(doanChuong('')).toBeNull();
  });
});

describe('xếp chương cho dữ liệu của app', () => {
  it('mọi lớp chất trong NHOM_CHAT đều đã có quyết định xếp hay không xếp', () => {
    // Thêm lớp chất mới vào classes.ts mà quên khai ở đây thì chất của lớp ấy
    // lặng lẽ rơi xuống quy tắc nguyên tố — sai chương mà không ai hay.
    const thieu = Object.keys(NHOM_CHAT).filter((k) => !(k in CHUONG_CUA_LOP_CHAT));
    expect(thieu).toEqual([]);
  });

  it('mọi mã chương xếp ra đều có thật trong sách', () => {
    const ma = new Set<string>();
    for (const f of FORMULAS) {
      const m = chuongCuaChat(f);
      if (m) ma.add(m);
    }
    for (const r of REACTIONS) {
      const m = chuongCuaPhanUng(r);
      if (m) ma.add(m);
    }
    for (const e of ELEMENTS) {
      const m = chuongCuaNguyenTo(e.cat, e.n);
      if (m) ma.add(m);
    }
    const la = [...ma].filter((m) => !MA_CO_THAT.has(m));
    expect(la).toEqual([]);
  });

  it('xếp đúng những ca đã soi tay', () => {
    // Gốc acid chỉ đứng xem thì không được kéo phản ứng sang chương của nó.
    expect(chuongCuaPhanUng(phanUng('Fe + CuSO4 → FeSO4 + Cu'))).toBe('12.8');
    // Halogen là chất chủ đề thật sự của phản ứng này.
    expect(chuongCuaPhanUng(phanUng('2 Na + Cl2 → 2 NaCl'))).toBe('10.7');
    // Nitrogen thắng, dù phản ứng cũng là phản ứng oxi hóa - khử.
    expect(chuongCuaPhanUng(phanUng('N2 + 3 H2 → 2 NH3'))).toBe('11.2');
    // Loại phản ứng có hẳn một chương mang tên nó.
    expect(chuongCuaPhanUng(phanUng('2 NaCl → 2 Na + Cl2'))).toBe('12.5');
    expect(chuongCuaPhanUng(phanUng('CH3COOH + C2H5OH → CH3COOC2H5 + H2O'))).toBe('12.1');
  });

  it('chất hữu cơ xếp theo lớp chất, chất vô cơ xếp theo nguyên tố', () => {
    const tim = (ct: string) => FORMULAS.find((f) => f.formula === ct)!;
    expect(chuongCuaChat(tim('CH4'))).toBe('11.4');
    expect(chuongCuaChat(tim('C2H5OH'))).toBe('11.5');
    expect(chuongCuaChat(tim('NaCl'))).toBe('10.7');
    expect(chuongCuaChat(tim('NH3'))).toBe('11.2');
  });

  it('nguyên tố xếp theo nhóm, riêng chuyển tiếp chỉ dãy thứ nhất mới vào chương 12.8', () => {
    const nt = (sym: string) => ELEMENTS.find((e) => e.sym === sym)!;
    expect(chuongCuaNguyenTo(nt('Cl').cat, nt('Cl').n)).toBe('10.7');
    expect(chuongCuaNguyenTo(nt('Na').cat, nt('Na').n)).toBe('12.7');
    expect(chuongCuaNguyenTo(nt('Fe').cat, nt('Fe').n)).toBe('12.8');
    // Ag (Z = 47) là kim loại chuyển tiếp nhưng DÃY THỨ HAI, không thuộc 12.8.
    expect(chuongCuaNguyenTo(nt('Ag').cat, nt('Ag').n)).toBe('10.2');
  });
});

describe('mức phủ — bao nhiêu phần dữ liệu xếp được chương', () => {
  // Số đo ngày 22/09/2026: phản ứng 212/224, chất 278/298, nguyên tố 109/118.
  // Ngưỡng chốt THẤP HƠN số đo thật để thêm dữ liệu mới không làm đỏ bài kiểm
  // vô cớ, nhưng sửa quy tắc mà tụt hẳn mức phủ thì phải biết ngay.
  // `npm run soi:chuong` in ra số hiện tại và ghi bảng đầy đủ để soi.
  const ti = (n: number, tong: number) => n / tong;

  it('phản ứng xếp được trên 80%', () => {
    const xep = REACTIONS.filter((r) => chuongCuaPhanUng(r)).length;
    expect(ti(xep, REACTIONS.length)).toBeGreaterThan(0.8);
  });

  it('chất xếp được trên 80%', () => {
    const that = FORMULAS.filter((f) => f.cat !== 'physical');
    const xep = that.filter((f) => chuongCuaChat(f)).length;
    expect(ti(xep, that.length)).toBeGreaterThan(0.8);
  });

  it('nguyên tố xếp được HẾT, trừ nhóm chưa xác định', () => {
    // Mấy nguyên tố siêu nặng chưa ai đo được tính chất nên bảng tuần hoàn
    // không xếp chúng vào nhóm nào, không có gì để suy ra chương. Đây là chỗ
    // duy nhất được phép sót nên kiểm bằng danh sách chứ không bằng tỉ lệ.
    const sot = ELEMENTS.filter(
      (e) => e.cat !== 'unknown' && !chuongCuaNguyenTo(e.cat, e.n),
    ).map((e) => e.sym);
    expect(sot).toEqual([]);
  });
});

