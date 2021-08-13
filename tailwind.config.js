module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        exactH: 'calc(100vh - 96px)',
      },
      animation: {
        'spin-slow': 'appear 1s ease-in',
      },
      keyframes: {
        appear: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        move: {
          '0%': { transform: 'translateX(0vw)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
