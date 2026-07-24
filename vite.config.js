import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.js.org/config/
export default defineConfig({
  plugins: [
    react(), 
    viteSingleFile({ removeOptionalDependencies: true })
  ],
  base: './',
  build: {
    target: 'es2015',
    cssCodeSplit: false,
    modulePreload: false,
    assetsInlineLimit: 100000000,
  },
  server: {
    port: 4000,
    strictPort: false,
    host: true
  }
})
