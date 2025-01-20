export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
  rootDir: './',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@features/(.*)$': '<rootDir>/src/features/$1',
    '@store/(.*)$': '<rootDir>/src/store/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/src/config/envs.ts"
  ], 
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'html', 'text'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
