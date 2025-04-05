/** @type {import('tailwindcss').Config} */
import daisyui from './node_modules/daisyui';
export default {
  darkMode: 'class',
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], 
    theme: {
      extend: {
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
      },
    },
    plugins: [daisyui],
    daisyui: {
      themes: ["light","dark",],
    },
  };
  