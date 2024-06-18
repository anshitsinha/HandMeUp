/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        
      },
      colors: {
        primary: '#1A202C',
        secondary: '#2D3748',
        accent: '#38B2AC',
        bgColor: '#121212',
        gridGrey: '#404040',
        textGrey: 'rgb(105, 105, 105)',
        customColorDark: '#0F1A2B',
      },
    },
  },
  plugins: [],
};