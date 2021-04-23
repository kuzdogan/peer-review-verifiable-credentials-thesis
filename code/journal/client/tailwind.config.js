module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    minWidth: {
      16: '16rem',
      24: '24rem',
      32: '32rem',
      48: '48rem',
      64: '64rem',
      128: '128rem',
      full: '100%',
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      display: ['disabled'],
    },
  },
  plugins: [],
};
