import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // You can change the port if needed
    port: 5173, // Default for Vite, can be modified to any available port
  },
  resolve: {
    alias: {
      '@components': '/src/components', // You can set aliases for easier imports
      '@pages': '/src/pages',
    },
  },
});
