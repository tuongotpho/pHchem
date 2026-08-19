/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Bảng màu chuyên nghiệp, tông tối làm chủ đạo
        base: {
          950: '#0a0e14',
          900: '#0f141b',
          850: '#151b24',
          800: '#1b232e',
          700: '#26313f',
          600: '#374252',
          500: '#4b5563',
        },
        accent: {
          DEFAULT: '#2dd4bf', // teal — tông "phòng thí nghiệm"
          soft: '#5eead4',
          deep: '#0d9488',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
