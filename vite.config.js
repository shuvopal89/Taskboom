import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import dotenv from ''

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
