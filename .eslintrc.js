module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["@typescript-eslint", "prettier", "vue"],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended",
    "@vue/typescript",
    "@vue/prettier",
    "prettier/@typescript-eslint"
  ],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-case-declarations": "off",
    "prefer-spread": "off",
    "no-fallthrough": "off",
    "getter-return": "off",
    "comma-dangle": ["error", "always-multiline"],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
