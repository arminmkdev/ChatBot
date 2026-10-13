import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset({ target: "18" })],
    }),
  ],
  server: {
    port: 5173,
    // I'm using Proxy to solve CORS warning.
    // proxy: { "/chat": "http://localhost:8000" },
  },
});
