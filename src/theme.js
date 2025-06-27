// theme.js
import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  theme: {
    tokens: {
      colors: {
        primary: { DEFAULT: "#FDBA74" }, // Soft peach-orange
        accent: { DEFAULT: "#FCD9B8" }, // Light pastel orange
        secondary: { DEFAULT: "#FCA17D" }, // Muted coral-orange
        background: { DEFAULT: "#FFF8F1" }, // Warm white with orange tint
        surface: { DEFAULT: "#FFF1E6" }, // Light creamy background
        text: { DEFAULT: "#5C3D2E" }, // Rich brown for contrast
        muted: { DEFAULT: "#FEECDC" }, // Pale orange for borders/muted text
      },
    },
  },
});

const customSystem = createSystem(defaultConfig, config);

export default customSystem;
