import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'neue-haas-grotesk': ['Neue Haas Grotesk Display Pro', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },

        'primary-50': 'hsl(var(--primary-50))',
        'primary-75': 'hsl(var(--primary-75))',
        'primary-100': 'hsl(var(--primary-100))',
        'primary-200': 'hsl(var(--primary-5200))',
        'primary-300': 'hsl(var(--primary-300))',
        'primary-400': 'hsl(var(--primary-400))',
        'primary-500': 'hsl(var(--primary-500))',

        'neutral-0': 'hsl(var(--neutral-0))',
        'neutral-10': 'hsl(var(--neutral-10))',
        'neutral-20': 'hsl(var(--neutral-20))',
        'neutral-30': 'hsl(var(--neutral-30))',
        'neutral-40': 'hsl(var(--neutral-40))',
        'neutral-50': 'hsl(var(--neutral-50))',
        'neutral-60': 'hsl(var(--neutral-60))',
        'neutral-70': 'hsl(var(--neutral-70))',
        'neutral-80': 'hsl(var(--neutral-80))',
        'neutral-90': 'hsl(var(--neutral-90))',
        'neutral-100': 'hsl(var(--neutral-100))',
        'neutral-200': 'hsl(var(--neutral-200))',
        'neutral-300': 'hsl(var(--neutral-300))',
        'neutral-400': 'hsl(var(--neutral-400))',
        'neutral-500': 'hsl(var(--neutral-500))',
        'neutral-600': 'hsl(var(--neutral-600))',
        'neutral-700': 'hsl(var(--neutral-700))',
        'neutral-800': 'hsl(var(--neutral-800))',
        'neutral-900': 'hsl(var(--neutral-900))',

        'success-100': 'hsl(var(--success-100))',
        'success-200': 'hsl(var(--success-200))',
        'success-300': 'hsl(var(--success-300))',

        'warning-100': 'hsl(var(--warning-100))',
        'warning-200': 'hsl(var(--warning-200))',
        'warning-300': 'hsl(var(--warning-300))',

        'error-100': 'hsl(var(--error-100))',
        'error-200': 'hsl(var(--error-200))',
        'error-300': 'hsl(var(--error-300))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
