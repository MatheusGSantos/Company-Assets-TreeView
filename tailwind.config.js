/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        blue: {
          lighter: "#F2F8FF",
          light: "#55A6FF",
          primary: "#2188FF",
          secondary: "#023B78",
          dark: "#17192D",
        },

        gray: {
          lightest: "#E3EAEF",
          light: "#D8DFE6",
          medium: "#88929C",
          darker: "#77818C",
          darkest: "#24292F",
        },

        red: {
          primary: "#ED3833",
        },

        green: {
          primary: "#52C41A",
        },

        placeholder: "#C1C9D2",
      },
    },
  },
  plugins: [],
};
