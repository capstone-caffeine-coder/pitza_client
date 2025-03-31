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
      },
    },
  },
  plugins: [],
};
