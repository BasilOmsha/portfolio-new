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
            // Force React resolution to single instance - CRITICAL for Leva
            react: path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom')
        },
        // Enhanced deduplication for React consistency
        dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime']
    },
    server: {
        host: true,
        port: 5174
    },

    // Enhanced esbuild configuration
    esbuild: {
        drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [], // Keep console for Leva debugging
        legalComments: 'none',
        target: 'es2020',
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
        treeShaking: true,
        define: {
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
        }
    },

    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: false,
        target: 'es2020',
        minify: 'esbuild',
        cssMinify: 'esbuild',

        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        // React core - Keep as single chunk to prevent conflicts
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'react-vendor'
                        }

                        // Three.js core
                        if (id.includes('three') && !id.includes('@react-three')) {
                            return 'three-core'
                        }

                        // React Three Fiber
                        if (id.includes('@react-three/fiber')) {
                            return 'r3f'
                        }

                        // Drei helpers
                        if (id.includes('@react-three/drei')) {
                            return 'drei'
                        }

                        // Postprocessing
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

                        // Leva and its dependencies - Keep together for consistency
                        if (id.includes('leva') || id.includes('merge-value')) {
                            return 'leva-ui'
                        }

                        // UI libraries
                        if (id.includes('framer-motion') || id.includes('react-responsive')) {
                            return 'ui-vendor'
                        }

                        // Other vendor libraries
                        return 'vendor'
                    }
                },
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

        chunkSizeWarningLimit: 1000,
        assetsInlineLimit: 4096,
        reportCompressedSize: true,
        copyPublicDir: true
    },

    // CRITICAL: Include Leva in optimization for production
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
            // Include Leva for production use
            'leva',
            'merge-value'
        ],
        exclude: [],
        force: true,
        esbuildOptions: {
            target: 'es2020',
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
