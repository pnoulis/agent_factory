/// <reference types="vite" />
/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const __STATIC_ENV__ = {
  MODE: process.env.MODE,
  NODE_ENV: process.env.NODE_ENV,
  LOGLEVEL: process.env.LOGLEVEL,
  AFADMIN_SERVER_URL_ORIGIN_WS: process.env.AFADMIN_SERVER_URL_ORIGIN_WS,
  AFADMIN_CLIENT_URL_PUBLIC_BASENAME:
    process.env.AFADMIN_CLIENT_URL_PUBLIC_BASENAME,
  AFADMIN_MYSQLDB_URL: process.env.AFADMIN_MYSQLDB_URL,
  DEVICE_ADMIN_SCREEN_ID: process.env.DEVICE_ADMIN_SCREEN_ID,
  DEVICE_RPI_READER_ID: process.env.DEVICE_RPI_READER_ID,
};

// https:vitejs.dev/config
export default defineConfig({
  define: {
    __STATIC_ENV__,
  },
  mode: __STATIC_ENV__.MODE,
  base: __STATIC_ENV__.AFADMIN_CLIENT_URL_PUBLIC_BASENAME,
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
    include: [
      ...configDefaults.include,
      "**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
    exclude: [...configDefaults.exclude, "setupFile.js", "taskTemplate.js"],
    setupFiles: "tests/setupFile.js",
    fileParallelism: false, // Run tests sequentially
    dir: "./tests",
    watch: false,
    globals: true,
    environment: "node",
    testTimeout: 6000, // 6 seconds
    reporter: "verbose",
    poolOptions: {
      threads: {
        singleThread: true,
        isolate: false,
      },
    },
  },
});
