import jsse from "@jsse/eslint-config";

export default jsse({
  typescript: {
    strict: true,
    tsconfig: ["tsconfig.json", "tsconfig.eslint.json"]
  },
  ignores: ["src/gen/glyphs_pb.ts"],
  sortImports: true,
  vitest: true,
});
