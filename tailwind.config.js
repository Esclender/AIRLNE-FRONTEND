/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT"


module.exports = withMT(
  {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'hero-pattern': "url('/src/assets/cornered-stairs.svg')"
        },
        backgroundColor:{
          'hero':'rgb(108, 116, 128)'
        },
        boxShadow: {
          'neon': '0px 90px 99px 23px rgb(107 114 128)',
        },
        colors: {
          'hero':'rgb(108, 116, 128)'
        }
      },
    },
    plugins: [],
  }
)

