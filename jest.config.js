module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  // setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts']
}
