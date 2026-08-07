import { defineConfig } from "tsdown";
import type { UserConfig } from "tsdown/config";

const CORE_OPTIONS = {
    format: ["cjs", "esm"],
    dts: true,
    minify: false,
    fixedExtension: false,
    outDir: "dist",
    sourcemap: false,
    clean: true,
    treeshake: true,
    tsconfig: "./tsconfig.build.json",
    attw: { profile: "node16" },
} as const satisfies UserConfig;

export default defineConfig([
  {
    ...CORE_OPTIONS,
    entry: "src/index.ts",
  },
  {
    ...CORE_OPTIONS,
    entry: "src/bundle.ts",
    deps: {
      alwaysBundle: [/^@bufbuild\/protobuf/],
      onlyBundle: [/^@bufbuild\/protobuf/],
    },
    minify: true,
  },
]);
