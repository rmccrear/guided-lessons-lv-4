import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Sets the base path to relative './' which ensures assets load correctly
  // regardless of the repository name on GitHub Pages.
  base: './', 
  define: {
    // We use JSON.stringify to correctly replace the variable with a string literal
    // This targets the specific key to avoid overwriting the entire process.env object
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
})