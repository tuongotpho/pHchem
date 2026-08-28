// Đọc bộ đề do giáo viên soạn, đã chuyển sang JSON bởi `npm run de`.
//
// ĐỀ KHÔNG NẰM TRONG GÓI CÀI. Mỗi bộ là một file rời trong public/de/, tải khi
// người dùng chọn làm bộ đó rồi trình duyệt nhớ lại (luật đệm khai ở
// vite.config.ts). Nhờ vậy thêm 100 bộ đề thì gói cài vẫn nguyên kích thước,
// và học sinh chỉ tốn dung lượng cho đề mình thật sự làm.
//
// KHÁC HẲN ĐỀ MÁY TỰ SINH: đề trong lib/quiz.ts dựng từ dữ liệu đã qua gần 300
// phép kiểm tự động nên đáp án không thể sai. Đề ở đây là chữ của thầy, máy
// KHÔNG kiểm được nội dung — chỉ kiểm được hình thức (đủ 4 lựa chọn, có đúng
// một đáp án). Hai thứ khác nhau về mức tin cậy nên giao diện phải nói rõ,
// không được trộn làm một rồi hứa chung một câu.

/**
 * Mốc đánh dấu chỗ đặt ảnh / bảng NGAY TRONG đề bài.
 *
 * Đề của thầy hay xen ảnh vào giữa đề — câu 22 là "...cho trong bảng sau:" rồi
 * mới tới bảng, rồi mới tới "Tính giá trị...". Không có mốc thì ảnh bị dồn
 * xuống cuối và đề đọc lên ngược thứ tự. Chuỗi mốc do scripts/deParse.mjs cắm
 * vào, hai bên phải khai giống hệt nhau.
 */
export const MOC_HINH = '{{hinh}}';
export const MOC_BANG = '{{bang}}';
/** Cắt đề bài thành các khúc, mốc đứng riêng một khúc để chỗ vẽ nhận ra. */
export const catTheoMoc = (de: string): string[] =>
  de.split(/(\{\{hinh\}\}|\{\{bang\}\})/).filter((x) => x !== '');

export interface BangSoLieu {
  cot: string[];
  dong: string[][];
}

export interface CauDeThay {
  so: number;
  de: string;
  luaChon: string[];
  /** Chỉ số đáp án đúng trong luaChon. */
  dapAn: number;
  /** Tên file ảnh trong public/de/hinh/ — ảnh thí nghiệm, sơ đồ. */
  hinh?: string;
  /** Bảng số liệu gõ lại từ ảnh chụp bảng trong đề gốc. */
  bang?: BangSoLieu;
  /**
   * Đáp án này do NGƯỜI SUY RA vì bản gốc của thầy không đánh dấu.
   * Giao diện PHẢI hiện cảnh báo — học sinh có quyền biết chỗ nào chưa chắc.
   */
  dapAnSuyRa?: boolean;
}

export interface BoDe {
  id: string;
  ten: string;
  /** Chương / chuyên đề. Nhiều bộ đề có thể cùng một chuyên đề. */
  chuyenDe: string;
  nguon: string;
  soCau: number;
  cau: CauDeThay[];
}

export interface MucDanhMuc {
  id: string;
  ten: string;
  chuyenDe: string;
  soCau: number;
}

/**
 * Gom danh mục theo chuyên đề, giữ nguyên thứ tự xuất hiện.
 *
 * Học sinh chọn CHUYÊN ĐỀ chứ không chọn từng file đề — "ôn Nitrogen" là ý
 * nghĩ tự nhiên, còn "làm bộ đề Nitrogen_TN_ĐA_2026" thì không. Một chuyên đề
 * có thể gồm nhiều bộ đề thầy gửi ở các đợt khác nhau, chọn xong thì gộp câu
 * của cả mấy bộ lại rồi mới trộn.
 */
export function gomTheoChuyenDe(dm: MucDanhMuc[]): { ten: string; muc: MucDanhMuc[]; soCau: number }[] {
  const ban = new Map<string, MucDanhMuc[]>();
  for (const m of dm) {
    const k = m.chuyenDe || m.ten;
    ban.set(k, [...(ban.get(k) ?? []), m]);
  }
  return [...ban].map(([ten, muc]) => ({
    ten,
    muc,
    soCau: muc.reduce((t, m) => t + m.soCau, 0),
  }));
}

// import.meta.env.BASE_URL đã có sẵn dấu gạch chéo cuối. Dùng nó chứ không gõ
// "/de/..." thẳng: bản trên GitHub Pages nằm dưới /pHchem/, gõ cứng là 404.
const goc = () => import.meta.env.BASE_URL;

export const duongDanDanhMuc = (base: string) => `${base}de/danh-muc.json`;
export const duongDanBoDe = (base: string, id: string) => `${base}de/${id}.json`;
export const duongDanHinh = (base: string, ten: string) => `${base}de/hinh/${ten}`;

/** Địa chỉ ảnh của một câu, để giao diện khỏi phải biết cấu trúc thư mục. */
export const anhCua = (ten: string) => duongDanHinh(goc(), ten);

/**
 * Lấy danh sách bộ đề. Không có file hay mất mạng thì trả mảng RỖNG chứ không
 * ném lỗi — app này chạy ngoại tuyến là chính, thiếu đề của thầy thì vẫn còn
 * nguyên phần đề máy tự sinh, không có cớ gì để hỏng cả trang.
 */
export async function layDanhMuc(): Promise<MucDanhMuc[]> {
  try {
    const r = await fetch(duongDanDanhMuc(goc()));
    if (!r.ok) return [];
    const d = await r.json();
    return Array.isArray(d) ? d.filter(hopLeMuc) : [];
  } catch {
    return [];
  }
}

/** Lấy một bộ đề. Hỏng thì trả null để nơi gọi hiện lời nhắc tử tế. */
export async function layBoDe(id: string): Promise<BoDe | null> {
  try {
    const r = await fetch(duongDanBoDe(goc(), id));
    if (!r.ok) return null;
    const d = await r.json();
    return hopLeBoDe(d) ? d : null;
  } catch {
    return null;
  }
}

const hopLeMuc = (x: unknown): x is MucDanhMuc =>
  !!x &&
  typeof (x as MucDanhMuc).id === 'string' &&
  typeof (x as MucDanhMuc).ten === 'string' &&
  typeof (x as MucDanhMuc).soCau === 'number';

/**
 * Kiểm hình thức một bộ đề tải về.
 *
 * VÌ SAO KIỂM Ở ĐÂY nữa dù script sinh đề đã kiểm rồi: file JSON nằm ngoài gói
 * cài, có thể là bản CŨ còn trong kho đệm của trình duyệt từ lần sửa trước.
 * Một câu thiếu lựa chọn hay đáp án trỏ ra ngoài mảng sẽ làm màn làm bài hiện
 * "undefined" hoặc chấm sai mà không ai biết. Thà không hiện bộ đề đó.
 */
export function hopLeBoDe(x: unknown): x is BoDe {
  const d = x as BoDe;
  if (!d || typeof d.id !== 'string' || !Array.isArray(d.cau) || !d.cau.length) return false;
  return d.cau.every(
    (c) =>
      typeof c.de === 'string' &&
      Array.isArray(c.luaChon) &&
      c.luaChon.length === 4 &&
      c.luaChon.every((t) => typeof t === 'string' && t.length > 0) &&
      Number.isInteger(c.dapAn) &&
      c.dapAn >= 0 &&
      c.dapAn < c.luaChon.length,
  );
}
