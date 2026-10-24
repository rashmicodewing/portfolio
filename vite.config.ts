import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' keeps every emitted asset path relative, so the build works
// whether Pages serves it from a domain root or a /portfolio subpath.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false },
})
