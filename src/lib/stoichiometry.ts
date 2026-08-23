// Tính theo phương trình hóa học — bài toán phổ biến nhất của học sinh.
//
//   "Cho 5,6 g Fe tác dụng hết với HCl, thu được bao nhiêu lít khí?"
//
// App vốn đã có đủ mảnh rời: cân bằng phương trình (balance.ts), đổi mol và
// khối lượng (solution.ts, formula.ts). Đây là chỗ ghép chúng lại.
//
// Có xử lý CHẤT HẾT TRƯỚC: cho biết lượng của hai chất tham gia thì phải tìm
// xem chất nào phản ứng hết, vì lượng sản phẩm do chất đó quyết định, không
// phải chất còn dư. Đây đúng là chỗ học sinh hay sai nhất.

import { balance } from './balance';
import { parseFormula } from './formula';
import { VM_STP } from './solution';

/** Đơn vị của lượng chất người dùng nhập. */
export type DonVi = 'mol' | 'gam' | 'lit';

export interface LuongDaBiet {
  /** Vị trí chất trong phương trình, đếm từ 0 theo thứ tự vế trái rồi vế phải. */
  viTri: number;
  donVi: DonVi;
  giaTri: number;
}

export interface ChatTrongPhuongTrinh {
  congThuc: string;
  heSo: number;
  /** Chất tham gia (vế trái) hay sản phẩm (vế phải). */
  veTrai: boolean;
  /** Khối lượng mol, g/mol. */
  M: number;
  /** Số mol ban đầu người dùng cho biết; null nếu không cho. */
  molBanDau: number | null;
  /** Số mol thực sự phản ứng (với chất tham gia) hoặc sinh ra (với sản phẩm). */
  mol: number;
  khoiLuong: number;
  /** Thể tích ở đktc NẾU chất này là chất khí. */
  theTichKhi: number;
  /** Số mol còn dư sau phản ứng; chỉ khác 0 với chất tham gia còn thừa. */
  molDu: number;
}

export interface KetQuaTinh {
  ok: boolean;
  error?: string;
  phuongTrinhCanBang?: string;
  chat?: ChatTrongPhuongTrinh[];
  /** Công thức của chất phản ứng hết trước; null nếu chỉ cho biết một chất. */
  chatHetTruoc?: string | null;
  /** Số lần "bộ hệ số" của phương trình được dùng — cầu nối giữa các chất. */
  soLanPhanUng?: number;
}

/**
 * Tính lượng mọi chất trong phương trình, từ lượng đã biết của một hoặc nhiều
 * chất.
 *
 * Cách làm đúng như dạy trên lớp:
 *   1. Cân bằng phương trình để có hệ số
 *   2. Đổi lượng đã biết ra số mol
 *   3. Chia số mol cho hệ số → biết phương trình chạy được bao nhiêu "lượt"
 *   4. Lượt nhỏ nhất là lượt thật sự xảy ra; chất cho ra lượt đó là chất hết
 *   5. Nhân lượt đó với hệ số từng chất → số mol của mọi chất
 */
export function tinhTheoPhuongTrinh(
  phuongTrinh: string,
  daBiet: LuongDaBiet[],
): KetQuaTinh {
  const cb = balance(phuongTrinh);
  if (!cb.ok) return { ok: false, error: cb.error };

  const congThuc = [...(cb.reactants ?? []), ...(cb.products ?? [])];
  const heSo = cb.coefficients!;
  const soChatTraiPhai = (cb.reactants ?? []).length;

  const M: number[] = [];
  for (const ct of congThuc) {
    const r = parseFormula(ct);
    if (!r.ok || !r.mass) return { ok: false, error: `Không tính được khối lượng mol của "${ct}"` };
    M.push(r.mass);
  }

  if (!daBiet.length) return { ok: false, error: 'Cần cho biết lượng của ít nhất một chất' };

  // Bước 2: đổi mọi lượng đã biết ra số mol
  const molBanDau: (number | null)[] = congThuc.map(() => null);
  for (const d of daBiet) {
    if (d.viTri < 0 || d.viTri >= congThuc.length)
      return { ok: false, error: 'Chất được chọn không có trong phương trình' };
    if (!(d.giaTri > 0)) return { ok: false, error: 'Lượng chất phải lớn hơn 0' };
    const mol =
      d.donVi === 'mol'
        ? d.giaTri
        : d.donVi === 'gam'
          ? d.giaTri / M[d.viTri]
          : d.giaTri / VM_STP;
    molBanDau[d.viTri] = mol;
  }

  // Bước 3 và 4: mỗi chất ĐÃ BIẾT cho ra một số lượt; lượt nhỏ nhất là lượt thật
  let soLan = Infinity;
  let chatHetTruoc: string | null = null;
  let soChatThamGiaDaBiet = 0;
  for (let i = 0; i < congThuc.length; i++) {
    const m = molBanDau[i];
    if (m === null) continue;
    if (i < soChatTraiPhai) soChatThamGiaDaBiet++;
    const lan = m / heSo[i];
    if (lan < soLan) {
      soLan = lan;
      chatHetTruoc = congThuc[i];
    }
  }
  if (!Number.isFinite(soLan)) return { ok: false, error: 'Cần cho biết lượng của ít nhất một chất' };

  // Chỉ gọi là "chất hết trước" khi có từ hai chất THAM GIA được cho biết —
  // một chất thì không có gì để so, nói chất đó hết trước là vô nghĩa.
  if (soChatThamGiaDaBiet < 2) chatHetTruoc = null;

  const chat: ChatTrongPhuongTrinh[] = congThuc.map((ct, i) => {
    const mol = heSo[i] * soLan;
    const banDau = molBanDau[i];
    const veTrai = i < soChatTraiPhai;
    return {
      congThuc: ct,
      heSo: heSo[i],
      veTrai,
      M: M[i],
      molBanDau: banDau,
      mol,
      khoiLuong: mol * M[i],
      theTichKhi: mol * VM_STP,
      molDu: veTrai && banDau !== null ? Math.max(0, banDau - mol) : 0,
    };
  });

  return {
    ok: true,
    phuongTrinhCanBang: dinhDangPhuongTrinh(congThuc, heSo, soChatTraiPhai),
    chat,
    chatHetTruoc,
    soLanPhanUng: soLan,
  };
}

function dinhDangPhuongTrinh(congThuc: string[], heSo: number[], soTrai: number): string {
  const ve = (tu: number, den: number) =>
    congThuc
      .slice(tu, den)
      .map((ct, k) => (heSo[tu + k] === 1 ? ct : `${heSo[tu + k]} ${ct}`))
      .join(' + ');
  return `${ve(0, soTrai)} → ${ve(soTrai, congThuc.length)}`;
}
