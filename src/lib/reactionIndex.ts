// Chỉ mục: phản ứng nào liên quan tới chất nào, nguyên tố nào.

import { REACTIONS, type Reaction } from '../data/reactions';
import { speciesOf } from './reaction';
import { elementsOf } from './compoundIndex';

const THEO_CHAT = new Map<string, Reaction[]>();
const THEO_NGUYEN_TO = new Map<number, Reaction[]>();

for (const r of REACTIONS) {
  const { reactants, products } = speciesOf(r.eq);
  const chats = [...new Set([...reactants, ...products])];

  for (const c of chats) {
    const arr = THEO_CHAT.get(c);
    if (arr) arr.push(r);
    else THEO_CHAT.set(c, [r]);
  }

  // Nguyên tố: gom từ tất cả các chất trong phương trình
  const els = new Set<number>();
  for (const c of chats) elementsOf(c).forEach((n) => els.add(n));
  for (const n of els) {
    const arr = THEO_NGUYEN_TO.get(n);
    if (arr) arr.push(r);
    else THEO_NGUYEN_TO.set(n, [r]);
  }
}

/** Các phản ứng có chất này tham gia hoặc tạo thành. */
export const reactionsForFormula = (formula: string): Reaction[] =>
  THEO_CHAT.get(formula) ?? [];

/** Các phản ứng có mặt nguyên tố này. */
export const reactionsForElement = (n: number): Reaction[] =>
  THEO_NGUYEN_TO.get(n) ?? [];

/** Số chất / số nguyên tố đang có phản ứng — dùng để báo cáo. */
export const indexStats = () => ({
  chat: THEO_CHAT.size,
  nguyenTo: THEO_NGUYEN_TO.size,
});
