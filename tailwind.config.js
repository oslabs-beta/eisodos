/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

module.exports = {
  content: ['./client/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: colors.black,
          1: 'rgb(15,15,20)',
          2: 'rgb(35,35,40)',
          3: 'rgb(50,50,50)'
        },
        white: {
          DEFAULT: colors.white,
          1: 'rgb(255,255,255)',
          2: 'rgb(215,215,215)',
          3: 'rgb(130,130,130)'
        },
        highlight: '#1A8BBF',
        shadow: '#0D2F4F'
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
        lato: ['Lato', 'sans-serif']
      },
      boxShadow: {
        card: '1px 1px 5px 5px rgba(0, 0, 0, 0.3)'
      }
    }
  },
  plugins: []
};
