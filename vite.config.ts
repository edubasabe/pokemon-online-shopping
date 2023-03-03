/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    reporters: "verbose",
    setupFiles: ["./src/tests/setup.ts"],
  },
})
