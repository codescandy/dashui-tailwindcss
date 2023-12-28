/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
   darkMode: "class",
   content: ["./src/**/*.html"],
   theme: {
      fontFamily: {
         sans: ['"Inter", sans-serif'],
      },
      fontSize: {
         sm: "0.75rem",
         base: "0.875rem",
         lg: "1.125rem",
         xl: "1.5rem",
         "2xl": "1.875rem",
         "3xl": "2.25rem",
         "4xl": "2.441rem",
         "5xl": "3.052rem",
      },

      extend: {
         typography: (theme) => ({
            DEFAULT: {
               css: {
                  color: "#637381",
                  a: {
                     color: "#637381",
                     "&:hover": {
                        color: "#624BFF",
                     },
                  },
               },
            },
         }),

         colors: {
            gray: {
               100: "#f1f5f9",
               200: "#f4f6f8",
               300: "#dfe3e8",
               400: "#c4cdd5",
               500: "#919eab",
               600: "#637381",
               700: "#454f5b",
               800: "#212b36",
               900: "#161c24",
            },
            indigo: {
               600: "#624bff",
               800: "#5340d9",
            },
         },
      },
   },
   variants: {},
   plugins: [
      require("@tailwindcss/forms")({
         strategy: "base", // only generate global styles
      }),
      require("@tailwindcss/typography"),
   ],
};
