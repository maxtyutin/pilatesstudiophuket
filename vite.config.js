import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.js.org/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2015',
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      input: {
        main: './index.template.html'
      },
      output: {
        // single JS chunk
        inlineDynamicImports: true,
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/index.js',
        assetFileNames: (info) => {
          if (info.name && info.name.endsWith('.css')) return 'assets/index.css'
          return 'assets/[name][extname]'
        }
      }
    }
  },
  server: {
    port: 4000,
    strictPort: false,
    host: true
  }
})
