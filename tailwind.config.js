/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      phone: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        navbar: "#212932",
        home: "#1A2026",
        mainText: "#8794A1",
        secText: "white",
        linkText: "#3D80B5",
        buttonMain: "#248BDA",
        buttonSec: "#248BDA",
        input: "#242E38",
        tableHead: "#293440",
        tableBody: "#212A33",
      },
    },
  },
  plugins: [],
};
