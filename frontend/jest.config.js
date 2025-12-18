module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@layouts/(.*)$': '<rootDir>/src/app/layouts/$1',
    '^@mock/(.*)$': '<rootDir>/src/mock/data/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.svg$': 'jest-transform-stub',
    '\\.svg(\\?react)?$': '<rootDir>/src/mock/svgMock.ts',
    '^@uiw/react-md-editor$': '<rootDir>/__mocks__/@uiw/react-md-editor.js',
    '^@uiw/react-markdown-preview$': '<rootDir>/__mocks__/@uiw/react-markdown-preview.js',
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Removed transformIgnorePatterns to force Jest to transform all node_modules (ESM compatibility)
};
