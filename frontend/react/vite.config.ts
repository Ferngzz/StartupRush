import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/startup': 'http://localhost:3000',
      '/tournament': 'http://localhost:3000',
      '/battle': 'http://localhost:3000'
    }
  }
})
