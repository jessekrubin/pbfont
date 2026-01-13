import jsse from "@jsse/eslint-config";

export default jsse({
  typescript: {
    tsconfig: ["tsconfig.json", "tsconfig.eslint.json"],
  },
  ignores: ["src/gen/glyphs_pb.ts"],
  off: [],
});
