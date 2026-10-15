/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0a0d14',
          surface: '#111622',
          mint: '#99f6e4',
          teal: '#14b8a6',
        }
      }
    },
  },
  plugins: [],
}
