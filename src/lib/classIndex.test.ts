import { describe, it, expect } from 'vitest';
import {
  nhomCuaChat,
  thuatNguCuaNguyenTo,
  thuatNguCuaNhom,
  noiDungChoThuatNgu,
  coNoiDungHoc,
} from './classIndex';
import { FORMULAS, keyOf, type Formula } from '../data/formulas';
import { byNumber } from '../data/elements';
import { TERMS } from '../data/dictionary';
import { NHOM_CHAT } from '../data/classes';

const chat = (khoa: string): Formula => FORMULAS.find((f) => keyOf(f) === khoa)!;
const tu = (en: string) => TERMS.find((t) => t.en === en)!;

describe('mỗi chất nối đúng lớp của nó', () => {
  const CA: [string, string][] = [
    ['CH4', 'Alkane'],
    ['C2H4', 'Alkene'],
    ['C2H2', 'Alkyne'],
    ['C6H6', 'Arene'],
    ['C2H5OH', 'Alcohol'],
    ['C6H5OH', 'Phenol'],
    ['CH3CHO', 'Aldehyde'],
    ['CH3COCH3', 'Ketone'],
    ['CH3COOH', 'Carboxylic acid'],
    ['CH3COOC2H5', 'Ester'],
    ['C57H110O6', 'Fat'],
    ['CH3NH2', 'Amine'],
    ['C2H5NO2', 'Amino acid'],
    ['C6H12O6', 'Carbohydrate'],
    ['(C2H4)n', 'Polymer'],
    ['NaCl', 'Salt'],
    ['CaO', 'Oxide'],
    ['H2SO4', 'Acid'],
    ['NaOH', 'Hydroxide'],
    ['O2', 'Elementary substance'],
  ];
  it.each(CA)('%s thuộc nhóm nối tới "%s"', (khoa, termEn) => {
    const f = chat(khoa);
    expect(f.nhom, `${khoa} chưa gán nhóm`).toBeTruthy();
    expect(nhomCuaChat(f)).toBeTruthy();
    expect(thuatNguCuaNhom(f.nhom!)?.en).toBe(termEn);
  });
});

describe('mỗi nguyên tố nối đúng nhóm trong bảng tuần hoàn', () => {
  const CA: [number, string][] = [
    [17, 'Halogen'], // Clo
    [11, 'Alkali metal'], // Natri
    [20, 'Alkaline earth metal'], // Canxi
    [26, 'Transition metal'], // Sắt
    [18, 'Noble gas'], // Argon
    [8, 'Nonmetal'], // Oxy
    [14, 'Metalloid'], // Silic
    [13, 'Post-transition metal'], // Nhôm
  ];
  it.each(CA)('nguyên tố %i nối tới "%s"', (n, termEn) => {
    expect(thuatNguCuaNguyenTo(byNumber(n)!.cat)?.en).toBe(termEn);
  });
});

describe('mở một định nghĩa ra là có nội dung để học', () => {
  it('Halogen gom đủ cả nguyên tố, chất và mẩu thực tiễn', () => {
    const n = noiDungChoThuatNgu(tu('Halogen'));
    expect(n.nguyenTo.map((e) => e.sym)).toEqual(['F', 'Cl', 'Br', 'I', 'At']);
    expect(n.chat.length).toBeGreaterThan(0);
    expect(n.thucTien.length).toBeGreaterThan(0);
  });

  it('lớp chất thuần hữu cơ thì chỉ có chất, không có nguyên tố', () => {
    const n = noiDungChoThuatNgu(tu('Alkane'));
    expect(n.chat.length).toBeGreaterThanOrEqual(8);
    expect(n.nguyenTo).toEqual([]);
  });

  it('thuật ngữ không phải lớp chất thì không có nội dung kèm', () => {
    expect(coNoiDungHoc(tu('Mole'))).toBe(false);
  });

  it('không mẩu thực tiễn nào bị lặp trong cùng một định nghĩa', () => {
    for (const t of TERMS.filter(coNoiDungHoc)) {
      const n = noiDungChoThuatNgu(t);
      expect(new Set(n.thucTien).size).toBe(n.thucTien.length);
    }
  });
});

describe('dữ liệu phân lớp không có lỗ hổng', () => {
  it('mọi giá trị nhóm đều là khóa có thật trong bảng lớp chất', () => {
    const la = FORMULAS.filter((f) => f.nhom && !NHOM_CHAT[f.nhom]).map(
      (f) => `${keyOf(f)}: ${f.nhom}`,
    );
    expect(la).toEqual([]);
  });

  it('mọi lớp chất khai ra đều có ít nhất một chất dùng tới', () => {
    // Lớp không có chất nào là lớp thừa — hoặc gõ sai khóa lúc gán.
    const dangDung = new Set(FORMULAS.map((f) => f.nhom).filter(Boolean));
    const thua = Object.keys(NHOM_CHAT).filter((k) => !dangDung.has(k));
    expect(thua).toEqual([]);
  });

  it('phần lớn chất đã được xếp lớp', () => {
    const c = FORMULAS.filter((f) => f.cat !== 'physical');
    const daXep = c.filter((f) => f.nhom).length;
    expect(daXep / c.length).toBeGreaterThan(0.85);
  });
});

describe('nhớ sẵn nội dung học kèm', () => {
  it('gọi lại cùng một thuật ngữ thì trả đúng kết quả cũ, không dựng lại', () => {
    // Trang Từ điển gọi hàm này cho từng mục ở mọi lần vẽ. So bằng === để
    // chắc là lấy lại đồ đã nhớ chứ không phải dựng mảng mới giống hệt.
    const t = TERMS.find((x) => coNoiDungHoc(x))!;
    expect(noiDungChoThuatNgu(t)).toBe(noiDungChoThuatNgu(t));
  });

  it('thuật ngữ không có gì học kèm cũng nhớ, khỏi quét lại kho', () => {
    const t = TERMS.find((x) => !coNoiDungHoc(x))!;
    expect(noiDungChoThuatNgu(t)).toBe(noiDungChoThuatNgu(t));
  });

  it('nhớ rồi vẫn phải đúng nội dung', () => {
    const t = TERMS.find((x) => coNoiDungHoc(x))!;
    const n = noiDungChoThuatNgu(t);
    expect(n.chat.length + n.nguyenTo.length).toBeGreaterThan(0);
  });
});
