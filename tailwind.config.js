/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:"class",
  theme: {
    screens: {
      'xs': '350px',
      'sm': '530px',
      'md': '768px',
      'lg': '976px',
      'xl': '1440px',
    },
    container:
    {
      center: true, 
    }
  },
  plugins: [],
} 
