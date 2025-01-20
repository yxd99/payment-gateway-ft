import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import EnvironmentPlugin from 'vite-plugin-environment';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), EnvironmentPlugin('all')],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@store': path.resolve(__dirname, './src/store'),
            '@features': path.resolve(__dirname, './src/features'),
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
});
