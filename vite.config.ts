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
        sourcemap: true, // Add sourcemap for debugging
        minify: 'terser', // Use Terser for minification
        terserOptions: {
            parse: {
                ecma: 2020 // Support modern JavaScript syntax
            },
            compress: {
                // Safe compression options for portfolio
                drop_console: true, // Remove console.logs in production
                drop_debugger: true, // Remove debugger statements
                passes: 2, // Multiple compression passes for better results
                pure_funcs: ['console.info', 'console.debug'], // Remove specific console methods
                dead_code: true, // Remove unreachable code
                conditionals: true, // Optimize if statements
                evaluate: true, // Evaluate constant expressions
                sequences: true, // Join consecutive statements
                unused: true, // Remove unused variables
                toplevel: true, // Remove unused top-level code
                // Keep these safe for portfolio
                unsafe: false, // Avoid unsafe optimizations
                keep_infinity: true, // Keep Infinity readable
                reduce_vars: true, // Optimize variable usage
                collapse_vars: true // Collapse single-use variables
            },
            mangle: {
                // Safe mangling for portfolio
                toplevel: true, // Mangle top-level names
                keep_classnames: false, // Mangle class names (safe for most portfolios)
                keep_fnames: false, // Mangle function names (usually safe)
                safari10: true, // Work around Safari 10 bugs
                reserved: ['webkitURL'] // Reserve browser-specific globals if needed
            },
            format: {
                comments: false, // Remove comments
                preserve_annotations: true, // Keep /*@__PURE__*/ for tree shaking
                ecma: 2020, // Use modern output format
                safari10: true // Safari compatibility
            },
            // Portfolio-safe top-level options
            ecma: 2020, // Target modern browsers (good for portfolio)
            keep_classnames: false, // Usually safe to mangle
            keep_fnames: false, // Usually safe to mangle
            safari10: true, // Better browser compatibility
            toplevel: true // Enable top-level optimizations
        }
    }
})
