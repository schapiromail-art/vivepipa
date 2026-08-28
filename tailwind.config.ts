import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        sand: {
          50: "#FBF8F4",
          100: "#F5EEE5",
          200: "#EADCC9",
          300: "#DCC5A6",
          400: "#C9A87C",
        },
        clay: {
          400: "#A57F55",
          500: "#8C6642",
          600: "#6B3F3F",
          700: "#54312F",
          800: "#3A2321",
          900: "#231615",
        },
        ocean: {
          400: "#3E7C7B",
          500: "#2E6362",
          600: "#1F4746",
        },
        ink: "#1A1513",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.12)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "slow-zoom": "slow-zoom 18s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
