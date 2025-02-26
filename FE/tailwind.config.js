/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/pngtree-film-strp-3d-background-with-roll-projector-picture-image_1979677.jpg')",
        'gambar film': "url('/path/to/your/image.jpg')",
      },
      colors: {
        primary: "#FFF2F2", 
        secondary: "#A9B5DF",   
        accent: "#7886C7",   
        bgDark: "#2D336B",   
      },
    },
  },
  plugins: [],  
});
