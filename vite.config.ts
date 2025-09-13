import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
    root: './', // Root directory of the project
    publicDir: 'public', // Directory for static assets
    plugins: [react(), tailwindcss(), glsl()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        host: true, // Open to local network and display URL
        // open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env) // Open if it's not a CodeSandbox
        port: 5174 // Default port for development server
    },
    build: {
        outDir: 'dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: false, // Disable sourcemaps in production for smaller bundles
        minify: 'terser', // Use terser for better minification
        chunkSizeWarningLimit: 1000, // Increase warning limit
        cssMinify: 'esbuild', // Use esbuild for CSS minification (faster and more aggressive)
        cssCodeSplit: true, // Split CSS into separate files for better caching
        rollupOptions: {
            output: {
                // Code splitting configuration
                manualChunks: (id) => {
                    // Vendor and library chunks
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) return 'vendor'
                        if (id.includes('three') || id.includes('@react-three')) return 'three'
                        if (id.includes('gsap')) return 'gsap'
                        if (
                            id.includes('react-hook-form') ||
                            id.includes('@hookform/resolvers') ||
                            id.includes('zod')
                        )
                            return 'forms'
                        if (
                            id.includes('react-spinners') ||
                            id.includes('react-hot-toast') ||
                            id.includes('react-responsive') ||
                            id.includes('react-countup')
                        )
                            return 'ui'
                    }
                    // Split your own code by folder
                    if (id.includes('/src/components/')) return 'components'
                    if (id.includes('/src/sections/')) return 'sections'
                    if (id.includes('/src/hooks/')) return 'hooks'
                    if (id.includes('/src/constants/')) return 'constants'
                    if (id.includes('/src/gsap/')) return 'gsap-custom'
                    if (id.includes('/src/api/')) return 'api'
                    if (id.includes('/src/schemas/')) return 'schemas'
                    if (id.includes('/src/types')) return 'types'
                    // fallback: let Vite/Rollup decide
                },
                // Optimize chunk naming
                chunkFileNames: (chunkInfo) => {
                    const facadeModuleId = chunkInfo.facadeModuleId
                        ? chunkInfo.facadeModuleId.split('/').pop()
                        : 'chunk'
                    return `js/${facadeModuleId}-[hash].js`
                }
            }
        },
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.log statements
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
            }
        }
    }
})
