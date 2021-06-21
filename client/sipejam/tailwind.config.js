module.exports = {
  purge: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      primary: "#9AC8C8",
      secondary: "#7DC8C8",
      danger: "#e3342f",
    }),
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#9AC8C8",
      secondary: "#7DC8C8",
    }),
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      boxShadow: {
        out: "0 2 2px #383838",
      },
      textColor: {
        primary: "#878D98",
        secondary: "4F4F4F",
        bg: "#9AC8C8",
      },
      width: {
        wrapper: "95%",
      },
      dropShadow: {
        nav: "0, 2, 2px, #383838",
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      backgroundImage: (theme) => ({
        "all-system": "url('/images/all-system.png')",
        sistem: "url('/images/sistem.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
