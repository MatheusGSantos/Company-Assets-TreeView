import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

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
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
});
