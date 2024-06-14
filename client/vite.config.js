import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Change this to a valid IP address if needed
    port: 5173, // Optional otherwise your app will start on default po
  },
})