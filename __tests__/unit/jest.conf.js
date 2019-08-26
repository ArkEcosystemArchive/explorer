const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  verbose: true,
  testURL: 'http://localhost/',
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '\\.(svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/unit/coverage',
    '<rootDir>/__tests__/unit/jest.conf.js',
    '<rootDir>/__tests__/unit/jest.setup.js',
    '<rootDir>/__tests__/unit/setup.js',
    '<rootDir>/__tests__/unit/__mocks__',
    '<rootDir>/__tests__/unit/__utils__',
    '<rootDir>/__tests__/e2e'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFilesAfterEnv: [
    '<rootDir>/__tests__/unit/jest.setup.js'
  ],
  setupFiles: ['jest-localstorage-mock', '<rootDir>/__tests__/unit/setup'],
  coverageDirectory: '<rootDir>/__tests__/unit/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ]
}
