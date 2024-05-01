/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      'background-color': 'var(--background-color)',
      'primary-color': 'var(--primary-color)',
      'color-faded': 'var(--color-faded)',
      'bg-card': 'var(--bg-card)',
      'color-success': 'var(--color-success)',
      'color-danger': 'var(--color-danger)',
    },
  },
  plugins: [],
}
