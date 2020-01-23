module.exports = {
  root: true,

  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    project: "./tsconfig.json",
  },

  env: {
    browser: true,
    node: true,
  },

  globals: {
    GIT_DATE: true,
    GIT_VERSION: true,
  },

  plugins: ["@typescript-eslint", "prettier"],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],

  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
  },
};
