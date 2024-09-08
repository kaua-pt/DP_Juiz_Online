const { default: colors } = require('./src/Utils/Colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      }
      
    },
    boxShadow: {
      'bottom-primary': '4px 4px 0px 0px #101828',

    },
  },
  plugins: [],
}

