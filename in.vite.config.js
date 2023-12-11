/// <reference types="vite" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https:vitejs.dev/config
export default defineConfig({
  base: "IN_AFADMIN_CLIENT_URL_PUBLIC_BASENAME",
  plugins: [react(), svgr()],
  build: {
    outDir: "IN_BUILDIR",
    target: "es2022",
    sourcemap: true,
    emptyOutDir: true,
  },
});
