/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");


module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  theme: {
    extend: {
      colors: {
        primary: '#fbbf24',
        linkTxt: '#5c6ac4',
        secondary: '#121317',
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        segoe: ["Segoe UI", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

