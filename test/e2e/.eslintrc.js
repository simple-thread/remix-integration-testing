/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  overrides: [
    {
      files: ["**/*.ts"],
      rules: {
        "jest/valid-expect": 0,
        "jest/valid-expect-in-promise": 0,
      },
    },
  ],
};
