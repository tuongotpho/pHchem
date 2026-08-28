import { describe, it, expect } from 'vitest';
import { phanTich, laCongThuc } from './kyHieuHoa.js';
import type { Manh } from './kyHieuHoa.js';

/** Dựng lại chuỗi để đọc cho dễ: [d]=chỉ số dưới, [t]=số mũ, [tt]=trạng thái. */
const ve = (s: string) =>
  phanTich(s)
    .map((m: Manh) => {
      if (m.k === 'duoi') return `[d${m.t}]`;
      if (m.k === 'tren') return `[t${m.t}]`;
      if (m.k === 'trangThai') return `[tt${m.t}]`;
      if (m.k === 'muiTen')
        return `[mt${m.t}${m.tren ? '|' + m.tren : ''}${m.duoi ? '|' + m.duoi : ''}]`;
      return m.t;
    })
    .join('');

// ═══════════════════════════════════════════════════════════════════
// Nhóm quan trọng nhất: KHÔNG ĐƯỢC ĐỘNG VÀO.
// Hiện chữ thô chỉ là xấu; hiện sai là dạy sai hóa học. Mọi câu dưới đây lấy
// nguyên văn từ đề Nitrogen của giáo viên.
// ═══════════════════════════════════════════════════════════════════
describe('không được động vào chữ thường', () => {
  const nguyenVan = [
    'Trong tự nhiên, đơn chất nitrogen có nhiều trong',
    'Khí nào phổ biến nhất trong khí quyển Trái Đất?',
    'Câu 15. Người ta có thể thu khí vào bình theo hình vẽ nào sau đây?',
    'A. Hình 2.',
    'B. Hình 1.',
    'C. Hình 2 hoặc 3.',
    'nồng độ là 0,30 mol/L',
    'Nguyên tử khối trung bình là 14,004.',
    'tự do chiếm khoảng 20% thể tích không khí.',
    'Chu kì 2, nhóm VA.',
    'Cân bằng hoá học không bị chuyển dịch khi',
    'có khí mùi khai bay lên và kết tủa trắng.',
    'Dung dịch A tác dụng với dung dịch NaOH',
  ];

  for (const s of nguyenVan) {
    it(`giữ nguyên: "${s.slice(0, 42)}"`, () => {
      expect(ve(s)).toBe(s);
    });
  }
});

describe('laCongThuc — cửa vào phải chặt', () => {
  it('nhận công thức thật', () => {
    expect(laCongThuc('H2O')).toBe(true);
    expect(laCongThuc('N2O4')).toBe(true);
    expect(laCongThuc('(NH4)2CO3')).toBe(true);
    expect(laCongThuc('NH4+')).toBe(true);
    expect(laCongThuc('NO3-')).toBe(true);
    expect(laCongThuc('Ca3N2')).toBe(true);
  });

  it('LOẠI những thứ trông giống mà không phải', () => {
    // Mỗi dòng dưới đây là một cách làm hỏng đề nếu lọt qua.
    expect(laCongThuc('Hình')).toBe(false); // chữ Việt
    expect(laCongThuc('1')).toBe(false); // số trần, "Hình 1"
    expect(laCongThuc('15')).toBe(false); // "Câu 15"
    expect(laCongThuc('0,30')).toBe(false); // có dấu phẩy
    expect(laCongThuc('14,004')).toBe(false);
    expect(laCongThuc('20%')).toBe(false);
    expect(laCongThuc('mol/L')).toBe(false); // chữ thường mở đầu
    expect(laCongThuc('VA')).toBe(false); // tên nhóm, không có số
    expect(laCongThuc('(1)')).toBe(false); // số thứ tự trong sơ đồ
  });

  it('mẩu không có số và không có điện tích thì không cần đụng tới', () => {
    // Vẽ ra cũng y hệt chữ gốc, nên để nguyên cho an toàn.
    expect(laCongThuc('NO')).toBe(false);
    expect(laCongThuc('NaOH')).toBe(false);
  });
});

describe('chỉ số dưới', () => {
  it('số sau ký hiệu nguyên tố hạ xuống', () => {
    expect(ve('H2O')).toBe('H[d2]O');
    expect(ve('H2SO4')).toBe('H[d2]SO[d4]');
    expect(ve('Ca3N2')).toBe('Ca[d3]N[d2]');
  });

  it('số sau ngoặc đóng cũng hạ xuống', () => {
    expect(ve('(NH4)2CO3')).toBe('(NH[d4])[d2]CO[d3]');
  });

  it('HỆ SỐ đứng đầu KHÔNG hạ xuống', () => {
    // Đây là lỗi của bộ cũ: "2NO2" thành "₂NO₂", hệ số biến thành chỉ số.
    expect(ve('2NO2')).toBe('2NO[d2]');
    expect(ve('3H2')).toBe('3H[d2]');
    expect(ve('4NH3 + 5O2')).toBe('4NH[d3] + 5O[d2]');
  });
});

describe('điện tích và đồng vị lên TRÊN, không xuống dưới', () => {
  it('ion đơn giản', () => {
    expect(ve('NH4+')).toBe('NH[d4][t+]');
    expect(ve('NO3-')).toBe('NO[d3][t−]');
  });

  it('ion nhiều điện tích', () => {
    expect(ve('CrO4^2-')).toBe('CrO[d4][t2−]');
    expect(ve('Fe^3+')).toBe('Fe[t3+]');
    // Không có dấu ^ thì chữ số là CHỈ SỐ DƯỚI, dấu là điện tích 1 — đúng quy
    // ước mhchem. Viết "Fe3+" mà muốn Fe³⁺ là viết sai, phải là "Fe^3+".
    expect(ve('Fe3+')).toBe('Fe[d3][t+]');
  });

  it('số khối đồng vị đứng trước ký hiệu', () => {
    // Bộ cũ cho ra "₁₄N" — số khối tụt xuống thành chỉ số, sai hẳn.
    expect(ve('^14N')).toBe('[t14]N');
    expect(ve('^15N')).toBe('[t15]N');
  });
});

describe('cấu hình electron', () => {
  it('số electron là SỐ MŨ chứ không phải chỉ số dưới', () => {
    // Bộ cũ cho ra "₁s₂₂s₂₂p₃" — sai toàn bộ.
    expect(ve('1s22s22p3')).toBe('1s[t2]2s[t2]2p[t3]');
    expect(ve('1s22s22p5')).toBe('1s[t2]2s[t2]2p[t5]');
    // Phân lớp đầy 10 electron vẫn đọc đúng, không bị cắt thành 1 rồi 0.
    expect(ve('3d104s2')).toBe('3d[t10]4s[t2]');
  });
});

describe('trạng thái chất in nghiêng', () => {
  it('nhận (g) (l) (s) (aq)', () => {
    expect(ve('N2(g)')).toBe('N[d2][tt(g)]');
    expect(ve('N2O4(g)')).toBe('N[d2]O[d4][tt(g)]');
  });
});

describe('mũi tên phản ứng và điều kiện', () => {
  it('mũi tên một chiều và hai chiều', () => {
    expect(ve('A -> B')).toBe('A [mt⟶] B');
    expect(ve('A <=> B')).toBe('A [mt⇌] B');
    expect(ve('A <-> B')).toBe('A [mt⟷] B');
    expect(ve('A <- B')).toBe('A [mt⟵] B');
  });

  it('điều kiện nằm trên mũi tên', () => {
    // Đây là thứ ký tự Unicode trần không làm được, và là lý do phải có bộ này.
    expect(ve('N2 <=>[xt, t°, p] 2NH3')).toBe('N[d2] [mt⇌|xt, t°, p] 2NH[d3]');
    expect(ve('4NH3 ->[t°, Pt] 4NO')).toBe('4NH[d3] [mt⟶|t°, Pt] 4NO');
  });

  it('điều kiện trên và dưới', () => {
    expect(ve('A ->[trên][dưới] B')).toBe('A [mt⟶|trên|dưới] B');
  });

  it('mũi tên không kèm điều kiện thì không nuốt dấu ngoặc vuông sau đó', () => {
    expect(ve('A -> B [ghi chú]')).toBe('A [mt⟶] B [ghi chú]');
  });
});

describe('khai tường minh — lối thoát khi luật chung không đoán nổi', () => {
  it('ký hiệu có chữ Hy Lạp vẫn hạ/nâng được', () => {
    // "ΔrH°298" không lọt cửa laCongThuc vì có ký tự ngoài ASCII.
    expect(ve('ΔrH°_{298} < 0')).toBe('ΔrH°[d298] < 0');
    expect(ve('x^{2}')).toBe('x[t2]');
  });
});

describe('cả câu thật trong đề, trộn chữ Việt với công thức', () => {
  it('câu 11 — chỉ đụng vào phần công thức', () => {
    expect(ve('Trong phản ứng: N2(g) + 3H2(g) <=>[xt, t°, p] 2NH3(g). N2 thể hiện')).toBe(
      'Trong phản ứng: N[d2][tt(g)] + 3H[d2][tt(g)] [mt⇌|xt, t°, p] 2NH[d3][tt(g)]. N[d2] thể hiện',
    );
  });

  it('câu 36 — công thức lẫn trong ngoặc chữ Việt', () => {
    expect(ve('2NO2(g) (nâu đỏ) <=> N2O4(g) (không màu)')).toBe(
      '2NO[d2][tt(g)] (nâu đỏ) [mt⇌] N[d2]O[d4][tt(g)] (không màu)',
    );
  });

  it('câu 41 — chữ A giữa câu không bị coi là công thức', () => {
    const s = 'Dung dịch A tác dụng với dung dịch AgNO3 xuất hiện kết tủa màu trắng.';
    expect(ve(s)).toBe('Dung dịch A tác dụng với dung dịch AgNO[d3] xuất hiện kết tủa màu trắng.');
  });
});
