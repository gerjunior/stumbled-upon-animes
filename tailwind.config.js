/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkpop: '#222831',
        greypop: '#393e46',
        bluepop: '#00ADB5',
        whitepop: '#EEEEEE',
      },
    },
  },
  plugins: [],
}



