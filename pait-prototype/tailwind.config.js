/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0E1B33',
          secondary: '#16294A',
        },
        accent: {
          cyan: '#22B8CF',
          blue: '#3B82F6',
        },
        surface: '#F5F7FA',
        border: '#E4E7EC',
        ink: {
          DEFAULT: '#101828',
          muted: '#667085',
        },
        success: '#12B76A',
        warning: '#F79009',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        600: '600',
        700: '700',
        800: '800',
      },
      width: {
        sidebar: '236px',
      },
      margin: {
        sidebar: '236px',
      },
    },
  },
  plugins: [],
}
