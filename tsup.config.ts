import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  format: ["cjs", "esm"],
  dts: true,
  // watch: 'src/',
  minify: true,
  outDir: "dist",
  sourcemap: true,
  clean: true,
  treeshake: true,
  tsconfig: "./tsconfig.json",
});
