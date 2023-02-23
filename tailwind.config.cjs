/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        whiteSecondary: '#f2f4ff',
        grayPrimary: '#3a4374',
        colorPurple: ' #ad1fea',
      },
    },
  },
  plugins: [],
};
