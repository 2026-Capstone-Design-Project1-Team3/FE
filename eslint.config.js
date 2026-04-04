// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierConfig from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "build", "public", "node_modules"]),

  // 1. 기존 extends 배열에 있던 추천 설정들을 바깥 배열로 빼서 적용합니다.
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,

  // 2. 내가 추가할 커스텀 설정
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      // ⚠️ react-hooks와 react-refresh는 위에서 불러온 설정에 이미 포함되어 있으므로 선언을 제거했습니다.
      react: react,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "no-duplicate-imports": "error",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "no-multiple-empty-lines": "error",
      "no-undef": "error",
      indent: "off",
      "no-trailing-spaces": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "react-hooks/rules-of-hooks": "error",
      "arrow-parens": ["error", "always"],
      "no-multi-spaces": "error",
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
          ],
          pathGroups: [
            { pattern: "react", group: "builtin", position: "after" },
            { pattern: "react-dom", group: "builtin", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["react", "react-dom"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
    },
  },

  // Prettier와 Storybook 설정도 바깥에 적용
  prettierConfig,
  ...storybook.configs["flat/recommended"],
]);
