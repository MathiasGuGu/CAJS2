/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",

  content: ["./modules/**/*.{html,js}", "./posts/**/*.{html,js}", "./*.html"],
  theme: {
    extend: {
      colors: {
        theme_dark: "#363062",
        theme_light: "#4D4C7D",
        theme_orange: "#F99417",
        bg: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
