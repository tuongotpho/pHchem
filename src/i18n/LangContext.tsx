import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
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

  // Khai ngôn ngữ cho chính thẻ <html>. Trước đây chỉ đặt trong setLang, nên
  // người chọn tiếng Anh rồi mở lại app thì trang vẫn khai lang="vi" — trình
  // đọc màn hình đọc tiếng Anh bằng giọng tiếng Việt.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    ghi(STORAGE_KEY, l);
    // Thẻ <html> do useEffect ở trên lo, khỏi đặt hai nơi.
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
