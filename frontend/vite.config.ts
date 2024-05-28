import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
    plugins: [reactRefresh()],
    root: './src',
    base: './', // Use relative paths for assets
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'src/index.html'),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
