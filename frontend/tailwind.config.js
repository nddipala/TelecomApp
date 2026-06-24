/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // T-Mobile brand palette
        magenta: {
          DEFAULT: "#E20074",
          dark: "#B30059",
          light: "#FF2A9D"
        },
        ink: "#1A1A1A",
        slate: {
          850: "#1b2433"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};
