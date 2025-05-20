/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dynamic theme colors
        'background': 'var(--color-background)',
        'foreground': 'var(--color-foreground)',
        'accent': 'var(--color-accent)',
        'heading': 'var(--color-heading)',
        'secondary': 'var(--color-secondary)',
      },
      fontFamily: {
        sans: ['Inter', 'San Francisco', 'SF Pro Text', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      transitionTimingFunction: {
        'in-out-circ': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}