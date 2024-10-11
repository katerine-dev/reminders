/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('./src/assets/background.svg')",
      },
      colors: {
        "custom-green-low-trans": "rgba(193, 207, 161, 0.30)", // verde com transparencia
        "custom-green-low": "#C1CFA1",
        "custom-green-high": "#A5B68D",
        "custom-pink-high": "#EE946C",
      },
    },
  },
  plugins: [],
};
