/// <reference types="vite" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const __STATIC_ENV__ = {
  MODE: "IN_MODE",
  NODE_ENV: "IN_NODE_ENV",
  LOGLEVEL: "IN_LOGLEVEL",
  DEVICE_ID: "IN_DEVICE_ID",
  AFADMIN_SERVER_URL: "IN_AFADMIN_SERVER_URL_ORIGIN",
  AFADMIN_SERVER_URL_WS: "IN_AFADMIN_SERVER_URL_ORIGIN_WS",
};

// https:vitejs.dev/config
export default defineConfig({
  define: {
    __STATIC_ENV__,
  },
  base: "IN_AFADMIN_CLIENT_URL_PUBLIC_BASENAME",
  plugins: [react(), svgr()],
  build: {
    outDir: "IN_BUILDIR",
    target: "es2022",
    sourcemap: true,
    emptyOutDir: true,
  },
});
