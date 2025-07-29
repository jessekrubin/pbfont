import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  format: ["cjs", "esm"],
  dts: true,
  minify: false,
  outDir: "dist",
  sourcemap: false,
  clean: true,
  treeshake: true,
  tsconfig: "./tsconfig.json",
});
