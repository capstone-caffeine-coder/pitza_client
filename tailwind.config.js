/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        destructive: "var(--color-destructive)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        lightRose: "var(--color-lightRose)",
        softPeach: "var(--color-softPeach)",
        warmCoral: "var(--color-warmCoral)",
        cherryBlossom: "var(--color-cherryBlossom)",
        sunsetRed: "var(--color-sunsetRed)",
        deepCrimson: "var(--color-deepCrimson)",
        mutedRose: "var(--color-mutedRose)",
        subText: "var(--color-subText)",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        orbit: {
          "0%": {
            transform: "rotate(0deg) translateX(100px) rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg) translateX(100px) rotate(-360deg)", // 자기 회전 포함
          },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        orbit: "orbit 1s linear infinite",
        "spin-slow": "spinSlow 1s linear infinite",
      },
    },
  },
  plugins: [],
};
