/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom portfolio colors
        'bg-dark': '#060A13',
        'surface': '#0A1120',
        'surface-hover': '#0F1929',
        'border-custom': '#1A2540',
        'border-hover': '#2A3A5C',
        'text-primary': '#E8EDF5',
        'text-secondary': '#7B8BA8',
        'text-tertiary': '#4A5A78',
        'cyan': {
          DEFAULT: '#00D4FF',
          dim: '#00A3CC',
        },
        'purple': {
          accent: '#7B61FF',
          dim: '#5A42CC',
        },
        'green': {
          accent: '#00E5A0',
          dim: '#00B37A',
        },
        'blue-accent': '#4D8CFF',
        'amber-accent': '#FFB800',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"SF Mono"', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        'card': '16px',
        'button': '8px',
        'pill': '20px',
        'image': '12px',
        'nav': '24px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 212, 255, 0.06)',
        'cyan-glow': '0 0 20px rgba(0, 212, 255, 0.15)',
        'purple-glow': '0 0 20px rgba(123, 97, 255, 0.12)',
        'green-glow': '0 0 20px rgba(0, 229, 160, 0.12)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "nodePulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.8)", opacity: "1" },
        },
        "ringPulse": {
          "0%": { r: "var(--base-r)", opacity: "0.4" },
          "100%": { r: "calc(var(--base-r) * 4)", opacity: "0" },
        },
        "scrollPulse": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(24px)", opacity: "0" },
        },
        "rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "dotPulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "nodeTimelinePulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(0, 212, 255, 0.4)" },
          "100%": { boxShadow: "0 0 0 8px rgba(0, 212, 255, 0)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "node-pulse": "nodePulse 3s ease-in-out infinite",
        "scroll-pulse": "scrollPulse 2s ease-in-out infinite",
        "rotate-slow": "rotate 20s linear infinite",
        "dot-pulse": "dotPulse 2s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
        "node-timeline": "nodeTimelinePulse 2s ease-out infinite",
        "shimmer": "shimmer 0.6s ease",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
