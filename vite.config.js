import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    proxy: {
      '/api': 'http://math.yzzx.org/',
      '/upload': {
        target: 'http://store.yzzx.org/',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
