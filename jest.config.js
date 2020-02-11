module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/__tests__/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"],
  testURL: "http://localhost/",
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  globals: {
    "ts-jest": {
      babelConfig: true,
      diagnostics: false,
    },
  },
  setupFiles: ["jest-localstorage-mock", "<rootDir>/__tests__/unit/setup.js"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/unit/jest.setup.js"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/.coverage",
  collectCoverageFrom: ["src/**/*.{ts,vue}", "!**/node_modules/**"],
  coverageReporters: ["json", "lcov", "text", "clover", "html"],
};
