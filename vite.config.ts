import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Đặt base path cho GitHub Pages nếu repo không phải là <username>.github.io
  base: process.env.GITHUB_ACTIONS ? '/minhduc5a15/' : '/',
})
