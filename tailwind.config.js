/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

module.exports = {
  content: ['./client/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: colors.black,
          1: 'rgb(30,30,35)',
          2: 'rgb(35,35,40)',
          3: 'rgb(50,50,50)'
        },
        white: {
          DEFAULT: colors.white,
          1: 'rgb(255,255,255)',
          2: 'rgb(215,215,215)',
          3: 'rgb(130,130,130)'
        },
        highlight: '#1A8BBF'
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
        lato: ['Lato', 'sans-serif']
      }
    }
  },
  plugins: []
};
