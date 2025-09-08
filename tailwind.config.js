/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F8F9FF',
          DEFAULT: '#6366F1',
          dark: '#4F46E5'
        },
        secondary: {
          light: '#FFF2F8',
          DEFAULT: '#F3B3D1',
          dark: '#E698C4'
        },
        accent: {
          light: '#F0FFF4',
          DEFAULT: '#B3E5C7',
          dark: '#98D4B0'
        },
        lavender: {
          light: '#FAF8FF',
          DEFAULT: '#E6DDFF',
          dark: '#D4C5FF'
        },
        peach: {
          light: '#FFF8F0',
          DEFAULT: '#FFD4B3',
          dark: '#FFC299'
        },
        mint: {
          light: '#F0FFFA',
          DEFAULT: '#B3F5D1',
          dark: '#99F0C4'
        },
        cream: '#FFFEF7',
        softBlue: '#F0F4FF',
        sage: '#F8FFF8',
        warm: '#FFFAF5'
      },
      fontFamily: {
        'heebo': ['Heebo', 'sans-serif']
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #F3B3D1 0%, #E698C4 100%)',
        'gradient-hero': 'linear-gradient(135deg, #FEFEFE 0%, #F9F9F9 100%)',
        'gradient-soft': 'linear-gradient(135deg, #FCFCFC 0%, #F8F8F8 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FEFEFE 0%, #FAFAFA 100%)',
        'gradient-clay': 'linear-gradient(145deg, #FFFFFF 0%, #F5F5F5 100%)'
      },
      boxShadow: {
        'clay': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
        'clay-inset': 'inset 20px 20px 60px #d1d9e6, inset -20px -20px 60px #ffffff',
        'clay-hover': '25px 25px 75px #c5d0e3, -25px -25px 75px #ffffff',
        'soft': '0 8px 32px rgba(168, 181, 227, 0.12)',
        'soft-hover': '0 12px 40px rgba(168, 181, 227, 0.18)'
      }
    },
  },
  plugins: [],
}
