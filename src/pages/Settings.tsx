import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { ELEMENTS } from '../data/elements';
import { FORMULAS } from '../data/formulas';
import { TERMS } from '../data/dictionary';
import { FACTS } from '../data/facts';
import { REACTIONS } from '../data/reactions';
import { CATIONS, ANIONS } from '../data/solubility';
import { STRUCTURE_COUNT } from '../generated/structures';

const VERSION = '0.4';

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
          tieuDe: 'Chạy offline, không cần mạng',
          noiDung:
            'Toàn bộ dữ liệu nằm sẵn trong ứng dụng. Cài về máy rồi thì mất mạng vẫn tra cứu và tính toán bình thường.',
        },
        {
          tieuDe: 'Không quảng cáo, không theo dõi',
          noiDung:
            'Ứng dụng không gửi bất cứ thông tin gì ra ngoài. Lựa chọn ngôn ngữ và giao diện chỉ lưu trong máy bạn.',
        },
        {
          tieuDe: 'Máy tự kiểm số liệu, không tin vào mắt người',
          noiDung:
            'Mỗi lần sửa mã, bộ phép kiểm tự động chạy lại toàn bộ: cân bằng từng phương trình, đối chiếu công thức với cấu trúc phân tử, kiểm nhiệt độ nóng chảy có khớp trạng thái chất hay không.',
        },
        {
          tieuDe: 'Hình cấu tạo đối chiếu với cơ sở dữ liệu quốc tế',
          noiDung:
            'Những chất có tâm bất đối được so mã InChI với PubChem của Viện Y tế Quốc gia Mỹ. Vẽ nhầm chiều xoay một tâm là bộ kiểm báo ngay.',
        },
        {
          tieuDe: 'Không có số liệu là để trống, không đoán',
          noiDung:
            'Những nguyên tố siêu nặng chưa ai đo được nhiệt độ nóng chảy hay khối lượng riêng thì ứng dụng để dấu gạch ngang, không điền số dự đoán cho đẹp bảng.',
        },
        {
          tieuDe: 'Phép tính do thuật toán làm, không phải AI đoán',
          noiDung:
            'Cân bằng phương trình giải bằng đại số phân số nên không sai số làm tròn. Tính pH giải đúng phương trình cân bằng, kể cả ở nồng độ rất loãng.',
        },
      ]
    : [
        {
          tieuDe: 'Works offline',
          noiDung: 'All data ships inside the app. Once installed it works with no network.',
        },
        {
          tieuDe: 'No ads, no tracking',
          noiDung: 'Nothing leaves your device. Language and theme are stored locally.',
        },
        {
          tieuDe: 'Data checked by machine, not by eye',
          noiDung:
            'Every change re-runs the whole automated suite: equation balance, formula versus structure, melting point versus physical state.',
        },
        {
          tieuDe: 'Structures checked against an international database',
          noiDung:
            'Every compound with a stereocentre has its InChI matched against PubChem. Flip one centre and the check fails.',
        },
        {
          tieuDe: 'Missing data is left blank, never guessed',
          noiDung:
            'Superheavy elements with no measured melting point or density show a dash instead of a predicted number.',
        },
        {
          tieuDe: 'Calculations are deterministic, not AI guesses',
          noiDung:
            'Equation balancing uses exact fraction algebra. pH solves the real equilibrium, correct even at very low concentrations.',
        },
      ];

  const canBiet: string[] = vi
    ? [
        'Số liệu lấy từ bảng tra chuẩn phổ thông. Ứng dụng chưa nhập trực tiếp từ một bộ dữ liệu có tên như NIST hay IUPAC, nên không ghi nguồn cho từng giá trị.',
        'Hình cấu tạo vẽ theo khung phẳng chuẩn quốc tế. Nhóm đường như glucozơ chưa vẽ theo kiểu Haworth quen thuộc trong sách giáo khoa Việt Nam.',
        'Polime chỉ vẽ được một mắt xích, hai đầu để hở cho thấy mạch còn nối tiếp, không phải công thức của cả phân tử.',
        'Tính pH mới xét axit và bazơ đơn thuần, chưa tính dung dịch đệm hay muối thủy phân.',
      ]
    : [
        'Values come from standard reference tables. The app does not import a named dataset such as NIST or IUPAC, so individual values carry no citation.',
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
          <a
            href="https://github.com/tuongotpho/pHchem"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            {vi ? 'Mã nguồn trên GitHub' : 'Source on GitHub'}
          </a>
        </div>
      </div>
    </>
  );
}
