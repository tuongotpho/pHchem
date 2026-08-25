import { describe, it, expect } from 'vitest';
import { DETAILS } from './elements.details';
import { ELEMENTS } from './elements';

// ĐỐI CHIẾU KHỐI LƯỢNG RIÊNG VỚI PUBCHEM.
//
// Cùng nguồn và cùng lối với elements.nhietdo.test.ts — đọc chú thích ở đầu
// file đó để biết vì sao phép kiểm này có NGƯỠNG và có NGOẠI LỆ, thay vì bắt
// khớp tuyệt đối như bên khối lượng nguyên tử.
//
// NGUỒN: https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/CSV
//   Tải ngày 25/08/2026. Bảng dưới sinh bằng script từ chính file CSV, không
//   chép tay số nào.
//
// NGƯỠNG TÍNH THEO PHẦN TRĂM, không phải trị tuyệt đối: giá trị ở đây trải qua
// tám bậc độ lớn, từ 0,00008988 (hydro) tới 22,59 (osimi). Lấy một ngưỡng
// tuyệt đối kiểu "lệch 0,1 là báo" thì mọi chất khí đều lọt, còn mọi kim loại
// nặng đều báo động giả.
//
// KẾT QUẢ LÚC DỰNG: 95 cặp so được, TRUNG VỊ LỆCH 0,04% — khớp rất sát. Năm
// chỗ lệch quá 2% đều đã tra bảng của CRC (qua Wikipedia) và LẦN NÀY APP ĐÚNG
// CẢ NĂM; không phải sửa giá trị nào. Khác với đợt nhiệt độ, ở đó app sai 3.

/** Khối lượng riêng g/cm³ theo PubChem. null = PubChem không có số. */
const PUBCHEM_KLR: Record<number, number | null> = {
  1: 0.00008988, // H
  2: 0.0001785, // He
  3: 0.534, // Li
  4: 1.85, // Be
  5: 2.37, // B
  6: 2.2670, // C
  7: 0.0012506, // N
  8: 0.001429, // O
  9: 0.001696, // F
  10: 0.0008999, // Ne
  11: 0.97, // Na
  12: 1.74, // Mg
  13: 2.70, // Al
  14: 2.3296, // Si
  15: 1.82, // P
  16: 2.067, // S
  17: 0.003214, // Cl
  18: 0.0017837, // Ar
  19: 0.89, // K
  20: 1.54, // Ca
  21: 2.99, // Sc
  22: 4.5, // Ti
  23: 6.0, // V
  24: 7.15, // Cr
  25: 7.3, // Mn
  26: 7.874, // Fe
  27: 8.86, // Co
  28: 8.912, // Ni
  29: 8.933, // Cu
  30: 7.134, // Zn
  31: 5.91, // Ga
  32: 5.323, // Ge
  33: 5.776, // As
  34: 4.809, // Se
  35: 3.11, // Br
  36: 0.003733, // Kr
  37: 1.53, // Rb
  38: 2.64, // Sr
  39: 4.47, // Y
  40: 6.52, // Zr
  41: 8.57, // Nb
  42: 10.2, // Mo
  43: 11, // Tc
  44: 12.1, // Ru
  45: 12.4, // Rh
  46: 12.0, // Pd
  47: 10.501, // Ag
  48: 8.69, // Cd
  49: 7.31, // In
  50: 7.287, // Sn
  51: 6.685, // Sb
  52: 6.232, // Te
  53: 4.93, // I
  54: 0.005887, // Xe
  55: 1.93, // Cs
  56: 3.62, // Ba
  57: 6.15, // La
  58: 6.770, // Ce
  59: 6.77, // Pr
  60: 7.01, // Nd
  61: 7.26, // Pm
  62: 7.52, // Sm
  63: 5.24, // Eu
  64: 7.90, // Gd
  65: 8.23, // Tb
  66: 8.55, // Dy
  67: 8.80, // Ho
  68: 9.07, // Er
  69: 9.32, // Tm
  70: 6.90, // Yb
  71: 9.84, // Lu
  72: 13.3, // Hf
  73: 16.4, // Ta
  74: 19.3, // W
  75: 20.8, // Re
  76: 22.57, // Os
  77: 22.42, // Ir
  78: 21.46, // Pt
  79: 19.282, // Au
  80: 13.5336, // Hg
  81: 11.8, // Tl
  82: 11.342, // Pb
  83: 9.807, // Bi
  84: 9.32, // Po
  85: 7, // At
  86: 0.00973, // Rn
  87: null, // Fr
  88: 5, // Ra
  89: 10.07, // Ac
  90: 11.72, // Th
  91: 15.37, // Pa
  92: 18.95, // U
  93: 20.25, // Np
  94: 19.84, // Pu
  95: 13.69, // Am
  96: 13.51, // Cm
  97: 14, // Bk
  98: null, // Cf
  99: null, // Es
  100: null, // Fm
  101: null, // Md
  102: null, // No
  103: null, // Lr
  104: null, // Rf
  105: null, // Db
  106: null, // Sg
  107: null, // Bh
  108: null, // Hs
  109: null, // Mt
  110: null, // Ds
  111: null, // Rg
  112: null, // Cn
  113: null, // Nh
  114: null, // Fl
  115: null, // Mc
  116: null, // Lv
  117: null, // Ts
  118: null, // Og
};

/** Lệch quá bao nhiêu phần trăm thì coi là khác biệt thật. */
const NGUONG_PCT = 2;

// NGOẠI LỆ: chỗ app cố ý khác PubChem vì bảng của CRC (tra qua Wikipedia ngày
// 25/08/2026) đứng về phía app. Số trong ngoặc là giá trị PubChem đang giữ.
const NGOAI_LE: Record<number, string> = {
  56: 'Bari 3,51 — CRC cho 3,51. PubChem giữ 3,62.',
  44: 'Rutheni 12,45 — CRC cho 12,45. PubChem giữ 12,1.',
  88: 'Radi 5,5 — CRC cho 5,5. PubChem giữ 5 (làm tròn thô).',
  95: 'Americi 12 — CRC cho 12. PubChem giữ 13,69, lệch 12%.',
  97:
    'Berkeli 14,78 — đó là dạng alpha, đúng con số CRC dùng. ' +
    'Berkeli có hai dạng thù hình (alpha 14,78; beta 13,25). PubChem giữ 14.',
};

// PubChem CÓ số mà app CỐ Ý để trống: astatin chưa ai thấy ở dạng khối, khối
// lượng riêng 7 g/cm³ là giá trị dự đoán. App có nguyên tắc không điền số dự
// đoán — phép kiểm dưới khóa nguyên tắc ấy lại.
const DE_TRONG_CO_Y = [85];

describe('khối lượng riêng đối chiếu PubChem', () => {
  it('mọi giá trị nằm trong ngưỡng, trừ các ngoại lệ đã ghi lý do', () => {
    const lech: string[] = [];
    for (const e of ELEMENTS) {
      const p = PUBCHEM_KLR[e.n];
      const a = DETAILS[e.n]?.density;
      if (p == null || a == null) continue;
      if (NGOAI_LE[e.n]) continue;
      const pct = (Math.abs(a - p) / p) * 100;
      if (pct > NGUONG_PCT) {
        lech.push(`${e.n} ${e.sym}: app ${a}, PubChem ${p} (lệch ${pct.toFixed(2)}%)`);
      }
    }
    expect(lech).toEqual([]);
  });

  it('mỗi ngoại lệ phải trỏ tới một chỗ lệch THẬT, không phải rác để lại', () => {
    const thua: string[] = [];
    for (const z of Object.keys(NGOAI_LE).map(Number)) {
      const p = PUBCHEM_KLR[z];
      const a = DETAILS[z]?.density;
      if (p == null || a == null || (Math.abs(a - p) / p) * 100 <= NGUONG_PCT) {
        thua.push(`${z}: không còn lệch quá ngưỡng, bỏ ngoại lệ này đi`);
      }
    }
    expect(thua).toEqual([]);
  });

  it('chỗ chỉ có giá trị dự đoán thì app để trống', () => {
    const daDien: string[] = [];
    for (const z of DE_TRONG_CO_Y) {
      if (DETAILS[z]?.density !== null) {
        daDien.push(`${z}: đã điền ${DETAILS[z]?.density}, đáng lẽ để trống`);
      }
    }
    expect(daDien).toEqual([]);
  });
});
