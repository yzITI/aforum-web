import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({ script: { refSugar: true } })],
  base: './',
  server: {
    proxy: {
      '/api': 'http://discuss.yzzx.org/',
      // '/api': 'http://localhost:3001/',
      '/upload': {
        target: 'http://store.yzzx.org/',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
