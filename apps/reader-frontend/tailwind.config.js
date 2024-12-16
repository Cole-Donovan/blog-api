/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html", // Include the root HTML file
      "./src/**/*.{js,jsx,html}",
    ],
    theme: {
      extend: {
        colors: {
          // Theme color variables
          theme: {
            DEFAULT: 'var(--color-theme-500)',
            100: 'var(--color-theme-100)',
            200: 'var(--color-theme-200)',
            300: 'var(--color-theme-300)',
            400: 'var(--color-theme-400)',
            500: 'var(--color-theme-500)',
            600: 'var(--color-theme-600)',
            700: 'var(--color-theme-700)',
            800: 'var(--color-theme-800)',
            900: 'var(--color-theme-900)',
          },
          // Static colors
          red: '#ff595e',
          orange: '#ff924c',
          yellow: '#ffca3a',
          green: '#8ac926',
          blue: '#1982c4',
          violet: '#6a4c93',
          dark: '#1c1917',
          light: '#f5f5f4',
        },
        fontFamily: {
          inter: '"Inter", sans-serif;',
        },
      },
    },
    safelist: [
      'bg-dark', 'bg-light', 'bg-red', 'bg-orange', 'bg-yellow', 'bg-green', 'bg-blue', 'bg-violet',
    ],
    plugins: [],
  }
  