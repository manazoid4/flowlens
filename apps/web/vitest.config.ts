import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@flowlens/capture-core": path.resolve(__dirname, "../../packages/capture-core/src/index.ts"),
      "@flowlens/workflow-intelligence": path.resolve(__dirname, "../../packages/workflow-intelligence/src/index.ts"),
      "@flowlens/ai": path.resolve(__dirname, "../../packages/ai/src/index.ts"),
      "@flowlens/exports": path.resolve(__dirname, "../../packages/exports/src/index.ts"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
    },
  },
});
