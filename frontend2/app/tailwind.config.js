/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      themeYellow: {
        default: "#DFAB49",
        light: "#FFD179",
      },
      themeGray: {
        default: "#DBD5C3",
        light: "#FFFFFF",
        dark: "#969696",
      },
      themeBlue: {
        default: "#053046",
        dark: "#0C2A3A",
      },
      themeText: {
        light: "#DBD5C3",
      },
    },
    extend: {},
  },
  plugins: [],
};