import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { STRINGS, type Lang, type StringKey } from './strings';
import { doc, ghi } from '../lib/boNho';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: StringKey) => string;
}

const Ctx = createContext<LangCtx | null>(null);

const STORAGE_KEY = 'chemipro.lang';

function readInitial(): Lang {
  // Kho lưu có thể bị chặn — xem lib/boNho.ts
  const saved = doc(STORAGE_KEY);
  return saved === 'en' ? 'en' : 'vi'; // mặc định tiếng Việt
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitial);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    ghi(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(
    () => setLang(lang === 'vi' ? 'en' : 'vi'),
    [lang, setLang],
  );

  const t = useCallback((key: StringKey) => STRINGS[key][lang], [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, toggle, t }}>{children}</Ctx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
