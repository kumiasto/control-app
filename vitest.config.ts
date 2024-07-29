import { defineConfig } from 'vitest/config';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts'],
  },
});
