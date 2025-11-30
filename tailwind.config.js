/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/**/*.html",
    "./*.html",
    "./**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        redhat: ['"Red Hat"', 'sans-serif'],
      },
      colors: {
        'brand-red': '#C51718',
        'brand-red-75': 'rgba(197, 23, 24, 0.75)',
        'brand-black': '#000000',
        'brand-grey': '#A4A4A4',
      }
    },
  },
  plugins: [],
};
