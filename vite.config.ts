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
                manualChunks: {
                    // Vendor chunk for React and core libraries
                    vendor: ['react', 'react-dom'],
                    // Three.js and related libraries
                    three: [
                        'three',
                        '@react-three/fiber',
                        '@react-three/drei',
                        '@react-three/postprocessing'
                    ],
                    // GSAP animation library
                    gsap: ['gsap', '@gsap/react'],
                    // Form and validation libraries
                    forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
                    // UI and utility libraries
                    ui: ['react-spinners', 'react-hot-toast', 'react-responsive', 'react-countup'],
                    components: [
                        './src/components/contact/ContactForm.tsx',
                        './src/components/counter/AnimatedCounter.tsx',
                        './src/components/glow-card/GlowCard.tsx',
                        './src/components/loaders/AdvancedLoader.tsx',
                        './src/components/models/contact/Computer.tsx',
                        './src/components/models/contact/ContactExperience.tsx',
                        './src/components/models/hero-experience/Experience.tsx',
                        './src/components/models/hero-experience/ExperienceButton.tsx',
                        './src/components/models/hero-experience/Nature.tsx',
                        './src/components/models/hero-experience/boneFire/Fire.tsx',
                        './src/components/models/hero-experience/boneFire/fire/Fire.tsx',
                        './src/components/models/hero-experience/boneFire/material/Material.tsx',
                        './src/components/models/hero-experience/materials/materials.tsx',
                        './src/components/models/hero-experience/types/types.ts',
                        './src/components/project-chapter/ProjectChapter.tsx',
                        './src/components/tech-icons/ASPDotNETCore.tsx',
                        './src/components/tech-icons/TechIconCardExperience.tsx',
                        './src/components/title-header/TitleHeader.tsx'
                    ],
                    sections: [
                        './src/sections/contact/Contact.tsx',
                        './src/sections/experience/Experience.tsx',
                        './src/sections/footer/Footer.tsx',
                        './src/sections/hero/Hero.tsx',
                        './src/sections/nav-bar/NavBar.tsx',
                        './src/sections/projects/Projects.tsx',
                        './src/sections/tech-stack/TechStack.tsx'
                    ],
                    hooks: ['./src/hooks/useCollisionDetection.ts'],
                    constants: ['./src/constants/index.ts'],
                    gsapCustom: ['./src/gsap/heroAnimation.ts'],
                    api: ['./src/api/index.ts', './src/api/contact-service.ts'],
                    schemas: ['./src/schemas/contactForm.ts'],
                    types: ['./src/types.d.ts']
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
