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

        // Set build target for better optimization
        target: 'es2020', // Modern browsers for better performance

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

        // Use Terser for better compression
        minify: 'terser',
        terserOptions: {
            // ECMAScript target - use 2020 for modern features
            ecma: 2020,

            // Enable top-level optimizations
            toplevel: true,

            // Compress options
            compress: {
                // Remove console logs in production
                drop_console: true,
                drop_debugger: true,

                // Additional optimizations
                pure_funcs: ['console.log', 'console.info', 'console.warn'],

                // Multiple passes for better compression
                passes: 3,

                // Remove dead code
                dead_code: true,

                // Inline functions when beneficial
                inline: 2,

                // Optimize loops
                loops: true,

                // Remove unused code
                unused: true,

                // Evaluate constant expressions
                evaluate: true,

                // Join consecutive var statements
                join_vars: true,

                // Optimize property access
                properties: true
            },

            // Mangle options for smaller output
            mangle: {
                // Mangle top-level names
                toplevel: true,

                // Preserve certain function names if needed
                keep_fnames: false,
                keep_classnames: false,

                // Mangle properties (be careful with this)
                properties: {
                    regex: /^_/ // Only mangle properties starting with underscore
                }
            },

            // Format options
            format: {
                // Remove comments
                comments: false,

                // Compact output
                beautify: false,

                // Remove unnecessary semicolons
                semicolons: false,

                // Optimize ASCII output
                ascii_only: false
            }
        },

        // Increase chunk size warning limit for 3D assets
        chunkSizeWarningLimit: 1000,

        // Optimize asset handling
        assetsInlineLimit: 4096, // Inline assets smaller than 4KB

        // Enable compressed size reporting for optimization feedback
        reportCompressedSize: true
    },

    // Add this section to handle problematic modules
    define: {
        global: 'globalThis',
        // Define NODE_ENV for better dead code elimination
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }
})
