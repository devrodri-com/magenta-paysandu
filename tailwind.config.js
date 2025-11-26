/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            magenta: "#e6007e",
            rosa: "#ff40a7",
            rosaClaro: "#ffa6d1",
            negro: "#000000",
            blanco: "#ffffff",
            gris: "#a2a2a2",
          },
        },
      },
    },
    plugins: [],
  };