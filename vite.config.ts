import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import glsl from "vite-plugin-glsl"

export default defineConfig({
  root: "./", // Root directory of the project
  publicDir: "public", // Directory for static assets
  plugins: [react(), tailwindcss(), glsl()],
  server: {
    host: true // Open to local network and display URL
    // open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env) // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true // Add sourcemap
  }
})
