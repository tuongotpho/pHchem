// XẾP DỮ LIỆU CỦA APP VÀO CHƯƠNG — để đề do AI tự tạo cũng chọn được theo
// lớp, theo chương y như ngân hàng đề của thầy.
//
// Cây chương nằm ở src/data/chuongTrinh.js. File này chỉ làm một việc: nhìn
// một chất / một nguyên tố / một phản ứng rồi nói nó thuộc chương nào.
//
// ═══ ĐÂY LÀ PHÉP XẾP THEO QUY TẮC, KHÔNG PHẢI DO NGƯỜI SOI TỪNG CÂU ═══
//
// Phải nói thẳng vì nó khác hẳn phần dữ liệu còn lại của app: công thức, phản
// ứng, bảng tính tan đều đã qua gần 300 phép kiểm nên đúng - sai là chuyện
// đo được. Còn "phản ứng này thuộc chương nào" là chuyện CHƯƠNG TRÌNH HỌC,
// máy không đo được, chỉ suy từ mấy quy tắc viết tay bên dưới.
//
// Vì vậy:
//   - Không xếp được thì trả null, KHÔNG đoán bừa vào một chương gần gần.
//     Câu đó vẫn ra bình thường khi học sinh chọn "Tất cả", chỉ là không nằm
//     dưới chương nào cả — thà thiếu còn hơn xếp sai rồi học sinh ôn nhầm.
//   - Chạy `npm run soi:chuong` để đổ ra bảng xếp của TOÀN BỘ dữ liệu, thầy cô
//     soi một lượt rồi chỉ chỗ sai. Con số hiện ở cuối bảng là số đo được, các
//     mục chưa xếp cũng liệt kê ra chứ không giấu.
//
// ═══ THỨ TỰ ƯU TIÊN, VÀ VÌ SAO ═══
//
// Một chất thường dính tới nhiều chương. NH4Cl vừa có nitrogen (lớp 11 ch.2)
// vừa có chlorine (lớp 10 ch.7). Quy tắc chọn:
//
//   1. LỚP CHẤT HỮU CƠ thắng tất cả. Dữ liệu đã khai sẵn ester là ester,
//      alcohol là alcohol — đây là điều chắc chắn nhất trong cả file này.
//   2. Nitrogen / sulfur trước halogen. Muối ammonium và muối sulfate là bài
//      HỌC RIÊNG của chương Nitrogen - Sulfur, còn chlorine trong NH4Cl chỉ
//      là phần đi kèm.
//   3. Halogen trước kim loại. NaCl, KClO3 học ở bài muối halide và hợp chất
//      chứa oxygen của halogen, không học ở chương kim loại nhóm IA.
//   4. Kim loại chuyển tiếp dãy 1 (Sc→Zn) trước kim loại nhóm IA/IIA, rồi mới
//      tới các kim loại còn lại (chương đại cương về kim loại).

import { FORMULAS, keyOf, type Formula } from '../data/formulas';
import { ELEMENTS, type Category } from '../data/elements';
import type { Reaction } from '../data/reactions';
import { speciesOf } from './reaction';
import { demNguyenTu } from './phanTichCongThuc.js';

export { CHUA_XEP } from '../data/chuongTrinh.js';

/**
 * Lớp chất (khóa của NHOM_CHAT trong data/classes.ts) → chương.
 *
 * Để `null` nghĩa là lớp chất đó KHÔNG có bài riêng trong chương trình
 * 10-11-12, chứ không phải quên khai:
 *   - oxit, acid, base, muối, đơn chất: kiến thức nền từ THCS, chương trình
 *     mới không dành chương nào cho chúng. Những chất này xếp tiếp bằng quy
 *     tắc nguyên tố bên dưới (NaCl → halogen, Na2SO4 → sulfur...).
 *   - ether: có nhắc trong bài alcohol nhưng không thành bài riêng.
 */
export const CHUONG_CUA_LOP_CHAT: Record<string, string | null> = {
  // Vô cơ — xếp tiếp bằng nguyên tố
  'don-chat': null,
  oxit: null,
  axit: null,
  bazo: null,
  muoi: null,

  // Lớp 11 chương 4 — Hydrocarbon
  ankan: '11.4',
  anken: '11.4',
  ankin: '11.4',
  ankadien: '11.4',
  aren: '11.4',

  // Lớp 11 chương 5 — Dẫn xuất halogen, alcohol, phenol
  'dan-xuat-halogen': '11.5',
  ancol: '11.5',
  phenol: '11.5',
  ete: null,

  // Lớp 11 chương 6 — Hợp chất carbonyl, carboxylic acid
  andehit: '11.6',
  xeton: '11.6',
  'axit-cacboxylic': '11.6',

  // Lớp 12
  este: '12.1',
  lipit: '12.1',
  gluxit: '12.2',
  amin: '12.3',
  'amino-axit': '12.3',
  polime: '12.4',
};

/**
 * Nhóm nguyên tố trong bảng tuần hoàn → chương.
 *
 * Câu hỏi "nguyên tố X thuộc nhóm nào" vốn là kĩ năng của lớp 10 chương 2
 * (bảng tuần hoàn). Nhưng với bốn nhóm có hẳn chương riêng thì xếp vào chương
 * ấy có ích hơn: học sinh ôn "kim loại nhóm IA" mà không thấy câu nào về Na,
 * K thì cây thư mục coi như vô dụng.
 */
export const CHUONG_CUA_NHOM_NGUYEN_TO: Partial<Record<Category, string>> = {
  halogen: '10.7',
  alkali: '12.7',
  alkaline: '12.7',
  transition: '12.8', // lọc thêm theo số hiệu bên dưới: chỉ dãy thứ nhất
  nonmetal: '10.2',
  noble: '10.2',
  metalloid: '10.2',
  'post-transition': '10.2',
  lanthanide: '10.2',
  actinide: '10.2',
};

const THEO_KY_HIEU = new Map(ELEMENTS.map((e) => [e.sym, e]));

/** Dãy kim loại chuyển tiếp THỨ NHẤT: Sc (21) → Zn (30). Đúng tên chương 12.8. */
const laChuyenTiepDay1 = (sym: string): boolean => {
  const e = THEO_KY_HIEU.get(sym);
  return !!e && e.cat === 'transition' && e.n >= 21 && e.n <= 30;
};

const laKimLoai = (sym: string): boolean => {
  const e = THEO_KY_HIEU.get(sym);
  return (
    !!e &&
    (e.cat === 'alkali' ||
      e.cat === 'alkaline' ||
      e.cat === 'transition' ||
      e.cat === 'post-transition' ||
      e.cat === 'lanthanide' ||
      e.cat === 'actinide')
  );
};

const laNhomIaIia = (sym: string): boolean => {
  const e = THEO_KY_HIEU.get(sym);
  return !!e && (e.cat === 'alkali' || e.cat === 'alkaline');
};

const HALOGEN = new Set(['F', 'Cl', 'Br', 'I']);

/**
 * Xếp chương cho một CÔNG THỨC vô cơ, dựa trên các nguyên tố có trong nó.
 * Thứ tự ưu tiên xem phần đầu file.
 */
function chuongTheoNguyenTo(congThuc: string): string | null {
  let co: string[];
  try {
    co = Object.keys(demNguyenTu(congThuc));
  } catch {
    return null; // công thức lạ (ion, chất tượng trưng) — không xếp còn hơn xếp bừa
  }
  if (!co.length) return null;
  if (co.includes('N') || co.includes('S')) return '11.2';
  if (co.some((x) => HALOGEN.has(x))) return '10.7';
  if (co.some(laChuyenTiepDay1)) return '12.8';
  if (co.some(laNhomIaIia)) return '12.7';
  if (co.some(laKimLoai)) return '12.6';
  return null;
}

/** Xếp chương cho một chất trong thư viện công thức. */
export function chuongCuaChat(f: Formula): string | null {
  if (f.nhom) {
    const theoLop = CHUONG_CUA_LOP_CHAT[f.nhom];
    if (theoLop) return theoLop;
    // Lớp chất có khai mà chưa có trong bảng trên: chất mới thêm vào dữ liệu.
    // Có phép kiểm bắt chuyện này (xepChuong.test.ts), nên tới đây nghĩa là
    // lớp chất đó CỐ Ý để null — xếp tiếp bằng nguyên tố.
  }
  // Chất hóa lý (hằng số, đại lượng) không phải là chất thật, không xếp.
  if (f.cat === 'physical') return null;
  return chuongTheoNguyenTo(f.formula);
}

/** Xếp chương cho một nguyên tố trong bảng tuần hoàn. */
export function chuongCuaNguyenTo(cat: Category, soHieu: number): string | null {
  if (cat === 'transition') return soHieu >= 21 && soHieu <= 30 ? '12.8' : '10.2';
  return CHUONG_CUA_NHOM_NGUYEN_TO[cat] ?? null;
}

/**
 * CHẤT CHỦ ĐỀ của một chương — chất mà hễ xuất hiện là gần như chắc chắn phản
 * ứng ấy đang dạy chương đó.
 *
 * VÌ SAO KHÔNG DÙNG LẠI QUY TẮC NGUYÊN TỐ cho phản ứng: trong phản ứng, gốc
 * acid thường chỉ ĐỨNG XEM. "Fe + CuSO4 → FeSO4 + Cu" có sulfate nhưng là bài
 * dãy điện hóa của chương kim loại, không phải bài muối sulfate. Lấy nguyên tố
 * mà xếp thì phản ứng này rơi sang lớp 11 — sai hẳn chương.
 *
 * Vì vậy HCl, H2SO4, NaOH, H2O, O2, H2 CỐ Ý KHÔNG có trong bảng này: chúng là
 * thuốc thử của mọi chương, đứng ra xếp chương thì kéo nhầm hàng loạt. Mất vài
 * phản ứng đáng lẽ thuộc chương halogen / sulfur, đổi lại không xếp sai.
 */
const CHAT_CHU_DE: Record<string, string> = {};
const khai = (ma: string, chat: string[]) => chat.forEach((c) => (CHAT_CHU_DE[c] = ma));

// Lớp 11 chương 2 — Nitrogen, Sulfur
khai('11.2', [
  'N2', 'NH3', 'NO', 'NO2', 'N2O', 'N2O5', 'HNO3', 'HNO2',
  'NH4Cl', 'NH4NO3', 'NH4HCO3', '(NH4)2SO4', '(NH4)2CO3', 'NH4H2PO4',
  'S', 'H2S', 'SO2', 'SO3', 'H2SO3', 'FeS', 'FeS2', 'Na2SO3', 'NaHSO3',
]);
// Lớp 10 chương 7 — Halogen
khai('10.7', [
  'F2', 'Cl2', 'Br2', 'I2', 'HF', 'HBr', 'HI', 'HClO', 'HClO3', 'HClO4',
  'NaClO', 'KClO3', 'KClO', 'CaOCl2', 'Ca(ClO)2', 'NaBr', 'NaI', 'KI', 'KBr',
]);

/**
 * Tra nhanh công thức → lớp chất hữu cơ.
 *
 * Dựng sẵn một lần thay vì quét FORMULAS cho từng chất của từng phản ứng:
 * 225 phản ứng × mấy chất × 250 công thức là hơn trăm nghìn lượt so chuỗi mỗi
 * lần dựng đề, đủ để thấy khựng trên điện thoại.
 */
const HUU_CO_THEO_CONG_THUC = new Map<string, string>();
for (const f of FORMULAS) {
  if (f.cat === 'organic' && f.nhom && !HUU_CO_THEO_CONG_THUC.has(f.formula)) {
    HUU_CO_THEO_CONG_THUC.set(f.formula, f.nhom);
  }
}

/**
 * Xếp chương cho một phản ứng.
 *
 * Thứ tự: loại phản ứng có chương riêng → chất hữu cơ → chất chủ đề vô cơ →
 * kim loại tham gia. Xem giải thích thứ tự ở đầu file.
 */
export function chuongCuaPhanUng(r: Reaction): string | null {
  // 1. Có hẳn một chương mang tên loại phản ứng này thì khỏi đoán gì thêm.
  if (r.type.includes('electrolysis')) return '12.5';
  if (r.type.includes('polymerization')) return '12.4';
  if (r.type.includes('esterification') || r.type.includes('saponification')) return '12.1';

  const s = speciesOf(r.eq);
  const chat = [...s.reactants, ...s.products];

  // 2. Chất hữu cơ. Phản ứng có ester thì là bài ester, dù trong đó còn có
  //    alcohol và acid — nên phải xét theo thứ tự chương "đặc thù" trước.
  const huuCo = new Set(
    chat.map((c) => CHUONG_CUA_LOP_CHAT[HUU_CO_THEO_CONG_THUC.get(c) ?? ''] ?? null),
  );
  for (const ma of ['12.1', '12.2', '12.3', '12.4', '11.6', '11.5', '11.4']) {
    if (huuCo.has(ma)) return ma;
  }

  // 3. Phản ứng acid - base trong dung dịch: bài của chương cân bằng trong
  //    dung dịch nước. Đứng SAU hữu cơ vì carboxylic acid trung hòa base vẫn
  //    là bài carboxylic acid.
  if (r.type.includes('neutralization')) return '11.1';

  // 4. Chất chủ đề vô cơ.
  for (const c of chat) {
    const ma = CHAT_CHU_DE[c];
    if (ma === '11.2') return ma; // nitrogen/sulfur ưu tiên hơn halogen
  }
  for (const c of chat) {
    if (CHAT_CHU_DE[c] === '10.7') return '10.7';
  }

  // 5. Kim loại tham gia phản ứng.
  const nguyenTo = new Set<string>();
  for (const c of chat) {
    try {
      Object.keys(demNguyenTu(c)).forEach((x) => nguyenTo.add(x));
    } catch {
      // công thức lạ thì bỏ qua, các chất còn lại vẫn xét được
    }
  }
  const co = [...nguyenTo];
  if (co.some(laChuyenTiepDay1)) return '12.8';
  if (co.some(laNhomIaIia)) return '12.7';
  if (co.some(laKimLoai)) return '12.6';
  return null;
}

/** Danh sách chất kèm chương đã xếp — cho script soi và cho phép kiểm. */
export const bangXepChat = () =>
  FORMULAS.filter((f) => f.cat !== 'physical').map((f) => ({
    khoa: keyOf(f),
    ten: f.vi,
    congThuc: f.formula,
    nhom: f.nhom ?? '',
    chuong: chuongCuaChat(f),
  }));
