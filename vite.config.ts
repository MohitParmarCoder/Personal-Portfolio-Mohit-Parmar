import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://mohitparmarcoder.github.io/Personal-Portfolio-Mohit-Parmar/
// Override with BASE_PATH=/ when building for a custom domain or local preview.
const base = process.env.BASE_PATH ?? '/Personal-Portfolio-Mohit-Parmar/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
