import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.js.org/config/
export default defineConfig({
  plugins: [react()],
  base: '/pilatesstudiophuket/',
  server: {
    port: 4000,
    strictPort: false,
    host: true
  }
})
