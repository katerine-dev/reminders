/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('./src/assets/background.svg')",
      },
    },
  },
  plugins: [],
};
