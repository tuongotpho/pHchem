import { describe, it, expect } from 'vitest';
import { IUPAC, iupacOf, iupacKhacTen } from './iupac';
import { FORMULAS, keyOf } from './formulas';

const KHOA_CHAT = new Set(FORMULAS.map(keyOf));
const CHAT = FORMULAS.filter((f) => f.cat !== 'physical');

describe('bảng ghi đè danh pháp IUPAC', () => {
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
    // Danh pháp IUPAC là chuẩn quốc tế, chỉ có một cách viết. Việt hóa thì mỗi
    // sách phiên âm một kiểu, tra tài liệu nước ngoài lại không khớp.
    const vietHoa = Object.entries(IUPAC)
      .filter(([, v]) => /[ăâđêôơưàáảãạèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵ]/i.test(v))
      .map(([k, v]) => `${k}: ${v}`);
    expect(vietHoa).toEqual([]);
  });
});

describe('mọi chất đều tra ra được tên IUPAC', () => {
  it('không chất nào bị bỏ trống, trừ trường hợp đã nêu rõ lý do', () => {
    // Phần lớn chất có tên tiếng Anh chính là tên IUPAC nên lấy luôn; bảng ghi
    // đè chỉ dùng cho chỗ tên tiếng Anh là tên thường hay tên thương mại.
    const trong = CHAT.filter((f) => !iupacOf(keyOf(f), f.en)).map(keyOf);
    // Tinh bột là HỖN HỢP amilozơ và amilopectin nên không có tên hệ thống nào
    // đúng cho cả hai thành phần — để trống là trung thực nhất. Xenlulozơ thì
    // ngược lại, là polime xác định nên đã có tên hệ thống.
    expect(trong).toEqual(['(C6H10O5)n-tinhbot']);
  });

  it('người đọc giao diện tiếng Việt luôn thấy dòng tên IUPAC', () => {
    const khongThay = CHAT.filter(
      (f) =>
        keyOf(f) !== '(C6H10O5)n-tinhbot' &&
        // Phenol, Propanal, Cholesterol: tên Việt trùng hệt tên Anh nên dòng
        // IUPAC không thêm được gì, ẩn đi là đúng.
        f.vi !== f.en &&
        !iupacKhacTen(keyOf(f), f.vi, f.en),
    ).map(keyOf);
    expect(khongThay).toEqual([]);
  });
});

describe('không được lấy tên thương mại làm tên IUPAC', () => {
  // Những chất mà tên tiếng Anh là tên thương mại, tên khoáng vật hay chữ viết
  // tắt — lấy luôn làm tên IUPAC là sai hẳn.
  const TEN_THUONG_MAI: [string, string][] = [
    ['CaSO4.2H2O', 'Gypsum'],
    ['KAl(SO4)2.12H2O', 'Potassium alum'],
    ['CaOCl2', 'Bleaching powder'],
    ['C9H8O4', 'Aspirin'],
    ['C14H9Cl5', 'DDT'],
    ['C7H5N3O6', 'TNT'],
    ['C6H8O6', 'Vitamin C'],
    ['C8H9NO2', 'Paracetamol'],
    ['C16H18N2O4S', 'Penicillin G'],
    ['C14H18N2O5', 'Aspartame'],
    ['(C6H11NO)n', 'Nylon-6'],
    ['(C12H22N2O2)n', 'Nylon-6,6'],
    ['(C2F4)n', 'PTFE (Teflon)'],
    ['(C10H8O4)n', 'PET'],
    ['C3H8O-iso', 'Isopropanol'],
    ['CCl2F2', 'Freon-12 (CFC-12)'],
  ];

  it.each(TEN_THUONG_MAI)('%s không lấy "%s" làm tên IUPAC', (khoa, tenThuongMai) => {
    const ten = iupacOf(khoa, tenThuongMai);
    expect(ten).toBeTruthy();
    expect(ten).not.toBe(tenThuongMai);
  });
});

describe('tra cứu và hiển thị', () => {
  it('có mục ghi đè thì dùng mục đó, không thì lấy tên tiếng Anh', () => {
    expect(iupacOf('CH3COCH3', 'Acetone')).toBe('Propan-2-one'); // ghi đè
    expect(iupacOf('H2O2', 'Hydrogen peroxide')).toBe('Hydrogen peroxide'); // lấy luôn
  });

  it('giao diện tự ẩn khi tên IUPAC trùng tên đang hiện', () => {
    // tiếng Anh: trùng tiêu đề nên ẩn đi
    expect(iupacKhacTen('H2O2', 'Hydrogen peroxide', 'Hydrogen peroxide')).toBeNull();
    // tiếng Việt: khác nên hiện ra
    expect(iupacKhacTen('H2O2', 'Hydro peroxit (oxy già)', 'Hydrogen peroxide')).toBe(
      'Hydrogen peroxide',
    );
  });

  it('phủ được những chất mang tên thường dễ gây nhầm', () => {
    const doi: [string, string, string][] = [
      ['CH3COOH', 'Acetic acid', 'Ethanoic acid'],
      ['HCOOH', 'Formic acid', 'Methanoic acid'],
      ['CH3COCH3', 'Acetone', 'Propan-2-one'],
      ['C2H4', 'Ethylene', 'Ethene'],
      ['C2H2', 'Acetylene', 'Ethyne'],
      ['C7H8', 'Toluene', 'Methylbenzene'],
      ['C3H8O3', 'Glycerol', 'Propane-1,2,3-triol'],
      ['HCHO', 'Formaldehyde', 'Methanal'],
    ];
    for (const [k, cu, moi] of doi) expect(iupacOf(k, cu)).toBe(moi);
  });

  it('đơn chất được gọi theo số nguyên tử trong phân tử', () => {
    expect(iupacOf('O2', 'Oxygen')).toBe('Dioxygen');
    expect(iupacOf('O3', 'Ozone')).toBe('Trioxygen');
    expect(iupacOf('P4', 'White phosphorus')).toBe('Tetraphosphorus');
  });

  it('tên đường ghi rõ dạng vòng và cấu hình, khớp với hình đang vẽ', () => {
    expect(iupacOf('C6H12O6', 'Glucose')).toBe('alpha-D-Glucopyranose');
    expect(iupacOf('C5H10O5', 'Ribose')).toBe('beta-D-Ribofuranose');
  });
});

describe('tinh bột và xenlulozơ — hai chất, không phải một', () => {
  const chat = (khoa: string) => CHAT.find((f) => keyOf(f) === khoa)!;

  it('là hai mục riêng, cùng công thức nhưng khác tên', () => {
    const tb = chat('(C6H10O5)n-tinhbot');
    const xl = chat('(C6H10O5)n-xenlulozo');
    expect(tb.formula).toBe(xl.formula); // cùng (C6H10O5)n
    expect(tb.vi).toBe('Tinh bột');
    expect(xl.vi).toBe('Xenlulozơ');
  });

  it('xenlulozơ CÓ tên hệ thống — là polime xác định, nối β-1,4 đều đặn', () => {
    const xl = chat('(C6H10O5)n-xenlulozo');
    expect(iupacOf(keyOf(xl), xl.en)).toBe('Poly[beta-(1->4)-D-glucopyranose]');
  });

  it('tinh bột KHÔNG có tên hệ thống — là hỗn hợp amilozơ và amilopectin', () => {
    // Cố ý để trống. Đặt bừa một cái tên cho hỗn hợp là bịa.
    const tb = chat('(C6H10O5)n-tinhbot');
    expect(iupacOf(keyOf(tb), tb.en)).toBeUndefined();
  });
});
