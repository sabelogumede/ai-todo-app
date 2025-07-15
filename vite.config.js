import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/ai-todo-app",
  server: {
    port: 3000,
    open: true,
    host: true, // Allows access from network
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Set to true if you want source maps in production
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  // Optional: Add path resolution for cleaner imports
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },
});
