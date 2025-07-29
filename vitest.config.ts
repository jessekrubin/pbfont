import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    // reporters: ['verbose'],
    coverage: {
      provider: "v8",
    },
    include: ["{src,dist}/**/*.test.{js,jsx,ts,tsx}"],
    exclude: [
      "**/node_modules/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
    ],
  },
});
