import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import GlobalSearch from './GlobalSearch';
import type { StringKey } from '../i18n/strings';
import {
  IconHome,
  IconTable,
  IconCalc,
  IconFlask,
  IconBook,
  IconBulb,
  IconGrid,
  IconSettings,
  IconReaction,
} from './icons';

type Item = {
  to: string;
  label: StringKey;
  Icon: (p: { className?: string }) => React.JSX.Element;
};

const ITEMS: Item[] = [
  { to: '/', label: 'nav_home', Icon: IconHome },
  { to: '/table', label: 'nav_table', Icon: IconTable },
  { to: '/calculator', label: 'nav_calc', Icon: IconCalc },
  { to: '/solubility', label: 'nav_solubility', Icon: IconGrid },
  { to: '/reactions', label: 'nav_reactions', Icon: IconReaction },
  { to: '/formulas', label: 'nav_formulas', Icon: IconFlask },
  { to: '/dictionary', label: 'nav_dictionary', Icon: IconBook },
  { to: '/facts', label: 'nav_facts', Icon: IconBulb },
];

export default function Layout() {
  const { t } = useLang();
  const location = useLocation();
  const { pathname } = location;
  // Trang chủ đã có ô tìm kiếm lớn ở giữa màn hình rồi, không cần thêm ô nữa.
  const hienOTimKiem = pathname !== '/';

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

      {/* Nội dung */}
      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        {/* Thanh tìm kiếm toàn app — dính trên đầu, cuộn xuống vẫn thấy */}
        {hienOTimKiem && (
          <div className="sticky top-0 z-40 border-b border-base-800 bg-base-950/90 backdrop-blur px-4 md:px-6 py-2.5">
            {/* key đổi theo địa chỉ → chuyển trang là ô tìm kiếm tự dọn sạch */}
            <GlobalSearch key={pathname + location.search} />
          </div>
        )}
        <Outlet />
      </main>

      {/* Thanh dưới cho điện thoại */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-base-900/95 backdrop-blur border-t border-base-800 flex overflow-x-auto px-1 py-1.5 gap-0.5">
        {[...ITEMS, { to: '/settings', label: 'nav_settings' as StringKey, Icon: IconSettings }].map(
          ({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex shrink-0 w-[58px] flex-col items-center gap-0.5 px-1 py-1 rounded-lg text-[10px] font-medium ${
                  isActive ? 'text-accent' : 'text-slate-500'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="truncate w-full text-center">{t(label)}</span>
            </NavLink>
          ),
        )}
      </nav>
    </div>
  );
}
