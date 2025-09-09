/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // ערכת צבעים Luxe - יוקרתית ומתוחכמת
        luxe: {
          // צבע עיקרי כהה וחם
          primary: '#2A3934', // luxe-1 - ירוק כהה מתוחכם
          // צבע אקסנט חם ומזמין
          accent: '#D67D65', // luxe-2 - אדום חם ונעים
          // צבע משני עמוק
          secondary: '#2E4B46', // luxe-3 - ירוק עמוק יותר
          // צבע עדין ורך
          soft: '#ECAA92', // luxe-4 - ורוד-אפרסק עדין
          // צבע רקע כהה ועשיר
          background: '#263946', // luxe-5 - כחול-אפור כהה
        },
        // שמירה על תאימות לאחור - עדכון למיפוי החדש
        cream: '#F5F5F5', // רקע בהיר
        ink: {
          DEFAULT: '#2A3934', // luxe-primary
          heading: '#2A3934', // luxe-primary
          light: '#2E4B46', // luxe-secondary
        },
        accent: {
          DEFAULT: '#D67D65', // luxe-accent
          dark: '#ECAA92', // luxe-soft
        },
        highlight: '#ECAA92', // luxe-soft
      },
      fontFamily: {
        'playpen': ['Playpen Sans Hebrew', 'Playpen Sans', 'sans-serif'],
        'sans': ['Playpen Sans Hebrew', 'Playpen Sans', 'system-ui', 'sans-serif']
      },
      fontSize: {
        // טיפוגרפיה מותאמת למובייל ונגישות
        'xs': ['14px', { lineHeight: '1.8' }],
        'sm': ['16px', { lineHeight: '1.8' }], // מינימום 16px במובייל
        'base': ['18px', { lineHeight: '1.8' }],
        'lg': ['20px', { lineHeight: '1.8' }],
        'xl': ['24px', { lineHeight: '1.7' }],
        '2xl': ['30px', { lineHeight: '1.6' }],
        '3xl': ['36px', { lineHeight: '1.5' }],
        '4xl': ['48px', { lineHeight: '1.4' }],
        '5xl': ['60px', { lineHeight: '1.3' }],
      },
      spacing: {
        // ריווח נדיב
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        // רדיוסים רכים
        'card': '20px',
        'section': '24px',
      },
      boxShadow: {
        // צללים רכים
        'soft': '0 6px 24px rgba(0,0,0,0.06)',
        'card': '0 8px 32px rgba(0,0,0,0.08)',
        'focus': '0 0 0 3px rgba(245, 162, 25, 0.3)', // focus ring נגיש
      },
      animation: {
        // אנימציות עדינות בלבד
        'fadeIn': 'fadeIn 240ms ease-out',
        'slideUp': 'slideUp 180ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      screens: {
        // Mobile First breakpoints
        'xs': '475px',
      },
    },
  },
  plugins: [
    // פלאגין לנגישות - מנטרל אנימציות עבור prefers-reduced-motion
    function({ addUtilities }) {
      addUtilities({
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
          },
        },
      })
    }
  ],
}
