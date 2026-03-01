/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
        sans:    ['DM Sans', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#f97316',
          dark:    '#ea580c',
          dim:     'rgba(249,115,22,0.12)',
        },
        gold: {
          DEFAULT: '#fbbf24',
        },
        btc: '#f97316',
      },
      borderRadius: {
        card:  '14px',
        card2: '16px',
        btn:   '10px',
        badge: '6px',
        pill:  '999px',
      },
      boxShadow: {
        'accent-sm': '0 4px 18px rgba(249,115,22,0.32)',
        'accent-md': '0 8px 28px rgba(249,115,22,0.42)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.4)',
        'logo':      '0 0 16px rgba(249,115,22,0.35)',
      },
      animation: {
        'fade-in':    'opwaFadeIn 0.4s ease both',
        'fade-in-up': 'opwaFadeInUp 0.4s ease both',
        'pulse-dot':  'opwaPulse 2s infinite',
      },
      keyframes: {
        opwaFadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        opwaFadeInUp: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        opwaPulse:    { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
      spacing: {
        'navbar': '64px',
      },
      maxWidth: {
        'page': '1200px',
      },
    },
  },
  plugins: [],
}
