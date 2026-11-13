import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E11D48",
          redDark: "#BE123C",
          lime: "#84CC16",
          limeDark: "#65A30D",
          slate: "#0F172A",
          slateLight: "#1E293B",
          darkBg: "#090D16",
          darkCard: "#111827",
        },
      },
    },
  },
  plugins: [],
};

export default config;
