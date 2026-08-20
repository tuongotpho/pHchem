import { NavLink, Outlet } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
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

  return (
    <div className="min-h-full flex flex-col md:flex-row bg-base-950">
      {/* Cột trái cho tablet/PC */}
      <aside className="hidden md:flex md:flex-col md:w-60 shrink-0 border-r border-base-800 p-4 gap-1">
        <div className="flex items-center gap-2 px-2 py-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-accent text-base-950 grid place-items-center font-bold text-lg">
            ⚗
          </div>
          <div>
            <div className="font-bold text-slate-100 leading-tight">
              {t('appName')}
            </div>
            <div className="text-xs text-slate-500">{t('tagline')}</div>
          </div>
        </div>
        {ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
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
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
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
                `flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-lg text-[10px] font-medium min-w-0 ${
                  isActive ? 'text-accent' : 'text-slate-500'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="truncate max-w-[52px]">{t(label)}</span>
            </NavLink>
          ),
        )}
      </nav>
    </div>
  );
}
