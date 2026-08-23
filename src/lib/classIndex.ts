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

import { FORMULAS, keyOf, type Formula } from '../data/formulas';
import { ELEMENTS, type Element, type Category } from '../data/elements';
import { TERMS, type Term } from '../data/dictionary';
import { NHOM_CHAT, NHOM_NGUYEN_TO, type NhomChat } from '../data/classes';
import { factsForElement } from '../data/facts';
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

/**
 * Nội dung đi kèm một thuật ngữ, để mở định nghĩa ra là học được luôn.
 *
 * Mục "thực tiễn" chỉ lấy khi thuật ngữ ứng với một NHÓM NGUYÊN TỐ: lúc đó
 * gom các mẩu thực tiễn đã gắn sẵn số hiệu nguyên tố. Không dò chữ trong nội
 * dung mẩu — dò chữ thì kiểu gì cũng có mẩu bị móc nhầm.
 */
export function noiDungChoThuatNgu(term: Term): NoiDungHoc {
  const chat = CHAT_THEO_TERM.get(term.en) ?? [];
  const nguyenTo = NGUYEN_TO_THEO_TERM.get(term.en) ?? [];

  const daCo = new Set<Fact>();
  const thucTien: Fact[] = [];
  for (const e of nguyenTo)
    for (const f of factsForElement(e.n))
      if (!daCo.has(f)) {
        daCo.add(f);
        thucTien.push(f);
      }

  return { chat, nguyenTo, thucTien };
}

/** Thuật ngữ này có nội dung gì để học kèm không? */
export const coNoiDungHoc = (term: Term): boolean => {
  const n = noiDungChoThuatNgu(term);
  return n.chat.length > 0 || n.nguyenTo.length > 0;
};

/** Số liệu để kiểm tra và báo cáo. */
export const thongKeNoiKet = () => ({
  soTermCoChat: CHAT_THEO_TERM.size,
  soTermCoNguyenTo: NGUYEN_TO_THEO_TERM.size,
  soChatDaNoi: [...CHAT_THEO_TERM.values()].reduce((s, v) => s + v.length, 0),
  soChatChuaNoi: FORMULAS.filter((f) => f.cat !== 'physical' && !f.nhom).length,
  khoaChat: (f: Formula) => keyOf(f),
});
