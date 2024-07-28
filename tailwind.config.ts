import type { Config } from "tailwindcss";

type PluginAPI = {
  addUtilities: (
    utilities: Record<string, object>,
    options?: { respectPrefix?: boolean; respectImportant?: boolean }
  ) => void;
};

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
          50: "#FFF7F2",
          100: "#FFF1EB",
          150: "#FFEAE1",
          200: "#FFD7C2",
          700: "#FF601C",
          800: "#DD4808",
          900: "#BF3900",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          700: "#363A3C",
          800: "#292E31",
          900: "#1E2427",
          like: {
            50: "#FBF9FF",
            100: "#F4EFFF",
            200: "#E5DAFF",
            700: "#9C61FF",
            800: "#7F47DD",
            900: "#622DBC",
          },
          dislike: {
            100: "#FEF1F2",
            200: "#FFD6D9",
            700: "#FF5B5B",
            800: "#EC3737",
            900: "#C92525",
          },
        },
        neutral: {
          0: "#FFFFFF",
          100: "#F9FAFB",
          200: "#F0F1F5",
          300: "#E7E8EB",
          400: "#B5B9C6",
          500: "#8B95A1",
          600: "#747B89",
          700: "#3F444D",
          800: "#23272F",
          900: "#1B1F27",
          1000: "#0A0D14",
        },
        warning: {
          700: "#FAD167",
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
        landing: {
          background: "#1B1F27",
          food: "#F9AC8B",
          dessert: "#D4ABE7",
          beer: "#9CD2F0",
          play: "#ACAEF1",
        },
      },
      boxShadow: {
        l: "0px 20px 36px 0px rgba(139, 149, 161, 0.10)",
        s: "0px 6px 20px 0px rgba(139, 149, 161, 0.10)",
        xl: "0px 20px 36px 0px rgba(139, 149, 161, 0.10);",
      },
      borderRadius: {
        "2xl": "25px",
        xl: "20px",
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
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".scrollbar-hide": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
} satisfies Config;

export default config;
