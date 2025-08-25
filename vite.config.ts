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
        },
        // Fix React conflicts - enhanced for all React ecosystem packages
        dedupe: ['react', 'react-dom', 'react/jsx-runtime']
    },
    server: {
        host: true,
        port: 5174
    },

    // Enhanced esbuild configuration for maximum optimization
    esbuild: {
        // Remove console logs and debugger statements in production
        drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],

        // Remove comments for smaller bundle
        legalComments: 'none',

        // Target modern browsers for better optimization
        target: 'es2020',

        // Additional esbuild optimizations
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,

        // Tree shaking optimization
        treeShaking: true,

        // Define replacements for better dead code elimination
        define: {
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
        }
    },

    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false, // Disable for production performance

        // Use Vite's latest browser target for optimal performance
        target: 'baseline-widely-available', // Chrome 107+, Edge 107+, Firefox 104+, Safari 16+

        // Use esbuild minification (faster than Terser, nearly same compression)
        minify: 'esbuild',

        // CSS minification
        cssMinify: 'esbuild', // Fast CSS minification

        // Enhanced chunking for better performance and caching
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        // React core - changes rarely
                        if (id.includes('react') || id.includes('react-dom')) {
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

                        // Development tools
                        if (id.includes('leva') || id.includes('merge-value')) {
                            return 'dev-tools'
                        }

                        // UI libraries
                        if (id.includes('framer-motion') || id.includes('react-responsive')) {
                            return 'ui-vendor'
                        }

                        // Other vendor libraries
                        return 'vendor'
                    }
                },
                // Organized asset structure
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    const name = assetInfo.name ?? ''
                    const info = name.split('.')
                    const ext = info[info.length - 1]
                    if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(name)) {
                        return `assets/images/[name]-[hash].${ext}`
                    }
                    if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
                        return `assets/fonts/[name]-[hash].${ext}`
                    }
                    if (/\.(css)$/i.test(name)) {
                        return `assets/css/[name]-[hash].${ext}`
                    }
                    return `assets/[name]-[hash].${ext}`
                }
            }
        },

        // Performance settings
        chunkSizeWarningLimit: 1000, // 1MB for 3D assets
        assetsInlineLimit: 4096, // 4KB inline threshold

        // Additional build optimizations
        reportCompressedSize: true,
        copyPublicDir: true
    },

    // Enhanced dependency optimization
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
            'attr-accept',
            'leva',
            'merge-value'
        ],
        exclude: [],
        force: true,
        esbuildOptions: {
            target: 'es2020',
            // Additional optimization options
            minifyIdentifiers: true,
            minifySyntax: true,
            treeShaking: true
        }
    },

    define: {
        global: 'globalThis',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
    }
})
