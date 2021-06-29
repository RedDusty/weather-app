module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        none: 'none'
      },
      opacity: {
        '15': '0.15',
        '35': '0.35'
      },
      backgroundImage: theme => ({
        'theme-switch': 'linear-gradient(90deg, rgba(0, 0, 0, 1) 50%, rgba(255, 255, 255, 1) 50%)'
      }),
      screens: {
        'mm': '375px',
      }
    },
  },
  variants: {
    extend: {
      placeholderColor: ['hover', 'active'],
      opacity: ['hover', 'active']
    },
  },
  plugins: [],
}
