/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        modern: {
          black: '#111111',
          gray: '#f5f5f7',
          accent: '#2563eb',
          accentDark: '#1d4ed8',
        }
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      }
    }
  },
  plugins: [],
}
