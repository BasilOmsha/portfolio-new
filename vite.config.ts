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
            '@': path.resolve(__dirname, './src'),
            // Force React resolution to prevent multiple instances
            react: path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom')
        },
        // Enhanced deduplication for React
        dedupe: ['react', 'react-dom', 'react/jsx-runtime']
    },
    server: {
        host: true,
        port: 5174
    },

    // esbuild configuration goes at root level, not inside build
    esbuild: {
        // Remove console logs and debugger statements
        drop: ['console', 'debugger'],

        // Remove comments
        legalComments: 'none',

        // Target modern browsers
        target: 'es2020'
    },

    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false, // Disable for production performance

        // Use esbuild minification (default, but explicit)
        minify: 'esbuild',

        // Modified chunking to keep Leva with React
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        // Keep Leva in the same chunk as React to prevent context issues
                        if (
                            id.includes('react') ||
                            id.includes('react-dom') ||
                            id.includes('leva') ||
                            id.includes('merge-value')
                        ) {
                            return 'react-vendor'
                        }

                        // Three.js core - stable, large library
                        if (id.includes('three') && !id.includes('@react-three')) {
                            return 'three-core'
                        }

                        // React Three Fiber - bridge between React and Three.js
                        if (id.includes('@react-three/fiber')) {
                            return 'r3f'
                        }

                        // Drei helpers - frequently updated, many utilities
                        if (id.includes('@react-three/drei')) {
                            return 'drei'
                        }

                        // Postprocessing - effects and shaders, can be large
                        if (
                            id.includes('@react-three/postprocessing') ||
                            id.includes('postprocessing')
                        ) {
                            return 'postprocessing'
                        }

                        // Animation library
                        if (id.includes('gsap')) {
                            return 'gsap'
                        }

                        // Other vendor libraries
                        return 'vendor'
                    }
                },
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        },

        // Performance settings
        chunkSizeWarningLimit: 1000,
        assetsInlineLimit: 4096
    },

    // Enhanced optimizeDeps with specific React handling
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            'three',
            '@react-three/fiber',
            '@react-three/drei',
            '@react-three/postprocessing',
            'postprocessing',
            'gsap',
            'prop-types',
            'attr-accept'
        ],
        exclude: [],
        // Force dependency optimization to ensure consistent React context
        force: true,
        // Add esbuildOptions for better compatibility
        esbuildOptions: {
            target: 'es2020',
            // Ensure proper JSX handling
            jsx: 'automatic'
        }
    },

    define: {
        global: 'globalThis',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }
})
