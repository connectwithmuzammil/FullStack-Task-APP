/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '280px',
        ss: '520px',
        sm: "768px"
      }
    },
  },
  plugins: [],
}