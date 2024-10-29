import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/reminders/",
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": `${__dirname}/src/assets`,
    },
  },
});
