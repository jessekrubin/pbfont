import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    minify: false,
    fixedExtension: false,
    outDir: "dist",
    sourcemap: false,
    clean: true,
    treeshake: true,
    tsconfig: "./tsconfig.json",
  },
  {
    entry: ["src/bundle.ts"],
    deps: {
      alwaysBundle: [/^@bufbuild\/protobuf/],
      onlyBundle: [/^@bufbuild\/protobuf/],
    },
    format: ["cjs", "esm"],
    dts: true,
    minify: false,
    fixedExtension: false,
    outDir: "dist",
    sourcemap: false,
    clean: true,
    treeshake: true,
    tsconfig: "./tsconfig.json",
  },
]);
