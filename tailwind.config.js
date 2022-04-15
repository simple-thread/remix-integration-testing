module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        tomato: "#C5262B",
        raddish: "#FF656A",
        sand: "#FFFDEA",
        forest: "#3D5C45",
        gold: {
          500: "#FFDE02",
          700: "#FFD300",
          900: "#FFC800",
        },
      },
      borderWidth: {
        3: "3px",
      },
    },
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
    },
  },
  plugins: [],
};
