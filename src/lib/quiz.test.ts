import { describe, it, expect } from 'vitest';
import { sinhDe, TEN_LOAI, type LoaiCau, type CauHoi } from './quiz';
import { balance } from './balance';
import { MATRIX, CATIONS, ANIONS, SOLUB_META, buildFormula } from '../data/solubility';
import { REACTIONS } from '../data/reactions';

const CAC_LOAI = Object.keys(TEN_LOAI) as LoaiCau[];

/** Sinh thật nhiều đề để quét, thay vì tin vào một bộ may mắn. */
function quet(soHat = 60, soCau = 12): CauHoi[] {
  const all: CauHoi[] = [];
  for (let h = 1; h <= soHat; h++) all.push(...sinhDe(h, soCau, 'vi'));
  return all;
}

describe('mọi câu sinh ra đều dùng được', () => {
  const de = quet();

  it('sinh được đủ số câu yêu cầu', () => {
    expect(sinhDe(1, 10, 'vi')).toHaveLength(10);
    expect(sinhDe(999, 25, 'vi')).toHaveLength(25);
    expect(de.length).toBeGreaterThan(600);
  });

  it('câu nào cũng có đề, có lựa chọn và có giải thích', () => {
    const hong = de.filter(
      (c) => !c.de.trim() || !c.luaChon.length || !c.giaiThich?.trim(),
    );
    expect(hong.map((c) => c.de)).toEqual([]);
  });

  it('không lựa chọn nào trùng nhau trong cùng một câu', () => {
    // Trùng lựa chọn thì có thể có hai đáp án cùng đúng — đề hỏng.
    const hong = de.filter((c) => new Set(c.luaChon).size !== c.luaChon.length);
    expect(hong.map((c) => c.de + ' | ' + c.luaChon.join(' / '))).toEqual([]);
  });

  it('chỉ số đáp án luôn nằm trong mảng lựa chọn', () => {
    const hong = de.filter((c) => c.dapAn < 0 || c.dapAn >= c.luaChon.length);
    expect(hong.map((c) => c.de)).toEqual([]);
  });

  it('không câu nào bỏ trống một lựa chọn', () => {
    const hong = de.filter((c) => c.luaChon.some((x) => !x || !x.trim()));
    expect(hong.map((c) => c.de)).toEqual([]);
  });

  it('mỗi câu có ít nhất 3 lựa chọn', () => {
    expect(Math.min(...de.map((c) => c.luaChon.length))).toBeGreaterThanOrEqual(3);
  });
});

describe('đáp án đúng thật sự đúng, đối chiếu ngược về dữ liệu gốc', () => {
  const de = quet();

  it('câu cân bằng: đáp án bằng đúng tổng hệ số tính lại từ đầu', () => {
    // Không tin con số trong đề — cân bằng lại từ chính phương trình hiện ra
    const sai: string[] = [];
    for (const c of de.filter((x) => x.loai === 'canBang')) {
      const kq = balance(c.phu!.replace('→', '->'));
      const tong = kq.coefficients!.reduce((a, b) => a + b, 0);
      if (c.luaChon[c.dapAn] !== String(tong)) sai.push(`${c.phu}: đề ghi ${c.luaChon[c.dapAn]}, tính lại ra ${tong}`);
    }
    expect(sai).toEqual([]);
  });

  it('câu độ tan: đáp án khớp đúng ô trong bảng tính tan', () => {
    const sai: string[] = [];
    for (const c of de.filter((x) => x.loai === 'doTan')) {
      // dò ngược công thức về đúng ô cation - anion
      let thay = false;
      for (let i = 0; i < CATIONS.length && !thay; i++)
        for (let j = 0; j < ANIONS.length && !thay; j++)
          if (buildFormula(CATIONS[i], ANIONS[j]) === c.phu) {
            thay = true;
            const dung = SOLUB_META[MATRIX[i][j]].vi;
            if (c.luaChon[c.dapAn] !== dung)
              sai.push(`${c.phu}: đề ghi "${c.luaChon[c.dapAn]}", bảng ghi "${dung}"`);
          }
      if (!thay) sai.push(`${c.phu}: không dò được về ô nào trong bảng`);
    }
    expect(sai).toEqual([]);
  });

  it('câu hiện tượng: đáp án là hiện tượng có thật của đúng phản ứng đó', () => {
    const sai: string[] = [];
    for (const c of de.filter((x) => x.loai === 'hienTuong')) {
      const r = REACTIONS.find((x) => x.eq === c.phu);
      if (!r) sai.push(`${c.phu}: không có phản ứng này`);
      else if (r.phen_vi !== c.luaChon[c.dapAn])
        sai.push(`${c.phu}: đáp án không khớp hiện tượng trong dữ liệu`);
    }
    expect(sai).toEqual([]);
  });

  it('không câu độ tan nào hỏi về ô "không tồn tại"', () => {
    // Hỏi "AgOH tan hay không" là vô nghĩa vì chất đó không tồn tại
    const co = de.filter((x) => x.loai === 'doTan');
    expect(co.every((c) => c.luaChon[c.dapAn] !== SOLUB_META['-'].vi)).toBe(true);
  });
});

describe('bộ đề đa dạng và lặp lại được', () => {
  it('cùng một hạt giống cho đúng cùng một bộ đề', () => {
    // Nhờ vậy người dùng chia sẻ được đúng đề đã làm, và phép kiểm chạy được
    expect(sinhDe(42, 8, 'vi')).toEqual(sinhDe(42, 8, 'vi'));
  });

  it('hạt giống khác cho bộ đề khác', () => {
    expect(sinhDe(1, 8, 'vi')).not.toEqual(sinhDe(2, 8, 'vi'));
  });

  it('ra đủ cả sáu dạng khi không giới hạn', () => {
    const co = new Set(quet(40, 15).map((c) => c.loai));
    expect([...co].sort()).toEqual([...CAC_LOAI].sort());
  });

  it('giới hạn dạng nào thì chỉ ra đúng dạng đó', () => {
    for (const loai of CAC_LOAI) {
      const de = sinhDe(7, 10, 'vi', [loai]);
      expect(de.length, `dạng ${loai} sinh hụt`).toBeGreaterThan(0);
      expect(de.every((c) => c.loai === loai), `dạng ${loai} lẫn dạng khác`).toBe(true);
    }
  });

  it('đáp án đúng rải đều các vị trí, không dồn về một chỗ', () => {
    // Nếu đáp án luôn ở vị trí A thì người làm đoán bừa cũng đúng
    const de = quet(80, 10);
    const dem = [0, 0, 0, 0];
    for (const c of de) dem[c.dapAn]++;
    const tong = de.length;
    for (let i = 0; i < 4; i++) expect(dem[i] / tong).toBeGreaterThan(0.1);
  });

  it('trong một bộ đề không có hai câu hỏi hệt nhau', () => {
    for (let h = 1; h <= 30; h++) {
      const de = sinhDe(h, 15, 'vi');
      const khoa = de.map((c) => c.de + '||' + c.phu);
      expect(new Set(khoa).size, `hạt ${h} có câu lặp`).toBe(khoa.length);
    }
  });
});

describe('sinh đề bằng tiếng Anh', () => {
  it('ra đủ câu và không lẫn tiếng Việt trong lựa chọn', () => {
    const de = sinhDe(5, 12, 'en');
    expect(de).toHaveLength(12);
    const coDau = de.filter((c) =>
      c.luaChon.some((x) => /[ăâđêôơưàáảãạèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵ]/i.test(x)),
    );
    expect(coDau.map((c) => c.de)).toEqual([]);
  });
});

// Hợp đồng của bộ sinh đề: dù hạt giống nào, dạng nào, cũng KHÔNG được ném
// lỗi và không được trả câu hỏng. Trước đây `chon()` rút từ mảng rỗng sẽ trả
// undefined rồi câu lệnh ngay sau đọc thuộc tính của undefined và làm sập cả
// trang — các mảng nguồn đều lọc từ dữ liệu nên chỉ cần dữ liệu đổi là rỗng
// lúc nào không hay.
describe('bộ sinh đề không bao giờ được ném lỗi hay trả câu hỏng', () => {
  const MOI_DANG = Object.keys(TEN_LOAI) as LoaiCau[];

  it('200 hạt giống, mọi dạng, không lần nào nổ', () => {
    for (let hat = 0; hat < 200; hat++) {
      expect(() => sinhDe(hat, 5, 'vi')).not.toThrow();
    }
  });

  it('từng dạng riêng lẻ cũng không nổ', () => {
    for (const loai of MOI_DANG) {
      for (let hat = 0; hat < 30; hat++) {
        expect(() => sinhDe(hat, 5, 'vi', [loai]), `${loai} hạt ${hat}`).not.toThrow();
        expect(() => sinhDe(hat, 5, 'en', [loai]), `${loai} hạt ${hat}`).not.toThrow();
      }
    }
  });

  it('mọi câu ra được đều dùng được: đủ lựa chọn, đáp án nằm trong tầm', () => {
    for (let hat = 0; hat < 100; hat++) {
      for (const c of sinhDe(hat, 10, 'vi')) {
        expect(c.luaChon.length, c.de).toBeGreaterThanOrEqual(3);
        expect(c.dapAn).toBeGreaterThanOrEqual(0);
        expect(c.dapAn).toBeLessThan(c.luaChon.length);
        expect(c.luaChon[c.dapAn]).toBeTruthy();
      }
    }
  });

  it('luôn trả về mảng, kể cả khi xin số câu bằng 0', () => {
    expect(Array.isArray(sinhDe(1, 0, 'vi'))).toBe(true);
    expect(sinhDe(1, 0, 'vi')).toEqual([]);
  });
});

describe('dòng phụ của câu hỏi phải khai rõ kiểu hiển thị', () => {
  it('câu nào có dòng phụ thì phải có kieuPhu — không rơi vào mặc định', () => {
    // Sinh nhiều đề cho phủ hết các dạng câu.
    const thieu = new Set<string>();
    for (let hat = 0; hat < 40; hat++) {
      for (const c of sinhDe(hat, 12, 'vi')) {
        if (c.phu && !c.kieuPhu) thieu.add(c.loai);
      }
    }
    expect([...thieu]).toEqual([]);
  });

  it('dòng phụ có "Z =" phải là kiểu chữ, không được hạ chỉ số', () => {
    // Bẫy thật: câu về nhóm nguyên tố có dòng phụ "Fe · Z = 26". Hạ chỉ số
    // thì số hiệu nguyên tử biến thành "Z = ₂₆".
    const pham: string[] = [];
    for (let hat = 0; hat < 40; hat++) {
      for (const c of sinhDe(hat, 12, 'vi')) {
        if (c.phu?.includes('Z =') && c.kieuPhu !== 'chu') {
          pham.push(`${c.loai}: "${c.phu}" khai kiểu ${c.kieuPhu}`);
        }
      }
    }
    expect(pham).toEqual([]);
  });

  it('dòng phụ có mũi tên phải là kiểu phương trình', () => {
    const pham: string[] = [];
    for (let hat = 0; hat < 40; hat++) {
      for (const c of sinhDe(hat, 12, 'vi')) {
        if (c.phu?.includes('→') && c.kieuPhu !== 'phuongTrinh') {
          pham.push(`${c.loai}: "${c.phu}" khai kiểu ${c.kieuPhu}`);
        }
      }
    }
    expect(pham).toEqual([]);
  });
});
