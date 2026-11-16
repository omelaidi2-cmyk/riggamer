/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#08090b',
        surface: {
          DEFAULT: '#0e1014',
          dim: '#0b0d12',
          container: '#181c25',
          low: '#12141a',
          high: '#1a1d24',
          highest: '#2b3140',
        },
        lime: { accent: '#ccff00', hover: '#b8e600' },
        brand: { DEFAULT: '#ff5500', orange: '#ff5500', dark: '#e04a00' },
        muted: '#8a909a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        headline: ['"Space Grotesk"', 'sans-serif'],
      }
    }
  },
  plugins: []
};
