const nextJest = require('next/jest');
 
/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
});

const config = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

module.exports = createJestConfig(config);
