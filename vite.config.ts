import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_COUNTRIES_API_KEY': JSON.stringify(
      process.env.VITE_REACT_APP_COUNTRIES_API_KEY
    ),
    'process.env.REACT_APP_GOOGLE_MAPS_API_KEY': JSON.stringify(
      process.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY
    ),
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/assets/scss/_variables.scss';
          @import './src/assets/scss/_base.scss';
          @import './src/assets/scss/_font.scss';
        `,
      },
    },
  },
});
