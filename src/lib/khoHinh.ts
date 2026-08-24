// Nạp và cất giữ hình cấu tạo.
//
// Hình nằm ở public/hinh/*.svg, mỗi chất một file. Có HAI tầng nhớ:
//   1. Bộ nhớ của trang (Map dưới đây) — mở lại cùng một chất trong một phiên
//      thì hiện ngay, không hỏi lại mạng.
//   2. Kho đệm của trình duyệt (Cache Storage) — service worker tự cất khi
//      người dùng xem, và nút "tải cả bộ" trong Cài đặt ghi thẳng vào đây.
//      Tầng này sống qua cả lần tắt máy, và là thứ giúp app dùng được ngoại tuyến.

import { TEN_KHO_HINH } from './tenKhoHinh';

/** Tầng 1: nhớ trong phiên. Khóa là địa chỉ hình. */
const trongPhien = new Map<string, string>();

/**
 * Nội dung lấy về có ĐÚNG là hình không.
 *
 * VÌ SAO PHẢI KIỂM, MÃ 200 CHƯA ĐỦ: Firebase Hosting có luật chuyển hướng SPA —
 * mọi đường dẫn không khớp file nào đều trả về index.html với mã 200, chứ
 * không phải 404. Nên xin một hình không tồn tại thì nhận về NGUYÊN TRANG APP,
 * mà `res.ok` vẫn báo thành công. Không kiểm thì trang nhét cả đống HTML vào
 * đúng chỗ đáng lẽ là hình, và service worker còn đệm luôn thứ rác đó lại.
 *
 * (GitHub Pages trả 404 thật nên không dính. Kiểm ở đây một lần cho cả hai nơi,
 * và cho cả nơi nào sau này.)
 */
const laHinh = (noiDung: string): boolean =>
  noiDung.trimStart().startsWith('<svg');

/** Hình đã nằm sẵn trong bộ nhớ phiên chưa. Trả nội dung, hoặc null. */
export const hinhCoSan = (url: string): string | null =>
  trongPhien.get(url) ?? null;

/** Nạp một hình. Ném lỗi nếu không lấy được — chỗ gọi phải xử lý. */
export async function napHinh(url: string): Promise<string> {
  const san = trongPhien.get(url);
  if (san !== undefined) return san;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Không lấy được hình (${res.status})`);
  const svg = await res.text();
  if (!laHinh(svg)) throw new Error('Trả về không phải hình');
  trongPhien.set(url, svg);
  return svg;
}

/**
 * Mở kho đệm. Trả null nếu trình duyệt không cho dùng.
 *
 * Cache Storage KHÔNG phải lúc nào cũng có: trang chạy trên http trần, Safari
 * chế độ riêng tư, hoặc bộ nhớ đầy. Cùng lý do với lib/boNho.ts — mất chức
 * năng nhớ là chuyện nhỏ, sập app mới là chuyện lớn.
 */
async function moKho(): Promise<Cache | null> {
  try {
    if (!('caches' in globalThis)) return null;
    return await caches.open(TEN_KHO_HINH);
  } catch {
    return null;
  }
}

/** Đếm xem trong kho đệm đã có sẵn bao nhiêu hình trong danh sách truyền vào. */
export async function demHinhDaLuu(urls: string[]): Promise<number | null> {
  const kho = await moKho();
  if (!kho) return null;
  try {
    // Lấy một lượt rồi so, thay vì gọi match() gần ba trăm lần.
    const daCo = new Set((await kho.keys()).map((r) => new URL(r.url).pathname));
    return urls.filter((u) => daCo.has(new URL(u, location.href).pathname)).length;
  } catch {
    return null;
  }
}

export interface KetQuaTai {
  xong: number;
  loi: number;
  /** Trình duyệt không cho dùng kho đệm — tải về cũng không giữ được. */
  khongCoKho: boolean;
}

/**
 * Tải cả bộ hình vào kho đệm để dùng ngoại tuyến.
 *
 * Ghi THẲNG vào Cache Storage chứ không chỉ gọi fetch rồi trông chờ service
 * worker đệm hộ: lúc người dùng bấm nút, service worker có thể chưa kịp giành
 * quyền điều khiển trang (lần vào đầu tiên luôn như vậy). Trông chờ nó thì nút
 * báo "xong" mà kho vẫn rỗng.
 *
 * @param bao gọi sau mỗi hình, để vẽ thanh tiến độ.
 */
export async function taiCaBoVeMay(
  urls: string[],
  bao: (xong: number, tong: number) => void,
  dungLai?: AbortSignal,
): Promise<KetQuaTai> {
  const kho = await moKho();
  if (!kho) return { xong: 0, loi: 0, khongCoKho: true };

  let xong = 0;
  let loi = 0;
  const tong = urls.length;

  // Sáu việc một lúc. Nhiều hơn thì điện thoại yếu nghẽn, mà ít hơn thì gần ba
  // trăm lượt tải nối đuôi nhau lâu sốt ruột.
  const SONG_SONG = 6;
  let ke = 0;

  const motLan = async () => {
    while (ke < tong) {
      if (dungLai?.aborted) return;
      const url = urls[ke++]!;
      try {
        // Đã có rồi thì bỏ qua — bấm nút lần hai không tải lại từ đầu.
        if (!(await kho.match(url))) {
          const res = await fetch(url, { signal: dungLai });
          if (!res.ok) throw new Error(String(res.status));
          // Đọc ra kiểm trước khi cất. Không kiểm thì nút này lẳng lặng nhồi
          // gần ba trăm bản index.html vào kho, rồi báo "xong" — người dùng
          // ngắt mạng ra mới biết mình có một kho rác.
          const noiDung = await res.clone().text();
          if (!laHinh(noiDung)) throw new Error('Trả về không phải hình');
          await kho.put(url, res.clone());
        }
        xong++;
      } catch {
        if (dungLai?.aborted) return;
        loi++;
      }
      bao(xong + loi, tong);
    }
  };

  await Promise.all(Array.from({ length: SONG_SONG }, motLan));
  return { xong, loi, khongCoKho: false };
}

/**
 * Dọn những hình trong kho KHÔNG còn thuộc bộ hiện tại, trả về số đã dọn.
 *
 * VÌ SAO CẦN: tên file hình có mã băm nội dung, nên sửa một hình là ra một tên
 * mới — bản cũ nằm lại trong kho mà không ai còn hỏi tới nữa. Workbox có luật
 * dọn riêng, nhưng nó CHỈ dọn được những mục do chính nó cất; mấy mục do nút
 * "tải cả bộ" ghi thẳng vào kho thì không nằm trong sổ của nó, nên sẽ nằm đó
 * vĩnh viễn. Ai từng bấm nút tải cả bộ rồi mà app cập nhật hình là ôm nguyên
 * một bộ chết ngốn 1,6 MB.
 *
 * Cùng lối với việc script sinh hình tự dọn file .svg thừa trong public/hinh.
 */
export async function donHinhCu(urlHienTai: string[]): Promise<number> {
  const kho = await moKho();
  if (!kho) return 0;
  try {
    const conDung = new Set(
      urlHienTai.map((u) => new URL(u, location.href).pathname),
    );
    let daDon = 0;
    for (const req of await kho.keys()) {
      if (!conDung.has(new URL(req.url).pathname)) {
        await kho.delete(req);
        daDon++;
      }
    }
    return daDon;
  } catch {
    return 0;
  }
}

/** Xóa toàn bộ hình đã tải về, trả lại chỗ trống. */
export async function xoaHinhDaLuu(): Promise<boolean> {
  try {
    if (!('caches' in globalThis)) return false;
    trongPhien.clear();
    return await caches.delete(TEN_KHO_HINH);
  } catch {
    return false;
  }
}
