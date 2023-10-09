import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx,mts,mjs,cjs}', './components/**/*.{js,jsx,ts,tsx,mts,mjs,cjs}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
