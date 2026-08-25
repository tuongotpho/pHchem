import { describe, it, expect } from 'vitest';
import { DETAILS, cacKhoaUocTinh, laUocTinh } from './elements.details';
import { ELEMENTS } from './elements';

// ĐỐI CHIẾU NHIỆT ĐỘ NÓNG CHẢY / SÔI VỚI PUBCHEM (Viện Y tế Quốc gia Mỹ).
//
// KHÁC VỚI KHỐI LƯỢNG NGUYÊN TỬ — nói rõ để không ai hiểu nhầm mức bảo đảm:
// khối lượng nguyên tử có MỘT cơ quan chốt (CIAAW của IUPAC), sai là sai hẳn.
// Nhiệt độ nóng chảy/sôi thì KHÔNG có cơ quan nào chốt — đó là đại lượng đo
// được, mỗi bộ sổ tay tổng hợp từ những phép đo khác nhau nên chênh nhau là
// chuyện thường. Vì vậy phép kiểm này đặt NGƯỠNG, và có danh sách NGOẠI LỆ.
//
// Lúc dựng phép kiểm đã thấy rõ điều đó: trong 11 chỗ lệch quá 5 °C, tra thêm
// bảng của CRC (qua Wikipedia) thì 8 chỗ PubChem lệch còn app đúng, chỉ 3 chỗ
// app sai. Nếu lấy PubChem làm chuẩn tuyệt đối thì đã "sửa" hỏng 8 giá trị
// vốn đúng. Ba chỗ app sai đã sửa: nhôm sôi 2470→2519, bari sôi 1845→1897,
// iridi nóng chảy 2466→2446 — cả ba đều có HAI nguồn độc lập cùng chống lại
// giá trị cũ.
//
// NGUỒN: https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/CSV
//   Tải ngày 25/08/2026. PubChem ghi nhiệt độ theo KELVIN; bảng dưới đây đã
//   quy đổi sang °C bằng script từ chính file CSV tải về, không chép tay số
//   nào — 236 con số mà chép tay thì kiểu gì cũng lọt lỗi.

/** [nóng chảy, sôi] tính bằng °C, theo PubChem. null = PubChem không có số. */
const PUBCHEM: Record<number, [number | null, number | null]> = {
  1: [-259.34, -252.87],  // H
  2: [-272.2, -268.93],  // He
  3: [180.5, 1341.85],  // Li
  4: [1286.85, 2470.85],  // Be
  5: [2074.85, 3999.85],  // B
  6: [3549.85, 3824.85],  // C
  7: [-210, -195.79],  // N
  8: [-218.79, -182.95],  // O
  9: [-219.62, -188.12],  // F
  10: [-248.59, -246.08],  // Ne
  11: [97.8, 882.85],  // Na
  12: [649.85, 1089.85],  // Mg
  13: [660.29, 2518.85],  // Al
  14: [1413.85, 3264.85],  // Si
  15: [44.15, 280.5],  // P
  16: [115.21, 444.6],  // S
  17: [-101.5, -34.04],  // Cl
  18: [-189.35, -185.85],  // Ar
  19: [63.38, 758.85],  // K
  20: [841.85, 1483.85],  // Ca
  21: [1540.85, 2835.85],  // Sc
  22: [1667.85, 3286.85],  // Ti
  23: [1909.85, 3406.85],  // V
  24: [1906.85, 2670.85],  // Cr
  25: [1245.85, 2060.85],  // Mn
  26: [1537.85, 2860.85],  // Fe
  27: [1494.85, 2926.85],  // Co
  28: [1454.85, 2912.85],  // Ni
  29: [1084.62, 2561.85],  // Cu
  30: [419.53, 906.85],  // Zn
  31: [29.76, 2203.85],  // Ga
  32: [938.25, 2832.85],  // Ge
  33: [816.85, 613.85],  // As
  34: [220.5, 684.85],  // Se
  35: [-7.2, 58.8],  // Br
  36: [-157.36, -153.22],  // Kr
  37: [39.31, 687.85],  // Rb
  38: [776.85, 1381.85],  // Sr
  39: [1521.85, 3344.85],  // Y
  40: [1854.85, 4408.85],  // Zr
  41: [2476.85, 4743.85],  // Nb
  42: [2622.85, 4638.85],  // Mo
  43: [2156.85, 4264.85],  // Tc
  44: [2333.85, 4149.85],  // Ru
  45: [1963.85, 3694.85],  // Rh
  46: [1554.9, 2962.85],  // Pd
  47: [961.78, 2161.85],  // Ag
  48: [321.07, 766.85],  // Cd
  49: [156.6, 2071.85],  // In
  50: [231.93, 2601.85],  // Sn
  51: [630.63, 1586.85],  // Sb
  52: [449.51, 987.85],  // Te
  53: [113.7, 184.4],  // I
  54: [-111.79, -108.12],  // Xe
  55: [28.44, 670.85],  // Cs
  56: [726.85, 1896.85],  // Ba
  57: [917.85, 3463.85],  // La
  58: [797.85, 3423.85],  // Ce
  59: [930.85, 3519.85],  // Pr
  60: [1020.85, 3073.85],  // Nd
  61: [1041.85, 2999.85],  // Pm
  62: [1073.85, 1793.85],  // Sm
  63: [821.85, 1528.85],  // Eu
  64: [1312.85, 3272.85],  // Gd
  65: [1355.85, 3229.85],  // Tb
  66: [1411.85, 2566.85],  // Dy
  67: [1473.85, 2699.85],  // Ho
  68: [1528.85, 2867.85],  // Er
  69: [1544.85, 1949.85],  // Tm
  70: [818.85, 1195.85],  // Yb
  71: [1662.85, 3401.85],  // Lu
  72: [2232.85, 4602.85],  // Hf
  73: [3016.85, 5457.85],  // Ta
  74: [3421.85, 5554.85],  // W
  75: [3185.85, 5595.85],  // Re
  76: [3032.85, 5011.85],  // Os
  77: [2445.85, 4427.85],  // Ir
  78: [1768.4, 3824.85],  // Pt
  79: [1064.18, 2855.85],  // Au
  80: [-38.83, 356.73],  // Hg
  81: [303.85, 1472.85],  // Tl
  82: [327.46, 1748.85],  // Pb
  83: [271.4, 1563.85],  // Bi
  84: [253.85, 961.85],  // Po
  85: [301.85, null],  // At
  86: [-71.15, -61.7],  // Rn
  87: [26.85, null],  // Fr
  88: [699.85, 1139.85],  // Ra
  89: [1050.85, 3197.85],  // Ac
  90: [1749.85, 4787.85],  // Th
  91: [1571.85, null],  // Pa
  92: [1134.85, 4130.85],  // U
  93: [643.85, 3901.85],  // Np
  94: [639.85, 3227.85],  // Pu
  95: [1175.85, 2010.85],  // Am
  96: [1344.85, 3126.85],  // Cm
  97: [1049.85, null],  // Bk
  98: [899.85, null],  // Cf
  99: [859.85, null],  // Es
  100: [1526.85, null],  // Fm
  101: [826.85, null],  // Md
  102: [826.85, null],  // No
  103: [1626.85, null],  // Lr
  104: [null, null],  // Rf
  105: [null, null],  // Db
  106: [null, null],  // Sg
  107: [null, null],  // Bh
  108: [null, null],  // Hs
  109: [null, null],  // Mt
  110: [null, null],  // Ds
  111: [null, null],  // Rg
  112: [null, null],  // Cn
  113: [null, null],  // Nh
  114: [null, null],  // Fl
  115: [null, null],  // Mc
  116: [null, null],  // Lv
  117: [null, null],  // Ts
  118: [null, null], // Og
};

/** Chênh bao nhiêu độ thì coi là khác biệt thật, không phải làm tròn. */
const NGUONG = 5;

// NGOẠI LỆ: chỗ app CỐ Ý khác PubChem, vì bảng của CRC (tra qua Wikipedia
// ngày 25/08/2026) đứng về phía app. Khóa dạng "<số hiệu>:<trường>".
// Thêm ngoại lệ mới thì phải kèm lý do tra được, đừng thêm cho test xanh.
const NGOAI_LE: Record<string, string> = {
  '5:boil': 'Bo sôi 3927 °C — CRC cho 4200 K = 3926,85. PubChem lệch 73 °C.',
  '6:boil':
    'Cacbon 4027 °C — CRC cho 4300 K = 4026,85. (Cacbon vốn thăng hoa; "điểm sôi" chỉ có nghĩa ở áp suất cao.)',
  '31:boil': 'Gali sôi 2400 °C — CRC cho 2673 K = 2399,85. PubChem lệch 196 °C.',
  '39:boil': 'Ytri sôi 3336 °C — CRC cho 3609 K = 3335,85.',
  '58:boil': 'Xeri sôi 3443 °C — CRC cho 3716 K = 3442,85.',
  '88:boil': 'Radi sôi 1737 °C — CRC cho 2010 K = 1736,85. PubChem lệch 597 °C.',
  '96:boil': 'Curi sôi 3110 °C — CRC cho 3383 K = 3109,85.',
  '97:melt': 'Berkeli nóng chảy 986 °C — CRC cho 1259 K = 985,85.',
};

// Những chỗ PubChem CÓ số mà app CỐ Ý để trống: đó là giá trị DỰ ĐOÁN hoặc
// ngoại suy, không phải đo được. App có nguyên tắc "không đo được thì để
// trống, không đoán" — phép kiểm dưới đây khóa nguyên tắc ấy lại, để sau này
// không ai lỡ tay điền vào cho bảng đỡ trống.
const DE_TRONG_CO_Y: [number, 'melt' | 'boil'][] = [
  [85, 'melt'], // astatin
  [87, 'melt'], // franxi
  [100, 'melt'], // fecmi
  [101, 'melt'], // mendelevi
  [102, 'melt'], // nobeli
  [103, 'melt'], // lawrenci
];

describe('nhiệt độ nóng chảy / sôi đối chiếu PubChem', () => {
  it('mọi giá trị nằm trong ngưỡng, trừ các ngoại lệ đã ghi lý do', () => {
    const lech: string[] = [];
    for (const e of ELEMENTS) {
      const chuan = PUBCHEM[e.n];
      const co = DETAILS[e.n];
      if (!chuan || !co) continue;
      ([['melt', 0], ['boil', 1]] as const).forEach(([truong, i]) => {
        const p = chuan[i];
        const a = co[truong];
        if (p === null || a === null) return;
        if (NGOAI_LE[`${e.n}:${truong}`]) return;
        if (Math.abs(a - p) > NGUONG) {
          lech.push(
            `${e.n} ${e.sym} ${truong}: app ${a} °C, PubChem ${p} °C (lệch ${(a - p).toFixed(2)})`,
          );
        }
      });
    }
    expect(lech).toEqual([]);
  });

  it('mỗi ngoại lệ phải trỏ tới một chỗ lệch THẬT, không phải rác để lại', () => {
    const thua: string[] = [];
    for (const khoa of Object.keys(NGOAI_LE)) {
      const [z, truong] = khoa.split(':') as [string, 'melt' | 'boil'];
      const chuan = PUBCHEM[+z];
      const co = DETAILS[+z];
      const p = chuan?.[truong === 'melt' ? 0 : 1];
      const a = co?.[truong];
      if (p == null || a == null || Math.abs(a - p) <= NGUONG) {
        thua.push(`${khoa}: không còn lệch quá ngưỡng, bỏ ngoại lệ này đi`);
      }
    }
    expect(thua).toEqual([]);
  });

  // Dấu "ước tính" phải luôn trỏ tới một con số CÓ THẬT. Xóa giá trị đi mà
  // quên gỡ dấu thì dấu treo lơ lửng, không ai biết nó nói về cái gì.
  it('mỗi dấu "ước tính" trỏ tới một giá trị đang có', () => {
    const treo: string[] = [];
    for (const khoa of cacKhoaUocTinh()) {
      const [z, truong] = khoa.split(':') as [string, 'melt' | 'boil'];
      if (DETAILS[+z]?.[truong] == null) {
        treo.push(`${khoa}: đã đánh dấu ước tính nhưng giá trị đang để trống`);
      }
    }
    expect(treo).toEqual([]);
  });

  // Chốt ngược lại: chỗ nào ĐANG để trống thì đừng đánh dấu, và chỗ nào có số
  // thì hoặc là đo được, hoặc phải đánh dấu — không có ô thứ ba lặng lẽ.
  it('chỉ đánh dấu đúng ba điểm sôi ngoại suy đã tra được nguồn', () => {
    expect(cacKhoaUocTinh().sort()).toEqual(['89:boil', '91:boil', '93:boil']);
    // actini, protactini, neptuni — cả ba đều có số, và cả ba đều mang dấu
    for (const z of [89, 91, 93]) {
      expect(DETAILS[z]?.boil).not.toBeNull();
      expect(laUocTinh(z, 'boil')).toBe(true);
    }
    // hàng xóm gần nhất KHÔNG mang dấu: radi và curi đều là số đo được
    expect(laUocTinh(88, 'boil')).toBe(false);
    expect(laUocTinh(96, 'boil')).toBe(false);
  });

  it('chỗ chỉ có giá trị dự đoán thì app để trống, không điền cho đẹp bảng', () => {
    const daDien: string[] = [];
    for (const [z, truong] of DE_TRONG_CO_Y) {
      if (DETAILS[z]?.[truong] !== null) {
        daDien.push(`${z} ${truong}: đã điền ${DETAILS[z]?.[truong]}, đáng lẽ để trống`);
      }
    }
    expect(daDien).toEqual([]);
  });
});
