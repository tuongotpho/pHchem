import { describe, it, expect } from 'vitest';
import {
  CATIONS,
  ANIONS,
  MATRIX,
  buildFormula,
  MAU_KET_TUA,
  mauKetTua,
  chuTrenNen,
} from './solubility';

const cat = (a: string) => CATIONS.find((c) => c.ascii === a)!;
const an = (a: string) => ANIONS.find((c) => c.ascii === a)!;

describe('buildFormula — ghép công thức từ cation + anion', () => {
  const cases: [string, string, string][] = [
    ['Na', 'Cl', 'NaCl'],
    ['Ca', 'OH', 'Ca(OH)2'],
    ['Al', 'SO4', 'Al2(SO4)3'],
    ['Fe3', 'PO4', 'FePO4'],
    ['Fe2', 'SO4', 'FeSO4'],
    ['Fe3', 'Cl', 'FeCl3'],
    ['H', 'SO4', 'H2SO4'],
    ['H', 'Cl', 'HCl'],
    ['H', 'NO3', 'HNO3'],
    ['H', 'PO4', 'H3PO4'],
    ['H', 'S', 'H2S'],
    ['NH4', 'Cl', 'NH4Cl'],
    ['NH4', 'SO4', '(NH4)2SO4'],
    ['Ba', 'SO4', 'BaSO4'],
    ['Ca', 'PO4', 'Ca3(PO4)2'],
    ['Ag', 'Cl', 'AgCl'],
    ['Cu', 'OH', 'Cu(OH)2'],
    ['Al', 'OH', 'Al(OH)3'],
    ['K', 'CO3', 'K2CO3'],
    ['Pb', 'S', 'PbS'],
    ['H', 'OH', 'H2O'],
    ['Na', 'CH3COO', 'CH3COONa'],
    ['Ca', 'CH3COO', '(CH3COO)2Ca'],
    ['Pb', 'I', 'PbI2'],
    ['Na', 'SO3', 'Na2SO3'],
    ['Ca', 'SiO3', 'CaSiO3'],
  ];
  it.each(cases)('%s + %s = %s', (c, a, expected) => {
    expect(buildFormula(cat(c), an(a))).toBe(expected);
  });
});

describe('ma trận độ tan', () => {
  it('ma trận đủ ô cho mọi cặp cation-anion', () => {
    expect(MATRIX.length).toBe(CATIONS.length);
    MATRIX.forEach((row) => expect(row.length).toBe(ANIONS.length));
  });
  it('mọi muối nitrat đều tan', () => {
    const i = ANIONS.findIndex((a) => a.ascii === 'NO3');
    MATRIX.forEach((row) => expect(row[i]).toBe('T'));
  });
  it('mọi muối axetat đều tan hoặc ít tan, không có ô kết tủa', () => {
    const i = ANIONS.findIndex((a) => a.ascii === 'CH3COO');
    MATRIX.forEach((row) => expect(['T', 'IT']).toContain(row[i]));
  });
  it('Cu2+ và Fe3+ không cùng tồn tại với I- vì oxi hóa iotua thành iot', () => {
    const i = ANIONS.findIndex((a) => a.ascii === 'I');
    expect(MATRIX[CATIONS.findIndex((c) => c.ascii === 'Cu')][i]).toBe('-');
    expect(MATRIX[CATIONS.findIndex((c) => c.ascii === 'Fe3')][i]).toBe('-');
  });
  it('silicat chỉ tan với natri và kali', () => {
    const i = ANIONS.findIndex((a) => a.ascii === 'SiO3');
    CATIONS.forEach((c, r) => {
      if (c.ascii === 'Na' || c.ascii === 'K') expect(MATRIX[r][i]).toBe('T');
      else expect(MATRIX[r][i]).not.toBe('T');
    });
  });
  it('AgCl và BaSO4 không tan', () => {
    const ag = CATIONS.findIndex((c) => c.ascii === 'Ag');
    const cl = ANIONS.findIndex((a) => a.ascii === 'Cl');
    const ba = CATIONS.findIndex((c) => c.ascii === 'Ba');
    const so4 = ANIONS.findIndex((a) => a.ascii === 'SO4');
    expect(MATRIX[ag][cl]).toBe('I');
    expect(MATRIX[ba][so4]).toBe('I');
  });
});

describe('màu kết tủa', () => {
  it('mỗi màu phải trỏ tới một ô KẾT TỦA có thật trong bảng', () => {
    // Ghép hết công thức của những ô không tan / ít tan.
    const coKetTua = new Set<string>();
    CATIONS.forEach((c, i) =>
      ANIONS.forEach((a, j) => {
        const o = MATRIX[i][j];
        if (o === 'I' || o === 'IT') coKetTua.add(buildFormula(c, a));
      }),
    );
    // Khóa nào không khớp ô nào là rác: hoặc gõ sai công thức, hoặc ô đã đổi
    // sang "tan" mà quên gỡ màu. Cả hai đều làm app nói sai.
    const treo = Object.keys(MAU_KET_TUA).filter((ct) => !coKetTua.has(ct));
    expect(treo).toEqual([]);
  });

  it('không chất nào bị bỏ trống nửa vời: có tên màu thì phải có mã màu', () => {
    const thieu: string[] = [];
    for (const [ct, m] of Object.entries(MAU_KET_TUA)) {
      if (!m.vi.trim() || !m.en.trim()) thieu.push(`${ct}: thiếu tên màu`);
      if (!/^#[0-9a-f]{6}$/i.test(m.css)) thieu.push(`${ct}: mã màu sai dạng`);
    }
    expect(thieu).toEqual([]);
  });

  it('bộ ba màu kinh điển của bài nhận biết phải đúng', () => {
    // Ba chất này là xương sống của mọi bài nhận biết ở phổ thông. Sai một
    // trong ba là app dạy sai điều cơ bản nhất.
    expect(mauKetTua('Cu(OH)2')?.vi).toBe('xanh lam');
    expect(mauKetTua('Fe(OH)3')?.vi).toBe('nâu đỏ');
    expect(mauKetTua('Fe(OH)2')?.vi).toBe('trắng xanh');
    // Và ba halogenua bạc, cũng kinh điển không kém
    expect(mauKetTua('AgCl')?.vi).toBe('trắng');
    expect(mauKetTua('AgBr')?.vi).toBe('vàng nhạt');
    expect(mauKetTua('AgI')?.vi).toBe('vàng');
  });

  it('chất TAN thì không được gán màu kết tủa', () => {
    // NaCl, KNO3… tan hết, không có kết tủa nào để mà nói màu.
    for (const ct of ['NaCl', 'KNO3', 'Na2CO3', 'NH4Cl']) {
      expect(mauKetTua(ct)).toBeNull();
    }
  });
});

describe('màu chữ đặt trên ô màu kết tủa', () => {
  it('nền tối thì chữ sáng, nền sáng thì chữ tối', () => {
    expect(chuTrenNen('#1c1917')).toBe('#f8fafc'); // đen  -> chữ sáng
    expect(chuTrenNen('#eef2f6')).toBe('#0f172a'); // trắng -> chữ tối
    expect(chuTrenNen('#facc15')).toBe('#0f172a'); // vàng  -> chữ tối
    expect(chuTrenNen('#a3541f')).toBe('#f8fafc'); // nâu đỏ -> chữ sáng
  });

  it('MỌI màu trong bảng đều đọc được, không ô nào chữ lẫn nền', () => {
    // Đây là phép kiểm thật sự có ích: thêm một màu mới mà quên nghĩ tới độ
    // tương phản thì ô đó thành không đọc nổi, mà chạy mắt thường khó thấy.
    const kho: string[] = [];
    for (const [ct, m] of Object.entries(MAU_KET_TUA)) {
      const chu = chuTrenNen(m.css);
      const sang = (hex: string) => {
        const n = parseInt(hex.slice(1), 16);
        return (
          (0.299 * ((n >> 16) & 255) +
            0.587 * ((n >> 8) & 255) +
            0.114 * (n & 255)) /
          255
        );
      };
      // Chênh lệch độ sáng giữa chữ và nền phải đủ lớn để đọc được.
      if (Math.abs(sang(m.css) - sang(chu)) < 0.4) {
        kho.push(`${ct}: nền ${m.css} với chữ ${chu} — tương phản quá thấp`);
      }
    }
    expect(kho).toEqual([]);
  });

  it('mã màu hỏng thì trả về chữ tối chứ không nổ', () => {
    expect(chuTrenNen('linh tinh')).toBe('#0f172a');
    expect(chuTrenNen('')).toBe('#0f172a');
  });
});

describe('màu SUY LUẬN — ranh giới với màu tra được', () => {
  it('KHÔNG được suy luận cho chất mang ion có màu', () => {
    // Đây là chốt quan trọng nhất của cả bộ dữ liệu màu. Quy tắc "cation không
    // màu thì kết tủa trắng" chỉ đúng khi cation THẬT SỰ không màu. Cu²⁺,
    // Fe²⁺, Fe³⁺ là ngoại lệ kinh điển — suy trắng cho chúng là chắc sai.
    const pham: string[] = [];
    for (const [ct, m] of Object.entries(MAU_KET_TUA)) {
      if (!m.suyLuan) continue;
      if (/^(Cu|Fe)\d*[A-Z(]/.test(ct) || ct.startsWith('Cu') || ct.startsWith('Fe')) {
        pham.push(`${ct}: mang ion có màu mà lại suy luận — phải tra nguồn thật`);
      }
      // Bạc cũng cấm: Ag2CO3 vàng nhạt và Ag3PO4 vàng đã chứng minh Ag⁺ không
      // đi kèm "kết tủa trắng" một cách đáng tin.
      if (ct.startsWith('Ag')) {
        pham.push(`${ct}: muối bạc hay ngả vàng, không được suy luận`);
      }
    }
    expect(pham).toEqual([]);
  });

  it('màu suy luận phải là trắng — suy ra một màu cụ thể là quá tay', () => {
    // Luận "ion không màu thì hợp chất trắng" thì chỉ tới được màu trắng.
    // Suy ra vàng hay xanh nghĩa là đang đoán, không phải đang luận.
    const qua: string[] = [];
    for (const [ct, m] of Object.entries(MAU_KET_TUA)) {
      if (m.suyLuan && !/trắng/.test(m.vi)) qua.push(`${ct}: ${m.vi}`);
    }
    expect(qua).toEqual([]);
  });

  it('đếm được rõ ràng: bao nhiêu tra được, bao nhiêu suy luận', () => {
    const tong = Object.keys(MAU_KET_TUA).length;
    const suyLuan = Object.values(MAU_KET_TUA).filter((m) => m.suyLuan).length;
    // Con số này đổi thì phải đổi có ý thức, không trôi dần theo thời gian.
    expect(tong).toBe(55);
    expect(suyLuan).toBe(11);
    expect(tong - suyLuan).toBe(44);
  });
});
