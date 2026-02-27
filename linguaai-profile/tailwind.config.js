/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#137fec',
        'bg-light': '#f6f7f8',
        'bg-dark': '#101922',
        'card-dark': '#1a2632',
      },
    },
  },
  plugins: [],
}
