/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // azul
        secondary: '#6B7280', // gris
        tertiary: '#10B981', // verde
      },
      typography: {
        // configuración de tipografía si usas @tailwindcss/typography
      },
      maxWidth: {
        '6xl': '1220px',
      },
    },
  },
  plugins: [],
};
