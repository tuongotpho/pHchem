import { describe, it, expect } from 'vitest';
import { IUPAC, iupacOf } from './iupac';
import { FORMULAS, keyOf } from './formulas';

const KHOA_CHAT = new Set(FORMULAS.map(keyOf));

describe('danh pháp IUPAC', () => {
  it('mọi khóa đều trỏ tới một chất có thật trong thư viện', () => {
    // Gõ nhầm một ký tự trong khóa thì tên IUPAC không bao giờ hiện ra mà
    // cũng không ai biết — nên phải chặn ngay.
    const mocoi = Object.keys(IUPAC).filter((k) => !KHOA_CHAT.has(k));
    expect(mocoi).toEqual([]);
  });

  it('mỗi mục phải khác tên đang dùng ở ít nhất một ngôn ngữ', () => {
    // Bảng này để BỔ SUNG tên khác. Trùng cả hai thứ tiếng thì mục đó vô nghĩa.
    // Trùng một bên vẫn chấp nhận được — giao diện tự ẩn bên trùng, xem
    // iupacKhacTen() ở trang Công thức.
    const voNghia: string[] = [];
    for (const f of FORMULAS) {
      const t = iupacOf(keyOf(f));
      if (!t) continue;
      if (t.vi === f.vi && t.en === f.en) voNghia.push(keyOf(f));
    }
    expect(voNghia).toEqual([]);
  });

  it('không mục nào bỏ trống tên', () => {
    const thieu = Object.entries(IUPAC)
      .filter(([, v]) => !v.vi?.trim() || !v.en?.trim())
      .map(([k]) => k);
    expect(thieu).toEqual([]);
  });

  it('phủ được những chất mang tên thường dễ gây nhầm', () => {
    // Đây là các chất mà tên quen dùng KHÔNG cho biết cấu tạo
    for (const k of [
      'CH3COOH', // axit axetic  → axit etanoic
      'HCOOH', // axit fomic   → axit metanoic
      'CH3COCH3', // axeton       → propan-2-on
      'C2H4', // etilen       → eten
      'C2H2', // axetilen     → etin
      'C7H8', // toluen       → metylbenzen
      'C3H8O3', // glixerol     → propan-1,2,3-triol
      'HCHO', // fomanđehit   → metanal
    ]) {
      expect(iupacOf(k), `thiếu tên IUPAC cho ${k}`).toBeTruthy();
    }
  });

  it('đơn chất được gọi theo số nguyên tử trong phân tử', () => {
    expect(iupacOf('O2')?.vi).toBe('Đioxi');
    expect(iupacOf('O3')?.vi).toBe('Trioxi');
    expect(iupacOf('P4')?.en).toBe('Tetraphosphorus');
  });
});
