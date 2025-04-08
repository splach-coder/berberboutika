/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: false,
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#FFF3DF",  // Antique white
          dark: "#49371B",  // dark coffee
          black: "#272727",  // Dark gray
        },
        background: {
          flashLIght: "#EFEFEF",  // Flash light
          white: "#FFFFFF",  // White
          light: "#F4F4F4",  // Crisp White
          dark: "#272727",   // Dark background for dark mode (optional)
        },
        button: {
          etsy: "#F1641F",
          hoverEtsy: "#d85113",
          whatsapp: "#24D366",
          hoverWhatsapp: "#12843c",
          dark: "#49371B",
          darkHover: "#3C2D16",
        }
      },
    },
  },
  plugins: [],
};
