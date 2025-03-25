import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
