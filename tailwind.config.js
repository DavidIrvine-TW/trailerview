

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors : {
        'primary': '#cfcfcf',
        'primary-light' : '#eeeeee',
        'primary-dark' : '#898989',
        'secondary' : '#0F172A',
        'secondary-light' : '#626880',
        'surface' : '#fafafa',
        'blood' : '#FC4747',
        'background' : '#212121',
        'background-light': '#e0e0e0',
        'lightgray'  : '#e0e0e0',
      },
      fontSize: {
        'heading-lg': '2rem',
        'heading-md': '1.5rem',
        'heading-sm': '1.5rem',
        'heading-xs': '1.25rem',
        'body-md': '0.9375rem',
        'body-sm': '0.8125rem',
      },
      
      fontFamily : {
        roboto : ['Roboto', 'Sans-serif']
      },
      screens: {
        mb: '375px', 
        tb : '600px',
        dk: '900px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      animation: {
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
      },
    },
  },
  plugins: [],
}
