import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  format: ["cjs", "esm"],
  dts: true,
  minify: false,
  outDir: "dist",
  sourcemap: true,
  clean: true,
  treeshake: false,
  tsconfig: "./tsconfig.json",
});
