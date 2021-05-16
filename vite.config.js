import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://46.101.154.24:80/',
        ws: true,
        changeOrigin: true
      },
      '/upload': {
        target: 'http://store.yzzx.org/',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
