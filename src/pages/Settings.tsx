import PageHeader from '../components/PageHeader';
import { useLang } from '../i18n/LangContext';
import { useTheme } from '../theme/ThemeContext';

export default function Settings() {
  const { t, lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <PageHeader title={t('nav_settings')} />
      <div className="p-4 md:p-6 max-w-lg space-y-4">
        {/* Ngôn ngữ */}
        <section className="card p-4">
          <h2 className="font-semibold text-slate-200 mb-3">
            {t('settings_language')}
          </h2>
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
          <h2 className="font-semibold text-slate-200 mb-3">
            {t('settings_theme')}
          </h2>
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
          <h2 className="font-semibold text-slate-200 mb-2">
            {t('settings_about')}
          </h2>
          <p className="text-sm text-slate-400">{t('settings_about_text')}</p>
          <p className="text-xs text-slate-600 mt-2">pH-Chem · PWA · v0.1</p>
        </section>
      </div>
    </>
  );
}
