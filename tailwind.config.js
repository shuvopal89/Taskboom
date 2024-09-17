/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "lobster": ["Lobster", 'sans-serif']
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '100% 0', },
          '100%': { backgroundPosition: '-100% 0', },
        },
      },
      animation: {
        shimmer: 'shimmer 3s ease-out infinite',
      },
    }
  },
  plugins: [],
}