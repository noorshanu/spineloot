
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        casino: {
          bg: "#0B0A10",
          panel: "#151320",
          red: "#E11D48",
          gold: "#F5C451",
          green: "#22C55E",
          blue: "#60A5FA"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(226, 29, 72, 0.35)",
        gold: "0 0 40px rgba(245, 196, 81, 0.35)"
      },
      backgroundImage: {
        'grid': "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        'radial-red': "radial-gradient(800px circle at 20% 20%, rgba(225,29,72,0.15), transparent 40%)",
        'radial-gold': "radial-gradient(600px circle at 80% 0%, rgba(245,196,81,0.18), transparent 40%)"
      }
    },
  },
  plugins: [],
}
