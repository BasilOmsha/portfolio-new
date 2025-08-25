import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
    root: './',
    publicDir: 'public',
    plugins: [react(), tailwindcss(), glsl()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        host: true,
        port: 5174
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false, // Disable in production for better performance

        // Bundle optimization
        rollupOptions: {
            output: {
                // Split chunks for better caching and loading
                manualChunks: {
                    // Large 3D libraries
                    three: ['three', '@react-three/fiber', '@react-three/drei'],
                    postprocessing: ['@react-three/postprocessing', 'postprocessing'],
                    // Animation library
                    gsap: ['gsap'],
                    // React core
                    react: ['react', 'react-dom'],
                    // Development tools (only in dev)
                    utils: ['leva']
                },
                // Optimize chunk naming
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        },

        // Advanced minification
        minify: 'terser',
        terserOptions: {
            compress: {
                // Remove console logs in production
                drop_console: true,
                drop_debugger: true,
                // Additional optimizations
                pure_funcs: ['console.log', 'console.info'],
                passes: 2
            },
            mangle: {
                // Mangle property names for smaller bundles
                properties: {
                    regex: /^_/
                }
            }
        },

        // Increase chunk size warning limit for 3D assets
        chunkSizeWarningLimit: 1000,

        // Optimize asset handling
        assetsInlineLimit: 4096 // Inline assets smaller than 4KB
    },

    // Add this section to handle problematic modules
    define: {
        global: 'globalThis'
    }
})
