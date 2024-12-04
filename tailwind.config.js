/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./backendComponents/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
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
        "footer-bg": "#1d1f24",
        "footer-text": "#999999",
      },
      screens: {
        s185: "185px",
        s200: "200px",
        s220: "220px",
        s240: "240px",
        s250: "250px",
        s260: "260px",
        s280: "280px",
        s320: "320px",
        s340: "340px",
        s350: "350px",
        s380: "380px",
        s310: "310px",
        s410: "410px",
        s420: "420px",
        s450: "450px",
        s480: "480px",
        s500: "500px",
        s550: "550px",
        s580: "580px",
        s600: "600px",
        s650: "650px",
        s690: "690px",
        s768: "768px",
        s872: "872px",
        s1024: "s1024",
        s1230: "1230px",
        s1400: "1400px",
      },
    },
  },
  plugins: [],
};