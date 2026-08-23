import { describe, it, expect } from 'vitest';
import {
  tinhTheoPhuongTrinh,
  gomLuongDaBiet,
  khoaLuong,
  type DonVi,
} from './stoichiometry';

const chat = (r: ReturnType<typeof tinhTheoPhuongTrinh>, ct: string) =>
  r.chat!.find((c) => c.congThuc === ct)!;

describe('bài toán một chất đã biết', () => {
  it('5,6 g Fe tác dụng hết với HCl cho khoảng 2,25 lít khí H2', () => {
    // Fe + 2 HCl → FeCl2 + H2
    //
    // Sách giáo khoa làm tròn Fe = 56 nên ra chẵn 0,1 mol và 2,24 L. App dùng
    // khối lượng nguyên tử chuẩn 55,845 nên ra 0,10028 mol và 2,246 L. Chênh
    // 0,3% — app lấy số đúng, không làm tròn cho đẹp đáp án.
    const r = tinhTheoPhuongTrinh('Fe + HCl -> FeCl2 + H2', [
      { viTri: 0, donVi: 'gam', giaTri: 5.6 },
    ]);
    expect(r.ok).toBe(true);
    expect(chat(r, 'Fe').mol).toBeCloseTo(0.10028, 5);
    expect(chat(r, 'H2').theTichKhi).toBeCloseTo(2.246, 3);
    expect(chat(r, 'HCl').mol).toBeCloseTo(0.20056, 5); // hệ số 2
    // vẫn phải rất gần con số quen thuộc trong sách
    expect(Math.abs(chat(r, 'H2').theTichKhi - 2.24)).toBeLessThan(0.01);
  });

  it('tính ngược từ sản phẩm ra chất tham gia', () => {
    // muốn thu 2,24 L H2 thì cần bao nhiêu gam Fe?
    const r = tinhTheoPhuongTrinh('Fe + HCl -> FeCl2 + H2', [
      { viTri: 3, donVi: 'lit', giaTri: 2.24 },
    ]);
    expect(chat(r, 'Fe').khoiLuong).toBeCloseTo(5.5845, 3);
  });

  it('hệ số phương trình được dùng đúng', () => {
    // 2 H2 + O2 → 2 H2O ; 1 mol O2 cho 2 mol H2O
    const r = tinhTheoPhuongTrinh('H2 + O2 -> H2O', [{ viTri: 1, donVi: 'mol', giaTri: 1 }]);
    expect(chat(r, 'H2O').mol).toBeCloseTo(2, 6);
    expect(chat(r, 'H2').mol).toBeCloseTo(2, 6);
  });

  it('đốt cháy hoàn toàn 1 mol propan', () => {
    // C3H8 + 5 O2 → 3 CO2 + 4 H2O
    const r = tinhTheoPhuongTrinh('C3H8 + O2 -> CO2 + H2O', [
      { viTri: 0, donVi: 'mol', giaTri: 1 },
    ]);
    expect(chat(r, 'O2').mol).toBeCloseTo(5, 6);
    expect(chat(r, 'CO2').mol).toBeCloseTo(3, 6);
    expect(chat(r, 'H2O').mol).toBeCloseTo(4, 6);
  });
});

// Đây là chỗ học sinh sai nhiều nhất: lấy nhầm chất còn dư để tính sản phẩm.
describe('chất hết trước quyết định lượng sản phẩm', () => {
  it('cho dư HCl thì Fe là chất hết trước', () => {
    const r = tinhTheoPhuongTrinh('Fe + HCl -> FeCl2 + H2', [
      { viTri: 0, donVi: 'mol', giaTri: 0.1 }, // Fe
      { viTri: 1, donVi: 'mol', giaTri: 1 }, // HCl dư nhiều
    ]);
    expect(r.chatHetTruoc).toBe('Fe');
    expect(chat(r, 'H2').mol).toBeCloseTo(0.1, 6); // theo Fe, KHÔNG theo HCl
    expect(chat(r, 'HCl').molDu).toBeCloseTo(0.8, 6); // 1 − 0,2
    expect(chat(r, 'Fe').molDu).toBeCloseTo(0, 6);
  });

  it('cho dư Fe thì HCl là chất hết trước', () => {
    const r = tinhTheoPhuongTrinh('Fe + HCl -> FeCl2 + H2', [
      { viTri: 0, donVi: 'mol', giaTri: 1 },
      { viTri: 1, donVi: 'mol', giaTri: 0.2 },
    ]);
    expect(r.chatHetTruoc).toBe('HCl');
    expect(chat(r, 'H2').mol).toBeCloseTo(0.1, 6);
    expect(chat(r, 'Fe').molDu).toBeCloseTo(0.9, 6);
  });

  it('cho vừa đủ thì không chất nào dư', () => {
    const r = tinhTheoPhuongTrinh('Fe + HCl -> FeCl2 + H2', [
      { viTri: 0, donVi: 'mol', giaTri: 0.1 },
      { viTri: 1, donVi: 'mol', giaTri: 0.2 },
    ]);
    expect(chat(r, 'Fe').molDu).toBeCloseTo(0, 9);
    expect(chat(r, 'HCl').molDu).toBeCloseTo(0, 9);
  });

  it('chỉ cho một chất tham gia thì không nói chất nào hết trước', () => {
    // Nói "Fe hết trước" khi không có gì để so là vô nghĩa
    const r = tinhTheoPhuongTrinh('Fe + HCl -> FeCl2 + H2', [
      { viTri: 0, donVi: 'gam', giaTri: 5.6 },
    ]);
    expect(r.chatHetTruoc).toBeNull();
  });
});

describe('bảo toàn khối lượng — phép tự kiểm của chính bài toán', () => {
  const CA = [
    'Fe + HCl -> FeCl2 + H2',
    'C3H8 + O2 -> CO2 + H2O',
    'KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O',
    'Al + Fe2O3 -> Al2O3 + Fe',
  ];
  it.each(CA)('tổng khối lượng hai vế bằng nhau: %s', (pt) => {
    const r = tinhTheoPhuongTrinh(pt, [{ viTri: 0, donVi: 'mol', giaTri: 1 }]);
    expect(r.ok).toBe(true);
    const trai = r.chat!.filter((c) => c.veTrai).reduce((s, c) => s + c.khoiLuong, 0);
    const phai = r.chat!.filter((c) => !c.veTrai).reduce((s, c) => s + c.khoiLuong, 0);
    expect(trai).toBeCloseTo(phai, 6);
  });
});

describe('báo lỗi rõ ràng thay vì trả số sai', () => {
  it('phương trình không cân bằng được', () => {
    const r = tinhTheoPhuongTrinh('N2 -> O2', [{ viTri: 0, donVi: 'mol', giaTri: 1 }]);
    expect(r.ok).toBe(false);
    expect(r.error).toBeTruthy();
  });

  it('không cho biết lượng chất nào', () => {
    expect(tinhTheoPhuongTrinh('Fe + HCl -> FeCl2 + H2', []).ok).toBe(false);
  });

  it('lượng chất không dương', () => {
    const r = tinhTheoPhuongTrinh('Fe + HCl -> FeCl2 + H2', [
      { viTri: 0, donVi: 'gam', giaTri: 0 },
    ]);
    expect(r.ok).toBe(false);
  });

  it('chọn chất không có trong phương trình', () => {
    const r = tinhTheoPhuongTrinh('Fe + HCl -> FeCl2 + H2', [
      { viTri: 9, donVi: 'mol', giaTri: 1 },
    ]);
    expect(r.ok).toBe(false);
  });
});

describe('phương trình cân bằng được ghi lại để đối chiếu', () => {
  it('bỏ hệ số 1 cho gọn, giữ hệ số khác 1', () => {
    const r = tinhTheoPhuongTrinh('Fe + HCl -> FeCl2 + H2', [
      { viTri: 0, donVi: 'mol', giaTri: 1 },
    ]);
    expect(r.phuongTrinhCanBang).toBe('Fe + 2 HCl → FeCl2 + H2');
  });
});

// Lỗi cũ: ô nhập đánh số theo VỊ TRÍ. Nhập "Fe 5,6 g" rồi sửa phương trình từ
// "Fe + HCl → ..." thành "HCl + Fe → ...", con số 5,6 g vẫn nằm ở ô số 0 —
// giờ là HCl. Đáp án khác hẳn mà app không báo một tiếng.
describe('giữ lượng đã gõ — sửa phương trình không được gắn nhầm chất', () => {
  const FE_HCL = ['Fe', 'HCl', 'FeCl2', 'H2'];

  it('lấy đúng ô khớp cả vị trí lẫn công thức', () => {
    const nhap = { [khoaLuong(0, 'Fe')]: { donVi: 'gam' as DonVi, giaTri: '5,6' } };
    expect(gomLuongDaBiet(FE_HCL, nhap)).toEqual([
      { viTri: 0, donVi: 'gam', giaTri: 5.6 },
    ]);
  });

  it('ĐẢO THỨ TỰ CHẤT thì lượng cũ rụng, không nhảy sang chất khác', () => {
    const nhap = { [khoaLuong(0, 'Fe')]: { donVi: 'gam' as DonVi, giaTri: '5,6' } };
    // Fe không còn ở vị trí 0 nữa → không có lượng nào được nhận
    expect(gomLuongDaBiet(['HCl', 'Fe', 'FeCl2', 'H2'], nhap)).toEqual([]);
  });

  it('đổi hẳn sang phương trình khác thì cũng rụng sạch', () => {
    const nhap = { [khoaLuong(0, 'Fe')]: { donVi: 'gam' as DonVi, giaTri: '5,6' } };
    expect(gomLuongDaBiet(['C3H8', 'O2', 'CO2', 'H2O'], nhap)).toEqual([]);
  });

  it('cùng một chất đứng cả hai vế vẫn phân biệt được', () => {
    // Vì sao khóa phải có CẢ vị trí: nước vừa tham gia vừa là sản phẩm.
    const nhap = {
      [khoaLuong(0, 'H2O')]: { donVi: 'mol' as DonVi, giaTri: '2' },
      [khoaLuong(2, 'H2O')]: { donVi: 'mol' as DonVi, giaTri: '5' },
    };
    expect(gomLuongDaBiet(['H2O', 'CaO', 'H2O'], nhap)).toEqual([
      { viTri: 0, donVi: 'mol', giaTri: 2 },
      { viTri: 2, donVi: 'mol', giaTri: 5 },
    ]);
  });

  it('bỏ qua ô trống và ô gõ bậy', () => {
    const nhap = {
      [khoaLuong(0, 'Fe')]: { donVi: 'gam' as DonVi, giaTri: '' },
      [khoaLuong(1, 'HCl')]: { donVi: 'mol' as DonVi, giaTri: 'abc' },
      [khoaLuong(2, 'FeCl2')]: { donVi: 'mol' as DonVi, giaTri: '0' },
      [khoaLuong(3, 'H2')]: { donVi: 'lit' as DonVi, giaTri: '2,24' },
    };
    expect(gomLuongDaBiet(FE_HCL, nhap)).toEqual([
      { viTri: 3, donVi: 'lit', giaTri: 2.24 },
    ]);
  });

  it('nối thẳng vào phép tính vẫn ra đúng số', () => {
    // Kiểm chéo: gom xong đưa luôn vào tinhTheoPhuongTrinh, 5,6 g Fe = 0,1 mol
    const nhap = { [khoaLuong(0, 'Fe')]: { donVi: 'gam' as DonVi, giaTri: '5,6' } };
    const kq = tinhTheoPhuongTrinh(
      'Fe + HCl -> FeCl2 + H2',
      gomLuongDaBiet(FE_HCL, nhap),
    );
    expect(kq.ok).toBe(true);
    expect(kq.chat![3].theTichKhi).toBeCloseTo(2.246, 2); // lít H2 ở đktc
  });
});
