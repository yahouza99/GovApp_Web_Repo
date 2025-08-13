/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      '../node_modules/preline/dist/*.js',
    ],
    theme: {
      extend: {
        keyframes:{
          slidein:{
            from:{
              opacity:"0",
              transform:"translateY(-10px)",
            },
            to:{
              opacity:"1",
              transform:"translateY(0px)",
            },
          },
          bannerpan: {
            '0%': { backgroundPosition: '50% 50%' },
            '50%': { backgroundPosition: '55% 45%' },
            '100%': { backgroundPosition: '50% 50%' },
          },
        },
        animation:{
          slidein:"slidein 1s ease var(--slidein-delay,0) forwards",
          bannerpan: "bannerpan 18s ease-in-out infinite",
        },
      },
    },
    plugins: [
      require('preline/plugin'),
    ],
  }