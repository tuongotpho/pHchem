import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { useTheme } from '../theme/ThemeContext';
import { ELEMENTS } from '../data/elements';
import { FORMULAS } from '../data/formulas';
import { TERMS } from '../data/dictionary';
import { FACTS } from '../data/facts';
import { REACTIONS } from '../data/reactions';
import { CATIONS, ANIONS } from '../data/solubility';
import { STRUCTURE_COUNT } from '../generated/structures';

const VERSION = '0.4';

export default function Settings() {
  const { t, lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const vi = lang === 'vi';

  // Số liệu ĐẾM TỪ DỮ LIỆU, không gõ tay — thêm bớt nội dung là tự cập nhật.
  const soLieu: { nhan: string; so: string }[] = [
    { nhan: vi ? 'Nguyên tố' : 'Elements', so: String(ELEMENTS.length) },
    { nhan: vi ? 'Công thức hóa học' : 'Chemical formulas', so: String(FORMULAS.length) },
    { nhan: vi ? 'Hình công thức cấu tạo' : 'Structural diagrams', so: String(STRUCTURE_COUNT) },
    { nhan: vi ? 'Phản ứng' : 'Reactions', so: String(REACTIONS.length) },
    { nhan: vi ? 'Thuật ngữ' : 'Dictionary terms', so: String(TERMS.length) },
    { nhan: vi ? 'Sự thật' : 'Facts', so: String(FACTS.length) },
    { nhan: vi ? 'Ô bảng độ tan' : 'Solubility cells', so: `${CATIONS.length}×${ANIONS.length}` },
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
            'Mỗi lần sửa mã, hơn 100 phép kiểm tự động chạy lại: cân bằng phương trình, đối chiếu công thức với cấu trúc phân tử, kiểm nhiệt độ nóng chảy có khớp trạng thái chất hay không.',
        },
        {
          tieuDe: 'Không có số liệu là để trống, không đoán',
          noiDung:
            'Những nguyên tố siêu nặng chưa ai đo được nhiệt độ nóng chảy hay khối lượng riêng thì ứng dụng để dấu gạch ngang, không điền số dự đoán cho đẹp bảng.',
        },
        {
          tieuDe: 'Hình cấu tạo do phần mềm chuyên ngành vẽ',
          noiDung:
            'Hình vẽ bằng RDKit theo chuẩn IUPAC, sinh sẵn lúc đóng gói nên mở lên là có ngay, đầy đủ ký hiệu lập thể.',
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
            'Over 100 automated checks run on every change: equation balance, formula versus structure, melting point versus physical state.',
        },
        {
          tieuDe: 'Missing data is left blank, never guessed',
          noiDung:
            'Superheavy elements with no measured melting point or density show a dash instead of a predicted number.',
        },
        {
          tieuDe: 'Structures drawn by professional software',
          noiDung:
            'Diagrams are generated with RDKit to the IUPAC standard, pre-rendered at build time with full stereochemistry.',
        },
        {
          tieuDe: 'Calculations are deterministic, not AI guesses',
          noiDung:
            'Equation balancing uses exact fraction algebra. pH solves the real equilibrium, correct even at very low concentrations.',
        },
      ];

  return (
    <>
      <PageHeader title={t('nav_settings')} />
      <div className="p-4 md:p-6 max-w-3xl space-y-4">
        {/* Ngôn ngữ */}
        <section className="card p-4">
          <h2 className="font-semibold text-slate-200 mb-3">{t('settings_language')}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setLang('vi')}
              className={lang === 'vi' ? 'btn-accent flex-1' : 'btn-ghost flex-1'}
            >
              🇻🇳 Tiếng Việt
            </button>
            <button
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'btn-accent flex-1' : 'btn-ghost flex-1'}
            >
              🇬🇧 English
            </button>
          </div>
        </section>

        {/* Giao diện */}
        <section className="card p-4">
          <h2 className="font-semibold text-slate-200 mb-3">{t('settings_theme')}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('dark')}
              className={theme === 'dark' ? 'btn-accent flex-1' : 'btn-ghost flex-1'}
            >
              🌙 {t('settings_dark')}
            </button>
            <button
              onClick={() => setTheme('light')}
              className={theme === 'light' ? 'btn-accent flex-1' : 'btn-ghost flex-1'}
            >
              ☀️ {t('settings_light')}
            </button>
          </div>
        </section>

        {/* Giới thiệu */}
        <section className="card p-4">
          <h2 className="font-semibold text-slate-200">
            {vi ? 'Về pH-Chem' : 'About pH-Chem'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {vi
              ? 'Bộ công cụ hóa học dùng cho học sinh, giáo viên và người làm thí nghiệm. Tra cứu, tính toán và luyện tra phản ứng ngay trên điện thoại hay máy tính, không cần mạng.'
              : 'A chemistry toolkit for students, teachers and lab users. Look things up, calculate and explore reactions on phone or desktop, with no network needed.'}
          </p>

          {/* Kho dữ liệu */}
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-2">
            {vi ? 'Kho dữ liệu hiện có' : 'Data included'}
          </h3>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-5">
            {soLieu.map((x) => (
              <div
                key={x.nhan}
                className="flex items-baseline justify-between gap-2 border-b border-base-800/70 py-1"
              >
                <dt className="text-xs text-slate-500">{x.nhan}</dt>
                <dd className="text-sm font-mono font-semibold text-slate-100">{x.so}</dd>
              </div>
            ))}
          </dl>
          <p className="text-[11px] text-slate-600 mt-2">
            {vi
              ? 'Các con số trên do ứng dụng tự đếm từ dữ liệu thật, không phải ghi tay nên không bao giờ lạc hậu.'
              : 'These numbers are counted from the live data, never typed by hand.'}
          </p>

          {/* Nguyên tắc */}
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-2">
            {vi ? 'Cách ứng dụng được làm' : 'How it is built'}
          </h3>
          <div className="space-y-2.5">
            {nguyenTac.map((x) => (
              <div key={x.tieuDe}>
                <div className="text-sm font-medium text-slate-200">{x.tieuDe}</div>
                <p className="text-xs text-slate-400 mt-0.5">{x.noiDung}</p>
              </div>
            ))}
          </div>

          {/* Điều cần biết */}
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-2">
            {vi ? 'Điều nên biết trước khi dùng để dạy' : 'Before using this to teach'}
          </h3>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
            <li>
              {vi
                ? 'Số liệu lấy từ bảng tra chuẩn phổ thông. Ứng dụng chưa nhập trực tiếp từ một bộ dữ liệu có tên như NIST hay IUPAC, nên không ghi nguồn cho từng giá trị.'
                : 'Values come from standard reference tables. The app does not import a named dataset such as NIST or IUPAC, so individual values carry no citation.'}
            </li>
            <li>
              {vi
                ? 'Hình cấu tạo vẽ theo khung phẳng chuẩn quốc tế. Nhóm đường như glucozơ chưa vẽ theo kiểu Haworth quen thuộc trong sách giáo khoa Việt Nam.'
                : 'Structures use the international flat layout. Sugars such as glucose are not drawn in the Haworth projection.'}
            </li>
            <li>
              {vi
                ? 'Tính pH mới xét axit và bazơ đơn thuần, chưa tính dung dịch đệm hay muối thủy phân.'
                : 'The pH tool covers plain acids and bases only, not buffers or salt hydrolysis.'}
            </li>
          </ul>

          {/* Phiên bản */}
          <div className="mt-4 pt-3 border-t border-base-800 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <span className="text-slate-500">
              {vi ? 'Phiên bản' : 'Version'}{' '}
              <span className="font-mono text-slate-300">{VERSION}</span>
            </span>
            <a
              href="https://github.com/tuongotpho/pHchem"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              {vi ? 'Mã nguồn trên GitHub' : 'Source on GitHub'}
            </a>
            <span className="text-slate-500">
              {vi ? 'Miễn phí, không quảng cáo' : 'Free, no ads'}
            </span>
          </div>
        </section>
      </div>
    </>
  );
}
