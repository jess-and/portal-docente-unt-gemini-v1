/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        unt: {
          blue: '#003087',
          'blue-dark': '#001f5c',
          'blue-light': '#1a4bb0',
          gold: '#FFD700',
          'gold-dark': '#d4af37',
          'gold-light': '#ffe247',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}