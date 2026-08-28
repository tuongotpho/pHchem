// Phiếu kết quả: vẽ điểm bài làm ra một tấm ảnh PNG để học sinh lưu lại.
//
// PHẦN TÍNH TÁCH KHỎI PHẦN VẼ. Mấy hàm tính ở trên chạy được trong phép kiểm
// tự động; riêng hàm vẽ cần thẻ <canvas> của trình duyệt nên không kiểm được
// bằng máy — nó chỉ xếp chữ, không quyết định con số nào.
//
// PHIẾU NÀY KHÔNG PHẢI KẾT QUẢ THI CÓ GIÁM SÁT. Học sinh tự bấm, tự lưu, và
// hoàn toàn có thể làm lại tới khi được điểm đẹp rồi mới lưu. Chính tấm ảnh
// phải ghi rõ điều đó — xem dòng chân phiếu trong vePhieu(). Không ghi thì
// sớm muộn cũng có người đem nó đi nộp như một bài kiểm tra thật.

export interface DuLieuPhieu {
  ten: string;
  /** Chuyên đề, hoặc "Đề do AI tự tạo". */
  nguon: string;
  dung: number;
  tong: number;
  maDe: number;
  giayLam: number;
  /** Bài bị nộp vì hết giờ chứ không phải học sinh làm xong. */
  hetGio?: boolean;
  luc: Date;
}

/**
 * Quy về thang 10 như cách chấm quen thuộc ở trường.
 *
 * Làm tròn hai chữ số thập phân chứ không phải một: đề 42 câu thì mỗi câu đáng
 * 0,238 điểm, làm tròn một chữ số là hai bài chênh nhau một câu vẫn ra cùng
 * điểm — học sinh nhìn vào tưởng máy chấm sai.
 */
export function tinhDiem(dung: number, tong: number): number {
  if (tong <= 0) return 0;
  return Math.round((dung / tong) * 1000) / 100;
}

/** Viết điểm theo lối Việt Nam: dấu phẩy thập phân, bỏ số 0 thừa ở đuôi. */
export function vietDiem(diem: number): string {
  return diem.toLocaleString('vi-VN', { maximumFractionDigits: 2 });
}

/** Đồng hồ đếm ngược và thời gian đã làm: "09:05", "1:02:30". */
export function dinhDangDongHo(giay: number): string {
  const g = Math.max(0, Math.floor(giay));
  const gio = Math.floor(g / 3600);
  const phut = Math.floor((g % 3600) / 60);
  const giayLe = g % 60;
  const hai = (n: number) => String(n).padStart(2, '0');
  return gio ? `${gio}:${hai(phut)}:${hai(giayLe)}` : `${hai(phut)}:${hai(giayLe)}`;
}

/**
 * Tên file khi lưu ảnh. Bỏ dấu tiếng Việt và mọi ký tự lạ.
 *
 * Không phải làm màu: tên file có dấu hoặc có dấu chấm hỏi thì Windows và
 * Android hay lưu ra tên vỡ, có máy còn từ chối lưu. Học sinh đặt tên kiểu
 * "Nguyễn Văn A (lớp 11A2)" là dính ngay.
 */
export function tenTepPhieu(du: DuLieuPhieu): string {
  const sach = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/[^A-Za-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40);
  const ngay = du.luc.toISOString().slice(0, 10);
  const ten = sach(du.ten) || 'hoc-sinh';
  return `pH-Chem_${ten}_${ngay}_made-${du.maDe}.png`;
}

// ---------- Phần vẽ ----------

// Khổ phiếu cố ý NHỎ. Bản đầu là 760×440 với con điểm cỡ 74 — nhìn như tấm
// bằng khen, mà đây chỉ là một lượt luyện tập. Nay 620×250: đủ đọc rõ khi dán
// vào tin nhắn, không chiếm hết màn hình, và không phô trương một con điểm mà
// chính tấm phiếu đã ghi là "không có giám sát".
const RONG = 620;
const CAO = 250;
/** Vẽ ở độ phân giải gấp đôi cho nét trên màn hình mật độ cao. */
const NHAN = 2;

const MAU = {
  nen: '#ffffff',
  vien: '#e2e8f0',
  chinh: '#0f172a',
  nhat: '#64748b',
  nhan: '#0d9488',
};

/**
 * Vẽ phiếu lên canvas. Trả về chính canvas đó để nơi gọi lấy ảnh ra.
 *
 * Nền TRẮNG dù app là giao diện tối: tấm này để gửi cho thầy cô, dán vào tin
 * nhắn, hoặc in ra. Nền đen in ra vừa tốn mực vừa khó đọc.
 */
export function vePhieu(cv: HTMLCanvasElement, du: DuLieuPhieu): HTMLCanvasElement {
  cv.width = RONG * NHAN;
  cv.height = CAO * NHAN;
  const g = cv.getContext('2d');
  if (!g) return cv;
  g.scale(NHAN, NHAN);

  g.fillStyle = MAU.nen;
  g.fillRect(0, 0, RONG, CAO);
  g.fillStyle = MAU.nhan;
  g.fillRect(0, 0, RONG, 5);
  g.strokeStyle = MAU.vien;
  g.lineWidth = 1;
  g.strokeRect(0.5, 0.5, RONG - 1, CAO - 1);

  /** Viết một dòng chữ. `can` chọn lề, mặc định căn trái. */
  const chu = (
    t: string,
    x: number,
    y: number,
    co: number,
    mau: string,
    dam = false,
    can: CanvasTextAlign = 'left',
  ) => {
    g.font = `${dam ? '700 ' : ''}${co}px "Segoe UI", system-ui, sans-serif`;
    g.fillStyle = mau;
    g.textAlign = can;
    g.fillText(t, x, y);
    g.textAlign = 'left'; // trả về mặc định để lời gọi sau khỏi thừa hưởng nhầm
  };

  const LE = 28;

  chu('PHIẾU KẾT QUẢ LUYỆN TẬP', LE, 34, 11, MAU.nhat, true);
  chu('pH-Chem', RONG - LE, 34, 13, MAU.nhan, true, 'right');

  // Tên và chuyên đề bên trái, điểm bên phải — xếp NGANG để phiếu thấp xuống.
  chu(du.ten || 'Chưa ghi tên', LE, 74, 22, MAU.chinh, true);
  chu(du.nguon, LE, 96, 12, MAU.nhat);

  // Căn phải nên không cần đo bề rộng: đuôi "/10" bám mép phải, con điểm lùi
  // vào đúng chỗ dành cho nó.
  const diem = vietDiem(tinhDiem(du.dung, du.tong));
  chu(diem, RONG - LE - 30, 84, 42, MAU.nhan, true, 'right');
  chu('/10', RONG - LE, 84, 15, MAU.nhat, true, 'right');
  chu(`Đúng ${du.dung}/${du.tong} câu`, RONG - LE, 104, 12, MAU.nhat, false, 'right');

  g.strokeStyle = MAU.vien;
  g.beginPath();
  g.moveTo(LE, 124);
  g.lineTo(RONG - LE, 124);
  g.stroke();

  // Ba ô thông tin
  const o = [
    ['Mã đề', String(du.maDe)],
    // Ghi rõ bài bị hết giờ ngay trên ảnh: đó là chuyện có thật của bài làm,
    // bỏ đi thì tấm phiếu trông như học sinh chủ động nộp sớm.
    ['Thời gian làm', dinhDangDongHo(du.giayLam) + (du.hetGio ? ' (hết giờ)' : '')],
    ['Lúc', du.luc.toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })],
  ];
  const rongO = (RONG - LE * 2) / 3;
  o.forEach(([nhan, giaTri], i) => {
    const x = LE + i * rongO;
    chu(nhan.toUpperCase(), x, 152, 10, MAU.nhat, true);
    chu(giaTri, x, 172, 14, MAU.chinh);
  });

  g.beginPath();
  g.moveTo(LE, 198);
  g.lineTo(RONG - LE, 198);
  g.stroke();
  chu(
    'Học sinh tự làm và tự lưu phiếu này, không có giám sát.',
    LE,
    220,
    11,
    MAU.nhat,
  );
  chu('Không dùng thay bài kiểm tra.', LE, 236, 11, MAU.nhat);

  return cv;
}
