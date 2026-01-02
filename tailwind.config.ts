import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // DESIGN SYSTEM "ATELIER CÉLESTE"
        // Palette Luxe & Fibre
        // ═══════════════════════════════════════════════════════════════
        
        pearlescent: "#f5f2eb", // Was #fcfaf7 - Darkened slightly for warmth and reduced glare
        silk: "#ffffff",
        gold: {
          DEFAULT: "#b89350", // Was #c5a059 - Slightly deeper gold for better contrast
          filament: "#b89350",
          glow: "rgba(184, 147, 80, 0.15)",
        },
        slate: {
          deep: "#0a0a0a", // Was #1a1a1a - Near black for higher contrast
        },
        
        // Aliases pour compatibilité
        primary: {
          DEFAULT: "#b89350",
          50: '#f5f2eb',
          500: '#b89350',
          900: '#0a0a0a',
        },
        secondary: {
          DEFAULT: "#0a0a0a",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },

      boxShadow: {
        'soft': '0 20px 50px rgba(0,0,0,0.05)',
      },

      animation: {
        'move-lines': 'moveLines 10s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },

      keyframes: {
        moveLines: {
          'from': { transform: 'translateY(-10%)', opacity: '0.2' },
          'to': { transform: 'translateY(10%)', opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;