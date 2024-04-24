/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans' : ['Ubuntu', 'sans-serif'],
        'GoogleSans': ['Google Sans', 'sans-serif'],
      },
      padding: {
        xxl: '30rem',
        xxxl: '60rem'
      }
    },
  },
  plugins: [],
}
