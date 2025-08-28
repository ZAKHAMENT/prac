/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,       // allows using `expect` without import
    environment: 'jsdom', // DOM environment for React
    setupFiles: './src/setupTests.js', // optional
  },
})
