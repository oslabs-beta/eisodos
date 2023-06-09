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
          2: 'rgb(25,25,40)',
          3: 'rgb(40,40,60)'
        },
        white: {
          DEFAULT: colors.white,
          1: 'rgb(255,255,255)',
          2: 'rgb(215,215,215)',
          3: 'rgb(130,130,130)'
        },
        blue: {
          DEFAULT: colors.blue,
          1: 'rgb(10, 77, 104)',
          2: 'rgb(0, 43, 91)',
          3: 'rgb(11,173,214)'
        },
        highlight: '#1A8BBF',
        shadow: '#0D2F4F'
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
        lato: ['Lato', 'sans-serif']
      },
      boxShadow: {
        namespace: '1px 1px 10px #9ab4fb70'
      }
    }
  },
  plugins: []
};
