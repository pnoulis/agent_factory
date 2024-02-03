/// <reference types="vite" />
/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const __STATIC_ENV__ = {
  MODE: "IN_MODE",
  NODE_ENV: "IN_NODE_ENV",
  LOGLEVEL: "IN_LOGLEVEL",
  DEVICE_ID: "IN_DEVICE_ID",
  AFADMIN_SERVER_URL_ORIGIN: "IN_AFADMIN_SERVER_URL_ORIGIN",
  AFADMIN_SERVER_URL_ORIGIN_WS: "IN_AFADMIN_SERVER_URL_ORIGIN_WS",
  AFADMIN_CLIENT_URL_PUBLIC_BASENAME: "IN_AFADMIN_CLIENT_URL_PUBLIC_BASENAME",
  AFADMIN_MYSQLDB_URL: "IN_AFADMIN_MYSQLDB_URL",
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
  server: {
    watch: {
      ignored: ["**/.env", "!**/src/**"],
    },
  },
  test: {
    // ...
    include: [...configDefaults.include, "*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [...configDefaults.exclude, "setupFile.js", "taskTemplate.js"],
    setupFiles: "tests/setupFile.js",
    fileParallelism: false, // Run tests sequentially
    dir: "./tests",
    watch: false,
    globals: true,
    environment: "node",
    testTimeout: 3000, // 3 seconds
    reporter: "verbose",
    poolOptions: {
      threads: {
        singleThread: true,
        isolate: false,
      },
    },
  },
});
