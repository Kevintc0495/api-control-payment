import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  passWithNoTests: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/application/useCases/**/*.ts",
    "src/application/utils/**/*.ts",
    "src/application/exceptions/**/*.ts",
    "src/infrastructure/utils/**/*.ts",
  ],
};

export default config;
