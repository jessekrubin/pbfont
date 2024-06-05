import jsse from "@jsse/eslint-config";

export default jsse(
  {
    typescript: {
      tsconfig: ["tsconfig.json", "tsconfig.eslint.json"],
    },
    off: ["new-cap"],
  },
  {
    files: ["src/gen/*.ts"],
    rules: {
      "unicorn/filename-case": "off",
      "eslint-comments/no-unlimited-disable": "off",
      "unicorn/no-abusive-eslint-disable": "off",
    },
  },
);
