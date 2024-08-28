import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import fixReactVirtualized from "esbuild-plugin-react-virtualized";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./testConfig.ts"],
    coverage: {
      provider: "v8",
      exclude: [...(configDefaults.coverage.exclude || []), "*.config.ts"],
      all: true,
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
});
