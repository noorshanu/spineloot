
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        astro: {
          bg: "#0B0B2A",
          panel: "#1A1A4A",
          primary: "#00D4FF",
          secondary: "#FF6B9D",
          accent: "#FFD93D",
          success: "#4ECDC4",
          warning: "#FFA726",
          danger: "#FF5252",
          dark: "#0A0A1F",
          light: "#E8F4FD",
          space: "#2C3E50",
          cosmic: "#8E44AD"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 212, 255, 0.35)",
        neon: "0 0 40px rgba(255, 107, 157, 0.35)",
        cosmic: "0 0 40px rgba(255, 217, 61, 0.35)",
        space: "0 0 40px rgba(78, 205, 196, 0.35)"
      },
      backgroundImage: {
        'grid': "radial-gradient(circle at 1px 1px, rgba(0,212,255,0.1) 1px, transparent 0)",
        'radial-primary': "radial-gradient(800px circle at 20% 20%, rgba(0,212,255,0.15), transparent 40%)",
        'radial-secondary': "radial-gradient(600px circle at 80% 0%, rgba(255,107,157,0.18), transparent 40%)",
        'radial-accent': "radial-gradient(500px circle at 50% 50%, rgba(255,217,61,0.12), transparent 40%)",
        'cosmic-gradient': "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(255,107,157,0.1), rgba(255,217,61,0.1))",
        'space-bg': "radial-gradient(ellipse at center, rgba(0,212,255,0.1) 0%, rgba(255,107,157,0.05) 50%, transparent 100%)"
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'orbit': 'orbit 8s linear infinite',
        'twinkle': 'twinkle 1.5s infinite alternate',
        'rocket': 'rocket 20s linear infinite',
        'planet-spin': 'planet-spin 15s linear infinite'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,212,255,0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(0,212,255,0.8), 0 0 60px rgba(0,212,255,0.3)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(50px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(50px) rotate(-360deg)' }
        },
        twinkle: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0.3', transform: 'scale(0.8)' }
        },
        rocket: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(0deg)' }
        },
        'planet-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}
