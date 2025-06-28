import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Disable proxy for now since backend is not available
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    // Uncomment and update this when backend is available
    /*
    proxy: {
      '/api': {
        target: 'http://localhost:8181',
        changeOrigin: true,
        secure: false
      }
    }
    */
  }
})
