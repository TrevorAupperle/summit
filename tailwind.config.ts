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
    },
    colors: {
      'Gray/300': '#D1D5DB',
      'Gray/400': '#9CA3AF',
      'Summit/100': '#354F52',
      'Summit/700': '#354F52',
      'Summit/900': '#2F3E46',
      
  
    },
  },
  
  plugins: [],
} satisfies Config;
