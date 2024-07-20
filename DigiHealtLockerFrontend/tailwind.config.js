/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        teachers: ['"Teachers"', "sans-serif"],
        // Add more custom font families as needed
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
}