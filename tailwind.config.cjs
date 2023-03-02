/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        whiteSecondary: '#f2f4ff',
        grayPrimary: '#3a4374',
        colorPurple: ' #ad1fea',
        colorBluePrimary: '#4661e6',
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
      },
      backgroundImage: {
        'header-pattern-desktop': "url('/background-header-desktop.png')",
        'header-pattern-tablet': "url('/background-header-tablet.png')",
        'header-pattern-mobile': "url('/background-header-mobile.png')",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
