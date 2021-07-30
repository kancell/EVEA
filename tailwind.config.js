module.exports = {
  purge: ['./src/**/*.html', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        exactH: 'calc(100vh - 96px)',
      },
      animation: {
        'spin-slow': 'appear 1s cubic-bezier(0,0.2,0.5,1)',
      },
      keyframes: {
        appear: {
          '0%': { opacity: 0 },
          '30%': { opacity: 0.3 },
          '100%': { opacity: 1 },
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
