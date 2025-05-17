const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // 'border-t-pricingCard-green',
    // 'border-t-pricingCard-blue',
    // 'border-t-pricingCard-purple',
    // 'fill-pricingCard-green',
    // 'fill-pricingCard-blue',
    // 'fill-pricingCard-purple',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "chat-background": "url('/assets/background/chat-background.png')"
      },
      colors: {
        txt: {
            orange: "#C26616",
            gray: "#999EA6",
        //   black: "#120F43",
        //   blue: "#603CFF",
        //   darkBlue: "#1B2559",
        //   gray: "#CACfd8",
        //   lightGray: "#828282",
        //   softGray: "#E0E5F2",
        //   columnTitle: "#B2B6C7",
        //   darkGray: "#718096",
        //   purple: "#8470FF",
        //   darkPurple: "#4A25E1"
        },
        main: {
          orange: "#E07416",
          darkOrange: "#C26616",
          darkGray: "#3C3C3C",
          red: "#E01616",
        },
        button: {
          danger: {
            DEFAULT: "#D14343",
            hover: "#AB3737",
            disabled: "#E05353",
          },
          chatOption: {
            lightGray: "#F4F7FEB3",
          }
        },
        accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        //   purple: "#8470FF",
        //   blueGray: "#7090B033",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          darkGray: "#718096",
          purple: "#4A25E1",
          lightLilac: "#F2EFFF",
          lightPurple: "#7B5AFF",
          lightGray: "#F4F7FE",
          violet: "#CACAFF",
          lightViolet: "#FBFBFF",
          shadow: "#F7F9FB",
        },
        border: {
          default: "#E9EDF7",
          gray: "#E0E0E0",
          lightGray: "#E0E5F2",
          whisperGray: "#E2E8F0B3",
          input: "#E2E8F0",
        },
        popOver: {
          background: {
            DEFAULT: "#ECE6F0",
            hover: "#D8D3DB",
          },
          lightPurple: "#EADDFF",
          text: {
            purple: "#21005D",
          },
          horizontalRule: "#DDD7E2",
        },
        pricingCard: {
          green: "#4BD37D",
          blue: "#7BC8FF",
          purple: "#9C8CFF",
          black: "#111827",
          text: {
            white: "#F3F4F6",
          }
        },
      },
      boxShadow: {
        default: "4px 17px 40px 4px rgba(112, 144, 176, 0.11)",
        purple: "0 21px 27px -10px rgba(96, 60, 255, 0.48)",
        modelSwitcher: "14px 27px 45px 4px rgba(112, 144, 176, 0.2)",
        aiChat: "14px 12px 45px 4px rgba(112, 144, 176, 0.2)",
      },
      fontSize: {
        xxs: "10px"
      },
      keyframes: {
        "code-1": {
          "0%": { opacity: "0" },
          "2.5%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "code-2": {
          "16.2%": { opacity: "0" },
          "18.75%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "code-3": {
          "32.5%": { opacity: "0" },
          "35%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "code-4": {
          "48.75%": { opacity: "0" },
          "51.25%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "code-5": {
          "65%": { opacity: "0" },
          "72.5%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "code-6": {
          "81.25%": { opacity: "0" },
          "83.75%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        breath: {
          "0%, 100%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5%)" },
        },
        line: {
          "0%, 100%": { left: "0", opacity: "0" },
          "50%": { left: "100%", transform: "translateX(-100%)" },
          "10%, 40%, 60%, 90%": { opacity: "0" },
          "25%, 75%": { opacity: "1" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
