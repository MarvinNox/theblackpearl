import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Додаткові налаштування для зручності
  server: {
    port: 3000,
    open: true, // автоматично відкриває браузер
  },

  build: {
    outDir: "dist",
    sourcemap: true,
  },

  resolve: {
    alias: {
      "@": "/src", // щоб можна було використовувати import '@/components/...'
    },
  },
});
