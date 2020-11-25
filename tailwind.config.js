const colors = require('tailwindcss/colors')

module.exports = {
  plugins: [],
  purge: ['./**/*.tsx', './assets/global.scss'],
  theme: {
    colors,
    extend: {
      colors: {
        border: 'rgba(0, 0, 0, 0.075)'
      }
    },
    fontFamily: {
      body: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Inter', 'system-ui', 'sans-serif']
    }
  },
  variants: {
    margin: ['responsive', 'first']
  }
}
