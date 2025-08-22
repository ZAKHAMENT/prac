/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,       // ✅ enables describe/test/expect
    environment: "jsdom", // ✅ for React Testing Library
    setupFiles: "./src/setupTests.js",
  },
});
