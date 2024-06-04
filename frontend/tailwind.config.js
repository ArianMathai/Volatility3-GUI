/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
          darker: "#0B2B3C",
          darkest: "#0A202C",
        },
        themeText: {
          light: "#DBD5C3",
        },
      },
    },
  },
  plugins: [],
};