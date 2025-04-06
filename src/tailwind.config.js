import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "custom-quill",
    "custom-quill/ql-toolbar",
    "custom-quill/ql-container",
    "custom-quill/ql-editor",
    "custom-quill/ql-snow",
    // Optional: kalau mau extra safety untuk hover/active state
    "custom-quill/ql-toolbar/ql-active",
    "custom-quill/ql-toolbar/button:hover",
  ],
  theme: {
    extend: {
      scrollBehavior: ["smooth"],
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
