/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'src/js/**/*.js'],
  theme: {
    fontFamily: {
      jaldi: ['Jaldi', 'sans-serif']
    },
    extend: {
      boxShadow: {
        'modal': '0px 0px 20px 10px #000'
      }
    },
  },
  plugins: [],
}

