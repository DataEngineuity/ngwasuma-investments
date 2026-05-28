/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#041D1D',
        graphite: '#111817',
        fog: '#F4F6F5',
        limebrand: '#9BE30B',
        moss: '#5A7D00',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(4, 29, 29, 0.12)',
        glow: '0 0 0 1px rgba(155, 227, 11, 0.18), 0 25px 70px rgba(155, 227, 11, 0.16)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
