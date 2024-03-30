/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'src/js/**/*.js'],
  theme: {
    fontFamily: {
      jaldi: ['Jaldi', 'sans-serif']
    },
    extend: {
      height: {
        'modal': 'calc(100vh - 160px)',
      },
      boxShadow: {
        'modal': '0px 0px 20px 10px #000'
      }
    },
  },
  plugins: [],
}

