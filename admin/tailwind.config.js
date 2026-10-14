/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080e15',
          navy: '#0d1522',
          surface: '#111b2b',
          border: 'rgba(255, 255, 255, 0.08)',
          teal: '#14b8a6',
          mint: '#5eead4',
          cyan: '#38bdf8',
          amber: '#fbbf24',
          crimson: '#f87171'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
