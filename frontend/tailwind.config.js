/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    colors: {
      themeYellow: {
        default: "#DFAB49",
        light: "#FFD179",
      },
      themeGray: {
        default: "#DBD5C3",
        light: "#FFFFFF"
      }
    },
    extend: {},
  },
  plugins: [],
}

