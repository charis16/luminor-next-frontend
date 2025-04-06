import { heroui } from "@heroui/theme";

const herouiColors = {
  // Default
  "default-50": "hsl(var(--heroui-default-50))",
  "default-100": "hsl(var(--heroui-default-100))",
  "default-200": "hsl(var(--heroui-default-200))",
  "default-300": "hsl(var(--heroui-default-300))",
  "default-400": "hsl(var(--heroui-default-400))",
  "default-500": "hsl(var(--heroui-default-500))",
  default: "hsl(var(--heroui-default))",
  "default-foreground": "hsl(var(--heroui-default-foreground))",

  // Foreground
  foreground: "hsl(var(--heroui-foreground))",

  // Primary
  "primary-50": "hsl(var(--heroui-primary-50))",
  "primary-100": "hsl(var(--heroui-primary-100))",
  "primary-200": "hsl(var(--heroui-primary-200))",
  "primary-300": "hsl(var(--heroui-primary-300))",
  "primary-400": "hsl(var(--heroui-primary-400))",
  "primary-500": "hsl(var(--heroui-primary-500))",
  primary: "hsl(var(--heroui-primary))",
  "primary-foreground": "hsl(var(--heroui-primary-foreground))",

  // Secondary
  secondary: "hsl(var(--heroui-secondary))",
  "secondary-foreground": "hsl(var(--heroui-secondary-foreground))",

  // Success
  success: "hsl(var(--heroui-success))",
  "success-foreground": "hsl(var(--heroui-success-foreground))",

  // Warning
  warning: "hsl(var(--heroui-warning))",
  "warning-foreground": "hsl(var(--heroui-warning-foreground))",

  // Danger
  danger: "hsl(var(--heroui-danger))",
  "danger-foreground": "hsl(var(--heroui-danger-foreground))",
};

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
      colors: {
        heroui: herouiColors,
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({})],
};
