/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fill:(theme) => ({
      red:theme('colors.red.primary')
    }),
    colors: {
      white: "#ffffff",
      blue: {
        medium: "#005c98",
      },
      black:{
        light:'#262626',
        faded:'#00000059'
      },
      gray: {
        base: "#616161",
        background: "#fafafa",
        primary: "#dbdbdb",
      },
      red: {
        base:"#ff0000",
        primary: "#ed4956",
      },
    },
  },
  plugins: [],
};
