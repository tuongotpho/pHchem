import { useLang } from '../i18n/LangContext';

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { lang, toggle } = useLang();
  return (
    <header className="sticky top-0 z-30 bg-base-950/85 backdrop-blur border-b border-base-800 px-4 md:px-6 py-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-lg md:text-xl font-bold text-slate-100 truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-500 truncate">{subtitle}</p>
        )}
      </div>
      <button
        onClick={toggle}
        className="btn-ghost text-xs px-2.5 py-1.5 shrink-0"
        title="Đổi ngôn ngữ / Switch language"
      >
        {lang === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
      </button>
    </header>
  );
}
