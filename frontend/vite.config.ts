import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'BACKEND_HOST': JSON.stringify('http://localhost:3000'),
    'FRONTEND_HOST': JSON.stringify('http://localhost:5173'),
    'CLIENT_HOST': JSON.stringify('http://localhost:5000'),
  }
})
