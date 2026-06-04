/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#f472b6',
          lavender: '#c084fc',
          fuchsia: '#e879f9',
          void: '#0d0d1a',
          dark: '#12101f',
        }
      },
      boxShadow: {
        glow: '0 0 28px rgba(232, 121, 249, 0.35)',
        'glow-lg': '0 0 60px rgba(232, 121, 249, 0.25)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 121, 249, 0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(232, 121, 249, 0.8)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        ticker: 'ticker 25s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;