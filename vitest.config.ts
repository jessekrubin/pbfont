import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    // reporters: ['verbose'],
    coverage: {
      provider: "v8",
    }
  },
});
