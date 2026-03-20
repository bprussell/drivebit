import { defineConfig } from "unocss";
import presetWind3 from "@unocss/preset-wind3";

export default defineConfig({
  presets: [presetWind3()],
  theme: {
    colors: {
      primary: "#4CAF50",
      accent: "#FF5722",
      night: "#3F51B5",
      surface: "#16213E",
      bg: "#1A1A2E",
    },
  },
});
