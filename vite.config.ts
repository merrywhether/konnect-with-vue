import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: [
          '$bp-sm: 768px;', // mobile → tablet
          '$bp-md: 1024px;', // tablet → desktop
          '$bp-lg: 1200px;', // desktop → wide
        ].join('\n'),
      },
    },
  },
  server: {
    open: true,
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
})
