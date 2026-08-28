// Bộ sinh ngẫu nhiên CÓ HẠT GIỐNG, dùng chung cho cả hai nguồn đề.
//
// VÌ SAO PHẢI CÓ HẠT GIỐNG chứ không dùng Math.random thẳng:
//   - Cùng một hạt luôn ra cùng một bộ đề. Nhờ vậy thầy đọc "mã đề 847302" là
//     cả lớp mở ra được đúng bộ câu ấy, đúng thứ tự ấy — không cần máy chủ,
//     không cần tài khoản, không cần mạng.
//   - Phép kiểm tự động chạy được: cùng hạt thì kết quả lặp lại, so sánh được.
//
// TÁCH RA KHỎI lib/quiz.ts (28/08/2026): trước đây ba hàm này nằm kẹt trong
// đó, không xuất ra, nên phần đề của thầy muốn trộn câu thì phải chép lại một
// bản. Hai bản trộn khác nhau nghĩa là cùng một mã đề mà hai nguồn ra hai kết
// quả — mã đề mất hết ý nghĩa mà không ai thấy.

export type Rng = () => number;

/**
 * Thuật toán mulberry32: ngắn, không cần thư viện, đủ đều cho việc ra đề.
 * Không dùng cho mật mã — chỗ này chỉ cần xáo bài, không cần bí mật.
 */
export function taoRng(hat: number): Rng {
  let a = hat >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Rút ngẫu nhiên một phần tử. Mảng RỖNG thì trả undefined chứ không trả bừa.
 *
 * Trước đây `ds[Math.floor(rng() * 0)]` cho undefined rồi câu lệnh ngay sau đó
 * đọc thuộc tính của undefined và làm SẬP cả trang. Các mảng nguồn đều lọc từ
 * dữ liệu nên chỉ cần dữ liệu đổi là chúng rỗng lúc nào không hay.
 */
export const chon = <T>(rng: Rng, ds: readonly T[]): T | undefined =>
  ds.length ? ds[Math.floor(rng() * ds.length)] : undefined;

/** Trộn mảng theo Fisher–Yates, KHÔNG đụng vào mảng gốc. */
export function tron<T>(rng: Rng, ds: readonly T[]): T[] {
  const a = [...ds];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Hạt giống mới cho một lượt làm bài. */
export const hatMoi = (): number => Math.floor(Math.random() * 1e9);
