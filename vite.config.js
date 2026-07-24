import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.js.org/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  server: {
    port: 4000,
    strictPort: false,
    host: true
  }
})
