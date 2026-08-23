import { describe, it, expect } from 'vitest';
import { IUPAC, iupacOf, iupacKhacTen } from './iupac';
import { FORMULAS, keyOf } from './formulas';

const KHOA_CHAT = new Set(FORMULAS.map(keyOf));

describe('danh pháp IUPAC', () => {
  it('mọi khóa đều trỏ tới một chất có thật trong thư viện', () => {
    // Gõ nhầm một ký tự trong khóa thì tên IUPAC không bao giờ hiện ra mà
    // cũng không ai biết — nên phải chặn ngay.
    const mocoi = Object.keys(IUPAC).filter((k) => !KHOA_CHAT.has(k));
    expect(mocoi).toEqual([]);
  });

  it('không mục nào bỏ trống tên', () => {
    const thieu = Object.entries(IUPAC)
      .filter(([, v]) => !v.trim())
      .map(([k]) => k);
    expect(thieu).toEqual([]);
  });

  it('giữ nguyên dạng tiếng Anh, không Việt hóa', () => {
    // Danh pháp IUPAC là chuẩn quốc tế, chỉ có một cách viết. Việt hóa thành
    // "axit etanoic" thì mỗi sách phiên âm một kiểu, tra tài liệu nước ngoài
    // lại không khớp.
    const vietHoa = Object.entries(IUPAC)
      .filter(([, v]) => /[ăâđêôơưàáảãạèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵ]/i.test(v))
      .map(([k, v]) => `${k}: ${v}`);
    expect(vietHoa).toEqual([]);
  });

  it('không trùng đúng tên tiếng Anh đang dùng thì mới đáng ghi', () => {
    // Trùng vẫn chấp nhận được vì giao diện tiếng Việt còn cần, nhưng phải
    // ít — nếu nhiều thì bảng này đang chép lại vô ích.
    const trung = FORMULAS.filter((f) => IUPAC[keyOf(f)] === f.en);
    expect(trung.length).toBeLessThanOrEqual(5);
  });

  it('giao diện tự ẩn khi tên IUPAC trùng tên đang hiện', () => {
    expect(iupacKhacTen('CH3Cl', 'Chloromethane')).toBeNull();
    expect(iupacKhacTen('CH3Cl', 'Metyl clorua')).toBe('Chloromethane');
    expect(iupacKhacTen('KHONGCO', 'gi do')).toBeNull();
  });

  it('phủ được những chất mang tên thường dễ gây nhầm', () => {
    for (const k of [
      'CH3COOH', // axit axetic  -> Ethanoic acid
      'HCOOH', // axit fomic   -> Methanoic acid
      'CH3COCH3', // axeton       -> Propan-2-one
      'C2H4', // etilen       -> Ethene
      'C2H2', // axetilen     -> Ethyne
      'C7H8', // toluen       -> Methylbenzene
      'C3H8O3', // glixerol     -> Propane-1,2,3-triol
      'HCHO', // fomanđehit   -> Methanal
    ]) {
      expect(iupacOf(k), `thiếu tên IUPAC cho ${k}`).toBeTruthy();
    }
  });

  it('đơn chất được gọi theo số nguyên tử trong phân tử', () => {
    expect(iupacOf('O2')).toBe('Dioxygen');
    expect(iupacOf('O3')).toBe('Trioxygen');
    expect(iupacOf('P4')).toBe('Tetraphosphorus');
  });
});
