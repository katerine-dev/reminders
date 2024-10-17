import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// Convertendo 'import.meta.url' para um caminho de sistema de arquivos
const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define o alias para src/assets
      "@assets": `${__dirname}/src/assets`,
    },
  },
});
