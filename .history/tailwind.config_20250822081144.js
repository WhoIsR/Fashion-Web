/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-text': '#2A2A2A',
        'brand-purple-dark': '#4A3F6D',
        'brand-purple-light': '#D6CDE8',
        'brand-pink': '#E8CDE0',
        
        'dark-background': '#1A1A1A',
        'dark-card': '#252525',
        'dark-border': '#3A3A3A',
        'dark-text': '#F1F1F1',
        'dark-primary': '#C0B5E0',
        'dark-secondary': '#E0B5D1',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      animation: {
        'gradient-flow': 'gradient-flow 8s ease infinite',
        'bounce-gentle': 'bounce-gentle 2s infinite',
      },
      keyframes: {
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        }
      },
      backgroundSize: {
        '200%': '200% 200%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('preline/plugin'),
  ],
};
