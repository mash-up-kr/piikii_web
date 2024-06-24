import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontSize: {
      "black-22": ["22px", { lineHeight: "140%", fontWeight: 900 }],
      "black-16": ["16px", { lineHeight: "150%", fontWeight: 900 }],
      "bold-24": ["24px", { lineHeight: "140%", fontWeight: 700 }],
      "bold-22": ["22px", { lineHeight: "140%", fontWeight: 700 }],
      "bold-20": ["20px", { lineHeight: "140%", fontWeight: 700 }],
      "bold-18": ["18px", { lineHeight: "150%", fontWeight: 700 }],
      "bold-16": ["16px", { lineHeight: "150%", fontWeight: 700 }],
      "bold-15": ["15px", { lineHeight: "150%", fontWeight: 700 }],
      "bold-14": ["14px", { lineHeight: "150%", fontWeight: 700 }],
      "bold-12": ["12px", { lineHeight: "150%", fontWeight: 700 }],
      "bold-11": ["11px", { lineHeight: "150%", fontWeight: 700 }],
      "bold-10": ["10px", { lineHeight: "150%", fontWeight: 700 }],
      "semibold-34": ["34px", { lineHeight: "140%", fontWeight: 600 }],
      "semibold-24": ["24px", { lineHeight: "140%", fontWeight: 600 }],
      "semibold-22": ["22px", { lineHeight: "140%", fontWeight: 600 }],
      "semibold-20": ["20px", { lineHeight: "140%", fontWeight: 600 }],
      "semibold-18": ["18px", { lineHeight: "150%", fontWeight: 600 }],
      "semibold-16": ["16px", { lineHeight: "150%", fontWeight: 600 }],
      "semibold-15": ["15px", { lineHeight: "150%", fontWeight: 600 }],
      "semibold-14": ["14px", { lineHeight: "150%", fontWeight: 600 }],
      "semibold-12": ["12px", { lineHeight: "150%", fontWeight: 600 }],
      "semibold-11": ["11px", { lineHeight: "150%", fontWeight: 600 }],
      "semibold-10": ["10px", { lineHeight: "150%", fontWeight: 600 }],
      "medium-24": ["24px", { lineHeight: "140%", fontWeight: 500 }],
      "medium-22": ["22px", { lineHeight: "140%", fontWeight: 500 }],
      "medium-20": ["20px", { lineHeight: "140%", fontWeight: 500 }],
      "medium-18": ["18px", { lineHeight: "150%", fontWeight: 500 }],
      "medium-16": ["16px", { lineHeight: "150%", fontWeight: 500 }],
      "medium-15": ["15px", { lineHeight: "150%", fontWeight: 500 }],
      "medium-14": ["14px", { lineHeight: "150%", fontWeight: 500 }],
      "medium-12": ["12px", { lineHeight: "150%", fontWeight: 500 }],
      "medium-11": ["11px", { lineHeight: "150%", fontWeight: 500 }],
      "medium-10": ["10px", { lineHeight: "150%", fontWeight: 500 }],
      "regular-24": ["24px", { lineHeight: "140%", fontWeight: 400 }],
      "regular-22": ["22px", { lineHeight: "140%", fontWeight: 400 }],
      "regular-20": ["20px", { lineHeight: "140%", fontWeight: 400 }],
      "regular-18": ["18px", { lineHeight: "150%", fontWeight: 400 }],
      "regular-16": ["16px", { lineHeight: "150%", fontWeight: 400 }],
      "regular-15": ["15px", { lineHeight: "150%", fontWeight: 400 }],
      "regular-14": ["14px", { lineHeight: "150%", fontWeight: 400 }],
      "regular-12": ["12px", { lineHeight: "150%", fontWeight: 400 }],
      "regular-11": ["11px", { lineHeight: "150%", fontWeight: 400 }],
      "regular-10": ["10px", { lineHeight: "150%", fontWeight: 400 }],
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
