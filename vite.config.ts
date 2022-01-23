import * as path from "path";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/demo-coin-8891/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
