// GOM ĐỀ THÀNH CÂY THƯ MỤC: Lớp → Chương → mục con.
//
// DÙNG CHUNG CHO CẢ HAI NGUỒN ĐỀ, và đó là lý do file này tồn tại. Ngân hàng
// đề của thầy và đề do AI tự tạo là hai thế giới khác nhau — một bên là file
// tải về, một bên dựng ngay lúc chạy — nhưng học sinh nhìn vào phải thấy CÙNG
// MỘT CÂY: cùng thứ tự lớp, cùng tên chương, cùng cách đếm. Viết hai bản thì
// hôm nào sửa tên chương một bên, hai cột trên màn hình lệch nhau ngay.
//
// Mỗi nguồn chỉ phải nộp một danh sách LÁ phẳng (tên + số câu + mã chương),
// còn việc xếp vào lớp nào, chương nào, chương nào rỗng thì ẩn đi là việc ở
// đây.

import {
  CHUONG_TRINH,
  CAC_LOP,
  CHUA_XEP,
  TEN_CHUA_XEP,
  type Chuong,
  type MaLop,
} from '../data/chuongTrinh.js';

/** Một mục con trong chương: chuyên đề (đề của thầy) hoặc dạng bài (đề AI). */
export interface La {
  /**
   * Khóa của mục, duy nhất TRONG MỘT CHƯƠNG — chỗ gọi nhận lại cặp
   * (chương, khóa) khi người dùng bấm, nên hai chương trùng khóa nhau không
   * sao. Bên đề AI thì đúng là trùng thật: chương nào cũng có dạng "cân bằng
   * phương trình".
   */
  khoa: string;
  ten: string;
  soCau: number;
  /** Mã chương, vd "11.2". Để trống là chưa xếp được. */
  chuong?: string;
}

export interface NutChuong {
  ma: string;
  ten: string;
  /** Các bài trong chương, viết gọn. Rỗng với mục "chưa xếp chương". */
  noiDung: string;
  soCau: number;
  la: La[];
}

export interface NutLop {
  /** null là nhánh "chưa xếp chương" — không thuộc lớp nào. */
  lop: MaLop | null;
  ten: string;
  soCau: number;
  chuong: NutChuong[];
}

/**
 * Mã chương dùng để gom, đã chuẩn hóa.
 *
 * Mã lạ (bộ đề cũ còn trong kho đệm của trình duyệt khai mã của bản trước)
 * được coi như CHƯA XẾP, không dựng ra một nhánh lớp không có thật. Chỗ nào
 * lọc theo chương cũng phải gọi hàm này, nếu không thì cây gom một kiểu mà
 * lúc lấy đề lại lọc một kiểu.
 */
export const maChuongCua = (chuong?: string): string =>
  chuong && CHUONG_TRINH.some((c) => c.ma === chuong) ? chuong : CHUA_XEP;

const tenChuongTheo = (c: Chuong, vi: boolean) => (vi ? c.vi : c.en);
const noiDungTheo = (c: Chuong, vi: boolean) => (vi ? c.noiDung : c.noiDungEn);

/**
 * Dựng cây từ danh sách lá.
 *
 * CHỈ HIỆN CHƯƠNG CÓ CÂU. Cây đủ 21 chương mà 18 chương trống thì học sinh
 * phải lướt qua một rừng mục rỗng để tìm ba chỗ có đề — và tệ hơn, trông như
 * app hứa có đề cả ba lớp trong khi thầy mới gửi ba bộ. Số hiện ra phải là số
 * đang có thật.
 *
 * Thứ tự: lớp 10 → 11 → 12, trong lớp thì theo số chương của sách. Nhánh
 * "chưa xếp chương" luôn đứng CUỐI và luôn hiện nếu có câu — giấu nó đi là
 * giấu mất phần đề mà máy chưa biết xếp vào đâu.
 */
export function dungCay(la: La[], vi: boolean): NutLop[] {
  const theoChuong = new Map<string, La[]>();
  for (const l of la) {
    if (l.soCau <= 0) continue;
    theoChuong.set(maChuongCua(l.chuong), [...(theoChuong.get(maChuongCua(l.chuong)) ?? []), l]);
  }

  const nut = (ma: string, ten: string, noiDung: string): NutChuong | null => {
    const con = theoChuong.get(ma);
    if (!con?.length) return null;
    return { ma, ten, noiDung, soCau: con.reduce((t, x) => t + x.soCau, 0), la: con };
  };

  const cay: NutLop[] = [];
  for (const lop of CAC_LOP) {
    const chuong = CHUONG_TRINH.filter((c) => c.lop === lop)
      .map((c) => nut(c.ma, tenChuongTheo(c, vi), noiDungTheo(c, vi)))
      .filter((x): x is NutChuong => x !== null);
    if (!chuong.length) continue;
    cay.push({
      lop,
      ten: vi ? `Lớp ${lop}` : `Grade ${lop}`,
      soCau: chuong.reduce((t, c) => t + c.soCau, 0),
      chuong,
    });
  }

  const chuaXep = nut(CHUA_XEP, vi ? TEN_CHUA_XEP.vi : TEN_CHUA_XEP.en, '');
  if (chuaXep) {
    cay.push({
      lop: null,
      ten: vi ? TEN_CHUA_XEP.vi : TEN_CHUA_XEP.en,
      soCau: chuaXep.soCau,
      chuong: [chuaXep],
    });
  }
  return cay;
}

/** Tổng số câu của cả cây — cho mục "Tất cả". */
export const tongCau = (cay: NutLop[]): number => cay.reduce((t, l) => t + l.soCau, 0);

/** Số câu của một chương trong cây, 0 nếu chương ấy không có mục nào. */
export const cauCuaChuong = (cay: NutLop[], ma: string): number =>
  cay.flatMap((l) => l.chuong).find((c) => c.ma === ma)?.soCau ?? 0;
