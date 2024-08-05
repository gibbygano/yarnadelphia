import { type Config } from "tailwindcss";
import daisyUi from "npm:daisyui";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  //@ts-expect-error reason: daisyUi type error
  plugins: [daisyUi],
} satisfies Config;
