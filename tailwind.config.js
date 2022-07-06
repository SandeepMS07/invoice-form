/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkViolet: "#17013b",
        eastSide: "#b29dd4",
        "dark-purple": "#06060C",
        "light-white": "rgba(255,255,255,0.18)",
        "bg-light": "#FFF8E88C",
        "Gray-mine-shaft": "#373737",
        "text": "#b37d00",
      },
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1340px",
      // => @media (min-width: 1440px) { ... }

      xl: "1440px,",
    },
  },
  plugins: [],
};
