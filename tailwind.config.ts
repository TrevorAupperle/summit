import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        noto: ["Noto Sans", ...fontFamily.sans],
      },
      colors: {
        Gray: {
          300: "#D1D5DB",
          400: "#9CA3AF",
        },
        Summit: {
          100: "#CAD2C5",
          700: "#354F52",
          900: "#2F3E46",
        },
      },
      boxShadow: {
        lg: "0 2px 4px 0px rgba(82, 121, 111, 0.25)",
      },
    },
  },

  plugins: [],
} satisfies Config;
