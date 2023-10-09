import type { Config } from 'tailwindcss'
import { fonts, serifFonts } from './app/theme';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx,mts,mjs,cjs}', './components/**/*.{js,jsx,ts,tsx,mts,mjs,cjs}'],
  theme: {
    fontFamily: {
      sans: fonts,
      serif: serifFonts,
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
