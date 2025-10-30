/** @type {import('tailwindcss').Config} */
export default {
  // Tala om för Tailwind vilka filer den ska skanna efter klassnamn
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Skannar alla dina komponent-filer
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
