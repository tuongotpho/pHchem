import { NavLink, Outlet } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import type { StringKey } from '../i18n/strings';
import { IconSettings } from './icons';
import { ICON_TRANG, type DuongDanCoIcon } from './iconTrang';
import DemTruyCap from './DemTruyCap';
import { useDemLuot } from '../hooks/useDemLuot';

type Item = {
  to: DuongDanCoIcon;
  label: StringKey;
  Icon: (p: { className?: string }) => React.JSX.Element;
};

// Icon KHÔNG khai ở đây nữa mà tra từ ICON_TRANG — xem chú thích ở icons.tsx.
// Trước đây danh sách này và lưới ở trang chủ mỗi nơi tự khai icon, rồi lệch
// nhau: Dãy điện hóa đội chung icon với Phản ứng ở đây, còn ở trang chủ lại
// đội icon của Độ tan.
const TRANG: { to: DuongDanCoIcon; label: StringKey }[] = [
  { to: '/', label: 'nav_home' },
  { to: '/table', label: 'nav_table' },
  { to: '/calculator', label: 'nav_calc' },
  { to: '/solubility', label: 'nav_solubility' },
  { to: '/electro', label: 'nav_electro' },
  { to: '/reactions', label: 'nav_reactions' },
  { to: '/formulas', label: 'nav_formulas' },
  { to: '/dictionary', label: 'nav_dictionary' },
  { to: '/facts', label: 'nav_facts' },
  { to: '/quiz', label: 'nav_quiz' },
];

const ITEMS: Item[] = TRANG.map((x) => ({ ...x, Icon: ICON_TRANG[x.to] }));

export default function Layout() {
  const { t } = useLang();
  // Đếm lượt đặt ở ĐÂY chứ không đặt trong ô hiển thị DemTruyCap bên dưới.
  // Ô hiển thị nằm trong cột trái, mà cột trái bị ẩn trên điện thoại — gộp
  // hai việc vào một chỗ thì hôm nào đó gỡ ô hiển thị đi là mất luôn số liệu
  // mà không ai hay. Đo và hiện là hai việc khác nhau, để rời nhau.
  useDemLuot();

  return (
    <div className="min-h-full flex flex-col md:flex-row bg-base-950">
      {/* Cột trái cho tablet/PC */}
      <aside className="hidden md:flex md:flex-col md:w-52 shrink-0 border-r border-base-800 p-3 gap-0.5 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <div className="flex items-center gap-2 px-1.5 py-2 mb-1">
          <div className="w-8 h-8 shrink-0 rounded-lg bg-accent text-on-accent grid place-items-center font-bold">
            ⚗
          </div>
          <div>
            <div className="font-bold text-slate-100 leading-tight text-sm">
              {t('appName')}
            </div>
            <div className="text-[11px] text-slate-500 leading-tight">{t('tagline')}</div>
          </div>
        </div>
        {ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent/15 text-accent'
                  : 'text-slate-400 hover:bg-base-850 hover:text-slate-200'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {t(label)}
          </NavLink>
        ))}
        <div className="mt-auto">
          <DemTruyCap />
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent/15 text-accent'
                  : 'text-slate-400 hover:bg-base-850 hover:text-slate-200'
              }`
            }
          >
            <IconSettings className="w-5 h-5" />
            {t('nav_settings')}
          </NavLink>
        </div>
      </aside>

      {/* Nội dung. Chừa chỗ cho thanh dưới CỘNG THÊM vạch home của iPhone, nếu
          không thì mục cuối trang nằm khuất sau thanh. */}
      <main className="flex-1 min-w-0 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        <Outlet />
      </main>

      {/* ═══ Thanh dưới cho điện thoại ═══

          HAI LỚP chứ không một, và đó là chỗ sửa ngày 29/08/2026 cho iPhone:

          - Lớp NGOÀI (thẻ nav) chạm đáy màn hình để nền và viền phủ kín, rồi
            chừa một dải đúng bằng env(safe-area-inset-bottom) — trên iPhone có
            vạch home là 34px. Trước đây không chừa nên các nút bị tụt xuống sát
            đáy, vừa khó bấm vừa bị thanh dưới của Safari che.
          - Lớp TRONG là dải cuộn ngang, và nhờ lớp ngoài đẩy lên, nó KHÔNG còn
            đè lên vùng vạch home nữa. Đây mới là chỗ chữa cái lỗi khó chịu
            nhất: vuốt ngang trong dải vạch home là cử chỉ CHUYỂN APP của iOS,
            nên trước đây cứ cuộn menu là văng sang app khác.

          overscroll-x-contain chặn nốt đường thứ hai: cuộn hết mép mà còn vuốt
          tiếp thì Safari hiểu là "lùi/tiến trang", cũng nhảy đi mất.

          Máy không có vạch home (iPhone SE, Android, máy tính) thì
          env(safe-area-inset-bottom) bằng 0 — không đổi gì so với trước. */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-base-900/95 backdrop-blur border-t border-base-800 pb-[env(safe-area-inset-bottom)]">
        <div className="flex overflow-x-auto overscroll-x-contain px-1 py-1.5 gap-0.5">
          {[
            ...ITEMS,
            { to: '/settings', label: 'nav_settings' as StringKey, Icon: IconSettings },
          ].map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex shrink-0 w-[58px] flex-col items-center gap-0.5 px-1 py-1.5 rounded-lg text-[10px] font-medium ${
                  isActive ? 'text-accent' : 'text-slate-500'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="truncate w-full text-center">{t(label)}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
