/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ff5501",
        "primary-shade-10": "#e64d01",
        "primary-shade-30": "#b33b01",
        "primary-tint-20": "#ff7734",
        "primary-tint-10": "#ff661a",
      },
      screens: {
        s340: "340px",
        s310: "310px",
        s420: "420px",
      },
    },
  },
  plugins: [],
};
