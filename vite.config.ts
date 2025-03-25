import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/api_rugby_events/",
  plugins: [tailwindcss()],
});
