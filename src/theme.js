// theme.js
import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { DEFAULT: "#111827" },
        accent: { DEFAULT: "#3B82F6" },
        secondary: { DEFAULT: "#EC4899" },
        background: { DEFAULT: "#F9FAFB" },
        surface: { DEFAULT: "#FFFFFF" },
        text: { DEFAULT: "#374151" },
        muted: { DEFAULT: "#D1D5DB" },
      },
    },
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
  },
});

const customSystem = createSystem(defaultConfig, config);

export default customSystem;
