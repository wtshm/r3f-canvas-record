import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'useCanvasRecorder',
      fileName: 'useCanvasRecorder',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [react()],
});
