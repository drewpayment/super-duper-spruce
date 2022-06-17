/* eslint-disable */
export default {
  displayName: 'super-duper-spruce-api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/super-duper-spruce-api',
  setupFiles: [
    './tests/jest.setup.ts',
  ],
};
