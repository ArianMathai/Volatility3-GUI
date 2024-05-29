import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
// @ts-ignore
import path from "path";

export default defineConfig({
  plugins: [reactRefresh()],
  root: "./src",
  base: "./",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
