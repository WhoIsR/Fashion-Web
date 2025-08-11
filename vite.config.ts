import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // +++ TAMBAHKAN BAGIAN INI +++
  server: {
    proxy: {
      // Setiap request ke /api akan diteruskan ke backend Anda
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // Opsional: hapus /api dari path sebelum dikirim ke backend
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
  // ++++++++++++++++++++++++++++++

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});