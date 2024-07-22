// tailwind.config.js

const { twMerge } = require("tailwind-merge");
const { flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // Extend theme settings if needed
    },
  },
  plugins: [
    // Add other plugins if needed
    addVariablesForColors,
  ],
};

function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
