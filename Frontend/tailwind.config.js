/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // We define our custom "Brand" palette here
        cyber: {
          dark: "#020617",
          emerald: "#10b981",
          blue: "#3b82f6",
          slate: "#94a3b8",
        },
      },
      animation: {
        // A custom "Scanning" animation for your Hero/Scanner sections
        scan: "scan 3s linear infinite",
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        scan: {
          "0%": { top: "0%", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
      },
      backgroundImage: {
        // This creates that cool technical grid background
        "cyber-grid":
          "linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
