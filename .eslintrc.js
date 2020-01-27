module.exports = {
  root: true,

  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    project: "./tsconfig.json",
    extraFileExtensions: [".vue"],
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
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    //indent: ["error", 2],
    quotes: ["error", "double"],
    "prettier/prettier": "error",
  },
};
