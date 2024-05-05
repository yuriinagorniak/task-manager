/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '1px 1px 20px 2px rgba(0,0,0,1)'
      }
    },
  },
  plugins: [],
}

