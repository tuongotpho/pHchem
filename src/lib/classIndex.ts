// Chỉ mục hai chiều giữa TỪ ĐIỂN và các kho dữ liệu khác.
//
// Đi theo PHÂN LOẠI chứ không dò chữ: Clo là halogen nên nối thẳng sang định
// nghĩa "Halogen"; CH4 là ankan nên nối sang "Ankan". Quan hệ này là thật
// trong hóa học nên không bao giờ nối nhầm — khác hẳn cách dò tên trong mô tả.
//
// Hai chiều:
//   - từ một CHẤT hay NGUYÊN TỐ  → định nghĩa lớp của nó
//   - từ một ĐỊNH NGHĨA          → cả loạt chất và nguyên tố thuộc lớp đó,
//                                   để mở ra là học được luôn

import { FORMULAS, type Formula } from '../data/formulas';
import { ELEMENTS, type Element, type Category } from '../data/elements';
import { TERMS, type Term } from '../data/dictionary';
import { NHOM_CHAT, NHOM_NGUYEN_TO, type NhomChat } from '../data/classes';
import { factsForElement, factsForNhom } from '../data/facts';
import type { Fact } from '../data/facts';

/** Lớp chất của một chất, hoặc undefined nếu chất đó không thuộc lớp nào. */
export const nhomCuaChat = (f: Formula): NhomChat | undefined =>
  f.nhom ? NHOM_CHAT[f.nhom] : undefined;

/** Thuật ngữ ứng với một nguyên tố, dựa vào nhóm của nó trong bảng tuần hoàn. */
export function thuatNguCuaNguyenTo(cat: Category): Term | undefined {
  const en = NHOM_NGUYEN_TO[cat];
  return en ? TERMS.find((t) => t.en === en) : undefined;
}

/** Thuật ngữ ứng với lớp chất. */
export function thuatNguCuaNhom(nhomKey: string): Term | undefined {
  const n = NHOM_CHAT[nhomKey];
  return n ? TERMS.find((t) => t.en === n.term) : undefined;
}

// ---------- Chiều ngược: từ một định nghĩa ra nội dung để học ----------

// Gom sẵn một lần lúc nạp, tra về sau chỉ là lấy ra.
const CHAT_THEO_TERM = new Map<string, Formula[]>();
for (const f of FORMULAS) {
  const n = nhomCuaChat(f);
  if (!n) continue;
  const arr = CHAT_THEO_TERM.get(n.term);
  if (arr) arr.push(f);
  else CHAT_THEO_TERM.set(n.term, [f]);
}

const NGUYEN_TO_THEO_TERM = new Map<string, Element[]>();
for (const e of ELEMENTS) {
  const en = NHOM_NGUYEN_TO[e.cat];
  if (!en) continue;
  const arr = NGUYEN_TO_THEO_TERM.get(en);
  if (arr) arr.push(e);
  else NGUYEN_TO_THEO_TERM.set(en, [e]);
}

export interface NoiDungHoc {
  chat: Formula[];
  nguyenTo: Element[];
  thucTien: Fact[];
}

// Lớp chất nào ứng với thuật ngữ nào — chiều ngược của NHOM_CHAT, dựng sẵn
// một lần để tra cho nhanh.
const NHOM_THEO_TERM = new Map<string, string[]>();
for (const [khoa, n] of Object.entries(NHOM_CHAT)) {
  const arr = NHOM_THEO_TERM.get(n.term);
  if (arr) arr.push(khoa);
  else NHOM_THEO_TERM.set(n.term, [khoa]);
}

/**
 * Nội dung đi kèm một thuật ngữ, để mở định nghĩa ra là học được luôn.
 *
 * Mục "thực tiễn" gom từ HAI đường, đều đã gắn tay sẵn trong dữ liệu:
 *   - thuật ngữ ứng với một NHÓM NGUYÊN TỐ → lấy mẩu gắn số hiệu nguyên tố
 *   - thuật ngữ ứng với một LỚP CHẤT → lấy mẩu gắn khóa lớp chất đó
 *
 * Không dò chữ trong nội dung mẩu — dò chữ thì kiểu gì cũng móc nhầm: "men
 * răng" thành men bia, "viên đường" thành gluxit, "đạm N" thành amino axit.
 *
 * Trước đây chỉ có đường thứ nhất, nên mở "Halogen" thấy cả loạt mẩu mà mở
 * "Este" thì trống trơn, dù kho có mẩu về este hẳn hoi.
 */
// Nhớ sẵn kết quả theo thuật ngữ. Trang Từ điển gọi hàm này cho TỪNG mục ở
// MỌI lần vẽ lại — mỗi lần dựng mới ba mảng và quét kho thực tiễn. Khóa theo
// tên tiếng Anh vì tên đó đã có phép kiểm chống trùng.
const NHO = new Map<string, NoiDungHoc>();

export function noiDungChoThuatNgu(term: Term): NoiDungHoc {
  const daCoSan = NHO.get(term.en);
  if (daCoSan) return daCoSan;

  const chat = CHAT_THEO_TERM.get(term.en) ?? [];
  const nguyenTo = NGUYEN_TO_THEO_TERM.get(term.en) ?? [];

  const daCo = new Set<Fact>();
  const thucTien: Fact[] = [];
  const gom = (ds: Fact[]) => {
    for (const f of ds)
      if (!daCo.has(f)) {
        daCo.add(f);
        thucTien.push(f);
      }
  };
  for (const e of nguyenTo) gom(factsForElement(e.n));
  for (const khoa of NHOM_THEO_TERM.get(term.en) ?? []) gom(factsForNhom(khoa));

  const kq: NoiDungHoc = { chat, nguyenTo, thucTien };
  NHO.set(term.en, kq);
  return kq;
}

/** Thuật ngữ này có nội dung gì để học kèm không? */
export const coNoiDungHoc = (term: Term): boolean => {
  const n = noiDungChoThuatNgu(term);
  return n.chat.length > 0 || n.nguyenTo.length > 0 || n.thucTien.length > 0;
};
