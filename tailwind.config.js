/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          10: "#f0f0f0",
          20: "#d9d9d9",
          30: "#b3b3b3",
          100: "#000000",
          // Add more shades as needed
        },
      },
    },
  },
  plugins: [],
};
