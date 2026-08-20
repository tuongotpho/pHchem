/** @type {import('tailwindcss').Config} */

// Màu lấy từ biến CSS (khai báo ở src/index.css) để đổi được giữa tông tối và
// tông sáng mà không phải sửa lớp trong từng thành phần.
const bien = (ten) => `rgb(var(${ten}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nền và viền
        base: {
          950: bien('--c-base-950'),
          900: bien('--c-base-900'),
          850: bien('--c-base-850'),
          800: bien('--c-base-800'),
          700: bien('--c-base-700'),
          600: bien('--c-base-600'),
          500: bien('--c-base-500'),
        },
        // Chữ: chỉ ghi đè các sắc độ đang dùng, còn lại giữ mặc định Tailwind
        slate: {
          100: bien('--c-slate-100'),
          200: bien('--c-slate-200'),
          300: bien('--c-slate-300'),
          400: bien('--c-slate-400'),
          500: bien('--c-slate-500'),
          600: bien('--c-slate-600'),
        },
        accent: {
          DEFAULT: bien('--c-accent'),
          soft: bien('--c-accent-soft'),
          deep: bien('--c-accent-deep'),
        },
        /** Màu chữ đặt trên nền accent (đảo ngược giữa hai tông). */
        'on-accent': bien('--c-on-accent'),
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
