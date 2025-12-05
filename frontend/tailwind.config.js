/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './state/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#f4f7fb',
        sidebar: '#121826',
        border: '#e5e7eb',
        accent: '#6c5ce7',
        accentSoft: '#e9e5ff',
        card: '#ffffff',
        muted: '#6b7280'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15,23,42,0.08)'
      }
    }
  },
  plugins: []
};
