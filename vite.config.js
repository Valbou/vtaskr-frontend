import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { svelteTesting } from '@testing-library/svelte/vite'


export default defineConfig({
    plugins: [svelte(), svelteTesting()],
    resolve: {
        conditions: ['browser']
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest-setup.js']
    }
})
