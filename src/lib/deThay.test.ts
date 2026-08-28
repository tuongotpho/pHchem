import { describe, it, expect } from 'vitest';
import {
  hopLeBoDe,
  duongDanDanhMuc,
  duongDanBoDe,
  duongDanHinh,
  catTheoMoc,
  gomTheoChuyenDe,
  MOC_HINH,
  MOC_BANG,
} from './deThay';

const cauTot = { so: 1, de: 'Hỏi?', luaChon: ['a', 'b', 'c', 'd'], dapAn: 2 };
const boTot = { id: 'x', ten: 'X', chuyenDe: 'X', nguon: 'x.docx', soCau: 1, cau: [cauTot] };

describe('gomTheoChuyenDe — gom bộ đề theo chương', () => {
  const muc = (id: string, chuyenDe: string, soCau: number) => ({ id, ten: id, chuyenDe, soCau });

  it('nhiều bộ đề cùng chuyên đề thì gộp làm một, cộng dồn số câu', () => {
    // Thầy hay gửi nhiều đợt cho cùng một chương. Học sinh chọn "Nitrogen" là
    // phải được cả hai bộ, chứ không phải chọn từng tên file.
    const ra = gomTheoChuyenDe([
      muc('nito-1', 'Nitrogen', 42),
      muc('sulfur', 'Sulfur', 30),
      muc('nito-2', 'Nitrogen', 18),
    ]);
    expect(ra.map((x) => x.ten)).toEqual(['Nitrogen', 'Sulfur']);
    expect(ra[0].soCau).toBe(60);
    expect(ra[0].muc.map((m) => m.id)).toEqual(['nito-1', 'nito-2']);
  });

  it('thiếu chuyên đề thì lấy tên bộ đề làm chuyên đề', () => {
    const ra = gomTheoChuyenDe([{ id: 'a', ten: 'Đề A', chuyenDe: '', soCau: 5 }]);
    expect(ra[0].ten).toBe('Đề A');
  });

  it('danh mục rỗng thì trả mảng rỗng, không sập', () => {
    expect(gomTheoChuyenDe([])).toEqual([]);
  });
});

describe('duong dan — phải bám BASE_URL', () => {
  it('ghép đúng khi app nằm ở gốc', () => {
    expect(duongDanDanhMuc('/')).toBe('/de/danh-muc.json');
    expect(duongDanBoDe('/', 'nitrogen-2026')).toBe('/de/nitrogen-2026.json');
    expect(duongDanHinh('/', 'ab12.png')).toBe('/de/hinh/ab12.png');
  });

  it('ghép đúng khi app nằm trong thư mục con', () => {
    // Bản GitHub Pages nằm dưới /pHchem/. Gõ cứng "/de/..." là 404 ở đó, mà
    // lỗi chỉ lộ ra sau khi deploy chứ chạy máy vẫn ngon.
    expect(duongDanDanhMuc('/pHchem/')).toBe('/pHchem/de/danh-muc.json');
    expect(duongDanBoDe('/pHchem/', 'nitrogen-2026')).toBe('/pHchem/de/nitrogen-2026.json');
    expect(duongDanHinh('/pHchem/', 'ab12.png')).toBe('/pHchem/de/hinh/ab12.png');
  });
});

describe('hopLeBoDe — chặn bộ đề hỏng trước khi hiện lên', () => {
  it('bộ đề đúng thì qua', () => {
    expect(hopLeBoDe(boTot)).toBe(true);
  });

  it('không phải bộ đề thì loại', () => {
    expect(hopLeBoDe(null)).toBe(false);
    expect(hopLeBoDe({})).toBe(false);
    expect(hopLeBoDe({ id: 'x', cau: [] })).toBe(false);
    expect(hopLeBoDe({ id: 5, cau: [cauTot] })).toBe(false);
  });

  it('thiếu hoặc thừa lựa chọn thì loại', () => {
    expect(hopLeBoDe({ ...boTot, cau: [{ ...cauTot, luaChon: ['a', 'b', 'c'] }] })).toBe(false);
    expect(hopLeBoDe({ ...boTot, cau: [{ ...cauTot, luaChon: ['a', 'b', 'c', 'd', 'e'] }] })).toBe(
      false,
    );
  });

  it('lựa chọn rỗng thì loại', () => {
    // Câu có lựa chọn rỗng sẽ hiện thành nút trắng trơn, học sinh không biết
    // bấm gì. Thà không hiện cả bộ đề.
    expect(hopLeBoDe({ ...boTot, cau: [{ ...cauTot, luaChon: ['a', '', 'c', 'd'] }] })).toBe(false);
  });

  it('đáp án trỏ ra ngoài mảng thì loại', () => {
    // Đây là ca nguy hiểm nhất: đáp án 4 trên mảng 4 phần tử làm mọi câu trả
    // lời đều bị chấm SAI, mà màn hình vẫn chạy bình thường.
    expect(hopLeBoDe({ ...boTot, cau: [{ ...cauTot, dapAn: 4 }] })).toBe(false);
    expect(hopLeBoDe({ ...boTot, cau: [{ ...cauTot, dapAn: -1 }] })).toBe(false);
    expect(hopLeBoDe({ ...boTot, cau: [{ ...cauTot, dapAn: 1.5 }] })).toBe(false);
    expect(hopLeBoDe({ ...boTot, cau: [{ ...cauTot, dapAn: '2' }] })).toBe(false);
  });

  it('một câu hỏng là loại cả bộ', () => {
    expect(hopLeBoDe({ ...boTot, cau: [cauTot, { ...cauTot, so: 2, dapAn: 9 }] })).toBe(false);
  });
});

describe('catTheoMoc — ảnh và bảng nằm đúng chỗ trong đề bài', () => {
  it('tách mốc ra thành khúc riêng', () => {
    expect(catTheoMoc('Trên\n' + MOC_BANG + '\nDưới')).toEqual(['Trên\n', MOC_BANG, '\nDưới']);
    expect(catTheoMoc('Đề\n' + MOC_HINH)).toEqual(['Đề\n', MOC_HINH]);
  });

  it('đề không có mốc thì trả về nguyên một khúc', () => {
    expect(catTheoMoc('Chỉ có chữ')).toEqual(['Chỉ có chữ']);
  });

  it('không đẻ ra khúc rỗng', () => {
    // Khúc rỗng sẽ thành một thẻ trống trong giao diện, đẩy giãn dòng vô cớ.
    expect(catTheoMoc(MOC_HINH)).toEqual([MOC_HINH]);
  });
});
