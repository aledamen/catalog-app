/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        carbon: "#171717",
        graphite: "#262626",
        line: "#E5E5E5",
        mist: "#F5F5F5",
        accent: "#2CC8E0",
        "accent-deep": "#169FB6",
        // dark mode palette
        "dk-base":     "#151A28",
        "dk-surface":  "#1C2337",
        "dk-elevated": "#232B42",
        "dk-border":   "#2D3A5C",
      },
      boxShadow: {
        panel: "0 4px 24px rgba(0, 0, 0, 0.06)",
        "panel-hover": "0 12px 40px rgba(44, 200, 224, 0.15)",
        card: "0 2px 12px rgba(0, 0, 0, 0.05)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(23,23,23,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.06) 1px, transparent 1px)",
        "accent-gradient": "linear-gradient(135deg, #2CC8E0 0%, #169FB6 100%)"
      }
    }
  },
  plugins: []
};
