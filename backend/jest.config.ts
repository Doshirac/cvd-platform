/** @type {import('jest').Config} */
const config = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": ["@swc/jest"],
    "^.+\\.js$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  setupFiles: ["dotenv/config", "reflect-metadata"],
};

module.exports = config;
