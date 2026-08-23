// Chuỗi giao diện song ngữ. Nội dung khoa học (nguyên tố, công thức...) nằm ở
// data/, còn đây chỉ là nhãn nút/tiêu đề màn hình.

export type Lang = 'vi' | 'en';

export const STRINGS = {
  appName: { vi: 'pH-Chem', en: 'pH-Chem' },
  tagline: {
    vi: 'Phòng thí nghiệm bỏ túi',
    en: 'Your pocket laboratory',
  },

  // Điều hướng / module
  nav_home: { vi: 'Trang chủ', en: 'Home' },
  nav_table: { vi: 'Bảng tuần hoàn', en: 'Periodic Table' },
  nav_calc: { vi: 'Máy tính', en: 'Calculator' },
  nav_solubility: { vi: 'Độ tan', en: 'Solubility' },
  nav_formulas: { vi: 'Công thức', en: 'Formulas' },
  nav_dictionary: { vi: 'Từ điển', en: 'Dictionary' },
  nav_facts: { vi: 'Sự thật', en: 'Facts' },
  nav_reactions: { vi: 'Phản ứng', en: 'Reactions' },
  nav_settings: { vi: 'Cài đặt', en: 'Settings' },

  // Trang chủ
  home_title_table: { vi: 'Bảng tuần hoàn', en: 'Periodic Table' },
  home_desc_table: {
    vi: '118 nguyên tố, số liệu chi tiết',
    en: '118 elements, detailed data',
  },
  home_title_calc: { vi: 'Máy tính hóa học', en: 'Chemistry Calculator' },
  home_desc_calc: {
    vi: 'Khối lượng mol & cân bằng phương trình',
    en: 'Molar mass & equation balancing',
  },
  home_title_solubility: { vi: 'Ma trận độ tan', en: 'Solubility Matrix' },
  home_desc_solubility: {
    vi: 'Dự đoán kết tủa & phản ứng',
    en: 'Predict precipitates & reactions',
  },
  home_title_formulas: { vi: 'Thư viện công thức', en: 'Formula Library' },
  home_desc_formulas: {
    vi: 'Hữu cơ, vô cơ, hóa lý',
    en: 'Organic, inorganic, physical',
  },
  home_title_dictionary: { vi: 'Từ điển hóa học', en: 'Chemistry Dictionary' },
  home_desc_dictionary: {
    vi: 'Thuật ngữ chuyên ngành',
    en: 'Professional terms',
  },
  home_title_reactions: { vi: 'Thư viện phản ứng', en: 'Reaction Library' },
  home_desc_reactions: {
    vi: 'Điều kiện, hiện tượng, phương trình ion',
    en: 'Conditions, observations, ionic equations',
  },
  home_title_facts: { vi: 'Bách khoa sự thật', en: 'Fact Encyclopedia' },
  home_desc_facts: {
    vi: 'Sự thật về nguyên tố & khám phá',
    en: 'Facts on elements & discoveries',
  },

  search_placeholder: { vi: 'Tìm kiếm…', en: 'Search…' },

  // Ô tìm kiếm toàn app (nằm trên đầu mọi trang nhánh)
  gsearch_placeholder: {
    vi: 'Tìm mọi thứ trong app…',
    en: 'Search everything…',
  },
  gsearch_open: { vi: 'Tìm kiếm', en: 'Search' },
  gsearch_empty: { vi: 'Không tìm thấy.', en: 'No results.' },
  gsearch_hint: {
    vi: '↑↓ chọn · Enter mở · Esc đóng',
    en: '↑↓ select · Enter open · Esc close',
  },
  gsearch_more: { vi: 'kết quả nữa', en: 'more results' },
  items_count: { vi: 'mục', en: 'items' },

  // Cài đặt
  settings_language: { vi: 'Ngôn ngữ', en: 'Language' },
  settings_theme: { vi: 'Giao diện', en: 'Theme' },
  settings_dark: { vi: 'Tối', en: 'Dark' },
  settings_light: { vi: 'Sáng', en: 'Light' },
  settings_about: { vi: 'Giới thiệu', en: 'About' },
  settings_about_text: {
    vi: 'Chạy hoàn toàn offline. Không quảng cáo, không theo dõi.',
    en: 'Runs fully offline. No ads, no tracking.',
  },
} as const;

export type StringKey = keyof typeof STRINGS;
