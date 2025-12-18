// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import storybook from 'eslint-plugin-storybook';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unicorn from 'eslint-plugin-unicorn';
import react from 'eslint-plugin-react';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      unicorn,
    },
    rules: {
      camelcase: ['error', { properties: 'always' }],
      'new-cap': ['error', { newIsCap: true, capIsNew: false }],
      'react/jsx-pascal-case': ['error', { allowAllCaps: false, ignore: [] }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variableLike',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
      ],
    },
  },

  {
    files: [
      'src/shared/api/*.{ts,tsx}',
      'src/shared/hooks/*.{ts,tsx}',
      'src/shared/utils/*.{ts,tsx}',
      'src/shared/assets/*.{svg,png,jpg,jpeg,gif,webp}',
      'src/assets/*.{svg,png,jpg,jpeg,gif,webp}',
      'public/*.{svg,png,jpg,jpeg,gif,webp}',
    ],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
    },
  },

  {
    files: ['src/pages/*/'],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },

  {
    files: ['src/pages/*/ui/*.{ts,tsx,scss}'],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },

  {
    files: ['src/shared/ui/*/'],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },

  {
    files: [
      'src/shared/ui/*/*.{ts,tsx,scss,css}',
      'src/shared/ui/*/__tests__/*.{ts,tsx}',
      'src/shared/ui/*/stories/*.{ts,tsx}',
    ],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },

  // Ignore
  {
    files: ['**/index.{ts,tsx}'],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/filename-case': 'off',
    },
  },

  {
    files: [
      '**/*.types.ts',
      '**/*.types.tsx',
      '**/*.constants.ts',
      '**/*.constants.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.stories.ts',
      '**/*.stories.tsx',
      '**/*.stories.ts',
      '**/*.stories.tsx',
      '**/*.module.scss',
      '**/*.module.css',
    ],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/filename-case': 'off',
    },
  },

  storybook.configs['flat/recommended'],
], storybook.configs["flat/recommended"]);
