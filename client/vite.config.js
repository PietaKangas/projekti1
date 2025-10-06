import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    force: true,
    include: [
      'react',
      'react-dom',
      'bootstrap',
      'react-bootstrap',
      'react-bootstrap/Form',
      'react-bootstrap/Button',
      'react-bootstrap/Card',
      '@restart/hooks',
      '@restart/ui',
      'uncontrollable'
    ]
  },
  server: {
    port:3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  }
})
