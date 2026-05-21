import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, 'dist-vite'),
        rollupOptions: {
            input: path.resolve(__dirname, 'test-entry.js'),
        },
    },
});
