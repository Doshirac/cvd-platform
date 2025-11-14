import eslint from "@eslint/js";
import typescriptEslintParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import preferArrowFunctionsPlugin from "eslint-plugin-prefer-arrow-functions";
import unicorn from "eslint-plugin-unicorn";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptEslintParser,
      sourceType: "module",
      globals: {
        ...globals.node, // Node.js globals
        ...globals.es2021, // ES2021 globals
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          format: ["camelCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        {
          selector: "class",
          format: ["PascalCase"],
        },
      ],
    },
  },
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    plugins: {
      "prefer-arrow-functions": preferArrowFunctionsPlugin,
    },
    rules: {
      "prefer-arrow-functions/prefer-arrow-functions": [
        "warn",
        {
          allowNamedFunctions: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: "unchanged",
          singleReturnOnly: false,
        },
      ],
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    ignores: [
      "src/middlewares/interfaces/*.ts",
      "src/controllers/interfaces/*.ts",
      "src/dtos/*.ts",
    ],
    plugins: {
      unicorn,
    },
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "camelCase",
        },
      ],
    },
  },
  {
    ignores: ["node_modules", "build", "jest.config.js"],
  },
];
