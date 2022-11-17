module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customBlack: "rgb(0,0,0)",
        customWhite: "#fcf7f7",
        customBlue: "#128bb5",
        customYellow: "#deb522",
        customGray: "#121212",
      },
      height: {
        128: "32rem",
      },
      fontFamily: {
        roboto: ["Roboto", "sans"],
      },
    },
  },
  plugins: [],
};
