import { useState, useEffect, useRef } from 'react';
import FormulaText, { EquationText } from '../components/FormulaText';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ChuHoaHoc from '../components/ChuHoaHoc';
import { useLang } from '../i18n/LangContext';
import { sinhDe, TEN_LOAI, type CauHoi, type LoaiCau } from '../lib/quiz';
import {
  layDanhMuc,
  layBoDe,
  anhCua,
  catTheoMoc,
  gomTheoChuyenDe,
  MOC_HINH,
  MOC_BANG,
  type MucDanhMuc,
  type BoDe,
  type BangSoLieu,
} from '../lib/deThay';
import { taoRng, tron, hatMoi } from '../lib/ngauNhien';
import { vePhieu, tenTepPhieu, dinhDangDongHo } from '../lib/phieuKetQua';
import { doc, ghi } from '../lib/boNho';

const CAC_LOAI = Object.keys(TEN_LOAI) as LoaiCau[];
const SO_CAU = [5, 10, 20];

// 0 = lấy hết số câu có trong chuyên đề đã chọn.
const SO_CAU_THAY = [10, 20, 40, 0];

/**
 * Thời gian làm bài tính theo SỐ CÂU, không khai một con số cố định: chọn 10
 * câu thì 5 phút, 40 câu thì 20 phút. Ba mươi giây một câu là nhịp quen thuộc
 * của đề trắc nghiệm phổ thông.
 */
const GIAY_MOI_CAU = 30;

/** Nhớ tên học sinh giữa các lượt làm, khỏi phải gõ lại mỗi lần. */
const KHOA_TEN = 'chemipro.tenHocSinh';

// Đọc đồng hồ máy. Để NGOÀI thân component vì bộ soi mã coi mọi lời gọi
// Date.now bên trong là đáng ngờ — sợ gọi lúc dựng giao diện thì mỗi lượt vẽ
// ra một giá trị khác. Ở đây nó chỉ chạy khi người dùng bấm bắt đầu.
const gioMay = () => Date.now();

/**
 * Một câu đang làm, đã gộp về CÙNG MỘT KIỂU dù đến từ nguồn nào.
 *
 * Trang này có hai nguồn đề khác hẳn nhau — máy tự sinh từ dữ liệu app, và đề
 * thật của giáo viên. Gộp về một kiểu ở đây để màn LÀM BÀI chỉ có một bản, thay
 * vì viết hai màn gần giống nhau rồi sửa một bên quên bên kia.
 */
interface CauChoi {
  de: string;
  phu?: string;
  kieuPhu?: 'phuongTrinh' | 'congThuc' | 'chu';
  luaChon: string[];
  dapAn: number;
  /** Ngân hàng đề không kèm lời giải — để trống thì màn làm bài không hiện mục đó. */
  giaiThich?: string;
  hoc?: string;
  /** Nhãn hiện ở đầu trang: tên dạng bài, hoặc tên bộ đề kèm số câu gốc. */
  nhan: string;
  hinh?: string;
  bang?: BangSoLieu;
  dapAnSuyRa?: boolean;
}

const tuMayRa = (c: CauHoi, vi: boolean): CauChoi => ({
  de: c.de,
  phu: c.phu,
  kieuPhu: c.kieuPhu,
  luaChon: c.luaChon,
  dapAn: c.dapAn,
  giaiThich: c.giaiThich,
  hoc: c.hoc,
  nhan: vi ? TEN_LOAI[c.loai].vi : TEN_LOAI[c.loai].en,
});

const tuThayRa = (bo: BoDe): CauChoi[] =>
  bo.cau.map((c) => ({
    de: c.de,
    luaChon: c.luaChon,
    dapAn: c.dapAn,
    hinh: c.hinh,
    bang: c.bang,
    dapAnSuyRa: c.dapAnSuyRa,
    // Giữ SỐ CÂU GỐC trong bản in của thầy. Trộn xong thì câu 30 có thể ra ở
    // lượt thứ 3, nhưng nhãn vẫn ghi 30 — để học sinh và thầy đối chiếu lại
    // với tờ đề giấy được.
    nhan: `${bo.chuyenDe} · câu ${c.so}`,
  }));

/**
 * Vẽ dòng phụ của câu hỏi cho đúng kiểu.
 *
 * Kiểu do chính câu hỏi khai (xem lib/quiz.ts), không đoán theo loại câu —
 * dòng phụ "Fe · Z = 26" mà hạ chỉ số thì thành "Z = ₂₆".
 */
function DongPhu({ c, className }: { c: CauChoi; className?: string }) {
  if (!c.phu) return null;
  if (c.kieuPhu === 'phuongTrinh') return <EquationText eq={c.phu} className={className} />;
  if (c.kieuPhu === 'congThuc') return <FormulaText value={c.phu} className={className} />;
  return <span className={className}>{c.phu}</span>;
}

/**
 * Bảng số liệu trong ngân hàng đề.
 *
 * Trong file Word gốc đây là ẢNH CHỤP một cái bảng. Gõ lại thành bảng thật thì
 * nét trên mọi màn hình, đổi màu theo giao diện sáng/tối, đọc được trên điện
 * thoại hẹp, và trình đọc màn hình đọc được — ảnh không được thứ nào.
 */
function BangDe({ bang }: { bang: BangSoLieu }) {
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="text-sm border-collapse">
        <thead>
          <tr>
            {bang.cot.map((t, i) => (
              <th
                key={i}
                className="border border-base-700 px-3 py-1.5 text-left font-semibold text-slate-200"
              >
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bang.dong.map((d, i) => (
            <tr key={i}>
              {d.map((t, j) => (
                <td key={j} className="border border-base-700 px-3 py-1.5 text-slate-300">
                  {t}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Ảnh minh họa trong ngân hàng đề — sơ đồ thí nghiệm, hình vẽ dụng cụ.
 *
 * ĐẶT TRÊN NỀN TRẮNG, cả ở giao diện tối. Ảnh gốc là nét đen trên nền trắng,
 * thả thẳng lên nền đen thì thành một mảng chói. Đảo màu tự động thì hình xám
 * xịt, chữ viền lem. Để nguyên trên một mẩu nền trắng bo góc trông như mẩu giấy
 * đề nằm trong app — đúng kiểu sách giáo khoa, và không phải bịa màu.
 */
function AnhDe({ ten }: { ten: string }) {
  return (
    <div className="mt-3 inline-block max-w-full rounded-lg bg-white p-2">
      <img src={anhCua(ten)} alt="" loading="lazy" className="max-w-full h-auto" />
    </div>
  );
}

export default function Quiz() {
  const { lang } = useLang();
  const vi = lang === 'vi';

  const [chonLoai, setChonLoai] = useState<LoaiCau[]>([]);
  const [soCau, setSoCau] = useState(10);
  const [de, setDe] = useState<CauChoi[] | null>(null);
  const [hat, setHat] = useState(0);
  const [viTri, setViTri] = useState(0);
  const [daChon, setDaChon] = useState<number | null>(null);
  const [traLoi, setTraLoi] = useState<boolean[]>([]);
  // Bộ sinh đề có thể trả ít câu hơn số xin, thậm chí không câu nào — dạng
  // bài chọn quá hẹp, hoặc dữ liệu nguồn đổi. Vào thẳng màn làm bài với đề
  // rỗng thì màn kết quả chia cho 0 và hiện "0/0 · Đúng NaN%".
  const [khongRaDuocDe, setKhongRaDuocDe] = useState(false);

  // Ngân hàng đề
  const [danhMuc, setDanhMuc] = useState<MucDanhMuc[]>([]);
  const [chonChuyenDe, setChonChuyenDe] = useState<string[]>([]);
  const [soCauThay, setSoCauThay] = useState(20);
  /** Chuyên đề của lượt đang làm — null nghĩa là đang làm đề do AI tự tạo. */
  const [dangLamThay, setDangLamThay] = useState<string | null>(null);
  const [dangTai, setDangTai] = useState(false);
  const [loiTaiDe, setLoiTaiDe] = useState(false);

  // Tên học sinh + đồng hồ + phiếu kết quả
  const [tenHS, setTenHS] = useState(() => doc(KHOA_TEN) ?? '');
  const [tongGiay, setTongGiay] = useState(0);
  const [conLai, setConLai] = useState(0);
  /** Mốc bắt đầu lượt làm, dùng để tính ra giờ nộp mà không phải đóng băng gì. */
  const [batDauLuc, setBatDauLuc] = useState(0);
  const khungPhieu = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let con = true;
    layDanhMuc().then((d) => con && setDanhMuc(d));
    return () => {
      con = false;
    };
  }, []);

  // Nộp bài khi làm hết câu HOẶC hết giờ. Suy ra từ trạng thái sẵn có chứ
  // không đặt thêm cờ trong hiệu ứng đếm giờ: đặt cờ ở đó thì mỗi nhịp đồng hồ
  // lại kéo theo một lượt vẽ nữa, và dễ thành vòng lặp không dứt.
  const daNop = de !== null && (viTri >= de.length || conLai <= 0);
  const dangLamBai = de !== null && !daNop;
  const soDung = traLoi.filter(Boolean).length;

  // Đồng hồ chạy lùi. Chỉ chạy khi ĐANG làm bài — vào màn kết quả là dừng,
  // nếu không thì thời gian ghi vào phiếu cứ trôi tiếp trong lúc học sinh ngồi
  // xem lại câu sai.
  useEffect(() => {
    if (!dangLamBai) return;
    const dem = setInterval(() => setConLai((x) => x - 1), 1000);
    return () => clearInterval(dem);
  }, [dangLamBai]);

  const giayLam = Math.min(tongGiay, Math.max(0, tongGiay - conLai));
  const hetGio = daNop && conLai <= 0;
  /**
   * Giờ nộp bài TÍNH RA từ giờ bắt đầu cộng thời gian đã làm, không gọi
   * new Date() lúc vẽ.
   *
   * Gọi lúc vẽ thì mỗi lần React vẽ lại là một mốc mới: phiếu nhấp nháy đổi
   * giờ, và hiệu ứng vẽ phiếu chạy mãi vì phụ thuộc của nó đổi liên tục.
   */
  const lucNop = new Date(batDauLuc + giayLam * 1000);
  const nguonPhieu = dangLamThay ?? (vi ? 'Đề do AI tự tạo' : 'AI-generated set');

  // Vẽ phiếu mỗi khi có gì đổi — kể cả khi học sinh sửa tên ở lượt sau. Hiệu
  // ứng phải nằm ở đây, cấp cao nhất của component: React không cho gọi hook
  // bên trong nhánh điều kiện của màn kết quả.
  useEffect(() => {
    const cv = khungPhieu.current;
    if (!cv || !de || !daNop) return;
    vePhieu(cv, {
      ten: tenHS.trim(),
      nguon: nguonPhieu,
      dung: soDung,
      tong: de.length,
      maDe: hat,
      giayLam,
      hetGio,
      // Dựng mốc giờ ngay trong đây từ hai con số ổn định, thay vì lấy biến
      // dẫn xuất ở ngoài: đối tượng Date sinh mới mỗi lượt vẽ, khai nó làm phụ
      // thuộc thì hiệu ứng chạy lại sau từng lượt vẽ dù chẳng có gì đổi.
      luc: new Date(batDauLuc + giayLam * 1000),
    });
  }, [daNop, batDauLuc, tenHS, nguonPhieu, soDung, de, hat, giayLam, hetGio]);

  const nhomChuyenDe = gomTheoChuyenDe(danhMuc);

  // Tổng số câu của các chuyên đề đang chọn — để ước thời gian cho nút "Tất cả".
  const soCauToiDa = nhomChuyenDe
    .filter((n) => !chonChuyenDe.length || chonChuyenDe.includes(n.ten))
    .reduce((t, n) => t + n.soCau, 0);

  const batDau = () => {
    const h = hatMoi();
    const bo = sinhDe(h, soCau, lang, chonLoai);
    if (!bo.length) {
      setKhongRaDuocDe(true);
      return;
    }
    setKhongRaDuocDe(false);
    setHat(h);
    setDangLamThay(null);
    datDe(bo.map((c) => tuMayRa(c, vi)));
  };

  /**
   * Mở ngân hàng đề: gộp câu của các chuyên đề đang chọn, TRỘN, rồi lấy số câu.
   *
   * Trộn bằng bộ ngẫu nhiên CÓ HẠT GIỐNG, không phải Math.random rải rác: cùng
   * một hạt luôn trộn ra cùng thứ tự (có phép kiểm ở lib/ngauNhien.test.ts).
   * Mã đề hiện ở màn kết quả chính là hạt đó.
   *
   * CHƯA CÓ chỗ nhập mã đề vào — tham số `hatCho` để sẵn cho việc ấy nhưng
   * hiện chưa nơi nào truyền. Nên mã đề lúc này chỉ dùng để đối chiếu, chưa
   * dùng để cả lớp làm chung một đề được. Đừng hứa với người dùng điều đó cho
   * tới khi có ô nhập.
   *
   * CHỈ TRỘN THỨ TỰ CÂU, KHÔNG TRỘN BỐN LỰA CHỌN. Trộn lựa chọn thì đáp án
   * lệch khỏi bản in của thầy, và câu nào có lựa chọn kiểu "Cả A và B đều
   * đúng" sẽ sai hẳn nghĩa. Đề Nitrogen chưa có câu nào như vậy, nhưng đề sau
   * thì không ai bảo đảm.
   */
  const moDeThay = async (hatCho?: number) => {
    const chon = chonChuyenDe.length ? chonChuyenDe : nhomChuyenDe.map((n) => n.ten);
    const canLay = nhomChuyenDe.filter((n) => chon.includes(n.ten)).flatMap((n) => n.muc);
    if (!canLay.length) return;

    setDangTai(true);
    setLoiTaiDe(false);
    const boDe = (await Promise.all(canLay.map((m) => layBoDe(m.id)))).filter(
      (b): b is BoDe => b !== null,
    );
    setDangTai(false);
    if (!boDe.length) {
      setLoiTaiDe(true);
      return;
    }

    const h = hatCho ?? hatMoi();
    const kho = boDe.flatMap(tuThayRa);
    const soLay = soCauThay === 0 ? kho.length : Math.min(soCauThay, kho.length);
    setHat(h);
    setDangLamThay(chon.join(' · '));
    datDe(tron(taoRng(h), kho).slice(0, soLay));
  };

  const datDe = (bo: CauChoi[]) => {
    setDe(bo);
    setViTri(0);
    setDaChon(null);
    setTraLoi([]);
    setTongGiay(bo.length * GIAY_MOI_CAU);
    setConLai(bo.length * GIAY_MOI_CAU);
    setBatDauLuc(gioMay());
  };

  const doiTen = (t: string) => {
    setTenHS(t);
    ghi(KHOA_TEN, t);
  };

  /**
   * Lưu phiếu kết quả thành file ảnh.
   *
   * Dùng thẻ <a download> với dữ liệu ảnh nhúng thẳng trong địa chỉ, không gọi
   * ra máy chủ nào — app chạy ngoại tuyến vẫn lưu được, và tên học sinh không
   * rời khỏi máy.
   */
  const luuPhieu = (du: Parameters<typeof tenTepPhieu>[0]) => {
    const cv = khungPhieu.current;
    if (!cv) return;
    const a = document.createElement('a');
    a.href = cv.toDataURL('image/png');
    a.download = tenTepPhieu(du);
    a.click();
  };

  // Làm lại thì XÁO BỘ KHÁC, không lặp lại đúng bộ vừa làm — mục đích là ôn
  // tập chứ không phải học thuộc thứ tự câu.
  const lamLai = () => (dangLamThay ? moDeThay() : batDau());

  const doiLoai = (l: LoaiCau) => {
    setKhongRaDuocDe(false); // đổi lựa chọn thì lời nhắc cũ hết nghĩa
    setChonLoai((cu) => (cu.includes(l) ? cu.filter((x) => x !== l) : [...cu, l]));
  };

  const doiChuyenDe = (t: string) => {
    setLoiTaiDe(false);
    setChonChuyenDe((cu) => (cu.includes(t) ? cu.filter((x) => x !== t) : [...cu, t]));
  };

  const veManChon = () => {
    setDe(null);
    setDangLamThay(null);
  };

  // ---------- Màn chọn ----------
  if (!de) {
    return (
      <>
        <PageHeader
          title={vi ? 'Luyện tập' : 'Practice'}
          subtitle={
            vi
              ? 'Ngân hàng đề của giáo viên, và đề do AI tự tạo'
              : 'The teacher question bank, and AI-generated sets'
          }
        />
        <div className="p-4 md:p-6 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
            {/* ----- Cột TRÁI: ngân hàng đề của giáo viên -----
                Đứng trước vì đây mới là đề thật, sát chương trình. Đề AI tự
                tạo là phần ôn thêm khi đã làm hết ngân hàng. ----- */}
            <section className="card p-4 space-y-4">
              {/* Tiêu đề nằm trên nền màu, căn giữa — hai cột nhìn ra ngay là
                  hai nguồn đề khác nhau chứ không phải một danh sách dài.
                  Chỉ giữ MỘT dòng mô tả: câu nói thật về mức tin cậy (máy chỉ
                  kiểm được hình thức, không kiểm được nội dung) đã chuyển sang
                  trang Cài đặt, mục "Hai nguồn đề, hai mức tin cậy" — vẫn còn
                  nguyên, chỉ là không chắn đường vào bài. */}
              <div className="rounded-lg bg-accent/10 px-4 py-3 text-center">
                <h2 className="font-semibold text-accent">
                  {vi ? 'Ngân hàng đề' : 'Question bank'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {vi
                    ? 'Đề thật của giáo viên · xáo thứ tự mỗi lượt'
                    : 'Real teacher papers · reshuffled each round'}
                </p>
              </div>

              {nhomChuyenDe.length === 0 ? (
                <p className="text-xs text-slate-500">
                  {vi
                    ? 'Chưa có chuyên đề nào. Ngân hàng đề tải về khi có mạng, lần sau mở lại vẫn dùng được.'
                    : 'No topics yet. Papers download when online, and stay available afterwards.'}
                </p>
              ) : (
                <>
                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      {vi
                        ? 'Chọn chuyên đề — để trống là lấy tất cả'
                        : 'Pick topics — none means all'}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {nhomChuyenDe.map((n) => (
                        <button
                          key={n.ten}
                          onClick={() => doiChuyenDe(n.ten)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition text-left ${
                            chonChuyenDe.includes(n.ten)
                              ? 'bg-accent/15 border-accent/40 text-accent'
                              : 'border-base-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {n.ten}
                          <span className="text-slate-500 ml-1.5">{n.soCau}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      {vi ? 'Số câu' : 'How many'}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {SO_CAU_THAY.map((n) => (
                        <button
                          key={n}
                          onClick={() => setSoCauThay(n)}
                          className={`text-xs px-4 py-1.5 rounded-lg border transition ${
                            soCauThay === n
                              ? 'bg-accent/15 border-accent/40 text-accent'
                              : 'border-base-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {/* 0 nghĩa là lấy hết — để người dùng vẫn làm được trọn
                              bộ đề như bản in của thầy khi cần. */}
                          {n === 0 ? (vi ? 'Tất cả' : 'All') : n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ô tên đặt SAU phần chọn chuyên đề và số câu, ngay trước
                      nút bắt đầu — đúng thứ tự một buổi làm bài: chọn đề xong
                      mới ghi tên rồi vào làm. Tên chỉ nằm trong máy học sinh. */}
                  <label className="block">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {vi ? 'Họ tên học sinh' : 'Student name'}
                    </span>
                    <input
                      value={tenHS}
                      onChange={(e) => doiTen(e.target.value)}
                      maxLength={60}
                      placeholder={vi ? 'Nguyễn Văn A' : 'Your name'}
                      className="mt-1.5 w-full bg-base-900 border border-base-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-accent/60 focus:outline-none"
                    />
                    <span className="block text-xs text-slate-500 mt-1.5">
                      {vi
                        ? 'Ghi vào phiếu kết quả. Tên chỉ nằm trong máy bạn, ứng dụng không gửi đi đâu.'
                        : 'Printed on the result slip. It stays on your device — nothing is sent anywhere.'}
                    </span>
                  </label>

                  <button
                    onClick={() => moDeThay()}
                    disabled={dangTai}
                    className="btn-accent w-full py-2.5 disabled:opacity-50"
                  >
                    {dangTai
                      ? vi
                        ? 'Đang tải…'
                        : 'Loading…'
                      : `${vi ? 'Bắt đầu' : 'Start'} · ${dinhDangDongHo(
                          (soCauThay || soCauToiDa) * GIAY_MOI_CAU,
                        )}`}
                  </button>
                </>
              )}

              {loiTaiDe && (
                <p className="text-xs text-rose-700 dark:text-rose-300">
                  {vi
                    ? 'Không tải được bộ đề. Kiểm tra mạng rồi thử lại.'
                    : 'Could not load that paper. Check your connection and try again.'}
                </p>
              )}
            </section>
            {/* ----- Cột PHẢI: đề do AI tự tạo ----- */}
            <section className="card p-4 space-y-4">
              <div className="rounded-lg bg-accent/10 px-4 py-3 text-center">
                <h2 className="font-semibold text-accent">
                  {vi ? 'Đề do AI tự tạo' : 'AI-generated set'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {vi
                    ? 'Dựng từ dữ liệu của app · không bao giờ cạn'
                    : 'Built from the app data · never runs out'}
                </p>
              </div>

              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  {vi ? 'Chọn dạng bài — để trống là lấy tất cả' : 'Pick topics — none means all'}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {CAC_LOAI.map((l) => (
                    <button
                      key={l}
                      onClick={() => doiLoai(l)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                        chonLoai.includes(l)
                          ? 'bg-accent/15 border-accent/40 text-accent'
                          : 'border-base-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {vi ? TEN_LOAI[l].vi : TEN_LOAI[l].en}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  {vi ? 'Số câu' : 'How many'}
                </h3>
                <div className="flex gap-1.5">
                  {SO_CAU.map((n) => (
                    <button
                      key={n}
                      onClick={() => setSoCau(n)}
                      className={`text-xs px-4 py-1.5 rounded-lg border transition ${
                        soCau === n
                          ? 'bg-accent/15 border-accent/40 text-accent'
                          : 'border-base-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={batDau} className="btn-accent w-full py-2.5">
                {vi ? 'Bắt đầu' : 'Start'} · {dinhDangDongHo(soCau * GIAY_MOI_CAU)}
              </button>

              {khongRaDuocDe && (
                <p className="text-xs text-rose-700 dark:text-rose-300">
                  {vi
                    ? 'Chưa ra được câu nào với dạng bài đang chọn. Thử chọn thêm dạng khác.'
                    : 'No questions could be built from the selected topics. Try adding more.'}
                </p>
              )}
            </section>

          </div>
        </div>
      </>
    );
  }

  // ---------- Màn kết quả ----------
  if (daNop) {
    const sai = de.map((c, i) => ({ c, i })).filter(({ i }) => !traLoi[i]);
    const duLieuPhieu = {
      ten: tenHS.trim(),
      nguon: nguonPhieu,
      dung: soDung,
      tong: de.length,
      maDe: hat,
      giayLam,
      hetGio,
      luc: lucNop,
    };
    return (
      <>
        <PageHeader
          title={vi ? 'Kết quả' : 'Result'}
          subtitle={dangLamThay ?? (vi ? 'Đề do AI tự tạo' : 'AI-generated set')}
        />
        <div className="p-4 md:p-6 space-y-4">
          {/* ----- Phiếu kết quả để lưu thành ảnh -----
              Đặt GIỮA trang và bó hẹp bề ngang. Đây là kết quả một lượt luyện
              tập, không phải bằng khen: trải hết bề ngang màn hình thì vừa
              chiếm chỗ của phần ôn lại câu sai — thứ đáng xem hơn — vừa phô
              trương một con điểm mà chính tấm phiếu đã ghi là không có giám sát.
              Canvas hiện luôn để học sinh thấy trước tấm ảnh sẽ lưu ra. */}
          <section className="flex flex-col items-center gap-3">
            <canvas
              ref={khungPhieu}
              className="w-full max-w-md h-auto rounded-lg border border-base-800"
            />
            <button onClick={() => luuPhieu(duLieuPhieu)} className="btn-accent px-5 py-2">
              {vi ? 'Lưu ảnh' : 'Save image'}
            </button>
            {!tenHS.trim() && (
              <p className="text-xs text-amber-600 dark:text-amber-300">
                {vi
                  ? 'Chưa ghi tên — phiếu để trống chỗ tên.'
                  : 'No name yet — the slip leaves that blank.'}
              </p>
            )}
          </section>

          {/* Chỉ liệt kê câu sai — đó mới là chỗ cần xem lại */}
          {sai.length > 0 && (
            <section className="card p-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
                {vi ? `Câu làm sai (${sai.length})` : `Missed (${sai.length})`}
              </h3>
              <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {sai.map(({ c, i }) => (
                  <li key={i} className="text-xs border border-base-800 rounded-lg p-3">
                    {/* Bỏ mốc ảnh/bảng ở danh sách ôn lại: chỗ này chỉ nhắc
                        học sinh câu nào sai, không vẽ lại hình. Không bỏ thì
                        chữ "{{hinh}}" hiện thô ra giữa câu. */}
                    <ChuHoaHoc
                      t={catTheoMoc(c.de)
                        .filter((k) => k !== MOC_HINH && k !== MOC_BANG)
                        .join('')
                        .trim()}
                      className="block text-slate-300"
                    />
                    {c.phu && (
                      <div className="font-mono text-slate-400 mt-0.5">
                        <DongPhu c={c} />
                      </div>
                    )}
                    <div className="text-emerald-600 dark:text-emerald-300 mt-1">
                      {vi ? 'Đáp án: ' : 'Answer: '}
                      <ChuHoaHoc t={c.luaChon[c.dapAn]} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex flex-wrap gap-2">
            <button onClick={lamLai} className="btn-accent flex-1 min-w-40 py-2.5">
              {vi ? 'Làm bộ khác' : 'Another set'}
            </button>
            <button onClick={veManChon} className="btn-ghost flex-1 min-w-40 py-2.5">
              {vi ? 'Chọn đề khác' : 'Pick another'}
            </button>
          </div>
        </div>
      </>
    );
  }

  // ---------- Màn làm bài ----------
  const c = de[viTri];
  const daTraLoi = daChon !== null;

  const chonDapAn = (i: number) => {
    if (daTraLoi) return;
    setDaChon(i);
    setTraLoi((cu) => {
      const m = [...cu];
      m[viTri] = i === c.dapAn;
      return m;
    });
  };

  return (
    <>
      <PageHeader
        title={vi ? 'Luyện tập' : 'Practice'}
        subtitle={`${viTri + 1}/${de.length} · ${c.nhan}`}
      />
      <div className="p-4 md:p-6 space-y-4">
        {/* Thanh tiến độ + đồng hồ đếm ngược */}
        <div className="flex items-center gap-3">
          <div className="h-1 flex-1 rounded-full bg-base-800 overflow-hidden">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${(viTri / de.length) * 100}%` }}
            />
          </div>
          {/* Dưới một phút thì đổi màu — cảnh báo bằng màu chứ không bằng chữ,
              để không chiếm chỗ và không làm học sinh giật mình giữa câu. */}
          <span
            className={`font-mono text-sm tabular-nums ${
              conLai <= 60 ? 'text-rose-600 dark:text-rose-300' : 'text-slate-400'
            }`}
          >
            {dinhDangDongHo(conLai)}
          </span>
        </div>

        <section className="card p-4">
          {/* Đề bài cắt theo MỐC: ảnh và bảng hiện đúng chỗ thầy đặt trong bản
              Word, không bị dồn xuống cuối. Câu 22 là "…cho trong bảng sau:" →
              bảng → "Tính giá trị…" — dồn xuống cuối là đọc ngược. */}
          {catTheoMoc(c.de).map((khuc, i) => {
            if (khuc === MOC_BANG) return c.bang ? <BangDe key={i} bang={c.bang} /> : null;
            if (khuc === MOC_HINH) return c.hinh ? <AnhDe key={i} ten={c.hinh} /> : null;
            return (
              <ChuHoaHoc
                key={i}
                t={khuc}
                className="block text-sm text-slate-200 whitespace-pre-line"
              />
            );
          })}
          {c.phu && (
            <div className="font-mono text-lg text-accent mt-2 break-words">
              <DongPhu c={c} />
            </div>
          )}
        </section>

        {/* Hai cột từ màn vừa trở lên — giống cách đề in trên giấy xếp lựa
            chọn thành hai cột, và đỡ phải kéo dài trang trên màn rộng. */}
        <div className="grid gap-2 md:grid-cols-2">
          {c.luaChon.map((x, i) => {
            const laDung = i === c.dapAn;
            const laChonCuaToi = i === daChon;
            let cls = 'border-base-700 hover:border-accent/40';
            if (daTraLoi && laDung) cls = 'border-emerald-500/60 bg-emerald-500/10';
            else if (daTraLoi && laChonCuaToi) cls = 'border-rose-500/60 bg-rose-500/10';
            else if (daTraLoi) cls = 'border-base-800 opacity-60';
            return (
              <button
                key={i}
                onClick={() => chonDapAn(i)}
                disabled={daTraLoi}
                className={`w-full text-left border rounded-xl px-3.5 py-2.5 text-sm transition ${cls}`}
              >
                <span className="font-mono text-slate-500 mr-2">
                  {String.fromCharCode(65 + i)}.
                </span>
                <ChuHoaHoc t={x} className="text-slate-200" />
                {daTraLoi && laDung && <span className="float-right">✓</span>}
                {daTraLoi && laChonCuaToi && !laDung && <span className="float-right">✕</span>}
              </button>
            );
          })}
        </div>

        {daTraLoi && (
          <section className="card p-4">
            <div
              className={`text-sm font-semibold ${
                traLoi[viTri]
                  ? 'text-emerald-600 dark:text-emerald-300'
                  : 'text-rose-600 dark:text-rose-300'
              }`}
            >
              {traLoi[viTri] ? (vi ? 'Đúng rồi' : 'Correct') : vi ? 'Chưa đúng' : 'Not quite'}
            </div>

            {c.giaiThich && <p className="text-xs text-slate-400 mt-1">{c.giaiThich}</p>}

            {/* Nói thẳng chỗ chưa chắc. Bản gốc của thầy không đánh dấu đáp án
                câu này, đáp án đang hiện là do người đọc suy ra — học sinh có
                quyền biết để còn hỏi lại, thay vì học thuộc một thứ chưa chốt. */}
            {c.dapAnSuyRa && (
              <p className="text-xs text-amber-600 dark:text-amber-300 mt-2">
                {vi
                  ? 'Đề gốc không ghi đáp án cho câu này. Đáp án ở đây là suy ra từ lí thuyết, hãy hỏi lại thầy cô cho chắc.'
                  : 'The original paper marks no answer here. This one was inferred — please confirm with your teacher.'}
              </p>
            )}

            {c.hoc && (
              <Link to={c.hoc} className="text-xs text-accent hover:underline mt-2 inline-block">
                {vi ? 'Mở phần liên quan để học thêm →' : 'Open the related entry →'}
              </Link>
            )}

            <button
              onClick={() => {
                setViTri(viTri + 1);
                setDaChon(null);
              }}
              className="btn-accent w-full mt-3 py-2.5"
            >
              {viTri + 1 < de.length
                ? vi
                  ? 'Câu tiếp'
                  : 'Next'
                : vi
                  ? 'Xem kết quả'
                  : 'See result'}
            </button>
          </section>
        )}

        <button onClick={veManChon} className="btn-ghost w-full text-xs">
          {vi ? 'Thoát, chọn đề khác' : 'Quit and pick another'}
        </button>
      </div>
    </>
  );
}
