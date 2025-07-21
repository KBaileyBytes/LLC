/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-yellow-400", "bg-orange-400", "bg-green-400", "bg-gray-500"],
  theme: {
    extend: {},
  },
  plugins: [],
};
