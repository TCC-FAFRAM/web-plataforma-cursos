/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  darkMode: 'class', // <--- ESSENCIAL!
  theme: {
    extend: {
      colors: {
        primary: '#2d6d20',
        secondary: '#f1b542',
        accent: '#22c55e',
        danger: '#ef4444',
        warning: '#facc15',
        neutral: '#f3f4f6',
        darkBg: '#1e293b',
        darkText: '#f1f5f9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
