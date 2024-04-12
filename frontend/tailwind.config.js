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
    },
  },
  plugins: [],
}

