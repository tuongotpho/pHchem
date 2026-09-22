// Sinh đề luyện tập TỪ CHÍNH DỮ LIỆU của app.
//
// VÌ SAO KHÔNG GÕ TAY TỪNG CÂU:
//   - Dữ liệu đã qua gần 300 phép kiểm tự động, nên đề sinh ra không thể sai
//     trong khi đề gõ tay thì sai lúc nào không biết.
//   - Thêm một phản ứng hay một chất là đề tự nhiều lên, không phải soạn lại.
//   - Đề không bao giờ cạn: mỗi lần mở là một bộ câu khác.
//
// Bộ sinh số ngẫu nhiên có HẠT GIỐNG (seed) nên cùng một hạt luôn cho cùng bộ
// đề. Nhờ vậy phép kiểm chạy được, và người dùng chia sẻ được đúng đề đã làm.

import { REACTIONS } from '../data/reactions';
import { FORMULAS, keyOf } from '../data/formulas';
import { ELEMENTS } from '../data/elements';
import { NHOM_CHAT, NHOM_NGUYEN_TO } from '../data/classes';
import { CATEGORY_META } from '../data/elements';
import { CATIONS, ANIONS, MATRIX, SOLUB_META, buildFormula } from '../data/solubility';
import { iupacOf } from '../data/iupac';
import { balance, formatBalanced } from './balance';
import { speciesOf } from './reaction';
import type { Lang } from '../i18n/strings';
// Bộ ngẫu nhiên có hạt giống nằm ở lib/ngauNhien.ts — DÙNG CHUNG với phần đề
// của thầy. Trước đây ba hàm này nằm kẹt ở đây, không xuất ra, nên bên kia
// phải chép lại một bản; hai bản trộn khác nhau thì cùng một mã đề lại ra hai
// kết quả mà không ai thấy.
import { taoRng, tron, chon, type Rng } from './ngauNhien';
// Xếp câu vào chương của sách giáo khoa — xem lib/xepChuong.ts. Nhờ nó, đề AI
// tự tạo cũng chọn được theo lớp / theo chương y như ngân hàng đề của thầy,
// thay vì chỉ chọn được theo DẠNG BÀI như trước.
import { chuongCuaChat, chuongCuaNguyenTo, chuongCuaPhanUng } from './xepChuong';
import { CHUONG_TRINH } from '../data/chuongTrinh.js';

export type LoaiCau = 'canBang' | 'hienTuong' | 'lopChat' | 'doTan' | 'iupac' | 'nhomNguyenTo';

export interface CauHoi {
  loai: LoaiCau;
  /**
   * Mã chương trong sách, vd "11.2". Để trống nghĩa là CHƯA xếp được — câu
   * vẫn dùng bình thường, chỉ là không nằm dưới chương nào. Xem xepChuong.ts.
   */
  chuong?: string;
  de: string;
  /** Dòng phụ, thường là phương trình hoặc công thức — hiện bằng phông chữ máy. */
  phu?: string;
  /**
   * Dòng phụ phải vẽ theo kiểu nào. Khai ở ĐÂY chứ không để giao diện tự đoán
   * theo `loai`: thêm dạng câu hỏi mới thì người viết phải nghĩ luôn xem dòng
   * phụ của nó là gì, không lỡ rơi vào nhánh mặc định rồi hiện sai.
   *
   *   'phuongTrinh' — cả phương trình, hệ số giữ cỡ thường, chất hạ chỉ số
   *   'congThuc'    — một công thức, hạ chỉ số toàn bộ
   *   'chu'         — chữ thường, TUYỆT ĐỐI không hạ chỉ số
   *
   * Chữ 'chu' có việc thật: câu về nhóm nguyên tố có dòng phụ "Fe · Z = 26".
   * Hạ chỉ số bừa thì thành "Z = ₂₆" — số hiệu nguyên tử biến thành chỉ số.
   */
  kieuPhu?: 'phuongTrinh' | 'congThuc' | 'chu';
  luaChon: string[];
  /** Chỉ số của đáp án đúng trong mảng luaChon. */
  dapAn: number;
  giaiThich: string;
  /** Đường dẫn mở phần liên quan để học thêm sau khi trả lời. */
  hoc?: string;
}

export const TEN_LOAI: Record<LoaiCau, { vi: string; en: string }> = {
  canBang: { vi: 'Cân bằng phương trình', en: 'Balancing equations' },
  hienTuong: { vi: 'Nhận biết qua hiện tượng', en: 'Identify by observation' },
  lopChat: { vi: 'Chất thuộc lớp nào', en: 'Which class' },
  doTan: { vi: 'Tra bảng tính tan', en: 'Solubility table' },
  iupac: { vi: 'Danh pháp IUPAC', en: 'IUPAC naming' },
  nhomNguyenTo: { vi: 'Nhóm nguyên tố', en: 'Element groups' },
};

/**
 * Dựng bộ lựa chọn: đáp án đúng cộng thêm các đáp án nhiễu, bỏ trùng rồi trộn.
 * Trả về null nếu không gom đủ 4 lựa chọn khác nhau — lúc đó bỏ câu này đi
 * chứ không ra đề thiếu lựa chọn.
 */
function dungLuaChon(
  rng: Rng,
  dung: string,
  khoNhieu: string[],
  soLuong = 4,
): { luaChon: string[]; dapAn: number } | null {
  const nhieu: string[] = [];
  for (const x of tron(rng, khoNhieu)) {
    if (x !== dung && !nhieu.includes(x)) nhieu.push(x);
    if (nhieu.length === soLuong - 1) break;
  }
  if (nhieu.length < soLuong - 1) return null;
  const luaChon = tron(rng, [dung, ...nhieu]);
  return { luaChon, dapAn: luaChon.indexOf(dung) };
}

// ---------- Từng dạng đề ----------

const phanUngThuong = REACTIONS.filter((r) => !r.symbolic);
const chatCoLop = FORMULAS.filter((f) => f.nhom);
const nguyenToCoNhom = ELEMENTS.filter((e) => NHOM_NGUYEN_TO[e.cat]);
const chatCoTenIupac = FORMULAS.filter((f) => f.cat !== 'physical' && iupacOf(keyOf(f), f.en));

// ---------- Xếp chương ----------
//
// Xếp MỘT LẦN lúc nạp mô-đun rồi nhớ lại, không xếp lại mỗi lần ra đề: xếp
// một phản ứng phải tách công thức hai vế rồi đếm nguyên tử từng chất, mà mỗi
// lượt luyện tập lại gọi tới hàng trăm lần. Đây cũng là cách app đã làm với
// các bảng tra khác (compoundIndex, reactionIndex).

const nhoChuong = <T,>(kho: T[], xep: (x: T) => string | null): Map<T, string> => {
  const m = new Map<T, string>();
  for (const x of kho) {
    const ma = xep(x);
    if (ma) m.set(x, ma);
  }
  return m;
};

const CHUONG_PHAN_UNG = nhoChuong(phanUngThuong, chuongCuaPhanUng);
const CHUONG_CHAT = nhoChuong(FORMULAS, chuongCuaChat);
const CHUONG_NGUYEN_TO = nhoChuong(nguyenToCoNhom, (e) => chuongCuaNguyenTo(e.cat, e.n));

/**
 * Bảng tính tan xếp vào chương "Cân bằng trong dung dịch nước" (lớp 11 ch.1).
 *
 * ĐÂY LÀ MỘT QUYẾT ĐỊNH CÓ THỂ BÀN LẠI, không phải điều sách viết sẵn. Bảng
 * tính tan tự nó là công cụ tra cứu chứ không là bài nào cả; nhưng chỗ học
 * sinh CẦN tới nó là bài phản ứng trao đổi ion trong dung dịch của chương này
 * — đề "Sự điện li" thầy gửi cũng đầy câu kết tủa. Thầy cô thấy không hợp thì
 * sửa đúng một dòng này.
 */
const CHUONG_DO_TAN = '11.1';

/** Lọc kho theo chương đang chọn. Không chọn chương thì lấy nguyên kho. */
const locTheoChuong = <T,>(kho: T[], nho: Map<T, string>, chuong?: string): T[] =>
  chuong ? kho.filter((x) => nho.get(x) === chuong) : kho;

/** Tổng hệ số sau khi cân bằng — dạng câu hỏi quen thuộc trong đề trắc nghiệm. */
function cauCanBang(rng: Rng, lang: Lang, chuong?: string): CauHoi | null {
  const r = chon(rng, locTheoChuong(phanUngThuong, CHUONG_PHAN_UNG, chuong));
  if (!r) return null;
  const { reactants, products } = speciesOf(r.eq);
  const kq = balance(`${reactants.join(' + ')} -> ${products.join(' + ')}`);
  if (!kq.ok) return null;
  const tong = kq.coefficients!.reduce((a, b) => a + b, 0);
  // Đáp án nhiễu: các tổng gần đúng, đủ hợp lý để phải cân bằng thật mới loại được
  const khoNhieu = [tong + 1, tong - 1, tong + 2, tong - 2, tong + 3, Math.max(2, tong - 3)]
    .filter((x) => x > 1)
    .map(String);
  const lc = dungLuaChon(rng, String(tong), khoNhieu);
  if (!lc) return null;
  return {
    loai: 'canBang',
    chuong: CHUONG_PHAN_UNG.get(r),
      kieuPhu: 'phuongTrinh',
    de:
      lang === 'vi'
        ? 'Cân bằng phương trình sau. Tổng các hệ số bằng bao nhiêu?'
        : 'Balance this equation. What is the sum of the coefficients?',
    phu: `${reactants.join(' + ')} → ${products.join(' + ')}`,
    ...lc,
    giaiThich:
      (lang === 'vi' ? 'Phương trình cân bằng: ' : 'Balanced: ') + formatBalanced(kq),
  };
}

/** Hiện tượng quan sát được của một phản ứng. */
function cauHienTuong(rng: Rng, lang: Lang, chuong?: string): CauHoi | null {
  const coHt = phanUngThuong.filter((r) => r.phen_vi && r.phen_en);
  // Câu hỏi lấy trong chương đang chọn, nhưng ĐÁP ÁN NHIỄU vẫn lấy từ cả kho:
  // chương nào chỉ có hai ba phản ứng thì gom không đủ bốn lựa chọn, mà nhiễu
  // cùng chương lại còn dễ loại vì học sinh vừa đọc mấy hiện tượng ấy xong.
  const r = chon(rng, locTheoChuong(coHt, CHUONG_PHAN_UNG, chuong));
  if (!r) return null;
  const dung = (lang === 'vi' ? r.phen_vi : r.phen_en)!;
  const khoNhieu = coHt.map((x) => (lang === 'vi' ? x.phen_vi : x.phen_en)!);
  const lc = dungLuaChon(rng, dung, khoNhieu);
  if (!lc) return null;
  return {
    loai: 'hienTuong',
    chuong: CHUONG_PHAN_UNG.get(r),
      kieuPhu: 'phuongTrinh',
    de:
      lang === 'vi'
        ? 'Hiện tượng quan sát được của phản ứng sau là gì?'
        : 'What do you observe in this reaction?',
    phu: r.eq,
    ...lc,
    giaiThich: (lang === 'vi' ? r.note_vi : r.note_en) ?? dung,
  };
}

/** Chất này thuộc lớp nào — dùng dữ liệu phân lớp. */
function cauLopChat(rng: Rng, lang: Lang, chuong?: string): CauHoi | null {
  const f = chon(rng, locTheoChuong(chatCoLop, CHUONG_CHAT, chuong));
  if (!f) return null;
  const dung = lang === 'vi' ? NHOM_CHAT[f.nhom!].vi : NHOM_CHAT[f.nhom!].en;
  const khoNhieu = Object.values(NHOM_CHAT).map((n) => (lang === 'vi' ? n.vi : n.en));
  const lc = dungLuaChon(rng, dung, khoNhieu);
  if (!lc) return null;
  return {
    loai: 'lopChat',
    chuong: CHUONG_CHAT.get(f),
      kieuPhu: 'congThuc',
    de:
      lang === 'vi'
        ? `"${f.vi}" thuộc lớp chất nào?`
        : `Which class does "${f.en}" belong to?`,
    phu: f.formula,
    ...lc,
    giaiThich: lang === 'vi' ? f.note_vi : f.note_en,
    hoc: `/formulas?item=${encodeURIComponent(keyOf(f))}`,
  };
}

/** Tra bảng tính tan. */
function cauDoTan(rng: Rng, lang: Lang, chuong?: string): CauHoi | null {
  if (chuong && chuong !== CHUONG_DO_TAN) return null;
  for (let thu = 0; thu < 30; thu++) {
    const hang = Math.floor(rng() * CATIONS.length);
    const cot = Math.floor(rng() * ANIONS.length);
    const ma = MATRIX[hang][cot];
    if (ma === '-') continue; // ô không tồn tại thì không hỏi
    const dung = lang === 'vi' ? SOLUB_META[ma].vi : SOLUB_META[ma].en;
    const khoNhieu = (['T', 'K', 'IT'] as const).map((k) =>
      lang === 'vi' ? SOLUB_META[k].vi : SOLUB_META[k].en,
    );
    const lc = dungLuaChon(rng, dung, khoNhieu, 3);
    if (!lc) continue;
    const ct = buildFormula(CATIONS[hang], ANIONS[cot]);
    return {
      loai: 'doTan',
      chuong: CHUONG_DO_TAN,
      kieuPhu: 'congThuc',
      de: lang === 'vi' ? 'Chất sau tan hay không tan trong nước?' : 'Is this soluble in water?',
      phu: ct,
      ...lc,
      giaiThich:
        lang === 'vi'
          ? `Tra bảng tính tan ở hàng ${CATIONS[hang].formula} và cột ${ANIONS[cot].formula}.`
          : `Look up row ${CATIONS[hang].formula}, column ${ANIONS[cot].formula}.`,
      hoc: '/solubility',
    };
  }
  return null;
}

/** Tên IUPAC của một chất. */
function cauIupac(rng: Rng, lang: Lang, chuong?: string): CauHoi | null {
  const coTen = chatCoTenIupac;
  const f = chon(rng, locTheoChuong(coTen, CHUONG_CHAT, chuong));
  if (!f) return null;
  const dung = iupacOf(keyOf(f), f.en)!;
  const khoNhieu = coTen.map((x) => iupacOf(keyOf(x), x.en)!);
  const lc = dungLuaChon(rng, dung, khoNhieu);
  if (!lc) return null;
  return {
    loai: 'iupac',
    chuong: CHUONG_CHAT.get(f),
      kieuPhu: 'congThuc',
    de:
      lang === 'vi'
        ? `Tên theo danh pháp IUPAC của "${f.vi}" là gì?`
        : `What is the IUPAC name of "${f.en}"?`,
    phu: f.formula,
    ...lc,
    giaiThich: lang === 'vi' ? f.note_vi : f.note_en,
    hoc: `/formulas?item=${encodeURIComponent(keyOf(f))}`,
  };
}

/** Nguyên tố thuộc nhóm nào trong bảng tuần hoàn. */
function cauNhomNguyenTo(rng: Rng, lang: Lang, chuong?: string): CauHoi | null {
  const e = chon(rng, locTheoChuong(nguyenToCoNhom, CHUONG_NGUYEN_TO, chuong));
  if (!e) return null;
  const dung = lang === 'vi' ? CATEGORY_META[e.cat].vi : CATEGORY_META[e.cat].en;
  const khoNhieu = Object.keys(NHOM_NGUYEN_TO).map((c) =>
    lang === 'vi'
      ? CATEGORY_META[c as keyof typeof CATEGORY_META].vi
      : CATEGORY_META[c as keyof typeof CATEGORY_META].en,
  );
  const lc = dungLuaChon(rng, dung, khoNhieu);
  if (!lc) return null;
  return {
    loai: 'nhomNguyenTo',
    chuong: CHUONG_NGUYEN_TO.get(e),
      kieuPhu: 'chu',
    de:
      lang === 'vi'
        ? `Nguyên tố ${e.vi} thuộc nhóm nào?`
        : `Which group does ${e.en} belong to?`,
    phu: `${e.sym} · Z = ${e.n}`,
    ...lc,
    giaiThich:
      lang === 'vi'
        ? `Cấu hình electron ${e.config}, chu kì ${e.period}.`
        : `Electron configuration ${e.config}, period ${e.period}.`,
    hoc: `/table/${e.n}`,
  };
}

const BO_SINH: Record<LoaiCau, (rng: Rng, lang: Lang, chuong?: string) => CauHoi | null> = {
  canBang: cauCanBang,
  hienTuong: cauHienTuong,
  lopChat: cauLopChat,
  doTan: cauDoTan,
  iupac: cauIupac,
  nhomNguyenTo: cauNhomNguyenTo,
};

/**
 * Kho câu hỏi CÓ THỂ RA của từng dạng, trong một chương.
 *
 * Không phải "số câu có sẵn" như ngân hàng đề của thầy — đề AI dựng lúc chạy
 * nên con số này là SỐ NGUỒN: bao nhiêu phản ứng, bao nhiêu chất, bao nhiêu
 * nguyên tố của chương ấy đủ dữ liệu để ra một câu. Giao diện phải gọi đúng
 * tên nó là "nguồn", đừng hứa với học sinh là có sẵn từng ấy câu.
 */
const SO_CAU_TRONG_KHO: Record<LoaiCau, (chuong: string) => number> = {
  canBang: (c) => locTheoChuong(phanUngThuong, CHUONG_PHAN_UNG, c).length,
  hienTuong: (c) =>
    locTheoChuong(
      phanUngThuong.filter((r) => r.phen_vi && r.phen_en),
      CHUONG_PHAN_UNG,
      c,
    ).length,
  lopChat: (c) => locTheoChuong(chatCoLop, CHUONG_CHAT, c).length,
  doTan: (c) => (c === CHUONG_DO_TAN ? MATRIX.flat().filter((x) => x !== '-').length : 0),
  iupac: (c) => locTheoChuong(chatCoTenIupac, CHUONG_CHAT, c).length,
  nhomNguyenTo: (c) => locTheoChuong(nguyenToCoNhom, CHUONG_NGUYEN_TO, c).length,
};

/**
 * Kho câu hỏi của TỪNG DẠNG trong TỪNG CHƯƠNG — để cây thư mục hiện được con
 * số thật, ẩn chương chưa có gì, và không mời học sinh vào một dạng rỗng.
 *
 * Trả về mảng phẳng, chỗ gọi tự gom. Chỉ liệt kê mục có ít nhất một nguồn.
 */
export function khoCauTheoChuong(): { chuong: string; loai: LoaiCau; so: number }[] {
  const ra: { chuong: string; loai: LoaiCau; so: number }[] = [];
  for (const c of CHUONG_TRINH) {
    for (const l of Object.keys(BO_SINH) as LoaiCau[]) {
      const so = SO_CAU_TRONG_KHO[l](c.ma);
      if (so > 0) ra.push({ chuong: c.ma, loai: l, so });
    }
  }
  return ra;
}

/**
 * Sinh một bộ đề. `loai` để trống thì lấy đủ mọi dạng.
 * Bỏ qua những câu dựng hụt (không gom đủ lựa chọn) và thử lại, nhưng có giới
 * hạn số lần để không bao giờ chạy mãi.
 */
export function sinhDe(
  hat: number,
  soCau: number,
  lang: Lang,
  loai?: LoaiCau[],
  chuong?: string,
): CauHoi[] {
  const rng = taoRng(hat);
  const xin = loai?.length ? loai : (Object.keys(BO_SINH) as LoaiCau[]);
  // Bỏ ngay những dạng KHÔNG có câu nào trong chương đang chọn. Không bỏ thì
  // vòng lặp cứ bốc trúng dạng rỗng rồi trả null, tiêu hết số lần thử mà đề
  // vẫn thiếu câu — chọn chương hẹp là thấy ngay.
  const cacLoai = chuong ? xin.filter((l) => SO_CAU_TRONG_KHO[l](chuong) > 0) : xin;
  const de: CauHoi[] = [];
  for (let thu = 0; thu < soCau * 20 && de.length < soCau; thu++) {
    const loaiCau = chon(rng, cacLoai);
    if (!loaiCau) break; // không có dạng nào để ra đề thì thôi, khỏi quay vòng
    const c = BO_SINH[loaiCau](rng, lang, chuong);
    if (!c) continue;
    // tránh ra trùng đúng câu vừa hỏi
    if (de.some((x) => x.de === c.de && x.phu === c.phu)) continue;
    de.push(c);
  }
  return de;
}
