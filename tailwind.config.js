/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaria: '#222831',
        secundaria: '#EEEEEE'
      },
      fontFamily: {
        titulo: '"Lexend Exa", sans-serif',
        corpo: '"Roboto Flex", sans-serif'
      }
    },
  },
  plugins: [],
}