const { join } = require('path')
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'), ...createGlobPatternsForDependencies(__dirname)],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: 'var(--color-primary)',
      black: colors.black,
      white: colors.white,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  mode: 'jit',
}
