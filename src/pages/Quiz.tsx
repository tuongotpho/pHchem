import { useState, useEffect } from 'react';
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

const CAC_LOAI = Object.keys(TEN_LOAI) as LoaiCau[];
const SO_CAU = [5, 10, 20];

// 0 = lấy hết số câu có trong chuyên đề đã chọn.
const SO_CAU_THAY = [10, 20, 40, 0];

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
  /** Đề của thầy không kèm lời giải — để trống thì màn làm bài không hiện mục đó. */
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
 * Bảng số liệu trong đề của thầy.
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
 * Ảnh minh họa trong đề của thầy — sơ đồ thí nghiệm, hình vẽ dụng cụ.
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

  // Đề của thầy
  const [danhMuc, setDanhMuc] = useState<MucDanhMuc[]>([]);
  const [chonChuyenDe, setChonChuyenDe] = useState<string[]>([]);
  const [soCauThay, setSoCauThay] = useState(20);
  /** Chuyên đề của lượt đang làm — null nghĩa là đang làm đề máy tự sinh. */
  const [dangLamThay, setDangLamThay] = useState<string | null>(null);
  const [dangTai, setDangTai] = useState(false);
  const [loiTaiDe, setLoiTaiDe] = useState(false);

  useEffect(() => {
    let con = true;
    layDanhMuc().then((d) => con && setDanhMuc(d));
    return () => {
      con = false;
    };
  }, []);

  const nhomChuyenDe = gomTheoChuyenDe(danhMuc);

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
   * Mở đề của thầy: gộp câu của các chuyên đề đang chọn, TRỘN, rồi lấy số câu.
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
              ? 'Đề máy tự sinh, và đề thật của giáo viên'
              : 'Machine-generated sets, and real teacher papers'
          }
        />
        <div className="p-4 md:p-6 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
            {/* ----- Cột trái: đề máy tự sinh ----- */}
            <section className="card p-4 space-y-4">
              <div>
                <h2 className="font-semibold text-slate-100">
                  {vi ? 'Đề máy tự sinh' : 'Machine-generated set'}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {vi
                    ? 'Mỗi lần bấm là một bộ câu khác, không bao giờ cạn. Đề dựng từ chính dữ liệu của app — dữ liệu đã qua bộ kiểm tự động nên đáp án không thể sai.'
                    : 'Every round is a fresh set, and it never runs out. Built from the app data, which passes the automated checks — so these answers cannot be wrong.'}
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
                {vi ? 'Bắt đầu' : 'Start'}
              </button>

              {khongRaDuocDe && (
                <p className="text-xs text-rose-700 dark:text-rose-300">
                  {vi
                    ? 'Chưa ra được câu nào với dạng bài đang chọn. Thử chọn thêm dạng khác.'
                    : 'No questions could be built from the selected topics. Try adding more.'}
                </p>
              )}
            </section>

            {/* ----- Cột phải: đề của thầy ----- */}
            <section className="card p-4 space-y-4">
              <div>
                <h2 className="font-semibold text-slate-100">
                  {vi ? 'Đề của thầy' : "Teacher's papers"}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {vi
                    ? 'Câu hỏi lấy từ đề thật của giáo viên, mỗi lượt xáo một thứ tự khác. Đáp án là đáp án thầy đánh dấu. Máy chỉ kiểm được hình thức — đủ bốn lựa chọn, có đúng một đáp án — chứ không kiểm được nội dung như phần đề tự sinh.'
                    : 'Questions come from real teacher papers, reshuffled every round. The answer key is the teacher’s own. The app only checks the shape — four options, exactly one answer — not the chemistry, unlike the generated sets.'}
                </p>
              </div>

              {nhomChuyenDe.length === 0 ? (
                <p className="text-xs text-slate-500">
                  {vi
                    ? 'Chưa có chuyên đề nào. Đề của thầy tải về khi có mạng, lần sau mở lại vẫn dùng được.'
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

                  <button
                    onClick={() => moDeThay()}
                    disabled={dangTai}
                    className="btn-accent w-full py-2.5 disabled:opacity-50"
                  >
                    {dangTai ? (vi ? 'Đang tải…' : 'Loading…') : vi ? 'Bắt đầu' : 'Start'}
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
          </div>
        </div>
      </>
    );
  }

  // ---------- Màn kết quả ----------
  if (viTri >= de.length) {
    const dung = traLoi.filter(Boolean).length;
    const tiLe = Math.round((dung / de.length) * 100);
    const sai = de.map((c, i) => ({ c, i })).filter(({ i }) => !traLoi[i]);
    return (
      <>
        <PageHeader
          title={vi ? 'Kết quả' : 'Result'}
          subtitle={dangLamThay ?? (vi ? 'Đề máy tự sinh' : 'Machine-generated set')}
        />
        <div className="p-4 md:p-6 space-y-4">
          <section className="card p-6 text-center">
            <div className="text-5xl font-bold font-mono text-accent">
              {dung}/{de.length}
            </div>
            <div className="text-sm text-slate-400 mt-1">
              {vi ? `Đúng ${tiLe}%` : `${tiLe}% correct`}
            </div>
            {/* Mã đề chỉ có nghĩa với đề máy sinh: cùng mã thì ra đúng bộ câu
                ấy. Đề của thầy là bộ cố định nên không có mã. */}
            {/* Mã đề có nghĩa với CẢ HAI nguồn: cùng mã thì trộn ra cùng bộ
                câu, cùng thứ tự. Thầy đọc một con số là cả lớp làm chung đề. */}
            <div className="text-[11px] text-slate-600 mt-3 font-mono">
              {vi ? 'Mã đề' : 'Set code'} {hat}
            </div>
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
                    <ChuHoaHoc t={c.de} className="block text-slate-300" />
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
        {/* Thanh tiến độ */}
        <div className="h-1 rounded-full bg-base-800 overflow-hidden">
          <div
            className="h-full bg-accent transition-all"
            style={{ width: `${(viTri / de.length) * 100}%` }}
          />
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
