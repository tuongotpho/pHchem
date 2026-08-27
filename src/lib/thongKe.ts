// Đếm lượt truy cập bằng GoatCounter.
//
// VÌ SAO CHỌN GOATCOUNTER, KHÔNG CHỌN GOOGLE ANALYTICS:
//   - Không cookie, không hồ sơ người dùng ⇒ không phải hiện banner xin phép.
//   - Script 3 KB thay vì 45 KB. App này quảng cáo trong manifest là "chạy
//     offline, không quảng cáo" — cắm bộ theo dõi nặng vào là đi ngược lời hứa.
//   - Cho phép đọc TỔNG SỐ về hiện lên trang, thứ mà Analytics không cho.
//
// BA ĐIỀU CON SỐ NÀY KHÔNG NÓI ĐƯỢC — ai đem đi báo cáo phải biết:
//   1. Nó đếm từ ngày cắm mã vào, không đếm ngược lại quá khứ.
//   2. Nó là LƯỢT TRUY CẬP, không phải số người. GoatCounter nhận diện khách
//      bằng mã băm đổi mới mỗi ngày, nên một người vào ba ngày là ba lượt.
//      Đó cũng là lý do nhãn ghi "Lượt truy cập" chứ không ghi "người dùng".
//   3. App này chạy được NGOẠI TUYẾN. Ai cài về máy rồi mở lúc không có mạng
//      thì lượt đó không tới được máy chủ. Số thật luôn cao hơn số hiện ra.

/**
 * Mã trang trên GoatCounter — phần đứng trước ".goatcounter.com".
 *
 * ĐỂ TRỐNG LÀ TẮT HẲN: không nạp script, không gọi mạng, không hiện ô đếm.
 * Nhờ vậy đem mã này chạy ở đâu cũng không lỡ bắn số liệu về một trang lạ,
 * và người tự dựng lại app không bị ép dùng tài khoản của người khác.
 *
 * Muốn bật: đăng ký ở https://www.goatcounter.com/ rồi điền mã vào đây, và
 * nhớ BẬT "Allow adding visitor counts on your website" trong phần cài đặt
 * của trang — không bật thì địa chỉ đọc tổng số trả về lỗi, ô đếm rỗng.
 */
export const MA_GOATCOUNTER = 'vietthanh228';

/** Nơi bắn một lượt truy cập về. */
export const diaChiDem = (ma: string) => `https://${ma}.goatcounter.com/count`;

/**
 * Nơi đọc TỔNG SỐ của cả trang. Chữ TOTAL viết hoa và KHÔNG có dấu gạch chéo
 * đứng trước là quy ước của GoatCounter, đổi một chữ là hỏng.
 */
export const diaChiTong = (ma: string) =>
  `https://${ma}.goatcounter.com/counter/TOTAL.json`;

/** Địa chỉ script đếm. Ghi rõ https, KHÔNG dùng "//" bỏ lửng. */
export const DIA_CHI_SCRIPT = 'https://gc.zgo.at/count.js';

/**
 * Rút con số ra khỏi phần trả lời của GoatCounter.
 *
 * Máy chủ trả về CHUỖI đã ngăn cách sẵn, KHÔNG phải số. Và cách ngăn cách
 * không cố định: tài liệu của họ ghi là dấu phẩy ("1,234") nhưng máy chủ thật
 * đang trả về DẤU CÁCH HẸP U+202F (kiểu "1<U+202F>089<U+202F>627"). Đo được lúc
 * 28/08/2026 trên chính trang thống kê của GoatCounter.
 *
 * Nên chỗ này KHÔNG bắt theo một dấu ngăn cách nào cả — lọc lấy chữ số rồi tự
 * định dạng lại theo ngôn ngữ người dùng. Bám vào dấu phẩy như tài liệu nói
 * thì hôm nay đã hỏng rồi mà không ai biết: "1 089 627" sẽ ra số 1.
 */
export function docSo(du: unknown): number | null {
  if (!du || typeof du !== 'object') return null;
  const tho = (du as { count?: unknown }).count;
  if (typeof tho !== 'string' && typeof tho !== 'number') return null;
  const chuSo = String(tho).replace(/[^\d]/g, '');
  if (!chuSo) return null;
  const n = Number(chuSo);
  return Number.isFinite(n) ? n : null;
}

/** Chấm phẩy theo đúng thói quen từng thứ tiếng: 1.234 (vi) · 1,234 (en). */
export function dinhDang(n: number, lang: 'vi' | 'en'): string {
  return new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US').format(n);
}

export const KHOA_LUU = 'chemipro.luotTruyCap';

/**
 * Sáu tiếng mới hỏi lại máy chủ một lần.
 *
 * Chính GoatCounter đã đệm phần trả lời TỚI BỐN TIẾNG, nên hỏi dày hơn thế
 * chỉ nhận lại đúng con số cũ mà vẫn tốn một lượt gọi mạng của người dùng.
 * Sáu tiếng là để nằm hẳn ngoài khoảng đệm đó.
 */
export const HAN_HOI_LAI = 6 * 60 * 60 * 1000;

export interface SoDaLuu {
  so: number;
  /** Mốc thời gian lấy được, tính bằng mili giây. */
  luc: number;
}

/** Đọc con số lần trước. Hỏng hay chưa có thì coi như chưa biết gì. */
export function docDaLuu(chuoi: string | null): SoDaLuu | null {
  if (!chuoi) return null;
  try {
    const x = JSON.parse(chuoi);
    if (typeof x?.so === 'number' && typeof x?.luc === 'number' && x.so >= 0) {
      return { so: x.so, luc: x.luc };
    }
  } catch {
    // Kho lưu bị ai sửa tay hoặc bản cũ lưu kiểu khác — bỏ qua, hỏi lại máy chủ.
  }
  return null;
}

/** Đã tới lúc hỏi lại máy chủ chưa. Chưa có gì trong kho thì hỏi ngay. */
export function canHoiLai(daLuu: SoDaLuu | null, bayGio: number): boolean {
  if (!daLuu) return true;
  // Máy để lệch giờ về tương lai thì mốc cũ hóa ra "sau" hiện tại. Hỏi lại
  // luôn, đừng để con số kẹt cứng cho tới khi người dùng chỉnh lại đồng hồ.
  if (daLuu.luc > bayGio) return true;
  return bayGio - daLuu.luc >= HAN_HOI_LAI;
}
