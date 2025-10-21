import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import restart from 'vite-plugin-restart'

export default defineConfig({
    root: './',
    publicDir: 'public',
    plugins: [restart({ restart: ['./public/**'] }), react(), tailwindcss(), glsl()],
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
        sourcemap: false,
        minify: 'terser',
        chunkSizeWarningLimit: 1000,
        cssMinify: 'lightningcss', // Rolldown default CSS minifier
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                // Rolldown-compatible chunk grouping
                advancedChunks: {
                    groups: [
                        { name: 'vendor', test: /\/react(?:-dom)?/ },
                        { name: 'three', test: /three|@react-three/ },
                        { name: 'gsap', test: /gsap/ },
                        { name: 'forms', test: /react-hook-form|zod/ },
                        {
                            name: 'ui',
                            test: /react-spinners|react-hot-toast|react-responsive|react-countup/
                        },
                        { name: 'components', test: /src\/components/ },
                        {
                            name: 'heroExperienceMain',
                            test: /src\/components\/models\/hero-experience\//
                        },
                        {
                            name: 'heroExperienceBoneFire1',
                            test: /src\/components\/models\/hero-experience\/boneFire/
                        },
                        {
                            name: 'heroExperienceBoneFire2',
                            test: /src\/components\/models\/hero-experience\/boneFire\/fire/
                        },
                        {
                            name: 'heroExperienceBoneFire3',
                            test: /src\/components\/models\/hero-experience\/boneFire\/materials/
                        },
                        {
                            name: 'materials',
                            test: /src\/components\/models\/hero-experience\/materials/
                        },
                        { name: 'types', test: /src\/components\/models\/hero-experience\/types/ },
                        { name: 'sections', test: /src\/sections/ },
                        { name: 'hooks', test: /src\/hooks/ },
                        { name: 'constants', test: /src\/constants/ },
                        { name: 'api', test: /src\/api/ },
                        { name: 'schemas', test: /src\/schemas/ },
                        { name: 'types', test: /src\/types/ },
                        { name: 'gsapCustom', test: /src\/gsap/ }
                    ]
                },
                chunkFileNames: (chunkInfo) => {
                    const facadeModuleId = chunkInfo.facadeModuleId
                        ? chunkInfo.facadeModuleId.split('/').pop()
                        : 'chunk'
                    return `js/${facadeModuleId}-[hash].js`
                }
            }
        },
        // Rolldown-compatible minifier config
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.log statements
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
            },
            format: {
                comments: false, // Remove comments
                beautify: false // Ensure output is not pretty-printed
            }
        }
    },
    experimental: {
        enableNativePlugin: 'v1' // Use native Rust-based plugins for better performance
    }
})
