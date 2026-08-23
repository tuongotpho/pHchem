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

export type LoaiCau = 'canBang' | 'hienTuong' | 'lopChat' | 'doTan' | 'iupac' | 'nhomNguyenTo';

export interface CauHoi {
  loai: LoaiCau;
  de: string;
  /** Dòng phụ, thường là phương trình hoặc công thức — hiện bằng phông chữ máy. */
  phu?: string;
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

// ---------- Bộ sinh số ngẫu nhiên có hạt giống ----------
// Thuật toán mulberry32: ngắn, không cần thư viện, đủ đều cho việc ra đề.
function taoRng(hat: number) {
  let a = hat >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;
const chon = <T>(rng: Rng, ds: readonly T[]): T => ds[Math.floor(rng() * ds.length)];

/** Trộn mảng, không đụng vào mảng gốc. */
function tron<T>(rng: Rng, ds: T[]): T[] {
  const a = [...ds];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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

/** Tổng hệ số sau khi cân bằng — dạng câu hỏi quen thuộc trong đề trắc nghiệm. */
function cauCanBang(rng: Rng, lang: Lang): CauHoi | null {
  const r = chon(rng, phanUngThuong);
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
function cauHienTuong(rng: Rng, lang: Lang): CauHoi | null {
  const coHt = phanUngThuong.filter((r) => r.phen_vi && r.phen_en);
  const r = chon(rng, coHt);
  const dung = (lang === 'vi' ? r.phen_vi : r.phen_en)!;
  const khoNhieu = coHt.map((x) => (lang === 'vi' ? x.phen_vi : x.phen_en)!);
  const lc = dungLuaChon(rng, dung, khoNhieu);
  if (!lc) return null;
  return {
    loai: 'hienTuong',
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
function cauLopChat(rng: Rng, lang: Lang): CauHoi | null {
  const f = chon(rng, chatCoLop);
  const dung = lang === 'vi' ? NHOM_CHAT[f.nhom!].vi : NHOM_CHAT[f.nhom!].en;
  const khoNhieu = Object.values(NHOM_CHAT).map((n) => (lang === 'vi' ? n.vi : n.en));
  const lc = dungLuaChon(rng, dung, khoNhieu);
  if (!lc) return null;
  return {
    loai: 'lopChat',
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
function cauDoTan(rng: Rng, lang: Lang): CauHoi | null {
  for (let thu = 0; thu < 30; thu++) {
    const hang = Math.floor(rng() * CATIONS.length);
    const cot = Math.floor(rng() * ANIONS.length);
    const ma = MATRIX[hang][cot];
    if (ma === '-') continue; // ô không tồn tại thì không hỏi
    const dung = lang === 'vi' ? SOLUB_META[ma].vi : SOLUB_META[ma].en;
    const khoNhieu = (['T', 'I', 'IT'] as const).map((k) =>
      lang === 'vi' ? SOLUB_META[k].vi : SOLUB_META[k].en,
    );
    const lc = dungLuaChon(rng, dung, khoNhieu, 3);
    if (!lc) continue;
    const ct = buildFormula(CATIONS[hang], ANIONS[cot]);
    return {
      loai: 'doTan',
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
function cauIupac(rng: Rng, lang: Lang): CauHoi | null {
  const coTen = FORMULAS.filter((f) => f.cat !== 'physical' && iupacOf(keyOf(f), f.en));
  const f = chon(rng, coTen);
  const dung = iupacOf(keyOf(f), f.en)!;
  const khoNhieu = coTen.map((x) => iupacOf(keyOf(x), x.en)!);
  const lc = dungLuaChon(rng, dung, khoNhieu);
  if (!lc) return null;
  return {
    loai: 'iupac',
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
function cauNhomNguyenTo(rng: Rng, lang: Lang): CauHoi | null {
  const e = chon(rng, nguyenToCoNhom);
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

const BO_SINH: Record<LoaiCau, (rng: Rng, lang: Lang) => CauHoi | null> = {
  canBang: cauCanBang,
  hienTuong: cauHienTuong,
  lopChat: cauLopChat,
  doTan: cauDoTan,
  iupac: cauIupac,
  nhomNguyenTo: cauNhomNguyenTo,
};

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
): CauHoi[] {
  const rng = taoRng(hat);
  const cacLoai = loai?.length ? loai : (Object.keys(BO_SINH) as LoaiCau[]);
  const de: CauHoi[] = [];
  for (let thu = 0; thu < soCau * 20 && de.length < soCau; thu++) {
    const c = BO_SINH[chon(rng, cacLoai)](rng, lang);
    if (!c) continue;
    // tránh ra trùng đúng câu vừa hỏi
    if (de.some((x) => x.de === c.de && x.phu === c.phu)) continue;
    de.push(c);
  }
  return de;
}
