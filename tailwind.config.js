/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        pattern: "url('data:image/svg+xml,...')", 
      },
      fontFamily: {
        sans: ["Peyda", "system-ui", "sans-serif"],
        peyda: ["Peyda", "sans-serif"],
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
  darkMode: "class",
};
