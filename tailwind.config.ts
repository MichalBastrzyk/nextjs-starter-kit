import { withTV } from "tailwind-variants/transformer"
import type { Config } from "tailwindcss"

const config: Config = withTV({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
})

export default config