// Hai nút đổi nhanh: giao diện Sáng/Tối và ngôn ngữ.
//
// Để ở đây một chỗ rồi dùng chung cho thanh tiêu đề lẫn trang chủ, thay vì mỗi
// nơi tự viết một kiểu. Trước đây muốn đổi giao diện phải vào tận trang Cài
// đặt, trong khi đây là thứ người dùng bật tắt luôn tay — đưa lên góc phải là
// đúng chỗ.
//
// Cả hai nút đều hiện TRẠNG THÁI ĐANG DÙNG (đang tối thì hiện mặt trăng, đang
// tiếng Việt thì hiện cờ Việt Nam), giống nhau cho khỏi phải đoán.

import { useLang } from '../i18n/LangContext';
import { useTheme } from '../theme/ThemeContext';

export default function NutNhanh() {
  const { lang, toggle: doiNgonNgu } = useLang();
  const { theme, toggle: doiGiaoDien } = useTheme();
  const vi = lang === 'vi';

  return (
    <>
      <button
        onClick={doiGiaoDien}
        className="btn-ghost text-sm px-2.5 py-1.5 shrink-0 leading-none"
        title={
          theme === 'dark'
            ? vi
              ? 'Đang dùng giao diện Tối — bấm để chuyển sang Sáng'
              : 'Dark theme — click for light'
            : vi
              ? 'Đang dùng giao diện Sáng — bấm để chuyển sang Tối'
              : 'Light theme — click for dark'
        }
        aria-label={vi ? 'Đổi giao diện Sáng/Tối' : 'Toggle light/dark theme'}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      <button
        onClick={doiNgonNgu}
        className="btn-ghost text-xs font-semibold px-2.5 py-1.5 shrink-0"
        title="Đổi ngôn ngữ / Switch language"
        aria-label="Đổi ngôn ngữ / Switch language"
      >
        {vi ? 'VI' : 'EN'}
      </button>
    </>
  );
}
