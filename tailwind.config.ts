import type { Config } from 'tailwindcss';
import tailwindCssAnimated from 'tailwindcss-animated';

export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#3718A6',
          DEFAULT: '#5C39D9',
        },
      },
    },
  },
  plugins: [tailwindCssAnimated],
} satisfies Config;
