import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    reporters: process.env.GITHUB_ACTIONS ? ['basic', 'github-actions'] : ['basic'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
})