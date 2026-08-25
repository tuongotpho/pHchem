import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { ELEMENTS } from '../data/elements';
import { FORMULAS } from '../data/formulas';
import { TERMS } from '../data/dictionary';
import { FACTS } from '../data/facts';
import { REACTIONS } from '../data/reactions';
import { CATIONS, ANIONS } from '../data/solubility';
import { STRUCTURE_COUNT } from '../generated/structures';
import TaiHinhNgoaiTuyen from '../components/TaiHinhNgoaiTuyen';

const VERSION = '1.1';

// Năm bản quyền lấy theo đồng hồ máy chứ không gõ cứng — gõ cứng thì sang năm
// là lạc hậu mà chẳng ai để ý.
const NAM = new Date().getFullYear();

export default function Settings() {
  const { t, lang } = useLang();
  const vi = lang === 'vi';

  // Số liệu ĐẾM TỪ DỮ LIỆU, không gõ tay — thêm bớt nội dung là tự cập nhật.
  const soLieu: { nhan: string; so: string }[] = [
    { nhan: vi ? 'Nguyên tố' : 'Elements', so: String(ELEMENTS.length) },
    { nhan: vi ? 'Công thức' : 'Formulas', so: String(FORMULAS.length) },
    { nhan: vi ? 'Hình cấu tạo' : 'Structures', so: String(STRUCTURE_COUNT) },
    { nhan: vi ? 'Phản ứng' : 'Reactions', so: String(REACTIONS.length) },
    { nhan: vi ? 'Thuật ngữ' : 'Terms', so: String(TERMS.length) },
    { nhan: vi ? 'Thực tiễn' : 'Facts', so: String(FACTS.length) },
    {
      nhan: vi ? 'Ô bảng độ tan' : 'Solubility cells',
      so: String(CATIONS.length * ANIONS.length),
    },
  ];

  const nguyenTac: { tieuDe: string; noiDung: string }[] = vi
    ? [
        {
          tieuDe: 'Chạy offline sau khi cài',
          noiDung:
            'Số liệu — nguyên tố, công thức, phản ứng, thuật ngữ, mẩu thực tiễn — nằm sẵn trong ứng dụng, mất mạng vẫn tra và tính bình thường. Riêng hình cấu tạo tải khi bạn mở xem, để lần cài đầu khỏi nặng; muốn có sẵn đủ thì bấm nút tải cả bộ ở mục phía trên.',
        },
        {
          tieuDe: 'Không quảng cáo, không theo dõi',
          noiDung:
            'Không có quảng cáo, không có bộ đếm hay công cụ theo dõi nào. Lựa chọn ngôn ngữ và giao diện chỉ lưu trong máy bạn. Ứng dụng chỉ nối mạng để lấy hình cấu tạo lần đầu bạn xem chất đó, ngoài ra không gửi gì đi.',
        },
        {
          tieuDe: 'Máy tự kiểm số liệu, không tin vào mắt người',
          noiDung:
            'Mỗi lần sửa mã, bộ phép kiểm tự động chạy lại toàn bộ: cân bằng từng phương trình, đối chiếu công thức với cấu trúc phân tử, kiểm nhiệt độ nóng chảy có khớp trạng thái chất hay không.',
        },
        {
          tieuDe: 'Đối chiếu với cơ sở dữ liệu quốc tế',
          noiDung:
            'Chất có tâm bất đối được so mã InChI với PubChem của Viện Y tế Quốc gia Mỹ — vẽ nhầm chiều xoay một tâm là bộ kiểm báo ngay. Khối lượng nguyên tử so với bảng chính thức của IUPAC; nhiệt độ nóng chảy, nhiệt độ sôi và khối lượng riêng so với PubChem. Bật các phép kiểm này đã lòi ra năm con số lạc hậu — argon, ziriconi, nhôm sôi, bari sôi, iridi nóng chảy — và đã sửa cả năm.',
        },
        {
          tieuDe: 'Không có số liệu là để trống, không đoán',
          noiDung:
            'Nguyên tố siêu nặng chưa ai đo được thì để dấu gạch ngang, không điền số dự đoán cho đẹp bảng. Chỗ nào có số nhưng chưa chắc thì giữ số và ghi rõ lý do ngay cạnh: "ước tính" cho nhiệt độ sôi của actini, protactini, neptuni (chưa ai đo được, con số là ngoại suy); "đang tranh cãi" cho nhiệt độ nóng chảy của radi (đã đo rồi nhưng ra hai kết quả 700 và 960 °C, giới khoa học chưa ngã ngũ). Hai chuyện khác nhau nên không gộp một chữ.',
        },
        {
          tieuDe: 'Phép tính do thuật toán làm, không phải AI đoán',
          noiDung:
            'Cân bằng phương trình giải bằng đại số phân số nên không sai số làm tròn. Tính pH giải đúng phương trình cân bằng, kể cả ở nồng độ rất loãng.',
        },
      ]
    : [
        {
          tieuDe: 'Works offline once installed',
          noiDung:
            'The data — elements, formulas, reactions, terms, real-world notes — ships inside the app and keeps working with no network. Structure images load when you open them, to keep the install small; the section above downloads the whole set in advance if you want it.',
        },
        {
          tieuDe: 'No ads, no tracking',
          noiDung:
            'No ads, no analytics, no trackers. Language and theme stay on your device. The only network request is fetching a structure image the first time you view that compound.',
        },
        {
          tieuDe: 'Data checked by machine, not by eye',
          noiDung:
            'Every change re-runs the whole automated suite: equation balance, formula versus structure, melting point versus physical state.',
        },
        {
          tieuDe: 'Checked against international databases',
          noiDung:
            'Every compound with a stereocentre has its InChI matched against PubChem. Atomic weights are matched against the official IUPAC table; melting points, boiling points and densities against PubChem — switching these checks on found five outdated values (argon, zirconium, aluminium and barium boiling points, iridium melting point), all now fixed.',
        },
        {
          tieuDe: 'Missing data is left blank, never guessed',
          noiDung:
            'Superheavy elements with nothing measured show a dash, not a predicted number. Where a figure exists but is not settled, it is kept and labelled on the spot: "estimated" for the boiling points of actinium, protactinium and neptunium (never measured, the number is an extrapolation), and "disputed" for the melting point of radium (measured, but two results 700 and 960 °C with no scientific consensus). Two different things, so two different labels.',
        },
        {
          tieuDe: 'Calculations are deterministic, not AI guesses',
          noiDung:
            'Equation balancing uses exact fraction algebra. pH solves the real equilibrium, correct even at very low concentrations.',
        },
      ];

  const canBiet: string[] = vi
    ? [
        'Khối lượng nguyên tử đối chiếu với bảng chính thức của IUPAC; nhiệt độ nóng chảy, nhiệt độ sôi và khối lượng riêng đối chiếu với PubChem của Viện Y tế Quốc gia Mỹ — tất cả chạy tự động mỗi lần dựng ứng dụng. Riêng ba đại lượng đo được thì các sổ tay uy tín vốn đã chênh nhau, nên phép kiểm đặt ngưỡng và ghi rõ lý do ở từng chỗ khác biệt. Còn ĐỘ ÂM ĐIỆN thì chưa có nguồn có tên: không tổ chức nào công bố bộ chuẩn, các bảng chênh nhau ngay ở số lẻ thứ hai.',
        'Hình cấu tạo vẽ theo khung phẳng chuẩn quốc tế. Nhóm đường như glucozơ chưa vẽ theo kiểu Haworth quen thuộc trong sách giáo khoa Việt Nam.',
        'Polime chỉ vẽ được một mắt xích, hai đầu để hở cho thấy mạch còn nối tiếp, không phải công thức của cả phân tử.',
        'Tính pH mới xét axit và bazơ đơn thuần, chưa tính dung dịch đệm hay muối thủy phân.',
      ]
    : [
        'Atomic weights are checked against the official IUPAC table; melting points, boiling points and densities against PubChem (US National Institutes of Health) — all on every build. Reputable handbooks genuinely disagree on measured quantities, so those checks use thresholds and record a reason at each difference. Electronegativity still has no named source: no body publishes a standard set, and published tables differ in the second decimal.',
        'Structures use the international flat layout. Sugars such as glucose are not drawn in the Haworth projection.',
        'Polymers show one repeating unit with open ends, not a whole-molecule formula.',
        'The pH tool covers plain acids and bases only, not buffers or salt hydrolysis.',
      ];

  return (
    <>
      <PageHeader title={t('nav_settings')} />
      <div className="p-4 md:p-6 space-y-3">
        {/* Tách phần giới thiệu thành từng thẻ riêng theo chủ đề. Trước đây
            dồn hết vào một thẻ nên phải cuộn dài mà không biết đang đọc mục nào.
            Ngôn ngữ và giao diện đã chuyển lên góc phải thanh tiêu đề — đó là
            thứ bật tắt luôn tay, không đáng bắt người dùng vào tận đây. */}
        <section className="card p-4">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-2xl">⚗️</span>
            <h3 className="font-semibold text-slate-100">
              {vi ? 'Về pH-Chem' : 'About pH-Chem'}
            </h3>
          </div>
          <p className="text-sm text-slate-400">
            {vi
              ? 'Bộ công cụ hóa học dùng cho học sinh, giáo viên và người làm thí nghiệm. Tra cứu, tính toán và luyện tra phản ứng ngay trên điện thoại hay máy tính, không cần mạng.'
              : 'A chemistry toolkit for students, teachers and lab users. Look things up, calculate and explore reactions on phone or desktop, with no network needed.'}
          </p>
        </section>

        {/* Kho dữ liệu — con số là thứ đáng khoe nhất nên cho hẳn ô riêng, chữ to */}
        <section className="card p-4">
          <h3 className="font-semibold text-slate-100 mb-3">
            {vi ? 'Kho dữ liệu' : 'Data included'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {soLieu.map((x) => (
              <div
                key={x.nhan}
                className="rounded-xl bg-base-850 border border-base-800 px-3 py-2.5"
              >
                <div className="text-xl font-bold font-mono text-accent leading-none">
                  {x.so}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-tight">
                  {x.nhan}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-600 mt-2.5">
            {vi
              ? 'Các con số này do ứng dụng tự đếm từ dữ liệu thật mỗi lần mở, không phải ghi tay nên không bao giờ lạc hậu.'
              : 'These numbers are counted from the live data on every load, never typed by hand.'}
          </p>
        </section>

        <TaiHinhNgoaiTuyen />

        {/* Nguyên tắc làm app */}
        <section className="card p-4">
          <h3 className="font-semibold text-slate-100 mb-3">
            {vi ? 'Cách ứng dụng được làm' : 'How it is built'}
          </h3>
          <div className="space-y-3">
            {nguyenTac.map((x) => (
              <div key={x.tieuDe} className="flex gap-2.5">
                <span className="text-accent text-sm leading-5 shrink-0">✓</span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-200">{x.tieuDe}</div>
                  <p className="text-xs text-slate-400 mt-0.5">{x.noiDung}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Điều cần biết — tô khác màu để không lẫn với phần khoe ở trên */}
        <section className="card p-4 border-amber-500/25 bg-amber-500/[0.04]">
          <h3 className="font-semibold text-slate-100 mb-1">
            {vi ? 'Điều nên biết trước khi dùng để dạy' : 'Before using this to teach'}
          </h3>
          <p className="text-[11px] text-slate-500 mb-2.5">
            {vi
              ? 'Những giới hạn còn tồn tại, ghi ra để người dùng khỏi tin nhầm.'
              : 'Known limits, written down so nobody assumes otherwise.'}
          </p>
          <ul className="space-y-2">
            {canBiet.map((x) => (
              <li key={x} className="flex gap-2.5 text-xs text-slate-400">
                <span className="text-amber-500/80 leading-4 shrink-0">•</span>
                <span className="min-w-0">{x}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Chân trang */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 pt-1 pb-2 text-xs">
          <span className="text-slate-500">
            {vi ? 'Phiên bản' : 'Version'}{' '}
            <span className="font-mono text-slate-300">{VERSION}</span>
            <span className="mx-2 text-base-700">·</span>
            {vi ? 'Miễn phí, không quảng cáo' : 'Free, no ads'}
          </span>
          <span className="text-slate-500">© {NAM} August87</span>
        </div>
      </div>
    </>
  );
}
