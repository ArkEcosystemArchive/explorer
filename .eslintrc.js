module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue']
  },

  env: {
    browser: true,
    node: true,
    es6: true
  },

  globals: {
    GIT_DATE: true,
    GIT_VERSION: true
  },

  plugins: ['@typescript-eslint', 'prettier', 'vue'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    //'plugin:prettier/recommended',
    //'plugin:vue/recommended'
  ],

  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    //indent: ["error", 2],
    quotes: ['error', 'double'],
    "vue/html-quotes": ["error", "double"],
    'prettier/prettier': 'error',

    /*'vue/html-indent': [
      'error',
      'tab',
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],*/
    'object-curly-spacing': ['error', 'always']
  }
};
